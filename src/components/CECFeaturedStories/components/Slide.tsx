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

import React, { useState, useEffect } from 'react';
import { DefaultLayout, ImageLeftLayout, getSlideEventHandlers } from './layouts';
import { ProcessedBlogCard, Animating } from '../CECFeaturedStories.types';
export interface SlideProps {
  item: ProcessedBlogCard;
  index: number;
  currentSlide: number;
  animatingSlides: Animating | null;
  triggerMove: boolean;
  isLoaded: boolean;
  overlayMode?: 'light' | 'dark' | 'none';
  fallbackDataUri: string;
  layout?: 'default' | 'imageLeft';
  totalSlides: number;
  textColor?: string;
  onHoldStart?: () => void;
  onHoldEnd?: () => void;
  isPaused?: boolean;
  _edit?: unknown;
}
const Slide: React.FC<SlideProps> = ( {
  item,
  index,
  currentSlide,
  animatingSlides,
  triggerMove,
  overlayMode,
  fallbackDataUri,
  layout = 'default',
  totalSlides,
  textColor,
  onHoldStart,
  onHoldEnd,
  isPaused = false,
  _edit,
} ) => {
  // State for image handling
  const imageUrl = item.image?.url;
  const [imageLoaded, setImageLoaded] = useState( false );
  const [imageError, setImageError] = useState( false );
  const hasImage = Boolean( imageUrl ) && !imageError;
  const isCurrent = index === currentSlide;
  const mode = overlayMode || 'light';
  // Build slide class
  let slideClass = 'cecFeaturedStories__slide';
  if ( animatingSlides ) {
    const { current, next, direction } = animatingSlides;
    if ( index === current ) {
      slideClass += ` active ${direction}`;
    }
    else if ( index === next ) slideClass += ` next next--${direction}${triggerMove ? ' move' : ''}`;
  } else if ( isCurrent ) {
    slideClass += ' active';
  }
  // Reset loading state when imageUrl changes
  useEffect( () => {
    if ( imageUrl ) {
      setImageLoaded( false );
      setImageError( false );
    }
  }, [imageUrl] );
  // Image handlers
  const handleImageLoad = () => {
    setImageLoaded( true );
    setImageError( false );
  };
  const handleImageError = ( e: React.SyntheticEvent<HTMLImageElement> ) => {
    // Only log error if we have a URL (prevents double logging)
    if ( imageUrl ) {
      console.error( 'Failed to load image:', imageUrl, e );
    }
    setImageError( true );
    setImageLoaded( false );
  };
  // Determine which layout to use
  const LayoutComponent = layout === 'imageLeft' ? ImageLeftLayout : DefaultLayout;
  return (
    <LayoutComponent
      item={item}
      isCurrent={isCurrent}
      index={index}
      totalSlides={totalSlides}
      mode={mode}
      textColor={textColor}
      onHoldStart={onHoldStart}
      onHoldEnd={onHoldEnd}
      className={slideClass}
      _edit={_edit}
      hasImage={hasImage}
      imageUrl={imageUrl}
      imageLoaded={imageLoaded}
      onImageLoad={handleImageLoad}
      onImageError={handleImageError}
    />
  );
};
export default Slide;
