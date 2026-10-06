import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXAccordion from './DXAccordion';

export default {
    title: "Components/Buttons and Headers/Accordion",
    component: DXAccordion,
    excludeStories: /.*Args$/,
} as Meta<typeof DXAccordion>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXAccordion> = ( args ) => <DXAccordion {...args} />;

export const AccordionText = Template.bind( {} );
export const AccordionChangedIcons = Template.bind( {} );
export const AccordionVideo = Template.bind( {} );
export const AccordionImage = Template.bind( {} );
export const AccordionFile = Template.bind( {} );
export const AccordionDoc = Template.bind( {} );
export const AccordionExcel = Template.bind( {} );
export const AccordionFileImage = Template.bind( {} );

AccordionText.args = {
    label: "Label 1",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
};

AccordionVideo.args = {
    label: "Tutorial",
    body: '<iframe width="560" height="315" src="https://www.youtube.com/embed/QOjTJAFyNrU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
};

AccordionChangedIcons.args = {
    label: "User guide",
    body: "Download the attached file for more explanation on how we can make the process and help you to get the more <b>effective solution</b> on your digital problems",
    icons: {
        open: "ci-Chevron_Down",
        close: "ci-Chevron_Up"
    }
};

AccordionImage.args = {
    label: "How to",
    body: '<img src="https://ccmit.mit.edu/wp-content/uploads/2014/09/ps-ideal.png" style="width:200px;height:200px" alt="how-to-img"/>'
};

AccordionFile.args = {
    label: "User guide",
    body: "Download the attached file for more explanation on how we can make the process and help you to get the more <b>effective solution</b> on your digital problems",
    files: {
        title: "Download Formats",
        downloads: [
            { url: "https://www.hcl-software.com/wps/wcm/connect/94571e2f-d042-4e0a-a43c-b70af2f31976/3m-story.pdf?MOD=AJPERES&CONVERT_TO=url" },
            { url: "https://www.hcl-software.com/wps/wcm/connect/2373e5c7-3b3d-4ff4-8957-b72d8ecb8bbf/us-state-government.pdf?MOD=AJPERES&CONVERT_TO=url" }
        ]
    }
};

AccordionDoc.args = {
    label: "User guide",
    body: "Download the attached file for more explanation on how we can make the process and help you to get the more <b>effective solution</b> on your digital problems",
    files: {
        title: "Download the word documents",
        downloads: [
            { url: "https://www.hcl-software.com/wps/wcm/connect/2373e5c7-3b3d-4ff4-8957-b72d8ecb8bbf/us-state-government.pdf?MOD=AJPERES&CONVERT_TO=url" }
        ]
    }
};

AccordionExcel.args = {
    label: "User guide",
    body: "Download the attached file for more explanation on how we can make the process and help you to get the more <b>effective solution</b> on your digital problems",
    files: {
        title: "Download spreadsheets attached",
        downloads: [
            { url: "https://www.hcl-software.com/wps/wcm/connect/2373e5c7-3b3d-4ff4-8957-b72d8ecb8bbf/us-state-government.pdf?MOD=AJPERES&CONVERT_TO=url" },
        ]
    }
};

AccordionFileImage.args = {
    label: "User guide",
    body: "Download the attached file for more explanation on how we can make the process and help you to get the more <b>effective solution</b> on your digital problems",
    files: {
        title: "Download the images",
        downloads: [
            { url: "https://www.hcl-software.com/wps/wcm/connect/a185b95a-12cc-4252-9140-2b0ba40af651/hcl-software-logo.svg?MOD=AJPERES" },
        ]
    }
};

