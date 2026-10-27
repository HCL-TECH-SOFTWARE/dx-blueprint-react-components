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

import "./DXTextBreak.scss";
import React from "react";
import DXButton from "../DXButton/DXButton";
import { IconButtonProps } from "../../utilities";

export interface TextBreakProps {
    title: String,
    subtitle?: String,
    button?: IconButtonProps,
    align?: string,
    background: {
        color: string,
        image?: string;
    },
    textColor?: string,
}

const DXTextBreak = ( props: TextBreakProps ) => {
    const getBackgroundStyles = () => {
        let styles: { [k: string]: any; } = {};
        if ( props.background.image ) {
            styles = {
                background: `radial-gradient(circle, rgba(0,0,0,0.5648460067620799) 100%, rgba(0,0,0,0) 100%), url('${props.background.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            };
        }
        styles["backgroundColor"] = props.background.color;
        return styles;
    };

    const getContentStyles = () => {
        let styles: React.CSSProperties = {};
        switch ( props.align ) {
            case "center":
                styles = {
                    textAlign: "center",
                    alignItems: "center",
                    paddingLeft: 0,
                    paddingRight: 0
                };
                break;
            case "right":
                styles = {
                    textAlign: "right",
                    alignItems: "flex-end",
                    paddingRight: "2.8125rem"
                };
                break;
            case "left":
            default:
                styles = {
                    textAlign: "left",
                    alignItems: "flex-start",
                    paddingLeft: "2.8125rem"
                };
                break;
        }
        if ( props.textColor ) {
            styles["color"] = props.textColor;
        } else {
            styles["color"] = "var(--white)";
        }
        return styles;
    };

    const getAlignment = () => {
        let classes = "dxTextBreak__content ";
        switch ( props.align ) {
            case "center":
                classes += "col-12 col-md-8 offset-md-2";
                break;
            case "right":
                classes += "col-12 col-md-7 offset-md-5";
                break;
            case "left":
            default:
                classes += "col-12 col-md-7";
                break;
        }
        return classes;
    };

    const handleButtonEvent = ( e: any ) => {
        e.preventDefault();
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            if ( props.button && props.button.onClick ) {
                let fn = props.button.onClick as Function;
                fn();
            }
        }
    };

    const renderButton = ( buttonProps: IconButtonProps ) => {
        let props = {
            ...buttonProps,
            onClick: handleButtonEvent,
            "data-testid": "text-break-button"
        };
        return <DXButton {...props} />;
    };

    return (
        <div className="dxTextBreak">
            <div className="dxTextBreak__background" style={getBackgroundStyles()} data-testid="text-break-background">
                <div className="dxTextBreak__container row">
                    <div className={getAlignment()} style={getContentStyles()} data-testid="text-break-content">
                        <h4>{props.title}</h4>
                        {props.subtitle && <h6 data-testid="text-break-subtitle">{props.subtitle}</h6>}
                        {props.button && renderButton( props.button )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DXTextBreak;
