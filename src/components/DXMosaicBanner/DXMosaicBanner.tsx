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

import React, { useEffect, useState } from "react";
import "./DXMosaicBanner.scss";
import DXMosaicButton, { MosaicButtonProps } from "../DXMosaicButton/DXMosaicButton";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ExtendableProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface MosaicBannerProps {
    items: MosaicButtonProps[];
}

const DXMosaicBanner = ( props: ExtendableProps<MosaicBannerProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { items: _items, className, ref, ...rest } = props;
    const [viewportWidth, setViewportWidth] = useState( window.innerWidth );

    useEffect( () => {
        const handleResize = () => {
            setViewportWidth( window.innerWidth );
        };
        window.addEventListener( "resize", handleResize );
        return () => {
            window.removeEventListener( "resize", handleResize );
        };
    }, [] );

    const renderBannerButtons = (): React.ReactElement[] => {
        let bannerButtons: React.ReactElement[] = [];
        let smallButtons: React.ReactElement[] = [];
        props.items.map( ( button: MosaicButtonProps, index: number ) => {
            if ( index > 5 ) return;
            button.index = index;
            switch ( index ) {
                case 0:
                    viewportWidth < 576 ? ( button.size = "md" ) : ( button.size = "lg" );
                    let splitColumns = props.items.length > 1 ? 6 : 12;
                    bannerButtons.push(
                        <Col xs={12} sm={splitColumns} md={splitColumns} lg={splitColumns} className="dxMosaicBanner__containerLarge" data-testid="mb-largeContainer" key={"container-" + index}>
                            <DXMosaicButton {...button} key={index} />
                        </Col>
                    );
                    break;

                case 1:
                    viewportWidth < 992 && viewportWidth >= 576 ? ( button.size = "lg" ) : ( button.size = "md" );
                    let largeColumns = props.items.length > 2 ? 3 : 6;
                    bannerButtons.push(
                        <Col xs={12} sm={6} md={6} lg={largeColumns} className="dxMosaicBanner__containerMedium" data-testid="mb-mediumContainer" key={"container-" + index}>
                            <DXMosaicButton {...button} key={index} />
                        </Col>
                    );
                    break;

                case 2:
                case 3:
                case 4:
                case 5:
                    button.size = "sm";
                    smallButtons.push(
                        <DXMosaicButton {...button} key={index} />
                    );
                    break;

                default:
                    break;
            }
        } );

        if ( smallButtons.length ) {
            let singleClass = ( smallButtons.length === 1 ) ? "dxMosaicBanner__containerSmall--single" : "";
            bannerButtons.push(
                <Col xs={12} lg={3} className={"dxMosaicBanner__containerSmall " + singleClass} data-testid="mb-smallContainer" key={"container-3"} >
                    {smallButtons}
                </Col>
            );
        }
        return bannerButtons;
    };

    return (
        <div {...rest} ref={ref} className={classNames( "dxMosaicBanner", className )} data-testid="mb-mainContainer">
            <Row className="dxMosaicBanner__container">
                {renderBannerButtons()}
            </Row>
        </div>
    );
};

export default DXMosaicBanner;
