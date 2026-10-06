import React from "react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { render, fireEvent, screen, act } from "@testing-library/react";
import DXCatalog, { CatalogProps } from "./DXCatalog";
import { itemsArgs } from "./DXCatalog.stories";
import { CardProps } from "../DXCard/DXCard";

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
  const { container } = render( <DXCatalog {...props} /> );
  let card = container.querySelector( ".dxCatalog--layout-grid" );
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
  const { container } = render( <DXCatalog {...props} /> );
  let card = container.querySelector( ".dxCatalog--layout-grid" );
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
  const { container } = render( <DXCatalog {...props} /> );
  let card = container.querySelector( ".dxCatalog--layout-grid" );
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
  const { container } = render( <DXCatalog {...props} /> );
  let card = container.querySelector( ".dxCatalog--layout-grid" );
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
  const { container } = render( <DXCatalog {...props} /> );
  let card = container.querySelector( ".dxCatalog--layout-grid" );
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
  const { container } = render( <DXCatalog {...props} /> );
  let card = container.querySelector( ".dxCatalog--layout-grid" );
  expect( card ).toHaveClass( "col-lg-3" );
} );

test( "if totalItems is missing, then it should render a message 'Invalid or missing props for taxonomy filter'", () => {
  let catalogProps = {
    items: itemsArgs,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "5", "10"],
      active: 1,
      activeSet: 2,
    }
  };
  //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
  const { getByText } = render( <DXCatalog {...catalogProps} /> );
  expect( getByText( "Invalid or missing props for taxonomy filter" ) ).toBeInTheDocument();
} );

test( "if taxonomyProps is missing, then it should render a message 'Invalid or missing props for taxonomy filter'", () => {
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
  const { getByText } = render( <DXCatalog {...catalogProps} /> );
  expect( getByText( "Invalid or missing props for taxonomy filter" ) ).toBeInTheDocument();
} );

test( "if totalItems and taxonomyProps are passed, then it should render the TaxonomyFilter", () => {
  let catalogProps = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "5", "10"],
      active: 1,
      activeSet: 2,
    }
  };
  const { getByTestId } = render( <DXCatalog {...catalogProps} /> );
  expect( getByTestId( "taxonomy-filter-component" ) ).toBeInTheDocument();
} );

test( "if sets on paginationProps is undefined a message 'Invalid or missing props for pagination' will show", () => {
  let catalogProps = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      active: 1,
      activeSet: 2,
    }
  };
  //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
  const { getByText } = render( <DXCatalog {...catalogProps} /> );
  expect( getByText( "Invalid or missing props for pagination" ) ).toBeInTheDocument();
} );

test( "if active on paginationProps is undefined a message 'Invalid or missing props for pagination' will show", () => {
  let catalogProps = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "5", "10"],
      activeSet: 2,
    }
  };
  //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
  const { getByText } = render( <DXCatalog {...catalogProps} /> );
  expect( getByText( "Invalid or missing props for pagination" ) ).toBeInTheDocument();
} );

test( "if activeSet on paginationProps is undefined a message 'Invalid or missing props for pagination' will show", () => {
  let catalogProps = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "5", "10"],
      active: 1,
    }
  };
  //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
  const { getByText } = render( <DXCatalog {...catalogProps} /> );
  expect( getByText( "Invalid or missing props for pagination" ) ).toBeInTheDocument();
} );

test( "if a valid paginationProps is passed, then it should render it", () => {
  let catalogProps = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "5", "10"],
      active: 1,
      activeSet: 2
    }
  };
  const { getByTestId } = render( <DXCatalog {...catalogProps} /> );
  expect( getByTestId( "pagination" ) ).toBeInTheDocument();
} );

test( "If a number of the pagination is clicked, the active page element should not be null", async () => {
  let catalogProps = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "5", "10"],
      active: 1,
      activeSet: 2
    }
  };
  const { container } = render( <DXCatalog {...catalogProps} /> );
  // Click on the number 3
  const buttonToClicked = container.querySelector( ".pagination.pagination-root" )?.childNodes[3].childNodes[0] as HTMLElement;
  await userEvent.click( buttonToClicked );
  const activeNumber = container.querySelector( ".page-item.active" );
  expect( activeNumber ).not.toBeNull();
} );

