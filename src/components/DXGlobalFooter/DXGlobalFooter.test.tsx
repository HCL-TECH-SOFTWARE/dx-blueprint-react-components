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
import DXGlobalFooter from "./DXGlobalFooter";

test( 'if no target passed the link will have a default value of _self', () => {
    let testProps = {
        copyright: "Copyright © 2024 HCL Technologies Limited",
        primaryLinks: [
            { url: "https://hcl-software.com", label: "Terms of use" },
        ]
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXGlobalFooter {...testProps} /> );
    const linkElement = ( getByTestId( "primary-link" ) as HTMLAnchorElement ).target;
    expect( linkElement ).toEqual( "_self" );
} );

test( 'if an empty target passed the link will have a default value of _self', () => {
    let testProps = {
        copyright: "Copyright © 2024 HCL Technologies Limited",
        primaryLinks: [
            { url: "https://hcl-software.com", label: "Terms of use", target: "" },
        ]
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXGlobalFooter {...testProps} /> );
    const linkElement = ( getByTestId( "primary-link" ) as HTMLAnchorElement ).target;
    expect( linkElement ).toEqual( "_self" );
} );

test( 'if an unvalid target passed the link will have a default value of _self', () => {
    let testProps = {
        copyright: "Copyright © 2024 HCL Technologies Limited",
        primaryLinks: [
            { url: "https://hcl-software.com", label: "Terms of use", target: "_newTab" },
        ]
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXGlobalFooter {...testProps} /> );
    const linkElement = ( getByTestId( "primary-link" ) as HTMLAnchorElement ).target;
    expect( linkElement ).toEqual( "_self" );
} );

test( 'if a valid target passed the link will have the same value', () => {
    let testProps = {
        copyright: "Copyright © 2024 HCL Technologies Limited",
        primaryLinks: [
            { url: "https://hcl-software.com", label: "Terms of use", target: "_blank" },
        ]
    };
    const sentTarget = testProps.primaryLinks[0].target;
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXGlobalFooter {...testProps} /> );
    const linkElement = ( getByTestId( "primary-link" ) as HTMLAnchorElement ).target;
    expect( linkElement ).toEqual( sentTarget );
} );

test( 'if a valid target passed the primary link will have an icon', () => {
    let testProps = {
        copyright: "Copyright © 2024 HCL Technologies Limited",
        primaryLinks: [
            { url: "https://hcl-software.com", label: "Terms of use", target: "_blank" },
        ]
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXGlobalFooter {...testProps} /> );
    const linkElement = getByTestId( "primary-link" ).childNodes[1];
    expect( linkElement.nodeName ).toEqual( "I" );
} );

test( 'if a valid target passed the secondary link will have an icon', () => {
    let testProps = {
        copyright: "Copyright © 2024 HCL Technologies Limited",
        secondaryLinks: [
            { url: "https://hcl-software.com", label: "Terms of use", target: "_blank" },
        ]
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXGlobalFooter {...testProps} /> );
    const linkElement = getByTestId( "secondary-link" ).childNodes[1];
    expect( linkElement.nodeName ).toEqual( "I" );
} );

