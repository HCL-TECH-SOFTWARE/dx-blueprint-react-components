import "./DXNavigationHeader.scss";
import { getLinkTarget, getLinkIcon, getIcon } from "../../utilities";
import React, { FormEventHandler, ReactElement, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import DXButton from "../DXButton/DXButton";
import DXQuickLinks, { QuickLinksProps } from "../DXQuickLinks/DXQuickLinks";

export interface NavigationProps {
    navigationImage: string;
    navigationImageAlt?: string;
    navigationImageHeight?: number;
    navigationImageWidth?: number;
    searchSubmit: FormEventHandler;
    navigationItems: NavigationItem[];
    active?: number;
    icons?: {
        firstLevel?: string;
        secondLevel?: string;
        search?: string;
    };
}

export interface NavigationItem {
    title: string;
    url?: string;
    target?: string;
    children?: NavigationItem[];
    index: number;
    quickLinks?: QuickLinksProps;
}

export interface NavigationNode {
    id: string;
    parent: ReactElement;
    children?: NavigationNode[];
    level: number;
    index: number;
    navigationItem: NavigationItem;
}

export interface ItemProps {
    children: string;
    active: any;
    onClick: () => void;
}

interface SecondaryLevelItems {
    index: number;
    secondaryNodes: NavigationNode[],
    quickLinks?: QuickLinksProps;
}

function resetHooks( first: boolean, second: boolean, third: boolean ) {
    if ( first ) {
        setActive( -1 );
    }
    if ( second ) {
        secSetActive( -1 );
    }
    if ( third ) {
        thrdSetActive( -1 );
    }
}

let generateElementByLevel = ( item: NavigationItem, level: number, hasAnyDropdowns: boolean, icons: any ): ReactElement<any, string> => {
    switch ( level ) {
        case 1: {
            const isExternalTopLevelLink = !!item.url && !item.children && ( /^https?:\/\//i.test( item.url ) || item.target === "_blank" || item.target === "blank" );
            const isGrayLink = !isExternalTopLevelLink && hasAnyDropdowns;

            const primaryLinkClassName = [
                "dxNavigationHeader__primaryLink",
                isGrayLink ? "dxNavigationHeader__primaryLink--gray" : "dxNavigationHeader__primaryLink--black"
            ].join( " " );

            let navLinkProps: any = {
                as: item.url && !item.children ? "a" : "button"
            };

            if ( item.url && !item.children ) {
                navLinkProps.href = item.url;
                navLinkProps.target = getLinkTarget( item.target ) as React.HTMLAttributeAnchorTarget;
            }

            return (
                <Nav.Item key={"primary-navigation-" + item.index} as="li" role="presentation">
                    <Nav.Link
                        {...navLinkProps}
                        className={primaryLinkClassName}
                        eventKey={item.index.toString()}
                        data-testid="primary-link"
                        id={"primary-link-" + item.index}
                        aria-controls={"tabpanel-" + item.index}
                        onClick={( e: React.MouseEvent ) => {
                            if ( item.children ) {
                                e.preventDefault();
                                setOverlayActive( true );
                            }
                            if ( currentActive === item.index ) {
                                resetHooks( true, true, true );
                            } else {
                                setActive( item.index );
                                resetHooks( false, true, true );
                            }
                        }}
                    >
                        {item.title}
                        {getLinkIcon( item.target )}
                        {item.children &&
                            <i
                                data-testid="NH-primary-icon"
                                id={"primary-icon-" + item.index}
                                className={getIcon( icons, "firstLevel", "ci-Caret_Down_MD" )}
                            ></i>
                        }
                    </Nav.Link>
                </Nav.Item>
            );
        }
        case 2: {
            return (
                <div key={"secondary-navigation-" + item.index} className={"dxNavigationHeader__secondaryItem " + ( secCurrentActive == item.index ? "dxNavigationHeader__secondaryItem--state-active" : "" )}
                    onClick={() => {
                        if ( secCurrentActive == item.index ) {
                            resetHooks( false, true, true );
                        } else {
                            resetHooks( false, false, true );
                            secSetActive( item.index );
                        }
                    }} >
                    <span className={"dxNavigationHeader__secondaryItemBorder " + ( secCurrentActive == item.index ? "dxNavigationHeader__secondaryItemBorder--state-active" : "" )}></span>
                    <a className={"dxNavigationHeader__secondaryItemContent "}
                        href={( item.url && !item.children ) ? item.url : undefined}
                        target={getLinkTarget( item.target )}
                        data-testid="secondary-link">
                        <p>
                            {item.title}
                            {getLinkIcon( item.target )}
                        </p>
                        {item.children && <i className={getIcon( icons, "secondLevel", "ci-Add_Plus" )}></i>}
                    </a >
                </div> );
        }
        case 3: {
            return (
                <div key={"third-item-" + item.index} className={"dxNavigationHeader__thirdItem " + ( thrdCurrentActive == item.index ? "dxNavigationHeader__thirdItem--state-active" : "" )}
                    onClick={() => {
                        thrdSetActive( item.index );
                    }} >
                    <span className={"dxNavigationHeader__thirdItemBorder " + ( thrdCurrentActive === item.index ? "dxNavigationHeader__thirdItemBorder--state-active" : "" )}></span>
                    <a className={"dxNavigationHeader__thirdItemContent "}
                        href={item.url}
                        data-testid="tertiary-link"
                        target={getLinkTarget( item.target )}>
                        {item.title}
                        {getLinkIcon( item.target )}
                    </a>
                </div> );
        }
    }
    return <div>No DATA</div>;
};

function renderThirdLevel( secondaryItem: NavigationNode ) {
    let childColumn: ReactElement[] = [];

    secondaryItem.children?.forEach( ( node: NavigationNode ) => {
        childColumn.push( node.parent );
    } );

    return childColumn;
}

function disableOverlay() {
    document.getElementById( "navigation-overlay" )?.classList.add( "dxNavigationHeader__overlay--state-hide" );
    document.getElementById( "navigation-overlay" )?.classList.remove( "dxNavigationHeader__overlay--state-active" );
    setActive( -2 );
    setTimeout( function () {
        resetHooks( true, true, true );
        setOverlayActive( false );
        document.getElementById( "navigation-overlay" )?.classList.remove( "dxNavigationHeader__overlay--state-hide" );
    }, 500 );
}

function renderSecondLevelTabs( items: SecondaryLevelItems[] ) {
    let secondaryTabs: ReactElement[] = [];
    let secondaryColumnLimit = 10;

    items.forEach( ( tab ) => {
        let columnCount = 1;
        if ( tab.secondaryNodes.length ) {
            let secondaryLevel: ReactElement[] = [];
            let secondaryLevelCol2: ReactElement[] = [];

            let thirdLevelCol1: ReactElement[] = [];
            let thirdLevelCol2: ReactElement[] = [];

            tab.secondaryNodes.forEach( ( secondaryItem ) => {
                let thirdElement = undefined;

                if ( secondaryItem.children ) {
                    thirdElement =
                        <Col
                            key={"thrd-tab-" + secondaryItem.index + "-" + columnCount}
                            id={"thrd-tab-" + secondaryItem.index + "-" + columnCount}
                            xs={3}
                            className={"dxNavigationHeader__thirdColumn " + ( secCurrentActive == secondaryItem.index ? "dxNavigationHeader__thirdColumn--state-active" : "" )}
                            role="third-level-column"
                            onClick={( e ) => e.stopPropagation()}>
                            {renderThirdLevel( secondaryItem )}
                        </Col>;
                }

                if ( secondaryLevel.length < secondaryColumnLimit ) {
                    secondaryLevel.push( secondaryItem.parent );
                    if ( thirdElement ) { thirdLevelCol1.push( thirdElement ); }
                    if ( secondaryLevel.length == secondaryColumnLimit ) { columnCount++; }
                } else {
                    secondaryLevelCol2.push( secondaryItem.parent );
                    if ( thirdElement ) { thirdLevelCol2.push( thirdElement ); }
                }
            } );

            secondaryTabs.push(
                <Tab.Pane
                    eventKey={tab.index.toString()}
                    key={"sec-tab-" + tab.index}
                    aria-labelledby={"primary-link-" + tab.index}
                    id={"tabpanel-" + tab.index}
                    className="dxNavigationHeader__tabPane">
                    <Container fluid="xl" className="container-view" data-testid="secondaryContainerFluid">
                        <Row justify="start" onClick={() => {
                            disableOverlay();
                        }} >
                            <Col xs={3} className="dxNavigationHeader__secondaryColumn" onClick={( e ) => e.stopPropagation()}>
                                {secondaryLevel.length > 0 &&
                                    secondaryLevel
                                }
                            </Col>
                            {thirdLevelCol1}
                            {secondaryLevelCol2.length > 0 &&
                                <Col xs={3} className="dxNavigationHeader__secondaryColumn" onClick={( e ) => e.stopPropagation()}>
                                    {secondaryLevelCol2}
                                </Col>
                            }
                            {thirdLevelCol2}
                            <DXQuickLinks {...tab.quickLinks as QuickLinksProps} />
                        </Row>
                    </Container>
                </Tab.Pane>
            );
        } else {
            secondaryTabs.push(
                <Tab.Pane
                    eventKey={tab.index.toString()}
                    key={"sec-tab-" + tab.index}
                    aria-labelledby={"primary-link-" + tab.index}
                    id={"tabpanel-" + tab.index}
                />
            );
        }
    } );
    return ( secondaryTabs );
}

let processItems = ( items: NavigationItem[], level: number, hasAnyDropdowns: boolean, icons: any ): NavigationNode[] => {
    let itemsTree: NavigationNode[] = [];
    items.forEach( ( item: NavigationItem ) => {
        const itemNode: NavigationNode = {
            id: item.title,
            level: level,
            parent: generateElementByLevel( item, level, hasAnyDropdowns, icons ),
            index: item.index,
            navigationItem: item
        };
        if ( item.children ) {
            itemNode.children = processItems( item.children, level + 1, hasAnyDropdowns, icons );
        }
        itemsTree.push( itemNode );
    } );
    return itemsTree;
};

var currentActive: number;
var setActive: React.Dispatch<React.SetStateAction<number>>;

var secCurrentActive: number;
var secSetActive: React.Dispatch<React.SetStateAction<number>>;

var thrdCurrentActive: number;
var thrdSetActive: React.Dispatch<React.SetStateAction<number>>;

var overlayActive: boolean;
var setOverlayActive: React.Dispatch<React.SetStateAction<boolean>>;

const DXNavigationHeader = ( props: NavigationProps ) => {
    const [searchLength, setSearchLength] = useState( 3 );

    [currentActive, setActive] = useState( props.active || -1 );
    [secCurrentActive, secSetActive] = useState( -1 );
    [thrdCurrentActive, thrdSetActive] = useState( -1 );
    [overlayActive, setOverlayActive] = useState( props.active && props.active >= 0 ? true : false );

    const hasAnyDropdowns = props.navigationItems?.some( navItem => navItem.children && navItem.children.length > 0 ) || false;

    let nodes: NavigationNode[] = [];
    if ( props.navigationItems ) {
        nodes = processItems( props.navigationItems, 1, hasAnyDropdowns, props.icons );
    }

    let primaryLevel: ReactElement[] = [];
    let secondaryLevels: SecondaryLevelItems[] = [];

    nodes.forEach( ( node ) => {
        let singleSecondaryLevel: SecondaryLevelItems = {
            index: node.index,
            secondaryNodes: node.children ?
                [...node.children] : []
        };
        if ( node.level == 1 && node.parent ) {
            primaryLevel.push( node.parent );
            singleSecondaryLevel.quickLinks = node.navigationItem.quickLinks ?
                { ...node.navigationItem.quickLinks } : undefined;
        }

        secondaryLevels.push( singleSecondaryLevel );
    } );

    const activeSecondary = secondaryLevels.find( ( s ) => s.index === currentActive );
    const isOverlayActive = ( currentActive > -1 && activeSecondary && activeSecondary.secondaryNodes.length > 0 ) || overlayActive;

    return (
        <div className='dxNavigationHeader'>
            <Container fluid="xl" className="container-view" data-testid="containerFluid">
                <Row className="dxNavigationHeader__topRow justify-content-between">
                    <Col xs={6}>
                        <div className='dxNavigationHeader__image'>
                            <img src={props.navigationImage}
                                alt={props.navigationImageAlt ? props.navigationImageAlt : "Header Image"}
                                height={props.navigationImageHeight ? props.navigationImageHeight : 40}
                                width={props.navigationImageWidth ? props.navigationImageWidth : 230}
                            >
                            </img>
                        </div>
                    </Col>
                    <Col xs={searchLength} className="dxNavigationHeader__searchCol">
                        <Form onSubmit={props.searchSubmit}>
                            <Form.Group className='dxNavigationHeader__search' onSubmit={() => {}} >
                                <InputGroup >
                                    <div className="input-group-item input-group-prepend">
                                        <Form.Control className="dxNavigationHeader__searchInput " placeholder="Search this site" type="text"
                                            onFocus={() => {
                                                setSearchLength( 6 );
                                            }}
                                            onBlur={() => {
                                                setSearchLength( 3 );
                                            }} />
                                    </div>
                                    <div className={"input-group-inset-item dxNavigationHeader__searchButton " + ( searchLength === 6 ? "dxNavigationHeader__search--state-active" : "" )}>
                                        <DXButton
                                            label="search icon"
                                            hideLabel
                                            displayType="unstyled"
                                            type="submit"
                                            data-testid="searchButton"
                                            icon={{
                                                class: getIcon( props.icons, "search", "ci-Search_Magnifying_Glass" )
                                            }} />
                                    </div>
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row className="justify-content-start">
                    <Col xs={12}>
                        <Tab.Container activeKey={currentActive?.toString()} onSelect={( k ) => setActive( Number( k ) )}>
                            <Nav variant="tabs" as="ul">
                                {primaryLevel}
                            </Nav>
                            <Tab.Content>
                                {renderSecondLevelTabs( secondaryLevels )}
                            </Tab.Content>
                        </Tab.Container>
                        <div
                            id="navigation-overlay"
                            data-testid="navigation-overlay"
                            className={"dxNavigationHeader__overlay " + ( isOverlayActive ? "dxNavigationHeader__overlay--state-active" : "" )}
                            onClick={() => {
                                disableOverlay();
                            }}>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div >
    );
};

export default DXNavigationHeader;
