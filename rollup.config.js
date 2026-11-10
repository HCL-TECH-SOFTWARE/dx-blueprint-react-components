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

import resolve from "@rollup/plugin-node-resolve"; //Uses the node resolution algorithm for modules
import commonjs from "@rollup/plugin-commonjs"; //Converts commonjs modules to ES6 modules
import typescript from "@rollup/plugin-typescript"; //Teaches rollup how to process Typescript files
import { createRequire } from "module";
import dts from "rollup-plugin-dts"; //rollup your .d.ts files
import postcss from "rollup-plugin-postcss";
import fs from "fs-extra";
import path from "path";
import image from '@rollup/plugin-image';
import json from "@rollup/plugin-json";

const packageJson = createRequire(import.meta.url)("./package.json");
const OUT_DIR = "dist";

// Start every build from an empty dist/ so files from older builds cannot linger
// (preserved modules produce many files). Skipped in watch mode to keep rebuilds fast.
if (!process.env.ROLLUP_WATCH) {
  fs.removeSync(OUT_DIR);
}

// Packages the ESM/CJS builds must not inline: everything the consumer installs
// alongside this package. Matches the bare name and any subpath (e.g. "react-dom/client").
const externalPackages = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
];
// Stylesheets are never external, even inside an external package (e.g.
// "bootstrap/dist/css/bootstrap.min.css"): they must reach `styleStub` and be dropped,
// otherwise the JS would keep a CSS import that bundlers then have to resolve.
const isExternalPackage = (id) =>
  !/\.(css|scss)$/.test(id) &&
  externalPackages.some((name) => id === name || id.startsWith(`${name}/`));

// CSS is built in a separate step, so the JS bundles must not contain or import it.
// Every stylesheet import except *.module.scss resolves to an empty virtual module.
// *.module.scss stays because its `:export` values (breakpoints, z-indexes) are read from JS.
const STYLE_RX = /\.(css|scss)$/;
const MODULE_SCSS_RX = /\.module\.scss$/;
const STYLE_STUB_ID = "\0style-stub";
const styleStub = () => ({
  name: "style-stub",
  resolveId(source) {
    if (!STYLE_RX.test(source) || MODULE_SCSS_RX.test(source)) return null;
    return { id: STYLE_STUB_ID, moduleSideEffects: false };
  },
  load(id) {
    return id === STYLE_STUB_ID ? "export default {};" : null;
  },
});

// Resolves dompurify / html-react-parser to a concrete file. Only needed when dependencies
// are bundled (UMD): plugin-node-resolve picks dompurify's `types` export condition and
// would resolve to a .d.mts declaration file instead of the real bundle.
const resolveBundledDeps = () => ({
  name: "resolve-dompurify",
  resolveId(source) {
    if (source === "dompurify") {
      return path.resolve("node_modules/dompurify/dist/purify.cjs.js");
    }
    if (source === "html-react-parser") {
      return path.resolve("node_modules/html-react-parser/lib/index.js");
    }
    return null;
  },
});

// Plugins shared by every JS build. `bundleDeps` is true only for UMD.
// `outDir` is the directory this build writes to: @rollup/plugin-typescript requires the
// tsconfig `outDir` to sit inside the Rollup output `dir`, so each build passes its own.
const jsPlugins = ({ bundleDeps, outDir = OUT_DIR }) => [
  ...(bundleDeps ? [resolveBundledDeps()] : []),
  styleStub(),
  image(),
  resolve({ preferBuiltins: true, browser: true }),
  json(),
  typescript({
    tsconfig: "./tsconfig.json",
    outDir,
    compilerOptions: { emitDeclarationOnly: false },
    include: ["src/**/*.ts", "src/**/*.tsx"],
    exclude: ["**/__tests__", "**/*.test.ts", "**/*.test.tsx"],
    declaration: false
  }),
  commonjs({
    requireReturnsDefault: (id) => {
      if (id.indexOf("styled-components") !== -1) {
        return "auto";
      }
      return "false";
    }
  }),
  // Only *.module.scss is compiled here. Inject and extract are off so nothing is written
  // to disk; the plugin just turns the `:export { ... }` block into a JS object.
  postcss({
    include: /\.module\.scss$/,
    inject: false,
    extract: false,
  }),
];

// Declares that only CSS files have side effects, so bundlers can tree-shake unused
// components. Deliberately no `"type": "module"`: with it, webpack 5 treats every file as
// strict ESM and rejects the extensionless deep imports used by the sources
// (e.g. "react-bootstrap/Button") with "failed to resolve only because it was resolved
// as fully specified".
const esmPackageJson = () => ({
  name: "esm-package-json",
  generateBundle(options) {
    if (options.format !== "es") return;
    this.emitFile({
      type: "asset",
      fileName: "package.json",
      source: JSON.stringify({ sideEffects: ["**/*.css"] }, null, 2) + "\n",
    });
  },
});

// ESM and CJS are separate builds (not two outputs of one build) because of the `outDir`
// rule above. Both keep one file per source module and leave dependencies as imports.
const preservedBuild = (format) => {
  const dir = `${OUT_DIR}/${format === "es" ? "esm" : "cjs"}`;
  return {
    input: "src/index.ts",
    output: {
      dir,
      format,
      // One file per source module (mirrors src/), so consumers import only what they use.
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames: "[name].js",
      sourcemap: false,
      ...(format === "cjs" ? { exports: "named" } : {}),
    },
    plugins: [
      ...jsPlugins({ bundleDeps: false, outDir: dir }),
      ...(format === "es" ? [esmPackageJson()] : []),
    ],
    external: isExternalPackage,
  };
};

export default [
  // ESM + CJS: preserved modules, dependencies stay as imports/requires.
  preservedBuild("es"),
  preservedBuild("cjs"),
  // UMD: one self-contained file for <script> use, global name `TRF`. Only React is external.
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.umd,
        format: "umd",
        sourcemap: false,
        name: "TRF",
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
        }
      }
    ],
    plugins: jsPlugins({ bundleDeps: true }),
    external: ["react", "react-dom"],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/, "react", "react-dom"],
  },
];
