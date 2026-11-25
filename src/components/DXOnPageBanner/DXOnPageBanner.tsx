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
import "./DXOnPageBanner.scss";
import DXInteractiveButton, { InteractiveButtonProps } from "../DXInteractiveButton/DXInteractiveButton";
import { LinksProps, parseLinks, generateLinkAnchor, getIcon } from "../../utilities";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface OnPageBannerProps {
    title: string;
    subtitle: string;
    height?: string;
    imageProps: PageBannerImagePops;
    breadcrumb?: string | LinksProps[];
    icons?: {
        breadcrumb?: string;
    };
    button?: InteractiveButtonProps;
    bodyClass?: string;
}

export interface PageBannerImagePops {
    image: string;
    objectFit?: string;
    gradientSize?: string;
}

const DXOnPageBanner = ( props: ExtendableProps<OnPageBannerProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { title: _title, subtitle: _subtitle, height: _height, imageProps: _imageProps, breadcrumb: _breadcrumb, icons: _icons, button: _button, bodyClass: _bodyClass, className, ref, ...rest } = props;

    const getGradientSize = ( imageUrl: string, size?: string ) => {
        if ( size === "small" ) return `radial-gradient(ellipse 60% 45% at bottom left, var(--dark-dark-d2), rgba(255, 255, 255, 0)), url("${imageUrl}")`;
        if ( size === "medium" ) return `radial-gradient(ellipse 80% 50% at bottom left, var(--dark-dark-d2), rgba(255, 255, 255, 0)), url("${imageUrl}")`;
        if ( size === "large" ) return `radial-gradient(ellipse 100% 55% at bottom left, var(--dark-dark-d2), rgba(255, 255, 255, 0)), url("${imageUrl}")`;
        return `radial-gradient(ellipse 80% 50% at bottom left, var(--dark-dark-d2), rgba(255, 255, 255, 0)), url("${imageUrl}")`;
    };

    const getBannerStyle = () => {
        let styles: { [k: string]: any; } = {};
        let gradientStyle = getGradientSize( props.imageProps.image, props.imageProps.gradientSize );
        styles["backgroundImage"] = gradientStyle;
        styles["height"] = props.height ? props.height : "auto";
        return styles;
    };

    const renderBreadcrumbs = () => {
        let elements: ReactElement[] = [];
        for ( let i = 0; i < props.breadcrumb!.length; i++ ) {
            let breadcrumb = props.breadcrumb![i] as LinksProps;
            elements.push(
                <li key={"OnPageBanner-breadcrumb-" + i}>
                    <span>
                        {generateLinkAnchor( breadcrumb, "", { "aria-label": `Visit the parent level of this content for ${breadcrumb.label}` } )}
                    </span>
                    {
                        ( i < props.breadcrumb!.length - 1 ) &&
                        <i
                            data-testid="on-page-banner-breadIcon"
                            key={"OnPageBanner-icon-" + i}
                            className={getIcon( props.icons, "breadcrumb", "ci-Chevron_Right_MD" )}
                        ></i>
                    }
                </li>
            );
        }

        return elements;
    };

    return (
        <div {...pickDomProps( rest )} ref={ref} className={classNames( "dxOnPageBanner", className )}>
            <div className="dxOnPageBanner__backgroundContainer"
                style={getBannerStyle()}
                data-testid="banner-background">
                <div className="dxOnPageBanner__content">
                    {
                        props.breadcrumb &&
                        <div className="dxOnPageBanner__breadcrumb">
                            <div data-testid="on-page-banner-breadcrumb-container">
                                {
                                    typeof props.breadcrumb == "string"
                                        ? <div data-testid="on-page-banner-breadcrumb-text">{parseLinks( props.breadcrumb )}</div>
                                        : <ul data-testid="on-page-banner-breadcrumb-list">{renderBreadcrumbs()}</ul>
                                }
                            </div>
                        </div>
                    }
                    <div className={`dxOnPageBanner__body${props.bodyClass ? ` ${props.bodyClass}` : ""}`}>
                        <div data-testid="banner-subtitle" className="dxOnPageBanner__subtitle">{props.subtitle}</div>
                        <div data-testid="banner-title" className="dxOnPageBanner__title">{props.title}</div>
                    </div>
                    {props.button &&
                        <DXInteractiveButton {...props.button} />
                    }
                </div>
            </div>
        </div>
    );
};

export default DXOnPageBanner;
