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
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXMobileTabMenuNavigation from "./DXMobileTabMenuNavigation";

export default {
    title: "Components/Mobile Exclusive/Mobile Tab Menu Navigation",
    component: DXMobileTabMenuNavigation,
    excludeStories: /.*Args$/,
} as Meta<typeof DXMobileTabMenuNavigation>;

const Template: StoryFn<typeof DXMobileTabMenuNavigation> = ( args ) => (
    <>
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
            <DXMobileTabMenuNavigation {...args} />
        </div>
    </>
);

export const Default = Template.bind( {} );
export const ChangedIcon = Template.bind( {} );
export const DarkMode = Template.bind( {} );
export const OneNavItem = Template.bind( {} );
export const TwoNavItems = Template.bind( {} );
export const ThreeNavItems = Template.bind( {} );
export const FourNavItems = Template.bind( {} );

function asyncRenderTest() {
    let content = document.querySelector( ".menu-content" );
    setTimeout( async () => {
        try {
            let data = await fetch( 'https://jsonplaceholder.typicode.com/todos/1' );
            let json = await data.json();
            let msg = document.createElement( "h6" );
            msg.append( `${json.userId} - ${json.title}` );
            content?.appendChild( msg );
        } catch ( error ) {
            console.log( "Error: ", error );
        }
    }, 3000 );
}
async function asyncAPICall() {
    let content = document.querySelector( ".menu-content" );
    try {
        let data = await fetch( 'https://jsonplaceholder.typicode.com/todos/1' );
        let json = await data.json();
        let msg = document.createElement( "h6" );
        msg.append( `${json.userId} - ${json.title}` );
        content?.appendChild( msg );
    } catch ( error ) {
        console.log( "Error: ", error );
    }
}
const items = [
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
        icon: "ci-Hamburger_LG",
        contentId: ".menu-content",
        contentFunction: asyncRenderTest
    },
    {
        title: "My Account",
        contentId: ".my-account-content",
        image: {
            url: "https://plus.unsplash.com/premium_photo-1666183669448-e41821d3ba2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            altText: "profile-icon"
        }
    },
    {
        title: "My Events",
        contentId: ".event-content",
        icon: "ci-Calendar"
    },
];

Default.args = {
    items
};

ChangedIcon.args = {
    items: items,
    icons: {
        close: "ci-Close_LG"
    }
};

DarkMode.args = {
    items,
    dark: true
};
OneNavItem.args = {
    items: [
        {
            title: "Menu",
            contentId: ".menu-content",
            icon: "ci-Hamburguer_LG",
            contentFunction: asyncAPICall
        },
    ]
};
TwoNavItems.args = {
    items: [
        {
            title: "Menu",
            contentId: ".menu-content",
            icon: "ci-Hamburguer_LG",
            contentFunction: asyncRenderTest
        },
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
ThreeNavItems.args = {
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
            icon: "ci-Hamburger_LG",
            contentFunction: asyncRenderTest
        },
    ]
};
FourNavItems.args = {
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
            icon: "ci-Hamburger_LG",
            contentFunction: asyncRenderTest
        },
        {
            title: "My Account",
            contentId: ".my-account-content",
            image: {
                url: "https://plus.unsplash.com/premium_photo-1666183669448-e41821d3ba2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
                altText: "profile-pic"
            }
        }
    ]
};
