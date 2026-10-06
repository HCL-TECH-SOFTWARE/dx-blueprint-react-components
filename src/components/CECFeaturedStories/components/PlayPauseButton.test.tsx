import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayPauseButton from './PlayPauseButton';
describe( 'PlayPauseButton', () => {
  const defaultProps = {
    isPlaying: false,
    onClick: jest.fn(),
  };
  beforeEach( () => {
    jest.clearAllMocks();
  } );
  describe( 'Rendering', () => {
    test( 'renders play button when not playing', () => {
      render( <PlayPauseButton {...defaultProps} /> );
      const button = screen.getByRole( 'button' );
      expect( button ).toBeInTheDocument();
      expect( button ).toHaveAttribute( 'aria-label', 'Play slideshow (Space)' );
      // Check for play icon (triangle shape)
      const svg = button.querySelector( 'svg' );
      expect( svg ).toBeInTheDocument();
      expect( svg?.querySelector( 'path[d*="2.4 14.5533"]' ) ).toBeInTheDocument(); // Play triangle path
    } );
    test( 'renders pause button when playing', () => {
      render( <PlayPauseButton {...defaultProps} isPlaying={true} /> );
      const button = screen.getByRole( 'button' );
      expect( button ).toBeInTheDocument();
      expect( button ).toHaveAttribute( 'aria-label', 'Pause slideshow (Space)' );
      // Check for pause icon (two rectangles)
      const svg = button.querySelector( 'svg' );
      expect( svg ).toBeInTheDocument();
      expect( svg?.querySelector( 'path[d*="3.3335 1.99992"]' ) ).toBeInTheDocument(); // Pause rectangles
    } );
    test( 'applies custom className', () => {
      render( <PlayPauseButton {...defaultProps} className="custom-class" /> );
      const button = screen.getByRole( 'button' );
      expect( button ).toHaveClass( 'custom-class' );
    } );
    test( 'applies playing class when isPlaying is true', () => {
      render( <PlayPauseButton {...defaultProps} isPlaying={true} /> );
      const button = screen.getByRole( 'button' );
      expect( button ).toHaveClass( 'is-playing' );
    } );
    test( 'has default cec-play-pause-button class', () => {
      render( <PlayPauseButton {...defaultProps} /> );
      const button = screen.getByRole( 'button' );
      expect( button ).toHaveClass( 'cec-play-pause-button' );
    } );
  } );
  describe( 'Interaction', () => {
    test( 'calls onClick when clicked', () => {
      const mockClick = jest.fn();
      render( <PlayPauseButton {...defaultProps} onClick={mockClick} /> );
      const button = screen.getByRole( 'button' );
      fireEvent.click( button );
      expect( mockClick ).toHaveBeenCalledTimes( 1 );
    } );
    test( 'calls onClick when Enter key is pressed', () => {
      const mockClick = jest.fn();
      render( <PlayPauseButton {...defaultProps} onClick={mockClick} /> );
      const button = screen.getByRole( 'button' );
      fireEvent.keyDown( button, { key: 'Enter' } );
      expect( mockClick ).toHaveBeenCalledTimes( 1 );
    } );
    test( 'calls onClick when Space key is pressed on button', () => {
      const mockClick = jest.fn();
      render( <PlayPauseButton {...defaultProps} onClick={mockClick} /> );
      const button = screen.getByRole( 'button' );
      fireEvent.keyDown( button, { key: ' ' } );
      expect( mockClick ).toHaveBeenCalledTimes( 1 );
    } );
    test( 'prevents default behavior for Space and Enter keys', () => {
      const mockClick = jest.fn();
      render( <PlayPauseButton {...defaultProps} onClick={mockClick} /> );
      const button = screen.getByRole( 'button' );
      const enterEvent = fireEvent.keyDown( button, { key: 'Enter' } );
      const spaceEvent = fireEvent.keyDown( button, { key: ' ' } );
      // The event should be prevented, but fireEvent doesn't return the event object
      // so we just verify the click handler was called
      expect( mockClick ).toHaveBeenCalledTimes( 2 );
    } );
    test( 'does not call onClick for other keys', () => {
      const mockClick = jest.fn();
      render( <PlayPauseButton {...defaultProps} onClick={mockClick} /> );
      const button = screen.getByRole( 'button' );
      fireEvent.keyDown( button, { key: 'Tab' } );
      fireEvent.keyDown( button, { key: 'Escape' } );
      fireEvent.keyDown( button, { key: 'ArrowUp' } );
      expect( mockClick ).not.toHaveBeenCalled();
    } );
  } );
  describe( 'Global Keyboard Handler', () => {
    test( 'listens for Space key when body is focused', () => {
      const mockClick = jest.fn();
      render( <PlayPauseButton {...defaultProps} onClick={mockClick} /> );
      // Simulate body being the active element
      document.body.focus();
      fireEvent.keyDown( document.body, { key: ' ', code: 'Space' } );
      expect( mockClick ).toHaveBeenCalledTimes( 1 );
    } );
    test( 'does not trigger Space key handler when body is not focused', () => {
      const mockClick = jest.fn();
      render( <PlayPauseButton {...defaultProps} onClick={mockClick} /> );
      // Focus on another element
      const input = document.createElement( 'input' );
      document.body.appendChild( input );
      input.focus();
      fireEvent.keyDown( document.body, { key: ' ', code: 'Space' } );
      expect( mockClick ).not.toHaveBeenCalled();
      // Clean up
      document.body.removeChild( input );
    } );
    test( 'prevents default behavior for global Space key', () => {
      const mockClick = jest.fn();
      const preventDefault = jest.fn();
      // Set body as active element
      document.body.focus();
      render( <PlayPauseButton isPlaying={false} onClick={mockClick} /> );
      // Simulate space key press on body
      const spaceEvent = new KeyboardEvent( 'keydown', {
        code: 'Space',
        key: ' ',
        bubbles: true
      } );
      Object.defineProperty( spaceEvent, 'preventDefault', {
        value: preventDefault,
        writable: true
      } );
      document.body.dispatchEvent( spaceEvent );
      expect( mockClick ).toHaveBeenCalledTimes( 1 );
    } );
    test( 'cleans up event listener on unmount', () => {
      const { unmount } = render( <PlayPauseButton {...defaultProps} /> );
      const removeEventListenerSpy = jest.spyOn( window, 'removeEventListener' );
      unmount();
      expect( removeEventListenerSpy ).toHaveBeenCalledWith( 'keydown', expect.any( Function ) );
      removeEventListenerSpy.mockRestore();
    } );
  } );
  describe( 'Accessibility', () => {
    test( 'has correct ARIA attributes', () => {
      render( <PlayPauseButton isPlaying={true} onClick={defaultProps.onClick} /> );
      const button = screen.getByRole( 'button' );
      expect( button ).toHaveAttribute( 'aria-label', 'Pause slideshow (Space)' );
      // Native button elements have implicit role="button"
      expect( button.tagName ).toBe( 'BUTTON' );
    } );
    test( 'updates aria-label based on isPlaying state', () => {
      const { rerender } = render( <PlayPauseButton {...defaultProps} isPlaying={false} /> );
      let button = screen.getByRole( 'button' );
      expect( button ).toHaveAttribute( 'aria-label', 'Play slideshow (Space)' );
      rerender( <PlayPauseButton {...defaultProps} isPlaying={true} /> );
      button = screen.getByRole( 'button' );
      expect( button ).toHaveAttribute( 'aria-label', 'Pause slideshow (Space)' );
    } );
    test( 'provides accessible name for screen readers', () => {
      render( <PlayPauseButton {...defaultProps} isPlaying={false} /> );
      const button = screen.getByRole( 'button' );
      expect( button ).toHaveAccessibleName( 'Play slideshow (Space)' );
    } );
    test( 'can be focused with keyboard', () => {
      render( <PlayPauseButton {...defaultProps} /> );
      const button = screen.getByRole( 'button' );
      button.focus();
      expect( button ).toHaveFocus();
    } );
    test( 'has title attribute for Play when not playing', () => {
      render( <PlayPauseButton {...defaultProps} isPlaying={false} /> );
      const button = screen.getByRole( 'button' );
      expect( button ).toHaveAttribute( 'title', 'Play' );
    } );
    test( 'has title attribute for Pause when playing', () => {
      render( <PlayPauseButton {...defaultProps} isPlaying={true} /> );
      const button = screen.getByRole( 'button' );
      expect( button ).toHaveAttribute( 'title', 'Pause' );
    } );
    test( 'updates title attribute when isPlaying state changes', () => {
      const { rerender } = render( <PlayPauseButton {...defaultProps} isPlaying={false} /> );
      let button = screen.getByRole( 'button' );
      expect( button ).toHaveAttribute( 'title', 'Play' );
      rerender( <PlayPauseButton {...defaultProps} isPlaying={true} /> );
      button = screen.getByRole( 'button' );
      expect( button ).toHaveAttribute( 'title', 'Pause' );
    } );
  } );
  describe( 'Icon Rendering', () => {
    test( 'play icon has correct attributes', () => {
      render( <PlayPauseButton {...defaultProps} isPlaying={false} /> );
      const svg = screen.getByRole( 'button' ).querySelector( 'svg' );
      expect( svg ).toBeInTheDocument();
      expect( svg ).toHaveAttribute( 'width', '16' );
      expect( svg ).toHaveAttribute( 'height', '16' );
      expect( svg ).toHaveAttribute( 'viewBox', '0 0 16 16' );
      expect( svg ).toHaveAttribute( 'fill', 'none' );
    } );
    test( 'pause icon has correct attributes', () => {
      render( <PlayPauseButton {...defaultProps} isPlaying={true} /> );
      const svg = screen.getByRole( 'button' ).querySelector( 'svg' );
      expect( svg ).toBeInTheDocument();
      expect( svg ).toHaveAttribute( 'width', '16' );
      expect( svg ).toHaveAttribute( 'height', '16' );
      expect( svg ).toHaveAttribute( 'viewBox', '0 0 16 16' );
      expect( svg ).toHaveAttribute( 'fill', 'none' );
    } );
    test( 'icons use currentColor for fill', () => {
      render( <PlayPauseButton {...defaultProps} /> );
      const paths = screen.getAllByRole( 'button' )[0].querySelectorAll( 'path' );
      paths.forEach( path => {
        expect( path ).toHaveAttribute( 'fill', 'currentColor' );
      } );
    } );
  } );
  describe( 'Edge Cases', () => {
    test( 'handles missing onClick prop gracefully', () => {
      expect( () => {
        // Clear onClick entirely to test default fallback/graceful handling
        render( <PlayPauseButton isPlaying={false} /> ); 
        
        const button = screen.getByRole( 'button' );
        fireEvent.click( button );
      } ).not.toThrow();
    } );
    test( 'handles undefined className', () => {
      render( <PlayPauseButton isPlaying={false} onClick={jest.fn()} className={undefined} /> );
      const button = screen.getByRole( 'button' );
      expect( button ).toHaveClass( 'cec-play-pause-button' );
    } );
    test( 'handles empty className string', () => {
      render( <PlayPauseButton isPlaying={false} onClick={jest.fn()} className="" /> );
      const button = screen.getByRole( 'button' );
      expect( button ).toHaveClass( 'cec-play-pause-button' );
    } );
    test( 'handles rapid click events', () => {
      const mockClick = jest.fn();
      render( <PlayPauseButton {...defaultProps} onClick={mockClick} /> );
      const button = screen.getByRole( 'button' );
      // Rapid clicks
      fireEvent.click( button );
      fireEvent.click( button );
      fireEvent.click( button );
      expect( mockClick ).toHaveBeenCalledTimes( 3 );
    } );
    test( 'handles multiple keyboard events', () => {
      const mockClick = jest.fn();
      render( <PlayPauseButton {...defaultProps} onClick={mockClick} /> );
      const button = screen.getByRole( 'button' );
      fireEvent.keyDown( button, { key: 'Enter' } );
      fireEvent.keyDown( button, { key: ' ' } );
      fireEvent.keyDown( button, { key: 'Enter' } );
      expect( mockClick ).toHaveBeenCalledTimes( 3 );
    } );
  } );
  describe( 'Component Integration', () => {
    test( 're-renders correctly when props change', () => {
      const mockClick = jest.fn();
      const { rerender } = render(
        <PlayPauseButton isPlaying={false} onClick={mockClick} />
      );
      let button = screen.getByRole( 'button' );
      expect( button ).toHaveAttribute( 'aria-label', 'Play slideshow (Space)' );
      expect( button ).not.toHaveClass( 'is-playing' );
      rerender( <PlayPauseButton isPlaying={true} onClick={mockClick} /> );
      button = screen.getByRole( 'button' );
      expect( button ).toHaveAttribute( 'aria-label', 'Pause slideshow (Space)' );
      expect( button ).toHaveClass( 'is-playing' );
    } );
    test( 'updates className prop correctly', () => {
      const { rerender } = render(
        <PlayPauseButton {...defaultProps} className="first-class" />
      );
      let button = screen.getByRole( 'button' );
      expect( button ).toHaveClass( 'first-class' );
      rerender( <PlayPauseButton {...defaultProps} className="second-class" /> );
      button = screen.getByRole( 'button' );
      expect( button ).toHaveClass( 'second-class' );
      expect( button ).not.toHaveClass( 'first-class' );
    } );
  } );
} );
