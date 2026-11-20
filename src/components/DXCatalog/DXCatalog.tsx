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

import "./DXCatalog.scss";

import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DXTaxonomyFilter, { TaxFilterProps, TaxonomyFilterProps } from "../DXTaxonomyFilter/DXTaxonomyFilter";
import DXPagination from "../DXPagination/DXPagination";
import DXCard, { CardProps } from "../DXCard/DXCard";
import { getColNumber } from "../../utilities";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";
import { ExtendableProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface CatalogProps extends BasicComponent {
    items: CardProps[],
    totalItems: number,
    filterType: string,
    paginationProps: {
        sets: string[],
        active: number,
        activeSet: number;
    },
    categories: string[];
    searchLabel?: string;
    searchPlaceholder?: string;
    hideFilters?: boolean;
    elementsPerRow?: number;
    masonryLayout?: boolean;
    maxCardHeight?: string;
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
const DXCatalog = ( props: ExtendableProps<CatalogProps, "section"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { items: _items, totalItems: _totalItems, filterType: _filterType, paginationProps: _paginationProps, categories: _categories, searchLabel: _searchLabel, searchPlaceholder: _searchPlaceholder, hideFilters: _hideFilters, elementsPerRow: _elementsPerRow, masonryLayout: _masonryLayout, maxCardHeight: _maxCardHeight, _edit, className, ref, ...rest } = props;

    document.documentElement.style.setProperty( '--cardMaxHeight', props.maxCardHeight ? props.maxCardHeight.toString() : "350px" );

    function resizeGridItem( item: HTMLElement ) {
        let grid = document.getElementsByClassName( "dxCatalog--layout-masonry" )[0];
        let rowHeight = parseInt( window.getComputedStyle( grid ).getPropertyValue( 'grid-auto-rows' ) );
        let rowGap = parseInt( window.getComputedStyle( grid ).getPropertyValue( 'grid-row-gap' ) );
        let itemContent = item.querySelector( '.dxCatalog__content' );
        if ( itemContent ) {
            let test: HTMLElement = item.children[0] as HTMLElement;
            test.style.height = "";
            let rowSpan = Math.ceil( ( itemContent.getBoundingClientRect().height + rowGap ) / ( rowHeight + rowGap ) );
            item.style.gridRowEnd = "span " + rowSpan;
            test.style.height = "100%";
        }

    }

    function resizeCatalogItem( item: HTMLElement ) {
        let remainingHeight = parseInt( props.maxCardHeight ? props.maxCardHeight : "350" );
        let imageContainer = item.querySelector( ".dxCard__image" );
        if ( imageContainer ) {
            remainingHeight -= imageContainer.getBoundingClientRect().height;
        }
        let labelContainer = item.querySelector( ".dxCard__top" );
        if ( labelContainer ) {
            remainingHeight -= labelContainer.getBoundingClientRect().height;
        }

        let headerContainer = item.querySelector( ".dxCard__body h3" );
        if ( headerContainer ) {
            remainingHeight -= headerContainer.getBoundingClientRect().height;
        }

        let bodyContainer = item.querySelector<HTMLElement>( ".dxCard__body p" );
        if ( bodyContainer ) {
            let lineHight = parseInt( getComputedStyle( bodyContainer ).lineHeight );
            let pMargin = parseInt( getComputedStyle( bodyContainer ).marginBottom );
            //@ts-ignore
            remainingHeight -= pMargin;
            if ( lineHight ) {
                let lineToShow = Math.floor( remainingHeight / lineHight ) - 1;
                bodyContainer.style.webkitLineClamp = "";
                if ( lineToShow ) {
                    bodyContainer.style.webkitLineClamp = String( lineToShow );
                } else {
                    bodyContainer.style.webkitLineClamp = String( 1 );
                }
            }

        }

    }

    function resizeAllGridItems() {
        let allItems = document.getElementsByClassName( "dxCatalog__item" );
        for ( let x = 0; x < allItems.length; x++ ) {
            resizeGridItem( allItems[x] as HTMLElement );
        }
    }

    function resizeCatalogItems() {
        let allItems = document.getElementsByClassName( "dxCard" );
        for ( let x = 0; x < allItems.length; x++ ) {
            resizeCatalogItem( allItems[x] as HTMLElement );
        }
    }

    useEffect( () => {
        const handleLineResize = () => {
            if ( props.masonryLayout ) {
                resizeAllGridItems();
            }
            resizeCatalogItems();
        };
        handleLineResize();
        window.addEventListener( "resize", handleLineResize );
        return () => window.removeEventListener( "resize", handleLineResize );
    } );



    /** States */
    const items: CardProps[] = props.items.map( ( item: CardProps, index: number ) => ( { ...item, index: index } ) );
    const [filteredItems, setFilteredItems] = useState( items );
    const [filteredCount, setFilteredCount] = useState( items.length );
    // Pagination
    const [active, setActive] = useState( props.paginationProps.active );
    const [activeSet, setActiveSet] = useState( props.paginationProps.activeSet );

    /** Taxonomy Logic */
    const getTaxonomies = () => {
        let taxonomyObj: TaxFilterProps[] = [];

        let differentValues: any = new Set();
        if ( props.categories !== undefined && props.categories.length > 0 ) {
            props.categories.forEach( category => {
                props.items.forEach( item => {
                    if ( item._taxonomies.hasOwnProperty( category ) ) {
                        if ( Array.isArray( item._taxonomies[category] ) ) {
                            item._taxonomies[category].map( ( itemAttribute: string ) => {
                                const value = itemAttribute.toLowerCase().trim();
                                if (value !== '') {
                                    differentValues.add(value);
                                }
                            } );
                        } else {
                            const value = item._taxonomies[category].toLowerCase().trim();
                            if (value !== '') {
                                differentValues.add(value);
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
            let matches: CardProps[] = [];
            if ( addOrRemove ) {// When a filter is added
                let itemsToSearch: CardProps[] = filteredItems.length > 0 ? [...filteredItems] : [...items];
                let value = filter.split( /:(.*)/s )[1];
                for ( let item of itemsToSearch ) {
                    if ( item.title.label.toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                        matches.push( item );
                        continue;
                    }
                    for ( let prop in item._taxonomies ) {
                        if ( Array.isArray( item._taxonomies[prop] ) ) {
                            item._taxonomies[prop].map( ( itemAttribute: string ) => {
                                if ( itemAttribute.toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                                    matches.push( item );
                                }
                            } );
                        } else {
                            if ( item._taxonomies[prop].toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                                matches.push( item );
                                break;
                            } else {
                                continue;
                            }
                        }
                    }
                }
                const newFilteredItems: CardProps[] = matches;
                setFilteredItems( [...newFilteredItems] );
                setFilteredCount( newFilteredItems.length );
            } else {// When a filter is removed
                let itemsToSearch: CardProps[] = [...items];
                let matchedItems: CardProps[] = [];

                for ( let i = 0, length = selectedFilters.length; i < length; i++ ) {
                    let value = selectedFilters[i].split( /:(.*)/s )[1];
                    for ( let item of itemsToSearch ) {
                        if ( item.title.label.toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                            matchedItems.push( item );
                            continue;
                        }
                        for ( let prop in item._taxonomies ) {
                            if ( Array.isArray( item._taxonomies[prop] ) ) {
                                item._taxonomies[prop].map( ( itemAttribute: string ) => {
                                    if ( itemAttribute.toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                                        matchedItems.push( item );
                                    }
                                } );
                            } else {
                                if ( item._taxonomies[prop].toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                                    matchedItems.push( item );
                                    break;
                                } else {
                                    continue;
                                }
                            }
                        }
                    }
                    itemsToSearch = [...matchedItems];
                    matchedItems = [];
                    continue;
                }
                const newFilteredItems: CardProps[] = itemsToSearch;
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
    const mapRawData = ( items: any[] ) => {
        let indexOfLastItem = active * activeSet;
        let indexOfFirstItem = indexOfLastItem - activeSet;
        return items.slice( indexOfFirstItem, indexOfLastItem );
    };

    /** Render methods */
    const renderCards = ( items: CardProps[] ) => {
        if ( props.masonryLayout ) {
            let itemIndex = 0;
            return (
                <div className="dxCatalog--layout-masonry">
                    {
                        mapRawData( items ).map( ( item: CardProps, index: number ) => (
                            <div className="dxCatalog__item" key={itemIndex++}>
                                <div className="dxCatalog__content">
                                    <DXCard className="dxCatalog__content" {...item} />
                                </div>
                            </div>
                        ) )
                    }
                </div>
            );
        }
        else {
            return (
                <Row>
                    {
                        mapRawData( items ).map( ( item: CardProps ) => (
                            <Col xs={12} key={item.index} className="dxCatalog--layout-grid" {...getColNumber( props.elementsPerRow )}>
                                <DXCard {...item} />
                            </Col>
                        ) )
                    }
                </Row>
            );
        }
    };

    return (
        <section {...rest} ref={ref} className={classNames( "dxCatalog", className )}>
            {
                !props.hideFilters ? (
                    hasValidTaxonomyProps( props ) ? (
                        <DXTaxonomyFilter {...taxonomyProps} />
                    ) : ( <span>Invalid or missing props for taxonomy filter</span> )
                ) : null
            }
            <div className="dxCatalog__cards">
                {renderCards( filteredItems )}
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
        </section>
    );
};

export default DXCatalog;
