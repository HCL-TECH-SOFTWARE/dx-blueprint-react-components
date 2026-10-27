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
import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXOnPageBanner, { OnPageBannerProps } from "./DXOnPageBanner";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Buttons and Headers/On Page Banner",
    component: DXOnPageBanner,
    excludeStories: /.*Args$/,
} as Meta<typeof DXOnPageBanner>;

const Template: StoryFn<typeof DXOnPageBanner> = ( args ) => <DXOnPageBanner {...args} />;

export const BasicConfiguration = Template.bind( {} );
export const PageBannerArgs: OnPageBannerProps = {
    imageProps: {
        image: "https://images.unsplash.com/photo-1609621838510-5ad474b7d25d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    },
    title: "Hello World!",
    subtitle: "01/01/2023",
    height: "300px"
};

BasicConfiguration.args = PageBannerArgs;

export const FullConfiguration = Template.bind( {} );
export const BreadcrumbArgs: OnPageBannerProps = {
    imageProps: {
        image: "https://images.unsplash.com/photo-1414694762283-acccc27bca85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2567&q=80",
        gradientSize: "large",
        objectFit: "fill"
    },
    title: "Hello World!",
    subtitle: "01/01/2023",
    height: "300px",
    breadcrumb: [
        {
            label: "Home",
            url: "https://www.hcl-software.com"
        },
        {
            label: "Local News",
            url: "https://www.hcl-software.com"
        }
    ],
    button: {
        active: {
            label: "Active Label",
            onClick: () => {},
            icon: {
                class: "ci-Checkbox_Check",
            },
            message: "Active Button Message",
        },
        inactive: {
            label: "Inactive Label",
            onClick: () => {},
            icon: {
                class: "ci-Checkbox_Unchecked",
            },
            message: "Inactive Button Message",
        },
    }
};
FullConfiguration.args = BreadcrumbArgs;

export const StringBreadcrumbs = Template.bind( {} );
export const BreadcrumbStringArgs: OnPageBannerProps = {
    imageProps: {
        image: "https://images.unsplash.com/photo-1414694762283-acccc27bca85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2567&q=80",
        gradientSize: "large",
        objectFit: "fill"
    },
    title: "Hello World!",
    subtitle: "01/01/2023",
    height: "300px",
    breadcrumb: '<a href="/one">Main Folder</a>&nbsp>&nbsp<a href="/two">Parent Content</a>&nbsp>&nbsp<a href="/three">Final Folder</a>',
    button: {
        active: {
            label: "Active Label",
            onClick: () => {},
            icon: {
                class: "ci-Checkbox_Check",
            },
            message: "Active Button Message",
            hideLabel: true,
        },
        inactive: {
            label: "Inactive Label",
            onClick: () => {},
            icon: {
                class: "ci-Checkbox_Unchecked",
            },
            message: "Inactive Button Message",
            hideLabel: true
        },
    }
};
StringBreadcrumbs.args = BreadcrumbStringArgs;

export const ChangedIcons = Template.bind( {} );
export const ChangedIconsArgs: OnPageBannerProps = {
    imageProps: {
        image: "https://images.unsplash.com/photo-1414694762283-acccc27bca85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2567&q=80",
        gradientSize: "large",
        objectFit: "fill"
    },
    title: "Hello World!",
    subtitle: "01/01/2023",
    height: "300px",
    breadcrumb: [
        {
            label: "Home",
            url: "https://www.hcl-software.com"
        },
        {
            label: "Local News",
            url: "https://www.hcl-software.com"
        }
    ],
    button: {
        active: {
            label: "Active Label",
            onClick: () => {},
            icon: {
                class: "ci-Checkbox_Check",
            },
            message: "Active Button Message",
        },
        inactive: {
            label: "Inactive Label",
            onClick: () => {},
            icon: {
                class: "ci-Checkbox_Unchecked",
            },
            message: "Inactive Button Message",
        },
    },
    icons: {
        breadcrumb: "ci-Arrow_Right_SM"
    }
};
ChangedIcons.args = ChangedIconsArgs;
