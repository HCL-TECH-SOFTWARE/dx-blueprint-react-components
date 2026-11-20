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
import { itSupportsExtensionProps } from "../../testUtils/extensionContract";
import '@testing-library/jest-dom';
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXCardButton from "./DXCardButton";
import { cardButtonArgs } from "./DXCardButton.stories";

test( "If the user does not pass the asRegularCard prop, the element 'dxCardBtn' will be in the document", () => {
    const { container } = render( <DXCardButton {...cardButtonArgs} /> );
    let component = container.querySelector( ".dxCardBtn" );
    expect( component ).toBeInTheDocument();
} );

// Test for the container classes
test( "If the user does not pass the direction prop to the card button, the container will have the class 'dxCardBtn__container'", () => {
    const { getByTestId } = render( <DXCardButton {...cardButtonArgs} /> );
    let componentContainer = getByTestId( "card-button-container" );
    expect( componentContainer ).toHaveClass( "dxCardBtn__container" );
} );

test( "If the user does pass the direction as left to the card button, the container will have the class 'dxCardBtn__container'", () => {
    const { getByTestId } = render( <DXCardButton {...cardButtonArgs} direction="left" /> );
    let componentContainer = getByTestId( "card-button-container" );
    expect( componentContainer ).toHaveClass( "dxCardBtn__container" );
} );

test( "If the user does pass the direction as right to the card button, the container will have the class 'dxCardBtn__container--reversed'", () => {
    const { getByTestId } = render( <DXCardButton {...cardButtonArgs} direction="right" /> );
    let componentContainer = getByTestId( "card-button-container" );
    expect( componentContainer ).toHaveClass( "dxCardBtn__container--reversed" );
} );

test( "If no body is passed to the component, the element should be null", () => {
    const { container } = render( <DXCardButton {...cardButtonArgs} /> );
    const bodyEl = container.querySelector( '[data-testid="home-button-body"]' );
    expect( bodyEl ).toBeNull();
} );

test( "If a body is passed to the component, the element should be in the document", () => {
    let props = {
        ...cardButtonArgs,
        body: "This is the body"
    };
    const { container } = render( <DXCardButton {...props} /> );
    const bodyEl = container.querySelector( '[data-testid="card-button-body"]' );
    expect( bodyEl ).toBeInTheDocument();
} );

test( "If no body is passed, the element 'dxCardBtn__text' should have the class 'dxCardBtn__text--fill'", () => {
    const { container } = render( <DXCardButton {...cardButtonArgs} /> );
    const el = container.querySelector( '.dxCardBtn__text' );
    expect( el ).toHaveClass( "dxCardBtn__text--fill" );
} );

test( "If a body is passed to the component, the element 'dxCardBtn__text' should not have the class 'dxCardBtn__text--fill'", () => {
    let props = {
        ...cardButtonArgs,
        body: "This is the body"
    };
    const { container } = render( <DXCardButton {...props} /> );
    const el = container.querySelector( '.dxCardBtn__text' );
    expect( el ).not.toHaveClass( "dxCardBtn__text--fill" );
} );

test( "If no image is passed, a message 'No image received' will appear", () => {
    let props = { ...cardButtonArgs };
    //@ts-ignore: Ignoring the alert of deleting a required for tests purposes
    delete props.img;
    const { getByText } = render( <DXCardButton {...props} /> );
    expect( document.querySelector( ".dxCardBtn__img" ) ).toBeNull();
} );

test( "If no altText is passed on the img prop, the role of presentation will be added to the image", () => {
    let props = {
        ...cardButtonArgs,
        img: {
            url: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        }
    };
    const { getByRole } = render( <DXCardButton {...props} /> );
    const img = getByRole( "presentation" );
    expect( img.tagName ).toEqual( "IMG" );
} );

test( "If an image is received, it will be in the document", () => {
    const { getByTestId } = render( <DXCardButton {...cardButtonArgs} /> );
    expect( getByTestId( "card-button-image" ) ).toBeInTheDocument();
} );

