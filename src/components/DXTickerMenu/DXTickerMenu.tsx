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

import React, { ReactElement, useEffect, useState } from "react";
import "./DXTickerMenu.scss";
import { getIcon, getLinkTarget } from "../../utilities";
import { TickerProps } from "../DXTicker/DXTicker";
import DXEmptyState, { EmptyStateProps } from "../DXEmptyState/DXEmptyState";
import { ExtendableProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface TickerMenuProps extends TickerProps {
    animationTime?: number;
}

const DXTickerMenu = ( props: ExtendableProps<TickerMenuProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { animationTime: _animationTime, items: _items, currencySymbol: _currencySymbol, empty: _empty, icons: _icons, className, ref, ...rest } = props;
    const [barWidth, setBarWidth] = useState( 0 );
    const [currentActive, setCurrentActive] = useState( 0 );
    //Dividing the animation in skips of 10%, combining this with the CSS transition creates the effect that the sections are smaller
    let animationTime = 8;
    if ( props.animationTime && props.animationTime > 0 ) {
        animationTime = props.animationTime;
    }
    let timeFraction = animationTime / 10;
    const root = document.documentElement;
    root.style.setProperty( '--dxTicker--animation', timeFraction + "s" );

    const renderEmptyItem = () => {
        let propsEmpty = props.empty ? props.empty : {
            title: "Oh no! Service Unavailable",
        } as EmptyStateProps;

        return (
            <>
                <DXEmptyState {...propsEmpty}></DXEmptyState>
            </>
        );
    };

    const renderTickers = () => {
        let elements: ReactElement[] = [];
        var index = 0;

        props.items.forEach( ( item ) => {
            let iconClass = "";
            let percentageClass = "";

            if ( item.percentage > 0 ) {
                percentageClass = "Up";
                iconClass = getIcon( props.icons, "up", "ci-Arrow_Up_LG" );
            } else if ( item.percentage < 0 ) {
                percentageClass = "Down";
                iconClass = getIcon( props.icons, "down", "ci-Arrow_Down_LG" );
            }

            elements.push(
                <li key={"dxTickerMenu__" + index}
                    className={`
                        dxTickerMenu__item
                        ${index == currentActive ? "dxTickerMenu__item--active" : ""}
                    `}
                    data-testid="tickerMenu__item"
                >
                    <div className="dxTickerMenu__main">
                        <div className={`dxTickerMenu__name`} data-testid="tickerMenu__label">
                            <span>{item.name}</span>
                            <span className="dxTickerMenu__broker" data-testid="tickerMenu__broker">{item.broker}</span>
                        </div>
                        <div className={`dxTickerMenu__values ${percentageClass ? "dxTickerMenu__values--" + percentageClass : ""}`}>
                            <span className="dxTickerMenu__percentage" data-testid="tickerMenu__percentage">
                                {percentageClass && <i className={iconClass}></i>}
                                {
                                    ( item.percentage < 0
                                        ? item.percentage * ( -1 )
                                        : item.percentage ).toFixed( 2 )
                                }%
                            </span>
                            <span className="dxTickerMenu__price" data-testid="tickerMenu__price">
                                {props.currencySymbol || "$"}{item.price.toFixed( 2 )}
                            </span>
                        </div>
                    </div>
                    <a
                        href={item.link.url}
                        target={getLinkTarget( item.link.target )}
                        className="dxTickerMenu__link"
                        title={item.link.label != "" ? item.link.label : "View more"}
                        data-testid="tickerMenu__moreLink"
                    >
                        {<i className={getIcon( props.icons, "link", "ci-Chevron_Right" )}></i>}
                    </a>
                </li>
            );

            index++;
        } );

        return elements;
    };

    useEffect( () => {
        if ( props.items.length <= 1 ) return;

        const timer = setTimeout( () => {
            const nextBarWidth = barWidth + 10;

            if ( nextBarWidth >= 100 ) {
                setBarWidth( 0 );
                setCurrentActive( ( prev ) => prev === props.items.length - 1 ? 0 : prev + 1 );
            } else {
                setBarWidth( nextBarWidth );
            }
        }, timeFraction * 1000 /*Convert to miliseconds*/ );

        return () => clearTimeout( timer );
    }, [barWidth, props.items.length, timeFraction] );

    return (
        <div {...rest} ref={ref} className={classNames( "dxTickerMenu", className )}>
            {
                props.items.length > 0 ? (
                    <ul className="dxTickerMenu__list">
                        {renderTickers()}
                    </ul>
                ) : (
                    renderEmptyItem()
                )
            }
            {
                props.items.length > 1 &&
                <div id="dxTickerMenu__timerBar" data-testid="tickerMenu__timerBar" className="dxTickerMenu__timerBar" style={{ width: barWidth + "%" }} />
            }
        </div>
    );
};

export default DXTickerMenu;
