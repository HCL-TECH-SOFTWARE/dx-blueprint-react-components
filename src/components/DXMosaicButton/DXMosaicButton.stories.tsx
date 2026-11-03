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
import DXMosaicButton, { MosaicButtonProps } from "./DXMosaicButton";
import { StoryFn } from "@storybook/react-webpack5";
import { ImageProps } from "../../utilities";

export default {
    component: DXMosaicButton,
    title: "Components/Buttons and Headers/Mosaic Button",
    excludeStories: /.*Args$/,
};

const Template: StoryFn<MosaicButtonProps> = ( args ) => (
    <div className="dxMosaicButtonTestContainer" style={{ height: '200px' }}>
        <DXMosaicButton {...args} />
    </div>
);

const imageProps: ImageProps = {
    url: "https://images.unsplash.com/photo-1505322715123-90e9aa1e2d86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    altText: "Sunset landscape with a tree and mountain",
};

const DefaultButtonArgs: MosaicButtonProps = {
    index: 0,
    size: "md",
    title: "Mosaic Button title",
    link: {
        url: "https://hcl-software.com/",
        target: "_blank",
    },
};

export const LargeButton = Template.bind( {} );
export const LargeButtonArgs: MosaicButtonProps = {
    ...DefaultButtonArgs,
    size: "lg",
    subtitle: "Mosaic Button subtitle",
    image: imageProps,
};

LargeButton.args = LargeButtonArgs;

export const MediumButton = Template.bind( {} );
export const MediumButtonArgs: MosaicButtonProps = {
    ...DefaultButtonArgs,
    subtitle: "Mosaic Button subtitle",
    image: imageProps,
};

MediumButton.args = MediumButtonArgs;

export const SmallButton = Template.bind( {} );
export const SmallButtonArgs: MosaicButtonProps = {
    ...DefaultButtonArgs,
    size: "sm",
    image: imageProps,
};

SmallButton.args = SmallButtonArgs;

export const DefaultButton = Template.bind( {} );
DefaultButton.args = DefaultButtonArgs;
