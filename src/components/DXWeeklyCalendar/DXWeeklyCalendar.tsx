import "./DXWeeklyCalendar.scss";

import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import Modal from 'react-bootstrap/Modal';
import DXButton from "../DXButton/DXButton";
import { LinksProps, SliderIcons, getLinkTarget } from "../../utilities";
// Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SliderButton from "./components/SliderButton";

interface Event {
    info: LinksProps,
    date: string;
}
export interface WeeklyCalendarProps {
    fullCalendarLink: string,
    events: Event[];
    icons?: SliderIcons;
}

const DXWeeklyCalendar = ( props: WeeklyCalendarProps ) => {
    // STATES & VARIABLES
    const [mobile, setMobile] = useState( false );
    const [isResizing, setIsResizing] = useState( false );
    const [days, setDays] = useState<any>( [] );
    const [events, setEvents] = useState<any>( [...props.events] );
    const [modalDay, setModalDay] = useState<any>( null );
    const [modalEvents, setModalEvents] = useState<any>( [] );
    const today = moment();
    let componentSize = 0;
    const MAX_WIDTH_MOBILE = 390;
    const refComponent = useRef<HTMLDivElement>( null );
    // MODAL LOGIC
    const [ showModal, setShowModal ] = useState<boolean>( false );
    const handleClose = () => setShowModal(false);
    
    const handleOpenModal = ( e: any, day: any, evs: any[] ) => {
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            setModalDay( day );
            setModalEvents( [...evs] );
            setShowModal( true );
        }
    };

    // CALENDAR LOGIC
    const getCurrentWeek = () => {
        let weekStart = today.clone().startOf( "week" );
        let weekDays = [];
        for ( let i = 0; i <= 6; i++ ) { // Get the following 7 days
            weekDays.push( moment( weekStart ).add( i, "day" ) );
        }
        setDays( [...weekDays] );
    };

    const momentizeEvents = ( evs: Event[] ) => {
        let momentEvents = evs.map( ( ev: Event ) => {
            let momentDate = moment( ev.date, 'YYYY-MM-DD' );
            let editedData = { ...ev, date: momentDate };
            return editedData;
        } );
        setEvents( [...momentEvents] );
    };

    // Render, Style and Behavior methods
    const goTo = ( e: any ) => {
        if ( e.type === "click" || ( e.type === "keydown" && e.keyCode === 13 ) || ( e.type === "keydown" && e.keyCode === 32 ) ) {
            window.open( props.fullCalendarLink, "_self" );
        }
    };

    const isItOnTheMonth = ( day: any ) => {
        return day.month() === today.month() ? "dxWeeklyCalendar__day" : "dxWeeklyCalendar__day--other";
    };

    const renderEvents = ( day: any, evs: any[] ) => {
        let todaysEvents = evs.filter( ( ev: any ) => {
            if ( ev.date.isSame( day, 'month' ) && ev.date.isSame( day, 'day' ) ) {
                return ev;
            }
        } );
        return (
            <ul className="dxWeeklyCalendar__eventsContainer">
                {todaysEvents.slice( 0, 3 ).map( ( ev: Event, index: number ) => (
                    <li className="dxWeeklyCalendar__event" key={index}>
                        <a href={ev.info.url} target={getLinkTarget( ev.info.target )}>{ev.info.label}</a>
                    </li>
                ) )}
                {todaysEvents.length > 3 ? (
                    <DXButton
                        displayType="unstyled"
                        onClick={( e: any ) => handleOpenModal( e, day, todaysEvents )}
                        data-testid="weekly-more-events"
                        role="button"
                        label={`+${todaysEvents.length - 3} more`} />
                ) : null}
            </ul>
        );
    };

    const renderDays = ( days: any[] ) => {
        return days.map( ( day: any, key: number ) => (
            <div className={isItOnTheMonth( day )} key={key}>
                <p className="dxWeeklyCalendar__header">{day.format( "ddd" )}</p>
                <p className="dxWeeklyCalendar__number">{day.format( "DD" )}</p>
                {renderEvents( day, events )}
            </div>
        ) );
    };

    // SLIDER LOGIC
    const onChangeSlides = () => {
        const firstSlide = refComponent.current?.querySelectorAll( `.dxWeeklyCalendar__slider .slick-slide` )[0];
        const lastSlide = refComponent.current?.querySelectorAll( `.dxWeeklyCalendar__slider .slick-slide` )[6];
        let prevButton = refComponent.current?.querySelector( `.dxWeeklyCalendar__navBtn--direction-prev` );
        let nextButton = refComponent.current?.querySelector( `.dxWeeklyCalendar__navBtn--direction-next` );
        if ( firstSlide?.classList.contains( "slick-active" ) ) { prevButton?.classList.add( "dxWeeklyCalendar__navBtn--display-hide" ); }
        else {
            prevButton?.classList.remove( "dxWeeklyCalendar__navBtn--display-hide" );
        }
        if ( lastSlide?.classList.contains( "slick-active" ) ) { nextButton?.classList.add( "dxWeeklyCalendar__navBtn--display-hide" ); }
        else {
            nextButton?.classList.remove( "dxWeeklyCalendar__navBtn--display-hide" );
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
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }
        ]
    };

    // MOBILE LOGIC
    const validateMobile = function () {
        const calendarContainer = refComponent.current;
        let originalSize = mobile;
        if ( calendarContainer && calendarContainer !== null ) {
            componentSize = calendarContainer.offsetWidth;
            if ( componentSize <= MAX_WIDTH_MOBILE ) {
                setMobile( true );
            } else {
                setMobile( false );
            }
            if ( originalSize !== mobile ) {
                setIsResizing( true );
            }
        }
    };

    useEffect( () => {
        function init() {
            getCurrentWeek();
            if ( props.events && props.events.length > 0 ) {
                momentizeEvents( props.events );
            }
        }
        init();
        validateMobile();
        if ( !isResizing ) {
            window.addEventListener( "resize", validateMobile );
        }
        return function unmountComponent() {
            init();
            window.removeEventListener( "resize", validateMobile );
        };
    }, [] );

    return (
        <div className="dxWeeklyCalendar" ref={refComponent}>
            <div className="dxWeeklyCalendar__top">
                <h3>My Week</h3>
                <DXButton
                    onClick={goTo}
                    displayType="secondary"
                    label="View full calendar"
                    role="button" />
            </div>
            {!mobile ? (
                <div className="dxWeeklyCalendar__container">
                    {renderDays( days )}
                </div>
            ) : (
                <Slider {...settings} className="dxWeeklyCalendar__slider">
                    {
                        days.map( ( day: any, key: number ) => (
                            <div className={isItOnTheMonth( day )} key={key}>
                                <p className="dxWeeklyCalendar__header">{day.format( "ddd" )}</p>
                                <p className="dxWeeklyCalendar__number">{day.format( "DD" )}</p>
                                {renderEvents( day, events )}
                            </div>
                        ) )
                    }
                </Slider>
            )}
            { showModal && 
                <Modal show={showModal} onHide={handleClose} data-testid="calendar-modal" className="dxWeeklyCalendar__modal">
                    <Modal.Header>
                        <Modal.Title>
                            <span>{modalDay.format( "MMMM DD, YYYY" )}</span>
                            <i tabIndex={0} className="ci-Close_MD" onClick={ handleClose }></i> 
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className="dxWeeklyCalendar__modalContent" data-testid="calendar-modal-content">
                            {modalEvents.map( ( ev: any, index: number ) => (
                                <li className="dxWeeklyCalendar__event" key={index}>
                                    <a href={ev.info.url} target={getLinkTarget( ev.info.target )}>{ev.info.label}</a>
                                </li>
                            ) )}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <DXButton
                            label="OK"
                            className="dxWeeklyCalendar__modalButton"
                            onClick={ handleClose }
                            data-testid="calendar-modal-close"
                            role="button" />
                    </Modal.Footer>
                </Modal>
            }
        </div>
    );
};

export default DXWeeklyCalendar;
