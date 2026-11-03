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
import DXAd from "./DXAd";

export default {
    title: "Components/Buttons and Headers/Ad",
    component: DXAd,
    excludeStories: /.*Args$/,
} as Meta<typeof DXAd>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXAd> = ( args ) => <DXAd {...args} />;

export const Ad = Template.bind( {} );
export const AdNoIcon = Template.bind( {} );
export const AdJustIcon = Template.bind( {} );
export const AdNoImageWithColor = Template.bind( {} );
export const AdNoImage = Template.bind( {} );

Ad.args = {
    img: {
        url: "https://images.unsplash.com/photo-1661705969607-cde73828023d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
        altText: "image-1"
    },
    icon: "ci-Map",
    text: "Explore It"
};
AdNoIcon.args = {
    img: {
        url: "https://images.unsplash.com/photo-1661705969607-cde73828023d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
        altText: "image-1"
    },
    text: "Explore It"
};
AdJustIcon.args = {
    img: {
        url: "https://images.unsplash.com/photo-1661705969607-cde73828023d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
        altText: "image-1"
    },
    icon: "ci-Map",
};
AdNoImageWithColor.args = {
    icon: "ci-Map",
    text: "Explore It",
    backgroundColor: "#82d87f"
};
AdNoImage.args = {
    icon: "ci-Map",
    text: "Explore It",
};
