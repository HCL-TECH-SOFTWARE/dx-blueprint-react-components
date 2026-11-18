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
    INVALID_DATE_TEXT,
    addDays,
    addMonths,
    dateFromParts,
    formatDate,
    isSameDay,
    isSameMonth,
    isValidDate,
    parseDate,
    parseDateWithFormat,
    parseISODate,
    startOfDay,
    startOfMonth,
    startOfWeek,
} from "./dateTime";

// All dates are built from local parts so the expectations hold in any time zone.
const local = ( y: number, m: number, d: number, h = 0, mi = 0, s = 0, ms = 0 ) => new Date( y, m - 1, d, h, mi, s, ms );

describe( "isValidDate", () => {
    it( "accepts real dates only", () => {
        expect( isValidDate( new Date() ) ).toBe( true );
        expect( isValidDate( new Date( NaN ) ) ).toBe( false );
        expect( isValidDate( "2026-11-17" ) ).toBe( false );
        expect( isValidDate( null ) ).toBe( false );
        expect( isValidDate( 0 ) ).toBe( false );
    } );
} );

describe( "parseISODate", () => {
    it( "reads a date-only value as LOCAL midnight, not UTC", () => {
        expect( parseISODate( "2026-11-17" )?.getTime() ).toBe( local( 2026, 11, 17 ).getTime() );
        expect( parseISODate( "20261117" )?.getTime() ).toBe( local( 2026, 11, 17 ).getTime() );
    } );

    it( "reads a date-time without an offset as local time", () => {
        expect( parseISODate( "2026-11-17T10:30" )?.getTime() ).toBe( local( 2026, 11, 17, 10, 30 ).getTime() );
        expect( parseISODate( "2026-11-17T10:30:45" )?.getTime() ).toBe( local( 2026, 11, 17, 10, 30, 45 ).getTime() );
        expect( parseISODate( "2026-11-17 10:30" )?.getTime() ).toBe( local( 2026, 11, 17, 10, 30 ).getTime() );
        expect( parseISODate( "2026-11-17T10" )?.getTime() ).toBe( local( 2026, 11, 17, 10 ).getTime() );
        expect( parseISODate( "20261117T103045" )?.getTime() ).toBe( local( 2026, 11, 17, 10, 30, 45 ).getTime() );
    } );

    it( "reads fractional seconds as milliseconds", () => {
        expect( parseISODate( "2026-11-17T10:30:45.123" )?.getMilliseconds() ).toBe( 123 );
        expect( parseISODate( "2026-11-17T10:30:45,5" )?.getMilliseconds() ).toBe( 500 );
        expect( parseISODate( "2026-11-17T10:30:45.123456" )?.getMilliseconds() ).toBe( 123 );
    } );

    it( "reads Z and numeric offsets as exact instants", () => {
        expect( parseISODate( "2026-11-17T10:30:45Z" )?.toISOString() ).toBe( "2026-11-17T10:30:45.000Z" );
        expect( parseISODate( "2026-11-17T10:30:45.250Z" )?.toISOString() ).toBe( "2026-11-17T10:30:45.250Z" );
        expect( parseISODate( "2026-11-17T10:30:00+05:30" )?.toISOString() ).toBe( "2026-11-17T05:00:00.000Z" );
        expect( parseISODate( "2026-11-17T10:30:00-0800" )?.toISOString() ).toBe( "2026-11-17T18:30:00.000Z" );
        expect( parseISODate( "2026-11-17T10:30:00+05" )?.toISOString() ).toBe( "2026-11-17T05:30:00.000Z" );
    } );

    it( "supports month-only, year-only and ordinal dates", () => {
        expect( parseISODate( "2026-11" )?.getTime() ).toBe( local( 2026, 11, 1 ).getTime() );
        expect( parseISODate( "2026" )?.getTime() ).toBe( local( 2026, 1, 1 ).getTime() );
        expect( parseISODate( "2026-321" )?.getTime() ).toBe( local( 2026, 11, 17 ).getTime() );
        expect( parseISODate( "2024-366" )?.getTime() ).toBe( local( 2024, 12, 31 ).getTime() );
    } );

    it( "rolls 24:00 over to the next day, only when nothing follows", () => {
        expect( parseISODate( "2026-12-31T24:00" )?.getTime() ).toBe( local( 2027, 1, 1 ).getTime() );
        expect( parseISODate( "2026-12-31T24:00:00.000Z" )?.toISOString() ).toBe( "2027-01-01T00:00:00.000Z" );
        expect( parseISODate( "2026-11-17T24:01" ) ).toBeNull();
    } );

    it( "keeps years 0-99 as written", () => {
        expect( parseISODate( "0099-03-05" )?.getFullYear() ).toBe( 99 );
        expect( parseISODate( "0001-01-01T00:00:00Z" )?.toISOString() ).toBe( "0001-01-01T00:00:00.000Z" );
    } );

    it( "returns null for dates that do not exist", () => {
        [
            "2026-02-29", "1900-02-29", "2026-02-30", "2026-13-01", "2026-00-10", "2026-11-00",
            "2026-366", "2026-000", "2026-11-17T25:00", "2026-11-17T10:60", "2026-11-17T10:30:60",
        ].forEach( value => expect( parseISODate( value ) ).toBeNull() );
        expect( parseISODate( "2024-02-29" )?.getDate() ).toBe( 29 );
        expect( parseISODate( "2000-02-29" )?.getDate() ).toBe( 29 );
    } );

    it( "returns null for anything that is not entirely ISO 8601 (no fallback to the engine parser)", () => {
        [
            "", " ", "garbage", "March 5, 2026", "2026/03/05", "03/05/2026", "2026-3-5", "2026-11-17T",
            "2026-11-17T10:30:45.", "2026-11-17T1030", "2026-11-17T10:30junk", "now",
            "2026-W46-3", "+002026-11-17", // week dates and expanded years are not supported
        ].forEach( value => expect( parseISODate( value ) ).toBeNull() );
    } );

    it( "returns null for non-string input", () => {
        expect( parseISODate( null ) ).toBeNull();
        expect( parseISODate( undefined ) ).toBeNull();
        expect( parseISODate( 5 as unknown as string ) ).toBeNull();
    } );

    it( "tolerates leading whitespace like moment does", () => {
        expect( parseISODate( "  2026-11-17" )?.getDate() ).toBe( 17 );
    } );
} );

