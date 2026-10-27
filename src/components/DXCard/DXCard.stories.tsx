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
import DXCard, { CardProps } from "./DXCard";

export default {
    title: "Components/Cards/Card",
    component: DXCard,
    excludeStories: /.*Args$/,
} as Meta<typeof DXCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXCard> = ( args ) => <DXCard {...args} />;

const today = new Date( Date.now() );

export const FullCard = Template.bind( {} );

const courseProps: CardProps = {
    title: {
        url: "#amazing",
        label: "Card Title",
    },
    cover: {
        url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
        altText: "card-cover"
    },
    checkbox: function ( e: any ) { console.log( "Cover checkbox checked: ", e ); },
    coverSticker: "https://images.unsplash.com/photo-1547521420-4328f6f9b272?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    label: "Text Label",
    metaLabel: "Additional metadata",
    options: [
        { label: "Edit", onClick: ( e: any ) => console.log( e ) }
    ],
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates ad assumenda fugiat quae deleniti eligendi cupiditate suscipit a eius ullam.",
    bodyMetadata: "NEWS | LOCAL | GOSSIP",
    event: {
        date: `${today.getFullYear()}/${( today.getMonth() + 1 ) > 12 ? today.getMonth() : today.getMonth() + 1}/${( today.getDate() + 15 ) > 30 ? today.getDate() : today.getDate() + 15}`,
        dateFormat: "YY/M/D",
        startTime: "11:30a",
        endTime: "1:00p"
    },
    iconData: {
        icon: "ci-Calendar_Days",
        text: "Sep 08 - 03:30p-06:30p"
    },
    images: {
        items: [
            {
                url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                altText: "image-1"
            },
            {
                url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                altText: "image-2"
            },
            {
                url: "https://images.unsplash.com/photo-1684748370133-92f83adba386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
                altText: "image-3"
            },
            {
                url: "https://images.unsplash.com/photo-1683659635782-af84e4b67cc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1821&q=80",
                altText: "image-4"
            },
            {
                url: "https://images.unsplash.com/photo-1683380381470-8bb7e42aa5b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                altText: "image-5"
            },
        ]
    },
    primaryButton: {
        label: "Prim. Button",
        onClick: function () { console.log( "This is the primary button" ); }
    },
    secondaryButton: {
        label: "Secn. Button",
        onClick: function () { console.log( "This is the secondary button" ); }
    },
};

FullCard.args = courseProps;

export const OverflowCard = Template.bind( {} );
OverflowCard.args = {
    ...courseProps,
    label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    metaLabel: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    bodyMetadata: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.",
};

export const RegularCard = Template.bind( {} );

const regularProps: CardProps = {
    title: {
        url: "#amazing",
        label: "Card Title",
    },
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, neque! Illum ipsum necessitatibus, repellat",
    primaryButton: {
        label: "Prim. Button",
        onClick: function () { console.log( "This is the primary button" ); }
    },
};
RegularCard.args = regularProps;

export const FullCardNoCover = Template.bind( {} );
FullCardNoCover.args = {
    title: {
        url: "#amazing",
        label: "Card Title",
    },
    checkbox: function ( e: any ) { console.log( e ); },
    label: "Text Label",
    metaLabel: "Additional metadata",
    options: [
        { label: "Edit", onClick: ( e: any ) => console.log( e ) }
    ],
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates ad assumenda fugiat quae deleniti eligendi cupiditate suscipit a eius ullam.",
    bodyMetadata: "NEWS | LOCAL | GOSSIP",
    event: {
        date: `${today.getFullYear()}/${( today.getMonth() + 1 ) > 12 ? today.getMonth() : today.getMonth() + 1}/${( today.getDate() + 15 ) > 30 ? today.getDate() : today.getDate() + 15}`,
        dateFormat: "YY/M/D",
        startTime: "11:30a",
        endTime: "1:00p"
    },
    iconData: {
        icon: "ci-Calendar_Days",
        text: "Sep 08 - 03:30p-06:30p"
    },
    images: {
        items: [
            {
                url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                altText: "image-1"
            },
            {
                url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                altText: "image-2"
            },
            {
                url: "https://images.unsplash.com/photo-1684748370133-92f83adba386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
                altText: "image-3"
            },
            {
                url: "https://images.unsplash.com/photo-1683659635782-af84e4b67cc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1821&q=80",
                altText: "image-4"
            },
            {
                url: "https://images.unsplash.com/photo-1683380381470-8bb7e42aa5b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                altText: "image-5"
            },
        ]
    },
    primaryButton: {
        label: "Prim. Button",
        onClick: function () { console.log( "This is the primary button" ); }
    },
};

