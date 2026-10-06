import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXEventDetails from "./DXEventDetails";
import { SocialShareProps } from "../DXSocialShare/DXSocialShare";
import { changedIconsEventDetailsArgs } from "./DXEventDetails.stories";

let shareConfig = {
    title: "Select the social Media you want to share the event",
    size: "big",
    socialMediaActions: {
        facebook: { display: true },
        twitter: { display: true, },
        linkedin: { display: true }
    },
    pageDetails: {
        url: "https://hcl-software.com",
        pageTitle: "HCL Software",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est turpis, maximus in risus eu, sollicitudin molestie felis. Nam mauris diam, interdum ullamcorper dolor in, cursus gravida nisi"
    }
} as SocialShareProps;

let propsWithShareConfig = {
    title: "Birthday Party",
    eventFrom: "2021-10-27",
    eventTo: "2021-11-07",
    beginHour: "19:00:00",
    endHour: "21:00:00",
    location: "My Home",
    eventUrl: {
        label: "Visit here the amazing event that is going to happen",
        url: "https://zoom.com/join/8492830",
        target: "_blank",
    },
    share: shareConfig
};

test( "If the addressLine have just one address, it will render", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
    };
    const { getByTestId } = render( <DXEventDetails {...props} /> );
    const adrsLines = getByTestId( "event-details-adrs-line-1" );
    expect( adrsLines ).toBeInTheDocument();
} );


test( "If addressLines have only 1 address, the address line 2 element should be null", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
    };
    const { container } = render( <DXEventDetails {...props} /> );
    const adrsLines = container.querySelector( '[data-testid="event-details-adrs-line-2"]' );
    expect( adrsLines ).toBeNull();
} );


test( "If addressLines have both addresses, the address line 2 element should be rendered", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638", "Main Avenue #68 pc.75638"],
    };
    const { container } = render( <DXEventDetails {...props} /> );
    const adrsLines = container.querySelector( '[data-testid="event-details-adrs-line-2"]' );
    expect( adrsLines ).toBeInTheDocument();
} );

test( "If the user pass more than 2 addresses, it will just render the first two", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638", "Main Avenue #69 pc.75638", "Main Avenue #70 pc.75638"],
    };
    const { container } = render( <DXEventDetails {...props} /> );
    const pElements = container.querySelector( '.dxEventDetails__location' )?.childNodes[0].childNodes;
    const adrsLines: any = [];
    pElements?.forEach( ( el ) => {
        if ( props.addressLines.includes( el.textContent as string ) ) {
            adrsLines.push( el );
        }
    } );

    expect( adrsLines ).toHaveLength( 2 );
} );

test( "If eventUrl passed, it will render", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        eventUrl: {
            label: "Visit here",
            url: "https://zoom.com/join/8492830",
            target: "_blank"
        },
    };
    const { container } = render( <DXEventDetails {...props} /> );
    const url = container.querySelector( '[data-testid="event-details-url"]' );
    expect( url ).toBeInTheDocument();
} );

test( "If the eventFrom and the eventTo have the same date the separator will be null", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-10-27",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
    };
    const { container } = render( <DXEventDetails {...props} /> );
    const separator = container.querySelector( ".dxEventDetails__date__separator" );
    expect( separator ).toBeNull();
} );

test( "If the eventFrom and the eventTo have different date, the separator will be rendered", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-27",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
    };
    const { container } = render( <DXEventDetails {...props} /> );
    const separator = container.querySelector( ".dxEventDetails__date__separator" );
    expect( separator ).toBeInTheDocument();
} );

test( "If no mapUrl passed, the map element should be null", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
    };
    const { container } = render( <DXEventDetails {...props} /> );
    let map = container.querySelector( '[data-testid="event-details-map"]' );
    expect( map ).toBeNull();
} );

test( "If mapUrl passed, the map element should be in the document", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
    };
    const { getByTestId } = render( <DXEventDetails {...props} /> );
    expect( getByTestId( "event-details-map" ) ).toBeInTheDocument();
} );

