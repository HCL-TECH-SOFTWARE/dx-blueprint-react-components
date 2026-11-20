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
import { render, fireEvent, screen } from "@testing-library/react";
import DXDownloadCard from "./DXDownloadCard";
import userEvent from "@testing-library/user-event";
import { downloadArgs } from "./DXDownloadCard.stories";

test( "If the user does pass the size prop, that will be in the document", () => {
    let props = {
        ...downloadArgs,
        size: "300KB"
    };
    const { container } = render( <DXDownloadCard {...props} /> );
    const size = container.querySelector( '[data-testid="dc-file-size"]' );
    expect( size ).toBeInTheDocument();
} );

test( "If the user does not pass the size prop, that will be null", () => {
    const { container } = render( <DXDownloadCard {...downloadArgs} /> );
    const size = container.querySelector( '[data-testid="dc-file-size"]' );
    expect( size ).toBeNull();
} );

test( "If the user pass a url with a file name and no custom file name, it should be rendered with the url file name", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.posgrado.unam.mx/filosofiadelaciencia/sitioviejo/docum/guia_digit_conacyt.pdf",
    };
    const { container } = render( <DXDownloadCard {...props} /> );
    const fileName = container.querySelector( '.dxDownloadCard__name' )?.childNodes[0] as HTMLElement;
    expect( fileName.textContent ).toEqual( "guia_digit_conacyt" );
} );

test( "If the user pass a url with a file name on the middle and no custom file name, it should be rendered with the url file name", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/wps/wcm/connect/2373e5c7-3b3d-4ff4-8957-b72d8ecb8bbf/us-state-government.pdf?MOD=AJPERES&CONVERT_TO=url",
    };
    const { container } = render( <DXDownloadCard {...props} /> );
    const fileName = container.querySelector( '.dxDownloadCard__name' )?.childNodes[0] as HTMLElement;
    expect( fileName.textContent ).toEqual( "us-state-government" );
} );

test( "If the user pass a relative path with a file name, it should be rendered", () => {
    let props = {
        ...downloadArgs,
        url: "/filosofiadelaciencia/sitioviejo/docum/guia_digit_conacyt.pdf",
    };
    const { container } = render( <DXDownloadCard {...props} /> );
    const fileName = container.querySelector( '.dxDownloadCard__name' )?.childNodes[0] as HTMLElement;
    expect( fileName.textContent ).toEqual( "guia_digit_conacyt" );
} );

test( "If the user pass a relative path with a file name on the middle, it should be rendered", () => {
    let props = {
        ...downloadArgs,
        url: "/documents/42860/55905/test.docx/f4d56f38-f50b-9579-5f64-4de74f7e192d?t=1674844635364",
    };
    const { container } = render( <DXDownloadCard {...props} /> );
    const fileName = container.querySelector( '.dxDownloadCard__name' )?.childNodes[0] as HTMLElement;
    expect( fileName.textContent ).toEqual( "test" );
} );

test( "If the user pass a url with no file name, a console warning will be called", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.posgrado.unam.mx/filosofiadelaciencia/sitioviejo/docum"
    };
    const warn = jest.spyOn( console, "warn" );
    render( <DXDownloadCard {...props} /> );
    expect( warn ).toHaveBeenCalledWith( "URL does not contain a file name: " + props.url );
    warn.mockRestore();
} );

test( "If the user pass a url with no file name, a 'no name' will be showed", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.posgrado.unam.mx/filosofiadelaciencia/sitioviejo/docum"
    };
    const { container } = render( <DXDownloadCard {...props} /> );
    const fileName = container.querySelector( ".dxDownloadCard__name" )?.childNodes[0] as HTMLElement;
    expect( fileName.textContent ).toEqual( "no name" );
} );

test( "If the url contains a pdf file, the icon showed will be 'ci-File_Download'", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/wps/wcm/connect/94571e2f-d042-4e0a-a43c-b70af2f31976/3m-story.pdf?MOD=AJPERES&CONVERT_TO=url",
    };
    const { getByTestId } = render( <DXDownloadCard {...props} /> );
    const icon = getByTestId( 'dc-file-icon' );
    expect( icon ).toHaveClass( "ci-File_Download" );
} );

test( "If the url contains a png file, the icon showed will be 'ci-File_Download'", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/documents/42860/55905/test.png/f4d56f38-f50b-9579-5f64-4de74f7e192d?t=1674844635364",
    };
    const { getByTestId } = render( <DXDownloadCard {...props} /> );
    const icon = getByTestId( 'dc-file-icon' );
    expect( icon ).toHaveClass( "ci-File_Download" );
} );

