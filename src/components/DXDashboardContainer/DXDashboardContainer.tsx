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
import React, { ReactElement, useState } from "react";
import "./DXDashboardContainer.scss";
import { IconButtonProps, LinksProps, generateLinkAnchor, getIcon } from "../../utilities";
import DXButton from "../DXButton/DXButton";
import * as AllComponents from "./../index";

export interface DashboardContainerProps {
    title?: string;
    icons?: {
        header?: string;
        collapse?: string;
    };
    link?: LinksProps;
    elements: {
        collapsible?: boolean;
        collapsedHeigh?: string;
        showCollapsedOverlay?: boolean;
        subtitle?: string;
        reactChild?: ReactElement;
        customChild?: CustomElementType;
    }[];
    primaryButton?: IconButtonProps;
    secondaryButton?: IconButtonProps;
    borderlessButton?: IconButtonProps;
    badge?: string;
}

interface CustomElementType {
    type: string;
    props: any;
}

const DXDashboardContainer = ( props: DashboardContainerProps ) => {
    const [elementsActive, setElementsActive] = useState<any>( {} );

    const renderChildren = () => {
        let children: ReactElement[] = [];
        if ( props.elements ) {
            let count = 0;
            props.elements.forEach( ( item ) => {
                let element: ReactElement = <></>;

                if ( item.reactChild ) {
                    element = item.reactChild;
                } else if ( item.customChild ) {
                    //@ts-ignore: Types issues. But the validation is on the next if.
                    let type = AllComponents[item.customChild.type];
                    if ( type ) {
                        element = React.createElement( type, item.customChild.props );
                    } else {
                        console.warn( "Incorrect TAG for children element was not found in the library: " + item.customChild.type );
                    }
                }

                let aux = elementsActive;
                if ( aux[count] == undefined ) {
                    aux[count] = item.collapsible || false;
                    setElementsActive( { ...aux } );
                }

                children.push(
                    <div className="dxDashboardContainer__child" key={count}>
                        <div className="dxDashboardContainer__subtitle" data-testid="DC_subtitle">
                            {item.subtitle}
                        </div>
                        <div
                            data-testid="DC__element"
                            className={`dxDashboardContainer__element ${elementsActive[count] ? "dxDashboardContainer__element--collapsed" : ""}`}
                            style={( item.collapsedHeigh && elementsActive[count] ) ? { maxHeight: item.collapsedHeigh } : {}}
                        >
                            {element}
                            {
                                item.collapsible && elementsActive[count] && ( item.showCollapsedOverlay == undefined || item.showCollapsedOverlay ) &&
                                <div className="dxDashboardContainer__overlay" data-testid="DC__overlay"></div>
                            }
                        </div>
                        {
                            item.collapsible &&
                            <DXButton
                                data-testid="DC__collapseButton"
                                className={`dxDashboardContainer__collapseButton ${!elementsActive[count] ? "dxDashboardContainer__collapseButton--expanded" : ""}`}
                                label="Collapse"
                                displayType={'secondary'}
                                hideLabel
                                icon={{
                                    class: getIcon( props.icons, "collapse", "ci-Chevron_Down" ),
                                    testId: "DC__collapseIcon"
                                }}
                                value={`${count}`}
                                onClick={( e: any ) => {
                                    let value = e.target.value;
                                    if ( !value ) {
                                        value = e.target.parentElement.value;
                                    }
                                    let aux = elementsActive;
                                    aux[value] = !elementsActive[value];
                                    setElementsActive( { ...aux } );
                                }
                                } />
                        }
                    </div>
                );
                count += 1;
            } );
        }
        return children;
    };

    return (
        <div className="dxDashboardContainer">
            <div className="dxDashboardContainer__header">
                <div className="dxDashboardContainer__title" data-testid="DC__title">
                    {
                        props.icons?.header &&
                        <i data-testid="DC__headerIcon" className={props.icons.header}></i>
                    }
                    {
                        props.title &&
                        <h2 className="dxDashboardContainer__titleText">{props.title}</h2>
                    }
                    {
                        props.badge &&
                        <span className="dxDashboardContainer__badge">{props.badge}</span>
                    }
                </div>
                {
                    props.link &&
                    generateLinkAnchor(
                        props.link,
                        "dxDashboardContainer__link",
                        { "data-testid": "DC__link" }
                    )
                }
            </div>
            <div className="dxDashboardContainer__children" >
                {renderChildren()}
            </div>
            {
                ( props.primaryButton || props.secondaryButton || props.borderlessButton ) &&
                <div className="dxDashboardContainer__buttons" data-testid="DC__buttons">
                    {
                        props.borderlessButton && <DXButton {...props.borderlessButton} displayType={'unstyled'} className={"dxDashboardContainer__button dxDashboardContainer__button--borderless"} />
                    }
                    {
                        props.secondaryButton && <DXButton {...props.secondaryButton} displayType={'secondary'} className={"dxDashboardContainer__button dxDashboardContainer__button--secondary"} />
                    }
                    {
                        props.primaryButton && <DXButton {...props.primaryButton} displayType={'primary'} className={"dxDashboardContainer__button dxDashboardContainer__button--primary"} />
                    }
                </div>
            }
        </div>
    );
};

export default DXDashboardContainer;