test( "If the user clicks on the component, the window.open function will be triggered", async () => {
    const spyWindowOpen = jest.spyOn( window, 'open' );
    spyWindowOpen.mockImplementation( jest.fn() );

    let props = {
        ...cardButtonArgs,
        body: "This is the body"
    };
    const { container } = render( <DXCardButton {...props} /> );
    const component = container.querySelector( '.dxCardBtn' );
    //@ts-ignore: Ignoring the alert of deleting a required prop for tests purposes
    await userEvent.click( component );
    expect( spyWindowOpen ).toHaveBeenCalledTimes( 1 );
    spyWindowOpen.mockRestore();
} );

test( "If no link passed, the window.open function will be called 0 times", async () => {
    const spyWindowOpen = jest.spyOn( window, 'open' );
    spyWindowOpen.mockImplementation( jest.fn() );

    let props = {
        ...cardButtonArgs,
        body: "This is the body"
    };
    //@ts-ignore: Ignoring the alert of deleting a required prop for tests purposes
    delete props.link;
    const { container } = render( <DXCardButton {...props} /> );
    const component = container.querySelector( '.dxCardBtn' );
    //@ts-ignore: Ignoring the alert of deleting a required for tests purposes
    await userEvent.click( component );
    expect( spyWindowOpen ).toHaveBeenCalledTimes( 0 );
    spyWindowOpen.mockRestore();
} );

// Tests for the CTA
test( "If the user does not pass the ctaLabel prop, the element will be null", () => {
    const { container } = render( <DXCardButton {...cardButtonArgs} /> );
    const cta = container.querySelector( '[data-testid="card-button-cta"]' );
    expect( cta ).toBeNull();
} );

test( "If the user does pass the ctaLabel prop, the element will be in the document", () => {
    let props = {
        ...cardButtonArgs,
        cta: {
            label: "Test"
        }
    };
    const { getByTestId } = render( <DXCardButton {...props} /> );
    const cta = getByTestId( "card-button-cta" );
    expect( cta ).toBeInTheDocument();
} );

test( "If the user does pass the ctaLabel prop with no justify, the element will have the class 'dxCardBtn__text--cta'", () => {
    let props = {
        ...cardButtonArgs,
        cta: {
            label: "Test"
        }
    };
    const { getByTestId } = render( <DXCardButton {...props} /> );
    const cta = getByTestId( "card-button-cta" );
    expect( cta ).toHaveClass( "dxCardBtn__text--cta" );
} );

test( "If the user does pass the ctaLabel prop with justify left, the element will have the class 'dxCardBtn__text--cta'", () => {
    let props = {
        ...cardButtonArgs,
        cta: {
            label: "Test",
            justify: "left" as ( "left" )
        }
    };
    const { getByTestId } = render( <DXCardButton {...props} /> );
    const cta = getByTestId( "card-button-cta" );
    expect( cta ).toHaveClass( "dxCardBtn__text--cta" );
} );

test( "If the user does pass the ctaLabel prop with justify right, the element will have the class 'dxCardBtn__text--cta'", () => {
    let props = {
        ...cardButtonArgs,
        cta: {
            label: "Test",
            justify: "right" as ( "right" )
        }
    };
    const { getByTestId } = render( <DXCardButton {...props} /> );
    const cta = getByTestId( "card-button-cta" );
    expect( cta ).toHaveClass( "dxCardBtn__text--cta dxCardBtn__text--right" );
} );

test( "If the user does pass the ctaLabel prop with justify center, the element will have the class 'dxCardBtn__text--cta'", () => {
    let props = {
        ...cardButtonArgs,
        cta: {
            label: "Test",
            justify: "center" as ( "center" )
        }
    };
    const { getByTestId } = render( <DXCardButton {...props} /> );
    const cta = getByTestId( "card-button-cta" );
    expect( cta ).toHaveClass( "dxCardBtn__text--cta dxCardBtn__text--center" );
} );

test( "If the user does not pass an icon for the ctaLabel, the element will have just one child", () => {
    let props = {
        ...cardButtonArgs,
        cta: {
            label: "Test"
        }
    };
    const { getByTestId } = render( <DXCardButton {...props} /> );
    const cta = getByTestId( "card-button-cta" );
    expect( cta.childNodes ).toHaveLength( 1 );
} );

