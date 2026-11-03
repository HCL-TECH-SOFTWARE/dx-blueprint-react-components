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
import DXEmptyState, { EmptyStateProps } from "./DXEmptyState";

export default {
    title: "Components/General/Empty State",
    component: DXEmptyState,
    excludeStories: /.*Args$/,
} as Meta<typeof DXEmptyState>;

const Template: StoryFn<typeof DXEmptyState> = ( args ) => {
    return (
        <div style={{ minHeight: "250px" }}>
            <DXEmptyState {...args} />
        </div >
    );
};

export const Default = Template.bind( {} );
export const WithButtons = Template.bind( {} );

export const DefaultArgs = {
    title: "You don’t have any Saved Links",
    text: 'Save links by clicking on the "Add to My Links" button.',
    image: {
        url: "./docs/how-to/storybook-documents/DXMySavedLinks/Empty-State.png",
        altText: "empty-view"
    }
} as EmptyStateProps;

export const WithButtonsArgs = {
    title: "You don’t have any Saved Links",
    text: 'Save links by clicking on the "Add to My Links" button.',
    image: {
        url: "./docs/how-to/storybook-documents/DXMySavedLinks/Empty-State.png",
        altText: "empty-view"
    },
    primaryButton: {
        label: "Regular button",
        onClick: function () {
            console.log( "I was called" );
        },
        icon: {
            class: "ci-Add_Plus",
            position: "right"
        }
    },
    secondaryButton: {
        label: "New",
        onClick: function () {
            console.log( "I was called" );
        }
    }
} as EmptyStateProps;


Default.args = DefaultArgs;
WithButtons.args = WithButtonsArgs;


