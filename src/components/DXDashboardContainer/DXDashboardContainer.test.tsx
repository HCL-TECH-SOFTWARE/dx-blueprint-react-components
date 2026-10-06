import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXDashboardContainer from "./DXDashboardContainer";
import { CollapsibleArgs, CustomCollapsibleArgs, DashboardContainerArgs, StringChildArgs } from "./DXDashboardContainer.stories";

// Testing basic render of prop
test( "Title don't render if no value is set", () => {
    render( <DXDashboardContainer elements={[]} /> );
    expect( screen.getByTestId( "DC__title" ) ).toHaveTextContent( "" );
} );

test( "Title parameter is set", () => {
    render( <DXDashboardContainer title="Title" elements={[]} /> );
    expect( screen.getByTestId( "DC__title" ) ).toHaveTextContent( "Title" );
} );

test( "If icon shows if value is set", () => {
    render( <DXDashboardContainer icons={{ header: "ci-Globe" }} elements={[]} /> );
    expect( screen.getByTestId( "DC__headerIcon" ) ).toHaveClass( "ci-Globe" );
} );

test( "If link renders as expected", () => {
    render( <DXDashboardContainer {...DashboardContainerArgs} /> );
    expect( screen.getByTestId( "DC__link" ) ).toHaveAttribute( "href", DashboardContainerArgs.link?.url );
} );

//Children test
test( "Check rendering of reactChild element", () => {
    render( <DXDashboardContainer {...DashboardContainerArgs} /> );
    expect( screen.getByTestId( "DC__element" ).querySelector( ".dxHeroBanner" ) ).toBeInTheDocument();
} );

test( "Check rendering of customChild element", () => {
    render( <DXDashboardContainer {...StringChildArgs} /> );
    expect( screen.getByTestId( "DC__element" ).querySelector( ".dxHeroBanner" ) ).toBeInTheDocument();
} );

test( "Check subtitle matches the parameter value", () => {
    render( <DXDashboardContainer {...DashboardContainerArgs} /> );
    expect( screen.getByTestId( "DC_subtitle" ) ).toHaveTextContent( DashboardContainerArgs.elements[0].subtitle! );
} );

//Collapsible tests
test( "If collapsible mode is off, overlay won't show", () => {
    render( <DXDashboardContainer {...DashboardContainerArgs} /> );
    expect( screen.queryByTestId( "DC__overlay" ) ).toBeNull();
} );

test( "If collapsible mode is on, the overlay renders ", () => {
    render( <DXDashboardContainer {...CollapsibleArgs} /> );
    expect( screen.getByTestId( "DC__overlay" ) ).not.toBeNull();
} );

test( "If overlay is hidden when the property disables it", () => {
    render( <DXDashboardContainer {...CustomCollapsibleArgs} /> );
    expect( screen.queryByTestId( "DC__overlay" ) ).toBeNull();
} );

test( "If collapsible mode is on, in the inital render the components will be collapsed ", () => {
    render( <DXDashboardContainer {...CustomCollapsibleArgs} /> );
    expect( screen.getByTestId( "DC__element" ) ).toHaveClass( "dxDashboardContainer__element--collapsed" );
} );

test( "If collapsed element expands on button click ", async () => {
    render( <DXDashboardContainer {...CustomCollapsibleArgs} /> );

    await userEvent.click( screen.getByTestId( "DC__collapseButton" ) );
    expect( screen.getByTestId( "DC__element" ) ).not.toHaveClass( "dxDashboardContainer__element--collapsed" );
} );

test( "If collapsed element expands on button icon click ", async () => {
    render( <DXDashboardContainer {...CustomCollapsibleArgs} /> );

    await userEvent.click( screen.getByTestId( "DC__collapseIcon" ) );
    expect( screen.getByTestId( "DC__element" ) ).not.toHaveClass( "dxDashboardContainer__element--collapsed" );
} );

test( "If expanded element collapses on button click ", async () => {
    render( <DXDashboardContainer {...CustomCollapsibleArgs} /> );

    await userEvent.click( screen.getByTestId( "DC__collapseButton" ) );
    await userEvent.click( screen.getByTestId( "DC__collapseButton" ) );

    expect( screen.getByTestId( "DC__element" ) ).toHaveClass( "dxDashboardContainer__element--collapsed" );
} );

test( "If expanded element collapses on button icon click ", async () => {
    render( <DXDashboardContainer {...CustomCollapsibleArgs} /> );
    let buttonIcon = screen.getByTestId( "DC__collapseIcon" );
    await userEvent.click( buttonIcon );
    await userEvent.click( buttonIcon );

    expect( screen.getByTestId( "DC__element" ) ).toHaveClass( "dxDashboardContainer__element--collapsed" );
} );

//Buttons
test( "If buttons renders correctly when configured", () => {
    render( <DXDashboardContainer {...DashboardContainerArgs} /> );
    expect( screen.getByTestId( "DC__buttons" ).children.length ).toEqual( 3 );
} );

test( "If button type renders correctly", () => {
    render( <DXDashboardContainer {...DashboardContainerArgs} /> );
    let button = screen.getByTestId( "DC__buttons" ).firstChild as HTMLButtonElement;
    expect( button ).toHaveTextContent( DashboardContainerArgs.borderlessButton?.label! );
} );

test( "If button type renders correctly", () => {
    render( <DXDashboardContainer {...DashboardContainerArgs} /> );
    let button = screen.getByTestId( "DC__buttons" ).children[1] as HTMLButtonElement;
    expect( button ).toHaveTextContent( DashboardContainerArgs.secondaryButton?.label! );
} );

test( "If button type renders correctly", () => {
    render( <DXDashboardContainer {...DashboardContainerArgs} /> );
    let button = screen.getByTestId( "DC__buttons" ).children[2] as HTMLButtonElement;
    expect( button ).toHaveTextContent( DashboardContainerArgs.primaryButton?.label! );
} );

test( "If collapse button icon changes", () => {
    render( <DXDashboardContainer {...CustomCollapsibleArgs} /> );
    expect( screen.getByTestId( "DC__collapseButton" ).querySelector( "i" ) ).toHaveClass( CustomCollapsibleArgs.icons?.collapse! );
} );

//Renders
test( "How component behaves on incorrect custom component prop", () => {
    let childElement = {
        customChild: {
            type: "incorrectName",
            props: {}
        }
    };

    const warn = jest.spyOn( console, "warn" );
    render( <DXDashboardContainer elements={[childElement]} /> );
    expect( warn ).toHaveBeenCalledWith( "Incorrect TAG for children element was not found in the library: " + childElement.customChild.type );
    warn.mockRestore();
} );
