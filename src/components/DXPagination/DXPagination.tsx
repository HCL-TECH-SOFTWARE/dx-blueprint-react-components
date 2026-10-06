import React, { ReactElement, useEffect, useState } from 'react';
import "./DXPagination.scss";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Pagination from 'react-bootstrap/Pagination';
import Dropdown from 'react-bootstrap/Dropdown';

export interface PaginationProps {
    sets: string[],
    onChangeSet: Function,
    onChangeActive: Function,
    totalPages: number,
    totalItems: number,
    active: number,
    activeSet: number,
    dropdownOpen?: boolean,
}

const createEllipsisButton = ( options: number[], onChangeActive: Function, key: string, dropdownOpen?: boolean ) => {

    if ( options.length == 1 ) {
        return <Pagination.Item key={`dxPagination-ellipsis-${1}`} onClick={() => { onChangeActive( options[0] ); }}> {options[0]} </Pagination.Item>;
    }

    return (
        <Pagination.Ellipsis key={`dxPagination-item-${key}`} className='dxPagination__ellipsis'>
            <Dropdown className='unstyled' show={dropdownOpen} onToggle={() => {}}>
                <Dropdown.Toggle variant="unstyled" id={`dropdown-basic-${key}`}>
                    ...
                </Dropdown.Toggle>

                <Dropdown.Menu
                    style={dropdownOpen ? { display: 'block', opacity: 1, visibility: 'visible' } : undefined}
                >
                    {
                        options.map( ( item, index ) => <Dropdown.Item key={`dxPagination-ellipsis-${index}`} onClick={() => onChangeActive( item )} href="#/action-1">{item}</Dropdown.Item> )
                    }
                </Dropdown.Menu>
            </Dropdown>
        </Pagination.Ellipsis>
    );
};

const DXPagination = ( props: PaginationProps ) => {
    /** States */
    const [paginationSets, setPaginationSets] = useState<any>( [] );
    const [paginationItems, setPaginationItems] = useState<ReactElement[]>( [] );

    const createSet = () => {
        let newPaginationSets: any[] = [];
        for ( const set of props.sets ) {
            newPaginationSets.push( { label: set, onClick: ( e: any ) => props.onChangeSet( e ) } );
        }
        setPaginationSets( [...newPaginationSets] );
    };

    const createPaginationItems = () => {
        let aux = [
            <Pagination.Prev
                key={"dxPagination-item-first"}
                disabled={props.active == 1 ? true : false}
                onClick={() => props.onChangeActive( props.active - 1 )}
            >
                <i className='bi-chevron-left' />
            </Pagination.Prev>
        ];

        let upperLimit = props.active + 2;
        let lowerLimit = props.active - 2;

        let upperEllipsisCreated = false;
        let lowerEllipsisCreated = false;

        for ( let i = 1; i <= props.totalPages; i++ ) {

            if ( i == 1 || i == props.totalPages || ( i >= lowerLimit && i <= upperLimit ) ) {
                aux.push(
                    <Pagination.Item
                        onClick={( e ) => { props.onChangeActive( Number.parseInt( e.currentTarget.getAttribute( "value" ) as string ) ); }}
                        value={i} key={"dxPagination-item-" + i} active={props.active == i}
                    >
                        {i}
                    </Pagination.Item>
                );
            } else if ( i <= lowerLimit && !lowerEllipsisCreated ) {
                lowerEllipsisCreated = true;
                let excludedItems: number[] = [];
                for ( let j = i; j < lowerLimit; j++ ) {
                    excludedItems.push( j );
                }
                aux.push( createEllipsisButton( excludedItems, props.onChangeActive, "prev", props.dropdownOpen ) );
            } else if ( i >= upperLimit && !upperEllipsisCreated ) {
                upperEllipsisCreated = true;
                let excludedItems: number[] = [];
                for ( let j = i; j < props.totalPages; j++ ) {
                    excludedItems.push( j );
                }
                aux.push( createEllipsisButton( excludedItems, props.onChangeActive, "next", props.dropdownOpen ) );
            }
        }

        aux.push(
            <Pagination.Next
                key={"dxPagination-item-last"}
                disabled={props.active == props.totalPages ? true : false}
                onClick={() => props.onChangeActive( props.active + 1 )}
            >
                <i className='bi-chevron-right' />
            </Pagination.Next>
        );

        setPaginationItems( aux );
    };

    useEffect( () => {
        createPaginationItems();
    }, [props.totalPages, props.active, props.dropdownOpen] );

    useEffect( () => {
        let element = document.querySelector( '.page-item.active .page-link span' );
        if ( element ) {
            element.innerHTML = "";
        }
    } );

    useEffect( () => {
        createSet();
    }, [props.sets] );

    const hasItems = props.totalItems > 0;
    const startEntry = hasItems ? ( props.active - 1 ) * props.activeSet + 1 : 0;
    const endEntry = Math.min( props.active * props.activeSet, props.totalItems );

    return (
        <div className="dxPagination">
            <div className='dxPagination__main' data-testid="pagination">
                <Dropdown className='dxPagination__sets' show={props.dropdownOpen} onToggle={() => {}}>
                    <Dropdown.Toggle className='pagination-items-per-page' variant="unsyled">
                        {`${props.activeSet} Entries`} <i className='bi-chevron-expand'></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                        style={props.dropdownOpen ? { display: 'block', opacity: 1, visibility: 'visible' } : undefined}
                    >
                        {props.sets.map(
                            ( set, index ) => <Dropdown.Item key={`dxPagination-dropdown-${index}`} onClick={( e ) => props.onChangeSet( e )}> {set} </Dropdown.Item> )
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <div className='dxPagination__results'>
                    {`Showing ${startEntry} to ${endEntry} of ${props.totalItems} entries`}
                </div>
                <Pagination className='pagination pagination-root'>
                    {paginationItems}
                </Pagination>
            </div>
        </div>
    );
};

export default DXPagination;
