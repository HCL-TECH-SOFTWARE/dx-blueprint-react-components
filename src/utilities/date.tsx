/**
 *
 * Be sure that if you are using months or days without zeros, you should use the format
 * with the / separator
 */
export interface DateValues {
    year: string,
    month: string,
    day: string;
}

const validFormats =
    ["MM/DD/YY",
        "DD/MM/YY",
        "YY/MM/DD",
        "M/DD/YY",
        "DD/M/YY",
        "YY/M/DD",
        "MM/D/YY",
        "D/MM/YY",
        "YY/MM/D",
        "YY/M/D",
        "Mon/DD/YY",
        "DD/Mon/YY",
        "YY/Mon/DD",
        "Month/DD/YY",
        "DD/Month/YY",
        "YY/Month/DD",
        "MMDDYY",
        "DDMMYY",
        "YYMMDD",
        "MonDDYY",
        "DDMonYY",
        "YYMonDD",
        "MonthDDYY",
        "DDMonthYY",
        "YYMonthDD"];

const MONTHS = [
    {
        short: "Jan",
        long: "January",
        number: "01",
        prefix: "Jan"
    },
    {
        short: "Feb",
        long: "February",
        number: "02",
        prefix: "Feb"
    },
    {
        short: "March",
        long: "March",
        number: "03",
        prefix: "Mar"
    },
    {
        short: "April",
        long: "April",
        number: "04",
        prefix: "Apr"
    },
    {
        short: "May",
        long: "May",
        number: "05",
        prefix: "May"
    },
    {
        short: "June",
        long: "June",
        number: "06",
        prefix: "Jun"
    },
    {
        short: "July",
        long: "July",
        number: "07",
        prefix: "Jul"
    },
    {
        short: "Aug",
        long: "August",
        number: "08",
        prefix: "Aug"
    },
    {
        short: "Sep",
        long: "September",
        number: "09",
        prefix: "Sep"
    },
    {
        short: "Oct",
        long: "October",
        number: "10",
        prefix: "Oct"
    },
    {
        short: "Nov",
        long: "November",
        number: "11",
        prefix: "Nov"
    },
    {
        short: "Dec",
        long: "December",
        number: "12",
        prefix: "Dec"
    },
];
const getMonthFormat = ( format: string ) => {
    if ( format.indexOf( "Month" ) !== -1 ) return "long";
    if ( format.indexOf( "Mon" ) !== -1 ) return "short";
    if ( format.indexOf( "MM" ) !== -1 ) return "zeros";
    if ( format.indexOf( "M" ) !== -1 && format.includes( "/" ) ) return "no-zeros";
    return "zeros";
};

export const getValuesFromDateFormat = ( receivedDate: string, receivedFormat: string | undefined ) => {
    if ( receivedFormat && validFormats.indexOf( receivedFormat ) !== -1 ) {
        let format = receivedFormat;
        let date = "";

        // Veirify the month format
        let monthFormat = getMonthFormat( format );
        date = receivedDate;

        // We loop to get the positions
        let positions = [];
        let mPos = format.indexOf( "M" );
        let dPos = format.indexOf( "D" );
        let yPos = format.indexOf( "Y" );
        positions = [mPos, dPos, yPos].sort();
        let parts: any = {};
        for ( let i = 0, length = positions.length; i < length; i++ ) {
            switch ( positions[i] ) {
                case mPos:
                    parts[i] = {
                        part: "month",
                        format: monthFormat,
                    };
                    break;
                case dPos:
                    parts[i] = {
                        part: "day",
                        chars: 2,
                    };
                    break;
                case yPos:
                    parts[i] = {
                        part: "year",
                        chars: 4,
                    };
                    break;
                default:
                    break;
            }
        }

        // Begin value getting process
        let pos = 0;
        let month = "";
        let year = "";
        let day = "";
        if ( format.includes( "/" ) ) {
            let values = date.split( "/" );
            for ( let i = 0, length = values.length; i < length; i++ ) {
                if ( parts[i].part === "month" ) {
                    if ( parts[i].format === "short" || parts[i].format === "long" ) {
                        MONTHS.forEach( ( mth: any ) => {
                            if ( date.includes( mth[parts[i].format] ) ) {
                                month = mth[parts[i].format];
                            }
                        } );
                    } else {
                        month = values[i];
                    }
                }
                if ( parts[i].part === "year" ) {
                    year = values[i];
                }
                if ( parts[i].part === "day" ) {
                    day = values[i];
                }
            }
        } else {
            for ( let i = 0; i < 3; i++ ) {
                if ( parts[i].part === "month" ) {
                    if ( parts[i].format === "short" || parts[i].format === "long" ) {
                        MONTHS.forEach( ( mth: any ) => {
                            if ( date.includes( mth[parts[i].format] ) ) {
                                month = mth[parts[i].format];
                            }
                        } );
                        pos += month.length;
                    } else {
                        month = date.slice( pos, pos + 2 );
                        pos += month.length;
                    }
                }
                if ( parts[i].part === "year" ) {
                    year = date.slice( pos, pos + parts[i].chars );
                    pos += year.length;
                }
                if ( parts[i].part === "day" ) {
                    day = date.slice( pos, pos + parts[i].chars );
                    pos += day.length;
                }
            }
        }
        return {
            year,
            month,
            day,
        };
    } else {
        return {
            year: "Invalid",
            month: "Invalid",
            day: "Invalid"
        };
    }
};

export const getMonthPrefix = ( month: string ) => {
    let value = "";
    MONTHS.forEach( mth => {
        if ( mth.long === month || mth.short === month || mth.number.includes( month ) ) value = mth.prefix;
    } );
    return value;
};

export const getFullMonth = ( month: string ) => {
    let value = "";
    MONTHS.forEach( mth => {
        if ( mth.long === month || mth.short === month || mth.number.includes( month ) ) value = mth.long;
    } );
    return value;
};

export const getMomentDayShort = ( day: number ) => {
    if ( day === 0 ) return "Sun";
    if ( day === 1 ) return "Mon";
    if ( day === 2 ) return "Tu";
    if ( day === 3 ) return "Wed";
    if ( day === 4 ) return "Th";
    if ( day === 5 ) return "Fri";
    if ( day === 6 ) return "Sat";
    return "";
};
