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
import DXHeroBannerStacking, { HBStackingProps } from "./DXHeroBannerStacking";
import { HeroBannerDefaultArgs, HeroBannerVideoArgs } from "../DXHeroBanner/DXHeroBanner.stories";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Home Page/Hero Banner Stacking",
    component: DXHeroBannerStacking,
    excludeStories: /.*Args$/,
} as Meta<typeof DXHeroBannerStacking>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<HBStackingProps> = ( args ) =>
    <>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut neque quis nulla tempor accumsan. Integer luctus tortor euismod nisl cursus aliquam. Curabitur facilisis neque in convallis facilisis. Quisque convallis odio in pharetra luctus. Etiam et tortor neque. Praesent congue quis sem sed suscipit. Sed nunc ex, tincidunt vitae condimentum nec, aliquet at velit. Ut dictum lobortis viverra. Donec dapibus consectetur pretium. Vestibulum eu mattis lectus.
            Curabitur tristique gravida dui vel ultricies. Morbi finibus eu ligula quis ullamcorper. Sed ex ligula, molestie at efficitur et, ullamcorper ac eros. Praesent convallis a neque sed bibendum. Sed eleifend enim posuere dui faucibus lacinia. Cras gravida a ex et faucibus. Suspendisse accumsan massa at erat tincidunt venenatis. Curabitur scelerisque, metus quis volutpat lacinia, purus urna efficitur leo, quis faucibus augue tellus nec est. Quisque maximus cursus porta. Nam semper felis ullamcorper venenatis dapibus.
            In hac habitasse platea dictumst. Sed aliquam eu lorem vitae venenatis. Proin at diam eget elit tempus interdum. Cras vehicula vestibulum mi, quis porta nulla mattis sed. Mauris libero mauris, ultricies at odio non, consectetur convallis nulla. Nulla consequat sollicitudin neque, eu viverra massa semper non. Sed pellentesque est in erat tristique malesuada. Mauris a eros in massa aliquet tempus. Morbi sagittis odio id est sollicitudin vestibulum. Morbi at feugiat velit, non egestas ligula. Quisque mollis eu felis vitae gravida. Vestibulum tristique condimentum ante, sit amet auctor libero pretium sit amet.
        </p>
        <DXHeroBannerStacking {...args} />
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut neque quis nulla tempor accumsan. Integer luctus tortor euismod nisl cursus aliquam. Curabitur facilisis neque in convallis facilisis. Quisque convallis odio in pharetra luctus. Etiam et tortor neque. Praesent congue quis sem sed suscipit. Sed nunc ex, tincidunt vitae condimentum nec, aliquet at velit. Ut dictum lobortis viverra. Donec dapibus consectetur pretium. Vestibulum eu mattis lectus.
            Curabitur tristique gravida dui vel ultricies. Morbi finibus eu ligula quis ullamcorper. Sed ex ligula, molestie at efficitur et, ullamcorper ac eros. Praesent convallis a neque sed bibendum. Sed eleifend enim posuere dui faucibus lacinia. Cras gravida a ex et faucibus. Suspendisse accumsan massa at erat tincidunt venenatis. Curabitur scelerisque, metus quis volutpat lacinia, purus urna efficitur leo, quis faucibus augue tellus nec est. Quisque maximus cursus porta. Nam semper felis ullamcorper venenatis dapibus.
            In hac habitasse platea dictumst. Sed aliquam eu lorem vitae venenatis. Proin at diam eget elit tempus interdum. Cras vehicula vestibulum mi, quis porta nulla mattis sed. Mauris libero mauris, ultricies at odio non, consectetur convallis nulla. Nulla consequat sollicitudin neque, eu viverra massa semper non. Sed pellentesque est in erat tristique malesuada. Mauris a eros in massa aliquet tempus. Morbi sagittis odio id est sollicitudin vestibulum. Morbi at feugiat velit, non egestas ligula. Quisque mollis eu felis vitae gravida. Vestibulum tristique condimentum ante, sit amet auctor libero pretium sit amet.
        </p>
    </>;

export const HeroBannerStacking = Template.bind( {} );
export const ChangeMarginAndOffset = Template.bind( {} );
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const HeroBannerStackingArgs: HBStackingProps = {
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

export const HBStackingAltArgs: HBStackingProps = {
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
    ],
    stackTopOffset: "1.25rem",
    cardMargin: "0px"
};

HeroBannerStacking.args = HeroBannerStackingArgs;
ChangeMarginAndOffset.args = HBStackingAltArgs;
