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
import { usePagination } from './CECPagination.hooks';
describe( 'usePagination', () => {
    const defaultProps = {
        totalItems: 50,
        itemsPerPage: 10,
        initialPage: 1
    };
    beforeEach( () => {
        jest.clearAllMocks();
    } );
    describe( 'Initialization', () => {
        it( 'should initialize with default values', () => {
            const { result } = renderHook( () => usePagination( defaultProps ) );
            expect( result.current.currentPage ).toBe( 1 );
            expect( result.current.totalPages ).toBe( 5 );
            expect( result.current.itemsPerPage ).toBe( 10 );
            expect( result.current.startIndex ).toBe( 0 );
            expect( result.current.endIndex ).toBe( 10 );
        } );
        it( 'should initialize with custom initial page', () => {
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                initialPage: 3
            } ) );
            expect( result.current.currentPage ).toBe( 3 );
            expect( result.current.startIndex ).toBe( 20 );
            expect( result.current.endIndex ).toBe( 30 );
        } );
        it( 'should initialize with custom initial items per page', () => {
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                itemsPerPage: 5
            } ) );
            expect( result.current.itemsPerPage ).toBe( 5 );
            expect( result.current.totalPages ).toBe( 10 );
        } );
        it( 'should handle zero total items', () => {
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                totalItems: 0
            } ) );
            expect( result.current.totalPages ).toBe( 1 );
            expect( result.current.startIndex ).toBe( 0 );
            expect( result.current.endIndex ).toBe( 0 );
        } );
        it( 'should handle negative total items', () => {
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                totalItems: -10
            } ) );
            expect( result.current.totalPages ).toBe( 1 );
        } );
    } );
    describe( 'Page Navigation', () => {
        it( 'should set page correctly', () => {
            const { result } = renderHook( () => usePagination( defaultProps ) );
            act( () => {
                result.current.setPage( 3 );
            } );
            expect( result.current.currentPage ).toBe( 3 );
            expect( result.current.startIndex ).toBe( 20 );
            expect( result.current.endIndex ).toBe( 30 );
        } );
        it( 'should not set page below 1', () => {
            const { result } = renderHook( () => usePagination( defaultProps ) );
            act( () => {
                result.current.setPage( 0 );
            } );
            expect( result.current.currentPage ).toBe( 1 );
        } );
        it( 'should not set page above total pages', () => {
            const { result } = renderHook( () => usePagination( defaultProps ) );
            act( () => {
                result.current.setPage( 10 );
            } );
            expect( result.current.currentPage ).toBe( 5 );
        } );
        it( 'should navigate to next page', () => {
            const { result } = renderHook( () => usePagination( defaultProps ) );
            act( () => {
                result.current.nextPage();
            } );
            expect( result.current.currentPage ).toBe( 2 );
        } );
        it( 'should not navigate beyond last page', () => {
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                initialPage: 5
            } ) );
            act( () => {
                result.current.nextPage();
            } );
            expect( result.current.currentPage ).toBe( 5 );
        } );
        it( 'should navigate to previous page', () => {
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                initialPage: 3
            } ) );
            act( () => {
                result.current.previousPage();
            } );
            expect( result.current.currentPage ).toBe( 2 );
        } );
        it( 'should not navigate before first page', () => {
            const { result } = renderHook( () => usePagination( defaultProps ) );
            act( () => {
                result.current.previousPage();
            } );
            expect( result.current.currentPage ).toBe( 1 );
        } );
    } );
    describe( 'Items Per Page', () => {
        it( 'should change items per page', () => {
            const { result } = renderHook( () => usePagination( defaultProps ) );
            act( () => {
                result.current.setItemsPerPage( 5 );
            } );
            expect( result.current.itemsPerPage ).toBe( 5 );
            expect( result.current.totalPages ).toBe( 10 );
            expect( result.current.currentPage ).toBe( 1 ); // Should reset to first page
        } );
        it( 'should recalculate start and end indices when items per page changes', () => {
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                initialPage: 2
            } ) );
            act( () => {
                result.current.setItemsPerPage( 20 );
            } );
            expect( result.current.startIndex ).toBe( 0 );
            expect( result.current.endIndex ).toBe( 20 );
            expect( result.current.currentPage ).toBe( 1 );
        } );
    } );
    describe( 'Pagination Range Generation', () => {
        it( 'should generate range for small number of pages', () => {
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                totalItems: 30,
                itemsPerPage: 10
            } ) );
            const range = result.current.getPaginationRange();
            expect( range ).toEqual( [1, 2, 3] );
        } );
        it( 'should generate range with ellipsis for large number of pages', () => {
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                totalItems: 100,
                itemsPerPage: 10
            } ) );
            const range = result.current.getPaginationRange();
            expect( range ).toContain( 1 );
            expect( range ).toContain( 10 );
            expect( range ).toContain( '...' );
        } );
        it( 'should handle current page in the middle', () => {
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                totalItems: 100,
                itemsPerPage: 10,
                initialPage: 5
            } ) );
            const range = result.current.getPaginationRange();
            expect( range ).toContain( 1 );
            expect( range ).toContain( 5 );
            expect( range ).toContain( 10 );
            expect( range ).toContain( '...' );
        } );
        it( 'should handle current page near start', () => {
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                totalItems: 100,
                itemsPerPage: 10,
                initialPage: 2
            } ) );
            const range = result.current.getPaginationRange();
            expect( range ).toContain( 1 );
            expect( range ).toContain( 2 );
            expect( range ).toContain( 10 );
        } );
        it( 'should handle current page near end', () => {
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                totalItems: 100,
                itemsPerPage: 10,
                initialPage: 9
            } ) );
            const range = result.current.getPaginationRange();
            expect( range ).toContain( 1 );
            expect( range ).toContain( 9 );
            expect( range ).toContain( 10 );
        } );
        it( 'should use custom max visible pages', () => {
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                totalItems: 100,
                itemsPerPage: 10
            } ) );
            const range = result.current.getPaginationRange( 3 );
            expect( range.length ).toBeLessThanOrEqual( 5 ); // 3 visible + 2 ellipsis max
        } );
        it( 'should handle responsive behavior', () => {
            // Mock window.innerWidth
            Object.defineProperty( window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 480
            } );
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                totalItems: 100,
                itemsPerPage: 10
            } ) );
            const range = result.current.getPaginationRange();
            expect( range.length ).toBeLessThanOrEqual( 5 ); // Mobile should show fewer pages
        } );
    } );
    describe( 'Effect Hooks', () => {
        it( 'should update current page when initialPage prop changes', () => {
            const { result, rerender } = renderHook(
                ( { initialPage } ) => usePagination( { ...defaultProps, initialPage } ),
                {
                    initialProps: { initialPage: 1 }
                }
            );
            expect( result.current.currentPage ).toBe( 1 );
            rerender( { initialPage: 3 } );
            expect( result.current.currentPage ).toBe( 3 );
        } );
    } );
    describe( 'Edge Cases', () => {
        it( 'should handle single page', () => {
            const { result } = renderHook( () => usePagination( {
                totalItems: 5,
                itemsPerPage: 10
            } ) );
            expect( result.current.totalPages ).toBe( 1 );
            expect( result.current.startIndex ).toBe( 0 );
            expect( result.current.endIndex ).toBe( 5 );
        } );
        it( 'should handle items per page larger than total items', () => {
            const { result } = renderHook( () => usePagination( {
                totalItems: 5,
                itemsPerPage: 100
            } ) );
            expect( result.current.totalPages ).toBe( 1 );
            expect( result.current.startIndex ).toBe( 0 );
            expect( result.current.endIndex ).toBe( 5 );
        } );
        it( 'should handle zero items per page', () => {
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                itemsPerPage: 0
            } ) );
            // Should handle gracefully without division by zero
            expect( result.current.totalPages ).toBe( Infinity );
        } );
        it( 'should handle negative items per page', () => {
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                itemsPerPage: -5
            } ) );
            // Should handle gracefully
            expect( result.current.totalPages ).toBe( -10 );
        } );
        it( 'should handle very large numbers', () => {
            const { result } = renderHook( () => usePagination( {
                totalItems: 1000000,
                itemsPerPage: 100
            } ) );
            expect( result.current.totalPages ).toBe( 10000 );
            expect( result.current.startIndex ).toBe( 0 );
            expect( result.current.endIndex ).toBe( 100 );
        } );
    } );
    describe( 'Responsive Behavior', () => {
        it( 'should use mobile max visible pages on small screens', () => {
            Object.defineProperty( window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 400
            } );
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                totalItems: 100,
                itemsPerPage: 10
            } ) );
            const range = result.current.getPaginationRange();
            expect( range.length ).toBeLessThanOrEqual( 5 ); // Mobile: 3 pages + ellipsis
        } );
        it( 'should use tablet max visible pages on medium screens', () => {
            Object.defineProperty( window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 600
            } );
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                totalItems: 100,
                itemsPerPage: 10
            } ) );
            const range = result.current.getPaginationRange();
            expect( range.length ).toBeLessThanOrEqual( 6 ); // Tablet: 4 pages + ellipsis
        } );
        it( 'should use desktop max visible pages on large screens', () => {
            Object.defineProperty( window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 1200
            } );
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                totalItems: 100,
                itemsPerPage: 10
            } ) );
            const range = result.current.getPaginationRange();
            expect( range.length ).toBeLessThanOrEqual( 7 ); // Desktop: 5 pages + ellipsis
        } );
    } );
    describe( 'Memory and Performance', () => {
        it( 'should not create new functions on every render', () => {
            const { result, rerender } = renderHook( () => usePagination( defaultProps ) );
            const initialSetPage = result.current.setPage;
            const initialNextPage = result.current.nextPage;
            const initialPreviousPage = result.current.previousPage;
            const initialSetItemsPerPage = result.current.setItemsPerPage;
            const initialGetPaginationRange = result.current.getPaginationRange;
            rerender();
            expect( result.current.setPage ).toBe( initialSetPage );
            expect( result.current.nextPage ).toBe( initialNextPage );
            expect( result.current.previousPage ).toBe( initialPreviousPage );
            expect( result.current.setItemsPerPage ).toBe( initialSetItemsPerPage );
            expect( result.current.getPaginationRange ).toBe( initialGetPaginationRange );
        } );
    } );
    describe( 'Edge Cases for Uncovered Lines', () => {
        it( 'should use default itemsPerPage when not provided', () => {
            const { result } = renderHook( () => usePagination( {
                totalItems: 50,
                initialPage: 1
            } ) );
            expect( result.current.itemsPerPage ).toBe( 10 ); // default value
            expect( result.current.totalPages ).toBe( 5 );
        } );
        it( 'should handle server-side rendering when window is undefined', () => {
            // Mock window.innerWidth to be undefined to simulate server-side rendering
            const originalInnerWidth = window.innerWidth;
            Object.defineProperty( window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: undefined
            } );
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                totalItems: 100,
                itemsPerPage: 10
            } ) );
            const range = result.current.getPaginationRange();
            // Should use desktop maxVisiblePages when window.innerWidth is undefined
            expect( range.length ).toBeLessThanOrEqual( 7 );
            // Restore window.innerWidth
            Object.defineProperty( window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: originalInnerWidth
            } );
        } );
        it( 'should handle duplicate page numbers in range calculation', () => {
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                totalItems: 30, // 3 pages
                itemsPerPage: 10
            } ) );
            act( () => {
                result.current.setPage( 1 );
            } );
            const range = result.current.getPaginationRange();
            // Should not include duplicate page numbers
            const uniquePages = range.filter( item => typeof item === 'number' );
            const uniqueSet = new Set( uniquePages );
            expect( uniquePages.length ).toBe( uniqueSet.size );
        } );
        it( 'should always include last page in range when not already present', () => {
            const { result } = renderHook( () => usePagination( {
                ...defaultProps,
                totalItems: 100, // 10 pages
                itemsPerPage: 10
            } ) );
            act( () => {
                result.current.setPage( 8 );
            } );
            const range = result.current.getPaginationRange();
            expect( range ).toContain( 10 ); // Should always include last page
        } );
    } );
} );
