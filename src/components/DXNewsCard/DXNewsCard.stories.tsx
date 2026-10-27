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
import DXNewsCard, { NewsCardProps } from "./DXNewsCard";

export default {
    title: "Components/Cards/News Card",
    component: DXNewsCard,
    excludeStories: /.*Args$/,
} as Meta;

const Template: StoryFn<NewsCardProps> = ( args ) => <DXNewsCard {...args} />;

export const BasicExample = Template.bind( {} );
export const NoImage = Template.bind( {} );
export const FullParamsExample = Template.bind( {} );
export const ImageOnTop = Template.bind( {} );

export const BasicExampleArgs: NewsCardProps = {
    image: {
        url: "https://images.unsplash.com/photo-1657819466043-2a4ae992f03f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80"
    },
    link: {
        label: "News title, no more than two lines, then ellipsis",
        url: "www.hcl-software.com"
    },
    date: "01/02/2023",
    contentType: "PRESS RELEASE"
};

export const NoImageArgs: NewsCardProps = {
    link: {
        label: "News title, no more than two lines, then ellipsis",
        url: "www.hcl-software.com"
    },
    date: "01/02/2023",
};

export const FullExampleArgs: NewsCardProps = {
    image: {
        url: "https://images.unsplash.com/photo-1622227920933-7fcd7377703f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        altText: "People working in an office"
    },
    link: {
        label: "News title, no more than two lines, then ellipsis",
        url: "www.hcl-software.com",
        target: "_self",
    },
    date: "01/02/2023",
    contentType: "PRESS RELEASE",
    contentPosition: "connected",
    dateFormat: "DD/MM/YY",
};

BasicExample.args = BasicExampleArgs;
FullParamsExample.args = FullExampleArgs;
NoImage.args = NoImageArgs;
ImageOnTop.args = {
    ...FullExampleArgs,
    layout: "top"
};
