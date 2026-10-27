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
import DXTickerMenu, { TickerMenuProps } from "./DXTickerMenu";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Custom/Ticker Menu",
    component: DXTickerMenu,
    excludeStories: /.*Args$/,
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<TickerMenuProps> = ( args ) => <DXTickerMenu {...args} />;

export const TickerMenu = Template.bind( {} );
export const ChangedIcons = Template.bind( {} );
export const DefaultEmptyTicker = Template.bind( {} );
export const CustomEmptyTicker = Template.bind( {} );
export const CustomCurrencySymbol = Template.bind( {} );

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const TickerMenuArgs: TickerMenuProps = {
    items: [
        {
            name: "BMV",
            broker: "MGM",
            price: 43.50,
            percentage: 0.52,
            link: {
                label: "View more details",
                url: "www.hcl-software.com",
                target: "_self"
            }
        },
        {
            name: "NYSE",
            broker: "MGM",
            price: 43.50,
            percentage: -0.52,
            link: {
                label: "",
                url: "www.hcl-software.com"
            }
        },
        {
            name: "NASDAQ",
            broker: "MGM",
            price: 43.50,
            percentage: 0,
            link: {
                label: "",
                url: "www.hcl-software.com"
            }
        }
    ],
};

export const NoItemExampleArgs: TickerMenuProps = {
    items: [],
};

export const customEmptyArgs: TickerMenuProps = {
    empty: {
        image: {
            url: "https://images.unsplash.com/photo-1516382799247-87df95d790b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1748&q=80",
            altText: "empty-view"
        },
        title: "Error!",
    },
    items: [],
};

export const CustomCurrencySymbolArgs: TickerMenuProps = {
    currencySymbol: "€",
    items: [
        {
            name: "BMV",
            broker: "MGM",
            price: 43.50,
            percentage: 0.52,
            link: {
                url: "www.hcl-software.com",
                label: "Link"
            }
        },],

};

TickerMenu.args = TickerMenuArgs;
ChangedIcons.args = {
    ...TickerMenuArgs,
    icons: {
        up: "ci-Chevron_Up_Duo",
        down: "ci-Chevron_Down_Duo",
        link: "ci-Arrow_Right_MD"
    }
};
DefaultEmptyTicker.args = NoItemExampleArgs;
CustomEmptyTicker.args = customEmptyArgs;
CustomCurrencySymbol.args = CustomCurrencySymbolArgs;
