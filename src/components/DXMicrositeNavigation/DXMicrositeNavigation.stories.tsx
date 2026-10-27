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

import React, { FormEventHandler } from 'react';
import { Meta, StoryFn } from "@storybook/react-webpack5";
import DXMicrositeNavigation from "./DXMicrositeNavigation";

const customViewports = {
    xs: {
        name: "iPhone XR",
        styles: {
            width: "414px",
            height: "896px",
        },
    }
};
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Navigation/Microsite Navigation",
    component: DXMicrositeNavigation,
    excludeStories: /.*Args$/,
} as Meta<typeof DXMicrositeNavigation>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXMicrositeNavigation> = ( args ) => <DXMicrositeNavigation {...args} />;

export const MicrositeNavigation = Template.bind( {} );
export const MicrositeNavigationChangedIcons = Template.bind( {} );
export const MicrositeThirdLevelNavigation = Template.bind( {} );

let handleSubmit: FormEventHandler<Element> = ( e ) => {
    e.preventDefault();
    alert( 'You clicked search.' );
};
// More on args: https://storybook.js.org/docs/react/writing-stories/args
MicrositeNavigation.args = {
    sliderMenu: {
        menuTitle: "My Feed",
        openButtonLabel: "Open",
        moreLink: {
            label: "",
            url: "https://hcl-software.com/",
            target: "_blank"
        },
        nextMeeting: {
            title: "My Feed",
            startDateTime: "2013-02-08 09Z",
            endDateTime: "2013-02-08 09:30:26.123+00:00",
            link: {
                label: "",
                url: "https://hcl-software.com/",
                target: "_blank"
            },
        },

    },
    navigation:
    {
        image: {
            url: "https://images.unsplash.com/photo-1661705969607-cde73828023d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
            altText: "image-1"
        },
        closePlaceholder: "Close",
        searchPlaceholder: "Search this site",
        searchSubmit: handleSubmit,
        footerButton:
        {
            header: "Chat with us!",
            img:
            {
                altText: "chatWithUs",

                url: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            },
            link: "https://en.wikipedia.org/wiki/Chatbot"
        },
        links: {
            items: [
                {
                    label: "Home",
                    url: "https://hcl-software.com/",
                },
                {
                    label: "Page 1",
                    url: "/page-1",
                    items: [
                        {
                            label: "Page 1.1",
                            url: "https://hcl-software.com"
                        },
                        {
                            label: "Page 1.2",
                            url: "https://www.hcl-software.com/about/",
                        },
                        {
                            label: "Page 1.2",
                            url: "/page-12"
                        }
                    ]
                },
                {
                    label: "Page 2",
                    url: "/page-2"
                },
                {
                    label: "Page 3",
                    url: "/page-3"
                },
                {
                    label: "Page 4",
                    url: "/page-4"
                },
            ]
        }
    },
};

MicrositeThirdLevelNavigation.args = {
    sliderMenu: {
        menuTitle: "My Feed",
        openButtonLabel: "Open",
        moreLink: {
            label: "",
            url: "https://hcl-software.com/",
            target: "_blank"
        },
        nextMeeting: {
            title: "My Feed",
            startDateTime: "2013-02-08 09Z",
            endDateTime: "2013-02-08 09:30:26.123+00:00",
            link: {
                label: "",
                url: "https://hcl-software.com/",
                target: "_blank"
            },
        },
    },
    navigation:
    {
        image: {
            url: "https://images.unsplash.com/photo-1661705969607-cde73828023d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
            altText: "image-1"
        },
        closePlaceholder: "Close",
        searchPlaceholder: "Search this site",
        searchSubmit: handleSubmit,
        footerButton:
        {
            header: "Chat with us!",
            img:
            {
                altText: "chatWithUs",

                url: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            },
            link: "https://en.wikipedia.org/wiki/Chatbot"
        },
        links: {
            items: [
                {
                    label: "Home",
                    url: "https://hcl-software.com/"
                },
                {
                    label: "Page 1",
                    url: "/page-1",
                    items: [
                        {
                            label: "Page 1.1",
                            url: "https://hcl-software.com"
                        },
                        {
                            label: "Page 1.2",
                            url: "https://www.hcl-software.com/about/",
                        },
                        {
                            label: "Page 1.2",
                            url: "/page-12",
                            items: [
                                {
                                    label: "Page 1.2.1",
                                    url: "https://hcl-software.com"
                                },
                                {
                                    label: "Page 1.2.2",
                                    url: "https://www.hcl-software.com/about/",
                                },
                                {
                                    label: "Page 1.2.3",
                                    url: "/page-123"
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "Page 2",
                    url: "/page-2"
                },
                {
                    label: "Page 3",
                    url: "/page-3"
                },
                {
                    label: "Page 4",
                    url: "/page-4"
                }
                ,
                {
                    label: "Page 5",
                    url: "https://hcl-software.com/",
                },
                {
                    label: "Page 6",
                    url: "https://hcl-software.com/",
                },
                {
                    label: "Page 7",
                    url: "https://hcl-software.com/",
                    items: [
                        {
                            label: "Page 7.1",
                            url: "https://hcl-software.com"
                        },
                        {
                            label: "Page 7.2",
                            url: "https://www.hcl-software.com/about/",
                        },
                        {
                            label: "Page 7.2",
                            url: "/page-72"
                        }
                    ]
                },
                {
                    label: "Page 8",
                    url: "https://hcl-software.com/",
                },
                {
                    label: "Page 9",
                    url: "https://hcl-software.com/",
                },
            ]
        }
    },
};

MicrositeThirdLevelNavigation.parameters = {
    viewport: {
        viewports: customViewports,
        defaultViewport: "xs"
    }
};

MicrositeNavigationChangedIcons.args = {
    ...MicrositeThirdLevelNavigation.args,
    icons: {
        open: "ci-Caret_Down_MD",
        close: "ci-Close_SM",
        more: "ci-Hamburger_LG",
        search: "ci-Note_Search"
    }
};
