import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DefaultLayout from './DefaultLayout';
import { SlideLayoutProps } from './types';
// Mock dependencies
jest.mock( './SlideContent', () => {
  return function MockSlideContent( { item, textColor, mode, isImageLeft, isActive }: any ) {
    return (
      <div data-testid="slide-content">
        <span data-testid="content-title">{item.link?.label}</span>
        <span data-testid="content-mode">{mode}</span>
        <span data-testid="content-text-color">{textColor || 'default'}</span>
        <span data-testid="content-image-left">{isImageLeft.toString()}</span>
        <span data-testid="content-active">{isActive.toString()}</span>
      </div>
    );
  };
} );
jest.mock( '../../../../utilities/BasicComponent/BasicComponent', () => ( {
  renderEditButton: jest.fn( ( editProps ) => <button data-testid="edit-button">Edit</button> ),
} ) );
jest.mock( './utils', () => ( {
  getSlideEventHandlers: jest.fn( () => ( {
    'data-testid': 'event-handlers',
  } ) ),
  getSlideAriaLabel: jest.fn( ( index, total, label ) => `Slide ${index + 1} of ${total}${label ? ': ' + label : ''}` ),
} ) );
jest.mock( '../../constants', () => ( {
  DEFAULT_TEXT_COLOR_LIGHT: '#ffffff',
  DEFAULT_TEXT_COLOR_DARK: '#333333',
} ) );
describe( 'DefaultLayout', () => {
  const defaultProps: SlideLayoutProps = {
    item: {
      summary: 'Test summary',
      content: 'Test content',
      link: {
        label: 'Test Story',
        url: 'https://example.com',
      },
    },
    isCurrent: true,
    index: 0,
    totalSlides: 3,
    mode: 'light',
    hasImage: true,
    imageUrl: 'https://example.com/image.jpg',
    imageLoaded: true,
  };
  beforeEach( () => {
    jest.clearAllMocks();
  } );
  describe( 'Basic Rendering', () => {
    it( 'should render slide with correct structure', () => {
      render( <DefaultLayout {...defaultProps} /> );
      const slide = screen.getByRole( 'group' );
      expect( slide ).toBeInTheDocument();
      expect( slide ).toHaveAttribute( 'aria-roledescription', 'slide' );
      expect( slide ).toHaveAttribute( 'data-testid', 'event-handlers' );
    } );
    it( 'should render slide content', () => {
      render( <DefaultLayout {...defaultProps} /> );
      expect( screen.getByTestId( 'slide-content' ) ).toBeInTheDocument();
      expect( screen.getByTestId( 'content-title' ) ).toHaveTextContent( 'Test Story' );
      expect( screen.getByTestId( 'content-mode' ) ).toHaveTextContent( 'light' );
      expect( screen.getByTestId( 'content-active' ) ).toHaveTextContent( 'true' );
    } );
    it( 'should use correct aria label', () => {
      const { getSlideAriaLabel } = require( './utils' );
      render( <DefaultLayout {...defaultProps} /> );
      expect( getSlideAriaLabel ).toHaveBeenCalledWith( 0, 3, 'Test Story' );
      const slide = screen.getByRole( 'group' );
      expect( slide ).toHaveAttribute( 'aria-label', 'Slide 1 of 3: Test Story' );
    } );
  } );
  describe( 'Image Handling', () => {
    it( 'should handle hasImage true with imageUrl', () => {
      render( <DefaultLayout {...defaultProps} hasImage={true} imageUrl="https://example.com/image.jpg" /> );
      const slide = screen.getByRole( 'group' );
      expect( slide ).toHaveClass( 'has-image' );
      expect( slide ).not.toHaveClass( 'fallback' );
      const style = window.getComputedStyle( slide );
      expect( style.backgroundImage ).toContain( 'url(https://example.com/image.jpg)' );
    } );
    it( 'should handle hasImage false (fallback state)', () => {
      render( <DefaultLayout {...defaultProps} hasImage={false} /> );
      const slide = screen.getByRole( 'group' );
      expect( slide ).toHaveClass( 'has-image' );
      expect( slide ).toHaveClass( 'fallback' );
      const style = window.getComputedStyle( slide );
      // Empty string is the expected behavior for no background image
      expect( style.backgroundImage ).toBe( '' );
    } );
    it( 'should handle empty imageUrl with hasImage true', () => {
      render( <DefaultLayout {...defaultProps} hasImage={true} imageUrl="" /> );
      const slide = screen.getByRole( 'group' );
      expect( slide ).toHaveClass( 'has-image' );
      // Note: The actual implementation only sets fallback when hasImage is false
      expect( slide ).not.toHaveClass( 'fallback' );
    } );
    it( 'should handle null imageUrl with hasImage true', () => {
      render( <DefaultLayout {...defaultProps} hasImage={true} imageUrl={null as any} /> );
      const slide = screen.getByRole( 'group' );
      expect( slide ).toHaveClass( 'has-image' );
      // Note: The actual implementation only sets fallback when hasImage is false
      expect( slide ).not.toHaveClass( 'fallback' );
    } );
  } );
  describe( 'Mode Handling', () => {
    it( 'should render overlay for light mode', () => {
      render( <DefaultLayout {...defaultProps} mode="light" /> );
      const overlay = screen.getByRole( 'group' ).querySelector( '.cecFeaturedStories__overlay' );
      expect( overlay ).toBeInTheDocument();
      const style = window.getComputedStyle( overlay );
      expect( style.backgroundColor ).toBe( 'rgba(255, 255, 255, 0.2)' );
    } );
    it( 'should render overlay for dark mode', () => {
      render( <DefaultLayout {...defaultProps} mode="dark" /> );
      const overlay = screen.getByRole( 'group' ).querySelector( '.cecFeaturedStories__overlay' );
      expect( overlay ).toBeInTheDocument();
      const style = window.getComputedStyle( overlay );
      expect( style.backgroundColor ).toBe( 'rgba(0, 0, 0, 0.1)' );
    } );
    it( 'should not render overlay for none mode', () => {
      render( <DefaultLayout {...defaultProps} mode="none" /> );
      const overlay = screen.getByRole( 'group' ).querySelector( '.cecFeaturedStories__overlay' );
      expect( overlay ).not.toBeInTheDocument();
      const slide = screen.getByRole( 'group' );
      expect( slide ).toHaveAttribute( 'data-overlay-mode', 'none' );
    } );
    it( 'should set correct data-overlay-mode attribute', () => {
      render( <DefaultLayout {...defaultProps} mode="dark" /> );
      const slide = screen.getByRole( 'group' );
      expect( slide ).toHaveAttribute( 'data-overlay-mode', 'dark' );
    } );
  } );
  describe( 'Current State Handling', () => {
    it( 'should set aria-hidden to false when isCurrent is true', () => {
      render( <DefaultLayout {...defaultProps} isCurrent={true} /> );
      const slide = screen.getByRole( 'group' );
      expect( slide ).toHaveAttribute( 'aria-hidden', 'false' );
    } );
    it( 'should set aria-hidden to true when isCurrent is false', () => {
      render( <DefaultLayout {...defaultProps} isCurrent={false} /> );
      const slide = screen.getByRole( 'group', { hidden: true } );
      expect( slide ).toHaveAttribute( 'aria-hidden', 'true' );
    } );
  } );
  describe( 'Text Color Handling', () => {
    it( 'should pass custom textColor to SlideContent', () => {
      render( <DefaultLayout {...defaultProps} textColor="#ff0000" /> );
      expect( screen.getByTestId( 'content-text-color' ) ).toHaveTextContent( '#ff0000' );
    } );
    it( 'should pass undefined textColor to SlideContent when not provided', () => {
      const { textColor, ...propsWithoutTextColor } = defaultProps;
      render( <DefaultLayout {...propsWithoutTextColor} /> );
      expect( screen.getByTestId( 'content-text-color' ) ).toHaveTextContent( 'default' );
    } );
  } );
  describe( 'Edit Mode', () => {
    it( 'should render edit button when _edit prop is provided', () => {
      const editProps = { id: 'test-edit', type: 'slide' };
      render( <DefaultLayout {...defaultProps} _edit={editProps} /> );
      expect( screen.getByTestId( 'edit-button' ) ).toBeInTheDocument();
      expect( screen.getByRole( 'group' ).querySelector( '.edit-mode' ) ).toBeInTheDocument();
    } );
    it( 'should not render edit button when _edit prop is not provided', () => {
      const { _edit, ...propsWithoutEdit } = defaultProps;
      render( <DefaultLayout {...propsWithoutEdit} /> );
      expect( screen.queryByTestId( 'edit-button' ) ).not.toBeInTheDocument();
    } );
  } );
  describe( 'CSS Classes', () => {
    it( 'should apply default classes correctly', () => {
      render( <DefaultLayout {...defaultProps} /> );
      const slide = screen.getByRole( 'group' );
      expect( slide ).toHaveClass( 'cecFeaturedStories__slide', 'has-image' );
    } );
    it( 'should apply custom className', () => {
      render( <DefaultLayout {...defaultProps} className="custom-class" /> );
      const slide = screen.getByRole( 'group' );
      expect( slide ).toHaveClass( 'cecFeaturedStories__slide', 'has-image', 'custom-class' );
    } );
    it( 'should filter out empty className values', () => {
      render( <DefaultLayout {...defaultProps} className="" /> );
      const slide = screen.getByRole( 'group' );
      expect( slide.className ).toBe( 'cecFeaturedStories__slide has-image' );
    } );
    it( 'should apply fallback class when hasImage is false', () => {
      render( <DefaultLayout {...defaultProps} hasImage={false} /> );
      const slide = screen.getByRole( 'group' );
      expect( slide ).toHaveClass( 'cecFeaturedStories__slide', 'has-image', 'fallback' );
    } );
  } );
  describe( 'Background Style', () => {
    it( 'should set correct background style properties', () => {
      render( <DefaultLayout {...defaultProps} imageUrl="https://example.com/test.jpg" /> );
      const slide = screen.getByRole( 'group' );
      const style = window.getComputedStyle( slide );
      expect( style.backgroundSize ).toBe( 'cover' );
      expect( style.backgroundPosition ).toBe( 'center' );
      expect( style.backgroundRepeat ).toBe( 'no-repeat' );
    } );
    it( 'should handle empty background image in fallback mode', () => {
      render( <DefaultLayout {...defaultProps} hasImage={false} /> );
      const slide = screen.getByRole( 'group' );
      const style = window.getComputedStyle( slide );
      // Empty string is the expected behavior for no background image
      expect( style.backgroundImage ).toBe( '' );
    } );
  } );
  describe( 'SlideContent Integration', () => {
    it( 'should pass correct props to SlideContent', () => {
      render( <DefaultLayout {...defaultProps} textColor="#custom-color" mode="dark" /> );
      expect( screen.getByTestId( 'content-title' ) ).toHaveTextContent( 'Test Story' );
      expect( screen.getByTestId( 'content-mode' ) ).toHaveTextContent( 'dark' );
      expect( screen.getByTestId( 'content-text-color' ) ).toHaveTextContent( '#custom-color' );
      expect( screen.getByTestId( 'content-image-left' ) ).toHaveTextContent( 'false' );
      expect( screen.getByTestId( 'content-active' ) ).toHaveTextContent( 'true' );
    } );
    it( 'should pass isCurrent as isActive to SlideContent', () => {
      render( <DefaultLayout {...defaultProps} isCurrent={false} /> );
      expect( screen.getByTestId( 'content-active' ) ).toHaveTextContent( 'false' );
    } );
  } );
  describe( 'Overlay Positioning', () => {
    it( 'should position overlay correctly with absolute positioning', () => {
      render( <DefaultLayout {...defaultProps} mode="light" /> );
      const overlay = screen.getByRole( 'group' ).querySelector( '.cecFeaturedStories__overlay' );
      const style = window.getComputedStyle( overlay );
      expect( style.position ).toBe( 'absolute' );
      expect( style.top ).toBe( '0px' );
      expect( style.left ).toBe( '0px' );
      expect( style.right ).toBe( '0px' );
      expect( style.bottom ).toBe( '0px' );
      expect( style.zIndex ).toBe( '1' );
      expect( style.pointerEvents ).toBe( 'none' );
    } );
  } );
  describe( 'Content Wrapper', () => {
    it( 'should wrap content in relative positioned div with correct z-index', () => {
      render( <DefaultLayout {...defaultProps} /> );
      const contentWrapper = screen.getByRole( 'group' ).children[1];
      const style = window.getComputedStyle( contentWrapper );
      expect( style.position ).toBe( 'relative' );
      expect( style.zIndex ).toBe( '2' );
    } );
  } );
} );
