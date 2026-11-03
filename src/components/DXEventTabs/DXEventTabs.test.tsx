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
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DXEventTabs from "./DXEventTabs";
import { EventTabsChangedIconsArgs, tabsArgs } from "./DXEventTabs.stories";
import { overflowText } from "../../utilities";

const actualYear = new Date( Date.now() ).getFullYear();

const EIGHT_EVENTS = [
    {
        id: "1",
        name: "Event Name 1.1",
        startDate: "03/15/" + actualYear,
        endDate: "03/16/" + actualYear,
        url: "/uno",
    },
    {
        id: "2",
        name: "Event Name 1.2",
        startDate: "03/20/" + actualYear,
        endDate: "03/22/" + actualYear,
        url: "/dos",
    },
    {
        id: "3",
        name: "Event Name 1.3",
        startDate: "03/26/" + actualYear,
        endDate: "03/27/" + actualYear,
        url: "/tres",
    },
    {
        id: "4",
        name: "Event Name 1.4",
        startDate: "03/29/" + actualYear,
        endDate: "03/29/" + actualYear,
    },
    {
        id: "5",
        name: "Event Name 1.5",
        startDate: "03/30/" + actualYear,
        endDate: "03/31/" + actualYear,
        url: "/cinco",
    },
    {
        id: "6",
        name: "Event Name 1.6",
        startDate: "04/01/" + actualYear,
        endDate: "04/02/" + actualYear,
    },
    {
        id: "7",
        name: "Event Name 1.7",
        startDate: "04/04/" + actualYear,
        endDate: "04/04/" + actualYear,
        url: "/siete",
    },
    {
        id: "8",
        name: "Event Name 1.8",
        startDate: "04/12/" + actualYear,
        endDate: "05/01/" + actualYear,
        url: "/ocho",
    },
];

const THREE_EVENTS = [
    {
        id: "1",
        name: "Event Name 1.1",
        startDate: "03/15/" + actualYear,
        endDate: "03/16/" + actualYear,
        url: "/uno",
    },
    {
        id: "2",
        name: "Event Name 1.2",
        startDate: "03/20/" + actualYear,
        endDate: "03/22/" + actualYear,
        url: "/dos",
    },
    {
        id: "3",
        name: "Event Name 1.3",
        startDate: "03/26/" + actualYear,
        endDate: "03/27/" + actualYear,
        url: "/tres",
    },
];

test( "If the component's width is greater than 390px the tabs should have the class 'dxEventTabs__tab'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: tabsArgs
    };
    const { getAllByTestId } = render( <DXEventTabs {...props} /> );
    const tab = getAllByTestId( "event-tabs-tab" )[0];
    expect( tab ).toHaveClass( "dxEventTabs__tab" );
} );

test( "If the component's width is greater than 390px the event's info should have the class 'dxEventTabs__eventInfo'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: tabsArgs
    };
    const { getAllByTestId } = render( <DXEventTabs {...props} /> );
    const event = getAllByTestId( "event-tabs-info" )[0];
    expect( event ).toHaveClass( "dxEventTabs__eventInfo" );
} );

test( "If the component's width is equal to 390px the tabs should have the class 'dxEventTabs__tabMobile'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 390; }
        }
    } );
    let props = {
        tabs: tabsArgs
    };
    const { getAllByTestId } = render( <DXEventTabs {...props} /> );
    const tab = getAllByTestId( "event-tabs-tab" )[0];
    expect( tab ).toHaveClass( "dxEventTabs__tabMobile" );
} );

test( "If the component's width is equal to 390px the event's info should have the class 'dxEventTabs__eventInfoMobile'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 390; }
        }
    } );
    let props = {
        tabs: tabsArgs
    };
    const { getAllByTestId } = render( <DXEventTabs {...props} /> );
    const event = getAllByTestId( "event-tabs-info" )[0];
    expect( event ).toHaveClass( "dxEventTabs__eventInfoMobile" );
} );

// How many events render
test( "If the user does not pass eventsPerPage prop, and the component's width greater than 390px it should render 8 elements", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: tabsArgs,
    };
    const { getAllByTestId } = render( <DXEventTabs {...props} /> );
    const events = getAllByTestId( "event-tabs-event" );
    expect( events ).toHaveLength( 8 );
} );

