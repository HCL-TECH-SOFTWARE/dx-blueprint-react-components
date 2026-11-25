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

// Third-party licence tooling for the production dependency tree (the same tree as
// `npm ls --omit=dev --all`; it is what the UMD build bundles). No external tool is used: the tree
// comes from npm, the licence field and licence files from each installed package.
//
//   node scripts/check-licenses.cjs              fails when a dependency has a licence that is not
//                                                in licenses-allowlist.json, has no valid SPDX licence,
//                                                or has no entry in THIRD-PARTY-LICENSES
//   node scripts/check-licenses.cjs --generate   rewrites the generated section of THIRD-PARTY-LICENSES
//                                                (between the two markers; the rest of the file is kept)
//
// Run: npm run check:licenses, npm run licenses:generate (after `npm ci`; both read node_modules).

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const LICENSES_FILE = path.join(ROOT, "THIRD-PARTY-LICENSES");
const ALLOWLIST_FILE = path.join(ROOT, "licenses-allowlist.json");

const BEGIN_MARKER = "<<< BEGIN GENERATED DEPENDENCY LICENSES (npm run licenses:generate; do not edit) >>>";
const END_MARKER = "<<< END GENERATED DEPENDENCY LICENSES >>>";

// ---------------------------------------------------------------------------------------------
// SPDX expressions: `A OR B`, `A AND B`, parentheses. AND binds tighter than OR. Anything else
// (UNLICENSED, `SEE LICENSE IN ...`, `WITH` exceptions, free text) does not parse and is a problem.
// ---------------------------------------------------------------------------------------------

/** @returns {boolean} true when the expression is satisfied by the allowed ids; throws on a syntax error */
function evaluateSpdx(expression, allowed) {
    const tokens = expression.match(/\(|\)|[^\s()]+/g) ?? [];
    let position = 0;

    const parseOr = () => {
        let result = parseAnd();
        while (tokens[position] === "OR") {
            position += 1;
            result = parseAnd() || result; // always parse the right side so a syntax error is not skipped
        }
        return result;
    };
    const parseAnd = () => {
        let result = parseTerm();
        while (tokens[position] === "AND") {
            position += 1;
            result = parseTerm() && result;
        }
        return result;
    };
    const parseTerm = () => {
        const token = tokens[position];
        position += 1;
        if (token === "(") {
            const result = parseOr();
            if (tokens[position] !== ")") throw new Error("unbalanced parenthesis");
            position += 1;
            return result;
        }
        if (token === undefined || token === ")" || token === "AND" || token === "OR") {
            throw new Error("unexpected token");
        }
        return allowed.includes(token);
    };

    const result = parseOr();
    if (position < tokens.length) throw new Error("unexpected token");
    return result;
}

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * @param {{ name: string, version: string, license: string }[]} deps production dependencies
 * @param {string[]} allowed allowed SPDX ids
 * @param {string} attributionText the THIRD-PARTY-LICENSES text each `name@version` must appear in
 * @returns {string[]} human-readable problems; empty means good
 */
function checkLicenses(deps, allowed, attributionText) {
    const problems = [];
    for (const { name, version, license } of deps) {
        const id = `${name}@${version}`;
        if (!license) {
            problems.push(`${id}: no licence field in package.json`);
        } else {
            try {
                if (!evaluateSpdx(license, allowed)) {
                    problems.push(`${id}: licence "${license}" is not allowed (see licenses-allowlist.json)`);
                }
            } catch {
                problems.push(`${id}: licence "${license}" is not a valid SPDX expression`);
            }
        }
        // The generated entry has the id alone on a line. Anchoring to the whole line stops pkg@1.0.0 from
        // being satisfied by @scope/pkg@1.0.0, foo-pkg@1.0.0, tslib@2.8.10 or a mention in licence text.
        if (!new RegExp(`^${escapeRegExp(id)}\\r?$`, "m").test(attributionText)) {
            problems.push(`${id}: missing attribution in THIRD-PARTY-LICENSES (run npm run licenses:generate)`);
        }
    }
    return problems;
}

/**
 * Puts `section` (which includes both markers) into `text`, replacing the previous generated section,
 * or appending it when there is none.
 */
function replaceSection(text, section) {
    const begin = text.indexOf(BEGIN_MARKER);
    const end = text.indexOf(END_MARKER);
    if (begin !== text.lastIndexOf(BEGIN_MARKER) || end !== text.lastIndexOf(END_MARKER)) {
        throw new Error("THIRD-PARTY-LICENSES has a begin or end marker more than once");
    }
    if (begin === -1 && end === -1) return `${text.replace(/\s*$/, "")}\n\n${section}\n`;
    if (begin === -1 || end === -1 || end < begin) {
        throw new Error("THIRD-PARTY-LICENSES has a begin or end marker without the other one");
    }
    return text.slice(0, begin) + section + text.slice(end + END_MARKER.length);
}

