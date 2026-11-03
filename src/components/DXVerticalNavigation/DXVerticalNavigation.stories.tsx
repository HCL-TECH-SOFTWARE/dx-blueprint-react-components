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
