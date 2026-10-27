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
import { screen, render } from "@testing-library/react";
import DXHeroBannerOverlay, { HeroBannerOverlayProps } from "./DXHeroBannerOverlay";
import userEvent from "@testing-library/user-event";
import { HeroBannerOverlayArgs } from "./DXHeroBannerOverlay.stories";

test( "hero banner renders with minimum required arguments", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header"
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );

    expect( screen.queryByTestId( 'hb-overlay' ) ).toBeInTheDocument();
} );

test( "hero banner contains expected header content", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header"
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let bannerHeader = screen.getAllByRole( 'heading' ).filter( ( element: HTMLElement ) => {
        return element.tagName === 'H2';
    } ).pop();

    expect( bannerHeader?.textContent ).toBe( heroBannerArgs.header );
} );

test( "hero banner contains expected sub-header content", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        subheader: "Sub-Header"
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let bannerSubHeader = screen.getAllByRole( 'heading' ).filter( ( element: HTMLElement ) => {
        return element.tagName === 'H3';
    } ).pop();

    expect( bannerSubHeader?.textContent ).toBe( heroBannerArgs.subheader );
} );

test( "hero banner contains expected body content", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let bannerBody = screen.getByText( heroBannerArgs.body );

    expect( bannerBody?.textContent ).toBe( heroBannerArgs.body );
} );

test( "hero banner contains expected banner button content", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        buttons: [{
            label: "Click me!",
            onClick: () => {}
        }]
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let bannerButton = screen.getByRole( 'button' );

    expect( bannerButton?.textContent ).toBe( heroBannerArgs.buttons[0].label );
} );

test( "hero banner contains expected banner button content", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        buttons: [{
            label: "Click me!",
            onClick: () => {}
        },
        {
            label: "Click me 2!",
            onClick: () => {}
        }]
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let bannerButton = screen.getAllByRole( 'button' );

    expect( bannerButton.length ).toBe( heroBannerArgs.buttons.length );
} );

test( "hero banner button method is executed when button is clicked", async () => {
    let mockFunction = jest.fn();
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        buttons: [{
            label: "Click me!",
            onClick: mockFunction
        }]
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let bannerButton = screen.getByRole( 'button' );
    await userEvent.click( bannerButton );

    expect( mockFunction ).toHaveBeenCalled();
} );

test( "hero banner contains expected banner link content", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        link: {
            label: "CONTACT US",
            url: "www.hcl-software.com",
        }
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let link = screen.getByRole( 'link' );

    expect( link?.textContent ).toBe( heroBannerArgs.link.label );
} );

test( "hero banner contains expected banner link url", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        link: {
            label: "CONTACT US",
            url: "https://hcl-software.com/",
        }
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let link = screen.getByRole( 'link' ) as HTMLAnchorElement;

    expect( link?.href ).toBe( heroBannerArgs.link.url );
} );

test( "hero banner contains expected banner link target when no value is set", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        link: {
            label: "CONTACT US",
            url: "www.hcl-software.com",
        }
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let link = screen.getByRole( 'link' ) as HTMLAnchorElement;

    expect( link?.target ).toBe( '_self' );
} );

test( "hero banner contains expected banner link target when a value is set", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        link: {
            label: "CONTACT US",
            url: "www.hcl-software.com",
            target: "_blank"
        }
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let link = screen.getByRole( 'link' ) as HTMLAnchorElement;

    expect( link?.target ).toBe( heroBannerArgs.link.target );
} );

test( "hero banner contains expected banner link icon when target is not set", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        link: {
            label: "CONTACT US",
            url: "www.hcl-software.com",
        }
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let linkIcon = screen.getByRole( 'link' ).childNodes[1] as HTMLElement;

    expect( linkIcon.className ).toBe( 'ci-Arrow_Right_LG' );
} );

test( "hero banner contains expected banner link icon when target is not _blank", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        link: {
            label: "CONTACT US",
            url: "www.hcl-software.com",
            target: "_self"
        }
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let linkIcon = screen.getByRole( 'link' ).childNodes[1] as HTMLElement;

    expect( linkIcon.className ).toBe( 'ci-Arrow_Right_LG' );
} );

test( "hero banner contains expected banner link icon when target is _blank", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        link: {
            label: "CONTACT US",
            url: "www.hcl-software.com",
            target: "_blank"
        }
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let linkIcon = screen.getByRole( 'link' ).childNodes[1] as HTMLElement;

    expect( linkIcon.className ).toBe( 'ci-External_Link' );
} );

