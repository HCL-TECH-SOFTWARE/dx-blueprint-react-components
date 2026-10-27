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
import CECNewsCardCatalog from "./CECNewsCardCatalog";
export default {
  title: "Components/CEC/News Card Catalog",
  component: CECNewsCardCatalog,
  excludeStories: /.*Args$/,
} as Meta<typeof CECNewsCardCatalog>;
const Template: StoryFn<typeof CECNewsCardCatalog> = ( args ) => (
  <CECNewsCardCatalog {...args} />
);
export const blogItemsArgs = [
  {
    image: {
      url: "./images/cec/news-ai-innovation.svg",
    },
    link: { label: "Q3 Innovations and Team Achievements", url: "#" },
    date: "09/15/2025",
    tags: ["Innovation", "Corporate"],
    content: `<p>Our team has been hard at work developing groundbreaking solutions that push the boundaries of technology. This quarter, we celebrate several key milestones, including the launch of Project Phoenix and a 20% improvement in system efficiency. Here's a deeper look at our latest achievements.</p><img src="./images/cec/news-q3-innovations.svg" alt="Team working">`,
  },
  {
    image: {
      url: "./images/cec/news-partnership.svg",
    },
    link: { label: "Announcing Our New Partnership Program", url: "#" },
    date: "09/12/2025",
    tags: ["Partnerships", "Business"],
    content:
      "<p>We are thrilled to launch a new strategic partnership program designed to foster collaboration and growth within our ecosystem. This initiative will provide our partners with new tools, resources, and opportunities.</p>",
  },
  {
    image: {
      url: "./images/cec/news-policy-update.svg",
    },
    link: { label: "Upcoming Policy Updates for Q4", url: "#" },
    date: "09/10/2025",
    tags: ["Policy", "Corporate"],
    content:
      "<p>Please review the new policy documents available on the portal. These updates are critical for compliance and will take effect starting October 1st. Your attention to this matter is appreciated.</p>",
  },
  {
    image: {
      url: "./images/cec/news-retreat.svg",
    },
    link: { label: "Recap of the Annual Company Retreat", url: "#" },
    date: "08/25/2025",
    tags: ["Events", "Culture"],
    content: `<img src="./images/cec/news-team-retreat.svg" alt="Team building"><p>A fantastic time was had by all. Thanks to the organizing committee! The event was a major success, strengthening bonds and aligning our team for the challenges ahead.</p>`,
  },
  {
    image: {
      url: "./images/cec/news-volunteer-day.svg",
    },
    link: { label: "Volunteer Day: Giving Back to the Community", url: "#" },
    date: "08/18/2025",
    tags: ["Culture", "Community"],
  },
  {
    image: {
      url: "./images/cec/news-strategy.svg",
    },
    link: { label: "A Look Ahead: Our Vision for 2026", url: "#" },
    date: "07/30/2025",
    tags: ["Strategy", "Business"],
    content: `<img src="./images/cec/news-strategy.svg" alt="Strategic planning">`,
  },
  {
    image: {
      url: "./images/cec/news-innovation.svg",
    },
    link: { label: "Client Success Story: Acme Inc.", url: "#" },
    date: "07/22/2025",
    tags: ["Partnerships", "Success Story"],
  },
  // ---- NEW: Encoded HTML content (DX bodyPlain style) with "null" image ----
  {
    link: {
      url: "https://example.com/encoded-html-post",
      label: "Encoded HTML Post (DX-style)",
    },
    date: "May 27, 2025, 8:17:14 AM GMT",
    dateFormat: "MMMM DD, YYYY, h:mm:ss A z",
    image: { url: "null" },
    content: `
      &lt;p dir=&#034;ltr&#034;&gt;&lt;img alt=&#034;image&#034; src=&#034;./images/cec/news-placeholder.svg&#034; style=&#034;display:block;margin:1em 1em 0 0;float:right&#034; /&gt;
      This is an &lt;strong&gt;entity-encoded&lt;/strong&gt; paragraph with an inline image. &quot;Quotes&quot; and &amp; ampersands should decode properly.&lt;/p&gt;
      &lt;p&gt;Second paragraph to ensure our summary generator trims correctly without including tags.&lt;/p&gt;
    `,
    tags: "demo,partner",
  },
  {
    image: {
      url: "/images/cec/news-ai-analytics.svg",
    },
    link: {
      url: "https://example.com/encoded-only-image",
      label: "HCLTech and OpenAI announce multi-year collaboration to scale enterprise AI",
    },
    date: "05/15/2025",
    content: `
      &lt;p dir=&#034;ltr&#034;&gt;HCLTech has announced a multi-year strategic collaboration with OpenAI to accelerate the adoption of generative AI across large enterprises. In a statement dated June 30, 2025, HCLTech said it would become one of OpenAI’s first strategic services partners, combining OpenAI’s models with HCLTech’s AI engineering and delivery frameworks to move programs from pilots to production. The companies framed the effort around enterprise-grade governance, safety and measurable outcomes rather than experimental use alone. &lt;a href=&#034;https://www.hcltech.com/press-releases/hcltech-and-openai-collaborate-drive-enterprise-scale-ai-adoption&#034; target=&#034;_blank&#034; rel=&#034;noopener noreferrer&#034;&gt;hcltech.com&lt;/a&gt;&lt;/p&gt;
&lt;p dir=&#034;ltr&#034;&gt;The agreement spans both customer solutions and internal use. HCLTech plans to roll out ChatGPT Enterprise and OpenAI APIs to employees, positioning the tools as secure, policy-controlled aids for software engineering, operations and knowledge work. Externally, HCLTech will embed OpenAI models in its industry offerings and platforms—most visibly the AI Force service-transformation platform and the Enterprise AI Foundry blueprint—so clients can pair model capabilities with data pipelines, integration layers and operational guardrails already used in production estates.&lt;/p&gt;
&lt;p dir=&#034;ltr&#034;&gt;AI Force is presented as the execution layer for these use cases, with features for agent-assisted IT operations, code and test acceleration, telemetry, and cost controls, and an explicit “LLM-agnostic” stance that includes OpenAI among supported providers. Enterprise AI Foundry, launched earlier, supplies the standardized data, infrastructure and lifecycle processes needed to scale from proofs of concept to governed deployments; HCLTech has also published a Microsoft-Azure variant using Azure OpenAI Service. Together, the platforms provide routes for enterprises to adopt OpenAI models within existing security and compliance regimes. &lt;a href=&#034;https://www.hcltech.com/ai-force&#034; target=&#034;_blank&#034; rel=&#034;noopener noreferrer&#034;&gt;hcltech.com&lt;/a&gt;&lt;/p&gt;
&lt;p dir=&#034;ltr&#034;&gt;HCLTech positions the collaboration as an extension of its broader AI portfolio, which spans consulting, delivery and managed services. The company’s public AI pages now feature the OpenAI partnership alongside guidance on operating-model design and agentic-AI patterns, reflecting a pitch to organizations that want business outcomes and auditability rather than isolated pilots. &lt;a href=&#034;https://www.hcltech.com/ai&#034; target=&#034;_blank&#034; rel=&#034;noopener noreferrer&#034;&gt;hcltech.com&lt;/a&gt;&lt;/p&gt;
&lt;p dir=&#034;ltr&#034;&gt; &lt;/p&gt;
&lt;p dir=&#034;ltr&#034;&gt;&lt;img id=&#034;1760962762246_0&#034; src=&#034;/images/cec/news-placeholder.svg&#034; style=&#034;width:800px;height:687px&#034; /&gt;&lt;/p&gt;
    `,
    tags: ["Media", "Gallery"],
  }
];
export const Default = Template.bind( {} );
Default.args = {
  items: blogItemsArgs,
  totalItems: blogItemsArgs.length,
  filterType: "select",
  paginationProps: {
    sets: ["3", "6", "9"],
    active: 1,
    activeSet: 3,
  },
  summaryLength: 120,
  // numberOfItems not set -> no cap
};
export const TwoColumns = Template.bind( {} );
TwoColumns.args = {
  ...Default.args,
  elementsPerRow: 2,
};
export const NoFilters = Template.bind( {} );
NoFilters.args = {
  ...Default.args,
  hideFilters: true,
};
export const WithEncodedContentOnly = Template.bind( {} );
WithEncodedContentOnly.args = {
  items: blogItemsArgs.slice( -2 ),
  totalItems: 2,
  filterType: "select",
  paginationProps: {
    sets: ["2", "4", "6"],
    active: 1,
    activeSet: 2,
  },
  summaryLength: 140,
};
export const WithFilteredBy = Template.bind( {} );
WithFilteredBy.args = {
  ...Default.args,
  tagFilter: "Corporate",
};
export const MaxNumberOfResults = Template.bind( {} );
MaxNumberOfResults.args = {
  ...Default.args,
  numberOfItems: 5,
};
