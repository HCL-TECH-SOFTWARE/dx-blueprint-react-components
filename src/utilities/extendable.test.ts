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

import { pickDomProps } from "./extendable";

describe( "pickDomProps", () => {
    test( "keeps data-*, aria-*, id, role, title, style, tabIndex, lang and hidden", () => {
        const style = { color: "red" };
        const input = {
            "data-testid": "x",
            "data-contract": "yes",
            "aria-label": "label",
            "aria-describedby": "desc",
            id: "my-id",
            role: "region",
            title: "tip",
            style,
            tabIndex: 0,
            lang: "en",
            hidden: true,
        };
        expect( pickDomProps( input ) ).toEqual( input );
    } );

    test( "keeps on[A-Z] keys whose value is a function", () => {
        const onClick = jest.fn();
        const onKeyDown = jest.fn();
        const result = pickDomProps( { onClick, onKeyDown } );
        expect( result.onClick ).toBe( onClick );
        expect( result.onKeyDown ).toBe( onKeyDown );
    } );

    test( "drops on[A-Z] keys whose value is not a function", () => {
        expect( pickDomProps( { onClick: "alert(1)", onFocus: undefined, onBlur: null, onChange: 1 } ) ).toEqual( {} );
    } );

    test( "drops keys that are not DOM attributes (including lower-case 'on' lookalikes)", () => {
        const result = pickDomProps( { title2: "a", items: [], config: {}, online: () => undefined, onclick: () => undefined, dataFoo: 1, ariaLabel: "x" } );
        expect( result ).toEqual( {} );
    } );

    test( "does not handle className or ref: they are dropped", () => {
        expect( pickDomProps( { className: "a", ref: { current: null }, key: "k" } ) ).toEqual( {} );
    } );

    test( "returns a new object and leaves the input untouched", () => {
        const input = { id: "a", items: [1] };
        const result = pickDomProps( input );
        expect( result ).not.toBe( input );
        expect( input ).toEqual( { id: "a", items: [1] } );
    } );

    test( "returns an empty object for an empty input", () => {
        expect( pickDomProps( {} ) ).toEqual( {} );
    } );
} );
