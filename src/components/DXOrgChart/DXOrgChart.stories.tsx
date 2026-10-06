import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXOrgChart, { OrgChartProps } from "./DXOrgChart";

export default {
    title: "Components/General/Org Chart",
    component: DXOrgChart,
    excludeStories: /.*Args$/,
} as Meta<typeof DXOrgChart>;

const Template: StoryFn<typeof DXOrgChart> = ( args ) => <DXOrgChart {...args} />;

export const DefaultVersion = Template.bind( {} );
export const ChangedIcon = Template.bind( {} );

export const DefaultVersionArgs: OrgChartProps = {
    users: [
        {
            id: '1',
            displayName: "Susan Taylor ",
            jobTitle: "Project Analyst",
            reportersNumbers: {
                index: 1,
                onClick: () => { eventFucnt(); }
            },
            profileImage: "https://images.unsplash.com/photo-1503424886307-b090341d25d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80",
            menuOptions: [
                {
                    href: "#one", label: "Visit profile",
                    onClick: () => {}
                },
            ],
        }
    ]
};

const eventFucnt = () => {
    DefaultVersionArgs.users[0].reporterUsers = [
        {
            id: '4092',
            displayName: "Andrés López",
            jobTitle: "Technical Manager",
            profileImage: "https://mott.pe/noticias/wp-content/uploads/2019/03/los-50-paisajes-maravillosos-del-mundo-para-tomar-fotos-1280x720.jpg",
            menuOptions: [
                {
                    href: "#one", label: "Visit profile",
                    onClick: () => {}
                },
            ],
            reportersNumbers: {
                index: 1,
                onClick: () => {
                    if ( DefaultVersionArgs.users[0].reporterUsers && DefaultVersionArgs.users[0].reporterUsers.length > 0 ) {
                        DefaultVersionArgs.users[0].reporterUsers[0].reporterUsers = [
                            {
                                id: '23545',
                                displayName: "Karin López",
                                jobTitle: "Design developer",
                                reportersNumbers: {
                                    index: 1
                                },
                                menuOptions: [
                                    {
                                        href: "#one", label: "Visit profile",
                                        onClick: () => {}
                                    },
                                ],
                            },
                            {
                                id: '45435242',
                                displayName: "Alfredo García",
                                jobTitle: "Design developer",
                                reportersNumbers: {
                                    index: 1
                                },
                                profileImage: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFpc2FqZXMlMjBoZXJtb3Nvc3xlbnwwfHwwfHw%3D&w=1000&q=80",
                                menuOptions: [
                                    {
                                        href: "#one", label: "Visit profile",
                                        onClick: () => {}
                                    },
                                ],
                            },
                            {
                                id: '4092d',
                                displayName: "Alán Alatorre",
                                jobTitle: "Design developer",
                                reportersNumbers: {
                                    index: 1
                                },
                                profileImage: "https://images.unsplash.com/photo-1503424886307-b090341d25d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80",
                                menuOptions: [
                                    {
                                        href: "#one", label: "Visit profile",
                                        onClick: () => {}
                                    }
                                ]
                            },
                            {
                                id: '2sfsd',
                                displayName: "Otto Rene Pérez",
                                jobTitle: "Design developer",
                                reportersNumbers: {
                                    index: 1
                                },
                                menuOptions: [
                                    {
                                        href: "#one", label: "Visit profile",
                                        onClick: () => {}
                                    },
                                ],
                            },
                            {
                                id: '21erer',
                                displayName: "Marvin Ervin Garcia",
                                jobTitle: "Design developer",
                                reportersNumbers: {
                                    index: 1
                                },
                                profileImage: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                                menuOptions: [
                                    {
                                        href: "#one", label: "Visit profile",
                                        onClick: () => {}
                                    },
                                ],
                            }
                        ];
                    }
                }
            }
        },
        {
            id: '30934',
            displayName: "Juan Galvan",
            jobTitle: "Design developer",
            reportersNumbers: {
                index: 1,
                onClick: () => { labelZero(); }
            },
            menuOptions: [
                {
                    href: "#one", label: "Visit profile",
                    onClick: () => {}
                },
            ],
        },
        {
            id: '09458734',
            displayName: "Marvin Ervin Garcia",
            jobTitle: "Design developer",
            reportersNumbers: {
                index: 1
            },
            profileImage: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            menuOptions: [
                {
                    href: "#one", label: "Visit profile",
                    onClick: () => {}
                },
            ],
        },
        {
            id: '09774',
            displayName: "Tomas Vásquez",
            jobTitle: "Design developer",
            reportersNumbers: {
                index: 1
            },
            menuOptions: [
                {
                    href: "#one", label: "Visit profile",
                    onClick: () => {}
                },
            ],
        },
        {
            id: '234',
            displayName: "Isidro Garcia Solares",
            jobTitle: "Design developer",
            reportersNumbers: {
                index: 1
            },
            profileImage: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            menuOptions: [
                {
                    href: "#one", label: "Visit profile",
                    onClick: () => {}
                },
            ],
        },
        {
            id: '222',
            displayName: "Santiago Xinic",
            jobTitle: "Design developer",
            reportersNumbers: {
                index: 1
            },
            menuOptions: [
                {
                    href: "#one", label: "Visit profile",
                    onClick: () => {}
                },
            ],
        }
    ];
};

const labelZero = () => {
    if ( DefaultVersionArgs.users[0].reporterUsers && DefaultVersionArgs.users[0].reporterUsers.length > 0 ) {
        if ( DefaultVersionArgs.users[0].reporterUsers[1].reportersNumbers ) {
            DefaultVersionArgs.users[0].reporterUsers[1].reportersNumbers.label = 0;
        }
    }
};

DefaultVersion.args = DefaultVersionArgs;
ChangedIcon.args = {
    ...DefaultVersionArgs,
    icons: {
        button: "ci-Arrow_Down_SM"
    }
};

export const DropdownOpened = Template.bind( {} );
DropdownOpened.storyName = "Default Version Dropdown Opened";
DropdownOpened.args = {
    ...DefaultVersionArgs,
    dropdownOpen: true,
};