test( "If the user does pass an icon for the ctaLabel, the element's first child will be an icon", () => {
    let props = {
        ...cardButtonArgs,
        cta: {
            label: "Test",
            icon: {
                class: "ci_Printer"
            }
        }
    };
    const { getByTestId } = render( <DXCardButton {...props} /> );
    const cta = getByTestId( "card-button-cta" );
    let icon = cta.childNodes[0] as HTMLElement;
    expect( icon.tagName ).toBe( "I" );
} );

test( "If the user does pass an icon for the ctaLabel with no position, the element's first child will be an icon", () => {
    let props = {
        ...cardButtonArgs,
        cta: {
            label: "Test",
            icon: {
                class: "ci_Printer"
            }
        }
    };
    const { getByTestId } = render( <DXCardButton {...props} /> );
    const cta = getByTestId( "card-button-cta" );
    let icon = cta.childNodes[0] as HTMLElement;
    expect( icon.tagName ).toBe( "I" );
} );

test( "If the user does pass an icon for the ctaLabel with position left, the element's first child will be an icon", () => {
    let props = {
        ...cardButtonArgs,
        cta: {
            label: "Test",
            icon: {
                class: "ci_Printer",
                position: "left" as "left"
            }
        }
    };
    const { getByTestId } = render( <DXCardButton {...props} /> );
    const cta = getByTestId( "card-button-cta" );
    let icon = cta.childNodes[0] as HTMLElement;
    expect( icon.tagName ).toBe( "I" );
} );

test( "If the user does pass an icon for the ctaLabel with position right, the element's last child will be an icon", () => {
    let props = {
        ...cardButtonArgs,
        cta: {
            label: "Test",
            icon: {
                class: "ci_Printer",
                position: "right" as "right"
            }
        }
    };
    const { getByTestId } = render( <DXCardButton {...props} /> );
    const cta = getByTestId( "card-button-cta" );
    let icon = cta.childNodes[cta.childNodes.length - 1] as HTMLElement;
    expect( icon.tagName ).toBe( "I" );
} );

// Tests for the loader
test( "When the image is rendering, the element 'loader__container' should not have the class 'd-none'", () => {
    const { container } = render( <DXCardButton {...cardButtonArgs} /> );
    let loaderContainer = container.querySelector( ".loader__container" );
    expect( loaderContainer ).not.toHaveClass( "d-none" );
} );

test( "When the image finish its rendering, the element 'loader__container' should have the class 'd-none'", () => {
    const { container } = render( <DXCardButton {...cardButtonArgs} /> );
    let cover = container.querySelector( ".dxCardBtn__img" ) as HTMLElement;
    fireEvent.load( cover );
    let loaderContainer = container.querySelector( ".loader__container" );
    expect( loaderContainer ).toHaveClass( "d-none" );
} );

itSupportsExtensionProps( ( extra ) => <DXCardButton {...cardButtonArgs} {...extra} /> );

test( "a consumer onClick runs first and can stop the redirect with preventDefault", async () => {
    const open = jest.spyOn( window, "open" ).mockImplementation( () => null );
    const consumer = jest.fn( ( e: React.MouseEvent ) => e.preventDefault() );
    const { container } = render( <DXCardButton {...cardButtonArgs} onClick={consumer} /> );
    await userEvent.click( container.querySelector( ".dxCardBtn" ) as HTMLElement );
    expect( consumer ).toHaveBeenCalledTimes( 1 );
    expect( open ).not.toHaveBeenCalled();
    open.mockRestore();
} );

test( "a consumer onClick that does not prevent the default still lets the redirect run", async () => {
    const open = jest.spyOn( window, "open" ).mockImplementation( () => null );
    const consumer = jest.fn();
    const { container } = render( <DXCardButton {...cardButtonArgs} onClick={consumer} /> );
    await userEvent.click( container.querySelector( ".dxCardBtn" ) as HTMLElement );
    expect( consumer ).toHaveBeenCalledTimes( 1 );
    expect( open ).toHaveBeenCalledTimes( 1 );
    open.mockRestore();
} );
