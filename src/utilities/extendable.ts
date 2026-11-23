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
 * The extension props a component root accepts, matching what `pickDomProps` forwards at runtime:
 * `ref` (React 19 passes it as a prop), `className`, `id`, `style`, `data-*` and `aria-*` attributes, and the DOM event handlers of `El`.
 * Other HTML attributes (for example `title`, `role`, `tabIndex`, `lang`, `hidden`) are deliberately not part of it.
 */
type ExtensionAttributes<El extends keyof React.JSX.IntrinsicElements> =
    Omit<React.DOMAttributes<React.ComponentRef<El>>, "children" | "dangerouslySetInnerHTML"> &
    React.AriaAttributes & {
        ref?: React.Ref<React.ComponentRef<El>>;
        className?: string;
        id?: string;
        style?: React.CSSProperties;
        [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
    };

/**
 * A component's own props plus the extension props of its root element `El` (see `ExtensionAttributes`). Own props win.
 *
 * Internal type: it is intentionally not exported from `utilities/index.ts`.
 */
export type ExtendableProps<Own, El extends keyof React.JSX.IntrinsicElements = "div"> =
    Own & Omit<ExtensionAttributes<El>, keyof Own>;

// Extension keys forwarded to a component root, whatever the component's props type. Component props can come from
// untyped content data (WCM component configs, catalog items) with keys the component does not declare, so anything
// that is not on this short list is dropped. `title`, `role`, `lang`, `hidden` and `tabIndex` are deliberately NOT
// forwarded: content data uses `title` as text and `role` as a job title, so they cannot be told apart from a consumer attribute.
// `data-*` and `aria-*` keys (any value)
const PASSTHROUGH_KEY = /^(data-|aria-)/;
// `onClick`, `onKeyDown`, ... (only when the value is a function)
const EVENT_HANDLER_KEY = /^on[A-Z]/;

const isPlainObject = ( value: unknown ): boolean => {
    if ( typeof value !== "object" || value === null ) return false;
    const proto = Object.getPrototypeOf( value );
    return proto === Object.prototype || proto === null;
};

const isForwarded = ( key: string, value: unknown ): boolean => {
    if ( PASSTHROUGH_KEY.test( key ) ) return true;
    if ( key === "id" ) return typeof value === "string" || typeof value === "number";
    // a non-object `style` (for example a CSS string from data) would make React throw
    if ( key === "style" ) return isPlainObject( value );
    return EVENT_HANDLER_KEY.test( key ) && typeof value === "function";
};

/**
 * Keeps only the extension props that may reach a component root and drops everything else, so undeclared props
 * (for example WCM config keys such as `_edit`, `textAlign` or a content `title`) never become DOM attributes:
 * - `data-*` and `aria-*` keys;
 * - `id` when the value is a string or a number;
 * - `style` when the value is a plain object;
 * - `on[A-Z]*` keys when the value is a function.
 *
 * `className` and `ref` are not handled here; components take them out themselves. Every component root spreads the result
 * of this helper instead of its raw rest props.
 *
 * Internal helper: it is intentionally not exported from `utilities/index.ts`.
 */
export const pickDomProps = ( rest: object ): Record<string, unknown> => {
    const source = rest as Record<string, unknown>;
    const picked: Record<string, unknown> = {};
    Object.keys( source ).forEach( ( key ) => {
        const value = source[key];
        if ( isForwarded( key, value ) ) {
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
