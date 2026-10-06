import "./DXFullImageMiniCatalog.scss";

import React, { useState, useEffect } from "react";
import DXFullImageCard, { FullImageCardProps } from "../DXFullImageCard/DXFullImageCard";
import FullImageCard from "../DXFullImageCard";
// Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SliderButton from "./components/SliderButton";
import { SliderIcons } from "../../utilities";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";

export interface FullImageMiniCatalogProps extends BasicComponent {
    index: number,
    items: FullImageCardProps[];
    icons?: SliderIcons;
}

/*
** @deprecated: From @version 1.32.0-alpha use DXGenericMiniCatalog instead
*/
const DXFullImageMiniCatalog = ( props: FullImageMiniCatalogProps ) => {
    const MAX_WIDTH_MOBILE = 390;
    let componentSize = 0;
    const items: FullImageCardProps[] = props.items.map( ( item: FullImageCardProps, index: number ) => ( { ...item, index: index } ) );
    const [mobile, setMobile] = useState( false );

    // Slider logic
    const onChangeSlides = () => {
        const firstSlide = document.querySelectorAll( `#dxFullImgMiniC-${props.index} .slick-slide` )[0];
        const lastSlide = document.querySelectorAll( `#dxFullImgMiniC-${props.index} .slick-slide` )[items.length - 1];
        let prevButton = document.querySelector( `#dxFullImgMiniC-${props.index} .dxFullImgMiniC__navBtn--direction-prev` );
        let nextButton = document.querySelector( `#dxFullImgMiniC-${props.index} .dxFullImgMiniC__navBtn--direction-next` );
        if ( firstSlide.classList.contains( "slick-active" ) ) { prevButton?.classList.add( "dxFullImgMiniC__navBtn--display-hide" ); }
        else {
            prevButton?.classList.remove( "dxFullImgMiniC__navBtn--display-hide" );
        }
        if ( lastSlide.classList.contains( "slick-active" ) ) { nextButton?.classList.add( "dxFullImgMiniC__navBtn--display-hide" ); }
        else {
            nextButton?.classList.remove( "dxFullImgMiniC__navBtn--display-hide" );
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
    const renderGrid = ( items: FullImageCardProps[], isMobile: boolean ) => {
        if ( isMobile ) {
            return (
                <Slider {...settings} className="dxFullImgMiniC__slider">
                    {
                        items.map( ( item: FullImageCardProps ) => (
                            <FullImageCard {...item} key={item.index} />
                        ) )
                    }
                </Slider>
            );
        }

        let classes = ["dxFullImgMiniC__gridCol", "col-12", "col-sm-12"];
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
            <div className="dxFullImgMiniC__grid row" data-testid="full-img-mini-grid">
                {items.map( ( item: FullImageCardProps ) => (
                    <div className={classes.join( " " )} key={item.index} data-testid="full-img-mini-col">
                        <FullImageCard {...item} />
                    </div>
                ) )}
            </div>
        );
    };

    const validateMobile = function () {
        const domMiniCatalog = document.querySelector( `#dxFullImgMiniC-${props.index}` ) as HTMLElement;
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
    }, [props.items] );

    return (
        <div className="dxFullImgMiniC" id={`dxFullImgMiniC-${props.index}`}>
            {items.length === 0 ? (
                <p>No items received</p>
            ) : items.length > 0 && items.length < 5 ? (
                renderGrid( items, mobile )
            ) : (
                <Slider {...settings} className="dxFullImgMiniC__slider">
                    {
                        items.map( ( item: FullImageCardProps ) => (
                            <DXFullImageCard {...item} key={item.index} />
                        ) )
                    }
                </Slider>
            )}
            {props._edit && renderEditButton( props._edit )}
        </div>
    );
};

export default DXFullImageMiniCatalog;
