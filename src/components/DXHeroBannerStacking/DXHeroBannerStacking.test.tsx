import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import DXHeroBannerStacking from "./DXHeroBannerStacking";
import { HeroBannerStackingArgs } from "./DXHeroBannerStacking.stories";

test( "If component renders the expected amount of items", () => {
    render( <DXHeroBannerStacking {...HeroBannerStackingArgs} /> );
    expect( screen.getByTestId( "HBStacking--list" ).children.length ).toEqual( HeroBannerStackingArgs.items.length );
} );

test( "If the card has the expected style index value", () => {
    render( <DXHeroBannerStacking {...HeroBannerStackingArgs} /> );
    expect( screen.getByTestId( "HBStacking--list" ).firstChild ).toHaveStyle( "--index: 1" );
} );
