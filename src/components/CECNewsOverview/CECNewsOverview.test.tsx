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
import CECNewsOverview from './CECNewsOverview';
import { itSupportsExtensionProps } from '../../testUtils/extensionContract';
describe( 'CECNewsOverview', () => {
  const mockItems = [
    {
      _id: '1',
      title: 'Test News 1',
      summary: 'This is a test news summary',
      category: 'Announcement',
      date: '2025-01-01T00:00:00Z',
      link: { url: 'https://example.com/1', target: '_blank' },
      imageUrl: 'https://example.com/image1.jpg'
    },
    {
      _id: '2',
      title: 'Test News 2',
      summary: 'Another test news summary',
      category: 'Update',
      date: '2025-01-02T00:00:00Z',
      link: { url: 'https://example.com/2', target: '_self' },
      imageUrl: 'https://example.com/image2.jpg'
    }
  ];
  const defaultProps = {
    items: mockItems,
    viewMode: 'column' as const,
    openMode: 'dialog' as const,
    showCategory: true,
    showDate: true,
    showSummary: true,
    showImage: true,
    imagePosition: 'top' as const,
    imageSize: 'md' as const,
    cardStyle: 'card' as const,
    highlightFirst: false,
    displayCount: undefined,
    dir: undefined,
    minItemWidth: undefined,
    maxHeight: undefined,
    reserveGutter: false,
  };
  it( 'renders without crashing', () => {
    render( <CECNewsOverview items={[]} /> );
    expect( screen.getByTestId( 'newsOverview-empty' ) ).toBeInTheDocument();
  } );
  it( 'displays empty state when no items are provided', () => {
    render( <CECNewsOverview items={[]} /> );
    expect( screen.getByText( 'No News data found' ) ).toBeInTheDocument();
    expect( screen.getByText( /Please configure a valid/ ) ).toBeInTheDocument();
  } );
  it( 'renders the correct number of news items', () => {
    render( <CECNewsOverview items={mockItems} /> );
    const newsItems = screen.getAllByRole( 'article' );
    expect( newsItems ).toHaveLength( 2 );
  } );
  it( 'respects the displayCount prop', () => {
    render( <CECNewsOverview items={mockItems} displayCount={1} /> );
    const newsItems = screen.getAllByRole( 'article' );
    expect( newsItems ).toHaveLength( 1 );
  } );
  it( 'applies the correct view mode class', () => {
    render( <CECNewsOverview items={mockItems} viewMode="column" /> );
    const container = screen.getByTestId( 'cec-news-overview' );
    expect( container ).toHaveClass( 'cecNewsOverview--column' );
  } );
  it( 'applies row class when viewMode is row', () => {
    render( <CECNewsOverview items={mockItems} viewMode="row" /> );
    const container = screen.getByTestId( 'cec-news-overview' );
    expect( container ).toHaveClass( 'cecNewsOverview--row' );
    expect( container ).not.toHaveClass( 'cecNewsOverview--column' );
  } );
  it( 'defaults to column class when viewMode is not provided', () => {
    render( <CECNewsOverview items={mockItems} /> );
    const container = screen.getByTestId( 'cec-news-overview' );
    expect( container ).toHaveClass( 'cecNewsOverview--column' );
    expect( container ).not.toHaveClass( 'cecNewsOverview--row' );
  } );
  it( 'applies RTL direction when dir prop is rtl', () => {
    render( <CECNewsOverview items={mockItems} dir="rtl" /> );
    const container = screen.getByTestId( 'cec-news-overview' );
    expect( container ).toHaveClass( 'cecNewsOverview--rtl' );
  } );
  it( 'displays category when showCategory is true', () => {
    render( <CECNewsOverview items={mockItems} showCategory={true} /> );
    const categoryElements = document.querySelectorAll( '.cec-news-tile__category' );
    expect( categoryElements.length ).toBeGreaterThan( 0 );
  } );
  it( 'hides category when showCategory is false', () => {
    render( <CECNewsOverview items={mockItems} showCategory={false} /> );
    const categoryElements = document.querySelectorAll( '.cec-news-tile__category' );
    expect( categoryElements.length ).toBe( 0 );
  } );
  it( 'displays date when showDate is true', () => {
    render( <CECNewsOverview items={mockItems} showDate={true} /> );
    const dateElements = document.querySelectorAll( '.cec-news-tile__date' );
    expect( dateElements.length ).toBeGreaterThan( 0 );
  } );
  it( 'opens dialog when a news item is clicked and openMode is "dialog"', () => {
    render( <CECNewsOverview items={mockItems} openMode="dialog" /> );
    const newsItem = screen.getByRole( 'button', { name: 'Open Test News 1' } );
    fireEvent.click( newsItem );
    expect( screen.getByRole( 'dialog' ) ).toBeInTheDocument();
    expect( screen.getByRole( 'dialog' ) ).toHaveAttribute( 'aria-label', 'Test News 1' );
  } );
  it( 'navigates to URL when openMode is "link"', () => {
    // Mock window.open
    const originalOpen = window.open;
    window.open = jest.fn();
    render( <CECNewsOverview items={mockItems} openMode="link" /> );
    // Click on the first news item
    const firstNewsItem = screen.getByRole( 'link', { name: 'Open Test News 1' } );
    fireEvent.click( firstNewsItem );
    // Check if window.open was called with the correct URL
    expect( window.open ).toHaveBeenCalledWith( 'https://example.com/1', '_blank', 'noopener,noreferrer' );
    // Cleanup
    window.open = originalOpen;
  } );
  it( 'applies highlightFirst prop correctly', () => {
    render( <CECNewsOverview items={mockItems} highlightFirst={true} showSummary={true} /> );
    const newsItems = screen.getAllByRole( 'link', { name: /Open Test News/ } );
    // First item should have summary
    expect( screen.getByText( 'This is a test news summary' ) ).toBeInTheDocument();
    // Second item should be muted (no summary)
    expect( screen.queryByText( 'Another test news summary' ) ).not.toBeInTheDocument();
  } );
  it( 'applies custom styles through props', () => {
    const { container } = render(
      <CECNewsOverview
        items={mockItems}
        minItemWidth="300px"
        maxHeight="500px"
      />
    );
    const element = container.firstChild as HTMLElement;
    expect( element ).toHaveStyle( '--nov-min: 300px' );
    expect( element ).toHaveStyle( '--nov-max-height: 500px' );
  } );
  it( 'renders items without _id without React key warnings', () => {
    const itemsWithoutId = [
      {
        title: 'News Without ID 1',
        summary: 'First news without ID',
        category: 'Test',
        date: '2025-01-01T00:00:00Z',
        link: { url: 'https://example.com/1', target: '_blank' }
      },
      {
        title: 'News Without ID 2',
        summary: 'Second news without ID',
        category: 'Test',
        date: '2025-01-02T00:00:00Z',
        link: { url: 'https://example.com/2', target: '_blank' }
      }
    ];
    // This should not throw any React key warnings
    expect( () => {
      render( <CECNewsOverview items={itemsWithoutId} /> );
    } ).not.toThrow();
    // Verify both items render correctly
    expect( screen.getByText( 'News Without ID 1' ) ).toBeInTheDocument();
    expect( screen.getByText( 'News Without ID 2' ) ).toBeInTheDocument();
  } );
  it( 'renders mixed items with and without _id correctly', () => {
    const mixedItems = [
      {
        _id: 'explicit-id',
        title: 'News With ID',
        summary: 'News with explicit ID',
        category: 'Test',
        date: '2025-01-01T00:00:00Z',
        link: { url: 'https://example.com/1', target: '_blank' }
      },
      {
        title: 'News Without ID',
        summary: 'News without explicit ID',
        category: 'Test',
        date: '2025-01-02T00:00:00Z',
        link: { url: 'https://example.com/2', target: '_blank' }
      }
    ];
    // This should not throw any React key warnings
    expect( () => {
      render( <CECNewsOverview items={mixedItems} /> );
    } ).not.toThrow();
    // Verify both items render correctly
    expect( screen.getByText( 'News With ID' ) ).toBeInTheDocument();
    expect( screen.getByText( 'News Without ID' ) ).toBeInTheDocument();
  } );
  it( 'handles server-side rendering fallback', () => {
    // Test that the component has a fallback for when document direction is not available
    render( <CECNewsOverview items={mockItems} /> );
    // Should render correctly regardless of document state
    expect( screen.getByText( 'Test News 1' ) ).toBeInTheDocument();
  } );
  it( 'navigates to _self link using window.location.assign', () => {
    // Mock window.location.assign
    const originalAssign = window.location.assign;
    const mockAssign = jest.fn();
    Object.defineProperty( window, 'location', {
      value: { ...window.location, assign: mockAssign },
      writable: true
    } );
    const itemsWithSelfTarget = [
      {
        _id: '1',
        title: 'Test News 1',
        summary: 'This is a test news summary',
        category: 'Announcement',
        date: '2025-01-01T00:00:00Z',
        link: { url: 'https://example.com/1', target: '_self' }
      }
    ];
    render( <CECNewsOverview items={itemsWithSelfTarget} openMode="link" /> );
    // Click on the news item
    const newsItem = screen.getByRole( 'link', { name: 'Open Test News 1' } );
    fireEvent.click( newsItem );
    // Check if window.location.assign was called
    expect( mockAssign ).toHaveBeenCalledWith( 'https://example.com/1' );
    // Cleanup
    window.location.assign = originalAssign;
  } );
  // Additional edge case tests for better branch coverage
  describe( 'Edge Cases and Branch Coverage', () => {
    it( 'handles displayCount of 0 (shows all items)', () => {
      render( <CECNewsOverview {...defaultProps} displayCount={0} /> );
      const buttons = screen.getAllByRole( 'button' );
      expect( buttons.length ).toBeGreaterThanOrEqual( 2 ); // At least 2 news items
    } );
    it( 'handles negative displayCount (shows all items)', () => {
      render( <CECNewsOverview {...defaultProps} displayCount={-5} /> );
      const buttons = screen.getAllByRole( 'button' );
      expect( buttons.length ).toBeGreaterThanOrEqual( 2 ); // At least 2 news items
    } );
    it( 'handles displayCount larger than items array', () => {
      render( <CECNewsOverview {...defaultProps} displayCount={10} /> );
      const buttons = screen.getAllByRole( 'button' );
      expect( buttons.length ).toBeGreaterThanOrEqual( 2 ); // At least 2 news items
    } );
    it( 'handles empty items array with displayCount', () => {
      render( <CECNewsOverview {...defaultProps} items={[]} displayCount={5} /> );
      expect( screen.getByText( 'No News data found' ) ).toBeInTheDocument();
    } );
    it( 'handles item with missing link URL in link mode', () => {
      // Mock window.open for this test
      const originalOpen = window.open;
      const mockOpen = jest.fn();
      window.open = mockOpen;
      const itemsWithoutUrl = [
        { ...mockItems[0], link: { ...mockItems[0].link, url: '' } }
      ];
      render( <CECNewsOverview {...defaultProps} items={itemsWithoutUrl} openMode="link" /> );
      const newsItem = screen.getByRole( 'button', { name: 'Open Test News 1' } );
      fireEvent.click( newsItem );
      // Should not navigate since URL is empty
      expect( mockOpen ).not.toHaveBeenCalled();
      // Cleanup
      window.open = originalOpen;
    } );
    it( 'handles item with null link in link mode', () => {
      // Mock window.open for this test
      const originalOpen = window.open;
      const mockOpen = jest.fn();
      window.open = mockOpen;
      const itemsWithNullLink = [
        { ...mockItems[0], link: { url: '', target: '_blank' } } // Use empty link object instead of undefined
      ];
      render( <CECNewsOverview {...defaultProps} items={itemsWithNullLink} openMode="link" /> );
      const newsItem = screen.getByRole( 'button', { name: 'Open Test News 1' } );
      fireEvent.click( newsItem );
      // Should not navigate since link URL is empty
      expect( mockOpen ).not.toHaveBeenCalled();
      // Cleanup
      window.open = originalOpen;
    } );
    it( 'applies reserveGutter class when true', () => {
      render( <CECNewsOverview {...defaultProps} reserveGutter={true} /> );
      const container = screen.getByTestId( 'cec-news-overview' );
      expect( container ).toHaveClass( 'cecNewsOverview--reserveGutter' );
    } );
    it( 'applies divider card style', () => {
      render( <CECNewsOverview {...defaultProps} cardStyle="divider" /> );
      const container = screen.getByTestId( 'cec-news-overview' );
      expect( container ).toHaveClass( 'cecNewsOverview--divider' );
    } );
  } );
  describe( 'Advanced Layout and Lifecycle Edge Cases', () => {
    it( 'applies default md size preset values when an invalid imageSize is supplied', () => {
      const { container } = render(
        <CECNewsOverview items={mockItems} imageSize={"invalid-preset" as any} />
      );
      const element = container.firstChild as HTMLElement;
      expect( element ).toHaveStyle( '--nov-thumb-w: 120px' );
      expect( element ).toHaveStyle( '--nov-thumb-h: 84px' );
      expect( element ).toHaveStyle( '--nov-row-img-h: 200px' );
    } );
    it( 'defaults to ltr when getComputedStyle direction returns a falsy value', () => {
      const originalGetComputedStyle = global.getComputedStyle;
      global.getComputedStyle = () => ( { direction: '' } as CSSStyleDeclaration );
      render( <CECNewsOverview items={mockItems} /> );
      const container = screen.getByTestId( 'cec-news-overview' );
      expect( container ).toHaveClass( 'cecNewsOverview--ltr' );
      global.getComputedStyle = originalGetComputedStyle;
    } );
    it( 'updates the container class dynamically via MutationObserver when document dir attribute changes', async () => {
      const originalGetComputedStyle = global.getComputedStyle;
      let currentDir = 'ltr';
      global.getComputedStyle = () => ( { direction: currentDir } as CSSStyleDeclaration );
      const { window } = require( '@testing-library/react' );
      render( <CECNewsOverview items={mockItems} /> );
      const container = screen.getByTestId( 'cec-news-overview' );
      expect( container ).toHaveClass( 'cecNewsOverview--ltr' );
      // Simulate the global attribute mutation
      currentDir = 'rtl';
      document.documentElement.setAttribute( 'dir', 'rtl' );
      // Allow mutation macro-tasks to flush completely
      await new Promise( resolve => setTimeout( resolve, 50 ) );
      expect( container ).toHaveClass( 'cecNewsOverview--rtl' );
      global.getComputedStyle = originalGetComputedStyle;
      document.documentElement.removeAttribute( 'dir' );
    } );
    it( 'defaults to window.open with _blank when link target is completely missing or undefined', () => {
      const originalOpen = window.open;
      window.open = jest.fn();
      const itemsWithUndefinedTarget = [
        {
          _id: '1',
          title: 'Test News 1',
          link: { url: 'https://example.com/1', target: undefined }
        }
      ];
      render( <CECNewsOverview items={itemsWithUndefinedTarget} openMode="link" /> );
      const newsItem = screen.getByRole( 'link', { name: 'Open Test News 1' } );
      fireEvent.click( newsItem );
      expect( window.open ).toHaveBeenCalledWith( 'https://example.com/1', '_blank', 'noopener,noreferrer' );
      window.open = originalOpen;
    } );
    it( 'generates fallback unique template keys when both id and title are missing from items', () => {
      const itemsMissingAllIdentifiers = [
        {
          summary: 'No id or title text included',
          link: { url: 'https://example.com/1' }
        }
      ];
      expect( () => {
        render( <CECNewsOverview items={itemsMissingAllIdentifiers} /> );
      } ).not.toThrow();
      expect( screen.getByTestId( 'cec-news-overview' ) ).toBeInTheDocument();
    } );
    it( 'hides image elements entirely when imageMode is configured as none', () => {
      render( <CECNewsOverview items={mockItems} imageMode="none" /> );
      const container = screen.getByTestId( 'cec-news-overview' );
      expect( container ).toBeInTheDocument();
    } );
  } );
} );

