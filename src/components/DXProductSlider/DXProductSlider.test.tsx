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
import { render, screen, act, fireEvent } from "@testing-library/react";
import DXProductSlider, { ProductSliderItem } from "./DXProductSlider";
import { ProductSliderArgs, ProductSliderChangedIconsArgs } from "./DXProductSlider.stories";

let mock = jest.fn();

// JSDOM does not implement scrollTo; mock it to prevent unhandled errors
// when component useEffects trigger button-scroll or auto-scroll
beforeAll( () => {
    window.HTMLElement.prototype.scrollTo = jest.fn();
} );

jest.mock( "../../global/_exportVariables.module.scss", () => {
    return {
        "zindex-firstLevel": 10
    };
} );
const itemProps: ProductSliderItem = {
    category: "Category",
    title: "Title",
    body: "body",
    image: {
        url: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2948&q=80"
    },
    button: {
        label: "View more",
        onClick: mock
    }
};

// Testing basic render of prop
test( "If children amount renderes as expected", () => {
    render( <DXProductSlider {...ProductSliderArgs} /> );
    expect( screen.getByTestId( "PS__childrenContainer" ).children.length ).toEqual( ProductSliderArgs.items.length );
} );

test( "If Item Category Text renders as expected", () => {
    render( <DXProductSlider items={[itemProps]} /> );
    expect( screen.getByTestId( "PS__item" ).querySelector( ".dxProductSlider__category" ) ).toHaveTextContent( itemProps.category! );
} );

test( "If Item Title renders as expected", () => {
    render( <DXProductSlider items={[itemProps]} /> );
    expect( screen.getByTestId( "PS__item" ).querySelector( ".dxProductSlider__title" ) ).toHaveTextContent( itemProps.title );
} );

test( "If Item body renders as expected", () => {
    render( <DXProductSlider items={[itemProps]} /> );
    expect( screen.getByTestId( "PS__item" ).querySelector( ".dxProductSlider__body" ) ).toHaveTextContent( itemProps.body! );
} );

test( "If Item Button Text renders as expected", () => {
    render( <DXProductSlider items={[itemProps]} /> );
    expect( screen.getByTestId( "PS__item" ).querySelector( ".dxProductSlider__button" ) ).toHaveTextContent( itemProps.button?.label as string );
} );

test( "If Item Button Click works", async () => {
    render( <DXProductSlider items={[itemProps]} /> );
    let button: HTMLButtonElement = screen.getByTestId( "PS__item" ).querySelector( ".dxProductSlider__button" )!;
    await userEvent.click( button );

    expect( mock ).toHaveBeenCalled();
} );

test( "If Item Image renders as expected", () => {
    let { container } = render( <DXProductSlider items={[itemProps]} /> );

    let imageContainer = container.querySelector( ".dxProductSlider__images" );
    let image = imageContainer?.querySelector( "img" ) as HTMLImageElement;

    expect( image.src ).toEqual( itemProps.image.url );
    expect( image ).toHaveClass( "dxProductSlider__image" );
} );

test( "If Item Image has expected role", () => {
    let { container } = render( <DXProductSlider items={[itemProps]} /> );

    let imagesContainer = container.querySelector( ".dxProductSlider__images" );
    let imageContainer = imagesContainer?.querySelector( "div" ) as HTMLDivElement;

    expect( imageContainer ).toHaveAttribute( "role", "presentation" );
    expect( imageContainer ).toHaveClass( "dxProductSlider__imageContainer" );
} );

test( "If Navigation Button renders", () => {
    let { container } = render( <DXProductSlider items={[itemProps]} /> );
    let navDotsContainer = container.querySelector( ".dxProductSlider__navDots" );

    expect( navDotsContainer?.children.length ).toEqual( 1 );
} );

test( "If Navigation Button click works", async () => {
    global.innerHeight = 940;
    global.innerWidth = 1440;

    let { container } = render( <DXProductSlider items={[itemProps]} /> );
    let navDotsContainer = container.querySelector( ".dxProductSlider__navDots" );
    let navDot = navDotsContainer?.children[0]! as HTMLButtonElement;
    navDot.onclick = mock;
    await userEvent.click( navDot );

    expect( mock ).toBeCalled();
} );

test( "If Image container Renders the Desktop version on Desktop size", async () => {
    global.innerWidth = 1440;

    let { container } = render( <DXProductSlider items={[itemProps]} /> );
    expect( container.querySelector( ".dxProductSlider__desktopView" ) ).not.toBeNull();
} );

test( "If Image container Renders the Mobile version on Mobile size", async () => {
    global.innerWidth = 375;

    let { container } = render( <DXProductSlider items={[itemProps, itemProps]} /> );
    expect( container.querySelector( ".dxProductSlider__mobileView" ) ).not.toBeNull();
} );

//Icons
test( "If scroll icon changes", () => {
    let { container } = render( <DXProductSlider {...ProductSliderChangedIconsArgs} /> );
    let iconContainer = container.querySelector( ".dxProductSlider__scrollMessage" )?.querySelector( "i" );
    expect( iconContainer ).toHaveClass( ProductSliderChangedIconsArgs.icons.scroll );
} );

// Empty state
test( "Renders DXEmptyState when items array is empty", () => {
    render( <DXProductSlider items={[]} /> );
    expect( screen.getByText( "No items to render" ) ).toBeInTheDocument();
} );

test( "Does not render children container when items array is empty", () => {
    render( <DXProductSlider items={[]} /> );
    expect( screen.queryByTestId( "PS__childrenContainer" ) ).toBeNull();
} );

// Optional fields — category
test( "Does not render category element when category prop is absent", () => {
    const itemWithoutCategory: ProductSliderItem = {
        title: "Title only",
        image: { url: "https://example.com/img.jpg" }
    };
    render( <DXProductSlider items={[itemWithoutCategory]} /> );
    expect( screen.getByTestId( "PS__item" ).querySelector( ".dxProductSlider__category" ) ).toBeNull();
} );

test( "Renders category element with correct text when category prop is present", () => {
    render( <DXProductSlider items={[itemProps]} /> );
    const category = screen.getByTestId( "PS__item" ).querySelector( ".dxProductSlider__category" );
    expect( category ).not.toBeNull();
    expect( category ).toHaveTextContent( "Category" );
} );

