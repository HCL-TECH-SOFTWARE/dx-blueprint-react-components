import "./DXAd.scss";
import { ImageProps } from "../../utilities/image";

import React, { useEffect, useRef } from 'react';

export interface AdProps {
    img?: ImageProps,
    icon?: string,
    text?: string,
    backgroundColor?: string,
}

const DXAd = ( props: AdProps ) => {
    const ref = useRef<HTMLDivElement>( null );
    const applyBackgoundColor = () => {
        if ( props.backgroundColor ) {
            const ad = ref.current;
            if ( ad ) {
                ad.style.backgroundColor = props.backgroundColor;
            }
        }
        return;
    };

    useEffect( () => {
        applyBackgoundColor();
    }, [props.backgroundColor] );

    const getDetailsClass = () => {
        if ( props.icon && props.text ) return 'dxAd__withIcon';
        if ( props.icon && !props.text ) return 'dxAd__justIcon';
    };

    return (
        <div className="dxAd">
            <div className="dxAd__background"
                ref={ref}
                style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${props.img && props.img?.url ? props.img.url : ""}')` }}
                aria-label={props.img?.altText}>
                <div className={`dxAd__content ${getDetailsClass()}`} data-testid="ad-details">
                    {
                        ( props.icon || props.text ) && (
                            <>
                                {
                                    props.icon &&
                                    <i className={props.icon}></i>
                                }
                                {
                                    props.text &&
                                    <span>{props.text}</span>
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
export default DXAd;
