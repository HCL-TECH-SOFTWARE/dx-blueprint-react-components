import "./DXDownloadGroup.scss";
import React from "react";
import DXDownloadCard, { DownloadCardProps } from "../DXDownloadCard/DXDownloadCard";

export interface DownloadGroupProps {
    downloads: DownloadCardProps[],
    title?: string,
}

const DXDownloadGroup = ( props: DownloadGroupProps ) => {
    const renderColDownloads = ( downloads: DownloadCardProps[] ) => {
        return downloads.map( ( download, key ) => (
            <div key={key} className="dxDownloadGroup__item">
                <DXDownloadCard {...download} />
            </div>
        ) );
    };

    return (
        <div className="dxDownloadGroup">
            {props.title ? (
                <p className="dxDownloadGroup__title">{props.title}</p>
            ) : null}
            {props.downloads && props.downloads.length > 0 ? (
                <div className="dxDownloadGroup__container">
                    {renderColDownloads( props.downloads )}
                </div>
            ) : ( <p>No files received</p> )}
        </div>
    );
};

export default DXDownloadGroup;
