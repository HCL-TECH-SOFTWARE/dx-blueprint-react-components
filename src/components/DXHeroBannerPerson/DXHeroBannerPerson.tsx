import "./DXHeroBannerPerson.scss";
import React, { useState, useEffect, useRef } from "react";
import DXSearchSuggestions from "../DXSearchSuggestions";
import { SSuggestionsProps } from "../DXSearchSuggestions/DXSearchSuggestions";
import { BasicComponent, renderEditButton } from "../../utilities/BasicComponent/BasicComponent";

interface PersonData {
    name?: string,
    role?: string,
    location?: string,
    imageDesktop: string,
    imageMobile?: string;
}
export interface HBPersonProps extends BasicComponent {
    title: string,
    subtitle: string,
    searchSuggestion: SSuggestionsProps,
    bannerUrl?: string,
    interval?: number,
    persons: PersonData[];
    bodyClass?: string,
    personInfoClass?: string;
}

const DXHeroBannerPerson = ( props: HBPersonProps ) => {
    const [activePerson, setActivePerson] = useState<PersonData>( { ...props.persons[0] } );

    const itemsRefs = useRef<( HTMLDivElement | null )[]>( [] );
    const componentRef = useRef<HTMLDivElement>( null );
    let componentInterval: any = null;

    const showPersonDetails = ( activePerson: PersonData ) => activePerson.location || activePerson.name || activePerson.role;

    // Carousel Logic
    const renderImageEl = () => {
        return props.persons.map( ( person: PersonData, index: number ) => (
            <div
                ref={( ref ) => itemsRefs.current[index] = ref}
                className={index === 0 ? "dxHBPerson__carousel__item dxHBPerson__carousel__item--active" : "dxHBPerson__carousel__item"} key={index}>
                <img src={person.imageDesktop} alt={person.name} className="d-none d-sm-block dxHBPerson__carousel__img" data-testid="hb-person-img" />
                {person.imageMobile ? (
                    <img src={person.imageMobile} alt={person.name} className="d-block d-sm-none dxHBPerson__carousel__img" data-testid="hb-person-img-mobile" />
                ) : null}
            </div>
        ) );
    };

    const autoSlide = () => {
        if ( props.persons.length > 1 ) {
            let time = props.interval ? props.interval * 1000 : 8000;
            componentInterval = setInterval( () => {
                slide( getItemActiveIndex() + 1 );
            }, time );
        } else {
            return;
        }
    };

    const getItemActiveIndex = () => {
        const itemsArray = itemsRefs.current;
        const itemActive = componentRef.current?.querySelector( ".dxHBPerson__carousel__item--active" ) as HTMLDivElement;
        const itemActiveIndex = itemsArray.indexOf( itemActive );

        return itemActiveIndex;
    };

    const slide = ( toIndex: number ) => {
        const itemsArray = itemsRefs.current;
        const itemActive = componentRef.current?.querySelector( ".dxHBPerson__carousel__item--active" ) as HTMLDivElement;
        if ( toIndex >= itemsArray.length ) {
            toIndex = 0;
        }
        const nextPerson = props.persons[toIndex];
        setActivePerson( { ...nextPerson } );
        const newItemActive = itemsArray[toIndex];
        newItemActive?.classList.add( "dxHBPerson__carousel__item__pos_next" );
        setTimeout( () => {
            newItemActive?.classList.add( "dxHBPerson__carousel__item__next" );
            itemActive.classList.add( "dxHBPerson__carousel__item__next" );
        }, 20 );

        newItemActive?.addEventListener( "transitionend", () => {
            itemActive.className = "dxHBPerson__carousel__item";
            newItemActive.className = "dxHBPerson__carousel__item dxHBPerson__carousel__item--active";
        }, {
            once: true
        } );
    };

    useEffect( () => {
        autoSlide();
        return () => {
            if ( componentInterval && componentInterval !== null ) {
                clearInterval( componentInterval );
            }
        };
    }, [props.persons, props.searchSuggestion] );

    return (
        <div className="dxHBPerson" ref={componentRef}>
            <div className="dxHBPerson__carousel">
                <div className="dxHBPerson__carousel__inner">
                    {renderImageEl()}
                </div>
            </div>
            {props.bannerUrl ? (
                <a href={props.bannerUrl} className="dxHBPerson__bannerUrl" data-testid="hb-person-image-link"></a>
            ) : null}
            <div className={`dxHBPerson__content${props.bodyClass ? ` ${props.bodyClass}` : ""}`} data-testid="hb-person-content">
                <p data-testid="hb-person-title">{props.title}</p>
                <h2>{props.subtitle}</h2>
                <DXSearchSuggestions {...props.searchSuggestion} />
            </div>
            {
                showPersonDetails( activePerson ) ? (
                    <div className={`dxHBPerson__blur d-none d-sm-block${props.personInfoClass ? ` ${props.personInfoClass}` : ""}`} data-testid="hb-person-details-box">
                        <div className="dxHBPerson__details">
                            {activePerson.location ? (
                                <p data-testid="hb-person-location">{activePerson.location}</p>
                            ) : null}
                            {activePerson.name ? (
                                <p data-testid="hb-person-name">{activePerson.name}</p>
                            ) : null}
                            {activePerson.role ? (
                                <p data-testid="hb-person-role">{activePerson.role}</p>
                            ) : null}
                        </div>
                    </div>
                ) : null
            }
            {props._edit && renderEditButton( props._edit )}
        </div>
    );
};

export default DXHeroBannerPerson;
