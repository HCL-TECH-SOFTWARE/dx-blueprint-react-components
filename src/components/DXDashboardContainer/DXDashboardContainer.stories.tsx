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
import DXDashboardContainer, { DashboardContainerProps } from "./DXDashboardContainer";
import DXHeroBanner from "../DXHeroBanner/DXHeroBanner";
import { HeroBannerDefaultArgs } from "../DXHeroBanner/DXHeroBanner.stories";
import DXCardButtonCatalog from "../DXCardButtonCatalog/DXCardButtonCatalog";
import { arr10Args } from "../DXCardButtonCatalog/DXCardButtonCatalog.stories";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Custom/Dashboard Container",
    component: DXDashboardContainer,
    excludeStories: /.*Args$/,
} as Meta<typeof DXDashboardContainer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<DashboardContainerProps> = ( args ) => <DXDashboardContainer {...args} />;

export const Main = Template.bind( {} );
export const Collapsible = Template.bind( {} );
export const CustomCollapsible = Template.bind( {} );
export const StringChild = Template.bind( {} );
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const DashboardContainerArgs: DashboardContainerProps = {
    title: "Title",
    icons: {
        header: "ci-Globe",
    },
    link: {
        label: "Header link",
        url: "www.hcl-software.com"
    },
    elements: [
        {
            subtitle: "Title for content 1",
            reactChild: <DXHeroBanner {...HeroBannerDefaultArgs} />,
        },
    ],
    primaryButton: {
        label: "Primary",
        onClick: () => { console.log( 'Primary' ); }
    },
    secondaryButton: {
        label: "Secondary",
        onClick: () => { console.log( 'Secondary' ); }
    },
    borderlessButton: {
        label: "Borderless",
        onClick: () => { console.log( 'Borderless' ); }
    },
    badge: "123"
};

Main.args = DashboardContainerArgs;
export const CollapsibleArgs = Collapsible.args = {
    title: "Title",
    icons: {
        header: "ci-Globe",
    },
    elements: [
        {
            subtitle: "Title for content 1",
            reactChild: <DXHeroBanner {...HeroBannerDefaultArgs} />,
        },
        {
            subtitle: "Title for content 2",
            collapsible: true,
            reactChild: <DXCardButtonCatalog
                elements={arr10Args}
                variant="slider"
            />
        }
    ],
    primaryButton: {
        label: "Primary",
        onClick: () => { console.log( 'Primary' ); }
    },
    secondaryButton: {
        label: "Secondary",
        onClick: () => { console.log( 'Secondary' ); }
    },
    borderlessButton: {
        label: "Borderless",
        onClick: () => { console.log( 'Borderless' ); }
    }
};

export const CustomCollapsibleArgs: DashboardContainerProps = {
    title: "Custom Collapsible settings",
    icons: {
        collapse: "ci-Arrow_Down_MD"
    },
    elements: [
        {
            reactChild: <DXHeroBanner {...HeroBannerDefaultArgs} />,
            showCollapsedOverlay: false,
            collapsible: true,
            collapsedHeigh: "150px"
        }
    ]
};
CustomCollapsible.args = CustomCollapsibleArgs;

export const StringChildArgs = StringChild.args = {
    title: "Title",
    elements: [
        {
            customChild: {
                type: "DXHeroBanner",
                props: {
                    header: "Welcome!",
                    subheader: "Learn all about react",
                    index: 0,
                    background: {
                        opacity: "light",
                        url: "https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
                    },
                    foreground: {
                        image: "https://cdn.pixabay.com/photo/2022/10/24/11/00/moscow-city-7543127_1280.png",
                        alt: "Hero banner with foreground image",
                    }
                }
            }
        }
    ]
};