test( "If the user passes eventsPerPage prop as 5, and the component's width greater than 390px it should render 5 elements", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: tabsArgs,
        eventsPerPage: 5
    };
    const { getAllByTestId } = render( <DXEventTabs {...props} /> );
    const events = getAllByTestId( "event-tabs-event" );
    expect( events ).toHaveLength( 5 );
} );

test( "If the user does not pass eventsPerPageMobile prop, and the component's width is equal to 390px it should render 4 elements", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 390; }
        }
    } );
    let props = {
        tabs: tabsArgs,
    };
    const { getAllByTestId } = render( <DXEventTabs {...props} /> );
    const events = getAllByTestId( "event-tabs-event" );
    expect( events ).toHaveLength( 4 );
} );

test( "If the user passes eventsPerPageMobile prop as 3, and the component's width is equal to 390px it should render 3 elements", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 390; }
        }
    } );
    let props = {
        tabs: tabsArgs,
        eventsPerPageMobile: 3
    };
    const { getAllByTestId } = render( <DXEventTabs {...props} /> );
    const events = getAllByTestId( "event-tabs-event" );
    expect( events ).toHaveLength( 3 );
} );

// Test for the empty case
test( "If the user does not pass any events and also does not pass the empty text and title, a title and message will show up  by default", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test Category",
                events: []
            }
        ],
    };
    const { getByText } = render( <DXEventTabs {...props} /> );
    expect( getByText( "No Events!" ) ).toBeInTheDocument();
    expect( getByText( "When you have more events, they will appear in here." ) ).toBeInTheDocument();
} );

test( "If the user does not pass any events and passes the empty text, that will showed up", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test Category",
                events: []
            }
        ],
        empty: {
            title: "No events!",
            text: "Sorry, there is no events"
        }
    };
    const { getByText } = render( <DXEventTabs {...props} /> );
    expect( getByText( props.empty.title ) ).toBeInTheDocument();
    expect( getByText( props.empty.text ) ).toBeInTheDocument();
} );

test( "If the user does not pass any image for the empty scenario, it will be undefined", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test Category",
                events: []
            }
        ],
        empty: {
            title: "Test Title",
            text: "Sorry, there is no events"
        }
    };
    const { container } = render( <DXEventTabs {...props} /> );
    const img = container.querySelector( '.dxEventTabs__emptyImage' )?.childNodes[0];
    expect( img ).toBeUndefined();
} );

test( "If there are no events and it is in the mobile variant, the empty view adapted to the mobile screen will be displayed", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 390; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: []
            }
        ],
        empty: {
            title: "No events!",
            text: "Sorry, there is no events"
        }
    };
    const { container } = render( <DXEventTabs {...props} /> );
    const textInfo = container.querySelector( '.dxEventTabs__empty' )?.childNodes[1] as HTMLImageElement;
    const tabs = container.querySelector( '.dxEventTabs' )?.childNodes[0] as HTMLImageElement;
    expect( tabs?.classList.contains( "dxEventTabs__tabsMobile" ) ).toBeTruthy();

} );

// Test for changing the active tab
test( "When the component is first rendered, the first tab should have the class 'dxEventTabs__tab--active'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: tabsArgs,
    };
    const { getAllByTestId } = render( <DXEventTabs {...props} /> );
    const firstTab = getAllByTestId( "event-tabs-tab" )[0];
    expect( firstTab ).toHaveClass( "dxEventTabs__tab--active" );
} );

test( "if the user click on the second tab, that tab should have the class 'dxEventTabs__tab--active'", async () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: tabsArgs,
    };
    const { getAllByTestId } = render( <DXEventTabs {...props} /> );
    const tab = getAllByTestId( "event-tabs-tab" )[1] as HTMLElement;
    await userEvent.click( tab );
    const newActiveTab = getAllByTestId( "event-tabs-tab" )[1];
    expect( newActiveTab ).toHaveClass( "dxEventTabs__tab--active" );
} );

test( "If the user clicks on the second tab, then the first event showed should correspond to that tab", async () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: tabsArgs,
    };
    const { getAllByTestId } = render( <DXEventTabs {...props} /> );
    const tab = getAllByTestId( "event-tabs-tab" )[1];
    await userEvent.click( tab );
    const firstEvent = getAllByTestId( "event-tabs-info" )[0].childNodes[0] as HTMLElement;
    expect( firstEvent.textContent ).toEqual( props.tabs[0].events[0].name );
} );

