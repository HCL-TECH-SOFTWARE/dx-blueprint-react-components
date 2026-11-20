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
import DXSocialCard, { SocialCardProps } from "./DXSocialCard";
import { PrimaryArgs, SocialChangedIconsArgs } from "./DXSocialCard.stories";
import { render, screen } from "@testing-library/react";

let mockLike = jest.fn();
let mockComment = jest.fn();

let noOptionalArgs: SocialCardProps = {
    body: "Description goes here.",
    image: {
        url: "https://images.unsplash.com/photo-1667312950895-306784936a68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    title: {
        url: "www.hcl-software.com",
        label: "My title",
        target: "_self"
    },
    likes: {
        label: -1,
        onClick: mockLike
    },
    comments: {
        label: -1,
        onClick: mockComment
    },
    authorText: "by User, 3 days ago",
};

//Main image tests
test( "If component renders image as expected", () => {
    render( <DXSocialCard {...PrimaryArgs} /> );
    expect( screen.getByTestId( "SC-image" ) ).toHaveAttribute( "src", PrimaryArgs.image?.url );
} );

test( "If component renders given alt text", () => {
    render( <DXSocialCard {...PrimaryArgs} /> );
    expect( screen.getByTestId( "SC-image" ) ).toHaveAttribute( "alt", PrimaryArgs.image?.altText );
} );

test( "If component renders empty alt when no altText provided", () => {
    render( <DXSocialCard {...noOptionalArgs} /> );
    expect( screen.getByTestId( "SC-image" ) ).toHaveAttribute( "alt", "" );
    expect( screen.getByTestId( "SC-image" ) ).toHaveAttribute( "role", "presentation" );
} );

test( "If main image matches given size type", () => {
    render( <DXSocialCard type="medium" {...noOptionalArgs} /> );
    expect( screen.getByTestId( "SC-image" ) ).toHaveClass( "dxSocialCard__mainImage--medium" );
} );

//Title tests
test( "If title shows given text value", () => {
    let { container } = render( <DXSocialCard {...PrimaryArgs} /> );
    expect( container.querySelector( ".dxSocialCard__title" ) ).toHaveTextContent( PrimaryArgs.title.label );
} );

test( "If title has given url", () => {
    let { container } = render( <DXSocialCard {...PrimaryArgs} /> );
    expect( container.querySelector( ".dxSocialCard__title" ) ).toHaveAttribute( "href", PrimaryArgs.title.url );
} );

test( "If title matches given target", () => {
    let { container } = render( <DXSocialCard {...PrimaryArgs} /> );
    expect( container.querySelector( ".dxSocialCard__title" ) ).toHaveAttribute( "target", PrimaryArgs.title.target );
} );

//Body tests
test( "If body contains given text", () => {
    render( <DXSocialCard {...PrimaryArgs} /> );
    expect( screen.getByTestId( "SC-body" ) ).toHaveTextContent( PrimaryArgs.body! );
} );

test( "If body hides on small social card mode", () => {
    let { container } = render( <DXSocialCard type="small" {...noOptionalArgs} /> );
    expect( container.querySelector( "dxSocialCard__body" ) ).toBeNull();
} );

//User Image tests
test( "If Image matches given value", () => {
    render( <DXSocialCard {...PrimaryArgs} /> );
    expect( screen.getByTestId( "SC-sticker" ) ).toHaveAttribute( "src", PrimaryArgs.sticker?.url );
} );

test( "If Image alt shows user value", () => {
    render( <DXSocialCard {...PrimaryArgs} /> );
    expect( screen.getByTestId( "SC-sticker" ) ).toHaveAttribute( "alt", PrimaryArgs.sticker?.altText );
} );

test( "If Image has empty alt when no altText provided", () => {
    render( <DXSocialCard sticker={{ url: PrimaryArgs.sticker!.url }} {...noOptionalArgs} /> );
    expect( screen.getByTestId( "SC-sticker" ) ).toHaveAttribute( "alt", "" );
    expect( screen.getByTestId( "SC-sticker" ) ).toHaveAttribute( "role", "presentation" );
} );

