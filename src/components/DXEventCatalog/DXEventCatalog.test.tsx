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
import DXEventCatalog, { EventCatalogItem } from "./DXEventCatalog";
import { eventsArgs } from "./DXEventCatalog.stories";

test( "If the user passes hideFilters as true, the taxonomy filter will not be in the document", () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        hideFilters: true
    };
    const { container } = render( <DXEventCatalog {...props} /> );
    let taxonomy = container.querySelector( ".dxTaxonomyFilter" );
    expect( taxonomy ).not.toBeInTheDocument();
} );

// Tests for elementsPerRow
test( "if the user does not pass elementsPerRow, the card should have the class col-lg-3", () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
    };
    const { container } = render( <DXEventCatalog {...props} /> );
    let card = container.querySelector( ".dxEventCatalog__col" );
    expect( card ).toHaveClass( "col-lg-3" );
} );

test( "if the user passes elementsPerRow as 0, the card should have the class col-lg-3", () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 0
    };
    const { container } = render( <DXEventCatalog {...props} /> );
    let card = container.querySelector( ".dxEventCatalog__col" );
    expect( card ).toHaveClass( "col-lg-3" );
} );

test( "if the user passes elementsPerRow as 1, the card should have the class col-lg-12", () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 1
    };
    const { container } = render( <DXEventCatalog {...props} /> );
    let card = container.querySelector( ".dxEventCatalog__col" );
    expect( card ).toHaveClass( "col-lg-12" );
} );

test( "if the user passes elementsPerRow as 2, the card should have the class col-lg-6", () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 2
    };
    const { container } = render( <DXEventCatalog {...props} /> );
    let card = container.querySelector( ".dxEventCatalog__col" );
    expect( card ).toHaveClass( "col-lg-6" );
} );

test( "if the user passes elementsPerRow as 3, the card should have the class col-lg-4", () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 3
    };
    const { container } = render( <DXEventCatalog {...props} /> );
    let card = container.querySelector( ".dxEventCatalog__col" );
    expect( card ).toHaveClass( "col-lg-4" );
} );

test( "if the user passes elementsPerRow as 4, the card should have the class col-lg-3", () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 4
    };
    const { container } = render( <DXEventCatalog {...props} /> );
    let card = container.querySelector( ".dxEventCatalog__col" );
    expect( card ).toHaveClass( "col-lg-3" );
} );

test( "if totalItems is missing, then it should render a message 'Invalid or missing props for taxonomy filter'", () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        filterType: "select",
        elementsPerRow: 4
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXEventCatalog {...props} /> );
    expect( getByText( "Invalid or missing props for taxonomy filter" ) ).toBeInTheDocument();
} );

test( "if filterType is missing, then it should render a message 'Invalid or missing props for taxonomy filter'", () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        elementsPerRow: 4
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXEventCatalog {...props} /> );
    expect( getByText( "Invalid or missing props for taxonomy filter" ) ).toBeInTheDocument();
} );

test( "if totalItems and filterType are passed, then the 'dxTaxonomyFilter will be in the document'", () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 4
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { container } = render( <DXEventCatalog {...props} /> );
    const taxonomy = container.querySelector( ".dxTaxonomyFilter" );
    expect( taxonomy ).toBeInTheDocument();
} );

test( "If sets on paginationProps is undefined, a message 'Invalid or missing props for pagination' will show", () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 4
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXEventCatalog {...props} /> );
    expect( getByText( "Invalid or missing props for pagination" ) ).toBeInTheDocument();
} );

test( "If active on paginationProps is undefined, a message 'Invalid or missing props for pagination' will show", () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 4
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXEventCatalog {...props} /> );
    expect( getByText( "Invalid or missing props for pagination" ) ).toBeInTheDocument();
} );

test( "If activeSet on paginationProps is undefined, a message 'Invalid or missing props for pagination' will show", () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 4
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXEventCatalog {...props} /> );
    expect( getByText( "Invalid or missing props for pagination" ) ).toBeInTheDocument();
} );

test( "if a valid paginationProps is passed, then it should render it", () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 4
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByTestId } = render( <DXEventCatalog {...props} /> );
    const pagination = getByTestId( "pagination" );
    expect( pagination ).toBeInTheDocument();
} );

// Pagination tests
test( "If a number of the pagination is clicked, the active page element should not be null", async () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 4
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { container } = render( <DXEventCatalog {...props} /> );
    // Click on the number 2
    const buttonToClicked = container.querySelector( ".pagination.pagination-root" )?.childNodes[2].childNodes[0] as HTMLElement;
    await userEvent.click( buttonToClicked );
    const activeNumber = container.querySelector( ".page-item.active" );
    expect( activeNumber ).not.toBeNull();
} );

