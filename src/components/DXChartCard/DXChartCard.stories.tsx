import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXChartCard, { ChartCardProps } from "./DXChartCard";

export default {
    title: "Components/Cards/Chart Card",
    component: DXChartCard,
    excludeStories: /.*Args$/,
} as Meta<typeof DXChartCard>;

const Template: StoryFn<typeof DXChartCard> = ( args ) => <DXChartCard {...args} />;

export const CompleteVersion = Template.bind( {} );
export const ChangedIcons = Template.bind( {} );
export const iconNumbers = Template.bind( {} );
export const imageBase64 = Template.bind( {} );
export const onlyName = Template.bind( {} );
export const withAvatarName = Template.bind( {} );
export const withIconAvatar = Template.bind( {} );
export const wihtoutNumberIndicator = Template.bind( {} );
export const DropdownOpened = Template.bind( {} );

export const CompleteVersionArgs: ChartCardProps = {
    id: '1',
    displayName: "Susan Taylor",
    jobTitle: "Design developer",
    reportersNumbers: {
        index: 1,
        label: 4,
        onClick: () => {}
    },
    profileImage: "https://images.unsplash.com/photo-1503424886307-b090341d25d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80",
    menuOptions: [
        {
            href: "#one", label: "View my profile",
            onClick: () => {}
        },
    ],
    reporterUsers: [
        {
            id: '234',
            displayName: "Isidro Garcia Solares",
            jobTitle: "Design developer",
            reportersNumbers: {
                index: 1,
                label: 4,
            },
            profileImage: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            menuOptions: [
                {
                    href: "#one", label: "View my profile",
                    onClick: () => {}
                },
            ],
        },
        {
            id: '222',
            displayName: "Santiago Xinic",
            jobTitle: "Design developer",
            reportersNumbers: {
                index: 1,
                label: 4,
            },
            profileImage: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            menuOptions: [
                {
                    href: "#one", label: "View my profile",
                    onClick: () => {}
                },
            ],
        }
    ]
};

export const changedIconsArgs: ChartCardProps = {
    ...CompleteVersionArgs,
    icons: {
        open: "ci-Arrow_Up_MD",
        close: "ci-Arrow_Down_MD"
    }
};

export const iconNumbersArgs: ChartCardProps = {
    id: '2',
    displayName: "Alejandro Mendez Mendez",
    jobTitle: "Design developer",
    reportersNumbers: {
        label: 0
    },
    hideImage: true,
    menuOptions: [
        {
            href: "#one", label: "View my profile",
            onClick: () => {}
        },
    ],
};

export const imageBase64Args: ChartCardProps = {
    id: '2',
    displayName: "Arnulfo Alarcón",
    jobTitle: "Design developer",
    profileImage: `iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAJUlEQVR42u3NQQEAAAQEsJNcdFLw2gqsMukcK4lEIpFIJBLJS7KG6yVo40DbTgAAAABJRU5ErkJggg==`,
    menuOptions: [
        {
            href: "#one", label: "View my profile",
            onClick: () => {}
        },
    ],
};

export const withAvatarNameArgs: ChartCardProps = {
    id: '2',
    displayName: "Arnulfo Alarcón",
    jobTitle: "Design developer",
    menuOptions: [
        {
            href: "#one", label: "View my profile",
            onClick: () => {}
        },
    ],
};


export const onlyNameArgs: ChartCardProps = {
    id: '2',
    displayName: "Joel Anderson Patrick Octaviano Real de Ocampo",
    hideImage: true,
    menuOptions: [
        {
            href: "#one", label: "View my profile",
            onClick: () => {}
        },
    ],
};

export const withIconAvatarArgs: ChartCardProps = {
    id: 'sdf2',
    displayName: "Alejandro Mendez Mendez",
    jobTitle: "Design developer",
    reportersNumbers: {
        label: 4
    },
    menuOptions: [
        {
            href: "#one", label: "View my profile",
            onClick: () => {}
        },
    ],
};

export const withoutNumbersArgs: ChartCardProps = {
    id: 'sdf2',
    displayName: "Alejandro Mendez Mendez",
    jobTitle: "Design developer",
    reportersNumbers: {
        index: 1
    },
    menuOptions: [
        {
            href: "#one", label: "View my profile",
            onClick: () => {}
        },
    ],
};

CompleteVersion.args = CompleteVersionArgs;
ChangedIcons.args = changedIconsArgs;
iconNumbers.args = iconNumbersArgs;
imageBase64.args = imageBase64Args;
onlyName.args = onlyNameArgs;
withAvatarName.args = withAvatarNameArgs;
withIconAvatar.args = withIconAvatarArgs;
wihtoutNumberIndicator.args = withoutNumbersArgs;

DropdownOpened.storyName = "Complete Version Dropdown Opened";
DropdownOpened.args = {
    ...CompleteVersionArgs,
    dropdownOpen: true,
};
