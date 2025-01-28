import { Linter } from 'eslint';
import pluginTs, { ConfigWithExtends } from 'typescript-eslint';

// see https://typescript-eslint.io/rules/
export const tsStrict = pluginTs.config(
  pluginTs.configs.strictTypeChecked,
  pluginTs.configs.stylisticTypeChecked,
  {
    rules: {
      '@typescript-eslint/class-methods-use-this': 'off',
      '@typescript-eslint/consistent-return': 'off',
      '@typescript-eslint/consistent-type-exports': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/default-param-last': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/init-declarations': 'off',
      '@typescript-eslint/max-params': 'off',
      '@typescript-eslint/member-ordering': 'off',
      '@typescript-eslint/method-signature-style': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-dupe-class-members': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'off',
      '@typescript-eslint/no-invalid-this': 'off',
      '@typescript-eslint/no-loop-func': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/no-restricted-imports': 'off',
      '@typescript-eslint/no-restricted-types': 'off',
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'off',
      '@typescript-eslint/no-unnecessary-qualifier': 'off',
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-useless-empty-export': 'off',
      '@typescript-eslint/parameter-properties': 'off',
      '@typescript-eslint/prefer-destructuring': 'off',
      '@typescript-eslint/prefer-enum-initializers': 'off',
      '@typescript-eslint/prefer-readonly': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/promise-function-async': 'off',
      '@typescript-eslint/require-array-sort-compare': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/switch-exhaustiveness-check': 'off',
      '@typescript-eslint/typedef': 'off',
    },
  },
);

export function ts({
  disableTypeChecked = false,
  parserOptions = {},
  ...config
}: Pick<ConfigWithExtends, 'extends' | 'rules'> & {
  disableTypeChecked?: boolean;
  parserOptions?: false | Linter.ParserOptions;
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
    tsStrict,
    config,
    disableTypeChecked
      ? {
          extends: [pluginTs.configs.disableTypeChecked],
          files: ['**/*.{js,jsx,mjs,cjs}'],
        }
      : {},
  );
}
