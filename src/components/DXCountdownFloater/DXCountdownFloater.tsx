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
import variables from "../../global/_exportVariables.module.scss";
import "./DXCountdownFloater.scss";
import React, { useEffect, useRef, useState } from "react";

interface Time {
    mt: number,
    d: number,
    h: number,
    m: number,
    s: number;
}

export interface CountdownProps {
    date: string;
    showSeconds?: boolean;
    textColor?: string;
}

const DXCountdownFloater = ( props: CountdownProps ) => {

    let [hideCountdown, setHideCountdown] = useState( false );

    const months = useRef<HTMLDivElement>( null );
    const days = useRef<HTMLDivElement>( null );
    const hours = useRef<HTMLDivElement>( null );
    const minutes = useRef<HTMLDivElement>( null );
    const seconds = useRef<HTMLDivElement>( null );
    const monthsMobile = useRef<HTMLDivElement>( null );
    const daysMobile = useRef<HTMLDivElement>( null );
    const hoursMobile = useRef<HTMLDivElement>( null );
    const minutesMobile = useRef<HTMLDivElement>( null );
    const secondsMobile = useRef<HTMLDivElement>( null );

    let timeLeft: Time = { mt: 0, d: 0, h: 0, m: 0, s: 0 };
    let totalSeconds = 0;
    let interval: any = null;
    let componentRef = useRef<HTMLDivElement>( null );
    const MAX_WIDTH_MOBILE = parseInt( variables.xs.split( "px" ) );

    const setTimeLeft = () => {
        timeLeft.mt = Math.floor( totalSeconds / ( 60 * 60 * 24 * 30 ) );
        timeLeft.d = props.showSeconds ? Math.floor( totalSeconds / ( 60 * 60 * 24 ) ) : Math.floor( ( totalSeconds / ( 60 * 60 * 24 ) % 30 ) );
        timeLeft.h = Math.floor( ( totalSeconds / ( 60 * 60 ) ) % 24 );
        timeLeft.m = Math.floor( ( totalSeconds / 60 ) % 60 );
        timeLeft.s = Math.floor( totalSeconds % 60 );
    };

    const countTime = () => {
        if ( totalSeconds > 0 ) {
            --timeLeft.s;
            if ( timeLeft.m >= 0 && timeLeft.s < 0 ) {
                timeLeft.s = 59;
                --timeLeft.m;
                if ( timeLeft.h >= 0 && timeLeft.m < 0 ) {
                    timeLeft.m = 59;
                    --timeLeft.h;
                    if ( timeLeft.d >= 0 && timeLeft.h < 0 ) {
                        timeLeft.h = 23;
                        --timeLeft.d;
                        if ( timeLeft.mt >= 0 && timeLeft.d < 0 ) {
                            timeLeft.d = 29;
                            --timeLeft.mt;
                        }
                    }
                }
            }
        }
        --totalSeconds;
        printTime();
    };

    const printTime = () => {
        let width = componentRef.current && componentRef.current.offsetWidth || 0;
        if ( width <= MAX_WIDTH_MOBILE ) {
            if ( monthsMobile.current ) {
                ( monthsMobile.current.childNodes[0] as HTMLElement ).innerText = timeLeft.mt < 10 ? "0" + timeLeft.mt : "" + timeLeft.mt;
            }
            if ( daysMobile.current ) {
                ( daysMobile.current.childNodes[0] as HTMLElement ).innerText = timeLeft.d < 10 ? "0" + timeLeft.d : "" + timeLeft.d;
            }
            if ( hoursMobile.current ) {
                ( hoursMobile.current.childNodes[0] as HTMLElement ).innerText = timeLeft.h < 10 ? "0" + timeLeft.h : "" + timeLeft.h;
            }
            if ( minutesMobile.current ) {
                ( minutesMobile.current.childNodes[0] as HTMLElement ).innerText = timeLeft.m < 10 ? "0" + timeLeft.m : "" + timeLeft.m;
            }
            if ( secondsMobile.current ) {
                ( secondsMobile.current.childNodes[0] as HTMLElement ).innerText = timeLeft.s < 10 ? "0" + timeLeft.s : "" + timeLeft.s;
            }
        } else {
            if ( props.showSeconds ) {
                animateFlip( seconds.current, timeLeft.s );
            }
            animateFlip( minutes.current, timeLeft.m );
            animateFlip( hours.current, timeLeft.h );
            animateFlip( days.current, timeLeft.d );
            if ( !props.showSeconds ) {
                animateFlip( months.current, timeLeft.mt );
            }
        }
    };

    function animateFlip( element: any, value: any ) {
        if ( element && element !== null ) {
            const valueInDom = element.querySelector( ".dxCountdown__bottomBack" ).innerText;
            const currentValue = value < 10 ? "0" + value : "" + value;

            if ( valueInDom === currentValue ) return;

            element.querySelector( ".dxCountdown__topBack span" ).innerText = currentValue;
            element.querySelector( ".dxCountdown__bottomBack span" ).innerText = currentValue;

            const topEl = element.querySelector( ".dxCountdown__top" );
            const topBackEl = element.querySelector( ".dxCountdown__topBack" );

            // Trigger CSS flip animation
            topEl.classList.add( "dxCountdown__top--flipping" );
            topBackEl.classList.add( "dxCountdown__topBack--flipping" );

            // Update the display values immediately (animation is visual only)
            topEl.innerText = currentValue;
            element.querySelector( ".dxCountdown__bottom" ).innerText = currentValue;

            const onFlipEnd = () => {
                topEl.removeEventListener( "animationend", onFlipEnd );
                topEl.classList.remove( "dxCountdown__top--flipping" );
                topBackEl.classList.remove( "dxCountdown__topBack--flipping" );
            };

            topEl.addEventListener( "animationend", onFlipEnd );
        }
    }

    const runCountdown = ( date: string ) => {
        // Reset values to re-start countdown
        totalSeconds = 0;
        timeLeft = { mt: 0, d: 0, h: 0, m: 0, s: 0 };
        clearInterval( interval );

        totalSeconds = Math.floor( ( new Date( date ).valueOf() - new Date().valueOf() ) / 1000 );
        setTimeLeft();
        interval = setInterval( () => {
            if ( totalSeconds <= 0 ) {
                clearInterval( interval );
            } else {
                countTime();
            }
        }, 1000 );
    };

    const setColor = () => {
        let styles: { [k: string]: any; } = {};
        if ( props.textColor ) {
            styles = { color: props.textColor };
            return styles;
        }
        return styles;
    };

    useEffect( () => {
        if ( props.date && props.date !== "" ) {
            setHideCountdown( false );
            runCountdown( props.date );
        } else {
            setHideCountdown( true );
        }

        return () => {
            // Reset values to re-start countdown when date changes
            clearInterval( interval );
        };
    }, [props.showSeconds, props.date] );

    return (
        <main className="dxCountdown" role="timer" aria-roledescription={`This is a countdown for ${props.date}`} ref={componentRef}>
            {!hideCountdown ? (
                <div className="dxCountdown__holder">
                    {/** Mobile Markup */}
                    <div className="dxCountdown--mobile">
                        {!props.showSeconds &&
                            <div className="dxCountdown--mobile-months dxCountdown--mobile__elem" ref={monthsMobile}>
                                <span>0</span>
                                <p style={setColor()} data-testid="countdown-months-mobile">mos</p>
                            </div>
                        }
                        <div className="dxCountdown--mobile-days dxCountdown--mobile__elem" ref={daysMobile}>
                            <span>0</span>
                            <p style={setColor()} data-testid="countdown-days-mobile">d</p>
                        </div>
                        <div className="dxCountdown--mobile-hours dxCountdown--mobile__elem" ref={hoursMobile}>
                            <span>0</span>
                            <p style={setColor()} data-testid="countdown-hours-mobile">h</p>
                        </div>
                        <div className="dxCountdown--mobile-minutes dxCountdown--mobile__elem" ref={minutesMobile}>
                            <span>0</span>
                            <p style={setColor()} data-testid="countdown-minutes-mobile">min</p>
                        </div>
                        {props.showSeconds &&
                            <div className="dxCountdown--mobile-seconds dxCountdown--mobile__elem" ref={secondsMobile}>
                                <span>0</span>
                                <p style={setColor()} data-testid="countdown-seconds-mobile">s</p>
                            </div>
                        }
                    </div>
                    {/**Desktop Markup*/}
                    <div className="dxCountdown__container">
                        {!props.showSeconds &&
                            <div aria-hidden="true">
                                <div className="dxCountdown-months dxCountdown__timeElem" ref={months}>
                                    <span className="dxCountdown__top">0</span>
                                    <span className="dxCountdown__topBack">
                                        <span>0</span>
                                    </span>
                                    <span className="dxCountdown__bottom">0</span>
                                    <span className="dxCountdown__bottomBack">
                                        <span>0</span>
                                    </span>
                                </div>
                                <p style={setColor()} data-testid="countdown-months">MONTHS</p>
                            </div>
                        }
                        <div aria-hidden="true">
                            <div className="dxCountdown-days dxCountdown__timeElem" ref={days}>
                                <span className="dxCountdown__top">0</span>
                                <span className="dxCountdown__topBack">
                                    <span>0</span>
                                </span>
                                <span className="dxCountdown__bottom">0</span>
                                <span className="dxCountdown__bottomBack">
                                    <span>0</span>
                                </span>
                            </div>
                            <p style={setColor()} data-testid="countdown-days">DAYS</p>
                        </div>

                        <div aria-hidden="true">
                            <div className="dxCountdown-hours dxCountdown__timeElem" ref={hours}>
                                <span className="dxCountdown__top">0</span>
                                <span className="dxCountdown__topBack">
                                    <span>0</span>
                                </span>
                                <span className="dxCountdown__bottom">0</span>
                                <span className="dxCountdown__bottomBack">
                                    <span>0</span>
                                </span>
                            </div>
                            <p style={setColor()} data-testid="countdown-hours">HOURS</p>
                        </div>

                        <div aria-hidden="true">
                            <div className="dxCountdown-minutes dxCountdown__timeElem" ref={minutes}>
                                <span className="dxCountdown__top">0</span>
                                <span className="dxCountdown__topBack">
                                    <span>0</span>
                                </span>
                                <span className="dxCountdown__bottom">0</span>
                                <span className="dxCountdown__bottomBack">
                                    <span>0</span>
                                </span>
                            </div>
                            <p style={setColor()} data-testid="countdown-minutes">MINUTES</p>
                        </div>

                        {props.showSeconds &&
                            <div aria-hidden="true">
                                <div className="dxCountdown-seconds dxCountdown__timeElem" ref={seconds}>
                                    <span className="dxCountdown__top">0</span>
                                    <span className="dxCountdown__topBack">
                                        <span>0</span>
                                    </span>
                                    <span className="dxCountdown__bottom">0</span>
                                    <span className="dxCountdown__bottomBack">
                                        <span>0</span>
                                    </span>
                                </div>
                                <p style={setColor()} data-testid="countdown-seconds">SECONDS</p>
                            </div>
                        }
                    </div>
                </div>
            ) : (
                <p>No date received</p>
            )}
        </main>
    );
};

export default DXCountdownFloater;
