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
import "./DXProfileCard.scss";
import React, { useState } from "react";
import DXSocialPresence, { SocialPresenceProps } from "../DXSocialPresence/DXSocialPresence";
import { ImageProps, renderAvatarLetters } from "../../utilities";
import { CardComponent } from "../../utilities/CardComponent/CardComponent";
import { pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface ProfileCardProps extends CardComponent {
    name: string;
    image?: ImageProps;
    socialMedia?: SocialPresenceProps;
    showSocialMedia?: boolean;
}

const renderSocialSection = ( socialPresenceProps: SocialPresenceProps ) => {
    socialPresenceProps.size = 'big';
    delete socialPresenceProps.title;
    return (
        <div className="dxProfileCard__socialMedia" data-testid="pc-socialContainer">
            <DXSocialPresence {...socialPresenceProps}></DXSocialPresence>
        </div>
    );
};

const DXProfileCard = ( props: ProfileCardProps & { className?: string; ref?: React.Ref<HTMLDivElement>; } ) => {
    // Own props are pulled out; only DOM-safe extras reach the root (the props type has an index signature).
    const { name: _name, image: _image, socialMedia: _socialMedia, showSocialMedia: _showSocialMedia, _search, index: _index, className, ref, ...rest } = props;
    const domAttrs = pickDomProps( rest );
    // States
    const [loaded, setLoaded] = useState( false );
    return (
        <div {...domAttrs} ref={ref} className={classNames( "dxProfileCard", className )}>
            <div className="dxProfileCard__image" data-testid="pc-imageContainer">
                {props.image ? (
                    <>
                        <div className={`loader__container ${loaded ? "d-none" : ""}`}>
                            <span className="loader"></span>
                        </div>
                        <img
                            data-testid="pc-profilePic"
                            src={props.image.url}
                            alt={props.image.altText || props.name + "'s picture"}
                            loading="lazy"
                            onLoad={() => setLoaded( true )}
                        />
                    </>
                ) : (
                    <div className="dxProfileCard__image--avatar">
                        {renderAvatarLetters( props.name )}
                    </div>
                )}
            </div>
            <div className="dxProfileCard__name" data-testid="pc-nameContainer">
                <p>{props.name}</p>
            </div>
            {props.socialMedia && props.showSocialMedia !== false && (
                renderSocialSection( props.socialMedia )
            )}
        </div>
    );
};

export default DXProfileCard;
