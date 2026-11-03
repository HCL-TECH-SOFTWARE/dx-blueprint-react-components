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
