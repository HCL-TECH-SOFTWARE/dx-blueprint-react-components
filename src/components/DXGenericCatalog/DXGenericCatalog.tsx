import "./DXGenericCatalog.scss";
import React, { useState, useEffect, ReactElement } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DXTaxonomyFilter, { TaxFilterProps, TaxonomyFilterProps } from "../DXTaxonomyFilter/DXTaxonomyFilter";
import DXPagination from "../DXPagination/DXPagination";
import * as AllComponents from "./../index";
import { getColNumber } from "../../utilities";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";
import DXEmptyState from "../DXEmptyState";
import { EmptyStateProps } from "../DXEmptyState/DXEmptyState";
import { CardComponent } from "../../utilities/CardComponent/CardComponent";

export interface GenericCatalogProps extends BasicComponent {
    filter?: CatalogFilterProps;
    body: CatalogBodyProps;
    pagination: CatalogPaginationProps;
}

export interface CatalogFilterProps {
    search?: {
        label?: string;
        placeholder?: string;
    };
    filters: FilterProps[];
    hide?: boolean;
}

export interface FilterProps {
    label?: string;
    attribute: string;
    type: ( 'select' | 'checkbox' | 'switch' | 'toggle' );
}

export interface CatalogBodyProps {
    items: CardComponent[];
    componentType: string;
    elementsPerRow?: number;
    empty?: EmptyStateProps;
}

export interface CatalogPaginationProps {
    sets: string[];
    active: number;
    activeSet: number;
}

