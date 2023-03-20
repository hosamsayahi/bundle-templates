const esbuild = require('esbuild');

const config = {
  entryPoints: ['./src/index.ts'],
  outdir: 'dist',
  loader: { '.ts': 'ts' },
  bundle: true,
  minify: true,
  platform: 'node',
  sourcemap: true,
  target: 'node14',
};

esbuild
  .build(config)
  .then(() => console.log('⚡ Done'))
  .catch(() => {
    console.log('Something Went Wrong');
    process.exit(1);
  })
  .finally(() => console.log('Process Over'));
