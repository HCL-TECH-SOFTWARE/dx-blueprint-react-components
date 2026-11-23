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

import React, { ReactElement, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { LinksProps } from "../../utilities";
import "./DXParallaxNavigation.scss";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface ParallaxNavigationProps {
    position?: "right" | "left";
    items: LinkWithIcon[];
}

export interface LinkWithIcon {
    icon: string;
    link: LinksProps;
}

const DXParallaxNavigation = ( props: ExtendableProps<ParallaxNavigationProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { position: _position, items: _items, className, ref, ...rest } = props;

    const [isMobile, setIsMobile] = useState<boolean>( false );
    const widthMobile = 768;
    let componentSize = 0;
    let alignmentVariant = props.position == "right" ? "dxParallaxNavigation__alignmentRight" : "";
    let borderRigth = props.position == "right" ? "dxParallaxNavigation__borderRight" : "";
    let testIdRight = props.position == "right" ? "right" : "";

    useEffect( () => {
        validateMobile();
        window.addEventListener( "resize", validateMobile );
        return () => { window.removeEventListener( "resize", validateMobile ); };
    }, [] );

    const validateMobile = () => {
        const eventTabsSize = document.querySelector( ".dxParallaxNavigation" ) as HTMLElement;
        componentSize = eventTabsSize.offsetWidth;
        if ( componentSize <= widthMobile ) {
            setIsMobile( true );
        } else {
            setIsMobile( false );
        }
    };

    const renderParallaxNavigation = function (): ReactElement[] {
        const children: ReactElement[] = [];

        const handleClick = ( link: ( LinksProps | undefined ) ) => {
            const target = link?.url;
            const element = document.getElementById( `${target}` );
            if ( element ) {
                element.scrollIntoView( { behavior: "smooth", block: "start", inline: "start" } );
            }
        };

        props.items.forEach( ( parallaxItem, index ) => {
            children.push(
                isMobile ? (
                    <Button key={"parallaxItem" + index} data-testid={`pnb-eventButtonMobile-${index + 1}`} onClick={() => { handleClick( parallaxItem.link ); }} className={`dxParallaxNavigation__buttonMobile ${borderRigth}`}>
                        <i id="icon" data-testid={`pnb-eventButtonIcon-${index + 1}`} className={`dxParallaxNavigation__icon ${parallaxItem.icon}`}></i>
                        <span className="dxParallaxNavigation__textMobile">{parallaxItem.link.label}</span>
                    </Button>
                ) : (
                    <Button key={"parallaxItem" + index} data-testid={`pnb-eventButton-${index + 1}`} onClick={() => { handleClick( parallaxItem.link ); }} className={`dxParallaxNavigation__button ${borderRigth}`}>
                        <i id="icon" data-testid={`pnb-eventButtonIcon-${index + 1}`} className={`dxParallaxNavigation__icon ${parallaxItem.icon}`}></i>
                        <span className="dxParallaxNavigation__text">{parallaxItem.link.label}</span>
                    </Button>
                )
            );
        } );
        return children;
    };

    return (
        <div {...pickDomProps( rest )} ref={ref} data-testid={`${testIdRight}`} className={classNames( "dxParallaxNavigation", className )}>
            <div data-testid="pnb-wrapper" className={`dxParallaxNavigation__wrapper ${alignmentVariant}`}>
                {renderParallaxNavigation()}
            </div>
        </div>
    );
};

export default DXParallaxNavigation;
