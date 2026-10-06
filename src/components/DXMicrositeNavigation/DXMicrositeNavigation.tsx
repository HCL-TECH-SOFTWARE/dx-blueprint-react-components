import 'bootstrap/dist/css/bootstrap.min.css';
import "./DXMicrositeNavigation.scss";

import React, { FormEventHandler, ReactElement, useState } from 'react';
import DXButton from "../DXButton/DXButton";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DXCardButton, { CardButtonProps } from "../DXCardButton/DXCardButton";
import { ImageProps, LinksProps, NavigationItemProps, StateIcons, getIcon, getLinkTarget } from "../../utilities";
import DXMyNextMeeting, { NextMeetingProps } from "../DXMyNextMeeting/DXMyNextMeeting";
import DXVerticalNavigation, { NavigationItem, VerticalNavigationProps } from "../DXVerticalNavigation/DXVerticalNavigation";

export interface MicrositeProps {
    sliderMenu: MicrositeSliderProps;
    navigation: MicrositeNavigationProps;
    icons?: StateIconsExtended;
}

interface StateIconsExtended extends StateIcons {
    more?: string;
    search?: string;
}

export interface MicrositeSliderProps {
    menuTitle: string;
    openButtonLabel?: string;
    nextMeeting?: NextMeetingProps;
    moreLink: LinksProps;
}

export interface MicrositeNavigationProps {
    closePlaceholder?: string;
    image?: ImageProps;
    searchPlaceholder?: string;
    searchSubmit: FormEventHandler;
    links: VerticalNavigationProps;
    footerButton: CardButtonProps;
}

const DXMicrositeNavigation = ( props: MicrositeProps ) => {
    const [open, setOpen] = useState( false );

    const showContent = ( e: any ) => {
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            setOpen( true );
            let leftNav = document.querySelector( '.dxMicrositeNavigation' ) as HTMLElement;
            leftNav?.classList.add( "dxMicrositeNavigation--display-enabled" );
            let topNav = document.querySelector( '.dxSliderMenu' );
            topNav?.classList.add( "dxSliderMenu--display-enabled" );
            leftNav?.focus();

        }
    };

    const hideContent = ( e: any ) => {
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            setOpen( false );
            let leftNav = document.querySelector( '.dxMicrositeNavigation' );
            leftNav?.classList.remove( "dxMicrositeNavigation--display-enabled" );

            let topNav = document.querySelector( '.dxSliderMenu' );
            topNav?.classList.remove( "dxSliderMenu--display-enabled" );
        }
    };

    const renderVerticalNavigation = () => {
        let verticalNavProps: VerticalNavigationProps = props.navigation.links;
        if ( !verticalNavProps.icons ) verticalNavProps.icons = { open: "ci-Add_Plus", close: "ci-Remove_Minus" };

        return <DXVerticalNavigation {...verticalNavProps} />;
    };

    return (
        <div className="dxMicrosite" data-testid="microsite">
            <Container fluid="xl" className="dxSliderMenu" >
                <Row>
                    <Col xs={7}>
                        <DXButton
                            label={props.sliderMenu.openButtonLabel && props.sliderMenu.openButtonLabel !== "" ? props.sliderMenu.openButtonLabel.trim() : "Open"}
                            displayType="unstyled"
                            data-testid="microsite-slider-button"
                            className="dxSliderMenu__openBtn"
                            onClick={showContent} />
                        <span className="dxSliderMenu__label" data-testid="microsite-slider-title">{props.sliderMenu.menuTitle ? props.sliderMenu.menuTitle.trim() : ""}</span>
                    </Col>
                    <Col xs={4}>
                        {props.sliderMenu.nextMeeting ?
                            <DXMyNextMeeting {...props.sliderMenu.nextMeeting}></DXMyNextMeeting>
                            : ""
                        }
                    </Col>
                    <Col xs={1}>
                        <a
                            className="dxSliderMenu__moreLink"
                            href={props.sliderMenu.moreLink.url ? props.sliderMenu.moreLink.url : "#"}
                            target={getLinkTarget( props.sliderMenu.moreLink.target )}
                            data-testid="microsite-slider-more-link">
                            <i className={getIcon( props.icons, "more", "ci-More_Grid_Big" ) + " dxSliderMenu__moreIcon"}></i>
                        </a>

                    </Col>
                </Row>
            </Container>
            <Container fluid="xl" className="dxMicrositeNavigation container"
                data-testid="microsite-navigation" tabIndex={-1}>
                <Row>
                    <Col xs={8}>
                        <h2 className="dxMicrositeNavigation__name">{props.sliderMenu.menuTitle.trim()}</h2>
                    </Col>
                    <Col xs={4}>
                        <DXButton
                            label={props.navigation.closePlaceholder && props.navigation.closePlaceholder !== "" ? props.navigation.closePlaceholder.trim() : "Close"}
                            displayType="secondary"
                            className="dxMicrositeNavigation__closeButton"
                            onClick={hideContent}
                            data-testid="microsite-navigation-close-button" />
                    </Col>
                    {
                        props.navigation.image ?
                            <Col xs={12}>
                                <img className="dxMicrositeNavigation__img"
                                    data-testid="microsite-nav-img"
                                    src={props.navigation.image?.url}
                                    alt={props.navigation.image?.altText?.trim()}>
                                </img>
                            </Col> : ""
                    }
                </Row>

                <Row>

                    <Col xs={12} className="dxMicrositeNavigation__searchCol">
                        <Form role="form" onSubmit={props.navigation.searchSubmit}>

                            <div className="dxMicrositeNavigation__search">

                                <Form.Control
                                    className="dxMicrositeNavigation__searchInput"
                                    placeholder={
                                        props.navigation.searchPlaceholder &&
                                        props.navigation.searchPlaceholder !== ""
                                            ? props.navigation.searchPlaceholder.trim()
                                            : "Search this site"
                                    }
                                    type="text"
                                    data-testid="searchInput"
                                />


                                <DXButton
                                    label="search icon"
                                    hideLabel
                                    displayType="unstyled"
                                    type="submit"
                                    className="dxMicrositeNavigation__searchButton"
                                    data-testid="searchButton"
                                            icon={{
                                                class: getIcon( props.icons, "search", "ci-Search_Magnifying_Glass" )
                                    }}
                                />
                            </div>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <div className="sidebar-body dxMicrositeNavigation__sideBar">
                            {renderVerticalNavigation()}
                        </div>
                    </Col>
                </Row>
                <Row className="dxMicrositeNavigation__footerRow">
                    <Col xs={12}>
                        <DXCardButton {...props.navigation.footerButton} />
                    </Col>
                </Row>
            </Container>
            <div id="navigation-overlay" data-testid="navigation-overlay" className={"dxMicrosite__overlay " + ( open ? "dxMicrosite__overlay--state-active" : "" )}>
            </div>
        </div >
    );
};

export default DXMicrositeNavigation;
