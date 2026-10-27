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
import DXNewsFeed, { NewsFeedProps } from "./DXNewsFeed";
import { NewsFeedArgs } from "./DXNewsFeed.stories";
import userEvent from "@testing-library/user-event";

test( "Component renders title", () => {
    render( <DXNewsFeed {...NewsFeedArgs} /> );
    expect( screen.getByTestId( 'NF-title' ) ).toHaveTextContent( NewsFeedArgs.title );
} );

test( "Component renders the all button with given text", () => {
    let props: NewsFeedProps = JSON.parse( JSON.stringify( NewsFeedArgs ) );
    props.allButtonText = "Show All";
    render( <DXNewsFeed {...props} /> );
    expect( screen.getByTestId( 'NF-filterButtons' ).firstChild ).toHaveTextContent( "Show All" );
} );

test( "Component renders the all button default text", () => {
    render( <DXNewsFeed {...NewsFeedArgs} /> );
    expect( screen.getByTestId( 'NF-filterButtons' ).firstChild ).toHaveTextContent( "All" );
} );

test( "Component renders the given amount of filter buttons PLUS the all button", () => {
    render( <DXNewsFeed {...NewsFeedArgs} /> );
    expect( screen.getByTestId( 'NF-filterButtons' ).children.length ).toEqual( NewsFeedArgs.filterCategories.length + 1 );
} );

test( "Component renders correctly the filter button text", () => {
    render( <DXNewsFeed {...NewsFeedArgs} /> );
    expect( screen.getByTestId( 'NF-filterButtons' ).children[1] ).toHaveTextContent( NewsFeedArgs.filterCategories[0] );
} );

test( "Component adds --active class to button when clicked", async () => {
    render( <DXNewsFeed {...NewsFeedArgs} /> );
    let button = screen.getByTestId( 'NF-filterButtons' ).children[1];
    await userEvent.click( button );
    expect( button ).toHaveClass( '--active' );
} );

test( "Component adds correct item size class", () => {
    let props: NewsFeedProps = {
        title: "News Feed",
        filterCategories: ["news", "article", "event", "blog"],
        items: [
            {
                size: 6,
                categories: ["blog", "news"],
                body: "Description goes here.",
                image: {
                    url: "https://images.unsplash.com/photo-1523357585206-175e971f2ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
                    altText: "Image alt"
                },
                sticker: {
                    url: "https://images.unsplash.com/photo-1657819466043-2a4ae992f03f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
                    altText: "Sticker alt"
                },
                title: {
                    url: "www.hcl-software.com",
                    label: "Design blog: Day 26!"
                },
                authorText: "By User, 5 HOURS AGO"
            }
        ]
    };

    render( <DXNewsFeed {...props} /> );
    let card = screen.getByTestId( 'NF-item-0' );
    expect( card ).toHaveClass( "dxNewsFeed__gridItem-" + props.items[0].size );
} );

test( "Component adds default item size class with invalid value", () => {
    let props: NewsFeedProps = {
        title: "News Feed",
        filterCategories: ["news", "article", "event", "blog"],
        items: [
            {
                size: 15,
                categories: ["blog", "news"],
                body: "Description goes here.",
                image: {
                    url: "https://images.unsplash.com/photo-1523357585206-175e971f2ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
                    altText: "Image alt"
                },
                sticker: {
                    url: "https://images.unsplash.com/photo-1657819466043-2a4ae992f03f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
                    altText: "Sticker alt"
                },
                title: {
                    url: "www.hcl-software.com",
                    label: "Design blog: Day 26!"
                },
                authorText: "By User, 5 HOURS AGO"
            }
        ]
    };

    render( <DXNewsFeed {...props} /> );
    let card = screen.getByTestId( 'NF-item-0' );
    expect( card ).toHaveClass( "dxNewsFeed__gridItem-4" );
} );

test( "Component adds default item size class with undefined value", () => {
    let props: NewsFeedProps = {
        title: "News Feed",
        filterCategories: ["news", "article", "event", "blog"],
        items: [
            {
                categories: ["blog", "news"],
                body: "Description goes here.",
                image: {
                    url: "https://images.unsplash.com/photo-1523357585206-175e971f2ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
                    altText: "Image alt"
                },
                sticker: {
                    url: "https://images.unsplash.com/photo-1657819466043-2a4ae992f03f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
                    altText: "Sticker alt"
                },
                title: {
                    url: "www.hcl-software.com",
                    label: "Design blog: Day 26!"
                },
                authorText: "By User, 5 HOURS AGO"
            }
        ]
    };

    render( <DXNewsFeed {...props} /> );
    let card = screen.getByTestId( 'NF-item-0' );
    expect( card ).toHaveClass( "dxNewsFeed__gridItem-4" );
} );

test( "Component adds default item size class with invalid value", () => {
    let props: NewsFeedProps = {
        title: "News Feed",
        filterCategories: ["news", "article", "event", "blog"],
        items: [
            {
                size: 15,
                categories: ["blog"],
                image: {
                    url: "https://images.unsplash.com/photo-1595981234058-a9302fb97229?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                    altText: "Alt"
                },
                subtitle: "2023/06/13",
                description: "Photo album: Best places to go",
                link: "https://hcl-software.com/",
                dateFormat: "YY/MM/DD",
            }
        ]
    };

    render( <DXNewsFeed {...props} /> );
    let card = screen.getByTestId( 'NF-item-0' );
    expect( card ).toHaveClass( "dxNewsFeed__gridItem-4" );
} );


test( "Component renders the expected amount of cards", () => {
    render( <DXNewsFeed allButtonText={"Show All"} {...NewsFeedArgs} /> );
    expect( screen.getByTestId( 'NF-cardContainer' ).children.length ).toEqual( NewsFeedArgs.items.length );
} );
