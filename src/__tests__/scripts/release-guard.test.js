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

const { validateRelease } = require("../../../scripts/release-guard.cjs");

test.each([
    ["0.1.0-alpha.1", "alpha", true],
    ["1.0.0", "latest", true],
    ["0.1.0-alpha.1", "latest", false], // prerelease must never take latest
    ["1.0.0", "alpha", false], // stable must take latest
    ["v1.0.0", "latest", false], // no leading v
    ["01.0.0", "latest", false], // no leading zeros
    ["0.1.0-alpha.1", "1.2.3", false], // a tag that looks like a version is rejected by npm
    ["0.1.0-alpha.1", "", false],
])("validateRelease(%s, %s) ok=%s", (version, distTag, ok) => {
    expect(validateRelease(version, distTag).ok).toBe(ok);
});

test("rejection carries a reason", () => {
    expect(validateRelease("0.1.0-alpha.1", "latest").reason).toMatch(/prerelease/i);
});
