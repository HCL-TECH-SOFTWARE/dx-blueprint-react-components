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
import userEvent from "@testing-library/user-event";
import DXGenericMiniCatalog, { GenericMiniCatalogProps } from "./DXGenericMiniCatalog";
import { arr10Args, arr4Args, arr8Args } from "../DXCardButtonCatalog/DXCardButtonCatalog.stories";
import { cardButtons, eventItemCard } from "../DXGenericCatalog/utilities/CatalogItems";

const headerProps = {
    title: "Mini Catalog Title",
    button: {
        label: "View more",
        onClick: jest.fn()
    }
};

const GenericMiniCatalogArgs: GenericMiniCatalogProps = {
    header: headerProps,
    body: {
        items: eventItemCard,
        componentType: "DXEventItem",
        variant: "slider",
    }
};

const MiniCatalogGridArgs: GenericMiniCatalogProps = {
    header: headerProps,
    body: {
        items: cardButtons,
        elementsPerRow: 4,
        componentType: "DXCardButton",
        variant: "grid",
    },
};

const EmptyMiniCatalogArgs: GenericMiniCatalogProps = {
    body: {
        items: [],
        variant: "grid",
        componentType: "DXCard"
    }
};

const CustomEmptyMiniCatalogArgs: GenericMiniCatalogProps = {
    header: headerProps,
    body: {
        items: [],
        variant: "grid",
        componentType: "DXCard",
        empty: {
            title: "This catalog is empty!",
            text: "Please, come back later",
            image: {
                url: "https://images.unsplash.com/photo-1515581247767-d78687bf2254?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

            },
            primaryButton: {
                label: "Reload page",
                onClick: function () {},
            },
            secondaryButton: {
                label: "Go back",
                onClick: function () {},
            },
        }
    }
};

test( "If the variant passed is 'slider', the element 'dxGenericMiniCatalog__slider' should be in the document", () => {
    const { container } = render( <DXGenericMiniCatalog {...GenericMiniCatalogArgs} /> );
    const sliderEl = container.querySelector( ".dxGenericMiniCatalog__slider" );
    expect( sliderEl ).toBeInTheDocument();
} );

test( "If the variant passed is 'grid', the element 'dxGenericMiniCatalog__grid' should be in the document", () => {
    const { container } = render( <DXGenericMiniCatalog {...MiniCatalogGridArgs} /> );
    const sliderEl = container.querySelector( ".dxGenericMiniCatalog__grid" );
    expect( sliderEl ).toBeInTheDocument();
} );

test( "If header container renders if Header props are set.", () => {
    const { container } = render( <DXGenericMiniCatalog {...MiniCatalogGridArgs} /> );
    const headerEl = container.querySelector( ".dxGenericMiniCatalog__header" );
    expect( headerEl ).toBeInTheDocument();
} );

test( "If header button renders properly", () => {
    const { container } = render( <DXGenericMiniCatalog {...MiniCatalogGridArgs} /> );
    const headerEl = container.querySelector( ".dxGenericMiniCatalog__header" );
    const button = headerEl?.querySelector( "button" );
    expect( button ).toHaveTextContent( MiniCatalogGridArgs.header?.button?.label! );
} );

test( "If the slider variant does not receive elements, it show the default Empty State message", () => {
    const { getByText } = render( <DXGenericMiniCatalog {...EmptyMiniCatalogArgs} /> );
    const msg = getByText( "No items to display" );
    expect( msg ).toBeInTheDocument();
} );

test( "custom Empty State behavoir", () => {
    const { getByText } = render( <DXGenericMiniCatalog {...CustomEmptyMiniCatalogArgs} /> );
    const msg = getByText( CustomEmptyMiniCatalogArgs.body.empty?.title! );
    expect( msg ).toBeInTheDocument();
} );

test( "If the slider variant received elements, the element 'dxGenericMiniCatalog__sliderMain' should be in the document", () => {
    const { container } = render( <DXGenericMiniCatalog {...GenericMiniCatalogArgs} /> );
    const el = container.querySelector( ".dxGenericMiniCatalog__sliderMain" );
    expect( el ).toBeInTheDocument();
} );

