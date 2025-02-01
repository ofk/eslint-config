import pluginUnusedImports from 'eslint-plugin-unused-imports';

import { mergeRules } from '../utils';

// see https://github.com/sweepline/eslint-plugin-unused-imports?tab=readme-ov-file#usage
export const unusedImportsStrict = mergeRules({
  plugins: {
    'unused-imports': pluginUnusedImports,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
      },
    ],
  },
});
