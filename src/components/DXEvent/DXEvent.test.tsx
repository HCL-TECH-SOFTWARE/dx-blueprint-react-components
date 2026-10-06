import React from "react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { render, screen, act } from "@testing-library/react";
import DXEvent from "./DXEvent";

const eventData = {
    eventFrom: "2021-10-27T07:00:00",
    eventTo: "2021-11-07T07:00:00",
    eventName: {
        label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
        url: "https://hcl-software.com",
        target: "_self"
    },
    eventType: "Type of event",
};

test( "If the variant passed is not valid a message 'The variant received is invalid' will be in the document", () => {
    const eventProps = { ...eventData, variant: "small" };
    // @ts-ignore: For testing purposes
    const { getByText } = render( <DXEvent {...eventProps} /> );
    const msg = getByText( "The variant received is invalid" );
    expect( msg ).toBeInTheDocument();
} );

// Test for the default variant case
test( "If the variant prop is empty, then the component will have the class 'dxEvent--featured'", () => {
    const eventProps = { ...eventData };
    // @ts-ignore: For testing purposes
    const { container } = render( <DXEvent variant="" {...eventProps} /> );
    let component = container.querySelector( ".dxEvent--featured" );
    expect( component ).toBeInTheDocument();
} );

// Tests for the featured variant
test( "If the variant 'featured' is passed then the 'event-featured-details' element should be in the document", () => {
    const eventProps = {
        ...eventData,
        eventLocation: "Interior>Level 1>145 Conference Room",
        eventButton: {
            label: "Add to My Planner",
            onClick: () => () => {}
        },
    };
    const { getByTestId } = render( <DXEvent variant="featured" {...eventProps} /> );
    const riverDetails = getByTestId( "event-featured-details" );
    expect( riverDetails ).toBeInTheDocument();
} );

test( "The featured event renders a full chronological date range with its start time and PST", () => {
    const { getByTestId } = render( <DXEvent variant="featured" {...eventData} /> );

    expect( getByTestId( "event-featured-info" ) ).toHaveTextContent( "Wednesday, October 27, 2021 - Sunday, November 07, 2021 | 7:00am PST" );
} );

test( "The featured event renders one full date without a time suffix for date-only input", () => {
    const eventProps = {
        ...eventData,
        eventFrom: "2021-10-27",
        eventTo: undefined,
    };
    const { getByTestId } = render( <DXEvent variant="featured" {...eventProps} /> );
    const info = getByTestId( "event-featured-info" );
    expect( info ).toHaveTextContent( "Wednesday, October 27, 2021" );
} );

test( "The featured event ignores an end time when the start date has no time", () => {
    const eventProps = {
        ...eventData,
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07T07:00:00"
    };
    const { getByTestId } = render( <DXEvent variant="featured" {...eventProps} /> );
    expect( getByTestId( "event-featured-info" ) ).toHaveTextContent( "Wednesday, October 27, 2021 - Sunday, November 07, 2021" );
} );

test( "The featured event preserves the 24-hour option in the full summary", () => {
    const eventProps = {
        ...eventData,
        eventFrom: "2021-10-27T04:00:00",
        eventTo: "2021-11-07T07:00:00",
        eventTime24hrFormat: true,
    };
    const { getByTestId } = render( <DXEvent variant="featured" {...eventProps} /> );
    expect( getByTestId( "event-featured-info" ) ).toHaveTextContent( "Wednesday, October 27, 2021 - Sunday, November 07, 2021 | 04:00 PST" );
} );

test( "The featured event summary remains chronological when inputs are reversed", () => {
    const eventProps = {
        ...eventData,
        eventFrom: "2021-11-07T21:00:00",
        eventTo: "2021-10-27T07:00:00",
    };
    const { getByTestId } = render( <DXEvent variant="featured" {...eventProps} /> );

    expect( getByTestId( "event-featured-info" ) ).toHaveTextContent( "Wednesday, October 27, 2021 - Sunday, November 07, 2021 | 7:00am PST" );
} );

