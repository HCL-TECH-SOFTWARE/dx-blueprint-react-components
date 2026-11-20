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

import "./DXFullImageCatalog.scss";
import React, { useState, useEffect } from "react";
import DXFullImageCard, { FullImageCardProps } from "../DXFullImageCard/DXFullImageCard";
import DXPagination from "../DXPagination";
import DXTaxonomyFilter from "../DXTaxonomyFilter";
import { TaxFilterProps, TaxonomyFilterProps } from "../DXTaxonomyFilter/DXTaxonomyFilter";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getColNumber } from "../../utilities";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";
import { ExtendableProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface FullImageCatalogItem {
    data: {};
    card: FullImageCardProps;
    index?: number;
}
export interface FullImageCatalogProps extends BasicComponent {
    items: FullImageCatalogItem[],
    paginationProps: {
        sets: string[],
        active: number,
        activeSet: number;
    },
    totalItems: number,
    filterType: string,
    categories: string[],
    hideFilters?: boolean,
    searchLabel?: string,
    searchPlaceholder?: string,
    elementsPerRow?: number;
}
const hasValidTaxonomyProps = ( properties: any ) => {
    return 'totalItems' in properties && 'filterType' in properties && 'categories' in properties &&
        properties.categories.length > 0;
};

const hasValidPaginationProps = ( properties: any ) => {
    return 'sets' in properties.paginationProps && properties.paginationProps.sets.length > 0 &&
        'active' in properties.paginationProps && 'activeSet' in properties.paginationProps;
};

/*
** @deprecated: From @version 1.31.0-alpha use DXGenericCatalog instead
*/
const DXFullImageCatalog = ( props: ExtendableProps<FullImageCatalogProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { items: _items, paginationProps: _paginationProps, totalItems: _totalItems, filterType: _filterType, categories: _categories, hideFilters: _hideFilters, searchLabel: _searchLabel, searchPlaceholder: _searchPlaceholder, elementsPerRow: _elementsPerRow, _edit, className, ref, ...rest } = props;
    const items: FullImageCatalogItem[] = props.items.map( ( item: FullImageCatalogItem, index: number ) => ( { ...item, index: index } ) );
    /** STATES */
    // TaxonomyFilter
    const [filteredItems, setFilteredItems] = useState( items );
    const [filteredCount, setFilteredCount] = useState( items.length );
    // Pagination
    const [active, setActive] = useState( props.paginationProps.active );
    const [activeSet, setActiveSet] = useState( props.paginationProps.activeSet );
    const shortestSet = props.paginationProps.sets ? parseInt( props.paginationProps.sets[0] ) : 0;

    /** Taxonomy Logic */
    const getTaxonomies = () => {
        let taxonomyObj: TaxFilterProps[] = [];

        let differentValues: any = new Set();
        if ( props.categories !== undefined && props.categories.length > 0 ) {
            props.categories.forEach( category => {
                props.items.forEach( ( item: any ) => {
                    if ( item.data.hasOwnProperty( category ) ) {
                        if ( Array.isArray( item.data[category] ) ) {
                            item.data[category].map( ( itemAttribute: string ) => {
                                const value = itemAttribute.toLowerCase().trim();
                                if ( value !== '' ) {
                                    differentValues.add( value );
                                }
                            } );
                        } else {
                            const value = item.data[category].toLowerCase().trim();
                            if ( value !== '' ) {
                                differentValues.add( value );
                            }
                        }
                    }
                } );
                let filter: TaxFilterProps = {
                    label: category,
                    attribute: category,
                    type: props.filterType,
                    values: Array.from( differentValues ).sort() as string[],
                };
                taxonomyObj.push( filter );
                differentValues.clear();
            } );

            return taxonomyObj;
        } else {
            return [];
        }
    };

    const filterItems = ( selectedFilters: string[], filter: string, addOrRemove: boolean ) => {
        if ( selectedFilters.length > 0 ) {
            let matches: any[] = [];
            if ( addOrRemove ) {// When a filter is added
                let itemsToSearch: { data: {}, card: FullImageCardProps; }[] = filteredItems.length > 0 ? [...filteredItems] : [...items];
                let value = filter.split( /:(.*)/s )[1];
                for ( let item of itemsToSearch ) {
                    if ( item.card.description.toLowerCase().indexOf( value.toLocaleLowerCase() ) !== -1 ) {
                        matches.push( item );
                        continue;
                    }
                    for ( let prop in item.data ) {
                        // @ts-ignore: Ignoring error since prop indexes a string property
                        if ( Array.isArray( item.data[prop] ) ) {
                            // @ts-ignore: Ignoring error since prop indexes a string property
                            item.data[prop].map( ( itemAttribute: string ) => {
                                if ( itemAttribute.toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                                    matches.push( item );
                                }
                            } );
                        } else {
                            // @ts-ignore: Ignoring error since prop indexes a string property
                            if ( item.data[prop].toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                                matches.push( item );
                                break;
                            } else { continue; }
                        }
                    }
                }
                const newFilteredItems = matches;
                setFilteredItems( [...newFilteredItems] );
                setFilteredCount( newFilteredItems.length );
            } else {// When a filter is removed
                let itemsToSearch: { data: {}, card: FullImageCardProps; }[] = [...items];
                let matchedItems: { data: {}, card: FullImageCardProps; }[] = [];

                for ( let i = 0, length = selectedFilters.length; i < length; i++ ) {
                    let value = selectedFilters[i].split( /:(.*)/s )[1];
                    for ( let item of itemsToSearch ) {
                        if ( item.card.description.toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                            matchedItems.push( item );
                            continue;
                        }
                        for ( let prop in item.data ) {
                            // @ts-ignore: Ignoring error since prop indexes a string property
                            if ( Array.isArray( item.data[prop] ) ) {
                                // @ts-ignore: Ignoring error since prop indexes a string property
                                item.data[prop].map( ( itemAttribute: string ) => {
                                    if ( itemAttribute.toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                                        matchedItems.push( item );
                                    }
                                } );
                            } else {
                                // @ts-ignore: Ignoring error since prop indexes a string property
                                if ( item.data[prop].toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                                    matchedItems.push( item );
                                    break;
                                } else { continue; }
                            }
                        }
                    }
                    itemsToSearch = [...matchedItems];
                    matchedItems = [];
                    continue;

                }
                const newFilteredItems: any[] = itemsToSearch;
                setFilteredItems( [...newFilteredItems] );
                setFilteredCount( newFilteredItems.length );
            }
        } else {
            setFilteredItems( [...items] );
            setFilteredCount( items.length );
        }
    };
    const taxonomyProps: TaxonomyFilterProps = {
        totalItems: props.totalItems,
        filters: getTaxonomies(),
        filteredCount: filteredCount,
        filterItems,
        searchLabel: props.searchLabel ? props.searchLabel : "",
        searchPlaceholder: props.searchPlaceholder ? props.searchPlaceholder : ""
    };

    useEffect( () => {
        getTaxonomies();
    }, [props.items] );

    /** Pagination Logic */
    const onChangeActive = ( page: number ) => {
        setActive( page );
    };

    const onChangeSet = ( e: any ) => {
        setActiveSet( parseInt( e.target.textContent ) );
        setActive( 1 );
    };
    /** FullImageCards Logic */
    const mapRawData = ( items: any[] ) => {
        let indexOfLastItem = active * activeSet;
        let indexOfFirstItem = indexOfLastItem - activeSet;
        return items.slice( indexOfFirstItem, indexOfLastItem );
    };

    return (
        <div {...rest} ref={ref} className={classNames( "dxFullImageCatalog", className )}>
            {
                !props.hideFilters ? (
                    hasValidTaxonomyProps( props ) ? (
                        <DXTaxonomyFilter {...taxonomyProps} />
                    ) : ( <span>Invalid or missing props for taxonomy filter</span> )
                ) : null
            }
            <div className="dxFullImageCatalog__container">
                <Row>
                    {
                        mapRawData( filteredItems ).map( ( item: FullImageCatalogItem ) => (
                            <Col xs={12} key={item.index} className="dxFullImageCatalog__item" {...getColNumber( props.elementsPerRow )}>
                                <DXFullImageCard {...item.card} />
                            </Col>
                        ) )
                    }
                </Row>
            </div>
            {shortestSet < filteredItems.length ? (
                hasValidPaginationProps( props ) ? (
                    <DXPagination
                        sets={props.paginationProps.sets}
                        totalItems={filteredItems.length}
                        active={active}
                        activeSet={activeSet}
                        onChangeActive={onChangeActive}
                        onChangeSet={onChangeSet}
                        totalPages={Math.ceil( filteredItems.length / activeSet )} />
                ) : ( <span>Invalid or missing props for pagination</span> )
            ) : null}
            {props._edit && renderEditButton( props._edit )}
        </div>
    );
};

export default DXFullImageCatalog;
