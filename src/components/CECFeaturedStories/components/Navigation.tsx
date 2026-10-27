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
interface NavigationProps {
  onPrev: () => void;
  onNext: () => void;
  disabled?: boolean;
  className?: string;
  dir?: 'ltr' | 'rtl';
}
// In Navigation.tsx
const Navigation: React.FC<NavigationProps> = ( {
  onPrev,
  onNext,
  disabled = false,
  className = '',
  dir = 'ltr'
} ) => {
  const isRTL = dir === 'rtl';
  const prevHandler = isRTL ? onNext : onPrev;
  const nextHandler = isRTL ? onPrev : onNext;
  const prevLabel = isRTL ? 'Next slide' : 'Previous slide';
  const nextLabel = isRTL ? 'Previous slide' : 'Next slide';
  const handleClick = ( handler: () => void, e: React.MouseEvent ) => {
    e.preventDefault();
    e.stopPropagation();
    if ( !disabled ) {
      handler();
    }
  };
  return (
    <>
      <button
        className={`cecFeaturedStories__navButton cecFeaturedStories__navButton--prev ${className}`}
        onClick={( e ) => handleClick( prevHandler, e )}
        aria-label={prevLabel}
        title={prevLabel}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5899 25.41L32.5899 45.41V45.42L35.4199 42.59L16.8299 24L35.4199 5.41997L32.5899 2.58997L12.5899 22.58C11.8099 23.36 11.8099 24.63 12.5899 25.41Z" fill="currentColor" />
        </svg>
      </button>
      <button
        className={`cecFeaturedStories__navButton cecFeaturedStories__navButton--next ${className}`}
        onClick={( e ) => handleClick( nextHandler, e )}
        aria-label={nextLabel}
        title={nextLabel}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5801 42.58L15.4101 45.41L35.4201 25.41C36.2001 24.63 36.2001 23.36 35.4201 22.58L15.4201 2.57996L12.5901 5.40996L31.1701 24L12.5801 42.58Z" fill="currentColor" />
        </svg>
      </button>
    </>
  );
};
export default Navigation;
