import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXGlobalFooter, { FooterProps } from "./DXGlobalFooter";

export default {
    title: "Components/Navigation/Global Footer",
    component: DXGlobalFooter,
    excludeStories: /.*Args$/,
} as Meta<typeof DXGlobalFooter>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXGlobalFooter> = ( args ) => <DXGlobalFooter  {...args} />;

export const SampleFooter = Template.bind( {} );

const sampleFooterProps: FooterProps = {
    logo: "https://www.hcl-software.com/wps/wcm/connect/a185b95a-12cc-4252-9140-2b0ba40af651/hcl-software-logo.svg?MOD=AJPERES",
    altLogo: "hcl-logo",
    logoMobile: "https://www.hcl-software.com/wps/wcm/connect/a185b95a-12cc-4252-9140-2b0ba40af651/hcl-software-logo.svg?MOD=AJPERES",
    altMobile: "hcl-logo-mobile",
    copyright: "Copyright © 2024 HCL Technologies Limited",
    primaryLinks: [
        { url: "https://hcl-software.com", label: "HCL Software" },
        { url: "https://hcl-software.com", label: "Maps & Directions" },
        { url: "https://hcl-software.com", label: "Search HCL Software" },
        { url: "https://hcl-software.com", label: "Emergency info", target: "_blank" },
    ],
    secondaryLinks: [
        { url: "https://hcl-software.com", label: "Terms of use" },
        { url: "https://hcl-software.com", label: "Privacy" },
        { url: "https://hcl-software.com", label: "Copyright" },
        { url: "https://hcl-software.com", label: "Trademarks" },
        { url: "https://hcl-software.com", label: "Accesibility" },
    ]
};

SampleFooter.args = sampleFooterProps;
