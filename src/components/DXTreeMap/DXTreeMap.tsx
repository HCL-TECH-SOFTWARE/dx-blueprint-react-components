import React, { useEffect, useState } from "react";
import "./DXTreeMap.scss";
import { TreeMapChart, TreeMapChartItem } from "../../utilities/chart";
import DXToggleMenu from "../DXToggleMenu/DXToggleMenu";

export interface TreeMapProps {
    index: number;
    data: TreeMapChartItem,
    hideFilters?: boolean;
}

const DXTreeMap = ( props: TreeMapProps ) => {
    // States
    const [chartData, setChartData] = useState<any>( props.data );
    const [filters, setFilters] = useState<any>( [] );
    const [chartDepth, setChartDepth] = useState( 0 );

    // Filters logic
    const getFilters = () => {
        let allData = chartData.children;
        let allValues = new Set();
        allData.forEach( ( child: any ) => {
            child.children.forEach( ( item: any ) => {
                if ( item.hasOwnProperty( "name" ) ) {
                    allValues.add( item.name );
                }
            } );
        } );
        let buttons = Array.from( allValues ).map( ( item: any ) => {
            return {
                label: item,
                displayType: "primary",
                handleClick: filterData
            };
        } );
        let allBtn = {
            label: "All",
            displayType: "primary",
            handleClick: filterData
        };
        setFilters( [allBtn, ...buttons] );
    };

    const filterData = ( label: string ) => {
        if ( label !== "All" ) {
            let allData = props.data.children;
            const matches = allData?.map( ( item: any ) => {
                let childsMatched: any = [];
                item.children.forEach( ( child: any ) => {
                    if ( child.hasOwnProperty( "name" ) && child.name === label ) {
                        childsMatched.push( ...child.children );
                    };
                } );
                if ( childsMatched.length > 0 ) {
                    return { ...item, children: childsMatched };
                }
            } );
            let newData = { ...chartData, children: matches };
            setChartData( { ...newData } );
        } else {
            setChartData( { ...props.data } );
        }
    };

    const checkDepth = ( depth: number ) => {
        setChartDepth( depth );
        let toggleMenu = document.querySelectorAll( ".dxTreeMap__filter .dxToggleMenu .btn" );
        if ( toggleMenu !== null ) {
            toggleMenu.forEach( ( button: any ) => {
                if ( depth > 0 ) {
                    button.disabled = true;
                } else {
                    button.disabled = false;
                }
            } );
        }
    };

    useEffect( () => {
        if ( !props.hideFilters ) {
            getFilters();
        } else {
            return;
        }
    }, [props.data] );

    useEffect( () => {
        // Chart logic
        let treeMapChart = new TreeMapChart( {
            data: chartData,
            width: 500,
            depthFn: checkDepth
        } );
        let container = document.querySelector( `#dxTreeMap-${props.index}` );
        if ( container?.firstChild ) {
            container.removeChild( container.firstChild! );
        }
        container!.append(
            treeMapChart.svg.node()!
        );
    }, [chartData] );

    return (
        <div className="dxTreeMap">
            {!props.hideFilters &&
                <div className="dxTreeMap__filter" data-testid="dxTreeMap-filter">
                    <DXToggleMenu buttons={filters} type="single" />
                </div>
            }
            <div className="dxTreeMap__chart" id={`dxTreeMap-${props.index}`} data-testid="dxTreeMap-parent"></div>
        </div >
    );
};
export default DXTreeMap;
