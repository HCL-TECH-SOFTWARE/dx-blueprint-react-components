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

import React from 'react';
import { itSupportsExtensionProps } from "../../testUtils/extensionContract";
import DXMicrositeNavigation, { MicrositeProps } from "./DXMicrositeNavigation";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { render, fireEvent } from "@testing-library/react";

let mockFunction = jest.fn( e => e.preventDefault() );
const HOUR_IN_MS = 60 * 60 * 1000;
let startTime = new Date( Date.now() + HOUR_IN_MS ).toISOString();
let endTime = new Date( Date.now() + 2 * HOUR_IN_MS ).toISOString();

const MicrositeNavigationArgs: MicrositeProps = {
    sliderMenu: {
        menuTitle: "My Feed",
        openButtonLabel: "Open",
        moreLink: {
            label: "",
            url: "https://hcl-software.com/",
            target: "_blank"
        },
        nextMeeting: {
            title: "My Feed",
            startDateTime: startTime,
            endDateTime: endTime,
            link: {
                label: "",
                url: "https://hcl-software.com/",
                target: "_blank"
            },
        },
    },
    navigation: {
        searchSubmit: mockFunction,
        image: {
            url: "https://images.unsplash.com/photo-1661705969607-cde73828023d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
            altText: "Waves",
        },
        closePlaceholder: "Close Test",
        searchPlaceholder: "Search",
        footerButton: {
            header: "Chat with us!",
            img: {
                url: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
                altText: "chatWithUs",
            },
            link: "https://en.wikipedia.org/wiki/Chatbot"
        },
        links: {
            items: [
                {
                    label: "Home",
                    url: "https://hcl-software.com/",
                },
                {
                    label: "Page 1",
                    url: "/page-1",
                    items: [
                        {
                            label: "Page 1.1",
                            url: "https://www.hcl-software.com/products"
                        },
                        {
                            label: "Page 1.2",
                            url: "https://www.hcl-software.com/about/",
                        },
                        {
                            label: "Page 1.2",
                            url: "/page-12"
                        }
                    ]
                },
                {
                    label: "Page 2",
                    url: "/page-2"
                },
                {
                    label: "Page 3",
                    url: "/page-3"
                },
                {
                    label: "Page 4",
                    url: "/page-4"
                },
            ]
        }
    },
};

//Test rendering
test( "When sending props, DXMicrositeNavigation should be rendered", () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const microsite = getByTestId( "microsite" );
    expect( microsite ).toBeInTheDocument();
} );

test( "If a closePlaceholder value is passed, 'microsite-navigation-close-button' element should change", () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const closeButton = getByTestId( "microsite-navigation-close-button" );
    expect( closeButton.textContent ).toEqual( MicrositeNavigationArgs.navigation.closePlaceholder );
} );

test( "If a closePlaceholder value is not passed, 'microsite-navigation-close-button' element should have 'Close' text", () => {
    MicrositeNavigationArgs.navigation.closePlaceholder = "";
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const closeButton = getByTestId( "microsite-navigation-close-button" );
    expect( closeButton.textContent ).toEqual( "Close" );
} );

test( "If a searchPlaceholder value is passed, 'searchInput' element should have new placeholder ", () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const searchInput = getByTestId( "searchInput" ) as HTMLInputElement;
    expect( searchInput.placeholder ).toEqual( MicrositeNavigationArgs.navigation.searchPlaceholder );
} );

test( "If a searchPlaceholder value is not passed, 'searchInput' element should have 'Search this site' text as placeholder", () => {
    MicrositeNavigationArgs.navigation.searchPlaceholder = "";

    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const searchInput = getByTestId( "searchInput" ) as HTMLInputElement;
    expect( searchInput.placeholder ).toEqual( "Search this site" );
} );

test( "If a openButtonLabel value is passed, 'microsite-slider-button' text should change", () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const openButton = getByTestId( "microsite-slider-button" ) as HTMLInputElement;;
    expect( openButton.textContent ).toEqual( MicrositeNavigationArgs.sliderMenu.openButtonLabel );
} );

test( "If a openButtonLabel value is not passed, 'microsite-slider-button' text should be 'Open' ", () => {
    MicrositeNavigationArgs.sliderMenu.openButtonLabel = "";

    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const openButton = getByTestId( "microsite-slider-button" ) as HTMLInputElement;
    expect( openButton.textContent ).toEqual( "Open" );
} );

test( "If a menuTitle value is passed, 'microsite-slider-title' text should change", () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const title = getByTestId( "microsite-slider-title" ) as HTMLInputElement;;
    expect( title.textContent ).toEqual( MicrositeNavigationArgs.sliderMenu.menuTitle );
} );

test( "If a menuTitle value is not passed, 'microsite-slider-title' text should be 'Open' ", () => {
    MicrositeNavigationArgs.sliderMenu.menuTitle = "";

    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const title = getByTestId( "microsite-slider-title" ) as HTMLInputElement;
    expect( title.textContent ).toEqual( "" );
} );

