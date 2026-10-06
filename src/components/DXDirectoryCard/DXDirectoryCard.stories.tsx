import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXDirectoryCard, { DirectoryCardProps } from "./DXDirectoryCard";

export default {
    title: "Components/Cards/Directory Card",
    component: DXDirectoryCard,
    excludeStories: /.*Args$/,
} as Meta<typeof DXDirectoryCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXDirectoryCard> = ( args ) => <DXDirectoryCard {...args} />;

export const directoryCard = Template.bind( {} );
export const directoryCardWithLabel = Template.bind( {} );
export const directoryCardIconButtons = Template.bind( {} );
export const directoryCardTextButtons = Template.bind( {} );
export const directoryCardFiveIconsButtons = Template.bind( {} );
export const oneButtonSection = Template.bind( {} );
export const directoryCardChangedIcons = Template.bind( {} );


export const directoryArgs: DirectoryCardProps = {
    index: 1,
    title: "Janet Kavandi",
    subtitle: {
        label: "HR Department",
        url: "https://hcl-software.com",
    },
    email: {
        label: "jannet.kavandi@hcl-software.com",
        url: "mailto:jannet.kavandi@hcl-software.com",
        icon: "ci-Mail"
    },
    phone: {
        label: "773-936-3804",
        url: "tel:+7739363804",
        icon: "ci-Phone"
    },
    primaryButtons: [
        {
            label: "View Profile",
            onClick: () => {}
        },
    ],
    secondaryButtons: [
        {
            label: "View in chart",
            onClick: () => {}
        },
    ]
};

export const directoryCardChangedIconsArgs: DirectoryCardProps = {
    index: 1,
    title: "Janet Kavandi",
    subtitle: {
        label: "HR Department",
        url: "https://hcl-software.com",
    },
    email: {
        label: "jannet.kavandi@hcl-software.com",
        url: "mailto:jannet.kavandi@hcl-software.com",
        icon: "ci-Mail"
    },
    phone: {
        label: "773-936-3804",
        url: "tel:+7739363804",
        icon: "ci-Phone"
    },
    primaryButtons: [
        {
            label: "user pin",
            onClick: () => {},
            icon: {
                class: "ci-User_Square",
            },
            hideLabel: true
        },
        {
            label: "location",
            onClick: () => {},
            icon: {
                class: "ci-Map_Pin",
            },
            hideLabel: true
        },
        {
            label: "warning",
            onClick: () => {},
            icon: {
                class: "ci-Triangle_Warning",
            },
            hideLabel: true
        },
        {
            label: "help",
            onClick: () => {},
            icon: {
                class: "ci-Circle_Help",
            },
            hideLabel: true
        },
        {
            label: "phone",
            onClick: () => {},
            icon: {
                class: "ci-Phone",
            },
            hideLabel: true
        },
    ],
    secondaryButtons: [
        {
            label: "View in chart",
            onClick: () => {}
        },
        {
            label: "View in chart",
            onClick: () => {}
        },
    ],
    icons: {
        open: "ci-Add_Plus",
        close: "ci-Remove_Minus"
    }
};

export const directoryCardWithLabelArgs: DirectoryCardProps = {
    index: 1,
    title: "Janet Kavandi",
    subtitle: {
        label: "HR Department",
        url: "https://hcl-software.com",
    },
    email: {
        label: "jannet.kavandi@hcl-software.com",
        url: "mailto:jannet.kavandi@hcl-software.com",
        icon: "ci-Mail"
    },
    mobilePhone: {
        label: "773-936-3804",
        url: "tel:+7739363804",
        icon: "ci-Phone"
    },
    image: 'https://images.unsplash.com/photo-1687996345260-2f8e48b6b387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
    labels: [
        {
            label: "News",
            color: "blue"
        }
    ],
    secondaryButtons: [
        {
            label: "View in Chart",
            onClick: () => {}
        }
    ]
};

export const directoryCardIconButtonsArgs: DirectoryCardProps = {
    index: 1,
    title: "Janet Kavandi",
    subtitle: {
        label: "HR Department",
        url: "https://hcl-software.com",
    },
    email: {
        label: "jannet.kavandi@hcl-software.com",
        url: "mailto:jannet.kavandi@hcl-software.com",
        icon: "ci-Mail"
    },
    mobilePhone: {
        label: "773-936-3804",
        url: "tel:+7739363804",
        icon: "ci-Phone"

    },
    image: 'https://images.unsplash.com/photo-1687996345260-2f8e48b6b387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
    hideLabel: false,
    primaryButtons: [
        {
            label: "News",
            onClick: () => {},
            icon: {
                class: "ci-File_Add",
            }
        },
        {
            label: "Information",
            onClick: () => {},
            icon: {
                class: "ci-Info",
                position: 'right',
            },
            hideLabel: true
        },
        {
            label: "Phone",
            onClick: () => {},
            icon: {
                class: "ci-Phone",
            },
            hideLabel: true
        },

    ],
    secondaryButtons: [
        {
            label: "View in Chart",
            onClick: () => {}
        }
    ]
};

