import { Dropdown } from 'react-bootstrap';
import React, { FormEventHandler, ReactElement } from "react";
import ReactDOM from "react-dom";
import DXButton from "../DXButton/DXButton";
import { getIcon, getLinkTarget, LinksProps, IconButtonProps } from "../../utilities";
import "./DXMyLinksCard.scss";

export interface LinksCardProps {
    label: LinksProps | string;
    subLabel?: string;
    upButton?: ButtonProps;
    downButton?: ButtonProps;
    dropdown?: DropdownProps[];
    icons?: {
        card?: string;
        up?: string;
        down?: string;
        menu?: string;
    };
    dropdownOpen?: boolean;
}

export interface ButtonProps extends IconButtonProps {
    [index: string]: any;
};

export interface DropdownProps {
    label: string;
    onClick: FormEventHandler;
    disabled?: boolean;
}

// Portal wrapper renders the dropdown menu into document.body to escape overflow/transform clipping
const PortalDropdownMenu = React.forwardRef<HTMLDivElement, any>( ( { show, close, renderOnMount, ...props }, ref ) => {
    return ReactDOM.createPortal( <div ref={ref} {...props} />, document.body ) as any;
} );
PortalDropdownMenu.displayName = 'PortalDropdownMenu';

const DXMyLinksCard = ( props: LinksCardProps ) => {

    const rendeDropdownItems = (): ReactElement[] => {
        let items: ReactElement[] = [];
        let index = 0;

        props.dropdown!.forEach( ( dropItem ) => {
            items.push(
                <Dropdown.Item className="dxMyLinksCard__dropdownItem" disabled={dropItem.disabled} onClick={dropItem.onClick} key={index++}>
                    {dropItem.label}
                </Dropdown.Item>
            );

        } );

        return items;
    };

    const renderButtons = () => {
        return (
            <>
                {
                    props.upButton &&
                    <DXButton
                        {...props.upButton}
                        hideLabel
                        data-testid="linkCard-upButton"
                        displayType="unstyled"
                        icon={{
                            class: getIcon( props.icons, "up", "ci-Chevron_Up" )
                        }} />
                }
                {
                    props.downButton &&
                    <DXButton
                        {...props.downButton}
                        hideLabel
                        data-testid="linkCard-downButton"
                        displayType="unstyled"
                        icon={{
                            class: getIcon( props.icons, "down", "ci-Chevron_Down" )
                        }} />
                }
                {
                    props.dropdown &&
                    <Dropdown show={props.dropdownOpen} onToggle={() => {}} align="end">
                        <Dropdown.Toggle variant="link" className="dxMyLinksCard__kebabToggle text-reset text-decoration-none" data-testid="linkCard-menuButton">
                            <i className={getIcon( props.icons, "menu", "ci-More_Vertical" )}></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                            as={PortalDropdownMenu}
                            className="dxMyLinksCard__dropdownMenu"
                            show={props.dropdownOpen}
                            style={props.dropdownOpen ? { display: 'block', opacity: 1, visibility: 'visible' } : undefined}
                        >
                            {rendeDropdownItems()}
                        </Dropdown.Menu>
                    </Dropdown>
                }
            </>
        );
    };

    const renderIcon = (): ReactElement => {
        if ( props.icons && props.icons.card ) {
            return <i data-testid="linkCard-icon" className={props.icons.card} />;
        } else {
            return <></>;
        }
    };

    const renderLabelContent = ( text: string ): ReactElement => {
        return (
            <>
                {renderIcon()}
                {
                    props.subLabel
                        ?
                        <span className="dxMyLinksCard__labelText">
                            <span className="dxMyLinksCard__labelTitle">{text}</span>
                            <span className="dxMyLinksCard__labelSubtitle">{props.subLabel}</span>
                        </span>
                        :
                        <span>{text}</span>
                }
            </>
        );
    };

    const renderWithLink = ( link: LinksProps ) => {
        if ( props.upButton || props.downButton || props.dropdown ) {
            return (
                <div className="dxMyLinksCard__main" data-testid="linkCard-main-link-button">
                    <a href={link.url} target={getLinkTarget( link.target )} className="dxMyLinksCard__label dxMyLinksCard__label--link">
                        {renderLabelContent( link.label )}
                    </a>
                    {renderButtons()}
                </div>
            );
        } else {
            return (
                <a
                    data-testid="linkCard-main-link-noButton"
                    href={link.url}
                    aria-label="menuitem"
                    className="dxMyLinksCard__main dxMyLinksCard__main--link"
                    target={getLinkTarget( link.target )}
                    rel="noopener noreferrer"
                >
                    <span className="dxMyLinksCard__label" data-testid="linkCard-label">
                        {renderLabelContent( link.label )}
                    </span>
                </a>
            );
        }
    };

    return (
        <div className="dxMyLinksCard">
            {
                typeof props.label == "string"
                    ?
                    <div className="dxMyLinksCard__main" data-testid="linkCard-main-text">
                        <span className="dxMyLinksCard__label">
                            {renderLabelContent( props.label as string )}
                        </span>
                        {renderButtons()}
                    </div>
                    :
                    renderWithLink( props.label )
            }
        </div>
    );
};

export default DXMyLinksCard;
