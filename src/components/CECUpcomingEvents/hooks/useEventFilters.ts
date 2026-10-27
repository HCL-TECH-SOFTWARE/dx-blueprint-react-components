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
import { useMemo, useCallback, useState } from 'react';
import { getEventStartDate, getEventEndDate, hasOccurrenceInMonth, getFirstOccurrenceInMonth, type CECEventData } from '../../CECEvent';
import { safeParseDXDate as safeParseDate } from '../../../utilities/cec-utils';
export interface FilteredEventData extends CECEventData {
    /** The display date for this event occurrence (first occurrence in the filtered month) */
    displayDate?: Date;
}
interface FilterState {
    searchTerm: string;
    selectedMonths: string[];
    selectedYears: string[];
    selectedTags: string[];
    selectedFrequency?: string;
}
interface UseEventFiltersOptions {
    searchTerm?: string;
    selectedMonths?: string[];
    selectedYears?: string[];
    selectedTags?: string[];
    selectedFrequency?: string;
}
export const useEventFilters = (
    events: CECEventData[],
    initialFilters?: UseEventFiltersOptions
) => {
    const [filters, setFilters] = useState<FilterState>( {
        searchTerm: initialFilters?.searchTerm || '',
        selectedMonths: initialFilters?.selectedMonths || [],
        selectedYears: initialFilters?.selectedYears || [],
        selectedTags: initialFilters?.selectedTags || [],
        selectedFrequency: initialFilters?.selectedFrequency,
    } );
    const safeEvents = Array.isArray( events ) ? events : [];
    const filteredEvents = useMemo( (): FilteredEventData[] => {
        const result: FilteredEventData[] = [];
        for ( const event of safeEvents ) {
            const eventTitle = event.title || 'Untitled Event';
            const searchTerm = filters.searchTerm.trim().toLowerCase();
            // Filter by search term
            const eventDescription = event.description || '';
            const eventLocation = event.location || '';
            // Normalize tags: trim and lowercase
            const eventTags = event.tags
                ? ( Array.isArray( event.tags )
                    ? event.tags.map( ( t ) => ( typeof t === 'string' ? t.trim().toLowerCase() : '' ) )
                    : event.tags.split( ',' ).map( ( t: string ) => t.trim().toLowerCase() ) )
                : [];
            // Normalize filter tags
            const filterTags = filters.selectedTags?.map( ( t ) => t.trim().toLowerCase() ) || [];
            const matchesSearch =
                searchTerm === '' ||
                ( eventTitle && eventTitle.toLowerCase().includes( searchTerm ) ) ||
                ( eventDescription && eventDescription.toLowerCase().includes( searchTerm ) ) ||
                ( eventLocation && eventLocation.toLowerCase().includes( searchTerm ) ) ||
                ( eventTags && eventTags.some( ( tag: string ) => tag && tag.includes( searchTerm ) ) );
            if ( !matchesSearch ) continue;
            // Filter by selected months and years (recurrence-aware)
            let matchesMonth = true;
            let matchesYear = true;
            let displayDate: Date | undefined;
            // Get event date info for month/year filtering
            const eventStartStr = getEventStartDate( event );
            const eventEndStr = getEventEndDate( event );
            const parsedStart = safeParseDate( eventStartStr );
            const parsedEnd = safeParseDate( eventEndStr );
            const frequency = event.recurrence?.frequency || '';
            const byDay = event.recurrence?.byDay;
            const byDate = parsedStart ? parsedStart.getDate() : undefined;
            // Month filtering (recurrence-aware)
            if ( filters.selectedMonths && filters.selectedMonths.length > 0 && parsedStart ) {
                matchesMonth = false;
                // Determine the year range to check for occurrences
                const startYear = parsedStart.getFullYear();
                const endYear = parsedEnd ? parsedEnd.getFullYear() : startYear + 5; // Default 5 year lookahead
                // Check each selected month across the event's year range
                for ( const monthNum of filters.selectedMonths ) {
                    if ( matchesMonth ) break;
                    const month = parseInt( monthNum, 10 ) - 1; // Convert "01"-"12" to 0-11
                    // Check this month in each year of the event's range
                    for ( let year = startYear; year <= endYear; year++ ) {
                        const monthStart = new Date( Date.UTC( year, month, 1 ) );
                        const monthEnd = new Date( Date.UTC( year, month + 1, 0, 23, 59, 59, 999 ) );
                        if ( hasOccurrenceInMonth( parsedStart, parsedEnd, frequency, byDay, byDate, monthStart, monthEnd ) ) {
                            matchesMonth = true;
                            // Store the first occurrence for display
                            const firstOccurrence = getFirstOccurrenceInMonth( parsedStart, parsedEnd, frequency, byDay, byDate, monthStart, monthEnd );
                            if ( firstOccurrence && ( !displayDate || firstOccurrence < displayDate ) ) {
                                displayDate = firstOccurrence;
                            }
                            break;
                        }
                    }
                }
            }
            if ( !matchesMonth ) continue;
            // Year filtering (recurrence-aware)
            if ( filters.selectedYears && filters.selectedYears.length > 0 && parsedStart ) {
                matchesYear = false;
                for ( const yearStr of filters.selectedYears ) {
                    if ( matchesYear ) break;
                    const year = parseInt( yearStr, 10 );
                    // Check all 12 months of this year for any occurrence
                    for ( let month = 0; month < 12; month++ ) {
                        const monthStart = new Date( Date.UTC( year, month, 1 ) );
                        const monthEnd = new Date( Date.UTC( year, month + 1, 0, 23, 59, 59, 999 ) );
                        if ( hasOccurrenceInMonth( parsedStart, parsedEnd, frequency, byDay, byDate, monthStart, monthEnd ) ) {
                            matchesYear = true;
                            // Store the first occurrence for display if not already set
                            const firstOccurrence = getFirstOccurrenceInMonth( parsedStart, parsedEnd, frequency, byDay, byDate, monthStart, monthEnd );
                            if ( firstOccurrence && ( !displayDate || firstOccurrence < displayDate ) ) {
                                displayDate = firstOccurrence;
                            }
                            break;
                        }
                    }
                }
            }
            if ( !matchesYear ) continue;
            // Filter by selected tags (normalized)
            const matchesTags =
                ( !filterTags.length ) ||
                ( eventTags.length > 0 && eventTags.some( ( tag: string ) => tag && filterTags.includes( tag ) ) );
            if ( !matchesTags ) continue;
            // Filter by frequency (normalized)
            let matchesFrequency = true;
            if ( filters.selectedFrequency ) {
                const eventFrequency = ( event.recurrence?.frequency || '' ).toString().trim().toLowerCase();
                const filterFrequency = filters.selectedFrequency.trim().toLowerCase();
                if ( filterFrequency === 'single day event' ) {
                    // Single Day Event: no recurrence or empty frequency
                    matchesFrequency = !eventFrequency;
                } else if ( filterFrequency === 'daily' ) {
                    matchesFrequency = eventFrequency === 'daily';
                } else if ( filterFrequency === 'weekly' ) {
                    matchesFrequency = eventFrequency === 'weekly';
                } else if ( filterFrequency === 'monthly' ) {
                    matchesFrequency = eventFrequency === 'monthly';
                } else if ( filterFrequency === 'yearly' ) {
                    matchesFrequency = eventFrequency === 'yearly';
                }
            }
            if ( !matchesFrequency ) continue;
            // Add event with displayDate if computed
            result.push( { ...event, displayDate } );
        }
        // Sort by displayDate if available, otherwise by start date
        result.sort( ( a, b ) => {
            const dateA = a.displayDate || safeParseDate( getEventStartDate( a ) ) || new Date();
            const dateB = b.displayDate || safeParseDate( getEventStartDate( b ) ) || new Date();
            return dateA.getTime() - dateB.getTime();
        } );
        return result;
    }, [safeEvents, filters] );
    const handleFilterChange = useCallback( ( newFilters: Partial<FilterState> ) => {
        setFilters( prev => ( {
            ...prev,
            ...newFilters,
        } ) );
    }, [] );
    const clearFilters = useCallback( () => {
        setFilters( {
            searchTerm: '',
            selectedMonths: [],
            selectedYears: [],
            selectedTags: [],
            selectedFrequency: '',
        } );
    }, [] );
    // Get unique tags from events
    const availableTags = useMemo( () => {
        const tags = new Set<string>();
        safeEvents.forEach( ( event: CECEventData ) => {
            if ( event.tags ) {
                const tagsArray = Array.isArray( event.tags ) ? event.tags : event.tags.split( ',' );
                tagsArray.forEach( ( tag: string ) => tags.add( tag ) );
            }
        } );
        return Array.from( tags ).sort();
    }, [safeEvents] );
    // Get all 12 months (static list, always available)
    const availableMonths = useMemo( () => {
        // Return all 12 months as "01" through "12"
        return Array.from( { length: 12 }, ( _, i ) => String( i + 1 ).padStart( 2, '0' ) );
    }, [] );
    // Get available years from event data including the current year and all recurrence years up to 'until'
    const availableYears = useMemo(() => {
      if (safeEvents.length === 0) {
        return [];
      }
      const currentYear = new Date().getFullYear();
      const years = new Set<number>();
      safeEvents.forEach((event) => {
        const startDate = safeParseDate(getEventStartDate(event));
        if (startDate && !isNaN(startDate.getTime())) {
          const startYear = startDate.getFullYear();
          // Determine end year from recurrence.until, falling back to startYear
          let endYear = startYear;
          const untilDate = safeParseDate(getEventEndDate(event));
          if (untilDate && !isNaN(untilDate.getTime())) {
            endYear = untilDate.getFullYear();
          }
          // Include all years in the range [startYear, endYear]
          for (let y = startYear; y <= endYear; y++) {
            if (y >= currentYear) {
              years.add(y);
            }
          }
        }
      });
      // If no future/current event years were extracted, check if we should still return empty
      if (years.size === 0) {
        return [];
      }
    // Convert to sorted string array
    return Array.from(years)
      .sort((a, b) => a - b)
      .map(String);
    }, [safeEvents]);
    return {
        filters,
        setFilters,
        filteredEvents,
        availableMonths,
        availableYears,
        availableTags,
        handleFilterChange,
        clearFilters,
        activeFilterCount:
            ( filters.searchTerm ? 1 : 0 ) +
            ( filters.selectedMonths && filters.selectedMonths.length > 0 ? filters.selectedMonths.length : 0 ) +
            ( filters.selectedYears && filters.selectedYears.length > 0 ? filters.selectedYears.length : 0 ) +
            ( filters.selectedFrequency ? 1 : 0 ) +
            ( filters.selectedTags ? filters.selectedTags.length : 0 ),
    };
};
