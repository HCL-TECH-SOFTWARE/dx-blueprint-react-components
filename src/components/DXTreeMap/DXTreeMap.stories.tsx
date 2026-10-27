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
import DXTreeMap, { TreeMapProps } from './DXTreeMap';
import { TreeMapChartItem } from '../../utilities/chart';

export default {
    title: "Components/General/Tree Map",
    component: DXTreeMap,
    excludeStories: /.*Args$/,
} as Meta<typeof DXTreeMap>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXTreeMap> = ( args ) => <DXTreeMap {...args} />;

export const dataArgs: TreeMapChartItem = {
    name: "Crisis",
    children: [
        {
            name: "Human Resources",
            children: [
                {
                    name: "Need Help",
                    children: [
                        { name: "John Doe", value: 1 },
                        { name: "Jane Doe", value: 1 },
                        { name: "Janet Kavandi", value: 1 },
                        { name: "Another Astronaut", value: 1 }
                    ]
                },
                {
                    name: "I'm Safe",
                    children: [
                        { name: "Yuri Gagarin", value: 1 },
                        { name: "Alan Bean", value: 1 },
                        { name: "Jim Lowell", value: 1 },
                        { name: "Buzz Aldrin", value: 1 },
                        { name: "Wally Shcirra", value: 1 }
                    ]
                },
                {
                    name: "No Answer",
                    children: [
                        { name: "Ed White", value: 1 }
                    ]
                }
            ]
        },
        {
            name: "IT",
            children: [
                {
                    name: "Need Help",
                    children: [
                        { name: "Tony Soprano", value: 1 },
                        { name: "Thomas Anderson", value: 1 },
                        { name: "Peter Parket", value: 1 },
                        { name: "Terri Gracin", value: 1 },
                        { name: "Logan Shields", value: 1 }
                    ]
                },
                {
                    name: "I'm Safe",
                    children: [
                        { name: "Scott Kelly", value: 1 },
                        { name: "Eileen Collins", value: 1 },
                        { name: "Buzz Lightyear", value: 1 },
                        { name: "Michael Collins", value: 1 },
                        { name: "Tim Peake", value: 1 },
                        { name: "Peggy Whitson", value: 1 },
                        { name: "Samantha Cristoforetti", value: 1 },
                        { name: "Wally Shcirra", value: 1 }
                    ]
                },
                {
                    name: "No Answer",
                    children: [
                        { name: "Ed Black", value: 1 },
                        { name: "Ed Yellow", value: 1 }
                    ]
                }
            ]
        },
        {
            name: "Legal",
            children: [
                {
                    name: "Need Help",
                    children: [
                        { name: "John Doe", value: 1 },
                        { name: "Jane Doe", value: 1 },
                        { name: "Janet Kavandi", value: 1 },
                        { name: "Another Astronaut", value: 1 }
                    ]
                },
                {
                    name: "I'm Safe",
                    children: [
                        { name: "Yuri Gagarin", value: 1 },
                        { name: "Alan Bean", value: 1 },
                        { name: "Jim Lowell", value: 1 },
                        { name: "Buzz Aldrin", value: 1 },
                        { name: "Wally Shcirra", value: 1 }
                    ]
                },
                {
                    name: "No Answer",
                    children: [
                        { name: "Ed White", value: 1 }
                    ]
                }
            ]
        },
        {
            name: "Marketing",
            children: [
                {
                    name: "Need Help",
                    children: [
                        { name: "John Doe", value: 1 },
                        { name: "Jane Doe", value: 1 },
                        { name: "Janet Kavandi", value: 1 },
                        { name: "Another Astronaut", value: 1 }
                    ]
                },
                {
                    name: "I'm Safe",
                    children: [
                        { name: "Scott Kelly", value: 1 },
                        { name: "Eileen Collins", value: 1 },
                        { name: "Buzz Lightyear", value: 1 },
                        { name: "Michael Collins", value: 1 },
                        { name: "Tim Peake", value: 1 },
                        { name: "Peggy Whitson", value: 1 },
                        { name: "Samantha Cristoforetti", value: 1 },
                        { name: "Wally Shcirra", value: 1 }
                    ]
                },
                {
                    name: "No Answer",
                    children: [
                        { name: "Ed Black", value: 1 },
                        { name: "Ed Yellow", value: 1 }
                    ]
                }
            ]
        },
        {
            name: "Finance",
            children: [
                {
                    name: "Need Help",
                    children: [
                        { name: "John Doe", value: 1 },
                        { name: "Jane Doe", value: 1 },
                        { name: "Janet Kavandi", value: 1 },
                        { name: "Another Astronaut", value: 1 }
                    ]
                },
                {
                    name: "I'm Safe",
                    children: [
                        { name: "Scott Kelly", value: 1 },
                        { name: "Eileen Collins", value: 1 },
                        { name: "Buzz Lightyear", value: 1 },
                        { name: "Michael Collins", value: 1 },
                        { name: "Tim Peake", value: 1 },
                        { name: "Peggy Whitson", value: 1 },
                        { name: "Another Astronaut", value: 1 },
                        { name: "Samantha Cristoforetti", value: 1 },
                        { name: "Wally Shcirra", value: 1 }
                    ]
                },
                {
                    name: "No Answer",
                    children: [
                        { name: "Ed White", value: 1 }
                    ]
                }
            ]
        },
        {
            name: "Engineering",
            children: [
                {
                    name: "Need Help",
                    children: [
                        { name: "John Doe", value: 1 },
                        { name: "Jane Doe", value: 1 },
                        { name: "Janet Kavandi", value: 1 },
                        { name: "Another Astronaut", value: 1 }
                    ]
                },
                {
                    name: "I'm Safe",
                    children: [
                        { name: "Yuri Gagarin", value: 1 },
                        { name: "Alan Bean", value: 1 },
                        { name: "Jim Lowell", value: 1 },
                        { name: "Buzz Aldrin", value: 1 },
                        { name: "Wally Shcirra", value: 1 }
                    ]
                },
                {
                    name: "No Answer",
                    children: [
                        { name: "Ed Black", value: 1 },
                        { name: "Ed Yellow", value: 1 }
                    ]
                }
            ]
        }
    ]
};

