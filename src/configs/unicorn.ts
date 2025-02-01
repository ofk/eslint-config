import pluginUnicorn from 'eslint-plugin-unicorn';

import { mergeRules } from '../utils';

// see https://github.com/sindresorhus/eslint-plugin-unicorn?tab=readme-ov-file#rules
export const unicornRecommended = mergeRules(
  {
    ...pluginUnicorn.configs['flat/recommended'],
    rules: Object.fromEntries(
      Object.entries(pluginUnicorn.configs['flat/recommended'].rules ?? {}).filter(
        ([_key, value]) => value !== 'off',
      ),
    ),
  },
  {
    'no-negated-condition': 'off',
    'no-nested-ternary': 'off',
    'unicorn/better-regex': 'off', // not recommended
    'unicorn/catch-error-name': 'off', // overcorrection
    'unicorn/consistent-destructuring': 'off',
    'unicorn/custom-error-definition': 'off',
    'unicorn/expiring-todo-comments': 'off', // discarded
    'unicorn/filename-case': 'off', // discarded
    'unicorn/no-abusive-eslint-disable': 'off', // disabled for use eslint-comments/no-unlimited-disable
    'unicorn/no-anonymous-default-export': 'off', // disabled for use import/no-anonymous-default-export
    'unicorn/no-array-for-each': 'off', // disallow for-of
    'unicorn/no-array-reduce': 'off', // allow array reduce
    'unicorn/no-console-spaces': 'off', // discarded
    'unicorn/no-for-loop': 'off', // disallow for-of
    'unicorn/no-keyword-prefix': 'error',
    'unicorn/no-magic-array-flat-depth': 'off', // allow magic numbers
    'unicorn/no-null': 'off', // allow null
    'unicorn/no-typeof-undefined': 'off', // discarded
    'unicorn/no-unnecessary-polyfills': 'off', // skip validate polyfills
    'unicorn/no-unused-properties': 'off', // not recommended
    'unicorn/numeric-separators-style': 'off', // disabled style rules
    'unicorn/prefer-global-this': 'off', // discarded
    'unicorn/prefer-json-parse-buffer': 'off', // not recommended
    'unicorn/prefer-keyboard-event-key': 'off', // allow keyCode
    'unicorn/prefer-node-protocol': 'off', // disabled for use import/enforce-node-protocol-usage
    'unicorn/prefer-string-raw': 'off', // disallow String.raw
    'unicorn/prefer-structured-clone': 'off', // disallow structuredClone
    'unicorn/prefer-switch': 'off', // discarded
    'unicorn/prefer-ternary': 'off', // discarded
    'unicorn/prefer-top-level-await': 'off', // discarded
    'unicorn/prefer-type-error': 'off', // discarded
    'unicorn/prevent-abbreviations': 'off', // disabled style rules
    'unicorn/relative-url-style': ['error', 'always'],
    'unicorn/require-post-message-target-origin': 'off', // not recommended
    'unicorn/string-content': 'off', // not recommended
    'unicorn/switch-case-braces': ['error', 'avoid'],
  },
);
