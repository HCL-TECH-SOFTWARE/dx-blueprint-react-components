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

import React from "react";
import DXButton from "../DXButton/DXButton";
import { LinksProps, generateLinkAnchor, ImageProps, getIcon } from "../../utilities";
import { NumericButtonProps } from "../../utilities/button";
import "./DXSocialCard.scss";
import { CardComponent } from "../../utilities/CardComponent/CardComponent";
import { pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface SocialCardProps extends CardComponent {
    title: LinksProps;
    authorText: string;
    showAuthorImage?: boolean;
    compactNoBodySpacing?: boolean;
    likes?: NumericButtonProps;
    comments?: NumericButtonProps;
    body?: string;
    image?: ImageProps;
    sticker?: ImageProps;
    type?: "primary" | "medium" | "small";
    icons?: {
        user?: string;
        comments?: string;
        likes?: string;
    };
}

const DXSocialCard = ( props: SocialCardProps & { className?: string; ref?: React.Ref<HTMLDivElement>; } ) => {
    // Own props are pulled out; only DOM-safe extras reach the root (the props type has an index signature).
    const { title: _title, authorText: _authorText, showAuthorImage: _showAuthorImage, compactNoBodySpacing: _compactNoBodySpacing, likes: _likes, comments: _comments, body: _body, image: _image, sticker: _sticker, type: _type, icons: _icons, _search, index: _index, className, ref, ...rest } = props;
    const domAttrs = pickDomProps( rest );
    const hasBody = Boolean( props.body && props.body.trim().length > 0 );
    const cardType = props.type || "primary";
    const shouldAddNoBodySpacing = !hasBody && cardType !== "small";
    const showAuthorImage = props.showAuthorImage !== false;
    const noBodySpacingClass = shouldAddNoBodySpacing
        ? ( props.compactNoBodySpacing ? " dxSocialCard__mainContainer--noBodyCompact" : " dxSocialCard__mainContainer--noBody" )
        : "";

    return (
        <div {...domAttrs} ref={ref} className={classNames( "dxSocialCard", className )}>
            {
                props.image &&
                <img
                    data-testid="SC-image"
                    className={"dxSocialCard__mainImage dxSocialCard__mainImage--" + cardType}
                    alt={props.image.altText || ""}
                    {...(!props.image.altText && { role: "presentation" })}
                    src={props.image.url}
                    draggable="false"
                >
                </img>
            }
            <div className={"dxSocialCard__mainContainer dxSocialCard__mainContainer--" + cardType + noBodySpacingClass}>
                {
                    generateLinkAnchor( props.title, "dxSocialCard__title dxSocialCard__title--" + cardType )
                }
                {
                    ( cardType != "small" && hasBody ) &&
                    <p
                        data-testid="SC-body"
                        className={"dxSocialCard__body dxSocialCard__body--" + cardType}
                    >
                        {props.body}
                    </p>
                }
                <div className="dxSocialCard__publishContainer">
                    {
                        showAuthorImage && ( props.sticker ?
                            <img
                                data-testid="SC-sticker"
                                className={"dxSocialCard__sticker--" + cardType}
                                src={props.sticker.url}
                                alt={props.sticker.altText || ""}
                                {...(!props.sticker.altText && { role: "presentation" })}
                            >
                            </img>
                            :
                            <i data-testid="SC-noUserIcon"
                                className={`${getIcon( props.icons, "user", "ci-User_01" )} dxSocialCard__noUserIcon dxSocialCard__noUserIcon--` + cardType}></i>
                        )
                    }
                    <p data-testid="SC-author" className="dxSocialCard__publishContainerText">{props.authorText}</p>
                </div>
                {
                    cardType != "small" ? (
                        <div className="dxSocialCard__socialIcons" data-testid="SC-iconsContainer">
                            {
                                props.likes ? (

                                    <DXButton
                                        displayType="unstyled"
                                        label={props.likes.label > 0 ? props.likes.label.toString() : "0"}
                                        data-testid="SC-likeCount"
                                        onClick={props.likes?.onClick}
                                        icon={{
                                            class: getIcon( props.icons, "likes", "ci-Heart_01" )
                                        }} />
                                ) : null
                            }
                            {
                                props.comments ? (
                                    <DXButton
                                        displayType="unstyled"
                                        label={props.comments.label > 0 ? props.comments.label.toString() : "0"}
                                        data-testid="SC-commentCount"
                                        onClick={props.comments?.onClick}
                                        icon={{
                                            class: getIcon( props.icons, "comments", "ci-Chat_Dots" )
                                        }} />
                                ) : null
                            }
                        </div>
                    ) : null
                }
            </div>
        </div >
    );
};

export default DXSocialCard;
