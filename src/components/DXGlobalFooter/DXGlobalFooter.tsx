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
import 'bootstrap/dist/css/bootstrap.min.css';
import "./DXGlobalFooter.scss";

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LinksProps, getLinkTarget, getLinkIcon } from "../../utilities";

export interface FooterProps {
    logo: string;
    altLogo?: string,
    logoMobile?: string,
    altMobile?: string,
    copyright: string;
    primaryLinks: LinksProps[];
    secondaryLinks: LinksProps[];
}
const DXGlobalFooter = ( props: FooterProps ) => {
    const renderLogo = () => {
        return (
            <div className="dxGlobalFooter__logoContainer">
                <div className="dxGlobalFooter__logoImg">
                    <img src={props.logo}
                        className={props.logoMobile ? "d-none d-sm-none d-md-block" : "d-block"}
                        alt={props.altLogo ? props.altLogo : "footer-logo"}
                        data-testid="logo-test" />
                    <img src={props.logoMobile}
                        className={props.logoMobile ? "d-block d-sm-none d-md-none" : "d-none"}
                        alt={props.altMobile ? props.altMobile : "footer-logo-mobile"}
                        data-testid="logo-mobile-test" />
                </div>
            </div>
        );
    };

    const renderPrimaryLinks = () => {
        if ( props.primaryLinks && props.primaryLinks.length > 0 ) {
            const links = props.primaryLinks;
            return links.map( ( link, index ) => (
                <li className="dxGlobalFooter__linkItem dxGlobalFooter__linkItem--primary" key={index}>
                    <p>
                        <a href={link.url !== '' ? link.url : '#'} data-testid="primary-link"
                            target={getLinkTarget( link.target )}>
                            {link.label}
                            {getLinkIcon( getLinkTarget( link.target ) )}
                        </a>
                    </p>
                </li>
            ) );
        } else {
            return (
                <div>There is no primary links</div>
            );
        }
    };
    const renderSecondaryLinks = () => {
        if ( props.secondaryLinks && props.secondaryLinks.length > 0 ) {
            const links = props.secondaryLinks;
            return links.map( ( link, index ) => (
                <li className="dxGlobalFooter__linkItem dxGlobalFooter__linkItem--secondary" key={index}>
                    <p>
                        <a href={link.url !== '' ? link.url : '#'} data-testid="secondary-link"
                            target={getLinkTarget( link.target )}>
                            {link.label}
                            {getLinkIcon( getLinkTarget( link.target ) )}
                        </a>
                    </p>
                </li>
            ) );
        } else {
            return (
                <div>There is no secondary links</div>
            );
        }
    };
    const renderCopyright = () => {
        if ( props.copyright ) {
            return (
                <p className="dxGlobalFooter__copyright">
                    &copy; {props.copyright}
                </p>
            );
        } else {
            return (
                <p className="dxGlobalFooter__copyright">
                    There is no copyright
                </p>
            );
        }
    };
    return (
        <footer className="dxGlobalFooter">
            <Container>
                <Row>
                    <Col xs={12} md={3} className="dxGlobalFooter__title">
                        {renderLogo()}
                    </Col>
                    <Col xs={12} md={9}>
                        <Row>
                            <Col xs={6} md={12} className="dxGlobalFooter__col">
                                <div className="dxGlobalFooter__links">
                                    <ul>
                                        {renderPrimaryLinks()}
                                    </ul>
                                </div>
                            </Col>
                            <Col xs={6} md={12} className="dxGlobalFooter__col">
                                <div className="dxGlobalFooter__links">
                                    <ul>
                                        {renderSecondaryLinks()}
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                        {renderCopyright()}
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default DXGlobalFooter;
