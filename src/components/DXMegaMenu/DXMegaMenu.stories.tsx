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
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXMegaMenu, { MegaMenuProps } from "./DXMegaMenu";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Navigation/Mega Menu",
    component: DXMegaMenu,
    excludeStories: /.*Args$/,
} as Meta<typeof DXMegaMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<MegaMenuProps> = ( args ) => <>
    <DXMegaMenu {...args} />
    <div id="container"></div>
</>;

export const MegaMenu = Template.bind( {} );
export const MegaMenuChangedIcons = Template.bind( {} );
export const MegaMenuLongTitles = Template.bind( {} );
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const MegaMenuArgs: MegaMenuProps = {
    secondaryLevelContainerId: "container",
    menuImage: "https://pngimg.com/uploads/bokeh/bokeh_PNG27.png",
    globalLinks: [
        {
            url: "www.hcl-software.com",
            label: "HCL Software Page",
            target: "_self"
        },
        {
            url: "www.hcl-software.com",
            label: "Home",
            target: "_self"
        },
        {
            url: "www.hcl-software.com",
            label: "Privacy Policy",
            target: "_self"
        },
        {
            url: "www.hcl-software.com",
            label: "Information",
            target: "_self"
        },

    ],
    navigationItems: [
        { title: "Home", index: 0 },
        {
            title: "The office",
            index: 1,
            bannerProps: [
                {
                    title: "Title",
                    image: "https://images.unsplash.com/photo-1557568192-387504499261?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
                    body: "Etiam rhoncus rutrum semper. Vestibulum finibus ligula nec hendrerit semper. ",
                    link: {
                        url: "www.hcl-software.com",
                        label: "",
                        target: "_blank"
                    }
                },
                {
                    title: "Title",
                    image: "https://images.unsplash.com/photo-1557568192-387504499261?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
                    body: "Etiam rhoncus rutrum semper. Vestibulum finibus ligula nec hendrerit semper. ",
                }
            ],
            children: [{
                title: "Alerts",
                index: 1,
                url: "/alerts",
                target: "_blank",
                onClick: () => {
                    console.log( "Function called" );
                }
            }, {
                title: "Local News",
                index: 2,
                url: "/NOT",
                children: [{
                    title: "Today",
                    index: 1
                }, {
                    title: "Week",
                    index: 2
                }
                ]
            }, {
                title: "Global News",
                index: 3,
                children: [{
                    title: "English",
                    index: 1,
                    url: "https://www.hcl-software.com",
                    onClick: () => {
                        console.log( "Function called" );
                    }

                }, {
                    title: "Spanish",
                    index: 2,
                    url: "https://www.hcl-software.com",
                    target: "_blank"
                }
                ]
            }, {
                title: "Long Title Item here Long title item here",
                index: 4,
                children: [{
                    title: "Long sub item text here long sub item",
                    index: 1
                }, {
                    title: "Sub item",
                    index: 2
                }
                ]
            }, {
                title: "Item",
                index: 5,
            }, {
                title: "Item",
                index: 6,
            }, {
                title: "Item",
                index: 7,
            }, {
                title: "Item",
                index: 8,
            }, {
                title: "Item",
                index: 9,
            }, {
                title: "Item",
                index: 10,
            }, {
                title: "Item",
                index: 11,
                children: [{
                    title: "Sub item",
                    index: 1
                }]
            }]
        },
        {
            title: "Business",
            url: "https://www.bing.com",
            index: 2,
            children: [{
                title: "Billing",
                index: 1
            }, {
                title: "HR",
                index: 2,
                children: [{
                    title: "Timesheets",
                    index: 1
                }]
            }]
        },
        {
            title: "Company", url: "https://www.bing.com", index: 3, onClick: () => {
                console.log( "Function called" );
            }
        },
        { title: "Visitors", url: "https://google.com", index: 4 }
    ],
};

MegaMenuChangedIcons.args = {
    ...MegaMenuArgs,
    icons: {
        firstLevel: "ci-Caret_Circle_Down",
        secondLevel: "ci-Caret_Circle_Right"
    }
};

MegaMenuLongTitles.args = {
    ...MegaMenuArgs,
    titleCharLimit: 30,
    navigationItems: [
        {
            index: 0,
            title: "This is an extremely long primary navigation item that will be truncated",
            children: [
                {
                    index: 1,
                    title: "This is a very long secondary navigation item title here",
                    children: [
                        {
                            index: 1,
                            title: "This is an exceptionally long tertiary navigation item"
                        },
                        {
                            index: 2,
                            title: "Another long tertiary item that exceeds thirty characters"
                        }
                    ]
                },
                {
                    index: 2,
                    title: "Second parent with a moderately long secondary title"
                }
            ],
            bannerProps: [
                {
                    title: "This is a very long banner title that should be truncated with ellipsis",
                    image: "https://pngimg.com/uploads/bokeh/bokeh_PNG27.png",
                    body: "Banner body content"
                }
            ]
        },
        {
            index: 1,
            title: "Short Item"
        },
        {
            index: 2,
            title: "Another item with a very very long title that exceeds the character limit"
        }
    ]
};

MegaMenu.args = MegaMenuArgs;