test( "hero banner contains expected foreground image content", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        foreground: {
            image: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png",
            alignment: "right"
        }
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let bannerImage = screen.getByTestId( 'hb-overlay-foreground-img' ) as HTMLImageElement;

    expect( bannerImage?.src ).toMatch( heroBannerArgs.foreground.image );
} );

test( "hero banner contains default foreground image alt when not set", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        foreground: {
            image: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png"
        }
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let bannerImage = screen.getByTestId( 'hb-overlay-foreground-img' ) as HTMLImageElement;

    expect( bannerImage?.alt ).toBe( "Hero banner overlay foreground image" );
} );

test( "hero banner contains expected foreground image alt value", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        foreground: {
            image: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png",
            alt: "Foreground image alt test"
        }
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let bannerImage = screen.getByTestId( 'hb-overlay-foreground-img' ) as HTMLImageElement;

    expect( bannerImage?.alt ).toBe( heroBannerArgs.foreground.alt );
} );

test( "hero banner contains expected foreground image alignment when not set", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        foreground: {
            image: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png"
        }
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let bannerImage = screen.getByTestId( 'hb-overlay-foreground-img' ) as HTMLImageElement;

    expect( bannerImage ).toHaveStyle( {
        'right': '0px'
    } );
} );

test( "hero banner contains expected foreground image alignment when set to left", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        foreground: {
            image: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png",
            alignment: "left"
        }
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let bannerImage = screen.getByTestId( 'hb-overlay-foreground-img' ) as HTMLImageElement;

    expect( bannerImage ).toHaveStyle( {
        'left': '0px'
    } );
} );

test( "hero banner contains expected foreground image alignment when set to right", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        foreground: {
            image: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png",
            alignment: "right"
        }
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let bannerImage = screen.getByTestId( 'hb-overlay-foreground-img' ) as HTMLImageElement;

    expect( bannerImage ).toHaveStyle( {
        'right': '0px'
    } );
} );

/**
 * Test will pass with an error, because there's a known issue with React when trying to render videos with the muted attribute
 * https://stackoverflow.com/questions/62732346/test-exception-unstable-flushdiscreteupdates
 */
test( "hero banner has expected tag type if set to video (or not)", () => {
    expect.assertions( 2 );
    let heroBannerArgs: HeroBannerOverlayProps[] = [{
        index: 1,
        header: "Hero Banner Header",
        media: {
            url: "https://media.cntraveler.com/photos/5eb18e42fc043ed5d9779733/16:9/w_2580,c_limit/BlackForest-Germany-GettyImages-147180370.jpg"
        }
    },
    {
        index: 2,
        header: "Hero Banner Header",
        media: {
            isVideo: true,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        }
    }
    ];

    render( <DXHeroBannerOverlay {...heroBannerArgs[0]} /> );
    render( <DXHeroBannerOverlay {...heroBannerArgs[1]} /> );
    let heroBannerBgMedia = screen.getAllByTestId( 'hb-overlay-bg-media' );

    expect( heroBannerBgMedia[0].tagName ).toBe( "IMG" );
    expect( heroBannerBgMedia[1].tagName ).toBe( "VIDEO" );
} );

test( "hero banner has expected background media", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        media: {
            url: "https://media.cntraveler.com/photos/5eb18e42fc043ed5d9779733/16:9/w_2580,c_limit/BlackForest-Germany-GettyImages-147180370.jpg"
        }
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let heroBannerBgMedia = screen.getByTestId( 'hb-overlay-bg-media' ) as HTMLImageElement;

    expect( heroBannerBgMedia.src ).toBe( heroBannerArgs.media.url );
} );

/**
 * Since testing media queries is currently not possible, this will only be testing the desktop height
 * https://stackoverflow.com/a/64393276
 */
test( "hero banner has default background height when it is not set", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header"
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let heroBannerContainer = screen.getByTestId( 'hb-overlay-container' );

    expect( heroBannerContainer ).toHaveStyle( 'max-height: 450px' );
} );

/**
 * Since testing media queries is currently not possible, this will only be testing the desktop height
 * https://stackoverflow.com/a/64393276
 */
test( "hero banner has expected background height when custom value is set", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        background: {
            heightDesktop: '600px'
        }
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let heroBannerContainer = screen.getByTestId( 'hb-overlay-container' );

    expect( heroBannerContainer ).toHaveStyle( {
        'max-height': '600px'
    } );
} );

