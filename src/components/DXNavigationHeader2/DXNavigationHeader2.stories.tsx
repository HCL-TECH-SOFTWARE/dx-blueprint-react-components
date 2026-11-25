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

import React from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import { searchVisibleArgs } from "../DXSearchInput/DXSearchInput.stories";
import { portalLogosDefaultArgs } from "../DXPortalLogos/DXPortalLogos.stories";
import DXNavigationHeader2, { NavigationProps } from "./DXNavigationHeader2";

const navigationHeader2ResourceCards = Array.from( { length: 16 }, ( _, index ) => ( {
    id: index,
    title: "Card Title",
    description: "Description",
    metadata: "Additional Metadata",
    image: "/chessboard.jpg",
} ) );

const navigationHeader2ContentActions = [
    { id: "primary", label: "Regular Button", size: "regular" },
    { id: "secondary-1", label: "Regular Button", size: "large" },
    { id: "secondary-2", label: "Regular Button", size: "large" },
];

const navigationHeader2SavedLinks = [
    ["View Payslip", "Mission Planning"],
    ["Virtual Roster", "Space Exploration"],
    ["Kronos Soft Clock (Web Clock)", "Mission Planning"],
    ["Intranet Application Portal", "Mission Planning"],
    ["Space Rewards", "Spacecraft Design"],
    ["Okta", "Propulsion & Rocketry"],
    ["Linkedin Learning", "Propulsion & Rocketry"],
    ["Spotfire", "Space Mining"],
    ["DCHP Health Score", "Satellite Systems"],
    ["Ethics Point", "Satellite Systems"],
    ["Connect-ENG", "Propulsion & Rocketry"],
    ["Grokker", "Space Exploration"],
    ["Space Print Center", "Life Support"],
    ["Employee Offers", "Astronaut Training"],
];

const navigationHeader2AccountItems = [
    { label: "My Profile", icon: "ci-User_Circle" },
    { label: "Notifications", icon: "ci-Bell", badge: "1" },
    { label: "Settings", icon: "ci-Settings" },
    { label: "Language", icon: "ci-Globe" },
    { label: "Workday", icon: "ci-Building_01" },
    { label: "My Links", icon: "ci-External_Link" },
    { label: "My Business Hours", icon: "ci-Timer" },
    { label: "Logout", icon: "ci-Log_Out" },
];

