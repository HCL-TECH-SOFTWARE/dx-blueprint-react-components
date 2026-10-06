import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXFullImageMiniCatalog from "./DXFullImageMiniCatalog";
import { FullImageCardProps } from "../DXFullImageCard/DXFullImageCard";

export default {
    title: "Components/Lists, Catalogs, and Filters/Full Image Mini Catalog",
    component: DXFullImageMiniCatalog,
    excludeStories: /.*Args$/,
} as Meta<typeof DXFullImageMiniCatalog>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXFullImageMiniCatalog> = ( args ) => <DXFullImageMiniCatalog {...args} />;

export const MiniCatalog = Template.bind( {} );
export const MiniCatalogChangedIcons = Template.bind( {} );
export const MiniCatalogNoItems = Template.bind( {} );
export const MiniCatalogGrid4 = Template.bind( {} );
export const MiniCatalogGrid3 = Template.bind( {} );
export const MiniCatalogGrid2 = Template.bind( {} );
export const MiniCatalogGrid1 = Template.bind( {} );

export const itemsArgs: FullImageCardProps[] = [
    {
        image: {
            url: "https://images.unsplash.com/photo-1565716665452-2a4e3445b378?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1679487659816-105ae20d4ed5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD"
    }, {
        image: {
            url: "https://images.unsplash.com/photo-1679503624359-8a1841111961?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD"
    }, {
        image: {
            url: "https://images.unsplash.com/photo-1680484006397-64f3fcd8fc14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD"
    },
];
export const sliderItemsArgs: FullImageCardProps[] = [
    {
        image: {
            url: "https://images.unsplash.com/photo-1565716665452-2a4e3445b378?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1679487659816-105ae20d4ed5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD"
    }, {
        image: {
            url: "https://images.unsplash.com/photo-1679503624359-8a1841111961?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD"
    }, {
        image: {
            url: "https://images.unsplash.com/photo-1680484006397-64f3fcd8fc14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1564671546498-09a366692274?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD"
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1534445867742-43195f401b6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD"
    }, {
        image: {
            url: "https://images.unsplash.com/photo-1579106131295-dfab63d39847?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD"
    }, {
        image: {
            url: "https://images.unsplash.com/photo-1680631757284-617846a5ef29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1002&q=80",
            altText: "Paradaise"
        },
        subtitle: "2023/06/13",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
        link: "https://hcl-software.com/",
        dateFormat: "YY/MM/DD"
    },
];

MiniCatalogGrid4.args = {
    index: 1,
    items: itemsArgs,
};
MiniCatalogGrid3.args = {
    index: 2,
    items: itemsArgs.slice( 0, 3 )
};
MiniCatalogGrid2.args = {
    index: 3,
    items: itemsArgs.slice( 0, 2 )
};
MiniCatalogGrid1.args = {
    index: 4,
    items: itemsArgs.slice( 0, 1 )
};
MiniCatalog.args = {
    index: 5,
    items: sliderItemsArgs
};
MiniCatalogNoItems.args = {
    index: 6,
    items: []
};

MiniCatalogChangedIcons.args = {
    index: 7,
    items: sliderItemsArgs,
    icons: {
        prev: "ci-Arrow_Left_MD",
        next: "ci-Arrow_Right_MD"
    }
};
