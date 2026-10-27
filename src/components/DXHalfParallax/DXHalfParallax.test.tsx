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
import { render, screen } from '@testing-library/react';
import DXHalfParallax from "./DXHalfParallax";

test( 'If there is at least 1 empty banner and 1 empty content, it should render 1 fold', async () => {
    let parallaxProps = {
        slidesCollection: [{
            banner: {},
            content: {}
        }]
    };

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const slides = container.getElementsByClassName( 'dxHalfParallax__slide' );

    expect( slides ).toHaveLength( 2 );
} );

test( 'If slides are not set, following test should be displayed: Half Parallax did not receive any slides as input', async () => {
    let parallaxProps = {
        slidesCollection: []
    };

    const { getByText } = render( <DXHalfParallax {...parallaxProps} /> );
    expect( getByText( "Half Parallax did not receive any slides as input" ) ).toBeInTheDocument();
} );

test( `If "#000" color is set for "backgroundColor", slide background should be '#000'`, async () => {
    let parallaxProps = {
        slidesCollection: [
            {
                banner: {
                    backgroundColor: '#000'
                },
                content: {
                    backgroundColor: '#000'
                }
            }
        ]
    };

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const slides = container.getElementsByClassName( 'dxHalfParallax__slide' );
    for ( let i = 0; i < slides.length; i++ ) {
        const styles = window.getComputedStyle( slides[i] );
        expect( styles.background.includes( 'rgb(0, 0, 0)' ) ).toBeTruthy();
    }

} );

test( `If "backgroundColor" value is an URL, slide background should render that image`, async () => {
    let parallaxProps = {
        slidesCollection: [
            {
                banner: {
                    backgroundColor: 'https://clermontelections.org/wp-content/uploads/sites/29/2019/05/unnamed-file-300x300.png'
                },
                content: {
                    backgroundColor: 'https://clermontelections.org/wp-content/uploads/sites/29/2019/05/unnamed-file-300x300.png'
                }
            }
        ]
    };

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const slides = container.getElementsByClassName( 'dxHalfParallax__slide' );
    for ( let i = 0; i < slides.length; i++ ) {
        const styles = window.getComputedStyle( slides[i] );
        expect( styles.backgroundImage.includes( 'https://clermontelections.org/wp-content/uploads/sites/29/2019/05/unnamed-file-300x300.png' ) ).toBeTruthy();
    }

} );

test( `If "fontColor" value is #FF0000, default value should be '#FF0000'`, async () => {
    let parallaxProps = {
        slidesCollection: [
            {
                banner: {},
                content: {
                    title: "Title for Content",
                    fontColor: "#FF0000"
                }
            }
        ]
    };

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const title = container.querySelector( '.dxHalfParallax__slide.dxcontent .dxHalfParallax__title h4' ) || new HTMLElement();
    const styles = window.getComputedStyle( title );
    expect( styles.color.includes( 'rgb(255, 0, 0)' ) ).toBeTruthy();
} );

test( `If banner buttons are defined for slides, these should be rendered `, async () => {
    let parallaxProps = {
        slidesCollection: [
            {
                banner: {
                    keypad: {
                        buttons: [
                            {
                                url: 'www.hcl-software.com',
                                label: 'Base 22 button',
                                target: '_blank'
                            },
                            {
                                url: 'www.duckduckgo.com',
                                label: 'Register to vote online'
                            }
                        ]
                    }
                },
                content: {
                    keypad: {
                        buttons: [
                            {
                                url: 'www.duckduckgo.com',
                                label: 'Register to vote online'
                            }
                        ]
                    }
                }
            }
        ]
    };

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const buttons = container.querySelectorAll( '.dxHalfParallax__contentButtons a' );
    expect( buttons ).toHaveLength( 1 );

} );

test( `If content buttons are defined for slides, these should be rendered `, async () => {
    let parallaxProps = {
        slidesCollection: [
            {
                banner: {
                    keypad: {
                        buttons: [
                            {
                                url: 'www.hcl-software.com',
                                label: 'Base 22 button',
                                target: '_blank'
                            },
                            {
                                url: 'www.duckduckgo.com',
                                label: 'Register to vote online'
                            }
                        ]
                    }
                },
                content: {
                    keypad: {
                        buttons: [
                            {
                                url: 'www.duckduckgo.com',
                                label: 'Register to vote online'
                            }
                        ]
                    }
                }
            }
        ]
    };

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const buttons = container.querySelectorAll( '.dxHalfParallax__bannerButtons a' );
    expect( buttons ).toHaveLength( 2 );

} );

