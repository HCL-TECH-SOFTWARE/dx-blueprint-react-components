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
import DXToggleMenu, { ToggleMenuProps } from "./DXToggleMenu";

export default {
    title: "Components/Lists, Catalogs, and Filters/Toggle Menu",
    component: DXToggleMenu,
    excludeStories: /.*Args$/,
} as Meta<typeof DXToggleMenu>;

const Template: StoryFn<typeof DXToggleMenu> = ( args ) => <DXToggleMenu {...args} />;


export const singleSelectToggleMenu = Template.bind( {} );
export const multiSelectToggleMenu = Template.bind( {} );
export const toggleVerticalMenu = Template.bind( {} );

const buttons = [
    { label: "CTA Link 1", displayType: "primary" },
    { label: "CTA Link 2", disabled: true },
    { label: "CTA Link 3" },
    { label: "CTA Link 4" },

];

const singleSelectToggleMenuProps: ToggleMenuProps = {
    buttons,
    type: 'single'
};
const multiSelectToggleMenuProps: ToggleMenuProps = {
    buttons,
    type: 'multi'
};


const toggleMenuVerticalProps: ToggleMenuProps = {
    buttons,
    vertical: true,
    type: 'multi'

};
singleSelectToggleMenu.args = singleSelectToggleMenuProps;
multiSelectToggleMenu.args = multiSelectToggleMenuProps;
toggleVerticalMenu.args = toggleMenuVerticalProps;

