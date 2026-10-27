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
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import DXSocialShare from "./DXSocialShare";

const pageDetails = {
    url: "https://hcl-software.com",
    pageTitle: "HCL Software",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est turpis, maximus in risus eu, sollicitudin molestie felis. Nam mauris diam, interdum ullamcorper dolor in, cursus gravida nisi"
};

const bigSize = "big" as const;
const smallSize = "small" as const;

// Testing default component
test( "If the user does not pass the size prop, it should only add the class 'dxSocialShare__container'", () => {
    const socialShareProps = {
        socialMediaActions: {
            facebook: { display: true },
            linkedinda: { display: true },
            twitter: { display: true }
        },
        pageDetails: pageDetails
    };
    render( <DXSocialShare {...socialShareProps} /> );
    const socialShareRender = screen.getByTestId( 'dxSocialShare' );
    expect( socialShareRender ).toHaveClass( 'dxSocialShare__container' );
} );

// Testing Social Presence component
test( "If the user pass small on the size prop, it should add the classes 'dxSocialShare__container dxSocialShare--small'", () => {
    const socialShareProps = {
        size: smallSize,
        socialMediaActions: {
            facebook: { display: true },
            linkedinda: { display: true },
            twitter: { display: true }
        },
        pageDetails: pageDetails
    };
    render( <DXSocialShare {...socialShareProps} /> );
    const socialShareRender = screen.getByTestId( 'dxSocialShare' );
    expect( socialShareRender ).toHaveClass( 'dxSocialShare__container dxSocialShare--small' );
} );

//Rendering Social Share component with title
test( "If the user pass big on the size prop, it should not add the class 'dxSocialShare--small'", () => {
    const socialShareProps = {
        size: bigSize,
        title: "Share this page:",
        socialMediaActions: {
            facebook: { display: true },
            linkedin: { display: true },
            twitter: { display: true }
        },
        pageDetails: pageDetails
    };
    render( <DXSocialShare {...socialShareProps} /> );
    const socialShareRender = screen.getByTestId( 'dxSocialShare' );
    expect( socialShareRender ).not.toHaveClass( 'dxSocialShare--small' );
} );

// Rendering Social Share component without title
test( "Rendering Social Share component without title", () => {
    const socialShareProps = {
        size: smallSize,
        socialMediaActions: {
            facebook: { display: true },
            linkedin: { display: true },
            twitter: { display: true }
        },
        pageDetails: pageDetails
    };
    render( <DXSocialShare {...socialShareProps} /> );

    const componentTitle = document.querySelectorAll( '.dxSocialShare__title' );
    expect( componentTitle ).toHaveLength( 0 );
} );

//Testing rendering buttons
test( "If socialMediaActions.linkedin.display equals true shows Linkedin button", () => {
    const socialShareProps = {
        size: smallSize,
        socialMediaActions: {
            linkedin: { display: true },

        },
        pageDetails: pageDetails
    };

    const { queryByTestId } = render( <DXSocialShare {...socialShareProps} /> );
    const button = queryByTestId( "dxSocialShare-linkedin" );
    expect( button ).toBeInTheDocument();

    const linkedinIcon = button?.querySelector( "i.bi-linkedin" );
    expect( linkedinIcon ).toBeInTheDocument();
} );

test( "If socialMediaActions.linkedin.display equals false does not show Linkedin button", () => {
    const socialShareProps = {
        size: smallSize,
        socialMediaActions: {
            linkedin: { display: false },
        },
        pageDetails: pageDetails
    };

    const { queryByTestId } = render( <DXSocialShare {...socialShareProps} /> );
    const button = queryByTestId( "dxSocialShare-linkedin" );
    expect( button ).not.toBeInTheDocument();
} );

test( "If socialMediaActions.twitter.display equals true shows Twitter button", () => {
    const socialShareProps = {
        size: smallSize,
        socialMediaActions: {
            twitter: { display: true },

        },
        pageDetails: pageDetails
    };

    const { queryByTestId } = render( <DXSocialShare {...socialShareProps} /> );
    const button = queryByTestId( "dxSocialShare-twitter" );
    expect( button ).toBeInTheDocument();

    const twitterIcon = button?.querySelector( "i.bi-twitter-x" );
    expect( twitterIcon ).toBeInTheDocument();
} );

test( "If socialMediaActions.twitter.display equals false does not show Twitter button", () => {
    const socialShareProps = {
        size: smallSize,
        socialMediaActions: {
            twitter: { display: false },
        },
        pageDetails: pageDetails
    };

    const { queryByTestId } = render( <DXSocialShare {...socialShareProps} /> );
    const button = queryByTestId( "dxSocialShare-twitter" );
    expect( button ).not.toBeInTheDocument();
} );

test( "If socialMediaActions.facebook.display equals true shows Facebook button", () => {
    const socialShareProps = {
        size: smallSize,
        socialMediaActions: {
            facebook: { display: true },

        },
        pageDetails: pageDetails
    };

    const { queryByTestId } = render( <DXSocialShare {...socialShareProps} /> );
    const button = queryByTestId( "dxSocialShare-facebook" );
    expect( button ).toBeInTheDocument();

    const facebookIcon = button?.querySelector( "i.bi-facebook" );
    expect( facebookIcon ).toBeInTheDocument();
} );

