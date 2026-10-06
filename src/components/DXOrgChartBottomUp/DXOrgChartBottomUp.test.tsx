import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import DXOrgChartBottomUp from "./DXOrgChartBottomUp";
import { OrgChartBottomUpArgs, OrgChartWithoutImagesArgs } from "./DXOrgChartBottomUp.stories";

describe( "OrgChartBottomUp component", () => {

    test( "Full Rendering OrgChartBottomUp", () => {
        render( <DXOrgChartBottomUp {...OrgChartBottomUpArgs} /> );

        const componentContainer = screen.getByTestId( "dxOrgChartBottomUp" );
        const cards = document.querySelectorAll( '.dxChartCard ' );

        expect( componentContainer ).toBeInTheDocument();
        expect( cards ).toHaveLength( 6 );
    } );

    test( "Full Rendering OrgChartBottomUp, users without image", async () => {
        render( <DXOrgChartBottomUp {...OrgChartWithoutImagesArgs} /> );
        const componentContainer = screen.getByTestId( "dxOrgChartBottomUp" );
        const cards = document.querySelectorAll( '.dxChartCard ' );
        const lastCard = cards[cards.length - 1];

        expect( componentContainer ).toBeInTheDocument();
        expect( lastCard ).toHaveTextContent( "Me" );
        expect( cards ).toHaveLength( 6 );
    } );

} );
