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
