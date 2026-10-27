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

// Common news types used by CEC components (MegaNews, NewsOverview, …)
// BREAKING CHANGE (previous note kept): Removed SortBy/SortOrder exports and
// NewsProps fields: tagFilter, tags, since, sortBy, sortOrder, numberOfItems.
// Components rely entirely on server-provided ordering and selection.

/* ----------------------------------------------------------------------------
 * Core content types
 * --------------------------------------------------------------------------*/

export interface NewsLink {
    url: string;
    label?: string;
    target?: "_blank" | "_self" | string;
}

export interface NewsImage {
    url?: string | null;
    alt?: string;
}

export interface NewsAuthor {
    name?: string;
}

export interface NewsItemProps {
    _id?: string;

    // content
    title?: string;
    content?: string;
    summary?: string;

    // media
    image?: NewsImage;
    imageUrl?: string | null;

    // metadata
    link: NewsLink;
    author?: NewsAuthor;
    category?: string;
    tags?: string[] | string;

    // dates
    /** legacy field */
    date?: string;
    /** preferred normalized fields */
    publishedDate?: string;
    updated?: string;
    updatedDate?: string;
    dateFormat?: string; // e.g. "MILLIS"

    // social
    numberOfLikes?: number | string;
    numberOfComments?: number | string;

    // derived (styling)
    _categoryClass?: string;
}

export interface NewsProps {
    items: NewsItemProps[];

    // DX edit hook passthroughs
    _edit?: any;
}

/* ----------------------------------------------------------------------------
 * Shared display types (DRY across MegaNews & NewsOverview)
 * --------------------------------------------------------------------------*/

export type NewsCardStyle = "card" | "divider";
export type NewsImagePosition = "left" | "right" | "top";
export type NewsImageSize = "sm" | "md" | "lg" | "xl";

/** Base image mode used by most components. */
export type NewsImageModeBase = "auto" | "none" | "all";
/** MegaNews extends the base set with "hero-only". */
export type NewsImageModeMega = NewsImageModeBase | "hero-only";

/** How a tile should open on click. Default is "link". */
export type NewsOpenMode = "link" | "dialog";

/**
 * Generic display props used by both components.
 * - Default `M` is `NewsImageModeBase` (no "hero-only").
 * - MegaNews opts into `NewsImageModeMega` to allow "hero-only".
 */
export interface NewsDisplayProps<M extends string = NewsImageModeBase> {
    /** Image visibility policy. */
    imageMode?: M;

    /** Where the image appears inside each tile. */
    imagePosition?: NewsImagePosition;

    /** Image sizing preset for thumbs/top images. */
    imageSize?: NewsImageSize;

    /** Optional CSS length override for side thumbs (e.g., "132px"). */
    imageWidth?: string;

    /** Card vs divider rendering. */
    cardStyle?: NewsCardStyle;

    /** Toggle extra metadata & copy. */
    showSummary?: boolean; // default: true
    showCategory?: boolean; // default: true
    showDate?: boolean; // default: true

    /**
     * Max number of characters for summary truncation before adding an ellipsis.
    * Applies a character-level clamp separate from CSS line clamping.
    * Default: 315 (updated from legacy 220)
     */
    summaryMaxChars?: number;

    /**
     * Number of lines to display for the summary using CSS line clamp.
     * If omitted, defaults to 3. Set to 0 or 1 for single-line.
     */
    summaryLines?: number;

    /** Custom ellipsis string appended after character clamp (default '...'). */
    summaryEllipsis?: string;


    /**
     * When true, the first item is shown fully; others appear muted (title-only).
     * Supported by both components.
     */
    highlightFirst?: boolean; // default: false

    /**
     * Controls what happens on tile click.
     * - "link"   → navigate to item.link (default)
     * - "dialog" → open the in-app dialog
     */
    openMode?: NewsOpenMode; // default: "link"
}
