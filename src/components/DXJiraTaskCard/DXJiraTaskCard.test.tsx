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

import React, { act } from "react";
import { itSupportsExtensionProps } from "../../testUtils/extensionContract";
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import DXJiraTaskCard, { JiraTaskCardProps } from "./DXJiraTaskCard";
import userEvent from "@testing-library/user-event";
import { DefaultArgs, EmptyListArgs, FilterItemsArgs } from "./DXJiraTaskCard.stories";

describe( "JiraTaskCard component", () => {

    test( "Full Rendering JiraTaskCard", () => {
        render( <DXJiraTaskCard {...DefaultArgs} /> );
        const mainContainer = screen.getByTestId( "dxJiraTaskCard" );
        const projectCard = screen.getByTestId( "dxJiraTaskCard-project" );

        expect( mainContainer ).toBeInTheDocument();
        expect( projectCard ).toBeInTheDocument();

    } );

    test( "If the button with arrow-down icon is pressed and the user have less than 5 tasks, the task list will be displayed with Toggle Menu header", async () => {
        render( <DXJiraTaskCard {...DefaultArgs} /> );
        const mainContainer = screen.getByTestId( "dxJiraTaskCard" );
        const projectCard = screen.getByTestId( "dxJiraTaskCard-project" );
        const button = screen.getByTestId( "button-trigger" );

        await act( async () => {
            await userEvent.click( button );
        } );

        const toggle = screen.getByTestId( "toggleMenu" );
        const list = screen.getByTestId( "list-container" );
        const listTaks = screen.getByTestId( "list-tasks" );

        expect( mainContainer ).toBeInTheDocument();
        expect( projectCard ).toBeInTheDocument();
        expect( toggle ).toBeInTheDocument();
        expect( list ).toBeInTheDocument();
        expect( listTaks ).toBeInTheDocument();
    } );

    test( "If the button with arrow-down icon is pressed and the user have more than 4 tasks, the task list will be displayed with Filter options header", async () => {
        render( <DXJiraTaskCard {...FilterItemsArgs} /> );
        const mainContainer = screen.getByTestId( "dxJiraTaskCard" );
        const projectCard = screen.getByTestId( "dxJiraTaskCard-project" );
        const button = screen.getByTestId( "button-trigger" );

        await act( async () => {
            await userEvent.click( button );
        } );

        const filterOptions = screen.getByTestId( "dxJiraTaskCard__filter" );
        const list = screen.getByTestId( "list-container" );
        const listTaks = screen.getByTestId( "list-tasks" );

        expect( mainContainer ).toBeInTheDocument();
        expect( projectCard ).toBeInTheDocument();
        expect( filterOptions ).toBeInTheDocument();
        expect( list ).toBeInTheDocument();
        expect( listTaks ).toBeInTheDocument();

    } );

    test( "Render JiraTaskCard, the fisrt task with default color status tag", async () => {
        let props = DefaultArgs;
        delete props.tasks![0].status?.color;
        render( <DXJiraTaskCard {...props} /> );
        const button = screen.getByTestId( "button-trigger" );

        await act( async () => {
            await userEvent.click( button );
        } );

        const tagFirstTask = screen.getAllByTestId( "task-tag" )[0];

        expect( tagFirstTask ).toHaveStyle(
            {
                "color": "var(--primary-primary)",
                "border-color": "var(--primary-primary)"
            }
        );

    } );

    test( "Render JiraTaskCard without tasks, it will display empty View with default properties", async () => {
        let props = EmptyListArgs;
        delete props.empty;

        render( <DXJiraTaskCard {...EmptyListArgs} /> );
        const button = screen.getByTestId( "button-trigger" );


        await act( async () => {
            await userEvent.click( button );
        } );
        expect( screen.getByTestId( "dxEmptyState" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "dxEmptyState__title" ) ).toHaveTextContent( "No tasks here" );
        expect( screen.getByTestId( "dxEmptyState__text" ) ).toHaveTextContent( "Contact your manager for additional assignments" );

    } );

    test( "Render JiraTaskCard without tasks, it will display empty View with custom empty properties", async () => {
        let props = EmptyListArgs;
        props.empty = {
            title: "No tasks",
            text: "No tasks for this user"
        };
        render( <DXJiraTaskCard {...props} /> );
        const button = screen.getByTestId( "button-trigger" );

        await act( async () => {
            await userEvent.click( button );
        } );

        expect( screen.getByTestId( "dxEmptyState" ) ).toBeInTheDocument();
        expect( screen.getByTestId( "dxEmptyState__title" ) ).toHaveTextContent( props.empty.title );
        expect( screen.getByTestId( "dxEmptyState__text" ) ).toHaveTextContent( props.empty.text as string );

    } );

} );

