import "../../global/loaders.scss";
import "./DXProfileCard.scss";
import React, { useState } from "react";
import DXSocialPresence, { SocialPresenceProps } from "../DXSocialPresence/DXSocialPresence";
import { ImageProps, renderAvatarLetters } from "../../utilities";
import { CardComponent } from "../../utilities/CardComponent/CardComponent";

export interface ProfileCardProps extends CardComponent {
    name: string;
    image?: ImageProps;
    socialMedia?: SocialPresenceProps;
    showSocialMedia?: boolean;
}

const renderSocialSection = ( socialPresenceProps: SocialPresenceProps ) => {
    socialPresenceProps.size = 'big';
    delete socialPresenceProps.title;
    return (
        <div className="dxProfileCard__socialMedia" data-testid="pc-socialContainer">
            <DXSocialPresence {...socialPresenceProps}></DXSocialPresence>
        </div>
    );
};

const DXProfileCard = ( props: ProfileCardProps ) => {
    // States
    const [loaded, setLoaded] = useState( false );
    return (
        <div className="dxProfileCard">
            <div className="dxProfileCard__image" data-testid="pc-imageContainer">
                {props.image ? (
                    <>
                        <div className={`loader__container ${loaded ? "d-none" : ""}`}>
                            <span className="loader"></span>
                        </div>
                        <img
                            data-testid="pc-profilePic"
                            src={props.image.url}
                            alt={props.image.altText || props.name + "'s picture"}
                            loading="lazy"
                            onLoad={() => setLoaded( true )}
                        />
                    </>
                ) : (
                    <div className="dxProfileCard__image--avatar">
                        {renderAvatarLetters( props.name )}
                    </div>
                )}
            </div>
            <div className="dxProfileCard__name" data-testid="pc-nameContainer">
                <p>{props.name}</p>
            </div>
            {props.socialMedia && props.showSocialMedia !== false && (
                renderSocialSection( props.socialMedia )
            )}
        </div>
    );
};

export default DXProfileCard;
