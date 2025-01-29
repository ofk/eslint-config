import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginTs from 'typescript-eslint';

// see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y?tab=readme-ov-file#supported-rules
export const jsxA11yStrict = pluginTs.config(pluginJsxA11y.flatConfigs.recommended, {
  rules: {
    'jsx-a11y/accessible-emoji': 'off', // deprecated
    'jsx-a11y/lang': 'error',
    'jsx-a11y/no-aria-hidden-on-focusable': 'off',
    'jsx-a11y/no-onchange': 'off', // deprecated
    'jsx-a11y/prefer-tag-over-role': 'off',
  },
});
