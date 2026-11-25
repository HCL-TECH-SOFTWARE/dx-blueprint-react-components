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
import { act, fireEvent, render } from "@testing-library/react";
import DXNavigationHeader2 from "./DXNavigationHeader2";
import { NavigationHeader2Args } from "./DXNavigationHeader2.stories";
import { itSupportsExtensionProps } from "../../testUtils/extensionContract";

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

test( "desktop layout renders secondLevelContainer div", () => {
    render( <DXNavigationHeader2 {...NavigationHeader2Args} /> );
    expect( document.getElementById( "secondLevelContainer" ) ).not.toBeNull();
} );

test( "desktop layout renders panels container", () => {
    render( <DXNavigationHeader2 {...NavigationHeader2Args} /> );
    expect( document.getElementById( "dxNavHeader2__panels" ) ).not.toBeNull();
} );

test( "desktop layout renders drawer content container", () => {
    render( <DXNavigationHeader2 {...NavigationHeader2Args} /> );
    expect( document.getElementById( "NH-drawer-content" ) ).not.toBeNull();
} );

test( "desktop layout does not render mobile header", () => {
    render( <DXNavigationHeader2 {...NavigationHeader2Args} /> );
    expect( document.querySelector( ".dxNavHeaderMobile" ) ).toBeNull();
    expect( document.querySelector( ".dxNavigationHeader2" ) ).not.toBeNull();
} );

const setupMobileMatchMedia = () => {
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
    return () => {
        Object.defineProperty( window, "matchMedia", { configurable: true, value: originalMatchMedia } );
    };
};

test( "renders the mobile header and forwards mobile search submissions", () => {
    const restore = setupMobileMatchMedia();
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
    restore();
} );

test( "mobile view does not render desktop container", () => {
    const restore = setupMobileMatchMedia();
    const { unmount } = render( <DXNavigationHeader2 {...NavigationHeader2Args} /> );

    expect( document.querySelector( ".dxNavigationHeader2" ) ).toBeNull();
    expect( document.querySelector( ".dxNavHeaderMobile" ) ).not.toBeNull();

    unmount();
    restore();
} );

test( "mobile view uses secondary logo when available", () => {
    const restore = setupMobileMatchMedia();
    const propsWithSecondary = {
        ...NavigationHeader2Args,
        portalLogos: {
            ...NavigationHeader2Args.portalLogos,
            secondary: {
                imageSrc: "/secondary-logo.png",
                label: "Secondary Logo"
            }
        }
    };
    const { unmount } = render( <DXNavigationHeader2 {...propsWithSecondary} /> );
    const img = document.querySelector( ".dxNavHeaderMobile__portalLogo img" );
    expect( img ).toHaveAttribute( "src", "/secondary-logo.png" );
    expect( img ).toHaveAttribute( "alt", "Secondary Logo" );

    unmount();
    restore();
} );

test( "mobile view falls back to main logo when secondary is absent", () => {
    const restore = setupMobileMatchMedia();
    const propsNoSecondary = {
        ...NavigationHeader2Args,
        portalLogos: {
            ...NavigationHeader2Args.portalLogos,
            secondary: undefined,
        }
    };
    const { unmount } = render( <DXNavigationHeader2 {...propsNoSecondary} /> );
    const img = document.querySelector( ".dxNavHeaderMobile__portalLogo img" );
    expect( img ).toHaveAttribute( "src", NavigationHeader2Args.portalLogos.main.imageSrc );

    unmount();
    restore();
} );

describe( "DXNavigationHeader2 extension props, desktop layout", () => {
    itSupportsExtensionProps( ( extra ) => <DXNavigationHeader2 {...NavigationHeader2Args} {...extra} /> );
} );

describe( "DXNavigationHeader2 extension props, mobile layout (passed on to DXNavigationHeaderMobile)", () => {
    let restoreMatchMedia: () => void;
    beforeEach( () => { restoreMatchMedia = setupMobileMatchMedia(); } );
    afterEach( () => restoreMatchMedia() );
    itSupportsExtensionProps( ( extra ) => <DXNavigationHeader2 {...NavigationHeader2Args} {...extra} /> );
} );

describe( "DXNavigationHeader2 with a consumer ref when the viewport crosses the mobile breakpoint", () => {
    // matchMedia whose result can be switched, with the "change" listeners the component subscribes
    let matches = false;
    let listeners: Array<() => void> = [];
    const originalMatchMedia = window.matchMedia;

    beforeEach( () => {
        matches = false;
        listeners = [];
        Object.defineProperty( window, "matchMedia", {
            configurable: true,
            value: jest.fn().mockImplementation( ( media: string ) => ( {
                get matches() { return matches; },
                media,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn( ( _type: string, cb: () => void ) => { listeners.push( cb ); } ),
                removeEventListener: jest.fn( ( _type: string, cb: () => void ) => { listeners = listeners.filter( ( l ) => l !== cb ); } ),
                dispatchEvent: jest.fn(),
            } ) ),
        } );
    } );

    afterEach( () => {
        Object.defineProperty( window, "matchMedia", { configurable: true, value: originalMatchMedia } );
    } );

    const setMobile = ( value: boolean ) => {
        act( () => {
            matches = value;
            listeners.forEach( ( l ) => l() );
        } );
    };

    test( "ref, className and data-* follow the root from desktop to mobile and back", () => {
        const ref = React.createRef<HTMLElement>();
        const { container } = render( <DXNavigationHeader2 {...NavigationHeader2Args} ref={ref} className="bp-consumer" data-contract="yes" /> );

        const desktopRoot = container.firstElementChild as HTMLElement;
        expect( desktopRoot ).toHaveClass( "dxNavigationHeader2", "bp-consumer" );
        expect( desktopRoot ).toHaveAttribute( "data-contract", "yes" );
        expect( ref.current ).toBe( desktopRoot );

        setMobile( true );
        const mobileRoot = container.firstElementChild as HTMLElement;
        expect( mobileRoot ).toHaveClass( "dxNavHeaderMobile", "bp-consumer" );
        expect( mobileRoot ).toHaveAttribute( "data-contract", "yes" );
        expect( ref.current ).toBe( mobileRoot );
        expect( container.querySelector( ".dxNavigationHeader2" ) ).toBeNull();

        setMobile( false );
        const desktopAgain = container.firstElementChild as HTMLElement;
        expect( desktopAgain ).toHaveClass( "dxNavigationHeader2", "bp-consumer" );
        expect( desktopAgain ).toHaveAttribute( "data-contract", "yes" );
        expect( ref.current ).toBe( desktopAgain );
        expect( container.querySelector( ".dxNavHeaderMobile" ) ).toBeNull();
    } );

    test( "a callback ref is detached from the old root and attached to the new one on each switch, and cleared on unmount", () => {
        const callbackRef = jest.fn();
        const { container, unmount } = render( <DXNavigationHeader2 {...NavigationHeader2Args} ref={callbackRef} /> );
        const desktopRoot = container.firstElementChild;
        expect( callbackRef ).toHaveBeenCalledTimes( 1 );
        expect( callbackRef ).toHaveBeenLastCalledWith( desktopRoot );

        setMobile( true );
        const mobileRoot = container.firstElementChild;
        // React may pass extra arguments when it detaches, so only the first argument is compared
        const firstArgs = callbackRef.mock.calls.map( ( call ) => call[0] );
        expect( firstArgs ).toEqual( [desktopRoot, null, mobileRoot] );

        unmount();
        expect( callbackRef.mock.calls[callbackRef.mock.calls.length - 1][0] ).toBeNull();
    } );
} );
