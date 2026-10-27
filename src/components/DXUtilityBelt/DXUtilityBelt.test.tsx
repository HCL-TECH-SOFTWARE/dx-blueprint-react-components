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
import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { itemsArgs } from "./DXUtilityBelt.stories";
import DXUtilityBelt from "./DXUtilityBelt";

test( "The component should render all the items", () => {
    let props = {
        items: itemsArgs
    };
    const { container } = render( <DXUtilityBelt {...props} /> );
    let items = container.querySelector( ".dxUtilityBelt" )?.childNodes;
    expect( items ).toHaveLength( props.items.length );
} );

test( "If the textVariant prop is not passed the itemTop button will have the class 'dxUtilityBelt__icon--full'", () => {
    let props = {
        items: itemsArgs
    };
    const { container } = render( <DXUtilityBelt {...props} /> );
    let item = container.querySelector( ".dxUtilityBelt__itemTop" )?.childNodes[0];
    expect( item ).toHaveClass( "dxUtilityBelt__icon--full" );
} );

// Test the align property
test( "If the align prop is not passed, the component will have the class 'dxUtilityBelt--center'", () => {
    let props = {
        items: itemsArgs,
    };
    const { container } = render( <DXUtilityBelt {...props} /> );
    let component = container.querySelector( ".dxUtilityBelt" );
    expect( component ).toHaveClass( "dxUtilityBelt--center" );
} );

test( "If the align prop is center, the component will have the class 'dxUtilityBelt--center'", () => {
    let props = {
        items: itemsArgs,
        align: "center" as "center"
    };
    const { container } = render( <DXUtilityBelt {...props} /> );
    let component = container.querySelector( ".dxUtilityBelt" );
    expect( component ).toHaveClass( "dxUtilityBelt--center" );
} );

test( "If the align prop is left, the component will have the class 'dxUtilityBelt--left'", () => {
    let props = {
        items: itemsArgs,
        align: "left" as "left"
    };
    const { container } = render( <DXUtilityBelt {...props} /> );
    let component = container.querySelector( ".dxUtilityBelt" );
    expect( component ).toHaveClass( "dxUtilityBelt--left" );
} );

test( "If the align prop is right, the component will have the class 'dxUtilityBelt--right'", () => {
    let props = {
        items: itemsArgs,
        align: "right" as "right"
    };
    const { container } = render( <DXUtilityBelt {...props} /> );
    let component = container.querySelector( ".dxUtilityBelt" );
    expect( component ).toHaveClass( "dxUtilityBelt--right" );
} );

