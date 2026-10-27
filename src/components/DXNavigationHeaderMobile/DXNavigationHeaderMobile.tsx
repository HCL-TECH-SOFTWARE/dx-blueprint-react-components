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
import 'bootstrap/dist/css/bootstrap.min.css';
import "./DXNavigationHeaderMobile.scss";

import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { NavigationProps } from "../DXNavigationHeader/DXNavigationHeader";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DXButton from "../DXButton/DXButton";
import DXUtilityZone, { UtilityZoneProps } from "../DXUtilityZone/DXUtilityZone";
import { getLinkTarget, getLinkIcon, getIcon } from "../../utilities";

export interface MobileNavigationProps extends NavigationProps {
    utilityZone?: UtilityZoneProps;
    headerHeight?: string;
    navigationLevel?: 1 | 2 | 3;
    icons?: {
        search?: string;
        navigationFoward?: string;
        navigationBack?: string;
        close?: string;
        menu?: string;
    };
}

export interface NavigationItem {
    title: string;
    url?: string;
    target?: string;
    children?: NavigationItem[];
    showChevron?: boolean;
    index: number;
}

export interface NavigationNode {
    id: string;
    parent: ReactElement;
    children?: NavigationNode[];
    level: number;
    index: number;
}

interface NavigationContext {
    icons?: MobileNavigationProps["icons"];
    navigationLevel?: MobileNavigationProps["navigationLevel"];
    setMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
    setSecondaryLevel: React.Dispatch<React.SetStateAction<NavigationItem[]>>;
    setThirdLevel: React.Dispatch<React.SetStateAction<NavigationItem[]>>;
    setPrimarySelected: React.Dispatch<React.SetStateAction<NavigationNode>>;
    setSecondarySelected: React.Dispatch<React.SetStateAction<NavigationNode>>;
    primarySelected: NavigationNode;
    secondarySelected: NavigationNode;
}

let generateElementByLevel = ( item: NavigationItem, level: number, context: NavigationContext ): ReactElement<any, string> => {

    let onClickFunction: () => void = () => {};
    let itemClass: string = "";
    const hasChildren = Boolean( item.children?.length && ( !context.navigationLevel || level < context.navigationLevel ) );
    const hasChevron = Boolean( ( !context.navigationLevel || level < context.navigationLevel ) && ( item.showChevron || hasChildren ) );

    switch ( level ) {
        case 1: {
            itemClass = `mobile-primary-navigation-${item.index}-${item.title}`;
            onClickFunction = function () {
                if ( item.title === "Home" ) {
                    context.setSecondaryLevel( [] );
                    context.setThirdLevel( [] );
                    context.setMenuActive( false );
                    document.getElementsByTagName( "body" )[0].classList.remove( "dxNavHeaderMobile--scrolling-stop" );
                } else if ( hasChildren ) {
                    const itemNode: NavigationNode = {
                        id: item.title,
                        level: level,
                        parent: generateElementByLevel( item, level, context ),
                        index: item.index,
                        children: processItems( item.children!, level + 1, context )
                    };
                    context.setPrimarySelected( itemNode );
                    context.setSecondaryLevel( [...item.children!] );
                }
            };

            break;
        }
        case 2: {
            itemClass = `mobile-secondary-navigation-${item.index}-${item.title}`;
            onClickFunction = function () {
                if ( hasChildren ) {
                    const itemNode: NavigationNode = {
                        id: item.title,
                        level: level,
                        parent: generateElementByLevel( item, level, context ),
                        index: item.index,
                        children: processItems( item.children!, level + 1, context )
                    };
                    context.setSecondarySelected( itemNode );
                    context.setThirdLevel( [...item.children!] );
                }
            };
            break;
        }

        case 3: {
            itemClass = `mobile-third-navigation-${item.index}-${item.title}`;
            break;
        }

        default: {
            return <div>NO DATA</div>;
        }
    }
    const isLandingItem = item.title.endsWith( " Landing" );
    let navigationItem = (
        <li key={"primary-navigation-" + item.index} className={"dxNavHeaderMobile__primaryItem _18-semibold " + itemClass}
            onClick={() => { onClickFunction(); }} >
            < span className={"dxNavHeaderMobile__itemBorder "}></span>
            < a
                className={"dxNavHeaderMobile__itemContent _18-semibold " + ( level == 1 ? "with_border" : "secondary-item" ) + ( item.title === "Home" ? " home-item" : "" ) + ( isLandingItem ? " landing-item" : "" )}
                href={( item.url && !hasChevron ) ? item.url : undefined}
                target={getLinkTarget( item.target )}
                onClick={( event ) => {
                    if ( item.title === "Home" ) {
                        event.preventDefault();
                    }
                }}
            >
                {hasChevron ? (
                    <span className="dxNavHeaderMobile__itemLeftContent">
                        <p>{item.title}</p>
                    </span>
                ) : item.title === "Home" ? (
                    <span className="dxNavHeaderMobile__itemLeftContent home">
                        <i className="dxNavHeaderMobile__itemHomeIcon ci-House_03" aria-hidden="true"></i>
                        <p>{item.title}</p>
                    </span>
                ) : isLandingItem ? (
                    <span className="dxNavHeaderMobile__itemLeftContent landing">
                        <p>{item.title}</p>
                    </span>
                ) : (
                    <p>{item.title}</p>
                )}
                {getLinkIcon( item.target )}
                {
                    hasChevron &&
                    <span className="dxNavHeaderMobile__itemChevron" aria-hidden="true">
                        <i className={`${getIcon( context.icons, "navigationFoward", "ci-Chevron_Right" )} chevron`}></i>
                    </span>
                }
            </a >
        </li>
    );

    return navigationItem;
};

