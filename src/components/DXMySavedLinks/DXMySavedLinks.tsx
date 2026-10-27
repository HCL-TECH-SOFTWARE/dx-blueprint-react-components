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
import React from "react";
import "./DXMySavedLinks.scss";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LinksProps, getIcon } from "../../utilities";
import DXMyLinksCard from "../DXMyLinksCard";
import DXEmptyState, { EmptyStateProps } from "../DXEmptyState/DXEmptyState";

export interface MySavedLinksProps {
    links: LinksProps[];
    link?: LinksProps;
    title?: string;
    empty?: EmptyStateProps;
    icons?: {
        link?: string;
    };
}

const DXMySavedLinks = ( props: MySavedLinksProps ) => {

    const renderCards = () => {
        return props.links.map((link, index) => (
            <Col
                xs={6}
                sm={6}
                md={4}
                lg={3}
                key={index}
                className="dxMySavedLinks__linksContainerCol"
            >
                <DXMyLinksCard label={link} />
            </Col>
        ));
    };

    const renderEmptyState = () => {
        const emptyProps: EmptyStateProps = props.empty || {
            title: "You don’t have any Saved Links",
            text: 'Save links by clicking on the "Add to My Links" button.',
            image: {
                url: "./docs/how-to/storybook-documents/DXMySavedLinks/Empty-state.png",
                altText: "empty-view"
            },
        };

        return (
            <div className="dxMySavedLinks__emptyState">
                <DXEmptyState {...emptyProps} />
            </div>
        );
    };

    const renderLinks = () => {
        return (
            <Row
                data-testid="msl-linksContainer"
                className="dxMySavedLinks__linksContainer"
                aria-label="Saved Links"
            >
                {renderCards()}
            </Row>
        );
    };

    return (
        <Container
            className="dxMySavedLinks"
            data-testid="msl-parent"
        >
            <Row className="dxMySavedLinks__header">
                <Col
                    xs={12}
                    sm={6}
                    className="dxMySavedLinks__headerTitle"
                >
                    <h2 data-testid="msl-header">
                        {props.title || "My Saved Links"}
                    </h2>
                </Col>

                <Col
                    xs={12}
                    sm={6}
                    className="dxMySavedLinks__headerLink"
                    data-testid="msl-headerLink"
                >
                    {props.link && (
                        <span>
                            <a
                                href={props.link.url}
                                target={props.link.target || "_self"}
                                data-testid="msl-callToAction"
                            >
                                {props.link.label}
                            </a>

                            <i
                                data-testid="msl-icon"
                                className={`${getIcon( props.icons, "link", "ci-Chevron_Right" )} dxMySavedLinks__headerLinkIcon`}
                            />
                        </span>
                    )}
                </Col>
            </Row>

            {props.links.length === 0
                ? renderEmptyState()
                : renderLinks()}
        </Container>
    );
};

export default DXMySavedLinks;