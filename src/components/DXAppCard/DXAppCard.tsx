import "./DXAppCard.scss";
import React from "react";
import { ImageProps } from "../../utilities";
import { CardComponent } from "../../utilities/CardComponent/CardComponent";

export interface AppCardProps extends CardComponent {
    media: ImageProps | string,
    actionFn: Function,
    label: string,
}

const DXAppCard = ( props: AppCardProps ) => {

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
        <button className="dxAppCard" onClick={( e ) => handleTrigger( e )} onKeyDown={( e ) => handleTrigger( e )}>
            <div className="dxAppCard__container">
                {getMedia()}
            </div>
            <p className="dxAppCard__label">{props.label}</p>
        </button>
    );
};

export default DXAppCard;
