import React from 'react';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import DXToggleMenu from "./DXToggleMenu";

const buttons = [
    { label: "CTA Link 1", displayType: "primary" },
    { label: "CTA Link 2" },
    { label: "CTA Link 3" },
    { label: "CTA Link 4", disabled: true },
];

// Testing rendering components
test( "If vertical value is '' then it should not add the class of vertical", () => {
    let toggleMenuProps = {
        buttons
    };
    render( <DXToggleMenu {...toggleMenuProps} /> );
    const toggleMenuRender = screen.getByTestId( 'toggleMenu' );
    expect( toggleMenuRender ).not.toHaveClass( 'btn-group-vertical' );

} );

test( "If vertical value is 'false' then it should not add the class of vertical", () => {
    let toggleMenuProps = {
        buttons,
        vertical: false
    };
    render( <DXToggleMenu {...toggleMenuProps} /> );
    const toggleMenuRender = screen.getByTestId( 'toggleMenu' );
    expect( toggleMenuRender ).not.toHaveClass( 'btn-group-vertical' );

} );

test( "If vertical value is 'true' then it should add the class of vertical", () => {
    let toggleMenuProps = {
        buttons,
        vertical: true
    };
    render( <DXToggleMenu {...toggleMenuProps} /> );
    const toggleMenuRender = screen.getByTestId( 'toggleMenu' );
    expect( toggleMenuRender ).toHaveClass( 'btn-group-vertical' );

} );

test( "If disabled prop is 'true' then it should add 'disabled' attribute", () => {
    let toggleMenuProps = {
        buttons: [{ label: "CTA Link 1", displayType: "primary", disabled: true }],
    };
    const { getByTestId } = render( <DXToggleMenu {...toggleMenuProps} /> );
    const button = getByTestId( "toggleMenuButton" );
    expect( button ).toHaveAttribute( 'disabled' );

} );

test( "If disabled prop is 'false' then it should not add 'disabled' attribute", () => {

    let toggleMenuProps = {
        buttons: [{ label: "CTA Link 1", displayType: "primary", disabled: false }]
    };
    const { getByTestId } = render( <DXToggleMenu {...toggleMenuProps} /> );
    const button = getByTestId( "toggleMenuButton" );
    expect( button ).not.toHaveAttribute( 'disabled' );

} );

test( "If disabled prop is not defined then it should not add 'disabled' attribute", () => {

    let toggleMenuProps = {
        buttons: [{ label: "CTA Link 1", displayType: "primary" }],
    };
    const { getByTestId } = render( <DXToggleMenu {...toggleMenuProps} /> );
    const button = getByTestId( "toggleMenuButton" );
    expect( button ).not.toHaveAttribute( 'disabled' );

} );

// Testing toggle function
test( "When clicking on deactivated button, activate it", async () => {
    const toggleType = "multi" as const;
    let toggleMenuProps = {
        buttons: [{ label: "CTA Link 1" }],
        type: toggleType

    };
    const { getByTestId } = render( <DXToggleMenu {...toggleMenuProps} /> );
    const button = getByTestId( "toggleMenuButton" );
    await userEvent.click( button );
    expect( button ).toHaveClass( 'btn-primary' );

} );


test( "Single select toggle -> When clicking on an active button, it keeps activated", async () => {
    const toggleType = "single" as const;
    let toggleMenuProps = {
        buttons: [{ label: "CTA Link 1", displayType: "primary" }],
        vertical: false,
        type: toggleType
    };
    const { getByTestId } = render( <DXToggleMenu {...toggleMenuProps} /> );
    const button = getByTestId( "toggleMenuButton" );
    await userEvent.click( button );
    expect( button ).toHaveClass( 'btn-primary' );

} );

test( "Single select toggle -> When clicking on deactivated button, only the clicked button is activated", async () => {
    const toggleType = "single" as const;
    let toggleMenuProps = {
        buttons,
        type: toggleType

    };
    render( <DXToggleMenu {...toggleMenuProps} /> );

    const secondButton = document.querySelectorAll( '.btn' )[1];
    await userEvent.click( secondButton );
    const activeButtons = document.querySelectorAll( '.btn-primary' );
    expect( activeButtons ).toHaveLength( 1 );


} );

test( "Multi select toggle -> When clicking on active button, deactivate it", async () => {
    const toggleType = "multi" as const;
    let toggleMenuProps = {
        buttons: [{ label: "CTA Link 1", displayType: "primary" }],
        vertical: false,
        type: toggleType
    };
    const { getByTestId } = render( <DXToggleMenu {...toggleMenuProps} /> );
    const button = getByTestId( "toggleMenuButton" );
    await userEvent.click( button );
    await userEvent.click( button );
    expect( button ).toHaveClass( 'btn-secondary' );

} );

