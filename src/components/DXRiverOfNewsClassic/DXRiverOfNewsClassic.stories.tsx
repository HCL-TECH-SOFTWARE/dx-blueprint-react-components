import React from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXRiverOfNewsClassic, { RiverOfNewsProps } from "./DXRiverOfNewsClassic";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Lists, Catalogs, and Filters/River of News Classic",
    component: DXRiverOfNewsClassic,
    excludeStories: /.*Args$/,
} as Meta;

const Template: StoryFn<RiverOfNewsProps> = ( args ) => <DXRiverOfNewsClassic {...args} />;

export const BasicExample = Template.bind( {} );
export const NoTumbnailsExample = Template.bind( {} );
export const AllParamsExample = Template.bind( {} );

export const BasicExampleArgs: RiverOfNewsProps = {
    title: "Local News",
    riverOfNews: [
        {
            image: {
                url: "https://images.unsplash.com/photo-1657819466043-2a4ae992f03f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80"
            },
            link: {
                label: "News title, no more than two lines, then ellipsis",
                url: "www.hcl-software.com"
            },
            date: "01/01/2023",
            contentType: "PRESS RELEASE",
        },
        {
            image: {
                url: "https://images.unsplash.com/photo-1673101609020-4b5e203885bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
            },
            link: {
                label: "News title",
                url: "www.hcl-software.com"
            },
            date: "06/30/1997",
        },
        {
            link: {
                label: "News title, no more than two lines, then ellipsis",
                url: "www.hcl-software.com"
            },
            date: "01/01/2023",
        },
    ],
    viewAllLink: {
        label: "View All",
        url: "https://www.hcl-software.com",
    }
};

export const NoThumbsArgs: RiverOfNewsProps = {
    title: "Local News",
    riverOfNews: [
        {
            link: {
                label: "News title, no more than two lines, then ellipsis",
                url: "www.hcl-software.com"
            },
            date: "01/01/2023",
        },
        {
            link: {
                label: "News title, no more than two lines, then ellipsis",
                url: "www.hcl-software.com"
            },
            date: "01/01/2023",
        },
        {
            link: {
                label: "News title, no more than two lines, then ellipsis",
                url: "www.hcl-software.com"
            },
            date: "01/01/2023",
        },
    ],
    viewAllLink: {
        label: "View All",
        url: "https://www.hcl-software.com",
        target: "_blank"
    },
    allDateFormat: "DD/MM/YY"
};

export const AllParamsArgs: RiverOfNewsProps = {
    title: "Local News",
    riverOfNews: [
        {
            image: {
                url: "https://images.unsplash.com/photo-1657819466043-2a4ae992f03f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
                altText: "People working in an office"
            },
            link: {
                label: "News title, no more than two lines, then ellipsis",
                url: "www.hcl-software.com",
                target: "_self"
            },
            date: "01/02/2023",
            contentType: "PRESS RELEASE",
        },
        {
            image: {
                url: "https://images.unsplash.com/photo-1673100749940-d9a899cb3968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
                altText: "People working in an office"
            },
            link: {
                label: "News title, no more than two lines, then ellipsis",
                url: "www.hcl-software.com"
            },
            date: "01/02/2023",
            contentType: "PRESS RELEASE",
        },
        {
            image: {
                url: "https://images.unsplash.com/photo-1673101609020-4b5e203885bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
                altText: "People working in an office"
            },
            link: {
                label: "News title, no more than two lines, then ellipsis",
                url: "www.hcl-software.com"
            },
            date: "01/02/2023",
            contentType: "PRESS RELEASE",
        },
    ],
    viewAllLink: {
        label: "View All",
        url: "https://www.hcl-software.com",
        target: "_blank"
    },
    allDateFormat: "DD/MM/YY"
};

BasicExample.args = BasicExampleArgs;
NoTumbnailsExample.args = NoThumbsArgs;
AllParamsExample.args = AllParamsArgs;
