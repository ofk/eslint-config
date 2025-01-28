import pluginEslintComments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import pluginTs from 'typescript-eslint';

// see https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/
export const eslintCommentsStrict = pluginTs.config(pluginEslintComments.recommended, {
  rules: {
    '@eslint-community/eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
  },
});
