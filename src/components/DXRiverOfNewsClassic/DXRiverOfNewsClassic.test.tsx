import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { BasicExampleArgs, AllParamsArgs, } from "./DXRiverOfNewsClassic.stories";
import DXRiverOfNewsClassic from "./DXRiverOfNewsClassic";

test( "If Main title matches given property", () => {
    render( <DXRiverOfNewsClassic {...BasicExampleArgs} /> );
    expect( screen.getByTestId( "riverOfNewsTitle" ) ).toHaveTextContent( BasicExampleArgs.title );
} );

test( "If View All Button title matches given property", () => {
    render( <DXRiverOfNewsClassic {...BasicExampleArgs} /> );
    expect( screen.getByTestId( "riverOfNewsAllButton" ) ).toHaveTextContent( BasicExampleArgs.viewAllLink.label );
} );

test( "If View All Button URL matches user input", () => {
    render( <DXRiverOfNewsClassic {...BasicExampleArgs} /> );
    expect( screen.getByTestId( "riverOfNewsAllButton" ) ).toHaveAttribute( "href", BasicExampleArgs.viewAllLink.url );
} );

test( "If View All Button TARGET matches user input", () => {
    render( <DXRiverOfNewsClassic {...AllParamsArgs} /> );
    expect( screen.getByTestId( "riverOfNewsAllButton" ) ).toHaveAttribute( "target", AllParamsArgs.viewAllLink.target );
} );

test( "If View All button NOT shows the 'external' icon target not being _blank.", () => {
    render( <DXRiverOfNewsClassic {...BasicExampleArgs} /> );
    expect( screen.getByTestId( "riverOfNewsAllButton" ).querySelector( "i" ) ).toBeNull();
} );


test( "If View All button have the 'external' icon on _blank target.", () => {
    render( <DXRiverOfNewsClassic {...AllParamsArgs} /> );
    expect( screen.getByTestId( "riverOfNewsAllButton" ).querySelector( "i" ) ).not.toBeNull();
} );

test( "If the component render all News Items given as parameters", () => {
    render( <DXRiverOfNewsClassic {...BasicExampleArgs} /> );
    expect( screen.getByTestId( "riverOfNewsListContainer" ).children.length ).toEqual( BasicExampleArgs.riverOfNews.length );
} );
