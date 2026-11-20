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
import { itSupportsExtensionProps } from "../../testUtils/extensionContract";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { RichTextBreadcrumbsArgs, StraightCardArgs } from "./DXStraightCard.stories";
import DXStraightCard from "./DXStraightCard";
import { LinksProps } from "../../utilities";

test( "If the breadcrumb renders if value given: Format STRING", () => {
    render( <DXStraightCard {...RichTextBreadcrumbsArgs} /> );
    expect( screen.getByTestId( "StCard-breadcrumbText" ) ).toBeInTheDocument();
} );

test( "If the breadcrumb renders correcltly as: Format LINK Array", () => {
    render( <DXStraightCard {...StraightCardArgs} /> );
    expect( screen.getByTestId( "StCard-breadcrumbList" ).firstChild ).toHaveTextContent( ( StraightCardArgs.breadcrumb![0] as LinksProps ).label );
} );

test( "If the breadcrumb dont render if the paramater is not set", () => {
    let { container } = render( <DXStraightCard title={StraightCardArgs.title} /> );
    const breadcbrumb = container.querySelector( '[data-testid="StCard-breadcrumbContainer"]' );
    expect( breadcbrumb ).toBeNull();
} );

test( "If the tags renders correctly: Child count", () => {
    render( <DXStraightCard {...StraightCardArgs} /> );
    expect( screen.getByTestId( "StCard-tags" ).children.length ).toEqual( StraightCardArgs.tags!.length );
} );

test( "If the tags renders correctly: Item Text", () => {
    render( <DXStraightCard {...StraightCardArgs} /> );
    let tagText: string = StraightCardArgs.tags![0].label;
    expect( screen.getByTestId( "StCard-tags" ).firstChild ).toHaveTextContent( tagText );
} );

test( "If the tags renders correctly: Item Color", () => {
    render( <DXStraightCard {...StraightCardArgs} /> );
    let tagColor: string = StraightCardArgs.tags![0].color!;
    expect( screen.getByTestId( "StCard-tags" ).firstChild ).toHaveAttribute( "style", `border-color: ${tagColor}; color: ${tagColor};` );
} );

test( "If tags section don't render if value is not set", () => {
    let { container } = render( <DXStraightCard title={StraightCardArgs.title} /> );
    const tags = container.querySelector( '[data-testid="StCard-tags"]' );
    expect( tags ).toBeNull();
} );

//Date tests
test( "If the date renders as expected", () => {
    render( <DXStraightCard {...StraightCardArgs} /> );
    expect( screen.getByTestId( "StCard-date" ) ).toHaveTextContent( "01 February, 2022" );
} );

test( "If the component uses the default date format", () => {
    render( <DXStraightCard title={StraightCardArgs.title} date="01/02/2022" /> );
    expect( screen.getByTestId( "StCard-date" ) ).toHaveTextContent( "02 January, 2022" );
} );

test( "If the date section does not exist", () => {
    let { container } = render( <DXStraightCard title={StraightCardArgs.title} /> );
    const date = container.querySelector( '[data-testid="StCard-date"]' );
    expect( date ).toBeNull();
} );

test( "If title label renders matches text value", () => {
    render( <DXStraightCard {...StraightCardArgs} /> );
    expect( screen.getByTestId( "StCard-title" ) ).toHaveTextContent( StraightCardArgs.title.label );
} );

test( "If title link has the url value", () => {
    render( <DXStraightCard {...StraightCardArgs} /> );
    expect( screen.getByTestId( "StCard-title" ) ).toHaveAttribute( "href", StraightCardArgs.title.url );
} );

test( "If subtitle renders text", () => {
    render( <DXStraightCard {...StraightCardArgs} /> );
    expect( screen.getByTestId( "StCard-subtitle" ) ).toHaveTextContent( StraightCardArgs.subtitle! );
} );

test( "If tags section don't render if value is not set", () => {
    let { container } = render( <DXStraightCard title={StraightCardArgs.title} /> );
    const subtitle = container.querySelector( '[data-testid="StCard-subtitle"]' );
    expect( subtitle ).toBeNull();
} );

test( "If link element if showLink flag is set", () => {
    render( <DXStraightCard {...StraightCardArgs} /> );
    expect( screen.getByTestId( "StCard-link" ) ).toHaveTextContent( StraightCardArgs.title.url );
} );

test( "If link doesn't render on showLink flag disabled", () => {
    let { container } = render( <DXStraightCard title={StraightCardArgs.title} /> );
    const linkText = container.querySelector( '[data-testid="StCard-link"]' );
    expect( linkText ).toBeNull();
} );

test( "If chevron element if showLink flag is set", () => {
    render( <DXStraightCard {...StraightCardArgs} /> );
    expect( screen.getByTestId( "StCard-chevron" ) ).toBeInTheDocument();
} );

test( "If chevron doesn't render on showLink flag disabled", () => {
    let { container } = render( <DXStraightCard title={StraightCardArgs.title} /> );
    const element = container.querySelector( '[data-testid="StCard-link"]' );
    expect( element ).toBeNull();
} );

test( "If icons change when props are set", () => {
    let icons = {
        breadcrumb: "ci-Chevron_Right_Duo",
        link: "ci-Arrow_Right_MD"
    }
    render( <DXStraightCard  {...StraightCardArgs} icons={icons}/>);
    expect.assertions(2);
    expect( screen.getByTestId("StCard-chevron").querySelector("i") ).toHaveClass( icons.link );
    expect( screen.getAllByTestId("StCard-breadIcon")[0] ).toHaveClass( icons.breadcrumb );
} );

itSupportsExtensionProps( ( extra ) => <DXStraightCard {...StraightCardArgs} {...extra} /> );

test( "extra props: unknown props do not reach the DOM", () => {
    const props = { ...StraightCardArgs, unknownProp: "x", "data-extra": "yes" } as React.ComponentProps<typeof DXStraightCard>;
    const { container } = render( <DXStraightCard {...props} /> );
    const root = container.firstElementChild as HTMLElement;
    expect( root ).toHaveAttribute( "data-extra", "yes" );
    expect( root ).not.toHaveAttribute( "unknownprop" );
} );
