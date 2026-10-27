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

// src/components/CECFeaturedStories/components/Pagination.tsx
import React from "react";
interface Props {
  total: number;
  current: number;
  position: "left" | "center" | "right";
  onGoTo: ( index: number ) => void;
  disabled?: boolean;
  dir?: 'ltr' | 'rtl';
}
const Pagination: React.FC<Props> = ( { total, current, position, onGoTo, disabled, dir = 'ltr' } ) => {
  if ( disabled || total <= 1 ) return null;
  let positionClass = `cecFeaturedStories__pagination--${position} ${dir === 'rtl' ? 'rtl' : ''}`;
  // In RTL, flip left/right positions
  if ( dir === 'rtl' ) {
    if ( position === 'left' ) {
      positionClass = 'cecFeaturedStories__pagination--right';
    } else {
      positionClass = `cecFeaturedStories__pagination--${position}`;
    }
  }
  // Create array of indices in correct order based on direction
  const indices = Array.from( { length: total }, ( _, i ) =>
    dir === 'rtl' ? total - 1 - i : i
  );
  const onKeyDown = ( e: React.KeyboardEvent<HTMLDivElement> ) => {
    if ( e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' ) return;
    e.preventDefault();
    e.stopPropagation();
    const isRTL = dir === 'rtl';
    const isNext = isRTL ? e.key === 'ArrowLeft' : e.key === 'ArrowRight';
    const nextIndex = isNext
      ? ( current + 1 ) % total
      : ( current - 1 + total ) % total;
    onGoTo( nextIndex );
  };
  return (
    <div
      className={`cecFeaturedStories__pagination ${positionClass}`}
      tabIndex={0}
      aria-label="Carousel pagination"
      onKeyDown={onKeyDown}
    >
      {indices.map( ( index ) => (
        <button
          key={`pagination-${index}`}
          tabIndex={-1}
          className={`cecFeaturedStories__bullet ${index === current ? "cecFeaturedStories__bullet--active" : ""}`}
          type="button"
          onClick={() => onGoTo( index )}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === current ? "true" : undefined}
        />
      ) )}
    </div>
  );
};
export default Pagination;
