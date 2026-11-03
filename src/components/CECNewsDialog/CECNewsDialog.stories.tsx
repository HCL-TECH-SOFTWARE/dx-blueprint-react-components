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

import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react-webpack5";
import CECNewsDialog, { CECNewsDialogProps } from "./CECNewsDialog";
import type { NewsItemProps } from "../../utilities/cec-types";
const sampleItem: NewsItemProps = {
  title: "Revolutionizing the Future: Our Vision for AI-Powered Analytics",
  content: `<p>We are on the brink of a new era where data drives every decision. Artificial intelligence is no longer a buzzword — it is the backbone of modern enterprise strategy.</p>
<p>Our latest platform release introduces real-time analytics dashboards, natural language querying, and predictive insights that adapt to your business context automatically.</p>
<p>These advancements are built on a foundation of responsible AI, with full auditability, explainability, and human-in-the-loop controls baked in from day one.</p>`,
  image: { url: "./images/cec/news-ai-analytics.svg", alt: "AI Analytics" },
  author: { name: "Jane Doe" },
  category: "Strategy",
  publishedDate: "2025-09-22",
  tags: ["AI", "Analytics", "Strategy", "Innovation"],
  link: { url: "#", label: "Read More" },
};
const noImageItem: NewsItemProps = {
  ...sampleItem,
  title: "Security Update: New Two-Factor Authentication Rollout",
  image: { url: null },
  imageUrl: undefined,
  tags: ["Security", "Authentication"],
  link: { url: "#", label: "Read More" },
};
const longContentItem: NewsItemProps = {
  ...sampleItem,
  title: "Annual Conference Recap: Key Takeaways from All Three Days",
  content: `<p>Day one focused on product strategy and roadmap previews across all major business units.</p>
<p>Day two featured hands-on workshops covering advanced integrations, API best practices, and migration guides for legacy systems.</p>
<p>Day three brought together executive keynotes, customer success stories, and a live Q&amp;A with the engineering leadership team.</p>
<p>Attendees consistently highlighted the depth of technical content and the quality of networking opportunities throughout the event.</p>
<p>Full session recordings will be available in the partner portal within the next two weeks.</p>`,
  tags: ["Conference", "Recap", "Community"],
};
export default {
  title: "Components/CEC/NewsDialog",
  component: CECNewsDialog,
  argTypes: {
    open: { control: "boolean" },
    linkTarget: { control: "inline-radio", options: ["_blank", "_self"] },
  },
  args: {
    open: true,
    linkTarget: "_blank",
  },
} as Meta<typeof CECNewsDialog>;
const Template: StoryFn<CECNewsDialogProps> = (args) => {
  const [open, setOpen] = useState(args.open);
  return (
    <div style={{ padding: 16 }}>
      <button onClick={() => setOpen(true)} style={{ marginBottom: 12 }}>
        Open Dialog
      </button>
      <CECNewsDialog {...args} open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
export const WithImage = Template.bind({});
WithImage.args = {
  item: sampleItem,
  open: true,
};
export const NoImage = Template.bind({});
NoImage.args = {
  item: noImageItem,
  open: true,
};
export const LongContent = Template.bind({});
LongContent.args = {
  item: longContentItem,
  open: true,
};
export const LinkTargetSelf = Template.bind({});
LinkTargetSelf.args = {
  item: sampleItem,
  open: true,
  linkTarget: "_self",
};
export const NoItem = Template.bind({});
NoItem.args = {
  item: undefined,
  open: true,
};
export const Playground = Template.bind({});
Playground.args = {
  item: sampleItem,
  open: true,
};
