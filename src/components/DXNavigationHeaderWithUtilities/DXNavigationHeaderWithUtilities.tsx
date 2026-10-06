import 'bootstrap/dist/css/bootstrap.min.css';
import "./DXNavigationHeaderWithUtilities.scss";
import { LinksProps, getIcon } from "../../utilities";
import React, { FormEventHandler, useState, useRef } from 'react';
import DXButton from "../DXButton/DXButton";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DXMegaMenu, { NavigationItem } from "../DXMegaMenu/DXMegaMenu";

export interface NavigationProps {
    navigationImage: NavigationImageProps;
    navigationItems: NavigationItem[];
    active?: number;
    globalLinks?: LinksProps[];
    menuImage?: string;
    utilities?: UtilitiesProps;
    icons?: {
        firstLevel?: string;
        secondLevel?: string;
        search?: string;
        close?: string;
    };
}

export interface UtilitiesProps {
    searchSubmit: ( searchValue: string ) => void;
    buttonSubmit?: FormEventHandler;
    buttonText?: string;
    searchPlaceholder?: string;
    iconSubmit?: FormEventHandler;
    iconName?: string;
}

export interface NavigationImageProps {
    imageUrl: string;
    imageAlt?: string;
    imageHeight?: number;
    imageWidth?: number;
    sizeLarge?: boolean;
}

export interface ItemProps {
    children: string;
    active: any;
    onClick: () => void;
}

const DXNavigationHeaderWithUtilities = ( props: NavigationProps ) => {
    //CODE TO HIDE THE NAVIGATION HEADER WITHOUT THE OVERLAY
    const wrapperRef = useRef( null );

    const [isSearchActive, setSearchActive] = useState( false );

    //Search Hook
    const [searchInputValue, setSearchInputValue] = useState( "" );

    return (
        <div className='dxNavHeaderUtils'>
            <Container fluid="xl" ref={wrapperRef} data-testid="containerFluid" className="dxNavHeaderUtils__mainContainer container-view">
                <Row justify="between" className="dxNavHeaderUtils__topRow">
                    <Col xs={props.navigationImage.sizeLarge ? 3 : 2}>
                        <div className='dxNavHeaderUtils__image'>
                            <img
                                data-testid="navigation-image"
                                src={props.navigationImage.imageUrl}
                                alt={props.navigationImage.imageAlt ? props.navigationImage.imageAlt : "Header Image"}
                                height={props.navigationImage.imageHeight ? props.navigationImage.imageHeight : 40}
                                width={props.navigationImage.imageWidth ? props.navigationImage.imageWidth : 230}
                            >
                            </img>
                        </div>
                    </Col>
                    <Col
                        xs={props.navigationImage.sizeLarge ? 6 : 7} className={`dxNavHeaderUtils__primaryLevel ${( isSearchActive ? "--state--inactive" : "" )}`}>
                        <DXMegaMenu
                            navigationItems={props.navigationItems}
                            menuImage={props.menuImage}
                            globalLinks={props.globalLinks}
                            active={props.active}
                            secondaryLevelContainerId={"claytabContainer"}
                            parentRef={wrapperRef}
                            icons={{
                                firstLevel: props.icons?.firstLevel,
                                secondLevel: props.icons?.secondLevel
                            }}
                        ></DXMegaMenu>
                    </Col>

                    <Col xs={3} className={`dxNavHeaderUtils__utils ${( isSearchActive ? "--state--inactive" : "" )}`}>
                        {/* UTILITIES: Button  */}
                        {props.utilities?.buttonText ? (
                            <DXButton
                                data-testid="utilities-button"
                                onClick={( e: React.FormEvent<HTMLInputElement> ) => {
                                    if ( props.utilities?.buttonSubmit ) {
                                        props.utilities?.buttonSubmit( e );
                                    }
                                }}
                                className="dxNavHeaderUtils__utilsButton"
                                label={props.utilities?.buttonText} />
                        ) : null}

                        {/* UTILITIES: Help icon button */}
                        {props.utilities?.iconSubmit ? (
                            <DXButton
                                label="utils icon"
                                hideLabel
                                displayType="unstyled"
                                data-testid="utilities-icon"
                                className="dxNavHeaderUtils__utilsIcon"
                                onClick={( e: React.FormEvent<HTMLInputElement> ) => {
                                    if ( props.utilities?.iconSubmit ) {
                                        props.utilities?.iconSubmit( e );
                                    }
                                }}
                                icon={{
                                    class: ( props.utilities?.iconName ) ? ( props.utilities?.iconName ) : "ci-Circle_Help"
                                }} />
                        ) : null}

                        {/* UTILITIES: SearchButon */}
                        <DXButton
                            label="search icon"
                            hideLabel
                            displayType="unstyled"
                            data-testid="utilities-search"
                            className="dxNavHeaderUtils__utilsIcon"
                            onClick={() => {
                                setSearchActive( true );
                            }}
                            icon={{
                                class: getIcon( props.icons, "search", "ci-Search_Magnifying_Glass" )
                            }} />
                    </Col>

                    <Col data-testid={"dxNavUtils-searchbar"} xs={props.navigationImage.sizeLarge ? 9 : 10} className={`dxNavHeaderUtils__search ${( isSearchActive ? "--state--active" : "" )}`} >
                        <Form onSubmit={( e ) => {
                            e.preventDefault();
                            if ( props.utilities?.searchSubmit ) {
                                props.utilities?.searchSubmit( searchInputValue );
                            }
                        }}>
                            {/*UTILITIES: Search bar */}
                            <Form.Group className='dxNavHeaderUtils__searchContainer' onSubmit={() => {}} >
                                <InputGroup>
                                    <div className="input-group-item input-group-prepend">
                                        <Form.Control
                                            data-testid={"dxNavUtils-searchbar__input"}
                                            className="dxNavHeaderUtils__searchInput" placeholder={props.utilities?.searchPlaceholder || "Search this site"} type="text"
                                            value={searchInputValue}
                                            onChange={( e ) => { setSearchInputValue( e.target.value ); }}
                                        />
                                    </div>
                                    <div className="input-group-inset-item dxNavHeaderUtils__buttonSearch">
                                        <DXButton
                                            label="search icon"
                                            hideLabel
                                            displayType="unstyled"
                                            type="submit"
                                            data-testid="search-button"
                                            icon={{
                                                class: getIcon( props.icons, "search", "ci-Search_Magnifying_Glass" )
                                            }} />
                                    </div>
                                    <div className="input-group-inset-item dxNavHeaderUtils__buttonClose">
                                        <DXButton
                                            label="close icon"
                                            hideLabel
                                            displayType="unstyled"
                                            data-testid="search-close"
                                            onClick={() => { setSearchActive( false ); }}
                                            icon={{
                                                class: getIcon( props.icons, "close", "ci-Close_MD" )
                                            }} />
                                    </div>
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row id="claytabContainer" >
                    {/* Container for the Mega menu secondary items */}
                </Row>
            </Container>
        </div >
    );
};

export default DXNavigationHeaderWithUtilities;
