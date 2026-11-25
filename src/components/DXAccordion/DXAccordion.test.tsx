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
import { render, fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXAccordion from "./DXAccordion";
import { AccordionCatalogArgs } from "../DXAccordionCatalog/DXAccordionCatalog.stories";
import DXAccordionCatalog from "../DXAccordionCatalog";
import DXGenericCatalog from "../DXGenericCatalog";
import { accordionCardCatalogArgs } from "../DXGenericCatalog/DXGenericCatalog.stories";

test( "if the user clicks on the accordion, the accordion should have the class 'dxAccordion--display-enabled'", async () => {
    let props = {
        label: "Question",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
    };
    const { container, getByTestId } = render( <DXAccordion {...props} /> );
    const btn = getByTestId( 'accordion-button' );
    await userEvent.click( btn );
    const content = container.querySelector( '.dxAccordion' );
    expect( content ).toHaveClass( "dxAccordion--display-enabled" );
} );

test( "if it renders the accordion's open icon will have the class 'ci-Add_Plus'", async () => {
    let props = {
        label: "Question",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
    };
    const { getByTestId } = render( <DXAccordion {...props} /> );
    const btn = getByTestId( 'accordion-button' );
    const openIcon = getByTestId( 'accordion-icon-open' );
    expect( openIcon ).toHaveClass( "ci-Add_Plus" );
} );

test( "if it renders the accordion's open icon will have the class 'ci-Remove_Minus'", async () => {
    let props = {
        label: "Question",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
    };
    const { getByTestId } = render( <DXAccordion {...props} /> );
    const btn = getByTestId( 'accordion-button' );
    const closeIcon = getByTestId( 'accordion-icon-close' );
    expect( closeIcon ).toHaveClass( "ci-Remove_Minus" );
} );

test( "if the label element is focus, and the user press the Back key, the content should not have the class 'dxAccordion--display-enabled'", async () => {
    let props = {
        label: "Question",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
    };
    const { container } = render( <DXAccordion {...props} /> );
    const btn = container.querySelector( '[data-testid="accordion-button"]' ) as HTMLElement;
    btn.focus();
    fireEvent.keyDown( btn, {
        key: "Backspace",
        code: "Backspace",
        keyCode: 8,
        charCode: 8,
    } );

    const content = container.querySelector( ".dxAccordion__content" );
    expect( content ).not.toHaveClass( "dxAccordion--display-enabled" );
} );

test( "if anchor with an id 'anchor-test' passed inside the content, it will render that anchor", () => {
    let props = {
        label: "Question",
        body: "boundless and bare, the lone and level sands <a data-testid='anchor-test' style='color: black' href='https://en.wikipedia.org/wiki/Ozymandias' target='_blank'>stretch far away</a>."
    };
    render( <DXAccordion {...props} /> );
    const anchor = screen.getByTestId( "anchor-test" );
    expect( anchor ).toBeInTheDocument();
} );

test( "if an iframe with an id 'video-test' passed inside the content, it will render that iframe", () => {
    let props = {
        label: "Question",
        body: '<iframe width="560" height="315" src="https://www.youtube.com/embed/QOjTJAFyNrU" title="YouTube video player" data-testid="video-test" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    };
    render( <DXAccordion {...props} /> );
    const video = screen.getByTestId( "video-test" );
    expect( video ).toBeInTheDocument();
} );

test( "if closed state icon changes if value is set", () => {
    let props = {
        label: "Question",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
    };
    const { container } = render( <DXAccordion {...props} icons={{
        open: "ci-Chevron_Down",
        close: "ci-Chevron_Up"
    }} /> );
    const icon = container.querySelector( ".ci-Chevron_Down" );
    expect( icon ).not.toBeNull();
} );

test( "if open state icon changes if value is set", async () => {
    let props = {
        label: "Question",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minima maxime perspiciatis. Reprehenderit possimus similique sunt repellat vel doloremque dolor amet, enim voluptatibus exercitationem veritatis earum eveniet veniam totam ipsam est animi odit vitae repellendus? Iusto mollitia officia explicabo sed, illum dolorem adipisci reiciendis molestias distinctio! Dolore, aut? Dolorum, placeat?"
    };
    const { container } = render( <DXAccordion {...props} icons={{
        open: "ci-Chevron_Down",
        close: "ci-Chevron_Up"
    }} /> );
    const btn = container.querySelector( ".ci-Chevron_Down" );
    await userEvent.click( btn! );
    const icon = container.querySelector( ".ci-Chevron_Up" );
    expect( icon ).not.toBeNull();
} );

test( "if an image with an id 'image-test' passed inside the content, it will render that image", () => {
    let props = {
        label: "Question",
        body: '<img src="https://ccmit.mit.edu/wp-content/uploads/2014/09/ps-ideal.png" style="width:200px;height:200px" alt="how-to-img" data-testid="image-test"/>'
    };
    render( <DXAccordion {...props} /> );
    const image = screen.getByTestId( "image-test" );
    expect( image ).toBeInTheDocument();
} );

test( "if the user does not pass the files prop, then the element 'dxDownloadGroup' should be null", () => {
    let props = {
        label: "User guide",
        body: "Download the attached file for more explanation on how we can make the process and help you to get the more <b>effective solution</b> on your digital problems",
    };
    const { container } = render( <DXAccordion {...props} /> );
    const dg = container.querySelector( ".dxDownloadGroup" );
    expect( dg ).toBeNull();
} );

test( "if the user does pass the files prop, then the element 'dxDownloadGroup' should be in the document", () => {
    let props = {
        label: "User guide",
        body: "Download the attached file for more explanation on how we can make the process and help you to get the more <b>effective solution</b> on your digital problems",
        files: {
            title: "Download Formats",
            downloads: [
                { url: "https://www.hcl-software.com/wps/wcm/connect/94571e2f-d042-4e0a-a43c-b70af2f31976/3m-story.pdf?MOD=AJPERES&CONVERT_TO=url" },
            ]
        }
    };
    const { container } = render( <DXAccordion {...props} /> );
    const dg = container.querySelector( ".dxDownloadGroup" );
    expect( dg ).toBeInTheDocument();
} );

test( "if the user clicks on the accordion within an accordion catalog, only one accordion should have the class 'dxAccordion--display-enabled'", async () => {
    let props = JSON.parse( JSON.stringify( AccordionCatalogArgs ) );
    const { container, getAllByTestId } = render( <DXAccordionCatalog {...props} /> );
    const btn = getAllByTestId( 'accordion-button' )[1];
    await userEvent.click( btn );
    const accordions = container.querySelectorAll( '.dxAccordion' );
    const openedAccordion = container.querySelectorAll( '.dxAccordion--display-enabled' );
    expect( accordions.length ).toBe( props.items.length );
    expect( openedAccordion.length ).toBe( 1 );
} );

test( "renders content inside dxAccordion__contentInner wrapper", () => {
    let props = {
        label: "Question",
        body: "Answer content"
    };
    const { container } = render( <DXAccordion {...props} /> );
    const inner = container.querySelector( ".dxAccordion__contentInner" );
    expect( inner ).toBeInTheDocument();
    expect( inner?.closest( ".dxAccordion__content" ) ).toBeInTheDocument();
} );

test( "when dir='rtl' prop is given, the accordion root element has dir='rtl' attribute", () => {
    let props = { label: "سؤال", body: "هذا هو المحتوى" };
    const { container } = render( <DXAccordion {...props} dir="rtl" /> );
    const accordion = container.querySelector( ".dxAccordion" ) as HTMLElement;
    expect( accordion ).toHaveAttribute( "dir", "rtl" );
} );

test( "when dir='ltr' prop is given, the accordion root element has dir='ltr' attribute", () => {
    let props = { label: "Question", body: "Answer" };
    const { container } = render( <DXAccordion {...props} dir="ltr" /> );
    const accordion = container.querySelector( ".dxAccordion" ) as HTMLElement;
    expect( accordion ).toHaveAttribute( "dir", "ltr" );
} );

test( "when dir='rtl' is given, clicking + expands the content and dir attribute is preserved", async () => {
    let props = { label: "سؤال", body: "هذا هو المحتوى الموسع" };
    const { container } = render( <DXAccordion {...props} dir="rtl" /> );
    const btn = container.querySelector( "[data-testid='accordion-button']" ) as HTMLElement;
    await userEvent.click( btn );
    const accordion = container.querySelector( ".dxAccordion" ) as HTMLElement;
    expect( accordion ).toHaveClass( "dxAccordion--display-enabled" );
    expect( accordion ).toHaveAttribute( "dir", "rtl" );
} );

test( "when no dir prop is given, auto-detects direction from document.documentElement", async () => {
    document.documentElement.setAttribute( "dir", "rtl" );
    let props = { label: "سؤال", body: "هذا هو المحتوى" };
    const { container } = render( <DXAccordion {...props} /> );
    const accordion = container.querySelector( ".dxAccordion" ) as HTMLElement;
    expect( accordion ).toHaveAttribute( "dir", "rtl" );
    await act( async () => {
        document.documentElement.removeAttribute( "dir" );
    } );
} );

test( "when no dir prop is given and document has no dir attribute, defaults to ltr", () => {
    document.documentElement.removeAttribute( "dir" );
    let props = { label: "Question", body: "Answer" };
    const { container } = render( <DXAccordion {...props} /> );
    const accordion = container.querySelector( ".dxAccordion" ) as HTMLElement;
    expect( accordion ).toHaveAttribute( "dir", "ltr" );
} );

test( "when rendered without RTL context (LTR), clicking + still expands content normally", async () => {
    let props = { label: "Question", body: "This is expanded content" };
    const { container } = render( <DXAccordion {...props} dir="ltr" /> );
    const btn = container.querySelector( "[data-testid='accordion-button']" ) as HTMLElement;
    await userEvent.click( btn );
    const accordion = container.querySelector( ".dxAccordion" );
    expect( accordion ).toHaveClass( "dxAccordion--display-enabled" );
    expect( container.querySelector( ".dxAccordion__contentInner" ) ).toBeInTheDocument();
} );

test( "if the user clicks on the accordion within a generic catalog, only one accordion should have the class 'dxAccordion--display-enabled'", async () => {
    let props = JSON.parse( JSON.stringify( accordionCardCatalogArgs ) );
    props.pagination = {
        sets: ["8", "10", "16"],
        active: 1,
        activeSet: 16
    };

    const { container, getAllByTestId } = render( <DXGenericCatalog {...props} /> );
    const btn = getAllByTestId( 'accordion-button' )[1];
    await userEvent.click( btn );
    const accordions = container.querySelectorAll( '.dxAccordion' );
    const openedAccordion = container.querySelectorAll( '.dxAccordion--display-enabled' );
    expect( accordions.length ).toBe( props.body.items.length );
    expect( openedAccordion.length ).toBe( 1 );
} );

itSupportsExtensionProps( ( extra ) => <DXAccordion label="Question" body="Answer" {...extra} /> );

test( "extra props do not replace the component's own dir, and unknown props do not reach the DOM", () => {
    const props = { label: "Question", body: "Answer", dir: "rtl", unknownProp: "x", "data-extra": "yes" } as React.ComponentProps<typeof DXAccordion>;
    const { container } = render( <DXAccordion {...props} /> );
    const root = container.querySelector( ".dxAccordion" ) as HTMLElement;
    expect( root ).toHaveAttribute( "dir", "rtl" );
    expect( root ).toHaveAttribute( "data-extra", "yes" );
    expect( root ).not.toHaveAttribute( "unknownprop" );
} );

describe( "DXAccordion open state", () => {
    const isOpen = ( el: Element ) => el.classList.contains( "dxAccordion--display-enabled" );

    test( "stays open when the consumer className changes, and the next click closes it", async () => {
        const { container, getByTestId, rerender } = render( <DXAccordion label="Question" body="Answer" className="bp-a" /> );
        await userEvent.click( getByTestId( "accordion-button" ) );
        rerender( <DXAccordion label="Question" body="Answer" className="bp-b" /> );
        const root = container.querySelector( ".dxAccordion" ) as HTMLElement;
        expect( root ).toHaveClass( "bp-b" );
        expect( isOpen( root ) ).toBe( true );
        await userEvent.click( getByTestId( "accordion-button" ) );
        expect( isOpen( root ) ).toBe( false );
    } );

    test( "starts open when active is set and follows later changes of active", () => {
        const { container, rerender } = render( <DXAccordion label="Question" body="Answer" active /> );
        const root = container.querySelector( ".dxAccordion" ) as HTMLElement;
        expect( isOpen( root ) ).toBe( true );
        rerender( <DXAccordion label="Question" body="Answer" active={false} /> );
        expect( isOpen( root ) ).toBe( false );
        rerender( <DXAccordion label="Question" body="Answer" active /> );
        expect( isOpen( root ) ).toBe( true );
    } );

    test( "forwards a consumer object ref to the root while keeping its own", async () => {
        const ref = React.createRef<HTMLDivElement>();
        const { container, getByTestId } = render( <DXAccordion label="Question" body="Answer" ref={ref} /> );
        expect( ref.current ).toBe( container.querySelector( ".dxAccordion" ) );
        await userEvent.click( getByTestId( "accordion-button" ) );
        expect( isOpen( ref.current as HTMLElement ) ).toBe( true );
    } );

    test( "in a generic catalog, a sibling closed by another accordion reopens with a single click", async () => {
        const props = JSON.parse( JSON.stringify( accordionCardCatalogArgs ) );
        props.pagination = { sets: ["8", "10", "16"], active: 1, activeSet: 16 };
        const { container, getAllByTestId } = render( <DXGenericCatalog {...props} /> );
        const buttons = getAllByTestId( "accordion-button" );
        const roots = () => Array.from( container.querySelectorAll( ".dxAccordion" ) );

        await userEvent.click( buttons[0] );
        await userEvent.click( buttons[1] );
        expect( roots().filter( isOpen ) ).toEqual( [roots()[1]] );

        await userEvent.click( buttons[0] );
        expect( roots().filter( isOpen ) ).toEqual( [roots()[0]] );
    } );

    test( "in an accordion catalog, clicking the open accordion closes it and leaves none open", async () => {
        const props = JSON.parse( JSON.stringify( AccordionCatalogArgs ) );
        const { container, getAllByTestId } = render( <DXAccordionCatalog {...props} /> );
        const buttons = getAllByTestId( "accordion-button" );
        await userEvent.click( buttons[1] );
        expect( container.querySelectorAll( ".dxAccordion--display-enabled" ) ).toHaveLength( 1 );
        await userEvent.click( buttons[1] );
        expect( container.querySelectorAll( ".dxAccordion--display-enabled" ) ).toHaveLength( 0 );
    } );

    test( "removes its close listener on unmount", () => {
        const { container, unmount } = render( <DXAccordion label="Question" body="Answer" active /> );
        const root = container.querySelector( ".dxAccordion" ) as HTMLElement;
        const spy = jest.spyOn( root, "removeEventListener" );
        unmount();
        expect( spy ).toHaveBeenCalledWith( "dxaccordion:close", expect.any( Function ) );
    } );
} );
