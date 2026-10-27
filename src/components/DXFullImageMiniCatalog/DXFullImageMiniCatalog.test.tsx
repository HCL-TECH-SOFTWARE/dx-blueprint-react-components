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
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXFullImageMiniCatalog from "./DXFullImageMiniCatalog";
import { itemsArgs, sliderItemsArgs } from "./DXFullImageMiniCatalog.stories";

test( "If the user does not pass any items, a message 'No items received' will show", () => {
    let props = {
        index: 1,
        items: []
    };
    const { getByText } = render( <DXFullImageMiniCatalog {...props} /> );
    const msg = getByText( "No items received" );
    expect( msg ).toBeInTheDocument();
} );

test( "If the item's length is less than 4, the element 'full-img-mini-grid' should be in the document", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );

    let props = {
        index: 1,
        items: itemsArgs
    };
    const { getByTestId } = render( <DXFullImageMiniCatalog {...props} /> );
    const grid = getByTestId( "full-img-mini-grid" );
    expect( grid ).toBeInTheDocument();
} );

test( "If the item's length is 4, the elements should have the class 'col-md-3'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );

    let props = {
        index: 1,
        items: itemsArgs
    };
    const { getAllByTestId } = render( <DXFullImageMiniCatalog {...props} /> );
    const col = getAllByTestId( "full-img-mini-col" )[0];
    expect( col ).toHaveClass( "col-md-3" );
} );

test( "If the item's length is 3, the elements should have the class 'col-md-4'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );

    let props = {
        index: 1,
        items: itemsArgs.slice( 0, 3 )
    };
    const { getAllByTestId } = render( <DXFullImageMiniCatalog {...props} /> );
    const col = getAllByTestId( "full-img-mini-col" )[0];
    expect( col ).toHaveClass( "col-md-4" );
} );

test( "If the item's length is 2, the elements should have the class 'col-md-6'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );

    let props = {
        index: 1,
        items: itemsArgs.slice( 0, 2 )
    };
    const { getAllByTestId } = render( <DXFullImageMiniCatalog {...props} /> );
    const col = getAllByTestId( "full-img-mini-col" )[0];
    expect( col ).toHaveClass( "col-md-6" );
} );

test( "If the item's length is 1, the elements should have the class 'col-md-12'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );

    let props = {
        index: 1,
        items: itemsArgs.slice( 0, 1 )
    };
    const { getAllByTestId } = render( <DXFullImageMiniCatalog {...props} /> );
    const col = getAllByTestId( "full-img-mini-col" )[0];
    expect( col ).toHaveClass( "col-md-12" );
} );

test( "If the item's length is smaller than 4 and the viewport is mobile the element 'dxFullImgMiniC__slider' should be in the document", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 360; }
        }
    } );

    let props = {
        index: 1,
        items: itemsArgs.slice( 0, 3 )
    };
    const { container } = render( <DXFullImageMiniCatalog {...props} /> );
    const slider = container.querySelector( '.dxFullImgMiniC__slider' );
    expect( slider ).toBeInTheDocument();
} );

test( "If the item's length is larger than 4, the element 'dxFullImgMiniC__slider' should be in the document", () => {
    let props = {
        index: 1,
        items: sliderItemsArgs
    };
    const { container } = render( <DXFullImageMiniCatalog {...props} /> );
    const slider = container.querySelector( '.dxFullImgMiniC__slider' );
    expect( slider ).toBeInTheDocument();
} );

// Slider behavior
test( "When the component loads, the previous button from the slider should have the class 'dxFullImgMiniC__navBtn--display-hide'", () => {
    let props = {
        index: 1,
        items: sliderItemsArgs
    };
    const { container } = render( <DXFullImageMiniCatalog {...props} /> );
    const prevBtn = container.querySelector( '.dxFullImgMiniC__navBtn--direction-prev' )?.classList;
    expect( prevBtn?.contains( "dxFullImgMiniC__navBtn--display-hide" ) ).toBeTruthy();
} );

