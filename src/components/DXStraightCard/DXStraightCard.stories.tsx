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
import DXStraightCard, { StraightCardProps } from "./DXStraightCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Cards/Straight Card",
    component: DXStraightCard,
    excludeStories: /.*Args$/,
} as Meta<typeof DXStraightCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<StraightCardProps> = ( args ) => <DXStraightCard {...args} />;
const MobileTemplate: StoryFn<StraightCardProps> = ( args ) => (
    <div style={{ width: "100%", maxWidth: "390px" }}>
        <DXStraightCard {...args} />
    </div>
);

export const StraightCardDesktop = Template.bind( {} );
export const DescriptionBreadcrumbs = Template.bind( {} );
export const DateUrl = Template.bind( {} );
export const DateLabels = Template.bind( {} );
export const DateDescUrl = Template.bind( {} );
export const DescUrl = Template.bind( {} );

export const StraightCardMobile = MobileTemplate.bind( {} );
export const DescriptionBreadcrumbsMobile = MobileTemplate.bind( {} );
export const DateUrlMobile = MobileTemplate.bind( {} );
export const DateLabelsMobile = MobileTemplate.bind( {} );
export const DateDescUrlMobile = MobileTemplate.bind( {} );
export const ChangedIcons = Template.bind( {} );




// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const StraightCardArgs: StraightCardProps = {
    showChevron: true,
    showLink: true,
    title: {
        label: "Title Goes Here",
        url: "https://www.hcl-software.com",
        target: "_blank"
    },
    date: "02/01/2022",
    dateFormat: "MM/DD/YY",
    subtitle: "Build a page using page fragments and edit content inline.",
    breadcrumb: [
        {
            label: "Location",
            url: "https://www.hcl-software.com"
        },
        {
            label: "Department",
            url: "https://www.hcl-software.com"
        },
        {
            label: "Catalog",
            url: "https://www.hcl-software.com"
        }
    ],
    tags: [
        {
            label: "Label Text",
            color: "red"
        },
        {
            label: "Label Text",
            color: "#5e5e5e"
        },
        {
            label: "Label Text",
            color: "var(--primary-primary-l1)"
        },
        {
            label: "Label Text",
            color: "#5e5e5e"
        },
    ]
};

export const RichTextBreadcrumbsArgs: StraightCardProps = {
    title: StraightCardArgs.title,
    breadcrumb: `<a href="/one">Location</a> > <a href="/two">Department</a> > <a href="/three">Catalog</a>`,
    subtitle: "Build a page using page fragments and edit content inline.",
    showLink: false,
    showChevron: true
};

export const DateUrlArgs: StraightCardProps = {
    title: StraightCardArgs.title,
    date: StraightCardArgs.date,
    dateFormat: StraightCardArgs.dateFormat,
    showLink: true,
    showChevron: true
};

export const DateLabelsArgs: StraightCardProps = {
    title: StraightCardArgs.title,
    date: StraightCardArgs.date,
    dateFormat: StraightCardArgs.dateFormat,
    tags: StraightCardArgs.tags,
    showChevron: true
};

export const DateDescUrlArgs: StraightCardProps = {
    title: StraightCardArgs.title,
    date: StraightCardArgs.date,
    dateFormat: StraightCardArgs.dateFormat,
    subtitle: StraightCardArgs.subtitle,
    showLink: true,
    showChevron: true
};

export const DescUrlArgs: StraightCardProps = {
    title: StraightCardArgs.title,
    subtitle: StraightCardArgs.subtitle,
    showLink: true,
    showChevron: true
};

export const CompleteDataRichBreadcrumbArgs: StraightCardProps = {
    ...StraightCardArgs,
    breadcrumb: RichTextBreadcrumbsArgs.breadcrumb,
    showLink: true,
    showChevron: true
};

StraightCardDesktop.args = CompleteDataRichBreadcrumbArgs;
DescriptionBreadcrumbs.args = RichTextBreadcrumbsArgs;
DateUrl.args = DateUrlArgs;
DateLabels.args = DateLabelsArgs;
DateDescUrl.args = DateDescUrlArgs;
DescUrl.args = DescUrlArgs;

StraightCardMobile.args = CompleteDataRichBreadcrumbArgs;
DescriptionBreadcrumbsMobile.args = RichTextBreadcrumbsArgs;
DateUrlMobile.args = DateUrlArgs;
DateLabelsMobile.args = DateLabelsArgs;
DateDescUrlMobile.args = DateDescUrlArgs;


ChangedIcons.args = {
    ...StraightCardArgs,
    icons: {
        breadcrumb: "ci-Chevron_Right_Duo",
        link: "ci-Arrow_Right_MD"
    }
};
