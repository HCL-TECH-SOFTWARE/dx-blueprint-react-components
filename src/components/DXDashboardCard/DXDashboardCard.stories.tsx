/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */
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

