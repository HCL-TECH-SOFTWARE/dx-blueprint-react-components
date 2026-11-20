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

import "./DXRiverOfContent.scss";
import React, { useState, useRef, useMemo } from "react";
import DXButton from "../DXButton/DXButton";
import { LinksProps, getIcon, getLinkTarget } from "../../utilities";
import { ExtendableProps, mergeRefs } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface RiverOfContentProps {
    index: number,
    header: string,
    links: LinksProps[],
    headerCharLimit?: number,
    itemCharLimit?: number,
    collapsible?: boolean,
    icons?: {
        link?: string;
    };
}

const DXRiverOfContent = ( props: ExtendableProps<RiverOfContentProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { index: _index, header: _header, links: _links, headerCharLimit: _headerCharLimit, itemCharLimit: _itemCharLimit, collapsible: _collapsible, icons: _icons, className, ref, ...rest } = props;
    const [open, setOpen] = useState( false );
    const componentRef = useRef<HTMLDivElement>( null );
    // The internal ref and the consumer ref both point at the root
    const mergedRootRef = useMemo( () => mergeRefs( componentRef, ref ), [ref] );
    const buttonRef = useRef<HTMLButtonElement>( null );
    const contentRef = useRef<HTMLDivElement>( null );

    const getHeaderCharLimit = () => props.headerCharLimit && props.headerCharLimit > 0 ? props.headerCharLimit : 43;
    const getItemCharLimit = () => props.itemCharLimit && props.itemCharLimit > 0 ? props.itemCharLimit : 93;

    const showContent = ( e: any ) => {
        e.preventDefault();
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            setOpen( !open );
            const component = componentRef.current;
            component?.classList.toggle( "dxRiverContent--open" );
            const icon = buttonRef.current?.querySelector( "i" );
            if ( icon && icon !== null ) icon?.classList.toggle( "dxRiverContent__icon--open" );
            const content = contentRef.current;
            content?.classList.toggle( "dxRiverContent__items--active" );
        }
    };

    const verifyTextOverflow = ( label: string, header: boolean ) => {
        if ( header ) {
            return label.length > getHeaderCharLimit() ? 'dxRiverContent__header--overflow' : '';
        } else {
            return label.length > getItemCharLimit() ? 'dxRiverContent__items--overflow' : '';
        }
    };

    const truncateText = ( label: string, limit: number ) => {
        if ( label.length <= limit ) {
            return label;
        }

        return `${label.slice( 0, limit ).replace( /\s+$/, "" )}...`;
    };

    const renderLinks = () => {
        if ( props.links && props.links.length > 0 ) {
            let linksToBeRendered: any[] = [];
            if ( props.links.length <= 4 ) {
                linksToBeRendered = [...props.links];
            } else {
                linksToBeRendered = props.links.slice( 0, 4 );
            }
            return (
                <ul>
                    {
                        linksToBeRendered.map( ( link, index ) => (
                            <li key={index} data-testid="river-content-item" className="dxRiverContent__item">
                                <a
                                    href={link.url}
                                    target={getLinkTarget( link.target )}
                                    aria-label={link.label}
                                    className={`dxRiverContent__itemLink ${verifyTextOverflow( link.label, false )}`}>{truncateText( link.label, getItemCharLimit() )}</a>
                            </li>
                        ) )
                    }
                </ul>
            );
        } else {
            return (
                <p>No links received</p>
            );
        }
    };

    return (
        <div {...rest} ref={mergedRootRef} className={classNames( "dxRiverContent", className )} id={`dxRiverContent-${props.index}`}>
            <div className={"dxRiverContent__header " + verifyTextOverflow( props.header, true )} >
                {
                    props.collapsible ? (
                        <DXButton
                            type="button"
                            onClick={showContent}
                            ariaExpanded={open}
                            label={props.header}
                            reactRef={buttonRef}
                            icon={{
                                class: getIcon( props.icons, "link", 'ci-Caret_Down_MD' ),
                                testId: "river-header-icon",
                                position: "right"
                            }} />
                    ) : (
                        <h3>
                            {props.header}
                        </h3>
                    )
                }
            </div>
            <div className={props.collapsible ? "dxRiverContent__items" : "dxRiverContent__items dxRiverContent__items--active"} ref={contentRef}>
                {renderLinks()}
            </div>
        </div>
    );
};

export default DXRiverOfContent;
