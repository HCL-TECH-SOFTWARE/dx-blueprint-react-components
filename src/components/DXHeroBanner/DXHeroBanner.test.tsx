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
import DXHeroBanner, { HeroBannerProps } from "./DXHeroBanner";
import userEvent from "@testing-library/user-event";
import { HeroBannerChangedIconsArgs, HeroBannerVideoArgs, HeroBannerAnimatedTitleArgs } from "./DXHeroBanner.stories";

test( "hero banner renders with minimum required arguments", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header"
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );

    expect( screen.queryByTestId( 'hero-banner' ) ).toBeInTheDocument();
} );

test( "hero banner contains expected header content", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header"
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let bannerHeader = screen.getAllByRole( 'heading' ).filter( ( element: HTMLElement ) => {
        return element.tagName === 'H2';
    } ).pop();

    expect( bannerHeader?.textContent ).toBe( heroBannerArgs.header );
} );

test( "hero banner contains expected sub-header content", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        subheader: "Sub-Header"
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let bannerSubHeader = screen.getAllByRole( 'heading' ).filter( ( element: HTMLElement ) => {
        return element.tagName === 'H3';
    } ).pop();

    expect( bannerSubHeader?.textContent ).toBe( heroBannerArgs.subheader );
} );

test( "hero banner contains expected body content", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let bannerBody = screen.getByText( heroBannerArgs.body! );

    expect( bannerBody?.textContent ).toBe( heroBannerArgs.body );
} );

test( "hero banner contains expected banner button content", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        primaryButton: {
            label: "Click me!",
            onClick: () => {}
        }
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let bannerButton = screen.getByRole( 'button' );

    expect( bannerButton?.textContent ).toBe( heroBannerArgs.primaryButton?.label );
} );

test( "hero banner button method is executed when button is clicked", async () => {
    let mockFunction = jest.fn();
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        primaryButton: {
            label: "Click me!",
            onClick: mockFunction
        }
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let bannerButton = screen.getByRole( 'button' );
    await userEvent.click( bannerButton );

    expect( mockFunction ).toHaveBeenCalled();
} );

test( "hero banner contains expected banner link content", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        link: {
            label: "CONTACT US",
            url: "www.hcl-software.com",
        }
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let link = screen.getByRole( 'link' );

    expect( link?.textContent ).toBe( heroBannerArgs.link?.label );
} );

test( "hero banner contains expected banner link url", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        link: {
            label: "CONTACT US",
            url: "https://hcl-software.com/",
        }
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let link = screen.getByRole( 'link' ) as HTMLAnchorElement;

    expect( link?.href ).toBe( heroBannerArgs.link?.url );
} );

test( "hero banner contains expected banner link target when no value is set", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        link: {
            label: "CONTACT US",
            url: "www.hcl-software.com",
        }
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let link = screen.getByRole( 'link' ) as HTMLAnchorElement;

    expect( link?.target ).toBe( '_self' );
} );

test( "hero banner contains expected banner link target when a value is set", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        link: {
            label: "CONTACT US",
            url: "www.hcl-software.com",
            target: "_blank"
        }
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let link = screen.getByRole( 'link' ) as HTMLAnchorElement;

    expect( link?.target ).toBe( heroBannerArgs.link?.target );
} );

test( "hero banner contains expected banner link icon when target is not set", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        link: {
            label: "CONTACT US",
            url: "www.hcl-software.com",
        }
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let linkIcon = screen.getByRole( 'link' ).childNodes[1] as HTMLElement;

    expect( linkIcon.className ).toBe( 'ci-Arrow_Right_LG' );
} );

test( "hero banner contains expected banner link icon when target is not _blank", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        link: {
            label: "CONTACT US",
            url: "www.hcl-software.com",
            target: "_self"
        }
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let linkIcon = screen.getByRole( 'link' ).childNodes[1] as HTMLElement;

    expect( linkIcon.className ).toBe( 'ci-Arrow_Right_LG' );
} );

test( "hero banner contains expected banner link icon when target is _blank", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        link: {
            label: "CONTACT US",
            url: "www.hcl-software.com",
            target: "_blank"
        }
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let linkIcon = screen.getByRole( 'link' ).childNodes[1] as HTMLElement;

    expect( linkIcon.className ).toBe( 'ci-External_Link' );
} );

test( "hero banner contains expected foreground image content", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        foreground: {
            image: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png",
            alignment: "right"
        }
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let bannerImage = screen.getByTestId( 'hero-banner-foreground-img' ) as HTMLImageElement;

    expect( bannerImage?.src ).toMatch( heroBannerArgs.foreground?.image! );
} );

