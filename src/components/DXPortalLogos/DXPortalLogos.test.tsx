import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import DXPortalLogos from "./DXPortalLogos";
import { portalLogosDefaultArgs, portalLogosWhithoutSecondaryArgs } from "./DXPortalLogos.stories";

describe( "DirectoryCard component", () => {

    test( "Render Portal Logos component with default properties", () => {
        render( <DXPortalLogos {...portalLogosDefaultArgs} /> );

        expect( screen.getByTestId( "dx-portal-logos" ) ).toBeInTheDocument();
        expect( document.querySelector( ".dxPortalLogos__main" ) ).toBeInTheDocument();
        expect( document.querySelector( 'span' ) ).toBeInTheDocument();
        expect( document.querySelector( ".dxPortalLogos__secondary" ) ).toBeInTheDocument();
    } );

    test( "Render Portal Logos component whitout secondary", () => {
        render( <DXPortalLogos {...portalLogosWhithoutSecondaryArgs} /> );

        expect( screen.getByTestId( "dx-portal-logos" ) ).toBeInTheDocument();
        expect( document.querySelector( ".dxPortalLogos__main" ) ).toBeInTheDocument();
        expect( document.querySelector( 'span' ) ).toBeNull();
        expect( document.querySelector( ".dxPortalLogos__secondary" ) ).not.toBeInTheDocument();
    } );
} );