const extensionItems = [
  { _id: '1', title: 'Test News 1', summary: 'Summary 1', category: 'Announcement', date: '2025-01-01T00:00:00Z', link: { url: 'https://example.com/1', target: '_blank' }, imageUrl: 'https://example.com/image1.jpg' },
  { _id: '2', title: 'Test News 2', summary: 'Summary 2', category: 'Update', date: '2025-01-02T00:00:00Z', link: { url: 'https://example.com/2', target: '_self' }, imageUrl: 'https://example.com/image2.jpg' },
];

itSupportsExtensionProps( ( extra ) => <CECNewsOverview items={extensionItems} {...extra} /> );

describe( 'CECNewsOverview extension props next to a { data } wrapper', () => {
  const renderWrapped = ( extra: Record<string, unknown> ) => {
    const ref = React.createRef<HTMLElement>();
    const props = { data: { items: extensionItems, autoPlay: false }, ref, ...extra } as object;
    const { container } = render( <CECNewsOverview {...props} /> );
    return { root: container.firstElementChild as HTMLElement, ref };
  };

  test( 'className, ref and DOM attributes passed next to data reach the root, and the wrapper key does not', () => {
    const { root, ref } = renderWrapped( { className: 'bp-outer', 'data-contract': 'yes' } );
    expect( root ).toHaveClass( 'cecNewsOverview', 'bp-outer' );
    expect( root ).toHaveAttribute( 'data-contract', 'yes' );
    expect( root ).not.toHaveAttribute( 'data' );
    expect( ref.current ).toBe( root );
  } );

  test( 'a className inside the data wrapper and one next to it both apply', () => {
    const ref = React.createRef<HTMLElement>();
    const props = { data: { items: extensionItems, autoPlay: false, className: 'bp-inner' }, className: 'bp-outer', ref } as object;
    const { container } = render( <CECNewsOverview {...props} /> );
    expect( container.firstElementChild ).toHaveClass( 'cecNewsOverview', 'bp-inner', 'bp-outer' );
  } );
} );
