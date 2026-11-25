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

import "./DXEventCatalog.scss";
import React, { useState, useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DXPagination from "../DXPagination/DXPagination";
import DXEvent, { EventProps } from "../DXEvent/DXEvent";
import DXTaxonomyFilter, { TaxFilterProps, TaxonomyFilterProps } from "../DXTaxonomyFilter/DXTaxonomyFilter";
import { getColNumber } from "../../utilities";
import { formatDate, parseDate } from "../../utilities/dateTime";
import { normalizeLocaleNumerals } from "../../utilities/cec-utils";
export interface EventCatalogProps {
    items: EventCatalogItem[],
    totalItems: number,
    paginationProps: {
        sets: string[],
        active: number,
        activeSet: number;
    },
    filterType: string,
    categories?: string[],
    hideFilters?: boolean,
    elementsPerRow?: number,
    searchLabel?: string,
    searchPlaceholder?: string,
    hideTypeFilter?: boolean,
    /** Text direction. Omit to auto-detect from <html dir>. */
    dir?: 'ltr' | 'rtl',
}
export interface EventCatalogItem {
    data: {},
    event: EventProps;
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
const DXEventCatalog = ( props: EventCatalogProps ) => {
    /** States */
    const [filteredItems, setFilteredItems] = useState( props.items );
    const [filteredCount, setFilteredCount] = useState( props.items.length );
    // Pagination
    const [active, setActive] = useState( props.paginationProps.active );
    const [activeSet, setActiveSet] = useState( props.paginationProps.activeSet );
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const ISORegex = new RegExp( /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/gm );
    // RTL direction detection — auto-detect from <html dir> with MutationObserver.
    // This is the fix for DXQ-48222: when DX portal sets <html dir="rtl"> the Bootstrap Row
    // inside this catalog flows RTL and the portlet's overflow:hidden clips the cards.
    // Setting dir explicitly on the root element and each DXEvent card prevents this.
    const [documentDir, setDocumentDir] = useState<'ltr' | 'rtl'>( () => {
        if ( typeof document !== 'undefined' ) {
            return ( getComputedStyle( document.documentElement ).direction as 'ltr' | 'rtl' ) || 'ltr';
        }
        return 'ltr';
    } );
    useEffect( () => {
        if ( props.dir ) return;
        const update = () => {
            if ( typeof document !== 'undefined' ) {
                setDocumentDir( ( getComputedStyle( document.documentElement ).direction as 'ltr' | 'rtl' ) || 'ltr' );
            }
        };
        update();
        const observer = new MutationObserver( update );
        if ( typeof document !== 'undefined' ) {
            observer.observe( document.documentElement, { attributes: true, attributeFilter: ['dir'] } );
        }
        return () => observer.disconnect();
    }, [props.dir] );
    const resolvedDir: 'ltr' | 'rtl' = props.dir ?? documentDir;
    /** Taxonomy Logic */
    const getTaxonomies = () => {
        let taxonomyObj: TaxFilterProps[] = [];
        let differentValues: any = new Set();
        // Get the months filter
        let months = getMonths();
        if ( months ) taxonomyObj.push( months );
        // Get the event type filter
        let differentTypes: any = new Set();
        props.items.forEach( item => {
            if ( item.event.eventType ) {
                const value = item.event.eventType.toLowerCase().trim();
                if ( value !== '' ) {
                    differentTypes.add( value );
                }
            }
        } );
        let sortedTypes = Array.from( differentTypes ).sort() as string[];
        let typeFilter: TaxFilterProps = {
            label: "Event Type",
            type: 'select',
            attribute: 'type',
            values: sortedTypes
        };
        taxonomyObj.push( typeFilter );
        // Check if there is any extra filter passed by the user
        if ( props.categories !== undefined && props.categories.length > 0 ) {
            props.categories.forEach( category => {
                props.items.forEach( ( item: any ) => {
                    if ( item.data.hasOwnProperty( category ) ) {
                        const value = item.data[category];
                        if ( Array.isArray( value ) ) {
                            value.forEach( ( v: any ) => {
                                if ( typeof v === 'string' ) {
                                    const val = v.toLowerCase().trim();
                                    if ( val !== '' ) {
                                        differentValues.add( val );
                                    }
                                }
                            } );
                        } else if ( typeof value === 'string' ) {
                            const val = value.toLowerCase().trim();
                            if ( val !== '' ) {
                                differentValues.add( val );
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
        }
        return taxonomyObj;
    };
    const getMonths = (): ( TaxFilterProps | undefined ) => {
        let items: { data: {}, event: EventProps; }[] = filteredItems.length > 0 ? [...filteredItems] : [...props.items];
        let eventsFrom: string[] = items.map( item => item.event.eventFrom ) as string[];
        let eventsTo: string[] = items.map( item => item.event.eventTo ) as string[];
        let allMonths = new Set();
        // Getting all the months
        eventsFrom.forEach( from => {
            const normFrom = from ? normalizeLocaleNumerals( from ) : from;
            if ( ISORegex.test( normFrom ) ) {
                let month = formatDate( parseDate( normFrom ), "MMMM" );
                if ( !allMonths.has( month ) ) allMonths.add( month );
            }
        } );
        eventsTo.forEach( to => {
            const normTo = to ? normalizeLocaleNumerals( to ) : to;
            if ( ISORegex.test( normTo ) ) {
                let month = formatDate( parseDate( normTo ), "MMMM" );
                if ( !allMonths.has( month ) ) allMonths.add( month );
            }
        } );
        let sortedEvents = Array.from( allMonths ).sort( ( a: any, b: any ) => months.indexOf( a ) - months.indexOf( b ) ) as string[];
        if ( sortedEvents.length === 0 ) {
            console.warn( "The dates either in from or to don't have the correct ISO Format" );
            return undefined;
        }
        return {
            label: "Month",
            type: 'select',
            attribute: 'month',
            values: sortedEvents
        };
    };
    const filterItems = ( selectedFilters: string[], filter: string, addOrRemove: boolean ) => {
        if ( selectedFilters.length > 0 ) {
            let matches: any[] = [];
            if ( addOrRemove ) {// When a filter is added
                let itemsToSearch: { data: {}, event: EventProps; }[] = filteredItems.length > 0 ? [...filteredItems] : [...props.items];
                let value = filter.split( /:(.*)/s )[1];
                for ( let item of itemsToSearch ) {
                    // Check the months
                    let monthFrom = formatDate( parseDate( normalizeLocaleNumerals( item.event.eventFrom || '' ) ), "MMMM" ).toLowerCase();
                    let monthTo = formatDate( parseDate( normalizeLocaleNumerals( item.event.eventTo || '' ) ), "MMMM" ).toLowerCase();
                    if ( value === monthFrom || value === monthTo ) {
                        matches.push( item );
                        continue;
                    }
                    // Check the event's type
                    if ( !props.hideTypeFilter ) {
                        if ( item.event.eventType?.toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                            matches.push( item );
                            continue;
                        }
                    }
                    // Check the event's name
                    if ( item.event.eventName.label.toLowerCase().indexOf( value.toLocaleLowerCase() ) !== -1 ) {
                        matches.push( item );
                        continue;
                    }
                    // Check any other filter
                    for ( let prop in item.data ) {
                        // @ts-ignore
                        if ( item.data[prop].toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                            matches.push( item );
                            break;
                        } else { continue; }
                    }
                }
                const newFilteredItems = matches;
                setFilteredItems( [...newFilteredItems] );
                setFilteredCount( newFilteredItems.length );
            } else {// When a filter is removed
                let itemsToSearch: { data: {}, event: EventProps; }[] = [...props.items];
                let matchedItems: { data: {}, event: EventProps; }[] = [];
                for ( let i = 0, length = selectedFilters.length; i < length; i++ ) {
                    let value = selectedFilters[i].split( /:(.*)/s )[1];
                    for ( let item of itemsToSearch ) {
                        let monthFrom = formatDate( parseDate( normalizeLocaleNumerals( item.event.eventFrom || '' ) ), "MMMM" ).toLowerCase();
                        let monthTo = formatDate( parseDate( normalizeLocaleNumerals( item.event.eventTo || '' ) ), "MMMM" ).toLowerCase();
                        // Check the months
                        if ( value.toLowerCase() === monthFrom || value.toLowerCase() === monthTo ) {
                            matchedItems.push( item );
                            continue;
                        }
                        if ( !props.hideTypeFilter ) {
                            // Check the event's type
                            if ( item.event.eventType?.toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                                matchedItems.push( item );
                                continue;
                            }
                        }
                        // Check the event's name
                        if ( item.event.eventName.label.toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                            matchedItems.push( item );
                            continue;
                        }
                        // Check any other filter
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
                const newFilteredItems = itemsToSearch;
                setFilteredItems( [...newFilteredItems] );
                setFilteredCount( newFilteredItems.length );
            }
        } else {
            setFilteredItems( [...props.items] );
            setFilteredCount( props.items.length );
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
    const renderEvents = ( items: any[] ) => {
        return (
            <Row>
                {
                    mapRawData( items ).map( ( item: any, index: number ) => (
                        <Col className="dxEventCatalog__col" xs={12} key={index} {...getColNumber( props.elementsPerRow )}>
                            <DXEvent {...item.event} dir={resolvedDir} />
                        </Col>
                    ) )
                }
            </Row>
        );
    };
    return (
        <div className={`dxEventCatalog${resolvedDir === 'rtl' ? ' dxEventCatalog--rtl' : ''}`} dir={resolvedDir}>
            {
                !props.hideFilters ? (
                    hasValidTaxonomyProps( props ) ? (
                        <DXTaxonomyFilter {...taxonomyProps} />
                    ) : ( <span>Invalid or missing props for taxonomy filter</span> )
                ) : null
            }
            <div className="dxEventCatalog__container">
                {renderEvents( filteredItems )}
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
        </div>
    );
};
export default DXEventCatalog;
