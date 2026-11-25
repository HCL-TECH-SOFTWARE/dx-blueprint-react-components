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

import "./DXAppCard.scss";
import React from "react";
import { ImageProps } from "../../utilities";
import { CardComponent } from "../../utilities/CardComponent/CardComponent";
import { pickDomProps, chainHandlers } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface AppCardProps extends CardComponent {
    media: ImageProps | string,
    actionFn: Function,
    label: string,
}

const DXAppCard = ( props: AppCardProps & { className?: string; ref?: React.Ref<HTMLButtonElement>; } ) => {
    // Own props are pulled out; only DOM-safe extras reach the root (the props type has an index signature).
    const { media: _media, actionFn: _actionFn, label: _label, _search, index: _index, className, ref, ...rest } = props;
    const { onClick: consumerOnClick, onKeyDown: consumerOnKeyDown, ...domAttrs } = pickDomProps( rest );

    function isAnImage( obj: any ): obj is ImageProps {
        return 'url' in obj;
    }

    const getMedia = () => {
        if ( typeof ( props.media ) === "string" ) {
            return (
                <i className={props.media} data-testid="app-card-icon"></i>
            );
        }
        if ( isAnImage( props.media ) ) {
            return (
                <img src={props.media.url} alt={props.media.altText} data-testid="app-card-image" />
            );
        }
    };

    const handleTrigger = ( e: any ) => {
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            props.actionFn();
        }
    };

    return (
        <button
            {...domAttrs}
            ref={ref}
            className={classNames( "dxAppCard", className )}
            // The consumer's handlers run first and can stop the action with preventDefault
            onClick={chainHandlers( consumerOnClick as React.MouseEventHandler<HTMLButtonElement> | undefined, ( e ) => handleTrigger( e ) )}
            onKeyDown={chainHandlers( consumerOnKeyDown as React.KeyboardEventHandler<HTMLButtonElement> | undefined, ( e ) => handleTrigger( e ) )}>
            <div className="dxAppCard__container">
                {getMedia()}
            </div>
            <p className="dxAppCard__label">{props.label}</p>
        </button>
    );
};

export default DXAppCard;
