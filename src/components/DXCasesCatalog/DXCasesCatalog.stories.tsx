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
import DXCasesCatalog from './DXCasesCatalog';

export default {
    title: "Components/Lists, Catalogs, and Filters/Cases Catalog",
    component: DXCasesCatalog,
    excludeStories: /.*Args$/,
} as Meta<typeof DXCasesCatalog>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXCasesCatalog> = ( args ) => <DXCasesCatalog {...args} />;

export const Default = Template.bind( {} );

export const itemsArgs = [
    {
        title: "#0001-General Review of Year 2022",
        subtitle: "HR",
        label: {
            label: "Label Text",
            color: "var(--danger-danger)"
        },
        options: [
            {
                label: "Option 1",
                onClick: function () { console.log( "Option 1.1 called" ); }
            },
            {
                label: "Option 2",
                onClick: function () { console.log( "Option 1.2 called" ); }
            },
            {
                label: "Option 3",
                onClick: function () { console.log( "Option 1.3 called" ); }
            },
        ]
    },
    {
        title: "#0002-General Review of Year 2022",
        subtitle: "HR",
        label: {
            label: "Label Text",
            color: "var(--primary-primary)"
        },
        options: [
            {
                label: "Option 1",
                onClick: function () { console.log( "Option 2.1 called" ); }
            },
            {
                label: "Option 2",
                onClick: function () { console.log( "Option 2.2 called" ); }
            },
            {
                label: "Option 3",
                onClick: function () { console.log( "Option 2.3 called" ); }
            },
        ]
    },
    {
        title: "#0003-General Review of Year 2022",
        subtitle: "HR",
        label: {
            label: "Label Text",
            color: "var(--danger-danger)"
        },
        options: [
            {
                label: "Option 1",
                onClick: function () { console.log( "Option 3.1 called" ); }
            },
            {
                label: "Option 2",
                onClick: function () { console.log( "Option 3.2 called" ); }
            },
            {
                label: "Option 3",
                onClick: function () { console.log( "Option 3.3 called" ); }
            },
        ]
    },
    {
        title: "#0004-General Review of Year 2022",
        subtitle: "HR",
        label: {
            label: "Label Text",
            color: "var(--secondary-secondary)"
        },
        options: [
            {
                label: "Option 1",
                onClick: function () { console.log( "Option 4.1 called" ); }
            },
            {
                label: "Option 2",
                onClick: function () { console.log( "Option 4.2 called" ); }
            },
            {
                label: "Option 3",
                onClick: function () { console.log( "Option 4.3 called" ); }
            },
        ]
    },
    {
        title: "#0005-General Review of Year 2022",
        subtitle: "HR",
        label: {
            label: "Label Text",
            color: "var(--primary-primary)"
        },
        options: [
            {
                label: "Option 1",
                onClick: function () { console.log( "Option 5.1 called" ); }
            },
            {
                label: "Option 2",
                onClick: function () { console.log( "Option 5.2 called" ); }
            },
            {
                label: "Option 3",
                onClick: function () { console.log( "Option 5.3 called" ); }
            },
        ]
    },
];
Default.args = {
    //@ts-ignore: Valid prop values
    items: itemsArgs
};
