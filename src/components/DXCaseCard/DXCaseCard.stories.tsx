import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXCaseCard from './DXCaseCard';

export default {
    title: "Components/Cards/Case Card",
    component: DXCaseCard,
    excludeStories: /.*Args$/,
} as Meta<typeof DXCaseCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXCaseCard> = ( args ) => <DXCaseCard {...args} />;

export const Default = Template.bind( {} );
export const CustomColorLabel = Template.bind( {} );

export const caseCardArgs = {
    title: "#0000-General Review of Year 2022",
    subtitle: "HR",
    label: {
        label: "Label Text",
    },
    options: [
        {
            label: "Option 1",
            onClick: function () { console.log( "Option 1 called" ); }
        },
        {
            label: "Option 2",
            onClick: function () { console.log( "Option 2 called" ); }
        },
        {
            label: "Option 3",
            onClick: function () { console.log( "Option 3 called" ); }
        },
    ]
};

Default.args = caseCardArgs;
CustomColorLabel.args = {
    ...caseCardArgs,
    label: {
        label: "label text",
        color: "var(--danger-danger)"
    }
};

export const DropdownOpened = Template.bind( {} );
DropdownOpened.storyName = "Default Version Dropdown Opened";
DropdownOpened.args = {
    ...caseCardArgs,
    dropdownOpen: true,
};
