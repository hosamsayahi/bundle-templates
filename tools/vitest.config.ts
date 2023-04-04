import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    // use jsdom or happy dom for browser compatibility
    environment: 'node',
    exclude: ['**/node_modules/**', '**/dist/**'],
    testTimeout: 20000,
  },
});

// https://vitest.dev/config/
