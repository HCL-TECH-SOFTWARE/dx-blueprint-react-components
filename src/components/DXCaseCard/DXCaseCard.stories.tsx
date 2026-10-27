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
import DXCaseCard from './DXCaseCard';

export default {
    title: "Components/Cards/Case Card",
    component: DXCaseCard,
    excludeStories: /.*Args$/,
} as Meta<typeof DXCaseCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXCaseCard> = ( args ) => <DXCaseCard {...args} />;

export const Default = Template.bind( {} );
export const CustomColorLabel = Template.bind( {} );

export const caseCardArgs = {
    title: "#0000-General Review of Year 2022",
    subtitle: "HR",
    label: {
        label: "Label Text",
    },
    options: [
        {
            label: "Option 1",
            onClick: function () { console.log( "Option 1 called" ); }
        },
        {
            label: "Option 2",
            onClick: function () { console.log( "Option 2 called" ); }
        },
        {
            label: "Option 3",
            onClick: function () { console.log( "Option 3 called" ); }
        },
    ]
};

Default.args = caseCardArgs;
CustomColorLabel.args = {
    ...caseCardArgs,
    label: {
        label: "label text",
        color: "var(--danger-danger)"
    }
};

export const DropdownOpened = Template.bind( {} );
DropdownOpened.storyName = "Default Version Dropdown Opened";
DropdownOpened.args = {
    ...caseCardArgs,
    dropdownOpen: true,
};
