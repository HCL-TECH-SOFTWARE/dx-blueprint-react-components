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
import React, { createRef, useEffect } from "react";
import DXButton, { DisplayType } from "../DXButton/DXButton";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { IconButtonProps, getVideoFormat } from "../../utilities";
import DXCountdownFloater, { CountdownProps } from '../DXCountdownFloater/DXCountdownFloater';
import "./DXBannerStripe.scss";

export interface BannerStripeProps {
    index: number;
    header: string;
    body?: string;
    textPosition?: "right" | "left";
    textColor?: string;
    background?: BackgroundProps;
    foreground?: ForegroundProps;
    buttons?: IconButtonProps[];
    bodyClass?: string;
}

export interface BackgroundProps {
    url?: string;
    gradient?: boolean;
    color?: string;
}

export interface ForegroundProps {
    image?: string;
    video?: string;
    alt?: string;
    countdown?: CountdownProps;
}

const DXBannerStripe = ( props: BannerStripeProps ) => {

    // TODO: Move this to an util
    const hexToRgb = ( colorValue: string ) => {
        // Retrieve the token value from the styles
        if ( colorValue.indexOf( "--" ) >= 0 ) {
            colorValue = getComputedStyle( document.documentElement ).getPropertyValue( colorValue );
        }
        var hex = colorValue.replace( /\s/g, '' );
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );

        return result ?
            parseInt( result[1], 16 ) + ", " + parseInt( result[2], 16 ) + ", " + parseInt( result[3], 16 )
            : null;
    };

    const DEFAULT_BACKGROUND_AND_GRADIENT_COLOR = "--primary-primary";
    const COLOR_GRADIENT_START = "245, 246, 252, 0.52"; //Transparency for gradient
    const BACKGROUND_AND_OVERLAY_COLOR = props.background?.color ? props.background?.color : DEFAULT_BACKGROUND_AND_GRADIENT_COLOR;
    let colorGradientEnd = hexToRgb( BACKGROUND_AND_OVERLAY_COLOR );

    const getMediaVariant = () => {
        let mediaVariant = props.foreground?.video && props.foreground?.video !== "" ? " dxBannerStripe--videoVariant " : "";
        let alignmentVariant = props.textPosition == "right" ? " dxBannerStripe--alignmentRight" : "";

        if ( !props.foreground ) {
            mediaVariant = " dxBannerStripe--defaultVariant";
        }

        mediaVariant = mediaVariant + alignmentVariant;

        return mediaVariant;
    };

    const getBodyStyles = () => {
        let styles: { [k: string]: any; } = {};

        if ( props.textColor ) {
            styles["color"] = props.textColor;
        }

        return styles;
    };

    const getBackgroundMediaStyles = () => {
        let gradientDirection = props.textPosition ? props.textPosition : "left";
        let gradientDirectionMobile = gradientDirection == "left" ? "top" : "bottom";

        let gradient: string = `linear-gradient(to ${gradientDirection}, rgba(${COLOR_GRADIENT_START}), rgba(${colorGradientEnd}) 40%)`;
        let gradientMobile: string = `linear-gradient(to ${gradientDirectionMobile}, rgba(${COLOR_GRADIENT_START}), rgba(${colorGradientEnd}) 69%)`;
        let transparency: string = `linear-gradient(to ${gradientDirection}, rgba(${colorGradientEnd}, 0.8), rgba(${colorGradientEnd}, 0.8))`;

        let backgroundColorSolidDefault;

        if ( BACKGROUND_AND_OVERLAY_COLOR.indexOf( "#" ) >= 0 ) {
            backgroundColorSolidDefault = BACKGROUND_AND_OVERLAY_COLOR;
        } else {
            backgroundColorSolidDefault = `var(${BACKGROUND_AND_OVERLAY_COLOR})`;
        }

        if ( props.background?.gradient == true && props.background.url !== "" && !props.foreground?.video ) {
            return `
                #dxBannerStripe${props.index} .dxBannerStripe__opacityFilter {
                    background: ${gradient}, url(${props.background?.url ? props.background.url : ""});  /* Chrome 10-25, Safari 5.1-6 */
                    background: ${gradient}, url(${props.background?.url ? props.background.url : ""}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                }

                @media (max-width: 767px) {
                    #dxBannerStripe${props.index} .dxBannerStripe__opacityFilter {
                        height: auto;
                        overflow: hidden;
                        background: ${gradientMobile}, url(${props.background?.url ? props.background.url : ""});  /* Chrome 10-25, Safari 5.1-6 */
                        background: ${gradientMobile}, url(${props.background?.url ? props.background.url : ""}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center;
                    }
                }
            `;
        } else {
            if ( props.background?.url && props.background?.url !== "" ) {
                return `
                    #dxBannerStripe${props.index} .dxBannerStripe__opacityFilter {
                        background: ${transparency}, url(${props.background?.url});
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center;
                    }

                    @media (max-width: 767px) {
                        #dxBannerStripe${props.index} .dxBannerStripe__opacityFilter {
                            background: ${transparency}, url(${props.background?.url});
                            height: auto;
                            background-size: cover;
                            background-repeat: no-repeat;
                            background-position: center;
                        }
                    }
                `;
            }
        }

        return `
            #dxBannerStripe${props.index} .dxBannerStripe__opacityFilter {
                background: ${backgroundColorSolidDefault};
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
            }

            @media (max-width: 767px) {
                #dxBannerStripe${props.index} .dxBannerStripe__opacityFilter {
                        height: auto;
                }
            }
        `;
    };

    const getOverlayVideoStyles = () => {
        let directionOverlayVideo = props.textPosition == "right" ? "right" : "left";
        let directionOverlayVideoMobile = props.textPosition == "right" ? "bottom" : "top";

        return `
            #dxBannerStripe${props.index} .dxBannerStripe__videoOverlay {
                background-image: linear-gradient(to ${directionOverlayVideo}, rgba(${COLOR_GRADIENT_START}), rgb(${colorGradientEnd}) 89%);
            }

            @media (max-width: 767px) {
                #dxBannerStripe${props.index} .dxBannerStripe__videoOverlay {
                    background-image: linear-gradient(to ${directionOverlayVideoMobile}, rgba(${COLOR_GRADIENT_START}), rgb(${colorGradientEnd}) 89%);
                }
            }
        `;
    };

    const renderVideo = ( url: string ) => {
        const videoRef = createRef<HTMLVideoElement>();
        // eslint-disable-next-line react-hooks/rules-of-hooks -- renderVideo is only called during render
        useEffect( () => {
            const { current: video } = videoRef;
            video && ( video.muted = true );
        }, [] );
        return (
            <div className="dxBannerStripe__videoMain">
                <style>{getOverlayVideoStyles()}</style>
                <div className="dxBannerStripe__videoOverlay"></div>
                <div className="dxBannerStripe__videoContainer" >
                    {getVideoFormat( url, "dxBannerStripe__videoContainerMedia", "banner-stripe-bg-media", videoRef )}
                </div>
            </div>
        );
    };

    const renderButtons = ( btns: IconButtonProps[] ) => {
        return btns.map( ( btn: IconButtonProps, index ) => {
            let btnProps = {
                ...btn,
                className: "dxBannerStripe__button",
                displayType: "secondary" as DisplayType,
                "data-testid": "bs-button"
            };
            return <DXButton {...btnProps} key={index} />;
        } );
    };

    const renderBody = ( props: BannerStripeProps ) => {
        return (
            <div className="dxBannerStripe__bodyContainer" data-testid="banner-stripe-body" style={getBodyStyles()}>
                <h2 className="dxBannerStripe__header" data-testid="bs-heading">{props.header}</h2>
                {
                    props.body &&
                    <p className="dxBannerStripe__bodyContent" data-testid="bs-body">{props.body}</p>
                }
                {
                    props.buttons && props.buttons.length > 0 &&
                    (
                        <div className="dxBannerStripe__buttonContainer">
                            {renderButtons( props.buttons )}
                        </div>
                    )
                }
            </div>
        );
    };

    const renderForeground = ( props: BannerStripeProps ) => {
        if ( props.foreground && props.foreground.image ) {
            return (
                <div className={"dxBannerStripe__foregroundContainer"}>
                    <img className="dxBannerStripe__foregroundImage" data-testid="bs-foreground-img"
                        src={props.foreground.image}
                        alt={props.foreground.alt ? props.foreground.alt : 'Banner foreground image'}
                    ></img>
                </div>
            );
        } else if ( props.foreground && props.foreground.video && props.foreground.video !== "" ) {
            return ( renderVideo( props.foreground.video ) );
        } else if ( props.foreground && props.foreground.countdown ) {
            return (
                <div className="dxBannerStripe__coutdownFloaterContainer">
                    <DXCountdownFloater {...props.foreground.countdown} />
                </div>
            );
        }

        return null;
    };

    const renderContent = ( props: BannerStripeProps ) => {
        return (
            <div className={`dxBannerStripe__content${props.bodyClass ? ` ${props.bodyClass}` : ""} ${props.textPosition === 'right' ? ` dxBannerStripe__content--reversed` : ""} ${!props.foreground ? "dxBannerStripe__content--noForeground" : ""}`}
                data-testid="banner-stripe-content">
                <Col xs={12} md={8} lg={8} xl={8} key={1}
                    data-testid={`${props.textPosition === 'right' ? "bs-body-right" : "bs-body-left"}`}
                    className="dxBannerStripe__body"> {renderBody( props )}
                </Col>
                {
                    props.foreground &&
                    <Col
                        xs={12} md={4} lg={4} xl={4} key={2}
                        className="dxBannerStripe__foreground"> {renderForeground( props )}
                    </Col>
                }
            </div>
        );
    };

    return (
        <div id={`dxBannerStripe${props.index}`} className={`dxBannerStripe ${getMediaVariant()}`} data-testid="banner-stripe">
            <style>{getBackgroundMediaStyles()}</style>
            <Row className={"dxBannerStripe__opacityFilter"}>
                {renderContent( props )}
            </Row>
        </div>
    );
};

export default DXBannerStripe;
