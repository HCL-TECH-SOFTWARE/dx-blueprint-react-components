import "./DXInteractiveTabs.scss";
import React, { useEffect, useState } from "react";
import DXAccordion, { AccordionProps } from "../DXAccordion/DXAccordion";
import DXEventItem, { EventItemProps } from "../DXEventItem/DXEventItem";
import DXButton, { DisplayType } from "../DXButton/DXButton";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DXPagination from "../DXPagination/DXPagination";
import { getColNumber, ImageProps, IconButtonProps } from "../../utilities";
import DXEmptyState from "../DXEmptyState";

interface TabContentItem {
    image?: ImageProps,
    video?: {
        url: string,
        title?: string;
    },
    accordionCatalog?: {
        activeIndex?: number,
        items: AccordionProps[],
    };
    textContent?: {
        title: string,
        subtitle?: string,
        body?: string,
        button?: IconButtonProps;
    },
    catalog?: {
        items: EventItemProps[],
        paginationProps: {
            sets: string[],
            active: number,
            activeSet: number;
        },
        elementsPerRow?: number;
    };
}

interface TabItem {
    label: string,
    content: TabContentItem;
}

export interface InteractiveTabsProps {
    tabs: TabItem[];
    mediaPosition?: "left" | "right";
    maxMediaHeight?: string;
}

const hasValidPaginationProps = ( properties: any ) => {
    return 'sets' in properties.paginationProps && properties.paginationProps.sets.length > 0 &&
        'active' in properties.paginationProps && 'activeSet' in properties.paginationProps;
};