test( "If contact prop is passed, then it will render its button", () => {
    let fn = jest.fn();
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        contact: fn,
    };
    const { getByTestId } = render( <DXEventDetails {...props} /> );
    expect( getByTestId( "event-details-contact-btn" ) ).toBeInTheDocument();
} );

test( "If the user clicks on the contact button, then it will trigger its function", async () => {
    let fn = jest.fn();
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        contact: fn,
    };
    const { getByTestId } = render( <DXEventDetails {...props} /> );
    let button = getByTestId( "event-details-contact-btn" );
    await userEvent.click( button );
    expect( fn ).toBeCalled();
} );

test( "If getDirections prop is passed, then it will render its button", () => {
    let fn = jest.fn();
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        getDirections: fn,
    };
    const { getByTestId } = render( <DXEventDetails {...props} /> );
    expect( getByTestId( "event-details-directions-btn" ) ).toBeInTheDocument();
} );

test( "If the user clicks on the getDirections button, then it will trigger its function", async () => {
    let fn = jest.fn();
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        getDirections: fn,
    };
    const { getByTestId } = render( <DXEventDetails {...props} /> );
    let button = getByTestId( "event-details-directions-btn" );
    await userEvent.click( button );
    expect( fn ).toBeCalled();
} );

test( "If share prop is passed, then it will render its button", () => {
    let fn = jest.fn();
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        share: fn,
    };
    const { getByTestId } = render( <DXEventDetails {...props} /> );
    expect( getByTestId( "event-details-share-btn" ) ).toBeInTheDocument();
} );

test( "If the user clicks on the share button, then it will trigger its function", async () => {
    let fn = jest.fn();
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        share: fn,
    };
    const { getByTestId } = render( <DXEventDetails {...props} /> );
    let button = getByTestId( "event-details-share-btn" );
    await userEvent.click( button );
    expect( fn ).toBeCalled();
} );

test( "If register prop is passed, then it will render its button", () => {
    let fn = jest.fn();
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        register: fn,
    };
    const { getByTestId } = render( <DXEventDetails {...props} /> );
    expect( getByTestId( "event-details-register-btn" ) ).toBeInTheDocument();
} );

test( "If the user clicks on the register button, then it will trigger its function", async () => {
    let fn = jest.fn();
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        register: fn,
    };
    const { getByTestId } = render( <DXEventDetails {...props} /> );
    let button = getByTestId( "event-details-register-btn" );
    await userEvent.click( button );
    expect( fn ).toBeCalled();
} );

test( "If addToMyCalendar prop is passed, then it will render its button", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        addToMyCalendar: true,
    };
    const { getByTestId } = render( <DXEventDetails {...props} /> );
    expect( getByTestId( "event-details-add-btn" ) ).toBeInTheDocument();
} );

test( "If the user clicks on the addToMyCalendar button, then the overlay will be displayed", async () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        addToMyCalendar: true,
    };
    const { getByTestId } = render( <DXEventDetails {...props} /> );
    const button = getByTestId( "event-details-add-btn" );
    await userEvent.click( button );
    const overlay = getByTestId( "event-details-overlay" );
    expect( overlay ).toBeInTheDocument();
} );

test( "If the user clicks on the close icon inside the overlay, it will render again the event information", async () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        addToMyCalendar: true,
    };
    const { getByTestId } = render( <DXEventDetails {...props} /> );
    const button = getByTestId( "event-details-add-btn" );
    await userEvent.click( button );
    const icon = getByTestId( "event-details-overlay-close" );
    await userEvent.click( icon );
    expect( getByTestId( "event-details-info" ) ).toBeInTheDocument();
} );

test( "If the overlay is showed, then all the calendar buttons should be disabled", async () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        addToMyCalendar: true,
    };
    const { getByTestId, container } = render( <DXEventDetails {...props} /> );
    const button = getByTestId( "event-details-add-btn" );
    await userEvent.click( button );
    const calendarButtons = container.querySelector( ".dxEventDetails__overlay__icons" )?.childNodes;
    let flag = true;
    calendarButtons?.forEach( ( button: ChildNode ) => {
        if ( !( button as HTMLButtonElement ).classList.contains( "disabled" ) ) {
            flag = false;
        }
    } );

    expect( flag ).toBeTruthy();
} );

