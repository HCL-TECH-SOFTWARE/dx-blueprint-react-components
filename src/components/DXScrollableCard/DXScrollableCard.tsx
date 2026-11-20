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

import "./DXScrollableCard.scss";
import React, { ReactElement, useRef, useMemo } from "react";
import { LinksProps, SliderIcons, getIcon, getLinkTarget, renderAvatarLetters } from "../../utilities";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ExtendableProps, mergeRefs } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface ScrollableCardProps {
    items: CardInfo[];
    icons?: SliderIcons;
}

export interface CardInfo {
    title: string;
    image?: string;
    subtitle?: string;
    links?: LinksProps[];
    hideImage?: boolean,
    [x: string]: any;
}

export interface SliderButtonProps {
    onClick?: any,
    direction: string;
    icons?: SliderIcons;
}

const SliderButton = ( props: SliderButtonProps ) => {
    return (
        <button className={`dxScrollableCard__navBtn ${props.direction === "prev" ? 'dxScrollableCard__navBtn--direction-prev dxScrollableCard__navBtn--display-hide' : 'dxScrollableCard__navBtn--direction-next'}`} onClick={props.onClick}
            data-testid={`slider-${props.direction}-button`}
            aria-label={props.direction}>
            <i className={props.direction === "next" ? getIcon( props.icons, "next", 'ci-Chevron_Right' ) : getIcon( props.icons, "prev", 'ci-Chevron_Left' )}></i>
        </button>
    );
};


const DXScrollableCard = ( props: ExtendableProps<ScrollableCardProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { items: _items, icons: _icons, className, ref, ...rest } = props;
    const METADATA_LIMIT = 2;
    const MAX_LINKS = 2;
    const refComponent = useRef<HTMLDivElement>( null );
    // The internal ref and the consumer ref both point at the root
    const mergedRootRef = useMemo( () => mergeRefs( refComponent, ref ), [ref] );

    const onChangeSlides = () => {
        const firstSlide = refComponent.current?.querySelectorAll( `.dxScrollableCard .slick-slide` )[0];
        const lastSlide = refComponent.current?.querySelectorAll( `.dxScrollableCard .slick-slide` )[props.items.length - 1];
        let prevButton = refComponent.current?.querySelector( `.dxScrollableCard__navBtn--direction-prev` );
        let nextButton = refComponent.current?.querySelector( `.dxScrollableCard__navBtn--direction-next` );

        if ( firstSlide?.classList.contains( "slick-active" ) ) { prevButton?.classList.add( "dxScrollableCard__navBtn--display-hide" ); }
        else {
            prevButton?.classList.remove( "dxScrollableCard__navBtn--display-hide" );
        }
        if ( lastSlide?.classList.contains( "slick-active" ) ) { nextButton?.classList.add( "dxScrollableCard__navBtn--display-hide" ); }
        else {
            nextButton?.classList.remove( "dxScrollableCard__navBtn--display-hide" );
        }

    };

    const renderCards = ( item: any, index: number ) => {
        var metadataHtml: ReactElement[] = [];
        let keys = [
            'image',
            'subtitle',
            'title',
            'links',
            'hideImage'
        ];

        for ( let prop in item ) {
            if ( metadataHtml.length >= METADATA_LIMIT ) continue;
            if ( !keys.includes( prop ) ) {
                metadataHtml.push(
                    <p className={"dxScrollableCard__infoMetadata dxScrollableCard__infoMetadata-" + prop} data-testid={"scrollable-card-infoMetadata-" + prop} >
                        <span className="dxScrollableCard__attributeName">{prop.replace( /([A-Z])/g, " $1" )}: </span>
                        <span className="dxScrollableCard__attributeValue">{item[prop]}</span>
                    </p>
                );
            }
        }

        return (
            <div id="dxScrollableCard__container" className="dxScrollableCard__container" key={index} data-testid="scrollable-card__container">
                {!item?.hideImage && item?.image ? <img id="dxScrollableCard__img" data-testid="scrollable-card__img" src={item?.image} alt="" /> : null}
                {!item?.hideImage && !item?.image && item?.title ? renderAvatarLetters( item.title, 'dxScrollableCard__avatar' ) : null}
                <div className={`dxScrollableCard__info`} data-testid="scrollable-card__info">
                    <p className="dxScrollableCard__infoTitle" data-testid="scrollable-card__infoTitle"> {item?.title} </p>
                    {item?.subtitle ? <p className="dxScrollableCard__infoSubtitle" data-testid="scrollable-card__InfoRole"> {item?.subtitle} </p> : null}
                    {metadataHtml[0]}
                    {metadataHtml[1]}
                    {
                        item?.links && item?.links.length > 0 &&
                        <div className="dxScrollableCard__links">
                            {item.links.slice( 0, MAX_LINKS ).map( ( elem: LinksProps, index: number ) => {
                                return (
                                    <a href={elem.url} target={getLinkTarget( elem.target )} key={"link-" + index} className="dxScrollableCard__infoContact" data-testid="scrollable-card__infoContact">
                                        {elem.label}
                                    </a>
                                );
                            } )}
                        </div>
                    }
                </div>
            </div>
        );
    };

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <SliderButton direction="prev" icons={props.icons} />,
        nextArrow: <SliderButton direction="next" icons={props.icons} />,
        afterChange: onChangeSlides,
        swipe: true
    };

    return (
        <div {...rest} ref={mergedRootRef} className={classNames( "dxScrollableCard", className )} data-testid="scrollable-card">
            {
                props.items.length === 0 ? (
                    <p>No items received</p>
                ) : (
                    <Slider {...settings} className="dxScrollableCard__slider">
                        {props.items.map( ( item, index ) => (
                            renderCards( item, index )
                        ) )}
                    </Slider>
                )
            }
        </div>
    );
};

export default DXScrollableCard;
