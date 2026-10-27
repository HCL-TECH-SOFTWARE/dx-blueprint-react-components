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
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MySavedLinks, { MySavedLinksProps } from "./DXMySavedLinks";
import { CustomSavedLinksArgs, EmptyViewArgs, DefaultEmptyViewArgs, DefaultExampleArgs, SavedLinksChangedIconsArgs, } from "./DXMySavedLinks.stories";

// Testing header title
test( "header title has value set via prop", () => {
    let props: MySavedLinksProps = JSON.parse( JSON.stringify( DefaultExampleArgs ) );
    props.title = "Custom header value";
    render( <MySavedLinks {...props} /> );
    let label = screen.getByTestId( "msl-header" );
    expect( label ).toHaveTextContent( props.title );
} );

test( "header title has default value when not set via prop", () => {
    let props: MySavedLinksProps = DefaultExampleArgs;
    render( <MySavedLinks {...props} /> );
    let label = screen.getByTestId( "msl-header" );
    expect( label ).toHaveTextContent( "My Saved Links" );
} );

// Testing header link
test( "header link has expected values set via prop", () => {
    let props: MySavedLinksProps = JSON.parse( JSON.stringify( DefaultExampleArgs ) );
    props.link = {
        url: "https://hcl-software.com/",
        target: "_blank",
        label: "Custom value for link test"
    };

    render( <MySavedLinks {...props} /> );
    let anchor = screen.getByTestId( "msl-callToAction" ) as HTMLAnchorElement;
    expect( anchor ).toHaveTextContent( props.link.label );
    expect( anchor.target ).toBe( props.link.target );
    expect( anchor.href ).toBe( props.link.url );
} );

test( "header link is not rendered when not set via prop", () => {
    render( <MySavedLinks {...DefaultExampleArgs} /> );
    let anchor = document.querySelector( "[data-testid=msl-callToAction]" );
    expect( anchor ).toBeNull;
} );

test( "header link has default target when not set via prop", () => {
    let props: MySavedLinksProps = JSON.parse( JSON.stringify( DefaultExampleArgs ) );
    props.link = {
        url: "https://hcl-software.com/",
        label: "Custom value for link test"
    };
    render( <MySavedLinks {...props} /> );
    let anchor = screen.getByTestId( "msl-callToAction" ) as HTMLAnchorElement;
    expect( anchor.target ).toBe( "_self" );
} );

// Testing cards are rendered
test( "all cards are rendered", () => {
    let { container } = render( <MySavedLinks {...CustomSavedLinksArgs} /> );
    let cards = container.querySelectorAll( ".dxMyLinksCard" );
    expect( cards.length ).toEqual( CustomSavedLinksArgs.links.length );
} );


// Testing empty container
test( "empty container is rendered when no links are added", () => {
    render( <MySavedLinks {...EmptyViewArgs} /> );
    expect( screen.getByTestId( "dxEmptyState" ) ).not.toBeNull();
    expect( screen.getByTestId( "dxEmptyState" ).querySelector( "h5" ) ).toBeInTheDocument();
    expect( screen.getByTestId( "dxEmptyState" ).querySelector( "p" ) ).toBeInTheDocument();
    expect( screen.getByTestId( "dxEmptyState" ).querySelector( "img" ) ).toBeInTheDocument();
} );

