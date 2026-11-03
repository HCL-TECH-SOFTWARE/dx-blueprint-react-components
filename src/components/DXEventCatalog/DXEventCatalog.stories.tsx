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
import DXEventCatalog, { EventCatalogItem } from "./DXEventCatalog";

export default {
    title: "Components/Lists, Catalogs, and Filters/Event Catalog",
    component: DXEventCatalog,
    excludeStories: /.*Args$/,
} as Meta<typeof DXEventCatalog>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXEventCatalog> = ( args ) => <DXEventCatalog {...args} />;

export const eventsArgs: EventCatalogItem[] = [
    {
        data: { keyword: "coffee" },
        event: {
            eventFrom: "2021-10-27T19:00:00",
            eventTo: "2021-11-07T21:00:00",
            eventName: {
                label: "Event 1 dolor sit amet, consectetuer adipiscing elit. Ae",
                url: "https://hcl-software.com",
                target: "_self"
            },
            eventType: "Personal",
            variant: "river",
            eventLocation: "Interior>Level 1>145 Conference Room",
            eventTime24hrFormat: true,
            icons: {
                event: "ci-User_01"
            }
        }
    },
    {
        data: { keyword: "pizza" },
        event: {
            eventFrom: "2021-10-27T19:00:00",
            eventTo: "2021-11-07T21:00:00",
            eventName: {
                label: "Event 2 dolor sit amet, consectetuer adipiscing elit. Ae",
                url: "https://hcl-software.com",
                target: "_self"
            },
            eventType: "Personal",
            variant: "river",
            eventTime24hrFormat: true,
            icons: {
                event: "ci-User_01"
            }
        }
    },
    {
        data: { keyword: "hotdog" },
        event: {
            eventFrom: "2021-09-27T19:00:00",
            eventTo: "2021-10-07T21:00:00",
            eventName: {
                label: "Event 3 dolor sit amet, consectetuer adipiscing elit. Ae",
                url: "https://hcl-software.com",
                target: "_self"
            },
            eventType: "Business",
            variant: "river",
            eventLocation: "Interior>Level 1>145 Conference Room",
            eventTime24hrFormat: true,
            icons: {
                event: "ci-User_01"
            }
        }
    },
    {
        data: { keyword: "cake" },
        event: {
            eventFrom: "2021-10-27T19:00:00",
            eventTo: "2021-11-07T21:00:00",
            eventName: {
                label: "Event 4 dolor sit amet, consectetuer adipiscing elit. Ae",
                url: "https://hcl-software.com",
                target: "_self"
            },
            eventType: "Scholar",
            variant: "river",
            eventTime24hrFormat: true
        }
    },
    {
        data: { keyword: "coffee" },
        event: {
            eventFrom: "2021-04-27T19:00:00",
            eventTo: "2021-06-07T21:00:00",
            eventName: {
                label: "Event 5 dolor sit amet, consectetuer adipiscing elit. Ae",
                url: "https://hcl-software.com",
                target: "_self"
            },
            eventType: "Personal",
            variant: "river",
            eventLocation: "Interior>Level 1>145 Conference Room",
            eventTime24hrFormat: true,
            icons: {
                event: "ci-User_01"
            }
        }
    },
    {
        data: { keyword: "pizza" },
        event: {
            eventFrom: "2021-10-27T19:00:00",
            eventTo: "2021-11-07T21:00:00",
            eventName: {
                label: "Event 6 dolor sit amet, consectetuer adipiscing elit. Ae",
                url: "https://hcl-software.com",
                target: "_self"
            },
            eventType: "Business",
            variant: "river",
            eventTime24hrFormat: true,
            icons: {
                event: "ci-User_01"
            }
        }
    },
    {
        data: { keyword: "pizza" },
        event: {
            eventFrom: "2021-01-27T19:00:00",
            eventTo: "2021-06-07T21:00:00",
            eventName: {
                label: "Event 7 dolor sit amet, consectetuer adipiscing elit. Ae",
                url: "https://hcl-software.com",
                target: "_self"
            },
            eventType: "Family",
            variant: "river",
            eventLocation: "Interior>Level 1>145 Conference Room",
            eventTime24hrFormat: true,
            icons: {
                event: "ci-User_01"
            }
        }
    },
    {
        data: { keyword: "hotdog" },
        event: {
            eventFrom: "2021-03-27T19:00:00",
            eventTo: "2021-05-07T21:00:00",
            eventName: {
                label: "Event 8 dolor sit amet, consectetuer adipiscing elit. Ae",
                url: "https://hcl-software.com",
                target: "_self"
            },
            eventType: "Personal",
            variant: "river",
            eventTime24hrFormat: true,
            icons: {
                event: "ci-User_01"
            }
        }
    },
    {
        data: { keyword: "coffee" },
        event: {
            eventFrom: "2021-10-27T19:00:00",
            eventTo: "2021-11-07T21:00:00",
            eventName: {
                label: "Event 9 dolor sit amet, consectetuer adipiscing elit. Ae",
                url: "https://hcl-software.com",
                target: "_self"
            },
            eventType: "Scholar",
            variant: "river",
            eventTime24hrFormat: true
        }
    },
    {
        data: { keyword: "hotdog" },
        event: {
            eventFrom: "2021-10-27T19:00:00",
            eventTo: "2021-11-07T21:00:00",
            eventName: {
                label: "Event 10 dolor sit amet, consectetuer adipiscing elit. Ae",
                url: "https://hcl-software.com",
                target: "_self"
            },
            eventType: "Personal",
            variant: "river",
            eventTime24hrFormat: true,
            icons: {
                event: "ci-User_01"
            }
        }
    },
    {
        data: { keyword: "pizza" },
        event: {
            eventFrom: "2021-02-27T19:00:00",
            eventTo: "2021-11-07T21:00:00",
            eventName: {
                label: "Event 11 dolor sit amet, consectetuer adipiscing elit. Ae",
                url: "https://hcl-software.com",
                target: "_self"
            },
            eventType: "Scholar",
            variant: "river",
            eventLocation: "Interior>Level 1>145 Conference Room",
            eventTime24hrFormat: true
        }
    },
    {
        data: { keyword: "pizza" },
        event: {
            eventFrom: "2021-01-27T19:00:00",
            eventTo: "2021-04-07T21:00:00",
            eventName: {
                label: "Event 12 dolor sit amet, consectetuer adipiscing elit. Ae",
                url: "https://hcl-software.com",
                target: "_self"
            },
            eventType: "Business",
            variant: "river",
            eventTime24hrFormat: true,
            icons: {
                event: "ci-User_01"
            }
        }
    },
];
const paginationProps = {
    sets: ["3", "6", "12"],
    active: 1,
    activeSet: 6,
};
export const Default = Template.bind( {} );
export const MoreFilters = Template.bind( {} );
export const HideFilters = Template.bind( {} );
export const NoTypeFilter = Template.bind( {} );
export const EmptyTaxonomyString = Template.bind( {} )
Default.args = {
    //@ts-ignore: Ignore error the variant passed is valid
    items: eventsArgs,
    paginationProps,
    totalItems: eventsArgs.length,
    filterType: "select"
};
let moreFiltersItems = eventsArgs.map( ( item, index ) => {
    let newData = { ...item.data, companion: index % 2 === 0 ? "Yes" : "No" };
    let event = item.event;
    return {
        data: newData,
        event
    };
} );
MoreFilters.args = {
    //@ts-ignore: Ignore error the variant passed is valid
    items: moreFiltersItems,
    paginationProps,
    totalItems: eventsArgs.length,
    categories: ["companion"],
    filterType: "select",
    elementsPerRow: 3
};
HideFilters.args = {
    //@ts-ignore: Ignore error the variant passed is valid
    items: eventsArgs,
    paginationProps,
    totalItems: eventsArgs.length,
    filterType: "select",
    hideFilters: true
};
NoTypeFilter.args = {
    //@ts-ignore: Ignore error the variant passed is valid
    items: eventsArgs,
    paginationProps,
    totalItems: eventsArgs.length,
    filterType: "select",
    hideTypeFilter: true
};

EmptyTaxonomyString.args = {
    ...Default.args,
    items: [
        {
            ...eventsArgs[0],
            data: { keyword: ""},
            event: {
            ...eventsArgs[0].event,
            eventType: "Personal",
            eventLocation: "Interior>Level 1>145 Conference Room",
            },
        },
        {
            ...eventsArgs[1],
            data: { keyword: " " },
            event: {
            ...eventsArgs[1].event,
            eventType: "",
            },
        },
        {
            ...eventsArgs[2],
            data: { keyword: "Sports" },
            event: {
            ...eventsArgs[2].event,
            eventType: "Business",
            eventLocation: "United States",
            },
        },
        
    ],
    totalItems: 3
}