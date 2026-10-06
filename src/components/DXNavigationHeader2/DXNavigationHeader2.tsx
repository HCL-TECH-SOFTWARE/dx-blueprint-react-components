import React from "react";
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
    showOverlay?: boolean;
}

const DXNavigationHeader2 = ( props: any ) => {
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
                        <DXUtilityZone {...props.utilityZone} panelsContainerId="dxNavHeader2__panels" />
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
