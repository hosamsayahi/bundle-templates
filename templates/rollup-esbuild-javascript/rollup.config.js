import esbuild from 'rollup-plugin-esbuild';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const external = [
  ...Object.keys(pkg.dependencies || []),
  ...Object.keys(pkg.peerDependencies || []),
];

export default [
  {
    input: './src/index.js',
    output: [
      {
        file: './dist/esm/index.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: './dist/cjs/index.js',
        format: 'cjs',
        sourcemap: true,
      }
    ],
    external,
    plugins: [
      resolve(),
      commonjs(),
      esbuild({
        target: 'node14',
      }),
    ],
  }
];
