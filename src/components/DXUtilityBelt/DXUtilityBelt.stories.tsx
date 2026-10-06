import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXUtilityBelt from './DXUtilityBelt';

export default {
    title: "Components/Navigation/Utility Belt",
    component: DXUtilityBelt,
    excludeStories: /.*Args$/,
} as Meta<typeof DXUtilityBelt>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXUtilityBelt> = ( args ) => <DXUtilityBelt {...args} />;
export const Default = Template.bind( {} );
export const Labeled = Template.bind( {} );

export const itemsArgs = [
    { button: { label: "Add Column", onClick: function () { console.log( "I was clicked" ); } } },
    { button: { iconClass: "ci-Add_Plus_Circle", label: "Add", onClick: function () { console.log( "I was clicked" ); } } },
    { button: { iconClass: "ci-Add_Row", label: "Add Row", onClick: function () { console.log( "I was clicked" ); } } },
    { button: { iconClass: "ci-Airplay", label: "Airplay", onClick: function () { console.log( "I was clicked" ); } } },
    { button: { label: "Alarm", onClick: function () { console.log( "I was clicked" ); } } },
    { button: { iconClass: "ci-Archive", label: "Archive", onClick: function () { console.log( "I was clicked" ); } } },
    { button: { iconClass: "ci-Bell_Add", label: "Add Bell", onClick: function () { console.log( "I was clicked" ); } } },
    { button: { label: "Bold", onClick: function () { console.log( "I was clicked" ); } } },
    { button: { iconClass: "ci-Book", label: "Book", onClick: function () { console.log( "I was clicked" ); } } },
    { button: { iconClass: "ci-Calendar", label: "Calendar", onClick: function () { console.log( "I was clicked" ); } } },
];

export const itemsLabeledArgs = [
    { title: "App 1", button: { label: "Column", onClick: function () { console.log( "I was clicked" ); } } },
    { title: "App 2", button: { iconClass: "ci-Add_Plus_Circle", label: "Add", onClick: function () { console.log( "I was clicked" ); } } },
    { title: "App 3", button: { iconClass: "ci-Add_Row", label: "Add Row", onClick: function () { console.log( "I was clicked" ); } } },
    { title: "App 4", button: { iconClass: "ci-Airplay", label: "Airplay", onClick: function () { console.log( "I was clicked" ); } } },
    { title: "App 5", button: { label: "Alarm", onClick: function () { console.log( "I was clicked" ); } } },
    { title: "App 6", button: { iconClass: "ci-Archive", label: "Archive", onClick: function () { console.log( "I was clicked" ); } } },
    { title: "App 7", button: { iconClass: "ci-Bell_Add", label: "Add Bell", onClick: function () { console.log( "I was clicked" ); } } },
    { title: "App 8", button: { iconClass: "ci-Bold", label: "Bold", onClick: function () { console.log( "I was clicked" ); } } },
    { title: "App 9", button: { iconClass: "ci-Book", label: "Book", onClick: function () { console.log( "I was clicked" ); } } },
    { title: "App 10", button: { label: "Calendar", onClick: function () { console.log( "I was clicked" ); } } },
];
Default.args = {
    items: itemsArgs,
    align: "center",
    displayType: "primary"
};
Labeled.args = {
    items: itemsLabeledArgs,
    textVariant: true,
    displayType: "primary"
};
