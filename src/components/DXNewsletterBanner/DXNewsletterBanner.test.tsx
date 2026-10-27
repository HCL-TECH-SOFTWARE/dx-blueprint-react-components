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
import React, { FormEventHandler } from "react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DXNewsletterBanner, { NewsletterProps } from "./DXNewsletterBanner";

// OverlayTrigger uses Popper.js which schedules positioning updates via
// requestAnimationFrame — outside React's act() boundary — producing spurious
// "not wrapped in act" warnings. Replace it with a pass-through in tests;
// tooltip behaviour is covered via aria attributes below.
jest.mock( 'react-bootstrap/OverlayTrigger', () => ( {
    __esModule: true,
    default: ( { children }: { children: React.ReactNode } ) => <>{ children }</>,
} ) );

describe( "Newsletter Banner", () => {
    test( "Full Rendering", () => {
        let onSubmit: FormEventHandler<Element> = ( e ) => { e.preventDefault(); };
        let mock = jest.fn( onSubmit );

        let newsletter: NewsletterProps = {
            heading: "Sign up to get recent news in your inbox!",
            headingColor: "#000",
            type: "email",
            inputPlaceholder: "Enter email address",
            button: {
                label: "Sign Up",
                onClick: mock
            },
            background: {
                color: "pink",
                image: "https://images.unsplash.com/photo-1516641051054-9df6a1aad654?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80",
                size: "contain",
                repeat: "repeat",
                position: "top center"
            }
        };

        render( <DXNewsletterBanner {...newsletter} /> );

        expect( screen.getByTestId( "newsletter-item" ) ).toBeTruthy();
    } );

    test( "Partial Rendering", () => {
        let newsletter: NewsletterProps = {
            heading: "Click here to get to the listing!",
            type: "link",
            link: {
                url: "https://hcl-software.com/",
                label: "Go!"
            },
        };

        render( <DXNewsletterBanner {...newsletter} /> );

        expect( screen.getByTestId( "newsletter-item" ) ).toBeTruthy();
    } );
} );

describe( "Heading", () => {
    test( "If a heading color is specified, it should be displayed with said color", () => {
        expect.assertions( 3 );

        let newsletters: NewsletterProps[] = [
            {
                heading: "Click here to get to the listing!",
                headingColor: "pink",
                type: "link",
                link: {
                    url: "https://hcl-software.com/",
                    label: "Go!"
                }
            },
            {
                heading: "Click here to get to the listing!",
                headingColor: "#e56fdf",
                type: "link",
                link: {
                    url: "https://hcl-software.com/",
                    label: "HCL Software"
                }
            },
            {
                heading: "For the listing!",
                headingColor: "#000",
                type: "link",
                link: {
                    url: "https://hcl-software.com/",
                    label: "Click here"
                }
            }
        ];

        newsletters.forEach( ( letter ) => {
            render( <DXNewsletterBanner {...letter} /> );
        } );

        let renderedHeadings = screen.getAllByRole( 'heading' );
        renderedHeadings.forEach( ( h, i ) => {
            expect( h ).toHaveStyle( 'color: ' + newsletters[i].headingColor );
        } );
    } );
} );