test( `If "View More" bottom link is set for Content, it should be render `, async () => {
    let parallaxProps = {
        slidesCollection: [
            {
                banner: {},
                content: {
                    viewMore: {
                        label: 'View Resources',
                        url: 'www.hcl-software.com'
                    }
                }
            }
        ]
    };

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const link = container.querySelectorAll( '.dxHalfParallax__viewMore a' );
    expect( link ).toHaveLength( 1 );

} );

test( `If "View More" bottom link is set for Content, it should be render with the expected label `, async () => {
    let parallaxProps = {
        slidesCollection: [
            {
                banner: {},
                content: {
                    viewMore: {
                        label: 'View Resources',
                        url: 'www.hcl-software.com'
                    }
                }
            }
        ]
    };

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const link = container.querySelectorAll( '.dxHalfParallax__viewMore a' )[0] as HTMLAnchorElement;
    expect( link ).toHaveTextContent( parallaxProps.slidesCollection[0].content.viewMore.label );
} );

test( `If "View More" bottom link is set for Content, it should be render with the expected href `, async () => {
    let parallaxProps = {
        slidesCollection: [
            {
                banner: {},
                content: {
                    viewMore: {
                        label: 'View Resources',
                        url: 'www.hcl-software.com'
                    }
                }
            }
        ]
    };

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const link = container.querySelectorAll( '.dxHalfParallax__viewMore a' )[0] as HTMLAnchorElement;
    expect( link.href ).toMatch( parallaxProps.slidesCollection[0].content.viewMore.url );
} );

test( `If "View More" bottom link is set for Content, it should be render with the expected target `, async () => {
    let parallaxProps = {
        slidesCollection: [
            {
                banner: {},
                content: {
                    viewMore: {
                        label: 'View Resources',
                        url: 'www.hcl-software.com',
                        target: '_blank'
                    }
                }
            }
        ]
    };

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const link = container.querySelectorAll( '.dxHalfParallax__viewMore a' )[0] as HTMLAnchorElement;
    expect( link.target ).toMatch( parallaxProps.slidesCollection[0].content.viewMore.target );
} );

test( `If "View More" bottom link is set for Content, and empty label it should be render with default value `, async () => {
    let parallaxProps = {
        slidesCollection: [
            {
                banner: {},
                content: {
                    viewMore: {
                        label: "",
                        url: 'www.hcl-software.com',
                        target: '_blank'
                    }
                }
            }
        ]
    };

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const link = container.querySelectorAll( '.dxHalfParallax__viewMore a' )[0] as HTMLAnchorElement;
    expect( link ).toHaveTextContent( 'View More' );
} );

test( `If rich text is set for Content it should be rendered`, async () => {
    let parallaxProps = {
        slidesCollection: [
            {
                banner: {},
                content: {
                    richText: "<p>Test content</p>"
                }
            }
        ]
    };

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const richText = container.querySelectorAll( '.dxHalfParallax__richText' );
    expect( richText ).toHaveLength( 1 );
} );

test( `If "Top Image" is set for Banner, it should be render `, async () => {
    let parallaxProps = {
        slidesCollection: [
            {
                banner: {
                    topImage: {
                        url: 'https://clermontelections.org/wp-content/uploads/sites/29/2019/05/unnamed-file-300x300.png'
                    },
                },
                content: {}
            }
        ]
    };

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const topImage = container.querySelector( '.dxHalfParallax__topImage' ) || new HTMLElement();
    const styles = window.getComputedStyle( topImage );
    expect( styles.backgroundImage.includes( 'https://clermontelections.org/wp-content/uploads/sites/29/2019/05/unnamed-file-300x300.png' ) ).toBeTruthy();

} );

test( `If "Bottom Image" is set for Banner, it should be render `, async () => {
    let parallaxProps = {
        slidesCollection: [
            {
                banner: {
                    bottomImage: {
                        url: 'https://clermontelections.org/wp-content/uploads/sites/29/2019/05/unnamed-file-300x300.png'
                    },
                },
                content: {}
            }
        ]
    };

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const bottomImage = container.querySelector( '.dxHalfParallax__bottomImage' ) || new HTMLElement();
    const styles = window.getComputedStyle( bottomImage );
    expect( styles.backgroundImage.includes( 'https://clermontelections.org/wp-content/uploads/sites/29/2019/05/unnamed-file-300x300.png' ) ).toBeTruthy();

} );

test( `If "Main Image" is set for Banner, it should be render `, async () => {
    let parallaxProps = {
        slidesCollection: [
            {
                banner: {
                    mainImage: {
                        url: 'https://clermontelections.org/wp-content/uploads/sites/29/2019/05/unnamed-file-300x300.png'
                    },
                },
                content: {}
            }
        ]
    };

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const mainImage = container.querySelectorAll( '.dxHalfParallax__banner figure > img' );
    expect( mainImage ).toHaveLength( 1 );

} );

