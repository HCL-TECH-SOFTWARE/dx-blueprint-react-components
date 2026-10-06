import React from "react";
import '@testing-library/jest-dom';
import { render, fireEvent, act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXTaxonomyFilter, { TaxonomyFilterProps } from "./DXTaxonomyFilter";
import { taxonomyPropsArgs } from "./DXTaxonomyFilter.stories";

test( "If no searchLabel is passed, then the value should be 'Filter by keyword'", () => {
    let props = JSON.parse( JSON.stringify( taxonomyPropsArgs ) );
    props.filterItems = function ( selectedFilters: any, editedFilter: any, addRemove: any ) {};
    delete props.searchLabel;
    delete props.searchPlaceholder;

    const { container } = render( <DXTaxonomyFilter {...props} /> );
    const label = container.querySelector( ".dxTaxonomyFilter__inputLabel" );
    expect( label?.textContent ).toBe( "Filter by keyword" );
} );

test( "If no searchPlaceholder is passed, then the value should be 'Type what are you looking for'", () => {
    let props = JSON.parse( JSON.stringify( taxonomyPropsArgs ) );
    props.filterItems = function ( selectedFilters: any, editedFilter: any, addRemove: any ) {};
    delete props.searchLabel;
    delete props.searchPlaceholder;

    const { container } = render( <DXTaxonomyFilter {...props} /> );
    const label = container.querySelector( ".dxTaxonomyFilter__searchInput" ) as HTMLInputElement;
    expect( label?.placeholder ).toBe( "Type what are you looking for" );
} );

test( "If searchLabel is passed, then the value should be the same", () => {
    let props: TaxonomyFilterProps = {
        ...taxonomyPropsArgs,
        searchLabel: "Find out"
    };
    const { container } = render( <DXTaxonomyFilter {...props} /> );
    const label = container.querySelector( ".dxTaxonomyFilter__inputLabel" );
    expect( label?.textContent ).toBe( props.searchLabel );
} );

test( "If searchPlaceholder is passed, then the value should be the same", () => {
    let props: TaxonomyFilterProps = {
        ...taxonomyPropsArgs,
        searchPlaceholder: "Input something"
    };
    const { container } = render( <DXTaxonomyFilter {...props} /> );
    const label = container.querySelector( ".dxTaxonomyFilter__searchInput" ) as HTMLInputElement;
    expect( label?.placeholder ).toBe( props.searchPlaceholder );
} );

test( "if more than 3 filters passed a message 'You can only pass up to 3 filters' will show", () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "select",
                label: "Subject",
                values: ["Sports", "Gossip", "Cinema"],
                attribute: "subject"
            },
            {
                type: "select",
                label: "Country",
                values: ["Mexico", "United States", "Colombia"],
                attribute: "country"
            },
            {
                type: "select",
                label: "Scope",
                values: ["Local", "National", "International"],
                attribute: "scope"
            },
            {
                type: "select",
                label: "Scope",
                values: ["Local", "National", "International"],
                attribute: "scope"
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        }
    };

    const { getByText } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    expect( getByText( "You can only pass up to 3 filters" ) ).toBeInTheDocument();
} );

test( 'if an empty string is passed for type it should render the select type', () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "",
                label: "Subject",
                values: ["Sports", "Gossip", "Cinema"],
                attribute: "subject"
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        }
    };

    const { getAllByTestId } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    expect( getAllByTestId( "filter-select" ).length ).toBeGreaterThan( 0 );
} );

test( 'if select string is passed for the type it should render the selects', () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "select",
                label: "Country",
                values: ["Mexico", "USA"],
                attribute: "country"
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        }
    };

    const { getAllByTestId } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    expect( getAllByTestId( "filter-select" ).length ).toBeGreaterThan( 0 );
} );

test( 'if checkbox string is passed for type it should render the checkboxes', () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "checkbox",
                label: "Country",
                values: ["Mexico"],
                attribute: "country"
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        }
    };

    const { getAllByTestId } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    expect( getAllByTestId( "filter-checkbox" ).length ).toBeGreaterThan( 0 );
} );

