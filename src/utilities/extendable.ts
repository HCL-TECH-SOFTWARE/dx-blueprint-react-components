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
