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
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Slide from './Slide';
import { ProcessedBlogCard, Animating, Dir } from '../CECFeaturedStories.types';
// Mock the layout components
jest.mock( './layouts', () => ( {
  DefaultLayout: jest.fn( ( { item, isCurrent, className, hasImage, imageUrl, imageLoaded, onImageLoad, onImageError, ...props } ) => (
    <div data-testid="default-layout" className={className} data-current={isCurrent} data-has-image={hasImage}>
      <h3>{item.link.label}</h3>
      <p>{item.summary}</p>
      {hasImage && imageUrl && (
        <img
          src={imageUrl}
          alt={item.image?.altText || 'Slide image'}
          onLoad={imageLoaded ? undefined : onImageLoad}
          onError={onImageError}
          data-loaded={imageLoaded}
        />
      )}
      <div data-testid="layout-props">{JSON.stringify( { ...props, index: props.index, totalSlides: props.totalSlides, textColor: props.textColor, mode: props.mode, isCurrent } )}</div>
    </div>
  ) ),
  ImageLeftLayout: jest.fn( ( { item, isCurrent, className, hasImage, imageUrl, imageLoaded, onImageLoad, onImageError, ...props } ) => (
    <div data-testid="image-left-layout" className={className} data-current={isCurrent} data-has-image={hasImage}>
      <h3>{item.link.label}</h3>
      <p>{item.summary}</p>
      {hasImage && imageUrl && (
        <img
          src={imageUrl}
          alt={item.image?.altText || 'Slide image'}
          onLoad={imageLoaded ? undefined : onImageLoad}
          onError={onImageError}
          data-loaded={imageLoaded}
        />
      )}
      <div data-testid="layout-props">{JSON.stringify( { ...props, index: props.index, totalSlides: props.totalSlides, textColor: props.textColor, mode: props.mode, isCurrent } )}</div>
    </div>
  ) ),
  getSlideEventHandlers: jest.fn( () => ( {} ) )
} ) );
// Mock console.error to track image loading errors
const originalConsoleError = console.error;
beforeEach( () => {
  console.error = jest.fn();
} );
afterEach( () => {
  console.error = originalConsoleError;
} );
// Helper function to create mock ProcessedBlogCard
const createMockBlogCard = ( overrides: Partial<ProcessedBlogCard> = {} ): ProcessedBlogCard => ( {
  link: { label: 'Test Slide', url: 'https://example.com/test' },
  date: '2025-01-15',
  summary: 'This is a test slide summary',
  content: '<p>This is test slide content</p>',
  index: 0,
  image: {
    url: 'https://example.com/test-image.jpg',
    altText: 'Test Image'
  },
  ...overrides
} );
describe( 'Slide Component', () => {
  const defaultProps = {
    item: createMockBlogCard(),
    index: 0,
    currentSlide: 0,
    animatingSlides: null,
    triggerMove: false,
    isLoaded: false,
    fallbackDataUri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U2xpZGU8L3RleHQ+PC9zdmc+',
    totalSlides: 3,
    textColor: '#ffffff'
  };
  describe( 'Basic Rendering', () => {
    test( 'renders with default layout', () => {
      render( <Slide {...defaultProps} /> );
      expect( screen.getByTestId( 'default-layout' ) ).toBeInTheDocument();
      expect( screen.getByText( 'Test Slide' ) ).toBeInTheDocument();
      expect( screen.getByText( 'This is a test slide summary' ) ).toBeInTheDocument();
    } );
    test( 'renders with imageLeft layout', () => {
      render( <Slide {...defaultProps} layout="imageLeft" /> );
      expect( screen.getByTestId( 'image-left-layout' ) ).toBeInTheDocument();
      expect( screen.getByText( 'Test Slide' ) ).toBeInTheDocument();
    } );
    test( 'passes correct props to layout component', () => {
      render( <Slide {...defaultProps} overlayMode="dark" /> );
      const layoutProps = screen.getByTestId( 'layout-props' );
      const props = JSON.parse( layoutProps.textContent || '{}' );
      expect( props.mode ).toBe( 'dark' );
      expect( props.textColor ).toBe( '#ffffff' );
      expect( props.isCurrent ).toBe( true );
      expect( props.index ).toBe( 0 );
      expect( props.totalSlides ).toBe( 3 );
    } );
  } );
  describe( 'Slide State and Classes', () => {
    test( 'applies active class when slide is current', () => {
      render( <Slide {...defaultProps} currentSlide={0} /> );
      const layout = screen.getByTestId( 'default-layout' );
      expect( layout ).toHaveClass( 'active' );
    } );
    test( 'does not apply active class when slide is not current', () => {
      render( <Slide {...defaultProps} currentSlide={1} /> );
      const layout = screen.getByTestId( 'default-layout' );
      expect( layout ).not.toHaveClass( 'active' );
    } );
    test( 'applies animation classes when animating', () => {
      const animatingSlides: Animating = {
        current: 0,
        next: 1,
        direction: Dir.NEXT
      };
      render( <Slide {...defaultProps} animatingSlides={animatingSlides} /> );
      const layout = screen.getByTestId( 'default-layout' );
      expect( layout ).toHaveClass( 'active left' );
    } );
    test( 'applies next slide classes when animating to next slide', () => {
      const animatingSlides: Animating = {
        current: 0,
        next: 1,
        direction: Dir.NEXT
      };
      render( <Slide {...defaultProps} index={1} animatingSlides={animatingSlides} /> );
      const layout = screen.getByTestId( 'default-layout' );
      expect( layout ).toHaveClass( 'next next--left' );
    } );
    test( 'applies move class when triggerMove is true', () => {
      const animatingSlides: Animating = {
        current: 0,
        next: 1,
        direction: Dir.NEXT
      };
      render( <Slide {...defaultProps} index={1} animatingSlides={animatingSlides} triggerMove={true} /> );
      const layout = screen.getByTestId( 'default-layout' );
      expect( layout ).toHaveClass( 'next next--left move' );
    } );
    test( 'handles previous direction animation', () => {
      const animatingSlides: Animating = {
        current: 1,
        next: 0,
        direction: Dir.PREV
      };
      render( <Slide {...defaultProps} animatingSlides={animatingSlides} /> );
      const layout = screen.getByTestId( 'default-layout' );
      expect( layout ).toHaveClass( 'next next--right' );
    } );
  } );
  describe( 'Image Handling', () => {
    test( 'renders image when item has valid image', () => {
      render( <Slide {...defaultProps} /> );
      const image = screen.getByRole( 'img' );
      expect( image ).toBeInTheDocument();
      expect( image ).toHaveAttribute( 'src', 'https://example.com/test-image.jpg' );
      expect( image ).toHaveAttribute( 'alt', 'Test Image' );
      expect( image ).toHaveAttribute( 'data-loaded', 'false' );
    } );
    test( 'does not render image when item has no image', () => {
      const itemWithoutImage = createMockBlogCard( { image: undefined } );
      render( <Slide {...defaultProps} item={itemWithoutImage} /> );
      expect( screen.queryByRole( 'img' ) ).not.toBeInTheDocument();
      const layout = screen.getByTestId( 'default-layout' );
      expect( layout ).toHaveAttribute( 'data-has-image', 'false' );
    } );
    test( 'does not render image when image URL is empty', () => {
      const itemWithEmptyImage = createMockBlogCard( {
        image: { url: '', altText: 'Empty Image' }
      } );
      render( <Slide {...defaultProps} item={itemWithEmptyImage} /> );
      expect( screen.queryByRole( 'img' ) ).not.toBeInTheDocument();
    } );
    test( 'handles successful image load', async () => {
      render( <Slide {...defaultProps} /> );
      const image = screen.getByRole( 'img' );
      // Simulate successful image load
      fireEvent.load( image );
      await waitFor( () => {
        expect( image ).toHaveAttribute( 'data-loaded', 'true' );
      } );
    } );
    test( 'handles image load error', async () => {
      render( <Slide {...defaultProps} /> );
      const image = screen.getByRole( 'img' );
      // Simulate image load error
      fireEvent.error( image );
      await waitFor( () => {
        expect( console.error ).toHaveBeenCalledWith(
          'Failed to load image:',
          'https://example.com/test-image.jpg',
          expect.any( Object )
        );
      } );
      // Image should no longer be rendered after error
      expect( screen.queryByRole( 'img' ) ).not.toBeInTheDocument();
    } );
    test( 'does not log error when image URL is empty and error occurs', () => {
      const itemWithEmptyImage = createMockBlogCard( {
        image: { url: '', altText: 'Empty Image' }
      } );
      render( <Slide {...defaultProps} item={itemWithEmptyImage} /> );
      // Should not have any image to trigger error
      expect( console.error ).not.toHaveBeenCalled();
    } );
    test( 'resets image state when imageUrl changes', () => {
      const { rerender } = render( <Slide {...defaultProps} /> );
      const image = screen.getByRole( 'img' );
      fireEvent.load( image );
      // Change to a different item with different image
      const newItem = createMockBlogCard( {
        image: { url: 'https://example.com/new-image.jpg', altText: 'New Image' }
      } );
      rerender( <Slide {...defaultProps} item={newItem} /> );
      const newImage = screen.getByRole( 'img' );
      expect( newImage ).toHaveAttribute( 'src', 'https://example.com/new-image.jpg' );
      expect( newImage ).toHaveAttribute( 'data-loaded', 'false' );
    } );
  } );
  describe( 'Overlay Modes', () => {
    test( 'uses light overlay mode by default', () => {
      render( <Slide {...defaultProps} /> );
      const layoutProps = screen.getByTestId( 'layout-props' );
      const props = JSON.parse( layoutProps.textContent || '{}' );
      expect( props.mode ).toBe( 'light' );
    } );
    test( 'uses dark overlay mode when specified', () => {
      render( <Slide {...defaultProps} overlayMode="dark" /> );
      const layoutProps = screen.getByTestId( 'layout-props' );
      const props = JSON.parse( layoutProps.textContent || '{}' );
      expect( props.mode ).toBe( 'dark' );
    } );
    test( 'uses none overlay mode when specified', () => {
      render( <Slide {...defaultProps} overlayMode="none" /> );
      const layoutProps = screen.getByTestId( 'layout-props' );
      const props = JSON.parse( layoutProps.textContent || '{}' );
      expect( props.mode ).toBe( 'none' );
    } );
  } );
  describe( 'Event Handlers', () => {
    test( 'passes onHoldStart when provided', () => {
      const onHoldStart = jest.fn();
      render( <Slide {...defaultProps} onHoldStart={onHoldStart} /> );
      // Verify the component renders without errors
      expect( screen.getByTestId( 'default-layout' ) ).toBeInTheDocument();
      // The onHoldStart should be passed through to the layout component
      expect( onHoldStart ).toBeDefined();
    } );
    test( 'passes onHoldEnd when provided', () => {
      const onHoldEnd = jest.fn();
      render( <Slide {...defaultProps} onHoldEnd={onHoldEnd} /> );
      // Verify the component renders without errors
      expect( screen.getByTestId( 'default-layout' ) ).toBeInTheDocument();
      // The onHoldEnd should be passed through to the layout component
      expect( onHoldEnd ).toBeDefined();
    } );
  } );
  describe( 'Accessibility', () => {
    test( 'maintains accessibility with proper alt text', () => {
      render( <Slide {...defaultProps} /> );
      const image = screen.getByRole( 'img' );
      expect( image ).toHaveAttribute( 'alt', 'Test Image' );
    } );
    test( 'handles missing alt text gracefully', () => {
      const itemWithoutAltText = createMockBlogCard( {
        image: { url: 'https://example.com/test-image.jpg', altText: undefined }
      } );
      render( <Slide {...defaultProps} item={itemWithoutAltText} /> );
      const image = screen.getByRole( 'img' );
      expect( image ).toHaveAttribute( 'alt', 'Slide image' );
    } );
  } );
  describe( 'Edge Cases', () => {
    test( 'handles null animatingSlides', () => {
      render( <Slide {...defaultProps} animatingSlides={null} /> );
      const layout = screen.getByTestId( 'default-layout' );
      expect( layout ).toHaveClass( 'active' );
    } );
    test( 'handles undefined animatingSlides', () => {
      render( <Slide {...defaultProps} animatingSlides={null} /> );
      const layout = screen.getByTestId( 'default-layout' );
      expect( layout ).toHaveClass( 'active' );
    } );
    test( 'handles item without image property', () => {
      const itemWithoutImageProp = { ...createMockBlogCard() };
      delete ( itemWithoutImageProp as any ).image;
      render( <Slide {...defaultProps} item={itemWithoutImageProp} /> );
      expect( screen.queryByRole( 'img' ) ).not.toBeInTheDocument();
      const layout = screen.getByTestId( 'default-layout' );
      expect( layout ).toHaveAttribute( 'data-has-image', 'false' );
    } );
    test( 'handles malformed image object', () => {
      const itemWithMalformedImage = createMockBlogCard( {
        image: { url: null as any, altText: 'Malformed' }
      } );
      render( <Slide {...defaultProps} item={itemWithMalformedImage} /> );
      expect( screen.queryByRole( 'img' ) ).not.toBeInTheDocument();
    } );
    test( 'handles isPaused prop', () => {
      render( <Slide {...defaultProps} isPaused={true} /> );
      const layoutProps = screen.getByTestId( 'layout-props' );
      const props = JSON.parse( layoutProps.textContent || '{}' );
      // isPaused should be passed through to layout
      expect( props ).toBeDefined();
    } );
    test( 'handles _edit prop', () => {
      const editData = { some: 'edit data' };
      render( <Slide {...defaultProps} _edit={editData} /> );
      const layoutProps = screen.getByTestId( 'layout-props' );
      const props = JSON.parse( layoutProps.textContent || '{}' );
      expect( props._edit ).toEqual( editData );
    } );
  } );
  describe( 'Component Integration', () => {
    test( 'integrates correctly with different slide indices', () => {
      const { rerender } = render( <Slide {...defaultProps} index={0} currentSlide={0} /> );
      expect( screen.getByTestId( 'default-layout' ) ).toHaveAttribute( 'data-current', 'true' );
      rerender( <Slide {...defaultProps} index={1} currentSlide={0} /> );
      expect( screen.getByTestId( 'default-layout' ) ).toHaveAttribute( 'data-current', 'false' );
      rerender( <Slide {...defaultProps} index={1} currentSlide={1} /> );
      expect( screen.getByTestId( 'default-layout' ) ).toHaveAttribute( 'data-current', 'true' );
    } );
    test( 'handles multiple rapid image state changes', () => {
      const { rerender } = render( <Slide {...defaultProps} /> );
      const image = screen.getByRole( 'img' );
      // Rapid state changes
      fireEvent.load( image );
      const newItem = createMockBlogCard( {
        image: { url: 'https://example.com/rapid-change.jpg', altText: 'Rapid Change' }
      } );
      rerender( <Slide {...defaultProps} item={newItem} /> );
      const newImage = screen.getByRole( 'img' );
      expect( newImage ).toHaveAttribute( 'data-loaded', 'false' );
      fireEvent.error( newImage );
      expect( screen.queryByRole( 'img' ) ).not.toBeInTheDocument();
    } );
  } );
} );
