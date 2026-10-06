import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXAds from "./DXAds";

export default {
    title: "Components/Buttons and Headers/Ads",
    component: DXAds,
    excludeStories: /.*Args$/,
} as Meta<typeof DXAds>;

const Template: StoryFn<typeof DXAds> = ( args ) => <DXAds {...args} />;

export const Ads_2 = Template.bind( {} );
export const Ads_3 = Template.bind( {} );
export const Ads_4 = Template.bind( {} );
export const Ads_6 = Template.bind( {} );

let ads = [
    {
        img: {
            url: "https://images.unsplash.com/photo-1661705969607-cde73828023d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
            altText: "image-1"
        },
        icon: "ci-Map",
        text: "Explore It"
    },
    {
        img: {
            url: "https://images.unsplash.com/photo-1681036149898-8e61fd929ce1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
            altText: "image-2"
        },
        icon: "ci-Map",
        text: "Explore It"
    },
    {

        img: {
            url: "https://images.unsplash.com/photo-1679233413162-a071ab0ca85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "image-3"
        },
        icon: "ci-Map",
        text: "Explore It"
    },
    {

        img: {
            url: "https://images.unsplash.com/photo-1680442794210-18aaefe1bc11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
            altText: "image-4"
        },
        icon: "ci-Map",
        text: "Explore It"
    },
    {

        img: {
            url: "https://images.unsplash.com/photo-1679149025464-a1a42d745843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2118&q=80",
            altText: "image-5"
        },
        icon: "ci-Map",
        text: "Explore It"
    },
    {

        img: {
            url: "https://images.unsplash.com/photo-1679218407381-a6f1660d60e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "image-6"
        },
        icon: "ci-Map",
        text: "Explore It"
    }
];

let ads2 = ads.slice( 0, 2 );
let ads3 = ads.slice( 0, 3 );
let ads4 = ads.slice( 0, 4 );
let ads6 = ads;

export const ads2Args = {
    ads: ads2
};
export const ads3Args = {
    ads: ads3
};
export const ads4Args = {
    ads: ads4
};
export const ads6Args = {
    ads: ads6
};

Ads_2.args = ads2Args;
Ads_3.args = ads3Args;
Ads_4.args = ads4Args;
Ads_6.args = ads6Args;


