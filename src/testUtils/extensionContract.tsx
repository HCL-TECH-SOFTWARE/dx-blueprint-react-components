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
 * Shared "extension props" contract for every exported component. Each component test file calls
 * `itSupportsExtensionProps` once, reusing that file's fixtures:
 *
 *   itSupportsExtensionProps( ( extra ) => <DXFoo {...defaultProps} {...extra} /> );
 *
 * This file is test support only: it is not a test suite and is not imported by `src/index.ts`, so it is never published.
 */
import React from "react";
import { render } from "@testing-library/react";

export interface ExtensionProps {
    className: string;
    "data-contract": string;
    "aria-describedby": string;
    // `any`: the root element type differs per component, so the ref has to fit every one of them
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: React.RefObject<any>;
}

export interface ExtensionContractOptions {
    /** Where the component's root element is. Defaults to the first element child of the render container. */
    getRoot?: ( container: HTMLElement ) => Element | null;
    /** Root classes that are generated per instance (for example a random suffix) and so cannot be compared between two renders. */
    ignoreClasses?: RegExp;
    /**
     * Keys of the undeclared-props check (`WCM_STYLE_PROPS`) that this component declares as its own props, so they are
     * legitimately rendered. Only list a key here when the component's props type really declares it.
     */
    ownKeys?: string[];
}

/**
 * Props a component does not declare, as they arrive from untyped content data (WCM component configs, catalog items).
 * None of them may reach the DOM: they are not part of the extension contract.
 */
export const WCM_STYLE_PROPS: Record<string, unknown> = {
    animationTime: 2,
    textAlign: "left",
    navitationImageAlt: "x",
    _edit: { button: () => undefined },
    background: { color: "red" },
    title: "Leaked title",
    role: "Software Developer",
    lang: "xx",
    hidden: true,
    tabIndex: 3,
    style: "color:red",
    onItems: "data",
};

const attributeNames = ( element: Element | null ): string[] =>
    element ? Array.from( element.attributes ).map( ( attribute ) => attribute.name ) : [];

// every attribute value in the document (portals included) that is a stringified object
const objectAttributeValues = (): string[] =>
    Array.from( document.body.querySelectorAll( "*" ) ).flatMap( ( element ) =>
        Array.from( element.attributes )
            .filter( ( attribute ) => attribute.value.indexOf( "[object Object]" ) !== -1 )
            .map( ( attribute ) => `${element.tagName.toLowerCase()}@${attribute.name}` ) );

export const itSupportsExtensionProps = (
    renderComponent: ( extra: ExtensionProps ) => React.ReactElement,
    options?: ExtensionContractOptions
) => {
    const getRoot = ( container: HTMLElement ) =>
        ( options?.getRoot ? options.getRoot( container ) : container.firstElementChild ) as HTMLElement | null;
    const extraProps = (): ExtensionProps => ( {
        className: "bp-contract",
        "data-contract": "yes",
        "aria-describedby": "bp-contract-desc",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref: React.createRef<any>(),
    } );

    describe( "extension props", () => {
        it( "adds a consumer className to the root and keeps every original class", () => {
            const plain = render( renderComponent( { ...extraProps(), className: "" } as ExtensionProps ) );
            const originalClasses = Array.from( getRoot( plain.container )?.classList ?? [] );
            plain.unmount();
            const extended = render( renderComponent( extraProps() ) );
            const root = getRoot( extended.container );
            expect( root ).not.toBeNull();
            expect( root?.classList.contains( "bp-contract" ) ).toBe( true );
            originalClasses
                .filter( ( cls ) => !options?.ignoreClasses?.test( cls ) )
                .forEach( ( cls ) => expect( root?.classList.contains( cls ) ).toBe( true ) );
        } );

        it( "passes extra DOM attributes (data-*, aria-*) to the root", () => {
            const { container } = render( renderComponent( extraProps() ) );
            const root = getRoot( container );
            expect( root?.getAttribute( "data-contract" ) ).toBe( "yes" );
            expect( root?.getAttribute( "aria-describedby" ) ).toBe( "bp-contract-desc" );
        } );

        it( "forwards ref to the root element", () => {
            const extra = extraProps();
            const { container } = render( renderComponent( extra ) );
            expect( extra.ref.current ).toBe( getRoot( container ) );
        } );

        it( "does not put undeclared props (WCM-style config keys) on the root or anywhere as [object Object]", () => {
            // a bare render: no extension props at all
            const bare = render( renderComponent( {} as ExtensionProps ) );
            const bareNames = attributeNames( getRoot( bare.container ) );
            const bareObjectValues = objectAttributeValues();
            bare.unmount();
            const undeclared = Object.keys( WCM_STYLE_PROPS )
                .filter( ( key ) => !options?.ownKeys?.includes( key ) )
                .reduce<Record<string, unknown>>( ( acc, key ) => ( { ...acc, [key]: WCM_STYLE_PROPS[key] } ), {} );
            const leaky = render( renderComponent( undeclared as unknown as ExtensionProps ) );
            const leaked = attributeNames( getRoot( leaky.container ) ).filter( ( name ) => name !== "class" && !bareNames.includes( name ) );
            expect( leaked ).toEqual( [] );
            expect( objectAttributeValues() ).toEqual( bareObjectValues );
        } );

        it( "adds no root attribute apart from the extension props it was given", () => {
            const bare = render( renderComponent( {} as ExtensionProps ) );
            const bareNames = attributeNames( getRoot( bare.container ) );
            bare.unmount();
            const given = ["class", "data-contract", "aria-describedby", "id"];
            const extended = render( renderComponent( { ...extraProps(), id: "bp-contract-id" } as ExtensionProps ) );
            const extra = attributeNames( getRoot( extended.container ) ).filter( ( name ) => !given.includes( name ) && !bareNames.includes( name ) );
            expect( extra ).toEqual( [] );
        } );

        it( "does not log a console error while rendering with extension props", () => {
            const spy = jest.spyOn( console, "error" ).mockImplementation( () => undefined );
            try {
                render( renderComponent( extraProps() ) );
                expect( spy ).not.toHaveBeenCalled();
            } finally {
                spy.mockRestore();
            }
        } );
    } );
};
