import type { Linter } from 'eslint';
import type { ConfigWithExtends } from 'typescript-eslint';

import pluginTs from 'typescript-eslint';

import { mergeRules } from '../utils';
import { jsStrict } from './js';

const jsStrictRules = jsStrict.rules ?? {};

const tsEslintOverrideRules = mergeRules(
  {},
  // see https://github.com/typescript-eslint/typescript-eslint/blob/v8.22.0/packages/eslint-plugin/src/configs/strict-type-checked.ts
  {
    '@typescript-eslint/no-array-constructor': jsStrictRules['no-array-constructor'],
    '@typescript-eslint/no-implied-eval': jsStrictRules['no-implied-eval'],
    '@typescript-eslint/no-unused-expressions': jsStrictRules['no-unused-expressions'],
    '@typescript-eslint/no-unused-vars': jsStrictRules['no-unused-vars'],
    '@typescript-eslint/no-useless-constructor': jsStrictRules['no-useless-constructor'],
    '@typescript-eslint/prefer-promise-reject-errors':
      jsStrictRules['prefer-promise-reject-errors'],
    '@typescript-eslint/require-await': jsStrictRules['require-await'],
    'no-array-constructor': 'off',
    'no-implied-eval': 'off',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    'no-useless-constructor': 'off',
    'prefer-promise-reject-errors': 'off',
    'require-await': 'off',
  },
  // see https://github.com/typescript-eslint/typescript-eslint/blob/v8.22.0/packages/eslint-plugin/src/configs/stylistic-type-checked.ts
  {
    '@typescript-eslint/dot-notation': jsStrictRules['dot-notation'],
    '@typescript-eslint/no-empty-function': jsStrictRules['no-empty-function'],
    'dot-notation': 'off',
    'no-empty-function': 'off',
  },
  // others
  {
    '@typescript-eslint/class-methods-use-this': jsStrictRules['class-methods-use-this'],
    '@typescript-eslint/default-param-last': jsStrictRules['default-param-last'],
    '@typescript-eslint/init-declarations': jsStrictRules['init-declarations'],
    '@typescript-eslint/max-params': jsStrictRules['max-params'],
    '@typescript-eslint/no-dupe-class-members': jsStrictRules['no-dupe-class-members'],
    '@typescript-eslint/no-invalid-this': jsStrictRules['no-invalid-this'],
    '@typescript-eslint/no-loop-func': jsStrictRules['no-loop-func'],
    '@typescript-eslint/no-magic-numbers': jsStrictRules['no-magic-numbers'],
    '@typescript-eslint/no-redeclare': jsStrictRules['no-redeclare'],
    '@typescript-eslint/no-restricted-imports': jsStrictRules['no-restricted-imports'],
    '@typescript-eslint/no-shadow': jsStrictRules['no-shadow'],
    '@typescript-eslint/no-use-before-define': jsStrictRules['no-use-before-define'],
    '@typescript-eslint/prefer-destructuring': jsStrictRules['prefer-destructuring'],
    'class-methods-use-this': 'off',
    'default-param-last': 'off',
    'init-declarations': 'off',
    'max-params': 'off',
    'no-dupe-class-members': 'off',
    'no-invalid-this': 'off',
    'no-loop-func': 'off',
    'no-magic-numbers': 'off',
    'no-redeclare': 'off',
    'no-restricted-imports': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'prefer-destructuring': 'off',
  },
);

// see https://typescript-eslint.io/rules/
const tsRecommendedOverride = mergeRules(
  {},
  // override rules in recommended
  {
    // override no-empty-object-type in recommended
    '@typescript-eslint/no-empty-object-type': [
      'error',
      { allowInterfaces: 'with-single-extends' },
    ],
  },
  // best practices
  {
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-dupe-class-members': 'off', // disabled because tsc checks
    '@typescript-eslint/no-invalid-this': 'off', // disabled because tsc checks
    'no-duplicate-imports': 'off', // confilict with @typescript-eslint/consistent-type-imports
  },
);

export const tsRecommended = pluginTs.config(
  pluginTs.configs.recommended,
  tsEslintOverrideRules,
  tsRecommendedOverride,
);

export const tsStrict = pluginTs.config(
  pluginTs.configs.strictTypeChecked,
  pluginTs.configs.stylisticTypeChecked,
  tsEslintOverrideRules,
  tsRecommendedOverride,
  {
    rules: {
      // override no-unnecessary-condition in strict
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        { allowConstantLoopConditions: true },
      ],
      // override prefer-for-of in stylistic
      '@typescript-eslint/prefer-for-of': 'off', // disallow for-of
    },
  },
  {
    rules: {
      '@typescript-eslint/consistent-return': 'off', // disabled because tsc checks
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off', // typescript-eslint/explicit-function-return-type is enabled
      '@typescript-eslint/member-ordering': 'off', // disabled style rules
      '@typescript-eslint/method-signature-style': 'error',
      '@typescript-eslint/naming-convention': 'off', // disabled style rules
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-restricted-types': 'off', // allow all types
      '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      '@typescript-eslint/no-unsafe-type-assertion': 'off', // too strict
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/parameter-properties': ['error', { prefer: 'parameter-property' }],
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off', // too strict
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'off', // too strict
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/typedef': 'off', // disabled for use strict tsc
    },
  },
);

export function ts({
  disableTypeChecked = true,
  parserOptions = {},
  strict = true,
  ...config
}: Pick<ConfigWithExtends, 'extends' | 'rules'> & {
  disableTypeChecked?: boolean;
  parserOptions?: false | Linter.ParserOptions;
  strict?: boolean;
}) {
  return pluginTs.config(
    parserOptions
      ? {
          languageOptions: {
            parserOptions: {
              projectService: true,
              ...parserOptions,
            },
          },
        }
      : {},
    strict ? tsStrict : tsRecommended,
    config,
    disableTypeChecked
      ? {
          extends: [pluginTs.configs.disableTypeChecked],
          files: ['**/*.{js,jsx,mjs,cjs}'],
        }
      : {},
  );
}
