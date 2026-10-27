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
import DXPortalAlerts, { PortalAlertsProps } from "./DXPortalAlerts";
import { AlertArgs } from "./DXPortalAlerts.stories";

const args: PortalAlertsProps = {
    type: "general",
    title: "My title",
    link: { url: "hcl-software.com", label: "Link", target: "_blank" }
};

test( "if the component shows the title correctly", () => {
    render( <DXPortalAlerts {...args} /> );
    expect( screen.getByTestId( 'portalAlert-title' ) ).toHaveTextContent( args.title );
} );

test( "if icon matches given type: GENERAL", () => {
    render( <DXPortalAlerts type="general" {...AlertArgs} /> );
    expect( screen.getByTestId( 'portalAlert-icon' ) ).toHaveClass( "ci-Info" );
} );

test( "if icon matches given type: WARNING", () => {
    render( <DXPortalAlerts type="warning" {...AlertArgs} /> );
    expect( screen.getByTestId( 'portalAlert-icon' ) ).toHaveClass( "ci-Triangle_Warning" );
} );

test( "if icon matches given type: ERROR", () => {
    render( <DXPortalAlerts type="error" {...AlertArgs} /> );
    expect( screen.getByTestId( 'portalAlert-icon' ) ).toHaveClass( "ci-Close_SM" );
} );

test( "if icon matches given type: SUCCESS", () => {
    render( <DXPortalAlerts type="success" {...AlertArgs} /> );
    expect( screen.getByTestId( 'portalAlert-icon' ) ).toHaveClass( "ci-Circle_Check" );
} );

test( "if the link url matches the given value", () => {
    render( <DXPortalAlerts type="general" {...AlertArgs} /> );
    expect( screen.getByTestId( 'portalAlert-link' ) ).toHaveProperty( "href", AlertArgs.link.url );
} );

test( "if the link label matches the given value", () => {
    render( <DXPortalAlerts type="general" {...AlertArgs} /> );
    expect( screen.getByTestId( 'portalAlert-link' ) ).toHaveTextContent( AlertArgs.link.label );
} );

test( "if the link target matches the given value", () => {
    render( <DXPortalAlerts {...args} /> );
    expect( screen.getByTestId( 'portalAlert-link' ) ).toHaveProperty( "target", args.link.target );
} );

test( "if thelink renders if the user dont input the hidelink prop", () => {
    const { container } = render( <DXPortalAlerts {...args} /> );
    expect( container.querySelector( "a" ) ).not.toBeNull();
} );

test( "if the link does not render if the user selects to hide it", () => {
    const { container } = render( <DXPortalAlerts hideLink={true} {...args} /> );
    expect( container.querySelector( "a" ) ).toBeNull();
} );

test( "if no type is added the icon matches default type: GENERAL", () => {
    let props: PortalAlertsProps = JSON.parse( JSON.stringify( args ) );
    //@ts-ignore: Ignoring removal of required prop since it is needed for test
    delete props.type;

    const { container } = render( <DXPortalAlerts {...props} /> );
    expect( screen.getByTestId( 'portalAlert-icon' ) ).toHaveClass( "ci-Info" );
    expect( container.firstChild ).toHaveClass( "dxPortalAlerts--general" );
} );

test( "if icon changes", () => {
    const props = { hideLink: true, ...AlertArgs, iconClass: "ci-User_Circle" };
    const { container } = render( <DXPortalAlerts type="general" {...props} /> );
    expect( screen.getByTestId( 'portalAlert-icon' ) ).toHaveClass( "ci-User_Circle" );
} );
