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
import React, { useEffect, useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./DXSearchInput.scss";
import { LinksProps, getIcon, renderOverlayElement } from "../../utilities";
import DXCard, { CardProps } from "../DXCard/DXCard";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export interface SearchInputProps {
    searchOptions: LinksProps[],
    searchCards: CardProps[],
    searchFn?: Function,
    buttonLabel?: string;
    placeholder?: string,
    collapsed?: boolean;
    suggestedInfo?: TypeSection[];
    showOverlay?: boolean;
    icons?: {
        search?: string;
        close?: string;
    };
}

export interface TypeSection {
    type: string,
    cards: CardProps[];
}

const DXSearchInput = ( props: SearchInputProps ) => {
    const [filteredOptions, setFilteredOptions] = useState<any>( props.searchOptions );
    const [filteredCards, setFilteredCards] = useState<any>( [] );
    const [listActive, setListActive] = useState( false );
    const [suggestedCardsActive, setsuggestedCardsActive] = useState( false );
    const [search, setSearch] = useState( "" );
    const [collapsed, setCollapsed] = useState( false );

    const [overlayActive, setOverlayActive] = useState( false );

    const refForm = useRef<HTMLFormElement>( null );
    const refInput = useRef<HTMLInputElement>( null );
    const refSearch = useRef<HTMLButtonElement>( null );

    let overlayId = "searchInput__overlay";
    let overlayClass = "dxSearchInput__overlay";

    const overlayCallback = () => {
        showList( false );
        setOverlayActive( false );
    };

    useEffect( () => {
        let closePanel = ( e: any ) => {
            let input = refInput.current;
            let list = refForm.current?.querySelector( ".dxSearchInput__list" );
            let target;

            if ( e.target.children ) {
                target = e.target.querySelector( '.dxSearchInput__input' );
            }

            if ( e.target === input || ( target == input && collapsed ) ) {
                showList( true );
            }
            else if ( list && !list?.contains( e.target ) ) showList( false );

        };

        setsuggestedCardsActive( true );
        window.addEventListener( "click", closePanel );

        return () => {
            window.removeEventListener( "click", closePanel );
        };
    }, [props.searchOptions] );

    useEffect( () => {
        if ( !props.collapsed ) {
            let buttonSearch = refForm.current?.querySelector( ".input-group-inset-item" ) as HTMLElement;
            buttonSearch.style.backgroundColor = "var(--light-white)";
            buttonSearch.style.border = "1px solid var(--primary-primary-l2)";
            buttonSearch.style.borderLeft = "none";
        }
    }, [props] );

    const handleSearch = ( e: any ) => {
        let filter = e.target.value;

        if ( e.keyCode !== 13 ) {
            if ( e.keyCode === 27 ) {
                ( refInput.current as HTMLInputElement ).value = "";
                setSearch( "" );
                setFilteredOptions( [...props.searchOptions] );
                showList( false );
            } else {
                if ( filter !== "" ) {
                    setSearch( filter );
                    const optionsList = props.searchOptions.filter( ( item: LinksProps ) => item.label.toLowerCase().includes( filter.toLowerCase() ) );
                    const cardsList = props.searchCards.filter( ( item: CardProps ) => item.title.label.toLowerCase().includes( filter.toLowerCase() ) );
                    setFilteredCards( [...cardsList] );
                    setFilteredOptions( [...optionsList] );
                    setsuggestedCardsActive( false );
                } else {
                    clearSearchValue();
                }
            }
        } else {
            props.searchFn && props.searchFn( filter );
        }
    };

    const toggleInput = ( e: any ) => {
        let input = refInput.current as HTMLInputElement;
        let buttonSearch = refForm.current?.querySelector( ".input-group-inset-item" ) as HTMLElement;
        let iconButton = refSearch.current?.querySelector( "i" );
        buttonSearch?.classList.add( "clicked" );

        if ( !props.collapsed ) {
            if ( input.value ) {
                handleSearchSubmit();
            }
        } else {
            if ( iconButton?.classList.value === getIcon( props.icons, "search", "ci-Search_Magnifying_Glass" ) ) {
                setCollapsed( true );
                iconButton?.classList.replace( getIcon( props.icons, "search", "ci-Search_Magnifying_Glass" ), getIcon( props.icons, "close", "ci-Close_MD" ) );
                buttonSearch?.classList.add( "clicked" );

                if ( input?.classList.value.includes( "dxSearchInput__input--collapsed" ) ) {
                    input?.classList.replace( "dxSearchInput__input--collapsed", "dxSearchInput__input--expanded" );
                }
            } else {
                setCollapsed( false );
                iconButton?.classList.replace( getIcon( props.icons, "close", "ci-Close_MD" ), getIcon( props.icons, "search", "ci-Search_Magnifying_Glass" ) );
                if ( input?.classList.value.includes( "dxSearchInput__input--expanded" ) ) {
                    input?.classList.replace( "dxSearchInput__input--expanded", "dxSearchInput__input--collapsed" );
                }
                buttonSearch?.classList.remove( "clicked" );
                buttonSearch.style.borderBottom = "none";
                clearSearchValue();
            }
        }
    };

    const handleSearchSubmit = () => {
        let input = refInput.current as HTMLInputElement;
        props.searchFn?.( input.value );
    };

    const clearSearchValue = () => {
        let input = refInput.current as HTMLInputElement;
        input.value = '';
        setSearch( "" );
        setFilteredOptions( [...props.searchOptions] );
        setFilteredCards( [] );
        setsuggestedCardsActive( true );
    };

    const showList = ( opened: boolean ) => {
        setListActive( opened );
        setOverlayActive( opened );
        const input = refInput.current as HTMLInputElement | null;
        const insetDiv = refForm.current?.querySelector( ".input-group-inset-item" ) as HTMLElement | null;

        // If input or insetDiv aren't available (e.g., during async callbacks or unmount), safely exit.
        if ( !input || !insetDiv ) {
            const panelFallback = refForm.current?.querySelector( ".dxSearchInput__list" ) as HTMLElement | null;
            if ( panelFallback ) {
                panelFallback.style.display = opened ? "block" : "none";
                opened ? panelFallback.classList.add( "dxSearchInput__list--active" ) : panelFallback.classList.remove( "dxSearchInput__list--active" );
            }
            return;
        }

        if ( opened ) {
            input.style.borderBottomLeftRadius = "0";
            insetDiv.style.borderBottomRightRadius = "0";
            input.style.borderBottom = "none";
            insetDiv.style.borderBottom = "none";
        } else {
            input.style.borderBottom = "1px solid var(--primary-primary-l2)";
            insetDiv.style.borderBottom = "1px solid var(--primary-primary-l2)";
            input.style.borderBottomLeftRadius = "4px";
            insetDiv.style.borderBottomRightRadius = "4px";
            clearSearchValue();
        }
        if ( input.classList.value.includes( "dxSearchInput__input--collapsed" ) ) {
            insetDiv.style.borderBottom = "none";
        }
        const panel = refForm.current?.querySelector( ".dxSearchInput__list" ) as HTMLElement | null;
        if ( panel ) {
            panel.style.display = opened ? "block" : "none";
            opened ? panel.classList.add( "dxSearchInput__list--active" ) : panel.classList.remove( "dxSearchInput__list--active" );
        }
    };

    const renderItems = () => {
        if ( filteredOptions && filteredOptions.length > 0 ) {
            return filteredOptions.slice( 0, 5 ).map( ( item: LinksProps, index: number ) => (
                <li key={index}>
                    <a href={item.url}>{item.label}</a>
                </li>
            ) );
        }
        return (
            <li> <span data-testid="ss-no-results"></span></li>
        );
    };

    const renderSearchButton = () => {
        return (
            <div className="dxSearchInput__searchAll">
                <Button
                    className="dxSearchInput__searchAllButton"
                    data-testid="search-all-button"
                    variant="primary"
                    onClick={() => handleSearchSubmit()}
                >
                    {props.buttonLabel ? props.buttonLabel : "See all search results"}
                </Button>
            </div>
        );
    };

    const renderCards = () => {
        return (
            <div className="dxSearchInput__suggestedInfo">
                {
                    <div className={`dxSearchInput__suggestedInfo__section`} >
                        <div className={`dxSearchInput__suggestedInfo__section__items`} data-testid="suggestedInfo-section-items">
                            {filteredCards.slice( 0, 3 ).map( ( card: CardProps, index: number ) => (
                                <DXCard {...card} key={index}></DXCard>
                            ) )}
                        </div>
                    </div>
                }
            </div>
        );
    };

    const renderSuggestedServices = () => {
        if ( props.suggestedInfo && props.suggestedInfo.length > 0 ) {
            return (
                <div className="dxSearchInput__suggestedInfo">
                    {
                        props.suggestedInfo.map( ( card, index ) => (
                            <div className={`dxSearchInput__suggestedInfo__section`} key={index}>
                                <p className="dxSearchInput__suggestedInfo__sectionTitle">{card.type}</p>
                                <div className={`dxSearchInput__suggestedInfo__section__items`} key={index}>
                                    {card.cards.slice( 0, 3 ).map( ( info, index ) => (
                                        <DXCard {...info} key={index}></DXCard>
                                    ) )}
                                </div>
                            </div>
                        ) )
                    }
                </div>
            );
        }
    };

    const handleBlur = ( event: React.FocusEvent<HTMLFormElement> ) => {
        // If relatedTarget is outside the container, focus left the container
        if ( !event.currentTarget.contains( event.relatedTarget as Node ) ) {
            showList( false );
            setOverlayActive( false );
            const input = refInput.current as HTMLInputElement;
            input.value = "";
            setSearch( "" );
            setFilteredOptions( [...props.searchOptions] );
            setFilteredCards( [] );
            setsuggestedCardsActive( true );
        }
    };

    useEffect( () => {
        let button = refForm.current?.querySelector( ".input-group-inset-item" ) as HTMLElement;
        if ( collapsed && props.collapsed ) {
            button.style.backgroundColor = "var(--light-white)";
            button.style.border = "1px solid var(--primary-primary-l2)";
            button.style.borderLeft = "0";
            button.style.borderBottom = "0";
        } else if ( props.collapsed ) {
            button.style.removeProperty( "border" );
        }
    }, [collapsed] );

    return (
        <div className="dxSearchInput" >
            <Form id="dxSearchInput__form" role="search" aria-label="search-input" onSubmit={( e ) => { e.preventDefault(); handleSearchSubmit(); }} ref={refForm} onBlur={handleBlur}>
                <Form.Group className='dxSearchInput__form'>
                    <InputGroup>
                        <div className="input-group-item">
                            <Form.Control
                                className={`dxSearchInput__input input-group-inset input-group-inset-before ${props.collapsed && !collapsed ? "dxSearchInput__input--collapsed" : ""} ${listActive || collapsed ? "dxSearchInput__input--active" : ""}`}
                                data-testid="dxSearchInput-input"
                                placeholder={props.placeholder ? props.placeholder : "Search this site"}
                                onFocus={() => showList( true )}
                                onKeyUp={( e: any ) => handleSearch( e )}
                                ref={refInput}
                            />
                            <div data-testid="dxSearchInput__searchGroup" className={`input-group-inset-item input-group-inset-item-after ${listActive ? "dxSearchInput__search--active" : ""}`} >
                                <Button
                                    data-testid="dxSearchInput__search"
                                    variant="unstyled"
                                    className={`dxSearchInput__search`}
                                    onClick={( e ) => toggleInput( e )}
                                    ref={refSearch}>
                                    <i className={getIcon( props.icons, "search", "ci-Search_Magnifying_Glass" )} data-testid="icon-btn-search"></i>
                                </Button>
                            </div>
                        </div>
                    </InputGroup>
                    {( filteredCards && filteredCards.length <= 0 ) && ( filteredOptions && filteredOptions <= 0 ) ?
                        <div className="dxSearchInput__list" data-testid="dxSearchInput-list">
                            <p className="dxSearchInput__listEmpty" data-testid="dxSearchInput__listEmpty">Search &ldquo;{search}&rdquo; in our portal</p>
                            {renderSearchButton()}
                        </div>
                        :
                        <div className="dxSearchInput__list" data-testid="dxSearchInput-list">
                            <ul>
                                {renderItems()}
                            </ul>
                            {filteredCards && filteredCards.length > 0 ? renderCards() : null}
                            {suggestedCardsActive && renderSuggestedServices()}
                            {renderSearchButton()}
                        </div>
                    }
                </Form.Group>
            </Form>
            {props.showOverlay && renderOverlayElement( overlayId, overlayClass, overlayActive, overlayCallback )}
        </div >
    );
};

export default DXSearchInput;