test( "If socialMediaActions.facebook.display equals false does not show Facebook button", () => {
    const socialShareProps = {
        size: smallSize,
        socialMediaActions: {
            facebook: { display: false },
        },
        pageDetails: pageDetails
    };

    const { queryByTestId } = render( <DXSocialShare {...socialShareProps} /> );
    const button = queryByTestId( "dxSocialShare-facebook" );
    expect( button ).not.toBeInTheDocument();
} );

//Testing default click event of action buttons
test( "Facebook Button-> Testing default click event'", async () => {
    const spyWindowOpen = jest.spyOn( window, 'open' );
    spyWindowOpen.mockImplementation( jest.fn() );

    const socialShareProps = {
        size: smallSize,
        socialMediaActions: {
            facebook: { display: true },
        },
        pageDetails: pageDetails
    };
    render( <DXSocialShare {...socialShareProps} /> );
    const button = screen.getByTestId( 'dxSocialShare-facebook' );
    await userEvent.click( button );

    expect( spyWindowOpen ).toHaveBeenCalledTimes( 1 );
    spyWindowOpen.mockRestore();
} );

test( "Linkedin Button-> Testing default click event'", async () => {
    const spyWindowOpen = jest.spyOn( window, 'open' );
    spyWindowOpen.mockImplementation( jest.fn() );

    const socialShareProps = {
        size: smallSize,
        socialMediaActions: {
            linkedin: { display: true },
        },
        pageDetails: pageDetails
    };
    render( <DXSocialShare {...socialShareProps} /> );
    const button = screen.getByTestId( 'dxSocialShare-linkedin' );
    await userEvent.click( button );

    expect( spyWindowOpen ).toHaveBeenCalledTimes( 1 );
    spyWindowOpen.mockRestore();
} );

test( "Twitter Button-> Testing default click event'", async () => {
    const spyWindowOpen = jest.spyOn( window, 'open' );
    spyWindowOpen.mockImplementation( jest.fn() );

    const socialShareProps = {
        size: smallSize,
        socialMediaActions: {
            twitter: { display: true },
        },
        pageDetails: pageDetails
    };
    render( <DXSocialShare {...socialShareProps} /> );
    const button = screen.getByTestId( 'dxSocialShare-twitter' );
    await userEvent.click( button );

    expect( spyWindowOpen ).toHaveBeenCalledTimes( 1 );
    spyWindowOpen.mockRestore();
} );

//Testing override click event of action buttons
test( "Facebook Button-> Testing override click event'", async () => {
    let mockFunction = jest.fn();
    const socialShareProps = {
        size: smallSize,
        socialMediaActions: {
            facebook: { display: true, onClick: mockFunction },
        },
        pageDetails: pageDetails
    };
    render( <DXSocialShare {...socialShareProps} /> );
    const button = screen.getByTestId( 'dxSocialShare-facebook' );
    await userEvent.click( button );
    expect( mockFunction ).toBeCalled();
} );

test( "Linkedin Button-> Testing override click event'", async () => {
    let mockFunction = jest.fn();
    const socialShareProps = {
        size: smallSize,
        socialMediaActions: {
            linkedin: { display: true, onClick: mockFunction },
        },
        pageDetails: pageDetails
    };
    render( <DXSocialShare {...socialShareProps} /> );
    const button = screen.getByTestId( 'dxSocialShare-linkedin' );
    await userEvent.click( button );
    expect( mockFunction ).toBeCalled();
} );

test( "Twitter Button-> Testing override click event'", async () => {
    let mockFunction = jest.fn();
    const socialShareProps = {
        size: smallSize,
        socialMediaActions: {
            twitter: { display: true, onClick: mockFunction },
        },
        pageDetails: pageDetails
    };
    render( <DXSocialShare {...socialShareProps} /> );
    const button = screen.getByTestId( 'dxSocialShare-twitter' );
    await userEvent.click( button );
    expect( mockFunction ).toBeCalled();
} );

test( "If the user pass the title prop and small on the size, the title should be null", () => {
    const socialShareProps = {
        size: bigSize,
        socialMediaActions: {
            twitter: { display: true, onClick: function () {} },
        },
        pageDetails: pageDetails
    };
    const { container } = render( <DXSocialShare {...socialShareProps} /> );
    let title = container.querySelector( ".dxSocialShare__title" );
    expect( title ).toBeNull();
} );

test( "If the user pass true on the light prop, the component should have the color style set to var(--white)", () => {
    const socialShareProps = {
        size: bigSize,
        title: "Share this page:",
        socialMediaActions: {
            facebook: { display: true },
            linkedin: { display: true },
            twitter: { display: true }
        },
        pageDetails: pageDetails,
        light: true
    };
    render( <DXSocialShare {...socialShareProps} /> );
    const socialShareRender = screen.getByTestId( 'dxSocialShare' );
    expect( socialShareRender ).toHaveStyle( { color: "var(--white)" } );
} );
