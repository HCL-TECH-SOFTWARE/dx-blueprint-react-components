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

import { BasicComponent } from "../../utilities/BasicComponent/BasicComponent";
import { CECEventProps, CECEventData } from "../CECEvent/CECEvent.types";
import type { FilteredEventData } from "./hooks/useEventFilters";
export type VariantType = 'featured' | 'river' | 'featured-compact';
export interface CECUpcomingEventsProps extends Omit<BasicComponent, keyof CECEventProps>, Omit<CECEventProps, 'event'> {
    items: CECEventData[];
    onEventClick?: ( event: CECEventData ) => void;
    variant?: VariantType;
    title?: string;
    showSearch?: boolean;
    showFilters?: boolean;
    showMonthFilter?: boolean;
    showYearFilter?: boolean;
    showTagsFilter?: boolean;
    showRecurrenceFilter?: boolean;
    onFilterChange?: ( filters: EventFilters ) => void;
    itemsPerPage?: number;
    showPagination?: boolean;
    onPageChange?: ( page: number ) => void;
    externalCurrentPage?: number;
    itemsPerPageOptions?: number[];
    showItemsPerPageDropdown?: boolean;
    onItemsPerPageChange?: ( itemsPerPage: number ) => void;
    paginationProps?: {
        sets: string[];
        active: number;
        activeSet: number;
    };
    style?: React.CSSProperties;
    icons?: Record<string, string>;
}
export interface EventFilters {
    searchTerm: string;
    selectedMonths: string[];  // Month numbers only: ["01", "02", ...]
    selectedYears: string[];   // Year strings: ["2026", "2027", ...]
    selectedTags: string[];
    selectedFrequency?: string;
}
export interface UseEventFiltersReturn {
    filters: EventFilters;
    setFilters: ( filters: EventFilters ) => void;
    filteredEvents: FilteredEventData[];
    availableMonths: string[];  // All 12 months: ["01", "02", ..., "12"]
    availableYears: string[];   // Years from events: ["2026", "2027", ...]
    availableTags: string[];
    handleFilterChange: ( filters: EventFilters ) => void;
    clearFilters: () => void;
    activeFilterCount: number;
}