describe( "JiraTaskCard component with less than 5 tasks ( Toggle Menu in header) ", () => {
    test( "If the task list is displayed and you select an option from the Toggle Menu, tasks with that label will be filtered", async () => {
        render( <DXJiraTaskCard {...DefaultArgs} /> );
        const mainContainer = screen.getByTestId( "dxJiraTaskCard" );
        const projectCard = screen.getByTestId( "dxJiraTaskCard-project" );
        const button = screen.getByTestId( "button-trigger" );

        await act( async () => {
            await userEvent.click( button );
        } );

        const list = screen.getByTestId( "list-container" );
        const listTaks = screen.getByTestId( "list-tasks" );

        expect( mainContainer ).toBeInTheDocument();
        expect( projectCard ).toBeInTheDocument();
        expect( list ).toBeInTheDocument();
        expect( listTaks ).toBeInTheDocument();

        const toDoOption = screen.getByText( "To do" ) as HTMLButtonElement;

        await act( async () => {
            await userEvent.click( toDoOption );
        } );

        let allCardsofType = DefaultArgs.tasks?.filter( ( item ) => {
            if ( item.status?.label.toLowerCase() === "To do".toLowerCase() ) {
                return item;
            }
        } );
        const taskFiltered = screen.getAllByTestId( "task-item" );
        expect( allCardsofType?.length ).toBe( taskFiltered.length );

        await act( async () => {
            await userEvent.click( toDoOption );
        } );

        expect( DefaultArgs.tasks?.length ).toBe( screen.getAllByTestId( "task-item" ).length );

    } );

    test( "If you select an option from the Toggle Menu and then delete the filter, the previous tasks will return", async () => {
        render( <DXJiraTaskCard {...DefaultArgs} /> );
        const button = screen.getByTestId( "button-trigger" );

        await act( async () => {
            await userEvent.click( button );
        } );

        const toDoOption = screen.getByText( "To do" ) as HTMLButtonElement;
        const doneOption = screen.getByText( "Done" ) as HTMLButtonElement;

        await act( async () => {
            await userEvent.click( toDoOption );
        } );

        await act( async () => {
            await userEvent.click( doneOption );
        } );

        let cardsToDo = DefaultArgs.tasks?.filter( ( item ) => ( item.status?.label.toLowerCase() === "To do".toLowerCase() ) );
        let cardsDone = DefaultArgs.tasks?.filter( ( item ) => ( item.status?.label.toLowerCase() === "Done".toLowerCase() ) );
        expect( cardsToDo!.length + cardsDone!.length ).toBe( screen.getAllByTestId( "task-item" ).length );

        await act( async () => {
            await userEvent.click( toDoOption );
        } );

        expect( cardsDone?.length ).toBe( screen.getAllByTestId( "task-item" ).length );

    } );
} );

describe( "JiraTaskCard component with more than 5 tasks ( Filter in header) ", () => {
    test( "If one label filter, tasks with label selected will be filtered and displayed", async () => {
        const { container } = render( <DXJiraTaskCard {...FilterItemsArgs} /> );
        const button = screen.getByTestId( "button-trigger" );

        await act( async () => {
            await userEvent.click( button );
        } );

        const filter = screen.getByTestId( "filter-button" ) as HTMLButtonElement;

        await act( async () => {
            await userEvent.click( filter );
        } );

        const itemProgress = screen.getAllByRole( "menuitem" )[0];

        await act( async () => {
            await userEvent.click( itemProgress );
        } );

        let cardsInProgress = FilterItemsArgs.tasks?.filter( ( item ) => ( item.status?.label.toLowerCase() === "In progress".toLowerCase() ) );

        expect( cardsInProgress?.length ).toBe( screen.getAllByTestId( "task-item" ).length );

        const tag = container.querySelector( '#tag-Inprogress i' ) as HTMLButtonElement;

        await act( async () => {
            await userEvent.click( tag );
        } );

        expect( FilterItemsArgs.tasks?.length ).toBe( screen.getAllByTestId( "task-item" ).length );
    } );

    test( "If two differents label filters, tasks with labels selected will be filtered and displayed", async () => {
        const { container } = render( <DXJiraTaskCard {...FilterItemsArgs} /> );
        const button = screen.getByTestId( "button-trigger" );

        await act( async () => {
            await userEvent.click( button );
        } );

        const filter = screen.getByTestId( "filter-button" ) as HTMLButtonElement;

        await act( async () => {
            await userEvent.click( filter );
        } );

        const itemProgress = screen.getAllByRole( "menuitem" )[0];
        const inReview = screen.getAllByRole( "menuitem" )[3];

        await act( async () => {
            await userEvent.click( itemProgress );
        } );

        await act( async () => {
            await userEvent.click( inReview );
        } );

        let cardsInProgress = FilterItemsArgs.tasks?.filter( ( item ) => ( item.status?.label.toLowerCase() === "In progress".toLowerCase() ) );
        let cardsInReview = FilterItemsArgs.tasks?.filter( ( item ) => ( item.status?.label.toLowerCase() === "In review".toLowerCase() ) );

        expect( cardsInProgress!.length + cardsInReview!.length ).toBe( screen.getAllByTestId( "task-item" ).length );
        const tag = container.querySelector( '#tag-Inprogress i' ) as HTMLButtonElement;

        await act( async () => {
            await userEvent.click( tag );
        } );

        expect( cardsInReview?.length ).toBe( screen.getAllByTestId( "task-item" ).length );
    } );
} );

