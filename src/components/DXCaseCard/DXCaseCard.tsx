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
import "./DXCaseCard.scss";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Badge, Dropdown } from 'react-bootstrap';
import { ButtonProps, TagProps } from "../../utilities";
export interface CaseCardProps {
    title: string,
    subtitle: string,
    label: TagProps,
    options: ButtonProps[];
    dropdownOpen?: boolean;
}
// Portal wrapper renders the dropdown menu into document.body to escape overflow/transform clipping
const PortalDropdownMenu = React.forwardRef<HTMLDivElement, any>( ( { show, close, renderOnMount, ...props }, ref ) => {
    return ReactDOM.createPortal( <div ref={ref} {...props} />, document.body ) as any;
} );
PortalDropdownMenu.displayName = 'PortalDropdownMenu';
const DXCaseCard = ( props: CaseCardProps ) => {
    // Generates a unique ID once per component mount to pass the accessibility PR review
    const [kebabId] = useState( () => Math.random().toString( 36 ).substring( 2, 9 ) );
    return (
        <div className="dxCaseCard">
            <div className="row">
                <div className="col-5">
                    <p className="dxCaseCard__title">{props.title}</p>
                </div>
                <div className="col-3">
                    <p>{props.subtitle}</p>
                </div>
                <div className="col-3">
                    <Badge
                        bg="transparent" data-testid="case-card-label" className="dxCaseCard__label"
                        style={props.label.color ?
                            { color: props.label.color, borderColor: props.label.color } :
                            { color: "var(--primary-primary)", borderColor: "var(--primary-primary)" }}
                    >
                        {props.label.label}
                    </Badge>
                </div>
                <div className="col-1">
                    <div className="dxCaseCard__kebab">
                        <Dropdown show={props.dropdownOpen} onToggle={() => {}}>
                            <Dropdown.Toggle bsPrefix="dxCaseCard__kebabToggle" id={`case-card-options-dropdown-${kebabId}`} data-testid="case-card-options" aria-label="Dropdown menu">
                                <i className="ci-More_Vertical"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                as={PortalDropdownMenu}
                                show={props.dropdownOpen}
                                style={props.dropdownOpen ? { display: 'block', opacity: 1, visibility: 'visible' } : undefined}
                            >
                                {props.options.map( ( opt: ButtonProps, index: number ) => (
                                    <Dropdown.Item key={index} onClick={( e ) => opt.onClick( e )}>
                                        {opt.label}
                                    </Dropdown.Item>
                                ) )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DXCaseCard;
