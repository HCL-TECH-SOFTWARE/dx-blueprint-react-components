import React from "react";
import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXCardButtonCatalog from "./DXCardButtonCatalog";
import { arr10Args, arr8Args, arr4Args } from "./DXCardButtonCatalog.stories";

test( "If the variant passed is invalid, the message 'Invalid variant received' should be in the document", () => {
    let props = {
        header: "Header",
        elements: arr10Args,
        variant: "gallery"
    };
    const { getByText } = render( <DXCardButtonCatalog {...props} /> );
    const msg = getByText( "Invalid variant received" );
    expect( msg ).toBeInTheDocument();
} );

test( "If the variant passed is 'slider', the element 'dxCBCatalog__slider' should be in the document", () => {
    let props = {
        elements: arr10Args,
        variant: "slider"
    };
    const { container } = render( <DXCardButtonCatalog {...props} /> );
    const sliderEl = container.querySelector( ".dxCBCatalog__slider" );
    expect( sliderEl ).toBeInTheDocument();
} );

test( "If the variant passed is 'slider', the header should be null", () => {
    let props = {
        elements: arr10Args,
        variant: "slider"
    };
    const { container } = render( <DXCardButtonCatalog {...props} /> );
    const headerEl = container.querySelector( ".dxCBCatalog__header" );
    expect( headerEl ).toBeNull();
} );

test( "If the variant passed is 'grid', the element 'dxCBCatalog__grid' should be in the document", () => {
    let props = {
        header: "Header",
        elements: arr10Args,
        variant: "grid"
    };
    const { container } = render( <DXCardButtonCatalog {...props} /> );
    const sliderEl = container.querySelector( ".dxCBCatalog__grid" );
    expect( sliderEl ).toBeInTheDocument();
} );

test( "If the variant passed is 'grid', the header should be in the document", () => {
    let props = {
        elements: arr10Args,
        variant: "grid",
        header: "This is the header"
    };
    const { container } = render( <DXCardButtonCatalog {...props} /> );
    const headerEl = container.querySelector( ".dxCBCatalog__header" );
    expect( headerEl ).toBeInTheDocument();
} );

test( "If the slider variant does not receive elements, a message 'No elements received' should be in the document", () => {
    let props = {
        variant: "slider"
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXCardButtonCatalog {...props} /> );
    const msg = getByText( "No elements received" );
    expect( msg ).toBeInTheDocument();
} );

test( "If the slider variant received elements, the element 'dxCBCatalog__sliderMain' should be in the document", () => {
    let props = {
        variant: "slider",
        elements: arr10Args
    };
    const { container } = render( <DXCardButtonCatalog {...props} /> );
    const el = container.querySelector( ".dxCBCatalog__sliderMain" );
    expect( el ).toBeInTheDocument();
} );

test( "If the grid variant does not receive elements, a message 'No elements received' should be in the document", () => {
    let props = {
        header: "Header",
        variant: "grid"
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXCardButtonCatalog {...props} /> );
    const msg = getByText( "No elements received" );
    expect( msg ).toBeInTheDocument();
} );

test( "If the grid variant received elements, the element 'dxCBCatalog__row' should be in the document", () => {
    let props = {
        header: "Header",
        variant: "grid",
        elements: arr10Args
    };
    const { container } = render( <DXCardButtonCatalog {...props} /> );
    const el = container.querySelector( ".dxCBCatalog__row" );
    expect( el ).toBeInTheDocument();
} );

test( "If the grid variant received more than 5 elements, there should be 2 'dxCBCatalog__row' elements", () => {
    let props = {
        header: "Header",
        variant: "grid",
        elements: arr8Args
    };
    const { container } = render( <DXCardButtonCatalog {...props} /> );
    const elements = container.querySelectorAll( ".dxCBCatalog__row" );
    expect( elements ).toHaveLength( 2 );
} );

test( "If the grid variant received less than 5 elements, there should be just one 'dxCBCatalog__row' elements", () => {
    let props = {
        header: "Header",
        variant: "grid",
        elements: arr4Args
    };
    const { container } = render( <DXCardButtonCatalog {...props} /> );
    const elements = container.querySelectorAll( ".dxCBCatalog__row" );
    expect( elements ).toHaveLength( 1 );
} );

test( "The grid variant should render the same amount of elements passed", () => {
    let props = {
        header: "Header",
        variant: "grid",
        elements: arr8Args
    };
    const { container } = render( <DXCardButtonCatalog {...props} /> );
    const elements = container.querySelectorAll( ".dxCBCatalog__row__item" );
    expect( elements ).toHaveLength( elements.length );
} );

