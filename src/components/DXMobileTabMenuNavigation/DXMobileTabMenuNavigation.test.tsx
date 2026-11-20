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
import { itSupportsExtensionProps } from "../../testUtils/extensionContract";
import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXMobileTabMenuNavigation from "./DXMobileTabMenuNavigation";

let fullItems = [
    {
        title: "Help",
        contentId: ".help-content",
        icon: "ci-Circle_Help",
    },
    {
        title: "Tags",
        contentId: ".tag-content",
        icon: "ci-Tag"
    },
    {
        title: "Menu",
        contentId: ".menu-content",
        icon: "ci-Hamburger_LG"
    },
    {
        title: "My Account",
        contentId: ".my-account-content",
        image: {
            url: "https://plus.unsplash.com/premium_photo-1666183669448-e41821d3ba2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            altText: "profile-pic"
        }
    },
    {
        title: "My Events",
        contentId: ".event-content",
        icon: "ci-Calendar"
    },
];

// Test for the dark mode
test( "If the user does not pass the dark prop, the style of the component will have 'var(--light-white)'", () => {
    let props = {
        items: [{
            title: "Help",
            contentId: ".help-content",
            icon: "ci-Circle_Help"
        }]
    };
    const { container } = render( <DXMobileTabMenuNavigation {...props} /> );
    let el = container.querySelector( ".dxMTabMenuNav" );
    expect( el ).toHaveStyle( "background-color: var(--light-white)" );
} );

test( "If the user passes the dark prop, the style of the component will have 'var(--dark-dark-d2)'", () => {
    let props = {
        items: [{
            title: "Help",
            contentId: ".help-content",
            icon: "ci-Circle_Help"
        }],
        dark: true
    };
    const { container } = render( <DXMobileTabMenuNavigation {...props} /> );
    let el = container.querySelector( ".dxMTabMenuNav" );
    expect( el ).toHaveStyle( "background-color: var(--dark-dark-d2)" );
} );

