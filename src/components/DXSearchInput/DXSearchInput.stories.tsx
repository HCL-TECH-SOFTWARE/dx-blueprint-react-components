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
import DXSearchInput, { SearchInputProps } from "./DXSearchInput";

export default {
    title: "Components/General/Search Input",
    component: DXSearchInput,
    excludeStories: /.*Args$/,
} as Meta<typeof DXSearchInput>;

const Template: StoryFn<typeof DXSearchInput> = ( args ) => <DXSearchInput {...args} />;
const dataSuggested = [
    {
        type: "Services",
        cards: [{
            title: {
                url: "https://hcl-software.com",
                label: "Card Title 1",
            },
            description: "description up to two LINES goes here"
        }, {
            title: {
                url: "https://hcl-software.com",
                label: "Card Title 2 in up to two lines goes here",
            },
            description: "description up to two LINES, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }, {
            title: {
                url: "https://hcl-software.com",
                label: "Card Title 3",
            },
            description: ""
        }, {
            title: {
                url: "https://hcl-software.com",
                label: "Card EXTRA Resources in up to two lines goes here",
            },
            description: "description up to two LINES goes here"
        }
        ]
    },
    {
        type: "Resources",
        cards: [{
            title: {
                url: "https://hcl-software.com",
                label: "Card Title 1 Resources in up to two lines goes here",
            },
            description: "description up to two LINES goes here"
        }, {
            title: {
                url: "https://hcl-software.com",
                label: "Card Title 2 Resources in up to two lines goes here",
            },
            description: "description up to two LINES goes here"
        }, {
            title: {
                url: "https://hcl-software.com",
                label: "Card Title 3 Resources in up to two lines goes here",
            },
            description: "description up to two LINES goes here"
        }, {
            title: {
                url: "https://hcl-software.com",
                label: "Card EXTRA Resources in up to two lines goes here",
            },
            description: "description up to two LINES goes here"
        }]
    }
];


export const searchInput = Template.bind( {} );
export const searchInputArgs: SearchInputProps = {
    searchOptions: [
        { label: "Option 1", url: "https://hcl-software.com/" },
        { label: "Option 2", url: "https://hcl-software.com/" },
        { label: "Option 3", url: "https://hcl-software.com/" },
        { label: "Option 4", url: "https://hcl-software.com/" },
        { label: "Option 5", url: "https://hcl-software.com/" },
        { label: "Option 6", url: "https://hcl-software.com/" },
        { label: "Option 7", url: "https://hcl-software.com/" },
        { label: "Option 8", url: "https://hcl-software.com/" },
    ],
    placeholder: "",
    searchFn: function ( filter: string ) {
        console.log( "This is what you searched: ", filter );
    },
    collapsed: true,
    suggestedInfo: dataSuggested,
    buttonLabel: "Search site",
    searchCards: [{
        title: {
            url: "https://hcl-software.com",
            label: "Card Title 1 in up to two lines goes here ",
        },
        description: "description up to two LINES goes here"
    }, {
        title: {
            url: "https://hcl-software.com",
            label: "Card Title 2 in up to two lines goes here",
        },
        description: "description up to two LINES goes here"
    }, {
        title: {
            url: "https://hcl-software.com",
            label: "Card Title 3 in up to two lines goes here",
        },
        description: "description up to two LINES goes here"
    }, {
        title: {
            url: "https://hcl-software.com",
            label: "Card Title 1 Resources in up to two lines goes here",
        },
        description: "description up to two LINES goes here"
    }, {
        title: {
            url: "https://hcl-software.com",
            label: "Card Title 2 Resources in up to two lines goes here",
        },
        description: "description up to two LINES goes here"
    }, {
        title: {
            url: "https://hcl-software.com",
            label: "Card Title 3 Resources in up to two lines goes here",
        },
        description: "description up to two LINES goes here"
    }]
};

export const searchVisibleInput = Template.bind( {} );
export const searchVisibleArgs: SearchInputProps = {
    searchOptions: [
        { label: "Option 1", url: "https://hcl-software.com/" },
        { label: "Option 2", url: "https://hcl-software.com/" },
        { label: "Option 3", url: "https://hcl-software.com/" },
        { label: "Option 4", url: "https://hcl-software.com/" },
        { label: "Option 5", url: "https://hcl-software.com/" },
        { label: "Option 6", url: "https://hcl-software.com/" },
        { label: "Option 7", url: "https://hcl-software.com/" },
        { label: "Option 8", url: "https://hcl-software.com/" },
    ],
    placeholder: "Input search placeholder",
    searchFn: function ( filter: string ) {
        console.log( "This is what you searched: ", filter );
    },
    collapsed: false,
    suggestedInfo: dataSuggested,
    buttonLabel: "Search site",
    searchCards: [{
        title: {
            url: "https://hcl-software.com",
            label: "Card Title 1 in up to two lines goes here ",
        },
        description: "description up to two LINES goes here"
    }, {
        title: {
            url: "https://hcl-software.com",
            label: "Card Title 2 in up to two lines goes here",
        },
        description: "description up to two LINES goes here"
    }, {
        title: {
            url: "https://hcl-software.com",
            label: "Card Title 3 in up to two lines goes here",
        },
        description: "description up to two LINES goes here"
    }, {
        title: {
            url: "https://hcl-software.com",
            label: "Card Title 1 Resources in up to two lines goes here",
        },
        description: "description up to two LINES goes here"
    }, {
        title: {
            url: "https://hcl-software.com",
            label: "Card Title 2 Resources in up to two lines goes here",
        },
        description: "description up to two LINES goes here"
    }, {
        title: {
            url: "https://hcl-software.com",
            label: "Card Title 3 Resources in up to two lines goes here",
        },
        description: "description up to two LINES goes here"
    }]
};

export const searchInputChangedIcons = Template.bind( {} );
export const searchInputChangedIconsArgs = {
    ...searchInputArgs,
    icons: {
        close: "ci-Close_LG",
        search: "ci-Note_Search"
    }
};

searchInput.args = searchInputArgs;
searchVisibleInput.args = searchVisibleArgs;
searchInputChangedIcons.args = searchInputChangedIconsArgs;

