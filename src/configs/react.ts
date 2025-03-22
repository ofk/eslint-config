import type { ConfigWithExtends } from 'typescript-eslint';

import pluginReact from 'eslint-plugin-react';
import pluginTs from 'typescript-eslint';

import { mergeRules } from '../utils';

// see https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file#list-of-supported-rules
export const reactStrict = mergeRules(pluginReact.configs.flat.recommended ?? {}, {
  'react/boolean-prop-naming': 'off',
  'react/button-has-type': ['error', { button: true, reset: false, submit: true }],
  'react/checked-requires-onchange-or-readonly': 'off',
  'react/default-props-match-prop-types': 'off',
  'react/destructuring-assignment': ['error', 'always'],
  'react/forbid-component-props': 'off',
  'react/forbid-dom-props': 'off',
  'react/forbid-elements': 'off',
  'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],
  'react/forbid-prop-types': [
    'error',
    {
      checkChildContextTypes: true,
      checkContextTypes: true,
      forbid: ['any', 'array', 'object'],
    },
  ],
  'react/forward-ref-uses-ref': 'error',
  'react/function-component-definition': [
    'error',
    { namedComponents: 'function-declaration', unnamedComponents: 'function-expression' },
  ],
  'react/hook-use-state': 'error',
  'react/iframe-missing-sandbox': 'error',
  'react/jsx-boolean-value': ['error', 'never'],
  'react/jsx-child-element-spacing': 'off',
  'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
  'react/jsx-closing-tag-location': 'error',
  'react/jsx-curly-brace-presence': ['error', { children: 'never', props: 'never' }],
  'react/jsx-curly-newline': ['error', { multiline: 'consistent', singleline: 'consistent' }],
  'react/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],
  'react/jsx-equals-spacing': ['error', 'never'],
  'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
  'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
  'react/jsx-fragments': ['error', 'syntax'],
  'react/jsx-handler-names': 'off',
  'react/jsx-indent': ['error', 2],
  'react/jsx-indent-props': ['error', 2],
  'react/jsx-max-depth': 'off',
  'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
  'react/jsx-newline': 'off',
  'react/jsx-no-bind': [
    'error',
    {
      allowArrowFunctions: true,
      allowBind: false,
      allowFunctions: false,
      ignoreDOMComponents: true,
      ignoreRefs: true,
    },
  ],
  'react/jsx-no-constructed-context-values': 'error',
  'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
  'react/jsx-no-literals': 'off',
  'react/jsx-no-script-url': ['error', [{ name: 'Link', props: ['to'] }]],
  'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
  'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
  'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
  'react/jsx-props-no-multi-spaces': 'error',
  'react/jsx-props-no-spread-multi': 'error',
  'react/jsx-props-no-spreading': 'off',
  'react/jsx-sort-props': 'off',
  'react/jsx-tag-spacing': [
    'error',
    {
      afterOpening: 'never',
      beforeClosing: 'never',
      beforeSelfClosing: 'always',
      closingSlash: 'never',
    },
  ],
  'react/jsx-wrap-multilines': [
    'error',
    {
      arrow: 'parens-new-line',
      assignment: 'parens-new-line',
      condition: 'parens-new-line',
      declaration: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
      return: 'parens-new-line',
    },
  ],
  'react/no-access-state-in-setstate': 'error',
  'react/no-adjacent-inline-elements': 'off',
  'react/no-array-index-key': 'error',
  'react/no-arrow-function-lifecycle': 'error',
  'react/no-danger': 'warn',
  'react/no-did-mount-set-state': 'off',
  'react/no-did-update-set-state': 'error',
  'react/no-invalid-html-attribute': 'error',
  'react/no-multi-comp': 'off',
  'react/no-namespace': 'error',
  'react/no-object-type-as-default-prop': 'error',
  'react/no-redundant-should-component-update': 'error',
  'react/no-set-state': 'off',
  'react/no-this-in-sfc': 'error',
  'react/no-typos': 'error',
  'react/no-unstable-nested-components': 'error',
  'react/no-unused-class-component-methods': 'error',
  'react/no-unused-prop-types': 'error',
  'react/no-unused-state': 'error',
  'react/no-will-update-set-state': 'error',
  'react/prefer-es6-class': ['error', 'always'],
  'react/prefer-exact-props': 'error',
  'react/prefer-read-only-props': 'off', // too strict
  'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],
  'react/require-default-props': 'off', // disallow defaultProps
  'react/require-optimization': 'off',
  'react/self-closing-comp': 'error',
  'react/sort-comp': 'error',
  'react/sort-default-props': 'error',
  'react/sort-prop-types': 'error',
  'react/state-in-constructor': ['error', 'never'],
  'react/static-property-placement': ['error', 'property assignment'],
  'react/style-prop-object': 'error',
  'react/void-dom-elements-no-children': 'error',
});

export function react(config: Pick<ConfigWithExtends, 'extends' | 'rules'>) {
  return pluginTs.config(
    {
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
    {
      ...config,
      extends: [reactStrict, ...(config.extends ?? [])],
      files: ['**/*.{jsx,tsx}'],
    },
  );
}