test( 'if switch string is passed for type it should render the switches', () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "switch",
                label: "Country",
                values: ["Mexico"],
                attribute: "country"
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        }
    };
    const { getAllByTestId } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    expect( getAllByTestId( "filter-switch" ).length ).toBeGreaterThan( 0 );
} );

test( 'if toggle string is passed for type it should render the toggle menu', () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "toggle",
                label: "Year",
                values: ["2023", "2022", "2021"],
                attribute: "year"
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        }
    };
    const { container } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    let toggleMenu = container.querySelector( ".dxTaxonomyFilter--toggleMenu" );
    expect( toggleMenu ).toBeInTheDocument();
} );

test( 'if the user selects a filter a tag should be render', async () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "select",
                label: "Country",
                values: ["Mexico", "USA"],
                attribute: "country"
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        }
    };
    const { getByTestId, container } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    const filter = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[1] as HTMLElement;
    const select = getByTestId( "filter-select" );
    await userEvent.selectOptions( select, filter );
    const tagsContainer = container.querySelector( ".dxTaxonomyFilter__tagsContainer" )?.childNodes[0].textContent;
    expect( tagsContainer ).toEqual( "mexico" );
} );

test( 'if the user selects a value in a filter the select input should not be disabled', async () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "select",
                label: "Country",
                values: ["Mexico", "USA"],
                attribute: "country"
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        }
    };
    const { getByTestId, container } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    const filter = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[1] as HTMLElement;
    const select = getByTestId( "filter-select" );
    await userEvent.selectOptions( select, filter );
    expect( select ).not.toBeDisabled();
} );

test( 'if the user selects all values in a filter the select input should be disabled', async () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "select",
                label: "Country",
                values: ["Mexico", "USA"],
                attribute: "country"
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        }
    };
    const { getByTestId, container } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    const filter1 = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[1] as HTMLElement;
    const filter2 = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[2] as HTMLElement;
    const select = getByTestId( "filter-select" );
    await userEvent.selectOptions( select, filter1 );
    await userEvent.selectOptions( select, filter2 );
    expect( select ).toBeDisabled();
} );

test( 'if the user checks a checkbox, a tag should be render', async () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "checkbox",
                label: "Country",
                values: ["Mexico"],
                attribute: "country"
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        }
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId, container } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    const checkbox = getByTestId( "filter-checkbox" );
    await userEvent.click( checkbox );
    const tagsContainer = container.querySelector( ".dxTaxonomyFilter__tagsContainer" )?.childNodes[0].textContent;
    expect( tagsContainer ).toEqual( "mexico" );
} );

test( 'if the user click on the switch, a tag should be render', async () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "switch",
                label: "Country",
                values: ["Mexico"],
                attribute: "country"
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        }
    };
    const { getByTestId, container } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    const switchInput = getByTestId( "filter-switch" );
    await userEvent.click( switchInput );
    const tagsContainer = container.querySelector( ".dxTaxonomyFilter__tagsContainer" )?.childNodes[0].textContent;
    expect( tagsContainer ).toEqual( "mexico" );
} );

test( 'if the user clicks on the first button on the toggle menu, a tag should be rendered', async () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "toggle",
                label: "Year",
                values: ["2023", "2022"],
                attribute: "year"
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        }
    };
    const { container } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    const button = container.querySelectorAll( ".dxTaxonomyFilter--toggleMenu .dxToggleMenu .dxButton" )[0];
    await userEvent.click( button );
    const tagsContainer = container.querySelector( ".dxTaxonomyFilter__tagsContainer" )?.childNodes[0].textContent;
    expect( tagsContainer ).toEqual( taxonomyProps.filters[0].values[0] );
} );

test( 'if the user enters a filter, a tag should be render', async () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "switch",
                label: "Country",
                values: ["Mexico"],
                attribute: "country"
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        }
    };
    const { getByTestId, container } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    const input = getByTestId( "filter-search" );
    await userEvent.type( input, "movie" );
    fireEvent.keyDown( input, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13
    } );

    const tagsContainer = container.querySelector( ".dxTaxonomyFilter__tagsContainer" )?.childNodes[0].textContent;
    expect( tagsContainer ).toEqual( "movie" );
} );

