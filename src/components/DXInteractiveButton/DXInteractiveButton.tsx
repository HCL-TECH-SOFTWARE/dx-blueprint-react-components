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

import React, { FormEventHandler, useEffect, useState } from "react";
import "./DXInteractiveButton.scss";
import DXButton from "../DXButton/DXButton";
import { IconButtonProps } from "../../utilities";

export interface InteractiveButtonProps {
    active: IconButtonWithMessage;
    inactive: IconButtonWithMessage;
    disabled?: boolean;
    isActive?: boolean;
}

interface IconButtonWithMessage extends IconButtonProps {
    message: string;
}

export interface PopUpMessageProps {
    active: string;
    inactive: string;
}

const DXInteractiveButton = ( props: InteractiveButtonProps ) => {
    const [activeStatus, setActiveStatus] = useState( props.isActive ? props.isActive : false );
    const [showMessage, setShowMessage] = useState( false );

    // changes button activeStatus, shows animation of popUpMessage
    const onButtonClick = () => {
        setActiveStatus( !activeStatus );
        setShowMessage( true );
    };

    // starts timer after message is shown and cleans it if operation is interrupted
    useEffect( () => {
        let timeoutId: NodeJS.Timeout;
        if ( showMessage ) {
            timeoutId = setTimeout( () => {
                setShowMessage( false );
            }, 1000 );
        }

        return () => {
            clearTimeout( timeoutId );
        };
    }, [showMessage] );

    // handles icon/label layout, returns label with icon (left or right), or just label
    const getIcon = () => {
        let status = activeStatus ? props.active : props.inactive;
        type positionType = "left" | "right" | undefined;
        if ( !status.icon ) return undefined;
        let position = "" as positionType;
        switch ( status.icon.position ) {
            case "left":
                position = "left";
                break;
            case "right":
                position = "right";
                break;
            default:
                position = "right";
                break;
        }
        return {
            class: `${status.icon.class} dxInteractiveButton__icon`,
            testId: "ib-icon",
            position: position
        };
    };

    const handleClick = ( e: React.FormEvent<HTMLInputElement> ) => {
        onButtonClick();
        if ( activeStatus && props.active.onClick ) {
            let activeFn = props.active.onClick as FormEventHandler;
            activeFn( e );
        } else if ( props.inactive.onClick ) {
            let inactiveFn = props.inactive.onClick as FormEventHandler;
            inactiveFn( e );
        }
    };

    const checkHideLabel = () => {
        let status = activeStatus ? props.active : props.inactive;
        return status.hideLabel;
    };

    return (
        <div className="dxInteractiveButton">
            <div className="dxInteractiveButton__messageContainer">
                <div
                    hidden={props.disabled}
                    className={
                        "dxInteractiveButton__message " +
                        (
                            showMessage
                                ? "dxInteractiveButton__message--display"
                                : "dxInteractiveButton__message--hidden"
                        )
                    }
                    data-testid="ib-message"
                >
                    <b>{activeStatus ? props.active.message : props.inactive.message}</b>
                </div>
            </div>
            <DXButton
                label={activeStatus ? props.active.label : props.inactive.label}
                disabled={props.disabled}
                displayType="unstyled"
                className={activeStatus ? "dxInteractiveButton--active" : ""}
                onClick={( e: React.FormEvent<HTMLInputElement> ) => handleClick( e )}
                hideLabel={checkHideLabel()}
                icon={getIcon()}
            />
        </div>
    );
};

export default DXInteractiveButton;
