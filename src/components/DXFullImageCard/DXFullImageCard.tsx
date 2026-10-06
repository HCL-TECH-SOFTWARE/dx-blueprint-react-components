import "../../global/loaders.scss";
import "./DXFullImageCard.scss";
import React, { useState } from "react";
import { ImageProps, getValuesFromDateFormat, getFullMonth } from "../../utilities";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";
import { CardComponent } from "../../utilities/CardComponent/CardComponent";

export interface FullImageCardProps extends BasicComponent, CardComponent {
    image: ImageProps,
    subtitle?: string,
    description: string,
    link: string,
    dateFormat?: string;
}

const DXFullImageCard = ( props: FullImageCardProps ) => {
    const [loaded, setLoaded] = useState( false );
    const DEFAULT_DATE_FORMAT = "MM/DD/YY";
    const setDate = ( text: string, format?: string ) => {
        let formatedDate = getValuesFromDateFormat( text, format ? format : DEFAULT_DATE_FORMAT );
        if (
            ( formatedDate.month !== "Invalid" && formatedDate.month !== "" ) &&
            ( formatedDate.day !== "Invalid" && formatedDate.day !== "" ) &&
            ( formatedDate.year !== "invalid" && formatedDate.year !== "" ) ) {
            return `${getFullMonth( formatedDate.month )} ${formatedDate.day}, ${formatedDate.year}`;
        }
        return text;
    };
    const getBackground = ( image?: ImageProps ) => {
        let styles: { [k: string]: any; } = {};
        if ( image ) {
            styles["backgroundImage"] = `linear-gradient(16.81deg, rgba(0, 0, 0, 0.5) 9.02%, rgba(0, 0, 0, 0.5) 42.36%), url('${image.url}')`;
        } else {
            styles["backgroundImage"] = `linear-gradient(132deg, #080808 0%, transparent 40%)`;
        }
        return styles;
    };
    return (
        <div className="dxFullImageCard">
            <a href={props.link}
                className="dxFullImageCard__link"
                title={props.description}
                style={getBackground( props.image )}>
                <div className="dxFullImageCard__info">
                    {props.subtitle ? (
                        <p className="dxFullImageCard__infoSubtitle" data-testid="full-image-card-date">{setDate( props.subtitle, props.dateFormat )}</p>
                    ) : null}
                    <h6 className="dxFullImageCard__infoHeading">{props.description}</h6>
                </div>
            </a>
            {props._edit && renderEditButton( props._edit )}
        </div>
    );
};

export default DXFullImageCard;
