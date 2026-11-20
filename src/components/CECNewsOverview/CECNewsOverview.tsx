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

import "./CECNewsOverview.scss";
import React, { useCallback, useState, useEffect } from "react";
import NewsTile from "../CECNewsTile/CECNewsTile";
import type {
  NewsProps,
  NewsItemProps,
  NewsDisplayProps,
  NewsImageSize,
} from "../../utilities/cec-types";
import { renderEditButton } from "../../utilities/BasicComponent/BasicComponent";
import {
  unwrapDXProps,
  decodeHtmlEntities,
  toTagArray,
  formatSmartDate,
} from "../../utilities/cec-utils";
import CECNewsDialog from "../CECNewsDialog/CECNewsDialog";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";
/* ------------------------------ Unique view props ------------------------------- */
type ViewMode = "row" | "column";
/**
 * DRY: Shared display props (imageMode, imagePosition, imageSize, imageWidth,
 * cardStyle, showSummary, showCategory, showDate, highlightFirst, openMode) are
 * imported via NewsDisplayProps. NewsOverview adds only its unique controls.
 */
export interface CECNewsOverviewProps extends NewsProps, NewsDisplayProps {
  viewMode?: ViewMode;
  minItemWidth?: string;
  maxHeight?: string;
  reserveGutter?: boolean;
  /** Number of items to display. If omitted or <= 0, all items are shown. */
  displayCount?: number;
  /** Direction of the component (ltr or rtl) */
  dir?: 'ltr' | 'rtl';
}
/* ------------------------------ Helpers ---------------------------------- */
const SIZE_PRESETS: Record<NewsImageSize, { thumbW: number; thumbH: number; rowH: number; }> = {
  sm: { thumbW: 96, thumbH: 72, rowH: 160 },
  md: { thumbW: 120, thumbH: 84, rowH: 200 },
  lg: { thumbW: 160, thumbH: 112, rowH: 260 },
  xl: { thumbW: 200, thumbH: 140, rowH: 320 },
};
/* ------------------------------- Main ------------------------------------ */
const CECNewsOverview = ( rawProps: ExtendableProps<CECNewsOverviewProps, "section"> ) => {
  const props = unwrapDXProps( rawProps as any ) as CECNewsOverviewProps;
  // className, ref and extra DOM props come from the RAW props (next to a { data } wrapper); `props` only supplies the component's own props.
  // Every own prop is pulled out (under a throwaway name, the real ones are read from `props` below) so none of them reaches the DOM.
  const { viewMode: _viewMode, minItemWidth: _minItemWidth, maxHeight: _maxHeight, reserveGutter: _reserveGutter, displayCount: _displayCount, dir: _dir, items: _items, _edit: __edit, imageMode: _imageMode, imagePosition: _imagePosition, imageSize: _imageSize, imageWidth: _imageWidth, cardStyle: _cardStyle, showSummary: _showSummary, showCategory: _showCategory, showDate: _showDate, summaryMaxChars: _summaryMaxChars, summaryLines: _summaryLines, summaryEllipsis: _summaryEllipsis, highlightFirst: _highlightFirst, openMode: _openMode, className: rawClassName, ref, ...rawRest } = rawProps;
  // DX hands these components loosely typed data, so only DOM-safe extras are forwarded (this also drops the data/config/props wrapper keys)
  const rest = pickDomProps( rawRest );
  const {
    items,
    _edit,
    viewMode = "column",
    imageMode = "auto",
    minItemWidth = "260px",
    maxHeight,
    reserveGutter = false,
    displayCount,
    cardStyle = "card",
    showSummary = false,
    showCategory = false,
    showDate = false,
    highlightFirst = false,
    openMode = "link",
    imagePosition = "left",
    imageSize = "md",
    imageWidth,
  } = props;
  const [dialogItem, setDialogItem] = useState<NewsItemProps | undefined>();
  const [dialogOpen, setDialogOpen] = useState( false );
  const openDialog = useCallback( ( item: NewsItemProps ) => {
    setDialogItem( item );
    setDialogOpen( true );
  }, [] );
  const closeDialog = useCallback( () => setDialogOpen( false ), [] );
  // Determine direction: honor explicit prop when provided; otherwise detect from document
  const [documentDir, setDocumentDir] = useState<'ltr' | 'rtl'>( () => {
    if ( typeof document !== 'undefined' ) {
      const val = getComputedStyle( document.documentElement ).direction as 'ltr' | 'rtl';
      return val || 'ltr';
    }
    return 'ltr';
  } );
  useEffect( () => {
    if ( props.dir ) return; // when explicit dir is provided, do not observe
    const updateDirection = () => {
      if ( typeof document !== 'undefined' ) {
        const val = getComputedStyle( document.documentElement ).direction as 'ltr' | 'rtl';
        setDocumentDir( val || 'ltr' );
      }
    };
    updateDirection();
    const observer = new MutationObserver( updateDirection );
    if ( typeof document !== 'undefined' ) {
      observer.observe( document.documentElement, { attributes: true, attributeFilter: ['dir'] } );
    }
    return () => observer.disconnect();
  }, [props.dir] );
  const resolvedDir: 'ltr' | 'rtl' = props.dir ?? documentDir;
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
  const showImage = imageMode !== "none";
  // Apply displayCount limit if specified
  const displayedItems = displayCount && displayCount > 0
    ? items.slice( 0, displayCount )
    : items;
  const hasItems = ( displayedItems?.length ?? 0 ) > 0;
  // Resolve sizing vars for the shared tile (aliased via CSS vars)
  const preset = SIZE_PRESETS[imageSize] || SIZE_PRESETS.md;
  const thumbW = imageWidth || `${preset.thumbW}px`;
  const thumbH = `${preset.thumbH}px`;
  const rowImgH = `${preset.rowH}px`;
  const containerClasses = [
    "cecNewsOverview",
    `cecNewsOverview--${viewMode}`,
    cardStyle === "divider" ? "cecNewsOverview--divider" : "",
    reserveGutter ? "cecNewsOverview--reserveGutter" : "",
    resolvedDir === 'rtl' ? 'cecNewsOverview--rtl' : 'cecNewsOverview--ltr'
  ].filter( Boolean ).join( " " );
  // A className inside the { data } wrapper (props) and one next to it (rawProps) both apply
  const rootClassName = classNames( containerClasses, props !== rawProps && ( props as { className?: string; } ).className, rawClassName );
  if ( !hasItems ) {
    return (
      <section {...rest} ref={ref} className={rootClassName} data-build="news-overview-2.4.0">
        <div className="cecNewsOverview__empty" role="note" aria-live="polite" data-testid="newsOverview-empty">
          <div className="cecNewsOverview__emptyCard">
            <div className="cecNewsOverview__emptyTitle">No News data found</div>
            <p className="cecNewsOverview__emptyBody">
              Please configure a valid <b>HCL Connections</b> content data source.
            </p>
            <ul className="cecNewsOverview__emptyList">
              <li>In the NewsOverview configuration, select one or more Communities to aggregate items from.</li>
              <li>Ensure those Communities are accessible to this page’s audience and contain recent content.</li>
              <li>Publish/save your changes and refresh.</li>
            </ul>
          </div>
        </div>
        {_edit && renderEditButton( _edit )}
      </section>
    );
  }
  return (
    <section
      {...rest}
      ref={ref}
      className={rootClassName}
      data-testid="cec-news-overview"
      style={{
        ...( rest.style as React.CSSProperties | undefined ),
        ["--nov-min" as any]: minItemWidth,
        ["--nov-max-height" as any]: maxHeight || undefined,
        ["--nov-thumb-w" as any]: thumbW,
        ["--nov-thumb-h" as any]: thumbH,
        ["--nov-row-img-h" as any]: rowImgH,
      } as React.CSSProperties}
      dir={resolvedDir}
      data-build="news-overview-2.4.0"
    >
      <div className="cecNewsOverview__list">
        {displayedItems.map( ( item, idx ) => {
          const muted = highlightFirst && idx > 0;
          // Create a unique key using _id if available, otherwise fall back to a combination of title and index
          const uniqueKey = item._id || `${item.title || 'untitled'}-${idx}`;
          return (
            <div key={uniqueKey} className="newsTileCQ cecNewsOverview__tile">
              <NewsTile
                item={item}
                mode={cardStyle}
                imagePosition={imagePosition}
                showImage={!muted && showImage}
                showSummary={!muted && showSummary}
                showCategory={!muted && showCategory}
                showDate={!muted && showDate}
                muted={muted}
                onClick={() => handleTileClick( item )}
                openMode={openMode}
              />
            </div>
          );
        } )}
      </div>
      <CECNewsDialog open={dialogOpen} item={dialogItem} onClose={closeDialog} />
      {_edit && renderEditButton( _edit )}
    </section>
  );
};
export default CECNewsOverview;
