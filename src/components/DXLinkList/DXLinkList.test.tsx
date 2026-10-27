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
import { render } from "@testing-library/react";
import DXLinkList from "./DXLinkList";
import { manyLinksArgs } from "./DXLinkList.stories";

const links = [
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
    { url: "https://hcl-software.com", label: "CTA Link", target: "_blank" },
];

test( 'if links length is 0 , then a message "There are no links to render" will show up', () => {
    let linkListProps = {
        title: {
            value: "Popular Academic Links",
            type: "semibold"
        },
        links: []
    };
    const { getByText } = render( <DXLinkList {...linkListProps} /> );
    expect( getByText( "There are no links to render" ) ).toBeInTheDocument();
} );

test( "If no links passed, a message 'There are no links to render' will show up", () => {
    let linkListProps = {
        title: {
            value: "Popular Academic Links",
            type: "semibold"
        },
    };
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const { getByText } = render( <DXLinkList {...linkListProps} /> );
    expect( getByText( "There are no links to render" ) ).toBeInTheDocument();
} );

test( "If title type is '' then it should add the class of semibold", () => {
    let linkListProps = {
        title: {
            value: "Popular Academic Links",
            type: ""
        },
        links
    };
    const { getByTestId } = render( <DXLinkList {...linkListProps} /> );
    const title = getByTestId( "linklist-title" );
    expect( title.classList.contains( "semibold" ) ).toBeTruthy();
} );

test( "If title type is semibold then it should add the class of semibold", () => {
    let linkListProps = {
        title: {
            value: "Popular Academic Links",
            type: "semibold"
        },
        links
    };
    const { getByTestId } = render( <DXLinkList {...linkListProps} /> );
    const title = getByTestId( "linklist-title" );
    expect( title.classList.contains( "semibold" ) ).toBeTruthy();
} );

test( "If title type is bold then it should add the class of bold", () => {
    let linkListProps = {
        title: {
            value: "Popular Academic Links",
            type: "bold"
        },
        links
    };
    const { getByTestId } = render( <DXLinkList {...linkListProps} /> );
    const title = getByTestId( "linklist-title" );
    expect( title.classList.contains( "bold" ) ).toBeTruthy();
} );

// TEST Target Logic
test( "If no target passed into the links, the default value should be _self", () => {
    let linkListProps = {
        title: {
            value: "Popular Academic Links",
            type: "bold"
        },
        links: [
            { url: "#", label: "A Link" }
        ]
    };
    const { getByTestId } = render( <DXLinkList {...linkListProps} /> );
    const linkRender = ( getByTestId( "listlink-item" ) as HTMLAnchorElement ).target;
    expect( linkRender ).toEqual( "_self" );
} );


test( "If an empty target passed into the links, the default value should be _self", () => {
    let linkListProps = {
        title: {
            value: "Popular Academic Links",
            type: "bold"
        },
        links: [
            { url: "#", label: "A Link", target: "" }
        ]
    };
    const { getByTestId } = render( <DXLinkList {...linkListProps} /> );
    const linkRender = ( getByTestId( "listlink-item" ) as HTMLAnchorElement ).target;
    expect( linkRender ).toEqual( "_self" );
} );



test( "If an unvalid target passed into the links, the default value should be _self", () => {
    let linkListProps = {
        title: {
            value: "Popular Academic Links",
            type: "bold"
        },
        links: [
            { url: "#", label: "A Link", target: "_tab" }
        ]
    };
    const { getByTestId } = render( <DXLinkList {...linkListProps} /> );
    const linkRender = ( getByTestId( "listlink-item" ) as HTMLAnchorElement ).target;
    expect( linkRender ).toEqual( "_self" );
} );

test( "If a valid target passed into the info links, the value should be same", () => {
    let linkListProps = {
        title: {
            value: "Popular Academic Links",
            type: "bold"
        },
        links: [
            { url: "#", label: "A Link", target: "_self" }
        ]
    };
    const { getByTestId } = render( <DXLinkList {...linkListProps} /> );
    const linkRender = ( getByTestId( "listlink-item" ) as HTMLAnchorElement ).target;
    expect( linkRender ).toEqual( "_self" );
} );