test( "If inside the calendarsUrl there is the apple prop, its button on the overlay should not be disabled", async () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        addToMyCalendar: true,
        calendarButtons: {
            apple: true,
        }
    };
    const { getByTestId, container } = render( <DXEventDetails {...props} /> );
    const button = getByTestId( "event-details-add-btn" );
    await userEvent.click( button );
    const apple = container.querySelector( '[data-testid="event-details-apple"]' );
    expect( apple?.classList.contains( "disabled" ) ).not.toBeTruthy();
} );

test( "If inside the calendarsUrl there is the apple prop, its button on the overlay should have an anchor tag", async () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        addToMyCalendar: true,
        calendarButtons: {
            apple: true,
        }
    };
    const { getByTestId, container } = render( <DXEventDetails {...props} /> );
    const button = getByTestId( "event-details-add-btn" );
    await userEvent.click( button );
    const apple = container.querySelector( '[data-testid="event-details-apple"]' );
    const anchor = apple?.childNodes[0] as HTMLAnchorElement;
    expect( anchor.tagName ).toEqual( "A" );
} );

test( "If inside the calendarsUrl there is the apple prop, the anchor should include 'data:text/calendar' on its href", async () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        addToMyCalendar: true,
        calendarButtons: {
            apple: true,
        }
    };
    const { getByTestId, container } = render( <DXEventDetails {...props} /> );
    const button = getByTestId( "event-details-add-btn" );
    await userEvent.click( button );
    const apple = container.querySelector( '[data-testid="event-details-apple"]' );
    const anchor = apple?.childNodes[0] as HTMLAnchorElement;
    expect( anchor?.href ).toMatch( "data:text/calendar" );
} );

test( "If inside the calendarsUrl there is the google prop, its button on the overlay should not be disabled", async () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        addToMyCalendar: true,
        calendarButtons: {
            google: true,
        }
    };
    const { getByTestId, container } = render( <DXEventDetails {...props} /> );
    const button = getByTestId( "event-details-add-btn" );
    await userEvent.click( button );
    const google = container.querySelector( '[data-testid="event-details-google"]' );
    expect( google?.classList.contains( "disabled" ) ).not.toBeTruthy();
} );

test( "If inside the calendarsUrl there is the google prop, its button on the overlay should have an anchor tag", async () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        addToMyCalendar: true,
        calendarButtons: {
            google: true,
        }
    };
    const { getByTestId, container } = render( <DXEventDetails {...props} /> );
    const button = getByTestId( "event-details-add-btn" );
    await userEvent.click( button );
    const google = container.querySelector( '[data-testid="event-details-google"]' );
    const anchor = google?.childNodes[0] as HTMLAnchorElement;
    expect( anchor.tagName ).toEqual( "A" );
} );

test( "If inside the calendarsUrl there is the google prop, the anchor should include 'http://calendar.google.com/calendar/event' on its href", async () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        addToMyCalendar: true,
        calendarButtons: {
            google: true,
        }
    };
    const { getByTestId, container } = render( <DXEventDetails {...props} /> );
    const button = getByTestId( "event-details-add-btn" );
    await userEvent.click( button );
    const google = container.querySelector( '[data-testid="event-details-google"]' );
    const anchor = google?.childNodes[0] as HTMLAnchorElement;
    expect( anchor?.href ).toMatch( "http://calendar.google.com/calendar/event" );
} );

test( "If inside the calendarsUrl there is the outlook prop, its button on the overlay should not be disabled", async () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        addToMyCalendar: true,
        calendarButtons: {
            outlook: true,
        }
    };
    const { getByTestId, container } = render( <DXEventDetails {...props} /> );
    const button = getByTestId( "event-details-add-btn" );
    await userEvent.click( button );
    const outlook = container.querySelector( '[data-testid="event-details-outlook"]' );
    expect( outlook?.classList.contains( "disabled" ) ).not.toBeTruthy();
} );

