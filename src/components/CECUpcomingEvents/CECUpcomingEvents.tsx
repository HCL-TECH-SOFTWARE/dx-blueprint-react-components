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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DXIcon from '../DXIcon/DXIcon';
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";
import CECEvent, { getEventStartDate, getEventEndDate } from '../CECEvent/CECEvent';
import { CECEventVariant, CECEventData } from '../CECEvent/CECEvent.types';
import { detectInputLocale } from '../../utilities/cec-utils';
import {
  CECUpcomingEventsProps as ExternalCECUpcomingEventsProps,
  UseEventFiltersReturn
} from './CECUpcomingEvents.types';
import EventFilters from './components/EventFilters';
import CECPagination, { DEFAULT_ITEMS_PER_PAGE_OPTIONS } from '../CECPagination';
import { useEventFilters, type FilteredEventData } from './hooks/useEventFilters';
import './CECUpcomingEvents.scss';
// Extend external props (make items required, same as before)
export interface CECUpcomingEventsProps
  extends Omit<ExternalCECUpcomingEventsProps, "items">,
  BasicComponent {
  items: ExternalCECUpcomingEventsProps["items"];
  externalCurrentPage?: number;
  style?: React.CSSProperties;
  _edit?: any;
  itemsPerPageOptions?: number[];
  showItemsPerPageDropdown?: boolean;
  onItemsPerPageChange?: ( itemsPerPage: number ) => void;
  paginationProps?: {
    sets: string[];
    active: number;
    activeSet: number;
  };
}
const CECUpcomingEvents: React.FC<CECUpcomingEventsProps> = ( {
  items,
  onEventClick,
  variant = 'featured',
  title,
  showSearch,
  showFilters,
  showMonthFilter,
  showYearFilter,
  showTagsFilter,
  showRecurrenceFilter,
  onFilterChange,
  // CECEvent props that are passed through
  showDate: showDateProp,
  showLocation: showLocationProp,
  showDescription: showDescriptionProp,
  showTags: showTagsProp,
  showActions: showActionsProp,
  descriptionMaxLines: descriptionMaxLinesProp,
  dateFormat: dateFormatProp,
  showTimeZone = false,
  className = '',
  itemsPerPage,
  showPagination = true,
  onPageChange,
  externalCurrentPage,
  itemsPerPageOptions,
  showItemsPerPageDropdown = true,
  onItemsPerPageChange,
  paginationProps,
  _edit,
  style,
  dir,
  ...rest
} ) => {
  // Detect the display locale from the first event's raw date string so that
  // month filter labels are rendered in the same language as the source data.
  const displayLocale = useMemo( () => {
    const firstItem = items?.[0];
    if ( !firstItem ) return 'en-US';
    const rawDate = ( firstItem.recurrence?.startDate as string | undefined )
      ?? ( firstItem.startDate as string | undefined )
      ?? ( firstItem.date as string | undefined );
    return detectInputLocale( rawDate );
  }, [items] );
  const processedEvents = useMemo( () => {
    // If no items are provided, return an empty array
    if ( !items || items.length === 0 ) {
      return [];
    }
    // Process each event to ensure it has all required fields
    return items
      .filter( ( item ): item is NonNullable<typeof item> => {
        return ( item && typeof item === 'object' );
      } )
      .map( item => {
        // Create the event object with all required fields
        const event: CECEventData = {
          ...item,
          id: item.id || `event-${Math.random().toString( 36 ).substr( 2, 9 )}`,
          title: item.title || 'Untitled Event',
          category: item.category || 'event',
          tags: Array.isArray( item.tags ) ? item.tags : ( item.tags ? item.tags.split( ',' ) : [] ),
          description: item.description || '',
          location: item.location || '',
          eventUuid: item.eventUuid || item.id || `event-${Math.random().toString( 36 ).substr( 2, 9 )}`,
          recurrence: {
            ...( typeof item.recurrence === 'object' && item.recurrence ? item.recurrence : {} ),
            startDate: getEventStartDate( item ),
            endDate: getEventEndDate( item ),
          },
        };
        return event;
      } );
  }, [items] );
  // --- RTL direction detection (Approach B from RTL investigation) ---
  // Reads <html dir> on mount; MutationObserver reacts to live DX portal language switches.
  // An explicit `dir` prop overrides auto-detection (priority 1 per investigation).
  const [documentDir, setDocumentDir] = useState<'ltr' | 'rtl'>( () => {
    if ( typeof document !== 'undefined' ) {
      return ( getComputedStyle( document.documentElement ).direction as 'ltr' | 'rtl' ) || 'ltr';
    }
    return 'ltr';
  } );
  useEffect( () => {
    if ( dir ) return; // explicit prop wins — no observation needed
    const update = () => {
      if ( typeof document !== 'undefined' ) {
        setDocumentDir( ( getComputedStyle( document.documentElement ).direction as 'ltr' | 'rtl' ) || 'ltr' );
      }
    };
    update();
    const observer = new MutationObserver( update );
    if ( typeof document !== 'undefined' ) {
      observer.observe( document.documentElement, { attributes: true, attributeFilter: ['dir'] } );
    }
    return () => observer.disconnect();
  }, [dir] );
  const resolvedDir: 'ltr' | 'rtl' = dir ?? documentDir;
  // --- end RTL detection ---
  // State for internal pagination
  // Initialize from paginationProps.activeSet if provided — it takes priority over itemsPerPage prop
  const [internalCurrentPage, setInternalCurrentPage] = useState( 1 );
  const [internalItemsPerPage, setInternalItemsPerPage] = useState( () => {
    if ( paginationProps?.activeSet ) {
      const parsed = parseInt( paginationProps.activeSet.toString(), 10 );
      if ( !isNaN( parsed ) && parsed > 0 ) return parsed;
    }
    return itemsPerPage ?? itemsPerPageOptions?.[0] ?? 3;
  } );
  // Derive elementsPerRow from the first (smallest) value in paginationProps.sets or itemsPerPageOptions
  const elementsPerRow = useMemo( () => {
    const rawOptions = paginationProps?.sets
      ? paginationProps.sets.map( s => parseInt( s, 10 ) ).filter( n => !isNaN( n ) && n > 0 )
      : Array.isArray( itemsPerPageOptions )
        ? itemsPerPageOptions
        : DEFAULT_ITEMS_PER_PAGE_OPTIONS;
    return ( rawOptions && rawOptions.length > 0 ) ? Math.min( ...rawOptions ) : 3;
  }, [paginationProps?.sets, itemsPerPageOptions] );
  // Use event filters hook
  const {
    filters,
    setFilters,
    filteredEvents,
    availableMonths = [],
    availableYears = [],
    availableTags = [],
    handleFilterChange,
    clearFilters,
    activeFilterCount
  }: UseEventFiltersReturn = useEventFilters( processedEvents, {
    searchTerm: '',
    selectedMonths: [],
    selectedYears: [],
    selectedTags: [],
    selectedFrequency: ''
  } );
  // Calculate total items before pagination
  const totalItems = filteredEvents.length;
  // Calculate pagination values
  const currentPage = externalCurrentPage !== undefined ? externalCurrentPage : internalCurrentPage;
  const currentItemsPerPage = internalItemsPerPage; // Always use internal state for dropdown changes
  const totalPages = Math.ceil( totalItems / currentItemsPerPage );
  const startIndex = ( currentPage - 1 ) * currentItemsPerPage;
  const endIndex = Math.min( startIndex + currentItemsPerPage, totalItems );
  // Handle page changes
  const handlePageChange = useCallback( ( page: number ) => {
    if ( onPageChange ) {
      onPageChange( page );
    }
    if ( externalCurrentPage === undefined ) {
      setInternalCurrentPage( page );
    }
  }, [onPageChange, externalCurrentPage] );
  // Handle items per page changes
  const handleItemsPerPageChange = useCallback( ( newItemsPerPage: number ) => {
    // Call the parent callback if provided
    if ( onItemsPerPageChange ) {
      onItemsPerPageChange( newItemsPerPage );
    }
    // Always update internal state for items per page
    setInternalItemsPerPage( newItemsPerPage );
    // Reset to first page only when using internal page control
    if ( externalCurrentPage === undefined ) {
      setInternalCurrentPage( 1 );
    }
  }, [onItemsPerPageChange, externalCurrentPage] );
  // Handle items per page prop changes
  // Skip if paginationProps.activeSet is provided — it controls itemsPerPage in that case
  useEffect( () => {
    if ( !paginationProps?.activeSet && itemsPerPage !== undefined && itemsPerPage !== internalItemsPerPage ) {
      setInternalItemsPerPage( itemsPerPage );
      setInternalCurrentPage( 1 );
    }
  }, [itemsPerPage, paginationProps?.activeSet] );
  // Use all events when pagination is disabled
  const displayEvents = showPagination ? filteredEvents.slice( startIndex, endIndex ) : filteredEvents;
  // Synchronise internalCurrentPage with external control, or reset to page 1 when
  // totalPages decreases below the current page (internal control only).
  // When totalPages is 0 (no filtered results), the reset is intentionally skipped —
  // the component shows an empty state and resets on the next non-zero totalPages render.
  useEffect( () => {
    if ( externalCurrentPage !== undefined ) {
      if ( externalCurrentPage !== internalCurrentPage ) {
        setInternalCurrentPage( externalCurrentPage );
      }
    } else if ( totalPages > 0 && internalCurrentPage > totalPages ) {
      setInternalCurrentPage( 1 );
    }
  }, [externalCurrentPage, internalCurrentPage, totalPages] );
  // Convert paginationProps to itemsPerPageOptions format for CECPagination
  const convertedItemsPerPageOptions = useMemo( () => {
    if ( paginationProps && paginationProps.sets ) {
      return paginationProps.sets
        .map( set => parseInt( set, 10 ) )
        .filter( num => !isNaN( num ) && num > 0 );
    }
    // Ensure itemsPerPageOptions is an array, otherwise use default
    if ( Array.isArray( itemsPerPageOptions ) ) {
      return itemsPerPageOptions;
    }
    return DEFAULT_ITEMS_PER_PAGE_OPTIONS;
  }, [paginationProps, itemsPerPageOptions] );
  // Handle items per page from paginationProps
  useEffect( () => {
    if ( paginationProps && paginationProps.activeSet ) {
      const parsedActiveSet = parseInt( paginationProps.activeSet.toString(), 10 );
      if ( !isNaN( parsedActiveSet ) && parsedActiveSet > 0 && parsedActiveSet !== internalItemsPerPage ) {
        setInternalItemsPerPage( parsedActiveSet );
        setInternalCurrentPage( 1 );
      }
    }
  }, [paginationProps?.activeSet] );
  // Notify parent of filter changes and reset pagination when filters change
  useEffect( () => {
    if ( onFilterChange ) {
      onFilterChange( filters );
    }
    // Reset to first page when filters change (only for internal pagination)
    if ( externalCurrentPage === undefined ) {
      setInternalCurrentPage( 1 );
    }
  }, [filters, onFilterChange, externalCurrentPage] );
  const handleClearFilters = useCallback( () => {
    // Reset filters to initial state
    const resetFilters: Partial<React.ComponentProps<typeof EventFilters>> = {
      searchTerm: '',
      selectedMonths: [],
      selectedYears: [],
      selectedTags: [],
      selectedFrequency: '',
    };
    // Update the filters state
    setFilters( resetFilters as typeof filters );
    // Call the original clearFilters from useEventFilters
    clearFilters();
    // Reset DXTaxonomyFilter state by passing empty selected filters
    if ( handleFilterChange ) {
      handleFilterChange( resetFilters as typeof filters );
    }
    // Force re-render of the filter components
    // The key prop with activeFilterCount will help with this
  }, [setFilters, handleFilterChange, clearFilters] );
  // Get variant class with proper typing
  const variantClass = useMemo( () => {
    const variantClasses = {
      'featured': 'cec-upcoming-events--featured',
      'river': 'cec-upcoming-events--river',
      'featured-compact': 'cec-upcoming-events--featured-compact'
    };
    return variantClasses[variant as keyof typeof variantClasses] || 'cec-upcoming-events--featured';
  }, [variant] );
  // Get variant-specific defaults with proper typing
  const variantDefault = CECEventVariant[variant as keyof typeof CECEventVariant] || CECEventVariant.featured;
  // Handle event click with proper keyboard support and typing
  const handleEventClick = useCallback( ( event: CECEventData ) => {
    onEventClick?.( event );
  }, [onEventClick] );
  // Get the display values based on props or variant defaults with proper typing
  const {
    showDate,
    showLocation,
    showDescription,
    showTags,
    showActions,
    descriptionMaxLines,
    dateFormat,
  } = {
    showDate: showDateProp ?? variantDefault.showDate,
    showLocation: showLocationProp ?? variantDefault.showLocation,
    showDescription: showDescriptionProp ?? variantDefault.showDescription,
    showTags: showTagsProp ?? variantDefault.showTags,
    showActions: showActionsProp ?? variantDefault.showActions,
    descriptionMaxLines: descriptionMaxLinesProp ?? variantDefault.descriptionMaxLines,
    dateFormat: dateFormatProp ?? variantDefault.dateFormat,
  };
  // Apply variant defaults for search and filters
  const finalShowSearch = showSearch !== undefined ? showSearch : variantDefault.showSearch;
  const finalShowFilters = showFilters !== undefined ? showFilters : variantDefault.showFilters;
  // Individual filter controls - use global showFilters if individual prop not specified
  const finalShowMonthFilter = showMonthFilter !== undefined ? showMonthFilter : finalShowFilters;
  const finalShowYearFilter = showYearFilter !== undefined ? showYearFilter : finalShowFilters;
  const finalShowTagsFilter = showTagsFilter !== undefined ? showTagsFilter : finalShowFilters;
  const finalShowRecurrenceFilter = showRecurrenceFilter !== undefined ? showRecurrenceFilter : finalShowFilters;
  // Render filters using the EventFilters component
  const renderFilters = useCallback( () => {
     
    if ( !finalShowSearch && !finalShowMonthFilter && !finalShowYearFilter && !finalShowTagsFilter && !finalShowRecurrenceFilter ) return null;
    return (
      <EventFilters
        searchTerm={filters.searchTerm}
        selectedMonths={filters.selectedMonths}
        selectedYears={filters.selectedYears}
        selectedTags={filters.selectedTags}
        selectedFrequency={filters.selectedFrequency}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        activeFilterCount={activeFilterCount}
        items={processedEvents}
        filteredCount={filteredEvents.length}
        showSearch={finalShowSearch}
        showMonthFilter={finalShowMonthFilter}
        showYearFilter={finalShowYearFilter}
        showTags={finalShowTagsFilter}
        showRecurrence={finalShowRecurrenceFilter}
        availableMonths={availableMonths}
        availableYears={availableYears}
        availableTags={availableTags}
        locale={displayLocale}
      />
    );
  }, [
    finalShowSearch,
    finalShowMonthFilter,
    finalShowYearFilter,
    finalShowTagsFilter,
    finalShowRecurrenceFilter,
    filters.searchTerm,
    filters.selectedMonths,
    filters.selectedYears,
    filters.selectedTags,
    filters.selectedFrequency,
    handleFilterChange,
    handleClearFilters,
    activeFilterCount,
    processedEvents,
    filteredEvents.length,
    availableMonths,
    availableYears,
    availableTags
  ] );
  // Render events in a grid layout similar to DXEventCatalog
  const renderEvents = ( events: FilteredEventData[] ) => {
    return (
      <Row className="cec-upcoming-events__row">
        {events.map( ( event, index ) => (
          <Col
            className="cec-upcoming-events__col"
            xs={12}
            key={`${event.id || 'event'}-${index}`}
            style={{ '--cec-col-width': `${( 100 / elementsPerRow ).toFixed( 4 )}%` } as React.CSSProperties}
          >
            <CECEvent
              event={{
                ...event,
                title: event.title || 'Untitled Event',
                description: event.description || '',
                author: event.author || {
                  id: 'unknown',
                  name: 'Unknown Author',
                  email: '',
                  userState: 'active',
                  isExternal: false
                },
                category: event.category || 'event',
                tags: event.tags || []
              }}
              displayDate={event.displayDate}
              variant={variant}
              dir={resolvedDir}
              onClick={() => handleEventClick( event )}
              showDate={showDate}
              showLocation={showLocation}
              showDescription={showDescription}
              showTags={showTags}
              showActions={showActions}
              descriptionMaxLines={descriptionMaxLines}
              elementsPerRow={elementsPerRow}
              showTimeZone={showTimeZone}
              dateFormat={dateFormat}
            />
          </Col>
        ) )}
      </Row>
    );
  };
  // Render pagination using the CECPagination component with proper typing
  const renderPagination = () => {
    if ( !showPagination ) return null;
    return (
      <div className="cec-upcoming-events__pagination">
        <CECPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={currentItemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          itemsPerPageOptions={convertedItemsPerPageOptions}
          totalItems={filteredEvents.length}
          showItemsPerPageDropdown={showItemsPerPageDropdown}
          variant="default"
          dir={resolvedDir}
        />
      </div>
    );
  };
  return (
    <div
      className={`cec-upcoming-events ${variantClass}${resolvedDir === 'rtl' ? ' cec-upcoming-events--rtl' : ''} ${className}`}
      dir={resolvedDir}
      style={style}
    >
      <div className="cec-upcoming-events__header">
        <h2 className="cec-upcoming-events__title">{title || 'Upcoming Events'}</h2>
      </div>
      {}
      {renderFilters()}
      {}
      <div className="cec-upcoming-events__container">
        {displayEvents.length > 0 ? (
          renderEvents( displayEvents )
        ) : (
          <div className="cec-upcoming-events__empty">
            <DXIcon
              name="search"
              className="cec-upcoming-events__empty-icon"
            />
            <p className="cec-upcoming-events__empty-text">
              No events found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
      {}
      {displayEvents.length > 0 && renderPagination()}
      {_edit && renderEditButton( _edit )}
    </div>
  );
};
export default CECUpcomingEvents;
