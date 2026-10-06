import "./DXHalfParallax.scss";
import React, { ReactElement, useState, useEffect } from 'react';
import { parseContentAndMedia, ImageProps, LinksProps, getLinkTarget } from "../../utilities";
export interface ParallaxProps {
    slidesCollection: Fold[];
};
interface Fold {
    banner: Banner,
    content: Content;
}
interface Banner {
    keypad?: Keypad;
    backgroundColor?: string;
    fontColor?: string;
    topImage?: ImageProps;
    mainImage?: ImageProps;
    bottomImage?: ImageProps;
}
interface Content {
    title?: string;
    richText?: string;
    keypad?: Keypad;
    backgroundColor?: string;
    fontColor?: string;
    viewMore?: LinksProps;
    topImage?: ImageProps;
    mainImage?: ImageProps;
    bottomImage?: ImageProps;
}
interface Keypad {
    background?: string,
    buttons: LinksProps[];
}
const getBackground = ( cnt: Banner | Content ) => {
    if ( cnt.backgroundColor && cnt.backgroundColor !== '' ) {
        if ( cnt.backgroundColor && cnt.backgroundColor.startsWith( '#' ) ) {
            let colorHex = cnt.backgroundColor;
            return { background: colorHex };
        } else {
            let pathImage = cnt.backgroundColor;
            return { backgroundImage: `url(${pathImage})` };
        }
    }
    return { background: "var(--white)" };
};
const getFontColor = ( cnt: Banner | Content ) => {
    if ( cnt.fontColor && cnt.fontColor.startsWith( '#' ) ) {
        let colorHex = cnt.fontColor;
        return { color: colorHex };
    }
    return { color: "var(--dark-dark)" };
};
const DXHalfParallax = ( props: ParallaxProps ) => {
    let [mobile, setMobile] = useState( false );
    const mql: MediaQueryList = matchMedia( "(max-width: 576px)" );
    const validateMobile = function () {
        mql.matches ? setMobile( true ) : setMobile( false );
    };
    useEffect( () => {
        validateMobile();
        mql.addEventListener( "change", validateMobile );
        return function unmountComponent() {
            mql.removeEventListener( "change", validateMobile );
        };
    } );
    let parallaxSlides: ReactElement[] = [];
    const renderButtons = ( slide: Banner | Content, classForButton: string ) => {
        const backgroundColorButton = slide.keypad && slide.keypad.background !== "" ? slide.keypad.background : "var(--primary-primary)";
        const fontColor = getFontColor( slide );
        let target;
        const inlineStyles = {
            backgroundColor: backgroundColorButton,
            color: fontColor.color
        };
        if ( slide.keypad && slide.keypad.buttons.length > 0 ) {
            let setOfButtons = slide.keypad.buttons.map( ( _button, index ) => {
                target = _button.target ? getLinkTarget( _button.target ) : "_self";
                return (
                    <a href={_button.url} key={index} style={inlineStyles} target={target}>{_button.label}</a>
                );
            } );
            return (
                <div className={classForButton}>
                    {setOfButtons}
                </div>
            );
        } else {
            return ( <div></div> );
        }
    };
    const renderViewMore = ( slide: Content, backgroundSlide?: {} ) => {
        if ( slide.viewMore && slide.viewMore.url !== "" ) {
            const label = slide.viewMore.label !== "" ? slide.viewMore.label : "View More";
            const fontColor = getFontColor( slide );
            const target = slide.viewMore.target ? getLinkTarget( slide.viewMore.target ) : "_self";
            const inlineStyles = {
                color: fontColor.color
            };
            return (
                <div className="dxHalfParallax__viewMore" style={backgroundSlide}>
                    <a href={slide.viewMore.url} style={inlineStyles} target={target}> {label} </a>
                </div>
            );
        }
        return <></>;
    };
    const renderTopImage = ( slide: Banner | Content ) => {
        if ( slide.topImage && slide.topImage.url !== '' ) {
            const pathImage = slide.topImage.url;
            const inlineStyle = {
                backgroundImage: `url(${pathImage})`
            };
            return (
                <div className="dxHalfParallax__topImage" style={inlineStyle}></div>
            );
        }
        return '';
    };
    const renderBottomImage = ( slide: Banner | Content ) => {
        if ( slide.bottomImage && slide.bottomImage.url !== "" ) {
            const pathImage = slide.bottomImage.url;
            const inlineStyle = {
                backgroundImage: `url(${pathImage})`
            };
            return (
                <div className="dxHalfParallax__bottomImage" style={inlineStyle}></div>
            );
        }
        return "";
    };
    const renderMainImage = ( slide: Banner | Content ) => {
        if ( slide.mainImage && slide.mainImage.url !== "" ) {
            return (
                <figure>
                    <img src={slide.mainImage.url} alt={slide.mainImage.url}></img>
                </figure>
            );
        }
        return "";
    };
    const renderBannerSlide = ( content: Banner, index: number ) => {
        const backgroundSlide = getBackground( content );
        return (
            <figure className="dxHalfParallax__slide dxbanner" key={index} style={backgroundSlide}>
                <div className="dxHalfParallax__banner" >
                    {
                        renderTopImage( content )
                    }
                    {
                        renderMainImage( content )
                    }
                    {
                        renderButtons( content, "dxHalfParallax__bannerButtons" )
                    }
                    {
                        renderBottomImage( content )
                    }
                </div>
            </figure>
        );
    };
    const renderContentSlide = ( content: Content, index: number ) => {
        const backgroundSlide = getBackground( content );
        const fontColor = getFontColor( content );
        return (
            <section className="dxHalfParallax__slide dxcontent" key={index} style={backgroundSlide}>
                <div className="dxHalfParallax__content" >
                    {
                        ( content.title && content.title !== "" ? <div className="dxHalfParallax__title"> <h4 style={fontColor}> {content.title} </h4> </div> : "" )
                    }
                    {
                        ( content.richText && content.richText !== "" ? <div className="dxHalfParallax__richText"> {parseContentAndMedia( content.richText, false )}  </div> : "" )
                    }
                    {
                        renderButtons( content, "dxHalfParallax__contentButtons" )
                    }
                    {
                        renderViewMore( content, backgroundSlide )
                    }
                </div>
            </section>
        );
    };
    const renderElementsForBannerSlide = ( slide: Banner ) => {
        return (
            <div className="dxHalfParallax__banner" >
                {
                    renderMainImage( slide )
                }
                {
                    renderButtons( slide, "dxHalfParallax__bannerButtons" )
                }
            </div>
        );
    };
    const renderElementsForContentSlide = ( fontColor: any, slide: Content ) => {
        return (
            <div className="dxHalfParallax__content" >
                {
                    ( slide.title && slide.title !== "" ? <div className="dxHalfParallax__title"> <h4 style={fontColor}> {slide.title} </h4> </div> : "" )
                }
                {
                    ( slide.richText && slide.richText !== "" ? <div className="dxHalfParallax__richText"> {parseContentAndMedia( slide.richText, false )}  </div> : "" )
                }
                {
                    renderButtons( slide, "dxHalfParallax__contentButtons" )
                }
                {
                    renderViewMore( slide )
                }
            </div>
        );
    };
    const renderSlidesMobile = ( slidesGroupedInPairs: Fold, numberOfSlidesForIndex: number ) => {
        const bannerSlide = slidesGroupedInPairs.banner;
        const contentSlide = slidesGroupedInPairs.content;
        if ( bannerSlide != undefined && contentSlide != undefined ) {
            const backgroundBanner = getBackground( bannerSlide );
            const backgroundContent = getBackground( contentSlide );
            const fontColorContent = getFontColor( contentSlide );
            //Print first banner then content
            return (
                // Don't like the fact of adding a div for mobile that is not present in desktop
                <div key={numberOfSlidesForIndex} >
                    <figure className="dxHalfParallax__slide dxbanner" style={backgroundBanner} >
                        {renderElementsForBannerSlide( bannerSlide )}
                    </figure>
                    <div className="dxHalfParallax__bottomTriangle">
                        <div className="outer">
                            <div className="inner" style={backgroundBanner}></div>
                        </div>
                    </div>
                    <section className="dxHalfParallax__slide dxcontent" style={backgroundContent} >
                        {renderElementsForContentSlide( fontColorContent, contentSlide )}
                    </section>
                </div>
            );
        }
        return <React.Fragment key={numberOfSlidesForIndex}></React.Fragment>;
    };
    if ( props.slidesCollection && props.slidesCollection.length > 0 ) {
        if ( mobile ) {
            //Render mobile slides
            props.slidesCollection.forEach( ( fold: Fold, index ) => {
                parallaxSlides.push( renderSlidesMobile( fold, index ) );
            } );
            return (
                <div className="dxHalfParallax">
                    {
                        parallaxSlides
                    }
                </div>
            );
        } else {
            //Render desktop slides
            props.slidesCollection.forEach( ( fold: Fold, index ) => {
                if ( fold.banner ) {
                    parallaxSlides.push( renderBannerSlide( fold.banner, index ) );
                }
                if ( fold.content ) {
                    parallaxSlides.push( renderContentSlide( fold.content, 1000 - index ) );
                }
            } );
            return (
                <div className="dxHalfParallax">
                    {
                        parallaxSlides
                    }
                </div>
            );
        }
    } else {
        return ( <p>Half Parallax did not receive any slides as input</p> );
    }
};
export default DXHalfParallax;
