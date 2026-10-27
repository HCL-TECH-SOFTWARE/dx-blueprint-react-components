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
import DXUserDashboard from './DXUserDashboard';

export default {
    title: "Components/Custom/User Dashboard",
    component: DXUserDashboard,
    excludeStories: /.*Args$/,
} as Meta<typeof DXUserDashboard>;

const Template: StoryFn<typeof DXUserDashboard> = ( args ) => <DXUserDashboard {...args} />;

export const Default = Template.bind( {} );
export const VerticalLayout = Template.bind( {} );
export const NoImage = Template.bind( {} );

Default.args = {
    title: "Hello, Sandra Smith!",
    subtitle: "Quality Assurance Manager",
    metadata: "Engineering - Part Time",
    utilityBelt: {
        items: [
            { title: "App 2", button: { iconClass: "ci-Add_Plus_Circle", label: "Add", onClick: () => {} } },
            { title: "App 3", button: { iconClass: "ci-Add_Row", label: "Add Row", onClick: () => {} } },
            { title: "App 4", button: { iconClass: "ci-Airplay", label: "Airplay", onClick: () => {} } },
            { title: "App 5", button: { iconClass: "ci-Clock", label: "Alarm", onClick: () => {} } },
            { title: "App 6", button: { iconClass: "ci-Archive", label: "Archive", onClick: () => {} } },
            { title: "App 7", button: { iconClass: "ci-Bell_Add", label: "Add Bell", onClick: () => {} } },
            { title: "App 8", button: { iconClass: "ci-Bold", label: "Bold", onClick: () => {} } },
        ],
        textVariant: true,
        displayType: 'secondary'
    },
    image: {
        url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        altText: "profile image"
    },
};

VerticalLayout.args = {
    title: "Good Morning Employee",
    subtitle: "Quality Assurance Manager",
    metadata: "Engineering - Part Time",
    image: {
        url: "",
        altText: "Emilio Stevez"
    },
    vertical: true,
    utilityBelt: {
        items: [
            { title: "App 2", button: { iconClass: "ci-Add_Plus_Circle", label: "Add", onClick: () => {} } },
            { title: "App 3", button: { iconClass: "ci-Add_Row", label: "Add Row", onClick: () => {} } },
            { title: "App 4", button: { iconClass: "ci-Airplay", label: "Airplay", onClick: () => {} } },
            { title: "App 5", button: { iconClass: "ci-Clock", label: "Alarm", onClick: () => {} } },
            { title: "App 6", button: { iconClass: "ci-Archive", label: "Archive", onClick: () => {} } },
            { title: "App 7", button: { iconClass: "ci-Bell_Add", label: "Add Bell", onClick: () => {} } },
            { title: "App 8", button: { iconClass: "ci-Bold", label: "Bold", onClick: () => {} } },
        ],
        textVariant: true,
        displayType: 'secondary',
        align: 'left'
    },
};

NoImage.args = {
    title: "Welcome to your Workspace",
    subtitle: "Quality Assurance Manager",
    metadata: "Engineering - Part Time",
    utilityBelt: {
        items: [
            { title: "App 2", button: { iconClass: "ci-Add_Plus_Circle", label: "Add", onClick: () => {} } },
            { title: "App 3", button: { iconClass: "ci-Add_Row", label: "Add Row", onClick: () => {} } },
            { title: "App 4", button: { iconClass: "ci-Airplay", label: "Airplay", onClick: () => {} } },
            { title: "App 5", button: { iconClass: "ci-Clock", label: "Alarm", onClick: () => {} } },
            { title: "App 6", button: { iconClass: "ci-Archive", label: "Archive", onClick: () => {} } },
            { title: "App 7", button: { iconClass: "ci-Bell_Add", label: "Add Bell", onClick: () => {} } },
            { title: "App 8", button: { iconClass: "ci-Bold", label: "Bold", onClick: () => {} } },
        ],
        textVariant: true,
        displayType: 'secondary'
    },
    image: {
        url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        altText: "profile image"
    },
    hideImage: true
};