test( "hero banner contains default foreground image alt when not set", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        foreground: {
            image: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png"
        }
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let bannerImage = screen.getByTestId( 'hero-banner-foreground-img' ) as HTMLImageElement;

    expect( bannerImage?.alt ).toBe( "Hero banner foreground image" );
} );

test( "hero banner contains expected foreground image alt value", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        foreground: {
            image: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png",
            alt: "Foreground image alt test"
        }
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let bannerImage = screen.getByTestId( 'hero-banner-foreground-img' ) as HTMLImageElement;

    expect( bannerImage?.alt ).toBe( heroBannerArgs.foreground?.alt );
} );

test( "hero banner contains expected foreground image alignment when not set", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        foreground: {
            image: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png"
        }
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let bannerImage = screen.getByTestId( 'hero-banner-foreground-img' ) as HTMLImageElement;

    expect( bannerImage ).toHaveClass( "dxHeroBanner__foregroundImage--right" );
} );

test( "hero banner contains expected foreground image alignment when set to left", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        foreground: {
            image: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png",
            alignment: "left"
        }
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let bannerImage = screen.getByTestId( 'hero-banner-foreground-img' ) as HTMLImageElement;

    expect( bannerImage ).toHaveClass( "dxHeroBanner__foregroundImage--left" );
} );

test( "hero banner contains expected foreground image alignment when set to right", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        foreground: {
            image: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png",
            alignment: "right"
        }
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let bannerImage = screen.getByTestId( 'hero-banner-foreground-img' ) as HTMLImageElement;

    expect( bannerImage ).toHaveClass( "dxHeroBanner__foregroundImage--right" );
} );

/**
 * Test will pass with an error, because there's a known issue with React when trying to render videos with the muted attribute
 * https://stackoverflow.com/questions/62732346/test-exception-unstable-flushdiscreteupdates
 */
test( "hero banner has expected tag type if set to video (or not)", () => {
    expect.assertions( 2 );
    let heroBannerArgs: HeroBannerProps[] = [{
        index: 1,
        header: "Hero Banner Header",
        background: {
            url: "https://media.cntraveler.com/photos/5eb18e42fc043ed5d9779733/16:9/w_2580,c_limit/BlackForest-Germany-GettyImages-147180370.jpg"
        }
    },
    {
        index: 2,
        header: "Hero Banner Header",
        background: {
            isVideo: true,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        }
    }
    ];

    render( <DXHeroBanner {...heroBannerArgs[0]} /> );
    render( <DXHeroBanner {...heroBannerArgs[1]} /> );
    let heroBannerBgMedia = screen.getAllByTestId( 'hero-banner-bg-media' );

    expect( heroBannerBgMedia[0].tagName ).toBe( "IMG" );
    expect( heroBannerBgMedia[1].tagName ).toBe( "VIDEO" );
} );

test( "hero banner has expected background media", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        background: {
            url: "https://media.cntraveler.com/photos/5eb18e42fc043ed5d9779733/16:9/w_2580,c_limit/BlackForest-Germany-GettyImages-147180370.jpg"
        }
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let heroBannerBgMedia = screen.getByTestId( 'hero-banner-bg-media' ) as HTMLImageElement;

    expect( heroBannerBgMedia.src ).toBe( heroBannerArgs.background?.url );
} );

/**
 * Since testing media queries is currently not possible, this will only be testing the desktop height
 * https://stackoverflow.com/a/64393276
 */
test( "hero banner has default background height when it is not set", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header"
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let heroBannerContainer = screen.getByTestId( 'hero-banner-container' );

    expect( heroBannerContainer ).toHaveStyle( 'max-height: 450px' );
} );

test( "hero banner body has expected default content align class", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header"
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let heroBannerBody = screen.getByTestId( 'hero-banner-body' );

    expect( heroBannerBody ).toHaveClass( "dxHeroBanner__content--left" );
} );

test( "hero banner body has expected conent align class when set to right", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        textAlign: "right"
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let heroBannerBody = screen.getByTestId( 'hero-banner-body' );

    expect( heroBannerBody ).toHaveClass( "dxHeroBanner__content--right" );
} );

test( "hero banner body has expected content align class when set to left", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        textAlign: "left"
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let heroBannerBody = screen.getByTestId( 'hero-banner-body' );

    expect( heroBannerBody ).toHaveClass( "dxHeroBanner__content--left" );
} );

