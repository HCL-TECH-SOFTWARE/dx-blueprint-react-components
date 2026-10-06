import { ReactNode, CSSProperties } from 'react';
export type DateFormat = 'full' | 'short' | 'month-day' | 'time-only';
export type VariantType = 'featured' | 'river' | 'featured-compact';
export interface VariantDefaults {
    showDateRange: boolean;
    showDate: boolean;
    showLocation: boolean;
    showDescription: boolean;
    showTags: boolean;
    showActions: boolean;
    descriptionMaxLines: number;
    dateFormat: DateFormat;
    showSearch?: boolean;
    showFilters?: boolean;
}
export const CECEventVariant: Record<VariantType, VariantDefaults> = {
    featured: {
        showDateRange: true,
        showDate: true,
        showLocation: true,
        showDescription: true,
        showTags: true,
        showActions: true,
        descriptionMaxLines: 2,
        dateFormat: 'full',
        showSearch: true,
        showFilters: true,
    },
    river: {
        showDateRange: true,
        showDate: false,
        showLocation: false,
        showDescription: false,
        showTags: true,
        showActions: true,
        descriptionMaxLines: 1,
        dateFormat: 'full',
        showSearch: true,
        showFilters: true,
    },
    'featured-compact': {
        showDateRange: true,
        showDate: true,
        showLocation: true,
        showDescription: false,
        showTags: true,
        showActions: false,
        descriptionMaxLines: 1,
        dateFormat: 'full',
        showSearch: true,
        showFilters: true,
    }
} as const;
export interface CECEventAuthor {
    id: string;
    email: string;
    name: string;
    userState?: string;
    isExternal?: boolean;
}
export interface CECEventRecurrence {
    frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly' | '';
    interval?: number | null;
    byDay?: string;
    byDate?: string | number; // Day of month for monthly recurrence (from snx:byDate in XML)
    byMonthDay?: string;
    byMonth?: string;
    until?: string;
    count?: number;
    custom?: 'yes' | 'no';
    allDay?: '0' | '1';
    startDate: string;
    endDate?: string;
}
export interface CECEventData {
    id: string;
    eventUuid?: string;
    communityUuid?: string;
    title: string;
    description?: string;
    date?: string; // Primary date field
    category?: string | string[];
    author?: CECEventAuthor;
    contributor?: CECEventAuthor;
    location?: string;
    tags?: string | string[];
    recurrence?: CECEventRecurrence;
    links?: Array<{
        url: string;
        label?: string;
    }>;
    [key: string]: unknown;
}
export interface EventDate {
    shortMonth: string;
    month: string;
    day: string;
    dayOfWeek: string;
    year: string;
    hour?: string;
    minute?: string;
    second?: string;
}
export interface CECEventIcons {
    event?: string;
    featured?: string;
    location?: string;
    calendar?: string;
    register?: string;
}
export interface CECEventProps {
    event: CECEventData;
    variant?: 'featured' | 'river' | 'featured-compact';
    /** Text direction. Omit to inherit from the parent (CECUpcomingEvents passes its resolved direction). */
    dir?: 'ltr' | 'rtl';
    /**
     * Override the displayed occurrence date for the event.
     * When provided, the date badge will show this date instead of calculating from recurrence.
     * Useful when filtering by month to show the first occurrence in that specific month.
     */
    displayDate?: Date | string;
    showDateRange?: boolean;
    showDate?: boolean;
    showLocation?: boolean;
    showDescription?: boolean;
    showTags?: boolean;
    showActions?: boolean;
    customActions?: ReactNode;
    descriptionMaxLines?: number;
    elementsPerRow?: number;
    eventTime24hrFormat?: boolean;
    showRecurringIcon?: boolean;
    showTimeZone?: boolean;
    dateFormat?: DateFormat;
    formatDate?: ( date: Date, options?: Intl.DateTimeFormatOptions ) => string;
    className?: string;
    style?: CSSProperties;
    onClick?: ( event: React.MouseEvent<HTMLDivElement> ) => void;
    onEventClick?: ( event: CECEventData ) => void;
    _edit?: boolean;
    icons?: CECEventIcons;
}
