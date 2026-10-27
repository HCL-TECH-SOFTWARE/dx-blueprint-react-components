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
import DXJiraTaskCard, { JiraTaskCardProps, ProjectCardProps } from "./DXJiraTaskCard";

export default {
    title: "Components/Cards/Jira Task Card",
    component: DXJiraTaskCard,
    excludeStories: /.*Args$/,
} as Meta<typeof DXJiraTaskCard>;

const Template: StoryFn<typeof DXJiraTaskCard> = ( args ) => <DXJiraTaskCard {...args} />;

export const Default = Template.bind( {} );
export const FilterItems = Template.bind( {} );
export const EmptyList = Template.bind( {} );
export const CustomIcons = Template.bind( {} );

const propertiesCard: ProjectCardProps = {
    name: "Project Name",
    img: {
        url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        altText: "project-image"
    },
    tags: ["Project status"],
    members: [
        {
            name: "Adam Smith",
            img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        },
        {
            name: "Sam Wong",
            img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
        },
        {
            name: "Kevin Powell",
        },
        {
            name: "Laura Tobias",
        },
        {
            name: "Jen Scott",
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80",
        },
        {
            name: "Julie Andrews",
        },
        {
            name: "Sam Smith",
        },
        {
            name: "Kevin Scott",
            img: "https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1923&q=80",
        }
    ]
};

export const DefaultArgs: JiraTaskCardProps = {
    tasks: [
        {
            title: {
                url: "",
                label: "Create Workspace Spreadsheet",
            },
            id: "ID-00",
            text: "Explore Space Suit Costs models Workspace Spreadsheet",
            status: {
                label: "In progress",
                color: "#4698FF"
            }
        },
        {
            title: {
                url: "",
                label: "Explore Space Suit Costs models",
            },
            id: "ID-01",
            text: "Some text here",
            status: {
                label: "done",
                color: "#4698FF"
            }
        },
        {
            title: {
                url: "",
                label: "Calculate fuel costs for Rocket Booster",
            },
            id: "ID-14",
            text: "Some text here",
            status: {
                label: "to do",
                color: "#4698FF"
            }
        },
        {
            title: {
                url: "",
                label: "Work with MKT to release financial plans forecast 2021",
            },
            id: "ID-25",
            text: "Some text here",
            status: {
                label: "to do",
                color: "#4698FF"
            }
        }
    ],
    projectInfo: propertiesCard as ProjectCardProps
};

export const FilterItemsArgs: JiraTaskCardProps = {
    tasks: [
        {
            title: {
                url: "",
                label: "Create Workspace Spreadsheet",
            },
            id: "ID-00",
            text: "Some text here",
            status: {
                label: "In progress",
                color: "#4698FF"
            }
        },
        {
            title: {
                url: "",
                label: "Explore Space Suit Costs models",
            },
            id: "ID-01",
            status: {
                label: "done",
                color: "#4698FF"
            }
        },
        {
            title: {
                url: "",
                label: "Calculate fuel costs for Rocket Booster",
            },
            id: "ID-14",
            text: "Some text here",
            status: {
                label: "to do",
                color: "#4698FF"
            }
        },
        {
            title: {
                url: "",
                label: "Work with MKT to release financial plans forecast 2021",
            },
            id: "ID-25",
            text: "Some text here",
            status: {
                label: "to do",
                color: "#4698FF"
            }
        },
        {
            title: {
                url: "",
                label: "Explore Space Suit Costs models",
            },
            id: "ID-31",
            text: "Some text here",
            status: {
                label: "in review",
                color: "#4698FF"
            }
        },
        {
            title: {
                url: "",
                label: "Explore Space Suit Costs models",
            },
            id: "ID-90",
            text: "Some text here",
            status: {
                label: "blocked",
                color: "#4698FF"
            }
        },
    ],
    projectInfo: propertiesCard as ProjectCardProps
};

export const EmptyListArgs: JiraTaskCardProps = {
    projectInfo: propertiesCard as ProjectCardProps,
    empty: {
        title: "No tasks assigned",
        text: "Contact your team lead for new assignments",
        image: {
            url: "https://img.freepik.com/free-vector/warning-concept-illustration_114360-1551.jpg?w=1380&t=st=1680200455~exp=1680201055~hmac=354d10e7948a3449bf84ad959964c7da08072f5fe9632e338f5041f6a801a1b7",
        }
    }
};

export const CustomIconsArgs: JiraTaskCardProps = {
    ...DefaultArgs,
    icons: {
        open: "ci-Arrow_Up_SM",
        close: "ci-Arrow_Down_SM"
    }
};

export const DropdownOpened = Template.bind( {} );
DropdownOpened.storyName = "Filter Items with Dropdown Opened";
DropdownOpened.args = {
    ...FilterItemsArgs,
    dropdownOpen: true,
};

Default.args = DefaultArgs;
FilterItems.args = FilterItemsArgs;
EmptyList.args = EmptyListArgs;
CustomIcons.args = CustomIconsArgs;
