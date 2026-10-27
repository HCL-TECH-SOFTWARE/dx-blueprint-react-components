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
import userEvent from "@testing-library/user-event";
import { act, render, screen } from "@testing-library/react";
import DXGenericCatalog, { GenericCatalogProps } from "./DXGenericCatalog";
import { basicCardCatalogArgs } from "./DXGenericCatalog.stories";

// Basic rendering
test( "if the component is properly configured it should be rendered", () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    render( <DXGenericCatalog {...props} /> );
    let catalog = screen.getByTestId( 'catalog-section' );
    expect( catalog ).toBeInTheDocument();
    expect( catalog.childElementCount ).toBe( 3 );
    let taxonomyFilter = document.querySelector( '.dxTaxonomyFilter' );
    let body = document.querySelector( '.dxGenericCatalog__cards' );
    let pagination = document.querySelector( '.dxPagination' );

    expect( taxonomyFilter ).not.toBeNull();
    expect( body ).not.toBeNull();
    expect( pagination ).not.toBeNull();
} );

test( "if no filter prop is configured catalog should be rendered without taxonomy filter", () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    delete props.filter;
    render( <DXGenericCatalog {...props} /> );
    let catalog = screen.getByTestId( 'catalog-section' );
    expect( catalog ).toBeInTheDocument();
    expect( catalog.childElementCount ).toBe( 2 );
    let taxonomyFilter = document.querySelector( '.dxTaxonomyFilter' );
    let body = document.querySelector( '.dxGenericCatalog__cards' );
    let pagination = document.querySelector( '.dxPagination' );

    expect( taxonomyFilter ).toBeNull();
    expect( body ).not.toBeNull();
    expect( pagination ).not.toBeNull();
} );

test( "if filter.hide prop is configured catalog should be rendered without taxonomy filter", () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    props.filter!.hide = true;
    render( <DXGenericCatalog {...props} /> );
    let catalog = screen.getByTestId( 'catalog-section' );
    expect( catalog ).toBeInTheDocument();
    expect( catalog.childElementCount ).toBe( 2 );
    let taxonomyFilter = document.querySelector( '.dxTaxonomyFilter' );
    let body = document.querySelector( '.dxGenericCatalog__cards' );
    let pagination = document.querySelector( '.dxPagination' );

    expect( taxonomyFilter ).toBeNull();
    expect( body ).not.toBeNull();
    expect( pagination ).not.toBeNull();
} );

test( "if the items array is empty it should render the empty view", () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    props.body.items = [];
    render( <DXGenericCatalog {...props} /> );

    let body = document.querySelector( '.dxGenericCatalog__cards' );
    expect( body ).not.toBeNull();

    let empty = document.querySelector( '.dxEmptyState' );
    expect( empty ).not.toBeNull();
} );

test( "if the items array is empty no pagination should be rendered", () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    props.body.items = [];
    render( <DXGenericCatalog {...props} /> );

    let catalog = screen.getByTestId( 'catalog-section' );
    expect( catalog ).toBeInTheDocument();
    expect( catalog.childElementCount ).toBe( 2 );
    let taxonomyFilter = document.querySelector( '.dxTaxonomyFilter' );
    let body = document.querySelector( '.dxGenericCatalog__cards' );
    let pagination = document.querySelector( '.dxPagination' );

    expect( taxonomyFilter ).not.toBeNull();
    expect( body ).not.toBeNull();
    expect( pagination ).toBeNull();
} );

test( "if the items array is empty and no empty props have been configured it should render the default empty view", () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    props.body.items = [];
    delete props.body.empty;
    render( <DXGenericCatalog {...props} /> );

    let body = document.querySelector( '.dxGenericCatalog__cards' );
    expect( body ).not.toBeNull();

    let empty = document.querySelector( '.dxEmptyState' );
    let emptyTitle = document.querySelector( '.dxEmptyState__title' );
    expect( emptyTitle ).toHaveTextContent( "No items to display" );
} );

test( "if the search label is set it should be rendered", () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    props.filter!.search = {
        label: "Test setting of label"
    };
    render( <DXGenericCatalog {...props} /> );

    let taxonomyFilterLabel = document.querySelector( '.dxTaxonomyFilter__inputLabel' );
    expect( taxonomyFilterLabel ).toHaveTextContent( props.filter!.search!.label as string );
} );

