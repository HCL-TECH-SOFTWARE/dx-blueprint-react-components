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
import React, { act } from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { DefaultButtonArgs, DefaultActiveArgs, LeftIconArgs, NoIconArgs } from "./DXInteractiveButton.stories";
import InteractiveButton from "./DXInteractiveButton";

// Testing default button with minimum required props
test( "inactive button has expected label", () => {
    const { container } = render( <InteractiveButton {...DefaultButtonArgs} /> );
    let btn = container.querySelector( ".dxInteractiveButton button" );
    expect( btn ).toHaveTextContent( DefaultButtonArgs.inactive.label );
} );

test( "inactive button has expected icon", () => {
    render( <InteractiveButton {...DefaultButtonArgs} /> );
    let icon = screen.getByTestId( "ib-icon" );
    expect( icon ).toHaveClass( DefaultButtonArgs.inactive.icon?.class as string );
} );

test( "inactive button has expected message", () => {
    render( <InteractiveButton {...DefaultButtonArgs} /> );
    let message = screen.getByTestId( "ib-message" );
    expect( message ).toHaveTextContent( DefaultButtonArgs.inactive.message );
} );

test( "inactive button executes expected method when clicked", async () => {
    let mockFunction = jest.fn();
    let props = DefaultButtonArgs;
    props.inactive.onClick = mockFunction;
    render( <InteractiveButton {...props} /> );
    let button = screen.getByRole( "button" );
    await userEvent.click( button );
    expect( mockFunction ).toHaveBeenCalled();
} );

test( "inactive button turns to active when clicked", async () => {
    render( <InteractiveButton {...DefaultButtonArgs} /> );
    let button = screen.getByRole( "button" );
    await userEvent.click( button );
    expect( button ).toHaveClass( "dxInteractiveButton--active" );
} );

// Testing button in active status
test( "active button has expected label", () => {
    const { container } = render( <InteractiveButton {...DefaultActiveArgs} /> );
    let btn = container.querySelector( ".dxInteractiveButton button" );
    expect( btn ).toHaveTextContent( DefaultActiveArgs.active.label );
} );

test( "active button has expected icon", () => {
    render( <InteractiveButton {...DefaultActiveArgs} /> );
    let icon = screen.getByTestId( "ib-icon" );
    expect( icon ).toHaveClass( DefaultActiveArgs.active.icon?.class as string );
} );

test( "active button has expected message", () => {
    render( <InteractiveButton {...DefaultActiveArgs} /> );
    let message = screen.getByTestId( "ib-message" );
    expect( message ).toHaveTextContent( DefaultActiveArgs.active.message );
} );

test( "active button executes expected method when clicked", async () => {
    let mockFunction = jest.fn();
    let props = DefaultActiveArgs;
    props.active.onClick = mockFunction;
    render( <InteractiveButton {...props} /> );
    let button = screen.getByRole( "button" );
    await userEvent.click( button );
    expect( mockFunction ).toHaveBeenCalled();
} );

test( "active button turns to inactive when clicked", async () => {
    render( <InteractiveButton {...DefaultActiveArgs} /> );
    let button = screen.getByRole( "button" );
    await userEvent.click( button );
    expect( button ).not.toHaveClass( "dxInteractiveButton--active" );
} );

// Testing iconPosition
test( "button has right icon position layout by default", () => {
    render( <InteractiveButton {...DefaultButtonArgs} /> );
    let button = screen.getByRole( "button" );
    let icon = button.childNodes[1] as HTMLElement;
    expect( icon.tagName ).toBe( "I" );
} );

test( "button has right icon position layout when configured", () => {
    let props = JSON.parse( JSON.stringify( DefaultButtonArgs ) );
    props.inactive.icon.position = "right";
    render( <InteractiveButton {...props} /> );
    let button = screen.getByRole( "button" );
    let icon = button.childNodes[1] as HTMLElement;
    expect( icon.tagName ).toBe( "I" );
} );

test( "button has left icon position layout when configured", () => {
    render( <InteractiveButton {...LeftIconArgs} /> );
    let button = screen.getByRole( "button" );
    let firstChild = button.childNodes[0] as HTMLElement;
    expect( firstChild ).toHaveClass( "dxInteractiveButton__icon" );
} );

test( "button has no icon layout when icon is not configured", () => {
    render( <InteractiveButton {...NoIconArgs} /> );
    let button = screen.getByRole( "button" );
    expect( button.childElementCount ).toBe( 1 );
} );

test( "button has no label layout when icon.hideLabel is configured", () => {
    let props = JSON.parse( JSON.stringify( DefaultButtonArgs ) );
    props.inactive.hideLabel = true;
    render( <InteractiveButton {...props} /> );
    let button = screen.getByRole( "button" );
    let firstChild = button.childNodes[0] as HTMLElement;
    expect( button.childElementCount ).toBe( 1 );
    expect( firstChild ).toHaveClass( "dxInteractiveButton__icon" );
} );

test( "button has right icon position layout when random icon.position prop is configured", () => {
    let props = JSON.parse( JSON.stringify( DefaultButtonArgs ) );
    // @ts-ignore: Ignoring warning since it is meant for tests purposes
    props.inactive.icon.position = "three";
    render( <InteractiveButton {...props} /> );
    let button = screen.getByRole( "button" );
    let icon = button.childNodes[1] as HTMLElement;
    expect( icon.tagName ).toBe( "I" );
} );

// Testing showMessage
test( "message is hidden by default", () => {
    render( <InteractiveButton {...DefaultButtonArgs} /> );
    let message = screen.getByTestId( "ib-message" );
    expect( message ).toHaveClass( "dxInteractiveButton__message--hidden" );
} );

test( "message is displayed when button is clicked", async () => {
    render( <InteractiveButton {...DefaultButtonArgs} /> );
    let button = screen.getByRole( "button" );
    let message = screen.getByTestId( "ib-message" );
    await userEvent.click( button );
    expect( message ).toHaveClass( "dxInteractiveButton__message--display" );
} );

test( "message is hidden a second after the button is clicked", async () => {
    render( <InteractiveButton {...DefaultButtonArgs} /> );
    let button = screen.getByRole( "button" );
    let message = screen.getByTestId( "ib-message" );
    await act( async () => {
        await userEvent.click( button );
        await new Promise( ( r ) => setTimeout( r, 1100 ) );
    } );
    expect( message ).toHaveClass( "dxInteractiveButton__message--hidden" );
} );
