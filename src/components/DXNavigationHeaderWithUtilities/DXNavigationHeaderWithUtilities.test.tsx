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
import React, { FormEventHandler } from "react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { ThirdLevelNavigation, NavigationArgs } from "./DXNavigationHeaderWithUtilities.stories";
import DXNavigationHeader from "./DXNavigationHeaderWithUtilities";
import { NavigationItem } from "../DXMegaMenu/DXMegaMenu";

// Header navigation image tests
test( "branding element renders expected source", () => {
    render( <ThirdLevelNavigation {...NavigationArgs} /> );

    expect( screen.getByTestId( 'navigation-image' ) ).toHaveAttribute( 'src', NavigationArgs.navigationImage.imageUrl );
} );

test( "branding element contains expected alt text", () => {
    render( <ThirdLevelNavigation {...NavigationArgs} /> );

    expect( screen.getByTestId( 'navigation-image' ) ).toHaveAttribute( 'alt' );
} );

test( "branding element contains expected width prop", () => {
    render( <ThirdLevelNavigation {...NavigationArgs} /> );

    expect( screen.getByTestId( 'navigation-image' ) ).toHaveAttribute( 'width' );
} );

test( "branding element contains expected height prop", () => {
    render( <ThirdLevelNavigation {...NavigationArgs} /> );

    expect( screen.getByTestId( 'navigation-image' ) ).toHaveAttribute( 'height' );

} );

// Header navigation search tests
test( "search button calls searchSubmit function", async () => {
    let onSubmit: ( searchValue: string ) => void = ( value ) => {};
    let mock = jest.fn( onSubmit );
    const navigationItem: NavigationItem = { index: 0, title: 'Item 1' };

    render( <DXNavigationHeader navigationItems={[navigationItem]} navigationImage={{ imageUrl: "" }} utilities={{ searchSubmit: mock }} /> );
    await userEvent.click( screen.getByTestId( 'utilities-search' ) );
    await userEvent.click( screen.getByTestId( 'search-button' ) );
    expect( mock ).toHaveBeenCalled();
} );

test( "search input to contain placeholder attribute", () => {
    render( <DXNavigationHeader {...NavigationArgs} /> );
    expect( screen.getByRole( 'textbox' ) ).toHaveAttribute( 'placeholder' );
} );

test( "search input to contain given place holder", () => {
    render( <DXNavigationHeader {...NavigationArgs} /> );
    expect( screen.getByRole( 'textbox' ).getAttribute( 'placeholder' ) ).toEqual( NavigationArgs.utilities?.searchPlaceholder );
} );

test( "search utilities button open searchbar", async () => {
    let onSubmit: ( searchValue: string ) => void = ( value ) => {};
    let mock = jest.fn( onSubmit );
    const navigationItem: NavigationItem = { index: 0, title: 'Item 1' };

    render( <DXNavigationHeader navigationItems={[navigationItem]} navigationImage={{ imageUrl: "" }} utilities={{ searchSubmit: mock }} /> );
    await userEvent.click( screen.getByTestId( 'utilities-search' ) );

    expect( screen.getByTestId( "dxNavUtils-searchbar" ) ).toHaveClass( "--state--active" );
} );

test( "search utilities close active serchbar", async () => {
    let onSubmit: ( searchValue: string ) => void = ( value ) => {};
    let mock = jest.fn( onSubmit );
    const navigationItem: NavigationItem = { index: 0, title: 'Item 1' };

    render( <DXNavigationHeader navigationItems={[navigationItem]} navigationImage={{ imageUrl: "" }} utilities={{ searchSubmit: mock }} /> );
    await userEvent.click( screen.getByTestId( 'utilities-search' ) );
    await userEvent.click( screen.getByTestId( 'search-close' ) );

    expect( screen.getByTestId( "dxNavUtils-searchbar" ) ).not.toHaveClass( "--state--active" );
} );

test( "search input value change on keyboard input", async () => {
    let onSubmit: ( searchValue: string ) => void = ( value ) => {};
    let mock = jest.fn( onSubmit );
    const navigationItem: NavigationItem = { index: 0, title: 'Item 1' };

    render( <DXNavigationHeader navigationItems={[navigationItem]} navigationImage={{ imageUrl: "" }} utilities={{ searchSubmit: mock }} /> );
    await userEvent.click( screen.getByTestId( 'utilities-search' ) );
    screen.getByTestId( "dxNavUtils-searchbar__input" ).focus();
    await userEvent.keyboard( "test" );

    expect( screen.getByTestId( "dxNavUtils-searchbar__input" ) ).toHaveValue( "test" );
} );


