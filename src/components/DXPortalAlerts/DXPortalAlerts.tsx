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
import { generateLinkAnchor, LinksProps } from "../../utilities";
import "./DXPortalAlerts.scss";

export interface PortalAlertsProps {
    type: ( "success" | "warning" | "error" | "general" );
    iconClass?: string;
    title: string;
    link: LinksProps;
    hideLink?: boolean;
}

const DXPortalAlerts = ( props: PortalAlertsProps ) => {

    let type = props.type;
    let iconName = "";

    switch ( type ) {
        case "success":
            iconName = "ci-Circle_Check";
            break;
        case "warning":
            iconName = "ci-Triangle_Warning";
            break;
        case "error":
            iconName = "ci-Close_SM";
            break;
        case "general":
            iconName = "ci-Info";
            break;
        default:
            iconName = "ci-Info";
            type = "general";
            break;
    }


    return (
        <div
            className={
                "dxPortalAlerts " +
                "dxPortalAlerts--" + type
            }>
            <div className="dxPortalAlerts__iconContainer">
                <i className={props.iconClass || iconName} data-testid="portalAlert-icon"></i>
            </div>
            <span data-testid="portalAlert-title">{props.title}</span>
            {
                !props.hideLink &&
                generateLinkAnchor( props.link, "", { "data-testid": "portalAlert-link" } )
            }
        </div>
    );
};

export default DXPortalAlerts;
