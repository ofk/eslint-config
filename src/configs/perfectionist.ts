/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Linter } from 'eslint';
import pluginPerfectionist from 'eslint-plugin-perfectionist';
import pluginTs from 'typescript-eslint';

function mergeRuleOptions(
  rule: Linter.RuleEntry | undefined,
  options: object,
): Linter.RuleEntry | undefined {
  if (Array.isArray(rule)) {
    return [rule[0], { ...rule[1], ...options }];
  }
  return rule;
}

function mergeConfig(config: Linter.Config, options: object): Linter.Config {
  return {
    ...config,
    rules: config.rules
      ? Object.fromEntries(
          Object.entries(config.rules).map(([name, rule]) => [
            name,
            mergeRuleOptions(rule, options),
          ]),
        )
      : undefined,
  };
}

// see https://perfectionist.dev/rules
const perfectionistRecommended = mergeConfig(pluginPerfectionist.configs['recommended-natural'], {
  ignoreCase: false,
});

export const perfectionistStrict = pluginTs.config(
  perfectionistRecommended,
  {
    rules: {
      // see https://perfectionist.dev/rules/sort-imports
      'perfectionist/sort-imports': mergeRuleOptions(
        perfectionistRecommended.rules!['perfectionist/sort-imports'],
        {
          groups: [
            'type',
            ['builtin', 'external'],
            'internal-type',
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'side-effect',
            'style',
            'unknown',
          ],
          internalPattern: [
            '^[@~]/.*', // next.js/remix default pattern
          ],
        },
      ),
      // see https://perfectionist.dev/rules/sort-jsx-props
      'perfectionist/sort-jsx-props': mergeRuleOptions(
        perfectionistRecommended.rules!['perfectionist/sort-jsx-props'],
        {
          customGroups: {
            reserved: '^(?:key|ref)$',
          },
          groups: ['reserved', 'unknown'],
        },
      ),
      // see https://perfectionist.dev/rules/sort-union-types
      'perfectionist/sort-union-types': mergeRuleOptions(
        perfectionistRecommended.rules!['perfectionist/sort-union-types'],
        {
          groups: ['unknown', 'nullish'],
        },
      ),
    },
  },
  {
    rules: {
      // disable sorting of method definitions that conflict with no-use-before-define
      'perfectionist/sort-classes': 'off',
      'perfectionist/sort-modules': 'off',
    },
  },
  {
    rules: {
      // conflict with https://perfectionist.dev/rules/sort-interfaces
      //               https://perfectionist.dev/rules/sort-object-types
      '@typescript-eslint/adjacent-overload-signatures': 'off',
      // conflict with https://perfectionist.dev/rules/sort-classes
      '@typescript-eslint/member-ordering': 'off',
      // conflict with https://perfectionist.dev/rules/sort-intersection-types
      //               https://perfectionist.dev/rules/sort-union-types
      '@typescript-eslint/sort-type-constituents': 'off',
      // conflict with https://perfectionist.dev/rules/sort-imports
      //               https://perfectionist.dev/rules/sort-named-imports
      'import/order': 'off',
      // conflict with https://perfectionist.dev/rules/sort-jsx-props
      'react/jsx-sort-props': 'off',
      // conflict with https://perfectionist.dev/rules/sort-classes
      'react/sort-comp': 'off',
      // conflict with https://perfectionist.dev/rules/sort-objects
      'react/sort-default-props': 'off',
      'react/sort-prop-types': 'off',
      // conflict with https://perfectionist.dev/rules/sort-imports
      //               https://perfectionist.dev/rules/sort-named-imports
      'sort-imports': 'off',
      // conflict with https://perfectionist.dev/rules/sort-objects
      'sort-keys': 'off',
    },
  },
);