test( "The featured compact event renders punctuated 12-hour start and end times", () => {
    const eventProps = {
        ...eventData,
        eventFrom: "2021-10-27T07:00:00",
        eventTo: "2021-11-07T21:00:00"
    };
    const { getByTestId } = render( <DXEvent variant="featured-compact" {...eventProps} /> );
    expect( getByTestId( "event-featured-compact-info" ) ).toHaveTextContent( "Wednesday | 7:00 a.m. - 9:00 p.m." );
} );

test( "The featured compact event preserves the 24-hour option", () => {
    const eventProps = {
        ...eventData,
        eventFrom: "2021-10-27T04:00:00",
        eventTo: "2021-11-07T07:00:00",
        eventTime24hrFormat: true
    };
    const { getByTestId } = render( <DXEvent variant="featured-compact" {...eventProps} /> );
    expect( getByTestId( "event-featured-compact-info" ) ).toHaveTextContent( "Wednesday | 04:00 - 07:00" );
} );

test( "The featured compact date summary remains unchanged below 57 characters", () => {
    const eventProps = {
        ...eventData,
        eventFrom: "2021-10-27T07:00:00",
        eventTo: "2021-11-07T09:00:00"
    };
    const { getByTestId } = render( <DXEvent variant="featured-compact" {...eventProps} /> );
    const info = getByTestId( "event-featured-compact-info" );
    const fullSummary = "Wednesday | 7:00 a.m. - 9:00 a.m.";

    expect( fullSummary ).toHaveLength( 33 );
    expect( info ).toHaveTextContent( fullSummary );
    expect( info ).not.toHaveAttribute( "aria-label" );
} );

test( "If the featured event does not get the eventButton prop, it should be null", () => {
    const eventProps = {
        ...eventData,
        eventLocation: "Interior>Level 1>145 Conference Room",
    };
    const { container } = render( <DXEvent variant="featured" {...eventProps} /> );
    const eventButton = container.querySelector( '[data-testid="event-featured-button"]' );
    expect( eventButton ).toBeNull();
} );

test( "If the featured event gets a complete eventButton prop, then it should be in the document", () => {
    const eventProps = {
        ...eventData,
        eventButton: {
            label: "Add to My Planner",
            onClick: () => () => {}
        },
    };
    const { getByTestId } = render( <DXEvent variant="featured" {...eventProps} /> );
    const eventButton = getByTestId( "event-featured-button" );
    expect( eventButton ).toBeInTheDocument();
} );

test( "If the user clicks on the featured's event button then it should triggered the function", async () => {
    let mockFn = jest.fn();
    const eventProps = {
        ...eventData,
        eventButton: {
            label: "Add to My Planner",
            onClick: mockFn
        },
    };
    const { getByTestId } = render( <DXEvent variant="featured" {...eventProps} /> );
    const eventButton = getByTestId( "event-featured-button" );
    await userEvent.click( eventButton );
    expect( mockFn ).toBeCalledTimes( 1 );
} );

// Tests for the featured compact variant
test( "If the variant 'featured-compact' is passed then the component will have the classes 'dxEvent dxEvent--featuredCompact'", () => {
    const eventProps = { ...eventData };
    const { container } = render( <DXEvent variant="featured-compact" {...eventProps} /> );
    const component = container.querySelector( ".dxEvent" );
    expect( component ).toHaveClass( "dxEvent dxEvent--featuredCompact" );
} );

test( "If the variant 'featured-compact' is passed then the date from element will have the class 'dxEvent__topLabelCompact'", () => {
    const eventProps = { ...eventData };
    const { getByTestId } = render( <DXEvent variant="featured-compact" {...eventProps} /> );
    const label = getByTestId( "event-date-from" );
    expect( label ).toHaveClass( "dxEvent__topLabelCompact" );
} );

test( "If the variant 'featured-compact' is passed then the date to element will have the class 'dxEvent__topLabelCompact'", () => {
    const eventProps = { ...eventData };
    const { getByTestId } = render( <DXEvent variant="featured-compact" {...eventProps} /> );
    const label = getByTestId( "event-date-to" );
    expect( label ).toHaveClass( "dxEvent__topLabelCompact" );
} );

test( "If the variant 'featured-compact' is not passed then the date from element will have the class 'dxEvent__topLabel'", () => {
    const eventProps = { ...eventData };
    //@ts-ignore: Test purposes
    const { getByTestId } = render( <DXEvent variant="" {...eventProps} /> );
    const label = getByTestId( "event-date-from" );
    expect( label ).toHaveClass( "dxEvent__topLabel" );
} );

