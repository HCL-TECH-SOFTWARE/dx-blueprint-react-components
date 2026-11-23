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
import DXButton, { ButtonProps } from "./DXButton";
import { itSupportsExtensionProps } from "../../testUtils/extensionContract";

// Testing that the attributes, will be assign
test( "If the user pass the label prop, that will be the textContent of the button", () => {
    let props = {
        label: "Hello"
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" );
    expect( button?.textContent ).toBe( props.label );
} );

test( "If the user pass the id prop, that will be assign", () => {
    let props = {
        label: "Hello",
        id: "test"
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" );
    expect( button?.getAttribute( "id" ) ).toBe( props.id );
} );

test( "If the user pass the the hideLabel prop, the label should be the value of the aria-label", () => {
    let props = {
        label: "test",
        hideLabel: true
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" );
    expect( button?.getAttribute( "aria-label" ) ).toBe( props.label );
} );

test( "If the user pass the ariaExpanded prop, that will be assign", () => {
    let props = {
        ariaExpanded: true,
        label: "Hello"
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" );
    expect( button?.getAttribute( "aria-expanded" ) ).toBeTruthy();
} );

test( "If the user pass the data-testid prop, that will be assign", () => {
    let props = {
        "data-testid": "test",
        label: "Hello"
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" ) as HTMLElement;
    expect( button?.dataset["testid"] ).toBe( props["data-testid"] );
} );

test( "If the user pass the hidden prop, that will be assign", () => {
    let props = {
        hidden: true,
        label: "Hello"
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" ) as HTMLElement;
    expect( button?.hidden ).toBeTruthy();
} );

test( "If the user pass the disabled prop, that will be assign", () => {
    let props = {
        disabled: true,
        label: "Hello"
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" ) as HTMLButtonElement;
    expect( button?.disabled ).toBeTruthy();
} );

test( "If the user pass the value prop, that will be assign", () => {
    let props = {
        value: "test",
        label: "Hello"
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" );
    expect( button?.getAttribute( "value" ) ).toBe( props.value );
} );

test( "If the user pass the style prop, that will be assign", () => {
    let props = {
        style: { borderColor: "red" },
        label: "Hello"
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" );
    expect( button ).toHaveStyle( props.style );
} );

test( "If the user does not pass the type prop, the value default will be button", () => {
    const { container } = render( <DXButton label="Hello" /> );
    let button = container.querySelector( ".dxButton" );
    expect( button?.getAttribute( "type" ) ).toBe( "button" );
} );

test( "If the user pass the type prop as submit, that will be assign", () => {
    let props: ButtonProps = {
        type: "submit",
        label: "Hello"
    };

    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" );
    expect( button?.getAttribute( "type" ) ).toBe( props.type );
} );

test( "If the user pass the type prop as reset, that will be assign", () => {
    let props: ButtonProps = {
        type: "reset",
        label: "Hello"
    };

    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" );
    expect( button?.getAttribute( "type" ) ).toBe( props.type );
} );

test( "If the user pass the type prop as button, that will be assign", () => {
    let props: ButtonProps = {
        type: "button",
        label: "Hello"
    };

    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" );
    expect( button?.getAttribute( "type" ) ).toBe( props.type );
} );

test( "If the user pass the className prop, that class will be assigned to the button", () => {
    let props: ButtonProps = {
        label: "test",
        className: "myCustomClass"
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" ) as HTMLButtonElement;
    expect( button ).toHaveClass( `dxButton` );
    expect( button ).toHaveClass( `${props.className}` );
} );

// Test the fn prop
test( "If the user pass the onClick prop and clicks on the button, that function will be called", async () => {
    let mock = jest.fn();
    let props = {
        onClick: mock,
        label: "Hello"
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" ) as HTMLButtonElement;
    await userEvent.click( button );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user pass the onClick prop, focus the button and press the Enter key, that function will be called", () => {
    let mock = jest.fn();
    let props = {
        onClick: mock,
        label: "Hello"
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" ) as HTMLButtonElement;
    button.focus();
    fireEvent.keyDown( button, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user pass the onClick prop, focus the button and press the Space key, that function will be called", () => {
    let mock = jest.fn();
    let props = {
        onClick: mock,
        label: "Hello"
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" ) as HTMLButtonElement;
    button.focus();
    fireEvent.keyDown( button, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user pass the onClick prop, focus the button and press the Enter key, that function will not be called", () => {
    let mock = jest.fn();
    let props = {
        onClick: mock,
        label: "Hello"
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" ) as HTMLButtonElement;
    button.focus();
    fireEvent.keyDown( button, {
        key: "Escape",
        code: "Escape",
        keyCode: 23,
        charCode: 23,
    } );
    expect( mock ).not.toHaveBeenCalled();
} );

// Test the icon prop
test( "If the user pass the icon, the i tag should be in the document", () => {
    let props = {
        label: "Test",
        icon: {
            class: "ci-plus"
        }
    };
    const { container } = render( <DXButton {...props} /> );
    let icon = container.querySelector( ".dxButton i" );
    expect( icon ).toBeInTheDocument();
} );

test( "If the user pass the icon with position right, the i tag should be after the label", () => {
    let props: ButtonProps = {
        label: "Test",
        icon: {
            class: "ci-plus",
            position: "right"
        }
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" );
    let icon = button?.childNodes[1] as HTMLElement;
    expect( icon.tagName ).toBe( "I" );
} );

test( "If the user pass the icon with position left, the i tag should be before the label", () => {
    let props: ButtonProps = {
        label: "Test",
        icon: {
            class: "ci-plus",
            position: "left"
        }
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" );
    let icon = button?.childNodes[0] as HTMLElement;
    expect( icon.tagName ).toBe( "I" );
} );

//Tests for the displayTypes
test( "If the user does not pass any displayType, the button will have the class 'btn-primary'", () => {
    let props = {
        label: "Test",
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" );
    expect( button ).toHaveClass( "btn-primary" );
} );

test( "If the user pass displayType as primary, the button will have the class 'btn-primary'", () => {
    let props: ButtonProps = {
        label: "Test",
        displayType: "primary"
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" );
    expect( button ).toHaveClass( "btn-primary" );
} );

test( "If the user pass displayType as secondary, the button will have the class 'btn-secondary'", () => {
    let props: ButtonProps = {
        label: "Test",
        displayType: "secondary"
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" );
    expect( button ).toHaveClass( "btn-secondary" );
} );

test( "If the user pass displayType as unstyled, the button will have the class 'btn-unstyled'", () => {
    let props: ButtonProps = {
        label: "Test",
        displayType: "unstyled"
    };
    const { container } = render( <DXButton {...props} /> );
    let button = container.querySelector( ".dxButton" );
    expect( button ).toHaveClass( "btn-unstyled" );
} );

itSupportsExtensionProps( ( extra ) => <DXButton label="Click me" {...extra} /> );

test( "a consumer aria-label is kept when the label is visible", () => {
    const { container } = render( <DXButton label="Save" aria-label="Save the document" /> );
    expect( container.querySelector( ".dxButton" )?.getAttribute( "aria-label" ) ).toBe( "Save the document" );
} );

test( "the label wins as aria-label when it is hidden", () => {
    const { container } = render( <DXButton label="Save" hideLabel aria-label="ignored" /> );
    expect( container.querySelector( ".dxButton" )?.getAttribute( "aria-label" ) ).toBe( "Save" );
} );

test( "a consumer onKeyDown runs first and can stop the component's own keyboard handling", () => {
    const onClick = jest.fn();
    const onKeyDown = jest.fn( ( e: React.KeyboardEvent ) => e.preventDefault() );
    const { container } = render( <DXButton label="Save" onClick={onClick} onKeyDown={onKeyDown} /> );
    fireEvent.keyDown( container.querySelector( ".dxButton" ) as Element, { key: "Enter", keyCode: 13 } );
    expect( onKeyDown ).toHaveBeenCalledTimes( 1 );
    expect( onClick ).not.toHaveBeenCalled();
} );

test( "the component's own keyboard handling still runs when the consumer's onKeyDown does not prevent it", () => {
    const onClick = jest.fn();
    const onKeyDown = jest.fn();
    const { container } = render( <DXButton label="Save" onClick={onClick} onKeyDown={onKeyDown} /> );
    fireEvent.keyDown( container.querySelector( ".dxButton" ) as Element, { key: "Enter", keyCode: 13 } );
    expect( onKeyDown ).toHaveBeenCalledTimes( 1 );
    expect( onClick ).toHaveBeenCalledTimes( 1 );
} );

describe( "DXButton keyboard activation with a consumer onKeyDown", () => {
    // user-event 14 does not set the deprecated keyCode, which this component reads and real browsers still send,
    // so focus comes from user-event and the key press is dispatched with the browser's key, code and keyCode
    const browserKeys = [
        ["Enter", { key: "Enter", code: "Enter", keyCode: 13 }],
        ["Space", { key: " ", code: "Space", keyCode: 32 }],
    ] as Array<[string, { key: string; code: string; keyCode: number; }]>;

    test.each( browserKeys )( "%s on the focused button still activates it once after a consumer onKeyDown that does not prevent the default", async ( _name, keyInit ) => {
        const onClick = jest.fn();
        const onKeyDown = jest.fn();
        render( <DXButton label="Save" onClick={onClick} onKeyDown={onKeyDown} /> );
        await userEvent.tab();
        const button = document.activeElement as HTMLElement;
        expect( button ).toHaveClass( "dxButton" );
        const notCancelled = fireEvent.keyDown( button, keyInit );
        expect( onKeyDown ).toHaveBeenCalledTimes( 1 );
        expect( onClick ).toHaveBeenCalledTimes( 1 );
        // The component prevents the default, so the browser does not also fire a click for the same key press
        expect( notCancelled ).toBe( false );
    } );
} );
