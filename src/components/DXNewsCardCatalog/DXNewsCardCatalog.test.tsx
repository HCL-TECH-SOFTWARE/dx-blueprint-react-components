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
import { render, fireEvent, screen, act } from "@testing-library/react";
import DXNewsCardCatalog from "./DXNewsCardCatalog";
import { itemsArgs } from "./DXNewsCardCatalog.stories";

// Tests for elementsPerRow
test( "if the user does not pass elementsPerRow, the card should have the class col-lg-12", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "4", "8"],
            active: 1,
            activeSet: 4
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select",
    };
    const { container } = render( <DXNewsCardCatalog {...props} /> );
    let card = container.querySelector( ".dxNewsCardCatalog__item" );
    expect( card ).toHaveClass( "col-lg-12" );
} );

test( "if the user passes elementsPerRow as 0, the card should have the class col-lg-12", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "4", "8"],
            active: 1,
            activeSet: 4
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select",
        elementsPerRow: 0,
    };
    const { container } = render( <DXNewsCardCatalog {...props} /> );
    let card = container.querySelector( ".dxNewsCardCatalog__item" );
    expect( card ).toHaveClass( "col-lg-12" );
} );

test( "if the user passes elementsPerRow as 1, the card should have the class col-lg-12", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "4", "8"],
            active: 1,
            activeSet: 4
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select",
        elementsPerRow: 1,
    };
    const { container } = render( <DXNewsCardCatalog {...props} /> );
    let card = container.querySelector( ".dxNewsCardCatalog__item" );
    expect( card ).toHaveClass( "col-lg-12" );
} );

test( "if the user passes elementsPerRow as 2, the card should have the class col-lg-6", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "4", "8"],
            active: 1,
            activeSet: 4
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select",
        elementsPerRow: 2,
    };
    const { container } = render( <DXNewsCardCatalog {...props} /> );
    let card = container.querySelector( ".dxNewsCardCatalog__item" );
    expect( card ).toHaveClass( "col-lg-6" );
} );

test( "if the user passes elementsPerRow as 3, the card should have the class col-lg-4", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "4", "8"],
            active: 1,
            activeSet: 4
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select",
        elementsPerRow: 3,
    };
    const { container } = render( <DXNewsCardCatalog {...props} /> );
    let card = container.querySelector( ".dxNewsCardCatalog__item" );
    expect( card ).toHaveClass( "col-lg-4" );
} );

test( "if the user passes elementsPerRow as 4, the card should have the class col-lg-3", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "4", "8"],
            active: 1,
            activeSet: 4
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select",
        elementsPerRow: 4,
    };
    const { container } = render( <DXNewsCardCatalog {...props} /> );
    let card = container.querySelector( ".dxNewsCardCatalog__item" );
    expect( card ).toHaveClass( "col-lg-3" );
} );

test( "If hideFilters is true, then the dxTaxonomyFilter element will be null", () => {
    let catalogProps = {
        items: itemsArgs,
        totalItems: itemsArgs.length,
        categories: ["subject", "country", "scope"],
        filterType: "select",
        paginationProps: {
            sets: ["3", "6", "9"],
            active: 1,
            activeSet: 3
        },
        hideFilters: true
    };
    const { container } = render( <DXNewsCardCatalog {...catalogProps} /> );
    const taxonomy = container.querySelector( ".dxTaxonomyFilter" );
    expect( taxonomy ).toBeNull();
} );

test( "if totalItems is missing, then it should render a message 'Invalid or missing props for taxonomy filter'", () => {
    let catalogProps = {
        items: itemsArgs,
        filterType: "select",
        paginationProps: {
            sets: ["2", "5", "10"],
            active: 1,
            activeSet: 2,
        }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXNewsCardCatalog {...catalogProps} /> );
    expect( getByText( "Invalid or missing props for taxonomy filter" ) ).toBeInTheDocument();
} );

test( "if filterType is missing, then it should render a message 'Invalid or missing props for taxonomy filter'", () => {
    let catalogProps = {
        items: itemsArgs,
        totalItems: itemsArgs.length,
        paginationProps: {
            sets: ["2", "5", "10"],
            active: 1,
            activeSet: 2,
        }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXNewsCardCatalog {...catalogProps} /> );
    expect( getByText( "Invalid or missing props for taxonomy filter" ) ).toBeInTheDocument();
} );

