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
import { render, screen, within } from "@testing-library/react";
import DXQuickLinks, { QuickLinksProps } from "./DXQuickLinks";

test( "Quicklinks Full Rendering", () => {
    const quickLinks: QuickLinksProps = {
        index: 1,
        title: "Important Links",
        quickLinksCollection:
            [{
                firstHeader: "1st line",
                secondHeader: "2nd line",
                superHeader: "Super head",
                iconClass: "ci-Building_01",
                url: "https://www.hcl-software.com",
                target: "_blank"
            },
            {
                firstHeader: "1st line",
                superHeader: "Super head",
                url: "/home",
                target: "_self"
            }]
    };

    render( <DXQuickLinks {...quickLinks} /> );

    let quickLinkItems = screen.getAllByTestId( "quicklink-item" );

    quickLinkItems.forEach( item => {
        expect( item.parentElement ).toHaveClass( "dxQuickLinks__cell" );
    } );

} );

test( "Quicklinks rendering with partially initialized objects", () => {
    const quickLinks: QuickLinksProps = {
        index: 1,
        title: "Featured Links",
        quickLinksCollection:
            //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
            [{ firstHeader: "title" },
            //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
            { url: "https://hcl-software.com/" }]
    };

    render( <DXQuickLinks {...quickLinks} /> );

    let quickLinkItems = screen.getAllByTestId( "quicklink-item" );
    quickLinkItems.forEach( item => {
        expect( item.parentElement ).toHaveClass( "dxQuickLinks__cell" );
    } );
} );

test( "Quicklinks empty rendering", () => {
    //@ts-ignore: Ignoring warning for constructor missing required props not required by the test
    const quickLinks: QuickLinksProps = {
        index: 0
    };

    const { container } = render( <DXQuickLinks {...quickLinks} /> );
    expect( container ).toBeEmptyDOMElement();

} );

test( "Quicklinks Test icon class name", () => {
    const quickLinks: QuickLinksProps = {
        index: 1,
        quickLinksCollection:
            [{
                firstHeader: "1st line",
                secondHeader: "2nd line",
                superHeader: "Super head",
                url: "https://www.hcl-software.com",
                target: "_blank",
                iconClass: "ci-Search_Magnifying_Glass"
            },
            {
                firstHeader: "1st line",
                superHeader: "Super head",
                url: "/home",
                target: "_top"
            },
            {
                firstHeader: "1st line",
                secondHeader: "2nd line",
                url: "https://www.google.com/",
                target: "_self"
            }]
    };

    render( <DXQuickLinks {...quickLinks} /> );

    let quickLinkItems = screen.getAllByTestId( "quicklink-item" );
    quickLinkItems.forEach( function ( item, index ) {
        expect( item.firstChild ).toHaveClass( quickLinks.quickLinksCollection[index].iconClass || "ci-Link" );
    } );

} );

test( "Quicklinks Test icon class name (for external links)", () => {
    const quickLinks: QuickLinksProps = {
        index: 1,
        quickLinksCollection:
            [{
                firstHeader: "1st line",
                secondHeader: "2nd line",
                superHeader: "Super head",
                url: "https://www.hcl-software.com",
                target: "_blank",
                iconClass: "ci-Search_Magnifying_Glass"
            },
            {
                firstHeader: "1st line",
                secondHeader: "2nd line",
                url: "https://www.google.com/",
                target: "_blank"
            }]
    };

    render( <DXQuickLinks {...quickLinks} /> );

    let quickLinkItems = screen.getAllByTestId( "quicklink-item" );
    quickLinkItems.forEach( function ( item, index ) {
        expect( item.firstChild ).toHaveClass( quickLinks.quickLinksCollection[index].iconClass || "ci-External_Link" );
    } );

} );


test( "if an empty target is passed to a quickLink, it should assign '_self'", () => {
    const quickLinks: QuickLinksProps = {
        index: 1,
        quickLinksCollection:
            [{
                firstHeader: "1st line",
                secondHeader: "2nd line",
                superHeader: "Super head",
                url: "https://www.hcl-software.com",
                target: "",
                iconClass: "ci-House_01"
            },
            {
                firstHeader: "1st line",
                secondHeader: "2nd line",
                url: "https://www.google.com/"
            }]
    };

    render( <DXQuickLinks {...quickLinks} /> );

    let quickLinkItems = screen.getAllByTestId( "quicklink-item" ) as HTMLAnchorElement[];

    quickLinkItems.forEach( item => {
        expect( item.target ).toEqual( "_self" );
    } );
} );


