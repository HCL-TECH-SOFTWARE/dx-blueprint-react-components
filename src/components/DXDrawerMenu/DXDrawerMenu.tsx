import "./DXDrawerMenu.scss";
import React, { useRef, useState } from "react";
import DXButton from "../DXButton/DXButton";
import { clickOutsideAlerter, renderOverlayElement } from "../../utilities";

export interface DrawerMenuProps {
    direction: "left" | "right",
    contentId: string,
    contentFunction?: Function,
    dark?: boolean;
    showOverlay?: boolean;
    iconClass?: string;
}
const DXDrawerMenu = ( props: DrawerMenuProps ) => {
    // Refs
    const parentRef = useRef( null );
    const buttonRef = useRef( null );

    clickOutsideAlerter( [parentRef, buttonRef], () => {
        setOpen( false );
    } );

    // States
    const [open, setOpen] = useState( false );
    const [overlayActive, setOverlayActive] = useState( false );

    let overlayId = "drawerMenu_overlay";
    let overlayClass = "dxDrawerMenu__overlay";

    const overlayCallback = () => {
        setOverlayActive( false );
    };

    // Styles functions
    const getContainerStyles = ( direction: "left" | "right" ) => {
        let styles: { [k: string]: any; } = { display: `${open ? "block" : "none"}`, };
        if ( direction === "right" ) {
            styles["right"] = "0";
            styles["borderRadius"] = "4px 0px 4px 4px";
        }
        if ( direction === "left" ) {
            styles["left"] = "0";
            styles["borderRadius"] = "0px 4px 4px 4px";
        }
        return styles;
    };

    const checkDarkMode = ( isDark: boolean | undefined ) => {
        if ( isDark ) {
            return `
            .dxDrawerMenu__button.dxButton.btn.btn-unstyled,
            .dxDrawerMenu__container{
                background-color: var(--dark-dark-d2);
                color: var(--light-white);
            }
            .dxDrawerMenu__button.dxButton.btn.btn-unstyled i {
                color: var(--light-white);
            }
            `;
        }
    };

    // Handlers
    const handleChange = ( e: any ) => {
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            e.preventDefault();
            setOpen( !open );
            setOverlayActive( !open );
            let container = document.querySelector( `.dxDrawerMenu .dxDrawerMenu__container` );
            if ( container?.childNodes.length === 0 ) {
                let insideContent = document.querySelector( props.contentId ) as HTMLElement;
                if ( insideContent !== null ) {
                    props.contentFunction?.();
                    container?.appendChild( insideContent );
                }
            }
        }
    };

    return (
        <div className="dxDrawerMenu" >
            <style>{checkDarkMode( props.dark )}</style>
            <DXButton
                displayType="unstyled"
                reactRef={buttonRef}
                className={`${props.direction === "right" ? "dxDrawerMenu__button dxDrawerMenu__buttonRight" : "dxDrawerMenu__button dxDrawerMenu__buttonLeft"}` + ( open ? " dxDrawerMenu__button--active" : "" )}
                data-testid="drawer-menu-button"
                onClick={handleChange}
                label="open-menu"
                hideLabel
                icon={{
                    class: props.iconClass || "ci-More_Grid_Big",
                    testId: "drawer-menu-icon"
                }} />
            <div className="dxDrawerMenu__container" ref={parentRef}
                style={getContainerStyles( props.direction )}
                data-testid="drawer-menu-container">
            </div>
            {
                props.showOverlay && renderOverlayElement( overlayId, overlayClass, overlayActive, overlayCallback )
            }
        </div>
    );
};

export default DXDrawerMenu;
