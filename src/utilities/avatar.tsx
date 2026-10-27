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

export const renderAvatarLetters = ( name: string, optionalClass?: undefined | string, key?: string, testId?: string ) => {
    let avatarName = name.split( " " );
    let letters = avatarName[0].charAt( 0 ) + ( avatarName[1] ? avatarName[1].charAt( 0 ) : avatarName[0].charAt( 1 ) );

    return (
        <div className={'avatar ' + ( optionalClass ? optionalClass : "" )} key={key} data-testid={testId}>{letters}</div>
    );
};
export const renderAvatarProjectMembers = (
    name: string,
    optionalClass?: undefined | string,
    key?: string,
    testId?: string,
    mouseEnterFn?: Function,
    mouseLeaveFn?: Function ) => {
    let avatarName = name.split( " " );
    let letters = avatarName[0].charAt( 0 ) + ( avatarName[1] ? avatarName[1].charAt( 0 ) : avatarName[0].charAt( 1 ) );
    const handleHover = ( mode: "enter" | "leave" ) => {
        if ( mode === "enter" && mouseEnterFn ) {
            mouseEnterFn();
        } else if ( mode === "leave" && mouseLeaveFn ) {
            mouseLeaveFn();
        } else {
            return;
        }
    };
    return (
        <div className={'avatar ' + ( optionalClass ? optionalClass : "" )}
            key={key}
            data-testid={testId}
            onMouseEnter={() => handleHover( "enter" )}
            onMouseLeave={() => handleHover( "leave" )}
        >{letters}</div>
    );
};
