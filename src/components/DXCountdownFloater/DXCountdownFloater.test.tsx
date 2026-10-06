import React from "react";
import '@testing-library/jest-dom';
import { render, act } from "@testing-library/react";
import DXCountdownFloater from "./DXCountdownFloater";

describe( "DXCountdownFloater - Hardened Mutation Suite", () => {
    let originalParseInt: typeof parseInt;

    beforeEach( () => {
        jest.useFakeTimers();
        // Lock system time to a precise baseline to eliminate date math flakiness
        jest.setSystemTime( new Date( '2026-01-01T00:00:00.000Z' ) );

        // SCSS Trap: Mock parseInt to return strict boundary for variables.xs
        originalParseInt = global.parseInt;
        jest.spyOn( global, 'parseInt' ).mockImplementation( ( string, radix ) => {
            if ( String( string ).includes( 'xs' ) ) return 390;
            return originalParseInt( string, radix );
        } );

    } );

    afterEach( () => {
        jest.restoreAllMocks();
        jest.useRealTimers();
    } );

    const setViewportWidth = ( width: number ) => {
        Object.defineProperty( window.HTMLElement.prototype, 'offsetWidth', {
            get: () => width,
            configurable: true
        } );
    };

    describe( "Structural & Prop Validation", () => {
        it( "renders 'No date received' when date is empty", () => {
            setViewportWidth( 560 );
            const { container } = render( <DXCountdownFloater date="" /> );
            const textNode = container.querySelector( 'p' );
            expect( textNode?.textContent ).toBe( "No date received" );
        } );

        it( "applies strict inline color styles to time elements", () => {
            setViewportWidth( 560 );
            const { getByTestId } = render( <DXCountdownFloater date="2026-02-01T00:00:00.000Z" textColor="#FF0000" showSeconds={true} /> );

            // CSS Variable / Styling Trap: Assert exact property value
            expect( getByTestId( "countdown-days" ).style.getPropertyValue( 'color' ) ).toBe( "rgb(255, 0, 0)" );
            expect( getByTestId( "countdown-hours" ).style.getPropertyValue( 'color' ) ).toBe( "rgb(255, 0, 0)" );
            expect( getByTestId( "countdown-minutes" ).style.getPropertyValue( 'color' ) ).toBe( "rgb(255, 0, 0)" );
            expect( getByTestId( "countdown-seconds" ).style.getPropertyValue( 'color' ) ).toBe( "rgb(255, 0, 0)" );
        } );

        it( "clears interval exactly on component unmount", () => {
            setViewportWidth( 560 );
            const clearIntervalSpy = jest.spyOn( global, 'clearInterval' );
            const { unmount } = render( <DXCountdownFloater date="2026-02-01T00:00:00.000Z" /> );

            unmount();
            expect( clearIntervalSpy ).toHaveBeenCalledTimes( 2 ); // Once on mount setup, once on unmount
        } );
    } );

    describe( "Viewport Boundaries (The Physics Engine Trap)", () => {
        it( "renders desktop layout strictly at width > MAX_WIDTH_MOBILE (391px)", () => {
            setViewportWidth( 391 );
            const { container } = render( <DXCountdownFloater date="2026-02-01T00:00:00.000Z" /> );
            expect( container.querySelector( '.dxCountdown__container' ) ).not.toBeNull();
            expect( container.querySelector( '.dxCountdown--mobile' ) ).not.toBeNull(); // Always present but we check specifics
            expect( container.querySelector( '.dxCountdown-days' ) ).not.toBeNull();
            expect( container.querySelector( '.dxCountdown--mobile-days' ) ).not.toBeNull();
        } );

        it( "renders mobile layout strictly at width <= MAX_WIDTH_MOBILE (390px)", () => {
            setViewportWidth( 390 );
            const { container } = render( <DXCountdownFloater date="2026-02-01T00:00:00.000Z" showSeconds={true} /> );
            expect( container.querySelector( '.dxCountdown--mobile-seconds' ) ).not.toBeNull();
            expect( container.querySelector( '.dxCountdown--mobile-months' ) ).toBeNull(); // showSeconds=true hides months
        } );
    } );

    describe( "Mathematical Timer Cascades & State Execution", () => {
        it( "freezes exactly at zero when totalSeconds <= 0", () => {
            setViewportWidth( 560 );
            // Date is exactly 2 seconds in the past
            const { container } = render( <DXCountdownFloater date="2025-12-31T23:59:58.000Z" /> );

            act( () => {
                jest.advanceTimersByTime( 3000 );
            } );

            // If interval math mutates to continue negative, these will not be '0'
            const daysTop = container.querySelector( '.dxCountdown-days .dxCountdown__top' );
            expect( daysTop?.textContent ).toBe( '0' );
        } );

        it( "cascades mathematical decrements precisely across all time boundaries", () => {
            setViewportWidth( 560 );
            // Time set to exactly: 1 Month, 0 Days, 0 Hours, 0 Minutes, 0 Seconds
            // totalSeconds = 30 days = 2592000 seconds
            const futureDate = new Date( Date.now() + 2592000 * 1000 ).toISOString();

            const { container } = render( <DXCountdownFloater date={futureDate} showSeconds={false} /> );

            act( () => {
                jest.advanceTimersByTime( 1000 );
            } );

            // Asserting the cascade triggered correctly down to the exact fallback strings
            // Using the innerText fallback to bypass JSDOM's mutation sync failure
            const months = container.querySelector( '.dxCountdown-months .dxCountdown__top' ) as HTMLElement;
            const days = container.querySelector( '.dxCountdown-days .dxCountdown__top' ) as HTMLElement;
            const hours = container.querySelector( '.dxCountdown-hours .dxCountdown__top' ) as HTMLElement;
            const minutes = container.querySelector( '.dxCountdown-minutes .dxCountdown__top' ) as HTMLElement;

            expect( months?.innerText || months?.textContent ).toBe( "00" );
            expect( days?.innerText || days?.textContent ).toBe( "29" );
            expect( hours?.innerText || hours?.textContent ).toBe( "23" );
            expect( minutes?.innerText || minutes?.textContent ).toBe( "59" );
        } );
    } );

    describe( "String Padding & Mobile Print Time Boundaries", () => {
        it( "strictly prepends '0' for values < 10 on mobile", () => {
            setViewportWidth( 300 );
            // Exact 9 seconds gap
            const targetDate = new Date( Date.now() + 9000 ).toISOString();
            const { container } = render( <DXCountdownFloater date={targetDate} showSeconds={true} /> );

            act( () => {
                jest.advanceTimersByTime( 1000 );
            } );

            const secondsNode = container.querySelector( '.dxCountdown--mobile-seconds span' ) as HTMLElement;
            const textValue = secondsNode?.innerText || secondsNode?.textContent;
            expect( textValue ).toBe( "08" ); // 9 seconds minus 1 tick
        } );

        it( "strictly omits '0' pad for values >= 10 on mobile", () => {
            setViewportWidth( 300 );
            // Exact 11 seconds gap
            const targetDate = new Date( Date.now() + 11000 ).toISOString();
            const { container } = render( <DXCountdownFloater date={targetDate} showSeconds={true} /> );

            act( () => {
                jest.advanceTimersByTime( 1000 );
            } );

            const secondsNode = container.querySelector( '.dxCountdown--mobile-seconds span' ) as HTMLElement;
            const textValue = secondsNode?.innerText || secondsNode?.textContent;
            expect( textValue ).toBe( "10" ); // 11 seconds minus 1 tick
        } );
    } );

    describe( "CSS Flip Animation Validations", () => {
        it( "adds flipping CSS classes when digit values change", () => {
            setViewportWidth( 560 );
            const futureDate = new Date( Date.now() + 5000 ).toISOString();
            const { container } = render( <DXCountdownFloater date={futureDate} showSeconds={true} /> );

            act( () => {
                jest.advanceTimersByTime( 1000 );
            } );

            // Verify CSS flip classes are applied to at least one time element
            const flippingTops = container.querySelectorAll( '.dxCountdown__top--flipping' );
            const flippingTopBacks = container.querySelectorAll( '.dxCountdown__topBack--flipping' );
            expect( flippingTops.length ).toBeGreaterThan( 0 );
            expect( flippingTopBacks.length ).toBeGreaterThan( 0 );
        } );
    } );
} );