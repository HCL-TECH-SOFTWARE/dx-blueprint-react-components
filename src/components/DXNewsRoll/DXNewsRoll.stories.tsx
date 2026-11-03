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
import DXNewsRoll, { NewsRollProps } from "./DXNewsRoll";;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/General/News Roll",
    component: DXNewsRoll,
    excludeStories: /.*Args$/,
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<NewsRollProps> = ( args ) => <DXNewsRoll {...args} />;
const ShortSizeTemplate: StoryFn<NewsRollProps> = ( args ) => <div style={{ height: "95vh", background: "#b3cdff" }}><DXNewsRoll {...args} /></div>;

export const NewsRoll = Template.bind( {} );
export const ShortSizeExample = ShortSizeTemplate.bind( {} );
export const ChangedIcon = Template.bind( {} );

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const NewsRollArgs: NewsRollProps = {
    newsRollItems: [
        {
            label: "News title here, four lines then ellipsis",
            url: "www.hcl-software.com",
            target: "_self",
            primaryImage: {
                url: "https://images.unsplash.com/photo-1612278675615-7b093b07772d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
                altText: "Bridge to an island",
            },
            secondaryImage: {
                url: "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=926&q=80",
                altText: "Beach landscape"
            }
        },
        {
            label: "News title here, four lines then ellipsis Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            url: "www.hcl-software.com",
            primaryImage: {
                url: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80",
            },
            secondaryImage: {
                url: "https://images.unsplash.com/photo-1476900543704-4312b78632f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            }
        },
        {
            label: "News title here, four lines then ellipsis",
            url: "www.hcl-software.com",
            primaryImage: {
                url: "https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            }
        }
    ]


};

NewsRoll.args = NewsRollArgs;
ShortSizeExample.args = NewsRollArgs;
ChangedIcon.args = {
    ...NewsRollArgs,
    icons: {
        link: "ci-Chevron_Right_MD"
    }
};
