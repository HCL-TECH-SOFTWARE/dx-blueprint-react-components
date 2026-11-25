/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */

import "./DXDownloadGroup.scss";
import React from "react";
import DXDownloadCard, { DownloadCardProps } from "../DXDownloadCard/DXDownloadCard";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface DownloadGroupProps {
    downloads: DownloadCardProps[],
    title?: string,
}

const DXDownloadGroup = ( props: ExtendableProps<DownloadGroupProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { downloads: _downloads, title: _title, className, ref, ...rest } = props;
    const renderColDownloads = ( downloads: DownloadCardProps[] ) => {
        return downloads.map( ( download, key ) => (
            <div key={key} className="dxDownloadGroup__item">
                <DXDownloadCard {...download} />
            </div>
        ) );
    };

    return (
        <div {...pickDomProps( rest )} ref={ref} className={classNames( "dxDownloadGroup", className )}>
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
