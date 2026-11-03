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
import DXProductSlider, { ProductSliderProps } from "./DXProductSlider";

const customViewports = {
    productSliderMobile: {
        name: "Product Slider Mobile",
        styles: {
            width: "390px",
            height: "971px"
        }
    }
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Lists, Catalogs, and Filters/Product Slider",
    component: DXProductSlider,
    excludeStories: /.*Args$/,
    parameters: {
        layout: "fullscreen",
        docs: {
            story: {
                inline: true,
                iframeHeight: 920
            }
        }
    }
} as Meta<typeof DXProductSlider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<ProductSliderProps> = ( args: ProductSliderProps ) => (
    <div className="dxProductSliderStoryFrame">
        <DXProductSlider {...args} />
    </div>
);

const MobileTemplate: StoryFn<ProductSliderProps> = ( args: ProductSliderProps ) => (
    <div className="dxProductSliderStoryFrame dxProductSliderStoryFrame--mobile">
        <DXProductSlider {...args} />
    </div>
);

export const ProductSlider = Template.bind( {} );
export const ChangedIcons = Template.bind( {} );
export const MobileVariant = MobileTemplate.bind( {} );

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const ProductSliderArgs: ProductSliderProps = {
    items: [
        {
            category: "Subtitle 1",
            title: "Hyperjump: Astronauts are now falling with style.",
            body: "A revolutionary concept in interplanetary transportation, defies conventional space travel. Astronauts are propelled from a launchpad through wormholes in space, instantly covering light-years to their destination. With no spacecraft required, they arrive on new terrain, feet first.",
            image: {
                url: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2948&q=80"
            },
            button: {
                label: "Learn more",
                onClick: () => { console.log( "Clicked!" ); },
                icon: {
                    class: "ci-Chevron_Right",
                    position: "right"
                }
            }
        },
        {
            category: "Subtitle 2",
            title: "Earthrise selfie on the Moon goes viral.",
            body: "When an astronaut's Earthrise selfie, taken on the moon, goes viral, it becomes a global sensation. This heartwarming story explores how a simple photograph can unite people worldwide, rekindling a sense of wonder and appreciation for our planet and the boundless possibilities of space exploration.",
            image: {
                url: "https://images.unsplash.com/photo-1541873676-a18131494184?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2662&q=80"
            },
            button: {
                label: "Learn more",
                onClick: () => { console.log( "Clicked!" ); },
                icon: {
                    class: "ci-Chevron_Right",
                    position: "right"
                }
            }
        },
        {
            category: "Subtitle 3",
            title: "Exiled from Mars",
            body: "In a surprising turn of events, an astronaut has been exiled from a Martian colony due to their disruptive behavior. Discover what are the stringent conduct standards in place and the consequences for those who breach them.",
            image: {
                url: "https://images.unsplash.com/photo-1634176866089-b633f4aec882?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80"
            },
            button: {
                label: "Learn more",
                onClick: () => { console.log( "Clicked!" ); },
                icon: {
                    class: "ci-Chevron_Right",
                    position: "right"
                }
            }
        }
    ]
};

export const ProductSliderChangedIconsArgs = {
    ...ProductSliderArgs,
    icons: {
        scroll: "ci-Arrow_Circle_Down"
    }
};


ProductSlider.args = ProductSliderArgs;
ChangedIcons.args = ProductSliderChangedIconsArgs;

MobileVariant.args = {
    ...ProductSliderArgs,
    forceMobile: true
};
MobileVariant.parameters = {
    docs: {
        story: {
            iframeHeight: 971
        }
    },
    viewport: {
        viewports: customViewports,
        defaultViewport: "productSliderMobile"
    }
};
