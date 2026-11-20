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
import { itSupportsExtensionProps } from "../../testUtils/extensionContract";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import DXCarousel from "./DXCarousel";
import { itemsArgs, itemModifiedArgs } from "./DXCarousel.stories";

test( "If you passed more than 3 items, a message 'You cannot have more than 3 items on the carousel' will show", () => {
    let newItems = [...itemsArgs];
    newItems.push(
        {
            image: {
                url: "https://images.unsplash.com/photo-1659380139642-690af1567639?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1828&q=80",
                altText: "card-2"
            },
            title: "The title 3 goes here and it is recommended to be 2 line max",
            subtitle: "Subtitle 2 goes here",
            body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium nam molestias animi inventore repudiandae. Doloremque aperiam maiores blanditiis ipsam earum!",
            button: {
                label: "Learn Deeper",
                onClick: () => {}
            }
        }
    );
    newItems.push(
        {
            image: {
                url: "https://images.unsplash.com/photo-1659380139642-690af1567639?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1828&q=80",
                altText: "card-2"
            },
            title: "The title 4 goes here and it is recommended to be 2 line max",
            subtitle: "Subtitle 2 goes here",
            body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium nam molestias animi inventore repudiandae. Doloremque aperiam maiores blanditiis ipsam earum!",
            button: {
                label: "Learn Deeper",
                onClick: () => {}
            }
        }
    );
    const carouselProps = {
        items: newItems,
        size: "small" as "small"
    };
    const { getByText } = render( <DXCarousel {...carouselProps} /> );
    expect( getByText( "You cannot have more than 3 items on the carousel" ) ).toBeInTheDocument();
} );

test( "if an invalid size is passed, the image should have 12 columns", () => {
    const carouselProps = {
        items: itemsArgs,
        size: "mobile"
    };
    // @ts-ignore: Invalid size required by test
    const { getByTestId } = render( <DXCarousel {...carouselProps} /> );
    const image = getByTestId( "carousel-image" );
    expect( image ).toHaveClass( "col-md-12" );
} );

test( "if an invalid size is passed, the content should have 12 columns", () => {
    const carouselProps = {
        items: itemsArgs,
        size: "mobile"
    };
    // @ts-ignore: Invalid size required by test
    const { getByTestId } = render( <DXCarousel {...carouselProps} /> );
    const content = getByTestId( "carousel-content" );
    expect( content ).toHaveClass( "col-md-12" );
} );

test( "if 'big' size is passed, the image should have 8 columns", () => {
    const carouselProps = {
        items: itemsArgs,
        size: "big" as "big"
    };
    const { getByTestId } = render( <DXCarousel {...carouselProps} /> );
    const image = getByTestId( "carousel-image" );
    expect( image ).toHaveClass( "col-md-8" );
} );

test( "if 'big' size is passed, the content should have 4 columns", () => {
    const carouselProps = {
        items: itemsArgs,
        size: "big" as "big"
    };
    const { getByTestId } = render( <DXCarousel {...carouselProps} /> );
    const content = getByTestId( "carousel-content" );
    expect( content ).toHaveClass( "col-md-4" );
} );

test( "if 'medium' size is passed, the image should have 6 columns", () => {
    const carouselProps = {
        items: itemsArgs,
        size: "medium" as "medium"
    };
    const { getByTestId } = render( <DXCarousel {...carouselProps} /> );
    const image = getByTestId( "carousel-image" );
    expect( image ).toHaveClass( "col-md-6" );
} );

test( "if 'medium' size is passed, the content should have 6 columns", () => {
    const carouselProps = {
        items: itemsArgs,
        size: "medium" as "medium"
    };
    const { getByTestId } = render( <DXCarousel {...carouselProps} /> );
    const content = getByTestId( "carousel-content" );
    expect( content ).toHaveClass( "col-md-6" );
} );

test( "if 'small' size is passed, the image should have 4 columns", () => {
    const carouselProps = {
        items: itemsArgs,
        size: "small" as "small"
    };
    const { getByTestId } = render( <DXCarousel {...carouselProps} /> );
    const image = getByTestId( "carousel-image" );
    expect( image ).toHaveClass( "col-md-4" );
} );

test( "if 'small' size is passed, the content should have 8 columns", () => {
    const carouselProps = {
        items: itemsArgs,
        size: "small" as "small"
    };
    const { getByTestId } = render( <DXCarousel {...carouselProps} /> );
    const content = getByTestId( "carousel-content" );
    expect( content ).toHaveClass( "col-md-8" );
} );

test( "if you clicked on the second indicator, the showed item should change", async () => {
    const carouselProps = {
        items: itemsArgs,
        size: "small" as "small"
    };
    const { getAllByTestId, getByTestId } = render( <DXCarousel {...carouselProps} /> );
    const indicators = getAllByTestId( "carousel-indicator" );
    const notActiveIndicator = indicators.find( indicator => indicator.classList.contains( "dxCarousel__indicator" ) ) || new HTMLElement();
    await userEvent.click( notActiveIndicator );
    const title = getByTestId( "carousel-item-title" );
    expect( title.textContent ).toEqual( itemsArgs[1].title );
} );

test( "If the button is clicked, it should be triggered", async () => {
    const mockFunction = jest.fn();
    const carouselProps = {
        items: [{
            image: {
                url: "https://images.unsplash.com/photo-1660113567510-1fb1d59a5d33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
                altText: "card-1"
            },
            title: "The title goes here and it is recommended to be 2 line max",
            subtitle: "Subtitle goes here",
            body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium nam molestias animi inventore repudiandae. Doloremque aperiam maiores blanditiis ipsam earum!",
            button: {
                label: "Learn more",
                onClick: mockFunction
            }
        }],
        size: "small" as "small"
    };
    const { getByTestId } = render( <DXCarousel {...carouselProps} /> );
    const button = getByTestId( "carousel-button" );
    await userEvent.click( button );
    expect( mockFunction ).toBeCalled();
} );

test( "if the body is more than 120 characters, the class 'overflow-body' should be added", () => {
    const carouselProps = {
        items: itemModifiedArgs,
        size: "medium" as "medium"
    };
    const { container } = render( <DXCarousel {...carouselProps} /> );
    const body = container.querySelector( ".dxCarousel__content p" );
    expect( body ).toHaveClass( "overflow-body" );
} );


test( "if the body is more than 120 characters, the class 'overflow-body' should be added", () => {
    const carouselProps = {
        items: itemsArgs,
        size: "medium" as "medium"
    };
    const { container } = render( <DXCarousel {...carouselProps} /> );
    const body = container.querySelector( ".dxCarousel__content p" );
    expect( body ).not.toHaveClass( "overflow-body" );
} );


test( "if no items are added, the DXEmpty view should be rendered", () => {
    const carouselProps = {
        items: [],
        size: "medium" as "medium"
    };
    const { container } = render( <DXCarousel {...carouselProps} /> );
    const body = container.querySelector( ".dxEmptyState" );
    expect( body ).toBeInTheDocument();
} );

itSupportsExtensionProps( ( extra ) => <DXCarousel items={itemsArgs} size="medium" {...extra} /> );
