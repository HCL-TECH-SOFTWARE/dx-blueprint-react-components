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
import { DefaultVariantProps, CompactVariantProps, BulletsVariantProps } from './CECPagination.types';
import { ExtendableProps } from '../../utilities/extendable';
// UI Element Components
const LeftArrowIcon = ( { className = '' } ) => (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 19L14 16L17 13" stroke="#272833" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const RightArrowIcon = ( { className = '' } ) => (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 13L18 16L15 19" stroke="#272833" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const FirstPageIcon = ( { className = '' } ) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 16L13 12L17 8" stroke="#14181F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 16L7 12L11 8" stroke="#14181F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const LastPageIcon = ( { className = '' } ) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 8L17 12L13 16" stroke="#14181F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 8L11 12L7 16" stroke="#14181F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const DropdownArrowIcon = ( { className = '' } ) => (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 15L12 19L8 15" stroke="#14181F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 9L12 5L16 9" stroke="#14181F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
// Reusable UI Element Functions
export const PaginationButton = ( {
    onClick,
    disabled = false,
    children,
    ariaLabel,
    className = '',
    type = 'button' as const
}: {
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    ariaLabel: string;
    className?: string;
    type?: 'button';
} ) => (
    <button
        className={`cec-pagination__button ${className}`}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        type={type}
    >
        {children}
    </button>
);
export const ItemsPerPageDropdown = ( {
    itemsPerPage,
    onItemsPerPageChange,
    itemsPerPageOptions,
    disabled = false,
    messages = {},
    className = '',
}: {
    itemsPerPage: number;
    onItemsPerPageChange: ( itemsPerPage: number ) => void;
    itemsPerPageOptions: number[];
    disabled?: boolean;
    messages?: {
        itemsPerPage?: string;
        entries?: string;
    };
    className?: string;
} ) => (
    <div className={`cec-pagination__items-per-page ${className}`}>
        <div className="cec-pagination__select-wrapper">
            <select
                name="items-per-page-select"
                value={itemsPerPage}
                onChange={( e ) => onItemsPerPageChange( Number( e.target.value ) )}
                disabled={disabled}
                aria-label={messages.itemsPerPage || 'Items per page'}
                className="cec-pagination__select"
            >
                {itemsPerPageOptions.map( option => (
                    <option key={option} value={option}>
                        {option} {messages.entries || ''}
                    </option>
                ) )}
            </select>
            <DropdownArrowIcon className="cec-pagination__select-arrow" />
        </div>
    </div>
);
export const PageInfo = ( {
    startIndex,
    endIndex,
    totalItems,
    messages = {},
    className = '',
}: {
    startIndex: number;
    endIndex: number;
    totalItems: number;
    messages?: {
        showing?: string;
        of?: string;
        entries?: string;
        to?: string;
    };
    className?: string;
} ) => {
    const displayStart = totalItems === 0 ? 0 : Math.max( startIndex, 1 );
    const displayEnd = totalItems === 0 ? 0 : Math.min( endIndex, totalItems );
    const isSingleItem = displayStart === displayEnd;
    return (
        <div className={`cec-pagination__info ${className}`}>
            {messages.showing || 'Showing'} {displayStart}{!isSingleItem && <> {messages.to || 'to'} {displayEnd}</>} {messages.of || 'of'} {totalItems} {messages.entries || ''}
        </div>
    );
};
export const PageNumbers = ( {
    currentPage,
    totalPages,
    onPageChange,
    disabled = false,
    maxVisiblePages = 5,
    ariaLabels = {},
    className = '',
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: ( page: number ) => void;
    disabled?: boolean;
    maxVisiblePages?: number;
    ariaLabels?: {
        page?: ( page: number ) => string;
    };
    className?: string;
} ) => {
    const getPageNumbers = (): ( number | '...' )[] => {
        const range: ( number | '...' )[] = [];
        // Responsive max visible pages
        const getMaxVisiblePages = () => {
            if ( typeof window !== 'undefined' ) {
                if ( window.innerWidth <= 480 ) return 3;  // Mobile: 3 pages
                if ( window.innerWidth <= 768 ) return 4;  // Tablet: 4 pages
            }
            return maxVisiblePages; // Desktop: configurable
        };
        const responsiveMaxVisible = getMaxVisiblePages();
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
    };
    return (
        <div className={`cec-pagination__pages ${className}`}>
            {getPageNumbers().map( ( page, index ) => (
                <button
                    key={`page-${page}-${index}`}
                    className={`cec-pagination__page ${page === currentPage ? 'active' : ''
                        } ${page === '...' ? 'ellipsis' : ''}`}
                    onClick={() => typeof page === 'number' && page !== currentPage && onPageChange( page )}
                    disabled={page === '...' || disabled}
                    aria-label={
                        page === '...'
                            ? 'More pages'
                            : ( ariaLabels.page?.( page ) || `Page ${page}` )
                    }
                    aria-current={page === currentPage ? 'page' : undefined}
                >
                    {page}
                </button>
            ) )}
        </div>
    );
};
export const Bullets = ( {
    currentPage,
    totalPages,
    onPageChange,
    disabled = false,
    position = 'center',
    ariaLabels = {},
    className = '',
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: ( page: number ) => void;
    disabled?: boolean;
    position?: 'left' | 'center' | 'right';
    ariaLabels?: {
        page?: ( page: number ) => string;
    };
    className?: string;
} ) => {
    let positionClass;
    // In RTL, flip left/right positions
    if ( position === 'left' ) {
        positionClass = 'cec-pagination-bullets--right';
    } else {
        positionClass = `cec-pagination-bullets--${position} ${className}`;
    }
    // Create array of indices in correct order based on direction
    const indices = Array.from( { length: totalPages }, ( _, i ) => i );
    const handleKeyDown = ( e: React.KeyboardEvent<HTMLButtonElement>, index: number ) => {
        if ( e.key === 'Enter' || e.key === ' ' ) {
            e.preventDefault();
            onPageChange( index + 1 );
        } else if ( e.key === 'ArrowLeft' || e.key === 'ArrowRight' ) {
            e.preventDefault();
            e.stopPropagation();
            let nextIndex: number;
            if ( e.key === 'ArrowRight' ) {
                nextIndex = index === totalPages - 1 ? 0 : index + 1;
            } else if ( e.key === 'ArrowLeft' ) {
                nextIndex = index === 0 ? totalPages - 1 : index - 1;
            } else {
                return;
            }
            // Change page and move focus to next bullet
            onPageChange( nextIndex + 1 );
            // Focus the next bullet
            setTimeout( () => {
                const nextBullet = document.querySelector( `[data-bullet-index="${nextIndex}"]` ) as HTMLButtonElement;
                if ( nextBullet ) {
                    nextBullet.focus();
                }
            }, 0 );
        }
    };
    return (
        <div
            className={`cec-pagination-bullets ${positionClass}`}
            role="tablist"
            aria-label="Carousel pagination"
            tabIndex={0}
        >
            {indices.map( ( index ) => (
                <button
                    key={`pagination-${index}`}
                    data-bullet-index={index}
                    tabIndex={index === currentPage - 1 ? 0 : -1}
                    className={`cec-pagination-bullets__bullet ${index === currentPage - 1 ? "active" : ""}`}
                    type="button"
                    onClick={() => onPageChange( index + 1 )}
                    onKeyDown={( e ) => handleKeyDown( e, index )}
                    aria-label={ariaLabels.page?.( index ) || `Go to page ${index + 1}`}
                    aria-current={index === currentPage - 1 ? "true" : undefined}
                    aria-controls={`slide-${index}`}
                    role="button"
                    disabled={disabled}
                />
            ) )}
        </div>
    );
};
// Variant Components using reusable UI elements
/** When `showPagination` is false nothing is rendered, so `className`, `ref` and extra props are not applied. */
export const DefaultVariant = ( {
    currentPage,
    totalPages,
    onPageChange,
    className = '',
    disabled = false,
    dir = 'ltr',
    ariaLabels = {},
    itemsPerPage,
    onItemsPerPageChange,
    itemsPerPageOptions = [3, 6, 12, 24],
    totalItems = 0,
    startIndex = 0,
    endIndex = 0,
    showItemsPerPageDropdown = true,
    showPageInfo = true,
    maxVisiblePages = 5,
    showPagination = true,
    messages = {},
    ref,
    ...rest
}: ExtendableProps<DefaultVariantProps, 'div'> ) => {
    if ( !showPagination ) return null;
    const handlePrevious = () => {
        if ( currentPage > 1 && !disabled ) {
            onPageChange( currentPage - 1 );
        }
    };
    const handleFirst = () => {
        if ( currentPage > 1 && !disabled ) {
            onPageChange( 1 );
        }
    };
    const handleNext = () => {
        if ( currentPage < totalPages && !disabled ) {
            onPageChange( currentPage + 1 );
        }
    };
    const handleLast = () => {
        if ( currentPage < totalPages && !disabled ) {
            onPageChange( totalPages );
        }
    };
    return (
        <div {...rest} ref={ref} className={`cec-pagination-container ${className}`} dir={dir} role="navigation">
            {}
            {showItemsPerPageDropdown && onItemsPerPageChange && itemsPerPage && (
                <div className="cec-pagination__left">
                    <ItemsPerPageDropdown
                        itemsPerPage={itemsPerPage!}
                        onItemsPerPageChange={onItemsPerPageChange!}
                        itemsPerPageOptions={itemsPerPageOptions}
                        disabled={disabled}
                        messages={messages}
                    />
                </div>
            )}
            {}
            {showPageInfo && totalItems > 0 && (
                <div className="cec-pagination__center">
                    <PageInfo
                        startIndex={startIndex}
                        endIndex={endIndex}
                        totalItems={totalItems}
                        messages={messages}
                    />
                </div>
            )}
            {}
            {showPagination && totalPages > 1 && (
                <div className="cec-pagination__right">
                    <div className={`cec-pagination ${className}`}>
                        <PaginationButton
                            onClick={handleFirst}
                            disabled={currentPage === 1 || disabled}
                            ariaLabel={ariaLabels.first || 'First page'}
                        >
                            <FirstPageIcon className="pagination-icon" />
                        </PaginationButton>
                        <PaginationButton
                            onClick={handlePrevious}
                            disabled={currentPage === 1 || disabled}
                            ariaLabel={ariaLabels.previous || messages.previous || 'Previous page'}
                        >
                            <LeftArrowIcon className="pagination-icon" />
                        </PaginationButton>
                        <PageNumbers
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                            disabled={disabled}
                            maxVisiblePages={maxVisiblePages}
                            ariaLabels={ariaLabels}
                        />
                        <PaginationButton
                            onClick={handleNext}
                            disabled={currentPage === totalPages || disabled}
                            ariaLabel={ariaLabels.next || messages.next || 'Next page'}
                        >
                            <RightArrowIcon className="pagination-icon" />
                        </PaginationButton>
                        <PaginationButton
                            onClick={handleLast}
                            disabled={currentPage === totalPages || disabled}
                            ariaLabel={ariaLabels.last || 'Last page'}
                        >
                            <LastPageIcon className="pagination-icon" />
                        </PaginationButton>
                    </div>
                </div>
            )}
        </div>
    );
};
export const CompactVariant = ( {
    currentPage,
    totalPages,
    onPageChange,
    className = '',
    disabled = false,
    dir = 'ltr',
    ariaLabels = {},
    messages = {},
    ref,
    ...rest
}: ExtendableProps<CompactVariantProps, 'div'> ) => {
    const handlePrevious = () => {
        if ( currentPage > 1 && !disabled ) {
            onPageChange( currentPage - 1 );
        }
    };
    const handleNext = () => {
        if ( currentPage < totalPages && !disabled ) {
            onPageChange( currentPage + 1 );
        }
    };
    return (
        <div {...rest} ref={ref} className={`cec-pagination-compact ${className}`} dir={dir} role="navigation">
            <PaginationButton
                onClick={handlePrevious}
                disabled={currentPage === 1 || disabled}
                ariaLabel={ariaLabels.previous || messages.previous || 'Previous page'}
                className="cec-pagination-compact__button"
            >
                <LeftArrowIcon className="pagination-icon" />
            </PaginationButton>
            <span className="cec-pagination-compact__info">
                {currentPage} / {totalPages}
            </span>
            <PaginationButton
                onClick={handleNext}
                disabled={currentPage === totalPages || disabled}
                ariaLabel={ariaLabels.next || messages.next || 'Next page'}
                className="cec-pagination-compact__button"
            >
                <RightArrowIcon className="pagination-icon" />
            </PaginationButton>
        </div>
    );
};
export const BulletsVariant = ( {
    currentPage,
    totalPages,
    onPageChange,
    className = '',
    disabled = false,
    dir = 'ltr',
    ariaLabels = {},
    position = 'center',
    ref,
    ...rest
}: ExtendableProps<BulletsVariantProps, 'div'> ) => {
    return (
        <div {...rest} ref={ref} className={`cec-pagination-container ${className}`} dir={dir} role="navigation">
            <Bullets
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                disabled={disabled}
                position={position}
                ariaLabels={ariaLabels}
                className={className}
            />
        </div>
    );
};