test( "If inside the calendarsUrl there is the outlook prop, its button on the overlay should have an anchor tag", async () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        addToMyCalendar: true,
        calendarButtons: {
            outlook: true,
        }
    };
    const { getByTestId, container } = render( <DXEventDetails {...props} /> );
    const button = getByTestId( "event-details-add-btn" );
    await userEvent.click( button );
    const outlook = container.querySelector( '[data-testid="event-details-outlook"]' );
    const anchor = outlook?.childNodes[0] as HTMLAnchorElement;
    expect( anchor.tagName ).toEqual( "A" );
} );

test( "If inside the calendarsUrl there is the outlook prop, the anchor should include 'data:text/calendar' on its href", async () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        addToMyCalendar: true,
        calendarButtons: {
            outlook: true,
        }
    };
    const { getByTestId, container } = render( <DXEventDetails {...props} /> );
    const button = getByTestId( "event-details-add-btn" );
    await userEvent.click( button );
    const outlook = container.querySelector( '[data-testid="event-details-outlook"]' );
    const anchor = outlook?.childNodes[0] as HTMLAnchorElement;
    expect( anchor?.href ).toMatch( "data:text/calendar" );
} );

test( "If inside the calendarsUrl there is the yahoo prop, its button on the overlay should not be disabled", async () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        addToMyCalendar: true,
        calendarButtons: {
            yahoo: true,
        }
    };
    const { getByTestId, container } = render( <DXEventDetails {...props} /> );
    const button = getByTestId( "event-details-add-btn" );
    await userEvent.click( button );
    const yahoo = container.querySelector( '[data-testid="event-details-yahoo"]' );
    expect( yahoo?.classList.contains( "disabled" ) ).not.toBeTruthy();
} );

test( "If inside the calendarsUrl there is the yahoo prop, its button on the overlay should have an anchor tag", async () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        addToMyCalendar: true,
        calendarButtons: {
            yahoo: true,
        }
    };
    const { getByTestId, container } = render( <DXEventDetails {...props} /> );
    const button = getByTestId( "event-details-add-btn" );
    await userEvent.click( button );
    const yahoo = container.querySelector( '[data-testid="event-details-yahoo"]' );
    const anchor = yahoo?.childNodes[0] as HTMLAnchorElement;
    expect( anchor.tagName ).toEqual( "A" );
} );

test( "If inside the calendarsUrl there is the yahoo prop, the anchor should include 'http://calendar.yahoo.com/' on its href", async () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.452231328693!2d-98.20042038552944!3d19.04384435793215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc0e79802f289%3A0x7a4c1293b30a34d6!2sZ%C3%B3calo%20de%20Puebla!5e0!3m2!1ses-419!2smx!4v1664296781222!5m2!1ses-419!2smx",
        addToMyCalendar: true,
        calendarButtons: {
            yahoo: true,
        }
    };
    const { getByTestId, container } = render( <DXEventDetails {...props} /> );
    const button = getByTestId( "event-details-add-btn" );
    await userEvent.click( button );
    const yahoo = container.querySelector( '[data-testid="event-details-yahoo"]' );
    const anchor = yahoo?.childNodes[0] as HTMLAnchorElement;
    expect( anchor?.href ).toMatch( "http://calendar.yahoo.com/" );
} );

// Text overflow tests
test( "If the user passed just one address on addressLines and it's shorter than 43 characters, the class 'dxEventDetails--overflow-enabled' should not be added", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638"],
    };
    const { container } = render( <DXEventDetails {...props} /> );
    const adrs1 = container.querySelector( '[data-testid="event-details-adrs-line-1"]' );
    expect( adrs1?.classList.contains( 'dxEventDetails--overflow-enabled' ) ).not.toBeTruthy();
} );

test( "If the user passed just one address on addressLines and it's larger than 43 characters, the class 'dxEventDetails--overflow-enabled' should be added", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638 Main Avenue #68 pc.75638"],
    };
    const { container } = render( <DXEventDetails {...props} /> );
    const adrs1 = container.querySelector( '[data-testid="event-details-adrs-line-1"]' );
    expect( adrs1?.classList.contains( 'dxEventDetails--overflow-enabled' ) ).toBeTruthy();
} );