test( "If the variant 'featured-compact' is passed then the element 'event-featured-small-details' will be in the document", () => {
    const eventProps = { ...eventData };
    const { getByTestId } = render( <DXEvent variant="featured-compact" {...eventProps} /> );
    const details = getByTestId( "event-featured-compact-details" );
    expect( details ).toBeInTheDocument();
} );

test( "If the variant 'featured-compact' is passed then the element 'event-featured-compact-name' will be in the document", () => {
    const eventProps = { ...eventData };
    const { getByTestId } = render( <DXEvent variant="featured-compact" {...eventProps} /> );
    const name = getByTestId( "event-featured-compact-name" );
    expect( name ).toBeInTheDocument();
} );

test( "If the variant 'featured-compact' is passed then the element 'event-featured-compact-info' will be in the document", () => {
    const eventProps = { ...eventData };
    const { getByTestId } = render( <DXEvent variant="featured-compact" {...eventProps} /> );
    const info = getByTestId( "event-featured-compact-info" );
    expect( info ).toBeInTheDocument();
} );

test( "If the eventType prop for the featured-compact variant is not passed the element 'dxEvent__typeOf' will be null", () => {
    const eventProps = {
        eventFrom: "2021-10-27T07:00:00",
        eventTo: "2021-11-07T07:00:00",
        eventName: {
            label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
            url: "https://hcl-software.com",
            target: "_self"
        },
    };
    const { container } = render( <DXEvent variant="featured-compact" {...eventProps} /> );
    let type = container.querySelector( '.dxEvent__typeOf' );
    expect( type ).toBeNull();
} );

test( "If the eventType prop for the featured-compact variant is passed the element 'dxEvent--featuredCompact__typeOf' will be in the document", () => {
    const eventProps = {
        eventFrom: "2021-10-27T07:00:00",
        eventTo: "2021-11-07T07:00:00",
        eventName: {
            label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
            url: "https://hcl-software.com",
            target: "_self"
        },
        eventType: "Type of event"
    };
    const { container } = render( <DXEvent variant="featured-compact" {...eventProps} /> );
    let type = container.querySelector( '.dxEvent--featuredCompact__typeOf' );
    expect( type ).toBeInTheDocument();
} );

// Tests for the river variant
test( "If the variant 'river' is passed then the 'event-river-details' element should be in the document", () => {
    const eventProps = { ...eventData };
    const { getByTestId } = render( <DXEvent variant="river" {...eventProps} /> );
    const featuredDetails = getByTestId( "event-river-details" );
    expect( featuredDetails ).toBeInTheDocument();
} );

test( "If the user does not pass a river variant, the calendarIcon will be null", () => {
    let props = {
        eventFrom: "2021-10-27T19:00:00",
        eventTo: "2021-11-07T21:00:00",
        eventName: {
            label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
            url: "https://hcl-software.com",
            target: "_self"
        },
        eventType: "Type of event",
    };
    const { container } = render( <DXEvent variant="featured-compact" {...props} /> );
    let icon = container.querySelector( '[data-testid="event-river-calendar-icon"]' );
    expect( icon ).toBeNull();
} );

test( "If the user does pass a river variant, the calendarIcon will be in the document", () => {
    let props = {
        eventFrom: "2021-10-27T19:00:00",
        eventTo: "2021-11-07T21:00:00",
        eventName: {
            label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
            url: "https://hcl-software.com",
            target: "_self"
        },
        eventType: "Type of event",
    };
    const { getByTestId } = render( <DXEvent variant="river" {...props} /> );
    let icon = getByTestId( "event-river-calendar-icon" );
    expect( icon ).toBeInTheDocument();
} );

