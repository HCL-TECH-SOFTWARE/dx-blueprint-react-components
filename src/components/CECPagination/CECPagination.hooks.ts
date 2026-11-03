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

import { useState, useCallback, useEffect } from 'react';
interface UsePaginationProps {
    totalItems: number;
    itemsPerPage: number;
    initialPage?: number;
    initialItemsPerPage?: number;
}
interface UsePaginationReturn {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    startIndex: number;
    endIndex: number;
    setPage: ( page: number ) => void;
    nextPage: () => void;
    previousPage: () => void;
    setItemsPerPage: ( items: number ) => void;
    getPaginationRange: ( maxVisiblePages?: number ) => ( number | '...' )[];
}
export const usePagination = ( {
    totalItems,
    itemsPerPage: initialItemsPerPage = 10,
    initialPage = 1,
}: UsePaginationProps ): UsePaginationReturn => {
    const [currentPage, setCurrentPage] = useState( initialPage );
    const [itemsPerPage, setItemsPerPage] = useState( initialItemsPerPage );
    const totalPages = totalItems > 0 ? Math.ceil( totalItems / itemsPerPage ) : 1;
    // Update currentPage when initialPage prop changes
    useEffect( () => {
        setCurrentPage( initialPage );
    }, [initialPage] );
    const startIndex = ( currentPage - 1 ) * itemsPerPage;
    const endIndex = Math.min( startIndex + itemsPerPage, totalItems );
    const setPage = useCallback( ( page: number ) => {
        setCurrentPage( Math.max( 1, Math.min( page, totalPages ) ) );
    }, [totalPages] );
    const nextPage = useCallback( () => {
        setCurrentPage( prev => Math.min( prev + 1, totalPages ) );
    }, [totalPages] );
    const previousPage = useCallback( () => {
        setCurrentPage( prev => Math.max( prev - 1, 1 ) );
    }, [] );
    const getPaginationRange = useCallback( ( maxVisiblePages: number = 5 ): ( number | '...' )[] => {
        const range: ( number | '...' )[] = [];
        // Responsive max visible pages
        const getResponsiveMaxVisible = () => {
            if ( typeof window !== 'undefined' ) {
                if ( window.innerWidth <= 480 ) return 3;  // Mobile: 3 pages
                if ( window.innerWidth <= 768 ) return 4;  // Tablet: 4 pages
            }
            return maxVisiblePages; // Desktop: configurable
        };
        const responsiveMaxVisible = getResponsiveMaxVisible();
        if ( totalPages <= responsiveMaxVisible + 2 ) {
            // Show all pages if within limit
            for ( let i = 1; i <= totalPages; i++ ) {
                range.push( i );
            }
        } else {
            // Always show first page
            range.push( 1 );
            // Calculate ellipsis threshold based on screen size
            const ellipsisThreshold = responsiveMaxVisible === 3 ? 3 : 4;
            // Show ellipsis after first page if current page is after threshold
            if ( currentPage > ellipsisThreshold ) {
                range.push( '...' );
            }
            // Calculate range around current page
            const sidePages = Math.floor( ( responsiveMaxVisible - 1 ) / 2 );
            let startPage = Math.max( 2, currentPage - sidePages );
            let endPage = Math.min( totalPages - 1, currentPage + sidePages );
            // Adjust if we're near the start or end
            if ( currentPage <= ellipsisThreshold ) {
                startPage = 2;
                endPage = Math.min( responsiveMaxVisible, totalPages - 1 );
            } else if ( currentPage >= totalPages - ellipsisThreshold + 1 ) {
                startPage = Math.max( totalPages - responsiveMaxVisible, 2 );
                endPage = totalPages - 1;
            }
            // Add page numbers around current page
            for ( let i = startPage; i <= endPage; i++ ) {
                // Skip if we already have this page (can happen with first/last page)
                if ( !range.includes( i ) ) {
                    range.push( i );
                }
            }
            // Show ellipsis before last page if there's a gap
            if ( endPage < totalPages - 1 ) {
                range.push( '...' );
            }
            // Always show last page if not already included
            if ( !range.includes( totalPages ) ) {
                range.push( totalPages );
            }
        }
        return range;
    }, [currentPage, totalPages] );
    return {
        currentPage,
        totalPages,
        itemsPerPage,
        startIndex,
        endIndex,
        setPage,
        nextPage,
        previousPage,
        setItemsPerPage: useCallback( ( count: number ) => {
            setItemsPerPage( count );
            setCurrentPage( 1 ); // Reset to first page when items per page changes
        }, [] ),
        getPaginationRange,
    };
};
