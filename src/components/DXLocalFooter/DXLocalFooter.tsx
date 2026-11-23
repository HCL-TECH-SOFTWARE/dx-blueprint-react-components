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

import "./DXLocalFooter.scss";
import { LinksProps, getLinkTarget, getLinkIcon, ImageProps } from "../../utilities";
import React, { useEffect, useRef } from 'react';
import DXEmptyState from "../DXEmptyState";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface FooterInfo {
    section: string;
    address: string;
    phone: string;
    links?: LinksProps[];
}

export interface FooterSection {
    name: string;
    links: LinksProps[];
}

interface BackgroundImageProps {
    url: string;
    repeat?: string;
    size?: string;
}

export interface LocalFooterProps {
    logo?: ImageProps,
    logoMobile?: ImageProps,
    info?: FooterInfo,
    sections: FooterSection[],
    backgroundColor?: string,
    backgroundImageRight?: BackgroundImageProps,
    backgroundImageLeft?: BackgroundImageProps,
}

const DXLocalFooter = ( props: ExtendableProps<LocalFooterProps, "section"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { logo: _logo, logoMobile: _logoMobile, info: _info, sections: _sections, backgroundColor: _backgroundColor, backgroundImageRight: _backgroundImageRight, backgroundImageLeft: _backgroundImageLeft, className, ref, ...rest } = props;

    const backgroundRef = useRef<HTMLDivElement>( null );
    const leftImgRef = useRef<HTMLDivElement>( null );
    const rightImgRef = useRef<HTMLDivElement>( null );

    const applyBackgroundColor = () => {
        if ( backgroundRef.current && backgroundRef.current !== null ) {
            if ( props.backgroundColor ) {
                const background = backgroundRef.current;
                background.style.backgroundColor = props.backgroundColor;
            }
        }
        return;
    };
    const applyBackgroundImg = () => {
        if ( rightImgRef.current && rightImgRef !== null ) {
            const container = rightImgRef.current;
            if ( props.backgroundImageRight ) {
                container.style.backgroundImage = `url('${props.backgroundImageRight.url}')`;
                container.style.backgroundSize = props.backgroundImageRight.size ? props.backgroundImageRight.size : "100% auto";
                container.style.backgroundRepeat = props.backgroundImageRight.repeat ? props.backgroundImageRight.repeat : "no-repeat";
            } else {
                container.style.backgroundImage = "none";
            }
        }
        if ( leftImgRef.current && leftImgRef !== null ) {
            const container = leftImgRef.current;
            if ( props.backgroundImageLeft ) {
                container.style.backgroundImage = `url('${props.backgroundImageLeft.url}')`;
                container.style.backgroundSize = props.backgroundImageLeft.size ? props.backgroundImageLeft.size : "100% auto";
                container.style.backgroundRepeat = props.backgroundImageLeft.repeat ? props.backgroundImageLeft.repeat : "no-repeat";
            } else {
                container.style.backgroundImage = "none";
            }
        }
    };

    useEffect( () => {
        applyBackgroundColor();
        applyBackgroundImg();
    }, [props.backgroundColor, props.backgroundImageRight, props.backgroundImageLeft] );

    const renderTitle = () => {
        return (
            <div className="dxLocalFooter__titleContainer">
                <div className="dxLocalFooter__titleLogo">
                    {props.logo &&
                        <img src={props.logo.url}
                            className={props.logoMobile ? "d-none d-sm-none d-md-block" : "d-block"}
                            alt={props.logo.altText ? props.logo.altText : "local-footer-logo"}
                            data-testid="local-logo-test" />
                    }
                    {props.logoMobile &&
                        <img src={props.logoMobile.url}
                            className="d-block d-sm-block d-md-none"
                            alt={props.logoMobile.altText ? props.logoMobile.altText : "local-footer-logo-mobile"}
                            data-testid="local-logo-mobile-test" />
                    }
                </div>
            </div>
        );
    };

    const renderInfo = () => {
        if ( props.info ) {
            return (
                <div className="dxLocalFooter__links" data-testid="info">
                    <h5 className="dxLocalFooter__linkSection">{props.info.section}</h5>
                    <div className="dxLocalFooter__linkInfo">
                        <p className="dxLocalFooter__linkItem">{props.info.address}</p>
                        <p className="dxLocalFooter__linkItem">
                            <label htmlFor="phone">Phone:</label> {props.info.phone}
                        </p>
                    </div>
                    <ul>
                        {
                            props.info.links && props.info.links?.length > 0 &&
                            props.info.links?.map( ( link, index ) => (
                                <li key={index}>
                                    <p className="dxLocalFooter__externalLink">
                                        <a href={link.url}
                                            target={getLinkTarget( link.target )} data-testid="info-links">
                                            {link.label}
                                            <i className="ci-External_Link"></i>
                                        </a>
                                    </p>
                                </li>
                            ) )
                        }
                    </ul>
                </div>
            );
        }
    };

    const renderSections = () => {
        if ( props.sections && props.sections.length > 0 ) {
            return props.sections.map( ( section, parentIndex ) => (
                <div className="dxLocalFooter__links" data-testid="section" key={parentIndex}>
                    <h5 className="dxLocalFooter__linkSection">{section.name}</h5>
                    <ul>
                        {
                            section.links.length > 0 ?
                                section.links.map( ( link, childIndex ) => (
                                    <li className="dxLocalFooter__linkItem" key={`${parentIndex}-${childIndex}`}>
                                        <p>
                                            <a href={link.url} target={getLinkTarget( link.target )}
                                                data-testid="section-links">
                                                {link.label}
                                                {getLinkIcon( getLinkTarget( link.target ) )}
                                            </a>
                                        </p>
                                    </li>
                                ) ) : <DXEmptyState title={"There are no links to display"} />
                        }
                    </ul>
                </div>
            ) );
        } else {
            return (
                <DXEmptyState title={"There are no sections to display"} />
            );
        }
    };
    return (
        <section {...pickDomProps( rest )} ref={ref} className={classNames( "dxLocalFooter", className )}>
            <div className="dxLocalFooter__background" ref={backgroundRef} data-testid="local-footer-dark-layer">
                <div className="dxLocalFooter__backgroundLeft" id="footer-background-image-left" ref={leftImgRef}></div>
                <div className="dxLocalFooter__backgroundRight" id="footer-background-image-right" ref={rightImgRef}></div>
            </div>
            <div className="dxLocalFooter__content">
                {props.logo &&
                    <div className="dxLocalFooter__title">
                        {renderTitle()}
                    </div>
                }
                <div className="dxLocalFooter__container">
                    {renderInfo()}
                    {renderSections()}
                </div>
            </div>
        </section>
    );
};

export default DXLocalFooter;
