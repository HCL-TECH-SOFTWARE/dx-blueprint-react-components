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

import React from "react";
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getValuesFromDateFormat, DateValues, getMomentDayShort } from "../../utilities";
import DXCard from "./DXCard";

const today = new Date( Date.now() );

function getAbbreviation( event: any ) {
    const dateFormatted: DateValues = getValuesFromDateFormat( event.date, event.dateFormat );
    // Built from its parts, independently of how the component parses the date
    const date = new Date( Number( dateFormatted.year ), Number( dateFormatted.month ) - 1, Number( dateFormatted.day ) );
    let abbreviation = getMomentDayShort( date.getDay() );
    return abbreviation;
}

test( "if a cover passed then it should render", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        cover: {
            url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
            altText: "card-cover"
        },
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    expect( getByTestId( "card-cover" ) ).toBeInTheDocument();
} );

test( "if a cover passed doesn't have altText then the role presentation should be added", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        cover: {
            url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
        },
    };
    render( <DXCard {...cardProps} /> );
    let imageElement = screen.getByRole( 'presentation' ) as HTMLImageElement;
    expect( imageElement.src ).toBe( cardProps.cover.url );
} );

test( "if the coverSticker is passed it will render it", () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        coverSticker: "https://images.unsplash.com/photo-1547521420-4328f6f9b272?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        cover: {
            url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
            altText: "card-cover"
        },
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    expect( getByTestId( "card-cover-sticker" ) ).toBeInTheDocument();
} );

test( "If the user pass the checkbox prop and the cover, it will render it with the id 'card-cover-checkbox'", () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        checkbox: mock,
        cover: {
            url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
            altText: "card-cover"
        },
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    expect( getByTestId( "card-cover-checkbox" ) ).toBeInTheDocument();
} );

test( "If the user pass clicks on the cover checkbox it will be called", async () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        checkbox: mock,
        cover: {
            url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
            altText: "card-cover"
        },
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    const coverCk = getByTestId( "card-cover-checkbox" );
    await userEvent.click( coverCk );
    expect( mock ).toBeCalled();
} );

test( "If the user pass the checkbox prop and no cover, it will render it with the id 'card-top-checkbox'", () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        checkbox: mock,
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    expect( getByTestId( "card-top-checkbox" ) ).toBeInTheDocument();
} );

test( "If the user pass clicks on the top checkbox it will be called", async () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        checkbox: mock,
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    const coverCk = getByTestId( "card-top-checkbox" );
    await userEvent.click( coverCk );
    expect( mock ).toBeCalled();
} );

test( "if a label prop is passed, then it should render it", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        label: "Label Text",
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    expect( getByTestId( "card-top-label" ) ).toBeInTheDocument();
} );

test( "if a metaLabel prop is passed, then it should render it", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        metaLabel: "Medata label",
        cover: {
            url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
            altText: "card-cover"
        },
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    expect( getByTestId( "card-metadata-label" ) ).toBeInTheDocument();
} );

test( "if no options prop passed, then it should not render it", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
    };
    const { container } = render( <DXCard {...cardProps} /> );
    expect( container.querySelector( '[data-testid="card-top-options"]' ) ).toBeNull();
} );

test( "if options prop passed but empty, then it should not render it", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        options: []
    };
    const { container } = render( <DXCard {...cardProps} /> );
    expect( container.querySelector( '[data-testid="card-top-options"]' ) ).toBeNull();
} );

test( "if a valid options prop passed, then it should render it", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        options: [{ label: "Edit", onClick: () => {} }]
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    expect( getByTestId( "card-top-options" ) ).toBeInTheDocument();
} );

test( "if the description is passed, then it should render it", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        description: "This is the description",
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    expect( getByTestId( "card-body-description" ) ).toBeInTheDocument();
} );

test( "if the bodyMetadata is passed, then it should render it", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        bodyMetadata: "This is the body metadata",
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    expect( getByTestId( "card-body-metadata" ) ).toBeInTheDocument();
} );

test( "If the user pass the event prop it will render it", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        event: {
            date: `${today.getFullYear()}/${( today.getMonth() + 1 ) > 12 ? today.getMonth() : today.getMonth() + 1}/${today.getDate()}`,
            dateFormat: "YY/M/D",
            startTime: "11:30a",
            endTime: "1:00p"
        },
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    expect( getByTestId( "card-body-event" ) ).toBeInTheDocument();
} );