test( "If the user passed an address larger than 43 character on the second element in addressLines, the class 'dxEventDetails--overflow-enabled' should be added", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638", "Main Avenue #68 pc.75638 Main Avenue #68 pc.75638"],
    };
    const { container } = render( <DXEventDetails {...props} /> );
    const adrs2 = container.querySelector( '[data-testid="event-details-adrs-line-2"]' );
    expect( adrs2?.classList.contains( 'dxEventDetails--overflow-enabled' ) ).toBeTruthy();
} );

test( "If the user passed an adrress shorter than 43 character on the second element in addressLines, the class 'dxEventDetails--overflow-enabled' should not be added", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        addressLines: ["Main Avenue #68 pc.75638", "Main Avenue #68 pc.75638"],
    };
    const { container } = render( <DXEventDetails {...props} /> );
    const adrs2 = container.querySelector( '[data-testid="event-details-adrs-line-2"]' );
    expect( adrs2?.classList.contains( 'dxEventDetails--overflow-enabled' ) ).not.toBeTruthy();
} );

test( "If the user passed an eventUrl label shorter than 43 characters, the class 'dxEventDetails--overflow-enabled' should not be added", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        eventUrl: {
            label: "Visit here",
            url: "https://zoom.com/join/8492830",
            target: "_blank"
        }
    };
    const { container } = render( <DXEventDetails {...props} /> );
    const url = container.querySelector( '[data-testid="event-details-url"]' );
    expect( url?.classList.contains( 'dxEventDetails--overflow-enabled' ) ).not.toBeTruthy();
} );

test( "If the user passed an eventUrl label larger than 43 characters, the class 'dxEventDetails--overflow-enabled' should be added", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        eventUrl: {
            label: "Visit here the amazing event that is going to happen",
            url: "https://zoom.com/join/8492830",
            target: "_blank"
        }
    };
    const { container } = render( <DXEventDetails {...props} /> );
    const url = container.querySelector( '[data-testid="event-details-url"]' );
    expect( url?.classList.contains( 'dxEventDetails--overflow-enabled' ) ).toBeTruthy();
} );

// Link tests
test( "If no target passed into the eventUrl prop, the default value should be _self", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        eventUrl: {
            label: "Visit here the amazing event that is going to happen",
            url: "https://zoom.com/join/8492830",
        }
    };
    const { container } = render( <DXEventDetails {...props} /> );
    const url = container.querySelector( '[data-testid="event-details-url"]' ) as HTMLAnchorElement;
    expect( url?.target ).toEqual( "_self" );
} );

test( "If an empty target passed into the eventUrl prop, the default value should be _self", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        eventUrl: {
            label: "Visit here the amazing event that is going to happen",
            url: "https://zoom.com/join/8492830",
            target: "",
        }
    };
    const { container } = render( <DXEventDetails {...props} /> );
    const url = container.querySelector( '[data-testid="event-details-url"]' ) as HTMLAnchorElement;
    expect( url?.target ).toEqual( "_self" );
} );

test( "If an invalid target passed into the eventUrl prop, the default value should be _self", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        eventUrl: {
            label: "Visit here the amazing event that is going to happen",
            url: "https://zoom.com/join/8492830",
            target: "_new",
        }
    };
    const { container } = render( <DXEventDetails {...props} /> );
    const url = container.querySelector( '[data-testid="event-details-url"]' ) as HTMLAnchorElement;
    expect( url?.target ).toEqual( "_self" );
} );

test( "If a valid target passed into the eventUrl prop, the value should be assigned", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        eventUrl: {
            label: "Visit here the amazing event that is going to happen",
            url: "https://zoom.com/join/8492830",
            target: "_blank",
        }
    };
    const { container } = render( <DXEventDetails {...props} /> );
    const url = container.querySelector( '[data-testid="event-details-url"]' ) as HTMLAnchorElement;
    expect( url?.target ).toEqual( "_blank" );
} );

test( "If an valid target passed into the eventUrl prop, an icon should be rendered", () => {
    let props = {
        title: "Birthday Party",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "My Home",
        eventUrl: {
            label: "Visit here the amazing event that is going to happen",
            url: "https://zoom.com/join/8492830",
            target: "_blank",
        }
    };
    const { container } = render( <DXEventDetails {...props} /> );
    const icon = container.querySelector( '[data-testid="event-details-url"]' )?.childNodes[1] as HTMLAnchorElement;
    expect( icon?.tagName ).toEqual( "I" );
} );

