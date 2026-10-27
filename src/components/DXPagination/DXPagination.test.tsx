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
import { render, screen, act, fireEvent } from "@testing-library/react";
import DXPagination, { PaginationProps } from "./DXPagination";

const baseProps: PaginationProps = {
    sets: ["2", "5", "10"],
    totalItems: 10,
    totalPages: 5,
    active: 1,
    activeSet: 2,
    onChangeActive: jest.fn(),
    onChangeSet: jest.fn(),
};

describe( "DXPagination", () => {
    test( "if the component is properly configured it should be rendered", () => {
        render( <DXPagination {...baseProps} /> );
        expect( screen.getByTestId( "pagination" ) ).toBeInTheDocument();
    } );

    test( "shows correct entry range on page 1", () => {
        // active=1, activeSet=2, totalItems=10 → "Showing 1 to 2 of 10 entries"
        render( <DXPagination {...baseProps} active={1} activeSet={2} totalItems={10} /> );
        expect( screen.getByText( "Showing 1 to 2 of 10 entries" ) ).toBeInTheDocument();
    } );

    test( "shows correct entry range on a middle page", () => {
        // active=3, activeSet=2, totalItems=10 → "Showing 5 to 6 of 10 entries"
        render( <DXPagination {...baseProps} active={3} activeSet={2} totalItems={10} /> );
        expect( screen.getByText( "Showing 5 to 6 of 10 entries" ) ).toBeInTheDocument();
    } );

    test( "shows correct entry range on the last full page", () => {
        // active=5, activeSet=2, totalItems=10 → "Showing 9 to 10 of 10 entries"
        render( <DXPagination {...baseProps} active={5} activeSet={2} totalItems={10} /> );
        expect( screen.getByText( "Showing 9 to 10 of 10 entries" ) ).toBeInTheDocument();
    } );

    test( "caps endEntry at totalItems when the last page is a partial set", () => {
        // active=2, activeSet=6, totalItems=10 → startEntry=7, endEntry=min(12,10)=10
        render( <DXPagination {...baseProps} active={2} activeSet={6} totalItems={10} totalPages={2} /> );
        expect( screen.getByText( "Showing 7 to 10 of 10 entries" ) ).toBeInTheDocument();
    } );

    test( "shows 0 to 0 when totalItems is 0", () => {
        // startEntry should be 0 when totalItems === 0
        render( <DXPagination {...baseProps} totalItems={0} totalPages={0} /> );
        expect( screen.getByText( "Showing 0 to 0 of 0 entries" ) ).toBeInTheDocument();
    } );


    describe( "DXPagination Hardening", () => {
        let strykerProps: any;

        beforeEach( () => {
            strykerProps = {
                sets: ["10", "20", "50"],
                totalItems: 100,
                totalPages: 10,
                active: 5,
                activeSet: 10,
                onChangeActive: jest.fn(),
                onChangeSet: jest.fn(),
            };
        } );

        it( "forces single-item ellipsis math boundaries to execute completely", async () => {
            const { container, rerender } = render( <DXPagination {...strykerProps} active={5} totalPages={10} /> );

            // Lower ellipsis check (options.length === 1)
            const pageLinks = Array.from( container.querySelectorAll( '.page-link' ) ) as HTMLElement[];
            const itemTwo = pageLinks.find( el => el.textContent?.trim() === "2" );
            expect( itemTwo ).toBeDefined();
            expect( itemTwo!.closest( '.dxPagination__ellipsis' ) ).toBeNull();

            await act( async () => { fireEvent.click( itemTwo! ); } );
            expect( strykerProps.onChangeActive ).toHaveBeenCalledWith( 2 );

            // Upper ellipsis check (options.length === 1)
            rerender( <DXPagination {...strykerProps} active={2} totalPages={5} /> );
            const freshLinks = Array.from( container.querySelectorAll( '.page-link' ) ) as HTMLElement[];
            const itemFour = freshLinks.find( el => el.textContent?.trim() === "4" );
            expect( itemFour ).toBeDefined();
            expect( itemFour!.closest( '.dxPagination__ellipsis' ) ).toBeNull();
        } );

        it( "opens multi-item dropdowns for wide gaps and hits precise array indices", async () => {
            const { container } = render( <DXPagination {...strykerProps} active={5} totalPages={10} /> );
            const ellipsisToggle = container.querySelector( '.dxPagination__ellipsis .dropdown-toggle' ) as HTMLElement;
            expect( ellipsisToggle ).toBeInTheDocument();

            await act( async () => { fireEvent.click( ellipsisToggle ); } );

            const dropdownItem = container.querySelector( '.dxPagination__ellipsis .dropdown-item' ) as HTMLElement;
            expect( dropdownItem ).toBeInTheDocument();

            await act( async () => { fireEvent.click( dropdownItem ); } );
            expect( strykerProps.onChangeActive ).toHaveBeenCalledTimes( 1 );
        } );

        it( "intercepts dataset dropdown interactions seamlessly", async () => {
            const { container } = render( <DXPagination {...strykerProps} /> );
            const setsToggle = container.querySelector( '.pagination-items-per-page' ) as HTMLElement;

            await act( async () => { fireEvent.click( setsToggle ); } );

            const dropdownItems = Array.from( container.querySelectorAll( '.dxPagination__sets .dropdown-item' ) ) as HTMLElement[];
            const item20 = dropdownItems.find( el => el.textContent?.trim() === "20" );
            expect( item20 ).toBeDefined();

            await act( async () => { fireEvent.click( item20! ); } );
            expect( strykerProps.onChangeSet ).toHaveBeenCalledTimes( 1 );
        } );
    } );
} );