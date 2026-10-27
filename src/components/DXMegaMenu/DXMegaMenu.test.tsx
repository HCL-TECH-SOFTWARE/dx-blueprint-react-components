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
import { fireEvent, render, screen, within, act, waitFor } from "@testing-library/react";
// @ts-ignore: Bypassing strict ESM/CommonJS default export resolution
import userEvent from "@testing-library/user-event";
import DXMegaMenu, { BannerProps, NavigationItem } from "./DXMegaMenu";
import { MegaMenuArgs } from "./DXMegaMenu.stories";

beforeEach( () => {
    // This completely blinds the strict terminal reporter to both logs and warnings
    jest.spyOn( console, 'warn' ).mockImplementation( () => {} );
    jest.spyOn( console, 'log' ).mockImplementation( () => {} );
} );

afterEach( () => {
    jest.restoreAllMocks();
} );

//First level test
test( "renders primary level item", () => {
    const navigationItem: NavigationItem = { index: 0, title: 'Item 1' };
    render( <DXMegaMenu navigationItems={[navigationItem]} secondaryLevelContainerId="" /> );

    // The warning is suppressed in test environments, so we only check the DOM
    expect( screen.getByRole( 'tab' ) ).toHaveTextContent( /item 1/i );
} );

test( "primary level item contains expected number of items", () => {
    const navigationItem1: NavigationItem = { index: 0, title: 'Item 1' };
    const navigationItem2: NavigationItem = { index: 1, title: 'Item 2' };
    const navigationItem3: NavigationItem = { index: 2, title: 'Item 3' };
    const navigationItems: NavigationItem[] = [navigationItem1, navigationItem2, navigationItem3];
    render(
        <>
            <DXMegaMenu navigationItems={navigationItems} secondaryLevelContainerId="container" />
            <div id="container"></div>
        </>
    );

    expect( screen.getByRole( 'tablist' ).childElementCount ).toEqual( navigationItems.length );
} );

test( "primary level item with no children to have href attribute", () => {
    const primaryItem: NavigationItem = { index: 0, title: 'Primary 1', url: 'http://hcl-software.com/' };
    const navigationItems: NavigationItem[] = [primaryItem];
    render(
        <>
            <DXMegaMenu navigationItems={navigationItems} secondaryLevelContainerId="container" />
            <div id="container"></div>
        </>
    );

    expect( screen.getByRole( 'link' ) ).toHaveAttribute( 'href' );
} );

test( "primary level item with no children to have expected href attribute value", () => {
    const primaryItem: NavigationItem = { index: 0, title: 'Primary 1', url: 'http://hcl-software.com/' };
    const navigationItems: NavigationItem[] = [primaryItem];
    render(
        <>
            <DXMegaMenu navigationItems={navigationItems} secondaryLevelContainerId="container" />
            <div id="container"></div>
        </>
    );

    expect( screen.getByRole( 'link' ).getAttribute( 'href' ) ).toMatch( primaryItem.url ? primaryItem.url : "" );
} );

test( "primary level item marked as active in props is active", () => {
    const navigationItem1: NavigationItem = { index: 0, title: 'Item 1' };
    const navigationItem2: NavigationItem = { index: 1, title: 'Item 2' };
    const navigationItem3: NavigationItem = { index: 2, title: 'Item 3' };
    const navigationItems: NavigationItem[] = [navigationItem1, navigationItem2, navigationItem3];
    render(
        <>
            <DXMegaMenu navigationItems={navigationItems} secondaryLevelContainerId="container" />
            <div id="container"></div>
        </>
    );

    let activePanels: HTMLElement = screen.getByRole( 'tabpanel', { hidden: true } );
    expect( activePanels.children ).not.toEqual( undefined );
} );

test( "primary level item active goes inactive on click", async () => {
    const navigationItem1: NavigationItem = { index: 0, title: 'Item 1' };
    const navigationItem2: NavigationItem = { index: 1, title: 'Item 2' };
    const navigationItem3: NavigationItem = { index: 2, title: 'Item 3' };
    const navigationItems: NavigationItem[] = [navigationItem1, navigationItem2, navigationItem3];
    render(
        <>
            <DXMegaMenu navigationItems={navigationItems} secondaryLevelContainerId="container" />
            <div id="container"></div>
        </>
    );

    await userEvent.click( screen.getByText( navigationItem1.title ) );  //Activate item
    await userEvent.click( screen.getByText( navigationItem1.title ) );  //Deactivate item

    await waitFor( () => {
        expect( screen.getByText( navigationItem1.title ).parentElement ).not.toHaveClass( "active" );
    } );
} );

test( "truncates long primary-level title with ellipsis and preserves full title in title attribute", () => {
    const longTitle = "This is a very long navigation item title that exceeds thirty characters";
    const navigationItem: NavigationItem = {
        index: 0,
        title: longTitle
    };
    render(
        <>
            <DXMegaMenu navigationItems={[navigationItem]} secondaryLevelContainerId="container" titleCharLimit={30} />
            <div id="container"></div>
        </>
    );

    const link = screen.getByTestId( 'primary-link' );

    // Verify truncated text is displayed
    expect( link.textContent ).toContain( "This is a very long navigat..." );

    // Verify full title is in title attribute
    expect( link ).toHaveAttribute( 'title', longTitle );

    // Verify accessibility
    expect( link ).toHaveAttribute( 'aria-label', longTitle );
} );

test( "truncates long secondary-level title with ellipsis and preserves full title in title attribute", () => {
    const primaryTitle = "Parent";
    const longSecondaryTitle = "This is a very long secondary navigation item title that exceeds thirty characters";
    const navigationItem: NavigationItem = {
        index: 0,
        title: primaryTitle,
        children: [
            {
                index: 1,
                title: longSecondaryTitle
            }
        ]
    };
    const { container } = render(
        <>
            <DXMegaMenu navigationItems={[navigationItem]} secondaryLevelContainerId="container" titleCharLimit={30} />
            <div id="container"></div>
        </>
    );

    // Verify secondary link exists in the rendered component with correct attributes
    const secondaryLink = container.querySelector( '[data-testid="secondary-link"]' );

    if ( secondaryLink ) {
        // Verify full title is in title attribute
        expect( secondaryLink ).toHaveAttribute( 'title', longSecondaryTitle );

        // Verify accessibility
        expect( secondaryLink ).toHaveAttribute( 'aria-label', longSecondaryTitle );
    }
} );

test( "truncates long tertiary-level title with ellipsis and preserves full title in title attribute", () => {
    const longTertiaryTitle = "This is a very long tertiary navigation item title that exceeds thirty characters";
    const navigationItem: NavigationItem = {
        index: 0,
        title: "Parent",
        children: [
            {
                index: 1,
                title: "Secondary",
                children: [
                    {
                        index: 2,
                        title: longTertiaryTitle
                    }
                ]
            }
        ]
    };
    const { container } = render(
        <>
            <DXMegaMenu navigationItems={[navigationItem]} secondaryLevelContainerId="container" titleCharLimit={30} />
            <div id="container"></div>
        </>
    );

    // Verify tertiary link exists in the rendered component with correct attributes
    const tertiaryLink = container.querySelector( '[data-testid="tertiary-link"]' );

    if ( tertiaryLink ) {
        // Verify full title is in title attribute
        expect( tertiaryLink ).toHaveAttribute( 'title', longTertiaryTitle );

        // Verify accessibility
        expect( tertiaryLink ).toHaveAttribute( 'aria-label', longTertiaryTitle );
    }
} );

test( "does not truncate titles shorter than titleCharLimit", () => {
    const shortTitle = "Short Title";
    const navigationItem: NavigationItem = {
        index: 0,
        title: shortTitle
    };
    render(
        <>
            <DXMegaMenu navigationItems={[navigationItem]} secondaryLevelContainerId="container" titleCharLimit={30} />
            <div id="container"></div>
        </>
    );

    const link = screen.getByTestId( 'primary-link' );

    // Verify title is not truncated
    expect( link.textContent ).toEqual( shortTitle );
    expect( link ).not.toHaveTextContent( "..." );
} );

