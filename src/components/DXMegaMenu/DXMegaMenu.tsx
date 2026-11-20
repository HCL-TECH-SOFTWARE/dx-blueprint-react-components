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

import React, { ReactElement, useEffect, useRef, useState, useMemo } from "react";
import "./DXMegaMenu.scss";
import { LinksProps, getIcon, getLinkIcon, getLinkTarget, renderOverlayElement, overflowText } from "../../utilities";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { createRoot, Root } from 'react-dom/client';
import { ExtendableProps, mergeRefs } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface MegaMenuProps {
    navigationItems: NavigationItem[];
    active?: number;
    menuImage?: string;
    globalLinks?: LinksProps[];
    secondaryLevelContainerId: string;
    parentRef?: React.MutableRefObject<null>;
    showOverlay?: boolean;
    showLandingCard?: boolean;
    socialLinks?: {
        url: string;
        label: string;
        iconClass?: string;
        image?: string;
    }[];
    icons?: {
        firstLevel?: string;
        secondLevel?: string;
    };
    titleCharLimit?: number;
}

export interface NavigationNode {
    id: string;
    index: number;
    parent: ReactElement;
    level: number;
    navigationItem: NavigationItem;
    children?: NavigationNode[];
}

export interface NavigationItem {
    index: number;
    title: string;
    selectedTitle?: string;
    caretOnSelection?: boolean;
    iconClass?: string;
    url?: string;
    target?: string;
    showChevron?: boolean;
    children?: NavigationItem[];
    bannerProps?: BannerProps[];
    onClick?: Function;
}

export interface BannerProps {
    title: string;
    image: string;
    body: string;
    imageFit?: string;
    link?: LinksProps;
}

interface SecondaryLevelItems {
    secondaryNodes: NavigationNode[],
}

var currentActive: number;
var setActive: React.Dispatch<React.SetStateAction<number>>;

var secCurrentActive: number;
var secSetActive: React.Dispatch<React.SetStateAction<number>>;

var thrdCurrentActive: number;
var thrdSetActive: React.Dispatch<React.SetStateAction<number>>;

