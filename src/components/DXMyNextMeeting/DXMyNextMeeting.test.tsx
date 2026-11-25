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
import { MyNextMeetingArgs, MyNextMeetingChangedIconsArgs } from "./DXMyNextMeeting.stories";
import DXMyNextMeeting from "./DXMyNextMeeting";

// Testing basic renders of prop
test( "Component renders the correct label", () => {
    render( <DXMyNextMeeting {...MyNextMeetingArgs}></DXMyNextMeeting> );
    expect( screen.getByTestId( "MNM__title" ) ).toHaveTextContent( MyNextMeetingArgs.title );
} );

test( "Component renders the correct link url", () => {
    render( <DXMyNextMeeting {...MyNextMeetingArgs}></DXMyNextMeeting> );
    expect( screen.getByTestId( "MNM__link" ) ).toHaveAttribute( "href", MyNextMeetingArgs.link.url );
} );

test( "Component renders the default link url", () => {
    let props = JSON.parse( JSON.stringify( MyNextMeetingArgs ) );
    delete props.link.url;
    render( <DXMyNextMeeting {...props}></DXMyNextMeeting> );
    let link = screen.getByTestId( "MNM__link" ) as HTMLAnchorElement;
    expect( link.href ).toContain( '#' );
} );

test( "Component renders the correct link target", () => {
    render( <DXMyNextMeeting {...MyNextMeetingArgs}></DXMyNextMeeting> );
    expect( screen.getByTestId( "MNM__link" ) ).toHaveAttribute( "target", MyNextMeetingArgs.link.target );
} );

test( "Component renders the time correctly", () => {
    // ISO date-times without an offset are local time, so the rendered hours do not depend on the time zone
    const props = { ...MyNextMeetingArgs, startDateTime: "2026-03-05T09:05:00", endDateTime: "2026-03-05T17:45:30" };
    render( <DXMyNextMeeting {...props}></DXMyNextMeeting> );
    expect( screen.getByTestId( "MNM__time" ) ).toHaveTextContent( "09:05 - 17:45" );
} );

test( "Component renders the time of ISO values that carry a UTC offset in local time", () => {
    const start = "2026-03-05T09:05:00Z";
    const end = "2026-03-05T10:30:00Z";
    const local = ( iso: string ) => {
        const d = new Date( iso );
        return `${String( d.getHours() ).padStart( 2, "0" )}:${String( d.getMinutes() ).padStart( 2, "0" )}`;
    };
    render( <DXMyNextMeeting {...MyNextMeetingArgs} startDateTime={start} endDateTime={end}></DXMyNextMeeting> );
    expect( screen.getByTestId( "MNM__time" ) ).toHaveTextContent( `${local( start )} - ${local( end )}` );
} );

test( "Invalid dates format rendering", () => {
    const warn = jest.spyOn( console, "warn" );
    render( <DXMyNextMeeting title="Name" startDateTime="2022/01/01 10" endDateTime="" link={MyNextMeetingArgs.link}></DXMyNextMeeting> );
    expect( document.querySelector( "dxMyNextMeeting__time" ) ).toBeNull();
    expect( warn ).toHaveBeenCalledWith( "Invalid value for DXMyNextMeeting: startDateTime doesn't comply with the ISO 8601 format" );
    expect( warn ).toHaveBeenCalledWith( "Invalid value for DXMyNextMeeting: endDateTime doesn't comply with the ISO 8601 format" );
    warn.mockRestore();
} );

test( "Invalid start dateTime format rendering", () => {
    const warn = jest.spyOn( console, "warn" );
    render( <DXMyNextMeeting title="Name" startDateTime="2022/01/01 10" endDateTime="2022-01-01 10" link={MyNextMeetingArgs.link}></DXMyNextMeeting> );
    expect( document.querySelector( "dxMyNextMeeting__time" ) ).toBeNull();
    expect( warn ).toHaveBeenCalledWith( "Invalid value for DXMyNextMeeting: startDateTime doesn't comply with the ISO 8601 format" );
    warn.mockRestore();
} );

test( "Invalid end dateTime format rendering", () => {
    const warn = jest.spyOn( console, "warn" );
    render( <DXMyNextMeeting title="Name" startDateTime="2022-01-01 10" endDateTime="2022/01/01 10" link={MyNextMeetingArgs.link}></DXMyNextMeeting> );
    expect( document.querySelector( "dxMyNextMeeting__time" ) ).toBeNull();
    expect( warn ).toHaveBeenCalledWith( "Invalid value for DXMyNextMeeting: endDateTime doesn't comply with the ISO 8601 format" );
    warn.mockRestore();
} );

test( "Icon changes que icons property is set", () => {
    expect.assertions( 2 );
    render( <DXMyNextMeeting {...MyNextMeetingChangedIconsArgs} /> );
    expect( screen.getByTestId( "myNextMeeting__eventIcon" ) ).toHaveClass( MyNextMeetingChangedIconsArgs.icons!.event! );
    expect( screen.getByTestId( "myNextMeeting__linkIcon" ) ).toHaveClass( MyNextMeetingChangedIconsArgs.icons!.link! );
} );
