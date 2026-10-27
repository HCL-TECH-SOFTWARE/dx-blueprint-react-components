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
import DXHeroBannerStacking from "./DXHeroBannerStacking";
import { HeroBannerStackingArgs } from "./DXHeroBannerStacking.stories";

test( "If component renders the expected amount of items", () => {
    render( <DXHeroBannerStacking {...HeroBannerStackingArgs} /> );
    expect( screen.getByTestId( "HBStacking--list" ).children.length ).toEqual( HeroBannerStackingArgs.items.length );
} );

test( "If the card has the expected style index value", () => {
    render( <DXHeroBannerStacking {...HeroBannerStackingArgs} /> );
    expect( screen.getByTestId( "HBStacking--list" ).firstChild ).toHaveStyle( "--index: 1" );
} );
