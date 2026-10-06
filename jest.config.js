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