import React from "react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import DXExpensesCard, { ExpensesCardProps } from "./DXExpensesCard";

// Tests for the classes
test( "If the user does not pass a type prop, the class 'dxExpensesCard--incomplete' will be assigned", () => {
    let props: ExpensesCardProps = {
        value: 999999,
        label: "Uncategorized and incomplete expenses",
        actionButton: {
            label: "Generate report",
            onClick: function () {}
        }
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let component = container.querySelector( ".dxExpensesCard" );
    expect( component ).toHaveClass( "dxExpensesCard--incomplete" );
} );

test( "If the user pass the type prop as complete, the class 'dxExpensesCard--complete' will be assigned", () => {
    let props: ExpensesCardProps = {
        value: 999999,
        label: "Uncategorized and incomplete expenses",
        type: "complete",
        actionButton: {
            label: "Generate report",
            onClick: function () {}
        }
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let component = container.querySelector( ".dxExpensesCard" );
    expect( component ).toHaveClass( "dxExpensesCard--complete" );
} );

test( "If the user pass the type prop as incomplete, the class 'dxExpensesCard--incomplete' will be assigned", () => {
    let props: ExpensesCardProps = {
        value: 999999,
        label: "Uncategorized and incomplete expenses",
        type: "incomplete",
        actionButton: {
            label: "Generate report",
            onClick: function () {}
        }
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let component = container.querySelector( ".dxExpensesCard" );
    expect( component ).toHaveClass( "dxExpensesCard--incomplete" );
} );

// Test the locale string
test( "If the user does not pass the localeSetting prop, by default the value will be 'en-US'", () => {
    let props: ExpensesCardProps = {
        value: 1000010,
        label: "Uncategorized and incomplete expenses",
        actionButton: {
            label: "Generate report",
            onClick: function () {}
        }
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let value = container.querySelector( ".dxExpensesCard__value" );
    let expectedValue = "$" + props.value.toLocaleString( "en-US", { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 } );
    expect( value?.textContent ).toEqual( expectedValue );
} );

test( "If the user does pass the localeSetting prop, the value will be in that setting", () => {
    let props: ExpensesCardProps = {
        value: 1000010,
        label: "Uncategorized and incomplete expenses",
        actionButton: {
            label: "Generate report",
            onClick: function () {}
        },
        localeSetting: "es-MX"
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let value = container.querySelector( ".dxExpensesCard__value" );
    let expectedValue = "$" + props.value.toLocaleString( "es-MX", { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 } );
    expect( value?.textContent ).toEqual( expectedValue );
} );

// Test the currency symbol
test( "If the user does not pass the currencySymbol prop, by default the value will be '$'", () => {
    let props: ExpensesCardProps = {
        value: 1000010,
        label: "Uncategorized and incomplete expenses",
        actionButton: {
            label: "Generate report",
            onClick: function () {}
        }
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let value = container.querySelector( ".dxExpensesCard__value" );
    let expectedValue = "$" + props.value.toLocaleString( "en-US", { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 } );
    expect( value?.textContent ).toEqual( expectedValue );
} );

test( "If the user does pass the currencySymbol prop, the value will be in the component", () => {
    let props: ExpensesCardProps = {
        value: 1000010,
        label: "Uncategorized and incomplete expenses",
        actionButton: {
            label: "Generate report",
            onClick: function () {}
        },
        currencySymbol: "€"
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let value = container.querySelector( ".dxExpensesCard__value" );
    let expectedValue = "€" + props.value.toLocaleString( "en-US", { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 } );
    expect( value?.textContent ).toEqual( expectedValue );
} );

// Test the mobile modifier
test( "If the user passes the mobile prop as true, the class 'dxExpensesCard--mobile' will be assigned", () => {
    let props: ExpensesCardProps = {
        value: 999999,
        label: "Uncategorized and incomplete expenses",
        mobile: true
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let component = container.querySelector( ".dxExpensesCard" );
    expect( component ).toHaveClass( "dxExpensesCard--mobile" );
} );

test( "If the user does not pass the mobile prop, the class 'dxExpensesCard--mobile' will not be assigned", () => {
    let props: ExpensesCardProps = {
        value: 999999,
        label: "Uncategorized and incomplete expenses"
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let component = container.querySelector( ".dxExpensesCard" );
    expect( component ).not.toHaveClass( "dxExpensesCard--mobile" );
} );

// Test the CTA
test( "If the user do not pass the type prop, the element 'dxExpensesCard__buttonContainer', will be null", () => {
    let mock = jest.fn();
    let props: ExpensesCardProps = {
        value: 1000010,
        label: "Uncategorized and incomplete expenses",
        actionButton: {
            label: "Generate report",
            onClick: mock
        }
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let btn = container.querySelector( ".dxExpensesCard__buttonContainer" );
    expect( btn ).toBeNull();
} );

test( "If the user does pass the type prop as complete but no the actionButton, the element 'dxExpensesCard__buttonContainer', will be null", () => {
    let props: ExpensesCardProps = {
        value: 1000010,
        label: "Uncategorized and incomplete expenses",
        type: "complete"
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let btn = container.querySelector( ".dxExpensesCard__buttonContainer" );
    expect( btn ).toBeNull();
} );

test( "If the user does pass the type prop as complete and the actionButton one, the element 'dxExpensesCard__buttonContainer', will be in the document", () => {
    let mock = jest.fn();
    let props: ExpensesCardProps = {
        value: 1000010,
        label: "Uncategorized and incomplete expenses",
        type: "complete",
        actionButton: {
            label: "Generate report",
            onClick: mock
        }
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let btn = container.querySelector( ".dxExpensesCard__buttonContainer" );
    expect( btn ).toBeInTheDocument();
} );

test( "If the user does pass the type prop as incomplete and the actionButton one, the element 'dxExpensesCard__buttonContainer', will be null", () => {
    let mock = jest.fn();
    let props: ExpensesCardProps = {
        value: 1000010,
        label: "Uncategorized and incomplete expenses",
        type: "incomplete",
        actionButton: {
            label: "Generate report",
            onClick: mock
        }
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let btn = container.querySelector( ".dxExpensesCard__buttonContainer" );
    expect( btn ).toBeNull();
} );

test( "If the user clicks on the action button, the function passed will be called", async () => {
    let mock = jest.fn();
    let props: ExpensesCardProps = {
        value: 1000010,
        label: "Uncategorized and incomplete expenses",
        type: "complete",
        actionButton: {
            label: "Generate report",
            onClick: mock
        }
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let btn = container.querySelector( ".dxExpensesCard__buttonContainer" )?.childNodes[0] as HTMLButtonElement;
    await userEvent.click( btn );
    expect( mock ).toHaveBeenCalled();
} );

// Test mobile + variant combinations
test( "If the user passes mobile as true with type complete, both 'dxExpensesCard--mobile' and 'dxExpensesCard--complete' will be assigned", () => {
    let props: ExpensesCardProps = {
        value: 527.30,
        label: "Categorized and complete expenses",
        type: "complete",
        mobile: true
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let component = container.querySelector( ".dxExpensesCard" );
    expect( component ).toHaveClass( "dxExpensesCard--mobile" );
    expect( component ).toHaveClass( "dxExpensesCard--complete" );
} );

test( "If the user passes mobile as true with type incomplete, both 'dxExpensesCard--mobile' and 'dxExpensesCard--incomplete' will be assigned", () => {
    let props: ExpensesCardProps = {
        value: 263.20,
        label: "Uncategorized and incomplete expenses",
        type: "incomplete",
        mobile: true
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let component = container.querySelector( ".dxExpensesCard" );
    expect( component ).toHaveClass( "dxExpensesCard--mobile" );
    expect( component ).toHaveClass( "dxExpensesCard--incomplete" );
} );

test( "If the user passes mobile as true without a type, both 'dxExpensesCard--mobile' and 'dxExpensesCard--incomplete' will be assigned", () => {
    let props: ExpensesCardProps = {
        value: 999999,
        label: "Uncategorized and incomplete expenses",
        mobile: true
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let component = container.querySelector( ".dxExpensesCard" );
    expect( component ).toHaveClass( "dxExpensesCard--mobile" );
    expect( component ).toHaveClass( "dxExpensesCard--incomplete" );
} );

// Test mobile + CTA rendering
test( "If the user passes mobile as true with type complete and actionButton, the CTA will be in the document", () => {
    let mock = jest.fn();
    let props: ExpensesCardProps = {
        value: 527.30,
        label: "Categorized and complete expenses",
        type: "complete",
        mobile: true,
        actionButton: {
            label: "Generate report",
            onClick: mock
        }
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let btn = container.querySelector( ".dxExpensesCard__buttonContainer" );
    expect( btn ).toBeInTheDocument();
} );

// Test label text rendering
test( "The label text passed via props is rendered in the document", () => {
    let props: ExpensesCardProps = {
        value: 999999,
        label: "Categorized and complete expenses"
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let label = container.querySelector( ".dxExpensesCard__label" );
    expect( label?.textContent ).toEqual( "Categorized and complete expenses" );
} );

// Test edge case: zero value
test( "If the value is zero, it renders as '$0.00' with default locale and currency", () => {
    let props: ExpensesCardProps = {
        value: 0,
        label: "No expenses"
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let value = container.querySelector( ".dxExpensesCard__value" );
    expect( value?.textContent ).toEqual( "$0.00" );
} );

// Test edge case: fractional value rounding
test( "If the value has more than two decimal places, it rounds to two decimal places", () => {
    let props: ExpensesCardProps = {
        value: 0.005,
        label: "Tiny expenses"
    };
    const { container } = render( <DXExpensesCard {...props} /> );
    let value = container.querySelector( ".dxExpensesCard__value" );
    let expectedValue = "$" + ( 0.005 ).toLocaleString( "en-US", { 'minimumFractionDigits': 2, 'maximumFractionDigits': 2 } );
    expect( value?.textContent ).toEqual( expectedValue );
} );
