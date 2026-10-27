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
import DXDownloadCard from "./DXDownloadCard";

export default {
    title: "Components/Cards/Download Card",
    component: DXDownloadCard,
    excludeStories: /.*Args$/,
} as Meta<typeof DXDownloadCard>;

const Template: StoryFn<typeof DXDownloadCard> = ( args ) => <DXDownloadCard {...args} />;

export const RegularDownload = Template.bind( {} );
export const ChangedIcons = Template.bind( {} );
export const LongName = Template.bind( {} );
export const CustomFileName = Template.bind( {} );

export const downloadArgs = {
    url: "https://www.hcl-software.com/wps/wcm/connect/2373e5c7-3b3d-4ff4-8957-b72d8ecb8bbf/us-state-government.docx?MOD=AJPERES&CONVERT_TO=url",
};

ChangedIcons.args = {
    ...downloadArgs,
    icons: {
        download: "ci-Download_Package",
        doc: "ci-File_Document"
    }
};

RegularDownload.args = {
    ...downloadArgs,
    size: "300KB"
};

LongName.args = {
    url: "https://www.hcl-software.com/wps/wcm/connect/94571e2f-d042-4e0a-a43c-b70af2f31976/3m-story.pdf?MOD=AJPERES&CONVERT_TO=url"
};

CustomFileName.args = {
    ...downloadArgs,
    fileName: "My file"
};
