import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';
import sucrase from '@rollup/plugin-sucrase';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      sucrase({ exclude: ['node_modules/**'], transforms: ['typescript'] }),
    ],
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
