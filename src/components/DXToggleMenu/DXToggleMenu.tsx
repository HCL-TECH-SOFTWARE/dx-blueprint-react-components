import React, { ButtonHTMLAttributes, useState } from 'react';
import "./DXToggleMenu.scss";
import DXButton from '../DXButton/DXButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

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

const DXToggleMenu = ( props: ToggleMenuProps ) => {
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
            data-testid="toggleMenu"
            className="dxToggleMenu"
            vertical={props.vertical ? props.vertical : false}>
            {renderButtons( props.buttons, props.type )}
        </ButtonGroup>
    );
};

export default DXToggleMenu;
