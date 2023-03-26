import esbuildServe from 'esbuild-serve';

esbuildServe(
  {
    entryPoints: ['./src/index.ts'],
    outdir: 'dist',
    loader: { '.ts': 'ts' },
    bundle: true,
    minify: true,
    platform: 'node',
    sourcemap: true,
    target: 'node14',
  },
  {
    port: 3000,
    root: '.',
  }
);