test( "if totalItems and filterType are passed, then it should render the TaxonomyFilter", () => {
    let catalogProps = {
        items: itemsArgs,
        totalItems: itemsArgs.length,
        filterType: "select",
        paginationProps: {
            sets: ["2", "5", "10"],
            active: 1,
            activeSet: 2,
        }
    };
    const { getByTestId } = render( <DXNewsCardCatalog {...catalogProps} /> );
    expect( getByTestId( "taxonomy-filter-component" ) ).toBeInTheDocument();
} );

test( "if sets on paginationProps is undefined a message 'Invalid or missing props for pagination' will show", () => {
    let catalogProps = {
        items: itemsArgs,
        totalItems: itemsArgs.length,
        filterType: "select",
        paginationProps: {
            active: 1,
            activeSet: 2,
        }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXNewsCardCatalog {...catalogProps} /> );
    expect( getByText( "Invalid or missing props for pagination" ) ).toBeInTheDocument();
} );

test( "if active on paginationProps is undefined a message 'Invalid or missing props for pagination' will show", () => {
    let catalogProps = {
        items: itemsArgs,
        totalItems: itemsArgs.length,
        filterType: "select",
        paginationProps: {
            sets: ["2", "5", "10"],
            activeSet: 2,
        }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXNewsCardCatalog {...catalogProps} /> );
    expect( getByText( "Invalid or missing props for pagination" ) ).toBeInTheDocument();
} );

test( "if activeSet on paginationProps is undefined a message 'Invalid or missing props for pagination' will show", () => {
    let catalogProps = {
        items: itemsArgs,
        totalItems: itemsArgs.length,
        filterType: "select",
        paginationProps: {
            sets: ["2", "5", "10"],
            active: 1,
        }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXNewsCardCatalog {...catalogProps} /> );
    expect( getByText( "Invalid or missing props for pagination" ) ).toBeInTheDocument();
} );

test( "if a valid paginationProps is passed, then it should render it", () => {
    let catalogProps = {
        items: itemsArgs,
        totalItems: itemsArgs.length,
        filterType: "select",
        paginationProps: {
            sets: ["2", "5", "10"],
            active: 1,
            activeSet: 2
        }
    };
    const { getByTestId } = render( <DXNewsCardCatalog {...catalogProps} /> );
    expect( getByTestId( "pagination" ) ).toBeInTheDocument();
} );

test( "If a number of the pagination is clicked, the active page element should not be null", async () => {
    let catalogProps = {
        items: itemsArgs,
        totalItems: itemsArgs.length,
        filterType: "select",
        paginationProps: {
            sets: ["3", "6", "9"],
            active: 1,
            activeSet: 3
        }
    };
    const { container } = render( <DXNewsCardCatalog {...catalogProps} /> );
    // Click on the number 6
    const buttonToClicked = container.querySelector( ".pagination.pagination-root" )?.childNodes[3].childNodes[0] as HTMLElement;
    await userEvent.click( buttonToClicked );
    const activeNumber = container.querySelector( ".page-item.active" );
    expect( activeNumber ).not.toBeNull();
} );

test( "If a number of the pagination is clicked, the active page should be 2", async () => {
    let catalogProps = {
        items: itemsArgs,
        totalItems: itemsArgs.length,
        filterType: "select",
        paginationProps: {
            sets: ["3", "6", "9"],
            active: 1,
            activeSet: 3
        }
    };
    const { container } = render( <DXNewsCardCatalog {...catalogProps} /> );
    // Click on the number 3
    const buttonToClicked = container.querySelector( ".pagination.pagination-root" )?.childNodes[2].childNodes[0] as HTMLElement;
    await userEvent.click( buttonToClicked );
    const activeNumber = container.querySelector( ".page-item.active" );
    expect( activeNumber?.childNodes[0].textContent ).toEqual( "2" );
} );

