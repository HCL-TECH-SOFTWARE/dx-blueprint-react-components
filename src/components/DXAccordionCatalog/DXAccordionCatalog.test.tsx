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
import DXAccordionCatalog, { AccordionCatalogProps } from "./DXAccordionCatalog";
import { itemsArgs } from "./DXAccordionCatalog.stories";

test( "If hideFilters is true, then the dxTaxonomyFilter element will be null", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 16
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select",
        hideFilters: true,
    };
    const { container } = render( <DXAccordionCatalog {...props} /> );
    const taxonomy = container.querySelector( ".dxTaxonomyFilter" );
    expect( taxonomy ).toBeNull();
} );

test( "if totalItems is missing, then it should render a message 'Invalid or missing props for taxonomy filter'", () => {
    let props = {
        items: itemsArgs,
        categories: ["subject"],
        filterType: "select",
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 16
        }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXAccordionCatalog {...props} /> );
    expect( getByText( "Invalid or missing props for taxonomy filter" ) ).toBeInTheDocument();
} );

test( "if filterType is missing, then it should render a message 'Invalid or missing props for taxonomy filter'", () => {
    let props = {
        items: itemsArgs,
        categories: ["subject"],
        totalItems: itemsArgs.length,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 16
        }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXAccordionCatalog {...props} /> );
    expect( getByText( "Invalid or missing props for taxonomy filter" ) ).toBeInTheDocument();
} );

test( "if categories is missing, then it should render a message 'Invalid or missing props for taxonomy filter'", () => {
    let props = {
        items: itemsArgs,
        filterType: "select",
        totalItems: itemsArgs.length,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 16
        }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXAccordionCatalog {...props} /> );
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
        categories: ["subject"],
        filterType: "select"
    };
    const { container } = render( <DXAccordionCatalog {...props} /> );
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
        categories: ["subject"],
        filterType: "select"
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXAccordionCatalog {...props} /> );
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
        categories: ["subject"],
        filterType: "select"
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXAccordionCatalog {...props} /> );
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
        categories: ["subject"],
        filterType: "select"
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXAccordionCatalog {...props} /> );
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
        categories: ["subject"],
        filterType: "select"
    };
    const { getByTestId } = render( <DXAccordionCatalog {...props} /> );
    const pagination = getByTestId( "pagination" );
    expect( pagination ).toBeInTheDocument();
} );

test( "If a number of the pagination is clicked, the active page element should not be null", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 8
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container } = render( <DXAccordionCatalog {...catalogProps} /> );
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
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 8
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container } = render( <DXAccordionCatalog {...catalogProps} /> );
    // Click on the number 2
    const buttonToClicked = container.querySelector( ".pagination.pagination-root" )?.childNodes[2].childNodes[0] as HTMLElement;
    await userEvent.click( buttonToClicked );
    const activeNumber = container.querySelector( ".page-item.active" );
    expect( activeNumber?.childNodes[0].textContent ).toEqual( "2" );
} );

test( "If the right amount of questions are rendered", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 8
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container } = render( <DXAccordionCatalog {...catalogProps} /> );
    const questions = container.querySelectorAll( ".dxAccordion" );
    expect( questions ).toHaveLength( catalogProps.paginationProps.activeSet );
} );

test( "If a pagination set of 5 cards is selected, it should change the amount of questions rendered", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 8
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container } = render( <DXAccordionCatalog {...catalogProps} /> );
    await act( async ()=>  {
        const paginationSet = container.querySelector( ".pagination-items-per-page" ) as HTMLElement;
        await userEvent.click( paginationSet );
        let newOption: HTMLAnchorElement | undefined;
        document.querySelectorAll<HTMLAnchorElement>( "a.dropdown-item" ).forEach( element => {
            if ( element.textContent?.trim() === '16' ) {
                newOption = element;
            }
        } );
        await userEvent.click( newOption! );
    });
    const questions = container.querySelectorAll( ".dxAccordion" );
    expect( questions ).toHaveLength( 16 );
} );

