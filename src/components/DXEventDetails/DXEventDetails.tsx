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

import "./DXEventDetails.scss";
import "../icons/DXIcons.scss";

import React, { useState, useEffect, useRef } from "react";
import { LinksProps, getLinkTarget, getLinkIcon, getIcon } from "../../utilities";
import DXMap from "../DXMap";
import DXButton from "../DXButton/DXButton";
import { formatDate, parseDate } from "../../utilities/dateTime";
import DXSocialShare, { SocialShareProps } from "../DXSocialShare/DXSocialShare";
import variables from "../../global/_exportVariables.module.scss";

interface EventDate {
    shortMonth: string,
    month: string,
    day: string,
    dayOfWeek: string,
    year: string,
    hour?: string,
}

interface CalendarUrl {
    google?: boolean,
    apple?: boolean,
    outlook?: boolean,
    yahoo?: boolean;
}
export interface EventDetailsProp {
    title: string,
    eventFrom: string,
    eventTo: string,
    beginHour: string,
    endHour: string,
    location: string,
    addressLines?: string[],
    eventUrl?: LinksProps,
    mapUrl?: string,
    addToMyCalendar?: boolean,
    contact?: Function,
    getDirections?: Function,
    share?: Function | SocialShareProps,
    register?: Function,
    calendarButtons?: {
        google?: boolean,
        apple?: boolean,
        yahoo?: boolean,
        outlook?: boolean;
    };
    icons?: {
        calendar?: string;
        contact?: string;
        location?: string;
        share?: string;
        register?: string;
        google?: string;
        apple?: string;
        yahoo?: string;
        outlook?: string;
        close?: string;
    };
}

