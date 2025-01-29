import configPrettier from 'eslint-config-prettier';

import defineConfig from './src';

export default defineConfig({
  extends: [configPrettier],
  ignores: ['dist/'],
  imports: {
    defaultExportFiles: ['src/*.ts'],
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
});
