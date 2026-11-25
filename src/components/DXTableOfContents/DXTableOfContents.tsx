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

import "./DXTableOfContents.scss";
import React from "react";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface Item {
    id: string,
    label: string,
    children?: Item[];
}

export interface TableProps {
    title: string,
    items: Item[],
    firstLevelStyle?: string,
    secondLevelStyle?: string,
    thirdLevelStyle?: string,
}
const DXTableOfContents = ( props: ExtendableProps<TableProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { title: _title, items: _items, firstLevelStyle: _firstLevelStyle, secondLevelStyle: _secondLevelStyle, thirdLevelStyle: _thirdLevelStyle, className, ref, ...rest } = props;
    const MAX_LEVELS = 3;

    const getClassName = ( level: number ) => {
        if ( level === 1 ) return "dxTableContents__second";
        if ( level === 2 ) return "dxTableContents__third";
    };

    const renderItems = ( contentItems: Item[], level: number ) => {
        return contentItems.map( ( item: Item, index: number ) => (
            <React.Fragment key={`${level}-${item.id}`}>
                <li key={`${level}-${index}-${item.id}`}><a href={item.id}>{item.label}</a></li>
                {( item.children && item.children.length > 0 && level + 1 <= MAX_LEVELS ) ? (
                    <ul className={getClassName( level )} key={`${level}-${item.id}`}>
                        {renderItems( item.children, level + 1 )}
                    </ul>
                ) : null}
            </React.Fragment>
        ) );
    };

    const getCustomListStyles = () => {
        let listStylesRegex = new RegExp( /disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman|lower-greek|lower-latin|upper-latin|armenian|georgian|lower-alpha|upper-alpha|none/ );
        const firtsStyle = props.firstLevelStyle && listStylesRegex.test( props.firstLevelStyle ) ? props.firstLevelStyle : "circle";
        const secondStyle = props.secondLevelStyle && listStylesRegex.test( props.secondLevelStyle ) ? props.secondLevelStyle : "circle";
        const thirdStyle = props.thirdLevelStyle && listStylesRegex.test( props.thirdLevelStyle ) ? props.thirdLevelStyle : "circle";
        return `
            .dxTableContents .dxTableContents__first{
                list-style-type: ${firtsStyle};
            }
            .dxTableContents .dxTableContents__second{
                list-style-type: ${secondStyle};
            }
            .dxTableContents .dxTableContents__third{
                list-style-type: ${thirdStyle};
            }
        `;
    };

    return (
        <div {...pickDomProps( rest )} ref={ref} className={classNames( "dxTableContents", className )} role="doc-toc">
            <style>{getCustomListStyles()}</style>
            <h3 className="dxTableContents__title">{props.title}</h3>
            {props.items && props.items.length <= 0 ? (
                <p>No items received</p>
            ) : (
                <ul className="dxTableContents__first">
                    {renderItems( props.items, 1 )}
                </ul>
            )}
        </div>
    );
};

export default DXTableOfContents;
