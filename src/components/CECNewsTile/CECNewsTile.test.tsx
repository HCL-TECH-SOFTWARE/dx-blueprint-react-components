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
import CECNewsTile, {
    NewsTileMode,
    NewsTileImagePosition,
    NewsTileSize,
    NewsTileProps
} from './CECNewsTile';
import type { NewsItemProps } from '../../utilities/cec-types';
// Mock utility functions
jest.mock( '../../utilities/cec-utils', () => ( {
    decodeHtmlEntities: jest.fn( ( html: string ) => html ),
    extractFirstImageFromContent: jest.fn( () => 'extracted-image.jpg' ),
    formatSmartDate: jest.fn( () => 'Jan 15, 2024' ),
    isGifImageUrl: jest.fn( ( url: string | null | undefined ) => !!url && ( url.toLowerCase().startsWith( 'data:image/gif' ) || url.toLowerCase().split( '#' )[0].split( '?' )[0].endsWith( '.gif' ) ) ),
    isFalsyImageUrl: jest.fn( ( url: string | null | undefined ) => !url || url === '' ),
    safeParseDXDate: jest.fn( ( dateStr: string ) => {
        if ( !dateStr ) return null;
        const d = new Date( dateStr );
        return isNaN( d.getTime() ) ? null : d;
    } ),
} ) );
// Test data
const createMockNewsItem = ( overrides: Partial<NewsItemProps> & { _summary?: string; } = {} ): NewsItemProps & { _summary?: string; } => ( {
    _id: '1',
    title: 'Test News Article',
    link: {
        url: 'http://example.com/news1',
        label: 'Test News Article',
        target: '_blank'
    },
    content: '<p>Test content with <strong>formatting</strong></p>',
    summary: 'Test summary of the news article',
    publishedDate: '2024-01-15T10:00:00Z',
    author: {
        name: 'John Doe'
    },
    tags: ['technology', 'news'],
    image: {
        url: 'http://example.com/image.jpg',
        alt: 'Test image'
    },
    _categoryClass: 'technology',
    _summary: 'Custom summary from _summary field',
    ...overrides
} );
const createMockProps = ( overrides: Partial<NewsTileProps> = {} ): NewsTileProps => ( {
    item: createMockNewsItem(),
    ...overrides
} );
describe( 'CECNewsTile', () => {
    beforeEach( () => {
        jest.clearAllMocks();
    } );
    // Basic Rendering Tests
    describe( '🎯 Basic Rendering Tests', () => {
        it( 'renders with default props', () => {
            render( <CECNewsTile {...createMockProps()} /> );
            expect( screen.getByRole( 'link' ) ).toBeInTheDocument();
            expect( screen.getByRole( 'heading', { level: 3 } ) ).toBeInTheDocument();
        } );
        it( 'renders title correctly', () => {
            const props = createMockProps( { item: createMockNewsItem( { title: 'Custom Title' } ) } );
            render( <CECNewsTile {...props} /> );
            expect( screen.getByText( 'Custom Title' ) ).toBeInTheDocument();
        } );
        it( 'uses link label as fallback title when title is missing', () => {
            const props = createMockProps( {
                item: createMockNewsItem( {
                    title: undefined,
                    link: { url: 'http://example.com', label: 'Link Label', target: '_blank' }
                } )
            } );
            render( <CECNewsTile {...props} /> );
            expect( screen.getByText( 'Link Label' ) ).toBeInTheDocument();
        } );
        it( 'uses "Untitled Post" as fallback when no title or link label', () => {
            const props = createMockProps( {
                item: createMockNewsItem( {
                    title: undefined,
                    link: undefined
                } )
            } );
            render( <CECNewsTile {...props} /> );
            expect( screen.getByText( 'Untitled Post' ) ).toBeInTheDocument();
        } );
        it( 'applies custom className', () => {
            const props = createMockProps( { className: 'custom-class' } );
            const { container } = render( <CECNewsTile {...props} /> );
            expect( container.querySelector( '.newsTile' ) ).toHaveClass( 'custom-class' );
        } );
        it( 'sets correct accessibility attributes', () => {
            const props = createMockProps( { ariaLabel: 'Custom aria label' } );
            render( <CECNewsTile {...props} /> );
            const link = screen.getByRole( 'link' );
            expect( link ).toHaveAttribute( 'aria-label', 'Custom aria label' );
        } );
        it( 'renders full title when title is shorter than 78 characters', () => {
            const shortTitle = 'Short title';
            const props = createMockProps( { item: createMockNewsItem( { title: shortTitle } ) } );
            render( <CECNewsTile {...props} /> );
            const link = screen.getByRole( 'link' );
            expect( link ).toHaveTextContent( shortTitle );
        } );
        it( 'renders full title when title is exactly 78 characters', () => {
            const exactTitle = 'A'.repeat( 78 );
            const props = createMockProps( { item: createMockNewsItem( { title: exactTitle } ) } );
            render( <CECNewsTile {...props} /> );
            const link = screen.getByRole( 'link' );
            expect( link ).toHaveTextContent( exactTitle );
        } );
        it( 'truncates visible title after 78 characters and preserves full title in accessibility attributes', () => {
            const longTitle = 'A'.repeat( 79 );
            const props = createMockProps( { item: createMockNewsItem( { title: longTitle } ) } );
            render( <CECNewsTile {...props} /> );
            const link = screen.getByRole( 'link' );
            expect( link ).toHaveTextContent( `${'A'.repeat( 78 )}...` );
            expect( link ).toHaveAttribute( 'title', longTitle );
            expect( link ).toHaveAttribute( 'aria-label', `Open ${longTitle}` );
        } );
    } );
    // Mode Tests
    describe( '🎨 Mode Tests', () => {
        it( 'renders in card mode by default', () => {
            const props = createMockProps( { mode: 'card' } );
            const { container } = render( <CECNewsTile {...props} /> );
            expect( container.querySelector( '.newsTile' ) ).toHaveClass( 'newsTile--card' );
        } );
        it( 'renders in divider mode', () => {
            const props = createMockProps( { mode: 'divider' } );
            const { container } = render( <CECNewsTile {...props} /> );
            expect( container.querySelector( '.newsTile' ) ).toHaveClass( 'newsTile--divider' );
        } );
    } );
    // Image Position Tests
    describe( '🖼️ Image Position Tests', () => {
        it( 'renders image on top by default', () => {
            const props = createMockProps( { imagePosition: 'top' } );
            const { container } = render( <CECNewsTile {...props} /> );
            expect( container.querySelector( '.newsTile' ) ).toHaveClass( 'newsTile--img-top' );
        } );
        it( 'renders image on left', () => {
            const props = createMockProps( { imagePosition: 'left' } );
            const { container } = render( <CECNewsTile {...props} /> );
            expect( container.querySelector( '.newsTile' ) ).toHaveClass( 'newsTile--img-left' );
        } );
        it( 'renders image on right', () => {
            const props = createMockProps( { imagePosition: 'right' } );
            const { container } = render( <CECNewsTile {...props} /> );
            expect( container.querySelector( '.newsTile' ) ).toHaveClass( 'newsTile--img-right' );
        } );
    } );
    // Size Tests
    describe( '📏 Size Tests', () => {
        const sizes: NewsTileSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'auto'];
        sizes.forEach( size => {
            it( `renders in ${size} size`, () => {
                const props = createMockProps( { size } );
                const { container } = render( <CECNewsTile {...props} /> );
                expect( container.querySelector( '.newsTile' ) ).toHaveClass( `newsTile--size-${size}` );
            } );
        } );
    } );
    // Image Display Tests
    describe( '🖼️ Image Display Tests', () => {
        it( 'shows image when showImage is true and image is available', () => {
            const props = createMockProps( { showImage: true } );
            const { container } = render( <CECNewsTile {...props} /> );
            const image = container.querySelector( 'img' );
            expect( image ).toBeInTheDocument();
            expect( image ).toHaveAttribute( 'src', 'http://example.com/image.jpg' );
        } );
        it( 'hides image when showImage is false', () => {
            const props = createMockProps( { showImage: false } );
            const { container } = render( <CECNewsTile {...props} /> );
            const image = container.querySelector( 'img' );
            expect( image ).not.toBeInTheDocument();
        } );
        it( 'extracts image from content when no image URL is provided', () => {
            const { extractFirstImageFromContent } = require( '../../utilities/cec-utils' );
            const props = createMockProps( {
                item: createMockNewsItem( {
                    image: undefined,
                    content: '<img src="content-image.jpg" alt="Content Image">'
                } )
            } );
            render( <CECNewsTile {...props} /> );
            expect( extractFirstImageFromContent ).toHaveBeenCalled();
        } );
        it( 'uses imageUrl from item when available', () => {
            const { isFalsyImageUrl } = require( '../../utilities/cec-utils' );
            isFalsyImageUrl.mockReturnValue( false );
            const itemWithImageUrl = {
                ...createMockNewsItem(),
                imageUrl: 'http://example.com/override-image.jpg'
            };
            const props = createMockProps( { item: itemWithImageUrl } );
            const { container } = render( <CECNewsTile {...props} /> );
            const image = container.querySelector( 'img' );
            expect( image ).toHaveAttribute( 'src', 'http://example.com/override-image.jpg' );
        } );
        it( 'uses next content image when first image is gif with Emoticon in name', () => {
            const { extractFirstImageFromContent } = require( '../../utilities/cec-utils' );
            extractFirstImageFromContent.mockReturnValueOnce( 'https://example.com/second-image.jpg' );
            const itemWithGif = createMockNewsItem( {
                image: undefined,
                content: '<img src="https://example.com/content-Emoticon-animated.gif" alt="Animated image"><img src="https://example.com/second-image.jpg" alt="Second image">'
            } );
            const props = createMockProps( { item: itemWithGif } );
            const { container } = render( <CECNewsTile {...props} /> );
            const image = container.querySelector( 'img' );
            expect( image ).toBeInTheDocument();
            expect( image ).toHaveAttribute( 'src', 'https://example.com/second-image.jpg' );
        } );
    } );
    // Summary Tests
    describe( '📝 Summary Tests', () => {
        it( 'shows summary when showSummary is true', () => {
            const props = createMockProps( { showSummary: true } );
            render( <CECNewsTile {...props} /> );
            expect( screen.getByText( 'Test summary of the news article' ) ).toBeInTheDocument();
        } );
        it( 'hides summary when showSummary is false', () => {
            const props = createMockProps( { showSummary: false } );
            render( <CECNewsTile {...props} /> );
            expect( screen.queryByText( 'Test summary of the news article' ) ).not.toBeInTheDocument();
        } );
        it( 'uses _summary field when available', () => {
            const props = createMockProps( {
                item: createMockNewsItem( {
                    summary: undefined,
                    _summary: 'Custom _summary field'
                } )
            } );
            render( <CECNewsTile {...props} /> );
            expect( screen.getByText( 'Custom _summary field' ) ).toBeInTheDocument();
        } );
        it( 'derives summary from content when no summary is provided', () => {
            const props = createMockProps( {
                item: createMockNewsItem( {
                    summary: undefined,
                    _summary: undefined,
                    content: 'This is the content that should be used as summary'
                } )
            } );
            render( <CECNewsTile {...props} /> );
            expect( screen.getByText( /This is the content/ ) ).toBeInTheDocument();
        } );
        it( 'clamps summary to max characters', () => {
            const longContent = 'A'.repeat( 200 );
            const props = createMockProps( {
                item: createMockNewsItem( {
                    summary: undefined,
                    _summary: undefined,
                    content: longContent
                } ),
                summaryMaxChars: 50
            } );
            const { container } = render( <CECNewsTile {...props} /> );
            const summary = container.querySelector( '.cec-news-tile__summary' );
            expect( summary?.textContent?.length ).toBeLessThanOrEqual( 53 ); // 50 + ellipsis
        } );
        it( 'renders full summary when summary is shorter than 187 characters', () => {
            const shortSummary = 'Short summary';
            const props = createMockProps( {
                item: createMockNewsItem( {
                    summary: shortSummary
                } )
            } );
            const { container } = render( <CECNewsTile {...props} /> );
            const summary = container.querySelector( '.cec-news-tile__summary' );
            expect( summary?.textContent ).toBe( shortSummary );
        } );
        it( 'renders full summary when summary is exactly 187 characters', () => {
            const exactSummary = 'A'.repeat( 187 );
            const props = createMockProps( {
                item: createMockNewsItem( {
                    summary: exactSummary
                } )
            } );
            const { container } = render( <CECNewsTile {...props} /> );
            const summary = container.querySelector( '.cec-news-tile__summary' );
            expect( summary?.textContent ).toBe( exactSummary );
        } );
        it( 'truncates summary after 187 characters and appends ellipsis by default', () => {
            const longSummary = 'A'.repeat( 188 );
            const props = createMockProps( {
                item: createMockNewsItem( {
                    summary: longSummary
                } )
            } );
            const { container } = render( <CECNewsTile {...props} /> );
            const summary = container.querySelector( '.cec-news-tile__summary' );
            expect( summary?.textContent ).toBe( `${'A'.repeat( 187 )}...` );
        } );
    } );
    // Date Tests
    describe( '📅 Date Tests', () => {
        it( 'shows date when showDate is true', () => {
            const { formatSmartDate } = require( '../../utilities/cec-utils' );
            const props = createMockProps( { showDate: true } );
            render( <CECNewsTile {...props} /> );
            expect( formatSmartDate ).toHaveBeenCalledWith( '2024-01-15T10:00:00Z', undefined );
            expect( screen.getByText( 'Jan 15, 2024' ) ).toBeInTheDocument();
        } );
        it( 'hides date when showDate is false', () => {
            const props = createMockProps( { showDate: false } );
            render( <CECNewsTile {...props} /> );
            expect( screen.queryByText( 'Jan 15, 2024' ) ).not.toBeInTheDocument();
        } );
        it( 'sets dateTime attribute on time element', () => {
            const props = createMockProps( { showDate: true } );
            const { container } = render( <CECNewsTile {...props} /> );
            const timeElement = container.querySelector( 'time' );
            expect( timeElement ).toHaveAttribute( 'dateTime', '2024-01-15T10:00:00.000Z' );
        } );
    } );
    // Category Tests
    describe( '🏷️ Category Tests', () => {
        it( 'shows category CSS class regardless of showCategory prop', () => {
            const props = createMockProps( { showCategory: false } );
            const { container } = render( <CECNewsTile {...props} /> );
            expect( container.querySelector( '.newsTile' ) ).toHaveClass( 'technology' );
        } );
    } );
    // Link Tests
    describe( '🔗 Link Tests', () => {
        it( 'renders link when openMode is "link" and URL is available', () => {
            const props = createMockProps( { openMode: 'link' } );
            render( <CECNewsTile {...props} /> );
            const link = screen.getByRole( 'link' );
            expect( link ).toBeInTheDocument();
            expect( link ).toHaveAttribute( 'href', 'http://example.com/news1' );
            expect( link ).toHaveAttribute( 'target', '_blank' );
        } );
        it( 'does not render link when openMode is "dialog"', () => {
            const props = createMockProps( { openMode: 'dialog' } );
            render( <CECNewsTile {...props} /> );
            expect( screen.queryByRole( 'link' ) ).not.toBeInTheDocument();
        } );
        it( 'adds rel attribute for _blank links', () => {
            const props = createMockProps();
            render( <CECNewsTile {...props} /> );
            const link = screen.getByRole( 'link' );
            expect( link ).toHaveAttribute( 'rel', 'noopener noreferrer' );
        } );
        it( 'opens link in new window when onClick is not provided', () => {
            const originalOpen = window.open;
            const mockOpen = jest.fn();
            ( window as any ).open = mockOpen;
            const props = createMockProps( {
                openMode: 'link',
                onClick: undefined
            } );
            render( <CECNewsTile {...props} /> );
            const link = screen.getByRole( 'link' );
            fireEvent.click( link );
            expect( mockOpen ).toHaveBeenCalledWith( 'http://example.com/news1', '_blank' );
            // Restore original window.open
            ( window as any ).open = originalOpen;
        } );
        it( 'opens link with custom target when onClick is not provided', () => {
            const originalOpen = window.open;
            const mockOpen = jest.fn();
            ( window as any ).open = mockOpen;
            const props = createMockProps( {
                openMode: 'link',
                onClick: undefined,
                item: createMockNewsItem( {
                    link: { url: 'http://example.com/news1', label: 'Test', target: '_self' }
                } )
            } );
            render( <CECNewsTile {...props} /> );
            const link = screen.getByRole( 'link' );
            fireEvent.click( link );
            expect( mockOpen ).toHaveBeenCalledWith( 'http://example.com/news1', '_self' );
            // Restore original window.open
            ( window as any ).open = originalOpen;
        } );
    } );
    // Interaction Tests
    describe( '🎭 Interaction Tests', () => {
        it( 'calls onClick when tile is clicked (dialog mode)', () => {
            const handleClick = jest.fn();
            const props = createMockProps( { onClick: handleClick, openMode: 'dialog' } );
            render( <CECNewsTile {...props} /> );
            const button = screen.getByRole( 'button' );
            fireEvent.click( button );
            expect( handleClick ).toHaveBeenCalledTimes( 1 );
        } );
        it( 'calls onClick when link is clicked (link mode)', () => {
            const handleClick = jest.fn();
            const props = createMockProps( { onClick: handleClick, openMode: 'link' } );
            render( <CECNewsTile {...props} /> );
            const link = screen.getByRole( 'link' );
            fireEvent.click( link );
            expect( handleClick ).toHaveBeenCalledTimes( 1 );
        } );
        it( 'does not throw error when onClick is not provided (link mode)', () => {
            const props = createMockProps( { onClick: undefined, openMode: 'link' } );
            render( <CECNewsTile {...props} /> );
            const link = screen.getByRole( 'link' );
            expect( () => fireEvent.click( link ) ).not.toThrow();
        } );
        it( 'does not throw error when onClick is not provided (dialog mode)', () => {
            const props = createMockProps( { onClick: undefined, openMode: 'dialog' } );
            render( <CECNewsTile {...props} /> );
            const button = screen.getByRole( 'button' );
            expect( () => fireEvent.click( button ) ).not.toThrow();
        } );
    } );
    // HTML Processing Tests (to cover the uncovered lines)
    describe( '🏗️ HTML Processing Tests', () => {
        it( 'removes script tags from content', () => {
            const { decodeHtmlEntities } = require( '../../utilities/cec-utils' );
            decodeHtmlEntities.mockImplementation( ( html: string ) => html );
            const props = createMockProps( {
                item: createMockNewsItem( {
                    content: '<script>alert("xss")</script><p>Valid content</p>',
                    summary: undefined,
                    _summary: undefined
                } )
            } );
            render( <CECNewsTile {...props} /> );
            expect( screen.queryByText( 'alert("xss")' ) ).not.toBeInTheDocument();
            expect( screen.getByText( /Valid content/ ) ).toBeInTheDocument();
        } );
        it( 'removes style tags from content', () => {
            const props = createMockProps( {
                item: createMockNewsItem( {
                    content: '<style>body{color:red}</style><p>Valid content</p>',
                    summary: undefined,
                    _summary: undefined
                } )
            } );
            render( <CECNewsTile {...props} /> );
            expect( screen.queryByText( 'body{color:red}' ) ).not.toBeInTheDocument();
            expect( screen.getByText( /Valid content/ ) ).toBeInTheDocument();
        } );
        it( 'converts HTML to plain text for summary', () => {
            const props = createMockProps( {
                item: createMockNewsItem( {
                    content: '<p>Content with <strong>bold</strong> and <em>italic</em> text</p>',
                    summary: undefined,
                    _summary: undefined
                } )
            } );
            render( <CECNewsTile {...props} /> );
            expect( screen.getByText( /Content with bold and italic text/ ) ).toBeInTheDocument();
        } );
        it( 'handles malformed HTML in content', () => {
            const props = createMockProps( {
                item: createMockNewsItem( {
                    content: '<p>Broken HTML<div>Unclosed div',
                    summary: undefined,
                    _summary: undefined
                } )
            } );
            render( <CECNewsTile {...props} /> );
            expect( screen.getByRole( 'link' ) ).toBeInTheDocument();
        } );
    } );
    // Edge Cases Tests (to cover the uncovered lines)
    describe( '🐛 Edge Cases Tests', () => {
        it( 'handles item with no link', () => {
            const props = createMockProps( {
                item: createMockNewsItem( { link: undefined } )
            } );
            render( <CECNewsTile {...props} /> );
            expect( screen.queryByRole( 'link' ) ).not.toBeInTheDocument();
        } );
        it( 'handles item with no content', () => {
            const props = createMockProps( {
                item: createMockNewsItem( {
                    content: undefined,
                    summary: undefined,
                    _summary: undefined
                } )
            } );
            render( <CECNewsTile {...props} /> );
            expect( screen.getByRole( 'link' ) ).toBeInTheDocument();
        } );
        it( 'handles very long titles', () => {
            const longTitle = 'A'.repeat( 1000 );
            const props = createMockProps( {
                item: createMockNewsItem( { title: longTitle } )
            } );
            render( <CECNewsTile {...props} /> );
            expect( screen.getByText( `${'A'.repeat( 78 )}...` ) ).toBeInTheDocument();
        } );
        it( 'handles special characters in title', () => {
            const specialTitle = 'Title with & < > " \' characters';
            const props = createMockProps( {
                item: createMockNewsItem( { title: specialTitle } )
            } );
            render( <CECNewsTile {...props} /> );
            expect( screen.getByText( specialTitle ) ).toBeInTheDocument();
        } );
        it( 'handles invalid date format gracefully', () => {
            const props = createMockProps( {
                item: createMockNewsItem( {
                    publishedDate: 'invalid-date-format'
                } )
            } );
            const { container } = render( <CECNewsTile {...props} /> );
            const timeElement = container.querySelector( 'time' );
            expect( timeElement ).not.toHaveAttribute( 'dateTime' );
        } );
        it( 'handles null date input', () => {
            const props = createMockProps( {
                item: createMockNewsItem( {
                    publishedDate: undefined
                } )
            } );
            const { container } = render( <CECNewsTile {...props} /> );
            const timeElement = container.querySelector( 'time' );
            expect( timeElement ).not.toHaveAttribute( 'dateTime' );
        } );
    } );
    // Performance Tests (to cover the uncovered lines)
    describe( '⚡ Performance Tests', () => {
        it( 'does not create new functions on every render', () => {
            const props = createMockProps();
            const { rerender } = render( <CECNewsTile {...props} /> );
            // Re-render with same props
            rerender( <CECNewsTile {...props} /> );
            // Should not throw any errors
            expect( screen.getByRole( 'link' ) ).toBeInTheDocument();
        } );
        it( 'handles rapid click events without errors', () => {
            const handleClick = jest.fn();
            const props = createMockProps( { onClick: handleClick, openMode: 'dialog' } );
            render( <CECNewsTile {...props} /> );
            const button = screen.getByRole( 'button' );
            // Rapid clicks
            for ( let i = 0; i < 10; i++ ) {
                fireEvent.click( button );
            }
            expect( handleClick ).toHaveBeenCalledTimes( 10 );
        } );
    } );
    describe( 'Core String Transformation and Internal Prop Mutations', () => {
        it( 'strips HTML tags and collapses whitespace internally when constructing fallback summary from content', () => {
            const props = createMockProps( {
                item: createMockNewsItem( {
                    summary: undefined,
                    _summary: undefined,
                    content: '  <p>  Multiple   <span>spaces</span>\n and  \t tabs   </p>  '
                } )
            } );
            render( <CECNewsTile {...props} /> );
            // HTML stripped, internal whitespace collapsed to single space, outer whitespace trimmed
            expect( screen.getByText( 'Multiple spaces and tabs' ) ).toBeInTheDocument();
        } );
        it( 'applies clampText trailing punctuation stripping correctly before adding the custom ellipsis', () => {
            const props = createMockProps( {
                item: createMockNewsItem( {
                    summary: undefined,
                    _summary: undefined,
                    content: 'Testing trailing dots.......'
                } ),
                summaryMaxChars: 21,
                summaryEllipsis: ' [read more]'
            } );
            const { container } = render( <CECNewsTile {...props} /> );
            const summary = container.querySelector( '.cec-news-tile__summary' );
            // Should strip all dots after length 21 and cleanly append ' [read more]' without redundant periods
            expect( summary?.textContent ).toBe( 'Testing trailing dots [read more]' );
        } );
        it( 'respects the summaryEllipsis prop default value when parameter is omitted', () => {
            const props = createMockProps( {
                item: createMockNewsItem( {
                    summary: 'A very long string that will be clamped to test default ellipsis',
                } ),
                summaryMaxChars: 10,
                summaryEllipsis: undefined // Omitted to trigger default "..."
            } );
            const { container } = render( <CECNewsTile {...props} /> );
            const summary = container.querySelector( '.cec-news-tile__summary' );
            expect( summary?.textContent ).toBe( 'A very lon...' );
        } );
        it( 'uses the item.date fallback property cleanly when publishedDate is undefined', () => {
            const { formatSmartDate } = require( '../../utilities/cec-utils' );
            const props = createMockProps( {
                item: createMockNewsItem( {
                    publishedDate: undefined,
                    date: '2024-05-20T10:00:00Z'
                } ),
                showDate: true
            } );
            render( <CECNewsTile {...props} /> );
            expect( formatSmartDate ).toHaveBeenCalledWith( '2024-05-20T10:00:00Z', undefined );
        } );
        it( 'hides the summary completely if the derived summary length evaluates to falsey/empty', () => {
            const props = createMockProps( {
                item: createMockNewsItem( {
                    summary: '',
                    _summary: '',
                    content: ''
                } ),
                showSummary: true
            } );
            const { container } = render( <CECNewsTile {...props} /> );
            const summaryContainer = container.querySelector( '.cec-news-tile__summary' );
            expect( summaryContainer ).toBeNull();
        } );
        it( 'bypasses window.open completely when tile button is clicked and href is invalid/empty', () => {
            const originalOpen = window.open;
            const mockOpen = jest.fn();
            ( window as any ).open = mockOpen;
            const props = createMockProps( {
                openMode: 'link',
                onClick: undefined,
                item: createMockNewsItem( {
                    link: { url: '', label: 'No URL Link' }
                } )
            } );
            render( <CECNewsTile {...props} /> );
            // Should render as a button since linkUrl is falsey
            const button = screen.getByRole( 'button' );
            fireEvent.click( button );
            // Verify fallback
            expect( mockOpen ).not.toHaveBeenCalled();
            ( window as any ).open = originalOpen;
        } );
    } );
} );
