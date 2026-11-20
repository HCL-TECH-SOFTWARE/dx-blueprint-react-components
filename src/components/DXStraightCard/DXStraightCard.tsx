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
import { generateLinkAnchor, getFullMonth, getIcon, getValuesFromDateFormat, LinksProps, parseLinks, TagProps } from "../../utilities";
import Badge from 'react-bootstrap/Badge';
import "./DXStraightCard.scss";
import { CardComponent } from "../../utilities/CardComponent/CardComponent";
import { pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";
export interface StraightCardProps extends CardComponent {
    title: LinksProps;
    date?: string;
    tags?: TagProps[];
    dateFormat?: string;
    breadcrumb?: string | LinksProps[];
    subtitle?: string;
    showLink?: boolean;
    showChevron?: boolean;
    icons?: {
        breadcrumb?: string;
        link?: string;
    };
}
const DXStraightCard = ( props: StraightCardProps & { className?: string; ref?: React.Ref<HTMLDivElement>; } ) => {
    // Own props are pulled out; only DOM-safe extras reach the root (the props type has an index signature).
    const { title: _title, date: _date, tags: _tags, dateFormat: _dateFormat, breadcrumb: _breadcrumb, subtitle: _subtitle, showLink: _showLink, showChevron: _showChevron, icons: _icons, _search, index: _index, className, ref, ...rest } = props;
    const domAttrs = pickDomProps( rest );
    const DEFAULT_DATE_FORMAT = "MM/DD/YY";
    const showChevron = Boolean( props.showChevron );
    const showLink = Boolean( props.showLink );
    const isBreadcrumbRichText = typeof props.breadcrumb === "string";
    const setDate = ( date: string, format?: string ) => {
        let formatedDate = getValuesFromDateFormat( date, format ? format : DEFAULT_DATE_FORMAT );
        return `${formatedDate.day} ${getFullMonth( formatedDate.month )}, ${formatedDate.year}`;
    };
    const renderTags = () => {
        let elements: ReactElement[] = [];
        for ( let i = 0; i < props.tags!.length; i++ ) {
            var currentTag = props.tags![i];
            elements.push(
                <Badge
                    bg=""
                    className="dxStraightCard__tagItem"
                    key={"StrCrd-tag-" + i}
                    style={
                        currentTag.color
                            ? {
                                borderColor: currentTag.color,
                                color:
                                    currentTag.color
                            }
                            : {}
                    }
                >
                    {currentTag.label}
                </Badge>
            );
        }
        return elements;
    };
    const renderBreadcrumbs = () => {
        let elements: ReactElement[] = [];
        for ( let i = 0; i < props.breadcrumb!.length; i++ ) {
            let breadcrumb = props.breadcrumb![i] as LinksProps;
            elements.push(
                <li key={"StrCrd-breadcrumb-" + i}>
                    <span>
                        {generateLinkAnchor( breadcrumb, "undefined", { "aria-label": `Visit the parent level of this content for ${breadcrumb.label}` } )}
                    </span>
                    {
                        ( i !== props.breadcrumb!.length - 1 ) &&
                        <i
                            data-testid="StCard-breadIcon"
                            key={"StrCrd-icon-" + i}
                            className={`dxStraightCard__breadcrumbSeparator ${getIcon( props.icons, "breadcrumb", "ci-Chevron_Right_MD" )}`}
                        ></i>
                    }
                </li>
            );
        }
        return elements;
    };
    return (
        <div {...domAttrs} ref={ref} className={classNames( "dxStraightCard", className )}>
            <div className={`dxStraightCard__main dxStraightCard__main--${showChevron ? "withChevron" : "noChevron"}`}>
                {
                    props.breadcrumb &&
                    <div data-testid="StCard-breadcrumbContainer">
                        <ul
                            className="dxStraightCard__breadcrumbs"
                            data-testid={isBreadcrumbRichText ? "StCard-breadcrumbText" : "StCard-breadcrumbList"}
                        >
                            {
                                isBreadcrumbRichText
                                    ? (
                                        <li>
                                            <span>{parseLinks( props.breadcrumb )}</span>
                                        </li>
                                    )
                                    : (
                                        <>
                                            {renderBreadcrumbs()}
                                        </>
                                    )
                            }
                        </ul>
                    </div>
                }
                {
                    props.tags &&
                    <div className="dxStraightCard__tagContainer" data-testid="StCard-tags">
                        {renderTags()}
                    </div>
                }
                {
                    props.date &&
                    <div className="dxStraightCard__date" data-testid="StCard-date">{setDate( props.date, props.dateFormat )}</div>
                }
                <div className="dxStraightCard__title" >
                    {generateLinkAnchor( props.title, "", { "aria-label": "Visit the page for this content", "data-testid": "StCard-title" } )}
                </div>
                {
                    props.subtitle &&
                    <div
                        data-testid="StCard-subtitle"
                        className="dxStraightCard__subtitle">
                        {props.subtitle}
                    </div>
                }
                {
                    showLink &&
                    <a className="dxStraightCard__link" href={props.title.url} data-testid="StCard-link" aria-label="Visit the page for this content">
                        {props.title.url}
                    </a>
                }
            </div>
            {
                showChevron &&
                <div className="dxStraightCard__secondary">
                    <a href={props.title.url} target={props.title.target} data-testid="StCard-chevron" aria-label="Visit the page for this content">
                        <i className={getIcon( props.icons, "link", "ci-Chevron_Right" )}></i>
                    </a>
                </div>
            }
        </div>
    );
};
export default DXStraightCard;
