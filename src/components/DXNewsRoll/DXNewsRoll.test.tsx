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
import { getByTestId, render, screen } from "@testing-library/react";
import { NewsRollArgs } from "./DXNewsRoll.stories";
import DXNewsRoll from "./DXNewsRoll";

test( "if component renders all children given as parameter", () => {
    render( <DXNewsRoll {...NewsRollArgs} /> );
    expect( screen.getByTestId( 'newsRoll' ).children.length ).toEqual( NewsRollArgs.newsRollItems.length );
} );

test( "if news roll items renders title correctly", () => {
    render( <DXNewsRoll {...NewsRollArgs} /> );
    expect( screen.getAllByTestId( 'newsRollTitle' )[0].textContent ).toEqual( NewsRollArgs.newsRollItems[0].label );
} );

test( "if news roll items renders primary image correctly", () => {
    render( <DXNewsRoll {...NewsRollArgs} /> );
    expect( screen.getAllByTestId( 'newsRollPrimaryImage' )[0] ).toHaveAttribute( "src", NewsRollArgs.newsRollItems[0].primaryImage.url );
} );

test( "if news roll items renders primary image alt text correctly", () => {
    render( <DXNewsRoll {...NewsRollArgs} /> );
    expect( screen.getAllByTestId( 'newsRollPrimaryImage' )[0] ).toHaveAttribute( "alt", NewsRollArgs.newsRollItems[0].primaryImage.altText );
} );

test( "if news roll items marks primary image as decorative when no altText is given", () => {
    render( <DXNewsRoll {...NewsRollArgs} /> );
    expect( screen.getAllByTestId( 'newsRollPrimaryImage' )[1] ).toHaveAttribute( "alt", "" );
    expect( screen.getAllByTestId( 'newsRollPrimaryImage' )[1] ).toHaveAttribute( "role", "presentation" );
} );

test( "if news roll items do not render secondary image if value is not given", () => {
    const noSecondaryImgArgs = {
        label: "News title here, four lines then ellipsis",
        url: "www.hcl-software.com",
        primaryImage: {
            url: "https://images.unsplash.com/photo-1612278675615-7b093b07772d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
        }
    };
    const { container } = render( <DXNewsRoll newsRollItems={[noSecondaryImgArgs]} /> );
    const secondaryImage = container.querySelector( '[data-testid="newsRollSecondaryImage"]' );
    expect( secondaryImage ).toBeNull();
} );

test( "if news roll items renders secondary image correctly", () => {
    render( <DXNewsRoll {...NewsRollArgs} /> );
    expect( screen.getAllByTestId( 'newsRollSecondaryImage' )[0] ).toHaveAttribute( "src", NewsRollArgs.newsRollItems[0].secondaryImage?.url );
} );

test( "if news roll items renders secondary image alt text correctly", () => {
    render( <DXNewsRoll {...NewsRollArgs} /> );
    expect( screen.getAllByTestId( 'newsRollSecondaryImage' )[0] ).toHaveAttribute( "alt", NewsRollArgs.newsRollItems[0].secondaryImage?.altText );
} );

test( "if news roll items marks secondary image as decorative when no altText is given", () => {
    render( <DXNewsRoll {...NewsRollArgs} /> );
    expect( screen.getAllByTestId( 'newsRollSecondaryImage' )[1] ).toHaveAttribute( "alt", "" );
    expect( screen.getAllByTestId( 'newsRollSecondaryImage' )[1] ).toHaveAttribute( "role", "presentation" );
} );

test( "if news roll items has the correct url", () => {
    render( <DXNewsRoll {...NewsRollArgs} /> );
    expect( screen.getAllByTestId( 'newsRollLink' )[0] ).toHaveAttribute( "href", NewsRollArgs.newsRollItems[0].url );
} );

test( "if news roll items has the correct link target", () => {
    render( <DXNewsRoll {...NewsRollArgs} /> );
    expect( screen.getAllByTestId( 'newsRollLink' )[0] ).toHaveAttribute( "target", NewsRollArgs.newsRollItems[0].target );
} );

test( "if iconClass parameter makes effect", () => {
    render( <DXNewsRoll {...NewsRollArgs}
        icons={{
            link: "ci-Arrow_Right_SM"
        }} /> );
    expect( screen.getAllByTestId( "newsRoll_icon" )[0] ).toHaveClass( "ci-Arrow_Right_SM" );
} );
