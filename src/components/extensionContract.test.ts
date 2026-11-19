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

import fs from "fs";
import path from "path";

/**
 * Meta-test: every component exported from `src/components/index.ts` must call `itSupportsExtensionProps(` in its own
 * test file, which checks className merging, DOM rest props, ref forwarding and no console errors.
 *
 * It is SKIPPED until every component has been migrated (it would list all of them as missing). To see the current list
 * of components still missing the contract, run it locally with the environment variable set:
 *
 *   CHECK_EXTENSION_CONTRACT=1 npx jest src/components/extensionContract.test.ts
 */
const componentsDir = __dirname;
const exportRegex = /export\s*\{\s*default\s+as\s+(\w+)\s*\}\s*from\s*["']\.\/(\w+)["']/g;

const exportedComponents = (): Array<{ name: string; folder: string }> => {
    const source = fs.readFileSync( path.join( componentsDir, "index.ts" ), "utf8" );
    const found: Array<{ name: string; folder: string }> = [];
    let match = exportRegex.exec( source );
    while ( match ) {
        found.push( { name: match[1], folder: match[2] } );
        match = exportRegex.exec( source );
    }
    return found;
};

const testFilesOf = ( folder: string ): string[] =>
    fs.readdirSync( path.join( componentsDir, folder ) ).filter( ( file ) => /\.test\.tsx?$/.test( file ) );

const missingContract = (): string[] =>
    exportedComponents()
        .filter( ( { folder } ) => !testFilesOf( folder ).some( ( file ) =>
            fs.readFileSync( path.join( componentsDir, folder, file ), "utf8" ).indexOf( "itSupportsExtensionProps(" ) !== -1 ) )
        .map( ( { name } ) => name );

const describeContract = process.env.CHECK_EXTENSION_CONTRACT ? describe : describe.skip;

describeContract( "extension props contract coverage", () => {
    it( "finds every component exported from the index", () => {
        expect( exportedComponents().length ).toBeGreaterThan( 100 );
    } );

    it( "has an itSupportsExtensionProps call in the test file of every exported component", () => {
        const missing = missingContract();
        expect( missing ).toEqual( [] );
    } );
} );