test( "If the grid variant does not receive elements, a message 'No items to display' should be in the document", () => {
    let props: GenericMiniCatalogProps = {
        body: {
            items: [],
            variant: "grid",
            componentType: "DXCardButton"
        }
    };
    const { getByText } = render( <DXGenericMiniCatalog {...props} /> );
    const msg = getByText( "No items to display" );
    expect( msg ).toBeInTheDocument();
} );


test( "if the componentType is not configured to a supported component a warning should be logged", () => {
    let props: GenericMiniCatalogProps = JSON.parse( JSON.stringify( GenericMiniCatalogArgs ) );
    props.body.componentType = "DXCalendar";
    const warn = jest.spyOn( console, "warn" );

    render( <DXGenericMiniCatalog {...props} /> );

    expect( warn ).toHaveBeenCalledWith( "Incorrect TAG for children element was not found in the library: " + props.body.componentType );
    warn.mockRestore();
} );

test( "If the grid variant received elements, the element 'dxGenericMiniCatalog__row' should be in the document", () => {
    const { container } = render( <DXGenericMiniCatalog {...MiniCatalogGridArgs} /> );
    const el = container.querySelector( ".dxGenericMiniCatalog__row" );
    expect( el ).toBeInTheDocument();
} );

test( "If the grid variant received more than 5 elements, there should be 2 'dxGenericMiniCatalog__row' elements", () => {
    let props: GenericMiniCatalogProps = {
        body: {
            variant: "grid",
            items: arr8Args,
            componentType: "DXCardButton"
        }
    };
    const { container } = render( <DXGenericMiniCatalog {...props} /> );
    const elements = container.querySelectorAll( ".dxGenericMiniCatalog__row" );
    expect( elements ).toHaveLength( 2 );
} );

test( "If the grid variant received less than 5 elements, there should be just one 'dxGenericMiniCatalog__row' elements", () => {
    let props: GenericMiniCatalogProps = {
        body: {
            variant: "grid",
            items: arr4Args,
            componentType: "DXCardButton"
        }
    };
    const { container } = render( <DXGenericMiniCatalog {...props} /> );
    const elements = container.querySelectorAll( ".dxGenericMiniCatalog__row" );
    expect( elements ).toHaveLength( 1 );
} );

test( "The grid variant should render the same amount of elements passed", () => {
    const { container } = render( <DXGenericMiniCatalog {...MiniCatalogGridArgs} /> );
    const elements = container.querySelectorAll( ".dxGenericMiniCatalog__row__item" );
    expect( elements ).toHaveLength( elements.length );
} );

test( "If no elementsPerRow is passed, then it should render 5 elements per row", () => {
    let props: GenericMiniCatalogProps = {
        body: {
            variant: "grid",
            items: arr8Args,
            componentType: "DXCardButton"
        }
    };
    const { container } = render( <DXGenericMiniCatalog {...props} /> );
    const row = container.querySelector( ".dxGenericMiniCatalog__row" )?.childNodes;
    expect( row ).toHaveLength( 5 );
} );

test( "If the elementsPerRow is 4, then it should render 4 elements per row", () => {
    const { container } = render( <DXGenericMiniCatalog {...MiniCatalogGridArgs} /> );
    const row = container.querySelector( ".dxGenericMiniCatalog__row" )?.childNodes;
    expect( row ).toHaveLength( MiniCatalogGridArgs.body.elementsPerRow! );
} );

test( "If no elementsPerRow is passed in slider variant, 5 elements will have the class 'slick-active'", () => {
    const { container } = render( <DXGenericMiniCatalog {...GenericMiniCatalogArgs} /> );
    const elements = container.querySelectorAll( ".slick-active" );
    expect( elements ).toHaveLength( 5 );
} );

test( "If the user passed elementsPerRow equal 3 in slider variant, only 3 elements will have the class 'slick-active'", () => {
    let props: GenericMiniCatalogProps = {
        body: {
            variant: "slider",
            items: arr4Args,
            componentType: "DXCardButton",
            elementsPerRow: 3
        }
    };
    const { container } = render( <DXGenericMiniCatalog {...props} /> );
    const elements = container.querySelectorAll( ".slick-active" );
    expect( elements ).toHaveLength( 3 );
} );