// ---------------------------------------------------------------------------------------------
// Reading the installed production tree
// ---------------------------------------------------------------------------------------------

// LICENSE, LICENCE, LICENSE.md/.txt, LICENSE-MIT, LICENSE-APACHE, COPYING, NOTICE. Code files that merely
// start with the word (license.js, license.json, license.d.ts) are not licence text.
const LICENSE_FILE = /^(?!.*\.(?:[cm]?[jt]sx?|json|map)$)(licen[cs]e|copying|notice)([-.].*)?$/i;
const RULE = "-".repeat(80);

function licenseOf(pkg) {
    if (typeof pkg.license === "string") return pkg.license.trim();
    if (typeof pkg.license?.type === "string") return pkg.license.type.trim(); // legacy { type, url }
    const legacy = (Array.isArray(pkg.licenses) ? pkg.licenses : []).map((entry) => entry?.type).filter(Boolean);
    return legacy.length > 1 ? `(${legacy.join(" OR ")})` : (legacy[0] ?? "");
}

/** @returns {{ name: string, version: string, license: string, text: string }[]} sorted, one per name@version */
function readProductionDependencies() {
    // stderr is piped so npm warnings cannot end up in the path list on stdout.
    const stdout = execFileSync("npm", ["ls", "--omit=dev", "--all", "--parseable", "--ignore-scripts"], {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        maxBuffer: 64 * 1024 * 1024,
    });

    const byId = new Map();
    for (const dir of stdout.split("\n").filter(Boolean)) {
        if (path.resolve(dir) === ROOT) continue; // the first line is this package itself
        const pkg = JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8"));
        const id = `${pkg.name}@${pkg.version}`;
        if (byId.has(id)) continue;

        const license = licenseOf(pkg);
        const files = fs.readdirSync(dir).filter((file) => LICENSE_FILE.test(file) && fs.statSync(path.join(dir, file)).isFile());
        const text = files.map((file) => fs.readFileSync(path.join(dir, file), "utf8").replace(/\r\n?/g, "\n").trim()).join("\n\n");
        byId.set(id, { name: pkg.name, version: pkg.version, license, text });
    }
    return [...byId.values()].sort((a, b) => (a.name === b.name ? (a.version < b.version ? -1 : 1) : a.name < b.name ? -1 : 1));
}

/** @returns {string[]} name@version of every dependency that ships no licence text */
function missingLicenseFiles(deps) {
    return deps.filter(({ text }) => !text).map(({ name, version }) => `${name}@${version}`);
}

function renderSection(deps) {
    const entries = deps.map(({ name, version, license, text }) => {
        const body = text || `This package does not ship a licence file. Its package.json declares the licence ${license || "(none)"}.`;
        return `${RULE}\n${name}@${version}\nLicense: ${license || "(none declared)"}\n${RULE}\n\n${body}\n`;
    });
    const intro =
        "Production dependencies of this package and their licences, generated from the installed\n" +
        "dependency tree. To refresh: npm ci && npm run licenses:generate.";
    return `${BEGIN_MARKER}\n\n${intro}\n\n${entries.join("\n")}\n${END_MARKER}`;
}

function main() {
    const deps = readProductionDependencies();

    if (process.argv.includes("--generate")) {
        for (const id of missingLicenseFiles(deps)) console.error(`WARNING: no licence file for ${id}`);
        fs.writeFileSync(LICENSES_FILE, replaceSection(fs.readFileSync(LICENSES_FILE, "utf8"), renderSection(deps)));
        console.log(`Wrote ${deps.length} production dependencies to THIRD-PARTY-LICENSES.`);
        return;
    }

    const allowed = JSON.parse(fs.readFileSync(ALLOWLIST_FILE, "utf8"));
    const problems = checkLicenses(deps, allowed, fs.readFileSync(LICENSES_FILE, "utf8"));
    if (problems.length > 0) {
        console.error(problems.join("\n"));
        console.error(`\n${problems.length} problem(s) in ${deps.length} production dependencies.`);
        process.exit(1);
    }
    console.log(`Licence check passed (${deps.length} production dependencies).`);
}

if (require.main === module) {
    try {
        main();
    } catch (error) {
        console.error(error.stderr || error.message);
        process.exit(1);
    }
}

module.exports = { checkLicenses, replaceSection, LICENSE_FILE, missingLicenseFiles, BEGIN_MARKER, END_MARKER };
