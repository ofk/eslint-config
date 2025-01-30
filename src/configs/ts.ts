import type { Linter } from 'eslint';
import type { ConfigWithExtends } from 'typescript-eslint';

import pluginTs from 'typescript-eslint';

// see https://typescript-eslint.io/rules/
const tsRecommendedOverride = pluginTs.config(
  // override rules in recommended
  {
    rules: {
      // override no-empty-object-type in recommended
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],
      // override no-unused-vars in recommended
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  // best practices
  {
    rules: {
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-duplicate-imports': 'off', // confilict with @typescript-eslint/consistent-type-imports
    },
  },
);

export const tsRecommended = pluginTs.config(pluginTs.configs.recommended, tsRecommendedOverride);

export const tsStrict = pluginTs.config(
  pluginTs.configs.strictTypeChecked,
  pluginTs.configs.stylisticTypeChecked,
  tsRecommendedOverride,
  {
    rules: {
      // override no-empty-function in stylistic
      '@typescript-eslint/no-empty-function': 'warn',
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
      '@typescript-eslint/class-methods-use-this': 'error',
      '@typescript-eslint/consistent-return': 'off', // disabled because tsc checks
      '@typescript-eslint/default-param-last': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off', // typescript-eslint/explicit-function-return-type is enabled
      '@typescript-eslint/init-declarations': 'error',
      '@typescript-eslint/max-params': 'off', // disabled like js
      '@typescript-eslint/member-ordering': 'off', // disabled style rules
      '@typescript-eslint/method-signature-style': 'error',
      '@typescript-eslint/naming-convention': 'off', // disabled style rules
      '@typescript-eslint/no-dupe-class-members': 'off', // disabled because tsc checks
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-invalid-this': 'off', // disabled because tsc checks
      '@typescript-eslint/no-loop-func': 'error',
      '@typescript-eslint/no-magic-numbers': 'off', // disabled like js
      '@typescript-eslint/no-redeclare': 'error',
      '@typescript-eslint/no-restricted-imports': 'off', // disabled like js
      '@typescript-eslint/no-restricted-types': 'off', // allow all types
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      '@typescript-eslint/no-unsafe-type-assertion': 'off', // too strict
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/parameter-properties': ['error', { prefer: 'parameter-property' }],
      '@typescript-eslint/prefer-destructuring': [
        'error',
        {
          AssignmentExpression: { array: true, object: false },
          VariableDeclarator: { array: false, object: true },
        },
        { enforceForRenamedProperties: false },
      ],
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off', // too strict
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'off', // too strict
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/typedef': 'off', // disabled for use strict tsc
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
  },
);

export function ts({
  disableTypeChecked = false,
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
          extends: [
            pluginTs.configs.disableTypeChecked,
            // disabled unsafe rules for js files
            {
              rules: {
                '@typescript-eslint/no-unsafe-argument': 'off',
                '@typescript-eslint/no-unsafe-assignment': 'off',
                '@typescript-eslint/no-unsafe-call': 'off',
                '@typescript-eslint/no-unsafe-declaration-merging': 'off',
                '@typescript-eslint/no-unsafe-enum-comparison': 'off',
                '@typescript-eslint/no-unsafe-function-type': 'off',
                '@typescript-eslint/no-unsafe-member-access': 'off',
                '@typescript-eslint/no-unsafe-return': 'off',
                '@typescript-eslint/no-unsafe-type-assertion': 'off',
                '@typescript-eslint/no-unsafe-unary-minus': 'off',
              },
            },
          ],
          files: ['**/*.{js,jsx,mjs,cjs}'],
        }
      : {},
  );
}