test( "if the search placeholder is set it should be rendered", () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    props.filter!.search = {
        placeholder: "Test setting of placeholder"
    };
    render( <DXGenericCatalog {...props} /> );

    let taxonomyFilterSearch = screen.getByTestId( 'filter-search' ) as HTMLInputElement;
    expect( taxonomyFilterSearch.placeholder ).toBe( props.filter!.search!.placeholder );
} );

test( "if the componentType is not configured to a supported component a warning should be logged", () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    props.body.componentType = "DXCalendar";
    const warn = jest.spyOn( console, "warn" );

    render( <DXGenericCatalog {...props} /> );

    expect( warn ).toHaveBeenCalledWith( "Incorrect TAG for children element was not found in the library: " + props.body.componentType );
    warn.mockRestore();

    let catalog = screen.getByTestId( 'catalog-section' );
    expect( catalog ).toBeInTheDocument();
    expect( catalog.childElementCount ).toBe( 2 );
    let taxonomyFilter = document.querySelector( '.dxTaxonomyFilter' );
    let body = document.querySelector( '.dxGenericCatalog__cards' );
    let pagination = document.querySelector( '.dxPagination' );

    expect( taxonomyFilter ).not.toBeNull();
    expect( body ).toBeNull();
    expect( pagination ).not.toBeNull();
} );

// Tests for elementsPerRow
test( "if the user does not pass elementsPerRow, the card should have the class col-lg-3", () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    delete props.body.elementsPerRow;
    const { container } = render( <DXGenericCatalog {...props} /> );
    let card = container.querySelector( ".dxGenericCatalog__card" );
    expect( card ).toHaveClass( "col-lg-3" );
} );

test( "if the user passes elementsPerRow as 0, the card should have the class col-lg-3", () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    props.body.elementsPerRow = 0;
    const { container } = render( <DXGenericCatalog {...props} /> );
    let card = container.querySelector( ".dxGenericCatalog__card" );
    expect( card ).toHaveClass( "col-lg-3" );
} );

test( "if the user passes elementsPerRow as 1, the card should have the class col-lg-12", () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    props.body.elementsPerRow = 1;
    const { container } = render( <DXGenericCatalog {...props} /> );
    let card = container.querySelector( ".dxGenericCatalog__card" );
    expect( card ).toHaveClass( "col-lg-12" );
} );

test( "if the user passes elementsPerRow as 2, the card should have the class col-lg-6", () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    props.body.elementsPerRow = 2;
    const { container } = render( <DXGenericCatalog {...props} /> );
    let card = container.querySelector( ".dxGenericCatalog__card" );
    expect( card ).toHaveClass( "col-lg-6" );
} );

test( "if the user passes elementsPerRow as 3, the card should have the class col-lg-4", () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    props.body.elementsPerRow = 3;
    const { container } = render( <DXGenericCatalog {...props} /> );
    let card = container.querySelector( ".dxGenericCatalog__card" );
    expect( card ).toHaveClass( "col-lg-4" );
} );

test( "if the user passes elementsPerRow as 4, the card should have the class col-lg-3", () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    props.body.elementsPerRow = 4;
    const { container } = render( <DXGenericCatalog {...props} /> );
    let card = container.querySelector( ".dxGenericCatalog__card" );
    expect( card ).toHaveClass( "col-lg-3" );
} );

test( "if the user passes elementsPerRow as 6, the card should have the class col-lg-3", () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    props.body.elementsPerRow = 6;
    const { container } = render( <DXGenericCatalog {...props} /> );
    let card = container.querySelector( ".dxGenericCatalog__card" );
    expect( card ).toHaveClass( "col-lg-2" );
} );

test( "if a number of the pagination is clicked, the active page element should not be null", async () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    render( <DXGenericCatalog {...props} /> );
    // Click on the number 3
    const button = document.querySelector( ".pagination.pagination-root" )?.childNodes[3].childNodes[0] as HTMLElement;
    await userEvent.click( button );
    const activeNumber = document.querySelector( ".page-item.active" );
    expect( activeNumber ).not.toBeNull();
} );

test( "if a number of the pagination is clicked, the active page should be 3", async () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    render( <DXGenericCatalog {...props} /> );
    // Click on the number 3
    const buttonToClicked = document.querySelector( ".pagination.pagination-root" )?.childNodes[3].childNodes[0] as HTMLElement;
    await userEvent.click( buttonToClicked );
    const activeNumber = document.querySelector( ".page-item.active" );
    expect( activeNumber?.childNodes[0].textContent ).toEqual( "3" );
} );

