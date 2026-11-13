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
import hasha from "hasha";
import url from "postcss-url";
import image from '@rollup/plugin-image';
import json from "@rollup/plugin-json";

const packageJson = createRequire(import.meta.url)("./package.json");
// Assets referenced from CSS url(...) that get copied to dist/_assets with a content hash.
// woff2 is included so the bootstrap-icons font URL is rewritten to a file that exists.
const IMAGES_RX = /\.(png|jpe?g|gif|webp|svg|svg#[A-Za-z]+|eot|ttf|woff2?)$/;
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

// Only *.module.scss is compiled by this instance. Inject and extract are off so nothing is
// written to disk; the plugin just turns the `:export { ... }` block into a JS object.
// This runs in every build, so `:export` blocks never end up in a stylesheet.
const moduleScssPostcss = () =>
  postcss({ include: MODULE_SCSS_RX, inject: false, extract: false });

// Plugins shared by every JS build. `bundleDeps` is true only for UMD.
// `outDir` is the directory this build writes to: @rollup/plugin-typescript requires the
// tsconfig `outDir` to sit inside the Rollup output `dir`, so each build passes its own.
// `head` / `tail` let a build choose how stylesheet imports are handled: `head` plugins run
// before everything else (they must see the import first), `tail` plugins run after the
// script transforms. The defaults are for the JS builds: drop stylesheets, keep *.module.scss.
const jsPlugins = ({ bundleDeps, outDir = OUT_DIR, head = [styleStub()], tail = [moduleScssPostcss()] }) => [
  ...(bundleDeps ? [resolveBundledDeps()] : []),
  ...head,
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
  ...tail,
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

// ---- CSS build -----------------------------------------------------------------------
// Stylesheets are built in one extra pass instead of inside the preserved-modules builds,
// because rollup-plugin-postcss's `extract` does not work with `preserveModules`.
// The pass walks the same import graph, collects every stylesheet into dist/css/components.css
// and throws its (empty) JS chunk away.

// Bootstrap is delivered as its own file (dist/css/bootstrap.css), not mixed into components.css.
const dropBootstrapCss = () => ({
  name: "drop-bootstrap-css",
  resolveId(source) {
    return source === "bootstrap/dist/css/bootstrap.min.css"
      ? { id: "\0bootstrap-css-stub", moduleSideEffects: false }
      : null;
  },
  load(id) {
    return id === "\0bootstrap-css-stub" ? "export default {};" : null;
  },
});

// Copies hashed assets (fonts, images) referenced from CSS to dist/_assets and rewrites the
// url() to "../_assets/<hash>.<ext>". dist/css and dist/{cjs,esm,umd} are all one level below
// dist/, so the same relative URL works for components.css and for every index.css.
const assetUrl = url({
  url: (asset) => {
    const filename = asset.url.split("?");
    if (!IMAGES_RX.test(filename[0])) return asset.url;

    const file = fs.readFileSync(asset.absolutePath);
    const hash = hasha(file, { algorithm: "md5" });
    const extname = path.extname(asset.absolutePath);

    const hashedFileName = `${hash}${extname}`;
    fs.ensureDirSync(path.join(OUT_DIR, "_assets"));

    const hashedFilePath = path.join("_assets", hashedFileName); // FS-ish path
    fs.writeFileSync(path.join(OUT_DIR, hashedFilePath), file);

    // ensure URL is POSIX-style and don't add "?undefined"
    return "../" + hashedFilePath.replace(/\\/g, "/") + (filename[1] ? "?" + filename[1] : "");
  },
});

// Runs after postcss has written dist/css/components.css. Produces the published CSS files.
const publishCss = () => ({
  name: "publish-css",
  writeBundle() {
    const cssDir = path.join(OUT_DIR, "css");
    // The pass exists only for its CSS; remove the JS chunk it had to emit.
    fs.removeSync(path.join(cssDir, "_css-pass.js"));

    const tokens = fs.readFileSync("src/styles/tokens.css", "utf8");
    // Bootstrap's file ends with a source map comment for a .map file that is not published;
    // leaving it in makes dev servers log "failed to load source map" for every consumer.
    const bootstrap = fs
      .readFileSync("node_modules/bootstrap/dist/css/bootstrap.min.css", "utf8")
      .replace(/\/\*# sourceMappingURL=[^*]*\*\/\s*$/, "\n");
    const components = fs.readFileSync(path.join(cssDir, "components.css"), "utf8");
    fs.writeFileSync(path.join(cssDir, "tokens.css"), tokens);
    fs.writeFileSync(path.join(cssDir, "bootstrap.css"), bootstrap);

    // All-in-one file kept for existing consumers: tokens, then Bootstrap, then components
    // (Bootstrap before components, as before). A @charset rule is only valid at the very
    // start of a file, so strip it from the parts and write it once at the top.
    const CHARSET_RX = /^@charset\s+"[^"]*";\s*/;
    const parts = [tokens, bootstrap, components];
    const hasCharset = parts.some((part) => CHARSET_RX.test(part));
    const body = parts.map((part) => part.replace(CHARSET_RX, "")).join("\n");
    const allInOne = (hasCharset ? '@charset "UTF-8";\n' : "") + body;
    for (const dir of ["cjs", "esm", "umd"]) {
      fs.writeFileSync(path.join(OUT_DIR, dir, "index.css"), allInOne);
    }
  },
});

const cssBuild = {
  input: "src/index.ts",
  output: { dir: `${OUT_DIR}/css`, format: "esm", entryFileNames: "_css-pass.js" },
  plugins: [
    ...jsPlugins({
      bundleDeps: false,
      outDir: `${OUT_DIR}/css`,
      head: [dropBootstrapCss()],
      tail: [
        moduleScssPostcss(),
        postcss({
          exclude: MODULE_SCSS_RX,
          extract: "components.css",
          minimize: true,
          plugins: [assetUrl],
        }),
      ],
    }),
    publishCss(),
  ],
  external: isExternalPackage,
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
  // Must stay after the JS builds: it writes into dist/{cjs,esm,umd}, which they create.
  cssBuild,
];
