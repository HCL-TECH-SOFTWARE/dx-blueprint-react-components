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
import { screen, render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXBannerStripe, { BannerStripeProps } from "./DXBannerStripe";

describe( "DXBannerStripe - Hardened Mutation Suite", () => {

    describe( "Structural & Class Mutations", () => {
        it( "strictly binds the ID based on the index prop", () => {
            const { container } = render( <DXBannerStripe index={42} header="Test Header" /> );
            const root = container.firstElementChild as HTMLElement;
            expect( root.id ).toBe( "dxBannerStripe42" );
        } );

        it( "applies default variant classes when foreground is omitted", () => {
            const { container } = render( <DXBannerStripe index={1} header="Test" /> );
            const root = container.firstElementChild as HTMLElement;
            expect( root.className ).toContain( "dxBannerStripe--defaultVariant" );

            const content = screen.getByTestId( "banner-stripe-content" );
            expect( content.className ).toContain( "dxBannerStripe__content--noForeground" );
        } );

        it( "applies video variant classes strictly when video URL is present", () => {
            const { container } = render(
                <DXBannerStripe index={1} header="Test" foreground={{ video: "video.mp4" }} />
            );
            const root = container.firstElementChild as HTMLElement;
            expect( root.className ).toContain( "dxBannerStripe--videoVariant" );
        } );

        it( "applies exact alignment classes when textPosition is right", () => {
            const { container } = render( <DXBannerStripe index={1} header="Test" textPosition="right" /> );
            const root = container.firstElementChild as HTMLElement;
            expect( root.className ).toContain( "dxBannerStripe--alignmentRight" );

            const content = screen.getByTestId( "banner-stripe-content" );
            expect( content.className ).toContain( "dxBannerStripe__content--reversed" );
        } );

        it( "applies custom bodyClass exactly as provided without corrupting base classes", () => {
            const { getByTestId } = render( <DXBannerStripe index={1} header="Test" bodyClass="mutant-killer-class" /> );
            const content = getByTestId( "banner-stripe-content" );
            expect( content.className ).toBe( "dxBannerStripe__content mutant-killer-class  dxBannerStripe__content--noForeground" );
        } );
    } );

    describe( "Injected Style Tags & Hex Math (The CSS Variable Trap)", () => {
        let originalGetComputedStyle: typeof window.getComputedStyle;

        beforeEach( () => {
            originalGetComputedStyle = window.getComputedStyle;
            // Stub getComputedStyle to bypass the CSS Variable Trap for token resolution
            window.getComputedStyle = jest.fn().mockImplementation( () => ( {
                getPropertyValue: ( prop: string ) => {
                    if ( prop === "--custom-token" ) return "#ff0000";
                    return "";
                }
            } ) );
        } );

        afterEach( () => {
            window.getComputedStyle = originalGetComputedStyle;
        } );

        it( "computes exact RGB strings from standard hex codes for background gradients", () => {
            const { container } = render(
                <DXBannerStripe index={2} header="Test" background={{ color: "#00ff00", gradient: true }} />
            );

            // JSDOM Parser Bypass: Read the raw injected style tag text
            const styleTag = container.querySelectorAll( "style" )[0];
            const rawCSS = styleTag.textContent || "";

            // Hex #00ff00 mathematically converts to 0, 255, 0. Asserts the parsed string directly.
            expect( rawCSS ).toContain( "rgba(0, 255, 0)" );
            expect( rawCSS ).toContain( "rgba(245, 246, 252, 0.52)" );
        } );

        it( "resolves CSS variables dynamically via computed styles and calculates RGB", () => {
            const { container } = render(
                <DXBannerStripe index={3} header="Test" background={{ color: "--custom-token", gradient: true }} />
            );

            const styleTag = container.querySelectorAll( "style" )[0];
            const rawCSS = styleTag.textContent || "";

            // Token #ff0000 evaluates to 255, 0, 0
            expect( rawCSS ).toContain( "rgba(255, 0, 0)" );
        } );

        it( "safely falls back to null math and standard variable binding for invalid hex values", () => {
            const { container } = render(
                <DXBannerStripe index={4} header="Test" background={{ color: "invalid-string" }} />
            );

            const styleTag = container.querySelectorAll( "style" )[0];
            const rawCSS = styleTag.textContent || "";

            // Should strictly bind standard var structure if regex fails
            expect( rawCSS ).toContain( "background: var(invalid-string)" );
        } );

        it( "outputs strictly formatted image and transparency overlay styles", () => {
            const { container } = render(
                <DXBannerStripe index={5} header="Test" background={{ url: "bg.jpg", color: "#000000", gradient: false }} />
            );

            const styleTag = container.querySelectorAll( "style" )[0];
            const rawCSS = styleTag.textContent || "";

            expect( rawCSS ).toContain( "linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(bg.jpg)" );
            expect( rawCSS ).toContain( "background-size: cover;" );
        } );
    } );

    describe( "Conditional DOM Rendering Traps", () => {
        it( "strictly prevents button container rendering when array length is exactly 0", () => {
            const { container } = render( <DXBannerStripe index={1} header="Test" buttons={[]} /> );
            // Kills the `props.buttons.length > 0` mutation flip
            expect( container.querySelector( ".dxBannerStripe__buttonContainer" ) ).toBeNull();
        } );

        it( "strictly fires synthetic click events wrapped in act()", async () => {
            const mockClick = jest.fn();
            const { getByTestId } = render(
                <DXBannerStripe index={1} header="Test" buttons={[{ label: "Action", onClick: mockClick }]} />
            );

            const button = getByTestId( "bs-button" );

            await act( async () => {
                await userEvent.click( button );
            } );

            expect( mockClick ).toHaveBeenCalledTimes( 1 );
        } );

        it( "strictly renders image foreground and maps alt attribute", () => {
            const { getByTestId } = render(
                <DXBannerStripe index={1} header="Test" foreground={{ image: "test.png", alt: "Strict Alt" }} />
            );

            const img = getByTestId( "bs-foreground-img" ) as HTMLImageElement;
            expect( img.src ).toContain( "test.png" );
            expect( img.alt ).toBe( "Strict Alt" );
        } );

        it( "strictly binds inline color to the body container without CSSom reliance", () => {
            const { getByTestId } = render( <DXBannerStripe index={1} header="Test" textColor="#123456" /> );
            const body = getByTestId( "banner-stripe-body" );

            // Assert string exact property over generalized toHaveStyle
            expect( body.style.getPropertyValue( "color" ) ).toBe( "rgb(18, 52, 86)" );
        } );
    } );

    describe( "Video Formatting & Lifecycle Execution", () => {
        it( "strictly enforces muted property on the video node immediately upon mount", () => {
            const { getByTestId } = render(
                <DXBannerStripe index={1} header="Test" foreground={{ video: "test.mp4" }} />
            );

            // getByTestId directly targets the <video> element based on getVideoFormat's output
            const videoNode = getByTestId( "banner-stripe-bg-media" ) as HTMLVideoElement;

            // Kills the `video && ( video.muted = true )` conditional omission mutation
            expect( videoNode.muted ).toBe( true );
        } );

        it( "strictly maps .webm format to video/webm type string", () => {
            const { getByTestId } = render(
                <DXBannerStripe index={1} header="Test" foreground={{ video: "movie.webm" }} />
            );

            const sourceNode = getByTestId( "banner-stripe-bg-media" ).childNodes[0] as HTMLElement;
            expect( sourceNode.getAttribute( "type" ) ).toBe( "video/webm" );
        } );

        it( "renders unsupported format warning node for invalid video extensions", () => {
            const { container } = render(
                <DXBannerStripe index={1} header="Test" foreground={{ video: "movie.avi" }} />
            );

            const warningNode = container.querySelector( ".dxBannerStripe__videoContainer p" );
            expect( warningNode?.textContent ).toBe( "Unsopported video format passed" );
        } );
    } );
} );

itSupportsExtensionProps( ( extra ) => <DXBannerStripe index={7} header="Test Header" {...extra} /> );

describe( "DXBannerStripe - extension props keep the scoped id", () => {
    it( "does not let a consumer id replace the generated one (its scoped style depends on it)", () => {
        const { container } = render( <DXBannerStripe index={7} header="Test Header" id="other" /> );
        expect( ( container.firstElementChild as HTMLElement ).id ).toBe( "dxBannerStripe7" );
    } );
} );
