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
import DXDirectory, { DirectoryItem } from "./DXDirectory";

export default {
    title: "Components/Lists, Catalogs, and Filters/Directory",
    component: DXDirectory,
    excludeStories: /.*Args$/,
} as Meta<typeof DXDirectory>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXDirectory> = ( args ) => <DXDirectory {...args} />;

export const Default = Template.bind( {} );
export const ExtraFilter = Template.bind( {} );
export const HideFilters = Template.bind( {} );
export const EmptyTaxonomyStrings = Template.bind( {} );

export const itemsArgs: DirectoryItem[] = [
    {
        data: { keyword: "coffee", department: "HR Department", },
        card: {
            index: 1,
            title: "Janet Kavandi",
            subtitle: {
                label: "HR Department",
                url: "https://hcl-software.com",
            },
            email: {
                label: "jannet.kavandi@hcl-software.com",
                url: "mailto:jannet.kavandi@hcl-software.com",
                icon: "ci-Mail"
            },
            phone: {
                label: "773-936-3804",
                url: "tel:+7739363804",
                icon: "ci-Phone"
            },
            primaryButtons: [
                {
                    label: "View Profile",
                    onClick: () => {}
                },
            ],
            secondaryButtons: [
                {
                    label: "View in chart",
                    onClick: () => {}
                },
            ]
        }
    },
    {
        data: { keyword: "pizza", department: "Finance Department", },
        card: {
            index: 2,
            title: "Joe Foo",
            subtitle: {
                label: "Finance Department",
                url: "https://hcl-software.com",
            },
            email: {
                label: "joe.foo@hcl-software.com",
                url: "mailto:joe.foo@hcl-software.com",
                icon: "ci-Mail"
            },
            phone: {
                label: "773-936-3804",
                url: "tel:+7739363804",
                icon: "ci-Phone"
            },
            primaryButtons: [
                {
                    label: "View Profile",
                    onClick: () => {}
                },
            ],
            secondaryButtons: [
                {
                    label: "View in chart",
                    onClick: () => {}
                },
            ]
        }
    },
    {
        data: { keyword: "cake", department: "Dev Department", },
        card: {
            index: 3,
            title: "Lucas Jones",
            subtitle: {
                label: "Dev Department",
                url: "https://hcl-software.com",
            },
            email: {
                label: "lucas.jones@hcl-software.com",
                url: "mailto:lucas.jones@hcl-software.com",
                icon: "ci-Mail"
            },
            phone: {
                label: "773-936-3804",
                url: "tel:+7739363804",
                icon: "ci-Phone"
            },
            primaryButtons: [
                {
                    label: "View Profile",
                    onClick: () => {}
                },
            ],
            secondaryButtons: [
                {
                    label: "View in chart",
                    onClick: () => {}
                },
            ]
        }
    },
    {
        data: { keyword: "coffee", department: "HR Department", },
        card: {
            index: 4,
            title: "Freddy Boo",
            subtitle: {
                label: "HR Department",
                url: "https://hcl-software.com",
            },
            email: {
                label: "freddy.boo@hcl-software.com",
                url: "mailto:freddy.boo@hcl-software.com",
                icon: "ci-Mail"
            },
            phone: {
                label: "773-936-3804",
                url: "tel:+7739363804",
                icon: "ci-Phone"
            },
            primaryButtons: [
                {
                    label: "View Profile",
                    onClick: () => {}
                },
            ],
            secondaryButtons: [
                {
                    label: "View in chart",
                    onClick: () => {}
                },
            ]
        }
    },
    {
        data: { keyword: "pizza", department: "Finance Department", },
        card: {
            index: 5,
            title: "Jannet Banks",
            subtitle: {
                label: "Finance Department",
                url: "https://hcl-software.com",
            },
            email: {
                label: "jannet.banks@hcl-software.com",
                url: "mailto:jannet.banks@hcl-software.com",
                icon: "ci-Mail"
            },
            phone: {
                label: "773-936-3804",
                url: "tel:+7739363804",
                icon: "ci-Phone"
            },
            primaryButtons: [
                {
                    label: "View Profile",
                    onClick: () => {}
                },
            ],
            secondaryButtons: [
                {
                    label: "View in chart",
                    onClick: () => {}
                },
            ]
        }
    },
    {
        data: { keyword: "cake", department: "Dev Department" },
        card: {
            index: 6,
            title: "Gustav Brodnick",
            subtitle: {
                label: "Dev Department",
                url: "https://hcl-software.com",
            },
            email: {
                label: "gustav.brodnick@hcl-software.com",
                url: "mailto:gustav.brodnick@hcl-software.com",
                icon: "ci-Mail"
            },
            phone: {
                label: "773-936-3804",
                url: "tel:+7739363804",
                icon: "ci-Phone"
            },
            primaryButtons: [
                {
                    label: "View Profile",
                    onClick: () => {}
                },
            ],
            secondaryButtons: [
                {
                    label: "View in chart",
                    onClick: () => {}
                },
            ]
        }
    },
    {
        data: { keyword: "pizza", department: "Finance Department", },
        card: {
            index: 7,
            title: "Arthur Mcknight",
            subtitle: {
                label: "Finance Department",
                url: "https://hcl-software.com",
            },
            email: {
                label: "arthur.mcknight@hcl-software.com",
                url: "mailto:arthur.mcknight@hcl-software.com",
                icon: "ci-Mail"
            },
            phone: {
                label: "773-936-3804",
                url: "tel:+7739363804",
                icon: "ci-Phone"
            },
            primaryButtons: [
                {
                    label: "View Profile",
                    onClick: () => {}
                },
            ],
            secondaryButtons: [
                {
                    label: "View in chart",
                    onClick: () => {}
                },
            ]
        }
    },
    {
        data: { keyword: "cake", department: "HR Department", },
        card: {
            index: 8,
            title: "Ruth Croft",
            subtitle: {
                label: "HR Department",
                url: "https://hcl-software.com",
            },
            email: {
                label: "ruth.croft@hcl-software.com",
                url: "mailto:ruth.croft@hcl-software.com",
                icon: "ci-Mail"
            },
            phone: {
                label: "773-936-3804",
                url: "tel:+7739363804",
                icon: "ci-Phone"
            },
            primaryButtons: [
                {
                    label: "View Profile",
                    onClick: () => {}
                },
            ],
            secondaryButtons: [
                {
                    label: "View in chart",
                    onClick: () => {}
                },
            ]
        }
    },
    {
        data: { keyword: "pizza", department: "HR Department", },
        card: {
            index: 9,
            title: "Samuel Kavandi",
            subtitle: {
                label: "HR Department",
                url: "https://hcl-software.com",
            },
            email: {
                label: "samuel.kavandi@hcl-software.com",
                url: "mailto:samuel.kavandi@hcl-software.com",
                icon: "ci-Mail"
            },
            phone: {
                label: "773-936-3804",
                url: "tel:+7739363804",
                icon: "ci-Phone"
            },
            primaryButtons: [
                {
                    label: "View Profile",
                    onClick: () => {}
                },
            ],
            secondaryButtons: [
                {
                    label: "View in chart",
                    onClick: () => {}
                },
            ]
        }
    },
    {
        data: { keyword: "pizza", department: "Dev Department", },
        card: {
            index: 10,
            title: "Diego Salazar",
            subtitle: {
                label: "Dev Department",
                url: "https://hcl-software.com",
            },
            email: {
                label: "diego.salazar@hcl-software.com",
                url: "mailto:diego.salazar@hcl-software.com",
                icon: "ci-Mail"
            },
            phone: {
                label: "773-936-3804",
                url: "tel:+7739363804",
                icon: "ci-Phone"
            },
            primaryButtons: [
                {
                    label: "View Profile",
                    onClick: () => {}
                },
            ],
            secondaryButtons: [
                {
                    label: "View in chart",
                    onClick: () => {}
                },
            ]
        }
    },
    {
        data: { keyword: "coffee", department: "Dev Department", },
        card: {
            index: 11,
            title: "Chris Robinson",
            subtitle: {
                label: "Dev Department",
                url: "https://hcl-software.com",
            },
            email: {
                label: "chris.robinson@hcl-software.com",
                url: "mailto:chris.robinson@hcl-software.com",
                icon: "ci-Mail"
            },
            phone: {
                label: "773-936-3804",
                url: "tel:+7739363804",
                icon: "ci-Phone"
            },
            primaryButtons: [
                {
                    label: "View Profile",
                    onClick: () => {}
                },
            ],
            secondaryButtons: [
                {
                    label: "View in chart",
                    onClick: () => {}
                },
            ]
        }
    },
    {
        data: { keyword: "Cake", department: "Dev Department", },
        card: {
            index: 12,
            title: "Susan Grant",
            subtitle: {
                label: "Dev Department",
                url: "https://hcl-software.com",
            },
            email: {
                label: "susan.grant@hcl-software.com",
                url: "mailto:susan.grant@hcl-software.com",
                icon: "ci-Mail"
            },
            phone: {
                label: "773-936-3804",
                url: "tel:+7739363804",
                icon: "ci-Phone"
            },
            primaryButtons: [
                {
                    label: "View Profile",
                    onClick: () => {}
                },
            ],
            secondaryButtons: [
                {
                    label: "View in chart",
                    onClick: () => {}
                },
            ]
        }
    },
];
Default.args = {
    //@ts-ignore: Props are good
    items: itemsArgs,
    paginationProps: {
        sets: ["3", "6", "12"],
        active: 1,
        activeSet: 6
    },
    totalItems: itemsArgs.length,
    filterType: "select",
    categories: ["department"]
};
let extraFilterItems = itemsArgs.map( ( item: any, index: number ) => {
    let newData = { ...item.data, location: index % 2 === 0 ? "Office" : "Remote" };
    let card = item.card;
    return {
        data: newData,
        card
    };
} );
ExtraFilter.args = {
    //@ts-ignore: Props are good
    items: extraFilterItems,
    paginationProps: {
        sets: ["3", "6", "12"],
        active: 1,
        activeSet: 6
    },
    totalItems: extraFilterItems.length,
    filterType: "select",
    categories: ["department", "location"]
};
HideFilters.args = {
    //@ts-ignore: Props are good
    items: itemsArgs,
    paginationProps: {
        sets: ["3", "6", "12"],
        active: 1,
        activeSet: 6
    },
    totalItems: itemsArgs.length,
    filterType: "select",
    hideFilters: true
};

EmptyTaxonomyStrings.args = {
    ...Default.args,
    totalItems: 4,
    items: [
        {
            ...itemsArgs[0],
            data: { keyword: "coffee", department: "Dev Department" },
        },
        {
            ...itemsArgs[1],
            data: { keyword: "pizza", department: "  " }, 
        },
        {
            ...itemsArgs[2],
            data: { keyword: "cake", department: "" },
        },
        {
            ...itemsArgs[3],
            data: { keyword: "coffee", department: "HR Department" },
        }
    ],

}