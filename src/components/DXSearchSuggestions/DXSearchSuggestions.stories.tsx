import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXSearchSuggestions from './DXSearchSuggestions';

export default {
    title: "Components/Home Page/Search Suggestions",
    component: DXSearchSuggestions,
    excludeStories: /.*Args$/,
} as Meta<typeof DXSearchSuggestions>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXSearchSuggestions> = ( args ) => <DXSearchSuggestions {...args} />;

export const SimpleSearch = Template.bind( {} );
export const ChangedIcons = Template.bind( {} );
export const itemsArgs = [
    { label: "Question 1", url: "#one" },
    { label: "Question 2", url: "#two" },
    { label: "Question 3", url: "#three" },
    { label: "Question 4", url: "#four" },
    { label: "Question 5", url: "#five" },
    { label: "Question 6", url: "#six" },
    { label: "Question 7", url: "#seven" },
];
export const ssArgs = {
    searchItems: itemsArgs,
    searchFn: function ( filter: string ) {
        console.log( "This is what you searched: ", filter );
    },
    iconPosition: "right" as "right",
    searchPlaceholder: "Look for..."
};

SimpleSearch.args = ssArgs;
ChangedIcons.args = {
    ...ssArgs,
    icons: {
        search: "ci-Note_Search",
        link: "ci-Arrow_Right_MD"
    }
};
