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
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CECNewsDialog, { type CECNewsDialogProps } from "./CECNewsDialog";
import type { NewsItemProps } from "../../utilities/cec-types";
// Mock the utility functions
jest.mock( "../../utilities/cec-utils", () => ( {
  decodeHtmlEntities: jest.fn( ( str: string ) => str ),
  formatSmartDate: jest.fn( ( date?: string, format?: string ) => "Formatted Date" ),
  extractFirstImageFromContent: jest.fn( ( content: string ) => null ),
  isFalsyImageUrl: jest.fn( ( url: string | null ) => false ),
} ) );
import {
  decodeHtmlEntities,
  formatSmartDate,
  extractFirstImageFromContent,
  isFalsyImageUrl,
} from "../../utilities/cec-utils";
const mockOnClose = jest.fn();
// Helper function to create mock news item
const createMockNewsItem = ( overrides: Partial<NewsItemProps> = {} ): NewsItemProps => ( {
  _id: "1",
  title: "Test News Item",
  content: "<p>Test content</p>",
  summary: "Test summary",
  link: { url: "https://example.com", label: "Read more" },
  author: { name: "Test Author" },
  publishedDate: "2023-01-01",
  category: "Test Category",
  tags: ["tag1", "tag2"],
  image: { url: "https://example.com/image.jpg", alt: "Test Image" },
  ...overrides,
} );
describe( "CECNewsDialog", () => {
  beforeEach( () => {
    jest.clearAllMocks();
    // Reset document body
    document.body.innerHTML = "";
  } );
  afterEach( () => {
    mockOnClose.mockClear();
  } );
  describe( "Basic Rendering", () => {
    test( "renders dialog when open is true", () => {
      const mockItem = createMockNewsItem();
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.getByRole( "dialog" ) ).toBeInTheDocument();
      expect( screen.getByText( "Test News Item" ) ).toBeInTheDocument();
    } );
    test( "does not render dialog content when open is false", () => {
      const mockItem = createMockNewsItem();
      render(
        <CECNewsDialog
          open={false}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      const dialog = screen.getByRole( "dialog" );
      expect( dialog ).not.toHaveClass( "active" );
    } );
    test( "renders with no item provided", () => {
      render(
        <CECNewsDialog
          open={true}
          onClose={mockOnClose}
        />
      );
      expect( screen.getByText( "Untitled Post" ) ).toBeInTheDocument();
    } );
  } );
  describe( "Title Handling", () => {
    test( "uses title when available", () => {
      const mockItem = createMockNewsItem( { title: "Custom Title" } );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.getByText( "Custom Title" ) ).toBeInTheDocument();
    } );
    test( "falls back to link label when no title", () => {
      const mockItem = createMockNewsItem( { title: undefined } );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.getByText( "Read more" ) ).toBeInTheDocument();
    } );
    test( "falls back to 'Untitled Post' when no title or link label", () => {
      const mockItem = createMockNewsItem( {
        title: undefined,
        link: { url: "https://example.com" }
      } );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.getByText( "Untitled Post" ) ).toBeInTheDocument();
    } );
    test( "trims whitespace from title", () => {
      const mockItem = createMockNewsItem( { title: "  Spaced Title  " } );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.getByText( "Spaced Title" ) ).toBeInTheDocument();
    } );
  } );
  describe( "Metadata Display", () => {
    test( "displays author and date when both available", () => {
      const mockItem = createMockNewsItem();
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.getByText( "Test Author • Formatted Date" ) ).toBeInTheDocument();
    } );
    test( "displays only author when no date", () => {
      const mockItem = createMockNewsItem( { publishedDate: undefined, date: undefined } );
      ( formatSmartDate as jest.Mock ).mockReturnValue( "" );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.getByText( "Test Author" ) ).toBeInTheDocument();
      expect( screen.queryByText( "•" ) ).not.toBeInTheDocument();
    } );
    test( "displays only date when no author", () => {
      const mockItem = createMockNewsItem( { author: undefined } );
      ( formatSmartDate as jest.Mock ).mockReturnValue( "Formatted Date" );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.getByText( "Formatted Date" ) ).toBeInTheDocument();
      expect( screen.queryByText( "•" ) ).not.toBeInTheDocument();
    } );
    test( "hides metadata when neither author nor date", () => {
      const mockItem = createMockNewsItem( {
        author: undefined,
        publishedDate: undefined,
        date: undefined
      } );
      ( formatSmartDate as jest.Mock ).mockReturnValue( "" );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.queryByText( "Test Author" ) ).not.toBeInTheDocument();
      expect( screen.queryByText( "Formatted Date" ) ).not.toBeInTheDocument();
    } );
  } );
  describe( "Image Handling", () => {
    test( "displays image when valid URL provided", () => {
      const mockItem = createMockNewsItem();
      ( isFalsyImageUrl as jest.Mock ).mockReturnValue( false );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      const image = screen.getByRole( "img" );
      expect( image ).toBeInTheDocument();
      expect( image ).toHaveAttribute( "src", "https://example.com/image.jpg" );
      expect( image ).toHaveAttribute( "alt", "Test Image" );
    } );
    test( "extracts image from content when no item image", () => {
      const mockItem = createMockNewsItem( { image: undefined } );
      ( isFalsyImageUrl as jest.Mock ).mockReturnValue( true );
      ( extractFirstImageFromContent as jest.Mock ).mockReturnValue( "extracted-image.jpg" );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      const image = document.querySelector( "img" );
      expect( image ).toHaveAttribute( "src", "extracted-image.jpg" );
    } );
    test( "displays no image when all image sources are falsy", () => {
      const mockItem = createMockNewsItem( { image: undefined } );
      ( isFalsyImageUrl as jest.Mock ).mockReturnValue( true );
      ( extractFirstImageFromContent as jest.Mock ).mockReturnValue( null );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.queryByRole( "img" ) ).not.toBeInTheDocument();
    } );
    test( "uses empty alt when no alt text provided", () => {
      const mockItem = createMockNewsItem( { image: { url: "image.jpg", alt: undefined } } );
      ( isFalsyImageUrl as jest.Mock ).mockReturnValue( false );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      const image = document.querySelector( "img" );
      expect( image ).toHaveAttribute( "alt", "" );
    } );
  } );
  describe( "Content Rendering", () => {
    test( "renders decoded HTML content", () => {
      const mockItem = createMockNewsItem( { content: "<p>Test content</p>" } );
      ( decodeHtmlEntities as jest.Mock ).mockReturnValue( "<p>Decoded content</p>" );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.getByText( "Decoded content" ) ).toBeInTheDocument();
      const contentDiv = screen.getByText( "Decoded content" ).closest( ".newsDialog__rich" );
      expect( contentDiv ).toBeInTheDocument();
    } );
    test( "handles empty content gracefully", () => {
      const mockItem = createMockNewsItem( { content: undefined } );
      ( decodeHtmlEntities as jest.Mock ).mockReturnValue( "" );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      const contentDiv = screen.getByRole( "dialog" ).querySelector( ".newsDialog__rich" );
      expect( contentDiv ).toBeInTheDocument();
    } );
  } );
  describe( "Tags Handling", () => {
    test( "displays tags when provided as array", () => {
      const mockItem = createMockNewsItem( { tags: ["tag1", "tag2", "tag3"] } );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.getByText( "tag1" ) ).toBeInTheDocument();
      expect( screen.getByText( "tag2" ) ).toBeInTheDocument();
      expect( screen.getByText( "tag3" ) ).toBeInTheDocument();
    } );
    test( "splits and trims tags when provided as string", () => {
      const mockItem = createMockNewsItem( { tags: "tag1, tag2+tag3 ,tag4" } );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.getByText( "tag1" ) ).toBeInTheDocument();
      expect( screen.getByText( "tag2" ) ).toBeInTheDocument();
      expect( screen.getByText( "tag3" ) ).toBeInTheDocument();
      expect( screen.getByText( "tag4" ) ).toBeInTheDocument();
    } );
    test( "handles empty tags array", () => {
      const mockItem = createMockNewsItem( { tags: [] } );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      const tagsContainer = screen.getByRole( "dialog" ).querySelector( ".newsDialog__tags" );
      expect( tagsContainer ).toBeInTheDocument();
      expect( tagsContainer ).toBeEmptyDOMElement();
    } );
    test( "handles undefined tags", () => {
      const mockItem = createMockNewsItem( { tags: undefined } );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      const tagsContainer = screen.getByRole( "dialog" ).querySelector( ".newsDialog__tags" );
      expect( tagsContainer ).toBeInTheDocument();
      expect( tagsContainer ).toBeEmptyDOMElement();
    } );
    test( "filters out empty tag strings", () => {
      const mockItem = createMockNewsItem( { tags: "tag1, , tag2, , tag3" } );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.getByText( "tag1" ) ).toBeInTheDocument();
      expect( screen.getByText( "tag2" ) ).toBeInTheDocument();
      expect( screen.getByText( "tag3" ) ).toBeInTheDocument();
      expect( screen.queryByText( "," ) ).not.toBeInTheDocument();
    } );
  } );
  describe( "Link Actions", () => {
    test( "displays read more link when URL provided", () => {
      const mockItem = createMockNewsItem();
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      const link = screen.getByText( "Read More →" );
      expect( link ).toBeInTheDocument();
      expect( link ).toHaveAttribute( "href", "https://example.com" );
      expect( link ).toHaveAttribute( "target", "_blank" );
      expect( link ).toHaveAttribute( "rel", "noopener noreferrer" );
    } );
    test( "uses _self target when specified", () => {
      const mockItem = createMockNewsItem();
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
          linkTarget="_self"
        />
      );
      const link = screen.getByText( "Read More →" );
      expect( link ).toHaveAttribute( "target", "_self" );
      expect( link ).not.toHaveAttribute( "rel" );
    } );
    test( "hides read more link when no URL", () => {
      const mockItem = createMockNewsItem( { link: { url: "" } } );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.queryByText( "Read More →" ) ).not.toBeInTheDocument();
    } );
  } );
  describe( "Close Functionality", () => {
    test( "calls onClose when close button is clicked", () => {
      const mockItem = createMockNewsItem();
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      const closeButton = screen.getByLabelText( "Close" );
      fireEvent.click( closeButton );
      expect( mockOnClose ).toHaveBeenCalledTimes( 1 );
    } );
    test( "calls onClose when Escape key is pressed", () => {
      const mockItem = createMockNewsItem();
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      fireEvent.keyDown( document, { key: "Escape" } );
      expect( mockOnClose ).toHaveBeenCalledTimes( 1 );
    } );
    test( "does not call onClose when other keys are pressed", () => {
      const mockItem = createMockNewsItem();
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      fireEvent.keyDown( document, { key: "Enter" } );
      expect( mockOnClose ).not.toHaveBeenCalled();
    } );
    test( "removes event listener when dialog closes", () => {
      const mockItem = createMockNewsItem();
      const { rerender } = render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      // Close the dialog
      rerender(
        <CECNewsDialog
          open={false}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      // Press Escape - should not call onClose
      fireEvent.keyDown( document, { key: "Escape" } );
      expect( mockOnClose ).not.toHaveBeenCalled();
    } );
  } );
  describe( "Accessibility", () => {
    test( "has proper dialog role", () => {
      const mockItem = createMockNewsItem();
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.getByRole( "dialog" ) ).toBeInTheDocument();
    } );
    test( "has aria-modal attribute", () => {
      const mockItem = createMockNewsItem();
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      const dialog = screen.getByRole( "dialog" );
      expect( dialog ).toHaveAttribute( "aria-modal", "true" );
    } );
    test( "has proper aria-label with title", () => {
      const mockItem = createMockNewsItem( { title: "Accessible Title" } );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      const dialog = screen.getByRole( "dialog" );
      expect( dialog ).toHaveAttribute( "aria-label", "Accessible Title" );
    } );
    test( "close button has proper aria-label", () => {
      const mockItem = createMockNewsItem();
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.getByLabelText( "Close" ) ).toBeInTheDocument();
    } );
  } );
  describe( "Edge Cases", () => {
    test( "handles null/undefined item gracefully", () => {
      render(
        <CECNewsDialog
          open={true}
          item={undefined}
          onClose={mockOnClose}
        />
      );
      expect( screen.getByText( "Untitled Post" ) ).toBeInTheDocument();
      expect( screen.getByRole( "dialog" ) ).toBeInTheDocument();
    } );
    test( "handles item with empty strings", () => {
      const mockItem = createMockNewsItem( {
        title: "",
        content: "",
        author: { name: "" },
        tags: ""
      } );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.getByRole( "dialog" ) ).toBeInTheDocument();
    } );
    test( "handles malformed image data", () => {
      const mockItem = createMockNewsItem( {
        image: { url: null, alt: undefined }
      } );
      ( isFalsyImageUrl as jest.Mock ).mockReturnValue( true );
      ( extractFirstImageFromContent as jest.Mock ).mockReturnValue( null );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.queryByRole( "img" ) ).not.toBeInTheDocument();
    } );
    test( "handles circular references in item data", () => {
      const mockItem = createMockNewsItem();
      // Create a circular reference
      ( mockItem as any ).self = mockItem;
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.getByRole( "dialog" ) ).toBeInTheDocument();
    } );
  } );
  describe( "Utility Function Integration", () => {
    test( "calls formatSmartDate with correct parameters", () => {
      const mockItem = createMockNewsItem( {
        publishedDate: "2023-01-01",
        dateFormat: "MILLIS"
      } );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( formatSmartDate ).toHaveBeenCalledWith( "2023-01-01", "MILLIS" );
    } );
    test( "calls decodeHtmlEntities with content", () => {
      const mockItem = createMockNewsItem( { content: "<p>Raw HTML</p>" } );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( decodeHtmlEntities ).toHaveBeenCalledWith( "<p>Raw HTML</p>" );
    } );
    test( "calls isFalsyImageUrl with image URL", () => {
      const mockItem = createMockNewsItem();
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( isFalsyImageUrl ).toHaveBeenCalledWith( "https://example.com/image.jpg" );
    } );
    test( "calls extractFirstImageFromContent when needed", () => {
      const mockItem = createMockNewsItem( { image: undefined } );
      ( isFalsyImageUrl as jest.Mock ).mockReturnValue( true );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( extractFirstImageFromContent ).toHaveBeenCalled();
    } );
  } );
  describe( "Advanced Condition Traps and Lifecycle Bounds", () => {
    test( "bypasses event listener attachment when dialog is rendered in closed state", () => {
      const addSpy = jest.spyOn( document, "addEventListener" );
      render(
        <CECNewsDialog
          open={false}
          item={createMockNewsItem()}
          onClose={mockOnClose}
        />
      );
      expect( addSpy ).not.toHaveBeenCalledWith( "keydown", expect.any( Function ) );
      addSpy.mockRestore();
    } );
    test( "cleans up keydown event listener strictly on component unmount", () => {
      const removeSpy = jest.spyOn( document, "removeEventListener" );
      const { unmount } = render(
        <CECNewsDialog
          open={true}
          item={createMockNewsItem()}
          onClose={mockOnClose}
        />
      );
      unmount();
      expect( removeSpy ).toHaveBeenCalledWith( "keydown", expect.any( Function ) );
      removeSpy.mockRestore();
    } );
    test( "evaluates tag array fallback to empty array when tags prop is an invalid primitive type", () => {
      const mockItem = createMockNewsItem( { tags: 12345 as any } );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      const tagsContainer = screen.getByRole( "dialog" ).querySelector( ".newsDialog__tags" );
      expect( tagsContainer ).toBeEmptyDOMElement();
    } );
    test( "omits the bullet separator strictly when author name evaluates to empty string but date exists", () => {
      const mockItem = createMockNewsItem( { author: { name: "" } } );
      ( formatSmartDate as jest.Mock ).mockReturnValue( "Valid Date" );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.queryByText( "•" ) ).not.toBeInTheDocument();
      expect( screen.getByText( "Valid Date" ) ).toBeInTheDocument();
    } );
    test( "omits the bullet separator strictly when author exists but date evaluates to empty string", () => {
      const mockItem = createMockNewsItem( { author: { name: "Valid Author" } } );
      ( formatSmartDate as jest.Mock ).mockReturnValue( "" );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( screen.queryByText( "•" ) ).not.toBeInTheDocument();
      expect( screen.getByText( "Valid Author" ) ).toBeInTheDocument();
    } );
    test( "passes explicit null to isFalsyImageUrl when image object exists but url is undefined", () => {
      const mockItem = createMockNewsItem( { image: { url: undefined as any } } );
      render(
        <CECNewsDialog
          open={true}
          item={mockItem}
          onClose={mockOnClose}
        />
      );
      expect( isFalsyImageUrl ).toHaveBeenCalledWith( null );
    } );
  } );
} );
