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
import DXPortalLogos from "./DXPortalLogos";
import { portalLogosDefaultArgs, portalLogosWhithoutSecondaryArgs } from "./DXPortalLogos.stories";

describe( "DirectoryCard component", () => {

    test( "Render Portal Logos component with default properties", () => {
        render( <DXPortalLogos {...portalLogosDefaultArgs} /> );

        expect( screen.getByTestId( "dx-portal-logos" ) ).toBeInTheDocument();
        expect( document.querySelector( ".dxPortalLogos__main" ) ).toBeInTheDocument();
        expect( document.querySelector( 'span' ) ).toBeInTheDocument();
        expect( document.querySelector( ".dxPortalLogos__secondary" ) ).toBeInTheDocument();
    } );

    test( "Render Portal Logos component whitout secondary", () => {
        render( <DXPortalLogos {...portalLogosWhithoutSecondaryArgs} /> );

        expect( screen.getByTestId( "dx-portal-logos" ) ).toBeInTheDocument();
        expect( document.querySelector( ".dxPortalLogos__main" ) ).toBeInTheDocument();
        expect( document.querySelector( 'span' ) ).toBeNull();
        expect( document.querySelector( ".dxPortalLogos__secondary" ) ).not.toBeInTheDocument();
    } );
} );
