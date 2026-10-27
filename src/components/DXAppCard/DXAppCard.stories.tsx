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
import DXAppCard from "./DXAppCard";

export default {
    title: "Components/Cards/App Card",
    component: DXAppCard,
    excludeStories: /.*Args$/,
} as Meta<typeof DXAppCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXAppCard> = ( args ) => <DXAppCard {...args} />;

export const Default = Template.bind( {} );
export const Icon = Template.bind( {} );
export const Overflow = Template.bind( {} );

Default.args = {
    media: {
        url: "https://upload.wikimedia.org/wikipedia/commons/3/35/Logo_Messenger_NewBlurple-399x399-1.webp",
        altText: "app-facebook-messenger"
    },
    label: "Messenger",
    actionFn: function () { console.log( "I was triggered" ); }
};
Icon.args = {
    media: "ci-Printer",
    label: "Printer",
    actionFn: function () { console.log( "I was triggered" ); }
};
Overflow.args = {
    media: {
        url: "https://upload.wikimedia.org/wikipedia/commons/3/35/Logo_Messenger_NewBlurple-399x399-1.webp",
        altText: "app-facebook-messenger"
    },
    label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    actionFn: function () { console.log( "I was triggered" ); }
};
