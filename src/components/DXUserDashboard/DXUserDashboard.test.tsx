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
import { render } from "@testing-library/react";
import DXUserDashboard from "./DXUserDashboard";

test( "If the user does not pass an utility belt prop the elemen 'dxUserDashboard__icons' will be null", () => {
    let props = {
        title: "Hello Employee",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time",
        image: {
            url: "",
            altText: "Emilio Stevez"
        }
    };
    const { container } = render( <DXUserDashboard {...props} /> );
    let icons = container.querySelector( ".dxUserDashboard__icons" );
    expect( icons ).toBeNull();
} );

test( "If the user does pass an utility belt prop the elemen 'dxUserDashboard__icons' will be in the document", () => {
    let props = {
        title: "Hello Employee",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time",
        image: {
            url: "",
            altText: "Emilio Stevez"
        },
        utilityBelt: {
            items: [
                { title: "App 2", button: { iconClass: "ci-Add_Plus_Circle", label: "Add", onClick: function () {} } },
            ],
        },
    };
    const { container } = render( <DXUserDashboard {...props} /> );
    let icons = container.querySelector( ".dxUserDashboard__icons" );
    expect( icons ).toBeInTheDocument();
} );

test( "If the user does not pass an image, the element 'dxUserDashboard__avatar' will be in the document", () => {
    let props = {
        title: "Hello Employee",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time",
        image: {
            url: "",
            altText: "Emilio Stevez"
        }
    };
    const { container } = render( <DXUserDashboard {...props} /> );
    let avatar = container.querySelector( ".dxUserDashboard__avatar" );
    expect( avatar ).toBeInTheDocument();
} );

test( "If the user does not pass an image url, the avatar will have the altText name's initials", () => {
    let props = {
        title: "Hello Employee",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time",
        image: {
            url: "",
            altText: "Emilio Stevez"
        }
    };
    const { container } = render( <DXUserDashboard {...props} /> );
    let avatar = container.querySelector( ".dxUserDashboard__avatar div" );
    let initial1 = props.image.altText.split( " " )[0][0];
    let initial2 = props.image.altText.split( " " )[1][0];
    expect( avatar?.textContent ).toBe( initial1 + initial2 );
} );

test( "If the user does not pass an image url or altText, the avatar will have the NA initials", () => {
    let props = {
        title: "Hello Employee",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time",
        image: {
            url: ""
        }
    };
    const { container } = render( <DXUserDashboard {...props} /> );
    let avatar = container.querySelector( ".dxUserDashboard__avatar div" );
    expect( avatar?.textContent ).toBe( "NA" );
} );

test( "If the user does pass an image, the element 'dxUserDashboard__image' will be in the document", () => {
    let props = {
        title: "Emilio Stevez",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time",
        image: {
            url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            altText: "profile image"
        },
    };
    const { container } = render( <DXUserDashboard {...props} /> );
    let image = container.querySelector( ".dxUserDashboard__image img" ) as HTMLImageElement;
    expect( image ).toBeInTheDocument();
    expect( image.src ).toBe( props.image.url );
    expect( image.alt ).toBe( props.image.altText );
} );

test( "If the user does pass an image without alt text the default value will be set", () => {
    let props = {
        title: "Emilio Stevez",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time",
        image: {
            url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
        },
    };
    const { container } = render( <DXUserDashboard {...props} /> );
    let image = container.querySelector( ".dxUserDashboard__image img" ) as HTMLImageElement;
    expect( image ).toBeInTheDocument();
    expect( image.src ).toBe( props.image.url );
    expect( image.alt ).toBe( "Profile Picture" );
} );

test( "If the user does not pass an image prop, the element 'dxUserDashboard__image' will be null", () => {
    let props = {
        title: "Emilio Stevez",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time"
    };
    const { container } = render( <DXUserDashboard {...props} /> );
    let image = container.querySelector( ".dxUserDashboard__image" );
    expect( image ).toBeNull();
} );

test( "If the user does pass the hideImage prop, the element 'dxUserDashboard__image' will be null", () => {
    let props = {
        title: "Emilio Stevez",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time",
        image: {
            url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            altText: "profile image"
        },
        hideImage: true
    };
    const { container } = render( <DXUserDashboard {...props} /> );
    let image = container.querySelector( ".dxUserDashboard__image" );
    expect( image ).toBeNull();
} );

// Tests for the vertical prop
test( "If the user does not pass the vertical prop, the component will have the class 'dxUserDashboard'", () => {
    let props = {
        title: "Emilio Stevez",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time",
        image: {
            url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            altText: "profile image"
        },
    };
    const { getByTestId } = render( <DXUserDashboard {...props} /> );
    let component = getByTestId( "user-dashboard" );
    expect( component ).toHaveClass( "dxUserDashboard" );
} );

