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
import DXQuote, { QuoteProps } from "./DXQuote";

describe( "Quote Component as a whole", () => {
    test( "Full Rendering", () => {
        const quote: QuoteProps = {
            index: 1,
            body: "This is a Quote test.",
            thumbnail: { url: "https://via.placeholder.com/150", altText: "Picture of Author Name" },
            authorName: "Author Name",
            hideQuotes: false,
            paddingDesktop: "20px",
            paddingMobile: "10px 0"
        };

        render( <DXQuote {...quote} /> );

        expect( screen.getByTestId( "quote-item" ) ).toBeTruthy();
    } );

    test( "Partial Rendering", () => {
        const quote: QuoteProps = {
            index: 1,
            body: "This is a Quote test."
        };

        render( <DXQuote {...quote} /> );

        expect( screen.getByTestId( "quote-item" ) ).toBeTruthy();
    } );
} );

describe( "Thumbnail", () => {
    test( "If a thumbnail image is specified, it should display said image", () => {
        const quote: QuoteProps = {
            index: 1,
            body: "This is a Quote test.",
            thumbnail: { url: "https://via.placeholder.com/150" },
            authorName: "Author Name",
        };

        render( <DXQuote {...quote} /> );

        expect( screen.getByTestId( "quote-image" ) ).toBeTruthy();
    } );

    test( "If a thumbnail altText is specified, alt should read said value", () => {
        const quote: QuoteProps = {
            index: 1,
            body: "This is a Quote test.",
            thumbnail: { url: "https://via.placeholder.com/150", altText: "Picture of Author name" },
            authorName: "Author Name",
        };

        render( <DXQuote {...quote} /> );

        expect( ( screen.getByTestId( "quote-image" ) as HTMLImageElement ).alt ).toBe( quote.thumbnail?.altText );
    } );

    test( "If no thumbnail image is specified, it shouldn't display an image at all", () => {
        const quote: QuoteProps = {
            index: 1,
            body: "This is a Quote test.",
            authorName: "Author Name"
        };

        render( <DXQuote {...quote} /> );

        expect( screen.queryByTestId( "quote-image" ) ).not.toBeInTheDocument();
    } );

    test( "If no thumbnail altText is specified, alt should read the authorName value", () => {
        const quote: QuoteProps = {
            index: 1,
            body: "This is a Quote test.",
            thumbnail: { url: "https://via.placeholder.com/150" },
            authorName: "John Doe",
        };

        render( <DXQuote {...quote} /> );

        expect( screen.getByTestId( "quote-image" ).getAttribute( "alt" ) ).toEqual( quote.authorName );
    } );

    test( "If no thumbnail altText and no authorName are specified, alt should read 'Author Image'", () => {
        const quote: QuoteProps = {
            index: 1,
            body: "This is a Quote test.",
            thumbnail: { url: "https://via.placeholder.com/150" }
        };

        render( <DXQuote {...quote} /> );

        expect( screen.getByTestId( "quote-image" ).getAttribute( "alt" ) ).toEqual( "Author Image" );
    } );
} );

describe( "Author Name", () => {
    test( "If the authorName is specified, it should display said name", () => {
        const quote: QuoteProps = {
            index: 1,
            body: "This is a Quote test.",
            authorName: "Ana Guajardo",
        };

        render( <DXQuote {...quote} /> );

        expect( screen.getByTestId( "quote-name" ) ).toHaveTextContent( quote.authorName?.trim() as string );
    } );

    test( "If no authorName is specified, it shouldn't display a name at all", () => {
        const quote: QuoteProps = {
            index: 1,
            body: "This is a Quote test."
        };

        render( <DXQuote {...quote} /> );

        expect( screen.queryByTestId( "quote-name" ) ).not.toBeInTheDocument();
    } );
} );

describe( "Quote icons", () => {
    test( "If hideQuotes is set to true, the SVGs shouldn't be displayed", () => {
        const quote: QuoteProps = {
            index: 1,
            body: "This is a Quote test.",
            hideQuotes: true
        };

        render( <DXQuote {...quote} /> );

        screen.queryAllByRole( 'presentation' ).forEach( item => {
            expect( item ).not.toBeInTheDocument();
        } );

    } );
} );

/**
 * Since testing media queries is currently not possible, this will only be testing the desktop padding
 * https://stackoverflow.com/a/64393276
 */
describe( "Padding", () => {
    test( "If custom padding is specified, it should render with said value", () => {
        const quotes: QuoteProps[] = [
            {
                index: 1,
                body: "This is Quote test #1.",
                paddingDesktop: "50px"
            },
            {
                index: 2,
                body: "This is Quote test #2.",
                paddingDesktop: "40px 60em"
            },
            {
                index: 3,
                body: "This is Quote test #3.",
                paddingDesktop: "40px 60em 3%"
            },
            {
                index: 4,
                body: "This is Quote test #4.",
                paddingDesktop: "40px 60em 3% 5mm"
            },
            {
                index: 5,
                body: "This is Quote test #5.",
                paddingDesktop: "0 15px"
            },
            {
                index: 6,
                body: "This is Quote test #6.",
                paddingDesktop: "inherit"
            }
        ];

        quotes.forEach( ( q ) => {
            render( <DXQuote {...q} /> );
        } );

        let renderedQuotes = screen.getAllByTestId( "quote-item" );
        renderedQuotes.forEach( ( q, i ) => {
            expect( q ).toHaveStyle( 'padding: ' + quotes[i].paddingDesktop );
        } );

    } );

    test( "If no custom padding is passed along, it should be 0", () => {
        const quote: QuoteProps = {
            index: 1,
            body: "This is a Quote test."
        };

        render( <DXQuote {...quote} /> );

        expect( screen.getByTestId( "quote-item" ) ).toHaveStyle( 'padding: 0' );

    } );

    test( "If an incorrect value is passed along, it should be 0", () => {
        const quotes: QuoteProps[] = [
            {
                index: 1,
                body: "This is Quote test #1.",
                paddingDesktop: "30pixels"
            },
            {
                index: 2,
                body: "This is Quote test #2.",
                paddingDesktop: "5px10px"
            },
            {
                index: 3,
                body: "This is Quote test #3.",
                paddingDesktop: "50em 11px 3% 0 88rem"
            },
            {
                index: 4,
                body: "This is Quote test #4.",
                paddingDesktop: "9em  60px"
            },
            {
                index: 5,
                body: "This is Quote test #5.",
                paddingDesktop: "45"
            }
        ];

        quotes.forEach( ( q ) => {
            render( <DXQuote {...q} /> );
        } );

        let renderedQuotes = screen.getAllByTestId( "quote-item" );
        renderedQuotes.forEach( ( q ) => {
            expect( q ).toHaveStyle( 'padding: 0' );
        } );
    } );
} );

describe( "Custom icons", () => {
    test( "If the icons change when params are set", () => {
        const quote: QuoteProps = {
            index: 1,
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque habitant morbi tristique senectus et. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Vitae et leo duis ut diam.",
            hideQuotes: false,
            icons: {
                quoteOpen: "ci-Chat_Add",
                quoteClose: "ci-Chat_Remove",
            }
        };

        render( <DXQuote {...quote} /> );

        expect.assertions( 2 );
        expect( screen.getByTestId( "quotes-quoteOpen" ) ).toHaveClass( "ci-Chat_Add" );
        expect( screen.getByTestId( "quotes-quoteClose" ) ).toHaveClass( "ci-Chat_Remove" );
    } );
} );
