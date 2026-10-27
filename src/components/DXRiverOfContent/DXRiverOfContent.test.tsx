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
import { render, fireEvent, screen } from "@testing-library/react";
import DXRiverOfContent from "./DXRiverOfContent";

const riverOfContentTestArgs = {
    index: 1,
    header: "News item up to three lines that supports ",
    links: [
        {
            url: "#one",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        },
        {
            url: "#two",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        },
        {
            url: "#three",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        },
        {
            url: "#four",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        },
    ],
    collapsible: true
};

test( "If no links were passed, then a message '' will appear", () => {
    const props = {
        header: "Header text up to two lines with 43 characters"
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXRiverOfContent {...props} /> );
    expect( getByText( "No links received" ) ).toBeInTheDocument();
} );

test( "If links were passed, then it should render the same amount of elements", () => {
    const { getAllByTestId } = render( <DXRiverOfContent {...riverOfContentTestArgs} /> );
    const items = getAllByTestId( "river-content-item" );
    expect( items ).toHaveLength( riverOfContentTestArgs.links.length );
} );

test( "If the user pass more than 4 links, it will render just 4 elements", () => {
    const props = {
        ...riverOfContentTestArgs,
        links: [
            {
                url: "#one",
                target: "_blank",
                label: "News item up to one lines that supports up to 93 chars. In case of more characters, then ellipsis so"
            },
            {
                url: "#two",
                target: "_blank",
                label: "News item up to two lines that supports up to 93 chars. In case of more characters, then ellipsis so"
            },
            {
                url: "#three",
                target: "_blank",
                label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
            },
            {
                url: "#four",
                target: "_blank",
                label: "News item up to four lines that supports up to 93 chars. In case of more characters, then ellipsis so"
            },
            {
                url: "#five",
                target: "_blank",
                label: "News item up to five lines that supports up to 93 chars. In case of more characters, then ellipsis so"
            },
        ]
    };
    const { getAllByTestId } = render( <DXRiverOfContent {...props} /> );
    const renderedItems = getAllByTestId( "river-content-item" );
    expect( renderedItems ).toHaveLength( 4 );
} );

test( "If the user clicks on the header element, the items element should have this class 'dxRiverContent__items--active'", async () => {
    const { container } = render( <DXRiverOfContent {...riverOfContentTestArgs} /> );
    const headerEl = container.querySelector( ".dxRiverContent__header" )?.childNodes[0] as Element;
    await userEvent.click( headerEl );
    const itemsEl = container.querySelector( ".dxRiverContent__items" );
    expect( itemsEl ).toHaveClass( "dxRiverContent__items--active" );
} );

test( "If the user clicks on the header element, the header's icon should have the class 'dxRiverContent__icon--open'", async () => {
    const { container, getByTestId } = render( <DXRiverOfContent {...riverOfContentTestArgs} /> );
    const headerEl = container.querySelector( ".dxRiverContent__header" )?.childNodes[0] as Element;
    await userEvent.click( headerEl );
    const iconEl = getByTestId( "river-header-icon" );
    expect( iconEl ).toHaveClass( "dxRiverContent__icon--open" );
} );

test( "If the user clicks on the header element, the component should have the class 'dxRiverContent--open'", async () => {
    const { container } = render( <DXRiverOfContent {...riverOfContentTestArgs} /> );
    const headerEl = container.querySelector( ".dxRiverContent__header" )?.childNodes[0] as Element;
    await userEvent.click( headerEl );
    const componentEl = container.querySelector( ".dxRiverContent" ) as Element;
    expect( componentEl ).toHaveClass( "dxRiverContent--open" );
} );

test( "If the user clicks on the header element twice, the items element should not have this class 'dxRiverContent__items--active'", async () => {
    const { container } = render( <DXRiverOfContent {...riverOfContentTestArgs} /> );
    const headerEl = container.querySelector( ".dxRiverContent__header" ) as Element;
    await userEvent.click( headerEl );
    await userEvent.click( headerEl );
    const itemsEl = container.querySelector( ".dxRiverContent__items" );
    expect( itemsEl ).not.toHaveClass( "dxRiverContent__items--active" );
} );

test( "If the user clicks on the header element twice, the header's icon should not have the class 'dxRiverContent__icon--open'", async () => {
    const { container, getByTestId } = render( <DXRiverOfContent {...riverOfContentTestArgs} /> );
    const headerEl = container.querySelector( ".dxRiverContent__header" ) as Element;
    await userEvent.click( headerEl );
    await userEvent.click( headerEl );
    const iconEl = getByTestId( "river-header-icon" );
    expect( iconEl ).not.toHaveClass( "dxRiverContent__icon--open" );
} );

