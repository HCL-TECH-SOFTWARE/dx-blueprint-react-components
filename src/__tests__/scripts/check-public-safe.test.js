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

const { findSensitive } = require("../../../scripts/check-public-safe.cjs");

// The sample addresses are assembled from parts so that this file does not trip the check it tests
// (`npm run lint:public` scans every tracked file, tests included).
const address = (user, ...domain) => [user, domain.join(".")].join("@");
const internal = address("x", "cnx", "pnp-hcl", "com");
const personal = address("someone", "gmail", "com");
const unknown = address("someone", "acme", "io");

describe("findSensitive", () => {
    it("flags an internal domain", () => {
        expect(findSensitive("a.tsx", `email: '${internal}'`)).toEqual([
            { line: 1, rule: "internal-domain" },
        ]);
    });

    it("flags an internal hostname label", () => {
        const host = ["git", "cwp", "example", "net"].join(".");
        expect(findSensitive("a.tsx", `url: 'https://${host}'`)).toEqual([
            { line: 1, rule: "internal-domain" },
        ]);
    });

    it("flags a personal mailbox", () => {
        expect(findSensitive("a.tsx", `label: '${personal}'`)).toEqual([
            { line: 1, rule: "personal-mailbox" },
        ]);
    });

    it("flags an address on an unknown domain", () => {
        expect(findSensitive("a.tsx", `label: '${unknown}'`)).toEqual([
            { line: 1, rule: "unknown-email" },
        ]);
    });

    it("allows example.com", () => {
        expect(findSensitive("a.tsx", `email: '${address("user", "example", "com")}'`)).toEqual([]);
    });

    it("allows the organisation domains", () => {
        expect(findSensitive("SECURITY.md", address("ospo.hclsoftware", "hcl", "com"))).toEqual([]);
        expect(findSensitive("SECURITY.md", address("someone", "hcl-software", "com"))).toEqual([]);
    });

    it("ignores version specifiers that look like addresses", () => {
        expect(findSensitive("README.md", "npm i react@18.3.1")).toEqual([]);
    });

    it("reports the line number", () => {
        expect(findSensitive("a.tsx", `line1\n${internal}`)).toEqual([
            { line: 2, rule: "internal-domain" },
        ]);
    });

    it("reports a rule once per line", () => {
        expect(findSensitive("a.tsx", `${personal} ${personal}`)).toEqual([
            { line: 1, rule: "personal-mailbox" },
        ]);
    });

    it("never returns the matched text", () => {
        expect(JSON.stringify(findSensitive("a.tsx", internal))).not.toContain("cnx");
    });
});
