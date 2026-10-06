import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXEventItem from "./DXEventItem";

export default {
    title: "Components/Cards/Event Item",
    component: DXEventItem,
    excludeStories: /.*Args$/,
} as Meta<typeof DXEventItem>;

const Template: StoryFn<typeof DXEventItem> = ( args ) => <DXEventItem {...args} />;
export const EventItem = Template.bind( {} );
export const EventForm = Template.bind( {} );


EventItem.args = {
    variant: "event",
    eventDate: "10/30/23",
    dateFormat: "MM/DD/YY",
    eventStartTime: "15:30",
    eventEndTime: "16:30",
    eventName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur maximus blandit cras sit  ",
    link: {
        label: "",
        url: "https://hcl-software.com",
        target: "_self"
    },
};

EventForm.args = {
    variant: "form",
    formNumber: "521A",
    formPrice: 25,
    formName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur maximus blandit cras sit ",
    link: {
        label: "",
        url: "https://hcl-software.com",
        target: "_self"
    }
};
