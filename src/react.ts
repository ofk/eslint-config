import type { Linter } from 'eslint';

import pluginReact from 'eslint-plugin-react';
import pluginTs from 'typescript-eslint';

import { jsxA11yStrict, react, reactHooksStrict, reactRefreshStrict } from './configs';

export default function defineReactConfig({
  jsxA11y: enabledJsxA11y = true,
  jsxRuntime: enabledJsxRuntime = true,
  reactHooks: enabledReactHooks = true,
  reactRefresh: enabledReactRefresh = true,
  ...reactOptions
}: Parameters<typeof react>[0] & {
  jsxA11y?: boolean;
  jsxRuntime?: boolean;
  reactHooks?: boolean;
  reactRefresh?: boolean;
} = {}) {
  return pluginTs.config(
    react({
      ...reactOptions,
      extends: [
        enabledJsxRuntime ? (pluginReact.configs.flat['jsx-runtime'] as Linter.Config) : {},
        enabledReactHooks ? reactHooksStrict : {},
        enabledReactRefresh ? reactRefreshStrict : {},
        enabledJsxA11y ? jsxA11yStrict : {},
        ...(reactOptions.extends ?? []),
      ],
    }),
  );
}
