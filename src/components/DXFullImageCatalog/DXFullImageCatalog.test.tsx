import React from "react";
import '@testing-library/jest-dom';
import { render, fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXFullImageCatalog from "./DXFullImageCatalog";
import { itemsArgs } from "./DXFullImageCatalog.stories";

// Tests for elementsPerRow
test( "if the user does not pass elementsPerRow, the card should have the class col-lg-3", () => {
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
    const { container } = render( <DXFullImageCatalog {...props} /> );
    let card = container.querySelector( ".dxFullImageCatalog__item" );
    expect( card ).toHaveClass( "col-lg-3" );
} );

test( "if the user passes elementsPerRow as 0, the card should have the class col-lg-3", () => {
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
    const { container } = render( <DXFullImageCatalog {...props} /> );
    let card = container.querySelector( ".dxFullImageCatalog__item" );
    expect( card ).toHaveClass( "col-lg-3" );
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
    const { container } = render( <DXFullImageCatalog {...props} /> );
    let card = container.querySelector( ".dxFullImageCatalog__item" );
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
    const { container } = render( <DXFullImageCatalog {...props} /> );
    let card = container.querySelector( ".dxFullImageCatalog__item" );
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
    const { container } = render( <DXFullImageCatalog {...props} /> );
    let card = container.querySelector( ".dxFullImageCatalog__item" );
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
    const { container } = render( <DXFullImageCatalog {...props} /> );
    let card = container.querySelector( ".dxFullImageCatalog__item" );
    expect( card ).toHaveClass( "col-lg-3" );
} );

test( "If hideFilters is true, then the dxTaxonomyFilter element will be null", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "3", "6"],
            active: 1,
            activeSet: 3
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select",
        hideFilters: true,
    };
    const { container } = render( <DXFullImageCatalog {...props} /> );
    const taxonomy = container.querySelector( ".dxTaxonomyFilter" );
    expect( taxonomy ).toBeNull();
} );

test( "if totalItems is missing, then it should render a message 'Invalid or missing props for taxonomy filter'", () => {
    let props = {
        items: itemsArgs,
        categories: ["subject"],
        filterType: "select",
        paginationProps: {
            sets: ["2", "3", "6"],
            active: 1,
            activeSet: 3
        },
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXFullImageCatalog {...props} /> );
    expect( getByText( "Invalid or missing props for taxonomy filter" ) ).toBeInTheDocument();
} );

test( "if filterType is missing, then it should render a message 'Invalid or missing props for taxonomy filter'", () => {
    let props = {
        items: itemsArgs,
        categories: ["subject"],
        totalItems: itemsArgs.length,
        paginationProps: {
            sets: ["2", "3", "6"],
            active: 1,
            activeSet: 3
        },
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXFullImageCatalog {...props} /> );
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
    const { getByText } = render( <DXFullImageCatalog {...props} /> );
    expect( getByText( "Invalid or missing props for taxonomy filter" ) ).toBeInTheDocument();
} );

test( "if categories, totalItems and filterType are passed, then the 'dxTaxonomyFilter will be in the document'", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "3", "6"],
            active: 1,
            activeSet: 3
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container } = render( <DXFullImageCatalog {...props} /> );
    const taxonomy = container.querySelector( ".dxTaxonomyFilter" );
    expect( taxonomy ).toBeInTheDocument();
} );

test( "If sets on paginationProps is undefined, a message 'Invalid or missing props for pagination' will show", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            active: 1,
            activeSet: 3
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXFullImageCatalog {...props} /> );
    expect( getByText( "Invalid or missing props for pagination" ) ).toBeInTheDocument();
} );

test( "If active on paginationProps is undefined, a message 'Invalid or missing props for pagination' will show", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "3", "6"],
            activeSet: 3
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXFullImageCatalog {...props} /> );
    expect( getByText( "Invalid or missing props for pagination" ) ).toBeInTheDocument();
} );

test( "If activeSet on paginationProps is undefined, a message 'Invalid or missing props for pagination' will show", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "3", "6"],
            active: 1,
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXFullImageCatalog {...props} /> );
    expect( getByText( "Invalid or missing props for pagination" ) ).toBeInTheDocument();
} );

test( "if a valid paginationProps is passed, then it should render it", () => {
    let props = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "3", "6"],
            active: 1,
            activeSet: 3
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { getByTestId } = render( <DXFullImageCatalog {...props} /> );
    const pagination = getByTestId( "pagination" );
    expect( pagination ).toBeInTheDocument();
} );

test( "If a number of the pagination is clicked, the active page element should not be null", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "3", "6"],
            active: 1,
            activeSet: 3
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container } = render( <DXFullImageCatalog {...catalogProps} /> );
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
            sets: ["2", "3", "6"],
            active: 1,
            activeSet: 3
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container } = render( <DXFullImageCatalog {...catalogProps} /> );
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
            sets: ["2", "3", "6"],
            active: 1,
            activeSet: 3
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container } = render( <DXFullImageCatalog {...catalogProps} /> );
    const questions = container.querySelectorAll( ".dxFullImageCard" );
    expect( questions ).toHaveLength( catalogProps.paginationProps.activeSet );
} );