test( "If a number of the pagination is clicked, the active page should be 3", async () => {
  let catalogProps = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "5", "10"],
      active: 1,
      activeSet: 2
    }
  };
  const { container } = render( <DXCatalog {...catalogProps} /> );
  // Click on the number 3
  const buttonToClicked = container.querySelector( ".pagination.pagination-root" )?.childNodes[3].childNodes[0] as HTMLElement;
  await userEvent.click( buttonToClicked );
  const activeNumber = container.querySelector( ".page-item.active" );
  expect( activeNumber?.childNodes[0].textContent ).toEqual( "3" );
} );

test( "if the right amount of cards are rendering", () => {
  let catalogProps = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "5", "10"],
      active: 1,
      activeSet: 2
    }
  };
  const { container } = render( <DXCatalog {...catalogProps} /> );
  const cards = container.querySelectorAll( ".dxCard" );
  expect( cards ).toHaveLength( catalogProps.paginationProps.activeSet );
} );

test( "If a pagination set of 5 cards is selected, it should change the amount of cards rendered", async () => {
  let catalogProps = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "5", "10"],
      active: 1,
      activeSet: 10
    }
  };
  const { container } = render( <DXCatalog {...catalogProps} /> );
  await act( async () => {
    const paginationSet = container.querySelector( ".pagination-items-per-page" ) as HTMLElement;
    await userEvent.click( paginationSet );
    const newOption = screen.getByText( /5/ );
    await userEvent.click( newOption );
  } );
  const cards = container.querySelectorAll( ".dxCard" );
  expect( cards ).toHaveLength( 5 );
} );

test( "if the subject filter with value 'sports' is active it should render just 3 cards", async () => {
  let catalogProps = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "5", "10"],
      active: 1,
      activeSet: 10
    }
  };
  const { container, getAllByTestId } = render( <DXCatalog {...catalogProps} /> );
  const select = getAllByTestId( "filter-select" )[0];
  const sportsOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[3] as HTMLElement;
  await userEvent.selectOptions( select, sportsOption );
  const cards = container.querySelectorAll( '.dxCard' );
  expect( cards ).toHaveLength( 3 );
} );

test( "if the subject filter with value 'sports' is active and then remove it, it should render 10 cards", async () => {
  let catalogProps = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "5", "10"],
      active: 1,
      activeSet: 10
    }
  };
  const { container } = render( <DXCatalog {...catalogProps} /> );
  const sportsOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[3] as HTMLElement;
  await userEvent.click( sportsOption );
  const removeIcon = document.querySelector( '[data-testid="tags"]' )?.childNodes[0].childNodes[1] as HTMLElement;
  await userEvent.click( removeIcon );
  const cards = container.querySelectorAll( '.dxCard' );
  expect( cards ).toHaveLength( catalogProps.paginationProps.activeSet );
} );

test( "if the user enter a filter 'Movie' then 2 cards should be rendered", async () => {
  let catalogProps = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "5", "10"],
      active: 1,
      activeSet: 10
    }
  };
  const { container } = render( <DXCatalog {...catalogProps} /> );
  const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
  await userEvent.type( textInput, "movie" );
  fireEvent.keyDown( textInput, {
    key: "Escape",
    code: "Escape",
    keyCode: 13,
    charCode: 13,
  } );

  const cards = container.querySelectorAll( '.dxCard' );
  expect( cards ).toHaveLength( 2 );
} );

test( "If the user enter a filter 'Movie' and then remove it, 10 cards should be rendered", async () => {
  let catalogProps = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "5", "10"],
      active: 1,
      activeSet: 10
    }
  };
  const { container } = render( <DXCatalog {...catalogProps} /> );
  const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
  await userEvent.type( textInput, "movie" );
  fireEvent.keyDown( textInput, {
    key: "Escape",
    code: "Escape",
    keyCode: 13,
    charCode: 13
  } );

  const removeIcon = document.querySelector( '[data-testid="tags"]' )?.childNodes[0].childNodes[1] as HTMLElement;
  await userEvent.click( removeIcon );
  const cards = container.querySelectorAll( '.dxCard' );
  expect( cards ).toHaveLength( catalogProps.paginationProps.activeSet );
} );