// Test the handle click logic
test( "If the user clicks on the first item, its function should be called", async () => {
    let mock = jest.fn();
    let props = {
        items: [
            { button: { iconClass: "ci-Add_Column", label: "Add Column", onClick: mock }, }
        ]
    };
    const { container } = render( <DXUtilityBelt {...props} /> );
    let item = container.querySelector( ".dxUtilityBelt__itemTop" )?.childNodes[0] as HTMLElement;
    await userEvent.click( item );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user clicks focus the first item and press the Enter key, its function should be called", () => {
    let mock = jest.fn();
    let props = {
        items: [
            { button: { iconClass: "ci-Add_Column", label: "Add Column", onClick: mock }, }
        ]
    };
    const { container } = render( <DXUtilityBelt {...props} /> );
    let item = container.querySelector( ".dxUtilityBelt__itemTop" )?.childNodes[0] as HTMLElement;
    item.focus();
    fireEvent.keyDown( item, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user clicks focus the first item and press the Space key, its function should be called", () => {
    let mock = jest.fn();
    let props = {
        items: [
            { button: { iconClass: "ci-Add_Column", label: "Add Column", onClick: mock }, }
        ]
    };
    const { container } = render( <DXUtilityBelt {...props} /> );
    let item = container.querySelector( ".dxUtilityBelt__itemTop" )?.childNodes[0] as HTMLElement;
    item.focus();
    fireEvent.keyDown( item, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user clicks focus the first item and press the Escape key, its function should NOT be called", () => {
    let mock = jest.fn();
    let props = {
        items: [
            { button: { iconClass: "ci-Add_Column", label: "Add Column", onClick: mock }, }
        ]
    };
    const { container } = render( <DXUtilityBelt {...props} /> );
    let item = container.querySelector( ".dxUtilityBelt__itemTop" )?.childNodes[0] as HTMLElement;
    item.focus();
    fireEvent.keyDown( item, {
        key: "Escape",
        code: "Escape",
        keyCode: 23,
        charCode: 23,
    } );
    expect( mock ).not.toHaveBeenCalled();
} );

// Test the colors
test( "If the user does not pass any display type, the item button will have the class 'dxUtilityBelt__button--primary'", () => {
    let mock = jest.fn();
    let props = {
        items: [
            { button: { iconClass: "ci-Add_Column", label: "Add Column", onClick: mock }, }
        ]
    };
    render( <DXUtilityBelt {...props} /> );
    let item = screen.getByRole( "button" ) as HTMLElement;
    expect( item ).toHaveClass( "dxUtilityBelt__button--primary" );
} );

test( "If the user does pass display type as primary, the item button will have the class 'dxUtilityBelt__button--primary'", () => {
    let mock = jest.fn();
    let props = {
        items: [
            { button: { iconClass: "ci-Add_Column", label: "Add Column", onClick: mock }, }
        ],
        displayType: "primary" as "primary",
    };
    render( <DXUtilityBelt {...props} /> );
    let item = screen.getByRole( "button" ) as HTMLElement;
    expect( item ).toHaveClass( "dxUtilityBelt__button--primary" );
} );

test( "If the user does pass display type as secondary, the item button will have the class 'dxUtilityBelt__button--secondary'", () => {
    let mock = jest.fn();
    let props = {
        items: [
            { button: { iconClass: "ci-Add_Column", label: "Add Column", onClick: mock }, }
        ],
        displayType: "secondary" as "secondary",
    };
    render( <DXUtilityBelt {...props} /> );
    let item = screen.getByRole( "button" ) as HTMLElement;
    expect( item ).toHaveClass( "dxUtilityBelt__button--secondary" );
} );

test( "If the user does pass display type as unstyled, the item button will have the class 'dxUtilityBelt__button--unstyled'", () => {
    let mock = jest.fn();
    let props = {
        items: [
            { title: "App 1", button: { iconClass: "ci-Add_Column", label: "Add Column", onClick: mock }, }
        ],
        displayType: "unstyled" as "unstyled",
        textVariant: true,
    };
    render( <DXUtilityBelt {...props} /> );
    let item = screen.getByRole( "button" ) as HTMLElement;
    expect( item ).toHaveClass( "dxUtilityBelt__button--unstyled" );
} );

// Test for the label
test( "If the user does not pass a class for the icon, it will show a span element with the label", () => {
    let mock = jest.fn();
    let props = {
        items: [
            {
                title: "App 1",
                button: { label: "Add Column", onClick: mock },
            }
        ],
        textVariant: true
    };
    const { container } = render( <DXUtilityBelt {...props} /> );
    let item = container.querySelector( ".dxUtilityBelt__itemTop button" ) as HTMLButtonElement;
    expect( item?.textContent ).toBe( props.items[0].button.label );
} );

test( "If the user does pass a class for the icon, it will show it", () => {
    let mock = jest.fn();
    let props = {
        items: [
            {
                title: "App 1",
                button: { iconClass: "ci-Add_Column", label: "Add Column", onClick: mock },
            }
        ],
        textVariant: true
    };
    const { container } = render( <DXUtilityBelt {...props} /> );
    let item = container.querySelector( ".dxUtilityBelt__itemTop button i" ) as HTMLElement;
    expect( item ).toHaveClass( props.items[0].button.iconClass );
} );

test( "If the user does pass a title and textVariant true, it will show the title at the bottom", () => {
    let mock = jest.fn();
    let props = {
        items: [
            {
                title: "App 1",
                button: { iconClass: "ci-Add_Column", label: "Add Column", onClick: mock },
            }
        ],
        textVariant: true
    };
    const { container } = render( <DXUtilityBelt {...props} /> );
    let item = container.querySelector( ".dxUtilityBelt__itemBottom span" ) as HTMLSpanElement;
    expect( item ).toHaveTextContent( props.items[0].title );
} );