test( "If the user passes an invalid dateFormat, it will not render it", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        event: {
            date: `${today.getFullYear()}--${( today.getMonth() + 1 ) > 12 ? today.getMonth() : today.getMonth() + 1}--${today.getDate()}`,
            startTime: "11:30a",
            endTime: "1:00p",
            dateFormat: "MM--DD--YY"
        },
    };
    const { container } = render( <DXCard {...cardProps} /> );
    let event = container.querySelector( '[data-testid="card-body-event"]' );
    expect( event ).toBeNull();
} );

test( "If the user passes the event prop with the date of today, the abbreviation will have the correct value", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        event: {
            date: `${today.getFullYear()}/${( today.getMonth() + 1 ) > 12 ? today.getMonth() : today.getMonth() + 1}/${today.getDate()}`,
            dateFormat: "YY/M/D",
            startTime: "11:30a",
            endTime: "1:00p"
        },
    };
    const { container } = render( <DXCard {...cardProps} /> );
    let abbrRendered = container.querySelector( '[data-testid="card-body-event"]' )?.childNodes[0];
    let abbreviation = getAbbreviation( cardProps.event );
    expect( abbrRendered?.textContent ).toEqual( abbreviation );
} );

test( "If the user does not pass the endTime, the event element will include only the startTime", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        event: {
            date: `${today.getFullYear()}/${( today.getMonth() + 1 ) > 12 ? today.getMonth() : today.getMonth() + 1}/${today.getDate()}`,
            dateFormat: "YY/M/D",
            startTime: "11:30a",
        },
    };
    const { container } = render( <DXCard {...cardProps} /> );
    let event = container.querySelector( '[data-testid="card-body-event"]' );
    expect( event?.textContent?.includes( `${cardProps.event.startTime}` ) ).toBeTruthy();
} );

test( "If the user does pass the endTime, the event element will include it", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        event: {
            date: `${today.getFullYear()}/${( today.getMonth() + 1 ) > 12 ? today.getMonth() : today.getMonth() + 1}/${today.getDate()}`,
            dateFormat: "YY/M/D",
            startTime: "11:30a",
            endTime: "1:00p"
        },
    };
    const { container } = render( <DXCard {...cardProps} /> );
    let event = container.querySelector( '[data-testid="card-body-event"]' );
    expect( event?.textContent?.includes( `${cardProps.event.startTime} - ${cardProps.event.endTime}` ) ).toBeTruthy();
} );

test( "If the user passes the iconData prop, it will render it", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        iconData: {
            icon: "ci-Calendar_Days",
            text: "Sep 08 - 03:30p-06:30p"
        },
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    expect( getByTestId( "card-body-icon-data" ) ).toBeInTheDocument();
} );

test( "If the user does not pass the iconData prop, it will be null", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
    };
    const { container } = render( <DXCard {...cardProps} /> );
    let iconData = container.querySelector( '[data-testid="card-body-icon-data"]' );
    expect( iconData ).toBeNull();
} );

test( "If the user passes the iconData prop, but no text it will be null", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        iconData: {
            icon: "ci-Calendar_Days",
        },
    };
    const { container } = render( <DXCard {...cardProps} /> );
    let iconData = container.querySelector( '[data-testid="card-body-icon-data"]' );
    expect( iconData?.textContent ).toEqual( "" );
} );

test( "If the user passes the iconData prop, with the text prop it will render it", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        iconData: {
            icon: "ci-Calendar_Days",
            text: "Sep 08 - 03:30p-06:30p"
        },
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let iconData = getByTestId( "card-body-icon-data" );
    expect( iconData.textContent ).toEqual( cardProps.iconData.text );
} );

test( "If the user does not pass the images prop, it will be null", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        iconData: {
            icon: "ci-Calendar_Days",
            text: "Sep 08 - 03:30p-06:30p"
        },
    };
    const { container } = render( <DXCard {...cardProps} /> );
    let images = container.querySelector( '[data-testid="card-body-images"]' );
    expect( images ).toBeNull();
} );

test( "If the user passes an empty images prop, it will be null", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        images: {
            items: []
        },
    };
    const { container } = render( <DXCard {...cardProps} /> );
    let images = container.querySelector( '[data-testid="card-body-images"]' );
    expect( images ).toBeNull();
} );

test( "If the user passes the images prop, it will render it", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        images: {
            items: [
                {
                    url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-1"
                },
                {
                    url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-2"
                },
                {
                    url: "https://images.unsplash.com/photo-1684748370133-92f83adba386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
                    altText: "image-3"
                },
                {
                    url: "https://images.unsplash.com/photo-1683659635782-af84e4b67cc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1821&q=80",
                    altText: "image-4"
                },
                {
                    url: "https://images.unsplash.com/photo-1683380381470-8bb7e42aa5b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                    altText: "image-5"
                },
            ]
        }
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let images = getByTestId( "card-body-images" );
    expect( images ).toBeInTheDocument();
} );

