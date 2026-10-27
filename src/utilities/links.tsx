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

import React from "react";

export interface ButtonLinkProps {
    url: string,
    target?: string;
}

export interface LinksProps {
    url: string,
    label: string,
    target?: string;
}

export interface LinkIconProps {
    url: string;
    label: string;
    target?: string;
    icon?: {
        class: string,
        position?: ( "left" | "right" );
    };
    hideLabel?: boolean;
}

export const getLinkTarget = ( target: string | undefined ) => {
    let availableOptions = ["_blank", "_self", "_parent", "_top"];
    if ( target === undefined ) return "_self";
    if ( target === "" ) return "_self";
    if ( !availableOptions.includes( target ) ) return "_self";
    return target;
};

export const getLinkIcon = ( target: string | undefined ) => {
    return target === "_blank" ? (
        <i className="ci-External_Link"></i>
    ) : "";
};

export const generateLinkAnchor = ( linkProps: LinksProps, className?: string, props?: any ) => {
    var linkTarget = getLinkTarget( linkProps.target );
    return (
        <a {...props}
            className={className || ""}
            href={linkProps.url}
            target={linkTarget}
        >
            {linkProps.label}
            {getLinkIcon( linkTarget )}
        </a>
    );
};
export const generateLinkIcon = ( linkProps: LinkIconProps, className?: string, props?: any ) => {
    var linkTarget = getLinkTarget( linkProps.target );
    return (
        <a {...props}
            className={className || ""}
            href={linkProps.url}
            target={linkTarget}
            title={linkProps.hideLabel && linkProps.label || ""}
        >
            {linkProps.icon && ( !linkProps.icon.position || linkProps.icon.position === "left" ) && (
                <i className={linkProps.icon.class}></i>
            )}
            {!linkProps.hideLabel && linkProps.label}
            {linkProps.hideLabel &&
                <span className="sr-only">{linkProps.label}</span>
            }
            {linkProps.icon && linkProps.icon.position === "right" && (
                <i className={linkProps.icon.class}></i>
            )}
        </a>
    );
};
