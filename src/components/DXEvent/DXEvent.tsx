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

import "./DXEvent.scss";
import React, { useState, useEffect } from 'react';
import { LinksProps, getLinkTarget, IconButtonProps, getIcon } from "../../utilities";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";
import DXButton from "../DXButton/DXButton";
import { formatDate, parseDate } from "../../utilities/dateTime";
import { CardComponent } from "../../utilities/CardComponent/CardComponent";
import { normalizeLocaleNumerals } from "../../utilities/cec-utils";
interface EventDate {
    shortMonth: string,
    month: string,
    day: string,
    dayOfWeek: string,
    year: string,
    hour?: string,
}
export interface EventProps extends BasicComponent, CardComponent {
    variant: "featured" | "river" | "featured-compact",
    /** Text direction. Omit to auto-detect from <html dir>. */
    dir?: 'ltr' | 'rtl',
    eventFrom: string,
    eventTo?: string,
    eventType?: string,
    eventName: LinksProps,
    eventLocation?: string,
    eventButton?: IconButtonProps,
    eventTime24hrFormat?: boolean,
    showExternalIcon?: boolean,
    compact?: boolean,
    icons?: {
        event?: string,
        featured?: string,
        location?: string,
    };
}
const DXEvent = ( props: EventProps ) => {
    // STATES
    const [dateFrom, setDateFrom] = useState<any>( {} );
    const [dateTo, setDateTo] = useState<any>( {} );
    // RTL direction detection — auto-detect from <html dir> with MutationObserver.
    // An explicit `dir` prop overrides auto-detection.
    const [documentDir, setDocumentDir] = useState<'ltr' | 'rtl'>( () => {
        if ( typeof document !== 'undefined' ) {
            return ( getComputedStyle( document.documentElement ).direction as 'ltr' | 'rtl' ) || 'ltr';
        }
        return 'ltr';
    } );
    useEffect( () => {
        if ( props.dir ) return; // explicit prop wins
        const update = () => {
            if ( typeof document !== 'undefined' ) {
                setDocumentDir( ( getComputedStyle( document.documentElement ).direction as 'ltr' | 'rtl' ) || 'ltr' );
            }
        };
        update();
        const observer = new MutationObserver( update );
        if ( typeof document !== 'undefined' ) {
            observer.observe( document.documentElement, { attributes: true, attributeFilter: ['dir'] } );
        }
        return () => observer.disconnect();
    }, [props.dir] );
    const resolvedDir: 'ltr' | 'rtl' = props.dir ?? documentDir;
    // DATE LOGIC — inlined inside useEffect to avoid stale-closure warnings
    // (props.eventTime24hrFormat is captured fresh on every effect run)
    useEffect( () => {
        const from = props.eventFrom;
        const to = props.eventTo;
        // Normalize locale-specific numerals (e.g. Arabic-Indic) to ASCII before parsing.
        const normFrom = from ? normalizeLocaleNumerals( from ) : from;
        const normTo = to ? normalizeLocaleNumerals( to ) : to;
        // Guard: bail out early for empty or unparseable dates.
        const parsedFrom = normFrom ? parseDate( normFrom ) : null;
        if ( !normFrom || !parsedFrom ) return;
        let resolvedFrom = normFrom;
        let resolvedTo = normTo;
        let resolvedFromDate: Date | null = parsedFrom;
        let resolvedToDate: Date | null = normTo ? parseDate( normTo ) : null;
        // Always display dates in chronological order regardless of the order
        // the data source (e.g. WCM in AR locale) provides them.
        if ( normTo && normTo !== "" ) {
            const fromMs = parsedFrom.getTime();
            const toMs = resolvedToDate ? resolvedToDate.getTime() : NaN;
            if ( !isNaN( fromMs ) && !isNaN( toMs ) && toMs < fromMs ) {
                resolvedFrom = normTo;
                resolvedTo = normFrom;
                resolvedFromDate = resolvedToDate;
                resolvedToDate = parsedFrom;
            }
        }
        const fromDate: EventDate = {
            shortMonth: formatDate( resolvedFromDate, "MMM" ).toUpperCase(),
            month: formatDate( resolvedFromDate, "MMMM" ),
            day: formatDate( resolvedFromDate, "DD" ),
            dayOfWeek: formatDate( resolvedFromDate, "dddd" ),
            year: formatDate( resolvedFromDate, "YYYY" ),
        };
        if ( resolvedFrom.includes( "T" ) ) {
            fromDate.hour = props.eventTime24hrFormat
                ? formatDate( resolvedFromDate, "HH:mm" )
                : formatDate( resolvedFromDate, "h:mma" );
        }
        setDateFrom( { ...fromDate } );
        if ( resolvedTo && resolvedTo !== "" && resolvedToDate ) {
            const toDate: EventDate = {
                shortMonth: formatDate( resolvedToDate, "MMM" ).toUpperCase(),
                month: formatDate( resolvedToDate, "MMMM" ),
                day: formatDate( resolvedToDate, "DD" ),
                dayOfWeek: formatDate( resolvedToDate, "dddd" ),
                year: formatDate( resolvedToDate, "YYYY" ),
            };
            if ( resolvedTo.includes( "T" ) ) {
                toDate.hour = props.eventTime24hrFormat
                    ? formatDate( resolvedToDate, "HH:mm" )
                    : formatDate( resolvedToDate, "h:mma" );
            }
            setDateTo( { ...toDate } );
        }
    }, [props.eventFrom, props.eventTo, props.eventTime24hrFormat] );
    const getVariant = ( variant: string ) => {
        let componentClass = "";
        switch ( variant ) {
            case "featured-compact":
                componentClass = "dxEvent--featuredCompact";
                break;
            case "featured":
                componentClass = "dxEvent--featured";
                break;
            case "river":
                componentClass = "dxEvent--river";
                break;
            default:
                componentClass = "dxEvent--featured";
                break;
        }
        return componentClass;
    };
    const getTopClass = ( variant: string ) => {
        let componentClass = "";
        switch ( variant ) {
            case "featured-compact":
                componentClass = "dxEvent__topLabelCompact";
                break;
            case "featured":
                componentClass = "dxEvent__topLabelFeatured";
                break;
            case "river":
                componentClass = "dxEvent__topLabel";
                break;
            default:
                componentClass = "dxEvent__topLabel";
                break;
        }
        return componentClass;
    };
    // RENDER METHODS
    const getDefaultDateSummary = () => {
        const renderDate = ( date: EventDate ) => `${date.dayOfWeek}, ${date.month} ${date.day}, ${date.year}`;
        const dateSummary = Object.keys( dateTo ).length > 0
            ? `${renderDate( dateFrom )} - ${renderDate( dateTo )}`
            : renderDate( dateFrom );
        return dateFrom.hour ? `${dateSummary} | ${dateFrom.hour} PST` : dateSummary;
    };
    const getCompactDateSummary = () => {
        const formatTime = ( time: string ) => props.eventTime24hrFormat
            ? time
            : time.replace( /(am|pm)$/, ( meridiem ) => meridiem === "am" ? " a.m." : " p.m." );
        const times = [dateFrom.hour, dateTo.hour].filter( Boolean ).map( formatTime );
        return `${dateFrom.dayOfWeek}${times.length > 0 ? ` | ${times.join( " - " )}` : ""}`;
    };
    const renderFeaturedButton = ( button: IconButtonProps ) => {
        let buttonProps = {
            ...button,
            "data-testid": "event-featured-button"
        };
        return <DXButton {...buttonProps} />;
    };
    const renderExternalLinkIcon = () => props.showExternalIcon ? (
        <i className="ci-Arrow_Up_Right_MD" aria-hidden="true"></i>
    ) : null;
    const getVisualLabel = ( label: string, limit: number ) => ( {
        isTruncated: label.length > limit,
        label: label.length > limit ? `${label.slice( 0, limit )}...` : label,
    } );
    const renderFeaturedDetails = () => {
        const isCompact = props.variant === "featured-compact";
        const visualLabel = getVisualLabel( props.eventName.label, isCompact ? 29 : 60 );
        return (
            <div className="dxEvent__details" data-testid={props.variant === "featured" ? "event-featured-details" : "event-featured-compact-details"}>
                {props.eventType ? (
                    <p className={props.variant === "featured" ? "dxEvent__typeOf" : "dxEvent--featuredCompact__typeOf"}>{props.eventType}</p>
                ) : null}
                <h3 className={props.variant === "featured" ? "dxEvent--featured__name" : "dxEvent--featuredCompact__name"}
                    data-testid={props.variant === "featured" ? "event-featured-name" : "event-featured-compact-name"}>
                    <a href={props.eventName.url !== '' ? props.eventName.url : '#'}
                        target={getLinkTarget( props.eventName.target )}
                        aria-label={visualLabel.isTruncated ? props.eventName.label : undefined}>
                        {visualLabel.label}
                    </a>
                    {renderExternalLinkIcon()}
                </h3>
                {
                    props.variant === "featured" && props.eventLocation && props.eventLocation !== "" ? (
                        <div className="dxEvent__location">
                            <p>{props.eventLocation}</p>
                        </div>
                    ) : ""
                }
                {props.variant === "featured" ? (
                    <div className="dxEvent__info">
                        <i className={getIcon( props.icons, "event", "ci-Calendar_Days" )} aria-hidden="true"></i>
                        <p data-testid="event-featured-info">{getDefaultDateSummary()}</p>
                    </div>
                ) : (
                    <CompactDateSummary />
                )}
                {
                    props.variant === "featured" && props.eventButton ? (
                        renderFeaturedButton( props.eventButton )
                    ) : null
                }
            </div>
        );
    };
    const CompactDateSummary = () => {
        const dateSummary = getCompactDateSummary();
        const visualSummary = getVisualLabel( dateSummary, 57 );
        return (
            <div className="dxEvent--featuredCompact__info">
                <p data-testid="event-featured-compact-info"
                    aria-label={visualSummary.isTruncated ? dateSummary : undefined}>
                    {visualSummary.label}
                </p>
            </div>
        );
    };
    const renderRiverDetails = () => {
        const isRiverCompact = props.variant === "river" && props.compact;
        const visualLabel = getVisualLabel( props.eventName.label, isRiverCompact ? 25 : 60 );
        return (
            <div className="dxEvent--river__details" data-testid="event-river-details">
                {props.eventType ? (
                    <p className="dxEvent--river__typeOf">{props.eventType}</p>
                ) : null}
                <h3 className="dxEvent--river__name"
                    data-testid="event-river-name">
                    <a href={props.eventName.url !== '' ? props.eventName.url : '#'}
                        target={getLinkTarget( props.eventName.target )}
                        aria-label={visualLabel.isTruncated ? props.eventName.label : undefined}>
                        {visualLabel.label}
                    </a>
                    {!isRiverCompact ? (
                        <div className="dxEvent--river__icon">
                            {renderExternalLinkIcon()}
                        </div>
                    ) : null}
                </h3>
            </div>
        );
    };
    const renderDetails = ( variant: string ) => {
        if ( variant === "featured" || variant === "featured-compact" ) return renderFeaturedDetails();
        if ( variant === "river" ) return renderRiverDetails();
        return (
            <p>The variant received is invalid</p>
        );
    };
    const isRiverCompact = props.variant === "river" && props.compact;
    return (
        <div className={`dxEvent ${getVariant( props.variant )}${isRiverCompact ? ' dxEvent--riverCompact' : ''}${resolvedDir === 'rtl' ? ' dxEvent--rtl' : ''}`} dir={resolvedDir}>
            {
                props.variant === "featured" ? (
                    <div className="dxEvent--featured__calendarIcon">
                        <i className={getIcon( props.icons, "featured", "ci-Calendar_Days" )} aria-hidden="true"></i>
                    </div>
                ) : null
            }
            <div className="dxEvent__top">
                <div className="dxEvent__date">
                    <div className={getTopClass( props.variant )}
                        data-testid="event-date-from">
                        <span>{dateFrom.shortMonth}</span>
                        <h6>{dateFrom.day}</h6>
                    </div>
                    {Object.keys( dateTo ).length > 0 ? (
                        <>
                            <div className="dxEvent__topIndicator" data-testid="event-indicator">
                                <p>- to -</p>
                            </div>
                            <div className={getTopClass( props.variant )}
                                data-testid="event-date-to">
                                <span>{dateTo.shortMonth}</span>
                                <h6>{dateTo.day}</h6>
                            </div>
                        </>
                    ) : null}
                </div>
                {
                    props.variant === "river" && !isRiverCompact ? (
                        <div className="dxEvent--river__calendarIcon" data-testid="event-river-calendar-icon">
                            <i className={getIcon( props.icons, "event", "ci-Calendar_Days" )} aria-hidden="true"></i>
                        </div>
                    ) : ""
                }
            </div>
            {renderDetails( props.variant )}
            {props._edit && renderEditButton( props._edit )}
        </div >
    );
};
export default DXEvent;
