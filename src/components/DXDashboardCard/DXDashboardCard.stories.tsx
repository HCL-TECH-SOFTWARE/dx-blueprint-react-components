import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXDashboardCard, { DashboardCardProps } from "./DXDashboardCard";

export default {
    title: "Components/Cards/Dashboard Card",
    component: DXDashboardCard,
    excludeStories: /.*Args$/,
} as Meta<typeof DXDashboardCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXDashboardCard> = ( args ) => <DXDashboardCard {...args} />;

export const dashboardCard = Template.bind( {} );
export const dashboardCardSmall = Template.bind( {} );

export const cardsArgs: DashboardCardProps = {
    index: 1,
    data: "$9999",
    label: "Amount and value",
    mainIcon: "ci-Calendar_Days",
    secondaryIcon: "ci-Chevron_Right",
    onClick: () => {}
};

export const cardSmallArgs: DashboardCardProps = {
    index: 2,
    data: "$9756",
    label: "Amount and present value",
    onClick: () => {}
};

dashboardCard.args = cardsArgs;
dashboardCardSmall.args = cardSmallArgs;

