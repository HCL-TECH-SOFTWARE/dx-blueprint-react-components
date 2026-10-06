import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXEvent from "./DXEvent";

export default {
    title: "Components/Cards/Event Card",
    component: DXEvent,
    excludeStories: /.*Args$/,
    argTypes: {
        showExternalIcon: {
            control: 'boolean',
            defaultValue: false,
        },
    },
} as Meta<typeof DXEvent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXEvent> = ( args ) => <DXEvent {...args} />;

export const EventFeatured = Template.bind( {} );
export const EventFeaturedChangedIcons = Template.bind( {} );
export const EventFeaturedOverflow = Template.bind( {} );
export const EventFeaturedCompact = Template.bind( {} );
export const EventFeaturedCompactOverflow = Template.bind( {} );
export const EventRiver = Template.bind( {} );
export const EventRiverOverflow = Template.bind( {} );
export const EventRiverCompact = Template.bind( {} );

const eventData = {
    eventFrom: "2021-10-27T19:00:00",
    eventTo: "2021-11-07T21:00:00",
    eventName: {
        label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
        url: "https://hcl-software.com",
        target: "_self"
    },
    eventType: "Type of event",
};

EventFeatured.args = {
    ...eventData,
    variant: "featured",
    eventLocation: "Interior>Level 1>145 Conference Room",
    eventButton: {
        label: "Add to My Planner",
        onClick: () => console.log( "Triggered Event" )
    }
};

EventFeaturedChangedIcons.args = {
    ...eventData,
    variant: "featured",
    eventLocation: "Interior>Level 1>145 Conference Room",
    eventButton: {
        label: "Add to My Planner",
        onClick: () => console.log( "Triggered Event" )
    },
    icons: {
        event: "ci-Calendar_Check",
        featured: "ci-Heart_01",
    }
};

EventFeaturedOverflow.args = {
    ...eventData,
    variant: "featured",
    eventFrom: "2021-10-27T09:00:00",
    eventTo: "2021-11-07T01:00:00",
    eventName: {
        label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et",
        url: "https://hcl-software.com",
        target: "_self"
    },
    eventLocation: "Interior>Level 1>145 Conference Room",
    eventButton: {
        label: "Add to My Planner",
        onClick: () => console.log( "Triggered Event" )
    },
};
EventFeaturedCompact.args = {
    ...eventData,
    variant: "featured-compact",
    eventLocation: "Interior>Level 1>145 Conference Room",
};
EventFeaturedCompactOverflow.args = {
    variant: "featured-compact",
    eventFrom: "2021-10-27T19:00:00",
    eventName: {
        label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et",
        url: "https://hcl-software.com",
        target: "_self"
    },
};
EventRiver.args = {
    variant: "river",
    eventFrom: "2021-10-27T19:00:00",
    eventTo: "2021-11-07T21:00:00",
    eventType: "Type of event",
    eventName: {
        label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
        url: "https://hcl-software.com",
        target: "_self"
    },
};
EventRiverOverflow.args = {
    variant: "river",
    eventFrom: "2021-10-27T19:00:00",
    eventTo: "2021-11-07T21:00:00",
    eventType: "Type of event",
    eventName: {
        label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et",
        url: "https://hcl-software.com",
        target: "_self"
    },
};

EventRiverCompact.globals = {
    viewport: {
        value: 'mobile1',
        isRotated: false,
    },
};
EventRiverCompact.args = {
    variant: "river",
    compact: true,
    eventFrom: "2021-10-27T19:00:00",
    eventTo: "2021-11-07T21:00:00",
    eventType: "Type of event",
    eventName: {
        label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
        url: "https://hcl-software.com",
        target: "_self"
    },
};