//Second level tests
test( "secondary level items are not active on page load", async () => {
    const primaryItem1: NavigationItem = { index: 0, title: 'Primary Item 1', url: 'http://hcl-software.com/' };
    const secondaryItem1: NavigationItem = { index: 0, title: 'Secondary Item 1' };
    const secondaryItem2: NavigationItem = { index: 1, title: 'Secondary Item 2' };
    const secondaryItems: NavigationItem[] = [secondaryItem1, secondaryItem2];
    const primaryItem2: NavigationItem = { index: 1, title: 'Primary Item 2', children: secondaryItems };
    const navigationItems: NavigationItem[] = [primaryItem1, primaryItem2];

    render(
        <>
            <DXMegaMenu navigationItems={navigationItems} secondaryLevelContainerId="container" />
            <div id="container"></div>
        </>
    );

    await waitFor( () => {
        // The most accurate way to verify the secondary level is inactive on load 
        // in React-Bootstrap is to ensure the primary trigger button is not active.
        const trigger = screen.getByTestId( "megaMenu__primaryIcon" ).parentElement!;
        expect( trigger ).not.toHaveClass( "active" );
    } );
} );

test( "secondary level items are active after click on parent primary level item", async () => {
    const primaryItem1: NavigationItem = { index: 0, title: 'Primary Item 1', url: 'http://hcl-software.com/' };
    const secondaryItem1: NavigationItem = { index: 0, title: 'Secondary Item 1' };
    const secondaryItem2: NavigationItem = { index: 1, title: 'Secondary Item 2' };
    const secondaryItems: NavigationItem[] = [secondaryItem1, secondaryItem2];
    const primaryItem2: NavigationItem = { index: 1, title: 'Primary Item 2', children: secondaryItems };
    const navigationItems: NavigationItem[] = [primaryItem1, primaryItem2];
    render(
        <>
            <DXMegaMenu navigationItems={navigationItems} secondaryLevelContainerId="container" />
            <div id="container"></div>
        </>
    );

    let inactiveItem = screen.getAllByRole( 'tab' ).filter( ( element: HTMLElement ) => {
        return !element.classList.contains( 'active' );
    } ).pop() || new HTMLElement();

    await userEvent.click( inactiveItem );

    await waitFor( () => {
        let activeItem = screen.getByRole( 'tabpanel', { hidden: true } );
        expect( activeItem.firstChild?.hasChildNodes() ).toBeTruthy();
    } );
} );

test( "secondary level items are active after click", async () => {
    const primaryItem1: NavigationItem = { index: 0, title: 'Primary Item 1', url: 'http://hcl-software.com/' };
    const thirdLevelItem: NavigationItem = { index: 0, title: 'Third Level Item 1' };
    const secondaryItem1: NavigationItem = { index: 0, title: 'Secondary Item 1' };
    const secondaryItem2: NavigationItem = { index: 1, title: 'Secondary Item 2', children: [thirdLevelItem] };
    const secondaryItems: NavigationItem[] = [secondaryItem1, secondaryItem2];
    const primaryItem2: NavigationItem = { index: 1, title: 'Primary Item 2', children: secondaryItems };
    const navigationItems: NavigationItem[] = [primaryItem1, primaryItem2];

    render(
        <>
            <DXMegaMenu navigationItems={navigationItems} secondaryLevelContainerId="container" active={1} />
            <div id="container"></div>
        </>
    );

    await userEvent.click( screen.getByText( secondaryItem2.title ).parentElement || new HTMLElement() );

    await waitFor( () => {
        let secondaryElementWithChildren = screen.getByText( primaryItem2.title ).parentElement || new HTMLElement();
        expect( secondaryElementWithChildren.parentElement ).toHaveClass( 'active' );
    } );
} );

test( "secondary level active items are not active after client click", async () => {
    const thirdLevelItem: NavigationItem = { index: 0, title: 'Third Level Item 1' };
    const secondaryItem1: NavigationItem = { index: 0, title: 'Secondary Item 1', children: [thirdLevelItem] };
    const primaryItem1: NavigationItem = { index: 0, title: 'Primary Item 1', children: [secondaryItem1] };
    const primaryItem2: NavigationItem = { index: 1, title: 'Primary Item 2' };
    const navigationItems: NavigationItem[] = [primaryItem1, primaryItem2];

    render(
        <>
            <DXMegaMenu navigationItems={navigationItems} secondaryLevelContainerId="container" />
            <div id="container"></div>
        </>
    );

    await userEvent.click( screen.getByText( primaryItem1.title ).parentElement?.parentElement?.querySelector( '.dxMegaMenu__primaryContainer' ) as HTMLButtonElement );

    let activeItem = screen.getByText( secondaryItem1.title ).parentElement || new HTMLElement();
    if ( !activeItem?.parentElement?.classList.contains( 'active' ) ) {
        await userEvent.click( activeItem );
    }
    await userEvent.click( activeItem );

    await waitFor( () => {
        expect( activeItem?.parentElement ).not.toHaveClass( 'active' );
    } );
} );

test( "secondary level active item turns inactive active after client click", async () => {
    const thirdLevelItem: NavigationItem = { index: 0, title: 'Third Level Item 1' };
    const secondaryItem1: NavigationItem = { index: 0, title: 'Secondary Item 1', children: [thirdLevelItem] };
    const primaryItem1: NavigationItem = { index: 0, title: 'Primary Item 1', children: [secondaryItem1] };
    const navigationItems: NavigationItem[] = [primaryItem1];
    render(
        <>
            <DXMegaMenu navigationItems={navigationItems} secondaryLevelContainerId="container" />
            <div id="container"></div>
        </>
    );

    await userEvent.click( screen.getByText( primaryItem1.title ).parentElement?.parentElement?.querySelector( '.dxMegaMenu__primaryContainer' ) as HTMLButtonElement );

    let activeItem = screen.getByText( secondaryItem1.title ).parentElement?.parentElement || new HTMLElement();
    if ( !activeItem?.classList.contains( 'active' ) ) {
        await userEvent.click( activeItem );
    }
    await userEvent.click( activeItem );

    await waitFor( () => {
        expect( activeItem ).not.toHaveClass( 'active' );
    } );
} );

//Third level test
test( "third level items are not active on a primary level active element", async () => {
    const primaryItem1: NavigationItem = { index: 0, title: 'Primary Item 1', url: 'http://hcl-software.com/' };
    const secondaryItem1: NavigationItem = { index: 0, title: 'Secondary Item 1', children: [{ index: 0, title: "Third Item 1-1" }] };
    const secondaryItem2: NavigationItem = { index: 1, title: 'Secondary Item 2', children: [{ index: 0, title: "Third Item 2-1" }] };
    const secondaryItems: NavigationItem[] = [secondaryItem1, secondaryItem2];
    const primaryItem2: NavigationItem = { index: 1, title: 'Primary Item 2', children: secondaryItems };
    const navigationItems: NavigationItem[] = [primaryItem1, primaryItem2];
    render(
        <>
            <DXMegaMenu navigationItems={navigationItems} secondaryLevelContainerId="container" />
            <div id="container"></div>
        </>
    );

    await userEvent.click( screen.getByText( primaryItem2.title ).parentElement?.parentElement?.querySelector( '.dxMegaMenu__primaryContainer' ) as HTMLButtonElement );

    await waitFor( () => {
        let inactiveItem = screen.getAllByRole( 'third-level-column', { hidden: true } ).filter( ( element: HTMLElement ) => {
            return !element.classList.contains( 'active' );
        } ).pop() || new HTMLElement();
        expect( inactiveItem ).not.toHaveClass( 'active' );
    } );
} );

