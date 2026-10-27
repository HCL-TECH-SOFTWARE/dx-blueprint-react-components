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
import { render, fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXDirectory from "./DXDirectory";
import { itemsArgs } from "./DXDirectory.stories";

test( "If hideFilters is true, then the dxTaxonomyFilter element will be null", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 16
        },
        totalItems: itemsArgs.length,
        categories: ["department"],
        filterType: "select",
        hideFilters: true,
    };
    const { container } = render( <DXDirectory {...props} /> );
    const taxonomy = container.querySelector( ".dxTaxonomyFilter" );
    expect( taxonomy ).toBeNull();
} );

test( "if totalItems is missing, then it should render a message 'Invalid or missing props for taxonomy filter'", () => {
    let props = {
        items: itemsArgs,
        categories: ["department"],
        filterType: "select",
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 16
        }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXDirectory {...props} /> );
    expect( getByText( "Invalid or missing props for taxonomy filter" ) ).toBeInTheDocument();
} );

test( "if filterType is missing, then it should render a message 'Invalid or missing props for taxonomy filter'", () => {
    let props = {
        items: itemsArgs,
        categories: ["department"],
        totalItems: itemsArgs.length,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 16
        }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXDirectory {...props} /> );
    expect( getByText( "Invalid or missing props for taxonomy filter" ) ).toBeInTheDocument();
} );

test( "if categories, totalItems and filterType are passed, then the 'dxTaxonomyFilter will be in the document'", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 16
        },
        totalItems: itemsArgs.length,
        filterType: "select",
        categories: ["department"],
    };
    const { container } = render( <DXDirectory {...props} /> );
    const taxonomy = container.querySelector( ".dxTaxonomyFilter" );
    expect( taxonomy ).toBeInTheDocument();
} );

test( "If sets on paginationProps is undefined, a message 'Invalid or missing props for pagination' will show", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            active: 1,
            activeSet: 16
        },
        totalItems: itemsArgs.length,
        filterType: "select"
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXDirectory {...props} /> );
    expect( getByText( "Invalid or missing props for pagination" ) ).toBeInTheDocument();
} );

test( "If active on paginationProps is undefined, a message 'Invalid or missing props for pagination' will show", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            activeSet: 16
        },
        totalItems: itemsArgs.length,
        categories: ["department"],
        filterType: "select"
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXDirectory {...props} /> );
    expect( getByText( "Invalid or missing props for pagination" ) ).toBeInTheDocument();
} );

test( "If activeSet on paginationProps is undefined, a message 'Invalid or missing props for pagination' will show", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1
        },
        totalItems: itemsArgs.length,
        categories: ["department"],
        filterType: "select"
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXDirectory {...props} /> );
    expect( getByText( "Invalid or missing props for pagination" ) ).toBeInTheDocument();
} );

test( "if a valid paginationProps is passed, then it should render it", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 16
        },
        totalItems: itemsArgs.length,
        categories: ["department"],
        filterType: "select"
    };
    const { getByTestId } = render( <DXDirectory {...props} /> );
    const pagination = getByTestId( "pagination" );
    expect( pagination ).toBeInTheDocument();
} );

test( "If a number of the pagination is clicked, the active page element should not be null", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6
        },
        totalItems: itemsArgs.length,
        categories: ["department"],
        filterType: "select"
    };
    const { container } = render( <DXDirectory {...catalogProps} /> );
    // Click on the number 2
    const buttonToClicked = container.querySelector( ".pagination.pagination-root" )?.childNodes[2].childNodes[0] as HTMLElement;
    await userEvent.click( buttonToClicked );
    const activeNumber = container.querySelector( ".page-item.active" );
    expect( activeNumber ).not.toBeNull();
} );

test( "If a number of the pagination is clicked, the active page should be 2", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6
        },
        totalItems: itemsArgs.length,
        categories: ["department"],
        filterType: "select"
    };
    const { container } = render( <DXDirectory {...catalogProps} /> );
    // Click on the number 2
    const buttonToClicked = container.querySelector( ".pagination.pagination-root" )?.childNodes[2].childNodes[0] as HTMLElement;
    await userEvent.click( buttonToClicked );
    const activeNumber = container.querySelector( ".page-item.active" );
    expect( activeNumber?.childNodes[0].textContent ).toEqual( "2" );
} );

test( "If the right amount of cards are rendered", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6
        },
        totalItems: itemsArgs.length,
        categories: ["department"],
        filterType: "select"
    };
    const { container } = render( <DXDirectory {...catalogProps} /> );
    const cards = container.querySelectorAll( ".dxDirectoryCard" );
    expect( cards ).toHaveLength( catalogProps.paginationProps.activeSet );
} );

test( "If a pagination set of 5 cards is selected, it should change the amount of questions rendered", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6
        },
        totalItems: itemsArgs.length,
        categories: ["department"],
        filterType: "select"
    };
    const { container } = render( <DXDirectory {...catalogProps} /> );
    await act( async ()=>  {
        const paginationSet = container.querySelector( ".pagination-items-per-page" ) as HTMLElement;
        await userEvent.click( paginationSet );
        let newOption: HTMLAnchorElement | undefined;
        document.querySelectorAll<HTMLAnchorElement>( "a.dropdown-item" ).forEach( element => {
            if ( element.textContent?.trim() === '12' ) {
                newOption = element;
            }
        } );
        await userEvent.click( newOption! );
    });
    const questions = container.querySelectorAll( ".dxDirectoryCard" );
    expect( questions ).toHaveLength( 12 );
} );