test( "If the user does not pass the dark prop, the navItem will have the class 'dxMTabMenuNav__btnLight'", () => {
    let props = {
        items: [{
            title: "Help",
            contentId: ".help-content",
            icon: "ci-Circle_Help"
        }]
    };
    const { getByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    let item = getByTestId( "mobile-tab-menu-item" ).childNodes[0];
    expect( item ).toHaveClass( "dxMTabMenuNav__btnLight" );
} );

test( "If the user passes the dark prop, the navItem will have the class 'dxMTabMenuNav__btnDark'", () => {
    let props = {
        items: [{
            title: "Help",
            contentId: ".help-content",
            icon: "ci-Circle_Help"
        }],
        dark: true
    };
    const { getByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    let item = getByTestId( "mobile-tab-menu-item" ).childNodes[0];
    expect( item ).toHaveClass( "dxMTabMenuNav__btnDark" );
} );

test( "If the user does not pass the dark prop and click on the first item, the line should have the class 'dxMTabMenuNav__lineLight'", async () => {
    let props = {
        items: [
            {
                title: "Help",
                contentId: ".help-content",
                icon: "ci-Circle_Help"
            },
        ]
    };
    const { getByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getByTestId( "mobile-tab-menu-item" ).childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const line = getByTestId( "mobile-tab-menu-line" );
    expect( line ).toHaveClass( "dxMTabMenuNav__lineLight" );
} );

test( "If the user passes the dark prop and click on the first item, the line should have the class 'dxMTabMenuNav__lineDark'", async () => {
    let props = {
        items: [
            {
                title: "Help",
                contentId: ".help-content",
                icon: "ci-Circle_Help"
            },
        ],
        dark: true
    };
    const { getByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getByTestId( "mobile-tab-menu-item" ).childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const line = getByTestId( "mobile-tab-menu-line" );
    expect( line ).toHaveClass( "dxMTabMenuNav__lineDark" );
} );

test( "If the user passes the dark prop and click on the first item, the overlayWrapper should have the style 'background-color: var(--secondary-secondary-l3)'", async () => {
    let props = {
        items: [
            {
                title: "Help",
                contentId: ".help-content",
                icon: "ci-Circle_Help"
            },
        ],
        dark: true
    };
    const { getByTestId, container } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getByTestId( "mobile-tab-menu-item" ).childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const wrapper = container.querySelector( ".dxMTabMenuNav__overlayWrapper" );
    expect( wrapper ).toHaveStyle( 'background-color: var(--secondary-secondary-l3)' );
} );

test( "If the user does not pass the dark prop and click on the first item, the overlayWrapper should have the style 'background-color: var(--light-light)'", async () => {
    let props = {
        items: [
            {
                title: "Help",
                contentId: ".help-content",
                icon: "ci-Circle_Help"
            },
        ]
    };
    const { getByTestId, container } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getByTestId( "mobile-tab-menu-item" ).childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const wrapper = container.querySelector( ".dxMTabMenuNav__overlayWrapper" );
    expect( wrapper ).toHaveStyle( 'background-color: var(--light-light)' );
} );

test( "If the user passes the dark prop and click on the first item, the overlayHeader should have the style 'background-color: var(--secondary-secondary)'", async () => {
    let props = {
        items: [
            {
                title: "Help",
                contentId: ".help-content",
                icon: "ci-Circle_Help"
            },
        ],
        dark: true
    };
    const { getByTestId, container } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getByTestId( "mobile-tab-menu-item" ).childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const header = container.querySelector( ".dxMTabMenuNav__overlayHeader" );
    expect( header ).toHaveStyle( 'background-color: var(--secondary-secondary)' );
} );

test( "If the user does not pass the dark prop and click on the first item, the overlayHeader should have the style 'background-color: var(--primary-primary)'", async () => {
    let props = {
        items: [
            {
                title: "Help",
                contentId: ".help-content",
                icon: "ci-Circle_Help"
            },
        ]
    };
    const { getByTestId, container } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getByTestId( "mobile-tab-menu-item" ).childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const header = container.querySelector( ".dxMTabMenuNav__overlayHeader" );
    expect( header ).toHaveStyle( 'background-color: var(--primary-primary)' );
} );

// Test for rendering the items
test( "If the user does not pass any item, the 'dxMTabMenuNav__buttonsContainer' should no have any childs", () => {
    let props = {
        items: []
    };
    const { container } = render( <DXMobileTabMenuNavigation {...props} /> );
    let parent = container.querySelector( ".dxMTabMenuNav__buttonsContainer" );
    expect( parent?.childNodes ).toHaveLength( 0 );
} );

test( "If the user passes an item, the 'dxMTabMenuNav__buttonsContainer' should have just one child", () => {
    let props = {
        items: [
            {
                title: "Help",
                contentId: ".help-content",
                icon: "ci-Circle_Help"
            }
        ]
    };
    const { container } = render( <DXMobileTabMenuNavigation {...props} /> );
    let parent = container.querySelector( ".dxMTabMenuNav__buttonsContainer" );
    expect( parent?.childNodes ).toHaveLength( 1 );
} );

test( "If the user passes some items, the 'dxMTabMenuNav__buttonsContainer' should have the same amount of childs", () => {
    let props = {
        items: fullItems
    };
    const { container } = render( <DXMobileTabMenuNavigation {...props} /> );
    let parent = container.querySelector( ".dxMTabMenuNav__buttonsContainer" );
    expect( parent?.childNodes ).toHaveLength( props.items.length );
} );

test( "If the user passes more than 5 items, in the render there should be just 5", () => {
    let props = {
        items: [
            {
                title: "Help",
                contentId: ".help-content",
                icon: "ci-Circle_Help"
            },
            {
                title: "Tags",
                contentId: ".tag-content",
                icon: "ci-Tag"
            },
            {
                title: "Menu",
                contentId: ".menu-content",
                icon: "ci-Hamburger_LG"
            },
            {
                title: "My Account",
                contentId: ".my-account-content",
                icon: "ci-Hamburger_LG"
            },
            {
                title: "Topics",
                contentId: ".my-account-content",
                icon: "ci-Hamburger_LG"
            },
            {
                title: "Topics",
                contentId: ".my-account-content",
                icon: "ci-Hamburger_LG"
            },
        ]
    };
    const { container } = render( <DXMobileTabMenuNavigation {...props} /> );
    const renderedItems = container.querySelectorAll( ".dxMTabMenuNav__navItem" );
    expect( renderedItems ).toHaveLength( 5 );
} );

test( "If the user does not pass the image for the item, the class that should be assigned will be 'dxMTabMenuNav__navItem'", () => {
    let props = {
        items: [
            {
                title: "Help",
                contentId: ".help-content",
                icon: "ci-Help"
            },
        ]
    };
    const { getByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getByTestId( "mobile-tab-menu-item" );
    expect( item ).toHaveClass( "dxMTabMenuNav__navItem" );
} );

test( "If the user does pass the image for the item, the class that should be assigned will be 'dxMTabMenuNav__navItemImg'", () => {
    let props = {
        items: [
            {
                title: "My Account",
                contentId: ".my-account-content",
                image: {
                    url: "https://plus.unsplash.com/premium_photo-1666183669448-e41821d3ba2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
                    altText: "profile-pic"
                }
            },
        ]
    };
    const { getByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getByTestId( "mobile-tab-menu-item" );
    expect( item ).toHaveClass( "dxMTabMenuNav__navItemImg" );
} );

test( "If the user does pass the image and an icon for the item, the class that should be assigned will be 'dxMTabMenuNav__navItemImg'", () => {
    let props = {
        items: [
            {
                title: "My Account",
                contentId: ".my-account-content",
                icon: "ci-Help",
                image: {
                    url: "https://plus.unsplash.com/premium_photo-1666183669448-e41821d3ba2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
                    altText: "profile-pic"
                }
            },
        ]
    };
    const { getByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getByTestId( "mobile-tab-menu-item" );
    expect( item ).toHaveClass( "dxMTabMenuNav__navItemImg" );
} );

// Test the icon classes
test( "Check if the component assign the proper icon class", () => {
    let props = {
        items: [
            {
                title: "Help",
                contentId: ".help-content",
                icon: "ci-Help"
            },
        ]
    };
    const { getByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getByTestId( "mobile-tab-menu-item" );
    let icon = item.childNodes[0].childNodes[0];
    expect( icon ).toHaveClass( props.items[0].icon );
} );

// Test the line position for one item
test( "If the user passes just one item, the line should have style 'display: none'", () => {
    let props = {
        items: fullItems.slice( 0, 1 )
    };
    const { container } = render( <DXMobileTabMenuNavigation {...props} /> );
    const line = container.querySelector( '[data-testid="mobile-tab-menu-line"]' );
    expect( line ).toHaveStyle( "display: none" );
} );

test( "If the user clicks on the only item, the line should have the style 'left: 43%'", async () => {
    let props = {
        items: fullItems.slice( 0, 1 )
    };
    const { getByTestId, getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const line = getByTestId( "mobile-tab-menu-line" );
    expect( line ).toHaveStyle( "left: 43%" );
} );

// Test the line position below the 2 items
test( "If the user passes the 2 items, the line should have style 'display: none'", () => {
    let props = {
        items: fullItems.slice( 0, 2 )
    };
    const { container } = render( <DXMobileTabMenuNavigation {...props} /> );
    const line = container.querySelector( '[data-testid="mobile-tab-menu-line"]' );
    expect( line ).toHaveStyle( "display: none" );
} );

test( "If the user clicks on the first item, the line should have the style 'left: 18%'", async () => {
    let props = {
        items: fullItems.slice( 0, 2 )
    };
    const { getByTestId, getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const line = getByTestId( "mobile-tab-menu-line" );
    expect( line ).toHaveStyle( "left: 18%" );
} );

test( "If the user clicks on the last item, the line should have the style 'left: 68%'", async () => {
    let props = {
        items: fullItems.slice( 0, 2 )
    };
    const { getByTestId, getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[1].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const line = getByTestId( "mobile-tab-menu-line" );
    expect( line ).toHaveStyle( "left: 68%" );
} );

// Test the line position below the 3 items
test( "If the user passes the 3 items, the line should have style 'display: none'", () => {
    let props = {
        items: fullItems.slice( 0, 3 )
    };
    const { container } = render( <DXMobileTabMenuNavigation {...props} /> );
    const line = container.querySelector( '[data-testid="mobile-tab-menu-line"]' );
    expect( line ).toHaveStyle( "display: none" );
} );

test( "If the user clicks on the first item, the line should have the style 'left: 9%'", async () => {
    let props = {
        items: fullItems.slice( 0, 3 )
    };
    const { getByTestId, getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const line = getByTestId( "mobile-tab-menu-line" );
    expect( line ).toHaveStyle( "left: 9%" );
} );

test( "If the user clicks on the second item, the line should have the style 'left: 43%'", async () => {
    let props = {
        items: fullItems.slice( 0, 3 )
    };
    const { getByTestId, getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[1].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const line = getByTestId( "mobile-tab-menu-line" );
    expect( line ).toHaveStyle( "left: 43%" );
} );

test( "If the user clicks on the last item, the line should have the style 'left: 76%'", async () => {
    let props = {
        items: fullItems.slice( 0, 3 )
    };
    const { getByTestId, getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[2].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const line = getByTestId( "mobile-tab-menu-line" );
    expect( line ).toHaveStyle( "left: 76%" );
} );
// Test the line position below the 4 items
test( "If the user passes the 4 items, the line should have style 'display: none'", () => {
    let props = {
        items: fullItems.slice( 0, 4 )
    };
    const { container } = render( <DXMobileTabMenuNavigation {...props} /> );
    const line = container.querySelector( '[data-testid="mobile-tab-menu-line"]' );
    expect( line ).toHaveStyle( "display: none" );
} );

test( "If the user clicks on the first item, the line should have the style 'left: 5%'", async () => {
    let props = {
        items: fullItems.slice( 0, 4 )
    };
    const { getByTestId, getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const line = getByTestId( "mobile-tab-menu-line" );
    expect( line ).toHaveStyle( "left: 5%" );
} );

test( "If the user clicks on the second item, the line should have the style 'left: 31%'", async () => {
    let props = {
        items: fullItems.slice( 0, 4 )
    };
    const { getByTestId, getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[1].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const line = getByTestId( "mobile-tab-menu-line" );
    expect( line ).toHaveStyle( "left: 31%" );
} );

test( "If the user clicks on the third item, the line should have the style 'left: 56%'", async () => {
    let props = {
        items: fullItems.slice( 0, 4 )
    };
    const { getByTestId, getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[2].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const line = getByTestId( "mobile-tab-menu-line" );
    expect( line ).toHaveStyle( "left: 56%" );
} );

test( "If the user clicks on the last item, the line should have the style 'left: 81%'", async () => {
    let props = {
        items: fullItems.slice( 0, 4 )
    };
    const { getByTestId, getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[3].childNodes[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const line = getByTestId( "mobile-tab-menu-line" );
    expect( line ).toHaveStyle( "left: 81%" );
} );

// Test the line position below the 5 items
test( "If the user passes the 5 items, the line should have style 'display: none'", () => {
    let props = {
        items: fullItems
    };
    const { container } = render( <DXMobileTabMenuNavigation {...props} /> );
    const line = container.querySelector( '[data-testid="mobile-tab-menu-line"]' );
    expect( line ).toHaveStyle( "display: none" );
} );

test( "If the user clicks on the first item, the line should have the style 'left: 3%'", async () => {
    let props = {
        items: fullItems
    };
    const { getByTestId, getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const line = getByTestId( "mobile-tab-menu-line" );
    expect( line ).toHaveStyle( "left: 3%" );
} );

test( "If the user clicks on the second item, the line should have the style 'left: 24%'", async () => {
    let props = {
        items: fullItems
    };
    const { getByTestId, getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[1].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const line = getByTestId( "mobile-tab-menu-line" );
    expect( line ).toHaveStyle( "left: 24%" );
} );

test( "If the user clicks on the third item, the line should have the style 'left: 43%'", async () => {
    let props = {
        items: fullItems
    };
    const { getByTestId, getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[2].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const line = getByTestId( "mobile-tab-menu-line" );
    expect( line ).toHaveStyle( "left: 43%" );
} );

test( "If the user clicks on the fourth item, the line should have the style 'left: 63%'", async () => {
    let props = {
        items: fullItems
    };
    const { getByTestId, getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[3].childNodes[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const line = getByTestId( "mobile-tab-menu-line" );
    expect( line ).toHaveStyle( "left: 63%" );
} );

test( "If the user clicks on the last item, the line should have the style 'left: 83%'", async () => {
    let props = {
        items: fullItems
    };
    const { getByTestId, getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[4].childNodes[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const line = getByTestId( "mobile-tab-menu-line" );
    expect( line ).toHaveStyle( "left: 83%" );
} );

// Test the overlay
test( "On the first render, the overlay should have the class 'dxMTabMenuNav__overlayWrapper--hide'", () => {
    let props = {
        items: fullItems
    };
    const { getByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const overlay = getByTestId( "mobile-tab-menu-overlay" );
    expect( overlay ).toHaveClass( "dxMTabMenuNav__overlayWrapper--hide" );
} );

test( "If the user clicks on the first item, the overlay should have the class 'dxMTabMenuNav__overlayWrapper'", async () => {
    let props = {
        items: fullItems
    };
    const { getByTestId, getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const overlay = getByTestId( "mobile-tab-menu-overlay" );
    expect( overlay ).toHaveClass( "dxMTabMenuNav__overlayWrapper" );
} );

test( "If the user clicks on the first item, and then on the close button on the overlay, it should have the class 'dxMTabMenuNav__overlayWrapper--hide'", async () => {
    let props = {
        items: fullItems
    };
    const { getByTestId, getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const closeBtn = getAllByTestId( "mobile-tab-menu-overlay-close" )[0];
    await userEvent.click( closeBtn );
    const overlay = getByTestId( "mobile-tab-menu-overlay" );
    expect( overlay ).toHaveClass( "dxMTabMenuNav__overlayWrapper--hide" );
} );

test( "If the user clicks on the first item, the overlay header should have the item's title", async () => {
    let props = {
        items: fullItems
    };
    const { getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const header = getAllByTestId( "mobile-tab-menu-overlay-header" )[0];
    expect( header.textContent ).toEqual( props.items[0].title );
} );

test( "On the first render all the overlay-items should have the class 'd-none'", async () => {
    let props = {
        items: fullItems
    };
    const { getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const items = getAllByTestId( "mobile-tab-menu-overlay-item" );
    let flag = 0;
    items.forEach( item => {
        if ( item.classList.contains( "d-none" ) ) {
            flag++;
        }
    } );
    expect( flag ).toBe( props.items.length );
} );

test( "If the user clicks on the first item, the overlay corresponding that item will have the class 'd-block'", async () => {
    let props = {
        items: fullItems
    };
    const { getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const header = getAllByTestId( "mobile-tab-menu-overlay-item" )[0];
    expect( header ).toHaveClass( "d-block" );
} );

test( "If the user clicks on the first item and then on the second one, the overlay header should have the item's title", async () => {
    let props = {
        items: fullItems
    };
    const { getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const secondItem = getAllByTestId( "mobile-tab-menu-item" )[1].childNodes[0] as HTMLButtonElement;
    await userEvent.click( secondItem );
    const header = getAllByTestId( "mobile-tab-menu-overlay-header" )[1];
    expect( header.textContent ).toEqual( props.items[1].title );
} );

test( "If the user clicks on the first item and then on the third one, the overlay header should have the item's title", async () => {
    let props = {
        items: fullItems
    };
    const { getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const thirdItem = getAllByTestId( "mobile-tab-menu-item" )[2].childNodes[0] as HTMLButtonElement;
    await userEvent.click( thirdItem );
    const header = getAllByTestId( "mobile-tab-menu-overlay-header" )[2];
    expect( header.textContent ).toEqual( props.items[2].title );
} );

test( "If the user clicks on the first item and then on the last one, the overlay header should have the item's title", async () => {
    let props = {
        items: fullItems
    };
    const { getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const lastItem = getAllByTestId( "mobile-tab-menu-item" )[3].childNodes[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( lastItem );
    const header = getAllByTestId( "mobile-tab-menu-overlay-header" )[3];
    expect( header.textContent ).toEqual( props.items[3].title );
} );

test( "If the item's content id is null, the overlayBody element will have no childs", async () => {
    let props = {
        items: fullItems
    };
    const { container, getAllByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const overlayBody = container.querySelectorAll( ".dxMTabMenuNav__overlayBody" )[0];
    expect( overlayBody?.childNodes ).toHaveLength( 0 );
} );

test( "If the item's content id is rendered, the overlayBody will have that content as a child", async () => {
    let props = {
        items: fullItems
    };
    const { container, getAllByTestId } = render( <>
        <div style={{ backgroundColor: "lightblue", padding: "1rem" }}>
            <div className='help-content'>
                <h5>This is the content that is going to move to help inside the overlay</h5>
            </div>
            <div className='tag-content'>
                <button>
                    This is the content that is going to move to tags inside the overlay
                </button>
            </div>
            <div className='menu-content'>
                <p>This is the content that is going to move to menu inside the overlay</p>
                <img src="https://images.unsplash.com/photo-1683802175712-7348bc779858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1413&q=80" width="150px" height="150px" alt='menu-img' />
            </div>
            <div className='my-account-content'>
                <ul>
                    <li>This is</li>
                    <li>the content that is</li>
                    <li>going to move inside</li>
                    <li>the overlay</li>
                </ul>
            </div>
        </div>
        <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}>
            <DXMobileTabMenuNavigation {...props} />
        </div>
    </> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const overlayBody = container.querySelectorAll( ".dxMTabMenuNav__overlayBody" )[0];
    const content = overlayBody?.childNodes[0];
    expect( content ).toHaveClass( props.items[0].contentId.split( '.' )[1] );
} );

// Tests for the contentFunction
test( "If the user does passes a contentFunction and clicks on the first item, it will be called", async () => {
    let mock = jest.fn();
    let props = {
        items: [
            {
                title: "Help",
                contentId: ".help-content",
                icon: "ci-Help",
                contentFunction: mock
            }
        ]
    };
    const { getAllByTestId } = render( <>
        <div style={{ backgroundColor: "lightblue", padding: "1rem" }}>
            <div className='help-content'>
                <h5>This is the content that is going to move to help inside the overlay</h5>
            </div>
        </div>
        <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}>
            <DXMobileTabMenuNavigation {...props} />
        </div>
    </> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user does passes a contentFunction and clicks on the first item then closes it and clicks on the first item again, the function will be called just 1 time", async () => {
    let mock = jest.fn();
    let props = {
        items: [
            {
                title: "Help",
                contentId: ".help-content",
                icon: "ci-Help",
                contentFunction: mock
            }
        ]
    };
    const { getAllByTestId } = render( <>
        <div style={{ backgroundColor: "lightblue", padding: "1rem" }}>
            <div className='help-content'>
                <h5>This is the content that is going to move to help inside the overlay</h5>
            </div>
        </div>
        <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}>
            <DXMobileTabMenuNavigation {...props} />
        </div>
    </> );
    const item = getAllByTestId( "mobile-tab-menu-item" )[0].childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    const closeBtn = getAllByTestId( "mobile-tab-menu-overlay-close" )[0];
    await userEvent.click( closeBtn );
    await userEvent.click( item );
    expect( mock ).toHaveBeenCalledTimes( 1 );
} );

test( "If Close icon changes when icon class value is set", async () => {
    let props = {
        items: [
            {
                title: "Help",
                contentId: ".help-content",
                icon: "ci-Circle_Help",
            },
        ],
        icons: {
            close: "ci-Close_LG"
        }
    };
    const { getByTestId } = render( <DXMobileTabMenuNavigation {...props} /> );
    const item = getByTestId( "mobile-tab-menu-item" ).childNodes[0] as HTMLButtonElement;
    await userEvent.click( item );
    expect( getByTestId( "mobile-tab-menu-overlay-close" ).querySelector( "i" ) ).toHaveClass( props.icons.close );
} );

itSupportsExtensionProps( ( extra ) => <DXMobileTabMenuNavigation items={[{ title: "Help", contentId: ".help-content", icon: "ci-Circle_Help" }]} {...extra} /> );
