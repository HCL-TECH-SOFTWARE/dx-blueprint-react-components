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
