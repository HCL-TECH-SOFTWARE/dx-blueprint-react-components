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
