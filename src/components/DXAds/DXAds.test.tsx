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
import { render } from "@testing-library/react";
import { ads2Args, ads3Args, ads4Args, ads6Args } from "./DXAds.stories";
import DXAds from "./DXAds";

let ads1Args = { ads: ads2Args.ads.slice( 0, 1 ) };

test( "If no ads received, then a message 'No Ads received' will render", () => {
    let props = {
        ads: []
    };
    const { getByText } = render( <DXAds {...props} /> );
    expect( getByText( "No Ads received" ) ).toBeInTheDocument();
} );

test( "If only one ad received, then it should render just one element", () => {
    const { container } = render( <DXAds {...ads1Args} /> );
    const ads = container.querySelectorAll( '[data-testid="ad-item"]' );
    expect( ads ).toHaveLength( 1 );
} );

test( "If only one ad received, the one element must have the class 'col-sm-12'", () => {
    const { container } = render( <DXAds {...ads1Args} /> );
    const ads = container.querySelectorAll( '[data-testid="ad-item"]' );
    const ad = ads[0];
    expect( ad.classList.contains( "col-sm-12" ) ).toBeTruthy();
} );

test( "If two ads received, then it should render two elements", () => {
    const { container } = render( <DXAds {...ads2Args} /> );
    const ads = container.querySelectorAll( '[data-testid="ad-item"]' );
    expect( ads ).toHaveLength( 2 );
} );

test( "If two ads received, all elements must have the class 'col-sm-6'", () => {
    const { container } = render( <DXAds {...ads2Args} /> );
    const ads = container.querySelectorAll( '[data-testid="ad-item"]' );
    let classFlag = true;
    ads.forEach( ad => {
        if ( !ad.classList.contains( "col-sm-6" ) ) classFlag = false;
    } );
    expect( classFlag ).toBeTruthy();
} );

test( "If three ads received, then it should render three elements", () => {
    const { container } = render( <DXAds {...ads3Args} /> );
    const ads = container.querySelectorAll( '[data-testid="ad-item"]' );
    expect( ads ).toHaveLength( 3 );
} );

test( "If three ads received, all elements must have the class 'col-sm-4'", () => {
    const { container } = render( <DXAds {...ads3Args} /> );
    const ads = container.querySelectorAll( '[data-testid="ad-item"]' );
    let classFlag = true;
    ads.forEach( ad => {
        if ( !ad.classList.contains( "col-sm-4" ) ) classFlag = false;
    } );
    expect( classFlag ).toBeTruthy();
} );

test( "If four ads received, then it should render four elements", () => {
    const { container } = render( <DXAds {...ads4Args} /> );
    const ads = container.querySelectorAll( '[data-testid="ad-item"]' );
    expect( ads ).toHaveLength( 4 );
} );

test( "If four ads received, all elements must have the class 'col-sm-3'", () => {
    const { container } = render( <DXAds {...ads4Args} /> );
    const ads = container.querySelectorAll( '[data-testid="ad-item"]' );
    let classFlag = true;
    ads.forEach( ad => {
        if ( !ad.classList.contains( "col-sm-3" ) ) classFlag = false;
    } );
    expect( classFlag ).toBeTruthy();
} );

test( "If six ads received, then it should render six elements", () => {
    const { container } = render( <DXAds {...ads6Args} /> );
    const ads = container.querySelectorAll( '[data-testid="ad-item"]' );
    expect( ads ).toHaveLength( 6 );
} );

test( "If six ads received, all elements must have the class 'col-sm-2'", () => {
    const { container } = render( <DXAds {...ads6Args} /> );
    const ads = container.querySelectorAll( '[data-testid="ad-item"]' );
    let classFlag = true;
    ads.forEach( ad => {
        if ( !ad.classList.contains( "col-sm-2" ) ) classFlag = false;
    } );
    expect( classFlag ).toBeTruthy();
} );

test( "If six ads received, it should be two divs rendered with the class of row", () => {
    const { container } = render( <DXAds {...ads6Args} /> );
    const rows = container.querySelectorAll( '.row' );
    expect( rows ).toHaveLength( 2 );
} );
