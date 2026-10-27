/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */
// Day mapping for recurrence information
const getLocalizedWeekday = ( weekday: string, locale?: string ) => {
    // Safe locale detection for SSR environments
    const effectiveLocale = locale ?? ( typeof navigator !== 'undefined' ? navigator.language : 'en-US' );
    // Map 'MO'...'SU' to 1 (Monday) ... 7 (Sunday)
    const dayIndex = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].indexOf( weekday );
    if ( dayIndex === -1 ) return weekday;
    // Create a date for the corresponding weekday (using 2024-07-01 as Monday)
    const date = new Date( Date.UTC( 2024, 6, 1 + dayIndex ) );
    return new Intl.DateTimeFormat( effectiveLocale, { weekday: 'short' } ).format( date );
};
// Lazy-initialized DayMap to avoid SSR issues with navigator.language
let _dayMapCache: { [key: string]: string; } | null = null;
/**
 * Get localized day name mapping. Lazily initialized to support SSR environments.
 */
export const getDayMap = (): { [key: string]: string; } => {
    if ( !_dayMapCache ) {
        _dayMapCache = {
            'MO': getLocalizedWeekday( 'MO' ),
            'TU': getLocalizedWeekday( 'TU' ),
            'WE': getLocalizedWeekday( 'WE' ),
            'TH': getLocalizedWeekday( 'TH' ),
            'FR': getLocalizedWeekday( 'FR' ),
            'SA': getLocalizedWeekday( 'SA' ),
            'SU': getLocalizedWeekday( 'SU' ),
        };
    }
    return _dayMapCache;
};
/**
 * @deprecated Use getDayMap() instead for SSR compatibility. This export is kept for backward compatibility.
 */
export const DayMap: { [key: string]: string; } = new Proxy( {} as { [key: string]: string; }, {
    get: ( _, prop: string ) => getDayMap()[prop],
    ownKeys: () => Object.keys( getDayMap() ),
    getOwnPropertyDescriptor: ( _, prop: string ) => ( {
        enumerable: true,
        configurable: true,
        value: getDayMap()[prop],
    } ),
} );
// Map day codes to JS day numbers (0=Sunday, 1=Monday, ..., 6=Saturday)
export const dayCodeToNumber: { [key: string]: number; } = {
    'SU': 0, 'MO': 1, 'TU': 2, 'WE': 3, 'TH': 4, 'FR': 5, 'SA': 6
};
/**
 * Parse byDay string (e.g., "MO,TU,WE") into array of JS day numbers
 */
export const parseByDay = ( byDay: string ): number[] => {
    return byDay.split( ',' ).map( d => dayCodeToNumber[d.trim()] ).filter( d => d !== undefined );
};
/**
 * Common interface for occurrence calculation parameters
 */
interface OccurrenceParams {
    eventStart: Date;
    frequency: string;
    until?: Date | null;
    byDate?: number;
    byDay?: string;
}
/**
 * Core function to find the next occurrence of a recurring event starting from a given date
 * This is the unified logic used by both calculateNextOccurrence and getFirstOccurrenceInMonth
 * 
 * @param params - Recurrence parameters
 * @param searchFrom - The date to start searching from
 * @param searchUntil - Optional end boundary for the search (e.g., end of month)
 * @returns The next occurrence date, or null if none found within bounds
 */
