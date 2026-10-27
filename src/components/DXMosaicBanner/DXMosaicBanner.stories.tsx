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
import DXMosaicBanner, { MosaicBannerProps } from "./DXMosaicBanner";
import { MosaicButtonProps } from "../DXMosaicButton/DXMosaicButton";
import { StoryFn } from "@storybook/react-webpack5";

export default {
    component: DXMosaicBanner,
    title: "Components/General/Mosaic Banner",
    excludeStories: /.*Args$/,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<MosaicBannerProps> = ( args ) => (
    <DXMosaicBanner {...args} />
);

const defaultMosaicButtonProps: MosaicButtonProps = {
    size: "md",
    title: "Lorem ipsum dolor",
    subtitle: "Elementum tempus egestas sed sed risus pretium quam vulputate dignissim.",
    index: 1,
    link: { url: "#", target: "_self" },
    image: {
        url: "https://images.unsplash.com/photo-1505322715123-90e9aa1e2d86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        altText: "Test alternative text",
    },
};

let mosaicItems: MosaicButtonProps[] = [
    { ...defaultMosaicButtonProps, index: 0 },
    {
        ...defaultMosaicButtonProps,
        index: 1,
        image: {
            url: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2103&q=80",
            altText: "Test alternative text",
        }
    },
    {
        ...defaultMosaicButtonProps,
        index: 2,
        image: {
            url: "https://images.unsplash.com/photo-1528492501711-867fd2c44bb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            altText: "Test alternative text",
        }
    },
    {
        ...defaultMosaicButtonProps,
        index: 3,
        image: {
            url: "https://images.unsplash.com/photo-1642372133192-576c3484321b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            altText: "Test alternative text",
        }
    },
    {
        ...defaultMosaicButtonProps,
        index: 4,
        image: {
            url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            altText: "Test alternative text",
        }
    },
    {
        ...defaultMosaicButtonProps,
        index: 5,
        image: {
            url: "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            altText: "Test alternative text",
        }
    }
];

export const Banner = Template.bind( {} );
export const BannerArgs: MosaicBannerProps = {
    items: mosaicItems,
};

Banner.args = BannerArgs;
