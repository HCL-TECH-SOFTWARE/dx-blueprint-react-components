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
import DXTableOfContents from "./DXTableOfContents";
import { TableArgs } from "./DXTableOfContents.stories";

test( "If items' length is 0, then a message 'No items received' wil show", () => {
    let props = { title: "Table of Contents", items: [] };
    let { getByText } = render( <DXTableOfContents {...props} /> );
    let msg = getByText( "No items received" );
    expect( msg ).toBeInTheDocument();
} );

test( "If items' length is greater than 0, the element 'dxTableContents__first' will be in the document", () => {
    const { container } = render( <DXTableOfContents {...TableArgs} /> );
    const firstLevel = container.querySelector( ".dxTableContents__first" );
    expect( firstLevel ).toBeInTheDocument();
} );

test( "If there is a second level of items, the element 'dxTableContents__second' will be in the document", () => {
    let props = {
        ...TableArgs,
        items: [
            {
                id: "#first-level",
                label: "First level",
                children: [
                    {
                        id: "#second-level",
                        label: "Second level"
                    }
                ]
            }
        ]
    };
    const { container } = render( <DXTableOfContents {...props} /> );
    const secondLevel = container.querySelector( ".dxTableContents__second" );
    expect( secondLevel ).toBeInTheDocument();
} );

test( "If there is a third level of items, the element 'dxTableContents__third' will be in the document", () => {
    let props = {
        ...TableArgs,
        items: [
            {
                id: "#first-level",
                label: "First level",
                children: [
                    {
                        id: "#second-level",
                        label: "Second level",
                        children: [
                            {
                                id: "#third-level",
                                label: "Third level",
                            }
                        ]
                    }
                ]
            }
        ]
    };
    const { container } = render( <DXTableOfContents {...props} /> );
    const thirdLevel = container.querySelector( ".dxTableContents__third" );
    expect( thirdLevel ).toBeInTheDocument();
} );

test( "If the user sent a fourth level, the third level will have only one child", () => {
    let props = {
        ...TableArgs,
        items: [
            {
                id: "#first-level",
                label: "First level",
                children: [
                    {
                        id: "#second-level",
                        label: "Second level",
                        children: [
                            {
                                id: "#third-level",
                                label: "Third level",
                                children: [
                                    {
                                        id: "#fourth-level",
                                        label: "Fourth level",
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
    const { container } = render( <DXTableOfContents {...props} /> );
    const thirdLevel = container.querySelector( ".dxTableContents__third" )?.childNodes;
    expect( thirdLevel ).toHaveLength( 1 );
} );

test( "If firstLevelStyle is not passed, the style by default will be circle", () => {
    let props = {
        ...TableArgs,
        items: [
            {
                id: "#first-level",
                label: "First level",
                children: [
                    {
                        id: "#second-level",
                        label: "Second level"
                    }
                ]
            }
        ]
    };
    const { container } = render( <DXTableOfContents {...props} /> );
    const firstLevel = container.querySelector( ".dxTableContents__first" );
    expect( firstLevel ).toHaveStyle( 'list-style-type: circle' );
} );

test( "If firstLevelStyle is 'upper-roman', that style will be applied", () => {
    let props = {
        ...TableArgs,
        items: [
            {
                id: "#first-level",
                label: "First level",
                children: [
                    {
                        id: "#second-level",
                        label: "Second level"
                    }
                ]
            }
        ],
        firstLevelStyle: "upper-roman"
    };
    const { container } = render( <DXTableOfContents {...props} /> );
    const firstLevel = container.querySelector( ".dxTableContents__first" );
    expect( firstLevel ).toHaveStyle( 'list-style-type: upper-roman' );
} );

test( "If secondLevelStyle is not passed, the style by default will be circle", () => {
    let props = {
        ...TableArgs,
        items: [
            {
                id: "#first-level",
                label: "First level",
                children: [
                    {
                        id: "#second-level",
                        label: "Second level"
                    }
                ]
            }
        ]
    };
    const { container } = render( <DXTableOfContents {...props} /> );
    const secondLevel = container.querySelector( ".dxTableContents__second" );
    expect( secondLevel ).toHaveStyle( 'list-style-type: circle' );
} );

test( "If secondLevelStyle is 'upper-roman', that style will be applied", () => {
    let props = {
        ...TableArgs,
        items: [
            {
                id: "#first-level",
                label: "First level",
                children: [
                    {
                        id: "#second-level",
                        label: "Second level"
                    }
                ]
            }
        ],
        secondLevelStyle: "upper-roman"
    };
    const { container } = render( <DXTableOfContents {...props} /> );
    const secondLevel = container.querySelector( ".dxTableContents__second" );
    expect( secondLevel ).toHaveStyle( 'list-style-type: upper-roman' );
} );

test( "If thirdLevelStyle is not passed, the style by default will be circle", () => {
    let props = {
        ...TableArgs,
        items: [
            {
                id: "#first-level",
                label: "First level",
                children: [
                    {
                        id: "#second-level",
                        label: "Second level",
                        children: [
                            {
                                id: "#third-level",
                                label: "Third level",
                            }
                        ]
                    }
                ]
            }
        ]
    };
    const { container } = render( <DXTableOfContents {...props} /> );
    const thirdLevel = container.querySelector( ".dxTableContents__third" );
    expect( thirdLevel ).toHaveStyle( 'list-style-type: circle' );
} );

test( "If thirdLevelStyle is 'upper-roman', that style will be applied", () => {
    let props = {
        ...TableArgs,
        items: [
            {
                id: "#first-level",
                label: "First level",
                children: [
                    {
                        id: "#second-level",
                        label: "Second level",
                        children: [
                            {
                                id: "#third-level",
                                label: "Third level",
                            }
                        ]
                    }
                ]
            }
        ],
        thirdLevelStyle: "upper-roman"
    };
    const { container } = render( <DXTableOfContents {...props} /> );
    const thirdLevel = container.querySelector( ".dxTableContents__third" );
    expect( thirdLevel ).toHaveStyle( 'list-style-type: upper-roman' );
} );

itSupportsExtensionProps( ( extra ) => <DXTableOfContents {...TableArgs} {...extra} /> );