test( "if the department filter with value 'Dev' is active it should render just 4 cards", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6
        },
        totalItems: itemsArgs.length,
        categories: ["department"],
        filterType: "select"
    };
    const { container, getAllByTestId } = render( <DXDirectory {...catalogProps} /> );
    const select = getAllByTestId( "filter-select" )[0];
    const devOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[1] as HTMLElement;
    await userEvent.selectOptions( select, devOption );
    const cards = container.querySelectorAll( '.dxDirectoryCard' );
    expect( cards ).toHaveLength( 5 );
} );

test( "if the department filter with value 'Dev' is active and then remove it, it should render 6 cards", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6
        },
        totalItems: itemsArgs.length,
        categories: ["department"],
        filterType: "select"
    };
    const { container } = render( <DXDirectory {...catalogProps} /> );
    const devOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[1] as HTMLElement;
    await userEvent.click( devOption );
    const removeIcon = document.querySelector( '[data-testid="tags"]' )?.childNodes[0].childNodes[1] as HTMLElement;
    await userEvent.click( removeIcon );
    const cards = container.querySelectorAll( '.dxDirectoryCard' );
    expect( cards ).toHaveLength( catalogProps.paginationProps.activeSet );
} );

test( "if the user enter a filter 'diego' then 1 card should be rendered", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6
        },
        totalItems: itemsArgs.length,
        categories: ["department"],
        filterType: "select"
    };
    const { container } = render( <DXDirectory {...catalogProps} /> );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "diego" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13,
    } );

    const questions = container.querySelectorAll( '.dxDirectoryCard' );
    expect( questions ).toHaveLength( 1 );
} );

test( "If the user enter a filter 'diego' and then remove it, 6 cards should be rendered", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6
        },
        totalItems: itemsArgs.length,
        categories: ["department"],
        filterType: "select"
    };
    const { container } = render( <DXDirectory {...catalogProps} /> );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "diego" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13
    } );

    const removeIcon = document.querySelector( '[data-testid="tags"]' )?.childNodes[0].childNodes[1] as HTMLElement;
    await userEvent.click( removeIcon );
    const cards = container.querySelectorAll( '.dxDirectoryCard' );
    expect( cards ).toHaveLength( catalogProps.paginationProps.activeSet );
} );

test( "If the user select the filter 'Dev' and enter a filter 'hotdog' there should be no cards", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6
        },
        totalItems: itemsArgs.length,
        categories: ["department"],
        filterType: "select"
    };
    const { container, getAllByTestId } = render( <DXDirectory {...catalogProps} /> );
    const select = getAllByTestId( "filter-select" )[0];
    const devOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[1] as HTMLElement;
    await userEvent.selectOptions( select, devOption );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "hotdog" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13
    } );

    const cards = container.querySelectorAll( '.dxDirectoryCard' );
    expect( cards ).toHaveLength( 0 );
} );

test( "If the filters 'hotdog' and 'Dev' are active and the user removes the 'hotdog' one, it should render 5 cards", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6
        },
        totalItems: itemsArgs.length,
        categories: ["department"],
        filterType: "select"
    };
    const { container, getAllByTestId } = render( <DXDirectory {...catalogProps} /> );
    const select = getAllByTestId( "filter-select" )[0];
    const devOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[1] as HTMLElement;
    await userEvent.selectOptions( select, devOption );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "hotdog" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13
    } );
    const removeIcon = document.querySelector( '[data-testid="tags"]' )?.childNodes[1].childNodes[1] as HTMLElement;
    await userEvent.click( removeIcon );
    const questions = container.querySelectorAll( '.dxDirectoryCard' );
    expect( questions ).toHaveLength( 5 );
} );

test( "If the filters 'hotdog' and 'Dev' are active and the user removes the all the filters, it should render 6 questions", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6
        },
        totalItems: itemsArgs.length,
        categories: ["department"],
        filterType: "select"
    };
    const { container, getAllByTestId } = render( <DXDirectory {...catalogProps} /> );
    const select = getAllByTestId( "filter-select" )[0];
    const devOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[1] as HTMLElement;
    await userEvent.selectOptions( select, devOption );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "hotdog" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13
    } );
    const removeIcon1 = document.querySelector( '[data-testid="tags"]' )?.childNodes[1].childNodes[1] as HTMLElement;
    await userEvent.click( removeIcon1 );
    const removeIcon2 = document.querySelector( '[data-testid="tags"]' )?.childNodes[0].childNodes[1] as HTMLElement;
    await userEvent.click( removeIcon2 );
    const questions = container.querySelectorAll( '.dxDirectoryCard' );
    expect( questions ).toHaveLength( 6 );
} );

  
test("should exclude empty or whitespace-only values from filter dropdown", () => {
    const itemsWithEmptyValues = [
        {
            ...itemsArgs[0],
            data: { department: "Dev Department" },
        },
        {
            ...itemsArgs[1],
            data: { department: "  " }, 
        },
        {
            ...itemsArgs[2],
            data: { department: "" },
        },
        {
            ...itemsArgs[3],
            data: { department: "HR Department" },
        }
        ];

        
    const { getAllByTestId } = render(
        <DXDirectory
        items={itemsWithEmptyValues as any}
        paginationProps={{ sets: ["3", "6", "12"], active: 1, activeSet: 6 }}
        totalItems={itemsWithEmptyValues.length}
        filterType="select"
        categories={["department"]}
        />
    );

    const select = getAllByTestId("filter-select")[0];
    const options = Array.from(select.querySelectorAll("option")).map((opt) =>
        opt.textContent?.toLowerCase().trim()
    );

    expect(options).toContain("dev department");
    expect(options).toContain("hr department");

    expect(options).not.toContain("");
    expect(options).not.toContain(" ");
    expect(options).not.toContain(undefined);
});