test( "if the url's target is _blank, then an icon should appear", () => {
    let linkListProps = {
        title: {
            value: "Popular Academic Links",
            type: "bold"
        },
        links: [
            { url: "#", label: "A Link", target: "_blank" }
        ]
    };
    const { getByTestId } = render( <DXLinkList {...linkListProps} /> );
    const linkRender = getByTestId( "listlink-item" ).childNodes[1];
    expect( linkRender.nodeName ).toBe( "I" );
} );

// Columns Test
test( "If elementsPerRow is passed, the element 'dxLinkList__grid' should be in the document", () => {
    let linkListProps = {
        title: {
            value: "Popular Academic Links",
            type: "bold"
        },
        links,
        elementsPerRow: 3
    };
    const { container } = render( <DXLinkList {...linkListProps} /> );
    const gridEl = container.querySelector( ".dxLinkList__grid" );
    expect( gridEl ).toBeInTheDocument();
} );

// Test the CTA
test( "If the user does not pass the cta prop inside the title, it will be null", () => {
    let props = {
        title: {
            value: "Popular Academic Links",
            type: "bold"
        },
        links,
    };
    const { container } = render( <DXLinkList {...props} /> );
    let cta = container.querySelector( ".dxLinkList__cta" );
    expect( cta ).toBeNull();
} );

test( "If the user does pass the cta prop inside the title, it will be in the document", () => {
    let props = {
        title: {
            value: "Popular Academic Links",
            type: "bold",
            cta: {
                label: "View all",
                url: "/test"
            }
        },
        links,
    };
    const { container } = render( <DXLinkList {...props} /> );
    let cta = container.querySelector( ".dxLinkList__cta" );
    expect( cta ).toBeInTheDocument();
} );

test( "If the user does not pass a target for the cta, it will be '_self'", () => {
    let props = {
        title: {
            value: "Popular Academic Links",
            type: "bold",
            cta: {
                label: "View all",
                url: "/test"
            }
        },
        links,
    };
    const { container } = render( <DXLinkList {...props} /> );
    let cta = container.querySelector( ".dxLinkList__cta" );
    let target = cta?.getAttribute( "target" );
    expect( target ).toBe( "_self" );
} );

test( "If the user does not pass an invalid target for the cta, it will be '_self'", () => {
    let props = {
        title: {
            value: "Popular Academic Links",
            type: "bold",
            cta: {
                label: "View all",
                url: "/test",
                target: "_solid"
            }
        },
        links,
    };
    const { container } = render( <DXLinkList {...props} /> );
    let cta = container.querySelector( ".dxLinkList__cta" );
    let target = cta?.getAttribute( "target" );
    expect( target ).toBe( "_self" );
} );

test( "If the user does pass a valid target for the cta, it will be applied", () => {
    let props = {
        title: {
            value: "Popular Academic Links",
            type: "bold",
            cta: {
                label: "View all",
                url: "/test",
                target: "_blank"
            }
        },
        links,
    };
    const { container } = render( <DXLinkList {...props} /> );
    let cta = container.querySelector( ".dxLinkList__cta" );
    let target = cta?.getAttribute( "target" );
    expect( target ).toBe( props.title.cta.target );
} );

test( "If the user does not pass an icon, it will be null", () => {
    let props = {
        title: {
            value: "Popular Academic Links",
            type: "bold",
            cta: {
                label: "View all",
                url: "/test",
                target: "_blank"
            }
        },
        links,
    };
    const { container } = render( <DXLinkList {...props} /> );
    let icon = container.querySelector( ".dxLinkList__cta i" );
    expect( icon ).toBeNull();
} );

