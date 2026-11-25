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

const { checkLicenses, replaceSection, LICENSE_FILE, missingLicenseFiles, BEGIN_MARKER, END_MARKER } = require("../../../scripts/check-licenses.cjs");

const allowed = ["MIT", "Apache-2.0"];
const dep = (license, name = "pkg", version = "1.0.0") => ({ name, version, license });
const attribution = (...entries) => entries.join("\n");

describe("checkLicenses", () => {
    it("accepts an allowed licence", () => {
        expect(checkLicenses([dep("MIT")], allowed, "pkg@1.0.0")).toEqual([]);
    });

    it("rejects a licence that is not allowed", () => {
        const problems = checkLicenses([dep("GPL-3.0")], allowed, "pkg@1.0.0");
        expect(problems).toHaveLength(1);
        expect(problems[0]).toContain("pkg@1.0.0");
        expect(problems[0]).toContain("GPL-3.0");
    });

    it("accepts an OR expression when one alternative is allowed", () => {
        expect(checkLicenses([dep("(MPL-2.0 OR Apache-2.0)")], allowed, "pkg@1.0.0")).toEqual([]);
    });

    it("rejects an AND expression when one operand is not allowed", () => {
        const problems = checkLicenses([dep("(MIT AND GPL-3.0)")], allowed, "pkg@1.0.0");
        expect(problems).toHaveLength(1);
        expect(problems[0]).toContain("(MIT AND GPL-3.0)");
    });

    it("reports a dependency that is missing from the attribution text", () => {
        const problems = checkLicenses([dep("MIT", "left-pad", "1.3.0")], allowed, "another@2.0.0");
        expect(problems).toHaveLength(1);
        expect(problems[0]).toContain("missing attribution");
        expect(problems[0]).toContain("left-pad@1.3.0");
    });

    it("does not treat a longer version as the attribution of a shorter one", () => {
        const problems = checkLicenses([dep("MIT", "tslib", "2.8.1")], allowed, "tslib@2.8.10");
        expect(problems.join("\n")).toContain("missing attribution");
    });

    it.each([
        ["a scoped package of the same name", "@scope/pkg@1.0.0"],
        ["a package whose name ends with it", "foo-pkg@1.0.0"],
    ])("does not accept %s as the attribution", (_label, otherEntry) => {
        const problems = checkLicenses([dep("MIT")], allowed, attribution(otherEntry, "Some licence text"));
        expect(problems).toHaveLength(1);
        expect(problems[0]).toContain("missing attribution");
    });

    it("does not accept a mention inside prose as the attribution", () => {
        const problems = checkLicenses([dep("MIT")], allowed, "see pkg@1.0.0 for details");
        expect(problems.join("\n")).toContain("missing attribution");
    });

    it("binds AND tighter than OR", () => {
        expect(checkLicenses([dep("GPL-3.0 OR MIT AND Apache-2.0")], allowed, "pkg@1.0.0")).toEqual([]);
        expect(checkLicenses([dep("MIT OR GPL-3.0 AND GPL-2.0")], allowed, "pkg@1.0.0")).toEqual([]);
        expect(checkLicenses([dep("GPL-3.0 AND MIT OR GPL-2.0")], allowed, "pkg@1.0.0")).toHaveLength(1);
    });

    it.each([
        ["a missing licence", "", "no licence"],
        ["UNLICENSED", "UNLICENSED", "UNLICENSED"],
        ["a SEE LICENSE IN pointer", "SEE LICENSE IN LICENSE.txt", "SPDX"],
        ["a non-SPDX string", "MIT/X11 (custom)", "SPDX"],
        ["an unbalanced expression", "(MIT OR Apache-2.0", "SPDX"],
        ["an exception clause", "MIT WITH Classpath-exception-2.0", "SPDX"],
    ])("reports %s as a problem", (_label, license, expected) => {
        const problems = checkLicenses([dep(license)], allowed, "pkg@1.0.0");
        expect(problems).toHaveLength(1);
        expect(problems[0]).toContain("pkg@1.0.0");
        expect(problems[0]).toContain(expected);
    });

    it("reports every problem, not only the first", () => {
        const problems = checkLicenses([dep("GPL-3.0", "a"), dep("MIT", "b")], allowed, "a@1.0.0");
        expect(problems).toHaveLength(2);
    });
});

describe("replaceSection", () => {
    const section = `${BEGIN_MARKER}\nbody\n${END_MARKER}`;

    it("appends the section when the file has no markers", () => {
        const result = replaceSection("hand written\n", section);
        expect(result.startsWith("hand written\n")).toBe(true);
        expect(result).toContain(section);
    });

    it("replaces only the text between the markers", () => {
        const existing = `before\n${BEGIN_MARKER}\nold\n${END_MARKER}\nafter\n`;
        const result = replaceSection(existing, section);
        expect(result).toBe(`before\n${section}\nafter\n`);
    });

    it("is idempotent", () => {
        const once = replaceSection("hand written\n", section);
        expect(replaceSection(once, section)).toBe(once);
    });

    it("refuses a file with only one marker", () => {
        expect(() => replaceSection(`x\n${BEGIN_MARKER}\n`, section)).toThrow("marker");
    });
});

describe("replaceSection with duplicate markers", () => {
    const section = `${BEGIN_MARKER}\nbody\n${END_MARKER}`;

    it("refuses a file with two begin markers", () => {
        const text = `${BEGIN_MARKER}\na\n${END_MARKER}\n${BEGIN_MARKER}\n`;
        expect(() => replaceSection(text, section)).toThrow("more than once");
    });

    it("refuses a file with two end markers", () => {
        const text = `${BEGIN_MARKER}\na\n${END_MARKER}\n${END_MARKER}\n`;
        expect(() => replaceSection(text, section)).toThrow("more than once");
    });
});

describe("LICENSE_FILE", () => {
    it.each(["LICENSE", "LICENCE", "license", "LICENSE.md", "LICENSE.txt", "LICENSE-MIT", "LICENSE-APACHE", "COPYING", "NOTICE", "NOTICE.txt", "license.markdown"])(
        "accepts %s",
        (name) => expect(LICENSE_FILE.test(name)).toBe(true),
    );

    it.each(["license.js", "license.json", "license.ts", "license.cjs", "license.d.ts", "licenses", "LICENSE-checker.js"])(
        "rejects %s",
        (name) => expect(LICENSE_FILE.test(name)).toBe(false),
    );
});

describe("missingLicenseFiles", () => {
    it("lists name@version of dependencies without licence text", () => {
        const deps = [
            { name: "a", version: "1.0.0", text: "MIT text" },
            { name: "b", version: "2.0.0", text: "" },
        ];
        expect(missingLicenseFiles(deps)).toEqual(["b@2.0.0"]);
    });
});
