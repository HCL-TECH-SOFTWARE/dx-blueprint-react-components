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

import "./DXCalendar.scss";

import React, { useState, useEffect } from "react";
import { addDays, addMonths, formatDate, isSameDay, parseDateWithFormat, startOfMonth } from "../../utilities/dateTime";
import DXButton from "../DXButton/DXButton";
import Modal from 'react-bootstrap/Modal';
import { SliderIcons, getIcon } from "../../utilities";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";
interface Event {
    name: string,
    date: string,
    link: string,
    color?: string,
}
export interface CalendarProps {
    events: Event[],
    small?: boolean,
    seeMoreText?: string,
    _selectEvent?: ( eventNumber: Event ) => void;
    icons?: SliderIcons;
}

const DXCalendar = ( props: ExtendableProps<CalendarProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { events: _events, small: _small, seeMoreText: _seeMoreText, _selectEvent, icons: _icons, className, ref, ...rest } = props;
    const [change, setChange] = useState( false );
    const [monthPointer, setMonthPointer] = useState<Date>( startOfMonth( new Date() ) );
    const [activeWeek, setActiveWeek] = useState( -1 );
    const [activeDay, setActiveDay] = useState( -1 );
    const [activeEvents, setActiveEvents] = useState<any>( [] );
    const today = new Date();
    let allDays: any = [];
    let allWeeks: { [k: string]: any; } = {};
    let events: any = [];
    // Modal Logic
    const [ showModal, setShowModal ] = useState( false );
    const handleClose = () => setShowModal(false);
    
    const nextMonth = ( ev: any ) => {
        if ( ev.type === "click" || ( ev.type === "keydown" && ev.keyCode === 13 ) || ( ev.type === "keydown" && ev.keyCode === 32 ) ) {
            setMonthPointer( addMonths( monthPointer, 1 ) );
            setChange( !change );
            allDays = [];
            allWeeks = {};
            setActiveWeek( -1 );
            setActiveDay( -1 );
            setActiveEvents( [] );
        }
    };

    const prevMonth = ( ev: any ) => {
        if ( ev.type === "click" || ( ev.type === "keydown" && ev.keyCode === 13 ) || ( ev.type === "keydown" && ev.keyCode === 32 ) ) {
            setMonthPointer( addMonths( monthPointer, -1 ) );
            setChange( !change );
            allDays = [];
            allWeeks = {};
            setActiveWeek( -1 );
            setActiveDay( -1 );
            setActiveEvents( [] );
        }
    };

    const backFill = () => {
        let clone = monthPointer;
        let dayOfWeek = clone.getDay();
        if ( !dayOfWeek ) { return; }

        clone = addDays( clone, -( dayOfWeek + 1 ) );
        for ( var i = dayOfWeek; i > 0; i-- ) {
            clone = addDays( clone, 1 );
            allDays.push( clone );
        }
    };

    const currentMonth = () => {
        var iterableCalendar = monthPointer;
        while ( iterableCalendar.getMonth() === monthPointer.getMonth() ) {
            allDays.push( iterableCalendar );
            iterableCalendar = addDays( iterableCalendar, 1 );
        }
    };

    const forwardFill = () => {
        var iterableCalendar = addDays( addMonths( monthPointer, 1 ), -1 );
        var dayOfWeek = iterableCalendar.getDay();

        if ( dayOfWeek === 6 ) { return; }
        for ( var i = dayOfWeek; i < 6; i++ ) {
            iterableCalendar = addDays( iterableCalendar, 1 );
            allDays.push( iterableCalendar );
        }
    };

    const parseEvents = ( evs: Event[] ) => {
        events = evs.map( ( ev: Event ) => {
            // `_source` keeps the event exactly as the consumer passed it, so `_selectEvent` receives that object
            let editedData = { ...ev, date: parseDateWithFormat( ev.date, 'YYYY-MM-DD' ), _source: ev };
            return editedData;
        } );
    };

    const getDayClass = ( day: Date ) => {
        let classes = ["dxCalendar__dayNumber"];
        if ( day.getMonth() !== monthPointer.getMonth() ) {
            classes.push( "other" );
        } else if ( isSameDay( today, day ) ) {
            classes.push( "today" );
        }
        return classes.join( " " );
    };

    const generateEvents = ( day: Date, evs: any[] ) => {
        if ( day.getMonth() === monthPointer.getMonth() ) {
            let todaysEvents = evs.filter( ( ev: any ) => {
                if ( isSameDay( ev.date, day ) ) {
                    return ev;
                }
            } );
            return (
                <>
                    {Array.apply( null, todaysEvents ).slice( 0, 2 ).map( ( ev: any, index: number ) => <span key={index} style={todaysEvents[index].color ? { backgroundColor: todaysEvents[index].color } : undefined}></span> )}
                    {todaysEvents.length > 2 ? (
                        <span data-testid="calendar-plus-icon" style={{
                            borderRadius: 0,
                            fontSize: "8px",
                            background: "none",
                            width: "8px",
                            height: "100%",
                            fontWeight: "bold",
                            color: todaysEvents[todaysEvents.length - 1].color ? todaysEvents[todaysEvents.length - 1].color : "orange"
                        }}>&#43;</span>
                    ) : null}
                </>
            );
        }
    };

    const handleEventClick = ( eventIndex: number ) => {
        let event = activeEvents[eventIndex];
        if ( props._selectEvent && props._selectEvent !== undefined ) {
            props._selectEvent( event._source );
        } else {
            window.open( event.link, "_self" );
        }
    };

    const renderWeeks = () => {
        backFill();
        currentMonth();
        forwardFill();
        parseEvents( props.events );
        for ( let i = 7, length = allDays.length; i <= length; i += 7 ) {
            allWeeks[i / 7] = allDays.slice( i - 7, i );
        }
        return Object.entries( allWeeks ).map( ( week: any, index: number ) => (
            <div className="dxCalendar__week" key={index} data-weekid={index}>
                {allWeeks[week[0]].map( ( day: Date, dayIndex: number ) => (
                    <button className="dxCalendar__day" key={formatDate( day, 'DD' )} data-dayid={dayIndex}
                        onClick={( e ) => renderEventDetailsBox( e, e.target )}
                        onKeyDown={( e ) => renderEventDetailsBox( e, e.target )}
                        disabled={day.getMonth() !== monthPointer.getMonth()}>
                        <div className="dxCalendar__dayName"><span>{formatDate( day, 'ddd' )}</span></div>
                        <div className={getDayClass( day )}><span>{formatDate( day, 'DD' )}</span></div>
                        <div className="dxCalendar__dayEvent">{generateEvents( day, events )}</div>
                    </button>
                ) )}
                <div className={activeWeek === index ? "dxCalendar__details active" : "dxCalendar__details inactive"}>
                    <div className="dxCalendar__detailsArrow" style={{ left: getArrowLeftPos( activeDay ) }}></div>
                    <div className="dxCalendar__detailsContainer">
                        {activeEvents.length > 0 ? (
                            <>
                                {activeEvents.slice( 0, 2 ).map( ( ev: Event, eventIndex: number ) => (
                                    <button className="dxCalendar__detailsEvent" key={eventIndex} onClick={() => handleEventClick( eventIndex )}
                                        aria-label={ev.name}>
                                        <div className="dxCalendar__detailsEventColor"
                                            style={ev.color ? { backgroundColor: ev.color } : undefined}></div>
                                        <span>{ev.name}</span>
                                    </button>
                                ) )}
                                {activeEvents.length > 2 ? (
                                    <DXButton
                                        displayType="unstyled"
                                        className="dxCalendar__detailsEventSeeMore"
                                        data-testid="calendar-see-more"
                                        onClick={() => setShowModal( true )}
                                        label={props.seeMoreText ? props.seeMoreText : "See all events for today"} />
                                ) : null}
                            </>
                        ) : (
                            <div className="dxCalendar__detailsEvent empty" data-testid="calendar-empty-event">
                                <p>No events</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ) );
    };

    const renderHeader = () => (
        <div className="dxCalendar__header">
            <DXButton
                className="dxCalendar__headerButton dxCalendar__headerLeft"
                onClick={prevMonth}
                data-testid="calendar-prev"
                displayType="unstyled"
                label="previous-month"
                hideLabel
                icon={{
                    class: getIcon( props.icons, "prev", "ci-Chevron_Left" )
                }} />
            <h5 data-testid="calendar-month">{formatDate( monthPointer, 'MMMM YYYY' )}</h5>
            <DXButton
                className="dxCalendar__headerButton dxCalendar__headerRight"
                onClick={nextMonth}
                displayType="unstyled"
                data-testid="calendar-next"
                label="next-month"
                hideLabel
                icon={{
                    class: getIcon( props.icons, "next", "ci-Chevron_Right" )
                }} />
        </div>
    );

    const getArrowLeftPos = ( day: any ) => {
        let leftValue = "";
        switch ( day ) {
            case 0:
                leftValue = "5%";
                break;
            case 1:
                leftValue = "20%";
                break;
            case 2:
                leftValue = "35%";
                break;
            case 3:
                leftValue = "50%";
                break;
            case 4:
                leftValue = "65%";
                break;
            case 5:
                leftValue = "80%";
                break;
            case 6:
                leftValue = "95%";
                break;
            default:
                leftValue = "5%";
                break;
        }
        return leftValue;
    };

    const renderEventDetailsBox = ( ev: any, target: any ) => {
        if ( ev === "true" || ev.type === "click" || ( ev.type === "keydown" && ev.keyCode === 13 ) || ( ev.type === "keydown" && ev.keyCode === 32 ) ) {
            const triggeredEl = target.closest( ".dxCalendar__day" );
            const dayNumber = triggeredEl.childNodes[1].textContent || triggeredEl.childNodes[1].innerText;
            let day = new Date( monthPointer.getFullYear(), monthPointer.getMonth(), Number( dayNumber ) );
            let todaysEvents = events.filter( ( ev: any ) => {
                if ( isSameDay( ev.date, day ) ) {
                    return ev;
                }
            } );
            let week = triggeredEl.parentNode;
            let firstElement = document.querySelector( `[data-weekid="${week.dataset["weekid"]}"] .dxCalendar__details .dxCalendar__detailsContainer button` ) as HTMLElement;
            if ( firstElement !== null ) firstElement.focus();
            setActiveEvents( [...todaysEvents] );
            setActiveWeek( parseInt( week.dataset["weekid"] ) );
            setActiveDay( day.getDay() );
        }
    };

    const getComponentSizes = () => {
        if ( props.small ) {
            return `
                .dxCalendar { width: 300px; }
                .dxCalendar__day{ width: 39px; }
                .dxCalendar__details{ width: 280px; }
            `;
        }
        return `
            .dxCalendar { width: 420px; }
            .dxCalendar__day{ width: 57px; }
            .dxCalendar__details{ width: 400px; }
        `;
    };

    useEffect( () => {
        backFill();
        currentMonth();
        forwardFill();
        let todayEl = document.querySelector( ".today" );
        if ( todayEl ) {
            renderEventDetailsBox( "true", todayEl );
        }
    }, [change] );

    useEffect( () => {
        parseEvents( props.events );
    }, [props.events] );

    return (
        <div {...pickDomProps( rest )} ref={ref} className={classNames( "dxCalendar", className )}>
            <Modal show={showModal} onHide={handleClose} data-testid="calendar-modal" className="dxCalendar__modal">
                <Modal.Header>
                    <Modal.Title>
                        Events for {activeEvents[0] ? formatDate( activeEvents[0].date, "MMMM DD, YYYY" ) : undefined}
                        <i className="ci-Close_MD" onClick={ handleClose }></i> 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {activeEvents.map( ( ev: Event, eventIndex: number ) => (
                        <div className="dxCalendar__modalEvent" key={eventIndex}>
                            <div className="dxCalendar__modalColor"
                                style={ev.color ? { backgroundColor: ev.color } : undefined}></div>
                            <a href={ev.link} target="_self">{ev.name}</a>
                        </div>
                    ) )}
                </Modal.Body>
                <Modal.Footer>
                    <DXButton
                        className="dxCalendar__modalButton"
                        onClick={ handleClose }
                        data-testid="calendar-modal-close"
                        label="Close" />
                </Modal.Footer>
            </Modal>
            <style>{getComponentSizes()}</style>
            {renderHeader()}
            <div className="dxCalendar__month">
                {renderWeeks()}
            </div>
        </div>
    );
};

export default DXCalendar;