test( "Multi select toggle -> If there is an active button, and a deactivated button is clicked, two buttons are activated ", async () => {
    const toggleType = "multi" as const;
    let toggleMenuProps = {
        buttons,
        type: toggleType

    };
    render( <DXToggleMenu {...toggleMenuProps} /> );

    const firstButton = document.querySelectorAll( '.btn' )[0];
    await userEvent.click( firstButton );
    const secondButton = document.querySelectorAll( '.btn' )[1];
    await userEvent.click( secondButton );
    const activeButtons = document.querySelectorAll( '.btn-primary' );
    expect( activeButtons ).toHaveLength( 2 );
} );

// Testing the handleClick prop
test( "Single toogle -> when the button gets clicked the function on the handleClick prop should be called", async () => {
    const toggleType = "single" as const;
    const mock = jest.fn();
    let toggleMenuProps = {
        buttons: [
            {
                label: "TEST",
                handleClick: mock
            }
        ],
        type: toggleType

    };
    render( <DXToggleMenu {...toggleMenuProps} /> );

    const button = document.querySelector( '.btn' ) as HTMLElement;
    await userEvent.click( button );
    expect( mock ).toHaveBeenCalled();
} );
test( "Multi toogle -> when the button gets clicked the function on the handleClick prop should be called", async () => {
    const toggleType = "multi" as const;
    const mock = jest.fn();
    let toggleMenuProps = {
        buttons: [
            {
                label: "TEST",
                handleClick: mock
            }
        ],
        type: toggleType

    };
    render( <DXToggleMenu {...toggleMenuProps} /> );

    const button = document.querySelector( '.btn' ) as HTMLElement;
    await userEvent.click( button );
    expect( mock ).toHaveBeenCalled();
} );
// - Tests for the activeIndexes prop
test( "If the user does not pass the activeIndexes prop for the single type, all the button will have the class 'btn-secondary'", () => {
    const toggleType = "multi" as const;
    let toggleMenuProps = {
        buttons: [
            {
                label: "TEST",
            }
        ],
        type: toggleType
    };
    const { container } = render( <DXToggleMenu {...toggleMenuProps} /> );
    let buttons = container.querySelectorAll( ".btn" );
    let flag = 0;
    buttons.forEach( ( button: ChildNode ) => {
        let el = button as HTMLElement;
        if ( el.classList.contains( "btn-secondary" ) ) flag++;
    } );
    expect( flag ).toBe( toggleMenuProps.buttons.length );
} );
test( "If the user does pass the activeIndexes prop for the single type, the buttons on the active index will have the class 'btn-primary'", async () => {
    const toggleType = "single" as const;
    let toggleMenuProps = {
        buttons: [
            {
                label: "TEST",
            }
        ],
        type: toggleType,
        activeIndexes: [0]
    };
    const { container } = render( <DXToggleMenu {...toggleMenuProps} /> );
    let buttons = container.querySelectorAll( ".btn" );
    let active = buttons[toggleMenuProps.activeIndexes[0]];
    expect( active ).toHaveClass( "btn-primary" );
} );
test( "If the user does not pass the activeIndexes prop for the multi type, all the button will have the class 'btn-secondary'", () => {
    const toggleType = "multi" as const;
    let toggleMenuProps = {
        buttons: [
            {
                label: "TEST 0",
            },
            {
                label: "TEST 1",
            },
            {
                label: "TEST 2",
            }
        ],
        type: toggleType
    };
    const { container } = render( <DXToggleMenu {...toggleMenuProps} /> );
    let buttons = container.querySelectorAll( ".btn" );
    let flag = 0;
    buttons.forEach( ( button: ChildNode ) => {
        let el = button as HTMLElement;
        if ( el.classList.contains( "btn-secondary" ) ) flag++;
    } );
    expect( flag ).toBe( toggleMenuProps.buttons.length );
} );
test( "If the user does pass the activeIndexes prop for the multi type, the buttons on the active index will have the class 'btn-primary'", () => {
    const toggleType = "multi" as const;
    let toggleMenuProps = {
        buttons: [
            {
                label: "TEST 0",
            },
            {
                label: "TEST 1",
            },
            {
                label: "TEST 2",
            }
        ],
        type: toggleType,
        activeIndexes: [0, 2]
    };
    const { container } = render( <DXToggleMenu {...toggleMenuProps} /> );
    let buttons = container.querySelectorAll( ".btn" );
    let flag = 0;
    if ( buttons[0].classList.contains( "btn-primary" ) ) flag++;
    if ( buttons[2].classList.contains( "btn-primary" ) ) flag++;
    expect( flag ).toBe( toggleMenuProps.activeIndexes.length );
} );