test( "hero banner has expected background color when custom value is set", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        background: {
            color: "secondary"
        }
    };

    //@ts-ignore: Ignore warning of background.color string not being compatible with Props
    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let heroBannerContainer = screen.getByTestId( 'hb-overlay-container' );

    expect( heroBannerContainer ).toHaveStyle( {
        'backgroundImage': `linear-gradient(var(--${heroBannerArgs.background.color}-${heroBannerArgs.background.color}), transparent)`
    } );
} );

test( "hero banner body has expected default text align value", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header"
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let heroBannerBody = screen.getByTestId( 'hb-overlay-body' );

    expect( heroBannerBody ).toHaveStyle( {
        'text-align': 'left'
    } );
} );

test( "hero banner body has expected text align when set to right", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        textAlign: "right"
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let heroBannerBody = screen.getByTestId( 'hb-overlay-body' );

    expect( heroBannerBody ).toHaveStyle( {
        'text-align': heroBannerArgs.textAlign,
        'right': '0'
    } );
} );

test( "hero banner body has expected text align when set to left", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        textAlign: "left"
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let heroBannerBody = screen.getByTestId( 'hb-overlay-body' );

    expect( heroBannerBody ).toHaveStyle( {
        'text-align': heroBannerArgs.textAlign
    } );
} );

test( "hero banner body has expected text align when set to center", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        textAlign: "center"
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let heroBannerBody = screen.getByTestId( 'hb-overlay-body' );

    expect( heroBannerBody ).toHaveStyle( {
        'text-align': heroBannerArgs.textAlign,
        'margin-left': 'auto',
        'margin-right': 'auto',
    } );
} );

test( "hero banner buttons container will have default alignment if no textAlign prop is passed", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        buttons: [{ label: "Test 1" }]
    };
    const { container } = render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let btnContainer = container.querySelector( ".dxHBOverlay__buttonContainer" );
    expect( btnContainer ).toHaveStyle( {
        justifyContent: "flex-start"
    } );
} );

test( "hero banner buttons container will have alignment as flex-start if textAlign prop is left", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        buttons: [{ label: "Test 1" }],
        textAlign: "left"
    };
    const { container } = render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let btnContainer = container.querySelector( ".dxHBOverlay__buttonContainer" );
    expect( btnContainer ).toHaveStyle( {
        justifyContent: "flex-start"
    } );
} );

test( "hero banner buttons container will have alignment as flex-end if textAlign prop is right", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        buttons: [{ label: "Test 1" }],
        textAlign: "right"
    };
    const { container } = render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let btnContainer = container.querySelector( ".dxHBOverlay__buttonContainer" );
    expect( btnContainer ).toHaveStyle( {
        justifyContent: "flex-end"
    } );
} );

test( "hero banner buttons container will have alignment as center if textAlign prop is center", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        buttons: [{ label: "Test 1" }],
        textAlign: "center"
    };
    const { container } = render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let btnContainer = container.querySelector( ".dxHBOverlay__buttonContainer" );
    expect( btnContainer ).toHaveStyle( {
        justifyContent: "center"
    } );
} );

test( "hero banner body has expected text color when set", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        textColor: "#82d87f"
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let heroBannerBody = screen.getByTestId( 'hb-overlay-body' );

    expect( heroBannerBody ).toHaveStyle( {
        'color': '#82d87f'
    } );
} );

test( "hero banner contains expected image overlay content", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        overlayImage: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png"
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let bannerImage = screen.getByTestId( 'hb-overlay-img-overlay' ) as HTMLImageElement;

    expect( bannerImage?.src ).toMatch( heroBannerArgs.overlayImage );
} );

test( "hero banner contains expected padding", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        background: {
            paddingTop: "150px",
            paddingBottom: "initial"
        },
        media: {
            url: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png"
        }
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let banner = screen.getByTestId( 'hb-overlay' );

    expect( banner ).toHaveStyle( {
        'padding-top': heroBannerArgs.background.paddingTop,
        'padding-bottom': heroBannerArgs.background.paddingBottom,
    } );
} );

test( "hero banner contains no padding due to bad format", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        background: {
            paddingTop: "150pxx",
            paddingBottom: "7% 7%"
        },
        media: {
            url: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png"
        }
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let banner = screen.getByTestId( 'hb-overlay' );

    expect( banner ).toHaveStyle( {
        'padding-top': '0',
        'padding-bottom': '0',
    } );
} );

