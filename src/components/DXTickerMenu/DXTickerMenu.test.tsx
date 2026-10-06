import React, { act } from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { CustomCurrencySymbolArgs, NoItemExampleArgs, TickerMenuArgs, customEmptyArgs } from "./DXTickerMenu.stories";
import DXTickerMenu from "./DXTickerMenu";


test( "If the componet renders a ticker name correctly", () => {
    render( <DXTickerMenu {...TickerMenuArgs} /> );
    expect( screen.getAllByTestId( "tickerMenu__label" )[0] ).toHaveTextContent( TickerMenuArgs.items[0].name );
} );

test( "If the componet renders broker name correctly", () => {
    render( <DXTickerMenu {...TickerMenuArgs} /> );
    expect( screen.getAllByTestId( "tickerMenu__broker" )[0] ).toHaveTextContent( TickerMenuArgs.items[0].broker );
} );

test( "If the componet renders a ticker price correctly", () => {
    render( <DXTickerMenu {...TickerMenuArgs} /> );
    expect( screen.getAllByTestId( "tickerMenu__price" )[0] ).toHaveTextContent( "$" + TickerMenuArgs.items[0].price.toFixed( 2 ) );
} );

test( "If the componet renders a ticker price correctly with sign change", () => {
    render( <DXTickerMenu {...CustomCurrencySymbolArgs} /> );
    expect( screen.getAllByTestId( "tickerMenu__price" )[0] ).toHaveTextContent( CustomCurrencySymbolArgs.currencySymbol + TickerMenuArgs.items[0].price.toFixed( 2 ) );
} );

//VIEW MORE LINK TESTS
test( "If the 'View more' link title is correct", () => {
    render( <DXTickerMenu {...TickerMenuArgs} /> );
    expect( screen.getAllByTestId( "tickerMenu__moreLink" )[0] ).toHaveAttribute( "title", TickerMenuArgs.items[0].link.label );
} );

test( "If the 'View more' URL is correct", () => {
    render( <DXTickerMenu {...TickerMenuArgs} /> );
    expect( screen.getAllByTestId( "tickerMenu__moreLink" )[0] ).toHaveAttribute( "href", TickerMenuArgs.items[0].link.url );
} );

test( "If the 'View more' Target is correct", () => {
    render( <DXTickerMenu {...TickerMenuArgs} /> );
    expect( screen.getAllByTestId( "tickerMenu__moreLink" )[0] ).toHaveAttribute( "target", TickerMenuArgs.items[0].link.target );
} );

//PERCENTAGE TESTS
test( "If percentage value shows fine", () => {
    render( <DXTickerMenu {...TickerMenuArgs} /> );
    expect( screen.getAllByTestId( "tickerMenu__percentage" )[0] ).toHaveTextContent( TickerMenuArgs.items[0].percentage + "%" );
} );

test( "If percentage color class matches", () => {
    let item = {
        name: "BMV: MGM",
        price: 43.50,
        broker: "MGM",
        percentage: 0.52,
        link: {
            label: "",
            url: "www.hcl-software.com",
            target: "_self",
        }
    };
    render( <DXTickerMenu items={[item]} /> );
    expect( screen.getAllByTestId( "tickerMenu__percentage" )[0].parentElement ).toHaveClass( "dxTickerMenu__values--Up" );
} );

test( "If percentage icon matches percentage value (POSITIVE) ", () => {
    let item = {
        name: "BMV: MGM",
        price: 1,
        percentage: 1,
        broker: "MGM",
        link: {
            label: "",
            url: "www.hcl-software.com",
            target: "_self"
        }
    };
    render( <DXTickerMenu items={[item]} /> );
    expect( screen.getByTestId( "tickerMenu__percentage" ).firstChild ).toHaveClass( "ci-Arrow_Up_LG" );
} );

test( "If percentage icon matches percentage value (NEGATIVE) ", () => {
    let item = {
        name: "BMV",
        broker: "MGM",
        price: 1,
        percentage: -1,
        link: {
            label: "",
            url: "www.hcl-software.com",
            target: "_self"
        }
    };
    render( <DXTickerMenu items={[item]} /> );
    expect( screen.getByTestId( "tickerMenu__percentage" ).firstChild ).toHaveClass( "ci-Arrow_Down_LG" );
} );

//Progress bar tests
test( "If the bar keeps the width: 0 value if only 1 item is set", () => {
    render( <DXTickerMenu {...CustomCurrencySymbolArgs} /> );
    expect( screen.queryByTestId( "tickerMenu__timerBar" ) ).toBeNull();
} );

test( "If the bar increases its width", async () => {
    render( <DXTickerMenu {...TickerMenuArgs} /> );
    await act( async () => {
        //Wait to prove component didn't scroll
        await new Promise( r => setTimeout( r, 1000 ) );
    } );
    expect( screen.getByTestId( "tickerMenu__timerBar" ) ).toHaveStyle( "width: 10%" );
} );

test( "The item changes after autoScroll timer pass", () => {
    jest.useFakeTimers();
    render( <DXTickerMenu {...TickerMenuArgs} animationTime={0.5} /> );

    // Initially, first item should be active
    expect( screen.getAllByTestId( "tickerMenu__item" )[0] ).toHaveClass( "dxTickerMenu__item--active" );

    // Fast forward time by 500ms (one full animation cycle)
    act( () => {
        jest.advanceTimersByTime( 500 );
    } );

    // After timer passes, some item should be active (auto-scroll is working)
    const items = screen.getAllByTestId( "tickerMenu__item" );
    const activeItems = items.filter( item => item.classList.contains( "dxTickerMenu__item--active" ) );
    expect( activeItems ).toHaveLength( 1 );

    jest.useRealTimers();
} );

//Empty Data test
test( "empty container is rendered when no links are added", () => {
    render( <DXTickerMenu {...NoItemExampleArgs} /> );
    expect( screen.getByTestId( "dxEmptyState" ) ).not.toBeNull();
} );

test( "empty container is rendered when no links are added and custom the empty properties", () => {
    render( <DXTickerMenu {...customEmptyArgs} /> );
    expect( screen.getByTestId( "dxEmptyState" ) ).not.toBeNull();
    expect( screen.getByTestId( "dxEmptyState" ).querySelector( "h5" ) ).toBeInTheDocument();
    expect( screen.getByTestId( "dxEmptyState" ).querySelector( "img" ) ).toBeInTheDocument();
} );

test( "If icons change", () => {
    let icons = {
        up: "ci-Chevron_Up_Duo",
        link: "ci-Arrow_Right_MD"
    };
    render( <DXTickerMenu {...TickerMenuArgs} icons={icons} /> );
    expect.assertions( 2 );
    expect( screen.getAllByTestId( "tickerMenu__moreLink" )[0].querySelector( "i" ) ).toHaveClass( icons.link );
    expect( screen.getAllByTestId( "tickerMenu__percentage" )[0].querySelector( "i" ) ).toHaveClass( icons.up );
} );