test( "If the user does pass an icon with no position, it will be first child", () => {
    let props = {
        title: {
            value: "Popular Academic Links",
            type: "bold",
            cta: {
                label: "View all",
                url: "/test",
                target: "_blank",
                icon: {
                    class: "ci-Printer"
                }
            }
        },
        links,
    };
    const { container } = render( <DXLinkList {...props} /> );
    let cta = container.querySelector( ".dxLinkList__cta" );
    let icon = cta?.childNodes[0] as HTMLElement;
    expect( icon.tagName ).toBe( "I" );
} );

test( "If the user does pass an icon with position left, it will be first child", () => {
    let props = {
        title: {
            value: "Popular Academic Links",
            type: "bold",
            cta: {
                label: "View all",
                url: "/test",
                target: "_blank",
                icon: {
                    class: "ci-Printer",
                    position: "left" as "left"
                }
            }
        },
        links,
    };
    const { container } = render( <DXLinkList {...props} /> );
    let cta = container.querySelector( ".dxLinkList__cta" );
    let icon = cta?.childNodes[0] as HTMLElement;
    expect( icon.tagName ).toBe( "I" );
} );

test( "If the user does pass an icon with position right, it will be last child", () => {
    let props = {
        title: {
            value: "Popular Academic Links",
            type: "bold",
            cta: {
                label: "View all",
                url: "/test",
                target: "_blank",
                icon: {
                    class: "ci-Printer",
                    position: "right" as "right"
                }
            }
        },
        links,
    };
    const { container } = render( <DXLinkList {...props} /> );
    let cta = container.querySelector( ".dxLinkList__cta" );
    let icon = cta?.childNodes[cta.childNodes.length - 1] as HTMLElement;
    expect( icon.tagName ).toBe( "I" );
} );

// Test the limits (No Columns)
describe( "Tests for the limits with no Columns", () => {
    test( "If the user does not pass the maxLimitDesktop, there will be rendered 8 elements", () => {
        let props = {
            links: manyLinksArgs,
            title: {
                value: "Popular Academic Links",
                type: "bold"
            },
        };
        const { container } = render( <DXLinkList {...props} /> );
        let elements = container.querySelectorAll( ".dxLinkList__link" );
        expect( elements ).toHaveLength( 8 );
    } );

    test( "If the user does pass the maxLimitDesktop, there will be the same amount of links rendered", () => {
        let props = {
            links: manyLinksArgs,
            title: {
                value: "Popular Academic Links",
                type: "bold"
            },
            maxLimitDesktop: 10
        };
        const { container } = render( <DXLinkList {...props} /> );
        let elements = container.querySelectorAll( ".dxLinkList__link" );
        expect( elements ).toHaveLength( props.maxLimitDesktop );
    } );

    test( "If the user does pass the maxLimitDesktop as 0, all the links passed will be rendered", () => {
        let props = {
            links: manyLinksArgs,
            title: {
                value: "Popular Academic Links",
                type: "bold"
            },
            maxLimitDesktop: 0
        };
        const { container } = render( <DXLinkList {...props} /> );
        let elements = container.querySelectorAll( ".dxLinkList__link" );
        expect( elements ).toHaveLength( props.links.length );
    } );

    test( "On Mobile if the user does not pass the maxLimitMobile, there will be rendered 8 elements", () => {
        // Change the viewport to 500px.
        global.innerWidth = 500;
        // Trigger the window resize event.
        global.dispatchEvent( new Event( 'resize' ) );
        let props = {
            links: manyLinksArgs,
            title: {
                value: "Popular Academic Links",
                type: "bold"
            },
        };
        const { container } = render( <DXLinkList {...props} /> );
        let elements = container.querySelectorAll( ".dxLinkList__link" );
        expect( elements ).toHaveLength( 8 );
    } );

    test( "On Mobile if the user does pass the maxLimitMobile, there will be the same amount of links rendered", () => {
        let props = {
            links: manyLinksArgs,
            title: {
                value: "Popular Academic Links",
                type: "bold"
            },
            maxLimitMobile: 10
        };
        const { container } = render( <DXLinkList {...props} /> );
        let elements = container.querySelectorAll( ".dxLinkList__link" );
        expect( elements ).toHaveLength( props.maxLimitMobile );
    } );

    test( "On Mobile if the user does pass the maxLimitMobile as 0, all the links passed will be rendered", () => {
        let props = {
            links: manyLinksArgs,
            title: {
                value: "Popular Academic Links",
                type: "bold"
            },
            maxLimitMobile: 0
        };
        const { container } = render( <DXLinkList {...props} /> );
        let elements = container.querySelectorAll( ".dxLinkList__link" );
        expect( elements ).toHaveLength( props.links.length );
    } );
} );

