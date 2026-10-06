import React from "react";
import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
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
