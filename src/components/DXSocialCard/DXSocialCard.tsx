import React from "react";
import DXButton from "../DXButton/DXButton";
import { LinksProps, generateLinkAnchor, ImageProps, getIcon } from "../../utilities";
import { NumericButtonProps } from "../../utilities/button";
import "./DXSocialCard.scss";
import { CardComponent } from "../../utilities/CardComponent/CardComponent";

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

const DXSocialCard = ( props: SocialCardProps ) => {
    const hasBody = Boolean( props.body && props.body.trim().length > 0 );
    const cardType = props.type || "primary";
    const shouldAddNoBodySpacing = !hasBody && cardType !== "small";
    const showAuthorImage = props.showAuthorImage !== false;
    const noBodySpacingClass = shouldAddNoBodySpacing
        ? ( props.compactNoBodySpacing ? " dxSocialCard__mainContainer--noBodyCompact" : " dxSocialCard__mainContainer--noBody" )
        : "";

    return (
        <div className="dxSocialCard">
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
