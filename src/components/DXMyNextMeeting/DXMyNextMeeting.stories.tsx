import React from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXMyNextMeeting, { NextMeetingProps } from "./DXMyNextMeeting";
import moment from "moment";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/General/My Next Meeting",
    component: DXMyNextMeeting,
    excludeStories: /.*Args$/,
} as Meta<typeof DXMyNextMeeting>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<NextMeetingProps> = ( args ) => <DXMyNextMeeting {...args} />;

export const MyNextMeeting = Template.bind( {} );
export const MyNextMeetingChangedIcons = Template.bind( {} );
// More on args: https://storybook.js.org/docs/react/writing-stories/args

let startTime = moment().add( 1, "hours" ).toISOString();
let endTime = moment().add( 2, "hours" ).toISOString();

export const MyNextMeetingArgs: NextMeetingProps = {
    title: "Meeting title",
    startDateTime: startTime,
    endDateTime: endTime,
    link: {
        label: "Unused",
        url: "https://hcl-software.com/",
        target: "_blank"
    },
};

export const MyNextMeetingChangedIconsArgs: NextMeetingProps = {
    ...MyNextMeetingArgs,
    icons: {
        event: "ci-Calendar_Days",
        link: "ci-Arrow_Right_MD"
    }
};

MyNextMeeting.args = MyNextMeetingArgs;
MyNextMeetingChangedIcons.args = MyNextMeetingChangedIconsArgs;