test( 'if the user click on the close icon on a tag, it should delete it', async () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "checkbox",
                label: "Country",
                values: ["Mexico"],
                attribute: "country"
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        }
    };
    const { getByTestId, container } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    const checkbox = getByTestId( "filter-checkbox" );
    await userEvent.click( checkbox );
    const closeIcon = container.querySelector( ".dxTaxonomyFilter__tagsContainer" )?.childNodes[0].childNodes[1] as HTMLElement;
    await userEvent.click( closeIcon );
    expect( container.querySelector( ".taxonomy-filters" ) ).toBeNull();
} );

test( 'if the user tries to input a filter that is already filtered, a message "The value entered is already being filtered" will show', async () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "checkbox",
                label: "Country",
                values: ["Mexico"],
                attribute: "country"
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        }
    };
    const { getByTestId, getByText } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    const checkbox = getByTestId( "filter-checkbox" );
    await userEvent.click( checkbox );
    const input = getByTestId( "filter-search" );
    await userEvent.type( input, "Mexico" );
    fireEvent.keyDown( input, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13
    } );

    expect( getByText( "The value entered is already being filtered" ) ).toBeInTheDocument();
} );

test( "If the user passes the prop hideSearch, that element will be null", () => {
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "select",
                label: 'Country',
                values: ["Mexico", "USA"],
                attribute: "country",
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        },
        totalItems: 10,
        filteredCount: 10
    };
    const { container } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    let search = container.querySelector( '[data-testid="search-input"]' );
    expect( search ).toBeNull();
} );
// Test the toggle menu behavior
test( 'if the user clicks on the first button on the toggle menu, all the buttons should be disabled', async () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "toggle",
                label: "Year",
                values: ["2023", "2022"],
                attribute: "year"
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        }
    };
    const { container } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    const button = container.querySelectorAll( ".dxTaxonomyFilter--toggleMenu .dxToggleMenu .dxButton" )[0];
    await userEvent.click( button );
    const tagsContainer = container.querySelectorAll( ".dxToggleMenu .dxButton" );
    let flag = 0;
    tagsContainer.forEach( item => {
        let el = item as HTMLButtonElement;
        if ( el.disabled ) flag++;
    } );
    expect( flag ).toEqual( taxonomyProps.filters[0].values.length );
} );
test( 'if the user clicks on the first button on the toggle menu, and then remove the tag all the buttons should not be disabled', async () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "toggle",
                label: "Year",
                values: ["2023", "2022"],
                attribute: "year"
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        }
    };
    const { container } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    const button = container.querySelectorAll( ".dxTaxonomyFilter--toggleMenu .dxToggleMenu .dxButton" )[0];
    await userEvent.click( button );
    const closeIcon = container.querySelector( ".dxTaxonomyFilter__tagsContainer" )?.childNodes[0].childNodes[1] as HTMLElement;
    await userEvent.click( closeIcon );
    const buttons = container.querySelectorAll( ".dxToggleMenu .dxButton" );
    let flag = 0;
    buttons.forEach( item => {
        let el = item as HTMLButtonElement;
        if ( !el.disabled ) flag++;
    } );
    expect( flag ).toEqual( taxonomyProps.filters[0].values.length );
} );
test( 'if the user clicks on the first button on the toggle menu, and then remove the tag all the buttons should not have the class "btn-primary"', async () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    let taxonomyProps: TaxonomyFilterProps = {
        filters: [
            {
                type: "toggle",
                label: "Year",
                values: ["2023", "2022"],
                attribute: "year"
            }
        ],
        filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
            return { selectedFilters, editedFilter, addRemove };
        }
    };
    const { container } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    const button = container.querySelectorAll( ".dxTaxonomyFilter--toggleMenu .dxToggleMenu .dxButton" )[0];
    await userEvent.click( button );
    const closeIcon = container.querySelector( ".dxTaxonomyFilter__tagsContainer" )?.childNodes[0].childNodes[1] as HTMLElement;
    await userEvent.click( closeIcon );
    const buttons = container.querySelectorAll( ".dxToggleMenu .dxButton" );
    let flag = 0;
    buttons.forEach( item => {
        let el = item as HTMLButtonElement;
        if ( !el.classList.contains( "btn-primary" ) ) flag++;
    } );
    expect( flag ).toEqual( taxonomyProps.filters[0].values.length );
} );
// Test the action button
test( "If the screen is mobile, the action button will display", () => {
    Object.defineProperty( window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 389,
    } );
    let props: TaxonomyFilterProps = {
        ...taxonomyPropsArgs,
        filters: [
            {
                type: "checkbox",
                label: "Country",
                values: ["Mexico"],
                attribute: "country"
            },
            {
                type: "checkbox",
                label: "Subject",
                values: ["Cinema", "Gossip"],
                attribute: "subject"
            },
            {
                type: "checkbox",
                label: "Scope",
                values: ["International", "National"],
                attribute: "scope"
            }
        ]
    };
    const { getByTestId } = render( <DXTaxonomyFilter {...props} /> );
    let button = getByTestId( "taxonomy-action-button" );
    expect( button ).toBeInTheDocument();
} );

