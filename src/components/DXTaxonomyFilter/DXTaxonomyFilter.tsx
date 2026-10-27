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

import "./DXTaxonomyFilter.scss";
import React, { useEffect, useState, useRef } from 'react';
import DXButton from "../DXButton/DXButton";
import DXToggleMenu from "../DXToggleMenu";
import { Form, InputGroup } from 'react-bootstrap';
import { getIcon } from "../../utilities";

export interface TaxFilterProps {
    type: string;
    label?: string;
    values: string[];
    attribute: string;
}

export interface TaxonomyFilterProps {
    totalItems: number,
    filterLimit?: number;
    filters: TaxFilterProps[],
    filteredCount: number,
    filterItems: Function,
    searchLabel?: string,
    searchPlaceholder?: string;
    hideSearch?: boolean;
    hideClearFilters?: boolean;
    onClearFilters?: () => void;
    clearFiltersLabel?: string;
    icons?: {
        filter?: string;
        filterClose?: string;
        search?: React.ReactNode | string;
    };
}

const DXTaxonomyFilter = ( props: TaxonomyFilterProps ) => {
    // state filterLimit is set to 3 by default, but can be overridden by the prop
    const [filterLimit, setFilterLimit] = useState( props.filterLimit || 3 );
    const [errorMsg, setErrorMsg] = useState( "" );
    const [selectedFilters, setSelectedFilters] = useState<string[]>( [] );
    const [editedFilter, setEditedFilter] = useState( "" );
    const [addRemove, setAddRemove] = useState( false );

    // Added ref to cleanly read the input value when the search icon is clicked
    const searchInputRef = useRef<HTMLInputElement>( null );

    const addFilter = ( value: string ) => {
        let newArray: string[] = selectedFilters;
        newArray.push( value );
        setEditedFilter( value );
        setAddRemove( true );
        setSelectedFilters( [...newArray] );
    };

    const removeFilter = ( value: string ) => {
        let newArray: string[] = [];
        let receivedAttr = value.split( ":" )[0];
        let isToggle = props.filters.find( ( item: TaxFilterProps ) => item.attribute === receivedAttr && item.type === "toggle" );
        if ( isToggle ) {
            document.querySelectorAll( `[data-attribute="${receivedAttr}"] .dxButton` ).forEach( item => {
                let el = item as HTMLButtonElement;
                if ( el.classList.contains( "btn-primary" ) ) {
                    el.classList.add( "btn-secondary" );
                    el.classList.remove( "btn-primary" );
                }
                el.disabled = false;
            } );
        }
        newArray = selectedFilters.filter( ( filter: string ) => filter !== value );
        setEditedFilter( value );
        setAddRemove( false );
        setSelectedFilters( [...newArray] );
    };

    const clearAllFilters = () => {
        props.filters.forEach( ( filter: TaxFilterProps ) => {
            if ( filter.type === "toggle" ) {
                document.querySelectorAll( `[data-attribute="${filter.attribute}"] .dxButton` ).forEach( item => {
                    let el = item as HTMLButtonElement;
                    if ( el.classList.contains( "btn-primary" ) ) {
                        el.classList.add( "btn-secondary" );
                        el.classList.remove( "btn-primary" );
                    }
                    el.disabled = false;
                } );
            }
        } );

        setSelectedFilters( [] );
        setEditedFilter( "" );
        setAddRemove( false );

        if ( props.onClearFilters ) {
            props.onClearFilters();
        }
    };

    const handleFilter = ( e: any ) => {
        let filter: string = `${e.target.name}:${e.target.value.toLowerCase()}`;
        addFilter( filter );
    };

    // Centralized search execution logic to be used by both the Input (Enter key) and the Icon (Click/Enter/Space)
    const executeSearch = ( value: string ) => {
        if ( value !== "" ) {
            let searchFilter = `_search:${value}`;
            if ( !selectedFilters.some( ( filter: string ) => filter.includes( value ) ) ) {
                if ( searchInputRef.current ) {
                    searchInputRef.current.value = ""; // Clears input after successful search
                }
                addFilter( searchFilter );
                setErrorMsg( "" );
            } else {
                setErrorMsg( "The value entered is already being filtered" );
            }
        }
    };

    // Handles the standard input field interaction
    const handleSearchInput = ( e: any ) => {
        if ( e.keyCode === 13 ) {
            executeSearch( e.target.value.toLowerCase() );
        } else if ( errorMsg ) {
            setErrorMsg( "" );
        }
    };

    // Handles interaction explicitly from the search icon
    const handleSearchIconClick = () => {
        if ( searchInputRef.current ) {
            executeSearch( searchInputRef.current.value.toLowerCase() );
        }
    };

    useEffect( () => {
        props.filterItems( selectedFilters, editedFilter, addRemove );
    }, [selectedFilters] );

    const showFilters = ( e: any ) => {
        let taxonomy = null;
        if ( e.target.nextElementSibling !== null ) {
            taxonomy = e.target.nextElementSibling;
        } else {
            taxonomy = e.target.parentNode.nextElementSibling;
        }
        taxonomy.classList.toggle( "d-none" );
    };

    const getFilterValue = ( filter: string ) => {
        let filterItems = filter.split( /:(.*)/ );
        return filterItems[1];
    };

    const renderSelectFilter = ( attribute: string, values: string[], index: number, label?: string ) => {
        let selectLabel = label ? label.toLowerCase() : attribute.toLowerCase();
        values = values.filter( value => !selectedFilters.includes( `${attribute}:${value.toLowerCase()}` ) );
        return (
            <div className="dxTaxonomyFilter--select" key={index} data-testid="taxonomy-filter-col">
                {
                    label &&
                    <label htmlFor={attribute}>{label}</label>
                }
                <Form.Select name={attribute} id={`category-${index}`} data-testid="filter-select"
                    onChange={( e ) => handleFilter( e )}
                    disabled={values.length === 0}>
                    <option value={""} key={""}>
                        {"Select " + selectLabel + " value"}
                    </option>
                    {
                        values.map( ( value: string ) => (
                            <option value={value} key={value}>
                                {value.charAt( 0 ).toUpperCase() + value.slice( 1 )}
                            </option>
                        ) )
                    }
                </Form.Select>
            </div>
        );
    };

    const renderCheckboxFilter = ( attribute: string, values: string[], index: number, label?: string ) => {
        return (
            <div className="dxTaxonomyFilter--checkbox" data-testid="taxonomy-filter-col" key={index}>
                {
                    label &&
                    <label htmlFor={attribute}>{label}</label>
                }
                <div className="dxTaxonomyFilter__checkboxContainer">
                    {
                        values.map( ( value: string ) => {
                            return (
                                <div className="dxTaxonomyFilter__checkbox" key={`checkbox-${value}`}>
                                    <input type="checkbox"
                                        name={attribute} id={`category-${index}`} value={value}
                                        onChange={( e ) => handleFilter( e )}
                                        checked={selectedFilters.includes( `${attribute}:${value.toLowerCase()}` )}
                                        disabled={selectedFilters.includes( `${attribute}:${value.toLowerCase()}` )}
                                        data-testid="filter-checkbox" />
                                    <label htmlFor={attribute}>{value}</label>
                                </div>
                            );
                        } )
                    }
                </div>
            </div>
        );
    };

    const renderSwitchFilter = ( attribute: string, values: string[], index: number, label?: string ) => {
        return (
            <div className="dxTaxonomyFilter--switch" key={index} data-testid="taxonomy-filter-col">
                {
                    label &&
                    <label htmlFor={attribute}>{label}</label>
                }
                <div className="dxTaxonomyFilter__switchContainer">
                    {
                        values.map( ( value: string ) => {
                            return (
                                <div className="dxTaxonomyFilter__switch" key={`switch-${value}`}>
                                    <label htmlFor={attribute}>{value}</label>
                                    <Form.Check
                                        type="switch"
                                        id={`switch-${attribute}-${value}`}
                                        checked={selectedFilters.includes( `${attribute}:${value.toLowerCase()}` )}
                                        name={attribute}
                                        disabled={selectedFilters.includes( `${attribute}:${value.toLowerCase()}` )}
                                        onChange={( e ) => handleFilter( e )}
                                        value={value}
                                        data-testid="filter-switch"
                                    />
                                </div>
                            );
                        } )
                    }
                </div>
            </div>
        );
    };

    const renderToggleMenu = ( attribute: string, values: string[], index: number, label?: string ) => {
        const handleToggle = ( label: string, classList: DOMTokenList, target: any ) => {
            let parentFilter = target.closest( ".dxTaxonomyFilter--toggleMenu" ).dataset["attribute"];
            document.querySelectorAll( `[data-attribute="${parentFilter}"] .dxButton` ).forEach( item => {
                let el = item as HTMLButtonElement;
                el.disabled = true;
            } );
            let filterModified: string = `${parentFilter}:${label}`;
            addFilter( filterModified );
        };

        let buttons = values.map( value => {
            return {
                label: value,
                handleClick: handleToggle,
            };
        } );

        return (
            <div className="dxTaxonomyFilter--toggleMenu" key={index} data-testid="taxonomy-filter-col" data-attribute={attribute}>
                {
                    label &&
                    <label htmlFor={attribute}>{label}</label>
                }
                <DXToggleMenu buttons={buttons} type="single" />
            </div>
        );
    };

    const renderFilters = ( filters: TaxFilterProps[] ) => {
        if ( filters.length > filterLimit ) {
            return (
                <p>You can only pass up to {filterLimit} filters</p>
            );
        }

        // Optimized: Returns directly using map instead of pushing to an external array
        return filters.map( ( filter: TaxFilterProps, index: number ) => {
            switch ( filter.type ) {
                case 'select':
                    return renderSelectFilter( filter.attribute, filter.values, index, filter.label );
                case 'checkbox':
                    return renderCheckboxFilter( filter.attribute, filter.values, index, filter.label );
                case 'switch':
                    return renderSwitchFilter( filter.attribute, filter.values, index, filter.label );
                case 'toggle':
                    return renderToggleMenu( filter.attribute, filter.values, index, filter.label );
                default:
                    return renderSelectFilter( filter.attribute, filter.values, index, filter.label );
            }
        } );
    };

    const renderTags = () => {
        if ( selectedFilters.length > 0 ) {
            return (
                <div className="dxTaxonomyFilter__tags">
                    <p className="d-block d-sm-none dxTaxonomyFilter__tagsLabel">Filters</p>
                    <div className="dxTaxonomyFilter__tagsContainer" data-testid="tags">
                        {
                            selectedFilters.map( ( filter: string, index: number ) => (
                                <span key={index}>
                                    {getFilterValue( filter )}
                                    <i className={getIcon( props.icons, "filterClose", "ci-Close_MD" )} onClick={() => removeFilter( filter )}></i>
                                </span>
                            ) )
                        }
                    </div>
                </div>
            );
        }
    };

    return (
        <div data-testid="taxonomy-filter-component" className="dxTaxonomyFilter">
            <DXButton
                className="dxTaxonomyFilter__actionButton d-flex d-sm-none"
                onClick={showFilters}
                data-testid="taxonomy-action-button"
                label="Filter Options"
                displayType="secondary"
                icon={{
                    class: getIcon( props.icons, "filter", "ci-Unfold_More" ),
                    testId: "taxonomy-action-button-icon",
                    position: "right"
                }} />
            <div className="d-none d-sm-block dxTaxonomyFilter__container" data-testid="taxonomy-container">
                <div className="dxTaxonomyFilter__filtersContainer">
                    {!props.hideSearch ? (
                        <div className="dxTaxonomyFilter__searchContainer" data-testid="taxonomy-search-col">
                            <label htmlFor="taxonomy-search" className="dxTaxonomyFilter__inputLabel">
                                {props.searchLabel && props.searchLabel !== "" ? props.searchLabel : "Filter by keyword"}
                            </label>
                            <InputGroup>
                                <Form.Control
                                    id="taxonomy-search"
                                    ref={searchInputRef}
                                    placeholder={props.searchPlaceholder && props.searchPlaceholder !== "" ? props.searchPlaceholder : "Type what are you looking for"}
                                    onKeyDown={( e ) => handleSearchInput( e )}
                                    disabled={selectedFilters.length === 6}
                                    data-testid="filter-search"
                                    className="dxTaxonomyFilter__searchInput" />
                                <InputGroup.Text>
                                    {/* Wrapping the icon in a span to safely apply interactivity and accessibility requirements */}
                                    <span
                                        role="button"
                                        tabIndex={0}
                                        aria-label="Submit search"
                                        onClick={handleSearchIconClick}
                                        onKeyDown={( e ) => {
                                            if ( e.key === 'Enter' || e.key === ' ' ) {
                                                e.preventDefault();
                                                handleSearchIconClick();
                                            }
                                        }}
                                        style={{ display: 'inline-flex', cursor: 'pointer' }}
                                    >
                                        {typeof props.icons?.search === 'string' ? (
                                            <i className={props.icons.search}></i>
                                        ) : (
                                            props.icons?.search || <i className="ci-Search_Magnifying_Glass"></i>
                                        )}
                                    </span>
                                </InputGroup.Text>
                            </InputGroup>
                            {
                                errorMsg ? (
                                    <span data-testid="error-msg" className="dxTaxonomyFilter__searchError">{errorMsg}</span>
                                ) : ""
                            }
                        </div>
                    ) : null}
                    {renderFilters( props.filters )}
                </div>
                {renderTags()}
                <div className="dxTaxonomyFilter__counter">
                    <p>Showing {props.filteredCount} {props.filteredCount === 1 ? 'result' : 'results'} of {props.totalItems} {props.totalItems === 1 ? 'entry' : 'entries'}</p>
                    {!props.hideClearFilters && props.onClearFilters && (
                        <button
                            onClick={clearAllFilters}
                            className="dxTaxonomyFilter__clearButton"
                            data-testid="clear-filters-button"
                            type="button"
                        >
                            {props.clearFiltersLabel || "Clear Filters"}
                        </button>
                    )}
                    <div className="dxTaxonomyFilter__counterLine d-block d-sm-none"></div>
                </div>
            </div>
        </div>
    );
};
export default DXTaxonomyFilter;