test( "When the user clicks on the next button, the prev button should not have the class 'dxFullImgMiniC__navBtn--display-hide'", async () => {
    let props = {
        index: 1,
        items: sliderItemsArgs
    };
    const { getByTestId } = render( <DXFullImageMiniCatalog {...props} /> );
    const nextBtn = getByTestId( 'slider-next-button' );
    await userEvent.click( nextBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    const prevBtn = getByTestId( 'slider-prev-button' );
    expect( prevBtn?.classList.contains( "dxFullImgMiniC__navBtn--display-hide" ) ).toBeFalsy();
} );

test( "When the user clicks on the next button, the next button should have the class 'dxFullImgMiniC__navBtn--display-hide'", async () => {
    let props = {
        index: 1,
        items: sliderItemsArgs
    };
    const { getByTestId } = render( <DXFullImageMiniCatalog {...props} /> );
    const nextBtn = getByTestId( 'slider-next-button' );
    await userEvent.click( nextBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    const checkNextBtn = getByTestId( 'slider-next-button' );
    expect( checkNextBtn?.classList.contains( "dxFullImgMiniC__navBtn--display-hide" ) ).toBeTruthy();
} );

test( "When the user clicks on the next button, and is in the middle of the catalog the next button should not have the class 'dxFullImgMiniC__navBtn--display-hide'", async () => {
    let props = {
        index: 1,
        items: [...sliderItemsArgs, ...itemsArgs]
    };
    const { getByTestId } = render( <DXFullImageMiniCatalog {...props} /> );
    const nextBtn = getByTestId( 'slider-next-button' );
    await userEvent.click( nextBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    const checkNextBtn = getByTestId( 'slider-next-button' );
    expect( checkNextBtn?.classList.contains( "dxFullImgMiniC__navBtn--display-hide" ) ).toBeFalsy();
} );

test( "When the user clicks on the next button and the prev button returning to the beginning of the catalog, the prev button should have the class 'dxFullImgMiniC__navBtn--display-hide'", async () => {
    let props = {
        index: 1,
        items: sliderItemsArgs
    };
    const { getByTestId } = render( <DXFullImageMiniCatalog {...props} /> );
    const nextBtn = getByTestId( 'slider-next-button' );
    const prevBtn = getByTestId( 'slider-prev-button' );
    await userEvent.click( nextBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    await userEvent.click( prevBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    expect( prevBtn?.classList.contains( "dxFullImgMiniC__navBtn--display-hide" ) ).toBeTruthy();
} );

// Test for multiple components on the same page
test( "If we have the same two components, if the user clicks on the next nav button, the prev one on the second component will have the class 'dxMiniCatalog__navBtn--display-hide'", async () => {
    let props1 = {
        index: 1,
        items: sliderItemsArgs
    };
    let props2 = {
        index: 2,
        items: sliderItemsArgs
    };
    const { container } = render( <div><DXFullImageMiniCatalog {...props1} /> <DXFullImageMiniCatalog {...props2} /> </div> );
    const nextBtn1 = container.querySelector( `#dxFullImgMiniC-${props1.index} .dxFullImgMiniC__navBtn--direction-next` ) as HTMLElement;
    await userEvent.click( nextBtn1 );
    await new Promise( r => setTimeout( r, 700 ) );
    const prevBtn2 = container.querySelector( `#dxFullImgMiniC-${props2.index} .dxFullImgMiniC__navBtn--direction-prev` );
    expect( prevBtn2 ).toHaveClass( "dxFullImgMiniC__navBtn--display-hide" );
} );

test( "If we have the same two components, if the user clicks on the next nav button, the next one on the second component will not have the class 'dxMiniCatalog__navBtn--display-hide'", async () => {
    let props1 = {
        index: 1,
        items: sliderItemsArgs
    };
    let props2 = {
        index: 2,
        items: sliderItemsArgs
    };
    const { container } = render( <div><DXFullImageMiniCatalog {...props1} /> <DXFullImageMiniCatalog {...props2} /> </div> );
    const nextBtn1 = container.querySelector( `#dxFullImgMiniC-${props1.index} .dxFullImgMiniC__navBtn--direction-next` ) as HTMLElement;
    await userEvent.click( nextBtn1 );
    await new Promise( r => setTimeout( r, 700 ) );
    const prevBtn2 = container.querySelector( `#dxFullImgMiniC-${props2.index} .dxFullImgMiniC__navBtn--direction-next` );
    expect( prevBtn2 ).not.toHaveClass( "dxFullImgMiniC__navBtn--display-hide" );
} );

test( "Slider icons change", () => {
    let props = {
        index: 7,
        items: sliderItemsArgs,
        icons: {
            prev: "ci-Arrow_Left_MD",
            next: "ci-Arrow_Right_MD"
        }
    };
    expect.assertions( 2 );
    render( <DXFullImageMiniCatalog {...props} /> );

    expect( screen.getByTestId( "slider-next-button" ).querySelector( "i" ) ).toHaveClass( props.icons?.next! );
    expect( screen.getByTestId( "slider-prev-button" ).querySelector( "i" ) ).toHaveClass( props.icons?.prev! );
} );
