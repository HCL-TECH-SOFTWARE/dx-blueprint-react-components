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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
export interface DXIconProps {
    /**
     * Name of the icon to render (e.g., 'search', 'file-pdf', 'trash')
     * Maps to Bootstrap Icons naming convention
     */
    name: string;
    /**
     * Optional CSS class name for additional styling
     */
    className?: string;
    /**
     * Optional size variant: 'sm' | 'lg' | 'xl'
     */
    size?: 'sm' | 'lg' | 'xl';
    /**
     * Optional accessible label for screen readers
     */
    ariaLabel?: string;
    /**
     * Optional role attribute for accessibility
     */
    role?: string;
    /**
     * Optional title attribute for tooltips
     */
    title?: string;
    /**
     * Optional custom style object
     */
    style?: React.CSSProperties;
    /**
     * Optional test ID for testing
     */
    ['data-testid']?: string;
}
/**
 * Icon name mapping from legacy Clay icons to Bootstrap Icons
 * Used for backward compatibility during migration
 */
const ICON_NAME_MAP: { [key: string]: string; } = {
    // Clay icon names to Bootstrap icon names
    'search': 'search',
    'dx-file_pdf': 'file-pdf',
    'dx-file_doc': 'file-word',
    'dx-file_docx': 'file-word',
    'dx-file_xls': 'file-excel',
    'dx-file_xlsx': 'file-excel',
    'dx-file_ppt': 'file-powerpoint',
    'dx-file_pptx': 'file-powerpoint',
    'dx-file_zip': 'file-zip',
    'dx-file_rar': 'file-zip',
    'dx-file_png': 'file-image',
    'dx-file_jpg': 'file-image',
    'dx-file_svg': 'file-image',
    'dx-file_html': 'file-code',
    'dx-file_js': 'file-code',
    'dx-file_css': 'file-code',
    'dx-file_other': 'file-earmark',
    'download': 'download',
    'filter': 'funnel',
    'filter-close': 'x',
    'times': 'x',
    'close': 'x',
    'trash': 'trash',
    'edit': 'pencil',
    'check': 'check-lg',
    'exclamation': 'exclamation-triangle',
    'info': 'info-circle',
    'warning': 'exclamation-circle',
    'error': 'x-circle',
};
/**
 * Size class mapping for icon sizing
 */
const SIZE_CLASS_MAP: { [key: string]: string; } = {
    'sm': '',
    'lg': 'fs-5',
    'xl': 'fs-3',
};
/**
 * DXIcon Component
 *
 * A wrapper component around Bootstrap Icons that provides a consistent,
 * reusable icon interface across the application.
 *
 * @example
 * // Basic usage
 * <DXIcon name="search" />
 *
 * @example
 * // With size and accessibility
 * <DXIcon name="filter" size="lg" ariaLabel="Filter options" />
 *
 * @example
 * // With custom styling
 * <DXIcon name="download" className="custom-icon" style={{ color: 'blue' }} />
 */
const DXIcon: React.FC<DXIconProps> = ( {
    name,
    className = '',
    size = 'sm',
    ariaLabel,
    role,
    title,
    style,
    ...rest
} ) => {
    // Map legacy Clay icon names to Bootstrap icon names
    const bootstrapIconName = ICON_NAME_MAP[name] || name;
    // Build the complete class string
    const sizeClass = SIZE_CLASS_MAP[size] || '';
    const iconClasses = [
        'bi',
        `bi-${bootstrapIconName}`,
        sizeClass,
        className,
    ]
        .filter( Boolean )
        .join( ' ' );
    // Build accessibility attributes
    const a11yProps: { [key: string]: any; } = {};
    if ( ariaLabel ) {
        a11yProps['aria-label'] = ariaLabel;
    }
    if ( role ) {
        a11yProps['role'] = role;
    }
    if ( title ) {
        a11yProps['title'] = title;
    }
    return (
        <i
            className={iconClasses}
            style={style}
            {...a11yProps}
            {...rest}
        />
    );
};
export default DXIcon;