test( "If the user does pass the vertical prop, the component will have the class 'dxUserDashboard--vertical'", () => {
    let props = {
        title: "Emilio Stevez",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time",
        image: {
            url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            altText: "profile image"
        },
        vertical: true
    };
    const { getByTestId } = render( <DXUserDashboard {...props} /> );
    let component = getByTestId( "user-dashboard" );
    expect( component ).toHaveClass( "dxUserDashboard--vertical" );
} );

// Tests for the align prop
test( "If the user does not pass the align prop for the horizontal component, it will have the class 'dxUserDashboard'", () => {
    let props = {
        title: "Emilio Stevez",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time",
        image: {
            url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            altText: "profile image"
        },
    };
    const { getByTestId } = render( <DXUserDashboard {...props} /> );
    let component = getByTestId( "user-dashboard" );
    expect( component ).toHaveClass( "dxUserDashboard" );
} );

test( "If the user does pass the align prop as left for the horizontal component, it will have the class 'dxUserDashboard left'", () => {
    let props = {
        title: "Emilio Stevez",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time",
        image: {
            url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            altText: "profile image"
        },
        align: "left" as "left"
    };
    const { getByTestId } = render( <DXUserDashboard {...props} /> );
    let component = getByTestId( "user-dashboard" );
    expect( component ).toHaveClass( "dxUserDashboard left" );
} );

test( "If the user does pass the align prop as right for the horizontal component, it will have the class 'dxUserDashboard left'", () => {
    let props = {
        title: "Emilio Stevez",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time",
        image: {
            url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            altText: "profile image"
        },
        align: "right" as "right"
    };
    const { getByTestId } = render( <DXUserDashboard {...props} /> );
    let component = getByTestId( "user-dashboard" );
    expect( component ).toHaveClass( "dxUserDashboard right" );
} );

test( "If the user does pass the align prop as center for the horizontal component, it will have the class 'dxUserDashboard left'", () => {
    let props = {
        title: "Emilio Stevez",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time",
        image: {
            url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            altText: "profile image"
        },
        align: "center" as "center"
    };
    const { getByTestId } = render( <DXUserDashboard {...props} /> );
    let component = getByTestId( "user-dashboard" );
    expect( component ).toHaveClass( "dxUserDashboard center" );
} );

test( "If the user does not pass the align prop for the vertical component, it will have the class 'dxUserDashboard--vertical'", () => {
    let props = {
        title: "Emilio Stevez",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time",
        image: {
            url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            altText: "profile image"
        },
        vertical: true
    };
    const { getByTestId } = render( <DXUserDashboard {...props} /> );
    let component = getByTestId( "user-dashboard" );
    expect( component ).toHaveClass( "dxUserDashboard--vertical" );
} );

test( "If the user does pass the align prop as left for the vertical component, it will have the class 'dxUserDashboard--vertical left'", () => {
    let props = {
        title: "Emilio Stevez",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time",
        image: {
            url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            altText: "profile image"
        },
        vertical: true,
        align: "left" as "left"
    };
    const { getByTestId } = render( <DXUserDashboard {...props} /> );
    let component = getByTestId( "user-dashboard" );
    expect( component ).toHaveClass( "dxUserDashboard--vertical left" );
} );

test( "If the user does pass the align prop as right for the vertical component, it will have the class 'dxUserDashboard--vertical left'", () => {
    let props = {
        title: "Emilio Stevez",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time",
        image: {
            url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            altText: "profile image"
        },
        vertical: true,
        align: "right" as "right"
    };
    const { getByTestId } = render( <DXUserDashboard {...props} /> );
    let component = getByTestId( "user-dashboard" );
    expect( component ).toHaveClass( "dxUserDashboard--vertical right" );
} );

test( "If the user does pass the align prop as center for the vertical component, it will have the class 'dxUserDashboard--vertical left'", () => {
    let props = {
        title: "Emilio Stevez",
        subtitle: "Quality Assurance Manager",
        metadata: "Engineering - Part Time",
        image: {
            url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            altText: "profile image"
        },
        vertical: true,
        align: "center" as "center"
    };
    const { getByTestId } = render( <DXUserDashboard {...props} /> );
    let component = getByTestId( "user-dashboard" );
    expect( component ).toHaveClass( "dxUserDashboard--vertical center" );
} );

itSupportsExtensionProps( ( extra ) => <DXUserDashboard title="Hello Employee" subtitle="Quality Assurance Manager" metadata="Engineering - Part Time" {...extra} /> );
