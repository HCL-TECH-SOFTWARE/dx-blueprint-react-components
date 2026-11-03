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
import DXInteractiveTabs from "./DXInteractiveTabs";
import { EventItemProps } from "../DXEventItem/DXEventItem";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/General/Interactive Tabs",
    component: DXInteractiveTabs,
    excludeStories: /.*Args$/,
} as Meta<typeof DXInteractiveTabs>;

const Template: StoryFn<typeof DXInteractiveTabs> = ( args ) => <DXInteractiveTabs {...args} />;

export const Catalog = Template.bind( {} );
export const ImageVariant = Template.bind( {} );
export const VideoVariant = Template.bind( {} );
export const MaxMediaHeight = Template.bind( {} );
export const MoreTabs = Template.bind( {} );
export const Empty = Template.bind( {} );

Empty.args = {
    tabs: []
};

export const eventItemsArgs: EventItemProps[] = [
    {
        variant: "event",
        eventDate: "10/18/23",
        dateFormat: "MM/DD/YY",
        eventStartTime: "15:30",
        eventEndTime: "16:30",
        eventName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur maximus blandit cras sit  ",
        link: {
            label: "",
            url: "https://hcl-software.com",
            target: "_self"
        },
    },
    {
        variant: "event",
        eventDate: "10/19/23",
        dateFormat: "MM/DD/YY",
        eventStartTime: "15:30",
        eventEndTime: "16:30",
        eventName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur maximus blandit cras sit  ",
        link: {
            label: "",
            url: "https://hcl-software.com",
            target: "_self"
        },
    },
    {
        variant: "event",
        eventDate: "10/20/23",
        dateFormat: "MM/DD/YY",
        eventStartTime: "15:30",
        eventEndTime: "16:30",
        eventName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur maximus blandit cras sit  ",
        link: {
            label: "",
            url: "https://hcl-software.com",
            target: "_self"
        },
    },
    {
        variant: "event",
        eventDate: "10/21/23",
        dateFormat: "MM/DD/YY",
        eventStartTime: "15:30",
        eventEndTime: "16:30",
        eventName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur maximus blandit cras sit  ",
        link: {
            label: "",
            url: "https://hcl-software.com",
            target: "_self"
        },
    },
    {
        variant: "event",
        eventDate: "10/22/23",
        dateFormat: "MM/DD/YY",
        eventStartTime: "15:30",
        eventEndTime: "16:30",
        eventName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur maximus blandit cras sit  ",
        link: {
            label: "",
            url: "https://hcl-software.com",
            target: "_self"
        },
    },
    {
        variant: "event",
        eventDate: "10/23/23",
        dateFormat: "MM/DD/YY",
        eventStartTime: "15:30",
        eventEndTime: "16:30",
        eventName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur maximus blandit cras sit  ",
        link: {
            label: "",
            url: "https://hcl-software.com",
            target: "_self"
        },
    },
    {
        variant: "event",
        eventDate: "10/24/23",
        dateFormat: "MM/DD/YY",
        eventStartTime: "15:30",
        eventEndTime: "16:30",
        eventName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur maximus blandit cras sit  ",
        link: {
            label: "",
            url: "https://hcl-software.com",
            target: "_self"
        },
    },
    {
        variant: "event",
        eventDate: "10/25/23",
        dateFormat: "MM/DD/YY",
        eventStartTime: "15:30",
        eventEndTime: "16:30",
        eventName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur maximus blandit cras sit  ",
        link: {
            label: "",
            url: "https://hcl-software.com",
            target: "_self"
        },
    },
    {
        variant: "event",
        eventDate: "10/26/23",
        dateFormat: "MM/DD/YY",
        eventStartTime: "15:30",
        eventEndTime: "16:30",
        eventName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur maximus blandit cras sit  ",
        link: {
            label: "",
            url: "https://hcl-software.com",
            target: "_self"
        },
    },
    {
        variant: "event",
        eventDate: "10/27/23",
        dateFormat: "MM/DD/YY",
        eventStartTime: "15:30",
        eventEndTime: "16:30",
        eventName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur maximus blandit cras sit  ",
        link: {
            label: "",
            url: "https://hcl-software.com",
            target: "_self"
        },
    },
    {
        variant: "event",
        eventDate: "10/28/23",
        dateFormat: "MM/DD/YY",
        eventStartTime: "15:30",
        eventEndTime: "16:30",
        eventName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur maximus blandit cras sit  ",
        link: {
            label: "",
            url: "https://hcl-software.com",
            target: "_self"
        },
    },
    {
        variant: "event",
        eventDate: "10/29/23",
        dateFormat: "MM/DD/YY",
        eventStartTime: "15:30",
        eventEndTime: "16:30",
        eventName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur maximus blandit cras sit  ",
        link: {
            label: "",
            url: "https://hcl-software.com",
            target: "_self"
        },
    },
];

