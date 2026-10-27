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
import DXOrgChartBottomUp from "./DXOrgChartBottomUp";
import { OrgChartBottomUpArgs, OrgChartWithoutImagesArgs } from "./DXOrgChartBottomUp.stories";

describe( "OrgChartBottomUp component", () => {

    test( "Full Rendering OrgChartBottomUp", () => {
        render( <DXOrgChartBottomUp {...OrgChartBottomUpArgs} /> );

        const componentContainer = screen.getByTestId( "dxOrgChartBottomUp" );
        const cards = document.querySelectorAll( '.dxChartCard ' );

        expect( componentContainer ).toBeInTheDocument();
        expect( cards ).toHaveLength( 6 );
    } );

    test( "Full Rendering OrgChartBottomUp, users without image", async () => {
        render( <DXOrgChartBottomUp {...OrgChartWithoutImagesArgs} /> );
        const componentContainer = screen.getByTestId( "dxOrgChartBottomUp" );
        const cards = document.querySelectorAll( '.dxChartCard ' );
        const lastCard = cards[cards.length - 1];

        expect( componentContainer ).toBeInTheDocument();
        expect( lastCard ).toHaveTextContent( "Me" );
        expect( cards ).toHaveLength( 6 );
    } );

} );
