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
const IMAGES_RX = /\.(png|jpe?g|gif|webp|svg|svg#[A-Za-z]+|eot|ttf|woff)$/;
const OUT_DIR = "dist";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: false,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: false,
      },
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
    plugins: [
      // Bypass @rollup/plugin-node-resolve exports resolution for DOMPurify v3.
      // The "types" sub-condition in DOMPurify's package.json exports field causes
      // plugin-node-resolve v13 to incorrectly resolve to purify.es.d.mts (a TypeScript
      // declaration file) instead of the actual ESM bundle purify.es.mjs.
      {
        name: 'resolve-dompurify',
        resolveId(source) {
          if (source === 'dompurify') {
            return path.resolve('node_modules/dompurify/dist/purify.cjs.js');
          }
          if (source === 'html-react-parser') {
            return path.resolve('node_modules/html-react-parser/lib/index.js');
          }
          return null;
        }
      },
      image(),
      resolve({ jsnext: true, preferBuiltins: true, browser: true }),
      json(),
      typescript({
        tsconfig: "./tsconfig.json",
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
      postcss({
        extract: true,
        plugins: [
          url({
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

              // ⬇️ ensure URL is POSIX-style and don't add "?undefined"
              return "../" + hashedFilePath.replace(/\\/g, "/") + (filename[1] ? "?" + filename[1] : "");
            },
          }),
        ],
      })
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/, "react", "react-dom"],
  },
];
