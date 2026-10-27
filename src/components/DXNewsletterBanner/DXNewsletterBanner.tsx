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
import "./DXNewsletterBanner.scss";
import React, { useState, ChangeEventHandler, FormEventHandler } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import DXButton from "../DXButton/DXButton";
import { LinksProps, getLinkTarget, IconButtonProps } from "../../utilities";
export interface NewsletterProps {
    heading: string,
    headingColor?: string,
    type?: NewsletterType,
    inputPlaceholder?: string,
    maxLength?: number,
    button?: IconButtonProps,
    link?: LinksProps,
    background?: BackgroundProps;
}
export interface BackgroundProps {
    color?: string,
    image?: string,
    size?: string;
    repeat?: string;
    position?: string;
}
type NewsletterType = "message" | "email" | "link";
const getCustomBackground = ( background: BackgroundProps | undefined ) => {
    if ( background ) {
        let bgImage: string = background.image?.trim() ? `url(${background.image.trim()})` : "none";
        //regular expression to test a proper background size value
        let sizeRegex = /^((((\d+(\.\d)?(px|em|rem|%|cm|ch|in|pc|pt|mm|ex))|auto)[ ])?((\d+(\.\d)?(px|em|rem|%|ch|cm|in|pc|pt|mm|ex))|auto)|auto|contain|cover|inherit|initial|revert|revert-layer|unset)$/i;
        let bgSize: string = background.size?.trim() ? ( sizeRegex.test( background.size.trim() ) ? background.size.trim() : "auto" ) : "auto";
        //regular expression to test a proper background position value
        let positionRegex = /^(((((\d+(\.\d)?(px|em|rem|%|cm|ch|in|pc|pt|mm|ex))|0|top|bottom|left|right|center)[ ]){0,3}((\d+(\.\d)?(px|em|rem|%|cm|ch|in|pc|pt|mm|ex))|0|top|bottom|left|right|center))|inherit|initial|revert|revert-layer|unset)$/i;
        let bgPosition: string | undefined = background.position?.trim() ? ( positionRegex.test( background.position.trim() ) ? background.position.trim() : undefined ) : undefined;
        //regular expression to test a proper repeat value
        let repeatRegex = /^((((repeat|round|space|no-repeat)[ ])?(repeat|round|space|no-repeat))|repeat-x|repeat-y|inherit|initial|revert|revert-layer|unset)$/i;
        let bgRepeat: string | undefined = background.repeat?.trim() ? ( repeatRegex.test( background.repeat.trim() ) ? background.repeat.trim() : undefined ) : undefined;
        return {
            backgroundColor: background.color?.trim(),
            backgroundImage: bgImage,
            backgroundSize: bgSize,
            backgroundRepeat: bgRepeat,
            backgroundPosition: bgPosition
        };
    }
    else {
        return {};
    }
};
const DXNewsletterBanner = ( props: NewsletterProps ) => {
    const [emailError, setEmailError] = useState( "" );
    const validateEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.currentTarget;
        // Only validate if the input type is email (not textarea)
        if (target instanceof HTMLInputElement) {
            let email = target.value;
            let regex = /^(([^<>()[\]\.,;:\s@\"\']+(\.[^<>()[\]\.,;:\s@\"\']+)*)+)@(([^<>()[\]\.,;:\s@\"\']+\.)+[^<>()[\]\.,;:\s@\"\']{2,})$/i;
            if ( !regex.test( email ) ) {
                setEmailError( "Please enter a valid email" );
            }
            else {
                setEmailError( "" );
            }
        }
    };
    const handleSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
        if ( props.button ) {
            let fn = props.button.onClick as Function;
            fn( e );
        } else {
            ( function ( e: React.FormEvent<HTMLFormElement> ) {
                e.preventDefault();
            } )( e );
        }
    };
    if ( props.type === "link" ) {
        return (
            <div className="dxNewsletter" style={getCustomBackground( props.background )} data-testid="newsletter-item">
                <Container>
                    <Row>
                        <Col xs={12} md={5} className="offset-md-2">
                            <h2 className="dxNewsletter__heading" style={{ color: props.headingColor || undefined }}>
                                {props.heading.trim()}
                            </h2>
                        </Col>
                        <Col xs={12} md={5}>
                            <a href={props.link?.url.trim() || "#"} target={getLinkTarget( props.link?.target )} className="dxNewsletter__button dxButton btn btn-primary">
                                {props.link?.label || "Submit"}
                            </a>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
    else {
        return (
            <div className="dxNewsletter" style={getCustomBackground( props.background )} data-testid="newsletter-item">
                <Container>
                    <Row>
                        <Col xs={12} md={4}>
                            <h3 className="dxNewsletter__heading" style={{ color: props.headingColor || undefined }}>
                                {props.heading.trim()}
                            </h3>
                        </Col>
                        <Col xs={12} md={8}>
                            <Form className="dxNewsletter__form" data-testid="newsletter-form" onSubmit={props.button ? props.button.onClick as FormEventHandler : ( e ) => e.preventDefault()}>
                                <Form.Group>
                                    <InputGroup>
                                        <div className="input-group-item">
                                            <Form.Label className="sr-only" htmlFor="dxNewsletter__input">{props.inputPlaceholder?.trim() || ( props.type === "email" ? "Enter your email" : "Enter your message" )}</Form.Label>
                                            {
                                                props.type === "email" ?
                                                    <OverlayTrigger
                                                        placement="bottom-start"
                                                        show={!!emailError}
                                                        transition={false}
                                                        overlay={<Tooltip id="email-validation-tooltip">{emailError}</Tooltip>}
                                                    >
                                                        <Form.Control id="dxNewsletter__input" className="dxNewsletter__input" name="dxNewsletter__input" placeholder={props.inputPlaceholder?.trim()} maxLength={props.maxLength || 100} type="text" required aria-invalid={emailError ? "true" : "false"} aria-errormessage={emailError} onChange={( e ) => validateEmail( e )} />
                                                    </OverlayTrigger>
                                                    :
                                                    <Form.Control id="dxNewsletter__input" className="dxNewsletter__input" name="dxNewsletter__input" as="textarea" placeholder={props.inputPlaceholder?.trim()} maxLength={props.maxLength || 1500} required />
                                            }
                                        </div>
                                        <div className="input-group-item input-group-item-shrink">
                                            <DXButton
                                                label={props.button?.label || "Submit"}
                                                icon={props.button?.icon ? props.button.icon : undefined}
                                                hideLabel={props.button?.hideLabel ? props.button.hideLabel : undefined}
                                                className="dxNewsletter__button"
                                                disabled={props.type === "email" ? ( emailError ? true : false ) : false}
                                                type="submit" />
                                        </div>
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    };
};
export default DXNewsletterBanner;
