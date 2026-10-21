import React from "react";
import '@testing-library/jest-dom';
import { fireEvent, render } from "@testing-library/react";
import DXNavigationHeader2 from "./DXNavigationHeader2";
import { NavigationHeader2Args } from "./DXNavigationHeader2.stories";

test( "Test if the Navigation Header renders the Portal Logo component", () => {
    render( <DXNavigationHeader2 {...NavigationHeader2Args} /> );
    let container = document.getElementsByClassName( "dxPortalLogos" )[0];
    expect( container ).not.toBeNull;
} );

test( "Test if the Navigation Header renders the SearchInput component", () => {
    render( <DXNavigationHeader2 {...NavigationHeader2Args} /> );
    let container = document.getElementsByClassName( "dxSearchInput" )[0];
    expect( container ).not.toBeNull;
} );

test( "Test if the Navigation Header renders the Utility Zone component", () => {
    render( <DXNavigationHeader2 {...NavigationHeader2Args} /> );
    let container = document.getElementsByClassName( "dxUtilityZone" )[0];
    expect( container ).not.toBeNull;
    expect( document.querySelector( ".dxUtilityZone__overlay" ) ).toBeNull();
} );

test( "Test if the Navigation Header renders the Mega Menu component", () => {
    render( <DXNavigationHeader2 {...NavigationHeader2Args} /> );
    let container = document.getElementsByClassName( "dxMegaMenu" )[0];
    expect( container ).not.toBeNull;
} );

test( "Test if the Navigation Header renders the My Next meeting component", () => {
    render( <DXNavigationHeader2 {...NavigationHeader2Args} /> );
    let container = document.getElementsByClassName( "dxMyNextMeeting" )[0];
    expect( container ).not.toBeNull;
} );

test( "Test if the Navigation Header renders the Drawer component", () => {
    render( <DXNavigationHeader2 {...NavigationHeader2Args} /> );
    let container = document.getElementsByClassName( "dxDrawerMenu" )[0];
    expect( container ).not.toBeNull;
} );

test( "does not render optional desktop search and meeting content when omitted", () => {
    render( <DXNavigationHeader2
        {...NavigationHeader2Args}
        searchInput={undefined}
        nextMeeting={undefined}
    /> );

    expect( document.querySelector( ".dxSearchInput" ) ).toBeNull();
    expect( document.querySelector( ".dxMyNextMeeting" ) ).toBeNull();
} );

test( "renders the mobile header and forwards mobile search submissions", () => {
    const originalMatchMedia = window.matchMedia;
    const matchMedia = jest.fn().mockReturnValue( {
        matches: true,
        media: "(max-width: 768px)",
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    } );
    Object.defineProperty( window, "matchMedia", { configurable: true, value: matchMedia } );
    const searchFn = jest.fn();
    const { unmount } = render( <DXNavigationHeader2
        {...NavigationHeader2Args}
        searchInput={{ ...NavigationHeader2Args.searchInput, searchFn }}
    /> );

    expect( document.querySelector( ".dxNavHeaderMobile" ) ).not.toBeNull();
    expect( document.querySelector( ".dxNavHeaderMobile__portalLogo img" ) ).toHaveAttribute( "alt", "Depart." );

    fireEvent.click( document.querySelector( '[data-testid="search-show"]' ) as HTMLElement );
    fireEvent.change( document.querySelector( ".dxNavHeaderMobile__searchInput" ) as HTMLElement, {
        target: { value: "workspace" },
    } );
    fireEvent.click( document.querySelector( '[data-testid="search-button"]' ) as HTMLElement );

    expect( searchFn ).toHaveBeenCalledTimes( 1 );
    expect( searchFn ).toHaveBeenCalledWith();

    unmount();
    Object.defineProperty( window, "matchMedia", { configurable: true, value: originalMatchMedia } );
} );
