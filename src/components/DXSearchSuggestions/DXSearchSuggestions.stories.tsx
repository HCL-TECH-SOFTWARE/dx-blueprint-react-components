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
import DXSearchSuggestions from './DXSearchSuggestions';

export default {
    title: "Components/Home Page/Search Suggestions",
    component: DXSearchSuggestions,
    excludeStories: /.*Args$/,
} as Meta<typeof DXSearchSuggestions>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXSearchSuggestions> = ( args ) => <DXSearchSuggestions {...args} />;

export const SimpleSearch = Template.bind( {} );
export const ChangedIcons = Template.bind( {} );
export const itemsArgs = [
    { label: "Question 1", url: "#one" },
    { label: "Question 2", url: "#two" },
    { label: "Question 3", url: "#three" },
    { label: "Question 4", url: "#four" },
    { label: "Question 5", url: "#five" },
    { label: "Question 6", url: "#six" },
    { label: "Question 7", url: "#seven" },
];
export const ssArgs = {
    searchItems: itemsArgs,
    searchFn: function ( filter: string ) {
        console.log( "This is what you searched: ", filter );
    },
    iconPosition: "right" as "right",
    searchPlaceholder: "Look for..."
};

SimpleSearch.args = ssArgs;
ChangedIcons.args = {
    ...ssArgs,
    icons: {
        search: "ci-Note_Search",
        link: "ci-Arrow_Right_MD"
    }
};
