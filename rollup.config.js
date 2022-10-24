import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

import pkg from "./package.json";

export default [
    {
        input: "src/index.ts",
        output: [
            { file: pkg.main, format: "cjs", sourcemap: true },
            { file: pkg.module, format: "esm", sourcemap: true },
        ],
        plugins: [
            external(),
            resolve(),
            typescript({ tsconfig: "./tsconfig.json" }),
            commonjs(),
            terser({ format: { comments: false } }),
        ],
        onwarn(warning, warn) {
            if (warning.code === "THIS_IS_UNDEFINED") return;
            warn(warning);
        },
    },
    {
        input: "dist/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
    },
];
