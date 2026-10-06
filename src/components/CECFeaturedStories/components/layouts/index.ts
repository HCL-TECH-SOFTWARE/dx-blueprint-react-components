import DefaultLayout from './DefaultLayout';
import ImageLeftLayout from './ImageLeftLayout';
import SlideContent from './SlideContent';
import { LayoutType, SlideLayoutProps } from './types';
import { getSlideEventHandlers, getTextColor, getTextShadow, getSlideAriaLabel } from './utils';
export type { LayoutType, SlideLayoutProps };
export { 
  DefaultLayout, 
  ImageLeftLayout, 
  SlideContent,
  getSlideEventHandlers,
  getTextColor,
  getTextShadow,
  getSlideAriaLabel
};
export const getLayoutComponent = (layout: LayoutType = 'default') => {
  return layout === 'imageLeft' ? ImageLeftLayout : DefaultLayout;
};
