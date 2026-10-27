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
import SlideContent from './SlideContent';
// Mock window.open
const mockOpen = jest.fn();
Object.defineProperty( window, 'open', {
  value: mockOpen,
  writable: true,
} );
// Mock utilities
jest.mock( '../../../../utilities', () => ( {
  getLinkTarget: jest.fn( () => '_blank' ),
} ) );
jest.mock( './utils', () => ( {
  getTextColor: jest.fn( ( color ) => color || 'inherit' ),
  getTextShadow: jest.fn( () => true ),
  createMarkup: jest.fn( ( content ) => ( { __html: content } ) ),
} ) );
jest.mock( '../../constants', () => ( {
  DEFAULT_TEXT_COLOR_DARK: '#000000',
  DEFAULT_TEXT_COLOR_LIGHT: '#ffffff',
} ) );
describe( 'SlideContent Component', () => {
  const mockItem = {
    id: '1',
    link: {
      label: 'Test Slide Title',
      url: 'https://example.com/test',
      target: '_blank',
    },
    date: '2024-01-15',
    summary: 'Test slide excerpt content that is quite long and should be truncated properly in the display.',
    content: 'Test slide content that is quite long and should be truncated properly in the display.',
    index: 0,
    image: {
      url: 'https://example.com/image.jpg',
      altText: 'Test Image',
    },
  };
  const defaultProps = {
    item: mockItem,
    textColor: '#ffffff',
    mode: 'light' as const,
    isImageLeft: false,
    isActive: true,
  };
  beforeEach( () => {
    jest.clearAllMocks();
    // Default to returning a closed window so openedWindows cache entries are always stale
    mockOpen.mockReturnValue( { closed: true, focus: jest.fn() } );
    Object.defineProperty( window, 'open', {
      value: mockOpen,
      writable: true,
    } );
  } );
  describe( 'Basic Rendering', () => {
    test( 'renders slide content with title and summary', () => {
      render( <SlideContent {...defaultProps} /> );
      expect( screen.getByText( 'Test Slide Title' ) ).toBeInTheDocument();
      expect( screen.getByText( /Test slide excerpt content/ ) ).toBeInTheDocument();
    } );
    test( 'renders with default props', () => {
      render( <SlideContent item={mockItem} mode="light" /> );
      expect( screen.getByText( 'Test Slide Title' ) ).toBeInTheDocument();
    } );
    test( 'renders with dark mode', () => {
      render( <SlideContent {...defaultProps} mode="dark" /> );
      expect( screen.getByText( 'Test Slide Title' ) ).toBeInTheDocument();
    } );
    test( 'renders with image left layout', () => {
      render( <SlideContent {...defaultProps} isImageLeft={true} /> );
      expect( screen.getByText( 'Test Slide Title' ) ).toBeInTheDocument();
    } );
    test( 'renders when not active', () => {
      render( <SlideContent {...defaultProps} isActive={false} /> );
      expect( screen.getByText( 'Test Slide Title' ) ).toBeInTheDocument();
    } );
  } );
  describe( 'Content Handling', () => {
    test( 'renders with missing title', () => {
      const itemWithoutTitle = {
        ...mockItem,
        link: { ...mockItem.link, label: null as any },
        date: '2024-01-15',
        content: 'Test content',
        index: 0,
      };
      render( <SlideContent {...defaultProps} item={itemWithoutTitle} /> );
      expect( screen.queryByText( 'Test Slide Title' ) ).not.toBeInTheDocument();
    } );
    test( 'renders with missing summary', () => {
      const itemWithoutSummary = {
        ...mockItem,
        summary: null as any,
        date: '2024-01-15',
        content: 'Test content',
        index: 0,
      };
      render( <SlideContent {...defaultProps} item={itemWithoutSummary} /> );
      expect( screen.queryByText( /Test slide excerpt content/ ) ).not.toBeInTheDocument();
    } );
    test( 'renders with missing link', () => {
      const itemWithoutLink = {
        ...mockItem,
        link: null as any,
        date: '2024-01-15',
        content: 'Test content',
        index: 0,
      };
      render( <SlideContent {...defaultProps} item={itemWithoutLink} /> );
      expect( screen.queryByText( 'Test Slide Title' ) ).not.toBeInTheDocument();
    } );
    test( 'renders with custom text color', () => {
      render( <SlideContent {...defaultProps} textColor="#ff0000" /> );
      expect( screen.getByText( 'Test Slide Title' ) ).toBeInTheDocument();
    } );
    test( 'handles HTML content in summary', () => {
      const itemWithHtml = {
        ...mockItem,
        summary: '<p>HTML excerpt content</p>',
        date: '2024-01-15',
        content: 'Test content',
        index: 0,
      };
      render( <SlideContent {...defaultProps} item={itemWithHtml} /> );
      expect( screen.getByText( /HTML excerpt content/ ) ).toBeInTheDocument();
    } );
  } );
  describe( 'Link Handling', () => {
    test( 'handles link click with window management', () => {
      const mockWindow = {
        closed: false,
        focus: jest.fn(),
        location: { href: '' },
      } as any;
      mockOpen.mockReturnValue( mockWindow );
      render( <SlideContent {...defaultProps} /> );
      const titleLink = screen.getByText( 'Test Slide Title' );
      fireEvent.click( titleLink );
      expect( mockOpen ).toHaveBeenCalledWith(
        'https://example.com/test',
        expect.stringMatching( /^cec_\d+$/ )
      );
      // Invalidate cache entry so subsequent tests don't reuse this window
      mockWindow.closed = true;
    } );
    test( 'handles _self target navigation', () => {
      const itemWithSelfTarget = {
        ...mockItem,
        link: { ...mockItem.link, target: '_self' },
      };
      // Mock window.location
      delete ( window as any ).location;
      window.location = { href: '' } as any;
      render( <SlideContent {...defaultProps} item={itemWithSelfTarget} /> );
      const titleLink = screen.getByText( 'Test Slide Title' );
      fireEvent.click( titleLink );
      expect( window.location.href ).toBe( 'https://example.com/test' );
      expect( mockOpen ).not.toHaveBeenCalled();
    } );
    test( 'prevents link click when inactive', () => {
      render( <SlideContent {...defaultProps} isActive={false} /> );
      const titleLink = screen.getByText( 'Test Slide Title' );
      fireEvent.click( titleLink );
      expect( mockOpen ).not.toHaveBeenCalled();
    } );
    test( 'handles missing URL gracefully', () => {
      const itemWithoutUrl = {
        ...mockItem,
        link: { ...mockItem.link, url: '' },
      };
      render( <SlideContent {...defaultProps} item={itemWithoutUrl} /> );
      const titleLink = screen.getByText( 'Test Slide Title' );
      fireEvent.click( titleLink );
      expect( mockOpen ).not.toHaveBeenCalled();
    } );
    test( 'handles read more link click', () => {
      render( <SlideContent {...defaultProps} /> );
      const readMoreLink = screen.getByText( 'Read More' );
      fireEvent.click( readMoreLink );
      expect( mockOpen ).toHaveBeenCalledWith(
        'https://example.com/test',
        expect.stringMatching( /^cec_\d+$/ )
      );
    } );
    test( 'reuses existing window for same URL', () => {
      const mockExistingWindow = {
        closed: false,
        focus: jest.fn(),
        location: { href: '' },
      };
      window.open = jest.fn().mockReturnValue( mockExistingWindow );
      render( <SlideContent {...defaultProps} /> );
      const titleLink = screen.getByText( 'Test Slide Title' );
      // First click: opens the window and caches it
      fireEvent.click( titleLink );
      // Second click: finds the cached open window, calls focus()
      fireEvent.click( titleLink );
      expect( mockExistingWindow.focus ).toHaveBeenCalled();
      // Invalidate cache entry so subsequent tests don't reuse this window
      mockExistingWindow.closed = true;
    } );
    test( 'handles window.open returning null', () => {
      mockOpen.mockReturnValue( null );
      render( <SlideContent {...defaultProps} /> );
      const titleLink = screen.getByText( 'Test Slide Title' );
      expect( () => fireEvent.click( titleLink ) ).not.toThrow();
    } );
    test( 'handles navigation error in existing window', () => {
      const mockWindowWithError = {
        closed: false,
        focus: jest.fn(),
        location: {
          get href() {
            throw new Error( 'Navigation error' );
          },
          set href( value ) {
            throw new Error( 'Navigation error' );
          },
        },
      };
      mockOpen.mockReturnValue( mockWindowWithError );
      render( <SlideContent {...defaultProps} /> );
      const titleLink = screen.getByText( 'Test Slide Title' );
      expect( () => fireEvent.click( titleLink ) ).not.toThrow();
    } );
  } );
  describe( 'Text Styling', () => {
    test( 'applies correct text styles for title', () => {
      render( <SlideContent {...defaultProps} /> );
      const title = screen.getByText( 'Test Slide Title' );
      expect( title ).toBeInTheDocument();
    } );
    test( 'applies correct text styles for summary', () => {
      render( <SlideContent {...defaultProps} /> );
      const excerpt = screen.getByText( /Test slide excerpt content/ );
      expect( excerpt ).toBeInTheDocument();
    } );
    test( 'handles different modes correctly', () => {
      const { rerender } = render( <SlideContent {...defaultProps} mode="light" /> );
      expect( screen.getByText( 'Test Slide Title' ) ).toBeInTheDocument();
      rerender( <SlideContent {...defaultProps} mode="dark" /> );
      expect( screen.getByText( 'Test Slide Title' ) ).toBeInTheDocument();
    } );
    test( 'handles image left layout correctly', () => {
      render( <SlideContent {...defaultProps} isImageLeft={true} /> );
      expect( screen.getByText( 'Test Slide Title' ) ).toBeInTheDocument();
    } );
  } );
  describe( 'Edge Cases', () => {
    test( 'handles empty item object', () => {
      const emptyItem = {
        id: '',
        link: { url: '', label: '', target: '' },
        date: '',
        summary: '',
        content: '',
        index: 0,
      };
      render( <SlideContent item={emptyItem} mode="light" /> );
      expect( document.body ).toBeInTheDocument();
    } );
    test( 'handles null item gracefully', () => {
      render( <SlideContent item={null as any} mode="light" /> );
      expect( document.body ).toBeInTheDocument();
    } );
    test( 'handles undefined item gracefully', () => {
      render( <SlideContent item={undefined as any} mode="light" /> );
      expect( document.body ).toBeInTheDocument();
    } );
    test( 'handles item with empty strings', () => {
      const emptyItem = {
        id: '',
        link: { url: '', label: '', target: '' },
        date: '',
        summary: '',
        content: '',
        index: 0,
      };
      render( <SlideContent {...defaultProps} item={emptyItem} /> );
      expect( document.body ).toBeInTheDocument();
    } );
    test( 'handles very long content', () => {
      const longItem = {
        ...mockItem,
        link: { ...mockItem.link, label: 'A'.repeat( 200 ) },
        summary: 'B'.repeat( 500 ),
      };
      render( <SlideContent {...defaultProps} item={longItem} /> );
      expect( screen.getByText( 'A'.repeat( 200 ) ) ).toBeInTheDocument();
      expect( screen.getByText( 'B'.repeat( 500 ) ) ).toBeInTheDocument();
    } );
  } );
  describe( 'Accessibility', () => {
    test( 'has correct ARIA attributes when active', () => {
      render( <SlideContent {...defaultProps} isActive={true} /> );
      const container = screen.getByText( 'Test slide excerpt content that is quite long and should be truncated properly in the display.' ).closest( '.cecFeaturedStories__slideContent' );
      expect( container ).toHaveAttribute( 'aria-hidden', 'false' );
      expect( container ).toHaveAttribute( 'data-slide-active', 'true' );
    } );
    test( 'has correct ARIA attributes when inactive', () => {
      render( <SlideContent {...defaultProps} isActive={false} /> );
      const container = screen.getByText( 'Test slide excerpt content that is quite long and should be truncated properly in the display.' ).closest( '.cecFeaturedStories__slideContent' );
      expect( container ).toHaveAttribute( 'aria-hidden', 'true' );
      expect( container ).toHaveAttribute( 'data-slide-active', 'false' );
    } );
    test( 'title link has correct accessibility attributes when active', () => {
      render( <SlideContent {...defaultProps} isActive={true} /> );
      const titleLink = screen.getByText( 'Test Slide Title' );
      expect( titleLink ).not.toHaveAttribute( 'tabIndex' );
      expect( titleLink ).toHaveAttribute( 'aria-disabled', 'false' );
    } );
    test( 'title link has correct accessibility attributes when inactive', () => {
      render( <SlideContent {...defaultProps} isActive={false} /> );
      const titleLink = screen.getByText( 'Test Slide Title' );
      expect( titleLink ).toHaveAttribute( 'tabIndex', '-1' );
      expect( titleLink ).toHaveAttribute( 'aria-disabled', 'true' );
    } );
    test( 'read more link has correct accessibility attributes', () => {
      render( <SlideContent {...defaultProps} /> );
      const readMoreLink = screen.getByText( 'Read More' );
      expect( readMoreLink ).toHaveAttribute( 'aria-label', 'Read more about Test Slide Title' );
    } );
    test( 'read more link is disabled when inactive', () => {
      render( <SlideContent {...defaultProps} isActive={false} /> );
      const readMoreLink = screen.getByText( 'Read More' );
      expect( readMoreLink ).toHaveAttribute( 'tabIndex', '-1' );
      expect( readMoreLink ).toHaveAttribute( 'aria-disabled', 'true' );
    } );
  } );
  describe( 'HTML Content Rendering', () => {
    test( 'uses createMarkup for HTML content', async () => {
      const { createMarkup } = await import( './utils' );
      ( createMarkup as jest.Mock ).mockClear();
      render( <SlideContent {...defaultProps} /> );
      expect( createMarkup ).toHaveBeenCalledWith( 'Test Slide Title' );
      expect( createMarkup ).toHaveBeenCalledWith( 'Test slide excerpt content that is quite long and should be truncated properly in the display.' );
    } );
    test( 'handles empty HTML content', async () => {
      const { createMarkup } = await import( './utils' );
      ( createMarkup as jest.Mock ).mockClear();
      const itemWithEmptyContent = {
        ...mockItem,
        link: { ...mockItem.link, label: '' },
        summary: '',
      };
      render( <SlideContent {...defaultProps} item={itemWithEmptyContent} /> );
      expect( createMarkup ).not.toHaveBeenCalled();
    } );
    test( 'handles special characters in content', () => {
      const itemWithSpecialChars = {
        ...mockItem,
        link: { ...mockItem.link, label: 'Test & Story "Special"' },
        summary: 'Summary with <script>alert("xss")</script> content',
      };
      render( <SlideContent {...defaultProps} item={itemWithSpecialChars} /> );
      expect( screen.getByText( 'Test & Story "Special"' ) ).toBeInTheDocument();
      expect( screen.getByTestId( 'story-excerpt' ) ).toBeInTheDocument();
    } );
  } );
  describe( 'Color and Mode Variations', () => {
    test( 'applies custom textColor', () => {
      render( <SlideContent {...defaultProps} textColor="#ff0000" /> );
      const container = screen.getByText( 'Test slide excerpt content that is quite long and should be truncated properly in the display.' ).closest( '.cecFeaturedStories__slideContent' );
      expect( container ).toHaveStyle( { color: '#ff0000' } );
    } );
    test( 'uses default color when no textColor provided', () => {
      render( <SlideContent {...defaultProps} textColor={undefined} /> );
      const container = screen.getByText( 'Test slide excerpt content that is quite long and should be truncated properly in the display.' ).closest( '.cecFeaturedStories__slideContent' );
      expect( container ).toHaveStyle( { color: '#ffffff' } ); // DEFAULT_TEXT_COLOR_LIGHT
    } );
    test( 'handles image left layout color correctly', () => {
      render( <SlideContent {...defaultProps} isImageLeft={true} textColor={undefined} /> );
      const container = screen.getByText( 'Test slide excerpt content that is quite long and should be truncated properly in the display.' ).closest( '.cecFeaturedStories__slideContent' );
      expect( container ).toHaveStyle( { color: '#000000' } ); // DEFAULT_TEXT_COLOR_DARK
    } );
  } );
  describe( 'Pointer Events', () => {
    test( 'disables pointer events when inactive', () => {
      render( <SlideContent {...defaultProps} isActive={false} /> );
      const container = screen.getByText( 'Test slide excerpt content that is quite long and should be truncated properly in the display.' ).closest( '.cecFeaturedStories__slideContent' );
      expect( container ).toHaveStyle( { pointerEvents: 'none' } );
    } );
    test( 'enables pointer events when active', () => {
      render( <SlideContent {...defaultProps} isActive={true} /> );
      const container = screen.getByText( 'Test slide excerpt content that is quite long and should be truncated properly in the display.' ).closest( '.cecFeaturedStories__slideContent' );
      expect( container ).not.toHaveStyle( { pointerEvents: 'none' } );
    } );
  } );
  describe( 'Window Hash Generation', () => {
    test( 'generates consistent hash for same URL', () => {
      const originalWindowOpen = window.open;
      const mockTargets: string[] = [];
      window.open = jest.fn().mockImplementation( ( url, target ) => {
        mockTargets.push( target || 'default' );
        return { closed: false, focus: jest.fn() };
      } );
      const { unmount } = render( <SlideContent {...defaultProps} /> );
      const titleLink = screen.getByText( 'Test Slide Title' );
      fireEvent.click( titleLink );
      unmount();
      render( <SlideContent {...defaultProps} /> );
      const titleLink2 = screen.getByText( 'Test Slide Title' );
      fireEvent.click( titleLink2 );
      expect( mockTargets[0] ).toBe( mockTargets[1] );
      expect( mockTargets[0] ).toMatch( /^cec_\d+$/ );
      window.open = originalWindowOpen;
    } );
    test( 'generates different hashes for different URLs', () => {
      const originalWindowOpen = window.open;
      const mockTargets: string[] = [];
      window.open = jest.fn().mockImplementation( ( url, target ) => {
        mockTargets.push( target || 'default' );
        return { closed: false, focus: jest.fn() };
      } );
      const itemWithDifferentUrl = {
        ...mockItem,
        link: { ...mockItem.link, url: 'https://different.com' },
      };
      const { unmount } = render( <SlideContent {...defaultProps} /> );
      const titleLink = screen.getByText( 'Test Slide Title' );
      fireEvent.click( titleLink );
      unmount();
      render( <SlideContent {...defaultProps} item={itemWithDifferentUrl} /> );
      const titleLink2 = screen.getByText( 'Test Slide Title' );
      fireEvent.click( titleLink2 );
      expect( mockTargets[0] ).not.toBe( mockTargets[1] );
      window.open = originalWindowOpen;
    } );
  } );
} );
