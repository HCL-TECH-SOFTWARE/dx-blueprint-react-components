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
import React, { ReactElement } from "react";
import "./DXHeroBannerStacking.scss";
import DXHeroBanner, { HeroBannerProps } from "../DXHeroBanner/DXHeroBanner";

export interface HBStackingProps {
    items: HeroBannerProps[];
    cardMargin?: string;
    stackTopOffset?: string;
}

const DXHeroBannerStacking = ( props: HBStackingProps ) => {
    const root = document.documentElement;
    root.style.setProperty( "--HBStacking-cardMargin", props.cardMargin || "0.5rem" );
    root.style.setProperty( "--HBStacking-stackTopOffset", props.stackTopOffset || "0.75rem" );

    const renderBanners = () => {
        let index = 1;
        let elements: ReactElement[] = [];

        root.style.setProperty( '--HBStacking-numcards', `${props.items.length}` );

        props.items.forEach( item => {
            //IMPORTANT!: This style propery enables STACKING effect
            const cardStyleIndex = { "--index": index++ } as React.CSSProperties;
            elements.push(
                <li key={"hBStacking--Card-" + index} className="dxHeroBannerStacking__card" style={cardStyleIndex}>
                    <div className="dxHeroBannerStacking__content" >
                        <DXHeroBanner {...item} />
                    </div>
                </li>
            );
        } );

        return elements;
    };

    return (
        <div className="dxHeroBannerStacking">
            <ul className="dxHeroBannerStacking__cardContainer" data-testid="HBStacking--list">
                {renderBanners()}
            </ul>
        </div>
    );
};

export default DXHeroBannerStacking;
