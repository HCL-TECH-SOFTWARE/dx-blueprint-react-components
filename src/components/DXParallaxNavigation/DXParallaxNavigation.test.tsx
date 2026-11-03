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
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { DefaultImplementationArgs } from "./DXParallaxNavigation.stories";
import DXParallaxNavigation, { ParallaxNavigationProps } from "./DXParallaxNavigation";

test( "button renders the correct label on mobile", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 768; }
        }
    } );

    render( <DXParallaxNavigation {...DefaultImplementationArgs}></DXParallaxNavigation> );
    expect( screen.getByTestId( "pnb-eventButtonMobile-1" ) ).toHaveTextContent( DefaultImplementationArgs.items[0].link.label );

    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 1080; }
        }
    } );
} );

test( "button has the class 'dxParallaxNavigation__buttonMobile' on mobile", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 768; }
        }
    } );

    render( <DXParallaxNavigation {...DefaultImplementationArgs}></DXParallaxNavigation> );
    expect( screen.getByTestId( "pnb-eventButtonMobile-1" ) ).toHaveClass( 'dxParallaxNavigation__buttonMobile' );

    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 1080; }
        }
    } );
} );

test( "button renders the correct icon in desktop variation", () => {
    render( <DXParallaxNavigation {...DefaultImplementationArgs}></DXParallaxNavigation> );
    expect( screen.getByTestId( "pnb-eventButtonIcon-1" ).className ).toContain( DefaultImplementationArgs.items[0].icon );
} );


test( "if the user passes position 'right' the component has class 'dxParallaxNavigation__alignmentRight'", () => {
    let parallaxNavigationRight: ParallaxNavigationProps = {
        position: "right",
        items: [
            {
                icon: "ci-Cloud_Check",
                link: { label: "My Dashboard", target: "", url: "dashboard" },
            }
        ]
    };

    const { getAllByTestId } = render( <DXParallaxNavigation {...parallaxNavigationRight} /> );
    const componentWrapper = getAllByTestId( "pnb-wrapper" )[0];
    expect( componentWrapper ).toHaveClass( "dxParallaxNavigation__alignmentRight" );
} );

test( "If the user clicks in the mobile button the scrollIntoView method is executed", async () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 768; }
        }
    } );

    render( <DXParallaxNavigation {...DefaultImplementationArgs} /> );
    let mockScrollIntoView = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView();
    const btn = screen.getByTestId( 'pnb-eventButtonMobile-3' );
    await userEvent.click( btn );
    expect( mockScrollIntoView ).toHaveBeenCalled();

    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 1080; }
        }
    } );
    mockScrollIntoView.mockReset();
} );


test( "If the user clicks in the button the scrollIntoView method is executed", async () => {
    render( <DXParallaxNavigation {...DefaultImplementationArgs} /> );
    let mockScrollIntoView = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView();
    const btn = screen.getByTestId( 'pnb-eventButton-3' );
    await userEvent.click( btn );
    expect( mockScrollIntoView ).toHaveBeenCalled();
    mockScrollIntoView.mockReset();
} );
