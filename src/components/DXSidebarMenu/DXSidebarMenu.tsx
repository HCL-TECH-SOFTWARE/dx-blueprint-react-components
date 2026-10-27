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
import "./DXSidebarMenu.scss";
import React from "react";
import DXCardButton, { CardButtonProps } from "../DXCardButton/DXCardButton";
import DXCard, { CardProps } from "../DXCard/DXCard";

export interface SidebarMenuProps {
    title: string,
    cardButtons?: CardButtonProps[];
    card?: CardProps;
}

const DXSidebarMenu = ( props: SidebarMenuProps ) => {
    let MAX_CARDS = 8;
    return (
        <div className="dxSidebarMenu" data-testid="dxSidebarMenu">
            {props.title && <p className="dxSidebarMenu__title" data-testid="dxSidebarMenu-title" >{props.title}</p>}
            {
                props.cardButtons && props.cardButtons.length > 0 ?
                    <div className={`dxSidebarMenu__cards`}
                        data-testid="dxSidebarMenu-cards">
                        {props.cardButtons.slice( 0, MAX_CARDS ).map( ( btn, index ) => (
                            <DXCardButton {...btn} key={"button-" + index} />
                        ) )}
                    </div> : null
            }
            {
                props.card &&
                <div className="dxSidebarMenu__cardInfo" data-testid="dxSidebarMenu-cardInfo">
                    <DXCard {...props.card} />
                </div>
            }
        </div>
    );
};

export default DXSidebarMenu;