test( "if the subject filter with value 'Hardware' is active it should render just 5 questions", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 8
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container, getAllByTestId } = render( <DXAccordionCatalog {...catalogProps} /> );
    const select = getAllByTestId( "filter-select" )[0];
    const hardwareOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[1] as HTMLElement;
    await userEvent.selectOptions( select, hardwareOption );
    const questions = container.querySelectorAll( '.dxAccordion' );
    expect( questions ).toHaveLength( 5 );
} );

test( "if the subject filter with value 'hardware' is active and then remove it, it should render 8 questions", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 8
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container } = render( <DXAccordionCatalog {...catalogProps} /> );
    const hardwareOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[1] as HTMLElement;
    await userEvent.click( hardwareOption );
    const removeIcon = document.querySelector( '[data-testid="tags"]' )?.childNodes[0].childNodes[1] as HTMLElement;
    await userEvent.click( removeIcon );
    const questions = container.querySelectorAll( '.dxAccordion' );
    expect( questions ).toHaveLength( catalogProps.paginationProps.activeSet );
} );

test( "if the user enter a filter 'label 13' then 1 question should be rendered", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 8
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container } = render( <DXAccordionCatalog {...catalogProps} /> );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "label 13" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13,
    } );

    const questions = container.querySelectorAll( '.dxAccordion' );
    expect( questions ).toHaveLength( 1 );
} );

test( "If the user enter a filter 'label 13' and then remove it, 8 questions should be rendered", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 8
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container } = render( <DXAccordionCatalog {...catalogProps} /> );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "label 13" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13
    } );

    const removeIcon = document.querySelector( '[data-testid="tags"]' )?.childNodes[0].childNodes[1] as HTMLElement;
    await userEvent.click( removeIcon );
    const questions = container.querySelectorAll( '.dxAccordion' );
    expect( questions ).toHaveLength( catalogProps.paginationProps.activeSet );
} );

test( "If the user select the filter 'Hardware' and enter a filter 'label 13' there should be no questions", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 8
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container, getAllByTestId } = render( <DXAccordionCatalog {...catalogProps} /> );
    const select = getAllByTestId( "filter-select" )[0];
    const hardwareOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[1] as HTMLElement;
    await userEvent.selectOptions( select, hardwareOption );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "label 13" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13
    } );

    const questions = container.querySelectorAll( '.dxAccordion' );
    expect( questions ).toHaveLength( 0 );
} );

test( "If the filters 'label 13' and 'Hardware' are active and the user removes the 'label 13' one, it should render 5 questions", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 8
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container, getAllByTestId } = render( <DXAccordionCatalog {...catalogProps} /> );
    const select = getAllByTestId( "filter-select" )[0];
    const hardwareOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[1] as HTMLElement;
    await userEvent.selectOptions( select, hardwareOption );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "label 13" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13
    } );
    const removeIcon = document.querySelector( '[data-testid="tags"]' )?.childNodes[1].childNodes[1] as HTMLElement;
    await userEvent.click( removeIcon );
    const questions = container.querySelectorAll( '.dxAccordion' );
    expect( questions ).toHaveLength( 5 );
} );

test( "If the filters 'label 13' and 'Hardware' are active and the user removes the all the filters, it should render 8 questions", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 8
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container, getAllByTestId } = render( <DXAccordionCatalog {...catalogProps} /> );
    const select = getAllByTestId( "filter-select" )[0];
    const hardwareOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[1] as HTMLElement;
    await userEvent.selectOptions( select, hardwareOption );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "label 13" );
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
    const questions = container.querySelectorAll( '.dxAccordion' );
    expect( questions ).toHaveLength( 8 );
} );

// Tests for the opening on render behavior
test( "If the user does not pass an activeIndex, the first accordion should have the class 'dxAccordion--display-enabled'", () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 8
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container, getAllByTestId } = render( <DXAccordionCatalog {...catalogProps} /> );
    let firstAccordion = container.querySelectorAll( ".dxAccordion" )[0];
    expect( firstAccordion ).toHaveClass( "dxAccordion--display-enabled" );
} );