test( "If the user pass the images, it will render the same amount of images passed", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        images: {
            items: [
                {
                    url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-1"
                },
                {
                    url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-2"
                },
            ]
        }
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let images = getByTestId( "card-body-images" );
    expect( images.childNodes ).toHaveLength( cardProps.images.items.length );
} );

test( "If the user pass more than 5 images, it will render just five", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        images: {
            items: [
                {
                    url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-1"
                },
                {
                    url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-2"
                },
                {
                    url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-1"
                },
                {
                    url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-2"
                },
                {
                    url: "https://images.unsplash.com/photo-1684748370133-92f83adba386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
                    altText: "image-3"
                },
                {
                    url: "https://images.unsplash.com/photo-1683659635782-af84e4b67cc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1821&q=80",
                    altText: "image-4"
                },
                {
                    url: "https://images.unsplash.com/photo-1683380381470-8bb7e42aa5b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                    altText: "image-5"
                },
            ]
        }
    };
    const { container } = render( <DXCard {...cardProps} /> );
    let images = container.querySelectorAll( ".dxCard__image" );
    expect( images ).toHaveLength( 5 );
} );

test( "If the user pass more than 5 images, a message telling how many images are not showed, will appear", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        images: {
            items: [
                {
                    url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-1"
                },
                {
                    url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-2"
                },
                {
                    url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-1"
                },
                {
                    url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-2"
                },
                {
                    url: "https://images.unsplash.com/photo-1684748370133-92f83adba386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
                    altText: "image-3"
                },
                {
                    url: "https://images.unsplash.com/photo-1683659635782-af84e4b67cc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1821&q=80",
                    altText: "image-4"
                },
                {
                    url: "https://images.unsplash.com/photo-1683380381470-8bb7e42aa5b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                    altText: "image-5"
                },
            ]
        }
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let images = getByTestId( "card-body-images" );
    let msg = images.childNodes[images.childNodes.length - 1];
    expect( msg.textContent ).toEqual( `+ ${cardProps.images.items.length - 5} more` );
} );

test( "If the user pass more than 5 images and the moreFn prop, next it clicks on the more message the moreFn will be called", async () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        images: {
            items: [
                {
                    url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-1"
                },
                {
                    url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-2"
                },
                {
                    url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-1"
                },
                {
                    url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-2"
                },
                {
                    url: "https://images.unsplash.com/photo-1684748370133-92f83adba386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
                    altText: "image-3"
                },
                {
                    url: "https://images.unsplash.com/photo-1683659635782-af84e4b67cc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1821&q=80",
                    altText: "image-4"
                },
                {
                    url: "https://images.unsplash.com/photo-1683380381470-8bb7e42aa5b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                    altText: "image-5"
                },
            ],
            moreFn: mock
        }
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let images = getByTestId( "card-body-images" );
    let msg = images.childNodes[images.childNodes.length - 1] as HTMLElement;
    await userEvent.click( msg );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user pass more than 5 images and but no moreFn prop, it will not have the style of 'cursor: pointer'", async () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        images: {
            items: [
                {
                    url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-1"
                },
                {
                    url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-2"
                },
                {
                    url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-1"
                },
                {
                    url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-2"
                },
                {
                    url: "https://images.unsplash.com/photo-1684748370133-92f83adba386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
                    altText: "image-3"
                },
                {
                    url: "https://images.unsplash.com/photo-1683659635782-af84e4b67cc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1821&q=80",
                    altText: "image-4"
                },
                {
                    url: "https://images.unsplash.com/photo-1683380381470-8bb7e42aa5b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                    altText: "image-5"
                },
            ],
        }
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let images = getByTestId( "card-body-images" );
    let msg = images.childNodes[images.childNodes.length - 1] as HTMLElement;
    expect( msg ).not.toHaveStyle( 'cursor: pointer' );
} );

test( "If the user pass more than 5 images and the moreFn prop, it will have the style of 'cursor: pointer'", async () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        images: {
            items: [
                {
                    url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-1"
                },
                {
                    url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-2"
                },
                {
                    url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-1"
                },
                {
                    url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-2"
                },
                {
                    url: "https://images.unsplash.com/photo-1684748370133-92f83adba386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
                    altText: "image-3"
                },
                {
                    url: "https://images.unsplash.com/photo-1683659635782-af84e4b67cc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1821&q=80",
                    altText: "image-4"
                },
                {
                    url: "https://images.unsplash.com/photo-1683380381470-8bb7e42aa5b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                    altText: "image-5"
                },
            ],
            moreFn: mock
        }
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let images = getByTestId( "card-body-images" );
    let msg = images.childNodes[images.childNodes.length - 1] as HTMLElement;
    expect( msg ).toHaveStyle( 'cursor: pointer' );
} );

