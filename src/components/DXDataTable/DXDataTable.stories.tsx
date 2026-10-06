import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXDataTable, { Column, Data } from './DXDataTable';

export default {
    title: "Components/General/Data Table",
    component: DXDataTable,
    excludeStories: /.*Args$/,
} as Meta<typeof DXDataTable>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXDataTable> = ( args ) => <DXDataTable {...args} />;

export const Default = Template.bind( {} );
export const Responsive = Template.bind( {} );
export const Striped = Template.bind( {} );
export const NoTableHead = Template.bind( {} );
export const Pagination = Template.bind( {} );
export const PaginationOpts = Template.bind( {} );
export const Sortable = Template.bind( {} );
export const SortFunction = Template.bind( {} );
export const Expandable = Template.bind( {} );

export const colArgs: Column[] = [
    {
        id: "Title",
        name: 'Title',
        selector: ( row: any ) => row.title,
        dataProp: "title",
    },
    {
        id: "Year",
        name: 'Year',
        selector: ( row: any ) => row.year,
        dataProp: "year"
    },
    {
        id: "Actions",
        name: '',
        dataProp: "movieStatus"
    },
];

export const colSortArgs: Column[] = [
    {
        id: "Title",
        name: 'Title',
        selector: ( row: any ) => row.title,
        dataProp: "title",
        sortable: true
    },
    {
        id: "Year",
        name: 'Year',
        selector: ( row: any ) => row.year,
        dataProp: "year",
        sortable: true
    },
    {
        id: "Actions",
        name: '',
        dataProp: "movieStatus"
    },
];

export const dataArgs: Data[] = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
        movieStatus: `<button>Movie Details</button>`
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
        movieStatus: `<button>Movie Details</button>`
    },
    {
        id: 3,
        title: 'The Cotton Club',
        year: '1984',
        movieStatus: `<button>Movie Details</button>`
    },
    {
        id: 4,
        title: 'The Shawshank Redemption',
        year: '1984',
        movieStatus: `<button>Movie Details</button>`
    },
    {
        id: 5,
        title: 'Crocodile Dundee',
        year: '1986',
        movieStatus: `<button>Movie Details</button>`
    },
    {
        id: 6,
        title: 'Valkyrie',
        year: '2008',
        movieStatus: `<button>Movie Details</button>`
    },
    {
        id: 7,
        title: 'Ratatouille',
        year: '2007',
        movieStatus: `<button>Movie Details</button>`
    },
    {
        id: 8,
        title: 'City of God',
        year: '2002',
        movieStatus: `<button>Movie Details</button>`
    },
    {
        id: 9,
        title: 'Memento',
        year: '2000',
        movieStatus: `<button>Movie Details</button>`
    },
    {
        id: 10,
        title: 'The Intouchables',
        year: '2011',
        movieStatus: `<button>Movie Details</button>`
    },
    {
        id: 11,
        title: 'Stardust',
        year: '2007',
        movieStatus: `<button>Movie Details</button>`
    },
];

export const dataExpandedArgs = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
        movieStatus: `<button>Movie Details</button>`,
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
        movieStatus: `<button>Movie Details</button>`,
        expandableContent: `
        <ul>
            <li>Ghostbusters</li>
            <li>1984</li>
        </ul>
        `
    },
    {
        id: 3,
        title: 'The Cotton Club',
        year: '1984',
        movieStatus: `<button>Movie Details</button>`,
        expandableContent: `
        <ul>
            <li>The Cotton Club</li>
            <li>1984</li>
        </ul>
        `
    },
    {
        id: 4,
        title: 'The Shawshank Redemption',
        year: '1984',
        movieStatus: `<button>Movie Details</button>`,
        expandableContent: `
        <ul>
            <li>The Shawshank Redemption</li>
            <li>1984</li>
        </ul>
        `
    },
    {
        id: 5,
        title: 'Crocodile Dundee',
        year: '1986',
        movieStatus: `<button>Movie Details</button>`,
        expandableContent: `
        <ul>
            <li>Crocodile Dundee</li>
            <li>1986</li>
        </ul>
        `
    },
    {
        id: 6,
        title: 'Valkyrie',
        year: '2008',
        movieStatus: `<button>Movie Details</button>`,
        expandableContent: `
        <ul>
            <li>Valkyrie</li>
            <li>2008</li>
        </ul>
        `
    },
    {
        id: 7,
        title: 'Ratatouille',
        year: '2007',
        movieStatus: `<button>Movie Details</button>`,
        expandableContent: `
        <ul class="ratatouille">
            <li>Ratatouille</li>
            <li>2007</li>
        </ul>
        `
    },
    {
        id: 8,
        title: 'City of God',
        year: '2002',
        movieStatus: `<button>Movie Details</button>`,
        expandableContent: `
        <ul>
            <li>City of God</li>
            <li>2002</li>
        </ul>
        `
    },
    {
        id: 9,
        title: 'Memento',
        year: '2000',
        movieStatus: `<button>Movie Details</button>`,
        expandableContent: `
        <ul>
            <li>Memento</li>
            <li>2000</li>
        </ul>
        `
    },
    {
        id: 10,
        title: 'The Intouchables',
        year: '2011',
        movieStatus: `<button>Movie Details</button>`,
        expandableContent: `
        <ul>
            <li>The Intouchables</li>
            <li>2011</li>
        </ul>
        `
    },
    {
        id: 11,
        title: 'Stardust',
        year: '2007',
        movieStatus: `<button>Movie Details</button>`,
        expandableContent: `
        <ul>
            <li>Stardust</li>
            <li>2007</li>
        </ul>
        `
    },
];

Default.args = {
    columns: colArgs,
    data: dataArgs
};
Responsive.args = {
    columns: colArgs,
    data: dataArgs,
    responsive: true
};
Striped.args = {
    columns: colArgs,
    data: dataArgs,
    striped: true
};
NoTableHead.args = {
    columns: colArgs,
    data: dataArgs,
    noTableHead: true
};
Pagination.args = {
    columns: colArgs,
    data: dataArgs,
    pagination: true
};
PaginationOpts.args = {
    columns: colArgs,
    data: dataArgs,
    pagination: true,
    paginationPerPage: 6,
    paginationRowsPerPageOptions: [3, 6, 9]
};
Sortable.args = {
    columns: colSortArgs,
    data: dataArgs,
};
let sortFnCols = colSortArgs.map( ( col, index ) => {
    if ( index === 0 ) {
        return {
            ...col,
            sortFunction: function ( a: any, b: any ) {
                return a["title"].charCodeAt( a["title"].length - 1 ) - b["title"].charCodeAt( b["title"].length - 1 );
            }
        };
    } else {
        return col;
    }
} );
SortFunction.args = {
    columns: sortFnCols,
    data: dataArgs
};
Expandable.args = {
    columns: colArgs,
    data: dataExpandedArgs,
    expandableRows: true
};