const DXGenericCatalog = ( props: GenericCatalogProps ) => {
    /** Supported Components */
    const SUPPORTED_CARDS: Set<string> = new Set( [
        "DXAccordion",
        "DXAppCard",
        "DXCard",
        "DXCardButton",
        "DXDirectoryCard",
        "DXEvent",
        "DXEventItem",
        "DXFullImageCard",
        "DXJiraTaskCard",
        "DXNewsCard",
        "DXProfileCard",
        "DXProjectCard",
        "DXSocialCard",
        "DXStraightCard"
    ] );

    /** States */
    const items: CardComponent[] = props.body.items.map( ( item: CardComponent, index: number ) => ( { ...item, index: index } ) );
    const [filteredItems, setFilteredItems] = useState( items );
    const [filteredCount, setFilteredCount] = useState( items.length );

    /** Pagination */
    const [active, setActive] = useState( props.pagination.active );
    const [activeSet, setActiveSet] = useState( props.pagination.activeSet );

    /** Taxonomy Logic */
    const getTaxonomyFilters = () => {
        let filterMap: Map<string, Set<string>> = new Map();
        let attributesToFilter: string[] = [];

        props.filter?.filters.map( ( props: FilterProps ) => {
            attributesToFilter.push( props.attribute );
            filterMap.set( props.attribute, new Set() );
        } );

        items.map( ( item: CardComponent ) => {
            attributesToFilter.map( ( attr: string ) => {
                if ( item[attr] ) {
                    if ( Array.isArray( item[attr] ) ) {
                        // is array
                        item[attr].map( ( itemAttribute: string ) => {
                            filterMap.get( attr )?.add( itemAttribute.toLowerCase() );
                        } );
                    } else {
                        //is string
                        filterMap.get( attr )?.add( item[attr].toLowerCase() );
                    }
                }
            } );
        } );

        //Build the FiltersProp for the DXTaxonomyFilter
        let taxFilterProps: TaxFilterProps[] = [];
        props.filter?.filters.map( ( filterProps: FilterProps ) => {
            let taxFilterProp: TaxFilterProps = {
                values: Array.from( filterMap.get( filterProps.attribute ) || [] ).sort(),
                type: filterProps.type,
                attribute: filterProps.attribute
            };

            if ( filterProps.label ) taxFilterProp.label = filterProps.label;

            if ( filterMap.get( filterProps.attribute ) && filterMap.get( filterProps.attribute )?.size ) {
                taxFilterProps.push( taxFilterProp );
            }
        } );

        return taxFilterProps;
    };

    const filterItems = ( selectedFilters: string[], filter: string, addOrRemove: boolean ) => {
        if ( selectedFilters.length > 0 ) {
            let matches: any[] = [];
            if ( addOrRemove ) {// When a filter is added
                let itemsToSearch: any[] = filteredItems.length > 0 ? [...filteredItems] : [...items];
                for ( let item of itemsToSearch ) {
                    let filterItems = filter.split( /:(.*)/s );
                    let attribute = filterItems[0];
                    let value = filterItems[1];

                    // FIXME: Validate if search entries should still be sub-strings or exact matches
                    if ( Array.isArray( item[attribute] ) ) {
                        item[attribute]?.map( ( itemAttributes: string ) => {
                            if ( itemAttributes.toLowerCase().includes( value.toLowerCase() ) ) {
                                matches.push( item );
                            }
                        } );
                    } else {
                        if ( item[attribute]?.toLowerCase().includes( value.toLowerCase() ) ) {
                            matches.push( item );
                            continue;
                        }
                    }
                }
                const newFilteredItems = matches;
                setFilteredItems( [...newFilteredItems] );
                setFilteredCount( newFilteredItems.length );
            } else {// When a filter is removed
                let itemsToSearch: any[] = [...items];
                let matchedItems: any[] = [];

                for ( let i = 0, length = selectedFilters.length; i < length; i++ ) {
                    let filterItems = selectedFilters[i].split( /:(.*)/s );
                    let attribute = filterItems[0];
                    let value = filterItems[1];

                    for ( let item of itemsToSearch ) {
                        // FIXME: Validate if search entries should still be sub-strings or exact matches
                        if ( Array.isArray( item[attribute] ) ) {
                            item[attribute]?.map( ( itemAttribute: string ) => {
                                if ( itemAttribute.toLowerCase().includes( value.toLowerCase() ) ) {
                                    matchedItems.push( item );
                                }
                            } );
                        } else {
                            if ( item[attribute]?.toLowerCase().includes( value.toLowerCase() ) ) {
                                matchedItems.push( item );
                                continue;
                            }
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
            setFilteredItems( [...items] );
            setFilteredCount( items.length );
        }
    };

    const taxonomyProps: TaxonomyFilterProps = {
        totalItems: items.length,
        filters: getTaxonomyFilters(),
        filteredCount: filteredCount,
        filterItems,
        searchLabel: props.filter?.search?.label ? props.filter.search.label : "",
        searchPlaceholder: props.filter?.search?.placeholder ? props.filter.search.placeholder : ""
    };

    useEffect( () => {
        setFilteredItems( [...items] );
        setFilteredCount( items.length );
        if ( props.filter ) getTaxonomyFilters();
    }, [props.body.items] );

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

    const createItemElement = ( itemProps: any, itemType: string ): ReactElement => {
        let element: ReactElement = <></>;
        //@ts-ignore: Types issues. But the validation is on the next if.
        let type = AllComponents[itemType];
        if ( type && SUPPORTED_CARDS.has( itemType ) ) {
            element = React.createElement( type, itemProps );
        }

        return element;
    };

    const renderEmptyView = () => {
        let propsEmpty = props.body.empty ? props.body.empty : {
            title: "No items to display"
        } as EmptyStateProps;

        return <DXEmptyState {...propsEmpty}></DXEmptyState>;
    };

    /** Render methods */
    const renderCards = ( items: CardComponent[], itemType: string ) => {
        return (
            ( items.length > 0 ) ?
                <Row>
                    {
                        mapRawData( items ).map( ( item: CardComponent ) => (
                            <Col xs={12} key={item.index} className="dxGenericCatalog__card" {...getColNumber( props.body.elementsPerRow )}>
                                {createItemElement( item, itemType )}
                            </Col>
                        ) )
                    }
                </Row>
                :
                renderEmptyView()
        );
    };

    return (
        <section className="dxGenericCatalog" data-testid="catalog-section">
            {
                props.filter && !props.filter.hide && <DXTaxonomyFilter {...taxonomyProps} />
            }
            {
                SUPPORTED_CARDS.has( props.body.componentType ) ?
                    <div className="dxGenericCatalog__cards">
                        {renderCards( filteredItems, props.body.componentType )}
                    </div>
                    :
                    <>
                        {console.warn( "Incorrect TAG for children element was not found in the library: " + props.body.componentType )}
                    </>
            }
            {
                filteredItems.length > 0 &&
                <DXPagination
                    sets={props.pagination.sets}
                    totalItems={filteredItems.length}
                    active={active}
                    activeSet={activeSet}
                    onChangeActive={onChangeActive}
                    onChangeSet={onChangeSet}
                    totalPages={Math.ceil( filteredItems.length / activeSet )} />
            }
            {props._edit && renderEditButton( props._edit )}
        </section>
    );
};

export default DXGenericCatalog;
