import type { ConfigWithExtends } from 'typescript-eslint';

// eslint-disable-next-line import/no-namespace
import * as pluginImport from 'eslint-plugin-import';
import pluginTs from 'typescript-eslint';

import { mergeRules } from '../utils';

// see https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#rules
export const importsStrict = mergeRules(
  pluginImport.flatConfigs.recommended,
  // https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#helpful-warnings
  {
    'import/no-deprecated': 'off', // discarded
    'import/no-empty-named-blocks': 'error',
    // cf. https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v19.0.4/packages/eslint-config-airbnb-base/rules/imports.js#L71
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'test/**',
          'tests/**',
          'spec/**',
          '**/__tests__/**',
          '**/__mocks__/**',
          '**/*_{test,spec}.*',
          '**/*.{test,spec,stories}.*',
          'test.*',
          'test-*.*',
          '*.{config,setup,conf}.{js,ts,mjs,mts,cjs,cts}',
          '*.{config,setup,conf}.*.{js,ts,mjs,mts,cjs,cts}',
          '.*rc.{js,ts,mjs,mts,cjs,cts}',
        ],
        optionalDependencies: false,
      },
    ],
    'import/no-mutable-exports': 'error',
    'import/no-unused-modules': 'error',
  },
  // https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#module-systems
  {
    'import/no-amd': 'error',
    'import/no-commonjs': 'off', // disabled for use in esm
    'import/no-import-module-exports': 'error',
    'import/no-nodejs-modules': 'error',
    'import/unambiguous': 'off',
  },
  // https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#static-analysis
  {
    'import/no-absolute-path': 'error',
    'import/no-cycle': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-internal-modules': 'off', // discarded
    'import/no-relative-packages': 'error',
    'import/no-relative-parent-imports': 'off', // discarded
    'import/no-restricted-paths': 'off', // discarded
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-webpack-loader-syntax': 'error',
  },
  // https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#style-guide
  {
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'import/dynamic-import-chunkname': 'off', // don't use webpack
    'import/exports-last': 'off', // discarded
    'import/extensions': [
      'error',
      'ignorePackages',
      { cjs: 'never', js: 'never', jsx: 'never', mjs: 'never' },
    ],
    'import/first': 'error',
    'import/group-exports': 'off', // discarded
    'import/max-dependencies': 'off', // disabled style rules
    'import/newline-after-import': 'error',
    'import/no-anonymous-default-export': [
      'error',
      {
        allowArray: true,
        allowCallExpression: true,
        allowLiteral: true,
        allowNew: true,
        allowObject: true,
      },
    ],
    'import/no-default-export': 'error', // disallow default export
    'import/no-duplicates': 'error',
    'import/no-named-default': 'error',
    'import/no-named-export': 'off', // disallow default export
    'import/no-namespace': 'error',
    'import/no-unassigned-import': 'off', // allow to use side-effects module
    'import/order': ['error', { groups: [['builtin', 'external', 'internal']] }],
    'import/prefer-default-export': 'off', // discarded
    'no-duplicate-imports': 'off',
  },
  // disable slow rules due to bugs
  // https://github.com/import-js/eslint-plugin-import/issues/3148
  {
    'import/namespace': 'off',
    'import/no-cycle': 'off',
    'import/no-deprecated': 'off',
  },
);

export function imports({
  defaultExportFiles = false,
  node = false,
  typescript = false,
  ...config
}: Pick<ConfigWithExtends, 'extends' | 'rules'> & {
  defaultExportFiles?: false | string[];
  node?: boolean;
  typescript?: boolean;
}) {
  return pluginTs.config(
    importsStrict,
    config,
    // allow default export in config files
    {
      files: [
        '*.{config,setup,conf}.{js,ts,mjs,mts,cjs,cts}',
        '*.{config,setup,conf}.*.{js,ts,mjs,mts,cjs,cts}',
        '.*rc.{js,ts,mjs,mts,cjs,cts}',
        '.storybook/**/*',
        '**/*.stories.*',
        ...(defaultExportFiles || []),
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    node
      ? {
          rules: {
            'import/no-nodejs-modules': 'off',
          },
        }
      : {},
    typescript
      ? {
          extends: [
            pluginImport.flatConfigs.typescript,
            {
              rules: {
                'import/extensions': [
                  'error',
                  'ignorePackages',
                  {
                    cjs: 'never',
                    cts: 'never',
                    js: 'never',
                    jsx: 'never',
                    mjs: 'never',
                    mts: 'never',
                    ts: 'never',
                    tsx: 'never',
                  },
                ],
              },
            },
            // see https://github.com/iamturns/eslint-config-airbnb-typescript/blob/v18.0.0/lib/shared.js#L285-L290
            {
              rules: {
                'import/default': 'off',
                'import/named': 'off',
                'import/namespace': 'off',
                'import/no-named-as-default-member': 'off',
                'import/no-unresolved': 'off',
              },
            },
          ],
          files: ['**/*.{ts,tsx,mts,cts}'],
        }
      : {},
  );
}
