import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXFullImageCatalog, { FullImageCatalogItem } from "./DXFullImageCatalog";

export default {
    title: "Components/Lists, Catalogs, and Filters/Full Image Catalog",
    component: DXFullImageCatalog,
    excludeStories: /.*Args$/,
} as Meta<typeof DXFullImageCatalog>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXFullImageCatalog> = ( args ) => <DXFullImageCatalog {...args} />;

export const DefaultCatalog = Template.bind( {} );
export const CatalogDiffLabels = Template.bind( {} );
export const CatalogNoFilters = Template.bind( {} );
export const Catalog3Elements = Template.bind( {} );
export const EmptyTaxonomyStrings = Template.bind( {} );
export const itemsArgs: FullImageCatalogItem[] = [
    {
        data: { subject: "Grammar" },
        card: {
            image: {
                url: "https://images.unsplash.com/photo-1565716665452-2a4e3445b378?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
                altText: "Paradaise"
            },
            subtitle: "2023/06/13",
            description: "Vocabulary Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
            link: "https://hcl-software.com/",
            dateFormat: "YY/MM/DD"
        }
    },
    {
        data: { subject: "Grammar" },
        card: {
            image: {
                url: "https://images.unsplash.com/photo-1679487659816-105ae20d4ed5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                altText: "Paradaise"
            },
            subtitle: "2023/06/13",
            description: "News Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
            link: "https://hcl-software.com/",
            dateFormat: "YY/MM/DD"
        }
    },
    {
        data: { subject: "Math" },
        card: {
            image: {
                url: "https://images.unsplash.com/photo-1679503624359-8a1841111961?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
                altText: "Paradaise"
            },
            subtitle: "2023/06/13",
            description: "Square Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
            link: "https://hcl-software.com/",
            dateFormat: "YY/MM/DD"
        }
    },
    {
        data: { subject: "Grammar" },
        card: {
            image: {
                url: "https://images.unsplash.com/photo-1680484006397-64f3fcd8fc14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
                altText: "Paradaise"
            },
            subtitle: "2023/06/13",
            description: "Dictionary Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
            link: "https://hcl-software.com/",
            dateFormat: "YY/MM/DD"
        }
    },
    {
        data: { subject: "Science" },
        card: {
            image: {
                url: "https://images.unsplash.com/photo-1564671546498-09a366692274?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
                altText: "Paradaise"
            },
            subtitle: "2023/06/13",
            description: "Human body Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
            link: "https://hcl-software.com/",
            dateFormat: "YY/MM/DD"
        }
    },
    {
        data: { subject: "Math" },
        card: {
            image: {
                url: "https://images.unsplash.com/photo-1534445867742-43195f401b6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
                altText: "Paradaise"
            },
            subtitle: "2023/06/13",
            description: "Circle Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
            link: "https://hcl-software.com/",
            dateFormat: "YY/MM/DD"
        }
    },
    {
        data: { subject: "Math" },
        card: {
            image: {
                url: "https://images.unsplash.com/photo-1579106131295-dfab63d39847?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
                altText: "Paradaise"
            },
            subtitle: "2023/06/13",
            description: "Triangle Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
            link: "https://hcl-software.com/",
            dateFormat: "YY/MM/DD"
        }
    },
    {
        data: { subject: "Science" },
        card: {
            image: {
                url: "https://images.unsplash.com/photo-1680631757284-617846a5ef29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1002&q=80",
                altText: "Paradaise"
            },
            subtitle: "2023/06/13",
            description: "Materia Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
            link: "https://hcl-software.com/",
            dateFormat: "YY/MM/DD"
        }
    },
    {
        data: { subject: "Grammar" },
        card: {
            image: {
                url: "https://images.unsplash.com/photo-1680267954710-5d1e0c53d5fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
                altText: "Paradaise"
            },
            subtitle: "2023/06/13",
            description: "Dot Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
            link: "https://hcl-software.com/",
            dateFormat: "YY/MM/DD"
        }
    },
    {
        data: { subject: "Grammar" },
        card: {
            image: {
                url: "https://images.unsplash.com/photo-1680095297939-9435dae8bb47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
                altText: "Paradaise"
            },
            subtitle: "2023/06/13",
            description: "Questions Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
            link: "https://hcl-software.com/",
            dateFormat: "YY/MM/DD"
        }
    },
    {
        data: { subject: "Math" },
        card: {
            image: {
                url: "https://images.unsplash.com/photo-1679849043239-5ecb74918e67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
                altText: "Paradaise"
            },
            subtitle: "2023/06/13",
            description: "Calculus Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
            link: "https://hcl-software.com/",
            dateFormat: "YY/MM/DD"
        }
    },
    {
        data: { subject: "Grammar" },
        card: {
            image: {
                url: "https://images.unsplash.com/photo-1679946027434-c207e6130a66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1008&q=80",
                altText: "Paradaise"
            },
            subtitle: "2023/06/13",
            description: "Literature Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
            link: "https://hcl-software.com/",
            dateFormat: "YY/MM/DD"
        }
    },
];
DefaultCatalog.args = {
    items: itemsArgs,
    paginationProps: {
        sets: ["4", "8", "12"],
        active: 1,
        activeSet: 4
    },
    totalItems: itemsArgs.length,
    categories: ["subject"],
    filterType: "select"
};
CatalogDiffLabels.args = {
    items: itemsArgs,
    paginationProps: {
        sets: ["4", "8", "12"],
        active: 1,
        activeSet: 4
    },
    totalItems: itemsArgs.length,
    categories: ["subject"],
    filterType: "select",
    searchLabel: "Find out",
    searchPlaceholder: "Please, type something"
};
CatalogNoFilters.args = {
    items: itemsArgs,
    paginationProps: {
        sets: ["4", "8", "12"],
        active: 1,
        activeSet: 4
    },
    totalItems: itemsArgs.length,
    categories: ["subject"],
    filterType: "select",
    hideFilters: true,
};
Catalog3Elements.args = {
    items: itemsArgs,
    paginationProps: {
        sets: ["3", "6", "9"],
        active: 1,
        activeSet: 3
    },
    totalItems: itemsArgs.length,
    categories: ["subject"],
    filterType: "select",
    elementsPerRow: 3
};

  
EmptyTaxonomyStrings.args = {
    ...DefaultCatalog.args,
    items: [
        ...itemsArgs,
        {
          ...itemsArgs[0],
          data: { subject: '' },
        },
        {
          ...itemsArgs[1],
          data: { subject: '  ' },
        },
      ],
    totalItems : itemsArgs.length + 2
  };