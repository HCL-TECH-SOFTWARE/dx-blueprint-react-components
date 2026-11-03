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

import "../../global/loaders.scss";
import React, { useState } from "react";
import { getFullMonth, getLinkTarget, getValuesFromDateFormat, ImageProps, LinksProps } from "../../utilities";
import "./DXNewsCard.scss";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";
import { CardComponent } from "../../utilities/CardComponent/CardComponent";

export interface NewsCardProps extends BasicComponent, CardComponent {
    link: LinksProps;
    date: string;
    image?: ImageProps;
    dateFormat?: string;
    contentType?: string;
    contentPosition?: "connected" | "split";
    layout?: "top" | "left";
}

const DXNewsCard = ( props: NewsCardProps ) => {
    // States
    const [loaded, setLoaded] = useState( false );
    const DEFAULT_DATE_FORMAT = "MM/DD/YY";

    const setDate = ( date: string, format?: string ) => {
        let formatedDate = getValuesFromDateFormat( date, format ? format : DEFAULT_DATE_FORMAT );
        return `${getFullMonth( formatedDate.month )} ${formatedDate.day}, ${formatedDate.year}`;
    };

    return (
        <div className={"dxNewsCard"} data-testid="newsCardItem" >
            <div className="dxNewsCard__main" style={( props.layout == "top" ) ? { display: "block" } : {}}>
                {
                    props.image &&
                    <div className={`dxNewsCard__thumbnailContainer dxNewsCard__thumbnail--${props.layout || "left"}`} data-testid="newsCard__imageContainer">
                        <div className={`loader__container ${loaded ? "d-none" : ""}`}>
                            <span className="loader"></span>
                        </div>
                        <img
                            data-testid="newsCard__image"
                            className="dxNewsCard__thumbnail"
                            src={props.image.url}
                            loading="lazy"
                            onLoad={() => setLoaded( true )}
                            onError={() => setLoaded( true )}
                            alt={props.image.altText ? props.image.altText : props.link.label}
                        ></img>
                    </div>
                }
                <span className={`dxNewsCard__secondary--${props.layout || "left"}`}>
                    <div className="dxNewsCard__newsTitle">
                        <a
                            href={props.link.url}
                            target={getLinkTarget( props.link.target )}
                        >
                            {props.link.label}
                        </a>
                    </div>
                    <div className={`dxNewsCard__textContainer dxNewsCard__textContainer--${props.layout || "left"}`}>
                        <span className="dxNewsCard__newsDate">
                            {setDate( props.date, props.dateFormat )}
                        </span>
                        {
                            props.contentType &&
                            <span
                                data-testid="newsCard__contentType"
                                className=
                                {
                                    `dxNewsCard__contentType
                                    dxNewsCard__contentType--${props.contentPosition || "split"}`
                                }
                            >
                                <b>&bull;</b>
                                {props.contentType}
                            </span>
                        }
                    </div>
                </span>
            </div>
            {props._edit && renderEditButton( props._edit )}
        </div>
    );
};

export default DXNewsCard;