describe( "parseDate", () => {
    it( "uses the ISO rules for ISO strings, including 'does not exist' being invalid", () => {
        expect( parseDate( "2026-11-17" )?.getTime() ).toBe( local( 2026, 11, 17 ).getTime() );
        expect( parseDate( "2026-11-17T10:30:00Z" )?.toISOString() ).toBe( "2026-11-17T10:30:00.000Z" );
        expect( parseDate( "2026-02-30" ) ).toBeNull(); // not rolled over to 2 March
        expect( parseDate( "2026-11-17T25:00" ) ).toBeNull();
    } );

    it( "falls back to the engine parser for other strings", () => {
        expect( parseDate( "March 5, 2026" )?.getTime() ).toBe( local( 2026, 3, 5 ).getTime() );
        expect( parseDate( "03/05/2026" )?.getTime() ).toBe( local( 2026, 3, 5 ).getTime() );
        expect( parseDate( "Thu, 05 Mar 2026 10:00:00 +0000" )?.toISOString() ).toBe( "2026-03-05T10:00:00.000Z" );
    } );

    it( "returns null for empty and unparseable input", () => {
        expect( parseDate( "" ) ).toBeNull();
        expect( parseDate( "garbage" ) ).toBeNull();
        expect( parseDate( null ) ).toBeNull();
        expect( parseDate( undefined ) ).toBeNull();
        expect( parseDate( {} as unknown as string ) ).toBeNull();
    } );

    it( "reads numbers as epoch milliseconds", () => {
        expect( parseDate( 0 )?.getTime() ).toBe( 0 );
        expect( parseDate( 1700000000000 )?.toISOString() ).toBe( "2023-11-14T22:13:20.000Z" );
        expect( parseDate( NaN ) ).toBeNull();
        expect( parseDate( Infinity ) ).toBeNull();
    } );

    it( "copies a Date instead of returning the same instance", () => {
        const original = new Date( 2026, 10, 17 );
        const copy = parseDate( original );
        expect( copy ).not.toBe( original );
        expect( copy?.getTime() ).toBe( original.getTime() );
        expect( parseDate( new Date( NaN ) ) ).toBeNull();
    } );
} );