test( "If the user selects the Sports filter, then the Mexico one and finally the Local option, there should be no cards", async () => {
  let catalogProps = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "5", "10"],
      active: 1,
      activeSet: 10
    }
  };
  const { container, getAllByTestId } = render( <DXCatalog {...catalogProps} /> );
  const selectSubject = getAllByTestId( "filter-select" )[0];
  const selectCountry = getAllByTestId( "filter-select" )[1];
  const selectScope = getAllByTestId( "filter-select" )[2];
  const sportsOption = selectSubject.childNodes[3] as HTMLElement;
  const mexicoOption = selectCountry.childNodes[2] as HTMLElement;
  const localOption = selectScope.childNodes[2] as HTMLElement;
  await userEvent.selectOptions( selectSubject, sportsOption );
  await userEvent.selectOptions( selectCountry, mexicoOption );
  await userEvent.selectOptions( selectScope, localOption );
  const cardsContainer = container.querySelector( ".dxCatalog__cards" )?.childNodes[0].childNodes;
  expect( cardsContainer ).toHaveLength( 0 );
} );

test( "If the Sports, Mexico, and Local filters are selected and the user removes the Local one, there has to be just 1 card", async () => {
  let catalogProps = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "5", "10"],
      active: 1,
      activeSet: 10
    }
  };
  const { container, getAllByTestId, getByTestId } = render( <DXCatalog {...catalogProps} /> );
  const selectSubject = getAllByTestId( "filter-select" )[0];
  const selectCountry = getAllByTestId( "filter-select" )[1];
  const selectScope = getAllByTestId( "filter-select" )[2];
  const sportsOption = selectSubject.childNodes[3] as HTMLElement;
  const mexicoOption = selectCountry.childNodes[2] as HTMLElement;
  const localOption = selectScope.childNodes[2] as HTMLElement;
  await userEvent.selectOptions( selectSubject, sportsOption );
  await userEvent.selectOptions( selectCountry, mexicoOption );
  await userEvent.selectOptions( selectScope, localOption );
  const localFilter = getByTestId( "tags" ).childNodes[2].childNodes[1] as HTMLElement;
  await userEvent.click( localFilter );
  const cards = container.querySelectorAll( '.dxCard' );
  expect( cards ).toHaveLength( 1 );
} );

test( "If the Sports, Mexico, and Local filters are selected and the user removes the Local and the Mexico one, there has to be 3 cards", async () => {
  let catalogProps = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "5", "10"],
      active: 1,
      activeSet: 10
    }
  };
  const { container, getAllByTestId, getByTestId } = render( <DXCatalog {...catalogProps} /> );
  const selectSubject = getAllByTestId( "filter-select" )[0];
  const selectCountry = getAllByTestId( "filter-select" )[1];
  const selectScope = getAllByTestId( "filter-select" )[2];
  const sportsOption = selectSubject.childNodes[3] as HTMLElement;
  const mexicoOption = selectCountry.childNodes[2] as HTMLElement;
  const localOption = selectScope.childNodes[2] as HTMLElement;
  await userEvent.selectOptions( selectSubject, sportsOption );
  await userEvent.selectOptions( selectCountry, mexicoOption );
  await userEvent.selectOptions( selectScope, localOption );
  const localFilter = getByTestId( "tags" ).childNodes[2].childNodes[1] as HTMLElement;
  const mexicoFilter = getByTestId( "tags" ).childNodes[1].childNodes[1] as HTMLElement;
  await userEvent.click( localFilter );
  await userEvent.click( mexicoFilter );
  const cards = container.querySelectorAll( '.dxCard' );
  expect( cards ).toHaveLength( 3 );
} );

