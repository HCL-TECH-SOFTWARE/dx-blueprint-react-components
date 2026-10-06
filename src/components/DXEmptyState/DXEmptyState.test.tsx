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