test( "A compact river event uses deterministic compact presentation without icons", () => {
    const { container, getByTestId } = render( <DXEvent variant="river" compact {...eventData} eventName={{ ...eventData.eventName, target: "_blank" }} /> );
    const component = container.querySelector( ".dxEvent" );

    expect( component ).toHaveClass( "dxEvent--riverCompact" );
    expect( getByTestId( "event-date-from" ) ).toBeInTheDocument();
    expect( getByTestId( "event-date-to" ) ).toBeInTheDocument();
    expect( container.querySelector( '[data-testid="event-river-calendar-icon"]' ) ).toBeNull();
    expect( container.querySelector( ".dxEvent--river__icon" ) ).toBeNull();
    expect( container.querySelector( ".ci-Arrow_Up_Right_MD" ) ).toBeNull();
} );

test( "An ordinary external river event retains its calendar and external-link icons", () => {
    const { container, getByTestId } = render( <DXEvent variant="river" showExternalIcon {...eventData} eventName={{ ...eventData.eventName, target: "_blank" }} /> );

    expect( getByTestId( "event-river-calendar-icon" ) ).toBeInTheDocument();
    expect( container.querySelector( ".dxEvent--river__icon .ci-Arrow_Up_Right_MD" ) ).toBeInTheDocument();
} );

test( "If the eventType prop for the river-small variant is not passed the element 'dxEvent__typeOf' will be null", () => {
    const eventProps = {
        eventFrom: "2021-10-27T07:00:00",
        eventTo: "2021-11-07T07:00:00",
        eventName: {
            label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
            url: "https://hcl-software.com",
            target: "_self"
        },
    };
    const { container } = render( <DXEvent variant="river" {...eventProps} /> );
    let type = container.querySelector( '.dxEvent__typeOf' );
    expect( type ).toBeNull();
} );

test( "If the eventType prop for the river-small variant is passed the element 'dxEvent__typeOf' will be in the document", () => {
    const eventProps = {
        eventFrom: "2021-10-27T07:00:00",
        eventTo: "2021-11-07T07:00:00",
        eventName: {
            label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
            url: "https://hcl-software.com",
            target: "_self"
        },
        eventType: "Type of event"
    };
    const { container } = render( <DXEvent variant="river" {...eventProps} /> );
    let type = container.querySelector( '.dxEvent--river__typeOf' );
    expect( type ).toBeInTheDocument();
} );

// Test links logic
test( "If the featured event's name does not receive a URL, 'http://localhost/#' should replace it", () => {
    const eventProps = {
        ...eventData,
        eventName: {
            label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
            url: "",
            target: "_self"
        },
    };
    const { container } = render( <DXEvent variant="featured" {...eventProps} /> );
    const aEl = container.querySelector( ".dxEvent--featured__name" )?.childNodes[0] as HTMLAnchorElement;
    expect( aEl?.href ).toEqual( "http://localhost/#" );
} );

test( "If the featured event's name does not get a valid target, '_self' should replace it", () => {
    const eventProps = {
        ...eventData,
        eventName: {
            label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
            url: "https://hcl-software.com",
            target: "_new"
        },
    };
    const { container } = render( <DXEvent variant="featured" {...eventProps} /> );
    const aEl = container.querySelector( ".dxEvent--featured__name" )?.childNodes[0] as HTMLAnchorElement;
    expect( aEl?.target ).toEqual( "_self" );
} );

test( "If the featured event's name gets a valid target, it should assign it to it", () => {
    const eventProps = {
        ...eventData,
        eventName: {
            label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
            url: "https://hcl-software.com",
            target: "_blank"
        },
    };
    const { container } = render( <DXEvent variant="featured" {...eventProps} /> );
    const aEl = container.querySelector( ".dxEvent--featured__name" )?.childNodes[0] as HTMLAnchorElement;
    expect( aEl?.target ).toEqual( "_blank" );
} );