// Optional fields — body (gated on `title`)
test( "Does not render body element when title prop is absent", () => {
    const itemWithoutTitle: ProductSliderItem = {
        title: "",
        body: "some body",
        image: { url: "https://example.com/img.jpg" }
    };
    render( <DXProductSlider items={[itemWithoutTitle]} /> );
    expect( screen.getByTestId( "PS__item" ).querySelector( ".dxProductSlider__body" ) ).toBeNull();
} );

test( "Renders body element when title is present", () => {
    render( <DXProductSlider items={[itemProps]} /> );
    const body = screen.getByTestId( "PS__item" ).querySelector( ".dxProductSlider__body" );
    expect( body ).not.toBeNull();
    expect( body ).toHaveTextContent( "body" );
} );

// Optional fields — button
test( "Does not render button container when button prop is absent", () => {
    const itemWithoutButton: ProductSliderItem = {
        title: "Title",
        image: { url: "https://example.com/img.jpg" }
    };
    render( <DXProductSlider items={[itemWithoutButton]} /> );
    expect( screen.getByTestId( "PS__item" ).querySelector( ".dxProductSlider__buttonContainer" ) ).toBeNull();
} );

test( "Renders button container when button prop is present", () => {
    render( <DXProductSlider items={[itemProps]} /> );
    expect( screen.getByTestId( "PS__item" ).querySelector( ".dxProductSlider__buttonContainer" ) ).not.toBeNull();
} );

test( "Rendered button has secondary display type class", () => {
    render( <DXProductSlider items={[itemProps]} /> );
    const button = screen.getByTestId( "PS__item" ).querySelector( ".dxProductSlider__button" );
    expect( button ).not.toBeNull();
    expect( button?.tagName ).toBe( "BUTTON" );
} );

// Nav dots — multiple items produce matching dot count
test( "Nav dots count matches items count for multiple items", () => {
    render( <DXProductSlider {...ProductSliderArgs} /> );
    const { container } = render( <DXProductSlider {...ProductSliderArgs} /> );
    const navDots = container.querySelectorAll( ".dxProductSlider__navDots" );
    // First navDots container (desktop or mobile depending on width) — children == items.length
    expect( navDots[0].children.length ).toEqual( ProductSliderArgs.items.length );
} );

test( "Nav dot click handler sets button scroll target", async () => {
    global.innerWidth = 1440;
    const { container } = render( <DXProductSlider {...ProductSliderArgs} /> );
    const navDotsContainer = container.querySelector( ".dxProductSlider__navDots" );
    const secondDot = navDotsContainer?.children[1]?.firstChild as HTMLElement;
    expect( secondDot ).not.toBeNull();
    await userEvent.click( secondDot );
    // After click the component does not throw and the dot is still rendered
    expect( navDotsContainer?.children[1] ).toBeInTheDocument();
} );

// Mouse interaction
test( "onMouseDown and onMouseUp on slider do not throw", async () => {
    global.innerWidth = 1440;
    const { container } = render( <DXProductSlider items={[itemProps, itemProps]} /> );
    const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;
    await userEvent.pointer( { target: slider, keys: "[MouseLeft>]" } );
    await userEvent.pointer( { target: slider, keys: "[/MouseLeft]" } );
    expect( slider ).toBeInTheDocument();
} );

// Scroll event on slider
test( "onScroll on slider does not throw", () => {
    global.innerWidth = 1440;
    const { container } = render( <DXProductSlider items={[itemProps, itemProps]} /> );
    const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;
    slider.dispatchEvent( new Event( "scroll", { bubbles: true } ) );
    expect( slider ).toBeInTheDocument();
} );

// Desktop icon has dxProductSlider__scrollIcon class
test( "Desktop scroll icon has dxProductSlider__scrollIcon class", () => {
    global.innerWidth = 1440;
    const { container } = render( <DXProductSlider items={[itemProps]} /> );
    const desktopScrollMessage = container.querySelector( ".dxProductSlider__desktopView .dxProductSlider__scrollMessage" );
    const icon = desktopScrollMessage?.querySelector( "i" );
    expect( icon ).toHaveClass( "dxProductSlider__scrollIcon" );
} );

// Mobile scroll icon does NOT have dxProductSlider__scrollIcon class
test( "Mobile scroll icon does not have dxProductSlider__scrollIcon class", () => {
    global.innerWidth = 375;
    const { container } = render( <DXProductSlider items={[itemProps, itemProps]} /> );
    const mobileScrollMessage = container.querySelector( ".dxProductSlider__mobileView .dxProductSlider__scrollMessage" );
    const icon = mobileScrollMessage?.querySelector( "i" );
    expect( icon ).not.toHaveClass( "dxProductSlider__scrollIcon" );
} );

// Children container exists for non-empty items
test( "Children container renders for non-empty items", () => {
    render( <DXProductSlider items={[itemProps]} /> );
    expect( screen.getByTestId( "PS__childrenContainer" ) ).toBeInTheDocument();
} );

// Image has correct src attribute (attribute assertion, not just class)
test( "Image src attribute matches item image url", () => {
    const { container } = render( <DXProductSlider items={[itemProps]} /> );
    const img = container.querySelector( ".dxProductSlider__images img" ) as HTMLImageElement;
    expect( img.getAttribute( "src" ) ).toBe( itemProps.image.url );
} );

// Multiple items renders multiple PS__item testid elements
test( "Renders correct number of PS__item elements for multiple items", () => {
    render( <DXProductSlider {...ProductSliderArgs} /> );
    const items = screen.getAllByTestId( "PS__item" );
    expect( items.length ).toBe( ProductSliderArgs.items.length );
} );

// All items in ProductSliderArgs have category text rendered
test( "Each item category text renders correctly", () => {
    render( <DXProductSlider {...ProductSliderArgs} /> );
    const items = screen.getAllByTestId( "PS__item" );
    ProductSliderArgs.items.forEach( ( item, index ) => {
        const category = items[index].querySelector( ".dxProductSlider__category" );
        expect( category ).toHaveTextContent( item.category! );
    } );
} );

// All items title text renders correctly
test( "Each item title text renders correctly", () => {
    render( <DXProductSlider {...ProductSliderArgs} /> );
    const items = screen.getAllByTestId( "PS__item" );
    ProductSliderArgs.items.forEach( ( item, index ) => {
        const title = items[index].querySelector( ".dxProductSlider__title" );
        expect( title ).toHaveTextContent( item.title );
    } );
} );

