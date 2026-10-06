import "./DXAds.scss";
import React, { useEffect, useState } from "react";
import DXAd, { AdProps } from "../DXAd/DXAd";

export interface AdsProps {
    ads: AdProps[];
}

const DXAds = ( props: AdsProps ) => {
    const [cols, setCols] = useState( 12 );
    const setColNumber = () => {
        if ( props.ads.length > 0 ) {
            if ( props.ads.length === 1 ) setCols( 12 );
            if ( props.ads.length === 2 ) setCols( 6 );
            if ( props.ads.length === 3 ) setCols( 4 );
            if ( props.ads.length === 4 ) setCols( 3 );
            if ( props.ads.length >= 5 ) setCols( 2 );
        }
        return;
    };

    useEffect( () => {
        setColNumber();
    }, [props.ads] );

    const renderAds = () => {
        if ( props.ads && props.ads.length > 0 ) {
            if ( props.ads.length <= 5 ) {
                return (
                    <div className="row">
                        {
                            props.ads.map( ( ad, index ) => (
                                <div className={`col-xs-12 col-sm-${cols}`} data-testid="ad-item" key={index}>
                                    <DXAd {...ad} />
                                </div>
                            ) )
                        }
                    </div>
                );
            } else {
                let rowAmnt = Math.ceil( props.ads.length / 5 );
                let firstIndex = 0;
                let lastIndex = 0;

                return Array.apply( null, Array( rowAmnt ) ).map( ( item, index ) => {
                    firstIndex = lastIndex;
                    lastIndex = 5 * ( index + 1 );
                    return (
                        <div className="row" key={index}>
                            {
                                props.ads.slice( firstIndex, lastIndex ).map( ( ad, adIndex ) => (
                                    <div className={`col-xs-12 col-sm-${cols}`} data-testid="ad-item" key={`${index}-${adIndex}`}>
                                        <DXAd {...ad} />
                                    </div>
                                ) )
                            }
                        </div>
                    );
                } );
            }
        } else {
            return (
                <p>No Ads received</p>
            );
        }
    };
    return (
        <div className="dxAds">
            {renderAds()}
        </div>
    );
};
export default DXAds;
