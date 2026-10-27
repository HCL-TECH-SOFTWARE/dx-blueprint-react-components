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
import DXPortalAlerts, { PortalAlertsProps } from "./DXPortalAlerts";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/General/Portal Alerts",
    component: DXPortalAlerts,
    excludeStories: /.*Args$/,
} as Meta<typeof DXPortalAlerts>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<PortalAlertsProps> = ( args ) => <DXPortalAlerts {...args} />;

export const GeneralAlert = Template.bind( {} );
export const SuccessAlert = Template.bind( {} );
export const ErrorAlert = Template.bind( {} );
export const WarnAlert = Template.bind( {} );
export const HideLink = Template.bind( {} );
export const ChangedIcon = Template.bind( {} );

// More on args: https://storybook.js.org/docs/react/writing-stories/args

export var AlertArgs = {
    title: "The title explains the current status of a system, a microsite, or any other alert we need to comunicate",
    link: {
        url: "https://www.hcl-software.com/",
        label: "Learn more",
    },
};

GeneralAlert.args = { type: "general", ...AlertArgs } as PortalAlertsProps;
SuccessAlert.args = { type: "success", ...AlertArgs } as PortalAlertsProps;
ErrorAlert.args = { type: "error", ...AlertArgs } as PortalAlertsProps;
WarnAlert.args = { type: "warning", ...AlertArgs } as PortalAlertsProps;
HideLink.args = { type: "general", hideLink: true, ...AlertArgs } as PortalAlertsProps;
ChangedIcon.args = { type: "general", hideLink: true, ...AlertArgs, iconClass: "ci-User_Circle" } as PortalAlertsProps;


