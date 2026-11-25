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
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DXIcon from "./DXIcon";
import { itSupportsExtensionProps } from "../../testUtils/extensionContract";

describe( "DXIcon", () => {

    test( "renders mapped bootstrap icon", () => {
        render( <DXIcon name="search" data-testid="icon" /> );

        expect( screen.getByTestId( "icon" ) )
            .toHaveClass( "bi", "bi-search" );
    } );

    test( "renders unmapped icon name directly", () => {
        render( <DXIcon name="custom-icon" data-testid="icon" /> );

        expect( screen.getByTestId( "icon" ) )
            .toHaveClass( "bi", "bi-custom-icon" );
    } );

    test( "renders large size class", () => {
        render(
            <DXIcon
                name="search"
                size="lg"
                data-testid="icon"
            />
        );

        expect( screen.getByTestId( "icon" ) )
            .toHaveClass( "fs-5" );
    } );

    test( "renders extra large size class", () => {
        render(
            <DXIcon
                name="search"
                size="xl"
                data-testid="icon"
            />
        );

        expect( screen.getByTestId( "icon" ) )
            .toHaveClass( "fs-3" );
    } );

    test( "renders default small size without additional size class", () => {
        render(
            <DXIcon
                name="search"
                size="sm"
                data-testid="icon"
            />
        );

        const icon = screen.getByTestId( "icon" );

        expect( icon ).toHaveClass( "bi" );
        expect( icon ).toHaveClass( "bi-search" );
        expect( icon ).not.toHaveClass( "fs-5" );
        expect( icon ).not.toHaveClass( "fs-3" );
    } );

    test( "applies accessibility attributes", () => {
        render(
            <DXIcon
                name="search"
                ariaLabel="Search"
                role="img"
                title="Search Icon"
                data-testid="icon"
            />
        );

        const icon = screen.getByTestId( "icon" );

        expect( icon ).toHaveAttribute( "aria-label", "Search" );
        expect( icon ).toHaveAttribute( "role", "img" );
        expect( icon ).toHaveAttribute( "title", "Search Icon" );
    } );

    test( "does not render accessibility attributes when not provided", () => {
        render(
            <DXIcon
                name="search"
                data-testid="icon"
            />
        );

        const icon = screen.getByTestId( "icon" );

        expect( icon ).not.toHaveAttribute( "aria-label" );
        expect( icon ).not.toHaveAttribute( "role" );
        expect( icon ).not.toHaveAttribute( "title" );
    } );

    test( "applies custom className and style", () => {
        render(
            <DXIcon
                name="search"
                className="custom-class"
                style={{ color: "red" }}
                data-testid="icon"
            />
        );

        const icon = screen.getByTestId( "icon" );

        expect( icon ).toHaveClass( "custom-class" );
        expect( icon ).toHaveStyle( "color: red" );
    } );

    test( "maps legacy dx file icons to bootstrap file icons", () => {
        render(
            <DXIcon
                name="dx-file_pdf"
                data-testid="icon"
            />
        );

        const icon = screen.getByTestId( "icon" );

        expect( icon ).toHaveClass( "bi" );
        expect( icon ).toHaveClass( "bi-file-pdf" );
    } );

    test.each( [
        ["dx-file_doc", "bi-file-word"],
        ["dx-file_xls", "bi-file-excel"],
        ["dx-file_ppt", "bi-file-powerpoint"],
        ["dx-file_zip", "bi-file-zip"],
    ] )( "maps %s to %s", ( iconName, expectedClass ) => {
        render(
            <DXIcon
                name={iconName}
                data-testid="icon"
            />
        );

        expect( screen.getByTestId( "icon" ) )
            .toHaveClass( expectedClass );
    } );
} );

// DXIcon declares role, title and style as its own props (rendered on the icon by design)
itSupportsExtensionProps( ( extra ) => <DXIcon name="search" {...extra} />, { ownKeys: ["role", "title", "style"] } );
