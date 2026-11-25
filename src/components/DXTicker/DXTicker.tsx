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

import React, { ReactElement, useState } from "react";
import "./DXTicker.scss";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DXButton from "../DXButton/DXButton";
import { LinksProps, getIcon, getLinkTarget } from "../../utilities";
import { formatDate, parseISODate } from "../../utilities/dateTime";
import DXEmptyState, { EmptyStateProps } from "../DXEmptyState/DXEmptyState";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface TickerProps {
    items: TickerItem[];
    currencySymbol?: string;
    empty?: EmptyStateProps;
    icons?: {
        up?: string;
        down?: string;
        link?: string;
    };
}

interface TickerItem {
    name: string;
    broker: string;
    price: number;
    percentage: number;
    dateTime?: string;
    link: LinksProps;
}

const DXTicker = ( props: ExtendableProps<TickerProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { items: _items, currencySymbol: _currencySymbol, empty: _empty, icons: _icons, className, ref, ...rest } = props;
    const [selectedItem, setSelectedItem] = useState( 0 );
    let percentageClass = "";
    let iconClass = "";
    let parsedDateTime = "";


    if ( props.items.length ) {
        if ( props.items[selectedItem].percentage > 0 ) {
            percentageClass = "Up";
            iconClass = getIcon( props.icons, "up", "ci-Arrow_Up_LG" );
        } else if ( props.items[selectedItem].percentage < 0 ) {
            percentageClass = "Down";
            iconClass = getIcon( props.icons, "down", "ci-Arrow_Down_LG" );
        }

        const tickerDate = parseISODate( props.items[selectedItem].dateTime );
        if ( !tickerDate ) {
            console.warn( "Invalid value for DXTicker: Ticker dateTime doesn't comply with the ISO 8601 format" );
        } else {
            parsedDateTime = formatDate( tickerDate, "MMMM Do YYYY HH:mm" );
        }
    }

    const renderButtons = () => {
        let elements: ReactElement[] = [];
        var index = 0;
        props.items.forEach( ( item ) => {
            elements.push(
                <DXButton
                    displayType={index == selectedItem ? "primary" : "secondary"}
                    data-testid="ticker__button"
                    key={"dxTicker__" + index}
                    className={index == selectedItem ? "dxTicker__active" : undefined}
                    value={index}
                    label={item.name}
                    onClick={( e: React.FormEvent<HTMLInputElement> ) => {
                        let value = Number( e.currentTarget.value );
                        setSelectedItem( value );
                    }} />
            );
            index++;
        } );

        return elements;
    };

    const renderEmptyView = () => {
        let propsEmpty = props.empty ? props.empty : {
            title: "Oh no! Service Unavailable",
            text: "We are having connections issues. Please try again later.",
        } as EmptyStateProps;

        return (
            <>
                <DXEmptyState {...propsEmpty}></DXEmptyState>
            </>
        );
    };

    return (
        <div {...pickDomProps( rest )} ref={ref} className={classNames( "dxTicker", className )}>
            <div className="dxTicker__card">
                {
                    props.items.length > 0
                        ?
                        <>
                            <div className="dxTicker__topRow">
                                <ButtonGroup data-testid="ticker__btnGroup" className="dxTicker__buttonGroup">
                                    {renderButtons()}
                                </ButtonGroup>
                            </div>
                            <div className="dxTicker__mainContainer">
                                <div className="dxTicker__info">
                                    <div className="dxTicker__primary">
                                        <div className="dxTicker__label" data-testid="ticker__label">
                                            {props.items[selectedItem].broker}
                                        </div>
                                        <div className="dxTicker__price" data-testid="ticker__price">
                                            {props.currencySymbol || "$"}{props.items[selectedItem].price.toFixed( 2 )}
                                        </div>
                                    </div>
                                    <div className="dxTicker__secondary">
                                        <div className="dxTicker__date" data-testid="ticker__date">
                                            {parsedDateTime}
                                        </div>
                                        <div className={`dxTicker__percentage ${percentageClass ? "dxTicker__percentage--" + percentageClass : ""}`} data-testid="ticker__percentage">
                                            {percentageClass && <i className={iconClass}></i>}
                                            {
                                                ( props.items[selectedItem].percentage < 0
                                                    ? props.items[selectedItem].percentage * ( -1 )
                                                    : props.items[selectedItem].percentage ).toFixed( 2 )
                                            }%
                                        </div>
                                    </div>

                                </div>
                                <a
                                    href={props.items[selectedItem].link.url}
                                    target={getLinkTarget( props.items[selectedItem].link.target )}
                                    className="dxTicker__link"
                                    title={( props.items[selectedItem].link.label && props.items[selectedItem].link.label != "" ) ? props.items[selectedItem].link.label : "View more"}
                                    data-testid="ticker__moreLink"
                                >
                                    {<i className={getIcon( props.icons, "link", "ci-Chevron_Right" )}></i>}
                                </a>
                            </div>
                        </>
                        :
                        renderEmptyView()
                }
            </div>
        </div>
    );
};

export default DXTicker;
