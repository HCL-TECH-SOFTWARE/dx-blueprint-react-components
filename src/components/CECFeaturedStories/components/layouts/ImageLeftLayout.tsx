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

import React from 'react';
import { SlideLayoutProps } from './types';
import { getSlideEventHandlers, getSlideAriaLabel } from './utils';
import SlideContent from './SlideContent';
import { renderEditButton } from '../../../../utilities/BasicComponent/BasicComponent';
const ImageLeftLayout: React.FC<SlideLayoutProps> = ( {
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
} ) => {
  // Determine if we should show the fallback image
  const isFallback = !hasImage || !imageUrl;
  // Always add has-image class, and fallback class when needed
  const slideClasses = [
    'cecFeaturedStories__slide',
    'layout-imageLeft',
    className,
    'has-image', // Always add has-image class
    isFallback ? 'fallback' : '',
    mode !== 'none' ? `overlay-${mode}` : ''
  ].filter( Boolean ).join( ' ' );
  return (
    <div
      className={slideClasses}
      data-layout="imageLeft"
      aria-hidden={!isCurrent}
      role="group"
      aria-roledescription="slide"
      aria-label={getSlideAriaLabel( index, totalSlides, item.link?.label )}
      {...getSlideEventHandlers( onHoldStart, onHoldEnd )}
    >
      <div
        className="cecFeaturedStories__slideInner"
        style={{
          display: 'flex',
          gap: '1rem',
          height: '100%',
          width: '100%'
        }}
      >
        {}
        <div
          className={`cecFeaturedStories__mediaWrap ${hasImage ? 'has-image' : ''} no-hover-effect`}
          style={{
            width: '40%',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 'var(--component-radius)',
            minHeight: '100%',
            maxHeight: '100%',
            alignSelf: 'stretch',
            flexShrink: 0,
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            willChange: 'transform',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {!isFallback ? (
            <img
              src={imageUrl}
              alt={item.link?.label || 'Featured Story'}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: imageLoaded ? 1 : 0,
                zIndex: 1,
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                willChange: 'opacity',
                transformStyle: 'preserve-3d',
              }}
              onLoad={onImageLoad}
              onError={onImageError}
              loading="lazy"
            />
          ) : (
            <div
              className="cecFeaturedStories__defaultImage"
              style={{
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                color: '#999',
              }}
            >
              No image available
            </div>
          )}
        </div>
        {}
        <div
          className="cecFeaturedStories__textWrap"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '0.5rem',
            minHeight: '100%',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <SlideContent
            item={item}
            textColor={textColor}
            mode={mode}
            isImageLeft={true}
            isActive={isCurrent}
          />
          {_edit && <div className="edit-mode">{renderEditButton( _edit )}</div>}
        </div>
      </div>
    </div>
  );
};
export default ImageLeftLayout;
