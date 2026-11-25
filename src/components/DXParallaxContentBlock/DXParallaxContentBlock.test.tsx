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
import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { ParallaxContentBlockDemoArgs } from "./DXParallaxContentBlock.stories";
import DXParallaxContentBlock from "./DXParallaxContentBlock";
import userEvent from "@testing-library/user-event";

test( "button executes expected method when clicked", async () => {
    let props = ParallaxContentBlockDemoArgs;
    const spyWindowOpen = jest.spyOn( window, 'open' );
    spyWindowOpen.mockImplementation( jest.fn() );

    if ( props.items[0].link?.url ) {
        render( <DXParallaxContentBlock {...props} /> );
        const link = screen.getAllByTestId( "pcb-eventButton" )[0] as HTMLButtonElement;
        await userEvent.click( link );
        expect( spyWindowOpen ).toHaveBeenCalled();
    }
} );

test( "button renders the correct label", () => {
    // @ts-ignore: Ignoring warning for constructor missing required props not required by the test
    render( <DXParallaxContentBlock {...ParallaxContentBlockDemoArgs} /> );
    expect( screen.getAllByTestId( "pcb-eventButton" )[0] ).toHaveTextContent( "Visit " + ParallaxContentBlockDemoArgs.items[0].title );
} );

test( "if component renders a correct title", () => {
    render( <DXParallaxContentBlock {...ParallaxContentBlockDemoArgs} /> );
    expect( screen.getAllByTestId( "parallax-title" )[0] ).toHaveTextContent( ParallaxContentBlockDemoArgs.items[0].title );
} );

test( "if component renders a correct body", () => {
    render( <DXParallaxContentBlock {...ParallaxContentBlockDemoArgs} /> );
    let containerTemp = document.createElement( "div" );
    containerTemp.innerHTML = ParallaxContentBlockDemoArgs.items[0].richText;
    expect( screen.getAllByTestId( "parallax-body" )[0].innerText ).toEqual( containerTemp.innerText );
} );

test( "If the component's width is equal to 768px the event's info should have the class 'dxParallaxContenBlock__eventInfoMobile'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 768; }
        }
    } );
    const { getAllByTestId } = render( <DXParallaxContentBlock {...ParallaxContentBlockDemoArgs} /> );
    const event = getAllByTestId( "pcb-blockInfo" )[0];
    expect( event ).toHaveClass( "row dxParallaxContenBlock__eventInfoMobile" );
} );

test( "If the component's width is larger than 768px after being equal to said value the event's info should not have the class 'dxParallaxContenBlock__eventInfoMobile'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 768; }
        }
    } );

    const { getAllByTestId } = render( <DXParallaxContentBlock {...ParallaxContentBlockDemoArgs} /> );

    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 1080; }
        }
    } );

    act( () => {
        window.dispatchEvent( new Event( 'resize' ) );
    } );

    const event = getAllByTestId( "pcb-blockInfo" )[0];
    expect( event ).not.toHaveClass( "row dxParallaxContenBlock__eventInfoMobile" );
} );

itSupportsExtensionProps( ( extra ) => <DXParallaxContentBlock {...ParallaxContentBlockDemoArgs} {...extra} /> );