test( "If the user clicks on the header element twice, the component should not have the class 'dxRiverContent--open'", async () => {
    const { container } = render( <DXRiverOfContent {...riverOfContentTestArgs} /> );
    const headerEl = container.querySelector( ".dxRiverContent" )?.childNodes[0] as Element;
    await userEvent.click( headerEl );
    await userEvent.click( headerEl );
    const componentEl = container.querySelector( ".dxRiverContent" ) as Element;
    expect( componentEl ).not.toHaveClass( "dxRiverContent--open" );
} );

test( "If the user focus on the header element and press the space key, the items should have the class 'dxRiverContent__items--active'", () => {
    const { container } = render( <DXRiverOfContent {...riverOfContentTestArgs} /> );
    const headerEl = container.querySelector( ".dxRiverContent__header" )?.childNodes[0] as HTMLElement;
    headerEl.focus();
    fireEvent.keyDown( headerEl, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );

    const itemsEl = container.querySelector( ".dxRiverContent__items" );
    expect( itemsEl ).toHaveClass( "dxRiverContent__items--active" );
} );

test( "If the user focus on the header element and press the space key twice, the items should not have the class 'dxRiverContent__items--active'", () => {
    const { container } = render( <DXRiverOfContent {...riverOfContentTestArgs} /> );
    const headerEl = container.querySelector( ".dxRiverContent__header" )?.childNodes[0] as HTMLElement;
    headerEl.focus();
    fireEvent.keyDown( headerEl, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );

    fireEvent.keyDown( headerEl, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );

    const itemsEl = container.querySelector( ".dxRiverContent__items" );
    expect( itemsEl ).not.toHaveClass( "dxRiverContent__items--active" );
} );

test( "If the user focus on the header element and press the enter key, the items should have the class 'dxRiverContent__items--active'", () => {
    const { container } = render( <DXRiverOfContent {...riverOfContentTestArgs} /> );
    const headerEl = container.querySelector( ".dxRiverContent__header" )?.childNodes[0] as HTMLElement;
    headerEl.focus();
    fireEvent.keyDown( headerEl, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );

    const itemsEl = container.querySelector( ".dxRiverContent__items" );
    expect( itemsEl ).toHaveClass( "dxRiverContent__items--active" );
} );

test( "If the user focus on the header element and press the enter key twice, the items should not have the class 'dxRiverContent__items--active'", () => {
    const { container } = render( <DXRiverOfContent {...riverOfContentTestArgs} /> );
    const headerEl = container.querySelector( ".dxRiverContent__header" ) as HTMLElement;
    headerEl.focus();
    fireEvent.keyDown( headerEl, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );

    fireEvent.keyDown( headerEl, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );

    const itemsEl = container.querySelector( ".dxRiverContent__items" );
    expect( itemsEl ).not.toHaveClass( "dxRiverContent__items--active" );
} );

test( "If the user focus on the header element and press the 'a' key, the items should not have the class 'dxRiverContent__items--active'", async () => {
    const { container } = render( <DXRiverOfContent {...riverOfContentTestArgs} /> );
    const headerEl = container.querySelector( ".dxRiverContent__header" ) as HTMLElement;
    headerEl.focus();
    fireEvent.keyDown( headerEl, {
        key: "a",
        code: "a",
        keyCode: 97,
        charCode: 97,
    } );

    const itemsEl = container.querySelector( ".dxRiverContent__items" );
    expect( itemsEl ).not.toHaveClass( "dxRiverContent__items--active" );
} );

test( "If the header's length is more than 43 characters, it should have the class 'dxRiverContent__header--overflow'", () => {
    const props = {
        ...riverOfContentTestArgs,
        header: "News item up to three lines that supports longer text"
    };
    const { container } = render( <DXRiverOfContent {...props} /> );
    const headerEl = container.querySelector( ".dxRiverContent__header" ) as HTMLElement;
    expect( headerEl ).toHaveClass( "dxRiverContent__header--overflow" );
} );

test( "If the item recieved, has a length larger than 93 characters, it should have the class 'dxRiverContent__items--overflow'", () => {
    let props = {
        ...riverOfContentTestArgs,
        links: [{
            url: "#one",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        }]
    };
    const { getByTestId } = render( <DXRiverOfContent {...props} /> );
    const itemEl = getByTestId( "river-content-item" ).childNodes[0];
    expect( itemEl ).toHaveClass( "dxRiverContent__items--overflow" );
} );

