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
import DXQuickLinks from "./DXQuickLinks";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Navigation/Quick Links",
    component: DXQuickLinks,
    excludeStories: /.*Args$/,
} as Meta<typeof DXQuickLinks>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXQuickLinks> = ( args ) => <DXQuickLinks {...args} />;

export const FullMenu = Template.bind( {} );
export const SmallerMenu = Template.bind( {} );
export const UnevenMenu = Template.bind( {} );

// More on args: https://storybook.js.org/docs/react/writing-stories/args
FullMenu.args = {
    index: 1,
    title: "Featured Links",
    quickLinksCollection: [{
        firstHeader: "1st line",
        secondHeader: "2nd line",
        superHeader: "Super head",
        url: "https://www.hcl-software.com",
        target: "_top"
    }, {
        firstHeader: "1st line",
        // secondHeader: "2nd line" ,
        // superHeader: "Super head",
        url: "https://www.hcl-software.com",
        target: "_parent"
    }, {
        firstHeader: "custom icon",
        //secondHeader: "2nd line",
        superHeader: "Internal",
        url: "https://www.hcl-software.com",
        iconClass: "ci-Building_01",
        target: "_self"
    }, {
        firstHeader: "custom icon",
        //secondHeader: "2nd line" ,
        superHeader: "External",
        url: "https://www.hcl-software.com",
        iconClass: "ci-Calendar",
        target: "_blank"
    }, {
        firstHeader: "default icon",
        //secondHeader: "2nd line",
        superHeader: "Internal",
        url: "https://www.hcl-software.com",
    }, {
        firstHeader: "default icon",
        //secondHeader: "2nd line",
        superHeader: "External",
        url: "https://www.hcl-software.com",
        target: "_blank"
    }]
};

SmallerMenu.args = {
    index: 2,
    title: "These are important links",
    quickLinksCollection: [{
        firstHeader: "1st line",
        secondHeader: "2nd line",
        superHeader: "Super head",
        url: "https://www.hcl-software.com"
    }, {
        firstHeader: "1st line",
        secondHeader: "2nd line",
        //superHeader: "Super head",
        url: "https://www.hcl-software.com",
        target: "_blank"
    }, {
        firstHeader: "1st line",
        //secondHeader: "2nd line",
        //superHeader: "Super head",
        url: "https://www.hcl-software.com",
    }, {
        firstHeader: "1st line",
        //secondHeader: "2nd line",
        superHeader: "Super head",
        url: "https://www.hcl-software.com",
        target: "_blank"
    }]
};

UnevenMenu.args = {
    index: 3,
    hideTitle: true,
    quickLinksCollection: [{
        firstHeader: "1st line",
        secondHeader: "2nd line",
        superHeader: "Super head",
        url: "https://www.hcl-software.com"
    }, {
        firstHeader: "1st line",
        secondHeader: "2nd line",
        //superHeader: "Super head",
        url: "https://www.hcl-software.com",
        target: "_blank"
    }, {
        firstHeader: "1st line",
        //secondHeader: "2nd line",
        //superHeader: "Super head",
        url: "https://www.hcl-software.com",
    }]
};
