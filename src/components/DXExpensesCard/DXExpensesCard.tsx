import "./DXExpensesCard.scss";
import DXButton from "../DXButton/DXButton";
import { IconButtonProps } from "../../utilities";
import React from "react";

export interface ExpensesCardProps {
    value: number;
    label: string;
    actionButton?: IconButtonProps;
    localeSetting?: string;
    type?: ( "complete" | "incomplete" );
    currencySymbol?: string;
    mobile?: boolean;
}

const DXExpensesCard = ( props: ExpensesCardProps ) => {
    // - States
    const DEFAULT_LOCALE = "en-US";

    const formatValue = ( value: number, localeSetting?: string ) => {
        let decimalSettings = { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 };
        return localeSetting ? value.toLocaleString( localeSetting, decimalSettings ) : value.toLocaleString( DEFAULT_LOCALE, decimalSettings );
    };

    const getTypeClass = () => {
        if ( props.type ) {
            return "dxExpensesCard--" + props.type;
        }
        return "dxExpensesCard--incomplete";
    };

    return (
        <div className={`dxExpensesCard ${getTypeClass()}${props.mobile ? ' dxExpensesCard--mobile' : ''}`}>
            <div className="dxExpensesCard__value">
                <p>{props.currencySymbol ? props.currencySymbol : "$"}{formatValue( props.value, props.localeSetting )}</p>
            </div>
            <div className="dxExpensesCard__label">
                <p>{props.label}</p>
            </div>
            {props.type === "complete" && props.actionButton &&
                <div className="dxExpensesCard__buttonContainer">
                    <DXButton
                        {...props.actionButton}
                    />
                </div>
            }
        </div>
    );
};

export default DXExpensesCard;
