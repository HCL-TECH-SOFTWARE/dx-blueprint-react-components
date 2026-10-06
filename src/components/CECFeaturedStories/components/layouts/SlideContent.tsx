import React from 'react';
import { getLinkTarget } from '../../../../utilities';
import { SlideContentProps } from './types';
import { getTextColor, getTextShadow, createMarkup } from './utils';
// Removed DXButton import as we're using a styled link instead
import { DEFAULT_TEXT_COLOR_DARK, DEFAULT_TEXT_COLOR_LIGHT } from "../../constants";
// Global map to track opened windows by URL hash
const openedWindows = new Map<string, Window>();
// Helper function to open or reuse a window for a given URL
const openOrReuseWindow = ( url: string, target?: string ): void => {
    // Create a simple hash of the URL for consistent target names
    let hash = 0;
    for ( let i = 0; i < url.length; i++ ) {
        const char = url.charCodeAt( i );
        hash = ( ( hash << 5 ) - hash ) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    const urlKey = Math.abs( hash ).toString();
    const windowTarget = `cec_${urlKey}`;
    // Check if we already have a window for this URL
    const existingWindow = openedWindows.get( urlKey );
    if ( existingWindow && !existingWindow.closed ) {
        // Focus the existing window
        existingWindow.focus();
        // Also try to navigate to the URL in case it's different
        try {
            existingWindow.location.href = url;
        } catch ( e ) {
            // Cannot navigate existing window, open new one
            const newWindow = window.open( url, windowTarget );
            if ( newWindow ) {
                openedWindows.set( urlKey, newWindow );
                newWindow.focus();
            }
        }
    } else {
        // Open a new window
        const newWindow = window.open( url, windowTarget );
        if ( newWindow ) {
            openedWindows.set( urlKey, newWindow );
            newWindow.focus();
            // Clean up when window is closed
            const checkClosed = setInterval( () => {
                if ( newWindow.closed ) {
                    openedWindows.delete( urlKey );
                    clearInterval( checkClosed );
                }
            }, 1000 );
        }
    }
};
const SlideContent: React.FC<SlideContentProps> = ( {
    item,
    textColor,
    mode = 'light',
    isImageLeft = false,
    isActive
} ) => {
    const getTextStyle = ( type: 'title' | 'excerpt' ): React.CSSProperties => {
        // Base styles for both title and excerpt
        const baseStyles: React.CSSProperties = {
            color: textColor || 'inherit',
            textShadow: getTextShadow( type, mode, isImageLeft ) ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.7)',
            width: '100%',
            maxWidth: '100%',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box' as const,
            // Ensure proper text wrapping
            whiteSpace: 'normal',
            // Ensure proper text overflow handling
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            // Use flex for better compatibility
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical'
        };
        if ( type === 'excerpt' ) {
            return {
                ...baseStyles,
                // Typography
                fontSize: '1.125rem',
                lineHeight: '1.5', // 27px for 18px font
                // Multi-line truncation with cross-browser support
                WebkitLineClamp: 4,
                lineClamp: 4,
                // Height calculation for 4 lines (kept intentional to stabilize layout)
                maxHeight: '6em',
                // Ensure consistent rendering
                marginBottom: '1.5rem'
            };
        }
        // Title: allow up to 2 lines, no fixed min-height (collapses when 1 line)
        return {
            ...baseStyles,
            fontSize: '2rem',
            lineHeight: '1.3',
            fontWeight: 600,
            WebkitLineClamp: 2,
            lineClamp: 2,
            // Cap height at 2 lines but do NOT reserve 2 lines when it's shorter
            maxHeight: '2.6em', // 2 * 1.3em
            // No minHeight -> removes the extra gap for single-line headlines
            marginBottom: '0.5rem'
        };
    };
    const handleLinkClick = ( e: React.MouseEvent<HTMLAnchorElement>, url?: string, target?: string ) => {
        if ( !url ) return;
        e.preventDefault();
        if ( !isActive ) {
            e.preventDefault();
            return;
        }
        if ( target === '_blank' ) {
            openOrReuseWindow( url, target );
        } else {
            window.location.href = url;
        }
    };
    return (
        <div
            className="cecFeaturedStories__slideContent"
            style={{ color: textColor || ( isImageLeft ? DEFAULT_TEXT_COLOR_DARK : DEFAULT_TEXT_COLOR_LIGHT ), pointerEvents: isActive ? undefined : 'none' }}
            aria-hidden={!isActive}
            data-slide-active={isActive}
        >
            {item?.link?.label && (
                <h2
                    className="cecFeaturedStories__title"
                    style={getTextStyle( 'title' )}
                    data-text-color={getTextColor( 'title', textColor, mode, isImageLeft )}
                    tabIndex={isActive ? undefined : -1}
                    aria-disabled={!isActive}
                >
                    <a
                        href={item?.link?.url || "#"}
                        target={getLinkTarget( item?.link?.target )}
                        className="cecFeaturedStories__titleLink"
                        title={item?.link?.label}
                        style={getTextStyle( 'title' )}
                        onClick={( e ) => handleLinkClick( e, item?.link?.url, item?.link?.target )}
                        tabIndex={isActive ? undefined : -1}
                        aria-disabled={!isActive}
                        dangerouslySetInnerHTML={createMarkup( item?.link?.label )}
                    >
                    </a>
                </h2>
            )}
            {item?.summary && (
                <div
                    className="cecFeaturedStories__excerpt"
                    style={getTextStyle( 'excerpt' )}
                    data-testid="story-excerpt"
                    dangerouslySetInnerHTML={createMarkup( item?.summary )}
                />
            )}
            {}
            {item?.link?.url && item?.link?.label && (
                <div className="cecFeaturedStories__bottomContent" style={{ paddingTop: '0.5rem' }}>
                    <div className="cecFeaturedStories__link">
                        <a
                            href={item?.link?.url}
                            target={getLinkTarget( item?.link?.target )}
                            onClick={( e ) => handleLinkClick( e, item?.link?.url, item?.link?.target )}
                            aria-label={`Read more about ${item?.link?.label}`}
                            data-testid="read-more-button"
                            className="cecFeaturedStories__readMoreLink"
                            tabIndex={isActive ? undefined : -1}
                            aria-disabled={!isActive}
                        >
                            Read More
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};
export default SlideContent;
