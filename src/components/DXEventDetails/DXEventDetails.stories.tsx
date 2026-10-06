import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXEventDetails from "./DXEventDetails";

export default {
    title: "Components/General/Event Details",
    component: DXEventDetails,
    excludeStories: /.*Args$/,
} as Meta<typeof DXEventDetails>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXEventDetails> = ( args ) => <DXEventDetails {...args} />;

export const EventDetailsFull = Template.bind( {} );
export const EventDetailsChangedIcons = Template.bind( {} );
export const EventDetails4Btns = Template.bind( {} );
export const EventDetailsOnline = Template.bind( {} );
export const EventDetailsOverflow = Template.bind( {} );
export const EventDetailsOnlineOverflow = Template.bind( {} );
export const EventDetailsWithBoth = Template.bind( {} );
export const EventDetails3Adrs = Template.bind( {} );
export const EventDetailsSocialShare = Template.bind( {} );

export const eventDetailsArgs = {
    title: "Birthday Party",
    eventFrom: "2021-10-27",
    eventTo: "2021-10-30",
    beginHour: "19:00:00",
    endHour: "21:00:00",
    location: "My Home",
    addressLines: ["Main Avenue #68 pc.75638"],
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
    addToMyCalendar: true,
    calendarButtons: {
        apple: true,
    }
};

export const changedIconsEventDetailsArgs = {
    ...eventDetailsArgs,
    icons: {
        calendar: "ci-Calendar_Check",
        contact: "ci-User_01",
        location: "ci-Map",
        share: "ci-Link",
        register: "ci-Add_Plus_Circle",
        google: "ci-Circle",
        apple: "ci-Shield",
        yahoo: "ci-Triangle",
        outlook: "ci-Square",
        close: "ci-Close_LG"
    }
};

export const eventOnlineArgs = {
    title: "Birthday Party",
    eventFrom: "2021-10-27",
    eventTo: "2021-10-27",
    beginHour: "19:00:00",
    endHour: "21:00:00",
    location: "Your Home",
    eventUrl: {
        label: "Visit here",
        url: "https://zoom.com/join/8492830",
        target: "_blank"
    },
    addToMyCalendar: true,
    calendarButtons: {
        apple: true,
        yahoo: true,
    }
};

EventDetailsFull.args = {
    ...eventDetailsArgs,
    addressLines: ["Main Avenue #68 pc.75638", "Main Avenue #68 pc.75638"],
    contact: function () { console.log( "Contact button clicked" ); },
    getDirections: function () { console.log( "Get Directions button clicked" ); },
    share: function () { console.log( "Share button clicked" ); },
    register: function () { console.log( "Register button clicked" ); },
};

EventDetailsChangedIcons.args = {
    ...changedIconsEventDetailsArgs,
    addressLines: ["Main Avenue #68 pc.75638", "Main Avenue #68 pc.75638"],
    contact: function () { console.log( "Contact button clicked" ); },
    getDirections: function () { console.log( "Get Directions button clicked" ); },
    share: function () { console.log( "Share button clicked" ); },
    register: function () { console.log( "Register button clicked" ); },
};

EventDetails4Btns.args = {
    ...eventDetailsArgs,
    eventTo: "2021-10-27",
    getDirections: function () { console.log( "Get Directions button clicked" ); },
    share: function () { console.log( "Share button clicked" ); },
    register: function () { console.log( "Register button clicked" ); },
};

EventDetailsOnline.args = {
    ...eventOnlineArgs,
    share: function () { console.log( "Share button clicked" ); },
    register: function () { console.log( "Register button clicked" ); },
};

EventDetailsOverflow.args = {
    ...eventDetailsArgs,
    addressLines: ["Main Avenue #68 pc.75638 Cond. Holy Yard Apartment #245", "Main Avenue #68 pc.75638 Cond. Holy Yard Apartment #245"],
    getDirections: function () { console.log( "Get Directions button clicked" ); },
    share: function () { console.log( "Share button clicked" ); },
    register: function () { console.log( "Register button clicked" ); },
};
EventDetailsOnlineOverflow.args = {
    ...eventOnlineArgs,
    eventUrl: {
        label: "Visit here to access the amazing link for this event",
        url: "https://zoom.com/join/8492830",
        target: "_blank"
    },
    share: function () { console.log( "Share button clicked" ); },
    register: function () { console.log( "Register button clicked" ); },
};
EventDetailsWithBoth.args = {
    ...eventDetailsArgs,
    eventUrl: {
        label: "Visit here",
        url: "https://zoom.com/join/8492830",
        target: "_blank"
    },
    contact: function () { console.log( "Contact button clicked" ); },
    getDirections: function () { console.log( "Get Directions button clicked" ); },
    share: function () { console.log( "Share button clicked" ); },
    register: function () { console.log( "Register button clicked" ); },
};
EventDetails3Adrs.args = {
    ...eventDetailsArgs,
    addressLines: ["Main Avenue #68 pc.75638", "Main Avenue #69 pc.75638", "Main Avenue #70 pc.75638"],
    contact: function () { console.log( "Contact button clicked" ); },
    getDirections: function () { console.log( "Get Directions button clicked" ); },
};

EventDetailsSocialShare.args = {
    ...eventDetailsArgs,
    addressLines: ["Main Avenue #68 pc.75638", "Main Avenue #68 pc.75638"],
    contact: function () { console.log( "Contact button clicked" ); },
    getDirections: function () { console.log( "Get Directions button clicked" ); },
    register: function () { console.log( "Register button clicked" ); },
    share: {
        title: "Select the social Media you want to share the event",
        size: "big",
        socialMediaActions: {
            facebook: { display: true },
            twitter: { display: true, },
            linkedin: { display: true }
        },
        pageDetails: {
            url: "https://hcl-software.com",
            pageTitle: "HCL Software",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est turpis, maximus in risus eu, sollicitudin molestie felis. Nam mauris diam, interdum ullamcorper dolor in, cursus gravida nisi"
        }
    }
};

