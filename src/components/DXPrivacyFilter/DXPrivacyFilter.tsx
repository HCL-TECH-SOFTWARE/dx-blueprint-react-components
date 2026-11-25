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

import React, { useEffect, useState } from "react";
import DXButton from "../DXButton/DXButton";
import "./DXPrivacyFilter.scss";
import { getIcon } from "../../utilities";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface PrivacyFilterProps {
    selectors: string[];
    isActive?: boolean;
    activeLabel?: string;
    inactiveLabel?: string;
    icons?: {
        show?: string;
        hide?: string;
    };
}

const DXPrivacyFilter = ( props: ExtendableProps<PrivacyFilterProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { selectors: _selectors, isActive: _isActive, activeLabel: _activeLabel, inactiveLabel: _inactiveLabel, icons: _icons, className, ref, ...rest } = props;
    const [isActive, setIsActive] = useState( props.isActive );

    // if privacy filter comes on by default
    useEffect( () => {
        if ( props.isActive ) {
            handlePrivacyBlur( props.isActive );
        }
    }, [] );

    const handleClick = () => {
        handlePrivacyBlur( !isActive );
        setIsActive( !isActive );
    };

    // called on click, only to check if objects will be blurred or unblurred, finds elements in document
    const handlePrivacyBlur = ( active: boolean ) => {
        props.selectors.forEach( ( elementName: string ) => {
            let domElements: NodeListOf<Element> = document.querySelectorAll( elementName );
            blurArrayOfHTMLElements( domElements );
        } );

        // blur, unblur a list of Node objects
        function blurArrayOfHTMLElements( objects: NodeListOf<Element> ) {
            if ( active ) {
                objects.forEach( ( e: Element ) => {
                    e?.classList.remove( "privacyFilterOff" );
                    e?.classList.add( "privacyFilterOn" );
                } );
            } else {
                objects.forEach( ( e: Element ) => {
                    e?.classList.remove( "privacyFilterOn" );
                    e?.classList.add( "privacyFilterOff" );
                } );
            }
        }
    };

    return (
        <div {...pickDomProps( rest )} ref={ref} className={classNames( "dxPrivacyFilter", className )}>
            <DXButton
                displayType={'secondary'}
                onClick={handleClick}
                className="dxPrivacyFilter__button"
                role="button"
                label={isActive ? ( props.activeLabel ? props.activeLabel : "Show values" ) : ( props.inactiveLabel ? props.inactiveLabel : "Hide values" )}
                icon={{
                    class: `dxPrivacyFilter__icon ${isActive ? getIcon( props.icons, "show", "ci-Show" ) : getIcon( props.icons, "hide", "ci-Hide" )} `,
                    testId: "pf-icon"
                }}
            />
        </div>
    );
};

export default DXPrivacyFilter;