test( "If the user focus the second tab and click on the Enter key, it should have the class 'dxEventTabs__tab--active'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: tabsArgs,
    };
    const { getAllByTestId } = render( <DXEventTabs {...props} /> );
    const tab = getAllByTestId( "event-tabs-tab" )[1] as HTMLElement;
    tab.focus();
    fireEvent.keyDown( tab, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    const newActiveTab = getAllByTestId( "event-tabs-tab" )[1];
    expect( newActiveTab ).toHaveClass( "dxEventTabs__tab--active" );
} );

test( "If the user focus the second tab and click on the Space key, it should have the class 'dxEventTabs__tab--active'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: tabsArgs,
    };
    const { getAllByTestId } = render( <DXEventTabs {...props} /> );
    const tab = getAllByTestId( "event-tabs-tab" )[1] as HTMLElement;
    tab.focus();
    fireEvent.keyDown( tab, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    const newActiveTab = getAllByTestId( "event-tabs-tab" )[1];
    expect( newActiveTab ).toHaveClass( "dxEventTabs__tab--active" );
} );

test( "If the user focus the second tab and press the Escape key, it should not have the class 'dxEventTabs--disabled'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: tabsArgs,
    };
    const { getAllByTestId } = render( <DXEventTabs {...props} /> );
    const tab = getAllByTestId( "event-tabs-tab" )[1] as HTMLElement;
    tab.focus();
    fireEvent.keyDown( tab, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    const newActiveTab = getAllByTestId( "event-tabs-tab" )[1];
    expect( newActiveTab ).not.toHaveClass( "dxEventTabs__tab--active" );
} );

test( "if the user click on the active tab, that tab should have the class 'dxEventTabs__tab--active'", async () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: tabsArgs,
    };
    const { container, getAllByTestId } = render( <DXEventTabs {...props} /> );
    const tab = container.querySelector( ".dxEventTabs__tab--active" ) as HTMLElement;
    await userEvent.click( tab );
    const newActiveTab = getAllByTestId( "event-tabs-tab" )[0];
    expect( newActiveTab ).toHaveClass( "dxEventTabs__tab--active" );
} );

test( "If the user clicks on the active tab, then the first event showed should correspond to that tab", async () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: tabsArgs,
    };
    const { getAllByTestId, container } = render( <DXEventTabs {...props} /> );
    const tab = container.querySelector( ".dxEventTabs__tab--active" ) as HTMLElement;
    await userEvent.click( tab );
    const firstEvent = getAllByTestId( "event-tabs-info" )[0].childNodes[0] as HTMLElement;
    expect( firstEvent.textContent ).toEqual( props.tabs[0].events[0].name );
} );

test( "If the user focus the active tab and click on the Enter key, it should have the class 'dxEventTabs__tab--active'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: tabsArgs,
    };
    const { getAllByTestId, container } = render( <DXEventTabs {...props} /> );
    const tab = container.querySelector( ".dxEventTabs__tab--active" ) as HTMLElement;
    tab.focus();
    fireEvent.keyDown( tab, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    const newActiveTab = getAllByTestId( "event-tabs-tab" )[0];
    expect( newActiveTab ).toHaveClass( "dxEventTabs__tab--active" );
} );

test( "If the user focus the active tab and click on the Space key, it should have the class 'dxEventTabs__tab--active'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: tabsArgs,
    };
    const { getAllByTestId, container } = render( <DXEventTabs {...props} /> );
    const tab = container.querySelector( ".dxEventTabs__tab--active" ) as HTMLElement;
    tab.focus();
    fireEvent.keyDown( tab, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    const newActiveTab = getAllByTestId( "event-tabs-tab" )[0];
    expect( newActiveTab ).toHaveClass( "dxEventTabs__tab--active" );
} );

test( "If the user focus the active tab and press the Escape key, it should have the class 'dxEventTabs--disabled'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: tabsArgs,
    };
    const { getAllByTestId, container } = render( <DXEventTabs {...props} /> );
    const tab = container.querySelector( ".dxEventTabs__tab--active" ) as HTMLElement;
    tab.focus();
    fireEvent.keyDown( tab, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    const newActiveTab = getAllByTestId( "event-tabs-tab" )[0];
    expect( newActiveTab ).toHaveClass( "dxEventTabs__tab--active" );
} );

