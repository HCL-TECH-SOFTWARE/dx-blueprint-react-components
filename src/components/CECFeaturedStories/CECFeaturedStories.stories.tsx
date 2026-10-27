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

// src/components/CECFeaturedStories/CECFeaturedStories.stories.tsx
import React from "react";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import CECFeaturedStories, { CECFeaturedStoriesProps } from "./CECFeaturedStories";
import { blogItemsArgs as rawBlogItems } from "../CECNewsCardCatalog/CECNewsCardCatalog.stories"; // Re-use mocks
// Convert tags from string to array for each blog item
const blogItemsArgs = rawBlogItems.map( item => ( {
  ...item,
  tags: typeof item.tags === 'string' ? item.tags.split( ',' ).map( tag => tag.trim() ) : item.tags || []
} ) );
type StoryArgs = CECFeaturedStoriesProps;
export default {
  title: "Components/CEC/Featured Stories",
  component: CECFeaturedStories,
  argTypes: {
    items: {
      table: {
        disable: true // Hide from controls as we're using mock data
      }
    },
    autoScrollTime: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Seconds before auto-scrolling. 0 to disable.',
    },
    animationTime: {
      control: { type: 'number', min: 0, step: 0.1 },
      description: 'Animation duration in seconds.',
    },
    bulletsPosition: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    summaryLength: {
      control: { type: 'number', min: 50, step: 10 },
      description: 'Maximum length of the summary text',
    },
    imageLeftLayout: {
      control: 'boolean',
      description: 'Toggle alternative layout: white background, image on the left, black text.',
    },
    displayCount: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Number of items to display. If omitted or <= 0, all items are shown.'
    },
    height: {
      control: 'text',
      description: 'Height for desktop view (e.g., 500px, 50vh, 100%)',
      defaultValue: '500px'
    },
    heightMobile: {
      control: 'text',
      description: 'Height for mobile view (e.g., 300px, 40vh, 80%)',
      defaultValue: '400px'
    },
    textColor: {
      control: 'color',
      description: 'Custom text color for the slide content',
      defaultValue: '#e1e1e1'
    },
    overlay: {
      control: {
        type: 'select',
        options: ['light', 'dark', 'none']
      },
      description: 'Overlay style for the slide content',
      defaultValue: 'dark'
    },
  },
} as Meta<typeof CECFeaturedStories>;
const Template: StoryFn<StoryArgs> = ( args ) => (
  <CECFeaturedStories
    {...args}
    items={blogItemsArgs}
  />
);
export const Default = Template.bind( {} );
Default.args = {
  items: blogItemsArgs,
  summaryLength: 250,
  height: '500px',
  heightMobile: '400px',
  overlay: 'light',
  animationTime: 0.6,
  autoScrollTime: 5,
  bulletsPosition: 'right' as const,
  imageLeftLayout: false
};
export const ImageLeftLayout = Template.bind( {} );
ImageLeftLayout.args = {
  ...Default.args,
  imageLeftLayout: true,
};
export const AutoPlayDisabled = Template.bind( {} );
AutoPlayDisabled.args = {
  ...Default.args,
  autoScrollTime: 0,
};
export const FastTransition = Template.bind( {} );
FastTransition.args = {
  ...Default.args,
  autoScrollTime: 2,
  animationTime: 0.2,
};
export const NoAutoScroll = Template.bind( {} );
NoAutoScroll.args = {
  ...Default.args,
  autoScrollTime: 0, // Disables auto-scrolling
};
export const PaginationKeyboardNavigation = Template.bind( {} );
PaginationKeyboardNavigation.args = {
  ...Default.args,
  autoScrollTime: 0,
  animationTime: 0.2,
  showPagination: true,
  showNavigationArrows: true,
};
// height 400
export const ShortHeight = Template.bind( {} );
ShortHeight.args = {
  ...Default.args,
  height: '400px',
  heightMobile: '300px',
};
