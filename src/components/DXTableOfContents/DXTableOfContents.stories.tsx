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
