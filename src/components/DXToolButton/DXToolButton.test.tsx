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
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXToolButton from "./DXToolButton";

test( "If the user does not pass an image it will render the icon button", () => {
    let props = {
        icon: "ci-Calendar",
        label: "Check",
        onClick: function () {}
    };
    const { getByTestId } = render( <DXToolButton {...props} /> );
    const iconBtn = getByTestId( "tool-button-icon" );
    expect( iconBtn ).toBeInTheDocument();
} );

test( "If the user does pass an image it will render it", () => {
    let props = {
        icon: "",
        image: {
            url: "https://images.unsplash.com/photo-1685460939882-da7c7cb6f3ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            altText: "nice-dog"
        },
        label: "Check",
        onClick: function () {}
    };
    const { getByTestId } = render( <DXToolButton {...props} /> );
    const image = getByTestId( "tool-button-image" );
    expect( image ).toBeInTheDocument();
} );

test( "If the user does pass an image with an altText it will add it", () => {
    let props = {
        icon: "",
        image: {
            url: "https://images.unsplash.com/photo-1685460939882-da7c7cb6f3ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            altText: "nice-dog"
        },
        label: "Check",
        onClick: function () {}
    };
    const { getByTestId } = render( <DXToolButton {...props} /> );
    const image = getByTestId( "tool-button-image" ) as HTMLImageElement;
    expect( image.alt ).toMatch( props.image.altText );
} );