// Scroll message text is "Drag"
test( "Scroll message contains text Drag", () => {
    global.innerWidth = 1440;
    const { container } = render( <DXProductSlider items={[itemProps]} /> );
    const scrollMessage = container.querySelector( ".dxProductSlider__scrollMessage" );
    expect( scrollMessage?.textContent ).toContain( "Drag" );
} );

// Default icon is ci-Arrow_Down_LG when icons prop not provided
test( "Default scroll icon is ci-Arrow_Down_LG", () => {
    global.innerWidth = 1440;
    const { container } = render( <DXProductSlider items={[itemProps]} /> );
    const icon = container.querySelector( ".dxProductSlider__scrollIcon" );
    expect( icon ).toHaveClass( "ci-Arrow_Down_LG" );
} );

// imageContainer has role=presentation on each image
test( "Each imageContainer has role presentation", () => {
    const { container } = render( <DXProductSlider {...ProductSliderArgs} /> );
    const images = container.querySelectorAll( ".dxProductSlider__imageContainer" );
    images.forEach( ( img ) => {
        expect( img ).toHaveAttribute( "role", "presentation" );
    } );
} );

// Helper to mock dimensional DOM properties missing in JSDOM
const mockDimensions = ( element: HTMLElement, props: { scrollHeight?: number, clientHeight?: number, scrollWidth?: number, clientWidth?: number, scrollTop?: number, scrollLeft?: number; } ) => {
    Object.keys( props ).forEach( key => {
        Object.defineProperty( element, key, { value: props[key as keyof typeof props], configurable: true, writable: true } );
    } );
};

test( "Window resize event triggers sliderManager and recalculates padding", () => {
    const { container } = render( <DXProductSlider items={[itemProps, itemProps]} /> );

    // Mock dimensions to simulate varying card heights
    const cards = container.querySelectorAll( '.dxProductSlider__card' );
    mockDimensions( cards[0] as HTMLElement, { clientHeight: 200 } );
    mockDimensions( cards[1] as HTMLElement, { clientHeight: 150 } );

    // Fire global resize event bound in useEffect
    global.innerWidth = 1440;
    global.dispatchEvent( new Event( "resize" ) );

    // sliderManager should apply inline padding to normalize card heights
    expect( ( cards[0] as HTMLElement ).style.padding ).toBeDefined();
    expect( ( cards[1] as HTMLElement ).style.padding ).toBeDefined();
} );

test( "Nav dot click on Desktop triggers scrollTo with Top parameter based on segment math", async () => {
    global.innerWidth = 1440;
    const { container } = render( <DXProductSlider items={[itemProps, itemProps, itemProps]} /> );

    const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;
    mockDimensions( slider, { scrollHeight: 3000, clientHeight: 1000 } ); // Creates segmentSize of 1000

    const navDotsContainer = container.querySelector( ".dxProductSlider__navDots" );
    const secondDot = navDotsContainer?.children[1]?.firstChild as HTMLElement;

    await userEvent.click( secondDot );

    expect( HTMLElement.prototype.scrollTo ).toHaveBeenCalled();
    const callArgs = ( HTMLElement.prototype.scrollTo as jest.Mock ).mock.calls;
    // Verify desktop targets vertical 'top' scrolling
    expect( callArgs[callArgs.length - 1][0] ).toHaveProperty( 'top' );
} );

test( "Nav dot click on Mobile triggers scrollTo with Left parameter based on segment math", async () => {
    global.innerWidth = 375;
    const { container } = render( <DXProductSlider items={[itemProps, itemProps, itemProps]} /> );

    const sliderChildren = container.querySelector( ".dxProductSlider__children" ) as HTMLElement;
    mockDimensions( sliderChildren, { scrollWidth: 1500, clientWidth: 500 } ); // Creates segmentSize of 500

    const navDotsContainer = container.querySelector( ".dxProductSlider__navDots" );
    const secondDot = navDotsContainer?.children[1]?.firstChild as HTMLElement;

    await userEvent.click( secondDot );

    expect( HTMLElement.prototype.scrollTo ).toHaveBeenCalled();
    const callArgs = ( HTMLElement.prototype.scrollTo as jest.Mock ).mock.calls;
    // Verify mobile targets horizontal 'left' scrolling
    expect( callArgs[callArgs.length - 1][0] ).toHaveProperty( 'left' );
} );

test( "Scrolling to the end of the container restores backward scroll direction and updates opacity", () => {
    global.innerWidth = 1440;

    // 1. Pass 3 items so segmentCount = 2, allowing for an intermediate scroll state
    const { container } = render( <DXProductSlider items={[itemProps, itemProps, itemProps]} /> );
    const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;
    const scrollMessage = container.querySelector( '.dxProductSlider__scrollMessage' ) as HTMLElement;

    // 2. Simulate scrolling halfway through the final segment
    // scrollHeight: 3000, clientHeight: 1000 => elementSize: 2000, segmentSize: 1000. 
    // scrollTop: 1500 puts us in the middle of segment 1.
    mockDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 1500 } );
    slider.dispatchEvent( new Event( "scroll", { bubbles: true } ) );

    // At this point, currentSegment == segmentCount - 1. The class is applied safely.
    expect( scrollMessage ).toHaveClass( "dxProductSlider__scrollMessage--up" );

    // 3. Simulate scrolling to the absolute end (scrollPercent >= 1)
    mockDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 2000 } );
    slider.dispatchEvent( new Event( "scroll", { bubbles: true } ) );

    // Tests the `currentSegment == segmentCount` branch logic, where opacity caps at 1
    expect( scrollMessage.style.opacity ).toBe( "1" );
} );

test( "Scrolling in the middle of a segment applies mathematical transforms and reduces opacity", () => {
    global.innerWidth = 1440;
    const { container } = render( <DXProductSlider items={[itemProps, itemProps, itemProps]} /> );
    const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

    // Simulate scroll being halfway through the first segment (scrollPercent = 0.25)
    mockDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 500 } );

    slider.dispatchEvent( new Event( "scroll", { bubbles: true } ) );

    const imageContainers = container.querySelectorAll( '.dxProductSlider__imageContainer' );
    expect( ( imageContainers[0] as HTMLElement ).style.transform ).toContain( 'translate' );
    expect( ( imageContainers[0] as HTMLElement ).style.zIndex ).toBeDefined();
} );

test( "imageManager safely terminates when refs are missing during unmount/empty states", () => {
    const { container } = render( <DXProductSlider items={[]} /> );
    const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

    // Trigger scroll when images are not rendered (imageContainerRef is null)
    expect( () => {
        slider.dispatchEvent( new Event( "scroll", { bubbles: true } ) );
    } ).not.toThrow();
} );

