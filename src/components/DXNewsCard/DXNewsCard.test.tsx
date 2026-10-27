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
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import DXNewsCard, { NewsCardProps } from "./DXNewsCard";
import { FullExampleArgs, NoImageArgs } from "./DXNewsCard.stories";

const minifiedArgs: NewsCardProps = {
    link: {
        label: "My news",
        url: "www.hcl-software.com"
    },
    date: "01/02/2023",
};

test( "If the component render a News Item correctly: TITLE text", () => {
    render( <DXNewsCard {...minifiedArgs} /> );
    const titleContainer = screen.getByTestId( "newsCardItem" ).querySelector( ".dxNewsCard__newsTitle" );
    expect( titleContainer ).toHaveTextContent( minifiedArgs.link.label );
} );

test( "If the component render a News Item correctly: TITLE URL", () => {
    render( <DXNewsCard {...minifiedArgs} /> );
    const titleContainer = screen.getByTestId( "newsCardItem" ).querySelector( ".dxNewsCard__newsTitle" ) || new HTMLElement;
    expect( titleContainer?.querySelector( "a" ) ).toHaveAttribute( "href", minifiedArgs.link.url );
} );

test( "If the component render a News Item correctly: TITLE Target", () => {
    render( <DXNewsCard {...FullExampleArgs} /> );
    const titleContainer = screen.getByTestId( "newsCardItem" ).querySelector( ".dxNewsCard__newsTitle" ) || new HTMLElement;
    expect( titleContainer?.querySelector( "a" ) ).toHaveAttribute( "target", minifiedArgs.link.target );
} );

test( "If the component render a News Item correctly: Date with no date format given", () => {
    render( <DXNewsCard {...minifiedArgs} /> );
    const titleContainer = screen.getByTestId( "newsCardItem" ).querySelector( ".dxNewsCard__newsDate" ) || new HTMLElement;
    expect( titleContainer ).toHaveTextContent( "January 02, 2023" );
} );

test( "If the component render a News Item correctly: Date with no date format given", () => {
    render( <DXNewsCard {...FullExampleArgs} /> );
    const titleContainer = screen.getByTestId( "newsCardItem" ).querySelector( ".dxNewsCard__newsDate" ) || new HTMLElement;
    expect( titleContainer ).toHaveTextContent( "February 01, 2023" );
} );

test( "If a News Item Image URL matches the image url given", () => {
    render( <DXNewsCard {...FullExampleArgs} /> );
    const titleContainer = screen.getByTestId( "newsCardItem" ).querySelector( ".dxNewsCard__thumbnail" ) || new HTMLElement;
    expect( titleContainer ).toHaveAttribute( "src", FullExampleArgs.image?.url );
} );

test( "If a News Item Image URL matches the image alt text given", () => {
    render( <DXNewsCard {...FullExampleArgs} /> );
    const titleContainer = screen.getByTestId( "newsCardItem" ).querySelector( ".dxNewsCard__thumbnail" ) || new HTMLElement;
    expect( titleContainer ).toHaveAttribute( "alt", FullExampleArgs.image?.altText );
} );

test( "If a News Item has no image, the component doesn't render a <img> tag", () => {
    render( <DXNewsCard {...NoImageArgs} /> );
    const imageContainer = screen.getByTestId( "newsCardItem" ).querySelector( ".dxNewsCard__thumbnail" );
    expect( imageContainer ).toBeNull();
} );

test( "If image position class is set: Top", () => {
    render( <DXNewsCard layout="top" {...FullExampleArgs} /> );
    const element = screen.getByTestId( "newsCard__imageContainer" );
    expect( element ).toHaveClass( "dxNewsCard__thumbnail--top" );
} );

test( "If image position class is set: Left", () => {
    render( <DXNewsCard layout="left" {...FullExampleArgs} /> );
    const element = screen.getByTestId( "newsCard__imageContainer" );
    expect( element ).toHaveClass( "dxNewsCard__thumbnail--left" );
} );

test( "If image position default class is set when no value is given", () => {
    render( <DXNewsCard {...FullExampleArgs} /> );
    const element = screen.getByTestId( "newsCard__imageContainer" );
    expect( element ).toHaveClass( "dxNewsCard__thumbnail--left" );
} );

test( "If Content Type label has Default position", () => {
    render( <DXNewsCard {...minifiedArgs} contentType="Content" /> );
    const element = screen.getByTestId( "newsCard__contentType" );
    expect( element ).toHaveClass( "dxNewsCard__contentType--split" );
} );

test( "If Content Type label has Attached Style if given as parameter", () => {
    render( <DXNewsCard {...minifiedArgs} contentType="Content" contentPosition="connected" /> );
    const element = screen.getByTestId( "newsCard__contentType" );
    expect( element ).toHaveClass( "dxNewsCard__contentType--connected" );
} );


test( "If Content Type label has Dettached Style if given as parameter", () => {
    render( <DXNewsCard {...minifiedArgs} contentType="Content" contentPosition="split" /> );
    const element = screen.getByTestId( "newsCard__contentType" );
    expect( element ).toHaveClass( "dxNewsCard__contentType--split" );
} );

// Tests for the loader
test( "When the image is rendering, the element 'loader__container' should not have the class 'd-none'", () => {
    const { container } = render( <DXNewsCard {...FullExampleArgs} /> );
    let loaderContainer = container.querySelector( ".loader__container" );
    expect( loaderContainer ).not.toHaveClass( "d-none" );
} );

test( "When the image finish its rendering, the element 'loader__container' should have the class 'd-none'", () => {
    const { container } = render( <DXNewsCard {...FullExampleArgs} /> );
    let cover = container.querySelector( ".dxNewsCard__thumbnail" ) as HTMLElement;
    fireEvent.load( cover );
    let loaderContainer = container.querySelector( ".loader__container" );
    expect( loaderContainer ).toHaveClass( "d-none" );
} );
