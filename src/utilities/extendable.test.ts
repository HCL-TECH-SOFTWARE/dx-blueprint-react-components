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
import { render } from "@testing-library/react";
import { SlideSink, chainHandlers, mergeRefs, pickDomProps } from "./extendable";

describe( "pickDomProps", () => {
    test( "keeps data-*, aria-*, a string or number id and an object style", () => {
        const style = { color: "red" };
        const input = {
            "data-testid": "x",
            "data-contract": "yes",
            "aria-label": "label",
            "aria-describedby": "desc",
            id: "my-id",
            style,
        };
        expect( pickDomProps( input ) ).toEqual( input );
        expect( pickDomProps( { id: 7 } ) ).toEqual( { id: 7 } );
    } );

    test( "drops title, role, lang, hidden and tabIndex (content data uses some of them as text)", () => {
        expect( pickDomProps( { title: "tip", role: "Software Developer", lang: "en", hidden: true, tabIndex: 0 } ) ).toEqual( {} );
    } );

    test( "drops WCM config keys the components do not declare", () => {
        const result = pickDomProps( {
            _edit: { button: () => undefined },
            background: { color: "red" },
            textAlign: "left",
            animationTime: 2,
            navitationImageAlt: "logo",
            "data-ok": "yes",
        } );
        expect( result ).toEqual( { "data-ok": "yes" } );
    } );

    test( "drops an id that is not a string or a number", () => {
        expect( pickDomProps( { id: { value: "a" } } ) ).toEqual( {} );
        expect( pickDomProps( { id: true } ) ).toEqual( {} );
        expect( pickDomProps( { id: null } ) ).toEqual( {} );
    } );

    test( "drops a style that is not a plain object", () => {
        expect( pickDomProps( { style: "color:red" } ) ).toEqual( {} );
        expect( pickDomProps( { style: ["a"] } ) ).toEqual( {} );
        expect( pickDomProps( { style: null } ) ).toEqual( {} );
        expect( pickDomProps( { style: new Date( 0 ) } ) ).toEqual( {} );
        const bare = Object.create( null ) as Record<string, unknown>;
        bare.color = "red";
        expect( pickDomProps( { style: bare } ).style ).toBe( bare );
    } );

    test( "keeps on[A-Z] keys whose value is a function", () => {
        const onClick = jest.fn();
        const onKeyDown = jest.fn();
        const result = pickDomProps( { onClick, onKeyDown } );
        expect( result.onClick ).toBe( onClick );
        expect( result.onKeyDown ).toBe( onKeyDown );
    } );

    test( "drops on[A-Z] keys whose value is not a function", () => {
        expect( pickDomProps( { onClick: "alert(1)", onFocus: undefined, onBlur: null, onChange: 1, onItems: "data" } ) ).toEqual( {} );
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

    test( "drops the DX wrapper keys data, config and props", () => {
        expect( pickDomProps( { data: {}, config: {}, props: {}, id: "a" } ) ).toEqual( { id: "a" } );
    } );

    test( "returns an empty object for an empty input", () => {
        expect( pickDomProps( {} ) ).toEqual( {} );
    } );
} );

describe( "mergeRefs", () => {
    test( "sets an object ref and calls a callback ref with the node", () => {
        const objectRef = { current: null as HTMLElement | null };
        const callbackRef = jest.fn();
        const node = document.createElement( "div" );
        mergeRefs<HTMLElement>( objectRef, callbackRef )( node );
        expect( objectRef.current ).toBe( node );
        expect( callbackRef ).toHaveBeenCalledWith( node );
    } );

    test( "passes null to every ref when the node is removed", () => {
        const objectRef = { current: document.createElement( "div" ) as HTMLElement | null };
        const callbackRef = jest.fn();
        mergeRefs<HTMLElement>( objectRef, callbackRef )( null );
        expect( objectRef.current ).toBeNull();
        expect( callbackRef ).toHaveBeenCalledWith( null );
    } );

    test( "ignores undefined and null refs", () => {
        const objectRef = { current: null as HTMLElement | null };
        const node = document.createElement( "div" );
        expect( () => mergeRefs<HTMLElement>( undefined, null, objectRef )( node ) ).not.toThrow();
        expect( objectRef.current ).toBe( node );
    } );
} );

describe( "chainHandlers", () => {
    test( "runs the consumer handler first, then the component's", () => {
        const calls: string[] = [];
        chainHandlers( () => calls.push( "consumer" ), () => calls.push( "own" ) )( { defaultPrevented: false } );
        expect( calls ).toEqual( ["consumer", "own"] );
    } );

    test( "skips the component's handler when the consumer prevented the default", () => {
        const own = jest.fn();
        const event = { defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } };
        chainHandlers( ( e: typeof event ) => e.preventDefault(), own )( event );
        expect( own ).not.toHaveBeenCalled();
    } );

    test( "runs only the component's handler when there is no consumer handler", () => {
        const own = jest.fn();
        chainHandlers( undefined, own )( { defaultPrevented: false } );
        expect( own ).toHaveBeenCalledTimes( 1 );
    } );
} );

describe( "SlideSink", () => {
    it( "renders its children and drops the props a carousel injects", () => {
        const Probe = ( props: Record<string, unknown> ) => React.createElement( "span", { "data-testid": "probe", "data-keys": Object.keys( props ).sort().join( "," ) } );
        const slide = React.createElement( SlideSink, null, React.createElement( Probe, { own: "yes" } ) );
        // what react-slick does with each direct child
        const cloned = React.cloneElement( slide, { className: "slick-slide", style: { width: 10 }, tabIndex: -1, "aria-hidden": true, onClick: () => undefined } as object );
        const { getByTestId } = render( cloned );
        expect( getByTestId( "probe" ).getAttribute( "data-keys" ) ).toBe( "own" );
    } );
} );
