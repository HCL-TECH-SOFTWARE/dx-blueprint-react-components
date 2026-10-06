import React, {
    useMemo,
    useCallback,
    useState,
    useRef,
    useEffect,
} from 'react';
import './CECEvent.scss';
import { renderEditButton } from '../../utilities/BasicComponent/BasicComponent';
import {
    CECEventProps, CECEventRecurrence,
    EventDate,
    CECEventData, CECEventVariant, DateFormat
} from './CECEvent.types';
import { getDayMap, calculateNextOccurrence } from './CECEvent.utils';
import { decodeHtmlEntities, safeParseDXDate, safeToISOString } from '../../utilities/cec-utils';
const SHOW_TAGS_THRESHOLD = 3;
const SHOW_TAGS_SUBSTRING_CHAR = 7;
// Responsive tags threshold based on container width
const getResponsiveTagsThreshold = ( containerWidth?: number ): number => {
    if ( !containerWidth ) return SHOW_TAGS_THRESHOLD;
    if ( containerWidth <= 200 ) return 1; // Very narrow cards - show only 1 tag
    if ( containerWidth <= 300 ) return 2; // Narrow cards - show 2 tags
    if ( containerWidth <= 400 ) return 3; // Medium cards - show 3 tags
    return SHOW_TAGS_THRESHOLD; // Default: 3 tags for wider cards
};
// Legacy function for backward compatibility with elementsPerRow
const getTagsThreshold = ( elementsPerRow?: number ) => {
    if ( elementsPerRow === 6 ) return 1; // Show only 1 tag for 6-per-row (very narrow cards)
    if ( elementsPerRow === 4 ) return 2; // Show 2 tags for 4-per-row (narrow cards)
    return SHOW_TAGS_THRESHOLD; // Default: 3 tags for wider cards
};
const EventCalenderClockIcon = ( { className = '' } ) => (
    <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Event date and time"
        focusable="false"
    >
        <path d="M4 3C3.45 3 3 3.45 3 4V7H21V4C21 3.45 20.55 3 20 3H17V1H16V3H8V1H7V3H4Z" fill="#00012B" />
        <path d="M15.65 16.35C15.55 16.26 15.5 16.13 15.5 16V13H16.51V15.79L17.86 17.14L17.15 17.85L15.65 16.35Z"
            fill="#00012B" />
        <path fillRule="evenodd" clipRule="evenodd"
            d="M22 16C22 14.77 21.63 13.64 21 12.69V8H3V20C3 20.55 3.45 21 4 21H12.69C13.64 21 14.78 22 16 22C19.31 22 22 19.31 22 16ZM16 21C13.24 21 11 18.76 11 16C11 13.24 13.24 11 16 11C18.76 11 21 13.24 21 16C21 18.76 18.76 21 16 21Z"
            fill="#00012B" />
    </svg>
);
const EventLocationIcon = ( { className = '' } ) => (
    <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Event location"
        focusable="false"
    >
        <path
            d="M14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10Z"
            fill="#00012B" />
        <path fillRule="evenodd" clipRule="evenodd"
            d="M3 11C3 5.99 6.99 2 12 2C17.01 2 21 5.99 21 11C21 17.2 12 23 12 23C12 23 3 17.2 3 11ZM9 10C9 11.66 10.34 13 12 13C13.66 13 15 11.66 15 10C15 8.34 13.66 7 12 7C10.34 7 9 8.34 9 10Z"
            fill="#00012B" />
    </svg>
);
// Utility functions to get startDate and endDate with fallback logic
export const getEventStartDate = ( item: CECEventData | null | undefined ): string => {
    if ( !item ) return safeToISOString( new Date() ) || '';
    if ( item.recurrence && 'startDate' in item.recurrence ) {
        return ( item.recurrence['startDate'] as string ) || ( item.startDate as string ) || ( item.date as string ) || safeToISOString( new Date() ) || '';
    }
    return ( item.startDate as string ) || ( item.date as string ) || safeToISOString( new Date() ) || '';
};
export const getEventEndDate = ( item: CECEventData | null | undefined ): string => {
    if ( !item ) return safeToISOString( new Date() ) || '';
    if ( item.recurrence && ( 'until' in item.recurrence || 'endDate' in item.recurrence ) ) {
        return item.recurrence['until'] || item.recurrence['endDate'] || item.recurrence['startDate'] || ( item.startDate as string ) || safeToISOString( new Date() ) || '';
    }
    return ( item.startDate as string ) || ( item.date as string ) || safeToISOString( new Date() ) || '';
};
// Default props for each variant are now imported from ../types/event.types
/**
 * Accessible and responsive event card component that displays event information
 * with support for multiple layout variants and interactive states.
 */