test( "If the user does pass an image withoout an altText it will add a default value", () => {
    let props = {
        icon: "",
        image: {
            url: "https://images.unsplash.com/photo-1685460939882-da7c7cb6f3ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        },
        label: "Check",
        onClick: function () {}
    };
    const { getByTestId } = render( <DXToolButton {...props} /> );
    const image = getByTestId( "tool-button-image" ) as HTMLImageElement;
    expect( image.alt ).toMatch( props.label + " image" );
} );

test( "If the user pass an icon and an image, the last one will be rendered", () => {
    let props = {
        icon: "ci-Calendar",
        image: {
            url: "https://images.unsplash.com/photo-1685460939882-da7c7cb6f3ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            altText: "nice-dog"
        },
        label: "Check",
        onClick: function () {}
    };
    const { getByTestId } = render( <DXToolButton {...props} /> );
    const image = getByTestId( "tool-button-image" );
    expect( image ).toBeInTheDocument();
} );

test( "If the showLabel is passed, it will render it", () => {
    let props = {
        icon: "ci-Calendar",
        image: {
            url: "https://images.unsplash.com/photo-1685460939882-da7c7cb6f3ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            altText: "nice-dog"
        },
        label: "Check",
        showLabel: true,
        onClick: function () {}
    };
    const { getByTestId } = render( <DXToolButton {...props} /> );
    const label = getByTestId( "tool-button-label" );
    expect( label ).toBeInTheDocument();
} );

test( "If the user clicks on the icon button, the function passed will be called", async () => {
    let mock = jest.fn();
    let props = {
        icon: "ci-Calendar",
        label: "Check",
        onClick: mock
    };
    const { getByTestId } = render( <DXToolButton {...props} /> );
    const iconBtn = getByTestId( "tool-button-icon" );
    await userEvent.click( iconBtn );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus on the icon button and press the Enter key, the function passed will be called", () => {
    let mock = jest.fn();
    let props = {
        icon: "ci-Calendar",
        label: "Check",
        onClick: mock
    };
    const { getByTestId } = render( <DXToolButton {...props} /> );
    const iconBtn = getByTestId( "tool-button-icon" );
    iconBtn.focus();
    fireEvent.keyDown( iconBtn, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus on the icon button and press the Space key, the function passed will be called", () => {
    let mock = jest.fn();
    let props = {
        icon: "ci-Calendar",
        label: "Check",
        onClick: mock
    };
    const { getByTestId } = render( <DXToolButton {...props} /> );
    const iconBtn = getByTestId( "tool-button-icon" );
    iconBtn.focus();
    fireEvent.keyDown( iconBtn, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus on the icon button and press the Escape key, the function passed will not be called", () => {
    let mock = jest.fn();
    let props = {
        icon: "ci-Calendar",
        label: "Check",
        onClick: mock
    };
    const { getByTestId } = render( <DXToolButton {...props} /> );
    const iconBtn = getByTestId( "tool-button-icon" );
    iconBtn.focus();
    fireEvent.keyDown( iconBtn, {
        key: "Escape",
        code: "Escape",
        keyCode: 23,
        charCode: 23,
    } );
    expect( mock ).not.toHaveBeenCalled();
} );

test( "If the user clicks on the image button, the function passed will be called", async () => {
    let mock = jest.fn();
    let props = {
        icon: "ci-Calendar",
        image: {
            url: "https://images.unsplash.com/photo-1685460939882-da7c7cb6f3ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            altText: "nice-dog"
        },
        label: "Check",
        onClick: mock
    };
    const { getByTestId } = render( <DXToolButton {...props} /> );
    const imageBtn = getByTestId( "tool-button-image" );
    await userEvent.click( imageBtn );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus on the icon button and press the Enter key, the function passed will be called", () => {
    let mock = jest.fn();
    let props = {
        icon: "ci-Calendar",
        image: {
            url: "https://images.unsplash.com/photo-1685460939882-da7c7cb6f3ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            altText: "nice-dog"
        },
        label: "Check",
        onClick: mock
    };
    const { getByTestId } = render( <DXToolButton {...props} /> );
    const imageBtn = getByTestId( "tool-button-image" );
    imageBtn.focus();
    fireEvent.keyDown( imageBtn, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus on the icon button and press the Space key, the function passed will be called", () => {
    let mock = jest.fn();
    let props = {
        icon: "ci-Calendar",
        image: {
            url: "https://images.unsplash.com/photo-1685460939882-da7c7cb6f3ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            altText: "nice-dog"
        },
        label: "Check",
        onClick: mock
    };
    const { getByTestId } = render( <DXToolButton {...props} /> );
    const imageBtn = getByTestId( "tool-button-image" );
    imageBtn.focus();
    fireEvent.keyDown( imageBtn, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus on the icon button and press the Escape key, the function passed will not be called", () => {
    let mock = jest.fn();
    let props = {
        icon: "ci-Calendar",
        image: {
            url: "https://images.unsplash.com/photo-1685460939882-da7c7cb6f3ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            altText: "nice-dog"
        },
        label: "Check",
        onClick: mock
    };
    const { getByTestId } = render( <DXToolButton {...props} /> );
    const imageBtn = getByTestId( "tool-button-image" );
    imageBtn.focus();
    fireEvent.keyDown( imageBtn, {
        key: "Escape",
        code: "Escape",
        keyCode: 23,
        charCode: 23,
    } );
    expect( mock ).not.toHaveBeenCalled();
} );

// Tests for the badge
test( "If the user passes the bagde prop for the button the value will be assing to the data-count attribute", () => {
    let props = {
        icon: "ci-Calendar",
        label: "Check",
        onClick: function () {},
        badge: 12
    };
    const { container } = render( <DXToolButton {...props} /> );
    const badge = container.querySelector( ".dxToolButton__badge" ) as HTMLElement;
    expect( badge.dataset["count"] ).toEqual( `${props.badge}` );
} );

test( "If the bagde prop is greater than 99 for the button the value will be '+99'", () => {
    let props = {
        icon: "ci-Calendar",
        label: "Check",
        onClick: function () {},
        badge: 101
    };
    const { container } = render( <DXToolButton {...props} /> );
    const badge = container.querySelector( ".dxToolButton__badge" ) as HTMLElement;
    expect( badge.dataset["count"] ).toEqual( `+99` );
} );

test( "If the user does pass a badge value greater than 0 the span for accesibility will be in the document", () => {
    let props = {
        icon: "ci-Calendar",
        label: "Check",
        onClick: function () {},
        badge: 101
    };
    const { getByTestId } = render( <DXToolButton {...props} /> );
    let span = getByTestId( "tool-button-badge-span" );
    expect( span ).toBeInTheDocument();
    expect( span ).toHaveClass( 'sr-only' );
    expect( span ).toHaveTextContent( props.badge.toString() );
} );

test( "If the user does pass a badge value equal to 0 the badge will be null", () => {
    let props = {
        icon: "ci-Calendar",
        label: "Check",
        onClick: function () {},
        badge: 0
    };
    render( <DXToolButton {...props} /> );
    const badge = document.querySelector( ".dxToolButton__badge" ) as HTMLElement;
    expect( badge ).toBeNull();
} );

test( "If the user does not pass a badge value the badge will be null", () => {
    let props = {
        icon: "ci-Calendar",
        label: "Check",
        onClick: function () {}
    };
    render( <DXToolButton {...props} /> );
    const badge = document.querySelector( ".dxToolButton__badge" ) as HTMLElement;
    expect( badge ).toBeNull();
} );