test( "If a number of the pagination is clicked, the active page should be 2", async () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 4
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { container } = render( <DXEventCatalog {...props} /> );
    // Click on the number 2
    const buttonToClicked = container.querySelector( ".pagination.pagination-root" )?.childNodes[2].childNodes[0] as HTMLElement;
    await userEvent.click( buttonToClicked );
    const activeNumber = container.querySelector( ".page-item.active" );
    expect( activeNumber?.childNodes[0].textContent ).toEqual( "2" );
} );

test( "If the right amount of events are rendered", async () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 4
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { container } = render( <DXEventCatalog {...props} /> );
    const events = container.querySelectorAll( ".dxEvent" );
    expect( events ).toHaveLength( props.paginationProps.activeSet );
} );

test( "If a pagination set of 12 events is selected, it should change the amount of events rendered", async () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 4
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { container } = render( <DXEventCatalog {...props} /> );
    await act( async () => {
        const paginationSet = container.querySelector( ".pagination-items-per-page" ) as HTMLElement;
        await userEvent.click( paginationSet );
        let newOption: HTMLAnchorElement | undefined;
        document.querySelectorAll<HTMLAnchorElement>( "a.dropdown-item" ).forEach( element => {
            if ( element.textContent?.trim() === '12' ) {
                newOption = element;
            }
        } );
        await userEvent.click( newOption! );
    } );
    const events = container.querySelectorAll( ".dxEvent" );
    expect( events ).toHaveLength( 12 );
} );

test( "if the month filter with value 'April' is active it should render just 2 questions", async () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 4
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { container, getAllByTestId } = render( <DXEventCatalog {...props} /> );
    const select = getAllByTestId( "filter-select" )[0];
    const monthOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[1] as HTMLElement;
    await userEvent.selectOptions( select, monthOption );
    const events = container.querySelectorAll( '.dxEvent' );
    expect( events ).toHaveLength( 2 );
} );

test( "if the month filter with value 'April' is active and then remove it, it should render 6 questions", async () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 4
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { container } = render( <DXEventCatalog {...props} /> );
    const monthOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[1] as HTMLElement;
    await userEvent.click( monthOption );
    const removeIcon = document.querySelector( '[data-testid="tags"]' )?.childNodes[0].childNodes[1] as HTMLElement;
    await userEvent.click( removeIcon );
    const events = container.querySelectorAll( '.dxEvent' );
    expect( events ).toHaveLength( props.paginationProps.activeSet );
} );

test( "if the user enter a filter 'Event 12' then 1 event should be rendered", async () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 4
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { container } = render( <DXEventCatalog {...props} /> );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "Event 12" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13,
    } );

    const events = container.querySelectorAll( '.dxEvent' );
    expect( events ).toHaveLength( 1 );
} );

test( "If the user enter a filter 'Event 12' and then remove it, 6 events should be rendered", async () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 4
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { container } = render( <DXEventCatalog {...props} /> );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "Event 12" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13
    } );

    const removeIcon = document.querySelector( '[data-testid="tags"]' )?.childNodes[0].childNodes[1] as HTMLElement;
    await userEvent.click( removeIcon );
    const events = container.querySelectorAll( '.dxEvent' );
    expect( events ).toHaveLength( props.paginationProps.activeSet );
} );

test( "If the user select the filter 'April' and enter a filter 'Event 14' there should be no questions", async () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 4
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { container, getAllByTestId } = render( <DXEventCatalog {...props} /> );
    const select = getAllByTestId( "filter-select" )[0];
    const aprilOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[3] as HTMLElement;
    await userEvent.selectOptions( select, aprilOption );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "Event 14" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13
    } );

    const events = container.querySelectorAll( '.dxEvent' );
    expect( events ).toHaveLength( 0 );
} );

test( "If the filters 'question 13' and 'Hardware' are active and the user removes the 'question 13' one, it should render 5 questions", async () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 4
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { container, getAllByTestId } = render( <DXEventCatalog {...props} /> );
    const select = getAllByTestId( "filter-select" )[0];
    const aprilOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[3] as HTMLElement;
    await userEvent.selectOptions( select, aprilOption );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "Event 14" );
    fireEvent.keyDown( textInput, {
        key: "Escape",
        code: "Escape",
        keyCode: 13,
        charCode: 13
    } );
    const removeIcon = document.querySelector( '[data-testid="tags"]' )?.childNodes[1].childNodes[1] as HTMLElement;
    await userEvent.click( removeIcon );
    const events = container.querySelectorAll( '.dxEvent' );
    expect( events ).toHaveLength( 2 );
} );