test( 'if no primaryLinks passed a message "There is no primary links" will appear', () => {
    let testProps = {
        logo: "https://cdn-icons-png.flaticon.com/512/7974/7974445.png",
        title: "HCL Library",
        copyright: "Copyright © 2024 HCL Technologies Limited",
        secondaryLinks: [
            { url: "https://hcl-software.com", label: "Terms of use" },
            { url: "https://hcl-software.com", label: "Privacy" },
            { url: "https://hcl-software.com", label: "Copyright" },
            { url: "https://hcl-software.com", label: "Trademarks" },
            { url: "https://hcl-software.com", label: "Accesibility" },
        ]
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    render( <DXGlobalFooter {...testProps} /> );

    expect( screen.getByText( /There is no primary links/i ) ).toBeInTheDocument();
} );

test( 'if no secondaryLinks passed a message "There is no secondary links" will appear', () => {
    let testProps = {
        logo: "https://cdn-icons-png.flaticon.com/512/7974/7974445.png",
        title: "HCL Library",
        copyright: "Copyright © 2024 HCL Technologies Limited",
        primaryLinks: [
            { url: "https://hcl-software.com", label: "Terms of use" },
            { url: "https://hcl-software.com", label: "Privacy" },
            { url: "https://hcl-software.com", label: "Copyright" },
            { url: "https://hcl-software.com", label: "Trademarks" },
            { url: "https://hcl-software.com", label: "Accesibility" },
        ]
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    render( <DXGlobalFooter {...testProps} /> );

    expect( screen.getByText( /There is no secondary links/i ) ).toBeInTheDocument();
} );

test( 'if no copyright passed a message "There is no copyright" will appear', () => {
    let testProps = {
        title: "HCL Library",
        primaryLinks: [
            { url: "https://hcl-software.com", label: "Terms of use" },
            { url: "https://hcl-software.com", label: "Privacy" },
            { url: "https://hcl-software.com", label: "Copyright" },
            { url: "https://hcl-software.com", label: "Trademarks" },
            { url: "https://hcl-software.com", label: "Accesibility" },
        ],
        secondaryLinks: [
            { url: "https://hcl-software.com", label: "Terms of use" },
            { url: "https://hcl-software.com", label: "Privacy" },
            { url: "https://hcl-software.com", label: "Copyright" },
            { url: "https://hcl-software.com", label: "Trademarks" },
            { url: "https://hcl-software.com", label: "Accesibility" },
        ]
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    render( <DXGlobalFooter {...testProps} /> );

    expect( screen.getByText( /There is no copyright/i ) ).toBeInTheDocument();
} );

test( "if the component renders all the primaryLinks passed", () => {
    let testProps = {
        primaryLinks: [
            { url: "https://hcl-software.com", label: "Terms of use" },
            { url: "https://hcl-software.com", label: "Privacy" },
            { url: "https://hcl-software.com", label: "Copyright" },
            { url: "https://hcl-software.com", label: "Trademarks" },
            { url: "https://hcl-software.com", label: "Accesibility" },
        ]
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getAllByTestId } = render( <DXGlobalFooter {...testProps} /> );
    const renderedLinks = getAllByTestId( 'primary-link' ).map( link => link.textContent );
    const propLinks = testProps.primaryLinks.map( link => link.label );

    expect( renderedLinks ).toEqual( propLinks );
} );

test( "if the component renders all the secondaryLinks passed", () => {
    let testProps = {
        secondaryLinks: [
            { url: "https://hcl-software.com", label: "Terms of use" },
            { url: "https://hcl-software.com", label: "Privacy" },
            { url: "https://hcl-software.com", label: "Copyright" },
            { url: "https://hcl-software.com", label: "Trademarks" },
            { url: "https://hcl-software.com", label: "Accesibility" },
        ]
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getAllByTestId } = render( <DXGlobalFooter {...testProps} /> );
    const renderedLinks = getAllByTestId( 'secondary-link' ).map( link => link.textContent );
    const propLinks = testProps.secondaryLinks.map( link => link.label );

    expect( renderedLinks ).toEqual( propLinks );
} );

test( "if no url passed on the primaryLinks a # should be replacing it", () => {
    let testProps = {
        primaryLinks: [
            { url: "", label: "Terms of use" },
            { url: "https://hcl-software.com", label: "Privacy" },
            { url: "", label: "Copyright" },
            { url: "https://hcl-software.com", label: "Trademarks" },
            { url: "", label: "Accesibility" },
        ]
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getAllByTestId } = render( <DXGlobalFooter {...testProps} /> );
    const propsLinks = testProps.primaryLinks.filter( link => link.url === "" );
    const renderedLinks = getAllByTestId( 'primary-link' ).filter( link => link.getAttribute( 'href' ) === "#" );
    expect( renderedLinks.length ).toEqual( propsLinks.length );
} );

test( "if no url passed on the secondaryLinks a # should be replacing it", () => {
    let testProps = {
        secondaryLinks: [
            { url: "", label: "Terms of use" },
            { url: "https://hcl-software.com", label: "Privacy" },
            { url: "", label: "Copyright" },
            { url: "https://hcl-software.com", label: "Trademarks" },
            { url: "", label: "Accesibility" },
        ]
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getAllByTestId } = render( <DXGlobalFooter {...testProps} /> );
    const propsLinks = testProps.secondaryLinks.filter( link => link.url === "" );
    const renderedLinks = getAllByTestId( 'secondary-link' ).filter( link => link.getAttribute( 'href' ) === "#" );
    expect( renderedLinks.length ).toEqual( propsLinks.length );
} );

// Logo default and alt texts
test( "if no mobile logo passed, then it should only add the class d-block to the logo", () => {
    let testProps = {
        logo: "https://i.ibb.co/gW0mtMg/Logo-Wrapper-Desktop.png"
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXGlobalFooter {...testProps} /> );
    const logoClasses = getByTestId( "logo-test" ).classList;

    expect( logoClasses.contains( "d-block" ) && logoClasses.length === 1 ).toBe( true );
} );

test( "if mobile logo passed, then the default logo should hide on mobile and the mobile logo appear but hide on larger screens", () => {
    let testProps = {
        logo: "https://i.ibb.co/gW0mtMg/Logo-Wrapper-Desktop.png",
        logoMobile: "https://i.ibb.co/V2tZvjv/Logo-Wrapper-Mobile.png",
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXGlobalFooter {...testProps} /> );
    const logoClasses = ["d-none", "d-sm-none", "d-md-block"];
    const mobileClasses = ["d-block", "d-sm-none", "d-md-none"];
    const logo = getByTestId( "logo-test" ).classList;
    const mobile = getByTestId( "logo-mobile-test" ).classList;

    //Test if the length of both classes are the same
    expect( ( logoClasses.length === logo.length ) && ( mobileClasses.length === mobile.length ) ).toBe( true );

    // Test if both cases have the same classes
    for ( let i = 0, length = logoClasses.length; i < length; i++ ) {
        expect( logoClasses[i] === logo[i] ).toBe( true );
    }
    for ( let i = 0, length = mobileClasses.length; i < length; i++ ) {
        expect( mobileClasses[i] === mobile[i] ).toBe( true );
    }
} );

test( "if no alt text for the logo passed, it should assign 'footer-logo'", () => {
    let testProps = {
        logo: "https://i.ibb.co/gW0mtMg/Logo-Wrapper-Desktop.png"
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXGlobalFooter {...testProps} /> );
    const altLogo = getByTestId( "logo-test" ).getAttribute( "alt" );
    expect( altLogo ).toEqual( "footer-logo" );
} );

test( "if alt text for the logo passed, it should assign it", () => {
    let testProps = {
        logo: "https://i.ibb.co/gW0mtMg/Logo-Wrapper-Desktop.png",
        altLogo: "hcl-logo"
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXGlobalFooter {...testProps} /> );
    const altLogo = getByTestId( "logo-test" ).getAttribute( "alt" );
    const expectedLogo = testProps.altLogo;
    expect( altLogo ).toEqual( expectedLogo );
} );

test( "if no mobile logo alt text passed, then it should assign 'footer-logo-mobile'", () => {
    let testProps = {
        logoMobile: "https://i.ibb.co/V2tZvjv/Logo-Wrapper-Mobile.png",
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXGlobalFooter {...testProps} /> );
    const altLogo = getByTestId( "logo-mobile-test" ).getAttribute( "alt" );
    expect( altLogo ).toEqual( "footer-logo-mobile" );
} );

test( "if alt text for the mobile logo passed, it should assign it", () => {
    let testProps = {
        logoMobile: "https://i.ibb.co/V2tZvjv/Logo-Wrapper-Mobile.png",
        altMobile: "hcl-logo"
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXGlobalFooter {...testProps} /> );
    const altLogo = getByTestId( "logo-mobile-test" ).getAttribute( "alt" );
    const expectedAlt = testProps.altMobile;
    expect( altLogo ).toEqual( expectedAlt );
} );
