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

const zlib = require("node:zlib");
const {
    findSensitive,
    scanFileBuffer,
    KNOWN_EXCEPTIONS,
    exceptionWarning,
} = require("../../../scripts/check-public-safe.cjs");

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

// Local-path samples are assembled from parts for the same reason as the addresses above.
const localPath = (root, name, ...rest) => ["", root, name, ...rest].join("/");

describe("findSensitive: local-path", () => {
    it.each([
        ["a macOS home directory", localPath("Users", "jdoe", "project")],
        ["a Linux home directory", localPath("home", "jdoe", "project")],
        ["a Windows home directory", ["C:", "Users", "jdoe", "project"].join("\\")],
    ])("flags %s", (_label, sample) => {
        expect(findSensitive("a.tsx", `cwd: '${sample}'`)).toEqual([{ line: 1, rule: "local-path" }]);
    });

    it.each([
        ["an angle-bracket placeholder", localPath("Users", "<your-name>", "project")],
        ["the name placeholder", localPath("Users", "name", "project")],
        ["the user placeholder", localPath("Users", "user", "project")],
        ["the macOS CI runner", localPath("Users", "runner", "work")],
        ["the Linux CI runner", localPath("home", "runner", "work")],
        ["the node image user", localPath("home", "node", "app")],
        ["the generic Linux user", localPath("home", "user", "app")],
    ])("allows %s", (_label, sample) => {
        expect(findSensitive("a.tsx", `cwd: '${sample}'`)).toEqual([]);
    });

    it("does not read a relative source folder named Users as a home directory", () => {
        expect(findSensitive("a.tsx", "import List from 'src/Users/List'")).toEqual([]);
    });

    it("never returns the matched name", () => {
        expect(JSON.stringify(findSensitive("a.tsx", localPath("Users", "jdoe")))).not.toContain("jdoe");
    });
});

describe("scanFileBuffer", () => {
    const sensitive = `fine\n${address("someone", "gmail", "com")}\n`;

    it("scans a plain text buffer like findSensitive", () => {
        expect(scanFileBuffer("a.tsx", Buffer.from(sensitive))).toEqual([{ line: 2, rule: "personal-mailbox" }]);
    });

    it("skips a binary buffer", () => {
        expect(scanFileBuffer("a.bin", Buffer.concat([Buffer.from([0]), Buffer.from(sensitive)]))).toEqual([]);
    });

    it("scans the decompressed content of a gz file", () => {
        const gz = zlib.gzipSync(Buffer.from(sensitive));
        expect(scanFileBuffer("data/x.json.gz", gz)).toEqual([{ line: 2, rule: "personal-mailbox" }]);
    });

    it("skips a gz file whose content is binary", () => {
        const gz = zlib.gzipSync(Buffer.concat([Buffer.from([0]), Buffer.from(sensitive)]));
        expect(scanFileBuffer("data/x.bin.gz", gz)).toEqual([]);
    });

    it("fails closed on a corrupt gz file", () => {
        expect(scanFileBuffer("data/x.json.gz", Buffer.from("not gzip data"))).toEqual([
            { line: 0, rule: "unreadable-gzip" },
        ]);
    });

    describe("known exceptions", () => {
        const [exempt] = [...KNOWN_EXCEPTIONS.keys()];
        const gz = zlib.gzipSync(Buffer.from(sensitive));

        it("names the stryker seed with a reason", () => {
            expect(exempt).toBe("src/__tests__/mutation/stryker-incremental.json.gz");
            expect(KNOWN_EXCEPTIONS.get(exempt)).toBe("holds personal local paths and mailboxes; owner hard stop, plan Task 8");
        });

        it("suppresses the findings of the exempt path", () => {
            expect(scanFileBuffer(exempt, gz)).toEqual([]);
        });

        it("does not suppress the same content at another path", () => {
            expect(scanFileBuffer("src/__tests__/mutation/other.json.gz", gz)).toEqual([
                { line: 2, rule: "personal-mailbox" },
            ]);
            expect(scanFileBuffer(`./${exempt}`, gz)).toHaveLength(1);
        });

        it("words the warning exactly", () => {
            expect(exceptionWarning(exempt, "why")).toBe(
                `WARNING: ${exempt} is exempt from lint:public (why). Must be regenerated or removed before the repo goes public.`,
            );
        });
    });
});
