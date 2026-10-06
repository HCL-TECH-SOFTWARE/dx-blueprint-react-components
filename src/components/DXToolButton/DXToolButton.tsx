import "./DXToolButton.scss";
import React from "react";
import { ImageProps } from "../../utilities";

export interface ToolButtonProps {
    icon: string,
    label: string,
    image?: ImageProps,
    showLabel?: boolean,
    onClick: Function,
    badge?: number;
}

const DXToolButton = ( props: ToolButtonProps ) => {
    // GET - Style and classes
    const getClass = ( type: "button" | "image", badgesAmnt: number | undefined ) => {
        let finalClass = "";
        if ( type === "button" ) finalClass = "dxToolButton__button";
        if ( type === "image" ) finalClass = "dxToolButton__imageContainer";
        if ( badgesAmnt ) finalClass += " dxToolButton__badge";
        return finalClass;
    };

    const getBadgeValue = ( badgesAmnt: number | undefined ) => {
        if ( badgesAmnt ) {
            if ( badgesAmnt > 99 ) return "+99";
            return badgesAmnt;
        } else {
            return 0;
        }
    };

    // Handlers
    const handleClick = ( e: any ) => {
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            e.preventDefault();
            props.onClick();
        }
    };

    return (
        <div className="dxToolButton">
            {props.image && props.image.url ? (
                <div className="dxToolButton__imageButton">
                    <div className={getClass( "image", props.badge )}
                        data-count={getBadgeValue( props.badge )}>
                        <input
                            className="dxToolButton__image"
                            data-testid="tool-button-image"
                            type="image"
                            src={props.image.url}
                            alt={props.image.altText ? props.image.altText : props.label + " image"}
                            onClick={( e ) => handleClick( e )}
                            onKeyDown={( e ) => handleClick( e )}
                            aria-label={props.label}
                            role="button" />
                    </div>
                    {props.badge && props.badge > 0 ? (
                        <span className="sr-only" data-testid="tool-button-badge-span">{props.badge}</span>
                    ) : null}
                    {props.label && props.showLabel ? (
                        <p className="dxToolButton__label" data-testid="tool-button-label">{props.label}</p>
                    ) : null}
                </div>
            ) : (
                <div className="dxToolButton__buttonContainer">
                    <button className={getClass( "button", props.badge )}
                        onClick={( e ) => handleClick( e )}
                        onKeyDown={( e ) => handleClick( e )}
                        data-count={getBadgeValue( props.badge )}
                        data-testid="tool-button-icon"
                        aria-label={props.label}>
                        <i className={`dxToolButton__buttonIcon ${props.icon}`}></i>
                    </button>
                    {props.badge && props.badge > 0 ? (
                        <span className="sr-only" data-testid="tool-button-badge-span">{props.badge}</span>
                    ) : null}
                    {props.label && props.showLabel ? (
                        <p className="dxToolButton__label" data-testid="tool-button-label">{props.label}</p>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default DXToolButton;
