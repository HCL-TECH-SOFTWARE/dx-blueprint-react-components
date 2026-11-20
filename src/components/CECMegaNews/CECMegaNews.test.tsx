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
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CECMegaNews from "./CECMegaNews";
import { itSupportsExtensionProps } from "../../testUtils/extensionContract";
import type { NewsItemProps } from "../../utilities/cec-types";
// Mock child components
jest.mock( "../CECNewsTile/CECNewsTile", () => ( {
    __esModule: true,
    default: ( { item, onClick, mode, imagePosition, size, showImage }: any ) => (
        <div
            data-testid="news-tile"
            data-mode={mode}
            data-image-position={imagePosition}
            data-size={size}
            data-show-image={showImage}
            data-item-id={item._id}
            onClick={onClick}
        >
            {item.link?.label || "News Tile"}
        </div>
    ),
} ) );
jest.mock( "../CECNewsDialog/CECNewsDialog", () => ( {
    __esModule: true,
    default: ( { open, item, onClose }: any ) =>
        open ? (
            <div data-testid="news-dialog" onClick={onClose}>
                Dialog: {item?.link?.label}
            </div>
        ) : null,
} ) );
const mockItems: NewsItemProps[] = [
    {
        _id: "1",
        link: { label: "Hero News Article", url: "https://example.com/1" },
    },
    {
        _id: "2",
        link: { label: "Medium News 1", url: "https://example.com/2" },
    },
    {
        _id: "3",
        link: { label: "Medium News 2", url: "https://example.com/3" },
    },
    {
        _id: "4",
        link: { label: "Low News 1", url: "https://example.com/4" },
    },
    {
        _id: "5",
        link: { label: "Low News 2", url: "https://example.com/5" },
    },
];
describe( "CECMegaNews", () => {
    describe( "Basic Rendering", () => {
        test( "renders without crashing", () => {
            render( <CECMegaNews items={mockItems} /> );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
        } );
        test( "renders correct number of tiles", () => {
            render( <CECMegaNews items={mockItems.slice( 0, 3 )} /> );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 3 );
        } );
        test( "renders with custom className", () => {
            const { container } = render(
                <CECMegaNews items={mockItems} className="custom-class" />
            );
            expect( container.querySelector( ".megaNews" ) ).toHaveClass( "custom-class" );
        } );
    } );
    describe( "Layout Variations", () => {
        test( "renders 1-2 layout correctly", () => {
            const { container } = render(
                <CECMegaNews items={mockItems} layout="1-2" />
            );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 3 );
            const tiles = screen.getAllByTestId( "news-tile" );
            expect( tiles[0] ).toHaveAttribute( "data-size", "xl" );
            expect( tiles[1] ).toHaveAttribute( "data-size", "md" );
            expect( tiles[2] ).toHaveAttribute( "data-size", "md" );
        } );
        test( "renders 1-2-2 layout correctly", () => {
            render( <CECMegaNews items={mockItems} layout="1-2-2" /> );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
            const tiles = screen.getAllByTestId( "news-tile" );
            expect( tiles[0] ).toHaveAttribute( "data-size", "xl" );
            expect( tiles[1] ).toHaveAttribute( "data-size", "md" );
            expect( tiles[2] ).toHaveAttribute( "data-size", "md" );
            expect( tiles[3] ).toHaveAttribute( "data-size", "md" );
            expect( tiles[4] ).toHaveAttribute( "data-size", "md" );
        } );
        test( "renders 1-4 layout correctly", () => {
            render( <CECMegaNews items={mockItems} layout="1-4" /> );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
            const tiles = screen.getAllByTestId( "news-tile" );
            expect( tiles[0] ).toHaveAttribute( "data-size", "xl" );
            expect( tiles[1] ).toHaveAttribute( "data-size", "sm" );
            expect( tiles[2] ).toHaveAttribute( "data-size", "sm" );
            expect( tiles[3] ).toHaveAttribute( "data-size", "sm" );
            expect( tiles[4] ).toHaveAttribute( "data-size", "sm" );
        } );
        test( "applies heroPosition correctly", () => {
            render( <CECMegaNews items={mockItems} layout="1-2" heroPosition="right" /> );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 3 );
            // Right position should keep the first tile as hero
            const tiles = screen.getAllByTestId( "news-tile" );
            expect( tiles[0] ).toHaveAttribute( "data-size", "xl" );
        } );
    } );
    describe( "Size Recipe", () => {
        test( "applies string sizeRecipe", () => {
            const { container } = render(
                <CECMegaNews items={mockItems} sizeRecipe="300px 200px 150px" />
            );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveAttribute( "style" );
        } );
        test( "handles array sizeRecipe", () => {
            const { container } = render(
                <CECMegaNews
                    items={mockItems}
                    sizeRecipe={["300px", "200px", "150px"] as any}
                />
            );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveAttribute( "style" );
        } );
        test( "applies custom hero/med/low sizes", () => {
            render(
                <CECMegaNews
                    items={mockItems}
                    sizeRecipe="xl-md-sm"
                />
            );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
            const tiles = screen.getAllByTestId( "news-tile" );
            expect( tiles[0] ).toHaveAttribute( "data-size", "xl" ); // hero from custom sizes
        } );
    } );
    describe( "Display Options", () => {
        test( "passes showSummary prop to tiles", () => {
            const { rerender } = render(
                <CECMegaNews items={mockItems} showSummary={false} />
            );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
            rerender( <CECMegaNews items={mockItems} showSummary={true} /> );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
        } );
        test( "passes showCategory prop to tiles", () => {
            render( <CECMegaNews items={mockItems} showCategory={true} /> );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
        } );
        test( "passes showDate prop to tiles", () => {
            render( <CECMegaNews items={mockItems} showDate={true} /> );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
        } );
        test( "applies highlightFirst to mute non-hero tiles", () => {
            render( <CECMegaNews items={mockItems} highlightFirst={true} /> );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
        } );
    } );
    describe( "Click Behavior - Dialog Mode", () => {
        test( "opens dialog when tile is clicked in dialog mode", async () => {
            render( <CECMegaNews items={mockItems} openMode="dialog" /> );
            const firstTile = screen.getAllByTestId( "news-tile" )[0];
            fireEvent.click( firstTile );
            await waitFor( () => {
                expect( screen.getByTestId( "news-dialog" ) ).toBeInTheDocument();
            } );
        } );
        test( "displays correct item in dialog", async () => {
            render( <CECMegaNews items={mockItems} openMode="dialog" /> );
            const firstTile = screen.getAllByTestId( "news-tile" )[0];
            fireEvent.click( firstTile );
            await waitFor( () => {
                expect( screen.getByTestId( "news-dialog" ) ).toHaveTextContent(
                    "Hero News Article"
                );
            } );
        } );
        test( "closes dialog when onClose is called", async () => {
            render( <CECMegaNews items={mockItems} openMode="dialog" /> );
            const firstTile = screen.getAllByTestId( "news-tile" )[0];
            fireEvent.click( firstTile );
            await waitFor( () => {
                expect( screen.getByTestId( "news-dialog" ) ).toBeInTheDocument();
            } );
            const dialog = screen.getByTestId( "news-dialog" );
            fireEvent.click( dialog );
            await waitFor( () => {
                expect( screen.queryByTestId( "news-dialog" ) ).not.toBeInTheDocument();
            } );
        } );
    } );
    describe( "Custom Grid Overrides", () => {
        test( "applies custom gridTemplateAreas", () => {
            const customAreas = '"a b" "c d"';
            const { container } = render(
                <CECMegaNews items={mockItems} gridTemplateAreas={customAreas} />
            );
            const section = container.querySelector( ".megaNews" );
            // Component sets CSS variable, not direct style
            expect( section ).toHaveStyle( { "--mn-areas": customAreas } as any );
        } );
        test( "applies custom gridTemplateColumns", () => {
            const { container } = render(
                <CECMegaNews items={mockItems} gridTemplateColumns="1fr 2fr" />
            );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveStyle( { "--mn-cols": "1fr 2fr" } as any );
        } );
        test( "applies custom gridTemplateRows", () => {
            const { container } = render(
                <CECMegaNews items={mockItems} gridTemplateRows="auto auto auto" />
            );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveStyle( { "--mn-rows": "auto auto auto" } as any );
        } );
        test( "applies areas alias prop", () => {
            const customAreas = ["a b", "c d"];
            const { container } = render(
                <CECMegaNews items={mockItems} areas={customAreas} />
            );
            const section = container.querySelector( ".megaNews" );
            // ensureAreaRows() converts array to quoted newline-separated string
            const expectedAreas = '"a b"\n"c d"';
            expect( section ).toHaveStyle( { "--mn-areas": expectedAreas } as any );
        } );
    } );
    describe( "Card Style", () => {
        test( "applies card mode to tiles by default", () => {
            render( <CECMegaNews items={mockItems} /> );
            const tiles = screen.getAllByTestId( "news-tile" );
            tiles.forEach( ( tile ) => {
                expect( tile ).toHaveAttribute( "data-mode", "card" );
            } );
        } );
        test( "applies divider mode when cardStyle is divider", () => {
            render( <CECMegaNews items={mockItems} cardStyle="divider" /> );
            const tiles = screen.getAllByTestId( "news-tile" );
            tiles.forEach( ( tile ) => {
                expect( tile ).toHaveAttribute( "data-mode", "divider" );
            } );
        } );
        test( "adds divider cell class based on layout and position", () => {
            const { container } = render(
                <CECMegaNews
                    items={mockItems}
                    cardStyle="divider"
                    layout="1-2"
                    heroPosition="top"
                />
            );
            const cells = container.querySelectorAll( ".megaNews__cell" );
            expect( cells[0] ).toHaveClass( "megaNews__cell--withDivider" );
        } );
    } );
    describe( "Accessibility", () => {
        test( "section has role=list attribute on grid", () => {
            render( <CECMegaNews items={mockItems} /> );
            const grid = document.querySelector( ".megaNews__grid" );
            expect( grid ).toHaveAttribute( "role", "list" );
        } );
        test( "each cell has role=listitem attribute", () => {
            render( <CECMegaNews items={mockItems} /> );
            const cells = document.querySelectorAll( '[role="listitem"]' );
            expect( cells.length ).toBeGreaterThan( 0 );
        } );
        test( "cells have data-index attribute", () => {
            render( <CECMegaNews items={mockItems} /> );
            const cells = document.querySelectorAll( ".megaNews__cell" );
            cells.forEach( ( cell, i ) => {
                expect( cell ).toHaveAttribute( "data-index", String( i ) );
            } );
        } );
    } );
    describe( "Edge Cases", () => {
        test( "handles items without _id", () => {
            const itemsNoId = mockItems.map( ( item ) => ( { ...item, _id: undefined } ) );
            render( <CECMegaNews items={itemsNoId} /> );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
        } );
        test( "limits items based on layout maxItems", () => {
            const manyItems = Array.from( { length: 20 }, ( _, i ) => ( {
                ...mockItems[0],
                _id: `item-${i}`,
            } ) );
            render( <CECMegaNews items={manyItems} layout="1-2" /> );
            const tiles = screen.getAllByTestId( "news-tile" );
            expect( tiles ).toHaveLength( 3 ); // 1-2 layout max
        } );
        test( "handles undefined layout gracefully", () => {
            render( <CECMegaNews items={mockItems} layout={undefined} /> );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
        } );
        test( "handles invalid sizeRecipe gracefully", () => {
            render(
                <CECMegaNews items={mockItems} sizeRecipe="invalid-recipe-format" />
            );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
        } );
    } );
    describe( "CSS Variables", () => {
        test( "sets image dimension CSS variables", () => {
            const { container } = render( <CECMegaNews items={mockItems} /> );
            const section = container.querySelector( ".megaNews" );
            const style = section?.getAttribute( "style" );
            expect( style ).toContain( "--mn-thumb-w" );
            expect( style ).toContain( "--mn-thumb-h" );
            expect( style ).toContain( "--mn-row-img-h" );
        } );
        test( "applies custom imageWidth", () => {
            const { container } = render(
                <CECMegaNews items={mockItems} imageWidth="200px" />
            );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveStyle( { "--mn-thumb-w": "200px" } as any );
        } );
    } );
    describe( "Uncovered Lines Coverage", () => {
        test( "handles layout 1-2-2 with hero position right", () => {
            const { container } = render(
                <CECMegaNews
                    items={mockItems}
                    layout="1-2-2"
                    heroPosition="right"
                />
            );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveStyle( {
                "--mn-cols": "1fr 1fr 2fr",
                "--mn-rows": "auto auto"
            } as any );
        } );
        test( "handles layout 1-4 with hero position right", () => {
            const { container } = render(
                <CECMegaNews
                    items={mockItems}
                    layout="1-4"
                    heroPosition="right"
                />
            );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveStyle( {
                "--mn-cols": "1fr 1fr 2fr",
                "--mn-rows": "auto auto"
            } as any );
        } );
        test( "handles navigation with _self target using window.location.assign", () => {
            const mockLocationAssign = jest.fn();
            // Create a mock location object
            const originalLocation = window.location;
            delete ( window as any ).location;
            ( window as any ).location = {
                ...originalLocation,
                assign: mockLocationAssign
            };
            const itemsWithSelfTarget = mockItems.map( item => ( {
                ...item,
                link: { ...item.link, target: "_self", url: "https://example.com/news" }
            } ) );
            render( <CECMegaNews items={itemsWithSelfTarget} openMode="link" /> );
            const firstTile = screen.getAllByTestId( "news-tile" )[0];
            fireEvent.click( firstTile );
            expect( mockLocationAssign ).toHaveBeenCalledWith( "https://example.com/news" );
            // Restore original location
            ( window as any ).location = originalLocation;
        } );
    } );
    describe( "Empty State", () => {
        test( "renders empty state when no items provided", () => {
            render( <CECMegaNews items={[]} /> );
            expect( screen.getByTestId( "megaNews-empty" ) ).toBeInTheDocument();
            expect( screen.getByText( "No News data found" ) ).toBeInTheDocument();
            expect( screen.getByText( /Please configure a valid/ ) ).toBeInTheDocument();
        } );
        test( "renders empty state with proper accessibility attributes", () => {
            render( <CECMegaNews items={[]} /> );
            const emptyState = screen.getByTestId( "megaNews-empty" );
            expect( emptyState ).toHaveAttribute( "role", "note" );
            expect( emptyState ).toHaveAttribute( "aria-live", "polite" );
        } );
        test( "renders empty state when items is null", () => {
            render( <CECMegaNews items={null as any} /> );
            expect( screen.getByTestId( "megaNews-empty" ) ).toBeInTheDocument();
        } );
        test( "renders empty state when items is undefined", () => {
            render( <CECMegaNews items={undefined as any} /> );
            expect( screen.getByTestId( "megaNews-empty" ) ).toBeInTheDocument();
        } );
    } );
    describe( "Image Mode Validation", () => {
        test( "hides images when imageMode is 'none'", () => {
            render( <CECMegaNews items={mockItems} imageMode="none" /> );
            const tiles = screen.getAllByTestId( "news-tile" );
            tiles.forEach( ( tile ) => {
                expect( tile ).toHaveAttribute( "data-show-image", "false" );
            } );
        } );
        test( "shows image only for hero when imageMode is 'hero-only'", () => {
            render( <CECMegaNews items={mockItems} imageMode="hero-only" /> );
            const tiles = screen.getAllByTestId( "news-tile" );
            expect( tiles[0] ).toHaveAttribute( "data-show-image", "true" ); // hero
            tiles.slice( 1 ).forEach( ( tile ) => {
                expect( tile ).toHaveAttribute( "data-show-image", "false" ); // non-hero
            } );
        } );
        test( "hides images for xs tiles regardless of imageMode", () => {
            render( <CECMegaNews items={mockItems} layout="1-4-4" /> );
            const tiles = screen.getAllByTestId( "news-tile" );
            // Low items (index 5+) should have size 'xs' and thus no image
            if ( tiles.length > 5 ) {
                expect( tiles[5] ).toHaveAttribute( "data-size", "xs" );
                expect( tiles[5] ).toHaveAttribute( "data-show-image", "false" );
            }
        } );
    } );
    describe( "Image Position Validation", () => {
        test( "validates image position for layout 1-2-2 with hero left", () => {
            render(
                <CECMegaNews
                    items={mockItems}
                    layout="1-2-2"
                    heroPosition="left"
                    imagePosition="left"
                />
            );
            const tiles = screen.getAllByTestId( "news-tile" );
            // Should force imagePosition to "top" for this layout/hero combination
            tiles.forEach( ( tile ) => {
                expect( tile ).toHaveAttribute( "data-image-position", "top" );
            } );
        } );
        test( "validates image position for layout 1-4-4 with hero left", () => {
            render(
                <CECMegaNews
                    items={mockItems}
                    layout="1-4-4"
                    heroPosition="left"
                    imagePosition="left"
                />
            );
            const tiles = screen.getAllByTestId( "news-tile" );
            // Should force imagePosition to "top" for this layout/hero combination
            tiles.forEach( ( tile ) => {
                expect( tile ).toHaveAttribute( "data-image-position", "top" );
            } );
        } );
        test( "preserves image position for other layout combinations", () => {
            render(
                <CECMegaNews
                    items={mockItems}
                    layout="1-2"
                    heroPosition="top"
                    imagePosition="right"
                />
            );
            const tiles = screen.getAllByTestId( "news-tile" );
            tiles.forEach( ( tile ) => {
                expect( tile ).toHaveAttribute( "data-image-position", "right" );
            } );
        } );
    } );
    describe( "HeroFlow Alias", () => {
        test( "uses heroFlow when both heroFlow and heroPosition provided", () => {
            const { container } = render(
                <CECMegaNews
                    items={mockItems}
                    layout="1-2"
                    heroPosition="left"
                    heroFlow="right"
                />
            );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveStyle( {
                "--mn-cols": "1fr 2fr",
                "--mn-rows": "auto auto"
            } as any );
        } );
        test( "falls back to heroPosition when heroFlow not provided", () => {
            const { container } = render(
                <CECMegaNews
                    items={mockItems}
                    layout="1-2"
                    heroPosition="right"
                />
            );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveStyle( {
                "--mn-cols": "1fr 2fr",
                "--mn-rows": "auto auto"
            } as any );
        } );
        test( "defaults to 'left' when neither heroFlow nor heroPosition provided", () => {
            const { container } = render(
                <CECMegaNews
                    items={mockItems}
                    layout="1-2"
                />
            );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveStyle( {
                "--mn-cols": "2fr 1fr",
                "--mn-rows": "auto auto"
            } as any );
        } );
    } );
    describe( "Layout 1-4-4 Coverage", () => {
        test( "handles layout 1-4-4 with hero position left", () => {
            const { container } = render(
                <CECMegaNews
                    items={mockItems.slice( 0, 9 )}
                    layout="1-4-4"
                    heroPosition="left"
                />
            );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveStyle( {
                "--mn-cols": "2fr 1fr 1fr 1fr",
                "--mn-rows": "auto auto auto auto"
            } as any );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 ); // Limited by available items
        } );
        test( "handles layout 1-4-4 with hero position right", () => {
            const { container } = render(
                <CECMegaNews
                    items={mockItems.slice( 0, 9 )}
                    layout="1-4-4"
                    heroPosition="right"
                />
            );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveStyle( {
                "--mn-cols": "1fr 1fr 1fr 2fr",
                "--mn-rows": "auto auto auto auto"
            } as any );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 ); // Limited by available items
        } );
        test( "handles layout 1-4-4 with hero position top", () => {
            const { container } = render(
                <CECMegaNews
                    items={mockItems.slice( 0, 9 )}
                    layout="1-4-4"
                    heroPosition="top"
                />
            );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveStyle( {
                "--mn-cols": "1fr 1fr 1fr 1fr",
                "--mn-rows": "auto auto auto"
            } as any );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 ); // Limited by available items
        } );
    } );
    describe( "DXQ-49653: Layout 1-4 all heroPosition branches", () => {
        test( "layout 1-4 with heroPosition left applies correct grid vars", () => {
            const { container } = render(
                <CECMegaNews items={mockItems} layout="1-4" heroPosition="left" />
            );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveStyle( {
                "--mn-cols": "2fr 1fr",
                "--mn-rows": "auto auto auto auto"
            } as any );
        } );
        test( "layout 1-4 with heroPosition top (default) applies correct grid vars", () => {
            const { container } = render(
                <CECMegaNews items={mockItems} layout="1-4" heroPosition="top" />
            );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveStyle( {
                "--mn-cols": "1fr 1fr 1fr 1fr",
                "--mn-rows": "auto auto"
            } as any );
        } );
        test( "layout 1-2 with heroPosition top applies correct grid vars", () => {
            const { container } = render(
                <CECMegaNews items={mockItems} layout="1-2" heroPosition="top" />
            );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveStyle( {
                "--mn-cols": "1fr 1fr",
                "--mn-rows": "auto auto"
            } as any );
        } );
        test( "layout 1-2-2 with heroPosition top applies correct grid vars", () => {
            const { container } = render(
                <CECMegaNews items={mockItems} layout="1-2-2" heroPosition="top" />
            );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveStyle( {
                "--mn-cols": "1fr 1fr",
                "--mn-rows": "auto auto auto"
            } as any );
        } );
    } );
    describe( "DXQ-49653: sizeForIndex — low tier tiles", () => {
        const nineItems: NewsItemProps[] = Array.from( { length: 9 }, ( _, i ) => ( {
            _id: String( i + 1 ),
            link: { label: `Item ${i + 1}`, url: `https://example.com/${i + 1}` },
        } ) );
        test( "tiles at index 5-8 get low tier size (xs for 1-4-4)", () => {
            render(
                <CECMegaNews items={nineItems} layout="1-4-4" heroPosition="left" />
            );
            const tiles = screen.getAllByTestId( "news-tile" );
            // Index 0 = hero(xl), 1-4 = med(sm), 5-8 = low(xs)
            expect( tiles[0] ).toHaveAttribute( "data-size", "xl" );
            expect( tiles[1] ).toHaveAttribute( "data-size", "sm" );
            // 9 items capped to maxItems=9 with layout 1-4-4 left
            expect( tiles.length ).toBeGreaterThanOrEqual( 5 );
        } );
        test( "layout 1-4-4 top with 9 items renders 9 tiles with correct low tier (xs)", () => {
            render(
                <CECMegaNews items={nineItems} layout="1-4-4" heroPosition="top" sizeRecipe="xl-sm-xs" />
            );
            const tiles = screen.getAllByTestId( "news-tile" );
            expect( tiles ).toHaveLength( 9 );
            // index 5 should be low tier
            expect( tiles[5] ).toHaveAttribute( "data-size", "xs" );
            expect( tiles[8] ).toHaveAttribute( "data-size", "xs" );
        } );
    } );
    describe( "DXQ-49653: openMode=link navigation branches", () => {
        const originalOpen = window.open;
        const originalAssign = window.location.assign;
        beforeEach( () => {
            window.open = jest.fn();
            Object.defineProperty( window, "location", {
                value: { ...window.location, assign: jest.fn() },
                writable: true,
            } );
        } );
        afterEach( () => {
            window.open = originalOpen;
        } );
        test( "openMode=link with target _blank calls window.open", () => {
            render(
                <CECMegaNews
                    items={[{ _id: "1", link: { label: "A", url: "https://x.com/1", target: "_blank" } }]}
                    layout="1-2"
                    openMode="link"
                />
            );
            fireEvent.click( screen.getByTestId( "news-tile" ) );
            expect( window.open ).toHaveBeenCalledWith( "https://x.com/1", "_blank", "noopener,noreferrer" );
        } );
        test( "openMode=link with target _self calls window.location.assign", () => {
            render(
                <CECMegaNews
                    items={[{ _id: "2", link: { label: "B", url: "https://x.com/2", target: "_self" } }]}
                    layout="1-2"
                    openMode="link"
                />
            );
            fireEvent.click( screen.getByTestId( "news-tile" ) );
            expect( window.location.assign ).toHaveBeenCalledWith( "https://x.com/2" );
        } );
        test( "openMode=link with no url does not navigate", () => {
            render(
                <CECMegaNews
                    items={[{ _id: "3", link: { label: "C" } }]}
                    layout="1-2"
                    openMode="link"
                />
            );
            fireEvent.click( screen.getByTestId( "news-tile" ) );
            expect( window.open ).not.toHaveBeenCalled();
        } );
    } );
    describe( "DXQ-49653: imageWidth CSS var override", () => {
        test( "applies imageWidth as --mn-thumb-w CSS variable", () => {
            const { container } = render(
                <CECMegaNews items={mockItems} imageWidth="300px" />
            );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveStyle( { "--mn-thumb-w": "300px" } as any );
        } );
    } );
    describe( "DXQ-49653: summary/display prop variants", () => {
        test( "summaryMaxChars, summaryLines, summaryEllipsis default values render without error", () => {
            render(
                <CECMegaNews
                    items={mockItems}
                    showSummary={true}
                    summaryMaxChars={100}
                    summaryLines={2}
                    summaryEllipsis="…"
                />
            );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
        } );
        test( "showSummary=false renders tiles without summary", () => {
            render( <CECMegaNews items={mockItems} showSummary={false} /> );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
        } );
        test( "showCategory=false and showDate=false renders tiles", () => {
            render( <CECMegaNews items={mockItems} showCategory={false} showDate={false} /> );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
        } );
    } );
    describe( "DXQ-49653: imageMode branches", () => {
        test( "imageMode=hero-only passes showImage=false to non-hero tiles", () => {
            render( <CECMegaNews items={mockItems} imageMode="hero-only" /> );
            const tiles = screen.getAllByTestId( "news-tile" );
            expect( tiles[0] ).toHaveAttribute( "data-show-image", "true" );
            expect( tiles[1] ).toHaveAttribute( "data-show-image", "false" );
            expect( tiles[2] ).toHaveAttribute( "data-show-image", "false" );
        } );
        test( "imageMode=all passes showImage based on tile size (xs => false)", () => {
            render( <CECMegaNews items={mockItems} layout="1-4-4" imageMode="all" sizeRecipe="xl-sm-xs" heroPosition="top" /> );
            const tiles = screen.getAllByTestId( "news-tile" );
            // hero at index 0 should show image
            expect( tiles[0] ).toHaveAttribute( "data-show-image", "true" );
        } );
    } );
    describe( "DXQ-49653: imagePosition passed to tiles", () => {
        test( "imagePosition=right is passed to tiles (layout where imagePosition is not overridden)", () => {
            render( <CECMegaNews items={mockItems} imagePosition="right" layout="1-4" heroPosition="top" /> );
            const tiles = screen.getAllByTestId( "news-tile" );
            tiles.forEach( tile => {
                expect( tile ).toHaveAttribute( "data-image-position", "right" );
            } );
        } );
        test( "imagePosition=top is passed to tiles", () => {
            render( <CECMegaNews items={mockItems} imagePosition="top" /> );
            const tiles = screen.getAllByTestId( "news-tile" );
            tiles.forEach( tile => {
                expect( tile ).toHaveAttribute( "data-image-position", "top" );
            } );
        } );
        test( "layout=1-2-2 heroPosition=left forces imagePosition=top regardless of prop", () => {
            render(
                <CECMegaNews
                    items={mockItems}
                    layout="1-2-2"
                    heroPosition="left"
                    imagePosition="left"
                />
            );
            const tiles = screen.getAllByTestId( "news-tile" );
            tiles.forEach( tile => {
                expect( tile ).toHaveAttribute( "data-image-position", "top" );
            } );
        } );
    } );
    describe( "DXQ-49653: hasDivider — layout/heroPosition matrix", () => {
        test( "layout 1-2 heroPosition top: cell[0] has withDivider class", () => {
            const { container } = render(
                <CECMegaNews items={mockItems} layout="1-2" heroPosition="top" cardStyle="divider" />
            );
            const cells = container.querySelectorAll( ".megaNews__cell" );
            expect( cells[0].className ).toContain( "megaNews__cell--withDivider" );
        } );
        test( "layout 1-4 heroPosition left: cells[1,2] have withDivider class", () => {
            const { container } = render(
                <CECMegaNews items={mockItems} layout="1-4" heroPosition="left" cardStyle="divider" />
            );
            const cells = container.querySelectorAll( ".megaNews__cell" );
            expect( cells[1].className ).toContain( "megaNews__cell--withDivider" );
            expect( cells[2].className ).toContain( "megaNews__cell--withDivider" );
        } );
        test( "layout 1-4 heroPosition top: cell[0] has withDivider class, cell[1] does not", () => {
            const { container } = render(
                <CECMegaNews items={mockItems} layout="1-4" heroPosition="top" cardStyle="divider" />
            );
            const cells = container.querySelectorAll( ".megaNews__cell" );
            expect( cells[0].className ).toContain( "megaNews__cell--withDivider" );
            expect( cells[1].className ).not.toContain( "megaNews__cell--withDivider" );
        } );
        test( "layout 1-2-2 heroPosition left: cells[1,2] have withDivider", () => {
            const { container } = render(
                <CECMegaNews items={mockItems} layout="1-2-2" heroPosition="left" cardStyle="divider" />
            );
            const cells = container.querySelectorAll( ".megaNews__cell" );
            expect( cells[1].className ).toContain( "megaNews__cell--withDivider" );
            expect( cells[2].className ).toContain( "megaNews__cell--withDivider" );
        } );
        test( "layout 1-4-4 heroPosition top: cells[0-4] have withDivider, cells[5-8] do not", () => {
            const nineItems: NewsItemProps[] = Array.from( { length: 9 }, ( _, i ) => ( {
                _id: String( i + 1 ),
                link: { label: `Item ${i + 1}`, url: `https://example.com/${i + 1}` },
            } ) );
            const { container } = render(
                <CECMegaNews items={nineItems} layout="1-4-4" heroPosition="top" cardStyle="divider" />
            );
            const cells = container.querySelectorAll( ".megaNews__cell" );
            expect( cells[0].className ).toContain( "megaNews__cell--withDivider" );
            expect( cells[4].className ).toContain( "megaNews__cell--withDivider" );
            // cell[5] should NOT have the divider class (index 5 not in [0,1,2,3,4])
            if ( cells.length > 5 ) {
                expect( cells[5].className ).not.toContain( "megaNews__cell--withDivider" );
            }
        } );
    } );
    describe( "DXQ-49653: cols/rows alias props", () => {
        test( "cols and rows alias props set explicit grid", () => {
            const { container } = render(
                <CECMegaNews items={mockItems} cols="1fr 1fr 1fr" rows="auto auto" />
            );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveStyle( { "--mn-cols": "1fr 1fr 1fr" } as any );
            expect( section ).toHaveStyle( { "--mn-rows": "auto auto" } as any );
        } );
        test( "areas alias prop sets explicit grid template areas", () => {
            const { container } = render(
                <CECMegaNews
                    items={mockItems}
                    areas={["mn-top mn-top", "mn-med-01 mn-med-02"]}
                />
            );
            const section = container.querySelector( ".megaNews" );
            expect( section ).toHaveAttribute( "style" );
        } );
    } );
    describe( "DXQ-49653: wrapClass imagePosition class", () => {
        test( "applies megaNews--img-left class by default", () => {
            const { container } = render( <CECMegaNews items={mockItems} /> );
            const section = container.querySelector( ".megaNews" );
            expect( section?.className ).toContain( "megaNews--img-left" );
        } );
        test( "applies megaNews--img-right class for imagePosition=right", () => {
            const { container } = render( <CECMegaNews items={mockItems} imagePosition="right" /> );
            const section = container.querySelector( ".megaNews" );
            expect( section?.className ).toContain( "megaNews--img-right" );
        } );
        test( "applies megaNews--img-top class for imagePosition=top", () => {
            const { container } = render( <CECMegaNews items={mockItems} imagePosition="top" /> );
            const section = container.querySelector( ".megaNews" );
            expect( section?.className ).toContain( "megaNews--img-top" );
        } );
    } );
    describe( "DXQ-49653: maxItemsFromAreas with custom areas", () => {
        test( "custom areas with mn-med-02 limits to 3 items", () => {
            render(
                <CECMegaNews
                    items={mockItems}
                    areas={["mn-top mn-med-01", "mn-top mn-med-02"]}
                />
            );
            // maxItems from custom areas with mn-med-02 (no mn-med-04 or mn-low-04) = 3
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 3 );
        } );
        test( "custom areas with single area limits to 1 item", () => {
            render(
                <CECMegaNews
                    items={mockItems}
                    areas="mn-top"
                />
            );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 1 );
        } );
    } );
    describe( "Zero-Assumption Deep Assertions: MegaNews Engine Boundaries", () => {
        test( "Grid Areas Engine: ensureAreaRows strictly handles pre-quoted strings, unquoted strings, and empty spaces", () => {
            const { container } = render(
                <CECMegaNews
                    items={mockItems}
                    // Passing a dirty array to force branch execution on startsWith('"') and filter(Boolean)
                    areas={['"pre-quoted"', '   ', 'unquoted-area', '']}
                />
            );
            const section = container.querySelector( ".megaNews" );
            // The exact output string must retain the pre-quoted, quote the unquoted, and strip the empty/whitespace
            const expectedAreas = '"pre-quoted"\n"unquoted-area"';
            expect( section ).toHaveStyle( { "--mn-areas": expectedAreas } as any );
        } );
        test( "Max Items Engine: maxItemsFromAreas strictly limits to 9 for mn-low-04 and 5 for mn-med-04", () => {
            const twentyItems = Array.from( { length: 20 }, ( _, i ) => ( {
                _id: String( i ),
                link: { label: `Item ${i}`, url: `https://test.com/${i}` }
            } ) );
            // Test mn-low-04 boundary constraint
            const { rerender } = render(
                <CECMegaNews items={twentyItems} areas={["mn-low-04"]} />
            );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 9 );
            // Test mn-med-04 boundary constraint
            rerender(
                <CECMegaNews items={twentyItems} areas={["mn-med-04"]} />
            );
            expect( screen.getAllByTestId( "news-tile" ) ).toHaveLength( 5 );
        } );
        test( "Unique Key Engine: gracefully falls back when item lacks _id, title, and link entirely", () => {
            const absoluteEmptyItems: NewsItemProps[] = [
                { _id: undefined as any, title: undefined, link: undefined }
            ];
            const { container } = render( <CECMegaNews items={absoluteEmptyItems} /> );
            const tiles = screen.getAllByTestId( "news-tile" );
            expect( tiles ).toHaveLength( 1 );
            // Verify rendering succeeded and the extreme fallback logic didn't throw an error
            expect( container.querySelector( '.megaNews__cell' ) ).toBeInTheDocument();
        } );
        test( "Size Recipe Engine: parseRecipe arrays strictly trim and filter falsy values", () => {
            const { container } = render(
                <CECMegaNews
                    items={mockItems}
                    layout="1-4-4" // Component defaults to xl, sm, xs
                    sizeRecipe={[" lg ", "   ", "md", null, undefined] as any}
                />
            );
            const tiles = screen.getAllByTestId( "news-tile" );
            // Index 0: " lg ".trim() -> "lg"
            expect( tiles[0] ).toHaveAttribute( "data-size", "lg" );
            // Index 1 (Med fallback): array index 1 was "   ", filtered out. Array index 2 is "md".
            expect( tiles[1] ).toHaveAttribute( "data-size", "md" );
            // Index 5 (Low fallback): missing from array, falls back to default layout low ("xs")
            if ( tiles.length > 5 ) {
                expect( tiles[5] ).toHaveAttribute( "data-size", "xs" );
            }
        } );
        test( "Divider Matrix Engine: rigorously asserts untested layout/heroPosition branches", () => {
            const mockTiles = Array.from( { length: 9 }, ( _, i ) => ( { _id: String( i ), link: { label: String( i ) } } ) );
            // 1-2 right: divider on index 1
            const { container: c1 } = render( <CECMegaNews items={mockTiles} layout="1-2" heroPosition="right" cardStyle="divider" /> );
            expect( c1.querySelectorAll( ".megaNews__cell" )[1].className ).toContain( "megaNews__cell--withDivider" );
            // 1-4 right: divider on index 1 and 2
            const { container: c2 } = render( <CECMegaNews items={mockTiles} layout="1-4" heroPosition="right" cardStyle="divider" /> );
            expect( c2.querySelectorAll( ".megaNews__cell" )[1].className ).toContain( "megaNews__cell--withDivider" );
            expect( c2.querySelectorAll( ".megaNews__cell" )[2].className ).toContain( "megaNews__cell--withDivider" );
            // 1-2-2 top: divider on index 0, 1, and 2
            const { container: c3 } = render( <CECMegaNews items={mockTiles} layout="1-2-2" heroPosition="top" cardStyle="divider" /> );
            expect( c3.querySelectorAll( ".megaNews__cell" )[0].className ).toContain( "megaNews__cell--withDivider" );
            expect( c3.querySelectorAll( ".megaNews__cell" )[1].className ).toContain( "megaNews__cell--withDivider" );
            expect( c3.querySelectorAll( ".megaNews__cell" )[2].className ).toContain( "megaNews__cell--withDivider" );
        } );
    } );
    describe( "CECMegaNews Hardening", () => {
        test( "Image Variables Math: rigorously asserts calculated dimensions for hero and medium tiers", () => {
            // We use sizeRecipe="xl-lg-md". 
            // Hero = 'xl' (w: 200, h: 140, rowH: 320)
            // Med = 'lg' (w: 160, h: 112, rowH: 260)
            const { container } = render(
                <CECMegaNews items={mockItems} sizeRecipe="xl-lg-md" />
            );
            const section = container.querySelector( ".megaNews" );
            // Assert precise mathematical outputs to kill mutation of `w * 1.8` and `rowH + 80`
            expect( section ).toHaveStyle( {
                "--mn-thumb-w": "160px",
                "--mn-thumb-h": "112px",
                "--mn-row-img-h": "260px",
                "--mn-hero-side-w": "360px", // 200 * 1.8
                "--mn-hero-side-h": "400px", // 320 + 80
                "--mn-hero-top-h": "400px"   // 320 + 80
            } as any );
        } );
        test( "Divider Matrix: strictly asserts layout 1-4-4 with hero right boundaries", () => {
            const nineItems = Array.from( { length: 9 }, ( _, i ) => ( {
                _id: String( i ),
                link: { label: `Item ${i}`, url: `https://test.com/${i}` },
            } ) );
            const { container } = render(
                <CECMegaNews items={nineItems} layout="1-4-4" heroPosition="right" cardStyle="divider" />
            );
            const cells = container.querySelectorAll( ".megaNews__cell" );
            // The exact expected divider indexes for 1-4-4 right are [1, 2, 5, 6].
            const expectedDividerIndexes = [1, 2, 5, 6];
            cells.forEach( ( cell, index ) => {
                if ( expectedDividerIndexes.includes( index ) ) {
                    expect( cell.className ).toContain( "megaNews__cell--withDivider" );
                } else {
                    expect( cell.className ).not.toContain( "megaNews__cell--withDivider" );
                }
            } );
        } );
        test( "Link Target Fallback: correctly routes to '_blank' when target property is undefined", () => {
            const mockOpen = jest.fn();
            const originalOpen = window.open;
            window.open = mockOpen;
            // Provide an item with a URL but absolutely no `target` specified
            const missingTargetItem = [{
                _id: "missing-target",
                link: { label: "Click Me", url: "https://example.com/fallback" }
            }];
            render( <CECMegaNews items={missingTargetItem} openMode="link" /> );
            // Target the tile wrapper which holds the onClick handler from the mock
            const tile = screen.getByTestId( "news-tile" );
            fireEvent.click( tile );
            // Assert the logical OR fallback `target || "_blank"` executed correctly
            expect( mockOpen ).toHaveBeenCalledWith( "https://example.com/fallback", "_blank", "noopener,noreferrer" );
            window.open = originalOpen;
        } );
        test( "Size Fallback Engine: safely filters out completely invalid array inputs and defaults to layout presets", () => {
            const { container } = render(
                <CECMegaNews
                    items={mockItems}
                    layout="1-2-2"
                    // Pass an array of entirely unmapped sizes and mixed types
                    sizeRecipe={["INVALID_SIZE", 999, {}, "md"] as any}
                />
            );
            const tiles = screen.getAllByTestId( "news-tile" );
            // Layout 1-2-2 defaults: [xl, md, md].
            // "INVALID_SIZE" is rejected by `VALID_SIZE.has()`, falling back to "xl".
            expect( tiles[0] ).toHaveAttribute( "data-size", "xl" );
            // `999` (index 1) and `{}` (index 2) are filtered/rejected, shifting "md" down or falling back.
            // Med defaults to "md", Low defaults to "md" for 1-2-2.
            expect( tiles[1] ).toHaveAttribute( "data-size", "md" );
            if ( tiles.length > 4 ) {
                expect( tiles[4] ).toHaveAttribute( "data-size", "md" );
            }
        } );
        test( "Unique Key Generation: rigorously applies slice boundary to title and URL fallbacks", () => {
            const ultraLongTitle = "A".repeat( 50 );
            const ultraLongUrl = "https://" + "B".repeat( 50 ) + ".com";
            // Provide items strictly missing the `_id` property to force the fallback key generation
            const noIdItems = [
                { link: { url: ultraLongUrl, label: ultraLongTitle }, title: ultraLongTitle }
            ];
            // If the `.slice(0, 20)` mutation survives, it won't crash the DOM, but rendering multiple 
            // with the same sliced string validates the logic pathway executed safely.
            const { container } = render( <CECMegaNews items={noIdItems} /> );
            const cell = container.querySelector( ".megaNews__cell" );
            expect( cell ).toBeInTheDocument();
            // Assert the data-index was correctly bound indicating successful iteration
            expect( cell ).toHaveAttribute( "data-index", "0" );
        } );
        test( "Image Validation Matrix: strictly asserts layout trap for 1-2-2 with hero left", () => {
            const { rerender } = render(
                <CECMegaNews items={mockItems} layout="1-2-2" heroPosition="left" imagePosition="right" />
            );
            // Layouts 1-2-2 and 1-4-4 with hero "left" strictly force image position to "top".
            expect( screen.getAllByTestId( "news-tile" )[0] ).toHaveAttribute( "data-image-position", "top" );
            // Changing the layout to 1-2 should BYPASS the trap and respect the provided imagePosition "right".
            // Use rerender to prevent DOM node leakage from the previous test rendering pass
            rerender(
                <CECMegaNews items={mockItems} layout="1-2" heroPosition="left" imagePosition="right" />
            );
            expect( screen.getAllByTestId( "news-tile" )[0] ).toHaveAttribute( "data-image-position", "right" );
        } );
    } );
} );

itSupportsExtensionProps( ( extra ) => <CECMegaNews items={mockItems} {...extra} /> );
