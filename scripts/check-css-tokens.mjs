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

// Fails when a `var(--token)` used in `src` is not defined anywhere the package can see.
//
// A token counts as defined when it is:
//   1. declared (`--name:`) in a style file under `src` (this includes src/styles/tokens.css
//      and custom properties a component declares for itself), or
//   2. declared in Bootstrap's own stylesheet (consumers who load bootstrap.css get these), or
//   3. used as a quoted key in a TS/TSX file under `src` ("--name" or '--name'); this covers
//      values set inline, e.g. style={{ "--x": 1 }} or style.setProperty("--x", ...).
//
// Run: npm run lint:tokens

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const BOOTSTRAP_CSS = path.join(ROOT, "node_modules", "bootstrap", "dist", "css", "bootstrap.css");

// src/static holds reference text and Storybook manager styles; none of it is shipped.
const SKIP_DIR = path.join(SRC, "static");
const isStyle = (f) => /\.(scss|css)$/.test(f);
const isCode = (f) => /\.(ts|tsx)$/.test(f) && !/\.(test|stories)\.[jt]sx?$/.test(f);

function walk(dir, out = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (full === SKIP_DIR) continue;
        if (entry.isDirectory()) walk(full, out);
        else out.push(full);
    }
    return out;
}

// Blank out comments but keep newlines, so reported line numbers stay correct.
const blank = (s) => s.replace(/[^\n]/g, " ");
function stripStyleComments(text) {
    return text
        .replace(/\/\*[\s\S]*?\*\//g, blank)
        .replace(/^[ \t]*\/\/.*$/gm, blank); // SCSS line comments (whole-line only, so url(http://...) is safe)
}

const TOKEN = "--[A-Za-z0-9_-]+";
const REF_RE = new RegExp(`var\\(\\s*(${TOKEN})`, "g");
const DECL_RE = new RegExp(`(?:^|[;{\\s])(${TOKEN})\\s*:`, "g");
const QUOTED_RE = new RegExp(`["'](${TOKEN})["']`, "g");

const lineOf = (text, index) => text.slice(0, index).split("\n").length;

if (!fs.existsSync(BOOTSTRAP_CSS)) {
    console.error(`Cannot find ${path.relative(ROOT, BOOTSTRAP_CSS)}. Run "npm ci" first.`);
    process.exit(2);
}

const defined = new Set();
const refs = []; // { name, file, line }

for (const m of stripStyleComments(fs.readFileSync(BOOTSTRAP_CSS, "utf8")).matchAll(DECL_RE)) defined.add(m[1]);

for (const file of walk(SRC)) {
    const rel = path.relative(ROOT, file);
    if (isStyle(file)) {
        const text = stripStyleComments(fs.readFileSync(file, "utf8"));
        for (const m of text.matchAll(DECL_RE)) defined.add(m[1]);
        for (const m of text.matchAll(REF_RE)) refs.push({ name: m[1], file: rel, line: lineOf(text, m.index) });
    } else if (isCode(file)) {
        const text = fs.readFileSync(file, "utf8");
        for (const m of text.matchAll(QUOTED_RE)) defined.add(m[1]);
        for (const m of text.matchAll(REF_RE)) refs.push({ name: m[1], file: rel, line: lineOf(text, m.index) });
    }
}

const undefinedRefs = refs.filter((r) => !defined.has(r.name));
for (const r of undefinedRefs.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)) {
    console.error(`${r.file}:${r.line}  ${r.name} is not defined`);
}
const distinct = new Set(refs.map((r) => r.name)).size;
const undefinedDistinct = new Set(undefinedRefs.map((r) => r.name)).size;
console.log(`${refs.length} references, ${distinct} distinct, ${undefinedDistinct} undefined`);
process.exit(undefinedRefs.length > 0 ? 1 : 0);
