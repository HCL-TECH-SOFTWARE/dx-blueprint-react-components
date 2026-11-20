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

import React from 'react';
import { itSupportsExtensionProps } from "../../testUtils/extensionContract";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import DXTwitterFeed, { TwitterFeedProps } from "./DXTwitterFeed";

const twitterFeedProps: TwitterFeedProps = {
    title: "Tweets by HCL Software",
    type: "profile",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus velit at tortor finibus pharetra. Donec id nibh convallis, aliquet odio ac, lacinia ante.",
    url: "https://x.com/HCLSoftware/",
};

test( "If sending title, twitter-feed-title should have text", () => {
    render( <DXTwitterFeed {...twitterFeedProps} /> );
    const title = screen.getByTestId( 'twitter-feed-title' );
    expect( title.textContent ).toEqual( twitterFeedProps.title );
} );

test( "If title is an empty string, twitter-feed-title should be null", () => {
    twitterFeedProps.title = "";
    render( <DXTwitterFeed {...twitterFeedProps} /> );
    const title = document.querySelector( '[data-testid=twitter-feed-title]' );
    expect( title ).toBeNull();
} );

test( "If sending description, twitter-feed-description should have text", () => {
    render( <DXTwitterFeed {...twitterFeedProps} /> );
    const description = screen.getByTestId( 'twitter-feed-description' );
    expect( description.textContent ).toEqual( twitterFeedProps.description );
} );

test( "If description is an empty string, twitter-feed-description should be null", () => {
    twitterFeedProps.description = "";
    render( <DXTwitterFeed {...twitterFeedProps} /> );
    const description = document.querySelector( '[data-testid=twitter-feed-description]' );
    expect( description ).toBeNull();
} );

test( "If sending type 'profile', twitter-feed-container should have 'dxTwitterFeed__container--profile' id", () => {
    render( <DXTwitterFeed {...twitterFeedProps} /> );
    const container = screen.getByTestId( 'twitter-feed-container' );
    expect( container.id ).toEqual( 'dxTwitterFeed__container--profile' );
} );

test( "If sending type 'list', twitter-feed-container should have 'dxTwitterFeed__container--list' id", () => {
    twitterFeedProps.type = "list";
    twitterFeedProps.url = "https://twitter.com/TwitterDev/lists/national-parks";

    render( <DXTwitterFeed {...twitterFeedProps} /> );
    const container = screen.getByTestId( 'twitter-feed-container' );
    expect( container.id ).toEqual( 'dxTwitterFeed__container--list' );
} );

test( "If sending type 'tweet', twitter-feed-container should have 'dxTwitterFeed__container--tweet' id", () => {
    twitterFeedProps.type = "tweet";
    twitterFeedProps.url = "https://x.com/HCLSoftware/status/1867615606096199871";

    render( <DXTwitterFeed {...twitterFeedProps} /> );
    const container = screen.getByTestId( 'twitter-feed-container' );
    expect( container.id ).toEqual( 'dxTwitterFeed__container--tweet' );
} );

describe( "Spinner", () => {
    test( "Spinner should be visible with dxTwitterFeed__spinner class on initial render", () => {
        render( <DXTwitterFeed {...twitterFeedProps} /> );
        const spinner = screen.getByTestId( 'twitter-feed-spinner' );
        expect( spinner ).toHaveClass( 'dxTwitterFeed__spinner' );
        expect( spinner ).not.toHaveClass( 'dxTwitterFeed__spinner--hidden' );
    } );

    test( "Spinner should have Bootstrap spinner classes applied", () => {
        render( <DXTwitterFeed {...twitterFeedProps} /> );
        const spinner = screen.getByTestId( 'twitter-feed-spinner' );
        expect( spinner ).toHaveClass( 'spinner-border' );
        expect( spinner ).toHaveClass( 'text-primary' );
    } );
} );

itSupportsExtensionProps( ( extra ) => <DXTwitterFeed {...twitterFeedProps} {...extra} /> );
