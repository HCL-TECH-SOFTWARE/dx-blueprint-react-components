import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXDataTable from "./DXDataTable";
import { dataArgs } from "./DXDataTable.stories";

let oneColumn = [
    {
        id: "Title",
        name: 'Title',
        selector: ( row: any ) => row.title,
        dataProp: "title",
    }
];
let oneItem = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
        movieStatus: `<button>Movie Details</button>`,
    },
];

test( "The component should render the correct amount of columns", () => {
    let props = {
        columns: oneColumn,
        data: oneItem
    };

    const { container } = render( <DXDataTable {...props} /> );
    let header = container.querySelector( ".dxDataTable .rdt_Table .rdt_TableHead .rdt_TableHeadRow" );
    expect( header?.childNodes.length ).toBe( props.columns.length );
} );

test( "The component should render the correct amount of rows", () => {
    let props = {
        columns: oneColumn,
        data: oneItem
    };

    const { container } = render( <DXDataTable {...props} /> );
    let rows = container.querySelectorAll( ".dxDataTable .rdt_Table .rdt_TableBody .rdt_TableRow" );
    expect( rows ).toHaveLength( props.data.length );
} );

// Note: The class for the striped row is different on storybook, but adapt it to the class that jest renders
test( "If the user pass the striped prop to the component, the element first row of the table should be grey", () => {
    let props = {
        columns: oneColumn,
        data: oneItem,
        striped: true
    };

    const { container } = render( <DXDataTable {...props} /> );
    let stripedRows = container.querySelector( ".dxDataTable .rdt_Table .rdt_TableBody .rdt_TableRow" );
    let computedStyle
    if(stripedRows != null){
        computedStyle = window.getComputedStyle(stripedRows);
        expect(computedStyle.backgroundColor).toBe('rgb(250, 250, 250)')
    }
} );

test( "If the user does pass the noTableHead prop the element 'rdt_TableHead' should be null", () => {
    let props = {
        columns: oneColumn,
        data: oneItem,
        noTableHead: true
    };

    const { container } = render( <DXDataTable {...props} /> );
    const header = container.querySelector( ".dxDataTable .rdt_Table .rdt_TableHead" );
    expect( header ).toBeNull();
} );

test( "If the user does pass the pagination prop, the element '' will be in the document", () => {
    let props = {
        columns: oneColumn,
        data: dataArgs,
        pagination: true
    };

    const { container } = render( <DXDataTable {...props} /> );
    const pagination = container.querySelector( ".dxDataTable .rdt_Pagination" );
    expect( pagination ).toBeInTheDocument();
} );

test( "If the user does pass the paginationRowsPerPageOptions prop, the element will have those values", () => {
    let props = {
        columns: oneColumn,
        data: dataArgs,
        pagination: true,
        paginationRowsPerPageOptions: [3, 6, 9]
    };

    const { container } = render( <DXDataTable {...props} /> );
    const rowsPerPage = container.querySelector( ".dxDataTable .rdt_Pagination select" );
    let valueRight = 0;
    let options = rowsPerPage?.childNodes;
    options?.forEach( ( child, index ) => {
        let childElement = child as HTMLOptionElement;
        if ( parseInt( childElement.value ) === props.paginationRowsPerPageOptions[index] ) {
            valueRight++;
        }
    } );
    expect( valueRight ).toBe( props.paginationRowsPerPageOptions.length );
} );

// Test for the rich text
test( "If the user pass an anchor for the values on the first column, it will be on the document", () => {
    let props = {
        columns: oneColumn,
        data: [
            {
                id: 1,
                title: '<a id="my-link" href="#">Beetlejuice</a>',
            },
        ]
    };

    const { container } = render( <DXDataTable {...props} /> );
    let anchor = container.querySelector( ".dxDataTable .rdt_Table .rdt_TableBody .rdt_TableRow .rdt_TableCell #my-link" );
    expect( anchor ).toBeInTheDocument();
} );

test( `If the user pass the prop expandableRows but the data does
      not have the expandableContent prop, when the user clicks on the expand button
      a message 'No content received for this row' will appear`, async () => {
    let props = {
        columns: oneColumn,
        data: [
            {
                id: 1,
                title: 'Ghostbusters',
            },
        ],
        expandableRows: true
    };

    const { container } = render( <DXDataTable {...props} /> );
    const button = container.querySelector( ".dxDataTable .rdt_Table .rdt_TableBody .rdt_TableRow button" ) as HTMLButtonElement;
    await userEvent.click( button );
    expect( screen.getByText( "No content received for this row" ) ).toBeInTheDocument();
} );

test( `If the user pass the prop expandableRows and noExpandContentMsg but the data does
      not have the expandableContent prop, when the user clicks on the expand button
      the custom message should appear`, async () => {
    let props = {
        columns: oneColumn,
        data: [
            {
                id: 1,
                title: 'Ghostbusters',
            },
        ],
        expandableRows: true,
        noExpandContentMsg: "I'm empty"
    };

    const { container } = render( <DXDataTable {...props} /> );
    const button = container.querySelector( ".dxDataTable .rdt_Table .rdt_TableBody .rdt_TableRow button" ) as HTMLButtonElement;
    await userEvent.click( button );
    expect( screen.getByText( "I'm empty" ) ).toBeInTheDocument();
} );

test( `If the user pass the prop expandableRows and the data does
      have the expandableContent prop, when the user clicks on the expand button
      the content should be in the document`, async () => {
    let props = {
        columns: oneColumn,
        data: [
            {
                id: 1,
                title: 'Ghostbusters',
                expandableContent: `
                <ul id="my-content">
                    <li>Ghostbusters</li>
                    <li>1984</li>
                </ul>
                `
            },
        ],
        expandableRows: true
    };

    const { container } = render( <DXDataTable {...props} /> );
    const button = container.querySelector( ".dxDataTable .rdt_Table .rdt_TableBody .rdt_TableRow button" ) as HTMLButtonElement;
    await userEvent.click( button );
    const content = container.querySelector( ".dxDataTable .rdt_Table .rdt_TableBody .rdt_ExpanderRow #my-content" );
    expect( content ).toBeInTheDocument();
} );
