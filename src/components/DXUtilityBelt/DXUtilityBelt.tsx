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

import "./DXUtilityBelt.scss";
import React from "react";
import { ExtendableProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

interface BeltIcon {
    button: {
        iconClass?: string,
        label: string,
        onClick: Function,
    };
    title?: string,
}
export interface UtilityBeltProps {
    items: BeltIcon[],
    textVariant?: boolean,
    align?: ( "left" | "center" | "right" ),
    displayType?: ( "primary" | "secondary" | "unstyled" ),
}

const DXUtilityBelt = ( props: ExtendableProps<UtilityBeltProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { items: _items, textVariant: _textVariant, align: _align, displayType: _displayType, className, ref, ...rest } = props;

    const handleClick = ( e: any, item: BeltIcon ) => {
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            item.button.onClick();
        }
    };

    const getAlignment = () => {
        if ( props.align && props.align === "left" ) return "dxUtilityBelt--left";
        if ( props.align && props.align === "right" ) return "dxUtilityBelt--right";
        if ( props.align && props.align === "center" ) return "dxUtilityBelt--center";
        return "dxUtilityBelt--center";
    };
    const getColorClass = () => {
        if ( props.displayType && props.displayType === "primary" ) return "dxUtilityBelt__button--primary";
        if ( props.displayType && props.displayType === "secondary" ) return "dxUtilityBelt__button--secondary";
        if ( props.displayType && props.displayType === "unstyled" ) return "dxUtilityBelt__button--unstyled";
        return "dxUtilityBelt__button--primary";
    };

    const renderItems = ( items: BeltIcon[] ) => {
        return items.map( ( item: BeltIcon, index: number ) => (
            <div className={`dxUtilityBelt__item`} key={index}>
                <div className={"dxUtilityBelt__itemTop" + " " + ( !props.textVariant ? "dxUtilityBelt__itemTop--full" : "" )}>
                    <button className={getColorClass() + " " + ( !props.textVariant ? "dxUtilityBelt__icon--full" : "" )} onClick={( e ) => handleClick( e, item )} onKeyDown={( e ) => handleClick( e, item )} aria-label={item.button.label}>
                        {item.button.iconClass ? <i className={item.button.iconClass}></i> : <span>{item.button.label}</span>}
                    </button>
                </div>
                {props.textVariant &&
                    <div className="dxUtilityBelt__itemBottom">
                        <span>{item.title!}</span>
                    </div>
                }
            </div>
        ) );
    };

    return (
        <div {...rest} ref={ref} className={classNames( `dxUtilityBelt ${getAlignment()}`, className )}>
            {renderItems( props.items )}
        </div>
    );
};

export default DXUtilityBelt;