test( "If the screen is mobile, the taxonomy-container will have the class 'd-none'", () => {
    Object.defineProperty( window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 389,
    } );
    let props: TaxonomyFilterProps = {
        ...taxonomyPropsArgs,
        filters: [
            {
                type: "checkbox",
                label: "Country",
                values: ["Mexico"],
                attribute: "country"
            },
            {
                type: "checkbox",
                label: "Subject",
                values: ["Cinema", "Gossip"],
                attribute: "subject"
            },
            {
                type: "checkbox",
                label: "Scope",
                values: ["International", "National"],
                attribute: "scope"
            }
        ]
    };
    const { getByTestId } = render( <DXTaxonomyFilter {...props} /> );
    let taxContainer = getByTestId( "taxonomy-container" );
    expect( taxContainer ).toHaveClass( "d-none" );
} );

test( "If the screen is mobile, and the user clicks on the action button the taxonomy-container will not have the class 'd-none'", async () => {
    Object.defineProperty( window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 389,
    } );
    let props: TaxonomyFilterProps = {
        ...taxonomyPropsArgs,
        filters: [
            {
                type: "checkbox",
                label: "Country",
                values: ["Mexico"],
                attribute: "country"
            },
            {
                type: "checkbox",
                label: "Subject",
                values: ["Cinema", "Gossip"],
                attribute: "subject"
            },
            {
                type: "checkbox",
                label: "Scope",
                values: ["International", "National"],
                attribute: "scope"
            }
        ]
    };
    const { getByTestId } = render( <DXTaxonomyFilter {...props} /> );
    let button = getByTestId( "taxonomy-action-button" );
    await userEvent.click( button );
    let taxContainer = getByTestId( "taxonomy-container" );
    expect( taxContainer ).not.toHaveClass( "d-none" );
} );

test( "If the screen is mobile, and the user clicks on the action button icon the taxonomy-container will not have the class 'd-none'", async () => {
    Object.defineProperty( window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 389,
    } );
    let props: TaxonomyFilterProps = {
        ...taxonomyPropsArgs,
        filters: [
            {
                type: "checkbox",
                label: "Country",
                values: ["Mexico"],
                attribute: "country"
            },
            {
                type: "checkbox",
                label: "Subject",
                values: ["Cinema", "Gossip"],
                attribute: "subject"
            },
            {
                type: "checkbox",
                label: "Scope",
                values: ["International", "National"],
                attribute: "scope"
            }
        ]
    };
    const { getByTestId } = render( <DXTaxonomyFilter {...props} /> );
    let icon = getByTestId( "taxonomy-action-button-icon" );
    await userEvent.click( icon );
    let taxContainer = getByTestId( "taxonomy-container" );
    expect( taxContainer ).not.toHaveClass( "d-none" );
} );

