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

import {
    DayMap,
    getDayMap,
    dayCodeToNumber,
    parseByDay,
    calculateNextOccurrence,
    isDateInEventRange,
    hasDateRangeOverlap,
    hasOccurrenceOnAllowedDays,
    hasOccurrenceInMonth,
} from './CECEvent.utils';
describe( 'CECEvent.utils', () => {
    describe( 'dayCodeToNumber', () => {
        test( 'maps day codes to correct JS day numbers', () => {
            expect( dayCodeToNumber['SU'] ).toBe( 0 );
            expect( dayCodeToNumber['MO'] ).toBe( 1 );
            expect( dayCodeToNumber['TU'] ).toBe( 2 );
            expect( dayCodeToNumber['WE'] ).toBe( 3 );
            expect( dayCodeToNumber['TH'] ).toBe( 4 );
            expect( dayCodeToNumber['FR'] ).toBe( 5 );
            expect( dayCodeToNumber['SA'] ).toBe( 6 );
        } );
        test( 'returns undefined for invalid day codes', () => {
            expect( dayCodeToNumber['XX'] ).toBeUndefined();
            expect( dayCodeToNumber[''] ).toBeUndefined();
        } );
    } );
    describe( 'DayMap', () => {
        test( 'contains all weekday codes', () => {
            expect( Object.keys( DayMap ) ).toEqual( ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'] );
        } );
        test( 'values are localized weekday names', () => {
            // Values should be strings (localized names)
            Object.values( DayMap ).forEach( value => {
                expect( typeof value ).toBe( 'string' );
                expect( value.length ).toBeGreaterThan( 0 );
            } );
        } );
    } );
    describe( 'getDayMap', () => {
        test( 'returns object with all weekday codes', () => {
            const dayMap = getDayMap();
            expect( Object.keys( dayMap ) ).toEqual( ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'] );
        } );
        test( 'returns same cached instance on subsequent calls', () => {
            const first = getDayMap();
            const second = getDayMap();
            expect( first ).toBe( second );
        } );
        test( 'values are localized weekday names', () => {
            const dayMap = getDayMap();
            Object.values( dayMap ).forEach( value => {
                expect( typeof value ).toBe( 'string' );
                expect( value.length ).toBeGreaterThan( 0 );
            } );
        } );
    } );
    describe( 'parseByDay', () => {
        test( 'parses single day code', () => {
            expect( parseByDay( 'MO' ) ).toEqual( [1] );
            expect( parseByDay( 'SU' ) ).toEqual( [0] );
            expect( parseByDay( 'FR' ) ).toEqual( [5] );
        } );
        test( 'parses multiple day codes', () => {
            expect( parseByDay( 'MO,WE,FR' ) ).toEqual( [1, 3, 5] );
            expect( parseByDay( 'TU,TH' ) ).toEqual( [2, 4] );
            expect( parseByDay( 'SA,SU' ) ).toEqual( [6, 0] );
        } );
        test( 'handles whitespace in day codes', () => {
            expect( parseByDay( 'MO, WE, FR' ) ).toEqual( [1, 3, 5] );
            expect( parseByDay( ' TU , TH ' ) ).toEqual( [2, 4] );
        } );
        test( 'filters out invalid day codes', () => {
            expect( parseByDay( 'MO,XX,FR' ) ).toEqual( [1, 5] );
            expect( parseByDay( 'INVALID' ) ).toEqual( [] );
        } );
        test( 'handles empty string', () => {
            expect( parseByDay( '' ) ).toEqual( [] );
        } );
    } );
    describe( 'isDateInEventRange', () => {
        const eventStart = new Date( '2024-01-15' );
        const eventEnd = new Date( '2024-06-30' );
        test( 'returns true for date within range', () => {
            expect( isDateInEventRange( new Date( '2024-03-15' ), eventStart, eventEnd ) ).toBe( true );
            expect( isDateInEventRange( new Date( '2024-01-15' ), eventStart, eventEnd ) ).toBe( true );
            expect( isDateInEventRange( new Date( '2024-06-30' ), eventStart, eventEnd ) ).toBe( true );
        } );
        test( 'returns false for date before range', () => {
            expect( isDateInEventRange( new Date( '2024-01-14' ), eventStart, eventEnd ) ).toBe( false );
            expect( isDateInEventRange( new Date( '2023-12-31' ), eventStart, eventEnd ) ).toBe( false );
        } );
        test( 'returns false for date after range', () => {
            expect( isDateInEventRange( new Date( '2024-07-01' ), eventStart, eventEnd ) ).toBe( false );
            expect( isDateInEventRange( new Date( '2025-01-01' ), eventStart, eventEnd ) ).toBe( false );
        } );
        test( 'handles null eventEnd (no end date)', () => {
            expect( isDateInEventRange( new Date( '2024-03-15' ), eventStart, null ) ).toBe( true );
            expect( isDateInEventRange( new Date( '2030-12-31' ), eventStart, null ) ).toBe( true );
            expect( isDateInEventRange( new Date( '2024-01-14' ), eventStart, null ) ).toBe( false );
        } );
    } );
    describe( 'hasDateRangeOverlap', () => {
        test( 'returns true for overlapping ranges', () => {
            const rangeStart = new Date( '2024-01-15' );
            const rangeEnd = new Date( '2024-06-30' );
            const periodStart = new Date( '2024-03-01' );
            const periodEnd = new Date( '2024-03-31' );
            expect( hasDateRangeOverlap( rangeStart, rangeEnd, periodStart, periodEnd ) ).toBe( true );
        } );
        test( 'returns true when range contains period', () => {
            const rangeStart = new Date( '2024-01-01' );
            const rangeEnd = new Date( '2024-12-31' );
            const periodStart = new Date( '2024-03-01' );
            const periodEnd = new Date( '2024-03-31' );
            expect( hasDateRangeOverlap( rangeStart, rangeEnd, periodStart, periodEnd ) ).toBe( true );
        } );
        test( 'returns true when period contains range', () => {
            const rangeStart = new Date( '2024-03-10' );
            const rangeEnd = new Date( '2024-03-20' );
            const periodStart = new Date( '2024-03-01' );
            const periodEnd = new Date( '2024-03-31' );
            expect( hasDateRangeOverlap( rangeStart, rangeEnd, periodStart, periodEnd ) ).toBe( true );
        } );
        test( 'returns false for non-overlapping ranges', () => {
            const rangeStart = new Date( '2024-01-01' );
            const rangeEnd = new Date( '2024-02-28' );
            const periodStart = new Date( '2024-04-01' );
            const periodEnd = new Date( '2024-04-30' );
            expect( hasDateRangeOverlap( rangeStart, rangeEnd, periodStart, periodEnd ) ).toBe( false );
        } );
        test( 'handles null rangeEnd', () => {
            const rangeStart = new Date( '2024-03-15' );
            const periodStart = new Date( '2024-03-01' );
            const periodEnd = new Date( '2024-03-31' );
            expect( hasDateRangeOverlap( rangeStart, null, periodStart, periodEnd ) ).toBe( true );
        } );
        test( 'returns false when single-day range is before period', () => {
            const rangeStart = new Date( '2024-02-15' );
            const periodStart = new Date( '2024-03-01' );
            const periodEnd = new Date( '2024-03-31' );
            expect( hasDateRangeOverlap( rangeStart, null, periodStart, periodEnd ) ).toBe( false );
        } );
    } );
    describe( 'hasOccurrenceOnAllowedDays', () => {
        const eventStart = new Date( '2024-01-01' );
        const eventEnd = new Date( '2024-12-31' );
        test( 'returns true when allowed day exists in month', () => {
            const monthStart = new Date( '2024-03-01' );
            const monthEnd = new Date( '2024-03-31' );
            // Monday = 1
            expect( hasOccurrenceOnAllowedDays( [1], monthStart, monthEnd, eventStart, eventEnd ) ).toBe( true );
        } );
        test( 'returns true for multiple allowed days', () => {
            const monthStart = new Date( '2024-03-01' );
            const monthEnd = new Date( '2024-03-31' );
            // Monday, Wednesday, Friday
            expect( hasOccurrenceOnAllowedDays( [1, 3, 5], monthStart, monthEnd, eventStart, eventEnd ) ).toBe( true );
        } );
        test( 'returns false for empty allowed days', () => {
            const monthStart = new Date( '2024-03-01' );
            const monthEnd = new Date( '2024-03-31' );
            expect( hasOccurrenceOnAllowedDays( [], monthStart, monthEnd, eventStart, eventEnd ) ).toBe( false );
        } );
        test( 'returns false when event has not started', () => {
            const monthStart = new Date( '2023-03-01' );
            const monthEnd = new Date( '2023-03-31' );
            expect( hasOccurrenceOnAllowedDays( [1], monthStart, monthEnd, eventStart, eventEnd ) ).toBe( false );
        } );
        test( 'returns false when event has ended', () => {
            const monthStart = new Date( '2025-03-01' );
            const monthEnd = new Date( '2025-03-31' );
            expect( hasOccurrenceOnAllowedDays( [1], monthStart, monthEnd, eventStart, eventEnd ) ).toBe( false );
        } );
    } );
    describe( 'hasOccurrenceInMonth', () => {
        describe( 'single events (no frequency)', () => {
            test( 'returns true when event falls within month', () => {
                const eventStart = new Date( '2024-03-15' );
                const monthStart = new Date( '2024-03-01' );
                const monthEnd = new Date( '2024-03-31' );
                expect( hasOccurrenceInMonth( eventStart, null, '', undefined, undefined, monthStart, monthEnd ) ).toBe( true );
            } );
            test( 'returns false when event is outside month', () => {
                const eventStart = new Date( '2024-01-15' );
                const monthStart = new Date( '2024-03-01' );
                const monthEnd = new Date( '2024-03-31' );
                expect( hasOccurrenceInMonth( eventStart, null, '', undefined, undefined, monthStart, monthEnd ) ).toBe( false );
            } );
        } );
        describe( 'daily frequency', () => {
            test( 'returns true when event range overlaps with month', () => {
                const eventStart = new Date( '2024-01-01' );
                const eventEnd = new Date( '2024-06-30' );
                const monthStart = new Date( '2024-03-01' );
                const monthEnd = new Date( '2024-03-31' );
                expect( hasOccurrenceInMonth( eventStart, eventEnd, 'daily', undefined, undefined, monthStart, monthEnd ) ).toBe( true );
            } );
            test( 'returns false when event ends before month', () => {
                const eventStart = new Date( '2024-01-01' );
                const eventEnd = new Date( '2024-02-28' );
                const monthStart = new Date( '2024-03-01' );
                const monthEnd = new Date( '2024-03-31' );
                expect( hasOccurrenceInMonth( eventStart, eventEnd, 'daily', undefined, undefined, monthStart, monthEnd ) ).toBe( false );
            } );
            test( 'with byDay returns true for matching weekdays', () => {
                const eventStart = new Date( '2024-01-01' );
                const eventEnd = new Date( '2024-12-31' );
                const monthStart = new Date( '2024-03-01' );
                const monthEnd = new Date( '2024-03-31' );
                expect( hasOccurrenceInMonth( eventStart, eventEnd, 'daily', 'MO,WE,FR', undefined, monthStart, monthEnd ) ).toBe( true );
            } );
        } );
        describe( 'weekly frequency', () => {
            test( 'returns true when weekday falls in month', () => {
                // Event starts on Monday Jan 1, 2024
                const eventStart = new Date( '2024-01-01' );
                const eventEnd = new Date( '2024-12-31' );
                const monthStart = new Date( '2024-03-01' );
                const monthEnd = new Date( '2024-03-31' );
                expect( hasOccurrenceInMonth( eventStart, eventEnd, 'weekly', undefined, undefined, monthStart, monthEnd ) ).toBe( true );
            } );
            test( 'with byDay returns true for specified weekdays', () => {
                const eventStart = new Date( '2024-01-01' );
                const eventEnd = new Date( '2024-12-31' );
                const monthStart = new Date( '2024-03-01' );
                const monthEnd = new Date( '2024-03-31' );
                expect( hasOccurrenceInMonth( eventStart, eventEnd, 'weekly', 'TU,TH', undefined, monthStart, monthEnd ) ).toBe( true );
            } );
            test( 'returns false when event has ended before month', () => {
                const eventStart = new Date( '2024-01-01' );
                const eventEnd = new Date( '2024-02-15' );
                const monthStart = new Date( '2024-03-01' );
                const monthEnd = new Date( '2024-03-31' );
                expect( hasOccurrenceInMonth( eventStart, eventEnd, 'weekly', undefined, undefined, monthStart, monthEnd ) ).toBe( false );
            } );
        } );
        describe( 'monthly frequency', () => {
            test( 'with byDate returns true when day exists in month', () => {
                const eventStart = new Date( '2024-01-15' );
                const eventEnd = new Date( '2024-12-31' );
                const monthStart = new Date( '2024-03-01' );
                const monthEnd = new Date( '2024-03-31' );
                expect( hasOccurrenceInMonth( eventStart, eventEnd, 'monthly', undefined, 15, monthStart, monthEnd ) ).toBe( true );
            } );
            test( 'with byDate returns false when day does not exist in month', () => {
                const eventStart = new Date( '2024-01-31' );
                const eventEnd = new Date( '2024-12-31' );
                // February doesn't have 31 days
                const monthStart = new Date( '2024-02-01' );
                const monthEnd = new Date( '2024-02-29' );
                expect( hasOccurrenceInMonth( eventStart, eventEnd, 'monthly', undefined, 31, monthStart, monthEnd ) ).toBe( false );
            } );
            test( 'without byDate falls back to date range overlap', () => {
                const eventStart = new Date( '2024-01-15' );
                const eventEnd = new Date( '2024-06-30' );
                const monthStart = new Date( '2024-03-01' );
                const monthEnd = new Date( '2024-03-31' );
                expect( hasOccurrenceInMonth( eventStart, eventEnd, 'monthly', undefined, undefined, monthStart, monthEnd ) ).toBe( true );
            } );
            test( 'with invalid byDate returns false', () => {
                const eventStart = new Date( '2024-01-15' );
                const eventEnd = new Date( '2024-06-30' );
                const monthStart = new Date( '2024-03-01' );
                const monthEnd = new Date( '2024-03-31' );
                // byDate=0 is falsy, so falls back to date range overlap (true)
                expect( hasOccurrenceInMonth( eventStart, eventEnd, 'monthly', undefined, 0, monthStart, monthEnd ) ).toBe( true );
                // byDate=32 is truthy but invalid (>31), so hasMonthlyByDateOccurrence returns false
                expect( hasOccurrenceInMonth( eventStart, eventEnd, 'monthly', undefined, 32, monthStart, monthEnd ) ).toBe( false );
            } );
        } );
        describe( 'yearly frequency', () => {
            test( 'returns true when anniversary falls in month', () => {
                // Event starts March 15
                const eventStart = new Date( '2020-03-15' );
                const eventEnd = new Date( '2030-12-31' );
                const monthStart = new Date( '2024-03-01' );
                const monthEnd = new Date( '2024-03-31' );
                expect( hasOccurrenceInMonth( eventStart, eventEnd, 'yearly', undefined, undefined, monthStart, monthEnd ) ).toBe( true );
            } );
            test( 'returns false when anniversary is in different month', () => {
                // Event starts January 15
                const eventStart = new Date( '2020-01-15' );
                const eventEnd = new Date( '2030-12-31' );
                const monthStart = new Date( '2024-03-01' );
                const monthEnd = new Date( '2024-03-31' );
                expect( hasOccurrenceInMonth( eventStart, eventEnd, 'yearly', undefined, undefined, monthStart, monthEnd ) ).toBe( false );
            } );
            test( 'returns false when event has ended', () => {
                const eventStart = new Date( '2020-03-15' );
                const eventEnd = new Date( '2023-12-31' );
                const monthStart = new Date( '2024-03-01' );
                const monthEnd = new Date( '2024-03-31' );
                expect( hasOccurrenceInMonth( eventStart, eventEnd, 'yearly', undefined, undefined, monthStart, monthEnd ) ).toBe( false );
            } );
        } );
        describe( 'edge cases', () => {
            test( 'returns false when event starts after month', () => {
                const eventStart = new Date( '2024-06-01' );
                const monthStart = new Date( '2024-03-01' );
                const monthEnd = new Date( '2024-03-31' );
                expect( hasOccurrenceInMonth( eventStart, null, 'weekly', undefined, undefined, monthStart, monthEnd ) ).toBe( false );
            } );
            test( 'handles unknown frequency by falling back to date range overlap', () => {
                const eventStart = new Date( '2024-01-15' );
                const eventEnd = new Date( '2024-06-30' );
                const monthStart = new Date( '2024-03-01' );
                const monthEnd = new Date( '2024-03-31' );
                expect( hasOccurrenceInMonth( eventStart, eventEnd, 'unknown', undefined, undefined, monthStart, monthEnd ) ).toBe( true );
            } );
            test( 'handles case-insensitive frequency', () => {
                const eventStart = new Date( '2024-01-01' );
                const eventEnd = new Date( '2024-12-31' );
                const monthStart = new Date( '2024-03-01' );
                const monthEnd = new Date( '2024-03-31' );
                expect( hasOccurrenceInMonth( eventStart, eventEnd, 'DAILY', undefined, undefined, monthStart, monthEnd ) ).toBe( true );
                expect( hasOccurrenceInMonth( eventStart, eventEnd, 'Weekly', undefined, undefined, monthStart, monthEnd ) ).toBe( true );
                expect( hasOccurrenceInMonth( eventStart, eventEnd, 'MONTHLY', undefined, 15, monthStart, monthEnd ) ).toBe( true );
            } );
        } );
    } );
    describe( 'calculateNextOccurrence', () => {
        beforeEach( () => {
            jest.useFakeTimers();
        } );
        afterEach( () => {
            jest.useRealTimers();
        } );
        describe( 'recurrence ended', () => {
            test( 'returns recurrenceStart when until date has passed', () => {
                const recurrenceStart = new Date( '2024-01-15T10:00:00' );
                const now = new Date( '2024-06-15T10:00:00' );
                const until = new Date( '2024-03-15' );
                const result = calculateNextOccurrence( recurrenceStart, 'weekly', now, until );
                expect( result ).toEqual( recurrenceStart );
            } );
        } );
        describe( 'monthly with byDate', () => {
            test( 'returns next occurrence on specified day of month', () => {
                jest.setSystemTime( new Date( '2024-01-10T10:00:00' ) );
                const recurrenceStart = new Date( '2024-01-15T14:00:00' );
                const now = new Date( '2024-01-10T10:00:00' );
                const result = calculateNextOccurrence( recurrenceStart, 'monthly', now, null, 15 );
                expect( result.getDate() ).toBe( 15 );
                expect( result.getMonth() ).toBe( 0 ); // January
            } );
            test( 'moves to next month if this months occurrence has passed', () => {
                jest.setSystemTime( new Date( '2024-01-20T10:00:00' ) );
                const recurrenceStart = new Date( '2024-01-15T14:00:00' );
                const now = new Date( '2024-01-20T10:00:00' );
                const result = calculateNextOccurrence( recurrenceStart, 'monthly', now, null, 15 );
                expect( result.getDate() ).toBe( 15 );
                expect( result.getMonth() ).toBe( 1 ); // February
            } );
            test( 'handles months with fewer days', () => {
                jest.setSystemTime( new Date( '2024-01-20T10:00:00' ) );
                const recurrenceStart = new Date( '2024-01-31T14:00:00' );
                const now = new Date( '2024-02-01T10:00:00' );
                const result = calculateNextOccurrence( recurrenceStart, 'monthly', now, null, 31 );
                // Should find a month with 31 days
                expect( result.getDate() ).toBe( 31 );
                // Month could be March (2) or later depending on calculation
                expect( result.getMonth() ).toBeGreaterThanOrEqual( 2 );
            } );
            test( 'returns recurrenceStart if next occurrence exceeds until', () => {
                jest.setSystemTime( new Date( '2024-01-20T10:00:00' ) );
                const recurrenceStart = new Date( '2024-01-15T14:00:00' );
                const now = new Date( '2024-01-20T10:00:00' );
                const until = new Date( '2024-02-10' );
                const result = calculateNextOccurrence( recurrenceStart, 'monthly', now, until, 15 );
                expect( result ).toEqual( recurrenceStart );
            } );
        } );
        describe( 'weekly/daily with byDay', () => {
            test( 'finds next occurrence on allowed weekday', () => {
                // Tuesday Jan 2, 2024
                jest.setSystemTime( new Date( '2024-01-02T10:00:00' ) );
                const recurrenceStart = new Date( '2024-01-01T14:00:00' );
                const now = new Date( '2024-01-02T10:00:00' );
                const result = calculateNextOccurrence( recurrenceStart, 'weekly', now, null, undefined, 'WE,FR' );
                // Should find Wednesday (Jan 3) or Friday (Jan 5)
                expect( [3, 5] ).toContain( result.getDay() );
            } );
            test( 'returns recurrenceStart if no valid day found and until is set', () => {
                jest.setSystemTime( new Date( '2024-01-02T10:00:00' ) );
                const recurrenceStart = new Date( '2024-01-01T14:00:00' );
                const now = new Date( '2024-01-02T10:00:00' );
                const until = new Date( '2024-01-02' ); // Until is today
                const result = calculateNextOccurrence( recurrenceStart, 'weekly', now, until, undefined, 'FR' );
                expect( result ).toEqual( recurrenceStart );
            } );
        } );
        describe( 'future recurrence start', () => {
            test( 'returns recurrenceStart if it is in the future', () => {
                const recurrenceStart = new Date( '2024-06-15T14:00:00' );
                const now = new Date( '2024-01-15T10:00:00' );
                const result = calculateNextOccurrence( recurrenceStart, 'weekly', now );
                expect( result ).toEqual( recurrenceStart );
            } );
        } );
        describe( 'daily frequency', () => {
            test( 'calculates next daily occurrence', () => {
                const recurrenceStart = new Date( '2024-01-01T14:00:00' );
                const now = new Date( '2024-01-05T10:00:00' );
                const result = calculateNextOccurrence( recurrenceStart, 'daily', now );
                // Result should be after now
                expect( result.getTime() ).toBeGreaterThan( recurrenceStart.getTime() );
            } );
        } );
        describe( 'weekly frequency', () => {
            test( 'calculates next weekly occurrence on same day of week', () => {
                const recurrenceStart = new Date( '2024-01-01T14:00:00' ); // Monday
                const now = new Date( '2024-01-10T10:00:00' );
                const result = calculateNextOccurrence( recurrenceStart, 'weekly', now );
                // Should be on same day of week as recurrenceStart (Monday)
                expect( result.getDay() ).toBe( recurrenceStart.getDay() );
                expect( result.getTime() ).toBeGreaterThan( recurrenceStart.getTime() );
            } );
        } );
        describe( 'monthly frequency without byDate', () => {
            test( 'uses same day of month as start date', () => {
                const recurrenceStart = new Date( '2024-01-15T14:00:00' );
                const now = new Date( '2024-03-10T10:00:00' );
                const result = calculateNextOccurrence( recurrenceStart, 'monthly', now );
                expect( result.getDate() ).toBe( 15 );
                expect( result.getMonth() ).toBe( 2 ); // March
            } );
            test( 'moves to next month if this months occurrence has passed', () => {
                const recurrenceStart = new Date( '2024-01-15T14:00:00' );
                const now = new Date( '2024-03-20T10:00:00' );
                const result = calculateNextOccurrence( recurrenceStart, 'monthly', now );
                expect( result.getDate() ).toBe( 15 );
                expect( result.getMonth() ).toBe( 3 ); // April
            } );
        } );
        describe( 'yearly frequency', () => {
            test( 'calculates next yearly occurrence', () => {
                const recurrenceStart = new Date( '2020-03-15T14:00:00' );
                const now = new Date( '2024-01-10T10:00:00' );
                const result = calculateNextOccurrence( recurrenceStart, 'yearly', now );
                expect( result.getMonth() ).toBe( 2 ); // March
                expect( result.getDate() ).toBe( 15 );
                expect( result.getFullYear() ).toBe( 2024 );
            } );
            test( 'rolls to next year if this years occurrence has passed', () => {
                const recurrenceStart = new Date( '2020-03-15T14:00:00' );
                const now = new Date( '2024-06-10T10:00:00' );
                const result = calculateNextOccurrence( recurrenceStart, 'yearly', now );
                expect( result.getMonth() ).toBe( 2 ); // March
                expect( result.getDate() ).toBe( 15 );
                expect( result.getFullYear() ).toBe( 2025 );
            } );
        } );
        describe( 'until boundary', () => {
            test( 'returns recurrenceStart if calculated date exceeds until', () => {
                const recurrenceStart = new Date( '2024-01-01T14:00:00' );
                const now = new Date( '2024-03-10T10:00:00' );
                const until = new Date( '2024-03-05' );
                const result = calculateNextOccurrence( recurrenceStart, 'daily', now, until );
                expect( result ).toEqual( recurrenceStart );
            } );
        } );
    } );
} );
