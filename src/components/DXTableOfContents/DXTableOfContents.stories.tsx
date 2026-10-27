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
import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXTableOfContents from './DXTableOfContents';

export default {
    title: "Components/Navigation/Table of Contents",
    component: DXTableOfContents,
    excludeStories: /.*Args$/,
} as Meta<typeof DXTableOfContents>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXTableOfContents> = ( args ) => <DXTableOfContents {...args} />;

export const RegularTable = Template.bind( {} );
export const MoreLevelsTable = Template.bind( {} );
export const EmptyItemsTable = Template.bind( {} );
export const CustomListStyle = Template.bind( {} );

export const TableArgs = {
    title: "Table of Contents",
    items: [
        {
            id: "#chapter_uno",
            label: "Chapter 1",
            children: [
                {
                    id: "#subchapter_one",
                    label: "Subchapter 1",
                    children: [
                        {
                            id: "attached_one",
                            label: "Attached 1",
                        }
                    ]
                }
            ]
        },
        {
            id: "#chapter_dos",
            label: "Chapter 2",
            children: [
                {
                    id: "subchapter_one",
                    label: "Subchapter 1"
                },
                {
                    id: "subchapter_two",
                    label: "Subchapter 2"
                },
                {
                    id: "subchapter_three",
                    label: "Subchapter 3"
                },
            ]
        },
        {
            id: "#chapter_three",
            label: "Chapter 3"
        },
        {
            id: "#chapter_four",
            label: "Chapter 4"
        },
        {
            id: "#chapter_five",
            label: "Chapter 5",
            children: [
                {
                    id: "subchapter_one",
                    label: "Subchapter 1",
                    children: [
                        {
                            id: "attached_one",
                            label: "Attached 1"
                        },
                        {
                            id: "attached_two",
                            label: "Attached 2"
                        },
                        {
                            id: "attached_three",
                            label: "Attached 3"
                        },
                    ]
                }
            ]
        }
    ]
};
RegularTable.args = TableArgs;
MoreLevelsTable.args = {
    ...TableArgs,
    items: [
        {
            id: "#chapter_uno",
            label: "Chapter 1",
            children: [
                {
                    id: "#subchapter_one",
                    label: "Subchapter 1",
                    children: [
                        {
                            id: "attached_one",
                            label: "Attached 1",
                            children: [
                                {
                                    id: "test_one",
                                    label: "Test 1",
                                    children: [
                                        {
                                            id: "subtest_one",
                                            label: "Subtest 1"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: "#chapter_dos",
            label: "Chapter 2"
        },
        {
            id: "#chapter_tres",
            label: "Chapter 3"
        },
        {
            id: "#chapter_cuatro",
            label: "Chapter 4"
        },
        {
            id: "#chapter_cinco",
            label: "Chapter 5"
        }
    ]
};
EmptyItemsTable.args = {
    title: "Table Empty",
    items: []
};
CustomListStyle.args = {
    ...TableArgs,
    firstLevelStyle: "square",
    secondLevelStyle: "upper-roman",
    thirdLevelStyle: "lower-alpha"
};
