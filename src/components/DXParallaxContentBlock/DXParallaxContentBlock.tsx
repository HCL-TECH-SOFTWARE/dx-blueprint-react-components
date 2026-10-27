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
import React, { ReactElement, useState, useEffect } from "react";
import "./DXParallaxContentBlock.scss";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LinksProps, ImageProps, getLinkTarget, parseContentAndMedia } from "../../utilities";

export interface ParallaxContentBlockProps {
    items: ContentBlock[];
}

export interface ContentBlock {
    image: ImageProps;
    title: string;
    richText: string;
    secondaryParagraph?: string;
    video?: string;
    link?: LinksProps;
}

const DXParallaxContentBlock = ( props: ParallaxContentBlockProps ) => {
    const [isMobile, setIsMobile] = useState<boolean>( false );
    const widthMobile = 768;
    let componentSize = 0;

    useEffect( () => {
        validateMobile();
        window.addEventListener( "resize", validateMobile );
        return () => { window.removeEventListener( "resize", validateMobile ); };
    }, [] );

    const handleClick = ( link: ( LinksProps | undefined ) ) => {
        if ( link ) {
            window.open( link.url, getLinkTarget( link.target ) );
        }
    };

    const validateMobile = () => {
        const eventTabsSize = document.querySelector( ".dxParallaxContentBlock" ) as HTMLElement;
        componentSize = eventTabsSize.offsetWidth;
        if ( componentSize <= widthMobile ) {
            setIsMobile( true );
        } else {
            setIsMobile( false );
        }
    };

    const renderParallax = function (): ReactElement[] {
        const children: ReactElement[] = [];

        props.items.forEach( ( parallaxItem, index ) => {
            children.push(
                <div className="dxParallaxContentBlock" key={"parallaxItem-" + index}>
                    <div className="dxParallaxContentBlock__parallaxImage" data-testid="parallax-bkimage" style={{ backgroundImage: `url(${parallaxItem.image.url})` }} >
                    </div>
                    <div className="dxParallaxContentBlock__blockText">
                        {isMobile ? (
                            <Row className="dxParallaxContenBlock__eventInfoMobile" data-testid="pcb-blockInfo">
                                <Col xs={12}>
                                    <div className="dxParallaxContentBlock__rightContainer">
                                        <h3 className="dxParallaxContentBlock__rightContainerTitle" data-testid="parallax-title">{parallaxItem.title}</h3>
                                        <div className="dxParallaxContentBlock__rightContainerRichText" data-testid="parallax-body"> {parseContentAndMedia( parallaxItem.richText, false )}  </div>
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    {
                                        parallaxItem.video ?
                                            (
                                                <div className="dxParallaxContentBlock__leftContainer">
                                                    {
                                                        parseContentAndMedia( parallaxItem.video, false )
                                                    }
                                                </div>
                                            ) : ( parallaxItem.link ?
                                                <div className="dxParallaxContentBlock__leftContainer">
                                                    <p className="dxParallaxContentBlock__leftContainerParagraph">{parallaxItem.secondaryParagraph}</p>
                                                    <div className="dxParallaxContentBlock__leftContainerGoToLink">
                                                        <Button data-testid="pcb-eventButton" className="d-sm-block" onClick={() => { handleClick( parallaxItem.link ); }}>
                                                            {"Visit " + parallaxItem.title}
                                                        </Button>
                                                    </div>
                                                </div>
                                                : <></> )
                                    }
                                </Col>
                            </Row>
                        ) : (
                            <Row className="dxParallaxContenBlock__eventInfoDesktop" data-testid="pcb-blockInfo">
                                <Col xs={4}>
                                    {
                                        parallaxItem.video ?
                                            (
                                                <div className="dxParallaxContentBlock__leftContainer">
                                                    {
                                                        parseContentAndMedia( parallaxItem.video, false )
                                                    }
                                                </div>
                                            ) : ( parallaxItem.link ?
                                                <div className="dxParallaxContentBlock__leftContainer">
                                                    <p className="dxParallaxContentBlock__leftContainerParagraph">{parallaxItem.secondaryParagraph}</p>
                                                    <div className="dxParallaxContentBlock__leftContainerGoToLink">
                                                        <Button data-testid="pcb-eventButton" className="d-none d-sm-block" onClick={() => { handleClick( parallaxItem.link ); }}>
                                                            {"Visit " + parallaxItem.title}
                                                        </Button>
                                                    </div>
                                                </div>
                                                : <></> )
                                    }
                                </Col>
                                <Col xs={8}>
                                    <div className="dxParallaxContentBlock__rightContainer">
                                        <h3 className="dxParallaxContentBlock__rightContainerTitle" data-testid="parallax-title">{parallaxItem.title}</h3>
                                        <div className="dxParallaxContentBlock__rightContainerRichText" data-testid="parallax-body"> {parseContentAndMedia( parallaxItem.richText, false )}  </div>
                                    </div>
                                </Col>
                            </Row>
                        )}
                    </div>
                </div>

            );
        } );

        return children;
    };

    return (
        <div>
            {renderParallax()}
        </div>
    );
};

export default DXParallaxContentBlock;
