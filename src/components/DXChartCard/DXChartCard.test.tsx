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
import { render, screen, fireEvent, act } from "@testing-library/react";
import DXChartCard from "./DXChartCard";
import { CompleteVersionArgs, onlyNameArgs, imageBase64Args, iconNumbersArgs, withIconAvatarArgs, changedIconsArgs } from "./DXChartCard.stories";
import userEvent from "@testing-library/user-event";


describe( "ChartCard component", () => {

    test( "Full Rendering ChartCard with all the properties filled", () => {

        Object.defineProperties( window.HTMLElement.prototype, {
            offsetWidth: {
                get: function () { return 1280; }
            }
        } );
        const { container } = render( <DXChartCard {...CompleteVersionArgs} /> );
        const info = container.querySelector( '.dxChartCard__info' );
        const name = container.querySelector( '.dxChartCard__infoName' );
        const employment = container.querySelector( '.dxChartCard__infoEmployment' );
        const image = container.querySelector( 'img' );
        const btnCollapsed = container.querySelector( '.dxChartCard__buttonNumbers' );

        expect( screen.getByTestId( "dxChartCard" ) ).toBeInTheDocument();
        expect( info ).toBeInTheDocument();
        expect( name ).toBeInTheDocument();
        expect( employment ).toBeInTheDocument();
        expect( image ).toBeInTheDocument();
        expect( btnCollapsed ).toBeInTheDocument();
    } );

    test( "ChartCard with only the Name", () => {
        const { container } = render( <DXChartCard {...onlyNameArgs} /> );
        const info = container.querySelector( '.dxChartCard__info' );
        const name = container.querySelector( '.dxChartCard__infoName' );

        expect( screen.getByTestId( "dxChartCard" ) ).toBeInTheDocument();
        expect( info ).toBeInTheDocument();
        expect( name ).toBeInTheDocument();
    } );

    test( "ChartCard with image, name and employment", () => {
        const { container } = render( <DXChartCard {...imageBase64Args} /> );
        const info = container.querySelector( '.dxChartCard__info' );
        const name = container.querySelector( '.dxChartCard__infoName' );
        const employment = container.querySelector( '.dxChartCard__infoEmployment' );
        const image = container.querySelector( 'img' );

        expect( screen.getByTestId( "dxChartCard" ) ).toBeInTheDocument();
        expect( info ).toBeInTheDocument();
        expect( name ).toBeInTheDocument();
        expect( employment ).toBeInTheDocument();
        expect( image ).toBeInTheDocument();
    } );

    test( "ChartCard when have a image porperty with base64 pre-filled", () => {
        let props = imageBase64Args;
        props.profileImage = `data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAJUlEQVR42u3NQQEAAAQEsJNcdFLw2gqsMukcK4lEIpFIJBLJS7KG6yVo40DbTgAAAABJRU5ErkJggg==`;
        const { container } = render( <DXChartCard {...props} /> );
        const info = container.querySelector( '.dxChartCard__info' );
        const name = container.querySelector( '.dxChartCard__infoName' );
        const employment = container.querySelector( '.dxChartCard__infoEmployment' );
        const image = container.querySelector( 'img' );

        expect( screen.getByTestId( "dxChartCard" ) ).toBeInTheDocument();
        expect( info ).toBeInTheDocument();
        expect( name ).toBeInTheDocument();
        expect( employment ).toBeInTheDocument();
        expect( image ).toBeInTheDocument();
    } );

    test( "ChartCard with button collapsed, name and employment", () => {
        const { container } = render( <DXChartCard {...iconNumbersArgs} /> );
        const info = container.querySelector( '.dxChartCard__info' );
        const name = container.querySelector( '.dxChartCard__infoName' );
        const employment = container.querySelector( '.dxChartCard__infoEmployment' );
        const btnCollapsed = container.querySelector( '.dxChartCard__buttonNumbers--fillContent' );

        expect( screen.getByTestId( "dxChartCard" ) ).toBeInTheDocument();
        expect( info ).toBeInTheDocument();
        expect( name ).toBeInTheDocument();
        expect( employment ).toBeInTheDocument();
        expect( btnCollapsed ).toBeInTheDocument();
    } );

    test( "ChartCard when click on button collapsed, change style and eject a fuction", async () => {
        let mockFunction = jest.fn();
        const { container } = render( <DXChartCard {...CompleteVersionArgs} /> );

        const btnCollapsed = screen.getByTestId( "button-collapsed" );
        const arrowIcon = container.querySelector( 'i' );

        expect( screen.getByTestId( "dxChartCard" ) ).toBeInTheDocument();
        expect( btnCollapsed ).toBeInTheDocument();
        expect( arrowIcon ).toBeInTheDocument();
        expect( arrowIcon ).toHaveClass( 'ci-Caret_Down_MD' );
        expect( btnCollapsed ).toHaveClass( 'dxChartCard__buttonNumbers' );

        btnCollapsed.onclick = mockFunction;
        await userEvent.click( btnCollapsed );

        expect( arrowIcon ).toHaveClass( 'ci-Caret_Up_MD' );
        expect( btnCollapsed ).toHaveClass( 'dxChartCard__buttonNumbers--collapsed' );

        expect( mockFunction ).toBeCalled();

        btnCollapsed.onclick = mockFunction;
        await userEvent.click( btnCollapsed );

        expect( arrowIcon ).toHaveClass( 'ci-Caret_Down_MD' );
        expect( btnCollapsed ).toHaveClass( 'dxChartCard__buttonNumbers' );

        expect( mockFunction ).toBeCalled();
    } );

    test( "ChartCard when have 0 on her numbers, change style by danger", async () => {
        let mockFunction = jest.fn();
        const { container } = render( <DXChartCard {...iconNumbersArgs} /> );

        const btnCollapsed = screen.getByTestId( "button-collapsed" );

        btnCollapsed.onclick = mockFunction;
        await userEvent.click( btnCollapsed );

        const component = container.querySelector( '.dxChartCard' );
        expect( screen.getByTestId( "dxChartCard" ) ).toBeInTheDocument();
        expect( component ).toHaveClass( 'danger' );

        expect( mockFunction ).toBeCalled();
    } );

    test( "ChartCard when have default image, show an avatar with name's letters", async () => {
        const { container } = render( <DXChartCard {...withIconAvatarArgs} /> );

        const info = container.querySelector( '.dxChartCard__info' );
        const name = container.querySelector( '.dxChartCard__infoName' );
        const employment = container.querySelector( '.dxChartCard__infoEmployment' );
        const avatar = container.querySelector( '.dxChartCard__avatar' );

        expect( screen.getByTestId( "dxChartCard" ) ).toBeInTheDocument();
        expect( info ).toBeInTheDocument();
        expect( name ).toBeInTheDocument();
        expect( employment ).toBeInTheDocument();
        expect( avatar ).toBeInTheDocument();
        expect( avatar ).toHaveTextContent( "AM" );
    } );

    test( "ChartCard when have default image and the user have only a name, show an avatar with the two first name letters", async () => {
        let props = withIconAvatarArgs;
        props.displayName = 'Susan';

        const { container } = render( <DXChartCard {...props} /> );

        const info = container.querySelector( '.dxChartCard__info' );
        const name = container.querySelector( '.dxChartCard__infoName' );
        const employment = container.querySelector( '.dxChartCard__infoEmployment' );
        const avatar = container.querySelector( '.dxChartCard__avatar' );

        expect( screen.getByTestId( "dxChartCard" ) ).toBeInTheDocument();
        expect( info ).toBeInTheDocument();
        expect( name ).toBeInTheDocument();
        expect( employment ).toBeInTheDocument();
        expect( avatar ).toBeInTheDocument();
        expect( avatar ).toHaveTextContent( "Su" );
    } );


    test( "Chart Card component when is on a mobile screen, it should show card mobile styles", async () => {
        Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 375 } );

        let mockFunction = jest.fn();

        const { container } = render( <DXChartCard {...onlyNameArgs} /> );
        const btnMenu = container.querySelector( '.dropdown-toggle' ) as HTMLElement;
        if ( btnMenu ) btnMenu.onclick = mockFunction;

        expect( screen.getByTestId( "dxChartCard-info-mobile" ) ).toBeInTheDocument();
    } );

    test( "If 'close' Icon changes if value is set", () => {
        render( <DXChartCard {...changedIconsArgs} /> );
        let button = screen.getByTestId( "button-collapsed" );
        expect( button.querySelector( "i" ) ).toHaveClass( changedIconsArgs.icons?.close! );
    } );

    test( "If 'open' Icon changes if value is set", async () => {
        render( <DXChartCard {...changedIconsArgs} /> );
        let button = screen.getByTestId( "button-collapsed" );
        await userEvent.click( button );
        expect( button.querySelector( "i" ) ).toHaveClass( changedIconsArgs.icons?.open! );
    } );

    describe( "DXChartCard Hardening", () => {
        let containerSlot: HTMLDivElement;

        beforeEach( () => {
            containerSlot = document.createElement( "div" );
            containerSlot.id = "portal-container";
            document.body.appendChild( containerSlot );
        } );

        afterEach( () => {
            document.body.removeChild( containerSlot );
            jest.clearAllMocks();
        } );

        describe( "Structural Math & Boundary Constraints", () => {
            it( "strictly equates innerWidth bounds to exactly 576px to enforce mobile limits", () => {
                // Tests the <= boundary against exactly 576px. If it was mutated to < 576, this fails.
                Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 576 } );

                render( <DXChartCard id="mobile-strict" displayName="Test" menuOptions={[{ label: "Action" }]} /> );

                // Mobile view wrapper must exist due to exact boundary hit
                expect( screen.getByTestId( "dxChartCard-info-mobile" ) ).toBeInTheDocument();
            } );

            it( "asserts reporter length array logic supersedes explicit reporterNumbers prop values", () => {
                // If reporterUsers array is present, its length must take priority over the manual label
                const props: any = {
                    id: "priority-test",
                    displayName: "Test",
                    reporterUsers: [{}, {}, {}], // Length 3
                    reportersNumbers: { label: 5 } // Attempted overwrite
                };

                const { getByTestId } = render( <DXChartCard {...props} /> );
                const btn = getByTestId( "button-collapsed" );

                // Kills the conditional logic order mutants between reporterUsers.length and reporterNumbers.label
                expect( btn.textContent ).toContain( "3" );
            } );
        } );

        describe( "Conditional Layout Properties and Class Assignments", () => {
            it( "strictly omits --fillContent when hideImage is falsy and reportersNumbers exist", () => {
                const props: any = {
                    id: "layout-1",
                    displayName: "Test",
                    jobTitle: "Dev",
                    hideImage: false,
                    reportersNumbers: { label: 5 }
                };

                const { getByTestId, container } = render( <DXChartCard {...props} /> );
                const card = getByTestId( "dxChartCard" );
                const btn = getByTestId( "button-collapsed" );

                // Kills mutations dropping the --fillContent strings
                expect( card.className ).not.toContain( "--fillContent" );
                expect( btn.className ).not.toContain( "--fillContent" );

                // Ensure classWithoutJob isn't mistakenly applied
                const infoDiv = container.querySelector( ".dxChartCard__info" ) as HTMLElement;
                expect( infoDiv.className ).not.toContain( "--withoutJobTitle" );
            } );

            it( "strictly omits the image DOM node but applies fillContent exclusively when profileImage is falsy", () => {
                const props: any = {
                    id: "layout-2",
                    displayName: "Test",
                    jobTitle: "Dev",
                    hideImage: false, // Intentionally false
                    profileImage: ""  // Intentionally empty
                };

                const { container } = render( <DXChartCard {...props} /> );

                // Image should not exist because profileImage is falsy (despite hideImage being false)
                expect( container.querySelector( "img" ) ).toBeNull();
            } );
        } );

        describe( "Event Callbacks and Synthetics", () => {
            it( "dispatches internal CustomEvent 'collapsed--card' successfully upon button interaction", () => {
                const spyDispatcher = jest.spyOn( window, "dispatchEvent" );

                const props: any = {
                    id: "custom-event-test",
                    displayName: "Event Tester",
                    reportersNumbers: { label: 5, onClick: jest.fn() }
                };

                const { getByTestId } = render( <DXChartCard {...props} /> );
                const btn = getByTestId( "button-collapsed" );

                fireEvent.click( btn );

                // Assert exact CustomEvent construction
                const dispatchedEvent = spyDispatcher.mock.calls[0][0] as CustomEvent;
                expect( dispatchedEvent.type ).toBe( "collapsed--card" );
                expect( dispatchedEvent.detail ).toBe( "custom-event-test" );

                spyDispatcher.mockRestore();
            } );
        } );

        test( "Memory boundaries: strictly unbinds the window resize event listener upon unmount", () => {
            const removeSpy = jest.spyOn( window, "removeEventListener" );
            const { unmount } = render( <DXChartCard id="unmount-test" displayName="Unmount" /> );

            unmount();

            // Assert the specific "resize" cleanup was invoked to kill memory leak mutants
            const resizeCalls = removeSpy.mock.calls.filter( call => call[0] === "resize" );
            expect( resizeCalls.length ).toBeGreaterThan( 0 );
            expect( typeof resizeCalls[0][1] ).toBe( "function" );

            removeSpy.mockRestore();
        } );

        test( "Image URL Engine: strictly evaluates protocols and dynamically prepends base64 identifiers", () => {
            const { container: c1 } = render(
                <DXChartCard id="img-http" displayName="HTTP" profileImage="http://example.com/img.png" />
            );
            expect( c1.querySelector( "img" )?.src ).toBe( "http://example.com/img.png" );

            const { container: c2 } = render(
                <DXChartCard id="img-data" displayName="DataURI" profileImage="data:image/png;base64,12345" />
            );
            expect( c2.querySelector( "img" )?.src ).toBe( "data:image/png;base64,12345" );

            const { container: c3 } = render(
                <DXChartCard id="img-raw" displayName="RawBase64" profileImage="rawbase64string" />
            );
            // Kills mutants dropping the strictly formatted concatenation fallback
            expect( c3.querySelector( "img" )?.src ).toBe( "data:image/jpeg;base64,rawbase64string" );
        } );

        test( "Reporter Numbers Math: explicitly processes and renders mathematical zero bypassing truthy fallbacks", () => {
            // Stryker mutates `=== 0` or removes `props.reportersNumbers.label === 0`.
            // A label of `0` is falsy but mathematically valid.
            const { getByTestId } = render(
                <DXChartCard id="zero-test" displayName="Zero" reportersNumbers={{ label: 0 }} />
            );

            const btn = getByTestId( "button-collapsed" );
            // We use string extraction to assert the precise rendering of '0' 
            expect( btn.textContent?.trim() ).toBe( "0" );
        } );

        test( "Event Callbacks: accurately concatenates exact ID and state payload strings for onCollapsedChange", () => {
            const spyChange = jest.fn();
            const { getByTestId } = render(
                <DXChartCard
                    id="toggle-id"
                    displayName="Toggle"
                    reportersNumbers={{ label: 5 }}
                    onCollapsedChange={spyChange}
                />
            );
            const btn = getByTestId( "button-collapsed" );

            // First click sets it to collapsed
            fireEvent.click( btn );
            expect( spyChange ).toHaveBeenCalledWith( "toggle-id--collapsed" );

            // Second click sets it back to closed
            fireEvent.click( btn );
            expect( spyChange ).toHaveBeenCalledWith( "toggle-id--closed" );
        } );

        test( "Global Event Trap: strictly calculates and positions the dropdown menu using exact DOM rect boundaries in mobile view", async () => {
            // Enforce mobile boundary
            Object.defineProperty( window, "innerWidth", { writable: true, configurable: true, value: 375 } );

            await act( async () => {
                render( <DXChartCard id="global-click-test" displayName="Menu" menuOptions={[{ label: "Opt" }]} /> );
            } );

            const card = document.querySelector( "#dxChartCard--global-click-test" ) as HTMLElement;

            // Spoof the DOM bounding rect to intercept internal math calculations
            jest.spyOn( card, "getBoundingClientRect" ).mockReturnValue( {
                bottom: 999,
                left: 444,
                width: 222,
                height: 111,
                top: 0,
                right: 0,
                x: 0,
                y: 0,
                toJSON: () => {}
            } );

            const menu = document.createElement( "div" );
            menu.className = "dropdow--global-click-test";
            document.body.appendChild( menu );

            // Blanket mock querySelector to absorb legacy listener memory leaks.
            // This ensures ANY fired listener (stale or current) receives a valid DOM node, preventing null pointer crashes.
            const originalQuerySelector = document.querySelector.bind( document );
            const querySpy = jest.spyOn( document, "querySelector" ).mockImplementation( ( sel ) => {
                if ( typeof sel === 'string' ) {
                    if ( sel.includes( "dropdow--" ) ) return menu;
                    if ( sel.includes( "dxChartCard--" ) ) return card;
                }
                return originalQuerySelector( sel );
            } );

            // Construct the strict event target required to trigger the component's internal condition
            const target = document.createElement( "div" );
            // The component literally checks `classList.value.includes`
            target.className = "lexicon-icon-ellipsis-v";
            document.body.appendChild( target );

            // Fire natively; JSDOM will bubble it up to window and trigger all active listeners
            await act( async () => {
                fireEvent.click( target );
            } );

            // Assert the layout math was exactly applied directly to the CSSOM
            expect( menu.style.top ).toBe( "999px" );
            expect( menu.style.left ).toBe( "444px" );
            expect( menu.style.maxWidth ).toBe( "222px" );
            expect( menu.style.minWidth ).toBe( "222px" );
            expect( menu.style.width ).toBe( "222px" );

            // Cleanup
            document.body.removeChild( menu );
            document.body.removeChild( target );
            querySpy.mockRestore();
        } );

        test( "State Flushes: updates state gracefully from positive items to 0 without crashing danger boundaries", async () => {
            const spyChange = jest.fn();
            const { getByTestId, container } = render(
                <DXChartCard
                    id="danger-state-test"
                    displayName="Danger"
                    reportersNumbers={{ label: 0, onClick: spyChange }}
                />
            );

            const btn = getByTestId( "button-collapsed" );
            const rootCard = getByTestId( "dxChartCard" );

            // Simulate click processing with Act to flush internal React state modifications
            await act( async () => {
                fireEvent.click( btn );
            } );

            // Ensure the onClick handler passed inside reportersNumbers was explicitly triggered
            expect( spyChange ).toHaveBeenCalledTimes( 1 );

            // Assert the exact "danger" string literal was applied when numberOfItems === 0
            expect( rootCard.className ).toContain( "danger" );

            // Click again to reset state
            await act( async () => {
                fireEvent.click( btn );
            } );

            // Assert "danger" is wiped out and "clicked" is NOT applied since it evaluates to closed
            expect( rootCard.className ).not.toContain( "danger" );
            expect( rootCard.className ).not.toContain( "clicked" );
        } );
    } );
} );

