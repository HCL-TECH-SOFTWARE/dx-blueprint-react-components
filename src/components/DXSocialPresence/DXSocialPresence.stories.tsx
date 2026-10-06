import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXSocialPresence, { SocialPresenceProps } from "./DXSocialPresence";

export default {
    title: "Components/Multimedia/Social Presence",
    component: DXSocialPresence,
    excludeStories: /.*Args$/,
} as Meta<typeof DXSocialPresence>;

const Template: StoryFn<typeof DXSocialPresence> = ( args ) => <DXSocialPresence {...args} />;

export const SocialPresence = Template.bind( {} );
export const SocialPresenceNoText = Template.bind( {} );
export const SocialPresenceLight = Template.bind( {} );
export const SocialPresenceSmall = Template.bind( {} );

const socialPresenceProps: SocialPresenceProps = {
    title: "Our social media",
    socialMediaLinks: {
        facebook: {
            display: true,
            url: "https://www.facebook.com/HCLSW",
            target: "_blank"
        },
        linkedin: {
            display: true,
            url: "https://www.linkedin.com/company/hcltech/",
            target: "_blank"
        },
        twitter: {
            display: true,
            url: "https://x.com/HCLSoftware",
            target: "_blank"
        },
        instagram: {
            display: true,
            url: "https://www.instagram.com/hcl_software/",
            target: "_blank"
        }
    }
};

SocialPresence.args = socialPresenceProps;
SocialPresenceSmall.args = {
    ...socialPresenceProps,
    size: "small"
};
SocialPresenceNoText.args = {
    size: "big",
    socialMediaLinks: {
        facebook: {
            display: true,
            url: "https://www.facebook.com/HCLSW",
            target: "_blank"
        },
        linkedin: {
            display: true,
            url: "https://www.linkedin.com/company/hcltech/",
            target: "_blank"
        },
        twitter: {
            display: true,
            url: "https://x.com/HCLSoftware",
            target: "_blank"
        },
        instagram: {
            display: true,
            url: "https://www.instagram.com/hcl_software/",
            target: "_blank"
        }
    }
};
SocialPresenceLight.args = {
    ...socialPresenceProps,
    size: "big",
    light: true
};
