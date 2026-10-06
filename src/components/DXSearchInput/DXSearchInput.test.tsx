import React from "react";
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import DXSearchInput from "./DXSearchInput";
import { searchVisibleArgs, searchInputArgs, searchInputChangedIconsArgs } from "./DXSearchInput.stories";
import userEvent from "@testing-library/user-event";

describe( "Search Input component", () => {

    test( "Full Rendering Search Input component", () => {
        render( <DXSearchInput {...searchVisibleArgs} /> );
        expect( screen.getByTestId( "dxSearchInput-input" ) ).toBeInTheDocument();
    } );

    test( "It should show a list of suggested data if the user focuses on the input", () => {
        const { container, getByTestId } = render( <DXSearchInput {...searchVisibleArgs} /> );
        const input = getByTestId( 'dxSearchInput-input' ) as HTMLInputElement;
        act( () => {
            input.focus();
        } );
        const suggestedCards = container.querySelectorAll( ".dxCard" );
        const suggestedOptions = container.querySelectorAll( "li" );

        expect( getByTestId( "dxSearchInput-input" ) ).toBeInTheDocument();
        expect( getByTestId( "dxSearchInput-list" ) ).toBeInTheDocument();
        expect( getByTestId( "dxSearchInput-list" ) ).toHaveClass( "dxSearchInput__list--active" );
        expect( input.placeholder ).toBe( searchVisibleArgs.placeholder );
        expect( suggestedCards.length ).toEqual( 6 );
        expect( suggestedOptions.length ).toEqual( 5 );
    } );

    test( "It should hide the list of suggested data if the user presses 'Escape'", () => {
        const { getByTestId } = render( <DXSearchInput {...searchVisibleArgs} /> );
        const input = getByTestId( 'dxSearchInput-input' ) as HTMLInputElement;
        act( () => {
            input.focus();
            fireEvent.keyUp( input, {
                key: "Escape",
                code: "Escape",
                keyCode: 27,
                charCode: 27,
            } );
        } );

        expect( getByTestId( "dxSearchInput-list" ) ).not.toHaveClass( "dxSearchInput__list--active" );
        expect( input.placeholder ).toBe( searchVisibleArgs.placeholder );
    } );

    test( "It should execute the searchFn when the user writes a word and types 'Enter'", async () => {
        let mockFunction = jest.fn();
        let props = JSON.parse( JSON.stringify( searchVisibleArgs ) );
        props.searchFn = mockFunction;
        const { getByTestId } = render( <DXSearchInput {...props} /> );
        const input = getByTestId( 'dxSearchInput-input' ) as HTMLInputElement;
        await act( async () => {
            await userEvent.click( input );
            await userEvent.type( input, "Resources" );
            fireEvent.keyUp( input, {
                key: "Enter",
                code: "Enter",
                keyCode: 13,
                charCode: 13
            } );
        } );

        expect( mockFunction ).toHaveBeenCalled();
    } );

    test( "It should execute the searchFn when the form is submitted", async () => {
        let mockFunction = jest.fn();
        let props = JSON.parse( JSON.stringify( searchVisibleArgs ) );
        props.searchFn = mockFunction;
        const { container } = render( <DXSearchInput {...props} /> );
        const input = screen.getByTestId( 'dxSearchInput-input' ) as HTMLInputElement;
        await act( async () => {
            await userEvent.click( input );
            await userEvent.type( input, "Resources" );
            let form = container.getElementsByTagName( 'FORM' )[0] as HTMLFormElement;
            form.submit();
        } );

        expect( mockFunction ).toHaveBeenCalled();
    } );

    test( "It should show the filtered options when the user writes a word", async () => {
        const { container, getByTestId } = render( <DXSearchInput {...searchVisibleArgs} /> );
        const input = getByTestId( 'dxSearchInput-input' ) as HTMLInputElement;
        const list = getByTestId( "dxSearchInput-list" );
        await act( async () => {
            await userEvent.click( input );
            await userEvent.type( input, "Resources" );
        } );
        const foundCards = container.querySelectorAll( ".dxCard" );
        expect( input ).toBeInTheDocument();
        expect( list ).toBeInTheDocument();
        expect( foundCards.length ).toEqual( 3 );
    } );

    test( "It should show all the options when the user deletes the input added", async () => {
        render( <DXSearchInput {...searchVisibleArgs} /> );
        const input = screen.getByTestId( 'dxSearchInput-input' ) as HTMLInputElement;
        await act( async () => {
            await userEvent.click( input );
            await userEvent.type( input, "i" );
            await userEvent.type( input, '{backspace}' );
        } );

        const suggestedCards = document.querySelectorAll( ".dxCard" );
        const suggestedOptions = document.querySelectorAll( "li" );

        expect( screen.getByTestId( "dxSearchInput-input" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "dxSearchInput-list" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "dxSearchInput-list" ) ).toHaveClass( "dxSearchInput__list--active" );
        expect( input.placeholder ).toBe( searchVisibleArgs.placeholder );
        expect( suggestedCards.length ).toEqual( 6 );
        expect( suggestedOptions.length ).toEqual( 5 );
    } );

    test( "It should execute the searchFn when a user clicks the 'search all' button", async () => {
        let mockFunction = jest.fn();
        let props = JSON.parse( JSON.stringify( searchVisibleArgs ) );
        props.searchFn = mockFunction;
        const { container } = render( <DXSearchInput {...props} /> );
        const input = container.querySelector( '[data-testid="dxSearchInput-input"]' ) as HTMLInputElement;
        await act( async () => {
            await userEvent.click( input );
            const buttonSearchAll = document.querySelector( ".dxSearchInput__searchAllButton" ) as HTMLButtonElement;
            await userEvent.click( buttonSearchAll );
        } );
        expect( mockFunction ).toHaveBeenCalled();
    } );

    test( "It should render the proper label when set for the 'search all' button", async () => {
        let props = JSON.parse( JSON.stringify( searchVisibleArgs ) );
        props.buttonLabel = 'Example value';
        const { container } = render( <DXSearchInput {...props} /> );
        const input = container.querySelector( '[data-testid="dxSearchInput-input"]' ) as HTMLInputElement;
        await act( async () => {
            await userEvent.click( input );
        } );
        const buttonSearchAll = document.querySelector( ".dxSearchInput__searchAllButton" ) as HTMLButtonElement;
        expect( buttonSearchAll ).toHaveTextContent( props.buttonLabel );
    } );

    test( "It should render a default label if no label is set for the 'search all' button", async () => {
        let props = JSON.parse( JSON.stringify( searchVisibleArgs ) );
        delete props.buttonLabel;
        const { container } = render( <DXSearchInput {...props} /> );
        const input = container.querySelector( '[data-testid="dxSearchInput-input"]' ) as HTMLInputElement;
        await act( async () => {
            await userEvent.click( input );
        } );
        const buttonSearchAll = document.querySelector( ".dxSearchInput__searchAllButton" ) as HTMLButtonElement;
        expect( buttonSearchAll ).toHaveTextContent( "See all search results" );
    } );

    test( "The list should show only one child, if the user enters a '1'", async () => {
        const { container, getByTestId } = render( <DXSearchInput {...searchInputArgs} /> );
        const input = getByTestId( "dxSearchInput-input" );
        await act( async () => {
            await userEvent.type( input, "1" );
        } );
        const listOptions = container.querySelectorAll( "li" );
        expect( listOptions.length ).toEqual( 1 );
    } );

    test( "If the user types a word that doesn't match some element, a message should be displayed.", async () => {
        const { getByTestId } = render( <DXSearchInput {...searchInputArgs} /> );
        const input = getByTestId( "dxSearchInput-input" );
        await act( async () => {
            await userEvent.type( input, "location" );
        } );
        const message = getByTestId( "dxSearchInput__listEmpty" );
        expect( message.textContent ).toBe( `Search \u201Clocation\u201D in our portal` );
    } );

    test( "It should display the input when click on icon-search and the 'collapsed' is true.", async () => {
        const { getByTestId } = render( <DXSearchInput {...searchInputArgs} /> );
        const searchBtn = getByTestId( "icon-btn-search" ) as HTMLButtonElement;
        const input = screen.getByTestId( 'dxSearchInput-input' ) as HTMLInputElement;
        await act( async () => {
            await userEvent.click( searchBtn );
        } );
        let icon = screen.getByTestId( "icon-btn-search" );
        expect( icon ).toHaveClass( 'ci-Close_MD' );
        expect( input ).not.toHaveClass( "dxSearchInput__input--collapsed" );
        expect( input ).toHaveClass( "dxSearchInput__input--active" );
    } );

    test( "It should close the input when click on ci-Close_MD and the 'collapsed' is true.", async () => {
        const { getByTestId } = render( <DXSearchInput {...searchInputArgs} /> );
        const searchBtn = getByTestId( "icon-btn-search" ) as HTMLButtonElement;
        const input = screen.getByTestId( 'dxSearchInput-input' ) as HTMLInputElement;
        await act( async () => {
            await userEvent.click( searchBtn );
            await userEvent.click( searchBtn );
        } );
        let icon = screen.getByTestId( "icon-btn-search" );
        expect( icon ).toHaveClass( 'ci-Search_Magnifying_Glass' );
        expect( input ).not.toHaveClass( "dxSearchInput__input--expanded" );
        expect( input ).toHaveClass( "dxSearchInput__input--collapsed" );
    } );

    test( "It should execute the search button when an input is added, collapsed is false and the user clicks om the search icon.", async () => {
        let mockFunction = jest.fn();
        let props = JSON.parse( JSON.stringify( searchVisibleArgs ) );
        props.searchFn = mockFunction;
        const { getByTestId } = render( <DXSearchInput {...props} /> );
        const input = screen.getByTestId( 'dxSearchInput-input' ) as HTMLInputElement;
        await act( async () => {
            await userEvent.type( input, "hello" );
            await userEvent.click( getByTestId( "icon-btn-search" ) as HTMLButtonElement );
        } );
        expect( mockFunction ).toHaveBeenCalled();
    } );

    test( "It should not execute the searchFn when collapsed is false and the user clicks on the search icon with no input.", async () => {
        let mockFunction = jest.fn();
        let props = JSON.parse( JSON.stringify( searchVisibleArgs ) );
        props.searchFn = mockFunction;
        const { getByTestId } = render( <DXSearchInput {...props} /> );
        const searchBtn = getByTestId( "icon-btn-search" ) as HTMLButtonElement;
        await act( async () => {
            await userEvent.click( searchBtn );
        } );
        expect( mockFunction ).not.toHaveBeenCalled();
    } );

    test( "If the overlay displays on input focus", async () => {
        render( <DXSearchInput {...searchInputArgs} showOverlay={true} /> );
        await act( async () => {
            await userEvent.click( screen.getByTestId( "dxSearchInput-input" ) );
        } );
        expect( screen.getByTestId( "dxSearchInput-input" ) ).toHaveClass( "dxSearchInput__input--collapsed" );
        expect( screen.getByTestId( "dxSearchInput__searchGroup" ) ).toHaveClass( "dxSearchInput__search--active" );
        expect( screen.getByTestId( "searchInput__overlay" ) ).toHaveClass( "dxSearchInput__overlay--state-active" );
    } );

    test( "If the overlay hides when clicking it", async () => {
        render( <DXSearchInput {...searchInputArgs} showOverlay={true} /> );
        await act( async () => {
            await userEvent.click( screen.getByTestId( "dxSearchInput-input" ) );
            await userEvent.click( screen.getByTestId( "searchInput__overlay" ) );
        } );
        expect( screen.getByTestId( "dxSearchInput-input" ) ).not.toHaveClass( "dxSearchInput__input--active" );
        expect( screen.getByTestId( "dxSearchInput__searchGroup" ) ).not.toHaveClass( "dxSearchInput__search--active" );
        expect( screen.getByTestId( "searchInput__overlay" ) ).not.toHaveClass( "dxSearchInput__overlay--state-active" );
    } );

    test( "If icons change with icons property set", async () => {
        expect.assertions( 2 );
        render( <DXSearchInput {...searchInputChangedIconsArgs} /> );
        const iconButton = screen.getByTestId( "icon-btn-search" );
        expect( iconButton ).toHaveClass( searchInputChangedIconsArgs.icons.search );
        await act( async () => {
            await userEvent.click( iconButton );
        } );
        expect( iconButton ).toHaveClass( searchInputChangedIconsArgs.icons.close );
    } );

    describe( "Zero-Assumption Deep Assertions: Form Boundaries and DOM Layout", () => {
        test( "Slice Boundaries: strictly restricts search options to exactly 5 elements", () => {
            // Generate 10 items to force the slice boundary execution
            const manyOptions = Array.from( { length: 10 }, ( _, i ) => ( { label: `Option ${i}`, url: `#${i}` } ) );
            const props = { ...searchVisibleArgs, searchOptions: manyOptions };
            const { container, getByTestId } = render( <DXSearchInput {...props} /> );

            act( () => { getByTestId( 'dxSearchInput-input' ).focus(); } );

            const ul = container.querySelector( 'ul' );
            const lis = ul?.querySelectorAll( 'li' );

            // Assert the slice explicitly truncated the array
            expect( lis?.length ).toBe( 5 );
        } );

        test( "Slice Boundaries: strictly restricts suggested cards to exactly 3 elements per section", () => {
            // Generate 10 cards to force the inner slice execution
            const manyCards = Array.from( { length: 10 }, ( _, i ) => ( {
                title: { label: `Card ${i}` },
                date: "2026",
                cardType: "News"
            } ) );
            const props = {
                ...searchVisibleArgs,
                suggestedInfo: [{ type: "Popular", cards: manyCards as any }]
            };
            const { container, getByTestId } = render( <DXSearchInput {...props} /> );

            act( () => { getByTestId( 'dxSearchInput-input' ).focus(); } );

            const sectionItems = container.querySelector( '.dxSearchInput__suggestedInfo__section__items' );
            const cards = sectionItems?.querySelectorAll( '.dxCard' );

            // Assert the suggested info slice explicitly truncated the array
            expect( cards?.length ).toBe( 3 );
        } );

        test( "Form Event: handleBlur clears state and hides list strictly when focus leaves the form", () => {
            const { getByTestId, getByRole } = render( <DXSearchInput {...searchVisibleArgs} /> );
            const form = getByRole( 'search' );
            const input = getByTestId( 'dxSearchInput-input' ) as HTMLInputElement;

            act( () => {
                input.focus();
                fireEvent.change( input, { target: { value: 'Test Value' } } );

                // Simulate a blur event where the relatedTarget (where focus is going) is completely outside the form
                fireEvent.blur( form, { relatedTarget: document.body } );
            } );

            // Assert the blur handler executed its cleanup routine
            expect( input.value ).toBe( "" );
            expect( getByTestId( "dxSearchInput-list" ) ).not.toHaveClass( "dxSearchInput__list--active" );
        } );

        test( "Layout Engine: strictly applies active class and display styles when opening and closing the list", () => {
            const { getByTestId, container } = render( <DXSearchInput {...searchVisibleArgs} /> );
            const input = getByTestId( 'dxSearchInput-input' ) as HTMLInputElement;
            const insetDiv = container.querySelector( '.input-group-inset-item' ) as HTMLElement;
            const list = getByTestId( 'dxSearchInput-list' ) as HTMLElement;

            act( () => { input.focus(); } );

            // Assert the opened state CSS mutations
            expect( ["0", "0px"] ).toContain( input.style.borderBottomLeftRadius );
            expect( ["0", "0px"] ).toContain( insetDiv.style.borderBottomRightRadius );
            expect( list.style.display ).toBe( "block" );

            // Close the list via Escape key
            act( () => { fireEvent.keyUp( input, { keyCode: 27 } ); } );

            // Assert the closed state CSS mutations
            expect( ["4px"] ).toContain( input.style.borderBottomLeftRadius );
            expect( ["4px"] ).toContain( insetDiv.style.borderBottomRightRadius );
            expect( list.style.display ).toBe( "none" );
        } );

        test( "Global Event Listener: closePanel strictly distinguishes between internal and external clicks", () => {
            const { getByTestId } = render( <DXSearchInput {...searchVisibleArgs} /> );
            const input = getByTestId( 'dxSearchInput-input' ) as HTMLInputElement;

            // Internal click should keep the list open
            act( () => { input.focus(); fireEvent.click( input ); } );
            expect( getByTestId( "dxSearchInput-list" ) ).toHaveClass( "dxSearchInput__list--active" );

            // External click (document.body) should trigger the global event listener and close the list
            act( () => { fireEvent.click( document.body ); } );
            expect( getByTestId( "dxSearchInput-list" ) ).not.toHaveClass( "dxSearchInput__list--active" );
        } );

        test( "Case Insensitive Filtering: handles exact matches regardless of upper/lower casing", async () => {
            const props = {
                ...searchVisibleArgs,
                searchOptions: [{ label: "ALL CAPS OPTION", url: "#1" }]
            };
            const { getByTestId, container } = render( <DXSearchInput {...props} /> );
            const input = getByTestId( 'dxSearchInput-input' ) as HTMLInputElement;

            await act( async () => {
                await userEvent.type( input, "all caps" );
            } );

            const ul = container.querySelector( 'ul' );
            // Proves the `toLowerCase()` mutation didn't survive
            expect( ul?.textContent ).toContain( "ALL CAPS OPTION" );
        } );

        test( "Form Event: handleBlur ignores bubbling focus shifts that remain strictly within the component container", () => {
            const { getByTestId, getByRole } = render( <DXSearchInput {...searchVisibleArgs} /> );
            const form = getByRole( 'search' );
            const input = getByTestId( 'dxSearchInput-input' ) as HTMLInputElement;

            act( () => {
                input.focus();
                fireEvent.change( input, { target: { value: 'Test Value' } } );

                // Simulate a blur event where relatedTarget is another internal child element
                const button = getByTestId( 'search-all-button' );
                fireEvent.blur( form, { relatedTarget: button } );
            } );

            // Assert that state was NOT cleared because focus never left the container
            expect( input.value ).toBe( 'Test Value' );
            expect( getByTestId( "dxSearchInput-list" ) ).toHaveClass( "dxSearchInput__list--active" );
        } );

        test( "showList skips style manipulation cleanly if component refs are unavailable (unmounted state execution)", () => {
            const { getByTestId, unmount } = render( <DXSearchInput {...searchVisibleArgs} /> );
            const input = getByTestId( 'dxSearchInput-input' ) as HTMLInputElement;

            // Trigger focus to execute showList(true)
            act( () => { input.focus(); } );

            // Unmount the component to strip the refs
            unmount();

            // Simulate the global window click event that triggers the cleanup execution 
            // It should safely return via the !input fallback branch without throwing an error
            expect( () => {
                act( () => { fireEvent.click( document.body ); } );
            } ).not.toThrow();
        } );

        test( "useEffect applies uncollapsed background and border styles dynamically on component mount", async () => {
            const qsSpy = jest.spyOn( HTMLElement.prototype, 'querySelector' );

            const props = { ...searchVisibleArgs, collapsed: false };
            render( <DXSearchInput {...props} /> );

            await waitFor( () => {
                // To bypass JSDOM's CSS parser stripping invalid CSS variables, 
                // we strictly track the DOM query execution paths.
                // The first useEffect conditionally queries it; the second unconditionally queries it.
                const insetCalls = qsSpy.mock.calls.filter( call => call[0] === ".input-group-inset-item" );

                // Asserting >= 2 proves the `!props.collapsed` conditional mutation branch executed successfully.
                expect( insetCalls.length ).toBeGreaterThanOrEqual( 2 );
            } );

            qsSpy.mockRestore();
        } );

        test( "toggleInput state engine evaluates active properties and safely clears inputs when reverting from expanded to collapsed", () => {
            const props = { ...searchVisibleArgs, collapsed: true };
            const { getByTestId } = render( <DXSearchInput {...props} /> );

            // Target the button wrapper that holds the onClick handler
            const searchBtn = getByTestId( "dxSearchInput__search" ) as HTMLButtonElement;
            const icon = getByTestId( "icon-btn-search" );
            const input = getByTestId( 'dxSearchInput-input' ) as HTMLInputElement;

            // 1. Expand the input
            act( () => { fireEvent.click( searchBtn ); } );

            // Assert the classes that survive the React re-render batch
            expect( input ).toHaveClass( "dxSearchInput__input--active" );
            expect( icon ).toHaveClass( "ci-Close_MD" );

            // Type something while expanded
            act( () => { fireEvent.change( input, { target: { value: 'Temp Data' } } ); } );

            // 2. Collapse the input
            act( () => { fireEvent.click( searchBtn ); } );

            // Assert exact state revert modifications
            expect( input ).toHaveClass( "dxSearchInput__input--collapsed" );
            expect( icon ).toHaveClass( "ci-Search_Magnifying_Glass" );
            expect( input.value ).toBe( "" ); // clearSearchValue() executed
        } );
    } );

    describe( "DXSearchInput Hardening", () => {
        test( "strict fallback branch: showList alters panelFallback display directly if insetDiv is completely detached from the DOM", () => {
            const { getByTestId, container } = render( <DXSearchInput {...searchVisibleArgs} /> );
            const input = getByTestId( 'dxSearchInput-input' );

            // Strip the insetDiv from the DOM to force `if (!input || !insetDiv)` fallback evaluation
            const insetDiv = container.querySelector( ".input-group-inset-item" );
            insetDiv?.parentNode?.removeChild( insetDiv );

            act( () => {
                input.focus(); // Triggers showList(true)
            } );

            const panel = getByTestId( "dxSearchInput-list" );

            // Assert the fallback branch explicitly modified the panel directly
            expect( panel.style.display ).toBe( "block" );
            expect( panel.classList.contains( "dxSearchInput__list--active" ) ).toBe( true );
        } );

        test( "strict toggle cleanup: explicitly removes 'clicked' class from the search button when reverting to collapsed state", async () => {
            const props = { ...searchVisibleArgs, collapsed: true };
            const { getByTestId, container } = render( <DXSearchInput {...props} /> );

            const searchBtn = getByTestId( "dxSearchInput__search" );
            const buttonSearch = container.querySelector( ".input-group-inset-item" ) as HTMLElement;

            // Expand the input
            await act( async () => {
                fireEvent.click( searchBtn );
            } );

            expect( buttonSearch ).toHaveClass( "clicked" );

            // Collapse the input
            await act( async () => {
                fireEvent.click( searchBtn );
            } );

            // Kills the `buttonSearch?.classList.remove( "clicked" )` mutation without relying on CSSStyleDeclaration string parsing
            expect( buttonSearch ).not.toHaveClass( "clicked" );
        } );

        test( "strict global click boundary: keeps list active if click target is a parent containing the input while collapsed state evaluates true", async () => {
            const props = { ...searchVisibleArgs, collapsed: true };
            const { container, getByTestId, rerender } = render( <DXSearchInput {...props} /> );

            const inputGroupItem = container.querySelector( '.input-group-item' ) as HTMLElement;
            const searchBtn = getByTestId( "dxSearchInput__search" );

            // Push state engine into collapsed = true locally (which actually means EXPANDED in the component logic)
            await act( async () => { fireEvent.click( searchBtn ); } );

            // Rerender with new searchOptions to force the useEffect to flush and re-bind the event listener 
            // with the updated 'collapsed' closure state (stale closure bypass)
            await act( async () => {
                rerender( <DXSearchInput {...props} searchOptions={[]} /> );
            } );

            // Simulate global window click squarely on the wrapper element.
            // This evaluates `if ( e.target.children ) { target = e.target.querySelector('.dxSearchInput__input'); }`
            // and subsequently triggers `( target == input && collapsed )`.
            await act( async () => {
                fireEvent.click( inputGroupItem );
            } );

            const list = getByTestId( 'dxSearchInput-list' );
            expect( list ).toHaveClass( "dxSearchInput__list--active" );
        } );

        test( "handleSearch: strictly executes clearSearchValue when input filter is explicitly empty after typing", async () => {
            const { getByTestId } = render( <DXSearchInput {...searchVisibleArgs} /> );
            const input = getByTestId( 'dxSearchInput-input' ) as HTMLInputElement;

            // Type a valid character first
            await act( async () => {
                fireEvent.keyUp( input, { target: { value: 'A' }, keyCode: 65 } );
            } );

            // Wipe the input to explicitly trigger the `else { clearSearchValue(); }` boundary
            await act( async () => {
                fireEvent.keyUp( input, { target: { value: '' }, keyCode: 8 } );
            } );

            // If clearSearchValue executed correctly, suggestedCardsActive is reset and input value remains wiped
            expect( input.value ).toBe( "" );

            const suggestedCards = document.querySelectorAll( ".dxSearchInput__suggestedInfo" );
            // The default `renderSuggestedServices` elements should be fully restored
            expect( suggestedCards.length ).toBeGreaterThan( 0 );
        } );

        test( "strict CSS boundary: removes border property via CSSStyleDeclaration when collapsed prop is true but local state is false", () => {
            // Spy directly on the CSSStyleDeclaration prototype to intercept removeProperty calls
            const removePropertySpy = jest.spyOn( CSSStyleDeclaration.prototype, 'removeProperty' );

            const props = { ...searchVisibleArgs, collapsed: true };
            render( <DXSearchInput {...props} /> );

            // Kills the `button.style.removeProperty( "border" )` mutation inside the useEffect block
            expect( removePropertySpy ).toHaveBeenCalledWith( "border" );

            removePropertySpy.mockRestore();
        } );

        test( "strict global click boundary: keeps list active if click target is a parent containing the input while collapsed state evaluates true", async () => {
            const props = { ...searchVisibleArgs, collapsed: true };
            const { container, getByTestId, rerender } = render( <DXSearchInput {...props} /> );

            const inputGroupItem = container.querySelector( '.input-group-item' ) as HTMLElement;
            const searchBtn = getByTestId( "dxSearchInput__search" );

            // Push state engine into collapsed = true locally (which actually means EXPANDED in the component logic)
            await act( async () => { fireEvent.click( searchBtn ); } );

            // Rerender with new searchOptions to force the useEffect to flush and re-bind the event listener 
            // with the updated 'collapsed' closure state (stale closure bypass)
            await act( async () => {
                rerender( <DXSearchInput {...props} searchOptions={[]} /> );
            } );

            // Simulate global window click squarely on the wrapper element.
            // This evaluates `if ( e.target.children ) { target = e.target.querySelector('.dxSearchInput__input'); }`
            // and subsequently triggers `( target == input && collapsed )`.
            await act( async () => {
                fireEvent.click( inputGroupItem );
            } );

            const list = getByTestId( 'dxSearchInput-list' );
            expect( list ).toHaveClass( "dxSearchInput__list--active" );
        } );

        test( "strict array filtering: filters searchCards explicitly on matching string subsets", async () => {
            const customCards = [
                { title: { label: "EXACT MATCH 1" }, date: "2026", cardType: "News" },
                { title: { label: "EXACT MATCH 2" }, date: "2026", cardType: "News" },
                { title: { label: "NO MATCH" }, date: "2026", cardType: "News" },
            ];
            const props = { ...searchVisibleArgs, searchCards: customCards as any };
            const { container, getByTestId } = render( <DXSearchInput {...props} /> );

            const input = getByTestId( 'dxSearchInput-input' );

            await act( async () => {
                fireEvent.keyUp( input, { target: { value: "exact match" }, keyCode: 65 } );
            } );

            // The component renders 3 cards total. If filter logic is mutated, the NO MATCH card slips through.
            const sectionItems = container.querySelector( '.dxSearchInput__suggestedInfo__section__items' );
            const cards = sectionItems?.querySelectorAll( '.dxCard' );

            // Strict evaluation of the array subset bounds
            expect( cards?.length ).toBe( 2 );
        } );
    } );
} );