describe( "parseDateWithFormat YYYY-MM-DD", () => {
    const parse = ( value: string | null | undefined ) => parseDateWithFormat( value, "YYYY-MM-DD" );

    it( "reads the date as local midnight", () => {
        expect( parse( "2026-11-17" )?.getTime() ).toBe( local( 2026, 11, 17 ).getTime() );
        expect( parse( "2024-02-29" )?.getTime() ).toBe( local( 2024, 2, 29 ).getTime() );
    } );

    it( "is lenient about separators, padding and trailing text (non-strict, like moment)", () => {
        expect( parse( "2026/11/17" )?.getTime() ).toBe( local( 2026, 11, 17 ).getTime() );
        expect( parse( "2026-1-5" )?.getTime() ).toBe( local( 2026, 1, 5 ).getTime() );
        expect( parse( "20261117" )?.getTime() ).toBe( local( 2026, 11, 17 ).getTime() );
        expect( parse( "2026-11-17T10:00" )?.getTime() ).toBe( local( 2026, 11, 17 ).getTime() );
        expect( parse( "2026-11-17 10:30:00" )?.getTime() ).toBe( local( 2026, 11, 17 ).getTime() );
    } );

    it( "defaults a missing month and day to the first, and expands a two-digit year", () => {
        expect( parse( "2026-11" )?.getTime() ).toBe( local( 2026, 11, 1 ).getTime() );
        expect( parse( "2026" )?.getTime() ).toBe( local( 2026, 1, 1 ).getTime() );
        expect( parse( "26-11-18" )?.getTime() ).toBe( local( 2026, 11, 18 ).getTime() );
        expect( parse( "99-1-1" )?.getTime() ).toBe( local( 1999, 1, 1 ).getTime() );
    } );

    it( "returns null for overflowing values and for input without numbers", () => {
        [null, undefined, "", "abc", "undefined", "2026-13-01", "2026-02-30", "11-18-2026", "0000-00-00"]
            .forEach( value => expect( parse( value ) ).toBeNull() );
    } );
} );

describe( "parseDateWithFormat HH:mm", () => {
    const parse = ( value: string | null | undefined ) => parseDateWithFormat( value, "HH:mm" );

    it( "reads the time on today's date", () => {
        const date = parse( "09:30" ) as Date;
        const today = new Date();
        expect( [date.getHours(), date.getMinutes(), date.getSeconds()] ).toEqual( [9, 30, 0] );
        expect( date.getFullYear() ).toBe( today.getFullYear() );
        expect( date.getMonth() ).toBe( today.getMonth() );
    } );

    it( "is lenient like moment", () => {
        expect( parse( "9:5" )?.getHours() ).toBe( 9 );
        expect( parse( "9:5" )?.getMinutes() ).toBe( 5 );
        expect( parse( "09:30:45" )?.getMinutes() ).toBe( 30 );
        expect( parse( "12" )?.getHours() ).toBe( 12 );
        expect( parse( "12" )?.getMinutes() ).toBe( 0 );
        expect( parse( "10:30 PM" )?.getHours() ).toBe( 10 );
    } );

    it( "accepts 24:00 only when the minutes are zero, and rejects overflow and non-numbers", () => {
        expect( parse( "24:00" )?.getHours() ).toBe( 0 );
        [null, undefined, "", "abc", "undefined", "24:01", "25:00", "7:60"].forEach( value => expect( parse( value ) ).toBeNull() );
    } );
} );

