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
import { StoryFn, Meta } from '@storybook/react-webpack5';
import CECPagination from './CECPagination';
export default {
    title: "Components/CEC/CECPagination",
    component: CECPagination,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        currentPage: {
            control: { type: 'number', min: 1 },
            description: 'Current active page',
        },
        totalPages: {
            control: { type: 'number', min: 1 },
            description: 'Total number of pages',
        },
        variant: {
            control: 'select',
            options: ['default', 'compact', 'bullets'],
            description: 'Pagination variant',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Pagination size',
        },
        disabled: {
            control: 'boolean',
            description: 'Disable pagination controls',
        },
        showItemsPerPageDropdown: {
            control: 'boolean',
            description: 'Show items per page dropdown',
        },
        showPageInfo: {
            control: 'boolean',
            description: 'Show page information',
        },
        dir: {
            control: 'select',
            options: ['ltr', 'rtl'],
            description: 'Text direction',
        },
    },
} as Meta<typeof CECPagination>;
const Template: StoryFn<typeof CECPagination> = ( args ) => {
    const [currentPage, setCurrentPage] = React.useState( args.currentPage || 1 );
    const [itemsPerPage, setItemsPerPage] = React.useState( args.itemsPerPage || 5 );
    const handlePageChange = ( page: number ) => {
        setCurrentPage( page );
        console.log( 'Page changed to:', page );
    };
    const handleItemsPerPageChange = ( newItemsPerPage: number ) => {
        setItemsPerPage( newItemsPerPage );
    };
    return (
        <CECPagination
            {...args}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
        />
    );
};
export const Default = Template.bind( {} );
Default.args = {
    currentPage: 1,
    totalPages: 10,
    itemsPerPage: 3,
    totalItems: 50,
};
export const Compact = Template.bind( {} );
Compact.args = {
    ...Default.args,
    variant: 'compact',
};
export const Bullets = Template.bind( {} );
Bullets.args = {
    ...Default.args,
    variant: 'bullets',
};
export const SmallSize = Template.bind( {} );
SmallSize.args = {
    ...Default.args,
    size: 'sm',
};
export const LargeSize = Template.bind( {} );
LargeSize.args = {
    ...Default.args,
    size: 'lg',
};
export const Disabled = Template.bind( {} );
Disabled.args = {
    ...Default.args,
    disabled: true,
};
export const WithItemsPerPage = Template.bind( {} );
WithItemsPerPage.args = {
    ...Default.args,
    showItemsPerPageDropdown: true,
    showPageInfo: true,
    onItemsPerPageChange: ( itemsPerPage: number ) => console.log( 'Items per page changed:', itemsPerPage ),
};
export const WithoutPageInfo = Template.bind( {} );
WithoutPageInfo.args = {
    ...Default.args,
    showPageInfo: false,
};
export const RTL = Template.bind( {} );
RTL.args = {
    ...Default.args,
    dir: 'rtl',
};
export const ManyPages = Template.bind( {} );
ManyPages.args = {
    currentPage: 5,
    totalPages: 50,
    itemsPerPage: 10,
    totalItems: 500,
    startIndex: 40,
    endIndex: 50,
};
export const EllipsisTest = Template.bind( {} );
EllipsisTest.args = {
    currentPage: 10,
    totalPages: 20,
    itemsPerPage: 5,
    totalItems: 100,
    startIndex: 45,
    endIndex: 50,
};
export const DebugStory = Template.bind( {} );
DebugStory.args = {
    currentPage: 1,
    totalPages: 10,
    itemsPerPage: 5,
    totalItems: 50,
    startIndex: 0,
    endIndex: 5,
};
DebugStory.parameters = {
    docs: {
        description: {
            story: 'Debug story to test pagination functionality. Check the browser console for click events.'
        }
    }
};
export const SinglePage = Template.bind( {} );
SinglePage.args = {
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 8,
    startIndex: 0,
    endIndex: 8,
};
export const CustomMessages = Template.bind( {} );
CustomMessages.args = {
    ...Default.args,
    messages: {
        previous: 'Précédent',
        next: 'Suivant',
        itemsPerPage: 'Éléments par page',
        showing: 'Affichage',
        of: 'sur',
        entries: 'éléments',
    },
};
export const CustomAriaLabels = Template.bind( {} );
CustomAriaLabels.args = {
    ...Default.args,
    ariaLabels: {
        previous: 'Page précédente',
        next: 'Page suivante',
        page: ( page: number ) => `Aller à la page ${page}`,
        itemsPerPage: 'Éléments par page',
        showing: 'Affichage',
        of: 'sur',
    },
};
export const Interactive = Template.bind( {} );
Interactive.args = {
    currentPage: 1,
    totalPages: 10,
    itemsPerPage: 5,
    totalItems: 50,
    onPageChange: ( page: number ) => console.log( 'Page changed to:', page ),
    onItemsPerPageChange: ( itemsPerPage: number ) => console.log( 'Items per page changed to:', itemsPerPage ),
};
export const ItemsPerPage3 = Template.bind( {} );
ItemsPerPage3.args = {
    currentPage: 1,
    totalPages: 10,
    itemsPerPage: 3,
    totalItems: 50,
    onPageChange: ( page: number ) => console.log( 'Page changed to:', page ),
    onItemsPerPageChange: ( itemsPerPage: number ) => console.log( 'Items per page changed to:', itemsPerPage ),
};
export const ItemsPerPage24 = Template.bind( {} );
ItemsPerPage24.args = {
    currentPage: 1,
    totalPages: 10,
    itemsPerPage: 24,
    totalItems: 50,
    onPageChange: ( page: number ) => console.log( 'Page changed to:', page ),
    onItemsPerPageChange: ( itemsPerPage: number ) => console.log( 'Items per page changed to:', itemsPerPage ),
};
// Responsive examples
export const ResponsiveMobile = Template.bind( {} );
ResponsiveMobile.parameters = {
    viewport: {
        defaultViewport: 'mobile1',
    },
};
ResponsiveMobile.args = {
    ...Default.args,
    totalPages: 15,
};
export const ResponsiveTablet = Template.bind( {} );
ResponsiveTablet.parameters = {
    viewport: {
        defaultViewport: 'tablet',
    },
};
ResponsiveTablet.args = {
    ...Default.args,
    totalPages: 15,
};
// Accessibility examples
export const HighContrast = Template.bind( {} );
HighContrast.parameters = {
    backgrounds: { default: 'dark' },
};
HighContrast.args = {
    ...Default.args,
};
// Edge cases
export const LargePageNumbers = Template.bind( {} );
LargePageNumbers.args = {
    currentPage: 25,
    totalPages: 100,
    itemsPerPage: 20,
    totalItems: 2000,
    startIndex: 480,
    endIndex: 500,
};
export const NoItemsPerPage = Template.bind( {} );
NoItemsPerPage.args = {
    ...Default.args,
    showItemsPerPageDropdown: false,
};
export const CompactWithManyPages = Template.bind( {} );
CompactWithManyPages.args = {
    currentPage: 3,
    totalPages: 20,
    variant: 'compact',
};
export const BulletsWithManyPages = Template.bind( {} );
BulletsWithManyPages.args = {
    currentPage: 2,
    totalPages: 8,
    variant: 'bullets',
};
