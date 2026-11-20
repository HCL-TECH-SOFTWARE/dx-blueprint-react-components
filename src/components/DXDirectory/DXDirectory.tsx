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

import "./DXDirectory.scss";
import React, { useState, useEffect } from "react";
import DXDirectoryCard, { DirectoryCardProps } from "../DXDirectoryCard/DXDirectoryCard";
import DXPagination from "../DXPagination/DXPagination";
import DXTaxonomyFilter, { TaxFilterProps, TaxonomyFilterProps } from "../DXTaxonomyFilter/DXTaxonomyFilter";
import { ExtendableProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface DirectoryProps {
    items: DirectoryItem[];
    paginationProps: {
        sets: string[];
        active: number;
        activeSet: number;
    };
    totalItems: number;
    filterType: string;
    categories?: string[];
    hideFilters?: boolean;
    searchLabel?: string;
    searchPlaceholder?: string;
}

export interface DirectoryItem {
    data: {};
    card: DirectoryCardProps;
    index?: number;
}

const hasValidTaxonomyProps = ( properties: any ) => {
    return 'totalItems' in properties && 'filterType' in properties;
};

const hasValidPaginationProps = ( properties: any ) => {
    return 'sets' in properties.paginationProps && properties.paginationProps.sets.length > 0 &&
        'active' in properties.paginationProps && 'activeSet' in properties.paginationProps;
};

/*
** @deprecated: From @version 1.31.0-alpha use DXGenericCatalog instead
*/
const DXDirectory = ( props: ExtendableProps<DirectoryProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { items: _items, paginationProps: _paginationProps, totalItems: _totalItems, filterType: _filterType, categories: _categories, hideFilters: _hideFilters, searchLabel: _searchLabel, searchPlaceholder: _searchPlaceholder, className, ref, ...rest } = props;
    const items: DirectoryItem[] = props.items.map( ( item: DirectoryItem, index: number ) => ( { ...item, index: index } ) );
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
        let differentValues: Set<string> = new Set();
        if ( props.categories !== undefined && props.categories.length > 0 ) {
            props.categories.forEach( category => {
                props.items.forEach( ( item: any ) => {
                    if ( item.data.hasOwnProperty( category ) ) {
                        const value = item.data[category].toLowerCase().trim();
                        if ( value !== '' ) {
                            differentValues.add( value );
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
                let itemsToSearch: { data: {}, card: DirectoryCardProps; }[] = filteredItems.length > 0 ? [...filteredItems] : [...items];
                let value = filter.split( /:(.*)/s )[1];
                for ( let item of itemsToSearch ) {
                    // Filter by title
                    if ( item.card.title.toLowerCase().indexOf( value.toLocaleLowerCase() ) !== -1 ) {
                        matches.push( item );
                        continue;
                    }
                    // Filter by any other prop in data
                    for ( let prop in item.data ) {
                        // @ts-ignore
                        if ( item.data[prop].toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                            matches.push( item );
                            break;
                        } else { continue; }
                    }
                }
                const newFilteredItems: any[] = matches;
                setFilteredItems( [...newFilteredItems] );
                setFilteredCount( newFilteredItems.length );
            } else {// When a filter is removed
                let itemsToSearch: { data: {}, card: DirectoryCardProps; }[] = [...items];
                let matchedItems: { data: {}, card: DirectoryCardProps; }[] = [];

                for ( let i = 0, length = selectedFilters.length; i < length; i++ ) {
                    let value = selectedFilters[i].split( /:(.*)/s )[1];
                    for ( let item of itemsToSearch ) {
                        // Filter by title
                        if ( item.card.title.toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                            matchedItems.push( item );
                            continue;
                        }
                        // Filter by any other prop in data
                        for ( let prop in item.data ) {
                            // @ts-ignore
                            if ( item.data[prop].toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                                matchedItems.push( item );
                                break;
                            } else { continue; }
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

    /** Cards Logic */
    const mapRawData = ( items: any[] ) => {
        let indexOfLastItem = active * activeSet;
        let indexOfFirstItem = indexOfLastItem - activeSet;
        return items.slice( indexOfFirstItem, indexOfLastItem );
    };

    return (
        <div {...rest} ref={ref} className={classNames( "dxDirectory", className )}>
            {
                !props.hideFilters ? (
                    hasValidTaxonomyProps( props ) ? (
                        <DXTaxonomyFilter {...taxonomyProps} />
                    ) : ( <span>Invalid or missing props for taxonomy filter</span> )
                ) : null
            }
            <div className="dxDirectory__items">
                {
                    mapRawData( filteredItems ).map( ( item: DirectoryItem ) => (
                        <div className="dxDirectory__item" key={item.index}>
                            <DXDirectoryCard {...item.card} />
                        </div>
                    ) )
                }
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
        </div>
    );
};

export default DXDirectory;
