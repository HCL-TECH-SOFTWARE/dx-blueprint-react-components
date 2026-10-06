import React from "react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { CustomCurrencySignArgs, TickerArgs, customEmptyArgs, emptyTickerArgs } from "./DXTicker.stories";
import DXTicker from "./DXTicker";
import moment from "moment";

test( "If the componet renders a ticker borker correctly", () => {
    render( <DXTicker {...TickerArgs} /> );
    expect( screen.getByTestId( "ticker__label" ) ).toHaveTextContent( TickerArgs.items[0].broker );
} );

test( "If the componet renders a ticker price correctly", () => {
    render( <DXTicker {...TickerArgs} /> );
    expect( screen.getByTestId( "ticker__price" ) ).toHaveTextContent( "$" + TickerArgs.items[0].price.toFixed( 2 ) );
} );

test( "If the componet renders a custom currency symbol correctly", () => {
    render( <DXTicker {...CustomCurrencySignArgs} /> );
    expect( screen.getByTestId( "ticker__price" ) ).toHaveTextContent( "€" + TickerArgs.items[0].price.toFixed( 2 ) );
} );

test( "If the componet renders a ticker DateTime correctly", () => {
    render( <DXTicker {...TickerArgs} /> );
    expect( screen.getByTestId( "ticker__date" ) ).toHaveTextContent( moment( TickerArgs.items[0].dateTime, moment.ISO_8601 ).format( "MMMM Do YYYY HH:mm" ) );
} );

test( "If the time has an invalid format the component does not render the DateTime and logs a warning", () => {
    const spyConsoleWarn = jest.spyOn( console, 'warn' );
    let props = JSON.parse( JSON.stringify( TickerArgs ) );
    props.items[0].dateTime = "invalid";
    render( <DXTicker {...props} /> );
    expect( spyConsoleWarn ).toHaveBeenCalledWith( 'Invalid value for DXTicker: Ticker dateTime doesn\'t comply with the ISO 8601 format' );
    spyConsoleWarn.mockRestore();
} );

test( "If the buttons renders ticker name", () => {
    render( <DXTicker {...TickerArgs} /> );
    expect( screen.getAllByTestId( "ticker__button" )[0] ).toHaveTextContent( TickerArgs.items[0].name );
} );

test( "If all butons render", () => {
    render( <DXTicker {...TickerArgs} /> );
    expect( screen.getByTestId( "ticker__btnGroup" ).children.length ).toEqual( TickerArgs.items.length );
} );

test( "If the first button has the active class as default", () => {
    render( <DXTicker {...TickerArgs} /> );
    expect( screen.getAllByTestId( "ticker__button" )[0] ).toHaveClass( "dxTicker__active" );
} );

test( "If active class changes to button if clicked", async () => {
    render( <DXTicker {...TickerArgs} /> );
    let button = screen.getAllByTestId( "ticker__button" )[1];

    await userEvent.click( button );

    expect( button ).toHaveClass( "dxTicker__active" );
} );

test( "If the ticker values changes on different symbol button click", async () => {
    render( <DXTicker {...TickerArgs} /> );
    let button = screen.getAllByTestId( "ticker__button" )[1];

    await userEvent.click( button );

    expect( screen.getByTestId( "ticker__label" ) ).toHaveTextContent( TickerArgs.items[1].broker );
} );

//VIEW MORE LINK TESTS
test( "If the link label is set as Title", () => {
    render( <DXTicker {...TickerArgs} /> );
    expect( screen.getByTestId( "ticker__moreLink" ) ).toHaveAttribute( "title", TickerArgs.items[0].link.label );
} );

test( "If the 'View more' default Title is correct", () => {
    let props = JSON.parse( JSON.stringify( TickerArgs ) );
    delete props.items[0].link.label;
    render( <DXTicker {...props} /> );
    expect( screen.getByTestId( "ticker__moreLink" ) ).toHaveAttribute( "title", "View more" );
} );

test( "If the 'View more' URL is correct", () => {
    render( <DXTicker {...TickerArgs} /> );
    expect( screen.getByTestId( "ticker__moreLink" ) ).toHaveAttribute( "href", TickerArgs.items[0].link.url );
} );

