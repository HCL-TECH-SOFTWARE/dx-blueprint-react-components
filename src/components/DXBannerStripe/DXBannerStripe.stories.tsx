import React, { FormEventHandler } from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXBannerStripe, { BannerStripeProps } from "./DXBannerStripe";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Home Page/Banner Stripe",
    component: DXBannerStripe,
    excludeStories: /.*Args$/,
} as Meta;

let handleSubmit: FormEventHandler<Element> = ( e ) => {
    e.preventDefault();
    alert( 'You clicked submit.' );
};

const Template: StoryFn<BannerStripeProps> = ( args ) => <DXBannerStripe {...args} />;

export const BannerStripeDefault = Template.bind( {} );
export const BannerStripeImage = Template.bind( {} );
export const BannerStripeCountdown = Template.bind( {} );
export const BannerStripeVideo = Template.bind( {} );

export const BannerStripeDefaultArgs: BannerStripeProps = {
    index: 1,
    header: "Banner Stripe header",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    buttons: [
        {
            label: "Click me!",
            onClick: handleSubmit,
        },
        {
            label: "Submit",
            onClick: handleSubmit,
        }
    ],
    background: {
        gradient: false,
        url: "https://images.unsplash.com/photo-1530543787849-128d94430c6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
    }
};

export const BannerStripeImageArgs: BannerStripeProps = {
    index: 2,
    header: "Banner Stripe header",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    background: {
        gradient: true
    },
    buttons: [
        {
            label: "Click me!",
            onClick: handleSubmit,
        },
        {
            label: "Submit",
            onClick: handleSubmit,
        }
    ],
    foreground: {
        image: "https://cdn.pixabay.com/photo/2022/10/24/11/00/moscow-city-7543127_1280.png",
        alt: "Banner Stripe with foreground image"
    }
};
let storyDate = new Date();
storyDate.setDate( storyDate.getDate().valueOf() + 15 );

export const BannerStripeCountdownArgs: BannerStripeProps = {
    index: 3,
    header: "Banner Stripe header",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    textPosition: "left",
    background: {
        url: "https://images.unsplash.com/photo-1548685913-fe6678babe8d?q=80&w=2876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    buttons: [
        {
            label: "Click me!",
            onClick: handleSubmit,
        },
        {
            label: "Submit",
            onClick: handleSubmit,
        }
    ],
    foreground: {
        countdown: {
            date: `${storyDate.getFullYear()}-${storyDate.getMonth().valueOf() + 1}-${storyDate.getDate()}`,
            showSeconds: true,
            textColor: "#00012b"
        }
    },
    textColor: "#00012b"
};

export const BannerStripeVideoArgs: BannerStripeProps = {
    index: 4,
    header: "Banner Stripe header",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    buttons: [
        {
            label: "Click me!",
            onClick: handleSubmit,
        },
        {
            label: "Submit",
            onClick: handleSubmit,
        }
    ],
    foreground: {
        video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    background: {
        gradient: true
    }
};

BannerStripeDefault.args = BannerStripeDefaultArgs;
BannerStripeImage.args = BannerStripeImageArgs;
BannerStripeCountdown.args = BannerStripeCountdownArgs;
BannerStripeVideo.args = BannerStripeVideoArgs;
