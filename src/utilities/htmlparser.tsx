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
