// src/components/CECFeaturedStories/hooks/useResponsiveHeights.ts
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_HEIGHT, DEFAULT_HEIGHT_MOBILE } from "../constants";
function generateUniqueClass() {
  return `cecFeaturedStories__container_${Math.random().toString(36).substr(2, 9)}`;
}
export function useResponsiveHeights(
  height?: string | number,
  heightMobile?: string | number
) {
  const [containerHeight, setContainerHeight] = useState<string>(DEFAULT_HEIGHT);
  const [containerHeightMobile, setContainerHeightMobile] = useState<string>(DEFAULT_HEIGHT_MOBILE);
  const uniqueClass = useMemo(() => generateUniqueClass(), []);
  useEffect(() => {
    if (height) {
      setContainerHeight(typeof height === "number" ? `${height}px` : height);
    }
    if (heightMobile) {
      setContainerHeightMobile(typeof heightMobile === "number" ? `${heightMobile}px` : heightMobile);
    }
  }, [height, heightMobile]);
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .${uniqueClass} { height: ${containerHeight}; }
      @media (max-width: 767px) {
        .${uniqueClass} { height: ${containerHeightMobile}; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [uniqueClass, containerHeight, containerHeightMobile]);
  return { containerHeight, containerHeightMobile, responsiveHeightCSSClass: uniqueClass };
}
