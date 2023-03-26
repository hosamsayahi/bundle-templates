import esbuildServe from 'esbuild-serve';

esbuildServe(
  {
    entryPoints: ['./src/index.js'],
    bundle: true,
    platform: 'node',
    minify: true,
    sourcemap: true,
    target: 'node14',
    outdir: 'dist',
  },
  {
    port: 3000,
    root: '.',
  }
);
