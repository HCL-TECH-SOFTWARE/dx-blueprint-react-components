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

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./DXSocialPresence.scss";
import React from "react";
import { getLinkTarget } from "../../utilities";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ExtendableProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

interface SocialMedia {
    display?: boolean,
    url: string,
    target: string;
}
export interface SocialPresenceProps {
    title?: string,
    size?: "big" | "small",
    light?: boolean,
    socialMediaLinks: {
        facebook?: SocialMedia,
        linkedin?: SocialMedia,
        twitter?: SocialMedia,
        instagram?: SocialMedia;
    };
}

const redirectTo = ( url: string, target: string ) => {
    if ( url && url !== "" ) {
        window.open( url, getLinkTarget( target ) );
    } else {
        console.warn( "ERROR: Cannot redirect to an empty URL" );
    }
};

let getClassName = ( type?: string ) => {
    type = type ? type.toLowerCase() : type;
    switch ( type ) {
        case "small": {
            return "dxSocialPresence__container dxSocialPresence--small";
        }
        case "big": {
            return "dxSocialPresence__container";
        }
        default: {
            return "dxSocialPresence__container";
        }
    }
};

const DXSocialPresence = ( props: ExtendableProps<SocialPresenceProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { title: _title, size: _size, light: _light, socialMediaLinks: _socialMediaLinks, className, ref, ...rest } = props;
    const checkLightMode = ( size: string | undefined, light: boolean | undefined ) => {
        return size && size !== "small" && light ? { color: "var(--light-white)" } : undefined;
    };
    const renderIcons = ( socialMediaLinks?: any ) => {
        return (
            <>
                {socialMediaLinks && socialMediaLinks.linkedin && socialMediaLinks.linkedin.display == true &&
                    <Button
                        aria-label="Visit our Linkedin profile"
                        className="dxSocialPresence__button"
                        data-testid="dxSocialPresence-linkedin"
                        onClick={() => redirectTo( socialMediaLinks.linkedin.url, socialMediaLinks.linkedin.target )}
                        style={checkLightMode( props.size, props.light )}
                        >
                            <i className="bi-linkedin" aria-hidden="true"></i>
                        </Button>
                }

                {socialMediaLinks && socialMediaLinks.facebook && socialMediaLinks.facebook.display == true &&
                    <Button
                        aria-label="Visit our Facebook profile"
                        className="dxSocialPresence__button"
                        data-testid="dxSocialPresence-facebook"
                        onClick={() => redirectTo( socialMediaLinks.facebook.url, socialMediaLinks.facebook.target )}
                        style={checkLightMode( props.size, props.light )}
                        >
                            <i className="bi-facebook" aria-hidden="true"></i>
                        </Button>
                }

                {socialMediaLinks && socialMediaLinks.twitter && socialMediaLinks.twitter.display == true &&

                    <Button
                        aria-label="Visit our Twitter profile"
                        className="dxSocialPresence__button"
                        data-testid="dxSocialPresence-twitter"
                        onClick={() => redirectTo( socialMediaLinks.twitter.url, socialMediaLinks.twitter.target )}
                        style={checkLightMode( props.size, props.light )}
                        >
                            <i className="bi-twitter-x" aria-hidden="true"></i>
                        </Button>
                }

                {socialMediaLinks && socialMediaLinks.instagram && socialMediaLinks.instagram.display == true &&

                    <Button
                        aria-label="Visit our Instagram profile"
                        className="dxSocialPresence__button"
                        data-testid="dxSocialPresence-instagram"
                        onClick={() => redirectTo( socialMediaLinks.instagram.url, socialMediaLinks.instagram.target )}
                        style={checkLightMode( props.size, props.light )}
                        >
                            <i className="bi-instagram" aria-hidden="true"></i>
                        </Button>
                }
            </>
        );
    };
                    
    return (
        <div {...rest} ref={ref} className={classNames( "dxSocialPresence", className )}>
            {props.size !== "small" && props.title ?
                <p className="dxSocialPresence__title" style={checkLightMode( props.size, props.light )}>
                    {props.title}
                </p> : ""}
            <ButtonGroup
                data-testid="social-presence"
                className={getClassName( props.size )}>
                {renderIcons( props.socialMediaLinks )}
            </ButtonGroup>
        </div>
    );
};                    

export default DXSocialPresence;
