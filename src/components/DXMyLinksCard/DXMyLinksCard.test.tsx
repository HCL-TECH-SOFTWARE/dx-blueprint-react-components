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
import userEvent from "@testing-library/user-event";
import { render, act } from "@testing-library/react";
import DXMyLinksCard from "./DXMyLinksCard";
import { LinksCardAllButtonsArgs, LinksCardChangedIconsArgs, LinksCardCompleteArgs, LinksCardLinkArgs, LinksCardLinkWithButtonArgs } from "./DXMyLinksCard.stories";

//Label
test( "If component renders link with noButtons mode", () => {
    const { container } = render( <DXMyLinksCard {...LinksCardLinkArgs} /> );
    expect( container.querySelector( '[data-testid="linkCard-main-link-noButton"]' ) ).toBeInTheDocument();
} );

test( "If component renders link with Button mode", () => {
    const { container } = render( <DXMyLinksCard {...LinksCardLinkWithButtonArgs} /> );
    expect( container.querySelector( '[data-testid="linkCard-main-link-button"]' ) ).toBeInTheDocument();
} );

test( "If component renders text on String label param", () => {
    const { container } = render( <DXMyLinksCard label={"My card"} /> );
    expect( container.querySelector( '[data-testid="linkCard-main-text"]' ) ).toHaveTextContent( "My card" );
} );

// Icon
test( "If component doesn't render the icon if not value is set", () => {
    const { container } = render( <DXMyLinksCard label={"My card"} /> );
    expect( container.querySelector( '[data-testid="linkCard-icon"]' ) ).toBeNull();
} );

test( "If component the given class icon", () => {
    const { container } = render( <DXMyLinksCard {...LinksCardLinkArgs} /> );
    expect( container.querySelector( '[data-testid="linkCard-icon"]' ) ).toHaveClass( LinksCardLinkArgs.icons?.card! );
} );

// Up button
test( "If UP button doesn't render if params are note set", () => {
    const { container } = render( <DXMyLinksCard label={"My card"} /> );
    let button = container.querySelector( '[data-testid="linkCard-upButton"]' );

    expect( button ).toBeNull();
} );

test( "If up button renders gets called on click", () => {
    const { container } = render( <DXMyLinksCard {...LinksCardAllButtonsArgs} /> );
    let button = container.querySelector( '[data-testid="linkCard-upButton"]' );

    expect( button ).toBeInTheDocument();
} );

test( "If up button function gets called on click", async () => {
    let mock = jest.fn();
    const { container } = render( <DXMyLinksCard label={"Label"} upButton={{ label: "up", onClick: mock }} /> );
    let button = container.querySelector( '[data-testid="linkCard-upButton"]' ) as HTMLElement;

    await userEvent.click( button );

    expect( mock ).toBeCalled();
} );

//Down button
test( "If DOWN button doesn't render if params are note set", () => {
    const { container } = render( <DXMyLinksCard label={"My card"} /> );
    let button = container.querySelector( '[data-testid="linkCard-downButton"]' );

    expect( button ).toBeNull();
} );

test( "If DOWN button renders gets called on click", () => {
    const { container } = render( <DXMyLinksCard {...LinksCardAllButtonsArgs} /> );
    let button = container.querySelector( '[data-testid="linkCard-downButton"]' );

    expect( button ).toBeInTheDocument();
} );

test( "If DOWN button function gets called on click", async () => {
    let mock = jest.fn();
    const { container } = render( <DXMyLinksCard label={"Label"} downButton={{ label: "down", onClick: mock }} /> );
    let button = container.querySelector( '[data-testid="linkCard-downButton"]' ) as HTMLElement;

    await userEvent.click( button );

    expect( mock ).toBeCalled();
} );

test( "If icons change when user sets the icons property", () => {
    expect.assertions( 3 );
    const { container } = render( <DXMyLinksCard {...LinksCardChangedIconsArgs} /> );
    expect( container.querySelector( '[data-testid="linkCard-upButton"] i' ) ).toHaveClass( LinksCardChangedIconsArgs.icons.up );
    expect( container.querySelector( '[data-testid="linkCard-downButton"] i' ) ).toHaveClass( LinksCardChangedIconsArgs.icons.down );
    expect( container.querySelector( '[data-testid="linkCard-menuButton"] i' ) ).toHaveClass( LinksCardChangedIconsArgs.icons.menu );
} );

