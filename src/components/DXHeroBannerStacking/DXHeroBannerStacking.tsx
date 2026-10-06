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
