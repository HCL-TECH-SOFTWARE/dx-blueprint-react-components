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

import React, { useMemo, useEffect } from 'react';
import { PaginationProps, DEFAULT_MESSAGES } from './CECPagination.types';
import { DefaultVariant, CompactVariant, BulletsVariant } from './CECPagination.variants';
import { ExtendableProps } from '../../utilities/extendable';
import './CECPagination.scss';
/** When `variant` renders nothing (the default variant with `showPagination={false}`), `className`, `ref` and extra props are not applied. */
const CECPagination = ( {
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    onItemsPerPageChange,
    itemsPerPageOptions = [3, 6, 12, 24],
    totalItems = 0,
    startIndex = 0,
    endIndex = 0,
    variant = 'default',
    showItemsPerPageDropdown = true,
    showPageInfo = true,
    maxVisiblePages = 5,
    showPagination = true,
    ariaLabels = {},
    className = '',
    size = 'lg',
    disabled = false,
    dir = 'ltr',
    messages = {},
    locale,
    ref,
    ...rest
}: ExtendableProps<PaginationProps, 'div'> ) => {
    // Calculate totalPages internally when totalItems and itemsPerPage are provided
    const calculatedTotalPages = useMemo( () => {
        if ( totalItems > 0 && itemsPerPage && itemsPerPage > 0 ) {
            return Math.ceil( totalItems / itemsPerPage );
        }
        return totalPages;
    }, [totalItems, itemsPerPage, totalPages] );
    // Calculate startIndex and endIndex for display
    const displayStartIndex = useMemo( () => {
        if ( totalItems > 0 && itemsPerPage && itemsPerPage > 0 ) {
            return ( currentPage - 1 ) * itemsPerPage + 1;
        }
        return 0;
    }, [totalItems, itemsPerPage, currentPage] );
    const displayEndIndex = useMemo( () => {
        if ( totalItems > 0 && itemsPerPage && itemsPerPage > 0 ) {
            return Math.min( currentPage * itemsPerPage, totalItems );
        }
        return 0;
    }, [totalItems, itemsPerPage, currentPage] );
    // Reset to page 1 when itemsPerPage or totalItems changes and current page would be out of bounds
    useEffect( () => {
        if ( itemsPerPage > 0 && calculatedTotalPages > 0 && currentPage > calculatedTotalPages ) {
            onPageChange( 1 );
        }
    }, [itemsPerPage, calculatedTotalPages, currentPage, onPageChange] );
    // Default aria labels for accessibility
    const defaultAriaLabels = {
        first: 'First page',
        previous: 'Previous page',
        next: 'Next page',
        last: 'Last page',
        page: ( page: number ) => `Page ${page}`,
        itemsPerPage: 'Items per page',
        showing: 'Showing',
        of: 'of',
        ...ariaLabels,
    };
    // Filter items-per-page options: keep options that create multiple pages,
    // plus the smallest option that fits all items on one page
    const filteredItemsPerPageOptions = useMemo( () => {
        if ( totalItems <= 0 ) return itemsPerPageOptions;
        const belowTotal = itemsPerPageOptions.filter( ( option ) => option < totalItems );
        const firstFitAll = itemsPerPageOptions.find( ( option ) => option >= totalItems );
        return firstFitAll !== undefined ? [...belowTotal, firstFitAll] : belowTotal;
    }, [totalItems, itemsPerPageOptions] );
    // Common props for all variants
    const commonProps = {
        currentPage,
        totalPages: calculatedTotalPages,
        onPageChange,
        className: `${className} cec-pagination--${size}`,
        disabled,
        dir,
        ariaLabels: defaultAriaLabels,
        startIndex: displayStartIndex,
        endIndex: displayEndIndex,
    };
    // Render based on variant
    switch ( variant ) {
        case 'compact':
            return (
                <CompactVariant
                    {...rest}
                    ref={ref}
                    {...commonProps}
                    messages={{
                        previous: DEFAULT_MESSAGES.previous,
                        next: DEFAULT_MESSAGES.next,
                    }}
                />
            );
        case 'bullets':
            return <BulletsVariant {...rest} ref={ref} {...commonProps} />;
        case 'default':
        default:
            return (
                <DefaultVariant
                    {...rest}
                    ref={ref}
                    {...commonProps}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    itemsPerPageOptions={filteredItemsPerPageOptions}
                    totalItems={totalItems}
                    showItemsPerPageDropdown={showItemsPerPageDropdown && filteredItemsPerPageOptions.length > 1}
                    showPageInfo={showPageInfo}
                    showPagination={showPagination}
                    maxVisiblePages={maxVisiblePages}
                    messages={DEFAULT_MESSAGES}
                />
            );
    }
};
export default CECPagination;
