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

import "./DXAccordion.scss";
import React, { useState, useEffect } from "react";
import { StateIcons, getIcon, parseContentAndMedia } from "../../utilities";
import DXDownloadGroup from "../DXDownloadGroup";
import { DownloadGroupProps } from "../DXDownloadGroup/DXDownloadGroup";
import { CardComponent } from "../../utilities/CardComponent/CardComponent";

export const slugify = ( str: string ) => str
    .toLowerCase()
    .trim()
    .replace( /[^\w\s-]/g, '' )
    .replace( /[\s_-]+/g, '-' )
    .replace( /^-+|-+$/g, '' );

export interface AccordionProps extends CardComponent {
    label: string,
    body: string,
    files?: DownloadGroupProps;
    _catalogHandler?: Function;
    _catalogIndex?: Number;
    active?: boolean;
    icons?: StateIcons;
    dir?: 'ltr' | 'rtl';
}

const DXAccordion = ( props: AccordionProps ) => {

    const getDocumentDir = (): 'ltr' | 'rtl' => {
        if ( typeof document === 'undefined' ) return 'ltr';
        const htmlDir = document.documentElement.getAttribute( 'dir' );
        if ( htmlDir === 'rtl' || htmlDir === 'ltr' ) return htmlDir;
        const computed = getComputedStyle( document.documentElement ).direction;
        return ( computed === 'rtl' || computed === 'ltr' ) ? computed : 'ltr';
    };

    const [documentDir, setDocumentDir] = useState<'ltr' | 'rtl'>( getDocumentDir );

    useEffect( () => {
        if ( props.dir ) return;
        const update = () => setDocumentDir( getDocumentDir() );
        update();
        const observer = new MutationObserver( update );
        if ( typeof document !== 'undefined' ) {
            observer.observe( document.documentElement, { attributes: true, attributeFilter: ['dir'] } );
        }
        return () => observer.disconnect();
    }, [props.dir] );

    const resolvedDir: 'ltr' | 'rtl' = props.dir ?? documentDir;

    const showContent = ( e: any ) => {
        e.preventDefault();
        let target: HTMLElement = e.currentTarget;
        let thisAccordion = target.closest( ".dxAccordion" ) as HTMLElement;
        let catalog = thisAccordion.closest( ".dxGenericCatalog__cards" ) ? thisAccordion.closest( ".dxGenericCatalog__cards" ) : thisAccordion.closest( ".dxACatalog__items" ) as HTMLElement;

        if ( catalog ) {
            // Get sibling accordions
            let siblings: Element[] = Array.from( catalog.querySelectorAll( ".dxAccordion" ) ).filter( accordionNode => {
                if ( accordionNode != thisAccordion ) {
                    return accordionNode;
                }
            } );

            siblings.map( accordion => {
                accordion.classList.remove( "dxAccordion--display-enabled" );
            } );
        }
        thisAccordion.classList.toggle( "dxAccordion--display-enabled" );
        if ( ( props._catalogIndex || props._catalogIndex === 0 ) && props._catalogHandler ) {
            props._catalogHandler( props._catalogIndex );
        }
    };

    return (
        <div
            dir={resolvedDir}
            className={`dxAccordion${props.active ? ' dxAccordion--display-enabled' : ''}`}
        >
            <div className="dxAccordion__header">
                <button
                    data-testid="accordion-button"
                    aria-controls={slugify( props.label )}
                    onClick={( e ) => showContent( e )}>
                    {props.label}
                    <i className={getIcon( props.icons, "open", "ci-Add_Plus" ) + " js-open"} data-testid="accordion-icon-open"></i>
                    <i className={getIcon( props.icons, "close", "ci-Remove_Minus" ) + " js-close"} data-testid="accordion-icon-close"></i>
                </button>
            </div>
            <div className="dxAccordion__content" id={slugify( props.label )}>
                <div className="dxAccordion__contentInner">
                    {parseContentAndMedia( props.body )}
                    {
                        props.files &&
                        <DXDownloadGroup {...props.files} />
                    }
                </div>
            </div>
        </div>
    );
};

export default DXAccordion;
