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
import DXQuestionsTabs from "../DXQuestionsTabs";
import { DXQuestionsTabsProps } from "../DXQuestionsTabs/DXQuestionsTabs";
import DXSearchSuggestions from "../DXSearchSuggestions";
import { SSuggestionsProps } from "../DXSearchSuggestions/DXSearchSuggestions";
import "./DXSearchAndQuestions.scss";
import { ExtendableProps, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export interface DXSearchAndQuestionsProps {
    backgroundImage?: string,
    backgroundColor?: string,
    sqBackgroundColor?: string,
    sqBackgroundOpacity?: number,
    questionsTabs: DXQuestionsTabsProps,
    searchSuggestions: SSuggestionsProps,
}

export const hexToRgb = ( colorValue: string ) => {
    if ( colorValue.indexOf( "--" ) >= 0 ) {
        colorValue = getComputedStyle( document.documentElement ).getPropertyValue( colorValue );
    }
    var hex = colorValue.replace( /\s/g, '' );
    var result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec( hex );
    return result ? {
        r: parseInt( result[1], 16 ),
        g: parseInt( result[2], 16 ),
        b: parseInt( result[3], 16 )
    } : null;
};

const DXSearchAndQuestions = ( props: ExtendableProps<DXSearchAndQuestionsProps, "div"> ) => {
    // Own props are pulled out so only DOM attributes reach the root.
    const { backgroundImage: _backgroundImage, backgroundColor: _backgroundColor, sqBackgroundColor: _sqBackgroundColor, sqBackgroundOpacity: _sqBackgroundOpacity, questionsTabs: _questionsTabs, searchSuggestions: _searchSuggestions, className, ref, ...rest } = props;
    const domProps = pickDomProps( rest );

    var bgRGB: any = {};
    var colorValue = props.sqBackgroundColor || "#ffffff";
    var backgroundOpacity = props.sqBackgroundOpacity && props.sqBackgroundOpacity >= 0 ? props.sqBackgroundOpacity : 0.8;
    var backgroundStyles;

    if ( props.backgroundImage ) {
        backgroundStyles = {
            backgroundImage: `url(${props.backgroundImage})`
        };
    } else {
        backgroundStyles = {
            backgroundColor: `${props.backgroundColor || "transparent"}`
        };
    }

    bgRGB = hexToRgb( colorValue ) || { r: 255, g: 255, b: 255 };

    return (
        <div
            {...domProps}
            ref={ref}
            className={classNames( "dxSearchAndQuestions", className )}
            data-testid="DXSnQMainContainer"
            style={{ ...( domProps.style as React.CSSProperties | undefined ), ...backgroundStyles }}
        >
            <div
                data-testid="DXSnQMiddleContainer"
                className="dxSearchAndQuestions__innerContainer"
                style={{
                    backgroundColor: `rgba(${bgRGB.r}, ${bgRGB.g}, ${bgRGB.b}, ${backgroundOpacity})`
                }}
            >
                <DXSearchSuggestions {...props.searchSuggestions}></DXSearchSuggestions>
                <DXQuestionsTabs {...props.questionsTabs}></DXQuestionsTabs>
            </div>
        </div>
    );
};

export default DXSearchAndQuestions;
