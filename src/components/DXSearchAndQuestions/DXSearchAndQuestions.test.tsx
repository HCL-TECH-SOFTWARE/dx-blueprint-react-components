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
import { itSupportsExtensionProps } from "../../testUtils/extensionContract";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { SearchAndQuestionsArgs } from "./DXSearchAndQuestions.stories";
import DXSearchAndQuestions, { DXSearchAndQuestionsProps, hexToRgb } from "./DXSearchAndQuestions";

const simpleArgs: DXSearchAndQuestionsProps = {
    backgroundImage: "",
    backgroundColor: "red",
    sqBackgroundColor: "#00ffff",
    sqBackgroundOpacity: 0.5,
    searchSuggestions: SearchAndQuestionsArgs.searchSuggestions,
    questionsTabs: SearchAndQuestionsArgs.questionsTabs
};

const noOptionalArgs: DXSearchAndQuestionsProps = {
    searchSuggestions: SearchAndQuestionsArgs.searchSuggestions,
    questionsTabs: SearchAndQuestionsArgs.questionsTabs
};

test( "Test if component background image matches", () => {
    render( <DXSearchAndQuestions {...SearchAndQuestionsArgs} /> );

    let mainContainer = screen.getByTestId( "DXSnQMainContainer" );
    expect( mainContainer ).toHaveStyle( `background-image: url(${SearchAndQuestionsArgs.backgroundImage || ""})` );
} );

test( "Test if background color shows when no image is set but color is given", () => {
    let args: DXSearchAndQuestionsProps = {
        backgroundColor: "blue",
        searchSuggestions: SearchAndQuestionsArgs.searchSuggestions,
        questionsTabs: SearchAndQuestionsArgs.questionsTabs
    };

    render( <DXSearchAndQuestions {...args} /> );

    let mainContainer = screen.getByTestId( "DXSnQMainContainer" );
    expect( mainContainer ).toHaveStyle( `background-color: ${args.backgroundColor}` );
} );

test( "Test if background color is transparent when no image or color are set", () => {
    render( <DXSearchAndQuestions {...noOptionalArgs} /> );

    let mainContainer = screen.getByTestId( "DXSnQMainContainer" );
    expect( mainContainer ).toHaveStyle( `background-color: transparent` );
} );

test( "Background color and opacity for middle container matches given parameter", () => {
    render( <DXSearchAndQuestions {...simpleArgs} /> );

    let middleContainer = screen.getByTestId( "DXSnQMiddleContainer" );
    let rgbComponent: any = hexToRgb( simpleArgs.sqBackgroundColor! );

    expect( middleContainer ).toHaveStyle( `background-color: rgba(${rgbComponent.r}, ${rgbComponent.g}, ${rgbComponent.b}, ${simpleArgs.sqBackgroundOpacity})` );
} );

test( "Background color and opacity for middle container sets to default when no parameters are set", () => {
    render( <DXSearchAndQuestions {...noOptionalArgs} /> );
    let middleContainer = screen.getByTestId( "DXSnQMiddleContainer" );
    expect( middleContainer ).toHaveStyle( `background-color: rgba(255,255,255,0.8)` );
} );

itSupportsExtensionProps( ( extra ) => <DXSearchAndQuestions {...SearchAndQuestionsArgs} {...extra} /> );

test( "a consumer style is merged with the component's own background style", () => {
    const { container } = render( <DXSearchAndQuestions {...SearchAndQuestionsArgs} style={{ marginTop: "7px" }} /> );
    expect( ( container.firstElementChild as HTMLElement ).style.marginTop ).toBe( "7px" );
} );
