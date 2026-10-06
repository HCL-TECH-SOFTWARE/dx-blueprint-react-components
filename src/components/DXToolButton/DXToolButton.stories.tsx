import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXToolButton from './DXToolButton';

export default {
    title: "Components/Buttons and Headers/Tool Button",
    component: DXToolButton,
    excludeStories: /.*Args$/,
} as Meta<typeof DXToolButton>;

const Template: StoryFn<typeof DXToolButton> = ( args ) => <DXToolButton {...args} />;

export const Default = Template.bind( {} );
export const DefaultNoLabel = Template.bind( {} );
export const ImageButton = Template.bind( {} );
export const ImageButtonNoLabel = Template.bind( {} );
Default.args = {
    icon: "ci-Calendar",
    label: "Check",
    onClick: function () { console.log( "DXToolButton was clicked" ); },
    badge: 1,
    showLabel: true,
};
DefaultNoLabel.args = {
    icon: "ci-Calendar",
    label: "default with no label",
    onClick: function () { console.log( "DXToolButton was clicked" ); }
};

ImageButton.args = {
    icon: "",
    image: {
        url: "https://images.unsplash.com/photo-1685460939882-da7c7cb6f3ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        altText: "Nice dog at the beach"
    },
    label: "Click",
    onClick: function () { console.log( "DXToolButton was clicked" ); },
    badge: 4,
    showLabel: true
};

ImageButtonNoLabel.args = {
    icon: "",
    image: {
        url: "https://images.unsplash.com/photo-1685460939882-da7c7cb6f3ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        altText: "Nice dog at the beach"
    },
    label: "image button with no label",
    onClick: function () { console.log( "DXToolButton was clicked" ); }
};