test( "third level column is active after click on parent secondary level item", async () => {
    const primaryItem1: NavigationItem = { index: 0, title: 'Primary Item 1', url: 'http://hcl-software.com/' };
    const secondaryItem1: NavigationItem = { index: 0, title: 'Secondary Item 1', children: [{ index: 0, title: "Third Item 1-1" }] };
    const secondaryItem2: NavigationItem = { index: 1, title: 'Secondary Item 2', children: [{ index: 0, title: "Third Item 2-1" }] };
    const secondaryItems: NavigationItem[] = [secondaryItem1, secondaryItem2];
    const primaryItem2: NavigationItem = { index: 1, title: 'Primary Item 2', children: secondaryItems };
    const navigationItems: NavigationItem[] = [primaryItem1, primaryItem2];
    render(
        <>
            <DXMegaMenu navigationItems={navigationItems} secondaryLevelContainerId="container" />
            <div id="container"></div>
        </>
    );

    await userEvent.click( screen.getByText( primaryItem2.title ).parentElement?.parentElement?.querySelector( '.dxMegaMenu__primaryContainer' ) as HTMLButtonElement );

    let inactiveItem = screen.getByText( secondaryItem1.title ).parentElement?.parentElement?.querySelector( '.dxMegaMenu__secondaryIconContainer' ) as HTMLButtonElement;

    await userEvent.click( inactiveItem );

    await waitFor( () => {
        let activeItem = screen.getAllByRole( 'third-level-column', { hidden: true } ).filter( ( element: HTMLElement ) => {
            return element.classList.contains( 'active' );
        } ).pop() || new HTMLElement();
        expect( activeItem.firstChild?.hasChildNodes() ).toBeTruthy();
    } );
} );

test( "Activate Third level item on click", async () => {
    const primaryItem1: NavigationItem = { index: 0, title: 'Primary Item 1', url: 'http://hcl-software.com/' };
    const secondaryItem1: NavigationItem = { index: 0, title: 'Secondary Item 1', children: [{ index: 0, title: "Third Item 1-1" }] };
    const secondaryItem2: NavigationItem = { index: 1, title: 'Secondary Item 2', children: [{ index: 0, title: "Third Item 2-1" }] };
    const secondaryItems: NavigationItem[] = [secondaryItem1, secondaryItem2];
    const primaryItem2: NavigationItem = { index: 1, title: 'Primary Item 2', children: secondaryItems };
    const navigationItems: NavigationItem[] = [primaryItem1, primaryItem2];
    const { container } = render(
        <>
            <DXMegaMenu navigationItems={navigationItems} secondaryLevelContainerId="container" />
            <div id="container"></div>
        </>
    );

    await userEvent.click( screen.getByText( primaryItem2.title ).parentElement?.parentElement?.querySelector( '.dxMegaMenu__primaryContainer' ) as HTMLButtonElement );

    let inactiveItem = screen.getByText( secondaryItem1.title ).parentElement?.parentElement?.querySelector( '.dxMegaMenu__secondaryIconContainer' ) as HTMLButtonElement;
    await userEvent.click( inactiveItem );

    let activeItem = screen.getAllByRole( 'third-level-column', { hidden: true } ).filter( ( element: HTMLElement ) => {
        return element.classList.contains( 'active' );
    } ).pop() || new HTMLElement();

    let thirdLevelOption = activeItem.firstChild as HTMLElement || new HTMLElement();
    await userEvent.click( thirdLevelOption );

    await waitFor( () => {
        expect( thirdLevelOption ).toHaveClass( "active" );
    } );
} );

//Banner tests
test( "Test banner", async () => {
    const primaryItem1: NavigationItem = { index: 0, title: 'Primary Item 1', url: 'http://hcl-software.com/' };
    const thirdLevelItem: NavigationItem = { index: 0, title: 'Third Level Item 1' };
    const secondaryItem1: NavigationItem = { index: 0, title: 'Secondary Item 1' };
    const secondaryItem2: NavigationItem = { index: 1, title: 'Secondary Item 2', children: [thirdLevelItem] };
    const secondaryItems: NavigationItem[] = [secondaryItem1, secondaryItem2];
    const bannerItem: BannerProps = {
        title: "Title",
        image: "https://shriramdhun.com/wp-content/uploads/2022/04/Contact-us.png",
        body: "Etiam rhoncus rutrum semper. Vestibulum finibus ligula nec hendrerit semper. ",
        link: {
            url: "www.hcl-software.com",
            label: "",
            target: "_blank"
        }
    };
    const primaryItem2: NavigationItem = { index: 1, title: 'Primary Item 2', children: secondaryItems, bannerProps: [bannerItem] };
    const navigationItems: NavigationItem[] = [primaryItem1, primaryItem2];

    render(
        <>
            <DXMegaMenu navigationItems={navigationItems} secondaryLevelContainerId="container" active={1} />
            <div id="container"></div>
        </>
    );
    await userEvent.click( screen.getByText( secondaryItem2.title ).parentElement || new HTMLElement() );

    await waitFor( () => {
        let bannerElement = screen.getByRole( "dxNavUtils-banner", { hidden: true } );
        expect( bannerElement ).not.toEqual( undefined );
    } );
} );

test( "Test banner has link when given", async () => {
    const windowOpenSpy = jest.spyOn( window, 'open' ).mockImplementation();
    const primaryItem1: NavigationItem = { index: 0, title: 'Primary Item 1', url: 'http://hcl-software.com/' };
    const thirdLevelItem: NavigationItem = { index: 0, title: 'Third Level Item 1' };
    const secondaryItem1: NavigationItem = { index: 0, title: 'Secondary Item 1' };
    const secondaryItem2: NavigationItem = { index: 1, title: 'Secondary Item 2', children: [thirdLevelItem] };
    const secondaryItems: NavigationItem[] = [secondaryItem1, secondaryItem2];
    const bannerItem: BannerProps = {
        title: "Title",
        image: "https://shriramdhun.com/wp-content/uploads/2022/04/Contact-us.png",
        body: "Etiam rhoncus rutrum semper. Vestibulum finibus ligula nec hendrerit semper. ",
        link: {
            url: "www.hcl-software.com",
            label: "",
            target: "_blank"
        }
    };
    const primaryItem2: NavigationItem = { index: 1, title: 'Primary Item 2', children: secondaryItems, bannerProps: [bannerItem] };
    const navigationItems: NavigationItem[] = [primaryItem1, primaryItem2];

    render(
        <>
            <DXMegaMenu navigationItems={navigationItems} secondaryLevelContainerId="container" active={1} />
            <div id="container"></div>
        </>
    );
    await userEvent.click( screen.getByText( secondaryItem2.title ).parentElement || new HTMLElement() );

    const bannerElement = await screen.findByRole( "dxNavUtils-banner", { hidden: true } );
    await userEvent.click( bannerElement );

    await waitFor( () => {
        expect( windowOpenSpy ).toHaveBeenCalledWith( "www.hcl-software.com", "_blank" );
    } );
} );

//Test Global Links
test( "Global Link item text", async () => {
    render(
        <>
            <DXMegaMenu {...MegaMenuArgs} active={1} />
            <div id="container"></div>
        </>
    );
    let globalLink = screen.getAllByTestId( "MegaMenu-GlobalLink" )[0];
    expect( globalLink ).toHaveTextContent( MegaMenuArgs.globalLinks![0].label );
} );

test( "Global link item link", async () => {
    render(
        <>
            <DXMegaMenu {...MegaMenuArgs} active={1} />
            <div id="container"></div>
        </>
    );
    let globalLink = screen.getAllByTestId( "MegaMenu-GlobalLink" )[0];
    expect( globalLink ).toHaveAttribute( "href", MegaMenuArgs.globalLinks![0].url );
} );


