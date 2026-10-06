import "./DXMap.scss";
import React from "react";

export interface MapProps {
    iframeUrl: string,
}

const DXMap = ( props: MapProps ) => {
    return (
        <div data-testid="map-container" className="dxMap">
            {props.iframeUrl ? (
                <iframe src={props.iframeUrl} width="100" height="100" loading="lazy"></iframe>
            ) : ( <p>No Map URL received</p> )}
        </div>
    );
};

export default DXMap;
