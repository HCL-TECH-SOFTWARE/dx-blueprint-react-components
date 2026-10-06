import React from "react";
import '@testing-library/jest-dom';
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXButton, { ButtonProps } from "./DXButton";

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
