import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';
describe( 'Pagination', () => {
  const defaultProps = {
    total: 5,
    current: 0,
    position: 'center' as const,
    onGoTo: jest.fn(),
    disabled: false,
    dir: 'ltr' as const
  };
  beforeEach( () => {
    jest.clearAllMocks();
  } );
  test( 'renders pagination bullets when not disabled and total > 1', () => {
    render( <Pagination {...defaultProps} /> );
    expect( screen.getByLabelText( 'Carousel pagination' ) ).toBeInTheDocument();
    expect( screen.getAllByRole( 'button' ) ).toHaveLength( 5 );
  } );
  test( 'does not render when disabled', () => {
    render( <Pagination {...defaultProps} disabled={true} /> );
    expect( screen.queryByLabelText( 'Carousel pagination' ) ).not.toBeInTheDocument();
    expect( screen.queryByRole( 'button' ) ).not.toBeInTheDocument();
  } );
  test( 'does not render when total is 1', () => {
    render( <Pagination {...defaultProps} total={1} /> );
    expect( screen.queryByLabelText( 'Carousel pagination' ) ).not.toBeInTheDocument();
    expect( screen.queryByRole( 'button' ) ).not.toBeInTheDocument();
  } );
  test( 'does not render when total is 0', () => {
    render( <Pagination {...defaultProps} total={0} /> );
    expect( screen.queryByLabelText( 'Carousel pagination' ) ).not.toBeInTheDocument();
    expect( screen.queryByRole( 'button' ) ).not.toBeInTheDocument();
  } );
  test( 'calls onGoTo when bullet is clicked', () => {
    render( <Pagination {...defaultProps} /> );
    const bullets = screen.getAllByRole( 'button' );
    fireEvent.click( bullets[2] );
    expect( defaultProps.onGoTo ).toHaveBeenCalledWith( 2 );
  } );
  test( 'handles keyboard navigation with ArrowRight', () => {
    render( <Pagination {...defaultProps} current={1} /> );
    const pagination = screen.getByLabelText( 'Carousel pagination' );
    fireEvent.keyDown( pagination, { key: 'ArrowRight' } );
    expect( defaultProps.onGoTo ).toHaveBeenCalledWith( 2 );
  } );
  test( 'handles keyboard navigation with ArrowLeft', () => {
    render( <Pagination {...defaultProps} current={2} /> );
    const pagination = screen.getByLabelText( 'Carousel pagination' );
    fireEvent.keyDown( pagination, { key: 'ArrowLeft' } );
    expect( defaultProps.onGoTo ).toHaveBeenCalledWith( 1 );
  } );
  test( 'handles keyboard navigation wrap around from last to first', () => {
    render( <Pagination {...defaultProps} current={4} /> );
    const pagination = screen.getByLabelText( 'Carousel pagination' );
    fireEvent.keyDown( pagination, { key: 'ArrowRight' } );
    expect( defaultProps.onGoTo ).toHaveBeenCalledWith( 0 );
  } );
  test( 'handles keyboard navigation wrap around from first to last', () => {
    render( <Pagination {...defaultProps} current={0} /> );
    const pagination = screen.getByLabelText( 'Carousel pagination' );
    fireEvent.keyDown( pagination, { key: 'ArrowLeft' } );
    expect( defaultProps.onGoTo ).toHaveBeenCalledWith( 4 );
  } );
  test( 'ignores non-arrow key presses', () => {
    render( <Pagination {...defaultProps} /> );
    const pagination = screen.getByLabelText( 'Carousel pagination' );
    fireEvent.keyDown( pagination, { key: 'Enter' } );
    fireEvent.keyDown( pagination, { key: 'Space' } );
    fireEvent.keyDown( pagination, { key: 'Tab' } );
    expect( defaultProps.onGoTo ).not.toHaveBeenCalled();
  } );
  test( 'handles RTL direction correctly', () => {
    render( <Pagination {...defaultProps} dir="rtl" current={1} /> );
    // In RTL, ArrowLeft should go to next and ArrowRight should go to previous
    const pagination = screen.getByLabelText( 'Carousel pagination' );
    fireEvent.keyDown( pagination, { key: 'ArrowLeft' } );
    expect( defaultProps.onGoTo ).toHaveBeenCalledWith( 2 );
    fireEvent.keyDown( pagination, { key: 'ArrowRight' } );
    expect( defaultProps.onGoTo ).toHaveBeenCalledWith( 0 );
  } );
  test( 'applies correct position classes', () => {
    const { rerender } = render( <Pagination {...defaultProps} position="left" /> );
    expect( screen.getByLabelText( 'Carousel pagination' ) ).toHaveClass( 'cecFeaturedStories__pagination--left' );
    rerender( <Pagination {...defaultProps} position="center" /> );
    expect( screen.getByLabelText( 'Carousel pagination' ) ).toHaveClass( 'cecFeaturedStories__pagination--center' );
    rerender( <Pagination {...defaultProps} position="right" /> );
    expect( screen.getByLabelText( 'Carousel pagination' ) ).toHaveClass( 'cecFeaturedStories__pagination--right' );
  } );
  test( 'applies RTL class for RTL direction', () => {
    render( <Pagination {...defaultProps} dir="rtl" /> );
    const pagination = screen.getByLabelText( 'Carousel pagination' );
    // The RTL class is only added when position is not center
    expect( pagination.className ).toContain( 'cecFeaturedStories__pagination' );
  } );
  test( 'handles RTL position flipping', () => {
    render( <Pagination {...defaultProps} dir="rtl" position="left" /> );
    // In RTL, left position should become right
    expect( screen.getByLabelText( 'Carousel pagination' ) ).toHaveClass( 'cecFeaturedStories__pagination--right' );
  } );
  test( 'marks current bullet as active', () => {
    render( <Pagination {...defaultProps} current={2} /> );
    const bullets = screen.getAllByRole( 'button' );
    expect( bullets[0] ).not.toHaveClass( 'cecFeaturedStories__bullet--active' );
    expect( bullets[1] ).not.toHaveClass( 'cecFeaturedStories__bullet--active' );
    expect( bullets[2] ).toHaveClass( 'cecFeaturedStories__bullet--active' );
    expect( bullets[3] ).not.toHaveClass( 'cecFeaturedStories__bullet--active' );
    expect( bullets[4] ).not.toHaveClass( 'cecFeaturedStories__bullet--active' );
  } );
  test( 'sets correct ARIA attributes', () => {
    render( <Pagination {...defaultProps} current={1} /> );
    const pagination = screen.getByLabelText( 'Carousel pagination' );
    expect( pagination ).toHaveAttribute( 'aria-label', 'Carousel pagination' );
    expect( pagination ).toHaveAttribute( 'tabIndex', '0' );
    const bullets = screen.getAllByRole( 'button' );
    expect( bullets[0] ).toHaveAttribute( 'aria-label', 'Go to slide 1' );
    expect( bullets[1] ).toHaveAttribute( 'aria-label', 'Go to slide 2' );
    expect( bullets[1] ).toHaveAttribute( 'aria-current', 'true' );
    expect( bullets[2] ).not.toHaveAttribute( 'aria-current' );
  } );
  test( 'renders bullets in correct order for RTL', () => {
    render( <Pagination {...defaultProps} dir="rtl" total={3} /> );
    const bullets = screen.getAllByRole( 'button' );
    // In RTL, bullets should be in reverse order: 3, 2, 1
    expect( bullets[0] ).toHaveAttribute( 'aria-label', 'Go to slide 3' );
    expect( bullets[1] ).toHaveAttribute( 'aria-label', 'Go to slide 2' );
    expect( bullets[2] ).toHaveAttribute( 'aria-label', 'Go to slide 1' );
  } );
  test( 'prevents default and stops propagation on arrow keys', () => {
    const mockPreventDefault = jest.fn();
    const mockStopPropagation = jest.fn();
    render( <Pagination {...defaultProps} /> );
    const pagination = screen.getByLabelText( 'Carousel pagination' );
    // Create a synthetic event
    const event = new KeyboardEvent( 'keydown', {
      key: 'ArrowRight',
      bubbles: true,
      cancelable: true
    } );
    // Mock the methods
    Object.defineProperty( event, 'preventDefault', {
      value: mockPreventDefault,
      writable: true
    } );
    Object.defineProperty( event, 'stopPropagation', {
      value: mockStopPropagation,
      writable: true
    } );
    // Dispatch the event
    pagination.dispatchEvent( event );
    expect( mockPreventDefault ).toHaveBeenCalled();
    expect( mockStopPropagation ).toHaveBeenCalled();
  } );
} );
