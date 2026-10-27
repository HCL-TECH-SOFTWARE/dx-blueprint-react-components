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
module.exports = {
    testEnvironment: "jsdom",
    testTimeout: 100000,
    verbose: false,
    watchAll: false,
    transformIgnorePatterns: [
        "/node_modules/(?!d3|d3-array|internmap|delaunator|robust-predicates|@carbon)/"
    ],
    testPathIgnorePatterns: [
        "/dist/",
        "/src/__tests__/acceptance/",
        "/src/__tests__/mutation/",
        "/e2e-tests/",
        "storyshots"
    ],
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                pageTitle: 'Nex_Haven',
                publicPath: './test-report',
                filename: 'Nex_Haven.html',
                hideIcon: true,
            },
        ],
        [
            'jest-junit',
            {
                suiteName: 'Nex_Haven',
                outputDirectory: 'test-report',
                outputName: 'Nex_Haven.xml',
            },
        ],
        'jest-reporter-log-validator',
    ],
    moduleNameMapper: {
        "\\.(css|less|scss)$": "identity-obj-proxy",
        "^.+\\.svg$": "jest-svg-transformer",
        "^warning$": "<rootDir>/src/__mocks__/warning.js",
    },
    collectCoverageFrom: [
        "<rootDir>/src/components/**/*.{ts,tsx}",
        "!<rootDir>/src/components/**/index.{ts,tsx}",
        "!**/node_modules/**",
        "!**/*.stories.{ts,tsx}",
        "!**/*.storyshots.{ts,tsx}"
    ],
    coverageReporters: [
        "text",
        "lcov",
        "html"
    ],
    coverageThreshold: {
        global: {
            statements: 92,
            branches: 89,
            functions: 89,
            lines: 93,
        },
    },
    setupFiles: ["<rootDir>/src/setupTests.js"],
};