import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXEmptyState, { EmptyStateProps } from "./DXEmptyState";

export default {
    title: "Components/General/Empty State",
    component: DXEmptyState,
    excludeStories: /.*Args$/,
} as Meta<typeof DXEmptyState>;

const Template: StoryFn<typeof DXEmptyState> = ( args ) => {
    return (
        <div style={{ minHeight: "250px" }}>
            <DXEmptyState {...args} />
        </div >
    );
};

export const Default = Template.bind( {} );
export const WithButtons = Template.bind( {} );

export const DefaultArgs = {
    title: "You don’t have any Saved Links",
    text: 'Save links by clicking on the "Add to My Links" button.',
    image: {
        url: "./docs/how-to/storybook-documents/DXMySavedLinks/Empty-State.png",
        altText: "empty-view"
    }
} as EmptyStateProps;

export const WithButtonsArgs = {
    title: "You don’t have any Saved Links",
    text: 'Save links by clicking on the "Add to My Links" button.',
    image: {
        url: "./docs/how-to/storybook-documents/DXMySavedLinks/Empty-State.png",
        altText: "empty-view"
    },
    primaryButton: {
        label: "Regular button",
        onClick: function () {
            console.log( "I was called" );
        },
        icon: {
            class: "ci-Add_Plus",
            position: "right"
        }
    },
    secondaryButton: {
        label: "New",
        onClick: function () {
            console.log( "I was called" );
        }
    }
} as EmptyStateProps;


Default.args = DefaultArgs;
WithButtons.args = WithButtonsArgs;