test( "if an invalid target is passed to a quickLink, it should assign '_self'", () => {
    const quickLinks: QuickLinksProps = {
        index: 1,
        quickLinksCollection:
            [{
                firstHeader: "1st line",
                secondHeader: "2nd line",
                superHeader: "Super head",
                url: "https://www.hcl-software.com",
                target: "self",
                iconClass: "ci-House_01"
            },
            {
                firstHeader: "1st line",
                secondHeader: "2nd line",
                url: "https://www.google.com/",
                target: "_new"
            }]
    };

    render( <DXQuickLinks {...quickLinks} /> );

    let quickLinkItems = screen.getAllByTestId( "quicklink-item" ) as HTMLAnchorElement[];

    quickLinkItems.forEach( item => {
        expect( item.target ).toEqual( "_self" );
    } );
} );


test( "if a valid target is passed to a quickLink, said target should be assigned to it", () => {
    const quickLinks: QuickLinksProps = {
        index: 1,
        quickLinksCollection:
            [{
                firstHeader: "1st line",
                secondHeader: "2nd line",
                superHeader: "Super head",
                url: "https://www.hcl-software.com",
                target: "_blank",
                iconClass: "ci-House_01"
            },
            {
                firstHeader: "1st line",
                secondHeader: "2nd line",
                url: "https://www.google.com/",
                target: "_top"
            }]
    };

    render( <DXQuickLinks {...quickLinks} /> );

    let quickLinkItems = screen.getAllByTestId( "quicklink-item" ) as HTMLAnchorElement[];

    quickLinkItems.forEach( function ( item, index ) {
        expect( item.target ).toEqual( quickLinks.quickLinksCollection[index].target );
    } );
} );

test( "if a quickLink is passed with no icon, the default internal icon will show", () => {
    const quickLinks: QuickLinksProps = {
        index: 1,
        quickLinksCollection:
            [{
                firstHeader: "1st line",
                secondHeader: "2nd line",
                superHeader: "Super head",
                url: "https://www.hcl-software.com",
                target: "_self"
            },
            {
                firstHeader: "1st line",
                secondHeader: "2nd line",
                url: "https://www.google.com/",
                target: "_top",
                iconClass: "  "
            },
            {
                firstHeader: "1st line",
                superHeader: "Super head",
                url: "/home",
                iconClass: "",
            }]
    };

    render( <DXQuickLinks {...quickLinks} /> );

    let quickLinkItems = screen.getAllByTestId( "quicklink-item" );

    quickLinkItems.forEach( item => {
        expect( item.firstChild ).toHaveClass( "ci-Link" );
    } );
} );

test( "if an external quicklink with no icon is passed, the default external icon will show", () => {
    const quickLinks: QuickLinksProps = {
        index: 1,
        quickLinksCollection:
            [{
                firstHeader: "1st line",
                secondHeader: "2nd line",
                superHeader: "Super head",
                url: "https://www.hcl-software.com",
                target: "_blank"
            },
            {
                firstHeader: "1st line",
                secondHeader: "2nd line",
                url: "https://www.google.com/",
                target: "_blank",
                iconClass: "  "
            },
            {
                firstHeader: "1st line",
                superHeader: "Super head",
                url: "/home",
                iconClass: "",
                target: "_blank"
            }]
    };

    render( <DXQuickLinks {...quickLinks} /> );

    let quickLinkItems = screen.getAllByTestId( "quicklink-item" );

    quickLinkItems.forEach( item => {
        expect( item.firstChild ).toHaveClass( "ci-External_Link" );
    } );
} );

test( "if an external quicklink with a chosen icon is passed, it should render the selected icon", () => {
    const quickLinks: QuickLinksProps = {
        index: 1,
        quickLinksCollection:
            [{
                firstHeader: "1st line",
                secondHeader: "2nd line",
                superHeader: "Super head",
                url: "https://www.hcl-software.com",
                target: "_blank",
                iconClass: "ci-Building_01"
            }]
    };

    render( <DXQuickLinks {...quickLinks} /> );

    let quickLinkItem = screen.getByTestId( "quicklink-item" ).firstChild;
    expect( quickLinkItem ).toHaveClass( quickLinks.quickLinksCollection[0].iconClass as string );
} );

