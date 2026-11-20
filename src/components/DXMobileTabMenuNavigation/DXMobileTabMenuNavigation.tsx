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

import "./DXMobileTabMenuNavigation.scss";
import React, { useState } from "react";
import DXButton from "../DXButton/DXButton";
import { ImageProps, getIcon } from "../../utilities";
import { ExtendableProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

interface NavItems {
    title: string,
    icon?: string,
    contentId: string,
    image?: ImageProps,
    contentFunction?: Function;
}
export interface MobileTabMenuNavigationProps {
    items: NavItems[];
    dark?: boolean;
    icons?: {
        close?: string;
    };
}

const DXMobileTabMenuNavigation = ( props: ExtendableProps<MobileTabMenuNavigationProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { items: _items, dark: _dark, icons: _icons, className, ref, ...rest } = props;
    // STATE
    const [active, setActive] = useState( -1 );
    const [showOverlay, setShowOverlay] = useState( false );

    // STYLES LOGIC
    const getStyles = ( isDark: boolean | undefined ) => {
        let stylesObj = `
            .dxMTabMenuNav{
                background-color: ${isDark ? "var(--dark-dark-d2)" : "var(--light-white)"}
            }
            .dxMTabMenuNav__overlayWrapper{
                background-color: ${isDark ? "var(--secondary-secondary-l3)" : "var(--light-light)"};
            }
            .dxMTabMenuNav__overlayHeader{
                background-color: ${isDark ? "var(--secondary-secondary)" : "var(--primary-primary)"};
            }
        `;
        return stylesObj;
    };

    const getLinePosition = ( index: number ) => {
        let styles: { [k: string]: any; } = {};
        if ( props.items.length === 1 ) {
            if ( index === 0 ) {
                styles["left"] = "43%";
            } else {
                styles["display"] = "none";
            }
        } else if ( props.items.length === 2 ) {
            switch ( index ) {
                case 0:
                    styles["left"] = "18%";
                    break;
                case 1:
                    styles["left"] = "68%";
                    break;
                default:
                    styles["display"] = "none";
                    break;
            }
        } else if ( props.items.length === 3 ) {
            switch ( index ) {
                case 0:
                    styles["left"] = "9%";
                    break;
                case 1:
                    styles["left"] = "43%";
                    break;
                case 2:
                    styles["left"] = "76%";
                    break;
                default:
                    styles["display"] = "none";
                    break;
            }
        } else if ( props.items.length === 4 ) {
            switch ( index ) {
                case 0:
                    styles["left"] = "5%";
                    break;
                case 1:
                    styles["left"] = "31%";
                    break;
                case 2:
                    styles["left"] = "56%";
                    break;
                case 3:
                    styles["left"] = "81%";
                    break;
                default:
                    styles["display"] = "none";
                    break;
            }
        } else if ( props.items.length === 5 ) {
            switch ( index ) {
                case 0:
                    styles["left"] = "3%";
                    break;
                case 1:
                    styles["left"] = "24%";
                    break;
                case 2:
                    styles["left"] = "43%";
                    break;
                case 3:
                    styles["left"] = "63%";
                    break;
                case 4:
                    styles["left"] = "83%";
                    break;
                default:
                    styles["display"] = "none";
                    break;
            }
        }
        return styles;
    };

    // HANDLERS
    const handleClick = ( index: number ) => {
        setShowOverlay( true );
        let overlay = document.querySelector( `#overlay-${index} .dxMTabMenuNav__overlayBody` );
        if ( overlay?.childNodes.length === 0 ) {
            let insideOverlay = document.querySelector( props.items[index].contentId ) as HTMLElement;
            if ( insideOverlay !== null ) {
                props.items[index].contentFunction?.();
                overlay?.appendChild( insideOverlay );
            }
        }
        setActive( index );
    };

    const handleOverlayClose = () => {
        setActive( -1 );
        setShowOverlay( false );
    };

    // RENDERS
    const renderItems = ( items: NavItems[] ) => (
        <div className="dxMTabMenuNav__buttonsContainer d-flex justify-content-around">
            {items.slice( 0, 5 ).map( ( item: NavItems, index: number ) => (
                !item.image ? (
                    <div className="dxMTabMenuNav__navItem d-flex justify-content-center align-items-center" key={index} data-testid="mobile-tab-menu-item">
                        <DXButton
                            label={item.title}
                            hideLabel
                            displayType="unstyled"
                            className={props.dark ?
                                `dxMTabMenuNav__btnDark ${active == index ? "dxMTabMenuNav__btnDark--active" : ""}` :
                                `${active == index ? "dxMTabMenuNav__btnLight--active" : ""} dxMTabMenuNav__btnLight`}
                            onClick={() => handleClick( index )}
                            icon={{
                                class: item.icon!
                            }} />
                    </div>
                ) : (
                    <div className="dxMTabMenuNav__navItemImg d-flex justify-content-center align-items-center" key={index} data-testid="mobile-tab-menu-item">
                        {/* Do not remove because that helps to the image to stay circle */}
                        <div>
                            <input
                                className="dxMTabMenuNav__imgBtn"
                                type="image"
                                src={item.image.url}
                                alt={item.image.altText ? item.image.altText : "Mobile Tab Menu Navigation Image - " + index}
                                onClick={() => handleClick( index )} />
                        </div>
                    </div>
                )
            ) )}
        </div>
    );

    const renderOverlays = ( items: NavItems[] ) => {
        return items.slice( 0, 5 ).map( ( item: NavItems, index: number ) => (
            <div className={active === index ? "d-block" : "d-none"} id={`overlay-${index}`} data-testid="mobile-tab-menu-overlay-item" key={index}>
                <div className="dxMTabMenuNav__overlayHeader d-flex justify-content-center align-items-center position-relative">
                    <p data-testid="mobile-tab-menu-overlay-header">{item.title}</p>
                    <DXButton
                        displayType="unstyled"
                        label="close-overlay"
                        hideLabel
                        onClick={handleOverlayClose}
                        data-testid="mobile-tab-menu-overlay-close"
                        icon={{
                            class: getIcon( props.icons, "close", "ci-Close_MD" )
                        }} />
                </div >
                <div className="dxMTabMenuNav__overlayBody"></div>
            </div >
        ) );
    };

    return (
        <div {...rest} ref={ref} className={classNames( "dxMTabMenuNav", className )}>
            <div className={showOverlay ? "dxMTabMenuNav__overlayWrapper" : "dxMTabMenuNav__overlayWrapper--hide"}
                data-testid="mobile-tab-menu-overlay">
                {renderOverlays( props.items )}
            </div>
            <style>{getStyles( props.dark )}</style>
            <div className="dxMTabMenuNav__nav">
                {renderItems( props.items )}
                <div className={props.dark ? "dxMTabMenuNav__lineDark" : "dxMTabMenuNav__lineLight"}
                    style={getLinePosition( active )}
                    data-testid="mobile-tab-menu-line"></div>
            </div>
        </div>
    );
};

export default DXMobileTabMenuNavigation;
