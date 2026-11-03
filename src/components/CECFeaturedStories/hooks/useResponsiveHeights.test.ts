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

import { renderHook } from '@testing-library/react';
import { useResponsiveHeights } from "./useResponsiveHeights";
// Mock console methods to avoid noise in tests
const originalConsoleWarn = console.warn;
beforeEach( () => {
  console.warn = jest.fn();
} );
afterEach( () => {
  console.warn = originalConsoleWarn;
  // Clean up any style tags that might have been added
  document.head.querySelectorAll( "style" ).forEach( style => style.remove() );
} );
describe( "useResponsiveHeights", () => {
  beforeEach( () => {
    // Reset document head
    document.head.querySelectorAll( "style" ).forEach( style => style.remove() );
  } );
  describe( "Initial State", () => {
    test( "returns default heights when no props provided", () => {
      const { result } = renderHook( () => useResponsiveHeights() );
      expect( result.current.containerHeight ).toBe( "500px" );
      expect( result.current.containerHeightMobile ).toBe( "400px" );
      expect( result.current.responsiveHeightCSSClass ).toMatch( /^cecFeaturedStories__container_[a-z0-9]+$/ );
    } );
    test( "generates unique CSS class names", () => {
      const { result: result1 } = renderHook( () => useResponsiveHeights() );
      const { result: result2 } = renderHook( () => useResponsiveHeights() );
      expect( result1.current.responsiveHeightCSSClass ).not.toBe( result2.current.responsiveHeightCSSClass );
      expect( result1.current.responsiveHeightCSSClass ).toMatch( /^cecFeaturedStories__container_[a-z0-9]+$/ );
      expect( result2.current.responsiveHeightCSSClass ).toMatch( /^cecFeaturedStories__container_[a-z0-9]+$/ );
    } );
  } );
  describe( "Height Processing", () => {
    test( "converts number height to pixels", () => {
      const { result } = renderHook( () => useResponsiveHeights( 600, 300 ) );
      expect( result.current.containerHeight ).toBe( "600px" );
      expect( result.current.containerHeightMobile ).toBe( "300px" );
    } );
    test( "preserves string height values", () => {
      const { result } = renderHook( () => useResponsiveHeights( "50vh", "40vh" ) );
      expect( result.current.containerHeight ).toBe( "50vh" );
      expect( result.current.containerHeightMobile ).toBe( "40vh" );
    } );
    test( "handles mixed number and string inputs", () => {
      const { result } = renderHook( () => useResponsiveHeights( 600, "40vh" ) );
      expect( result.current.containerHeight ).toBe( "600px" );
      expect( result.current.containerHeightMobile ).toBe( "40vh" );
    } );
    test( "handles zero values", () => {
      const { result } = renderHook( () => useResponsiveHeights( 0, 0 ) );
      // 0 is falsy, so defaults are used
      expect( result.current.containerHeight ).toBe( "500px" );
      expect( result.current.containerHeightMobile ).toBe( "400px" );
    } );
    test( "handles negative values", () => {
      const { result } = renderHook( () => useResponsiveHeights( -100, -50 ) );
      expect( result.current.containerHeight ).toBe( "-100px" );
      expect( result.current.containerHeightMobile ).toBe( "-50px" );
    } );
  } );
  describe( "Dynamic Updates", () => {
    test( "updates heights when height prop changes", () => {
      const { result, rerender } = renderHook(
        ( { height, heightMobile } ) => useResponsiveHeights( height, heightMobile ),
        {
          initialProps: { height: 500, heightMobile: 400 }
        }
      );
      expect( result.current.containerHeight ).toBe( "500px" );
      expect( result.current.containerHeightMobile ).toBe( "400px" );
      rerender( { height: 700, heightMobile: 350 } );
      expect( result.current.containerHeight ).toBe( "700px" );
      expect( result.current.containerHeightMobile ).toBe( "350px" );
    } );
    test( "updates only desktop height when only height changes", () => {
      const { result, rerender } = renderHook(
        ( { height } ) => useResponsiveHeights( height, 400 ),
        {
          initialProps: { height: 500 }
        }
      );
      expect( result.current.containerHeight ).toBe( "500px" );
      expect( result.current.containerHeightMobile ).toBe( "400px" );
      rerender( { height: 800 } );
      expect( result.current.containerHeight ).toBe( "800px" );
      expect( result.current.containerHeightMobile ).toBe( "400px" ); // Unchanged
    } );
    test( "updates only mobile height when only heightMobile changes", () => {
      const { result, rerender } = renderHook(
        ( { heightMobile } ) => useResponsiveHeights( 500, heightMobile ),
        {
          initialProps: { heightMobile: 400 }
        }
      );
      expect( result.current.containerHeight ).toBe( "500px" );
      expect( result.current.containerHeightMobile ).toBe( "400px" );
      rerender( { heightMobile: 300 } );
      expect( result.current.containerHeight ).toBe( "500px" ); // Unchanged
      expect( result.current.containerHeightMobile ).toBe( "300px" );
    } );
    test( "maintains same CSS class when heights change", () => {
      const { result, rerender } = renderHook(
        ( { height } ) => useResponsiveHeights( height, 400 ),
        {
          initialProps: { height: 500 }
        }
      );
      const originalClass = result.current.responsiveHeightCSSClass;
      rerender( { height: 700 } );
      expect( result.current.responsiveHeightCSSClass ).toBe( originalClass );
    } );
  } );
  describe( "Style Tag Injection", () => {
    test( "injects style tag into document head", () => {
      const { result } = renderHook( () => useResponsiveHeights( 600, 300 ) );
      const styleTags = document.head.querySelectorAll( "style" );
      expect( styleTags ).toHaveLength( 1 );
      const styleContent = styleTags[0].textContent;
      expect( styleContent ).toContain( result.current.responsiveHeightCSSClass );
      expect( styleContent ).toContain( "height: 600px" );
      expect( styleContent ).toContain( "height: 300px" );
      expect( styleContent ).toContain( "@media (max-width: 767px)" );
    } );
    test( "updates style tag when heights change", () => {
      const { result, rerender } = renderHook(
        ( { height, heightMobile } ) => useResponsiveHeights( height, heightMobile ),
        {
          initialProps: { height: 500, heightMobile: 400 }
        }
      );
      const initialStyleContent = document.head.querySelector( "style" )!.textContent;
      rerender( { height: 700, heightMobile: 300 } );
      const updatedStyleContent = document.head.querySelector( "style" )!.textContent;
      expect( initialStyleContent ).toContain( "height: 500px" );
      expect( initialStyleContent ).toContain( "height: 400px" );
      expect( updatedStyleContent ).toContain( "height: 700px" );
      expect( updatedStyleContent ).toContain( "height: 300px" );
    } );
    test( "removes style tag on unmount", () => {
      const { unmount } = renderHook( () => useResponsiveHeights( 600, 300 ) );
      expect( document.head.querySelectorAll( "style" ) ).toHaveLength( 1 );
      unmount();
      expect( document.head.querySelectorAll( "style" ) ).toHaveLength( 0 );
    } );
    test( "handles multiple hooks with different classes", () => {
      const { result: result1 } = renderHook( () => useResponsiveHeights( 500, 400 ) );
      const { result: result2 } = renderHook( () => useResponsiveHeights( 600, 300 ) );
      const styleTags = document.head.querySelectorAll( "style" );
      expect( styleTags ).toHaveLength( 2 );
      const style1Content = styleTags[0].textContent;
      const style2Content = styleTags[1].textContent;
      expect( style1Content ).toContain( result1.current.responsiveHeightCSSClass );
      expect( style2Content ).toContain( result2.current.responsiveHeightCSSClass );
      expect( style1Content ).not.toContain( result2.current.responsiveHeightCSSClass );
      expect( style2Content ).not.toContain( result1.current.responsiveHeightCSSClass );
    } );
  } );
  describe( "CSS Class Generation", () => {
    test( "generates valid CSS class names", () => {
      const { result } = renderHook( () => useResponsiveHeights() );
      const className = result.current.responsiveHeightCSSClass;
      expect( className ).toMatch( /^cecFeaturedStories__container_[a-z0-9]{9}$/ );
      expect( className.length ).toBe( "cecFeaturedStories__container_".length + 9 );
    } );
    test( "generates different classes on multiple renders", () => {
      const classes = [];
      for ( let i = 0; i < 10; i++ ) {
        const { result } = renderHook( () => useResponsiveHeights() );
        classes.push( result.current.responsiveHeightCSSClass );
      }
      const uniqueClasses = new Set( classes );
      expect( uniqueClasses.size ).toBe( 10 ); // All should be unique
    } );
    test( "CSS class names contain only valid characters", () => {
      const { result } = renderHook( () => useResponsiveHeights() );
      const className = result.current.responsiveHeightCSSClass;
      // Should only contain letters, numbers, and underscores
      expect( className ).toMatch( /^[a-zA-Z0-9_]+$/ );
    } );
  } );
  describe( "Media Query Handling", () => {
    test( "includes correct media query in style", () => {
      const { result } = renderHook( () => useResponsiveHeights( 600, 300 ) );
      const styleContent = document.head.querySelector( "style" )!.textContent;
      expect( styleContent ).toContain( "@media (max-width: 767px)" );
      expect( styleContent ).toMatch( /@media \(max-width: 767px\) \{[\s\S]*cecFeaturedStories__container_[a-z0-9]+ \{ height: 300px; \}[\s\S]*\}/ );
    } );
    test( "applies mobile height within media query", () => {
      const { result } = renderHook( () => useResponsiveHeights( "50vh", "30vh" ) );
      const styleContent = document.head.querySelector( "style" )!.textContent;
      expect( styleContent ).toMatch( /cecFeaturedStories__container_[a-z0-9]+ \{ height: 50vh; \}/ );
      expect( styleContent ).toMatch( /@media \(max-width: 767px\) \{[\s\S]*cecFeaturedStories__container_[a-z0-9]+ \{ height: 30vh; \}[\s\S]*\}/ );
    } );
  } );
  describe( "Edge Cases", () => {
    test( "handles very large height values", () => {
      const { result } = renderHook( () => useResponsiveHeights( 999999, 888888 ) );
      expect( result.current.containerHeight ).toBe( "999999px" );
      expect( result.current.containerHeightMobile ).toBe( "888888px" );
    } );
    test( "handles decimal height values", () => {
      const { result } = renderHook( () => useResponsiveHeights( 600.5, 300.7 ) );
      expect( result.current.containerHeight ).toBe( "600.5px" );
      expect( result.current.containerHeightMobile ).toBe( "300.7px" );
    } );
    test( "handles empty string heights", () => {
      const { result } = renderHook( () => useResponsiveHeights( "", "" ) );
      // Empty strings are falsy, so defaults are used
      expect( result.current.containerHeight ).toBe( "500px" );
      expect( result.current.containerHeightMobile ).toBe( "400px" );
    } );
    test( "handles complex CSS values", () => {
      const { result } = renderHook( () => useResponsiveHeights( "calc(100vh - 100px)", "min(300px, 50vh)" ) );
      expect( result.current.containerHeight ).toBe( "calc(100vh - 100px)" );
      expect( result.current.containerHeightMobile ).toBe( "min(300px, 50vh)" );
    } );
    test( "handles undefined individual heights", () => {
      const { result: result1 } = renderHook( () => useResponsiveHeights( undefined, 400 ) );
      const { result: result2 } = renderHook( () => useResponsiveHeights( 500, undefined ) );
      expect( result1.current.containerHeight ).toBe( "500px" ); // Default
      expect( result1.current.containerHeightMobile ).toBe( "400px" );
      expect( result2.current.containerHeight ).toBe( "500px" );
      expect( result2.current.containerHeightMobile ).toBe( "400px" ); // Default
    } );
    test( "handles rapid prop changes", () => {
      const { result, rerender } = renderHook(
        ( { height } ) => useResponsiveHeights( height, 400 ),
        {
          initialProps: { height: 500 }
        }
      );
      // Rapidly change heights
      for ( let i = 0; i < 10; i++ ) {
        rerender( { height: 500 + i * 10 } );
      }
      expect( result.current.containerHeight ).toBe( "590px" );
      // Should still have only one style tag
      expect( document.head.querySelectorAll( "style" ) ).toHaveLength( 1 );
    } );
  } );
  describe( "Memory Management", () => {
    test( "cleans up style tags when multiple hooks unmount", () => {
      const hooks = [];
      // Mount multiple hooks
      for ( let i = 0; i < 5; i++ ) {
        hooks.push( renderHook( () => useResponsiveHeights( 500 + i, 400 + i ) ) );
      }
      expect( document.head.querySelectorAll( "style" ) ).toHaveLength( 5 );
      // Unmount all hooks
      hooks.forEach( hook => hook.unmount() );
      expect( document.head.querySelectorAll( "style" ) ).toHaveLength( 0 );
    } );
    test( "handles unmount during rapid updates", () => {
      const { rerender, unmount } = renderHook(
        ( { height } ) => useResponsiveHeights( height, 400 ),
        {
          initialProps: { height: 500 }
        }
      );
      // Start rapid updates
      for ( let i = 0; i < 5; i++ ) {
        rerender( { height: 500 + i } );
      }
      // Unmount during updates
      unmount();
      expect( document.head.querySelectorAll( "style" ) ).toHaveLength( 0 );
    } );
  } );
  describe( "Style Content Validation", () => {
    test( "generates valid CSS syntax", () => {
      const { result } = renderHook( () => useResponsiveHeights( 600, 300 ) );
      const styleContent = document.head.querySelector( "style" )!.textContent;
      // Basic CSS syntax validation
      expect( styleContent ).toMatch( /\.[a-zA-Z0-9_]+ \{ height: [^;]+; \}/ );
      expect( styleContent ).toMatch( /@media \([^)]+\) \{[^}]*\.[a-zA-Z0-9_]+ \{ height: [^;]+; \}[^}]*\}/ );
    } );
    test( "escapes CSS class names properly", () => {
      const { result } = renderHook( () => useResponsiveHeights( 600, 300 ) );
      const className = result.current.responsiveHeightCSSClass;
      const styleContent = document.head.querySelector( "style" )!.textContent;
      // CSS class should be used as-is in the style
      expect( styleContent ).toContain( `.${className}` );
    } );
  } );
} );
