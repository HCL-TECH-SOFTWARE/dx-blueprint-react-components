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
import DXNewsCardCatalog from "./DXNewsCardCatalog";

export default {
    title: "Components/Lists, Catalogs, and Filters/News Card Catalog",
    component: DXNewsCardCatalog,
    excludeStories: /.*Args$/,
} as Meta<typeof DXNewsCardCatalog>;

const Template: StoryFn<typeof DXNewsCardCatalog> = ( args ) => <DXNewsCardCatalog {...args} />;

export const DefaultCatalog = Template.bind( {} );
export const CatalogNoFilters = Template.bind( {} );
export const CatalogCustomLabels = Template.bind( {} );
export const TwoColumns = Template.bind( {} );
export const EmptyTaxonomyStrings = Template.bind( {} );
export const itemsArgs = [
    {
        image: {
            url: "https://images.unsplash.com/photo-1657819466043-2a4ae992f03f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80"
        },
        link: {
            label: "Press release for February 2023",
            url: "www.hcl-software.com"
        },
        date: "01/02/2023",
        contentType: "PRESS RELEASE"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1675543951612-fa7a538bab16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1741&q=80"
        },
        link: {
            label: "Management events for 2023",
            url: "www.hcl-software.com"
        },
        date: "02/14/2023"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1673101609020-4b5e203885bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
        },
        link: {
            label: "Press release for March 2023",
            url: "www.hcl-software.com"
        },
        date: "01/03/2023",
        contentType: "PRESS RELEASE"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1673648955339-843515ab12fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        },
        link: {
            label: "Public revenue report for investors and general public",
            url: "www.hcl-software.com"
        },
        date: "03/21/2023",
        contentType: "PRESS RELEASE"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1673101075633-1732778c8da9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
        },
        link: {
            label: "Help us make an impact in our community",
            url: "www.hcl-software.com"
        },
        date: "04/04/2023",
        contentType: "CHARITY EVENT"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1647088240248-0e3490b180de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
        },
        link: {
            label: "A small help with big impact",
            url: "www.hcl-software.com"
        },
        date: "04/30/2023",
        contentType: "SOCIAL EVENT"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1668620268481-6301db1134f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
        },
        link: {
            label: "The Press Release for the opening of our new office",
            url: "www.hcl-software.com"
        },
        date: "01/02/2024",
        contentType: "PRESS RELEASE"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1660950164971-355b1a5c127c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2564&q=80"
        },
        link: {
            label: "Management Events for 2024",
            url: "www.hcl-software.com"
        },
        date: "02/14/2024"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1629333727718-d72aa3e30477?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
        },
        link: {
            label: "The Press Release for March 2024",
            url: "www.hcl-software.com"
        },
        date: "01/03/2024",
        contentType: "PRESS RELEASE"
    },
];
DefaultCatalog.args = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    paginationProps: {
        sets: ["3", "6", "9"],
        active: 1,
        activeSet: 6,
    },
    filterType: "select"
};
CatalogNoFilters.args = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    paginationProps: {
        sets: ["3", "6", "9"],
        active: 1,
        activeSet: 6,
    },
    filterType: "select",
    hideFilters: true
};
CatalogCustomLabels.args = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    paginationProps: {
        sets: ["3", "6", "9"],
        active: 1,
        activeSet: 6,
    },
    filterType: "select",
    searchLabel: "Find out",
    searchPlaceholder: "Please, type something"
};
TwoColumns.args = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    paginationProps: {
        sets: ["3", "6", "9"],
        active: 1,
        activeSet: 6,
    },
    filterType: "select",
    elementsPerRow: 2
};


EmptyTaxonomyStrings.args = {
    ...DefaultCatalog.args,
    totalItems : itemsArgs.length + 2,
    items: [
        ...itemsArgs,
        {
        ...itemsArgs[0],
        contentType: "", 
        },
        {
        ...itemsArgs[1],
        contentType: "   ", 
        }
    ]
}