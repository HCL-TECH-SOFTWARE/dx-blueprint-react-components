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
import DXTicker, { TickerProps } from "./DXTicker";
import moment from "moment";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Custom/Ticker",
    component: DXTicker,
    excludeStories: /.*Args$/,
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<TickerProps> = ( args ) => <DXTicker {...args} />;

export const Ticker = Template.bind( {} );
export const ChangedIcons = Template.bind( {} );
export const DefaultEmptyTicker = Template.bind( {} );
export const CustomEmptyTicker = Template.bind( {} );
export const CustomCurrencySymbol = Template.bind( {} );
// More on args: https://storybook.js.org/docs/react/writing-stories/args

let time = moment().toISOString();

export const emptyTickerArgs: TickerProps = {
    items: [],
};

export const customEmptyArgs: TickerProps = {
    empty: {
        image: {
            url: "https://images.unsplash.com/photo-1516382799247-87df95d790b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1748&q=80",
            altText: "empty-view"
        },
        title: "Error!",
        text: "Reload the page or try again later."
    },
    items: [],
};

export const CustomCurrencySignArgs: TickerProps = {
    currencySymbol: "€",
    items: [
        {
            name: "BMV",
            broker: "MGM",
            price: 43.50,
            percentage: 0.52,
            dateTime: time,
            link: {
                url: "www.hcl-software.com",
                label: "Link"
            }
        },],

};

export const TickerArgs: TickerProps = {
    items: [
        {
            name: "BMV",
            broker: "MGM",
            price: 43.50,
            percentage: 0.52,
            dateTime: time,
            link: {
                url: "www.hcl-software.com",
                label: "Link 1",
                target: "_blank"
            }
        },
        {
            name: "NYSE",
            broker: "MGM",
            price: 23.50,
            percentage: -0.52,
            dateTime: time,
            link: {
                url: "www.hcl-software.com",
                label: "Link 2"
            }
        },
        {
            name: "NASDAQ",
            broker: "MGM",
            price: 850.84,
            percentage: 0,
            dateTime: time,
            link: {
                url: "www.hcl-software.com",
                label: "Link 3"
            }
        }
    ],
};

Ticker.args = TickerArgs;
ChangedIcons.args = {
    ...TickerArgs,
    icons: {
        up: "ci-Chevron_Up_Duo",
        down: "ci-Chevron_Down_Duo",
        link: "ci-Arrow_Right_MD"
    }
};
DefaultEmptyTicker.args = emptyTickerArgs;
CustomEmptyTicker.args = customEmptyArgs;
CustomCurrencySymbol.args = CustomCurrencySignArgs;
