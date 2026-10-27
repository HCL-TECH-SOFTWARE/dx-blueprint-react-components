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
import DXEmptyState, { EmptyStateProps } from "./DXEmptyState";
import { DefaultArgs, WithButtonsArgs } from "./DXEmptyState.stories";

test( "Render Empty State component", async () => {
    render( <DXEmptyState {...DefaultArgs} /> );
    expect( screen.getByTestId( "dxEmptyState" ) ).toBeInTheDocument();

} );

test( "If component renders with description and text", async () => {
    render( <DXEmptyState {...DefaultArgs} /> );
    expect( screen.getByTestId( "dxEmptyState" ) ).toBeInTheDocument();
    expect( screen.getByTestId( "dxEmptyState__title" ) ).toBeInTheDocument();
    expect( screen.getByTestId( "dxEmptyState__text" ) ).toBeInTheDocument();
} );

test( "If component has buttons properties, they will be displayed", async () => {
    render( <DXEmptyState {...WithButtonsArgs} /> );
    expect( screen.getByTestId( "dxEmptyState" ) ).toBeInTheDocument();
    expect( screen.getByTestId( "dxEmptyState__title" ) ).toBeInTheDocument();
    expect( screen.getByTestId( "dxEmptyState__text" ) ).toBeInTheDocument();
    expect( screen.getByTestId( "dxEmptyState__image" ) ).toBeInTheDocument();
    expect( screen.getByTestId( "dxEmptyState__buttons" ) ).toBeInTheDocument();
} );

test( "If the component does not have an image, the text will be displayed in the center", async () => {
    let props = {
        title: "This is an empty container",
        text: "No saved items here for now, come back later!"
    } as EmptyStateProps;

    const { container } = render( <DXEmptyState {...props} /> );
    let info = container.querySelector( ".dxEmptyState__info" );

    expect( screen.getByTestId( "dxEmptyState" ) ).toBeInTheDocument();
    expect( screen.getByTestId( "dxEmptyState__title" ) ).toBeInTheDocument();
    expect( screen.getByTestId( "dxEmptyState__text" ) ).toBeInTheDocument();
    expect( info ).toHaveStyle( { 'text-align': 'center' } );
} );