// Test the pagination buttons
test( "If the user pass just 3 events for the first tab, and eventsPerPage is 3, the left pagination button should have the class 'dxEventTabs--disabled'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: THREE_EVENTS
            }
        ],
        eventsPerPage: 3
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const leftButton = getByTestId( "event-tabs-left" );
    expect( leftButton ).toHaveClass( "dxEventTabs--disabled" );
} );

test( "If the user pass just 3 events for the first tab, and eventsPerPage is 3, the right pagination button should have the class 'dxEventTabs--disabled'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: THREE_EVENTS
            }
        ],
        eventsPerPage: 3
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const rightButton = getByTestId( "event-tabs-right" );
    expect( rightButton ).toHaveClass( "dxEventTabs--disabled" );
} );

test( "If the user pass 8 events for the first tab and eventsPerPage equal to 4, the right pagination button should not have the class 'dxEventTabs--disabled'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: EIGHT_EVENTS
            }
        ],
        eventsPerPage: 4
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const rightButton = getByTestId( "event-tabs-right" );
    expect( rightButton ).not.toHaveClass( "dxEventTabs--disabled" );
} );

test( "If the user pass 8 events for the first tab and eventsPerPage equal to 4, and then click on the right pagination button, it should have the class 'dxEventTabs--disabled'", async () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: EIGHT_EVENTS
            }
        ],
        eventsPerPage: 4
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const rightButton = getByTestId( "event-tabs-right" );
    await userEvent.click( rightButton );
    const newRightButton = getByTestId( "event-tabs-right" );
    expect( newRightButton ).toHaveClass( "dxEventTabs--disabled" );
} );

test( "If the user pass 8 events for the first tab and eventsPerPage equal to 4, and focus the right pagination button next to press the Enter key it should have the class 'dxEventTabs--disabled'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: EIGHT_EVENTS
            }
        ],
        eventsPerPage: 4
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const rightButton = getByTestId( "event-tabs-right" );
    rightButton.focus();
    fireEvent.keyDown( rightButton, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    const newRightButton = getByTestId( "event-tabs-right" );
    expect( newRightButton ).toHaveClass( "dxEventTabs--disabled" );
} );

test( "If the user pass 8 events for the first tab and eventsPerPage equal to 4, and focus the right pagination button next to press the Space key it should have the class 'dxEventTabs--disabled'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: EIGHT_EVENTS
            }
        ],
        eventsPerPage: 4
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const rightButton = getByTestId( "event-tabs-right" );
    rightButton.focus();
    fireEvent.keyDown( rightButton, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    const newRightButton = getByTestId( "event-tabs-right" );
    expect( newRightButton ).toHaveClass( "dxEventTabs--disabled" );
} );

test( "If the user pass 8 events for the first tab and eventsPerPage equal to 4, and focus the right pagination button next to press the Escape key it should not have the class 'dxEventTabs--disabled'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: EIGHT_EVENTS
            }
        ],
        eventsPerPage: 4
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const rightButton = getByTestId( "event-tabs-right" );
    rightButton.focus();
    fireEvent.keyDown( rightButton, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    const newRightButton = getByTestId( "event-tabs-right" );
    expect( newRightButton ).not.toHaveClass( "dxEventTabs--disabled" );
} );

test( "If the user pass 8 events for the first tab and eventsPerPage equal to 4, and then click on the right pagination button, the left pagination button should not have the class 'dxEventTabs--disabled'", async () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: EIGHT_EVENTS
            }
        ],
        eventsPerPage: 4
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const rightButton = getByTestId( "event-tabs-right" );
    await userEvent.click( rightButton );
    const leftButton = getByTestId( "event-tabs-left" );
    expect( leftButton ).not.toHaveClass( "dxEventTabs--disabled" );
} );

test( "If the user pass 8 events for the first tab and eventsPerPage equal to 4, and then click on the right pagination button, and follow by clicking the left pagination button it should have the class 'dxEventTabs--disabled'", async () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: EIGHT_EVENTS
            }
        ],
        eventsPerPage: 4
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const rightButton = getByTestId( "event-tabs-right" );
    await userEvent.click( rightButton );
    const leftButton = getByTestId( "event-tabs-left" );
    await userEvent.click( leftButton );
    const newLeftButton = getByTestId( "event-tabs-left" );
    expect( newLeftButton ).toHaveClass( "dxEventTabs--disabled" );
} );

