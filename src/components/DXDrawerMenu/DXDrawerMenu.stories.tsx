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
import DXDrawerMenu from "./DXDrawerMenu";

export default {
    title: "Components/Navigation/Drawer Menu",
    component: DXDrawerMenu,
    excludeStories: /.*Args$/,
} as Meta<typeof DXDrawerMenu>;

const Template: StoryFn<typeof DXDrawerMenu> = ( args ) => (

    <div>
        <DXDrawerMenu {...args} />
        <br />
        <div id="my-content">
            <h3>This will be removed and appended inside the menu for demonstration purposes</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam quae perspiciatis consectetur facere esse, reiciendis molestiae voluptatum placeat veniam explicabo iste culpa ullam. Repellat officia, libero nam deserunt at in?</p>
        </div>
    </div>
);

async function asyncAPICall() {
    let content = document.querySelector( "#my-content" );
    try {
        let data = await fetch( 'https://jsonplaceholder.typicode.com/todos/1' );
        let json = await data.json();
        let msg = document.createElement( "h6" );
        msg.append( `${json.userId} - ${json.title}` );
        content?.appendChild( msg );
    } catch ( error ) {
        console.log( "Error: ", error );
    }
}
export const Default = Template.bind( {} );
export const ChangedIcon = Template.bind( {} );
export const RightPosition = Template.bind( {} );
export const FunctionCall = Template.bind( {} );
export const DarkMenu = Template.bind( {} );

Default.args = {
    direction: "left",
    contentId: "#my-content"
};

ChangedIcon.args = {
    direction: "left",
    contentId: "#my-content",
    iconClass: "ci-Hamburger_LG"
};

RightPosition.args = {
    direction: "right",
    contentId: "#my-content"
};

FunctionCall.args = {
    direction: "left",
    contentId: "#my-content",
    contentFunction: asyncAPICall
};

DarkMenu.args = {
    direction: "right",
    contentId: "#my-content",
    dark: true
};