test( "hero banner body has expected content align class when set to center", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        textAlign: "center"
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let heroBannerBody = screen.getByTestId( 'hero-banner-body' );

    expect( heroBannerBody ).toHaveClass( "dxHeroBanner__content--center" );
} );

test( "hero banner body has expected text color when set", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        textColor: "#82d87f"
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let heroBannerBody = screen.getByTestId( 'hero-banner-body' );

    expect( heroBannerBody ).toHaveStyle( {
        'color': '#82d87f'
    } );
} );

test( "hero banner contains selected opacity color", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        background: {
            url: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png",
            opacity: "dark"
        }
    };

    //@ts-ignore: Ignore warning of media.opacity string not being compatible with Props
    render( <DXHeroBanner {...heroBannerArgs} /> );
    let banner = screen.getByTestId( 'hero-banner-container' );

    expect( banner.firstChild ).toHaveStyle( {
        'background-color': `var(--${heroBannerArgs.background?.opacity}-${heroBannerArgs.background?.opacity})`
    } );
} );

test( "hero banner contains fallback opacity color", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        background: {
            url: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png"
        }
    };

    render( <DXHeroBanner {...heroBannerArgs} /> );
    let banner = screen.getByTestId( 'hero-banner-container' );

    expect( banner.firstChild ).toHaveStyle( {
        'background-color': 'var(--light-white)'
    } );
} );

// Video Format Tests
test( "If an invalid video format is found, a message 'Incorrect video format passed' will appear", () => {
    let props: HeroBannerProps = {
        ...HeroBannerVideoArgs,
        background: {
            isVideo: true,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.avi"
        }
    };
    const { getByText } = render( <DXHeroBanner {...props} /> );
    expect( getByText( "Unsopported video format passed" ) ).toBeInTheDocument();
} );

test( "If an mp4 video format is found, the source type will be 'video/mp4'", () => {
    const { getByTestId } = render( <DXHeroBanner {...HeroBannerVideoArgs} /> );
    const video = getByTestId( "hero-banner-bg-media" );
    const sourceTag = video.childNodes[0] as HTMLElement;
    const type = sourceTag.getAttribute( "type" );
    expect( type ).toEqual( "video/mp4" );
} );

test( "If a webm video format is found, the source type will be 'video/webm'", () => {
    let props: HeroBannerProps = {
        ...HeroBannerVideoArgs,
        background: {
            isVideo: true,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.webm"
        }
    };
    const { getByTestId } = render( <DXHeroBanner {...props} /> );
    const video = getByTestId( "hero-banner-bg-media" );
    const sourceTag = video.childNodes[0] as HTMLElement;
    const type = sourceTag.getAttribute( "type" );
    expect( type ).toEqual( "video/webm" );
} );

test( "If an ogg video format is found, the source type will be 'video/ogg'", () => {
    let props: HeroBannerProps = {
        ...HeroBannerVideoArgs,
        background: {
            isVideo: true,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.ogg"
        }
    };
    const { getByTestId } = render( <DXHeroBanner {...props} /> );
    const video = getByTestId( "hero-banner-bg-media" );
    const sourceTag = video.childNodes[0] as HTMLElement;
    const type = sourceTag.getAttribute( "type" );
    expect( type ).toEqual( "video/ogg" );
} );

test( "If the url have the name of the video is at the middle, it should add the url on the render", () => {
    let props: HeroBannerProps = {
        ...HeroBannerVideoArgs,
        background: {
            isVideo: true,
            url: "/documents/42860/61568/1-couple-walks-roebling-bridge-cincinatti-skyline-SBV-329432232-4K.mp4/267f9914-46da-3fe2-213c-33a451804de3"
        }
    };
    const { getByTestId } = render( <DXHeroBanner {...props} /> );
    const video = getByTestId( "hero-banner-bg-media" );
    const sourceTag = video.childNodes[0] as HTMLElement;
    const src = sourceTag.getAttribute( "src" );
    expect( src ).toEqual( props.background?.url );
} );

// SearchSuggestion Tests
test( "If the user pass searchSuggestion the component 'DXSSuggestion' will be on the document", () => {
    let props: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        subheader: "Sub-Header",
        textAlign: "right",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        background: {
            isVideo: true,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        },
        foreground: {
            image: "https://www.pngall.com/wp-content/uploads/2016/06/Business-Free-Download-PNG.png",
            alt: "Hero banner with foreground image",
            alignment: "left"
        },
        searchSuggestion: {
            searchItems: [
                { label: "Question 1", url: "#one" },
                { label: "Question 2", url: "#two" },
                { label: "Question 3", url: "#three" },
                { label: "Question 4", url: "#four" },
                { label: "Question 5", url: "#five" },
            ],
            searchFn: function ( _filter: string ) {},
            searchPlaceholder: "Look for..."
        }
    };
    const { container } = render( <DXHeroBanner {...props} /> );
    const ssComponent = container.querySelector( ".dxSSuggestions" );
    expect( ssComponent ).toBeInTheDocument();
} );

