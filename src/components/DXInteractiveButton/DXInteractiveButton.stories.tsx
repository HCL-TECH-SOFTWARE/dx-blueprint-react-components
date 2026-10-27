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
import DXInteractiveButton, { InteractiveButtonProps } from "./DXInteractiveButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Buttons and Headers/Interactive Button",
    component: DXInteractiveButton,
    excludeStories: /.*Args$/,
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<InteractiveButtonProps> = ( args ) => <DXInteractiveButton {...args} />;

// default button (least props)
export const DefaultButton = Template.bind( {} );
export const DefaultButtonArgs: InteractiveButtonProps = {
    active: {
        label: "Active Label",
        onClick: () => {},
        icon: {
            class: "ci-Checkbox_Check",
        },
        message: "Active Button Message",
    },
    inactive: {
        label: "Inactive Label",
        onClick: () => {},
        icon: {
            class: "ci-Checkbox_Unchecked",
        },
        message: "Inactive Button Message",
    },
};

DefaultButton.args = DefaultButtonArgs;

// right icon
export const RightIcon = Template.bind( {} );
export const RightIconArgs: InteractiveButtonProps = {
    active: {
        label: "Active Label",
        onClick: () => {},
        icon: {
            class: "ci-Checkbox_Check",
            position: 'right'
        },
        message: "Active Button Message",
    },
    inactive: {
        label: "Inactive Label",
        onClick: () => {},
        icon: {
            class: "ci-Checkbox_Unchecked",
            position: 'right'
        },
        message: "Inactive Button Message",
    },
};
RightIcon.args = RightIconArgs;


// left icon
export const LeftIcon = Template.bind( {} );
export const LeftIconArgs: InteractiveButtonProps = {
    active: {
        label: "Active Label",
        onClick: () => {},
        icon: {
            class: "ci-Checkbox_Check",
            position: 'left'
        },
        message: "Active Button Message",
    },
    inactive: {
        label: "Inactive Label",
        onClick: () => {},
        icon: {
            class: "ci-Checkbox_Unchecked",
            position: 'left'
        },
        message: "Inactive Button Message",
    },
};
LeftIcon.args = LeftIconArgs;

//No icon story
export const NoIcon = Template.bind( {} );
export const NoIconArgs: InteractiveButtonProps = {
    active: {
        label: "Active Label",
        onClick: () => {},
        message: "Active Button Message",
    },
    inactive: {
        label: "Inactive Label",
        onClick: () => {},
        message: "Inactive Button Message",
    },
};
NoIcon.args = NoIconArgs;

// default active icon story
export const DefaultActive = Template.bind( {} );
export const DefaultActiveArgs: InteractiveButtonProps = {
    active: {
        label: "Active Label",
        onClick: () => {},
        icon: {
            class: "ci-Checkbox_Check",
        },
        message: "Active Button Message",
    },
    inactive: {
        label: "Inactive Label",
        onClick: () => {},
        icon: {
            class: "ci-Checkbox_Unchecked",
        },
        message: "Inactive Button Message",
    },
    isActive: true,
};
DefaultActive.args = DefaultActiveArgs;

//disabled button story
export const DisabledButton = Template.bind( {} );
export const DisabledButtonArgs: InteractiveButtonProps = {
    active: {
        label: "Active Label",
        onClick: () => {},
        icon: {
            class: "ci-Checkbox_Check",
        },
        message: "Active Button Message",
    },
    inactive: {
        label: "Inactive Label",
        onClick: () => {},
        icon: {
            class: "ci-Checkbox_Unchecked",
        },
        message: "Inactive Button Message",
    },
    disabled: true,
};
DisabledButton.args = DisabledButtonArgs;
