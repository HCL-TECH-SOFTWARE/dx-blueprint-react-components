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
import DXEventTabs from "./DXEventTabs";

export default {
    title: "Components/Home Page/Event Tabs",
    component: DXEventTabs,
    excludeStories: /.*Args$/,
} as Meta<typeof DXEventTabs>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXEventTabs> = ( args ) => <DXEventTabs {...args} />;

export const EventTabs = Template.bind( {} );
export const EventTabsChangedIcon = Template.bind( {} );
export const EventTabs3 = Template.bind( {} );
export const EventTabsEmptyDefault = Template.bind( {} );
export const EventTabsEmptyText = Template.bind( {} );
export const EventTabsDateFormat = Template.bind( {} );
export const EventTabsOverflow = Template.bind( {} );
export const EventTabsNameOverflow = Template.bind( {} );

const todayYear = new Date( Date.now() ).getFullYear();
const after2Years = todayYear + 2;
const after1Year = todayYear + 1;

export const tabsArgs = [
    {
        category: "Internal",
        events: [
            {
                id: "1",
                name: "Event Name 1",
                startDate: "03/15/" + after1Year,
                endDate: "03/16/" + after2Years,
                url: "/one",
            },
            {
                id: "2",
                name: "Event Name 2",
                startDate: "03/20/" + todayYear,
                endDate: "03/22/" + after1Year,
                url: "/two",
            },
            {
                id: "3",
                name: "Event Name 3",
                startDate: "03/26/" + todayYear,
                endDate: "04/26/" + todayYear,
                url: "/three",
            },
            {
                id: "4",
                name: "Event Name 4",
                startDate: "03/29/" + todayYear,
                endDate: "03/28/" + todayYear,
            },
            {
                id: "5",
                name: "Event Name 5",
                startDate: "03/31/" + todayYear,
                endDate: "03/31/" + todayYear,
                url: "/five",
            },
            {
                id: "6",
                name: "Event Name 6",
                startDate: "04/01/" + todayYear,
                endDate: "04/02/" + todayYear,
            },
            {
                id: "7",
                name: "Event Name 7",
                startDate: "04/04/" + todayYear,
                endDate: "04/04/" + todayYear,
                url: "/seven",
            },
            {
                id: "8",
                name: "Event Name 8",
                startDate: "04/12/" + todayYear,
                endDate: "05/01/" + todayYear,
                url: "/eight",
            },
            {
                id: "9",
                name: "Event Name 9",
                startDate: "05/20/" + todayYear,
                endDate: "06/02/" + todayYear,
                url: "/nine",
            },
            {
                id: "10",
                name: "Event Name 10",
                startDate: "06/20/" + todayYear,
                endDate: "07/06/" + todayYear,
                url: "/ten",
            },
            {
                id: "11",
                name: "Event Name 11",
                startDate: "07/15/" + todayYear,
                endDate: "08/03/" + todayYear,
                url: "/eleven",
            },
            {
                id: "12",
                name: "Event Name 12",
                startDate: "08/17/" + todayYear,
                endDate: "09/05/" + todayYear,
                url: "/twelve",
            },
        ]
    },
    {
        category: "Press",
        events: [
            {
                id: "1",
                name: "Event Name 1",
                startDate: "03/15/" + after1Year,
                endDate: "03/16/" + after2Years,
                url: "/one",
            },
            {
                id: "13",
                name: "Event Name 13",
                startDate: "03/15/" + todayYear,
                endDate: "03/16/" + todayYear,
                url: "/one",
            },
            {
                id: "14",
                name: "Event Name 14",
                startDate: "03/20/" + todayYear,
                endDate: "03/22/" + todayYear,
                url: "/two",
            },
            {
                id: "15",
                name: "Event Name 15",
                startDate: "03/26/" + todayYear,
                endDate: "03/27/" + todayYear,
                url: "/three",
            },
            {
                id: "16",
                name: "Event Name 16",
                startDate: "03/29/" + todayYear,
                endDate: "03/29/" + todayYear,
            },
            {
                id: "17",
                name: "Event Name 17",
                startDate: "03/30/" + todayYear,
                endDate: "03/31/" + todayYear,
                url: "/five",
            },
            {
                id: "18",
                name: "Event Name 18",
                startDate: "04/01/" + todayYear,
                endDate: "04/02/" + todayYear,
            },
        ]
    },
    {
        category: "Social",
        events: [
            {
                id: "1",
                name: "Event Name 1",
                startDate: "03/15/" + after1Year,
                endDate: "03/16/" + after2Years,
                url: "/one",
            },
            {
                id: "19",
                name: "Event Name 19",
                startDate: "03/15/" + todayYear,
                endDate: "03/16/" + todayYear,
                url: "/one",
            },
            {
                id: "20",
                name: "Event Name 20",
                startDate: "03/20/" + todayYear,
                endDate: "03/22/" + todayYear,
                url: "/two",
            },
            {
                id: "21",
                name: "Event Name 21",
                startDate: "03/26/" + todayYear,
                endDate: "03/27/" + todayYear,
                url: "/three",
            },
            {
                id: "22",
                name: "Event Name 22",
                startDate: "03/29/" + todayYear,
                endDate: "03/29/" + todayYear,
            },
        ]
    }
];

export const EventTabsChangedIconsArgs = {
    tabs: tabsArgs,
    icons: {
        event: "ci-Calendar_Days",
        prev: "ci-Chevron_Left",
        next: "ci-Chevron_Right"
    }
};

