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
import "./DXMosaicButton.scss";
import { ButtonLinkProps, ImageProps, getLinkTarget } from "../../utilities";

export interface MosaicButtonProps {
    index: number;
    size: "lg" | "md" | "sm";
    title: string;
    link: ButtonLinkProps;
    subtitle?: string;
    image?: ImageProps;
}

const DXMosaicButton = ( props: MosaicButtonProps ) => {
    const [size, setSize] = useState( getValidSize( props.size ) );

    useEffect( () => {
        setSize( getValidSize( props.size ) );
    }, [props.size] );

    function getValidSize( size: string ) {
        if ( size !== "lg" && size !== "md" && size !== "sm" ) return "md";
        return size;
    }

    const getContainerStyles = () => {
        let styles: { [k: string]: any; } = {};

        styles["backgroundImage"] = props.image?.url
            ? `linear-gradient(16.81deg, rgba(0, 0, 0, 0.5) 9.02%, rgba(0, 0, 0, 0.5) 42.36%), url(${props.image?.url})`
            : "none";
        return styles;
    };

    const getTextStyles = () => {
        let styles: { [k: string]: any; } = {};
        switch ( size ) {
            case "sm":
                styles["width"] = "85%";
                styles["margin"] = "0 8px 15px 8px";
                break;
            case "md":
                styles["margin"] = "0 20px 20px 20px";
                break;
            case "lg":
                styles["width"] = "90%";
                styles["margin"] = "0 20px 20px 20px";
                break;
            default:
                styles["margin"] = "0 20px 20px 20px";
        }

        return styles;
    };

    return (
        <div className={"dxMosaicButton dxMosaicButton--" + size} id={"dxMosaicButton-" + props.index}>
            <a href={props.link.url} target={getLinkTarget( props.link.target )} aria-roledescription="button">
                <div className={"dxMosaicButton__container"} style={getContainerStyles()} title={props.image?.altText || "mosaic-button-" + props.index} data-testid="mb-image">
                    <div className={"dxMosaicButton__text"} data-testid="mb-textContainer" style={getTextStyles()}>
                        {props.size !== "sm" ? (
                            <p className={"dxMosaicButton__textSubtitle dxMosaicButton__textSubtitle--" + size} data-testid={"mb-" + props.size + "-subtitle"}>
                                {props.subtitle}
                            </p>
                        ) : null}
                        <p className={"dxMosaicButton__textTitle dxMosaicButton__textTitle--" + size} data-testid={"mb-" + size + "-title"}>
                            {props.title}
                        </p>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default DXMosaicButton;