test( "If the user does pass an activeIndex of 0, any accordion should have the class 'dxAccordion--display-enabled'", () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 8
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select",
        activeIndex: -1
    };
    const { container, getAllByTestId } = render( <DXAccordionCatalog {...catalogProps} /> );
    let accordions = container.querySelectorAll( ".dxAccordion .dxAccordion__content" );
    let flag = 0;
    accordions.forEach( acc => {
        if ( !acc.classList.contains( "dxAccordion--display-enabled" ) ) {
            flag++;
        }
    } );
    expect( flag ).toBe( catalogProps.paginationProps.activeSet );
} );

test( "If the user does pass an activeIndex of 1, the second accordion should have the class 'dxAccordion--display-enabled'", () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 8
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select",
        activeIndex: 1
    };
    const { container, getAllByTestId } = render( <DXAccordionCatalog {...catalogProps} /> );
    let secondAccordion = container.querySelectorAll( ".dxAccordion" )[catalogProps.activeIndex];
    expect( secondAccordion ).toHaveClass( "dxAccordion--display-enabled" );
} );

test( "If the user clicks on the second accordion just that one will have the class of 'dxAccordion--display-enabled'", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 8
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container, getAllByTestId } = render( <DXAccordionCatalog {...catalogProps} /> );
    let secondAccordion = getAllByTestId( "accordion-button" )[1];
    await userEvent.click( secondAccordion );
    let accordions = container.querySelectorAll( ".dxAccordion--display-enabled" );
    expect( accordions.length ).toBe( 1 );
} );

test( "If the user clicks twice on the second accordion none of the components will have the class of 'dxAccordion--display-enabled'", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["8", "10", "16"],
            active: 1,
            activeSet: 8
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container, getAllByTestId } = render( <DXAccordionCatalog {...catalogProps} /> );
    let secondAccordion = getAllByTestId( "accordion-button" )[1];
    await userEvent.click( secondAccordion );
    await userEvent.click( secondAccordion );
    let accordions = container.querySelectorAll( ".dxAccordion--display-enabled" );
    expect( accordions.length ).toBe( 0 );
} );


test("should exclude empty or whitespace-only values from filter dropdown", () => {
    const testItems: AccordionCatalogProps["items"] = [
      {
        data: { keyword: "Test 1", subject: "" },
        accordion: {
          label: "Label 1",
          body: "Test body 1"
        }
      },
      {
        data: { keyword: "Test 2", subject: "  " },
        accordion: {
          label: "Label 2",
          body: "Test body 2"
        }
      },
      {
        data: { keyword: "Test 3", subject: "Site Use" },
        accordion: {
          label: "Label 3",
          body: "Test body 3"
        }
      },
      {
        data: { keyword: "Test 4", subject: "Hardware" },
        accordion: {
            label: "Label 4",
            body: "Test body 4"        },
      },
      {
        data: { keyword: "Test 5", subject: "Networking" },
        accordion: {
            label: "Label 5",
            body: "Test body 5"        
        },
      },
    ];
  
    const catalogProps: AccordionCatalogProps = {
      items: testItems,
      totalItems: testItems.length,
      categories: ["subject"],
      filterType: "select",
      paginationProps: {
        sets: ["4", "8", "16"],
        active: 1,
        activeSet: 8
      }
    };
  
    const { container, getByText } = render(<DXAccordionCatalog {...catalogProps} />);
    const selectElements = container.querySelectorAll('select[data-testid="filter-select"]');
  
    selectElements.forEach(select => {
      const options = select.querySelectorAll("option");
      expect(options).not.toContain('');
    });
  
    expect(getByText(/hardware/i)).toBeInTheDocument();
    expect(getByText(/networking/i)).toBeInTheDocument();
    expect(getByText(/site use/i)).toBeInTheDocument();
  });
  