describe( "Project Card component ", () => {
    //Symbol
    test( "If the user does pass a symbol, the element 'dxJiraTaskCard__projectSymbol', should have that value", () => {
        let props: JiraTaskCardProps = DefaultArgs;
        props.projectInfo.symbol = "LZT";
        delete props.projectInfo.img;

        const { container } = render( <DXJiraTaskCard {...props} /> );
        let symbol = container.querySelector( ".dxJiraTaskCard__projectSymbol" );
        expect( symbol?.textContent ).toBe( props.projectInfo.symbol );
    } );

    test( "If the user does not pass an img and a symbol, the element 'dxJiraTaskCard__projectSymbol', should be in the document", () => {
        let props: JiraTaskCardProps = DefaultArgs;
        delete props.projectInfo.img;
        delete props.projectInfo.symbol;

        const { container } = render( <DXJiraTaskCard {...props} /> );
        let symbol = container.querySelector( ".dxJiraTaskCard__projectSymbol" );
        expect( symbol ).toBeInTheDocument();
    } );

    //Members
    test( "If the mouse enter over the member image and then leaves, the element 'dxJiraTaskCard__projectTooltip' should be null", () => {
        let props = DefaultArgs;
        props.projectInfo.members = [
            {
                name: "Adam Smith",
                img: "https://images.unsplash.com/photo-1687996345260-2f8e48b6b387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
            }
        ];
        const { container } = render( <DXJiraTaskCard {...props} /> );
        let member = container.querySelector( ".dxJiraTaskCard__projectMemberContainer img" ) as HTMLElement;
        fireEvent.mouseEnter( member );
        fireEvent.mouseLeave( member );
        let tooltip = container.querySelector( ".dxJiraTaskCard__projectTooltip" );
        expect( tooltip ).toBeNull();
    } );

    test( "If the mouse enter over the member avatar and then leaves, the element 'dxJiraTaskCard__projectTooltip' should be null", () => {
        let props = DefaultArgs;
        props.projectInfo.members = [
            {
                name: "Adam Smith",
            }
        ];
        const { container } = render( <DXJiraTaskCard {...props} /> );
        let member = container.querySelector( ".dxJiraTaskCard__projectMemberContainer .dxJiraTaskCard__projectMember" ) as HTMLElement;
        fireEvent.mouseEnter( member );
        fireEvent.mouseLeave( member );
        let tooltip = container.querySelector( ".dxJiraTaskCard__projectTooltip" );
        expect( tooltip ).toBeNull();
    } );
} );

