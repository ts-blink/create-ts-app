/* eslint-disable import/no-extraneous-dependencies */
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import autoprefixer from 'autoprefixer';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import image from '@rollup/plugin-image';

const BUILD_DIR = process.env.BUILD_DIR || 'dist';
const extensions = ['.js', '.ts', '.tsx'];

const rollupConfig = [];
rollupConfig.push({
    input: 'src/index.tsx',
    output: {
        dir: JS_DIR,
        entryFileNames: '[name]-[hash].js',
        format: 'es',
        sourcemap: true,
    },
    treeshake: true,
    plugins: [
        resolve({
            extensions,
            mainFields: ['module', 'jsnext', 'jsnext:main', 'browser', 'main'],
        }),
        json(),
        image(),
        commonjs({
            include: /node_modules|ts-packages|packages/,
            sourceMap: true,
        }),
        postcss({
            plugins: [autoprefixer()],
            sourceMap: !isProd,
            extract: `${BUILD_DIR}/styles/index.css`,
            modules: {
                globalModulePaths: [/^((?!\.module\.s?css).)*$/],
            },
            minimize: true,
            use: ['sass'],
            extensions: ['.scss', '.css'],
            inject: false,
            autoModules: false,
            config: false,
        }),
        typescript(),
        terser(),
        copy({
            targets: [{ src: 'public/*', dest: BUILD_DIR }],
        })
    ],
});

export default rollupConfig;
