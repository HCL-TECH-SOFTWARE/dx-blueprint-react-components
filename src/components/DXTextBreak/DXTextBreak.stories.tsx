import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXTextBreak from './DXTextBreak';

export default {
    title: "Components/General/Text Break",
    component: DXTextBreak,
    excludeStories: /.*Args$/,
} as Meta<typeof DXTextBreak>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXTextBreak> = ( args ) => <DXTextBreak {...args} />;
export const TextBreak = Template.bind( {} );
export const TextBreakColor = Template.bind( {} );
export const TextBreakNoSubtitle = Template.bind( {} );
export const TextBreakNoButton = Template.bind( {} );
export const requiredArgs = {
    title: "Need to work from your home?",
    background: {
        color: "#5ecf9d"
    }
};
TextBreak.args = {
    ...requiredArgs,
    subtitle: "We got you! Simply press the button down below and create your first Remote Work Agreement and start right away.",
    button: {
        label: "Regular button",
        onClick: function () { console.log( "I got clicked!" ); }
    },
    textColor: "#d4eae0",
    align: "left",
    background: {
        ...requiredArgs.background,
        image: "https://images.unsplash.com/photo-1667312950895-306784936a68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    }
};
TextBreakColor.args = {
    ...requiredArgs,
    align: "center",
    subtitle: "We got you! Simply press the button down below and create your first Remote Work Agreement and start right away.",
    button: {
        label: "Regular button",
        onClick: function () { console.log( "I got clicked!" ); }
    },
};
TextBreakNoSubtitle.args = {
    ...requiredArgs,
    button: {
        label: "Regular button",
        onClick: function () { console.log( "I got clicked!" ); }
    },
};
TextBreakNoButton.args = {
    ...requiredArgs,
    subtitle: "We got you! Simply press the button down below and create your first Remote Work Agreement and start right away.",
};
