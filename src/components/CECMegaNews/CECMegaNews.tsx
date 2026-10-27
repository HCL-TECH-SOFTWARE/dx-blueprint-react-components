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
import React, { useCallback, useMemo, useState } from "react";
import "./CECMegaNews.scss";
import NewsTile, {
  NewsTileImagePosition,
  NewsTileMode,
  NewsTileSize,
} from "../CECNewsTile/CECNewsTile";
import type {
  NewsItemProps,
  NewsProps,
  NewsDisplayProps,
  NewsImageModeMega,
  NewsImageSize,
  NewsImagePosition,
} from "../../utilities/cec-types";
import CECNewsDialog from "../CECNewsDialog/CECNewsDialog";
type LayoutKey = "1-2" | "1-2-2" | "1-4" | "1-4-4";
type HeroFlow = "left" | "top" | "right";
const SIZE_PRESETS: Record<
  NewsImageSize | NewsTileSize,
  { w: number; h: number; rowH: number; }
> = {
  xs: { w: 80, h: 60, rowH: 140 },
  sm: { w: 96, h: 72, rowH: 160 },
  md: { w: 120, h: 84, rowH: 200 },
  lg: { w: 160, h: 112, rowH: 260 },
  xl: { w: 200, h: 140, rowH: 320 },
  auto: { w: 120, h: 84, rowH: 200 },
};
const VALID_SIZE = new Set<NewsTileSize>( ["xs", "sm", "md", "lg", "xl", "auto"] );
type MegaNewsProps = NewsProps &
  NewsDisplayProps<NewsImageModeMega> & {
    layout?: LayoutKey;
    sizeRecipe?: string;
    gridTemplateAreas?: string | string[];
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    areas?: string | string[];
    cols?: string;
    rows?: string;
    heroPosition?: HeroFlow;
    heroFlow?: HeroFlow;
    className?: string;
    style?: React.CSSProperties;
    onTileClick?: ( item: NewsItemProps, index: number ) => void;
  };
const normalizeSize = ( v: unknown, fallback: NewsTileSize ): NewsTileSize =>
  typeof v === 'string' && VALID_SIZE.has( v as NewsTileSize ) ? ( v as NewsTileSize ) : fallback;
