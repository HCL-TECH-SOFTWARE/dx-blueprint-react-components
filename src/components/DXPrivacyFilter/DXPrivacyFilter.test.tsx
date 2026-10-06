import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { DefaultPrivacyFilterArgs, ActivePrivacyFilterArgs, ImagePrivacyFilterArgs, PrivacyFilterChangedIconsArgs } from "./DXPrivacyFilter.stories";
import PrivacyFilter from "./DXPrivacyFilter";

test( "button adds and removes privacyFilter class on click", async () => {
    render(
        <>
            <PrivacyFilter {...DefaultPrivacyFilterArgs} />
            <span data-testid="pf-span" id="paragraph"></span>
        </>
    );
    let button = screen.getByRole( "button" );
    await userEvent.click( button );
    let objectToBlurr = screen.getByTestId( "pf-span" );
    expect( objectToBlurr ).toHaveClass( "privacyFilterOn" );
    await userEvent.click( button );
    expect( objectToBlurr ).not.toHaveClass( "privacyFilterOn" );
    expect( objectToBlurr ).toHaveClass( "privacyFilterOff" );
} );

test( "when isActive is set to 'true', objects by default have class privacyFilterOn", async () => {
    render(
        <>
            <PrivacyFilter {...ActivePrivacyFilterArgs} />
            <span data-testid="pf-span" id="paragraph"></span>
        </>
    );
    let objectToBlurr = screen.getByTestId( "pf-span" );
    expect( objectToBlurr ).toHaveClass( "privacyFilterOn" );
} );

test( "when labels are not set default inactive value is rendered", async () => {
    const { container } = render( <PrivacyFilter {...DefaultPrivacyFilterArgs} /> );
    let button = container.querySelector( ".dxPrivacyFilter__button" );
    expect( button ).toHaveTextContent( "Hide values" );
} );

test( "when labels are not set default active value is rendered", async () => {
    const { container } = render( <PrivacyFilter {...ActivePrivacyFilterArgs} /> );
    let button = container.querySelector( ".dxPrivacyFilter__button" );
    expect( button ).toHaveTextContent( "Show values" );
} );

test( "when labels are set default inactive value is rendered", async () => {
    let props = JSON.parse( JSON.stringify( ImagePrivacyFilterArgs ) );
    props.isActive = false;
    const { container } = render( <PrivacyFilter {...props} /> );
    let button = container.querySelector( ".dxPrivacyFilter__button" );
    expect( button ).toHaveTextContent( props.inactiveLabel );
} );

test( "when labels are set default active value is rendered", async () => {
    let props = JSON.parse( JSON.stringify( ImagePrivacyFilterArgs ) );
    props.isActive = true;
    const { container } = render( <PrivacyFilter {...props} /> );
    let button = container.querySelector( ".dxPrivacyFilter__button" );
    expect( button ).toHaveTextContent( props.activeLabel );
} );

test( "If icon changes", () => {
    render( <PrivacyFilter {...PrivacyFilterChangedIconsArgs} /> );
    expect( screen.getByTestId( "pf-icon" ) ).toHaveClass( PrivacyFilterChangedIconsArgs.icons?.hide! );
} );
