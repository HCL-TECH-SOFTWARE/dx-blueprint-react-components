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

import React, { useEffect, useState } from 'react';
import "./DXDashboardCard.scss";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface DashboardCardProps {
    index: number,
    data: string,
    label: string,
    onClick?: Function,
    mainIcon?: string,
    secondaryIcon?: string;
}

const DXDashboardCard = ( props: ExtendableProps<DashboardCardProps, "button"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { index: _index, data: _data, label: _label, onClick: _onClick, mainIcon: _mainIcon, secondaryIcon: _secondaryIcon, className, ref, ...rest } = props;
    const MAX_DATA_CHARS = 5;

    const [smallCard, setSmallCard] = useState( '' );
    const [dataMax, setDataMax] = useState( '' );

    useEffect( () => {
        setDataMax( props.data.substring( 0, MAX_DATA_CHARS ) );
        if ( !props.mainIcon && !props.secondaryIcon ) {
            setSmallCard( '--small' );

        } else {
            setSmallCard( '' );
        }
    }, [props] );

    return (
        <button {...pickDomProps( rest )} ref={ref} id={`dxDashboardCard-${props.index}`} className={classNames( `dxDashboardCard${smallCard}`, className )} onClick={() => { props.onClick && props.onClick(); }} data-testid="dx-dashboard-card">
            <p className={`dxDashboardCard${smallCard}__data`} data-testid="dx-dashboard-card-number"> {dataMax}
                {props.mainIcon && <i className={props.mainIcon} data-testid="dx-dashboard-card-number-icon"></i>}
            </p>
            <div className={`dxDashboardCard${smallCard}--labelContainer`} >
                <p className={`dxDashboardCard${smallCard}__label`} data-testid="dx-dashboard-card-label"> {props.label}</p>
                {props.secondaryIcon && <i className={props.secondaryIcon} data-testid="dx-dashboard-card-label-icon"></i>}
            </div>
        </button>
    );
};

export default DXDashboardCard;
