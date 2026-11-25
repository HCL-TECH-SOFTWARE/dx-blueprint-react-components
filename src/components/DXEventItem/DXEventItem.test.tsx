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
import { render } from "@testing-library/react";
import DXEventItem from "./DXEventItem";
import { itSupportsExtensionProps } from "../../testUtils/extensionContract";
import '@testing-library/jest-dom';
import { overflowText, getValuesFromDateFormat } from "../../utilities";

const eventVariant = "event" as const;
const formVariant = "form" as const;

const eventData = {
    variant: eventVariant,
    eventDate: "10/30/23",
    dateFormat: "MM/DD/YY",
    eventStartTime: "15:30",
    eventEndTime: "16:30",
    eventName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur maximus blandit cras sit  ",
    link: {
        label: "",
        url: "https://hcl-software.com/",
        target: "_self"
    },
};

const formData = {
    variant: formVariant,
    formNumber: "521A",
    formPrice: 25,
    formName: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer efficitur maximus blandit cras sit ",
    link: {
        label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
        url: "https://hcl-software.com/",
        target: "_self"
    }
};

test( "If the variant 'event' is passed then the 'event-item' element should have the classes 'dxEventItem dxEventItem--event", () => {
    const { getByTestId } = render( <DXEventItem {...eventData} /> );
    const eventItem = getByTestId( "event-item" );
    expect( eventItem ).toHaveClass( "dxEventItem--event" );

} );

test( "If the variant 'form' is passed then the 'event-item' element should have the classes 'dxEventItem--form", () => {
    const { getByTestId } = render( <DXEventItem {...formData} /> );
    const eventItem = getByTestId( "event-item" );
    expect( eventItem ).toHaveClass( "dxEventItem--form" );

} );

test( "If the variant 'event' is passed then the 'event-metadata' element should be in document", () => {
    const { getByTestId } = render( <DXEventItem {...eventData} /> );
    const eventMetadata = getByTestId( "event-metadata" );
    expect( eventMetadata ).toBeInTheDocument();
} );

test( "If the variant 'form' is passed then the 'form-metadata' element should be in document", () => {
    const { getByTestId } = render( <DXEventItem {...formData} /> );
    const formMetadata = getByTestId( "form-metadata" );
    expect( formMetadata ).toBeInTheDocument();
} );

test( 'if an invalid variant is passed expect the component not to render', () => {
    let props = {
        variant: "Invalid"
    };
    // @ts-ignore: Ignoring error since it is part of the test
    render( <DXEventItem {...props} /> );
    let container = document.querySelector( ".dxEventItem" );
    expect( container ).toBeNull();
} );

// Tests for the text
test( "If a title value is passed longer than 57 characters, it should be cut off by an ellipsis", () => {
    const { getByTestId } = render( <DXEventItem {...eventData} /> );
    const title = getByTestId( "event-item-title" );
    expect( title ).toHaveTextContent( overflowText( eventData.eventName, 57 ) );
} );

test( "If a eventName is empty the title value should be empty", () => {
    let props = {
        ...eventData,
        eventName: ""
    };
    const { getByTestId } = render( <DXEventItem {...props} /> );
    const title = getByTestId( "event-item-title" );
    expect( title ).toHaveTextContent( "" );
} );

test( "If a title value is passed longer than 92 characters, it should be cut off by an ellipsis", () => {
    const { getByTestId } = render( <DXEventItem {...formData} /> );
    const title = getByTestId( "event-item-title" );
    expect( title ).toHaveTextContent( overflowText( formData.formName, 92 ) );

} );

test( "If a formName is empty value it should be empty", () => {
    let props = {
        ...formData,
        formName: ""
    };
    const { getByTestId } = render( <DXEventItem {...props} /> );
    const title = getByTestId( "event-item-title" );
    expect( title ).toHaveTextContent( "" );
} );

test( "If a name value is less than 57 characters, the '...' will be on the string", () => {
    const eventData = {
        variant: eventVariant,
        eventDate: "2021-10-27",
        eventStartTime: "15:30",
        eventEndTime: "16:30",
        eventName: "Short title",
        link: {
            label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ae",
            url: "https://hcl-software.com/",
            target: "_self"
        }
    };

    const { getByTestId } = render( <DXEventItem {...eventData} /> );
    const title = getByTestId( "event-item-title" );
    expect( title ).toHaveTextContent( overflowText( eventData.eventName, 57 ) );

} );

// Date format tests
test( "If the format passed is invalid, the date will have the 'Invalid' text", () => {
    let props = {
        ...eventData,
        dateFormat: "MonDD/YY"
    };
    const { getByTestId } = render( <DXEventItem {...props} /> );
    let date = getByTestId( "event-item-day" );
    expect( date.textContent ).toContain( "Invalid" );
} );

test( "If the date format is valid, the value will be correct", () => {
    let expectedDate = getValuesFromDateFormat( eventData.eventDate, eventData.dateFormat );
    const { getByTestId } = render( <DXEventItem {...eventData} /> );
    let date = getByTestId( "event-item-day" );
    expect( date.textContent ).toEqual( `${expectedDate.day}` );
} );


test( 'If the event item url is sent, it should be displayed', () => {
    const { getByTestId } = render( <DXEventItem {...eventData} /> );
    const card = getByTestId( "event-item-card" ) as HTMLAnchorElement;
    expect( card.href ).toBe( eventData.link.url );
} );

test( 'If the event item url is not sent, it should be displayed an "#"', () => {
    let props = {
        ...eventData,
        link: {
            label: "",
            url: "",
            target: ""
        },
    };
    const { getByTestId } = render( <DXEventItem {...props} /> );
    const card = getByTestId( "event-item-card" ) as HTMLAnchorElement;
    expect( card.href ).toContain( "#" );
} );

itSupportsExtensionProps( ( extra ) => <DXEventItem {...eventData} {...extra} /> );
itSupportsExtensionProps( ( extra ) => <DXEventItem {...formData} {...extra} /> );

test( "props that are not DOM attributes are not forwarded to the root", () => {
    const { container } = render( <DXEventItem {...eventData} {...{ notADomProp: "x", title: "Tip", "data-tip": "Tip" } as object} /> );
    expect( container.firstElementChild?.getAttribute( "notadomprop" ) ).toBeNull();
    // a `title` can be content data, so it is not forwarded either; data-* is
    expect( container.firstElementChild?.getAttribute( "title" ) ).toBeNull();
    expect( container.firstElementChild?.getAttribute( "data-tip" ) ).toBe( "Tip" );
} );

test( "with an unknown variant nothing is rendered, so className and extra props have nowhere to go", () => {
    const { container } = render( <DXEventItem {...eventData} {...{ variant: "other" } as object} className="bp-contract" /> );
    expect( container ).toBeEmptyDOMElement();
} );
