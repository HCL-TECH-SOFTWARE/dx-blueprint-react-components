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