test( "If the url contains a jpg file, the icon showed will be 'ci-File_Download'", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/documents/42860/55905/test.jpg/f4d56f38-f50b-9579-5f64-4de74f7e192d?t=1674844635364",
    };
    const { getByTestId } = render( <DXDownloadCard {...props} /> );
    const icon = getByTestId( 'dc-file-icon' );
    expect( icon ).toHaveClass( "ci-File_Download" );
} );

test( "If the url contains a svg file, the icon showed will be 'ci-File_Download'", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/wps/wcm/connect/a185b95a-12cc-4252-9140-2b0ba40af651/hcl-software-logo.svg?MOD=AJPERES",
    };
    const { getByTestId } = render( <DXDownloadCard {...props} /> );
    const icon = getByTestId( 'dc-file-icon' );
    expect( icon ).toHaveClass( "ci-File_Download" );
} );

test( "If the url contains a html file, the icon showed will be 'ci-File_Download'", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/documents/42860/55905/test.html/f4d56f38-f50b-9579-5f64-4de74f7e192d?t=1674844635364",
    };
    const { getByTestId } = render( <DXDownloadCard {...props} /> );
    const icon = getByTestId( 'dc-file-icon' );
    expect( icon ).toHaveClass( "ci-File_Download" );
} );

test( "If the url contains a js file, the icon showed will be 'ci-File_Download'", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/documents/42860/55905/test.js/f4d56f38-f50b-9579-5f64-4de74f7e192d?t=1674844635364",
    };
    const { getByTestId } = render( <DXDownloadCard {...props} /> );
    const icon = getByTestId( 'dc-file-icon' );
    expect( icon ).toHaveClass( "ci-File_Download" );
} );

test( "If the url contains a css file, the icon showed will be 'ci-File_Download'", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/documents/42860/55905/test.css/f4d56f38-f50b-9579-5f64-4de74f7e192d?t=1674844635364",
    };
    const { getByTestId } = render( <DXDownloadCard {...props} /> );
    const icon = getByTestId( 'dc-file-icon' );
    expect( icon ).toHaveClass( "ci-File_Download" );
} );

test( "If the url contains a zip file, the icon showed will be 'bi-file-zip'", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/documents/42860/55905/test.zip/f4d56f38-f50b-9579-5f64-4de74f7e192d?t=1674844635364",
    };
    const { getByTestId } = render( <DXDownloadCard {...props} /> );
    const icon = getByTestId( 'dc-file-icon' );
    expect( icon ).toHaveClass( "bi-file-zip" );
} );

test( "If the url contains a rar file, the icon showed will be 'bi-file-zip'", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/documents/42860/55905/test.rar/f4d56f38-f50b-9579-5f64-4de74f7e192d?t=1674844635364",
    };
    const { getByTestId } = render( <DXDownloadCard {...props} /> );
    const icon = getByTestId( 'dc-file-icon' );
    expect( icon ).toHaveClass( "bi-file-zip" );
} );

test( "If the url contains an unsupported file extension, the icon showed will be 'bi-file-earmark'", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/documents/42860/55905/test.webp/f4d56f38-f50b-9579-5f64-4de74f7e192d?t=1674844635364",
    };
    const { getByTestId } = render( <DXDownloadCard {...props} /> );
    const icon = getByTestId( 'dc-file-icon' );
    expect( icon ).toHaveClass( "bi-file-earmark" );
} );

test( "If the url contains a doc file, the icon showed will be 'bi-file-word'", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/documents/42860/55905/test.doc/f4d56f38-f50b-9579-5f64-4de74f7e192d?t=1674844635364",
    };
    const { getByTestId } = render( <DXDownloadCard {...props} /> );
    const icon = getByTestId( 'dc-file-icon' );
    expect( icon ).toHaveClass( "bi-file-word" );
} );

test( "If the url contains a docx file, the icon showed will be 'bi-file-word'", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/wps/wcm/connect/2373e5c7-3b3d-4ff4-8957-b72d8ecb8bbf/us-state-government.docx?MOD=AJPERES&CONVERT_TO=url",
    };
    const { getByTestId } = render( <DXDownloadCard {...props} /> );
    const icon = getByTestId( 'dc-file-icon' );
    expect( icon ).toHaveClass( "bi-file-word" );
} );

test( "If the url contains a ppt file, the icon showed will be 'bi-file-powerpoint'", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/documents/42860/55905/test.ppt/f4d56f38-f50b-9579-5f64-4de74f7e192d?t=1674844635364",
    };
    const { getByTestId } = render( <DXDownloadCard {...props} /> );
    const icon = getByTestId( 'dc-file-icon' );
    expect( icon ).toHaveClass( "bi-file-powerpoint" );
} );

test( "If the url contains a pptx file, the icon showed will be 'bi-file-powerpoint'", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/documents/42860/55905/test.pptx/f4d56f38-f50b-9579-5f64-4de74f7e192d?t=1674844635364",
    };
    const { getByTestId } = render( <DXDownloadCard {...props} /> );
    const icon = getByTestId( 'dc-file-icon' );
    expect( icon ).toHaveClass( "bi-file-powerpoint" );
} );