test( "If the Sports, Mexico, and Local filters are selected and the user removes all of them, there has to be 10 cards", async () => {
  let catalogProps = {
    items: itemsArgs,
    totalItems: itemsArgs.length,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "5", "10"],
      active: 1,
      activeSet: 10
    }
  };
  const { container, getAllByTestId, getByTestId } = render( <DXCatalog {...catalogProps} /> );
  const selectSubject = getAllByTestId( "filter-select" )[0];
  const selectCountry = getAllByTestId( "filter-select" )[1];
  const selectScope = getAllByTestId( "filter-select" )[2];
  const sportsOption = selectSubject.childNodes[3] as HTMLElement;
  const mexicoOption = selectCountry.childNodes[2] as HTMLElement;
  const localOption = selectScope.childNodes[2] as HTMLElement;
  await userEvent.selectOptions( selectSubject, sportsOption );
  await userEvent.selectOptions( selectCountry, mexicoOption );
  await userEvent.selectOptions( selectScope, localOption );
  const localFilter = getByTestId( "tags" ).childNodes[2].childNodes[1] as HTMLElement;
  const mexicoFilter = getByTestId( "tags" ).childNodes[1].childNodes[1] as HTMLElement;
  const sportsFilter = getByTestId( "tags" ).childNodes[0].childNodes[1] as HTMLElement;
  await userEvent.click( localFilter );
  await userEvent.click( mexicoFilter );
  await userEvent.click( sportsFilter );
  const cards = container.querySelectorAll( '.dxCard' );
  expect( cards ).toHaveLength( 10 );
} );

test( "DXCatalog does not render empty or whitespace-only taxonomy filter values", () => {
  const testItems: CardProps[] = [
    {
      ...itemsArgs[0],
      _taxonomies: {
        subject: ["Sports", "", "  ", "Cinema"],
        country: "Mexico",
        scope: "national",
      },
    },
    {
      ...itemsArgs[1],
      _taxonomies: {
        subject: ["Gossip", " "],
        country: "",
        scope: "local",
      },
    },
    {
      ...itemsArgs[2],
      _taxonomies: {
        subject: "Sports",
        country: "United States",
        scope: "international",
      },
    },
  ];

  const catalogProps = {
    items: testItems,
    totalItems: testItems.length,
    categories: ["subject", "country", "scope"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "4", "8"],
      active: 1,
      activeSet: 4,
    },
  };

  const { container, getByText, queryByText } = render( <DXCatalog {...catalogProps} /> );
  const selectElements = container.querySelectorAll( 'select[data-testid="filter-select"]' );

  selectElements.forEach( ( select ) => {
    const options = select.querySelectorAll( "option" );

    for ( let i = 1; i < options.length; i++ ) {
      const option = options[i];
      expect( option.value.trim() ).not.toBe( "" );
    }
  } );

  expect( getByText( /sports/i ) ).toBeInTheDocument();
  expect( getByText( /cinema/i ) ).toBeInTheDocument();
  expect( getByText( /gossip/i ) ).toBeInTheDocument();

  expect( getByText( /mexico/i ) ).toBeInTheDocument();
  expect( getByText( /united states/i ) ).toBeInTheDocument();

  expect( getByText( /local/i ) ).toBeInTheDocument();
  expect( getByText( /international/i ) ).toBeInTheDocument();
} );