describe( "Tests for the limits with Columns", () => {
    test( "If the user does not pass the maxLimitDesktop, there will be rendered 24 elements", () => {
        // Change the viewport to 500px.
        global.innerWidth = 1024;
        // Trigger the window resize event.
        global.dispatchEvent( new Event( 'resize' ) );
        let props = {
            links: manyLinksArgs,
            title: {
                value: "Popular Academic Links",
                type: "bold"
            },
            elementsPerRow: 3
        };
        const { container } = render( <DXLinkList {...props} /> );
        let elements = container.querySelectorAll( ".dxLinkList__rowItem" );
        expect( elements ).toHaveLength( 24 );
    } );

    test( "If the user does pass the maxLimitDesktop as 4, there will be 12 elements rendered", () => {
        let props = {
            links: manyLinksArgs,
            title: {
                value: "Popular Academic Links",
                type: "bold"
            },
            maxLimitDesktop: 4,
            elementsPerRow: 3
        };
        const { container } = render( <DXLinkList {...props} /> );
        let elements = container.querySelectorAll( ".dxLinkList__rowItem" );
        expect( elements ).toHaveLength( props.maxLimitDesktop * props.elementsPerRow );
    } );

    test( "If the user does pass the maxLimitDesktop as 0, all the links will be rendered", () => {
        let props = {
            links: manyLinksArgs,
            title: {
                value: "Popular Academic Links",
                type: "bold"
            },
            elementsPerRow: 3,
            maxLimitDesktop: 0
        };
        const { container } = render( <DXLinkList {...props} /> );
        let elements = container.querySelectorAll( ".dxLinkList__rowItem" );
        expect( elements ).toHaveLength( props.links.length );
    } );

    test( "On Mobile if the user does not pass the maxLimitDesktop, there will be rendered 8 elements", () => {
        // Change the viewport to 500px.
        global.innerWidth = 500;
        // Trigger the window resize event.
        global.dispatchEvent( new Event( 'resize' ) );
        let props = {
            links: manyLinksArgs,
            title: {
                value: "Popular Academic Links",
                type: "bold"
            },
            elementsPerRow: 3
        };
        const { container } = render( <DXLinkList {...props} /> );
        let elements = container.querySelectorAll( ".dxLinkList__rowItem" );
        expect( elements ).toHaveLength( 8 );
    } );

    test( "On Mobile if the user does pass the maxLimitDesktop as 10, there will be 10 elements rendered", () => {
        let props = {
            links: manyLinksArgs,
            title: {
                value: "Popular Academic Links",
                type: "bold"
            },
            maxLimitMobile: 10,
            elementsPerRow: 3
        };
        const { container } = render( <DXLinkList {...props} /> );
        let elements = container.querySelectorAll( ".dxLinkList__rowItem" );
        expect( elements ).toHaveLength( props.maxLimitMobile );
    } );

    test( "On Mobile if the user does pass the maxLimitMobile as 0, all the links will be rendered", () => {
        let props = {
            links: manyLinksArgs,
            title: {
                value: "Popular Academic Links",
                type: "bold"
            },
            elementsPerRow: 3,
            maxLimitMobile: 0
        };
        const { container } = render( <DXLinkList {...props} /> );
        let elements = container.querySelectorAll( ".dxLinkList__rowItem" );
        expect( elements ).toHaveLength( props.links.length );
    } );
} );
