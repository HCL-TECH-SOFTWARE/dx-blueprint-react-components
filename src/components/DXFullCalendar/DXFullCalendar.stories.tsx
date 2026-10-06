import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXFullCalendar from "./DXFullCalendar";

export default {
    title: "Components/General/Full Calendar",
    component: DXFullCalendar,
    excludeStories: /.*Args$/,
} as Meta<typeof DXFullCalendar>;

const Template: StoryFn<typeof DXFullCalendar> = ( args ) => <DXFullCalendar {...args} />;

export const DefaultCalendar = Template.bind( {} );
export const CalendarChangedIcons = Template.bind( {} );
export const CalendarNoFilters = Template.bind( {} );
export const CalendarOverflow = Template.bind( {} );
export const CalendarMoreThan3Filters = Template.bind( {} );
export const CalendarMobile = Template.bind( {} );

const today = new Date();
const todayForFuture = new Date();
const todayForPast = new Date();
let futureWeek = new Date( todayForFuture.setDate( todayForFuture.getDate() + 7 ) );
let pastWeek = new Date( todayForPast.setDate( todayForPast.getDate() - 3 ) );

const events = [
    {
        info: {
            url: "/event-1",
            label: "Event 1",
            target: "_self"
        },
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        type: "Business",
        location: "Office"
    },
    {
        info: {
            url: "/event-2a",
            label: "Event 2a",
            target: "_self"
        },
        date: `${futureWeek.getFullYear()}-${futureWeek.getMonth() + 1}-${futureWeek.getDate()}`,
        type: "Scholar",
        location: "Restaurant"
    },
    {
        info: {
            url: "/event-2b",
            label: "Event 2b",
            target: "_self"
        },
        date: `${futureWeek.getFullYear()}-${futureWeek.getMonth() + 1}-${futureWeek.getDate()}`,
        type: "Personal",
        location: "Hotel"
    },
    {
        info: {
            url: "/event-2c",
            label: "Event 2c",
            target: "_self"
        },
        date: `${futureWeek.getFullYear()}-${futureWeek.getMonth() + 1}-${futureWeek.getDate()}`,
        type: "Business",
        location: "Office"
    },
    {
        info: {
            url: "/event-2d",
            label: "Event 2d",
            target: "_self"
        },
        date: `${futureWeek.getFullYear()}-${futureWeek.getMonth() + 1}-${futureWeek.getDate()}`,
        type: "Business",
        location: "Office"
    },
    {
        info: {
            url: "/event-3",
            label: "Event 3",
            target: "_self"
        },
        date: `${pastWeek.getFullYear()}-${pastWeek.getMonth() + 1}-${pastWeek.getDate()}`,
        type: "Personal",
        location: "Restaurant"
    },
    {
        info: {
            url: "/event-4",
            label: "Event 4",
            target: "_self"
        },
        date: `${pastWeek.getFullYear()}-${pastWeek.getMonth() + 1}-${pastWeek.getDate()}`,
        type: "Business,Work",
        location: "Office"
    },
];

DefaultCalendar.args = {
    events,
};

export const calendarChangedIconsArgs = {
    events: events,
    icons: {
        prev: "ci-Arrow_Left_MD",
        next: "ci-Arrow_Right_MD",
        filter: "ci-Hamburger_MD",
        filterClose: "ci-House_Close",
        alert: "ci-Triangle_Warning"
    }
};

CalendarChangedIcons.args = calendarChangedIconsArgs;

let eventsOverflow = events.map( event => {
    return {
        ...event,
        type: event.type.replace( "Business", "BusinessBusiness" )
    };
} );

CalendarOverflow.args = {
    events: eventsOverflow,
};

CalendarNoFilters.args = {
    events: [
        {
            info: {
                url: "/event-1",
                label: "Event 1",
                target: "_self"
            },
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        },
        {
            info: {
                url: "/event-2a",
                label: "Event 2a",
                target: "_self"
            },
            date: `${futureWeek.getFullYear()}-${futureWeek.getMonth() + 1}-${futureWeek.getDate()}`,
        },
        {
            info: {
                url: "/event-2b",
                label: "Event 2b",
                target: "_self"
            },
            date: `${futureWeek.getFullYear()}-${futureWeek.getMonth() + 1}-${futureWeek.getDate()}`,
        },
        {
            info: {
                url: "/event-2c",
                label: "Event 2c",
                target: "_self"
            },
            date: `${futureWeek.getFullYear()}-${futureWeek.getMonth() + 1}-${futureWeek.getDate()}`,
        },
        {
            info: {
                url: "/event-2d",
                label: "Event 2d",
                target: "_self"
            },
            date: `${futureWeek.getFullYear()}-${futureWeek.getMonth() + 1}-${futureWeek.getDate()}`,
        },
        {
            info: {
                url: "/event-3",
                label: "Event 3",
                target: "_self"
            },
            date: `${pastWeek.getFullYear()}-${pastWeek.getMonth() + 1}-${pastWeek.getDate()}`,
        },
        {
            info: {
                url: "/event-4",
                label: "Event 4",
                target: "_self"
            },
            date: `${pastWeek.getFullYear()}-${pastWeek.getMonth() + 1}-${pastWeek.getDate()}`,
        },
    ],
};

const eventsMoreValues = [
    {
        info: {
            url: "/event-1",
            label: "Event 1",
            target: "_self"
        },
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        type: "Business",
        location: "Office"
    },
    {
        info: {
            url: "/event-2a",
            label: "Event 2a",
            target: "_self"
        },
        date: `${futureWeek.getFullYear()}-${futureWeek.getMonth() + 1}-${futureWeek.getDate()}`,
        type: "Scholar,Sports",
        location: "Restaurant"
    },
    {
        info: {
            url: "/event-2b",
            label: "Event 2b",
            target: "_self"
        },
        date: `${futureWeek.getFullYear()}-${futureWeek.getMonth() + 1}-${futureWeek.getDate()}`,
        type: "Personal",
        location: "Hotel"
    },
    {
        info: {
            url: "/event-2c",
            label: "Event 2c",
            target: "_self"
        },
        date: `${futureWeek.getFullYear()}-${futureWeek.getMonth() + 1}-${futureWeek.getDate()}`,
        type: "Business",
        location: "Office"
    },
    {
        info: {
            url: "/event-2d",
            label: "Event 2d",
            target: "_self"
        },
        date: `${futureWeek.getFullYear()}-${futureWeek.getMonth() + 1}-${futureWeek.getDate()}`,
        type: "Business",
        location: "Office"
    },
    {
        info: {
            url: "/event-3",
            label: "Event 3",
            target: "_self"
        },
        date: `${pastWeek.getFullYear()}-${pastWeek.getMonth() + 1}-${pastWeek.getDate()}`,
        type: "Personal",
        location: "Restaurant"
    },
    {
        info: {
            url: "/event-4",
            label: "Event 4",
            target: "_self"
        },
        date: `${pastWeek.getFullYear()}-${pastWeek.getMonth() + 1}-${pastWeek.getDate()}`,
        type: "Business,Work",
        location: "Office"
    },
];

CalendarMoreThan3Filters.args = {
    events: [
        {
            info: {
                url: "/event-1",
                label: "Event 1",
                target: "_self"
            },
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
            type: "Business",
            location: "Office",
            people: "Teammates"
        },
    ],
};

CalendarMobile.args = {
    events,
    isMobile: true
};