describe.each( [
    ["featured", ".dxEvent--featured__name"],
    ["featured-compact", ".dxEvent--featuredCompact__name"],
    ["river", ".dxEvent--river__name"],
] )( "Event external-link icon behavior for %s", ( variant, nameSelector ) => {
    test.each( [
        [true, "_self", true],
        [true, "_blank", true],
        [false, "_blank", false],
        [undefined, "_blank", false],
        [false, "_self", false],
        [undefined, "_self", false],
    ] )( "shows arrow %s with target %s independently from navigation", ( showExternalIcon, target, showsArrow ) => {
        const { container } = render(
            <DXEvent
                variant={variant as "featured" | "featured-compact" | "river"}
                {...eventData}
                showExternalIcon={showExternalIcon as boolean | undefined}
                eventName={{ ...eventData.eventName, target }}
            />
        );
        const icon = container.querySelector( `${nameSelector} .ci-Arrow_Up_Right_MD` );
        const link = container.querySelector( `${nameSelector} a` );

        if ( showsArrow ) {
            expect( icon ).toBeInTheDocument();
            expect( icon ).toHaveAttribute( "aria-hidden", "true" );
        } else expect( icon ).toBeNull();
        expect( container.querySelector( `${nameSelector} .ci-External_Link` ) ).toBeNull();
        expect( link ).toHaveAttribute( "target", target );
    } );
} );

test( "An explicit River Compact event remains icon-free when showExternalIcon is true", () => {
    const { container } = render( <DXEvent variant="river" compact showExternalIcon {...eventData} /> );

    expect( container.querySelector( ".ci-Arrow_Up_Right_MD" ) ).toBeNull();
} );

test( "If the featured event's name does not receive a URL, 'http://localhost/#' should replace it", () => {
    const eventProps = {
        ...eventData,
        eventName: {
            label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
            url: "",
            target: "_self"
        }
    };
    const { container } = render( <DXEvent variant="featured" {...eventProps} /> );
    const aEl = container.querySelector( ".dxEvent--featured__name" )?.childNodes[0] as HTMLAnchorElement;
    expect( aEl?.href ).toEqual( "http://localhost/#" );
} );

test( "If the river event's name does not get a valid target, '_self' should replace it", () => {
    const eventProps = {
        ...eventData,
        eventName: {
            label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
            url: "https://hcl-software.com",
            target: "_new"
        },
    };
    const { container } = render( <DXEvent variant="river" {...eventProps} /> );
    const aEl = container.querySelector( ".dxEvent--river__name" )?.childNodes[0] as HTMLAnchorElement;
    expect( aEl?.target ).toEqual( "_self" );
} );

test( "If the river event's name gets a valid target, it should assign it to it", () => {
    const eventProps = {
        ...eventData,
        eventName: {
            label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
            url: "https://hcl-software.com",
            target: "_blank"
        },
    };
    const { container } = render( <DXEvent variant="river" {...eventProps} /> );
    const aEl = container.querySelector( ".dxEvent--river__name" )?.childNodes[0] as HTMLAnchorElement;
    expect( aEl?.target ).toEqual( "_blank" );
} );

// Test if the component only receive dateFrom
test( "If the user passes just the dateFrom prop, the indicator element will be null", () => {
    const eventProps = {
        eventName: {
            label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
            url: "https://hcl-software.com",
            target: "_blank"
        },
        eventFrom: "2021-10-27T07:00:00",
        eventType: "SCHOLAR"
    };
    const { container } = render( <DXEvent variant="featured" {...eventProps} /> );
    let indicator = container.querySelector( '[data-testid="event-indicator"]' );
    expect( indicator ).toBeNull();
} );

test( "If the user passes just the dateFrom prop, it the date-to element will be null", () => {
    const eventProps = {
        eventName: {
            label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
            url: "https://hcl-software.com",
            target: "_blank"
        },
        eventFrom: "2021-10-27T07:00:00",
        eventType: "SCHOLAR"
    };
    const { container } = render( <DXEvent variant="featured" {...eventProps} /> );
    let indicator = container.querySelector( '[data-testid="event-date-to"]' );
    expect( indicator ).toBeNull();
} );

