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

import "./DXButton.scss";
import Button from 'react-bootstrap/Button';
import React, { FormEventHandler, MouseEventHandler, MutableRefObject } from "react";

export type DisplayType = "primary" | "secondary" | "unstyled" | undefined;
export type ButtonType = "button" | "submit" | "reset" | undefined;

export interface ButtonProps {
    label: string;
    hideLabel?: boolean;
    id?: string;
    role?: string;
    ariaExpanded?: boolean;
    type?: ButtonType;
    hidden?: boolean;
    disabled?: boolean;
    className?: string;
    value?: string | number;
    style?: {};
    reactRef?: MutableRefObject<any>;
    onClick?: Function | FormEventHandler | MouseEventHandler<HTMLButtonElement>;
    displayType?: DisplayType;
    icon?: {
        class: string;
        position?: "left" | "right";
        testId?: string;
    };
    tabIndex?: number;
}

export interface HelperAttrs {
    "data-testid"?: string;
}

const DXButton: React.FC<ButtonProps & HelperAttrs> = ( props: ButtonProps & HelperAttrs ) => {
    const getButtonClass = () => {
        let className = "dxButton";
        if ( props.hideLabel ) {
            className += " dxButton--icon-only";
        }
        // Check for aditional classes passed via prop
        if ( props.className ) {
            className = `${props.className} ${className}`;
        }
        return className;
    };

    const handleEvent = ( e: any ) => {
        if ( props.onClick ) {
            if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
                e.preventDefault();
                if ( e.target.nodeName === 'DIV' ) e.target = e.target.parentNode;
                props.onClick( e );
            }
        }
        return;
    };

    return (
        <Button className={getButtonClass()}
            variant={props.displayType ? props.displayType : "primary"}
            style={props.style ? { ...props.style } : undefined}
            id={props.id ? props.id : undefined}
            ref={props.reactRef ? props.reactRef : undefined}
            role={props.role ? props.role : "button"}
            aria-label={props.hideLabel ? props.label : undefined}
            aria-expanded={props.ariaExpanded ? props.ariaExpanded : undefined}
            type={props.type ? props.type : "button"}
            hidden={props.hidden ? props.hidden : undefined}
            value={props.value ? props.value : undefined}
            disabled={props.disabled ? props.disabled : undefined}
            onClick={( e ) => handleEvent( e )}
            onKeyDown={( e ) => handleEvent( e )}
            tabIndex={props.tabIndex}
            data-testid={props["data-testid"] ? props["data-testid"] : undefined}>
            {props.icon && props.icon.class && props.icon.position != "right" &&
                <i className={props.icon.class} data-testid={props.icon.testId ? props.icon.testId : ""} ></i>
            }
            {!props.hideLabel &&
                <div className="dxButton__label">{props.label}</div>
            }
            {props.icon && props.icon.class && props.icon.position === "right" &&
                <i className={props.icon.class} data-testid={props.icon.testId ? props.icon.testId : ""} ></i>
            }
        </Button>
    );
};

export default DXButton;
