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
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import CECEvent from './CECEvent';
// Sample event data
import { CECEventData } from './CECEvent.types';
const sampleEvent: CECEventData = {
    "id": "urn:lsid:ibm.com:calendar:event:d7bd4d39-d9c8-4c73-ad4e-cee35ff1c7ab",
    "eventUuid": "d7bd4d39-d9c8-4c73-ad4e-cee35ff1c7ab",
    "title": "Range Event",
    "tags": "test4,test5,test2,test3,tezt1",
    "communityUuid": "53abe7a5-71a7-45ab-8677-5aa2b543001f",
    "date": "2026-02-02T07:36:51.000Z",
    "category": "event",
    "description": "<p dir=\"ltr\">Understanding on DX-Supported Automation Strategy for CECv2 Assets, Understanding on DX-Supported Automation Strategy for CECv2 Assets, Understanding on DX-Supported Automation Strategy for CECv2 Assets</p>",
    "location": "https://meet.google.com/aqt-cbqh-vuu",
    "isAllDay": "true",
    "author": {
        "id": "63c81a60-8409-103f-875e-e32f1ecc3eb0",
        "name": "Joe Jones1",
        "email": "jjones1@cnx.pnp-hcl.com"
    },
    "recurrence": {
        "startDate": "Feb 4, 2026, 7:45:00 AM GMT",
        "endDate": "Feb 4, 2026, 8:45:00 AM GMT",
        "frequency": "daily",
        "until": "2026-02-20T07:45:00.000Z",
        "byDay": "WE,TH,FR,MO,TU"
    }
};
const meta: Meta<typeof CECEvent> = {
    title: "Components/CEC/Event",
    component: CECEvent,
    tags: ['autodocs'],
    argTypes: {
        event: {
            control: 'object',
            description: 'Event data object',
        },
        variant: {
            control: 'select',
            options: ['featured', 'river', 'featured-compact'],
            description: 'Variant of the event card',
            defaultValue: 'featured',
        },
        showDateRange: {
            control: 'boolean',
            description: 'Show/hide date range display',
            defaultValue: true,
        },
        showDate: {
            control: 'boolean',
            description: 'Show/hide event date',
            defaultValue: true,
        },
        showLocation: {
            control: 'boolean',
            description: 'Show/hide event location',
            defaultValue: true,
        },
        showDescription: {
            control: 'boolean',
            description: 'Show/hide event description',
            defaultValue: true,
        },
        showTags: {
            control: 'boolean',
            description: 'Show/hide event tags',
            defaultValue: true,
        },
        showActions: {
            control: 'boolean',
            description: 'Show/hide action buttons',
            defaultValue: true,
        },
        descriptionMaxLines: {
            control: { type: 'number', min: 0 },
            description: 'Maximum length of the description text',
            defaultValue: 2,
        },
        elementsPerRow: {
            control: { type: 'number', min: 1, max: 6 },
            description: 'Number of events per row for responsive layout',
            defaultValue: 3,
        },
        showTimeZone: {
            control: 'boolean',
            description: 'Show/hide timezone in date display',
            defaultValue: false,
        },
        dateFormat: {
            control: 'select',
            options: ['full', 'short', 'month-day', 'time-only'],
            description: 'Format for displaying dates',
            defaultValue: 'full',
        },
        eventTime24hrFormat: {
            control: 'boolean',
            description: 'Use 24-hour time format',
            defaultValue: false,
        },
        showRecurringIcon: {
            control: 'boolean',
            description: 'Show recurring event icon',
            defaultValue: true,
        },
        className: {
            control: 'text',
            description: 'Additional CSS class name',
        },
        style: {
            control: 'object',
            description: 'Custom inline styles',
        },
        icons: {
            control: 'object',
            description: 'Custom icons to use in component',
        },
        onClick: {
            action: 'clicked',
            description: 'Callback when event is clicked',
        },
    },
    args: {
        event: sampleEvent,
        variant: 'featured',
        showDateRange: true,
        showDate: true,
        showLocation: true,
        showDescription: true,
        showTags: true,
        showActions: true,
        descriptionMaxLines: 2,
        elementsPerRow: 3,
        showTimeZone: false,
        dateFormat: 'full',
        eventTime24hrFormat: false,
        showRecurringIcon: true,
        className: '',
        style: {},
        icons: {},
    },
};
export default meta;
type Story = StoryObj<typeof CECEvent>;
export const Featured: Story = {
    args: {
        event: {
            ...sampleEvent,
            title: "Featured Event: Annual Tech Conference",
            category: "Conference",
            location: "San Francisco, CA",
            tags: "workshop,networking,product,training,test4,test5,test2,test3,test1",
        },
        variant: 'featured',
        showDate: true,
        showLocation: true,
        showDescription: true,
        showTags: true
    },
    parameters: {
        docs: {
            description: {
                story: 'A featured event card with all information, typically used as a highlight on a page',
            },
        },
    },
};
export const River: Story = {
    args: {
        event: {
            ...sampleEvent,
            title: "Weekly Team Meeting",
            category: "Meeting",
            location: "Virtual",
            tags: ["team", "meeting", "agile"]
        },
        variant: 'river',
        showDate: false,
        showLocation: false,
        showDescription: false,
        showTags: true,
        showActions: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'A compact river-style event card, typically used in lists or sidebars with minimal information',
            },
        },
    },
};
export const FeaturedCompact: Story = {
    args: {
        event: {
            ...sampleEvent,
            title: "Product Workshop",
            category: "Workshop",
            location: "Conference Room A",
            tags: ["workshop", "product", "training"]
        },
        variant: 'featured-compact',
        showDate: true,
        showLocation: true,
        showDescription: false,
        showTags: true,
        descriptionMaxLines: 2,
        showActions: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'A compact version of the featured card, showing just the essential information in a smaller footprint',
            },
        },
    },
};
export const NoDescription: Story = {
    args: {
        event: {
            ...sampleEvent,
            content: "",
        },
        showDescription: false,
    },
};
export const NoTags: Story = {
    args: {
        event: {
            ...sampleEvent,
            tags: [],
        },
        showTags: false,
    },
};
export const Clickable: Story = {
    args: {
        event: sampleEvent,
        onClick: () => {
            // This would typically navigate to the event detail page
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'A clickable event card that triggers an onClick handler',
            },
        },
    },
};
export const CustomStyles: Story = {
    args: {
        event: sampleEvent,
        style: {
            maxWidth: '400px',
            margin: '0 auto',
            // @ts-ignore - Custom CSS properties need to be ignored for TypeScript
            '--cec-event-accent': '#ff6b6b',
            // @ts-ignore - Custom CSS properties need to be ignored for TypeScript
            '--cec-event-bg': '#f8f9fa',
        } as React.CSSProperties,
    },
    parameters: {
        docs: {
            description: {
                story: 'Event card with custom styling using CSS variables',
            },
        },
    },
};
// Additional story with all features disabled
export const Minimal: Story = {
    args: {
        event: sampleEvent,
        showDate: false,
        showLocation: false,
        showDescription: false,
        showTags: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Minimal event card with only the title visible',
            },
        },
    },
};
// Add to your CECEvent.stories.tsx
export const WithRecurrence: Story = {
    args: {
        event: {
            ...sampleEvent,
            recurrence: {
                ...sampleEvent.recurrence,
                frequency: 'weekly',
                byDay: 'MO,WE,FR',
                until: '2025-12-31T16:00:00.000Z',
                startDate: '2025-10-27T09:00:00.000Z',  // Add start date
                endDate: '2025-11-07T17:00:00.000Z'     // Add end date (2 weeks later)
            }
        }
    }
};
export const WithCustomActions: Story = {
    args: {
        event: sampleEvent,
        customActions: (
            <button
                className="cec-event__action cec-event__action--secondary"
                onClick={( e ) => {
                    e.stopPropagation();
                    // Custom action handler
                }}
            >
                <span>Set Reminder</span>
            </button>
        )
    }
};
export const WithTimeZone: Story = {
    args: {
        event: sampleEvent,
        showTimeZone: true,
        variant: 'featured',
    },
    parameters: {
        docs: {
            description: {
                story: 'Event card with timezone display enabled',
            },
        },
    },
};
export const ShortDateFormat: Story = {
    args: {
        event: sampleEvent,
        dateFormat: 'short',
        variant: 'featured',
    },
    parameters: {
        docs: {
            description: {
                story: 'Event card with short date format',
            },
        },
    },
};
export const TimeOnlyFormat: Story = {
    args: {
        event: sampleEvent,
        dateFormat: 'time-only',
        variant: 'featured',
    },
    parameters: {
        docs: {
            description: {
                story: 'Event card with time-only format',
            },
        },
    },
};
export const WithCustomIcons: Story = {
    args: {
        event: sampleEvent,
        icons: {
            event: 'ci-Calendar',
            location: 'ci-Location',
            register: 'ci-Register',
        },
        variant: 'featured',
    },
    parameters: {
        docs: {
            description: {
                story: 'Event card with custom icons',
            },
        },
    },
};
export const ResponsiveLayout: Story = {
    args: {
        event: sampleEvent,
        elementsPerRow: 4,
        variant: 'featured',
    },
    parameters: {
        docs: {
            description: {
                story: 'Event card configured for 4-per-row layout',
            },
        },
    },
};