test( "If the user pass 8 events for the first tab and eventsPerPage equal to 4, and then click on the right pagination button, and follow by pressing the Enter key it should have the class 'dxEventTabs--disabled'", async () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: EIGHT_EVENTS
            }
        ],
        eventsPerPage: 4
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const rightButton = getByTestId( "event-tabs-right" );
    await userEvent.click( rightButton );
    const leftButton = getByTestId( "event-tabs-left" );
    fireEvent.keyDown( leftButton, {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        charCode: 13,
    } );
    const newLeftButton = getByTestId( "event-tabs-left" );
    expect( newLeftButton ).toHaveClass( "dxEventTabs--disabled" );
} );

test( "If the user pass 8 events for the first tab and eventsPerPage equal to 4, and then click on the right pagination button, and follow by pressing the Space key it should have the class 'dxEventTabs--disabled'", async () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: EIGHT_EVENTS
            }
        ],
        eventsPerPage: 4
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const rightButton = getByTestId( "event-tabs-right" );
    await userEvent.click( rightButton );
    const leftButton = getByTestId( "event-tabs-left" );
    fireEvent.keyDown( leftButton, {
        key: "Space",
        code: "Space",
        keyCode: 32,
        charCode: 32,
    } );
    const newLeftButton = getByTestId( "event-tabs-left" );
    expect( newLeftButton ).toHaveClass( "dxEventTabs--disabled" );
} );

test( "If the user pass 8 events for the first tab and eventsPerPage equal to 4, and then click on the right pagination button, and follow by pressing the Escape key it should not have the class 'dxEventTabs--disabled'", async () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: EIGHT_EVENTS
            }
        ],
        eventsPerPage: 4
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const rightButton = getByTestId( "event-tabs-right" );
    await userEvent.click( rightButton );
    const leftButton = getByTestId( "event-tabs-left" );
    fireEvent.keyDown( leftButton, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
    } );
    const newLeftButton = getByTestId( "event-tabs-left" );
    expect( newLeftButton ).not.toHaveClass( "dxEventTabs--disabled" );
} );

// Date format tests
test( "If the user passes startDate and endDate on different month and day and year, for the first event, the dates on the render should be correct", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Event Name 1.1",
                        startDate: "Jan/15/" + ( actualYear + 1 ),
                        endDate: "March/16/" + ( actualYear + 2 ),
                        url: "/uno",
                    },
                ]
            }
        ],
        dateFormat: "Mon/DD/YY"
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const date = getByTestId( "event-tabs-date" );
    expect( date.textContent ).toBe( `Jan 15, ${actualYear + 1} - Mar 16, ${actualYear + 2}` );
} );

test( "If the user passes startDate and endDate on different month and day but same year that is after today's, for the first event, the dates on the render should be correct", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Event Name 1.1",
                        startDate: "Jan/15/" + ( actualYear + 1 ),
                        endDate: "March/16/" + ( actualYear + 1 ),
                        url: "/uno",
                    },
                ]
            }
        ],
        dateFormat: "Mon/DD/YY"
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const date = getByTestId( "event-tabs-date" );
    expect( date.textContent ).toBe( `Jan 15 - Mar 16, ${actualYear + 1}` );
} );

test( "If the user passes startDate and endDate on different month and day but same year, for the first event, the dates on the render should be correct", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Event Name 1.1",
                        startDate: "Jan/15/" + actualYear,
                        endDate: "March/16/" + actualYear,
                        url: "/uno",
                    },
                ]
            }
        ],
        dateFormat: "Mon/DD/YY"
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const date = getByTestId( "event-tabs-date" );
    expect( date.textContent ).toBe( "Jan 15 - Mar 16" );
} );

test( "If the user passes startDate and endDate on different month and day but same year, for the first event, the dates on the render should be correct", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Event Name 1.1",
                        startDate: "March/15/" + actualYear,
                        endDate: "June/15/" + actualYear,
                        url: "/uno",
                    },
                ]
            }
        ],
        dateFormat: "Mon/DD/YY"
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const date = getByTestId( "event-tabs-date" );
    expect( date.textContent ).toBe( "Mar 15 - Jun 15" );
} );