// subLabel / Links Card Complete
test( "If component renders subLabel as a stacked title and subtitle when provided", () => {
    const { container } = render( <DXMyLinksCard {...LinksCardCompleteArgs} /> );
    const title = container.querySelector( '[data-testid="linkCard-main-link-button"] .dxMyLinksCard__labelTitle' );
    const subtitle = container.querySelector( '[data-testid="linkCard-main-link-button"] .dxMyLinksCard__labelSubtitle' );

    expect( title ).toHaveTextContent( ( LinksCardCompleteArgs.label as { label: string } ).label );
    expect( subtitle ).toHaveTextContent( LinksCardCompleteArgs.subLabel! );
} );

test( "If component keeps the plain single-line label markup when subLabel is not provided", () => {
    const { container } = render( <DXMyLinksCard {...LinksCardLinkArgs} /> );

    expect( container.querySelector( '.dxMyLinksCard__labelTitle' ) ).toBeNull();
    expect( container.querySelector( '.dxMyLinksCard__labelSubtitle' ) ).toBeNull();
    expect( container.querySelector( '.dxMyLinksCard__label > span' ) ).toHaveTextContent( ( LinksCardLinkArgs.label as { label: string } ).label );
} );

test( "If Links Card Complete renders the icon, both chevrons and the kebab together", () => {
    const { container } = render( <DXMyLinksCard {...LinksCardCompleteArgs} /> );

    expect( container.querySelector( '[data-testid="linkCard-icon"]' ) ).toBeInTheDocument();
    expect( container.querySelector( '[data-testid="linkCard-upButton"]' ) ).toBeInTheDocument();
    expect( container.querySelector( '[data-testid="linkCard-downButton"]' ) ).toBeInTheDocument();
    expect( container.querySelector( '[data-testid="linkCard-menuButton"]' ) ).toBeInTheDocument();
} );

// Dropdown menu
test( "If the portaled dropdown menu carries the dxMyLinksCard__dropdownMenu class when open", () => {
    render( <DXMyLinksCard {...LinksCardLinkWithButtonArgs} dropdownOpen /> );

    // The menu is portaled into document.body via PortalDropdownMenu, so it
    // must be queried there rather than in the RTL container.
    expect( document.body.querySelector( '.dxMyLinksCard__dropdownMenu.dropdown-menu' ) ).toBeInTheDocument();
} );

test( "If clicking the kebab toggle invokes the Dropdown's onToggle handler without throwing", async () => {
    const { container } = render( <DXMyLinksCard {...LinksCardLinkWithButtonArgs} /> );
    let toggle = container.querySelector( '[data-testid="linkCard-menuButton"]' ) as HTMLElement;

    // The Dropdown is fully controlled via the `show`/`dropdownOpen` prop, so
    // this click does not open the menu — it only exercises the no-op
    // `onToggle={() => {}}` handler react-bootstrap invokes on toggle
    // interaction, which is otherwise unreachable from any other test here.
    await userEvent.click( toggle );

    expect( toggle ).toBeInTheDocument();
} );

itSupportsExtensionProps( ( extra ) => <DXMyLinksCard {...LinksCardLinkArgs} {...extra} /> );

describe( "DXMyLinksCard dropdown with consumer extension props", () => {
    test( "the portaled menu opens and its items work while ref, className and attributes stay on the card root", async () => {
        const ref = React.createRef<HTMLDivElement>();
        const { container } = render( <DXMyLinksCard {...LinksCardLinkWithButtonArgs} dropdownOpen ref={ref} className="bp-consumer" data-consumer="yes" /> );
        // Let the dropdown's positioning (Popper) finish its async update inside act
        await act( async () => {} );
        const root = container.firstElementChild as HTMLElement;
        const menu = document.body.querySelector( ".dxMyLinksCard__dropdownMenu.dropdown-menu" ) as HTMLElement;
        expect( ref.current ).toBe( root );
        expect( root ).toHaveClass( "dxMyLinksCard", "bp-consumer" );
        expect( menu ).toBeInTheDocument();
        expect( menu ).toHaveClass( "show" );
        expect( root.contains( menu ) ).toBe( false );
        expect( menu ).not.toHaveClass( "bp-consumer" );
        expect( menu ).not.toHaveAttribute( "data-consumer" );
        expect( menu.querySelectorAll( ".dxMyLinksCard__dropdownItem" ).length ).toBe( LinksCardLinkWithButtonArgs.dropdown?.length );
    } );

    test( "the menu is hidden when dropdownOpen is false, with consumer extension props", () => {
        const ref = React.createRef<HTMLDivElement>();
        render( <DXMyLinksCard {...LinksCardLinkWithButtonArgs} dropdownOpen={false} ref={ref} className="bp-consumer" /> );
        expect( document.body.querySelector( ".dxMyLinksCard__dropdownMenu.show" ) ).toBeNull();
        expect( ref.current ).toHaveClass( "dxMyLinksCard" );
    } );
} );