export const findNextOccurrenceFrom = (
    params: OccurrenceParams,
    searchFrom: Date,
    searchUntil?: Date
): Date | null => {
    const { eventStart, frequency, until, byDate, byDay } = params;
    const freq = frequency?.toLowerCase() || '';
    // If recurrence has ended before search start, no occurrence
    if ( until && searchFrom > until ) {
        return null;
    }
    // Event hasn't started yet - return event start if within bounds
    if ( eventStart > searchFrom ) {
        if ( !searchUntil || eventStart <= searchUntil ) {
            if ( !until || eventStart <= until ) {
                return eventStart;
            }
        }
        return null;
    }
    const effectiveUntil = searchUntil && until
        ? ( searchUntil < until ? searchUntil : until )
        : ( searchUntil || until );
    // For monthly recurrence with byDate specified
    if ( freq === 'monthly' && byDate && byDate >= 1 && byDate <= 31 ) {
        let testDate = new Date( searchFrom.getFullYear(), searchFrom.getMonth(), byDate,
            eventStart.getHours(), eventStart.getMinutes(), eventStart.getSeconds() );
        // If this month's occurrence has passed or is before event start, try next month
        if ( testDate < searchFrom || testDate < eventStart ) {
            testDate.setMonth( testDate.getMonth() + 1 );
            testDate = new Date( testDate.getFullYear(), testDate.getMonth(), byDate,
                eventStart.getHours(), eventStart.getMinutes(), eventStart.getSeconds() );
        }
        // Handle months with fewer days (e.g., byDate=31 in February)
        while ( testDate.getDate() !== byDate ) {
            testDate.setMonth( testDate.getMonth() + 1 );
            testDate = new Date( testDate.getFullYear(), testDate.getMonth(), byDate,
                eventStart.getHours(), eventStart.getMinutes(), eventStart.getSeconds() );
        }
        // Check bounds
        if ( effectiveUntil && testDate > effectiveUntil ) {
            return null;
        }
        if ( testDate < eventStart ) {
            return null;
        }
        return testDate;
    }
    // For weekly/daily recurrence with byDay specified
    if ( ( freq === 'weekly' || freq === 'daily' ) && byDay ) {
        const allowedDays = parseByDay( byDay );
        if ( allowedDays.length === 0 ) {
            return null;
        }
        const current = new Date( Math.max( searchFrom.getTime(), eventStart.getTime() ) );
        const maxDate = effectiveUntil || new Date( current.getTime() + 365 * 24 * 60 * 60 * 1000 ); // Max 1 year search
        while ( current <= maxDate ) {
            if ( allowedDays.includes( current.getDay() ) ) {
                return new Date( current.getFullYear(), current.getMonth(), current.getDate(),
                    eventStart.getHours(), eventStart.getMinutes(), eventStart.getSeconds() );
            }
            current.setDate( current.getDate() + 1 );
        }
        return null;
    }
    // For daily recurrence (every day)
    if ( freq === 'daily' ) {
        const firstDay = eventStart > searchFrom ? eventStart : searchFrom;
        if ( effectiveUntil && firstDay > effectiveUntil ) {
            return null;
        }
        return new Date( firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate(),
            eventStart.getHours(), eventStart.getMinutes(), eventStart.getSeconds() );
    }
    // For weekly recurrence (same day of week as start)
    if ( freq === 'weekly' ) {
        const targetDayOfWeek = eventStart.getDay();
        const current = new Date( Math.max( searchFrom.getTime(), eventStart.getTime() ) );
        const maxDate = effectiveUntil || new Date( current.getTime() + 365 * 24 * 60 * 60 * 1000 );
        while ( current <= maxDate ) {
            if ( current.getDay() === targetDayOfWeek ) {
                return new Date( current.getFullYear(), current.getMonth(), current.getDate(),
                    eventStart.getHours(), eventStart.getMinutes(), eventStart.getSeconds() );
            }
            current.setDate( current.getDate() + 1 );
        }
        return null;
    }
    // For monthly recurrence (same day of month as start)
    if ( freq === 'monthly' ) {
        const dayOfMonth = eventStart.getDate();
        let testDate = new Date( searchFrom.getFullYear(), searchFrom.getMonth(), dayOfMonth,
            eventStart.getHours(), eventStart.getMinutes(), eventStart.getSeconds() );
        // If this month's occurrence has passed or is before event start, try next month
        if ( testDate < searchFrom || testDate < eventStart ) {
            testDate.setMonth( testDate.getMonth() + 1 );
            testDate = new Date( testDate.getFullYear(), testDate.getMonth(), dayOfMonth,
                eventStart.getHours(), eventStart.getMinutes(), eventStart.getSeconds() );
        }
        // Handle invalid dates (e.g., Jan 31 -> Feb has no 31st)
        if ( testDate.getDate() !== dayOfMonth ) {
            // Skip to next valid month
            testDate.setMonth( testDate.getMonth() + 1 );
            testDate = new Date( testDate.getFullYear(), testDate.getMonth(), dayOfMonth,
                eventStart.getHours(), eventStart.getMinutes(), eventStart.getSeconds() );
        }
        if ( effectiveUntil && testDate > effectiveUntil ) {
            return null;
        }
        return testDate;
    }
    // For yearly recurrence (same month and day as start)
    if ( freq === 'yearly' ) {
        let testDate = new Date( searchFrom.getFullYear(), eventStart.getMonth(), eventStart.getDate(),
            eventStart.getHours(), eventStart.getMinutes(), eventStart.getSeconds() );
        // If this year's occurrence has passed or is before event start, try next year
        if ( testDate < searchFrom || testDate < eventStart ) {
            testDate.setFullYear( testDate.getFullYear() + 1 );
        }
        if ( effectiveUntil && testDate > effectiveUntil ) {
            return null;
        }
        return testDate;
    }
    // No frequency or unknown - return event start if valid
    if ( eventStart >= searchFrom && ( !effectiveUntil || eventStart <= effectiveUntil ) ) {
        return eventStart;
    }
    return null;
};
/**
 * Calculate the next occurrence date for a recurring event from now
 * @param recurrenceStart - The original start date of the recurrence
 * @param frequency - The recurrence frequency (daily, weekly, monthly, yearly)
 * @param now - The current date/time to calculate from
 * @param until - Optional end date for the recurrence
 * @param byDate - Optional day of month for monthly recurrence
 * @param byDay - Optional weekday codes for weekly/daily recurrence (e.g., "MO,TU,WE")
 * @returns The next occurrence date, or recurrenceStart if recurrence has ended
 */
