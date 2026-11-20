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
import { act, render, screen } from "@testing-library/react";
import DXSearchResultsCatalog from "./DXSearchResultsCatalog";
import { itemsArgs } from "./DXSearchResultsCatalog.stories";
import userEvent from "@testing-library/user-event";

test( "if paginationProps are undefined the pagination element will be null", () => {
    let catalogProps = {
        items: itemsArgs,
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { container } = render( <DXSearchResultsCatalog {...catalogProps} /> );
    let pagination = container.querySelector( ".dxPagination" );
    expect( pagination ).toBeNull();
} );

test( "if sets on paginationProps is undefined the pagination element will be null", () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            active: 1,
            activeSet: 2,
        }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { container } = render( <DXSearchResultsCatalog {...catalogProps} /> );
    let pagination = container.querySelector( ".dxPagination" );
    expect( pagination ).toBeNull();
} );

test( "if active on paginationProps is undefined the pagination element will be null", () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "5", "10"],
            activeSet: 2,
        }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { container } = render( <DXSearchResultsCatalog {...catalogProps} /> );
    let pagination = container.querySelector( ".dxPagination" );
    expect( pagination ).toBeNull();
} );

test( "if activeSet on paginationProps is undefined the pagination element will be null", () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "5", "10"],
            active: 1,
        }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { container } = render( <DXSearchResultsCatalog {...catalogProps} /> );
    let pagination = container.querySelector( ".dxPagination" );
    expect( pagination ).toBeNull();
} );

test( "if a valid paginationProps is passed, then the pagination element should be in the document", () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "5", "10"],
            active: 1,
            activeSet: 2
        }
    };
    const { container } = render( <DXSearchResultsCatalog {...catalogProps} /> );
    let pagination = container.querySelector( ".dxPagination" );
    expect( pagination ).toBeInTheDocument();
} );

test( "If a number of the pagination is clicked, the active page element should not be null", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "4", "6"],
            active: 1,
            activeSet: 4
        }
    };
    const { container } = render( <DXSearchResultsCatalog {...catalogProps} /> );
    // Click on the number 3
    const buttonToClicked = container.querySelector( ".pagination.pagination-root" )?.childNodes[3].childNodes[0] as HTMLElement;
    await userEvent.click( buttonToClicked );
    const activeNumber = container.querySelector( ".page-item.active" );
    expect( activeNumber ).not.toBeNull();
} );

test( "If a number of the pagination is clicked, the active page should be 3", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "4", "6"],
            active: 1,
            activeSet: 4
        }
    };
    const { container } = render( <DXSearchResultsCatalog {...catalogProps} /> );
    // Click on the number 3
    const buttonToClicked = container.querySelector( ".pagination.pagination-root" )?.childNodes[3].childNodes[0] as HTMLElement;
    await userEvent.click( buttonToClicked );
    const activeNumber = container.querySelector( ".page-item.active" );
    expect( activeNumber?.childNodes[0].textContent ).toEqual( "3" );
} );

test( "if the right amount of cards are rendering", () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "4", "6"],
            active: 1,
            activeSet: 4
        }
    };
    const { container } = render( <DXSearchResultsCatalog {...catalogProps} /> );
    const cards = container.querySelectorAll( ".dxStraightCard" );
    expect( cards ).toHaveLength( catalogProps.paginationProps.activeSet );
} );

test( "If a pagination set of 6 cards is selected, it should change the amount of cards rendered", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "4", "6"],
            active: 1,
            activeSet: 4
        }
    };
    const { container } = render( <DXSearchResultsCatalog {...catalogProps} /> );
    await act( async ()=>  {
        const paginationSet = container.querySelector( ".pagination-items-per-page" ) as HTMLElement;
        await userEvent.click( paginationSet );
        const newOption = screen.getByText( /6/ );
        await userEvent.click( newOption );
    });
    const cards = container.querySelectorAll( ".dxStraightCard" );
    expect( cards ).toHaveLength( 6 );
} );

// Tests for elementsPerRow
test( "if the user does not pass elementsPerRow, the card should have the class col-lg-6", () => {
    let props = {
        items: itemsArgs,
    };
    const { container } = render( <DXSearchResultsCatalog {...props} /> );
    let card = container.querySelector( ".dxSRCatalog__item" );
    expect( card ).toHaveClass( "col-lg-6" );
} );

test( "if the user passes elementsPerRow as 0, the card should have the class col-lg-6", () => {
    let props = {
        items: itemsArgs,
        elementsPerRow: 0,
    };
    const { container } = render( <DXSearchResultsCatalog {...props} /> );
    let card = container.querySelector( ".dxSRCatalog__item" );
    expect( card ).toHaveClass( "col-lg-6" );
} );

test( "if the user passes elementsPerRow as 1, the card should have the class col-lg-12", () => {
    let props = {
        items: itemsArgs,
        elementsPerRow: 1,
    };
    const { container } = render( <DXSearchResultsCatalog {...props} /> );
    let card = container.querySelector( ".dxSRCatalog__item" );
    expect( card ).toHaveClass( "col-lg-12" );
} );

test( "if the user passes elementsPerRow as 2, the card should have the class col-lg-6", () => {
    let props = {
        items: itemsArgs,
        elementsPerRow: 2,
    };
    const { container } = render( <DXSearchResultsCatalog {...props} /> );
    let card = container.querySelector( ".dxSRCatalog__item" );
    expect( card ).toHaveClass( "col-lg-6" );
} );

test( "if the user passes elementsPerRow as 3, the card should have the class col-lg-4", () => {
    let props = {
        items: itemsArgs,
        elementsPerRow: 3,
    };
    const { container } = render( <DXSearchResultsCatalog {...props} /> );
    let card = container.querySelector( ".dxSRCatalog__item" );
    expect( card ).toHaveClass( "col-lg-4" );
} );

test( "if the user passes elementsPerRow as 4, the card should have the class col-lg-3", () => {
    let props = {
        items: itemsArgs,
        elementsPerRow: 4,
    };
    const { container } = render( <DXSearchResultsCatalog {...props} /> );
    let card = container.querySelector( ".dxSRCatalog__item" );
    expect( card ).toHaveClass( "col-lg-3" );
} );

itSupportsExtensionProps( ( extra ) => <DXSearchResultsCatalog {...( { items: itemsArgs } as React.ComponentProps<typeof DXSearchResultsCatalog> )} {...extra} /> );