const ensureAreaRows = ( areas?: string | string[] ) => {
  if ( !areas ) return null;
  const rows = Array.isArray( areas ) ? areas : String( areas ).split( /\n/g );
  return rows
    .map( ( r ) => r.trim() )
    .filter( Boolean )
    .map( ( r ) => ( r.startsWith( '"' ) ? r : `"${r}"` ) )
    .join( "\n" );
};
const maxItemsFromAreas = ( areas: string | null ): number => {
  if ( !areas ) return 9;
  if ( areas.includes( "mn-low-04" ) ) return 9;
  if ( areas.includes( "mn-med-04" ) ) return 5;
  if ( areas.includes( "mn-med-02" ) ) return 3;
  return 1;
};
const parseRecipe = (
  recipe: unknown,
  layout: LayoutKey
): { hero: NewsTileSize; med: NewsTileSize; low: NewsTileSize; } => {
  const defaults: Record<LayoutKey, [NewsTileSize, NewsTileSize, NewsTileSize]> =
  {
    "1-2": ["xl", "md", "md"],
    "1-2-2": ["xl", "md", "md"],
    "1-4": ["xl", "sm", "sm"],
    "1-4-4": ["xl", "sm", "xs"],
  };
  const [dHero, dMed, dLow] = defaults[layout] || defaults["1-4-4"];
  let parts: string[] = [];
  if ( typeof recipe === "string" && recipe.trim() ) {
    parts = recipe.split( "-" ).map( ( s ) => s.trim() ).filter( Boolean );
  } else if ( Array.isArray( recipe ) ) {
    parts = ( recipe as any[] ).map( ( x ) => String( x ).trim() ).filter( Boolean );
  }
  const hero = normalizeSize( parts[0], dHero );
  const med = normalizeSize( parts[1], dMed );
  const low = normalizeSize( parts[2], dLow );
  return { hero, med, low };
};
// if hero on left side, imagePosition can only be "top"
const validateImagePosition = ( layout: LayoutKey | undefined, imagePos: NewsImagePosition, heroPos: HeroFlow | undefined, index: number ): NewsTileImagePosition => {
  // if layout 1-4-4, limit to hero left = top, hero top = left
  if ( ( layout === "1-2-2" || layout === "1-4-4" ) && heroPos === "left" ) {
    return "top";
  }
  return imagePos;
};
// this function takes the layout, the heroPosition and the index and determines whether there should be a divider for this element.
// for 1-2 and heroPos top, [0] will have a divider - the large 1 over the 2 sm. for heroPos left/right however, it would be [1] as the first small one would sit on the second on the left/right side.
// similar, this fans out into 1-4 -> heroTop: [0], heroLeft: [1,2]
const dividerIndexes = {
  "1-2": {
    "top": [0],
    "left": [1],
    "right": [1]
  },
  "1-4": {
    "top": [0],
    "left": [1, 2],
    "right": [1, 2]
  },
  "1-2-2": {
    "top": [0, 1, 2],
    "left": [1, 2],
    "right": [1, 2]
  },
  "1-4-4": {
    "top": [0, 1, 2, 3, 4],
    "left": [1, 2, 5, 6],
    "right": [1, 2, 5, 6]
  },
};
const hasDivider = ( layout: LayoutKey | undefined, heroPos: HeroFlow | undefined, index: number ): boolean => {
  if ( !layout || !heroPos ) return true;
  return dividerIndexes[layout]?.[heroPos]?.includes( index ) || false;
};
const computeShowImage = ( mode: NewsImageModeMega | undefined, tileSize: NewsTileSize | undefined, index: number ) => {
  const m = mode || "all";
  if ( m === "none" ) return false;
  if ( m === "hero-only" ) return index === 0;
  if ( tileSize === "xs" ) return false;
  return true;
};
const isDividerCell = ( i: number, total: number ) => i < total - 1;
function buildPreset( layout: LayoutKey, hero: HeroFlow ) {
  switch ( layout ) {
    case "1-2": {
      if ( hero === "top" ) {
        return {
          cols: "1fr 1fr",
          rows: "auto auto",
          areas: ['"mn-top mn-top"', '"mn-med-01 mn-med-02"'],
          maxItems: 3,
        };
      }
      if ( hero === "right" ) {
        return {
          cols: "1fr 2fr",
          rows: "auto auto",
          areas: ['"mn-med-01 mn-top"', '"mn-med-02 mn-top"'],
          maxItems: 3,
        };
      }
      // left (default)
      return {
        cols: "2fr 1fr",
        rows: "auto auto",
        areas: ['"mn-top mn-med-01"', '"mn-top mn-med-02"'],
        maxItems: 3,
      };
    }
    case "1-2-2": {
      if ( hero === "top" ) {
        return {
          cols: "1fr 1fr",
          rows: "auto auto auto",
          areas: [
            '"mn-top mn-top"',
            '"mn-med-01 mn-med-02"',
            '"mn-med-03 mn-med-04"',
          ],
          maxItems: 5,
        };
      }
      if ( hero === "right" ) {
        return {
          cols: "1fr 1fr 2fr",
          rows: "auto auto",
          areas: [
            '"mn-med-01 mn-med-02 mn-top"',
            '"mn-med-03 mn-med-04 mn-top"',
          ],
          maxItems: 5,
        };
      }
      // left (default)
      return {
        cols: "2fr 1fr 1fr",
        rows: "auto auto",
        areas: [
          '"mn-top mn-med-01 mn-med-02"',
          '"mn-top mn-med-03 mn-med-04"',
        ],
        maxItems: 5,
      };
    }
    case "1-4": {
      if ( hero === "left" ) {
        return {
          cols: "2fr 1fr",
          rows: "auto auto auto auto",
          areas: [
            '"mn-top mn-med-01"',
            '"mn-top mn-med-02"',
            '"mn-top mn-med-03"',
            '"mn-top mn-med-04"',
          ],
          maxItems: 5,
        };
      }
      if ( hero === "right" ) {
        return {
          cols: "1fr 1fr 2fr",
          rows: "auto auto",
          areas: [
            '"mn-med-01 mn-med-02 mn-top"',
            '"mn-med-03 mn-med-04 mn-top"',
          ],
          maxItems: 5,
        };
      }
      // top (default)
      return {
        cols: "1fr 1fr 1fr 1fr",
        rows: "auto auto",
        areas: [
          '"mn-top mn-top mn-top mn-top"',
          '"mn-med-01 mn-med-02 mn-med-03 mn-med-04"',
        ],
        maxItems: 5,
      };
    }
    case "1-4-4": {
      if ( hero === "left" ) {
        // matches your original SCSS default (hero as left sidebar)
        return {
          cols: "2fr 1fr 1fr 1fr",
          rows: "auto auto auto auto",
          areas: [
            '"mn-top mn-med-01 mn-med-02 mn-low-01"',
            '"mn-top mn-med-01 mn-med-02 mn-low-02"',
            '"mn-top mn-med-03 mn-med-04 mn-low-03"',
            '"mn-top mn-med-03 mn-med-04 mn-low-04"',
          ],
          maxItems: 9,
        };
      }
      if ( hero === "right" ) {
        // mirror of left
        return {
          cols: "1fr 1fr 1fr 2fr",
          rows: "auto auto auto auto",
          areas: [
            '"mn-low-01 mn-med-01 mn-med-02 mn-top"',
            '"mn-low-02 mn-med-01 mn-med-02 mn-top"',
            '"mn-low-03 mn-med-03 mn-med-04 mn-top"',
            '"mn-low-04 mn-med-03 mn-med-04 mn-top"',
          ],
          maxItems: 9,
        };
      }
      // top (default)
      return {
        cols: "1fr 1fr 1fr 1fr",
        rows: "auto auto auto",
        areas: [
          '"mn-top mn-top mn-top mn-top"',
          '"mn-med-01 mn-med-02 mn-med-03 mn-med-04"',
          '"mn-low-01 mn-low-02 mn-low-03 mn-low-04"',
        ],
        maxItems: 9,
      };
    }
  }
};
const CECMegaNews: React.FC<MegaNewsProps> = ( {
  items,
  className,
  layout,
  gridTemplateAreas,
  gridTemplateColumns,
  gridTemplateRows,
  areas: areasAlias,
  cols: colsAlias,
  rows: rowsAlias,
  imageMode = "all",
  imagePosition = "left",
  heroPosition,
  heroFlow, // alias
  imageSize,
  sizeRecipe,
  imageWidth,
  cardStyle = "card",
  showSummary = true,
  summaryMaxChars = 150,
  summaryLines = 3,
  summaryEllipsis = "...",
  showCategory = true,
  showDate = true,
  highlightFirst = false,
  openMode = "link",
  style,
  onTileClick,
} ) => {
  // 1) Grid: explicit overrides > generated by (layout, heroFlow)
  const overrideAreas = ensureAreaRows(
    ( gridTemplateAreas as any ) ?? ( areasAlias as any )
  );
  const cols = gridTemplateColumns ?? colsAlias ?? null;
  const rows = gridTemplateRows ?? rowsAlias ?? null;
  const hasExplicitGrid = Boolean( overrideAreas || cols || rows );
  const hp: HeroFlow = ( heroFlow || heroPosition || "left" ) as HeroFlow;
  const lk: LayoutKey = ( layout as LayoutKey ) || "1-4-4";
  const generated = buildPreset( lk, hp );
  const gridVars: React.CSSProperties = useMemo( () => {
    if ( hasExplicitGrid ) {
      return {
        ["--mn-cols" as any]: cols || "1fr",
        ["--mn-rows" as any]: rows || "auto",
        ["--mn-areas" as any]: overrideAreas || '"mn-top"',
      };
    }
    return {
      ["--mn-cols" as any]: generated.cols,
      ["--mn-rows" as any]: generated.rows,
      ["--mn-areas" as any]: generated.areas.join( "\n" ),
    };
  }, [hasExplicitGrid, cols, rows, overrideAreas, generated] );
  const maxByLayout = hasExplicitGrid
    ? maxItemsFromAreas( overrideAreas )
    : generated.maxItems;
  const total = Math.min( items?.length ?? 0, maxByLayout );
  const renderItems = ( items || [] ).slice( 0, total );
  // 2) Sizes (recipe > uniform legacy > defaults for layout)
  const sizes = useMemo( () => {
    if ( sizeRecipe ) return parseRecipe( sizeRecipe, lk );
    return parseRecipe( undefined, lk );
  }, [sizeRecipe, imageSize, lk] );
  const [dialogItem, setDialogItem] = useState<NewsItemProps | undefined>();
  const [dialogOpen, setDialogOpen] = useState( false );
  const openDialog = useCallback( ( item: NewsItemProps ) => {
    setDialogItem( item );
    setDialogOpen( true );
  }, [] );
  const closeDialog = useCallback( () => setDialogOpen( false ), [] );
  const handleTileClick = useCallback( ( item: NewsItemProps ) => {
    if ( openMode === "dialog" ) {
      openDialog( item );
    } else {
      const url = item.link?.url;
      if ( !url ) return;
      const target = item.link?.target || "_blank";
      if ( target === "_blank" ) {
        window.open( url, "_blank", "noopener,noreferrer" );
      } else {
        window.location.assign( url );
      }
    }
  }, [openMode, openDialog] );
  // 3) CSS vars for images (base from MED; hero overrides from HERO)
  const imageVars: React.CSSProperties = useMemo( () => {
    const medPreset = SIZE_PRESETS[sizes.med] || SIZE_PRESETS.md;
    const heroPreset = SIZE_PRESETS[sizes.hero] || SIZE_PRESETS.xl;
    const toPx = ( n: number ) => `${n}px`;
    return {
      ["--mn-thumb-w" as any]: imageWidth || toPx( medPreset.w ),
      ["--mn-thumb-h" as any]: toPx( medPreset.h ),
      ["--mn-row-img-h" as any]: toPx( medPreset.rowH ),
      ["--mn-hero-side-w" as any]: toPx( Math.round( heroPreset.w * 1.8 ) ),
      ["--mn-hero-side-h" as any]: toPx( heroPreset.rowH + 80 ),
      ["--mn-hero-top-h" as any]: toPx( heroPreset.rowH + 80 ),
    };
  }, [sizes.med, sizes.hero, imageWidth] );
  const containerStyle: React.CSSProperties = { ...gridVars, ...imageVars, ...style };
  const hasItems = ( items?.length ?? 0 ) > 0;
  const wrapClass = [
    "megaNews",
    `megaNews--img-${imagePosition}`, // purely visual per-tile
    cardStyle === "divider" ? "megaNews--divider" : "",
    className || "",
  ]
    .filter( Boolean )
    .join( " " );
  const sizeForIndex = ( i: number ): NewsTileSize => {
    if ( i === 0 ) return sizes.hero;
    if ( i >= 1 && i <= 4 ) return sizes.med;
    return sizes.low;
  };
  if ( !hasItems ) {
    return (
      <section className={wrapClass}>
        <div
          className="megaNews__empty"
          role="note"
          aria-live="polite"
          data-testid="megaNews-empty"
        >
          <div className="megaNews__emptyCard">
            <div className="megaNews__emptyTitle">No News data found</div>
            <p className="megaNews__emptyBody">
              Please configure a valid <b>HCL Connections</b> content data source.
            </p>
            <ul className="megaNews__emptyList">
              <li>
                In the MegaNews configuration, select one or more communities to aggregate items from.</li>
              <li>
                Ensure the selected communities are accessible to this page’s
                audience and contain recent content.
              </li>
              <li>Publish/save your changes and refresh.</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className={wrapClass} style={containerStyle}>
      <div className="megaNews__grid" role="list">
        {renderItems.map( ( item, i ) => {
          const mode: NewsTileMode = cardStyle === "divider" ? "divider" : "card";
          const tileSize: NewsTileSize = sizeForIndex( i );
          const showImg = computeShowImage( imageMode, tileSize, i );
          const imagePos: NewsTileImagePosition = validateImagePosition( lk, imagePosition, hp, i );
          const muted = highlightFirst && i > 0;
          // Create a unique key that combines multiple properties to avoid duplicates
          const uniqueKey = item._id
            ? `item-${item._id}-${i}`
            : `index-${i}-${item.title?.slice( 0, 20 ) || 'no-title'}-${item.link?.url?.slice( 0, 20 ) || 'no-link'}`;
          return (
            <div
              key={uniqueKey}
              role="listitem"
              className={[
                "megaNews__cell",
                cardStyle === "divider" && hasDivider( lk, hp, i )
                  ? "megaNews__cell--withDivider"
                  : "",
              ]
                .filter( Boolean )
                .join( " " )}
              data-index={i}
            >
              <NewsTile
                item={item as any}
                mode={mode}
                imagePosition={imagePos}
                size={tileSize}
                showImage={showImg}
                showSummary={showSummary}
                summaryMaxChars={summaryMaxChars}
                summaryLines={summaryLines}
                summaryEllipsis={summaryEllipsis}
                showCategory={showCategory}
                showDate={showDate}
                muted={muted}
                onClick={() => handleTileClick( item )}
                openMode={openMode}
              />
            </div>
          );
        } )}
      </div>
      <CECNewsDialog open={dialogOpen} item={dialogItem} onClose={closeDialog} />
    </section>
  );
};
export default CECMegaNews;
