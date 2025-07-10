import pluginReactHooks from 'eslint-plugin-react-hooks';

import { mergeRules } from '../utils';

// see https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#flat-config-eslintconfigjsts
export const reactHooksStrict = mergeRules(pluginReactHooks.configs['recommended-latest']);