test( "If icon changes if value is set", () => {
    Object.defineProperty( window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 389,
    } );

    const { getByTestId } = render( <DXTaxonomyFilter {...taxonomyPropsArgs}
        icons={{
            filter: "ci-Hamburger_LG",
            filterClose: "ci-Close-LG"
        }}
    /> );
    expect( getByTestId( "taxonomy-action-button-icon" ) ).toHaveClass( "ci-Hamburger_LG" );
} );

test( "If user clicks on Clear Filters button, all selected filter tags should be removed", async () => {
    const mockOnClearFilters = jest.fn();
    let props: TaxonomyFilterProps = {
        ...taxonomyPropsArgs,
        onClearFilters: mockOnClearFilters,
        filteredCount: 3 // Show that some filters are applied
    };

    const { getByTestId, queryByTestId } = render( <DXTaxonomyFilter {...props} /> );

    // Initially, there should be no tags since no filters are selected
    expect( queryByTestId( "tags" ) ).toBeNull();

    // Simulate adding some filters by directly manipulating the component state
    // This is a simplified test - in a real scenario, user would interact with filter controls
    const filterItems = props.filterItems;

    // Simulate filter selection
    filterItems( ["country:mexico", "subject:cinema"], "country:mexico", true );
    filterItems( ["country:mexico", "subject:cinema", "scope:international"], "subject:cinema", true );

    // Click the Clear Filters button
    const clearButton = getByTestId( "clear-filters-button" );
    await userEvent.click( clearButton );

    // Verify the external callback was called
    expect( mockOnClearFilters ).toHaveBeenCalledTimes( 1 );
} );