describe( "dateFromParts", () => {
    const weekday = ( y: string, m: string, d: string ) => formatDate( dateFromParts( y, m, d ), "ddd YYYY-MM-DD" );

    it( "builds local dates from numeric parts, with two-digit year pivot at 68", () => {
        expect( weekday( "23", "10", "30" ) ).toBe( "Mon 2023-10-30" );
        expect( weekday( "2023", "10", "30" ) ).toBe( "Mon 2023-10-30" );
        expect( weekday( "68", "01", "01" ) ).toBe( "Sun 2068-01-01" );
        expect( weekday( "69", "01", "01" ) ).toBe( "Wed 1969-01-01" );
        expect( weekday( "99", "01", "01" ) ).toBe( "Fri 1999-01-01" );
    } );

    it( "accepts English month names, full or abbreviated, in any case", () => {
        expect( weekday( "23", "October", "30" ) ).toBe( "Mon 2023-10-30" );
        expect( weekday( "23", "Oct", "30" ) ).toBe( "Mon 2023-10-30" );
        expect( weekday( "23", "oct", "30" ) ).toBe( "Mon 2023-10-30" );
        expect( weekday( "23", "March", "5" ) ).toBe( "Sun 2023-03-05" );
    } );

    it( "returns null when a part is missing or the date does not exist", () => {
        expect( dateFromParts( "", "", "" ) ).toBeNull();
        expect( dateFromParts( "Invalid", "Invalid", "Invalid" ) ).toBeNull();
        expect( dateFromParts( "23", "13", "01" ) ).toBeNull();
        expect( dateFromParts( "23", "Mo", "01" ) ).toBeNull();
        expect( dateFromParts( "23", "Foo", "01" ) ).toBeNull();
        expect( dateFromParts( "26", "02", "30" ) ).toBeNull();
        expect( dateFromParts( "23", "10", "" ) ).toBeNull();
        expect( dateFromParts( "x", "10", "10" ) ).toBeNull();
    } );
} );

describe( "formatDate", () => {
    const d = local( 2026, 3, 5, 14, 7, 9 ); // Thursday 5 March 2026, 14:07:09

    it.each( [
        ["YYYY", "2026"], ["YY", "26"],
        ["MMMM", "March"], ["MMM", "Mar"], ["MM", "03"], ["M", "3"],
        ["Do", "5th"], ["DD", "05"], ["D", "5"],
        ["dddd", "Thursday"], ["ddd", "Thu"],
        ["HH", "14"], ["H", "14"], ["hh", "02"], ["h", "2"],
        ["mm", "07"], ["m", "7"], ["ss", "09"], ["s", "9"],
        ["A", "PM"], ["a", "pm"],
    ] )( "formats the %s token", ( pattern, expected ) => {
        expect( formatDate( d, pattern ) ).toBe( expected );
    } );

    it.each( [
        ["MMMM Do YYYY HH:mm", "March 5th 2026 14:07"],
        ["MMMM YYYY", "March 2026"],
        ["MMMM DD, YYYY", "March 05, 2026"],
        ["YYYY-MM-DD", "2026-03-05"],
        ["hh:mm A", "02:07 PM"],
        ["h:mma", "2:07pm"],
        ["HH:mm", "14:07"],
        ["[Today is] dddd [at] h:mm A", "Today is Thursday at 2:07 PM"],
        ["D/M/YY, [h]", "5/3/26, h"],
    ] )( "formats the composite pattern %s", ( pattern, expected ) => {
        expect( formatDate( d, pattern ) ).toBe( expected );
    } );

    it( "uses ordinal suffixes st, nd, rd, th including the teens", () => {
        const ordinals = [1, 2, 3, 4, 11, 12, 13, 21, 22, 23, 30, 31].map( day => formatDate( local( 2026, 1, day ), "Do" ) );
        expect( ordinals ).toEqual( ["1st", "2nd", "3rd", "4th", "11th", "12th", "13th", "21st", "22nd", "23rd", "30th", "31st"] );
    } );

    it( "handles midnight and noon on the 12-hour clock", () => {
        expect( formatDate( local( 2026, 1, 1, 0, 5 ), "hh:mm A" ) ).toBe( "12:05 AM" );
        expect( formatDate( local( 2026, 1, 1, 12, 5 ), "h:mma" ) ).toBe( "12:05pm" );
        expect( formatDate( local( 2026, 1, 1, 23, 59 ), "h:mm A" ) ).toBe( "11:59 PM" );
        expect( formatDate( local( 2026, 1, 1, 0, 0 ), "HH:mm" ) ).toBe( "00:00" );
    } );

    it( "formats every month and weekday name in English", () => {
        const months = Array.from( { length: 12 }, ( _, i ) => formatDate( local( 2026, i + 1, 1 ), "MMMM" ) );
        const shortMonths = Array.from( { length: 12 }, ( _, i ) => formatDate( local( 2026, i + 1, 1 ), "MMM" ) );
        expect( months ).toEqual( ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] );
        expect( shortMonths ).toEqual( ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] );
        const days = [1, 2, 3, 4, 5, 6, 7].map( day => formatDate( local( 2026, 11, day ), "dddd" ) ); // 1 Nov 2026 is a Sunday
        const shortDays = [1, 2, 3, 4, 5, 6, 7].map( day => formatDate( local( 2026, 11, day ), "ddd" ) );
        expect( days ).toEqual( ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] );
        expect( shortDays ).toEqual( ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] );
    } );

    it( "pads small and truncates large years like moment", () => {
        const early = new Date( 2000, 0, 1 );
        early.setFullYear( 50 );
        expect( formatDate( early, "YYYY YY" ) ).toBe( "0050 50" );
        const late = new Date( 2000, 0, 1 );
        late.setFullYear( 12345 );
        expect( formatDate( late, "YYYY" ) ).toBe( "12345" );
    } );

    it( "copies unknown characters and leaves unsupported letters alone", () => {
        expect( formatDate( d, "YYYY.MM.DD / HH-mm" ) ).toBe( "2026.03.05 / 14-07" );
        expect( formatDate( d, "" ) ).toBe( "" );
    } );

    it( "returns 'Invalid date' for a missing or invalid date", () => {
        expect( INVALID_DATE_TEXT ).toBe( "Invalid date" );
        expect( formatDate( null, "YYYY" ) ).toBe( "Invalid date" );
        expect( formatDate( undefined, "YYYY" ) ).toBe( "Invalid date" );
        expect( formatDate( new Date( NaN ), "MMMM" ) ).toBe( "Invalid date" );
    } );

    it( "is always English because it never asks the runtime for locale data", () => {
        const spies = ["toLocaleDateString", "toLocaleTimeString", "toLocaleString"].map( method =>
            jest.spyOn( Date.prototype, method as "toLocaleString" ).mockReturnValue( "localised" ) );
        expect( formatDate( d, "MMMM dddd, h:mm A" ) ).toBe( "March Thursday, 2:07 PM" );
        spies.forEach( spy => {
            expect( spy ).not.toHaveBeenCalled();
            spy.mockRestore();
        } );
    } );
} );

