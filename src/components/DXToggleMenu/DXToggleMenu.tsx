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

import React, { ButtonHTMLAttributes, useState } from 'react';
import "./DXToggleMenu.scss";
import DXButton from '../DXButton/DXButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface ButtonProps {
    label: string,
    disabled?: boolean,
    displayType?: ButtonHTMLAttributes<HTMLButtonElement> | any,
    handleClick?: Function;
}

export interface ToggleMenuProps {
    buttons: ButtonProps[],
    vertical?: boolean,
    type?: 'single' | 'multi';
    activeIndexes?: number[];
}

const DXToggleMenu = ( props: ExtendableProps<ToggleMenuProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { buttons, vertical, type, activeIndexes, className, ref, ...rest } = props;
    const [selectedButton, setSelectedButton] = useState( props.activeIndexes ? [...props.activeIndexes] : [] );

    const getButtonClassName = ( index: number ) => {
        const selectionClass = selectedButton.indexOf( index ) !== -1
            ? "dxToggleMenu__button--selected"
            : "dxToggleMenu__button--unselected";

        return `dxToggleMenu__button ${selectionClass}`;
    };

    const handleSelectedButton = ( index: number, e: any ) => {
        setSelectedButton( [index] );
        let buttonClicked = props.buttons[index];
        if ( buttonClicked.handleClick !== undefined ) {
            buttonClicked.handleClick( buttonClicked.label, e.currentTarget.classList, e.currentTarget );
        }
    };

    const renderButtons = ( buttons: ButtonProps[], type: string | undefined ) => {
        if ( type && type === "multi" ) {
            return (
                buttons.map( ( button: ButtonProps, index: number ) => {
                    const handleMultipleSelectedButtons = ( buttonClicked: ButtonProps, e: any, index: number ) => {
                        let newButtons: number[] = [];
                        if ( selectedButton.indexOf( index ) === -1 ) newButtons = [...selectedButton, index];
                        else {
                            newButtons = selectedButton.filter( button => button !== index );
                        }

                        setSelectedButton( [...newButtons] );
                        if ( buttonClicked.handleClick ) {
                            buttonClicked.handleClick( buttonClicked.label, e.currentTarget.classList, e.currentTarget );
                        }
                    };
                    return (
                        <DXButton
                            label={button.label}
                            key={index}
                            className={getButtonClassName( index )}
                            displayType={selectedButton.indexOf( index ) !== -1 ? "primary" : "secondary"}
                            disabled={button.disabled ? button.disabled : false}
                            onClick={( e: any ) => handleMultipleSelectedButtons( button, e, index )}
                            data-testid="toggleMenuButton"
                        />
                    );
                } )
            );
        } else {
            return (
                buttons.map( ( button: ButtonProps, index: number ) => {
                    return (
                        <DXButton
                            key={index}
                            label={button.label}
                            className={getButtonClassName( index )}
                            displayType={selectedButton.indexOf( index ) !== -1 ? "primary" : "secondary"}
                            disabled={button.disabled ? button.disabled : false}
                            onClick={( event: any ) => { handleSelectedButton( index, event ); }}
                            data-testid="toggleMenuButton"
                        />
                    );
                } )
            );
        }
    };

    return (
        <ButtonGroup
            {...pickDomProps( rest )}
            ref={ref}
            data-testid="toggleMenu"
            className={classNames( "dxToggleMenu", className )}
            vertical={props.vertical ? props.vertical : false}>
            {renderButtons( props.buttons, props.type )}
        </ButtonGroup>
    );
};

export default DXToggleMenu;
