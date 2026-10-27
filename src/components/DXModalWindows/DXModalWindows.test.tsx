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
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import DXModalWindows from "./DXModalWindows";
import { ModalWindowsArgs, DefaultExampleArgs, ModalWindowsIFrameArgs, ModalWindowsRichTextArgs } from "./DXModalWindows.stories";
import userEvent from "@testing-library/user-event";

describe( "ModalWindows component", () => {

    const mockEvent = ( status: string ) => {
        const events = {};
        jest.spyOn( window, 'addEventListener' ).mockImplementation( ( event, handle ) => {
            // @ts-ignore
            events[event] = handle;
        } );
        const goOffline = new window.Event( status );
        act( () => {
            window.dispatchEvent( goOffline );
        } );
    };

    test( "Full Rendering ModalWindows when is opened with openModal property ", async () => {
        let props = ModalWindowsArgs;
        props.openModal = true;
        render( <DXModalWindows {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 160 ) );
        } );

        const mainContent = document.querySelector( '.modal-content' );
        const header = document.querySelector( '.modal-header' );
        const body = document.querySelector( '.modal-body' );
        const footer = document.querySelector( '.modal-footer' );
        expect( screen.getByTestId( "modal-windows" ) ).toBeInTheDocument();
        expect( mainContent ).toBeInTheDocument();
        expect( header ).toBeInTheDocument();
        expect( body ).toBeInTheDocument();
        expect( footer ).toBeInTheDocument();
    } );

    test( "Full Rendering ModalWindows when is opened with the open-modal event", async () => {
        render( <DXModalWindows {...DefaultExampleArgs} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 160 ) );
        } );
        mockEvent( 'open-modal-' + DefaultExampleArgs.index );
        await act( async () => {
            await new Promise( r => setTimeout( r, 160 ) );
        } );

        const mainContent = document.querySelector( '.modal-content' );
        const header = document.querySelector( '.modal-header' );
        const body = document.querySelector( '.modal-body' );
        expect( screen.getByTestId( "modal-windows" ) ).toBeInTheDocument();
        expect( mainContent ).toBeInTheDocument();
        expect( header ).toBeInTheDocument();
        expect( body ).toBeInTheDocument();
    } );

    test( "When the modal is opened and click on Done button, the modal is closed and sent an action", async () => {
        let mockDoneAction = jest.fn();
        let props = ModalWindowsArgs;
        props.openModal = true;
        render( <DXModalWindows {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 160 ) );
        } );
        expect( screen.getByTestId( "modal-windows" ) ).toBeInTheDocument();
        expect( document.querySelector( '[data-testid="done-button"]' ) ).toBeInTheDocument();
        const doneButton = document.querySelector( '[data-testid="done-button"]' ) as HTMLElement;
        doneButton.onclick = mockDoneAction;
        await userEvent.click( doneButton );

        expect( mockDoneAction ).toBeCalled();
        await act( async () => {
            await new Promise( r => setTimeout( r, 160 ) );
        } );
        const modal = document.querySelector( '[data-testid="modal-windows"]' );
        expect( modal ).toBeNull();
    } );

    test( "When the modal is opened and click on Cancel button, the modal is closed and sent an action", async () => {
        let mockCancelAction = jest.fn();
        render( <DXModalWindows {...ModalWindowsArgs} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 160 ) );
        } );
        expect( screen.getByTestId( "modal-windows" ) ).toBeInTheDocument();
        expect( document.querySelector( '[data-testid="cancel-button"]' ) ).toBeInTheDocument();
        const cancelButton = document.querySelector( '[data-testid="cancel-button"]' ) as HTMLElement;
        cancelButton.onclick = mockCancelAction;
        await userEvent.click( cancelButton );

        expect( mockCancelAction ).toBeCalled();
        await act( async () => {
            await new Promise( r => setTimeout( r, 160 ) );
        } );
        const modal = document.querySelector( '[data-testid="modal-windows"]' );
        expect( modal ).toBeNull();
    } );

    test( "When the modal is opened and click on More Info button, the modal is closed and sent an action", async () => {
        let mockMoreInfoAction = jest.fn();
        let props = ModalWindowsArgs;
        props.openModal = true;
        render( <DXModalWindows {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 160 ) );
        } );
        expect( screen.getByTestId( "modal-windows" ) ).toBeInTheDocument();
        expect( document.querySelector( '[data-testid="moreInfo-button"]' ) ).toBeInTheDocument();
        const moreInfoButton = document.querySelector( '[data-testid="moreInfo-button"]' ) as HTMLElement;
        moreInfoButton.onclick = mockMoreInfoAction;
        await userEvent.click( moreInfoButton );

        expect( mockMoreInfoAction ).toBeCalled();
        await act( async () => {
            await new Promise( r => setTimeout( r, 160 ) );
        } );
        const modal = document.querySelector( '[data-testid="modal-windows"]' );
        expect( modal ).toBeNull();
    } );

    test( "When modal has no footer buttons, no footer is rendered", async () => {
        let props = ModalWindowsArgs;
        props.openModal = true;
        delete props['primaryButton'];
        delete props['secondaryButton'];
        delete props['unstyledButton'];

        render( <DXModalWindows {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 160 ) );
        } );

        expect( screen.getByTestId( "modal-windows" ) ).toBeInTheDocument();
        const footer = document.querySelector( '.modal-footer' );
        expect( footer ).toBeNull();
    } );

    test( "When modal has an image, it is rendered as expected", async () => {
        let props = ModalWindowsArgs;
        props.openModal = true;
        render( <DXModalWindows {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 160 ) );
        } );

        let image = screen.getByTestId( "modal-image" ) as HTMLImageElement;
        expect( image ).toBeInTheDocument();
        expect( image.src ).toBe( ModalWindowsArgs.image?.url );
        expect( image.alt ).toBe( ModalWindowsArgs.image?.altText );
    } );

    test( "When modal has an image with no alt text, default content is added", async () => {
        let props = ModalWindowsArgs;
        props.openModal = true;
        if ( props.image ) {
            delete props.image['altText'];
        }

        render( <DXModalWindows {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 160 ) );
        } );

        let image = screen.getByTestId( "modal-image" ) as HTMLImageElement;
        expect( image.alt ).toBe( props.title + ' modal image' );
    } );

    test( "When modal has an iframe, iframe class is added", async () => {
        let props = ModalWindowsIFrameArgs;
        props.openModal = true;
        render( <DXModalWindows {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 160 ) );
        } );

        let body = document.querySelector( '.modal-body' );
        expect( body ).toHaveClass( 'modal-body-iframe' );
    } );

    test( "When modal disableDisplayFlex, disableDisplayFlex class is added", async () => {
        let props = ModalWindowsRichTextArgs;
        props.openModal = true;
        render( <DXModalWindows {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 160 ) );
        } );

        let body = document.querySelector( '.modal-body' );
        expect( body ).toHaveClass( 'dxModalWindows__notDisplayFlex' );
    } );

    test( "When modal doesn't have an iframe, iframe class is not added", async () => {
        let props = ModalWindowsArgs;
        props.openModal = true;
        render( <DXModalWindows {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 160 ) );
        } );

        let body = document.querySelector( '.modal-body' );
        expect( body ).not.toHaveClass( 'modal-body-iframe' );
    } );

    test( "If openModal is false, the modal container won't show", async () => {
        let props = ModalWindowsArgs;
        props.openModal = false;

        render( <DXModalWindows {...props} /> );
        await act( async () => {
            await new Promise( r => setTimeout( r, 160 ) );
        } );

        const modal = document.querySelector( '[data-testid="modal-windows"]' );
        expect( modal ).toBeNull();
    } );

} );
