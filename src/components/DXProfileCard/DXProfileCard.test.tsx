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
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ProfileCardArgs, NoPicProfileCardArgs } from "./DXProfileCard.stories";
import ProfileCard from "./DXProfileCard";

test( "profile pic renders correctly", () => {
    render( <ProfileCard {...ProfileCardArgs} /> );
    let profilePic = screen.getByTestId( "pc-profilePic" ) as HTMLImageElement;

    expect( profilePic.getAttribute( "src" ) ).toBe( ProfileCardArgs.image?.url );
    expect( profilePic.alt ).toBe( ProfileCardArgs.image?.altText );
} );

test( "no altText was given to the profile pic", () => {
    let props = JSON.parse( JSON.stringify( ProfileCardArgs ) );
    delete props.image?.altText;
    render( <ProfileCard {...props} /> );
    let profilePic = screen.getByTestId( "pc-profilePic" ) as HTMLImageElement;
    expect( profilePic.alt ).toBe( props.name + "'s picture" );
} );

test( "name renders correctly", () => {
    render( <ProfileCard {...ProfileCardArgs} /> );
    let nameContainer = screen.getByTestId( "pc-nameContainer" );

    expect( nameContainer.firstChild ).toHaveTextContent( ProfileCardArgs.name );
} );

test( "social presence renders as component", () => {
    render( <ProfileCard {...ProfileCardArgs} /> );
    let socialContainer = screen.getByTestId( "pc-socialContainer" );
    expect( socialContainer.firstChild ).toHaveClass( "dxSocialPresence" );
} );

test( "when there is no picture, render avatar initials", () => {
    render( <ProfileCard {...NoPicProfileCardArgs} /> );
    let imageContainer = screen.getByTestId( "pc-imageContainer" );
    expect( imageContainer.firstChild ).toHaveClass( "dxProfileCard__image--avatar" );
} );

test( "no social media is given", () => {
    let props = JSON.parse( JSON.stringify( ProfileCardArgs ) );
    delete props.socialMedia;
    render( <ProfileCard {...props} /> );

    let socialContainer = document.querySelector( '.dxProfileCard__socialMedia' );
    expect( socialContainer ).toBeNull();
} );

test( "showSocialMedia={false} hides the social media section", () => {
    let props = JSON.parse( JSON.stringify( ProfileCardArgs ) );
    render( <ProfileCard {...props} showSocialMedia={false} /> );

    let socialContainer = document.querySelector( '.dxProfileCard__socialMedia' );
    expect( socialContainer ).toBeNull();
} );

test( "showSocialMedia omitted still shows the social media section (catalog no-regression case)", () => {
    let props = JSON.parse( JSON.stringify( ProfileCardArgs ) );
    delete props.showSocialMedia;
    render( <ProfileCard {...props} /> );

    let socialContainer = screen.getByTestId( "pc-socialContainer" );
    expect( socialContainer ).toBeInTheDocument();
} );
// Tests for the loader
test( "When the image is rendering, the element 'loader__container' should not have the class 'd-none'", () => {
    const { container } = render( <ProfileCard {...ProfileCardArgs} /> );
    let loaderContainer = container.querySelector( ".loader__container" );
    expect( loaderContainer ).not.toHaveClass( "d-none" );
} );

test( "When the image finish its rendering, the element 'loader__container' should have the class 'd-none'", () => {
    const { container } = render( <ProfileCard {...ProfileCardArgs} /> );
    let cover = container.querySelector( ".dxProfileCard__image img" ) as HTMLElement;
    fireEvent.load( cover );
    let loaderContainer = container.querySelector( ".loader__container" );
    expect( loaderContainer ).toHaveClass( "d-none" );
} );

itSupportsExtensionProps( ( extra ) => <ProfileCard {...ProfileCardArgs} {...extra} /> );

test( "extra props: unknown props do not reach the DOM", () => {
    const props = { ...ProfileCardArgs, unknownProp: "x", "data-extra": "yes" } as React.ComponentProps<typeof ProfileCard>;
    const { container } = render( <ProfileCard {...props} /> );
    const root = container.firstElementChild as HTMLElement;
    expect( root ).toHaveAttribute( "data-extra", "yes" );
    expect( root ).not.toHaveAttribute( "unknownprop" );
} );
