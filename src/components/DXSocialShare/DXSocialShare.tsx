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

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./DXSocialShare.scss";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export interface SocialShareProps {
    title?: string,
    size?: "small" | "big",
    light?: boolean,
    socialMediaActions: {
        facebook?: {
            display?: boolean,
            onClick?: Function;
        },
        linkedin?: {
            display?: boolean,
            onClick?: Function;
        },
        twitter?: {
            display?: boolean,
            onClick?: Function;
        },
    },
    pageDetails: {
        url: string,
        pageTitle: string,
        description?: string,
    },
}

const linkedinSharingEvent = ( pageDetails: any ) => {
    window.open( "https://www.linkedin.com/shareArticle?mini=true&url=" + pageDetails.url + "&title=" + pageDetails.pageTitle + "&summary=" + pageDetails.description, "linkedinWindow", "resizable=0" );
};

const facebookSharingEvent = ( pageDetails: any ) => {
    window.open( "https://www.facebook.com/sharer/sharer.php?u=" + pageDetails.url, "facebookWindow", "resizable=0" );
};

const twitterSharingEvent = ( pageDetails: any ) => {
    window.open( "https://twitter.com/intent/tweet?text=" + pageDetails.description + " " + pageDetails.url, "twitterWindow", "resizable=0" );
};

let getClassName = ( type?: string ) => {
    type = type ? type.toLowerCase() : type;
    switch ( type ) {
        case "small": {
            return "dxSocialShare__container dxSocialShare--small";
        }
        case "big": {
            return "dxSocialShare__container";
        }
        default: {
            return "dxSocialShare__container";
        }
    }
};


const DXSocialShare = ( props: SocialShareProps ) => {
    const checkLightMode = ( size: string | undefined, light: boolean | undefined ) => {
        return size && size !== "small" && light ? { color: "var(--white)" } : undefined;
    };

    const renderIcons = ( pageDetails: any, socialMediaActions?: any ) => {

        return (
            <>
                {socialMediaActions && socialMediaActions.linkedin && socialMediaActions.linkedin.display == true &&
                    <Button
                        aria-label="Share this content into Linkedin"
                        className="dxSocialShare__button"
                        data-testid="dxSocialShare-linkedin"
                        style={checkLightMode( props.size, props.light )}
                        onClick={
                            socialMediaActions.linkedin.onClick
                                ? socialMediaActions.linkedin.onClick
                                : ( e ) => linkedinSharingEvent( pageDetails )
                        }
                        >
                            <i className="bi-linkedin" aria-hidden="true"></i>
                        </Button>
                }

                {socialMediaActions && socialMediaActions.facebook && socialMediaActions.facebook.display == true &&
                    <Button
                        aria-label="Share this content into Facebook"
                        className="dxSocialShare__button"
                        data-testid="dxSocialShare-facebook"
                        style={checkLightMode( props.size, props.light )}
                        onClick={
                            socialMediaActions.facebook.onClick
                                ? socialMediaActions.facebook.onClick
                                : ( e ) => facebookSharingEvent( pageDetails )
                        }
                        >
                            <i className="bi-facebook" aria-hidden="true"></i>
                        </Button>
                }

                {socialMediaActions && socialMediaActions.twitter && socialMediaActions.twitter.display == true &&

                    <Button
                        aria-label="Share this content into Twitter"
                        className="dxSocialShare__button"
                        data-testid="dxSocialShare-twitter"
                        style={checkLightMode( props.size, props.light )}
                        onClick={
                            socialMediaActions.twitter.onClick
                                ? socialMediaActions.twitter.onClick
                                : ( e ) => twitterSharingEvent( pageDetails )
                        }
                        >
                            <i className="bi-twitter-x" aria-hidden="true"></i>
                        </Button>
                }
            </>
        );
    };

    return (
        <div className='dxSocialShare'>
            {props.size !== "small" && props.title ?
                <p className="dxSocialShare__title" style={checkLightMode( props.size, props.light )}>
                    {props.title}
                </p> : ""}
            <ButtonGroup
                data-testid="dxSocialShare"
                className={getClassName( props.size )}>
                {renderIcons( props.pageDetails, props.socialMediaActions )}
            </ButtonGroup>
        </div>
    );
};

export default DXSocialShare;
