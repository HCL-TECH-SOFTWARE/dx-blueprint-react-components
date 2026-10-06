import React, { useEffect, useState } from "react";
import "./DXFastAccessMenu.scss";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import DXButton from "../DXButton/DXButton";
import { LinksProps, SliderIcons, getIcon } from "../../utilities";

export interface FastAccessMenuProps {
    title?: string,
    link?: LinksProps,
    items: LinksProps[];
    children?: React.ReactNode;
    buttonCustom?: LinksProps;
    icons?: ExtendedSliderIcons;
}

interface ExtendedSliderIcons extends SliderIcons {
    header?: string;
}

const DXFastAccessMenu = ( props: FastAccessMenuProps ) => {

    const [focusedIndex, setFocusedIndex] = useState( Number );
    const [items, setItems] = useState( props.items );

    useEffect( () => {
        let buttonCustomConfig: ( LinksProps | undefined );
        if ( !props.buttonCustom ) {
            buttonCustomConfig = ( props.link ) ? props.link : undefined;
        } else {
            buttonCustomConfig = props.buttonCustom;
        }
        if ( buttonCustomConfig ) {
            ( items.length > 14 )
                ? setItems( [...props.items.slice( 0, 14 ), buttonCustomConfig] )
                : setItems( [...props.items, buttonCustomConfig] );
        } else {
            ( items.length > 14 )
                ? setItems( [...props.items.slice( 0, 14 )] )
                : setItems( [...props.items] );
        }
    }, [props] );


    const setValidationIsFocused = ( e: any ) => {
        let itemList = document.querySelectorAll( ".__menu-item" );
        itemList.forEach( ( item ) => {
            if ( item.id === e.target.id ) {
                item.classList.add( "is-focused" );
            } else {
                if ( item.getAttribute( 'class' )?.includes( "is-focused" ) ) {
                    item.classList.remove( "is-focused" );
                }
            }
        } );

        setFocusedIndex( Number( e.target.id.substring( 4 ) ) );
    };

    const keyHandling = ( e: any ) => {
        let itemList = document.querySelectorAll( ".__menu-item" );
        let newIndex = focusedIndex;

        if ( e.key === "ArrowRight" ) {
            newIndex = ( focusedIndex === itemList.length - 1 ) ? 0 : newIndex = focusedIndex + 1;
        }

        if ( e.key === "ArrowLeft" ) {
            newIndex = ( focusedIndex === 0 ) ? itemList.length - 1 : focusedIndex - 1;
        }

        const selected = itemList[newIndex];
        if ( e.key === "ArrowRight" || e.key === "ArrowLeft" ) {
            e.preventDefault();
            ( selected as HTMLElement )?.focus();
        }
    };

    const redirectTo = ( url: string ) => {
        if ( url && url !== "" ) {
            window.open( url, "_self" );
        } else {
            console.warn( "ERROR: Cannot redirect to an empty URL" );
        }
    };

    const renderIndicators = () => {
        return items.map( ( item: any, index: number ) => {
            return (
                <button
                    id={`btn-${index}`}
                    className="__menu-item"
                    data-testid={`btn-${index}`}
                    key={index}
                    onKeyDown={( e ) => keyHandling( e )}
                    onClick={() => redirectTo( item.url )}
                    onFocus={( e ) => setValidationIsFocused( e )}
                >
                    {item.label}
                </button> );
        } );
    };

    const arrowLeft = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks -- arrowLeft is a render function passed to ScrollMenu
        const { scrollPrev } = React.useContext( VisibilityContext );
        return (
            <div className="__container __container--right">
                <DXButton
                    displayType="unstyled"
                    onClick={() => scrollPrev()}
                    className="__button"
                    data-testid="btn-left"
                    hideLabel
                    label="prev"
                    icon={{
                        class: getIcon( props.icons, "prev", "ci-Chevron_Left" )
                    }}
                />
            </div>
        );
    };

    const arrowRight = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks -- arrowRight is a render function passed to ScrollMenu
        const { scrollNext } = React.useContext( VisibilityContext );
        return (
            <div className="__container __container--left">
                <DXButton
                    displayType="unstyled"
                    onClick={() => scrollNext()}
                    className="__button"
                    data-testid="btn-right"
                    hideLabel
                    label="next"
                    icon={{
                        class: getIcon( props.icons, "next", "ci-Chevron_Right" )
                    }}
                />
            </div>
        );
    };

    return (
        <div className="dxFastAccessMenu" data-testid="fast-access-menu-container">
            <div className="dxFastAccessMenu__header" >
                {props.title ? <h3 className="dxFastAccessMenu__headerTitle" data-testid="header-title"> {props.title} </h3> : null}
                {props.link ? (
                    <div className="dxFastAccessMenu__headerLink">
                        <a href={props.link.url} target={props.link.target} data-testid="custom-link">
                            {props.link.label}
                        </a>
                        <i data-testid={"FAM__headerIcon"} className={getIcon( props.icons, "header", "ci-Chevron_Right" )}></i>
                    </div> ) : null
                }
            </div>
            <div className="dxFastAccessMenu__menu" data-testid="fast-access-menu-ribbon">
                <ScrollMenu
                    LeftArrow={arrowLeft}
                    RightArrow={arrowRight}>
                    {renderIndicators()}
                </ScrollMenu>
            </div>
        </div>
    );
};
export default DXFastAccessMenu;
