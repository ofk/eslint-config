import { Linter } from 'eslint';
import pluginReact from 'eslint-plugin-react';
import pluginTs, { ConfigWithExtends } from 'typescript-eslint';

// see https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file#list-of-supported-rules
export const reactStrict = pluginTs.config(pluginReact.configs.flat.recommended as Linter.Config);

export function react(config: Pick<ConfigWithExtends, 'extends' | 'rules'>) {
  return pluginTs.config(
    {
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
    {
      ...config,
      extends: [reactStrict, ...(config.extends ?? [])],
      files: ['**/*.{jsx,tsx}'],
    },
  );
}
