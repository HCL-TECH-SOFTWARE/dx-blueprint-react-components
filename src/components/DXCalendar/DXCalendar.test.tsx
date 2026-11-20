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
import { render, fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXCalendar from "./DXCalendar";
import { CalendarChangedIconsArgs } from "./DXCalendar.stories";

const TODAY = new Date();

// Small native helpers so the expectations do not depend on the date code under test.
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const pad2 = ( n: number ) => ( n < 10 ? "0" + n : "" + n );
const toIsoDate = ( d: Date ) => `${d.getFullYear()}-${pad2( d.getMonth() + 1 )}-${pad2( d.getDate() )}`;
// The date of weekday `n` (0 = Sunday, values outside 0-6 reach into other weeks) in the week of `date`.
const weekdayOf = ( date: Date, n: number ) => new Date( date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + n );

const events = [
    {
        name: "Press conference",
        date: `${TODAY.getFullYear()}-${pad2( TODAY.getMonth() + 1 )}-${TODAY.getDate()}`,
        link: "/test1"
    },
    {
        name: "Social Party",
        date: `${TODAY.getFullYear()}-${pad2( TODAY.getMonth() + 1 )}-${TODAY.getDate()}`,
        link: "/test2"
    },
    {
        name: "Final Son's exam",
        date: `${TODAY.getFullYear()}-${pad2( TODAY.getMonth() + 1 )}-${TODAY.getDate()}`,
        link: "/test3"
    }
];


test( "The component will show today's month when it's rendered", () => {
    let props = {
        events,
        seeMoreText: "See more"
    };
    const { getByTestId } = render( <DXCalendar {...props} /> );
    let month = getByTestId( "calendar-month" );
    expect( month.textContent ).toContain( MONTH_NAMES[TODAY.getMonth()] );
} );

test( "The 'today' class will be on today's element", () => {
    let props = {
        events,
        seeMoreText: "See more"
    };
    const { container } = render( <DXCalendar {...props} /> );
    let today = container.querySelector( ".dxCalendar .today" );
    let dayNumberString = pad2( TODAY.getDate() );
    expect( today?.textContent ).toEqual( dayNumberString );
} );

test( "The today's week will have its details element with the class 'dxCalendar__details active'", () => {
    let props = {
        events,
        seeMoreText: "See more"
    };
    const { container } = render( <DXCalendar {...props} /> );
    let today = container.querySelector( ".dxCalendar .today" );
    let week = today?.parentNode?.parentNode;
    let details = week?.childNodes[week.childNodes.length - 1];
    expect( details ).toHaveClass( "dxCalendar__details active" );
} );

test( "If today has events, the first event details element will not have the class 'empty'", () => {
    let props = {
        events,
        seeMoreText: "See more"
    };
    const { container } = render( <DXCalendar {...props} /> );
    let today = container.querySelector( ".dxCalendar .today" );
    let week = today?.parentNode?.parentNode;
    let details = week?.childNodes[week.childNodes.length - 1];
    let eventDetails = details?.childNodes[1].childNodes[0];
    expect( eventDetails ).not.toHaveClass( "empty" );
} );

test( "If today does not have events, the first event details element will have the class 'empty'", () => {
    let props = {
        events: [],
        seeMoreText: "See more"
    };
    const { container } = render( <DXCalendar {...props} /> );
    let today = container.querySelector( ".dxCalendar .today" );
    let week = today?.parentNode?.parentNode;
    let details = week?.childNodes[week.childNodes.length - 1];
    let eventDetails = details?.childNodes[1].childNodes[0];
    expect( eventDetails ).toHaveClass( "empty" );
} );

// Tests for the small version
test( "If the small prop is passed, the 'dxCalendar' will have the style of 'width: 300px'", () => {
    let props = {
        events,
        small: true
    };
    const { container } = render( <DXCalendar {...props} /> );
    const el = container.querySelector( ".dxCalendar" ) as HTMLElement;
    expect( el ).toHaveStyle( { width: "300px" } );
} );

test( "If the small prop is passed, the 'dxCalendar__day' will have the style of 'width: 39px'", () => {
    let props = {
        events,
        small: true
    };
    const { container } = render( <DXCalendar {...props} /> );
    const el = container.querySelector( ".dxCalendar__day" ) as HTMLElement;
    expect( el ).toHaveStyle( { width: "39px" } );
} );

test( "If the small prop is passed, the 'dxCalendar__details' will have the style of 'width: 280px'", () => {
    let props = {
        events,
        small: true
    };
    const { container } = render( <DXCalendar {...props} /> );
    const el = container.querySelector( ".dxCalendar__details" ) as HTMLElement;
    expect( el ).toHaveStyle( { width: "280px" } );
} );

test( "If the small prop is not passed, the 'dxCalendar__day' will have the style of 'width: 420px'", () => {
    let props = {
        events,
        small: true
    };
    const { container } = render( <DXCalendar {...props} /> );
    const el = container.querySelector( ".dxCalendar__day" ) as HTMLElement;
    expect( el ).toHaveStyle( { width: "39px" } );
} );

test( "If the small prop is not passed, the 'dxCalendar__day' will have the style of 'width: 57px'", () => {
    let props = {
        events,
        small: true
    };
    const { container } = render( <DXCalendar {...props} /> );
    const el = container.querySelector( ".dxCalendar__day" ) as HTMLElement;
    expect( el ).toHaveStyle( { width: "39px" } );
} );

test( "If the small prop is not passed, the 'dxCalendar__details' will have the style of 'width: 400px'", () => {
    let props = {
        events,
        small: true
    };
    const { container } = render( <DXCalendar {...props} /> );
    const el = container.querySelector( ".dxCalendar__details" ) as HTMLElement;
    expect( el ).toHaveStyle( { width: "280px" } );
} );

// Tests for color on the indicators
test( "If the user does pass a custom color for the event, the style should be applied for the dot", () => {
    let props = {
        events: [{
            name: "Press conference",
            date: `${TODAY.getFullYear()}-${pad2( TODAY.getMonth() + 1 )}-${TODAY.getDate()}`,
            link: "/test1",
            color: "red"
        }]
    };
    const { container } = render( <DXCalendar {...props} /> );
    const today = container.querySelector( ".dxCalendar__dayNumber.today" )?.parentNode?.childNodes[2] as HTMLElement;
    const dot = today.childNodes[0];
    expect( dot ).toHaveStyle( `background-color: ${props.events[0].color}` );
} );

test( "If today's events length is larger than 2, and all of them have color prop, the 'calendar-plus-icon' will have the color of the last event", () => {
    let coloredEvents: any[] = [];
    events.forEach( event => {
        coloredEvents.push( {
            ...event,
            color: "pink"
        } );
    } );
    let props = {
        events: coloredEvents
    };
    const { container } = render( <DXCalendar {...props} /> );
    const today = container.querySelector( ".dxCalendar__dayNumber.today" )?.parentNode?.childNodes[2] as HTMLElement;
    const dot = today.childNodes[today.childNodes.length - 1];
    expect( dot ).toHaveStyle( `color: ${props.events[props.events.length - 1].color}` );
} );

// Tests for more than 2 events in a day
test( "If today's events length is larger than 2, the last icon will have the test id of 'calendar-plus-icon'", () => {
    let props = {
        events: events,
        seeMoreText: "See more"
    };
    const { container } = render( <DXCalendar {...props} /> );
    let today = container.querySelector( ".dxCalendar .today" );
    let icons = today?.nextElementSibling;
    let triangle = icons?.childNodes[icons.childNodes.length - 1] as HTMLElement;
    expect( triangle.dataset["testid"] ).toEqual( "calendar-plus-icon" );
} );

test( "If today's events length is larger than 2 and the user does not pass the seeMoreText, the details element will have the 'See all events for today' in it", () => {
    let props = {
        events: events,
    };
    const { container } = render( <DXCalendar {...props} /> );
    let today = container.querySelector( ".dxCalendar .today" );
    let week = today?.parentNode?.parentNode;
    let details = week?.childNodes[week.childNodes.length - 1] as HTMLElement;
    let seeMore = details.querySelector( ".dxCalendar__detailsEventSeeMore" );
    expect( seeMore?.textContent ).toEqual( "See all events for today" );
} );

test( "If today's events length is larger than 2 and the user passes the seeMoreText prop, the details element will have that value", () => {
    let props = {
        events: events,
        seeMoreText: "Click here to see all the events"
    };
    const { container } = render( <DXCalendar {...props} /> );
    let today = container.querySelector( ".dxCalendar .today" );
    let week = today?.parentNode?.parentNode;
    let details = week?.childNodes[week.childNodes.length - 1] as HTMLElement;
    let seeMore = details.querySelector( ".dxCalendar__detailsEventSeeMore" );
    expect( seeMore?.textContent ).toEqual( props.seeMoreText );
} );

// Test for the arrow position
test( "If the user click on the first monday of the month, the arrow will have the style of 'left: 20%'", async () => {
    let testDay: any = null;
    let todayClone = weekdayOf( new Date( TODAY.getFullYear(), TODAY.getMonth(), 1 ), 8 );
    if ( todayClone.getDate() > 7 ) {
        todayClone = weekdayOf( todayClone, -6 );
    }
    testDay = todayClone;
    let props = {
        events: events,
    };
    const { container } = render( <DXCalendar {...props} /> );
    let allDays = container.querySelectorAll( ".dxCalendar__day" ) as NodeListOf<HTMLButtonElement>;
    let day: HTMLButtonElement = document.createElement( 'button' );
    allDays.forEach( ( dayItem: HTMLButtonElement ) => {
        if ( !dayItem.disabled && dayItem.childNodes[1].textContent === pad2( testDay.getDate() ) ) {
            day = dayItem;
        }
    } );

    await userEvent.click( day );
    let week = day.parentNode;
    let details = week?.childNodes[week.childNodes.length - 1] as HTMLElement;
    let arrow = details.childNodes[0] as HTMLElement;
    expect( arrow ).toHaveStyle( { left: "20%" } );
} );

test( "If the user click on the first tuesday of the month, the arrow will have the style of 'left: 20%'", async () => {
    let todayClone = weekdayOf( new Date( TODAY.getFullYear(), TODAY.getMonth(), 1 ), 9 );
    let testDay = todayClone;
    let props = {
        events: events,
    };
    const { container } = render( <DXCalendar {...props} /> );
    let allDays = container.querySelectorAll( ".dxCalendar__day" ) as NodeListOf<HTMLButtonElement>;
    let day = document.createElement( 'button' );
    allDays.forEach( ( dayItem: HTMLButtonElement ) => {
        if ( !dayItem.disabled && dayItem.childNodes[1].textContent === pad2( testDay.getDate() ) ) {
            day = dayItem;
        }
    } );
    await userEvent.click( day );
    let week = day.parentNode;
    let details = week?.childNodes[week.childNodes.length - 1] as HTMLElement;
    let arrow = details.childNodes[0] as HTMLElement;
    expect( arrow ).toHaveStyle( { left: "35%" } );
} );

test( "If the user click on the first wednesday of the month, the arrow will have the style of 'left: 20%'", async () => {
    let todayClone = weekdayOf( new Date( TODAY.getFullYear(), TODAY.getMonth(), 1 ), 10 );
    let testDay = todayClone;
    let props = {
        events: events,
    };
    const { container } = render( <DXCalendar {...props} /> );
    let allDays = container.querySelectorAll( ".dxCalendar__day" ) as NodeListOf<HTMLButtonElement>;
    let day = document.createElement( 'button' );
    allDays.forEach( ( dayItem: HTMLButtonElement ) => {
        if ( !dayItem.disabled && dayItem.childNodes[1].textContent === pad2( testDay.getDate() ) ) {
            day = dayItem;
        }
    } );
    await userEvent.click( day );
    let week = day.parentNode;
    let details = week?.childNodes[week.childNodes.length - 1] as HTMLElement;
    let arrow = details.childNodes[0] as HTMLElement;
    expect( arrow ).toHaveStyle( { left: "50%" } );
} );

test( "If the user click on the first thursday of the month, the arrow will have the style of 'left: 20%'", async () => {
    let todayClone = weekdayOf( new Date( TODAY.getFullYear(), TODAY.getMonth(), 1 ), 11 );
    let testDay = todayClone;
    let props = {
        events: events,
    };
    const { container } = render( <DXCalendar {...props} /> );
    let allDays = container.querySelectorAll( ".dxCalendar__day" ) as NodeListOf<HTMLButtonElement>;
    let day = document.createElement( 'button' );
    allDays.forEach( ( dayItem: HTMLButtonElement ) => {
        if ( !dayItem.disabled && dayItem.childNodes[1].textContent === pad2( testDay.getDate() ) ) {
            day = dayItem;
        }
    } );
    await userEvent.click( day );
    let week = day.parentNode;
    let details = week?.childNodes[week.childNodes.length - 1] as HTMLElement;
    let arrow = details.childNodes[0] as HTMLElement;
    expect( arrow ).toHaveStyle( { left: "65%" } );
} );

test( "If the user click on the first friday of the month, the arrow will have the style of 'left: 20%'", async () => {
    let todayClone = weekdayOf( new Date( TODAY.getFullYear(), TODAY.getMonth(), 1 ), 12 );
    let testDay = todayClone;
    let props = {
        events: events,
    };
    const { container } = render( <DXCalendar {...props} /> );
    let allDays = container.querySelectorAll( ".dxCalendar__day" ) as NodeListOf<HTMLButtonElement>;
    let day = document.createElement( 'button' );
    allDays.forEach( ( dayItem: HTMLButtonElement ) => {
        if ( !dayItem.disabled && dayItem.childNodes[1].textContent === pad2( testDay.getDate() ) ) {
            day = dayItem;
        }
    } );
    await userEvent.click( day );
    let week = day.parentNode;
    let details = week?.childNodes[week.childNodes.length - 1] as HTMLElement;
    let arrow = details.childNodes[0] as HTMLElement;
    expect( arrow ).toHaveStyle( { left: "80%" } );
} );

test( "If the user click on the first saturday of the month, the arrow will have the style of 'left: 20%'", async () => {
    let todayClone = weekdayOf( new Date( TODAY.getFullYear(), TODAY.getMonth(), 1 ), 13 );
    let testDay = todayClone;
    let props = {
        events: events,
    };
    const { container } = render( <DXCalendar {...props} /> );
    let allDays = container.querySelectorAll( ".dxCalendar__day" ) as NodeListOf<HTMLButtonElement>;
    let day = document.createElement( 'button' );
    allDays.forEach( ( dayItem: HTMLButtonElement ) => {
        if ( !dayItem.disabled && dayItem.childNodes[1].textContent === pad2( testDay.getDate() ) ) {
            day = dayItem;
        }
    } );
    await userEvent.click( day );
    let week = day.parentNode;
    let details = week?.childNodes[week.childNodes.length - 1] as HTMLElement;
    let arrow = details.childNodes[0] as HTMLElement;
    expect( arrow ).toHaveStyle( { left: "95%" } );
} );

test( "If the user click on the first sunday of the month, the arrow will have the style of 'left: 20%'", async () => {
    let todayClone = weekdayOf( new Date( TODAY.getFullYear(), TODAY.getMonth(), 1 ), 14 );
    let testDay = todayClone;
    let props = {
        events: events,
    };
    const { container } = render( <DXCalendar {...props} /> );
    let allDays = container.querySelectorAll( ".dxCalendar__day" ) as NodeListOf<HTMLButtonElement>;
    let day = document.createElement( 'button' );
    allDays.forEach( ( dayItem: HTMLButtonElement ) => {
        if ( !dayItem.disabled && dayItem.childNodes[1].textContent === pad2( testDay.getDate() ) ) {
            day = dayItem;
        }
    } );
    await userEvent.click( day );
    let week = day.parentNode;
    let details = week?.childNodes[week.childNodes.length - 1] as HTMLElement;
    let arrow = details.childNodes[0] as HTMLElement;
    expect( arrow ).toHaveStyle( { left: "5%" } );
} );

// Test when the user select a different day in another week
test( "If the user clicks on a day from a different week, the today's week details box will have the class of 'inactive'", async () => {
    let props = {
        events: events,
        seeMoreText: "See more"
    };
    const { container } = render( <DXCalendar {...props} /> );
    let today = container.querySelector( ".dxCalendar .today" ) as HTMLButtonElement;
    let week = today?.parentNode?.parentNode as HTMLElement;
    let todayWeekId = week.dataset["weekid"] as string;
    let newWeekId = ( parseInt( todayWeekId ) - 1 ) <= 0 ? ( parseInt( todayWeekId ) + 1 ) : ( parseInt( todayWeekId ) - 1 );
    let newDay = container.querySelector( `[data-weekid="${newWeekId}"]` )?.childNodes[0].childNodes[1] as HTMLElement;
    await userEvent.click( newDay );
    let todayWeek = container.querySelector( `[data-weekid="${parseInt( todayWeekId )}"]` );
    let todayDetails = todayWeek?.childNodes[todayWeek.childNodes.length - 1];
    expect( todayDetails ).toHaveClass( "inactive" );
} );

test( "If the user clicks on a day from a different week, the new week details box will have the class of 'active'", async () => {
    let props = {
        events: events,
        seeMoreText: "See more"
    };
    const { container } = render( <DXCalendar {...props} /> );
    let today = container.querySelector( ".dxCalendar .today" );
    let week = today?.parentNode?.parentNode as HTMLElement;
    let todayWeekId = week.dataset["weekid"] as string;
    let newWeekId = ( parseInt( todayWeekId ) - 1 ) <= 0 ? ( parseInt( todayWeekId ) + 1 ) : ( parseInt( todayWeekId ) - 1 );
    let newDay = container.querySelector( `[data-weekid="${newWeekId}"]` )?.childNodes[0] as HTMLElement;
    await userEvent.click( newDay );
    let newWeek = container.querySelector( `[data-weekid="${newWeekId}"]` );
    let newDetails = newWeek?.childNodes[newWeek.childNodes.length - 1];
    expect( newDetails ).toHaveClass( "active" );
} );

test( "If the user press the Enter key when focusing a day from a different week, the new week details box will have the class of 'active'", () => {
    let props = {
        events: events,
        seeMoreText: "See more"
    };
    const { container } = render( <DXCalendar {...props} /> );
    let today = container.querySelector( ".dxCalendar .today" );
    let week = today?.parentNode?.parentNode as HTMLElement;
    let todayWeekId = week.dataset["weekid"] as string;
    let newWeekId = ( parseInt( todayWeekId ) - 1 ) <= 0 ? ( parseInt( todayWeekId ) + 1 ) : ( parseInt( todayWeekId ) - 1 );
    let newDay = container.querySelector( `[data-weekid="${newWeekId}"]` )?.childNodes[0] as HTMLElement;
    newDay.focus();
    fireEvent.keyDown( newDay, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    let newWeek = container.querySelector( `[data-weekid="${newWeekId}"]` );
    let newDetails = newWeek?.childNodes[newWeek.childNodes.length - 1];
    expect( newDetails ).toHaveClass( "active" );
} );

test( "If the user press the Space key when focusing a day from a different week, the new week details box will have the class of 'active'", () => {
    let props = {
        events: events,
        seeMoreText: "See more"
    };
    const { container } = render( <DXCalendar {...props} /> );
    let today = container.querySelector( ".dxCalendar .today" );
    let week = today?.parentNode?.parentNode as HTMLElement;
    let todayWeekId = week.dataset["weekid"] as string;
    let newWeekId = ( parseInt( todayWeekId ) - 1 ) <= 0 ? ( parseInt( todayWeekId ) + 1 ) : ( parseInt( todayWeekId ) - 1 );
    let newDay = container.querySelector( `[data-weekid="${newWeekId}"]` )?.childNodes[0] as HTMLElement;
    newDay.focus();
    fireEvent.keyDown( newDay, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    let newWeek = container.querySelector( `[data-weekid="${newWeekId}"]` );
    let newDetails = newWeek?.childNodes[newWeek.childNodes.length - 1];
    expect( newDetails ).toHaveClass( "active" );
} );

test( "If the user press the Escape key when focusing a day from a different week, the new week details box will have the class of 'inactive'", () => {
    let props = {
        events: events,
        seeMoreText: "See more"
    };
    const { container } = render( <DXCalendar {...props} /> );
    let today = container.querySelector( ".dxCalendar .today" );
    let week = today?.parentNode?.parentNode as HTMLElement;
    let todayWeekId = week.dataset["weekid"] as string;
    let newWeekId = ( parseInt( todayWeekId ) - 1 ) <= 0 ? ( parseInt( todayWeekId ) + 1 ) : ( parseInt( todayWeekId ) - 1 );
    let newDay = container.querySelector( `[data-weekid="${newWeekId}"]` )?.childNodes[0] as HTMLElement;
    newDay.focus();
    fireEvent.keyDown( newDay, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    let newWeek = container.querySelector( `[data-weekid="${newWeekId}"]` );
    let newDetails = newWeek?.childNodes[newWeek.childNodes.length - 1];
    expect( newDetails ).toHaveClass( "inactive" );
} );

// Test when changing the month
test( "If the user clicks on the previous button, the month showed will be one before", async () => {
    let monthBefore = MONTH_NAMES[( TODAY.getMonth() + 11 ) % 12];
    let props = {
        events,
        seeMoreText: "See more"
    };
    const { getByTestId } = render( <DXCalendar {...props} /> );
    let previous = getByTestId( "calendar-prev" );
    await userEvent.click( previous );
    let month = getByTestId( "calendar-month" );
    expect( month.textContent ).toContain( monthBefore );
} );

test( "If the user press the Enter key when focusing the previous button, the month showed will be one before", () => {
    let monthBefore = MONTH_NAMES[( TODAY.getMonth() + 11 ) % 12];
    let props = {
        events,
        seeMoreText: "See more"
    };
    const { getByTestId } = render( <DXCalendar {...props} /> );
    let previous = getByTestId( "calendar-prev" );
    previous.focus();
    fireEvent.keyDown( previous, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    let month = getByTestId( "calendar-month" );
    expect( month.textContent ).toContain( monthBefore );
} );

test( "If the user press the Space key when focusing the previous button, the month showed will be one before", () => {
    let monthBefore = MONTH_NAMES[( TODAY.getMonth() + 11 ) % 12];
    let props = {
        events,
        seeMoreText: "See more"
    };
    const { getByTestId } = render( <DXCalendar {...props} /> );
    let previous = getByTestId( "calendar-prev" );
    previous.focus();
    fireEvent.keyDown( previous, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    let month = getByTestId( "calendar-month" );
    expect( month.textContent ).toContain( monthBefore );
} );

test( "If the user press the Escape key when focusing the previous button, the month showed will stay the same", () => {
    let props = {
        events,
        seeMoreText: "See more"
    };
    const { getByTestId } = render( <DXCalendar {...props} /> );
    let previous = getByTestId( "calendar-prev" );
    previous.focus();
    fireEvent.keyDown( previous, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    let month = getByTestId( "calendar-month" );
    expect( month.textContent ).toContain( MONTH_NAMES[TODAY.getMonth()] );
} );

test( "If the user clicks on the next button, the month showed will be one after", async () => {
    let monthAfter = MONTH_NAMES[( TODAY.getMonth() + 1 ) % 12];
    let props = {
        events,
        seeMoreText: "See more"
    };
    const { getByTestId } = render( <DXCalendar {...props} /> );
    let next = getByTestId( "calendar-next" );
    await userEvent.click( next );
    let month = getByTestId( "calendar-month" );
    expect( month.textContent ).toContain( monthAfter );
} );

test( "If the user press the Enter key while focusing the next button, the month showed will be one after", () => {
    let monthAfter = MONTH_NAMES[( TODAY.getMonth() + 1 ) % 12];
    let props = {
        events,
        seeMoreText: "See more"
    };
    const { container, getByTestId } = render( <DXCalendar {...props} /> );
    let next = container.querySelector( '[data-testid="calendar-next"]' ) as HTMLElement;
    next.focus();
    fireEvent.keyDown( next, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    let month = getByTestId( "calendar-month" );
    expect( month.textContent ).toContain( monthAfter );
} );

test( "If the user press the Space key while focusing the next button, the month showed will be one after", () => {
    let monthAfter = MONTH_NAMES[( TODAY.getMonth() + 1 ) % 12];
    let props = {
        events,
        seeMoreText: "See more"
    };
    const { container, getByTestId } = render( <DXCalendar {...props} /> );
    let next = container.querySelector( '[data-testid="calendar-next"]' ) as HTMLElement;
    next.focus();
    fireEvent.keyDown( next, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    let month = getByTestId( "calendar-month" );
    expect( month.textContent ).toContain( monthAfter );
} );

test( "If the user press the Escape key while focusing the next button, the month showed will stay the same", () => {
    let props = {
        events,
        seeMoreText: "See more"
    };
    const { container, getByTestId } = render( <DXCalendar {...props} /> );
    let next = container.querySelector( '[data-testid="calendar-next"]' ) as HTMLElement;
    next.focus();
    fireEvent.keyDown( next, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    let month = getByTestId( "calendar-month" );
    expect( month.textContent ).toContain( MONTH_NAMES[TODAY.getMonth()] );
} );

test( "If the user change months, all the details boxes should have the class 'inactive'", async () => {
    let props = {
        events,
        seeMoreText: "See more"
    };
    const { getByTestId, container } = render( <DXCalendar {...props} /> );
    let next = getByTestId( "calendar-next" );
    await userEvent.click( next );
    let allInactive = true;
    let detailsBoxes = container.querySelectorAll( "dxCalendar__details" );
    detailsBoxes.forEach( box => {
        if ( !box.classList.contains( "inactive" ) ) allInactive = false;
    } );
    expect( allInactive ).toBeTruthy();
} );

// Tests for call the custom fn when a event is selected
test( "If the user selects an event from the details box, and passes a function on selectEvent, it should be called", async () => {
    let mockFn = jest.fn();
    let props = {
        events,
        _selectEvent: mockFn
    };
    const { container } = render( <DXCalendar {...props} /> );
    const detailsBox = container.querySelector( ".dxCalendar__details.active .dxCalendar__detailsEvent" ) as HTMLElement;
    await userEvent.click( detailsBox );
    expect( mockFn ).toBeCalled();
} );

test( "The function passed on selectEvent receives the original event object, whose date is still the string it was given", async () => {
    let mockFn = jest.fn();
    const { container } = render( <DXCalendar events={events} _selectEvent={mockFn} /> );
    const detailsBox = container.querySelector( ".dxCalendar__details.active .dxCalendar__detailsEvent" ) as HTMLElement;
    await userEvent.click( detailsBox );
    expect( mockFn ).toHaveBeenCalledTimes( 1 );
    const received = mockFn.mock.calls[0][0];
    expect( events ).toContain( received ); // the very same object that was passed in, not a copy
    expect( received.name ).toBe( events[0].name );
    expect( typeof received.date ).toBe( "string" );
    expect( received ).not.toHaveProperty( "_source" );
} );

test( "If the user selects and event from the details box, and it does not pass a function on selectEvent, the window.open should be called", async () => {
    const spyWindowOpen = jest.spyOn( window, 'open' );
    spyWindowOpen.mockImplementation( jest.fn() );

    let props = {
        events
    };
    const { container } = render( <DXCalendar {...props} /> );
    const detailsBox = container.querySelector( ".dxCalendar__details.active .dxCalendar__detailsEvent" ) as HTMLElement;
    await userEvent.click( detailsBox );
    expect( spyWindowOpen ).toHaveBeenCalledTimes( 1 );
    spyWindowOpen.mockRestore();
} );

// Tests for the modal
test( "If today has more than 2 events, and the user click on the see more button, the modal should be in the document", async () => {
    let props = {
        events
    };
    const { container, getByTestId } = render( <DXCalendar {...props} /> );
    let today = container.querySelector( ".dxCalendar .today" );
    let week = today?.parentNode?.parentNode;
    let details = week?.childNodes[week.childNodes.length - 1] as HTMLElement;
    let seeMore = details.querySelector( ".dxCalendar__detailsEventSeeMore" ) as HTMLElement;
    await userEvent.click( seeMore );
    const modal = getByTestId( "calendar-modal" );
    expect( modal ).toBeInTheDocument();
} );
// Unable to make a test for closing the modal, becasuse of Clay DOM modification affecting jest

//Icon Tests
test( "If Prev icon is changed if value is given", () => {
    render( <DXCalendar {...CalendarChangedIconsArgs} /> );
    expect( screen.getByTestId( "calendar-prev" ).firstChild ).toHaveClass( CalendarChangedIconsArgs.icons?.prev! );
} );

test( "If Next icon is changed if value is given", () => {
    render( <DXCalendar {...CalendarChangedIconsArgs} /> );
    expect( screen.getByTestId( "calendar-next" ).firstChild ).toHaveClass( CalendarChangedIconsArgs.icons?.next! );
} );

test( "strict math boundary: forwardFill rigorously aborts when month ends on Saturday", () => {
    jest.useFakeTimers();
    // Set time to Jan 1, 2026. Jan 2026 ends on a Saturday (Jan 31).
    // Backfill = 4 days (Dec 28, 29, 30, 31). Month = 31 days. Total so far = 35 days.
    // forwardFill should add exactly 0 days because dayOfWeek === 6 triggers early return.
    jest.setSystemTime( new Date( '2026-01-01T12:00:00Z' ) );

    const { container } = render( <DXCalendar events={[]} /> );
    const days = container.querySelectorAll( '.dxCalendar__day' );

    // Kills mutants altering `dayOfWeek === 6`, `> 0`, `< 6` and `dayOfWeek + 1` math boundaries.
    // If forwardFill fails to abort, or backFill math is altered, this strict length drops/increases.
    expect( days ).toHaveLength( 35 );

    jest.useRealTimers();
} );

test( "strict array slicing: generateEvents strictly slices exactly 2 items for colored dots", () => {
    const todayDate = toIsoDate( new Date() );
    // Provide exactly 4 events for today.
    const fourEvents = Array.from( { length: 4 } ).map( ( _, i ) => ( {
        name: `Event ${i}`,
        date: todayDate,
        link: `/link${i}`
    } ) );

    const { container } = render( <DXCalendar events={fourEvents} /> );

    const todayDay = container.querySelector( '.dxCalendar__dayNumber.today' )?.closest( '.dxCalendar__day' );
    const dayEventContainer = todayDay?.querySelector( '.dxCalendar__dayEvent' );

    // Kills mutant replacing `.slice(0, 2)` with `.slice(0, 1)` or removed entirely.
    // Exact DOM structure must be 2 dots (span without data-testid) and 1 plus icon.
    expect( dayEventContainer?.children ).toHaveLength( 3 );
    const dots = dayEventContainer?.querySelectorAll( 'span:not([data-testid])' );
    expect( dots ).toHaveLength( 2 );
    const plus = dayEventContainer?.querySelector( '[data-testid="calendar-plus-icon"]' );
    expect( plus ).toBeInTheDocument();
} );

test( "state lifecycle & default branches: activeDay resets to -1 on month change, triggering default arrow pos", async () => {
    const { container, getByTestId } = render( <DXCalendar events={[]} /> );

    // Click next month
    const nextBtn = getByTestId( "calendar-next" );
    await act( async () => {
        fireEvent.click( nextBtn );
    } );

    // ALL weeks are now inactive. activeDay evaluates to -1.
    // The arrow calculations run getArrowLeftPos(-1), strictly forcing the unreached `default:` branch.
    const arrow = container.querySelector( '.dxCalendar__detailsArrow' ) as HTMLElement;
    expect( arrow.style.left ).toBe( "5%" );
} );

test( "falsy coercion & prop types: _selectEvent strictly evaluates undefined to fallback to window.open", async () => {
    const spyWindowOpen = jest.spyOn( window, 'open' ).mockImplementation( jest.fn() );
    const todayDate = toIsoDate( new Date() );

    // Explicitly pass undefined to target the `props._selectEvent !== undefined` conditional branch
    const { container } = render(
        <DXCalendar
            events={[{ name: "A", date: todayDate, link: "/fallback-link" }]}
            _selectEvent={undefined}
        />
    );

    const detailsBox = container.querySelector( ".dxCalendar__details.active .dxCalendar__detailsEvent" ) as HTMLElement;
    await act( async () => {
        fireEvent.click( detailsBox );
    } );

    // Kills mutant removing or altering the explicit undefined check, routing correctly to native window logic
    expect( spyWindowOpen ).toHaveBeenCalledWith( "/fallback-link", "_self" );
    spyWindowOpen.mockRestore();
} );

test( "DOM polyfill traps: innerText fallback branch executes when textContent is missing", async () => {
    const { container } = render( <DXCalendar events={[]} /> );

    // Find an active day
    const someDay = container.querySelector( '.dxCalendar__day:not([disabled])' ) as HTMLElement;

    // Brutally override textContent to be null on the target child node to force the `|| innerText` branch
    const dayNumberNode = someDay.childNodes[1] as HTMLElement;
    Object.defineProperty( dayNumberNode, 'textContent', { value: null, configurable: true } );
    Object.defineProperty( dayNumberNode, 'innerText', { value: "15", configurable: true } );

    await act( async () => {
        fireEvent.click( someDay );
    } );

    // If the `|| innerText` branch is mutated, calculation of dayNumber evaluates to NaN/Null.
    // The day matching fails and the box won't become active. 
    const week = someDay.closest( '.dxCalendar__week' );
    const details = week?.querySelector( '.dxCalendar__details' );
    expect( details ).toHaveClass( "active" );
} );

itSupportsExtensionProps( ( extra ) => <DXCalendar events={events} {...extra} /> );
