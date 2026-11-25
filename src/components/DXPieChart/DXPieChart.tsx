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

import React, { useEffect } from "react";
import "./DXPieChart.scss";
import { ChartItem, PieChart, PieChartItem } from "../../utilities";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface PieProps {
    index: number;
    data: ChartItem[];
    valueDecimals?: number;
    showNominal?: boolean;
    prefix?: string;
    suffix?: string;
}

const DXPieChart = ( props: ExtendableProps<PieProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { index: _index, data: _data, valueDecimals: _valueDecimals, showNominal: _showNominal, prefix: _prefix, suffix: _suffix, className, ref, ...rest } = props;

    //Calculating the percentage value of the pie chart
    let total = 0;
    let newData: PieChartItem[] = [];
    props.data.map( ( item ) => { total += item.value!; newData.push( { ...item, percent: 0 } ); } );
    newData.map( ( item ) => {
        item.percent = Number( ( item.value! / total * 100 ).toFixed( props.valueDecimals || 2 ) );
        return item;
    } );

    let pieChart = new PieChart( {
        data: newData,
        width: 1000,
        diagonalLineLenght: 80,
        diagonalLineOffset: 20,
        horizontalLineLenght: 25,
        showNominal: props.showNominal,
        prefix: props.prefix,
        suffix: props.suffix
    } );

    useEffect( () => {
        let container = document.getElementById( `#dxPieChart-${props.index}` );
        if ( container?.firstChild ) {
            container.removeChild( container.firstChild! );
        }
        container!.append(
            pieChart.svg.node()!
        );
    } );

    return (
        <div {...pickDomProps( rest )} ref={ref} id={`#dxPieChart-${props.index}`} className={classNames( "dxPieChart", className )} data-testid="dxPieChart-parent">
        </div>
    );
};

export default DXPieChart;
