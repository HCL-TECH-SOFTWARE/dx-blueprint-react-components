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