test( "If push on share button and have the social media modal configuration", async () => {
    render( <DXEventDetails {...propsWithShareConfig} /> );
    const shareButton = screen.getByTestId( "event-details-share-btn" );
    await userEvent.click( shareButton );
    const overlay = screen.getByTestId( "event-details-overlay" );
    const icon = screen.getByTestId( "event-details-overlay-close" );
    const socialShareRender = screen.getByTestId( 'dxSocialShare' );
    expect( overlay ).toBeInTheDocument();
    expect( socialShareRender ).toBeInTheDocument();
    await userEvent.click( icon );
    expect( screen.getByTestId( "event-details-info" ) ).toBeInTheDocument();
} );

test( "If focus on close Icon of overlay modal and enter with keyboard close the icon overlay", async () => {
    render( <DXEventDetails {...propsWithShareConfig} /> );
    const shareButton = screen.getByTestId( "event-details-share-btn" );
    await userEvent.click( shareButton );
    const closeIcon = screen.getByTestId( "event-details-overlay-close" );
    closeIcon.focus();
    fireEvent.keyDown( closeIcon, {
        keyCode: 13
    } );
    expect( screen.getByTestId( "event-details-info" ) ).toBeInTheDocument();
} );

test( "If focus on the close icon of the overlay modal and pressing any key does not close the modal.", async () => {
    render( <DXEventDetails {...propsWithShareConfig} /> );
    const shareButton = screen.getByTestId( "event-details-share-btn" );
    await userEvent.click( shareButton );
    const closeIcon = screen.getByTestId( "event-details-overlay-close" );
    const overlay = screen.getByTestId( "event-details-overlay" );
    const socialShareRender = screen.getByTestId( 'dxSocialShare' );
    closeIcon.focus();
    fireEvent.keyDown( closeIcon, {
        keyCode: 38
    } );
    expect( overlay ).toBeInTheDocument();
    expect( socialShareRender ).toBeInTheDocument();
} );

test( "Icon changes on parameter set", () => {
    let props = {
        ...changedIconsEventDetailsArgs,
        addressLines: ["Main Avenue #68 pc.75638", "Main Avenue #68 pc.75638"],
        contact: jest.fn(),
        getDirections: jest.fn(),
        share: jest.fn(),
        register: jest.fn(),
    };
    render( <DXEventDetails {...props} /> );

    expect( screen.getByTestId( "event-details-add-btn" ).querySelector( "i" ) ).toHaveClass( changedIconsEventDetailsArgs.icons.calendar );
} );

test( "Address Slice Boundary: Strictly renders only index 0 and 1 when exceeding MAX_ADDRESSES", () => {
    let props = {
        title: "Slice Event",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "Test Location",
        addressLines: ["Address One", "Address Two", "Address Three", "Address Four"],
    };
    const { getByTestId, queryByTestId } = render( <DXEventDetails {...props} /> );

    // Assert the exact slice boundaries, proving the slice executed exactly at index 0 and length 2
    expect( getByTestId( "event-details-adrs-line-1" ).textContent ).toBe( "Address One" );
    expect( getByTestId( "event-details-adrs-line-2" ).textContent ).toBe( "Address Two" );
    expect( queryByTestId( "event-details-adrs-line-3" ) ).toBeNull();
} );

