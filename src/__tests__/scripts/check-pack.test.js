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

const { checkPack } = require("../../../scripts/check-pack.cjs");

const pkg = {
    main: "dist/cjs/index.js",
    module: "dist/esm/index.js",
    types: "dist/index.d.ts",
    exports: {
        ".": {
            types: "./dist/index.d.ts",
            import: "./dist/esm/index.js",
            require: "./dist/cjs/index.js",
            default: "./dist/esm/index.js",
        },
        "./tokens.css": "./dist/css/tokens.css",
        "./package.json": "./package.json",
    },
};

const complete = [
    "package.json",
    "README.md",
    "LICENSE",
    "THIRD-PARTY-LICENSES",
    "dist/cjs/index.js",
    "dist/esm/index.js",
    "dist/index.d.ts",
    "dist/css/tokens.css",
];

describe("checkPack", () => {
    it("accepts a complete file list", () => {
        expect(checkPack(complete, pkg)).toEqual([]);
    });

    it("reports a missing types entry", () => {
        const problems = checkPack(complete.filter((f) => f !== "dist/index.d.ts"), pkg);
        expect(problems).toHaveLength(1);
        expect(problems[0]).toContain("dist/index.d.ts");
    });

    it("reports a missing exports target", () => {
        const problems = checkPack(complete.filter((f) => f !== "dist/css/tokens.css"), pkg);
        expect(problems).toHaveLength(1);
        expect(problems[0]).toContain("dist/css/tokens.css");
    });

    it("reports a missing licence file", () => {
        const problems = checkPack(complete.filter((f) => f !== "THIRD-PARTY-LICENSES"), pkg);
        expect(problems).toHaveLength(1);
        expect(problems[0]).toContain("THIRD-PARTY-LICENSES");
    });

    it.each(["src/index.ts", ".storybook/main.mjs", "coverage/lcov.info", "test-report/x.xml"])(
        "reports the forbidden path %s",
        (forbidden) => {
            const problems = checkPack([...complete, forbidden], pkg);
            expect(problems).toHaveLength(1);
            expect(problems[0]).toContain(forbidden);
        },
    );

    it("reports one problem per forbidden path", () => {
        expect(checkPack([...complete, "src/a.ts", "docs/b.md"], pkg)).toHaveLength(2);
    });
});
