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

import "./DXEventTabs.scss";

import React, { useState, useEffect, useRef } from "react";
import DXButton from "../DXButton/DXButton";
import { getValuesFromDateFormat, getMonthPrefix, overflowText, DateValues, SliderIcons, getIcon } from "../../utilities";
import DXEmptyState, { EmptyStateProps } from "../DXEmptyState/DXEmptyState";

interface EventElement {
    id: string,
    name: string;
    startDate: string;
    endDate?: string;
    url?: string;
}

interface CategoryElement {
    category?: string;
    events: EventElement[];
}

export interface EventTabsProps {
    tabs: CategoryElement[];
    eventsPerPage?: number;
    eventsPerPageMobile?: number;
    empty?: EmptyStateProps;
    dateFormat?: string;
    eventNameCharLimit?: number;
    icons?: ExtendedSliderIcons;
}

interface ExtendedSliderIcons extends SliderIcons {
    event?: string;
}

//
// TODO: To support multiple instances in a single page the tabviews implementation would have to be refactored to make sure
// the navigation is consistent within a single instance.
//
const DXEventTabs = ( props: EventTabsProps ) => {
    const [activeTab, setActiveTab] = useState( 0 );
    const [activePage, setActivePage] = useState( 1 );
    const [mobile, setMobile] = useState( false );
    const [allEventsProps, setAllEventsProps] = useState( [] );
    const [selectedNavButton, setSelectedNavButton] = useState<"left" | "right">( "right" );

    const ELEMENTS_PER_PAGE = 8;
    const ELEMENTS_PER_PAGE_MOBILE = 4;
    const COMPONENT_MAX_WIDTH = 390;
    const EVENT_NAME_CHAR_LIMIT = 40;
    const DEFAULT_DATE_FORMAT = "MM/DD/YY";
    let componentSize = 0;
    const componentRef = useRef<HTMLDivElement>( null );

    const changeActive = ( e: any, index: number ) => {
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            if ( activeTab !== index ) {
                setActivePage( 1 );
                setActiveTab( index );
            }
        }
    };

    const mapRawData = ( items: any[], isMobile: boolean ) => {
        let amntElements = 0;
        if ( isMobile ) {
            amntElements = props.eventsPerPageMobile ? props.eventsPerPageMobile : ELEMENTS_PER_PAGE_MOBILE;
        } else {
            amntElements = props.eventsPerPage ? props.eventsPerPage : ELEMENTS_PER_PAGE;
        }
        let indexOfLastItem = activePage * amntElements;
        let indexOfFirstItem = indexOfLastItem - amntElements;
        return items.slice( indexOfFirstItem, indexOfLastItem );
    };

    const handlePagination = ( e: any, direction: string ) => {
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            if ( direction === "left" ) {
                setActivePage( activePage - 1 );
                setSelectedNavButton( "left" );
            }
            if ( direction === "right" ) {
                setActivePage( activePage + 1 );
                setSelectedNavButton( "right" );
            }

            let firstEvent = document.querySelector( `[tabindex="${activeTab + 1}.01"]` ) as HTMLElement;
            if ( firstEvent && firstEvent !== null ) firstEvent.focus();
        }
    };

    const amIAtTheEnd = ( isMobile: boolean ) => {
        let amntElements = 0;
        let length = 0;
        if ( isMobile ) {
            amntElements = props.eventsPerPageMobile ? props.eventsPerPageMobile : ELEMENTS_PER_PAGE_MOBILE;
        } else {
            amntElements = props.eventsPerPage ? props.eventsPerPage : ELEMENTS_PER_PAGE;
        }
        if ( activeTab === 0 ) {
            props.tabs.forEach( ( tab ) => ( length += tab.events.length ) );
        } else {
            length = props.tabs[activeTab - 1].events.length;
        }
        return activePage * amntElements >= length;
    };

    const amIAtTheBeginning = () => {
        return activePage <= 1;
    };

    const validateMobile = () => {
        if ( componentRef.current && componentRef.current !== null ) {
            const eventTabsSize = componentRef.current;
            componentSize = eventTabsSize.offsetWidth;
            if ( componentSize <= COMPONENT_MAX_WIDTH ) {
                setMobile( true );
            } else {
                setMobile( false );
            }
        }
    };

    const getTabsClasses = ( index: number, isMobile: boolean ) => {
        if ( isMobile ) {
            if ( index === activeTab ) return "dxEventTabs__tabMobile dxEventTabs__tab--active";
            else return "dxEventTabs__tabMobile";
        } else {
            if ( index === activeTab ) return "dxEventTabs__tab dxEventTabs__tab--active";
            else return "dxEventTabs__tab";
        }
    };

    const getDate = ( startDate: string, endDate: string | undefined ) => {
        const startDateFormatted: DateValues = getValuesFromDateFormat( startDate, props.dateFormat ? props.dateFormat : DEFAULT_DATE_FORMAT );
        const todayDate = new Date( Date.now() );
        let displayStartYear = false;
        let finalDate = "";
        if ( endDate ) {
            const endDateFormatted: DateValues = getValuesFromDateFormat( endDate, props.dateFormat ? props.dateFormat : DEFAULT_DATE_FORMAT );
            let displayEndYear = false;
            let differentYears = false;
            if ( startDateFormatted.year !== endDateFormatted.year ) {
                differentYears = true;
                if ( todayDate.getFullYear() !== parseInt( startDateFormatted.year ) ) {
                    displayStartYear = true;
                }
                if ( todayDate.getFullYear() !== parseInt( endDateFormatted.year ) ) {
                    displayEndYear = true;
                }
            } else {
                if ( todayDate.getFullYear() !== parseInt( endDateFormatted.year ) ) {
                    displayEndYear = true;
                }
            }
            if ( differentYears ) {
                finalDate =
                    getMonthPrefix( startDateFormatted.month ) +
                    " " +
                    startDateFormatted.day +
                    `${displayStartYear ? `, ${startDateFormatted.year} - ` : ` - `}` +
                    getMonthPrefix( endDateFormatted.month ) +
                    " " +
                    endDateFormatted.day +
                    `${displayEndYear ? `, ${endDateFormatted.year}` : ""}`;
            } else {
                if ( startDateFormatted.month !== endDateFormatted.month ) {
                    finalDate =
                        getMonthPrefix( startDateFormatted.month ) +
                        " " +
                        startDateFormatted.day +
                        " - " +
                        getMonthPrefix( endDateFormatted.month ) +
                        " " +
                        endDateFormatted.day +
                        `${displayEndYear ? `, ${endDateFormatted.year}` : ""}`;
                } else {
                    if ( startDateFormatted.day === endDateFormatted.day ) {
                        finalDate =
                            getMonthPrefix( startDateFormatted.month ) +
                            " " +
                            startDateFormatted.day +
                            `${displayEndYear ? `, ${endDateFormatted.year}` : ""}`;
                    } else {
                        finalDate =
                            getMonthPrefix( startDateFormatted.month ) +
                            " " +
                            startDateFormatted.day +
                            " - " +
                            endDateFormatted.day +
                            `${displayEndYear ? `, ${endDateFormatted.year}` : ""}`;
                    }
                }
            }
        } else {
            finalDate =
                getMonthPrefix( startDateFormatted.month ) +
                " " +
                startDateFormatted.day +
                `${todayDate.getFullYear() !== parseInt( startDateFormatted.year ) ? `, ${startDateFormatted.year}` : ""}`;
        }
        return `${finalDate}`;
    };

    const getNavButtonsIndex = ( direction: string, isMobile: boolean ) => {
        let amountOfEvents: any;
        let increaseValue = direction === "left" ? 1 : direction === "right" ? 2 : 0;
        if ( isMobile ) {
            amountOfEvents = props.eventsPerPageMobile ? props.eventsPerPageMobile + increaseValue : ELEMENTS_PER_PAGE_MOBILE + increaseValue;
        } else {
            amountOfEvents = props.eventsPerPage ? props.eventsPerPage + increaseValue : ELEMENTS_PER_PAGE + increaseValue;
        }
        amountOfEvents = amountOfEvents < 10 ? "0" + amountOfEvents : amountOfEvents;
        return parseFloat( `${activeTab + 1}.${amountOfEvents}` );
    };

    const renderTabs = ( tabs: CategoryElement[], isMobile: boolean ) => {
        let allTabs = [...tabs];
        allTabs.unshift( {
            category: "All",
            events: [],
        } );
        return allTabs.map( ( tab, index ) => (
            <li
                key={index}
                className={tab.category && tab.category.length ? getTabsClasses( index, isMobile ) : "d-none"}
                data-testid="event-tabs-tab"
                onClick={( e ) => changeActive( e, index )}
                onKeyDown={( e ) => changeActive( e, index )}
                tabIndex={index + 1}
            >
                {tab.category}
            </li>
        ) );
    };

    const renderEvents = ( isMobile: boolean ) => {

        let propsEmpty = props.empty ? props.empty : {
            title: "No Events!",
            text: "When you have more events, they will appear in here."
        } as EmptyStateProps;

        if ( allEventsProps.length === 0 ) {
            return (
                <>
                    <DXEmptyState {...propsEmpty}></DXEmptyState>
                </>
            );
        }

        return mapRawData( allEventsProps, isMobile ).map( ( event: EventElement, index: number ) => (
            <div className="dxEventTabs__event col-12 col-md-6" key={index} data-testid="event-tabs-event">
                <div className="dxEventTabs__eventIcon" style={isMobile ? { display: "none" } : undefined}>
                    <i className={getIcon( props.icons, "event", "ci-Calendar_Check" )}></i>
                </div>
                <div className={isMobile ? "dxEventTabs__eventInfoMobile" : "dxEventTabs__eventInfo"} data-testid="event-tabs-info">
                    <h5>
                        {event.url ? (
                            <a
                                href={event.url}
                                target="_self"
                                tabIndex={parseFloat( `${activeTab + 1}.${index < 10 ? "0" + ( index + 1 ) : index + 1}` )}
                            >
                                {overflowText( event.name, props.eventNameCharLimit ? props.eventNameCharLimit : EVENT_NAME_CHAR_LIMIT )}
                            </a>
                        ) : (
                            overflowText( event.name, props.eventNameCharLimit ? props.eventNameCharLimit : EVENT_NAME_CHAR_LIMIT )
                        )}
                    </h5>
                    <p data-testid="event-tabs-date">{getDate( event.startDate, event.endDate )}</p>
                </div>
            </div>
        ) );
    };

    useEffect( () => {
        validateMobile();
        window.addEventListener( "resize", validateMobile );
        return function unmountComponent() {
            window.removeEventListener( "resize", validateMobile );
        };
    }, [props.eventsPerPage, props.eventsPerPageMobile] );

    useEffect( () => {
        let allEvents: EventElement[] = [];
        if ( activeTab === 0 ) {
            let eventMap: Map<string, EventElement> = new Map();
            for ( let i = 0, length = props.tabs.length; i < length; i++ ) {
                for ( let item of props.tabs[i].events ) {
                    eventMap.set( item.id, item );
                }
            }
            allEvents = Array.from( eventMap.values() );
        } else {
            allEvents = [...props.tabs[activeTab - 1].events];
        }

        setAllEventsProps( allEvents as never[] );
    }, [activeTab, props.tabs] );

    const renderEventsArrows = () => {
        if ( allEventsProps.length === 0 ) {
            return "";
        } else {
            return (
                <div className="dxEventTabs__pagination">
                    <DXButton
                        className={
                            amIAtTheBeginning()
                                ? "dxEventTabs__nav dxEventTabs--disabled"
                                : selectedNavButton === "left"
                                    ? "dxEventTabs__nav dxEventTabs--selected"
                                : "dxEventTabs__nav"
                        }
                        onClick={( e: any ) => handlePagination( e, "left" )}
                        disabled={amIAtTheBeginning()}
                        displayType="unstyled"
                        data-testid="event-tabs-left"
                        label="previous"
                        hideLabel
                        tabIndex={getNavButtonsIndex( "left", mobile )}
                        icon={{
                            class: getIcon( props.icons, "prev", "ci-Arrow_Left_MD" )
                        }}
                    />

                    <DXButton
                        className={
                            amIAtTheEnd( mobile )
                                ? "dxEventTabs__nav dxEventTabs--disabled"
                                : selectedNavButton === "right"
                                    ? "dxEventTabs__nav dxEventTabs--selected"
                                : "dxEventTabs__nav"
                        }
                        onClick={( e: any ) => handlePagination( e, "right" )}
                        disabled={amIAtTheEnd( mobile )}
                        displayType="unstyled"
                        data-testid="event-tabs-right"
                        label="next"
                        hideLabel
                        tabIndex={getNavButtonsIndex( "right", mobile )}
                        icon={{
                            class: getIcon( props.icons, "next", "ci-Arrow_Right_MD" )
                        }}
                    />
                </div>
            );
        }
    };

    return (
        <div className="dxEventTabs" ref={componentRef}>
            <div className={mobile ? "dxEventTabs__tabsMobile" : "dxEventTabs__tabs"}>
                <ul>{renderTabs( props.tabs, mobile )}</ul>
            </div>
            <div className={mobile ? "dxEventTabs__containerMobile" : "dxEventTabs__container"}>
                <div className="row">{renderEvents( mobile )}</div>
                {renderEventsArrows()}
            </div>
        </div>
    );
};

export default DXEventTabs;
