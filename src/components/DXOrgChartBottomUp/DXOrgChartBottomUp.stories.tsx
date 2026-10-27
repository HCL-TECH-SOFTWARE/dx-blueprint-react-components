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
import DXOrgChartBottomUp, { OrgChartBottomUpProps } from "./DXOrgChartBottomUp";

export default {
    title: "Components/General/Org Chart Bottom Up",
    component: DXOrgChartBottomUp,
    excludeStories: /.*Args$/,
} as Meta<typeof DXOrgChartBottomUp>;

const Template: StoryFn<typeof DXOrgChartBottomUp> = ( args ) => <DXOrgChartBottomUp {...args} />;

export const OrgChartBottomUp = Template.bind( {} );
export const OrgChartWithoutImages = Template.bind( {} );

export const OrgChartBottomUpArgs: OrgChartBottomUpProps = {
    users: {
        id: '23545',
        displayName: "Wendy Lawrence ",
        jobTitle: "HR Associated",
        profileImage: "https://images.unsplash.com/photo-1600337752115-de2c09d6704f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        menuOptions: [
            { href: "https://hcl-software.com/", label: "Visit profile" }
        ],
        manager: {
            id: '4092d',
            displayName: "Alán Alatorre",
            jobTitle: "1st Line Manager",
            profileImage: "https://images.unsplash.com/photo-1528492501711-867fd2c44bb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            menuOptions: [
                { href: "https://hcl-software.com/", label: "Visit profile" }
            ],
            manager: {
                id: '2sfsd',
                displayName: "Otto Rene Pérez",
                jobTitle: "Practice Lead",
                profileImage: "https://images.unsplash.com/photo-1656845088161-948c617420d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                menuOptions: [
                    { href: "https://hcl-software.com/", label: "Visit profile" }
                ],
                manager: {
                    id: '21erer',
                    displayName: "Marvin Ervin Garcia",
                    jobTitle: "HR Manager",
                    profileImage: "https://images.unsplash.com/photo-1628341737358-8d97728f6da5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                    menuOptions: [
                        { href: "https://hcl-software.com/", label: "Visit profile" }
                    ],
                    manager: {
                        id: '45435242',
                        displayName: "Alfredo García",
                        jobTitle: "HR Director",
                        profileImage: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFpc2FqZXMlMjBoZXJtb3Nvc3xlbnwwfHwwfHw%3D&w=1000&q=80",
                        menuOptions: [
                            { href: "https://hcl-software.com/", label: "Visit profile" }
                        ],
                        manager: {
                            id: '1',
                            displayName: "Susan Taylor ",
                            jobTitle: "HR Vice President",
                            profileImage: "https://images.unsplash.com/photo-1503424886307-b090341d25d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80",
                            menuOptions: [
                                { href: "https://hcl-software.com/", label: "Visit profile" }
                            ]
                        }
                    },
                },
            }
        },
    }
};

export const OrgChartWithoutImagesArgs: OrgChartBottomUpProps = {
    users:
    {
        id: '23545',
        displayName: "Wendy Lawrence ",
        jobTitle: "HR Associated",
        menuOptions: [
            { href: "https://hcl-software.com/", label: "Visit profile" }
        ],
        hideImage: true,
        manager: {
            id: '4092d',
            displayName: "Alán Alatorre",
            jobTitle: "1st Line Manager",
            menuOptions: [
                { href: "https://hcl-software.com/", label: "Visit profile" }
            ],
            hideImage: true,
            manager: {
                id: '2sfsd',
                displayName: "Otto Rene Pérez",
                jobTitle: "Practice Lead",
                menuOptions: [
                    { href: "https://hcl-software.com/", label: "Visit profile" }
                ],
                hideImage: true,
                manager: {
                    id: '21erer',
                    displayName: "Marvin Ervin Garcia",
                    jobTitle: "HR Manager",
                    menuOptions: [
                        { href: "https://hcl-software.com/", label: "Visit profile" }
                    ],
                    hideImage: true,
                    manager: {
                        id: '45435242',
                        displayName: "Alfredo García",
                        jobTitle: "HR Director",
                        menuOptions: [
                            { href: "https://hcl-software.com/", label: "Visit profile" }
                        ],
                        hideImage: true,
                        manager: {
                            id: '1',
                            displayName: "Susan Taylor ",
                            jobTitle: "HR Vice President",
                            menuOptions: [
                                { href: "https://hcl-software.com/", label: "Visit profile" }
                            ],
                            hideImage: true,
                        }
                    },
                },
            }
        },
    }
};

OrgChartBottomUp.args = OrgChartBottomUpArgs;
OrgChartWithoutImages.args = OrgChartWithoutImagesArgs;

export const DropdownOpened = Template.bind( {} );
DropdownOpened.storyName = "Org Chart Bottom Up Dropdown Opened";
DropdownOpened.args = {
    ...OrgChartBottomUpArgs,
    dropdownOpen: true,
};
