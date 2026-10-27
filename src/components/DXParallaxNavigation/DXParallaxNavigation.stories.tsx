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
import DXParallaxNavigation, { ParallaxNavigationProps } from "./DXParallaxNavigation";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Navigation/Parallax Navigation",
    component: DXParallaxNavigation,
    excludeStories: /.*Args$/,
} as Meta<typeof DXParallaxNavigation>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<ParallaxNavigationProps> = ( args ) => <DXParallaxNavigation {...args} />;

const TemplateWithBlocks: StoryFn<ParallaxNavigationProps> = ( args ) => (
    <>
        <DXParallaxNavigation {...args} />
        <div data-testid="right" className="dxParallaxNavigation">
            <div>
                <div style={{ backgroundColor: 'cornflowerblue', height: '800px' }} id="dashboard" data-testid="dashboardBlock" className="block">
                    <h2>My Dashboard</h2>
                </div>
                <div style={{ backgroundColor: 'darkseagreen', height: '800px' }} id="events" data-testid="eventsBlock" className="block">
                    <h2>My Events</h2>
                </div>
                <div style={{ backgroundColor: 'indianred', height: '800px' }} id="feature" data-testid="featureBlock" className="block">
                    <h2>My Features</h2>
                </div>
            </div>
        </div>
    </>
);

export const DefaultImplementation = Template.bind( {} );
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const DefaultImplementationArgs: ParallaxNavigationProps = {
    items: [
        {
            icon: "ci-Cloud_Check",
            link: { label: "My Dashboard", target: "", url: "dxParallaxContentBlockDashboard" },
        },
        {
            icon: "ci-Note",
            link: { label: "My Events", target: "", url: "dxParallaxContentBlockEvents" },
        },
        {
            icon: "ci-Calendar_Event",
            link: { label: "My Features", target: "", url: "dxParallaxContentBlockFeature" },
        }
    ]
};

DefaultImplementation.args = DefaultImplementationArgs;

export const CompleteImplementation = TemplateWithBlocks.bind( {} );
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const CompleteImplementationArgs: ParallaxNavigationProps = {
    items: [
        {
            icon: "ci-Cloud_Check",
            link: { label: "My Dashboard", target: "", url: "dashboard" },
        },
        {
            icon: "ci-Note",
            link: { label: "My Events", target: "", url: "events" },
        },
        {
            icon: "ci-Calendar_Event",
            link: { label: "My Features", target: "", url: "feature" },
        }
    ],
    position: 'right'
};

CompleteImplementation.args = CompleteImplementationArgs;