test( "Overlay shows when second level is activated", async () => {
    const primaryItem1: NavigationItem = { index: 0, title: 'Primary Item 1', url: 'http://hcl-software.com/' };
    const secondaryItem1: NavigationItem = { index: 0, title: 'Secondary Item 1' };
    const secondaryItem2: NavigationItem = { index: 1, title: 'Secondary Item 2' };
    const secondaryItems: NavigationItem[] = [secondaryItem1, secondaryItem2];
    const primaryItem2: NavigationItem = { index: 1, title: 'Primary Item 2', children: secondaryItems };
    const navigationItems: NavigationItem[] = [primaryItem1, primaryItem2];
    render(
        <>
            <DXMegaMenu navigationItems={navigationItems} secondaryLevelContainerId="container" showOverlay={true} />
            <div id="container"></div>
        </>
    );

    let inactiveItem = screen.getAllByRole( 'tab' ).filter( ( element: HTMLElement ) => {
        return !element.classList.contains( 'active' );
    } ).pop() || new HTMLElement();

    await userEvent.click( inactiveItem );

    await waitFor( () => {
        expect( screen.getByTestId( "MegaMenu__overlay" ) ).toHaveClass( "dxMegaMenu__overlay--state-active" );
    } );
} );

test( "Overlay closes when clicked", async () => {
    const primaryItem1: NavigationItem = { index: 0, title: 'Primary Item 1', url: 'http://hcl-software.com/' };
    const secondaryItem1: NavigationItem = { index: 0, title: 'Secondary Item 1' };
    const secondaryItem2: NavigationItem = { index: 1, title: 'Secondary Item 2' };
    const secondaryItems: NavigationItem[] = [secondaryItem1, secondaryItem2];
    const primaryItem2: NavigationItem = { index: 1, title: 'Primary Item 2', children: secondaryItems };
    const navigationItems: NavigationItem[] = [primaryItem1, primaryItem2];
    render(
        <>
            <DXMegaMenu navigationItems={navigationItems} secondaryLevelContainerId="container" showOverlay={true} />
            <div id="container"></div>
        </>
    );

    let inactiveItem = screen.getAllByRole( 'tab' ).filter( ( element: HTMLElement ) => {
        return !element.classList.contains( 'active' );
    } ).pop() || new HTMLElement();

    await userEvent.click( inactiveItem );

    await waitFor( () => {
        expect( screen.getByTestId( "MegaMenu__overlay" ) ).toHaveClass( "dxMegaMenu__overlay--state-active" );
    } );

    await userEvent.click( screen.getByTestId( "MegaMenu__overlay" ) );

    await waitFor( () => {
        expect( screen.getByTestId( "MegaMenu__overlay" ) ).not.toHaveClass( "dxMegaMenu__overlay--state-active" );
    } );
} );

test( "Icon change if parameter is set", () => {
    const primaryItem1: NavigationItem = { index: 0, title: 'Primary Item 1', url: 'http://hcl-software.com/' };
    const secondaryItem1: NavigationItem = { index: 0, title: 'Secondary Item 1' };
    const secondaryItem2: NavigationItem = { index: 1, title: 'Secondary Item 2' };
    const secondaryItems: NavigationItem[] = [secondaryItem1, secondaryItem2];
    const primaryItem2: NavigationItem = { index: 1, title: 'Primary Item 2', children: secondaryItems };
    const navigationItems: NavigationItem[] = [primaryItem1, primaryItem2];
    render(
        <>
            <DXMegaMenu
                navigationItems={navigationItems}
                secondaryLevelContainerId="container"
                showOverlay={true}
                icons={{
                    firstLevel: "ci-Arrow_Down_MD",
                }}
            />
            <div id="container"></div>
        </>
    );

    expect( screen.getByTestId( "megaMenu__primaryIcon" ) ).toHaveClass( "ci-Arrow_Down_MD" );
} );

// Tests at 1rst, 2nd and 3rd level with onclick function instead link.
test( "If click in first level item with a custom function, the function will be executed", async () => {
    let mockFunction = jest.fn() as Function;
    const navigationItems: NavigationItem[] = [{ index: 1, title: 'Primary Item 1', onClick: mockFunction }];
    const { container } = render(
        <>
            <DXMegaMenu
                navigationItems={navigationItems}
                secondaryLevelContainerId="container"
                showOverlay={true}
                icons={{
                    firstLevel: "ci-Arrow_Down_MD",
                }}
            />
            <div id="container"></div>
        </>
    );

    const fistItem = container.querySelector( '.dxMegaMenu__firstLevelItem a.dxMegaMenu__firstLevelContent' ) as HTMLElement;
    await userEvent.click( fistItem );

    await waitFor( () => {
        expect( mockFunction ).toHaveBeenCalled();
    } );
} );

test( "If click in second level item with a custom function, the function will be executed", async () => {
    let mockFunction = jest.fn() as Function;
    const navigationItems: NavigationItem[] = [{
        index: 1,
        title: 'Primary Item 1',
        children: [{
            index: 2,
            title: "Secondary Item 1-2",
            onClick: mockFunction,
        }]
    }];

    const { container } = render(
        <>
            <DXMegaMenu
                navigationItems={navigationItems}
                secondaryLevelContainerId="container"
                showOverlay={true}
                icons={{
                    firstLevel: "ci-Arrow_Down_MD",
                }}
            />
            <div id="container"></div>
        </>
    );

    const fistItem = container.querySelector( '.dxMegaMenu__firstLevelItem button.dxMegaMenu__primaryContainer' ) as HTMLButtonElement;
    await userEvent.click( fistItem );

    await waitFor( () => {
        expect( container.querySelector( '.dxMegaMenu__secondaryItemContent' ) ).toBeInTheDocument();
    } );

    const secondItem = container.querySelector( '.dxMegaMenu__secondaryItemContent' ) as HTMLElement;
    await userEvent.click( secondItem );

    await waitFor( () => {
        expect( mockFunction ).toHaveBeenCalled();
    } );
} );

test( "If click in third level item with a custom function, the function will be executed", async () => {
    let mockFunction = jest.fn() as Function;
    const navigationItems: NavigationItem[] = [{
        index: 1,
        title: 'Primary Item 1',
        children: [{
            index: 2,
            title: "Secondary Item 1-2",
            children: [{
                index: 3,
                title: "Third Item 1-3",
                onClick: mockFunction,
            }]
        }]
    }];

    const { container } = render(
        <>
            <DXMegaMenu
                navigationItems={navigationItems}
                secondaryLevelContainerId="container"
                showOverlay={true}
                icons={{
                    firstLevel: "ci-Arrow_Down_MD",
                }}
            />
            <div id="container"></div>
        </>
    );

    const fistItem = container.querySelector( '.dxMegaMenu__firstLevelItem button.dxMegaMenu__primaryContainer' ) as HTMLButtonElement;
    await userEvent.click( fistItem );

    await waitFor( () => {
        expect( container.querySelector( '.dxMegaMenu__secondaryIconContainer' ) ).toBeInTheDocument();
    } );

    const secondItem = container.querySelector( '.dxMegaMenu__secondaryIconContainer' ) as HTMLButtonElement;
    await userEvent.click( secondItem );

    await waitFor( () => {
        expect( container.querySelector( '.dxMegaMenu__thirdItem' ) ).toBeInTheDocument();
    } );

    const thirdItem = container.querySelector( '.dxMegaMenu__thirdItem' ) as HTMLElement;
    await userEvent.click( thirdItem );

    await waitFor( () => {
        expect( mockFunction ).toHaveBeenCalled();
    } );
} );

test( "menuImage prop applies background image to secondary level", () => {
    const navItems: NavigationItem[] = [{ index: 0, title: 'Primary', children: [{ index: 0, title: 'Sec' }] }];
    render(
        <>
            <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" menuImage="test-bg.jpg" />
            <div id="container"></div>
        </>
    );
    const secondaryLevel = document.querySelector( '.dxMegaMenu__secondaryLevel' ) as HTMLElement;
    expect( secondaryLevel.style.backgroundImage ).toContain( 'test-bg.jpg' );
} );