describe( "addDays", () => {
    it( "moves forward and backward across month and year ends", () => {
        expect( addDays( local( 2026, 1, 31, 10, 20 ), 1 ).getTime() ).toBe( local( 2026, 2, 1, 10, 20 ).getTime() );
        expect( addDays( local( 2026, 12, 31 ), 1 ).getTime() ).toBe( local( 2027, 1, 1 ).getTime() );
        expect( addDays( local( 2026, 3, 1 ), -1 ).getTime() ).toBe( local( 2026, 2, 28 ).getTime() );
        expect( addDays( local( 2024, 3, 1 ), -1 ).getTime() ).toBe( local( 2024, 2, 29 ).getTime() );
        expect( addDays( local( 2026, 11, 17 ), 7 ).getTime() ).toBe( local( 2026, 11, 24 ).getTime() );
    } );

    it( "never mutates its argument", () => {
        const original = local( 2026, 11, 17, 8 );
        const before = original.getTime();
        addDays( original, 5 );
        expect( original.getTime() ).toBe( before );
    } );
} );

describe( "addMonths", () => {
    it( "clamps the day to the end of a shorter month", () => {
        expect( addMonths( local( 2026, 1, 31 ), 1 ).getTime() ).toBe( local( 2026, 2, 28 ).getTime() );
        expect( addMonths( local( 2024, 1, 31 ), 1 ).getTime() ).toBe( local( 2024, 2, 29 ).getTime() ); // leap year
        expect( addMonths( local( 2026, 3, 31 ), -1 ).getTime() ).toBe( local( 2026, 2, 28 ).getTime() );
        expect( addMonths( local( 2024, 2, 29 ), 12 ).getTime() ).toBe( local( 2025, 2, 28 ).getTime() );
        expect( addMonths( local( 2024, 2, 29 ), 48 ).getTime() ).toBe( local( 2028, 2, 29 ).getTime() );
    } );

    it( "crosses year boundaries in both directions and keeps the time of day", () => {
        expect( addMonths( local( 2026, 11, 15, 9, 30 ), 2 ).getTime() ).toBe( local( 2027, 1, 15, 9, 30 ).getTime() );
        expect( addMonths( local( 2026, 1, 15 ), -1 ).getTime() ).toBe( local( 2025, 12, 15 ).getTime() );
        expect( addMonths( local( 2026, 6, 15 ), -18 ).getTime() ).toBe( local( 2024, 12, 15 ).getTime() );
        expect( addMonths( local( 2026, 6, 15 ), 0 ).getTime() ).toBe( local( 2026, 6, 15 ).getTime() );
    } );

    it( "never mutates its argument", () => {
        const original = local( 2026, 1, 31 );
        const before = original.getTime();
        addMonths( original, 1 );
        expect( original.getTime() ).toBe( before );
    } );
} );