test( "If the 'View more' Target is correct", () => {
    render( <DXTicker {...TickerArgs} /> );
    expect( screen.getByTestId( "ticker__moreLink" ) ).toHaveAttribute( "target", TickerArgs.items[0].link.target );
} );

//PERCENTAGE TESTS
test( "If percentage value shows fine", () => {
    render( <DXTicker {...TickerArgs} /> );
    expect( screen.getByTestId( "ticker__percentage" ) ).toHaveTextContent( TickerArgs.items[0].percentage + "%" );
} );

test( "If percentage color class matches (POSITIVE)", () => {
    let item = {
        name: "BMV",
        broker: "MGM",
        price: 1,
        percentage: 1, //POSITIVE VALUE
        dateTime: moment().toISOString(),
        link: {
            url: "www.hcl-software.com",
            label: "Link"
        }
    };
    render( <DXTicker items={[item]} /> );
    expect( screen.getByTestId( "ticker__percentage" ) ).toHaveClass( "dxTicker__percentage--Up" );
} );

test( "If percentage icon matches percentage value (POSITIVE) ", () => {
    let item = {
        name: "BMV",
        broker: "MGM",
        price: 1,
        percentage: 1, //POSITIVE VALUE
        dateTime: moment().toISOString(),
        link: {
            url: "www.hcl-software.com",
            label: "Link"
        }
    };
    render( <DXTicker items={[item]} /> );
    expect( screen.getByTestId( "ticker__percentage" ).firstChild ).toHaveClass( "ci-Arrow_Up_LG" );
} );

test( "If percentage color class matches (NEGATIVE)", () => {
    let item = {
        name: "BMV",
        broker: "MGM",
        price: 1,
        percentage: -1, //NEGATIVE VALUE
        dateTime: moment().toISOString(),
        link: {
            url: "www.hcl-software.com",
            label: "Link"
        }
    };
    render( <DXTicker items={[item]} /> );
    expect( screen.getByTestId( "ticker__percentage" ) ).toHaveClass( "dxTicker__percentage--Down" );
} );

test( "If percentage icon matches percentage value (NEGATIVE) ", () => {
    let item = {
        name: "BMV",
        broker: "MGM",
        price: 1,
        percentage: -1, //NEGATIVE VALUE
        dateTime: moment().toISOString(),
        link: {
            url: "www.hcl-software.com",
            label: "Link"
        }
    };
    render( <DXTicker items={[item]} /> );
    expect( screen.getByTestId( "ticker__percentage" ).firstChild ).toHaveClass( "ci-Arrow_Down_LG" );
} );

test( "If percentage color class matches (ZERO)", () => {
    let item = {
        name: "BMV",
        broker: "MGM",
        price: 1,
        percentage: 0,
        dateTime: moment().toISOString(),
        link: {
            url: "www.hcl-software.com",
            label: "Link"
        }
    };
    render( <DXTicker items={[item]} /> );
    expect( screen.getByTestId( "ticker__percentage" ).classList.length ).toBe( 1 );
} );


//Empty Data test
test( "empty container is rendered when no links are added", () => {
    render( <DXTicker {...emptyTickerArgs} /> );
    expect( screen.getByTestId( "dxEmptyState" ) ).not.toBeNull();
} );

test( "empty container is rendered when no links are added and custom the empty properties", () => {
    render( <DXTicker {...customEmptyArgs} /> );
    expect( screen.getByTestId( "dxEmptyState" ) ).not.toBeNull();
    expect( screen.getByTestId( "dxEmptyState" ).querySelector( "h5" ) ).toBeInTheDocument();
    expect( screen.getByTestId( "dxEmptyState" ).querySelector( "p" ) ).toBeInTheDocument();
    expect( screen.getByTestId( "dxEmptyState" ).querySelector( "img" ) ).toBeInTheDocument();
} );


test( "If icons change", () => {
    let icons = {
        up: "ci-Chevron_Up_Duo",
        link: "ci-Arrow_Right_MD"
    };
    render( <DXTicker {...TickerArgs} icons={icons} /> );
    expect.assertions( 2 );
    expect( screen.getByTestId( "ticker__moreLink" ).querySelector( "i" ) ).toHaveClass( icons.link );
    expect( screen.getByTestId( "ticker__percentage" ).querySelector( "i" ) ).toHaveClass( icons.up );
} );