const DXEventDetails = ( props: EventDetailsProp ) => {

    const MAX_ADDRESSES = 2;

    // STATES
    const [dateFrom, setDateFrom] = useState<any>( {} );
    const [dateTo, setDateTo] = useState<any>( {} );
    const [overlay, setOverlay] = useState( false );
    const [calendarUrls, setCalendarUrls] = useState<any>( {} );
    const [overlaySocialMedia, setOverlaySocialMedia] = useState( false );
    const [overlayAddCalendar, setOverlayAddCalendar] = useState( false );
    const [isMobile, setIsMobile] = useState( false );
    let componentRef = useRef<HTMLDivElement>( null );
    const MAX_WIDTH_MOBILE = parseInt( variables.md.split( "px" ) );
    const adrEl = useRef<HTMLParagraphElement>( null );
    const eventUrl = useRef<HTMLAnchorElement>( null );

    const verifyOverflow = () => {
        if ( props.addressLines && props.addressLines.length > 0 ) {
            let length = props.addressLines.length < MAX_ADDRESSES ? props.addressLines.length : MAX_ADDRESSES;
            for ( let i = 0; i < length; i++ ) {
                if ( props.addressLines[i].length > 43 ) {
                    adrEl.current?.classList.add( "dxEventDetails--overflow-enabled" );
                }
            }
        }
        if ( props.eventUrl ) {
            if ( props.eventUrl.label.length > 43 ) {
                eventUrl.current?.classList.add( "dxEventDetails--overflow-enabled" );
            }
        }
    };

    // DATE LOGIC
    const setDates = ( from: string, to: string ) => {
        const parsedFrom = parseDate( from );
        const parsedTo = parseDate( to );
        let fromDate: EventDate = {
            shortMonth: formatDate( parsedFrom, "MMM" ).toUpperCase(),
            month: formatDate( parsedFrom, "MMMM" ),
            day: formatDate( parsedFrom, "DD" ),
            dayOfWeek: formatDate( parsedFrom, "dddd" ),
            year: formatDate( parsedFrom, "YYYY" ),
        };
        let toDate: EventDate = {
            shortMonth: formatDate( parsedTo, "MMM" ).toUpperCase(),
            month: formatDate( parsedTo, "MMMM" ),
            day: formatDate( parsedTo, "DD" ),
            dayOfWeek: formatDate( parsedTo, "dddd" ),
            year: formatDate( parsedTo, "YYYY" ),
        };
        setDateFrom( { ...fromDate } );
        setDateTo( { ...toDate } );
    };

    // CALENDAR LOGIC
    const setEmailsUrl = ( urls: CalendarUrl | undefined ) => {
        if ( urls ) {
            let calendarUrls: any = {};
            if ( urls.google ) {
                let googleCal = encodeURI( [
                    'http://calendar.google.com/calendar/event',
                    '?action=TEMPLATE',
                    '&text=' + props.title,
                    '&dates=' + props.beginHour,
                    '/' + props.endHour,
                    '&location=' + ( props.location || '' ),
                    '&sprop=&sprop=name:'
                ].join( '' ) );
                calendarUrls['google'] = googleCal;
            }
            if ( urls.yahoo ) {
                let yahooCal = encodeURI( [
                    'http://calendar.yahoo.com/?v=60&view=d&type=20',
                    '&title=' + props.title,
                    '&st=' + props.beginHour,
                    '&et=' + props.endHour,
                    '&in_loc=' + ( props.location || '' )
                ].join( '' ) );
                calendarUrls['yahoo'] = yahooCal;
            }
            if ( urls.outlook ) {
                let outlookCal = encodeURI(
                    'data:text/calendar;charset=utf8,' + [
                        'BEGIN:VCALENDAR',
                        'VERSION:2.0',
                        'BEGIN:VEVENT',
                        'URL:' + document.URL,
                        'DTSTART:' + props.beginHour,
                        'DTEND:' + props.endHour,
                        'SUMMARY: ' + props.title,
                        'LOCATION:' + ( props.location || '' ),
                        'END:VEVENT',
                        'END:VCALENDAR']
                        .join( '\n' ) );
                calendarUrls['outlook'] = outlookCal;
            }
            if ( urls.apple ) {
                let appleCal = encodeURI(
                    'data:text/calendar;charset=utf8,' + [
                        'BEGIN:VCALENDAR',
                        'VERSION:2.0',
                        'BEGIN:VEVENT',
                        'URL:' + document.URL,
                        'DTSTART:' + props.beginHour,
                        'DTEND:' + props.endHour,
                        'SUMMARY: ' + props.title,
                        'LOCATION:' + ( props.location || '' ),
                        'END:VEVENT',
                        'END:VCALENDAR']
                        .join( '\n' ) );
                calendarUrls['apple'] = appleCal;
            }
            setCalendarUrls( { ...calendarUrls } );
        }
        return;
    };


    useEffect( () => {
        setDates( props.eventFrom, props.eventTo );
        setEmailsUrl( props.calendarButtons );
        verifyOverflow();

    }, [props.eventFrom, props.eventTo] );

    const renderActionButtons = () => (
        <div className="row dxEventDetails__actions pb-0">
            {props.addToMyCalendar ? (
                <DXButton
                    label="Add to My Calendar"
                    displayType="secondary"
                    onClick={overlayType}
                    data-testid="event-details-add-btn"
                    id="event-details-add-btn"
                    hideLabel={isMobile}
                    icon={{
                        class: getIcon( props.icons, "calendar", "ci-Calendar_Days" )
                    }} />
            ) : null}
            {props.contact ? (
                <DXButton
                    label="Contact"
                    displayType="secondary"
                    onClick={props.contact}
                    data-testid="event-details-contact-btn"
                    hideLabel={isMobile}
                    icon={{
                        class: getIcon( props.icons, "contact", "ci-Mail" )
                    }} />
            ) : null}
            {props.getDirections ? (
                <DXButton
                    label="Get Directions"
                    displayType="secondary"
                    onClick={props.getDirections}
                    data-testid="event-details-directions-btn"
                    hideLabel={isMobile}
                    icon={{
                        class: getIcon( props.icons, "location", "ci-Map_Pin" )
                    }} />
            ) : null}
            {props.share ? (
                <DXButton
                    label="Share"
                    displayType="secondary"
                    onClick={identifyTypeAction}
                    data-testid="event-details-share-btn"
                    id="event-details-share-btn"
                    hideLabel={isMobile}
                    icon={{
                        class: getIcon( props.icons, "share", "ci-External_Link" )
                    }} />
            ) : null}
            {props.register ? (
                <DXButton
                    label="Register"
                    displayType="primary"
                    onClick={props.register}
                    data-testid="event-details-register-btn"
                    hideLabel={isMobile}
                    icon={{
                        class: getIcon( props.icons, "register", "ci-Checkbox_Check" )
                    }} />
            ) : null}
        </div>
    );

    const renderAddresses = () => {
        if ( props.addressLines && props.addressLines.length > 0 ) {
            if ( props.addressLines.length < MAX_ADDRESSES ) {
                return props.addressLines.map( ( adrs: string, index: number ) => (
                    <p ref={adrEl} data-testid={`event-details-adrs-line-${index + 1}`} title={adrs} key={index}>{adrs}</p>
                ) );
            } else {
                return props.addressLines.slice( 0, MAX_ADDRESSES ).map( ( adrs: string, index: number ) => (
                    <p ref={adrEl} data-testid={`event-details-adrs-line-${index + 1}`} title={adrs} key={index}>{adrs}</p>
                ) );
            }
        }
        return null;
    };

    const renderInfo = () => (
        <div className="dxEventDetails__info" data-testid="event-details-info">
            <div className="row">
                {( dateFrom.day === dateTo.day ) &&
                    ( dateFrom.shortMonth === dateTo.shortMonth ) &&
                    ( dateFrom.year === dateTo.year ) ? (
                    <div className="dxEventDetails__date--type-single">
                        <div className="dxEventDetails__date__number">
                            <span>{dateFrom.day}</span>
                            <span>{dateFrom.shortMonth}</span>
                        </div>
                    </div>
                ) : (
                    <div className="dxEventDetails__date">
                        <div className="dxEventDetails__date__number">
                            <span>{dateFrom.day}</span>
                            <span>{dateFrom.shortMonth}</span>
                        </div>
                        <span className="dxEventDetails__date__separator">-</span>
                        <div className="dxEventDetails__date__number">
                            <span>{dateTo.day}</span>
                            <span>{dateTo.shortMonth}</span>
                        </div>
                    </div>
                )}
                <div className="dxEventDetails__location">
                    <div>
                        <p className="dxEventDetails__locationTitle">{props.location}</p>
                        <p>{props.beginHour} - {props.endHour}</p>
                        {
                            props.eventUrl ? (
                                <a data-testid="event-details-url" title={props.eventUrl.url}
                                    ref={eventUrl}
                                    target={getLinkTarget( props.eventUrl.target )}
                                    href={props.eventUrl.url}>
                                    {props.eventUrl.label}
                                    {getLinkIcon( props.eventUrl.target )}
                                </a>
                            ) : null
                        }
                        {renderAddresses()}
                    </div>
                </div>
            </div>
            {renderActionButtons()}
        </div>
    );

    const renderCalendarButtons = () => (
        <div className="dxEventDetails__overlay__icons">
            <div className={!calendarUrls.apple ? 'disabled' : undefined} data-testid="event-details-apple">
                {calendarUrls.apple ? (
                    <a href={calendarUrls.apple} target="_blank">
                        <i className={getIcon( props.icons, "apple", "dx-apple" )}></i>
                    </a>
                ) : ( <i className={getIcon( props.icons, "apple", "dx-apple" ) + " disabled"}></i> )}
            </div>
            <div className={!calendarUrls.google ? 'disabled' : undefined} data-testid="event-details-google">
                {calendarUrls.google ? (
                    <a href={calendarUrls.google}>
                        <i className={getIcon( props.icons, "google", "dx-google" )}></i>
                    </a>
                ) : ( <i className={getIcon( props.icons, "google", "dx-google" ) + " disabled"}></i> )}
            </div>
            <div className={!calendarUrls.outlook ? 'disabled' : undefined} data-testid="event-details-outlook">
                {calendarUrls.outlook ? (
                    <a href={calendarUrls.outlook} className="flex">
                        <i className={getIcon( props.icons, "outlook", "dx-microsoftOutlook" )}></i>
                    </a>
                ) : ( <i className={getIcon( props.icons, "outlook", "dx-microsoftOutlook" ) + " disabled"}></i> )}
            </div>
            <div className={!calendarUrls.yahoo ? 'disabled' : undefined} data-testid="event-details-yahoo">
                {calendarUrls.yahoo ? (
                    <a href={calendarUrls.yahoo} className="flex">
                        <i className={getIcon( props.icons, "yahoo", "dx-yahoo" )}></i>
                    </a>
                ) : ( <i className={getIcon( props.icons, "yahoo", "dx-yahoo" ) + " disabled"}></i> )}
            </div>
        </div>
    );

    const identifyTypeAction = ( e: any ) => {
        ( typeof props.share === "function" ) ? props.share?.() : overlayType( e );
    };

    const overlayType = ( e: any ) => {
        let idValidation = e.target.id;
        let classValidation = e.target.className;

        if ( idValidation === 'event-details-add-btn' || classValidation === "ci-Calendar_Days" || classValidation === "dxEventDetails__addText" ) {
            setOverlayAddCalendar( true );
            setOverlay( true );
        }
        if ( idValidation === 'event-details-share-btn' || classValidation === getIcon( props.icons, "share", "ci-External_Link" ) ) {
            setOverlaySocialMedia( true );
            setOverlay( true );
        }
    };

    const validationOverlayFirst = () => {
        if ( !overlay ) {
            setOverlaySocialMedia( false );
            setOverlayAddCalendar( false );
        }
    };

    useEffect( () => {
        validationOverlay();
    }, [overlayAddCalendar, overlaySocialMedia] );

    useEffect( () => {
        validationOverlayFirst();
    }, [overlay, props] );

    const validationOverlay = () => {
        if ( overlayAddCalendar ) {
            return (
                <>
                    <h5>Select the calendar you want to add the event to</h5>
                    {renderCalendarButtons()}
                </>
            );
        }
        if ( overlaySocialMedia && typeof props.share === "object" ) {
            return (
                <>
                    <DXSocialShare {...props.share} ></DXSocialShare>
                </>
            );
        } else {
            setOverlay( false );
        }
    };

    // - Mobile Validation
    const validateMobile = () => {
        let width = componentRef.current && componentRef.current.offsetWidth;
        if ( width && width <= MAX_WIDTH_MOBILE ) {
            setIsMobile( true );
        } else {
            setIsMobile( false );
        }
    };
    useEffect( () => {
        validateMobile();
        window.addEventListener( "resize", validateMobile );
        return function unmountComponent() {
            window.removeEventListener( "resize", validateMobile );
        };
    }, [] );

    return (
        <div className="dxEventDetails" ref={componentRef}>
            {props.mapUrl && props.mapUrl !== "" ? (
                <div className="dxEventDetails__map" data-testid="event-details-map">
                    <DXMap iframeUrl={props.mapUrl} />
                </div>
            ) : null}
            {!overlay ? (
                renderInfo()
            ) : (
                <div className="dxEventDetails__overlay" data-testid="event-details-overlay">
                    <div className="dxEventDetails__overlay__closeIcon">
                        <DXButton
                            icon={{
                                class: getIcon( props.icons, "close", "ci-Close_MD" )
                            }}
                            label="close"
                            hideLabel
                            displayType="unstyled"
                            onClick={() => setOverlay( false )}
                            data-testid="event-details-overlay-close" />
                    </div>
                    <div className="dxEventDetails__overlay__container">
                        {validationOverlay()}
                    </div>
                </div>
            )}
        </div>
    );
};
export default DXEventDetails;
