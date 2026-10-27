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
import DXScrollableCard, { ScrollableCardProps } from "./DXScrollableCard";

export default {
    title: "Components/Cards/Scrollable Card",
    component: DXScrollableCard,
    excludeStories: /.*Args$/,
} as Meta<typeof DXScrollableCard>;

const Template: StoryFn<typeof DXScrollableCard> = ( args ) => <DXScrollableCard {...args} />;

export const scrollableCard = Template.bind( {} );
export const individualCard = Template.bind( {} );
export const changedIcons = Template.bind( {} );

export const scrollableCardsArgs: ScrollableCardProps = {
    items: [
        {
            image: "https://images.unsplash.com/photo-1503424886307-b090341d25d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80",
            title: "Raúl Mendoza",
            subtitle: "Chief Operating Officer",
            phone: "(055)66443322",
            city: "Monterrey",
            links: [
                {
                    url: "https://hcl-software.com",
                    label: "Contact me"
                }
            ]
        },
        {
            image: 'https://mott.pe/noticias/wp-content/uploads/2019/03/los-50-paisajes-maravillosos-del-mundo-para-tomar-fotos-1280x720.jpg',
            title: "Luis Jesus Torres",
            subtitle: "Scrum Máster",
            phone: "(051)12345678",
            city: "Saltillo",
            links: [
                {
                    url: "https://www.google.com",
                    label: "luisjtorres@gmail.com"
                },
                {
                    url: "https://hcl-software.com",
                    label: "View More"
                }
            ]
        },
        {
            title: "Laila Ortega",
            subtitle: "Design Developer",
            links: [
                {
                    url: "https://mail.yahoo.com",
                    label: "laila.ort@yahoo.com "
                },
                {
                    url: "https://hcl-software.com",
                    label: "View More"
                }
            ],
            hideImage: true
        },
        {
            title: "Ricardo Espinoza",
            subtitle: "Technical Lead",
            phone: "(051)55667788",
            country: "México",
            hideImage: false
        },
        {
            image: 'https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            title: "Vicente Rodríguez",
            city: "New York",
            country: "USA",
            links: [
                {
                    url: "https://hcl-software.com",
                    label: "Contact me "
                },
                {
                    url: "https://hcl-software.com",
                    label: "View More"
                }
            ]
        },
    ]
};

export const individualCardArgs: ScrollableCardProps = {
    items: [{
        title: "Ana Corona",
        subtitle: "Developer front end",
        phone: "(055)66443322",
        city: "Monterrey",
    }]
};

scrollableCard.args = scrollableCardsArgs;
individualCard.args = individualCardArgs;
changedIcons.args = {
    ...scrollableCardsArgs,
    icons: {
        prev: "ci-Arrow_Left_MD",
        next: "ci-Arrow_Right_MD"
    }
};
