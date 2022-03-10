import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = [
  {
    input: 'packages/metrix-sdk-mp/src/index.js',
    output: {
      file: 'packages/metrix-sdk-mp/dist/index.js',
      format: 'cjs',
      sourcemap: true,
      compact: false,
    },
    plugins: [commonjs(), json(), resolve()],
  },

  {
    input: 'packages/metrix-sdk-mp/src/index.js',
    output: {
      file: 'packages/metrix-sdk-mp/dist/index.min.js',
      format: 'cjs',
      sourcemap: true,
      compact: true,
    },
    plugins: [commonjs(), json(), resolve(), terser()],
  },
];

export default config;
