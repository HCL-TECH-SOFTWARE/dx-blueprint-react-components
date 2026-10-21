import React from "react";
import { useSyncExternalStore } from "react";
import "./DXNavigationHeader2.scss";
import DXMegaMenu, { NavigationItem } from "../DXMegaMenu/DXMegaMenu";
import { LinksProps } from "../../utilities";
import DXMyNextMeeting, { NextMeetingProps } from "../DXMyNextMeeting/DXMyNextMeeting";
import DXDrawerMenu, { DrawerMenuProps } from "../DXDrawerMenu/DXDrawerMenu";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DXSearchInput, { SearchInputProps } from "../DXSearchInput/DXSearchInput";
import DXUtilityZone, { UtilityZoneProps } from "../DXUtilityZone/DXUtilityZone";
import DXPortalLogos, { PortalLogosProps } from "../DXPortalLogos/DXPortalLogos";
import DXNavigationHeaderMobile, { MobileNavigationProps } from "../DXNavigationHeaderMobile/DXNavigationHeaderMobile";

export interface NavigationProps {
    nextMeeting?: NextMeetingProps;
    drawer?: DrawerMenuProps;
    searchInput?: SearchInputProps;
    portalLogos: PortalLogosProps;
    utilityZone: UtilityZoneProps;
    megaMenu: MegaMenuMinProps;
}

export interface MegaMenuMinProps {
    navigationItems: NavigationItem[];
    active?: number;
    menuImage?: string;
    globalLinks?: LinksProps[];
    socialLinks?: {
        url: string;
        label: string;
        iconClass?: string;
        image?: string;
    }[];
    showOverlay?: boolean;
}

const mobileBreakpointQuery = "(max-width: 768px)";

const subscribeToMobileBreakpoint = ( callback: () => void ) => {
    if ( typeof window === "undefined" || typeof window.matchMedia !== "function" ) {
        return () => {};
    }

    const mediaQuery = window.matchMedia( mobileBreakpointQuery );
    if ( mediaQuery.addEventListener ) {
        mediaQuery.addEventListener( "change", callback );
    } else {
        mediaQuery.addListener?.( callback );
    }

    return () => {
        if ( mediaQuery.removeEventListener ) {
            mediaQuery.removeEventListener( "change", callback );
        } else {
            mediaQuery.removeListener?.( callback );
        }
    };
};

const getMobileBreakpointSnapshot = () => {
    if ( typeof window === "undefined" || typeof window.matchMedia !== "function" ) {
        return false;
    }

    return window.matchMedia( mobileBreakpointQuery ).matches;
};

const getMobileBreakpointServerSnapshot = () => false;

const DXNavigationHeader2 = ( props: any ) => {
    const isMobile = useSyncExternalStore(
        subscribeToMobileBreakpoint,
        getMobileBreakpointSnapshot,
        getMobileBreakpointServerSnapshot
    );

    if ( isMobile ) {
        const mobileProps: MobileNavigationProps = {
            navigationImage: props.portalLogos?.secondary?.imageSrc || props.portalLogos?.main?.imageSrc || "",
            navigationImageAlt: props.portalLogos?.secondary?.label || props.portalLogos?.main?.label,
            searchSubmit: ( event ) => {
                event.preventDefault();
                props.searchInput?.searchFn?.();
            },
            navigationItems: props.megaMenu.navigationItems as MobileNavigationProps["navigationItems"],
            active: props.megaMenu.active,
            utilityZone: props.utilityZone,
        };

        return <DXNavigationHeaderMobile {...mobileProps} />;
    }

    return (
        <div className="dxNavigationHeader2">
            <Container className="dxNavigationHeader2__main">
                <div className="dxNavigationHeader2__header row">
                    <div className="dxNavigationHeader2__logo">
                        <DXPortalLogos {...props.portalLogos} />
                    </div>
                    <div className="dxNavigationHeader2__search">
                        {
                            props.searchInput &&
                            <DXSearchInput {...props.searchInput}></DXSearchInput>
                        }
                    </div>
                    <div className="dxNavigationHeader2__utilities">
                        <DXUtilityZone
                            {...props.utilityZone}
                            panelsContainerId="dxNavHeader2__panels"
                            showOverlay={false}
                        />
                    </div>
                </div>
                <div className="dxNavigationHeader2__floatingContainer">
                    <Row className="dxNavigationHeader2__panels" id="dxNavHeader2__panels">
                    </Row>
                    <Row className="dxNavigationHeader2__row">
                        <Col xs={8}>
                            <DXMegaMenu
                                {...props.megaMenu}
                                secondaryLevelContainerId={"secondLevelContainer"}
                                showOverlay={false}
                                showLandingCard={true}
                            ></DXMegaMenu>
                        </Col>

                        <Col xs={3} className="dxNavigationHeader2__nextMeetingContainer">
                            {
                                props.nextMeeting &&
                                <DXMyNextMeeting {...props.nextMeeting} />
                            }
                        </Col>

                        <Col onClick={() => {}} xs={1} className={"dxNavigationHeader2__drawerContainer"}>
                            <DXDrawerMenu
                                {...props.drawer}
                                showOverlay={false}
                            ></DXDrawerMenu>
                            <div id="NH-drawer-content" className="dxNavigationHeader2__drawerContent">
                                {props.drawerContent}
                            </div>
                        </Col>
                    </Row>
                    <div id="secondLevelContainer">
                    </div>
                </div>

            </Container>
        </div>
    );
};

export default DXNavigationHeader2;
