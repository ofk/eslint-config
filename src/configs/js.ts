import pluginJs from '@eslint/js';
import globalVariables from 'globals';
import pluginTs, { ConfigWithExtends } from 'typescript-eslint';

// see https://eslint.org/docs/latest/rules/
export const jsStrict = pluginTs.config(pluginJs.configs.recommended);

export function js({
  globals = true,
  ...config
}: Pick<ConfigWithExtends, 'extends' | 'rules'> & { globals?: boolean }) {
  return pluginTs.config(
    globals
      ? {
          languageOptions: {
            globals: {
              ...globalVariables.es2025,
            },
          },
        }
      : {},
    jsStrict,
    config,
  );
}
