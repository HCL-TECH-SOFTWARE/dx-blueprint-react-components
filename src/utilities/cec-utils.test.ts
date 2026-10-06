/* ============================================================================
 * HCL CEC utilities tests
 * File: src/utilities/cec-utils.test.ts
 * ==========================================================================*/
import {
    isDateFormat,
    safeParseDXDate,
    safeToISOString,
    detectInputLocale,
    normalizeLocaleNumerals,
    decodeHtmlEntities,
    stripHtml,
    extractFirstImageFromContent,
    generateSummary,
    isGifImageUrl,
    isFalsyImageUrl,
    toNumber,
    parsePlusSeparatedTags,
    toTagArray,
    hasValidTaxonomyProps,
    hasValidPaginationProps,
    unwrapDXProps,
    extractImageFromEncodedContent,
    getFullMonth,
    formatSmartDate,
    formatDate,
} from './cec-utils';
describe( 'cec-utils', () => {
    describe( 'isDateFormat', () => {
        test( 'validates date formats', () => {
            expect( isDateFormat( '15/01/2025', 'dd/MM/yyyy' ) ).toBe( true );
            expect( isDateFormat( '01/15/2025', 'MM/dd/yyyy' ) ).toBe( true );
            expect( isDateFormat( '2025-01-15', 'yyyy-MM-dd' ) ).toBe( true );
            expect( isDateFormat( '15-01-2025', 'dd-MM-yyyy' ) ).toBe( true );
            expect( isDateFormat( '15/01/25', 'dd/MM/yyyy' ) ).toBe( false );
            expect( isDateFormat( '2025/01/15', 'yyyy-MM-dd' ) ).toBe( false );
            expect( isDateFormat( 'invalid', 'dd/MM/yyyy' ) ).toBe( false );
        } );
        test( 'handles invalid inputs', () => {
            expect( isDateFormat( null as any, 'dd/MM/yyyy' ) ).toBe( false );
            expect( isDateFormat( undefined as any, 'dd/MM/yyyy' ) ).toBe( false );
            expect( isDateFormat( '15/01/2025', null as any ) ).toBe( false );
            expect( isDateFormat( '15/01/2025', undefined as any ) ).toBe( false );
            expect( isDateFormat( 123 as any, 'dd/MM/yyyy' ) ).toBe( false );
        } );
        test( 'handles whitespace', () => {
            expect( isDateFormat( ' 15/01/2025 ', 'dd/MM/yyyy' ) ).toBe( true );
            expect( isDateFormat( '15/01/2025  ', 'dd/MM/yyyy' ) ).toBe( true );
        } );
        test( 'handles unsupported formats', () => {
            expect( isDateFormat( '15/01/2025', 'invalid-format' ) ).toBe( false );
        } );
    } );
    describe( 'safeParseDXDate', () => {
        test( 'parses valid dates', () => {
            const result = safeParseDXDate( '2025-01-15' );
            expect( result ).toBeInstanceOf( Date );
            expect( result?.getFullYear() ).toBe( 2025 );
            expect( result?.getMonth() ).toBe( 0 ); // January
            expect( result?.getDate() ).toBe( 15 );
        } );
        test( 'handles null/undefined inputs', () => {
            expect( safeParseDXDate( null as any ) ).toBeNull();
            expect( safeParseDXDate( undefined as any ) ).toBeNull();
            expect( safeParseDXDate( '' ) ).toBeNull();
        } );
        test( 'handles non-string inputs gracefully', () => {
            expect( safeParseDXDate( 123 as any ) ).toBeNull();
            expect( safeParseDXDate( {} as any ) ).toBeNull();
            expect( safeParseDXDate( [] as any ) ).toBeNull();
            expect( safeParseDXDate( true as any ) ).toBeNull();
        } );
        test( 'handles numeric timestamps', () => {
            const timestamp = Date.now();
            const result = safeParseDXDate( timestamp.toString(), 'MILLIS' );
            expect( result ).toBeInstanceOf( Date );
            expect( result?.getTime() ).toBe( timestamp );
        } );
        test( 'handles invalid dates', () => {
            expect( safeParseDXDate( 'invalid-date' ) ).toBeNull();
            expect( safeParseDXDate( 'not-a-date' ) ).toBeNull();
        } );
        test( 'handles different date formats with format hints', () => {
            // YYYY/MM/DD format
            const result1 = safeParseDXDate( '2024/01/15', 'YYYY/MM/DD' );
            expect( result1 ).toBeInstanceOf( Date );
            expect( result1?.getFullYear() ).toBe( 2024 );
            expect( result1?.getMonth() ).toBe( 0 ); // January
            expect( result1?.getDate() ).toBe( 15 );
            // DD/MM/YYYY format
            const result2 = safeParseDXDate( '15/01/2024', 'DD/MM/YYYY' );
            expect( result2 ).toBeInstanceOf( Date );
            expect( result2?.getFullYear() ).toBe( 2024 );
            expect( result2?.getMonth() ).toBe( 0 ); // January
            expect( result2?.getDate() ).toBe( 15 );
            // MM/DD/YY format
            const result3 = safeParseDXDate( '01/15/24', 'MM/DD/YY' );
            expect( result3 ).toBeInstanceOf( Date );
            expect( result3?.getFullYear() ).toBe( 2024 );
            expect( result3?.getMonth() ).toBe( 0 ); // January
            expect( result3?.getDate() ).toBe( 15 );
        } );
        test( 'handles edge case date formats', () => {
            // Single digit months/days
            const result1 = safeParseDXDate( '2024/1/5', 'YYYY/MM/DD' );
            expect( result1 ).toBeInstanceOf( Date );
            // Different separators
            const result2 = safeParseDXDate( '2024-01-15', 'YYYY-MM-DD' );
            expect( result2 ).toBeInstanceOf( Date );
            // Invalid format patterns
            expect( safeParseDXDate( '2024/01/15', 'INVALID' ) ).toBeInstanceOf( Date ); // Falls back to default
        } );
        test( 'handles malformed date strings', () => {
            expect( safeParseDXDate( '2024/13/01' ) ).toBeNull(); // Invalid month
            expect( safeParseDXDate( '2024/01/32' ) ).toBeNull(); // Invalid day
            expect( safeParseDXDate( 'not-a-date' ) ).toBeNull();
            expect( safeParseDXDate( '2024/01' ) ).toBeNull(); // Incomplete
            expect( safeParseDXDate( '2024/01/15/extra' ) ).toBeNull(); // Too many parts
        } );
        test( 'parses German text month with AM token', () => {
            const result = safeParseDXDate( 'Mai 19, 2026, 11:15:00 vorm. GMT' );
            expect( result ).toBeInstanceOf( Date );
            expect( result?.getFullYear() ).toBe( 2026 );
            expect( result?.getMonth() ).toBe( 4 );
            expect( result?.getDate() ).toBe( 19 );
        } );
        test( 'parses GMT timezone as UTC, not local time', () => {
            // When input contains "GMT", the time should be interpreted as UTC
            const result = safeParseDXDate( 'May 8, 2026, 8:30:00 AM GMT' );
            expect( result ).toBeInstanceOf( Date );
            // Verify the UTC time is preserved correctly
            expect( result?.toISOString() ).toBe( '2026-05-08T08:30:00.000Z' );
        } );
        test( 'parses French text month day-first', () => {
            const result = safeParseDXDate( '27 mai 2026 14:00' );
            expect( result ).toBeInstanceOf( Date );
            expect( result?.getFullYear() ).toBe( 2026 );
            expect( result?.getMonth() ).toBe( 4 );
            expect( result?.getDate() ).toBe( 27 );
        } );
        test( 'parses Spanish text month', () => {
            const result = safeParseDXDate( '15 junio 2026 10:30' );
            expect( result ).toBeInstanceOf( Date );
            expect( result?.getFullYear() ).toBe( 2026 );
            expect( result?.getMonth() ).toBe( 5 );
            expect( result?.getDate() ).toBe( 15 );
        } );
        test( 'parses Arabic text month with Arabic-Indic numerals', () => {
            const result = safeParseDXDate( '١٩ مايو ٢٠٢٦' );
            expect( result ).toBeInstanceOf( Date );
            expect( result?.getFullYear() ).toBe( 2026 );
            expect( result?.getMonth() ).toBe( 4 );
            expect( result?.getDate() ).toBe( 19 );
        } );
        test( 'parses Arabic month-first date with Arabic AM token (ص) and Greenwich (جرينتش)', () => {
            const result = safeParseDXDate( 'مايو ١٩, ٢٠٢٦, ١١:١٥:٠٠ ص جرينتش' );
            expect( result ).toBeInstanceOf( Date );
            expect( result?.getFullYear() ).toBe( 2026 );
            expect( result?.getMonth() ).toBe( 4 );
            expect( result?.getDate() ).toBe( 19 );
            expect( result?.getUTCHours() ).toBe( 11 );
            expect( result?.getUTCMinutes() ).toBe( 15 );
        } );
        test( 'parses Arabic month-first date with Arabic PM token (م)', () => {
            const result = safeParseDXDate( 'مايو ١٩, ٢٠٢٦, ١٢:٠٠:٠٠ م جرينتش' );
            expect( result ).toBeInstanceOf( Date );
            expect( result?.getFullYear() ).toBe( 2026 );
            expect( result?.getMonth() ).toBe( 4 );
            expect( result?.getUTCHours() ).toBe( 12 );
        } );
    } );
    describe( 'detectInputLocale', () => {
        test( 'detects German locale', () => {
            expect( detectInputLocale( 'Mai 19, 2026, 11:15:00 vorm. GMT' ) ).toBe( 'de-DE' );
        } );
        test( 'detects French locale', () => {
            expect( detectInputLocale( '27 mai 2026 14:00' ) ).toBe( 'fr-FR' );
        } );
        test( 'detects Spanish locale', () => {
            expect( detectInputLocale( '15 junio 2026 10:30' ) ).toBe( 'es-ES' );
        } );
        test( 'detects Arabic locale', () => {
            expect( detectInputLocale( '١٩ مايو ٢٠٢٦' ) ).toBe( 'ar-SA' );
        } );
        test( 'falls back to en-US', () => {
            expect( detectInputLocale( '2026-05-19T11:15:00Z' ) ).toBe( 'en-US' );
            expect( detectInputLocale( '' ) ).toBe( 'en-US' );
        } );
    } );
    describe( 'safeToISOString', () => {
        test( 'returns undefined for null/undefined input', () => {
            expect( safeToISOString( null ) ).toBeUndefined();
            expect( safeToISOString( undefined ) ).toBeUndefined();
            expect( safeToISOString( '' ) ).toBeUndefined();
        } );
        test( 'returns ISO string for valid Date object', () => {
            const date = new Date( '2025-01-15T10:00:00Z' );
            const result = safeToISOString( date );
            expect( result ).toBe( '2025-01-15T10:00:00.000Z' );
        } );
        test( 'returns ISO string for valid date string', () => {
            const result = safeToISOString( '2025-01-15T10:00:00Z' );
            expect( result ).toBe( '2025-01-15T10:00:00.000Z' );
        } );
        test( 'returns undefined for invalid date string', () => {
            const result = safeToISOString( 'invalid-date' );
            expect( result ).toBeUndefined();
        } );
        test( 'returns undefined for invalid Date object', () => {
            const invalidDate = new Date( 'invalid' );
            const result = safeToISOString( invalidDate );
            expect( result ).toBeUndefined();
        } );
        test( 'handles exceptions gracefully', () => {
            // Create a problematic input that might cause exceptions
            const problematicInput = { toString: () => { throw new Error( 'Test error' ); } };
            const result = safeToISOString( problematicInput as any );
            expect( result ).toBeUndefined();
        } );
        test( 'handles numeric timestamps', () => {
            const timestamp = 1642248000000; // This will be interpreted in local timezone
            const result = safeToISOString( timestamp );
            // Create expected result using the same timestamp to ensure timezone consistency
            const expected = new Date( timestamp ).toISOString();
            expect( result ).toBe( expected );
        } );
        test( 'handles zero timestamp', () => {
            const result = safeToISOString( 0 );
            expect( result ).toBe( '1970-01-01T00:00:00.000Z' );
        } );
        test( 'handles negative timestamps', () => {
            const result = safeToISOString( -86400000 ); // One day before epoch
            expect( result ).toBe( '1969-12-31T00:00:00.000Z' );
        } );
        test( 'handles Infinity inputs', () => {
            expect( safeToISOString( Infinity ) ).toBeUndefined();
            expect( safeToISOString( -Infinity ) ).toBeUndefined();
        } );
        test( 'handles very large numbers', () => {
            const largeNumber = Number.MAX_SAFE_INTEGER;
            const result = safeToISOString( largeNumber );
            expect( result ).toBeUndefined(); // Should return undefined for out-of-range dates
        } );
        test( 'handles NaN input', () => {
            expect( safeToISOString( NaN ) ).toBeUndefined();
        } );
        test( 'handles empty string input', () => {
            expect( safeToISOString( '' ) ).toBeUndefined();
        } );
        test( 'handles whitespace-only strings', () => {
            expect( safeToISOString( '   ' ) ).toBeUndefined();
        } );
    } );
    describe( 'decodeHtmlEntities', () => {
        test( 'decodes basic entities', () => {
            expect( decodeHtmlEntities( '&lt;test&gt;' ) ).toBe( '<test>' );
            expect( decodeHtmlEntities( '&amp;test' ) ).toBe( '&test' );
            expect( decodeHtmlEntities( '&quot;test&quot;' ) ).toBe( '"test"' );
        } );
        test( 'handles double encoding', () => {
            expect( decodeHtmlEntities( '&amp;amp;test' ) ).toBe( '&test' );
        } );
        test( 'handles null/undefined', () => {
            expect( decodeHtmlEntities( '' ) ).toBe( '' );
            expect( decodeHtmlEntities( null as any ) ).toBe( '' );
            expect( decodeHtmlEntities( undefined as any ) ).toBe( '' );
        } );
    } );
    describe( 'stripHtml', () => {
        test( 'strips html tags', () => {
            expect( stripHtml( '<p>Hello <strong>world</strong></p>' ) ).toBe( 'Hello world' );
        } );
        test( 'handles empty input', () => {
            expect( stripHtml( '' ) ).toBe( '' );
            expect( stripHtml( null as any ) ).toBe( '' );
        } );
    } );
    describe( 'isGifImageUrl', () => {
        test( 'identifies gif URLs and gif data URLs', () => {
            expect( isGifImageUrl( 'https://example.com/image.gif' ) ).toBe( true );
            expect( isGifImageUrl( 'https://example.com/image.gif?size=lg#hero' ) ).toBe( true );
            expect( isGifImageUrl( 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBA==' ) ).toBe( true );
        } );
        test( 'ignores non-gif URLs', () => {
            expect( isGifImageUrl( 'https://example.com/image.jpg' ) ).toBe( false );
            expect( isGifImageUrl( './images/photo.png' ) ).toBe( false );
            expect( isGifImageUrl( '' ) ).toBe( false );
            expect( isGifImageUrl( null ) ).toBe( false );
        } );
    } );
    describe( 'extractFirstImageFromContent', () => {
        test( 'keeps gif image when filename does not contain Emoticon', () => {
            const content = '<p><img src="https://example.com/animated.gif" /><img src="https://example.com/cover.jpg" /></p>';
            expect( extractFirstImageFromContent( content ) ).toBe( 'https://example.com/animated.gif' );
        } );
        test( 'skips gif image when filename contains Emoticon and returns next image', () => {
            const content = '<p><img src="https://example.com/animated-Emoticon.gif" /><img src="https://example.com/cover.jpg" /></p>';
            expect( extractFirstImageFromContent( content ) ).toBe( 'https://example.com/cover.jpg' );
        } );
        test( 'returns null when only blocked gif-emoticon images are present', () => {
            const content = '<p><img src="https://example.com/animated-Emoticon.gif" /></p>';
            expect( extractFirstImageFromContent( content ) ).toBeNull();
        } );
    } );
    describe( 'isFalsyImageUrl', () => {
        test( 'identifies falsy URLs', () => {
            expect( isFalsyImageUrl( null ) ).toBe( true );
            expect( isFalsyImageUrl( '' ) ).toBe( true );
            expect( isFalsyImageUrl( 'null' ) ).toBe( true );
            expect( isFalsyImageUrl( 'undefined' ) ).toBe( true );
            expect( isFalsyImageUrl( '#' ) ).toBe( true );
            expect( isFalsyImageUrl( 'about:blank' ) ).toBe( true );
        } );
        test( 'accepts valid URLs', () => {
            expect( isFalsyImageUrl( 'https://example.com/image.jpg' ) ).toBe( false );
            expect( isFalsyImageUrl( 'data:image/png;base64,abc' ) ).toBe( false );
            expect( isFalsyImageUrl( 'blob:https://example.com/abc' ) ).toBe( false );
        } );
        test( 'accepts root-relative paths', () => {
            expect( isFalsyImageUrl( './images/cec/news-ai-analytics.svg' ) ).toBe( false );
            expect( isFalsyImageUrl( './images/photo.jpg' ) ).toBe( false );
            expect( isFalsyImageUrl( './static/media/image.png' ) ).toBe( false );
        } );
    } );
    describe( 'toNumber', () => {
        test( 'converts strings to numbers', () => {
            expect( toNumber( '123' ) ).toBe( 123 );
            expect( toNumber( '123.45' ) ).toBe( 123.45 );
            expect( toNumber( '1 234,56' ) ).toBe( 1234.56 );
        } );
        test( 'handles invalid inputs', () => {
            expect( toNumber( 'invalid' ) ).toBe( 0 );
            expect( toNumber( null ) ).toBe( 0 );
            expect( toNumber( undefined ) ).toBe( 0 );
        } );
    } );
    describe( 'toTagArray', () => {
        test( 'parses comma-separated tags', () => {
            expect( toTagArray( 'tag1,tag2,tag3' ) ).toEqual( ['tag1', 'tag2', 'tag3'] );
        } );
        test( 'parses plus-separated tags', () => {
            expect( toTagArray( 'tag1+tag2+tag3' ) ).toEqual( ['tag1', 'tag2', 'tag3'] );
        } );
        test( 'handles arrays', () => {
            expect( toTagArray( ['tag1', 'tag2', 'tag3'] ) ).toEqual( ['tag1', 'tag2', 'tag3'] );
        } );
        test( 'handles empty input', () => {
            expect( toTagArray( '' ) ).toEqual( [] );
            expect( toTagArray( null ) ).toEqual( [] );
            expect( toTagArray( undefined ) ).toEqual( [] );
        } );
    } );
    describe( 'hasValidTaxonomyProps', () => {
        test( 'validates taxonomy props', () => {
            expect( hasValidTaxonomyProps( { totalItems: 10, filterType: 'type' } ) ).toBe( true );
            expect( hasValidTaxonomyProps( { totalItems: 10 } ) ).toBe( false );
            expect( hasValidTaxonomyProps( null ) ).toBe( false );
        } );
    } );
    describe( 'hasValidPaginationProps', () => {
        test( 'validates pagination props', () => {
            const validProps = {
                paginationProps: {
                    sets: [{}, {}],
                    active: 0,
                    activeSet: 0
                }
            };
            expect( hasValidPaginationProps( validProps ) ).toBe( true );
            expect( hasValidPaginationProps( { paginationProps: { sets: [] } } ) ).toBe( false );
            expect( hasValidPaginationProps( null ) ).toBe( false );
        } );
    } );
    describe( 'normalizeLocaleNumerals', () => {
        test( 'returns ASCII-digit string unchanged', () => {
            expect( normalizeLocaleNumerals( '2026/05/09' ) ).toBe( '2026/05/09' );
            expect( normalizeLocaleNumerals( '12:30:00' ) ).toBe( '12:30:00' );
            expect( normalizeLocaleNumerals( '' ) ).toBe( '' );
        } );
        test( 'converts Arabic-Indic digits (U+0660-U+0669) to ASCII', () => {
            // ٢٠٢٦/٠٥/٠٩ = 2026/05/09
            expect( normalizeLocaleNumerals( '٢٠٢٦/٠٥/٠٩' ) ).toBe( '2026/05/09' );
        } );
        test( 'converts Extended Arabic-Indic digits (U+06F0-U+06F9) to ASCII', () => {
            // ۲۰۲۶/۰۵/۰۹ = 2026/05/09
            expect( normalizeLocaleNumerals( '۲۰۲۶/۰۵/۰۹' ) ).toBe( '2026/05/09' );
        } );
        test( 'preserves non-digit characters while normalizing digits', () => {
            expect( normalizeLocaleNumerals( 'Engage ٢٠٢٦' ) ).toBe( 'Engage 2026' );
        } );
    } );
    describe( 'safeParseDXDate - Arabic-Indic locale numerals', () => {
        test( 'parses a date string with Arabic-Indic numerals (2026/05/09)', () => {
            // ٢٠٢٦/٠٥/٠٩
            const result = safeParseDXDate( '٢٠٢٦/٠٥/٠٩', 'YYYY/MM/DD' );
            expect( result ).toBeInstanceOf( Date );
            expect( result?.getFullYear() ).toBe( 2026 );
            expect( result?.getMonth() ).toBe( 4 ); // May (0-indexed)
            expect( result?.getDate() ).toBe( 9 );
        } );
        test( 'parses a date string with Extended Arabic-Indic numerals (2026/05/12)', () => {
            // ۲۰۲۶/۰۵/۱۲
            const result = safeParseDXDate( '۲۰۲۶/۰۵/۱۲', 'YYYY/MM/DD' );
            expect( result ).toBeInstanceOf( Date );
            expect( result?.getFullYear() ).toBe( 2026 );
            expect( result?.getMonth() ).toBe( 4 ); // May
            expect( result?.getDate() ).toBe( 12 );
        } );
    } );
    describe( 'safeToISOString - Arabic-Indic locale numerals', () => {
        test( 'does not throw for Arabic-Indic date string (reproduces the RangeError fix)', () => {
            // Exact pattern that triggered: new Date("٢٠٢٦/٠٥/٠٩ ").toISOString() -> RangeError
            expect( () => safeToISOString( '٢٠٢٦/٠٥/٠٩ ' ) ).not.toThrow();
        } );
        test( 'returns a valid ISO string for a well-formed Arabic-Indic ISO string', () => {
            // ٢٠٢٦-٠٥-٠٩T١٢:٠٠:٠٠Z
            const result = safeToISOString( '٢٠٢٦-٠٥-٠٩T١٢:٠٠:٠٠Z' );
            expect( result ).toBe( '2026-05-09T12:00:00.000Z' );
        } );
    } );
} );