test( "If the user passes startDate and endDate on same month and year but different day, for the first event, the dates on the render should be correct", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Event Name 1.1",
                        startDate: "March/15/" + actualYear,
                        endDate: "March/17/" + actualYear,
                        url: "/uno",
                    },
                ]
            }
        ],
        dateFormat: "Mon/DD/YY"
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const date = getByTestId( "event-tabs-date" );
    expect( date.textContent ).toBe( "Mar 15 - 17" );
} );

test( "If the user passes startDate and endDate on same month day and year, for the first event, the dates on the render should be correct", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Event Name 1.1",
                        startDate: "March/15/" + actualYear,
                        endDate: "March/15/" + actualYear,
                        url: "/uno",
                    },
                ]
            }
        ],
        dateFormat: "Mon/DD/YY"
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const date = getByTestId( "event-tabs-date" );
    expect( date.textContent ).toBe( "Mar 15" );
} );

test( "If the user passes startDate on a previuos year and endDate on this year, for the first event, the dates on the render should be correct", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Event Name 1.1",
                        startDate: "March/15/" + ( actualYear - 1 ),
                        endDate: "April/15/" + actualYear,
                        url: "/uno",
                    },
                ]
            }
        ],
        dateFormat: "Mon/DD/YY"
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const date = getByTestId( "event-tabs-date" );
    expect( date.textContent ).toBe( `Mar 15, ${actualYear - 1} - Apr 15` );
} );

test( "If the user passes startDate only but in a different year, for the first event, the dates on the render should be correct", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Event Name 1.1",
                        startDate: "March/15/" + ( actualYear + 1 ),
                        url: "/uno",
                    },
                ]
            }
        ],
        dateFormat: "Mon/DD/YY"
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const date = getByTestId( "event-tabs-date" );
    expect( date.textContent ).toBe( `Mar 15, ${actualYear + 1}` );
} );

test( "If the user passes startDate and endDate on different day, same month and year, in a year in the future, the dates on the render should be correct", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Event Name 1.1",
                        startDate: "Jan/15/" + ( actualYear + 1 ),
                        endDate: "Jan/16/" + ( actualYear + 1 ),
                        url: "/uno",
                    },
                ]
            }
        ],
        dateFormat: "Mon/DD/YY"
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const date = getByTestId( "event-tabs-date" );
    expect( date.textContent ).toBe( `Jan 15 - 16, ${actualYear + 1}` );
} );

test( "If the user passes startDate and endDate on same month,  day, in a year in the future, the dates on the render should be correct", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 560; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Event Name 1.1",
                        startDate: "Jan/15/" + ( actualYear + 1 ),
                        endDate: "Jan/15/" + ( actualYear + 1 ),
                        url: "/uno",
                    },
                ]
            }
        ],
        dateFormat: "Mon/DD/YY"
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const date = getByTestId( "event-tabs-date" );
    expect( date.textContent ).toBe( `Jan 15, ${actualYear + 1}` );
} );

// Tests for the text overflow
test( "If the user passes a event name longer than 40 characters, the '...' will be on the string", () => {
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Lorem ipsum dolor sit amet, consectetuer adipiscindslaknalsda",
                        startDate: "March/15/" + actualYear,
                        endDate: "March/15/" + actualYear,
                    },
                ]
            }
        ]
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const info = getByTestId( "event-tabs-info" ).childNodes[0];
    expect( info.textContent ).toContain( overflowText( props.tabs[0].events[0].name, 40 ) );
} );

test( "If the user passes a event name longer than the eventNameCharLimit, the '...' will be on the string", () => {
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Lorem ipsum dolor sit amet, consectetuer adipiscindslaknalsda",
                        startDate: "March/15/" + actualYear,
                        endDate: "March/15/" + actualYear,
                    },
                ]
            }
        ],
        eventNameCharLimit: 30
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const info = getByTestId( "event-tabs-info" ).childNodes[0];
    expect( info.textContent ).toContain( overflowText( props.tabs[0].events[0].name, 30 ) );
} );

