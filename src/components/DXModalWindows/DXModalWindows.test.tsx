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
import { render, screen, waitFor } from "@testing-library/react";
import DXModalWindows from "./DXModalWindows";
import { ModalWindowsArgs, DefaultExampleArgs, ModalWindowsIFrameArgs, ModalWindowsRichTextArgs } from "./DXModalWindows.stories";
import { itSupportsExtensionProps } from "../../testUtils/extensionContract";
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

itSupportsExtensionProps( ( extra ) => <DXModalWindows {...ModalWindowsArgs} {...extra} /> );

describe( "DXModalWindows with consumer extension props", () => {
    // Earlier tests in this file mock window.addEventListener without restoring it, which would stop the open-modal listener
    beforeEach( () => {
        jest.restoreAllMocks();
    } );

    // A local fixture: earlier tests mutate the shared story args, and closing modals of earlier tests can still be portaled on document.body
    const extensionModalProps = ( index: number ) => ( {
        index,
        title: `Extension modal ${index}`,
        text: "Extension modal text",
        secondaryButton: { label: "Cancel", onClick: () => {} },
    } );
    const findModal = async ( index: number ) =>
        ( await screen.findByText( `Extension modal ${index}` ) ).closest( '[data-testid="modal-windows"]' ) as HTMLElement;

    test( "opens with openModal, keeps className and ref on the wrapper and off the portaled modal, and Cancel closes it", async () => {
        const ref = React.createRef<HTMLDivElement>();
        const { container } = render( <DXModalWindows {...extensionModalProps( 91 )} openModal={true} ref={ref} className="bp-consumer" data-consumer="yes" /> );
        const modal = await findModal( 91 );
        const wrapper = container.firstElementChild as HTMLElement;
        expect( ref.current ).toBe( wrapper );
        expect( wrapper ).toHaveClass( "dxModalWindows", "bp-consumer" );
        expect( wrapper ).toHaveAttribute( "data-consumer", "yes" );
        // react-bootstrap renders the modal in a portal on document.body, outside the wrapper
        expect( wrapper.contains( modal ) ).toBe( false );
        expect( modal.closest( ".bp-consumer, [data-consumer]" ) ).toBeNull();
        await userEvent.click( modal.querySelector( '[data-testid="cancel-button"]' ) as HTMLElement );
        await waitFor( () => expect( modal ).not.toBeInTheDocument() );
        expect( ref.current ).toBe( wrapper );
    } );

    test( "Escape still closes the modal when the consumer passes ref and className", async () => {
        const ref = React.createRef<HTMLDivElement>();
        render( <DXModalWindows {...extensionModalProps( 92 )} openModal={true} ref={ref} className="bp-consumer" /> );
        const modal = await findModal( 92 );
        await userEvent.keyboard( "{Escape}" );
        await waitFor( () => expect( modal ).not.toBeInTheDocument() );
    } );

    test( "the open-modal window event still opens the modal when a consumer ref is passed", async () => {
        const ref = React.createRef<HTMLDivElement>();
        render( <DXModalWindows {...extensionModalProps( 93 )} openModal={false} ref={ref} /> );
        expect( screen.queryByText( "Extension modal 93" ) ).toBeNull();
        act( () => {
            window.dispatchEvent( new window.Event( "open-modal-93" ) );
        } );
        expect( await findModal( 93 ) ).toBeInTheDocument();
        expect( ref.current ).toHaveClass( "dxModalWindows" );
    } );
} );
