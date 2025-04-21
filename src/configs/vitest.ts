import type { ConfigWithExtends } from 'typescript-eslint';

import pluginVitest from '@vitest/eslint-plugin';
import pluginTs from 'typescript-eslint';

import { mergeRules } from '../utils';

// see https://github.com/vitest-dev/eslint-plugin-vitest?tab=readme-ov-file#rules
export const vitestStrict = mergeRules(pluginVitest.configs.recommended, {
  'vitest/consistent-test-filename': 'off',
  'vitest/consistent-test-it': 'error',
  'vitest/max-expects': 'off',
  'vitest/max-nested-describe': 'off',
  'vitest/no-alias-methods': 'error',
  'vitest/no-conditional-expect': 'error',
  'vitest/no-conditional-in-test': 'error',
  'vitest/no-conditional-tests': 'error',
  'vitest/no-disabled-tests': 'off',
  'vitest/no-done-callback': 'off', // deprecated
  'vitest/no-duplicate-hooks': 'error',
  'vitest/no-focused-tests': 'off',
  'vitest/no-hooks': 'off',
  'vitest/no-interpolation-in-snapshots': 'error',
  'vitest/no-large-snapshots': 'off',
  'vitest/no-mocks-import': 'off',
  'vitest/no-restricted-matchers': 'off',
  'vitest/no-restricted-vi-methods': 'off',
  'vitest/no-standalone-expect': 'error',
  'vitest/no-test-prefixes': 'off',
  'vitest/no-test-return-statement': 'error',
  'vitest/padding-around-after-all-blocks': 'error',
  'vitest/padding-around-after-each-blocks': 'error',
  'vitest/padding-around-all': 'error',
  'vitest/padding-around-before-all-blocks': 'error',
  'vitest/padding-around-before-each-blocks': 'error',
  'vitest/padding-around-describe-blocks': 'error',
  'vitest/padding-around-expect-groups': 'error',
  'vitest/padding-around-test-blocks': 'error',
  'vitest/prefer-called-with': 'error',
  'vitest/prefer-comparison-matcher': 'error',
  'vitest/prefer-describe-function-title': 'error',
  'vitest/prefer-each': 'error',
  'vitest/prefer-equality-matcher': 'error',
  'vitest/prefer-expect-assertions': 'off', // deprecated
  'vitest/prefer-expect-resolves': 'error',
  'vitest/prefer-hooks-in-order': 'error',
  'vitest/prefer-hooks-on-top': 'error',
  'vitest/prefer-lowercase-title': 'error',
  'vitest/prefer-mock-promise-shorthand': 'error',
  'vitest/prefer-snapshot-hint': 'error',
  'vitest/prefer-spy-on': 'error',
  'vitest/prefer-strict-boolean-matchers': 'off', // conflict with vitest/prefer-to-be-truthy
  'vitest/prefer-strict-equal': 'error',
  'vitest/prefer-to-be': 'error',
  'vitest/prefer-to-be-falsy': 'error',
  'vitest/prefer-to-be-object': 'error',
  'vitest/prefer-to-be-truthy': 'error',
  'vitest/prefer-to-contain': 'error',
  'vitest/prefer-to-have-length': 'error',
  'vitest/prefer-todo': 'error',
  'vitest/prefer-vi-mocked': 'error',
  'vitest/require-hook': 'error',
  'vitest/require-mock-type-parameters': 'off',
  'vitest/require-to-throw-message': 'error',
  'vitest/require-top-level-describe': 'error',
  'vitest/valid-expect-in-promise': 'error',
});

export function vitest(config: Pick<ConfigWithExtends, 'extends' | 'rules'>) {
  return pluginTs.config({
    extends: [vitestStrict, config],
    files: ['tests/**', '*.test.*'],
  });
}
