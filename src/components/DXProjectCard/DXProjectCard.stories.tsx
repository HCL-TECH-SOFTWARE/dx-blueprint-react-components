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
import DXProjectCard from "./DXProjectCard";
import { ImageProps } from '../../utilities';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Cards/Project Card",
    component: DXProjectCard,
    excludeStories: /.*Args$/,
} as Meta<typeof DXProjectCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXProjectCard> = ( args ) => <DXProjectCard {...args} />;

export const Default = Template.bind( {} );
export const ManyMembers = Template.bind( {} );
export const DefaultProjectAvatar = Template.bind( {} );
export const CustomProjectSymbol = Template.bind( {} );
export const ChangedIcons = Template.bind( {} );
export const ManyTags = Template.bind( {} );

export const projectArgs = {
    name: "Project Name",
    img: {
        url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        altText: "project-image"
    },
    tags: ["Any Label", "Status", "Urgency", "Other", "One more", "Example"],
    manager: {
        name: "Janet Kavandi",
        profileLink: "/janet-kavandi",
        img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    members: [
        {
            name: "Adam Smith",
            img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        },
        {
            name: "Sam Wong",
            img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
        },
        {
            name: "Kevin Powell",
        },
        {
            name: "Laura Tobias",
        },
        {
            name: "Jen Scott",
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80",
        },
    ],
    action: {
        label: "View project",
        icon: {
            class: "ci-Link"
        },
        onClick: () => {}
    }
};
Default.args = {
    ...projectArgs
};
ManyMembers.args = {
    ...projectArgs,
    members: [
        {
            name: "Adam Smith",
            img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        },
        {
            name: "Sam Wong",
            img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
        },
        {
            name: "Kevin Powell",
        },
        {
            name: "Laura Tobias",
        },
        {
            name: "Jen Scott",
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80",
        },
        {
            name: "Julie Andrews",
        },
        {
            name: "Sam Smith",
        },
        {
            name: "Kevin Scott",
            img: "https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1923&q=80",
        }
    ]
};
ChangedIcons.args = {
    ...projectArgs,
    icons: {
        open: "ci-Remove_Minus",
        close: "ci-Add_Plus"
    }
};
let noImgNoSym: { img?: ImageProps; } = { ...projectArgs };
delete noImgNoSym.img;

DefaultProjectAvatar.args = {
    ...noImgNoSym
};

let withSymbol: { img?: ImageProps, symbol?: string; } = { ...projectArgs, symbol: "TRF" };
delete withSymbol.img;
CustomProjectSymbol.args = {
    ...withSymbol
};
ManyTags.args = {
    ...projectArgs,
    tags: [
        "Any Label", "Status", "Urgency", "Other", "One more", "Example",
        "Any Label", "Status", "Urgency", "Other", "One more", "Example",
        "Any Label", "Status", "Urgency", "Other", "One more", "Example"
    ]
};
