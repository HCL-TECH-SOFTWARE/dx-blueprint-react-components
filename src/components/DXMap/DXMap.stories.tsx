import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXMap from "./DXMap";

export default {
    title: "Components/Multimedia/Map",
    component: DXMap,
    excludeStories: /.*Args$/,
} as Meta<typeof DXMap>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXMap> = ( args ) => <DXMap {...args} />;

export const Map = Template.bind( {} );
Map.args = {
    iframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx"
};