EventTabs.args = {
    tabs: tabsArgs
};

EventTabsChangedIcon.args = EventTabsChangedIconsArgs;

EventTabs3.args = {
    tabs: tabsArgs,
    eventsPerPage: 3,
    eventsPerPageMobile: 5
};
EventTabsEmptyDefault.args = {
    tabs: [
        {
            category: "Internal",
            events: []
        },
        {
            category: "Press",
            events: [
                {
                    id: "1",
                    name: "Event Name 1",
                    startDate: "03/15/" + todayYear,
                    url: "/one",
                },
                {
                    id: "2",
                    name: "Event Name 2",
                    startDate: "03/20/" + todayYear,
                    url: "/two",
                },
                {
                    id: "3",
                    name: "Event Name 3",
                    startDate: "03/26/" + todayYear,
                    endDate: "03/27/" + todayYear,
                    url: "/three",
                },
                {
                    id: "4",
                    name: "Event Name 4",
                    startDate: "03/29/" + todayYear,
                    endDate: "03/29/" + todayYear,
                },
            ]
        },
        {
            category: "Social",
            events: []
        },
    ]
};
EventTabsEmptyText.args = {
    tabs: [
        {
            category: "Internal",
            events: []
        },
        {
            category: "Press",
            events: []
        },
        {
            category: "Social",
            events: []
        }
    ],
    empty: {
        title: "No Events!",
        text: "We're sorry, there are no events for this tab.",
        image: {
            url: "https://img.freepik.com/free-vector/warning-concept-illustration_114360-1551.jpg?w=1380&t=st=1680200455~exp=1680201055~hmac=354d10e7948a3449bf84ad959964c7da08072f5fe9632e338f5041f6a801a1b7",
        }
    }
};
EventTabsDateFormat.args = {
    tabs: [
        {
            category: "Internal",
            events: []
        },
        {
            category: "Press",
            events: [
                {
                    id: "1",
                    name: "Event Name 1",
                    startDate: "Jan/15/" + todayYear,
                    endDate: "March/16/" + todayYear,
                    url: "/one",
                },
                {
                    id: "2",
                    name: "Event Name 2",
                    startDate: "March/20/" + todayYear,
                    endDate: "May/22/" + todayYear,
                    url: "/two",
                },
                {
                    id: "3",
                    name: "Event Name 3",
                    startDate: "June/26/" + todayYear,
                    endDate: "July/27/" + todayYear,
                    url: "/three",
                },
                {
                    id: "4",
                    name: "Event Name 4",
                    startDate: "Sep/29/" + todayYear,
                    endDate: "Sep/29/" + todayYear,
                },
            ]
        },
        {
            category: "Social",
            events: []
        }
    ],
    dateFormat: "Mon/DD/YY"
};
EventTabsOverflow.args = {
    tabs: [
        {
            category: "Internal",
            events: [{
                id: "1",
                name: "Lorem ipsum dolor sit amet, consectetuer adipiscin",
                startDate: "Jan/15/" + todayYear,
                endDate: "March/16/" + todayYear,
                url: "/one",
            }]
        },
        {
            category: "Management events",
            events: [{
                id: "2",
                name: "Lorem ipsum dolor sit amet, consectetuer adipiscin",
                startDate: "Jan/15/" + todayYear,
                endDate: "March/16/" + todayYear,
                url: "/one",
            }]
        },
        {
            category: "Press conference for international media",
            events: [{
                id: "3",
                name: "Event Name 1.1",
                startDate: "Jan/15/" + todayYear,
                endDate: "March/16/" + todayYear,
                url: "/one",
            }]
        },
        {
            category: "Social and charitable events",
            events: [{
                id: "4",
                name: "Event Name 1.2",
                startDate: "Jan/15/" + todayYear,
                endDate: "March/16/" + todayYear,
                url: "/one",
            }]
        },
        {
            category: "Holidays and official employee gatherings",
            events: [{
                id: "5",
                name: "Event Name 1.3",
                startDate: "Jan/15/" + todayYear,
                endDate: "March/16/" + todayYear,
                url: "/one",
            }]
        },
        {
            category: "Press conference for national media",
            events: [{
                id: "6",
                name: "Event Name 1.4",
                startDate: "Jan/15/" + todayYear,
                endDate: "March/16/" + todayYear,
                url: "/one",
            }]
        },

    ],
    dateFormat: "Mon/DD/YY"
};
EventTabsNameOverflow.args = {
    tabs: [
        {
            category: "Social",
            events: [
                {
                    id: "1",
                    name: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m",
                    startDate: "03/15/" + todayYear,
                    endDate: "03/16/" + todayYear,
                    url: "/one",
                },
                {
                    id: "2",
                    name: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m",
                    startDate: "03/20/" + todayYear,
                    endDate: "03/22/" + todayYear,
                    url: "/two",
                },
                {
                    id: "3",
                    name: "Event Name 1.3",
                    startDate: "03/26/" + todayYear,
                    endDate: "03/27/" + todayYear,
                    url: "/three",
                },
                {
                    id: "4",
                    name: "Event Name 1.4",
                    startDate: "03/29/" + todayYear,
                    endDate: "03/29/" + todayYear,
                },
            ]
        }
    ],
    eventNameCharLimit: 60
};
