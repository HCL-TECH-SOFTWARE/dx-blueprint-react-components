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

import "./DXAd.scss";
import { ImageProps } from "../../utilities/image";

import React, { useEffect, useRef } from 'react';
import { ExtendableProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface AdProps {
    img?: ImageProps,
    icon?: string,
    text?: string,
    backgroundColor?: string,
}

const DXAd = ( props: ExtendableProps<AdProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { img: _img, icon: _icon, text: _text, backgroundColor: _backgroundColor, className, ref, ...rest } = props;
    const backgroundRef = useRef<HTMLDivElement>( null );
    const applyBackgoundColor = () => {
        if ( props.backgroundColor ) {
            const ad = backgroundRef.current;
            if ( ad ) {
                ad.style.backgroundColor = props.backgroundColor;
            }
        }
        return;
    };

    useEffect( () => {
        applyBackgoundColor();
    }, [props.backgroundColor] );

    const getDetailsClass = () => {
        if ( props.icon && props.text ) return 'dxAd__withIcon';
        if ( props.icon && !props.text ) return 'dxAd__justIcon';
    };

    return (
        <div {...rest} ref={ref} className={classNames( "dxAd", className )}>
            <div className="dxAd__background"
                ref={backgroundRef}
                style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${props.img && props.img?.url ? props.img.url : ""}')` }}
                aria-label={props.img?.altText}>
                <div className={`dxAd__content ${getDetailsClass()}`} data-testid="ad-details">
                    {
                        ( props.icon || props.text ) && (
                            <>
                                {
                                    props.icon &&
                                    <i className={props.icon}></i>
                                }
                                {
                                    props.text &&
                                    <span>{props.text}</span>
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
export default DXAd;