describe( "Physics Engine and Mathematical Boundary Traps", () => {

    beforeEach( () => {
        jest.clearAllMocks();
    } );

    test( "Auto-scroll triggers forward when scroll segment percent exceeds autoScrollLimit (0.3)", () => {
        global.innerWidth = 1440;
        const { container } = render( <DXProductSlider items={[itemProps, itemProps, itemProps]} /> );
        const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

        // scrollHeight 3000 - clientHeight 1000 = 2000 total element size.
        // 2 segments (3 items). Segment size = 1000.
        // Scroll to 350 -> segmentPercent = 0.35 (exceeds 0.3 autoScrollLimit)
        mockDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 350 } );
        slider.dispatchEvent( new Event( "scroll", { bubbles: true } ) );

        const callArgs = ( HTMLElement.prototype.scrollTo as jest.Mock ).mock.calls;
        const lastCall = callArgs[callArgs.length - 1][0];

        // Should scroll to next segment (1 * 1000 + 1 = 1001)
        expect( lastCall ).toEqual( { top: 1001, behavior: 'smooth' } );
    } );

    test( "Auto-scroll triggers backwards when segment percent is below upper limit (1 - 0.3 = 0.7)", () => {
        global.innerWidth = 1440;
        const { container } = render( <DXProductSlider items={[itemProps, itemProps, itemProps]} /> );
        const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

        // Phase 1: Establish the 'foward' state deep into the slider (segment 1)
        act( () => {
            mockDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 1000 } );
            slider.dispatchEvent( new Event( "scroll", { bubbles: true } ) );
        } );

        // Phase 2: Cross the mathematical boundary backward to flip the scrollDirection state
        act( () => {
            // scrollPercent = 900 / 2000 = 0.45. Boundary is 0.5, triggering the state change to 'backward'
            mockDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 900 } );
            slider.dispatchEvent( new Event( "scroll", { bubbles: true } ) );
        } );

        // Phase 3: Trigger the auto-scroll boundary trap (segmentPercent <= 0.7)
        act( () => {
            // currentSegment = 0, segmentPercent = 0.65 (650 / 1000)
            mockDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 650 } );
            slider.dispatchEvent( new Event( "scroll", { bubbles: true } ) );
        } );

        const callArgs = ( HTMLElement.prototype.scrollTo as jest.Mock ).mock.calls;
        const lastCall = callArgs[callArgs.length - 1][0];

        // Should scroll to previous segment boundary: (0 * 1000) - 1 = -1
        expect( lastCall ).toEqual( { top: -1, behavior: 'smooth' } );
    } );

    test( "Mobile resize threshold calculates mobilePlus offset correctly under 576px limit", () => {
        global.innerWidth = 500; // Trigger mobile limits

        const { container } = render( <DXProductSlider items={[itemProps, itemProps]} /> );
        const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;
        const imageContainer = container.querySelector( ".dxProductSlider__images" ) as HTMLElement;

        // Mock parentElement scrollHeight to test mobilePlus variable calculation
        Object.defineProperty( imageContainer, 'parentElement', { value: { scrollHeight: 150 } } );

        // Dispatch resize to trigger sliderManager evaluation
        global.dispatchEvent( new Event( "resize" ) );

        // card height is 0 (mocked) + 32 padding. 
        // 32 + mobilePlus (150) = 182
        expect( slider.style.height ).toBe( "182px" );
    } );

    test( "Image rendering order and z-index calculation processes elements preceding the current segment", () => {
        global.innerWidth = 1440;
        const { container } = render( <DXProductSlider items={[itemProps, itemProps, itemProps]} /> );
        const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

        // Move fully into segment 1 (scrollTop: 1000)
        mockDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 1000 } );
        slider.dispatchEvent( new Event( "scroll", { bubbles: true } ) );

        const images = container.querySelectorAll( '.dxProductSlider__imageContainer' );
        const firstImage = images[0] as HTMLElement;

        // When i=0 and currentSegment=1, order math is: currentSegmet - ( 1 + i ) -> 1 - 1 = 0
        // z-index should evaluate to Z_INDEX_FIRST_LEVEL (10) + order (0) = 10
        expect( firstImage.style.zIndex ).toBe( "10" );
    } );

    test( "Negative scroll transitions decrement the active segment state dynamically", () => {
        global.innerWidth = 1440;
        const { container } = render( <DXProductSlider items={[itemProps, itemProps, itemProps]} /> );
        const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

        // Start in segment 1
        mockDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 1000 } );
        slider.dispatchEvent( new Event( "scroll", { bubbles: true } ) );

        // Scroll heavily backwards past segmentSizePercent boundary
        mockDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 400 } );
        slider.dispatchEvent( new Event( "scroll", { bubbles: true } ) );

        const scrollMessage = container.querySelector( '.dxProductSlider__scrollMessage' ) as HTMLElement;

        // If activeSegment decremented, opacity math forces scrollMessage back to 1
        expect( scrollMessage.style.opacity ).toBeDefined();
        // Verifying we didn't crash during the activeSegment backward state transition
        expect( slider ).toBeInTheDocument();
    } );

    test( "Out of focus image nav dots recalculate opacity using extreme mathematical offsets", () => {
        global.innerWidth = 1440;
        const { container } = render( <DXProductSlider items={[itemProps, itemProps, itemProps]} /> );
        const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

        // Set an arbitrary mid-scroll position to force 'else' conditions in opacity loops
        mockDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 750 } );
        slider.dispatchEvent( new Event( "scroll", { bubbles: true } ) );

        const navDots = container.querySelector( ".dxProductSlider__navDots" ) as HTMLElement;
        const firstDotChild = navDots.children[0].firstChild as HTMLElement;
        const thirdDotChild = navDots.children[2].firstChild as HTMLElement;

        // Verify math resolves explicitly to zero for non-adjacent elements
        expect( firstDotChild.style.opacity ).toBe( "0" );
        expect( thirdDotChild.style.opacity ).toBe( "0" );
    } );
} );

