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
import DXHeroBannerPerson from "./DXHeroBannerPerson";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Home Page/Hero Banner Person",
    component: DXHeroBannerPerson,
    excludeStories: /.*Args$/,
} as Meta<typeof DXHeroBannerPerson>;

const Template: StoryFn<typeof DXHeroBannerPerson> = ( args ) => <DXHeroBannerPerson {...args} />;

export const HeroBannerPerson = Template.bind( {} );
export const HeroBannerUrl = Template.bind( {} );
export const HBPersonOverflow = Template.bind( {} );
export const HBPerson5s = Template.bind( {} );
export const HBPersonOnlyImage = Template.bind( {} );
export const HBPersonOneImage = Template.bind( {} );
export const HBPersonMoreItems = Template.bind( {} );

export let sSuggestionArgs = {
    searchItems: [
        { label: "Question 1", url: "#one" },
        { label: "Question 2", url: "#two" },
        { label: "Question 3", url: "#three" },
        { label: "Question 4", url: "#four" },
        { label: "Question 5", url: "#five" },
        { label: "Question 6", url: "#six" },
        { label: "Question 7", url: "#seven" },
    ],
    searchFn: function ( filter: string ) {
        console.log( "This is what you searched: ", filter );
    },

};

export const HeroBannerPersonArgs = {
    title: "Welcome",
    subtitle: "How can we help you today?",
    persons: [
        {
            name: "John Doe",
            role: "Frontend Developer",
            location: "HCL Software",
            imageDesktop: "https://images.unsplash.com/photo-1510070009289-b5bc34383727?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
            imageMobile: "https://images.unsplash.com/photo-1555181937-efe4e074a301?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        },
        {
            name: "William Shuts",
            role: "Backend Developer",
            location: "HCL Software",
            imageDesktop: "https://images.unsplash.com/photo-1548031076-e0f45007f853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            imageMobile: "https://images.unsplash.com/photo-1523250217488-ab35967e9840?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        },
        {
            name: "Yuki Morita",
            role: "Business Analyst",
            location: "HCL Software",
            imageDesktop: "https://images.unsplash.com/photo-1541450805268-4822a3a774ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            imageMobile: "https://images.unsplash.com/photo-1676747995218-5c38799cd71b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        },
    ],
    searchSuggestion: sSuggestionArgs
};

HeroBannerPerson.args = HeroBannerPersonArgs;

HeroBannerUrl.args = {
    ...HeroBannerPersonArgs,
    bannerUrl: "https://hcl-software.com",
};

HBPersonOverflow.args = {
    ...HeroBannerPersonArgs,
    persons: [
        {
            name: "John Doe John Doe John Doe John Doe",
            role: "Frontend Developer Frontend Developer Frontend Developer Frontend Developer",
            location: "HCL Software",
            imageDesktop: "https://images.unsplash.com/photo-1510070009289-b5bc34383727?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
            imageMobile: "https://images.unsplash.com/photo-1555181937-efe4e074a301?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        },
        {
            name: "William Shuts",
            role: "Backend Developer",
            location: "HCL Software",
            imageDesktop: "https://images.unsplash.com/photo-1548031076-e0f45007f853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            imageMobile: "https://images.unsplash.com/photo-1523250217488-ab35967e9840?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        },
        {
            name: "Yuki Morita",
            role: "Business Analyst",
            location: "HCL Software",
            imageDesktop: "https://images.unsplash.com/photo-1541450805268-4822a3a774ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            imageMobile: "https://images.unsplash.com/photo-1676747995218-5c38799cd71b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        },
    ]
};

HBPerson5s.args = {
    ...HeroBannerPersonArgs,
    interval: 5
};

HBPersonOnlyImage.args = {
    ...HeroBannerPersonArgs,
    persons: [
        {
            imageDesktop: "https://images.unsplash.com/photo-1510070009289-b5bc34383727?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
            imageMobile: "https://images.unsplash.com/photo-1555181937-efe4e074a301?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        },
        {
            imageDesktop: "https://images.unsplash.com/photo-1548031076-e0f45007f853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            imageMobile: "https://images.unsplash.com/photo-1523250217488-ab35967e9840?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        },
        {
            imageDesktop: "https://images.unsplash.com/photo-1541450805268-4822a3a774ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            imageMobile: "https://images.unsplash.com/photo-1676747995218-5c38799cd71b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        },
    ]
};

HBPersonOneImage.args = {
    ...HeroBannerPersonArgs,
    persons: [
        {
            name: "Yuki Morita",
            role: "Business Analyst",
            location: "HCL Software",
            imageDesktop: "https://images.unsplash.com/photo-1541450805268-4822a3a774ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            imageMobile: "https://images.unsplash.com/photo-1676747995218-5c38799cd71b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        },
    ]
};

HBPersonMoreItems.args = {
    ...HeroBannerPersonArgs,
    searchSuggestion: {
        ...sSuggestionArgs,
        searchItems: [
            { label: "Question 1", url: "#one" },
            { label: "Question 2", url: "#two" },
            { label: "Question 3", url: "#three" },
            { label: "Question 4", url: "#four" },
            { label: "Question 5", url: "#five" },
            { label: "Question 6", url: "#six" },
            { label: "Question 7", url: "#seven" },
            { label: "Question 8", url: "#eight" },
            { label: "Question 9", url: "#nine" },
            { label: "Question 10", url: "#ten" },
        ]
    },
};
