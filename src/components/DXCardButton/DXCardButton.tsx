import "../../global/loaders.scss";
import "./DXCardButton.scss";
import React, { useState } from "react";
import { ImageProps } from "../../utilities";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";
import { CardComponent } from "../../utilities/CardComponent/CardComponent";

export interface CardButtonProps extends BasicComponent, CardComponent {
    header: string,
    body?: string,
    img: ImageProps,
    link: string,
    direction?: ( "left" | "right" ),
    cta?: {
        label: string,
        justify?: ( "left" | "right" | "center" ),
        icon?: {
            class: string,
            position?: ( "left" | "right" );
        };
    },
}

export const slugify = ( str: string ) => str
    .toLowerCase()
    .trim()
    .replace( /[^\w\s-]/g, '' )
    .replace( /[\s_-]+/g, '-' )
    .replace( /^-+|-+$/g, '' );

const DXCardButton = ( props: CardButtonProps ) => {
    // States
    const [loaded, setLoaded] = useState( false );
    const redirectTo = ( link: string ) => {
        if ( link && link !== "" ) {
            window.open( link, "_self" );
        }
        return;
    };

    const getContainerClass = () => {
        let classes = "";
        switch ( props.direction ) {
            case "left":
                classes = `dxCardBtn__container`;
                break;
            case "right":
                classes = `dxCardBtn__container--reversed`;
                break;
            default:
                classes = `dxCardBtn__container`;
                break;
        }
        return classes;
    };

    const getCTAClass = () => {
        let classes = "";
        switch ( props.cta?.justify ) {
            case "left":
                classes = "dxCardBtn__text--cta";
                break;
            case "right":
                classes = "dxCardBtn__text--cta dxCardBtn__text--right";
                break;
            case "center":
                classes = "dxCardBtn__text--cta dxCardBtn__text--center";
                break;
            default:
                classes = "dxCardBtn__text--cta";
                break;
        }
        return classes;
    };

    return (
        <button className="dxCardBtn" onClick={() => redirectTo( props.link )} aria-label={slugify( props.header )}>
            <div className={getContainerClass()} data-testid="card-button-container">
                <div className={props.body ? 'dxCardBtn__text' : 'dxCardBtn__text dxCardBtn__text--fill'}>
                    <h3 data-testid="card-button-header">
                        {props.header}
                    </h3>
                    {
                        props.body ? (
                            <p data-testid="card-button-body">
                                {props.body}
                            </p>
                        ) : null
                    }
                    {
                        props.cta && (
                            <span className={getCTAClass()} data-testid="card-button-cta">
                                {props.cta.icon && ( !props.cta.icon.position || props.cta.icon.position === "left" ) &&
                                    <i className={`${props.cta.icon.class}`}></i>
                                }
                                {props.cta.label}
                                {props.cta.icon && props.cta.icon.position === "right" &&
                                    <i className={`${props.cta.icon.class}`}></i>
                                }
                            </span>
                        )
                    }
                </div>
                {
                    props.img && props.img.url && (
                        <div className="dxCardBtn__imgContainer">
                            <div className={`loader__container ${loaded ? "d-none" : ""}`}>
                                <span className="loader"></span>
                            </div>
                            <img
                                src={props.img.url}
                                className="dxCardBtn__img"
                                alt={props.img.altText}
                                data-testid="card-button-image"
                                loading="lazy"
                                onLoad={() => setLoaded( true )}
                                {...( !props.img.altText && { role: "presentation" } )} />
                        </div>
                    )
                }
            </div>
            {props._edit && renderEditButton( props._edit )}
        </button>
    );
};

export default DXCardButton;
