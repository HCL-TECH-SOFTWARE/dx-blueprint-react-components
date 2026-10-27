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
import DXGallery from "./DXGallery";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Lists, Catalogs, and Filters/Gallery",
    component: DXGallery,
    excludeStories: /.*Args$/,
} as Meta<typeof DXGallery>;

const Template: StoryFn<typeof DXGallery> = ( args ) => <DXGallery {...args} />;

export const Gallery = Template.bind( {} );
export const GalleryChangedIcons = Template.bind( {} );
export const GalleryInner = Template.bind( {} );
export const GalleryNoInfo = Template.bind( {} );
export const GalleryOverflow = Template.bind( {} );
export const GalleryEmpty = Template.bind( {} );

export const imagesArgs = [
    {
        url: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1768&q=80",
        description: "A single drop of water, it serves as a reminder of the small details that make up the world around us."
    },
    {
        url: "https://images.unsplash.com/photo-1502904550040-7534597429ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2300&q=80",
        description: "A snow drop of water, it serves as a reminder of the small details that make up the world around us."
    },
    {
        url: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        description: "A sky drop of water, it serves as a reminder of the small details that make up the world around us."
    }
];

export const galleryChangedIconArgs = {
    title: "Checkout these pictures!",
    date: "February 11, 2022",
    images: imagesArgs,
    icons: {
        prev: "ci-Arrow_Left_MD",
        next: "ci-Arrow_Right_MD",
    }
};

Gallery.args = {
    title: "Checkout these pictures!",
    date: "February 11, 2022",
    images: imagesArgs
};
GalleryChangedIcons.args = galleryChangedIconArgs;
GalleryInner.args = {
    title: "Checkout these pictures!",
    images: imagesArgs,
    innerInfo: true
};
GalleryNoInfo.args = {
    title: "Checkout these pictures!",
    images: imagesArgs,
    hideInfo: true
};
GalleryOverflow.args = {
    title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
    date: "August 15, 2022",
    images: [
        {
            url: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1768&q=80",
            description: "A single drop of water, it serves as a reminder of the small details that make up the world around us. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et "
        },
        {
            url: "https://images.unsplash.com/photo-1502904550040-7534597429ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2300&q=80",
            description: "A snow drop of water, it serves as a reminder of the small details that make up the world around us. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et "
        },
        {
            url: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            description: "A sky drop of water, it serves as a reminder of the small details that make up the world around us. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et "
        }
    ],
    innerInfo: true
};
GalleryEmpty.args = {
    images: [],
    title: "Checkout these pictures!",
};
