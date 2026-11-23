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
import React, { useState, useEffect, useMemo, useRef } from "react";
import { StateIcons, getIcon, parseContentAndMedia } from "../../utilities";
import DXDownloadGroup from "../DXDownloadGroup";
import { DownloadGroupProps } from "../DXDownloadGroup/DXDownloadGroup";
import { CardComponent } from "../../utilities/CardComponent/CardComponent";
import { mergeRefs, pickDomProps } from "../../utilities/extendable";
import { classNames } from "../../utilities/classNames";

export const slugify = ( str: string ) => str
    .toLowerCase()
    .trim()
    .replace( /[^\w\s-]/g, '' )
    .replace( /[\s_-]+/g, '-' )
    .replace( /^-+|-+$/g, '' );

// Sent to the other accordions of a catalog when one opens, so each closes through its own state
const CLOSE_EVENT = "dxaccordion:close";

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

const DXAccordion = ( props: AccordionProps & { className?: string; ref?: React.Ref<HTMLDivElement>; } ) => {
    // Own props are pulled out; only DOM-safe extras reach the root (the props type has an index signature).
    const { label: _label, body: _body, files: _files, _catalogHandler: _ch, _catalogIndex: _ci, active: _active, icons: _icons, dir: _dir, _search, index: _index, className, ref, ...rest } = props;
    const domAttrs = pickDomProps( rest );

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

    // The open state lives in React so the root class survives re-renders (a direct classList toggle was lost when the consumer className changed)
    const [open, setOpen] = useState( !!props.active );
    const rootRef = useRef<HTMLDivElement>( null );
    const mergedRef = useMemo( () => mergeRefs( rootRef, ref ), [ref] );

    // Catalogs drive `active`; follow it when it changes
    useEffect( () => {
        setOpen( !!props.active );
    }, [props.active] );

    useEffect( () => {
        const node = rootRef.current;
        if ( !node ) return;
        const close = () => setOpen( false );
        node.addEventListener( CLOSE_EVENT, close );
        return () => node.removeEventListener( CLOSE_EVENT, close );
    }, [] );

    const showContent = ( e: any ) => {
        e.preventDefault();
        const thisAccordion = rootRef.current;
        const catalog = thisAccordion?.closest( ".dxGenericCatalog__cards" ) ?? thisAccordion?.closest( ".dxACatalog__items" );

        if ( catalog && !open ) {
            catalog.querySelectorAll( ".dxAccordion" ).forEach( accordion => {
                if ( accordion !== thisAccordion ) accordion.dispatchEvent( new CustomEvent( CLOSE_EVENT ) );
            } );
        }
        setOpen( !open );
        if ( ( props._catalogIndex || props._catalogIndex === 0 ) && props._catalogHandler ) {
            props._catalogHandler( props._catalogIndex );
        }
    };

    return (
        <div
            {...domAttrs}
            ref={mergedRef}
            dir={resolvedDir}
            className={classNames( "dxAccordion", open && "dxAccordion--display-enabled", className )}
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