export const directoryCardTwoTextsArgs: DirectoryCardProps = {
    index: 1,
    title: "Janet Kavandi",
    subtitle: {
        label: "HR Department",
        url: "https://hcl-software.com",
    },
    email: {
        label: "jannet.kavandi@hcl-software.com",
        url: "mailto:jannet.kavandi@hcl-software.com",
        icon: "ci-Mail"
    },
    phone: {
        label: "773-936-3804",
        url: "tel:+7739363804",
        icon: "ci-Phone"

    },
    image: 'https://images.unsplash.com/photo-1687996345260-2f8e48b6b387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
    primaryButtons: [
        {
            label: "News",
            onClick: () => {}
        },
        {
            label: "Location",
            onClick: () => {},
            icon: {
                class: "ci-Map_Pin",
                position: 'right',
            }
        },
        {
            label: "Interview",
            onClick: () => {}
        },

    ],
    secondaryButtons: [
        {
            label: "View in Chart",
            onClick: () => {}
        },
        {
            label: "",
            onClick: () => {},
            icon: {
                class: "ci-User_Voice",
                position: 'right',
            },
            hideLabel: true
        },
    ]
};

export const directoryCardFiveIconsButtonsArgs: DirectoryCardProps = {
    index: 1,
    title: "Janet Kavandi",
    subtitle: {
        label: "HR Department",
        url: "https://hcl-software.com",
    },
    image: 'https://images.unsplash.com/photo-1687996345260-2f8e48b6b387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
    primaryButtons: [
        {
            label: "user pin",
            onClick: () => {},
            icon: {
                class: "ci-User_Square",
            },
            hideLabel: true
        },
        {
            label: "location",
            onClick: () => {},
            icon: {
                class: "ci-Map_Pin",
            },
            hideLabel: true
        },
        {
            label: "warning",
            onClick: () => {},
            icon: {
                class: "ci-Triangle_Warning",
            },
            hideLabel: true
        },
        {
            label: "help",
            onClick: () => {},
            icon: {
                class: "ci-Circle_Help",
            },
            hideLabel: true
        },
        {
            label: "phone",
            onClick: () => {},
            icon: {
                class: "ci-Phone",
            },
            hideLabel: true
        },
    ],
    secondaryButtons: [
        {
            label: "send message",
            onClick: () => {},
            icon: {
                class: "ci-User_Voice",
            },
            hideLabel: true
        },
    ]
};

export const oneButtonSectionArgs: DirectoryCardProps = {
    index: 1,
    title: "Janet Kavandi",
    subtitle: {
        label: "HR Department",
        url: "https://hcl-software.com",
    },
    email: {
        label: "jannet.kavandi@hcl-software.com",
        url: "mailto:jannet.kavandi@hcl-software.com",
        icon: "ci-Mail"
    },
    phone: {
        label: "773-936-3804",
        url: "tel:+7739363804",
        icon: "ci-Phone"

    },
    image: 'https://images.unsplash.com/photo-1687996345260-2f8e48b6b387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
    primaryButtons: [
        {
            label: "user pin",
            onClick: () => {},
            icon: {
                class: "ci-User_Square",
            },
            hideLabel: true
        },
        {
            label: "location",
            onClick: () => {},
            icon: {
                class: "ci-Map_Pin",
            },
            hideLabel: true
        },
        {
            label: "plus",
            onClick: () => {},
            icon: {
                class: "ci-Circle_Help",
            },
            hideLabel: true
        }
    ]
};

directoryCard.args = directoryArgs;
directoryCardWithLabel.args = directoryCardWithLabelArgs;
directoryCardIconButtons.args = directoryCardIconButtonsArgs;
directoryCardTextButtons.args = directoryCardTwoTextsArgs;
directoryCardFiveIconsButtons.args = directoryCardFiveIconsButtonsArgs;
oneButtonSection.args = oneButtonSectionArgs;
directoryCardChangedIcons.args = directoryCardChangedIconsArgs;


