import React from "react";
import "./DXMyNextMeeting.scss";
import { LinksProps, getIcon, getLinkTarget } from "../../utilities";
import moment from "moment";

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

const DXMyNextMeeting = ( props: NextMeetingProps ) => {

    let startDateTimeValidated = true;
    let endDateTimeValidated = true;

    if ( !moment( props.startDateTime, moment.ISO_8601 ).isValid() ) {
        console.warn( "Invalid value for DXMyNextMeeting: startDateTime doesn't comply with the ISO 8601 format" );
        startDateTimeValidated = false;
    }

    if ( !moment( props.endDateTime, moment.ISO_8601 ).isValid() ) {
        console.warn( "Invalid value for DXMyNextMeeting: endDateTime doesn't comply with the ISO 8601 format" );
        endDateTimeValidated = false;
    }

    return (
        <div className="dxMyNextMeeting" data-testid="microsite-next-meeting">
            <i
                data-testid="myNextMeeting__eventIcon"
                className={`${getIcon( props.icons, "event", "ci-Calendar" )} dxMyNextMeeting__calendarIcon dxMyNextMeeting__Icon`}
            ></i>
            <div className="dxMyNextMeeting__content">
                <p className="dxMyNextMeeting__title" data-testid={"MNM__title"} >{props.title}</p>
                {startDateTimeValidated && endDateTimeValidated &&
                    <p className="dxMyNextMeeting__time" data-testid={"MNM__time"} >
                        {`${moment( props.startDateTime, moment.ISO_8601 ).format( "HH:mm" )} - ${moment( props.endDateTime, moment.ISO_8601 ).format( "HH:mm" )}`}
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
