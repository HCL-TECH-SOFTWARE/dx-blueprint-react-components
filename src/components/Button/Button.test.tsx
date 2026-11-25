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
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { HelloWorldArgs } from "./Button.stories";
import Button from "./Button";
import { itSupportsExtensionProps } from "../../testUtils/extensionContract";

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

itSupportsExtensionProps( ( extra ) => <Button label="Click me" onClick={jest.fn()} {...extra} /> );
