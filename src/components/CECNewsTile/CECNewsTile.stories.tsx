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

// src/components/CECNewsTile/CECNewsTile.stories.tsx
import React from "react";
import { Meta, StoryFn } from "@storybook/react-webpack5";
import NewsTile, { NewsTileProps, type NewsTileSize } from "./CECNewsTile";
import type { NewsItemProps } from "../../utilities/cec-types";
const SIZE_PRESETS = {
  xs: { w: 80, h: 60, rowH: 140 },
  sm: { w: 96, h: 72, rowH: 160 },
  md: { w: 120, h: 84, rowH: 200 },
  lg: { w: 160, h: 112, rowH: 260 },
  xl: { w: 200, h: 140, rowH: 320 },
};
type ImageSize = keyof typeof SIZE_PRESETS;
const baseItem: NewsItemProps & { _summary?: string; } = {
  link: { url: "#", label: "Revolutionizing the Future: Our Vision for AI-Powered Analytics" },
  image: { url: "./images/cec/news-ai-analytics.svg" },
  imageUrl: "./images/cec/news-ai-analytics.svg",
  content: "<p>We are on the brink of a new era where data drives every decision...</p>",
  author: { name: "Jane Doe" },
  category: "Strategy",
  publishedDate: "2025-09-22",
  numberOfLikes: 27,
  numberOfComments: 5,
  _categoryClass: "cat-color-7",
  _summary: "We are on the brink of a new era where data drives every decision...",
};
const noImageItem: NewsItemProps & { _summary?: string; } = {
  ...baseItem,
  link: { url: "#", label: "Security Update: New Two-Factor Authentication Rollout" },
  image: { url: null },
  imageUrl: undefined,
  category: "Internal",
  _categoryClass: "cat-color-4",
};
const longTitleItem: NewsItemProps & { _summary?: string; } = {
  ...baseItem,
  link: {
    url: "#",
    label:
      "Quarterly transformation roadmap highlights how shared analytics platforms, automation programs, and regional operations planning are aligning priorities across business teams",
  },
  _summary:
    "Leaders across product, operations, and customer experience shared a detailed update on the quarterly transformation roadmap, outlining how analytics, automation, and governance initiatives are being coordinated to reduce delivery delays, improve reporting accuracy, and support more consistent decision-making across regional teams.",
};
const TileWithVars: React.FC<
  React.PropsWithChildren<{ imageSize?: ImageSize; imageWidth?: string; }>
> = ( { imageSize = "md", imageWidth, children } ) => {
  const preset = SIZE_PRESETS[imageSize] || SIZE_PRESETS.md;
  const style: React.CSSProperties = {
    ["--tile-thumb-w" as any]: imageWidth || `${preset.w}px`,
    ["--tile-thumb-h" as any]: `${preset.h}px`,
    ["--tile-row-img-h" as any]: `${preset.rowH}px`,
    ["--nov-meta-fs" as any]: ".8125rem",
  };
  return (
    <div style={style}>
      {children}
    </div>
  );
};
const Grid: React.FC<React.PropsWithChildren<{ cols?: number; }>> = ( { cols = 3, children } ) => (
  <div
    style={{
      display: "grid",
      gap: 16,
      gridTemplateColumns: `repeat(${cols}, minmax(240px, 1fr))`,
      alignItems: "start",
    }}
  >
    {children}
  </div>
);
export default {
  title: "Components/CEC/NewsTile",
  component: NewsTile,
  argTypes: {
    mode: { control: "inline-radio", options: ["card", "divider"] },
    imagePosition: { control: "inline-radio", options: ["left", "right", "top"] },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl", "auto"] },
    showImage: { control: "boolean" },
    showSummary: { control: "boolean" },
    showCategory: { control: "boolean" },
    showDate: { control: "boolean" },
    muted: { control: "boolean" },
    // Story-only knobs that map to CSS variables:
    imageSize: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl"] },
    imageWidth: { control: "text" },
  },
  args: {
    mode: "card",
    imagePosition: "left",
    size: "md",
    showImage: true,
    showSummary: true,
    showCategory: true,
    showDate: true,
    muted: false,
    imageSize: "md",
  },
} as Meta<typeof NewsTile>;
const Template: StoryFn<
  NewsTileProps & { imageSize?: ImageSize; imageWidth?: string; }
