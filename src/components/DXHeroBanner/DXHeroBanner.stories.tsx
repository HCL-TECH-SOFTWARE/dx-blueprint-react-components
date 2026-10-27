/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */
import React, { FormEventHandler } from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXHeroBanner, { HeroBannerProps } from "./DXHeroBanner";
import DXGenericMiniCatalog from "../DXGenericMiniCatalog";
import { fullImageCards } from "../DXGenericCatalog/utilities/CatalogItems";
import "./DXHeroBannerStories.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Home Page/Hero Banner",
    component: DXHeroBanner,
    excludeStories: /.*Args$/,
} as Meta;

let handleSubmit: FormEventHandler<Element> = ( e ) => {
    e.preventDefault();
    alert( 'You clicked submit.' );
};

const Template: StoryFn<HeroBannerProps> = ( args ) => <DXHeroBanner {...args} />;

const catalogProps = {
    header: {
        title: "Top Links",
    },
    body: {
        items: fullImageCards,
        componentType: "DXFullImageCard",
        elementsPerRow: 4,
        variant: "slider" as "slider"
    }
};


const ExtendedTemplate: StoryFn<HeroBannerProps> = ( args ) => (
    <div>
        <DXHeroBanner {...args} />
        <div className="generic-mini-catalog-container">
            <DXGenericMiniCatalog {...catalogProps} />
        </div>
    </div>
);

export const HeroBannerDefault = Template.bind( {} );
export const HeroBannerCompleteImplementation = Template.bind( {} );
export const HeroBannerVideo = Template.bind( {} );
export const HeroBannerChangedIcons = Template.bind( {} );
export const HeroBannerAnimatedTitle = Template.bind( {} );
export const HeroBannerAnimatedWithCatalog = ExtendedTemplate.bind( {} );



export const HeroBannerDefaultArgs: HeroBannerProps = {
    index: 1,
    header: "Hero Banner Header",
    subheader: "Sub-Header",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    background: {
        opacity: "light",
        url: "https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"
    },
    primaryButton: {
        label: "Click me!",
        onClick: handleSubmit,
    },
    secondaryButton: {
        label: "Submit",
        onClick: handleSubmit,
    },
    foreground: {
        image: "https://cdn.pixabay.com/photo/2022/10/24/11/00/moscow-city-7543127_1280.png",
        alt: "Hero banner with foreground image",
    }
};

export const HeroBannerVideoArgs = {
    index: 3,
    header: "Hero Banner Header",
    subheader: "Sub-Header",
    textAlign: "right",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    background: {
        isVideo: true,
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    primaryButton: {
        label: "Click me!",
        onClick: handleSubmit,
    },
    link: {
        label: "CONTACT US",
        url: "https://hcl-software.com"
    }
};
export const HeroBannerSuggestionArgs = {
    index: 4,
    header: "Hero Banner Header",
    subheader: "Sub-Header",
    textAlign: "right",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    background: {
        isVideo: true,
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    searchSuggestion: {
        searchItems: [
            { label: "Question 1", url: "#one" },
            { label: "Question 2", url: "#two" },
            { label: "Question 3", url: "#three" },
            { label: "Question 4", url: "#four" },
            { label: "Question 5", url: "#five" },
        ],
        searchFn: function ( filter: string ) {
            console.log( "This is what you searched: ", filter );
        },
        searchPlaceholder: "Look for..."
    }
};

export const HeroBannerChangedIconsArgs: HeroBannerProps = {
    index: 5,
    header: "Hero Banner Header",
    subheader: "Sub-Header",
    textAlign: "right",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    background: {
        url: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
        opacity: "dark"
    },
    primaryButton: {
        label: "Click me!",
        onClick: handleSubmit,
    },
    link: {
        label: "CONTACT US",
        url: "https://hcl-software.com"
    },
    foreground: {
        image: "https://cdn.pixabay.com/photo/2022/10/24/11/00/moscow-city-7543127_1280.png",
        alt: "Hero banner with foreground image",
        alignment: "left"
    },
    icons: {
        link: "ci-Chevron_Right"
    }
};

export const HeroBannerCompleteArgs = {
    index: 6,
    header: "Hero Banner Header",
    subheader: "Sub-Header",
    textAlign: "right",
    body: "Lorem ipsum dolor sit amet.",
    background: {
        isVideo: true,
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        heightDesktop: "480px"
    },
    searchSuggestion: {
        searchItems: [
            { label: "How to request vacations?", url: "#one" },
            { label: "What are my taxes?", url: "#two" },
            { label: "Check exit automatically", url: "#three" },
            { label: "Validate my profile", url: "#four" },
            { label: "Subscribe a new report", url: "#five" },
        ],
        searchFn: function ( filter: string ) {
            console.log( "This is what you searched: ", filter );
        },
        searchPlaceholder: "Look for..."
    },
    primaryButton: {
        label: "Click me!",
        onClick: handleSubmit,
    },
    secondaryButton: {
        label: "Secondary Click!",
        onClick: handleSubmit,
    },
    link: {
        label: "CONTACT US",
        url: "https://hcl-software.com"
    },
};

export const HeroBannerAnimatedTitleArgs: HeroBannerProps = {
    index: 2,
    header: "My business is",
    subheader: "Join now",
    background: {
        isVideo: true,
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        opacity: "dark"
    },
    searchSuggestion: {
        searchItems: [
            { label: "How to request vacations?", url: "#one" },
            { label: "What are my taxes?", url: "#two" },
            { label: "Check exit automatically", url: "#three" },
            { label: "Validate my profile", url: "#four" },
            { label: "Subscribe a new report", url: "#five" },
        ],
        searchFn: function ( filter: string ) {
            console.log( "This is what you searched: ", filter );
        },
        searchPlaceholder: "Look for..."
    },
    animatedText: {
        content: ['<em>Proficient</em>', '<em>Reliable</em>', '<em>Futuristic and...</em> <b>Awesome</b>'],
        typeSpeed: 100,
        loop: false
    }
};

export const HeroBannerAnimatedWithCatalogArgs: HeroBannerProps = {
    index: 7,
    header: "My business is",
    subheader: "Join now",
    background: {
        isVideo: true,
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        heightDesktop: "600px",
        heightMobile: "600px",
        opacity: "dark"
    },
    searchSuggestion: {
        searchItems: [
            { label: "Question 1", url: "#one" },
            { label: "Question 2", url: "#two" },
            { label: "Question 3", url: "#three" },
            { label: "Question 4", url: "#four" },
            { label: "Question 5", url: "#five" },
        ],
        searchFn: function ( filter: string ) {
            console.log( "This is what you searched: ", filter );
        },
        searchPlaceholder: "Look for..."
    },
    animatedText: {
        content: ['<em>Proficient</em>', '<em>Reliable</em>', '<em>Futuristic and...</em> <b>Awesome</b>'],
        typeSpeed: 100,
        loop: false
    }
};

HeroBannerDefault.args = HeroBannerDefaultArgs;
HeroBannerCompleteImplementation.args = HeroBannerCompleteArgs;
HeroBannerChangedIcons.args = HeroBannerChangedIconsArgs;
HeroBannerVideo.args = HeroBannerVideoArgs;
HeroBannerAnimatedTitle.args = HeroBannerAnimatedTitleArgs;
HeroBannerAnimatedWithCatalog.args = HeroBannerAnimatedWithCatalogArgs;
