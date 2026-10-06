import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { MyNextMeetingArgs, MyNextMeetingChangedIconsArgs } from "./DXMyNextMeeting.stories";
import DXMyNextMeeting from "./DXMyNextMeeting";
import moment from "moment";

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
    render( <DXMyNextMeeting {...MyNextMeetingArgs}></DXMyNextMeeting> );
    expect( screen.getByTestId( "MNM__time" ) ).toHaveTextContent( ( moment( MyNextMeetingArgs.startDateTime ).format( "HH:mm" ) + " - " + moment( MyNextMeetingArgs.endDateTime ).format( "HH:mm" ) ) );
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
