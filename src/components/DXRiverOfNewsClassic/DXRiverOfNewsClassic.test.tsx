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
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { BasicExampleArgs, AllParamsArgs, NoThumbsArgs } from "./DXRiverOfNewsClassic.stories";
import DXRiverOfNewsClassic from "./DXRiverOfNewsClassic";
import { RiverOfNewsProps } from "./DXRiverOfNewsClassic";

test( "If Main title matches given property", () => {
    render( <DXRiverOfNewsClassic {...BasicExampleArgs} /> );
    expect( screen.getByTestId( "riverOfNewsTitle" ) ).toHaveTextContent( BasicExampleArgs.title );
} );

test( "If header icon is passed, it should render it", () => {
    render( <DXRiverOfNewsClassic {...BasicExampleArgs} /> );
    expect( screen.getByTestId( "riverOfNewsHeaderIcon" ) ).toHaveClass( BasicExampleArgs.icons?.header as string );
} );

test( "If View All Button title matches given property", () => {
    const props = {
        ...BasicExampleArgs,
        viewAllLink: {
            label: "View All",
            url: "https://www.hcl-software.com",
        }
    };
    render( <DXRiverOfNewsClassic {...props} /> );
    expect( screen.getByTestId( "riverOfNewsAllButton" ) ).toHaveTextContent( props.viewAllLink.label );
} );

test( "If View All Button URL matches user input", () => {
    const props = {
        ...BasicExampleArgs,
        viewAllLink: {
            label: "View All",
            url: "https://www.hcl-software.com",
        }
    };
    render( <DXRiverOfNewsClassic {...props} /> );
    expect( screen.getByTestId( "riverOfNewsAllButton" ) ).toHaveAttribute( "href", props.viewAllLink.url );
} );

test( "If view all link is not passed, it should not render the top link", () => {
    render( <DXRiverOfNewsClassic {...BasicExampleArgs} /> );
    expect( screen.queryByTestId( "riverOfNewsAllButton" ) ).not.toBeInTheDocument();
} );

test( "If View All Button TARGET matches user input", () => {
    const props = {
        ...AllParamsArgs,
        viewAllLink: {
            label: "View All",
            url: "https://www.hcl-software.com",
            target: "_blank" as const,
        }
    };
    render( <DXRiverOfNewsClassic {...props} /> );
    expect( screen.getByTestId( "riverOfNewsAllButton" ) ).toHaveAttribute( "target", props.viewAllLink.target );
} );

test( "If View All button NOT shows the 'external' icon target not being _blank.", () => {
    const props = {
        ...BasicExampleArgs,
        viewAllLink: {
            label: "View All",
            url: "https://www.hcl-software.com",
        }
    };
    render( <DXRiverOfNewsClassic {...props} /> );
    expect( screen.getByTestId( "riverOfNewsAllButton" ).querySelector( "i" ) ).toBeNull();
} );


test( "If View All button have the 'external' icon on _blank target.", () => {
    const props = {
        ...AllParamsArgs,
        viewAllLink: {
            label: "View All",
            url: "https://www.hcl-software.com",
            target: "_blank" as const,
        }
    };
    render( <DXRiverOfNewsClassic {...props} /> );
    expect( screen.getByTestId( "riverOfNewsAllButton" ).querySelector( "i" ) ).not.toBeNull();
} );

test( "If the component render all News Items given as parameters", () => {
    render( <DXRiverOfNewsClassic {...BasicExampleArgs} /> );
    // Component shows only 6 items initially (INITIAL_VISIBLE_ITEMS)
    expect( screen.getByTestId( "riverOfNewsListContainer" ).children.length ).toEqual( 6 );
} );

test( "If the component has more items than the initial set, it should render pagination", () => {
    render( <DXRiverOfNewsClassic {...BasicExampleArgs} /> );
    expect( screen.getByTestId( "pagination" ) ).toBeInTheDocument();
} );

test( "If the items do not exceed the initial set, it should not render pagination", () => {
    render( <DXRiverOfNewsClassic {...NoThumbsArgs} /> );
    expect( screen.queryByTestId( "pagination" ) ).not.toBeInTheDocument();
} );

test( "dropdown button shows when there are more than 6 items in the active page", () => {
    render( <DXRiverOfNewsClassic {...BasicExampleArgs} /> );
    expect( screen.getByTestId( "riverOfNewsDropdownButton" ) ).toBeInTheDocument();
} );

test( "dropdown button is not shown when active page has 6 or fewer items", () => {
    render( <DXRiverOfNewsClassic {...NoThumbsArgs} /> );
    expect( screen.queryByTestId( "riverOfNewsDropdownButton" ) ).not.toBeInTheDocument();
} );

test( "hidden news list is not visible by default", () => {
    render( <DXRiverOfNewsClassic {...BasicExampleArgs} /> );
    expect( screen.queryByTestId( "riverOfNewsHiddenListContainer" ) ).not.toBeInTheDocument();
} );

test( "clicking dropdown button expands hidden news list", () => {
    render( <DXRiverOfNewsClassic {...BasicExampleArgs} /> );
    const button = screen.getByTestId( "riverOfNewsDropdownButton" );
    expect( button ).toHaveAttribute( "aria-expanded", "false" );
    expect( button ).toHaveAttribute( "aria-label", "Show more items" );

    fireEvent.click( button );

    expect( button ).toHaveAttribute( "aria-expanded", "true" );
    expect( button ).toHaveAttribute( "aria-label", "Show less items" );
    expect( screen.getByTestId( "riverOfNewsHiddenListContainer" ) ).toBeInTheDocument();
} );

