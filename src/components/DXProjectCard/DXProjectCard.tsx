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

import "../../global/loaders.scss";
import "./DXProjectCard.scss";
import variables from "../../global/_exportVariables.module.scss";
import React, { useState, useEffect, useRef, useMemo } from "react";
import DXButton from "../DXButton/DXButton";
import { IconButtonProps, ImageProps, StateIcons, renderAvatarLetters, getIcon, renderAvatarProjectMembers } from "../../utilities";
import Badge from 'react-bootstrap/Badge';
import { CardComponent } from "../../utilities/CardComponent/CardComponent";
import { pickDomProps, mergeRefs } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";
export interface ProjectCardProps extends CardComponent {
    name: string,
    img?: ImageProps,
    symbol?: string,
    tags: string[],
    manager: {
        img?: string,
        name: string,
        profileLink: string;
    },
    members: {
        name: string,
        img?: string;
    }[];
    action: IconButtonProps;
    icons?: StateIcons;
}
const DXProjectCard = ( props: ProjectCardProps & { className?: string; ref?: React.Ref<HTMLDivElement>; } ) => {
    // Own props are pulled out; only DOM-safe extras reach the root (the props type has an index signature).
    const { name: _name, img: _img, symbol: _symbol, tags: _tags, manager: _manager, members: _members, action: _action, icons: _icons, _search, index: _index, className, ref, ...rest } = props;
    const domAttrs = pickDomProps( rest );
    const [loaded, setLoaded] = useState( false );
    const [showInfo, setShowInfo] = useState( false );
    const [mobile, setMobile] = useState( false );
    const [activeTooltip, setActiveTooltip] = useState( -1 );
    let componentRef = useRef<HTMLDivElement>( null );
    // The internal ref and the consumer ref both point at the root
    const mergedRootRef = useMemo( () => mergeRefs( componentRef, ref ), [ref] );
    const MAX_WIDTH_CONTAINER = parseInt( variables.md.split( "px" ) );
    const validateMobile = function () {
        let width = componentRef.current && componentRef.current.offsetWidth;
        ( width && width <= MAX_WIDTH_CONTAINER ) ? setMobile( true ) : setMobile( false );
    };
    useEffect( () => {
        validateMobile();
        window.addEventListener( "resize", validateMobile );
        return function unmountComponent() {
            window.removeEventListener( "resize", validateMobile );
        };
    }, [props] );
    const getShowClasses = () => {
        if ( mobile ) {
            if ( showInfo ) return "col-12 col-md";
            return "col-12 col-md d-none";
        }
        return "col-12 col-md";
    };
    const renderTags = ( tags: string[] ) => {
        return tags.map( ( tag: string, index: number ) => (
            <Badge bg="" className='dxProjectCard__tag' key={index}>
                {tag}
            </Badge>
        ) );
    };
    const renderMembers = ( members: { name: string, img?: string; }[] ) => {
        return (
            <div className='dxProjectCard__members' key={"members"}>
                {members.slice( 0, 5 ).map( ( member: { name: string, img?: string; }, index: number ) => (
                    <div className="dxProjectCard__memberContainer" key={index}>
                        {member.img ? (
                            <img className="dxProjectCard__profileImage" src={member.img} alt={member.name} key={index}
                                onMouseEnter={() => setActiveTooltip( index )}
                                onMouseLeave={() => setActiveTooltip( -1 )} />
                        ) : renderAvatarProjectMembers(
                            member.name,
                            'dxProjectCard__member',
                            `${index}`,
                            "",
                            () => setActiveTooltip( index ),
                            () => setActiveTooltip( -1 ) )}
                        {activeTooltip === index ? (
                            <span className={`dxProjectCard__tooltip`}>{member.name}</span>
                        ) : null}
                    </div>
                ) )}
                {members.length > 5 ? (
                    <span className="dxProjectCard__badge" data-testid="more-badge">
                        +{members.length - 5}
                    </span>
                ) : null}
            </div>
        );
    };
    return (
        <div {...domAttrs} ref={mergedRootRef} className={classNames( "dxProjectCard", className )}>
            <div className='row'>
                <div className="col-12 col-md-6">
                    <div className='dxProjectCard__data'>
                        {props.img ? (
                            <div className='dxProjectCard__image'>
                                <div className={`loader__container ${loaded ? "d-none" : ""}`}>
                                    <span className="loader"></span>
                                </div>
                                <img
                                    src={props.img.url}
                                    alt={props.img.altText}
                                    loading="lazy" onLoad={() => setLoaded( true )} />
                            </div>
                        ) : (
                            <div className="dxProjectCard__symbol">
                                {props.symbol ? props.symbol.slice( 0, 3 ) : props.name.slice( 0, 3 )}
                            </div>
                        )}
                        <div className='dxProjectCard__nameTag'>
                            <p>{props.name}</p>
                            <div className='dxProjectCard__tags'>
                                {renderTags( props.tags )}
                            </div>
                        </div>
                        {mobile ? (
                            <DXButton
                                onClick={() => setShowInfo( !showInfo )}
                                displayType='unstyled'
                                label='show information'
                                className='dxProjectCard__trigger'
                                hideLabel
                                icon={{
                                    class: showInfo ? getIcon( props.icons, "open", "ci-Chevron_Up" ) : getIcon( props.icons, "close", "ci-Chevron_Down" )
                                }}
                            />
                        ) : null}
                    </div>
                </div>
                <div className={`${getShowClasses()}`}>
                    <div className='dxProjectCard__manager'>
                        <p>Manager</p>
                        <div className='dxProjectCard__managerInfo'>
                            {props.manager.img ? (
                                <img className="dxProjectCard__profileImage"
                                    src={props.manager.img}
                                    alt={props.manager.name}
                                    loading="lazy"
                                    onLoad={() => setLoaded( true )} />
                            ) : renderAvatarLetters( props.manager.name, 'dxProjectCard__avatar', `project-avatar` )}
                            <a href={props.manager.profileLink} target="_blank">
                                {props.manager.name}
                            </a>
                        </div>
                    </div>
                </div>
                <div className={`${getShowClasses()}`}>
                    <div className='dxProjectCard__memberSection'>
                        <p>Team</p>
                        {renderMembers( props.members )}
                    </div>
                </div>
                <div className={`${getShowClasses()}`}>
                    <div className="dxProjectCard__buttonsContainer">
                        <DXButton {...props.action} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DXProjectCard;