test( "if the right amount of cards are rendering", () => {
    let catalogProps = {
        items: itemsArgs,
        totalItems: itemsArgs.length,
        filterType: "select",
        paginationProps: {
            sets: ["3", "6", "9"],
            active: 1,
            activeSet: 3
        }
    };
    const { container } = render( <DXNewsCardCatalog {...catalogProps} /> );
    const cards = container.querySelectorAll( ".dxNewsCard" );
    expect( cards ).toHaveLength( catalogProps.paginationProps.activeSet );
} );

test( "If a pagination set of 6 cards is selected, it should change the amount of cards rendered", async () => {
    let catalogProps = {
        items: itemsArgs,
        totalItems: itemsArgs.length,
        categories: ["subject", "country", "scope"],
        filterType: "select",
        paginationProps: {
            sets: ["3", "6", "9"],
            active: 1,
            activeSet: 3
        }
    };
    const { container } = render( <DXNewsCardCatalog {...catalogProps} /> );
    await act( async ()=>  {
        const paginationSet = container.querySelector( ".pagination-items-per-page" ) as HTMLElement;
        await userEvent.click( paginationSet );
        const newOption = screen.getByText( /6/ );
        await userEvent.click( newOption );
    });
    const cards = container.querySelectorAll( ".dxNewsCard" );
    expect( cards ).toHaveLength( 6 );
} );

test( "if the subject filter with value 'birthday party' is active it should render just 1 card", async () => {
    let catalogProps = {
        items: itemsArgs,
        totalItems: itemsArgs.length,
        categories: ["subject", "country", "scope"],
        filterType: "select",
        paginationProps: {
            sets: ["3", "6", "9"],
            active: 1,
            activeSet: 3
        }
    };
    const { container, getAllByTestId } = render( <DXNewsCardCatalog {...catalogProps} /> );
    const select = getAllByTestId( "filter-select" )[0];
    const birthdayOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[1] as HTMLElement;
    await userEvent.selectOptions( select, birthdayOption );
    const cards = container.querySelectorAll( '.dxNewsCard' );
    expect( cards ).toHaveLength( 1 );
} );

test( "if the subject filter with value 'birthday party' is active and then remove it, it should render 6 cards", async () => {
    let catalogProps = {
        items: itemsArgs,
        totalItems: itemsArgs.length,
        categories: ["subject", "country", "scope"],
        filterType: "select",
        paginationProps: {
            sets: ["3", "6", "9"],
            active: 1,
            activeSet: 6
        }
    };
    const { container } = render( <DXNewsCardCatalog {...catalogProps} /> );
    const birthdayOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[1] as HTMLElement;
    await userEvent.click( birthdayOption );
    const removeIcon = document.querySelector( '[data-testid="tags"]' )?.childNodes[0].childNodes[1] as HTMLElement;
    await userEvent.click( removeIcon );
    const cards = container.querySelectorAll( '.dxNewsCard' );
    expect( cards ).toHaveLength( catalogProps.paginationProps.activeSet );
} );

test( "if the user enter a filter 'press' then 5 cards should be rendered", async () => {
    let catalogProps = {
        items: itemsArgs,
        totalItems: itemsArgs.length,
        filterType: "select",
        paginationProps: {
            sets: ["3", "6", "9"],
            active: 1,
            activeSet: 9
        }
    };
    const { container } = render( <DXNewsCardCatalog {...catalogProps} /> );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "press" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13,
    } );

    const cards = container.querySelectorAll( '.dxNewsCard' );
    expect( cards ).toHaveLength( 5 );
} );

test( "If the user enter a filter 'press' and then remove it, 9 cards should be rendered", async () => {
    let catalogProps = {
        items: itemsArgs,
        totalItems: itemsArgs.length,
        filterType: "select",
        paginationProps: {
            sets: ["3", "6", "9"],
            active: 1,
            activeSet: 9
        }
    };
    const { container } = render( <DXNewsCardCatalog {...catalogProps} /> );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "press" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13
    } );

    const removeIcon = document.querySelector( '[data-testid="tags"]' )?.childNodes[0].childNodes[1] as HTMLElement;
    await userEvent.click( removeIcon );
    const cards = container.querySelectorAll( '.dxNewsCard' );
    expect( cards ).toHaveLength( catalogProps.paginationProps.activeSet );
} );

