import "./DXRiverOfContent.scss";
import React, { useState, useRef } from "react";
import DXButton from "../DXButton/DXButton";
import { LinksProps, getIcon, getLinkTarget } from "../../utilities";

export interface RiverOfContentProps {
    index: number,
    header: string,
    links: LinksProps[],
    viewAllLink: {
        url: string,
        label?: string,
    },
    headerCharLimit?: number,
    itemCharLimit?: number,
    collapsible?: boolean,
    icons?: {
        link?: string;
    };
}

const DXRiverOfContent = ( props: RiverOfContentProps ) => {
    const [open, setOpen] = useState( false );
    const componentRef = useRef<HTMLDivElement>( null );
    const buttonRef = useRef<HTMLButtonElement>( null );
    const contentRef = useRef<HTMLDivElement>( null );
    const showContent = ( e: any ) => {
        e.preventDefault();
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            setOpen( !open );
            const component = componentRef.current;
            component?.classList.toggle( "dxRiverContent--open" );
            const icon = buttonRef.current?.querySelector( "i" );
            if ( icon && icon !== null ) icon?.classList.toggle( "dxRiverContent__icon--open" );
            const content = contentRef.current;
            content?.classList.toggle( "dxRiverContent__items--active" );
        }
    };

    const verifyTextOverflow = ( label: string, header: boolean ) => {
        let headerLimit = props.headerCharLimit && props.headerCharLimit > 0 ? props.headerCharLimit : 43;
        let itemLimit = props.itemCharLimit && props.itemCharLimit > 0 ? props.itemCharLimit : 93;
        if ( header ) {
            return label.length > headerLimit ? 'dxRiverContent__header--overflow' : '';
        } else {
            return label.length > itemLimit ? 'dxRiverContent__items--overflow' : '';
        }
    };

    const renderLinks = () => {
        if ( props.links && props.links.length > 0 ) {
            let linksToBeRendered: any[] = [];
            if ( props.links.length <= 4 ) {
                linksToBeRendered = [...props.links];
            } else {
                linksToBeRendered = props.links.slice( 0, 4 );
            }
            return (
                <ul>
                    {
                        linksToBeRendered.map( ( link, index ) => (
                            <li key={index} data-testid="river-content-item">
                                <a
                                    href={link.url}
                                    target={getLinkTarget( link.target )}
                                    className={verifyTextOverflow( link.label, false )}>{link.label}</a>
                            </li>
                        ) )
                    }
                </ul>
            );
        } else {
            return (
                <p>No links received</p>
            );
        }
    };

    return (
        <div className="dxRiverContent" id={`dxRiverContent-${props.index}`} ref={componentRef}>
            <div className={"dxRiverContent__header " + verifyTextOverflow( props.header, true )} >
                {
                    props.collapsible ? (
                        <DXButton
                            type="button"
                            onClick={showContent}
                            ariaExpanded={open}
                            label={props.header}
                            reactRef={buttonRef}
                            icon={{
                                class: getIcon( props.icons, "link", 'ci-Caret_Down_MD' ),
                                testId: "river-header-icon",
                                position: "right"
                            }} />
                    ) : (
                        <h3>
                            {props.header}
                        </h3>
                    )
                }
            </div>
            <div className={props.collapsible ? "dxRiverContent__items" : "dxRiverContent__items dxRiverContent__items--active"} ref={contentRef}>
                {renderLinks()}
                <a href={props.viewAllLink.url} target="_self" data-testid="river-view-all">
                    {props.viewAllLink.label && props.viewAllLink.label !== "" ? props.viewAllLink.label : 'View All'}
                </a>
            </div>
        </div>
    );
};

export default DXRiverOfContent;
