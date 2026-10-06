import React from "react";
import "./CECNewsTile.scss";
import type { NewsItemProps } from "../../utilities/cec-types";
import { decodeHtmlEntities, extractFirstImageFromContent, formatSmartDate, isFalsyImageUrl, safeParseDXDate } from "../../utilities/cec-utils";
export type NewsTileMode = "card" | "divider";
export type NewsTileImagePosition = "left" | "right" | "top";
export type NewsTileSize = "xs" | "sm" | "md" | "lg" | "xl" | "auto";
export interface NewsTileProps {
  item: NewsItemProps & { _summary?: string; };
  mode?: NewsTileMode;                   // "card" | "divider"
  imagePosition?: NewsTileImagePosition; // "left" | "right" | "top"
  size?: NewsTileSize;
  showImage?: boolean;
  showSummary?: boolean;
  showCategory?: boolean;
  showDate?: boolean;
  summaryMaxChars?: number; // configurable max characters
  summaryEllipsis?: string;
  summaryLines?: number;
  muted?: boolean;                       // title-only display
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  openMode?: "link" | "dialog";
}
const htmlToText = ( html?: string ) =>
  ( html || "" )
    .replace( /<style[^>]*>[\s\S]*?<\/style>/gi, " " )
    .replace( /<script[^>]*>[\s\S]*?<\/script>/gi, " " )
    .replace( /<[^>]+>/g, " " )
    .replace( /\s+/g, " " )
    .trim();
const hasBlockedEmoticonImageName = ( url?: string | null ) =>
  typeof url === "string" && /emoticon/i.test( url );
