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
import { itSupportsExtensionProps } from "../../testUtils/extensionContract";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { emptyItemsArgs } from "./DXMenuOrganizer.stories";
import DXMenuOrganizer, { ANIMATION_TIME, MenuItem } from "./DXMenuOrganizer";

const menuItems: MenuItem[] = [
    {
        label: "Item One 1",
        data: "data 1",
    },
    {
        label: "Item Two 2",
        data: "data 2",
    },
    {
        label: "Item Three 3",
        data: "data 3",
    },
];

test( "if component renders all items given", () => {
    render( <DXMenuOrganizer items={menuItems} onChange={() => {}} /> );
    expect( screen.getByTestId( 'menuOrganizer-list' ).children.length ).toEqual( menuItems.length );
} );

test( "if first item of the menu has its 'UP' button disabled", () => {
    render( <DXMenuOrganizer items={menuItems} onChange={() => {}} /> );
    let item = screen.getAllByTestId( 'menuOrganizer-item' )[0];
    expect( item.querySelectorAll( "button" )[0] ).toHaveAttribute( "disabled" );
} );

test( "if last item of the menu has its 'DOWN' button disabled", () => {
    render( <DXMenuOrganizer items={menuItems} onChange={() => {}} /> );
    let item = screen.getAllByTestId( 'menuOrganizer-item' )[menuItems.length - 1];
    expect( item.querySelectorAll( "button" )[1] ).toHaveAttribute( "disabled" );
} );

test( "if items change position on DOWN button click", async () => {
    let { container } = render( <DXMenuOrganizer items={menuItems} onChange={() => {}} /> );
    let position1 = 0;
    let position2 = 1;
    let item1 = screen.getAllByTestId( 'menuOrganizer-item' )[position1];

    await userEvent.click( item1.querySelectorAll( "button" )[1] );

    //Waiting for animations
    await act( async () => {
        await new Promise( r => setTimeout( r, ANIMATION_TIME ) );
    } );

    let reorderItem1 = ( container.children[0].querySelectorAll( "li" )[position1] );

    expect( reorderItem1 ).toHaveTextContent( menuItems[position2].label );
} );

test( "if items change position on UP button click", async () => {
    let { container } = render( <DXMenuOrganizer items={menuItems} onChange={() => {}} /> );
    let position1 = 1;
    let position2 = 2;
    let item1 = screen.getAllByTestId( 'menuOrganizer-item' )[position2];

    await userEvent.click( item1.querySelectorAll( "button" )[0] );

    //Waiting for animations
    await act( async () => {
        await new Promise( r => setTimeout( r, ANIMATION_TIME ) );
    } );

    let reorderItem1 = ( container.children[0].querySelectorAll( "li" )[position1] );

    expect( reorderItem1 ).toHaveTextContent( menuItems[position2].label );
} );

test( "if onChange function is called on position change", async () => {
    let mockFn = jest.fn();
    render( <DXMenuOrganizer items={menuItems} onChange={() => { mockFn(); }} /> );
    let item1 = screen.getAllByTestId( 'menuOrganizer-item' )[0];

    await userEvent.click( item1.querySelectorAll( "button" )[1] );

    expect( mockFn ).toBeCalled;
} );

test( "if component cleans the style prop on changed items", async () => {
    render( <DXMenuOrganizer items={menuItems} onChange={() => {}} /> );
    let item1 = screen.getAllByTestId( 'menuOrganizer-item' )[0];

    await userEvent.click( item1.querySelectorAll( "button" )[1] );
    //Waiting for animations and cleanup in small increments so intermediate
    //state updates get flushed rather than deferred to a single act() call
    for ( let i = 0; i < 6; i++ ) {
        await act( async () => {
            await new Promise( r => setTimeout( r, ANIMATION_TIME / 2 ) );
        } );
    }
    expect( item1 ).not.toHaveAttribute( "style" );
} );

test( "if component renders the empty container on empty array and default values on empty View", async () => {
    render( <DXMenuOrganizer items={[]} onChange={() => {}} /> );
    expect( screen.getByTestId( "dxEmptyState" ) ).not.toBeNull();
    expect( screen.getByTestId( "dxEmptyState" ).querySelector( "h5" ) ).toHaveTextContent( "No Saved Items!" );
    expect( screen.getByTestId( "dxEmptyState" ).querySelector( "p" ) ).toHaveTextContent( "You don't have any saved items at this time, so please start saving your pages and they will appear here." );
} );

test( "on empty array, if the component renders the empty view's given title", async () => {
    render( <DXMenuOrganizer {...emptyItemsArgs} /> );
    expect( screen.getByTestId( "dxEmptyState" ).querySelector( "h5" ) ).toHaveTextContent( emptyItemsArgs.empty?.title! );
    expect( screen.getByTestId( "dxEmptyState" ).querySelector( "p" ) ).toHaveTextContent( emptyItemsArgs.empty?.text! );
} );

itSupportsExtensionProps( ( extra ) => <DXMenuOrganizer items={menuItems} onChange={() => {}} {...extra} /> );
