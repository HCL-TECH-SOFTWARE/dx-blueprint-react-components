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
import { render, screen } from "@testing-library/react";
import DXProfileInfo from "./DXProfileInfo";
import { UserProfileExpandedArgs, UserProfileCollapsedArgs, UserProfileInfoNoImageArgs } from "./DXProfileInfo.stories";
import userEvent from "@testing-library/user-event";

//Desktop view
test( "If image src matches with the given property in DV", () => {
    let props = {
        ...UserProfileExpandedArgs,
        image: {
            url: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
            altText: "Profile Image custom value"
        },
    };
    render( <DXProfileInfo {...props} /> );
    let image = screen.getByTestId( "dxProfileInfoImage" ) as HTMLImageElement;
    expect( image.src ).toBe( props.image.url );
} );

test( "If image alt text matches with the given property in DV", () => {
    let props = {
        ...UserProfileExpandedArgs,
        image: {
            url: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
            altText: "Profile Image custom value"
        },
    };
    render( <DXProfileInfo {...props} /> );
    let image = screen.getByTestId( "dxProfileInfoImage" ) as HTMLImageElement;
    expect( image.alt ).toBe( props.image.altText );
} );

test( "If image alt text matches default value when not configured in DV", () => {
    let props = JSON.parse( JSON.stringify( UserProfileExpandedArgs ) );
    delete props.image.altText;
    render( <DXProfileInfo {...props} /> );
    let image = screen.getByTestId( "dxProfileInfoImage" ) as HTMLImageElement;
    expect( image.alt ).toBe( props.fullName + " profile image" );
} );

test( "when there is no picture, render avatar initials", () => {
    render( <DXProfileInfo {...UserProfileInfoNoImageArgs} /> );
    let splitName = UserProfileInfoNoImageArgs.fullName.split( " " );
    let initials = splitName[0].charAt( 0 ) + splitName[1].charAt( 0 );
    let imageContainer = screen.getByTestId( "dxProfileInfoProfileImage" );
    expect( imageContainer.firstChild ).toHaveClass( "dxProfileInfo__profileImage--avatar" );
    expect( imageContainer.firstChild ).toHaveTextContent( initials );
} );

test( "If fullName matches with the given property in DV", () => {
    render( <DXProfileInfo {...UserProfileExpandedArgs} /> );
    expect( screen.getByTestId( "dxProfileInfoFullName" ) ).toHaveTextContent( UserProfileExpandedArgs.fullName );
} );

test( "If jobTitle matches with the given property in DV", () => {
    let props = {
        ...UserProfileExpandedArgs,
        jobTitle: "Designer",
    };
    render( <DXProfileInfo {...props} /> );
    expect( screen.getByTestId( "dxProfileInfoJobTitle" ) ).toHaveTextContent( props.jobTitle );
} );

test( "If department matches with the given property in DV", () => {
    let props = {
        ...UserProfileExpandedArgs,
        department: "Delivery and Operations",
    };
    render( <DXProfileInfo {...props} /> );
    expect( screen.getByTestId( "dxProfileInfoDepartment" ) ).toHaveTextContent( props.department );
} );

test( "If location matches with the given property in DV", () => {
    let props = {
        ...UserProfileExpandedArgs,
        location: "Monterrey N.L.",
    };
    render( <DXProfileInfo {...props} /> );
    expect( screen.getByTestId( "dxProfileInfoLocation" ) ).toHaveTextContent( props.location );
} );

test( "If office matches with the given property in DV", () => {
    let props = {
        ...UserProfileExpandedArgs,
        office: "HCL Software Office"
    };
    render( <DXProfileInfo {...UserProfileExpandedArgs} /> );
    expect( screen.getByTestId( "dxProfileInfoOffice" ) ).toHaveTextContent( props.office );
} );

test( "If email matches with the given property in DV", () => {
    render( <DXProfileInfo {...UserProfileExpandedArgs} /> );
    expect( screen.getByTestId( "dxProfileInfoEmail" ) ).toHaveTextContent( UserProfileExpandedArgs.email?.label as string );
} );

test( "If phone matches with the given property in DV", () => {
    render( <DXProfileInfo {...UserProfileExpandedArgs} /> );
    expect( screen.getByTestId( "dxProfileInfoPhone" ) ).toHaveTextContent( UserProfileExpandedArgs.phone?.label as string );
} );

test( "If primary button text matches with the given property in DV", () => {
    let props = JSON.parse( JSON.stringify( UserProfileExpandedArgs ) );
    props.primaryButton.label = "Custom button label";
    render( <DXProfileInfo {...props} /> );
    expect( screen.getByTestId( "dxProfileInfoFirstButton" ) ).toHaveTextContent( props.primaryButton.label );
} );

test( "If primary button text matches default value when not given in DV", () => {
    let props = JSON.parse( JSON.stringify( UserProfileExpandedArgs ) );
    delete props.primaryButton.label;
    render( <DXProfileInfo {...props} /> );
    expect( screen.getByTestId( "dxProfileInfoFirstButton" ) ).toHaveTextContent( "Connect on Teams" );
} );

test( "If the user clicks the primary button its method is executed", async () => {
    let mockFunction = jest.fn();
    let props = JSON.parse( JSON.stringify( UserProfileExpandedArgs ) );
    props.primaryButton.onClick = mockFunction;
    render( <DXProfileInfo {...props} /> );
    const btn = screen.getByTestId( 'dxProfileInfoFirstButton' );
    await userEvent.click( btn );
    expect( mockFunction ).toHaveBeenCalledTimes( 1 );
    mockFunction.mockReset();
} );