test( "If the item recieved, has a length larger than the character limit, it should render an ellipsis", () => {
    let props = {
        ...riverOfContentTestArgs,
        itemCharLimit: 20,
        links: [{
            url: "#one",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        }]
    };
    const { getByRole } = render( <DXRiverOfContent {...props} /> );
    const itemEl = getByRole( "link", { name: props.links[0].label } );

    expect( itemEl.textContent ).toEqual( "News item up to thre..." );
} );

test( "If headerCharLimit is passed, and the header has a larger length than that value, it should have the class 'dxRiverContent__header--overflow'", () => {
    let props = {
        ...riverOfContentTestArgs,
        header: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,",
        headerCharLimit: 54
    };
    const { container } = render( <DXRiverOfContent {...props} /> );
    const headerEl = container.querySelector( ".dxRiverContent__header" ) as HTMLElement;
    expect( headerEl ).toHaveClass( "dxRiverContent__header--overflow" );
} );

test( "If itemCharLimit is passed, and the item has a larger length than that value, it should have the class 'dxRiverContent__items--overflow'", () => {
    let props = {
        ...riverOfContentTestArgs,
        links: [{
            url: "#one",
            target: "_blank",
            label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. "
        }],
        itemCharLimit: 120
    };
    const { getByTestId } = render( <DXRiverOfContent {...props} /> );
    const itemEl = getByTestId( "river-content-item" ).childNodes[0];
    expect( itemEl ).toHaveClass( "dxRiverContent__items--overflow" );
} );

test( "If no target prop is passed on the only link item, the target should be '_self'", () => {
    let props = {
        ...riverOfContentTestArgs,
        links: [{
            url: "#one",
            label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        }]
    };
    const { getByTestId } = render( <DXRiverOfContent {...props} /> );
    const itemEl = getByTestId( "river-content-item" ).childNodes[0] as HTMLAnchorElement;
    expect( itemEl.target ).toEqual( "_self" );
} );

test( "If an unvalid target prop is passed on the only link item, the target should be '_self'", () => {
    let props = {
        ...riverOfContentTestArgs,
        links: [{
            url: "#one",
            target: "_external",
            label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        }]
    };
    const { getByTestId } = render( <DXRiverOfContent {...props} /> );
    const itemEl = getByTestId( "river-content-item" ).childNodes[0] as HTMLAnchorElement;
    expect( itemEl.target ).toEqual( "_self" );
} );

test( "If a valid target prop is passed on the only link item, the target should be the same", () => {
    let props = {
        ...riverOfContentTestArgs,
        links: [{
            url: "#one",
            target: "_blank",
            label: "News item up to three lines that supports up to 93 chars. In case of more characters, then ellipsis so"
        }]
    };
    const { getByTestId } = render( <DXRiverOfContent {...props} /> );
    const itemEl = getByTestId( "river-content-item" ).childNodes[0] as HTMLAnchorElement;
    expect( itemEl.target ).toEqual( "_blank" );
} );

// Tests for multiple instances
test( "If we have two components with different indexes, if the user clicks on the first one's header, the second should not have the classes 'dxRiverContent--open'", async () => {
    let props1 = {
        ...riverOfContentTestArgs,
        index: 1,
    };
    let props2 = {
        ...riverOfContentTestArgs,
        index: 2,
    };
    const { container } = render( <div><DXRiverOfContent {...props1} /><DXRiverOfContent {...props2} /></div> );
    const headerEl1 = container.querySelector( `#dxRiverContent-${props1.index} .dxRiverContent__header` )?.childNodes[0] as Element;
    await userEvent.click( headerEl1 );
    const component2 = container.querySelector( `#dxRiverContent-${props2.index}` );
    expect( component2 ).not.toHaveClass( "dxRiverContent--open" );
} );

test( "If we have two components with different indexes, if the user clicks on the second one's header, the first should not have the classes 'dxRiverContent--open'", async () => {
    let props1 = {
        ...riverOfContentTestArgs,
        index: 1,
    };
    let props2 = {
        ...riverOfContentTestArgs,
        index: 2,
    };
    const { container } = render( <div><DXRiverOfContent {...props1} /><DXRiverOfContent {...props2} /></div> );
    const headerEl2 = container.querySelector( `#dxRiverContent-${props2.index} .dxRiverContent__header` )?.childNodes[0] as Element;
    await userEvent.click( headerEl2 );
    const component1 = container.querySelector( `#dxRiverContent-${props1.index}` );
    expect( component1 ).not.toHaveClass( "dxRiverContent--open" );
} );

test( "If icon changes when iconClass property is configured", () => {
    render( <DXRiverOfContent {...riverOfContentTestArgs} icons={{
        link: "ci-Arrow_Down_SM"
    }}
        /> );
    expect( screen.getByTestId( "river-header-icon" ) ).toHaveClass( "ci-Arrow_Down_SM" );
} );
