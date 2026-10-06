import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "storybook-static/**",

      "coverage/**",
      "test-report/**",
      "tmp/**",
      "*.config.js",
      "*.config.mjs",
      "rollup.config.js",
      "babel.config.js",
      "jest.config.js",

      "scripts/**",
      ".storybook/**",

    ],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // TypeScript — warnings (triage in post-launch cleanup)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",

      // React
      "react/jsx-key": "error",
      "react/no-unescaped-entities": "warn",
      "react/no-unknown-property": "error",
      "react/prop-types": "off", // TypeScript handles prop validation

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // General
      "no-console": "off",
      "no-debugger": "error",
      "no-duplicate-imports": "warn",
    },
  },
  // Stricter console rules for test files — discourage debug logs leaking into tests
  {
    files: ["src/**/*.test.{ts,tsx}"],
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];