describe( "startOfDay / startOfWeek / startOfMonth", () => {
    it( "startOfDay gives local midnight", () => {
        expect( startOfDay( local( 2026, 11, 17, 23, 59, 59, 999 ) ).getTime() ).toBe( local( 2026, 11, 17 ).getTime() );
    } );

    it( "startOfWeek gives the Sunday on or before the date", () => {
        const sunday = local( 2026, 11, 15 );
        expect( startOfWeek( local( 2026, 11, 15, 18 ) ).getTime() ).toBe( sunday.getTime() ); // Sunday itself
        expect( startOfWeek( local( 2026, 11, 17, 12 ) ).getTime() ).toBe( sunday.getTime() ); // Tuesday
        expect( startOfWeek( local( 2026, 11, 21, 23 ) ).getTime() ).toBe( sunday.getTime() ); // Saturday
        expect( startOfWeek( local( 2026, 11, 22 ) ).getTime() ).toBe( local( 2026, 11, 22 ).getTime() ); // next Sunday
    } );

    it( "startOfWeek crosses month and year boundaries", () => {
        expect( startOfWeek( local( 2026, 1, 3 ) ).getTime() ).toBe( local( 2025, 12, 28 ).getTime() );
        expect( startOfWeek( local( 2026, 3, 1 ) ).getTime() ).toBe( local( 2026, 3, 1 ).getTime() ); // 1 Mar 2026 is a Sunday
        expect( startOfWeek( local( 2026, 3, 2 ) ).getTime() ).toBe( local( 2026, 3, 1 ).getTime() );
    } );

    it( "startOfMonth gives the first day at local midnight", () => {
        expect( startOfMonth( local( 2026, 11, 17, 13, 45 ) ).getTime() ).toBe( local( 2026, 11, 1 ).getTime() );
        expect( startOfMonth( local( 2024, 2, 29, 23 ) ).getTime() ).toBe( local( 2024, 2, 1 ).getTime() );
    } );

    it( "never mutate their argument", () => {
        const original = local( 2026, 11, 17, 13, 45 );
        const before = original.getTime();
        startOfDay( original );
        startOfWeek( original );
        startOfMonth( original );
        expect( original.getTime() ).toBe( before );
    } );
} );

describe( "isSameDay / isSameMonth", () => {
    it( "compares calendar days in local time, ignoring the time of day", () => {
        expect( isSameDay( local( 2026, 11, 17, 0, 0 ), local( 2026, 11, 17, 23, 59 ) ) ).toBe( true );
        expect( isSameDay( local( 2026, 11, 17, 23, 59 ), local( 2026, 11, 18, 0, 0 ) ) ).toBe( false );
        expect( isSameDay( local( 2026, 11, 17 ), local( 2025, 11, 17 ) ) ).toBe( false );
        expect( isSameDay( local( 2026, 11, 17 ), local( 2026, 10, 17 ) ) ).toBe( false );
    } );

    it( "compares year and month, not the month number alone", () => {
        expect( isSameMonth( local( 2026, 11, 1 ), local( 2026, 11, 30, 23 ) ) ).toBe( true );
        expect( isSameMonth( local( 2026, 11, 17 ), local( 2025, 11, 17 ) ) ).toBe( false );
        expect( isSameMonth( local( 2026, 11, 30 ), local( 2026, 12, 1 ) ) ).toBe( false );
    } );

    it( "is never true for anything that is not a valid Date", () => {
        const date = local( 2026, 11, 17 );
        [null, undefined, "2026-11-17", 1700000000000, new Date( NaN ), {}].forEach( other => {
            expect( isSameDay( other, date ) ).toBe( false );
            expect( isSameDay( date, other ) ).toBe( false );
            expect( isSameMonth( other, date ) ).toBe( false );
            expect( isSameMonth( date, other ) ).toBe( false );
        } );
        expect( isSameDay( new Date( NaN ), new Date( NaN ) ) ).toBe( false );
    } );
} );
