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

// src/components/CECFeaturedStories/CECFeaturedStories.types.ts
import { BasicComponent } from "../../utilities/BasicComponent/BasicComponent";
import { ImageProps, LinksProps } from "../../utilities";
export interface BlogCardProps extends BasicComponent {
  link: LinksProps;
  date?: string;
  image?: ImageProps;
  dateFormat?: string;
  content?: string;
  tags?: string[]; // Made required since it's being used without null check
  summary?: string;
  index?: number;
}
export interface CECFeaturedStoriesProps extends BasicComponent {
  items: BlogCardProps[];
  summaryLength?: number;
  dateFormat?: string;
  animationTime?: number;
  autoScrollTime?: number;
  showNavigationArrows?: boolean;
  bulletsPosition?: "left" | "center" | "right";
  autoPlay?: boolean;
  showPagination?: boolean;
  height?: string | number;
  imageLeftLayout?: boolean;
  displayCount?: number;
  textColor?: string;
}
export interface ProcessedBlogCard extends Omit<BlogCardProps, "tags"> {
  summary?: string;
  content?: string;
  index?: number;
}
export enum Dir {
  NEXT = 'left',
  PREV = 'right',
  NONE = 'none',
}
export interface Animating {
  current: number;
  next: number;
  direction: Dir;
}