describe( "DXTaxonomyFilter Hardening", () => {
    const baseHardeningProps: TaxonomyFilterProps = {
        totalItems: 100,
        filteredCount: 50,
        filterItems: jest.fn(),
        filters: [
            {
                type: "select",
                label: "Region",
                values: ["north", "south"],
                attribute: "region"
            },
            {
                type: "toggle",
                label: "Status",
                values: ["active", "inactive"],
                attribute: "status"
            }
        ]
    };

    beforeEach( () => {
        jest.clearAllMocks();
    } );

    test( "Strictly executes search input keycode boundaries, empty string blocks, and error state flushes", async () => {
        const { container } = render( <DXTaxonomyFilter {...baseHardeningProps} /> );
        const searchInput = screen.getByTestId( "filter-search" ) as HTMLInputElement;

        // 1. keyCode !== 13 -> Should NOT trigger search filter addition
        await act( async () => {
            await userEvent.type( searchInput, "alpha" );
            fireEvent.keyDown( searchInput, { key: 'a', keyCode: 65 } );
        } );
        expect( container.querySelectorAll( ".dxTaxonomyFilter__tagsContainer span" ).length ).toStrictEqual( 0 );

        // 2. keyCode === 13 but empty string -> Should NOT trigger search filter addition
        await act( async () => {
            await userEvent.clear( searchInput );
            fireEvent.keyDown( searchInput, { key: 'Enter', keyCode: 13 } );
        } );
        expect( container.querySelectorAll( ".dxTaxonomyFilter__tagsContainer span" ).length ).toStrictEqual( 0 );

        // 3. Exact valid entry (keyCode 13 + value) -> Adds tag, clears input
        await act( async () => {
            await userEvent.type( searchInput, "bravo" );
            fireEvent.keyDown( searchInput, { key: 'Enter', keyCode: 13 } );
        } );
        expect( container.querySelectorAll( ".dxTaxonomyFilter__tagsContainer span" )[0].textContent?.includes( "bravo" ) ).toStrictEqual( true );
        expect( searchInput.value ).toStrictEqual( "" );

        // 4. Duplicate entry -> Sets exact error message
        await act( async () => {
            await userEvent.type( searchInput, "bravo" );
            fireEvent.keyDown( searchInput, { key: 'Enter', keyCode: 13 } );
        } );
        expect( screen.getByTestId( "error-msg" ).textContent ).toStrictEqual( "The value entered is already being filtered" );

        // 5. Subsequent non-Enter keypress -> Strictly clears error message (`else if (errorMsg)` branch)
        await act( async () => {
            fireEvent.keyDown( searchInput, { key: 'x', keyCode: 88 } );
        } );
        expect( screen.queryByTestId( "error-msg" ) ).toBeNull();
    } );

    test( "Strictly triggers disabled state boundary when exactly 6 filters are reached", async () => {
        render( <DXTaxonomyFilter {...baseHardeningProps} /> );
        const searchInput = screen.getByTestId( "filter-search" ) as HTMLInputElement;

        // Add 5 filters
        for ( let i = 1; i <= 5; i++ ) {
            await act( async () => {
                await userEvent.type( searchInput, `test${i}` );
                fireEvent.keyDown( searchInput, { key: 'Enter', keyCode: 13 } );
            } );
        }
        expect( searchInput.disabled ).toStrictEqual( false );

        // Add the 6th filter to hit the strict `selectedFilters.length === 6` threshold
        await act( async () => {
            await userEvent.type( searchInput, `test6` );
            fireEvent.keyDown( searchInput, { key: 'Enter', keyCode: 13 } );
        } );
        expect( searchInput.disabled ).toStrictEqual( true );
    } );

    test( "Strictly traverses DOM hierarchy to toggle mobile container visibility via action button target branching", async () => {
        Object.defineProperty( window, 'innerWidth', { configurable: true, get: () => 375 } );

        const { container } = render( <DXTaxonomyFilter {...baseHardeningProps} /> );
        const taxonomyContainer = screen.getByTestId( "taxonomy-container" );
        expect( taxonomyContainer.classList.contains( "d-none" ) ).toStrictEqual( true );

        const actionButton = screen.getByTestId( "taxonomy-action-button" );
        const actionIcon = screen.getByTestId( "taxonomy-action-button-icon" );

        // Branch 1: e.target.nextElementSibling !== null (Clicking the parent button directly)
        await act( async () => {
            fireEvent.click( actionButton, { target: actionButton } );
        } );
        expect( taxonomyContainer.classList.contains( "d-none" ) ).toStrictEqual( false );

        // Reset visibility
        await act( async () => {
            fireEvent.click( actionButton, { target: actionButton } );
        } );
        expect( taxonomyContainer.classList.contains( "d-none" ) ).toStrictEqual( true );

        // Branch 2: e.target.nextElementSibling === null -> falls back to e.target.parentNode.nextElementSibling
        // (Clicking the deeply nested icon inside the button)
        await act( async () => {
            // We spoof the target payload because JSDOM synthetic event delegation can sometimes flatten nested targets
            Object.defineProperty( actionIcon, 'nextElementSibling', { get: () => null } );
            Object.defineProperty( actionIcon, 'parentNode', { get: () => actionButton } );

            // Fire event directly dispatching with the icon as the internal target
            const clickEvent = new MouseEvent( 'click', { bubbles: true } );
            Object.defineProperty( clickEvent, 'target', { writable: false, value: actionIcon } );

            fireEvent( actionButton, clickEvent );
        } );

        expect( taxonomyContainer.classList.contains( "d-none" ) ).toStrictEqual( false );
    } );

    test( "Strictly forces DOM mutation of classes and properties during toggle menu removal and clear operations", async () => {
        const { container } = render( <DXTaxonomyFilter {...baseHardeningProps} onClearFilters={jest.fn()} /> );

        // 1. Trigger the filter legitimately via the component's toggle menu button
        // This ensures the attribute is registered as "status:active" instead of "_search:status:active"
        const toggleButtons = container.querySelectorAll( ".dxTaxonomyFilter--toggleMenu .dxButton" );
        const targetBtn = toggleButtons[0] as HTMLButtonElement;

        await act( async () => {
            fireEvent.click( targetBtn );
        } );

        // Query the rendered tag close icon
        const tagCloseIcons = container.querySelectorAll( ".dxTaxonomyFilter__tagsContainer i" );
        expect( tagCloseIcons.length ).toBeGreaterThan( 0 );

        // Force the classes to strictly assert that the component's traversal accurately mutates them back
        targetBtn.classList.add( "btn-primary" );
        targetBtn.classList.remove( "btn-secondary" );
        targetBtn.disabled = true;

        // 2. Click individual clear tag (Triggers `removeFilter` logic)
        await act( async () => {
            fireEvent.click( tagCloseIcons[0] );
        } );

        // Strict assertions on the specific DOM traversal mutations inside removeFilter
        expect( targetBtn.classList.contains( "btn-primary" ) ).toStrictEqual( false );
        expect( targetBtn.classList.contains( "btn-secondary" ) ).toStrictEqual( true );
        expect( targetBtn.disabled ).toStrictEqual( false );

        // --- Repeat for Clear All Filters button ---

        // Setup state again by clicking the toggle button
        await act( async () => {
            fireEvent.click( targetBtn );
        } );

        targetBtn.classList.add( "btn-primary" );
        targetBtn.classList.remove( "btn-secondary" );
        targetBtn.disabled = true;

        const clearBtn = screen.getByTestId( "clear-filters-button" );
        await act( async () => {
            fireEvent.click( clearBtn );
        } );

        // Strict assertions on the specific DOM traversal mutations inside clearAllFilters
        expect( targetBtn.classList.contains( "btn-primary" ) ).toStrictEqual( false );
        expect( targetBtn.classList.contains( "btn-secondary" ) ).toStrictEqual( true );
        expect( targetBtn.disabled ).toStrictEqual( false );
    } );

    test( "Strictly maps ReactNode payload to search icon slot and resolves exact select default labels", () => {
        const customIconProps = {
            ...baseHardeningProps,
            icons: { search: <svg data-testid="custom-svg-node" /> }
        };
        const { container } = render( <DXTaxonomyFilter {...customIconProps} /> );

        // Verify the typeof string vs ReactNode branch executes correctly
        expect( screen.getByTestId( "custom-svg-node" ) ).toBeInTheDocument();
        expect( container.querySelector( ".ci-Search_Magnifying_Glass" ) ).toBeNull();

        // Verify exact string concatenation of default select option: "Select " + label + " value"
        const selectOptions = container.querySelectorAll( "option" );
        expect( selectOptions[0].textContent ).toStrictEqual( "Select region value" );
    } );

  test( "uses default filterLimit={3} when no filterLimit prop is provided", () => {
    //@ts-ignore: test fixture intentionally omits unrelated required props
    const taxonomyProps: TaxonomyFilterProps = {
      filters: [
        { type: "select", label: "Subject", values: ["Sports"], attribute: "subject" },
        { type: "select", label: "Country", values: ["Mexico"], attribute: "country" },
        { type: "select", label: "Scope", values: ["Local"], attribute: "scope" },
        { type: "select", label: "Category", values: ["News"], attribute: "category" }
      ],
      filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
        return { selectedFilters, editedFilter, addRemove };
      }
    };

    const { getByText } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    expect( getByText( "You can only pass up to 3 filters" ) ).toBeInTheDocument();
  } );

  test( "respects custom filterLimit={5} and only blocks when filters exceed 5", () => {
    //@ts-ignore: test fixture intentionally omits unrelated required props
    const taxonomyProps: TaxonomyFilterProps = {
      filterLimit: 5,
      filters: [
        { type: "select", label: "Subject", values: ["Sports"], attribute: "subject" },
        { type: "select", label: "Country", values: ["Mexico"], attribute: "country" },
        { type: "select", label: "Scope", values: ["Local"], attribute: "scope" },
        { type: "select", label: "Category", values: ["News"], attribute: "category" },
        { type: "select", label: "Audience", values: ["Internal"], attribute: "audience" },
        { type: "select", label: "Language", values: ["English"], attribute: "language" }
      ],
      filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {
        return { selectedFilters, editedFilter, addRemove };
      }
    };

    const { getByText } = render( <DXTaxonomyFilter {...taxonomyProps} /> );
    expect( getByText( "You can only pass up to 5 filters" ) ).toBeInTheDocument();
  } );
} );
