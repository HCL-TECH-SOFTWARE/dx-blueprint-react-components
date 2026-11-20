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

import React from "react";

/**
 * Own props win over the HTML attributes of the root element `El`. Includes `ref` (React 19 passes it as a prop).
 *
 * Internal type: it is intentionally not exported from `utilities/index.ts`.
 */
export type ExtendableProps<Own, El extends keyof React.JSX.IntrinsicElements = "div"> =
    Own & Omit<React.ComponentPropsWithRef<El>, keyof Own>;

// `data-*`, `aria-*` and the plain DOM attributes a consumer may reasonably set on a component root.
const PASSTHROUGH_KEY = /^(data-|aria-)/;
const PASSTHROUGH_ATTRIBUTES = ["id", "role", "title", "style", "tabIndex", "lang", "hidden"];
// `onClick`, `onKeyDown`, ... (only when the value is a function)
const EVENT_HANDLER_KEY = /^on[A-Z]/;

/**
 * For components whose props type has an index signature: keeps only the keys that are safe to spread on a DOM element
 * (`data-*`, `aria-*`, `id`, `role`, `title`, `style`, `tabIndex`, `lang`, `hidden` and `on[A-Z]*` functions) and drops everything else,
 * so unknown props never reach the DOM. `className` and `ref` are not handled here; components take them out themselves.
 *
 * Internal helper: it is intentionally not exported from `utilities/index.ts`.
 */
export const pickDomProps = ( rest: Record<string, unknown> ): Record<string, unknown> => {
    const picked: Record<string, unknown> = {};
    Object.keys( rest ).forEach( ( key ) => {
        const value = rest[key];
        if (
            PASSTHROUGH_KEY.test( key ) ||
            PASSTHROUGH_ATTRIBUTES.indexOf( key ) !== -1 ||
            ( EVENT_HANDLER_KEY.test( key ) && typeof value === "function" )
        ) {
            picked[key] = value;
        }
    } );
    return picked;
};

/**
 * Merges several refs (object or callback refs) into one callback ref, for roots that need an internal ref of their own
 * and must also forward the consumer's `ref`. Keep the result stable (`useMemo`) so React does not detach and re-attach it on every render.
 *
 * Internal helper: it is intentionally not exported from `utilities/index.ts`.
 */
export const mergeRefs = <T>( ...refs: Array<React.Ref<T> | undefined> ) => ( node: T | null ): void => {
    refs.forEach( ( ref ) => {
        if ( typeof ref === "function" ) {
            ref( node );
        } else if ( ref ) {
            ( ref as React.MutableRefObject<T | null> ).current = node;
        }
    } );
};

/**
 * Chains a consumer's event handler with the component's own: the consumer's runs first and the component's is skipped
 * when the consumer called `event.preventDefault()`.
 *
 * Internal helper: it is intentionally not exported from `utilities/index.ts`.
 */
export const chainHandlers = <E extends { defaultPrevented: boolean; }>(
    consumer: ( ( event: E ) => void ) | undefined,
    own: ( event: E ) => void
) => ( event: E ): void => {
    if ( consumer ) consumer( event );
    if ( !event.defaultPrevented ) own( event );
};

/**
 * Renders its children and ignores every other prop. Use it as the direct child of a carousel (react-slick) around a component
 * that accepts extension props: the carousel clones its children with `className`, `style`, `tabIndex`, `aria-hidden` and `onClick`,
 * and those must not land on the component's root (they never did before the component accepted extension props).
 *
 * Internal helper: it is intentionally not exported from `utilities/index.ts`.
 */
export const SlideSink = ( { children }: { children?: React.ReactNode; } ) => React.createElement( React.Fragment, null, children );