test( "If the user passes a event name longer than the eventNameCharLimit, the '...' will be on the anchor label", () => {
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Lorem ipsum dolor sit amet, consectetuer adipiscindslaknalsda",
                        url: '/one',
                        startDate: "March/15/" + actualYear,
                        endDate: "March/15/" + actualYear,
                    },
                ]
            }
        ],
        eventNameCharLimit: 30
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const info = getByTestId( "event-tabs-info" ).childNodes[0].childNodes[0] as HTMLAnchorElement;
    expect( info.text ).toContain( overflowText( props.tabs[0].events[0].name, 30 ) );
} );

test( "If the user passes a event name longer than the eventNameCharLimit, the '...' will be on the anchor label", () => {
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Lorem ipsum dolor sit amet, consectetuer adipiscindslaknalsda",
                        url: '/one',
                        startDate: "March/15/" + actualYear,
                        endDate: "March/15/" + actualYear,
                    },
                ]
            }
        ],
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const info = getByTestId( "event-tabs-info" ).childNodes[0].childNodes[0] as HTMLAnchorElement;
    expect( info.text ).toContain( overflowText( props.tabs[0].events[0].name, 40 ) );
} );

// Tests for no endDate passed
test( "If the user does not pass an endDate the date displayed will correspond to the startDate", () => {
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Event 1.1",
                        startDate: "03/15/" + actualYear,
                    },
                ]
            }
        ],
        eventNameCharLimit: 30
    };
    const { getAllByTestId } = render( <DXEventTabs {...props} /> );
    const firstEvent = getAllByTestId( "event-tabs-event" )[0] as HTMLElement;
    const info = firstEvent.querySelector( '[data-testid="event-tabs-info"]' );
    expect( info?.childNodes[1].textContent ).toEqual( "Mar 15" );
} );

// Tests for rendering or not the anchor on the event's name
test( "If the user does not pass a link for the first event, the grand child of 'event-tabs-info' should not be an 'A' tag", () => {
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Event 1.1",
                        startDate: "03/15/" + actualYear,
                    },
                ]
            }
        ],
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    let info = getByTestId( "event-tabs-info" );
    let anchor = info.childNodes[0].childNodes[0] as HTMLElement;
    expect( anchor.tagName ).not.toEqual( "A" );
} );

test( "If the user passes a link for the first event, the grand child of 'event-tabs-info' should be an 'A' tag", () => {
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Event 1.1",
                        startDate: "03/15/" + actualYear,
                        url: "/one"
                    },
                ]
            }
        ],
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    let info = getByTestId( "event-tabs-info" );
    let anchor = info.childNodes[0].childNodes[0] as HTMLElement;
    expect( anchor.tagName ).toEqual( "A" );
} );

test( "If the user passes an url for the first event, the href of the anchor should be the same", () => {
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Event 1.1",
                        startDate: "03/15/" + actualYear,
                        url: "/one"
                    },
                ]
            }
        ],
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    let info = getByTestId( "event-tabs-info" );
    let anchor = info.childNodes[0].childNodes[0] as HTMLAnchorElement;
    expect( anchor.href ).toContain( props.tabs[0].events[0].url );
} );

