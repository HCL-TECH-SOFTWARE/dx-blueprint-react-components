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
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { projectArgs } from "./DXProjectCard.stories";
import DXProjectCard, { ProjectCardProps } from "./DXProjectCard";

jest.mock( './mixins/_breakpoints.module.scss', () => {
    return {
        md: "768px"
    };
} );

// Test the labels
test( "The component should render the amount of labels passed", () => {
    let props = { ...projectArgs };
    const { container } = render( <DXProjectCard {...props} /> );
    let labels = container.querySelectorAll( ".dxProjectCard__tag" );
    expect( labels.length ).toBe( props.tags.length );
} );

// Test for the manager image
test( "If the manager has no img, the element 'dxProjectCard__avatar' should be there instead", () => {
    let props = {
        ...projectArgs,
        manager: {
            name: "Janet Kavandi",
            profileLink: "/janet-kavandi",
        }
    };
    const { container } = render( <DXProjectCard {...props} /> );
    let avatar = container.querySelector( ".dxProjectCard__manager .dxProjectCard__avatar" );
    expect( avatar ).toBeInTheDocument();
} );

test( "If the manager has img, that should be should be there instead", () => {
    let props = {
        ...projectArgs
    };
    const { container } = render( <DXProjectCard {...props} /> );
    let avatar = container.querySelector( ".dxProjectCard__manager img" );
    expect( avatar ).toBeInTheDocument();
} );

// Test for the members
test( "The component should render all the members passed", () => {
    let props = { ...projectArgs };
    const { container } = render( <DXProjectCard {...projectArgs} /> );
    let members = container.querySelector( ".dxProjectCard__members" );
    expect( members?.childNodes.length ).toBe( props.members.length );
} );

test( "If the only member has no image, the element 'dxProjectCard__member' should be in the document", () => {
    let props = {
        ...projectArgs,
        members: [
            {
                name: "Adam Smith"
            }
        ]
    };
    const { container } = render( <DXProjectCard {...props} /> );
    let member = container.querySelector( ".dxProjectCard__members .dxProjectCard__member" );
    expect( member ).toBeInTheDocument();
} );

test( "If the only member has image, that should be in the document", () => {
    let props = {
        ...projectArgs,
        members: [
            {
                name: "Adam Smith",
                img: "https://images.unsplash.com/photo-1687996345260-2f8e48b6b387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
            }
        ]
    };
    const { container } = render( <DXProjectCard {...props} /> );
    let member = container.querySelector( ".dxProjectCard__members img" );
    expect( member ).toBeInTheDocument();
} );

test( "If the project has more than 5 members, the element 'more-badge' should be in the document", () => {
    let props = {
        ...projectArgs,
        members: [
            {
                name: "Adam Smith",
                img: "https://images.unsplash.com/photo-1687996345260-2f8e48b6b387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
            },
            {
                name: "Adam Smith",
                img: "https://images.unsplash.com/photo-1687996345260-2f8e48b6b387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
            },
            {
                name: "Adam Smith",
            },
            {
                name: "Adam Smith",
            },
            {
                name: "Adam Smith",
                img: "https://images.unsplash.com/photo-1687996345260-2f8e48b6b387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
            },
            {
                name: "Julie Andrews",
            },
            {
                name: "Sam Smith",
            },
            {
                name: "Kevin Scott",
                img: "https://images.unsplash.com/photo-1687996345260-2f8e48b6b387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
            }
        ]
    };
    const { container } = render( <DXProjectCard {...props} /> );
    let moreMember = container.querySelector( '[data-testid="more-badge"]' );
    expect( moreMember ).toBeInTheDocument();
} );

test( "If the project has 8 members, the element 'more-badge' should have the value '+ 3'", () => {
    let props = {
        ...projectArgs,
        members: [
            {
                name: "Adam Smith",
                img: "https://images.unsplash.com/photo-1687996345260-2f8e48b6b387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
            },
            {
                name: "Adam Smith",
                img: "https://images.unsplash.com/photo-1687996345260-2f8e48b6b387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
            },
            {
                name: "Adam Smith",
            },
            {
                name: "Adam Smith",
            },
            {
                name: "Adam Smith",
                img: "https://images.unsplash.com/photo-1687996345260-2f8e48b6b387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
            },
            {
                name: "Julie Andrews",
            },
            {
                name: "Sam Smith",
            },
            {
                name: "Kevin Scott",
                img: "https://images.unsplash.com/photo-1687996345260-2f8e48b6b387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
            }
        ]
    };
    const { container } = render( <DXProjectCard {...props} /> );
    let moreMember = container.querySelector( '[data-testid="more-badge"]' );
    expect( moreMember?.textContent ).toBe( "+3" );
} );

