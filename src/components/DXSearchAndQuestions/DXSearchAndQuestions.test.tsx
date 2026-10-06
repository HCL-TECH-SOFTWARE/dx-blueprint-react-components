import React from "react";
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
