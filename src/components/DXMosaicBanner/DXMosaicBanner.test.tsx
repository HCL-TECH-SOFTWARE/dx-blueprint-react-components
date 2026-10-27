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
import { BannerArgs } from "./DXMosaicBanner.stories";
import MosaicBanner, { MosaicBannerProps } from "./DXMosaicBanner";

// testing only 3 small items in props
test( "There are only 3 small items", () => {
    let props: MosaicBannerProps = JSON.parse( JSON.stringify( BannerArgs ) );
    props.items.pop();
    render( <MosaicBanner {...props} /> );
    let smallContainer = screen.getByTestId( "mb-smallContainer" );
    expect( smallContainer.childElementCount ).toBe( 3 );
} );

// testing no small items in props, md mosaic goes 6 columns
test( "Medium mosaic goes full width when no small items", () => {
    let props: MosaicBannerProps = JSON.parse( JSON.stringify( BannerArgs ) );
    props.items = props.items.slice( 0, 2 );
    render( <MosaicBanner {...props} /> );
    let mediumContainer = screen.getByTestId( "mb-mediumContainer" );
    expect( mediumContainer ).toHaveClass( "col-lg-6" );
} );

// testing no medium item in props
test( "Large mosaic goes full width when there no other items", () => {
    let props: MosaicBannerProps = JSON.parse( JSON.stringify( BannerArgs ) );
    props.items = props.items.slice( 0, 1 );
    render( <MosaicBanner {...props} /> );
    let largeContainer = screen.getByTestId( "mb-largeContainer" );
    expect( largeContainer ).toHaveClass( "col-lg-12" );
} );

// testing single small item in props
test( "Small mosaic goes full width when there no other items", () => {
    let props: MosaicBannerProps = JSON.parse( JSON.stringify( BannerArgs ) );
    props.items = props.items.slice( 0, 3 );
    render( <MosaicBanner {...props} /> );
    let smallContainer = screen.getByTestId( "mb-smallContainer" );
    expect( smallContainer ).toHaveClass( "dxMosaicBanner__containerSmall--single" );
} );

test( "Banner only renders 6 buttons, even if items sent are more", () => {
    let props: MosaicBannerProps = JSON.parse( JSON.stringify( BannerArgs ) );
    props.items = [...props.items, ...props.items];
    render( <MosaicBanner {...props} /> );
    let mosaicButtons = document.querySelectorAll( ".dxMosaicButton" );
    expect( mosaicButtons.length ).toBe( 6 );
} );

test( "Banner buttons containers have the expected sizes in desktop layout", () => {
    let props: MosaicBannerProps = JSON.parse( JSON.stringify( BannerArgs ) );
    props.items = [...props.items, ...props.items];
    render( <MosaicBanner {...props} /> );
    let largeContainer = screen.getByTestId( "mb-largeContainer" );
    let mediumContainer = screen.getByTestId( "mb-mediumContainer" );
    let smallContainer = screen.getByTestId( "mb-smallContainer" );
    expect( largeContainer ).toHaveClass( 'col-lg-6' );
    expect( mediumContainer ).toHaveClass( 'col-lg-3' );
    expect( smallContainer ).toHaveClass( 'col-lg-3' );
} );

test( "Banner buttons have the expected sizes in desktop layout", () => {
    let props: MosaicBannerProps = JSON.parse( JSON.stringify( BannerArgs ) );
    render( <MosaicBanner {...props} /> );
    let mosaicButtonsLg = document.querySelectorAll( ".dxMosaicButton--lg" );
    let mosaicButtonsMd = document.querySelectorAll( ".dxMosaicButton--md" );
    let mosaicButtonsSm = document.querySelectorAll( ".dxMosaicButton--sm" );

    expect( mosaicButtonsLg.length ).toBe( 1 );
    expect( mosaicButtonsMd.length ).toBe( 1 );
    expect( mosaicButtonsSm.length ).toBe( 4 );
} );

test( "Banner buttons have the expected sizes in tablet layout", () => {
    Object.defineProperty( window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 820
    } );
    window.dispatchEvent( new Event( 'resize' ) );

    let props: MosaicBannerProps = JSON.parse( JSON.stringify( BannerArgs ) );
    render( <MosaicBanner {...props} /> );

    let mosaicButtonsLg = document.querySelectorAll( ".dxMosaicButton--lg" );
    let mosaicButtonsMd = document.querySelectorAll( ".dxMosaicButton--md" );
    let mosaicButtonsSm = document.querySelectorAll( ".dxMosaicButton--sm" );

    expect( mosaicButtonsLg.length ).toBe( 2 );
    expect( mosaicButtonsMd.length ).toBe( 0 );
    expect( mosaicButtonsSm.length ).toBe( 4 );
} );

test( "Banner buttons have the expected sizes in tablet layout", () => {
    Object.defineProperty( window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
    } );
    window.dispatchEvent( new Event( 'resize' ) );

    let props: MosaicBannerProps = JSON.parse( JSON.stringify( BannerArgs ) );
    render( <MosaicBanner {...props} /> );

    let mosaicButtonsLg = document.querySelectorAll( ".dxMosaicButton--lg" );
    let mosaicButtonsMd = document.querySelectorAll( ".dxMosaicButton--md" );
    let mosaicButtonsSm = document.querySelectorAll( ".dxMosaicButton--sm" );

    expect( mosaicButtonsLg.length ).toBe( 0 );
    expect( mosaicButtonsMd.length ).toBe( 2 );
    expect( mosaicButtonsSm.length ).toBe( 4 );
} );


