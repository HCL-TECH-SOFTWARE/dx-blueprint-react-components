import React from "react";
import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import DXCasesCatalog from "./DXCasesCatalog";
import { itemsArgs } from "./DXCasesCatalog.stories";

test( "The component should render the same amount of items passed", () => {
    const { container } = render( <DXCasesCatalog items={itemsArgs} /> );
    let renderedItems = container.querySelectorAll( ".dxCaseCard" );
    expect( renderedItems ).toHaveLength( itemsArgs.length );
} );
