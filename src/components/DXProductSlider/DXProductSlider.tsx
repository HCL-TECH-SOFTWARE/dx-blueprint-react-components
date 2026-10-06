import React, { ReactElement, useEffect, useRef, useState } from "react";
import "./DXProductSlider.scss";
import variables from "../../global/_exportVariables.module.scss";
import { IconButtonProps, ImageProps, getIcon } from "../../utilities";
import DXButton from "../DXButton";
import { ButtonProps } from "../DXButton/DXButton";
import DXEmptyState from "../DXEmptyState";

export interface ProductSliderProps {
    icons?: {
        scroll?: string;
    };
    items: ProductSliderItem[];
}

export interface ProductSliderItem {
    title: string;
    image: ImageProps;
    category?: string;
    body?: string;
    button?: IconButtonProps;
}

const DXProductSlider = ( props: ProductSliderProps ) => {
    const [isScrollReady, setIsScrollReady] = useState( false );
    const [activeSegment, setActiveSegment] = useState( 0 );
    const [scrollDirection, setScrollDirection] = useState( "foward" );
    const [onAutoScroll, setOnAutoScroll] = useState( false );
    const [onMouseScroll, setOnMouseScroll] = useState( false );
    const [onButtonScroll, setOnButtonScroll] = useState( false );
    const [buttonScrollTarget, setButtonScrollTarget] = useState( 0 );
    const [isMobile, setIsMobile] = useState( false );
    const sliderRef = useRef<HTMLDivElement>( null );
    const imageContainerRef = useRef<HTMLDivElement>( null );
    const Z_INDEX_FIRST_LEVEL = parseInt( variables["zindex-firstLevel"] );

    useEffect( () => {
        if ( !onAutoScroll ) {
            imageManager();
        }
    }, [onAutoScroll, isScrollReady] );

    const resizeManager = () => {
        sliderManager();
        imageManager();
    };

    useEffect( () => {
        window.addEventListener( "resize", () => {
            resizeManager();
        } );

        resizeManager();

        return () => {
            window.removeEventListener( "resize", () => {
                resizeManager();
            } );
        };
    }, [] );

    useEffect( () => {
        resizeManager();
    }, [props.items] );

    useEffect( () => {
        if ( buttonScrollTarget != activeSegment && onButtonScroll ) {
            if ( sliderRef.current && imageContainerRef.current ) {
                let element = sliderRef.current;
                let mobileElement = element.querySelector( ".dxProductSlider__children" )!;
                let elementSize = !isMobile ? element.scrollHeight - element.clientHeight : mobileElement.scrollWidth - mobileElement.clientWidth;
                let children = imageContainerRef.current.children;
                let segmentCount = children.length - 1;
                let segmentSize = elementSize / segmentCount;

                if ( isMobile ) {
                    mobileElement.scrollTo( getScrollObject( segmentSize * buttonScrollTarget + 1 ) );
                } else {
                    sliderRef.current?.scrollTo( getScrollObject( segmentSize * buttonScrollTarget + 1 ) );
                }
            }
        }

    }, [buttonScrollTarget, onButtonScroll] );

    const getScrollObject = ( value: number ): ScrollToOptions => {
        if ( isMobile ) {
            return { left: value, behavior: "smooth" };
        } else {
            return { top: value, behavior: "smooth" };
        }
    };

    const sliderManager = () => {
        if ( sliderRef.current && imageContainerRef.current ) {
            let maxHeight = 0;
            let mobilePlus = 0;
            let tempIsMobile = false;

            if ( window.innerWidth <= 576 && !isMobile ) {
                tempIsMobile = true;
            }

            if ( tempIsMobile ) {
                mobilePlus = imageContainerRef.current.parentElement!.scrollHeight;
            }

            setIsMobile( tempIsMobile );

            sliderRef.current?.querySelectorAll( ".dxProductSlider__card" ).forEach( ( item ) => {
                ( item as HTMLElement ).style.padding = "0";
                if ( maxHeight < item.clientHeight ) {
                    maxHeight = item.clientHeight;
                }
            } );

            maxHeight += 32; // To add padding between slides

            sliderRef.current?.querySelectorAll( ".dxProductSlider__card" ).forEach( ( item ) => {
                ( item as HTMLElement ).style.padding = `${( maxHeight - item.clientHeight ) / 2}px 16px`;
            } );

            sliderRef.current!.style.height = `${maxHeight + mobilePlus}px`;
        }
    };

    const renderNavDots = () => {
        let elements: ReactElement[] = [];

        props.items.forEach( ( _, index ) => {
            elements.push(
                <div key={"PSNavDots--" + index}>
                    <div
                        onClick={( e ) => {
                            if ( sliderRef.current && imageContainerRef.current ) {
                                setOnButtonScroll( true );
                                setButtonScrollTarget( index );
                            }
                        }
                        }></div>
                </div>
            );
        } );

        return elements;
    };

    const imageManager = () => {
        let element = sliderRef.current;
        if ( !element || !imageContainerRef.current ) {
            return;
        }
        let mobileElement = element.querySelector( ".dxProductSlider__children" )!;

        let elementSize = !isMobile ? element.scrollHeight - element.clientHeight : mobileElement.scrollWidth - mobileElement.clientWidth;
        let scrollValue = !isMobile ? element.scrollTop : mobileElement.scrollLeft;
        let scrollPercent = scrollValue / elementSize;
        let currenScroll = scrollValue;
        let children = imageContainerRef.current.children;
        let segmentCount = children.length - 1;
        let segmentSize = elementSize / segmentCount;
        let segmetnSizePercent = 1 / segmentCount;
        let segmentPercent = ( currenScroll / segmentSize ) - Math.floor( currenScroll / segmentSize );
        let currentSegmet = Math.floor( currenScroll / segmentSize );
        let height = element.querySelector( ".dxProductSlider__images" )?.clientHeight! - element.querySelector( "img" )?.clientHeight!;
        let width = element.querySelector( ".dxProductSlider__images" )?.clientWidth! - element.querySelector( "img" )?.clientHeight!;
        let navDots = element.querySelector( ".dxProductSlider__navDots" )!.children;

        //Scroll message position, direction and opacity code
        let scrollMessage: HTMLElement = element.querySelector( ".dxProductSlider__scrollMessage" )!;
        if ( scrollMessage ) {
            if ( isMobile ) {
                scrollMessage.classList.add( "dxProductSlider__scrollMessage--right" );

                scrollMessage.style.removeProperty( "top" );
                scrollMessage.style.left = `${scrollPercent * 100}%`;
                scrollMessage.style.transform = `translate( -${100 * scrollPercent}% , -100%)`;
            } else {
                scrollMessage.classList.remove( "dxProductSlider__scrollMessage--right" );

                scrollMessage.style.removeProperty( "transform" );
                scrollMessage.style.removeProperty( "left" );
                scrollMessage.style.top = `${scrollPercent * 95}%`;
            }

            if ( currentSegmet == 0 ) {
                scrollMessage.classList.remove( "dxProductSlider__scrollMessage--left" );
                scrollMessage.classList.remove( "dxProductSlider__scrollMessage--up" );

                scrollMessage.style.opacity = `${1 - segmentPercent}`;
            } else if ( currentSegmet == segmentCount - 1 ) {
                scrollMessage.classList.add( isMobile ? "dxProductSlider__scrollMessage--left" : "dxProductSlider__scrollMessage--up" );
                scrollMessage.style.opacity = `${segmentPercent}`;
            } else if ( currentSegmet == segmentCount ) {
                scrollMessage.style.opacity = `${1}`;
            } else {
                scrollMessage.style.opacity = `${0}`;
            }
        }

        //Restore scroll Direction at the limits
        if ( scrollPercent == 0 && !onButtonScroll ) {
            setScrollDirection( "foward" );
            setOnAutoScroll( false );
        } else if ( scrollPercent >= 1 && !onButtonScroll ) {
            setScrollDirection( "backward" );
            setOnAutoScroll( false );
        }

        //Detecting changes on segments
        if ( scrollPercent >= ( activeSegment + 1 ) * segmetnSizePercent ) {
            setActiveSegment( activeSegment + 1 );
            setScrollDirection( "foward" );
            setOnAutoScroll( false || onMouseScroll || onButtonScroll );
        } else if ( scrollPercent < ( activeSegment ) * segmetnSizePercent ) {
            setActiveSegment( activeSegment - 1 );
            setScrollDirection( "backward" );
            setOnAutoScroll( false || onMouseScroll || onButtonScroll );
        }

        //Auto scroll code
        let scrollTarget = isMobile ? mobileElement : element;
        let autoScrollLimit = 0.3;

        if ( currentSegmet == buttonScrollTarget && onButtonScroll ) {
            setOnButtonScroll( false );
        }

        if ( scrollDirection == "foward" && segmentPercent >= autoScrollLimit && !onAutoScroll && !onButtonScroll && currentSegmet == activeSegment ) {
            scrollTarget.scrollTo( getScrollObject( ( activeSegment + 1 ) * segmentSize + 1 ) );
            setOnAutoScroll( true );
        } else if ( scrollDirection == "backward" && segmentPercent <= ( 1 - autoScrollLimit ) && !onAutoScroll && currentSegmet == activeSegment ) {
            scrollTarget.scrollTo( getScrollObject( ( activeSegment ) * segmentSize - 1 ) );
            setOnAutoScroll( true );
        }

        for ( let i = 0; i < children.length; i++ ) {
            let image = children[i] as HTMLImageElement;
            let order = 0;

            //The Order value represents the position in the list for N items
            //If value is 0 the item is in front
            //If value is N the item is last in the list
            if ( i >= currentSegmet ) {
                order = ( children.length - 1 ) - ( i - currentSegmet );
            } else {
                order = currentSegmet - ( 1 + i );
            }

            //The offset is a percent value that is used to calculate the Translate value for the Transform style
            let offset = ( segmentPercent + order ) / ( segmentCount );

            if ( ( scrollPercent >= segmetnSizePercent * i ) && ( scrollPercent < segmetnSizePercent * ( i + 1 ) ) ) {
                //Giving a some tolerance to the scroll to avoid the item to inmediatly hide after a few pixels of scroll
                let inTolerance = segmentPercent <= autoScrollLimit;

                image.style.transform = `translate( -${( 1 - segmentPercent ) * width}px, ${( 1 - segmentPercent ) * height}px)`;

                if ( ( scrollPercent == segmetnSizePercent * i || scrollDirection == "backward" || inTolerance ) && segmentPercent <= 1 - autoScrollLimit ) {
                    image.style.zIndex = `${Z_INDEX_FIRST_LEVEL + children.length}`;
                } else {
                    image.style.zIndex = `${Z_INDEX_FIRST_LEVEL - children.length}`;
                }

                ( image.firstChild! as HTMLElement ).style.opacity = `${1 - 0.6 * ( segmentPercent )}`;

                if ( segmentPercent <= 0.5 ) {
                    ( navDots[i].firstChild as HTMLElement ).style.opacity = `${1 - segmentPercent * 2}`;
                } else {
                    ( navDots[i].firstChild as HTMLElement ).style.opacity = `0`;
                }

            } else {
                image.style.transform = `translate( -${( offset ) * width}px, ${( offset ) * height}px)`;
                image.style.zIndex = `${Z_INDEX_FIRST_LEVEL + order}`;
                if ( order == segmentCount - 1 ) {
                    ( image.firstChild! as HTMLImageElement ).style.opacity = `${0.4 + 0.6 * ( segmentPercent )}`;
                } else {
                    ( image.firstChild! as HTMLImageElement ).style.opacity = "0.4";
                }

                if ( segmentPercent <= 0.5 && ( i == currentSegmet + 1 ) ) {
                    ( navDots[i].firstChild as HTMLElement ).style.opacity = `${segmentPercent * 2}`;
                } else if ( i == currentSegmet + 1 ) {
                    ( navDots[i].firstChild as HTMLElement ).style.opacity = `${1}`;
                } else {
                    ( navDots[i].firstChild as HTMLElement ).style.opacity = `0`;
                }
            }
        }

        setIsScrollReady( true );
    };

    const renderImages = () => {
        let elements: ReactElement[] = [];

        props.items.forEach( ( item, index ) => {
            elements.push(
                <div key={"PSImage--" + index} className="dxProductSlider__imageContainer" role="presentation">
                    <img src={item.image.url} className="dxProductSlider__image"></img>
                </div>
            );
        } );

        return elements;
    };

    const renderSliderButton = ( button: IconButtonProps ) => {
        let buttonProps: ButtonProps = button;
        buttonProps.displayType = "secondary";
        buttonProps.className = "dxProductSlider__button";
        return ( <DXButton {...buttonProps} /> );
    };

    const renderItems = () => {
        let elements: ReactElement[] = [];

        props.items.forEach( ( { category, title, body, button }, index ) => {
            elements.push(
                <div key={"PSItem--" + index} className="dxProductSlider__card" data-testid="PS__item">
                    {category &&
                        <div className="dxProductSlider__category">
                            {category}
                        </div>
                    }
                    <div className="dxProductSlider__title">
                        {title}
                    </div>
                    {title &&
                        <div className="dxProductSlider__body">
                            {body}
                        </div>
                    }
                    {button &&
                        <div className="dxProductSlider__buttonContainer">
                            {renderSliderButton( button )}
                        </div>
                    }
                </div>
            );
        } );

        return elements;
    };

    return (
        <div className="dxProductSlider"
            ref={sliderRef}
            onMouseDown={() => {
                setOnAutoScroll( true );
                setOnMouseScroll( true );
            }}
            onMouseUp={async () => {
                setOnAutoScroll( false );
                setOnMouseScroll( false );
            }}
            onScroll={( e ) => { imageManager(); }}>
            {
                props.items.length > 0 ? (
                    <>
                        {
                            isMobile &&
                            <div className="dxProductSlider__imagesContainer dxProductSlider__mobileView" >
                                <div ref={imageContainerRef} className="dxProductSlider__images" style={{ opacity: isScrollReady ? 1 : 0 }}>
                                    {renderImages()}
                                </div>
                                <div className="dxProductSlider__navDots">
                                    {renderNavDots()}
                                </div>
                                <div className="dxProductSlider__scrollMessage">
                                    Scroll <i className={getIcon( props.icons, "scroll", "ci-Arrow_Down_LG" )} ></i>
                                </div>
                            </div>
                        }
                        <div data-testid="PS__childrenContainer" className="dxProductSlider__children" onScroll={isMobile ? ( e ) => { imageManager(); } : undefined}>
                            {renderItems()}
                        </div>
                        {
                            !isMobile &&
                            <div className="dxProductSlider__imagesContainer dxProductSlider__desktopView" >
                                <div ref={imageContainerRef} className="dxProductSlider__images" style={{ opacity: isScrollReady ? 1 : 0 }}>
                                    {renderImages()}
                                </div>
                                <div className="dxProductSlider__navDots">
                                    {renderNavDots()}
                                </div>
                                <div className="dxProductSlider__scrollMessage">
                                    Scroll <i className={"dxProductSlider__scrollIcon " + getIcon( props.icons, "scroll", "ci-Arrow_Down_LG" )} ></i>
                                </div>
                            </div>
                        }
                    </>
                ) : (
                    <DXEmptyState title={"No items to render"}></DXEmptyState>
                )
            }
        </div>
    );
};

export default DXProductSlider;