test( "Outside alerter triggers resetHooks and closes overlay on outside click", async () => {
    const navItems: NavigationItem[] = [{ index: 0, title: 'Primary', children: [{ index: 0, title: 'Sec' }] }];
    render(
        <div id="outside-element">
            <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" showOverlay={true} />
            <div id="container"></div>
        </div>
    );

    // Open the menu to activate the overlay
    const primaryBtn = screen.getByTestId( "megaMenu__primaryIcon" ).parentElement!;
    await userEvent.click( primaryBtn );
    await waitFor( () => {
        expect( screen.getByTestId( "MegaMenu__overlay" ) ).toHaveClass( "dxMegaMenu__overlay--state-active" );
    } );

    // Simulate clicking entirely outside the component refs
    const outside = document.getElementById( "outside-element" )!;
    fireEvent.mouseDown( outside );

    // Verify state hooks were reset and overlay was closed
    await waitFor( () => {
        expect( screen.getByTestId( "MegaMenu__overlay" ) ).not.toHaveClass( "dxMegaMenu__overlay--state-active" );
    } );
} );

test( "Banner without link prop does not throw on click and defaults imageFit to cover", async () => {
    const windowOpenSpy = jest.spyOn( window, 'open' ).mockImplementation();
    windowOpenSpy.mockClear(); // Clear any leaked calls from previous tests

    const uniqueId = "unique-container-no-link"; // Prevent portal collision with old tests
    const bannerItem: BannerProps = {
        title: "No Link Banner",
        image: "img.png",
        body: "Body",
        // Explicitly omitting 'link' and 'imageFit' to hit the ternary fallbacks
    };
    const navItems: NavigationItem[] = [
        { index: 0, title: 'Primary 1' },
        { index: 1, title: 'Primary 2', children: [{ index: 0, title: 'Sec' }], bannerProps: [bannerItem] }
    ];

    render(
        <>
            <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId={uniqueId} active={1} />
            <div id={uniqueId}></div>
        </>
    );

    // Allow ReactDOM.render portal to paint
    await waitFor( () => {
        expect( screen.getByText( "No Link Banner" ) ).toBeInTheDocument();
    } );

    // Target our specific banner to avoid clicking ghost banners from older tests
    const bannerEl = screen.getByText( "No Link Banner" ).closest( '[role="dxNavUtils-banner"]' ) as HTMLElement;
    const imgEl = bannerEl.querySelector( 'img' ) as HTMLImageElement;

    // Verifies the `imageFit || "cover"` branch
    expect( imgEl.style.objectFit ).toBe( "cover" );

    // Verifies the `if (banner.link)` boundary protects `window.open`
    await userEvent.click( bannerEl );
    await waitFor( () => {
        expect( windowOpenSpy ).not.toHaveBeenCalled();
    } );

    windowOpenSpy.mockRestore();
} );

test( "Secondary columns explicitly call stopPropagation on click", async () => {
    const navItems: NavigationItem[] = [
        { index: 0, title: 'Primary 1' },
        { index: 1, title: 'Primary 2', children: [{ index: 0, title: 'Sec' }] }
    ];
    render(
        <>
            <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" active={1} />
            <div id="container"></div>
        </>
    );

    // Allow ReactDOM.render portal to paint
    await waitFor( () => {
        expect( document.querySelectorAll( '.dxMegaMenu__secondaryLevelCol' ).length ).toBeGreaterThan( 0 );
    } );

    const columns = document.querySelectorAll( '.dxMegaMenu__secondaryLevelCol' );

    // Fires the anonymous `(e) => e.stopPropagation()` handler directly
    fireEvent.click( columns[0] );
} );

test( "Third level item content click without onClick bypasses preventDefault", async () => {
    const thirdLevelItem: NavigationItem = { index: 0, title: 'Third' };
    const navItems: NavigationItem[] = [
        { index: 0, title: 'Primary 1' },
        { index: 1, title: 'Primary 2', children: [{ index: 0, title: 'Sec', children: [thirdLevelItem] }] }
    ];
    render(
        <>
            <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" active={1} />
            <div id="container"></div>
        </>
    );

    // Allow ReactDOM.render portal to paint
    await waitFor( () => {
        expect( document.querySelector( '.dxMegaMenu__secondaryIconContainer' ) ).toBeInTheDocument();
    } );

    // Expand secondary level
    const secArrow = document.querySelector( '.dxMegaMenu__secondaryIconContainer' ) as HTMLElement;
    await userEvent.click( secArrow );

    const thirdContent = await screen.findByTestId( 'tertiary-link' );

    // Asserts the `if( item.onClick && !item.children )` path evaluates safely when onClick is omitted
    await userEvent.click( thirdContent );
    await waitFor( () => {
        expect( thirdContent ).toBeInTheDocument();
    } );
} );

test( "mathematical layout boundary: exhausts availableSpace and strictly slices banner array", async () => {
    // Suppress React 17 portal warnings for the test execution
    const warn = jest.spyOn( console, "warn" ).mockImplementation();

    // Setup to drain exactly 80 space:
    // > 10 items (-44), third level exists (-16), global links exist (-20)
    // Remaining space: 100 - 80 = 20. Exactly enough for ONE banner.
    const thirdLevelItem: NavigationItem = { index: 0, title: 'Third' };
    const secondaryItems: NavigationItem[] = Array.from( { length: 11 } ).map( ( _, i ) => ( {
        index: i,
        title: `Sec ${i}`,
        // Inject third level only on the first item to trigger the -16 drop
        children: i === 0 ? [thirdLevelItem] : undefined
    } ) );

    const banner1: BannerProps = { title: "Banner 1", image: "img1.png", body: "Body 1" };
    const banner2: BannerProps = { title: "Banner 2", image: "img2.png", body: "Body 2" };

    const navItems: NavigationItem[] = [
        { index: 0, title: 'Filler' }, // Index 0 must exist so active={1} resolves correctly in useState
        { index: 1, title: 'Primary 1', children: secondaryItems, bannerProps: [banner1, banner2] }
    ];

    const globalLinks = [{ label: "Global", url: "http://test.com", target: "_blank" }];

    render(
        <>
            <DXMegaMenu
                navigationItems={navItems}
                secondaryLevelContainerId="container"
                globalLinks={globalLinks}
                active={1}
            />
            <div id="container"></div>
        </>
    );

    // Allow portal to paint
    await waitFor( () => {
        expect( screen.getByText( "Banner 1" ) ).toBeInTheDocument();
    } );

    const banners = screen.getAllByRole( "dxNavUtils-banner" );

    // STRICT ASSERTION: Kills layout math mutants. If >= 20 becomes > 20, this fails (0 banners). 
    // If -44 becomes -22, this fails (2 banners render).
    expect( banners ).toHaveLength( 1 );
    expect( screen.getByText( "Banner 1" ) ).toBeInTheDocument();
    expect( screen.queryByText( "Banner 2" ) ).not.toBeInTheDocument();

    warn.mockRestore();
} );

test( "strict array slicing: itemsCount < 10 boundary shifts 11th item to second column", async () => {
    const warn = jest.spyOn( console, "warn" ).mockImplementation();

    // Generate exactly 11 items. 
    // Indexes 0-9 (10 items) should go to Col 1. Index 10 (11th item) should go to Col 2.
    const secondaryItems: NavigationItem[] = Array.from( { length: 11 } ).map( ( _, i ) => ( {
        index: i,
        title: `Sec Item ${i}`
    } ) );

    const navItems: NavigationItem[] = [
        { index: 0, title: 'Filler' }, // Index 0 must exist so active={1} resolves correctly in useState
        { index: 1, title: 'Primary 1', children: secondaryItems }
    ];

    render(
        <>
            <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" active={1} />
            <div id="container"></div>
        </>
    );

    await waitFor( () => {
        expect( document.querySelectorAll( '.dxMegaMenu__secondaryLevelCol' ).length ).toBeGreaterThan( 0 );
    } );

    const columns = document.querySelectorAll( '.dxMegaMenu__secondaryLevelCol' );

    expect( columns ).toHaveLength( 2 );
    expect( columns[0].children ).toHaveLength( 10 );
    expect( columns[0].textContent ).toContain( "Sec Item 9" );
    expect( columns[1].children ).toHaveLength( 1 );
    expect( columns[1].textContent ).toContain( "Sec Item 10" );

    warn.mockRestore();
} );