test( "When the slider variant loads, the previous button from the slider should have the class 'dxGenericMiniCatalog__navbtn--hide'", () => {
    let props: GenericMiniCatalogProps = {
        body: {
            variant: "slider",
            items: arr8Args,
            componentType: "DXCardButton"
        }
    };
    const { container } = render( <DXGenericMiniCatalog {...props} /> );
    const prevBtn = container.querySelector( ".dxGenericMiniCatalog__navbtn.prev" );
    expect( prevBtn ).toHaveClass( "dxGenericMiniCatalog__navbtn--hide" );
} );

test( "When the slider variant loads, the next button from the slider should not have the class 'dxGenericMiniCatalog__navbtn--hide'", () => {
    let props: GenericMiniCatalogProps = {
        body: {
            variant: "slider",
            items: arr10Args,
            componentType: "DXCardButton"
        }
    };
    const { container } = render( <DXGenericMiniCatalog {...props} /> );
    const prevBtn = container.querySelector( ".dxGenericMiniCatalog__navbtn.next" );
    expect( prevBtn ).not.toHaveClass( "dxGenericMiniCatalog__navbtn--hide" );
} );

test( "On the slider variant when the user clicks on the next button, the prev button should not have the class 'dxGenericMiniCatalog__navbtn--hide'", async () => {
    let props: GenericMiniCatalogProps = {
        body: {
            variant: "slider",
            items: arr10Args,
            componentType: "DXCardButton"
        }
    };
    const { getByTestId } = render( <DXGenericMiniCatalog {...props} /> );
    const nextBtn = getByTestId( 'cbcatalog-slider-next-button' );
    await userEvent.click( nextBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    const prevBtn = getByTestId( 'cbcatalog-slider-prev-button' );
    expect( prevBtn ).not.toHaveClass( "dxGenericMiniCatalog__navbtn--hide" );
} );

test( "On the slider variant when the user clicks on the next button twice, the next button should have the class 'dxGenericMiniCatalog__navbtn--hide'", async () => {
    let props: GenericMiniCatalogProps = {
        body: {
            variant: "slider",
            items: arr10Args,
            componentType: "DXCardButton"
        }
    };
    const { getByTestId } = render( <DXGenericMiniCatalog {...props} /> );
    const nextBtn = getByTestId( 'cbcatalog-slider-next-button' );
    await userEvent.click( nextBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    await userEvent.click( nextBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    const checkNextBtn = getByTestId( 'cbcatalog-slider-next-button' );
    expect( checkNextBtn ).toHaveClass( "dxGenericMiniCatalog__navbtn--hide" );
} );

test( "On the slider variant when the user clicks on the next button twice, and then click on the previous button, the next button should not have the class 'dxGenericMiniCatalog__navbtn--hide'", async () => {
    let props: GenericMiniCatalogProps = {
        body: {
            variant: "slider",
            items: arr10Args,
            componentType: "DXCardButton"
        }
    };
    const { getByTestId } = render( <DXGenericMiniCatalog {...props} /> );
    const nextBtn = getByTestId( 'cbcatalog-slider-next-button' );
    await userEvent.click( nextBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    await userEvent.click( nextBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    const prevBtn = getByTestId( "cbcatalog-slider-prev-button" );
    await userEvent.click( prevBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    const checkNextBtn = getByTestId( 'cbcatalog-slider-next-button' );
    expect( checkNextBtn ).not.toHaveClass( "dxGenericMiniCatalog__navbtn--hide" );
} );

//Icon Tests
test( "If Next icon is changed if prop is set", () => {
    let props: GenericMiniCatalogProps = {
        body: {
            variant: "slider",
            items: arr10Args,
            componentType: "DXCardButton",
            icons: {
                prev: "ci-Arrow_Left_MD",
                next: "ci-Arrow_Right_MD",
            }
        }
    };
    render( <DXGenericMiniCatalog {...props} /> );
    let prevIcon = screen.getByTestId( "cbcatalog-slider-prev-button" );
    let nextIcon = screen.getByTestId( "cbcatalog-slider-next-button" );
    expect( prevIcon.querySelector( "i" ) ).toHaveClass( props.body.icons?.prev! );
    expect( nextIcon.querySelector( "i" ) ).toHaveClass( props.body.icons?.next! );
} );
