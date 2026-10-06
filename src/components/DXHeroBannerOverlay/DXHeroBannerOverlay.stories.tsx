import React, { FormEventHandler } from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXHeroBannerOverlay, { HeroBannerOverlayProps } from "./DXHeroBannerOverlay";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Home Page/Hero Banner Overlay",
    component: DXHeroBannerOverlay,
    excludeStories: /.*Args$/,
} as Meta;

let handleSubmit: FormEventHandler<Element> = ( e ) => {
    e.preventDefault();
    alert( 'You clicked submit.' );
};

const Template: StoryFn<HeroBannerOverlayProps> = ( args ) => <DXHeroBannerOverlay {...args} />;

export const HeroBannerOverlay = Template.bind( {} );
export const HeroBannerOverlayChangedIcons = Template.bind( {} );
export const HeroBannerOverlayArgs: HeroBannerOverlayProps = {
    index: 3,
    header: "Hero Banner Header",
    subheader: "Sub-Header",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    link: {
        label: "Custom link",
        url: "#"
    },
    background: {
        color: "primary",
        paddingTop: "100px",
        paddingBottom: "50px",
        heightDesktop: "600px"
    },
    media: {
        isVideo: true,
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        marginLeft: "1%",
        marginRight: "1%",
        opacity: "dark"
    },
    overlayImage: "https://cdn.pixabay.com/photo/2023/04/02/01/38/birds-7893439_1280.png",
    foreground: {
        image: "https://cdn.pixabay.com/photo/2019/07/26/20/52/man-4365597_1280.png",
        alignment: "right"
    },
    textColor: "#6fbce2"
};
HeroBannerOverlay.args = HeroBannerOverlayArgs;
HeroBannerOverlayChangedIcons.args = {
    ...HeroBannerOverlayArgs,
    link: {
        label: "My link",
        url: "www.hcl-software.com"
    },
    icons: {
        link: "ci-Chevron_Right"
    }
};
