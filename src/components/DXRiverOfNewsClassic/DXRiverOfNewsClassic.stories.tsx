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
