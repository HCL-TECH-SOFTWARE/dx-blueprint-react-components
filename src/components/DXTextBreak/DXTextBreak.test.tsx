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
import DXTextBreak from "./DXTextBreak";
import { requiredArgs } from "./DXTextBreak.stories";

test( "If the user does not pass a subtitle it should be null", () => {
    const { container } = render( <DXTextBreak {...requiredArgs} /> );
    const subTitle = container.querySelector( '[data-testid="text-break-subtitle"]' );
    expect( subTitle ).toBeNull();
} );

test( "If the user does pass a subtitle it should be in the document", () => {
    let props = {
        ...requiredArgs,
        subtitle: "A subtitle for the testing"
    };
    const { getByTestId } = render( <DXTextBreak {...props} /> );
    const subTitle = getByTestId( 'text-break-subtitle' );
    expect( subTitle ).toBeInTheDocument();
} );

test( "If the user does not pass a textColor, the default color for the content will be var(--light-white)", () => {
    let props = {
        ...requiredArgs
    };
    const { getByTestId } = render( <DXTextBreak {...props} /> );
    const content = getByTestId( 'text-break-content' );
    expect( content ).toHaveStyle( { color: "var(--light-white)" } );
} );

test( "If the user does pass a textColor, it will be applied on the content", () => {
    let props = {
        ...requiredArgs,
        textColor: "#98d9bc",
    };
    const { getByTestId } = render( <DXTextBreak {...props} /> );
    const content = getByTestId( 'text-break-content' );
    expect( content ).toHaveStyle( { color: props.textColor } );
} );

test( "If the user pass backgroundImage, the style for that case should be applied", () => {
    let props = {
        ...requiredArgs,
        background: {
            ...requiredArgs.background,
            image: "https://images.unsplash.com/photo-1667312950895-306784936a68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        }
    };
    const { getByTestId } = render( <DXTextBreak {...props} /> );
    const background = getByTestId( "text-break-background" );
    expect( background ).toHaveStyle( {
        background: `radial-gradient(circle, rgba(0,0,0,0.5648460067620799) 100%, rgba(0,0,0,0) 100%), url(${props.background.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
    } );
} );

test( "If the user does not pass the align prop, the content should have the corresponding styles", () => {
    const { getByTestId } = render( <DXTextBreak {...requiredArgs} /> );
    const content = getByTestId( "text-break-content" );
    expect( content ).toHaveStyle( {
        textAlign: "left",
        paddingLeft: "2.8125rem"
    } );
} );

test( "If the user does not pass the align prop, the content should have the corresponding classes", () => {
    const { getByTestId } = render( <DXTextBreak {...requiredArgs} /> );
    const content = getByTestId( "text-break-content" );
    expect( content ).toHaveClass( "col-12", "col-md-7" );
} );

test( "If the user pass left for the align prop, the content should have the corresponding styles", () => {
    let props = { ...requiredArgs, align: "left" };
    const { getByTestId } = render( <DXTextBreak {...props} /> );
    const content = getByTestId( "text-break-content" );
    expect( content ).toHaveStyle( {
        textAlign: "left",
        paddingLeft: "2.8125rem"
    } );
} );

test( "If the user pass left for the align prop, the content should have the corresponding classes", () => {
    let props = { ...requiredArgs, align: "left" };
    const { getByTestId } = render( <DXTextBreak {...props} /> );
    const content = getByTestId( "text-break-content" );
    expect( content ).toHaveClass( "col-12", "col-md-7" );
} );

test( "If the user pass center for the align prop, the content should have the corresponding styles", () => {
    let props = { ...requiredArgs, align: "center" };
    const { getByTestId } = render( <DXTextBreak {...props} /> );
    const content = getByTestId( "text-break-content" );
    expect( content ).toHaveStyle( {
        textAlign: "center",
        paddingLeft: 0,
        paddingRight: 0
    } );
} );

test( "If the user pass center for the align prop, the content should have the corresponding classes", () => {
    let props = { ...requiredArgs, align: "center" };
    const { getByTestId } = render( <DXTextBreak {...props} /> );
    const content = getByTestId( "text-break-content" );
    expect( content ).toHaveClass( "col-12", "col-md-8", "offset-md-2" );
} );

test( "If the user pass right for the align prop, the content should have the corresponding styles", () => {
    let props = { ...requiredArgs, align: "right" };
    const { getByTestId } = render( <DXTextBreak {...props} /> );
    const content = getByTestId( "text-break-content" );
    expect( content ).toHaveStyle( {
        textAlign: "right",
        paddingRight: "2.8125rem"
    } );
} );

test( "If the user pass right for the align prop, the content should have the corresponding classes", () => {
    let props = { ...requiredArgs, align: "right" };
    const { getByTestId } = render( <DXTextBreak {...props} /> );
    const content = getByTestId( "text-break-content" );
    expect( content ).toHaveClass( "col-12", "col-md-7", "offset-md-5" );
} );

test( "If the user click on the button, the function passed a prop, should be called", async () => {
    let mock = jest.fn();
    let props = {
        ...requiredArgs,
        button: {
            label: "Hey!",
            onClick: mock
        }
    };
    const { getByTestId } = render( <DXTextBreak {...props} /> );
    let button = getByTestId( "text-break-button" );
    await userEvent.click( button );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus the button and press the Enter key, the function should be called", () => {
    let mock = jest.fn();
    let props = {
        ...requiredArgs,
        button: {
            label: "Hey!",
            onClick: mock
        }
    };
    const { getByTestId } = render( <DXTextBreak {...props} /> );
    let button = getByTestId( "text-break-button" );
    button.focus();
    fireEvent.keyDown( button, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus the button and press the Space key, the function should be called", () => {
    let mock = jest.fn();
    let props = {
        ...requiredArgs,
        button: {
            label: "Hey!",
            onClick: mock
        }
    };
    const { getByTestId } = render( <DXTextBreak {...props} /> );
    let button = getByTestId( "text-break-button" );
    button.focus();
    fireEvent.keyDown( button, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus on the button and press the Escape key, the function will not be called", () => {
    let mock = jest.fn();
    let props = {
        ...requiredArgs,
        button: {
            label: "Hey!",
            onClick: mock
        }
    };
    const { getByTestId } = render( <DXTextBreak {...props} /> );
    let button = getByTestId( "text-break-button" );
    button.focus();
    fireEvent.keyDown( button, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    expect( mock ).not.toHaveBeenCalled();
} );
