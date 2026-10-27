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
/* ============================================================================
 * HCL CEC utilities (shared across CEC* components)
 * File: src/utils/cec-utils.ts
 * --------------------------------------------------------------------------
 * Design goals
 * - SSR-safe: never touch window/document unless guarded
 * - No external deps on ../../utilities for parsing
 * - Small, composable helpers with solid defaults
 * - Stable API surface so components can import only what they need
 * ==========================================================================*/
/* ---------------------------------- Env ---------------------------------- */
const hasDOM: boolean =
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    // DOMParser exists in most browsers; gate before using it
    typeof ( window as any ).DOMParser !== "undefined";
/* ------------------------------ Type helpers ------------------------------ */
type AnyRecord = Record<string, any>;
/* ------------------------------ DX unwrap --------------------------------- */
/**
 * Unwraps common DX shapes so components can accept {data}, {config}, {props}, or raw.
 */
export function unwrapDXProps<T extends AnyRecord>( raw: T ): T {
    if ( raw && typeof raw === "object" ) {
        // Prefer data, then config, then props
        if (
            ( raw as AnyRecord ).data &&
            typeof ( raw as AnyRecord ).data === "object"
        )
            return { ...( raw as AnyRecord ).data };
        if (
            ( raw as AnyRecord ).config &&
            typeof ( raw as AnyRecord ).config === "object"
        )
            return { ...( raw as AnyRecord ).config };
        if (
            ( raw as AnyRecord ).props &&
            typeof ( raw as AnyRecord ).props === "object"
        )
            return { ...( raw as AnyRecord ).props };
    }
    return raw;
}
/* ------------------------------ HTML utils -------------------------------- */
/**
 * Decodes HTML entities, handling double-encoding by iterating
 * until the string stabilizes (max 3 passes).
 * Works in both browser and SSR environments.
 */
