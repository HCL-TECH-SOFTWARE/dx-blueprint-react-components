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
import { fireEvent, render, screen, act } from "@testing-library/react";
import DXDirectoryCard, { DirectoryCardProps } from "./DXDirectoryCard";
import { directoryCardWithLabelArgs, directoryArgs, directoryCardIconButtonsArgs, directoryCardTwoTextsArgs, directoryCardChangedIconsArgs } from "./DXDirectoryCard.stories";
import userEvent from "@testing-library/user-event";

describe( "DirectoryCard component", () => {

    test( "Render DashboardCard component with all properties and Label option able", () => {
        render( <DXDirectoryCard {...directoryCardWithLabelArgs} /> );

        const metadataInfo = document.querySelectorAll( ".dxDirectoryCard__info" ).length;

        expect( screen.getByTestId( "dx-directory-card" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "dx-directory-card-data" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "dx-directory-card-tagItem" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "dx-directory-card-buttons-container" ) ).toBeInTheDocument();
        expect( metadataInfo ).toEqual( 2 );
    } );

    test( "Render DashboardCard component with all properties and Label option able without color", () => {
        let props = directoryCardWithLabelArgs;
        props.labels = [{ label: "News" }];
        render( <DXDirectoryCard {...props} /> );

        const tag = screen.getByTestId( "dx-directory-card-tagItem" );
        const metadataInfo = document.querySelectorAll( ".dxDirectoryCard__info" ).length;

        expect( screen.getByTestId( "dx-directory-card" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "dx-directory-card-data" ) ).toBeInTheDocument();
        expect( tag ).toBeInTheDocument();
        expect( screen.getByTestId( "dx-directory-card-buttons-container" ) ).toBeInTheDocument();
        expect( tag ).not.toContain( 'style' );
        expect( metadataInfo ).toEqual( 2 );
    } );

    test( "Render DashboardCard component without image with primary and secondary buttons", () => {
        render( <DXDirectoryCard {...directoryArgs} /> );

        const avatar = document.querySelector( ".dxDirectoryCard__avatar" );
        const primaryButton = document.querySelector( ".dxButton.btn.btn-primary" );
        const secondaryButton = document.querySelector( ".dxButton.btn.btn-unstyled" );

        expect( screen.getByTestId( "dx-directory-card" ) ).toBeInTheDocument();
        expect( avatar ).toBeInTheDocument();
        expect( avatar ).toHaveTextContent( "JK" );
        expect( primaryButton ).toBeInTheDocument();
        expect( secondaryButton ).toBeInTheDocument();
    } );

    test( "Render DashboardCard component with 3 iconButtons in main section", () => {
        render( <DXDirectoryCard {...directoryCardIconButtonsArgs} /> );

        const mainSection = document.querySelector( ".dxDirectoryCard__buttonsPrimary" );
        const secondaryButton = document.querySelector( ".dxButton.btn.btn-unstyled" );
        const numberButtons = mainSection?.querySelectorAll( "button" ).length;
        const firstButtonWithIcon = mainSection?.querySelectorAll( "button" )[0].querySelectorAll( "i" ).length;

        expect( screen.getByTestId( "dx-directory-card" ) ).toBeInTheDocument();
        expect( numberButtons ).toEqual( 3 );
        expect( secondaryButton ).toBeInTheDocument();
        expect( firstButtonWithIcon ).toEqual( 1 );
    } );

    test( "If the component have more than 2 text buttons only will show 2", () => {
        render( <DXDirectoryCard {...directoryCardTwoTextsArgs} /> );
        const mainSection = document.querySelector( ".dxDirectoryCard__buttonsPrimary" );
        const secondaryButton = document.querySelector( ".dxButton.btn.btn-unstyled" );
        const numberMainButtons = mainSection?.querySelectorAll( "button" ).length;

        expect( numberMainButtons ).toEqual( 2 );
        expect( secondaryButton ).toBeInTheDocument();
    } );

    test( "If the component in on mobile device, it should shown different styles", () => {
        Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: 375 } );
        render( <DXDirectoryCard {...directoryArgs} /> );

        const buttonsConstainer = screen.getByTestId( "dx-directory-card-buttons-container" );
        const metadataInfo = document.querySelectorAll( ".dxDirectoryCard__infoValue" ).length;


        expect( screen.getByTestId( "dx-directory-card" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "dx-directory-card-data" ) ).toBeInTheDocument();
        expect( metadataInfo ).toEqual( 2 );
        expect( buttonsConstainer ).toBeInTheDocument();
        expect( buttonsConstainer ).toHaveClass( 'dxDirectoryCard__containerButtons--mobileInLine' );
    } );

    test( "Render DashboardCard component that contain a button with right icon position ", () => {
        let props = directoryCardIconButtonsArgs;

        props.secondaryButtons = [
            {
                label: "News",
                onClick: () => {},
                icon: {
                    class: "ci-File_Add",
                    position: 'right'
                }
            },
        ];
        render( <DXDirectoryCard {...props} /> );
        const mainSection = document.querySelector( ".dxDirectoryCard__buttonsPrimary" );
        const secondaryButton = document.querySelector( ".dxDirectoryCard__button.btn-unstyled" );

        expect( screen.getByTestId( "dx-directory-card" ) ).toBeInTheDocument();
        expect( mainSection ).toBeInTheDocument();
        expect( secondaryButton ).toBeInTheDocument();
        expect( secondaryButton?.querySelectorAll( "i" ).length ).toEqual( 1 );
        expect( secondaryButton?.querySelector( "i" ) ).toHaveClass( 'ci-File_Add' );
        expect( secondaryButton ).toHaveTextContent( 'News' );

    } );

    test( "Render DashboardCard component that contain only Main Section buttons", () => {
        let props = directoryCardIconButtonsArgs;
        delete props.secondaryButtons;

        render( <DXDirectoryCard {...props} /> );
        const mainSection = document.querySelector( ".dxDirectoryCard__buttonsPrimary" );
        expect( screen.getByTestId( "dx-directory-card" ) ).toBeInTheDocument();
        expect( mainSection ).toBeInTheDocument();
    } );

    test( "Render DashboardCard component that contain only Second Section with iconButtons", () => {
        let props = directoryCardIconButtonsArgs;
        delete props.primaryButtons;
        props.secondaryButtons = [
            {
                label: "News",
                onClick: () => {},
                icon: {
                    class: "ci-File_Add",
                    position: 'left'
                }
            },
            {
                label: "Help",
                onClick: () => {},
                icon: {
                    class: "ci-Help",
                    position: 'right'
                }
            },
            {
                label: "Location",
                onClick: () => {}
            },
        ];

        render( <DXDirectoryCard {...props} /> );
        const secondarySection = document.querySelector( ".dxDirectoryCard__buttonsSecondary" );
        expect( screen.getByTestId( "dx-directory-card" ) ).toBeInTheDocument();
        expect( secondarySection ).toBeInTheDocument();
    } );

    test( "Render DashboardCard component without Metadata info", () => {
        let props = {
            index: 1,
            title: "Janet Kavandi",
            subtitle: {
                label: "HR Department",
                url: "https://hcl-software.com",
            },
            primaryButtons: [
                {
                    label: "View Profile",
                    onClick: () => {}
                },
            ],
            secondaryButtons: [
                {
                    label: "View in chart",
                    onClick: () => {}
                },
            ]
        } as DirectoryCardProps;

        render( <DXDirectoryCard {...props} /> );
        const mainSection = document.querySelector( ".dxDirectoryCard__buttonsPrimary" );
        const secondarySection = document.querySelector( ".dxDirectoryCard__buttonsSecondary" );
        expect( screen.getByTestId( "dx-directory-card" ) ).toBeInTheDocument();
        expect( mainSection ).toBeInTheDocument();
        expect( secondarySection ).toBeInTheDocument();
        expect( screen.getByTestId( "dx-directory-card-data" ) ).toBeInTheDocument();
    } );

    // Tests for the loader
    test( "When the image is rendering, the element 'loader__container' should not have the class 'd-none'", () => {
        const { container } = render( <DXDirectoryCard {...directoryCardWithLabelArgs} /> );
        let loaderContainer = container.querySelector( ".loader__container" );
        expect( loaderContainer ).not.toHaveClass( "d-none" );
    } );

    test( "When the image finish its rendering, the element 'loader__container' should have the class 'd-none'", () => {
        const { container } = render( <DXDirectoryCard {...directoryCardWithLabelArgs} /> );
        let cover = container.querySelector( "#dxDirectoryCard__img" ) as HTMLElement;
        fireEvent.load( cover );
        let loaderContainer = container.querySelector( ".loader__container" );
        expect( loaderContainer ).toHaveClass( "d-none" );
    } );

    // Tests for mobile
    Object.defineProperties( window.HTMLElement.prototype, {
        innerWidth: {
            get: function () { return 767; }
        }
    } );

    test( "When mobile, the element 'dxDirectoryCard__trigger' should appear", () => {
        let { container } = render( <DXDirectoryCard {...directoryArgs} /> );
        let el = container.querySelector( ".dxDirectoryCard__trigger" );
        expect( el ).toBeInTheDocument();
    } );

    test( "When mobile, the element 'dxDirectoryCard__mobileData' should appear", () => {
        let { container } = render( <DXDirectoryCard {...directoryArgs} /> );
        let el = container.querySelector( ".dxDirectoryCard__mobileData" );
        expect( el ).toBeInTheDocument();
    } );

    test( "When mobile, the element 'dxDirectoryCard__trigger' should have an icon with the class 'ci-Chevron_Down'", () => {
        let { container } = render( <DXDirectoryCard {...directoryArgs} /> );
        let el = container.querySelector( ".dxDirectoryCard__trigger" );
        let icon = el?.childNodes[0];
        expect( icon ).toHaveClass( "ci-Chevron_Down" );
    } );

    test( "When mobile, if the user clicks on the element 'dxDirectoryCard__trigger' the icon will have the class 'ci-Chevron_Up'", async () => {
        let { container } = render( <DXDirectoryCard {...directoryArgs} /> );
        let el = container.querySelector( ".dxDirectoryCard__trigger" ) as HTMLElement;
        await userEvent.click( el );
        let icon = container.querySelector( ".dxDirectoryCard__trigger i" ) as HTMLElement;
        expect( icon ).toHaveClass( "ci-Chevron_Up" );
    } );

    test( "When mobile, if the user clicks on the element 'dxDirectoryCard__trigger' the element 'dxDirectoryCard__mobileData--visible' should be in the document", async () => {
        let { container } = render( <DXDirectoryCard {...directoryArgs} /> );
        let el = container.querySelector( ".dxDirectoryCard__trigger" ) as HTMLElement;
        await userEvent.click( el );
        let visiblEl = container.querySelector( ".dxDirectoryCard__mobileData--visible" );
        expect( visiblEl ).toBeInTheDocument();
    } );

    test( "When mobile, if open state icon changes if value is set", () => {
        let { container } = render( <DXDirectoryCard {...directoryCardChangedIconsArgs} /> );
        let el = container.querySelector( ".dxDirectoryCard__trigger" ) as HTMLElement;
        let icon = container.querySelector( ".dxDirectoryCard__trigger i" ) as HTMLElement;
        expect( icon ).toHaveClass( directoryCardChangedIconsArgs.icons?.open! );
    } );

    test( "When mobile, if close state icon changes if value is set", async () => {
        let { container } = render( <DXDirectoryCard {...directoryCardChangedIconsArgs} /> );
        let el = container.querySelector( ".dxDirectoryCard__trigger" ) as HTMLElement;
        await userEvent.click( el );
        let icon = container.querySelector( ".dxDirectoryCard__trigger i" ) as HTMLElement;
        expect( icon ).toHaveClass( directoryCardChangedIconsArgs.icons?.close! );
    } );

    describe( "DXDirectoryCard Hardening", () => {
        let originalInnerWidth: number;

        beforeAll( () => {
            originalInnerWidth = window.innerWidth;
        } );

        afterEach( () => {
            Object.defineProperty( window, 'innerWidth', { writable: true, configurable: true, value: originalInnerWidth } );
            jest.restoreAllMocks();
        } );

        const baseProps: DirectoryCardProps = {
            index: 42,
            title: "Test Sniper",
            subtitle: { label: "Engineering", url: "/eng" }
        };

        test( "Strictly tests window resize registration, mobile boundary conditions, and unmount lifecycles", () => {
            const addListenerSpy = jest.spyOn( window, 'addEventListener' );
            const removeListenerSpy = jest.spyOn( window, 'removeEventListener' );

            // Test boundary at exactly 768px (should evaluate to mobile: true)
            Object.defineProperty( window, 'innerWidth', { configurable: true, get: () => 768 } );
            const { unmount, rerender } = render( <DXDirectoryCard {...baseProps} /> );

            expect( addListenerSpy ).toHaveBeenCalledWith( 'resize', expect.any( Function ) );
            expect( screen.queryByTestId( "dx-directory-card-metadata" ) ).toBeInTheDocument();

            // Test boundary at 769px (should evaluate to mobile: false)
            act( () => {
                Object.defineProperty( window, 'innerWidth', { configurable: true, get: () => 769 } );
                window.dispatchEvent( new Event( 'resize' ) );
            } );
            rerender( <DXDirectoryCard {...baseProps} /> );
            expect( screen.queryByTestId( "dx-directory-card-metadata" ) ).not.toBeInTheDocument();

            // Validate complete structural cleanup on unmount to kill lifecycle traps
            unmount();
            expect( removeListenerSpy ).toHaveBeenCalledWith( 'resize', expect.any( Function ) );
        } );

        test( "Strictly asserts arbitrary metadata mapping limits, regex transformation, and link target branches", () => {
            const arbitraryProps = {
                ...baseProps,
                customCamelCaseProp: { label: "Value One", url: "/url-one", target: "_blank" },
                secondCustomProp: { label: "Value Two", url: "/url-two" },
                thirdCustomProp: { label: "Value Three", url: "/url-three" } // Exceeds METADATA_MAX (2)
            };

            render( <DXDirectoryCard {...arbitraryProps} /> );

            // Verify accurate insertion of whitespace before uppercase characters via regex conversion
            const infoKeys = document.querySelectorAll( ".dxDirectoryCard__infoKey" );
            expect( infoKeys[0].textContent ).toStrictEqual( "custom Camel Case Prop" );
            expect( infoKeys[1].textContent ).toStrictEqual( "second Custom Prop" );

            // Verify hard mathematical slicing limit (METADATA_MAX = 2)
            expect( infoKeys.length ).toStrictEqual( 2 );

            // Verify exact resolution of custom target values vs default attributes
            const links = document.querySelectorAll( ".dxDirectoryCard__infoValue" );
            expect( links[0] ).toHaveAttribute( "target", "_blank" );
            expect( links[1] ).toHaveAttribute( "target", "_self" ); // Fallback resolution from getLinkTarget
        } );

        test( "Strictly enforces maximum capping boundaries for labels list mapping", () => {
            const sixLabels = [
                { label: "L1", color: "#111" },
                { label: "L2", color: "#222" },
                { label: "L3", color: "#333" },
                { label: "#4", color: "#444" },
                { label: "L5", color: "#555" },
                { label: "L6", color: "#666" } // Should be strictly sliced out by the .slice(0, 5) boundary
            ];

            render( <DXDirectoryCard {...baseProps} labels={sixLabels} /> );
            const renderedLabels = screen.getAllByTestId( "dx-directory-card-tagItem" );

            expect( renderedLabels.length ).toStrictEqual( 5 );
            expect( renderedLabels[0] ).toHaveStyle( { borderColor: "#111", color: "#111" } );
        } );

        test( "Strictly tests logical accumulator boundaries for primary action buttons including label suppression bypasses", () => {
            const multiplePrimaryButtons = [
                { label: "P1", onClick: () => {} },                  // counter = 1 (counter <= 2 true) -> pushed
                { label: "P2", hideLabel: true, onClick: () => {} }, // hideLabel true -> counter stays 1 (counter <= 2 true) -> pushed
                { label: "P3", onClick: () => {} },                  // counter = 2 (counter <= 2 true) -> pushed
                { label: "P4", onClick: () => {} }                   // counter = 3 (counter <= 2 false) -> omitted
            ];

            const { container } = render( <DXDirectoryCard {...baseProps} primaryButtons={multiplePrimaryButtons} /> );
            const finalRenderedButtons = container.querySelectorAll( ".dxDirectoryCard__buttonsPrimary li" );

            expect( finalRenderedButtons.length ).toStrictEqual( 3 );
        } );

        test( "Strictly tracks configuration permutations for responsive container style modifications and alignments", () => {
            Object.defineProperty( window, 'innerWidth', { configurable: true, get: () => 375 } );

            // Combination A: mobile true + buttonCount < 3 (labels count = 2) -> Should append '--mobileInLine'
            const propsWithTwoButtons = {
                ...baseProps,
                labels: [{ label: "TagA" }, { label: "TagB" }]
            };

            const { rerender } = render( <DXDirectoryCard {...propsWithTwoButtons} /> );
            expect( screen.getByTestId( "dx-directory-card-buttons-container" ) ).toHaveClass( "dxDirectoryCard__containerButtons--mobileInLine" );

            // Combination B: mobile true + buttonCount >= 3 (labels count = 3) -> Omit '--mobileInLine'
            const propsWithThreeButtons = {
                ...baseProps,
                labels: [{ label: "TagA" }, { label: "TagB" }, { label: "TagC" }]
            };
            act( () => {
                rerender( <DXDirectoryCard {...propsWithThreeButtons} /> );
            } );
            expect( screen.getByTestId( "dx-directory-card-buttons-container" ) ).not.toHaveClass( "dxDirectoryCard__containerButtons--mobileInLine" );

            // Combination C: desktop layout + exactly one configuration group present (counterSections === 1) -> Append '--center'
            act( () => {
                Object.defineProperty( window, 'innerWidth', { configurable: true, get: () => 1200 } );
                window.dispatchEvent( new Event( 'resize' ) );
            } );
            const desktopSingleSectionProps = {
                ...baseProps,
                labels: [{ label: "OnlyLabels" }]
            };
            act( () => {
                rerender( <DXDirectoryCard {...desktopSingleSectionProps} /> );
            } );
            // Re-querying inline bypasses the detached DOM element reference trap caused by the mobile layout switch
            expect( screen.getByTestId( "dx-directory-card-buttons-container" ) ).toHaveClass( "dxDirectoryCard__containerButtons--center" );

            // Combination D: desktop layout + multiple configuration groups present (counterSections > 1) -> Omit '--center'
            const desktopMultiSectionProps = {
                ...baseProps,
                labels: [{ label: "Labels" }],
                primaryButtons: [{ label: "Primary", onClick: () => {} }]
            };
            act( () => {
                rerender( <DXDirectoryCard {...desktopMultiSectionProps} /> );
            } );
            expect( screen.getByTestId( "dx-directory-card-buttons-container" ) ).not.toHaveClass( "dxDirectoryCard__containerButtons--center" );
        } );
    } );
} );
