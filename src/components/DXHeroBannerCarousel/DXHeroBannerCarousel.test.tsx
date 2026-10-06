import React, { act } from "react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HeroBannerCarouselArgs } from "./DXHeroBannerCarousel.stories";
import DXHeroBannerCarousel from "./DXHeroBannerCarousel";
test( "If component renders a herobanner component", () => {
    let { container } = render( <DXHeroBannerCarousel {...HeroBannerCarouselArgs}></DXHeroBannerCarousel> );
    let listItem = container.querySelector( "li" );
    expect( listItem?.firstChild ).toHaveClass( "dxHeroBanner" );
} );
test( "If component renders the correct amount of children", () => {
    let { container } = render( <DXHeroBannerCarousel {...HeroBannerCarouselArgs}></DXHeroBannerCarousel> );
    let list = container.querySelector( "ul" );
    expect( list?.children.length ).toEqual( HeroBannerCarouselArgs.items.length );
} );
test( "That after render only 1 item shows (has the active class)", () => {
    let { container } = render( <DXHeroBannerCarousel {...HeroBannerCarouselArgs}></DXHeroBannerCarousel> );
    let list = container.querySelector( "ul" );
    expect( list?.querySelectorAll( ".active" ).length ).toEqual( 1 );
} );
//Bullets test
test( "If bullet button works on click", async () => {
    let mock = jest.fn();
    render( <DXHeroBannerCarousel {...HeroBannerCarouselArgs}></DXHeroBannerCarousel> );
    let bullet = screen.getAllByTestId( "HBCarousel-bullet" )[0];
    bullet.onclick = mock;
    await userEvent.click( bullet );
    expect( mock ).toBeCalled();
} );
test( "If bullets has default position as 'right'", () => {
    let { container } = render( <DXHeroBannerCarousel {...HeroBannerCarouselArgs}></DXHeroBannerCarousel> );
    let bulletContainer = container.querySelector( ".dxHeroBannerCarousel__bulletContainer" );
    expect( bulletContainer ).toHaveClass( "dxHeroBannerCarousel__bulletContainer--right" );
} );
test( "If bullet position matches given value", () => {
    let { container } = render( <DXHeroBannerCarousel bulletsPosition="left" {...HeroBannerCarouselArgs}></DXHeroBannerCarousel> );
    let bulletContainer = container.querySelector( ".dxHeroBannerCarousel__bulletContainer" );
    expect( bulletContainer ).toHaveClass( "dxHeroBannerCarousel__bulletContainer--left" );
} );
//Animation Timer tests
test( "If user set a 0 in animation timer the value will be 0.6 seconds", () => {
    render( <DXHeroBannerCarousel animationTime={0} {...HeroBannerCarouselArgs}></DXHeroBannerCarousel> );
    let value = getComputedStyle( document.documentElement ).getPropertyValue( '--HBCarousel-timer' );
    expect( value ).toEqual( "0.6s" );
} );
test( "If use set a valid time for ainmation the value matches in the css variable value", () => {
    render( <DXHeroBannerCarousel animationTime={1} {...HeroBannerCarouselArgs}></DXHeroBannerCarousel> );
    let value = getComputedStyle( document.documentElement ).getPropertyValue( '--HBCarousel-timer' );
    expect( value ).toEqual( "1s" );
} );
//AutoScroll timer test
test( "If component don't scroll if value is 0", async () => {
    render( <DXHeroBannerCarousel autoScrollTime={0}  {...HeroBannerCarouselArgs}></DXHeroBannerCarousel> );
    let container = screen.getByTestId( "HBCarouse-mainContainer" );
    await act( async () => {
        //Wait to prove component didn't scroll - reduced for faster tests
        await new Promise( r => setTimeout( r, 150 ) );
    } );
    expect( container.children[0] ).toHaveClass( "active" );
} );
test( "If component autoscrolls to second banner at given timer", async () => {
    render( <DXHeroBannerCarousel autoScrollTime={0.2} animationTime={0.2}  {...HeroBannerCarouselArgs}></DXHeroBannerCarousel> );
    let container = screen.getByTestId( "HBCarouse-mainContainer" );
    //wait for scrolltime and animation (200ms + 200ms) + buffer, in small
    //increments so intermediate state updates get flushed rather than
    //deferred to a single act() call
    for ( let i = 0; i < 9; i++ ) {
        await act( async () => {
            await new Promise( r => setTimeout( r, 50 ) );
        } );
    }
    expect( container.children[1] ).toHaveClass( "active" );
} );
test( "If component autoscrolls to first element on full cycle", async () => {
    render( <DXHeroBannerCarousel autoScrollTime={0.1} animationTime={0.1}  {...HeroBannerCarouselArgs}></DXHeroBannerCarousel> );
    let container = screen.getByTestId( "HBCarouse-mainContainer" );
    await act( async () => {
        //Wait for 3 cycles (100ms + 100ms) * 3 = 600ms + idle buffer
        await new Promise( r => setTimeout( r, 700 ) );
    } );
    // Use waitFor to handle any remaining async updates
    await waitFor( () => {
        expect( container.children[0] ).toHaveClass( "active" );
    }, { timeout: 300 } );
} );
jest.mock( "../../utilities/BasicComponent/BasicComponent", () => ( {
    BasicComponent: {},
    renderEditButton: jest.fn( () => <button data-testid="edit-button">Edit</button> )
} ) );
// Property type verification and fallback tests
test( "If animationTime handles negative values by falling back to default", () => {
    render( <DXHeroBannerCarousel animationTime={-5} {...HeroBannerCarouselArgs}></DXHeroBannerCarousel> );
    let value = getComputedStyle( document.documentElement ).getPropertyValue( '--HBCarousel-timer' );
    expect( value ).toEqual( "0.6s" );
} );
test( "If animationTime handles non-numeric types gracefully", () => {
    render( <DXHeroBannerCarousel animationTime={"invalid" as any} {...HeroBannerCarouselArgs}></DXHeroBannerCarousel> );
    let value = getComputedStyle( document.documentElement ).getPropertyValue( '--HBCarousel-timer' );
    expect( value ).toEqual( "0.6s" );
} );
test( "If component skips bullet rendering and early-returns animation when item count is 1", () => {
    const singleItemArgs = { ...HeroBannerCarouselArgs, items: [HeroBannerCarouselArgs.items[0]] };
    let { container } = render( <DXHeroBannerCarousel {...singleItemArgs}></DXHeroBannerCarousel> );
    let bulletContainer = container.querySelector( ".dxHeroBannerCarousel__bulletContainer" );
    expect( bulletContainer ).toBeNull();
} );
// Navigation direction and animation state tests
test( "If clicking a bullet with an index less than current set changes direction to right", () => {
    try {
        jest.useFakeTimers();
        const customArgs = { ...HeroBannerCarouselArgs, autoScrollTime: 0 };
        let { container } = render( <DXHeroBannerCarousel animationTime={0.5} {...customArgs}></DXHeroBannerCarousel> );
        let bullets = screen.getAllByTestId( "HBCarousel-bullet" );
        // Move to the second slide (index 1)
        act( () => {
            fireEvent.click( bullets[1] );
        } );
        act( () => {
            jest.runOnlyPendingTimers();
        } );
        // Click the first bullet (index 0) to trigger reverse direction
        act( () => {
            fireEvent.click( bullets[0] );
        } );
        let listItems = container.querySelectorAll( "li" );
        expect( listItems[1] ).toHaveClass( "right" );
    } finally {
        jest.useRealTimers();
    }
} );
test( "If bullet clicks are ignored while animation is active or item is already active", () => {
    try {
        jest.useFakeTimers();
        const customArgs = { ...HeroBannerCarouselArgs, autoScrollTime: 0 };
        let { container } = render( <DXHeroBannerCarousel animationTime={0.5} {...customArgs}></DXHeroBannerCarousel> );
        let bullets = screen.getAllByTestId( "HBCarousel-bullet" );
        act( () => {
            fireEvent.click( bullets[1] ); // Start animation to index 1
        } );
        act( () => {
            fireEvent.click( bullets[2] ); // Attempt click while animating
        } );
        let listItems = container.querySelectorAll( "li" );
        expect( listItems[1] ).toHaveClass( "next" );
        expect( listItems[2] ).not.toHaveClass( "next" );
    } finally {
        jest.useRealTimers();
    }
} );
// Slide cycle wrap and idle timing boundary tests
test( "If full slide cycle wrap triggers correct idle post-animation class state", () => {
    const originalDateNow = Date.now;
    try {
        jest.useFakeTimers();
        let mockTime = 100000;
        Date.now = () => mockTime;
        let { container } = render( <DXHeroBannerCarousel autoScrollTime={1} animationTime={0.5} {...HeroBannerCarouselArgs}></DXHeroBannerCarousel> );
        let bullets = screen.getAllByTestId( "HBCarousel-bullet" );
        const lastIndex = HeroBannerCarouselArgs.items.length - 1;
        // Move to the final slide
        act( () => {
            fireEvent.click( bullets[lastIndex] );
        } );
        act( () => {
            jest.runOnlyPendingTimers();
        } );
        // Advance clock to satisfy the auto-scroll delay loop bound
        mockTime += 1500;
        // Run auto-scroll wrap execution timers
        act( () => {
            jest.runOnlyPendingTimers();
        } );
        // Run final slide transition completion timers
        act( () => {
            jest.runOnlyPendingTimers();
        } );
        let listItems = container.querySelectorAll( "li" );
        expect( listItems[0] ).toHaveClass( "active" );
    } finally {
        Date.now = originalDateNow;
        jest.useRealTimers();
    }
} );
// Edit Mode rendering verification test
test( "If component renders edit button when _edit prop is supplied", () => {
    const editMock = { someProp: "edit-mode-active" };
    render( <DXHeroBannerCarousel _edit={editMock as any} {...HeroBannerCarouselArgs}></DXHeroBannerCarousel> );
    expect( screen.getByTestId( "edit-button" ) ).toBeInTheDocument();
} );
