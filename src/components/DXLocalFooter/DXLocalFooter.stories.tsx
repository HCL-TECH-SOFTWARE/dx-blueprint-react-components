import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXLocalFooter, { LocalFooterProps } from "./DXLocalFooter";

export default {
    title: "Components/Navigation/Local Footer",
    component: DXLocalFooter,
    excludeStories: /.*Args$/,
} as Meta<typeof DXLocalFooter>;

const Template: StoryFn<typeof DXLocalFooter> = ( args ) => <DXLocalFooter {...args} />;

export const LocalFooter = Template.bind( {} );
export const LocalFooterWithColor = Template.bind( {} );
export const LocalFooterWithImg = Template.bind( {} );
export const LocalFooterWithoutLogo = Template.bind( {} );

export const localFooterPropsArgs: LocalFooterProps = {
    logo: {
        url: "https://www.hcl-software.com/wps/wcm/connect/a185b95a-12cc-4252-9140-2b0ba40af651/hcl-software-logo.svg?MOD=AJPERES",
        altText: "hcl-software-hr-logo",
    },
    logoMobile: {
        url: "https://www.hcl-software.com/wps/wcm/connect/a185b95a-12cc-4252-9140-2b0ba40af651/hcl-software-logo.svg?MOD=AJPERES",
        altText: "hcl-software-hr-mobile-logo",
    },
    info: {
        section: "Heading title 1",
        address: "Torre Martell III, Prolongación Los Soles Poniente #200, Piso 2, Col. Valle Oriente San Pedro Garza García, N.L.66260",
        phone: "806-555-5555",
        links: [
            { url: "https://hcl-software.com", label: "Office Map", target: "_blank" },
            { url: "https://hcl-software.com", label: "Contact Us", target: "_blank" }
        ]
    },
    sections: [
        {
            name: "Heading title 2",
            links: [
                { url: "https://hcl-software.com", label: "Link Row 1" },
                { url: "https://hcl-software.com", label: "Link Row 2" },
                { url: "https://hcl-software.com", label: "Link Row 3" },
                { url: "https://hcl-software.com", label: "Link Row 4" },
                { url: "https://hcl-software.com", label: "Link Row 5" },
                { url: "https://hcl-software.com", label: "Link Row 6" },
                { url: "https://hcl-software.com", label: "Link Row 7" },
                { url: "https://hcl-software.com", label: "Link Row 8" },
            ]
        },
        {
            name: "Heading title 3",
            links: [
                { url: "https://hcl-software.com", label: "Link Row 1" },
                { url: "https://hcl-software.com", label: "Link Row 2" },
                { url: "https://hcl-software.com", label: "Link Row 3" },
            ]
        },
        {
            name: "Heading title 4",
            links: [
                { url: "https://hcl-software.com", label: "Link Row 1" },
                { url: "https://hcl-software.com", label: "Link Row 2" },
            ]
        },
        {
            name: "Heading title 5",
            links: [
                { url: "https://hcl-software.com", label: "Link Row 1" },
                { url: "https://hcl-software.com", label: "Link Row 2" },
                { url: "https://hcl-software.com", label: "Link Row 3" },
            ]
        }
    ]
};

export const localFooterWithNoImgArgs = {
    logoMobile: {
        url: "https://i.ibb.co/5cHhFH7/Local-Mobile.png",
        altText: "hcl-software-hr-mobile-logo",
    },
    info: {
        section: "Heading title 1",
        address: "Torre Martell III, Prolongación Los Soles Poniente #200, Piso 2, Col. Valle Oriente San Pedro Garza García, N.L.66260",
        phone: "806-555-5555",
        links: [
            { url: "https://hcl-software.com", label: "Office Map", target: "_blank" },
            { url: "https://hcl-software.com", label: "Contact Us", target: "_blank" }
        ]
    },
    sections: [
        {
            name: "Heading title 2",
            links: [
                { url: "https://hcl-software.com", label: "Link Row 1" },
                { url: "https://hcl-software.com", label: "Link Row 2" },
                { url: "https://hcl-software.com", label: "Link Row 3" },
                { url: "https://hcl-software.com", label: "Link Row 4" },
                { url: "https://hcl-software.com", label: "Link Row 5" },
                { url: "https://hcl-software.com", label: "Link Row 6" },
                { url: "https://hcl-software.com", label: "Link Row 7" },
                { url: "https://hcl-software.com", label: "Link Row 8" },
            ]
        },
        {
            name: "Heading title 3",
            links: [
                { url: "https://hcl-software.com", label: "Link Row 1" },
                { url: "https://hcl-software.com", label: "Link Row 2" },
                { url: "https://hcl-software.com", label: "Link Row 3" },
            ]
        },
        {
            name: "Heading title 4",
            links: [
                { url: "https://hcl-software.com", label: "Link Row 1" },
                { url: "https://hcl-software.com", label: "Link Row 2" },
            ]
        }
    ]
};

LocalFooter.args = localFooterPropsArgs;

LocalFooterWithColor.args = {
    ...localFooterPropsArgs,
    backgroundColor: "#83bcf5",
};

LocalFooterWithImg.args = {
    ...localFooterPropsArgs,
    backgroundImageRight: {
        url: "https://cdn-icons-png.flaticon.com/512/900/900782.png",
        size: "100px 100px"
    },
    backgroundImageLeft: {
        url: "https://cdn-icons-png.flaticon.com/512/3067/3067260.png",
        size: "100px 100px"
    }
};

LocalFooterWithoutLogo.args = localFooterWithNoImgArgs;