test( "hero banner contains selected opacity color", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        media: {
            url: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png",
            opacity: "dark"
        }
    };

    //@ts-ignore: Ignore warning of media.opacity string not being compatible with Props
    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let banner = screen.getByTestId( 'hb-overlay-container' );

    expect( banner.firstChild ).toHaveStyle( {
        'background-color': `var(--${heroBannerArgs.media.opacity}-${heroBannerArgs.media.opacity})`
    } );
} );

test( "hero banner contains fallback opacity color", () => {
    let heroBannerArgs = {
        index: 1,
        header: "Hero Banner Header",
        media: {
            url: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png"
        }
    };

    render( <DXHeroBannerOverlay {...heroBannerArgs} /> );
    let banner = screen.getByTestId( 'hb-overlay-container' );

    expect( banner.firstChild ).toHaveStyle( {
        'background-color': 'var(--white)'
    } );
} );
// Video format tests
test( "If an invalid video format is found, a message 'Incorrect video format passed' will appear", () => {
    let props = {
        ...HeroBannerOverlayArgs,
        media: {
            isVideo: true,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.avi"
        }
    };
    const { getByText } = render( <DXHeroBannerOverlay {...props} /> );
    expect( getByText( "Unsopported video format passed" ) ).toBeInTheDocument();
} );

test( "If an mp4 video format is found, the source type will be 'video/mp4'", () => {
    const { getByTestId } = render( <DXHeroBannerOverlay {...HeroBannerOverlayArgs} /> );
    const video = getByTestId( "hb-overlay-bg-media" );
    const sourceTag = video.childNodes[0] as HTMLElement;
    const type = sourceTag.getAttribute( "type" );
    expect( type ).toEqual( "video/mp4" );
} );

test( "If a webm video format is found, the source type will be 'video/webm'", () => {
    let props = {
        ...HeroBannerOverlayArgs,
        media: {
            isVideo: true,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.webm"
        }
    };
    const { getByTestId } = render( <DXHeroBannerOverlay {...props} /> );
    const video = getByTestId( "hb-overlay-bg-media" );
    const sourceTag = video.childNodes[0] as HTMLElement;
    const type = sourceTag.getAttribute( "type" );
    expect( type ).toEqual( "video/webm" );
} );

test( "If an ogg video format is found, the source type will be 'video/ogg'", () => {
    let props = {
        ...HeroBannerOverlayArgs,
        media: {
            isVideo: true,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.ogg"
        }
    };
    const { getByTestId } = render( <DXHeroBannerOverlay {...props} /> );
    const video = getByTestId( "hb-overlay-bg-media" );
    const sourceTag = video.childNodes[0] as HTMLElement;
    const type = sourceTag.getAttribute( "type" );
    expect( type ).toEqual( "video/ogg" );
} );

test( "If the url have the name of the video is at the middle, it should add the url on the render", () => {
    let props = {
        ...HeroBannerOverlayArgs,
        media: {
            isVideo: true,
            url: "/documents/42860/61568/1-couple-walks-roebling-bridge-cincinatti-skyline-SBV-329432232-4K.mp4/267f9914-46da-3fe2-213c-33a451804de3"
        }
    };
    const { getByTestId } = render( <DXHeroBannerOverlay {...props} /> );
    const video = getByTestId( "hb-overlay-bg-media" );
    const sourceTag = video.childNodes[0] as HTMLElement;
    const src = sourceTag.getAttribute( "src" );
    expect( src ).toEqual( props.media.url );
} );

test( "If icon class changes if parameter is set", () => {
    render( <DXHeroBannerOverlay {...HeroBannerOverlayArgs} icons={{ link: "ci-Arrow_Right_MD" }} link={{ label: "Label", url: "www.hcl-software.com" }} /> );
    expect( screen.getByTestId( "HBO_icon" ) ).toHaveClass( "ci-Arrow_Right_MD" );
} );

