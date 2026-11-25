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

import React, { ReactElement, useEffect, useState } from "react";
import "./DXHeroBannerCarousel.scss";
import DXHeroBanner, { HeroBannerProps } from "../DXHeroBanner/DXHeroBanner";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface HeroBannerCarouselProps extends BasicComponent {
    index: number;
    items: HeroBannerProps[];
    animationTime?: number;
    autoScrollTime?: number;
    bulletsPosition?: "left" | "center" | "right";
}

const DXHeroBannerCarousel = ( props: ExtendableProps<HeroBannerCarouselProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { index: _index, items: _items, animationTime: _animationTime, autoScrollTime: _autoScrollTime, bulletsPosition: _bulletsPosition, _edit, className, ref, ...rest } = props;

    function parseTime( value: number | undefined ): number {
        if ( typeof value != "number" ) {
            return 0;
        }
        if ( value <= 0 ) {
            return 0;
        }

        return value;
    }

    const ANIMATION_TIMER = ( parseTime( props.animationTime ) || 0.6 ) * 1000;
    const [current, setCurrent] = useState( 0 );
    const [triggerMove, setTriggerMove] = useState( false );
    const [isAnimating, setIsAnimating] = useState( false );

    const [animatingSlides, setAnimatingSlides] = useState<{
        current: number;
        next: number;
        direction: "left" | "right";
    } | null>( null );
    const [idleUntil, setIdleUntil] = useState<number | null>( null );



    useEffect( () => {
        const root = document.documentElement;
        root.style.setProperty( '--HBCarousel-timer', `${ANIMATION_TIMER / 1000}s` );
    }, [ANIMATION_TIMER] );


    const startAnimation = ( newNext: number, isBulletClick: boolean = false ) => {
        if ( isAnimating ) return;

        const total = props.items.length;
        if ( total <= 1 ) return;

        let nextIndex = newNext;

        if ( nextIndex >= total ) {
            nextIndex = 0;
        } else if ( nextIndex < 0 ) {
            nextIndex = total - 1;
        }

        let direction: "left" | "right" = "left";

        if ( isBulletClick && nextIndex < current ) {
            direction = "right";
        }

        setAnimatingSlides( { current, next: nextIndex, direction } );
        setTriggerMove( false );
        setIsAnimating( true );
    };

    useEffect( () => {
        if ( animatingSlides ) {
            const timer = setTimeout( () => {
                setTriggerMove( true );
            }, 1 );

            return () => clearTimeout( timer );
        }
    }, [animatingSlides] );

    useEffect( () => {
        if ( !animatingSlides ) return;

        const timer = setTimeout( () => {
            setCurrent( animatingSlides.next );
            setAnimatingSlides( null );
            setTriggerMove( false );
            setIsAnimating( false );

            // After wrapping back to first slide, provide a short idle window
            if ( animatingSlides.next === 0 ) {
                const autoMs = parseTime( props.autoScrollTime ) * 1000;
                // Provide a wider idle window after full-cycle wrap to avoid transient class sampling
                setIdleUntil( Date.now() + ANIMATION_TIMER + ( autoMs || 0 ) );
            } else {
                setIdleUntil( null );
            }
        }, ANIMATION_TIMER );

        return () => clearTimeout( timer );
    }, [animatingSlides, ANIMATION_TIMER] );


    useEffect( () => {
        const total = props.items.length;
        const autoTime = parseTime( props.autoScrollTime );

        if ( total > 1 && autoTime > 0 ) {
            // Add a tiny buffer on wrap-around to ensure a stable "active" state post-cycle
            const nextIndex = ( current + 1 ) % total;
            const wrapBufferMs = nextIndex === 0 ? Math.min( 50, ANIMATION_TIMER ) : 0;

            const timer = setTimeout( () => {
                if ( !isAnimating ) {
                    startAnimation( current + 1 );
                }
            }, autoTime * 1000 + wrapBufferMs );

            return () => clearTimeout( timer );
        }
    }, [current, isAnimating, props.autoScrollTime, props.items.length, ANIMATION_TIMER] );

    const renderItems = () => {
        return props.items.map( ( item, idx ) => {
            let classNames = "";

            const effectiveAnimating = idleUntil && Date.now() < idleUntil ? null : animatingSlides;

            if ( effectiveAnimating ) {
                const { current: cur, next: nxt, direction } = effectiveAnimating;
                if ( idx === cur ) {
                    classNames = `active ${direction}`;
                } else if ( idx === nxt ) {
                    classNames = `next next--${direction}` + ( triggerMove ? " move" : "" );
                }
            } else {
                if ( idx === current ) {
                    classNames = "active";
                }
            }

            return (
                <li key={"HBCarousel__item-" + idx} className={classNames}>
                    <DXHeroBanner {...item} index={Number( "" + props.index + idx )} />
                </li>
            );
        } );
    };

    const renderBullets = () => {
        return props.items.map( ( _, i ) => (
            <span
                key={"HBCarousel__bullet-" + i}
                role="button"
                aria-pressed={i === ( animatingSlides ? animatingSlides.next : current )}
                aria-roledescription={`Button to show item number ${i + 1} in the carousel`}
                data-testid="HBCarousel-bullet"
                className={
                    "dxHeroBannerCarousel__bullet " +
                    ( i === ( animatingSlides ? animatingSlides.next : current )
                        ? "dxHeroBannerCarousel__bullet--active"
                        : "" )
                }
                onClick={() => {
                    if ( !isAnimating && i !== current ) {
                        startAnimation( i, true );
                    }
                }}
            />
        ) );
    };

    return (
        <div {...pickDomProps( rest )} ref={ref} className={classNames( "dxHeroBannerCarousel", className )}>
            <ul data-testid={"HBCarouse-mainContainer"} id="mainContainer">
                {renderItems()}
            </ul>
            {
                props.items.length > 1 &&
                <div className={"dxHeroBannerCarousel__bulletContainer dxHeroBannerCarousel__bulletContainer--" + ( props.bulletsPosition || "right" )}>
                    {renderBullets()}
                </div>
            }
            {props._edit && renderEditButton( props._edit )}
        </div>
    );
};

export default DXHeroBannerCarousel;