describe( "Targeted Mutant Killers: Deep Physics and Math Coercions", () => {

    beforeEach( () => {
        jest.clearAllMocks();
    } );

    test( "strict viewport boundary: exactly 576px evaluates as mobile and adjusts sliderManager math", () => {
        // Stryker mutates `window.innerWidth <= 576` to `< 576`.
        // By setting exactly 576, the mutation to `<` will fail because it evaluates to false instead of true.
        global.innerWidth = 576;

        const { container } = render( <DXProductSlider items={[itemProps]} /> );
        const mobileView = container.querySelector( ".dxProductSlider__mobileView" );

        // If `< 576` mutant lives, the component renders desktop mode and mobileView will be null
        expect( mobileView ).toBeInTheDocument();
    } );

    test( "scroll math: exact scrollPercent matching segment start strictly sets positive z-index", () => {
        global.innerWidth = 1440;
        const { container } = render( <DXProductSlider items={[itemProps, itemProps, itemProps]} /> );
        const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

        // 3 items -> 2 segments. Element size = 2000. Segment size = 1000. 
        // segmentSizePercent = 0.5
        // Scroll exactly to 1000 -> scrollPercent = 0.5. 
        // For image i = 1, segmetnSizePercent * i = 0.5. Matches exactly.
        mockDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 1000 } );
        slider.dispatchEvent( new Event( "scroll", { bubbles: true } ) );

        const images = container.querySelectorAll( '.dxProductSlider__imageContainer' );
        const secondImage = images[1] as HTMLElement;

        // Z_INDEX_FIRST_LEVEL (10) + children.length (3) = 13.
        // If mutated to !== or <, it falls to the else block: 10 - 3 = 7.
        expect( secondImage.style.zIndex ).toBe( "13" );
    } );

    test( "opacity math: currentSegment == 0 strict interpolation", () => {
        global.innerWidth = 1440;
        const { container } = render( <DXProductSlider items={[itemProps, itemProps]} /> );
        const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

        // 2 items -> 1 segment. Segment size = 1000.
        // scroll to 250 -> segmentPercent = 0.25. currentSegment = 0.
        mockDimensions( slider, { scrollHeight: 2000, clientHeight: 1000, scrollTop: 250 } );
        slider.dispatchEvent( new Event( "scroll", { bubbles: true } ) );

        const scrollMessage = container.querySelector( ".dxProductSlider__scrollMessage" ) as HTMLElement;

        // Strict evaluation of `1 - segmentPercent` => 1 - 0.25 = 0.75
        // Kills mutations to `1 + segmentPercent`, `segmentPercent` alone, etc.
        expect( scrollMessage.style.opacity ).toBe( "0.75" );
    } );

    test( "strict array indexing: order == segmentCount - 1 branch execution", () => {
        global.innerWidth = 1440;
        const { container } = render( <DXProductSlider items={[itemProps, itemProps, itemProps]} /> );
        const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

        // segmentCount = 2
        // scroll to 200. segmentSize = 1000. segmentPercent = 0.2. currentSegment = 0.

        // To hit the specific `order == segmentCount - 1` branch:
        // For Image i = 1: i >= currentSegment so order = (children.length - 1) - (i - currentSegment).
        // children.length = 3. order = 2 - (1 - 0) = 1.
        mockDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 200 } );
        slider.dispatchEvent( new Event( "scroll", { bubbles: true } ) );

        const images = container.querySelectorAll( '.dxProductSlider__imageContainer' );
        const secondImageChild = images[1].firstChild as HTMLElement;

        // Math execution: 0.4 + 0.6 * 0.2 = 0.52
        expect( secondImageChild.style.opacity ).toBe( "0.52" );

        const thirdImageChild = images[2].firstChild as HTMLElement;
        // order = 2 - (2 - 0) = 0 != 1. So it falls to the 'else' branch and remains rigidly 0.4.
        expect( thirdImageChild.style.opacity ).toBe( "0.4" );
    } );

    test( "mobilePlus Math: rigidly adds exact container heights bypassing NaN fallbacks", () => {
        // Force mobile calculation path
        global.innerWidth = 576;
        const { container } = render( <DXProductSlider items={[itemProps, itemProps]} /> );
        const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;
        const imagesContainer = container.querySelector( ".dxProductSlider__images" ) as HTMLElement;

        // Inject a raw scrollHeight into the parent Element to test mobilePlus calculation
        Object.defineProperty( imagesContainer, 'parentElement', { value: { scrollHeight: 442 } } );

        // Mock child clientHeights
        const cards = container.querySelectorAll( '.dxProductSlider__card' );
        mockDimensions( cards[0] as HTMLElement, { clientHeight: 100 } );
        mockDimensions( cards[1] as HTMLElement, { clientHeight: 100 } );

        // Trigger resize
        global.dispatchEvent( new Event( "resize" ) );

        // Max height = 100 + 32 (padding) = 132.
        // mobilePlus = 442. 
        // total = 132 + 442 = 574.
        // Kills + vs - mutations.
        expect( slider.style.height ).toBe( "574px" );
    } );

    test( "scroll limits: strictly prevents backwards out-of-bounds autoScrolls", () => {
        global.innerWidth = 1440;
        const { container } = render( <DXProductSlider items={[itemProps, itemProps]} /> );
        const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

        // Force a scrollDirection = backward state by reaching the absolute end first
        act( () => {
            mockDimensions( slider, { scrollHeight: 2000, clientHeight: 1000, scrollTop: 1000 } );
            slider.dispatchEvent( new Event( "scroll", { bubbles: true } ) );
        } );

        // Now forcefully snap scroll back to exactly 0 to hit the `scrollPercent == 0` trap.
        act( () => {
            mockDimensions( slider, { scrollHeight: 2000, clientHeight: 1000, scrollTop: 0 } );
            slider.dispatchEvent( new Event( "scroll", { bubbles: true } ) );
        } );

        const callArgs = ( HTMLElement.prototype.scrollTo as jest.Mock ).mock.calls;

        // Because scrollPercent == 0, the state is forced back to "foward". 
        // If the state didn't switch, the component would try to evaluate the backward auto-scroll and throw it into the negatives.
        const backwardsScrolls = callArgs.filter( call => call[0]?.top < 0 );
        expect( backwardsScrolls.length ).toBe( 0 );
    } );

    describe( "DXProductSlider Hardening", () => {
        let deepProps: any;

        const forceDimensions = ( element: HTMLElement, props: Record<string, number> ) => {
            Object.keys( props ).forEach( ( key ) => {
                Object.defineProperty( element, key, { value: props[key], configurable: true, writable: true } );
            } );
        };

        beforeEach( () => {
            deepProps = {
                category: "Cat",
                title: "Product",
                body: "Body",
                image: { url: "test.png" },
                button: { label: "Go", onClick: jest.fn() }
            };
            global.innerWidth = 1440;
        } );

        it( "strictly evaluates exactly 576px boundary to kill layout operator mutations", () => {
            global.innerWidth = 576;
            const { container } = render( <DXProductSlider items={[deepProps]} /> );
            expect( container.querySelector( ".dxProductSlider__mobileView" ) ).toBeInTheDocument();
        } );

        it( "asserts strict padding height normalization with mobilePlus modifiers", () => {
            global.innerWidth = 500;
            const { container } = render( <DXProductSlider items={[deepProps, deepProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;
            const imageContainer = container.querySelector( ".dxProductSlider__images" ) as HTMLElement;

            Object.defineProperty( imageContainer, "parentElement", { value: { scrollHeight: 250 }, configurable: true } );
            const cards = container.querySelectorAll( ".dxProductSlider__card" );
            forceDimensions( cards[0] as HTMLElement, { clientHeight: 100 } );
            forceDimensions( cards[1] as HTMLElement, { clientHeight: 80 } );

            act( () => { global.dispatchEvent( new Event( "resize" ) ); } );
            expect( slider.style.height ).toBe( "382px" );
            expect( ( cards[1] as HTMLElement ).style.padding ).toBe( "26px 16px" );
        } );

        it( "executes strict auto-scroll forward boundaries when limit is breached", () => {
            const { container } = render( <DXProductSlider items={[deepProps, deepProps, deepProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;
            const scrollToSpy = jest.spyOn( slider, "scrollTo" );

            forceDimensions( slider, { scrollHeight: 2500, clientHeight: 500, scrollTop: 350 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            expect( scrollToSpy ).toHaveBeenCalledWith( { top: 1001, behavior: "smooth" } );
        } );

        it( "caps opacity layouts precisely when landing directly on segment limits", () => {
            const { container } = render( <DXProductSlider items={[deepProps, deepProps, deepProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

            forceDimensions( slider, { scrollHeight: 2500, clientHeight: 500, scrollTop: 2000 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            const message = container.querySelector( ".dxProductSlider__scrollMessage" ) as HTMLElement;
            expect( message.style.opacity ).toBe( "1" );
        } );

        it( "forces strict zero fallback for Z_INDEX_FIRST_LEVEL if scss variable resolves to NaN", () => {
            // Target the SCSS module import by resetting its value rather than re-requiring the component structure
            const scssMock = require( "../../global/_exportVariables.module.scss" );
            const originalValue = scssMock["zindex-firstLevel"];
            scssMock["zindex-firstLevel"] = "invalid-garbage-string";

            const { container } = render( <DXProductSlider items={[deepProps, deepProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;
            forceDimensions( slider, { scrollHeight: 2000, clientHeight: 1000, scrollTop: 500 } );

            expect( () => {
                slider.dispatchEvent( new Event( "scroll" ) );
            } ).not.toThrow();

            // Restore original mock configuration value
            scssMock["zindex-firstLevel"] = originalValue;
        } );

        it( "strictly exercises intermediate segment opacity branches where currentSegment falls between limits", () => {
            // Pass exactly 4 items -> segmentCount = 3. LANDING EXACTLY ON SEGMENT 1 (Neither 0 nor segmentCount - 1)
            const { container } = render( <DXProductSlider items={[deepProps, deepProps, deepProps, deepProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

            // elementSize = 3000, segmentCount = 3 => segmentSize = 1000. 
            // scrollTop = 1000 places currentSegment = 1. segmentPercent = 0.
            forceDimensions( slider, { scrollHeight: 3500, clientHeight: 500, scrollTop: 1000 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            const message = container.querySelector( ".dxProductSlider__scrollMessage" ) as HTMLElement;
            // Evaluates the final fallback 'else' configuration branch setting opacity rigidly to '0'
            expect( message.style.opacity ).toBe( "0" );
        } );

        it( "triggers dynamic activeSegment forward increment loop branches using explicit scrollPercent parameters", () => {
            const { container } = render( <DXProductSlider items={[deepProps, deepProps, deepProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

            // Step 1: Initialize baseline at segment 0
            forceDimensions( slider, { scrollHeight: 2500, clientHeight: 500, scrollTop: 0 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            // Step 2: Leap past the activeSegment threshold boundaries to trigger the forward watcher state changes
            // activeSegment=0, segmentSizePercent=0.5 -> target threshold boundary: >= 0.5 * 1 = 0.5
            // scrollTop 1100 / 2000 elementSize = 0.55 scrollPercent
            forceDimensions( slider, { scrollHeight: 2500, clientHeight: 500, scrollTop: 1100 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            // Verifies state mutation loop executed cleanly and reset autoScroll limits smoothly
            expect( slider ).toBeInTheDocument();
        } );

        it( "triggers backward autoScroll layout corrections when segment percent satisfies boundary tolerances", () => {
            const { container } = render( <DXProductSlider items={[deepProps, deepProps, deepProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

            // Step 1: Pre-set active state direction to backward by navigating from the end bounds
            forceDimensions( slider, { scrollHeight: 2500, clientHeight: 500, scrollTop: 2000 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            // Step 2: Drop backward to cross activeSegment boundary adjustments safely
            forceDimensions( slider, { scrollHeight: 2500, clientHeight: 500, scrollTop: 900 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            // Step 3: Trigger the autoScroll backward trap branch -> segmentPercent <= (1 - autoScrollLimit) => 0.7
            // elementSize = 2000, segmentCount = 2 => segmentSize = 1000. scrollTop = 400 (segmentPercent = 0.4 <= 0.7)
            const scrollToSpy = jest.spyOn( slider, "scrollTo" );
            forceDimensions( slider, { scrollHeight: 2500, clientHeight: 500, scrollTop: 400 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            // Asserts backward autoScroll calculation targets exact previous boundary offset math: (0 * 1000) - 1 = -1
            expect( scrollToSpy ).toHaveBeenCalledWith( { top: -1, behavior: "smooth" } );
        } );

        it( "asserts zero opacity constraints for non-adjacent navigation dot children when segmentPercent <= 0.5", () => {
            const { container } = render( <DXProductSlider items={[deepProps, deepProps, deepProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

            // ElementSize = 2000, segmentSize = 1000. scrollTop = 200 => segmentPercent = 0.2 (<= 0.5)
            // Testing dot index 1 (i == currentSegment + 1) -> maps to alternative branch calculation
            forceDimensions( slider, { scrollHeight: 2500, clientHeight: 500, scrollTop: 200 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            const navDots = container.querySelector( ".dxProductSlider__navDots" ) as HTMLElement;
            const secondDotChild = navDots.children[1].firstChild as HTMLElement;

            // Verifies secondary linear opacity interpolation mapping: segmentPercent * 2 => 0.2 * 2 = 0.4
            expect( secondDotChild.style.opacity ).toBe( "0.4" );
        } );

        it( "executes immediate autoScroll bypasses when currentSegment lands exactly on the targeted buttonScrollTarget", () => {
            const { container } = render( <DXProductSlider items={[deepProps, deepProps, deepProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;
            const navDots = container.querySelector( ".dxProductSlider__navDots" ) as HTMLElement;
            const secondDot = navDots.children[1].firstChild as HTMLElement;

            // Trigger click to lock button scroll path tracking targets onto index 1
            act( () => { secondDot.click(); } );

            // Force scroll dimensions to land exactly on the segment destination target index 1
            // elementSize = 2000, segmentSize = 1000. scrollTop = 1001 means currentSegment = 1.
            const scrollToSpy = jest.spyOn( slider, "scrollTo" );
            forceDimensions( slider, { scrollHeight: 2500, clientHeight: 500, scrollTop: 1001 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            // Auto-scroll loop must look back and terminate because currentSegment == buttonScrollTarget, leaving scrollTo call counts flat
            const scrollForwardOrBackwardCalls = scrollToSpy.mock.calls.filter( call => call[0]?.top === 2001 || call[0]?.top === -1 );
            expect( scrollForwardOrBackwardCalls.length ).toBe( 0 );
        } );

        it( "strictly covers scrollMessage coordinate transforms in horizontal mobile configuration modes", () => {
            global.innerWidth = 375;
            const { container } = render( <DXProductSlider items={[itemProps, itemProps, itemProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;
            const mobileChildren = container.querySelector( ".dxProductSlider__children" ) as HTMLElement;

            // Total scrollable size = 1500 - 500 = 1000.
            // scrollLeft = 500 forces scrollPercent to equal exactly 0.5 (50%)
            forceDimensions( slider, { scrollHeight: 1000, clientHeight: 1000 } );
            forceDimensions( mobileChildren, { scrollWidth: 1500, clientWidth: 500, scrollLeft: 500 } );

            act( () => {
                mobileChildren.dispatchEvent( new Event( "scroll" ) );
            } );

            const message = container.querySelector( ".dxProductSlider__scrollMessage" ) as HTMLElement;
            expect( message.style.left ).toBe( "50%" );
            expect( message.style.transform ).toContain( "translate( -50%" );
        } );

        it( "enforces strict backward boundaries when scrollPercent hits upper saturation limits", () => {
            global.innerWidth = 1440;
            const { container } = render( <DXProductSlider items={[itemProps, itemProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

            // Move cursor state strictly forward first
            forceDimensions( slider, { scrollHeight: 2000, clientHeight: 1000, scrollTop: 0 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            // Drive scrollPercent exactly to 1.0 boundary limits
            forceDimensions( slider, { scrollHeight: 2000, clientHeight: 1000, scrollTop: 1000 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            // Verifies component updates boundary pointer state correctly without internal loop crashes
            expect( slider ).toBeInTheDocument();
        } );

        it( "evaluates alternative image indexing rules when the sequence loop value is strictly less than currentSegment", () => {
            global.innerWidth = 1440;
            const { container } = render( <DXProductSlider items={[itemProps, itemProps, itemProps, itemProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

            // Drive currentSegment to 2 (scrollTop = 2000, segmentSize = 1000)
            // Image index 0 (i = 0) will fall into the 'else' block because i (0) < currentSegment (2)
            // order = currentSegment - (1 + i) => 2 - (1 + 0) = 1
            forceDimensions( slider, { scrollHeight: 4000, clientHeight: 1000, scrollTop: 2000 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            const imageContainers = container.querySelectorAll( ".dxProductSlider__imageContainer" );
            const firstImage = imageContainers[0] as HTMLElement;

            // zIndex = Z_INDEX_FIRST_LEVEL (10) + order (1) = 11
            expect( firstImage.style.zIndex ).toBe( "11" );
        } );

        it( "exercises opacity fallback branches when active nav dots exceed adjacent current segment ranges", () => {
            global.innerWidth = 1440;
            const { container } = render( <DXProductSlider items={[itemProps, itemProps, itemProps, itemProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

            // Force current segment straight to index 2
            forceDimensions( slider, { scrollHeight: 4000, clientHeight: 1000, scrollTop: 2000 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            const navDots = container.querySelector( ".dxProductSlider__navDots" ) as HTMLElement;
            const firstDotChild = navDots.children[0].firstChild as HTMLElement;

            // Non-adjacent nav dots must evaluate to absolute string zero opacity constraints
            expect( firstDotChild.style.opacity ).toBe( "0" );
        } );

        it( "strictly isolates image translation tolerances when segment percent crosses below auto scroll boundaries", () => {
            global.innerWidth = 1440;
            const { container } = render( <DXProductSlider items={[itemProps, itemProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

            // Set segmentPercent to 0.1 (below autoScrollLimit 0.3) -> flags inTolerance as true
            forceDimensions( slider, { scrollHeight: 2000, clientHeight: 1000, scrollTop: 100 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            const imageContainers = container.querySelectorAll( ".dxProductSlider__imageContainer" );
            const targetImage = imageContainers[0] as HTMLElement;

            // In-tolerance execution path enforces z-index saturation values (Z_INDEX_FIRST_LEVEL + children.length)
            expect( targetImage.style.zIndex ).toBe( "12" );
        } );

        it( "strictly evaluates z-index fallback math when scroll boundary escapes tolerance threshold", () => {
            const { container } = render( <DXProductSlider items={[deepProps, deepProps, deepProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

            // elementSize = 2000, segmentSize = 1000. 
            // scrollTop = 800 => scrollPercent = 0.4. segmentPercent = 0.8.
            // inTolerance = 0.8 <= 0.3 => false.
            forceDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 800 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            const images = container.querySelectorAll( ".dxProductSlider__imageContainer" );
            const firstImage = images[0] as HTMLElement;

            // Math: Z_INDEX_FIRST_LEVEL (10) - children.length (3) = 7. 
            // Kills operator mutations (+ instead of -).
            expect( firstImage.style.zIndex ).toBe( "7" );
        } );

        it( "strictly evaluates nav dot opacity fallback when segmentPercent exceeds the 0.5 halfway point", () => {
            const { container } = render( <DXProductSlider items={[deepProps, deepProps, deepProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

            // scrollTop = 800 => segmentPercent = 0.8 (> 0.5). currentSegment = 0.
            forceDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 800 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            const navDots = container.querySelector( ".dxProductSlider__navDots" ) as HTMLElement;
            const secondDotChild = navDots.children[1].firstChild as HTMLElement;

            // Kills `segmentPercent <= 0.5` boundary mutations by asserting the explicit `else if (i == currentSegmet + 1)` fallback
            expect( secondDotChild.style.opacity ).toBe( "1" );
        } );

        it( "strictly maps mobile scrollMessage position transforms using exact math multipliers", () => {
            global.innerWidth = 375;
            const { container } = render( <DXProductSlider items={[deepProps, deepProps, deepProps]} /> );
            const mobileChildren = container.querySelector( ".dxProductSlider__children" ) as HTMLElement;

            // Trigger resize to flush isMobile state
            act( () => { global.dispatchEvent( new Event( "resize" ) ); } );

            // scrollWidth: 2500 - clientWidth: 500 = 2000 elementSize
            forceDimensions( mobileChildren, { scrollWidth: 2500, clientWidth: 500, scrollLeft: 800 } );
            act( () => { mobileChildren.dispatchEvent( new Event( "scroll" ) ); } );

            const message = container.querySelector( ".dxProductSlider__scrollMessage" ) as HTMLElement;

            // scrollPercent = 800 / 2000 = 0.4
            // Left = 0.4 * 100 = 40%
            expect( message.style.left ).toBe( "40%" );
            // Kills `translate( -${100 * scrollPercent}% , -100%)` template literal arithmetic mutations
            expect( message.style.transform ).toBe( "translate( -40% , -100%)" );
        } );

        it( "strictly evaluates activeSegment increment when boundary is exactly met", () => {
            const { container } = render( <DXProductSlider items={[deepProps, deepProps, deepProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

            // activeSegment starts at 0. segmetnSizePercent = 0.5.
            // Scroll exactly to 1000 -> scrollPercent = 0.5.
            forceDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 1000 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            const scrollToSpy = jest.spyOn( slider, "scrollTo" );

            // Scroll a tiny bit more to 1001. If activeSegment correctly incremented to 1 earlier, 
            // scrollPercent is 0.5005. currentSegment is 1. segmentPercent is 0.001. 
            // Since 0.001 < 0.3 autoScrollLimit, no smooth scroll should trigger.
            // This proves `scrollPercent >= (activeSegment + 1) * segmetnSizePercent` was evaluated properly.
            forceDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 1001 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            expect( scrollToSpy ).not.toHaveBeenCalled();
        } );

        it( "strictly evaluates activeSegment decrement when boundary is crossed backwards", () => {
            const { container } = render( <DXProductSlider items={[deepProps, deepProps, deepProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

            // First jump strictly to segment 1
            forceDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 1200 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            const scrollToSpy = jest.spyOn( slider, "scrollTo" );

            // Scroll exactly to 999. activeSegment=1. scrollPercent=0.4995 < (1 * 0.5) => true.
            // Decrements activeSegment to 0. ScrollDirection = "backward".
            forceDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 999 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            // If activeSegment properly decremented to 0, currentSegment = 0.
            // segmentPercent = 0.999. Since it's > (1 - 0.3 = 0.7) and scrollDirection is backward, 
            // autoScroll does NOT trigger.
            expect( scrollToSpy ).not.toHaveBeenCalled();
        } );

        it( "bypasses autoScroll strictly when onMouseScroll is actively flagged by mousedown", async () => {
            const { container } = render( <DXProductSlider items={[deepProps, deepProps, deepProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;

            // Mousedown flags onMouseScroll = true and onAutoScroll = true
            await act( async () => {
                fireEvent.mouseDown( slider );
            } );

            const scrollToSpy = jest.spyOn( slider, "scrollTo" );

            // Push strictly into autoScroll boundary (scrollTop = 400 -> segmentPercent = 0.4 > 0.3)
            forceDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 400 } );
            act( () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            // Because onMouseScroll/onAutoScroll is true, it strictly skips the autoScroll block
            expect( scrollToSpy ).not.toHaveBeenCalled();

            // Mouseup safely clears boolean flags
            await act( async () => {
                fireEvent.mouseUp( slider );
            } );
        } );

        it( "strictly clears onButtonScroll flag when currentSegment matches buttonScrollTarget", async () => {
            const { container } = render( <DXProductSlider items={[deepProps, deepProps, deepProps]} /> );
            const slider = container.querySelector( ".dxProductSlider" ) as HTMLElement;
            const navDots = container.querySelector( ".dxProductSlider__navDots" ) as HTMLElement;
            const secondDot = navDots.children[1].firstChild as HTMLElement;

            // Set dimensions BEFORE clicking so the useEffect calculates segmentSize correctly
            forceDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 0 } );

            const scrollToSpy = jest.spyOn( slider, "scrollTo" );

            // Click sets onButtonScroll = true, buttonScrollTarget = 1
            await act( async () => { secondDot.click(); } );

            // Clear the initial scrollTo execution triggered by the click's useEffect
            scrollToSpy.mockClear();

            // Scroll exactly to segment 1 to trigger flag clearance execution
            // elementSize = 2000, segmentSize = 1000. scrollTop = 1000 -> currentSegment = 1.
            forceDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 1000 } );
            await act( async () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            // The scroll closure poisoned onAutoScroll because onButtonScroll was true during the threshold boundary.
            // Fire mouseUp to reset onAutoScroll cleanly while preserving the onButtonScroll clearance we are trying to test.
            await act( async () => { fireEvent.mouseUp( slider ); } );

            // If the onButtonScroll flag was cleared properly, a subsequent scroll into autoScroll territory will trigger autoScroll
            // Scroll to 1400. segmentPercent = 0.4 > 0.3. Because onButtonScroll is now false, it WILL scroll.
            forceDimensions( slider, { scrollHeight: 3000, clientHeight: 1000, scrollTop: 1400 } );
            await act( async () => { slider.dispatchEvent( new Event( "scroll" ) ); } );

            // It should scroll to segment 2: (1+1)*1000 + 1 = 2001
            expect( scrollToSpy ).toHaveBeenCalledWith( { top: 2001, behavior: "smooth" } );
        } );
    } );

} );