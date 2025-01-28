import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginTs from 'typescript-eslint';

// see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y?tab=readme-ov-file#supported-rules
export const jsxA11yStrict = pluginTs.config(pluginJsxA11y.flatConfigs.recommended, {
  rules: {
    'jsx-a11y/accessible-emoji': 'off',
    'jsx-a11y/lang': 'off',
    'jsx-a11y/no-aria-hidden-on-focusable': 'off',
    'jsx-a11y/no-onchange': 'off',
    'jsx-a11y/prefer-tag-over-role': 'off',
  },
});
