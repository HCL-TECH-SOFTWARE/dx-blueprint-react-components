import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXRiverOfContent from './DXRiverOfContent';

export default {
    title: "Components/Lists, Catalogs, and Filters/River of Content",
    component: DXRiverOfContent,
    excludeStories: /.*Args$/,
} as Meta<typeof DXRiverOfContent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXRiverOfContent> = ( args ) => <DXRiverOfContent {...args} />;

export const RiverOfContent = Template.bind( {} );
export const RiverOfContentChangedIcons = Template.bind( {} );
export const RiverOfContentNonCollapsible = Template.bind( {} );

export const riverOfContentArgs = {
    index: 1,
    header: "News item up to three lines that supports ",
    links: [
        {
            url: "#one",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        },
        {
            url: "#two",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        },
        {
            url: "#three",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        },
        {
            url: "#four",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        },
    ],
    collapsible: true
};

RiverOfContent.args = riverOfContentArgs;

RiverOfContentNonCollapsible.args = {
    index: 2,
    header: "News item up to three lines that supports ",
    links: [
        {
            url: "#one",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        },
        {
            url: "#two",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        },
        {
            url: "#three",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        },
        {
            url: "#four",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        },
    ],
    collapsible: false
};

RiverOfContentChangedIcons.args = {
    ...RiverOfContent.args,
    icons: {
        link: "ci-Arrow_Down_SM"
    }
};
