import React, { FormEventHandler } from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXNewsletterBanner from "./DXNewsletterBanner";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Components/Home Page/Newsletter Banner",
    component: DXNewsletterBanner,
    excludeStories: /.*Args$/,
} as Meta<typeof DXNewsletterBanner>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXNewsletterBanner> = ( args ) => <DXNewsletterBanner {...args} />;

let handleSubmit: FormEventHandler<Element> = ( e ) => {
    e.preventDefault();
    //@ts-ignore: Class name not included in any Element type
    alert( e.currentTarget.dxNewsletter__input.value );
};

export const EmailVariant = Template.bind( {} );
export const MessageVariant = Template.bind( {} );
export const LinkVariant = Template.bind( {} );

// More on args: https://storybook.js.org/docs/react/writing-stories/args
EmailVariant.args = {
    heading: "Sign up to get recent news in your inbox!",
    type: "email",
    inputPlaceholder: "Enter email address",
    button: {
        label: "Sign Up",
        onClick: handleSubmit
    },
    background: {
        color: "lightsteelblue"
    }
};

MessageVariant.args = {
    heading: "Couldn't find what you're looking for? Leave us a message.",
    type: "message",
    inputPlaceholder: "Start typing your question",
    button: {
        label: "Send",
        onClick: handleSubmit
    },
    maxLength: 2500,
    background: {
        image: "https://images.unsplash.com/photo-1516641051054-9df6a1aad654?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80",
        size: "contain",
        repeat: "repeat"
    }
};

LinkVariant.args = {
    heading: "Sign up! Also if you go over the limit, which is 3 lines, it will be cut-off automatically and without prejudice.",
    type: "link",
    headingColor: "white",
    link: {
        url: "https://hcl-software.com/",
        label: "Submit",
        target: "_blank"
    },
    background: {
        image: "https://images.unsplash.com/photo-1554147090-e1221a04a025?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80",
        size: "cover",
    }
};
