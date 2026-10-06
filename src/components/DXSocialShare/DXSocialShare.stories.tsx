import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXSocialShare, { SocialShareProps } from "./DXSocialShare";

export default {
    title: "Components/Multimedia/Social Share",
    component: DXSocialShare,
    excludeStories: /.*Args$/,
} as Meta<typeof DXSocialShare>;

const Template: StoryFn<typeof DXSocialShare> = ( args ) => <DXSocialShare {...args} />;

export const SocialShare = Template.bind( {} );
const socialShareProps: SocialShareProps = {
    title: "Share this page: ",
    socialMediaActions: {
        facebook: { display: true, onClick: function ( e: any ) { alert( "Override facebook default click event" ); } },
        twitter: { display: true, },
        linkedin: { display: true },
    },
    pageDetails: {
        url: "https://hcl-software.com",
        pageTitle: "HCL Software",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est turpis, maximus in risus eu, sollicitudin molestie felis. Nam mauris diam, interdum ullamcorper dolor in, cursus gravida nisi"
    }
};

SocialShare.args = socialShareProps;

export const SocialShareNoText = Template.bind( {} );
SocialShareNoText.args = {
    size: "big",
    socialMediaActions: {
        facebook: { display: true, onClick: function ( e: any ) { alert( "Override facebook default click event" ); } },
        twitter: { display: true, },
        linkedin: { display: true }
    },
    pageDetails: {
        url: "https://hcl-software.com",
        pageTitle: "HCL Software",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est turpis, maximus in risus eu, sollicitudin molestie felis. Nam mauris diam, interdum ullamcorper dolor in, cursus gravida nisi"
    }
};

export const SocialShareLight = Template.bind( {} );
SocialShareLight.args = {
    size: "big",
    socialMediaActions: {
        facebook: { display: true, onClick: function ( e: any ) { alert( "Override facebook default click event" ); } },
        twitter: { display: true, },
        linkedin: { display: true }
    },
    pageDetails: {
        url: "https://hcl-software.com",
        pageTitle: "HCL Software",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est turpis, maximus in risus eu, sollicitudin molestie felis. Nam mauris diam, interdum ullamcorper dolor in, cursus gravida nisi"
    },
    light: true
};

export const SocialShareSmall = Template.bind( {} );

const socialShareSmallProps: SocialShareProps = {
    size: "small",
    socialMediaActions: {
        facebook: { display: true },
        linkedin: { display: true },
        twitter: { display: true }
    },
    pageDetails: {
        url: "https://hcl-software.com",
        pageTitle: "HCL Software",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est turpis, maximus in risus eu, sollicitudin molestie felis. Nam mauris diam, interdum ullamcorper dolor in, cursus gravida nisi"
    }
};
SocialShareSmall.args = socialShareSmallProps;
