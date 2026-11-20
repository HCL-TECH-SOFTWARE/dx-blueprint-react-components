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
import { fireEvent, render, screen } from "@testing-library/react";
import DXSearchSuggestions from "./DXSearchSuggestions";
import userEvent from "@testing-library/user-event";
import { ssArgs } from "./DXSearchSuggestions.stories";

test( "If the user pass a searchPlaceholder, that value will be on the input", () => {
    const { getByTestId } = render( <DXSearchSuggestions {...ssArgs} /> );
    const input = getByTestId( "ss-input" ) as HTMLInputElement;
    expect( input.placeholder ).toBe( ssArgs.searchPlaceholder );
} );

test( "If the user does not pass a placeholder, that value will be 'I want to...'", () => {
    let props = {
        searchItems: ssArgs.searchItems,
        searchFn: ssArgs.searchFn
    };
    const { getByTestId } = render( <DXSearchSuggestions {...props} /> );
    const input = getByTestId( "ss-input" ) as HTMLInputElement;
    expect( input.placeholder ).toBe( "I want to..." );
} );

// Tests for the icon align (Updated to evaluate Bootstrap element order)
test( "If the user does not pass the iconPosition prop, the element 'ss-icon-container' renders before 'ss-input'", () => {
    let props = {
        searchItems: ssArgs.searchItems,
        searchFn: ssArgs.searchFn
    };
    const { getByTestId } = render( <DXSearchSuggestions {...props} /> );
    const group = getByTestId( "ss-input-group" );
    expect( group.childNodes[0] ).toBe( getByTestId( "ss-icon-container" ) );
    expect( group.childNodes[1] ).toBe( getByTestId( "ss-input" ) );
} );

test( "If the user does pass the iconPosition prop as left, the element 'ss-icon-container' renders before 'ss-input'", () => {
    let props = {
        searchItems: ssArgs.searchItems,
        searchFn: ssArgs.searchFn,
        iconPosition: "left" as "left"
    };
    const { getByTestId } = render( <DXSearchSuggestions {...props} /> );
    const group = getByTestId( "ss-input-group" );
    expect( group.childNodes[0] ).toBe( getByTestId( "ss-icon-container" ) );
    expect( group.childNodes[1] ).toBe( getByTestId( "ss-input" ) );
} );

test( "If the user does pass the iconPosition prop as right, the element 'ss-input' renders before 'ss-icon-container'", () => {
    let props = {
        searchItems: ssArgs.searchItems,
        searchFn: ssArgs.searchFn,
        iconPosition: "right" as "right"
    };
    const { getByTestId } = render( <DXSearchSuggestions {...props} /> );
    const group = getByTestId( "ss-input-group" );
    expect( group.childNodes[0] ).toBe( getByTestId( "ss-input" ) );
    expect( group.childNodes[1] ).toBe( getByTestId( "ss-icon-container" ) );
} );

// Tests for border-radius and showing the list (Updated traversing classes for Bootstrap)
test( "If the user clicks on the input, that text input will have the style of 'border-bottom-right-radius: 0'", async () => {
    const { getByTestId } = render( <DXSearchSuggestions {...ssArgs} /> );
    const input = getByTestId( "ss-input" );
    await userEvent.click( input );
    const afterInput = getByTestId( "ss-input" );
    expect( afterInput ).toHaveStyle( 'border-bottom-right-radius: 0' );
} );

test( "If the user clicks on the input, that inset div will have the style of 'border-bottom-left-radius: 0'", async () => {
    const { container, getByTestId } = render( <DXSearchSuggestions {...ssArgs} /> );
    const input = getByTestId( "ss-input" );
    await userEvent.click( input );
    const afterDiv = container.querySelector( ".dxSSuggestions .input-group .input-group-text" );
    expect( afterDiv ).toHaveStyle( 'border-bottom-left-radius: 0' );
} );

test( "If the user clicks on the input, the list element will have the style 'display: block'", async () => {
    const { getByTestId } = render( <DXSearchSuggestions {...ssArgs} /> );
    const input = getByTestId( "ss-input" );
    await userEvent.click( input );
    const list = getByTestId( "ss-list" );
    expect( list ).toHaveStyle( 'display: block' );
} );

test( "If the user clicks on the input, the list element will have the class 'dxSSuggestions__list--active'", async () => {
    const { getByTestId } = render( <DXSearchSuggestions {...ssArgs} /> );
    const input = getByTestId( "ss-input" );
    await userEvent.click( input );
    const list = getByTestId( "ss-list" );
    expect( list ).toHaveClass( 'dxSSuggestions__list--active' );
} );

test( "If the user clicks on the input, and then on the body, the style object on the text input will have length 0", async () => {
    const { getByTestId, container } = render( <DXSearchSuggestions {...ssArgs} /> );
    const input = getByTestId( "ss-input" );
    await userEvent.click( input );
    const body = container.querySelector( "body" ) as HTMLElement;
    await userEvent.click( body );
    const afterInput = getByTestId( "ss-input" );
    expect( afterInput.style ).toHaveLength( 0 );
} );

test( "If the user clicks on the input, and then on the body, the style object on the inset div will have length 0", async () => {
    const { container, getByTestId } = render( <DXSearchSuggestions {...ssArgs} /> );
    const input = getByTestId( "ss-input" );
    await userEvent.click( input );
    const body = container.querySelector( "body" ) as HTMLElement;
    await userEvent.click( body );
    const afterDiv = container.querySelector( ".dxSSuggestions .input-group .input-group-text" ) as HTMLElement;
    expect( afterDiv.style ).toHaveLength( 0 );
} );