describe( "Variants", () => {
    describe( "Email type", () => {
        test( "The newsletter will have a form with an input field", () => {
            expect.assertions( 2 );

            let newsletter: NewsletterProps = {
                heading: "Sign up to get recent news in your inbox!",
                type: "email",
                inputPlaceholder: "Enter email address",
            };

            render( <DXNewsletterBanner {...newsletter} /> );

            expect( screen.getByTestId( "newsletter-form" ).tagName ).toBe( "FORM" );
            expect( screen.getByRole( 'textbox' ).tagName ).toBe( "INPUT" );
        } );

        test( "There will be validation for the input format", async () => {
            expect.assertions( 2 );

            let newsletter: NewsletterProps = {
                heading: "Sign up to get recent news in your inbox!",
                type: "email",
                inputPlaceholder: "Enter email address",
            };

            render( <DXNewsletterBanner {...newsletter} /> );

            let input: HTMLInputElement = screen.getByRole( 'textbox' );
            await userEvent.type( input, "lorem ipsum" );
            await waitFor( () => expect( input ).toBeInvalid() );

            await userEvent.clear( input );
            await userEvent.type( input, "ana.guajardo@hcl-software.com" );
            await waitFor( () => expect( input ).toBeValid() );
        } );

        test( "The submit button will only work when the input format is correct", async () => {
            expect.assertions( 3 );

            let onSubmit: FormEventHandler<Element> = ( e ) => { e.preventDefault(); };
            let mock = jest.fn( onSubmit );

            let newsletter: NewsletterProps = {
                heading: "Sign up to get recent news in your inbox!",
                type: "email",
                inputPlaceholder: "Enter email address",
                button: {
                    label: "Sign Up",
                    onClick: mock
                }
            };

            render( <DXNewsletterBanner {...newsletter} /> );

            let input: HTMLInputElement = screen.getByRole( 'textbox' );
            let button = screen.getByRole( 'button' );

            await userEvent.click( button );
            expect( mock ).not.toHaveBeenCalled();

            await userEvent.type( input, "lorem ipsum" );
            await waitFor( () => expect( button ).toBeDisabled() );

            await userEvent.clear( input );
            await userEvent.type( input, "ana.guajardo@hcl-software.com" );
            await userEvent.click( button );
            await waitFor( () => expect( mock ).toHaveBeenCalled() );
        } );
    } );

    describe( "Link type", () => {
        test( "The newsletter will only have an anchor element", () => {
            let newsletter: NewsletterProps = {
                heading: "Click here to visit the HCL Software website",
                type: "link",
                link: {
                    url: "https://hcl-software.com/",
                    label: "Go!"
                }
            };

            render( <DXNewsletterBanner {...newsletter} /> );

            expect( screen.getByRole( 'link' ).tagName ).toBe( "A" );
        } );

        test( "If you specify a url, label and target, they should be displayed correctly", () => {
            expect.assertions( 3 );

            let newsletter: NewsletterProps = {
                heading: "Click here to visit the HCL Software website",
                type: "link",
                link: {
                    url: "https://hcl-software.com/",
                    label: "Go!",
                    target: "_blank"
                }
            };

            render( <DXNewsletterBanner {...newsletter} /> );

            let link: HTMLAnchorElement = screen.getByRole( 'link' );

            expect( link.href ).toEqual( newsletter.link?.url );
            expect( link ).toHaveTextContent( newsletter.link?.label! );
            expect( link.target ).toEqual( newsletter.link?.target );
        } );

        test( "If you don't specify a link and any of its properties, there should be default fallback values", () => {
            expect.assertions( 3 );

            let newsletter: NewsletterProps = {
                heading: "Click here to visit the HCL Software website",
                type: "link",
            };

            render( <DXNewsletterBanner {...newsletter} /> );

            let link: HTMLAnchorElement = screen.getByRole( 'link' );

            expect( link.href ).toEqual( window.location.href + "#" );
            expect( link.text ).toEqual( "Submit" );
            expect( link.target ).toEqual( "_self" );
        } );
    } );

    describe( "Message type", () => {
        test( "The newsletter will have a form with a textarea field", () => {
            expect.assertions( 2 );

            let newsletter: NewsletterProps = {
                heading: "Got a suggestion?",
                type: "message",
                inputPlaceholder: "Type here..."
            };

            render( <DXNewsletterBanner {...newsletter} /> );

            expect( screen.getByTestId( "newsletter-form" ).tagName ).toBe( "FORM" );
            expect( screen.getByRole( 'textbox' ).tagName ).toBe( "TEXTAREA" );
        } );

        test( "If no type is specified, the newsletter will be 'message' by default", () => {
            expect.assertions( 2 );

            let newsletter: NewsletterProps = {
                heading: "Got a suggestion?",
                inputPlaceholder: "Type here..."
            };

            render( <DXNewsletterBanner {...newsletter} /> );

            expect( screen.getByTestId( "newsletter-form" ).tagName ).toBe( "FORM" );
            expect( screen.getByRole( 'textbox' ).tagName ).toBe( "TEXTAREA" );
        } );

        test( "An empty message can't be submitted", async () => {
            expect.assertions( 2 );

            let onSubmit: FormEventHandler<Element> = ( e ) => { e.preventDefault(); };
            let mock = jest.fn( onSubmit );

            let newsletter: NewsletterProps = {
                heading: "Got a suggestion?",
                inputPlaceholder: "Type here...",
                button: {
                    label: "Send it",
                    onClick: mock
                }
            };

            render( <DXNewsletterBanner {...newsletter} /> );

            let textarea: HTMLTextAreaElement = screen.getByRole( 'textbox' );
            let button = screen.getByRole( 'button' );

            await userEvent.click( button );
            expect( mock ).not.toHaveBeenCalled();

            await userEvent.type( textarea, "lorem ipsum" );
            await userEvent.click( button );
            expect( mock ).toHaveBeenCalled();
        } );
    } );
} );

