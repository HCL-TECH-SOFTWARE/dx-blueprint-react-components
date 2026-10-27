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
import DXButton from "./DXButton";

export default {
    title: "Components/Buttons and Headers/Button",
    component: DXButton,
    excludeStories: /.*Args$/,
} as Meta<typeof DXButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXButton> = ( args ) => <DXButton {...args} />;

export const Default = Template.bind( {} );
export const IconButton = Template.bind( {} );
export const RightIconButton = Template.bind( {} );
export const JustIcon = Template.bind( {} );

Default.args = {
    label: "Default button",
    id: "my-button",
    className: "default-btn",
    displayType: "primary",
    role: "button",
    onClick: function () {
        console.log( "I was called" );
    }
};

IconButton.args = {
    label: "Icon button",
    icon: {
        class: "ci-Add_Plus"
    }
};
RightIconButton.args = {
    label: "Icon button",
    icon: {
        class: "ci-Add_Plus",
        position: "right"
    }
};
JustIcon.args = {
    label: "Test",
    icon: {
        class: "ci-Add_Plus"
    },
    hideLabel: true
};
