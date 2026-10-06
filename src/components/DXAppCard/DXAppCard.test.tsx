import React from "react";
import '@testing-library/jest-dom';
import { fireEvent, render } from "@testing-library/react";
import DXAppCard from "./DXAppCard";
import userEvent from "@testing-library/user-event";

test( "The component renders correctly", () => {
    let mock = jest.fn();
    let props = {
        media: {
            url: "https://upload.wikimedia.org/wikipedia/commons/3/35/Logo_Messenger_NewBlurple-399x399-1.webp",
            altText: "app-facebook"
        },
        label: "Facebook",
        actionFn: mock
    };
    const { container } = render( <DXAppCard {...props} /> );
    let component = container.querySelector( ".dxAppCard" );
    expect( component ).toBeInTheDocument();
} );

test( "If the user pass an image, it should be rendered", () => {
    let mock = jest.fn();
    let props = {
        media: {
            url: "https://upload.wikimedia.org/wikipedia/commons/3/35/Logo_Messenger_NewBlurple-399x399-1.webp",
            altText: "app-facebook"
        },
        label: "Facebook",
        actionFn: mock
    };
    const { getByTestId } = render( <DXAppCard {...props} /> );
    let img = getByTestId( "app-card-image" );
    expect( img ).toBeInTheDocument();
} );

test( "If the user pass an icon, it should be rendered", () => {
    let mock = jest.fn();
    let props = {
        media: "ci-Printer",
        label: "Facebook",
        actionFn: mock
    };
    const { getByTestId } = render( <DXAppCard {...props} /> );
    let icon = getByTestId( "app-card-icon" );
    expect( icon ).toBeInTheDocument();
} );

test( "If the user clicks on the component, the function should be called", async () => {
    let mock = jest.fn();
    let props = {
        media: "ci-Printer",
        label: "Facebook",
        actionFn: mock
    };
    const { container } = render( <DXAppCard {...props} /> );
    let component = container.querySelector( ".dxAppCard" ) as HTMLElement;
    await userEvent.click( component );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus the component and press the Enter key, the function should be called", () => {
    let mock = jest.fn();
    let props = {
        media: "ci-Printer",
        label: "Facebook",
        actionFn: mock
    };
    const { container } = render( <DXAppCard {...props} /> );
    let component = container.querySelector( ".dxAppCard" ) as HTMLElement;
    fireEvent.keyDown( component, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus the component and press the Space key, the function should be called", () => {
    let mock = jest.fn();
    let props = {
        media: "ci-Printer",
        label: "Facebook",
        actionFn: mock
    };
    const { container } = render( <DXAppCard {...props} /> );
    let component = container.querySelector( ".dxAppCard" ) as HTMLElement;
    fireEvent.keyDown( component, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    expect( mock ).toHaveBeenCalled();
} );

test( "If the user focus the component and press the Escape key, the function should not be called", () => {
    let mock = jest.fn();
    let props = {
        media: "ci-Printer",
        label: "Facebook",
        actionFn: mock
    };
    const { container } = render( <DXAppCard {...props} /> );
    let component = container.querySelector( ".dxAppCard" ) as HTMLElement;
    fireEvent.keyDown( component, {
        key: "Escape",
        code: "Escape",
        keyCode: 23,
        charCode: 23,
    } );
    expect( mock ).not.toHaveBeenCalled();
} );
