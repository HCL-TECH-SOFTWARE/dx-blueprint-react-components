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

import "./DXFullCalendar.scss";
import React, { useState, useEffect } from "react";
import DXButton from "../DXButton/DXButton";
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { addDays, addMonths, formatDate, isSameDay, isSameMonth, parseDateWithFormat, startOfMonth, startOfWeek } from "../../utilities/dateTime";
import DXToggleMenu, { ToggleMenuProps } from "../DXToggleMenu/DXToggleMenu";
import { LinksProps, SliderIcons, getIcon, getLinkTarget } from "../../utilities";

interface Event {
    info: LinksProps,
    date: string,
    [x: string]: any;
}
export interface FullCalendarProps {
    events: Event[],
    isMobile?: boolean;
    icons?: SliderIcons;
}

export interface ExtendedSliderIcons extends SliderIcons {
    filter?: string;
    fliterClose?: string;
    alert?: string;
}

const DXFullCalendar = ( props: FullCalendarProps ) => {
    // STATES AND VARIABLES
    // Calendar
    const today = new Date();
    const todayMonth = startOfMonth( new Date() );
    // A new object on every render on purpose: it is a dependency of the week-label effect below,
    // which therefore runs after each render and follows the prev/next navigation.
    const todayWeek = startOfWeek( new Date() );
    const [currentMonth, setCurrentMonth] = useState<Date>( startOfMonth( new Date() ) );
    const [currentWeek, setCurrentWeek] = useState<Date>( startOfWeek( today ) );
    let weekDays: any[] = [];
    let monthDays: any[] = [];
    const [weekMonth, setWeekMonth] = useState( "" );
    const [returnToToday, setReturnToToday] = useState( false );
    // Events
    const [events, setEvents] = useState<any>( [] );
    let propsEvents: any = [];
    // Modal
    const [modalDay, setModalDay] = useState<any>( null );
    const [modalEvents, setModalEvents] = useState<any>( [] );
    // View
    const [view, setView] = useState( "month" );
    // Filters
    const [eventFilters, setEventFilters] = useState<any>( [] );
    const [activeFilters, setActiveFilters] = useState<any>( [] );
    const [filteredEvents, setFilteredEvents] = useState<any>( [] );
    // Alert
    const [isLandscape, setIsLandscape] = useState( true );
    // Mobile
    const [showFilters, setShowFilters] = useState( false );

    // ORIENTATION LOGIC
    const MAX_WIDTH_MOBILE = 390;
    const validatePortrait = () => {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        if ( windowWidth <= MAX_WIDTH_MOBILE ) {
            if ( windowWidth <= windowHeight ) {
                setIsLandscape( false );
            } else {
                setIsLandscape( true );
            }
        } else {
            setIsLandscape( true );
        }
    };

    // CALENDAR LOGIC
    const getMonthDays = () => {
        // Check and fill if there is days from the past month
        let iterablePastMonth = currentMonth;
        let dayOfWeek = iterablePastMonth.getDay();

        iterablePastMonth = addDays( iterablePastMonth, -( dayOfWeek + 1 ) );
        for ( let i = dayOfWeek; i > 0; i-- ) {
            iterablePastMonth = addDays( iterablePastMonth, 1 );
            monthDays.push( iterablePastMonth );
        }
        // Get the days of the month
        let iterableMonth = currentMonth;
        while ( iterableMonth.getMonth() === currentMonth.getMonth() ) {
            monthDays.push( iterableMonth );
            iterableMonth = addDays( iterableMonth, 1 );
        }
        // Check and fill if there is days from the next month
        let iterableNextMonth = addDays( addMonths( currentMonth, 1 ), -1 );
        let nextMonthDayOfWeek = iterableNextMonth.getDay();

        if ( nextMonthDayOfWeek === 6 ) { return; }
        for ( let i = nextMonthDayOfWeek; i < 6; i++ ) {
            iterableNextMonth = addDays( iterableNextMonth, 1 );
            monthDays.push( iterableNextMonth );
        }
    };

    const getCurrentWeek = () => {
        let weekStart = currentWeek;
        let daysFromTheWeek = [];
        for ( let i = 0; i <= 6; i++ ) { // Get the following 7 days
            daysFromTheWeek.push( addDays( weekStart, i ) );
        }
        weekDays = [...daysFromTheWeek];
    };

    const getWeekMonth = ( daysOfWeek: Date[] ) => {
        // Get the proper month display
        let isTodayInTheWeek: boolean = false;
        let monthsInTheWeek: any = {};
        let yearsInTheWeek: any = {};
        daysOfWeek.forEach( day => {
            if ( !Object.keys( monthsInTheWeek ).includes( formatDate( day, "MMMM" ) ) ) {
                monthsInTheWeek[formatDate( day, "MMMM" )] = 1;
            } else {
                monthsInTheWeek[formatDate( day, "MMMM" )] = monthsInTheWeek[formatDate( day, "MMMM" )] + 1;
            }
            if ( formatDate( day, "YYYY-MM-DD" ) === formatDate( today, "YYYY-MM-DD" ) ) {
                isTodayInTheWeek = true;
            }
        } );
        daysOfWeek.forEach( day => {
            if ( !Object.keys( yearsInTheWeek ).includes( formatDate( day, "YYYY" ) ) ) {
                yearsInTheWeek[formatDate( day, "YYYY" )] = 1;
            } else {
                yearsInTheWeek[formatDate( day, "YYYY" )] = yearsInTheWeek[formatDate( day, "YYYY" )] + 1;
            }
        } );
        if ( isTodayInTheWeek ) {
            setWeekMonth( formatDate( today, "MMMM YYYY" ) );
        } else {
            let finalMonth = "";
            let finalYear = "";
            let monthsFound = Object.keys( monthsInTheWeek );
            let yearsFound = Object.keys( yearsInTheWeek );
            if ( monthsFound.length === 1 ) {
                finalMonth = monthsFound[0];
            } else {
                let moreDaysOn = "";
                let maxDays = 0;
                monthsFound.forEach( month => {
                    if ( maxDays === 0 ) {
                        maxDays = monthsInTheWeek[month];
                        moreDaysOn = month;
                    } else {
                        if ( monthsInTheWeek[month] > maxDays ) {
                            maxDays = monthsInTheWeek[month];
                            moreDaysOn = month;
                        }
                    }
                } );
                finalMonth = moreDaysOn;
            }
            if ( yearsFound.length === 1 ) {
                finalYear = yearsFound[0];
            } else {
                let moreDaysOn = "";
                let maxDays = 0;
                yearsFound.forEach( year => {
                    if ( maxDays === 0 ) {
                        maxDays = yearsInTheWeek[year];
                        moreDaysOn = year;
                    } else {
                        if ( yearsInTheWeek[year] > maxDays ) {
                            maxDays = yearsInTheWeek[year];
                            moreDaysOn = year;
                        }
                    }
                } );
                finalYear = moreDaysOn;
            }
            setWeekMonth( `${finalMonth} ${finalYear}` );
        }
    };

    const parseEvents = ( evs: Event[] ) => {
        let parsedEvents = evs.map( ( ev: Event ) => {
            let editedData = { ...ev, date: parseDateWithFormat( ev.date, 'YYYY-MM-DD' ) };
            return editedData;
        } );
        propsEvents = parsedEvents;
        setEvents( [...parsedEvents] );
        setFilteredEvents( [...applyFilters( activeFilters, filteredEvents )] );
    };

    const next = ( ev: any ) => {
        if ( ev.type === "click" || ( ev.type === "keydown" && ev.keyCode === 13 ) || ( ev.type === "keydown" && ev.keyCode === 32 ) ) {
            if ( view === "month" ) {
                setCurrentMonth( addMonths( currentMonth, 1 ) );
                setReturnToToday( !returnToToday );
                monthDays = [];
            } else if ( view === "week" ) {
                setCurrentWeek( addDays( currentWeek, 7 ) );
                setReturnToToday( !returnToToday );
                weekDays = [];
            }
        }
    };

    const prev = ( ev: any ) => {
        if ( ev.type === "click" || ( ev.type === "keydown" && ev.keyCode === 13 ) || ( ev.type === "keydown" && ev.keyCode === 32 ) ) {
            if ( view === "month" ) {
                setCurrentMonth( addMonths( currentMonth, -1 ) );
                setReturnToToday( !returnToToday );
                monthDays = [];
            } else if ( view === "week" ) {
                setCurrentWeek( addDays( currentWeek, -7 ) );
                setReturnToToday( !returnToToday );
                weekDays = [];
            }
        }
    };

    const goToToday = ( ev: any ) => {
        if ( ev.type === "click" || ( ev.type === "keydown" && ev.keyCode === 13 ) || ( ev.type === "keydown" && ev.keyCode === 32 ) ) {
            if ( view === "month" ) {
                setCurrentMonth( todayMonth );
                setReturnToToday( !returnToToday );
                monthDays = [];
            } else if ( view === "week" ) {
                setCurrentWeek( todayWeek );
                setReturnToToday( !returnToToday );
                weekDays = [];
            }
        }
    };

    const changeToWeek = () => {
        setCurrentWeek( todayWeek );
        setView( "week" );
    };

    const changeToMonth = () => {
        setCurrentMonth( todayMonth );
        setView( "month" );
    };

    useEffect( () => {
        validatePortrait();
        window.addEventListener( "resize", validatePortrait );
        if ( !props.isMobile ) {
            setShowFilters( true );
        }
        if ( props.events && props.events.length > 0 ) {
            parseEvents( props.events );
            getFilters( props.events );
        }
        return () => {
            window.removeEventListener( "resize", validatePortrait );
        };
    }, [props.events] );

    useEffect( () => {
        if ( view === "week" ) {
            getWeekMonth( weekDays );
        }
    }, [view, todayWeek] );

    // RENDER AND VISUAL LOGIC
    const isItOnTheMonth = ( day: Date ) => {
        if ( view === "month" ) {
            return day.getMonth() === currentMonth.getMonth() ? "dxFullCalendar__day" : "dxFullCalendar__day--other";
        }
        if ( view === "week" ) {
            return day.getMonth() === today.getMonth() ? "dxFullCalendar__day" : "dxFullCalendar__day--other";
        }
    };

    const renderEvents = ( day: Date, evs: any[] ) => {
        let todaysEvents = evs.filter( ( ev: any ) => {
            if ( isSameMonth( ev.date, day ) && isSameDay( ev.date, day ) ) {
                return ev;
            }
        } );

        return (
            <ul className="dxFullCalendar__eventsContainer">
                {todaysEvents.slice( 0, 3 ).map( ( ev: Event, index: number ) => (
                    <li className="dxFullCalendar__event" key={index}>
                        <a href={ev.info.url} target={getLinkTarget( ev.info.target )}>{ev.info.label}</a>
                    </li>
                ) )}
                {todaysEvents.length > 3 ? (
                    <DXButton
                        label={`+${todaysEvents.length - 3} more`}
                        displayType="unstyled"
                        onClick={( e: any ) => handleOpenModal( e, day, todaysEvents )}
                        data-testid="full-calendar-more-events"
                        role="button" />
                ) : null}
            </ul>
        );
    };

    const renderDays = ( evs: any[] ) => {
        monthDays = [];
        getMonthDays();
        if ( monthDays && monthDays.length > 0 ) {
            return Array( monthDays.length / 7 ).fill( null ).map( ( item: null, weekIndex: number ) => (
                <div className="dxFullCalendar__week" key={weekIndex} data-testid="full-calendar-week">
                    {monthDays.slice( weekIndex * 7, ( weekIndex + 1 ) * 7 ).map( ( day: Date, index: number ) => (
                        <div className={isItOnTheMonth( day )} key={index}>
                            <p className="dxFullCalendar__number">{formatDate( day, "DD" )}</p>
                            {renderEvents( day, evs )}
                        </div>
                    ) )}
                </div>
            ) );
        }
    };

    const renderWeeks = () => {
        weekDays = [];
        getCurrentWeek();
        if ( weekDays && weekDays.length > 0 ) {
            return (
                <div className="dxFullCalendar__week" data-testid="full-calendar-week">
                    {weekDays.map( ( day: Date, index: number ) => (
                        <div className={isItOnTheMonth( day )} key={index}>
                            <p className="dxFullCalendar__number">{formatDate( day, "DD" )}</p>
                            {renderEvents( day, filteredEvents )}
                        </div>
                    ) )}
                </div>
            );
        }
    };

    const renderFilters = ( filters: any, isMobile: boolean | undefined ) => {
        if ( Object.keys( eventFilters ).length > 0 ) {
            let filterMenus: any = {};
            Object.keys( filters ).forEach( ( prop: any ) => {
                let selectValues: any = [];
                filters[prop].forEach( ( value: string ) => {
                    selectValues.push( value );
                } );
                filterMenus[prop] = selectValues;
            } );
            return (
                <div className={isMobile ? "dxFullCalendar__filtersContainer--mobile" : "dxFullCalendar__filtersContainer"}>
                    {Object.keys( filterMenus ).slice( 0, 2 ).map( ( item: any, index: number ) => (
                        <div className={isMobile ? "dxFullCalendar__filter--mobile" : "dxFullCalendar__filter"} key={index}>
                            <p>{item}:</p>
                            <Form.Select name={item} id={item} data-testid="full-calendar-filter-select"
                                onChange={( e ) => selectFilterAdd( e )} value={0}>
                                <option value="">{`Select ${item}`}</option>
                                {
                                    filterMenus[item].map( ( value: string, index: number ) => (
                                        <option
                                            value={value} key={index}
                                        >
                                            {value}
                                        </option>
                                    ) )
                                }
                            </Form.Select>
                        </div> ) )
                    }
                </div>
            );
        }
    };

    // MODAL LOGIC
    const [showModal, setShowModal] = useState<boolean>( false );
    const handleClose = () => setShowModal( false );

    const handleOpenModal = ( e: any, day: any, evs: any[] ) => {
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            setModalDay( day );
            setModalEvents( [...evs] );
            setShowModal( true );
        }
    };

    // TOOGLE MENU LOGIC
    const validateView = ( label: string, classList: DOMTokenList ) => {
        if ( label === "Month" && classList.contains( "btn-secondary" ) ) {
            changeToMonth();
        } else if ( label === "Week" && classList.contains( "btn-secondary" ) ) {
            changeToWeek();
        }
    };

    const viewMenuProps: ToggleMenuProps = {
        buttons: [
            {
                label: "Month",
                displayType: "primary",
                handleClick: validateView
            },
            {
                label: "Week",
                displayType: "secondary",
                handleClick: validateView
            },
        ],
        type: 'single'
    };

    // FILTERS LOGIC
    const getFilters = ( evs: any[] ) => {
        let filtersGotted: any = {};
        let eventProps = ["info", "date"];
        evs.forEach( ( ev: any ) => {
            for ( let prop in ev ) {
                if ( !eventProps.includes( prop ) ) {
                    if ( !filtersGotted.hasOwnProperty( prop ) ) {
                        let valueSet = new Set();
                        if ( ev[prop].includes( "," ) ) {
                            let allValues = ev[prop].split( "," );
                            allValues.forEach( ( value: string ) => valueSet.add( value ) );
                        } else {
                            valueSet.add( ev[prop] );
                        }
                        filtersGotted[prop] = valueSet;
                    } else {
                        if ( ev[prop].includes( "," ) ) {
                            let allValues = ev[prop].split( "," );
                            allValues.forEach( ( value: string ) => {
                                if ( !filtersGotted[prop].has( value ) ) {
                                    filtersGotted[prop].add( value );
                                }
                            } );
                        } else {
                            filtersGotted[prop].add( ev[prop] );
                        }
                    }
                }
            }
        } );
        let filtersIntoArray: any = {};
        for ( let prop in filtersGotted ) {
            filtersIntoArray[prop] = Array.from( filtersGotted[prop] );
        }
        setEventFilters( { ...filtersIntoArray } );
    };

    const applyFilters = ( filters: any[], evs: any[] ) => {
        let receivedEvents = evs.length > 0 ? evs : propsEvents.length === 0 ? events : propsEvents;
        if ( filters.length === 0 && evs.length === 0 ) {
            receivedEvents = propsEvents.length === 0 ? events : propsEvents;
        } else if ( filters.length === 0 && evs.length > 0 ) {
            receivedEvents = propsEvents.length === 0 ? events : propsEvents;
        }
        if ( filters.length > 0 ) {
            // Build an auxiliar variable to determine which active filter belongs to each filter category
            let involedFilters: any = {};
            for ( let prop in eventFilters ) {
                let filtersFound = [];
                filtersFound = eventFilters[prop].filter( ( filter: string ) => filters.includes( filter ) );
                if ( filtersFound.length > 0 ) {
                    involedFilters[prop] = filtersFound;
                }
            }
            let howManyFiltersAreActive = Object.keys( involedFilters ).length;
            // Look for the matches
            let matchedEvents: any = [];
            receivedEvents.forEach( ( ev: any ) => {
                if ( howManyFiltersAreActive > 1 ) {
                    let correctValues = 0;
                    for ( let prop in involedFilters ) {
                        let value = involedFilters[prop].join( ',' );
                        if ( ev[prop].includes( value ) ) {
                            correctValues++;
                        }
                    }
                    if ( correctValues === howManyFiltersAreActive ) {
                        matchedEvents.push( ev );
                    }
                } else {
                    let prop = Object.keys( involedFilters )[0];
                    let value = involedFilters[prop].join( "," );
                    if ( ev[prop].includes( value ) ) {
                        matchedEvents.push( ev );
                    }
                }
            } );
            return matchedEvents;
        } else {
            return receivedEvents;
        }
    };

    const selectFilterAdd = ( event: any ) => {
        let newFilter = event.target.value;
        let newFilters = [...activeFilters];
        if ( !newFilters.includes( newFilter ) ) {
            newFilters.push( newFilter );
            setActiveFilters( [...newFilters] );
            setFilteredEvents( [...applyFilters( newFilters, filteredEvents )] );
        }
    };

    const selectFilterRemove = ( value: string ) => {
        let oldFilter = value;
        let newFilters = activeFilters.filter( ( item: string ) => item !== oldFilter );
        setActiveFilters( [...newFilters] );
        setFilteredEvents( [...applyFilters( newFilters, filteredEvents )] );
    };

    return (
        <div className="dxFullCalendar">
            <div className={isLandscape ? "dxFullCalendar__calendar" : "dxFullCalendar__calendar dxFullCalendar__calendar--blur"}>
                <div className="dxFullCalendar__title">
                    <div data-testid="full-calendar-current-month">{
                        view === "month" ? formatDate( currentMonth, "MMMM YYYY" ) :
                            view === "week" ? weekMonth : "Error"
                    }</div>
                </div>
                {props.isMobile ? (
                    <DXButton
                        label="Calendar Filters"
                        className="dxFullCalendar__showFilters"
                        onClick={() => setShowFilters( !showFilters )}
                        data-testid="full-calendar-show-filters"
                        icon={{
                            class: getIcon( props.icons, "filter", "ci-Unfold_More" ),
                            position: "right"
                        }} />
                ) : null}
                {showFilters || ( props.isMobile && showFilters ) ? (
                    <div className={props.isMobile ? "dxFullCalendar__actions--mobile" : "dxFullCalendar__actions"}>
                        <div className={props.isMobile ? "dxFullCalendar__buttons--mobile" : "dxFullCalendar__buttons"}>
                            <DXButton
                                label="Today"
                                className="dxFullCalendar__today"
                                onClick={goToToday}
                                data-testid="full-calendar-today" />
                            <div className="dxFullCalendar__navigation">
                                <DXButton
                                    label="previous"
                                    hideLabel
                                    displayType = "secondary"
                                    className="dxFullCalendar__arrow"
                                    onClick={prev}
                                    data-testid="full-calendar-prev"
                                    icon={{
                                        class: getIcon( props.icons, "prev", "ci-Chevron_Left" )
                                    }} />
                                <DXButton
                                    label="next"
                                    hideLabel
                                    displayType = "secondary"
                                    className="dxFullCalendar__arrow"
                                    onClick={next}
                                    data-testid="full-calendar-next"
                                    icon={{
                                        class: getIcon( props.icons, "next", "ci-Chevron_Right" )
                                    }} />
                            </div>
                        </div>
                        {renderFilters( eventFilters, props.isMobile )}
                        <div className="dxFullCalendar__viewContainer">
                            <DXToggleMenu {...viewMenuProps} />
                        </div>
                    </div>
                ) : null}
                <div className="dxFullCalendar__tags" data-testid="full-calendar-filter-tags">
                    {activeFilters.length > 0 ? (
                        activeFilters.map( ( filter: string, index: number ) => (
                            <span key={index}>
                                {filter}
                                <i className={getIcon( props.icons, "filterClose", "ci-Close_MD" )} onClick={() => selectFilterRemove( filter )}></i>
                            </span>
                        ) )
                    ) : null}
                </div>
                <div className="dxFullCalendar__header">
                    <p>Sun</p>
                    <p>Mon</p>
                    <p>Tue</p>
                    <p>Wed</p>
                    <p>Thu</p>
                    <p>Fri</p>
                    <p>Sat</p>
                </div>
                <div className="dxFullCalendar__container">
                    {view === "month" ? (
                        renderDays( filteredEvents )
                    ) : view === "week" ? (
                        renderWeeks()
                    ) : (
                        renderDays( filteredEvents )
                    )}
                </div>
                {showModal &&
                    <Modal show={showModal} onHide={handleClose} data-testid="calendar-modal" className="dxFullCalendar__modal">
                        <Modal.Header>
                            <Modal.Title>
                                <span>{formatDate( modalDay, "MMMM DD, YYYY" )}</span>
                                <i tabIndex={0} className="ci-Close_MD" onClick={handleClose}></i>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ul className="dxFullCalendar__modalContent" data-testid="calendar-modal-content">
                                {modalEvents.map( ( ev: any, index: number ) => (
                                    <li className="dxFullCalendar__modalEvent" key={index}>
                                        <a href={ev.info.url} target={getLinkTarget( ev.info.target )}>{ev.info.label}</a>
                                    </li>
                                ) )}
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                            <DXButton
                                label="OK"
                                className="dxFullCalendar__modalButton"
                                onClick={handleClose}
                                data-testid="calendar-modal-close"
                                role="button" />
                        </Modal.Footer>
                    </Modal>
                }
            </div>
            <div className={isLandscape ? "dxFullCalendar__alert--hide" : "dxFullCalendar__alert"}>
                <div>
                    <i className={getIcon( props.icons, "alert", "ci-Info" )}></i>
                    ALERT:
                </div>
                <p>
                    For better UI experience is recommended rotate your device to landscape view so in that way you can enjoy every details of the calendar
                </p>
            </div>
        </div>
    );
};

export default DXFullCalendar;
