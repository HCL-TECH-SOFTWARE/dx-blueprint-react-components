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
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXVerticalNavigation from "./DXVerticalNavigation";

describe( "No Levels Behavior", () => {
    it( "will render the same amount of items passed", () => {
        let props = {
            items: [
                { url: "/one", label: "one" },
                { url: "/two", label: "two" },
                { url: "/three", label: "three" },
            ]
        };
        const { container } = render( <DXVerticalNavigation {...props} /> );
        let items = container.querySelectorAll( ".dxVerticalNav .nav-link" );
        expect( items ).toHaveLength( props.items.length );
    } );

    it( "will add the class active when the prop is passed to the item", () => {
        let props = {
            items: [
                { url: "/one", label: "one", active: true },
            ]
        };
        const { container } = render( <DXVerticalNavigation {...props} /> );
        let item = container.querySelector( ".dxVerticalNav .nav-link" );
        expect( item ).toHaveClass( "active" );
    } );
} );

describe( "One Level Behavior", () => {
    it( "will render a button for the nav-link class", () => {
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    items: [
                        {
                            url: "/two",
                            label: "TWO"
                        }
                    ]
                }
            ]
        };
        const { container } = render( <DXVerticalNavigation {...props} /> );
        let trigger = container.querySelector( ".dxVerticalNav .nav-link" );
        expect( trigger?.tagName ).toBe( "BUTTON" );
    } );

    it( "will render a div under the nav-item element", () => {
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    items: [
                        {
                            url: "/two",
                            label: "TWO"
                        }
                    ]
                }
            ]
        };
        const { container } = render( <DXVerticalNavigation {...props} /> );
        let navItem = container.querySelector( ".dxVerticalNav .nav-item" ) as HTMLElement;
        let divEl = navItem.childNodes[navItem.childNodes.length - 1];
        expect( divEl ).toBeInTheDocument();
    } );

    it( "will add the class show to the div when the user clicks on it", async () => {
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    items: [
                        {
                            url: "/two",
                            label: "TWO"
                        }
                    ]
                }
            ]
        };
        const { container, getByTestId } = render( <DXVerticalNavigation {...props} /> );
        let trigger = getByTestId( "vertical-nav-button-icon" ) as HTMLElement;
        await userEvent.click( trigger );
        let newCollapsible = container.querySelector( ".dxVerticalNav .nav-item .collapse" ) as HTMLElement;
        expect( newCollapsible ).toHaveClass( "show" );
    } );

    it( "will add the class show to the div when the focus the Enter key and press it", async () => {
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    items: [
                        {
                            url: "/two",
                            label: "TWO"
                        }
                    ]
                }
            ]
        };
        const { container, getByTestId } = render( <DXVerticalNavigation {...props} /> );
        let trigger = getByTestId( "vertical-nav-button-icon" ) as HTMLElement;
        fireEvent.keyDown( trigger, {
            key: "Escape",
            code: "Escape",
            keyCode: 13,
            charCode: 13
        } );
        let newCollapsible = container.querySelector( ".dxVerticalNav .nav-item .collapse" ) as HTMLElement;
        expect( newCollapsible ).toHaveClass( "show" );
    } );

    it( "will add the class show to the div when the focus the Space key and press it", async () => {
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    items: [
                        {
                            url: "/two",
                            label: "TWO"
                        }
                    ]
                }
            ]
        };
        const { container, getByTestId } = render( <DXVerticalNavigation {...props} /> );
        let trigger = getByTestId( "vertical-nav-button-icon" ) as HTMLElement;
        fireEvent.keyDown( trigger, {
            key: "Space",
            code: "Space",
            keyCode: 32,
            charCode: 32
        } );
        let newCollapsible = container.querySelector( ".dxVerticalNav .nav-item .collapse" ) as HTMLElement;
        expect( newCollapsible ).toHaveClass( "show" );
    } );

    it( "will not add the class show to the div when the focus the Escape key and press it", async () => {
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    items: [
                        {
                            url: "/two",
                            label: "TWO"
                        }
                    ]
                }
            ]
        };
        const { container, getByTestId } = render( <DXVerticalNavigation {...props} /> );
        let trigger = getByTestId( "vertical-nav-button-icon" ) as HTMLElement;
        fireEvent.keyDown( trigger, {
            key: "Escape",
            code: "Escape",
            keyCode: 23,
            charCode: 23
        } );
        let newCollapsible = container.querySelector( ".dxVerticalNav .nav-item .collapse" ) as HTMLElement;
        expect( newCollapsible ).not.toHaveClass( "show" );
    } );

    it( "will add the remove show class to the div when the user clicks on it twice", async () => {
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    items: [
                        {
                            url: "/two",
                            label: "TWO"
                        }
                    ]
                }
            ]
        };
        const { container, getByTestId } = render( <DXVerticalNavigation {...props} /> );
        let trigger = getByTestId( "vertical-nav-button-icon" ) as HTMLElement;
        await userEvent.click( trigger );
        await userEvent.click( trigger );
        let newCollapsible = container.querySelector( ".dxVerticalNav .nav-item .collapse" ) as HTMLElement;
        expect( newCollapsible ).not.toHaveClass( "show" );
    } );

    it( "will show the child links when the user clicks on icon", async () => {
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    items: [
                        {
                            url: "/two",
                            label: "TWO"
                        }
                    ]
                }
            ]
        };
        const { getByTestId } = render( <DXVerticalNavigation {...props} /> );
        let trigger = getByTestId( "vertical-nav-button-icon" ) as HTMLElement;
        await userEvent.click( trigger );
        expect( screen.getByText( "TWO" ) ).toBeInTheDocument();
    } );

    it( "will add the show class to the div when the prop opened is passed", () => {
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    opened: true,
                    items: [
                        {
                            url: "/two",
                            label: "TWO"
                        }
                    ]
                }
            ]
        };
        const { container } = render( <DXVerticalNavigation {...props} /> );
        let divEl = container.querySelector( ".dxVerticalNav .nav-item .collapse" );
        expect( divEl ).toHaveClass( "show" );
    } );

    it( "will call the function window.open then the user clicks on the button", async () => {
        const spyWindowOpen = jest.spyOn( window, 'open' );
        spyWindowOpen.mockImplementation( jest.fn() );
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    opened: true,
                    items: [
                        {
                            url: "/two",
                            label: "TWO"
                        }
                    ]
                }
            ]
        };
        const { getByTestId } = render( <DXVerticalNavigation {...props} /> );
        let trigger = getByTestId( "vertical-nav-button" ) as HTMLElement;
        await userEvent.click( trigger );
        expect( spyWindowOpen ).toHaveBeenCalledTimes( 1 );
        spyWindowOpen.mockRestore();
    } );

    it( "will call the function window.open then the user focus on the Enter key and press it", () => {
        const spyWindowOpen = jest.spyOn( window, 'open' );
        spyWindowOpen.mockImplementation( jest.fn() );
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    opened: true,
                    items: [
                        {
                            url: "/two",
                            label: "TWO"
                        }
                    ]
                }
            ]
        };
        const { container, getByTestId } = render( <DXVerticalNavigation {...props} /> );
        let trigger = getByTestId( "vertical-nav-button" ) as HTMLElement;
        fireEvent.keyDown( trigger, {
            key: "Enter",
            code: "Enter",
            keyCode: 13,
            charCode: 13
        } );
        expect( spyWindowOpen ).toHaveBeenCalledTimes( 1 );
        spyWindowOpen.mockRestore();
    } );

    it( "will call the function window.open then the user focus on the Space key and press it", () => {
        const spyWindowOpen = jest.spyOn( window, 'open' );
        spyWindowOpen.mockImplementation( jest.fn() );
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    opened: true,
                    items: [
                        {
                            url: "/two",
                            label: "TWO"
                        }
                    ]
                }
            ]
        };
        const { getByTestId } = render( <DXVerticalNavigation {...props} /> );
        let trigger = getByTestId( "vertical-nav-button" ) as HTMLElement;
        fireEvent.keyDown( trigger, {
            key: "Space",
            code: "Space",
            keyCode: 32,
            charCode: 32
        } );
        expect( spyWindowOpen ).toHaveBeenCalledTimes( 1 );
        spyWindowOpen.mockRestore();
    } );

    it( "will not call the function window.open then the user focus on the Escape key and press it", () => {
        const spyWindowOpen = jest.spyOn( window, 'open' );
        spyWindowOpen.mockImplementation( jest.fn() );
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    opened: true,
                    items: [
                        {
                            url: "/two",
                            label: "TWO"
                        }
                    ]
                }
            ]
        };
        const { getByTestId } = render( <DXVerticalNavigation {...props} /> );
        let trigger = getByTestId( "vertical-nav-button" ) as HTMLElement;
        fireEvent.keyDown( trigger, {
            key: "Escape",
            code: "Escape",
            keyCode: 23,
            charCode: 23
        } );
        expect( spyWindowOpen ).toHaveBeenCalledTimes( 0 );
        spyWindowOpen.mockRestore();
    } );

    it( "will assign the default open icon when the element is collapsed", () => {
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    items: [
                        {
                            url: "/two",
                            label: "TWO"
                        }
                    ]
                }
            ]
        };
        const { getByTestId } = render( <DXVerticalNavigation {...props} /> );
        let trigger = getByTestId( "vertical-nav-button-icon" ).childNodes[0] as HTMLElement;
        expect( trigger ).toHaveClass( "ci-Caret_Down_MD" );
    } );

    it( "will assign the passed open icon when the element is collapsed", () => {
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    items: [
                        {
                            url: "/two",
                            label: "TWO"
                        }
                    ]
                }
            ],
            icons: {
                open: "ci-Calendar"
            }
        };
        const { getByTestId } = render( <DXVerticalNavigation {...props} /> );
        let trigger = getByTestId( "vertical-nav-button-icon" ).childNodes[0] as HTMLElement;
        expect( trigger ).toHaveClass( props.icons.open );
    } );

    it( "will assign the default close icon when the element is opened", async () => {
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    opened: true,
                    items: [
                        {
                            url: "/two",
                            label: "TWO"
                        }
                    ]
                }
            ]
        };
        const { getByTestId } = render( <DXVerticalNavigation {...props} /> );
        let trigger = getByTestId( "vertical-nav-button-icon" ) as HTMLElement;
        await userEvent.click( trigger );
        let updatedIcon = getByTestId( "vertical-nav-button-icon" ).childNodes[0];
        setTimeout( () => {
            expect( updatedIcon ).toHaveClass( "ci-Caret_Up_MD" );
        }, 1500 );
    } );

    it( "will assign the passed close icon when the element is opened", async () => {
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    opened: true,
                    items: [
                        {
                            url: "/two",
                            label: "TWO"
                        }
                    ]
                }
            ],
            icons: {
                close: "ci-Calendar"
            }
        };
        const { getByTestId } = render( <DXVerticalNavigation {...props} /> );
        let trigger = getByTestId( "vertical-nav-button-icon" ) as HTMLElement;
        await userEvent.click( trigger );
        let updatedIcon = getByTestId( "vertical-nav-button-icon" ).childNodes[0];
        setTimeout( () => {
            expect( updatedIcon ).toHaveClass( props.icons.close );
        }, 1500 );
    } );

    it( "will not assign the class sublevel to the div when the user clicks on the button", async () => {
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    opened: true,
                    items: [
                        {
                            url: "/two",
                            label: "TWO"
                        }
                    ]
                }
            ]
        };
        const { getByTestId } = render( <DXVerticalNavigation {...props} /> );
        let trigger = getByTestId( "vertical-nav-button-icon" ) as HTMLElement;
        await userEvent.click( trigger );
        let div = getByTestId( "vertical-nav-button" ).nextElementSibling;
        expect( div ).not.toHaveClass( "sublevel" );
    } );
} );

