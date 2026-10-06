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
export const RiverWithoutOverflow = Template.bind( {} );
export const RiverWithMoreLinks = Template.bind( {} );
export const RiverWithDifferentOverflowValues = Template.bind( {} );

export const riverOfContentArgs = {
    index: 1,
    header: "Header text up to two lines with 43 characters",
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
    viewAllLink: {
        url: "#catalog",
        label: "Go to the catalog"
    },
    collapsible: true
};

RiverOfContent.args = riverOfContentArgs;

RiverOfContentNonCollapsible.args = {
    index: 2,
    header: "Header text up to two lines with 43 characters",
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
    viewAllLink: {
        url: "#catalog",
        label: "Go to the catalog"
    },
    collapsible: false
};

RiverWithoutOverflow.args = {
    index: 3,
    header: "Amazing news",
    links: [
        {
            url: "#one",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars."
        },
        {
            url: "#two",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars."
        },
        {
            url: "#three",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars."
        },
    ],
    viewAllLink: {
        url: "#view-all"
    },
    collapsible: true
};

RiverWithMoreLinks.args = {
    ...riverOfContentArgs,
    index: 4,
    links: [
        {
            url: "#one",
            target: "_blank",
            label: "News item up to one line that supports up to 93 chars. In case of more characters, then ellipsis so"
        },
        {
            url: "#two",
            target: "_blank",
            label: "News item up to two lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        },
        {
            url: "#three",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        },
        {
            url: "#four",
            target: "_blank",
            label: "News item up to four lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        },
        {
            url: "#five",
            target: "_blank",
            label: "News item up to five lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        },
        {
            url: "#six",
            target: "_blank",
            label: "News item up to six lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        },
    ]
};

RiverWithDifferentOverflowValues.args = {
    ...riverOfContentArgs,
    index: 5,
    headerCharLimit: 70,
    itemCharLimit: 120
};

RiverOfContentChangedIcons.args = {
    ...RiverOfContent.args,
    icons: {
        link: "ci-Arrow_Down_SM"
    }
};
