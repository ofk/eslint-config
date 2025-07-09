/* eslint-disable @typescript-eslint/no-require-imports */
const defineConfig = require('@ofk/eslint-config');
const configPrettier = require('eslint-config-prettier');

module.exports = defineConfig({
  extends: [configPrettier],
  ignores: ['dist/'],
  imports: {
    defaultExportFiles: ['src/*.ts'],
    node: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
});
