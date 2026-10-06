import React from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXHeroBannerCarousel, { HeroBannerCarouselProps } from "./DXHeroBannerCarousel";
import { HeroBannerDefaultArgs, HeroBannerVideoArgs } from "../DXHeroBanner/DXHeroBanner.stories";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Home Page/Hero Banner Carousel",
    component: DXHeroBannerCarousel,
    excludeStories: /.*Args$/,
} as Meta<typeof DXHeroBannerCarousel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<any> = ( args ) => <DXHeroBannerCarousel {...args} />;

export const HeroBannerCarousel = Template.bind( {} );
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const HeroBannerCarouselArgs: HeroBannerCarouselProps = {
    index: 1,
    items: [
        HeroBannerDefaultArgs,
        {
            ...HeroBannerDefaultArgs,
            index: 7,
            textAlign: "right",
            foreground: {
                image: HeroBannerDefaultArgs.foreground?.image as string,
                alignment: "left"
            }
        },
        HeroBannerVideoArgs
    ]
};

HeroBannerCarousel.args = HeroBannerCarouselArgs;
