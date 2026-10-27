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

import React from "react";
import "./DXGenericCatalogStories.scss";
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXGenericCatalog, { GenericCatalogProps, CatalogPaginationProps } from "./DXGenericCatalog";
import { EmptyStateProps } from "../DXEmptyState/DXEmptyState";
import { accordionCards, appCards, basicCards, cardButtons, directoryCards, eventCards, eventItemCard, fullImageCards, jiraTaskCards, newsCards, profileCards, projectCards, socialCards, straightCards } from "./utilities/CatalogItems";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Lists, Catalogs, and Filters/Generic Catalog",
    component: DXGenericCatalog,
    excludeStories: /.*Args$/,
} as Meta<typeof DXGenericCatalog>;

const Template: StoryFn<typeof DXGenericCatalog> = ( args ) => <DXGenericCatalog {...args} />;
const AccordionTemplate: StoryFn<typeof DXGenericCatalog> = ( args ) => (
    <div id='accordionCatalog'>
        <DXGenericCatalog {...args} />
    </div>
);

export const AppCardCatalog = Template.bind( {} );
export const AccordionCardCatalog = AccordionTemplate.bind( {} );
export const BasicCardCatalog = Template.bind( {} );
export const CardButtonCatalog = Template.bind( {} );
export const DirectoryCardCatalog = Template.bind( {} );
export const EventCardCatalog = Template.bind( {} );
export const EventItemCardCatalog = Template.bind( {} );
export const FullImageCardCatalog = Template.bind( {} );
export const JiraTaskCardCatalog = Template.bind( {} );
export const NewsCardCatalog = Template.bind( {} );
export const ProfileCardCatalog = Template.bind( {} );
export const ProjectCardCatalog = Template.bind( {} );
export const SocialCardCatalog = Template.bind( {} );
export const StraightCardCatalog = Template.bind( {} );
export const EmptyCatalog = Template.bind( {} );

const paginationProps: CatalogPaginationProps = {
    sets: ["2", "4", "12"],
    active: 1,
    activeSet: 4,
};

const emptyProps: EmptyStateProps = {
    title: "No items to display in the catalog",
    text: "Modify the filters to retrieve some content",
    image: {
        url: "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        altText: "No items to list"
    }
};

export const basicCardCatalogArgs: GenericCatalogProps = {
    filter: {
        filters: [
            {
                type: "select",
                attribute: 'country',
                label: "Country"
            },
            {
                type: "select",
                attribute: 'scope',
                label: "Scope"
            },
            {
                type: "select",
                attribute: 'subject',
                label: "Subject"
            }
        ]
    },
    body: {
        items: basicCards,
        componentType: "DXCard",
        elementsPerRow: 4,
        empty: emptyProps
    },
    pagination: paginationProps,
};

const cardButtonCatalogArgs: GenericCatalogProps = {
    filter: {
        filters: [
            {
                type: "select",
                attribute: 'topic',
                label: "Topic"
            }
        ]
    },
    body: {
        items: cardButtons,
        componentType: "DXCardButton",
        elementsPerRow: 4,
        empty: emptyProps
    },
    pagination: paginationProps
};

const appCardCatalogArgs: GenericCatalogProps = {
    filter: {
        filters: [
            {
                type: "select",
                attribute: 'topic',
                label: "App Type"
            }
        ]
    },
    body: {
        items: appCards,
        componentType: "DXAppCard",
        elementsPerRow: 6,
        empty: emptyProps
    },
    pagination: {
        sets: ["6", "12"],
        active: 1,
        activeSet: 6,
    }
};

export const accordionCardCatalogArgs: GenericCatalogProps = {
    filter: {
        filters: [
            {
                type: "select",
                attribute: 'subject',
                label: "Subject"
            }
        ]
    },
    body: {
        items: accordionCards,
        componentType: "DXAccordion",
        elementsPerRow: 1,
        empty: emptyProps
    },
    pagination: paginationProps
};

const directoryCardCatalogArgs: GenericCatalogProps = {
    filter: {
        filters: [
            {
                type: "select",
                attribute: 'department',
                label: "Department"
            }
        ]
    },
    body: {
        items: directoryCards,
        componentType: "DXDirectoryCard",
        elementsPerRow: 1,
        empty: emptyProps
    },
    pagination: paginationProps
};

const eventCardCatalogArgs: GenericCatalogProps = {
    filter: {
        filters: [
            {
                type: "select",
                attribute: 'month',
                label: "Month"
            },
            {
                type: "select",
                attribute: 'eventType',
                label: "Event Type"
            }
        ]
    },
    body: {
        items: eventCards,
        componentType: "DXEvent",
        elementsPerRow: 4,
        empty: emptyProps
    },
    pagination: paginationProps
};

