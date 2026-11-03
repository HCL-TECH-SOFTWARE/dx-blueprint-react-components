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
import DXCalendar, { CalendarProps } from "./DXCalendar";

export default {
    title: "Components/General/Calendar",
    component: DXCalendar,
    excludeStories: /.*Args$/,
} as Meta<typeof DXCalendar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXCalendar> = ( args ) => <DXCalendar {...args} />;

export const Calendar = Template.bind( {} );
export const CalendarChangedIcons = Template.bind( {} );
export const CalendarSmall = Template.bind( {} );
export const CalendarWithColors = Template.bind( {} );
export const CalendarCustomFn = Template.bind( {} );

let today = new Date();
let events = [
    {
        name: "Sprint Kickoff",
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - 7}`,
        link: "/test"
    },
    {
        name: "Sprint Status",
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - 5}`,
        link: "/test"
    },
    {
        name: "Sprint Status",
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        link: "/test"
    },
    {
        name: "Sprint Close",
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 5}`,
        link: "/test"
    },
    {
        name: "Operations Team Meeting",
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        link: "/test"
    },
    {
        name: "Operations Team Meeting",
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 7}`,
        link: "/test"
    },
    {
        name: "Financial Team Meeting",
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 1}`,
        link: "/test"
    },
    {
        name: "HR Team Meeting",
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        link: "/test"
    },
    {
        name: "Marketing Team Meeting",
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 1}`,
        link: "/test"
    },
];

Calendar.args = {
    events: events
};

CalendarSmall.args = {
    events: events,
    small: true
};

CalendarCustomFn.args = {
    events: [
        {
            name: "Sprint Kickoff",
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
            link: "/test"
        },
        {
            name: "Sprint Status",
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 7}`,
            link: "/test"
        },
        {
            name: "Sprint Close",
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
            link: "/test"
        },
        {
            name: "Operations Team Meeting",
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 1}`,
            link: "/test"
        },
    ],
    _selectEvent: ( ev: any ) => console.log( ev )
};
CalendarWithColors.args = {
    events: [
        {
            name: "Sprint Kickoff",
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - 7}`,
            link: "/test",
            color: "red"
        },
        {
            name: "Sprint Status",
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - 4}`,
            link: "/test",
            color: "red"
        },
        {
            name: "Sprint Close",
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
            link: "/test",
            color: "red"
        },
        {
            name: "Operations Team Meeting",
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - 4}`,
            link: "/test",
            color: "yellow"
        },
        {
            name: "Operations Team Meeting",
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
            link: "/test",
            color: "yellow"
        },
        {
            name: "Financial Team Meeting",
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 1}`,
            link: "/test",
            color: "pink"
        },
        {
            name: "HR Team Meeting",
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 7}`,
            link: "/test",
            color: "orange"
        },
        {
            name: "Marketing Team Meeting",
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 3}`,
            link: "/test",
            color: "pink"
        },
    ],
};

export const CalendarChangedIconsArgs: CalendarProps = {
    events: events,
    icons: {
        prev: "ci-Arrow_Left_MD",
        next: "ci-Arrow_Right_MD"
    }
};

CalendarChangedIcons.args = CalendarChangedIconsArgs;
