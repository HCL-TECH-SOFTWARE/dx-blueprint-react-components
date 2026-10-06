import React from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXMySavedLinks, { MySavedLinksProps } from "./DXMySavedLinks";
export default {
    title: "Components/Navigation/My Saved Links",
    component: DXMySavedLinks,
    excludeStories: /.*Args$/,
} as Meta;

let linkList = [];
for ( let i = 0; i < 6; i++ ) {
    let link = {
        label: "Sample link",
        url: "https://hcl-software.com/",
        target: "_blank",
    };
    linkList.push( link );
}

const Template: StoryFn<MySavedLinksProps> = ( args ) => (
    <DXMySavedLinks {...args} />
);
export const DefaultExample = Template.bind( {} );
export const DefaultExampleArgs = {
    links: linkList
};
DefaultExample.args = DefaultExampleArgs;

export const CustomSavedLinks = Template.bind( {} );
export const CustomSavedLinksArgs: MySavedLinksProps = {
    ...DefaultExampleArgs,
    title: "Custom header",
    link: {
        label: "Custom header link label",
        url: "https://hcl-software.com/",
        target: "_blank",
    },
    links: linkList,
};

CustomSavedLinks.args = CustomSavedLinksArgs;

export const SavedLinksChangedIcon = Template.bind( {} );
export const SavedLinksChangedIconsArgs = {
    ...DefaultExampleArgs,
    title: "Custom header",
    link: {
        label: "Custom header link label",
        url: "https://hcl-software.com/",
        target: "_blank",
    },
    links: linkList,
    icons: {
        link: "ci-Arrow_Right_MD"
    }
};
SavedLinksChangedIcon.args = SavedLinksChangedIconsArgs;

export const EmptyView = Template.bind( {} );
export const EmptyViewArgs: MySavedLinksProps = {
    links: [],
    link: {
        label: "Custom header link label",
        url: "https://hcl-software.com/",
        target: "_blank",
    },
    title: "Custom header",
    empty: {
        title: "This is an empty container",
        text: "No saved items here for now, come back later!",
        image: {
            url: "./docs/how-to/storybook-documents/DXMySavedLinks/Empty-State.png",
            altText: "empty-view"
        }
    },
};

EmptyView.args = EmptyViewArgs;

export const DefaultEmptyView = Template.bind( {} );
export const DefaultEmptyViewArgs: MySavedLinksProps = {
    links: [],
};

DefaultEmptyView.args = DefaultEmptyViewArgs;
