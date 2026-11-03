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
import { LinksProps, getLinkTarget, getLinkIcon, IconButtonProps, getVideoFormat, getIcon } from "../../utilities";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";
import DXButton, { DisplayType } from "../DXButton/DXButton";
import "./DXHeroBannerOverlay.scss";

export interface HeroBannerOverlayProps extends BasicComponent {
    index: number;
    header: string;
    subheader?: string;
    body?: string;
    textAlign?: string;
    textColor?: string;
    background?: BackgroundProps;
    media?: MediaProps;
    overlayImage?: string,
    foreground?: ShapeProps;
    buttons?: IconButtonProps[];
    link?: LinksProps;
    icons?: {
        link?: string;
    };
}

export interface BackgroundProps {
    color?: "primary" | "secondary";
    heightDesktop?: string;
    heightMobile?: string;
    paddingTop?: string;
    paddingBottom?: string;
}

export interface MediaProps {
    isVideo?: boolean;
    url?: string;
    opacity?: "light" | "dark";
    marginLeft?: string;
    marginRight?: string;
}

export interface ShapeProps {
    image: string;
    alt?: string;
    alignment?: string;
}

const DXHeroBannerOverlay = ( props: HeroBannerOverlayProps ) => {
    const DEFAULT_DESKTOP_HEIGHT = "450px";
    const DEFAULT_MOBILE_HEIGHT = "520px";
    const spacingRegex = /^((\d+(\.\d)?(px|em|rem|%|ch|cm|in|pc|pt|mm|ex))|(inherit|initial|revert|revert-layer|unset))$/i;
    const dimensionsRegex = /^((\d+(\.\d)?(px|em|rem|%|ch|cm|in|pc|pt|mm|ex))|(none|max-content|min-content|inherit|initial|revert|revert-layer|unset|fit-content\((\d+(\.\d)?(px|em|rem|%|ch|cm|in|pc|pt|mm|ex))\)))$/i;
    const FAILSAFE_IMAGE_BASE64 = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDE5MjAgNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjREREREREIi8+PHBhdGggZmlsbD0iIzk5OTk5OSIgZD0iTTQ2NS45NTUgMzYwLjUyNWgyOS4yNXYyMC44MWgtOTB2LTIwLjgxaDMyLjk3di05NC44NHEwLTUuNjMuMzMtMTEuNTlsLTIzLjQgMTkuNThxLTIuMDIgMS41Ny0zLjk5IDEuOTctMS45Ny4zOS0zLjcxLjA1LTEuNzUtLjM0LTMuMS0xLjE4dC0yLjAyLTEuODVsLTguNzgtMTIuMDQgNDkuNjItNDIuMTloMjIuODN6bTgwLjQ0LTkzLjA0cTAgMTMuNjEgNy4wMyAyMC43NiA3LjAzIDcuMTQgMTkuOTcgNy4xNCA2Ljc1IDAgMTIuMDQtMi4xNHQ4Ljg5LTUuODUgNS40NS04Ljc3cTEuODYtNS4wNyAxLjg2LTEwLjkyIDAtNi42My0yLjAzLTExLjg2LTIuMDItNS4yMy01LjczLTguODQtMy43Mi0zLjYtOC44NC01LjUxLTUuMTEtMS45MS0xMS4xOS0xLjkxLTYuMyAwLTExLjM2IDIuMDh0LTguNjYgNS43OXEtMy42IDMuNzItNS41MiA4Ljg0LTEuOTEgNS4xMi0xLjkxIDExLjE5bS0xMy42MSAxMTMuODUgNTAuNTEtNjMuMTFxMS45MS0yLjM3IDMuNi00LjYydDMuMjYtNC41cS01LjYyIDMuNi0xMi4zNyA1LjQ2dC0xNC4xOCAxLjg2cS04LjQzIDAtMTYuNTMtMi45My04LjEtMi45Mi0xNC40LTguODN0LTEwLjE5LTE0LjYycS0zLjg4LTguNzItMy44OC0yMC40MiAwLTEwLjkyIDQuMDUtMjAuNDh0MTEuMzctMTYuNzZxNy4zMS03LjIgMTcuNTUtMTEuMzYgMTAuMjMtNC4xNiAyMi42MS00LjE2IDEyLjQ5IDAgMjIuNDQgMy45MyA5Ljk2IDMuOTQgMTYuOTkgMTEuMDMgNy4wMyA3LjA4IDEwLjggMTYuOTh0My43NyAyMS43MnEwIDcuNTMtMS4zIDE0LjI4LTEuMjkgNi43NS0zLjY1IDEzLTIuMzYgNi4yNC01Ljc0IDEyLjItMy4zNyA1Ljk3LTcuNTQgMTEuODJsLTM3LjIzIDUzLjFxLTEuOTIgMi43LTUuNzQgNC41NS0zLjgzIDEuODYtOC42NiAxLjg2em0xNzUuNjEtMjUuODhoNDEuNzRxNC41IDAgNy4xNCAyLjU0IDIuNjUgMi41MyAyLjY1IDYuNjl2MTYuNjVoLTExMS42di05LjIycTAtMi44MiAxLjE4LTUuOTEgMS4xOC0zLjEgMy43Ny01LjU3bDQ5LjM4LTQ5LjVxNi4xOS02LjMgMTEuMDgtMTIuMDQgNC45LTUuNzQgOC4xNi0xMS4zNiAzLjI2LTUuNjMgNS4wMS0xMS40MiAxLjc0LTUuNzkgMS43NC0xMi4yMSAwLTUuODUtMS42OS0xMC4yOS0xLjY4LTQuNDQtNC43OC03LjQ4LTMuMDktMy4wNC03LjQyLTQuNTZ0LTkuNzMtMS41MnEtNC45NSAwLTkuMTcgMS40MXQtNy40OCAzLjk0cS0zLjI3IDIuNTMtNS41MiA1LjktMi4yNSAzLjM4LTMuMzcgNy40My0xLjkxIDUuMTctNC45NSA2Ljg2dC04Ljc4Ljc5bC0xNC42Mi0yLjU5cTEuNjktMTEuNyA2LjUyLTIwLjUzIDQuODQtOC44MyAxMi4xLTE0Ljc0IDcuMjUtNS45IDE2LjY1LTguODggOS4zOS0yLjk4IDIwLjE5LTIuOTggMTEuMjUgMCAyMC41OSAzLjMxIDkuMzQgMy4zMiAxNS45NyA5LjQgNi42NCA2LjA3IDEwLjM1IDE0LjYyIDMuNzIgOC41NSAzLjcyIDE5LjAxIDAgOS0yLjY1IDE2LjY1LTIuNjQgNy42NS03LjA5IDE0LjYzLTQuNDQgNi45Ny0xMC40IDEzLjUtNS45NiA2LjUyLTEyLjQ5IDEzLjI3bC0zNi42NyAzNy40N3E1LjI4LTEuNTggMTAuNTEtMi40MiA1LjI0LS44NSA5Ljk2LS44NW0xODYuNzUtNTUuNDZxMCAyMS4yNi00LjU2IDM2Ljk2LTQuNTUgMTUuNjktMTIuNiAyNS45My04LjA0IDEwLjI0LTE5LjAxIDE1LjI0LTEwLjk3IDUuMDEtMjMuNjggNS4wMXQtMjMuNTctNS4wMXEtMTAuODUtNS0xOC44NC0xNS4yNHQtMTIuNDktMjUuOTNxLTQuNS0xNS43LTQuNS0zNi45NiAwLTIxLjM3IDQuNS0zNy4wMXQxMi40OS0yNS44N3E3Ljk5LTEwLjI0IDE4Ljg0LTE1LjI1IDEwLjg2LTUgMjMuNTctNXQyMy42OCA1cTEwLjk3IDUuMDEgMTkuMDEgMTUuMjUgOC4wNSAxMC4yMyAxMi42IDI1Ljg3IDQuNTYgMTUuNjQgNC41NiAzNy4wMW0tMjguNjkgMHEwLTE3LjY2LTIuNTgtMjkuMjUtMi41OS0xMS41OC02LjkyLTE4LjQ1LTQuMzMtNi44Ni05Ljk2LTkuNjItNS42Mi0yLjc1LTExLjctMi43NS01Ljk2IDAtMTEuNTMgMi43NS01LjU3IDIuNzYtOS44NCA5LjYyLTQuMjggNi44Ny02LjgxIDE4LjQ1LTIuNTMgMTEuNTktMi41MyAyOS4yNXQyLjUzIDI5LjI1IDYuODEgMTguNDVxNC4yNyA2Ljg2IDkuODQgOS42MnQxMS41MyAyLjc2cTYuMDggMCAxMS43LTIuNzYgNS42My0yLjc2IDkuOTYtOS42MnQ2LjkyLTE4LjQ1cTIuNTgtMTEuNTkgMi41OC0yOS4yNW0yMDcuMzQgNDQuMS0xNC43NCAxNC41MS0zOC4xMy0zOC4xMy0zOC40OCAzOC4zNi0xNC43NC0xNC41MSAzOC40OC0zOC41OS0zNi42OC0zNi42OCAxNC42My0xNC42MiAzNi42NyAzNi42NyAzNi40NS0zNi40NCAxNC44NSAxNC42Mi0zNi41NiAzNi41NnptMTczLjgxLTEyNS40NC00OC4yNiA1OS4wNy01LjYyIDYuOTdxNC43Mi0yLjM2IDEwLjE4LTMuNjUgNS40NS0xLjMgMTEuNzUtMS4zIDkuMjMgMCAxNy45NSAzLjA0dDE1LjM1IDkuMTdxNi42NCA2LjEzIDEwLjY5IDE1LjI0dDQuMDUgMjEuMjZxMCAxMS4zNy00LjE2IDIxLjMyLTQuMTYgOS45Ni0xMS43IDE3LjM4LTcuNTQgNy40My0xOC4xNyAxMS43LTEwLjYzIDQuMjgtMjMuNDYgNC4yOC0xMy4wNSAwLTIzLjQtNC4xNi0xMC4zNS00LjE3LTE3LjY2LTExLjY1dC0xMS4xOS0xOHEtMy44OC0xMC41MS0zLjg4LTIzLjM0IDAtMTEuNDggNC42Ni0yMy41NyA0LjY3LTEyLjA5IDE0LjQ2LTI1LjE0bDM4LjgxLTUyLjA5cTIuMDMtMi43IDUuOTEtNC42MSAzLjg4LTEuOTIgOC45NC0xLjkyem0tNDEuOTYgMTQxLjc1cTYuNjQgMCAxMi4yMS0yLjI1dDkuNTYtNi4zcTMuOTktNC4wNCA2LjI0LTkuNXQyLjI1LTExLjg3cTAtNi45OC0yLjEzLTEyLjU0LTIuMTQtNS41Ny02LjA4LTkuNDUtMy45NC0zLjg5LTkuNDUtNS45MS01LjUxLTIuMDMtMTIuMTUtMi4wM3QtMTIuMDQgMi4yNS05LjIyIDYuMjVxLTMuODMgMy45OS01Ljk2IDkuNDUtMi4xNCA1LjQ1LTIuMTQgMTEuNzUgMCA2Ljc1IDEuODUgMTIuMzIgMS44NiA1LjU3IDUuNTIgOS41MSAzLjY1IDMuOTQgOS4wNSA2LjEzdDEyLjQ5IDIuMTltMTkwLjM1LTYwLjQxcTAgMjEuMjYtNC41NiAzNi45Ni00LjU1IDE1LjY5LTEyLjYgMjUuOTMtOC4wNCAxMC4yNC0xOS4wMSAxNS4yNC0xMC45NyA1LjAxLTIzLjY4IDUuMDF0LTIzLjU3LTUuMDFxLTEwLjg1LTUtMTguODQtMTUuMjR0LTEyLjQ5LTI1LjkzcS00LjUtMTUuNy00LjUtMzYuOTYgMC0yMS4zNyA0LjUtMzcuMDF0MTIuNDktMjUuODdxNy45OS0xMC4yNCAxOC44NC0xNS4yNSAxMC44Ni01IDIzLjU3LTV0MjMuNjggNXExMC45NyA1LjAxIDE5LjAxIDE1LjI1IDguMDUgMTAuMjMgMTIuNiAyNS44NyA0LjU2IDE1LjY0IDQuNTYgMzcuMDFtLTI4LjY5IDBxMC0xNy42Ni0yLjU4LTI5LjI1LTIuNTktMTEuNTgtNi45Mi0xOC40NS00LjMzLTYuODYtOS45Ni05LjYyLTUuNjItMi43NS0xMS43LTIuNzUtNS45NiAwLTExLjUzIDIuNzUtNS41NyAyLjc2LTkuODQgOS42Mi00LjI4IDYuODctNi44MSAxOC40NS0yLjUzIDExLjU5LTIuNTMgMjkuMjV0Mi41MyAyOS4yNSA2LjgxIDE4LjQ1cTQuMjcgNi44NiA5Ljg0IDkuNjJ0MTEuNTMgMi43NnE2LjA4IDAgMTEuNy0yLjc2IDUuNjMtMi43NiA5Ljk2LTkuNjJ0Ni45Mi0xOC40NXEyLjU4LTExLjU5IDIuNTgtMjkuMjVtMTU5LjE5IDBxMCAyMS4yNi00LjU2IDM2Ljk2LTQuNTUgMTUuNjktMTIuNiAyNS45My04LjA0IDEwLjI0LTE5LjAxIDE1LjI0LTEwLjk3IDUuMDEtMjMuNjggNS4wMXQtMjMuNTctNS4wMXEtMTAuODUtNS0xOC44NC0xNS4yNHQtMTIuNDktMjUuOTNxLTQuNS0xNS43LTQuNS0zNi45NiAwLTIxLjM3IDQuNS0zNy4wMXQxMi40OS0yNS44N3E3Ljk5LTEwLjI0IDE4Ljg0LTE1LjI1IDEwLjg2LTUgMjMuNTctNXQyMy42OCA1cTEwLjk3IDUuMDEgMTkuMDEgMTUuMjUgOC4wNSAxMC4yMyAxMi42IDI1Ljg3IDQuNTYgMTUuNjQgNC41NiAzNy4wMW0tMjguNjkgMHEwLTE3LjY2LTIuNTgtMjkuMjUtMi41OS0xMS41OC02LjkyLTE4LjQ1LTQuMzMtNi44Ni05Ljk2LTkuNjItNS42Mi0yLjc1LTExLjctMi43NS01Ljk2IDAtMTEuNTMgMi43NS01LjU3IDIuNzYtOS44NCA5LjYyLTQuMjggNi44Ny02LjgxIDE4LjQ1LTIuNTMgMTEuNTktMi41MyAyOS4yNXQyLjUzIDI5LjI1IDYuODEgMTguNDVxNC4yNyA2Ljg2IDkuODQgOS42MnQxMS41MyAyLjc2cTYuMDggMCAxMS43LTIuNzYgNS42My0yLjc2IDkuOTYtOS42MnQ2LjkyLTE4LjQ1cTIuNTgtMTEuNTkgMi41OC0yOS4yNSIvPjwvc3ZnPg==";


    const getButtonAlign = () => {
        let styles: { [k: string]: any; } = {};
        switch ( props.textAlign ) {
            case "center":
                styles = {
                    justifyContent: "center"
                };
                break;
            case "right":
                styles = {
                    justifyContent: "flex-end"
                };
                break;
            case "left":
            default:
                styles = {
                    justifyContent: "flex-start"
                };
                break;
        }

        return styles;
    };

    const getBodyStyles = () => {
        let styles: { [k: string]: any; } = {};
        switch ( props.textAlign ) {
            case "center":
                styles = {
                    textAlign: "center",
                    marginLeft: "auto",
                    marginRight: "auto"
                };
                break;
            case "right":
                styles = {
                    textAlign: "right",
                    right: "0",
                };
                break;
            case "left":
            default:
                styles = {
                    textAlign: "left"
                };
                break;
        }

        if ( props.textColor ) {
            styles["color"] = props.textColor;
        }

        return styles;
    };

    const getForegroundImageStyles = () => {
        let styles: { [k: string]: any; } = {};
        if ( props.foreground?.alignment == "left" ) {
            styles["left"] = 0;
        } else if ( props.foreground?.alignment == "right" ) {
            styles["right"] = 0;
        } else {
            styles["right"] = 0;
        }
        return styles;
    };

    const getComponentStyles = () => {
        let componentStyles: { [k: string]: any; } = {
            backgroundImage: "linear-gradient(var(--primary-primary), transparent)"
        };

        if ( props.background && props.background.paddingTop ) {
            let paddingTop: string = spacingRegex.test( props.background.paddingTop.trim() ) ? props.background.paddingTop.trim() : "0";
            componentStyles["paddingTop"] = paddingTop;
        }

        if ( props.background && props.background?.paddingBottom ) {
            let paddingBottom: string = spacingRegex.test( props.background?.paddingBottom.trim() ) ? props.background?.paddingBottom.trim() : "0";
            componentStyles["paddingBottom"] = paddingBottom;
        }

        if ( props.background && props.background?.color && props.background.color === "secondary" ) {
            componentStyles["backgroundImage"] = "linear-gradient(var(--secondary-secondary), transparent)";
        }

        return componentStyles;
    };

    const getBackgroundMediaStyles = () => {
        let verifiedHeightDesktop: string = DEFAULT_DESKTOP_HEIGHT;
        let verifiedHeightMobile: string = DEFAULT_MOBILE_HEIGHT;
        let opacity: string = "var(--white)";
        let marginLeft: string = "0";
        let marginRight: string = "0";

        if ( props.background ) {
            if ( props.background.heightDesktop ) {
                verifiedHeightDesktop = dimensionsRegex.test( props.background.heightDesktop.trim() ) ? props.background.heightDesktop.trim() : DEFAULT_DESKTOP_HEIGHT;
            }
            if ( props.background.heightMobile ) {
                verifiedHeightMobile = dimensionsRegex.test( props.background.heightMobile.trim() ) ? props.background.heightMobile.trim() : DEFAULT_MOBILE_HEIGHT;
            }
        }

        if ( props.media ) {
            if ( props.media.opacity && props.media.opacity === "dark" ) {
                opacity = "var(--dark-dark)";
            }

            if ( props.media.marginLeft ) {
                marginLeft = spacingRegex.test( props.media.marginLeft.trim() ) ? props.media.marginLeft.trim() : "0";
            }

            if ( props.media.marginRight ) {
                marginRight = spacingRegex.test( props.media.marginRight.trim() ) ? props.media.marginRight.trim() : "0";
            }
        }

        return `
          #dxHBOverlay-${props.index} .dxHBOverlay__container {
            max-width: 98%;
            margin-left: ${marginLeft};
            margin-right: ${marginRight};
          }

          #dxHBOverlay-${props.index} .dxHBOverlay__container,
          #dxHBOverlay-${props.index} .dxHBOverlay__opacityFilter,
          #dxHBOverlay-${props.index} .dxHBOverlay__container .dxHBOverlay__opacityFilter .dxHBOverlay__backgroundMedia,
          #dxHBOverlay-${props.index} .dxHBOverlay__container .dxHBOverlay__opacityFilter .dxHBOverlay__gradient {
            max-height: ${verifiedHeightDesktop};
          }

          @media (max-width: 767px) {
            #dxHBOverlay-${props.index} .dxHBOverlay__container,
            #dxHBOverlay-${props.index} .dxHBOverlay__opacityFilter,
            #dxHBOverlay-${props.index} .dxHBOverlay__container .dxHBOverlay__opacityFilter .dxHBOverlay__backgroundMedia,
            #dxHBOverlay-${props.index} .dxHBOverlay__container .dxHBOverlay__opacityFilter .dxHBOverlay__gradient {
              max-height: ${verifiedHeightMobile};
            }
          }

          #dxHBOverlay-${props.index} .dxHBOverlay__opacityFilter {
            background-color: ${opacity};
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
        return getVideoFormat( url, "dxHBOverlay__backgroundMedia", "hb-overlay-bg-media", videoRef );
    };
    const renderButtons = ( propsButtons: IconButtonProps[] ) => {
        const buttons = [];
        if ( propsButtons[0] ) {
            let firstBtn = {
                ...propsButtons[0],
                displayType: "primary" as DisplayType,
                className: "dxHBOverlay__button"
            };
            buttons.push( <DXButton {...firstBtn} key={0} /> );
        }
        if ( propsButtons[1] ) {
            let secondBtn = {
                ...propsButtons[1],
                displayType: "primary" as DisplayType,
                className: "dxHBOverlay__button"
            };
            buttons.push( <DXButton {...secondBtn} key={1} /> );
        }
        return buttons;
    };

    return (
        <div className="dxHBOverlay" id={`dxHBOverlay-${props.index}`} data-testid="hb-overlay" style={getComponentStyles()}>
            <style>{getBackgroundMediaStyles()}</style>
            {props.overlayImage &&
                <img className="dxHBOverlay__overlayImage" role="presentation" data-testid="hb-overlay-img-overlay" src={props.overlayImage}></img>
            }
            <div className="dxHBOverlay__container" data-testid="hb-overlay-container">
                <div className="dxHBOverlay__opacityFilter" data-testid="hb-overlay-opacityFilter">
                    {
                        props.media && props.media.url ?
                            props.media.isVideo ?
                                renderVideo( props.media.url )
                                :
                                <img className="dxHBOverlay__backgroundMedia" role="presentation" data-testid="hb-overlay-bg-media" src={props.media.url}></img>
                            :
                            <img className="dxHBOverlay__backgroundMedia" data-testid="hb-overlay-bg-media" src={`data:image/svg+xml;base64,${FAILSAFE_IMAGE_BASE64}`}></img>
                    }
                    {
                        props.media?.isVideo ? (
                            <div className="dxHBOverlay__gradient"></div>
                        ) : null
                    }
                </div>
                <div className="dxHBOverlay__body" data-testid="hb-overlay-body" style={getBodyStyles()}>
                    <h2>{props.header}</h2>
                    {
                        props.subheader &&
                        <h3>{props.subheader}</h3>
                    }
                    {
                        props.body &&
                        <p>{props.body}</p>
                    }
                    {
                        props.buttons &&
                        <div className="dxHBOverlay__buttonContainer" style={getButtonAlign()}>
                            {renderButtons( props.buttons )}
                        </div>
                    }
                    {
                        props.link &&
                        <div className="dxHBOverlay__link">
                            <a href={props.link.url} target={getLinkTarget( props.link.target )}>
                                {props.link.label}
                                {
                                    props.link.target === "_blank" ?
                                        getLinkIcon( props.link.target ) :
                                        <i data-testid="HBO_icon" className={getIcon( props.icons, "link", "ci-Arrow_Right_LG" )}></i>
                                }
                            </a>
                        </div>
                    }

                </div>
            </div>
            {
                props.foreground &&
                <img className="dxHBOverlay__foregroundImage" data-testid="hb-overlay-foreground-img"
                    src={props.foreground.image}
                    alt={props.foreground.alt ? props.foreground.alt : 'Hero banner overlay foreground image'}
                    style={getForegroundImageStyles()}
                ></img>
            }
            {props._edit && renderEditButton( props._edit )}
        </div>

    );
};

export default DXHeroBannerOverlay;
