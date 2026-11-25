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

/**
 * Small, pure, English-only date helpers built on the native `Date`.
 *
 * They replace the former `moment` dependency and intentionally keep moment's observable behaviour
 * for the inputs the components use:
 *  - a date-only ISO string ("2026-11-17") is LOCAL midnight (`new Date("2026-11-17")` would be UTC),
 *  - an ISO date-time without an offset is local, one with `Z`/`±HH:mm` is the exact instant,
 *  - output is always English and weeks start on Sunday, whatever the runtime locale is,
 *  - unparseable input gives `null` (and the text "Invalid date" when formatted).
 *
 * Internal module: it is NOT exported from `utilities/index.ts` and is not part of the public API.
 * No function mutates its arguments; every "change" returns a new `Date`.
 */

export const INVALID_DATE_TEXT = "Invalid date";

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTH_NAMES_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_NAMES_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** True for a `Date` instance that holds a real moment in time. */
export const isValidDate = ( value: unknown ): value is Date => value instanceof Date && !isNaN( value.getTime() );

const isLeapYear = ( year: number ) => ( year % 4 === 0 && year % 100 !== 0 ) || year % 400 === 0;

const daysInMonth = ( year: number, month: number ) => {
    if ( month === 1 ) return isLeapYear( year ) ? 29 : 28;
    return [3, 5, 8, 10].indexOf( month ) !== -1 ? 30 : 31;
};

interface DateParts {
    year: number;
    month: number; // 0-11
    day: number;
    hour: number;
    minute: number;
    second: number;
    ms: number;
}

const hasOverflow = ( p: DateParts ) =>
    p.month < 0 || p.month > 11 ||
    p.day < 1 || p.day > daysInMonth( p.year, p.month ) ||
    p.hour < 0 || p.hour > 24 ||
    ( p.hour === 24 && ( p.minute !== 0 || p.second !== 0 || p.ms !== 0 ) ) ||
    p.minute < 0 || p.minute > 59 ||
    p.second < 0 || p.second > 59 ||
    p.ms < 0 || p.ms > 999;

/**
 * Local-time Date from its parts in ONE constructor call (so a wall-clock time that does not exist
 * because of a DST change is resolved by the engine, exactly once, the way moment does it).
 * Years 0-99 are kept as written: the `Date` constructor would map them to 1900-1999, so for those
 * the date is built 400 years later (same leap-year cycle) and then moved back 400 years. The shift is
 * relative, so a day that overflows into the previous/next year still lands in the right year.
 */
const localDate = ( year: number, month: number, day: number, hour = 0, minute = 0, second = 0, ms = 0 ): Date => {
    if ( year < 0 || year > 99 ) return new Date( year, month, day, hour, minute, second, ms );
    const date = new Date( year + 400, month, day, hour, minute, second, ms );
    if ( isFinite( date.getFullYear() ) ) date.setFullYear( date.getFullYear() - 400 );
    return date;
};

/**
 * Builds a Date from validated parts. `offsetMinutes === null` means local time, otherwise the parts
 * are a wall-clock time at that UTC offset. 24:00 rolls over to 00:00 of the next day (ISO 8601).
 */
const buildDate = ( p: DateParts, offsetMinutes: number | null ): Date | null => {
    if ( hasOverflow( p ) ) return null;
    const hour = p.hour === 24 ? 0 : p.hour;
    const day = p.hour === 24 ? p.day + 1 : p.day;
    let date: Date;
    if ( offsetMinutes === null ) {
        date = localDate( p.year, p.month, day, hour, p.minute, p.second, p.ms );
    } else {
        let utc: number;
        if ( p.year < 0 || p.year > 99 ) {
            utc = Date.UTC( p.year, p.month, day, hour, p.minute, p.second, p.ms );
        } else { // same 400-year shift as localDate for years 0-99
            const shifted = new Date( Date.UTC( p.year + 400, p.month, day, hour, p.minute, p.second, p.ms ) );
            utc = isFinite( shifted.getTime() ) ? shifted.setUTCFullYear( shifted.getUTCFullYear() - 400 ) : NaN;
        }
        date = new Date( utc - offsetMinutes * 60000 );
    }
    return isValidDate( date ) ? date : null;
};

