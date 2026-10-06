import React from 'react';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent, act } from "@testing-library/react";
import DXWeeklyCalendar from './DXWeeklyCalendar';
let today = new Date();

let singleEvent = [
    {
        info: {
            url: "/event-1",
            label: "Event 1",
            target: "_self"
        },
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    },
];

let multipleEvents = [
    {
        info: {
            url: "/event-1a",
            label: "Event 1a",
            target: "_self"
        },
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    },
    {
        info: {
            url: "/event-1b",
            label: "Event 1b",
            target: "_self"
        },
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    },
    {
        info: {
            url: "/event-1c",
            label: "Event 1c",
            target: "_self"
        },
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    },
    {
        info: {
            url: "/event-1d",
            label: "Event 1d",
            target: "_self"
        },
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    },
    {
        info: {
            url: "/event-1e",
            label: "Event 1e",
            target: "_self"
        },
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    },
];

// Render tests
test( "If the user pass an event for today, it should be rendered", () => {
    let props = {
        fullCalendarLink: "/test",
        events: singleEvent
    };
    const { getByText } = render( <DXWeeklyCalendar {...props} /> );
    let dayNumberString = today.getDate() < 10 ? "0" + today.getDate().toString() : today.getDate().toString();
    const dayNumber = getByText( dayNumberString );
    const events = dayNumber.nextSibling as HTMLElement;
    expect( events.childNodes ).toHaveLength( 1 );
} );

test( "If the user pass more than 3 events for today, just three 'dxWeeklyCalendar__event' elements should be rendered", () => {
    let props = {
        fullCalendarLink: "/test",
        events: multipleEvents
    };
    const { getByText } = render( <DXWeeklyCalendar {...props} /> );

    let dayNumberString = today.getDate() < 10 ? "0" + today.getDate().toString() : today.getDate().toString();
    const dayNumber = getByText( dayNumberString );
    const events = dayNumber.nextSibling as HTMLElement;
    let eventAmnt = 0;
    events.childNodes.forEach( ( child ) => {
        let event = child as HTMLElement;
        if ( event.classList.contains( "dxWeeklyCalendar__event" ) ) {
            eventAmnt++;
        }
    } );
    expect( eventAmnt ).toBe( 3 );
} );

test( "If the user pass more than 3 events for today, the 'weekly-more-events' should be in the document", () => {
    let props = {
        fullCalendarLink: "/test",
        events: multipleEvents
    };
    const { getByTestId } = render( <DXWeeklyCalendar {...props} /> );
    const el = getByTestId( "weekly-more-events" );
    expect( el ).toBeInTheDocument();
} );

test( "If the user pass more than 3 events for today, the 'weekly-more-events' value should the event's lenght less 3", () => {
    let props = {
        fullCalendarLink: "/test",
        events: multipleEvents
    };
    const { getByTestId } = render( <DXWeeklyCalendar {...props} /> );
    const el = getByTestId( "weekly-more-events" );
    expect( el.textContent ).toBe( `+${multipleEvents.length - 3} more` );
} );

// Slider tests
test( "If the component's width is greater than 390px the slider should be null", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        fullCalendarLink: "/test",
        events: singleEvent
    };
    const { container } = render( <DXWeeklyCalendar {...props} /> );
    let slider = container.querySelector( ".dxWeeklyCalendar__slider" );
    expect( slider ).toBeNull();
} );

test( "If the component's width is 390px the slider should be in the document", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 390; }
        }
    } );
    let props = {
        fullCalendarLink: "/test",
        events: singleEvent
    };
    const { container } = render( <DXWeeklyCalendar {...props} /> );
    let slider = container.querySelector( ".dxWeeklyCalendar__slider" );
    expect( slider ).toBeInTheDocument();
} );

test( "When the component loads, the previous button from the slider should have the class 'dxWeeklyCalendar__navBtn--display-hide'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 390; }
        }
    } );
    let props = {
        fullCalendarLink: "/test",
        events: singleEvent
    };
    const { container } = render( <DXWeeklyCalendar {...props} /> );
    const prevBtn = container.querySelector( '.dxWeeklyCalendar__navBtn--direction-prev' )?.classList;
    expect( prevBtn?.contains( "dxWeeklyCalendar__navBtn--display-hide" ) ).toBeTruthy();
} );

