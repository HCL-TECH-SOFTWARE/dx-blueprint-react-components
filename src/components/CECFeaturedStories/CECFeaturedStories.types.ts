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