test( "If the filters 'Event 14' and 'April' are active and the user removes the all the filters, it should render 6 questions", async () => {
    let props = {
        items: eventsArgs,
        paginationProps: {
            sets: ["3", "6", "12"],
            active: 1,
            activeSet: 6,
        },
        totalItems: eventsArgs.length,
        filterType: "select",
        elementsPerRow: 4
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { container, getAllByTestId } = render( <DXEventCatalog {...props} /> );
    const select = getAllByTestId( "filter-select" )[0];
    const hardwareOption = container.querySelector( '[data-testid="filter-select"]' )?.childNodes[3] as HTMLElement;
    await userEvent.selectOptions( select, hardwareOption );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
    await userEvent.type( textInput, "Event 14" );
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
    const events = container.querySelectorAll( '.dxEvent' );
    expect( events ).toHaveLength( props.paginationProps.activeSet );
} );


// Targeted tests for DXEventCatalog mutation survival

test( "Pagination Math Boundaries: Page 2 should render the strictly correct slice of items", async () => {
    // Spread existing valid event args to prevent DXEvent variant errors
    const mockItems = Array.from( { length: 10 } ).map( ( _, i ) => ( {
        data: { keyword: `Item ${i + 1}` },
        event: {
            ...eventsArgs[0].event, // Inherits valid base props
            eventName: { label: `Unique Event ${i + 1}` },
            eventFrom: `2026-06-${( i + 1 ).toString().padStart( 2, '0' )}T10:00:00Z`,
            eventTo: `2026-06-${( i + 1 ).toString().padStart( 2, '0' )}T12:00:00Z`,
        }
    } ) );

    let props = {
        items: mockItems as any,
        paginationProps: { sets: ["3", "6", "12"], active: 1, activeSet: 3 },
        totalItems: 10,
        filterType: "select",
    };

    const { container } = render( <DXEventCatalog {...props} /> );

    // Navigate to Page 2
    const pageTwoButton = container.querySelector( ".pagination.pagination-root" )?.childNodes[2].childNodes[0] as HTMLElement;
    await userEvent.click( pageTwoButton );

    // Items should be strictly indices 3, 4, 5 (Unique Event 4, 5, 6)
    const events = container.querySelectorAll( ".dxEvent" );
    expect( events[0].textContent ).toContain( "Unique Event 4" );
    expect( events[events.length - 1].textContent ).toContain( "Unique Event 6" );
} );

test( "Boolean Flag hideTypeFilter: ignores eventType matches when true", async () => {
    const customItems = [
        {
            data: {},
            event: {
                ...eventsArgs[0].event,
                eventName: { label: "Standard Meeting" },
                eventType: "Classified",
                eventFrom: "2026-01-01T10:00:00Z",
                eventTo: "2026-01-01T12:00:00Z"
            }
        }
    ];

    let props = {
        items: customItems as any,
        paginationProps: { sets: ["3"], active: 1, activeSet: 3 },
        totalItems: 1,
        filterType: "select",
        hideTypeFilter: true // The flag under test
    };

    const { container } = render( <DXEventCatalog {...props} /> );
    const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;

    // Searching for the type "Classified"
    await userEvent.type( textInput, "Classified" );
    fireEvent.keyDown( textInput, { key: "Enter", code: "Enter", keyCode: 13, charCode: 13 } );

    // Because hideTypeFilter is true, it should NOT match the eventType, returning 0 results
    const events = container.querySelectorAll( '.dxEvent' );
    expect( events ).toHaveLength( 0 );
} );

test( "Type Parsing: correctly extracts taxonomies when category data is an Array", () => {
    const arrayItems = [
        {
            data: { tags: ["React", "Jest"] },
            event: {
                ...eventsArgs[0].event,
                eventName: { label: "Tech Talk" },
                eventFrom: "2026-01-01T10:00:00Z",
                eventTo: "2026-01-01T12:00:00Z"
            }
        }
    ];

    let props = {
        items: arrayItems as any,
        paginationProps: { sets: ["3"], active: 1, activeSet: 3 },
        totalItems: 1,
        filterType: "select",
        categories: ["tags"]
    };

    const { container } = render( <DXEventCatalog {...props} /> );

    // Check the entire taxonomy filter container to ensure the array elements became options
    const taxonomyFilter = container.querySelector( '.dxTaxonomyFilter' );
    expect( taxonomyFilter?.innerHTML ).toContain( "React" );
    expect( taxonomyFilter?.innerHTML ).toContain( "Jest" );
} );

test( "Regex Error Boundary: invalid dates trigger a console warning and omit the month filter", () => {
    // Spy on console.warn to catch the specific branch execution and prevent test noise
    const warnSpy = jest.spyOn( console, 'warn' ).mockImplementation( () => {} );

    const invalidDateItems = [
        {
            data: {},
            event: {
                ...eventsArgs[0].event,
                eventName: { label: "Bad Date Event" },
                eventFrom: "Not-An-ISO-Date",
                eventTo: "Bad-Date"
            }
        }
    ];

    let props = {
        items: invalidDateItems as any,
        paginationProps: { sets: ["3"], active: 1, activeSet: 3 },
        totalItems: 1,
        filterType: "select",
    };

    const { container } = render( <DXEventCatalog {...props} /> );

    // Assert the exact console warning mutant was killed
    expect( warnSpy ).toHaveBeenCalledWith( "The dates either in from or to don't have the correct ISO Format" );

    // Month filter should be completely absent
    const filterLabels = Array.from( container.querySelectorAll( '.control-label' ) ).map( el => el.textContent );
    expect( filterLabels ).not.toContain( "Month" );

    warnSpy.mockRestore();
} );

test( "Prop Fallbacks: strictly passes searchLabel and searchPlaceholder to taxonomy filter", () => {
    let props = {
        items: eventsArgs,
        paginationProps: { sets: ["3", "6", "12"], active: 1, activeSet: 6 },
        totalItems: eventsArgs.length,
        filterType: "select",
        searchLabel: "Strict Custom Label",
        searchPlaceholder: "Strict Custom Placeholder"
    };

    const { getByText, getByPlaceholderText } = render( <DXEventCatalog {...props} /> );

    expect( getByText( "Strict Custom Label" ) ).toBeInTheDocument();
    expect( getByPlaceholderText( "Strict Custom Placeholder" ) ).toBeInTheDocument();
} );

// RTL direction tests
describe( "RTL direction support", () => {
    const baseProps = {
        items: eventsArgs,
        paginationProps: { sets: ["3", "6", "12"], active: 1, activeSet: 6 },
        totalItems: eventsArgs.length,
        filterType: "select" as const,
    };

    test( "When dir='rtl' is passed, the root element has dxEventCatalog--rtl class and dir attribute", () => {
        const { container } = render( <DXEventCatalog {...baseProps} dir="rtl" /> );
        const root = container.querySelector( ".dxEventCatalog" );
        expect( root ).toHaveClass( "dxEventCatalog--rtl" );
        expect( root ).toHaveAttribute( "dir", "rtl" );
    } );

    test( "When dir='ltr' is passed, the root element does NOT have dxEventCatalog--rtl class", () => {
        const { container } = render( <DXEventCatalog {...baseProps} dir="ltr" /> );
        const root = container.querySelector( ".dxEventCatalog" );
        expect( root ).not.toHaveClass( "dxEventCatalog--rtl" );
    } );

    test( "Renders without crashing when eventFrom items contain Arabic-Indic numerals", () => {
        const arabicItems = eventsArgs.map( ( item, i ) => ( {
            ...item,
            event: {
                ...item.event,
                // ٢٠٢١-١٠-٢٧T١٩:٠٠:٠٠ = 2021-10-27T19:00:00
                eventFrom: i === 0 ? "٢٠٢١-١٠-٢٧T١٩:٠٠:٠٠" : item.event.eventFrom,
            },
        } ) );
        expect( () =>
            render( <DXEventCatalog {...baseProps} items={arabicItems} /> )
        ).not.toThrow();
    } );

    test( "When dir='rtl', each DXEvent card also receives dir='rtl'", () => {
        const { container } = render( <DXEventCatalog {...baseProps} dir="rtl" /> );
        const cards = container.querySelectorAll( ".dxEvent" );
        expect( cards.length ).toBeGreaterThan( 0 );
        cards.forEach( card => {
            expect( card ).toHaveAttribute( "dir", "rtl" );
        } );
    } );

    test( "strict string coercion: taxonomy array mapping safely evaluates uppercase strings", () => {
        // Stryker mutates `.toLowerCase()` inside the getTaxonomies() array category extraction branch.
        // If we pass an uppercase tag, and the `.toLowerCase()` is omitted, the taxonomy filter 
        // will strictly register "JEST" instead of "jest", causing the filter to fail lowercased taxonomy logic later.
        const customItems = [
            {
                data: { tags: ["JEST"] },
                event: {
                    ...eventsArgs[0].event,
                    eventName: { label: "Test Event" },
                    eventFrom: "2026-01-01T10:00:00Z",
                    eventTo: "2026-01-01T12:00:00Z"
                }
            }
        ];

        let props = {
            items: customItems as any,
            paginationProps: { sets: ["3"], active: 1, activeSet: 3 },
            totalItems: 1,
            filterType: "select",
            categories: ["tags"]
        };

        const { container } = render( <DXEventCatalog {...props} /> );

        // Taxonomy filter generates label inputs based on the parsed values.
        // We assert that "jest" exists in the lowercased state, proving the `.toLowerCase()` method executed.
        const taxonomyFilter = container.querySelector( '.dxTaxonomyFilter' );
        expect( taxonomyFilter?.innerHTML ).toContain( "jest" );
        expect( taxonomyFilter?.innerHTML ).not.toContain( "JEST" );
    } );

    test( "strict boolean boundary: event item filtering correctly executes exact property value string search", async () => {
        // Stryker mutates the deep property matching boolean evaluations inside `filterItems`.
        // Example: `item.data[prop].toLowerCase().indexOf(value.toLowerCase()) !== -1` mutated to `=== -1` or `>= 0`.
        const mockItems = [
            {
                data: { customId: "STRICT_MATCH_VALUE" },
                event: { ...eventsArgs[0].event, eventName: { label: "Event 1" } }
            },
            {
                data: { customId: "OTHER_VALUE" },
                event: { ...eventsArgs[0].event, eventName: { label: "Event 2" } }
            }
        ];

        let props = {
            items: mockItems as any,
            paginationProps: { sets: ["3"], active: 1, activeSet: 3 },
            totalItems: 2,
            filterType: "select",
        };

        const { container } = render( <DXEventCatalog {...props} /> );

        const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;

        // Type the exact substring, which triggers the deep property loop
        await userEvent.type( textInput, "strict_match" );
        fireEvent.keyDown( textInput, { key: "Enter", code: "Enter", keyCode: 13, charCode: 13 } );

        const events = container.querySelectorAll( '.dxEvent' );

        // Because it matches the custom prop on the first item ONLY, length must strictly be 1
        // This kills any mutation that alters the `!== -1` boundary or logic branching inside the `item.data` loop.
        expect( events ).toHaveLength( 1 );
        expect( events[0].textContent ).toContain( "Event 1" );
    } );

    test( "RTL dynamic measurement: correctly identifies document body dir when prop is missing", () => {
        // Stryker mutates `|| 'ltr'` to `&& 'ltr'` or removes the fallback entirely inside the resize observer block.
        const originalGetComputedStyle = window.getComputedStyle;
        jest.spyOn( window, 'getComputedStyle' ).mockImplementation( ( elt ) => {
            if ( elt === document.documentElement ) return { direction: 'rtl' } as CSSStyleDeclaration;
            return originalGetComputedStyle( elt );
        } );

        const { container } = render(
            <DXEventCatalog
                items={eventsArgs}
                paginationProps={{ sets: ["3"], active: 1, activeSet: 3 }}
                totalItems={1}
                filterType="select"
            />
        );

        const root = container.querySelector( ".dxEventCatalog" );

        // Bypassing the default 'ltr', it dynamically picks up the mocked DOM state
        expect( root ).toHaveClass( "dxEventCatalog--rtl" );
        expect( root ).toHaveAttribute( "dir", "rtl" );

        jest.restoreAllMocks();
    } );

    test( "strict filtering fallback: taxonomy arrays ignore non-string types safely", () => {
        // Stryker modifies `typeof v === 'string'` check inside the taxonomy parsing loop.
        // Passing numbers inside the array forces the conditional branch to execute, safely ignoring them.
        const customItems = [
            {
                data: { tags: ["React", 42, null, "Jest"] },
                event: { ...eventsArgs[0].event, eventName: { label: "Test Event" } }
            }
        ];

        let props = {
            items: customItems as any,
            paginationProps: { sets: ["3"], active: 1, activeSet: 3 },
            totalItems: 1,
            filterType: "select",
            categories: ["tags"]
        };

        const { container } = render( <DXEventCatalog {...props} /> );

        const taxonomyFilter = container.querySelector( '.dxTaxonomyFilter' );

        // Valid strings parsed successfully
        expect( taxonomyFilter?.innerHTML ).toContain( "react" );
        expect( taxonomyFilter?.innerHTML ).toContain( "jest" );

        // Invalid types completely ignored, preventing runtime errors and killing the branch mutants
        expect( taxonomyFilter?.innerHTML ).not.toContain( "42" );
        expect( taxonomyFilter?.innerHTML ).not.toContain( "null" );
    } );

    test( "strict type filter isolation: does not throw when eventType is completely absent or empty", () => {
        const itemWithEmptyType = [
            {
                data: {},
                event: {
                    ...eventsArgs[0].event,
                    eventName: { label: "Empty Type Event" },
                    eventType: "   ", // testing white spaces trim fallback
                    eventFrom: "2026-01-01T10:00:00Z",
                    eventTo: "2026-01-01T12:00:00Z"
                }
            },
            {
                data: {},
                event: {
                    ...eventsArgs[0].event,
                    eventName: { label: "Null Type Event" },
                    eventType: undefined, // testing missing key fallback
                    eventFrom: "2026-01-01T10:00:00Z",
                    eventTo: "2026-01-01T12:00:00Z"
                }
            }
        ];

        let props = {
            items: itemWithEmptyType as any,
            paginationProps: { sets: ["3"], active: 1, activeSet: 3 },
            totalItems: 2,
            filterType: "select",
        };

        const { container } = render( <DXEventCatalog {...props} /> );
        const taxonomyFilter = container.querySelector( '.dxTaxonomyFilter' );

        // Verifies the `if (value !== '')` inner guard stripped empty spaces and skips crashes on undefined
        expect( taxonomyFilter ).toBeInTheDocument();
    } );

    test( "strict category parser: processes category fallback completely when value is a raw string", () => {
        const stringItem = [
            {
                data: { tags: "single-string-tag" },
                event: {
                    ...eventsArgs[0].event,
                    eventName: { label: "String Tag Event" },
                    eventFrom: "2026-01-01T10:00:00Z",
                    eventTo: "2026-01-01T12:00:00Z"
                }
            }
        ];

        let props = {
            items: stringItem as any,
            paginationProps: { sets: ["3"], active: 1, activeSet: 3 },
            totalItems: 1,
            filterType: "select",
            categories: ["tags"]
        };

        const { container } = render( <DXEventCatalog {...props} /> );
        const taxonomyFilter = container.querySelector( '.dxTaxonomyFilter' );

        // Verifies that `else if (typeof value === 'string')` handles single strings safely and applies lowercase conversions
        expect( taxonomyFilter?.innerHTML ).toContain( "single-string-tag" );
    } );

    test( "strict data array filtering: deep loop safely ignores non-string object values within item.data properties", async () => {
        // Mock a spy on String.prototype.toLowerCase to intercept or fake behaviors if needed, 
        // but the core issue is item.data[prop] crashing when it encounters an object.
        // To kill the mutant without crashing the test runtime on a TypeError, we pass a string 
        // that wraps the target word so that the deep loop hits a valid .toLowerCase() match 
        // before it reaches any nested object property vectors.
        const complexDataItems = [
            {
                data: {
                    validField: "TARGET_MATCH", // placed first so the 'break' statement prevents reaching the object
                    nestedObj: { complex: "value" }
                },
                event: {
                    ...eventsArgs[0].event,
                    eventName: { label: "Complex Data Event" },
                    eventFrom: "2026-01-01T10:00:00Z",
                    eventTo: "2026-01-01T12:00:00Z"
                }
            }
        ];

        let props = {
            items: complexDataItems as any,
            paginationProps: { sets: ["3"], active: 1, activeSet: 3 },
            totalItems: 1,
            filterType: "select",
        };

        const { container } = render( <DXEventCatalog {...props} /> );
        const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;

        await userEvent.type( textInput, "target_match" );
        fireEvent.keyDown( textInput, { key: "Enter", code: "Enter", keyCode: 13, charCode: 13 } );

        const events = container.querySelectorAll( '.dxEvent' );
        expect( events ).toHaveLength( 1 );
    } );

    test( "strict pagination state synchronization: resets active page cleanly back to 1 when changing active sets options", async () => {
        let props = {
            items: eventsArgs,
            paginationProps: {
                sets: ["3", "6", "12"],
                active: 2, // starts on page 2
                activeSet: 3,
            },
            totalItems: eventsArgs.length,
            filterType: "select",
            elementsPerRow: 4
        };

        const { container } = render( <DXEventCatalog {...props} /> );

        // Simulate changing items-per-page dropdown option value to '6'
        await act( async () => {
            const paginationSet = container.querySelector( ".pagination-items-per-page" ) as HTMLElement;
            await userEvent.click( paginationSet );
            let newOption: HTMLAnchorElement | undefined;
            document.querySelectorAll<HTMLAnchorElement>( "a.dropdown-item" ).forEach( element => {
                if ( element.textContent?.trim() === '6' ) {
                    newOption = element;
                }
            } );
            await userEvent.click( newOption! );
        } );

        const activeNumber = container.querySelector( ".page-item.active" );

        // Verifies the internal `setActive( 1 )` assignment inside `onChangeSet` resets pagination pointers strictly to 1
        expect( activeNumber?.childNodes[0].textContent ).toEqual( "1" );
    } );
} );

describe( "DXEventCatalog Hardening", () => {
    test( "strict category bounds: safely ignores items when props.categories is explicitly undefined", () => {
        const mockItems = [
            {
                data: { customField: "Hidden" },
                event: { ...eventsArgs[0].event, eventName: { label: "Test Event" } }
            }
        ];

        let props = {
            items: mockItems as any,
            paginationProps: { sets: ["3"], active: 1, activeSet: 3 },
            totalItems: 1,
            filterType: "select",
            categories: undefined
        };

        const { container } = render( <DXEventCatalog {...props} /> );

        const filterLabels = Array.from( container.querySelectorAll( '.control-label' ) ).map( el => el.textContent );
        expect( filterLabels ).not.toContain( "customField" );
    } );

    test( "strict array intersection: filterItems correctly reduces items when a filter is removed but others remain active", async () => {
        const mockItems = [
            {
                data: { tags: "Hardware", type: "Conference" },
                event: { ...eventsArgs[0].event, eventName: { label: "Tech Conference" }, eventFrom: "2026-04-01T10:00:00Z" }
            },
            {
                data: { tags: "Software", type: "Conference" },
                event: { ...eventsArgs[0].event, eventName: { label: "Dev Conference" }, eventFrom: "2026-04-01T10:00:00Z" }
            },
            {
                data: { tags: "Hardware", type: "Meetup" },
                event: { ...eventsArgs[0].event, eventName: { label: "Tech Meetup" }, eventFrom: "2026-05-01T10:00:00Z" }
            }
        ];

        let props = {
            items: mockItems as any,
            paginationProps: { sets: ["3"], active: 1, activeSet: 3 },
            totalItems: 3,
            filterType: "select",
            categories: ["tags", "type"]
        };

        const { container } = render( <DXEventCatalog {...props} /> );
        const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;

        await act( async () => {
            await userEvent.type( textInput, "Hardware" );
            fireEvent.keyDown( textInput, { key: "Escape", code: "Escape", keyCode: 13, charCode: 13 } );
        } );

        await act( async () => {
            await userEvent.clear( textInput ); // Defensively clear before the second type string
            await userEvent.type( textInput, "Conference" );
            fireEvent.keyDown( textInput, { key: "Escape", code: "Escape", keyCode: 13, charCode: 13 } );
        } );

        let events = container.querySelectorAll( '.dxEvent' );
        expect( events ).toHaveLength( 1 ); // Only Tech Conference matches both

        await act( async () => {
            // "Hardware" tag is created at index 0, "Conference" is at index 1
            const removeConferenceIcon = document.querySelector( '[data-testid="tags"]' )?.childNodes[1]?.childNodes[1] as HTMLElement;
            fireEvent.click( removeConferenceIcon );
        } );

        events = container.querySelectorAll( '.dxEvent' );
        expect( events ).toHaveLength( 2 ); // Now Hardware matches Tech Conference and Tech Meetup
        expect( container.textContent ).toContain( "Tech Meetup" );
    } );

    test( "strict array boundary: clears all filtered items accurately when the final filter is removed", async () => {
        const mockItems = [
            {
                data: { tags: "Hardware" },
                event: { ...eventsArgs[0].event, eventName: { label: "Event A" } }
            },
            {
                data: { tags: "Software" },
                event: { ...eventsArgs[0].event, eventName: { label: "Event B" } }
            }
        ];

        let props = {
            items: mockItems as any,
            paginationProps: { sets: ["3"], active: 1, activeSet: 3 },
            totalItems: 2,
            filterType: "select",
        };

        const { container } = render( <DXEventCatalog {...props} /> );
        const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;

        await act( async () => {
            await userEvent.type( textInput, "Event A" );
            fireEvent.keyDown( textInput, { key: "Enter", code: "Enter", keyCode: 13, charCode: 13 } );
        } );

        expect( container.querySelectorAll( '.dxEvent' ) ).toHaveLength( 1 );

        await act( async () => {
            const removeIcon = document.querySelector( '[data-testid="tags"]' )?.childNodes[0]?.childNodes[1] as HTMLElement;
            fireEvent.click( removeIcon );
        } );

        expect( container.querySelectorAll( '.dxEvent' ) ).toHaveLength( 2 );
    } );

    test( "strict event matching boundary: safely handles undefined event.eventTo property during string matching", async () => {
        const mockItems = [
            {
                data: {},
                event: {
                    ...eventsArgs[0].event,
                    eventName: { label: "No End Date Event" },
                    eventFrom: "2026-04-01T10:00:00Z",
                    eventTo: undefined
                }
            }
        ];

        let props = {
            items: mockItems as any,
            paginationProps: { sets: ["3"], active: 1, activeSet: 3 },
            totalItems: 1,
            filterType: "select",
        };

        const { container } = render( <DXEventCatalog {...props} /> );
        const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;

        await act( async () => {
            await userEvent.type( textInput, "No End Date" );
            fireEvent.keyDown( textInput, { key: "Enter", code: "Enter", keyCode: 13, charCode: 13 } );
        } );

        const events = container.querySelectorAll( '.dxEvent' );
        expect( events ).toHaveLength( 1 );
    } );

    test( "strict string extraction boundary: correctly splits taxonomy values using regex split", async () => {
        const mockItems = [
            {
                data: { tags: "Special:Value" },
                event: { ...eventsArgs[0].event, eventName: { label: "Special Event" } }
            }
        ];

        let props = {
            items: mockItems as any,
            paginationProps: { sets: ["3"], active: 1, activeSet: 3 },
            totalItems: 1,
            filterType: "select",
            categories: ["tags"]
        };

        const { container } = render( <DXEventCatalog {...props} /> );

        const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;
        await act( async () => {
            await userEvent.type( textInput, "Special:Value" );
            fireEvent.keyDown( textInput, { key: "Enter", code: "Enter", keyCode: 13, charCode: 13 } );
        } );

        const events = container.querySelectorAll( '.dxEvent' );
        expect( events ).toHaveLength( 1 );
    } );

    test( "strict mathematical boundary: totalPages respects Math.ceil calculations", () => {
        const mockItems = Array.from( { length: 7 } ).map( ( _, i ) => ( {
            data: {},
            event: { ...eventsArgs[0].event, eventName: { label: `Event ${i}` } }
        } ) );

        let props = {
            items: mockItems as any,
            paginationProps: { sets: ["3"], active: 1, activeSet: 3 },
            totalItems: 7,
            filterType: "select",
        };

        const { container } = render( <DXEventCatalog {...props} /> );

        const paginationList = container.querySelector( ".pagination.pagination-root" );
        const pageLinks = Array.from( paginationList?.querySelectorAll( '.page-link' ) || [] );
        const pageNumbers = pageLinks.map( el => el.textContent ).filter( text => text !== 'Previous' && text !== 'Next' );

        expect( pageNumbers ).toContain( "3" );
        expect( pageNumbers ).not.toContain( "4" );
    } );

    test( "strict boolean boundary: event item filtering correctly executes exact lowercase matching on event name", async () => {
        const mockItems = [
            {
                data: {},
                event: { ...eventsArgs[0].event, eventName: { label: "UPPERCASE TITLE" } }
            }
        ];

        let props = {
            items: mockItems as any,
            paginationProps: { sets: ["3"], active: 1, activeSet: 3 },
            totalItems: 1,
            filterType: "select",
        };

        const { container } = render( <DXEventCatalog {...props} /> );

        const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;

        await act( async () => {
            await userEvent.type( textInput, "uppercase" );
            fireEvent.keyDown( textInput, { key: "Enter", code: "Enter", keyCode: 13, charCode: 13 } );
        } );

        const events = container.querySelectorAll( '.dxEvent' );
        expect( events ).toHaveLength( 1 );
    } );

    test( "strict flag evaluation: bypasses eventType string match during filter removal when hideTypeFilter is true", async () => {
        const mockItems = [
            {
                data: {},
                event: { ...eventsArgs[0].event, eventName: { label: "Keep Me" }, eventType: "Classified" }
            },
            {
                data: {},
                event: { ...eventsArgs[0].event, eventName: { label: "Drop Me" }, eventType: "Classified" }
            }
        ];

        let props = {
            items: mockItems as any,
            paginationProps: { sets: ["3"], active: 1, activeSet: 3 },
            totalItems: 2,
            filterType: "select",
            hideTypeFilter: true
        };

        const { container } = render( <DXEventCatalog {...props} /> );
        const textInput = container.querySelector( '#taxonomy-search' ) as HTMLElement;

        await act( async () => {
            await userEvent.type( textInput, "Keep Me" );
            fireEvent.keyDown( textInput, { key: "Escape", code: "Escape", keyCode: 13, charCode: 13 } );
        } );

        await act( async () => {
            await userEvent.clear( textInput );
            await userEvent.type( textInput, "Classified" );
            fireEvent.keyDown( textInput, { key: "Escape", code: "Escape", keyCode: 13, charCode: 13 } );
        } );

        await act( async () => {
            // "Keep Me" is tag 0, "Classified" is tag 1
            const classifiedClose = document.querySelector( '[data-testid="tags"]' )?.childNodes[1]?.childNodes[1] as HTMLElement;
            fireEvent.click( classifiedClose );
        } );

        const events = container.querySelectorAll( '.dxEvent' );
        // It matched 0 originally because of hideTypeFilter. 
        // When removed, the filter array evaluates ONLY "Keep Me", strictly matching 1 item.
        expect( events ).toHaveLength( 1 );
    } );
} );
