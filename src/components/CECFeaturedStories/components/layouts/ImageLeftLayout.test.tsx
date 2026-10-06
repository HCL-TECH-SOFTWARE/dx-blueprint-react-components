import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageLeftLayout from './ImageLeftLayout';
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
describe( 'ImageLeftLayout', () => {
  const defaultProps: SlideLayoutProps = {
    item: {
      link: {
        label: 'Test Story',
        url: 'https://example.com',
      },
      excerpt: 'Test excerpt',
    },
    isCurrent: true,
    index: 0,
    totalSlides: 3,
    mode: 'light',
    hasImage: true,
    imageUrl: 'https://example.com/image.jpg',
    imageLoaded: true,
  };
  describe( 'Basic Rendering', () => {
    it( 'should render the slide with correct role and attributes', () => {
      render( <ImageLeftLayout {...defaultProps} /> );
      const slide = screen.getByRole( 'group' );
      expect( slide ).toHaveAttribute( 'aria-roledescription', 'slide' );
      expect( slide ).toHaveAttribute( 'data-layout', 'imageLeft' );
    } );
    it( 'should render with correct base classes', () => {
      render( <ImageLeftLayout {...defaultProps} /> );
      const slide = screen.getByRole( 'group' );
      expect( slide ).toHaveClass( 'cecFeaturedStories__slide', 'layout-imageLeft', 'has-image', 'overlay-light' );
    } );
    it( 'should render custom className when provided', () => {
      render( <ImageLeftLayout {...defaultProps} className="custom-class" /> );
      const slide = screen.getByRole( 'group' );
      expect( slide ).toHaveClass( 'cecFeaturedStories__slide', 'layout-imageLeft', 'has-image', 'custom-class' );
    } );
    it( 'should filter out empty className values', () => {
      render( <ImageLeftLayout {...defaultProps} className="" /> );
      const slide = screen.getByRole( 'group' );
      expect( slide.className ).toBe( 'cecFeaturedStories__slide layout-imageLeft has-image overlay-light' );
    } );
    it( 'should apply has-image class to mediaWrap when hasImage is true', () => {
      render( <ImageLeftLayout {...defaultProps} hasImage={true} /> );
      const mediaWrap = screen.getByRole( 'group' ).querySelector( '.cecFeaturedStories__mediaWrap' );
      expect( mediaWrap ).toHaveClass( 'has-image' );
    } );
    it( 'should not apply has-image class to mediaWrap when hasImage is false', () => {
      render( <ImageLeftLayout {...defaultProps} hasImage={false} /> );
      const mediaWrap = screen.getByRole( 'group' ).querySelector( '.cecFeaturedStories__mediaWrap' );
      expect( mediaWrap ).not.toHaveClass( 'has-image' );
    } );
  } );
  describe( 'Current State Handling', () => {
    it( 'should set aria-hidden to false when isCurrent is true', () => {
      render( <ImageLeftLayout {...defaultProps} isCurrent={true} /> );
      const slide = screen.getByRole( 'group' );
      expect( slide ).toHaveAttribute( 'aria-hidden', 'false' );
    } );
    it( 'should set aria-hidden to true when isCurrent is false', () => {
      render( <ImageLeftLayout {...defaultProps} isCurrent={false} /> );
      const slide = screen.getByRole( 'group', { hidden: true } );
      expect( slide ).toHaveAttribute( 'aria-hidden', 'true' );
    } );
  } );
  describe( 'Layout Styles', () => {
    it( 'should apply correct flex layout to slideInner', () => {
      render( <ImageLeftLayout {...defaultProps} /> );
      const slideInner = screen.getByRole( 'group' ).querySelector( '.cecFeaturedStories__slideInner' );
      const style = window.getComputedStyle( slideInner );
      expect( style.display ).toBe( 'flex' );
      expect( style.gap ).toBe( '1rem' );
      expect( style.height ).toBe( '100%' );
      expect( style.width ).toBe( '100%' );
    } );
  } );
  describe( 'Image Rendering', () => {
    it( 'should render image when hasImage is true and imageUrl is provided', () => {
      render( <ImageLeftLayout {...defaultProps} /> );
      const image = screen.getByRole( 'group' ).querySelector( 'img' );
      expect( image ).toBeInTheDocument();
      expect( image ).toHaveAttribute( 'src', 'https://example.com/image.jpg' );
      expect( image ).toHaveAttribute( 'alt', 'Test Story' );
    } );
    it( 'should render fallback when hasImage is false', () => {
      render( <ImageLeftLayout {...defaultProps} hasImage={false} /> );
      const image = screen.getByRole( 'group' ).querySelector( 'img' );
      expect( image ).not.toBeInTheDocument();
      const fallback = screen.getByRole( 'group' ).querySelector( '.cecFeaturedStories__defaultImage' );
      expect( fallback ).toBeInTheDocument();
      expect( fallback ).toHaveTextContent( 'No image available' );
    } );
  } );
  describe( 'Performance Optimizations', () => {
    it( 'should render mediaWrap with required inline styles', () => {
      render( <ImageLeftLayout {...defaultProps} /> );
      const mediaWrap = screen.getByRole( 'group' ).querySelector( '.cecFeaturedStories__mediaWrap' );
      expect( mediaWrap ).toBeInTheDocument();
      // Check that the element has some inline styles (indicating performance optimizations are applied)
      const styleAttr = mediaWrap.getAttribute( 'style' );
      expect( styleAttr ).toBeTruthy();
      expect( styleAttr ).toContain( 'transform' );
      expect( styleAttr ).toContain( 'will-change' );
    } );
    it( 'should render image with required inline styles', () => {
      render( <ImageLeftLayout {...defaultProps} /> );
      const image = screen.getByRole( 'group' ).querySelector( 'img' );
      expect( image ).toBeInTheDocument();
      // Check that the element has some inline styles (indicating performance optimizations are applied)
      const styleAttr = image.getAttribute( 'style' );
      expect( styleAttr ).toBeTruthy();
      expect( styleAttr ).toContain( 'transform' );
      expect( styleAttr ).toContain( 'will-change' );
    } );
  } );
  describe( 'Edit Mode', () => {
    it( 'should render edit button when _edit prop is provided', () => {
      const editProps = { id: 'test-edit', type: 'slide' };
      render( <ImageLeftLayout {...defaultProps} _edit={editProps} /> );
      expect( screen.getByTestId( 'edit-button' ) ).toBeInTheDocument();
    } );
    it( 'should not render edit button when _edit prop is not provided', () => {
      const { _edit, ...propsWithoutEdit } = defaultProps;
      render( <ImageLeftLayout {...propsWithoutEdit} /> );
      expect( screen.queryByTestId( 'edit-button' ) ).not.toBeInTheDocument();
    } );
  } );
  describe( 'Event Handlers', () => {
    it( 'should call getSlideEventHandlers with onHoldStart and onHoldEnd', () => {
      const onHoldStart = jest.fn();
      const onHoldEnd = jest.fn();
      const { getSlideEventHandlers } = require( './utils' );
      render( <ImageLeftLayout {...defaultProps} onHoldStart={onHoldStart} onHoldEnd={onHoldEnd} /> );
      expect( getSlideEventHandlers ).toHaveBeenCalledWith( onHoldStart, onHoldEnd );
    } );
  } );
  describe( 'Aria Label', () => {
    it( 'should use correct aria label', () => {
      const { getSlideAriaLabel } = require( './utils' );
      render( <ImageLeftLayout {...defaultProps} /> );
      expect( getSlideAriaLabel ).toHaveBeenCalledWith( 0, 3, 'Test Story' );
      const slide = screen.getByRole( 'group' );
      expect( slide ).toHaveAttribute( 'aria-label', 'Slide 1 of 3: Test Story' );
    } );
  } );
} );
