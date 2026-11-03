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

import * as d3 from "d3";

export interface ChartItem {
    value?: number;
    name: string;
    color?: string;
}

export interface PieChartItem extends ChartItem {
    percent: number;
}

export interface TreeMapChartItem extends ChartItem {
    group?: string;
    children?: TreeMapChartItem[];
}

export interface PieChartInit {
    data: PieChartItem[];
    width: number;
    diagonalLineLenght: number;
    diagonalLineOffset: number;
    horizontalLineLenght: number;
    showNominal?: boolean;
    prefix?: string;
    suffix?: string;
}

export interface TreeMapChartInit {
    data: TreeMapChartItem;
    width: number;
    depthFn: Function;
}

export class Chart {
    defaultColors: any;
    svg: d3.Selection<SVGSVGElement, any, any, any>;
    data: PieChartItem[] | TreeMapChartItem;

    constructor( data: ChartItem[] | ChartItem, width: number, chartType: string ) {
        if ( chartType === "treemap" ) {
            let height = width;
            this.data = data as TreeMapChartItem;
            this.svg = d3.create( "svg" )
                .attr( "viewBox", [0.5, -50.5, width, height + 50] )
                .attr( "width", width )
                .attr( "height", height + 50 );

            this.defaultColors = d3.scaleOrdinal()
                .domain( this.data.children ? this.data.children.map( d => d.name ) : this.data.name )
                .range( d3.quantize( t => d3.interpolateSpectral( t * 0.8 + 0.1 ), this.data.children ? this.data.children.length : 1 ).reverse() );
        } else {
            let height = Math.min( width, 500 );
            this.data = data as PieChartItem[];
            this.svg = d3.create( "svg" )
                .attr( "width", width )
                .attr( "height", height )
                .attr( "viewBox", [-( width ) / 2, -( height ) / 2, width, height] );

            this.defaultColors = d3.scaleOrdinal()
                .domain( this.data.map( d => d.name ) )
                .range( d3.quantize( t => d3.interpolateSpectral( t * 0.8 + 0.1 ), this.data.length ).reverse() );
        }
    }

    getPieColor( d: d3.PieArcDatum<ChartItem> ) {
        return d.data.color || this.defaultColors( d.data.name ) as string;
    }

    getTreeMapColor( d: d3.HierarchyRectangularNode<TreeMapChartItem> ) {
        if ( d.hasOwnProperty( "depth" ) && d.depth === 0 ) return "var(--light-white)";
        return d.data.color || this.defaultColors( d.data.name ) as string;
    }
}

export class PieChart extends Chart {
    data: PieChartItem[];
    radius: number;
    pie: d3.Pie<any, PieChartItem>;
    arc: d3.Arc<any, any>;
    showNominal: boolean;
    prefix: string;
    suffix: string;

    constructor( init: PieChartInit ) {
        super( init.data, init.width, "pie" );
        this.data = init.data;
        const height = Math.min( init.width, 500 );
        this.radius = Math.min( init.width, height ) / 2;
        this.showNominal = init.showNominal || false;
        this.prefix = init.prefix || "";
        this.suffix = init.suffix || "";

        this.pie = d3.pie<any, PieChartItem>()
            .padAngle( 1 / this.radius )
            .sort( null )
            .value( d => d.percent );

        this.arc = d3.arc();
        this.renderBackgroundArc( 0, 0.8 );
        this.renderArc( 0.4, 0.7 );
        this.renderLine( init.diagonalLineOffset, init.diagonalLineLenght, init.horizontalLineLenght );
        this.renderLabels( init.diagonalLineLenght );
    }

    midAngle( d: d3.PieArcDatum<ChartItem> ) {
        let mid = d.startAngle + ( d.endAngle - d.startAngle ) / 2;
        return mid;
    }

    //Get the angle perpendicular to the mid angle
    midAngleP( d: d3.PieArcDatum<ChartItem> ) {
        let mid = d.startAngle + ( d.endAngle - d.startAngle ) / 2;
        mid = mid - Math.PI / 2;
        return mid;
    }

