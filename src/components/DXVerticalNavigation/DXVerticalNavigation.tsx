import "./DXVerticalNavigation.scss";
import React, { useState, useEffect } from "react";
import DXButton from "../DXButton";
import { LinksProps, getLinkTarget, StateIcons, getIcon } from "../../utilities";

export interface NavigationItem extends LinksProps {
    active?: boolean;
    items?: NavigationItem[];
    opened?: boolean;
}

export interface VerticalNavigationProps {
    items: NavigationItem[];
    icons?: StateIcons;
}

const DXVerticalNavigation = ( props: VerticalNavigationProps ) => {
    const [openedItems, setOpenedItems] = useState<string[]>( [] );

    const OPEN_ICON_DEFAULT = "ci-Caret_Down_MD";
    const CLOSE_ICON_DEFAULT = "ci-Caret_Up_MD";

    const openSubMenu = ( e: any, openIndex: string ) => {
        e.preventDefault();
        e.stopPropagation();

        if (
            e.type === "click" ||
            ( e.type === "keydown" && e.keyCode === 13 ) ||
            ( e.type === "keydown" && e.keyCode === 32 )
        ) {
            setOpenedItems( ( currentItems ) => {
                if ( currentItems.includes( openIndex ) ) {
                    return currentItems.filter( item => item !== openIndex );
                }

                return [...currentItems, openIndex];
            } );
        }
    };

    const openLink = ( e: any, url: string, target?: string ) => {
        e.stopPropagation();
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            window.open( url, getLinkTarget( target ) );
        }
    };

    const getItemIcon = ( openIndex: string ) => {
        if ( openedItems.includes( openIndex ) ) return getIcon( props.icons, "close", CLOSE_ICON_DEFAULT );
        return getIcon( props.icons, "open", OPEN_ICON_DEFAULT );
    };

    const saveOpenedItems = ( items: NavigationItem[], level: number ) => {
        items.forEach( ( item: NavigationItem, index: number ) => {
            if ( item.opened ) {
                setOpenedItems( currentItems => [
                    ...currentItems,
                    `${level}-${index}`
                ] );
            }

            if ( item.items ) {
                saveOpenedItems( item.items, level + 1 );
            }
        } );
    };

    useEffect( () => {
        saveOpenedItems( props.items, 0 );
    }, [props.items] );

    const renderItems = ( items: NavigationItem[], level: number ) => {
        return items.map( ( item: NavigationItem, index: number ) => {
            const itemIndex = `${level}-${index}`;
            const isOpened = openedItems.includes( itemIndex );

            return (
                <li
                    className={`nav-item ${isOpened ? "opened" : ""}`}
                    key={itemIndex}
                >
                    {item.items ? (
                        <>
                            <div className="dxVerticalNav__triggerContainer">
                                <DXButton
                                    label={item.label}
                                    className={`collapse-icon btn nav-link ${
                                        item.active ? "active" : ""
                                    } ${isOpened ? "opened" : ""}`}
                                    role="button"
                                    onClick={( e: any ) =>
                                        openLink( e, item.url, item.target )
                                    }
                                    displayType="unstyled"
                                    data-testid="vertical-nav-button"
                                    key={`trigger-${index}`}
                                />

                                <button
                                    className="collapse-icon"
                                    data-testid="vertical-nav-button-icon"
                                    type="button"
                                    aria-label={isOpened ? "Collapse submenu" : "Expand submenu"}
                                    aria-expanded={isOpened}
                                    onClick={( e: any ) =>
                                        openSubMenu( e, itemIndex )
                                    }
                                    onKeyDown={( e: any ) =>
                                        openSubMenu( e, itemIndex )
                                    }
                                >
                                    <i className={getItemIcon( itemIndex )} />
                                </button>
                            </div>

                            <div
                                className={`collapse ${
                                    isOpened ? "show" : ""
                                } ${level > 0 ? "sublevel" : ""}`}
                            >
                                <ul className="nav nav-stacked">
                                    {renderItems( item.items, level + 1 )}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <a
                            href={item.url}
                            className={`nav-link ${
                                item.active ? "active" : ""
                            }`}
                            target={getLinkTarget( item.target )}
                        >
                            {item.label}
                        </a>
                    )}
                </li>
            );
        } );
    };

    return (
        <div className="dxVerticalNav" data-testid="test">
            <ul className="nav nav-nested">
                {renderItems( props.items, 0 )}
            </ul>
        </div>
    );
};

export default DXVerticalNavigation;