test( "clicking dropdown button twice collapses hidden news list", () => {
    render( <DXRiverOfNewsClassic {...BasicExampleArgs} /> );
    const button = screen.getByTestId( "riverOfNewsDropdownButton" );

    fireEvent.click( button );
    expect( screen.getByTestId( "riverOfNewsHiddenListContainer" ) ).toBeInTheDocument();

    fireEvent.click( button );
    expect( screen.queryByTestId( "riverOfNewsHiddenListContainer" ) ).not.toBeInTheDocument();
    expect( button ).toHaveAttribute( "aria-expanded", "false" );
} );

test( "dropdown caret icon toggles between down and up", () => {
    render( <DXRiverOfNewsClassic {...BasicExampleArgs} /> );
    const button = screen.getByTestId( "riverOfNewsDropdownButton" );
    expect( button.querySelector( "i" ) ).toHaveClass( "ci-Caret_Down_MD" );

    fireEvent.click( button );
    expect( button.querySelector( "i" ) ).toHaveClass( "ci-Caret_Up_MD" );
} );

test( "hidden news items are rendered with correct test ids when expanded", () => {
    render( <DXRiverOfNewsClassic {...BasicExampleArgs} /> );
    fireEvent.click( screen.getByTestId( "riverOfNewsDropdownButton" ) );

    const hiddenItems = screen.getAllByTestId( "newsCardItemHidden" );
    expect( hiddenItems.length ).toBeGreaterThan( 0 );
} );

test( "visible news list contains exactly 6 li items", () => {
    render( <DXRiverOfNewsClassic {...BasicExampleArgs} /> );
    const list = screen.getByTestId( "riverOfNewsListContainer" );
    expect( list.querySelectorAll( ":scope > li" ).length ).toBe( 6 );
} );

test( "renders without pagination props", () => {
    const props: RiverOfNewsProps = {
        title: "No Pagination",
        riverOfNews: BasicExampleArgs.riverOfNews.slice( 0, 3 ),
    };
    render( <DXRiverOfNewsClassic {...props} /> );
    expect( screen.getByTestId( "riverOfNewsTitle" ) ).toHaveTextContent( "No Pagination" );
    expect( screen.queryByTestId( "pagination" ) ).not.toBeInTheDocument();
    expect( screen.queryByTestId( "riverOfNewsDropdownButton" ) ).not.toBeInTheDocument();
} );

test( "does not render pagination when paginationProps has empty sets", () => {
    const props: RiverOfNewsProps = {
        ...BasicExampleArgs,
        paginationProps: {
            sets: [],
            active: 1,
            activeSet: 8,
        }
    };
    render( <DXRiverOfNewsClassic {...props} /> );
    expect( screen.queryByTestId( "pagination" ) ).not.toBeInTheDocument();
} );

test( "does not render pagination when paginationProps active is 0", () => {
    const props: RiverOfNewsProps = {
        ...BasicExampleArgs,
        paginationProps: {
            sets: ["8", "16"],
            active: 0,
            activeSet: 8,
        }
    };
    render( <DXRiverOfNewsClassic {...props} /> );
    expect( screen.queryByTestId( "pagination" ) ).not.toBeInTheDocument();
} );

test( "does not render pagination when paginationProps activeSet is 0", () => {
    const props: RiverOfNewsProps = {
        ...BasicExampleArgs,
        paginationProps: {
            sets: ["8", "16"],
            active: 1,
            activeSet: 0,
        }
    };
    render( <DXRiverOfNewsClassic {...props} /> );
    expect( screen.queryByTestId( "pagination" ) ).not.toBeInTheDocument();
} );

test( "uses maxVisibleItems as default set size when paginationProps is absent", () => {
    const items = BasicExampleArgs.riverOfNews.slice( 0, 4 );
    const props: RiverOfNewsProps = {
        title: "Max Visible",
        riverOfNews: items,
        maxVisibleItems: 4,
    };
    render( <DXRiverOfNewsClassic {...props} /> );
    expect( screen.getByTestId( "riverOfNewsListContainer" ).children.length ).toBe( 4 );
    expect( screen.queryByTestId( "riverOfNewsDropdownButton" ) ).not.toBeInTheDocument();
} );

test( "renders edit button when _edit prop is provided", () => {
    const props = {
        ...BasicExampleArgs,
        _edit: { link: { url: "http://example.com/edit" } }
    };
    const { container } = render( <DXRiverOfNewsClassic {...props} /> );
    expect( container.querySelector( ".dxEditButton" ) ).not.toBeNull();
} );

test( "does not render edit button when _edit prop is absent", () => {
    const { container } = render( <DXRiverOfNewsClassic {...BasicExampleArgs} /> );
    expect( container.querySelector( ".dxEditButton" ) ).toBeNull();
} );

test( "does not render header icon when icons prop is omitted", () => {
    const props: RiverOfNewsProps = {
        title: "No Icon",
        riverOfNews: BasicExampleArgs.riverOfNews.slice( 0, 3 ),
    };
    render( <DXRiverOfNewsClassic {...props} /> );
    expect( screen.queryByTestId( "riverOfNewsHeaderIcon" ) ).not.toBeInTheDocument();
} );

test( "renders correct number of items per page based on activeSet", () => {
    const props: RiverOfNewsProps = {
        ...BasicExampleArgs,
        paginationProps: {
            sets: ["4", "8"],
            active: 1,
            activeSet: 4,
        }
    };
    render( <DXRiverOfNewsClassic {...props} /> );
    expect( screen.getByTestId( "riverOfNewsListContainer" ).children.length ).toBe( 4 );
    expect( screen.queryByTestId( "riverOfNewsDropdownButton" ) ).not.toBeInTheDocument();
} );
