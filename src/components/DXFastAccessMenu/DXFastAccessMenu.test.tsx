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
import DXFastAccessMenu from "./DXFastAccessMenu";
import { FastAccessMenuArgs, FastAccessMenuChangedIconsArgs, FastAccessMenuNoHeaderArgs } from "./DXFastAccessMenu.stories";
import userEvent from "@testing-library/user-event";

describe( "FastAccessMenu component", () => {

    beforeEach( () => {
        const mockIntersectionObserver = jest.fn();
        mockIntersectionObserver.mockReturnValue( {
            observe: () => null,
            unobserve: () => null,
            disconnect: () => null
        } );
        window.IntersectionObserver = mockIntersectionObserver;
        window.HTMLElement.prototype.scrollIntoView = jest.fn();
    } );

    test( "Full Rendering FastAccessMenu component", () => {
        render( <DXFastAccessMenu {...FastAccessMenuArgs} /> );
        expect( screen.getByTestId( "fast-access-menu-container" ) ).toBeTruthy();
    } );

    test( "Validate CTA button properties to go Customize Fast Access Menu link", () => {
        render( <DXFastAccessMenu {...FastAccessMenuArgs} /> );
        const linkElement = ( screen.getByTestId( "custom-link" ) as HTMLAnchorElement );
        expect( linkElement.href ).toEqual( FastAccessMenuArgs.link?.url );
        expect( linkElement.target ).toEqual( FastAccessMenuArgs.link?.target );
    } );

    test( "Validate title is rendered", () => {
        render( <DXFastAccessMenu {...FastAccessMenuArgs} /> );
        const titleElement = ( screen.getByTestId( "header-title" ) as HTMLElement );
        if ( FastAccessMenuArgs.title ) {
            expect( titleElement ).toHaveTextContent( FastAccessMenuArgs.title );
        }
    } );

    test( "Validate title is null if prop is not set", () => {
        render( <DXFastAccessMenu {...FastAccessMenuNoHeaderArgs} /> );
        let title = document.querySelector( '[data-testid="header-title"]' );
        expect( title ).toBeNull();
    } );

    test( "FastAccessMenu when have more than 14 items on ribbon navigation", () => {
        let props = JSON.parse( JSON.stringify( FastAccessMenuArgs ) );
        props.items.push( {
            label: "-- Title 15",
            url: "https://hcl-software.com",
        } );
        render( <DXFastAccessMenu {...props} /> );

        let arrowsBtns = 2;
        let itemsBtns = props.items.length;
        expect( screen.getByTestId( "fast-access-menu-ribbon" ) );
        expect( screen.getByTestId( "btn-14" ) ).toBeTruthy();
        expect( screen.getAllByRole( 'button' ).length ).toBe( itemsBtns + arrowsBtns );
    } );

    test( "FastAccessMenu when have more than 14 items on ribbon navigation an no link or customButton", () => {
        let props = JSON.parse( JSON.stringify( FastAccessMenuArgs ) );
        delete props.link;
        delete props.buttonCustom;

        props.items.push( {
            label: "-- Title 15",
            url: "https://hcl-software.com",
        } );
        render( <DXFastAccessMenu {...props} /> );

        let arrowsBtns = 2;
        let itemsBtns = props.items.length;
        expect( screen.getByTestId( "fast-access-menu-ribbon" ) );
        expect( document.querySelector( "#btn-14" ) ).toBeNull();
        expect( screen.getAllByRole( 'button' ).length ).toBeLessThan( itemsBtns + arrowsBtns );
    } );

    test( "FastAccessMenu when have less than 14 items on ribbon navigation an no link or customButton", () => {
        let props = JSON.parse( JSON.stringify( FastAccessMenuArgs ) );
        delete props.link;
        delete props.buttonCustom;

        render( <DXFastAccessMenu {...props} /> );

        let arrowsBtns = 2;
        let itemsBtns = props.items.length;
        expect( screen.getByTestId( "fast-access-menu-ribbon" ) );
        expect( document.querySelector( "#btn-14" ) ).toBeNull();
        expect( screen.getAllByRole( 'button' ).length ).toBe( itemsBtns + arrowsBtns );
    } );

    test( "Click on any item button on ribbon navigation", async () => {
        const spyWindowOpen = jest.spyOn( window, 'open' );
        spyWindowOpen.mockImplementation( jest.fn() );
        render( <DXFastAccessMenu {...FastAccessMenuArgs} /> );
        const itemtButton = screen.getByTestId( "btn-5" );
        await userEvent.click( itemtButton );

        expect( spyWindowOpen ).toBeCalled();
        spyWindowOpen.mockRestore();
    } );

    test( "If does not pass a url for some button, and click it, a console warning should appeared with a message", async () => {
        let props = FastAccessMenuArgs;
        props.items[5] = {
            label: "-- Title 6",
            url: ""
        };
        const warn = jest.spyOn( console, "warn" );
        render( <DXFastAccessMenu {...props} /> );
        const itemtButton = screen.getByTestId( "btn-5" );
        await userEvent.click( itemtButton );
        expect( warn ).toHaveBeenCalledWith( "ERROR: Cannot redirect to an empty URL" );
        warn.mockRestore();
    } );

    test( "Click on arrow right button on ribbon navigation", async () => {
        render( <DXFastAccessMenu {...FastAccessMenuArgs} /> );
        let mockscrollPrev = jest.fn();
        const arrowRightButton = screen.getByTestId( "btn-right" );
        arrowRightButton.onclick = mockscrollPrev;
        await userEvent.click( arrowRightButton );

        expect( mockscrollPrev ).toBeCalled();
    } );

    test( "Click on arrow left button on ribbon navigation", async () => {
        render( <DXFastAccessMenu {...FastAccessMenuArgs} /> );
        let mockscrollNext = jest.fn();
        const arrowLeftButton = screen.getByTestId( "btn-left" );
        arrowLeftButton.onclick = mockscrollNext;
        await userEvent.click( arrowLeftButton );

        expect( mockscrollNext ).toBeCalled();
    } );

    test( "Use ArrowRight key to move between items on right direction", async () => {
        render( <DXFastAccessMenu {...FastAccessMenuArgs} /> );
        const firstButton = screen.getByTestId( "btn-0" );
        fireEvent.focus( firstButton );
        fireEvent.keyDown( firstButton, {
            key: "ArrowRight"
        } );
        const secondButton = screen.getByTestId( "btn-1" );
        expect( secondButton ).toHaveClass( "is-focused" );
        expect( firstButton ).not.toHaveClass( "is-focused" );
    } );

    test( "Use ArrowLeft key to move between items on left direction", async () => {
        render( <DXFastAccessMenu {...FastAccessMenuArgs} /> );
        const thirdButton = screen.getByTestId( "btn-2" );
        const secondButton = screen.getByTestId( "btn-1" );
        fireEvent.focus( thirdButton );
        fireEvent.keyDown( thirdButton, {
            key: "ArrowLeft"
        } );
        expect( secondButton ).toHaveClass( "is-focused" );
        expect( thirdButton ).not.toHaveClass( "is-focused" );
    } );

    test( "When the focus is in the last item go to the first item with the ArrowRight key", async () => {
        render( <DXFastAccessMenu {...FastAccessMenuArgs} /> );
        const lastButton = screen.getByTestId( `btn-${FastAccessMenuArgs.items.length}` );
        const firstButton = screen.getByTestId( "btn-0" );
        fireEvent.focus( lastButton );
        fireEvent.keyDown( lastButton, {
            key: "ArrowRight"
        } );

        expect( firstButton ).toHaveClass( "is-focused" );
        expect( lastButton ).not.toHaveClass( "is-focused" );
    } );

    test( "When the focus is in the first item go to the last item with the ArrowLeft key", async () => {
        render( <DXFastAccessMenu {...FastAccessMenuArgs} /> );
        const lastButton = screen.getByTestId( `btn-${FastAccessMenuArgs.items.length}` );
        const firstButton = screen.getByTestId( "btn-0" );
        fireEvent.focus( firstButton );
        fireEvent.keyDown( firstButton, {
            key: "ArrowLeft"
        } );

        expect( lastButton ).toHaveClass( "is-focused" );
        expect( firstButton ).not.toHaveClass( "is-focused" );
    } );

    test( "The focus is in an item and push any key", async () => {
        render( <DXFastAccessMenu {...FastAccessMenuArgs} /> );
        const firstButton = screen.getByTestId( "btn-0" );
        firstButton.focus();
        fireEvent.keyDown( firstButton, {
            key: "ArrowUp"
        } );
        expect( firstButton ).toHaveClass( "is-focused" );
    } );

    test( "When the title have more than 24 characters", () => {
        let props = FastAccessMenuArgs;
        props.title = "The best Fast Access Menu";
        render( <DXFastAccessMenu {...props} /> );
        const title = screen.getByTestId( "header-title" );

        expect( title.innerHTML ).toContain( props.title.substring( 0, 24 ) );
    } );

    test( "If the button custom property does not exist, it defaults to the same CTA link", async () => {
        const spyWindowOpen = jest.spyOn( window, 'open' );
        spyWindowOpen.mockImplementation( jest.fn() );
        let props = {
            title: 'Fast access Menu',
            link: { url: "https://hcl-software.com", label: "Customize Fast Access Menu", target: "_self" },
            items: FastAccessMenuArgs.items
        };
        render( <DXFastAccessMenu {...props} /> );
        const lastButton = screen.getByTestId( `btn-${props.items.length}` );
        await userEvent.click( lastButton );

        expect( lastButton.innerHTML ).toEqual( props.link.label );
        expect( spyWindowOpen ).toBeCalled();
        spyWindowOpen.mockRestore();
    } );

} );

test( "If directional icons change if value is set", () => {
    expect.assertions( 2 );
    render( <DXFastAccessMenu {...FastAccessMenuChangedIconsArgs} /> );

    expect( screen.getByTestId( "btn-right" ).querySelector( "i" ) ).toHaveClass( FastAccessMenuChangedIconsArgs.icons?.next! );
    expect( screen.getByTestId( "btn-left" ).querySelector( "i" ) ).toHaveClass( FastAccessMenuChangedIconsArgs.icons?.prev! );
} );

test( "If header icon changes if parameter is send", () => {
    render( <DXFastAccessMenu {...FastAccessMenuChangedIconsArgs} /> );
    expect( screen.getByTestId( "FAM__headerIcon" ) ).toHaveClass( FastAccessMenuChangedIconsArgs.icons?.header! );
} );
