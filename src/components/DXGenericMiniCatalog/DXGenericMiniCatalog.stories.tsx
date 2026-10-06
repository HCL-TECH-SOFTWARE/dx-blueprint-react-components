import React from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXGenericMiniCatalog, { GenericMiniCatalogProps } from "./DXGenericMiniCatalog";
import { appCards, basicCards, cardButtons, eventCards, eventItemCard, fullImageCards, newsCards, profileCards } from "../DXGenericCatalog/utilities/CatalogItems";
import { EmptyStateProps } from "../DXEmptyState/DXEmptyState";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Lists, Catalogs, and Filters/Generic Mini Catalog",
    component: DXGenericMiniCatalog,
    excludeStories: /.*Args$/,
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<GenericMiniCatalogProps> = ( args ) => <DXGenericMiniCatalog {...args} />;

//All Cards Compatible Stories
export const AppCardMiniCatalog = Template.bind( {} );
export const BasicCardMiniCatalog = Template.bind( {} );
export const CardButtonMiniCatalog = Template.bind( {} );
export const EventCardMiniCatalog = Template.bind( {} );
export const EventItemMiniCatalog = Template.bind( {} );
export const FullImageCardMiniCatalog = Template.bind( {} );
export const NewsCardMiniCatalog = Template.bind( {} );
export const ProfileCardMiniCatalog = Template.bind( {} );
export const EmptyMiniCatalog = Template.bind( {} );

const headerProps = {
    title: "Mini Catalog Title",
    button: {
        label: "View more",
        onClick: () => { console.log( "Clicked!" ); }
    }
};

const emptyProps: EmptyStateProps = {
    title: "No items to display in the catalog",
    text: "Modify the filters to retrieve some content",
    image: {
        url: "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        altText: "No items to list"
    }
};

AppCardMiniCatalog.args = {
    header: headerProps,
    body: {
        items: appCards,
        componentType: "DXAppCard",
        elementsPerRow: 4,
        variant: "grid"
    },
};

BasicCardMiniCatalog.args = {
    header: headerProps,
    body: {
        items: basicCards,
        componentType: "DXCard",
        elementsPerRow: 4,
        variant: "slider"
    },
};

CardButtonMiniCatalog.args = {
    header: headerProps,
    body: {
        items: cardButtons,
        componentType: "DXCardButton",
        elementsPerRow: 4,
        variant: "slider"
    }
};

EventCardMiniCatalog.args = {
    header: headerProps,
    body: {
        items: eventCards,
        componentType: "DXEvent",
        elementsPerRow: 4,
        variant: "grid"
    }
};

EventItemMiniCatalog.args = {
    header: headerProps,
    body: {
        items: eventItemCard,
        componentType: "DXEventItem",
        elementsPerRow: 3,
        variant: "grid"
    }
};

FullImageCardMiniCatalog.args = {
    header: headerProps,
    body: {
        items: fullImageCards,
        componentType: "DXFullImageCard",
        elementsPerRow: 4,
        variant: "slider"
    }
};

NewsCardMiniCatalog.args = {
    header: headerProps,
    body: {
        items: newsCards,
        componentType: "DXNewsCard",
        elementsPerRow: 1,
        variant: "grid"
    }
};

ProfileCardMiniCatalog.args = {
    header: headerProps,
    body: {
        items: profileCards,
        componentType: "DXProfileCard",
        elementsPerRow: 4,
        variant: "slider"
    }
};

EmptyMiniCatalog.args = {
    header: headerProps,
    body: {
        items: [],
        componentType: "DXCard",
        empty: emptyProps
    }
};