export const coloredDataArgs: TreeMapChartItem = {
    name: "Crisis",
    children: [
        {
            name: "Human Resources",
            children: [
                {
                    name: "Need Help",
                    children: [
                        { name: "John Doe", value: 1 },
                        { name: "Jane Doe", value: 1 },
                        { name: "Janet Kavandi", value: 1 },
                        { name: "Another Astronaut", value: 1 }
                    ],
                    color: "var(--charts-green)"
                },
                {
                    name: "I'm Safe",
                    children: [
                        { name: "Yuri Gagarin", value: 1 },
                        { name: "Alan Bean", value: 1 },
                        { name: "Jim Lowell", value: 1 },
                        { name: "Buzz Aldrin", value: 1 },
                        { name: "Wally Shcirra", value: 1 }
                    ],
                    color: "var(--charts-green)"
                },
                {
                    name: "No Answer",
                    children: [
                        { name: "Ed White", value: 1 }
                    ],
                    color: "var(--charts-green)"
                }
            ],
            color: "var(--charts-green)"
        },
        {
            name: "IT",
            children: [
                {
                    name: "Need Help",
                    children: [
                        { name: "Tony Soprano", value: 1 },
                        { name: "Thomas Anderson", value: 1 },
                        { name: "Peter Parket", value: 1 },
                        { name: "Terri Gracin", value: 1 },
                        { name: "Logan Shields", value: 1 }
                    ],
                    color: "var(--charts-blue)"
                },
                {
                    name: "I'm Safe",
                    children: [
                        { name: "Scott Kelly", value: 1 },
                        { name: "Eileen Collins", value: 1 },
                        { name: "Buzz Lightyear", value: 1 },
                        { name: "Michael Collins", value: 1 },
                        { name: "Tim Peake", value: 1 },
                        { name: "Peggy Whitson", value: 1 },
                        { name: "Samantha Cristoforetti", value: 1 },
                        { name: "Wally Shcirra", value: 1 }
                    ],
                    color: "var(--charts-blue)"
                },
                {
                    name: "No Answer",
                    children: [
                        { name: "Ed Black", value: 1 },
                        { name: "Ed Yellow", value: 1 }
                    ],
                    color: "var(--charts-blue)"
                }
            ],
            color: "var(--charts-blue)"
        },
        {
            name: "Legal",
            children: [
                {
                    name: "Need Help",
                    children: [
                        { name: "John Doe", value: 1 },
                        { name: "Jane Doe", value: 1 },
                        { name: "Janet Kavandi", value: 1 },
                        { name: "Another Astronaut", value: 1 }
                    ],
                    color: "var(--charts-red)"
                },
                {
                    name: "I'm Safe",
                    children: [
                        { name: "Yuri Gagarin", value: 1 },
                        { name: "Alan Bean", value: 1 },
                        { name: "Jim Lowell", value: 1 },
                        { name: "Buzz Aldrin", value: 1 },
                        { name: "Wally Shcirra", value: 1 }
                    ],
                    color: "var(--charts-red)"
                },
                {
                    name: "No Answer",
                    children: [
                        { name: "Ed White", value: 1 }
                    ],
                    color: "var(--charts-red)"
                }
            ],
            color: "var(--charts-red)"
        },
        {
            name: "Marketing",
            children: [
                {
                    name: "Need Help",
                    children: [
                        { name: "John Doe", value: 1 },
                        { name: "Jane Doe", value: 1 },
                        { name: "Janet Kavandi", value: 1 },
                        { name: "Another Astronaut", value: 1 }
                    ],
                    color: "var(--charts-orange)"
                },
                {
                    name: "I'm Safe",
                    children: [
                        { name: "Scott Kelly", value: 1 },
                        { name: "Eileen Collins", value: 1 },
                        { name: "Buzz Lightyear", value: 1 },
                        { name: "Michael Collins", value: 1 },
                        { name: "Tim Peake", value: 1 },
                        { name: "Peggy Whitson", value: 1 },
                        { name: "Samantha Cristoforetti", value: 1 },
                        { name: "Wally Shcirra", value: 1 }
                    ],
                    color: "var(--charts-orange)"
                },
                {
                    name: "No Answer",
                    children: [
                        { name: "Ed Black", value: 1 },
                        { name: "Ed Yellow", value: 1 }
                    ],
                    color: "var(--charts-orange)"
                }
            ],
            color: "var(--charts-orange)"
        },
        {
            name: "Finance",
            children: [
                {
                    name: "Need Help",
                    children: [
                        { name: "John Doe", value: 1 },
                        { name: "Jane Doe", value: 1 },
                        { name: "Janet Kavandi", value: 1 },
                        { name: "Another Astronaut", value: 1 }
                    ],
                    color: "var(--charts-indigo)"
                },
                {
                    name: "I'm Safe",
                    children: [
                        { name: "Scott Kelly", value: 1 },
                        { name: "Eileen Collins", value: 1 },
                        { name: "Buzz Lightyear", value: 1 },
                        { name: "Michael Collins", value: 1 },
                        { name: "Tim Peake", value: 1 },
                        { name: "Peggy Whitson", value: 1 },
                        { name: "Another Astronaut", value: 1 },
                        { name: "Samantha Cristoforetti", value: 1 },
                        { name: "Wally Shcirra", value: 1 }
                    ],
                    color: "var(--charts-indigo)"
                },
                {
                    name: "No Answer",
                    children: [
                        { name: "Ed White", value: 1 }
                    ],
                    color: "var(--charts-indigo)"
                }
            ],
            color: "var(--charts-indigo)"
        },
        {
            name: "Engineering",
            children: [
                {
                    name: "Need Help",
                    children: [
                        { name: "John Doe", value: 1 },
                        { name: "Jane Doe", value: 1 },
                        { name: "Janet Kavandi", value: 1 },
                        { name: "Another Astronaut", value: 1 }
                    ],
                    color: "var(--charts-yellow)"
                },
                {
                    name: "I'm Safe",
                    children: [
                        { name: "Yuri Gagarin", value: 1 },
                        { name: "Alan Bean", value: 1 },
                        { name: "Jim Lowell", value: 1 },
                        { name: "Buzz Aldrin", value: 1 },
                        { name: "Wally Shcirra", value: 1 }
                    ],
                    color: "var(--charts-yellow)"
                },
                {
                    name: "No Answer",
                    children: [
                        { name: "Ed Black", value: 1 },
                        { name: "Ed Yellow", value: 1 }
                    ],
                    color: "var(--charts-yellow)"
                }
            ],
            color: "var(--charts-yellow)"
        }
    ]
};

export const Default = Template.bind( {} );
export const Colored = Template.bind( {} );
export const NoFilters = Template.bind( {} );

Default.args = {
    index: 1,
    data: dataArgs
};
Colored.args = {
    index: 2,
    data: coloredDataArgs
};
NoFilters.args = {
    index: 3,
    data: dataArgs,
    hideFilters: true
};
