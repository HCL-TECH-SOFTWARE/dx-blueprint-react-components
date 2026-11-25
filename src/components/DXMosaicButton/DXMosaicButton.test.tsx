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
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MosaicButton, { MosaicButtonProps } from "./DXMosaicButton";
import { LargeButtonArgs, MediumButtonArgs, SmallButtonArgs } from "./DXMosaicButton.stories";

// Testing small mosaic title has no subtitle
test( "small mosaic title has prop value and no subtitle", () => {
    let props: MosaicButtonProps = JSON.parse( JSON.stringify( SmallButtonArgs ) );
    props.title = "Custom title value";
    render( <MosaicButton {...props} /> );
    let label = screen.getByTestId( "mb-sm-title" );
    expect( label ).toHaveTextContent( props.title );

    let textContainer = screen.getByTestId( "mb-textContainer" );
    expect( textContainer.childElementCount ).toBe( 1 );
} );

// Testing medium mosaic title and subtitle classes
test( "medium mosaic title has values set via prop", () => {
    let props: MosaicButtonProps = JSON.parse( JSON.stringify( MediumButtonArgs ) );
    props.title = "Custom title value";
    props.subtitle = "Custom subtitle value";
    render( <MosaicButton {...props} /> );
    let titleLabel = screen.getByTestId( "mb-md-title" );
    let subtitleLabel = screen.getByTestId( "mb-md-subtitle" );
    expect( titleLabel ).toHaveTextContent( props.title );
    expect( subtitleLabel ).toHaveTextContent( props.subtitle );
} );

// Testing big mosaic title and subtitle classes
test( "large mosaic title has values set via prop", () => {
    let props: MosaicButtonProps = JSON.parse( JSON.stringify( LargeButtonArgs ) );
    props.title = "Custom title value";
    props.subtitle = "Custom subtitle value";
    render( <MosaicButton {...props} /> );
    let titleLabel = screen.getByTestId( "mb-lg-title" );
    let subtitleLabel = screen.getByTestId( "mb-lg-subtitle" );
    expect( titleLabel ).toHaveTextContent( props.title );
    expect( subtitleLabel ).toHaveTextContent( props.subtitle );
} );

//test image title property
test( "title for image is displayed correctly", () => {
    let props: MosaicButtonProps = JSON.parse( JSON.stringify( LargeButtonArgs ) );
    let image = {
        url: "urlTest",
        altText: "test",
    };
    props.image = image;
    render( <MosaicButton {...props} /> );
    let imageDiv = screen.getByTestId( "mb-image" );
    expect( imageDiv ).toHaveAttribute( "title", props.image.altText );
    expect( imageDiv ).toHaveStyle( `background-image: linear-gradient(16.81deg, rgba(0, 0, 0, 0.5) 9.02%, rgba(0, 0, 0, 0.5) 42.36%)` );
} );

//test image default title property
test( "default title for image is displayed correctly", () => {
    let props: MosaicButtonProps = JSON.parse( JSON.stringify( LargeButtonArgs ) );
    let image = {
        url: "urlTest",
    };
    props.image = image;
    render( <MosaicButton {...props} /> );
    let imageDiv = screen.getByTestId( "mb-image" );
    expect( imageDiv ).toHaveAttribute( "title", "mosaic-button-" + LargeButtonArgs.index );
} );

//test image background default property
test( "default background color is displayed correctly", () => {
    let props: MosaicButtonProps = JSON.parse( JSON.stringify( LargeButtonArgs ) );
    delete props.image;
    render( <MosaicButton {...props} /> );
    let imageDiv = screen.getByTestId( "mb-image" );
    expect( imageDiv ).toHaveStyle( "background-image: none" );
} );

// test default size being md
test( "size is md when there is an invalid size prop", () => {
    let props: MosaicButtonProps = JSON.parse( JSON.stringify( LargeButtonArgs ) );
    //@ts-ignore: Ignoring TS error since condition is needed for testing
    props.size = "invalid";
    render( <MosaicButton {...props} /> );
    let mosaicTextContainer = screen.getByTestId( "mb-textContainer" );
    expect( mosaicTextContainer.firstChild ).toHaveClass( "dxMosaicButton__textSubtitle--md" );
} );

// test default size being md
test( "size is default md when there is an invalid size prop", () => {
    let props: MosaicButtonProps = JSON.parse( JSON.stringify( LargeButtonArgs ) );
    //@ts-ignore: Ignoring TS error since condition is needed for testing
    props.size = "invalid";
    render( <MosaicButton {...props} /> );
    let mosaicTextContainer = screen.getByTestId( "mb-textContainer" );
    expect( mosaicTextContainer.firstChild ).toHaveClass( "dxMosaicButton__textSubtitle--md" );
    expect( mosaicTextContainer ).toHaveAttribute( "style", "margin: 0px 20px 20px 20px;" );
} );

itSupportsExtensionProps( ( extra ) => <MosaicButton {...LargeButtonArgs} {...extra} /> );