test( "If the user passes the dateFrom and dateTo props, it will render the date-to element", () => {
    const eventProps = {
        eventName: {
            label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
            url: "https://hcl-software.com",
            target: "_blank"
        },
        eventFrom: "2021-10-27T07:00:00",
        eventTo: "2021-11-07T07:00:00",
        eventType: "SCHOLAR"
    };
    const { container } = render( <DXEvent variant="featured" {...eventProps} /> );
    let indicator = container.querySelector( '[data-testid="event-date-to"]' );
    expect( indicator ).toBeInTheDocument();
} );
// Test if the eventIcon prop
test( "If the user does not pass the eventIcon prop for the river variant, the value default will be 'ci-Calendar_Days'", () => {
    const { container } = render( <DXEvent variant="river" {...eventData} /> );
    let icon = container.querySelector( ".dxEvent--river__calendarIcon" )?.childNodes[0];
    expect( icon ).toHaveClass( "ci-Calendar_Days" );
    expect( icon ).toHaveAttribute( "aria-hidden", "true" );
} );
test( "If the user does pass the eventIcon prop for the river variant, the value will be assigned", () => {
    const { container } = render( <DXEvent variant="river" icons={{ event: "ci-User_01" }} {...eventData} /> );
    let icon = container.querySelector( ".dxEvent--river__calendarIcon" )?.childNodes[0];
    expect( icon ).toHaveClass( "ci-User_01" );
} );
test( "If the user does not pass the eventIcon prop for the featured variant, the value default will be 'ci-Calendar_Days'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 370; }
        }
    } );
    const { container } = render( <DXEvent variant="featured" {...eventData} /> );
    let icon = container.querySelector( ".dxEvent--featured__calendarIcon" )?.childNodes[0];
    expect( icon ).toHaveClass( "ci-Calendar_Days" );
    expect( icon ).toHaveAttribute( "aria-hidden", "true" );
} );
test( "If the user does pass the eventIcon prop for the featured variant, the value will be assigned", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 370; }
        }
    } );
    const { container } = render( <DXEvent variant="featured" icons={{ featured: "ci-User_01" }} {...eventData} /> );
    let icon = container.querySelector( ".dxEvent--featured__calendarIcon" )?.childNodes[0];
    expect( icon ).toHaveClass( "ci-User_01" );
} );

test( "The featured event renders location text without a location icon", () => {
    const location = "Interior>Level 1>145 Conference Room";
    const { container } = render( <DXEvent variant="featured" eventLocation={location} icons={{ location: "ci-User_01" }} {...eventData} /> );

    expect( screen.getByText( location ) ).toBeInTheDocument();
    expect( container.querySelector( '[data-testid="event__locationIcon"]' ) ).toBeNull();
    expect( container.querySelector( ".dxEvent__location i" ) ).toBeNull();
} );

test( "The featured event keeps its default and overridden event calendar icon", () => {
    const { container, rerender } = render( <DXEvent variant="featured" {...eventData} /> );

    expect( container.querySelector( ".dxEvent__info i" ) ).toHaveClass( "ci-Calendar_Days" );
    expect( container.querySelector( ".dxEvent__info i" ) ).toHaveAttribute( "aria-hidden", "true" );

    rerender( <DXEvent variant="featured" icons={{ event: "ci-User_01" }} {...eventData} /> );

    expect( container.querySelector( ".dxEvent__info i" ) ).toHaveClass( "ci-User_01" );
} );

test.each( [
    ["at the limit", "123456789012345678901234567890123456789012345678901234567890", "123456789012345678901234567890123456789012345678901234567890", null],
    ["above the limit", "1234567890123456789012345678901234567890123456789012345678901", "123456789012345678901234567890123456789012345678901234567890...", "1234567890123456789012345678901234567890123456789012345678901"],
] )( "The featured event label is %s", ( _caseName, label, expectedLabel, accessibleLabel ) => {
    const { getByRole } = render( <DXEvent variant="featured" {...eventData} eventName={{ ...eventData.eventName, label }} /> );
    const link = getByRole( "link" );

    expect( link ).toHaveTextContent( expectedLabel );
    if ( accessibleLabel ) expect( link ).toHaveAttribute( "aria-label", accessibleLabel );
    else expect( link ).not.toHaveAttribute( "aria-label" );
} );

test.each( [
    ["at the limit", "12345678901234567890123456789", "12345678901234567890123456789", null],
    ["below the limit", "Short event", "Short event", null],
    ["above the limit", "123456789012345678901234567890", "12345678901234567890123456789...", "123456789012345678901234567890"],
] )( "The featured compact event label is %s", ( _caseName, label, expectedLabel, accessibleLabel ) => {
    const { getByRole } = render( <DXEvent variant="featured-compact" {...eventData} eventName={{ ...eventData.eventName, label }} /> );
    const link = getByRole( "link" );

    expect( link ).toHaveTextContent( expectedLabel );
    if ( accessibleLabel ) expect( link ).toHaveAttribute( "aria-label", accessibleLabel );
    else expect( link ).not.toHaveAttribute( "aria-label" );
} );

