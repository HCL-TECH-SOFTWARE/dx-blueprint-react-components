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

/**
 * Compile-time checks for `ExtendableProps`. This file is type-checked by `tsc` (it is in the `tsconfig.json` include)
 * but is never run: Jest only picks up `*.test.*` files, and nothing imports it, so it is not part of the build output.
 * Every `@ts-expect-error` must stay an error: if the type starts accepting the key again, `tsc` reports the unused directive.
 */
import React from "react";
import { ExtendableProps } from "./extendable";

type ProbeProps = ExtendableProps<{ label: string; }, "section">;

const Probe = ( props: ProbeProps ) => React.createElement( "section", null, props.label );

export const typeChecks = (): React.ReactElement[] => {
    const sectionRef = React.createRef<HTMLElement>();
    const svgRef = React.createRef<SVGSVGElement>();
    return [
        // allowed: what pickDomProps forwards at runtime
        <Probe key="ok" label="x" ref={sectionRef} className="c" id="i" style={{ color: "red" }}
            data-x="1" aria-label="a" aria-hidden={true} onClick={( e: React.MouseEvent<HTMLElement> ) => e.preventDefault()} onKeyDown={() => undefined} />,
        // allowed in a spread too (data-* keys come through the template-literal index signature)
        <Probe key="spread" {...{ label: "x", "data-y": "2", "aria-describedby": "d" }} />,
        // @ts-expect-error title is not forwarded (content data uses it as text)
        <Probe key="title" label="x" title="t" />,
        // @ts-expect-error role is not forwarded (catalog data uses it as a job title)
        <Probe key="role" label="x" role="region" />,
        // @ts-expect-error tabIndex is not forwarded
        <Probe key="tab" label="x" tabIndex={0} />,
        // @ts-expect-error lang is not forwarded
        <Probe key="lang" label="x" lang="en" />,
        // @ts-expect-error hidden is not forwarded
        <Probe key="hidden" label="x" hidden />,
        // @ts-expect-error style must be a CSSProperties object
        <Probe key="style" label="x" style="color:red" />,
        // @ts-expect-error the ref must fit the root element type (an SVG element is not an HTMLElement)
        <Probe key="ref" label="x" ref={svgRef} />,
        // @ts-expect-error an own prop is still required
        <Probe key="own" />,
    ];
};
