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

import React, { useEffect, useMemo, useRef, useState } from "react";
import "./CECFeaturedStories.scss";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";
import type { CECFeaturedStoriesProps as ExternalCECFeaturedStoriesProps } from "./CECFeaturedStories.types";
import { unwrapDXProps } from "../../utilities/cec-utils";
import { chainHandlers, ExtendableProps, mergeRefs, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";
import { useProcessedItems } from "./hooks/useProcessedItems";
import { useResponsiveHeights } from "./hooks/useResponsiveHeights";
import { useSliderController } from "./hooks/useSliderController";
import Pagination from "./components/Pagination";
import Slide from "./components/Slide";
import Navigation from "./components/Navigation";
import PlayPauseButton from "./components/PlayPauseButton";
import { FALLBACK_IMAGE_BASE64, SUMMARY_LENGTH, DEFAULT_TEXT_COLOR_DARK, DEFAULT_TEXT_COLOR_LIGHT } from "./constants";
// Extend external props (make items required, same as before)
export interface CECFeaturedStoriesProps
  extends Omit<ExternalCECFeaturedStoriesProps, "items">,
  BasicComponent {
  items: ExternalCECFeaturedStoriesProps["items"];
  heightMobile?: string | number;
  overlay?: "light" | "dark" | "none";
  imageLeftLayout?: boolean;
  textColor?: string;
  _edit?: any;
}
const CECFeaturedStories = ( rawProps: ExtendableProps<CECFeaturedStoriesProps, "div"> ) => {
  const props = unwrapDXProps<CECFeaturedStoriesProps>( rawProps );
  // className, ref and extra DOM props come from the RAW props (next to a { data } wrapper); `props` only supplies the component's own props.
  // Every own prop is pulled out (under a throwaway name, the real ones are read from `props` below) so none of them reaches the DOM.
  const { items: _items, heightMobile: _heightMobile, overlay: _overlay, imageLeftLayout: _imageLeftLayout, textColor: _textColor, _edit: __edit, summaryLength: _summaryLength, dateFormat: _dateFormat, animationTime: _animationTime, autoScrollTime: _autoScrollTime, showNavigationArrows: _showNavigationArrows, bulletsPosition: _bulletsPosition, autoPlay: _autoPlay, showPagination: _showPagination, height: _height, displayCount: _displayCount, className: rawClassName, ref, ...rawRest } = rawProps;
  // DX hands these components loosely typed data, so only DOM-safe extras are forwarded (this also drops the data/config/props wrapper keys)
  const rest = pickDomProps( rawRest );
  const [dir, setDir] = useState<'ltr' | 'rtl'>( 'ltr' );
  const rootRef = useRef<HTMLDivElement | null>( null );
  const mergedRootRef = useMemo( () => mergeRefs( rootRef, ref ), [ref] );
  const lastTabInitiatedRef = useRef( false );
  const followReadMoreFocusRef = useRef( false );
  // Detect browser language direction on component mount
  useEffect( () => {
    const updateDirection = () => {
      // Check if document is defined (for SSR)
      if ( typeof document !== 'undefined' ) {
        const htmlElement = document.documentElement;
        const dirValue = getComputedStyle( htmlElement ).direction as 'ltr' | 'rtl';
        setDir( dirValue || 'ltr' );
      }
    };
    // Initial detection
    updateDirection();
    // Optional: Listen for changes to the dir attribute
    const observer = new MutationObserver( updateDirection );
    if ( typeof document !== 'undefined' ) {
      observer.observe( document.documentElement, {
        attributes: true,
        attributeFilter: ['dir']
      } );
    }
    return () => observer.disconnect();
  }, [] );
  const {
    items = [],
    autoPlay = true,
    showPagination = true,
    showNavigationArrows = true,
    animationTime = 0.6,
    autoScrollTime = 5,
    bulletsPosition = "right",
    height = "500px",
    heightMobile,
    overlay,
    textColor,
    imageLeftLayout = false,
    summaryLength,
    _edit,
    displayCount,
  } = props;
  const [isPaused, setIsPaused] = useState( false );
  const processedItems = useProcessedItems(
    items,
    summaryLength ?? SUMMARY_LENGTH,
    { limit: displayCount }
  );
  const { containerHeight, responsiveHeightCSSClass } = useResponsiveHeights( height, heightMobile );
  const {
    currentSlide,
    animatingSlides,
    triggerMove,
    loadedImages,
    goToSlide,
    goToNext,
    goToPrev,
  } = useSliderController( {
    items: processedItems,
    autoPlay: Boolean( autoPlay && !isPaused ),
    autoScrollTime,
    animationTime,
  } );
  const isReadMoreElement = ( el: EventTarget | null ) => {
    return el instanceof HTMLElement && el.getAttribute( 'data-testid' ) === 'read-more-button';
  };
  const onKeyDownCapture = ( e: React.KeyboardEvent ) => {
    if ( e.key === 'Tab' ) {
      lastTabInitiatedRef.current = true;
    }
  };
  const onPointerDownCapture = () => {
    lastTabInitiatedRef.current = false;
  };
  // Handle Space key at the carousel container level to toggle play/pause
  const onRootKeyDown = ( e: React.KeyboardEvent ) => {
    const key = e.code || e.key;
    // Avoid double-toggling when the event originates from the play/pause button itself
    const fromPlayPause = ( e.target as HTMLElement | null )?.closest?.( '.cec-play-pause-button' );
    if ( fromPlayPause ) return;
    if ( key === 'Space' || key === 'Spacebar' || key === ' ' ) {
      e.preventDefault();
      setIsPaused( prev => !prev );
    }
  };
  // Track the last focused read more element
  const lastFocusedReadMoreRef = useRef<HTMLAnchorElement | null>( null );
  // Handle mouse down to detect clicks (resets tab-initiated tracking)
  const onMouseDownCapture = () => {
    lastTabInitiatedRef.current = false;
  };
  // Update the onFocusCapture function
  const onFocusCapture = ( e: React.FocusEvent ) => {
    const target = e.target as HTMLElement | null;
    if ( !target ) return;
    // Check if focus is moving to a read-more link
    if ( isReadMoreElement( target ) ) {
      followReadMoreFocusRef.current = true;
      lastFocusedReadMoreRef.current = target as HTMLAnchorElement;
      return;
    }
    // If focus is on the slider or its children
    if ( target === rootRef.current || target.closest( '[role="region"]' ) === rootRef.current ) {
      // Only clear the follow flag if we're not in the middle of a slide transition
      // and the focus is not on a navigation button
      const isNavButton = target.closest( '.cecFeaturedStories__navButton' );
      if ( !animatingSlides && !isNavButton ) {
        followReadMoreFocusRef.current = false;
      }
      return;
    }
    // Clear the flag for all other cases
    followReadMoreFocusRef.current = false;
  };
  // Unified focus management: runs only after animation completes (animatingSlides → null).
  // Restores focus to the correct element inside the carousel.
  const prevAnimatingRef = useRef<typeof animatingSlides>( null );
  useEffect( () => {
    const wasAnimating = prevAnimatingRef.current;
    prevAnimatingRef.current = animatingSlides;
    // Only act when an animation just finished (was animating → now null)
    if ( animatingSlides || !wasAnimating ) return;
    const root = rootRef.current;
    if ( !root ) return;
    // If focus has moved outside the carousel, leave it alone
    if ( !root.contains( document.activeElement ) ) return;
    const activeSlide = root.querySelector( '.cecFeaturedStories__slide.active' ) as HTMLElement | null;
    const ae = document.activeElement as HTMLElement | null;
    const isNavButton = !!ae?.closest( '.cecFeaturedStories__navButton' );
    const isInActiveSlide = !!( ae && activeSlide && activeSlide.contains( ae ) );
    // Focus is already in a good place — leave it
    if ( isNavButton || isInActiveSlide ) return;
    // If we were following a read-more link, move focus to the new slide's read-more
    if ( followReadMoreFocusRef.current ) {
      const activeReadMore = root.querySelector(
        '.cecFeaturedStories__slide.active [data-testid="read-more-button"]'
      ) as HTMLAnchorElement | null;
      if ( activeReadMore && document.body.contains( activeReadMore ) ) {
        activeReadMore.focus( { preventScroll: true } );
        return;
      }
    }
    // Fallback: move focus to the next nav button if visible, otherwise the active slide
    const nextBtn = Array.from( root.querySelectorAll<HTMLElement>( '.cecFeaturedStories__navButton--next' ) )
      .find( el => el.offsetParent !== null ) ?? null;
    if ( nextBtn ) {
      nextBtn.focus( { preventScroll: true } );
      return;
    }
    if ( activeSlide ) {
      if ( !activeSlide.hasAttribute( 'tabindex' ) ) activeSlide.setAttribute( 'tabindex', '-1' );
      activeSlide.focus( { preventScroll: true } );
    }
  }, [animatingSlides, currentSlide] );
  // Update the pagination position calculation
  const paginationPos = useMemo( () => {
    const pos = ["left", "center", "right"].includes( ( bulletsPosition || "right" ).toLowerCase() )
      ? ( bulletsPosition as "left" | "center" | "right" )
      : "right";
    // In RTL, flip left and right positions
    if ( dir === 'rtl' ) {
      if ( pos === 'left' ) return 'right';
      if ( pos === 'right' ) return 'left';
    }
    return pos;
  }, [bulletsPosition, dir] );
  const rootClass =
    `cecFeaturedStories ${responsiveHeightCSSClass}` +
    ( imageLeftLayout ? " cecFeaturedStories--imageLeft" : "" ) +
    ( isPaused ? " cecFeaturedStories--paused" : "" ) +
    ( dir === 'rtl' ? ' rtl' : '' );
  // A className inside the { data } wrapper (props) and one next to it (rawProps) both apply
  const rootClassName = classNames( rootClass, props !== rawProps && ( props as { className?: string; } ).className, rawClassName );
  const resolvedOverlayMode = overlay;
  if ( processedItems.length === 0 ) {
    return (
      <div {...rest} ref={ref} className={rootClassName} dir={dir}>
        <div className="cecFeaturedStories__container">
          <div className="loader__container">
            <div className="loader__spinner"></div>
          </div>
        </div>
      </div>
    );
  }
  const total = processedItems.length;
  // Play/pause is now only controlled by the PlayPauseButton component
  const renderControls = () => {
    if ( processedItems.length <= 1 ) return null;
    // Determine position class based on bulletsPosition
    let positionClass = `cecFeaturedStories__playPause__${bulletsPosition || 'right'}`;
    // In RTL, flip left/right positions
    if ( dir === 'rtl' ) {
      if ( bulletsPosition === 'left' ) {
        positionClass = 'cecFeaturedStories__playPause__right';
      } else {
        positionClass = `cecFeaturedStories__playPause__${bulletsPosition}`;
      }
    }
    return (
      <PlayPauseButton
        isPlaying={!isPaused}
        onClick={() => setIsPaused( !isPaused )}
        className={`cecFeaturedStories__playPause ${positionClass}`}
      />
    );
  };
  return (
    <div
      {...rest}
      className={rootClassName}
      style={{ ...( rest.style as React.CSSProperties | undefined ), border: "none", height: containerHeight }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured stories slider"
      aria-live="off"
      tabIndex={0}
      ref={mergedRootRef}
      onKeyDownCapture={chainHandlers( rest.onKeyDownCapture as React.KeyboardEventHandler | undefined, onKeyDownCapture )}
      onKeyDown={chainHandlers( rest.onKeyDown as React.KeyboardEventHandler | undefined, onRootKeyDown )}
      onMouseDownCapture={chainHandlers( rest.onMouseDownCapture as React.MouseEventHandler | undefined, onMouseDownCapture )}
      onTouchStartCapture={chainHandlers( rest.onTouchStartCapture as React.TouchEventHandler | undefined, onPointerDownCapture )}
      onFocusCapture={chainHandlers( rest.onFocusCapture as React.FocusEventHandler | undefined, onFocusCapture )}
    >
      <div className="cecFeaturedStories__container">
        <div className="cecFeaturedStories__slides">
          {processedItems.map( ( item, index ) => (
            <Slide
              key={`slide-${index}`}
              item={item}
              index={index}
              currentSlide={currentSlide}
              animatingSlides={animatingSlides}
              triggerMove={triggerMove}
              isLoaded={loadedImages[index]}
              overlayMode={resolvedOverlayMode}
              fallbackDataUri={FALLBACK_IMAGE_BASE64}
              layout={imageLeftLayout ? "imageLeft" : "default"}
              textColor={textColor || ( imageLeftLayout ? DEFAULT_TEXT_COLOR_DARK : DEFAULT_TEXT_COLOR_LIGHT )}
              totalSlides={total}
              isPaused={isPaused}
              _edit={_edit}
            />
          ) )}
        </div>
        <div className="cec-slider-controls">
          {autoPlay && renderControls()}
          <Pagination
            total={processedItems.length}
            current={currentSlide}
            position={paginationPos}
            onGoTo={( i ) => goToSlide( i, true )}
            disabled={!showPagination}
            dir={dir} // Pass the direction to the Pagination component
          />
        </div>
        {/* Navigation arrows - only show if more than one slide and showNavigationArrows is true */}
        {showNavigationArrows && processedItems.length > 1 && (
          <Navigation
            onPrev={goToPrev}
            onNext={goToNext}
            disabled={!!animatingSlides}
            dir={dir}
          />
        )}
        {_edit && renderEditButton( _edit )}
      </div>
    </div>
  );
};
export default CECFeaturedStories;