test( "If the user selects the Social Event filter, then 2024 year there should be no cards", async () => {
    let catalogProps = {
        items: itemsArgs,
        totalItems: itemsArgs.length,
        filterType: "select",
        paginationProps: {
            sets: ["3", "6", "9"],
            active: 1,
            activeSet: 9
        }
    };
    const { container, getAllByTestId } = render( <DXNewsCardCatalog {...catalogProps} /> );
    const selectCategory = getAllByTestId( "filter-select" )[0];
    const selectYear = getAllByTestId( "filter-select" )[1];
    const socialOption = selectCategory.childNodes[3] as HTMLElement;
    const yearOption = selectYear.childNodes[2] as HTMLElement;

    await userEvent.selectOptions( selectCategory, socialOption );
    await userEvent.selectOptions( selectYear, yearOption );
    const cards = container.querySelectorAll( ".dxNewsCard" );
    expect( cards ).toHaveLength( 0 );
} );

test( "If the Social event and 2024 filters are selected and the user removes the 2024 one, there has to be just 1 card", async () => {
    let catalogProps = {
        items: itemsArgs,
        totalItems: itemsArgs.length,
        filterType: "select",
        paginationProps: {
            sets: ["3", "6", "9"],
            active: 1,
            activeSet: 9
        }
    };
    const { container, getAllByTestId, getByTestId } = render( <DXNewsCardCatalog {...catalogProps} /> );
    const selectCategory = getAllByTestId( "filter-select" )[0];
    const selectYear = getAllByTestId( "filter-select" )[1];
    const socialOption = selectCategory.childNodes[3] as HTMLElement;
    const yearOption = selectYear.childNodes[2] as HTMLElement;

    await userEvent.selectOptions( selectCategory, socialOption );
    await userEvent.selectOptions( selectYear, yearOption );
    const yearFilter = getByTestId( "tags" ).childNodes[1].childNodes[1] as HTMLElement;
    await userEvent.click( yearFilter );
    const cards = container.querySelectorAll( '.dxNewsCard' );
    expect( cards ).toHaveLength( 1 );
} );

test( "If the Social event and 2024 filters are selected are selected and the user removes all of them, there has to be 9 cards", async () => {
    let catalogProps = {
        items: itemsArgs,
        totalItems: itemsArgs.length,
        filterType: "select",
        paginationProps: {
            sets: ["3", "6", "9"],
            active: 1,
            activeSet: 9
        }
    };
    const { container, getAllByTestId, getByTestId } = render( <DXNewsCardCatalog {...catalogProps} /> );
    const selectCategory = getAllByTestId( "filter-select" )[0];
    const selectYear = getAllByTestId( "filter-select" )[1];
    const socialOption = selectCategory.childNodes[3] as HTMLElement;
    const yearOption = selectYear.childNodes[2] as HTMLElement;

    await userEvent.selectOptions( selectCategory, socialOption );
    await userEvent.selectOptions( selectYear, yearOption );

    const yearFilter = getByTestId( "tags" ).childNodes[1].childNodes[1] as HTMLElement;
    const categoryFilter = getByTestId( "tags" ).childNodes[0].childNodes[1] as HTMLElement;
    await userEvent.click( yearFilter );
    await userEvent.click( categoryFilter );
    const cards = container.querySelectorAll( '.dxNewsCard' );
    expect( cards ).toHaveLength( 9 );
} );


test('should exclude empty or whitespace-only values from filter dropdowns in NewsCardCatalog', async () => {
    const testItems = [
      ...itemsArgs,
      {
        ...itemsArgs[0],
        contentType: "", 
      },
      {
        ...itemsArgs[1],
        contentType: "   ", 
      }
    ];
  
    const props = {
      items: testItems,
      totalItems: testItems.length,
      categories: ["contentType"], 
      filterType: "select",
      paginationProps: {
        sets: ["3", "6", "9"],
        active: 1,
        activeSet: 6
      }
    };
    
  const { container, getByText } = render(<DXNewsCardCatalog {...props} />);
  const selectElements = container.querySelectorAll('select[data-testid="filter-select"]');

  selectElements.forEach(select => {
    const options = select.querySelectorAll("option");
    expect(options).not.toContain('');
  });
});