test( "if the right amount of cards are rendering", () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    render( <DXGenericCatalog {...props} /> );
    const cards = document.querySelectorAll( ".dxCard" );
    expect( cards ).toHaveLength( props.pagination.activeSet );
} );

test( "if a pagination set of 12 cards is selected, it should change the amount of cards rendered", async () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    render( <DXGenericCatalog {...props} /> );
    await act( async ()=>  {
        const paginationSet = document.querySelector( ".pagination-items-per-page" ) as HTMLElement;
        await userEvent.click( paginationSet );
        let newOption: HTMLAnchorElement | undefined;
        document.querySelectorAll<HTMLAnchorElement>( "a.dropdown-item" ).forEach( element => {
            if ( element.textContent?.trim() === '12' ) {
                newOption = element;
            }
        } );

        await userEvent.click( newOption! );
    });
    const cards = document.querySelectorAll( ".dxCard" );
    expect( cards ).toHaveLength( 12 );
} );

test( "if the subject filter with value 'cinema' is active it should render 4 cards", async () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    props.pagination.activeSet = 12;
    render( <DXGenericCatalog {...props} /> );
    const select = screen.getAllByTestId( "filter-select" )[2];
    const option = select.childNodes[1] as HTMLElement;
    await userEvent.selectOptions( select, option );
    const cards = document.querySelectorAll( '.dxCard' );
    expect( cards ).toHaveLength( 5 );
} );

test( "if the subject filter with value 'cinema' is active and then remove it, it should render 12 cards", async () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    props.pagination.activeSet = 12;
    render( <DXGenericCatalog {...props} /> );
    const select = screen.getAllByTestId( "filter-select" )[2];
    const option = select.childNodes[1] as HTMLElement;
    await userEvent.selectOptions( select, option );
    const removeIcon = screen.getByTestId( "tags" ).childNodes[0].childNodes[1] as HTMLElement;
    await userEvent.click( removeIcon );
    const cards = document.querySelectorAll( '.dxCard' );
    expect( cards ).toHaveLength( props.pagination.activeSet );
} );

test( "if the Sports, Mexico, and Local filters are selected and the user removes the Local one, there has to be just 1 card", async () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    props.pagination.activeSet = 12;

    render( <DXGenericCatalog {...props} /> );

    const countrySelect = screen.getAllByTestId( "filter-select" )[0];
    const scopeSelect = screen.getAllByTestId( "filter-select" )[1];
    const subjectSelect = screen.getAllByTestId( "filter-select" )[2];
    const sportsOption = subjectSelect.childNodes[3] as HTMLElement;
    const mexicoOption = countrySelect.childNodes[2] as HTMLElement;
    const localOption = scopeSelect.childNodes[2] as HTMLElement;
    await userEvent.selectOptions( subjectSelect, sportsOption );
    await userEvent.selectOptions( countrySelect, mexicoOption );
    await userEvent.selectOptions( scopeSelect, localOption );
    const localFilter = screen.getByTestId( "tags" ).childNodes[2].childNodes[1] as HTMLElement;
    await userEvent.click( localFilter );
    const cards = document.querySelectorAll( '.dxCard' );
    expect( cards ).toHaveLength( 2 );
} );

test( "if the Sports, Mexico, and Local filters are selected the empty view should be displayed", async () => {
    let props: GenericCatalogProps = JSON.parse( JSON.stringify( basicCardCatalogArgs ) );
    props.pagination.activeSet = 12;

    render( <DXGenericCatalog {...props} /> );

    const countrySelect = screen.getAllByTestId( "filter-select" )[0];
    const scopeSelect = screen.getAllByTestId( "filter-select" )[1];
    const subjectSelect = screen.getAllByTestId( "filter-select" )[2];
    const sportsOption = subjectSelect.childNodes[3] as HTMLElement;
    const mexicoOption = countrySelect.childNodes[2] as HTMLElement;
    const localOption = scopeSelect.childNodes[2] as HTMLElement;
    await userEvent.selectOptions( subjectSelect, sportsOption );
    await userEvent.selectOptions( countrySelect, mexicoOption );
    await userEvent.selectOptions( scopeSelect, localOption );

    const cards = document.querySelectorAll( '.dxCard' );
    const empty = document.querySelectorAll( '.dxEmtpyState' );
    expect( cards ).toHaveLength( 0 );
    expect( empty ).not.toBeNull();
} );
