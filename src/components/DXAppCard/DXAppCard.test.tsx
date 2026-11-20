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
import { fireEvent, render } from "@testing-library/react";
import DXAppCard from "./DXAppCard";
import userEvent from "@testing-library/user-event";

test( "The component renders correctly", () => {
    let mock = jest.fn();
    let props = {
        media: {
            url: "https://upload.wikimedia.org/wikipedia/commons/3/35/Logo_Messenger_NewBlurple-399x399-1.webp",
            altText: "app-facebook"
        },
        label: "Facebook",
        actionFn: mock
    };
    const { container } = render( <DXAppCard {...props} /> );
    let component = container.querySelector( ".dxAppCard" );
    expect( component ).toBeInTheDocument();
} );

test( "If the user pass an image, it should be rendered", () => {
    let mock = jest.fn();
    let props = {
        media: {
            url: "https://upload.wikimedia.org/wikipedia/commons/3/35/Logo_Messenger_NewBlurple-399x399-1.webp",
            altText: "app-facebook"
        },
        label: "Facebook",
        actionFn: mock
    };
    const { getByTestId } = render( <DXAppCard {...props} /> );
    let img = getByTestId( "app-card-image" );
    expect( img ).toBeInTheDocument();
} );

test( "If the user pass an icon, it should be rendered", () => {
    let mock = jest.fn();
    let props = {
        media: "ci-Printer",
        label: "Facebook",
        actionFn: mock
    };
    const { getByTestId } = render( <DXAppCard {...props} /> );
    let icon = getByTestId( "app-card-icon" );
    expect( icon ).toBeInTheDocument();
} );

test( "If the user clicks on the component, the function should be called", async () => {
    let mock = jest.fn();
    let props = {
        media: "ci-Printer",
        label: "Facebook",
        actionFn: mock
    };
    const { container } = render( <DXAppCard {...props} /> );
    let component = container.querySelector( ".dxAppCard" ) as HTMLElement;
    await userEvent.click( component );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus the component and press the Enter key, the function should be called", () => {
    let mock = jest.fn();
    let props = {
        media: "ci-Printer",
        label: "Facebook",
        actionFn: mock
    };
    const { container } = render( <DXAppCard {...props} /> );
    let component = container.querySelector( ".dxAppCard" ) as HTMLElement;
    fireEvent.keyDown( component, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus the component and press the Space key, the function should be called", () => {
    let mock = jest.fn();
    let props = {
        media: "ci-Printer",
        label: "Facebook",
        actionFn: mock
    };
    const { container } = render( <DXAppCard {...props} /> );
    let component = container.querySelector( ".dxAppCard" ) as HTMLElement;
    fireEvent.keyDown( component, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus the component and press the Escape key, the function should not be called", () => {
    let mock = jest.fn();
    let props = {
        media: "ci-Printer",
        label: "Facebook",
        actionFn: mock
    };
    const { container } = render( <DXAppCard {...props} /> );
    let component = container.querySelector( ".dxAppCard" ) as HTMLElement;
    fireEvent.keyDown( component, {
        key: "Escape",
        code: "Escape",
        keyCode: 23,
        charCode: 23,
    } );
    expect( mock ).not.toHaveBeenCalled();
} );

itSupportsExtensionProps( ( extra ) => <DXAppCard media="ci-Home" label="Home" actionFn={() => {}} {...extra} /> );

test( "a consumer onClick runs first and can stop the action with preventDefault", async () => {
    const actionFn = jest.fn();
    const consumer = jest.fn( ( e: React.MouseEvent ) => e.preventDefault() );
    const { container } = render( <DXAppCard media="ci-Home" label="Home" actionFn={actionFn} onClick={consumer} /> );
    await userEvent.click( container.querySelector( ".dxAppCard" ) as HTMLElement );
    expect( consumer ).toHaveBeenCalledTimes( 1 );
    expect( actionFn ).not.toHaveBeenCalled();
} );

test( "a consumer onClick that does not prevent the default still lets the action run", async () => {
    const actionFn = jest.fn();
    const consumer = jest.fn();
    const { container } = render( <DXAppCard media="ci-Home" label="Home" actionFn={actionFn} onClick={consumer} /> );
    await userEvent.click( container.querySelector( ".dxAppCard" ) as HTMLElement );
    expect( consumer ).toHaveBeenCalledTimes( 1 );
    expect( actionFn ).toHaveBeenCalledTimes( 1 );
} );

test( "a consumer onKeyDown runs before the component's keyboard handling", () => {
    const actionFn = jest.fn();
    const consumer = jest.fn();
    const { container } = render( <DXAppCard media="ci-Home" label="Home" actionFn={actionFn} onKeyDown={consumer} /> );
    fireEvent.keyDown( container.querySelector( ".dxAppCard" ) as HTMLElement, { keyCode: 13 } );
    expect( consumer ).toHaveBeenCalledTimes( 1 );
    expect( actionFn ).toHaveBeenCalledTimes( 1 );
} );
