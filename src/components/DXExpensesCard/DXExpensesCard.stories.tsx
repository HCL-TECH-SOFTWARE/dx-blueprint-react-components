import React from 'react';
import { StoryFn, Meta } from "@storybook/react-webpack5";
import DXExpensesCard from "./DXExpensesCard";

export default {
    title: "Components/Cards/Expenses Card",
    component: DXExpensesCard,
    excludeStories: /.*Args$/,
} as Meta<typeof DXExpensesCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof DXExpensesCard> = ( args ) => <DXExpensesCard {...args} />;

export const CompleteType = Template.bind( {} );
export const IncompleteType = Template.bind( {} );
export const CustomLocaleSetting = Template.bind( {} );
export const DifferentCurrencySymbol = Template.bind( {} );
export const Overflow = Template.bind( {} );
export const MobileComplete = Template.bind( {} );
export const MobileIncomplete = Template.bind( {} );

CompleteType.args = {
    value: 527.30,
    label: "Categorized and complete expenses",
    actionButton: {
        label: "Generate report",
        onClick: function () { console.log( "Generating report..." ); }
    },
    type: "complete"
};

IncompleteType.args = {
    value: 263.20,
    label: "Uncategorized and incomplete expenses",
    type: "incomplete"
};

Overflow.args = {
    value: 451.92,
    label: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ",
    actionButton: {
        label: "Generate report",
        onClick: function () { console.log( "Generating report..." ); }
    }
};

CustomLocaleSetting.args = {
    value: 3900.50,
    label: "Uncategorized and incomplete expenses",
    actionButton: {
        label: "Generate report",
        onClick: function () { console.log( "Generating report..." ); }
    },
    localeSetting: "de-DE",
    type: "complete"
};

DifferentCurrencySymbol.args = {
    value: 740.50,
    label: "Uncategorized and incomplete expenses",
    actionButton: {
        label: "Generate report",
        onClick: function () { console.log( "Generating report..." ); }
    },
    type: "complete",
    currencySymbol: "€",
};

MobileComplete.args = {
    value: 527.30,
    label: "Categorized and complete expenses",
    actionButton: {
        label: "Generate report",
        onClick: function () { console.log( "Generating report..." ); }
    },
    type: "complete",
    mobile: true
};
MobileComplete.globals = { viewport: { value: 'mobile1', isRotated: false } };

MobileIncomplete.args = {
    value: 263.20,
    label: "Uncategorized and incomplete expenses",
    type: "incomplete",
    mobile: true
};
MobileIncomplete.globals = { viewport: { value: 'mobile1', isRotated: false } };