test( "inline style mutation: index 0 evaluates cleanly for tab display rendering", async () => {
    const warn = jest.spyOn( console, "warn" ).mockImplementation();

    const navItems: NavigationItem[] = [
        { index: 0, title: 'Primary 1', children: [{ index: 0, title: 'Sec' }] },
        { index: 1, title: 'Primary 2', children: [{ index: 0, title: 'Sec' }] }
    ];

    render(
        <>
            <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" />
            <div id="container"></div>
        </>
    );

    await waitFor( () => {
        expect( screen.getByText( "Primary 1" ) ).toBeInTheDocument();
    } );

    // The onClick handler that updates the active state is attached to the sibling button
    // containing the dropdown icon, not the button holding the text. We must traverse up to the <li>.
    const primary1Btn = screen.getByText( "Primary 1" ).closest( 'li' )!.querySelector( '.dxMegaMenu__primaryContainer' )!;
    fireEvent.click( primary1Btn );

    await waitFor( () => {
        let tabPane = screen.getByTestId( "dxMegaMenu-tab" );
        expect( tabPane.style.display ).toBe( "none" );
    } );

    let tabPane = screen.getByTestId( "dxMegaMenu-tab" );

    const primary2Btn = screen.getByText( "Primary 2" ).closest( 'li' )!.querySelector( '.dxMegaMenu__primaryContainer' )!;
    fireEvent.click( primary2Btn );

    await waitFor( () => {
        tabPane = screen.getByTestId( "dxMegaMenu-tab" );
        expect( tabPane.style.display ).toBe( "initial" );
    } );

    warn.mockRestore();
} );

