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
import "./DXMenuOrganizer.scss";
import React, { ReactElement, useEffect, useState, useRef } from "react";
import DXMyLinksCard from "../DXMyLinksCard";
import DXEmptyState, { EmptyStateProps } from "../DXEmptyState/DXEmptyState";

export interface MenuOrganizerProps {
    items: MenuItem[];
    onChange( currentArray: MenuItem[] ): void;
    empty?: EmptyStateProps;
}

export interface MenuItem {
    id?: string;
    label: string;
    [x: string]: any;
}

export const ANIMATION_TIME = 200;

const DXMenuOrganizer = ( props: MenuOrganizerProps ) => {
    const [currentMenu, setCurrentMenu] = useState( props.items );
    const [firstItem, setFirstItem] = useState( -1 );
    const [secondItem, setSecondItem] = useState( -1 );
    const [isAnimating, setIsAnimating] = useState( false );

    const root = document.documentElement;
    root.style.setProperty( '--menuOrg-animationTime', "0." + ANIMATION_TIME + "s" );

    const listRef = useRef<HTMLUListElement>( null );

    useEffect( () => {
        var timer: any;
        //Check for a valid change
        if ( firstItem >= 0 && secondItem >= 0 ) {
            timer = setTimeout( () => {
                let currentList = listRef.current;
                if ( currentList && currentList !== null ) {
                    var x = currentList.children.length;
                    //Cleaning the style of multiple elements in case of various fast clicks;
                    for ( let i = 0; i < x; i++ ) {
                        let listItem = currentList.querySelectorAll( ".dxMenuOrganizer__item" )[i] as HTMLLIElement;
                        listItem.removeAttribute( "style" );
                    }
                }
            }, ANIMATION_TIME );
        }

        return () => clearTimeout( timer );

    }, [currentMenu] );

    const reorder = async ( item1: number, item2: number ) => {
        let aux = [...currentMenu];

        aux[item1] = currentMenu[item2];
        aux[item2] = currentMenu[item1];

        setFirstItem( item1 );
        setSecondItem( item2 );
        setIsAnimating( true );

        let items = listRef.current?.childNodes;

        if ( items && items.length > 0 ) {
            const firstElement = items[item1] as HTMLLIElement;
            //const firstElement = document.getElementsByClassName( "dxMenuOrganizer__item" )[item1];
            const secondElement = items[item2] as HTMLLIElement;
            //const secondElement = document.getElementsByClassName( "dxMenuOrganizer__item" )[item2];
            let itemHeight = firstElement.scrollHeight;
            //Adding the margin bottom to the displacement animation to make it smoother
            let itemMargin = Number( getComputedStyle( firstElement ).marginBottom.split( "px" )[0] ) || 0;
            itemHeight += itemMargin;
            let padding = window.getComputedStyle( firstElement, null ).getPropertyValue( 'padding-bottom' ).split( "px" )[0];
            let paddingValue = Number( padding );

            //Add movement and "highlight" animation to the items.
            firstElement.setAttribute( "style", `transform: translate(0, ${( itemHeight + paddingValue ) + "px"}); background:var(--light-light-d1)` );
            secondElement.setAttribute( "style", `transform: translate(0, ${"-" + ( itemHeight + paddingValue ) + "px"}); background:var(--light-light-d1)` );

            setTimeout( () => {
                //It's important to remove the transition effect to avoid the items to "bounce off" while changing the array order
                firstElement.setAttribute( "style", "transition:none; background:var(--light-light-d1)" );
                secondElement.setAttribute( "style", "transition:none; background:var(--light-light-d1)" );
                setCurrentMenu( [...aux] );
                props.onChange( aux );
                setIsAnimating( false );
            }, ANIMATION_TIME );
        }

        return;
    };

    const renderEmptyView = (): ReactElement => {
        let emptyProps = props.empty ? props.empty : {
            title: "No Saved Items!",
            text: "You don't have any saved items at this time, so please start saving your pages and they will appear here.",
        } as EmptyStateProps;

        return (
            <>
                <DXEmptyState {...emptyProps}></DXEmptyState>
            </>
        );
    };

    const renderMenu = ( currentMenu: MenuItem[] ): ReactElement[] => {
        let elements: ReactElement[] = [];
        var index = 0;
        currentMenu.forEach( ( menuItem: MenuItem ) => {
            elements.push(
                <li className="dxMenuOrganizer__item" data-testid="menuOrganizer-item" key={"menu-organizer-item-" + index}>
                    <DXMyLinksCard
                        label={menuItem.label}
                        upButton={{
                            label: "up-button",
                            onClick: ( e: React.FormEvent<HTMLInputElement> ) => {
                                let target: HTMLElement = e.currentTarget as HTMLElement;
                                let itemIndex = Number( target.getAttribute( "value" ) );
                                reorder( itemIndex - 1, itemIndex );
                            },
                            value: index,
                            disabled: index == 0 || isAnimating
                        }}
                        downButton={{
                            label: "down-button",
                            value: index,
                            disabled: ( currentMenu.length - 1 ) <= index || isAnimating,
                            onClick: ( e: React.FormEvent<HTMLInputElement> ) => {
                                let target: HTMLElement = e.currentTarget as HTMLElement;
                                let itemIndex = Number( target.getAttribute( "value" ) );
                                reorder( itemIndex, itemIndex + 1 );
                            }
                        }}
                    />
                </li>
            );
            index++;
        } );
        return elements;
    };

    return (
        <div className="dxMenuOrganizer">
            {
                props.items.length > 0 ?
                    <ul className="dxMenuOrganizer__list" data-testid="menuOrganizer-list" ref={listRef}>
                        {renderMenu( currentMenu )}
                    </ul>
                    :
                    renderEmptyView()
            }
        </div>
    );
};

export default DXMenuOrganizer;
