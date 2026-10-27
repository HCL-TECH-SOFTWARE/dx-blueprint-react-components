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
import "./DXDataTable.scss";
import React, { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { parseContentAndMedia } from "../../utilities";
import { StyleSheetManager } from "styled-components";
import isPropValid from '@emotion/is-prop-valid';

export interface Column {
    id: string,
    name: string,
    selector?: Function,
    sortable?: boolean,
    sortFunction?: Function,
    right?: boolean,
    center?: boolean,
    labelElement?: {
        dataProperty: string,
        color?: string;
    };
    dataProp: string,
}

export interface Data {
    [x: string]: any;
    expandableContent?: string;
}

export interface DataTableProps {
    columns: Column[];
    data: Data[];
    responsive?: boolean;
    striped?: boolean;
    noTableHead?: boolean;
    pagination?: boolean;
    paginationPerPage?: number;
    paginationRowsPerPageOptions?: number[];
    expandableRows?: boolean;
    noExpandContentMsg?: string;
}

const DXDataTable = ( props: DataTableProps ) => {
    // States
    const [columns, setColumns] = useState<any>( [] );
    const getColumns = ( cols: Column[] ) => {
        const newCols = cols.map( ( col: Column ) => {
            let newCol = {
                ...col,
                cell: ( row: any ) => (
                    parseContentAndMedia( row[col.dataProp] )
                )
            };
            return newCol;
        } );
        setColumns( [...newCols] );
    };

    const ExpandableComponent = ( { data }: any ) => {
        if ( data.hasOwnProperty( "expandableContent" ) ) {
            return (
                <div>{parseContentAndMedia( data.expandableContent )}</div>
            );
        }
        return (
            <div style={{ padding: ".5rem" }}>
                <p style={{ marginBottom: 0 }}>
                    {props.noExpandContentMsg ? props.noExpandContentMsg : "No content received for this row"}
                </p>
            </div>
        );
    };
    const dataTablePrps = {
        ...props,
        ...( props.expandableRows && {
            expandableRows: true,
            expandableRowsComponent: ExpandableComponent
        } ),
        columns,
        data: props.data,
    };
    useEffect( () => {
        getColumns( props.columns );
    }, [] );
    return (
        <div className="dxDataTable">
            <StyleSheetManager shouldForwardProp={isPropValid} >
                <DataTable {...dataTablePrps} />
            </StyleSheetManager>
        </div>
    );
};
export default DXDataTable;
