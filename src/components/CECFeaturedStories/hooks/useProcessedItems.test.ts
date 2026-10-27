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
import { useProcessedItems } from "./useProcessedItems";
import type { BlogCardProps } from "../CECFeaturedStories.types";
// Mock the utility functions
jest.mock( "../../../utilities/cec-utils", () => ( {
  decodeHtmlEntities: jest.fn( ( str: string ) => str ),
  extractFirstImageFromContent: jest.fn( ( content: string ) => null ),
  generateSummary: jest.fn( ( content: string, length: number ) => "Generated summary" ),
  isFalsyImageUrl: jest.fn( ( url: string | null | undefined ) => false ),
} ) );
import {
  decodeHtmlEntities,
  extractFirstImageFromContent,
  generateSummary,
  isFalsyImageUrl,
} from "../../../utilities/cec-utils";
describe( "useProcessedItems", () => {
  beforeEach( () => {
    jest.clearAllMocks();
  } );
  // Helper function to create mock items
  const createMockItem = ( overrides: Partial<BlogCardProps> = {}, index: number = 0 ): BlogCardProps => ( {
    link: { url: `https://example.com/${index}`, label: `Item ${index}` },
    date: "2023-01-01",
    content: `<p>Content for item ${index}</p>`,
    tags: [`tag${index}`],
    summary: `Summary for item ${index}`,
    image: { url: `https://example.com/image${index}.jpg`, altText: `Image ${index}` },
    ...overrides,
  } );
  describe( "Basic Functionality", () => {
    test( "returns empty array for non-array input", () => {
      const { result } = renderHook( () => useProcessedItems( null as any ) );
      expect( result.current ).toEqual( [] );
    } );
    test( "returns empty array for undefined input", () => {
      const { result } = renderHook( () => useProcessedItems( undefined as any ) );
      expect( result.current ).toEqual( [] );
    } );
    test( "processes array of items correctly", () => {
      const mockItems = [
        createMockItem( {}, 0 ),
        createMockItem( {}, 1 ),
      ];
      ( decodeHtmlEntities as jest.Mock ).mockImplementation( ( str ) => `decoded: ${str}` );
      ( generateSummary as jest.Mock ).mockImplementation( ( content, length ) => `summary: ${content.substring( 0, length )}` );
      const { result } = renderHook( () => useProcessedItems( mockItems, 100 ) );
      expect( result.current ).toHaveLength( 2 );
      expect( result.current[0] ).toEqual(
        expect.objectContaining( {
          link: { url: "https://example.com/0", label: "Item 0", target: "_blank" },
          date: "2023-01-01",
          content: "decoded: <p>Content for item 0</p>",
          summary: "summary: decoded: <p>Content for item 0</p>",
          index: 0,
          image: { url: "https://example.com/image0.jpg", altText: "Image 0" },
        } )
      );
    } );
  } );
  describe( "Image Processing", () => {
    test( "keeps original image URL when valid", () => {
      const mockItems = [createMockItem( { image: { url: "valid-image.jpg", altText: "Alt" } } )];
      ( isFalsyImageUrl as jest.Mock ).mockReturnValue( false );
      const { result } = renderHook( () => useProcessedItems( mockItems ) );
      expect( result.current[0].image ).toEqual( {
        url: "valid-image.jpg",
        altText: "Alt",
      } );
      expect( isFalsyImageUrl ).toHaveBeenCalledWith( "valid-image.jpg" );
      expect( extractFirstImageFromContent ).not.toHaveBeenCalled();
    } );
    test( "extracts image from content when original is falsy", () => {
      const mockItems = [createMockItem( { image: { url: undefined, altText: "Alt" } } )];
      ( isFalsyImageUrl as jest.Mock ).mockReturnValue( true );
      ( extractFirstImageFromContent as jest.Mock ).mockReturnValue( "extracted-image.jpg" );
      const { result } = renderHook( () => useProcessedItems( mockItems ) );
      expect( result.current[0].image ).toEqual( {
        url: "extracted-image.jpg",
        altText: "Alt",
      } );
      expect( extractFirstImageFromContent ).toHaveBeenCalled();
    } );
    test( "sets image to undefined when no valid image found", () => {
      const mockItems = [createMockItem( { image: { url: undefined, altText: "Alt" } } )];
      ( isFalsyImageUrl as jest.Mock ).mockReturnValue( true );
      ( extractFirstImageFromContent as jest.Mock ).mockReturnValue( undefined );
      const { result } = renderHook( () => useProcessedItems( mockItems ) );
      expect( result.current[0].image ).toBeUndefined();
    } );
    test( "handles missing image property", () => {
      const mockItems = [createMockItem( { image: undefined } )];
      ( isFalsyImageUrl as jest.Mock ).mockReturnValue( true );
      ( extractFirstImageFromContent as jest.Mock ).mockReturnValue( "content-image.jpg" );
      const { result } = renderHook( () => useProcessedItems( mockItems ) );
      expect( result.current[0].image ).toEqual( {
        url: "content-image.jpg",
        altText: "",
      } );
    } );
  } );
  describe( "Content Processing", () => {
    test( "decodes HTML content", () => {
      const mockItems = [createMockItem( { content: "<p>Raw &amp; HTML</p>" } )];
      ( decodeHtmlEntities as jest.Mock ).mockReturnValue( "<p>Raw & HTML</p>" );
      const { result } = renderHook( () => useProcessedItems( mockItems ) );
      expect( result.current[0].content ).toBe( "<p>Raw & HTML</p>" );
      expect( decodeHtmlEntities ).toHaveBeenCalledWith( "<p>Raw &amp; HTML</p>" );
    } );
    test( "handles empty content", () => {
      const mockItems = [createMockItem( { content: undefined } )];
      ( decodeHtmlEntities as jest.Mock ).mockReturnValue( "" );
      const { result } = renderHook( () => useProcessedItems( mockItems ) );
      expect( result.current[0].content ).toBe( "" );
      expect( decodeHtmlEntities ).toHaveBeenCalledWith( "" );
    } );
    test( "generates summary with correct length", () => {
      const mockItems = [createMockItem( { content: "Long content that needs to be summarized" } )];
      ( decodeHtmlEntities as jest.Mock ).mockReturnValue( "Long content that needs to be summarized" );
      ( generateSummary as jest.Mock ).mockImplementation( ( content, length ) => content.substring( 0, length ) );
      const { result } = renderHook( () => useProcessedItems( mockItems, 10 ) );
      expect( result.current[0].summary ).toBe( "Long conte" );
      expect( generateSummary ).toHaveBeenCalledWith( "Long content that needs to be summarized", 10 );
    } );
  } );
  describe( "Link Processing", () => {
    test( "preserves existing link target", () => {
      const mockItems = [createMockItem( {
        link: { url: "https://example.com", label: "Link", target: "_self" }
      } )];
      const { result } = renderHook( () => useProcessedItems( mockItems ) );
      expect( result.current[0].link.target ).toBe( "_self" );
    } );
    test( "sets default target when none provided", () => {
      const mockItems = [createMockItem( {
        link: { url: "https://example.com", label: "Link" }
      } )];
      const { result } = renderHook( () => useProcessedItems( mockItems ) );
      expect( result.current[0].link.target ).toBe( "_blank" );
    } );
    test( "creates fallback link when missing", () => {
      const mockItems = [{ ...createMockItem(), link: undefined as any }];
      const { result } = renderHook( () => useProcessedItems( mockItems ) );
      expect( result.current[0].link ).toEqual( {
        url: "#",
        label: "",
        target: "_blank",
      } );
    } );
  } );
  describe( "Date Processing", () => {
    test( "uses provided date", () => {
      const mockItems = [createMockItem( { date: "2023-12-25" } )];
      const { result } = renderHook( () => useProcessedItems( mockItems ) );
      expect( result.current[0].date ).toBe( "2023-12-25" );
    } );
    test( "falls back to updatedDate when date missing", () => {
      const mockItems = [createMockItem( { date: undefined } ) as any];
      ( mockItems[0] as any ).updatedDate = "2023-12-26";
      const { result } = renderHook( () => useProcessedItems( mockItems ) );
      expect( result.current[0].date ).toBe( "2023-12-26" );
    } );
    test( "falls back to updated when both date and updatedDate missing", () => {
      const mockItems = [createMockItem( { date: undefined } ) as any];
      ( mockItems[0] as any ).updated = "2023-12-27";
      const { result } = renderHook( () => useProcessedItems( mockItems ) );
      expect( result.current[0].date ).toBe( "2023-12-27" );
    } );
    test( "falls back to current date when no date fields available", () => {
      const mockItems = [createMockItem( { date: undefined } )];
      const { result } = renderHook( () => useProcessedItems( mockItems ) );
      expect( result.current[0].date ).toMatch( /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/ );
    } );
  } );
  describe( "Limit Processing", () => {
    test( "applies hard max limit when no option limit provided", () => {
      const mockItems = Array.from( { length: 15 }, ( _, i ) => createMockItem( {}, i ) );
      const { result } = renderHook( () => useProcessedItems( mockItems ) );
      expect( result.current ).toHaveLength( 9 ); // HARD_MAX_ITEMS
    } );
    test( "applies explicit limit when less than hard max", () => {
      const mockItems = Array.from( { length: 10 }, ( _, i ) => createMockItem( {}, i ) );
      const { result } = renderHook( () => useProcessedItems( mockItems, 250, { limit: 5 } ) );
      expect( result.current ).toHaveLength( 5 );
    } );
    test( "applies hard max when explicit limit exceeds it", () => {
      const mockItems = Array.from( { length: 15 }, ( _, i ) => createMockItem( {}, i ) );
      const { result } = renderHook( () => useProcessedItems( mockItems, 250, { limit: 12 } ) );
      expect( result.current ).toHaveLength( 9 ); // min(12, 9) = 9
    } );
    test( "handles zero limit", () => {
      const mockItems = Array.from( { length: 5 }, ( _, i ) => createMockItem( {}, i ) );
      const { result } = renderHook( () => useProcessedItems( mockItems, 250, { limit: 0 } ) );
      expect( result.current ).toHaveLength( 5 ); // falls back to original array length when limit is 0
    } );
    test( "handles negative limit", () => {
      const mockItems = Array.from( { length: 5 }, ( _, i ) => createMockItem( {}, i ) );
      const { result } = renderHook( () => useProcessedItems( mockItems, 250, { limit: -5 } ) );
      expect( result.current ).toHaveLength( 5 ); // falls back to original array length when limit is negative
    } );
    test( "handles fractional limit by flooring", () => {
      const mockItems = Array.from( { length: 10 }, ( _, i ) => createMockItem( {}, i ) );
      const { result } = renderHook( () => useProcessedItems( mockItems, 250, { limit: 5.7 } ) );
      expect( result.current ).toHaveLength( 5 ); // Math.floor(5.7) = 5
    } );
    test( "handles string limit in options", () => {
      const mockItems = Array.from( { length: 10 }, ( _, i ) => createMockItem( {}, i ) );
      const { result } = renderHook( () => useProcessedItems( mockItems, 250, { limit: "5" as any } ) );
      expect( result.current ).toHaveLength( 9 ); // not a number, falls back to HARD_MAX_ITEMS
    } );
  } );
  describe( "Memoization", () => {
    test( "returns memoized result when inputs haven't changed", () => {
      const mockItems = [createMockItem()];
      const { result, rerender } = renderHook( () => useProcessedItems( mockItems, 250, { limit: 5 } ) );
      const firstResult = result.current;
      rerender();
      expect( result.current ).toBe( firstResult ); // Same reference
    } );
    test( "recalculates when items change", () => {
      const mockItems = [createMockItem( { content: "original content" } )];
      const { result, rerender } = renderHook( ( { items } ) => useProcessedItems( items, 250 ), {
        initialProps: { items: mockItems }
      } );
      const firstResult = result.current;
      rerender( { items: [createMockItem( { content: "different content", link: { url: "https://different.com", label: "Different" } } )] } );
      // The result should be different since the content changed
      expect( result.current ).not.toEqual( firstResult );
    } );
    test( "recalculates when summary length changes", () => {
      const mockItems = [createMockItem()];
      const { result, rerender } = renderHook( ( { summaryLen } ) => useProcessedItems( mockItems, summaryLen ), {
        initialProps: { summaryLen: 250 }
      } );
      const firstResult = result.current;
      rerender( { summaryLen: 100 } );
      expect( result.current ).not.toBe( firstResult ); // Different reference
    } );
    test( "recalculates when options limit changes", () => {
      const mockItems = Array.from( { length: 10 }, ( _, i ) => createMockItem( {}, i ) );
      const { result, rerender } = renderHook( ( { options } ) => useProcessedItems( mockItems, 250, options ), {
        initialProps: { options: { limit: 5 } }
      } );
      const firstResult = result.current;
      rerender( { options: { limit: 3 } } );
      expect( result.current ).not.toBe( firstResult ); // Different reference
      expect( result.current ).toHaveLength( 3 );
    } );
  } );
  describe( "Edge Cases", () => {
    test( "handles items with missing required properties", () => {
      const mockItems = [
        { content: undefined, link: { url: "https://example.com", label: "Test" } } as any,
        { link: { url: "https://example.com", label: "Test" } } as any,
      ];
      ( decodeHtmlEntities as jest.Mock ).mockReturnValue( "" );
      const { result } = renderHook( () => useProcessedItems( mockItems ) );
      expect( result.current ).toHaveLength( 2 );
      expect( result.current[0].content ).toBe( "" );
      expect( ( result.current[1] as any ).tags ).toBeUndefined();
    } );
    test( "handles circular references gracefully", () => {
      const mockItem = createMockItem();
      ( mockItem as any ).self = mockItem; // Create circular reference
      const { result } = renderHook( () => useProcessedItems( [mockItem] ) );
      expect( result.current ).toHaveLength( 1 );
      expect( result.current[0].index ).toBe( 0 );
    } );
    test( "handles very large arrays efficiently", () => {
      const mockItems = Array.from( { length: 100 }, ( _, i ) => createMockItem( {}, i ) );
      const { result } = renderHook( () => useProcessedItems( mockItems, 250, { limit: 100 } ) );
      expect( result.current ).toHaveLength( 9 ); // Limited by HARD_MAX_ITEMS
      expect( result.current[8].index ).toBe( 8 );
    } );
    test( "preserves all original properties", () => {
      const customItem = {
        ...createMockItem(),
        customProperty: "custom value",
        anotherProp: 123,
        nested: { prop: "value" },
      };
      const { result } = renderHook( () => useProcessedItems( [customItem] ) );
      expect( result.current[0] ).toEqual(
        expect.objectContaining( {
          customProperty: "custom value",
          anotherProp: 123,
          nested: { prop: "value" },
        } )
      );
    } );
  } );
} );