describe( "DXJiraTaskCard Hardening", () => {
    test( "Project Card Math Boundary: strictly slices symbol to exactly 3 characters", () => {
        const props: any = { projectInfo: { name: "Alphabet", symbol: "EXTRALONG", tags: [], members: [] } };
        const { container } = render( <DXJiraTaskCard {...props} /> );
        expect( container.querySelector( ".dxJiraTaskCard__projectSymbol" )?.textContent ).toBe( "EXT" );
    } );

    test( "Project Card Math Boundary: strictly slices name to exactly 3 characters when symbol is omitted", () => {
        const props: any = { projectInfo: { name: "DEVELOPMENT", tags: [], members: [] } };
        const { container } = render( <DXJiraTaskCard {...props} /> );
        expect( container.querySelector( ".dxJiraTaskCard__projectSymbol" )?.textContent ).toBe( "DEV" );
    } );

    test( "Member Slice Math: strictly renders no badge for exactly 5 members", () => {
        const props: any = { projectInfo: { name: "Test", tags: [], members: Array( 5 ).fill( { name: "A", img: "url" } ) } };
        const { container } = render( <DXJiraTaskCard {...props} /> );
        expect( container.querySelector( ".dxJiraTaskCard__projectBadge" ) ).toBeNull();
    } );

    test( "Member Slice Math: strictly renders badge mathematical remainder for > 5 members", () => {
        const props: any = { projectInfo: { name: "Test", tags: [], members: Array( 8 ).fill( { name: "A", img: "url" } ) } };
        const { container } = render( <DXJiraTaskCard {...props} /> );
        expect( container.querySelector( ".dxJiraTaskCard__projectBadge" )?.textContent ).toBe( "+3" );
    } );

    test( "Tooltip State Engine: strictly targets exact array index and resets to -1 on leave", async () => {
        const props: any = { projectInfo: { name: "T", tags: [], members: [{ name: "Zero", img: "url" }, { name: "One", img: "url" }] } };
        const { container } = render( <DXJiraTaskCard {...props} /> );
        const imgs = container.querySelectorAll( ".dxJiraTaskCard__projectProfileImage" );

        await act( async () => { fireEvent.mouseEnter( imgs[1] ); } );
        expect( container.querySelector( ".dxJiraTaskCard__projectTooltip" )?.textContent ).toBe( "One" );

        await act( async () => { fireEvent.mouseLeave( imgs[1] ); } );
        expect( container.querySelector( ".dxJiraTaskCard__projectTooltip" ) ).toBeNull();
    } );

    test( "Tooltip State Engine Avatar Fallback: strictly targets index on SVG avatar enter and resets to -1 on leave", async () => {
        // Uses members without `img` to trigger the `renderAvatarProjectMembers` fallback logic
        const props: any = { projectInfo: { name: "T", tags: [], members: [{ name: "Zero" }, { name: "One" }] } };
        const { container } = render( <DXJiraTaskCard {...props} /> );

        const avatars = container.querySelectorAll( ".dxJiraTaskCard__projectMember" );

        await act( async () => { fireEvent.mouseEnter( avatars[0] ); } );
        expect( container.querySelector( ".dxJiraTaskCard__projectTooltip" )?.textContent ).toBe( "Zero" );

        await act( async () => { fireEvent.mouseLeave( avatars[0] ); } );
        expect( container.querySelector( ".dxJiraTaskCard__projectTooltip" ) ).toBeNull();
    } );

    test( "Filter Engine String Coercion: strictly capitalizes the first letter of task statuses to populate dropdown options", async () => {
        const props: any = {
            projectInfo: { name: "T", tags: [], members: [] },
            tasks: [
                { id: "1", title: { url: "/", label: "A" }, status: { label: "lowercase" } },
            ]
        };
        const { getByTestId } = render( <DXJiraTaskCard {...props} /> );
        await act( async () => { fireEvent.click( getByTestId( "button-trigger" ) ); } );

        const toggleMenu = getByTestId( "toggleMenu" );
        // Mutating string slice/charAt logic causes "Lowercase" generation to fail
        expect( toggleMenu.textContent ).toContain( "Lowercase" );
    } );

    test( "Icon Injection: strictly overrides default accordion arrows via the icons prop", async () => {
        const props: any = {
            projectInfo: { name: "T", tags: [], members: [] },
            icons: { open: "ci-Custom_Open", close: "ci-Custom_Close" }
        };
        const { getByTestId } = render( <DXJiraTaskCard {...props} /> );
        const trigger = getByTestId( "button-trigger" );

        // Initial state (closed)
        expect( trigger.querySelector( "i" ) ).toHaveClass( "ci-Custom_Close" );

        // Open state
        await act( async () => { fireEvent.click( trigger ); } );
        expect( trigger.querySelector( "i" ) ).toHaveClass( "ci-Custom_Open" );
    } );
} );

itSupportsExtensionProps( ( extra ) => <DXJiraTaskCard {...DefaultArgs} {...extra} /> );

test( "extra props: unknown props do not reach the DOM", () => {
    const props = { ...DefaultArgs, unknownProp: "x", "data-extra": "yes" } as React.ComponentProps<typeof DXJiraTaskCard>;
    const { container } = render( <DXJiraTaskCard {...props} /> );
    const root = container.firstElementChild as HTMLElement;
    expect( root ).toHaveAttribute( "data-extra", "yes" );
    expect( root ).not.toHaveAttribute( "unknownprop" );
} );
