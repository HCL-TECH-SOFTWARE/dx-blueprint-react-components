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
import React, { useState, useEffect } from "react";
import "./DXDownloadCard.scss";
import DXIcon from "../DXIcon/DXIcon";
import { getIcon } from "../../utilities";

export interface DownloadCardProps {
    url: string,
    fileName?: string,
    size?: string,
    _downloadFn?: Function;
    icons?: {
        download?: string;
        pdf?: string;
        png?: string;
        jpg?: string;
        svg?: string;
        html?: string;
        js?: string;
        css?: string;
        zip?: string;
        doc?: string;
        ppt?: string;
        xls?: string;
        fileOther?: string;
    };
}

const DXDownloadCard = ( props: DownloadCardProps ) => {
    // STATES
    const [fileName, setFileName] = useState( "" );
    const [extension, setExtension] = useState( "" );

    const getFileDetails = ( url: string ) => {
        // This regular expression may match a domain or filename, but the filename should be the last match
        let exp = new RegExp( /[^\/\\&\?]+\.\w{2,4}(?=([\?\/&].*$|$))/g );
        let matches = url.match( exp );
        // If a full URL is present two items should be in the matches array but for relative paths only one item should be present
        const matchLimit = isValidUrl( url ) ? 1 : 0;
        if ( matches !== null && matches.length > matchLimit ) {
            let docFile = matches[matches?.length - 1];
            let name = docFile.split( "." )[0];
            let extension = docFile.split( "." )[1];
            setFileName( name );
            setExtension( extension );
        } else {
            console.warn( `URL does not contain a file name: ${url}` );
            setFileName( "no name" );
        }
    };

    const isValidUrl = ( urlString: string ) => {
        var urlPattern = new RegExp( '^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$', 'i' ); // validate fragment locator
        return !!urlPattern.test( urlString );
    };

    const handleDownload = ( url: string, e: any ) => {
        e.preventDefault();
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            if ( !props._downloadFn ) {
                let anchorEl = document.createElement( "a" ) as HTMLAnchorElement;
                anchorEl.href = url;
                anchorEl.download = fileName;
                anchorEl.click();
            } else { props._downloadFn(); }
        }
    };

    const iconSelector = ( iconName: string ) => {
        let aux = props.icons as any;
        if ( aux && aux[iconName] ) {
            return <i className={aux[iconName]} data-testid="dc-file-icon"></i>;
        } else {
            return <DXIcon name={"dx-file_" + iconName} data-testid="dc-file-icon" />;
        }
    };

    const renderIcon = ( ext: string ) => {
        switch ( ext ) {
            case "pdf": case "png": case "jpg": case "svg": case "html": case "js": case "css":
                return <i className={getIcon( props.icons, ext, "ci-File_Download" )} data-testid="dc-file-icon"></i>;
            case "zip": case "rar":
                return iconSelector( "zip" );
            case "doc": case "docx":
                return iconSelector( "doc" );
            case "ppt": case "pptx":
                return iconSelector( "ppt" );
            case "xls": case "xlsx":
                return iconSelector( "xls" );
            default:
                return iconSelector( "other" );
        }
    };

    useEffect( () => {
        getFileDetails( props.url );
    }, [props.url] );

    return (
        <button className="dxDownloadCard" onClick={( e ) => handleDownload( props.url, e )} onKeyDown={( e ) => handleDownload( props.url, e )}>
            <div className="dxDownloadCard__body">
                <div className="dxDownloadCard__info">
                    <div className="dxDownloadCard__icon">
                        {renderIcon( extension )}
                        {props.size && props.size !== "" ? (
                            <span data-testid="dc-file-size">{props.size}</span>
                        ) : null}
                    </div>
                    <div className="dxDownloadCard__name">
                        <p>
                            {props.fileName || fileName}
                        </p>
                    </div>
                </div>
                <div className="dxDownloadCard__download">
                    <i
                        data-testid="downloadCard__downloadIcon"
                        className={getIcon( props.icons, "download", "ci-Download" )}>
                    </i>
                </div>
            </div>
        </button>
    );
};

export default DXDownloadCard;
