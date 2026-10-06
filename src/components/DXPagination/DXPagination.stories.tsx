import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXPagination, { PaginationProps } from "./DXPagination";

export default {
    title: "Components/Navigation/Pagination",
    component: DXPagination,
    excludeStories: /.*Args$/,
} as Meta<typeof DXPagination>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXPagination> = ( args ) => <DXPagination {...args} />;

export const Pagination = Template.bind( {} );

const onChangeActive = ( page: number ) => {
    console.log( "Page changed:", page );
};
const onChangeSet = ( e: any ) => {
    console.log( "Page set changed: ", parseInt( e.target.textContent ) );
};
const paginationProps: PaginationProps = {
    sets: ["2", "5", "10"],
    totalItems: 10,
    totalPages: 5,
    active: 1,
    activeSet: 2,
    onChangeActive,
    onChangeSet
};
export const DropdownOpened = Template.bind( {} );
DropdownOpened.storyName = "Pagination Dropdown Opened";
DropdownOpened.args = {
    ...paginationProps,
    dropdownOpen: true,
};

Pagination.args = paginationProps;
