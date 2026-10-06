import React, { useCallback, useMemo, useRef } from 'react';
import DXTaxonomyFilter, { TaxFilterProps, TaxonomyFilterProps } from '../../DXTaxonomyFilter/DXTaxonomyFilter';
import './EventFilters.scss';
const SearchIcon = ( { className = '' } ) => (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
            stroke="#14181F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 15L21 21" stroke="#14181F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
interface EventFiltersProps {
    searchLabel?: string;
    searchPlaceholder?: string;
    searchTerm: string;
    selectedMonths: string[];  // Month numbers: ["01", "02", ...]
    selectedYears: string[];   // Year strings: ["2026", "2027", ...]
    selectedTags: string[];
    selectedFrequency?: string;
    availableMonths: string[];  // All 12 months: ["01", "02", ..., "12"]
    availableYears: string[];   // Years from events: ["2026", "2027", ...]
    availableTags?: string[];
    availableFrequencies?: string[];
    onFilterChange: ( filters: { searchTerm: string; selectedMonths: string[]; selectedYears: string[]; selectedTags: string[]; selectedFrequency?: string; } ) => void;
    onClearFilters: () => void;
    activeFilterCount: number;
    items?: Array<Record<string, unknown>>;
    filteredCount?: number;
    showSearch?: boolean;
    showMonthFilter?: boolean;   // Renamed from showMonthYear
    showYearFilter?: boolean;    // NEW
    showTags?: boolean;
    showRecurrence?: boolean;
    locale?: string;
}
const EventFilters: React.FC<EventFiltersProps> = ( {
    searchLabel = 'Search events',
    searchPlaceholder = 'Type to search events...',
    searchTerm,
    selectedFrequency,
    availableYears,
    availableTags = [],
    onFilterChange,
    onClearFilters,
    activeFilterCount,
    items = [],
    filteredCount,
    showSearch = true,
    showMonthFilter = true,
    showYearFilter = true,
    showTags = true,
    showRecurrence = true,
    locale = 'en-US'
} ) => {
    const resolvedLocale = useMemo( () => {
        try {
            return new Intl.DateTimeFormat( locale ).resolvedOptions().locale || 'en-US';
        } catch {
            return 'en-US';
        }
    }, [locale] );
    // Formatter for localized month names (without year)
    const monthFormatter = useMemo( () => {
        return new Intl.DateTimeFormat( resolvedLocale, {
            month: 'long'
        } );
    }, [resolvedLocale] );
    const normalizeMonthLabel = useCallback( ( label: string ): string => {
        return label
            .normalize( 'NFD' )
            .replace( /[\u0300-\u036f]/g, '' )
            .replace( /[.,،。]+$/g, '' )
            .toLowerCase()
            .replace( /\s+/g, ' ' )
            .trim();
    }, [] );
    // Generate localized month names for all 12 months
    const monthLabelToValueRef = useRef<Record<string, string>>( {} );
    const localizedMonths = useMemo( () => {
        const map: Record<string, string> = {};
        const months: Array<{ value: string; label: string; }> = [];
        // Generate all 12 months with localized labels
        for ( let i = 0; i < 12; i++ ) {
            const monthValue = String( i + 1 ).padStart( 2, '0' );  // "01" through "12"
            const dt = new Date( 2000, i, 1 );  // Use a fixed year for formatting
            const label = monthFormatter.format( dt );
            const normalizedLabel = normalizeMonthLabel( label );
            map[normalizedLabel] = monthValue;
            months.push( { value: monthValue, label } );
        }
        monthLabelToValueRef.current = map;
        return months;
    }, [monthFormatter, normalizeMonthLabel] );
    // Extract just the labels for the filter dropdown
    const monthLabels = useMemo( () => {
        return localizedMonths.map( m => m.label );
    }, [localizedMonths] );
    // Helper: convert month label to month number ("01" through "12")
    const getValidMonthValue = ( label: string ): string => {
        // Normalize label to match map keys across locale differences
        const normalizedLabel = normalizeMonthLabel( label );
        const value = monthLabelToValueRef.current[normalizedLabel];
        // Return the month number if found
        if ( value ) {
            return value;
        }
        return '';
    };
    // Build filters using useMemo for better performance and consistency
    const computedFilters = useMemo( () => {
        const newFilters: TaxFilterProps[] = [];
        // Add month filter if enabled (all 12 months)
        if ( showMonthFilter && monthLabels.length > 0 ) {
            newFilters.push( {
                label: 'Month',
                type: 'select',
                attribute: 'month',
                values: monthLabels
            } );
        }
        // Add year filter if enabled (years from event data)
        if ( showYearFilter && availableYears?.length > 0 ) {
            newFilters.push( {
                label: 'Year',
                type: 'select',
                attribute: 'year',
                values: availableYears
            } );
        }
        // Add tags filter if enabled
        if ( showTags && availableTags?.length > 0 ) {
            newFilters.push( {
                label: 'Tags',
                type: 'select',
                attribute: 'tags',
                values: availableTags
            } );
        }
        // Add recurrence filters if enabled
        if ( showRecurrence ) {
            newFilters.push( {
                label: 'Recurrence',
                type: 'select',
                attribute: 'frequency',
                values: ['Single Day Event', 'Daily', 'Weekly', 'Monthly', 'Yearly']
            } );
        }
        return newFilters;
    }, [showMonthFilter, showYearFilter, showTags, showRecurrence, availableYears, availableTags, monthLabels] );
function handleFilterChangeFromTaxonomy( selectedFilters: string[] ) {
        let newSearchTerm = searchTerm; // Preserve existing search term
        const newSelectedTags: string[] = [];
        let newSelectedMonths: string[] = [];
        let newSelectedYears: string[] = [];
        let newSelectedFrequency = selectedFrequency;
        // Reset all filters first, then re-apply based on selectedFilters
        newSelectedFrequency = '';
        newSearchTerm = '';
        selectedFilters.forEach( filter => {
            const [type, ...valueParts] = filter.split( ':' );
            const value = valueParts.join( ':' );
            if ( type === '_search' ) {
                newSearchTerm = value;
            } else if ( type === 'tag' || type === 'tags' ) {
                newSelectedTags.push( value );
            } else if ( type === 'month' ) {
                // value is the localized month label, map to month number ("01" through "12")
                const monthValue = getValidMonthValue( value );
                if ( monthValue && !newSelectedMonths.includes( monthValue ) ) {
                    newSelectedMonths.push( monthValue );
                }
            } else if ( type === 'year' ) {
                // value is the year string (e.g., "2026")
                if ( value && !newSelectedYears.includes( value ) ) {
                    newSelectedYears.push( value );
                }
            } else if ( type === 'frequency' ) {
                newSelectedFrequency = value;
            }
        } );
        // Remove empty and duplicate values
        const uniqueMonths = Array.from( new Set( newSelectedMonths.filter( Boolean ) ) );
        const uniqueYears = Array.from( new Set( newSelectedYears.filter( Boolean ) ) );
        onFilterChange( {
            searchTerm: newSearchTerm,
            selectedMonths: uniqueMonths,
            selectedYears: uniqueYears,
            selectedTags: newSelectedTags,
            selectedFrequency: newSelectedFrequency
        } );
    }
    const taxonomyProps: TaxonomyFilterProps = {
        totalItems: items.length,
        filters: computedFilters,
        hideSearch: !showSearch,
        filteredCount: filteredCount ?? items.length,
        filterItems: handleFilterChangeFromTaxonomy,
        searchLabel: searchLabel || 'Search events',
        searchPlaceholder: searchPlaceholder || 'Type to search...',
        icons: {
            filter: 'ci-Filter',
            filterClose: 'ci-Close_MD',
            search: <SearchIcon className="text-muted" />
        }
    };
    // Return null only if all filters are disabled
    if ( !showSearch && computedFilters.length === 0 && !showMonthFilter && !showYearFilter && !showTags && !showRecurrence ) return null;
    return (
        <div className="cec-upcoming-events__filters">
            <div className="cec-upcoming-events__filters-row">
                {}
                {( showSearch || computedFilters.length > 0 ) && (
                    <DXTaxonomyFilter
                        {...taxonomyProps}
                        filterLimit={computedFilters.length}
                        onClearFilters={onClearFilters}
                        clearFiltersLabel="Clear Filters"
                        hideClearFilters={activeFilterCount === 0}
                    />
                )}
            </div>
        </div>
    );
};
export default EventFilters;