export const calculateNextOccurrence = (
    recurrenceStart: Date,
    frequency: string,
    now: Date,
    until?: Date | null,
    byDate?: number,
    byDay?: string
): Date => {
    const result = findNextOccurrenceFrom(
        { eventStart: recurrenceStart, frequency, until, byDate, byDay },
        now
    );
    // Fallback to original start if no future occurrence found
    return result || recurrenceStart;
};
/**
 * Check if a date falls within the event's valid range (between start and end/until)
 */
export const isDateInEventRange = ( date: Date, eventStart: Date, eventEnd: Date | null ): boolean => {
    return date >= eventStart && ( !eventEnd || date <= eventEnd );
};
/**
 * Check if two date ranges overlap
 */
export const hasDateRangeOverlap = (
    rangeStart: Date,
    rangeEnd: Date | null,
    periodStart: Date,
    periodEnd: Date
): boolean => {
    return rangeStart <= periodEnd && ( rangeEnd ?? rangeStart ) >= periodStart;
};
/**
 * Check if any allowed weekday falls within the date range and event validity
 */
export const hasOccurrenceOnAllowedDays = (
    allowedDays: number[],
    monthStart: Date,
    monthEnd: Date,
    eventStart: Date,
    eventEnd: Date | null
): boolean => {
    if ( allowedDays.length === 0 ) {
        return false;
    }
    const current = new Date( monthStart );
    while ( current <= monthEnd ) {
        if ( allowedDays.includes( current.getDay() ) && isDateInEventRange( current, eventStart, eventEnd ) ) {
            return true;
        }
        current.setDate( current.getDate() + 1 );
    }
    return false;
};
// ============================================================================
// SOLID: Single Responsibility - Each frequency handler is a separate function
// SOLID: Open/Closed - Add new frequencies by adding new handlers, not modifying existing
// ============================================================================
interface OccurrenceCheckParams {
    eventStart: Date;
    eventEnd: Date | null;
    byDay?: string;
    byDate?: number;
    monthStart: Date;
    monthEnd: Date;
}
/**
 * Check monthly recurrence with byDate
 */
const hasMonthlyByDateOccurrence = ( params: OccurrenceCheckParams ): boolean => {
    const { eventStart, eventEnd, byDate, monthStart } = params;
    if ( !byDate || byDate < 1 || byDate > 31 ) {
        return false;
    }
    const testDate = new Date( monthStart.getFullYear(), monthStart.getMonth(), byDate );
    if ( testDate.getMonth() !== monthStart.getMonth() ) {
        return false;
    }
    return isDateInEventRange( testDate, eventStart, eventEnd );
};
/**
 * Check daily recurrence (every day within range)
 */
const hasDailyOccurrence = ( params: OccurrenceCheckParams ): boolean => {
    const { eventStart, eventEnd, monthStart, monthEnd } = params;
    const effectiveStart = eventStart > monthStart ? eventStart : monthStart;
    const effectiveEnd = eventEnd && eventEnd < monthEnd ? eventEnd : monthEnd;
    return effectiveStart <= effectiveEnd;
};
/**
 * Check weekly recurrence on specific day of week
 */
