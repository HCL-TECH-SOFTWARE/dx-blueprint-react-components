// src/components/CECNewsSlider/hooks/useSliderController.ts
import { useEffect, useMemo, useState } from "react";
import { Dir, type ProcessedBlogCard, type Animating } from "../CECFeaturedStories.types";
interface UseSliderOpts {
    items: ProcessedBlogCard[];
    autoPlay: boolean;
    autoScrollTime: number; // seconds
    animationTime: number; // seconds
}
export function useSliderController( {
    items,
    autoPlay,
    autoScrollTime,
    animationTime,
}: UseSliderOpts ) {
    const [currentSlide, setCurrentSlide] = useState( 0 );
    const [isTransitioning, setIsTransitioning] = useState( false );
    const [animatingSlides, setAnimatingSlides] = useState<Animating | null>(
        null
    );
    const [triggerMove, setTriggerMove] = useState( false );
    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>(
        {}
    );
    const totalSlides = items.length;
    const handleImageLoad = ( index: number ) => {
        setLoadedImages( ( prev ) => ( { ...prev, [index]: true } ) );
    };
    const getImageUrl = ( item: ProcessedBlogCard ) =>
        item.image?.url && !/^\s*$/.test( item.image.url )
            ? item.image.url
            : undefined;
    // Preload images with timeout and error handling
    useEffect( () => {
        if ( !totalSlides ) return;
        const unloaded = items.filter( ( _, idx ) => !loadedImages[idx] );
        if ( !unloaded.length ) return;
        const loaders: HTMLImageElement[] = [];
        const timeouts: NodeJS.Timeout[] = [];
        unloaded.forEach( ( item, i ) => {
            const index = items.findIndex( ( pi ) => pi === item );
            const url = item.image?.url;
            if ( !url ) {
                handleImageLoad( index );
                return;
            }
            const img = new Image();
            const onDone = () => {
                handleImageLoad( index );
                img.onload = null;
                img.onerror = null;
            };
            const t = setTimeout( () => {
                console.warn( `Image loading timed out: ${url}` );
                onDone();
            }, 5000 );
            img.onload = onDone;
            img.onerror = () => {
                console.warn( `Failed to load image: ${url}` );
                onDone();
            };
            img.src = url;
            loaders.push( img );
            timeouts.push( t );
        } );
        return () => {
            timeouts.forEach( clearTimeout );
            loaders.forEach( ( img ) => {
                img.onload = null;
                img.onerror = null;
            } );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, totalSlides] );
    const goToSlide = ( nextIndex: number, isManual = false ) => {
        if ( isTransitioning || nextIndex === currentSlide || !totalSlides )
            return;
        // Determine direction based on the shortest path (handles wrap-around)
        const diff = ( nextIndex - currentSlide + totalSlides ) % totalSlides;
        const direction: Dir = diff <= totalSlides / 2 ? Dir.NEXT : Dir.PREV;
        setAnimatingSlides( {
            current: currentSlide,
            next: nextIndex,
            direction,
        } );
        setTriggerMove( false );
        setIsTransitioning( true );
    };
    // Autoplay tick with proper timer management
    useEffect( () => {
        if ( !autoPlay || totalSlides <= 1 || !autoScrollTime ) return;
        const id = setInterval( () => {
            if ( !isTransitioning ) {
                const nextSlide = ( currentSlide + 1 ) % totalSlides;
                goToSlide( nextSlide, true );
            }
        }, autoScrollTime * 1000 );
        return () => clearInterval( id );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoPlay, autoScrollTime, totalSlides, isTransitioning, currentSlide] );
    // Separate effect to handle slide changes without resetting timer
    useEffect( () => {
        // This effect runs when currentSlide changes from external navigation
        // but doesn't reset the timer
    }, [currentSlide] );
    // CSS variable for transition duration
    useEffect( () => {
        document.documentElement.style.setProperty(
            "--CECSlider-timer",
            `${animationTime}s`
        );
    }, [animationTime] );
    // Keyboard navigation
    useEffect( () => {
        const onKey = ( e: KeyboardEvent ) => {
            if ( e.key === "ArrowRight" ) goToNext();
            else if ( e.key === "ArrowLeft" ) goToPrev();
        };
        window.addEventListener( "keydown", onKey );
        return () => window.removeEventListener( "keydown", onKey );
    }, [currentSlide, isTransitioning] );
    // Animate start - trigger the transition immediately
    useEffect( () => {
        if ( animatingSlides ) {
            // Use requestAnimationFrame to ensure the transition starts in the next frame
            const raf = requestAnimationFrame( () => {
                setTriggerMove( true );
            } );
            return () => cancelAnimationFrame( raf );
        }
    }, [animatingSlides] );
    // Animate end - match the CSS transition timing
    useEffect( () => {
        if ( !animatingSlides ) return;
        // Get the computed transition duration from CSS
        const timer = getComputedStyle( document.documentElement )
            .getPropertyValue( '--CECSlider-timer' )
            .trim() || `${animationTime}s`;
        // Convert to milliseconds (remove 's' and multiply by 1000)
        const duration = parseFloat( timer ) * 1000;
        const t = setTimeout( () => {
            setCurrentSlide( animatingSlides.next );
            setAnimatingSlides( null );
            setTriggerMove( false );
            setIsTransitioning( false );
        }, duration );
        return () => clearTimeout( t );
    }, [animatingSlides, animationTime] );
    const goToNext = () => goToSlide( ( currentSlide + 1 ) % totalSlides, true );
    const goToPrev = () =>
        goToSlide( ( currentSlide - 1 + totalSlides ) % totalSlides, true );
    return {
        // state
        currentSlide,
        isTransitioning,
        animatingSlides,
        triggerMove,
        loadedImages,
        // derived
        totalSlides,
        getImageUrl,
        // actions
        goToSlide,
        goToNext,
        goToPrev,
        // images
        handleImageLoad,
    };
}
