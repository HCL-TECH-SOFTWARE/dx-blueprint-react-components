import React from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXOnboarding, { OnboardingProps } from "./DXOnboarding";
import DXNavigationHeader from "../DXNavigationHeader";
import { NavigationArgs } from "../DXNavigationHeader/DXNavigationHeader.stories";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Onboarding and Wizards/Onboarding",
    component: DXOnboarding,
    excludeStories: /.*Args$/,
} as Meta<typeof DXOnboarding>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: StoryFn<OnboardingProps> = ( args ) => {
    return (
        <>
            <DXNavigationHeader {...NavigationArgs} active={-1}></DXNavigationHeader>
            <DXOnboarding {...args} />
        </>
    );
};

export const Onboarding = Template.bind( {} );
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const OnboardingArgs: OnboardingProps = {
    onComplete: () => { console.log( "Onboarding completed!" ); },
    showBullets: true,
    steps: [
        {
            title: "Page navigation",
            element: ".dxNavigationHeader",
            intro: "<div>This is the main navigation for the page.</div>",
            position: "auto",
        },
        {
            title: "Page navigation",
            element: '.dxNavigationHeader__search',
            intro: 'Use this field to search any term inside the page.',
            position: 'left',
        },
        {
            title: "Page navigation",
            element: '.dxNavigationHeader__primaryLinks',
            position: 'right',
            intro: 'Here you will see all the main pages for this site.',
        },
        {
            title: "Page navigation",
            element: ".nav-item:nth-of-type(2)",
            intro: 'Pages with a <i class="ci-Caret_Down_MD"></i> are clickable and will open a menu.',
            position: 'right',
            onNextClick: () => {
                ( document.querySelectorAll( ".dxNavigationHeader .nav-link" )[1] as HTMLElement ).click();
            },
        },
        {
            title: "Page navigation",
            element: ".tab-pane.active",
            intro: 'In this menu you will see all secondary pages and third level pages.',
            position: 'right'
        },
        {
            element: ".dxQuickLinks",
            title: "Quicklinks",
            intro: "This is the <b>Quicklinks Section</b>",
        },
        {
            element: ".body",
            title: "That's all!",
            intro: `
                    <div>
                        <h3>Thank you for following this guide!</h3>
                        <div style="display:flex;">
                            <p style="width:auto">Click the <b>Done</b> button to start using this page.</p>
                            <img style="width:200px" src="https://images.unsplash.com/photo-1657819466043-2a4ae992f03f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80"></img>
                        </div>
                    <div>`,
        }
    ]
};

Onboarding.args = OnboardingArgs;
