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
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import DXMiniCatalog from "./DXMiniCatalog";
import { MCChangedIconsArgs, itemsArgs } from "./DXMiniCatalog.stories";

const SIX_ITEMS = [
    {
        title: {
            url: "/l-1",
            label: "Real Madrid bought a new superstar",
        },
        body: {
            "text": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
            "subject": "Sports",
            "country": "Mexico",
            "scope": "national"
        },
        cover: {
            url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
            altText: "card-cover"
        },
    },
    {
        title: {
            url: "/l-2",
            label: "Guess who is the new Lover of Catherina"
        },
        body: {
            "text": "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
            "subject": "Gossip",
            "country": "Mexico",
            "scope": "national"
        },
        cover: {
            url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
            altText: "card-cover"
        },
    },
    {
        title: {
            url: "/l-3",
            label: "Stay Down, a really scary movie"
        },
        body: {
            "text": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
            "subject": "Cinema",
            "country": "Colombia",
            "scope": "international"
        },
        cover: {
            url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
            altText: "card-cover"
        },
    },
    {
        title: {
            url: "/l-4",
            label: "A new stadium is builing downtown Bogota"
        },
        body: {
            "text": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
            "subject": "Sports",
            "country": "Colombia",
            "scope": "national"
        },
        cover: {
            url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
            altText: "card-cover"
        },
    },
    {
        title: {
            url: "/l-5",
            label: "Aware COVID in the whole Academia crew"
        },
        body: {
            "text": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
            "subject": "Gossip",
            "country": "Mexico",
            "scope": "local"
        },
        cover: {
            url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
            altText: "card-cover"
        },
    },
    {
        title: {
            url: "/l-6",
            label: "Texas Masacre reboot is making the critics talk"
        },
        body: {
            "text": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
            "subject": "Cinema",
            "country": "United States",
            "scope": "local"
        },
        cover: {
            url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
            altText: "card-cover"
        },
    },
];
test( "If the user does not pass any items, a message 'No items received' will show", () => {
    let props = {
        index: 1,
        items: [],
    };
    const { getByText } = render( <DXMiniCatalog {...props} /> );
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
        items: itemsArgs.slice( 0, 1 ),
    };
    const { getByTestId } = render( <DXMiniCatalog {...props} /> );
    const grid = getByTestId( "mini-catalog-grid" );
    expect( grid ).toBeInTheDocument();
} );

test( "If the item's length is less than 4, and its on mobile the element 'dxMiniCatalog__slider' should be in the document", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 390; }
        }
    } );
    let props = {
        index: 1,
        items: itemsArgs.slice( 0, 1 ),
    };
    const { container } = render( <DXMiniCatalog {...props} /> );
    const slider = container.querySelector( ".dxMiniCatalog__slider" );
    expect( slider ).toBeInTheDocument();
} );

test( "If the item's length is 4, the elements should have the class 'col-md-3'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        index: 1,
        items: itemsArgs.slice( 0, 4 ),
    };
    const { getAllByTestId } = render( <DXMiniCatalog {...props} /> );
    const col = getAllByTestId( "mini-catalog-col" )[0];
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
        items: itemsArgs.slice( 0, 3 ),
    };
    const { getAllByTestId } = render( <DXMiniCatalog {...props} /> );
    const col = getAllByTestId( "mini-catalog-col" )[0];
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
        items: itemsArgs.slice( 0, 2 ),
    };
    const { getAllByTestId } = render( <DXMiniCatalog {...props} /> );
    const col = getAllByTestId( "mini-catalog-col" )[0];
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
        items: itemsArgs.slice( 0, 1 ),
    };
    const { getAllByTestId } = render( <DXMiniCatalog {...props} /> );
    const col = getAllByTestId( "mini-catalog-col" )[0];
    expect( col ).toHaveClass( "col-md-12" );
} );

test( "If the item's length is smaller than 4 and the viewport is mobile the element 'dxMiniCatalog__slider' should be in the document", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 360; }
        }
    } );

    let props = {
        index: 1,
        items: itemsArgs.slice( 0, 3 )
    };
    const { container } = render( <DXMiniCatalog {...props} /> );
    const slider = container.querySelector( '.dxMiniCatalog__slider' );
    expect( slider ).toBeInTheDocument();
} );

test( "If the item's length is larger than 4, the element 'dxMiniCatalog__slider' should be in the document", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        index: 1,
        items: itemsArgs,
    };
    const { container } = render( <DXMiniCatalog {...props} /> );
    const slider = container.querySelector( '.dxMiniCatalog__slider' );
    expect( slider ).toBeInTheDocument();
} );

