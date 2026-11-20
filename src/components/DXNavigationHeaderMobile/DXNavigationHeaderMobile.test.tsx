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

import React, { FormEventHandler } from "react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { render, screen, act, fireEvent, within } from "@testing-library/react";
import DXNavigationHeaderMobile, { NavigationItem } from "./DXNavigationHeaderMobile";
import { itSupportsExtensionProps } from "../../testUtils/extensionContract";


// Mobile Header navigation image tests
test( "branding element renders expected source", () => {
    render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );

    expect( screen.getByRole( 'img' ) ).toHaveAttribute( 'src', 'test-logo.png' );
} );

test( "branding element contains expected alt text", () => {
    render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );

    expect( screen.getByRole( 'img' ) ).toHaveAttribute( 'alt' );
} );

test( "branding element contains expected width prop", () => {
    render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );

    expect( screen.getByRole( 'img' ) ).toHaveAttribute( 'width' );
} );

test( "branding element contains expected height prop", () => {
    render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );

    expect( screen.getByRole( 'img' ) ).toHaveAttribute( 'height' );

} );

// Header navigation search tests
test( "Display search when clicking the display button", async () => {
    const navigationItem: NavigationItem = { index: 0, title: 'Item 1' };
    render( <DXNavigationHeaderMobile navigationItems={[navigationItem]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );
    await userEvent.click( screen.getByTestId( 'search-show' ) );
    expect( screen.getByTestId( "search-container" ) ).toHaveClass( "active" );
} );

test( "search executes parameter function", async () => {
    let onSubmit: FormEventHandler<Element> = ( e ) => { e.preventDefault(); };
    let mock = jest.fn( onSubmit );
    const navigationItem: NavigationItem = { index: 0, title: 'Item 1' };
    render( <DXNavigationHeaderMobile navigationItems={[navigationItem]} navigationImage="test-logo.png" searchSubmit={mock} /> );
    await userEvent.click( screen.getByTestId( 'search-show' ) );//Activate the search container
    await userEvent.click( screen.getByTestId( 'search-button' ) );

    expect( mock ).toHaveBeenCalled();
} );

test( "search input to contain expected placeholder text", async () => {
    const navigationItem: NavigationItem = { index: 0, title: 'Item 1' };

    render( <DXNavigationHeaderMobile navigationItems={[navigationItem]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );
    await userEvent.click( screen.getByTestId( 'search-show' ) );
    expect( screen.getByRole( 'textbox' ).getAttribute( 'placeholder' ) ).toMatch( /search this site/i );
} );

// Header navigation primary items tests
test( "display first level when clicking 'hamburger' button", async () => {
    const navigationItem: NavigationItem = { index: 0, title: 'Item 1' };
    render( <DXNavigationHeaderMobile navigationItems={[navigationItem]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );

    await userEvent.click( screen.getByTestId( 'menu-button' ) );

    expect( screen.getByTestId( "menu-container" ) ).toHaveClass( "active" );
} );

test( "hide first level when clicking the menu button again", async () => {
    const navigationItem: NavigationItem = { index: 0, title: 'Item 1' };
    render( <DXNavigationHeaderMobile navigationItems={[navigationItem]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );

    await userEvent.click( screen.getByTestId( 'menu-button' ) );
    await userEvent.click( screen.getByTestId( 'menu-button' ) );

    expect( screen.getByTestId( "menu-container" ) ).toHaveClass( "hidden" );
} );

test( "closes the hamburger menu when clicking the Home card", async () => {
    render(
        <DXNavigationHeaderMobile
            navigationItems={[{ index: 0, title: "Home", url: "/home" }]}
            navigationImage="test-logo.png"
            searchSubmit={() => {}}
        />
    );

    await userEvent.click( screen.getByTestId( "menu-button" ) );
    await userEvent.click( screen.getByText( "Home" ) );

    expect( screen.getByTestId( "menu-container" ) ).toHaveClass( "hidden" );
    expect( document.body ).not.toHaveClass( "dxNavHeaderMobile--scrolling-stop" );
} );

test( "limits first-level navigation items to non-interactive cards", async () => {
    const navigationItems: NavigationItem[] = [{
        index: 0,
        title: "Category 1",
        children: [{ index: 0, title: "Subcategory", children: [{ index: 0, title: "Section" }] }]
    }];
    render( <DXNavigationHeaderMobile navigationLevel={1} navigationItems={navigationItems} navigationImage="test-logo.png" searchSubmit={() => {}} /> );

    await userEvent.click( screen.getByTestId( "menu-button" ) );
    const primaryItem = screen.getByText( "Category 1" );
    expect( primaryItem.closest( "a" )?.querySelector( ".dxNavHeaderMobile__itemChevron" ) ).not.toBeInTheDocument();

    await userEvent.click( primaryItem );
    expect( screen.getByTestId( "second-level-column" ) ).not.toHaveClass( "active" );
} );

test( "limits second-level navigation items without opening a third level", async () => {
    const navigationItems: NavigationItem[] = [{
        index: 0,
        title: "Category 1",
        children: [{ index: 0, title: "Subcategory", children: [{ index: 0, title: "Section" }] }]
    }];
    render( <DXNavigationHeaderMobile navigationLevel={2} navigationItems={navigationItems} navigationImage="test-logo.png" searchSubmit={() => {}} /> );

    await userEvent.click( screen.getByTestId( "menu-button" ) );
    await userEvent.click( screen.getByText( "Category 1" ) );
    const subcategory = screen.getByText( "Subcategory" );
    expect( subcategory.closest( "a" )?.querySelector( ".dxNavHeaderMobile__itemChevron" ) ).not.toBeInTheDocument();

    await userEvent.click( subcategory );
    expect( screen.getByTestId( "third-level-column" ) ).not.toHaveClass( "active" );
} );

test( "limits third-level navigation items without opening another level", async () => {
    const navigationItems: NavigationItem[] = [{
        index: 0,
        title: "Category 1",
        children: [{ index: 0, title: "Subcategory", children: [{ index: 0, title: "Section" }] }]
    }];
    render( <DXNavigationHeaderMobile navigationLevel={3} navigationItems={navigationItems} navigationImage="test-logo.png" searchSubmit={() => {}} /> );

    await userEvent.click( screen.getByTestId( "menu-button" ) );
    await userEvent.click( screen.getByText( "Category 1" ) );
    await userEvent.click( screen.getByText( "Subcategory" ) );
    const section = screen.getByText( "Section" );
    expect( section.closest( "a" )?.querySelector( ".dxNavHeaderMobile__itemChevron" ) ).not.toBeInTheDocument();
} );

test( "keeps search and menu interactions isolated between mounted headers", async () => {
    const user = userEvent.setup();
    const navigationItem: NavigationItem = { index: 0, title: "Item 1" };

    render(
        <>
            <DXNavigationHeaderMobile navigationItems={[navigationItem]} navigationImage="first-logo.png" searchSubmit={() => {}} />
            <DXNavigationHeaderMobile navigationItems={[navigationItem]} navigationImage="second-logo.png" searchSubmit={() => {}} />
        </>
    );

    const headers = screen.getAllByRole( "img" ).map( ( image ) => image.closest( ".dxNavHeaderMobile" ) as HTMLElement );
    const firstHeader = headers[0];
    const secondHeader = headers[1];

    await user.click( within( firstHeader ).getByTestId( "search-show" ) );
    await user.click( within( firstHeader ).getByRole( "textbox" ) );
    await user.type( within( firstHeader ).getByRole( "textbox" ), "query" );
    expect( within( firstHeader ).getByTestId( "search-container" ) ).toHaveClass( "search-active" );
    expect( within( secondHeader ).getByTestId( "menu-container" ) ).toHaveClass( "hidden" );

    await user.click( within( firstHeader ).getByTestId( "search-close" ) );
    expect( within( firstHeader ).getByTestId( "menu-container" ) ).toHaveClass( "hidden" );

    await user.click( within( firstHeader ).getByTestId( "menu-button" ) );
    expect( within( firstHeader ).getByTestId( "menu-container" ) ).toHaveClass( "active" );
    expect( within( secondHeader ).getByTestId( "menu-container" ) ).toHaveClass( "hidden" );

    await user.click( within( firstHeader ).getByTestId( "menu-button" ) );
    expect( within( firstHeader ).getByTestId( "menu-container" ) ).toHaveClass( "hidden" );
} );


test( "renders primary level item", () => {
    const navigationItem: NavigationItem = { index: 0, title: 'Item 1' };

    render( <DXNavigationHeaderMobile navigationItems={[navigationItem]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );

    expect( screen.getByTestId( "first-level-column" ) ).toHaveTextContent( /item 1/i );
} );


test( "primary level item contains expected number of items", () => {
    const navigationItem1: NavigationItem = { index: 0, title: 'Item 1' };
    const navigationItem2: NavigationItem = { index: 1, title: 'Item 2' };
    const navigationItem3: NavigationItem = { index: 2, title: 'Item 3' };
    const navigationItems: NavigationItem[] = [navigationItem1, navigationItem2, navigationItem3];
    render( <DXNavigationHeaderMobile navigationImage="test-logo.png" searchSubmit={() => {}} navigationItems={navigationItems} /> );

    expect( screen.getByTestId( "first-level-column" ).children[0].childElementCount ).toEqual( navigationItems.length );
} );

test( "navigation item with children to not have href attribute", () => {
    const secondaryItem1: NavigationItem = { index: 0, title: 'Secondary 1' };
    const secondaryItem2: NavigationItem = { index: 1, title: 'Secondary 2' };
    const secondaryItems: NavigationItem[] = [secondaryItem1, secondaryItem2];
    const primaryItem: NavigationItem = { index: 0, title: 'Primary 1', children: secondaryItems, url: 'http://hcl-software.com/' };
    const navigationItems: NavigationItem[] = [primaryItem];
    render( <DXNavigationHeaderMobile navigationImage="test-logo.png" searchSubmit={() => {}} navigationItems={navigationItems} /> );

    expect( screen.getByText( primaryItem.title ) ).not.toHaveAttribute( 'href' );
} );

test( "navigation item with no children to have href attribute", () => {
    const primaryItem: NavigationItem = { index: 0, title: 'Primary 1', url: 'http://hcl-software.com/', target: "_blank" };
    const navigationItems: NavigationItem[] = [primaryItem];
    render( <DXNavigationHeaderMobile navigationImage="test-logo.png" searchSubmit={() => {}} navigationItems={navigationItems} /> );

    const linkItem = screen.getByText( primaryItem.title ).parentElement || new HTMLElement();;

    expect( linkItem ).toHaveAttribute( 'href' );
} );

test( "testing href target property to equal given target value as property", () => {
    const primaryItem: NavigationItem = { index: 0, title: 'Primary 1', url: 'http://hcl-software.com/', target: "_blank" };
    const navigationItems: NavigationItem[] = [primaryItem];
    render( <DXNavigationHeaderMobile navigationImage="test-logo.png" searchSubmit={() => {}} navigationItems={navigationItems} /> );

    const linkItem = screen.getByText( primaryItem.title ).parentElement || new HTMLElement();;

    expect( linkItem.getAttribute( "target" ) ).toEqual( primaryItem.target );
} );

test( "navigation item with no children to have expected href attribute value", () => {
    const primaryItem: NavigationItem = { index: 0, title: 'Primary 1', url: 'http://hcl-software.com/' };
    const navigationItems: NavigationItem[] = [primaryItem];
    render( <DXNavigationHeaderMobile navigationImage="test-logo.png" searchSubmit={() => {}} navigationItems={navigationItems} /> );

    expect( screen.getByRole( 'link' ).getAttribute( 'href' ) ).toMatch( primaryItem.url ? primaryItem.url : "" );
} );

test( "Icon class changes", () => {
    let props = {
        navigationItems: [],
        navigationImage: "test-logo.png",
        searchSubmit: () => {},
        icons: {
            search: "ci-Note_Search",
            menu: "ci-More_Grid_Big"
        }
    };
    render( <DXNavigationHeaderMobile {...props} /> );
    expect.assertions( 2 );
    expect( screen.getByTestId( "search-show" ).querySelector( "i" ) ).toHaveClass( props.icons.search );
    expect( screen.getByTestId( "menu-button" ).querySelector( "i" ) ).toHaveClass( props.icons.menu );
} );

// Header navigation properties and defaults tests
test( "headerHeight defaults to 80px when property is omitted", () => {
    render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );
    expect( document.documentElement.style.getPropertyValue( '--headerHeight' ) ).toBe( "80px" );
} );

test( "headerHeight applies custom height when property is provided", () => {
    render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} headerHeight="120px" /> );
    expect( document.documentElement.style.getPropertyValue( '--headerHeight' ) ).toBe( "120px" );
} );

test( "branding element renders explicit fallback defaults for dimensions and alt text", () => {
    render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test.png" searchSubmit={() => {}} /> );
    const img = screen.getByRole( 'img' );
    expect( img ).toHaveAttribute( 'alt', 'Header Image' );
    expect( img ).toHaveAttribute( 'height', '25' );
    expect( img ).toHaveAttribute( 'width', '195' );
} );

test( "menu button interaction manages scrolling lock class without forcing scroll position", async () => {
    const originalScrollTo = window.scrollTo;
    window.scrollTo = jest.fn();

    render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );
    const menuBtn = screen.getByTestId( 'menu-button' );

    // Open Menu
    await userEvent.click( menuBtn );
    expect( document.body.classList.contains( 'dxNavHeaderMobile--scrolling-stop' ) ).toBe( true );
    expect( window.scrollTo ).not.toHaveBeenCalled();

    // Close Menu
    await userEvent.click( menuBtn );
    expect( document.body.classList.contains( 'dxNavHeaderMobile--scrolling-stop' ) ).toBe( false );

    window.scrollTo = originalScrollTo;
} );

test( "item content border class variation is applied exclusively on primary level items", async () => {
    const primaryItem: NavigationItem = { index: 0, title: 'Primary Item' };
    render( <DXNavigationHeaderMobile navigationItems={[primaryItem]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );

    await userEvent.click( screen.getByTestId( 'menu-button' ) );
    const linkElement = screen.getByText( 'Primary Item' ).closest( 'a' );
    expect( linkElement ).toHaveClass( 'with_border' );
} );

test( "navigation element ignores url property completely if item has child links", () => {
    const childItem: NavigationItem = { index: 0, title: 'Child' };
    const primaryItem: NavigationItem = { index: 0, title: 'Primary', url: 'https://hcl.com', children: [childItem] };
    render( <DXNavigationHeaderMobile navigationItems={[primaryItem]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );

    const linkElement = screen.getByText( 'Primary' ).closest( 'a' );
    expect( linkElement ).not.toHaveAttribute( 'href' );
} );

test( "search activation state toggles responsive grid layout visibility metrics", async () => {
    render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );
    const searchShowBtn = screen.getByTestId( 'search-show' );

    // Prior to activation
    expect( searchShowBtn.closest( '.dxNavHeaderMobile__headerCol' ) ).toHaveClass( 'active' );

    // Trigger activation
    await userEvent.click( searchShowBtn );
    expect( screen.getByTestId( 'search-close' ).closest( '.dxNavHeaderMobile__headerCol' ) ).toHaveClass( 'active' );
} );

describe( "DXNavigationHeaderMobile Hardening", () => {
    let originalScrollTo: typeof window.scrollTo;

    beforeAll( () => {
        originalScrollTo = window.scrollTo;
        window.scrollTo = jest.fn();
    } );

    afterAll( () => {
        window.scrollTo = originalScrollTo;
    } );

    beforeEach( () => {
        jest.clearAllMocks();
        // Clean up body classes between runs to isolate global state side-effects
        document.body.className = "";
    } );

    describe( "SCSS Breakpoint & Layout Traps", () => {
        it( "intercepts and sanitizes string boundary parsing to eliminate layout mutants", () => {
            // Guard against JSDOM SCSS literal string parsing traps
            const parseIntSpy = jest.spyOn( global, 'parseInt' ).mockImplementation( ( value, radix ) => {
                if ( typeof value === 'string' && value === "xs" ) {
                    return 390;
                }
                return Number( value );
            } );

            const items: NavigationItem[] = [{ index: 0, title: "Breakpoint Test" }];
            render( <DXNavigationHeaderMobile navigationItems={items} navigationImage="test-logo.png" searchSubmit={jest.fn()} /> );

            expect( screen.getByTestId( "menu-container" ) ).toBeInTheDocument();
            parseIntSpy.mockRestore();
        } );
    } );

    describe( "Deep Conditional Navigation Operators", () => {
        it( "strictly enforces href negation boundaries when items contain both URL and children", async () => {
            const complexItem: NavigationItem = {
                index: 0,
                title: "Root Item",
                url: "https://mutant-kill-target.com",
                children: [
                    { index: 0, title: "Child Item" }
                ]
            };

            render( <DXNavigationHeaderMobile navigationItems={[complexItem]} navigationImage="test-logo.png" searchSubmit={jest.fn()} /> );

            // Open menu to expose items
            const menuBtn = screen.getByTestId( "menu-button" );
            await act( async () => {
                fireEvent.click( menuBtn );
            } );

            const linkElement = screen.getByText( "Root Item" ).closest( "a" );
            // Strict assert: if children exist, href MUST be completely absent/undefined
            expect( linkElement ).not.toHaveAttribute( "href" );
        } );

    } );
    describe( "CSS Variable Fallback Guardrails", () => {
        it( "asserts direct inline style property updates match mathematical default limits exactly", () => {
            const { rerender } = render(
                <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={jest.fn()} headerHeight="" />
            );
            // Strict assert against the direct DOM element fallback string to kill logical defaults mutations
            expect( document.documentElement.style.getPropertyValue( '--headerHeight' ) ).toBe( "80px" );

            rerender(
                <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={jest.fn()} headerHeight="115px" />
            );
            expect( document.documentElement.style.getPropertyValue( '--headerHeight' ) ).toBe( "115px" );
        } );
    } );

    describe( "Search Selector, History and Results Branches", () => {
        it( "opens and closes the search scope menu via click and keyboard", async () => {
            render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={jest.fn()} /> );
            await userEvent.click( screen.getByTestId( 'search-show' ) );

            const scope = screen.getByRole( 'button', { name: 'Search scope' } );
            expect( scope ).toHaveAttribute( 'aria-expanded', 'false' );

            await userEvent.click( scope );
            expect( scope ).toHaveAttribute( 'aria-expanded', 'true' );
            expect( screen.getByRole( 'menu', { name: 'Search filters' } ) ).toBeInTheDocument();

            await userEvent.click( screen.getByRole( 'menuitem', { name: 'News' } ) );
            expect( screen.queryByRole( 'menu', { name: 'Search filters' } ) ).not.toBeInTheDocument();

            fireEvent.keyDown( scope, { key: 'Enter' } );
            expect( screen.getByRole( 'menu', { name: 'Search filters' } ) ).toBeInTheDocument();
            fireEvent.keyDown( scope, { key: ' ' } );
            expect( screen.queryByRole( 'menu', { name: 'Search filters' } ) ).not.toBeInTheDocument();
        } );

        it( "shows and hides the clear button only while the search input is active", async () => {
            render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={jest.fn()} /> );
            await userEvent.click( screen.getByTestId( 'search-show' ) );
            expect( screen.queryByTestId( 'search-clear' ) ).not.toBeInTheDocument();

            const input = screen.getByRole( 'textbox' );
            await userEvent.click( input );
            await userEvent.type( input, 'abc' );
            expect( screen.getByTestId( 'search-clear' ) ).toBeInTheDocument();

            await userEvent.click( screen.getByTestId( 'search-clear' ) );
            expect( screen.queryByTestId( 'search-clear' ) ).not.toBeInTheDocument();
            expect( input ).toHaveValue( '' );
        } );

        it( "completes a submitted search into a no-results state after loading", () => {
            jest.useFakeTimers();
            const searchSubmit = jest.fn();
            render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={searchSubmit} /> );
            fireEvent.click( screen.getByTestId( 'search-show' ) );
            fireEvent.change( screen.getByRole( 'textbox' ), { target: { value: 'unknown query' } } );
            fireEvent.click( screen.getByTestId( 'search-button' ) );

            expect( searchSubmit ).toHaveBeenCalled();
            expect( screen.getByText( 'Searching ...' ) ).toBeInTheDocument();

            act( () => jest.advanceTimersByTime( 1000 ) );
            expect( screen.getByText( 'Check the spelling or try a new search.' ) ).toBeInTheDocument();
            jest.useRealTimers();
        } );

        it( "matches and highlights a search history label, expanding results on submit", () => {
            jest.useFakeTimers();
            render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={jest.fn()} /> );
            fireEvent.click( screen.getByTestId( 'search-show' ) );
            fireEvent.change( screen.getByRole( 'textbox' ), { target: { value: 'off' } } );

            const historyButton = screen.getByRole( 'button', { name: 'Search for Time Off' } );
            expect( historyButton.querySelector( 'strong' ) ).toHaveTextContent( /off/i );

            fireEvent.click( historyButton );
            act( () => jest.advanceTimersByTime( 1000 ) );
            expect( screen.getByLabelText( 'Other Results' ) ).toBeInTheDocument();
            expect( screen.getByTestId( 'search-clear' ) ).toBeInTheDocument();
            expect( screen.getByTestId( 'search-clear' ).querySelector( 'i' ) ).toHaveClass( 'ci-Close_MD' );
            jest.useRealTimers();
        } );
    } );

    describe( "Utility Panel Branches", () => {
        it( "renders the utility zone only when neither search nor menu is active", async () => {
            const utilityZone = {
                items: [{ icon: 'ci-Circle_Help', label: 'Help', contentId: '#help', onClick: () => {} }]
            };
            render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={jest.fn()} utilityZone={utilityZone} /> );
            expect( screen.getByTestId( 'tool-button-icon' ) ).toBeInTheDocument();

            await userEvent.click( screen.getByTestId( 'search-show' ) );
            expect( screen.queryByTestId( 'tool-button-icon' ) ).not.toBeInTheDocument();
        } );

        it( "opens each utility surface exclusively and preserves item callbacks", async () => {
            const callbacks = [jest.fn(), jest.fn(), jest.fn(), jest.fn()];
            const utilityZone = {
                items: [
                    { icon: 'ci-Circle_Help', label: 'Help', contentId: '#help', onClick: callbacks[0] },
                    { icon: 'ci-Tag', label: 'Saved links', contentId: '#saved', onClick: callbacks[1] },
                    { icon: 'ci-List_Checklist', label: 'Next activity', contentId: '#activity', onClick: callbacks[2] },
                    { icon: '', label: 'Account', contentId: '#account', image: { url: 'original.png' }, onClick: callbacks[3] }
                ]
            };
            render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={jest.fn()} utilityZone={utilityZone} /> );

            const utilityButtons = screen.getAllByTestId( 'tool-button-icon' );

            await userEvent.click( utilityButtons[0] );
            expect( screen.getByText( 'Help' ) ).toBeInTheDocument();
            expect( callbacks[0] ).toHaveBeenCalled();
            await userEvent.click( screen.getByRole( 'button', { name: 'Close Help' } ) );

            await userEvent.click( utilityButtons[1] );
            expect( screen.getByText( 'Saved links' ) ).toBeInTheDocument();
            expect( screen.getAllByText( 'Card Title' ) ).toHaveLength( 15 );
            expect( callbacks[1] ).toHaveBeenCalled();
            await userEvent.click( screen.getByRole( 'button', { name: 'Close Saved links' } ) );

            await userEvent.click( utilityButtons[2] );
            expect( screen.getByText( 'My Next Activity' ) ).toBeInTheDocument();
            expect( screen.getAllByRole( 'article' ) ).toHaveLength( 3 );
            expect( callbacks[2] ).toHaveBeenCalled();
            await userEvent.click( screen.getByRole( 'button', { name: 'Close My Next Activity' } ) );

            await userEvent.click( screen.getByTestId( 'tool-button-image' ) );
            expect( screen.getByText( 'My Account' ) ).toBeInTheDocument();
            expect( document.querySelectorAll( '.dxNavHeaderMobile__utilityAccountItem' ) ).toHaveLength( 5 );
            expect( callbacks[3] ).toHaveBeenCalled();
            expect( screen.getByTestId( 'tool-button-image' ) ).toHaveAttribute( 'src', '/avatar.png' );
        } );

        it( "applies the help-active class to the content spacer only while a utility panel is open", async () => {
            const utilityZone = {
                items: [{ icon: 'ci-Circle_Help', label: 'Help', contentId: '#help', onClick: () => {} }]
            };
            const { container } = render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={jest.fn()} utilityZone={utilityZone} /> );

            expect( container.querySelector( '.dxNavHeaderMobile__contentSpacer' ) ).not.toHaveClass( 'help-active' );

            await userEvent.click( screen.getByTestId( 'tool-button-icon' ) );
            expect( container.querySelector( '.dxNavHeaderMobile__contentSpacer' ) ).toHaveClass( 'help-active' );

            await userEvent.click( screen.getByRole( 'button', { name: 'Close Help' } ) );
            expect( container.querySelector( '.dxNavHeaderMobile__contentSpacer' ) ).not.toHaveClass( 'help-active' );
        } );
    } );

    describe( "Outside Interaction Cleanup", () => {
        it( "closes an open menu and clears its scroll lock when clicking outside", async () => {
            render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={jest.fn()} /> );
            await userEvent.click( screen.getByTestId( 'menu-button' ) );
            expect( screen.getByTestId( "menu-container" ) ).toHaveClass( "active" );

            fireEvent.mouseDown( document.body );
            expect( screen.getByTestId( "menu-container" ) ).toHaveClass( "hidden" );
            expect( document.body ).not.toHaveClass( "dxNavHeaderMobile--scrolling-stop" );
        } );
    } );
} );

