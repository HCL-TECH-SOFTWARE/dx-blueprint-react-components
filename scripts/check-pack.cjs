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

// Fails when the npm tarball would be missing a file the package points at, or would contain a
// file that must not be published. Reads the file list from `npm pack --dry-run --json`, so run
// `npm run build:lib` first.
//
// Required: package.json, README.md, LICENSE, THIRD-PARTY-LICENSES, the `main`, `module` and
// `types` targets, and every string target in `exports`.
// Forbidden: anything under src/, .storybook/, docs/, coverage/, test-report/ or .github/.
//
// Run: npm run check:pack

const { execFileSync } = require("node:child_process");

const ALWAYS_REQUIRED = ["package.json", "README.md", "LICENSE", "THIRD-PARTY-LICENSES"];
const FORBIDDEN_PREFIXES = ["src/", ".storybook/", "docs/", "coverage/", "test-report/", ".github/"];

const normalise = (target) => target.replace(/^\.\//, "");

/** Collects every string leaf of an `exports` value (conditions and sub-paths are nested objects). */
function exportTargets(value) {
    if (typeof value === "string") return [value];
    if (value && typeof value === "object") return Object.values(value).flatMap(exportTargets);
    return [];
}

/**
 * @param {string[]} files paths inside the tarball, as listed by `npm pack`
 * @param {object} pkg parsed package.json
 * @returns {string[]} human-readable problems; empty means the tarball is good
 */
function checkPack(files, pkg) {
    const present = new Set(files.map(normalise));
    const required = new Set(ALWAYS_REQUIRED);
    for (const field of ["main", "module", "types"]) {
        if (typeof pkg[field] === "string") required.add(normalise(pkg[field]));
    }
    for (const target of exportTargets(pkg.exports)) required.add(normalise(target));

    const problems = [];
    for (const file of required) {
        if (!present.has(file)) problems.push(`missing from the tarball: ${file}`);
    }
    for (const file of present) {
        if (FORBIDDEN_PREFIXES.some((prefix) => file.startsWith(prefix))) {
            problems.push(`must not be published: ${file}`);
        }
    }
    return problems;
}

function fail(message) {
    console.error(message);
    process.exit(1);
}

function main() {
    let stdout;
    try {
        // stderr is piped, not inherited, so npm notices and warnings cannot corrupt the JSON on stdout.
        // --ignore-scripts keeps a lifecycle script from writing to stdout as well.
        stdout = execFileSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"],
            maxBuffer: 64 * 1024 * 1024,
        });
    } catch (error) {
        fail(`npm pack failed: ${error.stderr || error.message}`);
    }

    let report;
    try {
        report = JSON.parse(stdout);
    } catch {
        fail("Could not parse the output of `npm pack --dry-run --json`.");
    }

    if (!Array.isArray(report?.[0]?.files)) {
        fail("`npm pack --dry-run --json` did not list any files ([0].files is missing).");
    }

    const files = report[0].files.map((file) => file.path);
    const problems = checkPack(files, require("../package.json"));
    if (problems.length > 0) {
        console.error(problems.join("\n"));
        console.error(`\n${problems.length} problem(s). Run \`npm run build:lib\` first if dist/ is missing.`);
        process.exit(1);
    }
    console.log(`Tarball check passed (${files.length} files).`);
}

if (require.main === module) {
    main();
}

module.exports = { checkPack };