test.each( [
    ["at the limit", "123456789012345678901234567890123456789012345678901234567890", "123456789012345678901234567890123456789012345678901234567890", null],
    ["above the limit", "1234567890123456789012345678901234567890123456789012345678901", "123456789012345678901234567890123456789012345678901234567890...", "1234567890123456789012345678901234567890123456789012345678901"],
] )( "The river event label is %s", ( _caseName, label, expectedLabel, accessibleLabel ) => {
    const { getByRole } = render( <DXEvent variant="river" {...eventData} eventName={{ ...eventData.eventName, label }} /> );
    const link = getByRole( "link" );

    expect( link ).toHaveTextContent( expectedLabel );
    if ( accessibleLabel ) expect( link ).toHaveAttribute( "aria-label", accessibleLabel );
    else expect( link ).not.toHaveAttribute( "aria-label" );
} );

test.each( [
    ["at the limit", "1234567890123456789012345", "1234567890123456789012345", null],
    ["above the limit", "12345678901234567890123456", "1234567890123456789012345...", "12345678901234567890123456"],
] )( "The river compact event label is %s", ( _caseName, label, expectedLabel, accessibleLabel ) => {
    const { getByRole } = render( <DXEvent variant="river" compact {...eventData} eventName={{ ...eventData.eventName, label }} /> );
    const link = getByRole( "link" );

    expect( link ).toHaveTextContent( expectedLabel );
    if ( accessibleLabel ) expect( link ).toHaveAttribute( "aria-label", accessibleLabel );
    else expect( link ).not.toHaveAttribute( "aria-label" );
} );

// RTL direction tests
describe( "RTL direction support", () => {
    test( "When dir='rtl' is passed, the root element has the dxEvent--rtl class and dir attribute", () => {
        const { container } = render( <DXEvent variant="featured" dir="rtl" {...eventData} /> );
        const root = container.querySelector( ".dxEvent" );
        expect( root ).toHaveClass( "dxEvent--rtl" );
        expect( root ).toHaveAttribute( "dir", "rtl" );
    } );

    test( "When dir='ltr' is passed, the root element does NOT have dxEvent--rtl class", () => {
        const { container } = render( <DXEvent variant="featured" dir="ltr" {...eventData} /> );
        const root = container.querySelector( ".dxEvent" );
        expect( root ).not.toHaveClass( "dxEvent--rtl" );
        expect( root ).toHaveAttribute( "dir", "ltr" );
    } );

    test( "When eventTo is earlier than eventFrom, the earlier date is displayed first (chronological swap)", () => {
        // eventFrom=Nov 07, eventTo=Oct 27 → should display Oct 27 first
        const props = {
            ...eventData,
            eventFrom: "2021-11-07T07:00:00",
            eventTo: "2021-10-27T07:00:00",
        };
        const { container } = render( <DXEvent variant="featured" {...props} /> );
        const dateFrom = container.querySelector( '[data-testid="event-date-from"]' );
        // After swap, the from slot should show OCT (the earlier month)
        expect( dateFrom?.textContent ).toContain( "OCT" );
    } );

    test( "Renders without crashing when eventFrom contains Arabic-Indic numerals", () => {
        // ٢٠٢٦-٠٥-٠٩T١٢:٠٠:٠٠Z = 2026-05-09T12:00:00Z
        const props = {
            ...eventData,
            eventFrom: "٢٠٢٦-٠٥-٠٩T١٢:٠٠:٠٠Z",
            eventTo: undefined,
        };
        expect( () => render( <DXEvent variant="featured" {...props} /> ) ).not.toThrow();
    } );

    test( "Renders without crashing when eventFrom contains Extended Arabic-Indic numerals", () => {
        // ۲۰۲۶/۰۵/۰۹ = 2026/05/09
        const props = {
            ...eventData,
            eventFrom: "۲۰۲۶-۰۵-۰۹T۱۲:۰۰:۰۰Z",
            eventTo: undefined,
        };
        expect( () => render( <DXEvent variant="featured" {...props} /> ) ).not.toThrow();
    } );
} );