const hasWeeklyOccurrence = ( params: OccurrenceCheckParams ): boolean => {
    const { eventStart, eventEnd, monthStart, monthEnd } = params;
    return hasOccurrenceOnAllowedDays( [eventStart.getDay()], monthStart, monthEnd, eventStart, eventEnd );
};
/**
 * Check yearly recurrence (anniversary in month)
 */
const hasYearlyOccurrence = ( params: OccurrenceCheckParams ): boolean => {
    const { eventStart, eventEnd, monthStart } = params;
    if ( eventStart.getMonth() !== monthStart.getMonth() ) {
        return false;
    }
    const testDate = new Date( monthStart.getFullYear(), eventStart.getMonth(), eventStart.getDate() );
    return isDateInEventRange( testDate, eventStart, eventEnd );
};
/**
 * Check occurrence on specific weekdays (for weekly/daily with byDay)
 */
const hasByDayOccurrence = ( params: OccurrenceCheckParams ): boolean => {
    const { eventStart, eventEnd, byDay, monthStart, monthEnd } = params;
    if ( !byDay ) {
        return false;
    }
    return hasOccurrenceOnAllowedDays( parseByDay( byDay ), monthStart, monthEnd, eventStart, eventEnd );
};
// Frequency handler registry - Open/Closed principle
type FrequencyHandler = ( params: OccurrenceCheckParams ) => boolean;
const frequencyHandlers: Record<string, FrequencyHandler> = {
    daily: ( params ) => params.byDay ? hasByDayOccurrence( params ) : hasDailyOccurrence( params ),
    weekly: ( params ) => params.byDay ? hasByDayOccurrence( params ) : hasWeeklyOccurrence( params ),
    monthly: ( params ) => params.byDate ? hasMonthlyByDateOccurrence( params ) : hasDateRangeOverlap( params.eventStart, params.eventEnd, params.monthStart, params.monthEnd ),
    yearly: hasYearlyOccurrence,
};
/**
 * Check if a recurring event has any occurrence within a given month
 * Uses strategy pattern for frequency-specific logic (SOLID: Open/Closed)
 */
export const hasOccurrenceInMonth = (
    eventStart: Date,
    eventEnd: Date | null,
    frequency: string,
    byDay: string | undefined,
    byDate: number | undefined,
    monthStart: Date,
    monthEnd: Date
): boolean => {
    // Single event - check date range overlap
    if ( !frequency ) {
        return hasDateRangeOverlap( eventStart, eventEnd, monthStart, monthEnd );
    }
    // Early exit: event not yet started or already ended
    if ( eventStart > monthEnd || ( eventEnd && eventEnd < monthStart ) ) {
        return false;
    }
    const params: OccurrenceCheckParams = { eventStart, eventEnd, byDay, byDate, monthStart, monthEnd };
    const handler = frequencyHandlers[frequency.toLowerCase()];
    // Use handler if available, otherwise fall back to date range overlap
    return handler ? handler( params ) : hasDateRangeOverlap( eventStart, eventEnd, monthStart, monthEnd );
};
/**
 * Get the first occurrence of a recurring event within a specific month
 * Returns the date of the first occurrence, or null if no occurrence exists in that month
 * 
 * @param eventStart - The original start date of the event/recurrence
 * @param eventEnd - The end date of the recurrence (until date)
 * @param frequency - The recurrence frequency (daily, weekly, monthly, yearly)
 * @param byDay - Optional weekday codes for weekly/daily recurrence (e.g., "MO,TU,WE")
 * @param byDate - Optional day of month for monthly recurrence
 * @param monthStart - Start of the target month (UTC)
 * @param monthEnd - End of the target month (UTC)
 * @returns The first occurrence date in the month, or null if none
 */
export const getFirstOccurrenceInMonth = (
    eventStart: Date,
    eventEnd: Date | null,
    frequency: string,
    byDay: string | undefined,
    byDate: number | undefined,
    monthStart: Date,
    monthEnd: Date
): Date | null => {
    // Use the unified findNextOccurrenceFrom with month boundaries
    return findNextOccurrenceFrom(
        {
            eventStart,
            frequency: frequency || '',
            until: eventEnd,
            byDate,
            byDay
        },
        monthStart,
        monthEnd
    );
};
