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

import "./DXEventItem.scss";
import React from 'react';
import { LinksProps, getLinkTarget, getValuesFromDateFormat, DateValues, overflowText } from "../../utilities";
import { dateFromParts, formatDate, parseDateWithFormat } from "../../utilities/dateTime";
import { CardComponent } from "../../utilities/CardComponent/CardComponent";

export interface EventItemProps extends CardComponent {
    variant: "event" | "form",
    eventName?: string,
    eventDate?: string,
    dateFormat?: string;
    eventStartTime?: string,
    eventEndTime?: string,
    formName?: string;
    formNumber?: string,
    formPrice?: number,
    link: LinksProps,
}

const DXEventItem = ( props: EventItemProps ) => {
    const DEFAULT_DATE_FORMAT = "MM/DD/YY";

    const getDay = ( eventDate: string | undefined, format?: string ) => {
        const eventDateFormatted: DateValues = getValuesFromDateFormat( eventDate ? eventDate : '', format ? format : DEFAULT_DATE_FORMAT );
        return eventDateFormatted.day;
    };

    const getDayOfWeek = ( eventDate: string | undefined, format?: string ) => {
        const eventDateFormatted: DateValues = getValuesFromDateFormat( eventDate ? eventDate : '', format ? format : DEFAULT_DATE_FORMAT );
        return formatDate( dateFromParts( eventDateFormatted.year, eventDateFormatted.month, eventDateFormatted.day ), "ddd" );
    };

    const renderEventMetadata = () => (
        <div className="dxEventItem__metadata"
            data-testid="event-metadata">
            <p className="dxEventItem__dayOfWeek" data-testid="event-item-dayOfWeek" >
                {getDayOfWeek( props.eventDate, props.dateFormat )}
            </p>
            <h3 className="dxEventItem__day" data-testid="event-item-day">{getDay( props.eventDate, props.dateFormat )}</h3>
        </div>
    );

    const renderFormMetadata = () => (
        <div className="dxEventItem__metadata" data-testid="form-metadata">
            <p className="dxEventItem__formNumber">{props.formNumber}</p>
            <p className="dxEventItem__price">${props.formPrice?.toFixed( 2 )}</p>

        </div>
    );

    const verifyTextOverflow = ( content: string, variant: string ) => {
        if ( variant === "event" ) {
            return overflowText( content, 57 );
        } else {
            return overflowText( content, 92 );
        }
    };

    const renderMetadata = ( variant: string ) => {
        if ( variant === "event" ) {
            return renderEventMetadata();
        } else {
            return renderFormMetadata();
        }
    };

    return ( ( props.variant === "event" || props.variant === "form" ) ?
        <div data-testid="event-item" role="listitem" className={`dxEventItem ${props.variant === "form" ? "dxEventItem--form" : "dxEventItem--event"}`}>
            <a className="dxEventItem__link"
                href={props.link.url !== '' ? props.link.url : '#'}
                target={getLinkTarget( props.link.target )}
                title={props.variant === "form" ? props.formName : ""}
                data-testid="event-item-card">
                <div className="d-flex dxEventItem__container">
                    {renderMetadata( props.variant )}
                    <div className="dxEventItem__content">
                        <p className="dxEventItem__title" data-testid="event-item-title">
                            {props.variant === "event" &&
                                verifyTextOverflow( props.eventName || "", props.variant )
                            }
                            {props.variant === "form" &&
                                verifyTextOverflow( props.formName || "", props.variant )
                            }
                        </p>
                        {
                            props.variant === "event" ? (
                                <p className="dxEventItem__time">
                                    {formatDate( parseDateWithFormat( props.eventStartTime, "HH:mm" ), "hh:mm A" )} -
                                    {formatDate( parseDateWithFormat( props.eventEndTime, "HH:mm" ), "hh:mm A" )}
                                </p>
                            ) : ""
                        }
                    </div>
                </div >
            </a>
        </div>
        : null
    );
};

export default DXEventItem;