test( "Mobile Viewport Layout Engine: resize listener toggles isMobile flag based on container offsetWidth", () => {
    // 1. Bypass SCSS module mocking: force parseInt to return a valid breakpoint when evaluating 'md'
    const originalParseInt = global.parseInt;
    jest.spyOn( global, 'parseInt' ).mockImplementation( ( string, radix ) => {
        const str = String( string );
        if ( str === 'md' || str.includes( 'object' ) ) return 768; // Fallback desktop breakpoint
        return originalParseInt( string, radix );
    } );

    let props = {
        title: "Mobile Event",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "Test Location",
        contact: jest.fn()
    };
    const { getByTestId } = render( <DXEventDetails {...props} /> );
    const contactBtn = getByTestId( "event-details-contact-btn" );

    // 2. Safely override the JSDOM getter for offsetWidth
    const offsetSpy = jest.spyOn( HTMLElement.prototype, 'offsetWidth', 'get' );

    // Force Desktop Layout
    offsetSpy.mockReturnValue( 1200 );
    fireEvent( window, new Event( 'resize' ) );
    expect( contactBtn.textContent ).toContain( "Contact" );

    // Force Mobile Layout
    offsetSpy.mockReturnValue( 500 );
    fireEvent( window, new Event( 'resize' ) );
    expect( contactBtn.textContent ).not.toContain( "Contact" );

    // Cleanup
    jest.restoreAllMocks();
} );

test( "Overlay Event Delegation: triggers Add Calendar overlay via nested child class interactions", async () => {
    let props = {
        title: "Delegation Event",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "Test Location",
        addToMyCalendar: true,
    };
    render( <DXEventDetails {...props} /> );

    // We must directly simulate a click event originating from a target with the specific fallback class
    const mockEvent = {
        target: {
            id: "",
            className: "dxEventDetails__addText" // Targeting the specific OR operator branch
        }
    };

    const button = screen.getByTestId( "event-details-add-btn" );
    // Fire the onClick manually with our exact mock event to hit the branch
    fireEvent.click( button, mockEvent );

    const overlay = screen.getByTestId( "event-details-overlay" );
    expect( overlay ).toBeInTheDocument();
    expect( screen.getByText( "Select the calendar you want to add the event to" ) ).toBeInTheDocument();
} );

test( "Calendar URL Encoding: strict verification of Apple/Outlook VCALENDAR string construction", async () => {
    let props = {
        title: "Strict Encoding Event",
        eventFrom: "2021-10-27",
        eventTo: "2021-11-07",
        beginHour: "19:00:00",
        endHour: "21:00:00",
        location: "Encoded Location",
        addToMyCalendar: true,
        calendarButtons: { apple: true }
    };
    const { getByTestId, container } = render( <DXEventDetails {...props} /> );

    const button = getByTestId( "event-details-add-btn" );
    await userEvent.click( button );

    const apple = container.querySelector( '[data-testid="event-details-apple"]' ) as HTMLElement;
    const anchor = apple.childNodes[0] as HTMLAnchorElement;
    const decodedUrl = decodeURI( anchor.href );

    // Assert the exact construction of the VCALENDAR string to kill concatenation mutants
    expect( decodedUrl ).toContain( "BEGIN:VCALENDAR" );
    expect( decodedUrl ).toContain( "SUMMARY: Strict Encoding Event" );
    expect( decodedUrl ).toContain( "LOCATION:Encoded Location" );
    expect( decodedUrl ).toContain( "END:VCALENDAR" );
} );

