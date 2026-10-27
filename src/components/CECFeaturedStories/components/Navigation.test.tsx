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
import Navigation from './Navigation';
describe( 'Navigation', () => {
  const defaultProps = {
    onPrev: jest.fn(),
    onNext: jest.fn(),
    disabled: false,
    className: '',
    dir: 'ltr' as const
  };
  beforeEach( () => {
    jest.clearAllMocks();
  } );
  test( 'renders navigation buttons when not disabled', () => {
    render( <Navigation {...defaultProps} /> );
    expect( screen.getByLabelText( 'Previous slide' ) ).toBeInTheDocument();
    expect( screen.getByLabelText( 'Next slide' ) ).toBeInTheDocument();
  } );
  test( 'renders with aria-disabled when disabled', () => {
    render( <Navigation {...defaultProps} disabled={true} /> );
    const prevButton = screen.getByLabelText( 'Previous slide' );
    const nextButton = screen.getByLabelText( 'Next slide' );
    expect( prevButton ).toHaveAttribute( 'aria-disabled', 'true' );
    expect( nextButton ).toHaveAttribute( 'aria-disabled', 'true' );
    expect( prevButton ).toHaveAttribute( 'tabIndex', '-1' );
    expect( nextButton ).toHaveAttribute( 'tabIndex', '-1' );
  } );
  test( 'calls onPrev when previous button is clicked', () => {
    render( <Navigation {...defaultProps} /> );
    const prevButton = screen.getByLabelText( 'Previous slide' );
    fireEvent.click( prevButton );
    expect( defaultProps.onPrev ).toHaveBeenCalledTimes( 1 );
    expect( defaultProps.onNext ).not.toHaveBeenCalled();
  } );
  test( 'calls onNext when next button is clicked', () => {
    render( <Navigation {...defaultProps} /> );
    const nextButton = screen.getByLabelText( 'Next slide' );
    fireEvent.click( nextButton );
    expect( defaultProps.onNext ).toHaveBeenCalledTimes( 1 );
    expect( defaultProps.onPrev ).not.toHaveBeenCalled();
  } );
  test( 'prevents default behavior and stops propagation', () => {
    const mockPreventDefault = jest.fn();
    const mockStopPropagation = jest.fn();
    render( <Navigation {...defaultProps} /> );
    const prevButton = screen.getByLabelText( 'Previous slide' );
    // Create a synthetic event
    const event = new MouseEvent( 'click', {
      bubbles: true,
      cancelable: true,
      view: window
    } );
    // Mock the preventDefault and stopPropagation methods
    event.preventDefault = mockPreventDefault;
    event.stopPropagation = mockStopPropagation;
    // Dispatch the event
    prevButton.dispatchEvent( event );
    expect( mockPreventDefault ).toHaveBeenCalled();
    expect( mockStopPropagation ).toHaveBeenCalled();
  } );
  test( 'does not call handlers when disabled', () => {
    render( <Navigation {...defaultProps} disabled={true} /> );
    const prevButton = screen.getByLabelText( 'Previous slide' );
    const nextButton = screen.getByLabelText( 'Next slide' );
    fireEvent.click( prevButton );
    fireEvent.click( nextButton );
    expect( defaultProps.onPrev ).not.toHaveBeenCalled();
    expect( defaultProps.onNext ).not.toHaveBeenCalled();
  } );
  test( 'handles RTL direction correctly', () => {
    render( <Navigation {...defaultProps} dir="rtl" /> );
    const prevButton = screen.getByLabelText( 'Next slide' ); // In RTL, prev button shows "Next slide"
    const nextButton = screen.getByLabelText( 'Previous slide' ); // In RTL, next button shows "Previous slide"
    fireEvent.click( prevButton );
    expect( defaultProps.onNext ).toHaveBeenCalledTimes( 1 );
    fireEvent.click( nextButton );
    expect( defaultProps.onPrev ).toHaveBeenCalledTimes( 1 );
  } );
  test( 'applies custom className', () => {
    const customClass = 'custom-nav-class';
    render( <Navigation {...defaultProps} className={customClass} /> );
    const prevButton = screen.getByLabelText( 'Previous slide' );
    const nextButton = screen.getByLabelText( 'Next slide' );
    expect( prevButton ).toHaveClass( 'custom-nav-class' );
    expect( nextButton ).toHaveClass( 'custom-nav-class' );
  } );
  test( 'has correct accessibility attributes', () => {
    render( <Navigation {...defaultProps} /> );
    const prevButton = screen.getByLabelText( 'Previous slide' );
    const nextButton = screen.getByLabelText( 'Next slide' );
    expect( prevButton ).toHaveAttribute( 'title', 'Previous slide' );
    expect( nextButton ).toHaveAttribute( 'title', 'Next slide' );
    expect( prevButton ).toHaveAttribute( 'tabIndex', '0' );
    expect( nextButton ).toHaveAttribute( 'tabIndex', '0' );
    expect( prevButton ).toHaveAttribute( 'aria-disabled', 'false' );
    expect( nextButton ).toHaveAttribute( 'aria-disabled', 'false' );
  } );
  test( 'renders with explicitly false disabled prop', () => {
    render( <Navigation {...defaultProps} disabled={false} /> );
    const prevButton = screen.getByLabelText( 'Previous slide' );
    const nextButton = screen.getByLabelText( 'Next slide' );
    expect( prevButton ).toHaveAttribute( 'aria-disabled', 'false' );
    expect( nextButton ).toHaveAttribute( 'aria-disabled', 'false' );
    expect( prevButton ).toHaveAttribute( 'tabIndex', '0' );
    expect( nextButton ).toHaveAttribute( 'tabIndex', '0' );
  } );
  test( 'renders SVG icons', () => {
    render( <Navigation {...defaultProps} /> );
    const prevButton = screen.getByLabelText( 'Previous slide' );
    const nextButton = screen.getByLabelText( 'Next slide' );
    expect( prevButton.querySelector( 'svg' ) ).toBeInTheDocument();
    expect( nextButton.querySelector( 'svg' ) ).toBeInTheDocument();
    expect( prevButton.querySelector( 'path' ) ).toBeInTheDocument();
    expect( nextButton.querySelector( 'path' ) ).toBeInTheDocument();
  } );
} );
