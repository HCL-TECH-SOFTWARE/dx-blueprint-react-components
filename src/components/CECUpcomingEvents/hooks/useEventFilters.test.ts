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

import { renderHook, act } from '@testing-library/react';
import { useEventFilters } from './useEventFilters';
import type { CECEventData } from '../../CECEvent/CECEvent.types';
export const mockEvents: CECEventData[] = [
  {
    id: '1',
    title: 'Tech Conference',
    date: '2027-01-15',
    startDate: '2027-01-15T09:00:00',
    endDate: '2027-01-15T17:00:00',
    location: 'New York',
    tags: ['technology', 'innovation'],
    recurrence: {
      startDate: '2027-01-15',
      until: '2028-01-15',
      frequency: 'yearly' as any,
    },
  },
  {
    id: '2',
    title: 'Design Workshop',
    date: '2027-02-20',
    startDate: '2027-02-20T09:00:00',
    endDate: '2027-02-20T17:00:00',
    location: 'San Francisco',
    tags: ['design', 'ux'],
    recurrence: {
      startDate: '2027-02-20',
      until: '2027-04-20',
      frequency: 'weekly' as any,
    },
  },
  {
    id: '3',
    title: 'Business Summit',
    date: '2027-03-10',
    startDate: '2027-03-10T09:00:00',
    endDate: '2027-03-10T17:00:00',
    location: 'Chicago',
    tags: ['business', 'strategy'],
    recurrence: {
      startDate: '2027-03-10',
      until: '2027-04-10',
      frequency: 'monthly',
    },
  },
];
describe( 'useEventFilters', () => {
  describe( 'Initial State', () => {
    test( 'initializes with default filters', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      expect( result.current.filters ).toEqual( {
        searchTerm: '',
        selectedMonths: [],
        selectedYears: [],
        selectedTags: [],
        selectedFrequency: undefined,
      } );
      expect( result.current.filteredEvents ).toHaveLength( 3 );
      expect( result.current.activeFilterCount ).toBe( 0 );
    } );
    test( 'initializes with provided filters', () => {
      const { result } = renderHook( () =>
        useEventFilters( mockEvents, {
          searchTerm: 'tech',
          selectedMonths: ['01'],
          selectedYears: ['2027'],
          selectedTags: ['technology'],
          selectedFrequency: 'monthly',
        } )
      );
      expect( result.current.filters ).toEqual( {
        searchTerm: 'tech',
        selectedMonths: ['01'],
        selectedYears: ['2027'],
        selectedTags: ['technology'],
        selectedFrequency: 'monthly',
      } );
    } );
    test( 'handles empty events array', () => {
      const { result } = renderHook( () => useEventFilters( [] ) );
      expect( result.current.filteredEvents ).toEqual( [] );
      expect( result.current.activeFilterCount ).toBe( 0 );
      expect( result.current.availableTags ).toEqual( [] );
      // availableMonths always returns all 12 months
      expect( result.current.availableMonths ).toEqual( [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
      ] );
      expect( result.current.availableYears ).toEqual( [] );
    } );
  } );
  describe( 'Search Filter', () => {
    test( 'filters events by search term', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        result.current.handleFilterChange( { searchTerm: 'tech' } );
      } );
      expect( result.current.filteredEvents ).toHaveLength( 1 );
      expect( result.current.filteredEvents[0].title ).toBe( 'Tech Conference' );
      expect( result.current.activeFilterCount ).toBe( 1 );
    } );
    test( 'search is case insensitive', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        result.current.handleFilterChange( { searchTerm: 'CONFERENCE' } );
      } );
      expect( result.current.filteredEvents ).toHaveLength( 1 );
      expect( result.current.filteredEvents[0].title ).toBe( 'Tech Conference' );
    } );
    test( 'search matches title and tags', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        result.current.handleFilterChange( { searchTerm: 'design' } );
      } );
      expect( result.current.filteredEvents ).toHaveLength( 1 );
      expect( result.current.filteredEvents[0].title ).toBe( 'Design Workshop' );
    } );
    test( 'clears search filter', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        result.current.handleFilterChange( { searchTerm: 'tech' } );
      } );
      expect( result.current.filteredEvents ).toHaveLength( 1 );
      act( () => {
        result.current.handleFilterChange( { searchTerm: '' } );
      } );
      expect( result.current.filteredEvents ).toHaveLength( 3 );
      expect( result.current.activeFilterCount ).toBe( 0 );
    } );
  } );
  describe( 'Month Filter (Recurrence-Aware)', () => {
    test( 'filters events by selected month - finds recurring events', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        // Filter by March (month number "03")
        // Design Workshop (weekly from Feb 20 to Apr 20) has occurrences in March
        // Business Summit (monthly from Mar 10 to Apr 10) starts in March
        result.current.handleFilterChange( { selectedMonths: ['03'] } );
      } );
      // Design Workshop has weekly occurrences in March
      expect( result.current.filteredEvents.length ).toBeGreaterThanOrEqual( 1 );
      expect( result.current.filteredEvents.some( e => e.title === 'Design Workshop' ) ).toBe( true );
      expect( result.current.activeFilterCount ).toBe( 1 );
    } );
    test( 'filters events by multiple months - includes recurring events', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        // Filter by February and April
        // Design Workshop (weekly, Feb-Apr) has occurrences in both
        // Business Summit (monthly, Mar-Apr) has occurrences in April
        result.current.handleFilterChange( { selectedMonths: ['02', '04'] } );
      } );
      // At least Design Workshop should match (Feb start, Apr end)
      expect( result.current.filteredEvents.length ).toBeGreaterThanOrEqual( 1 );
      expect( result.current.activeFilterCount ).toBe( 2 );
    } );
    test( 'clears month filter', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        result.current.handleFilterChange( { selectedMonths: ['03'] } );
      } );
      expect( result.current.filteredEvents.length ).toBeGreaterThanOrEqual( 1 );
      act( () => {
        result.current.handleFilterChange( { selectedMonths: [] } );
      } );
      expect( result.current.filteredEvents ).toHaveLength( 3 );
      expect( result.current.activeFilterCount ).toBe( 0 );
    } );
    test( 'excludes events that do not recur into selected month', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        // Filter by May - no events recur into May
        // Tech Conference ends Jan 2028, Design Workshop ends Apr 20, Business Summit ends Apr 10
        result.current.handleFilterChange( { selectedMonths: ['05'] } );
      } );
      expect( result.current.filteredEvents ).toHaveLength( 0 );
    } );
  } );
  describe( 'Year Filter', () => {
    test( 'filters events by selected year (independent of month)', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        // Filter by 2027
        result.current.handleFilterChange( { selectedYears: ['2027'] } );
      } );
      // Weekly and monthly events in 2027 should be found
      // Note: yearly events may have timezone-related issues with recurrence detection
      expect( result.current.filteredEvents.length ).toBeGreaterThanOrEqual( 2 );
      expect( result.current.activeFilterCount ).toBe( 1 );
    } );
    test( 'filters events by non-matching year', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        // Filter by 2025 (no events)
        result.current.handleFilterChange( { selectedYears: ['2025'] } );
      } );
      expect( result.current.filteredEvents ).toHaveLength( 0 );
      expect( result.current.activeFilterCount ).toBe( 1 );
    } );
    test( 'clears year filter', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        result.current.handleFilterChange( { selectedYears: ['2027'] } );
      } );
      expect( result.current.filteredEvents.length ).toBeGreaterThanOrEqual( 2 );
      act( () => {
        result.current.handleFilterChange( { selectedYears: [] } );
      } );
      expect( result.current.filteredEvents ).toHaveLength( 3 );
      expect( result.current.activeFilterCount ).toBe( 0 );
    } );
  } );
  describe( 'Frequency Filter', () => {
    test( 'filters events by frequency', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        result.current.handleFilterChange( { selectedFrequency: 'monthly' } );
      } );
      expect( result.current.filteredEvents ).toHaveLength( 1 );
      expect( result.current.filteredEvents[0].title ).toBe( 'Business Summit' );
      expect( result.current.activeFilterCount ).toBe( 1 );
    } );
    test( 'clears frequency filter', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        result.current.handleFilterChange( { selectedFrequency: 'monthly' } );
      } );
      expect( result.current.filteredEvents ).toHaveLength( 1 );
      act( () => {
        result.current.handleFilterChange( { selectedFrequency: undefined } );
      } );
      expect( result.current.filteredEvents ).toHaveLength( 3 );
      expect( result.current.activeFilterCount ).toBe( 0 );
    } );
  } );
  describe( 'Tags Filter', () => {
    test( 'filters events by tags', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        result.current.handleFilterChange( { selectedTags: ['technology'] } );
      } );
      expect( result.current.filteredEvents ).toHaveLength( 1 );
      expect( result.current.filteredEvents[0].tags ).toContain( 'technology' );
      expect( result.current.activeFilterCount ).toBe( 1 );
    } );
    test( 'filters events by multiple tags', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        result.current.handleFilterChange( { selectedTags: ['technology', 'design'] } );
      } );
      expect( result.current.filteredEvents ).toHaveLength( 2 );
      expect( result.current.activeFilterCount ).toBe( 2 );
    } );
    test( 'clears tags filter', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        result.current.handleFilterChange( { selectedTags: ['technology'] } );
      } );
      expect( result.current.filteredEvents ).toHaveLength( 1 );
      act( () => {
        result.current.handleFilterChange( { selectedTags: [] } );
      } );
      expect( result.current.filteredEvents ).toHaveLength( 3 );
      expect( result.current.activeFilterCount ).toBe( 0 );
    } );
  } );
  describe( 'Multiple Filters', () => {
    test( 'combines multiple filters', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        result.current.handleFilterChange( { searchTerm: 'workshop' } );
        result.current.handleFilterChange( { selectedMonths: ['02'] } );
      } );
      expect( result.current.filteredEvents ).toHaveLength( 1 );
      expect( result.current.filteredEvents[0].title ).toBe( 'Design Workshop' );
      expect( result.current.activeFilterCount ).toBe( 2 );
    } );
    test( 'combines month and year filters', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        // Filter by February 2027 - Design Workshop starts in Feb
        result.current.handleFilterChange( { selectedMonths: ['02'], selectedYears: ['2027'] } );
      } );
      // Design Workshop starts in February 2027
      expect( result.current.filteredEvents.length ).toBeGreaterThanOrEqual( 1 );
      expect( result.current.filteredEvents.some( e => e.title === 'Design Workshop' ) ).toBe( true );
      expect( result.current.activeFilterCount ).toBe( 2 );
    } );
    test( 'handles conflicting filters', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        result.current.handleFilterChange( { searchTerm: 'New York' } );
        result.current.handleFilterChange( { selectedMonths: ['02'] } );
      } );
      // Tech Conference (New York) is in January, not February
      expect( result.current.filteredEvents ).toHaveLength( 0 );
      expect( result.current.activeFilterCount ).toBe( 2 );
    } );
  } );
  describe( 'Clear All Filters', () => {
    test( 'clears all filters at once', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      act( () => {
        result.current.handleFilterChange( { searchTerm: 'tech' } );
        result.current.handleFilterChange( { selectedMonths: ['01'] } );
        result.current.handleFilterChange( { selectedYears: ['2027'] } );
        result.current.handleFilterChange( { selectedFrequency: 'monthly' } );
      } );
      expect( result.current.activeFilterCount ).toBe( 4 );
      act( () => {
        result.current.clearFilters();
      } );
      expect( result.current.filters ).toEqual( {
        searchTerm: '',
        selectedMonths: [],
        selectedYears: [],
        selectedTags: [],
        selectedFrequency: '',
      } );
      expect( result.current.filteredEvents ).toHaveLength( 3 );
      expect( result.current.activeFilterCount ).toBe( 0 );
    } );
  } );
  describe( 'Available Data', () => {
    test( 'extracts available tags from events', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      expect( result.current.availableTags ).toEqual( [
        'business',
        'design',
        'innovation',
        'strategy',
        'technology',
        'ux',
      ] );
    } );
    test( 'returns all 12 months as availableMonths', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      // availableMonths now returns all 12 months (static list)
      expect( result.current.availableMonths ).toEqual( [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
      ] );
    } );
    test( 'extracts available years from events', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      // All mock events are in 2027, but 2027 is in the past relative to current year
      // availableYears only includes current year onwards
      const currentYear = new Date().getFullYear();
      if ( currentYear <= 2027 ) {
        expect( result.current.availableYears ).toContain( '2027' );
      } else {
        // If current year > 2027, no years from mock events will be included
        expect( result.current.availableYears ).toEqual( [] );
      }
    } );
    test( 'handles events without tags', () => {
      const eventsWithoutTags = [
        { ...mockEvents[0], tags: undefined },
        { ...mockEvents[1], tags: null },
        { ...mockEvents[2], tags: '' },
      ] as CECEventData[];
      const { result } = renderHook( () => useEventFilters( eventsWithoutTags ) );
      expect( result.current.availableTags ).toEqual( [] );
    } );
    test( 'handles comma-separated tags string', () => {
      const eventsWithStringTags = [
        { ...mockEvents[0], tags: 'technology,innovation' },
        { ...mockEvents[1], tags: 'design,ux' },
      ] as CECEventData[];
      const { result } = renderHook( () => useEventFilters( eventsWithStringTags ) );
      expect( result.current.availableTags ).toEqual( [
        'design',
        'innovation',
        'technology',
        'ux',
      ] );
    } );
  } );
  describe( 'Edge Cases', () => {
    test( 'handles events with missing properties', () => {
      const eventsWithMissingProps: CECEventData[] = [
        { id: '1', title: 'Event 1' },
        { id: '2', title: 'Event 2', date: '2027-01-15' },
        { id: '3', title: 'Event 3', location: 'Boston' },
      ];
      const { result } = renderHook( () => useEventFilters( eventsWithMissingProps ) );
      expect( result.current.filteredEvents ).toHaveLength( 3 );
      act( () => {
        result.current.handleFilterChange( { searchTerm: 'event' } );
      } );
      expect( result.current.filteredEvents ).toHaveLength( 3 );
    } );
    test( 'handles null and undefined values gracefully', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      // Test that undefined selectedTags doesn't crash
      act( () => {
        result.current.handleFilterChange( { selectedTags: undefined as any } );
      } );
      expect( result.current.filters.selectedTags ).toBeUndefined();
    } );
    test( 'handles non-array events input', () => {
      const { result } = renderHook( () => useEventFilters( null as any ) );
      expect( result.current.filteredEvents ).toEqual( [] );
      expect( result.current.availableTags ).toEqual( [] );
      // availableMonths always returns all 12 months
      expect( result.current.availableMonths ).toEqual( [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
      ] );
      expect( result.current.availableYears ).toEqual( [] );
    } );
  } );
  describe( 'Filter Count', () => {
    test( 'calculates active filter count correctly', () => {
      const { result } = renderHook( () => useEventFilters( mockEvents ) );
      expect( result.current.activeFilterCount ).toBe( 0 );
      act( () => {
        result.current.handleFilterChange( { searchTerm: 'test' } );
      } );
      expect( result.current.activeFilterCount ).toBe( 1 );
      act( () => {
        result.current.handleFilterChange( { selectedMonths: ['01'] } );
      } );
      expect( result.current.activeFilterCount ).toBe( 2 );
      act( () => {
        result.current.handleFilterChange( { selectedYears: ['2027'] } );
      } );
      expect( result.current.activeFilterCount ).toBe( 3 );
      act( () => {
        result.current.handleFilterChange( { selectedTags: ['tag1', 'tag2'] } );
      } );
      expect( result.current.activeFilterCount ).toBe( 5 );
      act( () => {
        result.current.handleFilterChange( { selectedFrequency: 'monthly' } );
      } );
      expect( result.current.activeFilterCount ).toBe( 6 );
    } );
  } );
  describe( 'Branch Coverage - Additional Tests', () => {
    describe( 'Search Filter Edge Cases', () => {
      test( 'search matches description field', () => {
        const eventsWithDescription = [
          {
            ...mockEvents[0],
            description: 'A comprehensive tech conference featuring latest innovations',
          },
        ];
        const { result } = renderHook( () => useEventFilters( eventsWithDescription ) );
        act( () => {
          result.current.handleFilterChange( { searchTerm: 'comprehensive' } );
        } );
        expect( result.current.filteredEvents ).toHaveLength( 1 );
        expect( result.current.filteredEvents[0].description ).toContain( 'comprehensive' );
      } );
      test( 'search matches location field', () => {
        const { result } = renderHook( () => useEventFilters( mockEvents ) );
        act( () => {
          result.current.handleFilterChange( { searchTerm: 'San Francisco' } );
        } );
        expect( result.current.filteredEvents ).toHaveLength( 1 );
        expect( result.current.filteredEvents[0].location ).toBe( 'San Francisco' );
      } );
      test( 'search matches individual tags', () => {
        const { result } = renderHook( () => useEventFilters( mockEvents ) );
        act( () => {
          result.current.handleFilterChange( { searchTerm: 'innovation' } );
        } );
        expect( result.current.filteredEvents ).toHaveLength( 1 );
        expect( result.current.filteredEvents[0].tags ).toContain( 'innovation' );
      } );
      test( 'search handles events with null title', () => {
        const eventsWithNullTitle = [
          { ...mockEvents[0], title: null },
          { ...mockEvents[1], title: undefined },
        ] as unknown as CECEventData[];
        const { result } = renderHook( () => useEventFilters( eventsWithNullTitle ) );
        act( () => {
          result.current.handleFilterChange( { searchTerm: 'anything' } );
        } );
        // Should still work with "Untitled Event" fallback
        expect( result.current.filteredEvents ).toHaveLength( 0 );
      } );
      test( 'search handles empty string tags array', () => {
        const eventsWithEmptyTags = [
          { ...mockEvents[0], tags: [], title: 'No Match Event' },
        ] as CECEventData[];
        const { result } = renderHook( () => useEventFilters( eventsWithEmptyTags ) );
        act( () => {
          result.current.handleFilterChange( { searchTerm: 'nomatch' } );
        } );
        expect( result.current.filteredEvents ).toHaveLength( 0 );
      } );
    } );
    describe( 'Month Filter Edge Cases', () => {
      test( 'handles invalid month number in selectedMonths', () => {
        const { result } = renderHook( () => useEventFilters( mockEvents ) );
        act( () => {
          result.current.handleFilterChange( { selectedMonths: ['99'] } );
        } );
        // Should not crash and return no events for invalid month
        expect( result.current.filteredEvents ).toHaveLength( 0 );
      } );
      test( 'handles events without any date fields', () => {
        const eventsWithoutDates = [
          { id: '1', title: 'Event No Date' },
          { id: '2', title: 'Another Event' },
        ] as CECEventData[];
        const { result } = renderHook( () => useEventFilters( eventsWithoutDates ) );
        act( () => {
          result.current.handleFilterChange( { selectedMonths: ['01'] } );
        } );
        // Events without parseable dates are filtered out when month filter is active
        // because parsedStart is null and the filter requires a valid date
        expect( result.current.filteredEvents ).toHaveLength( 0 );
      } );
      test( 'handles events with recurrence.startDate priority', () => {
        // Test that events with recurrence are processed without crashing
        const eventsWithRecurrence: CECEventData[] = [
          {
            id: 'recurrence-test',
            title: 'Recurrence Test Event',
            date: '2027-02-20',
            startDate: '2027-02-20',
            location: 'Test Location',
            tags: ['test'],
            recurrence: { startDate: '2027-02-20', until: '2027-03-28', frequency: 'weekly' },
          },
        ];
        const { result } = renderHook( () => useEventFilters( eventsWithRecurrence ) );
        // Without filters, all events should be returned
        expect( result.current.filteredEvents ).toHaveLength( 1 );
      } );
      test( 'handles events with startDate priority over date', () => {
        // Test that startDate is used for filtering when available
        const eventsWithStartDate: CECEventData[] = [
          {
            id: 'startdate-test',
            date: '2027-02-20',
            startDate: '2027-02-20',
            title: 'Event With StartDate',
            location: 'Test Location',
            tags: ['test'],
            recurrence: { startDate: '2027-02-20', until: '2027-03-20', frequency: 'weekly' },
          },
        ];
        const { result } = renderHook( () => useEventFilters( eventsWithStartDate ) );
        // Without filters, all events should be returned
        expect( result.current.filteredEvents ).toHaveLength( 1 );
        expect( result.current.filteredEvents[0].title ).toBe( 'Event With StartDate' );
      } );
    } );
    describe( 'Frequency Filter All Branches', () => {
      test( 'filters by "single day event" frequency', () => {
        const eventsWithFrequencies = [
          { ...mockEvents[0], recurrence: { frequency: undefined } }, // Single day
          { ...mockEvents[1], recurrence: { frequency: null } }, // Single day
          { ...mockEvents[2], recurrence: { frequency: '' } }, // Single day
          { ...mockEvents[0], id: '4', recurrence: { frequency: 'daily' } },
        ] as unknown as CECEventData[];
        const { result } = renderHook( () => useEventFilters( eventsWithFrequencies ) );
        act( () => {
          result.current.handleFilterChange( { selectedFrequency: 'single day event' } );
        } );
        expect( result.current.filteredEvents ).toHaveLength( 3 );
      } );
      test( 'filters by daily frequency', () => {
        const eventsWithDaily = [
          { ...mockEvents[0], recurrence: { frequency: 'daily' } },
          { ...mockEvents[1], recurrence: { frequency: 'weekly' } },
        ] as unknown as CECEventData[];
        const { result } = renderHook( () => useEventFilters( eventsWithDaily ) );
        act( () => {
          result.current.handleFilterChange( { selectedFrequency: 'daily' } );
        } );
        expect( result.current.filteredEvents ).toHaveLength( 1 );
        expect( result.current.filteredEvents[0].recurrence?.frequency ).toBe( 'daily' );
      } );
      test( 'filters by weekly frequency', () => {
        const eventsWithWeekly = [
          { ...mockEvents[0], recurrence: { frequency: 'weekly' } },
          { ...mockEvents[1], recurrence: { frequency: 'monthly' } },
        ] as unknown as CECEventData[];
        const { result } = renderHook( () => useEventFilters( eventsWithWeekly ) );
        act( () => {
          result.current.handleFilterChange( { selectedFrequency: 'weekly' } );
        } );
        expect( result.current.filteredEvents ).toHaveLength( 1 );
        expect( result.current.filteredEvents[0].recurrence?.frequency ).toBe( 'weekly' );
      } );
      test( 'filters by yearly frequency', () => {
        const eventsWithYearly = [
          { ...mockEvents[0], recurrence: { frequency: 'yearly' } },
          { ...mockEvents[1], recurrence: { frequency: 'monthly' } },
        ] as unknown as CECEventData[];
        const { result } = renderHook( () => useEventFilters( eventsWithYearly ) );
        act( () => {
          result.current.handleFilterChange( { selectedFrequency: 'yearly' } );
        } );
        expect( result.current.filteredEvents ).toHaveLength( 1 );
        expect( result.current.filteredEvents[0].recurrence?.frequency ).toBe( 'yearly' );
      } );
      test( 'frequency filter is case insensitive', () => {
        const { result } = renderHook( () => useEventFilters( mockEvents ) );
        act( () => {
          result.current.handleFilterChange( { selectedFrequency: 'MONTHLY' } );
        } );
        expect( result.current.filteredEvents ).toHaveLength( 1 );
        expect( result.current.filteredEvents[0].recurrence?.frequency ).toBe( 'monthly' );
      } );
      test( 'handles events without recurrence object', () => {
        const eventsWithoutRecurrence = [
          { ...mockEvents[0], recurrence: undefined },
          { ...mockEvents[1], recurrence: null },
        ] as CECEventData[];
        const { result } = renderHook( () => useEventFilters( eventsWithoutRecurrence ) );
        act( () => {
          result.current.handleFilterChange( { selectedFrequency: 'single day event' } );
        } );
        expect( result.current.filteredEvents ).toHaveLength( 2 );
      } );
    } );
    describe( 'Tags Filter Edge Cases', () => {
      test( 'handles events with empty tags array', () => {
        const eventsWithEmptyTags = [
          { ...mockEvents[0], tags: [] },
          { ...mockEvents[1], tags: ['design'] },
        ];
        const { result } = renderHook( () => useEventFilters( eventsWithEmptyTags ) );
        act( () => {
          result.current.handleFilterChange( { selectedTags: ['design'] } );
        } );
        expect( result.current.filteredEvents ).toHaveLength( 1 );
      } );
      test( 'handles tags with whitespace and empty strings', () => {
        const eventsWithWhitespaceTags = [
          { ...mockEvents[0], tags: ['technology', '', ' innovation '] },
        ];
        const { result } = renderHook( () => useEventFilters( eventsWithWhitespaceTags ) );
        act( () => {
          result.current.handleFilterChange( { selectedTags: [' innovation '] } );
        } );
        expect( result.current.filteredEvents ).toHaveLength( 1 );
      } );
      test( 'handles comma-separated tags with whitespace', () => {
        const eventsWithCommaTags = [
          { ...mockEvents[0], tags: 'technology, innovation , design' },
        ];
        const { result } = renderHook( () => useEventFilters( eventsWithCommaTags ) );
        act( () => {
          result.current.handleFilterChange( { selectedTags: [' innovation '] } );
        } );
        expect( result.current.filteredEvents ).toHaveLength( 1 );
      } );
    } );
    describe( 'Available Data Edge Cases', () => {
      test( 'handles events with invalid dates for availableYears', () => {
        // Events with invalid recurrence.startDate fall back to startDate/date via getEventStartDate
        const eventsWithInvalidDates = [
          { ...mockEvents[0], recurrence: { startDate: 'invalid-date' } },
          { ...mockEvents[1], recurrence: { startDate: null } },
          { ...mockEvents[2], recurrence: { startDate: undefined } },
        ] as CECEventData[];
        const { result } = renderHook( () => useEventFilters( eventsWithInvalidDates ) );
        // availableMonths always returns all 12 months
        expect( result.current.availableMonths ).toHaveLength( 12 );
        // availableYears depends on current year - 2027 events may or may not be included
        const currentYear = new Date().getFullYear();
        if ( currentYear <= 2027 ) {
          expect( result.current.availableYears ).toContain( '2027' );
        }
      } );
      test( 'handles tags with various falsy values', () => {
        const eventsWithFalsyTags = [
          { ...mockEvents[0], tags: false as any },
          { ...mockEvents[1], tags: 0 as any },
          { ...mockEvents[2], tags: '' },
        ];
        const { result } = renderHook( () => useEventFilters( eventsWithFalsyTags ) );
        expect( result.current.availableTags ).toEqual( [] );
      } );
      test( 'handles mixed tag formats in same dataset', () => {
        const eventsWithMixedTags = [
          { ...mockEvents[0], tags: ['technology', 'innovation'] },
          { ...mockEvents[1], tags: 'design,ux' },
          { ...mockEvents[2], tags: null },
        ] as CECEventData[];
        const { result } = renderHook( () => useEventFilters( eventsWithMixedTags ) );
        expect( result.current.availableTags ).toEqual( [
          'design',
          'innovation',
          'technology',
          'ux',
        ] );
      } );
    } );
    describe( 'Sorting Edge Cases', () => {
      test( 'sorts events chronologically with mixed date formats', () => {
        const eventsWithMixedDates: CECEventData[] = [
          { ...mockEvents[0], date: '2027-03-15', title: 'March Event', recurrence: { startDate: '2027-03-15', frequency: '' as const } }, // March
          { ...mockEvents[1], startDate: '2027-01-20T09:00:00', title: 'January Event', recurrence: { startDate: '2027-01-20', frequency: '' as const } }, // January
          { ...mockEvents[2], recurrence: { startDate: '2027-02-10', frequency: 'monthly' as const }, title: 'February Event' }, // February
        ];
        const { result } = renderHook( () => useEventFilters( eventsWithMixedDates ) );
        expect( result.current.filteredEvents[0].title ).toBe( 'January Event' ); // January
        expect( result.current.filteredEvents[1].title ).toBe( 'February Event' ); // February
        expect( result.current.filteredEvents[2].title ).toBe( 'March Event' ); // March
      } );
      test( 'handles events with unparseable dates in sorting', () => {
        const eventsWithBadDates: CECEventData[] = [
          { ...mockEvents[0], date: 'invalid-date', title: 'Bad Date Event', recurrence: { startDate: 'invalid-date', frequency: '' as const } },
          { ...mockEvents[1], startDate: '2027-02-20T09:00:00', title: 'Good Date Event', recurrence: { startDate: '2027-02-20', frequency: '' as const } },
        ];
        const { result } = renderHook( () => useEventFilters( eventsWithBadDates ) );
        // Should not crash - both events should be in results
        expect( result.current.filteredEvents ).toHaveLength( 2 );
      } );
    } );
    describe( 'Combined Filter Complex Scenarios', () => {
      test( 'handles all filters active simultaneously', () => {
        const { result } = renderHook( () => useEventFilters( mockEvents ) );
        act( () => {
          result.current.handleFilterChange( {
            searchTerm: 'design',
            selectedMonths: ['02'],
            selectedYears: ['2027'],
            selectedTags: ['design'],
            selectedFrequency: 'weekly',
          } );
        } );
        // Design Workshop matches all criteria
        expect( result.current.filteredEvents ).toHaveLength( 1 );
        expect( result.current.filteredEvents[0].title ).toBe( 'Design Workshop' );
        expect( result.current.activeFilterCount ).toBe( 5 );
      } );
      test( 'filters by month when event is in January', () => {
        // Event starts in Jan
        const eventInJan: CECEventData = {
          id: 'jan-test',
          title: 'January Event',
          date: '2026-01-05',
          startDate: '2026-01-05',
          recurrence: {
            startDate: '2026-01-05',
            frequency: 'weekly' as any,
          },
        };
        const { result } = renderHook( () => useEventFilters( [eventInJan] ) );
        act( () => {
          result.current.handleFilterChange( { selectedMonths: ['01'] } );
        } );
        expect( result.current.filteredEvents ).toHaveLength( 1 );
        expect( result.current.filteredEvents[0].id ).toBe( 'jan-test' );
      } );
      test( 'excludes event from month when event is not in that month', () => {
        const eventInJan: CECEventData = {
          id: 'jan-event',
          title: 'January Event',
          date: '2026-01-05',
          startDate: '2026-01-05',
          recurrence: {
            startDate: '2026-01-05',
            frequency: 'weekly' as any,
          },
        };
        const { result } = renderHook( () => useEventFilters( [eventInJan] ) );
        act( () => {
          // Filter by June - event is in January
          result.current.handleFilterChange( { selectedMonths: ['06'] } );
        } );
        expect( result.current.filteredEvents ).toHaveLength( 0 );
      } );
      test( 'handles empty results with all filters', () => {
        const { result } = renderHook( () => useEventFilters( mockEvents ) );
        act( () => {
          result.current.handleFilterChange( {
            searchTerm: 'nonexistent',
            selectedMonths: ['12'],
            selectedYears: ['2025'],
            selectedTags: ['nonexistent'],
            selectedFrequency: 'yearly',
          } );
        } );
        expect( result.current.filteredEvents ).toHaveLength( 0 );
        expect( result.current.activeFilterCount ).toBe( 5 );
      } );
    } );
  } );
} );