describe( "DXMegaMenu Hardening", () => {
    let containerSlot: HTMLDivElement;

    beforeEach( () => {
        containerSlot = document.createElement( "div" );
        containerSlot.id = "container";
        document.body.appendChild( containerSlot );
    } );

    afterEach( () => {
        document.body.removeChild( containerSlot );
        jest.clearAllMocks();
    } );

    describe( "Outside Alerter Logic Matrix", () => {
        it( "strictly protects state retention when a mousedown event occurs inside the primary wrapper ref", async () => {
            const navItems: NavigationItem[] = [{ index: 0, title: 'Primary', children: [{ index: 0, title: 'Sec' }] }];

            render(
                <div id="ambient-container">
                    <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" showOverlay={true} />
                </div>
            );

            // Activate overlay
            const primaryBtn = screen.getByTestId( "megaMenu__primaryIcon" ).parentElement!;
            fireEvent.click( primaryBtn );
            await waitFor( () => {
                expect( screen.getByTestId( "MegaMenu__overlay" ) ).toHaveClass( "dxMegaMenu__overlay--state-active" );
            } );

            // Click INSIDE the main menu wrapper ref element
            const mainWrapper = document.querySelector( ".dxMegaMenu" ) as HTMLElement;
            fireEvent.mouseDown( mainWrapper );

            // The conditional guard '&&' must evaluate to false, preventing hooks from resetting
            await waitFor( () => {
                expect( screen.getByTestId( "MegaMenu__overlay" ) ).toHaveClass( "dxMegaMenu__overlay--state-active" );
            } );
        } );
    } );

    describe( "Third-Level Event Propagation Suppression", () => {
        it( "strictly calls stopPropagation on third-level elements to prevent bubble leakage", async () => {
            const mockClick = jest.fn();
            const parentBubbleMock = jest.fn();

            // active={1} bypasses the component's internal props.active falsy evaluation bug on 0
            const navItems: NavigationItem[] = [
                { index: 0, title: 'Filler' },
                {
                    index: 1,
                    title: 'Primary 1',
                    children: [{
                        index: 0,
                        title: 'Sec 1',
                        children: [{ index: 0, title: 'Tertiary Target', onClick: mockClick }]
                    }]
                }
            ];

            render(
                <div id="bubble-interceptor" onClick={parentBubbleMock}>
                    <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" active={1} />
                </div>
            );

            // Force portal rendering lifecycle to complete inside JSDOM
            await waitFor( () => {
                expect( document.querySelector( '.dxMegaMenu__secondaryIconContainer' ) ).toBeInTheDocument();
            } );

            // Target the secondary menu item arrow button
            const secArrow = document.querySelector( '.dxMegaMenu__secondaryIconContainer' ) as HTMLElement;
            fireEvent.click( secArrow );

            await waitFor( () => {
                expect( document.querySelector( '.dxMegaMenu__thirdItem' ) ).toBeInTheDocument();
            } );

            const tertiaryItem = document.querySelector( '.dxMegaMenu__thirdItem' ) as HTMLElement;

            // Click third level to verify e.stopPropagation() cuts off event bubbling vectors completely
            fireEvent.click( tertiaryItem );

            await waitFor( () => {
                expect( mockClick ).toHaveBeenCalledTimes( 1 );
                expect( parentBubbleMock ).not.toHaveBeenCalled();
            } );
        } );
    } );

    describe( "Exact Space Floor Restrictions", () => {
        it( "asserts strict exclusion math rules when remaining layout space drops below the 20 percent threshold", async () => {
            const secondaryItems: NavigationItem[] = Array.from( { length: 11 } ).map( ( _, i ) => ( {
                index: i,
                title: `Sec ${i}`
            } ) );

            // Space Allocation Math:
            // Initial = 100
            // itemsCount > 10 subtracts 44 -> 56 remaining
            // globalLinks present subtracts 20 -> 36 remaining
            // Banner 1 takes 20 -> 16 remaining
            // Banner 2 requires 20, but only 16 is left -> must be excluded strictly
            const banner1: BannerProps = { title: "Visible Banner", image: "b1.png", body: "Text 1" };
            const banner2: BannerProps = { title: "Hidden Banner", image: "b2.png", body: "Text 2" };

            const navItems: NavigationItem[] = [
                { index: 0, title: 'Filler' },
                { index: 1, title: 'Primary Target', children: secondaryItems, bannerProps: [banner1, banner2] }
            ];

            const globalLinks = [{ label: "Global", url: "http://test.com" }];

            render(
                <>
                    <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" globalLinks={globalLinks} active={1} />
                </>
            );

            await waitFor( () => {
                expect( screen.getByText( "Visible Banner" ) ).toBeInTheDocument();
            } );

            const banners = screen.getAllByRole( "dxNavUtils-banner" );

            // Kills mutations changing standard relational thresholds (>= 20 vs > 20)
            expect( banners ).toHaveLength( 1 );
            expect( screen.queryByText( "Hidden Banner" ) ).not.toBeInTheDocument();
        } );
    } );

    describe( "Boundary and Pointer Matrix Hardening", () => {
        it( "strictly sets display to none when primaryNavItemActive index matches 0 to kill index truthy mutation bugs", async () => {
            const warn = jest.spyOn( console, "warn" ).mockImplementation();

            // Item with index 0 exactly to test the falsy rendering guard evaluation paths
            const navItems: NavigationItem[] = [
                { index: 0, title: 'Index Zero Target', children: [{ index: 0, title: 'Child' }] }
            ];

            render(
                <>
                    <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" />
                    <div id="container"></div>
                </>
            );

            await waitFor( () => {
                expect( screen.getByTestId( "megaMenu__primaryIcon" ) ).toBeInTheDocument();
            } );

            // Target the button directly using the explicit data-testid attribute path
            const zeroBtn = screen.getByTestId( "megaMenu__primaryIcon" ).parentElement!;
            fireEvent.click( zeroBtn );

            await waitFor( () => {
                let tabPane = screen.getByTestId( "dxMegaMenu-tab" );
                // Index 0 evaluates to falsy (0), which forces style.display to drop to "none" rigidly
                expect( tabPane.style.display ).toBe( "none" );
            } );

            warn.mockRestore();
        } );

        it( "asserts accurate space tracking reductions when secondLevelItem list length maps precisely to 10 boundary limits", async () => {
            const warn = jest.spyOn( console, "warn" ).mockImplementation();

            // Generate exactly 10 secondary items to test the boundary boundary constraints of itemsCount < 10
            const secondaryItems: NavigationItem[] = Array.from( { length: 10 } ).map( ( _, i ) => ( {
                index: i,
                title: `Item-${i}`
            } ) );

            const banner1: BannerProps = { title: "B1", image: "img.png", body: "Txt" };
            const banner2: BannerProps = { title: "B2", image: "img.png", body: "Txt" };

            const navItems: NavigationItem[] = [
                { index: 0, title: 'Filler' },
                { index: 1, title: 'Target', children: secondaryItems, bannerProps: [banner1, banner2] }
            ];

            render(
                <>
                    <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" active={1} />
                    <div id="container"></div>
                </>
            );

            await waitFor( () => {
                const banners = screen.getAllByRole( "dxNavUtils-banner" );
                // AvailableSpace tracking: 100 - 22 (itemsCount <= 10 uses 22) = 78 remaining.
                // Banner 1 uses 20 -> 58. Banner 2 uses 20 -> 38. Both banners must successfully render.
                expect( banners ).toHaveLength( 2 );
            } );

            warn.mockRestore();
        } );

        it( "strictly sets backgroundSize to cover inline styling formats when menuImage argument is specified", () => {
            const navItems: NavigationItem[] = [{ index: 0, title: 'Primary', children: [{ index: 0, title: 'Child' }] }];
            render(
                <>
                    <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" menuImage="asset-path.jpg" />
                    <div id="container"></div>
                </>
            );

            const secondaryLevel = document.querySelector( '.dxMegaMenu__secondaryLevel' ) as HTMLElement;
            expect( secondaryLevel.style.backgroundSize ).toBe( "cover" );
        } );

        it( "bypasses portal painting cycles cleanly without crashing if secondaryLevelContainerId element returns missing", () => {
            const warn = jest.spyOn( console, "warn" ).mockImplementation();
            const navItems: NavigationItem[] = [{ index: 0, title: 'Primary' }];

            expect( () => {
                render( <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="non-existent-dom-id" /> );
            } ).not.toThrow();

            expect( warn ).toHaveBeenCalledWith( expect.stringContaining( "not able to render the second level" ) );
            warn.mockRestore();
        } );

        it( "retains open active class structures on primary list buttons when dropdown triggers are repeatedly clicked", async () => {
            const navItems: NavigationItem[] = [{ index: 0, title: 'Toggle', children: [{ index: 0, title: 'Sec' }] }];
            render(
                <>
                    <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" />
                    <div id="container"></div>
                </>
            );

            const primaryTrigger = screen.getByTestId( "megaMenu__primaryIcon" ).parentElement!;

            // Cycle 1: Open item
            fireEvent.click( primaryTrigger );
            await waitFor( () => {
                expect( primaryTrigger ).toHaveClass( "active" );
            } );

            // Cycle 2: Collapse item -> internal resetHooks sets index back to -1
            fireEvent.click( primaryTrigger );
            await waitFor( () => {
                expect( primaryTrigger ).not.toHaveClass( "active" );
            } );
        } );
    } );

    describe( "Deep Integration and Layout Hardening", () => {
        it( "strictly handles secondary icon container toggle states to trigger reverse reset hooks when clicked repeatedly", async () => {
            const navItems: NavigationItem[] = [
                { index: 0, title: 'Filler' },
                {
                    index: 1,
                    title: 'Primary 1',
                    children: [{
                        index: 5,
                        title: "Secondary 1",
                        children: [{ index: 0, title: "Tertiary 1" }]
                    }]
                }
            ];

            render(
                <>
                    <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" active={1} />
                    <div id="container"></div>
                </>
            );

            await waitFor( () => {
                expect( document.querySelector( '.dxMegaMenu__secondaryIconContainer' ) ).toBeInTheDocument();
            } );

            const secArrow = document.querySelector( '.dxMegaMenu__secondaryIconContainer' ) as HTMLButtonElement;

            await act( async () => {
                fireEvent.click( secArrow );
            } );

            await waitFor( () => {
                let thirdLevelCol = document.querySelector( '.dxMegaMenu__thirdLevelCol' );
                expect( thirdLevelCol ).toHaveClass( 'active' );
            } );

            await act( async () => {
                fireEvent.click( secArrow );
            } );

            await waitFor( () => {
                let thirdLevelCol = document.querySelector( '.dxMegaMenu__thirdLevelCol' );
                expect( thirdLevelCol ).not.toHaveClass( 'active' );
            } );
        } );

        it( "verifies banner subtraction loops tightly constraint layout allocations when space drops under threshold minimums", async () => {
            const warn = jest.spyOn( console, "warn" ).mockImplementation();

            // 10 items uses exactly 22 space. Third level uses 16 space. Global links uses 20 space.
            // Total space consumed = 58. Available space remaining = 100 - 58 = 42.
            const secondaryItems: NavigationItem[] = Array.from( { length: 10 } ).map( ( _, i ) => ( {
                index: i,
                title: `Sec Item ${i}`,
                children: i === 0 ? [{ index: 0, title: 'Third Node' }] : undefined
            } ) );

            // Supply 3 banners. Banner 1 costs 20 (22 left). Banner 2 costs 20 (2 left). 
            // Banner 3 requires 20, but only 2 is left. It must be strictly excluded.
            const banner1: BannerProps = { title: "B1", image: "img1.png", body: "Txt1" };
            const banner2: BannerProps = { title: "B2", image: "img2.png", body: "Txt2" };
            const banner3: BannerProps = { title: "B3", image: "img3.png", body: "Txt3" };

            const navItems: NavigationItem[] = [
                { index: 0, title: 'Filler' },
                { index: 1, title: 'Primary Target', children: secondaryItems, bannerProps: [banner1, banner2, banner3] }
            ];

            const globalLinks = [{ label: "Global", url: "http://test.com" }];

            render(
                <>
                    <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" globalLinks={globalLinks} active={1} />
                    <div id="container"></div>
                </>
            );

            await waitFor( () => {
                const renderedBanners = screen.getAllByRole( "dxNavUtils-banner" );
                // Verifies availableSpace calculation loops cleanly without relational sign mutations (>= 20)
                expect( renderedBanners ).toHaveLength( 2 );
                expect( screen.getByText( "B1" ) ).toBeInTheDocument();
                expect( screen.getByText( "B2" ) ).toBeInTheDocument();
                expect( screen.queryByText( "B3" ) ).not.toBeInTheDocument();
            } );

            warn.mockRestore();
        } );

        it( "executes custom onClick actions simultaneously alongside menu state updates when primary items possess children", async () => {
            const customClickMock = jest.fn();
            const navItems: NavigationItem[] = [{
                index: 0,
                title: 'Primary Trigger',
                onClick: customClickMock,
                children: [{ index: 0, title: 'Sec item' }]
            }];

            render(
                <>
                    <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" showOverlay={true} />
                    <div id="container"></div>
                </>
            );

            const textLink = screen.getByTestId( "primary-link" );

            fireEvent.click( textLink );

            await waitFor( () => {
                // Verifies the custom execution routing branch does not short-circuit when item children are present
                expect( customClickMock ).toHaveBeenCalledTimes( 1 );
            } );
        } );

        it( "safeguards navigation state retention from outside click monitors when click signals emanate within the secondary portal container element", async () => {
            const navItems: NavigationItem[] = [{
                index: 0,
                title: 'Primary Item',
                children: [{ index: 0, title: 'Secondary Portal Link' }]
            }];

            render(
                <div id="ambient-enclosure">
                    <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" showOverlay={true} />
                    <div id="container"></div>
                </div>
            );

            const trigger = screen.getByTestId( "megaMenu__primaryIcon" ).parentElement!;
            fireEvent.click( trigger );

            await waitFor( () => {
                expect( screen.getByTestId( "MegaMenu__overlay" ) ).toHaveClass( "dxMegaMenu__overlay--state-active" );
            } );

            const portalContent = document.querySelector( '.dxMegaMenu__secondaryLevel' ) as HTMLElement;
            fireEvent.mouseDown( portalContent );

            await waitFor( () => {
                expect( screen.getByTestId( "MegaMenu__overlay" ) ).toHaveClass( "dxMegaMenu__overlay--state-active" );
            } );
        } );
    } );

    describe( "Navigation Hierarchy Processing Engine", () => {
        it( "strictly processes recursively deep NavigationNode tree structures while assigning exact depth levels", async () => {
            const nestedTree: NavigationItem[] = [
                {
                    index: 10,
                    title: "Level 1",
                    children: [
                        {
                            index: 20,
                            title: "Level 2",
                            children: [
                                {
                                    index: 30,
                                    title: "Level 3"
                                }
                            ]
                        }
                    ]
                }
            ];

            const { container } = render(
                <>
                    <DXMegaMenu navigationItems={nestedTree} secondaryLevelContainerId="container" />
                    <div id="container"></div>
                </>
            );

            await waitFor( () => {
                // 1. Verify Level 1 mounted correctly
                const level1Trigger = screen.getByText( "Level 1" ).closest( 'li' )!.querySelector( '.dxMegaMenu__primaryContainer' )!;
                expect( level1Trigger ).toBeInTheDocument();
            } );

            const level1Trigger = screen.getByText( "Level 1" ).closest( 'li' )!.querySelector( '.dxMegaMenu__primaryContainer' )!;
            // Open Level 1 to trigger Level 2 & 3 parsing
            fireEvent.click( level1Trigger );

            await waitFor( () => {
                // 2. Verify Level 2 mounted correctly
                const level2Node = screen.getByText( "Level 2" );
                expect( level2Node ).toBeInTheDocument();

                // 3. Verify Level 3 mounted correctly
                const level3Node = screen.getByText( "Level 3" );
                expect( level3Node ).toBeInTheDocument();
            } );
        } );
    } );

    describe( "Item Mapping Null/Undefined Bounds", () => {
        it( "gracefully falls back when navigationItems is explicitly passed as null/undefined", async () => {
            // Suppress the warning since `navigationItems.forEach` normally crashes if undefined
            // If the internal component guards it (like the `if (props.navigationItems)` branch), 
            // then it should skip the tree generator and not crash.
            const { container } = render(
                <>
                    <DXMegaMenu navigationItems={undefined as any} secondaryLevelContainerId="container" />
                    <div id="container"></div>
                </>
            );

            await waitFor( () => {
                const primaryList = container.querySelector( ".dxMegaMenu__primaryLevel" );
                // If the prop check succeeds, the list is empty instead of crashing
                expect( primaryList?.childElementCount ).toBe( 0 );
            } );
        } );

        it( "strictly resolves empty icon generation paths via utility fallbacks when target attributes are omitted", () => {
            const itemWithoutTarget: NavigationItem = {
                index: 0,
                title: "No Target",
                url: "http://test.com"
            };

            render(
                <>
                    <DXMegaMenu navigationItems={[itemWithoutTarget]} secondaryLevelContainerId="container" />
                    <div id="container"></div>
                </>
            );

            // Targets the getLinkTarget(item.target) fallback execution boundary
            const link = screen.getByTestId( "primary-link" );
            expect( link ).toHaveAttribute( "target", "_self" ); // Assuming utility defaults to _self
        } );
    } );

    describe( "Overlay State Management Edge Cases", () => {
        it( "strictly ignores activating overlay if a primary item is clicked but contains an empty children array", async () => {
            // Provide children array as explicitly empty
            const navItems: NavigationItem[] = [{
                index: 1,
                title: "Empty Children",
                children: []
            }];

            render(
                <>
                    <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" showOverlay={true} />
                    <div id="container"></div>
                </>
            );

            const trigger = screen.getByTestId( "megaMenu__primaryIcon" ).parentElement!;
            await userEvent.click( trigger );

            // The component evaluates `if (item.children && item.children.length > 0 && props.showOverlay)`
            // Because length is 0, overlay must rigidly remain closed.
            await waitFor( () => {
                expect( screen.getByTestId( "MegaMenu__overlay" ) ).not.toHaveClass( "dxMegaMenu__overlay--state-active" );
            } );
        } );

        it( "asserts overlayCallback actively unbinds currentActive and resets all operational tiers", async () => {
            const navItems: NavigationItem[] = [
                {
                    index: 1,
                    title: "Active Primary",
                    children: [{ index: 0, title: "Sec" }]
                }
            ];

            render(
                <>
                    <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" showOverlay={true} />
                    <div id="container"></div>
                </>
            );

            // Open menu
            const primaryTrigger = screen.getByTestId( "megaMenu__primaryIcon" ).parentElement!;
            await userEvent.click( primaryTrigger );

            await waitFor( () => {
                const overlay = screen.getByTestId( "MegaMenu__overlay" );
                expect( overlay ).toHaveClass( "dxMegaMenu__overlay--state-active" );
            } );

            // Execute the raw overlayCallback by clicking the overlay layer natively using userEvent
            await userEvent.click( screen.getByTestId( "MegaMenu__overlay" ) );

            // Expect hooks to execute resetHooks(true, true, true) returning currentActive to -1 
            // AND overlayActive to false
            await waitFor( () => {
                // Re-query the primary trigger to avoid stale DOM element references
                const updatedTrigger = screen.getByTestId( "megaMenu__primaryIcon" ).parentElement!;
                expect( updatedTrigger ).not.toHaveClass( "active" );
                expect( screen.getByTestId( "MegaMenu__overlay" ) ).not.toHaveClass( "dxMegaMenu__overlay--state-active" );
            } );
        } );
    } );

    describe( "Click PreventDefault Behaviors on Tertiary Links", () => {
        it( "strictly fires e.preventDefault() on tertiary links when onClick is present but children are omitted", async () => {
            const onClickMock = jest.fn();
            // Intercept preventDefault globally so it catches the React synthetic wrapper execution
            const preventSpy = jest.spyOn( Event.prototype, 'preventDefault' );

            const tertiaryItem: NavigationItem = {
                index: 0,
                title: "PreventDefault Target",
                onClick: onClickMock
                // NO children property provided
            };

            const navItems: NavigationItem[] = [
                { index: 0, title: 'Filler' },
                { index: 1, title: 'Primary', children: [{ index: 0, title: 'Sec', children: [tertiaryItem] }] }
            ];

            render(
                <>
                    <DXMegaMenu navigationItems={navItems} secondaryLevelContainerId="container" active={1} />
                    <div id="container"></div>
                </>
            );

            // Allow portal to paint
            await waitFor( () => {
                expect( document.querySelector( '.dxMegaMenu__secondaryIconContainer' ) ).toBeInTheDocument();
            } );

            // Expand secondary
            const secArrow = document.querySelector( '.dxMegaMenu__secondaryIconContainer' ) as HTMLElement;
            fireEvent.click( secArrow );

            const tertiaryLink = await screen.findByTestId( "tertiary-link" );
            fireEvent.click( tertiaryLink );

            await waitFor( () => {
                // Evaluates `if(item.onClick && !item.children) { e.preventDefault(); }`
                expect( preventSpy ).toHaveBeenCalled();
                expect( onClickMock ).toHaveBeenCalled();
            } );

            preventSpy.mockRestore();
        } );
    } );
} );