ImageVariant.args = {
    tabs: [
        {
            label: "Version 1",
            content: {
                image: {
                    url: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60",
                    altText: "image-1"
                },
                textContent: {
                    title: "Lets Get Started!",
                    subtitle: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
                    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ",
                    button: {
                        label: "Registration information",
                        onClick: function () { console.log( "I was called" ); }
                    }
                }
            }
        },
        {
            label: "Version 2",
            content: {
                image: {
                    url: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60",
                    altText: "image-1"
                },
                accordionCatalog: {
                    items: [
                        {
                            label: "Label 1",
                            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                        },
                        {
                            label: "Label 2",
                            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                        },
                        {
                            label: "Label 3",
                            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                        },
                        {
                            label: "Label 4",
                            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                        },
                    ]
                }
            }
        }
    ]
};

VideoVariant.args = {
    tabs: [
        {
            label: "Version 1",
            content: {
                video: {
                    url: "https://www.youtube.com/embed/iONDebHX9qk?controls=0",
                    title: "Video-1"
                },
                textContent: {
                    title: "Lets Get Started!",
                    subtitle: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
                    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ",
                    button: {
                        label: "Registration information",
                        onClick: function () { console.log( "I was called" ); }
                    }
                }
            }
        },
        {
            label: "Version 2",
            content: {
                video: {
                    url: "https://www.youtube.com/embed/iONDebHX9qk?controls=0",
                    title: "Video-1"
                },
                accordionCatalog: {
                    activeIndex: -1,
                    items: [
                        {
                            label: "Label 1",
                            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                        },
                        {
                            label: "Label 2",
                            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                        },
                        {
                            label: "Label 3",
                            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                        },
                        {
                            label: "Label 4",
                            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p ñadamsnfladndalksnclasndlandla-d,ma,ma.sd,a. as.",
                        },
                    ]
                }
            }
        }
    ],
    mediaPosition: "right"
};

Catalog.args = {
    tabs: [
        {
            label: "Version 1",
            content: {
                catalog: {
                    items: eventItemsArgs,
                    paginationProps: {
                        sets: ["3", "6", "9"],
                        active: 1,
                        activeSet: 6,
                    },
                    elementsPerRow: 3
                }
            }
        },
        {
            label: "Version 2",
            content: {
                video: {
                    url: "https://www.youtube.com/embed/iONDebHX9qk?controls=0",
                    title: "Video-1"
                },
                textContent: {
                    title: "Lets Get Started!",
                    subtitle: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
                    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ",
                    button: {
                        label: "Registration information",
                        onClick: function () { console.log( "I was called" ); }
                    }
                }
            }
        }
    ]
};

MaxMediaHeight.args = {
    tabs: [
        {
            label: "Version 1",
            content: {
                image: {
                    url: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60",
                    altText: "image-1"
                },
                textContent: {
                    title: "Lets Get Started!",
                    subtitle: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
                    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ",
                    button: {
                        label: "Registration information",
                        onClick: function () { console.log( "I was called" ); }
                    }
                }
            }
        },
        {
            label: "Version 2",
            content: {
                video: {
                    url: "https://www.youtube.com/embed/iONDebHX9qk?controls=0",
                    title: "Video-1"
                },
                textContent: {
                    title: "Lets Get Started!",
                    subtitle: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
                    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ",
                    button: {
                        label: "Registration information",
                        onClick: function () { console.log( "I was called" ); }
                    }
                }
            }
        },
    ],
    maxMediaHeight: "300px"
};

MoreTabs.args = {
    tabs: [
        {
            label: "Version 1",
            content: {
                video: {
                    url: "https://www.youtube.com/embed/iONDebHX9qk?controls=0",
                    title: "Video-1"
                },
                textContent: {
                    title: "Lets Get Started!",
                    subtitle: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
                    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ",
                    button: {
                        label: "Registration information",
                        onClick: function () { console.log( "I was called" ); }
                    }
                }
            }
        },
        {
            label: "Version 2",
            content: {
                catalog: {
                    items: eventItemsArgs,
                    paginationProps: {
                        sets: ["3", "6", "9"],
                        active: 1,
                        activeSet: 6,
                    },
                    elementsPerRow: 3
                }
            }
        },
        {
            label: "Version 3",
            content: {
                image: {
                    url: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60",
                    altText: "image-1"
                },
                textContent: {
                    title: "Lets Get Started!",
                    subtitle: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
                    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ",
                    button: {
                        label: "Registration information",
                        onClick: function () { console.log( "I was called" ); }
                    }
                }
            }
        },
        {
            label: "Version 4",
            content: {
                video: {
                    url: "https://www.youtube.com/embed/iONDebHX9qk?controls=0",
                    title: "Video-1"
                },
                textContent: {
                    title: "Lets Get Started!",
                    subtitle: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
                    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ",
                    button: {
                        label: "Registration information",
                        onClick: function () { console.log( "I was called" ); }
                    }
                }
            }
        },
    ],
};
