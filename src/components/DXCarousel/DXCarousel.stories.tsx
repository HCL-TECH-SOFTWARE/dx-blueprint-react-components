import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXCarousel, { CarouselProps } from './DXCarousel';

export default {
    title: "Components/Home Page/Carousel",
    component: DXCarousel,
    excludeStories: /.*Args$/,
} as Meta<typeof DXCarousel>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXCarousel> = ( args ) => <DXCarousel {...args} />;

export const CarouselSmall = Template.bind( {} );
export const CarouselMedium = Template.bind( {} );
export const CarouselBig = Template.bind( {} );
export const CarouselOverflow = Template.bind( {} );

export const itemsArgs = [
    {
        image: {
            url: "https://images.unsplash.com/photo-1660113567510-1fb1d59a5d33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            altText: "card-1"
        },
        title: "The title goes here and it is recommended to be 2 line max",
        subtitle: "Subtitle goes here",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        button: {
            label: "Learn more",
            onClick: ( e: any ) => console.log( e )
        }
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1659380139642-690af1567639?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1828&q=80",
            altText: "card-2"
        },
        title: "The title 2 goes here and it is recommended to be 2 line max",
        subtitle: "Subtitle 2 goes here",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
        button: {
            label: "Learn Deeper",
            onClick: ( e: any ) => console.log( e )
        }
    }
];

export const itemModifiedArgs = [
    {
        image: {
            url: "https://images.unsplash.com/photo-1660113567510-1fb1d59a5d33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            altText: "card-1"
        },
        title: "The title goes here and it is recommended to be 2 line max",
        subtitle: "Subtitle goes here",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis nato",
        button: {
            label: "Learn more",
            onClick: ( e: any ) => console.log( e )
        }
    },
    {
        image: {
            url: "https://images.unsplash.com/photo-1659380139642-690af1567639?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1828&q=80",
            altText: "card-2"
        },
        title: "The title 2 goes here and it is recommended to be 2 line max",
        subtitle: "Subtitle 2 goes here",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis nato",
        button: {
            label: "Learn Deeper",
            onClick: ( e: any ) => console.log( e )
        }
    }
];

const carouselSmall: CarouselProps = {
    items: itemsArgs,
    size: "small"
};

const carouselBig: CarouselProps = {
    items: itemsArgs,
    size: "big"
};

const carouselMedium: CarouselProps = {
    items: itemsArgs,
    size: "medium"
};

const carouselOverflow: CarouselProps = {
    items: itemModifiedArgs,
    size: "big"
};

CarouselSmall.args = carouselSmall;
CarouselBig.args = carouselBig;
CarouselMedium.args = carouselMedium;
CarouselOverflow.args = carouselOverflow;
