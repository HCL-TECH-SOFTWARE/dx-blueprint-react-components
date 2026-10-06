import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXWeeklyCalendar from "./DXWeeklyCalendar";

export default {
    title: "Components/General/Weekly Calendar",
    component: DXWeeklyCalendar,
    excludeStories: /.*Args$/,
} as Meta<typeof DXWeeklyCalendar>;

const Template: StoryFn<typeof DXWeeklyCalendar> = ( args ) => <DXWeeklyCalendar {...args} />;

export const DefaultVersion = Template.bind( {} );
export const OverflowVersion = Template.bind( {} );
export const ChangedIconsVersion = Template.bind( {} );

let today = new Date();

let dayForSingle = 0;
let dayForMultiple = 0;

if ( today.getDay() >= 4 ) {
    dayForSingle = today.getDate() - 1;
    dayForMultiple = today.getDate() - 2;
} else {
    dayForSingle = today.getDate() + 1;
    dayForMultiple = today.getDate() + 2;
}

DefaultVersion.args = {
    fullCalendarLink: "/test",
    events: [
        {
            info: {
                url: "/event-1",
                label: "Event 1",
                target: "_self"
            },
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        },
        {
            info: {
                url: "/event-2",
                label: "Event 2",
                target: "_self"
            },
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${dayForSingle}`
        },
        {
            info: {
                url: "/event-3a",
                label: "Event 3a",
                target: "_self"
            },
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${dayForMultiple}`
        },
        {
            info: {
                url: "/event-3b",
                label: "Event 3b",
                target: "_blank"
            },
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${dayForMultiple}`
        },
        {
            info: {
                url: "/event-3c",
                label: "Event 3c",
                target: "_blank"
            },
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${dayForMultiple}`
        },
        {
            info: {
                url: "/event-3d",
                label: "Event 3d",
                target: "_blank"
            },
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${dayForMultiple}`
        },
    ]
};
OverflowVersion.args = {
    fullCalendarLink: "/test",
    events: [
        {
            info: {
                url: "/event-1",
                label: "orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio",
                target: "_self"
            },
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        },
    ]
};

ChangedIconsVersion.args = {
    fullCalendarLink: "/test",
    events: [
        {
            info: {
                url: "/event-1",
                label: "orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio",
                target: "_self"
            },
            date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        },
    ],
    icons: {
        prev: "ci-Arrow_Left_MD",
        next: "ci-Arrow_Right_MD"
    }
};
