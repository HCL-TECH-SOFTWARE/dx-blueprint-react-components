import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXTwitterFeed, { TwitterFeedProps } from "./DXTwitterFeed";

export default {
    title: "Components/Custom/Twitter Feed",
    component: DXTwitterFeed,
    excludeStories: /.*Args$/,
} as Meta<typeof DXTwitterFeed>;

const Template: StoryFn<typeof DXTwitterFeed> = ( args: TwitterFeedProps ) => <DXTwitterFeed {...args} />;

export const ProfileFeed = Template.bind( {} );
ProfileFeed.args = {
    title: "Tweets by HCL Software",
    type: "profile",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus velit at tortor finibus pharetra. Donec id nibh convallis, aliquet odio ac, lacinia ante.",
    url: "https://x.com/HCLSoftware"

};

export const listFeed = Template.bind( {} );
listFeed.args = {
    title: "National Parks List",
    type: "list",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus velit at tortor finibus pharetra. Donec id nibh convallis, aliquet odio ac, lacinia ante.",
    url: "https://twitter.com/XDevelopers/lists/national-parks"

};

export const tweet = Template.bind( {} );
tweet.args = {
    title: "A memorable end to the 2024 season at Abu Dhabi!",
    type: "tweet",
    url: "https://x.com/HCLSoftware/status/1867592925204353441",
    options: {
        conversation: "none"
    }
};
