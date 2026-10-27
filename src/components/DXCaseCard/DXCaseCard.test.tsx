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
