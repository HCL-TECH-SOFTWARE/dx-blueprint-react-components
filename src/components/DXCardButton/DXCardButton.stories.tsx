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
import DXCardButton from './DXCardButton';

export default {
    title: "Components/Cards/Card Button",
    component: DXCardButton,
    excludeStories: /.*Args$/,
} as Meta<typeof DXCardButton>;

const Template: StoryFn<typeof DXCardButton> = ( args ) => <DXCardButton {...args} />;

export const CardButton = Template.bind( {} );
export const CardButtonWithoutBody = Template.bind( {} );
export const CardButtonOverflow = Template.bind( {} );
export const CardButtonWithCTA = Template.bind( {} );

export const cardButtonArgs = {
    link: "https://hcl-software.com/",
    header: "The title goes here",
    img: {
        url: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        altText: "image-1"
    }
};
export const cardButtonOverflowArgs = {
    link: "https://hcl-software.com/",
    img: {
        url: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        altText: "image-1"
    },
    header: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et",
    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede ",
    direction: "right" as ( "left" | "right" )
};
CardButton.args = {
    ...cardButtonArgs,
    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget do"
};
CardButtonWithoutBody.args = { ...cardButtonArgs };
CardButtonOverflow.args = { ...cardButtonOverflowArgs };
CardButtonWithCTA.args = {
    ...cardButtonArgs,
    cta: {
        label: "Click here to trigger",
        icon: {
            class: "ci-Printer",
            position: "left"
        },
        justify: "center"
    },
    body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget do Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget do Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget do Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget do Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget do Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget do",
};
