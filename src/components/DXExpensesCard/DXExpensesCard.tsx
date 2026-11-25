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

import "./DXExpensesCard.scss";
import DXButton from "../DXButton/DXButton";
import { IconButtonProps } from "../../utilities";
import React from "react";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface ExpensesCardProps {
    value: number;
    label: string;
    actionButton?: IconButtonProps;
    localeSetting?: string;
    type?: ( "complete" | "incomplete" );
    currencySymbol?: string;
    mobile?: boolean;
}

const DXExpensesCard = ( props: ExtendableProps<ExpensesCardProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { value: _value, label: _label, actionButton: _actionButton, localeSetting: _localeSetting, type: _type, currencySymbol: _currencySymbol, mobile: _mobile, className, ref, ...rest } = props;
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
        <div {...pickDomProps( rest )} ref={ref} className={classNames( `dxExpensesCard ${getTypeClass()}${props.mobile ? ' dxExpensesCard--mobile' : ''}`, className )}>
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
