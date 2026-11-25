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

import React from 'react';
import "./DXPortalLogos.scss";
import { LinksProps, getLinkTarget } from '../../utilities';
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface PortalLogosProps {
    main: LinkImage,
    secondary?: LinkImage;
}

export interface LinkImage extends LinksProps {
    imageSrc: string;
}

const DXPortalLogos = ( props: ExtendableProps<PortalLogosProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { main: _main, secondary: _secondary, className, ref, ...rest } = props;

    const renderImageLogo = ( type: any ) => {
        let typeLogo = {} as LinkImage;

        if ( type === 'main' ) {
            typeLogo = props.main;
        } else if ( type === 'secondary' ) {
            typeLogo = props.secondary as LinkImage;
        }

        return (
            <>
                {typeLogo && typeLogo.url &&
                    <div className={"dxPortalLogos__" + type}>
                        <a href={typeLogo?.url}
                            className={"dxPortalLogos__" + type + "Anchor"}
                            target={getLinkTarget( typeLogo?.target )}
                            data-testid="main-link">
                            <img
                                className={"dxPortalLogos__" + type + "Img"}
                                data-testid={typeLogo + "-logo"}
                                alt={typeLogo?.label}
                                src={typeLogo?.imageSrc} />
                        </a>
                    </div>
                }
            </>
        );
    };

    return (
        <div {...pickDomProps( rest )} ref={ref} className={classNames( "dxPortalLogos", className )} data-testid="dx-portal-logos">
            {props.main && renderImageLogo( "main" )}
            {props.secondary &&
                <>
                    <span />
                    {props.secondary && renderImageLogo( "secondary" )}
                </>
            }
        </div>
    );
};

export default DXPortalLogos;
