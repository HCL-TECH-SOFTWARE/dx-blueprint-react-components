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
import DXSearchResultsCatalog from './DXSearchResultsCatalog';

export default {
    title: "Components/Lists, Catalogs, and Filters/Search Results Catalog",
    component: DXSearchResultsCatalog,
    excludeStories: /.*Args$/,
} as Meta<typeof DXSearchResultsCatalog>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXSearchResultsCatalog> = ( args ) => <DXSearchResultsCatalog {...args} />;

export const DefaultCatalog = Template.bind( {} );
export const NoPaginationCatalog = Template.bind( {} );
export const OneElementPerRowCatalog = Template.bind( {} );

const paginationProps = {
    sets: ["2", "4", "6"],
    active: 1,
    activeSet: 4,
};
export const itemsArgs = [
    {
        breadcrumb: `<a href="/one">Main Folder</a> > <a href="/two">Parent Content</a> > <a href="/three">Final Folder</a>`,
        title: {
            label: "Content title",
            url: "/main-link"
        },
        subtitle: "Content description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        title: {
            label: "Content title with no Breadcrumb",
            url: "/main-link"
        },
        subtitle: "Content description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        breadcrumb: `<a href="/one">Main Folder</a> > <a href="/two">Parent Content</a> > <a href="/three">Final Folder</a>`,
        title: {
            label: "Content title",
            url: "/main-link"
        },
        subtitle: "Content description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        title: {
            label: "Content title with no Breadcrumb",
            url: "/main-link"
        },
        subtitle: "Content description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        breadcrumb: `<a href="/one">Main Folder</a> > <a href="/two">Parent Content</a> > <a href="/three">Final Folder</a>`,
        title: {
            label: "Content title",
            url: "/main-link"
        },
        subtitle: "Content description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        title: {
            label: "Content title with no Breadcrumb",
            url: "/main-link"
        },
        subtitle: "Content description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        breadcrumb: `<a href="/one">Main Folder</a> > <a href="/two">Parent Content</a> > <a href="/three">Final Folder</a>`,
        title: {
            label: "Content title",
            url: "/main-link"
        },
        subtitle: "Content description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        title: {
            label: "Content title with no Breadcrumb",
            url: "/main-link"
        },
        subtitle: "Content description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        breadcrumb: `<a href="/one">Main Folder</a> > <a href="/two">Parent Content</a> > <a href="/three">Final Folder</a>`,
        title: {
            label: "Content title",
            url: "/main-link"
        },
        subtitle: "Content description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        title: {
            label: "Content title with no Breadcrumb",
            url: "/main-link"
        },
        subtitle: "Content description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        breadcrumb: `<a href="/one">Main Folder</a> > <a href="/two">Parent Content</a> > <a href="/three">Final Folder</a>`,
        title: {
            label: "Content title",
            url: "/main-link"
        },
        subtitle: "Content description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
        title: {
            label: "Content title with no Breadcrumb",
            url: "/main-link"
        },
        subtitle: "Content description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
];

DefaultCatalog.args = {
    items: itemsArgs,
    paginationProps
};
NoPaginationCatalog.args = {
    items: itemsArgs
};
OneElementPerRowCatalog.args = {
    items: itemsArgs,
    elementsPerRow: 1
};
