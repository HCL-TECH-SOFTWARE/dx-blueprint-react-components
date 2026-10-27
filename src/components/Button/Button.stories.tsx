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

import { StoryFn, Meta } from "@storybook/react-webpack5";
import Button from "./Button";
import { ButtonMouseHandler } from "../../utilities";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Buttons and Headers/Button",
    component: Button,
    excludeStories: /.*Args$/,
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
//const Template: StoryFn<ButtonMouseHandler> = ( args ) => <Button {...args} />;

//export const HelloWorld = Template.bind( {} );
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const HelloWorldArgs: ButtonMouseHandler = {
    label: "Hello World!",
    onClick: () => {}
};

// HelloWorld.args = HelloWorldArgs;

// export const ClickMe = Template.bind( {} );
// ClickMe.args = {
//     label: "Click me!",
//     onClick: () => { alert( "Button clicked" ); }
// };
