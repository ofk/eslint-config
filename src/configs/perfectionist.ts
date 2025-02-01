import pluginPerfectionist from 'eslint-plugin-perfectionist';

import { mergeRuleOptions, mergeRules } from '../utils';

// see https://perfectionist.dev/rules
const perfectionistRecommended = {
  ...pluginPerfectionist.configs['recommended-natural'],
  rules: Object.fromEntries(
    Object.entries(pluginPerfectionist.configs['recommended-natural'].rules ?? {}).map(
      ([name, rule]) => [name, mergeRuleOptions(rule, { ignoreCase: false })],
    ),
  ),
};

export const perfectionistStrict = mergeRules(
  perfectionistRecommended,
  {
    // see https://perfectionist.dev/rules/sort-imports
    'perfectionist/sort-imports': mergeRuleOptions(
      perfectionistRecommended.rules['perfectionist/sort-imports'],
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
          'side-effect-style',
          'unknown',
        ],
        internalPattern: [
          '^[@~]/.*', // next.js/remix default pattern
        ],
      },
    ),
    // see https://perfectionist.dev/rules/sort-jsx-props
    'perfectionist/sort-jsx-props': mergeRuleOptions(
      perfectionistRecommended.rules['perfectionist/sort-jsx-props'],
      {
        customGroups: {
          reserved: '^(?:key|ref)$',
        },
        groups: ['reserved', 'unknown'],
      },
    ),
    // see https://perfectionist.dev/rules/sort-union-types
    'perfectionist/sort-union-types': mergeRuleOptions(
      perfectionistRecommended.rules['perfectionist/sort-union-types'],
      {
        groups: ['unknown', 'nullish'],
      },
    ),
  },
  {
    // disable sorting of method definitions that conflict with no-use-before-define
    'perfectionist/sort-classes': 'off',
    'perfectionist/sort-modules': 'off',
  },
  {
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
);
