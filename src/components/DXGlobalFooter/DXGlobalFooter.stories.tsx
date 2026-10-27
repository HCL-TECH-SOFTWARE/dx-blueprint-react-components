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
import DXGlobalFooter, { FooterProps } from "./DXGlobalFooter";

export default {
    title: "Components/Navigation/Global Footer",
    component: DXGlobalFooter,
    excludeStories: /.*Args$/,
} as Meta<typeof DXGlobalFooter>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXGlobalFooter> = ( args ) => <DXGlobalFooter  {...args} />;

export const SampleFooter = Template.bind( {} );

const sampleFooterProps: FooterProps = {
    logo: "https://www.hcl-software.com/wps/wcm/connect/a185b95a-12cc-4252-9140-2b0ba40af651/hcl-software-logo.svg?MOD=AJPERES",
    altLogo: "hcl-logo",
    logoMobile: "https://www.hcl-software.com/wps/wcm/connect/a185b95a-12cc-4252-9140-2b0ba40af651/hcl-software-logo.svg?MOD=AJPERES",
    altMobile: "hcl-logo-mobile",
    copyright: "Copyright © 2024 HCL Technologies Limited",
    primaryLinks: [
        { url: "https://hcl-software.com", label: "HCL Software" },
        { url: "https://hcl-software.com", label: "Maps & Directions" },
        { url: "https://hcl-software.com", label: "Search HCL Software" },
        { url: "https://hcl-software.com", label: "Emergency info", target: "_blank" },
    ],
    secondaryLinks: [
        { url: "https://hcl-software.com", label: "Terms of use" },
        { url: "https://hcl-software.com", label: "Privacy" },
        { url: "https://hcl-software.com", label: "Copyright" },
        { url: "https://hcl-software.com", label: "Trademarks" },
        { url: "https://hcl-software.com", label: "Accesibility" },
    ]
};

SampleFooter.args = sampleFooterProps;
