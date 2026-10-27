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
import DXCardButtonCatalog from './DXCardButtonCatalog';
import { CardButtonProps } from '../DXCardButton/DXCardButton';

export default {
    title: "Components/Lists, Catalogs, and Filters/Card Button Catalog",
    component: DXCardButtonCatalog,
    excludeStories: /.*Args$/,
} as Meta<typeof DXCardButtonCatalog>;

const Template: StoryFn<typeof DXCardButtonCatalog> = ( args ) => <DXCardButtonCatalog {...args} />;

export const CardButtonGrid8 = Template.bind( {} );
export const CardButtonGrid4 = Template.bind( {} );
export const CardButtonGrid10 = Template.bind( {} );
export const CardButtonSlider = Template.bind( {} );
export const CardButtonSliderChangedIcon = Template.bind( {} );
export const CardbuttonSlider3 = Template.bind( {} );

let items: CardButtonProps[] = [
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
            altText: "image-1"
        },
        header: "The title goes here 1",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede "
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1674471361339-2e1e1dbd3e73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
            altText: "image-1"
        },
        header: "The title goes here 2",
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1674485169641-bcb2bf6f1df9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "image-1"
        },
        header: "The title goes here 3",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede "
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1674726240969-080afce91514?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
            altText: "image-1"
        },
        header: "The title goes here 4",
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1674726253061-baba094ad8c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "image-1"
        },
        header: "The title goes here 5",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede "
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1673100749940-d9a899cb3968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
            altText: "image-1"
        },
        header: "The title goes here 6",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede "
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1671790556096-2d5d288c3ae5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2231&q=80",
            altText: "image-1"
        },
        header: "The title goes here 7",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede "
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1647088240248-0e3490b180de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
            altText: "image-1"
        },
        header: "The title goes here 8",
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1668620268481-6301db1134f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
            altText: "image-1"
        },
        header: "The title goes here 9",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede "
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1667144383665-a799f22901e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80",
            altText: "image-1"
        },
        header: "The title goes here 10",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede "
    },
    {
        link: "https://hcl-software.com/",
        img: {
            url: "https://images.unsplash.com/photo-1669151081280-6cad76c5e420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
            altText: "image-1"
        },
        header: "The title goes here 11",
        body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede "
    },
];

let arr10 = items.slice( 0, 10 );
let arr8 = items.slice( 0, 8 );
let arr4 = items.slice( 0, 4 );

export const arr10Args = arr10;
export const arr8Args = arr8;
export const arr4Args = arr4;

CardButtonGrid10.args = {
    elements: arr10Args,
    header: "Header",
    variant: "grid",
    elementsPerRow: 3
};
CardButtonGrid8.args = {
    elements: arr8Args,
    header: "Header 8",
    variant: "grid",
    elementsPerRow: 4
};
CardButtonGrid4.args = {
    elements: arr4Args,
    header: "Header 4",
    variant: "grid",
};

CardButtonSlider.args = {
    elements: arr10Args,
    variant: "slider"
};

CardbuttonSlider3.args = {
    elements: arr10Args,
    variant: "slider",
    elementsPerRow: 3
};

CardButtonSliderChangedIcon.args = {
    elements: arr10Args,
    variant: "slider",
    icons: {
        prev: "ci-Arrow_Left_MD",
        next: "ci-Arrow_Right_MD",
    }
};