    renderArc( innerRadiusPercent: number, outerRadiusPercent: number ) {
        this.arc = d3.arc()
            .innerRadius( this.radius * innerRadiusPercent )
            .outerRadius( this.radius * outerRadiusPercent );

        this.svg.append( "g" )
            .selectAll()
            .data( this.pie( this.data ) )
            .join( "path" )
            .attr( "fill", ( d ) => this.getPieColor( d ) )
            .attr( "d", this.arc )
            .append( "title" )
            .text( ( d: d3.PieArcDatum<any> ) => `${d.data.name}: ${d.data.percent.toString()}` );
    }

    renderBackgroundArc( innerRadiusPercent: number, outerRadiusPercent: number ) {
        const backgroundArc = d3.arc<any>()
            .innerRadius( this.radius * innerRadiusPercent )
            .outerRadius( this.radius * outerRadiusPercent );

        this.svg.append( "g" )
            .selectAll()
            .data( this.pie( [{ value: 1, name: "background", percent: 100 }] ) )
            .join( "path" )
            .attr( "fill", "var(--light-white)" )
            .attr( "d", backgroundArc );
    }

    renderLine( centerOffset: number, lineLenght: number, horizontalLineLenght: number ) {
        //Render diagonal line
        this.svg.append( "g" )
            .attr( "stroke-dasharray", "2,2" )
            .attr( "stroke-width", "2" )
            .attr( "stroke", "var(--dark-dark)" )
            .selectAll()
            .data( this.pie( this.data ) )
            .join( "line" )
            //Substract PI/2 radians (90º) to the arc angle to make the line perpendicular to the arc
            .attr( "x1", d => this.arc.centroid( d )[0] + ( centerOffset * Math.cos( this.midAngleP( d ) ) ) )
            .attr( "y1", d => this.arc.centroid( d )[1] + ( centerOffset * Math.sin( this.midAngleP( d ) ) ) )
            .attr( "x2", d => this.arc.centroid( d )[0] + ( lineLenght * Math.cos( this.midAngleP( d ) ) ) )
            .attr( "y2", d => this.arc.centroid( d )[1] + ( lineLenght * Math.sin( this.midAngleP( d ) ) ) );

        //Render Horizontal Line
        this.svg.append( "g" )
            .attr( "stroke-dasharray", "2,2" )
            .attr( "stroke", "var(--dark-dark)" )
            .attr( "stroke-width", "2" )
            .selectAll()
            .data( this.pie( this.data ) )
            .join( "line" )
            .attr( "x1", d => this.arc.centroid( d )[0] + ( lineLenght * Math.cos( this.midAngleP( d ) ) ) )
            .attr( "y1", d => this.arc.centroid( d )[1] + ( lineLenght * Math.sin( this.midAngleP( d ) ) ) )
            .attr( "x2", d => this.arc.centroid( d )[0] + ( lineLenght * Math.cos( this.midAngleP( d ) ) ) + horizontalLineLenght * Math.cos( this.midAngleP( d ) ) )
            .attr( "y2", d => this.arc.centroid( d )[1] + ( lineLenght * Math.sin( this.midAngleP( d ) ) ) );
    }

    renderLabels( lineLenght: number ) {
        const namePaddingTop = 24;
        const valuePaddingBottom = 0;
        const nominalPaddingBottom = 42;
        const textPaddingLeft = 50;

        this.svg.append( "g" )
            .attr( "font-family", "sans-serif" )
            .attr( "font-size", 12 )
            .attr( "text-anchor", "middle" )
            .selectAll()
            .data( this.pie( this.data ) )
            .join( "text" )
            .attr( "transform", d => `translate(${this.arc.centroid( d )})` )
            //SEGMENT NAME LABELS
            .call( text => text.append( "tspan" )
                .attr( "class", "dxPieChart__name" )
                .attr( "x", d => {
                    return ( lineLenght * Math.cos( this.midAngleP( d ) ) ) + textPaddingLeft * Math.cos( this.midAngleP( d ) );
                } )
                .attr( "y", d => ( lineLenght * Math.sin( this.midAngleP( d ) ) ) + namePaddingTop )
                .attr( "text-anchor", d => this.midAngle( d ) < Math.PI ? "start" : "end" )
                .text( d => d.data.name ) )
            //SEGMENT VALUE labels
            .call( text => text.append( "tspan" )
                .attr( "class", "dxPieChart__value" )
                .attr( "fill", ( d ) => this.getPieColor( d ) )
                .attr( "x", d => {
                    return ( lineLenght * Math.cos( this.midAngleP( d ) ) ) + textPaddingLeft * Math.cos( this.midAngleP( d ) );
                } )
                .attr( "text-anchor", d => this.midAngle( d ) < Math.PI ? "start" : "end" )
                .attr( "y", d => ( lineLenght * Math.sin( this.midAngleP( d ) ) ) - valuePaddingBottom )
                .text( d => {
                    return d.data.percent.toString() + "%";
                } )
            ).call( text => {
                if ( this.showNominal ) {
                    return ( text.append( "tspan" )
                        .attr( "class", "dxPieChart__nominal" )
                        .attr( "x", d => {
                            return ( lineLenght * Math.cos( this.midAngleP( d ) ) ) + textPaddingLeft * Math.cos( this.midAngleP( d ) );
                        } )
                        .attr( "y", d => ( lineLenght * Math.sin( this.midAngleP( d ) ) ) + nominalPaddingBottom )
                        .attr( "text-anchor", d => this.midAngle( d ) < Math.PI ? "start" : "end" )
                        .text( d => {
                            return `( ${this.prefix}${d.data.value?.toString()}${this.prefix ? "" : this.suffix} )`;
                        } )
                    );
                }
            } );
    }
}

