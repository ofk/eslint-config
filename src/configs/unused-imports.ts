import pluginUnusedImports from 'eslint-plugin-unused-imports';

import { mergeRules } from '../utils';
import { jsStrict } from './js';

const jsStrictRules = jsStrict.rules ?? {};

// see https://github.com/sweepline/eslint-plugin-unused-imports?tab=readme-ov-file#usage
export const unusedImportsStrict = mergeRules({
  plugins: {
    'unused-imports': pluginUnusedImports,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': jsStrictRules['no-unused-vars'],
  },
});