const navigationHeader2Subcategories = Array.from( { length: 10 }, ( _, index ) => ( {
    title: `Subcategory ${index + 1}`,
    index: index + 1,
} ) );

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Navigation/Navigation Header 2",
    component: DXNavigationHeader2,
    excludeStories: /.*Args$/,
} as Meta<typeof DXNavigationHeader2>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<NavigationProps> = ( args ) =>
    <>
        <DXNavigationHeader2 {...args} />
        <div style={{ display: "none" }}>
            <div id="content-1">
                <div className="dxNavigationHeader2__helpPanel">
                    <div className="dxNavigationHeader2__helpHeader">
                        <div className="dxNavigationHeader2__helpIntro">
                            <h3>Need Help? Check out this resources</h3>
                            <div className="dxNavigationHeader2__helpToggles" role="group" aria-label="Help resources">
                                <button type="button">Toggle 16</button>
                                <button type="button" className="selected">Toggle 16</button>
                                <button type="button">Toggle 16</button>
                                <button type="button">Toggle 16</button>
                            </div>
                        </div>
                        <div className="dxNavigationHeader2__helpActions" aria-label="Utility menu actions">
                            <button type="button">Regular Button</button>
                            <button type="button">Regular Button</button>
                            <button type="button">Regular Button</button>
                        </div>
                    </div>
                    <section className="dxNavigationHeader2__helpContent" aria-label="Utility menu content">
                        <div className="dxNavigationHeader2__resourceList">
                            {navigationHeader2ResourceCards.map( ( card ) => (
                                <article className="dxNavigationHeader2__resourceCard" key={card.id}>
                                    <div className="dxNavigationHeader2__resourceImageBlock">
                                        <img src={card.image} alt="" />
                                        <span className="dxNavigationHeader2__resourceImageLines" aria-hidden="true" />
                                    </div>
                                    <div className="dxNavigationHeader2__resourceListBlock">
                                        <h4>{card.title}</h4>
                                        <div className="dxNavigationHeader2__resourceMetadata">
                                            <span>{card.description}</span>
                                            <span>{card.metadata}</span>
                                        </div>
                                    </div>
                                </article>
                            ) )}
                        </div>
                    </section>
                    <section className="dxNavigationHeader2__contentButtons" aria-label="Utility menu options">
                        <div className="dxNavigationHeader2__optionsRow">
                            {navigationHeader2ContentActions.map( ( action ) => (
                                <button
                                    className={`dxNavigationHeader2__contentButton dxNavigationHeader2__contentButton--${action.size}`}
                                    key={action.id}
                                    type="button">
                                    {action.label}
                                </button>
                            ) )}
                        </div>
                    </section>
                </div>
            </div>
            <div id="content-2">
                <div className="dxNavigationHeader2__savedLinksPanel">
                    <div className="dxNavigationHeader2__savedLinksHeader">
                        <div className="dxNavigationHeader2__helpIntro">
                            <h3>My Links</h3>
                            <div className="dxNavigationHeader2__helpToggles" role="group" aria-label="Saved links filters">
                                <button type="button">Toggle 16</button>
                                <button type="button" className="selected">Toggle 16</button>
                                <button type="button">Toggle 16</button>
                                <button type="button">Toggle 16</button>
                            </div>
                        </div>
                        <div className="dxNavigationHeader2__savedLinksActions" aria-label="Saved links actions">
                            <button type="button">Regular Button</button>
                        </div>
                    </div>
                    <section className="dxNavigationHeader2__savedLinksContent" aria-label="My Links menu buttons">
                        <div className="dxNavigationHeader2__savedLinksGrid">
                            {navigationHeader2SavedLinks.map( ( [title, label] ) => (
                                <button className="dxNavigationHeader2__savedLinkButton" key={title} type="button">
                                    <span className="dxNavigationHeader2__savedLinkButtonLeft">
                                        <span className="dxNavigationHeader2__savedLinkButtonTitle">{title}</span>
                                        <span className="dxNavigationHeader2__savedLinkButtonLabel">{label}</span>
                                    </span>
                                    <span className="dxNavigationHeader2__savedLinkButtonRight">
                                        <i className="ci-External_Link" aria-hidden="true" />
                                    </span>
                                </button>
                            ) )}
                        </div>
                    </section>
                </div>
            </div>
            <div id="content-3">
                <div className="dxNavigationHeader2__nextActivityPanel">
                    <div className="dxNavigationHeader2__nextActivityHeader">
                        <div className="dxNavigationHeader2__nextActivityHeaderRow">
                            <div className="dxNavigationHeader2__helpToggles" role="group" aria-label="Next activity filters">
                                <button type="button">Toggle 16</button>
                                <button type="button" className="selected">Toggle 16</button>
                                <button type="button">Toggle 16</button>
                                <button type="button">Toggle 16</button>
                            </div>
                            <div className="dxNavigationHeader2__nextActivityToggleMenu" role="group" aria-label="Next activity views">
                                <button type="button">Toggle</button>
                                <button type="button">Toggle</button>
                                <button type="button">Toggle</button>
                            </div>
                        </div>
                    </div>
                    <section className="dxNavigationHeader2__helpContent" aria-label="Next activity resources">
                        <div className="dxNavigationHeader2__resourceList">
                            {navigationHeader2ResourceCards.map( ( card ) => (
                                <article className="dxNavigationHeader2__resourceCard" key={card.id}>
                                    <div className="dxNavigationHeader2__resourceImageBlock">
                                        <img src={card.image} alt="" />
                                        <span className="dxNavigationHeader2__resourceImageLines" aria-hidden="true" />
                                    </div>
                                    <div className="dxNavigationHeader2__resourceListBlock">
                                        <h4>{card.title}</h4>
                                        <div className="dxNavigationHeader2__resourceMetadata">
                                            <span>{card.description}</span>
                                            <span>{card.metadata}</span>
                                        </div>
                                    </div>
                                </article>
                            ) )}
                        </div>
                    </section>
                </div>
            </div>
            <div id="content-4">
                <div className="dxNavigationHeader2__accountPanel">
                    <div className="dxNavigationHeader2__accountHeader">
                        <div className="dxNavigationHeader2__helpIntro">
                            <h3>My Links</h3>
                            <div className="dxNavigationHeader2__helpToggles" role="group" aria-label="Account filters">
                                <button type="button">Toggle 16</button>
                                <button type="button" className="selected">Toggle 16</button>
                                <button type="button">Toggle 16</button>
                                <button type="button">Toggle 16</button>
                            </div>
                        </div>
                    </div>
                    <section className="dxNavigationHeader2__accountContent" aria-label="My account menu buttons">
                        <div className="dxNavigationHeader2__accountGrid">
                            {navigationHeader2AccountItems.map( ( item ) => (
                                <button className="dxNavigationHeader2__accountButton" key={item.label} type="button">
                                    <span className="dxNavigationHeader2__accountButtonLeft">
                                        <i className={item.icon} aria-hidden="true" />
                                        <span>{item.label}</span>
                                    </span>
                                    {item.badge && <span className="dxNavigationHeader2__accountBadge">{item.badge}</span>}
                                </button>
                            ) )}
                        </div>
                    </section>
                </div>
            </div>
            <div id="my-content" className="dxNavigationHeader2__sidebarContent">
                <section className="dxNavigationHeader2__sidebarSection dxNavigationHeader2__sidebarPeopleSection">
                    <h3>People I Work With</h3>
                    <div className="dxNavigationHeader2__sidebarPeople">
                        {Array.from( { length: 2 }, ( _, rowIndex ) => (
                            <div className="dxNavigationHeader2__sidebarPeopleRow" key={rowIndex}>
                                {Array.from( { length: 4 }, ( __, avatarIndex ) => (
                                    <img
                                        alt="Person avatar"
                                        className="dxNavigationHeader2__sidebarAvatar"
                                        key={avatarIndex}
                                        src="/avatar.png"
                                    />
                                ) )}
                            </div>
                        ) )}
                    </div>
                </section>
                <section className="dxNavigationHeader2__sidebarSection dxNavigationHeader2__sidebarSectionTwo" aria-label="Favorite sites">
                    <div className="dxNavigationHeader2__sidebarSectionTitle">
                        <h3>Favorite Sites</h3>
                        <button type="button">Small Button</button>
                    </div>
                    <div className="dxNavigationHeader2__favoriteSites">
                        <div className="dxNavigationHeader2__favoriteSitesList">
                            {Array.from( { length: 5 }, ( _, index ) => (
                                <button className="dxNavigationHeader2__favoriteSiteCard" key={index} type="button">
                                    <span className="dxNavigationHeader2__favoriteSiteImage">
                                        <img alt={`Site ${index + 1}`} src="/site1.jpg" />
                                    </span>
                                    <span className="dxNavigationHeader2__favoriteSiteLabel">Site {index + 1}</span>
                                </button>
                            ) )}
                        </div>
                    </div>
                </section>
                <section className="dxNavigationHeader2__sidebarSection dxNavigationHeader2__sidebarSectionThree" aria-label="Apps">
                    <div className="dxNavigationHeader2__sidebarSectionTitle">
                        <h3>Apps</h3>
                        <button type="button">Small Button</button>
                    </div>
                    <div className="dxNavigationHeader2__apps">
                        {Array.from( { length: 2 }, ( _, rowIndex ) => (
                            <div className="dxNavigationHeader2__appsRow" key={rowIndex}>
                                {Array.from( { length: 5 }, ( __, appIndex ) => (
                                    <button className="dxNavigationHeader2__app" key={appIndex} type="button">
                                        <img alt={`App ${appIndex + 1}`} src="/site1.jpg" />
                                        <span>App 1</span>
                                    </button>
                                ) )}
                            </div>
                        ) )}
                    </div>
                </section>
                <button className="dxNavigationHeader2__sidebarButton" type="button">Regular Button</button>
            </div>
        </div>
    </>;

