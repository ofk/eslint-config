import configPrettier from 'eslint-config-prettier';

import defineConfig from './src';

export default defineConfig({
  extends: [configPrettier],
  rules: {
    '@typescript-eslint/no-empty-object-type': 'off',
  },
});
