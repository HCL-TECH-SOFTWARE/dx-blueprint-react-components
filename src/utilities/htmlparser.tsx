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

import React from 'react';
import parse from "html-react-parser";
import DOMPurify from "dompurify";

export const purifyAndParseHTML = ( content: string | undefined, enclosingDIV: boolean = true ) => {
    return enclosingDIV ?
        <div>{content && parse( DOMPurify.sanitize( content ) ) as React.ReactNode}</div>
        : <>{content && parse( DOMPurify.sanitize( content ) ) as React.ReactNode}</>;
};

export const parseHTML = ( content: string | undefined, enclosingDIV: boolean = true ) => {
    return enclosingDIV ?
        <div>{content && parse( content ) as React.ReactNode}</div>
        : <>{content && parse( content ) as React.ReactNode}</>;
};

export const purifyHTML = ( content: string | undefined, enclosingDIV: boolean = true ) => {
    return enclosingDIV ?
        <div>{content && DOMPurify.sanitize( content )}</div>
        : <>{content && DOMPurify.sanitize( content )}</>;
};

export const parseContent = ( content: string | undefined ) => {
    return <div>{content && parse( DOMPurify.sanitize( content ) ) as React.ReactNode}</div>;
};

export const parseContentAndMedia = ( content: string | undefined, enclosingDIV: boolean = true ) => {
    return enclosingDIV ?
        <div>{content && parse( DOMPurify.sanitize( content, { ADD_TAGS: ['iframe'], ADD_ATTR: ['className', 'class', 'style'], KEEP_CONTENT: false } ) ) as React.ReactNode}</div>
        : <>{content && parse( DOMPurify.sanitize( content, { ADD_TAGS: ['iframe'], ADD_ATTR: ['className', 'class', 'style'], KEEP_CONTENT: false } ) ) as React.ReactNode}</>;
};

export const parseLinks = ( content: string | undefined, enclosingDIV: boolean = true ) => {
    return enclosingDIV ?
        <div>{content && parse( DOMPurify.sanitize( content, { ALLOWED_TAGS: ['a'], KEEP_CONTENT: true } ) ) as React.ReactNode}</div>
        : <>{content && parse( DOMPurify.sanitize( content, { ALLOWED_TAGS: ['a'], KEEP_CONTENT: true } ) ) as React.ReactNode}</>;
};
