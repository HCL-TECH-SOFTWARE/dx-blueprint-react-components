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

import "./DXLinkList.scss";
import { LinksProps, getLinkTarget, getLinkIcon, LinkIconProps, generateLinkIcon } from "../../utilities";
import React, { useState, useEffect } from 'react';
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";

export interface LinkListProps extends BasicComponent {
    title: {
        value: string,
        type: string,
        cta?: LinkIconProps;
    };
    links: LinksProps[];
    elementsPerRow?: number;
    maxLimitDesktop?: number;
    maxLimitMobile?: number;
}

const DXLinkList = ( props: LinkListProps ) => {
    // - States
    const [mobile, setMobile] = useState( false );
    const DEFAULT_ELEMENTS_PER_ROW = 3;
    const DEFAULT_LIMIT_DESKTOP = 8;
    const DEFAULT_LIMIT_MOBILE = 8;
    const MAX_WIDTH_CONTAINER = 576;

    const setTitleType = ( type: string ) => {
        if ( type === "semibold" ) { return "semibold"; }
        if ( type === "bold" ) { return "bold"; }
        return "semibold";
    };

    const validateMobile = function () {
        window.innerWidth <= MAX_WIDTH_CONTAINER ? setMobile( true ) : setMobile( false );
    };

    useEffect( () => {
        validateMobile();
        window.addEventListener( "resize", validateMobile );
        return function unmountComponent() {
            window.removeEventListener( "resize", validateMobile );
        };
    }, [props] );

    const setLimit = ( links: LinksProps[], isMobile: boolean, elementsPerRow?: number ) => {
        let items: LinksProps[] = [];
        if ( elementsPerRow ) {
            if ( !isMobile ) {
                if ( props.maxLimitDesktop || props.maxLimitDesktop === 0 ) {
                    let end = props.maxLimitDesktop === 0 ? links.length : ( elementsPerRow * props.maxLimitDesktop );
                    items = links.slice( 0, end );
                } else {
                    items = links.slice( 0, elementsPerRow * DEFAULT_LIMIT_DESKTOP );
                }
            } else {
                if ( props.maxLimitMobile || props.maxLimitMobile === 0 ) {
                    let end = props.maxLimitMobile <= 0 ? links.length : props.maxLimitMobile;
                    items = links.slice( 0, end );
                } else {
                    items = links.slice( 0, DEFAULT_LIMIT_MOBILE );
                }
            }
            return items;
        }
        if ( !isMobile ) {
            if ( props.maxLimitDesktop || props.maxLimitDesktop === 0 ) {
                let end = props.maxLimitDesktop <= 0 ? links.length : props.maxLimitDesktop;
                items = links.slice( 0, end );
            } else {
                items = links.slice( 0, DEFAULT_LIMIT_DESKTOP );
            }
        } else {
            if ( props.maxLimitMobile || props.maxLimitMobile === 0 ) {
                let end = props.maxLimitMobile <= 0 ? links.length : props.maxLimitMobile;
                items = links.slice( 0, end );
            } else {
                items = links.slice( 0, DEFAULT_LIMIT_MOBILE );
            }
        }
        return items;
    };

    const renderListLinks = ( links: LinksProps[], isMobile: boolean ) => {
        let items: LinksProps[] = setLimit( links, isMobile );
        return (
            items.map( ( link: LinksProps, index: number ) => (
                <li key={index} className="dxLinkList__link">
                    <p>
                        <a href={link.url} target={getLinkTarget( link.target )} data-testid="listlink-item">
                            {link.label}
                            {getLinkIcon( link.target )}
                        </a>
                    </p>
                </li>
            ) )
        );
    };

    const getColStyles = ( elementsPerRow: number ) => {
        let cols = elementsPerRow && elementsPerRow > 0 && elementsPerRow < 13 ? elementsPerRow : DEFAULT_ELEMENTS_PER_ROW;
        let width = 100 / cols;
        return `
            .dxLinkList__rowItem { width: ${width}%; }
            @media (max-width: 768px) {
                .dxLinkList__rowItem { width: 100%; }
            }
        `;
    };

    const renderColLinks = ( links: LinksProps[], isMobile: boolean, elementsPerRow: number ) => {
        let items: LinksProps[] = setLimit( links, isMobile, elementsPerRow );
        return (
            <div className="dxLinkList__row">
                {items.map( ( link, key ) => (
                    <div key={`${key}`} className="dxLinkList__rowItem">
                        <p>
                            <a href={link.url} target={getLinkTarget( link.target )} data-testid="listlink-item">
                                {link.label}
                                {getLinkIcon( link.target )}
                            </a>
                        </p>
                    </div>
                ) )}
            </div>
        );
    };

    return (
        <div className="dxLinkList">
            <div className="dxLinkList__title">
                <h3
                    className={setTitleType( props.title.type )}
                    data-testid="linklist-title">
                    {props.title.value}
                </h3>
                {props.title.cta ? (
                    generateLinkIcon( props.title.cta, "dxLinkList__cta" )
                ) : null}
            </div>
            {
                props.links && props.links.length > 0 ? (
                    props.elementsPerRow ? (
                        <div className="dxLinkList__grid">
                            <style>{getColStyles( props.elementsPerRow )}</style>
                            {renderColLinks( props.links, mobile, props.elementsPerRow )}
                        </div>
                    ) : (
                        <ul>
                            {renderListLinks( props.links, mobile )}
                        </ul>
                    )
                ) : (
                    <span>There are no links to render</span>
                )
            }
            {props._edit && renderEditButton( props._edit )}
        </div>
    );
};

export default DXLinkList;
