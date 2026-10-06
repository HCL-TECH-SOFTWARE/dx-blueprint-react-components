import "./BasicComponent.scss";
import React from "react";

export interface BasicComponent {
    _edit?: EditButtonProps;
}

interface ClickableLink {
    url: string,
    target?: string;
}

interface EditButtonProps {
    button?: Function,
    link?: ClickableLink;
}

let handleClick = ( e: any, editProp: EditButtonProps ) => {
    if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
        e.stopPropagation();
        if ( editProp.link && editProp.link.url ) {
            window.open( editProp.link.url, editProp.link.target ? editProp.link.target : "_blank" );
        } else if ( editProp.button ) {
            editProp.button();
        }
    }
};

const handleHover = ( e: any, type: ( "enter" | "leave" ) ) => {
    let parentComponent = e.target.parentNode;
    // Apply the classes
    if ( type === "enter" ) parentComponent.classList.add( "dxEditButton--hover" );
    else if ( type === "leave" ) parentComponent.classList.remove( "dxEditButton--hover" );
};

export const renderEditButton = ( editProp: EditButtonProps ) => {
    return (
        <i className="dxEditButton ci-Edit_Pencil_Line_01"
            onClick={( e ) => handleClick( e, editProp )}
            onMouseEnter={( e ) => handleHover( e, "enter" )}
            onMouseLeave={( e ) => handleHover( e, "leave" )}>
        </i>
    );
};
