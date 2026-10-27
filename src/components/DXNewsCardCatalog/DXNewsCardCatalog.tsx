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
import "./DXNewsCardCatalog.scss";
import React, { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DXNewsCard, { NewsCardProps } from "../DXNewsCard/DXNewsCard";
import { getValuesFromDateFormat, getColNumber } from "../../utilities";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";
import DXTaxonomyFilter, { TaxFilterProps, TaxonomyFilterProps } from "../DXTaxonomyFilter/DXTaxonomyFilter";
import DXPagination from "../DXPagination/DXPagination";

export interface NewsCardCatalogProps extends BasicComponent {
    items: NewsCardProps[],
    totalItems: number,
    filterType: string,
    paginationProps: {
        sets: string[],
        active: number,
        activeSet: number;
    },
    searchLabel?: string;
    searchPlaceholder?: string;
    hideFilters?: boolean;
    dateFormat?: string,
    elementsPerRow?: number,
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
const DXNewsCardCatalog = ( props: NewsCardCatalogProps ) => {
    const CATEGORIES = ["contentType", "date"];
    const DEFAULT_DATE_FORMAT = "MM/DD/YY";
    const items: NewsCardProps[] = props.items.map( ( item: NewsCardProps, index: number ) => ( { ...item, index: index } ) );
    /** States */
    const [filteredItems, setFilteredItems] = useState( items );
    const [filteredCount, setFilteredCount] = useState( items.length );
    // Pagination
    const [active, setActive] = useState( props.paginationProps.active );
    const [activeSet, setActiveSet] = useState( props.paginationProps.activeSet );
    /** Taxonomy Logic */
    const getTaxonomies = () => {
        let taxonomyObj: TaxFilterProps[] = [];

        let differentValues: Set<string> = new Set();
        CATEGORIES.forEach( category => {
            props.items.forEach( ( item: NewsCardProps ) => {
                if ( item.hasOwnProperty( category ) ) {
                    if ( category === "date" ) {
                        let formatedDate = getValuesFromDateFormat( item[category], props.dateFormat ? props.dateFormat : DEFAULT_DATE_FORMAT );
                        if ( formatedDate.year && formatedDate.year.trim() !== '' ) {
                            differentValues.add( formatedDate.year );
                        }
                    } else {
                        const value = item[category].toLowerCase().trim();
                        if ( value !== '' ) {
                            differentValues.add( value );
                        }
                    }
                }
            } );
            let filter: TaxFilterProps = {
                label: category === "date" ? "year" : category === "contentType" ? "category" : category,
                attribute: category,
                type: props.filterType,
                values: Array.from( differentValues ).sort() as string[],
            };
            taxonomyObj.push( filter );
            differentValues.clear();
        } );

        return taxonomyObj;
    };

    const filterItems = ( selectedFilters: string[], filter: string, addOrRemove: boolean ) => {
        if ( selectedFilters.length > 0 ) {
            let matches: NewsCardProps[] = [];
            if ( addOrRemove ) {// When a filter is added
                let itemsToSearch: NewsCardProps[] = filteredItems.length > 0 ? [...filteredItems] : [...items];
                let value = filter.split( /:(.*)/s )[1];
                for ( let item of itemsToSearch ) {
                    if ( item.link.label.toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                        matches.push( item );
                        continue;
                    }
                    for ( let prop of CATEGORIES ) {
                        if ( item.hasOwnProperty( prop ) ) {
                            // @ts-ignore
                            if ( item[prop].toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                                matches.push( item );
                                break;
                            } else { continue; }
                        } else { continue; }
                    }
                }
                const newFilteredItems: NewsCardProps[] = matches;
                setFilteredItems( [...newFilteredItems] );
                setFilteredCount( newFilteredItems.length );
            } else {
                // When a filter is removed
                let itemsToSearch: NewsCardProps[] = [...items];
                let matchedItems: NewsCardProps[] = [];

                for ( let i = 0, length = selectedFilters.length; i < length; i++ ) {
                    let value = selectedFilters[i].split( /:(.*)/s )[1];
                    for ( let item of itemsToSearch ) {
                        if ( item.link.label.toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                            matchedItems.push( item );
                            continue;
                        }
                        for ( let prop of CATEGORIES ) {
                            if ( item.hasOwnProperty( prop ) ) {
                                // @ts-ignore
                                if ( item[prop].toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                                    matchedItems.push( item );
                                    break;
                                } else { continue; }
                            } else { continue; }
                        }
                    }
                    itemsToSearch = [...matchedItems];
                    matchedItems = [];
                    continue;

                }
                const newFilteredItems: NewsCardProps[] = itemsToSearch;
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

    /** Pagination logic*/
    const onChangeActive = ( page: number ) => {
        setActive( page );
    };

    const onChangeSet = ( e: any ) => {
        setActiveSet( parseInt( e.target.textContent ) );
        setActive( 1 );
    };

    /** Cards Logic */
    const mapRawData = ( items: NewsCardProps[] ) => {
        let indexOfLastItem = active * activeSet;
        let indexOfFirstItem = indexOfLastItem - activeSet;
        return items.slice( indexOfFirstItem, indexOfLastItem );
    };


    return (
        <div className="dxNewsCardCatalog">
            {
                !props.hideFilters && (
                    hasValidTaxonomyProps( props ) ? (
                        <DXTaxonomyFilter {...taxonomyProps} />
                    ) : ( <span>Invalid or missing props for taxonomy filter</span> )
                )
            }
            <div className="dxNewsCardCatalog__container">
                <Row>
                    {
                        mapRawData( filteredItems ).map( ( item: NewsCardProps ) => (
                            <Col xs={12} key={item.index} className="dxNewsCardCatalog__item" {...getColNumber( props.elementsPerRow ? props.elementsPerRow : 1 )}>
                                <DXNewsCard {...item} />
                            </Col>
                        ) )
                    }
                </Row>
            </div>
            {
                filteredItems.length > 0 ? (
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
                ) : ""
            }
            {props._edit && renderEditButton( props._edit )}
        </div>
    );
};

export default DXNewsCardCatalog;
