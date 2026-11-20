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
import "./DXQuickLinks.scss";

import { getLinkTarget } from "../../utilities";
import React, { ReactElement } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { chainHandlers, ExtendableProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface QuickLinksProps {
    index: number;
    title?: string;
    hideTitle?: boolean;
    quickLinksCollection: QuickLink[];
}

interface QuickLink {
    firstHeader: string;
    secondHeader?: string;
    superHeader?: string;
    iconClass?: string;
    target?: string;
    url: string;
}

const getQuickLinkIcon = ( target: string | undefined ) => {
    return target === "_blank" ? (
        <i className="ci-External_Link"></i>
    ) : ( <i className="ci-Link"></i> );
};

/**
 * `className`, `ref` and extra props go to the root column. When there are no quick links nothing is rendered
 * (an empty fragment), so `className`, `ref` and extra props are not applied.
 */
const DXQuickLinks = ( props: ExtendableProps<QuickLinksProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { index, title, hideTitle, quickLinksCollection, className, ref, ...rest } = props;
    let quickLinksElements: ReactElement[] = [];
    let quickLinkMaxAmount = 6;
    if ( props.quickLinksCollection && props.quickLinksCollection.length ) {
        let quickLinkCounter = 0;
        props.quickLinksCollection.forEach( ( quickLink: QuickLink ) => {
            if ( quickLinksElements.length < quickLinkMaxAmount )
                quickLinksElements.push(
                    <Col xs={6} className="dxQuickLinks__cell" key={`ql-col-${props.index}-cell-${quickLinkCounter}`}>
                        <a href={quickLink.url?.trim() ? quickLink.url : "#"} target={getLinkTarget( quickLink.target )} data-testid="quicklink-item">
                            {
                                quickLink.iconClass?.trim()
                                    ?
                                    <i className={quickLink.iconClass}></i>
                                    :
                                    getQuickLinkIcon( quickLink.target )
                            }
                            <div className="_10-semibold dxQuickLinks__superHeader">
                                {quickLink.superHeader}
                            </div>
                            <div className="_10-regular dxQuickLinks__firstHeader">
                                {quickLink.firstHeader}
                            </div>
                            <div className="_10-regular dxQuickLinks__secondHeader">
                                {quickLink.secondHeader}
                            </div>
                        </a>
                    </Col>
                );
            quickLinkCounter++;
        } );
        return (
            <Col {...rest} ref={ref} xs={3} className={classNames( "dxQuickLinks", className )} data-testid="quicklink-container" onClick={chainHandlers( rest.onClick, ( e: React.MouseEvent ) => e.stopPropagation() )}>
                <Container fluid="xl" className={props.hideTitle ? "container-fluid--no-title" : ""}>
                    <Row>
                        {
                            props.hideTitle ?
                                <></>
                                :
                                <Col xs={12} className="dxQuickLinks__header _32-regular" id={`ql-col-${props.index}-title`} data-testid="quicklink-header">
                                    {
                                        props.title?.trim() ?
                                            ( props.title.trim().length > 22 ?
                                                props.title.trim().slice( 0, 19 ) + "..."
                                                :
                                                props.title.trim()
                                            )
                                            :
                                            "Quick Links"
                                    }
                                </Col>
                        }
                        {quickLinksElements}
                    </Row>
                </Container>
            </Col>
        );
    } else {
        return ( <></> );
    }
};

export default DXQuickLinks;