test( "If no elementsPerRow is passed, then it should render 5 elements per row", () => {
    let props = {
        header: "Header",
        variant: "grid",
        elements: arr8Args
    };
    const { container } = render( <DXCardButtonCatalog {...props} /> );
    const row = container.querySelector( ".dxCBCatalog__row" )?.childNodes;
    expect( row ).toHaveLength( 5 );
} );

test( "If the elementsPerRow is 4, then it should render 4 elements per row", () => {
    let props = {
        header: "Header",
        variant: "grid",
        elements: arr8Args,
        elementsPerRow: 4
    };
    const { container } = render( <DXCardButtonCatalog {...props} /> );
    const row = container.querySelector( ".dxCBCatalog__row" )?.childNodes;
    expect( row ).toHaveLength( props.elementsPerRow );
} );

test( "If no elementsPerRow is passed in slider variant, 5 elements will have the class 'slick-active'", () => {
    let props = {
        variant: "slider",
        elements: arr10Args,
    };
    const { container } = render( <DXCardButtonCatalog {...props} /> );
    const elements = container.querySelectorAll( ".slick-active" );
    expect( elements ).toHaveLength( 5 );
} );

test( "If the user passed elementsPerRow equal 3 in slider variant, only 3 elements will have the class 'slick-active'", () => {
    let props = {
        variant: "slider",
        elements: arr10Args,
        elementsPerRow: 3
    };
    const { container } = render( <DXCardButtonCatalog {...props} /> );
    const elements = container.querySelectorAll( ".slick-active" );
    expect( elements ).toHaveLength( 3 );
} );

test( "When the slider variant loads, the previous button from the slider should have the class 'dxCBCatalog__navbtn--hide'", () => {
    let props = {
        variant: "slider",
        elements: arr10Args
    };
    const { container } = render( <DXCardButtonCatalog {...props} /> );
    const prevBtn = container.querySelector( ".dxCBCatalog__navbtn.prev" );
    expect( prevBtn ).toHaveClass( "dxCBCatalog__navbtn--hide" );
} );

test( "When the slider variant loads, the next button from the slider should not have the class 'dxCBCatalog__navbtn--hide'", () => {
    let props = {
        variant: "slider",
        elements: arr10Args
    };
    const { container } = render( <DXCardButtonCatalog {...props} /> );
    const prevBtn = container.querySelector( ".dxCBCatalog__navbtn.next" );
    expect( prevBtn ).not.toHaveClass( "dxCBCatalog__navbtn--hide" );
} );

test( "On the slider variant when the user clicks on the next button, the prev button should not have the class 'dxCBCatalog__navbtn--hide'", async () => {
    let props = {
        variant: "slider",
        elements: arr10Args
    };
    const { getByTestId } = render( <DXCardButtonCatalog {...props} /> );
    const nextBtn = getByTestId( 'cbcatalog-slider-next-button' );
    await userEvent.click( nextBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    const prevBtn = getByTestId( 'cbcatalog-slider-prev-button' );
    expect( prevBtn ).not.toHaveClass( "dxCBCatalog__navbtn--hide" );
} );

test( "On the slider variant when the user clicks on the next button twice, the next button should have the class 'dxCBCatalog__navbtn--hide'", async () => {
    let props = {
        variant: "slider",
        elements: arr10Args
    };
    const { getByTestId } = render( <DXCardButtonCatalog {...props} /> );
    const nextBtn = getByTestId( 'cbcatalog-slider-next-button' );
    await userEvent.click( nextBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    await userEvent.click( nextBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    const checkNextBtn = getByTestId( 'cbcatalog-slider-next-button' );
    expect( checkNextBtn ).toHaveClass( "dxCBCatalog__navbtn--hide" );
} );

test( "On the slider variant when the user clicks on the next button twice, and then click on the previous button, the next button should not have the class 'dxCBCatalog__navbtn--hide'", async () => {
    let props = {
        variant: "slider",
        elements: arr10Args
    };
    const { getByTestId } = render( <DXCardButtonCatalog {...props} /> );
    const nextBtn = getByTestId( 'cbcatalog-slider-next-button' );
    await userEvent.click( nextBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    await userEvent.click( nextBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    const prevBtn = getByTestId( "cbcatalog-slider-prev-button" );
    await userEvent.click( prevBtn );
    await new Promise( r => setTimeout( r, 700 ) );
    const checkNextBtn = getByTestId( 'cbcatalog-slider-next-button' );
    expect( checkNextBtn ).not.toHaveClass( "dxCBCatalog__navbtn--hide" );
} );

//Icon Tests
test( "If Next icon is changed if prop is set", () => {
    render( <DXCardButtonCatalog elements={arr10Args} variant="slider" icons={{
        prev: "ci-Arrow_Left_MD",
        next: "ci-Arrow_Right_MD",
    }} /> );
} );
