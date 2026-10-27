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
import DXScrollableCard from "./DXScrollableCard";
import { scrollableCardsArgs, individualCardArgs } from "./DXScrollableCard.stories";
import userEvent from "@testing-library/user-event";

describe( "ScrollableCard component", () => {

    test( "Render ScrollableCard component with a Card", () => {
        render( <DXScrollableCard {...individualCardArgs} /> );
        const avatar = document.querySelector( '.dxScrollableCard__avatar' );

        expect( screen.getByTestId( "scrollable-card" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "scrollable-card__container" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "scrollable-card__info" ) ).toBeInTheDocument();
        expect( avatar ).toBeInTheDocument();
        expect( screen.getByTestId( "scrollable-card__infoTitle" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "scrollable-card-infoMetadata-phone" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "scrollable-card-infoMetadata-city" ) ).toBeInTheDocument();

    } );

    test( "ScrollableCard when click on next card, It should show second card.", async () => {
        render( <DXScrollableCard {...scrollableCardsArgs} /> );
        expect( screen.getByTestId( "scrollable-card" ) ).toBeInTheDocument();

        const nextBtn = screen.getByTestId( 'slider-next-button' );
        await userEvent.click( nextBtn );
        await new Promise( r => setTimeout( r, 700 ) );

        expect( screen.getByText( scrollableCardsArgs.items[1].title ) ).toBeInTheDocument();
    } );


    test( "ScrollableCard when go to the last item, it should'nt show the next button ", async () => {
        let props = {
            items: [{
                title: "Luck Correa",
                subtitle: "Scrum Master",
                phone: "(055)66443322",
                city: "Nuevo León",
            }, {
                title: "Angel Miranda",
                subtitle: "Design Developer",
                phone: "(055)243039859",
                city: "Saltillo",
            }]
        };
        render( <DXScrollableCard {...props} /> );

        const prevBtn = screen.getByTestId( 'slider-prev-button' );
        const nextBtn = screen.getByTestId( 'slider-next-button' );

        expect( prevBtn?.classList.contains( "dxMiniCatalog__navBtn--display-hide" ) ).not.toBeTruthy();
        expect( nextBtn?.classList.contains( "dxMiniCatalog__navBtn--direction-next" ) ).not.toBeTruthy();

        await userEvent.click( nextBtn );
        await new Promise( r => setTimeout( r, 700 ) );

        expect( prevBtn?.classList.contains( "dxMiniCatalog__navBtn--direction-prev" ) ).not.toBeTruthy();
        expect( nextBtn?.classList.contains( "dxMiniCatalog__navBtn--display-hide" ) ).not.toBeTruthy();

        await userEvent.click( prevBtn );
        await new Promise( r => setTimeout( r, 700 ) );

        expect( prevBtn?.classList.contains( "dxMiniCatalog__navBtn--display-hide" ) ).not.toBeTruthy();
        expect( nextBtn?.classList.contains( "dxMiniCatalog__navBtn--direction-next" ) ).not.toBeTruthy();

    } );

    test( "ScrollableCard when doesn't have cards It will should a message ", async () => {
        let props = {
            items: []
        };

        render( <DXScrollableCard {...props} /> );
        expect( screen.getByTestId( "scrollable-card" ) ).toBeInTheDocument();
        const msg = screen.getByText( "No items received" );
        expect( msg ).toBeInTheDocument();
    } );

} );

test( " If icon chages if parameter is set", () => {
    render( <DXScrollableCard {...scrollableCardsArgs} icons={{
        prev: "ci-Arrow_Left_MD",
        next: "ci-Arrow_Right_MD"
    }} /> );

    expect( screen.getByTestId( "slider-next-button" ).querySelector( "i" ) ).toHaveClass( "ci-Arrow_Right_MD" );
} );
