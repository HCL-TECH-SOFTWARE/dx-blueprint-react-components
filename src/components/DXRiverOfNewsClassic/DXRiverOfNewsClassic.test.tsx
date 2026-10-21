import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { BasicExampleArgs, AllParamsArgs, NoThumbsArgs } from "./DXRiverOfNewsClassic.stories";
import DXRiverOfNewsClassic from "./DXRiverOfNewsClassic";

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