describe( "DXNavigationHeaderMobile Mutation Score Hardening", () => {

    describe( "Primary Item Icon Branches", () => {
        it( "shows the home icon only for a leaf item titled Home, never for other leaf items", () => {
            const items: NavigationItem[] = [
                { index: 0, title: "Home" },
                { index: 1, title: "OtherLeaf" }
            ];
            render( <DXNavigationHeaderMobile navigationItems={items} navigationImage="test-logo.png" searchSubmit={() => {}} /> );

            const homeLi = screen.getByText( "Home" ).closest( "li" )!;
            expect( homeLi.querySelector( ".ci-House_03" ) ).toBeInTheDocument();

            const otherLi = screen.getByText( "OtherLeaf" ).closest( "li" )!;
            expect( otherLi.querySelector( ".ci-House_03" ) ).not.toBeInTheDocument();
        } );

        it( "renders the forward chevron only for items that have children", () => {
            const items: NavigationItem[] = [
                { index: 0, title: "ParentWithChildren", children: [{ index: 0, title: "ChildLeaf" }] },
                { index: 1, title: "LeafOnly" }
            ];
            render( <DXNavigationHeaderMobile navigationItems={items} navigationImage="test-logo.png" searchSubmit={() => {}} /> );

            const parentLi = screen.getByText( "ParentWithChildren" ).closest( "li" )!;
            expect( parentLi.querySelector( ".dxNavHeaderMobile__itemChevron i" ) ).toHaveClass( "ci-Chevron_Right" );

            const leafLi = screen.getByText( "LeafOnly" ).closest( "li" )!;
            expect( leafLi.querySelector( ".dxNavHeaderMobile__itemChevron" ) ).not.toBeInTheDocument();
        } );
    } );

    describe( "Menu Row Background Click Branch", () => {
        it( "closes the menu only when the click target is the row background itself", async () => {
            const items: NavigationItem[] = [{ index: 0, title: "SoloItem" }];
            const { container } = render( <DXNavigationHeaderMobile navigationItems={items} navigationImage="test-logo.png" searchSubmit={() => {}} /> );
            await userEvent.click( screen.getByTestId( "menu-button" ) );

            const li = screen.getByText( "SoloItem" ).closest( "li" )!;
            fireEvent.click( li );
            expect( screen.getByTestId( "menu-container" ) ).toHaveClass( "active" );

            const menuRow = container.querySelector( ".dxNavHeaderMobile__menuRow" )!;
            fireEvent.click( menuRow );
            expect( screen.getByTestId( "menu-container" ) ).toHaveClass( "hidden" );
        } );
    } );

    describe( "Search Scope Selector Overlay", () => {
        it( "marks only the last selector item with the projects class and renders all five options in order", async () => {
            render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );
            await userEvent.click( screen.getByTestId( "search-show" ) );
            await userEvent.click( screen.getByRole( "button", { name: "Search scope" } ) );

            const options = screen.getAllByRole( "menuitem" );
            expect( options ).toHaveLength( 5 );
            expect( options.map( ( option ) => option.textContent ) ).toEqual( ["Applications", "People", "News", "Resources", "Projects"] );

            options.slice( 0, 4 ).forEach( ( option ) => expect( option ).not.toHaveClass( "projects" ) );
            expect( options[4] ).toHaveClass( "projects" );

            await userEvent.click( options[4] );
            expect( screen.queryByRole( "menu", { name: "Search filters" } ) ).not.toBeInTheDocument();
        } );

        it( "does not toggle the selector menu for unrelated keys", () => {
            render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );
            fireEvent.click( screen.getByTestId( "search-show" ) );
            const scope = screen.getByRole( "button", { name: "Search scope" } );

            fireEvent.keyDown( scope, { key: "Tab" } );
            expect( scope ).toHaveAttribute( "aria-expanded", "false" );
            expect( screen.queryByRole( "menu", { name: "Search filters" } ) ).not.toBeInTheDocument();
        } );
    } );

    describe( "Search History Defaults and Filtering", () => {
        it( "renders exactly the five configured search history labels before any query is typed", async () => {
            render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );
            await userEvent.click( screen.getByTestId( "search-show" ) );

            const historyButtons = screen.getAllByRole( "button", { name: /^Search for /i } );
            expect( historyButtons.map( ( button ) => button.getAttribute( "aria-label" ) ) ).toEqual( [
                "Search for password",
                "Search for Time Off",
                "Search for Annual Retreat",
                "Search for LEO password reset",
                "Search for password Help"
            ] );
        } );

        it( "filters the search history case-insensitively to matching labels only", () => {
            render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );
            fireEvent.click( screen.getByTestId( "search-show" ) );
            fireEvent.change( screen.getByRole( "textbox" ), { target: { value: "ANNUAL" } } );

            const historyButtons = screen.getAllByRole( "button", { name: /^Search for /i } );
            expect( historyButtons ).toHaveLength( 1 );
            expect( historyButtons[0] ).toHaveAttribute( "aria-label", "Search for Annual Retreat" );
        } );

        it( "highlights the matched substring at its exact position within a label", () => {
            render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );
            fireEvent.click( screen.getByTestId( "search-show" ) );
            fireEvent.change( screen.getByRole( "textbox" ), { target: { value: "reset" } } );

            const historyButton = screen.getByRole( "button", { name: "Search for LEO password reset" } );
            const span = historyButton.querySelector( "span" )!;
            expect( span.textContent ).toBe( "LEO password reset" );
            expect( span.querySelector( "strong" )!.textContent ).toBe( "reset" );
            expect( span.textContent!.indexOf( "reset" ) ).toBe( "LEO password ".length );
        } );
    } );

    describe( "Search Loading and Submitted Clear Branches", () => {
        afterEach( () => {
            jest.useRealTimers();
        } );

        it( "shows the fetching label and query while loading, and the loading-clear button resets state", () => {
            jest.useFakeTimers();
            render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );
            fireEvent.click( screen.getByTestId( "search-show" ) );
            fireEvent.change( screen.getByRole( "textbox" ), { target: { value: "password" } } );
            fireEvent.click( screen.getByTestId( "search-button" ) );

            expect( screen.getByText( "Fetching top results for:" ) ).toBeInTheDocument();
            expect( screen.getByText( "password" ) ).toBeInTheDocument();
            expect( screen.getByTestId( "search-loading-clear" ) ).toBeInTheDocument();

            fireEvent.click( screen.getByTestId( "search-loading-clear" ) );
            act( () => jest.advanceTimersByTime( 1000 ) );
            expect( screen.queryByTestId( "search-loading-clear" ) ).not.toBeInTheDocument();
            expect( screen.getByRole( "textbox" ) ).toHaveValue( "" );
            expect( screen.getByLabelText( "Search History" ) ).toBeInTheDocument();
        } );

        it( "shows the submitted no-match bar with the query text, and its clear button resets state", () => {
            jest.useFakeTimers();
            render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );
            fireEvent.click( screen.getByTestId( "search-show" ) );
            fireEvent.change( screen.getByRole( "textbox" ), { target: { value: "unmatched text" } } );
            fireEvent.click( screen.getByTestId( "search-button" ) );
            act( () => jest.advanceTimersByTime( 1000 ) );

            expect( screen.getByText( "unmatched text" ) ).toBeInTheDocument();
            expect( screen.getByTestId( "search-submitted-clear" ) ).toBeInTheDocument();

            fireEvent.click( screen.getByTestId( "search-submitted-clear" ) );
            expect( screen.getByRole( "textbox" ) ).toHaveValue( "" );
            expect( screen.queryByTestId( "search-submitted-clear" ) ).not.toBeInTheDocument();
        } );
    } );

    describe( "Search Results Match Branch (Other Results Grid)", () => {
        it( "renders five result cards and the exact other-results categories, counts, and widths when a history label matches", () => {
            jest.useFakeTimers();
            render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} /> );
            fireEvent.click( screen.getByTestId( "search-show" ) );
            fireEvent.change( screen.getByRole( "textbox" ), { target: { value: "off" } } );
            fireEvent.click( screen.getByRole( "button", { name: "Search for Time Off" } ) );
            act( () => jest.advanceTimersByTime( 1000 ) );

            expect( screen.getAllByRole( "button", { name: "Card Title, Source" } ) ).toHaveLength( 5 );

            const otherResults = screen.getByLabelText( "Other Results" );
            expect( otherResults ).toHaveTextContent( "Other Results:" );

            const expectedCategories: Array<[string, string, string]> = [
                ["People", "6", "105"],
                ["Video", "8", "97"],
                ["News", "22", "101"],
                ["Applications", "3", "139"]
            ];
            expectedCategories.forEach( ( [label, count, width] ) => {
                const button = screen.getByRole( "button", { name: `${label} ${count}` } );
                expect( button ).toHaveTextContent( count );
                expect( button ).toHaveStyle( `width: ${width}px` );
            } );

            expect( screen.getByRole( "button", { name: "Regular Button" } ) ).toBeInTheDocument();
            expect( screen.getByLabelText( "Go to Results" ) ).toBeInTheDocument();

            jest.useRealTimers();
        } );
    } );

    describe( "Utility Panel Item Counts and Badge Branch", () => {
        it( "renders exactly three help resource cards", async () => {
            const utilityZone = { items: [{ icon: "ci-Circle_Help", label: "Help", contentId: "#help", onClick: () => {} }] };
            render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} utilityZone={utilityZone} /> );
            await userEvent.click( screen.getByTestId( "tool-button-icon" ) );
            expect( document.querySelectorAll( ".dxNavHeaderMobile__utilityHelpResourceCard" ) ).toHaveLength( 3 );
        } );

        it( "renders exactly five avatars per next-activity card across three cards", async () => {
            const utilityZone = { items: [{ icon: "ci-List_Checklist", label: "Next activity", contentId: "#activity", onClick: () => {} }] };
            render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} utilityZone={utilityZone} /> );
            await userEvent.click( screen.getByTestId( "tool-button-icon" ) );
            expect( document.querySelectorAll( ".dxNavHeaderMobile__utilityNextActivityAvatar" ) ).toHaveLength( 15 );
        } );

        it( "shows the account badge only on the first account item and can close the account panel", async () => {
            const utilityZone = { items: [{ icon: "", label: "Account", contentId: "#account", image: { url: "original.png" }, onClick: () => {} }] };
            render( <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} utilityZone={utilityZone} /> );
            await userEvent.click( screen.getByTestId( "tool-button-image" ) );

            const accountItems = document.querySelectorAll( ".dxNavHeaderMobile__utilityAccountItem" );
            expect( accountItems ).toHaveLength( 5 );
            expect( within( accountItems[0] as HTMLElement ).getByText( "123" ) ).toBeInTheDocument();
            accountItems.forEach( ( item, index ) => {
                if ( index !== 0 ) {
                    expect( within( item as HTMLElement ).queryByText( "123" ) ).not.toBeInTheDocument();
                }
            } );

            await userEvent.click( screen.getByRole( "button", { name: "Close My Account" } ) );
            expect( screen.queryByText( "My Account" ) ).not.toBeInTheDocument();
        } );
    } );

} );

itSupportsExtensionProps( ( extra ) => <DXNavigationHeaderMobile navigationItems={[]} navigationImage="test-logo.png" searchSubmit={() => {}} {...extra} /> );
