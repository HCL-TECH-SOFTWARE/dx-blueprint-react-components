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
import React, { ReactElement, useRef, useState } from "react";
import "./DXOrgChart.scss";
import DXChartCard, { ChartCardProps } from "../DXChartCard/DXChartCard";
import { getIcon } from "../../utilities";
import DXButton from "../DXButton/DXButton";

export interface OrgChartProps {
    users: ChartCardProps[];
    icons?: {
        button?: string;
    };
    dropdownOpen?: boolean;
}

const DXOrgChart = ( props: OrgChartProps ) => {
    var [selectedCard, setSelectedCard] = useState<ChartCardProps>();
    var renderOrgChart: ReactElement[] = [];
    var refComponent = useRef<HTMLDivElement>( null );

    const toggleCollapsedCard = ( isCollapsed: string, id: string, level: number, item: ChartCardProps ) => {
        let newLevelToshow = level + 1;
        let cardSelected = refComponent.current?.querySelector( `.card--${id}` );
        let itemList = refComponent.current?.querySelectorAll( `.card--level--${newLevelToshow}--byID--${id}` );
        let line = refComponent.current?.querySelector( `.line-level--${newLevelToshow}` );
        let itemListByLevel = refComponent.current?.querySelectorAll( `.dxOrgChart__card--level-${level}` );

        if ( `${id}--collapsed` === isCollapsed ) {
            itemList?.forEach( ( item ) => {
                item.classList.replace( "no-active", "active" );
            } );
            cardSelected?.classList.add( "selected" );
            line?.classList.replace( "no-active", "active" );

            if ( !item.reporterUsers || item.reporterUsers.length === 0 ) {
                line?.classList.replace( "active", "no-active" );
                cardSelected?.querySelector( ".dxChartCard" )?.classList.add( 'danger' );
            }
            itemListByLevel?.forEach( ( item ) => {
                if ( !item.classList.contains( "selected" ) ) {
                    item.classList.add( "disabled" );
                }
            } );
            refComponent.current?.querySelector( `.line-level--${level}` )?.classList.add( "disabled" );

            setSelectedCard( item );
        }

        if ( `${id}--closed` === isCollapsed ) {
            itemList?.forEach( ( item ) => {
                item.classList.replace( "active", "no-active" );
            } );
            cardSelected?.classList.remove( "selected" );
            cardSelected?.classList.remove( "selected" );
            line?.classList.replace( "active", "no-active" );
            itemListByLevel?.forEach( ( item ) => {
                item?.classList.remove( "disabled" );
            } );

            cardSelected?.querySelector( ".dxChartCard" )?.classList.remove( 'danger' );
            refComponent.current?.querySelector( `.line-level--${level}` )?.classList.remove( "disabled" );

            refComponent.current?.querySelectorAll( ".active" ).forEach( ( element ) => {
                let levelIndicator = parseInt( element?.classList[2].substring( 24 ) );

                if ( levelIndicator && levelIndicator > level ) {
                    element?.classList.replace( "active", "no-active" );
                    refComponent.current?.querySelector( `.line-level--${levelIndicator}` )?.classList.replace( "active", "no-active" );
                }

            } );
        }
    };

    const collapseLevel = () => {
        let listSelected = refComponent.current?.querySelectorAll( ".selected" );
        if ( listSelected ) {
            let lastSelected = listSelected[listSelected.length - 1].querySelector( ".dxChartCard" )?.querySelector( "#button-collapsed" ) as HTMLElement;
            lastSelected.click();
        }
    };

    const renderLevel = ( contentItems: ChartCardProps[], level: number, oldValue: number | string ) => {
        var final: ReactElement[] = [];
        var nextLevelHtml: ReactElement[] = [];
        var sectionsHtml: ReactElement[] = [];

        contentItems.forEach( ( item, index ) => {
            if ( level > 1 && index === 0 ) {
                let name = "";
                let listCardsByLevel = refComponent.current?.querySelectorAll( `.dxOrgChart__card--level-${level - 1}` );
                listCardsByLevel?.forEach( ( item ) => {
                    if ( item.classList.contains( "selected" ) ) {
                        name = item.querySelector( ".dxChartCard" )?.querySelector( ".dxChartCard__info" )?.querySelector( "p" )?.innerText as string;
                    }
                } );

                sectionsHtml.push(
                    <div className={`dxOrgChart__lineLevel line-level--${level} active `} key={`line-level--${level}`}>
                        <div className={`dxOrgChart__lineLevel--style dxOrgChart__line-level-${level}`}>
                        </div>

                        <div className={`dxOrgChart__lineLevel--info line-level--${level} d-flex justify-content-between`}
                            id={`line-level--${level}--info`}
                        >
                            <p className="dxOrgChart__lineLevel--infoName">{name}</p>
                            <DXButton
                                displayType="unstyled"
                                id={`line-level--${level}-button-collapsed`}
                                className="dxOrgChart__collapsedButton"
                                onClick={collapseLevel}
                                label="Collapse"
                                icon={{
                                    class: getIcon( props.icons, "button", "ci-Chevron_Up" ),
                                    position: "right",
                                    testId: "orgChart_icon"
                                }} />
                        </div >
                    </div >
                );
            }
            sectionsHtml.push(
                <React.Fragment key={`${level}-${index}`}>
                    <div className={`
                        dxOrgChart__card
                        card--${item.id}
                        dxOrgChart__card--level-${level}
                        card--level--${level}--byID--${oldValue}
                        active`}
                        key={`${level}-${index}`}
                        id={item.id} >
                        <DXChartCard
                            {...item}
                            key={`${level}-${index}-${item.id}`}
                            onCollapsedChange={( isCollapsed ) => toggleCollapsedCard( isCollapsed, item.id, level, item )}
                            dropdownOpen={props.dropdownOpen || item.dropdownOpen}
                        ></DXChartCard>
                    </div>
                </React.Fragment>
            );

            if ( selectedCard && item.reporterUsers && item.reporterUsers.length > 0 ) {
                nextLevelHtml = renderLevel( item.reporterUsers, level + 1, item.id );
            }


        } );
        final.push( ...sectionsHtml );
        final.push( ...nextLevelHtml );
        return final;
    };

    let itemsRendered = renderLevel( props.users, 1, '0' );

    let keyItems = itemsRendered.map( item => {
        let keyItem = item.key as string;
        if ( keyItem.includes( "line-level" ) ) return keyItem;
        return keyItem.substring( 0, 2 );
    } );

    const levelByType = [] as any[];
    let lastItem = '' as string;
    for ( var i = 0; i < keyItems.length; i++ ) {
        if ( keyItems[i] !== lastItem ) {
            levelByType.push( keyItems[i] );
        }
        lastItem = keyItems[i];
    }

    levelByType.forEach( ( indicator ) => {
        let elements = itemsRendered.filter( ( item ) => ( item.key as string ).includes( indicator ) );
        let levelIndicator = indicator.substring( 0, 1 );

        if ( indicator.includes( 'li' ) || elements.length === 1 ) {
            renderOrgChart.push( ...elements );
        } else {
            renderOrgChart.push(
                <div className={`dxOrgChart__container--level-${levelIndicator} dxOrgChart__container--cards`} key={`${indicator}-container`}  >
                    {elements}
                </div>
            );
        }
    } );

    return (
        <div key={1} className="dxOrgChart d-flex flex-wrap justify-content-center" data-testid="dxOrgChart" ref={refComponent}>
            {renderOrgChart}
        </div >
    );
};

export default DXOrgChart;