describe( "Input Placeholder", () => {
    test( "If one is specified, it should be displayed", () => {
        expect.assertions( 2 );

        let newsletters: NewsletterProps[] = [
            {
                heading: "Sign up here!",
                type: "email",
                inputPlaceholder: "Enter your email"
            },
            {
                heading: "Got any feedback?",
                type: "message",
                inputPlaceholder: "Type here..."
            }
        ];

        newsletters.forEach( ( letter ) => {
            render( <DXNewsletterBanner {...letter} /> );
        } );

        let renderedTextboxes = screen.getAllByRole( 'textbox' );
        renderedTextboxes.forEach( ( txtbox, i ) => {
            let textbox = txtbox as HTMLInputElement | HTMLTextAreaElement;
            expect( textbox.placeholder ).toEqual( newsletters[i].inputPlaceholder );
        } );
    } );
} );

describe( "Max Length", () => {
    test( "If one is specified, it should be enforced", () => {
        expect.assertions( 2 );

        let newsletters: NewsletterProps[] = [
            {
                heading: "Sign up here!",
                type: "email",
                inputPlaceholder: "Enter your email",
                maxLength: 50
            },
            {
                heading: "Got any feedback?",
                type: "message",
                inputPlaceholder: "Type here...",
                maxLength: 3000
            }
        ];

        newsletters.forEach( ( letter ) => {
            render( <DXNewsletterBanner {...letter} /> );
        } );

        let renderedTextboxes = screen.getAllByRole( 'textbox' );
        renderedTextboxes.forEach( ( txtbox, i ) => {
            let textbox = txtbox as HTMLInputElement | HTMLTextAreaElement;
            expect( textbox.maxLength ).toEqual( newsletters[i].maxLength );
        } );
    } );

    test( "If one isn't specified, there should be a default fallback value", () => {
        expect.assertions( 2 );

        let newsletters: NewsletterProps[] = [
            {
                heading: "Sign up here!",
                type: "email",
                inputPlaceholder: "Enter your email",
            },
            {
                heading: "Got any feedback?",
                type: "message",
                inputPlaceholder: "Type here...",
            }
        ];

        newsletters.forEach( ( letter ) => {
            render( <DXNewsletterBanner {...letter} /> );
        } );

        let renderedTextboxes = screen.getAllByRole( 'textbox' );

        expect( ( renderedTextboxes[0] as HTMLInputElement ).maxLength ).toEqual( 100 );
        expect( ( renderedTextboxes[1] as HTMLTextAreaElement ).maxLength ).toEqual( 1500 );
    } );
} );

describe( "Button", () => {
    test( "If a label is given, it should be displayed; otherwise it should default to 'Submit'", () => {
        expect.assertions( 2 );

        let onSubmit: FormEventHandler<Element> = ( e ) => { e.preventDefault(); };
        let mock = jest.fn( onSubmit );

        let newsletters: NewsletterProps[] = [
            {
                heading: "Sign up here!",
                type: "email",
                button: {
                    label: "Sign me up",
                    onClick: mock
                }
            },
            {
                heading: "Got any feedback?",
                type: "message"
            }
        ];

        newsletters.forEach( ( letter ) => {
            render( <DXNewsletterBanner {...letter} /> );
        } );

        let renderedButtons: HTMLButtonElement[] = screen.getAllByRole( 'button' );

        expect( renderedButtons[0].textContent ).toEqual( newsletters[0].button?.label );
        expect( renderedButtons[1].textContent ).toEqual( "Submit" );
    } );
} );

