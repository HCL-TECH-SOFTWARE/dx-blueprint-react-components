import React from "react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { render, screen, act, fireEvent } from "@testing-library/react";
import DXQuestionsTabs, { DXQuestionsTabsProps, charLenghtLimitator } from "./DXQuestionsTabs";
import { SimpleExampleArgs } from "./DXQuestionsTabs.stories";

const testArgs: DXQuestionsTabsProps = {
    title: "title",
    seeOtherLink: {
        url: "https://hcl-software.com",
        label: "Other link text"
    },
    questionDetailLinkText: "Question Detail text",
    sections: [
        {
            title: "Section 1",
            questions: [{
                question: "Question 1-1 Lorem ipsum lorem ipsum",
                answer: "Answer 1",
                questionDetailLink: "https://www.hcl-software.com",
                target: "_blank"
            }]
        }
    ]
};

test( "title contains given value", () => {
    render( <DXQuestionsTabs {...testArgs} /> );

    expect( screen.getByTestId( "dxQTtitle" ) ).toHaveTextContent( testArgs.title );
} );

test( "title trims when chararter limit exeeds", () => {
    render( <DXQuestionsTabs {...SimpleExampleArgs} /> );

    var trimmedTitle = charLenghtLimitator( SimpleExampleArgs.title, 64 );
    expect( screen.getByTestId( "dxQTtitle" ) ).toHaveTextContent( trimmedTitle );
} );

test( "section button is generated correctly", () => {
    render( <DXQuestionsTabs {...testArgs} /> );

    let buttonConainer = screen.getByTestId( "dxQTSectionButton" );
    let textConainer = buttonConainer.querySelector( "span" );
    var trimmedText = charLenghtLimitator( testArgs.sections[0].title, 20 );
    expect( textConainer ).toHaveTextContent( trimmedText );
} );

test( "section button has default icon if iconName is not given", () => {
    render( <DXQuestionsTabs {...testArgs} /> );

    let buttonConainer = screen.getByTestId( "dxQTSectionButton" );
    let iconContainer = buttonConainer.querySelector( "i" );

    expect( iconContainer ).toHaveClass( "ci-Circle_Help" );
} );

test( "section button chages its icon when iconName prop is set", () => {
    render( <DXQuestionsTabs {...SimpleExampleArgs} /> );

    let buttonConainer = screen.getAllByTestId( "dxQTSectionButton" )[0];
    let iconContainer = buttonConainer.querySelector( "i" );
    let iconName = SimpleExampleArgs.sections[0].iconName!;

    expect( iconContainer ).toHaveClass( iconName );
} );

//Questions container
test( "Click on section shows questions container", async () => {
    render( <DXQuestionsTabs {...testArgs} /> );

    await userEvent.click( screen.getAllByTestId( "dxQTSectionButton" )[0] );

    expect( screen.getByTestId( "dxQTQuestionsContainer" ) ).toHaveClass( "dxQuestionsTabs__questionsContainer--active" );
} );

test( "Click on same section hides questions container", async () => {
    render( <DXQuestionsTabs {...testArgs} /> );

    await userEvent.click( screen.getAllByTestId( "dxQTSectionButton" )[0] );
    await userEvent.click( screen.getAllByTestId( "dxQTSectionButton" )[0] );

    expect( screen.getByTestId( "dxQTSectionButton" ) ).not.toHaveClass( "dxQuestionsTabs__sectionButtonsContainer--active" );
} );

test( "Question child text gets trimmed on char limit", async () => {
    render( <DXQuestionsTabs {...SimpleExampleArgs} /> );

    await userEvent.click( screen.getAllByTestId( "dxQTSectionButton" )[0] );
    let questionCell = screen.getAllByTestId( "dxQTQuestionButton" )[0];

    expect( questionCell ).toHaveTextContent( charLenghtLimitator( SimpleExampleArgs.sections[0].questions[0].question, 32 ) );
} );

test( "Question container link matches props (label)", async () => {
    render( <DXQuestionsTabs {...testArgs} /> );

    await userEvent.click( screen.getAllByTestId( "dxQTSectionButton" )[0] );

    let questionsContainer = screen.getByTestId( "dxQTQuestionsContainer" );
    let questionsLink = questionsContainer.querySelector( "a" );

    expect( questionsLink ).toHaveTextContent( testArgs.seeOtherLink.label );
} );

