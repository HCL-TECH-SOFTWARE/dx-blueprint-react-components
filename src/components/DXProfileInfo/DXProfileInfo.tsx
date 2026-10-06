import React, { useState } from "react";
import { IconButtonProps, getIcon, getLinkTarget, ImageProps, LinksProps, renderAvatarLetters } from "../../utilities";
import "./DXProfileInfo.scss";
import DXButton, { DisplayType } from "../DXButton/DXButton";
import DXSocialPresence, { SocialPresenceProps } from "../DXSocialPresence/DXSocialPresence";
import DXMap from "../DXMap/DXMap";

export interface ProfileInfoProps {
    image?: ImageProps;
    fullName: string;
    jobTitle?: string;
    department?: string;
    location?: string;
    office?: string;
    email?: LinksProps;
    phone?: LinksProps;
    primaryButton?: IconButtonProps;
    secondaryButton?: LinksProps;
    address: string;
    socialPresence?: SocialPresenceProps;
    icons?: {
        toggle?: string;
        edit?: string;
    };
    optionalButtons?: IconButtonProps[];
    iframeUrl?: string;
    editAction?: Function;
    enableCollapsed?: boolean;
}

const DXProfileInfo = ( props: ProfileInfoProps ) => {
    const [isExpanded, setIsExpanded] = useState( false );

    const generateGoogleMapsUrl = ( address: string ) => {
        const encodedOffice = encodeURIComponent( address );
        return `https://www.google.com/maps/search/${encodedOffice}`;
    };

    const handleClick = ( link: ( LinksProps | undefined ) ) => {
        if ( link ) {
            window.open( link.url, getLinkTarget( link.target ) );
        }
    };

    const renderButtons = () => {
        const buttons = [];

        if ( props.primaryButton ) {
            let primProps = {
                ...props.primaryButton,
                label: props.primaryButton?.label || "Connect on Teams",
                "data-testid": "dxProfileInfoFirstButton",
                displayType: "primary" as DisplayType
            };
            buttons.push( <DXButton {...primProps} key={0} /> );
        }

        if ( props.secondaryButton ) {
            let secondProps = {
                "data-testid": "dxProfileInfoSecondButton",
                displayType: "secondary" as DisplayType,
                onClick: () => { handleClick( props.secondaryButton ); },
                label: props.secondaryButton?.label || "Give rewards"
            };
            buttons.push( <DXButton {...secondProps} key={1} /> );
        }
        return buttons;
    };

    const renderTopInformation = () => {
        return (
            <div className="dxProfileInfo__containerInfo">
                <div data-testid="dxProfileInfoProfileImage" className="dxProfileInfo__profileImage">
                    {props.image ? (
                        <figure>
                            <img data-testid="dxProfileInfoImage" src={props.image.url} alt={props.image.altText ? props.image.altText : props.fullName + " profile image"} />
                            {props.editAction &&
                                <DXButton
                                    displayType="secondary"
                                    data-testid="dxProfileInfoEditImageButton"
                                    className="dxProfileInfo__editImage"
                                    onClick={props.editAction}
                                    hideLabel={true}
                                    label={"Edit profile info image"}
                                    icon={{
                                        class: `${getIcon( props.icons, "edit", "ci-Edit_Pencil_Line_01" )}`,
                                    }} />
                            }
                        </figure>
                    ) : (
                        <div className="dxProfileInfo__profileImage--avatar">
                            {renderAvatarLetters( props.fullName )}
                        </div>
                    )}
                </div>
                <div className="dxProfileInfo__infoBlock">
                    <div className="dxProfileInfo__fullName">
                        <p data-testid="dxProfileInfoFullName">{props.fullName}</p>
                    </div>
                    {props.jobTitle &&
                        <div className="dxProfileInfo__jobTitle">
                            <p data-testid="dxProfileInfoJobTitle">{props.jobTitle}</p>
                        </div>
                    }
                    {props.department &&
                        <div className="dxProfileInfo__department">
                            <p data-testid="dxProfileInfoDepartment">{props.department}</p>
                        </div>
                    }
                </div>
            </div>
        );
    };

    const renderSocialSection = ( socialPresenceProps: SocialPresenceProps ) => {
        socialPresenceProps.size = 'big';
        socialPresenceProps.title = socialPresenceProps.title ? socialPresenceProps.title : "Contact me";
        return (
            <div className="dxProfileInfo__socialNetworkSection">
                <DXSocialPresence {...socialPresenceProps}></DXSocialPresence>
            </div>
        );
    };

    const renderExpandedInformation = () => {
        return (
            <div data-testid="dxProfileInfoSecondaryInformation">
                {props.location &&
                    <div className="dxProfileInfo__location dxProfileInfo__infoBlock">
                        <p className="dxProfileInfo__label">Location</p>
                        <p data-testid="dxProfileInfoLocation" className="dxProfileInfo__value">{props.location}</p>
                    </div>
                }
                {props.office &&
                    <div className="dxUserProfile__office dxProfileInfo__infoBlock">
                        <p className="dxProfileInfo__label">Office</p>
                        <p data-testid="dxProfileInfoOffice" className="dxProfileInfo__value">{props.office}</p>
                    </div>
                }
                {props.email &&
                    <div className="dxProfileInfo__email dxProfileInfo__infoBlock">
                        <p className="dxProfileInfo__label">Email</p>
                        <a data-testid="dxProfileInfoEmail" href={props.email.url} target={getLinkTarget( props.email.target )} className="dxProfileInfo__value">{props.email.label}</a>
                    </div>
                }
                {props.phone &&
                    <div className="dxProfileInfo__phone dxProfileInfo__infoBlock">
                        <p className="dxProfileInfo__label">Phone</p>
                        <a data-testid="dxProfileInfoPhone" className="dxProfileInfo__value" href={props.phone.url} target={getLinkTarget( props.phone.target )}>{props.phone.label}</a>
                    </div>
                }
                {( props.primaryButton || props.secondaryButton ) &&
                    <div className="dxProfileInfo__buttonsSection dxProfileInfo__infoBlock">
                        {renderButtons()}
                    </div>
                }
                {props.address &&
                    <div className="dxProfileInfo__address dxProfileInfo__infoBlock">
                        <p className="dxProfileInfo__label">Directions</p>
                        {props.iframeUrl && <DXMap iframeUrl={props.iframeUrl} />}
                        <p data-testid="dxProfileInfoAddress" className="dxProfileInfo__value">{props.address}</p>
                        <a data-testid="dxProfileInfo__maps" href={generateGoogleMapsUrl( props.address )} target="_blank" rel="noopener noreferrer">
                            Google Maps
                        </a>
                    </div>
                }
                {props.socialPresence && renderSocialSection( props.socialPresence )}
            </div>
        );
    };

    const renderOptionalButton = ( btn: IconButtonProps, key: number ) => {
        let btnProps = {
            ...btn,
            className: "dxProfileInfo__optionalButton",
            displayType: "secondary" as DisplayType,
            "data-testid": "pi-optional-button"
        };
        return <DXButton {...btnProps} key={key} />;
    };

    const renderOptionalButtons = () => {
        return (
            <div className="dxProfileInfo__optionalButtons">
                {
                    props.optionalButtons && props.optionalButtons.slice( 0, 2 ).map( ( item: any, index: number ) => (
                        renderOptionalButton( item, index )
                    ) )
                }
            </div>
        );
    };

    return (
        <div data-testid="dxProfileInfo" className="dxProfileInfo">
            <div data-testid="dxProfileInfoWrapper" className="dxProfileInfo__wrapper">
                {renderTopInformation()}
                {props.optionalButtons && renderOptionalButtons()}
                {!props.enableCollapsed && renderExpandedInformation()}
                {props.enableCollapsed && isExpanded && renderExpandedInformation()}
                {props.enableCollapsed && <div className="dxProfileInfo__containerButton">
                    <div className="dxProfileInfo__toggleContainer">
                        <DXButton
                            data-testid="dxProfileInfoShowInformation"
                            displayType="secondary"
                            className={"dxProfileInfo__toggleButton"}
                            onClick={() => { setIsExpanded( !isExpanded ); }}
                            hideLabel={true}
                            label={isExpanded ? 'Collapse Profile Info' : 'Extend Profile Info'}
                            icon={{
                                class: `${getIcon( props.icons, "toggle", "ci-Chevron_Down" )} ${isExpanded ? "dxProfileInfo__icon--open" : "dxProfileInfo__icon"}`,
                                testId: "dxProfileInfoToggleIcon"
                            }} />
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default DXProfileInfo;
