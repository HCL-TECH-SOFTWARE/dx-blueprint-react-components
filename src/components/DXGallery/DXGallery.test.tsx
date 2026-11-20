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
import { render, fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXGallery from "./DXGallery";
import { galleryChangedIconArgs, imagesArgs } from "./DXGallery.stories";
test( "if the user does not pass the innerInfo prop, the parent of the element 'gallery-info' should be 'dxGallery'", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs,
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const info = getByTestId( "gallery-info" );
    expect( info.parentNode ).toHaveClass( "dxGallery" );
} );
test( "if the user does not pass the innerInfo prop, the parent of the element 'gallery-description' should be 'dxGallery'", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs,
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const info = getByTestId( "gallery-description" );
    expect( info.parentNode ).toHaveClass( "dxGallery" );
} );
test( "if the user passes the innerInfo prop as false, the parent of the element 'gallery-info' should be 'dxGallery'", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs,
        innerInfo: false
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const info = getByTestId( "gallery-info" );
    expect( info.parentNode ).toHaveClass( "dxGallery" );
} );
test( "if the user passes the innerInfo prop as false, the parent of the element 'gallery-description' should be 'dxGallery'", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs,
        innerInfo: false
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const info = getByTestId( "gallery-description" );
    expect( info.parentNode ).toHaveClass( "dxGallery" );
} );
test( "if the user passes the innerInfo prop as true, the parent of the element 'gallery-info' should be 'dxGallery__container'", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs,
        innerInfo: true
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const info = getByTestId( "gallery-info" );
    expect( info.parentNode ).toHaveClass( "dxGallery__container" );
} );
test( "if the user passes the innerInfo prop as true, the parent of the element 'gallery-description' should be 'dxGallery__bottom'", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs,
        innerInfo: true
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const info = getByTestId( "gallery-description" );
    expect( info.parentNode ).toHaveClass( "dxGallery__bottom" );
} );
test( "if the user does not pass the innerInfo prop, the 'gallery-bottom' element will have style of top: 95%", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const bottom = getByTestId( "gallery-bottom" );
    expect( bottom ).toHaveStyle( { top: "95%" } );
} );
test( "if the user passes the innerInfo prop as false, the 'gallery-bottom' element will have style of top: 95%", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs,
        innerInfo: false
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const bottom = getByTestId( "gallery-bottom" );
    expect( bottom ).toHaveStyle( { top: "95%" } );
} );
test( "if the user passes the innerInfo prop as true, the 'gallery-bottom' element will have style of top: 78%", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs,
        innerInfo: true
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const bottom = getByTestId( "gallery-bottom" );
    expect( bottom ).toHaveStyle( { top: "78%" } );
} );
test( "if the user does not pass hideInfo prop, the gallery-date element will be in the document", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const date = getByTestId( "gallery-date" );
    expect( date ).toBeInTheDocument();
} );
test( "if the user does not pass hideInfo prop, the gallery-title element will be in the document", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const title = getByTestId( "gallery-title" );
    expect( title ).toBeInTheDocument();
} );
test( "if the user does not pass hideInfo prop, the gallery-description element will be in the document", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const description = getByTestId( "gallery-description" );
    expect( description ).toBeInTheDocument();
} );
test( "if the user passes hideInfo prop as true, the gallery-date element will be in null", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs,
        hideInfo: true
    };
    const { container } = render( <DXGallery {...props} /> );
    const date = container.querySelector( '[data-testid="gallery-date"]' );
    expect( date ).toBeNull();
} );
test( "if the user passes hideInfo prop as true, the gallery-title element will be in null", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs,
        hideInfo: true
    };
    const { container } = render( <DXGallery {...props} /> );
    const title = container.querySelector( '[data-testid="gallery-title"]' );
    expect( title ).toBeNull();
} );
test( "if the user passes the hideInfo prop as true, the gallery-description element will be in null", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs,
        hideInfo: true
    };
    const { container } = render( <DXGallery {...props} /> );
    const description = container.querySelector( '[data-testid="gallery-description"]' );
    expect( description ).toBeNull();
} );
test( "if the user does not pass the date, and hideInfo prop, the element gallery-date will be null", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        images: imagesArgs,
    };
    const { container } = render( <DXGallery {...props} /> );
    const date = container.querySelector( '[data-testid="gallery-date"]' );
    expect( date ).toBeNull();
} );
test( "if the user passes 3 images, then three 'gallery-dot' elements will be in the document", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getAllByTestId } = render( <DXGallery {...props} /> );
    const dots = getAllByTestId( "gallery-dot" );
    expect( dots ).toHaveLength( props.images.length );
} );
test( "when the component is rendered, the first image will be displayed", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const img = getByTestId( "gallery-image" ) as HTMLImageElement;
    expect( img.src ).toEqual( props.images[0].url );
} );
test( "when the component is rendered, the first dot will have the classes 'dxGallery__dot dxGallery__dot--active'", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getAllByTestId } = render( <DXGallery {...props} /> );
    const dot = getAllByTestId( "gallery-dot" )[0];
    expect( dot ).toHaveClass( "dxGallery__dot dxGallery__dot--active" );
} );
// Click behavior tests
test( "if the user clicks on the right arrow, then the image will have the url of the second element", async () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const right = getByTestId( "gallery-right" );
    await userEvent.click( right );
    const img = getByTestId( "gallery-image" ) as HTMLImageElement;
    expect( img.src ).toEqual( props.images[1].url );
} );
test( "if the user clicks on the right arrow, then the second dot will have the classes 'dxGallery__dot dxGallery__dot--active'", async () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId, getAllByTestId } = render( <DXGallery {...props} /> );
    const right = getByTestId( "gallery-right" );
    await userEvent.click( right );
    const dot = getAllByTestId( "gallery-dot" )[1];
    expect( dot ).toHaveClass( "dxGallery__dot dxGallery__dot--active" );
} );
test( "if the user focus on the right arrow and press the Enter Key, then the image will have the url of the second element", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const right = getByTestId( "gallery-right" );
    right.focus();
    fireEvent.keyDown( right, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    const img = getByTestId( "gallery-image" ) as HTMLImageElement;
    expect( img.src ).toEqual( props.images[1].url );
} );
test( "if the user focus on the right arrow and press the Enter key, then the second dot will have the classes 'dxGallery__dot dxGallery__dot--active'", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId, getAllByTestId } = render( <DXGallery {...props} /> );
    const right = getByTestId( "gallery-right" );
    right.focus();
    fireEvent.keyDown( right, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    const dot = getAllByTestId( "gallery-dot" )[1];
    expect( dot ).toHaveClass( "dxGallery__dot dxGallery__dot--active" );
} );
test( "if the user focus on the right arrow and press the Space Key, then the image will have the url of the second element", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const right = getByTestId( "gallery-right" );
    right.focus();
    fireEvent.keyDown( right, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    const img = getByTestId( "gallery-image" ) as HTMLImageElement;
    expect( img.src ).toEqual( props.images[1].url );
} );
test( "if the user focus on the right arrow and press the Space key, then the second dot will have the classes 'dxGallery__dot dxGallery__dot--active'", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId, getAllByTestId } = render( <DXGallery {...props} /> );
    const right = getByTestId( "gallery-right" );
    right.focus();
    fireEvent.keyDown( right, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    const dot = getAllByTestId( "gallery-dot" )[1];
    expect( dot ).toHaveClass( "dxGallery__dot dxGallery__dot--active" );
} );
test( "if the user focus on the right arrow and press the Backspace key, then the second dot will not have the classes 'dxGallery__dot dxGallery__dot--active'", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId, getAllByTestId } = render( <DXGallery {...props} /> );
    const right = getByTestId( "gallery-right" );
    right.focus();
    fireEvent.keyDown( right, {
        key: "Backspace",
        code: "Backspace",
        keyCode: 8,
        charCode: 8,
    } );
    const dot = getAllByTestId( "gallery-dot" )[1];
    expect( dot ).not.toHaveClass( "dxGallery__dot dxGallery__dot--active" );
} );
test( "if the user clicks on the left arrow, then the image will have the url of the last element", async () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const right = getByTestId( "gallery-left" );
    await userEvent.click( right );
    const img = getByTestId( "gallery-image" ) as HTMLImageElement;
    expect( img.src ).toEqual( props.images[props.images.length - 1].url );
} );
test( "if the user clicks on the left arrow, then the last dot will have the classes 'dxGallery__dot dxGallery__dot--active'", async () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId, getAllByTestId } = render( <DXGallery {...props} /> );
    const right = getByTestId( "gallery-left" );
    await userEvent.click( right );
    const dot = getAllByTestId( "gallery-dot" )[props.images.length - 1];
    expect( dot ).toHaveClass( "dxGallery__dot dxGallery__dot--active" );
} );
test( "if the user focus on the left arrow and press the Enter Key, then the image will have the url of the second element", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const left = getByTestId( "gallery-left" );
    left.focus();
    fireEvent.keyDown( left, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    const img = getByTestId( "gallery-image" ) as HTMLImageElement;
    expect( img.src ).toEqual( props.images[props.images.length - 1].url );
} );
test( "if the user focus on the left arrow and press the Enter key, then the second dot will have the classes 'dxGallery__dot dxGallery__dot--active'", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId, getAllByTestId } = render( <DXGallery {...props} /> );
    const left = getByTestId( "gallery-left" );
    left.focus();
    fireEvent.keyDown( left, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    const dot = getAllByTestId( "gallery-dot" )[props.images.length - 1];
    expect( dot ).toHaveClass( "dxGallery__dot dxGallery__dot--active" );
} );
test( "if the user focus on the left arrow and press the Space Key, then the image will have the url of the second element", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId } = render( <DXGallery {...props} /> );
    const left = getByTestId( "gallery-left" );
    left.focus();
    fireEvent.keyDown( left, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    const img = getByTestId( "gallery-image" ) as HTMLImageElement;
    expect( img.src ).toEqual( props.images[props.images.length - 1].url );
} );
test( "if the user focus on the left arrow and press the Space key, then the second dot will have the classes 'dxGallery__dot dxGallery__dot--active'", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId, getAllByTestId } = render( <DXGallery {...props} /> );
    const left = getByTestId( "gallery-left" );
    left.focus();
    fireEvent.keyDown( left, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    const dot = getAllByTestId( "gallery-dot" )[props.images.length - 1];
    expect( dot ).toHaveClass( "dxGallery__dot dxGallery__dot--active" );
} );
test( "if the user focus on the left arrow and press the Backspace key, then the second dot will not have the classes 'dxGallery__dot dxGallery__dot--active'", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId, getAllByTestId } = render( <DXGallery {...props} /> );
    const left = getByTestId( "gallery-left" );
    left.focus();
    fireEvent.keyDown( left, {
        key: "Backspace",
        code: "Backspace",
        keyCode: 8,
        charCode: 8,
    } );
    const dot = getAllByTestId( "gallery-dot" )[props.images.length - 1];
    expect( dot ).not.toHaveClass( "dxGallery__dot dxGallery__dot--active" );
} );
test( "if the user clicks on the last dot, then the image will have the url of the last element", async () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getAllByTestId, getByTestId } = render( <DXGallery {...props} /> );
    const lastDot = getAllByTestId( "gallery-dot" )[props.images.length - 1];
    await userEvent.click( lastDot );
    const img = getByTestId( "gallery-image" ) as HTMLImageElement;
    expect( img.src ).toEqual( props.images[props.images.length - 1].url );
} );
test( "if the user clicks on the last dot, then the last dot will have the classes 'dxGallery__dot dxGallery__dot--active'", async () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getAllByTestId } = render( <DXGallery {...props} /> );
    const lastDot = getAllByTestId( "gallery-dot" )[props.images.length - 1];
    await userEvent.click( lastDot );
    const updatedDot = getAllByTestId( "gallery-dot" )[props.images.length - 1];
    expect( updatedDot ).toHaveClass( "dxGallery__dot dxGallery__dot--active" );
} );
test( "if the user focus the last dot and press the Enter key, then the image will have the url of the last element", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId, getAllByTestId } = render( <DXGallery {...props} /> );
    const lastDot = getAllByTestId( "gallery-dot" )[props.images.length - 1];
    lastDot.focus();
    fireEvent.keyDown( lastDot, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    const img = getByTestId( "gallery-image" ) as HTMLImageElement;
    expect( img.src ).toEqual( props.images[props.images.length - 1].url );
} );
test( "if the user focus the last dot and press the Enter key, then the last dot will have the classes 'dxGallery__dot dxGallery__dot--active'", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getAllByTestId } = render( <DXGallery {...props} /> );
    const lastDot = getAllByTestId( "gallery-dot" )[props.images.length - 1];
    lastDot.focus();
    fireEvent.keyDown( lastDot, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    const updatedDot = getAllByTestId( "gallery-dot" )[props.images.length - 1];
    expect( updatedDot ).toHaveClass( "dxGallery__dot dxGallery__dot--active" );
} );
test( "if the user focus the last dot and press the Space key, then the image will have the url of the last element", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId, getAllByTestId } = render( <DXGallery {...props} /> );
    const lastDot = getAllByTestId( "gallery-dot" )[props.images.length - 1];
    lastDot.focus();
    fireEvent.keyDown( lastDot, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    const img = getByTestId( "gallery-image" ) as HTMLImageElement;
    expect( img.src ).toEqual( props.images[props.images.length - 1].url );
} );
test( "if the user focus the last dot and press the Space key, then the last dot will have the classes 'dxGallery__dot dxGallery__dot--active'", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getAllByTestId } = render( <DXGallery {...props} /> );
    const lastDot = getAllByTestId( "gallery-dot" )[props.images.length - 1];
    lastDot.focus();
    fireEvent.keyDown( lastDot, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    const updatedDot = getAllByTestId( "gallery-dot" )[props.images.length - 1];
    expect( updatedDot ).toHaveClass( "dxGallery__dot dxGallery__dot--active" );
} );
test( "if the user focus the last dot and press the Backspace key, then the last dot will not have the classes 'dxGallery__dot dxGallery__dot--active'", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getAllByTestId } = render( <DXGallery {...props} /> );
    const lastDot = getAllByTestId( "gallery-dot" )[props.images.length - 1];
    lastDot.focus();
    fireEvent.keyDown( lastDot, {
        key: "Backspace",
        code: "Backspace",
        keyCode: 8,
        charCode: 8,
    } );
    const updatedDot = getAllByTestId( "gallery-dot" )[props.images.length - 1];
    expect( updatedDot ).not.toHaveClass( "dxGallery__dot dxGallery__dot--active" );
} );
test( "if the user clicks on the last dot, and then click on the right arrow, the image will have the url of the first element", async () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId, getAllByTestId } = render( <DXGallery {...props} /> );
    const lastDot = getAllByTestId( "gallery-dot" )[props.images.length - 1];
    await userEvent.click( lastDot );
    const right = getByTestId( "gallery-right" );
    await userEvent.click( right );
    const img = getByTestId( "gallery-image" ) as HTMLImageElement;
    expect( img.src ).toEqual( props.images[0].url );
} );
test( "if the user clicks on the last dot, and then click on the right arrow, then the first dot will have the classes 'dxGallery__dot dxGallery__dot--active'", async () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId, getAllByTestId } = render( <DXGallery {...props} /> );
    const lastDot = getAllByTestId( "gallery-dot" )[props.images.length - 1];
    await userEvent.click( lastDot );
    const right = getByTestId( "gallery-right" );
    await userEvent.click( right );
    const updatedDot = getAllByTestId( "gallery-dot" )[0];
    expect( updatedDot ).toHaveClass( "dxGallery__dot dxGallery__dot--active" );
} );
test( "if the user clicks on the last dot, and then click on the left arrow, then the second dot will have the classes 'dxGallery__dot dxGallery__dot--active'", async () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: imagesArgs
    };
    const { getByTestId, getAllByTestId } = render( <DXGallery {...props} /> );
    const lastDot = getAllByTestId( "gallery-dot" )[props.images.length - 1];
    await userEvent.click( lastDot );
    const left = getByTestId( "gallery-left" );
    await userEvent.click( left );
    const updatedDot = getAllByTestId( "gallery-dot" )[1];
    expect( updatedDot ).toHaveClass( "dxGallery__dot dxGallery__dot--active" );
} );
test( "if the user passes an empty images array, a message 'There are no images to display' will show up", () => {
    let props = {
        title: "A Beautiful Sky Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
        date: "August 15, 2022",
        images: []
    };
    const { getByText } = render( <DXGallery {...props} /> );
    const msg = getByText( "There are no images to display" );
    expect( msg ).toBeInTheDocument();
} );
test( "If slider icons change if values are set", () => {
    expect.assertions( 2 );
    render( <DXGallery {...galleryChangedIconArgs} /> );
    expect( screen.getByTestId( "gallery-right" ).querySelector( "i" ) ).toHaveClass( galleryChangedIconArgs.icons!.next! );
    expect( screen.getByTestId( "gallery-left" ).querySelector( "i" ) ).toHaveClass( galleryChangedIconArgs.icons!.prev! );
} );
test( "renders with RTL direction and correct class/attributes", () => {
    const props = {
        title: "RTL Test",
        date: "May 22, 2026",
        images: imagesArgs,
        dir: "rtl" as const
    };
    const { container, getByTestId } = render( <DXGallery {...props} /> );
    // Root element should have RTL class and dir attribute
    expect( container.firstChild ).toHaveClass( "dxGallery--rtl" );
    expect( container.firstChild ).toHaveAttribute( "dir", "rtl" );
    // Left button should be 'left arrow', right button 'right arrow' (no swap in RTL)
    expect( getByTestId( "gallery-left" ) ).toHaveAttribute( "aria-label", "left arrow" );
    expect( getByTestId( "gallery-right" ) ).toHaveAttribute( "aria-label", "right arrow" );
    // Bullets should be rendered in reverse order
    const dots = container.querySelectorAll( '.dxGallery__dot' );
    expect( dots.length ).toBe( imagesArgs.length );
} );
test( "RTL navigation: left button advances, right button goes back", () => {
    const props = {
        title: "RTL Nav",
        date: "May 22, 2026",
        images: imagesArgs,
        dir: "rtl" as const
    };
    render( <DXGallery {...props} /> );
    // Start at first image (RTL shows imagesArgs[0])
    expect( screen.getByTestId( "gallery-image" ).getAttribute( "src" ) ).toBe( imagesArgs[0].url );
    // Click left (RTL: advances to imagesArgs[1])
    fireEvent.click( screen.getByTestId( "gallery-left" ) );
    expect( screen.getByTestId( "gallery-image" ).getAttribute( "src" ) ).toBe( imagesArgs[1].url );
    // Click right (RTL: goes back to imagesArgs[0])
    fireEvent.click( screen.getByTestId( "gallery-right" ) );
    expect( screen.getByTestId( "gallery-image" ).getAttribute( "src" ) ).toBe( imagesArgs[0].url );
} );
test( "RTL bullet and image order matches visual expectation", () => {
    const props = {
        title: "RTL Bullet Order",
        images: imagesArgs,
        dir: "rtl" as const
    };
    render( <DXGallery {...props} /> );
    // First image (index 0) is shown; RTL reversed dots + row-reverse puts it on the right visually
    expect( screen.getByTestId( "gallery-image" ).getAttribute( "src" ) ).toBe( imagesArgs[0].url );
    // Dots are rendered with reversed indices [2,1,0].
    // DOM-last button has key=0 (img1) which is active at currentIndex=0
    const dots = screen.getAllByTestId( "gallery-dot" );
    expect( dots[dots.length - 1] ).toHaveClass( "dxGallery__dot dxGallery__dot--active" );
    // Click DOM-second-to-last button (key=1 = img2)
    fireEvent.click( dots[dots.length - 2] );
    expect( screen.getByTestId( "gallery-image" ).getAttribute( "src" ) ).toBe( imagesArgs[1].url );
} );
test( "explicit dir='ltr' renders without RTL class and uses standard navigation", () => {
    const props = {
        title: "LTR explicit",
        images: imagesArgs,
        dir: "ltr" as const
    };
    const { container } = render( <DXGallery {...props} /> );
    expect( container.firstChild ).not.toHaveClass( "dxGallery--rtl" );
    expect( container.firstChild ).toHaveAttribute( "dir", "ltr" );
    // Right arrow advances forward
    fireEvent.click( screen.getByTestId( "gallery-right" ) );
    expect( screen.getByTestId( "gallery-image" ).getAttribute( "src" ) ).toBe( imagesArgs[1].url );
} );
test( "RTL wrap-around: left button at last image wraps back to first", () => {
    const props = {
        title: "RTL Wrap Left",
        images: imagesArgs,
        dir: "rtl" as const
    };
    render( <DXGallery {...props} /> );
    // Navigate to the last image via left button (left = advance in RTL)
    for ( let i = 0; i < imagesArgs.length - 1; i++ ) {
        fireEvent.click( screen.getByTestId( "gallery-left" ) );
    }
    expect( screen.getByTestId( "gallery-image" ).getAttribute( "src" ) ).toBe( imagesArgs[imagesArgs.length - 1].url );
    // One more left click should wrap back to first image
    fireEvent.click( screen.getByTestId( "gallery-left" ) );
    expect( screen.getByTestId( "gallery-image" ).getAttribute( "src" ) ).toBe( imagesArgs[0].url );
} );
test( "RTL wrap-around: right button at first image wraps to last", () => {
    const props = {
        title: "RTL Wrap Right",
        images: imagesArgs,
        dir: "rtl" as const
    };
    render( <DXGallery {...props} /> );
    // Start at first image
    expect( screen.getByTestId( "gallery-image" ).getAttribute( "src" ) ).toBe( imagesArgs[0].url );
    // Click right (RTL: go backward), should wrap to last image
    fireEvent.click( screen.getByTestId( "gallery-right" ) );
    expect( screen.getByTestId( "gallery-image" ).getAttribute( "src" ) ).toBe( imagesArgs[imagesArgs.length - 1].url );
} );
test( "RTL: icon classes remain unchanged compared to LTR", () => {
    const ltrProps = { title: "LTR", images: imagesArgs };
    const { unmount, getByTestId: getLTR } = render( <DXGallery {...ltrProps} /> );
    const ltrLeftIcon = getLTR( "gallery-left" ).querySelector( "i" )?.className;
    const ltrRightIcon = getLTR( "gallery-right" ).querySelector( "i" )?.className;
    unmount();
    const rtlProps = { title: "RTL", images: imagesArgs, dir: "rtl" as const };
    const { getByTestId: getRTL } = render( <DXGallery {...rtlProps} /> );
    expect( getRTL( "gallery-left" ).querySelector( "i" )?.className ).toBe( ltrLeftIcon );
    expect( getRTL( "gallery-right" ).querySelector( "i" )?.className ).toBe( ltrRightIcon );
} );
test( "auto-detects RTL from ancestor element computed direction (no dir prop)", () => {
    // Simulate a portal wrapper div with direction: rtl (inline style).
    // In JSDOM, getComputedStyle honours inline styles, so containerRef's
    // parentElement will have direction 'rtl' — exercises the readDir / getPageDir path.
    const props = { title: "Auto RTL", images: imagesArgs };
    const { container } = render(
        <div style={{ direction: "rtl" }}>
            <DXGallery {...props} />
        </div>
    );
    // The DXGallery root is the grandchild of the render container
    const galleryRoot = container.querySelector( ".dxGallery" ) as HTMLElement;
    expect( galleryRoot ).toHaveClass( "dxGallery--rtl" );
    expect( galleryRoot ).toHaveAttribute( "dir", "rtl" );
    // RTL navigation: left button advances to next image
    fireEvent.click( screen.getByTestId( "gallery-left" ) );
    expect( screen.getByTestId( "gallery-image" ).getAttribute( "src" ) ).toBe( imagesArgs[1].url );
} );
describe( "DXGallery Hardening", () => {
    const sniperImages = [
        { url: "http://hcl.local/zero.jpg", description: "Zero" },
        { url: "http://hcl.local/one.jpg", description: "One" },
        { url: "http://hcl.local/two.jpg", description: "Two" }
    ];
    const baseSniperProps = {
        title: "Sniper Gallery",
        images: sniperImages
    };
    beforeEach( () => {
        jest.clearAllMocks();
    } );
    test( "Strictly bounds navigation state mutations to precise Enter (13) and Space (32) keyCodes", async () => {
        const { container } = render( <DXGallery {...baseSniperProps} /> );
        const rightBtn = screen.getByTestId( "gallery-right" );
        const img = screen.getByTestId( "gallery-image" ) as HTMLImageElement;
        // Verify baseline
        expect( img.src ).toStrictEqual( "http://hcl.local/zero.jpg" );
        // Mathematical Boundary - 1: keyCode 14 (Mutant trap: e.keyCode >= 13)
        await act( async () => {
            fireEvent.keyDown( rightBtn, { key: "Enter", keyCode: 14 } );
        } );
        expect( img.src ).toStrictEqual( "http://hcl.local/zero.jpg" );
        // Mathematical Boundary + 1: keyCode 31 (Mutant trap: e.keyCode <= 32)
        await act( async () => {
            fireEvent.keyDown( rightBtn, { key: "Space", keyCode: 31 } );
        } );
        expect( img.src ).toStrictEqual( "http://hcl.local/zero.jpg" );
        // Exact match execution
        await act( async () => {
            fireEvent.keyDown( rightBtn, { key: "Space", keyCode: 32 } );
        } );
        expect( img.src ).toStrictEqual( "http://hcl.local/one.jpg" );
    } );
    test( "Strictly tracks MutationObserver attachment, attribute filtering, and disconnect lifecycle", async () => {
        let observerCallback: MutationCallback | null = null;
        const observeSpy = jest.fn();
        const disconnectSpy = jest.fn();
        // Intercept global MutationObserver to capture the internal callback and lifecycles
        const originalMutationObserver = global.MutationObserver;
        global.MutationObserver = class {
            constructor( callback: MutationCallback ) { observerCallback = callback; }
            observe = observeSpy;
            disconnect = disconnectSpy;
            takeRecords = () => [];
        } as unknown as typeof MutationObserver;
        const { container, unmount } = render( <DXGallery {...baseSniperProps} /> );
        // Verify attachment to both documentElement and body with specific attribute filters
        expect( observeSpy ).toHaveBeenCalledWith( document.documentElement, { attributes: true, attributeFilter: ['dir'] } );
        expect( observeSpy ).toHaveBeenCalledWith( document.body, { attributes: true, attributeFilter: ['dir'] } );
        // DXGallery reads the computed style of its parentElement. We must intercept getComputedStyle
        // to strictly force the React Testing Library wrapper div to return 'rtl'
        const originalGetComputedStyle = window.getComputedStyle;
        window.getComputedStyle = jest.fn().mockImplementation( ( elt ) => {
            if ( elt === container ) {
                return { direction: 'rtl' } as CSSStyleDeclaration;
            }
            return originalGetComputedStyle( elt );
        } );
        await act( async () => {
            if ( observerCallback ) {
                // Manually trigger the trapped observer callback
                observerCallback( [], this as unknown as MutationObserver );
            }
        } );
        // The gallery should have strictly appended the RTL class based on the observer update
        expect( container.firstChild ).toHaveClass( "dxGallery--rtl" );
        // Cleanup and strict lifecycle garbage collection assertion
        unmount();
        expect( disconnectSpy ).toHaveBeenCalledTimes( 1 );
        // Restore globals to prevent test bleeding
        global.MutationObserver = originalMutationObserver;
        window.getComputedStyle = originalGetComputedStyle;
    } );
    test( "Strictly executes mathematical boundaries for array mapping and reversal in RTL mode", () => {
        // Targets the calculation: `props.images.length - 1 - i`
        const { container } = render( <DXGallery {...baseSniperProps} dir="rtl" /> );
        const dots = container.querySelectorAll( ".dxGallery__dot" );
        // With 3 images, the RTL indices should strictly map to 2, 1, 0 sequentially in the DOM
        expect( dots[0].getAttribute( "aria-label" ) ).toStrictEqual( "Image 3 of 3" );
        expect( dots[1].getAttribute( "aria-label" ) ).toStrictEqual( "Image 2 of 3" );
        expect( dots[2].getAttribute( "aria-label" ) ).toStrictEqual( "Image 1 of 3" );
    } );
    test( "Strictly handles single-image array mathematical boundaries to prevent out-of-bounds loops", async () => {
        const singleImageProps = { ...baseSniperProps, images: [{ url: "http://hcl.local/solo.jpg", description: "Solo" }] };
        render( <DXGallery {...singleImageProps} /> );
        const rightBtn = screen.getByTestId( "gallery-right" );
        const leftBtn = screen.getByTestId( "gallery-left" );
        const img = screen.getByTestId( "gallery-image" ) as HTMLImageElement;
        // Navigating next on a single image evaluates `currentIndex === props.images.length - 1` (0 === 0)
        await act( async () => {
            await userEvent.click( rightBtn );
        } );
        expect( img.src ).toStrictEqual( "http://hcl.local/solo.jpg" );
        // Navigating previous on a single image evaluates `currentIndex === 0` (0 === 0)
        await act( async () => {
            await userEvent.click( leftBtn );
        } );
        expect( img.src ).toStrictEqual( "http://hcl.local/solo.jpg" );
    } );
    test( "Strictly halts description rendering crash trap when images array is empty", () => {
        // Passing an empty array respects the dotIndices .length evaluation 
        // while strictly targeting the > 0 boundary mutant in the JSX
        const emptyProps = { ...baseSniperProps, images: [] };
        const { container } = render( <DXGallery {...emptyProps} innerInfo={false} hideInfo={false} /> );
        // Assert fallback string is strictly injected
        expect( screen.getByText( "There are no images to display" ) ).toBeInTheDocument();
        // The bottom-most renderDescription block must not trigger or crash on `props.images[currentIndex]`
        const descriptionContainers = container.querySelectorAll( ".dxGallery__description" );
        expect( descriptionContainers.length ).toStrictEqual( 0 );
    } );
} );

itSupportsExtensionProps( ( extra ) => <DXGallery title="A Beautiful Sky" date="August 15, 2022" images={imagesArgs} {...extra} /> );
