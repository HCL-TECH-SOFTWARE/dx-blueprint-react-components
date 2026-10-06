import "./DXAccordionCatalog.scss";
import React, { useState, useEffect } from "react";
import DXAccordion, { AccordionProps } from "../DXAccordion/DXAccordion";
import DXPagination from "../DXPagination";
import DXTaxonomyFilter from "../DXTaxonomyFilter";
import { TaxFilterProps, TaxonomyFilterProps } from "../DXTaxonomyFilter/DXTaxonomyFilter";

/*
** @deprecated: From @version 1.31.0-alpha use DXGenericCatalog instead
*/
export interface AccordionCatalogProps {
    items: {
        data: {},
        accordion: AccordionProps;
    }[],
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
    searchPlaceholder?: string;
    activeIndex?: number;
}

const hasValidTaxonomyProps = ( properties: any ) => {
    return 'totalItems' in properties && 'filterType' in properties && 'categories' in properties &&
        properties.categories.length > 0;
};

const hasValidPaginationProps = ( properties: any ) => {
    return 'sets' in properties.paginationProps && properties.paginationProps.sets.length > 0 &&
        'active' in properties.paginationProps && 'activeSet' in properties.paginationProps;
};

const DXAccordionCatalog = ( props: AccordionCatalogProps ) => {
    /** STATES */
    // TaxonomyFilter
    const [filteredItems, setFilteredItems] = useState( props.items );
    const [filteredCount, setFilteredCount] = useState( props.items.length );
    // Pagination
    const [active, setActive] = useState( props.paginationProps.active );
    const [activeSet, setActiveSet] = useState( props.paginationProps.activeSet );
    const shortestSet = props.paginationProps.sets ? parseInt( props.paginationProps.sets[0] ) : 0;
    // Render
    const [activeIndex, setActiveIndex] = useState( props.activeIndex || props.activeIndex === 0 ? props.activeIndex : 0 );

    /** Taxonomy Logic */
    const getTaxonomies = () => {
        let taxonomyObj: TaxFilterProps[] = [];

        let differentValues: any = new Set();
        if ( props.categories !== undefined && props.categories.length > 0 ) {
            props.categories.forEach( category => {
                props.items.forEach( ( item: any ) => {
                    if ( item.data.hasOwnProperty( category ) ) {
                        const rawValue = item.data[category];

                        if (typeof rawValue === 'string') {
                            const value = rawValue.toLowerCase().trim();
                            if (value !== '') {
                                differentValues.add(value);
                            }
                        } else if (Array.isArray(rawValue)) {
                            rawValue.forEach(val => {
                                if (typeof val === 'string') {
                                    const value = val.toLowerCase().trim();
                                    if (value !== '') {
                                        differentValues.add(value);
                                    }
                                }
                            });
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
                let itemsToSearch: { data: {}, accordion: AccordionProps; }[] = filteredItems.length > 0 ? [...filteredItems] : [...props.items];
                let value = filter.split( /:(.*)/s )[1];
                for ( let item of itemsToSearch ) {
                    if ( item.accordion.label.toLowerCase().indexOf( value.toLocaleLowerCase() ) !== -1 ) {
                        matches.push( item );
                        continue;
                    }
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
                let itemsToSearch: { data: {}, accordion: AccordionProps; }[] = [...props.items];
                let matchedItems: { data: {}, accordion: AccordionProps; }[] = [];

                for ( let i = 0, length = selectedFilters.length; i < length; i++ ) {
                    let value = selectedFilters[i].split( /:(.*)/s )[1];
                    for ( let item of itemsToSearch ) {
                        if ( item.accordion.label.toLowerCase().indexOf( value.toLowerCase() ) !== -1 ) {
                            matchedItems.push( item );
                            continue;
                        }
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

    /** Pagination Logic */
    const onChangeActive = ( page: number ) => {
        setActive( page );
    };

    const onChangeSet = ( e: any ) => {
        setActiveSet( parseInt( e.target.textContent ) );
        setActive( 1 );
    };

    /** Accordion Logic */
    const mapRawData = ( items: any[] ) => {
        let indexOfLastItem = active * activeSet;
        let indexOfFirstItem = indexOfLastItem - activeSet;
        return items.slice( indexOfFirstItem, indexOfLastItem );
    };

    const handleOpening = ( index: number ) => {
        if ( index !== activeIndex ) {
            setActiveIndex( index );
        } else {
            setActiveIndex( -1 );
        }
    };

    const renderItems = ( items: { data: any, accordion: AccordionProps; }[] ) => {
        let mappedItems = mapRawData( items );
        let updatedItems = mappedItems.map( ( item: { data: any, accordion: AccordionProps; }, index: number ) => {
            item.accordion.active = activeIndex === index;

            let newAccordionProps = {
                ...item.accordion,
                _catalogIndex: index,
                _catalogHandler: handleOpening
            };
            return { data: { ...item.data }, accordion: { ...newAccordionProps } };
        } );

        return (
            <div className="dxACatalog__items">
                {
                    updatedItems.map( ( item: any, index: Number ) => (
                        <DXAccordion {...item.accordion} key={index} />
                    ) )
                }
            </div>
        );
    };

    return (
        <div className="dxACatalog">
            {
                !props.hideFilters ? (
                    hasValidTaxonomyProps( props ) ? (
                        <DXTaxonomyFilter {...taxonomyProps} />
                    ) : ( <span>Invalid or missing props for taxonomy filter</span> )
                ) : null
            }
            {renderItems( filteredItems )}
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

export default DXAccordionCatalog;