const eventItemCardCatalogArgs: GenericCatalogProps = {
    filter: {
        filters: [
            {
                type: "select",
                label: "Month",
                attribute: "month"
            }
        ],
        search: {
            label: "Search",
            placeholder: "Input your text here"
        }
    },
    body: {
        items: eventItemCard,
        componentType: "DXEventItem",
        elementsPerRow: 4,
        empty: emptyProps
    },
    pagination: paginationProps,
};

const fullImageCardCatalogArgs: GenericCatalogProps = {
    filter: {
        filters: [
            {
                type: "select",
                attribute: 'subject',
                label: "Subject"
            }
        ]
    },
    body: {
        items: fullImageCards,
        componentType: "DXFullImageCard",
        elementsPerRow: 4,
        empty: emptyProps
    },
    pagination: paginationProps
};

const jiraTaskCardCatalogArgs: GenericCatalogProps = {
    filter: {
        filters: [
            {
                type: "select",
                label: "Department",
                attribute: "department"
            }
        ],
        search: {
            label: "Search",
            placeholder: "Input your text here"
        }
    },
    body: {
        items: jiraTaskCards,
        componentType: "DXJiraTaskCard",
        elementsPerRow: 1,
        empty: emptyProps
    },
    pagination: paginationProps,
};

const newsCardCatalogArgs: GenericCatalogProps = {
    filter: {
        filters: [
            {
                type: "select",
                attribute: 'contentType',
                label: "Type"
            },
            {
                type: "select",
                attribute: "month",
                label: "Month"
            }
        ]
    },
    body: {
        items: newsCards,
        componentType: "DXNewsCard",
        elementsPerRow: 1,
        empty: emptyProps
    },
    pagination: paginationProps
};

const profileCardCatalogArgs: GenericCatalogProps = {
    filter: {
        filters: [
            {
                type: "select",
                attribute: 'role',
                label: "Role"
            }
        ]
    },
    body: {
        items: profileCards,
        componentType: "DXProfileCard",
        elementsPerRow: 6,
        empty: emptyProps
    },
    pagination: {
        sets: ["6", "12"],
        active: 1,
        activeSet: 6
    },
};

const projectCardCatalogArgs: GenericCatalogProps = {
    filter: {
        filters: [
            {
                type: "select",
                attribute: 'department',
                label: "Department"
            }
        ]
    },
    body: {
        items: projectCards,
        componentType: "DXProjectCard",
        elementsPerRow: 1,
        empty: emptyProps
    },
    pagination: paginationProps
};

const socialCardCatalogArgs: GenericCatalogProps = {
    filter: {
        filters: [
            {
                type: "select",
                attribute: "category",
                label: "Article category",

            }
        ],
        search: {
            label: "Search",
            placeholder: "Input your text here"
        }
    },
    body: {
        items: socialCards,
        componentType: "DXSocialCard",
        elementsPerRow: 4,
        empty: emptyProps
    },
    pagination: paginationProps,
};

const straightCardCatalogArgs: GenericCatalogProps = {
    filter: {
        filters: [
            {
                type: "select",
                attribute: 'entryType',
                label: "Entry Type"
            },
            {
                type: "toggle",
                attribute: 'year',
                label: "Year"
            }
        ]
    },
    body: {
        items: straightCards,
        componentType: "DXStraightCard",
        elementsPerRow: 4,
        empty: emptyProps
    },
    pagination: paginationProps
};

const emptyCatalogArgs: GenericCatalogProps = {
    filter: {
        filters: [],
        search: {
            label: "Search",
            placeholder: "Input your text here"
        }
    },
    body: {
        items: [],
        componentType: "DXCard",
        elementsPerRow: 4,
        empty: emptyProps
    },
    pagination: paginationProps,
};

BasicCardCatalog.args = basicCardCatalogArgs;
AppCardCatalog.args = appCardCatalogArgs;
AccordionCardCatalog.args = accordionCardCatalogArgs;
CardButtonCatalog.args = cardButtonCatalogArgs;
DirectoryCardCatalog.args = directoryCardCatalogArgs;
EventCardCatalog.args = eventCardCatalogArgs;
EventItemCardCatalog.args = eventItemCardCatalogArgs;
FullImageCardCatalog.args = fullImageCardCatalogArgs;
JiraTaskCardCatalog.args = jiraTaskCardCatalogArgs;
SocialCardCatalog.args = socialCardCatalogArgs;
NewsCardCatalog.args = newsCardCatalogArgs;
ProfileCardCatalog.args = profileCardCatalogArgs;
ProjectCardCatalog.args = projectCardCatalogArgs;
StraightCardCatalog.args = straightCardCatalogArgs;
EmptyCatalog.args = emptyCatalogArgs;