test( "If the user clicks on the input, and then on the body, the list element will have the style 'display: none'", async () => {
    const { getByTestId, container } = render( <DXSearchSuggestions {...ssArgs} /> );
    const input = getByTestId( "ss-input" );
    await userEvent.click( input );
    const body = container.querySelector( "body" ) as HTMLElement;
    await userEvent.click( body );
    const list = getByTestId( "ss-list" );
    expect( list ).toHaveStyle( 'display: none' );
} );

test( "If the user clicks on the input, and then on the body, the list element will not have the class 'dxSSuggestions__list--active'", async () => {
    const { getByTestId, container } = render( <DXSearchSuggestions {...ssArgs} /> );
    const input = getByTestId( "ss-input" );
    await userEvent.click( input );
    const body = container.querySelector( "body" ) as HTMLElement;
    await userEvent.click( body );
    const list = getByTestId( "ss-list" );
    expect( list ).not.toHaveClass( 'dxSSuggestions__list--active' );
} );

test( "If the user clicks on the input, and then press the escape key, the list will have the display none", async () => {
    const { getByTestId } = render( <DXSearchSuggestions {...ssArgs} /> );
    const input = getByTestId( "ss-input" );
    await userEvent.click( input );
    await fireEvent.keyUp( input, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    const list = screen.getByTestId( "ss-list" );
    expect( list ).toHaveStyle( "display: none" );
} );

test( "If the list is displayed and the user press the escape key, the value of the input should be ''", async () => {
    const { getByTestId } = render( <DXSearchSuggestions {...ssArgs} /> );
    const input = getByTestId( "ss-input" );
    await userEvent.click( input );
    await fireEvent.keyUp( input, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    const newInput = screen.getByTestId( "ss-input" ) as HTMLInputElement;
    expect( newInput.value ).toEqual( "" );
} );

// Tests for the filter
test( "If the user click on the input and then press the Enter key, the search function will be called", async () => {
    const testFn = ( filter: string ) => "TEST " + filter;
    let mockFn = jest.fn( testFn );
    let props = {
        ...ssArgs,
        searchFn: mockFn
    };
    const { getByTestId } = render( <DXSearchSuggestions {...props} /> );
    const input = getByTestId( "ss-input" );
    await userEvent.click( input );
    await fireEvent.keyUp( input, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13
    } );
    expect( mockFn ).toHaveBeenCalledTimes( 1 );
} );

test( "If the user enters a '1', the list will have only one child", async () => {
    const { getByTestId } = render( <DXSearchSuggestions {...ssArgs} /> );
    const input = getByTestId( "ss-input" );
    await userEvent.type( input, "1 " );
    fireEvent.keyDown( input, {
        key: "Backspace",
        code: "Backspace",
        keyCode: 8,
        charCode: 8,
    } );
    const list = getByTestId( "ss-list" );
    const length = list.childNodes[0].childNodes.length;
    expect( length ).toEqual( 1 );
} );

test( "If the user enters a '1', and then delete it, the list will have 7 children", async () => {
    const { getByTestId } = render( <DXSearchSuggestions {...ssArgs} /> );
    const input = getByTestId( "ss-input" );
    fireEvent.keyDown( input, {
        key: "1",
        code: "Digit1",
        keyCode: 49,
        charCode: 49,
    } );
    fireEvent.keyDown( input, {
        key: "Backspace",
        code: "Backspace",
        keyCode: 8,
        charCode: 8,
    } );
    const list = getByTestId( "ss-list" );
    const length = list.childNodes[0].childNodes.length;
    expect( length ).toEqual( 7 );
} );

test( "If the user enters a 'hello' an then type Enter, the serch function will be called one time", async () => {
    const testFn = ( filter: string ) => "TEST " + filter;
    let mockFn = jest.fn( testFn );
    let props = {
        ...ssArgs,
        searchFn: mockFn
    };
    const { getByTestId } = render( <DXSearchSuggestions {...props} /> );
    const input = getByTestId( "ss-input" );
    await userEvent.type( input, "hello" );
    fireEvent.keyUp( input, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13
    } );
    expect( mockFn ).toHaveBeenCalledTimes( 1 );
} );

test( "If the user enters a 'hello' on the list an option will say 'Search hello in our portal'", async () => {
    const { getByTestId } = render( <DXSearchSuggestions {...ssArgs} /> );
    const input = getByTestId( "ss-input" );
    await userEvent.type( input, "hello" );
    const msg = getByTestId( "ss-no-results" );
    expect( msg.textContent ).toEqual( "Search hello in our portal" );
} );

test( "If the user enters a 'hello' and then click on the option the searchFn will be called one time", async () => {
    const testFn = ( filter: string ) => "TEST " + filter;
    let mockFn = jest.fn( testFn );
    let props = {
        ...ssArgs,
        searchFn: mockFn
    };
    const { getByTestId } = render( <DXSearchSuggestions {...props} /> );
    const input = getByTestId( "ss-input" );
    await userEvent.type( input, "hello" );
    const msg = getByTestId( "ss-no-results" );
    await userEvent.click( msg );
    expect( mockFn ).toHaveBeenCalledTimes( 1 );
} );

test( "If icon changes if params are set", () => {
    let icons = {
        search: "ci-Note_Search",
        link: "ci-Arrow_Right_MD"
    };
    render( <DXSearchSuggestions {...ssArgs} icons={icons} /> );
    expect( screen.getByTestId( "ss-icon" ) ).toHaveClass( icons.search );
} );

itSupportsExtensionProps( ( extra ) => <DXSearchSuggestions {...ssArgs} {...extra} /> );
