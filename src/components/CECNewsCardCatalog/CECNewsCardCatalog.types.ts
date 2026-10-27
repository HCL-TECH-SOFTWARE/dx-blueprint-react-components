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

import { BasicComponent } from "../../utilities/BasicComponent/BasicComponent";
import { ImageProps, LinksProps } from "../../utilities";
export interface BlogCardProps extends BasicComponent {
    link: LinksProps;
    date: string;
    image?: ImageProps;
    dateFormat?: string;
    content?: string;
    tags?: string[] | string; // tolerate either; we normalize internally
    summary?: string;
    index?: number;
}
export interface CECNewsCardCatalogProps extends BasicComponent {
    items: BlogCardProps[];
    totalItems?: number;
    filterType?: string;
    paginationProps?: {
        sets: string[];
        active: number;
        activeSet: number;
    };
    summaryLength?: number;
    searchLabel?: string;
    searchPlaceholder?: string;
    hideFilters?: boolean;
    dateFormat?: string;
    elementsPerRow?: number;
    
    tagFilter?: string | string[];
    
    numberOfItems?: number;
}