test( "If a pagination set of 6 cards is selected, it should change the amount of questions rendered", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "3", "6"],
            active: 1,
            activeSet: 3
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container } = render( <DXFullImageCatalog {...catalogProps} /> );
    await act( async ()=>  {
        const paginationSet = container.querySelector( ".pagination-items-per-page" ) as HTMLElement;
        await userEvent.click( paginationSet );
        const newOption = screen.getAllByText( /6/ )[0];
        await userEvent.click( newOption );
    });
    const questions = container.querySelectorAll( ".dxFullImageCard" );
    expect( questions ).toHaveLength( 6 );
} );

test( "if the subject filter with value 'Math' is active it should render just 4 cards", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "3", "6"],
            active: 1,
            activeSet: 6
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container, getAllByTestId } = render( <DXFullImageCatalog {...catalogProps} /> );
    const select = getAllByTestId( "filter-select" )[0];
    const mathOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[2] as HTMLElement;
    await userEvent.selectOptions( select, mathOption );
    const cards = container.querySelectorAll( '.dxFullImageCard' );
    expect( cards ).toHaveLength( 4 );
} );

test( "if the subject filter with value 'Math' is active and then remove it, it should render 6 questions", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "3", "6"],
            active: 1,
            activeSet: 6
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container } = render( <DXFullImageCatalog {...catalogProps} /> );
    const mathOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[1] as HTMLElement;
    await userEvent.click( mathOption );
    const removeIcon = document.querySelector( '[data-testid="tags"]' )?.childNodes[0].childNodes[1] as HTMLElement;
    await userEvent.click( removeIcon );
    const cards = container.querySelectorAll( '.dxFullImageCard' );
    expect( cards ).toHaveLength( catalogProps.paginationProps.activeSet );
} );

test( "if the user enter a filter 'square' then 1 card should be rendered", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "3", "6"],
            active: 1,
            activeSet: 6
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container } = render( <DXFullImageCatalog {...catalogProps} /> );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "square" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13,
    } );

    const questions = container.querySelectorAll( '.dxFullImageCard' );
    expect( questions ).toHaveLength( 1 );
} );

test( "If the user enter a filter 'square' and then remove it, 6 questions should be rendered", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "3", "6"],
            active: 1,
            activeSet: 6
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container } = render( <DXFullImageCatalog {...catalogProps} /> );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "Card 12" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13
    } );

    const removeIcon = document.querySelector( '[data-testid="tags"]' )?.childNodes[0].childNodes[1] as HTMLElement;
    await userEvent.click( removeIcon );
    const questions = container.querySelectorAll( '.dxFullImageCard' );
    expect( questions ).toHaveLength( catalogProps.paginationProps.activeSet );
} );

test( "If the user select the filter 'Math' and enter a filter 'Equal' there should be no cards", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "3", "6"],
            active: 1,
            activeSet: 6
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container, getAllByTestId } = render( <DXFullImageCatalog {...catalogProps} /> );
    const select = getAllByTestId( "filter-select" )[0];
    const mathOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[2] as HTMLElement;
    await userEvent.selectOptions( select, mathOption );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "Equal" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13
    } );

    const questions = container.querySelectorAll( '.dxFullImageCard' );
    expect( questions ).toHaveLength( 0 );
} );

test( "If the filters 'square' and 'Math' are active and the user removes the 'Card 12' one, it should render 4 cards", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "3", "6"],
            active: 1,
            activeSet: 6
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container, getAllByTestId } = render( <DXFullImageCatalog {...catalogProps} /> );
    const select = getAllByTestId( "filter-select" )[0];
    const mathOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[2] as HTMLElement;
    await userEvent.selectOptions( select, mathOption );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "square" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13
    } );
    const removeIcon = document.querySelector( '[data-testid="tags"]' )?.childNodes[1].childNodes[1] as HTMLElement;
    await userEvent.click( removeIcon );
    const questions = container.querySelectorAll( '.dxFullImageCard' );
    expect( questions ).toHaveLength( 4 );
} );

test( "If the filters 'square' and 'Math' are active and the user removes the all the filters, it should render 6 questions", async () => {
    let catalogProps = {
        items: itemsArgs,
        paginationProps: {
            sets: ["2", "3", "6"],
            active: 1,
            activeSet: 6
        },
        totalItems: itemsArgs.length,
        categories: ["subject"],
        filterType: "select"
    };
    const { container, getAllByTestId } = render( <DXFullImageCatalog {...catalogProps} /> );
    const select = getAllByTestId( "filter-select" )[0];
    const mathOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[2] as HTMLElement;
    await userEvent.selectOptions( select, mathOption );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "square" );
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
    const questions = container.querySelectorAll( '.dxFullImageCard' );
    expect( questions ).toHaveLength( catalogProps.paginationProps.activeSet );
} );

test('should exclude empty or whitespace-only values from filter dropdowns', async () => {
    const testItems = [
      ...itemsArgs,
      {
        data: { subject: '' }, 
        card: itemsArgs[0].card
      },
      {
        data: { subject: '  ' }, 
        card: itemsArgs[1].card
      },
    ];
  
    const props = {
      items: testItems,
      paginationProps: {
        sets: ['4', '8', '12'],
        active: 1,
        activeSet: 4,
      },
      totalItems: testItems.length,
      categories: ['subject'],
      filterType: 'select',
    };
  
    const { container } = render(<DXFullImageCatalog {...props} />);
    const select = screen.getByTestId('filter-select');
  
    const optionValues = Array.from(select.querySelectorAll('option'));

    expect(optionValues).not.toContain('');
    expect(optionValues).not.toContain(' ');
  
  });