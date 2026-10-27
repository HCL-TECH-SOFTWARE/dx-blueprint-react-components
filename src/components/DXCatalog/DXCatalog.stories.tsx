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
import DXCatalog, { CatalogProps } from './DXCatalog';
import { CardProps } from '../DXCard/DXCard';

export default {
    title: "Components/Lists, Catalogs, and Filters/Catalog",
    component: DXCatalog,
    excludeStories: /.*Args$/,
} as Meta<typeof DXCatalog>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXCatalog> = ( args ) => <DXCatalog  {...args} />;

export const CatalogSelect = Template.bind( {} );
export const CatalogCheckbox = Template.bind( {} );
export const CatalogSwitch = Template.bind( {} );
export const CatalogNoFilters = Template.bind( {} );
export const CatalogDifLabels = Template.bind( {} );
export const Catalog2Elements = Template.bind( {} );
export const CatalogEmptyTaxonomyString = Template.bind( {} );

// export const MasonryExample = Template.bind( {} );

export const itemsArgs: CardProps[] = [
    {
        title: {
            url: "/l-1",
            label: "Real Madrid bought a new superstar",
        },
        description: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        _taxonomies: {
            "subject": "Sports",
            "country": "Mexico",
            "scope": "national"
        },
        cover: {
            url: "https://images.unsplash.com/photo-1678889284805-5c86fb1dba5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
            altText: "card-cover"
        }
    },
    {
        title: {
            url: "/l-2",
            label: "Guess who is the new Lover of Catherina"
        },
        description: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
        _taxonomies: {
            "subject": "Gossip",
            "country": "Mexico",
            "scope": "national"
        },
        cover: {
            url: "https://images.unsplash.com/photo-1678625994210-4c02332ec4a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "card-cover"
        },
    },
    {
        title: {
            url: "/l-3",
            label: "Stay Down, a really scary movie"
        },
        description: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
        _taxonomies: {
            "subject": "Cinema",
            "country": "Colombia",
            "scope": "international"
        },
        cover: {
            url: "https://images.unsplash.com/photo-1678963477436-bc9a2559fa05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "card-cover"
        },
    },
    {
        title: {
            url: "/l-4",
            label: "A new stadium is builing downtown Bogota"
        },
        description: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
        _taxonomies: {
            "subject": "Sports",
            "country": "Colombia",
            "scope": "national"
        },
        cover: {
            url: "https://images.unsplash.com/photo-1678773879525-f6a0d2470b46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
            altText: "card-cover"
        },
    },
    {
        title: {
            url: "/l-5",
            label: "Aware COVID in the whole Academia crew"
        },
        description: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
        _taxonomies: {
            "subject": "Gossip",
            "country": "Mexico",
            "scope": "local"
        },
        cover: {
            url: "https://images.unsplash.com/photo-1603448815301-c2ddb09fc71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
            altText: "card-cover"
        },
    },
    {
        title: {
            url: "/l-6",
            label: "Texas Masacre reboot is making the critics talk"
        },
        description: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
        _taxonomies: {
            "subject": "Cinema",
            "country": "United States",
            "scope": "local"
        },
        cover: {
            url: "https://images.unsplash.com/photo-1679209815180-f36856a4ff77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "card-cover"
        },
    },
    {
        title: {
            url: "/l-7",
            label: "Galaxy Team reclutes Chicharito"
        },
        description: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
        _taxonomies: {
            "subject": "Sports",
            "country": "United States",
            "scope": "International"
        },
        cover: {
            url: "https://images.unsplash.com/photo-1659359156896-e0a2dc97c89d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "card-cover"
        },
    },
    {
        title: {
            url: "l-8",
            label: "A new secret is behind the famous actress"
        },
        description: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
        _taxonomies: {
            "subject": "Gossip",
            "country": "Colombia",
            "scope": "local"
        },
        checkbox: () => { console.log( "Selected checkbox" ); },
        label: "Gossip",
        cover: {
            url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
            altText: "card-cover"
        },
    },
    {
        title: {
            url: "/l-9",
            label: "Amanecer en el Valle, very very romantic movie"
        },
        description: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
        _taxonomies: {
            "subject": "Cinema",
            "country": "Mexico",
            "scope": "national"
        },
        cover: {
            url: "https://images.unsplash.com/photo-1678509651605-f2c0fa01c49a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
            altText: "card-cover"
        },
    },
    {
        title: {
            url: "/l-10",
            label: "Gossip around downtown, guess for what"
        },
        description: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
        _taxonomies: {
            "subject": "Cinema",
            "country": "Colombia",
            "scope": "local"
        },
        cover: {
            url: "https://images.unsplash.com/photo-1673261544592-ab37b264af40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "card-cover"
        },
    }
];

const paginationProps = {
    sets: ["2", "5", "10"],
    active: 1,
    activeSet: 10,
};
const catalogProps: CatalogProps = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    paginationProps,
    categories: ["subject", "country", "scope"],
    filterType: "select"
};
CatalogSelect.args = catalogProps;
CatalogCheckbox.args = { ...catalogProps, filterType: "checkbox" };
CatalogSwitch.args = { ...catalogProps, filterType: "switch" };
CatalogNoFilters.args = {
    ...catalogProps,
    hideFilters: true
};
CatalogDifLabels.args = {
    ...catalogProps,
    searchLabel: "Find out",
    searchPlaceholder: "Please, type something"
};
Catalog2Elements.args = {
    ...catalogProps,
    elementsPerRow: 2
};

CatalogEmptyTaxonomyString.args = {
    ...catalogProps,
    items: [
        {
          ...itemsArgs[0],
          _taxonomies: {
            subject: ["Sports", "", "  ", "Cinema"],
            country: "Mexico",
            scope: "national",
          },
        },
        {
          ...itemsArgs[1],
          _taxonomies: {
            subject: ["Gossip", " "],
            country: "",
            scope: "local",
          },
        },
        {
          ...itemsArgs[2],
          _taxonomies: {
            subject: "Sports",
            country: "United States",
            scope: "international",
          },
        },
      ],
      totalItems: 3,

};

// let masonryItems = itemsArgs;
// MasonryExample.args = {
//     items: masonryItems,
//     totalItems: masonryItems.length, paginationProps,
//     categories: ["subject", "country", "scope"],
//     filterType: "select",
//     masonryLayout: true,
//     maxCardHeight: "500px"
// };
