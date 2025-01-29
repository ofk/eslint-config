import type { ConfigWithExtends } from 'typescript-eslint';

import pluginImport from 'eslint-plugin-import';
import pluginTs from 'typescript-eslint';

// see https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#rules
export const importsStrict = pluginTs.config(pluginImport.flatConfigs.recommended, {
  rules: {
    'import/consistent-type-specifier-style': 'off',
    'import/dynamic-import-chunkname': 'off',
    'import/exports-last': 'off',
    'import/extensions': 'off',
    'import/first': 'off',
    'import/group-exports': 'off',
    'import/imports-first': 'off',
    'import/max-dependencies': 'off',
    'import/newline-after-import': 'off',
    'import/no-absolute-path': 'off',
    'import/no-amd': 'off',
    'import/no-anonymous-default-export': 'off',
    'import/no-commonjs': 'off',
    'import/no-cycle': 'off',
    'import/no-default-export': 'off',
    'import/no-deprecated': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-empty-named-blocks': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-import-module-exports': 'off',
    'import/no-internal-modules': 'off',
    'import/no-mutable-exports': 'off',
    'import/no-named-default': 'off',
    'import/no-named-export': 'off',
    'import/no-namespace': 'off',
    'import/no-nodejs-modules': 'off',
    'import/no-relative-packages': 'off',
    'import/no-relative-parent-imports': 'off',
    'import/no-restricted-paths': 'off',
    'import/no-self-import': 'off',
    'import/no-unassigned-import': 'off',
    'import/no-unused-modules': 'off',
    'import/no-useless-path-segments': 'off',
    'import/no-webpack-loader-syntax': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'import/unambiguous': 'off',
  },
});

export function imports({
  typescript = false,
  ...config
}: Pick<ConfigWithExtends, 'extends' | 'rules'> & { typescript?: boolean }) {
  return pluginTs.config(
    importsStrict,
    config,
    typescript
      ? {
          extends: [pluginImport.flatConfigs.typescript],
          files: ['**/*.{ts,tsx,mts,cts}'],
          rules: {
            'import/no-unresolved': 'off',
          },
        }
      : {},
  );
}
