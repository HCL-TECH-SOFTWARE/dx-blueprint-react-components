import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import DXLocalFooter from "./DXLocalFooter";
import { localFooterPropsArgs, localFooterWithNoImgArgs } from "./DXLocalFooter.stories";

jest.mock( './mixins/_breakpoints.module.scss', () => {
    return {
        sm: "576px"
    };
} );

test( "If no logo is passed, then it should be null", () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { container } = render( <DXLocalFooter {...localFooterWithNoImgArgs} /> );
    const logo = container.querySelector( ".dxLocalFooter__title" );
    expect( logo ).toBeNull();
} );

test( "If a logo is passed, then it should be in the document", () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { container } = render( <DXLocalFooter {...localFooterPropsArgs} /> );
    const logo = container.querySelector( ".dxLocalFooter__title" );
    expect( logo ).toBeInTheDocument();
} );

test( 'if no info passed then it should not be render', () => {
    let testProps = {
        title: "",
        image: ""
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    render( <DXLocalFooter {...testProps} /> );
    let infoElement = screen.queryByTestId( 'info' );
    expect( infoElement ).toBeNull();
} );

test( 'if no sections passed then a message "There are no sections to display" showed', () => {
    let testProps = {
        title: "",
        image: ""
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    render( <DXLocalFooter {...testProps} /> );
    expect( screen.getByText( /There are no sections to display/i ) ).toBeInTheDocument();
} );

test( 'if sections passed then it will render the same amount of sections as in the props', () => {
    let testProps = {
        sections: [
            {
                name: "Site help",
                links: [
                    { url: "https://hcl-software.com", label: "help-ticket" },
                    { url: "https://hcl-software.com", label: "tips for using this site" },
                    { url: "https://hcl-software.com", label: "report accesibility issues" },
                ]
            },
            {
                name: "Legal",
                links: [
                    { url: "https://hcl-software.com", label: "Compliance headline" },
                    { url: "https://hcl-software.com", label: "Patent Agreement" },
                ]
            }
        ]
    };
    let propsSections = testProps.sections.length;
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getAllByTestId } = render( <DXLocalFooter {...testProps} /> );
    let renderedSections = getAllByTestId( 'section' ).length;

    expect( renderedSections ).toEqual( propsSections );
} );

test( "if no links passed on the sections a message 'There are no links' will show", () => {
    let testProps = {
        info: {
            section: "students services center",
            address: "420 Road Y Drive, (Avenue x Pass) Amarillo TX 79101",
            phone: "806-555-5555",
            links: [
                { url: "https://hcl-software.com", label: "Campus Map" },
                { url: "https://hcl-software.com", label: "Contact Us" }
            ]
        },
        sections: [
            {
                name: "Site help",
                links: []
            }
        ]
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    render( <DXLocalFooter {...testProps} /> );
    expect( screen.getByText( /There are no links/i ) ).toBeInTheDocument();
} );

// Target Logic
test( "If no target passed into the info links, the default value should be _self", () => {
    let testProps = {
        info: {
            section: "students services center",
            address: "420 Road Y Drive, (Avenue x Pass) Amarillo TX 79101",
            phone: "806-555-5555",
            links: [
                { url: "https://hcl-software.com", label: "Campus Map" }
            ]
        },
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXLocalFooter {...testProps} /> );
    const linkRender = ( getByTestId( "info-links" ) as HTMLAnchorElement ).target;
    expect( linkRender ).toEqual( "_self" );
} );

test( "If no target passed into the section links, the default value should be _self", () => {
    let testProps = {
        sections: [
            {
                name: "Site help",
                links: [
                    { url: "https://hcl-software.com", label: "Compliance headline" },
                ]
            }
        ]
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXLocalFooter {...testProps} /> );
    const linkRender = ( getByTestId( "section-links" ) as HTMLAnchorElement ).target;
    expect( linkRender ).toEqual( "_self" );
} );

test( "If an empty target passed into the info links, the default value should be _self", () => {
    let testProps = {
        info: {
            section: "students services center",
            address: "420 Road Y Drive, (Avenue x Pass) Amarillo TX 79101",
            phone: "806-555-5555",
            links: [
                { url: "https://hcl-software.com", label: "Campus Map", target: "" }
            ]
        },
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXLocalFooter {...testProps} /> );
    const linkRender = ( getByTestId( "info-links" ) as HTMLAnchorElement ).target;
    expect( linkRender ).toEqual( "_self" );
} );

test( "If an empty target passed into the section links, the default value should be _self", () => {
    let testProps = {
        sections: [
            {
                name: "Site help",
                links: [
                    { url: "https://hcl-software.com", label: "Compliance headline", target: "" },
                ]
            }
        ]
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXLocalFooter {...testProps} /> );
    const linkRender = ( getByTestId( "section-links" ) as HTMLAnchorElement ).target;
    expect( linkRender ).toEqual( "_self" );
} );

test( "If an unvalid target passed into the info links, the default value should be _self", () => {
    let testProps = {
        info: {
            section: "students services center",
            address: "420 Road Y Drive, (Avenue x Pass) Amarillo TX 79101",
            phone: "806-555-5555",
            links: [
                { url: "https://hcl-software.com", label: "Campus Map", target: "_newTab" }
            ]
        },
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXLocalFooter {...testProps} /> );
    const linkRender = ( getByTestId( "info-links" ) as HTMLAnchorElement ).target;
    expect( linkRender ).toEqual( "_self" );
} );

test( "If an unvalid target passed into the section links, the default value should be _self", () => {
    let testProps = {
        sections: [
            {
                name: "Site help",
                links: [
                    { url: "https://hcl-software.com", label: "Compliance headline", target: "_newTab" },
                ]
            }
        ]
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXLocalFooter {...testProps} /> );
    const linkRender = ( getByTestId( "section-links" ) as HTMLAnchorElement ).target;
    expect( linkRender ).toEqual( "_self" );
} );

test( "If a valid target passed into the info links, the value should be same", () => {
    let testProps = {
        info: {
            section: "students services center",
            address: "420 Road Y Drive, (Avenue x Pass) Amarillo TX 79101",
            phone: "806-555-5555",
            links: [
                { url: "https://hcl-software.com", label: "Campus Map", target: "_blank" }
            ]
        },
    };
    const sentTarget = testProps.info.links[0].target;
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXLocalFooter {...testProps} /> );
    const linkRender = ( getByTestId( "info-links" ) as HTMLAnchorElement ).target;
    expect( linkRender ).toEqual( sentTarget );
} );

test( "If a valid target passed into the section links, the value should be the same", () => {
    let testProps = {
        sections: [
            {
                name: "Site help",
                links: [
                    { url: "https://hcl-software.com", label: "Compliance headline", target: "_blank" },
                ]
            }
        ]
    };
    const sentTarget = testProps.sections[0].links[0].target;
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXLocalFooter {...testProps} /> );
    const linkRender = ( getByTestId( "section-links" ) as HTMLAnchorElement ).target;
    expect( linkRender ).toEqual( sentTarget );
} );