// Test the action button
test( "If the user pass a function to the button and clicks on it, it should be called", async () => {
    let mock = jest.fn();
    let props = {
        ...projectArgs,
        action: {
            label: "Test",
            onClick: mock
        }
    };
    const { container } = render( <DXProjectCard {...props} /> );
    let button = container.querySelector( ".dxProjectCard__buttonsContainer .dxButton" ) as HTMLButtonElement;
    await userEvent.click( button );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user pass a function to the button, focus it and press the Enter key, it should be called", async () => {
    let mock = jest.fn();
    let props = {
        ...projectArgs,
        action: {
            label: "Test",
            onClick: mock
        }
    };
    const { container } = render( <DXProjectCard {...props} /> );
    let button = container.querySelector( ".dxProjectCard__buttonsContainer .dxButton" ) as HTMLButtonElement;
    fireEvent.keyDown( button, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user pass a function to the button, focus it and press the Space key, it should be called", async () => {
    let mock = jest.fn();
    let props = {
        ...projectArgs,
        action: {
            label: "Test",
            onClick: mock
        }
    };
    const { container } = render( <DXProjectCard {...props} /> );
    let button = container.querySelector( ".dxProjectCard__buttonsContainer .dxButton" ) as HTMLButtonElement;
    fireEvent.keyDown( button, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user pass a function to the button, focus it and press the Scape key, it should not be called", async () => {
    let mock = jest.fn();
    let props = {
        ...projectArgs,
        action: {
            label: "Test",
            onClick: mock
        }
    };
    const { container } = render( <DXProjectCard {...props} /> );
    let button = container.querySelector( ".dxProjectCard__buttonsContainer .dxButton" ) as HTMLButtonElement;
    fireEvent.keyDown( button, {
        key: "Escape",
        code: "Escape",
        keyCode: 23,
        charCode: 23,
    } );
    expect( mock ).not.toHaveBeenCalled();
} );

// Test the symbol and image logic
test( "If the user pass an image, it should be rendered", () => {
    const { container } = render( <DXProjectCard {...projectArgs} /> );
    let img = container.querySelector( ".dxProjectCard__image" );
    expect( img ).toBeInTheDocument();
} );

test( "If the user does not pass an img and a symbol, the element 'dxProjectCard__symbol', should be in the document", () => {
    let props: ProjectCardProps = {
        ...projectArgs
    };
    delete props.img;
    const { container } = render( <DXProjectCard {...props} /> );
    let symbol = container.querySelector( ".dxProjectCard__symbol" );
    expect( symbol ).toBeInTheDocument();
} );

test( "If the user does pass a symbol, the element 'dxProjectCard__symbol', should have that value", () => {
    let props: ProjectCardProps = {
        ...projectArgs,
        symbol: "LZT"
    };
    delete props.img;
    const { container } = render( <DXProjectCard {...props} /> );
    let symbol = container.querySelector( ".dxProjectCard__symbol" );
    expect( symbol?.textContent ).toBe( props.symbol );
} );

// Test the desktop classes and styles
test( "On desktop the parent of 'dxProjectCard__manager' should have the classes 'col-12 col-md'", () => {
    const { container } = render( <DXProjectCard {...projectArgs} /> );
    let parent = container.querySelector( ".dxProjectCard__manager" )?.parentElement;
    expect( parent ).toHaveClass( "col-12 col-md" );
} );

test( "On desktop the parent of 'dxProjectCard__memberSection' should have the classes 'col-12 col-md'", () => {
    const { container } = render( <DXProjectCard {...projectArgs} /> );
    let parent = container.querySelector( ".dxProjectCard__memberSection" )?.parentElement;
    expect( parent ).toHaveClass( "col-12 col-md" );
} );

test( "On desktop the parent of 'dxProjectCard__buttonsContainer' should have the classes 'col-12 col-md'", () => {
    const { container } = render( <DXProjectCard {...projectArgs} /> );
    let parent = container.querySelector( ".dxProjectCard__buttonsContainer" )?.parentElement;
    expect( parent ).toHaveClass( "col-12 col-md" );
} );

test( "On desktop the element 'dxProjectCard__trigger' should be null", () => {
    const { container } = render( <DXProjectCard {...projectArgs} /> );
    let trigger = container.querySelector( ".dxProjectCard__trigger" );
    expect( trigger ).toBeNull();
} );

// Test for the tooltip on desktop
test( "If the mouse enter over the member image, the element 'dxProjectCard__tooltip' should be in the document", () => {
    let props = {
        ...projectArgs,
        members: [
            {
                name: "Adam Smith",
                img: "https://images.unsplash.com/photo-1687996345260-2f8e48b6b387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
            }
        ]
    };
    const { container } = render( <DXProjectCard {...props} /> );
    let member = container.querySelector( ".dxProjectCard__memberContainer img" ) as HTMLElement;
    fireEvent.mouseEnter( member );
    let tooltip = container.querySelector( ".dxProjectCard__tooltip" );
    expect( tooltip ).toBeInTheDocument();
} );

test( "If the tooltip is showed, then the member name should be in there", () => {
    let props = {
        ...projectArgs,
        members: [
            {
                name: "Adam Smith",
                img: "https://images.unsplash.com/photo-1687996345260-2f8e48b6b387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
            }
        ]
    };
    const { container } = render( <DXProjectCard {...props} /> );
    let member = container.querySelector( ".dxProjectCard__memberContainer img" ) as HTMLElement;
    fireEvent.mouseEnter( member );
    let tooltip = container.querySelector( ".dxProjectCard__tooltip" );
    expect( tooltip?.textContent ).toBe( props.members[0].name );
} );

test( "If the mouse enter over the member image and then leaves, the element 'dxProjectCard__tooltip' should be null", () => {
    let props = {
        ...projectArgs,
        members: [
            {
                name: "Adam Smith",
                img: "https://images.unsplash.com/photo-1687996345260-2f8e48b6b387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
            }
        ]
    };
    const { container } = render( <DXProjectCard {...props} /> );
    let member = container.querySelector( ".dxProjectCard__memberContainer img" ) as HTMLElement;
    fireEvent.mouseEnter( member );
    fireEvent.mouseLeave( member );
    let tooltip = container.querySelector( ".dxProjectCard__tooltip" );
    expect( tooltip ).toBeNull();
} );

test( "If the mouse enter over the member avatar, the element 'dxProjectCard__tooltip' should be in the document", () => {
    let props = {
        ...projectArgs,
        members: [
            {
                name: "Adam Smith",
            }
        ]
    };
    const { container } = render( <DXProjectCard {...props} /> );
    let member = container.querySelector( ".dxProjectCard__memberContainer .dxProjectCard__member" ) as HTMLElement;
    fireEvent.mouseEnter( member );
    let tooltip = container.querySelector( ".dxProjectCard__tooltip" );
    expect( tooltip ).toBeInTheDocument();
} );

test( "If the tooltip is showed, then the member name should be in there", () => {
    let props = {
        ...projectArgs,
        members: [
            {
                name: "Adam Smith",
            }
        ]
    };
    const { container } = render( <DXProjectCard {...props} /> );
    let member = container.querySelector( ".dxProjectCard__memberContainer .dxProjectCard__member" ) as HTMLElement;
    fireEvent.mouseEnter( member );
    let tooltip = container.querySelector( ".dxProjectCard__tooltip" );
    expect( tooltip?.textContent ).toBe( props.members[0].name );
} );

test( "If the mouse enter over the member avatar and then leaves, the element 'dxProjectCard__tooltip' should be null", () => {
    let props = {
        ...projectArgs,
        members: [
            {
                name: "Adam Smith",
            }
        ]
    };
    const { container } = render( <DXProjectCard {...props} /> );
    let member = container.querySelector( ".dxProjectCard__memberContainer .dxProjectCard__member" ) as HTMLElement;
    fireEvent.mouseEnter( member );
    fireEvent.mouseLeave( member );
    let tooltip = container.querySelector( ".dxProjectCard__tooltip" );
    expect( tooltip ).toBeNull();
} );

// Tests for the loader
test( "When the image is rendering, the element 'loader__container' should not have the class 'd-none'", () => {
    const { container } = render( <DXProjectCard {...projectArgs} /> );
    let loaderContainer = container.querySelector( ".loader__container" );
    expect( loaderContainer ).not.toHaveClass( "d-none" );
} );

test( "When the image finish its rendering, the element 'loader__container' should have the class 'd-none'", () => {
    const { container } = render( <DXProjectCard {...projectArgs} /> );
    let cover = container.querySelector( ".dxProjectCard__image img" ) as HTMLElement;
    fireEvent.load( cover );
    let loaderContainer = container.querySelector( ".loader__container" );
    expect( loaderContainer ).toHaveClass( "d-none" );
} );

// Test for mobile
describe( "Mobile behavior", () => {
    test( "On mobile the parent of 'dxProjectCard__manager' should have the classes 'col-12 col-md d-none'", () => {
        Object.defineProperties( window.HTMLElement.prototype, {
            offsetWidth: {
                get: function () { return 500; }
            }
        } );
        const { container } = render( <DXProjectCard {...projectArgs} /> );
        let parent = container.querySelector( ".dxProjectCard__manager" )?.parentElement;
        expect( parent ).toHaveClass( "col-12 col-md d-none" );
    } );

    test( "On mobile the parent of 'dxProjectCard__memberSection' should have the classes 'col-12 col-md d-none'", () => {
        const { container } = render( <DXProjectCard {...projectArgs} /> );
        let parent = container.querySelector( ".dxProjectCard__memberSection" )?.parentElement;
        expect( parent ).toHaveClass( "col-12 col-md d-none" );
    } );

    test( "On mobile the parent of 'dxProjectCard__buttonsContainer' should have the classes 'col-12 col-md d-none'", () => {
        const { container } = render( <DXProjectCard {...projectArgs} /> );
        let parent = container.querySelector( ".dxProjectCard__buttonsContainer" )?.parentElement;
        expect( parent ).toHaveClass( "col-12 col-md d-none" );
    } );

    test( "On mobile the element 'dxProjectCard__trigger' should be in the document", () => {
        const { container } = render( <DXProjectCard {...projectArgs} /> );
        let trigger = container.querySelector( ".dxProjectCard__trigger" );
        expect( trigger ).toBeInTheDocument();
    } );

    test( "On mobile if the user clicks on the 'dxProjectCard__trigger' the parent of 'dxProjectCard__manager' should have the classes 'col-12 col-md'", async () => {
        const { container } = render( <DXProjectCard {...projectArgs} /> );
        let trigger = container.querySelector( ".dxProjectCard__trigger" ) as HTMLButtonElement;
        await userEvent.click( trigger );
        let el = container.querySelector( ".dxProjectCard__manager" )?.parentElement;
        expect( el ).toHaveClass( "col-12 col-md" );
    } );

    test( "On mobile if the user clicks on the 'dxProjectCard__trigger' the parent of 'dxProjectCard__memberSection' should have the classes 'col-12 col-md'", async () => {
        const { container } = render( <DXProjectCard {...projectArgs} /> );
        let trigger = container.querySelector( ".dxProjectCard__trigger" ) as HTMLButtonElement;
        await userEvent.click( trigger );
        let el = container.querySelector( ".dxProjectCard__memberSection" )?.parentElement;
        expect( el ).toHaveClass( "col-12 col-md" );
    } );

    test( "On mobile if the user clicks on the 'dxProjectCard__trigger' the parent of 'dxProjectCard__buttonsContainer' should have the classes 'col-12 col-md'", async () => {
        const { container } = render( <DXProjectCard {...projectArgs} /> );
        let trigger = container.querySelector( ".dxProjectCard__trigger" ) as HTMLButtonElement;
        await userEvent.click( trigger );
        let el = container.querySelector( ".dxProjectCard__buttonsContainer" )?.parentElement;
        expect( el ).toHaveClass( "col-12 col-md" );
    } );

    test( "On mobile if the user does not pass an icon for close, the 'dxProjectCard__trigger' icon will have the class'ci-Chevron_Down'", async () => {
        let props = {
            ...projectArgs,
        };
        const { container } = render( <DXProjectCard {...props} /> );
        let icon = container.querySelector( ".dxProjectCard__trigger i" ) as HTMLButtonElement;
        expect( icon ).toHaveClass( "ci-Chevron_Down" );
    } );

    test( "On mobile if the user does pass an icon for close, the 'dxProjectCard__trigger' icon will apply it", async () => {
        let props = {
            ...projectArgs,
            icons: {
                close: "ci-Remove_Minus"
            }
        };
        const { container } = render( <DXProjectCard {...props} /> );
        let icon = container.querySelector( ".dxProjectCard__trigger i" ) as HTMLButtonElement;
        expect( icon ).toHaveClass( props.icons.close );
    } );

    test( "On mobile if the user does not pass an icon for the open and clicks on the 'dxProjectCard__trigger' the icon will have the class 'ci-Chevron_Up'", async () => {
        const { container } = render( <DXProjectCard {...projectArgs} /> );
        let trigger = container.querySelector( ".dxProjectCard__trigger" ) as HTMLButtonElement;
        await userEvent.click( trigger );
        let icon = container.querySelector( ".dxProjectCard__trigger i" );
        expect( icon ).toHaveClass( "ci-Chevron_Up" );
    } );

    test( "On mobile if the user does pass an icon for the open and clicks on the 'dxProjectCard__trigger' the icon will have that class", async () => {
        let props = {
            ...projectArgs,
            icons: {
                open: "ci-Add_Plus"
            }
        };
        const { container } = render( <DXProjectCard {...props} /> );
        let trigger = container.querySelector( ".dxProjectCard__trigger" ) as HTMLButtonElement;
        await userEvent.click( trigger );
        let icon = container.querySelector( ".dxProjectCard__trigger i" );
        expect( icon ).toHaveClass( props.icons.open );
    } );

} );
