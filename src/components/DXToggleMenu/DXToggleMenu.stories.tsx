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

