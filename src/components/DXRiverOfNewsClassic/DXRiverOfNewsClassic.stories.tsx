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
import DXRiverOfNewsClassic, { RiverOfNewsProps } from "./DXRiverOfNewsClassic";

const newsImage = "./docs/how-to/storybook-documents/DXRiverOfNewsClassic/news_image.jpg";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Lists, Catalogs, and Filters/River of News Classic",
    component: DXRiverOfNewsClassic,
    excludeStories: /.*Args$/,
} as Meta;

const Template: StoryFn<RiverOfNewsProps> = ( args ) => <DXRiverOfNewsClassic {...args} />;

export const BasicExample = Template.bind( {} );
export const NoTumbnailsExample = Template.bind( {} );

const buildNewsItems = (): RiverOfNewsProps["riverOfNews"] => ([
    {
        image: { url: newsImage, altText: "Press interview with cameras focused on a speaker" },
        link: { label: "News Title with no more than two lines of content (55 chars) then ...", url: "www.hcl-software.com" },
        date: "10/12/2022",
        contentType: "CATEGORY",
    },
    {
        image: { url: newsImage, altText: "Press interview with cameras focused on a speaker" },
        link: { label: "News Title with no more than two lines of content (55 chars) then ...", url: "www.hcl-software.com" },
        date: "10/12/2022",
        contentType: "CATEGORY",
    },
    {
        image: { url: newsImage, altText: "Press interview with cameras focused on a speaker" },
        link: { label: "News Title with no more than two lines of content (55 chars) then ...", url: "www.hcl-software.com" },
        date: "10/12/2022",
        contentType: "CATEGORY",
    },
    {
        link: { label: "News Title with no more than two lines of content (55 chars) then ...", url: "www.hcl-software.com" },
        date: "10/12/2022",
        contentType: "CATEGORY",
    },
    {
        link: { label: "News Title with no more than two lines of content (55 chars) then ...", url: "www.hcl-software.com" },
        date: "10/12/2022",
        contentType: "CATEGORY",
    },
    {
        image: { url: newsImage, altText: "Press interview with cameras focused on a speaker" },
        link: { label: "News Title with no more than two lines of content (55 chars) then ...", url: "www.hcl-software.com" },
        date: "10/12/2022",
        contentType: "CATEGORY",
    },
    {
        image: { url: newsImage, altText: "Press interview with cameras focused on a speaker" },
        link: { label: "News Title with no more than two lines of content (55 chars) then ...", url: "www.hcl-software.com" },
        date: "10/12/2022",
        contentType: "CATEGORY",
    },
    {
        link: { label: "News Title with no more than two lines of content (55 chars) then ...", url: "www.hcl-software.com" },
        date: "10/12/2022",
        contentType: "CATEGORY",
    },
    {
        link: { label: "News Title with no more than two lines of content (55 chars) then ...", url: "www.hcl-software.com" },
        date: "10/12/2022",
        contentType: "CATEGORY",
    },
    {
        image: { url: newsImage, altText: "Press interview with cameras focused on a speaker" },
        link: { label: "News Title with no more than two lines of content (55 chars) then ...", url: "www.hcl-software.com" },
        date: "10/12/2022",
        contentType: "CATEGORY",
    },
    {
        image: { url: newsImage, altText: "Press interview with cameras focused on a speaker" },
        link: { label: "News Title with no more than two lines of content (55 chars) then ...", url: "www.hcl-software.com" },
        date: "10/12/2022",
        contentType: "CATEGORY",
    },
    {
        link: { label: "News Title with no more than two lines of content (55 chars) then ...", url: "www.hcl-software.com" },
        date: "10/12/2022",
        contentType: "CATEGORY",
    },
    {
        link: { label: "News Title with no more than two lines of content (55 chars) then ...", url: "www.hcl-software.com" },
        date: "10/12/2022",
        contentType: "CATEGORY",
    },
    {
        image: { url: newsImage, altText: "Press interview with cameras focused on a speaker" },
        link: { label: "News Title with no more than two lines of content (55 chars) then ...", url: "www.hcl-software.com" },
        date: "10/12/2022",
        contentType: "CATEGORY",
    },
    {
        link: { label: "News Title with no more than two lines of content (55 chars) then ...", url: "www.hcl-software.com" },
        date: "10/12/2022",
        contentType: "CATEGORY",
    },
    {
        link: { label: "News Title with no more than two lines of content (55 chars) then ...", url: "www.hcl-software.com" },
        date: "10/12/2022",
        contentType: "CATEGORY",
    },
]);

export const BasicExampleArgs: RiverOfNewsProps = {
    title: "Title",
    icons: {
        header: "ci-Planet"
    },
    riverOfNews: buildNewsItems(),
    paginationProps: {
        sets: ["8", "16"],
        active: 1,
        activeSet: 8,
    }
};

export const NoThumbsArgs: RiverOfNewsProps = {
    title: "Title",
    icons: {
        header: "ci-Planet"
    },
    riverOfNews: [
        {
            link: {
                label: "News Title with no more than two lines of content (55 chars) then ...",
                url: "www.hcl-software.com"
            },
            date: "10/12/2022",
            contentType: "CATEGORY",
        },
        {
            link: {
                label: "News Title with no more than two lines of content (55 chars) then ...",
                url: "www.hcl-software.com"
            },
            date: "10/12/2022",
            contentType: "CATEGORY",
        },
        {
            link: {
                label: "News Title with no more than two lines of content (55 chars) then ...",
                url: "www.hcl-software.com"
            },
            date: "10/12/2022",
            contentType: "CATEGORY",
        },
    ],
    paginationProps: {
        sets: ["6", "16"],
        active: 1,
        activeSet: 6,
    }
};

export const AllParamsArgs: RiverOfNewsProps = BasicExampleArgs;

BasicExample.args = BasicExampleArgs;
NoTumbnailsExample.args = NoThumbsArgs;
