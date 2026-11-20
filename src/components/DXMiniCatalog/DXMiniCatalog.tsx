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

import "./DXMiniCatalog.scss";

import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import DXCard, { CardProps } from '../DXCard/DXCard';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderButton from "./components/SliderButton";
import { SliderIcons } from "../../utilities";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";
import { ExtendableProps, SlideSink } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface MiniCatalogProps extends BasicComponent {
    index: number,
    items: CardProps[],
    icons?: SliderIcons;
}

/*
** @deprecated: From @version 1.32.0-alpha use DXGenericMiniCatalog instead
*/
const DXMiniCatalog = ( props: ExtendableProps<MiniCatalogProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { index: _index, items: _items, icons: _icons, _edit, className, ref, ...rest } = props;
    const MAX_WIDTH_MOBILE = 390;
    let componentSize = 0;
    const items: CardProps[] = props.items.map( ( item: CardProps, index: number ) => ( { ...item, index: index } ) );
    const [mobile, setMobile] = useState( false );
    // Slider logic
    const onChangeSlides = () => {
        const firstSlide = document.querySelectorAll( `#dxMiniCatalog-${props.index} .slick-slide` )[0];
        const lastSlide = document.querySelectorAll( `#dxMiniCatalog-${props.index} .slick-slide` )[items.length - 1];
        let prevButton = document.querySelector( `#dxMiniCatalog-${props.index} .dxMiniCatalog__navBtn--direction-prev` );
        let nextButton = document.querySelector( `#dxMiniCatalog-${props.index} .dxMiniCatalog__navBtn--direction-next` );
        if ( firstSlide.classList.contains( "slick-active" ) ) { prevButton?.classList.add( "dxMiniCatalog__navBtn--display-hide" ); }
        else {
            prevButton?.classList.remove( "dxMiniCatalog__navBtn--display-hide" );
        }
        if ( lastSlide.classList.contains( "slick-active" ) ) { nextButton?.classList.add( "dxMiniCatalog__navBtn--display-hide" ); }
        else {
            nextButton?.classList.remove( "dxMiniCatalog__navBtn--display-hide" );
        }
    };

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: <SliderButton direction="prev" icons={props.icons} />,
        nextArrow: <SliderButton direction="next" icons={props.icons} />,
        afterChange: onChangeSlides,
        swipe: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const renderGrid = ( items: CardProps[], isMobile: boolean ) => {
        if ( isMobile ) {
            return (
                <Slider {...settings} className="dxMiniCatalog__slider">
                    {
                        items.map( ( item, index ) => (
                            // react-slick clones its direct children with className/style/tabIndex/onClick; the sink keeps them off the card
                            <SlideSink key={index}><DXCard {...item} /></SlideSink>
                        ) )
                    }
                </Slider>
            );
        }

        let classes = ["dxMiniCatalog__gridCol", "col-12", "col-sm-12"];
        switch ( items.length ) {
            case 1:
                classes.push( "col-md-12" );
                break;
            case 2:
                classes.push( "col-md-6" );
                break;
            case 3:
                classes.push( "col-md-4" );
                break;
            case 4:
                classes.push( "col-md-3" );
                break;
            default:
                classes.push( "col-md-12" );
                break;
        }

        return (
            <div className="dxMiniCatalog__grid row" data-testid="mini-catalog-grid">
                {items.map( ( item: CardProps, index: number ) => (
                    <div className={classes.join( " " )} key={index} data-testid="mini-catalog-col">
                        <DXCard {...item} />
                    </div>
                ) )}
            </div>
        );
    };

    const validateMobile = function () {
        const domMiniCatalog = document.querySelector( `#dxMiniCatalog-${props.index}` ) as HTMLElement;
        componentSize = domMiniCatalog.offsetWidth;
        if ( componentSize <= MAX_WIDTH_MOBILE ) {
            setMobile( true );
        } else {
            setMobile( false );
        }
    };

    useEffect( () => {
        validateMobile();
        window.addEventListener( "resize", validateMobile );
        return function unmountComponent() {
            window.removeEventListener( "resize", validateMobile );
        };
    }, [items] );

    return (
        <div {...rest} ref={ref} className={classNames( "dxMiniCatalog", className )} id={`dxMiniCatalog-${props.index}`}>
            {
                items.length === 0 ? (
                    <p>No items received</p>
                ) : items.length > 0 && items.length < 5 ? (
                    renderGrid( items, mobile )
                ) : (
                    <Slider {...settings} className="dxMiniCatalog__slider">
                        {
                            items.map( ( item: CardProps ) => (
                                // react-slick clones its direct children with className/style/tabIndex/onClick; the sink keeps them off the card
                                <SlideSink key={item.index}><DXCard {...item} /></SlideSink>
                            ) )
                        }
                    </Slider>
                )
            }
            {props._edit && renderEditButton( props._edit )}
        </div>
    );
};

export default DXMiniCatalog;
