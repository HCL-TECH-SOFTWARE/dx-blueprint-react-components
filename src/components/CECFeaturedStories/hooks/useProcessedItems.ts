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

// src/components/CECNewsSlider/hooks/useProcessedItems.ts
import { useMemo } from "react";
import {
    decodeHtmlEntities,
    extractFirstImageFromContent,
    generateSummary,
    isFalsyImageUrl,
} from "../../../utilities/cec-utils";
import type { BlogCardProps, ProcessedBlogCard } from "../CECFeaturedStories.types";
import { HARD_MAX_ITEMS } from "../constants";
export function useProcessedItems(
    items: BlogCardProps[],
    summaryLen = 250,
    options?: { limit?: number; }
) {
    return useMemo<ProcessedBlogCard[]>( () => {
        if ( !Array.isArray( items ) ) return [];
        const mapped = items.map( ( item, index ) => {
            const decodedContent = decodeHtmlEntities( item.content || "" );
            let imageUrl = item.image?.url;
            if ( isFalsyImageUrl( imageUrl ) ) {
                imageUrl = extractFirstImageFromContent( decodedContent ) || "";
            }
            return {
                ...item,
                image: imageUrl
                    ? { url: imageUrl, altText: item.image?.altText || "" }
                    : undefined,
                content: decodedContent,
                summary: generateSummary( decodedContent, summaryLen ),
                index,
                link: item.link
                    ? { ...item.link, target: item.link.target || "_blank" }
                    : { url: "#", label: "", target: "_blank" },
                date:
                    ( item as any ).date ||
                    ( item as any ).updatedDate ||
                    ( item as any ).updated ||
                    new Date().toISOString(),
            } as ProcessedBlogCard;
        } );
        // Apply hard cap first, then optional explicit limit (min of both)
        const rawLimit = typeof options?.limit === "number" ? Math.floor( options.limit ) : undefined;
        const effectiveLimit = rawLimit && rawLimit > 0 ? Math.min( HARD_MAX_ITEMS, rawLimit ) : HARD_MAX_ITEMS;
        return mapped.slice( 0, effectiveLimit );
    }, [items, summaryLen, options?.limit] );
}