let processItems = ( items: NavigationItem[], level: number, context: NavigationContext ): NavigationNode[] => {
    let itemsTree: NavigationNode[] = [];
    items.forEach( ( item: NavigationItem ) => {
        const itemNode: NavigationNode = {
            id: item.title,
            level: level,
            parent: generateElementByLevel( item, level, context ),
            index: item.index
        };
        if ( item.children && ( !context.navigationLevel || level < context.navigationLevel ) ) {
            itemNode.children = processItems( item.children, level + 1, context );
        }
        itemsTree.push( itemNode );
    } );
    return itemsTree;
};

let renderSecondaryLevel = ( context: NavigationContext ): ReactElement[] => {
    let secondaryLevelItems: ReactElement[] = [];
    secondaryLevelItems.push(
        <li data-testid="second-return-item" key={"primary-navigation-top"} className={"dxNavHeaderMobile__primaryItem _18-semibold "}
            onClick={() => {
                context.setSecondaryLevel( [] );
                context.setThirdLevel( [] );
            }} >
            < span className={"dxNavHeaderMobile__itemBorder "}></span>
            < a className={"dxNavHeaderMobile__itemContent back home-return _18-semibold "}>
                <span className="dxNavHeaderMobile__itemLeftContent home-return-content">
                    <i className={getIcon( context.icons, "navigationBack", "ci-Arrow_Sub_Up_Left" )} aria-hidden="true"></i>
                    <p>Back to Home</p>
                </span>
            </a >
        </li>
    );
    secondaryLevelItems.push(
        generateElementByLevel( {
            title: `${context.primarySelected.id} Landing`,
            index: -1
        }, 2, context )
    );
    if ( context.primarySelected.children ) {
        context.primarySelected.children.forEach( ( item: NavigationNode ) => {
            secondaryLevelItems.push( item.parent );
        } );
    }

    return secondaryLevelItems;
};

let renderThirdLevel = ( context: NavigationContext ): ReactElement[] => {
    let secondaryLevelItems: ReactElement[] = [];
    secondaryLevelItems.push(
        <li data-testid="third-return-item" key={"primary-navigation-top"} className={"dxNavHeaderMobile__primaryItem _18-semibold "}
            onClick={() => {
                context.setThirdLevel( [] );
            }} >
            < span className={"dxNavHeaderMobile__itemBorder "}></span>
            <a className={"dxNavHeaderMobile__itemContent return-item back home-return _18-semibold "}>
                <span className="dxNavHeaderMobile__itemLeftContent home-return-content">
                    <i className={getIcon( context.icons, "navigationBack", "ci-Arrow_Sub_Up_Left" )} aria-hidden="true"></i>
                    <p>Back to {context.primarySelected.id}</p>
                </span>
            </a >
        </li>
    );
    if ( context.secondarySelected.children ) {
        context.secondarySelected.children.forEach( ( item: NavigationNode ) => {
            secondaryLevelItems.push( item.parent );
        } );
    }

    return secondaryLevelItems;
};

