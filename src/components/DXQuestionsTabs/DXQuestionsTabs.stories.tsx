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
import { Meta, StoryFn } from "@storybook/react-webpack5";
import DXQuestionsTabs, { DXQuestionsTabsProps, DXQuestionsTabsQuestion } from "./DXQuestionsTabs";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Home Page/Questions Tabs",
    component: DXQuestionsTabs,
    excludeStories: /.*Args$/,
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXQuestionsTabs> = ( args ) => <DXQuestionsTabs {...args} />;

export const SimpleExample = Template.bind( {} );
export const ChangedIcons = Template.bind( {} );

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const SimpleExampleArgs: DXQuestionsTabsProps = {
    title: "Not sure where to start? See the answers to common questions",
    questionDetailLinkText: "View answer in a separate page",
    seeOtherLink: {
        url: "https://hcl-software.com",
        label: "See other common questions (click here)"
    },
    sections: [
        {
            title: "Section 1 Long title text",
            iconName: "ci-User_Circle",
            questions: [{
                question: "Question 1-1 Lorem ipsum lorem ipsum",
                answer: "Lorem ipsim, lorem ipsum. Lorem ipsim, lorem ipsum. Lorem ipsim, lorem ipsum. Lorem ipsim, lorem ipsum. Lorem ipsim, lorem ipsum. Nothing beside remains. Round the decay of that colossal wreck, boundless and bare, the lone and level sands <a style='text-decoration: underline' href='https://en.wikipedia.org/wiki/Ozymandias' target='_blank'>stretch <em>far</em> away</a>.",
                questionDetailLink: "https://www.hcl-software.com"
            }, {
                question: "Question 1-2",
                answer: "Answer",
                questionDetailLink: "https://www.hcl-software.com"
            }, {
                question: "Question 1-3",
                answer: "Answer",
                questionDetailLink: "https://www.hcl-software.com"
            }, {
                question: "Question 1-4",
                answer: "Answer",
                questionDetailLink: "https://www.hcl-software.com"
            },
            {
                question: "Question 1-5",
                answer: "Answer",
                questionDetailLink: "https://www.hcl-software.com"
            },
            {
                question: "Question 1-6",
                answer: "Answer",
                questionDetailLink: "https://www.hcl-software.com"
            },
            {
                question: "Question 1-7",
                answer: "Answer",
                questionDetailLink: "https://www.hcl-software.com"
            },
            {
                question: "Question 1-8",
                answer: "Answer",
                questionDetailLink: "https://www.hcl-software.com"
            }],
        },
        {
            title: "Section 2",
            questions: [{
                question: "Question 2-1",
                answer: "Answer 1",
                questionDetailLink: "https://www.hcl-software.com"
            }],
        },
        {
            title: "Section 3",
            questions: [{
                question: "Question 3-1",
                answer: "Answer 1",
                questionDetailLink: "https://www.hcl-software.com"
            }],
        },
        {
            title: "Section 4",
            questions: [{
                question: "Question 4-1",
                answer: "Answer 1",
                questionDetailLink: "https://www.hcl-software.com"
            }],
        },
        {
            title: "Section 5",
            questions: [{
                question: "Question 5-1",
                answer: "Answer 1",
                questionDetailLink: "https://www.hcl-software.com"
            }],
        },

    ]
};

export const fewOptionsVariant = Template.bind( {} );
export const fewOptionsVariantArgs: DXQuestionsTabsProps = {
    title: "Not sure where to start? See the answers to common questions",
    questionDetailLinkText: "View answer in a separate page",
    seeOtherLink: {
        url: "https://hcl-software.com",
        label: "See other common questions (click here)"
    },
    sections: [
        {
            title: "Section 1 Long title text",
            iconName: "ci-User_Circle",
            questions: [{
                question: "Question 1-1 Lorem ipsum lorem ipsum",
                answer: "Lorem ipsim, lorem ipsum. Lorem ipsim, lorem ipsum. Lorem ipsim, lorem ipsum. Lorem ipsim, lorem ipsum. Lorem ipsim, lorem ipsum. Nothing beside remains. Round the decay of that colossal wreck, boundless and bare, the lone and level sands <a style='text-decoration: underline' href='https://en.wikipedia.org/wiki/Ozymandias' target='_blank'>stretch <em>far</em> away</a>.",
                questionDetailLink: "https://www.hcl-software.com"
            }]
        },
        {
            title: "Section 2",
            questions: [{
                question: "Question 2-1",
                answer: "Answer 1",
                questionDetailLink: "https://www.hcl-software.com"
            }],
        },
    ]
};

SimpleExample.args = SimpleExampleArgs;
fewOptionsVariant.args = fewOptionsVariantArgs;
ChangedIcons.args = {
    ...SimpleExampleArgs,
    icons: {
        close: "ci-Close_LG",
        link: "ci-Arrow_Right_MD"
    }
};
