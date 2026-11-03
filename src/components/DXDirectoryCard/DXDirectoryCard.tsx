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

import React, { ReactElement, useEffect, useState } from 'react';
import "../../global/loaders.scss";
import "./DXDirectoryCard.scss";
import { LinksProps, TagProps, renderAvatarLetters, IconButtonProps, StateIcons, getIcon, getLinkTarget } from '../../utilities';
import DXButton, { DisplayType } from '../DXButton/DXButton';
import Badge from 'react-bootstrap/Badge';
import { CardComponent } from '../../utilities/CardComponent/CardComponent';
export interface DirectoryCardProps extends CardComponent {
    index: number,
    title: string,
    subtitle: LinksProps,
    image?: string,
    [x: string]: any,
    labels?: TagProps[],
    primaryButtons?: IconButtonProps[],
    secondaryButtons?: IconButtonProps[];
    icons?: StateIcons;
}
const DXDirectoryCard = ( props: DirectoryCardProps ) => {
    const MAX_WIDTH_CONTAINER = 768;
    const METADATA_MAX = 2;
    const [loaded, setLoaded] = useState( false );
    const [mobile, setMobile] = useState( false );
    const [showInfo, setShowInfo] = useState( false );
    const validateMobile = function () {
        window.innerWidth <= MAX_WIDTH_CONTAINER ? setMobile( true ) : setMobile( false );
    };
    useEffect( () => {
        validateMobile();
        window.addEventListener( "resize", validateMobile );
        return function unmountComponent() {
            window.removeEventListener( "resize", validateMobile );
        };
    }, [props] );
    var metadataHtml: ReactElement[] = [];
    var metadataMobileHtml: ReactElement[] = [];
    var labelsHtml: ReactElement[] = [];
    var primaryButtonsHtml: ReactElement[] = [];
    var secondaryButtonsHtml: ReactElement[] = [];
    let keys = [
        'index',
        'title',
        'subtitle',
        'image',
        'labels',
        'primaryButtons',
        'secondaryButtons',
        '_search'
    ];
    for ( let prop in props ) {
        if ( !keys.includes( prop ) && prop && props[prop]?.label ) {
            let propLabel = prop.replace( /([A-Z])/g, " $1" );
            metadataHtml.push(
                <div className='col' key={'key-' + prop}>
                    <p className="dxDirectoryCard__info" >
                        <span className="dxDirectoryCard__infoKey">{propLabel}</span><br />
                        <a href={props[prop]?.url}
                            className="dxDirectoryCard__infoValue"
                            target={getLinkTarget( props[prop]?.target )}
                            data-testid="icon-directorycard"
                            aria-label={'icon-' + props[prop]?.label}
                            key={"key-" + prop}
                        >
                            {props[prop]?.label}
                        </a>
                    </p>
                </div>
            );
            metadataMobileHtml.push(
                <div className='dxDirectoryCard__info' key={'key-' + prop}>
                    <span className='dxDirectoryCard__infoKey'>{propLabel}</span>
                    <a href={props[prop]?.url}
                        className="dxDirectoryCard__infoValue"
                        target={getLinkTarget( props[prop]?.target )}
                        key={"key-" + prop}
                    >
                        {props[prop]?.label}
                    </a>
                </div>
            );
        }
    }
    if ( props.labels && props.labels.length > 0 ) {
        props.labels.map( ( item: any, index ) => {
            labelsHtml.push(
                <li key={`li-label-${index}`}>
                    <Badge
                        bg=""
                        className="dxDirectoryCard__tagItem"
                        data-testid="dx-directory-card-tagItem"
                        key={"tag-" + item.label}
                        style={item.color ? { borderColor: item.color, color: item.color } : {}}
                    >
                        {item.label}
                    </Badge>
                </li>
            );
        } );
    }
    if ( props.primaryButtons && props.primaryButtons.length > 0 ) {
        let counter: number = 0;
        props.primaryButtons.map( ( item: IconButtonProps, index ) => {
            if ( item.label && !item.hideLabel ) {
                counter++;
            }
            if ( counter <= 2 ) {
                let primProps = {
                    ...item,
                    className: 'dxDirectoryCard__button',
                    displayType: "primary" as DisplayType
                };
                primaryButtonsHtml.push(
                    <li key={`li-primary-${index}`}>
                        <DXButton {...primProps} key={`button-primary-${index}`} />
                    </li>
                );
            }
        } );
    }
    if ( props.secondaryButtons && props.secondaryButtons.length > 0 ) {
        props.secondaryButtons.map( ( item: IconButtonProps, index ) => {
            let secondProps = {
                ...item,
                icon: item.icon ? { ...item.icon } : undefined,
                className: "dxDirectoryCard__button",
                displayType: "unstyled" as DisplayType,
            };
            secondaryButtonsHtml.push(
                <li key={`li-secondary-${index}`}>
                    <DXButton {...secondProps} key={`button-secondary-${index}`} />
                </li>
            );
        } );
    }
    const renderButtons = () => {
        let buttonCount = primaryButtonsHtml.length + secondaryButtonsHtml.length + labelsHtml.length;
        let classMobile = ( mobile && ( buttonCount < 3 ) ) ? '--mobileInLine' : '';
        let keys = [
            'labels',
            'primaryButtons',
            'secondaryButtons'
        ];
        let counterSections = 0;
        for ( let prop in props ) {
            if ( keys.includes( prop ) && prop ) {
                counterSections++;
            }
        }
        let classAlign = counterSections === 1 && !mobile ? '--center' : '';
        return (
            <div className={"dxDirectoryCard__containerButtons" + classAlign + classMobile} data-testid="dx-directory-card-buttons-container">
                {
                    labelsHtml.length > 0 ?
                        <div className="dxDirectoryCard__labels">
                            <ul>
                                {labelsHtml.slice( 0, 5 ).map( item => item )}
                            </ul>
                        </div>
                        : null
                }
                {
                    primaryButtonsHtml.length > 0 ?
                        <div className="dxDirectoryCard__buttonsPrimary">
                            <ul>
                                {primaryButtonsHtml.map( item => item )}
                            </ul>
                        </div>
                        : null
                }
                {
                    secondaryButtonsHtml.length > 0 ?
                        <div className="dxDirectoryCard__buttonsSecondary">
                            <ul>
                                {secondaryButtonsHtml.map( item => item )}
                            </ul>
                        </div>
                        : null
                }
            </div>
        );
    };
    const renderImage = () => {
        return (
            <>
                {props.image ?
                    <div className='dxDirectoryCard__imgContainer'>
                        <div className={`loader__container ${loaded ? "d-none" : ""}`}>
                            <span className="loader"></span>
                        </div>
                        <img id="dxDirectoryCard__img"
                            data-testid="dx-directory-card-img"
                            src={props.image} alt={props.title + ' image'}
                            loading='lazy'
                            onLoad={() => setLoaded( true )}
                            key='image' />
                    </div>
                    : renderAvatarLetters( props.title, 'dxDirectoryCard__avatar', `avatar-${props.index}` )}
            </>
        );
    };
    const renderDataInfo = () => {
        return (
            <>
                <p className="dxDirectoryCard__dataTitle" key='title' >{props.title} </p>
                <a className="dxDirectoryCard__dataLink" href={props.subtitle.url}> {props.subtitle.label} </a>
            </>
        );
    };
    return (
        <div
            id={`dxDirectoryCard-${props.index}`}
            className="dxDirectoryCard"
            data-testid="dx-directory-card"
            aria-label='dxDirectoryCard'
        >
            {mobile ?
                <>
                    <div className="dxDirectoryCard__containerInfo">
                        {renderImage()}
                        <div className="dxDirectoryCard__data" data-testid="dx-directory-card-data">
                            {renderDataInfo()}
                        </div>
                        <DXButton
                            onClick={() => setShowInfo( !showInfo )}
                            displayType='unstyled'
                            label='show information'
                            className='dxDirectoryCard__trigger'
                            hideLabel
                            icon={{
                                class: showInfo ? getIcon( props.icons, "close", "ci-Chevron_Up" ) : getIcon( props.icons, "open", "ci-Chevron_Down" )
                            }}
                        />
                    </div>
                    <div className={showInfo ? "dxDirectoryCard__mobileData--visible" : "dxDirectoryCard__mobileData"}>
                        <div className='dxDirectoryCard__metaData' data-testid="dx-directory-card-metadata">
                            {metadataMobileHtml && metadataMobileHtml.length > 0 ? metadataMobileHtml.slice( 0, METADATA_MAX ).map( ( item ) => ( item ) ) : null}
                        </div>
                        {renderButtons()}
                    </div>
                </>
                :
                <div className='row justify-content-between'>
                    <div className='col-4 dxDirectoryCard__profile'>
                        {renderImage()}
                        <div className="dxDirectoryCard__data" data-testid="dx-directory-card-data">
                            {renderDataInfo()}
                        </div>
                    </div>
                    {metadataHtml && metadataHtml.length > 0 ? metadataHtml.slice( 0, METADATA_MAX ).map( ( item ) => ( item ) ) : null}
                    <div className="col dxDirectoryCard__colButtons">
                        {renderButtons()}
                    </div>
                </div>
            }
        </div>
    );
};
export default DXDirectoryCard;
