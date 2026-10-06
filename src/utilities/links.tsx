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