// Additional branch coverage tests
describe( "DXCatalog Branch Coverage Tests", () => {
  test( "renders masonry layout when masonryLayout prop is true", () => {
    const props = {
      items: itemsArgs,
      totalItems: itemsArgs.length,
      categories: ["subject"],
      filterType: "select",
      paginationProps: {
        sets: ["2", "4", "8"],
        active: 1,
        activeSet: 4
      },
      masonryLayout: true
    };

    const { container } = render( <DXCatalog {...props} /> );
    expect( container.querySelector( ".dxCatalog--layout-masonry" ) ).toBeInTheDocument();
    expect( container.querySelector( ".dxCatalog--layout-grid" ) ).not.toBeInTheDocument();
  } );

  test( "renders grid layout when masonryLayout prop is false", () => {
    const props = {
      items: itemsArgs,
      totalItems: itemsArgs.length,
      categories: ["subject"],
      filterType: "select",
      paginationProps: {
        sets: ["2", "4", "8"],
        active: 1,
        activeSet: 4
      },
      masonryLayout: false
    };

    const { container } = render( <DXCatalog {...props} /> );
    expect( container.querySelector( ".dxCatalog--layout-grid" ) ).toBeInTheDocument();
    expect( container.querySelector( ".dxCatalog--layout-masonry" ) ).not.toBeInTheDocument();
  } );

  test( "hides filters when hideFilters prop is true", () => {
    const props = {
      items: itemsArgs,
      totalItems: itemsArgs.length,
      categories: ["subject"],
      filterType: "select",
      paginationProps: {
        sets: ["2", "4", "8"],
        active: 1,
        activeSet: 4
      },
      hideFilters: true
    };

    const { container } = render( <DXCatalog {...props} /> );
    expect( container.querySelector( '[data-testid="taxonomy-filter-component"]' ) ).not.toBeInTheDocument();
  } );

  test( "handles empty categories array in getTaxonomies", () => {
    const props = {
      items: itemsArgs,
      totalItems: itemsArgs.length,
      categories: [],
      filterType: "select",
      paginationProps: {
        sets: ["2", "4", "8"],
        active: 1,
        activeSet: 4
      }
    };

    const { container } = render( <DXCatalog {...props} /> );
    // Should not render taxonomy filter when categories is empty
    expect( container.querySelector( '[data-testid="taxonomy-filter-component"]' ) ).not.toBeInTheDocument();
  } );

  test( "processes items with missing _taxonomies property", () => {
    const itemsWithoutTaxonomies: CardProps[] = [
      { ...itemsArgs[0], _taxonomies: {} as any },
      itemsArgs[1],
      itemsArgs[2]
    ];

    const props = {
      items: itemsWithoutTaxonomies,
      totalItems: itemsWithoutTaxonomies.length,
      categories: ["subject"],
      filterType: "select",
      paginationProps: {
        sets: ["2", "4", "8"],
        active: 1,
        activeSet: 4
      }
    };

    const { container } = render( <DXCatalog {...props} /> );
    expect( container.querySelector( ".dxCatalog" ) ).toBeInTheDocument();
  } );

  test( "processes items with array taxonomy values", () => {
    const itemsWithArrayTaxonomies: CardProps[] = [
      {
        ...itemsArgs[0],
        _taxonomies: {
          subject: ["Sports", "Cinema"],
          country: ["Mexico", "USA"]
        }
      }
    ];

    const props = {
      items: itemsWithArrayTaxonomies,
      totalItems: itemsWithArrayTaxonomies.length,
      categories: ["subject", "country"],
      filterType: "select",
      paginationProps: {
        sets: ["2", "4", "8"],
        active: 1,
        activeSet: 4
      }
    };

    const { container } = render( <DXCatalog {...props} /> );
    expect( container.querySelector( ".dxCatalog" ) ).toBeInTheDocument();
  } );

  test( "handles empty filteredItems in pagination", () => {
    const props = {
      items: [],
      totalItems: 0,
      categories: ["subject"],
      filterType: "select",
      paginationProps: {
        sets: ["2", "4", "8"],
        active: 1,
        activeSet: 4
      }
    };

    const { container } = render( <DXCatalog {...props} /> );
    // Should not render pagination when no filtered items
    expect( container.querySelector( '[data-testid="pagination"]' ) ).not.toBeInTheDocument();
  } );

  test( "handles custom maxCardHeight", () => {
    const props = {
      items: itemsArgs,
      totalItems: itemsArgs.length,
      categories: ["subject"],
      filterType: "select",
      paginationProps: {
        sets: ["2", "4", "8"],
        active: 1,
        activeSet: 4
      },
      maxCardHeight: "500px"
    };

    const { container } = render( <DXCatalog {...props} /> );
    expect( container.querySelector( ".dxCatalog" ) ).toBeInTheDocument();
    expect( document.documentElement.style.getPropertyValue( '--cardMaxHeight' ) ).toBe( "500px" );
  } );

  test( "handles default maxCardHeight when not provided", () => {
    const props = {
      items: itemsArgs,
      totalItems: itemsArgs.length,
      categories: ["subject"],
      filterType: "select",
      paginationProps: {
        sets: ["2", "4", "8"],
        active: 1,
        activeSet: 4
      }
    };

    const { container } = render( <DXCatalog {...props} /> );
    expect( container.querySelector( ".dxCatalog" ) ).toBeInTheDocument();
    expect( document.documentElement.style.getPropertyValue( '--cardMaxHeight' ) ).toBe( "350px" );
  } );

  test( "processes items with string taxonomy values", () => {
    const itemsWithStringTaxonomies: CardProps[] = [
      {
        ...itemsArgs[0],
        _taxonomies: {
          subject: "Sports",
          country: "Mexico"
        }
      }
    ];

    const props = {
      items: itemsWithStringTaxonomies,
      totalItems: itemsWithStringTaxonomies.length,
      categories: ["subject", "country"],
      filterType: "select",
      paginationProps: {
        sets: ["2", "4", "8"],
        active: 1,
        activeSet: 4
      }
    };

    const { container } = render( <DXCatalog {...props} /> );
    expect( container.querySelector( ".dxCatalog" ) ).toBeInTheDocument();
  } );

  test( "handles searchLabel and searchPlaceholder props", () => {
    const props = {
      items: itemsArgs,
      totalItems: itemsArgs.length,
      categories: ["subject"],
      filterType: "select",
      paginationProps: {
        sets: ["2", "4", "8"],
        active: 1,
        activeSet: 4
      },
      searchLabel: "Custom Search Label",
      searchPlaceholder: "Custom placeholder"
    };

    const { container } = render( <DXCatalog {...props} /> );
    expect( container.querySelector( ".dxCatalog" ) ).toBeInTheDocument();
  } );

  test( "handles pagination state changes", async () => {
    const props = {
      items: itemsArgs,
      totalItems: itemsArgs.length,
      categories: ["subject"],
      filterType: "select",
      paginationProps: {
        sets: ["2", "4", "8"],
        active: 1,
        activeSet: 4
      }
    };

    const { container } = render( <DXCatalog {...props} /> );

    // Test onChangeActive
    const paginationButton = container.querySelector( ".page-item" ) as HTMLElement;
    if ( paginationButton ) {
      await userEvent.click( paginationButton );
    }

    expect( container.querySelector( ".dxCatalog" ) ).toBeInTheDocument();
  } );

  test( "handles taxonomy values with special characters and whitespace", () => {
    const itemsWithSpecialChars: CardProps[] = [
      {
        ...itemsArgs[0],
        _taxonomies: {
          subject: ["Sports  ", "  Cinema  ", "  Drama  "],
          country: " Mexico "
        }
      }
    ];

    const props = {
      items: itemsWithSpecialChars,
      totalItems: itemsWithSpecialChars.length,
      categories: ["subject", "country"],
      filterType: "select",
      paginationProps: {
        sets: ["2", "4", "8"],
        active: 1,
        activeSet: 4
      }
    };

    const { container } = render( <DXCatalog {...props} /> );
    expect( container.querySelector( ".dxCatalog" ) ).toBeInTheDocument();
  } );
} );

