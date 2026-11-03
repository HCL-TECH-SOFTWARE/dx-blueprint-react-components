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

// src/components/CECNewsOverview/CECNewsOverview.stories.tsx
import React from "react";
import { Meta, StoryFn } from "@storybook/react-webpack5";
import CECNewsOverview from "./CECNewsOverview";
import type { NewsItemProps } from "../../utilities/cec-types";
const demoItems: NewsItemProps[] = [
  {
    link: { url: "#", label: "Revolutionizing the Future: Our Vision for AI-Powered Analytics" },
    image: { url: "./images/cec/news-ai-analytics.svg" },
    content: `<h2>A Deep Dive into Our AI Strategy</h2>
        <p>
          <img src="./images/cec/news-ai-analytics.svg" alt="A Deep Dive into Our AI Strategy" style="width:100%;max-width:400px;border-radius:8px;" />
        </p>
        <p>We are on the brink of a new era...</p>`,
    author: { name: "Jane Doe" },
    date: "09/22/2025",
    updated: "2025-09-23T09:35:00.000Z",
    category: "Strategy",
    tags: "AI,Analytics,Innovation",
    numberOfLikes: 27,
    numberOfComments: 5,
  },
  {
    link: { url: "#", label: "Tech for Good: Empowering Communities" },
    content: `
      <p>
        <img src="./images/cec/news-community.svg" alt="Empowering Communities" style="width:100%;max-width:400px;border-radius:8px;" />
      </p>
      <p>Discover how our latest initiative leverages technology to support education and healthcare in underserved regions.</p>
    `,
    summary: "Our new program uses digital tools to improve lives in remote areas, focusing on education and health.",
    author: { name: "Alex Kim" },
    date: "09/25/2025",
    updated: "2025-09-26T08:30:00.000Z",
    tags: "TechForGood,Community,Impact",
    numberOfLikes: 15,
    numberOfComments: 4,
  },
  {
    link: {
      url: "https://www.hcl-software.com/blog/innovation/embracing-diversity-in-tech",
      label: "Embracing Diversity in Tech: Why Inclusion Matters 🌍"
    },
    image: {
      url: "./images/cec/news-diversity.svg"
    },
    content: `&lt;h2&gt;Diversity &amp;amp; Inclusion: The Heart of Innovation&lt;/h2&gt;
&lt;p&gt;At HCL Software, we believe that diverse teams drive better outcomes. Our latest report highlights how embracing different perspectives leads to creative solutions and a stronger workplace.&lt;/p&gt;
&lt;p&gt;Learn more about our initiatives and how you can be part of the change. &lt;a href=&quot;https://www.hcl-software.com/diversity&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;&gt;Read the full story&lt;/a&gt;&lt;/p&gt;`,
    summary: "Discover how diversity &amp;#8212; and inclusion &amp;#8212; fuel innovation at HCL Software.",
    author: { name: "Priya Singh" },
    date: "10/28/2025",
    updated: "2025-10-29T09:00:00.000Z",
    category: "Culture",
    tags: "Diversity,Inclusion,Innovation",
    numberOfLikes: 34,
    numberOfComments: 8,
  },
  {
    link: { url: "#", label: "Q3 Financial Results Exceed Expectations" },
    image: { url: "./images/cec/news-finance.svg" },
    content: "<p>A record-breaking quarter reflects our team's dedication...</p>",
    author: { name: "John Smith" },
    date: "09/20/2025",
    updated: "2025-09-21T14:10:00.000Z",
    category: "Finance",
    tags: "Earnings,Corporate",
    numberOfLikes: 19,
    numberOfComments: 12,
  },
  {
    link: { url: "#", label: "New Partnership with TechCorp Announced" },
    image: { url: "./images/cec/news-partnership.svg" },
    content: "<p>This strategic alliance will accelerate innovation...</p>",
    author: { name: "Emily White" },
    date: "09/18/2025",
    updated: "2025-09-18T20:00:00.000Z",
    category: "Partnerships",
    tags: "Business,Growth",
    numberOfLikes: 12,
    numberOfComments: 2,
  },
  {
    link: { url: "#", label: "Security Update: New Two-Factor Authentication Rollout" },
    content: "<p>To enhance your account's security, we are implementing mandatory 2FA...</p>",
    author: { name: "Security Team" },
    date: "09/08/2025",
    updated: "2025-09-09T10:00:00.000Z",
    category: "Internal",
    tags: "Security,Policy",
    numberOfLikes: 9,
    numberOfComments: 14,
  },
  {
    link: { url: "#", label: "Employee Spotlight: Maria Garcia" },
    content: "<p>Celebrating 10 years of dedication and excellence...</p>",
    author: { name: "HR Department" },
    date: "09/05/2025",
    updated: "2025-09-06T12:00:00.000Z",
    category: "Culture",
    tags: "Team,Spotlight",
    numberOfLikes: 21,
    numberOfComments: 3,
  },
];
export default {
  title: "Components/CEC/News Overview",
  component: CECNewsOverview,
  argTypes: {
    viewMode: { control: "inline-radio", options: ["row", "column"] },
    imageMode: { control: "inline-radio", options: ["auto", "none"] },
    imagePosition: { control: "inline-radio", options: ["left", "right", "top"] },
    imageSize: { control: "inline-radio", options: ["sm", "md", "lg", "xl"] },
    imageWidth: { control: "text" },
    minItemWidth: { control: "text" },
    maxHeight: { control: "text" },
    cardStyle: { control: "inline-radio", options: ["card", "divider"] },
    showSummary: { control: "boolean" },
    showCategory: { control: "boolean" },
    showDate: { control: "boolean" },
    highlightFirst: { control: "boolean" },
    reserveGutter: { control: "boolean" },
  },
} as Meta<typeof CECNewsOverview>;
const Template: StoryFn<any> = ( args ) => <CECNewsOverview {...args} />;
export const Default = Template.bind( {} );
Default.args = {
  items: demoItems
};
export const Row_Default = Template.bind( {} );
Row_Default.args = {
  items: demoItems,
  viewMode: "row",
  imageMode: "auto",
  imagePosition: "left",
  imageSize: "md",
  minItemWidth: "280px",
  showSummary: true,
  showCategory: true,
  showDate: true,
  highlightFirst: false,
};
export const Row_SmallImages = Template.bind( {} );
Row_SmallImages.args = {
  ...Row_Default.args,
  imageSize: "sm",
};
export const Row_LargeImages = Template.bind( {} );
Row_LargeImages.args = {
  ...Row_Default.args,
  imageSize: "lg",
};
export const Row_WithDialog = Template.bind( {} );
Row_WithDialog.args = {
  ...Row_Default.args,
  openMode: "dialog",
};
export const Row_ImageTop = Template.bind( {} );
Row_ImageTop.args = {
  ...Row_Default.args,
  imagePosition: "top",
  imageSize: "md",
};
export const Row_TextOnly = Template.bind( {} );
Row_TextOnly.args = {
  ...Row_Default.args,
  imageMode: "none",
};
export const Column_Default = Template.bind( {} );
Column_Default.args = {
  items: demoItems,
  viewMode: "column",
  imageMode: "auto",
  cardStyle: "card",
  imagePosition: "left",
  imageSize: "md",
  maxHeight: "70vh",
  reserveGutter: false,
  showSummary: true,
  showCategory: true,
  showDate: true,
};
export const Column_ImageRight_Small = Template.bind( {} );
Column_ImageRight_Small.args = {
  ...Column_Default.args,
  imagePosition: "right",
  imageSize: "sm",
};
export const Column_ImageTop = Template.bind( {} );
Column_ImageTop.args = {
  ...Column_Default.args,
  imagePosition: "top",
  imageSize: "md",
};
export const Column_Divider = Template.bind( {} );
Column_Divider.args = {
  ...Column_Default.args,
  cardStyle: "divider",
};
export const Column_Divider_HighlightFirst = Template.bind( {} );
Column_Divider_HighlightFirst.args = {
  ...Column_Divider.args,
  highlightFirst: true,
};
export const Row_NoCategoryDate = Template.bind( {} );
Row_NoCategoryDate.args = {
  items: demoItems,
  viewMode: "row",
  imageMode: "auto",
  imagePosition: "left",
  imageSize: "md",
  minItemWidth: "280px",
  showSummary: true,
  showCategory: false,
  showDate: false,
};
export const Column_Divider_TitleOnly = Template.bind( {} );
Column_Divider_TitleOnly.args = {
  items: demoItems,
  viewMode: "column",
  cardStyle: "divider",
  imageMode: "none",
  imagePosition: "left",
  showSummary: false,
  showCategory: false,
  showDate: false,
  maxHeight: "60vh",
};
export const Column_Divider_NoCategory = Template.bind( {} );
Column_Divider_NoCategory.args = {
  ...Column_Divider.args,
  showSummary: true,
  showCategory: false,
  showDate: true,
  imageSize: "sm",
};
export const Column_Divider_NoDate = Template.bind( {} );
Column_Divider_NoDate.args = {
  ...Column_Divider.args,
  showSummary: true,
  showCategory: true,
  showDate: false,
  imageSize: "sm",
};
export const EmptyState = Template.bind( {} );
EmptyState.args = {
  items: [],
};
