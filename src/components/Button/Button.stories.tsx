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
