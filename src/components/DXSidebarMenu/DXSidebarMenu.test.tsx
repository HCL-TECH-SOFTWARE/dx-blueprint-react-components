import React from "react";
import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import DXSidebarMenu, { SidebarMenuProps } from "./DXSidebarMenu";
import { SidebarMenuArgs } from "./DXSidebarMenu.stories";
import { CardButtonProps } from "../DXCardButton/DXCardButton";

let twoCards = [
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            altText: "image-1"
        },
        header: "Policies & guidelines",
        direction: "right"
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1674471361339-2e1e1dbd3e73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
            altText: "image-1"
        },
        header: "Software licenses",
        direction: "right"
    }] as CardButtonProps[];

describe( "SidebarMenu component", () => {

    test( "Full Rendering SidebarMenu with all the properties filled", () => {
        Object.defineProperties( window.HTMLElement.prototype, {
            offsetWidth: {
                get: function () { return 1200; }
            }
        } );
        const { getByTestId } = render( <DXSidebarMenu {...SidebarMenuArgs} /> );

        expect( getByTestId( "dxSidebarMenu-title" ) ).toBeInTheDocument();
        expect( getByTestId( "dxSidebarMenu-cards" ) ).toBeInTheDocument();
        expect( getByTestId( "dxSidebarMenu-cardInfo" ) ).toBeInTheDocument();
    } );

    test( "Full Rendering SidebarMenu without cards", () => {
        let props = {
            title: "Quick Access",
            card: {
                title: {
                    url: "#amazing",
                    label: "Return to office: COVID-19 Self Assessment",
                },
                cover: {

                    url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
                    altText: "card-cover"
                },
                description: "Understand what can be shared with friends, family and media."
            }
        } as SidebarMenuProps;

        const { getByTestId } = render( <DXSidebarMenu {...props} /> );

        expect( getByTestId( "dxSidebarMenu-title" ) ).toBeInTheDocument();
        expect( getByTestId( "dxSidebarMenu-cardInfo" ) ).toBeInTheDocument();
    } );


    test( "Full Rendering SidebarMenu without cardInfo", () => {
        let propsWihtoutInfo = {
            title: "Quick Access",
            cardButtons: twoCards
        } as SidebarMenuProps;

        const { getByTestId } = render( <DXSidebarMenu {...propsWihtoutInfo} /> );

        expect( getByTestId( "dxSidebarMenu-title" ) ).toBeInTheDocument();
        expect( getByTestId( "dxSidebarMenu-cards" ) ).toBeInTheDocument();
    } );

} );
