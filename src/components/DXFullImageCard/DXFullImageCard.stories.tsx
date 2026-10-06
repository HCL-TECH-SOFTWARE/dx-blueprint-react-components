import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXFullImageCard from './DXFullImageCard';
import "./DXFullImageCardStories.scss";

export default {
    title: "Components/Cards/Full Image Card",
    component: DXFullImageCard,
    excludeStories: /.*Args$/,
} as Meta<typeof DXFullImageCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXFullImageCard> = ( args ) => <DXFullImageCard {...args} />;
const PromoBannerTemplate: StoryFn<typeof DXFullImageCard> = ( args ) => (
    <div id='promo-banner' style={{ height: '155px', width: '352px' }}>
        <DXFullImageCard {...args} />
    </div>
);
export const DefaultCard = Template.bind( {} );
export const OverflowCard = Template.bind( {} );
export const NoImage = Template.bind( {} );
export const PromoBanner = PromoBannerTemplate.bind( {} );

export const fullImageArgs = {
    image: {
        url: "https://images.unsplash.com/photo-1565716665452-2a4e3445b378?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
        altText: "Paradaise"
    },
    subtitle: "2023/06/13",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
    link: "https://hcl-software.com/",
    dateFormat: "YY/MM/DD"
};

DefaultCard.args = {
    ...fullImageArgs
};
OverflowCard.args = {
    ...fullImageArgs,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus"
};
NoImage.args = {
    subtitle: "2023/06/13",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident vitae vero minus",
    link: "https://hcl-software.com/",
    dateFormat: "YY/MM/DD"
};
PromoBanner.args = {
    image: {
        url: "https://images.unsplash.com/photo-1565716665452-2a4e3445b378?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
        altText: "Paradaise"
    },
    subtitle: "Find new job opportunities",
    description: "Job Openings",
    link: "https://hcl-software.com/",
};