test( "If the user does not pass searchSuggestion the component 'DXSSuggestion' will be null", () => {
    let props: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        subheader: "Sub-Header",
        textAlign: "right",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        background: {
            isVideo: true,
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        },
        foreground: {
            image: "https://www.pngall.com/wp-content/uploads/2016/06/Business-Free-Download-PNG.png",
            alt: "Hero banner with foreground image",
            alignment: "left"
        }
    };
    const { container } = render( <DXHeroBanner {...props} /> );
    const ssComponent = container.querySelector( ".dxSSuggestions" );
    expect( ssComponent ).toBeNull();
} );

test( "Icon change if value is set", () => {
    render( <DXHeroBanner {...HeroBannerChangedIconsArgs} /> );
    expect( screen.getByTestId( "heroBanner__icon" ) ).toHaveClass( HeroBannerChangedIconsArgs.icons?.link! );
} );

// Tests for the height props
test( "hero banner applies default height on desktop if the prop is not passed", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        background: {
            url: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png",
        }
    };
    let { container } = render( <DXHeroBanner {...heroBannerArgs} /> );
    let heroContainer = container.querySelector( ".dxHeroBanner__container" );
    expect( heroContainer ).toHaveStyle( {
        maxHeight: "450px"
    } );
} );

test( "hero banner applies height passed on the prop in desktop", () => {
    let heroBannerArgs: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        background: {
            url: "https://i.pinimg.com/originals/06/25/32/06253280577dd6c18daf4bed0efb5108.png",
            heightDesktop: "650px"
        }
    };
    let { container } = render( <DXHeroBanner {...heroBannerArgs} /> );
    let heroContainer = container.querySelector( ".dxHeroBanner__container" );
    expect( heroContainer ).toHaveStyle( {
        maxHeight: heroBannerArgs.background?.heightDesktop
    } );
} );

// Test the animated text logic
test( "If the prop animatedText is not passed, it should not be rendered", () => {
    let props: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        background: {
            opacity: "light" as "light",
            url: "https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
        },
        foreground: {
            image: "https://cdn.pixabay.com/photo/2022/10/24/11/00/moscow-city-7543127_1280.png",
            alt: "Hero banner with foreground image",
        },
    };
    const { container } = render( <DXHeroBanner {...props} /> );
    let title = container.querySelector( ".dxHeroBanner__animatedBox" ) as HTMLElement;
    expect( title ).toBeNull();
} );

test( "If the prop animatedText is has no items, it should not be rendered", () => {
    let props: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        background: {
            opacity: "light" as "light",
            url: "https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
        },
        foreground: {
            image: "https://cdn.pixabay.com/photo/2022/10/24/11/00/moscow-city-7543127_1280.png",
            alt: "Hero banner with foreground image",
        },
        animatedText: {
            content: []
        }
    };
    const { container } = render( <DXHeroBanner {...props} /> );
    let title = container.querySelector( ".dxHeroBanner__animatedBox" ) as HTMLElement;
    expect( title ).toBeNull();
} );

test( "If the prop animatedText is passed, the title text should be the last item in the array", () => {
    let props: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        background: {
            opacity: "light" as "light",
            url: "https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
        },
        foreground: {
            image: "https://cdn.pixabay.com/photo/2022/10/24/11/00/moscow-city-7543127_1280.png",
            alt: "Hero banner with foreground image",
        },
        animatedText: {
            content: ["Test 1", "Test 2"]
        }
    };
    const { getByTestId } = render( <DXHeroBanner {...props} /> );
    setTimeout( () => {
        let text = getByTestId( "hero-banner-animated-text" );
        expect( text.textContent ).toBe( props.animatedText?.content[props.animatedText.content.length - 1] );
    }, 700 );
} );