export const CardNoOptions = Template.bind( {} );
CardNoOptions.args = {
    title: {
        url: "#amazing",
        label: "Card Title",
    },
    label: "Text Label",
    metaLabel: "Additional metadata",
    iconData: {
        icon: "ci-Calendar_Days",
        text: "Sep 08 - 03:30p-06:30p"
    },
    images: {
        items: [
            {
                url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                altText: "image-1"
            },
            {
                url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                altText: "image-2"
            },
            {
                url: "https://images.unsplash.com/photo-1684748370133-92f83adba386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
                altText: "image-3"
            },
            {
                url: "https://images.unsplash.com/photo-1683659635782-af84e4b67cc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1821&q=80",
                altText: "image-4"
            },
            {
                url: "https://images.unsplash.com/photo-1683380381470-8bb7e42aa5b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                altText: "image-5"
            },
        ]
    },
    primaryButton: {
        label: "Prim. Button",
        onClick: function () { console.log( "This is the primary button" ); }
    },
};

export const InfoRecordCard = Template.bind( {} );

const infoRecordProps: CardProps = {
    title: {
        url: "#amazing",
        label: "Card Title",
    },
    label: "Text Label",
    description: "Description",
};
InfoRecordCard.args = infoRecordProps;

export const ImageRecordCard = Template.bind( {} );
ImageRecordCard.args = {
    title: {
        url: "#amazing",
        label: "Card Title Lorem ipsum dolor sit amet, consectetuer adipiscin",
    },
    cover: {
        url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
        altText: "card-cover"
    },
    description: "Description",
    bodyMetadata: "Additional Metadata"
};

export const CardWithNoBody = Template.bind( {} );
CardWithNoBody.args = {
    title: {
        url: "#amazing",
        label: "Card Title Lorem ipsum dolor sit amet, consectetuer adipiscin",
    },
    cover: {
        url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
        altText: "card-cover"
    },
};

export const CardShort = Template.bind( {} );
CardShort.args = {
    title: {
        url: "#amazing",
        label: "Card Title Lorem ipsum dolor sit amet, consectetuer adipiscin",
    },
    label: "Text Label",
    metaLabel: "Additional metadata",
    iconData: {
        icon: "ci-Calendar_Days",
        text: "Sep 08 - 03:30p-06:30p"
    },
    images: {
        items: [
            {
                url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                altText: "image-1"
            },
            {
                url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                altText: "image-2"
            },
            {
                url: "https://images.unsplash.com/photo-1684748370133-92f83adba386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
                altText: "image-3"
            },
        ]
    }
};

export const CardLabelBottom = Template.bind( {} );
CardLabelBottom.args = {
    title: {
        url: "#amazing",
        label: "Card Title Lorem ipsum dolor sit amet, consectetuer adipiscin",
    },
    cover: {
        url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
        altText: "card-cover"
    },
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, neque! Illum ipsum necessitatibus, repellat magni voluptas aspernatur veniam repudiandae. Magnam, quo placeat. Rem animi optio earum debitis, quibusdam perspiciatis veniam!",
    label: "Text Label",
    bottomLabel: true
};
export const MoreImages = Template.bind( {} );
MoreImages.args = {
    title: {
        url: "#amazing",
        label: "Card Title",
    },
    cover: {
        url: "https://images.unsplash.com/photo-1658901097917-f3e4f3cb5f1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1784&q=80",
        altText: "card-cover"
    },
    images: {
        items: [
            {
                url: "https://images.unsplash.com/photo-1684692238677-6eac03518c05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                altText: "image-1"
            },
            {
                url: "https://images.unsplash.com/photo-1684662863663-d25e39fc4c10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                altText: "image-2"
            },
            {
                url: "https://images.unsplash.com/photo-1684748370133-92f83adba386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
                altText: "image-3"
            },
            {
                url: "https://images.unsplash.com/photo-1683659635782-af84e4b67cc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1821&q=80",
                altText: "image-4"
            },
            {
                url: "https://images.unsplash.com/photo-1683380381470-8bb7e42aa5b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                altText: "image-5"
            },
            {
                url: "https://images.unsplash.com/photo-1684779847639-fbcc5a57dfe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                altText: "image-6"
            },
        ],
        moreFn: function () {
            console.log( "More images was clicked" );
        }
    },
};

export const DropdownOpened = Template.bind( {} );
DropdownOpened.storyName = "Card with Dropdown Opened";
DropdownOpened.args = {
    title: {
        url: "#amazing",
        label: "Card Title",
    },
    label: "Text Label",
    metaLabel: "Additional metadata",
    options: [
        { label: "Edit", onClick: ( e: any ) => console.log( e ) },
        { label: "Delete", onClick: ( e: any ) => console.log( e ) },
        { label: "Share", onClick: ( e: any ) => console.log( e ) }
    ],
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, neque! Illum ipsum necessitatibus, repellat",
    dropdownOpen: true,
};
