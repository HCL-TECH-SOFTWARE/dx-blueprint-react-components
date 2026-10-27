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

import React from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXPieChart, { PieProps } from "./DXPieChart";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/General/Pie Chart",
    component: DXPieChart,
    excludeStories: /.*Args$/,
} as Meta<typeof DXPieChart>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<PieProps> = ( args ) => <DXPieChart {...args} />;

export const PieChart = Template.bind( {} );
export const ShowNominals = Template.bind( {} );

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const PieChartArgs: PieProps = {
    index: 1,
    data: [
        {
            name: "Food",
            value: 352,
            color: "#fea310"
        },
        {
            name: "Services",
            value: 265,
            color: "blue"
        },
        {
            name: "Entertainment",
            value: 120,
            color: "green"
        },
        {
            name: "Other",
            value: 78,
        }

    ]
};
let ShowNominalsArgs: PieProps = {
    index: 2,
    data: PieChartArgs.data,
    showNominal: true,
    prefix: "$"
};

PieChart.args = PieChartArgs;
ShowNominals.args = ShowNominalsArgs;