test( "Question container link matches props (link)", async () => {
    render( <DXQuestionsTabs {...testArgs} /> );

    await userEvent.click( screen.getAllByTestId( "dxQTSectionButton" )[0] );

    let questionsContainer = screen.getByTestId( "dxQTQuestionsContainer" );
    let questionsLink = questionsContainer.querySelector( "a" );

    expect( questionsLink ).toHaveAttribute( "href", testArgs.seeOtherLink.url );
} );

//Question detail tests
test( "Question detail (title) matches selected question", async () => {
    render( <DXQuestionsTabs {...testArgs} /> );

    await userEvent.click( screen.getAllByTestId( "dxQTSectionButton" )[0] );
    await userEvent.click( screen.getAllByTestId( "dxQTQuestionButton" )[0] );

    let questionTitle = screen.getByTestId( "dxQTQuestionTitle" );

    expect( questionTitle ).toHaveTextContent( testArgs.sections[0].questions[0].question );
} );

test( "Question detail (title) get trimmed on char lenght limit", async () => {
    render( <DXQuestionsTabs {...SimpleExampleArgs} /> );

    await userEvent.click( screen.getAllByTestId( "dxQTSectionButton" )[0] );
    await userEvent.click( screen.getAllByTestId( "dxQTQuestionButton" )[0] );

    let questionTitle = screen.getByTestId( "dxQTQuestionTitle" );

    expect( questionTitle ).toHaveTextContent( charLenghtLimitator( SimpleExampleArgs.sections[0].questions[0].question, 128 ) );
} );

test( "Question detail body matches selected question", async () => {
    render( <DXQuestionsTabs {...testArgs} /> );

    await userEvent.click( screen.getAllByTestId( "dxQTSectionButton" )[0] );
    await userEvent.click( screen.getAllByTestId( "dxQTQuestionButton" )[0] );

    let questionTitle = screen.getByTestId( "dxQTQuestionBody" );

    expect( questionTitle ).toHaveTextContent( charLenghtLimitator( testArgs.sections[0].questions[0].answer, 128 ) );
} );

test( "Question detail link (text) matches parameter value", async () => {
    render( <DXQuestionsTabs {...testArgs} /> );

    await userEvent.click( screen.getAllByTestId( "dxQTSectionButton" )[0] );
    await userEvent.click( screen.getAllByTestId( "dxQTQuestionButton" )[0] );

    let questionLink = screen.getByTestId( "dxQTQuestionLink" );

    expect( questionLink ).toHaveTextContent( testArgs.questionDetailLinkText! );
} );

test( "Question detail link (url) matches parameter value", async () => {
    render( <DXQuestionsTabs {...testArgs} /> );

    await userEvent.click( screen.getAllByTestId( "dxQTSectionButton" )[0] );
    await userEvent.click( screen.getAllByTestId( "dxQTQuestionButton" )[0] );

    let questionLink = screen.getByTestId( "dxQTQuestionLink" );

    expect( questionLink ).toHaveAttribute( "href", testArgs.sections[0].questions[0].questionDetailLink );
} );

test( "Question detail link (target) matches parameter value", async () => {
    render( <DXQuestionsTabs {...testArgs} /> );

    await userEvent.click( screen.getAllByTestId( "dxQTSectionButton" )[0] );
    await userEvent.click( screen.getAllByTestId( "dxQTQuestionButton" )[0] );

    let questionLink = screen.getByTestId( "dxQTQuestionLink" );

    expect( questionLink ).toHaveAttribute( "target", testArgs.sections[0].questions[0].target );
} );

test( "Question closes when user clicks close button", async () => {
    render( <DXQuestionsTabs {...testArgs} /> );

    await userEvent.click( screen.getAllByTestId( "dxQTSectionButton" )[0] );
    await userEvent.click( screen.getAllByTestId( "dxQTQuestionButton" )[0] );
    await userEvent.click( screen.getByTestId( "dxQTQuestionClose" ) );

    expect( screen.getByTestId( "dxQTQuestionDetailContainer" ).childNodes.length ).toEqual( 0 );
} );

