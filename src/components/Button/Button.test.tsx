import React from "react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { HelloWorldArgs } from "./Button.stories";
import Button from "./Button";

// Testing basic render of prop
test( "button renders the correct label", () => {
    // @ts-ignore: Ignoring warning for constructor missing required props not required by the test
    render( <Button label="Test label" /> );
    expect( screen.getByRole( 'button' ) ).toHaveTextContent( /test label/i );
} );

// Testing function calls with prop
test( "function enabled on click works", async () => {
    let mockFunction = jest.fn();
    render( <Button label="Click me" onClick={mockFunction} /> );

    await userEvent.click( screen.getByRole( 'button' ) );
    expect( mockFunction ).toHaveBeenCalled();
} );

// Testing case for optional prop
test( "default label value is rendered", async () => {
    let mockFunction = jest.fn();
    render( <Button onClick={mockFunction} /> );

    expect( screen.getByRole( 'button' ) ).toHaveTextContent( 'Default button label' );
} );

// Using Storybook story to develop test
test( "hello world button renders", () => {
    render( <Button {...HelloWorldArgs} /> );
    expect( screen.getByRole( 'button' ) ).toHaveTextContent( /hello world/i );
} );
