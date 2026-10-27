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
/**
 * fix: `matchMedia` not present, legacy browsers require a polyfill
 */
/**
 * fix: React 19 warns "The current testing environment is not configured to
 * support act(...)" for updates scheduled from async DOM callbacks (e.g.
 * transitionend handlers from react-transition-group) unless this is set.
 */
global.IS_REACT_ACT_ENVIRONMENT = true;

global.matchMedia =
    global.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () { },
            removeListener: function () { },
            addEventListener: function () { },
            removeEventListener: function () { },
        };
    };

/**
* fix: window.<function> not defined errors
*/
const noop = () => { };

// Only define window properties if window exists (browser environment)
if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
    Object.defineProperty(window, 'open', { value: noop, writable: true });
}


/**
* fix: ResizeObserver not defined in JSDOM test environment
*/
global.ResizeObserver = class ResizeObserver {
    constructor(callback) {
        this.callback = callback;
    }
    observe() {
        // Mock implementation for tests
    }
    unobserve() {
        // Mock implementation for tests
    }
    disconnect() {
        // Mock implementation for tests
    }
};

/**
 * fix: JSDOM lacks SVGElement.className.baseVal which some third-party libraries
 * (e.g. d3-interpolate) access when manipulating SVG class attributes.
 */
if (typeof SVGElement !== 'undefined') {
    Object.defineProperty(SVGElement.prototype, 'className', {
        get() {
            return { baseVal: this.getAttribute('class') || '', animVal: '' };
        },
        configurable: true,
    });
}

/**
 * fix: JSDOM does not implement SVGElement.transform (SVGAnimatedTransformList).
 * d3-interpolate's parseSvg() accesses svgNode.transform.baseVal.consolidate() when
 * animating SVG transform attributes. Without this polyfill, requestAnimationFrame
 * callbacks fired by d3-transition after test cleanup throw:
 *   "TypeError: Cannot read properties of undefined (reading 'baseVal')"
 * Returning null from consolidate() causes d3 to treat the transform as identity
 * (i.e. a no-op), which is the correct fallback for a JSDOM environment.
 */
if (typeof SVGElement !== 'undefined') {
    const transformListStub = {
        consolidate: () => null,
        numberOfItems: 0,
        getItem: () => null,
        appendItem: () => null,
        removeItem: () => null,
        insertItemBefore: () => null,
        replaceItem: () => null,
        clear: () => { },
    };
    Object.defineProperty(SVGElement.prototype, 'transform', {
        get() {
            return { baseVal: transformListStub, animVal: transformListStub };
        },
        configurable: true,
    });
}