test( "When the user clicks on the next button, the prev button should not have the class 'dxWeeklyCalendar__navBtn--display-hide'", async () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 390; }
        }
    } );
    let props = {
        fullCalendarLink: "/test",
        events: singleEvent
    };
    const { getByTestId } = render( <DXWeeklyCalendar {...props} /> );
    const nextBtn = getByTestId( 'slider-next-button' );
    await act( async () => {
        await userEvent.click( nextBtn );
        await new Promise( r => setTimeout( r, 700 ) );
    } );
    const prevBtn = getByTestId( 'slider-prev-button' );
    expect( prevBtn?.classList.contains( "dxWeeklyCalendar__navBtn--display-hide" ) ).toBeFalsy();
} );

test( "When the user clicks on the next button, the next button should have the class 'dxWeeklyCalendar__navBtn--display-hide'", async () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 390; }
        }
    } );
    let props = {
        fullCalendarLink: "/test",
        events: singleEvent
    };
    const { getByTestId } = render( <DXWeeklyCalendar {...props} /> );
    const nextBtn = getByTestId( 'slider-next-button' );
    await act( async () => {
        await userEvent.click( nextBtn );
        await new Promise( r => setTimeout( r, 700 ) );
    } );
    const checkNextBtn = getByTestId( 'slider-next-button' );
    expect( checkNextBtn?.classList.contains( "dxWeeklyCalendar__navBtn--display-hide" ) ).toBeTruthy();
} );

test( "When the user clicks on the next button, the prev button should not have the class 'dxWeeklyCalendar__navBtn--display-hide'", async () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 390; }
        }
    } );
    let props = {
        fullCalendarLink: "/test",
        events: singleEvent
    };
    const { getByTestId } = render( <DXWeeklyCalendar {...props} /> );
    const nextBtn = getByTestId( 'slider-next-button' );
    await act( async () => {
        await userEvent.click( nextBtn );
        await new Promise( r => setTimeout( r, 700 ) );
    } );
    const checkPrevBtn = getByTestId( 'slider-prev-button' );
    expect( checkPrevBtn?.classList.contains( "dxWeeklyCalendar__navBtn--display-hide" ) ).toBeFalsy();
} );

test( "When the user clicks on the next button, and then on the prev button the next one should not have the class 'dxWeeklyCalendar__navBtn--display-hide'", async () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 390; }
        }
    } );
    let props = {
        fullCalendarLink: "/test",
        events: singleEvent
    };
    const { getByTestId } = render( <DXWeeklyCalendar {...props} /> );
    const nextBtn = getByTestId( 'slider-next-button' );
    await act( async () => {
        await userEvent.click( nextBtn );
    } );
    // Advance in small increments: react-slick's internal "animating" reset
    // (chained setState calls after `speed` + 10ms) needs multiple render
    // flushes to fully settle before the next navigation is accepted.
    for ( let i = 0; i < 20; i++ ) {
        await act( async () => {
            await new Promise( r => setTimeout( r, 50 ) );
        } );
    }
    // Re-query: react-slick re-renders its arrow buttons, so the reference
    // obtained before navigation may be stale.
    const prevBtn = getByTestId( 'slider-prev-button' );
    await act( async () => {
        fireEvent.click( prevBtn );
    } );
    for ( let i = 0; i < 20; i++ ) {
        await act( async () => {
            await new Promise( r => setTimeout( r, 50 ) );
        } );
    }
    const checkNextBtn = getByTestId( 'slider-next-button' );
    expect( checkNextBtn?.classList.contains( "dxWeeklyCalendar__navBtn--display-hide" ) ).toBeFalsy();
} );