test( "If hideFilters is passed, then the 'dxTaxonomyFilter' will be null", () => {
    let props = {
        index: 1,
        items: itemsArgs,
    };
    const { container } = render( <DXMiniCatalog {...props} /> );
    const taxonomy = container.querySelector( ".dxTaxonomyFilter" );
    expect( taxonomy ).toBeNull();
} );


test( "When the component loads, the previous button from the slider should have the class 'dxMiniCatalog__navBtn--display-hide'", () => {
    let miniCatalogProps = {
        index: 1,
        items: itemsArgs,
    };
    const { container } = render( <DXMiniCatalog {...miniCatalogProps} /> );
    const prevBtn = container.querySelector( '.dxMiniCatalog__navBtn--direction-prev' )?.classList;
    expect( prevBtn?.contains( "dxMiniCatalog__navBtn--display-hide" ) ).toBeTruthy();
} );

test( "When the user clicks on the next button, the prev button should not have the class 'dxMiniCatalog__navBtn--display-hide'", async () => {
    let miniCatalogProps = {
        index: 1,
        items: itemsArgs,
    };
    const { getByTestId } = render( <DXMiniCatalog {...miniCatalogProps} /> );
    const nextBtn = getByTestId( 'slider-next-button' );
    await userEvent.click( nextBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    const prevBtn = getByTestId( 'slider-prev-button' );
    expect( prevBtn?.classList.contains( "dxMiniCatalog__navBtn--display-hide" ) ).not.toBeTruthy();
} );

test( "When the user clicks on the next button twice, the next button should have the class 'dxMiniCatalog__navBtn--display-hide'", async () => {
    let miniCatalogProps = {
        index: 1,
        items: itemsArgs,
    };
    const { getByTestId } = render( <DXMiniCatalog {...miniCatalogProps} /> );
    const nextBtn = getByTestId( 'slider-next-button' );
    await userEvent.click( nextBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    await userEvent.click( nextBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    const checkNextBtn = getByTestId( 'slider-next-button' );
    expect( checkNextBtn?.classList.contains( "dxMiniCatalog__navBtn--display-hide" ) ).toBeTruthy();
} );


// Test for multiple components on the same page
test( "If we have the same two components, if the user clicks on the next nav button, the prev one on the second component will have the class 'dxMiniCatalog__navBtn--display-hide'", async () => {
    let props1 = {
        index: 1,
        items: SIX_ITEMS,
    };
    let props2 = {
        index: 2,
        items: SIX_ITEMS,
    };
    const { container } = render( <div><DXMiniCatalog {...props1} /> <DXMiniCatalog {...props2} /> </div> );
    const nextBtn1 = container.querySelector( `#dxMiniCatalog-${props1.index} .dxMiniCatalog__navBtn--direction-next` ) as HTMLElement;
    await userEvent.click( nextBtn1 );
    await new Promise( r => setTimeout( r, 700 ) );
    const prevBtn2 = container.querySelector( `#dxMiniCatalog-${props2.index} .dxMiniCatalog__navBtn--direction-prev` );
    expect( prevBtn2 ).toHaveClass( "dxMiniCatalog__navBtn--display-hide" );
} );

test( "If we have the same two components, if the user clicks on the next nav button, the next one on the second component will not have the class 'dxMiniCatalog__navBtn--display-hide'", async () => {
    let props1 = {
        index: 1,
        items: SIX_ITEMS,
    };
    let props2 = {
        index: 2,
        items: SIX_ITEMS,
    };
    const { container } = render( <div><DXMiniCatalog {...props1} /> <DXMiniCatalog {...props2} /> </div> );
    const nextBtn1 = container.querySelector( `#dxMiniCatalog-${props1.index} .dxMiniCatalog__navBtn--direction-next` ) as HTMLElement;
    await userEvent.click( nextBtn1 );
    await new Promise( r => setTimeout( r, 700 ) );
    const prevBtn2 = container.querySelector( `#dxMiniCatalog-${props2.index} .dxMiniCatalog__navBtn--direction-next` );
    expect( prevBtn2 ).not.toHaveClass( "dxMiniCatalog__navBtn--display-hide" );
} );

test( "If icon changes on values set", () => {
    render( <DXMiniCatalog {...MCChangedIconsArgs} /> );
    expect( screen.getByTestId( "slider-next-button" ).querySelector( "i" ) ).toHaveClass( MCChangedIconsArgs.icons!.next! );
} );