const DXNavigationHeaderMobile = ( props: MobileNavigationProps ) => {
    const navigationRef = useRef<HTMLDivElement>( null );
    document.documentElement.style.setProperty( '--headerHeight', props.headerHeight || "80px" );

    //Initializing Hooks
    let aux: NavigationItem[] = [];
    let emptyNavNode: NavigationNode = {
        id: "",
        parent: <></>,
        level: -1,
        index: -1
    };
    const [searchIsActive, setSearchActive] = useState( false );
    const [menuIsActive, setMenuActive] = useState( false );
    const [secondaryActive, setSecondaryLevel] = useState( aux );
    const [thirdActive, setThirdLevel] = useState( aux );
    const [primarySelected, setPrimarySelected] = useState( emptyNavNode );
    const [secondarySelected, setSecondarySelected] = useState( emptyNavNode );
    const navigationContext: NavigationContext = {
        icons: props.icons,
        navigationLevel: props.navigationLevel,
        setMenuActive,
        setSecondaryLevel,
        setThirdLevel,
        setPrimarySelected,
        setSecondarySelected,
        primarySelected,
        secondarySelected
    };
    const [selectorMenuOpen, setSelectorMenuOpen] = useState( false );
    const [searchValue, setSearchValue] = useState( "" );
    const [searchInputActive, setSearchInputActive] = useState( false );
    const [searchLoading, setSearchLoading] = useState( false );
    const [searchSubmitted, setSearchSubmitted] = useState( false );
    const [helpActive, setHelpActive] = useState( false );
    const [savedLinksActive, setSavedLinksActive] = useState( false );
    const [nextActivityActive, setNextActivityActive] = useState( false );
    const [accountActive, setAccountActive] = useState( false );
    const searchLoadingTimer = useRef<number | undefined>( undefined );
    const helpResourceScrollRef = useRef<HTMLDivElement>( null );
    const helpResourceDragRef = useRef( { startX: 0, startScrollLeft: 0 } );
    const [helpResourceScrollOffset, setHelpResourceScrollOffset] = useState( 0 );
    const searchHistoryLabels = ["password", "Time Off", "Annual Retreat", "LEO password reset", "password Help"];
    const searchQuery = searchValue.trim().toLowerCase();
    const hasSearchHistoryMatch = searchQuery.length > 0 && searchHistoryLabels.some( ( label ) => label.toLowerCase() === searchQuery );
    const searchResultLabels = Array( searchSubmitted && hasSearchHistoryMatch ? 5 : 3 ).fill( "Card Title" );
    const updateHelpResourceScrollOffset = () => {
        const scrollElement = helpResourceScrollRef.current;
        if ( !scrollElement ) return;

        const maxScrollLeft = scrollElement.scrollWidth - scrollElement.clientWidth;
        const scrollRatio = maxScrollLeft > 0 ? scrollElement.scrollLeft / maxScrollLeft : 0;
        setHelpResourceScrollOffset( scrollRatio * 149 );
    };
    const scrollHelpResourcesToTrackPosition = ( event: React.MouseEvent<HTMLDivElement> ) => {
        const scrollElement = helpResourceScrollRef.current;
        if ( !scrollElement || event.target !== event.currentTarget ) return;

        const trackBounds = event.currentTarget.getBoundingClientRect();
        const maxScrollLeft = scrollElement.scrollWidth - scrollElement.clientWidth;
        const requestedOffset = Math.max( 0, Math.min( 149, event.clientX - trackBounds.left - 103 ) );
        scrollElement.scrollLeft = maxScrollLeft * ( requestedOffset / 149 );
        updateHelpResourceScrollOffset();
    };
    const startHelpResourceThumbDrag = ( event: React.PointerEvent<HTMLSpanElement> ) => {
        helpResourceDragRef.current = {
            startX: event.clientX,
            startScrollLeft: helpResourceScrollRef.current?.scrollLeft || 0
        };
        event.currentTarget.setPointerCapture( event.pointerId );
    };
    const moveHelpResourceThumb = ( event: React.PointerEvent<HTMLSpanElement> ) => {
        if ( !event.currentTarget.hasPointerCapture( event.pointerId ) ) return;

        const scrollElement = helpResourceScrollRef.current;
        if ( !scrollElement ) return;

        const maxScrollLeft = scrollElement.scrollWidth - scrollElement.clientWidth;
        scrollElement.scrollLeft = helpResourceDragRef.current.startScrollLeft + ( event.clientX - helpResourceDragRef.current.startX ) * ( maxScrollLeft / 149 );
        updateHelpResourceScrollOffset();
    };
    const utilityItems = props.utilityZone?.items.map( ( item: UtilityZoneProps["items"][number] ) => ( {
        ...item,
        ...( item.image ? { image: { ...item.image, url: "/avatar.png" } } : {} ),
        onClick: () => {
            setHelpActive( false );
            setSavedLinksActive( false );
            setNextActivityActive( false );
            setAccountActive( false );
            if ( item.icon === "ci-Circle_Help" ) {
                setHelpActive( true );
            }
            if ( item.icon === "ci-Tag" ) {
                setSavedLinksActive( true );
            }
            if ( item.icon === "ci-List_Checklist" ) {
                setNextActivityActive( true );
            }
            if ( item.image ) {
                setAccountActive( true );
            }
            item.onClick?.();
        }
    } ) );

    const renderSearchHistoryLabel = ( label: string ) => {
        const matchStart = searchQuery ? label.toLowerCase().indexOf( searchQuery ) : -1;
        const matchEnd = matchStart + searchQuery.length;

        return (
            <button
                key={label}
                type="button"
                className="dxNavHeaderMobile__searchHistoryLabel"
                aria-label={`Search for ${label}`}
                onClick={() => {
                    setSearchValue( label );
                    setSearchInputActive( true );
                    setSearchSubmitted( true );
                    startSearchLoading();
                }}
            >
                <i className="ci-Clock" aria-hidden="true"></i>
                <span>
                    {matchStart >= 0 ? (
                        <>
                            {label.slice( 0, matchStart )}
                            <strong>{label.slice( matchStart, matchEnd )}</strong>
                            {label.slice( matchEnd )}
                        </>
                    ) : label}
                </span>
            </button>
        );
    };

    const startSearchLoading = () => {
        if ( searchLoadingTimer.current ) {
            window.clearTimeout( searchLoadingTimer.current );
        }
        setSearchLoading( true );
        searchLoadingTimer.current = window.setTimeout( () => setSearchLoading( false ), 1000 );
    };

    useEffect( () => {
        const handleOutsideClick = ( event: MouseEvent ) => {
            if ( navigationRef.current && !navigationRef.current.contains( event.target as Node ) ) {
                setMenuActive( false );
                setSearchActive( false );
                setSelectorMenuOpen( false );
                setSecondaryLevel( [] );
                setThirdLevel( [] );
                document.getElementsByTagName( "body" )[0].classList.remove( "dxNavHeaderMobile--scrolling-stop" );
            }
        };

        document.addEventListener( "mousedown", handleOutsideClick );
        return () => document.removeEventListener( "mousedown", handleOutsideClick );
    }, [] );
    //END Hook Initializing

    let children: NavigationNode[] = [];
    if ( props.navigationItems ) {
        children = ( processItems( props.navigationItems, 1, navigationContext ) );
    }
    let primaryLevel: ReactElement[] = [];
    let secondaryLevels: NavigationNode[][] = [];

    children.forEach( ( node ) => {
        if ( node.level == 1 && node.parent ) {
            primaryLevel.push( node.parent );
        }
        if ( node.children ) {
            secondaryLevels.push( node.children );
        } else {
            secondaryLevels.push( [] );
        }

    } );
    return (
        <div ref={navigationRef} className={"dxNavHeaderMobile" + ( menuIsActive ? " active" : "" ) + ( props.utilityZone ? " utility-active" : "" )}>
            <Container fluid="xl" data-testid="menu-container" className={menuIsActive ? "active" : "hidden"}>
                <Row className={"dxNavHeaderMobile__topRow justify-content-between " + ( searchIsActive ? "search-active" : "" )}>
                    {/* Menu button-icon */}
                    <Col xs={1} className={"dxNavHeaderMobile__headerCol" + ( searchIsActive ? "" : " active" )}>
                        <DXButton
                            label={menuIsActive ? "close menu" : "menu"}
                            hideLabel
                            displayType="unstyled"
                            className={"dxNavHeaderMobile__headerButton align-right" + ( menuIsActive ? " active" : "" )}
                            data-testid="menu-button"
                            onClick={() => {
                                if ( !menuIsActive ) {
                                    setMenuActive( true );
                                    setSearchActive( false );
                                    setSearchInputActive( false );
                                    setSearchValue( "" );
                                    setSearchSubmitted( false );
                                    setSelectorMenuOpen( false );
                                    document.getElementsByTagName( "body" )[0].classList.add( "dxNavHeaderMobile--scrolling-stop" );
                                } else {
                                    document.getElementsByTagName( "body" )[0].classList.remove( "dxNavHeaderMobile--scrolling-stop" );
                                    setMenuActive( false );
                                    setSecondaryLevel( [] );
                                    setThirdLevel( [] );
                                }
                            }}
                            icon={{ class: getIcon( props.icons, menuIsActive ? "close" : "menu", menuIsActive ? "ci-Close_MD" : "ci-Hamburger_LG" ) }}
                        />
                    </Col>
                    {/* Header image container */}
                    <Col xs={10} className="dxNavHeaderMobile__headerCol active">
                        {searchIsActive ? (
                            <div className="dxNavHeaderMobile__searchTitle">SEARCH</div>
                        ) : (
                            <div className='dxNavHeaderMobile__headerImage'>
                                <div className="dxNavHeaderMobile__portalLogo">
                                    <img src={props.navigationImage}
                                        alt={props.navigationImageAlt ? props.navigationImageAlt : "Header Image"}
                                        height={props.navigationImageHeight ? props.navigationImageHeight : 25}
                                        width={props.navigationImageWidth ? props.navigationImageWidth : 195}
                                    >
                                    </img>
                                </div>
                            </div>
                        )}
                    </Col>
                    {/* Search or close button */}
                    <Col xs={1} className="dxNavHeaderMobile__headerCol active">
                        {searchIsActive ? (
                            <DXButton
                                label="close search"
                                hideLabel
                                data-testid="search-close"
                                displayType="unstyled"
                                className="dxNavHeaderMobile__headerButton dxNavHeaderMobile__searchClose active"
                                onClick={() => {
                                    setSearchActive( false );
                                    setSearchInputActive( false );
                                    setSearchValue( "" );
                                    setSelectorMenuOpen( false );
                                }}
                                icon={{ class: getIcon( props.icons, "close", "ci-Close_MD" ) }} />
                        ) : (
                            <DXButton
                                label="search icon"
                                hideLabel
                                data-testid="search-show"
                                displayType="unstyled"
                                className={"dxNavHeaderMobile__headerButton" + ( searchIsActive ? " active" : "" )}
                                onClick={() => {
                                    setMenuActive( false );
                                    setSearchActive( true );
                                    setSearchInputActive( false );
                                    setSearchValue( "" );
                                    setSearchSubmitted( false );
                                }}
                                icon={{ class: getIcon( props.icons, "search", "ci-Search_Magnifying_Glass" ) }} />
                        )}
                    </Col>
                </Row>
                {searchIsActive && (
                    <div className="dxNavHeaderMobile__contentSearch">
                        <div
                            className="dxNavHeaderMobile__selector"
                            role="button"
                            tabIndex={0}
                            aria-label="Search scope"
                            aria-expanded={selectorMenuOpen}
                            onClick={() => setSelectorMenuOpen( !selectorMenuOpen )}
                            onKeyDown={( event ) => {
                                if ( event.key === "Enter" || event.key === " " ) {
                                    event.preventDefault();
                                    setSelectorMenuOpen( !selectorMenuOpen );
                                }
                            }}
                        >
                            <span>All</span>
                            <i className="ci-Chevron_Down" aria-hidden="true"></i>
                        </div>
                        {selectorMenuOpen && (
                            <div className="dxNavHeaderMobile__selectorOverlay" role="menu" aria-label="Search filters">
                                {["Applications", "People", "News", "Resources", "Projects"].map( ( item, index, items ) => (
                                    <button
                                        key={item}
                                        type="button"
                                        className={"dxNavHeaderMobile__selectorItem" + ( index === items.length - 1 ? " projects" : "" )}
                                        role="menuitem"
                                        onClick={() => setSelectorMenuOpen( false )}
                                    >
                                        <span className="dxNavHeaderMobile__selectorItemTitle">{item}</span>
                                    </button>
                                ) )}
                            </div>
                        )}
                        <div data-testid="search-container" className={"dxNavHeaderMobile__searchCol active" + ( searchInputActive ? " search-active" : "" ) + ( searchLoading ? " search-loading" : "" ) + ( searchSubmitted && !searchLoading ? " search-submitted" : "" )}>
                            {searchLoading ? (
                                <div className="dxNavHeaderMobile__searchLoading" aria-live="polite">
                                    <div className="dxNavHeaderMobile__searchLoadingReload">
                                        <i className="ci-Arrows_Reload_01" aria-hidden="true"></i>
                                    </div>
                                    <span className="dxNavHeaderMobile__searchLoadingText">Searching ...</span>
                                    <DXButton
                                        label="clear search"
                                        hideLabel
                                        data-testid="search-loading-clear"
                                        displayType="unstyled"
                                        className="dxNavHeaderMobile__searchLoadingClear"
                                        onClick={() => {
                                            setSearchValue( "" );
                                            setSearchSubmitted( false );
                                            setSearchInputActive( false );
                                        }}
                                        icon={{ class: getIcon( props.icons, "close", "ci-Close_MD" ) }}
                                    />
                                </div>
                            ) : searchSubmitted && !hasSearchHistoryMatch ? (
                                <div className="dxNavHeaderMobile__searchSubmittedBar">
                                    <div className="dxNavHeaderMobile__searchLoadingReload">
                                        <i className="ci-Arrows_Reload_01" aria-hidden="true"></i>
                                    </div>
                                    <span className="dxNavHeaderMobile__searchLoadingText">{searchValue.trim()}</span>
                                    <DXButton
                                        label="clear search"
                                        hideLabel
                                        data-testid="search-submitted-clear"
                                        displayType="unstyled"
                                        className="dxNavHeaderMobile__searchLoadingClear"
                                        onClick={() => {
                                            setSearchValue( "" );
                                            setSearchSubmitted( false );
                                            setSearchInputActive( false );
                                        }}
                                        icon={{ class: getIcon( props.icons, "close", "ci-Close_MD" ) }}
                                    />
                                </div>
                            ) : (
                                <>
                                    <Form onSubmit={( event: React.FormEvent<HTMLFormElement> ) => {
                                        event.preventDefault();
                                        props.searchSubmit( event );
                                        if ( searchValue.trim() ) {
                                            setSearchSubmitted( true );
                                            startSearchLoading();
                                        }
                                    }}>
                                        <Form.Group className={"dxNavHeaderMobile__search" + ( searchInputActive ? " search-active" : "" ) + ( searchSubmitted && !searchLoading ? " search-submitted" : "" )} onSubmit={() => {}} >
                                            <InputGroup>
                                                <div className={"input-group-inset-item dxNavHeaderMobile__searchButton" + ( searchInputActive ? " active" : "" )}>
                                                    <DXButton
                                                        label="search icon"
                                                        hideLabel
                                                        data-testid="search-button"
                                                        displayType="unstyled"
                                                        type="submit"
                                                        icon={{
                                                            class: getIcon( props.icons, "search", "ci-Search_Magnifying_Glass" )
                                                        }} />
                                                </div>
                                                <div className={"input-group-item input-group-prepend" + ( searchInputActive ? " active" : "" )}>
                                                    <Form.Control className="dxNavHeaderMobile__searchInput" placeholder="Search this site" type="text" value={searchValue} onFocus={() => setSearchInputActive( true )} onChange={( event: React.ChangeEvent<HTMLInputElement> ) => {
                                                        setSearchValue( event.target.value );
                                                        setSearchSubmitted( false );
                                                    }} />
                                                </div>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form>
                                    {searchInputActive && (
                                        <DXButton
                                            label="clear search"
                                            hideLabel
                                            data-testid="search-clear"
                                            displayType="unstyled"
                                            className="dxNavHeaderMobile__searchClear"
                                            onClick={() => {
                                                setSearchValue( "" );
                                                setSearchSubmitted( false );
                                                setSearchInputActive( false );
                                            }}
                                            icon={{ class: getIcon( props.icons, "close", "ci-Close_MD" ) }}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                        {searchQuery ? (
                            <div className={"dxNavHeaderMobile__searchResults" + ( searchSubmitted && hasSearchHistoryMatch ? " expanded" : "" ) + ( searchSubmitted && !hasSearchHistoryMatch ? " no-results" : "" ) + ( searchLoading ? " loading" : " completed" )} aria-label="Search results">
                                {searchLoading ? (
                                    <>
                                        <span className="dxNavHeaderMobile__searchResultsLabel">Fetching top results for:</span>
                                        <span className="dxNavHeaderMobile__searchResultsQuery">{searchValue.trim()}</span>
                                        <div className="dxNavHeaderMobile__searchResultsFrame">
                                            <img src="/ajax-loader.gif" alt="" width="100" height="100" />
                                        </div>
                                    </>
                                ) : searchSubmitted && !hasSearchHistoryMatch ? (
                                    <>
                                        <span className="dxNavHeaderMobile__searchResultsLabel">Check the spelling or try a new search.</span>
                                        <span className="dxNavHeaderMobile__searchResultsQuery">No results</span>
                                        <div className="dxNavHeaderMobile__searchResultsFrame" aria-hidden="true" />
                                    </>
                                ) : (
                                    <>
                                        {searchResultLabels.map( ( label, index ) => (
                                            <div className="dxNavHeaderMobile__searchResultItem" key={`${label}-${index}`}>
                                                <button
                                                    type="button"
                                                    className="dxNavHeaderMobile__searchResultCard"
                                                    aria-label="Card Title, Source"
                                                >
                                                    <span className="dxNavHeaderMobile__searchResultTitle">{label}</span>
                                                    <span className="dxNavHeaderMobile__searchResultSource">Source</span>
                                                </button>
                                            </div>
                                        ) )}
                                        {searchSubmitted && hasSearchHistoryMatch ? (
                                            <>
                                                <div className="dxNavHeaderMobile__otherResults" aria-label="Other Results">
                                                    <div className="dxNavHeaderMobile__otherResultsMain">Other Results:</div>
                                                    <div className="dxNavHeaderMobile__otherResultsOptions">
                                                        {[["People", "6", "105"], ["Video", "8", "97"], ["News", "22", "101"], ["Applications", "3", "139"]].map( ( [label, count, width] ) => (
                                                            <button
                                                                key={label}
                                                                type="button"
                                                                className="dxNavHeaderMobile__otherResultsButton"
                                                                style={{ width: `${width}px`, flexBasis: `${width}px` }}
                                                                aria-label={`${label} ${count}`}
                                                            >
                                                                <span>{label}</span>
                                                                <span className="dxNavHeaderMobile__otherResultsBadge">{count}</span>
                                                            </button>
                                                        ) )}
                                                    </div>
                                                </div>
                                                <div className="dxNavHeaderMobile__goToResults" aria-label="Go to Results">
                                                    <button type="button" className="dxNavHeaderMobile__goToResultsButton">
                                                        Regular Button
                                                    </button>
                                                </div>
                                                <div className="dxNavHeaderMobile__searchResultsBlank" aria-hidden="true" />
                                            </>
                                        ) : (
                                            <div className="dxNavHeaderMobile__searchHistory typed" aria-label="Search History">
                                                {searchHistoryLabels
                                                    .filter( ( label ) => label.toLowerCase().includes( searchQuery ) )
                                                    .map( renderSearchHistoryLabel )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ) : <div className="dxNavHeaderMobile__searchHistory" aria-label="Search History">
                            {searchHistoryLabels
                                .filter( ( label ) => label.toLowerCase().includes( searchQuery ) )
                                .map( renderSearchHistoryLabel )}
                        </div>}
                    </div>
                )}
                <Row
                    className={"dxNavHeaderMobile__menuRow " + ( menuIsActive ? "active" : "" )}
                    onClick={( event: React.MouseEvent<HTMLElement> ) => {
                        if ( event.target !== event.currentTarget ) return;

                        setMenuActive( false );
                        setSecondaryLevel( [] );
                        setThirdLevel( [] );
                        document.getElementsByTagName( "body" )[0].classList.remove( "dxNavHeaderMobile--scrolling-stop" );
                    }}
                >
                    <Col data-testid="first-level-column" className={"dxNavHeaderMobile__navigationCol primary " + ( menuIsActive && !secondaryActive.length ? "active" : "" )} xs={12}>
                        <ul className="dxNavHeaderMobile__itemContainer">
                            {primaryLevel}
                        </ul>
                    </Col>
                    <Col xs={12} data-testid="second-level-column" className={"dxNavHeaderMobile__navigationCol secondary " + ( ( secondaryActive.length && !( thirdActive.length ) ) ? "active" : "" )}>
                        <ul className="dxNavHeaderMobile__itemContainer">
                            {renderSecondaryLevel( navigationContext )}
                        </ul>
                    </Col>
                    <Col xs={12} data-testid="third-level-column" className={"dxNavHeaderMobile__navigationCol secondary " + ( thirdActive.length ? "active" : "" )}>
                        <ul className="dxNavHeaderMobile__itemContainer">
                            {renderThirdLevel( navigationContext )}
                        </ul>
                    </Col>
                </Row>
                {!searchIsActive && (
                    <div className={"dxNavHeaderMobile__contentSpacer" + ( menuIsActive ? " menu-active" : "" ) + ( helpActive || savedLinksActive || nextActivityActive || accountActive ? " help-active" : "" )}>
                        {helpActive && (
                            <>
                                <div className="dxNavHeaderMobile__utilityHelpHeader">
                                    <div className="dxNavHeaderMobile__utilityHelpTitle">Help</div>
                                    <button
                                        type="button"
                                        className="dxNavHeaderMobile__utilityHelpClose"
                                        aria-label="Close Help"
                                        onClick={() => setHelpActive( false )}
                                    >
                                        <i className="ci-Close_Circle" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div className="dxNavHeaderMobile__utilityHelpContent" aria-label="Help content">
                                    <div className="dxNavHeaderMobile__utilityHelpFirstRow">
                                        <div className="dxNavHeaderMobile__utilityHelpActionRow">
                                            <button type="button" className="dxNavHeaderMobile__utilityHelpAction talk">Talk to us</button>
                                            <button type="button" className="dxNavHeaderMobile__utilityHelpAction center">Help Center</button>
                                            <button type="button" className="dxNavHeaderMobile__utilityHelpAction feedback">Feedback</button>
                                        </div>
                                    </div>
                                    <section className="dxNavHeaderMobile__utilityHelpResources" aria-labelledby="utility-help-resources-title">
                                        <h2 id="utility-help-resources-title">Check out this resources</h2>
                                        <div className="dxNavHeaderMobile__utilityHelpMiniCatalog">
                                            <div
                                                className="dxNavHeaderMobile__utilityHelpMiniCatalogScroll"
                                                id="dx-nav-header-mobile-help-resources"
                                                ref={helpResourceScrollRef}
                                                onScroll={updateHelpResourceScrollOffset}
                                            >
                                                {[1, 2, 3].map( ( card ) => (
                                                    <button type="button" className="dxNavHeaderMobile__utilityHelpResourceCard" key={card}>
                                                        <span className="dxNavHeaderMobile__utilityHelpResourceTitle">Card Title</span>
                                                        <span className="dxNavHeaderMobile__utilityHelpResourceDescription">Description</span>
                                                        <span className="dxNavHeaderMobile__utilityHelpResourceMetadata">Additional Metadata</span>
                                                    </button>
                                                ) )}
                                            </div>
                                            <div
                                                className="dxNavHeaderMobile__utilityHelpScrollbar"
                                                onClick={scrollHelpResourcesToTrackPosition}
                                                role="scrollbar"
                                                aria-controls="dx-nav-header-mobile-help-resources"
                                                aria-label="Help resources scroll position"
                                                aria-valuemin={0}
                                                aria-valuemax={149}
                                                aria-valuenow={Math.round( helpResourceScrollOffset )}
                                            >
                                                <span
                                                    onPointerDown={startHelpResourceThumbDrag}
                                                    onPointerMove={moveHelpResourceThumb}
                                                    style={{ transform: `translateX(${helpResourceScrollOffset}px)` }}
                                                />
                                            </div>
                                        </div>
                                    </section>
                                    <section className="dxNavHeaderMobile__utilityHelpOptions" aria-label="Help options">
                                        <div className="dxNavHeaderMobile__utilityHelpOptionsRow">
                                            <button type="button" className="dxNavHeaderMobile__utilityHelpOption case-status">Case Status</button>
                                            <button type="button" className="dxNavHeaderMobile__utilityHelpOption open-case">Open Case</button>
                                        </div>
                                        <button type="button" className="dxNavHeaderMobile__utilityHelpSelfService">Self-Service options</button>
                                    </section>
                                </div>
                            </>
                        )}
                        {savedLinksActive && (
                            <>
                                <div className="dxNavHeaderMobile__utilityHelpHeader">
                                    <div className="dxNavHeaderMobile__utilityHelpTitle">Saved links</div>
                                    <button
                                        type="button"
                                        className="dxNavHeaderMobile__utilityHelpClose"
                                        aria-label="Close Saved links"
                                        onClick={() => setSavedLinksActive( false )}
                                    >
                                        <i className="ci-Close_Circle" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div className="dxNavHeaderMobile__utilitySavedLinksContent" aria-label="Saved links content">
                                    <div className="dxNavHeaderMobile__utilitySavedLinksOptions">
                                        <button type="button" className="dxNavHeaderMobile__utilitySavedLinksEdit">Edit</button>
                                    </div>
                                    <div className="dxNavHeaderMobile__utilitySavedLinksList">
                                        {Array.from( { length: 15 }, ( _, index ) => (
                                            <button type="button" className="dxNavHeaderMobile__utilitySavedLink" key={index}>
                                                <span className="dxNavHeaderMobile__utilitySavedLinkTitle">Card Title</span>
                                                <span className="dxNavHeaderMobile__utilitySavedLinkSource">Source</span>
                                            </button>
                                        ) )}
                                    </div>
                                </div>
                            </>
                        )}
                        {( nextActivityActive || accountActive ) && (
                            <>
                                <div className="dxNavHeaderMobile__utilityHelpHeader">
                                    <div className="dxNavHeaderMobile__utilityHelpTitle">
                                        {nextActivityActive ? "My Next Activity" : "My Account"}
                                    </div>
                                    <button
                                        type="button"
                                        className="dxNavHeaderMobile__utilityHelpClose"
                                        aria-label={`Close ${nextActivityActive ? "My Next Activity" : "My Account"}`}
                                        onClick={() => {
                                            setNextActivityActive( false );
                                            setAccountActive( false );
                                        }}
                                    >
                                        <i className="ci-Close_Circle" aria-hidden="true"></i>
                                    </button>
                                </div>
                                {nextActivityActive ? (
                                    <div className="dxNavHeaderMobile__utilitySimpleContent dxNavHeaderMobile__utilityNextActivityContent" aria-label="My Next Activity content">
                                        <div className="dxNavHeaderMobile__utilityNextActivityButtons">
                                            <button type="button" className="dxNavHeaderMobile__utilityNextActivityButton first">To do</button>
                                            <button type="button" className="dxNavHeaderMobile__utilityNextActivityButton middle">In progress</button>
                                            <button type="button" className="dxNavHeaderMobile__utilityNextActivityButton last">Complete</button>
                                        </div>
                                        <div className="dxNavHeaderMobile__utilityNextActivityCards">
                                            {Array.from( { length: 3 }, ( _, index ) => (
                                                <article className="dxNavHeaderMobile__utilityNextActivityCard" key={index}>
                                                    <div className="dxNavHeaderMobile__utilityNextActivityImageBlock">
                                                        <img src="/chessboard.jpg" alt="" />
                                                        <span className="dxNavHeaderMobile__utilityNextActivityLines" aria-hidden="true" />
                                                        <span className="dxNavHeaderMobile__utilityNextActivityCheckbox" aria-hidden="true" />
                                                        <span className="dxNavHeaderMobile__utilityNextActivitySticker" aria-hidden="true">
                                                            <i className="ci-Image_01" />
                                                        </span>
                                                    </div>
                                                    <div className="dxNavHeaderMobile__utilityNextActivityListBlock">
                                                        <div className="dxNavHeaderMobile__utilityNextActivityListContent">
                                                            <div className="dxNavHeaderMobile__utilityNextActivityCheckboxPosition">
                                                                <span className="dxNavHeaderMobile__utilityNextActivityListCheckbox" aria-hidden="true" />
                                                            </div>
                                                            <button type="button" className="dxNavHeaderMobile__utilityNextActivityKebab" aria-label="More card options">
                                                                <i className="ci-More_Vertical" aria-hidden="true" />
                                                            </button>
                                                            <div className="dxNavHeaderMobile__utilityNextActivityDetails">
                                                                <div className="dxNavHeaderMobile__utilityNextActivityLabelRow">
                                                                    <span className="dxNavHeaderMobile__utilityNextActivityLabel">LABEL TEXT</span>
                                                                    <span className="dxNavHeaderMobile__utilityNextActivityMetadata">Additional Metadata</span>
                                                                </div>
                                                                <h3>Card Title</h3>
                                                                <div className="dxNavHeaderMobile__utilityNextActivityContentBlock">
                                                                    <p>Description</p>
                                                                    <span className="dxNavHeaderMobile__utilityNextActivitySecondaryMetadata">Additional Metadata</span>
                                                                    <div className="dxNavHeaderMobile__utilityNextActivityAdvancedContent">
                                                                        <div className="dxNavHeaderMobile__utilityNextActivityDaysTime">
                                                                            <strong>T Th</strong>
                                                                            <span>11:30a - 01:00p</span>
                                                                        </div>
                                                                        <div className="dxNavHeaderMobile__utilityNextActivityDate">
                                                                            <span className="dxNavHeaderMobile__utilityNextActivityCalendar" aria-hidden="true">
                                                                                <i className="ci-Calendar" />
                                                                            </span>
                                                                            <span>Sep 08 - 03:30p-06:30p</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="dxNavHeaderMobile__utilityNextActivityAvatarZone">
                                                                    {Array.from( { length: 5 }, ( _, avatarIndex ) => (
                                                                        <img
                                                                            className="dxNavHeaderMobile__utilityNextActivityAvatar dxToolButton__image"
                                                                            key={avatarIndex}
                                                                            src="/avatar.png"
                                                                            alt=""
                                                                        />
                                                                    ) )}
                                                                </div>
                                                                <div className="dxNavHeaderMobile__utilityNextActivityDetailButtons">
                                                                    <button type="button">Button</button>
                                                                    <button type="button">Button</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>
                                            ) )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="dxNavHeaderMobile__utilitySimpleContent" aria-label="My Account content">
                                        <div className="dxNavHeaderMobile__utilityAccountList" role="list">
                                            {Array.from( { length: 5 }, ( _, index ) => (
                                                <div className="dxNavHeaderMobile__utilityAccountItem" role="listitem" key={index}>
                                                    <button type="button" className="dxNavHeaderMobile__utilityAccountCard">
                                                        <span className="dxNavHeaderMobile__utilityAccountLeftContent">
                                                            <i className="ci-External_Link dxNavHeaderMobile__utilityAccountIcon" aria-hidden="true"></i>
                                                            <span className="dxNavHeaderMobile__utilityAccountLabel">Card Title</span>
                                                        </span>
                                                        {index === 0 && (
                                                            <span className="dxNavHeaderMobile__utilityAccountBadge">123</span>
                                                        )}
                                                    </button>
                                                </div>
                                            ) )}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
                {!searchIsActive && !menuIsActive && props.utilityZone && (
                    <div className="dxNavHeaderMobile__utilityZone">
                        <DXUtilityZone {...props.utilityZone} items={utilityItems || props.utilityZone.items} enableIconPanels={false} />
                    </div>
                )}
            </Container>
        </div>
    );
};

export default DXNavigationHeaderMobile;