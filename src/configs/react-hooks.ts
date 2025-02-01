import pluginReactHooks from 'eslint-plugin-react-hooks';

import { mergeRules } from '../utils';

// see https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#flat-config-eslintconfigjs
export const reactHooksStrict = mergeRules(
  // Flat Config version has not been released yet.
  {
    plugins: { 'react-hooks': pluginReactHooks },
    rules: pluginReactHooks.configs.recommended.rules,
  },
);
