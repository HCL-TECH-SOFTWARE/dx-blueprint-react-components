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

import React from "react";
import "./DXMyNextMeeting.scss";
import { LinksProps, getIcon, getLinkTarget } from "../../utilities";
import { formatDate, parseISODate } from "../../utilities/dateTime";
import { ExtendableProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface NextMeetingProps {
    title: string,
    startDateTime: string,
    endDateTime: string,
    link: LinksProps,
    icons?: {
        event?: string;
        link?: string;
    };
}

const DXMyNextMeeting = ( props: ExtendableProps<NextMeetingProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { title: _title, startDateTime: _startDateTime, endDateTime: _endDateTime, link: _link, icons: _icons, className, ref, ...rest } = props;

    let startDateTimeValidated = true;
    let endDateTimeValidated = true;

    const startDateTime = parseISODate( props.startDateTime );
    const endDateTime = parseISODate( props.endDateTime );

    if ( !startDateTime ) {
        console.warn( "Invalid value for DXMyNextMeeting: startDateTime doesn't comply with the ISO 8601 format" );
        startDateTimeValidated = false;
    }

    if ( !endDateTime ) {
        console.warn( "Invalid value for DXMyNextMeeting: endDateTime doesn't comply with the ISO 8601 format" );
        endDateTimeValidated = false;
    }

    return (
        <div {...rest} ref={ref} className={classNames( "dxMyNextMeeting", className )} data-testid="microsite-next-meeting">
            <i
                data-testid="myNextMeeting__eventIcon"
                className={`${getIcon( props.icons, "event", "ci-Calendar_Event" )} dxMyNextMeeting__calendarIcon dxMyNextMeeting__Icon`}
            ></i>
            <div className="dxMyNextMeeting__content">
                <p className="dxMyNextMeeting__title" data-testid={"MNM__title"} >{props.title}</p>
                {startDateTimeValidated && endDateTimeValidated &&
                    <p className="dxMyNextMeeting__time" data-testid={"MNM__time"} >
                        {`${formatDate( startDateTime, "HH:mm" )} - ${formatDate( endDateTime, "HH:mm" )}`}
                    </p>
                }
            </div>
            <a className="dxMyNextMeeting__link" data-testid="MNM__link"
                title={props.title}
                href={props.link.url ? props.link.url : "#"}
                target={getLinkTarget( props.link.target )}
            >
                <i data-testid="myNextMeeting__linkIcon"
                    className={`${getIcon( props.icons, "link", "ci-Chevron_Right" )} dxMyNextMeeting__Icon`}
                ></i>
            </a>
        </div>
    );
};

export default DXMyNextMeeting;