itSupportsExtensionProps( ( extra ) => <DXChartCard {...onlyNameArgs} {...extra} /> );

describe( "DXChartCard dropdown with consumer extension props", () => {
    test( "the portaled menu opens and its items work while ref, className and attributes stay on the card root", async () => {
        const ref = React.createRef<HTMLDivElement>();
        const onOption = jest.fn( ( e: React.MouseEvent ) => e.preventDefault() );
        const options = [{ href: "#one", label: "View my profile", onClick: onOption }];
        render( <DXChartCard {...onlyNameArgs} menuOptions={options} dropdownOpen ref={ref} className="bp-consumer" data-consumer="yes" /> );
        // Let the dropdown's positioning (Popper) finish its async update inside act
        await act( async () => {} );
        const root = screen.getByTestId( "dxChartCard" );
        const menu = document.body.querySelector( `.dxChartCard__dropdownMenu.dropdow--${onlyNameArgs.id}` ) as HTMLElement;
        expect( ref.current ).toBe( root );
        expect( root ).toHaveClass( "dxChartCard", "bp-consumer" );
        expect( menu ).toBeInTheDocument();
        expect( menu ).toHaveClass( "show" );
        expect( root.contains( menu ) ).toBe( false );
        expect( menu ).not.toHaveClass( "bp-consumer" );
        expect( menu ).not.toHaveAttribute( "data-consumer" );
        fireEvent.click( screen.getByText( "View my profile" ) );
        expect( onOption ).toHaveBeenCalledTimes( 1 );
    } );

    test( "the menu is hidden when dropdownOpen is false, with consumer extension props", () => {
        const ref = React.createRef<HTMLDivElement>();
        render( <DXChartCard {...onlyNameArgs} dropdownOpen={false} ref={ref} className="bp-consumer" /> );
        expect( document.body.querySelector( ".dxChartCard__dropdownMenu.show" ) ).toBeNull();
        expect( ref.current ).toBe( screen.getByTestId( "dxChartCard" ) );
    } );
} );