test( "If the url contains a xls file, the icon showed will be 'bi-file-excel'", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/documents/42860/55905/test.xls/f4d56f38-f50b-9579-5f64-4de74f7e192d?t=1674844635364",
    };
    const { getByTestId } = render( <DXDownloadCard {...props} /> );
    const icon = getByTestId( 'dc-file-icon' );
    expect( icon ).toHaveClass( "bi-file-excel" );
} );

test( "If the url contains a xlsx file, the icon showed will be 'bi-file-excel'", () => {
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/documents/42860/55905/test.xlsx/f4d56f38-f50b-9579-5f64-4de74f7e192d?t=1674844635364",
    };
    const { getByTestId } = render( <DXDownloadCard {...props} /> );
    const icon = getByTestId( 'dc-file-icon' );
    expect( icon ).toHaveClass( "bi-file-excel" );
} );


test( "If the user passes a test function on the downloadFn prop, it will be called", async () => {
    let mock = jest.fn();
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/wps/wcm/connect/2373e5c7-3b3d-4ff4-8957-b72d8ecb8bbf/us-state-government.pdf?MOD=AJPERES&CONVERT_TO=url",
        _downloadFn: mock
    };
    const { container } = render( <DXDownloadCard {...props} /> );
    const component = container.querySelector( ".dxDownloadCard" ) as HTMLElement;
    await userEvent.click( component );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus on the component and press the Enter key, the _downloadFn should be called", () => {
    let mock = jest.fn();
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/wps/wcm/connect/2373e5c7-3b3d-4ff4-8957-b72d8ecb8bbf/us-state-government.pdf?MOD=AJPERES&CONVERT_TO=url",
        _downloadFn: mock
    };
    const { container } = render( <DXDownloadCard {...props} /> );
    const component = container.querySelector( ".dxDownloadCard" ) as HTMLElement;
    component.focus();
    fireEvent.keyDown( component, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus on the component and press the Space key, the _downloadFn should be called", () => {
    let mock = jest.fn();
    let props = {
        ...downloadArgs,
        url: "https://www.hcl-software.com/wps/wcm/connect/2373e5c7-3b3d-4ff4-8957-b72d8ecb8bbf/us-state-government.pdf?MOD=AJPERES&CONVERT_TO=url",
        _downloadFn: mock
    };
    const { container } = render( <DXDownloadCard {...props} /> );
    const component = container.querySelector( ".dxDownloadCard" ) as HTMLElement;
    component.focus();
    fireEvent.keyDown( component, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user pass a custom filename, then the component will show that name instead of the document name", () => {
    let props = {
        ...downloadArgs,
        fileName: "300KB"
    };
    const { container } = render( <DXDownloadCard {...props} /> );
    const fileName = container.querySelector( '.dxDownloadCard__name' )?.childNodes[0] as HTMLElement;
    expect( fileName.textContent ).toEqual( props.fileName );
} );

test( "If download icon changes if value is set", () => {
    let props = {
        ...downloadArgs,
        icons: {
            download: "ci-Download_Bundle"
        }
    };
    render( <DXDownloadCard {...props} /> );
    expect( screen.getByTestId( "downloadCard__downloadIcon" ) ).toHaveClass( props.icons.download );
} );

test( "If File Type icon changes if value is set", () => {
    let props = {
        ...downloadArgs,
        icons: {
            doc: "ci-File_Document"
        }
    };
    render( <DXDownloadCard {...props} /> );
    expect( screen.getByTestId( "dc-file-icon" ) ).toHaveClass( props.icons.doc );
} );

itSupportsExtensionProps( ( extra ) => <DXDownloadCard {...downloadArgs} {...extra} /> );

test( "a consumer onClick runs first and can stop the download with preventDefault", async () => {
    const downloadFn = jest.fn();
    const consumer = jest.fn( ( e: React.MouseEvent ) => e.preventDefault() );
    const { container } = render( <DXDownloadCard {...downloadArgs} _downloadFn={downloadFn} onClick={consumer} /> );
    await userEvent.click( container.querySelector( ".dxDownloadCard" ) as HTMLElement );
    expect( consumer ).toHaveBeenCalledTimes( 1 );
    expect( downloadFn ).not.toHaveBeenCalled();
} );

test( "a consumer onKeyDown runs before the component's own handling", () => {
    const consumer = jest.fn();
    const { container } = render( <DXDownloadCard {...downloadArgs} onKeyDown={consumer} /> );
    fireEvent.keyDown( container.querySelector( ".dxDownloadCard" ) as HTMLElement, { key: "Tab" } );
    expect( consumer ).toHaveBeenCalledTimes( 1 );
} );
