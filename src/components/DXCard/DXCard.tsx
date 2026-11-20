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
import "./DXCard.scss";
import React, { useState } from 'react';
import DXButton, { DisplayType } from "../DXButton/DXButton";
import Badge from 'react-bootstrap/Badge';
import { Dropdown } from 'react-bootstrap';
import { LinksProps, getLinkTarget, ImageProps, IconButtonProps, ButtonProps, getValuesFromDateFormat, DateValues, getMomentDayShort } from "../../utilities";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";
import { parseDate } from "../../utilities/dateTime";
import { CardComponent } from "../../utilities/CardComponent/CardComponent";
import { pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";
export interface Event {
    date: string,
    dateFormat?: string,
    startTime: string,
    endTime?: string;
}
export interface IconInfo {
    icon: string,
    text?: string;
}
export interface CardProps extends BasicComponent, CardComponent {
    title: LinksProps,
    cover?: ImageProps,
    coverSticker?: string,
    checkbox?: Function,
    label?: string,
    metaLabel?: string,
    options?: ButtonProps[],
    description?: string,
    bodyMetadata?: string,
    event?: Event,
    iconData?: IconInfo,
    images?: {
        items: ImageProps[],
        moreFn?: Function;
    },
    primaryButton?: IconButtonProps,
    secondaryButton?: IconButtonProps,
    bottomLabel?: boolean,
    dropdownOpen?: boolean,
    _edit?: any,
}
const DXCard = ( props: CardProps & { className?: string; ref?: React.Ref<HTMLDivElement>; } ) => {
    // Own props are pulled out; only DOM-safe extras reach the root (the props type has an index signature).
    const { title: _title, cover: _cover, coverSticker: _coverSticker, checkbox: _checkbox, label: _label, metaLabel: _metaLabel, options: _options, description: _description, bodyMetadata: _bodyMetadata, event: _event, iconData: _iconData, images: _images, primaryButton: _primaryButton, secondaryButton: _secondaryButton, bottomLabel: _bottomLabel, dropdownOpen: _dropdownOpen, _edit, _search, index: _index, className, ref, ...rest } = props;
    const domAttrs = pickDomProps( rest );
    const [kebabId] = useState( () => Math.random().toString( 36 ).substring( 2, 9 ) );
    // States
    const [loaded, setLoaded] = useState( false );
    const DEFAULT_DATE_FORMAT = "MM/DD/YY";
    const renderImage = ( cover: ImageProps | undefined, sticker: string | undefined, checkbox: Function | undefined ) => {
        if ( cover ) {
            return (
                <div className="dxCard__cover" data-testid="card-cover">
                    <div className={`loader__container ${loaded ? "d-none" : ""}`}>
                        <span className="loader"></span>
                    </div>
                    <img className="dxCard__coverImage"
                        src={cover.url}
                        alt={cover.altText || ""}
                        {...( !cover.altText && { role: "presentation" } )}
                        loading="lazy"
                        onLoad={() => setLoaded( true )} />
                    {checkbox ? (
                        <input type="checkbox" onChange={( e ) => checkbox( e )} data-testid="card-cover-checkbox" />
                    ) : null}
                    {sticker ? (
                        <img className="dxCard__coverSticker" src={sticker} alt="" role="presentation" data-testid="card-cover-sticker" />
                    ) : null}
                </div>
            );
        }
    };
    const renderTop = ( label: string | undefined, metaLabel: string | undefined ) => {
        if ( label || metaLabel ) {
            return (
                <div className="dxCard__top">
                    {!props.bottomLabel && label ? (
                        <span data-testid="card-top-label" className="dxCard__topLabel">
                            {label}
                        </span>
                    ) : null}
                    {metaLabel ? (
                        <span className="dxCard__topMetadata" data-testid="card-metadata-label">{metaLabel}</span>
                    ) : null}
                </div>
            );
        }
        return null;
    };
    const renderEvent = ( event: Event ) => {
        const dateFormatted: DateValues = getValuesFromDateFormat( event.date, event.dateFormat ? event.dateFormat : DEFAULT_DATE_FORMAT );
        if ( dateFormatted.day !== "Invalid" && dateFormatted.month !== "Invalid" && dateFormatted.year !== "Invalid" ) {
            let month = parseInt( dateFormatted.month ) < 10 ? ( "0" + dateFormatted.month ) : dateFormatted.month;
            let dateDay = parseInt( dateFormatted.day ) < 10 ? ( "0" + dateFormatted.day ) : dateFormatted.day;
            let date = parseDate( `${dateFormatted.year}-${month}-${dateDay}` );
            let day = date ? date.getDay() : NaN;
            let abbreviation = getMomentDayShort( day );
            return (
                <p className="dxCard__event" data-testid="card-body-event">
                    <span>{abbreviation}</span>
                    {event.endTime ? `${event.startTime} - ${event.endTime}` : `${event.startTime}`}
                </p>
            );
        }
    };
    const renderIconData = ( icon: IconInfo ) => {
        return (
            <div className="dxCard__iconData" data-testid="card-body-icon-data">
                <i className={icon.icon}></i>
                <p>{icon.text ? icon.text : null}</p>
            </div>
        );
    };
    const renderImages = ( images: { items: ImageProps[], moreFn?: Function; } ) => {
        if ( images && images.items && images.items.length > 0 ) {
            return (
                <div className="dxCard__images" data-testid="card-body-images">
                    {images.items.slice( 0, 5 ).map( ( image: ImageProps, key: number ) => (
                        <div className="dxCard__image" key={key}>
                            <img src={image.url} alt={image.altText || ""} {...( !image.altText && { role: "presentation" } )} loading="lazy" />
                        </div>
                    ) )}
                    {images.items.length > 5 ? (
                        <span role="button" onClick={( e ) => handleKey( e, images.moreFn )}
                            style={images.moreFn ? { cursor: "pointer" } : {}}
                            onKeyDown={( e ) => handleKey( e, images.moreFn )}>
                            + {images.items.length - 5} more
                        </span>
                    ) : null}
                </div>
            );
        }
    };
    const renderBody = () => {
        return (
            <>
                {props.description ? (
                    <p className="dxCard__description" data-testid="card-body-description">{props.description}</p>
                ) : null}
                {props.bodyMetadata ? (
                    <p className="dxCard__bodyMetadata" data-testid="card-body-metadata">{props.bodyMetadata}</p>
                ) : null}
                {props.event ? (
                    renderEvent( props.event )
                ) : null}
                {props.iconData ? (
                    renderIconData( props.iconData )
                ) : null}
                {props.images ? (
                    renderImages( props.images )
                ) : null}
                {props.label && props.bottomLabel ? (
                    <span data-testid="card-label-bottom" className="dxCard__topLabel">
                        {props.label}
                    </span>
                ) : null}
            </>
        );
    };
    const renderButtons = () => {
        const buttons = [];
        if ( props.secondaryButton ) {
            let secondProps = {
                ...props.secondaryButton,
                className: "dxCard__secondaryButton",
                displayType: "secondary" as DisplayType,
                "data-testid": "card-secondary-button"
            };
            buttons.push(
                <DXButton {...secondProps} key={0} />
            );
        }
        if ( props.primaryButton ) {
            let primProps = {
                ...props.primaryButton,
                className: "dxCard__primaryButton",
                displayType: "primary" as DisplayType,
                "data-testid": "card-primary-button"
            };
            buttons.push(
                <DXButton {...primProps} key={1} />
            );
        }
        return buttons;
    };
    const handleKey = ( e: any, fn: Function | undefined ) => {
        if ( fn ) {
            if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
                fn();
            }
        }
    };
    return (
        <div {...domAttrs} ref={ref} className={classNames( "dxCard", className )}>
            {renderImage( props.cover, props.coverSticker, props.checkbox )}
            <div className="dxCard__container">
                {props.checkbox && !props.cover ? (
                    <div className="dxCard__checkbox">
                        {/*@ts-ignore: Ignore warning of checkbox being undefined since the if check has been donde previously*/}
                        <input type="checkbox" onChange={( e ) => props.checkbox( e )} data-testid="card-top-checkbox" />
                    </div>
                ) : null}
                <div className="dxCard__content">
                    {renderTop( props.label, props.metaLabel )}
                    <div className="dxCard__body">
                        <h3>
                            <a href={props.title.url}
                                className="dxCard__body__header--overflow"
                                target={getLinkTarget( props.title.target )}
                                data-testid="card-header-link">{props.title.label}</a>
                        </h3>
                        {renderBody()}
                        {props.primaryButton || props.secondaryButton ? (
                            <div className="dxCard__buttons">
                                {renderButtons()}
                            </div>
                        ) : null}
                    </div>
                </div>
                {props.options && props.options.length > 0 ? (
                    <div className="dxCard__kebab">
                        <Dropdown
                            align="end"
                            show={props.dropdownOpen}
                            onToggle={() => {}}
                        >
                            <Dropdown.Toggle variant="link" className="dxCard__kebabToggle p-0 border-0" id={`card-options-dropdown-${kebabId}`} data-testid="card-top-options" aria-label="Dropdown menu">
                                <i className="ci-More_Vertical"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                                className="shadow-sm"
                                style={props.dropdownOpen ? { display: 'block', opacity: 1, visibility: 'visible' } : undefined}
                            >
                                {props.options.map( ( opt: ButtonProps, index: number ) => (
                                    <Dropdown.Item key={index} onClick={( e: any ) => opt.onClick( e )}>
                                        {opt.label}
                                    </Dropdown.Item>
                                ) )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                ) : null}
            </div>
            {props._edit && renderEditButton( props._edit )}
        </div>
    );
};
export default DXCard;