test( "If a valid target passed into the section links, an icon will appear next to it", () => {
    let testProps = {
        sections: [
            {
                name: "Site help",
                links: [
                    { url: "https://hcl-software.com", label: "Compliance headline", target: "_blank" },
                ]
            }
        ]
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXLocalFooter {...testProps} /> );
    const linkRender = getByTestId( "section-links" ).childNodes[1].nodeName;
    expect( linkRender ).toEqual( "I" );
} );

// Test alt texts and mobile / default logo
test( "if no mobile logo passed, then it should only add the class d-block to the logo", () => {
    let testProps = {
        logo: { url: "https://i.ibb.co/gW0mtMg/Logo-Wrapper-Desktop.png" }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXLocalFooter {...testProps} /> );
    const logoClasses = getByTestId( "local-logo-test" ).classList;

    expect( logoClasses.contains( "d-block" ) && logoClasses.length === 1 ).toBe( true );
} );

test( "if mobile logo passed, then the default logo should hide on mobile and the mobile logo appear but hide on larger screens", () => {
    let testProps = {
        logo: {
            url: "https://i.ibb.co/gW0mtMg/Logo-Wrapper-Desktop.png"
        },
        logoMobile: {
            url: "https://i.ibb.co/V2tZvjv/Logo-Wrapper-Mobile.png"
        }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXLocalFooter {...testProps} /> );
    const logoClasses = ["d-none", "d-sm-none", "d-md-block"];
    const mobileClasses = ["d-block", "d-sm-block", "d-md-none"];
    const logo = getByTestId( "local-logo-test" ).classList;
    const mobile = getByTestId( "local-logo-mobile-test" ).classList;

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

test( "if no alt text for the logo passed, it should assign 'local-footer-logo'", () => {
    let testProps = {
        logo: {
            url: "https://i.ibb.co/gW0mtMg/Logo-Wrapper-Desktop.png"
        }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXLocalFooter {...testProps} /> );
    const altLogo = getByTestId( "local-logo-test" ).getAttribute( "alt" );
    expect( altLogo ).toEqual( "local-footer-logo" );
} );

test( "if alt text for the logo passed, it should assign it", () => {
    let testProps = {
        logo: {
            url: "https://i.ibb.co/gW0mtMg/Logo-Wrapper-Desktop.png",
            altText: "hcl-software-hr-logo"
        }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXLocalFooter {...testProps} /> );
    const altLogo = getByTestId( "local-logo-test" ).getAttribute( "alt" );
    const expectedLogo = testProps.logo.altText;
    expect( altLogo ).toEqual( expectedLogo );
} );

test( "if no mobile logo alt text passed, then it should assign 'local-footer-logo-mobile'", () => {
    let testProps = {
        logo: { url: "https://i.ibb.co/gW0mtMg/Logo-Wrapper-Desktop.png" },
        logoMobile: { url: "https://i.ibb.co/V2tZvjv/Logo-Wrapper-Mobile.png" },
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXLocalFooter {...testProps} /> );
    const altLogo = getByTestId( "local-logo-mobile-test" ).getAttribute( "alt" );
    expect( altLogo ).toEqual( "local-footer-logo-mobile" );
} );

test( "if alt text for the mobile logo passed, it should assign it", () => {
    let testProps = {
        logo: { url: "https://i.ibb.co/gW0mtMg/Logo-Wrapper-Desktop.png" },
        logoMobile: {
            url: "https://i.ibb.co/V2tZvjv/Logo-Wrapper-Mobile.png",
            altText: "hcl-software-logo"
        }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXLocalFooter {...testProps} /> );
    const altLogo = getByTestId( "local-logo-mobile-test" ).getAttribute( "alt" );
    const expectedAlt = testProps.logoMobile.altText;
    expect( altLogo ).toEqual( expectedAlt );
} );

// Background color and image tests
test( "If the user pass a background color, its style should be applied on the content element", () => {
    let props = {
        ...localFooterPropsArgs,
        backgroundColor: "#ab3aff"
    };
    const { container } = render( <DXLocalFooter {...props} /> );
    const contentEl = container.querySelector( ".dxLocalFooter__background" );
    expect( contentEl ).toHaveStyle( `background-color: ${props.backgroundColor}` );
} );

test( "If the user pass a backgroundImageLeft with an url, the content should have the style of 'background-image...'", () => {
    let props = {
        ...localFooterPropsArgs,
        backgroundColor: "#ab3aff",
        backgroundImageLeft: {
            url: "https://cdn-icons-png.flaticon.com/512/3067/3067260.png",
            repeat: "no-repeat",
            size: "100px 100px"
        }
    };
    const { container } = render( <DXLocalFooter {...props} /> );
    const contentEl = container.querySelector( ".dxLocalFooter__background #footer-background-image-left" );
    expect( contentEl ).toHaveStyle( `background-image: url('${props.backgroundImageLeft.url}')` );
} );

test( "If the user pass a backgroundImageLeft with a repeat, the content should have that style", () => {
    let props = {
        ...localFooterPropsArgs,
        backgroundColor: "#ab3aff",
        backgroundImageLeft: {
            url: "https://cdn-icons-png.flaticon.com/512/3067/3067260.png",
            repeat: "repeat",
            size: "100px 100px"
        }
    };
    const { container } = render( <DXLocalFooter {...props} /> );
    const contentEl = container.querySelector( ".dxLocalFooter__background #footer-background-image-left" );
    expect( contentEl ).toHaveStyle( `background-repeat: ${props.backgroundImageLeft.repeat}` );
} );

test( "If the user pass no backgroundImageLeft, the content should have that default style", () => {
    let props = {
        ...localFooterPropsArgs,
        backgroundColor: "#ab3aff"
    };
    const { container } = render( <DXLocalFooter {...props} /> );
    const contentEl = container.querySelector( ".dxLocalFooter__background #footer-background-image-left" );
    expect( contentEl ).toHaveStyle( `background-image: none` );
} );

test( "If the user pass a backgroundImageLeft with no repeat, the content should have that default style", () => {
    let props = {
        ...localFooterPropsArgs,
        backgroundColor: "#ab3aff",
        backgroundImageLeft: {
            url: "https://cdn-icons-png.flaticon.com/512/3067/3067260.png",
            size: "100px 100px"
        }
    };
    const { container } = render( <DXLocalFooter {...props} /> );
    const contentEl = container.querySelector( ".dxLocalFooter__background #footer-background-image-left" );
    expect( contentEl ).toHaveStyle( `background-repeat: no-repeat` );
} );

test( "If the user pass a backgroundImageLeft with a size, the content should have that style", () => {
    let props = {
        ...localFooterPropsArgs,
        backgroundColor: "#ab3aff",
        backgroundImageLeft: {
            url: "https://cdn-icons-png.flaticon.com/512/3067/3067260.png",
            repeat: "no-repeat",
            size: "100px 100px"
        }
    };
    const { container } = render( <DXLocalFooter {...props} /> );
    const contentEl = container.querySelector( ".dxLocalFooter__background #footer-background-image-left" );
    expect( contentEl ).toHaveStyle( `background-size: ${props.backgroundImageLeft.size}` );
} );

test( "If the user pass a backgroundImageLeft with no size, the content should have that default style", () => {
    let props = {
        ...localFooterPropsArgs,
        backgroundColor: "#ab3aff",
        backgroundImageLeft: {
            url: "https://cdn-icons-png.flaticon.com/512/3067/3067260.png",
            repeat: "no-repeat"
        }
    };
    const { container } = render( <DXLocalFooter {...props} /> );
    const contentEl = container.querySelector( ".dxLocalFooter__background #footer-background-image-left" );
    expect( contentEl ).toHaveStyle( `background-size: 100% auto` );
} );

test( "If the user pass a backgroundImageRight with an url, the content should have the style of 'background-image...'", () => {
    let props = {
        ...localFooterPropsArgs,
        backgroundColor: "#ab3aff",
        backgroundImageRight: {
            url: "https://cdn-icons-png.flaticon.com/512/3067/3067260.png",
            repeat: "no-repeat",
            size: "100px 100px"
        }
    };
    const { container } = render( <DXLocalFooter {...props} /> );
    const contentEl = container.querySelector( ".dxLocalFooter__background #footer-background-image-right" );
    expect( contentEl ).toHaveStyle( `background-image: url('${props.backgroundImageRight.url}')` );
} );

test( "If the user pass no backgroundImageRight, the content should have that default style", () => {
    let props = {
        ...localFooterPropsArgs,
        backgroundColor: "#ab3aff"
    };
    const { container } = render( <DXLocalFooter {...props} /> );
    const contentEl = container.querySelector( ".dxLocalFooter__background #footer-background-image-right" );
    expect( contentEl ).toHaveStyle( `background-image: none` );
} );

test( "If the user pass a backgroundImageRight with a repeat, the content should have that style", () => {
    let props = {
        ...localFooterPropsArgs,
        backgroundColor: "#ab3aff",
        backgroundImageRight: {
            url: "https://cdn-icons-png.flaticon.com/512/3067/3067260.png",
            repeat: "repeat",
            size: "100px 100px"
        }
    };
    const { container } = render( <DXLocalFooter {...props} /> );
    const contentEl = container.querySelector( ".dxLocalFooter__background #footer-background-image-right" );
    expect( contentEl ).toHaveStyle( `background-repeat: ${props.backgroundImageRight.repeat}` );
} );

test( "If the user pass a backgroundImageRight with no repeat, the content should have that style", () => {
    let props = {
        ...localFooterPropsArgs,
        backgroundColor: "#ab3aff",
        backgroundImageRight: {
            url: "https://cdn-icons-png.flaticon.com/512/3067/3067260.png",
            size: "100px 100px"
        }
    };
    const { container } = render( <DXLocalFooter {...props} /> );
    const contentEl = container.querySelector( ".dxLocalFooter__background #footer-background-image-right" );
    expect( contentEl ).toHaveStyle( `background-repeat: no-repeat` );
} );

test( "If the user pass a backgroundImageRight with a size, the content should have that style", () => {
    let props = {
        ...localFooterPropsArgs,
        backgroundColor: "#ab3aff",
        backgroundImageRight: {
            url: "https://cdn-icons-png.flaticon.com/512/3067/3067260.png",
            repeat: "no-repeat",
            size: "100px 100px"
        }
    };
    const { container } = render( <DXLocalFooter {...props} /> );
    const contentEl = container.querySelector( ".dxLocalFooter__background #footer-background-image-right" );
    expect( contentEl ).toHaveStyle( `background-size: ${props.backgroundImageRight.size}` );
} );

test( "If the user pass a backgroundImageRight with no size, the content should have that default style", () => {
    let props = {
        ...localFooterPropsArgs,
        backgroundColor: "#ab3aff",
        backgroundImageRight: {
            url: "https://cdn-icons-png.flaticon.com/512/3067/3067260.png",
            repeat: "no-repeat"
        }
    };
    const { container } = render( <DXLocalFooter {...props} /> );
    const contentEl = container.querySelector( ".dxLocalFooter__background #footer-background-image-right" );
    expect( contentEl ).toHaveStyle( `background-size: 100% auto` );
} );

jest.clearAllMocks();