export const NavigationHeader2 = Template.bind( {} );
// More on args: https://storybook.js.org/docs/react/writing-stories/args

const HOUR_IN_MS = 60 * 60 * 1000;
let startTime = new Date( Date.now() + HOUR_IN_MS ).toISOString();
let endTime = new Date( Date.now() + 2 * HOUR_IN_MS ).toISOString();

const navigationHeader2UtilityItems = [
    {
        icon: "ci-Circle_Help",
        label: "Help",
        showLabel: true,
        onClick: () => {},
        contentId: "#content-1",
    },
    {
        icon: "ci-Tag",
        label: "Saved Links",
        showLabel: true,
        onClick: () => {},
        contentId: "#content-2",
    },
    {
        icon: "ci-List_Checklist",
        label: "Next Activity",
        showLabel: true,
        onClick: () => {},
        contentId: "#content-3",
    },
    {
        icon: "",
        label: "User",
        showLabel: true,
        image: {
            url: "/avatar.png",
            altText: "User profile",
        },
        badge: 1,
        onClick: () => {},
        contentId: "#content-4",
    },
];

export const NavigationHeader2Args: NavigationProps = {
    portalLogos: portalLogosDefaultArgs,
    searchInput: { ...searchVisibleArgs, showOverlay: true },
    megaMenu: {
        showOverlay: true,
        globalLinks: [
            {
                url: "#contact-us",
                label: "Contact us",
                target: "_self"
            },
            {
                url: "#privacy-policy",
                label: "Privacy Policy",
                target: "_self"
            },
            {
                url: "#copyright-policy",
                label: "Copyright Policy",
                target: "_self"
            },
            {
                url: "#accessibility",
                label: "Accessibility",
                target: "_self"
            },
        ],
        socialLinks: [
            { url: "https://www.facebook.com/franklarose", label: "Facebook", image: "/Facebook_Negative.svg" },
            { url: "https://twitter.com/FrankLaRose", label: "Twitter", image: "/Twitter_Negative.svg" },
            { url: "https://www.instagram.com/franklarose/", label: "Instagram", image: "/Instagram_Negative.svg" },
            { url: "https://www.youtube.com/c/FrankLaRose", label: "YouTube", image: "/YouTube_Negative.svg" },
        ],
        navigationItems: [
            {
                title: "Home",
                iconClass: "ci-House_01",
                index: 0,
            },
            {
                title: "My Workspace",
                selectedTitle: "Section A",
                index: 1,
                bannerProps: [
                    {
                        title: "Open Positions",
                        image: "/CV.png",
                        body: "Get support from our\nteam of experts.",
                    }
                ],
                children: [
                    { title: "Category 1", index: 1, showChevron: true, children: navigationHeader2Subcategories },
                    { title: "Category 2", index: 2, showChevron: true, children: navigationHeader2Subcategories },
                    { title: "Category 3", index: 3, showChevron: true, children: navigationHeader2Subcategories },
                ]
            },
            {
                title: "Life & Career",
                selectedTitle: "Section B",
                url: "https://www.bing.com",
                index: 2,
                bannerProps: [
                    {
                        title: "Open Positions",
                        image: "/CV.png",
                        body: "Get support from our\nteam of experts.",
                    }
                ],
                children: [
                    { title: "Category 1", index: 1, showChevron: true, children: navigationHeader2Subcategories },
                    { title: "Category 2", index: 2, showChevron: true, children: navigationHeader2Subcategories },
                    { title: "Category 3", index: 3, showChevron: true, children: navigationHeader2Subcategories },
                ]
            },
            {
                title: "Explore",
                selectedTitle: "Section C",
                url: "https://www.bing.com",
                index: 3,
                bannerProps: [
                    {
                        title: "Open Positions",
                        image: "/CV.png",
                        body: "Get support from our\nteam of experts.",
                    }
                ],
                children: [
                    { title: "Category 1", index: 1, showChevron: true, children: navigationHeader2Subcategories },
                    { title: "Category 2", index: 2, showChevron: true, children: navigationHeader2Subcategories },
                    { title: "Category 3", index: 3, showChevron: true, children: navigationHeader2Subcategories },
                ],
            },
            {
                title: "News Feed",
                url: "https://google.com",
                index: 4,
            },
            {
                title: "Self Service",
                url: "https://google.com",
                index: 5,
            }
        ],
    },
    nextMeeting: {
        title: "My Next Meeting",
        startDateTime: startTime,
        endDateTime: endTime,
        link: {
            label: "",
            url: "https://hcl-software.com/",
            target: "_blank"
        },
    },
    drawer: {
        direction: "right",
        contentId: "#my-content",
        showOverlay: true
    },
    utilityZone: { items: navigationHeader2UtilityItems, showOverlay: true, enableIconPanels: true }
};

NavigationHeader2.args = NavigationHeader2Args;