test( "When sending nextMeeting object, 'microsite-next-meeting' element should be in DOM", () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const nextMeeting = getByTestId( "microsite-next-meeting" );
    expect( nextMeeting ).toBeInTheDocument();
} );

test( "When sending not  nextMeeting object, 'dxMyNextMeeting' element should not be in DOM", () => {
    delete MicrositeNavigationArgs.sliderMenu.nextMeeting;

    render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const nextMeeting = document.querySelectorAll( '.dxMyNextMeeting' );
    expect( nextMeeting ).toHaveLength( 0 );

} );

test( "When sending image object, 'microsite-nav-img' element should be in DOM", () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const navImage = getByTestId( "microsite-nav-img" );
    expect( navImage ).toBeInTheDocument();
} );

test( "When not sending image object, '.dxMicrositeNavigation__img' element should not be in DOM", () => {

    delete MicrositeNavigationArgs.navigation.image;

    render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const navImage = document.querySelectorAll( '.dxMicrositeNavigation__img' );
    expect( navImage ).toHaveLength( 0 );
} );

//Testing Slider Open Button
test( "When clicking 'microsite-slider-button', 'microsite-navigation' should be in the document", async () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const openButton = getByTestId( "microsite-slider-button" );
    await userEvent.click( openButton );
    const micrositeNavigation = getByTestId( 'microsite-navigation' );
    expect( micrositeNavigation ).toBeInTheDocument();
} );

test( "When clicking 'microsite-slider-button', 'dxMicrositeNavigation--display-enabled' class should be added from 'microsite-navigation'", async () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const openButton = getByTestId( "microsite-slider-button" );
    await userEvent.click( openButton );
    const micrositeNavigation = getByTestId( 'microsite-navigation' );
    expect( micrositeNavigation ).toHaveClass( 'dxMicrositeNavigation--display-enabled' );
} );


test( "If the 'microsite-slider-button' element is focused and the user press the Enter key, 'microsite-navigation' should be in the document", async () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const openButton = getByTestId( "microsite-slider-button" );
    await openButton.focus();
    fireEvent.keyDown( openButton, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    const micrositeNavigation = getByTestId( 'microsite-navigation' );
    expect( micrositeNavigation ).toHaveClass( 'dxMicrositeNavigation--display-enabled' );
} );

test( "If the 'microsite-slider-button' element is focused and the user press the Space key, 'microsite-navigation' should be in the document", async () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const openButton = getByTestId( "microsite-slider-button" );
    await openButton.focus();
    fireEvent.keyDown( openButton, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    const micrositeNavigation = getByTestId( 'microsite-navigation' );
    expect( micrositeNavigation ).toHaveClass( 'dxMicrositeNavigation--display-enabled' );
} );

test( "If the 'microsite-slider-button' element is focused and the user press the Escape key, 'microsite-navigation' should not be in the document", async () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const openButton = getByTestId( "microsite-slider-button" );
    await openButton.focus();
    fireEvent.keyDown( openButton, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    const micrositeNavigation = getByTestId( 'microsite-navigation' );
    expect( micrositeNavigation ).not.toHaveClass( 'dxMicrositeNavigation--display-enabled' );
} );

//Testing Navigation Close Button
test( "When clicking 'microsite-navigation-close-button', 'dxMicrositeNavigation--display-enabled' class should be removed from 'microsite-navigation'", async () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const openButton = getByTestId( "microsite-slider-button" );
    await userEvent.click( openButton );
    const closeButton = getByTestId( "microsite-navigation-close-button" );
    const micrositeNavigation = getByTestId( 'microsite-navigation' );
    await userEvent.click( closeButton );
    expect( micrositeNavigation ).not.toHaveClass( 'dxMicrositeNavigation--display-enabled' );
} );

test( "If the 'microsite-navigation-close-button' element is focused and the user press the Enter key, 'dxMicrositeNavigation--display-enabled' class should be removed from 'microsite-navigation'", async () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const openButton = getByTestId( "microsite-slider-button" );
    await userEvent.click( openButton );
    const closeButton = getByTestId( "microsite-navigation-close-button" ) as HTMLElement;
    await closeButton.focus();
    fireEvent.keyDown( closeButton, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    const micrositeNavigation = getByTestId( 'microsite-navigation' );
    expect( micrositeNavigation ).not.toHaveClass( 'dxMicrositeNavigation--display-enabled' );

} );

test( "If the 'microsite-navigation-close-button' element is focused and the user press the Space key, 'dxMicrositeNavigation--display-enabled' class should be removed from 'microsite-navigation'", async () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const openButton = getByTestId( "microsite-slider-button" );
    await userEvent.click( openButton );
    const closeButton = getByTestId( "microsite-navigation-close-button" ) as HTMLElement;
    await closeButton.focus();
    fireEvent.keyDown( closeButton, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    const micrositeNavigation = getByTestId( 'microsite-navigation' );
    expect( micrositeNavigation ).not.toHaveClass( 'dxMicrositeNavigation--display-enabled' );

} );

