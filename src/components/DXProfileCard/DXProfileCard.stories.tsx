import React from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXProfileCard, { ProfileCardProps } from "./DXProfileCard";

export default {
    title: "Components/Cards/Profile Card",
    component: DXProfileCard,
    excludeStories: /.*Args$/,
} as Meta;

const Template: StoryFn<ProfileCardProps> = ( args ) => (
    <div style={{ maxWidth: '329px' }}>
        <DXProfileCard {...args} />
    </div>
);

const DefaultProfileCardArgs: ProfileCardProps = {
    name: 'Janet Kavandi',
    image: {
        url: "./images/people/profile-picture.png",
        altText: "Janet Kavandi",
    }
};

export const CompleteImplementation = Template.bind( {} );
export const ProfileCardArgs: ProfileCardProps = {
    ...DefaultProfileCardArgs,
    showSocialMedia: true,
    socialMedia: {
        socialMediaLinks: {
            facebook: {
                target: "_blank",
                url: "#",
                display: true,
            },
            twitter: {
                target: "_blank",
                url: "#",
                display: true,
            },
            linkedin: {
                target: "_blank",
                url: "#",
                display: true,
            },
            instagram: {
                target: "_blank",
                url: "#",
                display: true,
            },
        },
    }
};

CompleteImplementation.args = ProfileCardArgs;
CompleteImplementation.storyName = "Profile Card";

export const AvatarVariant = Template.bind( {} );
export const NoPicProfileCardArgs: ProfileCardProps = {
    name: "Janet Kavandi",
    showSocialMedia: true,
    socialMedia: {
        socialMediaLinks: {
            facebook: {
                target: "_blank",
                url: "#",
                display: true,
            },
            twitter: {
                target: "_blank",
                url: "#",
                display: true,
            },
            linkedin: {
                target: "_blank",
                url: "#",
                display: true,
            },
            instagram: {
                target: "_blank",
                url: "#",
                display: true,
            },
        },
    },
};

AvatarVariant.args = NoPicProfileCardArgs;
AvatarVariant.storyName = "Avatar";
