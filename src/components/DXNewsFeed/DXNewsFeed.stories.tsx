import React from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXNewsFeed, { NewsFeedProps } from "./DXNewsFeed";
import { fullImageArgs } from "../DXFullImageCard/DXFullImageCard.stories";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/General/News Feed",
    component: DXNewsFeed,
    excludeStories: /.*Args$/,
} as Meta<typeof DXNewsFeed>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<NewsFeedProps> = ( args ) => <DXNewsFeed {...args} />;

export const NewsFeed = Template.bind( {} );
// More on args: https://storybook.js.org/docs/react/writing-stories/args

let SocialCardBasicArgs =
{
    likes: {
        label: 138,
        onClick: () => { console.log( "Like button!" ); }
    },
    comments: {
        label: 25,
        onClick: () => { console.log( "Comment button!" ); }
    }
};

export const NewsFeedArgs: NewsFeedProps = {
    title: "News feed title",
    filterCategories: ["news", "article", "event", "blog"],
    items: [
        {
            size: 6,
            categories: ["blog"],
            image: {
                url: "https://images.unsplash.com/photo-1595981234058-a9302fb97229?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                altText: "Alt"
            },
            subtitle: "2023/06/13",
            description: "Photo album: Best places to go",
            link: "https://hcl-software.com/",
            dateFormat: "YY/MM/DD",
        },
        {
            size: 4,
            categories: ["blog", "news"],
            body: "Description goes here.",
            image: {
                url: "https://images.unsplash.com/photo-1523357585206-175e971f2ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
                altText: "Image alt"
            },
            sticker: {
                url: "https://images.unsplash.com/photo-1657819466043-2a4ae992f03f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
                altText: "Sticker alt"
            },
            title: {
                url: "www.hcl-software.com",
                label: "Design blog: Day 26!"
            },
            authorText: "By User, 5 HOURS AGO",
            ...SocialCardBasicArgs
        },
        {
            size: 2,
            height: "small",
            categories: ["news"],
            image: {
                url: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                altText: "Fruits"
            },
            subtitle: "2023/06/10",
            description: "About balanced food",
            link: "https://hcl-software.com/",
            dateFormat: "YY/MM/DD"
        },
        {
            size: 2,
            height: "small",
            categories: ["news", "event"],
            image: {
                url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                altText: "Alt"
            },
            subtitle: "2023/01/23",
            description: "We are hiring!",
            link: "https://hcl-software.com/",
            dateFormat: "YY/MM/DD"
        },
        {
            size: 4,
            categories: ["event"],
            image: {
                url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80",
                altText: "Alt"
            },
            subtitle: "2023/07/03",
            description: "Summer break party!",
            link: "https://hcl-software.com/",
            dateFormat: "YY/MM/DD"
        },
        {
            size: 2,
            categories: ["blog"],
            body: "Forest and camping!",
            image: {
                url: "https://images.unsplash.com/photo-1667312950895-306784936a68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
                altText: "Image alt"
            },
            title: {
                url: "www.hcl-software.com",
                label: "Field trip"
            },
            authorText: "By Hiker, 1 DAY AGO",
            type: "medium",
            ...SocialCardBasicArgs
        },
        {
            size: 2,
            categories: ["blog, news"],
            image: {
                url: "https://images.unsplash.com/photo-1667312950895-306784936a68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
                altText: "Image alt"
            },
            title: {
                url: "www.hcl-software.com",
                label: "System updates notes: Version 12.4"
            },
            authorText: "By User, 1 DAY AGO",
            type: "small",
            ...SocialCardBasicArgs
        },
        {
            size: 2,
            height: "small",
            categories: ["news", "article"],
            ...fullImageArgs
        },
        {
            size: 2,
            categories: ["article"],
            body: "10 tips",
            image: {
                url: "https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                altText: "Image alt"
            },
            title: {
                url: "www.hcl-software.com",
                label: "Ways to increase productivity!"
            },
            authorText: "By Hiker, 1 DAY AGO",
            type: "small",
            ...SocialCardBasicArgs
        }
    ]
};

NewsFeed.args = NewsFeedArgs;
