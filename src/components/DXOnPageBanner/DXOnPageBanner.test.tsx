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

import { render, screen } from "@testing-library/react";
import { PageBannerArgs, BreadcrumbArgs, BreadcrumbStringArgs } from "./DXOnPageBanner.stories";
import DXOnPageBanner from "./DXOnPageBanner";

// Image tests
test( "Banner image applies correct img background", () => {
    render( <DXOnPageBanner {...PageBannerArgs} /> );
    expect( screen.getByTestId( 'banner-background' ) ).toHaveStyle( {
        backgroundImage: `radial-gradient(ellipse 80% 50% at bottom left, var(--dark-dark-d2), rgba(255, 255, 255, 0)), url("${PageBannerArgs.imageProps.image}")`
    } );
} );

test( "Default image height if no value given", () => {
    let props = PageBannerArgs;
    delete props.height;

    render( <DXOnPageBanner {...props} /> );
    expect( screen.getByTestId( 'banner-background' ) ).toHaveStyle( { 'height': 'auto' } );
} );

test( "Image height matches given value on props", () => {
    render( <DXOnPageBanner {...BreadcrumbArgs} /> );
    expect( screen.getByTestId( 'banner-background' ) ).toHaveStyle( { 'height': BreadcrumbArgs.height } );
} );

test( "Image gradient default value", async () => {
    render( <DXOnPageBanner {...PageBannerArgs} /> );
    expect( screen.getByTestId( 'banner-background' ) ).toHaveStyle( {
        backgroundImage: `radial-gradient(ellipse 80% 50% at bottom left, var(--dark-dark-d2), rgba(255, 255, 255, 0)), url("${PageBannerArgs.imageProps.image}")`
    } );
} );

test( "Image gradient matches gradientSize prop: large", async () => {
    render( <DXOnPageBanner {...BreadcrumbArgs} /> );

    expect( screen.getByTestId( 'banner-background' ) ).toHaveStyle( {
        backgroundImage: `radial-gradient(ellipse 100% 55% at bottom left, var(--dark-dark-d2), rgba(255, 255, 255, 0)), url("${BreadcrumbArgs.imageProps.image}")`
    } );
} );

test( "Image gradient matches gradientSize prop: small", async () => {
    let props =
    {
        imageProps: {
            image: "",
            gradientSize: "small"
        },
        title: "Title",
        subtitle: "01/01/2023",
        height: "300px"
    };
    render( <DXOnPageBanner {...props} /> );

    expect( screen.getByTestId( 'banner-background' ) ).toHaveStyle( {
        backgroundImage: `radial-gradient(ellipse 60% 45% at bottom left, var(--dark-dark-d2), rgba(255, 255, 255, 0)), url("${props.imageProps.image}")`
    } );
} );

test( "Image gradient matches gradientSize prop: medium", async () => {
    let props =
    {
        imageProps: {
            image: "",
            gradientSize: "medium"
        },
        title: "Title",
        subtitle: "01/01/2023",
        height: "300px"
    };
    render( <DXOnPageBanner {...props} /> );

    expect( screen.getByTestId( 'banner-background' ) ).toHaveStyle( {
        backgroundImage: `radial-gradient(ellipse 80% 50% at bottom left, var(--dark-dark-d2), rgba(255, 255, 255, 0)), url("${props.imageProps.image}")`
    } );
} );

//Body tests
test( "Banner title matches given prop", () => {
    render( <DXOnPageBanner {...PageBannerArgs} /> );
    expect( screen.getByTestId( 'banner-title' ) ).toHaveTextContent( PageBannerArgs.title );
} );

test( "Banner subtitle matches given prop", () => {
    render( <DXOnPageBanner {...PageBannerArgs} /> );
    expect( screen.getByTestId( 'banner-subtitle' ) ).toHaveTextContent( PageBannerArgs.subtitle );
} );

// Breadcrumb tests
test( "Banner will not render the breadcrumb if the props is not passed", () => {
    const { container } = render( <DXOnPageBanner {...PageBannerArgs} /> );
    let breadcrumb = container.querySelector( ".dxOnPageBanner__breadcrumb" );
    expect( breadcrumb ).toBeNull();
} );

test( "Banner will not render the breadcrumb if the props is passed", () => {
    const { container } = render( <DXOnPageBanner {...BreadcrumbArgs} /> );
    let breadcrumb = container.querySelector( ".dxOnPageBanner__breadcrumb" );
    expect( breadcrumb ).toBeInTheDocument();
} );

test( "Banner will render 'on-page-banner-breadcrumb-list' when the breadcrumb prop is an array of links", () => {
    const { getByTestId } = render( <DXOnPageBanner {...BreadcrumbArgs} /> );
    let breadcrumb = getByTestId( "on-page-banner-breadcrumb-list" );
    expect( breadcrumb ).toBeInTheDocument();
} );

test( "Banner will render the same amount of links passed", () => {
    const { getByTestId } = render( <DXOnPageBanner {...BreadcrumbArgs} /> );
    let breadcrumb = getByTestId( "on-page-banner-breadcrumb-list" ).childNodes;
    let expectedLength = BreadcrumbArgs.breadcrumb?.length as number;
    expect( breadcrumb ).toHaveLength( expectedLength );
} );

test( "Banner will render 'on-page-banner-breadcrumb-text' when the breadcrumb prop is an array of links", () => {
    const { getByTestId } = render( <DXOnPageBanner {...BreadcrumbStringArgs} /> );
    let breadcrumb = getByTestId( "on-page-banner-breadcrumb-text" );
    expect( breadcrumb ).toBeInTheDocument();
} );
// Tests for the interactive button
test( "Banner will not render the Interactive button if the prop is not passed", () => {
    const { container } = render( <DXOnPageBanner {...PageBannerArgs} /> );
    let button = container.querySelector( ".dxInteractiveButton" );
    expect( button ).toBeNull();
} );

test( "Banner will render the Interactive button if the prop is passed", () => {
    const { container } = render( <DXOnPageBanner {...BreadcrumbArgs} /> );
    let button = container.querySelector( ".dxInteractiveButton" );
    expect( button ).toBeInTheDocument();
} );
// - Tests for the custom body class
test( "If the user does not pass the bodyClass prop, the body will have only one class", () => {
    const { container } = render( <DXOnPageBanner {...BreadcrumbArgs} /> );
    let body = container.querySelector( ".dxOnPageBanner__body" );
    expect( body?.classList ).toHaveLength( 1 );
} );

test( "If the user does pass the bodyClass prop, the body will have that class", () => {
    let props = { ...BreadcrumbArgs, bodyClass: "testClass" };
    const { container } = render( <DXOnPageBanner {...props} /> );
    let body = container.querySelector( ".dxOnPageBanner__body" );
    expect( body ).toHaveClass( props.bodyClass );
} );
