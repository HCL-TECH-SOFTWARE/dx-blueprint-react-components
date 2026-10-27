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
import DXSearchAndQuestions, { DXSearchAndQuestionsProps } from "./DXSearchAndQuestions";
import { fewOptionsVariantArgs } from "../DXQuestionsTabs/DXQuestionsTabs.stories";
import { ssArgs } from "../DXSearchSuggestions/DXSearchSuggestions.stories";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Home Page/Search and Questions",
    component: DXSearchAndQuestions,
    excludeStories: /.*Args$/,
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXSearchAndQuestions> = ( args ) => <DXSearchAndQuestions {...args} />;

export const SearchAndQuestionsExample = Template.bind( {} );
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const SearchAndQuestionsArgs: DXSearchAndQuestionsProps = {
    backgroundImage: "https://images.unsplash.com/photo-1680442794210-18aaefe1bc11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    sqBackgroundColor: "--light-light-d1",
    sqBackgroundOpacity: 0.7,
    questionsTabs: fewOptionsVariantArgs,
    searchSuggestions: ssArgs
};

export const SearchAndQuestionsWithNoImage = Template.bind( {} );
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const SearchAndQuestionsWithNoImageArgs: DXSearchAndQuestionsProps = {
    backgroundColor: "#7d90ec",
    sqBackgroundColor: "#8b8b8b",
    sqBackgroundOpacity: 0.4,
    questionsTabs: fewOptionsVariantArgs,
    searchSuggestions: ssArgs
};

SearchAndQuestionsExample.args = SearchAndQuestionsArgs;
SearchAndQuestionsWithNoImage.args = SearchAndQuestionsWithNoImageArgs;
