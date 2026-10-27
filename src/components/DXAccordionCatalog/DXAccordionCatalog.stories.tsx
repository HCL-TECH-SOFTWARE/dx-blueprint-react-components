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
import DXAccordionCatalog, { AccordionCatalogProps } from './DXAccordionCatalog';

export default {
    title: "Components/Lists, Catalogs, and Filters/Accordion Catalog",
    component: DXAccordionCatalog,
    excludeStories: /.*Args$/,
} as Meta<typeof DXAccordionCatalog>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXAccordionCatalog> = ( args ) => <DXAccordionCatalog {...args} />;

export const AccordionCatalog = Template.bind( {} );
export const AccordionCatalogNoFilters = Template.bind( {} );
export const AccordionCatalogDifLabels = Template.bind( {} );
export const AccordionCatalogEmptyTaxonomyString = Template.bind( {} );

export const itemsArgs = [
    {
        data: { keyword: "Label 1", subject: "Site use" },
        accordion: {
            label: "Label 1",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
        },
    },
    {
        data: { keyword: "Label 2", subject: "Operations" },
        accordion: {
            label: "Label 2",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
        },
    },
    {
        data: { keyword: "Label 3", subject: "Hardware" },
        accordion: {
            label: "Label 3",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
        },
    },
    {
        data: { keyword: "Label 4", subject: "Site use" },
        accordion: {
            label: "Label 4",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
        },
    },
    {
        data: { keyword: "Label 5", subject: "Operations" },
        accordion: {
            label: "Label 5",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
        },
    },
    {
        data: { keyword: "Label 6", subject: "Operations" },
        accordion: {
            label: "Label 6",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
        },
    },
    {
        data: { keyword: "Label 7", subject: "Hardware" },
        accordion: {
            label: "Label 7",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
        },
    },
    {
        data: { keyword: "Label 8", subject: "Hardware" },
        accordion: {
            label: "Label 8",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
        },
    },
    {
        data: { keyword: "Label 9", subject: "Operations" },
        accordion: {
            label: "Label 9",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
        },
    },
    {
        data: { keyword: "Label 10", subject: "Site use" },
        accordion: {
            label: "Label 10",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
        },
    },
    {
        data: { keyword: "Label 11", subject: "Hardware" },
        accordion: {
            label: "Label 11",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
        },
    },
    {
        data: { keyword: "Label 12", subject: "Site use" },
        accordion: {
            label: "Label 12",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
        },
    },
    {
        data: { keyword: "Label 13", subject: "Operations" },
        accordion: {
            label: "Label 13",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
        },
    },
    {
        data: { keyword: "Label 14", subject: "Hardware" },
        accordion: {
            label: "Label 14",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
        },
    },
    {
        data: { keyword: "Label 15", subject: "Site use" },
        accordion: {
            label: "Label 15",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
        },
    },
    {
        data: { keyword: "Label 16", subject: "Operations" },
        accordion: {
            label: "Label 16",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
        },
    },
];

export const AccordionCatalogArgs: AccordionCatalogProps = {
    items: itemsArgs,
    paginationProps: {
        sets: ["8", "10", "16"],
        active: 1,
        activeSet: 16
    },
    totalItems: itemsArgs.length,
    categories: ["subject"],
    filterType: "select"
};

AccordionCatalog.args = AccordionCatalogArgs;

AccordionCatalogNoFilters.args = {
    items: itemsArgs,
    paginationProps: {
        sets: ["8", "10", "16"],
        active: 1,
        activeSet: 16
    },
    totalItems: itemsArgs.length,
    categories: ["subject"],
    filterType: "select",
    hideFilters: true,
    activeIndex: -1
};
AccordionCatalogDifLabels.args = {
    items: itemsArgs,
    paginationProps: {
        sets: ["8", "10", "16"],
        active: 1,
        activeSet: 16
    },
    totalItems: itemsArgs.length,
    categories: ["subject"],
    filterType: "select",
    searchLabel: "Find out",
    searchPlaceholder: "Please, type something"
};

AccordionCatalogEmptyTaxonomyString.args = {
    ...AccordionCatalogArgs,
    totalItems: 4,
    items: [
        {
          data: { keyword: "Test 1", subject: "" },
          accordion: {
            label: "Label 1",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
          }
        },
        {
          data: { keyword: "Test 2", subject: "  " },
          accordion: {
            label: "Label 2",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
          }
        },
        {
          data: { keyword: "Test 3", subject: "Site Use" },
          accordion: {
            label: "Label 3",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
          }
        },
        {
            data: { keyword: "Test 4", subject: "Hardware     " },
            accordion: {
              label: "Label 4",
              body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
            }
        }

      ],
}