describe( "Button", () => {
    test( "If a label is given, it should be displayed; otherwise it should default to 'Submit'", () => {
        expect.assertions( 2 );

        let onSubmit: FormEventHandler<Element> = ( e ) => { e.preventDefault(); };
        let mock = jest.fn( onSubmit );

        let newsletters: NewsletterProps[] = [
            {
                heading: "Sign up here!",
                type: "email",
                button: {
                    label: "Sign me up",
                    onClick: mock
                }
            },
            {
                heading: "Got any feedback?",
                type: "message"
            }
        ];

        newsletters.forEach( ( letter ) => {
            render( <DXNewsletterBanner {...letter} /> );
        } );

        let renderedButtons: HTMLButtonElement[] = screen.getAllByRole( 'button' );

        expect( renderedButtons[0].textContent ).toEqual( newsletters[0].button?.label );
        expect( renderedButtons[1].textContent ).toEqual( "Submit" );
    } );

    test( "If a function is specified, it should be called upon on submit", async () => {
        let onSubmit: FormEventHandler<Element> = ( e ) => { e.preventDefault(); };
        let mock = jest.fn( onSubmit );

        let newsletter: NewsletterProps = {
            heading: "Got a suggestion?",
            inputPlaceholder: "Type here...",
            button: {
                label: "Send it",
                onClick: mock
            }
        };

        render( <DXNewsletterBanner {...newsletter} /> );

        let textarea: HTMLTextAreaElement = screen.getByRole( 'textbox' );
        let button = screen.getByRole( 'button' );

        await userEvent.type( textarea, "lorem ipsum" );
        await userEvent.click( button );
        expect( mock ).toHaveBeenCalled();
    } );
} );

/**
 * Since jest can only check for inline styles, only tests for content author values were made
 * https://stackoverflow.com/questions/64638498/how-to-test-styling-using-jest
 */
