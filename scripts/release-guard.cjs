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

// Validates the version and dist-tag of a release before anything is built or published, so a
// typo in the workflow inputs cannot put a prerelease on `latest` or a stable version on a
// prerelease tag.
//
// Rules:
//   - the version is SemVer 2.0 (https://semver.org), without a leading "v" or leading zeros;
//   - the dist-tag is lowercase letters, digits and hyphens, starts with a letter, and does not
//     look like a version (npm rejects those);
//   - a prerelease version (it contains "-") never takes `latest`, a stable version only takes it.
//
// Run: node scripts/release-guard.cjs <version> <dist-tag>

// The official SemVer 2.0 regular expression.
const SEMVER =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
const DIST_TAG = /^[a-z][a-z0-9-]*$/;

const reject = (reason) => ({ ok: false, reason });

/**
 * @param {string} version the version to publish, e.g. "0.1.0-alpha.1"
 * @param {string} distTag the npm dist-tag to publish it under, e.g. "alpha"
 * @returns {{ ok: true } | { ok: false, reason: string }}
 */
function validateRelease(version, distTag) {
    if (typeof version !== "string" || !SEMVER.test(version)) {
        return reject(`"${version}" is not a valid SemVer 2.0 version (no leading "v", no leading zeros).`);
    }
    if (typeof distTag !== "string" || distTag === "") {
        return reject("The dist-tag is empty.");
    }
    if (SEMVER.test(distTag) || /^v?\d/.test(distTag)) {
        return reject(`The dist-tag "${distTag}" looks like a version; npm rejects such tags.`);
    }
    if (!DIST_TAG.test(distTag)) {
        return reject(`The dist-tag "${distTag}" must match ${DIST_TAG} (lowercase letters, digits, hyphens).`);
    }

    const isPrerelease = version.includes("-");
    if (isPrerelease && distTag === "latest") {
        return reject(`"${version}" is a prerelease and must not be published under the "latest" dist-tag.`);
    }
    if (!isPrerelease && distTag !== "latest") {
        return reject(`"${version}" is a stable release and must be published under the "latest" dist-tag, not "${distTag}".`);
    }
    return { ok: true };
}

function main() {
    const [version, distTag] = process.argv.slice(2);
    const result = validateRelease(version, distTag);
    if (!result.ok) {
        console.error(result.reason);
        process.exit(1);
    }
    console.log(`Release guard passed: ${version} on dist-tag "${distTag}".`);
}

if (require.main === module) {
    main();
}

module.exports = { validateRelease };
