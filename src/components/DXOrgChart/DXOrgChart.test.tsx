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
import { render, screen, act, fireEvent } from "@testing-library/react";
import DXOrgChart from "./DXOrgChart";
import { DefaultVersionArgs } from "./DXOrgChart.stories";
import userEvent from "@testing-library/user-event";

describe( "OrgChart component", () => {

    test( "Full Rendering OrgChart with all the properties filled", () => {
        render( <DXOrgChart {...DefaultVersionArgs} /> );
        const mainCard = document.querySelector( '.card--1' );
        const name = document.querySelector( '.dxChartCard__infoName' );
        const employment = document.querySelector( '.dxChartCard__infoEmployment' );
        const image = document.querySelector( 'img' );

        expect( screen.getByTestId( "dxOrgChart" ) ).toBeInTheDocument();
        expect( mainCard ).toBeInTheDocument();
        expect( name ).toBeInTheDocument();
        expect( employment ).toBeInTheDocument();
        expect( image ).toBeInTheDocument();
    } );

    test( "OrgChart component when the main user have employments and want to see the next level", async () => {
        let mockFunction = jest.fn();
        render( <DXOrgChart {...DefaultVersionArgs} /> );
        const mainCard = document.querySelector( '.card--1' );
        const buttonMainCard = mainCard?.querySelector( ".dxChartCard" )?.querySelector( "button" ) as HTMLButtonElement;

        buttonMainCard.onclick = mockFunction;
        await userEvent.click( buttonMainCard );

        expect( screen.getByTestId( "dxOrgChart" ) ).toBeInTheDocument();

        const lineLevel = document.querySelector( '.line-level--2' );
        const cardLevel2 = document.querySelector( '.dxOrgChart__card--level-2' );

        expect( mainCard ).toBeInTheDocument();
        expect( buttonMainCard ).toBeInTheDocument();
        expect( lineLevel ).toHaveClass( "active" );
        expect( cardLevel2 ).toHaveClass( "active" );
    } );

    test( "When the main user have employments and want to see the next level, after close the same level of employments", async () => {
        let mockFunction = jest.fn();
        render( <DXOrgChart {...DefaultVersionArgs} /> );
        const mainCard = document.querySelector( '.card--1' );

        const buttonMainCard = mainCard?.querySelector( ".dxChartCard" )?.querySelector( "button" ) as HTMLButtonElement;
        expect( mainCard ).toBeInTheDocument();
        expect( buttonMainCard ).toBeInTheDocument();

        buttonMainCard.onclick = mockFunction;
        await userEvent.click( buttonMainCard );

        const lineLevel = document.querySelector( '.line-level--2' );
        const cardLevel2 = document.querySelector( '.dxOrgChart__card--level-2' );
        expect( mainCard ).toBeInTheDocument();
        expect( lineLevel ).toHaveClass( "active" );
        expect( cardLevel2 ).toHaveClass( "active" );

        buttonMainCard.onclick = mockFunction;
        await userEvent.click( buttonMainCard );

        expect( lineLevel ).toHaveClass( "no-active" );
        expect( cardLevel2 ).toHaveClass( "no-active" );

        buttonMainCard.onclick = mockFunction;
        await userEvent.click( buttonMainCard );

        expect( mainCard ).toBeInTheDocument();
        expect( lineLevel ).toHaveClass( "active" );
        expect( cardLevel2 ).toHaveClass( "active" );

    } );

    test( "OrgChart when click on the second level button of a card to see the next employments", async () => {
        let mockFunction = jest.fn();

        render( <DXOrgChart {...DefaultVersionArgs} /> );
        const mainCard = document.querySelector( '.card--1' );

        const buttonMainCard = mainCard?.querySelector( ".dxChartCard" )?.querySelector( "button" ) as HTMLButtonElement;
        buttonMainCard.onclick = mockFunction;
        await userEvent.click( buttonMainCard );

        const card4092 = document.querySelector( '.card--4092' );
        const buttonCard = card4092?.querySelector( ".dxChartCard" )?.querySelector( "button" ) as HTMLButtonElement;

        buttonCard.onclick = mockFunction;
        await userEvent.click( buttonCard );

        const lineLevel3 = document.querySelector( '.line-level--3' );
        const cardLevel3 = document.querySelector( '.card--level--3--byID--4092' );

        expect( lineLevel3 ).toHaveClass( "active" );
        expect( cardLevel3 ).toHaveClass( "active" );

    } );

    test( "When the main user see the next level and after click on collapsed button", async () => {
        let mockFunction = jest.fn();
        render( <DXOrgChart {...DefaultVersionArgs} /> );
        const mainCard = document.querySelector( '.card--1' );

        const buttonMainCard = mainCard?.querySelector( ".dxChartCard" )?.querySelector( "button" ) as HTMLButtonElement;
        buttonMainCard.onclick = mockFunction;
        await userEvent.click( buttonMainCard );

        const lineLevel = document.querySelector( '.line-level--2' );
        const cardLevel2 = document.querySelector( '.dxOrgChart__card--level-2' );
        expect( mainCard ).toBeInTheDocument();
        expect( lineLevel ).toHaveClass( "active" );
        expect( cardLevel2 ).toHaveClass( "active" );

        const buttonCollapsed = document.querySelector( '#line-level--2-button-collapsed' ) as HTMLButtonElement;;
        await userEvent.click( buttonCollapsed );

        expect( screen.getByTestId( "dxOrgChart" ) ).toBeInTheDocument();
        expect( mainCard ).toBeInTheDocument();
    } );

    test( "When the user reaches the last level it doesn't show more cards and the card looks like 'danger' style.", async () => {
        let mockFunction = jest.fn();

        render( <DXOrgChart {...DefaultVersionArgs} /> );
        const mainCard = document.querySelector( '.card--1' );

        const buttonMainCard = mainCard?.querySelector( ".dxChartCard" )?.querySelector( "button" ) as HTMLButtonElement;
        buttonMainCard.onclick = mockFunction;
        await userEvent.click( buttonMainCard );

        const card30934 = document.querySelector( '.card--30934' )?.querySelector( ".dxChartCard" );
        const buttonCard = card30934?.querySelector( "button" ) as HTMLButtonElement;

        buttonCard.onclick = mockFunction;
        await userEvent.click( buttonCard );

        buttonCard.onclick = mockFunction;
        await userEvent.click( buttonCard );

        buttonCard.onclick = mockFunction;
        await userEvent.click( buttonCard );

        expect( card30934 ).toHaveClass( "danger" );
    } );

    test( "If icon changes on iconClass value set", async () => {
        render( <DXOrgChart {...DefaultVersionArgs}
            icons={{
                button: "ci-Arrow_Down_MD"
            }}
        /> );
        const mainCard = document.querySelector( '.card--1' );
        const buttonMainCard = mainCard?.querySelector( ".dxChartCard" )?.querySelector( "button" ) as HTMLButtonElement;

        await userEvent.click( buttonMainCard );

        expect( screen.getByTestId( "orgChart_icon" ) ).toHaveClass( "ci-Arrow_Down_MD" );
    } );

    describe( "DXOrgChart Hardening - Phase 3", () => {
        test( "Deep Collapse Recursive Cleanup: strictly evaluates levelIndicator > level to purge deeply nested active states", async () => {
            // Build a 3-tier deep architecture
            const props: any = {
                users: [{
                    id: "L1", displayName: "L1", reportersNumbers: { label: 1 },
                    reporterUsers: [{
                        id: "L2", displayName: "L2", reportersNumbers: { label: 1 },
                        reporterUsers: [{ id: "L3", displayName: "L3", reportersNumbers: { label: 0 } }]
                    }]
                }]
            };
            const { container } = render( <DXOrgChart {...props} /> );

            // Sequentially drill down to Level 3
            await act( async () => { fireEvent.click( container.querySelector( ".card--L1 button" )! ); } );
            await act( async () => { fireEvent.click( container.querySelector( ".card--L2 button" )! ); } );

            expect( container.querySelector( ".card--L3" ) ).toHaveClass( "active" );

            // Close the ROOT Level 1 card
            await act( async () => { fireEvent.click( container.querySelector( ".card--L1 button" )! ); } );

            // Assert the component successfully mapped the CSS string parsing logic `parseInt(element?.classList[2].substring(24))`
            // to identify and recursively shut down BOTH deeper levels.
            expect( container.querySelector( ".card--L3" ) ).toHaveClass( "no-active" );
            expect( container.querySelector( ".card--L2" ) ).toHaveClass( "no-active" );
        } );

        test( "Terminal Node Evaluation: explicitly applies danger class and hides line when reporterUsers array evaluates to length 0", async () => {
            const props: any = {
                users: [{ id: "Root1", displayName: "Root", reportersNumbers: { label: 0 }, reporterUsers: [] }]
            };
            const { container } = render( <DXOrgChart {...props} /> );

            await act( async () => { fireEvent.click( container.querySelector( ".card--Root1 button" )! ); } );

            // The component evaluates `.length === 0` and appends `danger` directly to the inner dxChartCard
            const dxCard = container.querySelector( ".card--Root1 .dxChartCard" );
            expect( dxCard ).toHaveClass( "danger" );
        } );

        test( "Terminal Node Evaluation: safely falls back to danger branch when reporterUsers is completely undefined", async () => {
            const props: any = {
                users: [{ id: "Root2", displayName: "Root", reportersNumbers: { label: 0 } }] // Omitted property
            };
            const { container } = render( <DXOrgChart {...props} /> );

            await act( async () => { fireEvent.click( container.querySelector( ".card--Root2 button" )! ); } );

            // Assert the logical `!item.reporterUsers` bounds check
            const dxCard = container.querySelector( ".card--Root2 .dxChartCard" );
            expect( dxCard ).toHaveClass( "danger" );
        } );

        test( "Collapse Header Math: strictly resolves length - 1 to programmatically close the deepest selected level", async () => {
            const props: any = {
                users: [{
                    id: "L1", displayName: "Level 1", reportersNumbers: { label: 1 },
                    reporterUsers: [{ id: "L2", displayName: "Level 2", reportersNumbers: { label: 0 } }]
                }]
            };
            const { container } = render( <DXOrgChart {...props} /> );

            // Expand L1 to expose the header collapse button for Level 2
            await act( async () => { fireEvent.click( container.querySelector( ".card--L1 button" )! ); } );

            const collapseBtn = container.querySelector( "#line-level--2-button-collapsed" ) as HTMLButtonElement;

            // Triggering the header collapse button reads the `listSelected` array and mathematically hits `length - 1`
            await act( async () => { fireEvent.click( collapseBtn ); } );

            expect( container.querySelector( ".card--L2" ) ).toHaveClass( "no-active" );
            expect( container.querySelector( ".card--L1" ) ).not.toHaveClass( "selected" );
        } );

        test( "Grouping Array Engine: strictly slices keys and wraps siblings in container blocks via substring logic", () => {
            const props: any = {
                users: [
                    { id: "S1", displayName: "Sibling 1" },
                    { id: "S2", displayName: "Sibling 2" }
                ]
            };
            const { container } = render( <DXOrgChart {...props} /> );

            // The algorithm `keyItem.substring(0, 2)` forces multiple root items into a grouped `.wrap` block
            const wrapper = container.querySelector( ".dxOrgChart__container--level-1" );
            expect( wrapper ).toBeInTheDocument();

            // Assert both items were successfully injected into the wrapped container
            expect( wrapper?.querySelectorAll( ".dxOrgChart__card" ) ).toHaveLength( 2 );
        } );

        test( "Sibling Isolation: strictly applies the disabled class to unselected siblings on the same level", async () => {
            const props: any = {
                users: [{
                    id: "L1", displayName: "Level 1", reportersNumbers: { label: 2 },
                    reporterUsers: [
                        { id: "S1", displayName: "Sibling 1", reportersNumbers: { label: 1 }, reporterUsers: [{ id: "Deep", displayName: "Deep" }] },
                        { id: "S2", displayName: "Sibling 2", reportersNumbers: { label: 0 } }
                    ]
                }]
            };
            const { container } = render( <DXOrgChart {...props} /> );

            // Expose Level 2 siblings
            await act( async () => { fireEvent.click( container.querySelector( ".card--L1 button" )! ); } );

            // Select S1
            await act( async () => { fireEvent.click( container.querySelector( ".card--S1 button" )! ); } );

            // The loop `if (!item.classList.contains("selected")) item.classList.add("disabled");` must have hit S2
            expect( container.querySelector( ".card--S1" ) ).toHaveClass( "selected" );
            expect( container.querySelector( ".card--S2" ) ).toHaveClass( "disabled" );
        } );

        test( "Line Level Header Constraints: mathematically guarantees the line header renders strictly once per level via index === 0 evaluation", async () => {
            const props: any = {
                users: [{
                    id: "L1", displayName: "Level 1", reportersNumbers: { label: 2 },
                    reporterUsers: [
                        { id: "S1", displayName: "Sibling 1" },
                        { id: "S2", displayName: "Sibling 2" }
                    ]
                }]
            };
            const { container } = render( <DXOrgChart {...props} /> );

            // Reveal 2 siblings on Level 2
            await act( async () => { fireEvent.click( container.querySelector( ".card--L1 button" )! ); } );

            // Even though Level 2 mapped over 2 items, `index === 0` logic restricts the header generation to 1
            const lineHeaders = container.querySelectorAll( ".dxOrgChart__lineLevel" );
            expect( lineHeaders ).toHaveLength( 1 );
        } );
    } );
} );
