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
import { render, fireEvent, within, act } from "@testing-library/react";
import DXCaseCard from "./DXCaseCard";

// Test the label color logic
test( "If the user does not pass any color for the label, the styles for the color and border color will be 'var(--primary-primary)'", () => {
    let props = {
        title: "#0000-General Review of Year 2022",
        subtitle: "HR",
        label: {
            label: "Label Text",
        },
        options: [
            {
                label: "Option 1",
                onClick: function () {}
            },
        ]
    };
    const { container } = render( <DXCaseCard {...props} /> );
    let label = container.querySelector( '[data-testid="case-card-label"]' ) as HTMLElement;
    expect( label ).toHaveStyle( { color: "var(--primary-primary)", borderColor: "var(--primary-primary)" } );
} );

test( "If the user does pass 'var(--danger-danger)' color for the label, the styles should be applied", () => {
    let props = {
        title: "#0000-General Review of Year 2022",
        subtitle: "HR",
        label: {
            label: "Label Text",
            color: "var(--danger-danger)"
        },
        options: [
            {
                label: "Option 1",
                onClick: function () {}
            },
        ]
    };
    const { container } = render( <DXCaseCard {...props} /> );
    let label = container.querySelector( '[data-testid="case-card-label"]' ) as HTMLElement;
    expect( label ).toHaveStyle( { color: "var(--danger-danger)", borderColor: "var(--danger-danger)" } );
} );

itSupportsExtensionProps( ( extra ) => (
    <DXCaseCard title="Case title" subtitle="HR" label={{ label: "Label Text" }} options={[{ label: "Option 1", onClick: () => {} }]} {...extra} />
) );

describe( "DXCaseCard dropdown with consumer extension props", () => {
    test( "the portaled options menu opens and works while ref, className and attributes stay on the card root", async () => {
        const ref = React.createRef<HTMLDivElement>();
        const onOption = jest.fn();
        const { container } = render(
            <DXCaseCard title="Case title" subtitle="HR" label={{ label: "Label Text" }} options={[{ label: "Option 1", onClick: onOption }]}
                dropdownOpen ref={ref} className="bp-consumer" data-consumer="yes" />
        );
        // Let the dropdown's positioning (Popper) finish its async update inside act
        await act( async () => {} );
        const root = container.firstElementChild as HTMLElement;
        const menu = document.body.querySelector( ".dropdown-menu" ) as HTMLElement;
        expect( ref.current ).toBe( root );
        expect( root ).toHaveClass( "dxCaseCard", "bp-consumer" );
        expect( menu ).toBeInTheDocument();
        expect( menu ).toHaveClass( "show" );
        expect( root.contains( menu ) ).toBe( false );
        expect( menu ).not.toHaveClass( "bp-consumer" );
        expect( menu ).not.toHaveAttribute( "data-consumer" );
        fireEvent.click( within( menu ).getByText( "Option 1" ) );
        expect( onOption ).toHaveBeenCalledTimes( 1 );
    } );

    test( "the options menu is hidden when dropdownOpen is false, with consumer extension props", () => {
        const ref = React.createRef<HTMLDivElement>();
        render( <DXCaseCard title="Case title" subtitle="HR" label={{ label: "Label Text" }} options={[{ label: "Option 1", onClick: () => {} }]} ref={ref} className="bp-consumer" /> );
        expect( document.body.querySelector( ".dropdown-menu.show" ) ).toBeNull();
        expect( ref.current ).toHaveClass( "dxCaseCard" );
    } );
} );
