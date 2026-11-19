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

import { classNames } from "./classNames";

describe( "classNames", () => {
    test( "joins the given class names with a single space", () => {
        expect( classNames( "dxFoo", "dxFoo--active" ) ).toBe( "dxFoo dxFoo--active" );
    } );

    test( "skips undefined, null, false, 0 and empty strings", () => {
        expect( classNames( "dxFoo", undefined, null, false, 0, "", "my-class" ) ).toBe( "dxFoo my-class" );
    } );

    test( "returns an empty string when nothing is left", () => {
        expect( classNames() ).toBe( "" );
        expect( classNames( undefined, false ) ).toBe( "" );
    } );

    test( "supports the conditional pattern used by the components", () => {
        const isActive = true;
        const isDisabled = false;
        expect( classNames( "dxFoo", isActive && "dxFoo--active", isDisabled && "dxFoo--disabled", "consumer" ) )
            .toBe( "dxFoo dxFoo--active consumer" );
    } );

    test( "keeps a consumer value that already holds several classes as is", () => {
        expect( classNames( "dxFoo", "a b" ) ).toBe( "dxFoo a b" );
    } );
} );