describe( "DXHeroBannerOverlay Hardening", () => {
    test( "Style Injector: strictly enforces regex boundaries for dimensions and spacing inside the generated CSS block", () => {
        const props = {
            index: 42,
            header: "Regex Test",
            background: {
                // Valid dimensionsRegex matches
                heightDesktop: "fit-content(10.5rem)",
                heightMobile: "max-content",
            },
            media: {
                // Valid spacingRegex match
                marginLeft: "20.5em",
                // Invalid spacingRegex match (falls back to "0")
                marginRight: "invalid-spacing-value"
            }
        };

        const { container } = render( <DXHeroBannerOverlay {...props} /> );
        const styleTag = container.querySelector( "style" );

        expect( styleTag ).toBeInTheDocument();
        const cssContent = styleTag?.textContent || "";

        // Assert literal interpolations survived
        expect( cssContent ).toContain( "#dxHBOverlay-42 .dxHBOverlay__container" );

        // Assert exact regex evaluations for valid inputs
        expect( cssContent ).toContain( "max-height: fit-content(10.5rem);" );
        expect( cssContent ).toContain( "max-height: max-content;" );
        expect( cssContent ).toContain( "margin-left: 20.5em;" );

        // Assert fallback to "0" for invalid input
        expect( cssContent ).toContain( "margin-right: 0;" );
    } );

    test( "Button Renderer: strictly limits rendering to exactly two buttons regardless of array size", () => {
        const props = {
            index: 1,
            header: "Button Limiter",
            buttons: [
                { label: "Btn 1", onClick: jest.fn() },
                { label: "Btn 2", onClick: jest.fn() },
                { label: "Btn 3", onClick: jest.fn() }, // Should be dropped
                { label: "Btn 4", onClick: jest.fn() }  // Should be dropped
            ]
        };

        const { container } = render( <DXHeroBannerOverlay {...props} /> );
        const renderedButtons = container.querySelectorAll( ".dxHBOverlay__button" );

        // Asserts the exact index hardcoding: propsButtons[0] and propsButtons[1]
        expect( renderedButtons.length ).toBe( 2 );
        expect( renderedButtons[0] ).toHaveTextContent( "Btn 1" );
        expect( renderedButtons[1] ).toHaveTextContent( "Btn 2" );
    } );

    test( "Foreground Alignment: executes the fallback else branch and forces 'right: 0' for unknown alignments", () => {
        const props = {
            index: 1,
            header: "Alignment Fallback",
            foreground: {
                image: "test.png",
                alignment: "center" // Invalid alignment forcing the final else branch
            }
        };

        const { getByTestId } = render( <DXHeroBannerOverlay {...props} /> );
        const foregroundImg = getByTestId( "hb-overlay-foreground-img" );

        // The inline style object applies 'right': 0
        expect( foregroundImg ).toHaveStyle( "right: 0px" );
        // Ensure left wasn't erroneously applied
        expect( foregroundImg.style.left ).toBe( "" );
    } );

    test( "Video Hook: safely flushes useEffect and strictly assigns the muted property to the ref element", () => {
        const props = {
            index: 1,
            header: "Video Muted Ref",
            media: {
                isVideo: true,
                url: "test.mp4"
            }
        };

        const { container } = render( <DXHeroBannerOverlay {...props} /> );

        const videoElement = container.querySelector( "video" ) as HTMLVideoElement;

        // Assert the hook effectively mutated the DOM node property natively
        expect( videoElement.muted ).toBe( true );
    } );

    test( "Conditional Nodes: strictly renders the video gradient div only when isVideo is true", () => {
        const propsVideo = {
            index: 1,
            header: "Gradient Video",
            media: { isVideo: true, url: "test.mp4" }
        };

        const propsImage = {
            index: 2,
            header: "Gradient Image",
            media: { isVideo: false, url: "test.jpg" }
        };

        const { container: containerVideo } = render( <DXHeroBannerOverlay {...propsVideo} /> );
        expect( containerVideo.querySelector( ".dxHBOverlay__gradient" ) ).toBeInTheDocument();

        const { container: containerImage } = render( <DXHeroBannerOverlay {...propsImage} /> );
        expect( containerImage.querySelector( ".dxHBOverlay__gradient" ) ).not.toBeInTheDocument();
    } );

    test( "Component Styles: strictly maintains primary linear-gradient fallback when background color is not exactly 'secondary'", () => {
        const props = {
            index: 1,
            header: "Gradient Fallback",
            background: {
                color: "primary" as any
            }
        };

        const { getByTestId } = render( <DXHeroBannerOverlay {...props} /> );
        const rootElement = getByTestId( "hb-overlay" );

        // Assert the conditional background.color === "secondary" was bypassed and default remained
        expect( rootElement ).toHaveStyle( {
            backgroundImage: "linear-gradient(var(--primary-primary), transparent)"
        } );
    } );
} );
