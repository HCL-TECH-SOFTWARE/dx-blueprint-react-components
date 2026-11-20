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
import { itSupportsExtensionProps } from "../../testUtils/extensionContract";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import DXDashboardCard from "./DXDashboardCard";
import { cardsArgs, cardSmallArgs } from "./DXDashboardCard.stories";
import userEvent from "@testing-library/user-event";

describe( "DashboardCard component", () => {

    test( "Render DashboardCard component with all properties", () => {
        render( <DXDashboardCard {...cardsArgs} /> );
        expect( screen.getByTestId( "dx-dashboard-card" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "dx-dashboard-card-number" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "dx-dashboard-card-number" ) ).toHaveTextContent( cardsArgs.data );
        expect( screen.getByTestId( "dx-dashboard-card-label" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "dx-dashboard-card-label" ) ).toHaveTextContent( cardsArgs.label );
        expect( screen.getByTestId( "dx-dashboard-card-number-icon" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "dx-dashboard-card-label-icon" ) ).toBeInTheDocument();
    } );

    test( "Render DashboardCard component small variant without icons", () => {
        render( <DXDashboardCard {...cardSmallArgs} /> );
        expect( screen.getByTestId( "dx-dashboard-card" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "dx-dashboard-card-number" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "dx-dashboard-card-number" ) ).toHaveTextContent( cardSmallArgs.data );
        expect( screen.getByTestId( "dx-dashboard-card-label" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "dx-dashboard-card-label" ) ).toHaveTextContent( cardSmallArgs.label );
    } );


    test( "DashboardCard component small variant when the card is clicked, the custom action is performed", async () => {
        let mockFunction = jest.fn();
        render( <DXDashboardCard {...cardSmallArgs} /> );

        const card = screen.getByTestId( "dx-dashboard-card" );
        card.onclick = mockFunction;
        await userEvent.click( card );

        expect( card ).toBeInTheDocument();
        expect( mockFunction ).toHaveBeenCalled();
    } );

} );

itSupportsExtensionProps( ( extra ) => <DXDashboardCard {...cardsArgs} {...extra} /> );
