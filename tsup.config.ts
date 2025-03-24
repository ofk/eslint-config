import { defineConfig } from 'tsup';

// Set cjsInterop: true and splitting: true to support default require.
// cf. https://github.com/egoist/tsup/issues/572
export default defineConfig({
  cjsInterop: true,
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  skipNodeModulesBundle: true,
  splitting: true,
});
