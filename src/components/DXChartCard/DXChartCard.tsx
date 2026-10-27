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
import React, { ReactElement, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./DXChartCard.scss";
import { Dropdown } from "react-bootstrap";
import { StateIcons, getIcon, renderAvatarLetters } from "../../utilities";

export interface DropDownItem {
    label: string;
    href?: string;
    disabled?: boolean;
    onClick?: ( event: React.MouseEvent<HTMLElement, MouseEvent> ) => void;
}

export interface ChartCardProps {
    id: string;
    displayName: string,
    jobTitle?: string,
    hideImage?: boolean;
    profileImage?: string,
    reportersNumbers?: ButtonNumber,
    menuOptions?: DropDownItem[];
    onCollapsedChange?: ( isCollapsed: string ) => void;
    reporterUsers?: ChartCardProps[];
    manager?: ChartCardProps;
    icons?: StateIcons;
    dropdownOpen?: boolean;
}

interface ButtonNumber {
    index?: number,
    label?: number;
    onClick?: Function;
}

// Portal wrapper renders the dropdown menu into document.body to escape overflow/transform clipping
const PortalDropdownMenu = React.forwardRef<HTMLDivElement, any>( ( { show, close, renderOnMount, ...props }, ref ) => {
    return ReactDOM.createPortal( <div ref={ref} {...props} />, document.body ) as any;
} );
PortalDropdownMenu.displayName = 'PortalDropdownMenu';

// Custom toggle wrapper prevents button-in-button nesting and preserves custom styling
const CustomToggle = React.forwardRef<HTMLDivElement, any>( ( { children, onClick, className }, ref ) => (
    <div
        ref={ref}
        className={className}
        onClick={( e ) => {
            e.preventDefault();
            onClick( e );
        }}
        style={{ cursor: "pointer", display: "flex" }}
    >
        {children}
    </div>
) );
CustomToggle.displayName = 'CustomToggle';

const DXChartCard = ( props: ChartCardProps ) => {
    const [collapsedClass, setCollapsedClass] = useState( '' );
    const [arrowPosition, setArrowPosition] = useState( getIcon( props.icons, "close", 'ci-Caret_Down_MD' ) );
    const [collapsed, setCollapsed] = useState( false );
    const [classInfo, setClassInfo] = useState( '' );
    const [classWithoutJob, setclassWithoutJob] = useState( '' );
    const [numberOfItems, setnumberOfItems] = useState( 0 as Number | string );
    const [position, setPosition] = useState( '' );
    const [url, seturl] = useState( '' );
    const MAX_WIDTH_CONTAINER = 576;
    const [mobile, setMobile] = useState( false );
    const renderCardInfo: ReactElement[] = [];
    const chartCard = useRef( null );

    const validateMobile = function () {
        window.innerWidth <= MAX_WIDTH_CONTAINER ? setMobile( true ) : setMobile( false );
    };

    window.addEventListener( 'click', function ( event: any ) {
        // Safety checks on classList to prevent crashes from SVGs/Paths
        if ( event.target?.classList?.value?.includes && event.target.classList.value.includes( "lexicon-icon-ellipsis-v" ) ) {
            if ( mobile ) {
                let card = document.querySelector( `#dxChartCard--${props.id}` ) as HTMLElement;
                let menu = document.querySelector( `.dropdow--${props.id}` ) as HTMLElement;

                if ( card && menu ) {
                    menu.style.top = `${card.getBoundingClientRect().bottom}px`;
                    menu.style.left = `${card.getBoundingClientRect().left}px`;

                    menu.style.maxWidth = `${card.getBoundingClientRect().width}px`;
                    menu.style.minWidth = `${card.getBoundingClientRect().width}px`;
                    menu.style.width = `${card.getBoundingClientRect().width}px`;
                }
            }
        }
    } );

    useEffect( () => {
        validateMobile();
        window.addEventListener( "resize", validateMobile );
        return function unmountComponent() {
            window.removeEventListener( "resize", validateMobile );
        };
    }, [props] );

    useEffect( () => {
        props.profileImage?.includes( "http" ) ? seturl( props.profileImage as string ) :
            props.profileImage?.includes( "data:image/" ) ? seturl( props.profileImage as string ) : seturl( `data:image/jpeg;base64,${props.profileImage}` );;
    }, [props.profileImage] );

    useEffect( () => {
        if ( collapsed ) {
            setCollapsedClass( '--collapsed' );
            setArrowPosition( getIcon( props.icons, "open", 'ci-Caret_Up_MD' ) );
        } else {
            setCollapsedClass( '' );
            setArrowPosition( getIcon( props.icons, "close", 'ci-Caret_Down_MD' ) );
        }
    }, [collapsed] );

    useEffect( () => {
        if ( props.reporterUsers && props.reporterUsers?.length > 0 ) {
            setnumberOfItems( props.reporterUsers.length );
        } else if ( props.reportersNumbers && ( props.reportersNumbers.label || props.reportersNumbers.label === 0 ) ) {
            setnumberOfItems( props.reportersNumbers.label );
        } else {
            setnumberOfItems( '' );
        }
    }, [props] );

    useEffect( () => {
        if ( props.hideImage ) {
            setClassInfo( '--fillContent' );
        }

        if ( !props.reportersNumbers ) {
            setClassInfo( '--fillContent' );
        }

        if ( !props.jobTitle ) {
            setClassInfo( '--fillContent' );
            setclassWithoutJob( '--withoutJobTitle' );
        }
    }, [props] );

    const clickNumberButton = () => {
        let collapsedItem = '';
        setCollapsed( !collapsed );
        props.reportersNumbers?.onClick && props.reportersNumbers?.onClick();
        if ( !collapsed ) {
            collapsedItem = `--collapsed`;
            if ( numberOfItems === 0 ) {
                setPosition( 'danger' );
            } else {
                setPosition( 'clicked' );
            }

        } else {
            collapsedItem = `--closed`;
            setPosition( '' );
        }

        dispatchEvent( new CustomEvent( 'collapsed--card', { detail: props.id } ) );
        props.onCollapsedChange && props.onCollapsedChange( `${props.id}${collapsedItem}` );
    };

    const menuOptions = () => {
        return (
            <Dropdown
                className={!props.reportersNumbers ? 'center dropdown' : 'dropdown'}
                key={`menu-${props.id}`}
                align="end"
                show={props.dropdownOpen}
                onToggle={() => {}}
            >
                <Dropdown.Toggle as={CustomToggle} id={`dropdown-${props.id}`} className="dropdown-toggle">
                    <button
                        type="button"
                        aria-label="Menu"
                        className="dxChartCard__kebabToggle btn"
                    >
                        <i className="ci-More_Vertical"></i>
                    </button>
                </Dropdown.Toggle>

                <Dropdown.Menu
                    as={PortalDropdownMenu}
                    className={`dxChartCard__dropdownMenu dropdow--${props.id}`}
                    id={`dropdow--${props.id}`}
                    show={props.dropdownOpen}
                    style={props.dropdownOpen ? { display: 'block', opacity: 1, visibility: 'visible' } : undefined}
                >
                    {props.menuOptions?.map( ( item, index ) => (
                        <Dropdown.Item
                            key={`menu-item-${index}`}
                            href={item.href}
                            disabled={item.disabled}
                            onClick={item.onClick}
                        >
                            {item.label}
                        </Dropdown.Item>
                    ) )}
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    props.reportersNumbers ? renderCardInfo.push(
        <button
            id="button-collapsed"
            data-testid="button-collapsed"
            className={`dxChartCard__buttonNumbers${collapsedClass}${classInfo}`}
            key={`button-${props.id}`}
            onClick={clickNumberButton}
        > {numberOfItems as string}
            <i className={`${arrowPosition}`} />
        </button>
    ) : null;

    !props.hideImage && props.profileImage ? renderCardInfo.push( <img key={`img-${props.id}`} id="dxChartCard__img" src={url} alt="" /> ) : null;
    !props.hideImage && !props.profileImage && props.displayName ? renderCardInfo.push( renderAvatarLetters( props.displayName, `dxChartCard__avatar${classInfo}`, `avatar-${props.id}` ) ) : null;
    renderCardInfo.push(
        <div className={`dxChartCard__info ${classInfo} ${classWithoutJob}`} key={`containerNames-${props.id}`}>
            <p className="dxChartCard__infoName"> {props.displayName} </p>
            {props.jobTitle ? <p className="dxChartCard__infoEmployment"> {props.jobTitle} </p> : null}
        </div>
    );

    if ( mobile ) {
        return (
            <div className={`dxChartCard ${position} ${classInfo}`} id={`dxChartCard--${props.id}`} ref={chartCard} data-testid="dxChartCard" key={props.id}>
                <div className="dxChartCard__info--mobile" data-testid="dxChartCard-info-mobile">
                    {renderCardInfo}
                </div>
                {props.menuOptions && menuOptions()}
            </div >
        );
    } else {
        return (
            <div className={`dxChartCard ${position} ${classInfo}`} id={`dxChartCard--${props.id}`} ref={chartCard} data-testid="dxChartCard" key={props.id}>
                {renderCardInfo}
                {props.menuOptions && menuOptions()}
            </div >
        );
    }
};

export default DXChartCard;