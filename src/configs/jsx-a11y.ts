import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginTs from 'typescript-eslint';

// see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y?tab=readme-ov-file#supported-rules
export const jsxA11yStrict = pluginTs.config(pluginJsxA11y.flatConfigs.recommended);