test( "If the user pass more than 5 images and the moreFn prop, next it focus on the more message and press the Enter key the moreFn will be called", async () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        images: {
            items: [
                {
                    url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-1"
                },
                {
                    url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-2"
                },
                {
                    url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-1"
                },
                {
                    url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-2"
                },
                {
                    url: "https://images.unsplash.com/photo-1684748370133-92f83adba386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
                    altText: "image-3"
                },
                {
                    url: "https://images.unsplash.com/photo-1683659635782-af84e4b67cc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1821&q=80",
                    altText: "image-4"
                },
                {
                    url: "https://images.unsplash.com/photo-1683380381470-8bb7e42aa5b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                    altText: "image-5"
                },
            ],
            moreFn: mock
        }
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let images = getByTestId( "card-body-images" );
    let msg = images.childNodes[images.childNodes.length - 1] as HTMLElement;
    msg.focus();
    fireEvent.keyDown( msg, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user pass more than 5 images and the moreFn prop, next it focus on the more message and press the Space key the moreFn will be called", async () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        images: {
            items: [
                {
                    url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-1"
                },
                {
                    url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-2"
                },
                {
                    url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-1"
                },
                {
                    url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-2"
                },
                {
                    url: "https://images.unsplash.com/photo-1684748370133-92f83adba386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
                    altText: "image-3"
                },
                {
                    url: "https://images.unsplash.com/photo-1683659635782-af84e4b67cc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1821&q=80",
                    altText: "image-4"
                },
                {
                    url: "https://images.unsplash.com/photo-1683380381470-8bb7e42aa5b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                    altText: "image-5"
                },
            ],
            moreFn: mock
        }
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let images = getByTestId( "card-body-images" );
    let msg = images.childNodes[images.childNodes.length - 1] as HTMLElement;
    msg.focus();
    fireEvent.keyDown( msg, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user pass more than 5 images and the moreFn prop, next it focus on the more message and press the Escape key the moreFn will not be called", async () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        images: {
            items: [
                {
                    url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-1"
                },
                {
                    url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-2"
                },
                {
                    url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-1"
                },
                {
                    url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                    altText: "image-2"
                },
                {
                    url: "https://images.unsplash.com/photo-1684748370133-92f83adba386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
                    altText: "image-3"
                },
                {
                    url: "https://images.unsplash.com/photo-1683659635782-af84e4b67cc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1821&q=80",
                    altText: "image-4"
                },
                {
                    url: "https://images.unsplash.com/photo-1683380381470-8bb7e42aa5b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                    altText: "image-5"
                },
            ],
            moreFn: mock
        }
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let images = getByTestId( "card-body-images" );
    let msg = images.childNodes[images.childNodes.length - 1] as HTMLElement;
    msg.focus();
    fireEvent.keyDown( msg, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    expect( mock ).not.toHaveBeenCalled();
} );

test( "If the user does not pass the primaryButton prop, it will be null", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
    };
    const { container } = render( <DXCard {...cardProps} /> );
    let btn = container.querySelector( '[data-testid="card-primary-button"]' );
    expect( btn ).toBeNull();
} );

test( "If the user passes the primaryButton prop, it will be rendered", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        primaryButton: {
            label: "Prim. Button",
            onClick: function () {}
        },
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let btn = getByTestId( "card-primary-button" );
    expect( btn ).toBeInTheDocument();
} );

test( "If the user clicks on the primaryButton, it will be called", async () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        primaryButton: {
            label: "Prim. Button",
            onClick: mock
        },
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let btn = getByTestId( "card-primary-button" );
    await userEvent.click( btn );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus on the primaryButton and press the Enter key, it will be called", () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        primaryButton: {
            label: "Prim. Button",
            onClick: mock
        },
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let btn = getByTestId( "card-primary-button" );
    btn.focus();
    fireEvent.keyDown( btn, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus on the primaryButton and press the Space key, it will be called", () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        primaryButton: {
            label: "Prim. Button",
            onClick: mock
        },
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let btn = getByTestId( "card-primary-button" );
    btn.focus();
    fireEvent.keyDown( btn, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus on the primaryButton and press the Escape key, it will not be called", () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        primaryButton: {
            label: "Prim. Button",
            onClick: mock
        },
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let btn = getByTestId( "card-primary-button" );
    btn.focus();
    fireEvent.keyDown( btn, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    expect( mock ).not.toHaveBeenCalled();
} );