> = ( args ) => (
  <div style={{ padding: 16, maxWidth: 720 }}>
    <TileWithVars imageSize={( args as any ).imageSize} imageWidth={( args as any ).imageWidth}>
      <NewsTile {...( args as any )} />
    </TileWithVars>
  </div>
);
export const Card_ImageLeft = Template.bind( {} );
Card_ImageLeft.args = {
  item: baseItem,
  mode: "card",
  imagePosition: "left",
  size: "md",
  showImage: true,
  showSummary: true,
  showCategory: true,
  showDate: true,
  muted: false,
};
export const Card_ImageLeft_Large = Template.bind( {} );
Card_ImageLeft_Large.args = {
  ...Card_ImageLeft.args,
  size: "lg",
};
export const Card_ImageRight = Template.bind( {} );
Card_ImageRight.args = {
  ...Card_ImageLeft.args,
  imagePosition: "right",
};
export const Card_ImageTop = Template.bind( {} );
Card_ImageTop.args = {
  ...Card_ImageLeft.args,
  imagePosition: "top",
};
export const Card_TextOnly = Template.bind( {} );
Card_TextOnly.args = {
  ...Card_ImageLeft.args,
  item: noImageItem,
  showImage: false,
};
export const Card_Muted_TitleOnly = Template.bind( {} );
Card_Muted_TitleOnly.args = {
  ...Card_ImageLeft.args,
  muted: true,
};
export const Divider_ImageLeft = Template.bind( {} );
Divider_ImageLeft.args = {
  ...Card_ImageLeft.args,
  mode: "divider",
};
export const Divider_ImageRight = Template.bind( {} );
Divider_ImageRight.args = {
  ...Divider_ImageLeft.args,
  imagePosition: "right",
};
export const Divider_ImageTop = Template.bind( {} );
Divider_ImageTop.args = {
  ...Divider_ImageLeft.args,
  imagePosition: "top",
};
export const Divider_TextOnly = Template.bind( {} );
Divider_TextOnly.args = {
  ...Divider_ImageLeft.args,
  item: noImageItem,
  showImage: false,
};
export const LongTitle_NoImage = Template.bind( {} );
LongTitle_NoImage.args = {
  ...Card_TextOnly.args,
  item: longTitleItem,
};
export const Matrix_AllCombos: StoryFn = () => {
  const combos = [
    { label: "Card • Left • Image", mode: "card", imagePosition: "left", item: baseItem, showImage: true },
    { label: "Card • Right • Image", mode: "card", imagePosition: "right", item: baseItem, showImage: true },
    { label: "Card • Top • Image", mode: "card", imagePosition: "top", item: baseItem, showImage: true },
    { label: "Card • Left • Text-only", mode: "card", imagePosition: "left", item: noImageItem, showImage: false },
    { label: "Divider • Left • Image", mode: "divider", imagePosition: "left", item: baseItem, showImage: true },
    { label: "Divider • Right • Image", mode: "divider", imagePosition: "right", item: baseItem, showImage: true },
    { label: "Divider • Top • Image", mode: "divider", imagePosition: "top", item: baseItem, showImage: true },
    { label: "Divider • Left • Text-only", mode: "divider", imagePosition: "left", item: noImageItem, showImage: false },
    { label: "Card • Top • Muted", mode: "card", imagePosition: "top", item: baseItem, showImage: true, muted: true },
  ] as Array<Partial<NewsTileProps> & { label: string; }>;
  const vars: React.CSSProperties = {
    ["--tile-thumb-w" as any]: `${SIZE_PRESETS.md.w}px`,
    ["--tile-thumb-h" as any]: `${SIZE_PRESETS.md.h}px`,
    ["--tile-row-img-h" as any]: `${SIZE_PRESETS.md.rowH}px`,
    ["--nov-meta-fs" as any]: ".8125rem",
  };
  return (
    <div style={{ padding: 16 }}>
      <TileWithVars imageSize="md">
        <Grid cols={3}>
          {combos.map( ( c, i ) => (
            <div key={i} style={vars as React.CSSProperties}>
              <div style={{ fontSize: 12, color: "#555", marginBottom: 6 }}>{c.label}</div>
              <NewsTile
                item={( c.item as any ) || baseItem}
                mode={( c.mode as any ) || "card"}
                imagePosition={( c.imagePosition as any ) || "left"}
                showImage={c.showImage ?? true}
                showSummary={c.showSummary ?? true}
                showCategory={c.showCategory ?? true}
                showDate={c.showDate ?? true}
                muted={c.muted ?? false}
                onClick={() => {}}
              />
            </div>
          ) )}
        </Grid>
      </TileWithVars>
    </div>
  );
};
export const Sizes: StoryFn = () => (
  <div style={{ padding: 16 }}>
    <Grid cols={3}>
      {( ["xs", "sm", "md", "lg", "xl"] as NewsTileSize[] ).map( ( sz ) => (
        <TileWithVars key={sz} imageSize={sz as ImageSize}>
          <div style={{ fontSize: 12, color: "#555", marginBottom: 6 }}>size = {sz}</div>
          <NewsTile
            item={baseItem}
            mode="card"
            imagePosition="left"
            size={sz}
            showImage
            showSummary
            showCategory
            showDate
          />
        </TileWithVars>
      ) )}
    </Grid>
  </div>
);
export const Playground = Template.bind( {} );
Playground.args = {
  ...Card_ImageLeft.args,
};