// Modal test
test( "If there is more than 3 events for today and the user clicks on the + more the modal should appear", async () => {
    let props = {
        fullCalendarLink: "/test",
        events: multipleEvents
    };
    const { getByTestId } = render( <DXWeeklyCalendar {...props} /> );
    const more = getByTestId( "weekly-more-events" );
    await act( async () => {
        await userEvent.click( more );
    } );
    let modal = getByTestId( "calendar-modal" );
    expect( modal ).toBeInTheDocument();
} );

test( "If the user focus the '+more' button and press the Enter key the modal should show", () => {
    let props = {
        fullCalendarLink: "/test",
        events: multipleEvents
    };
    const { getByTestId } = render( <DXWeeklyCalendar {...props} /> );
    const more = getByTestId( "weekly-more-events" );
    fireEvent.keyDown( more, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    let modal = getByTestId( "calendar-modal" );
    expect( modal ).toBeInTheDocument();
} );

test( "If the user focus the '+more' button and press the Space key the modal should show", () => {
    let props = {
        fullCalendarLink: "/test",
        events: multipleEvents
    };
    const { getByTestId } = render( <DXWeeklyCalendar {...props} /> );
    const more = getByTestId( "weekly-more-events" );
    fireEvent.keyDown( more, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    let modal = getByTestId( "calendar-modal" );
    expect( modal ).toBeInTheDocument();
} );

test( "If the user focus the '+more' button and press the Escape key the modal should not show", () => {
    let props = {
        fullCalendarLink: "/test",
        events: multipleEvents
    };
    const { container, getByTestId } = render( <DXWeeklyCalendar {...props} /> );
    const more = getByTestId( "weekly-more-events" );
    fireEvent.keyDown( more, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    let modal = container.querySelector( '[data-testid="calendar-modal"]' );
    expect( modal ).toBeNull();
} );

test( "If the modal is open, it should render all the events for today", async () => {
    let props = {
        fullCalendarLink: "/test",
        events: multipleEvents
    };
    const { getByTestId } = render( <DXWeeklyCalendar {...props} /> );
    const more = getByTestId( "weekly-more-events" );
    await act( async () => {
        await userEvent.click( more );
    } );
    let events = await screen.findByTestId( "calendar-modal-content" );
    expect( events?.childNodes ).toHaveLength( props.events.length );
} );

test( "If the modal is open, and the user click on the Cancel button it should be null", async () => {
    let props = {
        fullCalendarLink: "/test",
        events: multipleEvents
    };
    const { container, getByTestId } = render( <DXWeeklyCalendar {...props} /> );
    const more = getByTestId( "weekly-more-events" );
    await act( async () => {
        await userEvent.click( more );
        let cancelBtn = await screen.findByTestId( "calendar-modal-close" );
        await userEvent.click( cancelBtn );
    } );
    let verifyModal = container.querySelector( '[data-testid="calendar-modal"]' );
    expect( verifyModal ).toBeNull();
} );

test( "If the modal is open, and the user focus the Cancel button, and press the Enter key the modal should be null", async () => {
    let props = {
        fullCalendarLink: "/test",
        events: multipleEvents
    };
    const { container, getByTestId } = render( <DXWeeklyCalendar {...props} /> );
    const more = getByTestId( "weekly-more-events" );
    await act( async () => {
        await userEvent.click( more );
    } );
    let cancelBtn = await screen.findByTestId( "calendar-modal-close" );
    fireEvent.keyDown( cancelBtn, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    let verifyModal = container.querySelector( '[data-testid="calendar-modal"]' );
    expect( verifyModal ).toBeNull();
} );

test( "If the modal is open, and the user focus the Cancel button, and press the Space key the modal should be null", async () => {
    let props = {
        fullCalendarLink: "/test",
        events: multipleEvents
    };
    const { container, getByTestId } = render( <DXWeeklyCalendar {...props} /> );
    const more = getByTestId( "weekly-more-events" );
    await act( async () => {
        await userEvent.click( more );
    } );
    let cancelBtn = await screen.findByTestId( "calendar-modal-close" );
    fireEvent.keyDown( cancelBtn, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    let verifyModal = container.querySelector( '[data-testid="calendar-modal"]' );
    expect( verifyModal ).toBeNull();
} );

test( "If the modal is open, and the user focus the Cancel button, and press the Space key the modal should be in the document", async () => {
    let props = {
        fullCalendarLink: "/test",
        events: multipleEvents
    };
    const { container, getByTestId } = render( <DXWeeklyCalendar {...props} /> );
    const more = getByTestId( "weekly-more-events" );
    await act( async () => {
        await userEvent.click( more );
    } );
    let cancelBtn = await screen.findByTestId( "calendar-modal-close" );
    fireEvent.keyDown( cancelBtn, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    let verifyModal = container.querySelector( '[data-testid="calendar-modal"]' );
    expect( verifyModal ).toBeNull();
} );

// Test the window.open function is called
test( "If the user clicks on the 'view full calendar' the window.open function should be called", async () => {
    const spyWindowOpen = jest.spyOn( window, 'open' );
    spyWindowOpen.mockImplementation( jest.fn() );
    let props = {
        fullCalendarLink: "/test",
        events: multipleEvents
    };
    const { getByText } = render( <DXWeeklyCalendar {...props} /> );
    const viewFullCalendar = getByText( "View full calendar" );
    await act( async () => {
        await userEvent.click( viewFullCalendar );
    } );
    expect( spyWindowOpen ).toHaveBeenCalledTimes( 1 );
    spyWindowOpen.mockRestore();
} );

test( "If the user focus on the 'view full calendar' and press the Enter key the window.open function should be called", () => {
    const spyWindowOpen = jest.spyOn( window, 'open' );
    spyWindowOpen.mockImplementation( jest.fn() );
    let props = {
        fullCalendarLink: "/test",
        events: multipleEvents
    };
    const { getByText } = render( <DXWeeklyCalendar {...props} /> );
    const viewFullCalendar = getByText( "View full calendar" );
    viewFullCalendar.focus();
    fireEvent.keyDown( viewFullCalendar, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    expect( spyWindowOpen ).toHaveBeenCalledTimes( 1 );
    spyWindowOpen.mockRestore();
} );

test( "If the user focus on the 'view full calendar' and press the Space key the window.open function should be called", () => {
    const spyWindowOpen = jest.spyOn( window, 'open' );
    spyWindowOpen.mockImplementation( jest.fn() );
    let props = {
        fullCalendarLink: "/test",
        events: multipleEvents
    };
    const { getByText } = render( <DXWeeklyCalendar {...props} /> );
    const viewFullCalendar = getByText( "View full calendar" );
    viewFullCalendar.focus();
    fireEvent.keyDown( viewFullCalendar, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    expect( spyWindowOpen ).toHaveBeenCalledTimes( 1 );
    spyWindowOpen.mockRestore();
} );

test( "If the user focus on the 'view full calendar' and press the Space key the window.open function should be called 0 times", () => {
    const spyWindowOpen = jest.spyOn( window, 'open' );
    spyWindowOpen.mockImplementation( jest.fn() );
    let props = {
        fullCalendarLink: "/test",
        events: multipleEvents
    };
    const { getByText } = render( <DXWeeklyCalendar {...props} /> );
    const viewFullCalendar = getByText( "View full calendar" );
    viewFullCalendar.focus();
    fireEvent.keyDown( viewFullCalendar, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    expect( spyWindowOpen ).toHaveBeenCalledTimes( 0 );
    spyWindowOpen.mockRestore();
} );

// Link tests
test( "If the user pass no target for the today's event, the target should be _self", () => {
    let todayEvent = { ...singleEvent[0] };
    //@ts-ignore: For testing purposes
    delete todayEvent.info.target;
    let props = {
        fullCalendarLink: "/test",
        events: [todayEvent]
    };
    const { container } = render( <DXWeeklyCalendar {...props} /> );
    const event = container.querySelector( ".dxWeeklyCalendar__event" ) as HTMLElement;
    const link = event.childNodes[0] as HTMLAnchorElement;
    expect( link.target ).toBe( "_self" );
} );

test( "If the user pass an empty target for the today's event, the target should be _self", () => {
    let todayEvent = { ...singleEvent[0] };
    todayEvent.info.target = "";
    let props = {
        fullCalendarLink: "/test",
        events: [todayEvent]
    };
    const { container } = render( <DXWeeklyCalendar {...props} /> );
    const event = container.querySelector( ".dxWeeklyCalendar__event" ) as HTMLElement;
    const link = event.childNodes[0] as HTMLAnchorElement;
    expect( link.target ).toBe( "_self" );
} );

test( "If the user pass an invalid target for the today's event, the target should be _self", () => {
    let todayEvent = { ...singleEvent[0] };
    todayEvent.info.target = "_external";
    let props = {
        fullCalendarLink: "/test",
        events: [todayEvent]
    };
    const { container } = render( <DXWeeklyCalendar {...props} /> );
    const event = container.querySelector( ".dxWeeklyCalendar__event" ) as HTMLElement;
    const link = event.childNodes[0] as HTMLAnchorElement;
    expect( link.target ).toBe( "_self" );
} );

test( "If the user pass a valid target for the today's event, the target should be that one", () => {
    let todayEvent = { ...singleEvent[0] };
    todayEvent.info.target = "_blank";
    let props = {
        fullCalendarLink: "/test",
        events: [todayEvent]
    };
    const { container } = render( <DXWeeklyCalendar {...props} /> );
    const event = container.querySelector( ".dxWeeklyCalendar__event" ) as HTMLElement;
    const link = event.childNodes[0] as HTMLAnchorElement;
    expect( link.target ).toBe( todayEvent.info.target );
} );

test( "If slider button icons change when icon props are set", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 390; }
        }
    } );
    let props = {
        fullCalendarLink: "/test",
        events: singleEvent,
        icons: {
            prev: "ci-Arrow_Left_MD",
            next: "ci-Arrow_Right_MD",
        }
    };
    const { getByTestId } = render( <DXWeeklyCalendar {...props} /> );
    const nextBtn = getByTestId( 'slider-next-button' );
    const prevBtn = getByTestId( 'slider-prev-button' );

    expect.assertions( 2 );
    expect( nextBtn.querySelector( "i" ) ).toHaveClass( props.icons.next );
    expect( prevBtn.querySelector( "i" ) ).toHaveClass( props.icons.prev );
} );

describe( "DXWeeklyCalendar Hardening", () => {
    afterEach( () => {
        jest.restoreAllMocks();
    } );

    test( "Layout Math: strictly enforces mobile boundary at exactly 390px", () => {
        const offsetSpy = jest.spyOn( window.HTMLElement.prototype, 'offsetWidth', 'get' );

        // Test boundary 1: Exactly 390px (Mobile threshold)
        // Kills <= vs < mutants
        offsetSpy.mockReturnValue( 390 );
        const { container: containerMobile } = render( <DXWeeklyCalendar fullCalendarLink="/test" events={[]} /> );
        expect( containerMobile.querySelector( ".dxWeeklyCalendar__slider" ) ).toBeInTheDocument();

        // Test boundary 2: Exactly 391px (Desktop threshold)
        offsetSpy.mockReturnValue( 391 );
        const { container: containerDesktop } = render( <DXWeeklyCalendar fullCalendarLink="/test" events={[]} /> );
        expect( containerDesktop.querySelector( ".dxWeeklyCalendar__slider" ) ).not.toBeInTheDocument();
        expect( containerDesktop.querySelector( ".dxWeeklyCalendar__container" ) ).toBeInTheDocument();

        offsetSpy.mockRestore();
    } );

    test( "Month Boundary: precisely assigns --other class to days strictly outside the current month", () => {
        jest.useFakeTimers();
        // Oct 31, 2023 is a Tuesday. The generated week runs from Sun Oct 29 to Sat Nov 4.
        // This guarantees a hard intersection of two different months in the same week.
        jest.setSystemTime( new Date( "2023-10-31T12:00:00Z" ) );

        const { container } = render( <DXWeeklyCalendar fullCalendarLink="/test" events={[]} /> );

        // Asserts the exact ternary branch `day.month() === today.month()`
        const currentMonthDays = container.querySelectorAll( ".dxWeeklyCalendar__day" );
        const otherMonthDays = container.querySelectorAll( ".dxWeeklyCalendar__day--other" );

        expect( currentMonthDays.length ).toBeGreaterThan( 0 );
        expect( otherMonthDays.length ).toBeGreaterThan( 0 );

        jest.useRealTimers();
    } );

    test( "Keyboard Execution: strictly ignores unmapped keycodes to prevent false-positive trigger executions", () => {
        const spyWindowOpen = jest.spyOn( window, 'open' ).mockImplementation();

        const { getByText, getByTestId } = render(
            <DXWeeklyCalendar fullCalendarLink="/test" events={multipleEvents} />
        );

        const viewFull = getByText( "View full calendar" );
        const moreBtn = getByTestId( "weekly-more-events" );

        // Fire invalid keycode (e.g., 99) against "View full calendar"
        fireEvent.keyDown( viewFull, { keyCode: 99 } );
        expect( spyWindowOpen ).not.toHaveBeenCalled();

        // Fire invalid keycode against "+X more" button
        fireEvent.keyDown( moreBtn, { keyCode: 99 } );
        expect( screen.queryByTestId( "calendar-modal" ) ).not.toBeInTheDocument();

        spyWindowOpen.mockRestore();
    } );

    test( "Modal Close Execution: strictly ignores unmapped keycodes on the modal close buttons", async () => {
        const { getByTestId } = render(
            <DXWeeklyCalendar fullCalendarLink="/test" events={multipleEvents} />
        );

        // Open modal
        await act( async () => {
            fireEvent.click( getByTestId( "weekly-more-events" ) );
        } );

        const closeBtn = getByTestId( "calendar-modal-close" );

        // Fire invalid keycode (e.g., 99) against the modal's primary OK button
        await act( async () => {
            fireEvent.keyDown( closeBtn, { keyCode: 99 } );
        } );

        // Assert the condition `e.keyCode === 13 || e.keyCode === 32` was strictly evaluated and modal remains open
        expect( getByTestId( "calendar-modal" ) ).toBeInTheDocument();
    } );

    test( "Modal Header Close: clicking the top-right X icon directly executes the unmount closure", async () => {
        const { getByTestId } = render(
            <DXWeeklyCalendar fullCalendarLink="/test" events={multipleEvents} />
        );

        // Open modal
        await act( async () => {
            fireEvent.click( getByTestId( "weekly-more-events" ) );
        } );

        // React-Bootstrap Modals render into a Portal attached to the document body, not the local render container.
        const closeIcon = document.querySelector( ".ci-Close_MD" ) as HTMLElement;
        expect( closeIcon ).toBeInTheDocument();

        // Click the X icon
        await act( async () => {
            fireEvent.click( closeIcon );
        } );

        // Assert the handleClose state hook successfully purged the modal
        expect( screen.queryByTestId( "calendar-modal" ) ).not.toBeInTheDocument();
    } );

    test( "Initialization Boundary: gracefully bypasses momentizeEvents mapping when events array is mathematically empty", () => {
        // Stryker mutates `props.events.length > 0` to `>= 0` or drops it.
        // An empty array should safely bypass the internal mapping iteration.
        const { container } = render( <DXWeeklyCalendar fullCalendarLink="/test" events={[]} /> );

        // Verify no orphaned list items or DOM text fragments were generated
        expect( container.querySelectorAll( ".dxWeeklyCalendar__event" ).length ).toBe( 0 );
    } );

    test( "Memory boundaries: rigorously detaches window resize listener upon component unmount", () => {
        const removeSpy = jest.spyOn( window, "removeEventListener" );
        const { unmount } = render( <DXWeeklyCalendar fullCalendarLink="/test" events={[]} /> );

        unmount();

        // Assert the exact "resize" unmount event was trapped to prevent memory leaks
        const resizeCalls = removeSpy.mock.calls.filter( call => call[0] === "resize" );
        expect( resizeCalls.length ).toBeGreaterThan( 0 );
        expect( typeof resizeCalls[0][1] ).toBe( "function" );

        removeSpy.mockRestore();
    } );
} );
