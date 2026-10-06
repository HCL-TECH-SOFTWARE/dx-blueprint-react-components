import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXMiniCatalog, { MiniCatalogProps } from "./DXMiniCatalog";

export default {
    title: "Components/Lists, Catalogs, and Filters/Mini Catalog",
    component: DXMiniCatalog,
    excludeStories: /.*Args$/,
} as Meta<typeof DXMiniCatalog>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXMiniCatalog> = ( args ) => <DXMiniCatalog {...args} />;

export const MiniCatalog = Template.bind( {} );
export const MiniCatalogChangedIcons = Template.bind( {} );
export const MiniCatalogBusinessServices = Template.bind( {} );
export const MiniCatalogGrid = Template.bind( {} );
export const MiniCatalogNoItems = Template.bind( {} );
export const itemsArgs = [
    {
        title: {
            url: "/l-1",
            label: "Real Madrid bought a new superstar",
        },
        description: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        cover: {
            url: "https://images.unsplash.com/photo-1678889284805-5c86fb1dba5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
            altText: "card-cover"
        },
    },
    {
        title: {
            url: "/l-2",
            label: "Guess who is the new Lover of Catherina"
        },
        description: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
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
        description: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor nequ",
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
        topCheckbox: function ( e: any ) { console.log( e ); },
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
        cover: {
            url: "https://images.unsplash.com/photo-1673261544592-ab37b264af40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "card-cover"
        },
    }
];
const miniCatalogProps: MiniCatalogProps = {
    index: 1,
    items: itemsArgs
};

export const MCChangedIconsArgs: MiniCatalogProps = {
    ...miniCatalogProps,
    icons: {
        prev: "ci-Arrow_Left_MD",
        next: "ci-Arrow_Right_MD"
    }
};
MiniCatalogChangedIcons.args = MCChangedIconsArgs;

MiniCatalog.args = miniCatalogProps;

MiniCatalogBusinessServices.args = {
    index: 2,
    items: [
        {
            title: {
                url: "#amazing",
                label: "Card Title",
            },
            cover: {
                url: "https://images.unsplash.com/photo-1678889284805-5c86fb1dba5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
                altText: "card-cover"
            },
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, neque! Illum ipsum necessitatibus, repellat magni voluptas aspernatur veniam repudiandae. Magnam, quo placeat. Rem animi optio earum debitis, quibusdam perspiciatis veniam!",
        },
        {
            title: {
                url: "#amazing",
                label: "Card Title",
            },
            cover: {
                url: "https://images.unsplash.com/photo-1678625994210-4c02332ec4a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
                altText: "card-cover"
            },
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, neque! Illum ipsum necessitatibus, repellat magni voluptas aspernatur veniam repudiandae. Magnam, quo placeat. Rem animi optio earum debitis, quibusdam perspiciatis veniam!",
        },
        {
            title: {
                url: "#amazing",
                label: "Card Title",
            },
            cover: {
                url: "https://images.unsplash.com/photo-1678963477436-bc9a2559fa05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
                altText: "card-cover"
            },
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, neque! Illum ipsum necessitatibus, repellat magni voluptas aspernatur veniam repudiandae. Magnam, quo placeat. Rem animi optio earum debitis, quibusdam perspiciatis veniam!",
        }
    ],
};
MiniCatalogGrid.args = {
    index: 3,
    items: itemsArgs.slice( 0, 3 ),
};
MiniCatalogNoItems.args = {
    index: 4,
    items: [],
};