test( "If the user does not pass the secondaryButton prop, it will be null", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        }
    };
    const { container } = render( <DXCard {...cardProps} /> );
    let btn = container.querySelector( '[data-testid="card-secondary-button"]' );
    expect( btn ).toBeNull();
} );

test( "If the user passes the secondaryButton prop, it will be rendered", () => {
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        secondaryButton: {
            label: "Prim. Button",
            onClick: function () {}
        },
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let btn = getByTestId( "card-secondary-button" );
    expect( btn ).toBeInTheDocument();
} );

test( "If the user clicks on the secondaryButton, it will be called", async () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        secondaryButton: {
            label: "Prim. Button",
            onClick: mock
        },
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let btn = getByTestId( "card-secondary-button" );
    await userEvent.click( btn );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus on the secondaryButton and press the Enter key, it will be called", () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        secondaryButton: {
            label: "Prim. Button",
            onClick: mock
        },
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let btn = getByTestId( "card-secondary-button" );
    btn.focus();
    fireEvent.keyDown( btn, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus on the secondaryButton and press the Space key, it will be called", () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        secondaryButton: {
            label: "Prim. Button",
            onClick: mock
        },
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let btn = getByTestId( "card-secondary-button" );
    btn.focus();
    fireEvent.keyDown( btn, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus on the secondaryButton and press the Escape key, it will not be called", () => {
    let mock = jest.fn();
    let cardProps = {
        title: {
            url: "#amazing",
            label: "Card Title",
        },
        secondaryButton: {
            label: "Prim. Button",
            onClick: mock
        },
    };
    const { getByTestId } = render( <DXCard {...cardProps} /> );
    let btn = getByTestId( "card-secondary-button" );
    btn.focus();
    fireEvent.keyDown( btn, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    expect( mock ).not.toHaveBeenCalled();
} );

test( "If the user pass a label and bottomLabel prop, the element 'card-label-bottom' should be in the document", () => {
    let props = {
        title: {
            url: "#amazing",
            label: "Card Title Lorem ipsum dolor sit amet, consectetuer adipiscin",
        },
        cover: {
            url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
            altText: "card-cover"
        },
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, neque! Illum ipsum necessitatibus, repellat magni voluptas aspernatur veniam repudiandae. Magnam, quo placeat. Rem animi optio earum debitis, quibusdam perspiciatis veniam!",
        label: "Text Label",
        bottomLabel: true
    };
    const { container } = render( <DXCard {...props} /> );
    let label = container.querySelector( '[data-testid="card-label-bottom"]' );
    expect( label ).toBeInTheDocument();
} );

// Tests for the loader
test( "When the image is rendering, the element 'loader__container' should not have the class 'd-none'", () => {
    let props = {
        title: {
            url: "#amazing",
            label: "Card Title Lorem ipsum dolor sit amet, consectetuer adipiscin",
        },
        cover: {
            url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
            altText: "card-cover"
        },
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, neque! Illum ipsum necessitatibus, repellat magni voluptas aspernatur veniam repudiandae. Magnam, quo placeat. Rem animi optio earum debitis, quibusdam perspiciatis veniam!",
        label: "Text Label",
        bottomLabel: true
    };
    const { container } = render( <DXCard {...props} /> );
    let loaderContainer = container.querySelector( ".loader__container" );
    expect( loaderContainer ).not.toHaveClass( "d-none" );
} );

test( "When the image finish its rendering, the element 'loader__container' should have the class 'd-none'", () => {
    let props = {
        title: {
            url: "#amazing",
            label: "Card Title Lorem ipsum dolor sit amet, consectetuer adipiscin",
        },
        cover: {
            url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
            altText: "card-cover"
        },
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, neque! Illum ipsum necessitatibus, repellat magni voluptas aspernatur veniam repudiandae. Magnam, quo placeat. Rem animi optio earum debitis, quibusdam perspiciatis veniam!",
        label: "Text Label",
        bottomLabel: true
    };
    const { container } = render( <DXCard {...props} /> );
    let cover = container.querySelector( ".dxCard__coverImage" ) as HTMLElement;
    fireEvent.load( cover );
    let loaderContainer = container.querySelector( ".loader__container" );
    expect( loaderContainer ).toHaveClass( "d-none" );
} );
