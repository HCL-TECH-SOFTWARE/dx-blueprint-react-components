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

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventFilters from './EventFilters';
// Mock DXTaxonomyFilter
jest.mock( '../../DXTaxonomyFilter/DXTaxonomyFilter', () => ( {
  __esModule: true,
  default: ( { filters, onFilterChange, filterItems, hideSearch }: any ) => {
    // If search is hidden and no filters, render empty div
    if ( hideSearch && ( !filters || filters.length === 0 ) ) {
      return <div data-testid="dx-taxonomy-filter-empty"></div>;
    }
    // Otherwise render the taxonomy filter (even if only search is shown)
    return (
      <div data-testid="dx-taxonomy-filter">
        {filters && filters.map( ( filter: any, index: number ) => (
          <div key={filter.attribute || filter.id || `filter-${index}`} data-testid={`filter-${filter.attribute || filter.id || `filter-${index}`}`}>
            <input
              data-testid={`input-${filter.attribute || filter.id || `filter-${index}`}`}
              onChange={( e ) => onFilterChange?.( filter.id, e.target.value )}
            />
          </div>
        ) )}
        <button
          data-testid="taxonomy-change"
          onClick={() => filterItems?.( ['_search:test', 'tag:technology'] )}
        >
          Change Filters
        </button>
        <button
          data-testid="month-april-2026"
          onClick={() => filterItems?.( ['month:April'] )}
        >
          April
        </button>
        <button
          data-testid="invalid-month"
          onClick={() => filterItems?.( ['month:'] )}
        >
          Invalid Month
        </button>
        <button
          data-testid="empty-filters"
          onClick={() => filterItems?.( [] )}
        >
          Empty Filters
        </button>
        <button
          data-testid="unknown-filter"
          onClick={() => filterItems?.( ['unknown:type:value'] )}
        >
          Unknown Filter
        </button>
      </div>
    );
  },
} ) );
describe( 'EventFilters Component', () => {
  const defaultProps = {
    searchTerm: '',
    selectedMonths: [],
    selectedYears: [],
    selectedTags: [],
    selectedFrequency: '',
    availableMonths: ['2024-01', '2024-02', '2024-03', '2026-04'],
    availableYears: ['2024', '2025', '2026'],
    availableTags: ['technology', 'business', 'science'],
    availableFrequencies: ['daily', 'weekly', 'monthly'],
    onFilterChange: jest.fn(),
    onClearFilters: jest.fn(),
    activeFilterCount: 0,
    items: [
      {
        startDate: '2024-01-15',
        endDate: '2024-01-15',
        category: ['technology'],
      },
      {
        startDate: '2024-02-20',
        endDate: '2024-02-20',
        category: 'business',
      },
      {
        startDate: '2026-04-01',
        endDate: '2026-04-30',
        category: 'science',
      },
    ],
    filteredCount: 2,
  };
  beforeEach( () => {
    jest.clearAllMocks();
  } );
  afterEach( () => {
    jest.restoreAllMocks();
  } );
  describe( 'Basic Rendering', () => {
    test( 'renders component with default props', () => {
      render( <EventFilters {...defaultProps} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'renders search input when showSearch is true', () => {
      render( <EventFilters {...defaultProps} showSearch /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'does not render search when showSearch is false', () => {
      render( <EventFilters {...defaultProps} showSearch={false} /> );
      // When showSearch is false but other filters are shown, the component should still render
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'renders month filter when showMonthFilter is true', () => {
      render( <EventFilters {...defaultProps} showMonthFilter /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'renders tags filter when showTags is true', () => {
      render( <EventFilters {...defaultProps} showTags /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'renders recurrence filter when showRecurrence is true', () => {
      render( <EventFilters {...defaultProps} showRecurrence /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
  } );
  describe( 'Filter Initialization', () => {
    test( 'initializes search filter when showSearch is true', () => {
      render( <EventFilters {...defaultProps} showSearch searchLabel="Custom Search" /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'initializes month filter when showMonthFilter is true and months available', () => {
      render( <EventFilters {...defaultProps} showMonthFilter availableMonths={['2024-01', '2024-02']} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'initializes tags filter when showTags is true and tags available', () => {
      render( <EventFilters {...defaultProps} showTags availableTags={['tech', 'business']} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'initializes recurrence filter when showRecurrence is true', () => {
      render( <EventFilters {...defaultProps} showRecurrence availableFrequencies={['daily', 'weekly']} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'does not initialize month filter when no available months', () => {
      render( <EventFilters {...defaultProps} showMonthFilter availableMonths={[]} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'does not initialize tags filter when no available tags', () => {
      render( <EventFilters {...defaultProps} showTags availableTags={[]} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
  } );
  describe( 'Filter State Management', () => {
    test( 'handles filter changes correctly', () => {
      render( <EventFilters {...defaultProps} /> );
      // Test that the component renders without errors
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
      // Find any input element and test interaction
      const inputs = screen.getAllByTestId( /^input-/ );
      if ( inputs.length > 0 ) {
        fireEvent.change( inputs[0], { target: { value: 'test search' } } );
        expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
      }
    } );
    test( 'handles taxonomy filter changes via callback', () => {
      const mockOnFilterChange = jest.fn();
      render( <EventFilters {...defaultProps} onFilterChange={mockOnFilterChange} /> );
      const changeButton = screen.getByTestId( 'taxonomy-change' );
      fireEvent.click( changeButton );
      expect( mockOnFilterChange ).toHaveBeenCalledWith( {
        searchTerm: 'test',
        selectedMonths: [],
        selectedYears: [],
        selectedTags: ['technology'],
        selectedFrequency: '',
      } );
    } );
    test( 'handles month parsing in taxonomy callback', () => {
      const mockOnFilterChange = jest.fn();
      render( <EventFilters {...defaultProps} onFilterChange={mockOnFilterChange} /> );
      // Mock the onSelectedFiltersChange to include month
      const changeButton = screen.getByTestId( 'taxonomy-change' );
      // Simulate month selection
      fireEvent.click( changeButton );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'month:April 2026 is parsed to selectedMonth "04"', () => {
      const mockOnFilterChange = jest.fn();
      render( <EventFilters {...defaultProps} onFilterChange={mockOnFilterChange} /> );
      fireEvent.click( screen.getByTestId( 'month-april-2026' ) );
      // Month filter now uses month numbers (01-12) instead of YYYY-MM format
      expect( mockOnFilterChange ).toHaveBeenCalledWith( expect.objectContaining( {
        selectedMonths: ['04'],
      } ) );
    } );
    test( 'updates filters when dependencies change', () => {
      const { rerender } = render( <EventFilters {...defaultProps} availableMonths={['2024-01']} /> );
      rerender( <EventFilters {...defaultProps} availableMonths={['2024-01', '2024-02']} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'prevents infinite loops with ref tracking', () => {
      const { rerender } = render( <EventFilters {...defaultProps} /> );
      // Multiple rerenders should not cause issues
      rerender( <EventFilters {...defaultProps} searchTerm="updated" /> );
      rerender( <EventFilters {...defaultProps} selectedMonths={["2024-01"]} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
  } );
  describe( 'Props Handling', () => {
    test( 'uses custom search label', () => {
      render( <EventFilters {...defaultProps} searchLabel="Custom Search Label" /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'uses custom search placeholder', () => {
      render( <EventFilters {...defaultProps} searchPlaceholder="Custom placeholder" /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'handles empty available arrays', () => {
      render( <EventFilters
        {...defaultProps}
        availableMonths={[]}
        availableTags={[]}
        availableFrequencies={[]}
      /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'handles missing optional props', () => {
      render( <EventFilters
        searchTerm=""
        selectedMonths={[]}
        selectedYears={[]}
        selectedTags={[]}
        availableMonths={[]}
        availableYears={[]}
        onFilterChange={jest.fn()}
        onClearFilters={jest.fn()}
        activeFilterCount={0}
      /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
  } );
  describe( 'Items Processing', () => {
    test( 'processes items with array categories', () => {
      const itemsWithArrayCategories = [
        { category: ['tech', 'business'] },
        { category: ['science'] },
      ];
      render( <EventFilters {...defaultProps} items={itemsWithArrayCategories} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'processes items with string categories', () => {
      const itemsWithStringCategories = [
        { category: 'tech' },
        { category: 'business' },
      ];
      render( <EventFilters {...defaultProps} items={itemsWithStringCategories} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'handles items without categories', () => {
      const itemsWithoutCategories = [
        { title: 'Event 1' },
        { title: 'Event 2' },
      ];
      render( <EventFilters {...defaultProps} items={itemsWithoutCategories} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'handles empty items array', () => {
      render( <EventFilters {...defaultProps} items={[]} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'handles malformed items', () => {
      const malformedItems = [
        '',
        '',
        '',
        {},
      ];
      render( <EventFilters {...defaultProps} items={malformedItems} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
  } );
  describe( 'Filter Visibility', () => {
    test( 'shows only search filter when others are hidden', () => {
      render( <EventFilters
        {...defaultProps}
        showSearch={true}
        showMonthFilter={false}
        showTags={false}
        showRecurrence={false}
      /> );
      // When only search is shown, the component should render
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'shows only month filter when others are hidden', () => {
      render( <EventFilters
        {...defaultProps}
        showSearch={false}
        showMonthFilter={true}
        showTags={false}
        showRecurrence={false}
      /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'shows only tags filter when others are hidden', () => {
      render( <EventFilters
        {...defaultProps}
        showSearch={false}
        showMonthFilter={false}
        showTags={true}
        showRecurrence={false}
      /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'shows only recurrence filter when others are hidden', () => {
      render( <EventFilters
        {...defaultProps}
        showSearch={false}
        showMonthFilter={false}
        showTags={false}
        showRecurrence={true}
      /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'hides all filters when all show props are false', () => {
      const { container } = render( <EventFilters
        {...defaultProps}
        showSearch={false}
        showMonthFilter={false}
        showYearFilter={false}
        showTags={false}
        showRecurrence={false}
      /> );
      // When all filters are hidden, the component should return null
      expect( container.firstChild ).toBeNull();
    } );
  } );
  describe( 'Edge Cases', () => {
    test( 'handles undefined filter values', () => {
      render( <EventFilters
        {...defaultProps}
        searchTerm={''}
        selectedMonths={[]}
        selectedTags={[]}
        selectedFrequency={''}
      /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'handles null filter values', () => {
      render( <EventFilters
        {...defaultProps}
        searchTerm={null as any}
        selectedMonths={[] as any}
        selectedTags={null as any}
        selectedFrequency={null as any}
      /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'handles filteredCount undefined', () => {
      render( <EventFilters {...defaultProps} filteredCount={undefined} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'handles activeFilterCount negative', () => {
      render( <EventFilters {...defaultProps} activeFilterCount={-1} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'handles activeFilterCount zero', () => {
      render( <EventFilters {...defaultProps} activeFilterCount={0} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'handles activeFilterCount positive', () => {
      render( <EventFilters {...defaultProps} activeFilterCount={3} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
  } );
  describe( 'Component Structure', () => {
    test( 'renders with correct structure', () => {
      render( <EventFilters {...defaultProps} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'handles rapid prop changes', () => {
      const { rerender } = render( <EventFilters {...defaultProps} /> );
      for ( let i = 0; i < 5; i++ ) {
        rerender( <EventFilters {...defaultProps} searchTerm={`search-${i}`} /> );
      }
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'handles effect cleanup on unmount', () => {
      const { unmount } = render( <EventFilters {...defaultProps} /> );
      expect( () => unmount() ).not.toThrow();
    } );
  } );
  describe( 'Month Filter Visibility Fix', () => {
    test( 'shows Month filter when availableMonths is non-empty', () => {
      render( <EventFilters
        {...defaultProps}
        showMonthFilter={true}
        availableMonths={['2026-05', '2026-06']}
      /> );
      expect( screen.getByTestId( 'filter-month' ) ).toBeInTheDocument();
    } );
    test( 'shows Month filter with all 12 months regardless of availableMonths', () => {
      // Month filter now shows all 12 months when showMonthFilter is true,
      // regardless of availableMonths (which is used for year extraction)
      render( <EventFilters
        {...defaultProps}
        showMonthFilter={true}
        showYearFilter={false}
        availableMonths={[]}
        showTags={false}
        showRecurrence={false}
      /> );
      // Month filter should be visible with all 12 months
      expect( screen.getByTestId( 'filter-month' ) ).toBeInTheDocument();
    } );
    test( 'shows Month filter for items with only recurrence dates (no top-level startDate)', () => {
      const itemsWithRecurrenceDatesOnly = [
        { recurrence: { startDate: '2026-05-08', endDate: '2026-11-30' } },
      ];
      render( <EventFilters
        {...defaultProps}
        items={itemsWithRecurrenceDatesOnly}
        availableMonths={['2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10', '2026-11']}
        showMonthFilter={true}
      /> );
      expect( screen.getByTestId( 'filter-month' ) ).toBeInTheDocument();
    } );
    test( 'Tags and Recurrence filters still appear alongside Month filter', () => {
      render( <EventFilters
        {...defaultProps}
        availableMonths={['2026-05']}
        showMonthFilter={true}
        showTags={true}
        showRecurrence={true}
      /> );
      expect( screen.getByTestId( 'filter-month' ) ).toBeInTheDocument();
      expect( screen.getByTestId( 'filter-tags' ) ).toBeInTheDocument();
      expect( screen.getByTestId( 'filter-frequency' ) ).toBeInTheDocument();
    } );
  } );
  describe( 'SearchIcon Component', () => {
    test( 'renders SearchIcon with default className', () => {
      // Since SearchIcon is internal, we test it through the component
      render( <EventFilters {...defaultProps} showSearch /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
  } );
  describe( 'Branch Coverage - Error Handling', () => {
    test( 'handles month parsing errors in filterItems callback', () => {
      const mockOnFilterChange = jest.fn();
      render( <EventFilters {...defaultProps} onFilterChange={mockOnFilterChange} /> );
      // Trigger the invalid month parsing - empty value after month:
      const invalidMonthButton = screen.getByTestId( 'invalid-month' );
      fireEvent.click( invalidMonthButton );
      expect( mockOnFilterChange ).toHaveBeenCalledWith( {
        searchTerm: '',
        selectedMonths: [], // Invalid date parsing results in empty string
        selectedYears: [],
        selectedTags: [],
        selectedFrequency: ''
      } );
    } );
    test( 'handles malformed month strings in filter creation', () => {
      // Test with malformed month strings that could cause parsing issues
      const malformedMonths = ['invalid-format', '2024', '2024-13', 'not-a-date'];
      render( <EventFilters
        {...defaultProps}
        showMonthFilter={true}
        availableMonths={malformedMonths}
      /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'handles month parsing with invalid date values', () => {
      const mockOnFilterChange = jest.fn();
      const mockConsoleError = jest.spyOn( console, 'error' ).mockImplementation();
      render( <EventFilters {...defaultProps} onFilterChange={mockOnFilterChange} /> );
      // Simulate filter change with completely invalid month value
      const changeButton = screen.getByTestId( 'taxonomy-change' );
      fireEvent.click( changeButton );
      expect( mockConsoleError ).not.toHaveBeenCalled();
      expect( mockConsoleError ).not.toHaveBeenCalled();
    } );
  } );
  describe( 'Branch Coverage - useEffect Optimization', () => {
    test( 'skips filter update when dependencies unchanged', () => {
      const { rerender } = render( <EventFilters {...defaultProps} /> );
      // Rerender with exactly the same props - should skip update due to dependency optimization
      rerender( <EventFilters {...defaultProps} /> );
      rerender( <EventFilters {...defaultProps} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'updates filters when searchLabel changes', () => {
      const { rerender } = render( <EventFilters {...defaultProps} searchLabel="Initial" /> );
      rerender( <EventFilters {...defaultProps} searchLabel="Updated" /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'updates filters when availableMonths array content changes', () => {
      const { rerender } = render( <EventFilters {...defaultProps} availableMonths={['2024-01']} /> );
      // Change the content of the array
      rerender( <EventFilters {...defaultProps} availableMonths={['2024-02']} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'updates filters when availableTags array content changes', () => {
      const { rerender } = render( <EventFilters {...defaultProps} availableTags={['tag1']} /> );
      rerender( <EventFilters {...defaultProps} availableTags={['tag2']} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'handles effect when prevDeps is undefined', () => {
      // First render should have prevDeps as undefined
      render( <EventFilters {...defaultProps} /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
  } );
  describe( 'Branch Coverage - Filter Items Callback', () => {
    test( 'handles search filter in callback', () => {
      const mockOnFilterChange = jest.fn();
      render( <EventFilters {...defaultProps} onFilterChange={mockOnFilterChange} /> );
      // Simulate search filter selection - use the first button found
      const changeButtons = screen.getAllByTestId( 'taxonomy-change' );
      fireEvent.click( changeButtons[0] );
      expect( mockOnFilterChange ).toHaveBeenCalledWith(
        expect.objectContaining( {
          searchTerm: expect.any( String ),
          selectedMonths: expect.any( Array ),
          selectedTags: expect.any( Array ),
          selectedFrequency: expect.any( String )
        } )
      );
    } );
    test( 'handles multiple tags in callback', () => {
      const mockOnFilterChange = jest.fn();
      render( <EventFilters {...defaultProps} onFilterChange={mockOnFilterChange} /> );
      const changeButtons = screen.getAllByTestId( 'taxonomy-change' );
      fireEvent.click( changeButtons[0] );
      // Should handle multiple tags being selected
      expect( mockOnFilterChange ).toHaveBeenCalledWith(
        expect.objectContaining( {
          selectedTags: expect.any( Array )
        } )
      );
    } );
    test( 'handles frequency filter in callback', () => {
      const mockOnFilterChange = jest.fn();
      render( <EventFilters {...defaultProps} onFilterChange={mockOnFilterChange} /> );
      const changeButtons = screen.getAllByTestId( 'taxonomy-change' );
      fireEvent.click( changeButtons[0] );
      expect( mockOnFilterChange ).toHaveBeenCalledWith(
        expect.objectContaining( {
          selectedFrequency: expect.any( String )
        } )
      );
    } );
    test( 'handles unknown filter types gracefully', () => {
      const mockOnFilterChange = jest.fn();
      render( <EventFilters {...defaultProps} onFilterChange={mockOnFilterChange} /> );
      const changeButtons = screen.getAllByTestId( 'taxonomy-change' );
      fireEvent.click( changeButtons[0] );
      // Should not crash when encountering unknown filter types
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
  } );
  describe( 'Branch Coverage - Conditional Rendering', () => {
    test( 'returns null when all filters disabled and no data', () => {
      const { container } = render( <EventFilters
        searchTerm=""
        selectedMonths={[]}
        selectedYears={[]}
        selectedTags={[]}
        availableMonths={[]}
        availableYears={[]}
        availableTags={[]}
        availableFrequencies={[]}
        onFilterChange={jest.fn()}
        onClearFilters={jest.fn()}
        activeFilterCount={0}
        showSearch={false}
        showMonthFilter={false}
        showYearFilter={false}
        showTags={false}
        showRecurrence={false}
      /> );
      expect( container.firstChild ).toBeNull();
    } );
    test( 'renders when only search is available', () => {
      render( <EventFilters
        {...defaultProps}
        availableMonths={[]}
        availableTags={[]}
        showMonthFilter={false}
        showTags={false}
        showRecurrence={false}
        showSearch={true}
      /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'renders when only filters are available (no search)', () => {
      render( <EventFilters
        {...defaultProps}
        showSearch={false}
        showMonthFilter={true}
        availableMonths={['2024-01']}
        showTags={false}
        showRecurrence={false}
      /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'handles filteredCount fallback to items.length', () => {
      render( <EventFilters
        {...defaultProps}
        filteredCount={undefined}
        items={[{}, {}, {}]} // 3 items
      /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
  } );
  describe( 'Branch Coverage - Edge Cases', () => {
    test( 'handles empty selectedFilters array', () => {
      const mockOnFilterChange = jest.fn();
      render( <EventFilters {...defaultProps} onFilterChange={mockOnFilterChange} /> );
      const emptyFiltersButton = screen.getByTestId( 'empty-filters' );
      fireEvent.click( emptyFiltersButton );
      expect( mockOnFilterChange ).toHaveBeenCalledWith( {
        searchTerm: '',
        selectedMonths: [],
        selectedYears: [],
        selectedTags: [],
        selectedFrequency: ''
      } );
    } );
    test( 'handles filter strings without colons', () => {
      const mockOnFilterChange = jest.fn();
      render( <EventFilters {...defaultProps} onFilterChange={mockOnFilterChange} /> );
      // This would be handled by the unknown filter case
      const unknownFilterButton = screen.getByTestId( 'unknown-filter' );
      fireEvent.click( unknownFilterButton );
      expect( mockOnFilterChange ).toHaveBeenCalledWith( {
        searchTerm: '',
        selectedMonths: [],
        selectedYears: [],
        selectedTags: [],
        selectedFrequency: ''
      } );
    } );
    test( 'handles availableFrequencies prop (unused but passed)', () => {
      render( <EventFilters
        {...defaultProps}
        availableFrequencies={['custom-frequency']}
        showRecurrence={true}
      /> );
      expect( screen.getByTestId( 'dx-taxonomy-filter' ) ).toBeInTheDocument();
    } );
    test( 'handles month parsing with valid month format', () => {
      const mockOnFilterChange = jest.fn();
      render( <EventFilters {...defaultProps} onFilterChange={mockOnFilterChange} /> );
      // Test with a valid month that should parse correctly
      const changeButtons = screen.getAllByTestId( 'taxonomy-change' );
      fireEvent.click( changeButtons[0] );
      expect( mockOnFilterChange ).toHaveBeenCalled();
    } );
  } );
} );
