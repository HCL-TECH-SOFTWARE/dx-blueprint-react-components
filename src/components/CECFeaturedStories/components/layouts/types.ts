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

import {ProcessedBlogCard} from "../../CECFeaturedStories.types";
import {BasicComponent} from "../../../../utilities/BasicComponent/BasicComponent";
export type LayoutType = 'default' | 'imageLeft';
export interface SlideLayoutProps extends BasicComponent{
    item: ProcessedBlogCard;
    isCurrent: boolean;
    index: number;
    totalSlides: number;
    mode: 'light' | 'dark' | 'none';
    textColor?: string;
    onHoldStart?: () => void;
    onHoldEnd?: () => void;
    className?: string;
    hasImage: boolean;
    imageUrl?: string;
    imageLoaded?: boolean;
    onImageLoad?: () => void;
    onImageError?: ( e: React.SyntheticEvent<HTMLImageElement> ) => void;
}
export interface SlideContentProps {
    item: ProcessedBlogCard;
    textColor?: string;
    mode: 'light' | 'dark' | 'none';
    isImageLeft?: boolean;
    isActive?: boolean;
}
