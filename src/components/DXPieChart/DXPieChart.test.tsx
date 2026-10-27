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
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DXPieChart from "./DXPieChart";
import { PieChartArgs } from "./DXPieChart.stories";

test( "If svg renders inside given container", () => {
    render( <DXPieChart {...PieChartArgs} /> );
    expect( screen.getByTestId( "dxPieChart-parent" ).querySelector( "svg" ) ).not.toBeNull();
} );

test( "If svg re-renders inside the same given container", () => {
    let props = PieChartArgs;
    props.data[0].value = 50;
    const { rerender } = render( <DXPieChart {...props} /> );
    props.data[0].value += 100;
    rerender( <DXPieChart {...PieChartArgs} /> );
    expect( screen.getByTestId( "dxPieChart-parent" ).querySelector( "svg" ) ).not.toBeNull();
    expect( screen.getByTestId( "dxPieChart-parent" ).querySelectorAll( "svg" ).length ).toBe( 1 );
} );