export const CECEvent: React.FC<CECEventProps> = ( {
    event,
    variant = 'featured',
    dir,
    displayDate,
    showDateRange: showDateRangeProp,
    showDate: showDateProp,
    showLocation: showLocationProp,
    showDescription: showDescriptionProp,
    showTags: showTagsProp,
    showActions: showActionsProp,
    customActions,
    descriptionMaxLines: descriptionMaxLinesProp,
    elementsPerRow,
    eventTime24hrFormat = false,
    showTimeZone = false,
    dateFormat = 'full',
    formatDate,
    className = '',
    style = {},
    onClick,
    onEventClick,
    _edit,
    icons = {},
    showRecurringIcon,
    ...rest
} ) => {
    const [dateFrom, setDateFrom] = useState<EventDate | null>( null );
    const [dateTo, setDateTo] = useState<EventDate | null>( null );
    const [showAllTags, setShowAllTags] = useState<boolean>( false );
    const [containerWidth, setContainerWidth] = useState<number | undefined>( undefined );
    const eventRef = useRef<HTMLDivElement>( null );
    const containerRef = useRef<HTMLDivElement>( null );
    // Handle click events
    const handleClick = useCallback( ( e: React.MouseEvent<HTMLDivElement> ) => {
        if ( onClick ) {
            onClick( e );
        }
        if ( onEventClick ) {
            onEventClick( event );
        }
    }, [onClick, onEventClick, event] );
    // Handle keyboard events for accessibility
    const handleKeyDown = useCallback( ( e: React.KeyboardEvent<HTMLDivElement> ) => {
        if ( ( e.key === 'Enter' || e.key === ' ' ) && onEventClick ) {
            e.preventDefault();
            onEventClick( event );
        }
    }, [onEventClick, event] );
    // Apply variant-specific defaults if props not explicitly provided
    const defaults = CECEventVariant[variant];
    const showDateRange = showDateRangeProp ?? defaults.showDateRange;
    const showDate = showDateProp ?? defaults.showDate;
    const showLocation = showLocationProp ?? defaults.showLocation;
    const showDescription = showDescriptionProp ?? defaults.showDescription;
    const showTags = showTagsProp ?? defaults.showTags;
    const showActions = showActionsProp ?? defaults.showActions;
    // Auto-adjust descriptionMaxLines based on elementsPerRow for better UX
    let descriptionMaxLines = descriptionMaxLinesProp ?? defaults.descriptionMaxLines;
    if ( elementsPerRow === 6 && !descriptionMaxLinesProp ) {
        // Force 1 line for 6 elements per row to prevent overflow in narrow cards
        descriptionMaxLines = 1;
    }
    const tagsArray = Array.isArray( event?.tags ) ? event.tags : event?.tags ? event.tags.split( ',' ) : [];
    // Get responsive tags threshold based on container width (preferred) or fallback to elementsPerRow
    const tagsThreshold = containerWidth !== undefined
        ? getResponsiveTagsThreshold( containerWidth )
        : getTagsThreshold( elementsPerRow );
    // Get variant class names
    const getVariantClass = ( variant: string ) => {
        switch ( variant ) {
            case 'featured-compact':
                return 'cec-event__featured-compact';
            case 'river':
                return 'cec-event__river';
            case 'featured':
            default:
                return 'cec-event__featured';
        }
    };
    const variantClass = getVariantClass( variant );
    // Helper function to render actions section based on event location and platform
    const renderActions = ( event: CECEventData ) => {
        if ( !showActions ) return [];
        const actions: React.ReactNode[] = [];
        // Analyze location for online meeting platform
        const meetingInfo = getOnlineMeetingInfo( event?.location ?? '' );
        if ( meetingInfo && meetingInfo.isOnline && meetingInfo.platform ) {
            // Online meeting detected: Show only Connect link (Export hidden)
            actions.push(
                <a
                    key="connect"
                    className="cec-event__action cec-event__action--primary"
                    aria-label={`Connect with ${meetingInfo.platform} for ${event?.title || 'event'} event`}
                    href={event?.location}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="connect-link"
                >
                    <span>Connect with {meetingInfo.platform}</span>
                </a>
            );
            // Export to calendar functionality is now hidden
        }
        // Export functionality removed for all event types
        return actions;
    };
    // Helper function to check if location contains online meeting link and extract platform
    const getOnlineMeetingInfo = useCallback( ( location: string ): { isOnline: boolean; platform?: string; displayText?: string; } => {
        if ( !location ) return { isOnline: false };
        const platformPatterns = [
            { pattern: /zoom\.us|zoomgov\.com/i, platform: 'Zoom' },
            { pattern: /meet\.google\.com/i, platform: 'Google Meet' },
            { pattern: /teams\.microsoft\.com/i, platform: 'Microsoft Teams' },
            { pattern: /webex\.com/i, platform: 'Webex' },
            { pattern: /gotomeeting\.com/i, platform: 'GoToMeeting' },
            { pattern: /discord\.gg|discord\.com/i, platform: 'Discord' },
            { pattern: /online meeting|virtual meeting|video conference|remote/i, platform: 'Generic Online' }
        ];
        for ( const { pattern, platform } of platformPatterns ) {
            if ( pattern.test( location ) ) {
                return { isOnline: true, platform, displayText: 'Online meeting' };
            }
        }
        return { isOnline: false };
    }, [event?.recurrence] );
    // Check if two dates are the same day
    const isSameDay = useCallback( ( date1?: string | null, date2?: string | null ): boolean => {
        if ( !date1 || !date2 ) {
            return false;
        }
        try {
            const d1 = safeParseDXDate( date1 );
            const d2 = safeParseDXDate( date2 );
            if ( !d1 || !d2 ) {
                return false;
            }
            return d1.toDateString() === d2.toDateString();
        } catch ( error ) {
            return false;
        }
    }, [] );
    /**
     * Parses and formats a date string into an EventDate object
     */
    const parseDate = useCallback( ( dateStr?: string | null ): EventDate => {
        if ( !dateStr ) {
            console.warn( '[CECEvent] parseDate: No date provided, using current date as fallback' );
            dateStr = new Date().toISOString();
        }
        const date = safeParseDXDate( dateStr );
        let parsedDate = date;
        if ( !parsedDate ) {
            console.warn( '[CECEvent] parseDate: Failed to parse date, using current date as fallback' );
            dateStr = new Date().toISOString();
            parsedDate = safeParseDXDate( dateStr );
            if ( !parsedDate ) {
                // As a last resort, use Date.now()
                parsedDate = new Date();
            }
        }
        // Always format date badge fields in en-US so numbers and month names
        // remain Latin/English regardless of the input date's source locale.
        const dateFormatter = ( options: Intl.DateTimeFormatOptions ) => new Intl.DateTimeFormat( 'en-US', options ).format( parsedDate! );
        /*
        * Fixed the UI issues in Event component CNX-40884
        */
        const eventDate: EventDate = {
            shortMonth: dateFormatter( { month: 'short' } ),
            month: dateFormatter( { month: 'long' } ),
            day: dateFormatter( { day: '2-digit' } ),
            dayOfWeek: dateFormatter( { weekday: 'long' } ),
            year: dateFormatter( { year: 'numeric' } ),
            minute: '00',
            second: '00',
        };
        if ( dateStr.includes( ":" ) || dateStr.includes( "T" ) ) {
            eventDate.hour = eventTime24hrFormat
                ? new Intl.DateTimeFormat( 'en-US', { hour12: false, hour: '2-digit', minute: '2-digit' } ).format( parsedDate )
                : new Intl.DateTimeFormat( 'en-US', { hour12: true, hour: '2-digit', minute: '2-digit' } ).format( parsedDate );
            const minuteSecondParts = new Intl.DateTimeFormat( 'en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            } ).format( parsedDate ).split( ':' );
            eventDate.minute = minuteSecondParts[1] || '00';
            eventDate.second = minuteSecondParts[2] || '00';
        }
        return eventDate;
    }, [eventTime24hrFormat] );
    // Update event dates when event data or date parsing behavior changes
    useEffect( () => {
        // Use utility functions for normalized start/end dates
        const normalizedStartDate = getEventStartDate( event );
        const normalizedEndDate = getEventEndDate( event );
        const parsedStart = safeParseDXDate( normalizedStartDate );
        const parsedEnd = normalizedEndDate ? safeParseDXDate( normalizedEndDate ) : null;
        // Check if this is a multi-day event (start and end on different days)
        const isMultiDayEvent = parsedStart && parsedEnd && !isSameDay( normalizedStartDate, normalizedEndDate );
        // For single-day recurring events without displayDate, calculate next upcoming occurrence
        if ( !isMultiDayEvent && event?.recurrence?.frequency && event.recurrence.startDate ) {
            const now = new Date();
            const frequency = event.recurrence.frequency?.toString().toLowerCase();
            const recurrenceStart = safeParseDXDate( event.recurrence.startDate as string );
            if ( recurrenceStart && frequency ) {
                let recurrenceUntil: Date | null = null;
                if ( event.recurrence.until ) {
                    recurrenceUntil = safeParseDXDate( event.recurrence.until as string );
                }
                // Get byDate for monthly recurrence (day of month)
                const byDate = event.recurrence.byDate
                    ? parseInt( event.recurrence.byDate.toString(), 10 )
                    : undefined;
                // Get byDay for weekly/daily recurrence (e.g., "MO,TU,WE")
                const byDay = event.recurrence.byDay || undefined;
                const nextOccurrence = calculateNextOccurrence( recurrenceStart, frequency, now, recurrenceUntil, byDate, byDay );
                setDateFrom( parseDate( nextOccurrence.toISOString() ) );
                // For recurring events, show single occurrence (same start and end date)
                setDateTo( parseDate( nextOccurrence.toISOString() ) );
                return;
            }
        }
        // For multi-day events or non-recurring events, show original date range
        setDateFrom( parseDate( normalizedStartDate ) );
        setDateTo( normalizedEndDate ? parseDate( normalizedEndDate ) : null );
    }, [event, parseDate, isSameDay] );
    // Set default container width for responsive tags threshold
    useEffect( () => {
        const element = containerRef.current;
        if ( !element ) return;
        // Use ResizeObserver to monitor container width changes
        const resizeObserver = new ResizeObserver( ( entries ) => {
            for ( const entry of entries ) {
                const { width } = entry.contentRect;
                setContainerWidth( width );
            }
        } );
        // Start observing
        resizeObserver.observe( element );
        // Get initial width
        const rect = element.getBoundingClientRect();
        setContainerWidth( rect.width );
        // Cleanup
        return () => {
            resizeObserver.disconnect();
        };
    }, [] );
    /**
     * Creates safe HTML content from a string
     */
    const createMarkup = useCallback( ( html: string | undefined ) => {
        if ( !html ) return { __html: '' };
        const decoded = decodeHtmlEntities( html );
        return { __html: decoded };
    }, [] );
    const cleanDescription = useCallback( ( description: string | undefined ): string => {
        if ( !description ) return '';
        const linkRegex = new RegExp( '<a\\s+(?:[^>]*?\\s+)?href="[^"]*">.*?<\\/a>', 'gi' );
        return description.replace( linkRegex, '' ).trim();
    }, [] );
    /**
     * Truncates and cleans the event description
     */
    const truncatedDescription = useMemo( () => {
        if ( !showDescription || !event?.description ) return '';
        const cleaned = cleanDescription( event.description );
        return cleaned
            .replace( /<\/?[^>]+(>|$)/g, '' )
            .replace( /\s+/g, ' ' )
            .trim();
    }, [showDescription, event?.description, cleanDescription] );
    // Memoize computed values
    const { showContentWrapper, ariaProps } = useMemo( () => {
        const shouldShowContentWrapper = variant !== 'river' || showDate || showLocation || showDescription || showTags;
        // ARIA attributes for accessibility (static card)
        const ariaProps = {
            role: 'article' as const,
            'aria-label': `Event: ${event?.title || 'Untitled Event'}`,
            'aria-describedby': event?.id ? `event-${event.id}-desc` : undefined,
        };
        return { showContentWrapper: shouldShowContentWrapper, ariaProps };
    }, [
        variant,
        showDate,
        showLocation,
        showDescription,
        showTags,
        event?.title,
        event?.id,
    ] );
    const formatRecurrenceInfo = useCallback( () => {
        if ( !event.recurrence?.frequency ) {
            return null;
        }
        const recurrence: CECEventRecurrence = event.recurrence;
        const parts: string[] = [];
        const addDays = ( byDay: string ) => {
            const dayMap = getDayMap();
            const days = byDay.split( ',' ).map( ( day: string ) => dayMap[day] || day );
            if ( days.length === 1 ) {
                parts.push( `on ${days[0]}` );
            } else if ( days.length === 2 ) {
                parts.push( `on ${days[0]} and ${days[1]}` );
            } else if ( days.length > 2 ) {
                const lastDay = days[days.length - 1];
                const otherDays = days.slice( 0, -1 ).join( ', ' );
                parts.push( `on ${otherDays}, and ${lastDay}` );
            }
        };
        switch ( recurrence.frequency ) {
            case 'daily':
                parts.push( recurrence.interval && recurrence.interval > 1 ? `Every ${recurrence.interval} days` : 'Daily' );
                if ( recurrence.byDay ) addDays( recurrence.byDay );
                break;
            case 'weekly':
                parts.push( recurrence.interval && recurrence.interval > 1 ? `Every ${recurrence.interval} weeks` : 'Weekly' );
                if ( recurrence.byDay ) addDays( recurrence.byDay );
                break;
            case 'monthly':
                parts.push( recurrence.interval && recurrence.interval > 1 ? `Every ${recurrence.interval} months` : 'Monthly' );
                if ( recurrence.byMonthDay ) {
                    const day = recurrence.byMonthDay.split( ',' )[0];
                    parts.push( `on day ${day}` );
                }
                break;
            case 'yearly':
                parts.push( recurrence.interval && recurrence.interval > 1 ? `Every ${recurrence.interval} years` : 'Yearly' );
                break;
            default:
                parts.push( '' );
                break;
        }
        // Add end condition
        if ( recurrence.count ) {
            parts.push( `for ${recurrence.count} occurrences` );
        }
        return parts.join( ' ' );
    }, [] );
    // Format based on dateFormat prop - defined outside to capture current dateFormat
    const formatBasedOnType = useCallback( ( date: Date, type: DateFormat ) => {
        switch ( type ) {
            case 'full':
                return date.toLocaleDateString( 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                } );
            case 'short':
                return date.toLocaleDateString( 'en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                } );
            case 'month-day':
                return date.toLocaleDateString( 'en-US', {
                    month: 'short',
                    day: 'numeric'
                } );
            case 'time-only':
                return '';
            default:
                return date.toLocaleDateString( 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                } );
        }
    }, [] );
    // Format time based on 24hr format setting with timezone support
    const formatTime = useCallback( ( date: Date ) => {
        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: !eventTime24hrFormat,
            timeZone: showTimeZone ? Intl.DateTimeFormat().resolvedOptions().timeZone : undefined
        };
        const timeString = date.toLocaleTimeString( 'en-US', timeOptions );
        // Add timezone abbreviation if showTimeZone is enabled
        if ( showTimeZone ) {
            const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
            const timeZoneAbbr = new Date().toLocaleTimeString( 'en-US', {
                timeZone: timeZoneName,
                timeZoneName: 'short'
            } ).split( ' ' )[2];
            return `${timeString} ${timeZoneAbbr || ''}`.trim();
        }
        return timeString;
    }, [eventTime24hrFormat, showTimeZone] );
    // Format date range using the same calculateNextOccurrence logic as the date badge
    const formatDateRange = useCallback( () => {
        const startDate = getEventStartDate( event );
        const endDate = getEventEndDate( event );
        const start = safeParseDXDate( startDate );
        const endTime = endDate ? safeParseDXDate( endDate ) : null;
        if ( !start ) {
            return <span className="cec-event__date-error">Invalid start date</span>;
        }
        const isAllDay = ( event && event.recurrence && 'allDay' in event.recurrence ) ? event.recurrence.allDay === '1' : false;
        // Use displayDate if provided, otherwise calculate next occurrence
        let nextEventDate = start;
        if ( displayDate ) {
            // Use the provided displayDate (e.g., first occurrence in filtered month)
            const displayDateObj = typeof displayDate === 'string' ? safeParseDXDate( displayDate ) : displayDate;
            if ( displayDateObj ) {
                nextEventDate = displayDateObj;
            }
        } else if ( event?.recurrence?.frequency && event.recurrence.startDate ) {
            // Calculate next upcoming event date using the same logic as date badge
            const now = new Date();
            const frequency = event.recurrence.frequency?.toString().toLowerCase();
            const recurrenceStart = safeParseDXDate( event.recurrence.startDate as string );
            if ( recurrenceStart && frequency ) {
                let recurrenceUntil: Date | null = null;
                if ( event.recurrence.until ) {
                    recurrenceUntil = safeParseDXDate( event.recurrence.until as string );
                }
                // Get byDate for monthly recurrence (day of month)
                const byDate = event.recurrence.byDate
                    ? parseInt( event.recurrence.byDate.toString(), 10 )
                    : undefined;
                // Get byDay for weekly/daily recurrence (e.g., "MO,TU,WE")
                const byDay = event.recurrence.byDay || undefined;
                nextEventDate = calculateNextOccurrence( recurrenceStart, frequency, now, recurrenceUntil, byDate, byDay );
            }
        }
        const formattedStartDate = formatBasedOnType( nextEventDate, dateFormat );
        const formattedStartTime = isAllDay ? '' : formatTime( nextEventDate );
        const formattedEndTime = !isAllDay && endTime ? formatTime( endTime ) : '';
        return (
            <div className="cec-event__date-time-info">
                <div className="cec-event__date-time-details">
                    {dateFormat !== 'time-only' && (
                        <span className="cec-event__full-date">{formattedStartDate}</span>
                    )}
                    {isAllDay ? (
                        <span className="cec-event__time-display">All day event</span>
                    ) : (
                        <span className="cec-event__time-display">
                            {formattedStartTime && `${formattedStartTime}`}
                            {formattedStartTime && formattedEndTime && ` - ${formattedEndTime}`}
                        </span>
                    )}
                    {event && event.recurrence?.frequency && (
                        <span className="cec-event__recurrence-display">
                            {formatRecurrenceInfo()}
                        </span>
                    )}
                </div>
            </div>
        );
    }, [dateFormat, formatRecurrenceInfo, formatBasedOnType, formatTime, event, displayDate, calculateNextOccurrence] );
    /**
     * Renders date range display when until date is different from end date
     */
    const renderDateRange = useCallback( () => {
        if ( !dateFrom ) return null;
        const effectiveStartDate = getEventStartDate( event );
        const effectiveEndDate = getEventEndDate( event );
        const isSameDayRange = isSameDay( effectiveStartDate, effectiveEndDate );
        // Format dates as "Apr 05" to "Jun 09"
        const startMonth = dateFrom.shortMonth;
        const startDay = dateFrom.day;
        const endMonth = dateTo?.shortMonth;
        const endDay = dateTo?.day;
        // Format full dates with year for tooltips
        const startFullDate = `${dateFrom.month} ${dateFrom.day}, ${dateFrom.year}`;
        const endFullDate = dateTo ? `${dateTo.month} ${dateTo.day}, ${dateTo.year}` : undefined;
        return (
            <>
                <div className="cec-event__date-day" title={startFullDate}>
                    <span
                        className="cec-event__date-month"
                        data-testid="event-date-month"
                    >
                        {startMonth}
                    </span>
                    <span
                        className="cec-event__date-day-number"
                        data-testid="event-date-day"
                    >
                        {startDay}
                    </span>
                </div>
                {!isSameDayRange ? (
                    <>
                        <div className="cec-event__date-separator" aria-hidden="true">
                            <span className="cec-event__date__separator-text">to</span>
                        </div>
                        <div className="cec-event__date-day" title={endFullDate}>
                            <span
                                className="cec-event__date-month"
                                data-testid="event-date-end-month"
                            >
                                {endMonth}
                            </span>
                            <span
                                className="cec-event__date-day-number"
                                data-testid="event-date-end-day"
                            >
                                {endDay}
                            </span>
                        </div>
                    </>
                ) : null}
            </>
        );
    }, [event, dateFrom, dateTo, isSameDay] );
    return (
        <div
            className={`cec-event ${variantClass}${dir === 'rtl' ? ' cec-event--rtl' : ''} ${className}`}
            style={style}
            dir={dir}
            ref={eventRef}
            onClick={onEventClick ? handleClick : undefined}
            onKeyDown={onEventClick ? handleKeyDown : undefined}
            tabIndex={onEventClick ? 0 : undefined}
            {...ariaProps}
            {...rest}
            data-testid="cec-event"
        >
            <div ref={containerRef} className="cec-event__container">
                {_edit && typeof _edit === 'object' && renderEditButton( _edit )}
                {/* Date display at top left */}
                {showDateRange && dateFrom && (
                    <div className="cec-event__date">
                        <div className="cec-event__date-wrapper">
                            {renderDateRange()}
                        </div>
                    </div>
                )}
                {showContentWrapper && (
                    <div className="cec-event__content">
                        <h3 className="cec-event__title">
                            {event?.title || 'Untitled Event'}
                        </h3>
                        {showDescription && (
                            <div
                                className="cec-event__description"
                                id={event?.id ? `event-${event.id}-desc` : undefined}
                                aria-label={truncatedDescription || 'No description available'}
                                style={{ '--description-max-lines': descriptionMaxLines } as React.CSSProperties}
                            >
                                {truncatedDescription ? (
                                    <span dangerouslySetInnerHTML={createMarkup( truncatedDescription )} />
                                ) : (
                                    <span>&nbsp;</span> // Empty space to maintain layout
                                )}
                            </div>
                        )}
                        <div className="cec-event__info">
                            {showDate && (
                                <div className="cec-event__date-time">
                                    <EventCalenderClockIcon className="cec-event__calender-clock-icon" />
                                    {formatDateRange()}
                                </div>
                            )}
                            {showLocation && event?.location && variant !== 'river' && (
                                <div className="cec-event__location">
                                    <EventLocationIcon className="cec-event__location-icon" />
                                    {( () => {
                                        const meetingInfo = getOnlineMeetingInfo( event.location );
                                        return meetingInfo.isOnline ? (
                                            <span className="cec-event__location-text">
                                                {meetingInfo.displayText}
                                            </span>
                                        ) : (
                                            <span className="cec-event__location-text">
                                                {event.location}
                                            </span>
                                        );
                                    } )()}
                                </div>
                            )}
                        </div>
                        {showTags && event?.tags && (
                            <div className="cec-event__tags" role="list" aria-label="Event tags">
                                {tagsArray.slice( 0, showAllTags ? tagsArray.length : tagsThreshold ).map( ( tag: string, index: number ) => {
                                    const isLongTag = tag.trim().length > SHOW_TAGS_SUBSTRING_CHAR;
                                    const displayText = isLongTag ? `${tag.trim().toUpperCase().substring( 0, SHOW_TAGS_SUBSTRING_CHAR )}...` : tag.trim().toUpperCase();
                                    return (
                                        <span
                                            key={`${tag}-${index}`}
                                            className="cec-event__tag"
                                            title={isLongTag ? tag.trim() : undefined}
                                        >
                                            {displayText}
                                        </span>
                                    );
                                } )}
                                {!showAllTags && tagsArray.length > tagsThreshold && (
                                    ( () => {
                                        const remainingTagsCount = tagsArray.length - tagsThreshold;
                                        const remainingTag = remainingTagsCount === 1 ? tagsArray[tagsThreshold] : null;
                                        if ( remainingTagsCount === 1 && remainingTag ) {
                                            // Show the actual tag instead of "+1 more"
                                            const isLongTag = remainingTag.trim().length > SHOW_TAGS_SUBSTRING_CHAR;
                                            const displayText = isLongTag ? `${remainingTag.trim().toUpperCase().substring( 0, SHOW_TAGS_SUBSTRING_CHAR )}...` : remainingTag.trim().toUpperCase();
                                            return (
                                                <span
                                                    key={`${remainingTag}-last`}
                                                    className="cec-event__tag"
                                                    title={isLongTag ? remainingTag.trim() : undefined}
                                                >
                                                    {displayText}
                                                </span>
                                            );
                                        } else {
                                            // Show "+X more" for multiple remaining tags
                                            return (
                                                <span
                                                    className="cec-event__tag cec-event__tag-ellipsis"
                                                    onClick={() => setShowAllTags( true )}
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label={`Show ${remainingTagsCount} more tags`}
                                                >
                                                    +{remainingTagsCount} MORE
                                                </span>
                                            );
                                        }
                                    } )()
                                )}
                            </div>
                        )}
                        {showActions && (
                            <div className="cec-event__actions">
                                {( () => {
                                    // Gather all actions (default + custom)
                                    const defaultActions = renderActions( event );
                                    const customActionsArray = customActions
                                        ? ( Array.isArray( customActions ) ? customActions : [customActions] )
                                        : [];
                                    const allActions = [...defaultActions, ...customActionsArray].filter( Boolean );
                                    // If only one action, ensure it is styled as primary
                                    if ( allActions.length === 1 ) {
                                        const onlyAction = allActions[0];
                                        if ( React.isValidElement<any>( onlyAction ) ) {
                                            const existingClass = ( onlyAction.props as any ).className || '';
                                            return React.cloneElement( onlyAction as React.ReactElement<any>, {
                                                className: `cec-event__action cec-event__action--primary ${existingClass}`.replace( /\s+/g, ' ' ).trim()
                                            } );
                                        }
                                        return onlyAction;
                                    }
                                    // If two or more actions, render as is
                                    return allActions.map( ( action, idx ) => React.isValidElement<any>( action ) ? React.cloneElement( action as React.ReactElement<any>, { key: idx } ) : action );
                                } )()}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
// @ts-ignore
export default CECEvent;
