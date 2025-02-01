import pluginEslintComments from '@eslint-community/eslint-plugin-eslint-comments/configs';

import { mergeRules } from '../utils';

// see https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/
export const eslintCommentsStrict = mergeRules(pluginEslintComments.recommended, {
  '@eslint-community/eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
});