const DXMegaMenu = ( props: ExtendableProps<MegaMenuProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { navigationItems: _navigationItems, active: _active, menuImage: _menuImage, globalLinks: _globalLinks, secondaryLevelContainerId: _secondaryLevelContainerId, parentRef: _parentRef, showOverlay: _showOverlay, showLandingCard: _showLandingCard, socialLinks: _socialLinks, icons: _icons, titleCharLimit: _titleCharLimit, className, ref, ...rest } = props;
    const wrapperRef = useRef<HTMLDivElement>( null );
    // The internal ref and the consumer ref both point at the root
    const mergedRootRef = useMemo( () => mergeRefs( wrapperRef, ref ), [ref] );
    const secondLevelRef = useRef( null );
    const secondLevelRootRef = useRef<{ container: Element; root: Root; } | null>( null );

    useOutsideAlerter( props.parentRef || wrapperRef, secondLevelRef );

    let emptyNavItem: NavigationItem = {
        title: "",
        index: -1,
    };

    function useOutsideAlerter( ref: any, secondRef: any ) {
        useEffect( () => {
            function handleClickOutside( event: MouseEvent ) {
                if ( ( ref.current && !ref.current.contains( event.target ) ) && ( secondRef.current && !secondRef.current.contains( event.target ) ) ) {
                    resetHooks( true, true, true );
                    setOverlayActive( false );
                }
            }
            document.addEventListener( "mousedown", handleClickOutside );
            return () => {
                document.removeEventListener( "mousedown", handleClickOutside );
            };
        }, [ref, secondRef] );
    }

    [currentActive, setActive] = useState( props.active || -1 );
    const [primaryNavItemActive, setPrimaryNavItemActive] = useState( props.active ? props.navigationItems[props.active] : emptyNavItem );

    [secCurrentActive, secSetActive] = useState( 0 );

    [thrdCurrentActive, thrdSetActive] = useState( 0 );

    function resetHooks( first: boolean, second: boolean, third: boolean ) {
        if ( first ) {
            setActive( -1 );
            setPrimaryNavItemActive( emptyNavItem );
        }
        if ( second ) {
            secSetActive( -1 );
        }
        if ( third ) {
            thrdSetActive( -1 );
        }
    }

    const togglePrimaryItem = ( item: NavigationItem ) => {
        if ( item.children && item.children.length > 0 && props.showOverlay ) {
            setOverlayActive( true );
        }
        if ( currentActive == item.index ) {
            resetHooks( true, true, true );
        } else {
            setActive( item.index );
            resetHooks( false, true, true );
            setPrimaryNavItemActive( item );
        }
    };

    const toggleSecondaryItem = ( item: NavigationItem ) => {
        if ( secCurrentActive == item.index ) {
            resetHooks( false, true, true );
        } else {
            resetHooks( false, false, true );
            secSetActive( item.index );
        }
    };

    let generateElementByLevel = ( item: NavigationItem, level: number ): ReactElement<any, string> => {
        switch ( level ) {
            case 1: {
                return (
                    <li className={`nav-item dxMegaMenu__firstLevelItem ${item.children ? "has-children" : ""} ${currentActive == item.index ? "active" : ""}`} key={"primary-navigation-" + item.index}>
                        <div className={`dxMegaMenu__firstLevelControl ${currentActive == item.index ? "active" : ""}`}>
                            <Button variant="light" role={!item.children ? "tab" : undefined} tabIndex={-1} className={`nav-link btn btn-unstyled ${currentActive == item.index ? "active" : ""}`}>
                                <a id={"primary-link-" + item.index}
                                    aria-label={item.title}
                                    title={item.title}
                                    href={( item.url ) ? item.url : undefined} target={getLinkTarget( item.target )} className="dxMegaMenu__firstLevelContent" data-testid="primary-link"
                                    onClick={( e ) => {
                                        if ( item.children && item.children.length > 0 ) {
                                            e.preventDefault();
                                            togglePrimaryItem( item );
                                            item.onClick?.();
                                        } else if ( item.onClick ) {
                                            e.preventDefault();
                                            item.onClick();
                                        }
                                    }}>
                                    {
                                        item.iconClass ?
                                            <i className={item.iconClass + " dxMegaMenu__firstLevelIcon"}></i>
                                            :
                                            <>
                                                {overflowText( currentActive == item.index && item.selectedTitle ? item.selectedTitle : item.title, props.titleCharLimit || 30 )}
                                                {getLinkIcon( item.target )}
                                            </>
                                    }
                                </a>
                            </Button>
                            {item.children && ( !item.caretOnSelection || currentActive == item.index ) &&
                                <Button variant="light" role="tab" className={`nav-link dxMegaMenu__primaryContainer ${currentActive == item.index ? "active" : ""}`}
                                    onClick={( e ) => {
                                        togglePrimaryItem( item );
                                        if ( item.onClick && !item.children ) {
                                            item.onClick();
                                        }
                                    }

                                    }
                                >
                                    <i data-testid="megaMenu__primaryIcon" id={"primary-icon-" + item.index} className={getIcon( props.icons, "firstLevel", "ci-Caret_Down_MD " ) + " dxMegaMenu__dropdownIcon"}
                                    ></i>
                                </Button>}
                        </div>

                    </li>
                );
            }
            case 2: {
                return (
                    <div key={"secondary-navigation-" + item.index} aria-label={"secondary-navigation-" + item.index}
                        className={"dxMegaMenu__secondaryItem " + ( secCurrentActive == item.index ? "active" : "" )}
                    >

                        <a className={"dxMegaMenu__secondaryItemContent"}
                            href={( item.url ) ? item.url : undefined}
                            target={getLinkTarget( item.target )}
                            data-testid="secondary-link"
                            aria-label={item.title}
                            title={item.title}
                            onClick={( e ) => {
                                if ( item.children ) {
                                    e.preventDefault();
                                    toggleSecondaryItem( item );
                                } else if ( item.onClick ) {
                                    e.preventDefault();
                                    item.onClick();
                                }
                            }}
                        >
                            <p>
                                {overflowText( item.title, props.titleCharLimit || 30 )}
                                {getLinkIcon( item.target )}
                            </p>

                        </a >
                        {( item.children || item.showChevron ) &&
                            <Button variant="light" className="dxMegaMenu__secondaryIconContainer"
                                onClick={( e ) => {
                                    if ( item.children ) {
                                        toggleSecondaryItem( item );
                                    }
                                    if ( item.onClick && !item.children ) {
                                        item.onClick();
                                    }
                                }}>
                                <i className={getIcon( props.icons, "secondLevel", "ci-Chevron_Right_MD" )}></i>
                            </Button>
                        }
                    </div>
                );
            }

            case 3: {
                return (
                    <div key={"third-item-" + item.index} aria-label={"third-navigation-" + item.index}
                        className={"dxMegaMenu__thirdItem " + ( thrdCurrentActive == item.index ? "active" : "" )}
                        onClick={( e ) => {
                            thrdSetActive( item.index );
                            if ( item.onClick && !item.children ) {
                                e.stopPropagation();
                                item.onClick();
                            }
                        }} >

                        <span className={"dxMegaMenu__thirdItemBorder " + ( thrdCurrentActive === item.index ? "active" : "" )}></span>
                        <a className={"dxMegaMenu__thirdItemContent"}
                            href={item.url}
                            data-testid="tertiary-link"
                            target={getLinkTarget( item.target )}
                            aria-label={item.title}
                            title={item.title}
                            onClick={( e ) => {
                                if ( item.onClick && !item.children ) {
                                    e.preventDefault();
                                }
                            }}>
                            {overflowText( item.title, props.titleCharLimit || 30 )}
                            {getLinkIcon( item.target )}
                        </a>
                    </div>
                );
            }

        }
        return <></>;
    };

    const processItems = ( items: NavigationItem[], level: number ): NavigationNode[] => {
        let itemsTree: NavigationNode[] = [];

        items.forEach( ( item: NavigationItem ) => {
            const itemNode: NavigationNode = {
                id: item.title,
                level: level,
                parent: generateElementByLevel( item, level ),
                index: item.index,
                navigationItem: item
            };
            if ( item.children ) {
                itemNode.children = processItems( item.children, level + 1 );
            }
            itemsTree.push( itemNode );
        } );

        return itemsTree;
    };

    const renderFirstLevel = () => {
        let primaryLevel: ReactElement[] = [];
        let nodes: NavigationNode[] = [];

        if ( props.navigationItems ) {
            nodes = processItems( props.navigationItems, 1 );
        }

        nodes.forEach( ( node ) => {
            if ( node.level == 1 && node.parent ) {
                primaryLevel.push( node.parent );
            }
        } );

        return primaryLevel;
    };

    function renderSecondaryLevel() {
        if ( primaryNavItemActive.children ) {
            let thirdLevelExists = false;
            let availableSpace = 100;

            let itemsCount = 0;
            let itemColumns: ReactElement[][] = [[], []];
            let thirdLevelCols: ReactElement[][] = [[], []];

            primaryNavItemActive.children?.forEach( ( secondLevelItem ) => {
                let secLevelElement = generateElementByLevel( secondLevelItem, 2 );
                itemColumns[itemsCount < 10 ? 0 : 1].push( secLevelElement );

                let thirdLevelColumn: any = undefined;
                if ( secondLevelItem.children ) {
                    thirdLevelExists = true;
                    thirdLevelColumn = renderThirdLevel( secondLevelItem );
                    thirdLevelCols[itemsCount < 10 ? 0 : 1].push( thirdLevelColumn );
                }
                itemsCount++;
            } );

            if ( itemsCount > 0 ) {
                if ( itemsCount > 10 ) {
                    availableSpace -= 44;
                } else {
                    availableSpace -= 22;
                }
            }

            if ( thirdLevelExists ) {
                availableSpace -= 16;
            }

            if ( props.globalLinks ) {
                availableSpace -= 20;
            }

            return (
                <Row justify="start" >
                    <div className="dxMegaMenu__secondaryLevelCol" onClick={( e ) => e.stopPropagation()}>
                        {props.showLandingCard &&
                            <div className="dxMegaMenu__secondaryLanding">
                                {( primaryNavItemActive.selectedTitle || primaryNavItemActive.title ) + " Landing"}
                            </div>
                        }
                        {
                            itemColumns[0]
                        }
                    </div>
                    {
                        thirdLevelCols[0].length > 0 &&
                        thirdLevelCols[0]
                    }
                    {
                        itemColumns[1].length > 0 &&
                        <div className="dxMegaMenu__secondaryLevelCol" onClick={( e ) => e.stopPropagation()}>
                            {
                                itemColumns[1]
                            }
                        </div>
                    }
                    {
                        thirdLevelCols[1].length > 0 &&
                        thirdLevelCols[1]
                    }
                    {
                        primaryNavItemActive.bannerProps &&
                        renderBanners( availableSpace )
                    }
                    {
                        props.globalLinks &&
                        renderGlobalLinks()
                    }
                </Row> );
        }
    }

    let renderThirdLevel = function ( secondLevelItem: NavigationItem ): ReactElement {
        let thirdLevelElements: ReactElement[] = [];
        if ( secondLevelItem.children ) {
            secondLevelItem.children.forEach( ( thirdLevelItem ) => {
                thirdLevelElements.push( generateElementByLevel( thirdLevelItem, 3 ) );
            } );
        }
        return < Col
            key={"thrd-tab-" + secondLevelItem.index}
            id={"thrd-tab-" + secondLevelItem.index}
            size={2}
            className={"dxMegaMenu__thirdLevelCol " + ( secCurrentActive == secondLevelItem.index ? "active" : "" )}
            role="third-level-column"
            onClick={( e ) => e.stopPropagation()
            }>
            {thirdLevelElements}
        </Col>;
    };

    function renderBanners( availableSpace: number ) {
        let bannerCount = 0;
        let bannersHTML: ReactElement[] = [];
        let bannersProps: BannerProps[] = primaryNavItemActive.bannerProps || [];
        if ( bannersProps ) {
            bannersProps.forEach( ( banner ) => {
                if ( availableSpace >= 20 ) {
                    bannersHTML.push(
                        <Col
                            key={"banner-column-" + bannerCount++}
                            xs={3}
                            className="dxMegaMenu__banner"
                            onClick={( e ) => e.stopPropagation()}
                        >
                            <div
                                role="dxNavUtils-banner"
                                className={"dxMegaMenu__bannerContainer" + ( banner.link ? " dxMegaMenu__bannerLink" : "" )}
                                onClick={( e ) => {
                                    e.preventDefault();
                                    if ( banner.link ) {
                                        window.open( banner.link?.url, getLinkTarget( banner.link?.target ) );
                                    }
                                }}>
                                <img src={banner.image}
                                    style=
                                    {
                                        {
                                            objectFit: banner.imageFit || "cover"
                                        } as React.CSSProperties
                                    }
                                ></img>
                                <h3 className="dxMegaMenu__bannerTitle" title={banner.title}>{overflowText( banner.title, props.titleCharLimit || 30 )}</h3>
                                <p className="dxMegaMenu__bannerBody">{banner.body}</p>
                            </div>
                        </Col>
                    );
                    availableSpace -= 20;
                }
            } );
        }

        return ( bannersHTML );
    }

    function renderGlobalLinks() {
        let linkCount = 0;
        let globalLinks: LinksProps[] = props.globalLinks || [];
        let linksHTML: ReactElement[] = [];
        if ( globalLinks ) {
            globalLinks.forEach( ( globalLink ) => {
                linksHTML.push(
                    <li key={"global-link-" + linkCount++} className="dxMegaMenu__globalLink" >
                        <a href={globalLink.url} target={globalLink.target} data-testid="MegaMenu-GlobalLink">{globalLink.label} {getLinkIcon( globalLink.target )}</a>
                    </li>
                );
            } );
        }

        return (
            <Col
                key="globalLinks-column"
                className="dxMegaMenu__globalLinks"
                xs={2}
                onClick={( e ) => e.stopPropagation()}
            >
                <ul>
                    {linksHTML}
                </ul>
                {props.socialLinks &&
                    <div className="dxMegaMenu__socialLinks">
                        {props.socialLinks.map( ( socialLink ) => (
                            <a
                                aria-label={socialLink.label}
                                className="dxMegaMenu__socialLink"
                                href={socialLink.url}
                                key={socialLink.label}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {socialLink.image ?
                                    <img src={socialLink.image} alt="" />
                                    :
                                    <i className={socialLink.iconClass} aria-hidden="true" />
                                }
                            </a>
                        ) )}
                    </div>
                }
            </Col>
        );
    }

    useEffect( () => {
        let dropdownContent = React.createElement( "div", { ref: secondLevelRef },
            <div className="tab-content dxMegaMenu__secondaryLevel"
                style={props.menuImage ? { backgroundImage: `url("${props.menuImage}")`, backgroundSize: "cover" } : {}}
            >
                <div aria-labelledby={"tab-1"}
                    className="tab-pane active show"
                    role="tabpanel"
                    tabIndex={0}
                    data-testid="dxMegaMenu-tab"
                    style={{
                        display: ( primaryNavItemActive.index ) ? "initial" : "none"
                    }}>
                    {primaryNavItemActive.children &&
                        renderSecondaryLevel()
                    }
                </div>
            </div>
        );

        const secondaryLevelContainer = document.getElementById( props.secondaryLevelContainerId );
        if ( secondaryLevelContainer && dropdownContent ) {
            if ( !secondLevelRootRef.current || secondLevelRootRef.current.container !== secondaryLevelContainer ) {
                secondLevelRootRef.current = { container: secondaryLevelContainer, root: createRoot( secondaryLevelContainer ) };
            }
            secondLevelRootRef.current.root.render( dropdownContent );
        } else if ( !secondaryLevelContainer ) {
            console.warn( "The DXMegaMenu Component is not able to render the second level because the given secondaryLevelContainerId value does not match any HTML element" );
        }
    } );

    const [overlayActive, setOverlayActive] = useState( false );

    let overlayId = "MegaMenu__overlay";
    let overlayClass = "dxMegaMenu__overlay";

    const overlayCallback = () => {
        setActive( -2 );
        resetHooks( true, true, true );
        setOverlayActive( false );
    };

    return (
        <div {...rest} ref={mergedRootRef} className={classNames( "dxMegaMenu", className )}>
            <ul className="nav nav-tabs dxMegaMenu__primaryLevel" role="tablist">
                {renderFirstLevel()}
            </ul>
            {renderOverlayElement( overlayId, overlayClass, overlayActive, overlayCallback )}
        </div>
    );
};

export default DXMegaMenu;
