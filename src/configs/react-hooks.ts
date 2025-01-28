import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginTs from 'typescript-eslint';

// see https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#flat-config-eslintconfigjs
export const reactHooksStrict = pluginTs.config(
  // Flat Config version has not been released yet.
  {
    plugins: { 'react-hooks': pluginReactHooks },
    rules: pluginReactHooks.configs.recommended.rules,
  },
);
