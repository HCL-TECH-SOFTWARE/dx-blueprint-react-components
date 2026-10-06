import React from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXMyLinksCard, { LinksCardProps } from "./DXMyLinksCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Cards/My Links Card",
    component: DXMyLinksCard,
    excludeStories: /.*Args$/,
    // Neutralises @storybook/addon-docs's Docs-tab-only override of
    // `width: auto; display: inline-block; border: 8px solid transparent
    // !important` on the story root (specificity 0-2-0), which would
    // otherwise defeat the `width`/`max-width` declared on .dxMyLinksCard.
    // An inline style on this wrapper wins that cascade regardless, and
    // the forced 8px transparent border lands harmlessly on the wrapper
    // instead of on the card.
    decorators: [
        ( Story: StoryFn ) => <div style={{ width: 316 }}>{Story()}</div>
    ],
} as Meta<typeof DXMyLinksCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<LinksCardProps> = ( args ) => <DXMyLinksCard {...args} />;

export const LinksCardLink = Template.bind( {} );
export const LinksCardLinkWithButton = Template.bind( {} );
export const LinksCardAllButtons = Template.bind( {} );
export const LinksCardChangedIcons = Template.bind( {} );
export const LinksCardTitle = Template.bind( {} );
export const LinksCardTitleKebab = Template.bind( {} );
export const LinksCardTitleSort = Template.bind( {} );
export const LinksCardIconTitleSort = Template.bind( {} );
export const LinksCardComplete = Template.bind( {} );
export const LinksCardCompleteMenuOpened = Template.bind( {} );

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const LinksCardLinkArgs: LinksCardProps = {
    label: {
        label: "Only link card",
        url: "www.google.com"
    },
    icons: {
        card: "ci-External_Link"
    }
};

export const LinksCardLinkWithButtonArgs: LinksCardProps = {
    label: {
        label: "Link Card with Button",
        url: "www.google.com"
    },
    icons: {
        card: "ci-External_Link"
    },
    dropdown: [
        {
            label: "Option 1",
            onClick: () => { console.log( "Clicked option 1" ); }
        },
        {
            label: "Option 2",
            onClick: () => { alert( "Clicked option 2" ); }
        },
        {
            label: "Option 3",
            onClick: () => { window.open( "www.hcl-software,com", "_blank" ); },
            disabled: true
        },
    ]
};

export const LinksCardAllButtonsArgs: LinksCardProps = {
    label: "String label with buttons",
    upButton: {
        label: "up",
        onClick: () => { console.log( "up" ); }
    },
    downButton: {
        label: "down",
        onClick: () => { console.log( "down" ); }
    },
    dropdown: LinksCardLinkWithButtonArgs.dropdown
};

export const LinksCardChangedIconsArgs = {
    ...LinksCardAllButtonsArgs,
    icons: {
        card: "ci-Cloud",
        up: "ci-Arrow_Up_MD",
        down: "ci-Arrow_Down_MD",
        menu: "ci-Hamburger_MD"
    }
};

export const LinksCardTitleArgs: LinksCardProps = {
    label: "Title only"
};

export const LinksCardTitleKebabArgs: LinksCardProps = {
    label: "Title with kebab",
    dropdown: LinksCardLinkWithButtonArgs.dropdown
};

export const LinksCardTitleSortArgs: LinksCardProps = {
    label: "Title with sort",
    upButton: {
        label: "up",
        onClick: () => { console.log( "up" ); }
    },
    downButton: {
        label: "down",
        onClick: () => { console.log( "down" ); }
    }
};

export const LinksCardIconTitleSortArgs: LinksCardProps = {
    label: "Icon, title and sort",
    icons: {
        card: "ci-External_Link"
    },
    upButton: {
        label: "up",
        onClick: () => { console.log( "up" ); }
    },
    downButton: {
        label: "down",
        onClick: () => { console.log( "down" ); }
    }
};

export const LinksCardCompleteArgs: LinksCardProps = {
    label: {
        label: "Links Card Complete",
        url: "www.google.com"
    },
    subLabel: "Supporting description text",
    icons: {
        card: "ci-External_Link"
    },
    upButton: {
        label: "up",
        onClick: () => { console.log( "up" ); }
    },
    downButton: {
        label: "down",
        onClick: () => { console.log( "down" ); }
    },
    dropdown: LinksCardLinkWithButtonArgs.dropdown
};

LinksCardComplete.storyName = "Links Card Complete";
LinksCardCompleteMenuOpened.storyName = "Links Card Complete Menu Opened";
LinksCardCompleteMenuOpened.args = {
    ...LinksCardCompleteArgs,
    dropdownOpen: true,
};

LinksCardTitle.storyName = "Links Card Title";
LinksCardTitleKebab.storyName = "Links Card Title + Kebab";
LinksCardTitleSort.storyName = "Links Card Title + Sort";
LinksCardIconTitleSort.storyName = "Links Card Icon + Title + Sort";

LinksCardLink.args = LinksCardLinkArgs;
LinksCardLinkWithButton.args = LinksCardLinkWithButtonArgs;
LinksCardAllButtons.args = LinksCardAllButtonsArgs;
LinksCardChangedIcons.args = LinksCardChangedIconsArgs;
LinksCardTitle.args = LinksCardTitleArgs;
LinksCardTitleKebab.args = LinksCardTitleKebabArgs;
LinksCardTitleSort.args = LinksCardTitleSortArgs;
LinksCardIconTitleSort.args = LinksCardIconTitleSortArgs;
LinksCardComplete.args = LinksCardCompleteArgs;