//Mobile begin
test( `Mobile: If no slides are set, it should be render component container`, async () => {
    let parallaxProps = {
        slidesCollection: [{
            something: 'Soma value'
        }]
    };
    Object.defineProperty( window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation( query => ( {
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        } ) ),
    } );

    Object.defineProperty( window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 575
    } );
    window.dispatchEvent( new Event( 'resize' ) );

    // @ts-ignore: Ignoring constructor error since invalid structure is being tested.
    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const component = container.querySelector( '.dxHalfParallax' ) || new HTMLElement();
    expect( component.children ).toHaveLength( 0 );
} );

test( `Mobile: If rich text is set for Content it should be rendered`, async () => {
    let parallaxProps = {
        slidesCollection: [
            {
                banner: {},
                content: {
                    richText: "<p>Test content</p>"
                }
            }
        ]
    };

    Object.defineProperty( window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation( query => ( {
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        } ) ),
    } );

    Object.defineProperty( window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 575
    } );
    window.dispatchEvent( new Event( 'resize' ) );

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const richText = container.querySelectorAll( '.dxHalfParallax__richText' );
    expect( richText ).toHaveLength( 1 );
} );

test( `Mobile: If title is set for Content it should be rendered`, async () => {
    let parallaxProps = {
        slidesCollection: [
            {
                banner: {},
                content: {
                    title: "Test title"
                }
            }
        ]
    };

    Object.defineProperty( window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation( query => ( {
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        } ) ),
    } );

    Object.defineProperty( window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 575
    } );
    window.dispatchEvent( new Event( 'resize' ) );

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const title = container.querySelectorAll( '.dxHalfParallax__title' );
    expect( title ).toHaveLength( 1 );
} );

test( `Mobile: If there is at least 1 empty banner, banner should be render `, async () => {
    let parallaxProps = {
        slidesCollection: [{
            banner: {},
            content: {}
        }]
    };

    Object.defineProperty( window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation( query => ( {
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        } ) ),
    } );

    Object.defineProperty( window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 575
    } );
    window.dispatchEvent( new Event( 'resize' ) );

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const banner = container.querySelectorAll( '.dxHalfParallax div figure .dxHalfParallax__banner' );
    expect( banner ).toHaveLength( 1 );

} );

test( `Mobile: If there is at least 1 empty content, banner should be render `, async () => {
    let parallaxProps = {
        slidesCollection: [{
            banner: {},
            content: {}
        }]
    };

    Object.defineProperty( window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation( query => ( {
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        } ) ),
    } );

    Object.defineProperty( window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 575
    } );
    window.dispatchEvent( new Event( 'resize' ) );

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const content = container.querySelectorAll( '.dxHalfParallax div section .dxHalfParallax__content' );
    expect( content ).toHaveLength( 1 );

} );

test( `Mobile: If there is at least 1 empty banner and 1 empty content, it should render 1 fold for Mobile`, async () => {
    let parallaxProps = {
        slidesCollection: [{
            banner: {},
            content: {}
        }]
    };

    Object.defineProperty( window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation( query => ( {
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        } ) ),
    } );

    Object.defineProperty( window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 575
    } );
    window.dispatchEvent( new Event( 'resize' ) );

    const { container } = render( <DXHalfParallax {...parallaxProps} /> );
    const triangle = container.querySelectorAll( '.dxHalfParallax__bottomTriangle' );
    expect( triangle ).toHaveLength( 1 );

} );

