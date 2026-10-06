import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXDownloadGroup from "./DXDownloadGroup";

export default {
    title: "Components/Lists, Catalogs, and Filters/Download Group",
    component: DXDownloadGroup,
    excludeStories: /.*Args$/,
} as Meta<typeof DXDownloadGroup>;

const Template: StoryFn<typeof DXDownloadGroup> = ( args ) => <DXDownloadGroup {...args} />;

export const RegularGroup = Template.bind( {} );

RegularGroup.args = {
    title: "Click on any of these to download",
    downloads: [
        { url: "https://www.hcl-software.com/wps/wcm/connect/2373e5c7-3b3d-4ff4-8957-b72d8ecb8bbf/us-state-government.pdf?MOD=AJPERES&CONVERT_TO=url" },
        { url: "https://www.hcl-software.com/wps/wcm/connect/a185b95a-12cc-4252-9140-2b0ba40af651/hcl-software-logo.svg?MOD=AJPERES" },
        { url: "https://www.hcl-software.com/wps/wcm/connect/2373e5c7-3b3d-4ff4-8957-b72d8ecb8bbf/us-state-government.pdf?MOD=AJPERES&CONVERT_TO=url" },
        { url: "https://www.hcl-software.com/wps/wcm/connect/94571e2f-d042-4e0a-a43c-b70af2f31976/3m-story.pdf?MOD=AJPERES&CONVERT_TO=url" },
        { url: "https://www.hcl-software.com/wps/wcm/connect/94571e2f-d042-4e0a-a43c-b70af2f31976/3m-story.pdf?MOD=AJPERES&CONVERT_TO=url" },
        { url: "https://www.hcl-software.com/wps/wcm/connect/94571e2f-d042-4e0a-a43c-b70af2f31976/3m-story.pdf?MOD=AJPERES&CONVERT_TO=url" },
        { url: "https://www.hcl-software.com/wps/wcm/connect/94571e2f-d042-4e0a-a43c-b70af2f31976/3m-story.pdf?MOD=AJPERES&CONVERT_TO=url" },
        { url: "https://www.hcl-software.com/wps/wcm/connect/94571e2f-d042-4e0a-a43c-b70af2f31976/3m-story.pdf?MOD=AJPERES&CONVERT_TO=url" },
    ],
};
