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
import DXPortalLogos, { PortalLogosProps } from "./DXPortalLogos";

export default {
    title: "Components/General/Portal Logos",
    component: DXPortalLogos,
    excludeStories: /.*Args$/,
} as Meta<typeof DXPortalLogos>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXPortalLogos> = ( args ) => <DXPortalLogos {...args} />;

export const Default = Template.bind( {} );
export const WhitoutSecondaryLogo = Template.bind( {} );

//Default Portal Logos
export const portalLogosDefaultArgs: PortalLogosProps = {
    main: {
        label: "HCL Software Library",
        url: "https://hcl-software.com",
        imageSrc: "https://help.hcl-software.com/digital-experience/dx-95-doc-archive/CF213/assets/dx_logo.png"
    },
    secondary: {
        label: "Depart.",
        url: "https://hcl-software.com",
        imageSrc: "https://www.hcl-software.com/wps/wcm/connect/a185b95a-12cc-4252-9140-2b0ba40af651/hcl-software-logo.svg?MOD=AJPERES"
    }
};

//Whitout subtitle
export const portalLogosWhithoutSecondaryArgs: PortalLogosProps = {
    main: {
        label: "HCL Software Library",
        url: "https://hcl-software.com",
        imageSrc: "https://www.hcl-software.com/wps/wcm/connect/a185b95a-12cc-4252-9140-2b0ba40af651/hcl-software-logo.svg?MOD=AJPERES"
    }
};

Default.args = portalLogosDefaultArgs;
WhitoutSecondaryLogo.args = portalLogosWhithoutSecondaryArgs;