describe( "Backgrounds", () => {
    test( "If background properties are given, they should be rendered as a style in the component", () => {
        let newsletter: NewsletterProps = {
            heading: "Sign up to get recent news in your inbox!",
            type: "email",
            inputPlaceholder: "Enter email address",
            background: {
                color: "pink",
                image: "https://images.unsplash.com/photo-1554147090-e1221a04a025?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80",
                size: "contain",
                repeat: "repeat",
                position: "top center"
            }
        };

        render( <DXNewsletterBanner {...newsletter} /> );

        expect( screen.getByTestId( "newsletter-item" ) ).toHaveStyle(
            `background-color: ${newsletter.background?.color}; background-image: url(${newsletter.background?.image}); background-size: ${newsletter.background?.size}; background-repeat: ${newsletter.background?.repeat}; background-position: ${newsletter.background?.position}`
        );
    } );
    describe( "Background Size", () => {
        test( "If a proper background size value is passed, it should be rendered", () => {
            expect.assertions( 4 );

            let newsletters: NewsletterProps[] = [
                {
                    heading: "Sign up",
                    background: {
                        size: "contain"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        size: "12px"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        size: "50% auto"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        size: "initial"
                    }
                }
            ];

            newsletters.forEach( ( letter ) => {
                render( <DXNewsletterBanner {...letter} /> );
            } );

            let renderedNewsletters = screen.getAllByTestId( "newsletter-item" );
            renderedNewsletters.forEach( ( nwsLttr, i ) => {
                expect( nwsLttr ).toHaveStyle( 'background-size: ' + newsletters[i].background?.size );
            } );
        } );

        test( "If wrongly formatted values are passed, it should fail-safe to 'auto'", () => {
            expect.assertions( 4 );

            let newsletters: NewsletterProps[] = [
                {
                    heading: "Sign up",
                    background: {
                        size: "contageous"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        size: "12pxx"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        size: "auto 30em 5%"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        size: "auto, auto" //no multiple backgrounds are taken into account, so it counts as an error
                    }
                }
            ];

            newsletters.forEach( ( letter ) => {
                render( <DXNewsletterBanner {...letter} /> );
            } );

            let renderedNewsletters = screen.getAllByTestId( "newsletter-item" );
            renderedNewsletters.forEach( ( nwsLttr, i ) => {
                expect( nwsLttr ).toHaveStyle( 'background-size: auto' );
            } );
        } );
    } );

    describe( "Background Position", () => {
        test( "If a proper background position value is passed, it should be rendered", () => {
            expect.assertions( 6 );

            let newsletters: NewsletterProps[] = [
                {
                    heading: "Sign up",
                    background: {
                        position: "top"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        position: "25%"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        position: "10ch 8em"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        position: "bottom 5% right"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        position: "bottom 10px right 20px"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        position: "inherit"
                    }
                }
            ];

            newsletters.forEach( ( letter ) => {
                render( <DXNewsletterBanner {...letter} /> );
            } );

            let renderedNewsletters = screen.getAllByTestId( "newsletter-item" );
            renderedNewsletters.forEach( ( nwsLttr, i ) => {
                expect( nwsLttr ).toHaveStyle( 'background-position: ' + newsletters[i].background?.position );
            } );
        } );

        test( "If wrongly formatted values are passed, it should render nothing", () => {
            expect.assertions( 4 );

            let newsletters: NewsletterProps[] = [
                {
                    heading: "Sign up",
                    background: {
                        position: "start"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        position: "15%%"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        position: "auto 30em 5% 26px 0"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        position: "0 0, center" //no multiple backgrounds are taken into account, so it counts as an error
                    }
                }
            ];

            newsletters.forEach( ( letter ) => {
                render( <DXNewsletterBanner {...letter} /> );
            } );

            let renderedNewsletters = screen.getAllByTestId( "newsletter-item" );

            renderedNewsletters.forEach( ( nwsLttr ) => {
                expect( nwsLttr ).toHaveStyle( 'background-position: undefined' );
            } );
        } );
    } );

    describe( "Background Repeat", () => {
        test( "If a proper background repeat value is passed, it should be rendered", () => {
            expect.assertions( 5 );

            let newsletters: NewsletterProps[] = [
                {
                    heading: "Sign up",
                    background: {
                        repeat: "repeat-x"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        repeat: "no-repeat round"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        repeat: "initial"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        repeat: "repeat"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        repeat: "space"
                    }
                }
            ];

            newsletters.forEach( ( letter ) => {
                render( <DXNewsletterBanner {...letter} /> );
            } );

            let renderedNewsletters = screen.getAllByTestId( "newsletter-item" );
            renderedNewsletters.forEach( ( nwsLttr, i ) => {
                expect( nwsLttr ).toHaveStyle( 'background-repeat: ' + newsletters[i].background?.repeat );
            } );
        } );

        test( "If wrongly formatted values are passed, it should render nothing", () => {
            expect.assertions( 3 );

            let newsletters: NewsletterProps[] = [
                {
                    heading: "Sign up",
                    background: {
                        repeat: "repeat-z"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        repeat: "no-repeat round space"
                    }
                },
                {
                    heading: "Sign up",
                    background: {
                        repeat: "initialized"
                    }
                }
            ];

            newsletters.forEach( ( letter ) => {
                render( <DXNewsletterBanner {...letter} /> );
            } );

            let renderedNewsletters = screen.getAllByTestId( "newsletter-item" );

            renderedNewsletters.forEach( ( nwsLttr ) => {
                expect( nwsLttr ).toHaveStyle( 'background-repeat: undefined' );
            } );
        } );
    } );
} );