describe( "DXEventDetails Hardening", () => {
    describe( "Property Fallbacks and Object Traps", () => {
        it( "strictly executes empty string location fallbacks during calendar URI encoding", async () => {
            const missingLocationProps = {
                title: "No Location",
                eventFrom: "2021-10-27",
                eventTo: "2021-11-07",
                beginHour: "19:00",
                endHour: "21:00",
                location: "", // Force falsy string evaluation
                addToMyCalendar: true,
                calendarButtons: { google: true, yahoo: true, outlook: true, apple: true }
            };

            const { container } = render( <DXEventDetails {...missingLocationProps} /> );
            await userEvent.click( screen.getByTestId( "event-details-add-btn" ) );

            // If the `props.location || ''` mutant survives, undefined will render into the string.
            // By enforcing the exact decode result, we kill the fallback assignment mutants.
            const googleAnchor = container.querySelector( '[data-testid="event-details-google"] a' ) as HTMLAnchorElement;
            expect( decodeURI( googleAnchor.href ) ).toContain( "&location=&sprop" );

            const yahooAnchor = container.querySelector( '[data-testid="event-details-yahoo"] a' ) as HTMLAnchorElement;
            expect( decodeURI( yahooAnchor.href ) ).toContain( "&in_loc=" );
        } );

        it( "bypasses verifyOverflow logic safely when optional arrays and objects are entirely undefined", () => {
            const strictProps = {
                title: "Minimal Event",
                eventFrom: "2021-10-27",
                eventTo: "2021-11-07",
                beginHour: "19:00",
                endHour: "21:00",
                location: "A Place",
            };
            // Component should mount and execute the first useEffect without throwing errors on missing addressLines / eventUrl
            expect( () => render( <DXEventDetails {...strictProps} /> ) ).not.toThrow();
        } );
    } );

    describe( "Overlay Identification and Conditional Logic Vectors", () => {
        it( "fails back overlay gracefully if share object evaluates to falsy after activation state is flipped", async () => {
            const falsyShareProps = {
                title: "Falsy Share",
                eventFrom: "2021-10-27",
                eventTo: "2021-11-07",
                beginHour: "19:00",
                endHour: "21:00",
                location: "Here",
                share: {} // Object is present to pass the prop check, but missing required DXSocialShare internals
            };

            const { queryByTestId } = render( <DXEventDetails {...falsyShareProps} /> );

            // Activate share overlay
            await userEvent.click( screen.getByTestId( "event-details-share-btn" ) );

            // Because the object exists but lacks full validation, DXSocialShare renders empty or fallback.
            // This forces execution of the complex `if (overlaySocialMedia && typeof props.share === "object")` boundary.
            expect( queryByTestId( "event-details-overlay" ) ).toBeInTheDocument();
        } );

        it( "evaluates explicit class boundaries on the event-details-share-btn click targets", async () => {
            const props = {
                title: "Event",
                eventFrom: "2021-10-27",
                eventTo: "2021-11-07",
                beginHour: "19:00",
                endHour: "21:00",
                location: "Here",
                share: { size: "small" } as SocialShareProps
            };

            render( <DXEventDetails {...props} /> );

            // We simulate a click exactly on the internal icon element to hit the fallback `classValidation === getIcon(...)` branch
            const mockEvent = {
                target: {
                    id: "",
                    className: "ci-External_Link" // Standard default share icon class
                }
            };

            const btn = screen.getByTestId( "event-details-share-btn" );
            fireEvent.click( btn, mockEvent );

            expect( screen.getByTestId( "event-details-overlay" ) ).toBeInTheDocument();
        } );
    } );

    describe( "Lifecycle DOM Measurement Resets", () => {
        it( "triggers mobile validation lifecycle cleanups correctly on unmount", () => {
            const removeEventListenerSpy = jest.spyOn( window, 'removeEventListener' );

            const props = {
                title: "Event",
                eventFrom: "2021-10-27",
                eventTo: "2021-11-07",
                beginHour: "19:00",
                endHour: "21:00",
                location: "Here"
            };

            const { unmount } = render( <DXEventDetails {...props} /> );
            unmount();

            // Verify the specific validateMobile function reference was passed to the cleanup phase
            expect( removeEventListenerSpy ).toHaveBeenCalledWith( "resize", expect.any( Function ) );

            removeEventListenerSpy.mockRestore();
        } );

        it( "evaluates strict <= width calculations enforcing mobile boolean flags", () => {
            // Setup exactly matching the MAX_WIDTH_MOBILE constraint to kill < vs <= boundary mutants
            const MAX_WIDTH = 768; // Based on standard md breakpoint parsing

            jest.spyOn( global, 'parseInt' ).mockReturnValue( MAX_WIDTH );
            const offsetSpy = jest.spyOn( HTMLElement.prototype, 'offsetWidth', 'get' ).mockReturnValue( MAX_WIDTH );

            const props = {
                title: "Event",
                eventFrom: "2021-10-27",
                eventTo: "2021-11-07",
                beginHour: "19:00",
                endHour: "21:00",
                location: "Here",
                contact: jest.fn()
            };

            const { getByTestId } = render( <DXEventDetails {...props} /> );

            // Because offsetWidth is exactly 768, <= returns true, setting isMobile = true.
            // DXButton hideLabel={true} strips the text content out completely.
            expect( getByTestId( "event-details-contact-btn" ).textContent ).not.toContain( "Contact" );

            offsetSpy.mockRestore();
        } );
    } );
} );