// Test the hideTitle prop
test( "If the hideTitle prop is not passed, the title should be in the document", () => {
    let props: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        background: {
            opacity: "light" as "light",
            url: "https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
        },
        foreground: {
            image: "https://cdn.pixabay.com/photo/2022/10/24/11/00/moscow-city-7543127_1280.png",
            alt: "Hero banner with foreground image",
        },
        animatedText: {
            content: ["Test 1", "Test 2"]
        }
    };
    const { getByTestId } = render( <DXHeroBanner {...props} /> );
    let title = getByTestId( "hero-banner-title" );
    expect( title ).toBeInTheDocument();
} );

// Test the hideTitle prop
test( "If the animatedText and hideTitle props are passed, the title should be null", () => {
    let props: HeroBannerProps = {
        index: 1,
        header: "Hero Banner Header",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        background: {
            opacity: "light" as "light",
            url: "https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
        },
        foreground: {
            image: "https://cdn.pixabay.com/photo/2022/10/24/11/00/moscow-city-7543127_1280.png",
            alt: "Hero banner with foreground image",
        },
        animatedText: {
            content: ["Test 1", "Test 2"],
            hideTitle: true
        },
    };
    const { container } = render( <DXHeroBanner {...props} /> );
    expect( container.querySelector( '[data-testid="hero-banner-title"]' ) ).toBeNull();
} );

// Test the animated text alignment
test( "if the user does not pass the textAlign prop, the animated element will have the class 'dxHeroBanner__animatedBox--left'", () => {
    let props: HeroBannerProps = { ...HeroBannerAnimatedTitleArgs };
    const { container } = render( <DXHeroBanner {...props} /> );
    let el = container.querySelector( ".dxHeroBanner__animatedBox" );
    expect( el ).toHaveClass( "dxHeroBanner__animatedBox--left" );
} );
test( "if the user does pass the textAlign prop as left, the animated element will have the class 'dxHeroBanner__animatedBox--left'", () => {
    let props: HeroBannerProps = { ...HeroBannerAnimatedTitleArgs };
    props.textAlign = "left";
    const { container } = render( <DXHeroBanner {...props} /> );
    let el = container.querySelector( ".dxHeroBanner__animatedBox" );
    expect( el ).toHaveClass( "dxHeroBanner__animatedBox--left" );
} );
test( "if the user does pass the textAlign prop as right, the animated element will have the class 'dxHeroBanner__animatedBox--right'", () => {
    let props: HeroBannerProps = { ...HeroBannerAnimatedTitleArgs };
    props.textAlign = "right";
    const { container } = render( <DXHeroBanner {...props} /> );
    let el = container.querySelector( ".dxHeroBanner__animatedBox" );
    expect( el ).toHaveClass( "dxHeroBanner__animatedBox--right" );
} );
test( "if the user does pass the textAlign prop as center, the animated element will have the class 'dxHeroBanner__animatedBox--center'", () => {
    let props: HeroBannerProps = { ...HeroBannerAnimatedTitleArgs };
    props.textAlign = "center";
    const { container } = render( <DXHeroBanner {...props} /> );
    let el = container.querySelector( ".dxHeroBanner__animatedBox" );
    expect( el ).toHaveClass( "dxHeroBanner__animatedBox--center" );
} );
// --- PERFORMANCE OPTIMIZATION TESTS (DXQ-50221) ---
test( "hero banner renders <picture> wrapper with WebP source and lazy loads foreground", () => {
    let optimizedArgs: HeroBannerProps = {
        index: 1,
        header: "Optimized Banner",
        background: {
            url: "background.jpg",
            webpUrl: "background.webp" // Passing the new WebP prop
        },
        foreground: {
            image: "foreground.png",
            webpUrl: "foreground.webp", // Passing the new WebP prop
            alt: "Foreground Alt Text"
        }
    };

    const { container, getByTestId } = render( <DXHeroBanner {...optimizedArgs} /> );

    // 1. Verify that the <picture> wrappers generated the <source type="image/webp"> tags
    const webpSources = container.querySelectorAll( 'source[type="image/webp"]' );
    expect( webpSources.length ).toBe( 2 ); // Should exist for both background and foreground
    expect( webpSources[0] ).toHaveAttribute( 'srcSet', 'background.webp' );
    expect( webpSources[1] ).toHaveAttribute( 'srcSet', 'foreground.webp' );

    // 2. Verify the eager-loading strategy for above-the-fold background
    const bgImage = getByTestId( 'hero-banner-bg-media' );
    expect( bgImage ).not.toHaveAttribute( 'loading', 'lazy' );

    // 3. Verify the lazy-loading strategy for off-screen foreground images
    const fgImage = getByTestId( 'hero-banner-foreground-img' );
    expect( fgImage ).toHaveAttribute( 'loading', 'lazy' );
} );
