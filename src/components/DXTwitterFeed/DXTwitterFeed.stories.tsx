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