const DXInteractiveTabs = ( props: InteractiveTabsProps ) => {
    // States

    // Tabs
    const [activeTab, setActiveTab] = useState<number>( 0 );
    const [activeContent, setActiveContent] = useState<TabContentItem>( {} );

    // Pagination
    const [active, setActive] = useState<number>(
        activeContent && activeContent.catalog &&
            activeContent.catalog.paginationProps &&
            activeContent.catalog.paginationProps.active ? activeContent.catalog.paginationProps.active : 0
    );

    const [activeSet, setActiveSet] = useState<number>(
        activeContent && activeContent.catalog &&
            activeContent.catalog.paginationProps &&
            activeContent.catalog.paginationProps.activeSet ? activeContent.catalog.paginationProps.activeSet : 0
    );

    // Accordions
    const [activeIndex, setActiveIndex] = useState<number | undefined>( activeContent?.accordionCatalog?.activeIndex || activeContent?.accordionCatalog?.activeIndex === 0 ? activeContent.accordionCatalog?.activeIndex : 0 );

    useEffect( () => {
        if ( props.tabs.length ) {
            if ( activeTab >= props.tabs.length ) {
                handleTab( props.tabs.length - 1 );
            } else {
                handleTab( activeTab );
            }
        }
    }, [props.tabs.length] );

    /** Pagination Logic */
    const onChangeActive = ( page: number ) => {
        setActive( page );
    };

    const onChangeSet = ( e: any ) => {
        setActiveSet( parseInt( e.target.textContent ) );
        setActive( 1 );
    };

    const mapRawData = ( items: any[] ) => {
        if ( active && activeSet ) {
            let indexOfLastItem = active * activeSet;
            let indexOfFirstItem = indexOfLastItem - activeSet;
            return items.slice( indexOfFirstItem, indexOfLastItem );
        }
        return items;
    };

    // Tabs logic
    const handleTab = ( index: number ) => {
        setActiveTab( index );
        setActiveContent( props.tabs[index].content );
        // Check if the new tab is an accordion catalog, to set the active index
        if ( props.tabs[index].content.accordionCatalog && ( props.tabs[index].content.accordionCatalog?.activeIndex || props.tabs[index].content.accordionCatalog?.activeIndex === 0 ) ) {
            setActiveIndex( props.tabs[index].content.accordionCatalog?.activeIndex );
        }
        // Check if the new tab is a catalog to set the active and activeSet
        if (
            props.tabs[index] &&
            props.tabs[index].content &&
            props.tabs[index].content.catalog &&
            props.tabs[index].content.catalog?.paginationProps ) {
            let newActive = props.tabs[index].content.catalog!.paginationProps.active;
            let newActiveSet = props.tabs[index].content.catalog!.paginationProps.activeSet;
            setActive( newActive );
            setActiveSet( newActiveSet );
        }

    };

    // Accordion Logic
    const handleOpening = ( index: number ) => {
        if ( index !== activeIndex ) {
            setActiveIndex( index );
        } else {
            setActiveIndex( -1 );
        }
    };

    // Render methods
    const renderTabs = ( items: TabItem[] ) => {
        return items.map( ( item: TabItem, index: number ) => (
            <button className={activeTab === index ? "dxInteractiveTabs__tab--active" : "dxInteractiveTabs__tab"}
                onClick={() => handleTab( index )}
                key={index}>
                {item.label}
            </button>
        ) );
    };

    const renderCatalogItems = ( items: EventItemProps[] ) => {
        return (
            <Row>
                {
                    mapRawData( items ).map( ( item: EventItemProps, index: number ) => (
                        <Col className="dxInteractiveTabs__catalogCol" xs={12} key={index} {...getColNumber( activeContent.catalog?.elementsPerRow )}>
                            <DXEventItem {...item} />
                        </Col>
                    ) )
                }
            </Row>
        );
    };

    const renderMedia = () => {
        if ( activeContent && activeContent.image ) {
            return (
                <img
                    style={props.maxMediaHeight ? { maxHeight: props.maxMediaHeight } : { maxHeight: "auto" }}
                    src={activeContent.image.url} alt={activeContent.image.altText ? activeContent.image.altText : "interactive-tabs-image-" + activeTab} />
            );
        }
        if ( activeContent && activeContent.video ) {
            return (
                <iframe
                    style={props.maxMediaHeight ? { maxHeight: props.maxMediaHeight } : { maxHeight: "auto" }}
                    src={activeContent.video?.url} title={activeContent.video?.title}></iframe>
            );
        }
        return (
            <p>No valid media property was passed</p>
        );
    };

    const renderTextContentButton = ( textButton: IconButtonProps ) => {
        let props = {
            ...textButton,
            displayType: "primary" as DisplayType
        };
        return <DXButton {...props} />;
    };

    const renderInfo = () => {
        if ( activeContent && activeContent.textContent ) {
            return (
                <div className={!props.mediaPosition || props.mediaPosition === "left" ? "dxInteractiveTabs__card" : "dxInteractiveTabs__card--reversed"}>
                    <h5>{activeContent.textContent.title}</h5>
                    {activeContent.textContent.subtitle &&
                        <h6>{activeContent.textContent.subtitle}</h6>
                    }
                    {activeContent.textContent.body &&
                        <p>{activeContent.textContent.body}</p>
                    }
                    {activeContent.textContent.button && renderTextContentButton( activeContent.textContent.button )}
                </div>
            );
        }
        if ( activeContent && activeContent.accordionCatalog ) {
            let updatedAccordions = activeContent.accordionCatalog.items.map( ( item: AccordionProps, index: number ) => {
                item.active = activeIndex === index;
                let newAccordionProps = {
                    ...item,
                    _catalogIndex: index,
                    _catalogHandler: handleOpening
                };
                return { ...newAccordionProps };
            } );

            return (
                <div className={!props.mediaPosition || props.mediaPosition === "left" ? "dxInteractiveTabs__accordions" : "dxInteractiveTabs__accordions--reversed"}>
                    {updatedAccordions.map( ( item: AccordionProps, index: number ) => (
                        <DXAccordion {...item} key={index} />
                    ) )}
                </div>
            );
        }
        return (
            <p>No valid info property was passed</p>
        );
    };

    return (
        <div className="dxInteractiveTabs">
            {props.tabs && props.tabs.length ? (
                <>
                    <div className="dxInteractiveTabs__tabs">
                        {renderTabs( props.tabs )}
                    </div>
                    {activeContent && activeContent.catalog ? (
                        <div className="dxInteractiveTabs__catalog">
                            <div className="dxInteractiveTabs__catalogContainer">
                                {renderCatalogItems( activeContent.catalog.items )}
                            </div>
                            {
                                hasValidPaginationProps( activeContent.catalog ) ? (
                                    <DXPagination
                                        sets={activeContent.catalog.paginationProps.sets}
                                        totalItems={activeContent.catalog?.items.length}
                                        active={active}
                                        activeSet={activeSet}
                                        onChangeActive={onChangeActive}
                                        onChangeSet={onChangeSet}
                                        totalPages={Math.ceil( activeContent.catalog?.items.length / activeSet )} />
                                ) : ( <span>Invalid or missing props for pagination</span> )
                            }
                        </div>
                    ) : (
                        <div className={!props.mediaPosition || props.mediaPosition === "left" ? "dxInteractiveTabs__content" : "dxInteractiveTabs__content dxInteractiveTabs__content--reversed"}>
                            <div className="dxInteractiveTabs__media">
                                {renderMedia()}
                            </div>
                            <div className="dxInteractiveTabs__info">
                                {renderInfo()}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <DXEmptyState title={"No items to render"}></DXEmptyState>
            )}
        </div>
    );
};

export default DXInteractiveTabs;