test( "If a title value is passed (with a false or not specified hideTitle value), it should show it", () => {
    const quickLinks: QuickLinksProps[] = [
        {
            index: 1,
            title: "New Links",
            quickLinksCollection:
                [{
                    firstHeader: "1st line",
                    secondHeader: "2nd line",
                    superHeader: "Super head",
                    url: "https://www.hcl-software.com",
                    target: "_blank",
                    iconClass: "ci-Building_01"
                }]
        },
        {
            index: 2,
            title: "Star Links",
            hideTitle: false,
            quickLinksCollection:
                [{
                    firstHeader: "1st line",
                    secondHeader: "2nd line",
                    url: "https://www.hcl-software.com",
                }]
        }
    ];

    render( <DXQuickLinks {...quickLinks[0]} /> );
    render( <DXQuickLinks {...quickLinks[1]} /> );

    let quickLinkItems = screen.getAllByTestId( "quicklink-header" );
    quickLinkItems.forEach( function ( item, index ) {
        expect( item ).toHaveTextContent( quickLinks[index].title as string );
    } );
} );

test( "If a title value is passed longer than 22 characters, it should be cut off by an ellipsis", () => {
    const quickLinks: QuickLinksProps =
    {
        index: 1,
        title: "These are some featured links",
        quickLinksCollection:
            [{
                firstHeader: "1st line",
                secondHeader: "2nd line",
                superHeader: "Super head",
                url: "https://www.hcl-software.com",
                target: "_blank",
                iconClass: "ci-Search_Magnifying_Glass"
            }]
    };

    render( <DXQuickLinks {...quickLinks} /> );

    let quickLinkItem = screen.getByTestId( "quicklink-header" );
    let cutOffTitle: string = ( quickLinks.title as string ).slice( 0, 19 ) + "...";
    expect( quickLinkItem ).toHaveTextContent( cutOffTitle );
} );

test( "If no title value is passed (with a false or no specified hideTitle value), it should show 'Quick Links'", () => {
    const quickLinks: QuickLinksProps[] = [
        {
            index: 1,
            quickLinksCollection:
                [{
                    firstHeader: "1st line",
                    secondHeader: "2nd line",
                    superHeader: "Super head",
                    url: "https://www.hcl-software.com",
                    target: "_blank"
                }]
        },
        {
            index: 2,
            hideTitle: false,
            quickLinksCollection:
                [{
                    firstHeader: "1st line",
                    url: "https://www.hcl-software.com",
                }]
        }
    ];

    render( <DXQuickLinks {...quickLinks[0]} /> );
    render( <DXQuickLinks {...quickLinks[1]} /> );

    let quickLinkItems = screen.getAllByTestId( "quicklink-header" );
    quickLinkItems.forEach( item => {
        expect( item ).toHaveTextContent( "Quick Links" );
    } );
} );

test( "If hideTitle is marked as true, it won't show the title, regardless of a custom value passed to it", () => {
    const quickLinks: QuickLinksProps[] = [
        {
            index: 1,
            title: "New Links",
            hideTitle: true,
            quickLinksCollection:
                [{
                    firstHeader: "1st line",
                    url: "https://www.hcl-software.com",
                    target: "_blank",
                    iconClass: "ci-Search_Magnifying_Glass"
                }]
        },
        {
            index: 2,
            hideTitle: true,
            quickLinksCollection:
                [{
                    firstHeader: "1st line",
                    secondHeader: "2nd line",
                    superHeader: "Super head",
                    url: "https://www.hcl-software.com",
                    target: "_self",
                    iconClass: "ci-Building_01"
                }]
        }
    ];

    render( <DXQuickLinks {...quickLinks[0]} /> );
    render( <DXQuickLinks {...quickLinks[1]} /> );

    let quickLinkItems = screen.getAllByTestId( "quicklink-container" );
    quickLinkItems.forEach( item => {
        let nonExistentHeader = within( item ).queryByTestId( "quicklink-header" );
        expect( item ).not.toContainElement( nonExistentHeader );
    } );
} );
