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

import React, { useEffect, useState } from "react";
import "./DXModalWindows.scss";
import { IconButtonProps, ImageProps, parseContentAndMedia } from "../../utilities";
import Modal from 'react-bootstrap/Modal';
import DXButton, { DisplayType } from "../DXButton/DXButton";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface ModalWindowsProps {
    index: number,
    openModal?: boolean,
    title: string,
    text?: string,
    image?: ImageProps,
    primaryButton?: IconButtonProps,
    secondaryButton?: IconButtonProps,
    unstyledButton?: IconButtonProps,
    type?: Status,
    size?: Size,
    disableDisplayFlex?: boolean,
}
export declare type Size = 'full-screen' | 'lg' | 'sm' | undefined;
export declare type Status = 'danger' | 'info' | 'success' | 'warning' | undefined;

/**
 * `className`, `ref` and extra props go to the wrapper `div` (the modal itself is rendered by react-bootstrap in a portal,
 * so it is not the root).
 */
const DXModalWindows = ( props: ExtendableProps<ModalWindowsProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { index, openModal, title, text, image, primaryButton, secondaryButton, unstyledButton, type, size, disableDisplayFlex, className, ref, ...rest } = props;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);


    useEffect( () => {
        const checkIfClickedOutside = (e: Event) => {
            e.stopPropagation()
            setShow( true );
        };

        window.addEventListener( 'open-modal-' + props.index, (e) => checkIfClickedOutside(e) );
        return () => {
            window.removeEventListener( 'open-modal-' + props.index, (e) => checkIfClickedOutside(e) );
        };
    }, [] );

    useEffect( () => {
        if ( props.openModal === true ) {
            setShow( true );
        } else {
            setShow( false );
        }
    }, [props.openModal] );

    const secondaryAction = () => {
        setShow( false );
        if ( props.secondaryButton?.onClick ) {
            let secondaryFn = props.secondaryButton.onClick as Function;
            secondaryFn();
        }
    };

    const primaryAction = () => {
        setShow( false );
        if ( props.primaryButton?.onClick ) {
            let primaryFn = props.primaryButton.onClick as Function;
            primaryFn();
        }
    };

    const unstyledAction = () => {
        setShow ( false );
        if ( props.unstyledButton?.onClick ) {
            let unstyledFn = props.unstyledButton.onClick as Function;
            unstyledFn();
        }
    };

    const renderButtons = () => {
        const buttons = [];
        if ( props.unstyledButton ) {
            let unstyleProps = {
                ...props.unstyledButton,
                "data-testid": "moreInfo-button",
                displayType: "unstyled" as DisplayType,
                onClick: unstyledAction
            };
            buttons.push( <DXButton key={0} {...unstyleProps} /> );
        }
        if ( props.secondaryButton ) {
            let secondProps = {
                ...props.secondaryButton,
                "data-testid": "cancel-button",
                displayType: "secondary" as DisplayType,
                onClick: secondaryAction
            };
            buttons.push( <DXButton key={1} {...secondProps} /> );
        }
        if ( props.primaryButton ) {
            let primProps = {
                ...props.primaryButton,
                "data-testid": "done-button",
                onClick: primaryAction
            };
            buttons.push( <DXButton key={2} {...primProps} /> );
        }
        return buttons;
    };

    const renderModal = ( type: Status | undefined, size: Size | undefined ) => {
        let classIframe = props.text?.includes( '<iframe' ) ? "modal-body-iframe" : "";
        let classNotDisplayFlex = props.disableDisplayFlex ? "dxModalWindows__notDisplayFlex" : "";
        let modalSize: any;
        let fullScreen: any = false;

        if( size == "full-screen" ){
            modalSize = undefined;
            fullScreen = true;
        } else {
            modalSize = size;
        }
        

        return (
            <Modal 
                className="dxModalWindows__modal"
                onHide={ handleClose }
                show={ show }
                size={ modalSize } 
                fullscreen= {fullScreen }
                aria-label="modal windows"
                data-testid="modal-windows"
            >
                <Modal.Header className={`dxModalWindows__header ${ type ? "dxModalWindows__header--" + type : "" }`}>
                    <Modal.Title>
                            <span>{ props.title }</span>
                            <i tabIndex={0} className="ci-Close_MD" onClick={ handleClose }></i> 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                        className={`dxModalWindows__content ${classIframe} ${classNotDisplayFlex}`}
                        aria-label="body modal windows"
                    >
                        {props.image && <img data-testid="modal-image" src={props.image?.url} alt={props.image.altText ? props.image?.altText : `${props.title} modal image`} />}
                        {props.text && <div className="dxModalWindows__text">{parseContentAndMedia( props.text, false )}</div>}
                </Modal.Body>
                {( props.secondaryButton || props.primaryButton || props.unstyledButton ) && (
                    <Modal.Footer
                        className="dxModalWindows__footer"
                    >
                        <div className="dxModalWindows__toolbar">
                            {renderButtons()}
                        </div>
                    </Modal.Footer>
                )}
            </Modal>
        );
    };

    return (
        <div {...pickDomProps( rest )} ref={ref} className={classNames( "dxModalWindows", className )} id={"dxModalWindows-" + props.index}>
            { renderModal( props.type, props.size )}
        </div >
    );
};
export default DXModalWindows;
