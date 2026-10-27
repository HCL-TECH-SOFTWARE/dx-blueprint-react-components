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
