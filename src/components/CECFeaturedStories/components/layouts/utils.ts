import { CSSProperties } from 'react';
import {DEFAULT_TEXT_COLOR_DARK, DEFAULT_TEXT_COLOR_LIGHT} from "../../constants";
import {
  decodeHtmlEntities,
} from "../../../../utilities/cec-utils";
export const getSlideEventHandlers = (onHoldStart?: () => void, onHoldEnd?: () => void) => ({
  onPointerDown: onHoldStart,
  onPointerUp: onHoldEnd,
  onPointerCancel: onHoldEnd,
  onMouseDown: onHoldStart,
  onMouseUp: onHoldEnd,
  onMouseLeave: onHoldEnd,
  onTouchStart: onHoldStart,
  onTouchEnd: onHoldEnd,
  onTouchCancel: onHoldEnd,
});
// Create a function to safely render HTML content
export const createMarkup = ( html: string ) => {
  if ( !html ) return { __html: '' };
  // Ensure HTML entities are properly decoded
  const decoded = decodeHtmlEntities( html );
  return { __html: decoded };
};
export const getTextColor = (
  element: 'title' | 'excerpt' = 'title',
  textColor?: string,
  mode: string = 'light',
  isImageLeft: boolean = false
): string => {
  if (textColor) return textColor;
  if (mode === 'dark') return DEFAULT_TEXT_COLOR_DARK;
  return element === 'title' ? DEFAULT_TEXT_COLOR_LIGHT : DEFAULT_TEXT_COLOR_DARK;
};
export const getTextShadow = (type: 'title' | 'excerpt', mode: string, isImageLeft: boolean): string => {
  if (isImageLeft || mode !== 'dark') return 'none';
  return `0 1px ${type === 'title' ? '3' : '2'}px rgba(0, 0, 0, ${type === 'title' ? '0.7' : '0.5'})`;
};
export const getSlideAriaLabel = (index: number, totalSlides: number, label?: string): string => {
  return `Slide ${index + 1} of ${totalSlides}${label ? ': ' + label : ''}`;
};
export const getSlideBaseStyles = (isCurrent: boolean): CSSProperties => ({
  position: isCurrent ? 'relative' : 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: isCurrent ? 1 : 0,
  visibility: isCurrent ? 'visible' : 'hidden',
  transition: 'transform var(--CECSlider-timer) ease, opacity 0.3s ease, visibility 0.3s ease',
  willChange: 'transform, opacity, border-radius',
  transformStyle: 'preserve-3d',
  backfaceVisibility: 'hidden',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  boxSizing: 'border-box',
  padding: '2rem',
  overflow: 'hidden',
  cursor: 'grab',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
});
