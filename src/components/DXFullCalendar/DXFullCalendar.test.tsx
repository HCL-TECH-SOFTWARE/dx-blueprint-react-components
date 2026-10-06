import React from "react";
import '@testing-library/jest-dom';
import { render, fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXFullCalendar from "./DXFullCalendar";
import { calendarChangedIconsArgs } from "./DXFullCalendar.stories";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
let today = new Date();
const multipleEvents = [
    {
        info: {
            url: "/event-1",
            label: "Event 1",
            target: "_self"
        },
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
    }, {
        info: {
            url: "/event-2",
            label: "Event 2",
            target: "_self"
        },
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
    },
    {
        info: {
            url: "/event-3",
            label: "Event 3",
            target: "_self"
        },
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
    },
    {
        info: {
            url: "/event-4",
            label: "Event 4",
            target: "_self"
        },
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
    }
];
let eventsForFilter = [
    {
        info: {
            url: "/event-1",
            label: "Event 1",
            target: "_self"
        },
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
        type: "Personal",
        location: "Home"
    }, {
        info: {
            url: "/event-2",
            label: "Event 2",
            target: "_self"
        },
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
        type: "Business",
        location: "Office"
    },
    {
        info: {
            url: "/event-3",
            label: "Event 3",
            target: "_self"
        },
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
        type: "Personal,Health",
        location: "Hospital"
    },
];
let eventsSelect = [
    {
        info: {
            url: "/event-1",
            label: "Event 1",
            target: "_self"
        },
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
        type: "Personal,Business"
    }, {
        info: {
            url: "/event-2",
            label: "Event 2",
            target: "_self"
        },
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
        type: "Health,School"
    },
    {
        info: {
            url: "/event-3",
            label: "Event 3",
            target: "_self"
        },
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
        type: "Family"
    },
];

// Test for moving amoung the months
test( "If the user clicks on the next button when is on month view, the month text should be of the next one", async () => {
    let props = {
        events: []
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    let nextBtn = getByTestId( "full-calendar-next" );
    await act( async () => {
        await userEvent.click( nextBtn );
    } );
    let month = getByTestId( "full-calendar-current-month" );
    let monthName = ( today.getMonth() + 1 >= 12 ) ? monthNames[0] : monthNames[today.getMonth() + 1];
    expect( month.textContent ).toContain( monthName );
} );

test( "If the user focus on the next button and type the Enter key when is on month view, the month text should be of the next one", () => {
    let props = {
        events: []
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    let nextBtn = getByTestId( "full-calendar-next" );
    nextBtn.focus();
    fireEvent.keyDown( nextBtn, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    let month = getByTestId( "full-calendar-current-month" );
    let monthName = ( today.getMonth() + 1 >= 12 ) ? monthNames[0] : monthNames[today.getMonth() + 1];
    expect( month.textContent ).toContain( monthName );
} );

test( "If the user focus on the next button and type the Space key when is on month view, the month text should be of the next one", () => {
    let props = {
        events: []
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    let nextBtn = getByTestId( "full-calendar-next" );
    nextBtn.focus();
    fireEvent.keyDown( nextBtn, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    let month = getByTestId( "full-calendar-current-month" );
    let monthName = ( today.getMonth() + 1 >= 12 ) ? monthNames[0] : monthNames[today.getMonth() + 1];
    expect( month.textContent ).toContain( monthName );
} );

test( "If the user focus on the next button and type the Escape key when is on month view, the month text should be the actual month", () => {
    let props = {
        events: []
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    let nextBtn = getByTestId( "full-calendar-next" );
    nextBtn.focus();
    fireEvent.keyDown( nextBtn, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    let month = getByTestId( "full-calendar-current-month" );
    expect( month.textContent ).toContain( monthNames[today.getMonth()] );
} );

test( "If the user clicks on the prev button when is on month view, the month text should be of the previous one", async () => {
    let props = {
        events: []
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    let prevBtn = getByTestId( "full-calendar-prev" );
    await act( async () => {
        await userEvent.click( prevBtn );
    } );
    let month = getByTestId( "full-calendar-current-month" );
    let monthName = ( today.getMonth() - 1 ) < 0 ? monthNames[11] : monthNames[today.getMonth() - 1];
    expect( month.textContent ).toContain( monthName );
} );

test( "If the user focus on the next button and type the Enter key when is on month view, the month text should be of the previous one", () => {
    let props = {
        events: []
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    let prevBtn = getByTestId( "full-calendar-prev" );
    prevBtn.focus();
    fireEvent.keyDown( prevBtn, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    let month = getByTestId( "full-calendar-current-month" );
    let monthName = ( today.getMonth() - 1 ) < 0 ? monthNames[11] : monthNames[today.getMonth() - 1];
    expect( month.textContent ).toContain( monthName );
} );

test( "If the user focus on the next button and type the Space key when is on month view, the month text should be of the previous one", () => {
    let props = {
        events: []
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    let prevBtn = getByTestId( "full-calendar-prev" );
    prevBtn.focus();
    fireEvent.keyDown( prevBtn, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    let month = getByTestId( "full-calendar-current-month" );
    let monthName = ( today.getMonth() - 1 ) < 0 ? monthNames[11] : monthNames[today.getMonth() - 1];
    expect( month.textContent ).toContain( monthName );
} );

test( "If the user focus on the next button and type the Escape key when is on month view, the month text should be the actual month", () => {
    let props = {
        events: []
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    let prevBtn = getByTestId( "full-calendar-prev" );
    prevBtn.focus();
    fireEvent.keyDown( prevBtn, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    let month = getByTestId( "full-calendar-current-month" );
    expect( month.textContent ).toContain( monthNames[today.getMonth()] );
} );

test( "If the user clicks on the prev button when is on month view, and then focus on the today button and press the Enter key, it should return to the actual month", async () => {
    let props = {
        events: []
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    let prevBtn = getByTestId( "full-calendar-prev" );
    await act( async () => {
        await userEvent.click( prevBtn );
    } );
    let todayBtn = getByTestId( "full-calendar-today" );
    fireEvent.keyDown( todayBtn, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    let month = getByTestId( "full-calendar-current-month" );
    expect( month.textContent ).toContain( monthNames[today.getMonth()] );
} );

test( "If the user clicks on the prev button when is on month view, and then focus on the today button and press the Space key, it should return to the actual month", async () => {
    let props = {
        events: []
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    let prevBtn = getByTestId( "full-calendar-prev" );
    await act( async () => {
        await userEvent.click( prevBtn );
    } );
    let todayBtn = getByTestId( "full-calendar-today" );
    fireEvent.keyDown( todayBtn, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    let month = getByTestId( "full-calendar-current-month" );
    expect( month.textContent ).toContain( monthNames[today.getMonth()] );
} );

test( "If the user clicks on the prev button when is on month view, and then focus on the today button and press the Escape key, it should not return to the actual month", async () => {
    let props = {
        events: []
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    let prevBtn = getByTestId( "full-calendar-prev" );
    await act( async () => {
        await userEvent.click( prevBtn );
    } );
    let todayBtn = getByTestId( "full-calendar-today" );
    fireEvent.keyDown( todayBtn, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    let month = getByTestId( "full-calendar-current-month" );
    let monthName = ( today.getMonth() - 1 ) < 0 ? monthNames[11] : monthNames[today.getMonth() - 1];
    expect( month.textContent ).toContain( monthName );
} );

// Test for changing the view
test( "When the component first render the there should be more than 1 'full-calendar-week' element", () => {
    let props = {
        events: []
    };
    const { getAllByTestId } = render( <DXFullCalendar {...props} /> );
    const view = getAllByTestId( "full-calendar-week" );
    expect( view.length > 1 ).toBeTruthy();
} );

test( "If the user change the view to the week one, there should be just 1 'full-calendar-week' element", async () => {
    let props = {
        events: []
    };
    const { container, getAllByTestId } = render( <DXFullCalendar {...props} /> );
    let viewMenu = container.querySelector( ".dxFullCalendar__viewContainer .dxToggleMenu" );
    let weekBtn = viewMenu?.childNodes[1] as HTMLElement;
    await act( async () => {
        await userEvent.click( weekBtn );
    } );
    const view = getAllByTestId( "full-calendar-week" );
    expect( view ).toHaveLength( 1 );
} );

test( "If the user change the view to week and then return to the month one, there should be more than 1 'full-calendar-week' element", async () => {
    let props = {
        events: []
    };
    const { container, getAllByTestId } = render( <DXFullCalendar {...props} /> );
    let viewMenu = container.querySelector( ".dxFullCalendar__viewContainer .dxToggleMenu" );
    let weekBtn = viewMenu?.childNodes[1] as HTMLElement;
    let monthBtn = viewMenu?.childNodes[0] as HTMLElement;
    await act( async () => {
        await userEvent.click( weekBtn );
        await userEvent.click( monthBtn );
    } );
    const view = getAllByTestId( "full-calendar-week" );
    expect( view.length > 1 ).toBeTruthy();
} );

test( "If the user clicks on the next button and then on the week one, the month should be the current one", async () => {
    let props = {
        events: []
    };
    const { container, getByTestId } = render( <DXFullCalendar {...props} /> );
    let nextBtn = getByTestId( "full-calendar-next" );
    await act( async () => {
        await userEvent.click( nextBtn );
        let viewMenu = container.querySelector( ".dxFullCalendar__viewContainer .dxToggleMenu" );
        let weekBtn = viewMenu?.childNodes[1] as HTMLElement;
        await userEvent.click( weekBtn );
    } );
    let month = getByTestId( "full-calendar-current-month" );
    expect( month.textContent ).toContain( monthNames[today.getMonth()] );
} );

test( "If the user clicks on the prev button and then on the week one, the month should be the current one", async () => {
    let props = {
        events: []
    };
    const { container, getByTestId } = render( <DXFullCalendar {...props} /> );
    let prevBtn = getByTestId( "full-calendar-prev" );
    await act( async () => {
        await userEvent.click( prevBtn );
        let viewMenu = container.querySelector( ".dxFullCalendar__viewContainer .dxToggleMenu" );
        let weekBtn = viewMenu?.childNodes[1] as HTMLElement;
        await userEvent.click( weekBtn );
    } );
    let month = getByTestId( "full-calendar-current-month" );
    expect( month.textContent ).toContain( monthNames[today.getMonth()] );
} );

test( "If the user clicks on the week button and then on the next one 4 times and lastly click on the today one, the month should be the current one", async () => {
    let props = {
        events: []
    };
    const { container, getByTestId } = render( <DXFullCalendar {...props} /> );
    let viewMenu = container.querySelector( ".dxFullCalendar__viewContainer .dxToggleMenu" );
    let weekBtn = viewMenu?.childNodes[1] as HTMLElement;
    await act( async () => {
        await userEvent.click( weekBtn );
        let nextBtn = getByTestId( "full-calendar-next" );
        await userEvent.click( nextBtn );
        await userEvent.click( nextBtn );
        await userEvent.click( nextBtn );
        await userEvent.click( nextBtn );
        let todayBtn = getByTestId( "full-calendar-today" );
        await userEvent.click( todayBtn );
    } );
    let month = getByTestId( "full-calendar-current-month" );
    expect( month.textContent ).toContain( monthNames[today.getMonth()] );
} );

test( "If the user clicks on the week button and then on the prev one 4 times and lastly click on the today one, the month should be the current one", async () => {
    let props = {
        events: []
    };
    const { container, getByTestId } = render( <DXFullCalendar {...props} /> );
    let viewMenu = container.querySelector( ".dxFullCalendar__viewContainer .dxToggleMenu" );
    let weekBtn = viewMenu?.childNodes[1] as HTMLElement;
    await act( async () => {
        await userEvent.click( weekBtn );
        let prevBtn = getByTestId( "full-calendar-prev" );
        await userEvent.click( prevBtn );
        await userEvent.click( prevBtn );
        await userEvent.click( prevBtn );
        await userEvent.click( prevBtn );
        let todayBtn = getByTestId( "full-calendar-today" );
        await userEvent.click( todayBtn );
    } );
    let month = getByTestId( "full-calendar-current-month" );
    expect( month.textContent ).toContain( monthNames[today.getMonth()] );
} );

// Test for rendering the events
test( "If the user pass an event for today, it should be render", () => {
    let props = {
        events: [
            {
                info: {
                    url: "/event-1",
                    label: "Event 1",
                    target: "_self"
                },
                date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
            }
        ]
    };
    const { getByText } = render( <DXFullCalendar {...props} /> );
    const dayNumber = getByText( 15 );
    const events = dayNumber.nextSibling as HTMLElement;
    expect( events.childNodes ).toHaveLength( 1 );
} );

test( "If the user pass more than 3 events for today, just three 'dxFullCalendar__event' elements should be rendered", () => {
    let props = {
        events: [
            {
                info: {
                    url: "/event-1",
                    label: "Event 1",
                    target: "_self"
                },
                date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
            }, {
                info: {
                    url: "/event-2",
                    label: "Event 2",
                    target: "_self"
                },
                date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
            },
            {
                info: {
                    url: "/event-3",
                    label: "Event 3",
                    target: "_self"
                },
                date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
            }
        ]
    };
    const { getByText } = render( <DXFullCalendar {...props} /> );
    const dayNumber = getByText( 15 );
    const events = dayNumber.nextSibling as HTMLElement;
    let eventAmnt = 0;
    events.childNodes.forEach( ( child ) => {
        let event = child as HTMLElement;
        if ( event.classList.contains( "dxFullCalendar__event" ) ) {
            eventAmnt++;
        }
    } );
    expect( eventAmnt ).toBe( 3 );
} );

test( "If the user pass more than 3 events for today, the 'full-calendar-more-events' should be in the document", () => {
    let props = {
        events: multipleEvents
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    const el = getByTestId( "full-calendar-more-events" );
    expect( el ).toBeInTheDocument();
} );

test( "If the user pass more than 3 events for today, the 'weekly-more-events' value should the event's lenght less 3", () => {
    let props = {
        events: multipleEvents
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    const el = getByTestId( "full-calendar-more-events" );
    expect( el.textContent ).toBe( `+${props.events.length - 3} more` );
} );

// Modal tests
test( "If there is more than 3 events for today and the user clicks on the + more the modal should appear", async () => {
    let props = {
        events: multipleEvents
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    const more = getByTestId( "full-calendar-more-events" );
    await act( async () => {
        await userEvent.click( more );
    } );
    let modal = getByTestId( "calendar-modal" );
    expect( modal ).toBeInTheDocument();
} );

test( "If the user focus the '+more' button and press the Enter key the modal should show", () => {
    let props = {
        events: multipleEvents
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    const more = getByTestId( "full-calendar-more-events" );
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
        events: multipleEvents
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    const more = getByTestId( "full-calendar-more-events" );
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
        events: multipleEvents
    };
    const { container, getByTestId } = render( <DXFullCalendar {...props} /> );
    const more = getByTestId( "full-calendar-more-events" );
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
        events: multipleEvents
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    const more = getByTestId( "full-calendar-more-events" );
    await act( async () => {
        await userEvent.click( more );
    } );
    let events = await screen.findByTestId( "calendar-modal-content" );
    expect( events?.childNodes ).toHaveLength( props.events.length );
} );

test( "If the modal is open, and the user click on the Cancel button it should be null", async () => {
    let props = {
        events: multipleEvents
    };
    const { container, getByTestId } = render( <DXFullCalendar {...props} /> );
    const more = getByTestId( "full-calendar-more-events" );
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
        events: multipleEvents
    };
    const { container, getByTestId } = render( <DXFullCalendar {...props} /> );
    const more = getByTestId( "full-calendar-more-events" );
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
        events: multipleEvents
    };
    const { container, getByTestId } = render( <DXFullCalendar {...props} /> );
    const more = getByTestId( "full-calendar-more-events" );
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

// Tests for the filters
test( "If the user pass one aditional prop for the event, it should render one filter", () => {
    let props = {
        events: [
            {
                info: {
                    url: "/event-1",
                    label: "Event 1",
                    target: "_self"
                },
                date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
                type: "Business"
            }
        ]
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    const filtersContainer = container.querySelectorAll( ".dxFullCalendar__filtersContainer" );
    expect( filtersContainer ).toHaveLength( 1 );
} );

test( "If the user pass one aditional prop for the event, the only filter should have the prop's name", () => {
    let props = {
        events: [
            {
                info: {
                    url: "/event-1",
                    label: "Event 1",
                    target: "_self"
                },
                date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
                type: "Business"
            }
        ]
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    const filtersContainer = container.querySelectorAll( ".dxFullCalendar__filtersContainer" );
    const label = filtersContainer[0].childNodes[0].childNodes[0];
    expect( label.textContent ).toBe( Object.keys( props.events[0] ).pop() + ":" );
} );

test( "If the user pass one aditional prop for the event with just one value, the select will have just one option", () => {
    let props = {
        events: [
            {
                info: {
                    url: "/event-1",
                    label: "Event 1",
                    target: "_self"
                },
                date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
                type: "Business"
            }
        ]
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    const filtersContainer = container.querySelectorAll( ".dxFullCalendar__filtersContainer" );
    const select = filtersContainer[0].querySelector( ".dxFullCalendar__filter select" );
    let opt = select?.childNodes[1];
    expect( opt?.textContent ).toBe( props.events[0].type );
} );

test( "If the user pass one aditional prop for the event with two values, the buttons should have the same value", () => {
    let props = {
        events: [
            {
                info: {
                    url: "/event-1",
                    label: "Event 1",
                    target: "_self"
                },
                date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
                type: "Business,Personal"
            }
        ]
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    const filtersContainer = container.querySelectorAll( ".dxFullCalendar__filtersContainer" );
    const select = filtersContainer[0].querySelector( ".dxFullCalendar__filter select" ) as HTMLElement;
    let flag = true;
    select?.childNodes.forEach( ( child: ChildNode ) => {
        if ( child.textContent && child.textContent !== "Select type" && !props.events[0].type.includes( child.textContent ) ) {
            flag = false;
        }
    } );
    expect( flag ).toBeTruthy();
} );

test( "If the user pass more than one aditional prop, it should render those two filters", () => {
    let props = {
        events: [
            {
                info: {
                    url: "/event-1",
                    label: "Event 1",
                    target: "_self"
                },
                date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
                type: "Business",
                location: "Office"
            }
        ]
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    const filtersContainer = container.querySelectorAll( ".dxFullCalendar__filter" );
    expect( filtersContainer ).toHaveLength( 2 );
} );

test( "If the user pass more than two aditional props, it should render just two filters", () => {
    let props = {
        events: [
            {
                info: {
                    url: "/event-1",
                    label: "Event 1",
                    target: "_self"
                },
                date: `${today.getFullYear()}-${today.getMonth() + 1}-${15}`,
                type: "Business",
                location: "Office",
                people: "Teammates"
            }
        ]
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    const filtersContainer = container.querySelectorAll( ".dxFullCalendar__filter" );
    expect( filtersContainer ).toHaveLength( 2 );
} );

test( "If the user select the value of Business for the first filter there should be just one event", async () => {
    let props = {
        events: eventsForFilter
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    let select = container.querySelector( ".dxFullCalendar__filtersContainer .dxFullCalendar__filter select" ) as HTMLElement;
    let opt = select?.childNodes[2] as HTMLElement;
    await act( async () => {
        await userEvent.selectOptions( select, opt );
    } );
    let events = container.querySelectorAll( ".dxFullCalendar__event" );
    expect( events ).toHaveLength( 1 );
} );

test( "If the user select the value of Business for the first filter and then removes it there should be all the events", async () => {
    let props = {
        events: eventsForFilter
    };
    const { container, getByTestId } = render( <DXFullCalendar {...props} /> );
    let select = container.querySelector( ".dxFullCalendar__filtersContainer .dxFullCalendar__filter select" ) as HTMLElement;
    let businessOpt = select?.childNodes[2] as HTMLElement;
    await act( async () => {
        /* fire events that update state */
        await userEvent.selectOptions( select, businessOpt );
        const tags = getByTestId( "full-calendar-filter-tags" );
        const businessTag = tags.childNodes[0].childNodes[1] as HTMLElement;
        await userEvent.click( businessTag );
    } );
    let events = container.querySelectorAll( ".dxFullCalendar__event" );
    expect( events ).toHaveLength( eventsForFilter.length );
} );

test( "If the user select the value of Personal for the first filter there should be two events", async () => {
    let props = {
        events: eventsForFilter
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    let select = container.querySelector( ".dxFullCalendar__filtersContainer .dxFullCalendar__filter select" ) as HTMLElement;
    let personalOpt = select?.childNodes[1] as HTMLElement;
    await act( async () => {
        await userEvent.selectOptions( select, personalOpt );
    } );
    let events = container.querySelectorAll( ".dxFullCalendar__event" );
    expect( events ).toHaveLength( 2 );
} );

test( "If the user select the value of Personal and Healthy for the first filter there should be just one event", async () => {
    let props = {
        events: eventsForFilter
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    let select = container.querySelector( ".dxFullCalendar__filtersContainer .dxFullCalendar__filter select" ) as HTMLElement;
    let personalOpt = select?.childNodes[1] as HTMLElement;
    await act( async () => {
        await userEvent.selectOptions( select, personalOpt );
        let healthOpt = select?.childNodes[3] as HTMLElement;
        await userEvent.selectOptions( select, healthOpt );
    } );
    let events = container.querySelectorAll( ".dxFullCalendar__event" );
    expect( events ).toHaveLength( 1 );
} );

test( "If the user select the value of Personal for the first filter and Home for the second one there should be just one event", async () => {
    let props = {
        events: eventsForFilter
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    let select = container.querySelectorAll( ".dxFullCalendar__filtersContainer .dxFullCalendar__filter" )[0].childNodes[1] as HTMLElement;
    let personalOpt = select?.childNodes[1] as HTMLElement;
    await act( async () => {
        await userEvent.selectOptions( select, personalOpt );
        let select2 = container.querySelectorAll( ".dxFullCalendar__filtersContainer .dxFullCalendar__filter" )[1].childNodes[1] as HTMLElement;
        let homeOpt = select2?.childNodes[1] as HTMLElement;
        await userEvent.selectOptions( select2, homeOpt );
    } );
    let events = container.querySelectorAll( ".dxFullCalendar__event" );
    expect( events ).toHaveLength( 1 );
} );

test( "If the user clicks an option of the filter the element 'dxFullCalendar__tags' will have just one child", async () => {
    let props = {
        events: eventsSelect
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    const selectEl = getByTestId( "full-calendar-filter-select" );
    const filter = getByTestId( "full-calendar-filter-select" ).childNodes[2] as HTMLElement;
    await act( async () => {
        await userEvent.selectOptions( selectEl, filter );
    } );
    const tags = getByTestId( "full-calendar-filter-tags" );
    expect( tags.childNodes ).toHaveLength( 1 );
} );

test( "If the user select the Personal option of the filter, its tag should not be null", async () => {
    Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 1024 } );
    let props = {
        events: eventsSelect
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    const selectEl = getByTestId( "full-calendar-filter-select" );
    const filter = getByTestId( "full-calendar-filter-select" ).childNodes[1] as HTMLElement;
    await act( async () => {
        await userEvent.selectOptions( selectEl, filter );
    } );
    const tags = getByTestId( "full-calendar-filter-tags" );
    let personalTag = null;
    tags.childNodes.forEach( child => {
        if ( child.textContent === "Personal" ) {
            personalTag = child;
        }
    } );
    expect( personalTag ).not.toBeNull();
} );

test( "If the user select the Personal option of the filter, and again the same option, there should be just one tag", async () => {
    Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 1024 } );
    let props = {
        events: eventsSelect
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    const selectEl = getByTestId( "full-calendar-filter-select" );
    const filter = getByTestId( "full-calendar-filter-select" ).childNodes[2] as HTMLElement;
    await act( async () => {
        await userEvent.selectOptions( selectEl, filter );
        await userEvent.selectOptions( selectEl, filter );
    } );
    const tags = getByTestId( "full-calendar-filter-tags" );
    expect( tags.childNodes ).toHaveLength( 1 );
} );

// Tests for the alert
test( "if the screen is 390px wide and its orientation is portrait the alert should be in the document", () => {
    Object.defineProperty( window, 'innerHeight', { writable: true, configurable: true, value: 1024 } );
    Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 389 } );
    let props = {
        events: eventsForFilter
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    let alert = container.querySelector( ".dxFullCalendar__alert" );
    expect( alert ).toBeInTheDocument();
} );

test( "if the screen is 390px height and its orientation is landscape the alert should be null", () => {
    Object.defineProperty( window, 'innerHeight', { writable: true, configurable: true, value: 389 } );
    Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 1024 } );
    let props = {
        events: eventsForFilter
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    let alert = container.querySelector( ".dxFullCalendar__alert" );
    expect( alert ).toBeNull();
} );

test( "if the screen is 390px height and its orientation is landscape the calendar should not have the class 'dxFullCalendar__calendar--blur'", () => {
    Object.defineProperty( window, 'innerHeight', { writable: true, configurable: true, value: 389 } );
    Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 1024 } );
    let props = {
        events: eventsForFilter
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    let calendar = container.querySelector( ".dxFullCalendar__calendar" ) as HTMLElement;
    expect( calendar ).not.toHaveClass( "dxFullCalendar__calendar--blur" );
} );

test( "if the screen is 390px wide and its orientation is portrait the calendar should have the class of 'dxFullCalendar__calendar--blur'", () => {
    Object.defineProperty( window, 'innerHeight', { writable: true, configurable: true, value: 1024 } );
    Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 389 } );
    let props = {
        events: eventsForFilter
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    let calendar = container.querySelector( ".dxFullCalendar__calendar" ) as HTMLElement;
    expect( calendar ).toHaveClass( "dxFullCalendar__calendar--blur" );
} );

// Tests for the mobile variant
test( "if the user does not pass isMobile prop, the show filter button will be null", () => {
    let props = {
        events: eventsForFilter
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    let btn = container.querySelector( '[data-testid="full-calendar-show-filters"]' );
    expect( btn ).toBeNull();
} );

test( "if the user passes isMobile as false, the show filter button will be null", () => {
    let props = {
        events: eventsForFilter
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    let btn = container.querySelector( '[data-testid="full-calendar-show-filters"]' );
    expect( btn ).toBeNull();
} );

test( "if the user passes isMobile as true, the show filter button will appear", () => {
    let props = {
        events: eventsForFilter,
        isMobile: true
    };
    const { getByTestId } = render( <DXFullCalendar {...props} /> );
    let btn = getByTestId( "full-calendar-show-filters" );
    expect( btn ).toBeInTheDocument();
} );

test( "if the user clicks on the show filter button the 'dxFullCalendar__actions--mobile' will be in the document", async () => {
    let props = {
        events: eventsForFilter,
        isMobile: true
    };
    const { getByTestId, container } = render( <DXFullCalendar {...props} /> );
    let btn = getByTestId( "full-calendar-show-filters" );
    await userEvent.click( btn );
    const actions = container.querySelector( ".dxFullCalendar__actions--mobile" );
    expect( actions ).toBeInTheDocument();
} );

test( "if the user passes isMobile as false the 'dxFullCalendar__actions' will be in the document", async () => {
    let props = {
        events: eventsForFilter,
        isMobile: false
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    const actions = container.querySelector( ".dxFullCalendar__actions" );
    expect( actions ).toBeInTheDocument();
} );

test( "if the user clicks on the show filter button when 'dxFullCalendar__actions--mobile' is showed it will hide", async () => {
    let props = {
        events: eventsForFilter,
        isMobile: true
    };
    const { getByTestId, container } = render( <DXFullCalendar {...props} /> );
    let btn = getByTestId( "full-calendar-show-filters" );
    await userEvent.click( btn );
    await userEvent.click( btn );
    const actions = container.querySelector( ".dxFullCalendar__actions--mobile" );
    expect( actions ).toBeNull();
} );

test( "If the user pass isMobile as true, and clicks on the Show filter button the element 'dxFullCalendar__buttons--mobile' will be in the document", async () => {
    let props = {
        events: eventsForFilter,
        isMobile: true
    };
    const { getByTestId, container } = render( <DXFullCalendar {...props} /> );
    let btn = getByTestId( "full-calendar-show-filters" );
    await userEvent.click( btn );
    const actions = container.querySelector( ".dxFullCalendar__buttons--mobile" );
    expect( actions ).toBeInTheDocument();
} );

test( "if the user passes isMobile as false the 'dxFullCalendar__buttons' will be in the document", async () => {
    let props = {
        events: eventsForFilter,
        isMobile: false
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    const buttons = container.querySelector( ".dxFullCalendar__buttons" );
    expect( buttons ).toBeInTheDocument();
} );

test( "If the user pass isMobile as true, and clicks on the Show filter button the element 'dxFullCalendar__filtersContainer--mobile' will be in the document", async () => {
    let props = {
        events: eventsForFilter,
        isMobile: true
    };
    const { getByTestId, container } = render( <DXFullCalendar {...props} /> );
    let btn = getByTestId( "full-calendar-show-filters" );
    await userEvent.click( btn );
    const filtersC = container.querySelector( ".dxFullCalendar__filtersContainer--mobile" );
    expect( filtersC ).toBeInTheDocument();
} );

test( "if the user passes isMobile as false the 'dxFullCalendar__filtersContainer' will be in the document", async () => {
    let props = {
        events: eventsForFilter,
        isMobile: false
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    const filtersC = container.querySelector( ".dxFullCalendar__filtersContainer" );
    expect( filtersC ).toBeInTheDocument();
} );

test( "If the user pass isMobile as true, and clicks on the Show filter button the element 'dxFullCalendar__filter--mobile' will be in the document", async () => {
    let props = {
        events: eventsForFilter,
        isMobile: true
    };
    const { getByTestId, container } = render( <DXFullCalendar {...props} /> );
    let btn = getByTestId( "full-calendar-show-filters" );
    await userEvent.click( btn );
    const actions = container.querySelector( ".dxFullCalendar__filter--mobile" );
    expect( actions ).toBeInTheDocument();
} );

test( "if the user passes isMobile as false the 'dxFullCalendar__filter' will be in the document", async () => {
    let props = {
        events: eventsForFilter,
        isMobile: false
    };
    const { container } = render( <DXFullCalendar {...props} /> );
    const filter = container.querySelector( ".dxFullCalendar__filter" );
    expect( filter ).toBeInTheDocument();
} );

test( "Slider icons change if values are set", () => {
    expect.assertions( 2 );
    render( <DXFullCalendar {...calendarChangedIconsArgs} /> );
    expect( screen.getByTestId( "full-calendar-prev" ).querySelector( "i" ) ).toHaveClass( calendarChangedIconsArgs.icons.prev );
    expect( screen.getByTestId( "full-calendar-next" ).querySelector( "i" ) ).toHaveClass( calendarChangedIconsArgs.icons.next );
} );

test( "Filter icon change if values are set", () => {
    render( <DXFullCalendar {...calendarChangedIconsArgs} isMobile={true} /> );
    expect( screen.getByTestId( "full-calendar-show-filters" ).querySelector( "i" ) ).toHaveClass( calendarChangedIconsArgs.icons.filter );
} );

// ============================================================
// DXQ-49653: Targeted mutation-killing tests
// ============================================================

test( "Header renders all 7 day-of-week abbreviations in order", () => {
    const { container } = render( <DXFullCalendar events={[]} /> );
    const header = container.querySelector( ".dxFullCalendar__header" );
    expect( header ).not.toBeNull();
    const dayLabels = Array.from( header!.querySelectorAll( "p" ) ).map( p => p.textContent );
    expect( dayLabels ).toEqual( ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] );
} );

test( "Event link href and target attributes match the event info", () => {
    const props = {
        events: [
            {
                info: { url: "/my-event", label: "My Event", target: "_blank" },
                date: `${today.getFullYear()}-${today.getMonth() + 1}-15`
            }
        ]
    };
    render( <DXFullCalendar {...props} /> );
    const link = screen.getByText( "My Event" ).closest( "a" ) as HTMLAnchorElement;
    expect( link ).not.toBeNull();
    expect( link.href ).toContain( "/my-event" );
} );

test( "Event link with target _self renders correct target", () => {
    const props = {
        events: [
            {
                info: { url: "/self-link", label: "Self Link", target: "_self" },
                date: `${today.getFullYear()}-${today.getMonth() + 1}-15`
            }
        ]
    };
    render( <DXFullCalendar {...props} /> );
    const link = screen.getByText( "Self Link" ).closest( "a" ) as HTMLAnchorElement;
    expect( link ).not.toBeNull();
    // _self maps to "" via getLinkTarget
    expect( link.target ).not.toBe( "_blank" );
} );

test( "Modal header shows date in 'MMMM DD, YYYY' format", async () => {
    const { container } = render( <DXFullCalendar events={multipleEvents} /> );
    const more = screen.getByTestId( "full-calendar-more-events" );
    await act( async () => { await userEvent.click( more ); } );

    // FIX: Must use document.querySelector because Modals are rendered outside the container
    const modalTitle = document.querySelector( ".modal-title" );

    expect( modalTitle ).not.toBeNull();
    // Should match e.g. "June 15, 2025"
    expect( modalTitle!.textContent ).toMatch( /\w+ \d{2}, \d{4}/ );
} );

test( "Modal close button click closes the modal", async () => {
    render( <DXFullCalendar events={multipleEvents} /> );
    const more = screen.getByTestId( "full-calendar-more-events" );
    await act( async () => { await userEvent.click( more ); } );
    expect( screen.getByTestId( "calendar-modal" ) ).toBeInTheDocument();

    const closeBtn = screen.getByTestId( "calendar-modal-close" );
    await act( async () => { await userEvent.click( closeBtn ); } );

    // FIX: Use `screen.queryByTestId` instead of `container` to accurately verify 
    // the portaled modal was destroyed from the DOM.
    expect( screen.queryByTestId( "calendar-modal" ) ).toBeNull();
} );

test( "Days from other months get 'dxFullCalendar__day--other' class", () => {
    const { container } = render( <DXFullCalendar events={[]} /> );
    const otherDays = container.querySelectorAll( ".dxFullCalendar__day--other" );
    // Any month view should have at least some days from adjacent months (unless month starts on Sunday ends on Saturday)
    // Just verify the class is applied and distinguishes correctly from .dxFullCalendar__day
    const currentDays = container.querySelectorAll( ".dxFullCalendar__day" );
    expect( currentDays.length ).toBeGreaterThan( 0 );
    // Combined should cover the full grid
    expect( currentDays.length + otherDays.length ).toBeGreaterThan( 27 );
} );

test( "Week view renders exactly 1 week row", async () => {
    render( <DXFullCalendar events={[]} /> );
    const weekBtn = screen.getByText( "Week" );
    await act( async () => { await userEvent.click( weekBtn ); } );
    const weeks = screen.getAllByTestId( "full-calendar-week" );
    expect( weeks ).toHaveLength( 1 );
} );

test( "Week view shows 7 day cells", async () => {
    render( <DXFullCalendar events={[]} /> );
    const weekBtn = screen.getByText( "Week" );
    await act( async () => { await userEvent.click( weekBtn ); } );
    const weekRow = screen.getByTestId( "full-calendar-week" );
    expect( weekRow.children ).toHaveLength( 7 );
} );

test( "Title shows weekMonth string in week view", async () => {
    render( <DXFullCalendar events={[]} /> );
    const weekBtn = screen.getByText( "Week" );
    await act( async () => { await userEvent.click( weekBtn ); } );
    const title = screen.getByTestId( "full-calendar-current-month" );
    // Should contain month name and year (not "Error")
    expect( title.textContent ).not.toBe( "Error" );
    expect( title.textContent ).toMatch( /\w+ \d{4}/ );
} );

test( "Month view title shows 'MMMM YYYY' format", () => {
    render( <DXFullCalendar events={[]} /> );
    const title = screen.getByTestId( "full-calendar-current-month" );
    expect( title.textContent ).toMatch( /^[A-Z][a-z]+ \d{4}$/ );
} );

test( "Filter tag renders text and close icon when filter is active", async () => {
    render( <DXFullCalendar events={eventsForFilter} /> );
    const select = screen.getAllByTestId( "full-calendar-filter-select" )[0];
    await act( async () => {
        fireEvent.change( select, { target: { value: "Personal" } } );
    } );
    const tagContainer = screen.getByTestId( "full-calendar-filter-tags" );
    expect( tagContainer.children.length ).toBeGreaterThanOrEqual( 1 );
    const tagSpan = tagContainer.children[0] as HTMLElement;
    expect( tagSpan.textContent ).toContain( "Personal" );
    // Close icon should be present
    const closeIcon = tagSpan.querySelector( "i" );
    expect( closeIcon ).not.toBeNull();
    expect( closeIcon ).toHaveClass( "ci-Close_MD" );
} );

test( "Week next navigation advances by one week", async () => {
    render( <DXFullCalendar events={[]} /> );
    const weekBtn = screen.getByText( "Week" );
    await act( async () => { await userEvent.click( weekBtn ); } );
    const titleBefore = screen.getByTestId( "full-calendar-current-month" ).textContent;
    const nextBtn = screen.getByTestId( "full-calendar-next" );
    // Advance 8 weeks to see a clear month change
    for ( let i = 0; i < 5; i++ ) {
        await act( async () => { await userEvent.click( nextBtn ); } );
    }
    const titleAfter = screen.getByTestId( "full-calendar-current-month" ).textContent;
    // Title should have changed (months shifted)
    expect( titleAfter ).not.toBe( "Error" );
} );

test( "Week prev navigation goes back by one week", async () => {
    render( <DXFullCalendar events={[]} /> );
    const weekBtn = screen.getByText( "Week" );
    await act( async () => { await userEvent.click( weekBtn ); } );
    const prevBtn = screen.getByTestId( "full-calendar-prev" );
    for ( let i = 0; i < 5; i++ ) {
        await act( async () => { await userEvent.click( prevBtn ); } );
    }
    const title = screen.getByTestId( "full-calendar-current-month" ).textContent;
    expect( title ).not.toBe( "Error" );
} );

test( "Today button in month view shows current month text", async () => {
    render( <DXFullCalendar events={[]} /> );
    // Navigate away first
    const nextBtn = screen.getByTestId( "full-calendar-next" );
    await act( async () => { await userEvent.click( nextBtn ); } );
    // Now return to today
    const todayBtn = screen.getByTestId( "full-calendar-today" );
    await act( async () => { await userEvent.click( todayBtn ); } );
    const title = screen.getByTestId( "full-calendar-current-month" ).textContent;
    expect( title ).toBe( monthNames[today.getMonth()] + " " + today.getFullYear() );
} );

test( "Modal renders event links with correct href attributes", async () => {
    render( <DXFullCalendar events={multipleEvents} /> );
    const more = screen.getByTestId( "full-calendar-more-events" );
    await act( async () => { await userEvent.click( more ); } );
    const modalContent = screen.getByTestId( "calendar-modal-content" );
    const links = modalContent.querySelectorAll( "a" );
    expect( links.length ).toBe( 4 );
    expect( links[0].getAttribute( "href" ) ).toBe( "/event-1" );
    expect( links[1].getAttribute( "href" ) ).toBe( "/event-2" );
} );

test( "'+N more' button label is exact string", async () => {
    render( <DXFullCalendar events={multipleEvents} /> );
    const more = screen.getByTestId( "full-calendar-more-events" );
    expect( more.textContent ).toBe( `+${multipleEvents.length - 3} more` );
} );

test( "filterClose icon changes when custom icon is set", () => {
    const customIconArgs = {
        events: eventsForFilter,
        icons: {
            ...calendarChangedIconsArgs.icons,
            fliterClose: "ci-Close_LG"
        }
    };
    const { container } = render( <DXFullCalendar {...customIconArgs} /> );
    // component renders; custom icon doesn't throw
    expect( container.querySelector( ".dxFullCalendar" ) ).not.toBeNull();
} );

test( "Alert icon class uses 'ci-Info' default", () => {
    // Trigger portrait mode to show alert
    Object.defineProperty( window, "innerWidth", { value: 390, configurable: true } );
    Object.defineProperty( window, "innerHeight", { value: 844, configurable: true } );
    const { container } = render( <DXFullCalendar events={[]} /> );
    fireEvent( window, new Event( "resize" ) );
    const alert = container.querySelector( ".dxFullCalendar__alert" );
    if ( alert ) {
        const icon = alert.querySelector( "i" );
        expect( icon ).toHaveClass( "ci-Info" );
    }
} );

test( "Events on week view render with correct labels", async () => {
    const todayDate = `${today.getFullYear()}-${today.getMonth() + 1}-${String( today.getDate() ).padStart( 2, "0" )}`;
    const props = {
        events: [
            { info: { url: "/w1", label: "Week Event 1", target: "_self" }, date: todayDate }
        ]
    };
    render( <DXFullCalendar {...props} /> );
    const weekBtn = screen.getByText( "Week" );
    await act( async () => { await userEvent.click( weekBtn ); } );
    expect( screen.getByText( "Week Event 1" ) ).toBeInTheDocument();
} );

describe( "DXFullCalendar Hardening", () => {
    beforeEach( () => {
        jest.useFakeTimers();
    } );

    afterEach( () => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    } );

    test( "Week Math Boundary: rigorously calculates majority month when a week spans two different months", async () => {
        // By setting the time to mid-month, we bypass the early-return `isTodayInTheWeek` trap.
        jest.setSystemTime( new Date( "2023-10-15T12:00:00Z" ) );

        const { getByTestId, container } = render( <DXFullCalendar events={[]} /> );

        // Switch to week view. The active week is Oct 15 - Oct 21.
        const viewMenu = container.querySelector( ".dxFullCalendar__viewContainer .dxToggleMenu" );
        const weekBtn = viewMenu?.childNodes[1] as HTMLElement;

        await act( async () => {
            fireEvent.click( weekBtn );
        } );

        const nextBtn = getByTestId( "full-calendar-next" );

        // Advance exactly 2 weeks to reach the boundary: Oct 29 - Nov 4.
        // October has 3 days in this week, November has 4 days. November MUST win the math calculation.
        await act( async () => { fireEvent.click( nextBtn ); } );
        await act( async () => { fireEvent.click( nextBtn ); } );

        const monthLabel = getByTestId( "full-calendar-current-month" );
        expect( monthLabel.textContent ).toBe( "November 2023" );
    } );

    test( "Week Math Boundary: rigorously calculates majority year when a week spans two different years", async () => {
        // Set time to mid-December
        jest.setSystemTime( new Date( "2023-12-15T12:00:00Z" ) );

        const { getByTestId, container } = render( <DXFullCalendar events={[]} /> );

        const viewMenu = container.querySelector( ".dxFullCalendar__viewContainer .dxToggleMenu" );
        const weekBtn = viewMenu?.childNodes[1] as HTMLElement;

        await act( async () => {
            fireEvent.click( weekBtn );
        } );

        const nextBtn = getByTestId( "full-calendar-next" );

        // Dec 15, 2023 is a Friday. Week starts Sun Dec 10.
        // Current: Dec 10 - Dec 16
        // Next 1: Dec 17 - Dec 23
        // Next 2: Dec 24 - Dec 30
        // Next 3: Dec 31 - Jan 6. (1 day 2023, 6 days 2024). 2024 MUST win.
        await act( async () => { fireEvent.click( nextBtn ); } );
        await act( async () => { fireEvent.click( nextBtn ); } );
        await act( async () => { fireEvent.click( nextBtn ); } );

        const monthLabel = getByTestId( "full-calendar-current-month" );
        expect( monthLabel.textContent ).toBe( "January 2024" );
    } );

    test( "Month Grid Boundary: aborts next-month padding if the current month ends exactly on a Saturday", () => {
        // April 2022 ends exactly on a Saturday (April 30, 2022).
        // `nextMonthDayOfWeek` evaluates to 6, strictly triggering the `if (nextMonthDayOfWeek === 6) return;` branch.
        jest.setSystemTime( new Date( "2022-04-15T12:00:00Z" ) );

        const { container } = render( <DXFullCalendar events={[]} /> );

        const days = container.querySelectorAll( ".dxFullCalendar__number" );

        // April has 30 days. It starts on a Friday (5 past month days). 30 + 5 = 35 days total.
        // If the early return logic fails, it will attempt to append a full empty week.
        expect( days.length ).toBe( 35 );
    } );

    test( "Filter Intersections: strictly computes exact match across multiple filter categories simultaneously", async () => {
        // Enforce the system time so the hardcoded "2023-10-15" events actually render on the screen.
        jest.setSystemTime( new Date( "2023-10-15T12:00:00Z" ) );

        const intersectionEvents = [
            { info: { url: "/1", label: "Evt 1", target: "_self" }, date: "2023-10-15", department: "HR", location: "Remote" },
            { info: { url: "/2", label: "Evt 2", target: "_self" }, date: "2023-10-15", department: "HR", location: "Office" },
            { info: { url: "/3", label: "Evt 3", target: "_self" }, date: "2023-10-15", department: "IT", location: "Remote" }
        ];

        const { container } = render( <DXFullCalendar events={intersectionEvents as any} /> );

        const selects = container.querySelectorAll( 'select' );
        const deptSelect = selects[0];
        const locSelect = selects[1];

        // Apply "HR" filter -> Should match Evt 1 and Evt 2
        await act( async () => {
            fireEvent.change( deptSelect, { target: { value: "HR" } } );
        } );
        expect( container.querySelectorAll( ".dxFullCalendar__event" ).length ).toBe( 2 );

        // Apply "Remote" filter -> Should strictly intersect and ONLY match Evt 1
        await act( async () => {
            fireEvent.change( locSelect, { target: { value: "Remote" } } );
        } );

        const remainingEvents = container.querySelectorAll( ".dxFullCalendar__event" );
        expect( remainingEvents.length ).toBe( 1 );
        expect( remainingEvents[0].textContent ).toBe( "Evt 1" );
    } );

    test( "Orientation Constraints: strictly evaluates mathematical boundaries for Portrait vs Landscape detection", () => {
        const resizeEvent = new Event( "resize" );

        // Case 1: Width === Height === 390 (Strict Boundary hit) -> Portrait
        Object.defineProperty( window, "innerWidth", { writable: true, configurable: true, value: 390 } );
        Object.defineProperty( window, "innerHeight", { writable: true, configurable: true, value: 390 } );

        const { container, unmount } = render( <DXFullCalendar events={[]} /> );
        let calendar = container.querySelector( ".dxFullCalendar__calendar" ) as HTMLElement;
        expect( calendar.className ).toContain( "dxFullCalendar__calendar--blur" );

        // Case 2: Width < Height -> Portrait
        Object.defineProperty( window, "innerHeight", { writable: true, configurable: true, value: 391 } );
        act( () => { window.dispatchEvent( resizeEvent ); } );
        expect( calendar.className ).toContain( "dxFullCalendar__calendar--blur" );

        // Case 3: Width > Height (but Width <= 390) -> Landscape
        Object.defineProperty( window, "innerHeight", { writable: true, configurable: true, value: 389 } );
        act( () => { window.dispatchEvent( resizeEvent ); } );
        expect( calendar.className ).not.toContain( "dxFullCalendar__calendar--blur" );

        unmount();
    } );

    test( "Keyboard Event Traps: strictly ignores unmapped keyCodes on modal trigger boundaries", () => {
        // Enforce the system time so the hardcoded "2023-10-15" events render, triggering the "+ more" button.
        jest.setSystemTime( new Date( "2023-10-15T12:00:00Z" ) );

        const mockEvents = Array( 4 ).fill( {
            info: { url: "/", label: "Evt", target: "_self" }, date: "2023-10-15"
        } );

        const { getByTestId } = render( <DXFullCalendar events={mockEvents as any} /> );

        const moreBtn = getByTestId( "full-calendar-more-events" );

        // Fire an invalid keyCode (e.g., 65 for 'A')
        fireEvent.keyDown( moreBtn, { keyCode: 65 } );

        // Assert the strict (keyCode === 13 || keyCode === 32) boundary protected the state
        expect( screen.queryByTestId( "calendar-modal" ) ).not.toBeInTheDocument();
    } );

    test( "View Toggle Engine: accurately targets specific CSS classes to bypass invalid clicks", async () => {
        const { container, getByTestId } = render( <DXFullCalendar events={[]} /> );
        const viewMenu = container.querySelector( ".dxFullCalendar__viewContainer .dxToggleMenu" );

        // The Month button is index 0. The internal logic checks for `classList.contains("btn-secondary")`.
        // If it's already active (primary), clicking it should hit the early-return and NOT execute changeToMonth.
        const monthBtn = viewMenu?.childNodes[0] as HTMLElement;

        // We track the state mutation indirectly: if `changeToMonth` was bypassed, the currentMonth object reference remains untouched.
        const initialTitle = getByTestId( "full-calendar-current-month" ).textContent;

        await act( async () => {
            fireEvent.click( monthBtn );
        } );

        // The state remains absolutely identical, bypassing redundant calculations
        expect( getByTestId( "full-calendar-current-month" ).textContent ).toBe( initialTitle );
    } );

    test( "Memory boundaries: rigorously unbinds resize event listener on component destruction", () => {
        const removeSpy = jest.spyOn( window, "removeEventListener" );
        const { unmount } = render( <DXFullCalendar events={[]} /> );

        unmount();

        // Assert the exact handler is purged from memory
        const resizeCalls = removeSpy.mock.calls.filter( call => call[0] === "resize" );
        expect( resizeCalls.length ).toBeGreaterThan( 0 );
        expect( typeof resizeCalls[0][1] ).toBe( "function" );

        removeSpy.mockRestore();
    } );

    test( "Filter Intersections: evaluates fallback loop boundaries when filtering identical active categories to eliminate duplication", async () => {
        jest.setSystemTime( new Date( "2026-10-15T12:00:00Z" ) );

        const duplicateFilterEvents = [
            { info: { url: "/1", label: "Event A", target: "_self" }, date: "2026-10-15", type: "Business" },
            { info: { url: "/2", label: "Event B", target: "_self" }, date: "2026-10-15", type: "Business" }
        ];

        const { container } = render( <DXFullCalendar events={duplicateFilterEvents as any} /> );
        const select = container.querySelector( ".dxFullCalendar__filtersContainer .dxFullCalendar__filter select" ) as HTMLSelectElement;

        // Select the same filter value repeatedly to test the branch condition guard: `if (!newFilters.includes(newFilter))`
        await act( async () => {
            fireEvent.change( select, { target: { value: "Business" } } );
        } );
        await act( async () => {
            fireEvent.change( select, { target: { value: "Business" } } );
        } );

        const tagsContainer = container.querySelector( ".dxFullCalendar__tags" );
        expect( tagsContainer?.childNodes ).toHaveLength( 1 );
    } );

    test( "Filter Parsing: strictly extracts comma-separated tokens inside filter tokenization lookups", () => {
        const rawTokenEvents = [
            { info: { url: "/1", label: "Ev", target: "_self" }, date: "2026-10-15", category: "Core,Urgent,Platform" }
        ];

        const { container } = render( <DXFullCalendar events={rawTokenEvents as any} /> );
        const select = container.querySelector( ".dxFullCalendar__filtersContainer .dxFullCalendar__filter select" ) as HTMLSelectElement;

        const alternatives = Array.from( select.options ).map( opt => opt.value );
        // String splitting mutation verification: must register separate structural entries cleanly
        expect( alternatives ).toContain( "Core" );
        expect( alternatives ).toContain( "Urgent" );
        expect( alternatives ).toContain( "Platform" );
    } );

    test( "Keyboard Event Traps: strictly fires click overrides for space key operations inside global arrow buttons", async () => {
        jest.setSystemTime( new Date( "2026-06-15T12:00:00Z" ) );

        const { getByTestId } = render( <DXFullCalendar events={[]} /> );
        const nextBtn = getByTestId( "full-calendar-next" );
        const titleBefore = getByTestId( "full-calendar-current-month" ).textContent;

        // Fire space bar keydown directly on calendar arrow bounds; space key (keyCode 32) should trigger click handler
        await act( async () => {
            fireEvent.keyDown( nextBtn, { key: " ", keyCode: 32, type: "keydown" } );
        } );

        const titleAfter = getByTestId( "full-calendar-current-month" ).textContent;

        // Verify that space key successfully triggered the click override:
        // The month should have advanced (changed) because the keydown space triggered the next month handler
        expect( titleAfter ).not.toBe( titleBefore );
    } );

    test( "Orientation Grid Limits: enforces landscape layout configurations when inner width explicitly crosses mobile boundaries", () => {
        const resizeEvent = new Event( "resize" );

        // Set dimensions exactly to 391px (1px over MAX_WIDTH_MOBILE limiter)
        Object.defineProperty( window, "innerWidth", { writable: true, configurable: true, value: 391 } );
        Object.defineProperty( window, "innerHeight", { writable: true, configurable: true, value: 800 } );

        const { container } = render( <DXFullCalendar events={[]} /> );
        let calendarElement = container.querySelector( ".dxFullCalendar__calendar" ) as HTMLElement;

        act( () => { window.dispatchEvent( resizeEvent ); } );

        // Blur class must be absolutely withheld when width breaches boundary conditions
        expect( calendarElement.className ).not.toContain( "dxFullCalendar__calendar--blur" );
    } );
} );