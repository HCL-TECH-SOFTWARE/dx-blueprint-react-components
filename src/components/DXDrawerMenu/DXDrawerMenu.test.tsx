import React from "react";
import '@testing-library/jest-dom';
import { render, fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXDrawerMenu from "./DXDrawerMenu";

// Tests for the dark mode
test( "if the user does not pass the dark prop, the icon's button will have the light styles", () => {
    const { container } = render( <DXDrawerMenu contentId="#my-content" direction="left" /> );
    const button = container.querySelector( '[data-testid="drawer-menu-button"]' )?.childNodes[0];
    expect( button ).toHaveStyle( 'background-color: var(--dark-dark-d2)' );
} );

test( "if the user does not pass the dark prop, the container will have the light styles", () => {
    const { container } = render( <DXDrawerMenu contentId="#my-content" direction="left" /> );
    const containerEl = container.querySelector( '[data-testid="drawer-menu-container"]' );
    expect( containerEl ).toHaveStyle( 'background-color: var(--light-white)' );
} );

test( "if the user does pass the dark prop, the icon's button will have the dark styles", () => {
    const { container } = render( <DXDrawerMenu contentId="#my-content" direction="left" dark /> );
    const button = container.querySelector( '[data-testid="drawer-menu-button"]' )?.childNodes[0];
    expect( button ).toHaveStyle( 'background-color: var(--light-white)' );
} );

test( "if the user does pass the dark prop, the container will have the dark styles", () => {
    const { container } = render( <DXDrawerMenu contentId="#my-content" direction="left" dark /> );
    const containerEl = container.querySelector( '[data-testid="drawer-menu-container"]' );
    expect( containerEl ).toHaveStyle( 'background-color: var(--dark-dark-d2)' );
} );

// Tests for the direction prop
test( "If the user does pass the direction prop as left, the button will have the class 'dxDrawerMenu__buttonLeft'", () => {
    const { getByTestId } = render( <DXDrawerMenu contentId="#my-content" direction="left" dark /> );
    const button = getByTestId( "drawer-menu-button" );
    expect( button ).toHaveClass( "dxDrawerMenu__buttonLeft" );
} );

test( "If the user does pass the direction prop as left, the container will have the style 'left: 0; border-radius: 0px 4px 4px 4px'", () => {
    const { getByTestId } = render( <DXDrawerMenu contentId="#my-content" direction="left" dark /> );
    const containerEl = getByTestId( "drawer-menu-container" );
    expect( containerEl ).toHaveStyle( "left: 0" );
} );

test( "If the user does pass the direction prop as left, the container will have the style 'border-radius: 0px 4px 4px 4px'", () => {
    const { getByTestId } = render( <DXDrawerMenu contentId="#my-content" direction="left" dark /> );
    const containerEl = getByTestId( "drawer-menu-container" );
    expect( containerEl ).toHaveStyle( 'border-radius: 0px 4px 4px 4px' );
} );

test( "If the user does pass the direction prop as right, the button will have the style 'float: right'", () => {
    const { getByTestId } = render( <DXDrawerMenu contentId="#my-content" direction="right" dark /> );
    const button = getByTestId( "drawer-menu-button" );
    expect( button ).toHaveClass( "dxDrawerMenu__buttonRight" );
} );

test( "If the user does pass the direction prop as right, the container will have the style 'right: 0'", () => {
    const { getByTestId } = render( <DXDrawerMenu contentId="#my-content" direction="right" dark /> );
    const containerEl = getByTestId( "drawer-menu-container" );
    expect( containerEl ).toHaveStyle( "right: 0" );
} );

test( "If the user does pass the direction prop as right, the container will have the style 'border-radius: 4px 0px 4px 4px'", () => {
    const { getByTestId } = render( <DXDrawerMenu contentId="#my-content" direction="right" dark /> );
    const containerEl = getByTestId( "drawer-menu-container" );
    expect( containerEl ).toHaveStyle( 'border-radius: 4px 0px 4px 4px' );
} );

// Tests the open state of the component
test( "When the component is closed the button will not have the 'dxDrawerMenu__button--active' class", async () => {
    const { getByTestId } = render( <DXDrawerMenu contentId="#my-content" direction="right" dark /> );
    const button = getByTestId( "drawer-menu-button" );
    expect( button ).not.toHaveClass( "dxDrawerMenu__button--active" );
} );

test( "When the component is closed the container will have the style of 'display: none'", async () => {
    const { getByTestId } = render( <DXDrawerMenu contentId="#my-content" direction="right" dark /> );
    let containerEl = getByTestId( "drawer-menu-container" );
    expect( containerEl ).toHaveStyle( "display: none" );
} );

test( "If the user clicks on the button, now it will have the 'dxDrawerMenu__button--active' class", async () => {
    const { getByTestId } = render( <DXDrawerMenu contentId="#my-content" direction="right" dark /> );
    const button = getByTestId( "drawer-menu-button" );
    await userEvent.click( button );
    let newButton = getByTestId( "drawer-menu-button" );
    expect( newButton ).toHaveClass( "dxDrawerMenu__button--active" );
} );

test( "If the user clicks on the button, now the container will have the style of 'display: block'", async () => {
    const { getByTestId } = render( <DXDrawerMenu contentId="#my-content" direction="right" dark /> );
    const button = getByTestId( "drawer-menu-button" );
    await userEvent.click( button );
    let containerEl = getByTestId( "drawer-menu-container" );
    expect( containerEl ).toHaveStyle( "display: block" );
} );

test( "If focus on the button and press the Enter key, now the container will have the style of 'display: block'", () => {
    const { getByTestId } = render( <DXDrawerMenu contentId="#my-content" direction="right" dark /> );
    const button = getByTestId( "drawer-menu-button" );
    button.focus();
    fireEvent.keyDown( button, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    let containerEl = getByTestId( "drawer-menu-container" );
    expect( containerEl ).toHaveStyle( "display: block" );
} );

test( "If focus on the button and press the Space key, now the container will have the style of 'display: block'", () => {
    const { getByTestId } = render( <DXDrawerMenu contentId="#my-content" direction="right" dark /> );
    const button = getByTestId( "drawer-menu-button" );
    button.focus();
    fireEvent.keyDown( button, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    let containerEl = getByTestId( "drawer-menu-container" );
    expect( containerEl ).toHaveStyle( "display: block" );
} );

test( "If focus on the button and press the Escape key, now the container will have the style of 'display: none'", () => {
    const { getByTestId } = render( <DXDrawerMenu contentId="#my-content" direction="right" dark /> );
    const button = getByTestId( "drawer-menu-button" );
    button.focus();
    fireEvent.keyDown( button, {
        key: "Escape",
        code: "Escape",
        keyCode: 23,
        charCode: 23,
    } );
    let containerEl = getByTestId( "drawer-menu-container" );
    expect( containerEl ).toHaveStyle( "display: none" );
} );

test( "If the contentId is rendered the container will have it as child when the user clicks on the button", async () => {
    const { getByTestId } = render(
        <>
            <div style={{ backgroundColor: "lightblue", padding: "1rem" }}>
                <div id='my-content'>
                    <h5>This is the content that is going to move to help inside the overlay</h5>
                </div>
            </div>
            <div>
                <DXDrawerMenu contentId="#my-content" direction="left" />
            </div>
        </>
    );
    const button = getByTestId( "drawer-menu-button" );
    await userEvent.click( button );
    let containerEl = getByTestId( "drawer-menu-container" );
    let child = containerEl.childNodes[0];
    expect( child ).toHaveAttribute( "id", "my-content" );
} );

test( "If the contentFunction is passed it will be called when the user clicks on the button", async () => {
    let mock = jest.fn();
    const { getByTestId } = render(
        <>
            <div style={{ backgroundColor: "lightblue", padding: "1rem" }}>
                <div id='my-content'>
                    <h5>This is the content that is going to move to help inside the overlay</h5>
                </div>
            </div>
            <div>
                <DXDrawerMenu contentId="#my-content" direction="left" contentFunction={mock} />
            </div>
        </>
    );
    const button = getByTestId( "drawer-menu-button" );
    await userEvent.click( button );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user open and close twice the menu, the contentFunction will be called just one time", async () => {
    let mock = jest.fn();
    const { getByTestId } = render(
        <>
            <div style={{ backgroundColor: "lightblue", padding: "1rem" }}>
                <div id='my-content'>
                    <h5>This is the content that is going to move to help inside the overlay</h5>
                </div>
            </div>
            <div>
                <DXDrawerMenu contentId="#my-content" direction="left" contentFunction={mock} />
            </div>
        </>
    );
    const button = getByTestId( "drawer-menu-button" );
    await userEvent.click( button );
    await userEvent.click( button );
    await userEvent.click( button );
    await userEvent.click( button );
    expect( mock ).toHaveBeenCalledTimes( 1 );
} );

test( "If the overlay displays on drawer active", async () => {
    render( <DXDrawerMenu contentId="#my-content" direction="left" showOverlay={true} /> );
    await userEvent.click( screen.getByTestId( "drawer-menu-button" ) );
    expect( screen.getByTestId( "drawer-menu-button" ) ).toHaveClass( "dxDrawerMenu__button--active" );
    expect( screen.getByTestId( "drawerMenu_overlay" ) ).toHaveClass( "dxDrawerMenu__overlay--state-active" );
} );

test( "If the overlay hides when clicking it", async () => {
    render( <DXDrawerMenu contentId="#my-content" direction="left" showOverlay={true} /> );
    await act( async () => {
        await userEvent.click( screen.getByTestId( "drawer-menu-button" ) );
        await userEvent.click( screen.getByTestId( "drawerMenu_overlay" ) );
    } );
    expect( screen.getByTestId( "drawer-menu-button" ) ).not.toHaveClass( "dxDrawerMenu__button--active" );
    expect( screen.getByTestId( "drawerMenu_overlay" ) ).not.toHaveClass( "dxDrawerMenu__overlay--state-active" );
} );

test( "If icon changes when value is set", () => {
    render( <DXDrawerMenu iconClass="ci-Hamburger_LG" contentId="#my-content" direction="left" showOverlay={true} /> );
    expect( screen.getByTestId( "drawer-menu-button" ).querySelector( "i" ) ).toHaveClass( "ci-Hamburger_LG" );
} );
