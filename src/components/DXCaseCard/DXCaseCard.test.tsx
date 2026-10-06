import React from "react";
import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import DXCaseCard from "./DXCaseCard";

// Test the label color logic
test( "If the user does not pass any color for the label, the styles for the color and border color will be 'var(--primary-primary)'", () => {
    let props = {
        title: "#0000-General Review of Year 2022",
        subtitle: "HR",
        label: {
            label: "Label Text",
        },
        options: [
            {
                label: "Option 1",
                onClick: function () {}
            },
        ]
    };
    const { container } = render( <DXCaseCard {...props} /> );
    let label = container.querySelector( '[data-testid="case-card-label"]' ) as HTMLElement;
    expect( label ).toHaveStyle( { color: "var(--primary-primary)", borderColor: "var(--primary-primary)" } );
} );

test( "If the user does pass 'var(--danger-danger)' color for the label, the styles should be applied", () => {
    let props = {
        title: "#0000-General Review of Year 2022",
        subtitle: "HR",
        label: {
            label: "Label Text",
            color: "var(--danger-danger)"
        },
        options: [
            {
                label: "Option 1",
                onClick: function () {}
            },
        ]
    };
    const { container } = render( <DXCaseCard {...props} /> );
    let label = container.querySelector( '[data-testid="case-card-label"]' ) as HTMLElement;
    expect( label ).toHaveStyle( { color: "var(--danger-danger)", borderColor: "var(--danger-danger)" } );
} );
