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
import { render } from "@testing-library/react";
import DXMap from "./DXMap";

test( "If no url is passed to the props a message 'No Map URL received' will render", () => {
    let props = {};
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXMap {...props} /> );
    expect( getByText( "No Map URL received" ) ).toBeInTheDocument();
} );

test( "If an url is passed to the props it will render an iframe", () => {
    let props = {
        iframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx"
    };
    const { container } = render( <DXMap {...props} /> );
    const iframe = container.querySelector( ".dxMap" )?.childNodes[0];
    expect( iframe ).toBeInTheDocument();
} );

test( "If an url is passed to the props it will render an iframe with a src attribute with that value", () => {
    let props = {
        iframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx"
    };
    const { container } = render( <DXMap {...props} /> );
    const iframe = container.querySelector( ".dxMap" )?.childNodes[0] as HTMLElement;
    const src = iframe.getAttribute( "src" );
    expect( src ).toEqual( props.iframeUrl );
} );

