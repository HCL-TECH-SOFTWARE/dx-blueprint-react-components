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
//   local-path       - a personal home directory (/Users/<name>, /home/<name>, C:\\Users\\<name>)
//   unreadable-gzip  - a .gz file that cannot be decompressed (the check fails closed)
//
// .gz files are decompressed and scanned like text. KNOWN_EXCEPTIONS lists the paths whose findings
// are reported as a warning instead of failing the run; each is a debt to clear before going public.
//
// Run: npm run lint:public

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");

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

// A home directory, not a path that merely contains a folder named Users (src/Users/List): the root must not
// follow a path character. The name is captured only to test it against GENERIC_USERS.
const LOCAL_PATH = /(?<![\w.~-])(?:\/(?:Users|home)\/|[A-Za-z]:\\Users\\)([^\s/\\'"`:;,)\]}]+)/g;
// Placeholder names that are not a person. Anything in angle brackets (<name>) is a placeholder too.
const GENERIC_USERS = new Set(["name", "user", "runner", "node"]);

// path -> reason. Findings in these exact paths do not fail the run; the CLI warns about them every time.
const KNOWN_EXCEPTIONS = new Map([
    [
        "src/__tests__/mutation/stryker-incremental.json.gz",
        "holds personal local paths and mailboxes; owner hard stop, plan Task 8",
    ],
]);

const SKIPPED_NAMES = new Set(["package-lock.json", "THIRD-PARTY-LICENSES"]);
const SKIPPED_EXTENSIONS = new Set([
    ".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".bmp", ".avif",
    ".woff", ".woff2", ".ttf", ".otf", ".eot",
]);

/**
 * @param {string} file path of the file (part of the interface; the rules do not depend on it yet)
 * @param {string} text file content
 * @returns {Array<{ line: number, rule: string }>} one entry per rule per line, never the matched text
 */
function findSensitive(file, text) {
    const hits = [];
    // Walk the lines with indexOf instead of split, so a very large file does not need a second copy as an array.
    let start = 0;
    for (let line = 1; start <= text.length; line += 1) {
        let end = text.indexOf("\n", start);
        if (end === -1) end = text.length;
        const content = text.slice(start, end);
        start = end + 1;

        const rules = new Set();
        if (INTERNAL.some((pattern) => pattern.test(content))) rules.add("internal-domain");
        for (const match of content.matchAll(EMAIL)) {
            const domain = match[1].toLowerCase();
            if (ALLOWED_DOMAINS.has(domain) || INTERNAL.some((pattern) => pattern.test(domain))) continue;
            rules.add(PERSONAL_DOMAIN.test(domain) ? "personal-mailbox" : "unknown-email");
        }
        for (const match of content.matchAll(LOCAL_PATH)) {
            const name = match[1].toLowerCase();
            if (!GENERIC_USERS.has(name) && !name.startsWith("<")) rules.add("local-path");
        }
        for (const rule of rules) hits.push({ line, rule });
    }
    return hits;
}

/**
 * Scans the bytes of one tracked file: gz files are decompressed first, binary content (a NUL byte) is skipped.
 * A path in `exceptions` yields no findings. A gz file that does not decompress is a finding (fail closed).
 * @returns {Array<{ line: number, rule: string }>} line 0 means the whole file
 */
function scanFileBuffer(file, buffer, exceptions = KNOWN_EXCEPTIONS) {
    if (exceptions.has(file)) return [];
    let bytes = buffer;
    if (path.extname(file).toLowerCase() === ".gz") {
        try {
            bytes = zlib.gunzipSync(buffer);
        } catch {
            return [{ line: 0, rule: "unreadable-gzip" }];
        }
    }
    if (bytes.includes(0)) return []; // binary
    return findSensitive(file, bytes.toString("utf8"));
}

const exceptionWarning = (file, reason) =>
    `WARNING: ${file} is exempt from lint:public (${reason}). Must be regenerated or removed before the repo goes public.`;

function isSkipped(file) {
    return SKIPPED_NAMES.has(path.basename(file)) || SKIPPED_EXTENSIONS.has(path.extname(file).toLowerCase());
}

function main() {
    // The warning is printed on every run, clean or not: an exemption must stay visible.
    for (const [file, reason] of KNOWN_EXCEPTIONS) console.error(exceptionWarning(file, reason));

    const files = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
        .split("\0")
        .filter(Boolean);
    const findings = [];
    for (const file of files) {
        if (isSkipped(file) || !fs.existsSync(file)) continue;
        for (const { line, rule } of scanFileBuffer(file, fs.readFileSync(file))) {
            findings.push(line === 0 ? `${file}: ${rule}` : `${file}:${line} ${rule}`);
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

module.exports = { findSensitive, scanFileBuffer, exceptionWarning, KNOWN_EXCEPTIONS };
