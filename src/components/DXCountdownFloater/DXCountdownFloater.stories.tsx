import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXCountdownFloater from "./DXCountdownFloater";

export default {
    title: "Components/Custom/Countdown Floater",
    component: DXCountdownFloater,
    excludeStories: /.*Args$/,
} as Meta<typeof DXCountdownFloater>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXCountdownFloater> = ( args ) => <DXCountdownFloater {...args} />;

export const CountdownFloater = Template.bind( {} );
export const CountdownWithMonths = Template.bind( {} );
export const CountdownColor = Template.bind( {} );
export const CountdownEmpty = Template.bind( {} );

let storyDate = new Date();
storyDate.setDate( storyDate.getDate().valueOf() + 15 );
CountdownFloater.args = {
    date: `${storyDate.getFullYear()}-${storyDate.getMonth().valueOf() + 1}-${storyDate.getDate()}`,
    showSeconds: true
};
CountdownWithMonths.args = {
    date: `${storyDate.getFullYear()}-${storyDate.getMonth().valueOf() + 1}-${storyDate.getDate()}`
};
CountdownColor.args = {
    date: `${storyDate.getFullYear()}-${storyDate.getMonth().valueOf() + 1}-${storyDate.getDate()}`,
    textColor: "#16935c",
    showSeconds: true
};
CountdownEmpty.args = {
    date: ""
};
