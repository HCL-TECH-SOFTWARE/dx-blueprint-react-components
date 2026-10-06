import React, { useEffect } from "react";

/**
 * @param ref[]
 * @param onClickOutSideAction
 *
 * How to use:
 * In your component create a constant using this format:
 * - const <varName> = useRef(null);
 * - then add this variable as param to the container you want to listen of 'outside' clicks:
 * example: <div ref={<varName>}></div>
 *
 * You can repeat these steps to create multiple references and assing them to multiple containers.
 *
 * Under this declaration call this function (clickOutsideAlerter) and use your new created variable(s) as the first parameter in an array structure.
 * As second param send any action you want to execute when clicking outside the specified container.
 * Example:
 * clickOutsideAlerter( [myFirstRef, mySecondRef, ...] , myFunction );
 */
export const clickOutsideAlerter = ( refs: any[], onClickOutSideAction: Function ) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- clickOutsideAlerter is a custom hook in all but name
    useEffect( () => {
        //Alert if clicked outside given "ref" container
        function handleClickOutside( event: Event ) {
            let insideClick = false;
            refs.map( ( ref ) => {
                if ( ref.current && ref.current.contains( event.target ) ) {
                    insideClick = true;
                }
            } );
            if ( !insideClick ) {
                onClickOutSideAction();
            }
        }
        // Bind the event listener
        document.addEventListener( "mousedown", handleClickOutside );
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener( "mousedown", handleClickOutside );
        };
    }, [refs] );
};

export function disableOverlay( id: string, className: string, callback: Function ) {
    document.getElementById( id )?.classList.add( className + "--state-hide" );
    document.getElementById( id )?.classList.remove( className + "--state-active" );
    setTimeout( function () {
        callback();
        document.getElementById( id )?.classList.remove( className + "--state-hide" );
    }, 100 );
}


export const renderOverlayElement = ( id: string, className: string, overlayActive: boolean, callback: Function ) => {
    return (
        <div id={id} data-testid={id} className={className + " " + ( overlayActive ? `${className}--state-active` : "" )}
            onClick={() => {
                disableOverlay( id, className, callback );
            }}>
        </div>
    );
};
