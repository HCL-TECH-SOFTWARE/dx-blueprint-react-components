import React from 'react';
import { SlideLayoutProps } from './types';
import { getSlideEventHandlers, getSlideAriaLabel } from './utils';
import SlideContent from './SlideContent';
import { renderEditButton,  } from '../../../../utilities/BasicComponent/BasicComponent';
const DefaultLayout: React.FC<SlideLayoutProps> = ({
  item,
  isCurrent,
  index,
  totalSlides,
  mode = 'light',
  textColor,
  onHoldStart,
  onHoldEnd,
  className = '',
  _edit,
  hasImage,
  imageUrl,
  imageLoaded,
  onImageLoad,
  onImageError,
}) => {
  const isFallback = !hasImage;
  const backgroundImage = isFallback ? '' : `url(${imageUrl})`;
  const overlayColor = mode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : mode === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
  const backgroundStyle = {
    backgroundImage: isFallback
      ? ''
      : `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
  // Always add has-image class, and fallback class when needed
  const slideClasses = [
    'cecFeaturedStories__slide',
    className,
    'has-image', // Always add has-image class
    isFallback ? 'fallback' : ''
  ].filter(Boolean).join(' ');
  return (
    <div
      className={slideClasses}
      data-overlay-mode={mode}
      style={backgroundStyle}
      aria-hidden={!isCurrent}
      role="group"
      aria-roledescription="slide"
      aria-label={getSlideAriaLabel(index, totalSlides, item.link?.label)}
      {...getSlideEventHandlers(onHoldStart, onHoldEnd)}
    >
      {mode !== 'none' && (
        <div
          className="cecFeaturedStories__overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlayColor,
            zIndex: 1,
            pointerEvents: 'none' // Allow clicks to pass through the overlay
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <>
          <SlideContent
            item={item}
            textColor={textColor}
            mode={mode}
            isImageLeft={false}
            isActive={isCurrent}
          />
          {_edit && <div className="edit-mode">{renderEditButton(_edit)}</div>}
        </>
      </div>
    </div>
  );
};
export default DefaultLayout;
