import "./DXCardButtonCatalog.scss";
import React from "react";
import DXCardButton, { CardButtonProps } from "../DXCardButton/DXCardButton";
import Slider from "react-slick";
import SliderButton from "./components/SliderButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SliderIcons } from "../../utilities";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";

export interface CBCatalogProps extends BasicComponent {
    elements: CardButtonProps[],
    header?: string,
    variant: string,
    elementsPerRow?: number,
    icons?: SliderIcons;
}

/*
** @deprecated: From @version 1.32.0-alpha use DXGenericMiniCatalog instead
*/
const DXCardButtonCatalog = ( props: CBCatalogProps ) => {
    const items: CardButtonProps[] = props.elements && props.elements.length > 0 ?
        props.elements.map( ( item: CardButtonProps, index: number ) => ( { ...item, index: index } ) ) : [];

    const renderGrid = () => {
        if ( props.elements && props.elements.length > 0 ) {
            let cols = props.elementsPerRow && props.elementsPerRow > 0 ? props.elementsPerRow : 5;
            let numRows = Math.ceil( props.elements.length / cols );
            return Array( numRows ).fill( null ).map( ( item: CardButtonProps, index: number ) => (
                <div className="dxCBCatalog__row" key={`row-${index}`}>
                    {items.slice( index * cols, ( index + 1 ) * cols ).map( ( btn: CardButtonProps ) => (
                        <div key={`row-${index}-el-${btn.index}`} className="dxCBCatalog__rowItem">
                            <DXCardButton {...btn} />
                        </div>
                    ) )}
                </div>
            ) );
        } else {
            return ( <span>No elements received</span> );
        }
    };

    // Slider logic
    const renderSlider = () => {
        if ( props.elements && props.elements.length > 0 ) {
            return (
                <Slider {...sliderSettings} className="dxCBCatalog__sliderMain">
                    {
                        items.slice( 0, 10 ).map( ( btn: CardButtonProps ) => (
                            <DXCardButton {...btn} key={`slider-item-${btn.index}`} />
                        ) )
                    }
                </Slider>
            );
        } else {
            return ( <span>No elements received</span> );
        }
    };

    const onChangeSlides = () => {
        const length = props.elements.length > 10 ? 9 : props.elements.length - 1;
        const firstSlide = document.querySelectorAll( ".slick-slide" )[0];
        const lastSlide = document.querySelectorAll( ".slick-slide" )[length];
        let prevButton = document.querySelector( ".dxCBCatalog__navbtn.prev" );
        let nextButton = document.querySelector( ".dxCBCatalog__navbtn.next" );
        if ( firstSlide.classList.contains( "slick-active" ) ) { prevButton?.classList.add( "dxCBCatalog__navbtn--hide" ); }
        else {
            prevButton?.classList.remove( "dxCBCatalog__navbtn--hide" );
        }
        if ( lastSlide.classList.contains( "slick-active" ) ) { nextButton?.classList.add( "dxCBCatalog__navbtn--hide" ); }
        else {
            nextButton?.classList.remove( "dxCBCatalog__navbtn--hide" );
        }
    };

    const sliderSettings = {
        infinite: false,
        speed: 500,
        slidesToShow: props.elementsPerRow ? props.elementsPerRow : 5,
        slidesToScroll: props.elementsPerRow ? props.elementsPerRow : 5,
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
    const renderElements = () => {
        if ( props.variant === "grid" ) {
            return (
                <div className="dxCBCatalog__grid">
                    {renderGrid()}
                </div>
            );
        } else if ( props.variant === "slider" ) {
            return (
                <div className="dxCBCatalog__slider">
                    {renderSlider()}
                </div>
            );
        } else {
            return ( <span>Invalid variant received</span> );
        }
    };
    return (
        <div className="dxCBCatalog">
            {props.header && props.variant === "grid" ? (
                <h3 className="dxCBCatalog__header">{props.header}</h3>
            ) : null}
            {renderElements()}
            {props._edit && renderEditButton( props._edit )}
        </div>
    );
};
export default DXCardButtonCatalog;
