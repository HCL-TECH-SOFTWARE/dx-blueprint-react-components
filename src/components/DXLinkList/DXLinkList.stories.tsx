import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXLinkList, { LinkListProps } from "./DXLinkList";

export default {
    title: "Components/Lists, Catalogs, and Filters/Link List",
    component: DXLinkList,
    excludeStories: /.*Args$/,
} as Meta<typeof DXLinkList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXLinkList> = ( args ) => <DXLinkList {...args} />;

export const linkListBold = Template.bind( {} );
export const linkListCTA = Template.bind( {} );
export const linkListSemiBold = Template.bind( {} );
export const linkListCol3 = Template.bind( {} );
export const linkListCol6 = Template.bind( {} );
export const linkListColCTA = Template.bind( {} );
export const linkListOverflow = Template.bind( {} );
export const linkListMaxDefault = Template.bind( {} );
export const linkListMaxSet = Template.bind( {} );
export const linkListMaxColDefault = Template.bind( {} );
export const linkListMaxColSet = Template.bind( {} );


const links = [
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_top" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_parent" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_mobile" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
];

export const manyLinksArgs = [
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_top" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_parent" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_mobile" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_top" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_parent" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_mobile" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_top" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_parent" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_mobile" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
];

const linkListBoldProps: LinkListProps = {
    title: {
        value: "Popular Academic Links",
        type: "bold"
    },
    links
};

const linkListCtaProps: LinkListProps = {
    title: {
        value: "Popular Academic Links",
        type: "bold",
        cta: {
            label: "View all",
            url: "/all-links",
        }
    },
    links,
    maxLimitDesktop: 0
};
const linkListOverflowProps: LinkListProps = {
    title: {
        value: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ",
        type: "bold",
        cta: {
            label: "View all",
            url: "/all-links",
        }
    },
    links
};

const links2 = links.map( link => {
    return {
        ...link,
        url: "https://www.google.com/"
    };
} );

const linkListSemiBoldProps: LinkListProps = {
    title: {
        value: "Popular Academic Links",
        type: "semibold"
    },
    links: links2
};

const linkListCol3Props: LinkListProps = {
    title: {
        value: "Link list with columns",
        type: "bold"
    },
    links,
    elementsPerRow: 3,
};

const linkListCol6Props: LinkListProps = {
    title: {
        value: "Link list with columns",
        type: "bold"
    },
    links: links.slice( 0, 7 ),
    elementsPerRow: 6
};
const linkListCtaColProps: LinkListProps = {
    title: {
        value: "Popular Academic Links",
        type: "bold",
        cta: {
            label: "View all",
            url: "/all-links",
            icon: {
                class: "ci-Printer"
            }
        }
    },
    links,
    elementsPerRow: 3
};
const maxLinksDefault: LinkListProps = {
    title: {
        value: "Popular Academic Links",
        type: "bold",
        cta: {
            label: "View all",
            url: "/all-links",
        }
    },
    links: manyLinksArgs
};
const maxLinksSet: LinkListProps = {
    title: {
        value: "Popular Academic Links",
        type: "bold",
        cta: {
            label: "View all",
            url: "/all-links",
        }
    },
    links: manyLinksArgs,
    maxLimitDesktop: 5,
    maxLimitMobile: 10
};

linkListCTA.args = linkListCtaProps;
linkListBold.args = linkListBoldProps;
linkListSemiBold.args = linkListSemiBoldProps;
linkListColCTA.args = linkListCtaColProps;
linkListCol3.args = linkListCol3Props;
linkListCol6.args = linkListCol6Props;
linkListOverflow.args = linkListOverflowProps;
linkListMaxDefault.args = maxLinksDefault;
linkListMaxSet.args = maxLinksSet;
linkListMaxColDefault.args = {
    ...maxLinksDefault,
    elementsPerRow: 3
};
linkListMaxColSet.args = {
    ...maxLinksSet,
    elementsPerRow: 4
};
