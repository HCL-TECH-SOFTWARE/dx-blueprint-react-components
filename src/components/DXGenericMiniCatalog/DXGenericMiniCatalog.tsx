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

import React, { ReactElement, useRef } from "react";
import "./DXGenericMiniCatalog.scss";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";
import * as AllComponents from "./../index";
import DXButton from "../DXButton";
import DXEmptyState from "../DXEmptyState";
import { CardComponent } from "../../utilities/CardComponent/CardComponent";
import { EmptyStateProps } from "../DXEmptyState/DXEmptyState";
import { IconButtonProps, SliderIcons } from "../../utilities";
import SliderButton from "./components/SliderButton";
import Slider from "react-slick";
import { ExtendableProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface GenericMiniCatalogProps extends BasicComponent {
    body: MiniCatalogBodyProps;
    header?: MiniCatalogHeaderProps;
}

interface MiniCatalogHeaderProps {
    title: string;
    button?: IconButtonProps;
}

interface MiniCatalogBodyProps {
    items: CardComponent[];
    componentType: string;
    variant?: "slider" | "grid";
    empty?: EmptyStateProps;
    elementsPerRow?: number;
    icons?: SliderIcons;
}

const DXGenericMiniCatalog = ( props: ExtendableProps<GenericMiniCatalogProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { body: _body, header: _header, _edit, className, ref, ...rest } = props;
    let sliderRef = useRef<HTMLDivElement>( null );

    /** Constants **/
    const elementsPerRow = props.body.elementsPerRow;
    const elements: CardComponent[] = props.body.items.map( ( item: CardComponent, index: number ) => ( { ...item, index: index } ) );

    /** Functions **/
    const onChangeSlides = () => {
        let element = sliderRef.current;
        if ( !element ) return;
        const length = elements.length - 1;
        const firstSlide = element.querySelectorAll( ".slick-slide:not(.slick-cloned)" )[0];
        const lastSlide = element.querySelectorAll( ".slick-slide:not(.slick-cloned)" )[length];
        let prevButton = element.querySelector( ".dxGenericMiniCatalog__navbtn.prev" );
        let nextButton = element.querySelector( ".dxGenericMiniCatalog__navbtn.next" );
        if ( firstSlide.classList.contains( "slick-active" ) ) { prevButton?.classList.add( "dxGenericMiniCatalog__navbtn--hide" ); }
        else {
            prevButton?.classList.remove( "dxGenericMiniCatalog__navbtn--hide" );
        }
        if ( lastSlide.classList.contains( "slick-active" ) ) { nextButton?.classList.add( "dxGenericMiniCatalog__navbtn--hide" ); }
        else {
            nextButton?.classList.remove( "dxGenericMiniCatalog__navbtn--hide" );
        }
    };

    /** Component Settings **/
    const slideCalculator = ( maxNum: number ) => {
        if ( elementsPerRow ) {
            return elementsPerRow > maxNum ? maxNum : elementsPerRow;
        } else {
            return maxNum;
        }
    };

    const sliderSettings = {
        infinite: false,
        speed: 500,
        slidesToShow: elementsPerRow ? elementsPerRow : 5,
        slidesToScroll: elementsPerRow ? elementsPerRow : 5,
        prevArrow: <SliderButton direction="prev" icons={props.body.icons} />,
        nextArrow: <SliderButton direction="next" icons={props.body.icons} />,
        afterChange: onChangeSlides,
        swipe: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: slideCalculator( 3 ),
                    slidesToScroll: slideCalculator( 3 ),
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: slideCalculator( 2 ),
                    slidesToScroll: slideCalculator( 2 ),
                    initialSlide: slideCalculator( 2 ),
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: slideCalculator( 1 ),
                    slidesToScroll: slideCalculator( 1 ),
                }
            }
        ]
    };

    /** Supported Components Mini Catalog */
    const SUPPORTED_CARDS: Set<string> = new Set( [
        "DXAppCard",
        "DXCard",
        "DXCardButton",
        "DXEvent",
        "DXEventItem",
        "DXFullImageCard",
        "DXNewsCard",
        "DXProfileCard",
    ] );

    /** Cards Logic */
    const createItemElement = ( itemProps: CardComponent, itemType: string ): ReactElement => {
        let element: ReactElement = <></>;
        //@ts-ignore: Types issues. But the validation is on the next if.
        let type = AllComponents[itemType];
        if ( type && SUPPORTED_CARDS.has( itemType ) ) {
            element = React.createElement( type, itemProps );
        }

        return element;
    };

    /** Render methods */
    const renderEmptyView = () => {
        let propsEmpty = props.body.empty ? props.body.empty : {
            title: "No items to display"
        } as EmptyStateProps;

        return <DXEmptyState {...propsEmpty}></DXEmptyState>;
    };

    const renderCatalogBody = () => {
        if ( props.body.variant === 'grid' ) {
            return (
                <div className="dxGenericMiniCatalog__grid">
                    {renderGrid()}
                </div>
            );
        } else {
            return (
                <div className="dxGenericMiniCatalog__slider" ref={sliderRef}>
                    {renderSlider()}
                </div>
            );
        }
    };

    const renderGrid = () => {
        let cols = elementsPerRow && elementsPerRow > 0 ? elementsPerRow : 5;
        let numRows = Math.ceil( elements.length / cols );
        return Array( numRows ).fill( null ).map( ( item: null, index: number ) => (
            <div className="dxGenericMiniCatalog__row" key={`row-${index}`}>
                {
                    elements.slice( index * cols, ( index + 1 ) * cols ).map( ( itemProps: CardComponent ) => (
                        <div key={`row-${index}-el-${itemProps.index}`} className="dxGenericMiniCatalog__rowItem">
                            {
                                createItemElement( itemProps, props.body.componentType )
                            }
                        </div>
                    ) )
                }
            </div>
        ) );
    };

    const renderSlider = () => {
        return (
            <Slider {...sliderSettings} className="dxGenericMiniCatalog__sliderMain">
                {
                    elements.map( ( itemProps: CardComponent ) => (
                        <div key={`slider-item-${itemProps.index}`}>
                            {createItemElement( itemProps, props.body.componentType )}
                        </div>
                    ) )
                }
            </Slider>
        );
    };

    return (
        <div {...rest} ref={ref} className={classNames( "dxGenericMiniCatalog", className )}>
            {props.header &&
                <div className="dxGenericMiniCatalog__header">
                    <h3 className="dxGenericMiniCatalog__headerLabel">{props.header.title}</h3>
                    {
                        props.header.button &&
                        <div className="dxGenericMiniCatalog__headerButton">
                            <DXButton {...props.header.button} displayType="unstyled"></DXButton>
                        </div>
                    }
                </div>
            }
            {
                //Validating If ComponentType exists
                SUPPORTED_CARDS.has( props.body.componentType ) ? <>{
                    //Validating if Empty State should be rendered
                    ( !elements || ( elements && elements.length == 0 ) ) ? renderEmptyView() : renderCatalogBody()
                }</> : <>{
                    console.warn( "Incorrect TAG for children element was not found in the library: " + props.body.componentType )
                } </>
            }
            {
                props._edit && renderEditButton( props._edit )
            }
        </div>
    );
};

export default DXGenericMiniCatalog;
