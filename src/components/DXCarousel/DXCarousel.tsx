import 'bootstrap/dist/css/bootstrap.min.css';
import "./DXCarousel.scss";
import React, { useState, useEffect, useRef } from "react";
import DXButton from "../DXButton/DXButton";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ImageProps, IconButtonProps } from "../../utilities";
import DXEmptyState from "../DXEmptyState";

export interface CarouselItem {
    image: ImageProps,
    title: string,
    subtitle?: string,
    body?: string,
    button?: IconButtonProps;

}
export interface CarouselProps {
    items: CarouselItem[],
    size: ( "small" | "medium" | "big" );
}

const DXCarousel = ( props: CarouselProps ) => {
    const rowRef = useRef<HTMLDivElement>( null );
    const imageRef = useRef<HTMLDivElement>( null );
    const textRef = useRef<HTMLParagraphElement>( null );

    const setSize = (): any => {
        let columnSize: {};
        switch ( props.size ) {
            case "small":
                columnSize = { image: { xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }, content: { xs: 12, sm: 12, md: 8, lg: 8, xl: 8 } };
                break;
            case "medium":
                columnSize = { image: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }, content: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 } };
                break;
            case "big":
                columnSize = { image: { xs: 12, sm: 12, md: 8, lg: 8, xl: 8 }, content: { xs: 12, sm: 12, md: 4, lg: 4, xl: 4 } };
                break;
            default:
                columnSize = { image: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }, content: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 } };
                break;
        }

        return columnSize;
    };

    const [activeIndex, setActiveIndex] = useState( 0 );
    const cols = setSize();

    const setItem = ( index: number ) => {
        let item = props.items[index];
        if ( !item ) return;
        if ( item.body && item.body.length > 120 ) {
            const pElement = textRef.current;
            pElement?.classList.add( "overflow-body" );
        }

        let contentRow = rowRef.current;
        let imageDiv = imageRef.current;

        if ( ( contentRow && contentRow != null ) && ( imageDiv && imageDiv != null ) ) {
            imageDiv.style.backgroundImage = `url( '${item.image.url}' )`;
            contentRow.style.opacity = "0.2";
            requestAnimationFrame( () => {
                contentRow.style.opacity = "1";
            } );
        }
    };

    useEffect( () => {
        if ( props.items.length ) {
            if ( activeIndex >= props.items.length - 1 ) {
                let newActiveIndex = props.items.length - 1;
                setActiveIndex( newActiveIndex );
            }
            setItem( activeIndex );
        }
    }, [props.items] );

    useEffect( () => {
        if ( props.items.length ) {
            setItem( activeIndex );
        }
    }, [activeIndex] );

    const renderIndicators = () => (
        props.items.map( ( item, index ) => (
            <div
                className={`${index === activeIndex ? "dxCarousel__indicator--active" : "dxCarousel__indicator"}`}
                onClick={() => setActiveIndex( index )}
                key={index}
                data-testid="carousel-indicator">
            </div>
        ) )
    );

    const renderButton = ( itemButton: IconButtonProps ) => {
        let buttonProps = {
            ...itemButton,
            "data-testid": "carousel-button"
        };
        return <DXButton className="dxCarousel__button" {...buttonProps} />;
    };

    const renderItems = () => {
        if ( props.items.length <= 3 ) {
            return (
                <Row ref={rowRef}>
                    <Col {...cols.image} data-testid="carousel-image" className="dxCarousel__imageContainer">
                        <div ref={imageRef} className="dxCarousel__image"></div>
                    </Col>
                    <Col {...cols.content} data-testid="carousel-content">
                        <div className="dxCarousel__content">
                            {props.items[activeIndex]?.subtitle && <h3 className="dxCarousel__subtitle">{props.items[activeIndex].subtitle}</h3>}
                            <h2 className={`dxCarousel__title ${props.size}`} data-testid="carousel-item-title">{props.items[activeIndex]?.title}</h2>
                            {
                                props.items[activeIndex]?.body &&
                                <p ref={textRef} className={`dxCarousel__body ${props.size === "big" ? "big" : ""}`}>{props.items[activeIndex].body}</p>
                            }
                            <div className="dxCarousel__bottom">
                                {props.items[activeIndex]?.button && renderButton( props.items[activeIndex].button! )}
                                <div className="dxCarousel__indicators">
                                    {renderIndicators()}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            );
        } else {
            return (
                <span>You cannot have more than 3 items on the carousel</span>
            );
        }
    };

    return (
        <div className="dxCarousel">
            {( props.items.length != 0 ) ? renderItems() : <DXEmptyState title={"No items to render"}></DXEmptyState>}
        </div>
    );
};

export default DXCarousel;
