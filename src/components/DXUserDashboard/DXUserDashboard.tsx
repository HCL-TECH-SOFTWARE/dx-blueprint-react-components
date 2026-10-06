import "./DXUserDashboard.scss";
import React from "react";
import { ImageProps, renderAvatarLetters } from "../../utilities";
import DXUtilityBelt, { UtilityBeltProps } from "../DXUtilityBelt/DXUtilityBelt";

export interface UserDashboardProps {
    image?: ImageProps,
    title: string,
    subtitle: string,
    metadata: string;
    utilityBelt?: UtilityBeltProps;
    vertical?: boolean;
    hideImage?: boolean;
    align?: ( "left" | "center" | "right" );
}

const DXUserDashboard = ( props: UserDashboardProps ) => {

    const renderImage = () => {
        if ( !props.hideImage ) {
            if ( props.image ) {
                if ( props.image.url ) {
                    return (
                        <div className="dxUserDashboard__image">
                            <img
                                data-testid="ud-profilePic"
                                src={props.image.url}
                                alt={props.image.altText || "Profile Picture"}
                            />
                        </div>
                    );
                }

                return (
                    <div className="dxUserDashboard__avatar">
                        {renderAvatarLetters( props.image.altText ? props.image.altText : "No Assigned" )}
                    </div>
                );
            }
        }
        return null;
    };

    const getAlignClass = () => {
        if ( props.align === "left" ) return "left";
        if ( props.align === "right" ) return "right";
        if ( props.align === "center" ) return "center";
        return "";
    };

    return (
        <div className={`dxUserDashboard ${getAlignClass()} ${props.vertical ? "dxUserDashboard--vertical" : ""}`} data-testid="user-dashboard">
            <div className="dxUserDashboard__info">
                {renderImage()}
                <div className="dxUserDashboard__data">
                    <h5>{props.title}</h5>
                    <span>{props.subtitle}</span>
                    <p>{props.metadata}</p>
                </div>
            </div>
            {props.utilityBelt && (
                <div className="dxUserDashboard__icons">
                    <DXUtilityBelt {...props.utilityBelt} align={props.align} />
                </div>
            )}
        </div>
    );
};

export default DXUserDashboard;
