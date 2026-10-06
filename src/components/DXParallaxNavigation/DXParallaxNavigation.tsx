import React, { ReactElement, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { LinksProps } from "../../utilities";
import "./DXParallaxNavigation.scss";

export interface ParallaxNavigationProps {
    position?: "right" | "left";
    items: LinkWithIcon[];
}

export interface LinkWithIcon {
    icon: string;
    link: LinksProps;
}

const DXParallaxNavigation = ( props: ParallaxNavigationProps ) => {

    const [isMobile, setIsMobile] = useState<boolean>( false );
    const widthMobile = 768;
    let componentSize = 0;
    let alignmentVariant = props.position == "right" ? "dxParallaxNavigation__alignmentRight" : "";
    let borderRigth = props.position == "right" ? "dxParallaxNavigation__borderRight" : "";
    let testIdRight = props.position == "right" ? "right" : "";

    useEffect( () => {
        validateMobile();
        window.addEventListener( "resize", validateMobile );
        return () => { window.removeEventListener( "resize", validateMobile ); };
    }, [] );

    const validateMobile = () => {
        const eventTabsSize = document.querySelector( ".dxParallaxNavigation" ) as HTMLElement;
        componentSize = eventTabsSize.offsetWidth;
        if ( componentSize <= widthMobile ) {
            setIsMobile( true );
        } else {
            setIsMobile( false );
        }
    };

    const renderParallaxNavigation = function (): ReactElement[] {
        const children: ReactElement[] = [];

        const handleClick = ( link: ( LinksProps | undefined ) ) => {
            const target = link?.url;
            const element = document.getElementById( `${target}` );
            if ( element ) {
                element.scrollIntoView( { behavior: "smooth", block: "start", inline: "start" } );
            }
        };

        props.items.forEach( ( parallaxItem, index ) => {
            children.push(
                isMobile ? (
                    <Button key={"parallaxItem" + index} data-testid={`pnb-eventButtonMobile-${index + 1}`} onClick={() => { handleClick( parallaxItem.link ); }} className={`dxParallaxNavigation__buttonMobile ${borderRigth}`}>
                        <i id="icon" data-testid={`pnb-eventButtonIcon-${index + 1}`} className={`dxParallaxNavigation__icon ${parallaxItem.icon}`}></i>
                        <span className="dxParallaxNavigation__textMobile">{parallaxItem.link.label}</span>
                    </Button>
                ) : (
                    <Button key={"parallaxItem" + index} data-testid={`pnb-eventButton-${index + 1}`} onClick={() => { handleClick( parallaxItem.link ); }} className={`dxParallaxNavigation__button ${borderRigth}`}>
                        <i id="icon" data-testid={`pnb-eventButtonIcon-${index + 1}`} className={`dxParallaxNavigation__icon ${parallaxItem.icon}`}></i>
                        <span className="dxParallaxNavigation__text">{parallaxItem.link.label}</span>
                    </Button>
                )
            );
        } );
        return children;
    };

    return (
        <div data-testid={`${testIdRight}`} className="dxParallaxNavigation">
            <div data-testid="pnb-wrapper" className={`dxParallaxNavigation__wrapper ${alignmentVariant}`}>
                {renderParallaxNavigation()}
            </div>
        </div>
    );
};

export default DXParallaxNavigation;