describe( "DXHalfParallax Hardening", () => {
    let originalMatchMedia: any;

    beforeAll( () => {
        originalMatchMedia = window.matchMedia;
    } );

    afterAll( () => {
        window.matchMedia = originalMatchMedia;
    } );

    test( "Memory boundaries: rigorously unbinds matchMedia listener upon component unmount", () => {
        const removeListenerSpy = jest.fn();
        window.matchMedia = jest.fn().mockImplementation( query => ( {
            matches: false,
            media: query,
            addEventListener: jest.fn(),
            removeEventListener: removeListenerSpy,
        } ) );

        const { unmount } = render( <DXHalfParallax slidesCollection={[]} /> );
        unmount();

        // Asserts the exact unmount closure executes to prevent memory leaks
        expect( removeListenerSpy ).toHaveBeenCalledTimes( 1 );
        expect( removeListenerSpy ).toHaveBeenCalledWith( "change", expect.any( Function ) );
    } );

    test( "Style Engine: strictly evaluates empty strings for background and forces var(--white) fallback", () => {
        // Stryker mutates `cnt.backgroundColor !== ''` to force truthy evaluation of empty strings.
        const parallaxProps = {
            slidesCollection: [{
                banner: { backgroundColor: "" },
                content: { backgroundColor: "" }
            }]
        };

        const { container } = render( <DXHalfParallax {...parallaxProps} /> );
        const slides = container.querySelectorAll( ".dxHalfParallax__slide" );

        expect( slides ).toHaveLength( 2 );

        // If `!== ''` is mutated, the empty string falls through to the `else` block
        // and returns { backgroundImage: "url()" }. 
        // If it executes correctly, it returns { background: "var(--white)" } which JSDOM omits.
        expect( ( slides[0] as HTMLElement ).style.backgroundImage ).not.toContain( "url" );
        expect( ( slides[1] as HTMLElement ).style.backgroundImage ).not.toContain( "url" );
    } );

    test( "Style Engine: strictly evaluates fontColor formatting and forces var(--dark-dark) fallback for non-hex strings", () => {
        // Stryker mutates `cnt.fontColor.startsWith('#')`
        const parallaxProps = {
            slidesCollection: [{
                banner: {},
                content: {
                    title: "Strict Title",
                    fontColor: "red" // Missing '#' character
                }
            }]
        };

        const { getByText } = render( <DXHalfParallax {...parallaxProps} /> );
        const titleElement = getByText( "Strict Title" );

        // If `.startsWith('#')` is mutated, it accepts "red" and assigns it to the DOM.
        // If it executes correctly, it falls back to var(--dark-dark) which JSDOM omits.
        expect( titleElement.style.color ).not.toBe( "red" );
    } );

    test( "Keypad Fallbacks: rigorously enforces default _self target for empty configurations", () => {
        const parallaxProps = {
            slidesCollection: [{
                banner: {
                    keypad: {
                        background: "",
                        buttons: [{
                            url: "https://example.com",
                            label: "Fallback Button",
                            target: "" // Explicitly empty to force _self
                        }]
                    }
                },
                content: {}
            }]
        };

        const { getByText } = render( <DXHalfParallax {...parallaxProps} /> );
        const anchor = getByText( "Fallback Button" ).closest( "a" ) as HTMLAnchorElement;

        // Asserts the fallback condition _button.target ? ... : "_self"
        expect( anchor.target ).toBe( "_self" );
    } );

    test( "ViewMore Boundary: strictly returns empty fragment when viewMore url is an empty string", () => {
        const parallaxProps = {
            slidesCollection: [{
                banner: {},
                content: {
                    viewMore: {
                        url: "", // Triggers `if (slide.viewMore && slide.viewMore.url !== "")` failure
                        label: "Hidden Link"
                    }
                }
            }]
        };

        const { container } = render( <DXHalfParallax {...parallaxProps} /> );
        const links = container.querySelectorAll( ".dxHalfParallax__viewMore" );

        // Assert the component cleanly bypassed rendering the viewMore container
        expect( links.length ).toBe( 0 );
    } );

    test( "Mobile Render Boundary: strictly returns an empty fragment if either banner or content is completely undefined", () => {
        // Setup mobile environment
        window.matchMedia = jest.fn().mockImplementation( query => ( {
            matches: true,
            media: query,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        } ) );

        const parallaxProps = {
            // Missing `banner` object entirely
            slidesCollection: [{
                banner: undefined as any,
                content: {}
            }]
        };

        const { container } = render( <DXHalfParallax {...parallaxProps} /> );

        // The mobile render engine uses `if (bannerSlide != undefined && contentSlide != undefined)`
        // If either is missing, it returns a React.Fragment containing nothing.
        const slides = container.querySelectorAll( ".dxHalfParallax__slide" );
        const triangles = container.querySelectorAll( ".dxHalfParallax__bottomTriangle" );

        expect( slides.length ).toBe( 0 );
        expect( triangles.length ).toBe( 0 );
    } );

    test( "Image Fallbacks: bypasses rendering top, bottom, and main image wrappers when urls are explicitly empty", () => {
        const parallaxProps = {
            slidesCollection: [{
                banner: {
                    topImage: { url: "" },
                    bottomImage: { url: "" },
                    mainImage: { url: "" }
                },
                content: {}
            }]
        };

        const { container } = render( <DXHalfParallax {...parallaxProps} /> );

        expect( container.querySelector( ".dxHalfParallax__topImage" ) ).toBeNull();
        expect( container.querySelector( ".dxHalfParallax__bottomImage" ) ).toBeNull();
        expect( container.querySelector( ".dxbanner figure > img" ) ).toBeNull();
    } );
} );