test( "If the 'microsite-navigation-close-button' element is focused and the user press the Escape key, 'dxMicrositeNavigation--display-enabled' class should not be removed from 'microsite-navigation'", async () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const openButton = getByTestId( "microsite-slider-button" );
    await userEvent.click( openButton );
    const closeButton = getByTestId( "microsite-navigation-close-button" ) as HTMLElement;
    await closeButton.focus();
    fireEvent.keyDown( closeButton, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    const micrositeNavigation = getByTestId( 'microsite-navigation' );
    expect( micrositeNavigation ).toHaveClass( 'dxMicrositeNavigation--display-enabled' );

} );

test( "If an url is configured on the 'microsite-slider-more-link', the url should be added as a href attribute", () => {

    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const link = getByTestId( "microsite-slider-more-link" ) as HTMLAnchorElement;
    expect( link.href ).toBe( MicrositeNavigationArgs.sliderMenu.moreLink.url );
} );

test( "If an url is not configured on the 'microsite-slider-more-link', the # should be added as a href attribute", () => {

    MicrositeNavigationArgs.sliderMenu.moreLink.url = "";
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const link = getByTestId( "microsite-slider-more-link" ) as HTMLAnchorElement;
    expect( link.href ).toContain( "#" );
} );

test( "If an url is configured on the 'MNM__link', the url should be added as a href attribute", () => {
    const nextMeeting = {
        title: "My Feed",
        startDateTime: startTime,
        endDateTime: endTime,
        link: {
            label: "",
            url: "https://hcl-software.com/",
            target: "_blank"
        }
    };
    MicrositeNavigationArgs.sliderMenu.nextMeeting = nextMeeting;

    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const link = getByTestId( "MNM__link" ) as HTMLAnchorElement;
    expect( link.href ).toContain( nextMeeting.link.url );
} );

test( "If an url is not configured on the 'MNM__link', the # should be added as a href attribute", () => {
    const nextMeeting = {
        title: "My Feed",
        startDateTime: startTime,
        endDateTime: endTime,
        link: {
            label: "",
            url: "",
            target: "_blank"
        }
    };
    MicrositeNavigationArgs.sliderMenu.nextMeeting = nextMeeting;

    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const link = getByTestId( "MNM__link" ) as HTMLAnchorElement;
    expect( link.href ).toContain( "#" );
} );

//Testing search submit
test( "If search button is clicked, the searchSubmit function is called", async () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const searchButton = getByTestId( 'searchButton' ) as HTMLElement;;
    await userEvent.click( searchButton );
    expect( MicrositeNavigationArgs.navigation.searchSubmit ).toBeCalled();
} );

test( "If search button is focused and the user press the Enter key, the searchSubmit function is called", async () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const searchButton = getByTestId( "searchButton" ) as HTMLElement;
    await searchButton.focus();
    fireEvent.keyDown( searchButton, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );

    expect( MicrositeNavigationArgs.navigation.searchSubmit ).toBeCalled();
} );

test( "If search button is focused and the user press the Space key, the searchSubmit function is called", async () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const searchButton = getByTestId( "searchButton" ) as HTMLElement;
    await searchButton.focus();
    fireEvent.keyDown( searchButton, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );

    expect( MicrositeNavigationArgs.navigation.searchSubmit ).toBeCalled();
} );

test( "If search button is focused and the user press the Backspace key, the searchSubmit function is not called", () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const searchButton = getByTestId( "searchButton" ) as HTMLElement;
    searchButton.focus();
    fireEvent.keyDown( searchButton, {
        key: "Backspace",
        code: "Backspace",
        keyCode: 8,
        charCode: 8,
    } );

    expect( MicrositeNavigationArgs.navigation.searchSubmit ).toBeCalled();
} );

test( "If search input is focused and the user press the Enter key, the searchSubmit function is called", async () => {
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} /> );
    const searchButton = getByTestId( "searchInput" ) as HTMLElement;
    await searchButton.focus();
    fireEvent.keyDown( searchButton, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );

    expect( MicrositeNavigationArgs.navigation.searchSubmit ).toBeCalled();
} );


test( "If icons change if parameters are set", () => {
    let icons = {
        open: "ci-Caret_Down",
        close: "ci-Close_LG",
        more: "ci-Hamburger_LG",
        search: "ci-Note_Search"
    };
    const { getByTestId } = render( <DXMicrositeNavigation {...MicrositeNavigationArgs} icons={icons} /> );
    const container = getByTestId( "microsite-slider-more-link" ) as HTMLAnchorElement;
    expect( container.querySelector( "i" ) ).toHaveClass( icons.more );
} );

itSupportsExtensionProps( ( extra ) => <DXMicrositeNavigation {...MicrositeNavigationArgs} {...extra} /> );
