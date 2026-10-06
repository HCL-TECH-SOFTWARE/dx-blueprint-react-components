import React, { useEffect } from "react";
import "./DXPieChart.scss";
import { ChartItem, PieChart, PieChartItem } from "../../utilities";

export interface PieProps {
    index: number;
    data: ChartItem[];
    valueDecimals?: number;
    showNominal?: boolean;
    prefix?: string;
    suffix?: string;
}

const DXPieChart = ( props: PieProps ) => {

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
        <div id={`#dxPieChart-${props.index}`} className="dxPieChart" data-testid="dxPieChart-parent">
        </div>
    );
};

export default DXPieChart;
