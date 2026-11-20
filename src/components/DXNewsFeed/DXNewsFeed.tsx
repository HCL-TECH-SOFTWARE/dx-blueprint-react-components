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
import "./DXNewsFeed.scss";
import DXSocialCard from "../DXSocialCard";
import { SocialCardProps } from "../DXSocialCard/DXSocialCard";
import DXFullImageCard, { FullImageCardProps } from "../DXFullImageCard/DXFullImageCard";
import { ExtendableProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface NewsFeedProps {
    title: string;
    filterCategories: string[];
    items: ( NFSocialCardProps | NFFullImageCard )[];
    allButtonText?: string;
}

export interface NFSocialCardProps extends SocialCardProps {
    categories: string[];
    size?: number;
}

export interface NFFullImageCard extends FullImageCardProps {
    categories: string[];
    size?: number;
    height?: "regular" | "small";
}

const DXNewsFeed = ( props: ExtendableProps<NewsFeedProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { title: _title, filterCategories: _filterCategories, items: _items, allButtonText: _allButtonText, className, ref, ...rest } = props;
    const containerRef = useRef<HTMLUListElement | null>( null );
    const [filterKey, setFilterKey] = React.useState( "*" );
    const [activeFilter, setActiveFilter] = useState( "*" );

    // Apply filter by toggling display on grid items
    React.useEffect( () => {
        if ( !containerRef.current ) return;
        const items = containerRef.current.querySelectorAll( ".filter-item" );
        items.forEach( ( item ) => {
            const el = item as HTMLElement;
            if ( filterKey === "*" || el.classList.contains( filterKey ) ) {
                el.style.display = "";
            } else {
                el.style.display = "none";
            }
        } );
    }, [filterKey] );

    const handleFilterKeyChange = ( key: string ) => () => {
        setFilterKey( key );
        setActiveFilter( key );
    };

    const categoriesToString = ( categories: string[] ): string => {
        var newString = "";

        for ( let i = 0; i < categories.length; i++ ) {
            newString += " " + categories[i];
        }

        return newString;
    };

    const renderFilterButtons = (): ReactElement[] => {
        var buttonElements: ReactElement[] = [];
        props.filterCategories.forEach( ( filter ) => {
            buttonElements.push( <li key={"newsFeed-filter-" + filter} className={activeFilter == filter ? "--active" : ""} onClick={handleFilterKeyChange( filter )}>{filter}</li> );
        } );
        return buttonElements;
    };

    const renderCards = (): ReactElement[] => {
        let elements: ReactElement[] = [];
        for ( let i = 0; i < props.items.length; i++ ) {
            let currentItem = props.items[i];
            let validSize = currentItem.size ? ( currentItem.size >= 1 && currentItem.size <= 12 ? currentItem.size : 4 ) : 4;
            if ( ( currentItem as SocialCardProps ).authorText != undefined ) {
                elements.push(
                    <div key={"newsFeed-item-" + i}
                        data-testid={"NF-item-" + i}
                        className={`dxNewsFeed__gridItem dxNewsFeed__gridItem-${validSize} filter-item ${categoriesToString( currentItem.categories )}`}>
                        <DXSocialCard {...( props.items[i] as SocialCardProps )}></DXSocialCard>
                    </div>
                );
            } else {
                elements.push(
                    <div key={"newsFeed-item-" + i}
                        data-testid={"NF-item-" + i}
                        className={`dxNewsFeed__gridItem dxNewsFeed__gridItem-${validSize} dxNewsFeed__size--${( currentItem as NFFullImageCard ).height || "regular"} filter-item ${categoriesToString( currentItem.categories )}`}>
                        <DXFullImageCard {...( currentItem as FullImageCardProps )}></DXFullImageCard>
                    </div>
                );
            }
        }
        return elements;
    };

    return (
        <div {...rest} ref={ref} className={classNames( "dxNewsFeed", className )}>
            <div className="dxNewsFeed__topContainer">
                <div data-testid="NF-title" className="dxNewsFeed__title">{props.title}</div>
                <ul data-testid="NF-filterButtons" className="dxNewsFeed__filterButtons">
                    <li key={"newsFeed-filter-all"} className={activeFilter == "*" ? "--active" : ""} onClick={handleFilterKeyChange( "*" )}>
                        {props.allButtonText || "All"}
                    </li>
                    {renderFilterButtons()}
                </ul>
            </div>
            <ul ref={containerRef} data-testid="NF-cardContainer" className="dxNewsFeed__mainContainer filter-container" id="NFList">
                {renderCards()}
            </ul>
        </div>
    );
};

export default DXNewsFeed;
