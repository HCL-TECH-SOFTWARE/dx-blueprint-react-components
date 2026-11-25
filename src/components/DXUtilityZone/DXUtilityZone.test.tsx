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
import { render, fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXUtilityZone from "./DXUtilityZone";
import { itemsArgs } from "./DXUtilityZone.stories";

test( "Render all the items passed", () => {
    let props = {
        items: itemsArgs
    };
    const { container } = render( <DXUtilityZone {...props} /> );
    let allItems = container.querySelector( ".dxUtilityZone__buttonsContainer" )?.childNodes;
    expect( allItems ).toHaveLength( props.items.length );
} );

test( "When the component first render, the panels element should have de class of 'dxUtilityZone__panelsContainer'", () => {
    let props = {
        items: itemsArgs
    };
    const { getByTestId } = render( <DXUtilityZone {...props} /> );
    let panels = getByTestId( "utility-zone-panels" );
    expect( panels ).toHaveClass( "dxUtilityZone__panelsContainer" );
} );

test( "When the user clicks on the first item, the panels element should have the classes 'dxUtilityZone__panelsContainer expanded'", async () => {
    let props = {
        items: itemsArgs
    };
    const { getByTestId, getAllByTestId } = render( <DXUtilityZone {...props} /> );
    let item = getAllByTestId( "utility-zone-item" )[0].childNodes[0].childNodes[0].childNodes[0] as HTMLElement;
    await userEvent.click( item );
    let panels = getByTestId( "utility-zone-panels" );
    expect( panels ).toHaveClass( "dxUtilityZone__panelsContainer expanded" );
} );

test( "If the icon panels are disabled, it should not render the panels", async () => {
    let props = {
        items: itemsArgs,
        enableIconPanels: false
    };
    const { getAllByTestId, queryByTestId } = render( <DXUtilityZone {...props} /> );
    let item = getAllByTestId( "utility-zone-item" )[0].childNodes[0].childNodes[0].childNodes[0] as HTMLElement;
    await userEvent.click( item );
    let panels = queryByTestId( "utility-zone-panels" );
    expect( panels ).toBeNull;
} );

test( "When the component is first rendered, the indicator element should have de class of 'd-none'", async () => {
    let props = {
        items: itemsArgs
    };
    const { getAllByTestId } = render( <DXUtilityZone {...props} /> );
    let indicator = getAllByTestId( "utility-zone-indicator" )[0];
    expect( indicator ).toHaveClass( "d-none" );
} );

test( "When the user clicks on the first item, the indicator element should have de class of 'dxUtilityZone__indicator'", async () => {
    let props = {
        items: itemsArgs
    };
    const { getAllByTestId } = render( <DXUtilityZone {...props} /> );
    let item = getAllByTestId( "utility-zone-item" )[0].childNodes[0].childNodes[0].childNodes[0] as HTMLElement;
    await userEvent.click( item );
    let indicator = getAllByTestId( "utility-zone-indicator" )[0];
    expect( indicator ).toHaveClass( "dxUtilityZone__indicator" );
} );

test( "When the component is first rendered, the panel of the first item should have the class 'd-none'", () => {
    let props = {
        items: itemsArgs
    };
    const { getByTestId } = render( <DXUtilityZone {...props} /> );
    let panel = getByTestId( "utility-zone-panels" ).childNodes[0].childNodes[0];
    expect( panel ).toHaveClass( "d-none" );
} );

test( "If the user clicks on the first item, its panel should have the class 'dxUtilityZone__panel'", async () => {
    let props = {
        items: itemsArgs
    };
    const { getAllByTestId, getByTestId } = render( <DXUtilityZone {...props} /> );
    let item = getAllByTestId( "utility-zone-item" )[0].childNodes[0].childNodes[0].childNodes[0] as HTMLElement;
    await userEvent.click( item );
    let panel = getByTestId( "utility-zone-panels" ).childNodes[0].childNodes[0];
    expect( panel ).toHaveClass( "dxUtilityZone__panel" );
} );

test( "If the user clicks on the first item, its content should move as child of its panel", async () => {
    let props = {
        items: itemsArgs
    };
    const { getAllByTestId, container } = render(
        <div>
            <DXUtilityZone {...props} />
            <div id="content-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, quibusdam! Optio tenetur doloribus adipisci eligendi dolorem similique, qui eos hic cumque ducimus quasi nostrum ut sequi nobis in explicabo ipsam.
            </div>
        </div>
    );
    let item = getAllByTestId( "utility-zone-item" )[0].childNodes[0].childNodes[0].childNodes[0] as HTMLElement;
    await userEvent.click( item );
    let newItemContent = container.querySelector( ".dxUtilityZone__panel" )?.childNodes[0];
    expect( newItemContent ).toBeInTheDocument();
} );

test( "If the user focus on the first item and press the Enter key, its content should move as child of its panel", () => {
    let props = {
        items: itemsArgs
    };
    const { getAllByTestId, container } = render(
        <div>
            <DXUtilityZone {...props} />
            <div id="content-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, quibusdam! Optio tenetur doloribus adipisci eligendi dolorem similique, qui eos hic cumque ducimus quasi nostrum ut sequi nobis in explicabo ipsam.
            </div>
        </div>
    );
    let item = getAllByTestId( "utility-zone-item" )[0].childNodes[0].childNodes[0].childNodes[0] as HTMLElement;
    item.focus();
    fireEvent.keyDown( item, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    let newItemContent = container.querySelector( ".dxUtilityZone__panel" )?.childNodes[0];
    expect( newItemContent ).toBeInTheDocument();
} );

test( "If the user focus on the first item and press the Space key, its content should move as child of its panel", () => {
    let props = {
        items: itemsArgs
    };
    const { getAllByTestId, container } = render(
        <div>
            <DXUtilityZone {...props} />
            <div id="content-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, quibusdam! Optio tenetur doloribus adipisci eligendi dolorem similique, qui eos hic cumque ducimus quasi nostrum ut sequi nobis in explicabo ipsam.
            </div>
        </div>
    );
    let item = getAllByTestId( "utility-zone-item" )[0].childNodes[0].childNodes[0].childNodes[0] as HTMLElement;
    item.focus();
    fireEvent.keyDown( item, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    let newItemContent = container.querySelector( ".dxUtilityZone__panel" )?.childNodes[0];
    expect( newItemContent ).toBeInTheDocument();
} );

test( "If the user pass a contentFunction and clicks on the first item, it will be called", async () => {
    let mock = jest.fn();
    let props = {
        items: [
            {
                icon: "ci-Circle_Help",
                onClick: jest.fn(),
                badges: 102,
                contentId: "#content-1",
                label: "Content-1",
                contentFunction: mock
            }
        ]
    };
    const { getAllByTestId } = render(
        <div>
            <DXUtilityZone {...props} />
            <div id="content-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, quibusdam! Optio tenetur doloribus adipisci eligendi dolorem similique, qui eos hic cumque ducimus quasi nostrum ut sequi nobis in explicabo ipsam.
            </div>
        </div>
    );
    let item = getAllByTestId( "utility-zone-item" )[0].childNodes[0].childNodes[0].childNodes[0] as HTMLElement;
    await userEvent.click( item );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user pass a contentFunction and clicks three times on the first item, the function will be called just one time", async () => {
    let mock = jest.fn();
    let props = {
        items: [
            {
                icon: "ci-Circle_Help",
                onClick: jest.fn(),
                badges: 102,
                contentId: "#content-1",
                label: "Content-1",
                contentFunction: mock
            }
        ]
    };
    const { getAllByTestId } = render(
        <div>
            <DXUtilityZone {...props} />
            <div id="content-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, quibusdam! Optio tenetur doloribus adipisci eligendi dolorem similique, qui eos hic cumque ducimus quasi nostrum ut sequi nobis in explicabo ipsam.
            </div>
        </div>
    );
    let item = getAllByTestId( "utility-zone-item" )[0].childNodes[0].childNodes[0].childNodes[0] as HTMLElement;
    await userEvent.click( item );
    await userEvent.click( item );
    await userEvent.click( item );
    expect( mock ).toHaveBeenCalledTimes( 1 );
} );

test( "If the user passes a contentFunction and focus on the first item and press the Enter key, the function should be called", () => {
    let mock = jest.fn();
    let props = {
        items: [
            {
                icon: "ci-Circle_Help",
                onClick: jest.fn(),
                badges: 102,
                contentId: "#content-1",
                label: "Content-1",
                contentFunction: mock
            }
        ]
    };
    const { getAllByTestId } = render(
        <div>
            <DXUtilityZone {...props} />
            <div id="content-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, quibusdam! Optio tenetur doloribus adipisci eligendi dolorem similique, qui eos hic cumque ducimus quasi nostrum ut sequi nobis in explicabo ipsam.
            </div>
        </div>
    );
    let item = getAllByTestId( "utility-zone-item" )[0].childNodes[0].childNodes[0].childNodes[0] as HTMLElement;
    item.focus();
    fireEvent.keyDown( item, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user passes a contentFunction and focus on the first item and press the Space key, the function should be called", () => {
    let mock = jest.fn();
    let props = {
        items: [
            {
                icon: "ci-Circle_Help",
                onClick: jest.fn(),
                badges: 102,
                contentId: "#content-1",
                label: "Content-1",
                contentFunction: mock
            }
        ]
    };
    const { getAllByTestId } = render(
        <div>
            <DXUtilityZone {...props} />
            <div id="content-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, quibusdam! Optio tenetur doloribus adipisci eligendi dolorem similique, qui eos hic cumque ducimus quasi nostrum ut sequi nobis in explicabo ipsam.
            </div>
        </div>
    );
    let item = getAllByTestId( "utility-zone-item" )[0].childNodes[0].childNodes[0].childNodes[0] as HTMLElement;
    item.focus();
    fireEvent.keyDown( item, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the overlay displays on item active", async () => {
    render( <DXUtilityZone items={itemsArgs} showOverlay={true} /> );
    let item = screen.getAllByTestId( "utility-zone-item" )[0].childNodes[0].childNodes[0].childNodes[0] as HTMLElement;
    await userEvent.click( item );
    expect( screen.getByTestId( "utilityZone__overlay" ) ).toHaveClass( "dxUtilityZone__overlay--state-active" );
} );

test( "If the overlay hides when clicking it", async () => {
    render( <DXUtilityZone items={itemsArgs} showOverlay={true} /> );
    let item = screen.getAllByTestId( "utility-zone-item" )[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0] as HTMLElement;
    await act( async () => {
        await userEvent.click( item );
        await userEvent.click( screen.getByTestId( "utilityZone__overlay" ) );
    } );
    expect( screen.getByTestId( "utilityZone__overlay" ) ).not.toHaveClass( "dxUtilityZone__overlay--state-active" );
} );

itSupportsExtensionProps( ( extra ) => <DXUtilityZone items={itemsArgs} {...extra} /> );

test( "passes only the tool button's own props: contentId, contentFunction and untyped extra keys stay off its DOM", () => {
    const spy = jest.spyOn( console, "error" ).mockImplementation( () => undefined );
    try {
        const items = itemsArgs.map( ( item ) => ( { ...item, contentFunction: jest.fn(), badges: 3 } ) );
        const { container } = render( <DXUtilityZone items={items} /> );
        const buttons = container.querySelectorAll( '[data-testid="utility-zone-item"] > :first-child' );
        expect( buttons.length ).toBe( items.length );
        buttons.forEach( ( button ) => {
            expect( button ).not.toHaveAttribute( "contentid" );
            expect( button ).not.toHaveAttribute( "contentId" );
            expect( button ).not.toHaveAttribute( "contentfunction" );
            expect( button ).not.toHaveAttribute( "badges" );
        } );
        expect( spy ).not.toHaveBeenCalled();
    } finally {
        spy.mockRestore();
    }
} );