//Hader navigation Utilities button
test( "Utilites button not in the document when not defined on utilities props", () => {
    const navigationItem: NavigationItem = { index: 0, title: 'Item 1' };
    const { container } = render( <DXNavigationHeader
        navigationItems={[navigationItem]}
        navigationImage={{ imageUrl: "" }}
        utilities={{
            searchSubmit: ( x ) => {},
        }} /> );
    let utilBtn = container.querySelector( '[data-testid="utilities-button"]' );
    expect( utilBtn ).not.toBeInTheDocument();
} );

test( "Utilites button shows when defined on utilities props", () => {
    const navigationItem: NavigationItem = { index: 0, title: 'Item 1' };
    render( <DXNavigationHeader
        navigationItems={[navigationItem]}
        navigationImage={{ imageUrl: "" }}
        utilities={{
            searchSubmit: ( x ) => {},
            buttonText: "Click me!"
        }} /> );

    expect( screen.getByTestId( "utilities-button" ) ).not.toHaveAttribute( "hidden" );
} );

test( "Check utilities button submit function", async () => {
    const navigationItem: NavigationItem = { index: 0, title: 'Item 1' };
    let onSubmit: FormEventHandler = ( e ) => { e.preventDefault(); };
    let mock = jest.fn( onSubmit );

    render( <DXNavigationHeader
        navigationItems={[navigationItem]}
        navigationImage={{ imageUrl: "" }}
        utilities={{
            searchSubmit: ( x ) => {},
            buttonText: "Click me!",
            buttonSubmit: mock
        }} /> );

    await userEvent.click( screen.getByTestId( 'utilities-button' ) );
    expect( mock ).toHaveBeenCalled();
} );

//Header utilities icon
test( "Utilites icon not in the document when not defined on utilities props", () => {
    const navigationItem: NavigationItem = { index: 0, title: 'Item 1' };
    const { container } = render( <DXNavigationHeader
        navigationItems={[navigationItem]}
        navigationImage={{ imageUrl: "" }}
        utilities={{
            searchSubmit: ( x ) => {},
        }} /> );
    let iconBtn = container.querySelector( '[data-testid="utilities-icon"]' );
    expect( iconBtn ).not.toBeInTheDocument();
} );

test( "Utilites icon not in the document when is not defined on the utilities props", () => {
    const navigationItem: NavigationItem = { index: 0, title: 'Item 1' };
    let onSubmit: FormEventHandler = ( e ) => { e.preventDefault(); };
    let mock = jest.fn( onSubmit );
    const { container } = render( <DXNavigationHeader
        navigationItems={[navigationItem]}
        navigationImage={{ imageUrl: "" }}
        utilities={{
            searchSubmit: ( x ) => {},
            iconSubmit: onSubmit,
        }} /> );
    let iconBtn = container.querySelector( '[data-testid="utilities-button"]' );
    expect( iconBtn ).not.toBeInTheDocument();
} );

test( "Check utilities icon submit function", async () => {
    const navigationItem: NavigationItem = { index: 0, title: 'Item 1' };
    let onSubmit: FormEventHandler = ( e ) => { e.preventDefault(); };
    let mock = jest.fn( onSubmit );

    render( <DXNavigationHeader
        navigationItems={[navigationItem]}
        navigationImage={{ imageUrl: "" }}
        utilities={{
            searchSubmit: ( x ) => {},
            iconSubmit: mock
        }} /> );

    await userEvent.click( screen.getByTestId( 'utilities-icon' ) );
    expect( mock ).toHaveBeenCalled();
} );

test( "Utilites icon changes on giving iconName prop", () => {
    const navigationItem: NavigationItem = { index: 0, title: 'Item 1' };
    let onSubmit: FormEventHandler = ( e ) => { e.preventDefault(); };
    let mock = jest.fn( onSubmit );
    render( <DXNavigationHeader
        navigationItems={[navigationItem]}
        navigationImage={{ imageUrl: "" }}
        utilities={{
            searchSubmit: ( x ) => {},
            iconSubmit: onSubmit,
            iconName: "ci-Info",
        }} /> );

    expect( screen.getByTestId( "utilities-icon" ).firstChild ).toHaveClass( "ci-Info" );
} );