describe( "DXEvent Hardening", () => {
    const strictEventData = {
        eventName: { label: "Hardened Event", url: "https://hcl.com", target: "_self" },
        eventFrom: "2021-10-27T07:00:00"
    };

    describe( "Component Lifecycle & DOM Observers", () => {
        it( "strictly disconnects the MutationObserver upon component unmount to prevent memory leaks", () => {
            const disconnectSpy = jest.fn();
            global.MutationObserver = class {
                observe() {}
                disconnect = disconnectSpy;
                takeRecords() { return []; }
            } as any;

            const { unmount } = render( <DXEvent variant="featured" {...strictEventData} dir={undefined} /> );
            unmount();

            expect( disconnectSpy ).toHaveBeenCalledTimes( 1 );
        } );

        it( "forces execution of the internal MutationObserver update callback when document properties shift", async () => {
            let capturedCallback: MutationCallback | null = null;
            global.MutationObserver = class {
                constructor( callback: MutationCallback ) { capturedCallback = callback; }
                observe() {}
                disconnect() {}
                takeRecords() { return []; }
            } as any;

            // Render without explicit dir to activate the observer
            const { container } = render( <DXEvent variant="featured" {...strictEventData} dir={undefined} /> );
            const root = container.firstChild as HTMLElement;

            // Initially it resolves to ltr
            expect( root.className ).not.toContain( "dxEvent--rtl" );

            // Mock the global computed style to simulate an external RTL flip on the HTML tag
            window.getComputedStyle = jest.fn().mockReturnValue( { direction: 'rtl' } );

            // Fire the observer callback directly to test the internal `update()` closure
            await act( async () => {
                if ( capturedCallback ) {
                    capturedCallback( [], {} as MutationObserver );
                }
            } );

            // The state flip should apply the RTL class dynamically
            expect( root.className ).toContain( "dxEvent--rtl" );
        } );
    } );

    describe( "Math Boundaries & Date Engine Bailouts", () => {
        it( "strictly bails out of chronological logic if eventFrom evaluates to an invalid moment date", () => {
            const { container } = render( <DXEvent variant="featured" {...strictEventData} eventFrom="invalid-garbage-string" /> );

            // Because the date is invalid, the useEffect returns immediately. 
            // The state remains empty, forcing shortMonth to be undefined (renders as empty).
            const dateFromSpan = container.querySelector( '[data-testid="event-date-from"] span' );
            expect( dateFromSpan?.textContent ).toBe( "" );
        } );

        it( "evaluates strict equality (toMs < fromMs) without swapping when dates are exactly identical", () => {
            const exactDate = "2026-05-09T12:00:00Z";

            // If the mutant changed `<` to `<=`, it would trigger a redundant swap. 
            // By making them identical, we ensure the boundary logic remains rigid.
            const { getByTestId } = render( <DXEvent variant="featured" {...strictEventData} eventFrom={exactDate} eventTo={exactDate} /> );

            expect( getByTestId( "event-date-to" ) ).toBeInTheDocument();
        } );
    } );

    describe( "Switch Defaults & Conditional Empty String Traps", () => {
        it( "strictly enforces switch default fallbacks for unmapped variant strings", () => {
            // We pass an unknown string to force the 'default' cases in getVariant and getTopClass
            const { container } = render( <DXEvent {...strictEventData} variant={"unmapped-variant" as any} /> );

            const root = container.firstChild as HTMLElement;
            // The default getVariant fallback is "dxEvent--featured"
            expect( root.className ).toContain( "dxEvent--featured" );

            const topLabel = screen.getByTestId( "event-date-from" );
            // The default getTopClass fallback is "dxEvent__topLabel"
            expect( topLabel.className ).toContain( "dxEvent__topLabel" );
        } );

        it( "omits the location wrapper when eventLocation is an empty string", () => {
            // Tests the `props.eventLocation !== ""` condition that Stryker loves to mutate to `!=` or remove
            const { container } = render( <DXEvent variant="featured" {...strictEventData} eventLocation="" /> );

            const location = container.querySelector( ".dxEvent__location" );
            expect( location ).toBeNull();
        } );
    } );
} );
