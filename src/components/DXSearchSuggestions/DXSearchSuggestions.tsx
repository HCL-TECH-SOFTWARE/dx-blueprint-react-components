import "./DXSearchSuggestions.scss";
import React, { useState, useEffect, useRef } from "react";
import { Form, InputGroup } from 'react-bootstrap';
import { LinksProps, getIcon } from "../../utilities";

export interface SSuggestionsProps {
    searchItems: LinksProps[],
    searchFn?: Function,
    searchPlaceholder?: string;
    iconPosition?: ( "left" | "right" ),
    icons?: {
        search?: string;
        link?: string;
    };
}

const DXSearchSuggestions = ( props: SSuggestionsProps ) => {
    const [filteredItems, setFilteredItems] = useState<any>( props.searchItems );
    const [search, setSearch] = useState( "" );

    const componentRef = useRef<HTMLDivElement>( null );

    const handleSearch = ( e: any ) => {
        let filter = e.target.value;
        if ( e.keyCode !== 13 ) {
            if ( e.keyCode === 27 ) {
                let input = componentRef.current?.querySelector( '[data-testid="ss-input"]' ) as HTMLInputElement;
                if ( input ) input.value = "";
                setSearch( "" );
                setFilteredItems( [...props.searchItems] );
                showList( false );
            } else {
                if ( filter !== "" ) {
                    setSearch( filter );
                    const newList = props.searchItems.filter( ( item: LinksProps ) => item.label.toLowerCase().includes( filter.toLowerCase() ) );
                    setFilteredItems( [...newList] );
                } else {
                    setSearch( "" );
                    setFilteredItems( [...props.searchItems] );
                }
            }
        } else {
            props.searchFn?.( filter );
        }
    };

    const showList = ( opened: boolean ) => {
        const input = componentRef.current?.querySelector( ".dxSSuggestions .input-group input" ) as HTMLElement;
        const insetDiv = componentRef.current?.querySelector( ".dxSSuggestions .input-group .input-group-text" ) as HTMLElement;
        if ( opened ) {
            if ( input ) input.style.borderBottomRightRadius = "0";
            if ( insetDiv ) insetDiv.style.borderBottomLeftRadius = "0";
        } else {
            if ( input ) input.style.removeProperty( "border-bottom-right-radius" );
            if ( insetDiv ) insetDiv.style.removeProperty( "border-bottom-left-radius" );
        }
        const panel = componentRef.current?.querySelector( ".dxSSuggestions__list" ) as HTMLElement;
        if ( panel ) {
            panel.style.display = opened ? "block" : "none";
            opened ? panel.classList.add( "dxSSuggestions__list--active" ) : panel.classList.remove( "dxSSuggestions__list--active" );
        }
    };

    const renderItems = () => {
        if ( filteredItems && filteredItems.length > 0 ) {
            return filteredItems.slice( 0, 7 ).map( ( item: LinksProps, index: number ) => (
                <li key={index}>
                    <a href={item.url}>{item.label}</a>
                    <i className={getIcon( props.icons, "link", "ci-Chevron_Right" )}></i>
                </li>
            ) );
        }
        return (
            <li>
                <span onClick={() => props.searchFn?.( search )} data-testid="ss-no-results">
                    Search {search} in our portal
                </span>
            </li>
        );
    };

    useEffect( () => {
        let closePanel = ( e: any ) => {
            let input = componentRef.current?.querySelector( '[data-testid="ss-input"]' );
            let list = componentRef.current?.querySelector( '.dxSSuggestions__list' );
            if ( e.target === input ) showList( true );
            else if ( list && !list?.contains( e.target ) ) showList( false );
        };
        window.addEventListener( "click", function ( e ) { closePanel( e ); } );

        return () => {
            window.removeEventListener( "click", function ( e ) { closePanel( e ); } );
        };
    }, [props.searchItems] );

    // Determine ordering based on iconPosition
    const inputControl = (
        <Form.Control
            data-testid="ss-input"
            onKeyUp={( e: any ) => handleSearch( e )}
            onFocus={() => showList( true )}
            placeholder={props.searchPlaceholder ? props.searchPlaceholder : "I want to..."}
        />
    );

    const inputIcon = (
        <InputGroup.Text data-testid="ss-icon-container">
            <i data-testid="ss-icon" className={getIcon( props.icons, "search", "ci-Search_Magnifying_Glass" )}></i>
        </InputGroup.Text>
    );

    return (
        <div className="dxSSuggestions" ref={componentRef}>
            <InputGroup data-testid="ss-input-group">
                {props.iconPosition === "right" ? (
                    <>
                        {inputControl}
                        {inputIcon}
                    </>
                ) : (
                    <>
                        {inputIcon}
                        {inputControl}
                    </>
                )}
            </InputGroup>
            <div className="dxSSuggestions__list" data-testid="ss-list">
                <ul>
                    {renderItems()}
                </ul>
            </div>
        </div>
    );
};

export default DXSearchSuggestions;