// ISO 8601, as accepted by moment: calendar / ordinal dates, optional time, optional offset.
// Not supported (returns null): week dates ("2026-W46-3") and expanded years ("+002026-11-17").
const EXTENDED_ISO = /^\s*(\d{4}-(?:\d\d-\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
const BASIC_ISO = /^\s*(\d{4}(?:\d\d\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
const EXTENDED_DATE = /^(\d{4})-(?:(\d\d)-(\d\d)|(\d{3})|(\d\d))$/;
const BASIC_DATE = /^(\d{4})(?:(\d\d)(\d\d)|(\d{3})|(\d\d))?$/;
const EXTENDED_TIME = /^(\d\d)(?::(\d\d)(?::(\d\d)(?:[.,](\d+))?)?)?$/;
const BASIC_TIME = /^(\d\d)(?:(\d\d)(?:(\d\d)(?:[.,](\d+))?)?)?$/;
const OFFSET = /^([+-])(\d\d)(?::?(\d\d))?$/;

const toInt = ( value: string | undefined ) => ( value === undefined ? 0 : parseInt( value, 10 ) );

/**
 * Parses ISO 8601. Returns `undefined` when the string is not shaped like ISO 8601 at all, and `null`
 * when it is shaped like it but does not exist ("2026-02-30", "2026-11-17T25:00").
 */
const parseISO = ( input: string ): Date | null | undefined => {
    const extended = EXTENDED_ISO.exec( input );
    const match = extended || BASIC_ISO.exec( input );
    if ( !match ) return undefined;
    const dateMatch = ( extended ? EXTENDED_DATE : BASIC_DATE ).exec( match[1] );
    if ( !dateMatch ) return null;
    const year = toInt( dateMatch[1] );
    let month = 0;
    let day = 1;
    if ( dateMatch[2] !== undefined ) { // YYYY-MM-DD / YYYYMMDD
        month = toInt( dateMatch[2] ) - 1;
        day = toInt( dateMatch[3] );
    } else if ( dateMatch[4] !== undefined ) { // ordinal day of the year
        let ordinal = toInt( dateMatch[4] );
        if ( ordinal < 1 || ordinal > ( isLeapYear( year ) ? 366 : 365 ) ) return null;
        while ( ordinal > daysInMonth( year, month ) ) {
            ordinal -= daysInMonth( year, month );
            month++;
        }
        day = ordinal;
    } else if ( dateMatch[5] !== undefined ) { // YYYY-MM / YYYYMM
        month = toInt( dateMatch[5] ) - 1;
    }
    let hour = 0, minute = 0, second = 0, ms = 0;
    if ( match[3] !== undefined ) {
        const time = ( extended ? EXTENDED_TIME : BASIC_TIME ).exec( match[3] );
        if ( !time ) return null;
        hour = toInt( time[1] );
        minute = toInt( time[2] );
        second = toInt( time[3] );
        ms = time[4] === undefined ? 0 : Math.floor( Number( "0." + time[4] ) * 1000 );
    }
    let offsetMinutes: number | null = null;
    if ( match[4] !== undefined ) {
        const offset = OFFSET.exec( match[4].replace( /\s/g, "" ) );
        offsetMinutes = offset ? ( offset[1] === "-" ? -1 : 1 ) * ( toInt( offset[2] ) * 60 + toInt( offset[3] ) ) : 0; // "Z"
    }
    return buildDate( { year, month, day, hour, minute, second, ms }, offsetMinutes );
};

/**
 * Same as moment(input, moment.ISO_8601): the WHOLE string must be ISO 8601, there is no fallback to
 * the engine's parser. Date-only and offset-less values are local time; `Z`/`±HH[:mm]` is exact.
 */
export const parseISODate = ( input: string | null | undefined ): Date | null =>
    typeof input === "string" ? ( parseISO( input ) || null ) : null;

/**
 * Same as moment(input) for the supported input types: a string shaped like ISO 8601 is parsed as
 * above (and is invalid if that date does not exist), any other string falls back to the engine's
 * `new Date( string )` as moment did, numbers are epoch milliseconds and a Date is copied.
 * `null`, `undefined`, "" and anything unparseable give `null`.
 * Note: moment(undefined) returned "now"; callers that want "now" should call `new Date()` themselves.
 */
export const parseDate = ( input: string | number | Date | null | undefined ): Date | null => {
    if ( input === null || input === undefined || input === "" ) return null;
    if ( input instanceof Date ) return isValidDate( input ) ? new Date( input.getTime() ) : null;
    if ( typeof input === "number" ) {
        const date = new Date( input );
        return isValidDate( date ) ? date : null;
    }
    if ( typeof input !== "string" ) return null;
    const iso = parseISO( input );
    if ( iso !== undefined ) return iso;
    const fallback = new Date( input );
    return isValidDate( fallback ) ? fallback : null;
};

const TWO_DIGIT_YEAR_PIVOT = 68;

/** moment's two-digit year rule: 00-68 are 2000-2068, 69-99 are 1969-1999. */
const expandYear = ( year: string ) => {
    const value = parseInt( year, 10 );
    return year.length <= 2 ? value + ( value > TWO_DIGIT_YEAR_PIVOT ? 1900 : 2000 ) : value;
};

const FORMAT_TOKEN = /YYYY|MM|DD|HH|mm|[\s\S]/g;
const PARSE_PATTERNS: { [token: string]: RegExp; } = {
    YYYY: /\d{1,4}/,
    MM: /\d\d?/,
    DD: /\d\d?/,
    HH: /\d\d?/,
    mm: /\d\d?/,
};

/**
 * Same as moment(input, format) in its default (non-strict) mode for the two formats the components
 * use. Tokens are matched one after the other and anything in between is skipped, so "2026-11-17",
 * "2026/11/17" and "2026-11-17T10:00" all read as 17 Nov 2026 (local midnight). With "HH:mm" the date
 * is today. Values that overflow (month 13, 31 Feb, 25:00) and input without any number give `null`.
 */
export const parseDateWithFormat = ( input: string | null | undefined, format: "YYYY-MM-DD" | "HH:mm" ): Date | null => {
    if ( input === null ) return null;
    let rest = "" + input; // moment reads "" + input, so undefined becomes "undefined" and has no digits
    const found: { [token: string]: string; } = {};
    const tokens = format.match( FORMAT_TOKEN ) || [];
    for ( let i = 0; i < tokens.length; i++ ) {
        const pattern = PARSE_PATTERNS[tokens[i]];
        if ( pattern ) {
            const match = pattern.exec( rest );
            if ( match ) {
                found[tokens[i]] = match[0];
                rest = rest.slice( match.index + match[0].length );
            }
        } else {
            const at = rest.indexOf( tokens[i] );
            if ( at !== -1 ) rest = rest.slice( at + tokens[i].length );
        }
    }
    if ( Object.keys( found ).length === 0 ) return null;
    const now = new Date();
    const date: ( number | undefined )[] = [
        found.YYYY === undefined ? undefined : ( found.YYYY.length === 2 ? expandYear( found.YYYY ) : toInt( found.YYYY ) ),
        found.MM === undefined ? undefined : toInt( found.MM ) - 1,
        found.DD === undefined ? undefined : toInt( found.DD ),
    ];
    // moment: leading missing year/month/day default to today, the rest to the first month / first day
    const today = [now.getFullYear(), now.getMonth(), now.getDate()];
    let i = 0;
    while ( i < 3 && date[i] === undefined ) { date[i] = today[i]; i++; }
    for ( ; i < 3; i++ ) if ( date[i] === undefined ) date[i] = i === 2 ? 1 : 0;
    return buildDate( {
        year: date[0] as number,
        month: date[1] as number,
        day: date[2] as number,
        hour: toInt( found.HH ),
        minute: toInt( found.mm ),
        second: 0,
        ms: 0,
    }, null );
};

/**
 * Builds a local-midnight Date from separate year / month / day strings, such as the output of
 * `getValuesFromDateFormat()`. The year may have two digits (moment's pivot rule applies) or four,
 * the month is a number or an English name (full, or at least its first three letters).
 * Returns `null` when any part is missing or the date does not exist.
 */
export const dateFromParts = ( year: string, month: string, day: string ): Date | null => {
    if ( !/^\d+$/.test( year ) || !/^\d+$/.test( day ) ) return null;
    let monthNumber: number;
    if ( /^\d+$/.test( month ) ) {
        monthNumber = parseInt( month, 10 ) - 1;
    } else {
        const prefix = month.slice( 0, 3 ).toLowerCase();
        monthNumber = prefix.length < 3 ? -1 : MONTH_NAMES_SHORT.map( name => name.toLowerCase() ).indexOf( prefix );
    }
    return buildDate( { year: expandYear( year ), month: monthNumber, day: parseInt( day, 10 ), hour: 0, minute: 0, second: 0, ms: 0 }, null );
};

const zeroFill = ( value: number, length: number ) => {
    const absolute = "" + Math.abs( value );
    let zeros = "";
    for ( let i = absolute.length; i < length; i++ ) zeros += "0";
    return ( value < 0 ? "-" : "" ) + zeros + absolute;
};

const ordinal = ( n: number ) => {
    const lastDigit = n % 10;
    if ( Math.floor( ( n % 100 ) / 10 ) === 1 ) return n + "th";
    if ( lastDigit === 1 ) return n + "st";
    if ( lastDigit === 2 ) return n + "nd";
    if ( lastDigit === 3 ) return n + "rd";
    return n + "th";
};

const FORMAT_PATTERN = /\[([^[\]]*)]|YYYY|YY|MMMM|MMM|MM|M|Do|DD|D|dddd|ddd|HH|H|hh|h|mm|m|ss|s|A|a/g;

/**
 * Formats a date in English using local time. Supported tokens (a subset of moment's):
 * YYYY YY MMMM MMM MM M Do DD D dddd ddd HH H hh h mm m ss s A a, plus `[escaped text]`.
 * Any other character is copied as it is. A missing or invalid date gives "Invalid date".
 */
export const formatDate = ( date: Date | null | undefined, pattern: string ): string => {
    if ( !isValidDate( date ) ) return INVALID_DATE_TEXT;
    const hour = date.getHours();
    return pattern.replace( FORMAT_PATTERN, ( token: string, escaped?: string ) => {
        switch ( token ) {
            case "YYYY": return date.getFullYear() <= 9999 ? zeroFill( date.getFullYear(), 4 ) : "" + date.getFullYear();
            case "YY": return zeroFill( date.getFullYear() % 100, 2 );
            case "MMMM": return MONTH_NAMES[date.getMonth()];
            case "MMM": return MONTH_NAMES_SHORT[date.getMonth()];
            case "MM": return zeroFill( date.getMonth() + 1, 2 );
            case "M": return "" + ( date.getMonth() + 1 );
            case "Do": return ordinal( date.getDate() );
            case "DD": return zeroFill( date.getDate(), 2 );
            case "D": return "" + date.getDate();
            case "dddd": return DAY_NAMES[date.getDay()];
            case "ddd": return DAY_NAMES_SHORT[date.getDay()];
            case "HH": return zeroFill( hour, 2 );
            case "H": return "" + hour;
            case "hh": return zeroFill( hour % 12 || 12, 2 );
            case "h": return "" + ( hour % 12 || 12 );
            case "mm": return zeroFill( date.getMinutes(), 2 );
            case "m": return "" + date.getMinutes();
            case "ss": return zeroFill( date.getSeconds(), 2 );
            case "s": return "" + date.getSeconds();
            case "A": return hour < 12 ? "AM" : "PM";
            case "a": return hour < 12 ? "am" : "pm";
            default: return escaped !== undefined ? escaped : token;
        }
    } );
};

/** New Date `days` days later (negative: earlier), same local time of day. */
export const addDays = ( date: Date, days: number ): Date => {
    const result = new Date( date.getTime() );
    result.setDate( result.getDate() + days );
    return result;
};

/** New Date `months` months later (negative: earlier). The day is clamped like moment does: Jan 31 + 1 month = Feb 28/29. */
export const addMonths = ( date: Date, months: number ): Date => {
    const result = new Date( date.getTime() );
    const total = result.getFullYear() * 12 + result.getMonth() + months;
    const year = Math.floor( total / 12 );
    const month = total - year * 12;
    // one call sets year, month and the clamped day together (no intermediate date that a DST change could shift)
    result.setFullYear( year, month, Math.min( result.getDate(), daysInMonth( year, month ) ) );
    return result;
};

/** Local midnight of the same day. */
export const startOfDay = ( date: Date ): Date => localDate( date.getFullYear(), date.getMonth(), date.getDate() );

/** Local midnight of the Sunday that starts the week of `date`. */
export const startOfWeek = ( date: Date ): Date => localDate( date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() );

/** Local midnight of the first day of the month. */
export const startOfMonth = ( date: Date ): Date => localDate( date.getFullYear(), date.getMonth(), 1 );

/** Same calendar day in local time. Anything that is not a valid Date (string, null, Invalid Date) is never "the same". */
export const isSameDay = ( a: unknown, b: unknown ): boolean =>
    isValidDate( a ) && isValidDate( b ) &&
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** Same year and month in local time. Anything that is not a valid Date is never "the same". */
export const isSameMonth = ( a: unknown, b: unknown ): boolean =>
    isValidDate( a ) && isValidDate( b ) && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
