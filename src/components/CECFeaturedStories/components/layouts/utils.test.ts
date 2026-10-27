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
import {
  getSlideEventHandlers,
  createMarkup,
  getTextColor,
  getTextShadow,
  getSlideAriaLabel,
  getSlideBaseStyles,
} from './utils';
// Mock the cec-utils dependency
jest.mock( '../../../../utilities/cec-utils', () => ( {
  decodeHtmlEntities: jest.fn( ( html: string ) => html ),
} ) );
// Mock the constants
jest.mock( '../../constants', () => ( {
  DEFAULT_TEXT_COLOR_LIGHT: '#ffffff',
  DEFAULT_TEXT_COLOR_DARK: '#272833',
} ) );
describe( 'CECFeaturedStories Layout Utils', () => {
  beforeEach( () => {
    jest.clearAllMocks();
  } );
  describe( 'getSlideEventHandlers', () => {
    it( 'should return all event handlers when both callbacks are provided', () => {
      const onHoldStart = jest.fn();
      const onHoldEnd = jest.fn();
      const handlers = getSlideEventHandlers( onHoldStart, onHoldEnd );
      expect( handlers ).toEqual( {
        onPointerDown: onHoldStart,
        onPointerUp: onHoldEnd,
        onPointerCancel: onHoldEnd,
        onMouseDown: onHoldStart,
        onMouseUp: onHoldEnd,
        onMouseLeave: onHoldEnd,
        onTouchStart: onHoldStart,
        onTouchEnd: onHoldEnd,
        onTouchCancel: onHoldEnd,
      } );
    } );
    it( 'should return handlers with undefined when no callbacks are provided', () => {
      const handlers = getSlideEventHandlers();
      expect( handlers ).toEqual( {
        onPointerDown: undefined,
        onPointerUp: undefined,
        onPointerCancel: undefined,
        onMouseDown: undefined,
        onMouseUp: undefined,
        onMouseLeave: undefined,
        onTouchStart: undefined,
        onTouchEnd: undefined,
        onTouchCancel: undefined,
      } );
    } );
    it( 'should return handlers with only onHoldStart provided', () => {
      const onHoldStart = jest.fn();
      const handlers = getSlideEventHandlers( onHoldStart );
      expect( handlers ).toEqual( {
        onPointerDown: onHoldStart,
        onPointerUp: undefined,
        onPointerCancel: undefined,
        onMouseDown: onHoldStart,
        onMouseUp: undefined,
        onMouseLeave: undefined,
        onTouchStart: onHoldStart,
        onTouchEnd: undefined,
        onTouchCancel: undefined,
      } );
    } );
    it( 'should return handlers with only onHoldEnd provided', () => {
      const onHoldEnd = jest.fn();
      const handlers = getSlideEventHandlers( undefined, onHoldEnd );
      expect( handlers ).toEqual( {
        onPointerDown: undefined,
        onPointerUp: onHoldEnd,
        onPointerCancel: onHoldEnd,
        onMouseDown: undefined,
        onMouseUp: onHoldEnd,
        onMouseLeave: onHoldEnd,
        onTouchStart: undefined,
        onTouchEnd: onHoldEnd,
        onTouchCancel: onHoldEnd,
      } );
    } );
  } );
  describe( 'createMarkup', () => {
    it( 'should return empty markup when html is empty string', () => {
      const result = createMarkup( '' );
      expect( result ).toEqual( { __html: '' } );
    } );
    it( 'should return empty markup when html is null', () => {
      const result = createMarkup( null as any );
      expect( result ).toEqual( { __html: '' } );
    } );
    it( 'should return empty markup when html is undefined', () => {
      const result = createMarkup( undefined as any );
      expect( result ).toEqual( { __html: '' } );
    } );
    it( 'should return decoded markup when html is provided', () => {
      const { decodeHtmlEntities } = require( '../../../../utilities/cec-utils' );
      decodeHtmlEntities.mockReturnValue( '<p>Decoded content</p>' );
      const result = createMarkup( '<p>Raw content</p>' );
      expect( result ).toEqual( { __html: '<p>Decoded content</p>' } );
      expect( decodeHtmlEntities ).toHaveBeenCalledWith( '<p>Raw content</p>' );
    } );
    it( 'should handle HTML entities correctly', () => {
      const { decodeHtmlEntities } = require( '../../../../utilities/cec-utils' );
      decodeHtmlEntities.mockReturnValue( 'Test &amp; Content' );
      const result = createMarkup( 'Test &amp; Content' );
      expect( result ).toEqual( { __html: 'Test &amp; Content' } );
    } );
  } );
  describe( 'getTextColor', () => {
    it( 'should return textColor when provided', () => {
      const result = getTextColor( 'title', '#ff0000', 'light', false );
      expect( result ).toBe( '#ff0000' );
    } );
    it( 'should return dark color when mode is dark and no textColor provided', () => {
      const result = getTextColor( 'title', undefined, 'dark', false );
      expect( result ).toBe( '#272833' );
    } );
    it( 'should return light color for title when mode is light and no textColor provided', () => {
      const result = getTextColor( 'title', undefined, 'light', false );
      expect( result ).toBe( '#ffffff' );
    } );
    it( 'should return dark color for excerpt when mode is light and no textColor provided', () => {
      const result = getTextColor( 'excerpt', undefined, 'light', false );
      expect( result ).toBe( '#272833' );
    } );
    it( 'should use default parameters correctly', () => {
      const result = getTextColor();
      expect( result ).toBe( '#ffffff' );
    } );
    it( 'should handle excerpt element with dark mode', () => {
      const result = getTextColor( 'excerpt', undefined, 'dark', false );
      expect( result ).toBe( '#272833' );
    } );
    it( 'should ignore isImageLeft parameter when textColor is provided', () => {
      const result = getTextColor( 'title', '#ff0000', 'light', true );
      expect( result ).toBe( '#ff0000' );
    } );
  } );
  describe( 'getTextShadow', () => {
    it( 'should return none when isImageLeft is true', () => {
      const result = getTextShadow( 'title', 'dark', true );
      expect( result ).toBe( 'none' );
    } );
    it( 'should return none when mode is not dark', () => {
      const result = getTextShadow( 'title', 'light', false );
      expect( result ).toBe( 'none' );
    } );
    it( 'should return text shadow for title in dark mode', () => {
      const result = getTextShadow( 'title', 'dark', false );
      expect( result ).toBe( '0 1px 3px rgba(0, 0, 0, 0.7)' );
    } );
    it( 'should return text shadow for excerpt in dark mode', () => {
      const result = getTextShadow( 'excerpt', 'dark', false );
      expect( result ).toBe( '0 1px 2px rgba(0, 0, 0, 0.5)' );
    } );
    it( 'should return none for title in non-dark mode even with isImageLeft false', () => {
      const result = getTextShadow( 'title', 'light', false );
      expect( result ).toBe( 'none' );
    } );
    it( 'should return none for excerpt in non-dark mode even with isImageLeft false', () => {
      const result = getTextShadow( 'excerpt', 'none', false );
      expect( result ).toBe( 'none' );
    } );
  } );
  describe( 'getSlideAriaLabel', () => {
    it( 'should return slide label with index and total', () => {
      const result = getSlideAriaLabel( 0, 5 );
      expect( result ).toBe( 'Slide 1 of 5' );
    } );
    it( 'should return slide label with index, total, and custom label', () => {
      const result = getSlideAriaLabel( 2, 10, 'Test Story' );
      expect( result ).toBe( 'Slide 3 of 10: Test Story' );
    } );
    it( 'should handle zero-based index correctly', () => {
      const result = getSlideAriaLabel( 4, 5 );
      expect( result ).toBe( 'Slide 5 of 5' );
    } );
    it( 'should handle empty label', () => {
      const result = getSlideAriaLabel( 1, 3, '' );
      expect( result ).toBe( 'Slide 2 of 3' );
    } );
    it( 'should handle undefined label', () => {
      const result = getSlideAriaLabel( 1, 3, undefined );
      expect( result ).toBe( 'Slide 2 of 3' );
    } );
    it( 'should handle null label', () => {
      const result = getSlideAriaLabel( 1, 3, null as any );
      expect( result ).toBe( 'Slide 2 of 3' );
    } );
  } );
  describe( 'getSlideBaseStyles', () => {
    it( 'should return styles for current slide', () => {
      const result = getSlideBaseStyles( true );
      expect( result ).toEqual( {
        position: 'relative',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 1,
        visibility: 'visible',
        transition: 'transform var(--CECSlider-timer) ease, opacity 0.3s ease, visibility 0.3s ease',
        willChange: 'transform, opacity, border-radius',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        boxSizing: 'border-box',
        padding: '2rem',
        overflow: 'hidden',
        cursor: 'grab',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
      } );
    } );
    it( 'should return styles for non-current slide', () => {
      const result = getSlideBaseStyles( false );
      expect( result ).toEqual( {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        visibility: 'hidden',
        transition: 'transform var(--CECSlider-timer) ease, opacity 0.3s ease, visibility 0.3s ease',
        willChange: 'transform, opacity, border-radius',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        boxSizing: 'border-box',
        padding: '2rem',
        overflow: 'hidden',
        cursor: 'grab',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
      } );
    } );
    it( 'should have consistent properties regardless of isCurrent value', () => {
      const currentStyles = getSlideBaseStyles( true );
      const nonCurrentStyles = getSlideBaseStyles( false );
      const keysToIgnore = ['position', 'opacity', 'visibility'];
      Object.keys( currentStyles ).forEach( key => {
        if ( !keysToIgnore.includes( key ) ) {
          expect( currentStyles[key] ).toEqual( nonCurrentStyles[key] );
        }
      } );
    } );
  } );
} );
