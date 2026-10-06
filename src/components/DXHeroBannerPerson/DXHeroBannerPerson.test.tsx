import React from "react";
import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import DXHeroBannerPerson from "./DXHeroBannerPerson";
import { HeroBannerPersonArgs } from "./DXHeroBannerPerson.stories";

// TODO: If the team find a way to test the slide logic, add the tests missing
test( "if the users does not pass the bannerUrl, it will be null", () => {
    const { container } = render( <DXHeroBannerPerson {...HeroBannerPersonArgs} /> );
    const backgroundUrl = container.querySelector( '[data-testid="hb-person-image-link"]' );
    expect( backgroundUrl ).toBeNull();
} );

test( "If the user pass a bannerUrl, the element will be in the document", () => {
    let props = {
        ...HeroBannerPersonArgs,
        bannerUrl: "https://hcl-software.com/"
    };
    const { container } = render( <DXHeroBannerPerson {...props} /> );
    const backgroundUrl = container.querySelector( '[data-testid="hb-person-image-link"]' );
    expect( backgroundUrl ).toBeInTheDocument();
} );

// Tests for showing the person details box
test( "If no name, role, and location are passed on the first item on the persons array, the box will be null", () => {
    let props = {
        ...HeroBannerPersonArgs,
        persons: [
            {
                imageDesktop: "https://images.unsplash.com/photo-1669629711675-5acbd087a9ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            },
            {
                imageDesktop: "https://images.unsplash.com/photo-1670338724585-2d800dedcf77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            },
            {
                imageDesktop: "https://images.unsplash.com/photo-1670000037516-62045745b67d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            },
        ]
    };
    const { container } = render( <DXHeroBannerPerson {...props} /> );
    const box = container.querySelector( '[data-testid="hb-person-details-box"]' );
    expect( box ).toBeNull();
} );

test( "If name, role, and location are passed on the first item on the persons array, the box will be in the document", () => {
    let props = {
        ...HeroBannerPersonArgs,
        persons: [
            {
                name: "Arturo Espinoza Quintero",
                role: "Frontend Developer",
                location: "HCL Software",
                imageDesktop: "https://images.unsplash.com/photo-1669629711675-5acbd087a9ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            },
            {
                imageDesktop: "https://images.unsplash.com/photo-1670338724585-2d800dedcf77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            },
            {
                imageDesktop: "https://images.unsplash.com/photo-1670000037516-62045745b67d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            },
        ]
    };
    const { getByTestId } = render( <DXHeroBannerPerson {...props} /> );
    const box = getByTestId( "hb-person-details-box" );
    expect( box ).toBeInTheDocument();
} );

test( "If only name is passed on the first item on the persons array, it will be in the document", () => {
    let props = {
        ...HeroBannerPersonArgs,
        persons: [
            {
                name: "Arturo Espinoza Quintero",
                imageDesktop: "https://images.unsplash.com/photo-1669629711675-5acbd087a9ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            },
            {
                imageDesktop: "https://images.unsplash.com/photo-1670338724585-2d800dedcf77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            },
            {
                imageDesktop: "https://images.unsplash.com/photo-1670000037516-62045745b67d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            },
        ]
    };
    const { getByTestId } = render( <DXHeroBannerPerson {...props} /> );
    const name = getByTestId( "hb-person-name" );
    expect( name ).toBeInTheDocument();
} );

test( "If only role is passed on the first item on the persons array, it will be in the document", () => {
    let props = {
        ...HeroBannerPersonArgs,
        persons: [
            {
                role: "Frontend Developer",
                imageDesktop: "https://images.unsplash.com/photo-1669629711675-5acbd087a9ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            },
            {
                imageDesktop: "https://images.unsplash.com/photo-1670338724585-2d800dedcf77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            },
            {
                imageDesktop: "https://images.unsplash.com/photo-1670000037516-62045745b67d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            },
        ]
    };
    const { getByTestId } = render( <DXHeroBannerPerson {...props} /> );
    const role = getByTestId( "hb-person-role" );
    expect( role ).toBeInTheDocument();
} );

test( "If only location is passed on the first item on the persons array, it will be in the document", () => {
    let props = {
        ...HeroBannerPersonArgs,
        persons: [
            {
                location: "HCL Software",
                imageDesktop: "https://images.unsplash.com/photo-1669629711675-5acbd087a9ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            },
            {
                imageDesktop: "https://images.unsplash.com/photo-1670338724585-2d800dedcf77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            },
            {
                imageDesktop: "https://images.unsplash.com/photo-1670000037516-62045745b67d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            },
        ]
    };
    const { getByTestId } = render( <DXHeroBannerPerson {...props} /> );
    const loc = getByTestId( "hb-person-location" );
    expect( loc ).toBeInTheDocument();
} );

// Test the custom content and person info classes
test( "If the user does not pass the bodyClass, the element will have the default classes", () => {
    const { getByTestId } = render( <DXHeroBannerPerson {...HeroBannerPersonArgs} /> );
    let content = getByTestId( "hb-person-content" );
    expect( content ).toHaveClass( "dxHBPerson__content" );
} );

test( "If the user does pass the bodyClass, the element will have that class", () => {
    let customClass = "test";
    const { getByTestId } = render( <DXHeroBannerPerson {...HeroBannerPersonArgs} bodyClass={customClass} /> );
    let content = getByTestId( "hb-person-content" );
    expect( content ).toHaveClass( customClass );
} );

test( "If the user does not pass the personInfoClass, the element will have the default classes", () => {
    const { getByTestId } = render( <DXHeroBannerPerson {...HeroBannerPersonArgs} /> );
    let content = getByTestId( "hb-person-details-box" );
    expect( content ).toHaveClass( "dxHBPerson__blur d-none d-sm-block" );
} );

test( "If the user does pass the personInfoClass, the element will have that class", () => {
    let customClass = "test";
    const { getByTestId } = render( <DXHeroBannerPerson {...HeroBannerPersonArgs} personInfoClass={customClass} /> );
    let content = getByTestId( "hb-person-details-box" );
    expect( content ).toHaveClass( customClass );
} );
