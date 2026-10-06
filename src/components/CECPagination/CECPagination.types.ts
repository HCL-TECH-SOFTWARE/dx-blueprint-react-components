export const DEFAULT_ITEMS_PER_PAGE_OPTIONS = [3, 6, 12];
export const DEFAULT_MESSAGES = {
  previous: 'Previous',
  next: 'Next',
  page: 'Page',
  itemsPerPage: 'Items per page',
  showing: 'Showing',
  of: 'of',
  entries: 'entries',
};
export interface PaginationProps {
  // Basic pagination
  currentPage: number;
  totalPages: number;
  onPageChange: ( page: number ) => void;
  // Items per page (optional)
  itemsPerPage?: number;
  onItemsPerPageChange?: ( itemsPerPage: number ) => void;
  itemsPerPageOptions?: number[];
  // Data info (optional)
  totalItems?: number;
  startIndex?: number;
  endIndex?: number;
  // Customization
  variant?: 'default' | 'compact' | 'bullets';
  showItemsPerPageDropdown?: boolean;
  showPageInfo?: boolean;
  showPagination?: boolean;
  maxVisiblePages?: number;
  // Accessibility
  ariaLabels?: {
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
    page?: ( page: number ) => string;
    itemsPerPage?: string;
    showing?: string;
    of?: string;
  };
  // Styling
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  // Direction
  dir?: 'ltr' | 'rtl';
  // Localization
  locale?: string;
  messages?: {
    previous?: string;
    next?: string;
    page?: string;
    itemsPerPage?: string;
    showing?: string;
    of?: string;
    entries?: string;
  };
}
export interface PaginationVariantProps {
  currentPage: number;
  totalPages: number;
  onPageChange: ( page: number ) => void;
  className?: string;
  disabled?: boolean;
  dir?: 'ltr' | 'rtl';
  ariaLabels?: {
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
    page?: ( page: number ) => string;
  };
}
export interface DefaultVariantProps extends PaginationVariantProps {
  itemsPerPage?: number;
  onItemsPerPageChange?: ( itemsPerPage: number ) => void;
  itemsPerPageOptions?: number[];
  totalItems?: number;
  startIndex?: number;
  endIndex?: number;
  showItemsPerPageDropdown?: boolean;
  showPageInfo?: boolean;
  showPagination?: boolean;
  maxVisiblePages?: number;
  messages?: {
    previous?: string;
    next?: string;
    itemsPerPage?: string;
    showing?: string;
    of?: string;
    entries?: string;
  };
}
export interface CompactVariantProps extends PaginationVariantProps {
  messages?: {
    previous?: string;
    next?: string;
  };
}
export interface BulletsVariantProps extends PaginationVariantProps {
  position?: 'left' | 'center' | 'right';
}
