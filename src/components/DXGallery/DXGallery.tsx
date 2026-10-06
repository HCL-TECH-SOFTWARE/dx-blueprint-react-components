import "./DXGallery.scss";
import React, { useState } from "react";
import DXButton from "../DXButton/DXButton";
import { GalleryImageProps, SliderIcons, getIcon } from "../../utilities";
export interface GalleryProps {
    images: GalleryImageProps[],
    title: string,
    date?: string,
    innerInfo?: boolean,
    hideInfo?: boolean;
    icons?: SliderIcons;
    /** Text direction. Omit to auto-detect from the nearest ancestor element
     *  with a dir attribute (html, body, or portal wrapper divs). */
    dir?: 'ltr' | 'rtl';
}
// Pure module-level helper — checks html[dir], body[dir], and body computed
// style. Defined outside the component to avoid recreation on every render.
const getPageDir = (): 'ltr' | 'rtl' => {
    if (typeof document === 'undefined') return 'ltr';
    const htmlDir = document.documentElement.getAttribute('dir');
    if (htmlDir === 'rtl') return 'rtl';
    if (htmlDir === 'ltr') return 'ltr';
    const bodyDir = document.body?.getAttribute('dir');
    if (bodyDir === 'rtl') return 'rtl';
    if (bodyDir === 'ltr') return 'ltr';
    if (document.body) {
        const computed = getComputedStyle(document.body).direction;
        if (computed === 'rtl' || computed === 'ltr') return computed as 'ltr' | 'rtl';
    }
    return 'ltr';
};
const DXGallery = ( props: GalleryProps ) => {
    // Ref used to read computed direction from the component's parent element.
    // This catches RTL set on ANY ancestor (html, body, or portal wrapper divs)
    // via CSS inheritance, without requiring an explicit dir prop.
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [documentDir, setDocumentDir] = React.useState<'ltr' | 'rtl'>(() => {
        if (props.dir) return props.dir;
        return getPageDir();
    });
    React.useLayoutEffect(() => {
        if (props.dir) {
            setDocumentDir(props.dir);
            return;
        }
        const readDir = (): 'ltr' | 'rtl' => {
            // Read computed direction from parent — CSS direction is inherited,
            // so this picks up RTL from <html>, <body>, or any portal wrapper div.
            const parent = containerRef.current?.parentElement;
            if (parent) {
                return getComputedStyle(parent).direction === 'rtl' ? 'rtl' : 'ltr';
            }
            return getPageDir();
        };
        setDocumentDir(readDir());
        const update = () => setDocumentDir(readDir());
        const observer = new MutationObserver(update);
        if (typeof document !== 'undefined') {
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });
            if (document.body) {
                observer.observe(document.body, { attributes: true, attributeFilter: ['dir'] });
            }
            // TODO: Observer does not watch portal wrapper divs for dynamic dir changes.
            // If a portal wrapper toggles dir at runtime, a follow-up is needed to
            // observe the closest ancestor with a dir attribute.
        }
        return () => observer.disconnect();
    }, [props.dir]);
    const resolvedDir: 'ltr' | 'rtl' = props.dir ?? documentDir;
    const isRTL = resolvedDir === 'rtl';
    const [currentIndex, setCurrentIndex] = useState( 0 );
    const [selectedNavButton, setSelectedNavButton] = useState<"left" | "right">( "right" );
    // Handler logic is swapped in RTL
    const goToPrevious = ( e: any ) => {
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            setSelectedNavButton( "left" );
            if (isRTL) {
                // In RTL, prev means next (move right visually)
                const isLastImage = currentIndex === props.images.length - 1;
                const newIndex = isLastImage ? 0 : currentIndex + 1;
                setCurrentIndex( newIndex );
            } else {
                const isFirstImage = currentIndex === 0;
                const newIndex = isFirstImage ? props.images.length - 1 : currentIndex - 1;
                setCurrentIndex( newIndex );
            }
        }
    };
    const goToNext = ( e: any ) => {
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            setSelectedNavButton( "right" );
            if (isRTL) {
                // In RTL, next means prev (move left visually)
                const isFirstImage = currentIndex === 0;
                const newIndex = isFirstImage ? props.images.length - 1 : currentIndex - 1;
                setCurrentIndex( newIndex );
            } else {
                const isLastImage = currentIndex === props.images.length - 1;
                const newIndex = isLastImage ? 0 : currentIndex + 1;
                setCurrentIndex( newIndex );
            }
        }
    };
    const goToImage = ( e: any, index: number ) => {
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            setCurrentIndex( index );
        }
    };
    const renderInfo = ( title: string, date?: string ) => (
        <div className="dxGallery__info" data-testid="gallery-info">
            {date ? <h6 data-testid="gallery-date">{date}</h6> : null}
            <h4 data-testid="gallery-title">{title}</h4>
        </div>
    );
    const renderDescription = ( imageInfo: GalleryImageProps ) => (
        <div className="dxGallery__description" data-testid="gallery-description">
            <p>{imageInfo.description}</p>
        </div>
    );
    const getBottomPosition = () => {
        return !props.hideInfo && props.innerInfo ? { top: "78%" } : { top: "95%" };
    };
    // In RTL, render dots in reversed order so that with flex-direction: row-reverse
    // the visual order is: last | ... | first* (matching CEC Pagination pattern)
    const dotIndices = isRTL
        ? Array.from( { length: props.images.length }, ( _, i ) => props.images.length - 1 - i )
        : Array.from( { length: props.images.length }, ( _, i ) => i );
    return (
        <div ref={containerRef} className={`dxGallery${isRTL ? ' dxGallery--rtl' : ''}`} dir={resolvedDir}>
            {!props.hideInfo && !props.innerInfo ? renderInfo( props.title, props.date ) : null}
            {props.images && props.images.length > 0 ? (
                <div className="dxGallery__container">
                    {!props.hideInfo && props.innerInfo ? renderInfo( props.title, props.date ) : null}
                    <DXButton
                        label="left arrow"
                        hideLabel
                        displayType="secondary"
                        className={`dxGallery__arrow dxGallery__arrowLeft${selectedNavButton === "left" ? " dxGallery--selected" : ""}`}
                        onClick={goToPrevious}
                        data-testid="gallery-left"
                        aria-label="left arrow"
                        icon={{
                            class: getIcon( props.icons, "prev", "ci-Chevron_Left" )
                        }} />
                    <DXButton
                        displayType="secondary"
                        className={`dxGallery__arrow dxGallery__arrowRight${selectedNavButton === "right" ? " dxGallery--selected" : ""}`}
                        onClick={goToNext}
                        data-testid="gallery-right"
                        label="right arrow"
                        hideLabel
                        aria-label="right arrow"
                        icon={{
                            class: getIcon( props.icons, "next", "ci-Chevron_Right" )
                        }} />
                    <div className="dxGallery__background">
                        <img src={props.images[currentIndex].url} alt={props.images[currentIndex].description} data-testid="gallery-image" />
                        <div className="dxGallery__bottom" style={getBottomPosition()} data-testid="gallery-bottom">
                            <div className="dxGallery__dots">
                                {dotIndices.map( ( imageIndex: number ) => (
                                    <button
                                        key={imageIndex}
                                        className={currentIndex === imageIndex ? `dxGallery__dot dxGallery__dot--active` : `dxGallery__dot`}
                                        onClick={( e ) => goToImage( e, imageIndex )}
                                        onKeyDown={( e ) => goToImage( e, imageIndex )}
                                        aria-label={`Image ${imageIndex + 1} of ${props.images.length}`}
                                        data-testid="gallery-dot"></button>
                                ) )}
                            </div>
                            {!props.hideInfo && props.innerInfo ? renderDescription( props.images[currentIndex] ) : null}
                        </div>
                    </div>
                </div>
            ) : ( <p>There are no images to display</p> )}
            {props.images &&
                props.images.length > 0 &&
                !props.hideInfo &&
                !props.innerInfo ? renderDescription( props.images[currentIndex] ) : null}
        </div>
    );
};
export default DXGallery;
