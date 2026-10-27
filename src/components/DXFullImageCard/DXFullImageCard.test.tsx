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
import { fireEvent, render } from "@testing-library/react";
import DXFullImageCard, { FullImageCardProps } from "./DXFullImageCard";
import { fullImageArgs } from "./DXFullImageCard.stories";
import { getValuesFromDateFormat, getFullMonth } from "../../utilities";

test( "If no image is passed, then the element will have the empty styles", () => {
    let copy = { ...fullImageArgs };
    //@ts-ignore: Ignoring the alert of deleting a required prop for tests purposes
    delete copy.image;
    const { container } = render( <DXFullImageCard {...copy} /> );
    let link = container.querySelector( '.dxFullImageCard__link' );
    expect( link ).toHaveStyle( {
        backgroundImage: "linear-gradient(132deg, #080808 0%, transparent 40%)"
    } );
} );

test( "If an image is passed, then the element will have the background image styles", () => {
    const { container } = render( <DXFullImageCard {...fullImageArgs} /> );
    let link = container.querySelector( ".dxFullImageCard__link" );
    expect( link ).toHaveStyle( {
        backgroundImage: `linear-gradient(16.81deg, rgba(0, 0, 0, 0.5) 9.02%, rgba(0, 0, 0, 0.5) 42.36%), url('${fullImageArgs.image.url}')`
    } );
} );

test( "If no date is passed, the element will be null", () => {
    let copy = { ...fullImageArgs };
    //@ts-ignore: Ignoring the alert of deleting a required prop for tests purposes
    delete copy.subtitle;
    const { container } = render( <DXFullImageCard {...copy} /> );
    let date = container.querySelector( '[data-testid="full-image-card-date"]' );
    expect( date ).toBeNull();
} );

test( "If a date is passed, then the element should be in the document", () => {
    const { getByTestId } = render( <DXFullImageCard {...fullImageArgs} /> );
    let date = getByTestId( "full-image-card-date" ) as HTMLImageElement;
    expect( date ).toBeInTheDocument();
} );

test( "if no date format is passed, the value will be correct", () => {
    let props: FullImageCardProps = { ...fullImageArgs };
    props.subtitle = "06/13/2023";
    delete props.dateFormat;
    let expectedDate = getValuesFromDateFormat( props.subtitle, "MM/DD/YY" );
    const { getByTestId } = render( <DXFullImageCard {...props} /> );
    let date = getByTestId( "full-image-card-date" ) as HTMLElement;
    expect( date.textContent ).toEqual( `${getFullMonth( expectedDate.month )} ${expectedDate.day}, ${expectedDate.year}` );
} );

test( "If the format passed is invalid, the date will have the unformatted text", () => {
    let props = {
        ...fullImageArgs,
        dateFormat: "MonDD/YY"
    };
    const { getByTestId } = render( <DXFullImageCard {...props} /> );
    let date = getByTestId( "full-image-card-date" ) as HTMLImageElement;
    expect( date.textContent ).toContain( props.subtitle );
} );

test( "If the date format is valid, the value will be correct", () => {
    let expectedDate = getValuesFromDateFormat( fullImageArgs.subtitle, fullImageArgs.dateFormat );
    const { getByTestId } = render( <DXFullImageCard {...fullImageArgs} /> );
    let date = getByTestId( "full-image-card-date" ) as HTMLImageElement;
    expect( date.textContent ).toEqual( `${getFullMonth( expectedDate.month )} ${expectedDate.day}, ${expectedDate.year}` );
} );

