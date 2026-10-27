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
import { render } from "@testing-library/react";
import DXAd from "./DXAd";

let img = {
    url: "https://images.unsplash.com/photo-1661705969607-cde73828023d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
    altText: "image-1"
};

test( "If the alt text 'image-1' is passed, then it should have that value on the alt attribute on the image", () => {
    const adProps = {
        img
    };
    const { container } = render( <DXAd {...adProps} /> );
    const adImg = container.querySelector( ".dxAd" )?.childNodes[0] as HTMLElement;
    const altText = adImg?.getAttribute( 'aria-label' );
    expect( altText ).toEqual( img.altText );
} );

test( "If no image passed, then the style will have a blank url", () => {
    const adProps = {
        text: "Explore it"
    };
    const { container } = render( <DXAd {...adProps} /> );
    const adImg = container.querySelector( ".dxAd" )?.childNodes[0] as HTMLElement;
    expect( adImg ).toHaveStyle( {
        //@ts-ignore: Testing purposes
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${adProps.img && adProps.img?.url ? adProps.img.url : ""}')`
    } );
} );

test( "If an icon is passed, then it should be in the document", () => {
    const adProps = {
        text: "Explore it",
        icon: "ci-Map"
    };
    const { container } = render( <DXAd {...adProps} /> );
    const icon = container.querySelector( '[data-testid="ad-details"]' )?.childNodes[0];
    expect( icon ).toBeInTheDocument();
} );

test( "If the icon 'ci-Map' is passed, then the icon in the document should have that class", () => {
    const adProps = {
        text: "Explore it",
        icon: "ci-Map"
    };
    const { container } = render( <DXAd {...adProps} /> );
    const icon = container.querySelector( '[data-testid="ad-details"]' )?.childNodes[0] as HTMLElement;
    expect( icon?.classList.contains( "ci-Map" ) ).toBeTruthy();
} );

test( "If a text is passed, then it should be in the document", () => {
    const adProps = {
        text: "Explore it",
        icon: "ci-Map"
    };
    const { container } = render( <DXAd {...adProps} /> );
    const text = container.querySelector( '[data-testid="ad-details"]' )?.childNodes[1];
    expect( text ).toBeInTheDocument();
} );

test( "If the text 'Explore it' is passed, then it should be in the document", () => {
    const adProps = {
        text: "Explore it",
        icon: "ci-Map"
    };
    const { container } = render( <DXAd {...adProps} /> );
    const text = container.querySelector( '[data-testid="ad-details"]' )?.childNodes[1];
    expect( text?.textContent ).toEqual( adProps.text );
} );

test( "If an icon and the text is passed, then the class 'dxAd__withIcon' should be added", () => {
    const adProps = {
        text: "Explore it",
        icon: "ci-Map"
    };
    const { getByTestId } = render( <DXAd {...adProps} /> );
    const details = getByTestId( "ad-details" );
    expect( details.classList.contains( "dxAd__withIcon" ) ).toBeTruthy();
} );

test( "If just the icon passed, then the class 'dxAd__justIcon' should be added", () => {
    const adProps = {
        icon: "ci-Map"
    };
    const { getByTestId } = render( <DXAd {...adProps} /> );
    const details = getByTestId( "ad-details" );
    expect( details.classList.contains( "dxAd__justIcon" ) ).toBeTruthy();
} );

test( "If the background color '#82d87f' passed, the add should have it", () => {
    const adProps = {
        icon: "ci-Map",
        backgroundColor: "#82d87f"
    };
    const { container } = render( <DXAd {...adProps} /> );
    const background = container.querySelector( ".dxAd" )?.childNodes[0];
    expect( background ).toHaveStyle( {
        "background-color": "#82d87f",
    } );
} )