describe( "DXQuestionsTabs Hardening", () => {
    const sniperArgs: DXQuestionsTabsProps = {
        title: "Sniper Test Title",
        seeOtherLink: { url: "https://hcl.local", label: "Other Link" },
        sections: [
            {
                title: "Sniper Section Alpha",
                questions: [{
                    question: "Question Alpha",
                    answer: "Answer Alpha",
                    questionDetailLink: "/alpha-link",
                    target: "_self"
                }]
            }
        ]
    };

    test( "charLenghtLimitator strictly respects mathematical boundaries", () => {
        // Kills relational operator mutants (> vs >=) and exact slice boundary traps
        expect( charLenghtLimitator( "12345", 5 ) ).toStrictEqual( "12345" );
        expect( charLenghtLimitator( "123456", 5 ) ).toStrictEqual( "12345..." );
        expect( charLenghtLimitator( "1234", 5 ) ).toStrictEqual( "1234" );
    } );

    test( "Strictly prevents rendering crashes when sections array is completely empty", () => {
        const { container } = render( <DXQuestionsTabs {...sniperArgs} sections={[]} /> );
        const lists = container.querySelectorAll( "li.dxQuestionsTabs_sectionButton" );
        expect( lists.length ).toStrictEqual( 0 );
    } );

    test( "Strictly prevents rendering crashes when questions array is completely empty", async () => {
        const noQuestionsProps = {
            ...sniperArgs,
            sections: [{ title: "Empty Section", questions: [] }]
        };
        const { container } = render( <DXQuestionsTabs {...noQuestionsProps} /> );

        await act( async () => {
            await userEvent.click( screen.getByTestId( "dxQTSectionButton" ) );
        } );

        const questionCells = container.querySelectorAll( ".dxQuestionsTabs__questionCell" );
        expect( questionCells.length ).toStrictEqual( 0 );
    } );

    test( "Strictly intercepts and stops event propagation on section button click", async () => {
        render( <DXQuestionsTabs {...sniperArgs} /> );
        const sectionBtn = screen.getByTestId( "dxQTSectionButton" );

        const clickEvent = new MouseEvent( 'click', { bubbles: true, cancelable: true } );
        const stopPropSpy = jest.spyOn( clickEvent, 'stopPropagation' );

        await act( async () => {
            fireEvent( sectionBtn, clickEvent );
        } );

        expect( stopPropSpy ).toHaveBeenCalledTimes( 1 );
    } );

    test( "Strictly toggles structural CSS classes during state transitions", async () => {
        const { container } = render( <DXQuestionsTabs {...sniperArgs} /> );

        // Find the wrapper using precise DOM traversal to bypass JSDOM limitations on external refs
        const wrapper = container.querySelector( ".dxQuestionsTabs__sectionButtonsContainer" );
        expect( wrapper ).not.toHaveClass( "dxQuestionsTabs__sectionButtonsContainer--active" );

        const sectionBtn = screen.getByTestId( "dxQTSectionButton" );

        await act( async () => {
            await userEvent.click( sectionBtn );
        } );

        expect( wrapper ).toHaveClass( "dxQuestionsTabs__sectionButtonsContainer--active" );
        expect( sectionBtn ).toHaveClass( "active" );

        const questionsContainer = screen.getByTestId( "dxQTQuestionsContainer" );
        expect( questionsContainer ).toHaveClass( "dxQuestionsTabs__questionsContainer--active" );

        // Selecting a question should STRICTLY remove the questionsContainer--active class
        await act( async () => {
            await userEvent.click( screen.getByTestId( "dxQTQuestionButton" ) );
        } );

        expect( questionsContainer ).not.toHaveClass( "dxQuestionsTabs__questionsContainer--active" );
    } );

    test( "Strictly applies default fallback texts and icons when optional props are omitted", async () => {
        const minimalProps = {
            ...sniperArgs,
            questionDetailLinkText: undefined,
            icons: undefined
        };
        render( <DXQuestionsTabs {...minimalProps} /> );

        await act( async () => {
            await userEvent.click( screen.getByTestId( "dxQTSectionButton" ) );
        } );
        await act( async () => {
            await userEvent.click( screen.getByTestId( "dxQTQuestionButton" ) );
        } );

        // 70 char limit applies, so this string is rendered exactly
        expect( screen.getByTestId( "dxQTQuestionLink" ) ).toHaveTextContent( "View answer in a separate page" );

        // Check strict icon class defaults
        expect( screen.getByTestId( "dxQTQuestionClose" ).querySelector( "i" ) ).toHaveClass( "ci-Close_SM" );
        expect( screen.getByTestId( "dxQTQuestionLink" ).querySelector( "i" ) ).toHaveClass( "ci-Chevron_Right_MD" );
    } );

    test( "Strictly switches sections and resets selected question state to undefined", async () => {
        const multiSectionProps = {
            ...sniperArgs,
            sections: [
                { title: "Sec 1", questions: [{ question: "Q1", answer: "A1", questionDetailLink: "/1" }] },
                { title: "Sec 2", questions: [{ question: "Q2", answer: "A2", questionDetailLink: "/2" }] }
            ]
        };
        render( <DXQuestionsTabs {...multiSectionProps} /> );
        const btns = screen.getAllByTestId( "dxQTSectionButton" );

        // Open Section 1 and select question
        await act( async () => { await userEvent.click( btns[0] ); } );
        await act( async () => { await userEvent.click( screen.getByTestId( "dxQTQuestionButton" ) ); } );

        const detailContainersBefore = screen.getAllByTestId( "dxQTQuestionDetailContainer" );
        expect( detailContainersBefore[0].childNodes.length ).toBeGreaterThan( 0 );

        // Click Section 2 (forces state switch path `if (selectedSection != section)`)
        await act( async () => { await userEvent.click( btns[1] ); } );

        const detailContainersAfter = screen.getAllByTestId( "dxQTQuestionDetailContainer" );
        // Section 1 should be closed (empty), Section 2 should be open but with no question selected (empty)
        expect( detailContainersAfter[0].childNodes.length ).toStrictEqual( 0 );
        expect( detailContainersAfter[1].childNodes.length ).toStrictEqual( 0 );
    } );

    test( "Strictly bounds rich text limits (250 chars) while actively parsing/omitting HTML tag nodes", async () => {
        // The component's parsing logic counts the '<' character before flipping the tag state.
        // Therefore, `<p>` and `</p>` each contribute 1 character to the validTextCount.
        // To hit the exact 250 limit without triggering truncation, the inner text must be 248 characters.
        const textExactBoundary = "A".repeat( 248 );
        const textExceedsBoundary = "B".repeat( 250 );

        const props = {
            ...sniperArgs,
            sections: [
                {
                    title: "RichText",
                    questions: [
                        { question: "Q1", answer: `<p>${textExactBoundary}</p>`, questionDetailLink: "/q1" },
                        { question: "Q2", answer: `<b>${textExceedsBoundary}</b>`, questionDetailLink: "/q2" }
                    ]
                }
            ]
        };

        const { unmount } = render( <DXQuestionsTabs {...props} /> );

        // Test Boundary 1: Exact limit (248 inner + 2 tag brackets = 250 valid characters)
        await act( async () => {
            await userEvent.click( screen.getByTestId( "dxQTSectionButton" ) );
        } );
        await act( async () => {
            await userEvent.click( screen.getAllByTestId( "dxQTQuestionButton" )[0] );
        } );

        let body = screen.getByTestId( "dxQTQuestionBody" );
        expect( body.textContent?.endsWith( "..." ) ).toStrictEqual( false );

        // Test Boundary 2: Exceeds limit (250 inner + 2 tag brackets = 252 valid characters)
        await act( async () => {
            await userEvent.click( screen.getByTestId( "dxQTQuestionClose" ) );
        } );
        await act( async () => {
            await userEvent.click( screen.getAllByTestId( "dxQTQuestionButton" )[1] );
        } );

        body = screen.getByTestId( "dxQTQuestionBody" );
        expect( body.textContent?.endsWith( "..." ) ).toStrictEqual( true );

        unmount();
    } );
} );