describe( "DXCatalog Hardening", () => {
  let originalGetComputedStyle: typeof window.getComputedStyle;

  beforeAll( () => {
    originalGetComputedStyle = window.getComputedStyle;
  } );

  afterAll( () => {
    window.getComputedStyle = originalGetComputedStyle;
    jest.restoreAllMocks();
  } );

  const baseSniperProps: CatalogProps = {
    items: [
      {
        index: 0,
        title: { label: "Target Alpha", url: "/alpha" },
        body: "Body text",
        image: "alpha.jpg",
        topLabel: "Top",
        _taxonomies: {
          subject: ["Science", "Math"],
          region: "North"
        }
      },
      {
        index: 1,
        title: { label: "Target Bravo", url: "/bravo" },
        body: "Body text",
        _taxonomies: {
          subject: "History",
          region: "South"
        }
      }
    ],
    totalItems: 2,
    categories: ["subject", "region"],
    filterType: "select",
    paginationProps: {
      sets: ["2", "4", "8"],
      active: 1,
      activeSet: 4
    }
  };

  test( "Strictly executes mathematical layout boundaries for Masonry Engine grid and item spans", async () => {
    // Intercept getComputedStyle to provide strict numerical strings for grid math
    window.getComputedStyle = jest.fn( ( elt: Element ) => {
      if ( elt.classList.contains( "dxCatalog--layout-masonry" ) ) {
        return { getPropertyValue: ( prop: string ) => prop === 'grid-auto-rows' ? '10' : '5' } as CSSStyleDeclaration;
      }
      if ( elt.tagName.toLowerCase() === 'p' ) {
        return { lineHeight: '20', marginBottom: '10' } as CSSStyleDeclaration;
      }
      return originalGetComputedStyle( elt );
    } );

    // Intercept getBoundingClientRect to provide strict height integers
    const rectSpy = jest.spyOn( Element.prototype, 'getBoundingClientRect' ).mockImplementation( function ( this: HTMLElement ) {
      if ( this.classList.contains( 'dxCatalog__content' ) ) return { height: 30 } as DOMRect;
      if ( this.classList.contains( 'dxCard__image' ) ) return { height: 100 } as DOMRect;
      if ( this.classList.contains( 'dxCard__top' ) ) return { height: 50 } as DOMRect;
      if ( this.tagName.toLowerCase() === 'h3' ) return { height: 50 } as DOMRect;
      return { height: 0 } as DOMRect;
    } );

    const { container } = render( <DXCatalog {...baseSniperProps} masonryLayout={true} maxCardHeight="500" /> );

    // Establish strict DOM baseline to bypass DXCard opaqueness and ensure physics engine executes
    const card = container.querySelector( ".dxCard" );
    if ( card ) {
      card.innerHTML = `
                <div class="dxCard__image"></div>
                <div class="dxCard__top"></div>
                <div class="dxCard__body">
                    <h3></h3>
                    <p></p>
                </div>
            `;
    }

    // Trigger the DXCatalog resize listener to re-evaluate the mutated DOM nodes
    await act( async () => {
      window.dispatchEvent( new Event( 'resize' ) );
    } );

    // Math resolution for Masonry gridRowEnd:
    // rowHeight = 10, rowGap = 5
    // itemContent height = 30
    // Math.ceil((30 + 5) / (10 + 5)) = Math.ceil(35 / 15) = Math.ceil(2.33) = 3
    const masonryItem = container.querySelector( ".dxCatalog__item" ) as HTMLElement;
    expect( masonryItem.style.gridRowEnd ).toStrictEqual( "span 3" );

    // Math resolution for Card webkitLineClamp:
    // remainingHeight = 500 - 100 (image) - 50 (top) - 50 (h3) = 300
    // remainingHeight -= 10 (pMargin) = 290
    // lineToShow = Math.floor(290 / 20 (lineHeight)) - 1 = Math.floor(14.5) - 1 = 13
    const paragraph = container.querySelector( ".dxCard__body p" ) as HTMLElement;
    expect( paragraph.style.webkitLineClamp ).toStrictEqual( "13" );

    rectSpy.mockRestore();
  } );

  test( "Strictly executes fallback clamping logic when lineToShow evaluates to 0 or less", async () => {
    window.getComputedStyle = jest.fn( ( elt: Element ) => {
      // Setting lineHeight to 90 ensures the math evaluates to exactly 0 (falsy)
      if ( elt.tagName.toLowerCase() === 'p' ) return { lineHeight: '90', marginBottom: '10' } as CSSStyleDeclaration;
      return originalGetComputedStyle( elt );
    } );

    const rectSpy = jest.spyOn( Element.prototype, 'getBoundingClientRect' ).mockImplementation( function ( this: HTMLElement ) {
      if ( this.tagName.toLowerCase() === 'h3' ) return { height: 100 } as DOMRect;
      return { height: 0 } as DOMRect;
    } );

    const { container } = render( <DXCatalog {...baseSniperProps} maxCardHeight="200" /> );

    // Establish strict DOM baseline
    const card = container.querySelector( ".dxCard" );
    if ( card ) {
      card.innerHTML = `
                <div class="dxCard__body">
                    <h3></h3>
                    <p></p>
                </div>
            `;
    }

    await act( async () => {
      window.dispatchEvent( new Event( 'resize' ) );
    } );

    // Math: 200 - 100 (h3) = 100. 100 - 10 (pMargin) = 90.
    // Math.floor(90 / 90) - 1 = 1 - 1 = 0. 
    // 0 is falsy, so the fallback branch `else { bodyContainer.style.webkitLineClamp = String(1) }` strictly triggers.
    const paragraph = container.querySelector( ".dxCard__body p" ) as HTMLElement;
    expect( paragraph.style.webkitLineClamp ).toStrictEqual( "1" );

    rectSpy.mockRestore();
  } );

  test( "Strictly tracks window resize event listener attachment and dismounting lifecycles", () => {
    const addListenerSpy = jest.spyOn( window, 'addEventListener' );
    const removeListenerSpy = jest.spyOn( window, 'removeEventListener' );

    const { unmount } = render( <DXCatalog {...baseSniperProps} /> );
    expect( addListenerSpy ).toHaveBeenCalledWith( 'resize', expect.any( Function ) );

    unmount();
    expect( removeListenerSpy ).toHaveBeenCalledWith( 'resize', expect.any( Function ) );
  } );

  test( "Strictly traverses taxonomy arrays and bypasses mismatches during search addition (title vs attributes)", async () => {
    const { container } = render( <DXCatalog {...baseSniperProps} /> );

    // By typing 'Target' we trigger the 'title.label' match branch explicitly
    const searchInput = screen.getByTestId( "filter-search" );
    await act( async () => {
      await userEvent.type( searchInput, "Target" );
      fireEvent.keyDown( searchInput, { key: 'Enter', keyCode: 13 } );
    } );

    // Should return both cards
    let cards = container.querySelectorAll( ".dxCard" );
    expect( cards.length ).toStrictEqual( 2 );

    // Clear filter
    await act( async () => {
      fireEvent.click( container.querySelector( ".dxTaxonomyFilter__tagsContainer i" ) as Element );
    } );

    // By typing 'Math' we trigger the `Array.isArray(item._taxonomies[prop])` branch explicitly
    await act( async () => {
      await userEvent.type( searchInput, "Math" );
      fireEvent.keyDown( searchInput, { key: 'Enter', keyCode: 13 } );
    } );

    // Should strictly return only Alpha
    cards = container.querySelectorAll( ".dxCard" );
    expect( cards.length ).toStrictEqual( 1 );
    expect( cards[0].querySelector( "h3" )?.textContent ).toStrictEqual( "Target Alpha" );
  } );

  test( "Strictly calculates multiple taxonomy trait filtering and intersection removal overlaps", async () => {
    const customProps: CatalogProps = {
      ...baseSniperProps,
      items: [
        { ...baseSniperProps.items[0], _taxonomies: { subject: "Science" } },
        { ...baseSniperProps.items[1], _taxonomies: { subject: "Science" } },
        { index: 2, title: { label: "Target Charlie", url: "/charlie" }, _taxonomies: { subject: "Math" } }
      ],
      totalItems: 3
    };

    const { container } = render( <DXCatalog {...customProps} /> );

    // 1. Add "Science" (Adds two items)
    const searchInput = screen.getByTestId( "filter-search" );
    await act( async () => {
      await userEvent.type( searchInput, "Science" );
      fireEvent.keyDown( searchInput, { key: 'Enter', keyCode: 13 } );
    } );

    let cards = container.querySelectorAll( ".dxCard" );
    expect( cards.length ).toStrictEqual( 2 );

    // 2. Add "Target Charlie" via title match (Should theoretically restrict, but component logic uses OR accumulation for search tags)
    await act( async () => {
      await userEvent.type( searchInput, "Charlie" );
      fireEvent.keyDown( searchInput, { key: 'Enter', keyCode: 13 } );
    } );

    // Based on the component's internal sequential filter loop, multiple tags restrict the accumulated array.
    // The first tag ("Science") leaves items 0 and 1. 
    // The second tag ("Charlie") runs against the subset [item 0, item 1]. Neither match "Charlie", so result is 0.
    cards = container.querySelectorAll( ".dxCard" );
    expect( cards.length ).toStrictEqual( 0 );

    // 3. Remove "Science" (Triggers `!addOrRemove` branch). Loop runs "Charlie" against the full list.
    const tags = container.querySelectorAll( ".dxTaxonomyFilter__tagsContainer i" );
    await act( async () => {
      fireEvent.click( tags[0] ); // Removes "Science", leaving "Charlie"
    } );

    cards = container.querySelectorAll( ".dxCard" );
    expect( cards.length ).toStrictEqual( 1 ); // Item 2 should now match
  } );
} );