describe( "Multi level behavior", () => {
    it( "will add the show class to the div on the submenu when the user clicks on it", async () => {
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    items: [
                        {
                            url: "/two",
                            label: "TWO",
                            items: [{
                                url: "/two-one",
                                label: "Twenty One"
                            }]
                        }
                    ]
                }
            ]
        };
        const { getAllByTestId } = render( <DXVerticalNavigation {...props} /> );
        let firstTrigger = getAllByTestId( "vertical-nav-button-icon" )[0] as HTMLElement;
        await userEvent.click( firstTrigger );
        let secondTrigger = getAllByTestId( "vertical-nav-button-icon" )[1] as HTMLElement;
        await userEvent.click( secondTrigger );
        let div = getAllByTestId( "vertical-nav-button-icon" )[1].parentNode?.nextSibling as HTMLElement;
        expect( div ).toHaveClass( "show" );
    } );

    it( "will add remove show class to the div on the submenu when the user clicks on it twice", async () => {
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    items: [
                        {
                            url: "/two",
                            label: "TWO",
                            items: [{
                                url: "/two-one",
                                label: "Twenty One"
                            }]
                        }
                    ]
                }
            ]
        };
        const { getAllByTestId } = render( <DXVerticalNavigation {...props} /> );
        let firstTrigger = getAllByTestId( "vertical-nav-button-icon" )[0] as HTMLElement;
        await userEvent.click( firstTrigger );
        let secondTrigger = getAllByTestId( "vertical-nav-button-icon" )[1] as HTMLElement;
        await userEvent.click( secondTrigger );
        await userEvent.click( secondTrigger );
        let div = getAllByTestId( "vertical-nav-button-icon" )[1].parentNode?.nextSibling as HTMLElement;
        expect( div ).not.toHaveClass( "show" );
    } );

    it( "will add the sublevel class to the div on the submenu when the user clicks on it", async () => {
        let props = {
            items: [
                {
                    url: "/one",
                    label: "ONE",
                    items: [
                        {
                            url: "/two",
                            label: "TWO",
                            items: [{
                                url: "/two-one",
                                label: "Twenty One"
                            }]
                        }
                    ]
                }
            ]
        };
        const { getAllByTestId } = render( <DXVerticalNavigation {...props} /> );
        let firstTrigger = getAllByTestId( "vertical-nav-button-icon" )[0] as HTMLElement;
        await userEvent.click( firstTrigger );
        let secondTrigger = getAllByTestId( "vertical-nav-button-icon" )[1] as HTMLElement;
        await userEvent.click( secondTrigger );
        let div = getAllByTestId( "vertical-nav-button-icon" )[1].parentNode?.nextSibling as HTMLElement;
        expect( div ).toHaveClass( "sublevel" );
    } );
} );
