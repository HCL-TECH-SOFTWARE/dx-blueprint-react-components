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

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import CECUpcomingEvents from './CECUpcomingEvents';
import type { CECEventData } from '../CECEvent/CECEvent.types';
// Sample event data
const sampleEvent: CECEventData = {
  'id': 'urn:lsid:ibm.com:calendar:event:7a21279e-3c3c-44ad-863d-3041e4d8cee1',
  'title': 'Recurrence Event',
  'communityUuid': 'a2bd51c7-d94c-4172-98c7-d7840b0345ec',
  'date': '2026-01-20T07:57:49.000Z',
  'category': 'event',
  'description': '<p dir="ltr">This is the HCL Engage event This is the HCL Engage event This is the HCL Engage event!</p>\n\n<p dir="ltr"></p>\n\n<h1 dir="ltr">ENGAGE 2026</h1>\n\n<h2 dir="ltr">Dribble past limits. Score innovation!</h2>\n\n<p dir="ltr">April 20-22 - Ghent, Belgium</p>\n\n<ul dir="ltr" id="sponsors"></ul>\n\n\n<section id="raised">\n<p>Get ready to kick off a new edition of Engage this April at the iconic KAA Gent football stadium!<br />\nJust like on the pitch, you\'ll discover winning strategies, fresh insights, and game-changing updates straight from the experts. Expand your knowledge, strengthen your network, and be part of a dynamic community.<br />\nDon\'t stay on the sidelines, join us and score big with Engage 2026!</p>\n</section>',
  'location': 'Pune, Maharashtra, India',
  'isAllDay': 'true',
  'author': {
    'id': '63c81a60-8409-103f-875e-e32f1ecc3eb0',
    'name': 'Joe Jones1',
    'email': 'joe.jones@example.com'
  },
  'recurrence': {
    'startDate': 'Jan 20, 2026, 8:00:00 AM GMT',
    'endDate': 'Jan 20, 2026, 9:00:00 AM GMT',
    'frequency': 'daily',
    'until': '2027-01-20T08:00:00.000Z',
    'byDay': 'TU,TH'
  },
  tags: 'hcl-engage, conference, tech, test1, test2, test3, test4, test5',
  links: [
    {
      url: 'https://example.com/communities/calendar/event?mode=summary&eventUuid=sample-event-001&lang=en',
      label: 'View Event'
    },
    {
      url: 'https://example.com/communities/calendar/event?eventUuid=sample-event-001',
      label: 'Edit Event'
    }
  ]
};
// Create multiple events for the list
const createEvents = ( count: number ): CECEventData[] => {
  return Array.from( { length: count }, ( _, i ) => {
    const startDate = new Date( Date.now() + ( i * 24 * 60 * 60 * 1000 ) );
    const endDate = new Date( Date.now() + ( i * 24 * 60 * 60 * 1000 ) + ( 2 * 24 * 60 * 60 * 1000 ) );
    const untilDate = new Date( startDate );
    untilDate.setFullYear( untilDate.getFullYear() + 2 );
    return {
      ...sampleEvent,
      id: `${sampleEvent.id}-${i + 1}`,
      eventUuid: `${sampleEvent.eventUuid}-${i + 1}`,
      title: `${sampleEvent.title} ${i + 1}`,
      date: startDate.toISOString(),
      endDate: endDate.toISOString(),
      recurrence: {
        ...sampleEvent.recurrence,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        until: untilDate.toISOString(),
      },
    };
  } );
};
let sampleEvents: CECEventData[] = createEvents( 10 );
const cnxData: CECEventData[] = [
  {
    'id': 'urn:lsid:ibm.com:calendar:event:d7bd4d39-d9c8-4c73-ad4e-cee35ff1c7ab',
    'eventUuid': 'd7bd4d39-d9c8-4c73-ad4e-cee35ff1c7ab',
    'title': 'Range Event',
    'tags': 'test4,test5,test2,test3,tezt1',
    'communityUuid': '53abe7a5-71a7-45ab-8677-5aa2b543001f',
    'date': '2026-02-02T07:36:51.000Z',
    'category': 'event',
    'description': '<p dir="ltr">Understanding on DX-Supported Automation Strategy for CECv2 Assets<br />\nMonday, February 2 - 5:30 - 6:30pm<br />\nTime zone: Asia/Kolkata<br />\nGoogle Meet joining info<br />\nVideo call link: <a href="https://meet.google.com/aqt-cbqh-vuu">https://meet.google.com/aqt-cbqh-vuu</a><br />\nOr dial: (US) &#43;1 414-909-4970 PIN: 516 643 407#<br />\nMore phone numbers: <a href="https://tel.meet/aqt-cbqh-vuu?pin&#61;1314466632623">https://tel.meet/aqt-cbqh-vuu?pin&#61;1314466632623</a></p>',
    'location': 'https://meet.google.com/aqt-cbqh-vuu',
    'isAllDay': 'true',
    'author': {
      'id': '63c81a60-8409-103f-875e-e32f1ecc3eb0',
      'name': 'Joe Jones1',
      'email': 'joe.jones@example.com'
    },
    'recurrence': {
      'startDate': 'Feb 4, 2026, 7:45:00 AM GMT',
      'endDate': 'Feb 4, 2026, 8:45:00 AM GMT',
      'frequency': 'daily',
      'until': '2026-02-20T07:45:00.000Z',
      'byDay': 'WE,TH,FR,MO,TU'
    }
  },
  {
    'id': 'urn:lsid:ibm.com:calendar:event:d7bd4d39-d9c8-4c73-ad4e-cee35ff1c7ab',
    'title': 'Range Event',
    'tags': 'test4,test5,test2,test3,tezt1',
    'communityUuid': '53abe7a5-71a7-45ab-8677-5aa2b543001f',
    'date': '2026-02-02T07:36:51.000Z',
    'category': 'event',
    'description': '<p dir="ltr">Understanding on DX-Supported Automation Strategy for CECv2 Assets<br />\nMonday, February 2 - 5:30 - 6:30pm<br />\nTime zone: Asia/Kolkata<br />\nGoogle Meet joining info<br />\nVideo call link: <a href="https://meet.google.com/aqt-cbqh-vuu">https://meet.google.com/aqt-cbqh-vuu</a><br />\nOr dial: (US) &#43;1 414-909-4970 PIN: 516 643 407#<br />\nMore phone numbers: <a href="https://tel.meet/aqt-cbqh-vuu?pin&#61;1314466632623">https://tel.meet/aqt-cbqh-vuu?pin&#61;1314466632623</a></p>',
    'location': 'https://meet.google.com/aqt-cbqh-vuu',
    'isAllDay': 'true',
    'author': {
      'id': '63c81a60-8409-103f-875e-e32f1ecc3eb0',
      'name': 'Joe Jones1',
      'email': 'joe.jones@example.com'
    },
    'recurrence': {
      'startDate': 'Feb 4, 2026, 7:45:00 AM GMT',
      'endDate': 'Feb 4, 2026, 8:45:00 AM GMT',
      'frequency': 'daily',
      'until': '2026-02-20T07:45:00.000Z',
      'byDay': 'WE,TH,FR,MO,TU'
    }
  },
  {
    'id': 'urn:lsid:ibm.com:calendar:event:302bab72-fc68-4e46-a842-6ac9645d1106',
    'title': 'Daily event',
    'tags': '',
    'communityUuid': '53abe7a5-71a7-45ab-8677-5aa2b543001f',
    'date': '2026-02-02T11:52:57.000Z',
    'category': 'event',
    'description': '<p dir="ltr"> </p>',
    'location': 'Pune',
    'isAllDay': 'true',
    'author': {
      'id': '63c81a60-8409-103f-875e-e32f1ecc3eb0',
      'name': 'Joe Jones1',
      'email': 'joe.jones@example.com'
    },
    'recurrence': {
      'startDate': 'Feb 9, 2026, 12:00:00 PM GMT',
      'endDate': 'Feb 9, 2026, 1:00:00 PM GMT',
      'frequency': 'daily',
      'until': '2026-02-23T12:00:00.000Z',
      'byDay': 'MO'
    }
  },
  {
    'id': 'urn:lsid:ibm.com:calendar:event:1fe94aed-afa9-44d5-b510-e510682fc816',
    'title': 'Bi-Weekly event',
    'tags': 'test4',
    'communityUuid': '53abe7a5-71a7-45ab-8677-5aa2b543001f',
    'date': '2026-02-02T11:36:33.000Z',
    'category': 'event',
    'description': '<p dir="ltr"> </p>',
    'location': 'Pune',
    'isAllDay': 'true',
    'author': {
      'id': '63c81a60-8409-103f-875e-e32f1ecc3eb0',
      'name': 'Joe Jones1',
      'email': 'joe.jones@example.com'
    },
    'recurrence': {
      'startDate': 'Feb 6, 2026, 11:45:00 AM GMT',
      'endDate': 'Feb 6, 2026, 12:45:00 PM GMT',
      'frequency': 'weekly',
      'until': '2026-05-01T11:45:00.000Z',
      'byDay': 'TU,TH'
    }
  },
  {
    'id': 'urn:lsid:ibm.com:calendar:event:ff4c3fda-3fb6-464c-b42e-171adb55404f',
    'title': 'Single Day Event',
    'tags': 'single,event,day',
    'communityUuid': '53abe7a5-71a7-45ab-8677-5aa2b543001f',
    'date': '2026-01-23T10:58:14.000Z',
    'category': 'event',
    'description': '<p dir="ltr">Single Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Single Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day Event</p>',
    'location': 'https://meet.google.com/kpu-istp-swh?lfhs=2',
    'isAllDay': 'true',
    'author': {
      'id': '63c81a60-8409-103f-875e-e32f1ecc3eb0',
      'name': 'Joe Jones1',
      'email': 'joe.jones@example.com'
    },
    'recurrence': {
      'startDate': 'Jan 26, 2026, 9:30:00 AM GMT',
      'endDate': 'Jan 26, 2026, 10:00:00 AM GMT',
      'frequency': '',
      'until': '',
      'byDay': ''
    }
  },
  {
    'id': 'urn:lsid:ibm.com:calendar:event:fb9285fe-6ab4-422d-abc7-38ef437f2135',
    'title': 'Weekly Catchup-Polaris',
    'tags': 'catchup,biweekly,polaris,weekly',
    'communityUuid': '53abe7a5-71a7-45ab-8677-5aa2b543001f',
    'date': '2026-01-23T10:14:27.000Z',
    'category': 'event',
    'description': '<p dir="ltr">testtest testtesttest testtestte sttesttest testtesttesttestt esttesttesttest testtest testtesttest testtestte sttesttest testtesttesttestt esttesttesttest</p>\n\n<p dir="ltr">testtesttesttesttesttesttesttest</p>',
    'location': 'Pune',
    'isAllDay': 'true',
    'author': {
      'id': '63c81a60-8409-103f-875e-e32f1ecc3eb0',
      'name': 'Joe Jones1',
      'email': 'joe.jones@example.com'
    },
    'recurrence': {
      'startDate': 'Jan 23, 2026, 5:00:00 AM GMT',
      'endDate': 'Jan 23, 2026, 5:30:00 AM GMT',
      'frequency': 'weekly',
      'until': '2026-04-30T05:00:00.000Z',
      'byDay': 'TU,TH'
    }
  },
  {
    'id': 'urn:lsid:ibm.com:calendar:event:06623ca1-15c6-4861-8035-affad4c76ae9',
    'title': 'Polaris Sales Event1',
    'tags': 'event1,hcl,test-fest,polaris,sales,connections',
    'communityUuid': '53abe7a5-71a7-45ab-8677-5aa2b543001f',
    'date': '2026-01-23T08:21:55.000Z',
    'category': 'event',
    'description': '<p dir="ltr">Polaris Sales Event1</p>',
    'location': 'Pune',
    'isAllDay': 'true',
    'author': {
      'id': '63c81a60-8409-103f-875e-e32f1ecc3eb0',
      'name': 'Joe Jones1',
      'email': 'joe.jones@example.com'
    },
    'recurrence': {
      'startDate': 'Jan 24, 2026, 8:30:00 AM GMT',
      'endDate': 'Jan 24, 2026, 10:30:00 AM GMT',
      'frequency': 'daily',
      'until': '2026-01-31T08:30:00.000Z',
      'byDay': 'MO,TU,WE,TH'
    }
  },
  {
    'id': 'urn:lsid:ibm.com:calendar:event:d7bd4d39-d9c8-4c73-ad4e-cee35ff1c7ab',
    'title': 'Range Event',
    'tags': 'test4,test5,test2,test3,tezt1',
    'communityUuid': '53abe7a5-71a7-45ab-8677-5aa2b543001f',
    'date': '2026-02-02T07:36:51.000Z',
    'category': 'event',
    'description': '<p dir="ltr">Understanding on DX-Supported Automation Strategy for CECv2 Assets<br />\nMonday, February 2 - 5:30 - 6:30pm<br />\nTime zone: Asia/Kolkata<br />\nGoogle Meet joining info<br />\nVideo call link: <a href="https://meet.google.com/aqt-cbqh-vuu">https://meet.google.com/aqt-cbqh-vuu</a><br />\nOr dial: (US) &#43;1 414-909-4970 PIN: 516 643 407#<br />\nMore phone numbers: <a href="https://tel.meet/aqt-cbqh-vuu?pin&#61;1314466632623">https://tel.meet/aqt-cbqh-vuu?pin&#61;1314466632623</a></p>',
    'location': 'https://meet.google.com/aqt-cbqh-vuu',
    'isAllDay': 'true',
    'author': {
      'id': '63c81a60-8409-103f-875e-e32f1ecc3eb0',
      'name': 'Joe Jones1',
      'email': 'joe.jones@example.com'
    },
    'recurrence': {
      'startDate': 'Feb 4, 2026, 7:45:00 AM GMT',
      'endDate': 'Feb 4, 2026, 8:45:00 AM GMT',
      'frequency': 'daily',
      'until': '2026-02-20T07:45:00.000Z',
      'byDay': 'WE,TH,FR,MO,TU'
    }
  },
  {
    'id': 'urn:lsid:ibm.com:calendar:event:ff4c3fda-3fb6-464c-b42e-171adb55404f',
    'title': 'Single Day Event',
    'tags': 'single,event,day',
    'communityUuid': '53abe7a5-71a7-45ab-8677-5aa2b543001f',
    'date': '2026-01-23T10:58:14.000Z',
    'category': 'event',
    'description': '<p dir="ltr">Single Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day Event</p>',
    'location': 'https://meet.google.com/kpu-istp-swh?lfhs=2',
    'isAllDay': 'true',
    'author': {
      'id': '63c81a60-8409-103f-875e-e32f1ecc3eb0',
      'name': 'Joe Jones1',
      'email': 'joe.jones@example.com'
    },
    'recurrence': {
      'startDate': 'Jan 26, 2026, 9:30:00 AM GMT',
      'endDate': 'Jan 26, 2026, 10:00:00 AM GMT',
      'frequency': '',
      'until': '',
      'byDay': ''
    }
  },
  {
    'id': 'urn:lsid:ibm.com:calendar:event:fb9285fe-6ab4-422d-abc7-38ef437f2135',
    'title': 'Weekly Catchup-Polaris',
    'tags': 'catchup,biweekly,polaris,weekly',
    'communityUuid': '53abe7a5-71a7-45ab-8677-5aa2b543001f',
    'date': '2026-01-23T10:14:27.000Z',
    'category': 'event',
    'description': '<p dir="ltr">  esttesttesttesttestte sttesttesttest testtesttest</p>\n\n<p dir="ltr">testtesttesttesttesttesttesttest</p>',
    'location': 'Pune',
    'isAllDay': 'true',
    'author': {
      'id': '63c81a60-8409-103f-875e-e32f1ecc3eb0',
      'name': 'Joe Jones1',
      'email': 'joe.jones@example.com'
    },
    'recurrence': {
      'startDate': 'Jan 23, 2026, 5:00:00 AM GMT',
      'endDate': 'Jan 23, 2026, 5:30:00 AM GMT',
      'frequency': 'weekly',
      'until': '2026-04-30T05:00:00.000Z',
      'byDay': 'TU,TH'
    }
  },
  {
    'id': 'urn:lsid:ibm.com:calendar:event:06623ca1-15c6-4861-8035-affad4c76ae9',
    'title': 'Polaris Sales Event1',
    'tags': 'event1,hcl,test-fest,polaris,sales,connections',
    'communityUuid': '53abe7a5-71a7-45ab-8677-5aa2b543001f',
    'date': '2026-01-23T08:21:55.000Z',
    'category': 'event',
    'description': '<p dir="ltr">Polaris Sales Event1</p>',
    'location': 'Pune',
    'isAllDay': 'true',
    'author': {
      'id': '63c81a60-8409-103f-875e-e32f1ecc3eb0',
      'name': 'Joe Jones1',
      'email': 'joe.jones@example.com'
    },
    'recurrence': {
      'startDate': 'Jan 24, 2026, 8:30:00 AM GMT',
      'endDate': 'Jan 24, 2026, 10:30:00 AM GMT',
      'frequency': 'daily',
      'until': '2026-01-31T08:30:00.000Z',
      'byDay': 'MO,TU,WE,TH'
    }
  },
  {
    'id': 'urn:lsid:ibm.com:calendar:event:ff4c3fda-3fb6-464c-b42e-171adb55404f',
    'title': 'Single Day Event',
    'tags': 'single,event,day',
    'communityUuid': '53abe7a5-71a7-45ab-8677-5aa2b543001f',
    'date': '2026-01-23T10:58:14.000Z',
    'category': 'event',
    'description': '<p dir="ltr">Single Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day EventSingle Day Event</p>',
    'location': 'https://meet.google.com/kpu-istp-swh?lfhs=2',
    'isAllDay': 'true',
    'author': {
      'id': '63c81a60-8409-103f-875e-e32f1ecc3eb0',
      'name': 'Joe Jones1',
      'email': 'joe.jones@example.com'
    },
    'recurrence': {
      'startDate': 'Jan 26, 2026, 9:30:00 AM GMT',
      'endDate': 'Jan 26, 2026, 10:00:00 AM GMT',
      'frequency': '',
      'until': '',
      'byDay': ''
    }
  },
  {
    'id': 'urn:lsid:ibm.com:calendar:event:fb9285fe-6ab4-422d-abc7-38ef437f2135',
    'title': 'Weekly Catchup-Polaris',
    'tags': 'catchup,biweekly,polaris,weekly',
    'communityUuid': '53abe7a5-71a7-45ab-8677-5aa2b543001f',
    'date': '2026-01-23T10:14:27.000Z',
    'category': 'event',
    'description': '<p dir="ltr">testtestte sttesttestt esttesttesttes ttesttesttesttest testtestt esttesttest</p>\n\n<p dir="ltr">testtesttesttesttesttesttesttest</p>',
    'location': 'Pune',
    'isAllDay': 'true',
    'author': {
      'id': '63c81a60-8409-103f-875e-e32f1ecc3eb0',
      'name': 'Joe Jones1',
      'email': 'joe.jones@example.com'
    },
    'recurrence': {
      'startDate': 'Jan 23, 2026, 5:00:00 AM GMT',
      'endDate': 'Jan 23, 2026, 5:30:00 AM GMT',
      'frequency': 'weekly',
      'until': '2026-04-30T05:00:00.000Z',
      'byDay': 'TU,TH'
    }
  },
  {
    'id': 'urn:lsid:ibm.com:calendar:event:06623ca1-15c6-4861-8035-affad4c76ae9',
    'title': 'Polaris Sales Event1',
    'tags': 'event1,hcl,test-fest,polaris,sales,connections',
    'communityUuid': '53abe7a5-71a7-45ab-8677-5aa2b543001f',
    'date': '2026-01-23T08:21:55.000Z',
    'category': 'event',
    'description': '<p dir="ltr">Polaris Sales Event1</p>',
    'location': 'Pune',
    'isAllDay': 'true',
    'author': {
      'id': '63c81a60-8409-103f-875e-e32f1ecc3eb0',
      'name': 'Joe Jones1',
      'email': 'joe.jones@example.com'
    },
    'recurrence': {
      'startDate': 'Jan 24, 2026, 8:30:00 AM GMT',
      'endDate': 'Jan 24, 2026, 10:30:00 AM GMT',
      'frequency': 'daily',
      'until': '2026-01-31T08:30:00.000Z',
      'byDay': 'MO,TU,WE,TH'
    }
  }
];
// merge transformedEvents into sampleEvents
sampleEvents = [...cnxData, ...sampleEvents];
const meta: Meta<typeof CECUpcomingEvents> = {
  title: 'Components/CEC/Upcoming Events',
  component: CECUpcomingEvents,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component to display a list of upcoming events with filtering and pagination capabilities.',
      },
    },
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['featured', 'river', 'featured-compact'],
      },
      description: 'Variant of the event cards',
    },
    showSearch: {
      control: 'boolean',
      description: 'Show search input',
    },
    showTagsFilter: {
      control: 'boolean',
      description: 'Show tags filter dropdown',
    },
    showMonthFilter: {
      control: 'boolean',
      description: 'Show month filter dropdown',
    },
    showYearFilter: {
      control: 'boolean',
      description: 'Show year filter dropdown',
    },
    showRecurrenceFilter: {
      control: 'boolean',
      description: 'Show recurrence filter dropdown',
    },
    showPagination: {
      control: 'boolean',
      description: 'Show pagination controls',
    },
    itemsPerPage: {
      control: {type: 'number', min: 1},
      description: 'Number of items to show per page',
    },
    showItemsPerPageDropdown: {
      control: 'boolean',
      description: 'Show items per page dropdown',
    },
    title: {
      control: 'text',
      description: 'Title to display at the top of the component',
    },
    showDateRange: {
      control: 'boolean',
      description: 'Show/hide date range display',
    },
    showTimeZone: {
      control: 'boolean',
      description: 'Show timezone in date display',
    },
    descriptionMaxLines: {
      control: {type: 'number', min: 0},
      description: 'Maximum length of the description text',
    },
    dateFormat: {
      control: 'select',
      options: ['full', 'short', 'month-day', 'time-only'],
      description: 'Format for displaying dates',
    },
    onEventClick: {
      action: 'event-clicked',
      description: 'Callback when an event is clicked',
    },
    onPageChange: {
      action: 'page-changed',
      description: 'Callback when page is changed',
    },
    onFilterChange: {
      action: 'filters-changed',
      description: 'Callback when filters are changed',
    },
  },
  args: {
    items: sampleEvents,
    title: 'Upcoming Events',
    variant: 'featured',
    showSearch: true,
    showMonthFilter: true,
    showYearFilter: true,
    showTagsFilter: true,
    showRecurrenceFilter: true,
    showPagination: true,
    showDateRange: true,
    showTimeZone: false,
    descriptionMaxLines: 2,
    dateFormat: 'full',
  },
};
export default meta;
type Story = StoryObj<typeof CECUpcomingEvents>;
export const Featured: Story = {
  args: {
    items: sampleEvents,
    title: 'Upcoming Events',
    variant: 'featured',
    showSearch: true,
    showMonthFilter: true,
    showYearFilter: true,
    showTagsFilter: true,
    showRecurrenceFilter: true,
    showPagination: true,
    showDateRange: true,
    showTimeZone: false,
    descriptionMaxLines: 2,
    dateFormat: 'full',
  },
};
export const River: Story = {
  args: {
    variant: 'river',
    title: 'Upcoming Events (River)',
    items: createEvents(10),
    showPagination: true,
  },
};
export const FeaturedCompact: Story = {
  args: {
    variant: 'featured-compact',
    title: 'Upcoming Events (Compact)',
    items: createEvents(10),
    showPagination: true,
  },
};
export const WithPagination: Story = {
  args: {
    title: 'Events with Pagination',
    items: createEvents(1000),
    showPagination: true,
  },
};
export const WithTimeZone: Story = {
  args: {
    title: 'Events with Timezone',
    items: createEvents(15),
    showTimeZone: true,
    showPagination: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Events list with timezone display enabled',
      },
    },
  },
};
export const CustomDateFormat: Story = {
  args: {
    title: 'Events with Custom Date Format',
    items: createEvents(15),
    dateFormat: 'short',
    showPagination: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Events list with short date format',
      },
    },
  },
};
export const ResponsiveLayout: Story = {
  args: {
    title: 'Events with Responsive Layout',
    items: createEvents(12),
    showPagination: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Events configured for 4-per-row layout with pagination',
      },
    },
  },
};
export const WithItemsPerPageDropdown: Story = {
  args: {
    title: 'Events with Items Per Page Dropdown',
    items: createEvents(50),
    showPagination: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Events list with custom items per page dropdown',
      },
    },
  },
};
