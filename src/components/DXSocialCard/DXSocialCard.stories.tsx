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
import DXSocialCard, { SocialCardProps } from "./DXSocialCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Cards/Social Card",
    component: DXSocialCard,
    excludeStories: /.*Args$/,
} as Meta<typeof DXSocialCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<SocialCardProps> = ( args ) => (
    <div style={ { width: "100%", maxWidth: "320px", margin: "0 auto" } }>
        <DXSocialCard {...args} />
    </div>
);

export const Desktop = Template.bind( {} );
export const Mobile = Template.bind( {} );
export const TitleSource = Template.bind( {} );
export const ChangedIcons = Template.bind( {} );
export const TitleDescSource = Template.bind( {} );
export const TitleDescImageSource = Template.bind( {} );

export const SocialCardArgs: SocialCardProps = {
    title: {
        url: "www.hcl-software.com",
        label: "Title Goes Here."
    },
    authorText: "By Viva Engage - 2 Hours Ago",
    body: "Description goes here.",
    image: {
        url: "https://images.unsplash.com/photo-1667312950895-306784936a68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        altText: "Image alt"
    },
    sticker: {
        url: "https://images.unsplash.com/photo-1657819466043-2a4ae992f03f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
        altText: "Sticker alt"
    },
    likes: {
        label: 100,
        onClick: () => { console.log( "Like button!" ); }
    },
    comments: {
        label: 10,
        onClick: () => { console.log( "Comment button!" ); }
    }
};

export const PrimaryArgs: SocialCardProps = {
    ...SocialCardArgs,
    type: "primary"
};

export const MediumArgs: SocialCardProps = {
    ...SocialCardArgs,
    type: "medium"
};

export const DescriptionOnlyArgs: SocialCardProps = {
    title: {
        url: "www.hcl-software.com",
        label: "Title Goes Here."
    },
    authorText: "By Viva Engage - 2 Hours Ago",
    body: "Description goes here.",
    sticker: {
        url: "https://images.unsplash.com/photo-1657819466043-2a4ae992f03f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
        altText: "Sticker alt"
    },
    type: "primary"
};

export const SourceOnlyArgs: SocialCardProps = {
    title: {
        url: "www.hcl-software.com",
        label: "Title Goes Here."
    },
    authorText: "By Viva Engage - 2 Hours Ago",
    showAuthorImage: false,
    compactNoBodySpacing: true,
    sticker: {
        url: "https://images.unsplash.com/photo-1657819466043-2a4ae992f03f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
        altText: "Sticker alt"
    },
    type: "primary"
};

export const SmallArgs: SocialCardProps = {
    ...SourceOnlyArgs,
    type: "small"
};

export const SocialChangedIconsArgs: SocialCardProps = {
    title: {
        url: "www.hcl-software.com",
        label: "My title"
    },
    body: "Description goes here.",
    authorText: "By User - 2 Hours Ago",
    type: "primary",
    icons: {
        user: "ci-Users",
        comments: "ci-Chat",
        likes: "ci-Cookie"
    },
    likes: {
        label: 138,
        onClick: () => { console.log( "Like button!" ); }
    },
    comments: {
        label: 25,
        onClick: () => { console.log( "Comment button!" ); }
    }
};

Desktop.args = PrimaryArgs;
Mobile.args = MediumArgs;
TitleSource.args = SourceOnlyArgs;
ChangedIcons.args = SocialChangedIconsArgs;
TitleDescSource.args = DescriptionOnlyArgs;
TitleDescImageSource.args = PrimaryArgs;