// Removes trailing periods/ellipsis before appending the desired ellipsis string.
const clampText = ( s: string, max = 150, ellipsis = "..." ) => {
  if ( s.length <= max ) return s;
  const base = s.slice( 0, max ).trimEnd().replace( /[\.\u2026]+$/, "" );
  return base + ellipsis;
};
const NewsTile: React.FC<NewsTileProps> = ( {
  item,
  mode = "card",
  imagePosition = "top",
  size = "md",
  showImage = true,
  showSummary = true,
  showCategory = true,
  showDate = true,
  summaryMaxChars = 187,
  summaryEllipsis = "...",
  summaryLines = 3,
  muted = false,
  openMode = "link",
  onClick,
  className,
  ariaLabel,
} ) => {
  const title = ( item.title ?? item.link?.label ?? "Untitled Post" ).trim();
  const visibleTitle = clampText( title, 78, "..." );
  // Prefer the normalized imageUrl injected by the list components.
  // If absent (e.g., storybook/standalone use), fall back to image?.url,
  // and if that’s unusable, extract the first <img> from encoded content.
  const candidateUrl = ( item as any ).imageUrl ?? item.image?.url ?? undefined;
  let finalImageUrl =
    isFalsyImageUrl( candidateUrl ) || hasBlockedEmoticonImageName( candidateUrl )
      ? undefined
      : candidateUrl;
  if ( !finalImageUrl && item.content ) {
    const extractedImage = extractFirstImageFromContent( decodeHtmlEntities( item.content ) );
    finalImageUrl = hasBlockedEmoticonImageName( extractedImage )
      ? undefined
      : extractedImage || undefined;
  }
  const hasImage = Boolean( showImage && finalImageUrl );
  const rawDateInput = item.publishedDate || item.date;
  const formattedDate = showDate ? formatSmartDate( rawDateInput, item.dateFormat ) : "";
  // ISO string for <time dateTime>
  const isoDateTime = ( () => {
    try {
      const d = rawDateInput ? safeParseDXDate( rawDateInput ) : null;
      return d && !isNaN( d.getTime() ) ? d.toISOString() : undefined;
    } catch {
      return undefined;
    }
  } )();
  const linkUrl = item.link?.url;
  const linkTarget = ( () => {
    if ( openMode !== "link" ) return undefined; // not used when dialog
    if ( item.link?.target === "_blank" || item.link?.target === "_self" ) return item.link.target;
    return "_blank";
  } )();
  const rel = linkTarget === "_blank" ? "noopener noreferrer" : undefined;
  // Create a function to safely render HTML content
  const createMarkup = ( html: string ) => {
    if ( !html ) return { __html: '' };
    // Ensure HTML entities are properly decoded
    const decoded = decodeHtmlEntities( html );
    return { __html: decoded };
  };
  // derive summary if _summary is not provided
  const derivedSummary = ( () => {
    const pick =
      ( typeof item.summary === "string" && item.summary.trim() ) ||
        ( typeof ( item as any )._summary === "string" &&
          ( item as any )._summary.trim() )
        ? ( item.summary || ( item as any )._summary )!
        : undefined;
    // choose source: prefer provided summary, else content
    const source = pick ?? item.content ?? "";
    // decode (multi-pass), strip tags to plain text, then clamp
    const decoded = decodeHtmlEntities( source );
    return clampText( htmlToText( decoded ), summaryMaxChars, summaryEllipsis );
  } )();
  // sm preset hides summary by default (as designed). Everyone else can show it.
  const allowSummary = !muted && showSummary && size !== "sm" && size !== "xs" && !!derivedSummary;
  const tileClasses = [
    "newsTile",
    item._categoryClass,
    mode === "divider" ? "newsTile--divider" : "newsTile--card",
    `newsTile--img-${imagePosition}`,
    `newsTile--size-${size}`,
    hasImage ? "" : "newsTile--noImage",
    muted ? "newsTile--muted" : "",
    className || "",
  ]
    .filter( Boolean )
    .join( " " );
  return (
    <article
      className={tileClasses}
      data-has-image={hasImage.toString()}
      onClick={
        !muted && ( onClick || linkUrl )
          ? ( e ) => {
            const target = e.target as HTMLElement;
            if ( target.closest( 'a' ) || target.closest( 'button' ) ) {
              return;
            }
            if ( onClick ) {
              onClick();
            } else if ( openMode === "link" && linkUrl ) {
              window.open( linkUrl, linkTarget );
            }
          }
          : undefined
      }
    >
      <div className="newsTile__frame">
        {}
        <div className="newsTile__imageContainer" aria-hidden="true">
          {hasImage && <img src={finalImageUrl as string} alt="" loading="lazy" />}
        </div>
        {}
        <div className="newsTile__contentContainer">
          <div className="newsTile__title" role="heading" aria-level={3}>
            {!muted && (
              <div className="cec-news-tile__title">
                {openMode === "link" && linkUrl ? (
                  <a
                    href={linkUrl}
                    target={linkTarget}
                    rel={rel}
                    className="cec-news-tile__title-link"
                    title={htmlToText( title )}
                    aria-label={ariaLabel || `Open ${htmlToText( title )}`}
                    onClick={( e ) => {
                      e.preventDefault();
                      if ( onClick ) {
                        onClick();
                      } else {
                        window.open( linkUrl, linkTarget );
                      }
                    }}
                    dangerouslySetInnerHTML={createMarkup( visibleTitle )}
                  />
                ) : (
                  <button
                    type="button"
                    className="cec-news-tile__title-button"
                    onClick={onClick}
                    title={htmlToText( title )}
                    aria-label={ariaLabel || `Open ${htmlToText( title )}`}
                    dangerouslySetInnerHTML={createMarkup( visibleTitle )}
                  />
                )}
              </div>
            )}
          </div>
          {showSummary && derivedSummary && (
            <div
              className="cec-news-tile__summary"
              dangerouslySetInnerHTML={createMarkup( derivedSummary )}
            />
          )}
          {( showCategory || showDate ) && (
            <div className="cec-news-tile__metadata-row">
              {showCategory && item.category && (
                <div className="cec-news-tile__category">{item.category}   </div>
              )}
              {showDate && formattedDate && (
                <div className="cec-news-tile__date">
                  <span aria-hidden="true">- </span>
                  <time dateTime={isoDateTime}>{formattedDate}</time>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
export default NewsTile;
