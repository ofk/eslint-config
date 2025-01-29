import type { ConfigWithExtends } from 'typescript-eslint';

import pluginVitest from '@vitest/eslint-plugin';
import pluginTs from 'typescript-eslint';

// see https://github.com/vitest-dev/eslint-plugin-vitest?tab=readme-ov-file#rules
export const vitestStrict = pluginTs.config(pluginVitest.configs.recommended, {
  rules: {
    'vitest/consistent-test-filename': 'off',
    'vitest/consistent-test-it': 'off',
    'vitest/max-expects': 'off',
    'vitest/max-nested-describe': 'off',
    'vitest/no-alias-methods': 'off',
    'vitest/no-conditional-expect': 'off',
    'vitest/no-conditional-in-test': 'off',
    'vitest/no-conditional-tests': 'off',
    'vitest/no-disabled-tests': 'off',
    'vitest/no-done-callback': 'off',
    'vitest/no-duplicate-hooks': 'off',
    'vitest/no-focused-tests': 'off',
    'vitest/no-hooks': 'off',
    'vitest/no-interpolation-in-snapshots': 'off',
    'vitest/no-large-snapshots': 'off',
    'vitest/no-mocks-import': 'off',
    'vitest/no-restricted-matchers': 'off',
    'vitest/no-restricted-vi-methods': 'off',
    'vitest/no-standalone-expect': 'off',
    'vitest/no-test-prefixes': 'off',
    'vitest/no-test-return-statement': 'off',
    'vitest/padding-around-after-all-blocks': 'off',
    'vitest/padding-around-after-each-blocks': 'off',
    'vitest/padding-around-all': 'off',
    'vitest/padding-around-before-all-blocks': 'off',
    'vitest/padding-around-before-each-blocks': 'off',
    'vitest/padding-around-describe-blocks': 'off',
    'vitest/padding-around-expect-groups': 'off',
    'vitest/padding-around-test-blocks': 'off',
    'vitest/prefer-called-with': 'off',
    'vitest/prefer-comparison-matcher': 'off',
    'vitest/prefer-each': 'off',
    'vitest/prefer-equality-matcher': 'off',
    'vitest/prefer-expect-assertions': 'off',
    'vitest/prefer-expect-resolves': 'off',
    'vitest/prefer-hooks-in-order': 'off',
    'vitest/prefer-hooks-on-top': 'off',
    'vitest/prefer-lowercase-title': 'off',
    'vitest/prefer-mock-promise-shorthand': 'off',
    'vitest/prefer-snapshot-hint': 'off',
    'vitest/prefer-spy-on': 'off',
    'vitest/prefer-strict-equal': 'off',
    'vitest/prefer-to-be': 'off',
    'vitest/prefer-to-be-falsy': 'off',
    'vitest/prefer-to-be-object': 'off',
    'vitest/prefer-to-be-truthy': 'off',
    'vitest/prefer-to-contain': 'off',
    'vitest/prefer-to-have-length': 'off',
    'vitest/prefer-todo': 'off',
    'vitest/prefer-vi-mocked': 'off',
    'vitest/require-hook': 'off',
    'vitest/require-to-throw-message': 'off',
    'vitest/require-top-level-describe': 'off',
    'vitest/valid-expect-in-promise': 'off',
  },
});

export function vitest(config: Pick<ConfigWithExtends, 'extends' | 'rules'>) {
  return pluginTs.config({
    extends: [vitestStrict, config],
    files: ['tests/**', '*.test.*'],
  });
}
