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
import DXMenuOrganizer, { MenuOrganizerProps } from "./DXMenuOrganizer";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Navigation/Menu Organizer",
    component: DXMenuOrganizer,
    excludeStories: /.*Args$/,
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<MenuOrganizerProps> = ( args ) => <DXMenuOrganizer {...args} />;

export const MenuOrganizer = Template.bind( {} );
export const EmptyItems = Template.bind( {} );
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const simpleArgs: MenuOrganizerProps = {
    items: [
        {
            label: "Item One 1",
            data: "string",
            data2: "data2"
        },
        {
            label: "Item Two 2"
        },
        {
            label: "Item Three 3"
        },
        {
            label: "Item Four 4"
        },
        {
            label: "Item Five 5 with long title, one line max leght, then ellipsis"
        }
    ],
    onChange: ( currentArray ) => { console.log( currentArray ); }
};

export const emptyItemsArgs: MenuOrganizerProps = {
    items: [],
    onChange: ( currentArray ) => { console.log( currentArray ); },
    empty: {
        title: "This is an empty container",
        text: "No saved items here for now, come back later!",
        image: {
            url: "https://images.unsplash.com/photo-1622428051717-dcd8412959de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
            altText: "empty-view"
        }
    },
};

MenuOrganizer.args = simpleArgs;
EmptyItems.args = emptyItemsArgs;
