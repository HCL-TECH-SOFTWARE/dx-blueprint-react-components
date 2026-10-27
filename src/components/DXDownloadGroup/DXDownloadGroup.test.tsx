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
import DXDownloadGroup from "./DXDownloadGroup";

test( "If the download array is empty, a message 'No files received' will show", () => {
    let props = {
        title: "Click to download",
        downloads: []
    };
    const { getByText } = render( <DXDownloadGroup {...props} /> );
    const msg = getByText( "No files received" );
    expect( msg ).toBeInTheDocument();
} );

test( "If the download array has items in it, the element '.dxDownloadGroup__container' will show up", () => {
    let props = {
        title: "Click to download",
        downloads: [
            { url: "https://www.hcl-software.com/wps/wcm/connect/2373e5c7-3b3d-4ff4-8957-b72d8ecb8bbf/us-state-government.pdf?MOD=AJPERES&CONVERT_TO=url" }
        ]
    };
    const { container } = render( <DXDownloadGroup {...props} /> );
    const el = container.querySelector( ".dxDownloadGroup__container" );
    expect( el ).toBeInTheDocument();
} );

test( "If the user does not pass the title, it will be null", () => {
    let props = {
        downloads: [
            { url: "https://www.hcl-software.com/wps/wcm/connect/2373e5c7-3b3d-4ff4-8957-b72d8ecb8bbf/us-state-government.pdf?MOD=AJPERES&CONVERT_TO=url" }
        ]
    };
    const { container } = render( <DXDownloadGroup {...props} /> );
    const title = container.querySelector( ".dxDownloadGroup__title" );
    expect( title ).toBeNull();
} );

test( "If the user does pass the title, it will be in the document", () => {
    let props = {
        title: "Click here!",
        downloads: [
            { url: "https://www.hcl-software.com/wps/wcm/connect/2373e5c7-3b3d-4ff4-8957-b72d8ecb8bbf/us-state-government.pdf?MOD=AJPERES&CONVERT_TO=url" }
        ]
    };
    const { container } = render( <DXDownloadGroup {...props} /> );
    const title = container.querySelector( ".dxDownloadGroup__title" );
    expect( title ).toBeInTheDocument();
} );
