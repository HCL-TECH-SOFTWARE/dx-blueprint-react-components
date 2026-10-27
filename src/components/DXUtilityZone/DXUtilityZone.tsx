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
import "./DXUtilityZone.scss";
import React, { useEffect, useRef, useState } from "react";
import DXToolButton, { ToolButtonProps } from "../DXToolButton/DXToolButton";
import { createRoot, Root } from 'react-dom/client';
import { clickOutsideAlerter, renderOverlayElement } from "../../utilities";

interface UtilityItem extends ToolButtonProps {
    contentId: string,
    contentFunction?: Function;
}

export interface UtilityZoneProps {
    items: UtilityItem[];
    panelsContainerId?: string;
    showOverlay?: boolean;
    enableIconPanels?: boolean;
}
const DXUtilityZone = ( { items, panelsContainerId, showOverlay, enableIconPanels = true }: UtilityZoneProps ) => {

    // Refs
    const parentRef = useRef( null );
    const panelsRef = useRef( null );
    const panelsRootRef = useRef<{ container: Element; root: Root; } | null>( null );

    clickOutsideAlerter( [parentRef, panelsRef], () => {
        setActive( -1 );
        setShowPanels( false );
    } );

    // States
    const [active, setActive] = useState( -1 );
    const [showPanels, setShowPanels] = useState( false );
    const [overlayActive, setOverlayActive] = useState( false );

    let overlayId = "utilityZone__overlay";
    let overlayClass = "dxUtilityZone__overlay";
    const overlayCallback = () => {
        setOverlayActive( false );
    };

    // Handlers
    const handleOpen = ( index: number ) => {
        if ( index === active ) {
            setShowPanels( false );
            setActive( -1 );
        } else {
            setShowPanels( true );
            setOverlayActive( true );
            let panel = document.querySelector( `#panel-${index}` );
            if ( panel?.childNodes.length === 0 ) {
                let insideContent = document.querySelector( items[index].contentId ) as HTMLElement;
                if ( insideContent !== null ) {
                    items[index].contentFunction?.();
                    panel?.appendChild( insideContent );
                }
            }
            setActive( index );
        }
    };

    // Render Methods
    const renderItems = ( items: ToolButtonProps[] ) => {
        const adjustedItems = items.map( ( item: ToolButtonProps, index: number ) => {
            return {
                ...item,
                ...( enableIconPanels ? { onClick: () => handleOpen( index ) } : {} )
            };
        } );

        return ( <div className="dxUtilityZone__buttonsContainer">
            {adjustedItems.map( ( item: ToolButtonProps, key: number ) => (
                <div key={key} data-testid="utility-zone-item" className={key === active ? "dxUtilityZone__item active" : "dxUtilityZone__item"}>
                    <DXToolButton {...item} />
                    <div className={key === active ? "dxUtilityZone__indicator" : "d-none"} data-testid="utility-zone-indicator"></div>
                </div>
            ) )}
        </div> );
    };

    const renderPanels = ( items: ToolButtonProps[] ) => {
        return items.map( ( item: ToolButtonProps, key: number ) => (
            <div id={`panel-${key}`} className={key === active ? "dxUtilityZone__panel" : "d-none"} key={key}></div>
        ) );
    };

    useEffect( () => {

        if ( panelsContainerId ) {
            let panelsElement = React.createElement( "div",
                {
                    ref: panelsRef,
                    className: showPanels ? "dxUtilityZone__panelsContainer expanded" : "dxUtilityZone__panelsContainer"
                },
                //div necessary for the animation
                <div>
                    {renderPanels( items )}
                </div>

            );

            const panelsContainer = document.getElementById( panelsContainerId );
            if ( panelsContainer && panelsElement ) {
                if ( !panelsRootRef.current || panelsRootRef.current.container !== panelsContainer ) {
                    panelsRootRef.current = { container: panelsContainer, root: createRoot( panelsContainer ) };
                }
                panelsRootRef.current.root.render( panelsElement );
            } else if ( !panelsContainer ) {
                console.warn( "The DXUtilitiZone Component is not able to render the utility panels because the given panelsContainerId value does not match any HTML element" );
            }
        }

    } );

    return (
        <div className="dxUtilityZone">
            <div ref={parentRef}>
                {renderItems( items )}
            </div>
            {
                !panelsContainerId && enableIconPanels &&
                <div className={showPanels ? "dxUtilityZone__panelsContainer expanded" : "dxUtilityZone__panelsContainer"} data-testid="utility-zone-panels">
                    {/* div necessary for the animation */}
                    <div>
                        {renderPanels( items )}
                    </div>
                </div>
            }
            {showOverlay && renderOverlayElement( overlayId, overlayClass, overlayActive, overlayCallback )}

        </div>
    );
};

export default DXUtilityZone;