test( "If the user passes an url for the first event, the tabIndex on the anchor should be '1.01'", () => {
    let props = {
        tabs: [
            {
                category: "Test category",
                events: [
                    {
                        id: "1",
                        name: "Event 1.1",
                        startDate: "03/15/" + actualYear,
                        url: "/one"
                    },
                ]
            }
        ],
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    let info = getByTestId( "event-tabs-info" );
    let anchor = info.childNodes[0].childNodes[0] as HTMLAnchorElement;
    let tabIndex = anchor.attributes[2].value;
    expect( tabIndex ).toEqual( "1.01" );
} );


test( "If the user passes an url for the twelve event, the tabIndex on the anchor should be '1.01'", () => {
    let props = {
        tabs: tabsArgs,
        eventsPerPage: 12
    };
    const { getAllByTestId } = render( <DXEventTabs {...props} /> );
    let info = getAllByTestId( "event-tabs-info" );
    let anchor = info[info.length - 1].childNodes[0].childNodes[0] as HTMLAnchorElement;
    let tabIndex = anchor.attributes[2].value;
    expect( tabIndex ).toEqual( "1." + props.eventsPerPage );
} );

// Tests for the tabIndex value for the navigation buttons
test( "If the user does not pass eventsPerPage the tabIndex value for the previous button should be '1.09'", () => {
    let props = {
        tabs: [
            {
                category: "Test category",
                events: EIGHT_EVENTS
            }
        ],
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const prevBtn = getByTestId( "event-tabs-left" );
    expect( prevBtn.getAttribute( "tabIndex" ) ).toEqual( `1.09` );
} );

test( "If the user does not pass eventsPerPage the tabIndex value for the next button should be '1.1'", () => {
    let props = {
        tabs: [
            {
                category: "Test category",
                events: EIGHT_EVENTS
            }
        ],
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const prevBtn = getByTestId( "event-tabs-right" );
    expect( prevBtn.getAttribute( "tabIndex" ) ).toEqual( `1.1` );
} );

test( "If the user does passes eventsPerPage the tabIndex value for the previous button should be '1.eventsPerPage + 1'", () => {
    let props = {
        tabs: [
            {
                category: "Test category",
                events: EIGHT_EVENTS
            }
        ],
        eventsPerPage: 6
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const prevBtn = getByTestId( "event-tabs-left" );
    expect( prevBtn.getAttribute( "tabIndex" ) ).toEqual( `1.0${props.eventsPerPage + 1}` );
} );

test( "If the user does not pass eventsPerPage the tabIndex value for the next button should be '1.eventsPerPage + 2'", () => {
    let props = {
        tabs: [
            {
                category: "Test category",
                events: EIGHT_EVENTS
            }
        ],
        eventsPerPage: 6
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const prevBtn = getByTestId( "event-tabs-right" );
    expect( prevBtn.getAttribute( "tabIndex" ) ).toEqual( `1.0${props.eventsPerPage + 2}` );
} );

test( "If the user does not pass eventsPerPageMobile the tabIndex value for the previous button should be '1.05'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 390; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: EIGHT_EVENTS
            }
        ],
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const prevBtn = getByTestId( "event-tabs-left" );
    expect( prevBtn.getAttribute( "tabIndex" ) ).toEqual( `1.05` );
} );

test( "If the user does not pass eventsPerPageMobile the tabIndex value for the next button should be '1.06'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 390; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: EIGHT_EVENTS
            }
        ],
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const prevBtn = getByTestId( "event-tabs-right" );
    expect( prevBtn.getAttribute( "tabIndex" ) ).toEqual( `1.06` );
} );

test( "If the user does passes eventsPerPageMobile the tabIndex value for the previous button should be '1.eventsPerPageMobile + 1'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 390; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: EIGHT_EVENTS
            }
        ],
        eventsPerPageMobile: 3
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const prevBtn = getByTestId( "event-tabs-left" );
    expect( prevBtn.getAttribute( "tabIndex" ) ).toEqual( `1.0${props.eventsPerPageMobile + 1}` );
} );

test( "If the user does not pass eventsPerPage the tabIndex value for the next button should be '1.eventsPerPage + 2'", () => {
    Object.defineProperties( window.HTMLElement.prototype, {
        offsetWidth: {
            get: function () { return 390; }
        }
    } );
    let props = {
        tabs: [
            {
                category: "Test category",
                events: EIGHT_EVENTS
            }
        ],
        eventsPerPageMobile: 6
    };
    const { getByTestId } = render( <DXEventTabs {...props} /> );
    const prevBtn = getByTestId( "event-tabs-right" );
    expect( prevBtn.getAttribute( "tabIndex" ) ).toEqual( `1.0${props.eventsPerPageMobile + 2}` );
} );

test( "If directional icons change if value is set", () => {
    expect.assertions( 2 );
    render( <DXEventTabs {...EventTabsChangedIconsArgs} /> );

    expect( screen.getByTestId( "event-tabs-right" ).querySelector( "i" ) ).toHaveClass( EventTabsChangedIconsArgs.icons.next );
    expect( screen.getByTestId( "event-tabs-left" ).querySelector( "i" ) ).toHaveClass( EventTabsChangedIconsArgs.icons.prev );
} );

test( "If event icon changes if parameter is send", () => {
    render( <DXEventTabs {...EventTabsChangedIconsArgs} /> );

    let eventElement = screen.getAllByTestId( "event-tabs-event" )[0];

    expect( eventElement.querySelector( "i" ) ).toHaveClass( EventTabsChangedIconsArgs.icons.event );
} );