// src/utilities/cec-utils.ts
export function decodeHtmlEntities( input?: string ): string {
    if ( !input || typeof input !== "string" ) return "";
    let out = input.replace( /&amp;amp;/g, '&' ).replace( /&amp;#(?:61|43);/g, ( match ) => match === '&amp;#61;' ? '=' : '+' ); //CNX-39672 - Fixed image display issue
    let passes = 0;
    const hasEntity = ( s: string ) =>
        /&(?:[a-zA-Z]+|#\d+|#x[0-9a-fA-F]+);/.test( s );
    const singleDecodeNode = ( s: string ) =>
        s
            // named basics
            .replace( /&lt;/g, "<" )
            .replace( /&gt;/g, ">" )
            .replace( /&quot;/g, '"' )
            .replace( /&#0*39;/g, "'" )
            .replace( /&apos;/g, "'" )
            .replace( /&amp;/g, "&" )
            // hex numeric
            .replace( /&#x([0-9a-fA-F]+);/g, ( _, hex ) =>
                String.fromCodePoint( parseInt( hex, 16 ) )
            )
            // dec numeric
            .replace( /&#(\d+);/g, ( _, dec ) =>
                String.fromCodePoint( parseInt( dec, 10 ) )
            )
            // Handle other common entities
            .replace( /&rsquo;/g, "'" )
            .replace( /&lsquo;/g, "'" )
            .replace( /&rdquo;/g, '"' )
            .replace( /&ldquo;/g, '"' );
    while ( passes < 3 && hasEntity( out ) ) {
        const next = ( (): string => {
            if ( hasDOM ) {
                try {
                    const doc = new DOMParser().parseFromString( out, "text/html" );
                    return doc.documentElement.textContent || out;
                } catch ( e ) {
                    return singleDecodeNode( out );
                }
            }
            return singleDecodeNode( out );
        } )();
        if ( next === out ) break; // stabilized
        out = next;
        passes += 1;
    }
    return out;
}
/**
 * Strips HTML tags (safe on both server and client).
 */
export function stripHtml( html?: string ): string {
    if ( !html ) return "";
    if ( hasDOM ) {
        const div = document.createElement( "div" );
        div.innerHTML = html;
        return ( div.textContent || div.innerText || "" ).trim();
    }
    return String( html )
        .replace( /<[^>]*>/g, " " )
        .replace( /\s+/g, " " )
        .trim();
}
/** Returns true when the image URL points to a GIF resource. */
export function isGifImageUrl( url?: string | null ): boolean {
    if ( !url ) return false;
    const value = String( url ).trim().toLowerCase();
    if ( !value ) return false;
    // Data URLs encode the mime type up-front.
    if ( value.startsWith( "data:image/gif" ) ) return true;
    // Ignore query/hash before extension checks.
    const withoutHash = value.split( "#" )[0] || "";
    const pathOnly = withoutHash.split( "?" )[0] || "";
    return pathOnly.endsWith( ".gif" );
}
function hasBlockedEmoticonImageName( url?: string | null ): boolean {
    return typeof url === "string" && /emoticon/i.test( url );
}
/**
 * Extracts the first <img src="..."> from an HTML string.
 * Uses DOMParser in the browser; falls back to a regex server-side.
 */
export function extractFirstImageFromContent( content?: string ): string | null {
    if ( !content ) return null;
    if ( hasDOM ) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString( content, "text/html" );
            const images = Array.from( doc.querySelectorAll( "img" ) );
            for ( const image of images ) {
                const src = image.getAttribute( "src" );
                if ( src && !isFalsyImageUrl( src ) && !hasBlockedEmoticonImageName( src ) ) {
                    return src;
                }
            }
            return null;
        } catch ( err ) {
            console.error( "extractFirstImageFromContent parse error:", err );
            return null;
        }
    }
    // SSR regex fallback (best effort)
    const html = String( content );
    const imageRegex = /<img[^>]+src\s*=\s*["']([^"']+)["']/gi;
    let match: RegExpExecArray | null = imageRegex.exec( html );
    while ( match ) {
        const src = match[1];
        if ( src && !isFalsyImageUrl( src ) && !hasBlockedEmoticonImageName( src ) ) {
            return src;
        }
        match = imageRegex.exec( html );
    }
    return null;
}
/**
 * Builds a summary from HTML content (strips tags, trims to length).
 */
export function generateSummary( content?: string, maxLength = 150 ): string {
    const text = stripHtml( decodeHtmlEntities( content || "" ) );
    if ( !text ) return "";
    if ( text.length <= maxLength ) return text;
    const truncated = text.substring( 0, maxLength );
    // End on last whole word
    const cut = Math.min(
        truncated.length,
        Math.max( 0, truncated.lastIndexOf( " " ) )
    );
    return `${truncated.substring( 0, cut )}...`;
}
/** Extracts first image URL from encoded HTML content. */
export function extractImageFromEncodedContent(
    encoded?: string
): string | null {
    if ( !encoded ) return null;
    const decoded = decodeHtmlEntities( encoded );
    return extractFirstImageFromContent( decoded );
}
/* ------------------------------- Date utils ------------------------------- */
/**
 * Checks if a date string matches a specific format pattern.
 * Supports common date formats: dd/MM/yyyy, MM/dd/yyyy, yyyy-MM-dd, dd-MM-yyyy
 */
export function isDateFormat( dateStr: string, format: string ): boolean {
    if ( typeof dateStr !== 'string' || typeof format !== 'string' ) {
        return false;
    }
    // Simple format matching for common patterns
    const formatPatterns: Record<string, RegExp> = {
        'dd/MM/yyyy': /^\d{2}\/\d{2}\/\d{4}$/,
        'MM/dd/yyyy': /^\d{2}\/\d{2}\/\d{4}$/,
        'yyyy-MM-dd': /^\d{4}-\d{2}-\d{2}$/,
        'dd-MM-yyyy': /^\d{2}-\d{2}-\d{4}$/,
    };
    const pattern = formatPatterns[format];
    return pattern ? pattern.test( dateStr.trim() ) : false;
}
/**
 * Normalizes locale-specific digit characters to ASCII digits so that date
 * strings produced by locale-sensitive formatters (e.g. Arabic-Indic numerals
 * rendered when the portal locale is AR) can be parsed by the standard JS
 * Date constructor.
 *
 * Handles:
 *   - Arabic-Indic digits      ٠١٢٣٤٥٦٧٨٩  (U+0660 – U+0669)
 *   - Extended Arabic-Indic    ۰۱۲۳۴۵۶۷۸۹  (U+06F0 – U+06F9)
 */
export function normalizeLocaleNumerals( input: string ): string {
    return input
        .replace( /[\u0660-\u0669]/g, ( c ) => String( c.charCodeAt( 0 ) - 0x0660 ) )
        .replace( /[\u06F0-\u06F9]/g, ( c ) => String( c.charCodeAt( 0 ) - 0x06F0 ) );
}
/**
 * Safe ISO string conversion with validation
 * Handles invalid dates gracefully without throwing exceptions
 */
export function safeToISOString( input?: string | Date | number | null ): string | undefined {
    // Explicitly check for null or undefined, not falsy (to handle 0 timestamp)
    // null/undefined is valid — caller explicitly passed no date
    if ( input === null || input === undefined ) {
        return undefined;
    }
    try {
        // Normalise locale-specific digit characters (e.g. Arabic-Indic numerals)
        // before passing to the Date constructor so that strings like "٢٠٢٦/٠٥/٠٩"
        // are parsed correctly instead of producing an Invalid Date.
        const normalised = typeof input === 'string' ? normalizeLocaleNumerals( input ) : input;
        const date = normalised instanceof Date ? normalised : new Date( normalised as string | number );
        // Check if date is valid
        if ( isNaN( date.getTime() ) ) {
            console.error( '[cec-utils] safeToISOString: Invalid date detected:', { input, inputType: typeof input } );
            return undefined;
        }
        // Additional check for out-of-range dates that can cause RangeError in toISOString()
        const year = date.getFullYear();
        if ( year < 1600 || year > 9999 ) {
            console.error( '[cec-utils] safeToISOString: Date out of valid range for toISOString():', { input, inputType: typeof input } );
            return undefined;
        }
        return date.toISOString();
    } catch ( error: unknown ) {
        console.error( '[cec-utils] safeToISOString: Exception caught while processing date:', { input, inputType: typeof input } );
        return undefined;
    }
}
/**
 * Lightweight date tokenizer to support a handful of numeric formats.
 * Supports:
 *   - "MM/DD/YY" or "MM/DD/YYYY"
 *   - "DD/MM/YY" or "DD/MM/YYYY"
 *   - "YYYY-MM-DD" or "YYYY/MM/DD"
 * If a format string is provided, it guides the mapping; otherwise defaults to "MM/DD/YY".
 */
function getValuesFromDateFormatLite(
    input: string,
    format?: string
): { day?: string; month?: string; year?: string; } | null {
    const s = input.trim();
    const m = s.match( /^(\d{1,4})[\/-](\d{1,2})[\/-](\d{1,4})$/ );
    if ( !m ) return null;
    const [_, a, b, c] = m; // parts
    const upper = ( format || "MM/DD/YY" ).toUpperCase();
    // Decide mapping by format hint
    if ( upper.startsWith( "YYYY" ) ) return { year: a, month: b, day: c };
    if ( upper.endsWith( "YYYY" ) || upper.endsWith( "YY" ) ) {
        // Default US style (MM/DD/YYYY)
        if ( upper.startsWith( "MM" ) ) return { month: a, day: b, year: c };
        // EU style (DD/MM/YYYY)
        if ( upper.startsWith( "DD" ) ) return { day: a, month: b, year: c };
    }
    // Heuristics if no clear hint
    if ( a.length === 4 ) return { year: a, month: b, day: c }; // YYYY-first
    if ( c.length === 4 ) return { month: a, day: b, year: c }; // YYYY-last (assume US)
    return { month: a, day: b, year: c };
}
type SupportedLocale =
    | "en-US"
    | "zh-CN"
    | "zh-TW"
    | "ja-JP"
    | "ko-KR"
    | "fr-FR"
    | "de-DE"
    | "it-IT"
    | "es-ES"
    | "pt-BR"
    | "cs-CZ"
    | "da-DK"
    | "nl-NL"
    | "fi-FI"
    | "el-GR"
    | "hu-HU"
    | "no-NO"
    | "pl-PL"
    | "pt-PT"
    | "ru-RU"
    | "sv-SE"
    | "sl-SI"
    | "tr-TR"
    | "he-IL"
    | "ar-SA"
    | "ca-ES"
    | "kk-KZ"
    | "th-TH"
    | "id-ID"
    | "bg-BG"
    | "ro-RO"
    | "sk-SK"
    | "hr-HR"
    | "eu-ES"
    | "sr-RS";
/**
 * Curated baseline locales used for language-agnostic text-month parsing.
 * This is combined with browser/runtime locales so data in additional
 * languages can be parsed without manual month-name tables.
 */
const DEFAULT_MONTH_PARSE_LOCALES: string[] = [
    "en-US", "en-GB", "de-DE", "fr-FR", "es-ES", "it-IT",
    "pt-PT", "pt-BR", "nl-NL", "sv-SE", "no-NO", "da-DK", "fi-FI",
    "pl-PL", "cs-CZ", "sk-SK", "hu-HU", "ro-RO", "tr-TR",
    "ru-RU", "uk-UA", "el-GR", "sl-SI", "hr-HR", "sr-RS", "bg-BG",
    "he-IL", "ar-SA", "fa-IR",
    "hi-IN", "bn-BD", "th-TH", "vi-VN", "id-ID", "ms-MY",
    "ja-JP", "ko-KR", "zh-CN", "zh-TW", "ca-ES", "kk-KZ", "eu-ES"
];
function getMonthParseLocales(): string[] {
    const runtimeLocales = hasDOM && Array.isArray( navigator.languages )
        ? navigator.languages
        : [];
    const fallbackLocale = Intl.DateTimeFormat().resolvedOptions().locale;
    const baseLocales = Array.from( new Set( [
        ...DEFAULT_MONTH_PARSE_LOCALES,
        ...runtimeLocales,
        fallbackLocale,
    ] ) );
    // Include explicit Gregorian calendar variants so locales that default to
    // non-Gregorian calendars (e.g., ar-SA) still contribute Gregorian month
    // names such as يناير/فبراير/... used by event date strings.
    const withGregorianVariants = baseLocales.flatMap( ( locale ) => {
        const normalized = String( locale ).trim();
        if ( !normalized ) return [];
        if ( /-u-ca-gregory/i.test( normalized ) ) return [normalized];
        return [normalized, `${normalized}-u-ca-gregory`];
    } );
    return Array.from( new Set( [
        ...withGregorianVariants,
    ] ) );
}
function stripDiacritics( input: string ): string {
    return input.normalize( "NFD" ).replace( /[\u0300-\u036f]/g, "" );
}
function normalizeMonthToken( input: string ): string {
    return stripDiacritics( input )
        .toLowerCase()
        .trim()
        .replace( /[.,،。]+$/g, "" );
}
/**
 * Reverse map of lowercase month name → 0-based month index.
 * Built once at module load using Intl.DateTimeFormat so every locale
 * in the parse-locale set is covered without any manual month entries.
 */
const LOCALE_MONTH_MAP: Record<string, number> = ( () => {
    const map: Record<string, number> = {};
    const pivot = new Date( 2024, 0, 1 ); // Jan 2024 — no DST risk
    for ( const locale of getMonthParseLocales() ) {
        let longStandaloneFmt: Intl.DateTimeFormat;
        let shortStandaloneFmt: Intl.DateTimeFormat;
        let longDateFmt: Intl.DateTimeFormat;
        let shortDateFmt: Intl.DateTimeFormat;
        try {
            longStandaloneFmt = new Intl.DateTimeFormat( locale, { month: "long" } );
            shortStandaloneFmt = new Intl.DateTimeFormat( locale, { month: "short" } );
            longDateFmt = new Intl.DateTimeFormat( locale, {
                day: "numeric",
                month: "long",
                year: "numeric",
            } );
            shortDateFmt = new Intl.DateTimeFormat( locale, {
                day: "numeric",
                month: "short",
                year: "numeric",
            } );
        } catch {
            continue;
        }
        for ( let m = 0; m < 12; m++ ) {
            pivot.setMonth( m );
            const monthParts = [
                ...longStandaloneFmt.formatToParts( pivot ),
                ...shortStandaloneFmt.formatToParts( pivot ),
                ...longDateFmt.formatToParts( pivot ),
                ...shortDateFmt.formatToParts( pivot ),
            ];
            monthParts
                .filter( ( part ) => part.type === "month" )
                .forEach( ( part ) => {
                    const key = normalizeMonthToken( part.value );
                    if ( key ) map[key] = m;
                } );
        }
    }
    return map;
} )();
/**
 * Detects locale from language-specific date text so CECEvent can format with
 * Intl.DateTimeFormat in the same language as the source.
 */
export function detectInputLocale( input?: string | null ): SupportedLocale {
    if ( !input || typeof input !== "string" ) return "en-US";
    const raw = input.trim();
    if ( /[\u3040-\u309F\u30A0-\u30FF]/.test( raw ) ) return "ja-JP";
    if ( /[\uAC00-\uD7AF]/.test( raw ) ) return "ko-KR";
    if ( /[\u4E00-\u9FFF]/.test( raw ) ) return "zh-CN";
    if ( /[\u0590-\u05FF]/.test( raw ) ) return "he-IL";
    if ( /[\u0600-\u06FF]/.test( raw ) ) return "ar-SA";
    if ( /\bvorm\.?|\bnachm\.?/i.test( raw ) ) return "de-DE";
    if ( /\b(gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)\b/i.test( raw ) ) return "it-IT";
    if ( /\b(janeiro|fevereiro|mar[çc]o|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\b/i.test( raw ) ) return "pt-BR";
    if ( /\b(januari|februari|maart|april|mei|juni|juli|augustus|september|oktober|november|december)\b/i.test( raw ) ) return "nl-NL";
    if ( /\b(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|noviembre|diciembre)\b/i.test( raw ) ) return "es-ES";
    if ( /\b(janvier|f[eé]vrier|mars|avril|mai|juin|juillet|ao[uû]t|septembre|octobre|novembre|d[eé]cembre)\b/.test( raw ) ) return "fr-FR";
    if ( /\b(Januar|Februar|M[äa]rz|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember)\b/.test( raw ) ) return "de-DE";
    return "en-US";
}
function parseLocaleTextMonthDate( input: string ): Date | null {
    const normalized = normalizeLocaleNumerals( input.trim() );
    // Detect if the input contains GMT/Greenwich timezone indicator
    const isGMT = /\bGMT\b/i.test( normalized ) || /\u062C\u0631\u064A\u0646\u062A\u0634/.test( normalized );
    const withNormalizedTokens = normalized
        .replace( /\bvorm\.?/gi, "AM" )
        .replace( /\bnachm\.?/gi, "PM" )
        .replace( /\bGMT\b/gi, "" )
        // Chinese AM/PM tokens
        .replace( /(^|\s)上午(\s|$)/g, "$1AM$2" )
        .replace( /(^|\s)下午(\s|$)/g, "$1PM$2" )
        // Japanese AM/PM tokens
        .replace( /(^|\s)午前(\s|$)/g, "$1AM$2" )
        .replace( /(^|\s)午後(\s|$)/g, "$1PM$2" )
        // Korean AM/PM tokens
        .replace( /(^|\s)오전(\s|$)/g, "$1AM$2" )
        .replace( /(^|\s)오후(\s|$)/g, "$1PM$2" )
        // Thai AM/PM tokens
        .replace( /(^|\s)ก่อนเที่ยง(\s|$)/g, "$1AM$2" )
        .replace( /(^|\s)หลังเที่ยง(\s|$)/g, "$1PM$2" )
        // Hebrew AM/PM tokens in localized date strings.
        // Supports geresh/gershayim and straight quote variants.
        .replace( /(^|\s)לפנה[\"\u05F3\u05F4\u201C\u201D']?צ(\s|$)/g, "$1AM$2" )
        .replace( /(^|\s)אחה[\"\u05F3\u05F4\u201C\u201D']?צ(\s|$)/g, "$1PM$2" )
        // Arabic AM/PM tokens: ص = Sabah (morning/AM), م = Masa' (evening/PM)
        // Use space-boundary matching since \b doesn't work with Arabic (non-\w) chars.
        // These appear as standalone tokens separated by spaces, unlike month-name chars.
        .replace( /(^|\s)\u0635(\s|$)/g, "$1AM$2" )   // ص → AM
        .replace( /(^|\s)\u0645(\s|$)/g, "$1PM$2" )   // م → PM
        // Arabic "جرينتش" = Greenwich (GMT)
        .replace( /\u062C\u0631\u064A\u0646\u062A\u0634/g, "" )
        .trim();
    const monthFirst = /^([^\s,.:\/\-]+)\.?\s+(\d{1,2}),?\s+(\d{4})(?:[,\s]+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?)?$/i.exec( withNormalizedTokens );
    if ( monthFirst ) {
        const monthKey = normalizeMonthToken( monthFirst[1] );
        const month = LOCALE_MONTH_MAP[monthKey];
        if ( month !== undefined ) {
            let hour = monthFirst[4] ? parseInt( monthFirst[4], 10 ) : 0;
            const minute = monthFirst[5] ? parseInt( monthFirst[5], 10 ) : 0;
            const second = monthFirst[6] ? parseInt( monthFirst[6], 10 ) : 0;
            const meridiem = monthFirst[7]?.toUpperCase();
            if ( meridiem === "PM" && hour < 12 ) hour += 12;
            if ( meridiem === "AM" && hour === 12 ) hour = 0;
            // Use UTC if the original input contained GMT/Greenwich timezone
            const d = isGMT
                ? new Date( Date.UTC(
                    parseInt( monthFirst[3], 10 ),
                    month,
                    parseInt( monthFirst[2], 10 ),
                    hour,
                    minute,
                    second
                ) )
                : new Date(
                    parseInt( monthFirst[3], 10 ),
                    month,
                    parseInt( monthFirst[2], 10 ),
                    hour,
                    minute,
                    second
                );
            return isNaN( d.getTime() ) ? null : d;
        }
    }
    const dayFirst = /^(\d{1,2})\.?\s+([^\s,.:\/\-]+)\.?\s+(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/i.exec( withNormalizedTokens );
    if ( dayFirst ) {
        const monthKey = normalizeMonthToken( dayFirst[2] );
        const month = LOCALE_MONTH_MAP[monthKey];
        if ( month !== undefined ) {
            // Use UTC if the original input contained GMT/Greenwich timezone
            const d = isGMT
                ? new Date( Date.UTC(
                    parseInt( dayFirst[3], 10 ),
                    month,
                    parseInt( dayFirst[1], 10 ),
                    dayFirst[4] ? parseInt( dayFirst[4], 10 ) : 0,
                    dayFirst[5] ? parseInt( dayFirst[5], 10 ) : 0,
                    dayFirst[6] ? parseInt( dayFirst[6], 10 ) : 0
                ) )
                : new Date(
                    parseInt( dayFirst[3], 10 ),
                    month,
                    parseInt( dayFirst[1], 10 ),
                    dayFirst[4] ? parseInt( dayFirst[4], 10 ) : 0,
                    dayFirst[5] ? parseInt( dayFirst[5], 10 ) : 0,
                    dayFirst[6] ? parseInt( dayFirst[6], 10 ) : 0
                );
            return isNaN( d.getTime() ) ? null : d;
        }
    }
    return null;
}
/**
 * Robust parser for DX/CEC dates:
 * - "MILLIS" format or long numeric => epoch (assumes ms)
 * - Native Date parsing for ISO/RFC strings
 * - Numeric slash formats via getValuesFromDateFormatLite
 */
export function safeParseDXDate(
    input?: string,
    formatHint?: string
): Date | null {
    if ( !input || typeof input !== 'string' ) return null;
    // Normalise locale-specific digit characters (e.g. Arabic-Indic numerals produced
    // when the portal renders date strings in an AR locale) to ASCII digits so that all
    // downstream pattern-matching and native Date parsing works correctly.
    const trimmed = normalizeLocaleNumerals( input.trim() );
    // Reject incomplete dates (must have at least 3 parts for slash/dash formats)
    if ( /^[\/-]/.test( trimmed ) || /[\/-]$/.test( trimmed ) ) {
        return null; // Starts or ends with separator
    }
    const parts = trimmed.split( /[\/-]/ );
    if ( parts.length === 2 ) {
        return null; // Incomplete date (only 2 parts)
    }
    if ( parts.length > 3 ) {
        return null; // Too many parts
    }
    // Epoch millis (or large numeric). NOTE: if you pass seconds, you'll get 1970 dates.
    if ( formatHint === "MILLIS" || /^\d{10,}$/.test( trimmed ) ) {
        const n = Number( trimmed );
        if ( Number.isFinite( n ) ) {
            const d = new Date( n );
            return isNaN( d.getTime() ) ? null : d;
        }
    }
    // Native ISO/RFC3339 paths
    const native = new Date( trimmed );
    if ( !isNaN( native.getTime() ) ) return native;
    // Numeric slash/dash formats
    const looksNumericSlash = /^\d{1,4}[\/-]\d{1,2}[\/-]\d{1,4}$/.test( trimmed );
    if ( looksNumericSlash ) {
        const parts = getValuesFromDateFormatLite( trimmed, formatHint );
        if ( parts?.year && parts?.month && parts?.day ) {
            const y = Number(
                parts.year.length === 2 ? `20${parts.year}` : parts.year
            );
            const m = Number( parts.month );
            const d = Number( parts.day );
            // Validate month range (1-12)
            if ( m < 1 || m > 12 ) {
                return null;
            }
            // Validate day range based on month
            const daysInMonth = new Date( y, m, 0 ).getDate(); // Gets last day of month
            if ( d < 1 || d > daysInMonth ) {
                return null;
            }
            const dt = new Date( y, m - 1, d );
            return isNaN( dt.getTime() ) ? null : dt;
        }
    }
    // Locale text-month formats (e.g., "Mai 19, 2026", "27 mai 2026", "15 junio 2026", Arabic month names)
    const localeTextDate = parseLocaleTextMonthDate( trimmed );
    if ( localeTextDate ) {
        return localeTextDate;
    }
    return null;
}
/** Full month name from a numeric month string ("1".."12"). */
export function getFullMonth( month: string ): string {
    const names = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const idx = parseInt( month, 10 ) - 1;
    return names[idx] || "";
}
function formatPrettyDate( d: Date | null ): string {
    if ( !d ) return "";
    const monthName = getFullMonth( String( d.getMonth() + 1 ) );
    return `${monthName} ${d.getDate()}, ${d.getFullYear()}`;
}
/** Parses then formats to "Month D, YYYY" */
export function formatSmartDate( input?: string, formatHint?: string ): string {
    return formatPrettyDate( safeParseDXDate( input, formatHint ) );
}
/** Simple long-date formatter for already-valid date strings. */
export function formatDate( dateString?: string, locale = "en-US" ): string {
    if ( !dateString ) return "";
    const d = new Date( dateString );
    if ( isNaN( d.getTime() ) ) return dateString;
    return new Intl.DateTimeFormat( locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    } ).format( d );
}
/* ------------------------------- URL utils -------------------------------- */
/**
 * Returns true when a provided "image URL" is unusable (null/blank/"null"/"undefined"/"#"/"about:blank"/bad scheme).
 */
export function isFalsyImageUrl( url?: string | null ): boolean {
    if ( url == null ) return true;
    const s = String( url ).trim().toLowerCase();
    if ( !s ) return true;
    if ( s === "null" || s === "undefined" || s === "#" || s === "about:blank" )
        return true;
    // Only allow http(s), data:, blob:, root-relative, or relative paths
    if ( !/^(https?:\/\/|data:|blob:|\.\/|\/)/i.test( s ) ) return true;
    return false;
}
/* ------------------------------ Numbers & Tags ---------------------------- */
/** Coerces many inputs to number with fallback; accepts "1 234,56" → 1234.56, "42" → 42. */
export function toNumber( value: unknown, fallback = 0 ): number {
    if ( value == null ) return fallback;
    if ( typeof value === "number" )
        return Number.isFinite( value ) ? value : fallback;
    if ( typeof value === "string" ) {
        const cleaned = value.trim().replace( /\s+/g, "" ).replace( ",", "." );
        const n = Number.parseFloat( cleaned );
        return Number.isFinite( n ) ? n : fallback;
    }
    const n = Number( value as any );
    return Number.isFinite( n ) ? n : fallback;
}
/** Parses AND-style tags: "a+b+c" → ["a","b","c"] (lowercased, trimmed). */
export function parsePlusSeparatedTags( input?: string ): string[] {
    if ( !input ) return [];
    return String( input )
        .split( "+" )
        .map( ( t ) => t.trim().toLowerCase() )
        .filter( Boolean );
}
/** Normalizes tags from string/array; accepts comma- or plus-separated strings. */
export function toTagArray( tags: unknown ): string[] {
    if ( Array.isArray( tags ) ) {
        return tags
            .map( ( t ) => ( t == null ? "" : String( t ) ) )
            .map( ( t ) => t.trim() )
            .filter( Boolean );
    }
    if ( typeof tags === "string" ) {
        const delim = tags.includes( "+" ) ? "+" : ",";
        return tags
            .split( delim )
            .map( ( t ) => t.trim() )
            .filter( Boolean );
    }
    return [];
}
/* ------------------------------- Type guards ------------------------------ */
export function hasValidTaxonomyProps( properties: any ): boolean {
    return (
        properties != null &&
        typeof properties === "object" &&
        "totalItems" in properties &&
        "filterType" in properties
    );
}
export function hasValidPaginationProps( properties: any ): boolean {
    return !!(
        properties?.paginationProps &&
        "sets" in properties.paginationProps &&
        Array.isArray( properties.paginationProps.sets ) &&
        properties.paginationProps.sets.length > 0 &&
        "active" in properties.paginationProps &&
        "activeSet" in properties.paginationProps
    );
}