test( "If Icon show when no image is set", () => {
    render( <DXSocialCard {...noOptionalArgs} /> );
    expect( screen.getByTestId( "SC-noUserIcon" ) ).not.toBeNull();
} );

test( "If the autor text matches given value", () => {
    render( <DXSocialCard {...PrimaryArgs} /> );
    expect( screen.getByTestId( "SC-author" ) ).toHaveTextContent( PrimaryArgs.authorText );
} );

//Like and Comment icons tests
test( "If like count matches given value", () => {
    render( <DXSocialCard {...PrimaryArgs} /> );
    expect( screen.getByTestId( "SC-likeCount" ) ).toHaveTextContent( String( PrimaryArgs.likes?.label ) );
} );

test( "If like count fixes negative value", () => {
    render( <DXSocialCard {...noOptionalArgs} /> );
    expect( screen.getByTestId( "SC-likeCount" ) ).toHaveTextContent( String( 0 ) );
} );

test( "If comment count matches given value", () => {
    render( <DXSocialCard {...PrimaryArgs} /> );
    expect( screen.getByTestId( "SC-commentCount" ) ).toHaveTextContent( String( PrimaryArgs.comments?.label ) );
} );

test( "If comment count fixes negative value", () => {
    render( <DXSocialCard {...noOptionalArgs} /> );
    expect( screen.getByTestId( "SC-commentCount" ) ).toHaveTextContent( String( 0 ) );
} );

test( "If like count click function is called", async () => {
    render( <DXSocialCard {...noOptionalArgs} /> );
    await userEvent.click( screen.getByTestId( "SC-likeCount" ) );
    expect( mockLike ).toBeCalled();
} );

test( "If comment count click function is called", async () => {
    render( <DXSocialCard {...noOptionalArgs} /> );
    await userEvent.click( screen.getByTestId( "SC-commentCount" ) );
    expect( mockComment ).toBeCalled();
} );

test( "If like button don't render", () => {
    let props = {
        title: {
            url: "www.hcl-software.com",
            label: "My title"
        },
        authorText: "By user",
        comments: {
            label: -1,
            onClick: mockComment
        }
    };
    render( <DXSocialCard {...props} /> );
    expect( screen.getByTestId( "SC-iconsContainer" ).querySelector( "ci-Heart" ) ).toBeNull();
} );

test( "If comment button don't render", () => {
    let props = {
        title: {
            url: "www.hcl-software.com",
            label: "My title"
        },
        authorText: "By user",
        likes: {
            label: -1,
            onClick: mockComment
        }
    };
    render( <DXSocialCard {...props} /> );
    expect( screen.getByTestId( "SC-iconsContainer" ).querySelector( "ci-Chat" ) ).toBeNull();
} );

test( "If User Icon change when params are set", () => {
    render( <DXSocialCard {...SocialChangedIconsArgs} /> );
    expect( screen.getByTestId( "SC-noUserIcon" ) ).toHaveClass( SocialChangedIconsArgs.icons?.user! );
} );

test( "If Likes Icon change when params are set", () => {
    render( <DXSocialCard {...SocialChangedIconsArgs} /> );
    expect( screen.getByTestId( "SC-likeCount" ).querySelector( "i" ) ).toHaveClass( SocialChangedIconsArgs.icons?.likes! );
} );

test( "If Commens Icon change when params are set", () => {
    render( <DXSocialCard {...SocialChangedIconsArgs} /> );
    expect( screen.getByTestId( "SC-commentCount" ).querySelector( "i" ) ).toHaveClass( SocialChangedIconsArgs.icons?.comments! );
} );

itSupportsExtensionProps( ( extra ) => <DXSocialCard {...PrimaryArgs} {...extra} /> );

test( "extra props: unknown props do not reach the DOM", () => {
    const props = { ...PrimaryArgs, unknownProp: "x", "data-extra": "yes" } as React.ComponentProps<typeof DXSocialCard>;
    const { container } = render( <DXSocialCard {...props} /> );
    const root = container.firstElementChild as HTMLElement;
    expect( root ).toHaveAttribute( "data-extra", "yes" );
    expect( root ).not.toHaveAttribute( "unknownprop" );
} );
