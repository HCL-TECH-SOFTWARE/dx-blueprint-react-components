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

// Fails when a tracked file contains an internal host name or an e-mail address that should not
// ship in a public repository. Output is `path:line rule` only; the matched text is never printed,
// so a CI log does not repeat what the check is there to keep out.
//
// Rules:
//   internal-domain  - the internal HCL domain, or the internal host name label matched by INTERNAL below
//   personal-mailbox - an address on a consumer mail provider
//   unknown-email    - any other address whose domain is not on the allow-list below
//
// Run: npm run lint:public

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const ALLOWED_DOMAINS = new Set([
    "example.com",
    "example.org",
    "hcl.com",
    "hcl-software.com",
    "users.noreply.github.com",
]);

const INTERNAL = [/pnp-hcl\.com/i, /\bcwp\./i];
const PERSONAL_DOMAIN = /^(gmail|yahoo|outlook|hotmail|icloud)\./i;
// The top-level label must be alphabetic, so `react@18.3.1` is not read as an address.
const EMAIL = /[A-Za-z0-9._%+-]+@((?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,})/g;

const SKIPPED_NAMES = new Set(["package-lock.json", "THIRD-PARTY-LICENSES"]);
const SKIPPED_EXTENSIONS = new Set([
    ".gz", ".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".bmp", ".avif",
    ".woff", ".woff2", ".ttf", ".otf", ".eot",
]);

/**
 * @param {string} file path of the file (part of the interface; the rules do not depend on it yet)
 * @param {string} text file content
 * @returns {Array<{ line: number, rule: string }>} one entry per rule per line, never the matched text
 */
function findSensitive(file, text) {
    const hits = [];
    text.split(/\r?\n/).forEach((content, index) => {
        const rules = new Set();
        const line = index + 1;
        const internal = INTERNAL.some((pattern) => pattern.test(content));
        if (internal) rules.add("internal-domain");
        for (const match of content.matchAll(EMAIL)) {
            const domain = match[1].toLowerCase();
            if (ALLOWED_DOMAINS.has(domain) || INTERNAL.some((pattern) => pattern.test(domain))) continue;
            rules.add(PERSONAL_DOMAIN.test(domain) ? "personal-mailbox" : "unknown-email");
        }
        for (const rule of rules) hits.push({ line, rule });
    });
    return hits;
}

function isSkipped(file) {
    return SKIPPED_NAMES.has(path.basename(file)) || SKIPPED_EXTENSIONS.has(path.extname(file).toLowerCase());
}

function main() {
    const files = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
        .split("\0")
        .filter(Boolean);
    const findings = [];
    for (const file of files) {
        if (isSkipped(file) || !fs.existsSync(file)) continue;
        const buffer = fs.readFileSync(file);
        if (buffer.includes(0)) continue; // binary
        for (const { line, rule } of findSensitive(file, buffer.toString("utf8"))) {
            findings.push(`${file}:${line} ${rule}`);
        }
    }
    if (findings.length > 0) {
        console.error(findings.join("\n"));
        console.error(`\n${findings.length} finding(s). Use an example.com placeholder in samples.`);
        process.exit(1);
    }
    console.log("Public-safety check passed.");
}

if (require.main === module) {
    main();
}

module.exports = { findSensitive };