describe( "DXNewsletterBanner Hardening", () => {
    test( "Background Formatting Constraints: gracefully sanitizes and falls back background properties consisting solely of whitespace", () => {
        const props: NewsletterProps = {
            heading: "Whitespace Test",
            type: "email",
            background: {
                image: "   ", // Explicitly whitespace to trigger `.trim()` falsy evaluation
                size: "   ",
                position: "   ",
                repeat: "   "
            }
        };

        const { getByTestId } = render( <DXNewsletterBanner {...props} /> );
        const banner = getByTestId( "newsletter-item" );

        // Asserts the `.trim() ? ...` logic bypassed the empty strings and correctly mapped to fallbacks
        const styleString = banner.getAttribute( "style" ) || "";
        expect( styleString ).toContain( "background-image: none" );
        expect( styleString ).toContain( "background-size: auto" );
        expect( styleString ).not.toContain( "background-repeat:" );
        expect( styleString ).not.toContain( "background-position:" );
    } );

    test( "Event Execution Boundary: rigorously enforces preventDefault when button onClick is completely omitted", () => {
        const props: NewsletterProps = {
            heading: "Submit Test",
            type: "email", // Renders the <Form> element
        };

        const { getByTestId } = render( <DXNewsletterBanner {...props} /> );
        const form = getByTestId( "newsletter-form" );

        // Fire a native submit event and check if `preventDefault` was executed internally
        const submitEvent = new Event( "submit", { cancelable: true, bubbles: true } );

        // fireEvent returns `false` if event.preventDefault() was successfully called during the dispatch
        const result = fireEvent( form, submitEvent );

        expect( result ).toBe( false );
    } );

    test( "Style Injection Constraints: explicitly prevents invalid inline color assignment when headingColor is an empty string", () => {
        const props: NewsletterProps = {
            heading: "Color Test",
            type: "link",
            headingColor: "", // Empty string triggers `|| undefined` fallback
            link: { url: "test", label: "Test" }
        };

        const { getByText } = render( <DXNewsletterBanner {...props} /> );
        const heading = getByText( "Color Test" );

        // Assert React completely omitted the style attribute because the evaluated property was undefined
        expect( heading.getAttribute( "style" ) ).toBeNull();
    } );

    test( "Placeholder String Coercion: strictly falls back to structural defaults for the screen reader label when placeholder evaluates to whitespace", () => {
        const props: NewsletterProps = {
            heading: "Message Placeholder",
            type: "message",
            inputPlaceholder: "   " // Triggers `.trim() || ...` fallback execution
        };

        const { container } = render( <DXNewsletterBanner {...props} /> );

        // The fallback logic is structurally applied to the Form.Label for screen readers
        const label = container.querySelector( "label[for='dxNewsletter__input']" );

        // Assert it evaluated the ternary `type === "email" ? ... : "Enter your message"`
        expect( label?.textContent ).toBe( "Enter your message" );
    } );

    test( "Max Length Coercion: strictly supersedes mathematically falsy values with layout defaults", () => {
        const props: NewsletterProps = {
            heading: "Length Enforcement",
            type: "email",
            maxLength: 0 // `0` is falsy, which triggers the `|| 100` fallback
        };

        const { getByRole } = render( <DXNewsletterBanner {...props} /> );
        const input = getByRole( "textbox" ) as HTMLInputElement;

        expect( input.maxLength ).toBe( 100 );
    } );

    test( "Structural Typography Elements: explicitly binds h2 tag to link layout and h3 to email/message layout", () => {
        const { container: containerLink } = render( <DXNewsletterBanner heading="Link Type" type="link" /> );
        expect( containerLink.querySelector( "h2" ) ).toBeInTheDocument();
        expect( containerLink.querySelector( "h3" ) ).toBeNull();

        const { container: containerEmail } = render( <DXNewsletterBanner heading="Email Type" type="email" /> );
        expect( containerEmail.querySelector( "h3" ) ).toBeInTheDocument();
        expect( containerEmail.querySelector( "h2" ) ).toBeNull();
    } );
} );

describe( "Email Validation Tooltip", () => {
    test( "aria-invalid is set and an error message is exposed when an invalid email is entered", async () => {
        let newsletter: NewsletterProps = {
            heading: "Sign up to get recent news in your inbox!",
            type: "email",
            inputPlaceholder: "Enter email address",
        };

        render( <DXNewsletterBanner {...newsletter} /> );

        let input: HTMLInputElement = screen.getByRole( 'textbox' );
        await userEvent.type( input, "not-an-email" );

        await waitFor( () => {
            expect( input ).toHaveAttribute( 'aria-invalid', 'true' );
            expect( input ).toHaveAttribute( 'aria-errormessage', 'Please enter a valid email' );
        } );
    } );

    test( "aria-invalid is cleared when a valid email is entered after an invalid one", async () => {
        let newsletter: NewsletterProps = {
            heading: "Sign up to get recent news in your inbox!",
            type: "email",
            inputPlaceholder: "Enter email address",
        };

        render( <DXNewsletterBanner {...newsletter} /> );

        let input: HTMLInputElement = screen.getByRole( 'textbox' );
        await userEvent.type( input, "not-an-email" );

        await waitFor( () => {
            expect( input ).toHaveAttribute( 'aria-invalid', 'true' );
        } );

        await userEvent.clear( input );
        await userEvent.type( input, "valid@email.com" );

        await waitFor( () => {
            expect( input ).toHaveAttribute( 'aria-invalid', 'false' );
            expect( input ).toHaveAttribute( 'aria-errormessage', '' );
        } );
    } );
} );