test( "If secondary button text matches with the given property in DV", () => {
    let props = JSON.parse( JSON.stringify( UserProfileExpandedArgs ) );
    props.secondaryButton.label = "Custom button label";
    render( <DXProfileInfo {...props} /> );
    expect( screen.getByTestId( "dxProfileInfoSecondButton" ) ).toHaveTextContent( props.secondaryButton.label );
} );

test( "If secondary button text matches default value when not given in DV", () => {
    let props = JSON.parse( JSON.stringify( UserProfileExpandedArgs ) );
    delete props.secondaryButton.label;
    render( <DXProfileInfo {...props} /> );
    expect( screen.getByTestId( "dxProfileInfoSecondButton" ) ).toHaveTextContent( "Give rewards" );
} );

test( "If the user clicks the secondary button the window.open method is executed", async () => {
    const spyWindowOpen = jest.spyOn( window, 'open' );
    spyWindowOpen.mockImplementation( jest.fn() );
    render( <DXProfileInfo {...UserProfileExpandedArgs} /> );
    const btn = screen.getByTestId( 'dxProfileInfoSecondButton' );
    await userEvent.click( btn );
    expect( spyWindowOpen ).toHaveBeenCalledTimes( 1 );
} );

test( "if no buttons are configured the buttons section is not rendered", () => {
    let props = JSON.parse( JSON.stringify( UserProfileExpandedArgs ) );
    delete props.primaryButton;
    delete props.secondaryButton;

    render( <DXProfileInfo {...props} /> );
    expect( document.querySelector( '.dxProfileInfo__buttonsSection' ) ).toBeNull();
} );

test( "If address matches with the given property in DV", () => {
    render( <DXProfileInfo {...UserProfileExpandedArgs} /> );
    expect( screen.getByTestId( "dxProfileInfoAddress" ) ).toHaveTextContent( UserProfileExpandedArgs.address );
} );

test( "If Google link matches with the result", () => {
    let props = {
        ...UserProfileExpandedArgs,
        address: "Torre Martel III, Prolongación Los Soles Poniente #200, Piso 3, Col, Valle Oriente, 66260 San Pedro Garza García, N.L.",
    };
    render( <DXProfileInfo {...props} /> );
    let anchor = screen.getByTestId( "dxProfileInfo__maps" ) as HTMLAnchorElement;
    let decoded = decodeURIComponent( anchor.href.replace( "https://www.google.com/maps/search/", "" ) );
    expect( decoded ).toBe( props.address );
} );

test( "if social presence is rendered with custom title when set", () => {
    render( <DXProfileInfo {...UserProfileExpandedArgs} /> );
    let socialSection = document.querySelector( '.dxProfileInfo__socialNetworkSection' ) as HTMLElement;
    let socialSectionTitle = document.querySelector( '.dxSocialPresence__title' );

    expect( socialSection ).toBeInTheDocument();
    expect( socialSectionTitle ).toHaveTextContent( UserProfileExpandedArgs.socialPresence?.title as string );
} );

test( "if social presence is rendered with default title when not set", () => {
    let props = JSON.parse( JSON.stringify( UserProfileExpandedArgs ) );
    delete props.socialPresence.title;
    render( <DXProfileInfo {...props} /> );
    let socialSection = document.querySelector( '.dxProfileInfo__socialNetworkSection' ) as HTMLElement;
    let socialSectionTitle = document.querySelector( '.dxSocialPresence__title' );

    expect( socialSection ).toBeInTheDocument();
    expect( socialSectionTitle ).toHaveTextContent( "Contact me" );
} );

//Mobile View
test( "If fullName matches with the given property in MV", () => {
    Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 768 } );
    render( <DXProfileInfo {...UserProfileExpandedArgs} /> );
    expect( screen.getByTestId( "dxProfileInfoFullName" ) ).toHaveTextContent( UserProfileExpandedArgs.fullName );

    Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 1080 } );
} );

test( "If jobTitle matches with the given property in MV", () => {
    Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 768 } );
    let props = {
        ...UserProfileExpandedArgs,
        jobTitle: "Designer",
    };
    render( <DXProfileInfo {...UserProfileExpandedArgs} /> );
    expect( screen.getByTestId( "dxProfileInfoJobTitle" ) ).toHaveTextContent( props.jobTitle );

    Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 1080 } );
} );

test( "If enableCollapsed property is true, it will display collapsed button", async () => {
    render( <DXProfileInfo {...UserProfileCollapsedArgs} /> );
    let button = screen.getByTestId( 'dxProfileInfoShowInformation' );
    let icon = screen.getByTestId( 'dxProfileInfoToggleIcon' );
    expect( icon ).toHaveClass( 'dxProfileInfo__icon' );
    await userEvent.click( button );
    expect( icon ).toHaveClass( 'dxProfileInfo__icon--open' );
} );

test( "If you tap on the Edit Image button it should run the custom function", async () => {
    let mockFunction = jest.fn();
    let props = UserProfileExpandedArgs;
    props.editAction = mockFunction;

    render( <DXProfileInfo {...props} /> );

    let button = screen.getByTestId( 'dxProfileInfoEditImageButton' );
    expect( button ).toBeInTheDocument();
    await userEvent.click( button );

    expect( mockFunction ).toHaveBeenCalled();
} );
