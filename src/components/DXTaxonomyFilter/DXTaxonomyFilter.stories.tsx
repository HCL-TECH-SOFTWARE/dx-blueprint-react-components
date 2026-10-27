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
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXTaxonomyFilter, { TaxonomyFilterProps } from './DXTaxonomyFilter';

export default {
    title: "Components/Lists, Catalogs, and Filters/Taxonomy Filter",
    component: DXTaxonomyFilter,
    excludeStories: /.*Args$/,
    parameters: {
        docs: {
            description: {
                component: 'The DXTaxonomyFilter component provides filtering functionality with search, multiple filter types, and a clear filters option. It supports select filters, toggle filters, and can show/hide the search functionality.'
            }
        }
    }
} as Meta<typeof DXTaxonomyFilter>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXTaxonomyFilter> = ( args ) => {
    const handleFilterItems = ( filters: any, editedFilter: any, addRemove: any ) => {
        console.log( 'Filter changed:', { filters, editedFilter, addRemove } );
    };

    const handleClearFilters = () => {
        console.log( 'All filters cleared' );
    };

    return (
        <DXTaxonomyFilter
            {...args}
            filterItems={handleFilterItems}
            onClearFilters={handleClearFilters}
        />
    );
};

export const TaxonomyFilter = Template.bind( {} );
export const TaxonomyNoSearch = Template.bind( {} );
export const TaxonomyNoFilters = Template.bind( {} );
export const TaxonomyFilterChangedIcons = Template.bind( {} );
export const TaxonomyFilterWithClearButton = Template.bind( {} );
export const TaxonomyFilterHiddenClearButton = Template.bind( {} );
export const TaxonomyFilterCustomClearLabel = Template.bind( {} );

export const taxonomyPropsArgs: TaxonomyFilterProps = {
    filters: [
        {
            type: "select",
            label: 'Country',
            values: ["Mexico", "USA"],
            attribute: "country"
        },
        {
            type: "select",
            label: 'Subject',
            values: ["Cinema", "Gossip"],
            attribute: "subject",
        },
        {
            type: "toggle",
            label: 'Scope',
            values: ["International", "National"],
            attribute: "scope"
        }
    ],
    filterItems: function ( selectedFilters: any, editedFilter: any, addRemove: any ) {},
    totalItems: 10,
    filteredCount: 10,
    searchLabel: "Search",
    searchPlaceholder: "Type what you're searching for"
};

TaxonomyFilter.args = taxonomyPropsArgs;

TaxonomyFilterChangedIcons.args = {
    ...taxonomyPropsArgs,
    icons: {
        filter: "ci-Hamburger_LG",
        filterClose: "ci-Close_LG"
    }
};

TaxonomyNoSearch.args = {
    ...taxonomyPropsArgs,
    hideSearch: true
};

TaxonomyNoFilters.args = {
    ...taxonomyPropsArgs,
    filters: []
};

TaxonomyFilterWithClearButton.args = {
    ...taxonomyPropsArgs,
    filteredCount: 5, // Show some filters are applied
    onClearFilters: function () {
        console.log( 'Clear all filters' );
    }
};

TaxonomyFilterHiddenClearButton.args = {
    ...taxonomyPropsArgs,
    hideClearFilters: true,
    filteredCount: 5
};

TaxonomyFilterCustomClearLabel.args = {
    ...taxonomyPropsArgs,
    filteredCount: 3,
    clearFiltersLabel: "Reset All Filters",
    onClearFilters: function () {
        console.log( 'Reset all filters with custom label' );
    }
};
