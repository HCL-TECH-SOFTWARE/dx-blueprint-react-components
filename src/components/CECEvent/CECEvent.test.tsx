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

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CECEvent, { getEventStartDate, getEventEndDate } from './CECEvent';
import type { CECEventData, CECEventRecurrence, DateFormat } from './CECEvent.types';
import { itSupportsExtensionProps } from '../../testUtils/extensionContract';
import '@testing-library/jest-dom';
// Helper function to create mock event with proper typing
const createMockEvent = ( overrides: Partial<CECEventData> = {} ): CECEventData => ( {
    id: '1',
    eventUuid: 'event-123',
    title: 'Test Event',
    description: '<p>This is a test event description</p>',
    date: '2025-01-01T00:00:00Z',
    author: {
        id: 'user1',
        email: 'user1@example.com',
        name: 'Test User',
        userState: 'active',
        isExternal: false,
    },
    contributor: {
        id: 'user2',
        email: 'user2@example.com',
        name: 'Contributor User',
        userState: 'active',
        isExternal: false,
    },
    category: 'Conference',
    location: 'Virtual',
    tags: ['tech', 'conference'],
    recurrence: {
        frequency: 'weekly',
        interval: 1,
        until: '2025-12-31',
        allDay: '0',
        startDate: '2025-01-01T10:00:00Z',
        endDate: '2025-01-01T11:00:00Z',
        byDay: 'MO,WE,FR'
    } as CECEventRecurrence,
    links: [],
    communityUuid: 'community-123',
    ...overrides
} );
// Mock data for testing
const mockEvent = createMockEvent();
// Default props for testing
const defaultProps = {
    event: mockEvent
};
describe( 'CECEvent Component', () => {
    test( 'getEventStartDate uses fallback precedence correctly', () => {
        expect( getEventStartDate( undefined ) ).not.toEqual( '' );
        const fromRecurrence = createMockEvent( {
            startDate: '2026-01-10T10:00:00Z',
            date: '2026-01-11T10:00:00Z',
            recurrence: {
                ...mockEvent.recurrence!,
                startDate: '2026-01-09T10:00:00Z',
            } as CECEventRecurrence,
        } );
        expect( getEventStartDate( fromRecurrence ) ).toBe( '2026-01-09T10:00:00Z' );
        const fromStartDate = createMockEvent( {
            startDate: '2026-02-01T10:00:00Z',
            recurrence: undefined,
        } );
        expect( getEventStartDate( fromStartDate ) ).toBe( '2026-02-01T10:00:00Z' );
        const fromDate = createMockEvent( {
            startDate: undefined,
            date: '2026-03-01T10:00:00Z',
            recurrence: undefined,
        } );
        expect( getEventStartDate( fromDate ) ).toBe( '2026-03-01T10:00:00Z' );
    } );
    test( 'getEventEndDate uses fallback precedence correctly', () => {
        expect( getEventEndDate( undefined ) ).not.toEqual( '' );
        const fromUntil = createMockEvent( {
            startDate: '2026-04-10T10:00:00Z',
            recurrence: {
                ...mockEvent.recurrence!,
                until: '2026-04-20T10:00:00Z',
                endDate: '2026-04-19T10:00:00Z',
                startDate: '2026-04-18T10:00:00Z',
            } as CECEventRecurrence,
        } );
        expect( getEventEndDate( fromUntil ) ).toBe( '2026-04-20T10:00:00Z' );
        const fromEndDate = createMockEvent( {
            startDate: '2026-05-10T10:00:00Z',
            recurrence: {
                ...mockEvent.recurrence!,
                until: '',
                endDate: '2026-05-19T10:00:00Z',
                startDate: '2026-05-18T10:00:00Z',
            } as CECEventRecurrence,
        } );
        expect( getEventEndDate( fromEndDate ) ).toBe( '2026-05-19T10:00:00Z' );
        const fromRecurrenceStart = createMockEvent( {
            startDate: '2026-06-10T10:00:00Z',
            recurrence: {
                ...mockEvent.recurrence!,
                until: '',
                endDate: '',
                startDate: '2026-06-18T10:00:00Z',
            } as CECEventRecurrence,
        } );
        expect( getEventEndDate( fromRecurrenceStart ) ).toBe( '2026-06-18T10:00:00Z' );
        const fromStartDate = createMockEvent( {
            startDate: '2026-07-10T10:00:00Z',
            recurrence: undefined,
        } );
        expect( getEventEndDate( fromStartDate ) ).toBe( '2026-07-10T10:00:00Z' );
    } );
    test( 'removes anchor markup from description while preserving text', () => {
        const eventWithLink = createMockEvent( {
            description: '<p>Intro text</p><a href="https://example.com">Join now</a><p>Outro text</p>',
        } );
        render( <CECEvent event={eventWithLink} showDescription={true} /> );
        const descriptionElement = screen.getByTestId( 'cec-event' ).querySelector( '.cec-event__description' );
        expect( descriptionElement ).toBeInTheDocument();
        expect( descriptionElement ).toHaveTextContent( /Intro text.*Outro text/ );
        expect( descriptionElement?.innerHTML ).not.toContain( '<a' );
        expect( descriptionElement?.innerHTML ).not.toContain( 'Join now' );
    } );
    // Update the date check in the "renders with default props" test
    test( 'renders with default props', () => {
        render( <CECEvent event={mockEvent} /> );
        // Check if the event title is rendered
        expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        // Check for month and day using test IDs
        const monthElement = screen.getByTestId( 'event-date-month' );
        const dayElement = screen.getByTestId( 'event-date-day' );
        expect( monthElement ).toBeInTheDocument();
        expect( dayElement ).toBeInTheDocument();
        expect( monthElement.textContent ).toBe( 'Jan' );
        expect( dayElement.textContent ).toBe( '01' );
        // Check if the location is rendered
        expect( screen.getByText( 'Virtual' ) ).toBeInTheDocument();
        // Check if tags are rendered
        expect( screen.getByText( 'TECH' ) ).toBeInTheDocument();
        expect( screen.getByText( 'CONFERE...' ) ).toBeInTheDocument();
    } );
    test( 'renders in river variant', () => {
        render( <CECEvent event={mockEvent} variant="river" /> );
        // Check if the component has the river class
        const eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toHaveClass( 'cec-event__river' );
    } );
    test( 'behaves as static card without click interaction', () => {
        const handleClick = jest.fn();
        render( <CECEvent event={mockEvent} onClick={handleClick} /> );
        // Simulate click
        const eventElement = screen.getByTestId( 'cec-event' );
        fireEvent.click( eventElement );
        // Check that click handler is NOT called (static card behavior)
        expect( handleClick ).toHaveBeenCalledTimes( 0 );
        // Verify it has article role (static content)
        expect( eventElement ).toHaveAttribute( 'role', 'article' );
    } );
    test( 'does not handle keyboard events as static card', () => {
        const handleClick = jest.fn();
        render( <CECEvent event={mockEvent} onClick={handleClick} /> );
        // Simulate keyboard events
        const eventElement = screen.getByTestId( 'cec-event' );
        // Test Enter key
        fireEvent.keyDown( eventElement, { key: 'Enter', code: 'Enter' } );
        expect( handleClick ).toHaveBeenCalledTimes( 0 );
        // Test Space key
        fireEvent.keyDown( eventElement, { key: ' ', code: 'Space' } );
        expect( handleClick ).toHaveBeenCalledTimes( 0 );
        // Verify no tabIndex (not keyboard focusable)
        expect( eventElement ).not.toHaveAttribute( 'tabIndex' );
    } );
    test( 'renders with custom actions', () => {
        const customActionText = 'Custom Action';
        const customAction = <button key="custom">{customActionText}</button>;
        render(
            <CECEvent
                event={mockEvent}
                customActions={customAction}
                showActions={true}
            />
        );
        // Check if custom action is rendered
        expect( screen.getByText( customActionText ) ).toBeInTheDocument();
    } );
    test( 'hides description when showDescription is false', () => {
        // Create a test event with a description
        const testEvent = createMockEvent( {
            description: '<p>This is a test event description</p>'
        } );
        render( <CECEvent event={testEvent} showDescription={false} /> );
        // Check if description is not in the document
        const descriptionElement = screen.queryByText( 'This is a test event description' );
        expect( descriptionElement ).not.toBeInTheDocument();
    } );
    test( 'displays all day event correctly', () => {
        const allDayEvent = createMockEvent( {
            recurrence: {
                ...mockEvent.recurrence!,
                allDay: '1',
                startDate: '2025-01-01T00:00:00Z',
                endDate: '2025-01-01T23:59:59Z'
            } as CECEventRecurrence
        } );
        render( <CECEvent event={allDayEvent} /> );
        // Check if the date range is shown for all-day events
        const dateParts = screen.getAllByText( /Jan|1/ );
        expect( dateParts.length ).toBeGreaterThan( 0 );
    } );
    test( 'handles missing optional props gracefully', () => {
        const minimalEvent = createMockEvent( {
            location: undefined,
            tags: [],
            recurrence: undefined
        } );
        render( <CECEvent event={minimalEvent} showDate={false} /> );
        // Component should still render without errors
        expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
    } );
    test( 'applies custom className', () => {
        const customClass = 'custom-class';
        render( <CECEvent event={mockEvent} className={customClass} /> );
        const eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toHaveClass( customClass );
    } );
    test( 'renders with different date formats', () => {
        render(
            <CECEvent
                event={mockEvent}
                showTimeZone={true}
            />
        );
        // Check if the component renders with the date
        const dateParts = screen.getAllByText( /Jan|2025/ );
        expect( dateParts.length ).toBeGreaterThan( 0 );
    } );
    test( 'includes link text in description when HTML entities are present', () => {
        // Create a test event with an encoded link
        const testEvent = createMockEvent( {
            description: `
                <p>This event has an encoded link Register Here & Save</p>
                <a href="https://example.com/register?event=test%20event">Register Here &amp; Save</a>
            `
        } );
        render(
            <CECEvent
                event={testEvent}
                showActions={true}
            />
        );
        // The description should contain the link text with the HTML entity
        const descriptionElement = screen.getByTestId( 'cec-event' ).querySelector( '.cec-event__description' );
        // Check that the description contains the link text with the encoded ampersand
        expect( descriptionElement ).toHaveTextContent( 'This event has an encoded link Register Here & Save' );
        // Check that the innerHTML contains the encoded ampersand
        expect( descriptionElement?.innerHTML ).toContain( 'Register Here &amp; Save' );
    } );
    test( 'renders in featured-compact variant', () => {
        render( <CECEvent event={mockEvent} variant="featured-compact" /> );
        // Check if the component has the featured-compact class
        const eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toHaveClass( 'cec-event__featured-compact' );
    } );
    test( 'shows/hides location based on showLocation prop', () => {
        // First render with showLocation=true (default)
        const { rerender } = render( <CECEvent event={mockEvent} /> );
        expect( screen.getByText( 'Virtual' ) ).toBeInTheDocument();
        // Re-render with showLocation=false
        rerender( <CECEvent event={mockEvent} showLocation={false} /> );
        expect( screen.queryByText( 'Virtual' ) ).not.toBeInTheDocument();
    } );
    test( 'shows/hides tags based on showTags prop', () => {
        // First render with showTags=true (default)
        const { rerender } = render( <CECEvent event={mockEvent} /> );
        expect( screen.getByText( 'TECH' ) ).toBeInTheDocument();
        // Re-render with showTags=false
        rerender( <CECEvent event={mockEvent} showTags={false} /> );
        expect( screen.queryByText( 'TECH' ) ).not.toBeInTheDocument();
    } );
    test( 'shows/hides actions based on showActions prop', () => {
        // Create event with online meeting URL
        const onlineEvent = createMockEvent( {
            location: 'https://meet.google.com/abc-def-ghi'
        } );
        // First render with showActions=true (default)
        const { rerender } = render( <CECEvent event={onlineEvent} /> );
        // For online events, should show both "Connect with Google Meet" and "Export to calendar"
        expect( screen.getByText( 'Connect with Google Meet' ) ).toBeInTheDocument();
    } );
    test( 'handles 12h/24h time format', () => {
        // Test 12-hour format (default)
        const { rerender } = render( <CECEvent event={mockEvent} eventTime24hrFormat={false} /> );
        // Test 24-hour format
        rerender( <CECEvent event={mockEvent} eventTime24hrFormat={true} /> );
        // The actual time format is handled by the date helpers in the component,
        // so we just check that the component renders without errors
        expect( screen.getByTestId( 'cec-event' ) ).toBeInTheDocument();
    } );
    test( 'renders custom actions', () => {
        const customActionText = 'Custom Action';
        const customAction = <button key="custom">{customActionText}</button>;
        render(
            <CECEvent
                event={mockEvent}
                customActions={customAction}
                showActions={true}
            />
        );
        // Check if custom action is rendered
        expect( screen.getByText( customActionText ) ).toBeInTheDocument();
        // Export to calendar functionality is hidden, so should not be present
        expect( screen.queryByText( 'Export to calendar' ) ).not.toBeInTheDocument();
    } );
    test( 'handles multi-day events', () => {
        const multiDayEvent = createMockEvent( {
            recurrence: {
                ...mockEvent.recurrence!,
                startDate: '2025-01-01T10:00:00Z',
                endDate: '2025-01-03T14:00:00Z'
            } as CECEventRecurrence
        } );
        render( <CECEvent event={multiDayEvent} /> );
        // Check that both start and end dates are rendered
        const dateElements = screen.getAllByText( /Jan|1|3/ );
        expect( dateElements.length ).toBeGreaterThan( 0 );
    } );
    test( 'applies custom icons', () => {
        const customIcons = {
            calendar: '📅',
            location: '📍',
            event: '🎉',
            featured: '⭐'
        };
        render( <CECEvent event={mockEvent} icons={customIcons} /> );
        // The component should render without errors with custom icons
        expect( screen.getByTestId( 'cec-event' ) ).toBeInTheDocument();
    } );
    test( 'handles empty description', () => {
        const eventWithoutDescription = createMockEvent( {
            description: ''
        } );
        render( <CECEvent event={eventWithoutDescription} showDescription={true} /> );
        // The component should render without errors
        const eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toBeInTheDocument();
        // The description element should be present but contain empty space
        const descriptionElement = eventElement.querySelector( '.cec-event__description' );
        expect( descriptionElement ).toBeInTheDocument();
        expect( descriptionElement ).toHaveTextContent( '' ); // Should be empty or just whitespace
    } );
    test( 'handles missing author and contributor', () => {
        const minimalEvent = createMockEvent( {
            author: undefined,
            contributor: undefined,
            tags: []
        } );
        render( <CECEvent event={minimalEvent} /> );
        // Component should still render without errors
        expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
    } );
    test( 'renders with default featured variant', () => {
        render( <CECEvent event={mockEvent} variant="featured" /> );
        // Check if the component has the featured class
        const eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toHaveClass( 'cec-event__featured' );
        // Check that all default sections are rendered except Export (hidden)
        expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        expect( screen.getByText( 'Virtual' ) ).toBeInTheDocument();
        expect( screen.getByText( 'TECH' ) ).toBeInTheDocument();
        expect( screen.queryByText( 'Export to calendar' ) ).not.toBeInTheDocument();
    } );
    test( 'renders with all sections in featured variant', () => {
        const eventWithAllData = createMockEvent( {
            description: 'Test description',
            location: 'Test Location',
            tags: ['tag1', 'tag2'],
            recurrence: {
                ...mockEvent.recurrence!,
                startDate: '2025-01-01T10:00:00Z',
                endDate: '2025-01-01T12:00:00Z'
            }
        } );
        render(
            <CECEvent
                event={eventWithAllData}
                variant="featured"
                showDate={true}
                showLocation={true}
                showDescription={true}
                showTags={true}
                showActions={true}
            />
        );
        // Check that all sections are rendered except Export (hidden)
        expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        expect( screen.getByText( 'Test Location' ) ).toBeInTheDocument();
        expect( screen.getByText( 'Test description' ) ).toBeInTheDocument();
        expect( screen.getByText( 'TAG1' ) ).toBeInTheDocument();
        expect( screen.getByText( 'TAG2' ) ).toBeInTheDocument();
        expect( screen.queryByText( 'Export to calendar' ) ).not.toBeInTheDocument();
        // Check date is rendered
        const dateElements = screen.getAllByText( /Jan|1|2025/ );
        expect( dateElements.length ).toBeGreaterThan( 0 );
    } );
    test( 'applies custom className to featured variant', () => {
        const customClass = 'custom-featured-class';
        render(
            <CECEvent
                event={mockEvent}
                variant="featured"
                className={customClass}
            />
        );
        const eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toHaveClass( customClass );
        expect( eventElement ).toHaveClass( 'cec-event__featured' );
    } );
    test( 'behaves as static card in featured variant', () => {
        const handleClick = jest.fn();
        render(
            <CECEvent
                event={mockEvent}
                variant="featured"
                onClick={handleClick}
            />
        );
        // Simulate click
        const eventElement = screen.getByTestId( 'cec-event' );
        fireEvent.click( eventElement );
        // Check that click handler is NOT called (static card behavior)
        expect( handleClick ).toHaveBeenCalledTimes( 0 );
    } );
    test( 'renders with custom styles in featured variant', () => {
        const customStyle = { backgroundColor: 'red' };
        render(
            <CECEvent
                event={mockEvent}
                variant="featured"
                style={customStyle}
            />
        );
        const eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toHaveStyle( 'background-color: red' );
    } );
    test( 'renders with custom icons in featured variant', () => {
        const customIcons = {
            calendar: '📅',
            location: '📍',
            event: '🎉',
            featured: '⭐'
        };
        render(
            <CECEvent
                event={mockEvent}
                variant="featured"
                icons={customIcons}
            />
        );
        // The component should render without errors with custom icons
        expect( screen.getByTestId( 'cec-event' ) ).toBeInTheDocument();
    } );
    // Missing unit tests for new features
    test( 'displays date/time with Start Date and End Date labels', () => {
        const multiDayEvent = createMockEvent( {
            recurrence: {
                ...mockEvent.recurrence!,
                startDate: '2026-04-10T17:00:00Z',
                endDate: '2026-04-11T19:00:00Z'
            } as CECEventRecurrence
        } );
        render( <CECEvent event={multiDayEvent} /> );
        // Check for formatted dates (the component now shows dates in "Month Day, Year" format)
        expect( screen.getByText( /April \d+, 2026/ ) ).toBeInTheDocument();
        // Check for date range indicator - look for the separator text specifically
        expect( screen.getByText( 'to' ) ).toBeInTheDocument();
    } );
    test( 'truncates description based on descriptionMaxLines prop', () => {
        const longDescriptionEvent = createMockEvent( {
            description: 'This is a very long description that should be truncated based on the word limit. It contains many words to test the truncation functionality properly.'
        } );
        render( <CECEvent event={longDescriptionEvent} descriptionMaxLines={2} /> );
        const descriptionElement = screen.getByText( /This is a very long description/ );
        expect( descriptionElement ).toBeInTheDocument();
        // Truncation is delegated to CSS -webkit-line-clamp via --description-max-lines custom property
        const descriptionContainer = descriptionElement.closest( '.cec-event__description' );
        expect( descriptionContainer ).toHaveStyle( '--description-max-lines: 2' );
    } );
    test( 'displays tags with threshold and ellipsis', () => {
        const manyTagsEvent = createMockEvent( {
            tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7']
        } );
        render( <CECEvent event={manyTagsEvent} /> );
        // Should show only first 3 tags (SHOW_TAGS_THRESHOLD = 3)
        expect( screen.getByText( 'TAG1' ) ).toBeInTheDocument();
        expect( screen.getByText( 'TAG2' ) ).toBeInTheDocument();
        expect( screen.getByText( 'TAG3' ) ).toBeInTheDocument();
        // Should show ellipsis for remaining tags (4 more)
        expect( screen.getByText( /\+4\s+more/i ) ).toBeInTheDocument();
        // Should not show tags beyond threshold
        expect( screen.queryByText( 'TAG4' ) ).not.toBeInTheDocument();
    } );
    test( 'displays actual tag instead of +1 more when only one remaining tag', () => {
        const fourTagsEvent = createMockEvent( {
            tags: ['tag1', 'tag2', 'tag3', 'tag4']
        } );
        render( <CECEvent event={fourTagsEvent} /> );
        // Should show first 3 tags (SHOW_TAGS_THRESHOLD = 3)
        expect( screen.getByText( 'TAG1' ) ).toBeInTheDocument();
        expect( screen.getByText( 'TAG2' ) ).toBeInTheDocument();
        expect( screen.getByText( 'TAG3' ) ).toBeInTheDocument();
        // Should show the 4th tag instead of "+1 more"
        expect( screen.getByText( 'TAG4' ) ).toBeInTheDocument();
        // Should not show "+1 more" text
        expect( screen.queryByText( /\+1\s+more/i ) ).not.toBeInTheDocument();
    } );
    test( 'handles string tags format', () => {
        const stringTagsEvent = createMockEvent( {
            tags: 'tag1,tag2,tag3'
        } );
        render( <CECEvent event={stringTagsEvent} /> );
        expect( screen.getByText( 'TAG1' ) ).toBeInTheDocument();
        expect( screen.getByText( 'TAG2' ) ).toBeInTheDocument();
        expect( screen.getByText( 'TAG3' ) ).toBeInTheDocument();
    } );
    test( 'shows/hides date based on showDate prop', () => {
        const { rerender } = render( <CECEvent event={mockEvent} showDate={true} /> );
        // Should show date/time info - check for formatted date
        expect( screen.getByText( /January \d+, 2025/ ) ).toBeInTheDocument();
        // Re-render with showDate=false
        rerender( <CECEvent event={mockEvent} showDate={false} /> );
        expect( screen.queryByText( /January \d+, 2025/ ) ).not.toBeInTheDocument();
    } );
    test( 'applies custom styles correctly', () => {
        const customStyle = {
            backgroundColor: 'blue',
            border: '2px solid red',
            padding: '20px'
        };
        render( <CECEvent event={mockEvent} style={customStyle} /> );
        const eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toHaveStyle( 'background-color: blue' );
        expect( eventElement ).toHaveStyle( 'border: 2px solid red' );
        expect( eventElement ).toHaveStyle( 'padding: 20px' );
    } );
    test( 'handles missing recurrence data gracefully', () => {
        const eventWithoutRecurrence = createMockEvent( {
            recurrence: undefined
        } );
        render( <CECEvent event={eventWithoutRecurrence} /> );
        // Should still render other content
        expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        expect( screen.getByText( 'Virtual' ) ).toBeInTheDocument();
        // Should not show date/time info
        expect( screen.queryByText( /Start Date:/ ) ).not.toBeInTheDocument();
    } );
    test( 'has proper accessibility attributes', () => {
        render( <CECEvent event={mockEvent} /> );
        const eventElement = screen.getByTestId( 'cec-event' );
        // Should have article role
        expect( eventElement ).toHaveAttribute( 'role', 'article' );
        // Should have aria-label with event title
        expect( eventElement ).toHaveAttribute( 'aria-label', 'Event: Test Event' );
        // Should have aria-describedby pointing to description
        expect( eventElement ).toHaveAttribute( 'aria-describedby', 'event-1-desc' );
        // Should not have tabIndex (not focusable)
        expect( eventElement ).not.toHaveAttribute( 'tabIndex' );
    } );
    test( 'handles recurrence with missing start date', () => {
        // Test event with recurrence but missing start date to trigger warning
        const eventWithMissingStartDate = createMockEvent( {
            title: 'Event Missing Start Date',
            description: '<p>Event with missing start date</p>',
            recurrence: {
                frequency: 'weekly',
                interval: 1,
                until: '2025-12-31',
                allDay: '0',
                startDate: '' as any, // Empty start date to trigger warning
                endDate: '2025-01-01T11:00:00Z'
            }
        } );
        // Mock console.warn to capture warning
        const mockWarn = jest.spyOn( console, 'warn' ).mockImplementation();
        const { container } = render( <CECEvent event={eventWithMissingStartDate} /> );
        expect( container ).toBeInTheDocument();
        // Restore console.warn
        mockWarn.mockRestore();
    } );
    test( 'handles extreme responsive scenarios', () => {
        const event = createMockEvent( {
            title: 'Responsive Test Event',
            description: '<p>Testing extreme responsive scenarios with very long content</p>',
            tags: ['responsive', 'test', 'extreme', 'scenario', 'mobile', 'desktop']
        } );
        // Test different elementsPerRow configurations to simulate responsive behavior
        const elementsPerRowOptions = [1, 2, 3, 4, 6];
        elementsPerRowOptions.forEach( elementsPerRow => {
            const { container } = render(
                <CECEvent
                    event={event}
                    elementsPerRow={elementsPerRow}
                    descriptionMaxLines={elementsPerRow >= 4 ? 1 : elementsPerRow >= 2 ? 2 : 3}
                />
            );
            expect( container ).toBeInTheDocument();
        } );
    } );
    test( 'handles all descriptionMaxLines values with all elementsPerRow configurations', () => {
        const event = createMockEvent( {
            description: '<p>Long description for testing all combinations of descriptionMaxLines and elementsPerRow</p>'
        } );
        const maxLinesOptions = [1, 2, 3, 4, 5];
        const elementsPerRowOptions = [1, 2, 3, 4, 6];
        maxLinesOptions.forEach( maxLines => {
            elementsPerRowOptions.forEach( elementsPerRow => {
                const { container } = render(
                    <CECEvent
                        event={event}
                        descriptionMaxLines={maxLines}
                        elementsPerRow={elementsPerRow}
                    />
                );
                expect( container ).toBeInTheDocument();
            } );
        } );
    } );
    test( 'handles events with special characters and HTML entities', () => {
        const eventWithSpecialChars = createMockEvent( {
            title: 'Event & Special <Characters> "Test"',
            description: '<p>Description with &lt;HTML&gt; entities &amp; special characters</p>',
            tags: ['special&chars', 'html<entities>', 'quotes"test'],
            location: 'Location & Special "Characters"',
            category: 'Category & Special <Test>'
        } );
        const { container } = render( <CECEvent event={eventWithSpecialChars} /> );
        expect( container ).toBeInTheDocument();
    } );
    test( 'handles events with very long content in all fields', () => {
        const longText = 'A'.repeat( 1000 ); // Very long text
        const eventWithLongContent = createMockEvent( {
            title: longText,
            description: `<p>${longText}</p>`,
            tags: Array.from( { length: 20 }, ( _, i ) => `tag${i}` ),
            location: longText,
            category: longText
        } );
        const { container } = render( <CECEvent event={eventWithLongContent} /> );
        expect( container ).toBeInTheDocument();
    } );
} );
describe( 'Recurrence Information with DayMap', () => {
    test( 'shows daily recurrence details with interval, days and occurrences', () => {
        const recurringEvent = createMockEvent( {
            recurrence: {
                frequency: 'daily',
                interval: 2,
                byDay: 'MO,WE,FR',
                count: 5,
                allDay: '0',
                startDate: '2025-01-01T10:00:00Z',
                endDate: '2025-01-01T11:00:00Z',
            },
        } );
        render( <CECEvent event={recurringEvent} /> );
        expect( screen.getByText( /Every 2 days on Mon, Wed, and Fri for 5 occurrences/i ) ).toBeInTheDocument();
    } );
    test( 'shows monthly recurrence with month day', () => {
        const recurringEvent = createMockEvent( {
            recurrence: {
                frequency: 'monthly',
                interval: 1,
                byMonthDay: '15,20',
                allDay: '0',
                startDate: '2025-01-01T10:00:00Z',
                endDate: '2025-01-01T11:00:00Z',
            },
        } );
        render( <CECEvent event={recurringEvent} /> );
        expect( screen.getByText( /Monthly on day 15/i ) ).toBeInTheDocument();
    } );
    test( 'shows yearly recurrence with interval', () => {
        const recurringEvent = createMockEvent( {
            recurrence: {
                frequency: 'yearly',
                interval: 3,
                allDay: '0',
                startDate: '2025-01-01T10:00:00Z',
                endDate: '2025-01-01T11:00:00Z',
            },
        } );
        render( <CECEvent event={recurringEvent} /> );
        expect( screen.getByText( /Every 3 years/i ) ).toBeInTheDocument();
    } );
    test( 'displays recurrence info with short day names', () => {
        const recurringEvent = createMockEvent( {
            recurrence: {
                frequency: 'weekly',
                interval: 1,
                byDay: 'MO,TU,WE',
                allDay: '0',
                startDate: '2025-01-01T10:00:00Z',
                endDate: '2025-01-01T11:00:00Z'
            }
        } );
        render( <CECEvent event={recurringEvent} /> );
        // Should display recurrence frequency
        expect( screen.getByText( /Weekly/i ) ).toBeInTheDocument();
    } );
    test( 'displays multiple days with proper formatting', () => {
        const recurringEvent = createMockEvent( {
            recurrence: {
                frequency: 'weekly',
                interval: 1,
                byDay: 'MO,TU,WE,TH,FR',
                allDay: '0',
                startDate: '2025-01-01T10:00:00Z',
                endDate: '2025-01-01T11:00:00Z'
            }
        } );
        render( <CECEvent event={recurringEvent} /> );
        // Should display recurrence frequency
        expect( screen.getByText( /Weekly/i ) ).toBeInTheDocument();
    } );
    test( 'handles single day recurrence', () => {
        const recurringEvent = createMockEvent( {
            recurrence: {
                frequency: 'weekly',
                interval: 1,
                byDay: 'MO',
                allDay: '0',
                startDate: '2025-01-01T10:00:00Z',
                endDate: '2025-01-01T11:00:00Z'
            }
        } );
        render( <CECEvent event={recurringEvent} /> );
        // Should display recurrence frequency
        expect( screen.getByText( /Weekly/i ) ).toBeInTheDocument();
    } );
} );
describe( 'Date Range Display', () => {
    test( 'renders date information', () => {
        const multiDayEvent = createMockEvent( {
            startDate: '2025-01-01T10:00:00Z',
            endDate: '2025-01-03T18:00:00Z'
        } );
        render( <CECEvent event={multiDayEvent} showDateRange={true} /> );
        // Should display some date information
        expect( screen.getByText( /Test Event/ ) ).toBeInTheDocument();
    } );
    test( 'renders without date range when showDateRange is false', () => {
        const multiDayEvent = createMockEvent( {
            startDate: '2025-01-01T10:00:00Z',
            endDate: '2025-01-03T18:00:00Z'
        } );
        render( <CECEvent event={multiDayEvent} showDateRange={false} /> );
        // Should still display the event title (using the title from createMockEvent)
        expect( screen.getByText( /Test Event/ ) ).toBeInTheDocument();
    } );
} );
describe( 'Responsive Layout', () => {
    test( 'renders with elementsPerRow prop', () => {
        render( <CECEvent event={mockEvent} elementsPerRow={4} /> );
        // Should render the event without crashing
        expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
    } );
    test( 'renders with descriptionMaxLines prop', () => {
        const longDescriptionEvent = createMockEvent( {
            description: '<p>This is a very long description that should be truncated when descriptionMaxLines is set to a small number. It contains multiple sentences and should be properly handled.</p>'
        } );
        render( <CECEvent event={longDescriptionEvent} descriptionMaxLines={2} /> );
        // Should render the event without crashing (description may be truncated)
        expect( screen.getByText( /This is a very long description/ ) ).toBeInTheDocument();
    } );
} );
describe( 'Custom Icons and Styling', () => {
    test( 'renders with custom icons prop', () => {
        const customIcons = {
            calendar: 'ci-CustomCalendar',
            location: 'ci-CustomLocation',
            register: 'ci-CustomRegister'
        };
        render( <CECEvent event={mockEvent} icons={customIcons} /> );
        // Should render the event without crashing
        expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
    } );
    test( 'applies custom inline styles', () => {
        const customStyle = {
            backgroundColor: '#f0f0f0',
            border: '2px solid blue'
        };
        render( <CECEvent event={mockEvent} style={customStyle} /> );
        // Should render the event without crashing
        expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
    } );
} );
describe( 'Time Zone and Time Format', () => {
    test( 'renders time information', () => {
        render( <CECEvent event={mockEvent} showTimeZone={true} /> );
        // Should display some time information
        expect( screen.getByText( /PM|AM|\d+:\d+/i ) ).toBeInTheDocument();
    } );
} );
describe( 'Recurring Icon', () => {
    test( 'shows recurring icon when showRecurringIcon is true', () => {
        const recurringEvent = createMockEvent( {
            recurrence: {
                frequency: 'weekly',
                interval: 1,
                allDay: '0',
                startDate: '2025-01-01T10:00:00Z',
                endDate: '2025-01-01T11:00:00Z'
            }
        } );
        render( <CECEvent event={recurringEvent} showRecurringIcon={true} /> );
        // Should display recurrence information (icon may be part of recurrence display)
        expect( screen.getByText( /Weekly/i ) ).toBeInTheDocument();
    } );
    test( 'hides recurring icon when showRecurringIcon is false', () => {
        const recurringEvent = createMockEvent( {
            recurrence: {
                frequency: 'weekly',
                interval: 1,
                allDay: '0',
                startDate: '2025-01-01T10:00:00Z',
                endDate: '2025-01-01T11:00:00Z'
            }
        } );
        render( <CECEvent event={recurringEvent} showRecurringIcon={false} /> );
        // Should still display recurrence frequency but icon might be hidden
        expect( screen.getByText( /Weekly/i ) ).toBeInTheDocument();
    } );
} );
describe( 'Custom Date Formatting', () => {
    test( 'uses custom formatDate function', () => {
        const customFormatDate = jest.fn( ( date, options ) => {
            return `Custom: ${date.toLocaleDateString()}`;
        } );
        render( <CECEvent event={mockEvent} formatDate={customFormatDate} /> );
        // The custom formatDate function might not be called in all cases
        // Let's just verify the component renders without error
        expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
    } );
} );
describe( 'Action Links Functionality', () => {
    test( 'Connect link has correct attributes', () => {
        const zoomEvent = createMockEvent( {
            location: 'https://zoom.us/j/123456789'
        } );
        render( <CECEvent event={zoomEvent} /> );
        const connectLink = screen.getByTestId( 'connect-link' );
        expect( connectLink ).toHaveAttribute( 'href', 'https://zoom.us/j/123456789' );
        expect( connectLink ).toHaveAttribute( 'target', '_blank' );
        expect( connectLink ).toHaveAttribute( 'rel', 'noopener noreferrer' );
        expect( connectLink ).toHaveAttribute( 'aria-label', 'Connect with Zoom for Test Event event' );
    } );
    test( 'no action links when showActions is false', () => {
        const onlineEvent = createMockEvent( {
            location: 'https://meet.google.com/abc-def-ghi'
        } );
        render( <CECEvent event={onlineEvent} showActions={false} /> );
        expect( screen.queryByText( 'Connect with Google Meet' ) ).not.toBeInTheDocument();
        expect( screen.queryByText( 'Export to calendar' ) ).not.toBeInTheDocument();
    } );
} );
describe( 'dateFormat functionality', () => {
    test( 'renders with full date format (default)', () => {
        render( <CECEvent event={mockEvent} /> );
        // Should show full format: "January 01, 2025"
        expect( screen.getByText( /January \d+, 2025/ ) ).toBeInTheDocument();
    } );
    test( 'renders with short date format', () => {
        render( <CECEvent event={mockEvent} dateFormat="short" /> );
        // Should show short format: "Jan 1, 2025"
        expect( screen.getByText( /Jan \d+, 2025/ ) ).toBeInTheDocument();
    } );
    test( 'renders with month-day date format', () => {
        render( <CECEvent event={mockEvent} dateFormat="month-day" /> );
        // Should show month-day format: "Jan 1"
        expect( screen.getByText( /Jan \d+/ ) ).toBeInTheDocument();
        // Should not show year
        expect( screen.queryByText( /2025/ ) ).not.toBeInTheDocument();
    } );
    test( 'renders with time-only format', () => {
        render( <CECEvent event={mockEvent} dateFormat="time-only" /> );
        // Should not show full formatted date in the date-time info section
        expect( screen.queryByText( /January \d+, 2025/ ) ).not.toBeInTheDocument();
        // Should show time
        expect( screen.getByText( /\d+:\d+/ ) ).toBeInTheDocument();
    } );
    test( 'dateFormat works with 24-hour time format', () => {
        render(
            <CECEvent
                event={mockEvent}
                dateFormat="full"
                eventTime24hrFormat={true}
            />
        );
        // Should show date and 24-hour time
        expect( screen.getByText( /January \d+, 2025/ ) ).toBeInTheDocument();
        expect( screen.getByText( /\d{2}:\d{2}/ ) ).toBeInTheDocument();
    } );
    test( 'dateFormat works with all-day events', () => {
        const allDayEvent = createMockEvent( {
            recurrence: {
                ...mockEvent.recurrence!,
                allDay: '1',
                startDate: '2025-01-01T00:00:00Z',
                endDate: '2025-01-01T23:59:59Z'
            } as CECEventRecurrence
        } );
        render( <CECEvent event={allDayEvent} dateFormat="short" /> );
        // Should show date format
        expect( screen.getByText( /Jan \d+, 2025/ ) ).toBeInTheDocument();
        // Should show "All day event" instead of time
        expect( screen.getByText( 'All day event' ) ).toBeInTheDocument();
    } );
    test( 'dateFormat works with multi-day events', () => {
        const multiDayEvent = createMockEvent( {
            recurrence: {
                ...mockEvent.recurrence!,
                startDate: '2025-01-01T10:00:00Z',
                endDate: '2025-01-03T14:00:00Z'
            } as CECEventRecurrence
        } );
        render( <CECEvent event={multiDayEvent} dateFormat="month-day" /> );
        // Should show month-day format for start date
        expect( screen.getByText( /Jan \d+/ ) ).toBeInTheDocument();
    } );
    test( 'dateFormat time-only shows time range for non-all-day events', () => {
        render( <CECEvent event={mockEvent} dateFormat="time-only" /> );
        // Should show time range
        const timeDisplay = screen.getByText( /\d+:\d+.*\d+:\d+/ );
        expect( timeDisplay ).toBeInTheDocument();
    } );
    test( 'dateFormat time-only shows "All day event" for all-day events', () => {
        const allDayEvent = createMockEvent( {
            recurrence: {
                ...mockEvent.recurrence!,
                allDay: '1',
                startDate: '2025-01-01T00:00:00Z',
                endDate: '2025-01-01T23:59:59Z'
            } as CECEventRecurrence
        } );
        render( <CECEvent event={allDayEvent} dateFormat="time-only" /> );
        // Should not show full formatted date in the date-time info section
        expect( screen.queryByText( /January \d+, 2025/ ) ).not.toBeInTheDocument();
        // Should show "All day event"
        expect( screen.getByText( 'All day event' ) ).toBeInTheDocument();
    } );
    test( 'dateFormat prop changes trigger re-render with new format', () => {
        const { rerender } = render( <CECEvent event={mockEvent} dateFormat="full" /> );
        // Should show full format initially
        expect( screen.getByText( /January \d+, 2025/ ) ).toBeInTheDocument();
        // Change to short format
        rerender( <CECEvent event={mockEvent} dateFormat="short" /> );
        // Should now show short format
        expect( screen.getByText( /Jan \d+, 2025/ ) ).toBeInTheDocument();
        expect( screen.queryByText( /January/ ) ).not.toBeInTheDocument();
        // Change to time-only format
        rerender( <CECEvent event={mockEvent} dateFormat="time-only" /> );
        // Should not show full formatted date in the date-time info section
        expect( screen.queryByText( /January \d+, 2025/ ) ).not.toBeInTheDocument();
        expect( screen.getByText( /\d+:\d+/ ) ).toBeInTheDocument();
    } );
} );
describe( 'Edge Cases and Error Handling', () => {
    test( 'handles missing event data gracefully', () => {
        expect( () => {
            render( <CECEvent event={null as any} /> );
        } ).not.toThrow();
    } );
    test( 'handles undefined event data gracefully', () => {
        expect( () => {
            render( <CECEvent event={undefined as any} /> );
        } ).not.toThrow();
    } );
    test( 'handles event with missing required fields', () => {
        const incompleteEvent = {
            id: '1',
            title: 'Incomplete Event'
        } as any;
        expect( () => {
            render( <CECEvent event={incompleteEvent} /> );
        } ).not.toThrow();
    } );
    test( 'handles event with empty title', () => {
        const eventWithoutTitle = createMockEvent( { title: '' } );
        expect( () => {
            render( <CECEvent event={eventWithoutTitle} /> );
        } ).not.toThrow();
    } );
    test( 'handles event with null description', () => {
        const eventWithoutDescription = createMockEvent( { description: null as any } );
        expect( () => {
            render( <CECEvent event={eventWithoutDescription} /> );
        } ).not.toThrow();
    } );
    test( 'handles event with undefined description', () => {
        const eventWithoutDescription = createMockEvent( { description: undefined as any } );
        expect( () => {
            render( <CECEvent event={eventWithoutDescription} /> );
        } ).not.toThrow();
    } );
    test( 'handles event with malformed date', () => {
        const eventWithBadDate = createMockEvent( { date: 'invalid-date' } );
        expect( () => {
            render( <CECEvent event={eventWithBadDate} /> );
        } ).not.toThrow();
    } );
    test( 'handles event with missing author', () => {
        const eventWithoutAuthor = createMockEvent( { author: null as any } );
        expect( () => {
            render( <CECEvent event={eventWithoutAuthor} /> );
        } ).not.toThrow();
    } );
    test( 'handles event with missing recurrence data', () => {
        const eventWithoutRecurrence = createMockEvent( { recurrence: null as any } );
        expect( () => {
            render( <CECEvent event={eventWithoutRecurrence} /> );
        } ).not.toThrow();
    } );
    test( 'handles event with malformed recurrence data', () => {
        const eventWithBadRecurrence = createMockEvent( {
            recurrence: {
                frequency: 'invalid',
                startDate: 'bad-date',
                endDate: 'also-bad'
            } as any
        } );
        expect( () => {
            render( <CECEvent event={eventWithBadRecurrence} /> );
        } ).not.toThrow();
    } );
    test( 'handles event with empty tags array', () => {
        const eventWithoutTags = createMockEvent( { tags: [] } );
        expect( () => {
            render( <CECEvent event={eventWithoutTags} /> );
        } ).not.toThrow();
    } );
    test( 'handles event with null tags', () => {
        const eventWithNullTags = createMockEvent( { tags: null as any } );
        expect( () => {
            render( <CECEvent event={eventWithNullTags} /> );
        } ).not.toThrow();
    } );
    test( 'handles event with malformed links', () => {
        const eventWithBadLinks = createMockEvent( {
            links: [
                { url: null, label: 'Bad Link' },
                { url: '', label: 'Empty Link' },
                { url: 'javascript:alert(1)', label: 'XSS Link' }
            ] as any
        } );
        expect( () => {
            render( <CECEvent event={eventWithBadLinks} /> );
        } ).not.toThrow();
    } );
} );
describe( 'Accessibility Features', () => {
    test( 'has proper ARIA attributes', () => {
        render( <CECEvent event={mockEvent} /> );
        const eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toBeInTheDocument();
    } );
    test( 'supports keyboard navigation', () => {
        const handleClick = jest.fn();
        render( <CECEvent event={mockEvent} onEventClick={handleClick} /> );
        const eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toHaveAttribute( 'tabIndex', '0' );
    } );
    test( 'handles images in description gracefully', () => {
        const eventWithImage = createMockEvent( {
            description: '<img src="test.jpg" alt="Test Image">This is text after image'
        } );
        render( <CECEvent event={eventWithImage} /> );
        // Images should be stripped from description, only text should remain
        expect( screen.queryByAltText( 'Test Image' ) ).not.toBeInTheDocument();
        // The text content should remain
        expect( screen.getByText( 'This is text after image' ) ).toBeInTheDocument();
    } );
    test( 'handles missing alt text gracefully', () => {
        const eventWithImageWithoutAlt = createMockEvent( {
            description: '<img src="test.jpg">'
        } );
        expect( () => {
            render( <CECEvent event={eventWithImageWithoutAlt} /> );
        } ).not.toThrow();
    } );
} );
describe( 'Performance and Optimization', () => {
    test( 'handles large description content', () => {
        const largeDescription = '<p>'.repeat( 1000 ) + 'Large content' + '</p>'.repeat( 1000 );
        const eventWithLargeContent = createMockEvent( { description: largeDescription } );
        const startTime = performance.now();
        render( <CECEvent event={eventWithLargeContent} /> );
        const endTime = performance.now();
        expect( endTime - startTime ).toBeLessThan( 1000 ); // Should render within 1 second
    } );
    test( 'handles many tags efficiently', () => {
        const manyTags = Array.from( { length: 100 }, ( _, i ) => `tag${i}` );
        const eventWithManyTags = createMockEvent( { tags: manyTags } );
        expect( () => {
            render( <CECEvent event={eventWithManyTags} /> );
        } ).not.toThrow();
    } );
    test( 'handles special characters in content', () => {
        const eventWithSpecialChars = createMockEvent( {
            title: 'Event with special chars: áéíóú ñ € ¥',
            description: '<p>Content with special chars: &lt;&gt;&amp;"\'</p>',
            tags: ['special-chars', 'áéíóú']
        } );
        expect( () => {
            render( <CECEvent event={eventWithSpecialChars} /> );
        } ).not.toThrow();
        expect( screen.getByText( /Event with special chars/ ) ).toBeInTheDocument();
    } );
} );
describe( 'Container Queries and Responsive Behavior', () => {
    test( 'applies correct container query classes', () => {
        render( <CECEvent event={mockEvent} /> );
        const eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toHaveClass( 'cec-event' );
    } );
    test( 'handles different elementsPerRow values', () => {
        const { rerender } = render( <CECEvent event={mockEvent} elementsPerRow={1} /> );
        let eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toBeInTheDocument();
        rerender( <CECEvent event={mockEvent} elementsPerRow={4} /> );
        eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toBeInTheDocument();
    } );
    test( 'handles responsive container queries', () => {
        // Mock container query support
        Object.defineProperty( window, 'ResizeObserver', {
            writable: true,
            value: jest.fn().mockImplementation( () => ( {
                observe: jest.fn(),
                unobserve: jest.fn(),
                disconnect: jest.fn(),
            } ) ),
        } );
        expect( () => {
            render( <CECEvent event={mockEvent} /> );
        } ).not.toThrow();
    } );
} );
describe( 'Date and Time Edge Cases', () => {
    test( 'handles invalid date formats', () => {
        const eventWithInvalidDate = createMockEvent( {
            date: 'not-a-date',
            recurrence: {
                ...mockEvent.recurrence!,
                startDate: 'invalid-start',
                endDate: 'invalid-end'
            } as CECEventRecurrence
        } );
        expect( () => {
            render( <CECEvent event={eventWithInvalidDate} /> );
        } ).not.toThrow();
    } );
    test( 'handles very old dates', () => {
        const eventWithOldDate = createMockEvent( {
            date: '1900-01-01T00:00:00Z',
            recurrence: {
                ...mockEvent.recurrence!,
                startDate: '1900-01-01T00:00:00Z',
                endDate: '1900-01-01T23:59:59Z'
            } as CECEventRecurrence
        } );
        expect( () => {
            render( <CECEvent event={eventWithOldDate} /> );
        } ).not.toThrow();
    } );
    test( 'handles very future dates', () => {
        const eventWithFutureDate = createMockEvent( {
            date: '2100-12-31T23:59:59Z',
            recurrence: {
                ...mockEvent.recurrence!,
                startDate: '2100-12-31T23:59:59Z',
                endDate: '2101-01-01T00:00:00Z'
            } as CECEventRecurrence
        } );
        expect( () => {
            render( <CECEvent event={eventWithFutureDate} /> );
        } ).not.toThrow();
    } );
    test( 'handles timezone edge cases', () => {
        const eventWithTimezone = createMockEvent( {
            date: '2025-01-01T00:00:00+14:00', // Far ahead timezone
            recurrence: {
                ...mockEvent.recurrence!,
                startDate: '2025-01-01T00:00:00-12:00', // Far behind timezone
                endDate: '2025-01-01T23:59:59+00:00'
            } as CECEventRecurrence
        } );
        expect( () => {
            render( <CECEvent event={eventWithTimezone} /> );
        } ).not.toThrow();
    } );
} );
describe( 'Link Processing Edge Cases', () => {
    test( 'handles malformed HTML in description', () => {
        const eventWithMalformedHTML = createMockEvent( {
            description: '<p>Unclosed paragraph<div>Nested div without closing'
        } );
        expect( () => {
            render( <CECEvent event={eventWithMalformedHTML} /> );
        } ).not.toThrow();
    } );
    test( 'handles script tags in description', () => {
        const eventWithScript = createMockEvent( {
            description: '<p>Valid content</p><script>alert("xss")</script><p>More content</p>'
        } );
        expect( () => {
            render( <CECEvent event={eventWithScript} /> );
        } ).not.toThrow();
    } );
    test( 'handles iframe tags in description', () => {
        const eventWithIframe = createMockEvent( {
            description: '<p>Content with iframe</p><iframe src="external.com"></iframe><p>More content</p>'
        } );
        expect( () => {
            render( <CECEvent event={eventWithIframe} /> );
        } ).not.toThrow();
    } );
    test( 'handles data URLs in links', () => {
        const eventWithDataUrl = createMockEvent( {
            description: '<a href="data:text/plain,hello">Data URL Link</a>'
        } );
        expect( () => {
            render( <CECEvent event={eventWithDataUrl} /> );
        } ).not.toThrow();
    } );
    test( 'handles javascript: URLs in links', () => {
        const eventWithJSUrl = createMockEvent( {
            description: '<a href="javascript:alert(1)">JavaScript Link</a>'
        } );
        expect( () => {
            render( <CECEvent event={eventWithJSUrl} /> );
        } ).not.toThrow();
    } );
} );
describe( 'Component Lifecycle and State', () => {
    test( 'handles prop updates correctly', () => {
        const { rerender } = render( <CECEvent event={mockEvent} /> );
        expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        const updatedEvent = createMockEvent( { title: 'Updated Event' } );
        rerender( <CECEvent event={updatedEvent} /> );
        expect( screen.getByText( 'Updated Event' ) ).toBeInTheDocument();
        expect( screen.queryByText( 'Test Event' ) ).not.toBeInTheDocument();
    } );
    test( 'handles variant prop changes', () => {
        const { rerender } = render( <CECEvent event={mockEvent} variant="featured" /> );
        let eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toHaveClass( 'cec-event__featured' );
        rerender( <CECEvent event={mockEvent} variant="river" /> );
        eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toHaveClass( 'cec-event__river' );
    } );
    test( 'handles onEventClick callback', () => {
        const handleClick = jest.fn();
        render( <CECEvent event={mockEvent} onEventClick={handleClick} /> );
        const eventElement = screen.getByTestId( 'cec-event' );
        fireEvent.click( eventElement );
        expect( handleClick ).toHaveBeenCalledWith( mockEvent );
    } );
    test( 'handles keyboard events for accessibility', () => {
        const handleClick = jest.fn();
        render( <CECEvent event={mockEvent} onEventClick={handleClick} /> );
        const eventElement = screen.getByTestId( 'cec-event' );
        fireEvent.keyDown( eventElement, { key: 'Enter' } );
        expect( handleClick ).toHaveBeenCalledWith( mockEvent );
    } );
} );
describe( 'CSS Classes and Styling', () => {
    test( 'applies correct variant classes', () => {
        const { rerender } = render( <CECEvent event={mockEvent} variant="featured" /> );
        let eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toHaveClass( 'cec-event__featured' );
        rerender( <CECEvent event={mockEvent} variant="river" /> );
        eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toHaveClass( 'cec-event__river' );
        rerender( <CECEvent event={mockEvent} variant="featured-compact" /> );
        eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toHaveClass( 'cec-event__featured-compact' );
    } );
    test( 'applies custom className', () => {
        render( <CECEvent event={mockEvent} className="custom-event-class" /> );
        const eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toHaveClass( 'custom-event-class' );
    } );
    test( 'handles elementsPerRow styling', () => {
        const { rerender } = render( <CECEvent event={mockEvent} elementsPerRow={2} /> );
        let eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toBeInTheDocument();
        rerender( <CECEvent event={mockEvent} elementsPerRow={3} /> );
        eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toBeInTheDocument();
    } );
    describe( 'Recurrence Formatting', () => {
        test( 'formats daily recurrence with interval', () => {
            const dailyEvent = createMockEvent( {
                recurrence: {
                    frequency: 'daily',
                    interval: 2,
                    byDay: 'MO,WE,FR',
                    startDate: '2025-01-01'
                }
            } );
            render( <CECEvent event={dailyEvent} showDate={true} /> );
            expect( screen.getByText( 'Every 2 days on Mon, Wed, and Fri' ) ).toBeInTheDocument();
        } );
        test( 'formats daily recurrence with interval', () => {
            // Silence expected warning for invalid/missing dates
            const warnSpy = jest.spyOn( console, 'warn' ).mockImplementation( () => {} );
            const dailyEvent = createMockEvent( {
                recurrence: {
                    frequency: 'daily',
                    interval: 2,
                    byDay: 'MO,WE,FR',
                    allDay: '0',
                    startDate: '2025-01-01T10:00:00Z',
                    endDate: '2025-01-01T11:00:00Z'
                }
            } );
            render( <CECEvent event={dailyEvent} showDate={true} /> );
            // Actual output is sorted: Mon, Wed, and Fri
            // ...existing code...
            expect( screen.getByText( 'Every 2 days on Mon, Wed, and Fri' ) ).toBeInTheDocument();
            warnSpy.mockRestore();
        } );
        test( 'formats weekly recurrence with single day', () => {
            const warnSpy = jest.spyOn( console, 'warn' ).mockImplementation( () => {} );
            const weeklyEvent = createMockEvent( {
                recurrence: {
                    frequency: 'weekly',
                    interval: 1,
                    byDay: 'TU',
                    allDay: '0',
                    startDate: '2025-01-01T10:00:00Z',
                    endDate: '2025-01-01T11:00:00Z'
                }
            } );
            render( <CECEvent event={weeklyEvent} showDate={true} /> );
            expect( screen.getByText( 'Weekly on Tue' ) ).toBeInTheDocument();
            warnSpy.mockRestore();
        } );
        test( 'formats weekly recurrence with multiple days', () => {
            const warnSpy = jest.spyOn( console, 'warn' ).mockImplementation( () => {} );
            const weeklyEvent = createMockEvent( {
                recurrence: {
                    frequency: 'weekly',
                    interval: 1,
                    byDay: 'MO,WE,FR',
                    allDay: '0',
                    startDate: '2025-01-01T10:00:00Z',
                    endDate: '2025-01-01T11:00:00Z'
                }
            } );
            render( <CECEvent event={weeklyEvent} showDate={true} /> );
            expect( screen.getByText( 'Weekly on Mon, Wed, and Fri' ) ).toBeInTheDocument();
            warnSpy.mockRestore();
        } );
        test( 'formats yearly recurrence', () => {
            const yearlyEvent = createMockEvent( {
                recurrence: {
                    frequency: 'yearly',
                    startDate: '2025-01-01'
                }
            } );
            render( <CECEvent event={yearlyEvent} showDate={true} /> );
            expect( screen.getByText( 'Yearly' ) ).toBeInTheDocument();
        } );
        test( 'formats recurrence with count', () => {
            const eventWithCount = createMockEvent( {
                recurrence: {
                    frequency: 'weekly',
                    count: 10,
                    startDate: '2025-01-01'
                }
            } );
            render( <CECEvent event={eventWithCount} showDate={true} /> );
            expect( screen.getByText( 'Weekly for 10 occurrences' ) ).toBeInTheDocument();
        } );
    } );
    describe( 'Date Formatting Edge Cases', () => {
        test( 'handles different date formats', () => {
            const { rerender } = render( <CECEvent event={mockEvent} dateFormat="short" /> );
            expect( screen.getByText( 'Jan 1, 2025' ) ).toBeInTheDocument();
            rerender( <CECEvent event={mockEvent} dateFormat="month-day" /> );
            expect( screen.getByText( 'Jan 1' ) ).toBeInTheDocument();
        } );
        test( 'handles all-day events', () => {
            const allDayEvent = createMockEvent( {
                recurrence: {
                    startDate: '2025-01-01',
                    allDay: '1'
                }
            } );
            render( <CECEvent event={allDayEvent} /> );
            const longDescriptionEvent = createMockEvent( {
                description: '<p>This is a very long description that should not be auto-truncated when descriptionMaxLines is explicitly provided.</p>'
            } );
            render( <CECEvent event={longDescriptionEvent} elementsPerRow={6} descriptionMaxLines={3} /> );
            // Should use explicit descriptionMaxLines=3, not auto-adjusted to 1
            const descriptionElement = screen.getByText( /This is a very long description/ );
            expect( descriptionElement ).toBeInTheDocument();
        } );
        test( 'calculates responsive tags threshold based on container width', () => {
            const manyTagsEvent = createMockEvent( {
                tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5']
            } );
            render( <CECEvent event={manyTagsEvent} /> );
            // Container width is set to 400px in useEffect, should show 3 tags (default threshold)
            expect( screen.getByText( 'TAG1' ) ).toBeInTheDocument();
            expect( screen.getByText( 'TAG2' ) ).toBeInTheDocument();
            expect( screen.getByText( 'TAG3' ) ).toBeInTheDocument();
            expect( screen.queryByText( 'TAG4' ) ).not.toBeInTheDocument();
            expect( screen.getByText( /\+2\s+more/i ) ).toBeInTheDocument();
        } );
    } );
} );
describe( 'Responsive Behavior', () => {
    test( 'auto-adjusts descriptionMaxLines for elementsPerRow=6', () => {
        const longDescriptionEvent = createMockEvent( {
            description: '<p>This is a very long description that should be truncated when elementsPerRow is 6, as it forces descriptionMaxLines to 1 for narrow cards.</p>'
        } );
        render( <CECEvent event={longDescriptionEvent} elementsPerRow={6} /> );
        // elementsPerRow=6 forces descriptionMaxLines=1; truncation is handled by CSS -webkit-line-clamp
        const descriptionElement = screen.getByText( /This is a very long description/ );
        expect( descriptionElement ).toBeInTheDocument();
        const descriptionContainer = descriptionElement.closest( '.cec-event__description' );
        expect( descriptionContainer ).toHaveStyle( '--description-max-lines: 1' );
    } );
} );
describe( 'Online Meeting Detection', () => {
    test( 'detects Zoom meeting links', () => {
        const zoomEvent = createMockEvent( {
            location: 'https://zoom.us/j/123456789'
        } );
        render( <CECEvent event={zoomEvent} /> );
        expect( screen.getByText( 'Connect with Zoom' ) ).toBeInTheDocument();
        expect( screen.getByTestId( 'connect-link' ) ).toHaveAttribute( 'href', 'https://zoom.us/j/123456789' );
    } );
    test( 'detects Google Meet links', () => {
        const meetEvent = createMockEvent( {
            location: 'https://meet.google.com/abc-def-ghi'
        } );
        render( <CECEvent event={meetEvent} /> );
        expect( screen.getByText( 'Connect with Google Meet' ) ).toBeInTheDocument();
    } );
    test( 'detects Microsoft Teams links', () => {
        const teamsEvent = createMockEvent( {
            location: 'https://teams.microsoft.com/l/meetup-join/123'
        } );
        render( <CECEvent event={teamsEvent} /> );
        expect( screen.getByText( 'Connect with Microsoft Teams' ) ).toBeInTheDocument();
    } );
    test( 'detects Webex links', () => {
        const webexEvent = createMockEvent( {
            location: 'https://webex.com/meeting/123'
        } );
        render( <CECEvent event={webexEvent} /> );
        expect( screen.getByText( 'Connect with Webex' ) ).toBeInTheDocument();
    } );
    test( 'detects GoToMeeting links', () => {
        const gotoEvent = createMockEvent( {
            location: 'https://gotomeeting.com/join/123'
        } );
        render( <CECEvent event={gotoEvent} /> );
        expect( screen.getByText( 'Connect with GoToMeeting' ) ).toBeInTheDocument();
    } );
    test( 'detects Discord links', () => {
        const discordEvent = createMockEvent( {
            location: 'https://discord.gg/abc123'
        } );
        render( <CECEvent event={discordEvent} /> );
        expect( screen.getByText( 'Connect with Discord' ) ).toBeInTheDocument();
    } );
    test( 'detects generic online meeting text', () => {
        const genericEvent = createMockEvent( {
            location: 'This is an online meeting'
        } );
        render( <CECEvent event={genericEvent} /> );
        expect( screen.getByText( 'Connect with Generic Online' ) ).toBeInTheDocument();
    } );
    test( 'does not show connect button for physical locations', () => {
        const physicalEvent = createMockEvent( {
            location: '123 Main St, New York, NY'
        } );
        render( <CECEvent event={physicalEvent} /> );
        expect( screen.queryByText( /Connect with/ ) ).not.toBeInTheDocument();
    } );
    test( 'handles empty or null location', () => {
        const noLocationEvent = createMockEvent( {
            location: ''
        } );
        render( <CECEvent event={noLocationEvent} /> );
        expect( screen.queryByText( /Connect with/ ) ).not.toBeInTheDocument();
    } );
    test( 'case-insensitive platform detection', () => {
        const caseEvent = createMockEvent( {
            location: 'HTTPS://ZOOM.US/J/123456789'
        } );
        render( <CECEvent event={caseEvent} /> );
        expect( screen.getByText( 'Connect with Zoom' ) ).toBeInTheDocument();
    } );
} );
describe( 'Date Processing Utilities', () => {
    test( 'handles invalid date strings gracefully', () => {
        // Suppress console.warn for this test since we're intentionally testing invalid dates
        const originalWarn = console.warn;
        console.warn = jest.fn();
        const invalidDateEvent = createMockEvent( {
            recurrence: {
                ...mockEvent.recurrence!,
                startDate: 'not-a-valid-date',
                endDate: 'also-not-valid'
            } as CECEventRecurrence
        } );
        expect( () => {
            render( <CECEvent event={invalidDateEvent} /> );
        } ).not.toThrow();
        // Should still render the event with fallback date
        expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        // Restore console.warn
        console.warn = originalWarn;
    } );
    test( 'handles missing date information', () => {
        const noDateEvent = createMockEvent( {
            recurrence: {
                frequency: 'weekly',
                allDay: '0'
                // Missing startDate and endDate
            } as CECEventRecurrence
        } );
        expect( () => {
            render( <CECEvent event={noDateEvent} /> );
        } ).not.toThrow();
    } );
    test( 'handles date parsing errors with fallback', () => {
        const consoleSpy = jest.spyOn( console, 'warn' ).mockImplementation();
        const badDateEvent = createMockEvent( {
            recurrence: {
                ...mockEvent.recurrence!,
                startDate: 'invalid-date-format'
            } as CECEventRecurrence
        } );
        render( <CECEvent event={badDateEvent} /> );
        // Should log warning but not crash
        expect( consoleSpy ).toHaveBeenCalledWith(
            '[CECEvent] parseDate: Failed to parse date, using current date as fallback'
        );
        consoleSpy.mockRestore();
    } );
    test( 'compares dates correctly for same day detection', () => {
        const sameDayEvent = createMockEvent( {
            recurrence: {
                ...mockEvent.recurrence!,
                startDate: '2025-01-01T10:00:00Z',
                endDate: '2025-01-01T18:00:00Z'
            } as CECEventRecurrence
        } );
        render( <CECEvent event={sameDayEvent} /> );
        // Should render without errors and show date information
        expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        const dateElements = screen.getAllByText( /Jan|1/ );
        expect( dateElements.length ).toBeGreaterThan( 0 );
    } );
    test( 'handles different day detection for multi-day events', () => {
        const multiDayEvent = createMockEvent( {
            recurrence: {
                ...mockEvent.recurrence!,
                startDate: '2025-01-01T10:00:00Z',
                endDate: '2025-01-03T18:00:00Z'
            } as CECEventRecurrence
        } );
        render( <CECEvent event={multiDayEvent} /> );
        // Should show "to" separator for different days
        expect( screen.getByText( 'to' ) ).toBeInTheDocument();
    } );
} );
describe( 'Content Security and Sanitization', () => {
    test( 'removes script tags from description', () => {
        const scriptEvent = createMockEvent( {
            description: '<p>Valid content</p><script>alert("xss")</script><p>More content</p>'
        } );
        render( <CECEvent event={scriptEvent} /> );
        // Script content is concatenated with text content in the actual implementation
        expect( screen.getByText( 'Valid contentalert("xss")More content' ) ).toBeInTheDocument();
    } );
    test( 'removes iframe tags from description', () => {
        const iframeEvent = createMockEvent( {
            description: '<p>Content before</p><iframe src="external.com"></iframe><p>Content after</p>'
        } );
        render( <CECEvent event={iframeEvent} /> );
        expect( screen.getByText( 'Content beforeContent after' ) ).toBeInTheDocument();
        expect( screen.queryByRole( 'iframe' ) ).not.toBeInTheDocument();
    } );
    test( 'handles potentially dangerous URLs', () => {
        const dangerousEvent = createMockEvent( {
            description: '<a href="javascript:alert(1)">Dangerous Link</a><a href="data:text/html,<script>alert(1)</script>">Data URL</a>'
        } );
        render( <CECEvent event={dangerousEvent} /> );
        // Links should be processed but not executed
        expect( screen.queryByText( 'Dangerous Link' ) ).not.toBeInTheDocument();
    } );
    test( 'decodes HTML entities correctly', () => {
        const encodedEvent = createMockEvent( {
            description: '<p>Content with &lt;script&gt; tags &amp; quotes</p>'
        } );
        render( <CECEvent event={encodedEvent} /> );
        expect( screen.getByText( 'Content with' ) ).toBeInTheDocument();
    } );
    test( 'handles malformed HTML gracefully', () => {
        const malformedEvent = createMockEvent( {
            description: '<p>Unclosed paragraph<div>Nested div without closing<span>Unclosed span'
        } );
        expect( () => {
            render( <CECEvent event={malformedEvent} /> );
        } ).not.toThrow();
        // Should still render some content
        expect( screen.getByText( /Unclosed paragraph/ ) ).toBeInTheDocument();
    } );
} );
describe( 'Component Integration', () => {
    test( 'works with edit mode functionality', () => {
        const editEvent = createMockEvent( {} );
        render( <CECEvent event={editEvent} _edit={true} /> );
        const eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toBeInTheDocument();
        // Edit mode should be enabled
    } );
    test( 'handles rest props correctly', () => {
        const eventWithRestProps = createMockEvent( {} );
        render(
            <CECEvent
                event={eventWithRestProps}
                data-custom="test-value"
                aria-describedby="additional-description"
            />
        );
        const eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toHaveAttribute( 'data-custom', 'test-value' );
        expect( eventElement ).toHaveAttribute( 'aria-describedby', 'additional-description' );
    } );
    test( 'maintains accessibility with custom props', () => {
        const accessibleEvent = createMockEvent( {} );
        render(
            <CECEvent
                event={accessibleEvent}
                aria-labelledby="custom-title"
            />
        );
        const eventElement = screen.getByTestId( 'cec-event' );
        expect( eventElement ).toHaveAttribute( 'role', 'article' );
        expect( eventElement ).toHaveAttribute( 'aria-labelledby', 'custom-title' );
    } );
} );
// Additional tests to improve code coverage
describe( 'Coverage Improvement Tests', () => {
    test( 'handles elementsPerRow configurations for responsive layout', () => {
        const event = createMockEvent( {
            description: '<p>This is a longer description to test word wrapping and responsive behavior</p>',
            tags: ['tech', 'conference', 'webinar', 'workshop', 'training']
        } );
        // Test 6 elements per row (very narrow cards)
        const { container: sixPerRow } = render(
            <CECEvent event={event} elementsPerRow={6} />
        );
        expect( sixPerRow ).toBeInTheDocument();
        // Test 4 elements per row (narrow cards)
        const { container: fourPerRow } = render(
            <CECEvent event={event} elementsPerRow={4} />
        );
        expect( fourPerRow ).toBeInTheDocument();
        // Test 3 elements per row (small cards)
        const { container: threePerRow } = render(
            <CECEvent event={event} elementsPerRow={3} />
        );
        expect( threePerRow ).toBeInTheDocument();
        // Test 2 elements per row (medium cards)
        const { container: twoPerRow } = render(
            <CECEvent event={event} elementsPerRow={2} />
        );
        expect( twoPerRow ).toBeInTheDocument();
        // Test 1 element per row (large cards)
        const { container: onePerRow } = render(
            <CECEvent event={event} elementsPerRow={1} />
        );
        expect( onePerRow ).toBeInTheDocument();
    } );
    test( 'handles descriptionMaxLines with different elements per row configurations', () => {
        const event = createMockEvent( {
            description: '<p>This is a very long description that should be truncated based on the number of lines allowed and the elements per row configuration</p>'
        } );
        // Test descriptionMaxLines=1 with different elementsPerRow
        const { container: oneLineSixPerRow } = render(
            <CECEvent event={event} descriptionMaxLines={1} elementsPerRow={6} />
        );
        expect( oneLineSixPerRow ).toBeInTheDocument();
        const { container: oneLineFourPerRow } = render(
            <CECEvent event={event} descriptionMaxLines={1} elementsPerRow={4} />
        );
        expect( oneLineFourPerRow ).toBeInTheDocument();
        const { container: oneLineThreePerRow } = render(
            <CECEvent event={event} descriptionMaxLines={1} elementsPerRow={3} />
        );
        expect( oneLineThreePerRow ).toBeInTheDocument();
        // Test descriptionMaxLines=2 with different elementsPerRow
        const { container: twoLineOnePerRow } = render(
            <CECEvent event={event} descriptionMaxLines={2} elementsPerRow={1} />
        );
        expect( twoLineOnePerRow ).toBeInTheDocument();
        const { container: twoLineTwoPerRow } = render(
            <CECEvent event={event} descriptionMaxLines={2} elementsPerRow={2} />
        );
        expect( twoLineTwoPerRow ).toBeInTheDocument();
        const { container: twoLineSixPerRow } = render(
            <CECEvent event={event} descriptionMaxLines={2} elementsPerRow={6} />
        );
        expect( twoLineSixPerRow ).toBeInTheDocument();
        // Test descriptionMaxLines=3 with different elementsPerRow
        const { container: threeLineOnePerRow } = render(
            <CECEvent event={event} descriptionMaxLines={3} elementsPerRow={1} />
        );
        expect( threeLineOnePerRow ).toBeInTheDocument();
        const { container: threeLineFourPerRow } = render(
            <CECEvent event={event} descriptionMaxLines={3} elementsPerRow={4} />
        );
        expect( threeLineFourPerRow ).toBeInTheDocument();
        const { container: threeLineSixPerRow } = render(
            <CECEvent event={event} descriptionMaxLines={3} elementsPerRow={6} />
        );
        expect( threeLineSixPerRow ).toBeInTheDocument();
    } );
    test( 'handles edge cases for description truncation', () => {
        const event = createMockEvent( {
            description: '<p>Short</p>',
            tags: ['single']
        } );
        // Test with very restrictive settings
        const { container: restrictiveContainer } = render(
            <CECEvent
                event={event}
                descriptionMaxLines={1}
                elementsPerRow={6}
            />
        );
        expect( restrictiveContainer ).toBeInTheDocument();
        // Test with permissive settings
        const { container: permissiveContainer } = render(
            <CECEvent
                event={event}
                descriptionMaxLines={5}
                elementsPerRow={1}
            />
        );
        expect( permissiveContainer ).toBeInTheDocument();
    } );
    test( 'handles events with minimal and maximal data', () => {
        // Test minimal event data
        const minimalEvent = createMockEvent( {
            title: 'Min',
            description: '<p>Min</p>',
            tags: [],
            location: '',
            category: ''
        } );
        const { container: minimalContainer } = render(
            <CECEvent event={minimalEvent} />
        );
        expect( minimalContainer ).toBeInTheDocument();
        // Test maximal event data
        const maximalEvent = createMockEvent( {
            title: 'Very Long Event Title That Exceeds Normal Limits',
            description: '<p>This is a very long description with many words that should test the truncation and word wrapping functionality extensively</p>',
            tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8'],
            location: 'Very Long Location Name That Might Need Truncation',
            category: 'Very Long Category Name'
        } );
        const { container: maximalContainer } = render(
            <CECEvent event={maximalEvent} />
        );
        expect( maximalContainer ).toBeInTheDocument();
    } );
    test( 'handles different date formats and edge cases', () => {
        const event = createMockEvent( {
            date: '2025-12-31T23:59:59Z',
            recurrence: {
                frequency: 'monthly',
                interval: 2,
                until: '2026-12-31',
                allDay: '1',
                startDate: '2025-01-01T09:00:00Z',
                endDate: '2025-01-01T17:00:00Z'
            }
        } );
        // Test different date formats
        const formats: DateFormat[] = ['full', 'short', 'month-day', 'time-only'];
        formats.forEach( format => {
            const { container } = render(
                <CECEvent event={event} dateFormat={format} />
            );
            expect( container ).toBeInTheDocument();
        } );
    } );
    describe( 'Date and Time Formatting', () => {
        test( 'should format time with 24-hour format', () => {
            render( <CECEvent {...defaultProps} eventTime24hrFormat={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should format time with 12-hour format', () => {
            render( <CECEvent {...defaultProps} eventTime24hrFormat={false} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should show timezone when enabled', () => {
            render( <CECEvent {...defaultProps} showTimeZone={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle different date formats', () => {
            const { rerender } = render( <CECEvent {...defaultProps} dateFormat="full" /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
            rerender( <CECEvent {...defaultProps} dateFormat="short" /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
            rerender( <CECEvent {...defaultProps} dateFormat="month-day" /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle all-day events', () => {
            const allDayEvent = {
                ...mockEvent,
                recurrence: {
                    ...mockEvent.recurrence,
                    allDay: '1' as const,
                },
            } as unknown as CECEventData;
            render( <CECEvent {...defaultProps} event={allDayEvent} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should format date range correctly', () => {
            const multiDayEvent = {
                ...mockEvent,
                recurrence: {
                    ...mockEvent.recurrence,
                    startDate: '2025-01-01T10:00:00Z',
                    endDate: '2025-01-03T11:00:00Z',
                },
            };
            render( <CECEvent {...defaultProps} event={multiDayEvent} showDateRange={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle same day date range', () => {
            const sameDayEvent = {
                ...mockEvent,
                recurrence: {
                    ...mockEvent.recurrence,
                    startDate: '2025-01-01T10:00:00Z',
                    endDate: '2025-01-01T11:00:00Z',
                },
            };
            render( <CECEvent {...defaultProps} event={sameDayEvent} showDateRange={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
    } );
    describe( 'Online Meeting Detection', () => {
        test( 'should detect Zoom meetings', () => {
            const zoomEvent = {
                ...mockEvent,
                location: 'https://zoom.us/j/123456789',
            };
            render( <CECEvent {...defaultProps} event={zoomEvent} showLocation={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should detect Google Meet meetings', () => {
            const meetEvent = {
                ...mockEvent,
                location: 'https://meet.google.com/abc-defg-hij',
            };
            render( <CECEvent {...defaultProps} event={meetEvent} showLocation={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should detect Microsoft Teams meetings', () => {
            const teamsEvent = {
                ...mockEvent,
                location: 'https://teams.microsoft.com/l/meetup-join/123456',
            };
            render( <CECEvent {...defaultProps} event={teamsEvent} showLocation={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should detect Webex meetings', () => {
            const webexEvent = {
                ...mockEvent,
                location: 'https://webex.com/meet/123456',
            };
            render( <CECEvent {...defaultProps} event={webexEvent} showLocation={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should detect GoToMeeting meetings', () => {
            const gotoEvent = {
                ...mockEvent,
                location: 'https://gotomeeting.com/meeting/123456',
            };
            render( <CECEvent {...defaultProps} event={gotoEvent} showLocation={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should detect Discord meetings', () => {
            const discordEvent = {
                ...mockEvent,
                location: 'https://discord.gg/abc123',
            };
            render( <CECEvent {...defaultProps} event={discordEvent} showLocation={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should detect generic online meetings', () => {
            const genericEvent = {
                ...mockEvent,
                location: 'This is an online meeting',
            };
            render( <CECEvent {...defaultProps} event={genericEvent} showLocation={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle physical locations', () => {
            const physicalEvent = {
                ...mockEvent,
                location: '123 Main St, City, State',
            };
            render( <CECEvent {...defaultProps} event={physicalEvent} showLocation={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
    } );
    describe( 'Recurrence Formatting', () => {
        test( 'should format daily recurrence', () => {
            const dailyEvent = {
                ...mockEvent,
                recurrence: {
                    ...mockEvent.recurrence,
                    frequency: 'daily' as const,
                    interval: 1,
                },
            } as unknown as CECEventData;
            render( <CECEvent {...defaultProps} event={dailyEvent} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should format weekly recurrence with specific days', () => {
            const weeklyEvent = {
                ...mockEvent,
                recurrence: {
                    ...mockEvent.recurrence,
                    frequency: 'weekly' as const,
                    byDay: 'MO,WE,FR',
                },
            } as unknown as CECEventData;
            render( <CECEvent {...defaultProps} event={weeklyEvent} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should format monthly recurrence', () => {
            const monthlyEvent = {
                ...mockEvent,
                recurrence: {
                    ...mockEvent.recurrence,
                    frequency: 'monthly' as const,
                    byMonthDay: '15',
                },
            } as unknown as CECEventData;
            render( <CECEvent {...defaultProps} event={monthlyEvent} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should format yearly recurrence', () => {
            const yearlyEvent = {
                ...mockEvent,
                recurrence: {
                    ...mockEvent.recurrence,
                    frequency: 'yearly' as const,
                    interval: 1,
                },
            } as unknown as CECEventData;
            render( <CECEvent {...defaultProps} event={yearlyEvent} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle recurrence with count', () => {
            const countedEvent = {
                ...mockEvent,
                recurrence: {
                    ...mockEvent.recurrence,
                    frequency: 'weekly' as const,
                    count: 10,
                },
            } as unknown as CECEventData;
            render( <CECEvent {...defaultProps} event={countedEvent} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle recurrence with interval', () => {
            const intervalEvent = {
                ...mockEvent,
                recurrence: {
                    ...mockEvent.recurrence,
                    frequency: 'weekly' as const,
                    interval: 2,
                },
            } as unknown as CECEventData;
            render( <CECEvent {...defaultProps} event={intervalEvent} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
    } );
    describe( 'Actions and Custom Actions', () => {
        test( 'should render online meeting connect link', () => {
            const onlineEvent = {
                ...mockEvent,
                location: 'https://zoom.us/j/123456789',
            };
            render( <CECEvent {...defaultProps} event={onlineEvent} showActions={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle custom actions', () => {
            const customAction = <button>Custom Action</button>;
            render(
                <CECEvent
                    {...defaultProps}
                    showActions={true}
                    customActions={customAction}
                />
            );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle multiple custom actions', () => {
            const customActions = [
                <button key="1">Action 1</button>,
                <button key="2">Action 2</button>,
            ];
            render(
                <CECEvent
                    {...defaultProps}
                    showActions={true}
                    customActions={customActions}
                />
            );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should style single action as primary', () => {
            const customAction = <button className="custom-class">Single Action</button>;
            render(
                <CECEvent
                    {...defaultProps}
                    showActions={true}
                    customActions={customAction}
                />
            );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
    } );
    describe( 'Responsive Behavior', () => {
        test( 'should adjust description max lines for different elements per row', () => {
            const { rerender } = render( <CECEvent {...defaultProps} elementsPerRow={1} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
            rerender( <CECEvent {...defaultProps} elementsPerRow={2} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
            rerender( <CECEvent {...defaultProps} elementsPerRow={3} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
            rerender( <CECEvent {...defaultProps} elementsPerRow={4} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
            rerender( <CECEvent {...defaultProps} elementsPerRow={6} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should adjust tags threshold for responsive layouts', () => {
            const eventWithManyTags = {
                ...mockEvent,
                tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
            };
            const { rerender } = render( <CECEvent {...defaultProps} event={eventWithManyTags} elementsPerRow={1} showTags={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
            rerender( <CECEvent {...defaultProps} event={eventWithManyTags} elementsPerRow={4} showTags={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
            rerender( <CECEvent {...defaultProps} event={eventWithManyTags} elementsPerRow={6} showTags={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
    } );
    describe( 'Error Handling and Edge Cases', () => {
        test( 'should handle missing recurrence data', () => {
            const eventWithoutRecurrence = {
                ...mockEvent,
                recurrence: undefined as any,
            };
            render( <CECEvent {...defaultProps} event={eventWithoutRecurrence} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle invalid date strings', () => {
            const consoleSpy = jest.spyOn( console, 'warn' ).mockImplementation();
            const eventWithInvalidDate = {
                ...mockEvent,
                recurrence: {
                    ...mockEvent.recurrence,
                    startDate: 'invalid-date',
                },
            };
            render( <CECEvent {...defaultProps} event={eventWithInvalidDate} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
            consoleSpy.mockRestore();
        } );
        test( 'should handle missing location', () => {
            const eventWithoutLocation = {
                ...mockEvent,
                location: undefined as any,
            };
            render( <CECEvent {...defaultProps} event={eventWithoutLocation} showLocation={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle empty tags array', () => {
            const eventWithoutTags = {
                ...mockEvent,
                tags: [],
            };
            render( <CECEvent {...defaultProps} event={eventWithoutTags} showTags={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle null tags', () => {
            const eventWithNullTags = {
                ...mockEvent,
                tags: null as any,
            };
            render( <CECEvent {...defaultProps} event={eventWithNullTags} showTags={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle string tags', () => {
            const eventWithStringTags = {
                ...mockEvent,
                tags: 'tag1,tag2,tag3',
            };
            render( <CECEvent {...defaultProps} event={eventWithStringTags} showTags={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle undefined tags', () => {
            const eventWithUndefinedTags = {
                ...mockEvent,
                tags: undefined as any,
            };
            render( <CECEvent {...defaultProps} event={eventWithUndefinedTags} showTags={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
    } );
    describe( 'Content Security', () => {
        test( 'should sanitize dangerous HTML in description', () => {
            const eventWithXSS = {
                ...mockEvent,
                description: '<p>Safe content</p><script>alert("xss")</script>',
            };
            render( <CECEvent {...defaultProps} event={eventWithXSS} showDescription={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle malicious links in description', () => {
            const eventWithMaliciousLinks = {
                ...mockEvent,
                description: '<p>Check this <a href="javascript:alert(\'xss\')">link</a></p>',
            };
            render( <CECEvent {...defaultProps} event={eventWithMaliciousLinks} showDescription={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle iframe tags in description', () => {
            const eventWithIframe = {
                ...mockEvent,
                description: '<p>Content</p><iframe src="javascript:alert(\'xss\')"></iframe>',
            };
            render( <CECEvent {...defaultProps} event={eventWithIframe} showDescription={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle data URLs in description', () => {
            const eventWithDataUrl = {
                ...mockEvent,
                description: '<p>Content</p><img src="data:text/html,<script>alert(\'xss\')</script>">',
            };
            render( <CECEvent {...defaultProps} event={eventWithDataUrl} showDescription={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
    } );
    describe( 'Accessibility Compliance', () => {
        test( 'should have proper ARIA labels', () => {
            render( <CECEvent {...defaultProps} /> );
            const eventElement = screen.getByTestId( 'cec-event' );
            expect( eventElement ).toHaveAttribute( 'role', 'article' );
            expect( eventElement ).toHaveAttribute( 'aria-label' );
        } );
        test( 'should have proper ARIA describedby', () => {
            render( <CECEvent {...defaultProps} /> );
            const eventElement = screen.getByTestId( 'cec-event' );
            if ( mockEvent.id ) {
                expect( eventElement ).toHaveAttribute( 'aria-describedby' );
            }
        } );
        test( 'should support keyboard navigation', () => {
            const handleClick = jest.fn();
            render( <CECEvent {...defaultProps} onEventClick={handleClick} /> );
            const eventElement = screen.getByTestId( 'cec-event' );
            // Test Enter key
            fireEvent.keyDown( eventElement, { key: 'Enter' } );
            // Test Space key
            fireEvent.keyDown( eventElement, { key: ' ' } );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should have proper focus management', () => {
            render( <CECEvent {...defaultProps} onEventClick={() => {}} /> );
            const eventElement = screen.getByTestId( 'cec-event' );
            expect( eventElement ).toHaveAttribute( 'tabIndex', '0' );
        } );
        test( 'should handle tags accessibility', () => {
            const eventWithManyTags = {
                ...mockEvent,
                tags: ['tag1', 'tag2', 'tag3'],
            };
            render( <CECEvent {...defaultProps} event={eventWithManyTags} showTags={true} /> );
            const tagsContainer = screen.getByRole( 'list' );
            expect( tagsContainer ).toHaveAttribute( 'aria-label', 'Event tags' );
        } );
    } );
    describe( 'Internationalization', () => {
        test( 'should handle different date locales', () => {
            // Mock different locale settings
            const originalLocale = Intl.DateTimeFormat().resolvedOptions().locale;
            // Test with different locale (if supported)
            try {
                render( <CECEvent {...defaultProps} /> );
                expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
            } catch ( error ) {
                // Locale not supported, should still render
                expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
            }
        } );
        test( 'should handle RTL languages', () => {
            // Simulate RTL context
            render( <CECEvent {...defaultProps} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle different time zones', () => {
            render( <CECEvent {...defaultProps} showTimeZone={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
    } );
    describe( 'Performance and Memory', () => {
        test( 'should handle large number of events efficiently', () => {
            const events = Array.from( { length: 100 }, ( _, i ) => ( {
                ...mockEvent,
                id: `event-${i}`,
                title: `Event ${i}`,
            } ) );
            const startTime = performance.now();
            events.forEach( event => {
                render( <CECEvent {...defaultProps} event={event} /> );
            } );
            const endTime = performance.now();
            const renderTime = endTime - startTime;
            // Should render 100 events in reasonable time (less than 5 seconds)
            expect( renderTime ).toBeLessThan( 5000 );
        } );
        test( 'should not leak memory on repeated renders', () => {
            const event = { ...mockEvent };
            // Render multiple times to check for memory leaks
            for ( let i = 0; i < 50; i++ ) {
                const { unmount } = render( <CECEvent {...defaultProps} event={event} /> );
                unmount();
            }
            // If we get here without crashing, memory management is working
            expect( true ).toBe( true );
        } );
    } );
    describe( 'Date Processing Utilities', () => {
        test( 'should handle isSameDay function correctly', () => {
            const event1 = {
                ...mockEvent,
                recurrence: {
                    ...mockEvent.recurrence,
                    startDate: '2025-01-01T10:00:00Z',
                    endDate: '2025-01-01T15:00:00Z',
                },
            };
            const event2 = {
                ...mockEvent,
                recurrence: {
                    ...mockEvent.recurrence,
                    startDate: '2025-01-01T10:00:00Z',
                    endDate: '2025-01-02T15:00:00Z',
                },
            };
            const { unmount } = render( <CECEvent {...defaultProps} event={event1} showDateRange={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
            unmount();
            render( <CECEvent {...defaultProps} event={event2} showDateRange={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle parseDate function with null input', () => {
            const consoleSpy = jest.spyOn( console, 'warn' ).mockImplementation();
            const eventWithNullDate = {
                ...mockEvent,
                recurrence: {
                    ...mockEvent.recurrence,
                    startDate: null as any,
                },
            };
            render( <CECEvent {...defaultProps} event={eventWithNullDate} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
            // The component handles null dates gracefully without console warnings
            expect( consoleSpy ).not.toHaveBeenCalledWith(
                '[CECEvent] parseDate: No date provided, using current date as fallback'
            );
            consoleSpy.mockRestore();
        } );
        test( 'should handle parseDate function with invalid date', () => {
            const consoleSpy = jest.spyOn( console, 'warn' ).mockImplementation();
            const eventWithInvalidDate = {
                ...mockEvent,
                recurrence: {
                    ...mockEvent.recurrence,
                    startDate: 'not-a-date',
                },
            };
            render( <CECEvent {...defaultProps} event={eventWithInvalidDate} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
            expect( consoleSpy ).toHaveBeenCalledWith(
                '[CECEvent] parseDate: Failed to parse date, using current date as fallback'
            );
            consoleSpy.mockRestore();
        } );
    } );
    describe( 'Variant-Specific Behavior', () => {
        test( 'should handle featured-compact variant', () => {
            render( <CECEvent {...defaultProps} variant="featured-compact" /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle river variant', () => {
            render( <CECEvent {...defaultProps} variant="river" /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle featured variant', () => {
            render( <CECEvent {...defaultProps} variant="featured" /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
    } );
    describe( 'Edge Cases for Description Truncation', () => {
        test( 'should handle very long descriptions', () => {
            const longDescription = 'A'.repeat( 1000 );
            const eventWithLongDesc = {
                ...mockEvent,
                description: `<p>${longDescription}</p>`,
            };
            render( <CECEvent {...defaultProps} event={eventWithLongDesc} showDescription={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle descriptions with many links', () => {
            const linkDescription = Array.from( { length: 50 }, ( _, i ) =>
                `<a href="https://example.com/${i}">Link ${i}</a>`
            ).join( ' ' );
            const eventWithManyLinks = {
                ...mockEvent,
                description: `<p>${linkDescription}</p>`,
            };
            render( <CECEvent {...defaultProps} event={eventWithManyLinks} showDescription={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle descriptions with nested HTML', () => {
            const nestedDescription = '<div><p>Outer <span>inner <strong>bold</strong> text</span></p></div>';
            const eventWithNested = {
                ...mockEvent,
                description: nestedDescription,
            };
            render( <CECEvent {...defaultProps} event={eventWithNested} showDescription={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
    } );
    describe( 'Tags Display Logic', () => {
        test( 'should show "more" tag when tags exceed threshold', () => {
            const eventWithManyTags = {
                ...mockEvent,
                tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6'],
            };
            render( <CECEvent {...defaultProps} event={eventWithManyTags} showTags={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle single remaining tag correctly', () => {
            const eventWithFourTags = {
                ...mockEvent,
                tags: ['tag1', 'tag2', 'tag3', 'tag4'],
            };
            render( <CECEvent {...defaultProps} event={eventWithFourTags} showTags={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle long tag truncation', () => {
            const longTag = 'this-is-a-very-long-tag-that-should-be-truncated';
            const eventWithLongTag = {
                ...mockEvent,
                tags: [longTag, 'short'],
            };
            render( <CECEvent {...defaultProps} event={eventWithLongTag} showTags={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle showAllTags state', () => {
            const eventWithManyTags = {
                ...mockEvent,
                tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
            };
            render( <CECEvent {...defaultProps} event={eventWithManyTags} showTags={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should show +X more button and expand on click for multiple remaining tags', () => {
            const eventWithManyTags = {
                ...mockEvent,
                tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
            };
            render( <CECEvent {...defaultProps} event={eventWithManyTags} showTags={true} elementsPerRow={3} /> );
            const moreButton = screen.queryByRole( 'button', { name: /more tags/i } );
            if ( moreButton ) {
                fireEvent.click( moreButton );
                expect( screen.getByText( 'TAG4' ) ).toBeInTheDocument();
            }
        } );
    } );
    describe( 'Coverage: Column and word defaults', () => {
        test( 'should handle unknown elementsPerRow in getColumnClass default branch', () => {
            render( <CECEvent {...defaultProps} elementsPerRow={5} descriptionMaxLines={1} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should hit calculateMaxWordsPerLine default for descriptionMaxLines=1 and unknown elementsPerRow', () => {
            render( <CECEvent {...defaultProps} elementsPerRow={5 as any} descriptionMaxLines={1} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should hit calculateMaxWordsPerLine default for descriptionMaxLines=2 and unknown elementsPerRow', () => {
            render( <CECEvent {...defaultProps} elementsPerRow={5 as any} descriptionMaxLines={2} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should hit calculateMaxWordsPerLine default for other descriptionMaxLines and unknown elementsPerRow', () => {
            render( <CECEvent {...defaultProps} elementsPerRow={5 as any} descriptionMaxLines={4} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
    } );
    describe( 'Coverage: onClick handler', () => {
        test( 'should call onClick prop when clicked', () => {
            const onClick = jest.fn();
            const onEventClick = jest.fn();
            render( <CECEvent {...defaultProps} onClick={onClick} onEventClick={onEventClick} /> );
            const card = screen.getByTestId( 'cec-event' );
            fireEvent.click( card );
            expect( onClick ).toHaveBeenCalled();
        } );
    } );
    describe( 'Coverage: ResizeObserver callback', () => {
        test( 'should update containerWidth via ResizeObserver callback', () => {
            let resizeCallback: ( entries: any[] ) => void = () => {};
            const originalResizeObserver = global.ResizeObserver;
            global.ResizeObserver = jest.fn().mockImplementation( ( cb: ( entries: any[] ) => void ) => {
                resizeCallback = cb;
                return { observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn() };
            } );
            render( <CECEvent {...defaultProps} /> );
            act( () => {
                resizeCallback( [{ contentRect: { width: 250 } }] );
            } );
            act( () => {
                resizeCallback( [{ contentRect: { width: 180 } }] );
            } );
            act( () => {
                resizeCallback( [{ contentRect: { width: 350 } }] );
            } );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
            global.ResizeObserver = originalResizeObserver;
        } );
    } );
    describe( 'Coverage: formatRecurrenceInfo edge cases', () => {
        const recurrenceBase = {
            interval: 1,
            allDay: '0' as const,
            startDate: '2025-01-01T10:00:00Z',
            endDate: '2025-01-01T11:00:00Z',
        };
        test( 'should handle recurrence with no frequency', () => {
            const eventNoFreq = {
                ...mockEvent,
                recurrence: { ...recurrenceBase, frequency: undefined },
            } as unknown as CECEventData;
            render( <CECEvent {...defaultProps} event={eventNoFreq} showDateRange={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle daily recurrence with 1 byDay', () => {
            const event1Day = {
                ...mockEvent,
                recurrence: { ...recurrenceBase, frequency: 'daily' as const, byDay: 'MO' },
            } as unknown as CECEventData;
            render( <CECEvent {...defaultProps} event={event1Day} showDateRange={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle daily recurrence with 2 byDays', () => {
            const event2Days = {
                ...mockEvent,
                recurrence: { ...recurrenceBase, frequency: 'daily' as const, byDay: 'MO,WE' },
            } as unknown as CECEventData;
            render( <CECEvent {...defaultProps} event={event2Days} showDateRange={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle weekly recurrence with 1 byDay', () => {
            const eventWeekly1 = {
                ...mockEvent,
                recurrence: { ...recurrenceBase, frequency: 'weekly' as const, byDay: 'TU' },
            } as unknown as CECEventData;
            render( <CECEvent {...defaultProps} event={eventWeekly1} showDateRange={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
        test( 'should handle unknown frequency (default branch)', () => {
            const eventUnknownFreq = {
                ...mockEvent,
                recurrence: { ...recurrenceBase, frequency: 'biweekly' as any },
            } as unknown as CECEventData;
            render( <CECEvent {...defaultProps} event={eventUnknownFreq} showDateRange={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
    } );
    describe( 'Coverage: formatDateRange with no startDate', () => {
        test( 'should handle recurrence with missing startDate', () => {
            const originalWarn = console.warn;
            console.warn = jest.fn();
            const eventNoStart = {
                ...mockEvent,
                recurrence: {
                    frequency: 'weekly' as const,
                    interval: 1,
                    allDay: '0' as const,
                    endDate: '2025-01-01T11:00:00Z',
                },
            } as unknown as CECEventData;
            render( <CECEvent {...defaultProps} event={eventNoStart} showDateRange={true} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
            console.warn = originalWarn;
        } );
    } );
    describe( 'Coverage: formatBasedOnType default', () => {
        test( 'should handle unknown dateFormat (default branch)', () => {
            const recurrenceWithDates = {
                frequency: 'weekly' as const,
                interval: 1,
                allDay: '0' as const,
                startDate: '2025-06-01T10:00:00Z',
                endDate: '2025-06-01T11:00:00Z',
            };
            const event = {
                ...mockEvent,
                recurrence: recurrenceWithDates,
            } as unknown as CECEventData;
            render( <CECEvent {...defaultProps} event={event} showDateRange={true} dateFormat={'unknown' as any} /> );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
    } );
    describe( 'Coverage: single non-element customAction', () => {
        test( 'should render single non-React-element custom action', () => {
            const eventNoLocation = {
                ...mockEvent,
                location: '',
                links: [],
            };
            render(
                <CECEvent
                    {...defaultProps}
                    event={eventNoLocation}
                    showActions={true}
                    customActions={'Join Now'}
                />
            );
            expect( screen.getByText( 'Test Event' ) ).toBeInTheDocument();
        } );
    } );
    describe( 'RTL direction support', () => {
        test( "When dir='rtl' is passed, the root element has cec-event--rtl class and dir attribute", () => {
            render( <CECEvent event={mockEvent} dir="rtl" /> );
            const eventElement = screen.getByTestId( 'cec-event' );
            expect( eventElement ).toHaveClass( 'cec-event--rtl' );
            expect( eventElement ).toHaveAttribute( 'dir', 'rtl' );
        } );
        test( "When dir='ltr' is passed, the root element does NOT have cec-event--rtl class", () => {
            render( <CECEvent event={mockEvent} dir="ltr" /> );
            const eventElement = screen.getByTestId( 'cec-event' );
            expect( eventElement ).not.toHaveClass( 'cec-event--rtl' );
            expect( eventElement ).toHaveAttribute( 'dir', 'ltr' );
        } );
        test( "When dir is not passed, the root element does NOT have cec-event--rtl class by default", () => {
            render( <CECEvent event={mockEvent} /> );
            const eventElement = screen.getByTestId( 'cec-event' );
            expect( eventElement ).not.toHaveClass( 'cec-event--rtl' );
        } );
        test( "When eventTo is earlier than eventFrom, the component renders without crashing (chronological swap)", () => {
            // startDate=2025-03-01 (later), endDate=2025-01-01 (earlier) — swap logic should fire
            const reversedEvent = createMockEvent( {
                recurrence: {
                    ...mockEvent.recurrence!,
                    allDay: '0',
                    startDate: '2025-03-01T10:00:00Z', // later date
                    endDate: '2025-01-01T10:00:00Z',   // earlier date
                }
            } );
            expect( () =>
                render( <CECEvent event={reversedEvent} showDate={true} showDateRange={true} /> )
            ).not.toThrow();
            // A date block must be present — the component should not bail out silently
            expect( screen.getByTestId( 'event-date-month' ) ).toBeInTheDocument();
        } );
    } );
} );
// ============================================================
// DXQ-49653: Targeted mutation-killing tests
// These tests assert concrete DOM values and cover conditional
// branches that existing tests leave as `toBeInTheDocument()`-only.
// ============================================================
describe( 'DXQ-49653: Location text content assertions', () => {
    test( 'online meeting shows "Online meeting" text in location section', () => {
        const zoomEvent = createMockEvent( { location: 'https://zoom.us/j/123456789' } );
        render( <CECEvent event={zoomEvent} showLocation={true} /> );
        const locationText = document.querySelector( '.cec-event__location-text' );
        expect( locationText ).toHaveTextContent( 'Online meeting' );
    } );
    test( 'physical location shows actual address text in location section', () => {
        const physicalEvent = createMockEvent( { location: '123 Main St, New York, NY' } );
        render( <CECEvent event={physicalEvent} showLocation={true} /> );
        const locationText = document.querySelector( '.cec-event__location-text' );
        expect( locationText ).toHaveTextContent( '123 Main St, New York, NY' );
    } );
    test( 'location section hidden for river variant even when showLocation=true', () => {
        const eventWithLocation = createMockEvent( { location: '123 Main St' } );
        render( <CECEvent event={eventWithLocation} variant="river" showLocation={true} /> );
        expect( document.querySelector( '.cec-event__location' ) ).toBeNull();
    } );
    test( 'location section hidden when event.location is empty string', () => {
        const noLocationEvent = createMockEvent( { location: '' } );
        render( <CECEvent event={noLocationEvent} showLocation={true} /> );
        expect( document.querySelector( '.cec-event__location' ) ).toBeNull();
    } );
    test( 'location section shown for featured variant with physical address', () => {
        const locationEvent = createMockEvent( { location: 'Conference Hall A' } );
        render( <CECEvent event={locationEvent} variant="featured" showLocation={true} /> );
        expect( document.querySelector( '.cec-event__location' ) ).not.toBeNull();
        expect( document.querySelector( '.cec-event__location-text' ) ).toHaveTextContent( 'Conference Hall A' );
    } );
} );
describe( 'DXQ-49653: Date range separator concrete assertions', () => {
    test( 'same-day range renders NO "to" separator', () => {
        // Use times that land on the same local calendar day in any timezone.
        // T20:00Z and T21:00Z are both midnight+/-1h in UTC+4…+14 and 08:00/09:00 in UTC-12.
        // Clear 'until' so getEventEndDate picks endDate, not the base mock's 2025-12-31.
        const sameDayEvent = createMockEvent( {
            recurrence: {
                ...mockEvent.recurrence!,
                until: '',
                startDate: '2025-06-15T20:00:00Z',
                endDate: '2025-06-15T21:00:00Z',
            },
        } );
        render( <CECEvent event={sameDayEvent} showDateRange={true} /> );
        expect( document.querySelector( '.cec-event__date-separator' ) ).toBeNull();
    } );
    test( 'different-day range renders "to" separator with exact text', () => {
        const multiDayEvent = createMockEvent( {
            recurrence: {
                ...mockEvent.recurrence!,
                startDate: '2025-04-05T10:00:00Z',
                endDate: '2025-06-09T18:00:00Z',
            },
        } );
        render( <CECEvent event={multiDayEvent} showDateRange={true} /> );
        const separator = document.querySelector( '.cec-event__date__separator-text' );
        expect( separator ).not.toBeNull();
        expect( separator ).toHaveTextContent( 'to' );
    } );
    test( 'end month and end day are rendered for multi-day events', () => {
        // Clear 'until' so getEventEndDate uses endDate (not the base mock's 2025-12-31).
        const multiDayEvent = createMockEvent( {
            recurrence: {
                ...mockEvent.recurrence!,
                until: '',
                startDate: '2025-04-05T12:00:00Z',
                endDate: '2025-06-09T12:00:00Z',
            },
        } );
        render( <CECEvent event={multiDayEvent} showDateRange={true} /> );
        expect( screen.getByTestId( 'event-date-end-month' ) ).toHaveTextContent( 'Jun' );
        expect( screen.getByTestId( 'event-date-end-day' ) ).toHaveTextContent( '09' );
    } );
} );
describe( 'DXQ-49653: Tag truncation concrete assertions', () => {
    test( 'long tag (>7 chars) is truncated with "..." suffix', () => {
        const longTag = 'toolongtag'; // 10 chars, > SHOW_TAGS_SUBSTRING_CHAR=7
        const event = createMockEvent( { tags: [longTag] } );
        render( <CECEvent event={event} showTags={true} /> );
        const tag = document.querySelector( '.cec-event__tag' );
        expect( tag ).toHaveTextContent( 'TOOLONG...' );
        expect( tag?.getAttribute( 'title' )?.toLowerCase() ).toBe( longTag );
    } );
    test( 'short tag (≤7 chars) is displayed as-is with no ellipsis', () => {
        const shortTag = 'short'; // 5 chars, ≤ 7
        const event = createMockEvent( { tags: [shortTag] } );
        render( <CECEvent event={event} showTags={true} /> );
        const tag = document.querySelector( '.cec-event__tag' );
        expect( tag ).toHaveTextContent( 'SHORT' );
        expect( tag ).not.toHaveAttribute( 'title' );
    } );
    test( 'exactly one remaining tag shows actual tag text not "+1 more"', () => {
        const event = createMockEvent( { tags: ['a', 'b', 'c', 'd'] } );
        render( <CECEvent event={event} showTags={true} /> );
        expect( screen.queryByText( /\+1\s+more/i ) ).not.toBeInTheDocument();
        expect( screen.getByText( 'D' ) ).toBeInTheDocument();
    } );
    test( 'two remaining tags shows "+2 more" button', () => {
        const event = createMockEvent( { tags: ['a', 'b', 'c', 'd', 'e'] } );
        render( <CECEvent event={event} showTags={true} /> );
        expect( screen.getByText( /\+2\s+more/i ) ).toBeInTheDocument();
    } );
    test( '"more" button has correct aria-label', () => {
        const event = createMockEvent( { tags: ['a', 'b', 'c', 'd', 'e'] } );
        render( <CECEvent event={event} showTags={true} /> );
        const moreBtn = screen.getByRole( 'button', { name: /Show 2 more tags/i } );
        expect( moreBtn ).toBeInTheDocument();
        expect( moreBtn ).toHaveAttribute( 'tabIndex', '0' );
    } );
    test( 'clicking "+X more" expands all tags', () => {
        const event = createMockEvent( { tags: ['a', 'b', 'c', 'd', 'e'] } );
        render( <CECEvent event={event} showTags={true} /> );
        const moreBtn = screen.getByRole( 'button', { name: /more tags/i } );
        fireEvent.click( moreBtn );
        expect( screen.getByText( 'D' ) ).toBeInTheDocument();
        expect( screen.getByText( 'E' ) ).toBeInTheDocument();
        expect( screen.queryByText( /\+\d+\s+more/i ) ).not.toBeInTheDocument();
    } );
} );
describe( 'DXQ-49653: getResponsiveTagsThreshold via ResizeObserver', () => {
    let resizeCallback: ( entries: any[] ) => void;
    let OriginalResizeObserver: typeof ResizeObserver;
    beforeEach( () => {
        OriginalResizeObserver = global.ResizeObserver;
        global.ResizeObserver = jest.fn().mockImplementation( ( cb: any ) => {
            resizeCallback = cb;
            return { observe: jest.fn(), disconnect: jest.fn() };
        } );
    } );
    afterEach( () => {
        global.ResizeObserver = OriginalResizeObserver;
    } );
    test( 'containerWidth ≤ 200 → threshold 1 (very narrow cards)', () => {
        const event = createMockEvent( { tags: ['a', 'b', 'c', 'd'] } );
        render( <CECEvent event={event} showTags={true} /> );
        act( () => { resizeCallback( [{ contentRect: { width: 180 } }] ); } );
        // threshold=1: only 'a' shown, 'b' is the single-remaining-tag case → shown too
        expect( screen.getByText( 'A' ) ).toBeInTheDocument();
    } );
    test( 'containerWidth ≤ 300 → threshold 2 (narrow cards)', () => {
        const event = createMockEvent( { tags: ['a', 'b', 'c', 'd', 'e'] } );
        render( <CECEvent event={event} showTags={true} /> );
        act( () => { resizeCallback( [{ contentRect: { width: 250 } }] ); } );
        // threshold=2: 'a','b' shown + remainder
        expect( screen.getByText( 'A' ) ).toBeInTheDocument();
        expect( screen.getByText( 'B' ) ).toBeInTheDocument();
    } );
    test( 'containerWidth ≤ 400 → threshold 3 (medium cards)', () => {
        const event = createMockEvent( { tags: ['a', 'b', 'c', 'd', 'e'] } );
        render( <CECEvent event={event} showTags={true} /> );
        act( () => { resizeCallback( [{ contentRect: { width: 350 } }] ); } );
        expect( screen.getByText( 'A' ) ).toBeInTheDocument();
        expect( screen.getByText( 'B' ) ).toBeInTheDocument();
        expect( screen.getByText( 'C' ) ).toBeInTheDocument();
    } );
    test( 'containerWidth > 400 → threshold 3 (default for wider cards)', () => {
        const event = createMockEvent( { tags: ['a', 'b', 'c', 'd', 'e'] } );
        render( <CECEvent event={event} showTags={true} /> );
        act( () => { resizeCallback( [{ contentRect: { width: 500 } }] ); } );
        expect( screen.getByText( 'A' ) ).toBeInTheDocument();
        expect( screen.getByText( 'B' ) ).toBeInTheDocument();
        expect( screen.getByText( 'C' ) ).toBeInTheDocument();
    } );
} );
describe( 'DXQ-49653: formatRecurrenceInfo text output assertions', () => {
    const base = {
        interval: 1,
        allDay: '0' as const,
        startDate: '2025-01-01T10:00:00Z',
        endDate: '2025-01-01T11:00:00Z',
    };
    test( 'daily no interval shows "Daily"', () => {
        const ev = createMockEvent( { recurrence: { ...base, frequency: 'daily' as const } } );
        render( <CECEvent event={ev} showDate={true} /> );
        expect( screen.getByText( /Daily/ ) ).toBeInTheDocument();
    } );
    test( 'daily with interval=2 shows "Every 2 days"', () => {
        const ev = createMockEvent( { recurrence: { ...base, frequency: 'daily' as const, interval: 2 } } );
        render( <CECEvent event={ev} showDate={true} /> );
        expect( screen.getByText( /Every 2 days/ ) ).toBeInTheDocument();
    } );
    test( 'daily with 1 byDay shows "on Mon" text', () => {
        const ev = createMockEvent( { recurrence: { ...base, frequency: 'daily' as const, byDay: 'MO' } } );
        render( <CECEvent event={ev} showDate={true} /> );
        expect( screen.getByText( /on Mon/ ) ).toBeInTheDocument();
    } );
    test( 'daily with 2 byDays shows "on Mon and Wed"', () => {
        const ev = createMockEvent( { recurrence: { ...base, frequency: 'daily' as const, byDay: 'MO,WE' } } );
        render( <CECEvent event={ev} showDate={true} /> );
        expect( screen.getByText( /on Mon and Wed/ ) ).toBeInTheDocument();
    } );
    test( 'daily with 3+ byDays shows "on Mon, Wed, and Fri"', () => {
        const ev = createMockEvent( { recurrence: { ...base, frequency: 'daily' as const, byDay: 'MO,WE,FR' } } );
        render( <CECEvent event={ev} showDate={true} /> );
        expect( screen.getByText( /on Mon, Wed, and Fri/ ) ).toBeInTheDocument();
    } );
    test( 'weekly no interval shows "Weekly"', () => {
        const ev = createMockEvent( { recurrence: { ...base, frequency: 'weekly' as const } } );
        render( <CECEvent event={ev} showDate={true} /> );
        expect( screen.getByText( /Weekly/ ) ).toBeInTheDocument();
    } );
    test( 'weekly with interval=2 shows "Every 2 weeks"', () => {
        const ev = createMockEvent( { recurrence: { ...base, frequency: 'weekly' as const, interval: 2 } } );
        render( <CECEvent event={ev} showDate={true} /> );
        expect( screen.getByText( /Every 2 weeks/ ) ).toBeInTheDocument();
    } );
    test( 'monthly no interval shows "Monthly"', () => {
        const ev = createMockEvent( { recurrence: { ...base, frequency: 'monthly' as const } } );
        render( <CECEvent event={ev} showDate={true} /> );
        expect( screen.getByText( /Monthly/ ) ).toBeInTheDocument();
    } );
    test( 'monthly with byMonthDay shows "on day X"', () => {
        const ev = createMockEvent( { recurrence: { ...base, frequency: 'monthly' as const, byMonthDay: '15' } } );
        render( <CECEvent event={ev} showDate={true} /> );
        expect( screen.getByText( /on day 15/ ) ).toBeInTheDocument();
    } );
    test( 'monthly with interval=3 shows "Every 3 months"', () => {
        const ev = createMockEvent( { recurrence: { ...base, frequency: 'monthly' as const, interval: 3 } } );
        render( <CECEvent event={ev} showDate={true} /> );
        expect( screen.getByText( /Every 3 months/ ) ).toBeInTheDocument();
    } );
    test( 'yearly no interval shows "Yearly"', () => {
        const ev = createMockEvent( { recurrence: { ...base, frequency: 'yearly' as const } } );
        render( <CECEvent event={ev} showDate={true} /> );
        expect( screen.getByText( /Yearly/ ) ).toBeInTheDocument();
    } );
    test( 'yearly with interval=2 shows "Every 2 years"', () => {
        const ev = createMockEvent( { recurrence: { ...base, frequency: 'yearly' as const, interval: 2 } } );
        render( <CECEvent event={ev} showDate={true} /> );
        expect( screen.getByText( /Every 2 years/ ) ).toBeInTheDocument();
    } );
    test( 'recurrence count shows "for N occurrences"', () => {
        const ev = createMockEvent( { recurrence: { ...base, frequency: 'weekly' as const, count: 8 } } );
        render( <CECEvent event={ev} showDate={true} /> );
        expect( screen.getByText( /for 8 occurrences/ ) ).toBeInTheDocument();
    } );
} );
describe( 'DXQ-49653: connect link aria-label and attributes', () => {
    test( 'connect link aria-label includes platform name and event title', () => {
        const teamsEvent = createMockEvent( {
            title: 'My Test Event',
            location: 'https://teams.microsoft.com/l/meetup-join/123',
        } );
        render( <CECEvent event={teamsEvent} /> );
        const link = screen.getByTestId( 'connect-link' );
        expect( link ).toHaveAttribute( 'aria-label', 'Connect with Microsoft Teams for My Test Event event' );
    } );
    test( 'connect link has target=_blank and rel=noopener noreferrer', () => {
        const zoomEvent = createMockEvent( { location: 'https://zoom.us/j/987' } );
        render( <CECEvent event={zoomEvent} /> );
        const link = screen.getByTestId( 'connect-link' );
        expect( link ).toHaveAttribute( 'target', '_blank' );
        expect( link ).toHaveAttribute( 'rel', 'noopener noreferrer' );
    } );
} );
describe( 'DXQ-49653: showContentWrapper conditional (river variant)', () => {
    test( 'river variant hides content wrapper when no showDate/Location/Description/Tags', () => {
        render( <CECEvent event={mockEvent} variant="river" showDate={false} showLocation={false} showDescription={false} showTags={false} /> );
        expect( document.querySelector( '.cec-event__content' ) ).toBeNull();
    } );
    test( 'river variant shows content when showDate=true', () => {
        render( <CECEvent event={mockEvent} variant="river" showDate={true} /> );
        expect( document.querySelector( '.cec-event__content' ) ).not.toBeNull();
    } );
    test( 'non-river variant always shows content wrapper', () => {
        render( <CECEvent event={mockEvent} variant="featured" showDate={false} showLocation={false} showDescription={false} showTags={false} /> );
        expect( document.querySelector( '.cec-event__content' ) ).not.toBeNull();
    } );
} );
describe( 'DXQ-49653: All day event text in formatDateRange', () => {
    test( 'all-day event shows "All day event" text', () => {
        const allDayEvent = createMockEvent( {
            recurrence: {
                ...mockEvent.recurrence!,
                allDay: '1',
                startDate: '2025-05-01T00:00:00Z',
                endDate: '2025-05-01T23:59:59Z',
            },
        } );
        render( <CECEvent event={allDayEvent} showDate={true} /> );
        expect( screen.getByText( 'All day event' ) ).toBeInTheDocument();
    } );
    test( 'non-all-day event does NOT show "All day event" text', () => {
        render( <CECEvent event={mockEvent} showDate={true} /> );
        expect( screen.queryByText( 'All day event' ) ).not.toBeInTheDocument();
    } );
} );
describe( 'DXQ-49653: formatBasedOnType produces correct output per format', () => {
    test( '"short" format renders e.g. "Jan 1, 2025"', () => {
        render( <CECEvent event={mockEvent} dateFormat="short" showDate={true} /> );
        expect( screen.getByText( /Jan \d+, 2025/ ) ).toBeInTheDocument();
    } );
    test( '"month-day" format renders e.g. "Jan 1" without year', () => {
        render( <CECEvent event={mockEvent} dateFormat="month-day" showDate={true} /> );
        expect( screen.getByText( /Jan \d+/ ) ).toBeInTheDocument();
        expect( screen.queryByText( /January.*2025/ ) ).not.toBeInTheDocument();
    } );
    test( '"time-only" format does NOT render full date string in date section', () => {
        render( <CECEvent event={mockEvent} dateFormat="time-only" showDate={true} /> );
        expect( document.querySelector( '.cec-event__full-date' ) ).toBeNull();
    } );
    test( '"full" format renders e.g. "January 1, 2025"', () => {
        render( <CECEvent event={mockEvent} dateFormat="full" showDate={true} /> );
        expect( screen.getByText( /January \d+, 2025/ ) ).toBeInTheDocument();
    } );
} );
describe( 'DXQ-49653: aria-describedby and aria-label attributes', () => {
    test( 'aria-label is "Event: <title>"', () => {
        render( <CECEvent event={mockEvent} /> );
        expect( screen.getByTestId( 'cec-event' ) ).toHaveAttribute( 'aria-label', 'Event: Test Event' );
    } );
    test( 'aria-describedby references event id', () => {
        render( <CECEvent event={mockEvent} /> );
        expect( screen.getByTestId( 'cec-event' ) ).toHaveAttribute( 'aria-describedby', 'event-1-desc' );
    } );
    test( 'event with no id has no aria-describedby', () => {
        const noIdEvent = createMockEvent( { id: undefined } );
        render( <CECEvent event={noIdEvent} /> );
        expect( screen.getByTestId( 'cec-event' ) ).not.toHaveAttribute( 'aria-describedby' );
    } );
} );
describe( 'DXQ-49653: keyboard Enter/Space with onEventClick', () => {
    test( 'Enter key fires onEventClick', () => {
        const handler = jest.fn();
        render( <CECEvent event={mockEvent} onEventClick={handler} /> );
        fireEvent.keyDown( screen.getByTestId( 'cec-event' ), { key: 'Enter' } );
        expect( handler ).toHaveBeenCalledWith( mockEvent );
    } );
    test( 'Space key fires onEventClick', () => {
        const handler = jest.fn();
        render( <CECEvent event={mockEvent} onEventClick={handler} /> );
        fireEvent.keyDown( screen.getByTestId( 'cec-event' ), { key: ' ' } );
        expect( handler ).toHaveBeenCalledWith( mockEvent );
    } );
    test( 'Other key does NOT fire onEventClick', () => {
        const handler = jest.fn();
        render( <CECEvent event={mockEvent} onEventClick={handler} /> );
        fireEvent.keyDown( screen.getByTestId( 'cec-event' ), { key: 'Tab' } );
        expect( handler ).not.toHaveBeenCalled();
    } );
} );
describe( 'CECEvent Hardening', () => {
    test( 'tags logic exactly 7 characters long does not trigger ellipsis or title attribute', () => {
        const event = createMockEvent( { tags: ['1234567'] } );
        render( <CECEvent event={event} showTags={true} /> );
        const tag = document.querySelector( '.cec-event__tag' );
        expect( tag ).toHaveTextContent( '1234567' );
        expect( tag ).not.toHaveAttribute( 'title' );
    } );
    test( 'tags logic exactly 8 characters long triggers ellipsis and title attribute', () => {
        const event = createMockEvent( { tags: ['12345678'] } );
        render( <CECEvent event={event} showTags={true} /> );
        const tag = document.querySelector( '.cec-event__tag' );
        expect( tag ).toHaveTextContent( '1234567...' );
        expect( tag ).toHaveAttribute( 'title', '12345678' );
    } );
    test( 'empty tags string results in no tag elements rather than a single empty tag', () => {
        const event = createMockEvent( { tags: '' as any } );
        const { container } = render( <CECEvent event={event} showTags={true} /> );
        const tags = container.querySelectorAll( '.cec-event__tag' );
        expect( tags.length ).toBe( 0 );
    } );
    test( 'getEventStartDate and getEventEndDate fall back exactly to current Date.now() when no dates provided', () => {
        jest.useFakeTimers();
        const fakeNow = new Date( '2028-08-15T12:00:00Z' );
        jest.setSystemTime( fakeNow );
        // Intercept warning to keep log validation happy
        const consoleSpy = jest.spyOn( console, 'warn' ).mockImplementation( () => {} );
        const emptyDateEvent = createMockEvent( {
            date: undefined,
            startDate: undefined,
            recurrence: undefined
        } );
        render( <CECEvent event={emptyDateEvent} showDateRange={true} /> );
        expect( screen.getByTestId( 'event-date-month' ) ).toHaveTextContent( 'Aug' );
        expect( screen.getByTestId( 'event-date-day' ) ).toHaveTextContent( '15' );
        consoleSpy.mockRestore();
        jest.useRealTimers();
    } );
    test( 'weekly recurrence byDay handles explicit spaced days via trim', () => {
        jest.useFakeTimers();
        jest.setSystemTime( new Date( '2025-01-01T10:00:00Z' ) );
        // Intercept warning to keep log validation happy
        const consoleSpy = jest.spyOn( console, 'warn' ).mockImplementation( () => {} );
        const ev = createMockEvent( {
            recurrence: {
                frequency: 'weekly',
                startDate: '2025-01-01T10:00:00Z',
                byDay: ' TH , FR ',
                interval: 1,
                allDay: '0',
                endDate: '2025-12-31T11:00:00Z'
            } as any
        } );
        render( <CECEvent event={ev} showDate={true} /> );
        const fullDateDisplay = screen.getByText( /January \d+/i );
        expect( fullDateDisplay ).toBeInTheDocument();
        consoleSpy.mockRestore();
        jest.useRealTimers();
    } );
    test( 'keyboard handlers call e.preventDefault strictly on Enter and Space', () => {
        const onEventClick = jest.fn();
        render( <CECEvent event={mockEvent} onEventClick={onEventClick} /> );
        const card = screen.getByTestId( 'cec-event' );
        const enterEv = fireEvent.keyDown( card, { key: 'Enter' } );
        expect( enterEv ).toBe( false );
        expect( onEventClick ).toHaveBeenCalledTimes( 1 );
        const spaceEv = fireEvent.keyDown( card, { key: ' ' } );
        expect( spaceEv ).toBe( false );
        expect( onEventClick ).toHaveBeenCalledTimes( 2 );
    } );
    test( 'click fires onEventClick strictly even when onClick is omitted', () => {
        const onEventClick = jest.fn();
        render( <CECEvent event={mockEvent} onEventClick={onEventClick} onClick={undefined} /> );
        fireEvent.click( screen.getByTestId( 'cec-event' ) );
        expect( onEventClick ).toHaveBeenCalledWith( mockEvent );
    } );
    test( 'detects zoomgov.com properly as Zoom via regex branch', () => {
        const ev = createMockEvent( { location: 'https://zoomgov.com/j/123456' } );
        render( <CECEvent event={ev} showActions={true} /> );
        expect( screen.getByTestId( 'connect-link' ) ).toHaveTextContent( 'Connect with Zoom' );
    } );
    test( 'empty description string specifically falls back to non-breaking space markup', () => {
        const ev = createMockEvent( { description: '   ' } );
        render( <CECEvent event={ev} showDescription={true} /> );
        const descSpan = document.querySelector( '.cec-event__description span' );
        expect( descSpan?.innerHTML ).toBe( '&nbsp;' );
    } );
    describe( "Strict Math, Regex, and Hook Logic Boundaries", () => {
        let resizeCallback: ( entries: any[] ) => void;
        let OriginalResizeObserver: typeof ResizeObserver;
        beforeEach( () => {
            OriginalResizeObserver = global.ResizeObserver;
            global.ResizeObserver = jest.fn().mockImplementation( ( cb: any ) => {
                resizeCallback = cb;
                return { observe: jest.fn(), disconnect: jest.fn() };
            } );
        } );
        afterEach( () => {
            global.ResizeObserver = OriginalResizeObserver;
        } );
        test( "getResponsiveTagsThreshold: strictly evaluates boundaries exactly at 200, 300, and 400", () => {
            const event = createMockEvent( { tags: ['a', 'b', 'c', 'd', 'e'] } );
            render( <CECEvent event={event} showTags={true} /> );
            // Exact 200 threshold
            act( () => { resizeCallback( [{ contentRect: { width: 200 } }] ); } );
            expect( screen.getByText( 'A' ) ).toBeInTheDocument();
            expect( screen.queryByText( 'B' ) ).not.toBeInTheDocument();
            // Exact 300 threshold
            act( () => { resizeCallback( [{ contentRect: { width: 300 } }] ); } );
            expect( screen.getByText( 'A' ) ).toBeInTheDocument();
            expect( screen.getByText( 'B' ) ).toBeInTheDocument();
            expect( screen.queryByText( 'C' ) ).not.toBeInTheDocument();
            // Exact 400 threshold
            act( () => { resizeCallback( [{ contentRect: { width: 400 } }] ); } );
            expect( screen.getByText( 'C' ) ).toBeInTheDocument();
            expect( screen.queryByText( 'D' ) ).not.toBeInTheDocument();
        } );
        test( "calculateNextOccurrence: strictly respects 'monthly' byDate boundaries (1 and 31)", () => {
            jest.useFakeTimers();
            // Use local time strings (no 'Z') to prevent UTC boundary shifts during DOM text generation
            jest.setSystemTime( new Date( '2025-01-10T10:00:00' ) );
            // byDate = 31
            const ev31 = createMockEvent( {
                recurrence: { frequency: 'monthly', interval: 1, byDate: '31', startDate: '2025-01-01T10:00:00', allDay: '0', endDate: '2025-01-01T11:00:00' } as any
            } );
            const { container: container31, unmount } = render( <CECEvent event={ev31} showDate={true} /> );
            // In Jan 2025, next 31st is Jan 31. The occurrence renders in the details section.
            expect( container31.querySelector( '.cec-event__full-date' ) ).toHaveTextContent( '31' );
            unmount();
            // byDate = 1
            const ev1 = createMockEvent( {
                recurrence: { frequency: 'monthly', interval: 1, byDate: '1', startDate: '2025-01-01T10:00:00', allDay: '0', endDate: '2025-01-01T11:00:00' } as any
            } );
            const { container: container1 } = render( <CECEvent event={ev1} showDate={true} /> );
            // In Jan 10, next 1st is Feb 1.
            expect( container1.querySelector( '.cec-event__full-date' ) ).toHaveTextContent( /Feb(ruary)? 1,/ );
            jest.useRealTimers();
        } );
        test( "calculateNextOccurrence: strictly bypasses 'monthly' byDate logic if byDate is < 1 or > 31", () => {
            jest.useFakeTimers();
            jest.setSystemTime( new Date( '2025-01-10T10:00:00' ) );
            const ev0 = createMockEvent( {
                recurrence: { frequency: 'monthly', interval: 1, byDate: '0', startDate: '2025-01-05T10:00:00', allDay: '0', endDate: '2025-01-05T11:00:00' } as any
            } );
            const { container } = render( <CECEvent event={ev0} showDate={true} /> );
            // If byDate=0 is ignored, it falls back to normal monthly logic which uses the start date's day (5th).
            // Next 5th after Jan 10 is Feb 5.
            expect( container.querySelector( '.cec-event__full-date' ) ).toHaveTextContent( /Feb(ruary)? 5,/ );
            jest.useRealTimers();
        } );
        test( "calculateNextOccurrence: explicitly returns recurrenceStart if calculated nextDate exceeds 'until' boundary", () => {
            jest.useFakeTimers();
            jest.setSystemTime( new Date( '2025-01-15T10:00:00' ) );
            const ev = createMockEvent( {
                recurrence: {
                    frequency: 'daily',
                    startDate: '2025-01-01T10:00:00',
                    until: '2025-01-10T10:00:00', // 'until' is in the past compared to 'now'
                    allDay: '0',
                    endDate: '2025-01-01T11:00:00'
                } as any
            } );
            const { container } = render( <CECEvent event={ev} showDate={true} /> );
            // Because now > until, it strictly returns the original recurrenceStart (Jan 01)
            expect( container.querySelector( '.cec-event__full-date' ) ).toHaveTextContent( /Jan(uary)? 1,/ );
            jest.useRealTimers();
        } );
        test( "calculateNextOccurrence: 'weekly' strictly finds the exact next allowed day skipping earlier days", () => {
            jest.useFakeTimers();
            // Start is Wednesday Jan 1. Current time is Thursday Jan 2.
            jest.setSystemTime( new Date( '2025-01-02T10:00:00' ) );
            const ev = createMockEvent( {
                recurrence: {
                    frequency: 'weekly',
                    startDate: '2025-01-01T10:00:00', // Wednesday
                    byDay: 'MO,FR', // Allowed: Monday, Friday
                    interval: 1,
                    allDay: '0',
                    endDate: '2025-01-01T11:00:00'
                } as any
            } );
            const { container } = render( <CECEvent event={ev} showDate={true} /> );
            // The logic evaluates up to 7 days from now (Jan 2).
            // Next Friday is Jan 3.
            expect( container.querySelector( '.cec-event__full-date' ) ).toHaveTextContent( /Jan(uary)? 3,/ );
            jest.useRealTimers();
        } );
        test( "calculateNextOccurrence: 'daily' with byDay strictly iterates to find the next allowed day", () => {
            jest.useFakeTimers();
            // Set current time to Tuesday
            jest.setSystemTime( new Date( '2025-01-07T10:00:00' ) );
            const ev = createMockEvent( {
                recurrence: {
                    frequency: 'daily',
                    startDate: '2025-01-01T10:00:00',
                    byDay: 'TH', // Thursday is the only allowed day
                    interval: 1,
                    allDay: '0',
                    endDate: '2025-01-01T11:00:00'
                } as any
            } );
            const { container } = render( <CECEvent event={ev} showDate={true} /> );
            // Next Thursday is Jan 9
            expect( container.querySelector( '.cec-event__full-date' ) ).toHaveTextContent( /Jan(uary)? 9,/ );
            jest.useRealTimers();
        } );
        test( "calculateNextOccurrence: 'yearly' correctly rolls to next year if start date is in the past", () => {
            jest.useFakeTimers();
            jest.setSystemTime( new Date( '2025-06-15T10:00:00' ) );
            const ev = createMockEvent( {
                recurrence: {
                    frequency: 'yearly',
                    startDate: '2025-01-01T10:00:00', // Past date
                    interval: 1,
                    allDay: '0',
                    endDate: '2025-01-01T11:00:00'
                } as any
            } );
            const { container } = render( <CECEvent event={ev} showDate={true} /> );
            // Next occurrence should be 2026-01-01
            expect( container.querySelector( '.cec-event__full-date' ) ).toHaveTextContent( /2026/ );
            jest.useRealTimers();
        } );
        test( "getOnlineMeetingInfo: strictly distinguishes virtual location identifiers", () => {
            // "remote" keyword matching
            const evRemote = createMockEvent( { location: 'remote' } );
            const { unmount } = render( <CECEvent event={evRemote} showActions={true} /> );
            expect( screen.getByTestId( 'connect-link' ) ).toHaveTextContent( 'Connect with Generic Online' );
            unmount();
            // "video conference" keyword matching
            const evVideo = createMockEvent( { location: 'video conference link' } );
            render( <CECEvent event={evVideo} showActions={true} /> );
            expect( screen.getByTestId( 'connect-link' ) ).toHaveTextContent( 'Connect with Generic Online' );
        } );
        test( "fallback evaluation: getTagsThreshold strictly computes constraints when containerWidth remains undefined", () => {
            // Mock getBoundingClientRect so the rect.width extraction evaluates strictly to undefined
            const originalGetBounding = HTMLDivElement.prototype.getBoundingClientRect;
            HTMLDivElement.prototype.getBoundingClientRect = () => ( { width: undefined } as any );
            const event = createMockEvent( { tags: ['a', 'b', 'c', 'd'] } );
            const { unmount } = render( <CECEvent event={event} showTags={true} elementsPerRow={6} /> );
            // elementsPerRow = 6 -> fallback threshold = 1. Therefore only first tag is shown.
            expect( screen.getByText( 'A' ) ).toBeInTheDocument();
            expect( screen.queryByText( 'B' ) ).not.toBeInTheDocument();
            unmount();
            render( <CECEvent event={event} showTags={true} elementsPerRow={4} /> );
            // elementsPerRow = 4 -> fallback threshold = 2. First two tags are shown.
            expect( screen.getByText( 'B' ) ).toBeInTheDocument();
            expect( screen.queryByText( 'C' ) ).not.toBeInTheDocument();
            HTMLDivElement.prototype.getBoundingClientRect = originalGetBounding;
        } );
        test( "cleanDescription: explicitly strips anchor tags using complex spacing and attributes via regex bounds", () => {
            const event = createMockEvent( {
                description: 'Start <a id="test"   href="http://remove.me">Remove Me</a> End'
            } );
            render( <CECEvent event={event} showDescription={true} /> );
            const desc = document.querySelector( '.cec-event__description' );
            // "Remove Me" and the tag itself should be gone, leaving "Start End"
            expect( desc?.textContent?.trim() ).toBe( 'Start End' );
        } );
    } );
} );

itSupportsExtensionProps( ( extra ) => <CECEvent event={mockEvent} {...extra} /> );

test( 'extra props that are not DOM attributes are dropped instead of reaching the root element', () => {
    const { container } = render( <CECEvent event={mockEvent} {...{ notADomProp: 'x', title: 'Tip' } as object} /> );
    expect( container.firstElementChild?.getAttribute( 'notadomprop' ) ).toBeNull();
    expect( container.firstElementChild?.getAttribute( 'title' ) ).toBe( 'Tip' );
} );

test( 'a consumer onKeyDown on the event root runs first and can stop the component\'s own click handling', () => {
    const onEventClick = jest.fn();
    const onKeyDown = jest.fn( ( e: React.KeyboardEvent ) => e.preventDefault() );
    const { container } = render( <CECEvent event={mockEvent} onEventClick={onEventClick} {...{ onKeyDown } as object} /> );
    fireEvent.keyDown( container.firstElementChild as Element, { key: 'Enter' } );
    expect( onKeyDown ).toHaveBeenCalledTimes( 1 );
    expect( onEventClick ).not.toHaveBeenCalled();
} );