export class TreeMapChart extends Chart {
    x: d3.ScaleLinear<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
    root: d3.HierarchyRectangularNode<TreeMapChartItem>;
    group: any;
    width: number;
    height: number;
    depth: number;
    titleHeight: number;

    constructor( init: TreeMapChartInit ) {
        super( init.data, init.width, "treemap" );

        // Set Dimensions
        this.width = init.width;
        this.height = init.width;
        this.depth = 0;
        this.titleHeight = 50;

        // Create the scales.
        this.x = d3.scaleLinear().rangeRound( [0, this.width] );
        this.y = d3.scaleLinear().rangeRound( [0, this.height] );

        const setFormat = ( d: d3.HierarchyRectangularNode<TreeMapChartItem> ) => {
            let finalValue = `${d.value?.toString()}`;
            if ( d.parent?.value && d.value ) {
                finalValue += ` (${`${Math.ceil( ( d.value * 100 ) / d.parent.value )}%`})`;
            }
            return finalValue;
        };

        const setName = ( d: d3.HierarchyRectangularNode<TreeMapChartItem> ) => d.ancestors().reverse().map( d => d.data.name ).join( " / " );

        const zoomIn = ( d: d3.HierarchyRectangularNode<TreeMapChartItem> ) => {
            this.depth = this.depth + 1;
            init.depthFn( this.depth );
            const group0 = this.group.attr( "pointer-events", "none" );
            const group1 = this.group = this.svg.append( "g" ).call( render, d );

            this.x.domain( [d.x0, d.x1] );
            this.y.domain( [d.y0, d.y1] );

            this.svg.transition()
                .duration( 750 )
                .call( t => group0.transition( t ).remove().call( position, d.parent ) )
                //@ts-ignore: Ignorning since code follows observable example structure
                .call( t => group1.transition( t ).attrTween( "opacity", () => d3.interpolate( 0, 1 ) ).call( position, d ) );
        };

        const zoomOut = ( d: d3.HierarchyRectangularNode<TreeMapChartItem> ) => {
            this.depth = this.depth - 1;
            init.depthFn( this.depth );

            if ( d.parent ) {
                const group0 = this.group.attr( "pointer-events", "none" );
                const group1 = this.group = this.svg.insert( "g", "*" ).call( render, d.parent );

                this.x.domain( [d.parent.x0, d.parent.x1] );
                this.y.domain( [d.parent.y0, d.parent.y1] );

                this.svg.transition()
                    .duration( 750 )
                    .call( ( t: any ) => group0.transition( t ).remove().attrTween( "opacity", () => d3.interpolate( 1, 0 ) ).call( position, d ) )
                    .call( ( t: any ) => group1.transition( t ).call( position, d.parent ) );
            }
        };

        const position = ( group: any, root: d3.HierarchyRectangularNode<TreeMapChartItem> ) => {
            group.selectAll( "g" )
                .attr( "transform", ( d: d3.HierarchyRectangularNode<TreeMapChartItem> ) => d === root ? `translate(0,-${this.titleHeight})` : `translate(${this.x( d.x0 )},${this.y( d.y0 )})` )
                .select( "rect" )
                .attr( "width", ( d: d3.HierarchyRectangularNode<TreeMapChartItem> ) => d === root ? this.width : this.x( d.x1 ) - this.x( d.x0 ) )
                .attr( "height", ( d: d3.HierarchyRectangularNode<TreeMapChartItem> ) => d === root ? this.titleHeight : this.y( d.y1 ) - this.y( d.y0 ) );
        };

        const tile = ( node: d3.HierarchyRectangularNode<TreeMapChartItem>, x0: number, y0: number, x1: number, y1: number ) => {
            d3.treemapBinary( node, 0, 0, this.width, this.height );
            for ( const child of node.children! ) {
                child.x0 = x0 + child.x0 / this.width * ( x1 - x0 );
                child.x1 = x0 + child.x1 / this.width * ( x1 - x0 );
                child.y0 = y0 + child.y0 / this.height * ( y1 - y0 );
                child.y1 = y0 + child.y1 / this.height * ( y1 - y0 );
            }
        };

        const render = ( group: any, root: d3.HierarchyRectangularNode<TreeMapChartItem> ) => {
            const node = group.selectAll( "g" )
                .data( root.children?.concat( root ) )
                .join( "g" )
                .attr( "class", ( d: d3.HierarchyRectangularNode<TreeMapChartItem> ) => d === root ? "dxTreeMap__rootRect dxTreeMap__rootRect--" + this.depth : "dxTreeMap__sectionRect" );

            node.filter( ( d: d3.HierarchyRectangularNode<TreeMapChartItem> ) => d === root ? d.parent : d.children )
                .attr( "cursor", "pointer" )
                .on( "click", ( event: any, d: d3.HierarchyRectangularNode<TreeMapChartItem> ) => d === root ? zoomOut( root ) : zoomIn( d ) );

            node.append( "title" )
                .text( ( d: d3.HierarchyRectangularNode<TreeMapChartItem> ) => `${setName( d )}\n${setFormat( d )}` );

            node.append( "rect" )
                .attr( "fill", ( d: d3.HierarchyRectangularNode<TreeMapChartItem> ) => this.getTreeMapColor( d ) )
                .attr( "stroke", "var(--light-white)" );

            node.append( "clipPath" )
                .append( "use" );

            node.append( "text" )
                .attr( "class", ( d: d3.HierarchyRectangularNode<TreeMapChartItem> ) => d === root ? "dxTreeMap__root" : "dxTreeMap__section" )
                .attr( "font-weight", ( d: d3.HierarchyRectangularNode<TreeMapChartItem> ) => d === root ? "bold" : null )
                .selectAll( "tspan" )
                .data( ( d: d3.HierarchyRectangularNode<TreeMapChartItem> ) => {
                    return [( d === root ? setName( d ) : d.data.name )].concat( setFormat( d ) );
                } )
                .join( "tspan" )
                .attr( "x", 3 )
                //@ts-ignore: Ignorning since code follows observable example structure
                .attr( "y", ( d: d3.HierarchyRectangularNode<TreeMapChartItem>, i: any, nodes: d3.TreemapLayout<TreeMapChartItem> ) => `${( i === nodes.length - 1 ) * 0.3 + 1.1 + i * 0.9}em` )
                .attr( "fill-opacity", ( d: d3.HierarchyRectangularNode<TreeMapChartItem>, i: any, nodes: any ) => i === nodes.length - 1 ? 0.7 : null )
                .attr( "font-weight", ( d: d3.HierarchyRectangularNode<TreeMapChartItem>, i: any, nodes: any ) => i === nodes.length - 1 ? "normal" : null )
                .attr( "class", ( d: d3.HierarchyRectangularNode<TreeMapChartItem>, i: any, nodes: any ) => i === nodes.length - 1 ? "dxTreeMap__subtitle" : "dxTreeMap__title" )
                .text( ( d: d3.HierarchyRectangularNode<TreeMapChartItem> ) => d );

            group.call( position, root );
        };

        const hierarchy = d3.hierarchy<TreeMapChartItem>( init.data )
            .sum( ( d: any ) => d.value )
            .sort( ( a: any, b: any ) => b.value - a.value );

        this.root = d3.treemap<TreeMapChartItem>().tile( tile )( hierarchy );
        this.group = this.svg.append( "g" ).call( render, this.root );
    }
}
