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
import DXSidebarMenu from './DXSidebarMenu';
import { CardButtonProps } from '../DXCardButton/DXCardButton';

export default {
    title: "Components/Navigation/Sidebar Menu",
    component: DXSidebarMenu,
    excludeStories: /.*Args$/,
} as Meta<typeof DXSidebarMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXSidebarMenu> = ( args ) => <DXSidebarMenu {...args} />;

export const SidebarMenu = Template.bind( {} );

let items: CardButtonProps[] = [
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            altText: "image-1"
        },
        header: "Policies & guidelines",
        direction: "right"
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1674471361339-2e1e1dbd3e73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
            altText: "image-1"
        },
        header: "Software licenses",
        direction: "right"
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1674485169641-bcb2bf6f1df9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "image-1"
        },
        header: "Space store",
        direction: "right"
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1674726240969-080afce91514?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
            altText: "image-1"
        },
        header: "Space TV",
        direction: "right"
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1674726253061-baba094ad8c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "image-1"
        },
        header: "Space Training",
        direction: "right"
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1673100749940-d9a899cb3968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
            altText: "image-1"
        },
        header: "Policies & guidelines",
        direction: "right"
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1671790556096-2d5d288c3ae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2231&q=80",
            altText: "image-1"
        },
        header: "The title goes here 7",
        direction: "right"
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1668620268481-6301db1134f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
            altText: "image-1"
        },
        header: "The title goes here 9",
        direction: "right"
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1667144383665-a799f22901e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80",
            altText: "image-1"
        },
        header: "The title goes here 10",
        direction: "right"
    },
];


export const SidebarMenuArgs = {
    title: "Quick Access",
    cardButtons: items,
    card: {
        title: {
            url: "https://www.nbcnews.com/health/coronavirus",
            label: "Return to office: COVID-19 Self Assessment",
        },
        cover: {
            url: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            altText: "card-cover"
        },
        description: "Understand what can be shared with friends, family and media."
    }
};

SidebarMenu.args = SidebarMenuArgs;
