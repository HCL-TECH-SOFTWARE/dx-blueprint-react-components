import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXVerticalNavigation, { NavigationItem } from './DXVerticalNavigation';

export default {
    title: "Components/Navigation/Vertical Navigation",
    component: DXVerticalNavigation,
    excludeStories: /.*Args$/,
} as Meta<typeof DXVerticalNavigation>;

const Template: StoryFn<typeof DXVerticalNavigation> = ( args ) => <DXVerticalNavigation {...args} />;

export const Default = Template.bind( {} );
export const ThreeLevels = Template.bind( {} );
export const ActiveOpenedProps = Template.bind( {} );
export const ChangedIcons = Template.bind( {} );
export const itemsArgs: NavigationItem[] = [
    {
        url: "/system-scope",
        label: "System Scope",
        items: [
            {
                url: "/commerce-account",
                label: "Commerce account default role"
            },
            {
                url: "/organization",
                label: "Organization Links"
            },
            {
                url: "/organization-type",
                label: "Organization Type"
            },
            {
                url: "/password-policies",
                label: "Password Policies"
            },
            {
                url: "/roles-visibility",
                label: "Roles Visibility"
            },
            {
                url: "/user-images",
                label: "User Images"
            }
        ]
    },
    {
        url: "/virtual-scope",
        label: "Virtual Instance Scope",
        items: [
            {
                url: "/personal-menu",
                label: "Personal Menu",
            },
        ]
    },
    {
        url: "/Widget-scope",
        label: "Widget Scope",
        items: [
            {
                url: "/commerce-address",
                label: "Commerce Address Web",
            },
        ]
    },
];

Default.args = {
    items: itemsArgs
};

let threeLevels = [
    ...itemsArgs,
    {
        url: "/about",
        label: "About the company",
        items: [
            {
                url: "/company-story",
                label: "Company Story"
            },
            {
                url: "/company-levels",
                label: "Company Levels",
                opened: false,
                items: [
                    {
                        url: "/junior-level",
                        label: "Junior Level"
                    },
                    {
                        url: "/mid-level",
                        label: "Mid Level"
                    },
                    {
                        url: "/senior-level",
                        label: "Senior Level"
                    }
                ]
            }
        ]
    }
];
ThreeLevels.args = {
    items: threeLevels
};
let otherProps = [
    {
        url: "/system-scope",
        label: "System Scope",
        active: true,
        opened: true,
        items: [
            {
                url: "/commerce-account",
                label: "Commerce account default role"
            },
            {
                url: "/organization",
                label: "Organization Links"
            },
            {
                url: "/organization-type",
                label: "Organization Type"
            },
            {
                url: "/password-policies",
                label: "Password Policies"
            },
            {
                url: "/roles-visibility",
                label: "Roles Visibility"
            },
            {
                url: "/user-images",
                label: "User Images"
            }
        ]
    }
];

ActiveOpenedProps.args = {
    items: otherProps
};
ChangedIcons.args = {
    items: itemsArgs,
    icons: {
        close: "ci-Chevron_Up",
        open: "ci-Chevron_Down"
    }
};
